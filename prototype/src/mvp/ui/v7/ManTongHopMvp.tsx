import { useEffect, useMemo, useRef, useState } from 'react';
import type { BoDuLieuMvp, TheThuThachMvp } from '../../../content/mvp/types';
import type { GiaTriHoSo } from '../../engine/giay-nho';
import type { DieuKienDung } from '../../engine/trinh-dung';
import { TEN_HAM, khoiTongHopCuaThe, taoSqlTongHop, type CauTongHop, type HamTongHop, type NguonTongHop } from '../../engine/trinh-dung-tong-hop';
import { chaySql, soVoiChuan, type GiaTriSql } from '../../engine/sql-mvp';

export interface KetQuaTraTongHop {
  sql: string;
  source: string;
  cot: string[];
  rows: GiaTriSql[][];
  selectedNoteColumn?: string;
  noteValues?: GiaTriSql[];
}

export interface ManTongHopMvpProps {
  duLieu: BoDuLieuMvp;
  the: TheThuThachMvp;
  nguon: NguonTongHop[];
  giayNho: GiaTriHoSo[];
  dienTen: (t: string) => string;
  /** Tên hiển thị của một phiếu nguồn (nhãn phiếu thay cho mã). */
  nhanNguon?: (id: string) => string | undefined;
  onXong: (payload: KetQuaTraTongHop) => void;
}

const q = (s: string): string => `"${s.replace(/"/g, '""')}"`;

/** Resolve the content-only FROM @evidence-id notation using the same saved query as runtime sources. */
function sqlChuanCoNguon(sql: string, nguon: NguonTongHop[]): string {
  return sql.replace(/\bFROM\s+@([A-Za-z0-9_-]+)/gi, (_full, id: string) => {
    const n = nguon.find((x) => x.id === id);
    if (!n) throw new Error(`Không tìm thấy nguồn phiếu "${id}" của câu chuẩn.`);
    return n.sql === null ? `FROM ${q(n.id)}` : `FROM (${n.sql}) AS ${q(n.id)}`;
  });
}

export function ManTongHopMvp({ duLieu, the, nguon, giayNho, dienTen, nhanNguon, onXong }: ManTongHopMvpProps) {
  const [nguonId, setNguonId] = useState(nguon[0]?.id ?? '');
  const [nhomTheo, setNhomTheo] = useState('');
  const [cotGhiChu, setCotGhiChu] = useState('');
  const [whereCot, setWhereCot] = useState('');
  const [whereThe, setWhereThe] = useState('');
  // Vụ 5: phép tính thêm trên mỗi nhóm và ngưỡng giữ nhóm — chỉ hiện khi SQL chuẩn của thẻ dùng tới.
  const khoi = useMemo(() => khoiTongHopCuaThe(the.sqlChuan), [the.sqlChuan]);
  const [tinh, setTinh] = useState<{ ham: 'SUM' | 'AVG'; cot: string }[]>([]);
  const [giuHam, setGiuHam] = useState<HamTongHop | ''>('');
  const [giuCot, setGiuCot] = useState('');
  const [giuThe, setGiuThe] = useState('');
  const [ketQua, setKetQua] = useState<{ sql: string; cot: string[]; dong: GiaTriSql[][]; dung: boolean } | null>(null);
  const [thongBao, setThongBao] = useState('');
  const [dangChay, setDangChay] = useState(false);
  // Điện thoại: bảng kết quả / lời báo hiện dưới nút "Chạy truy vấn", ngoài tầm nhìn → chạy xong thì cuộn tới.
  // `nearest`: trên laptop kết quả đã nằm trong khung thì không nhảy.
  const vungKetQua = useRef<HTMLDivElement>(null);
  const vungBao = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    const el = vungKetQua.current ?? vungBao.current;
    if (!el) return;
    const em = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    el.scrollIntoView?.({ block: 'nearest', behavior: em ? 'auto' : 'smooth' });
  }, [ketQua, thongBao]);
  const selectedNguon = useMemo(() => nguon.find((n) => n.id === nguonId) ?? null, [nguon, nguonId]);

  const chay = async (): Promise<void> => {
    setThongBao('');
    setKetQua(null);
    if (!selectedNguon || !nhomTheo) {
      setThongBao('Hãy chọn nguồn và cột nhóm trước.');
      return;
    }
    setDangChay(true);
    try {
      // For this first slice GROUP BY determines the sole selected data column; COUNT(*) is supplied by the builder.
      const card = giayNho.find((x) => x.the === whereThe);
      const where: DieuKienDung[] = whereCot && card ? [{
        cot: whereCot,
        phep: 'bang',
        giaTri: { nguon: 'giay-nho', tho: card.giaTri, ...(card.nhieu ? { nhieu: card.nhieu } : {}), the: card.the },
      }] : [];
      const nguongThe = giayNho.find((x) => x.khoa === giuThe);
      const lonHon = nguongThe ? Number(nguongThe.giaTri.replace(/[^\d.-]/g, '')) : NaN;
      const cau: CauTongHop = {
        nguonId,
        select: [nhomTheo],
        where,
        nhomTheo,
        ...(tinh.length ? { tinh } : {}),
        ...(giuHam ? { giuNhom: { ham: giuHam, cot: giuHam === 'COUNT' ? null : giuCot || null, lonHon } } : {}),
      };
      const sql = taoSqlTongHop(cau, selectedNguon);
      const kq = await chaySql(duLieu, sql);
      if (!kq.ok) {
        setThongBao(kq.thongDiep);
        return;
      }
      const sqlChuan = sqlChuanCoNguon(the.sqlChuan, nguon);
      const chuan = await chaySql(duLieu, sqlChuan);
      if (!chuan.ok) {
        setThongBao(`Không chạy được câu chuẩn của thẻ: ${chuan.thongDiep}`);
        return;
      }
      const so = soVoiChuan(chuan, kq);
      setKetQua({ sql, cot: kq.cot, dong: kq.dong, dung: so.dung });
      if (!so.dung) {
        setThongBao(`Chưa đúng: kết quả có ${so.soDongNguoiChoi} dòng; câu chuẩn có ${so.soDongChuan} dòng.`);
      } else {
        setThongBao('Đúng. Có thể chọn một cột để tạo note nếu kết quả không quá 3 dòng.');
      }
    } catch (e) {
      setThongBao((e as Error).message);
    } finally {
      setDangChay(false);
    }
  };

  const cotKetQua = ketQua?.cot ?? [];
  // Câu SQL đang dựng, hiện bên dưới như màn tra (không bắt phải đọc); chưa đủ để dựng thì để trống.
  const sqlXemTruoc = ((): string => {
    if (!selectedNguon || !nhomTheo) return '';
    try {
      const card = giayNho.find((x) => x.the === whereThe);
      const where: DieuKienDung[] = whereCot && card ? [{ cot: whereCot, phep: 'bang', giaTri: { nguon: 'giay-nho', tho: card.giaTri, ...(card.nhieu ? { nhieu: card.nhieu } : {}), the: card.the } }] : [];
      const nguongThe = giayNho.find((x) => x.khoa === giuThe);
      const lonHon = nguongThe ? Number(nguongThe.giaTri.replace(/[^\d.-]/g, '')) : NaN;
      return taoSqlTongHop({ nguonId, select: [nhomTheo], where, nhomTheo, ...(tinh.length ? { tinh } : {}), ...(giuHam ? { giuNhom: { ham: giuHam, cot: giuHam === 'COUNT' ? null : giuCot || null, lonHon } } : {}) }, selectedNguon);
    } catch {
      return '';
    }
  })();
  const duocTaoGhiChu = !!ketQua && ketQua.dong.length <= 3 && cotGhiChu !== '';
  const ketQuaDung = ketQua?.dung === true;
  const taoNote = (): void => {
    if (!ketQua || !selectedNguon || !ketQuaDung || !duocTaoGhiChu) return;
    const i = ketQua.cot.indexOf(cotGhiChu);
    if (i < 0) return;
    onXong({
      sql: ketQua.sql,
      source: selectedNguon.id,
      cot: ketQua.cot,
      rows: ketQua.dong,
      selectedNoteColumn: cotGhiChu,
      noteValues: ketQua.dong.map((row) => row[i] ?? null),
    });
  };
  const hoanTatKhongNote = (): void => {
    if (!ketQua || !selectedNguon || !ketQuaDung) return;
    onXong({ sql: ketQua.sql, source: selectedNguon.id, cot: ketQua.cot, rows: ketQua.dong });
  };

  return (
    <section className="man-tong-hop" aria-label="Trình dựng truy vấn tổng hợp">
      <header>
        <p>MÀN TỔNG HỢP · nhóm và đếm trên phiếu đã ghim</p>
        <h2>{dienTen(the.tieuDe)}</h2>
        <p>{dienTen(the.deBai)}</p>
      </header>
      <label>
        Nguồn FROM
        <select value={nguonId} onChange={(e) => { setNguonId(e.target.value); setNhomTheo(''); setKetQua(null); }}>
          <option value="">Chọn phiếu hoặc bảng</option>
          {nguon.map((n) => <option key={n.id} value={n.id}>{dienTen(nhanNguon?.(n.id) ?? n.id)}</option>)}
        </select>
      </label>
      <fieldset disabled={!selectedNguon}>
        <legend>WHERE (không bắt buộc)</legend>
        <label>
          Cột điều kiện
          <select value={whereCot} onChange={(e) => { setWhereCot(e.target.value); setKetQua(null); }}>
            <option value="">Không lọc</option>
            {selectedNguon?.cot.map((c) => <option key={c.ten} value={c.ten}>{dienTen(c.ten)}</option>)}
          </select>
        </label>
        <label>
          Giấy nhớ
          <select value={whereThe} onChange={(e) => { setWhereThe(e.target.value); setKetQua(null); }} disabled={!whereCot}>
            <option value="">Chọn giấy nhớ</option>
            {giayNho.map((g) => <option key={g.khoa} value={g.the}>{dienTen(g.nguon)} · {g.giaTri}</option>)}
          </select>
        </label>
      </fieldset>
      <label>
        SELECT / GROUP BY
        <select value={nhomTheo} onChange={(e) => { setNhomTheo(e.target.value); setKetQua(null); }} disabled={!selectedNguon}>
          <option value="">Chọn cột để nhóm</option>
          {selectedNguon?.cot.map((c) => <option key={c.ten} value={c.ten}>{dienTen(c.ten)}</option>)}
        </select>
        <small>Truy vấn đầu tiên chọn cột nhóm cùng với COUNT(*) (số dòng).</small>
      </label>
      {khoi.tinh ? (
        <fieldset disabled={!selectedNguon}>
          <legend>TÍNH THÊM trên mỗi nhóm (ngoài số dòng)</legend>
          {(['SUM', 'AVG'] as const).map((ham) => {
            const dang = tinh.find((t) => t.ham === ham);
            return (
              <label key={ham}>
                <input type="checkbox" checked={!!dang} onChange={(e) => { setKetQua(null); setTinh((ds) => (e.target.checked ? [...ds.filter((t) => t.ham !== ham), { ham, cot: selectedNguon?.cot.find((c) => c.kieu === 'INTEGER')?.ten ?? '' }] : ds.filter((t) => t.ham !== ham))); }} />
                {TEN_HAM[ham]} của cột
                <select value={dang?.cot ?? ''} disabled={!dang} onChange={(e) => { setKetQua(null); setTinh((ds) => ds.map((t) => (t.ham === ham ? { ...t, cot: e.target.value } : t))); }}>
                  {selectedNguon?.cot.filter((c) => c.kieu === 'INTEGER').map((c) => <option key={c.ten} value={c.ten}>{dienTen(c.ten)}</option>)}
                </select>
              </label>
            );
          })}
        </fieldset>
      ) : null}
      {khoi.giuNhom ? (
        <fieldset disabled={!selectedNguon}>
          <legend>CHỈ GIỮ NHÓM có … lớn hơn một ngưỡng (giấy nhớ số)</legend>
          <label>
            Phép
            <select value={giuHam} onChange={(e) => { setKetQua(null); setGiuHam(e.target.value as HamTongHop | ''); }}>
              <option value="">Giữ mọi nhóm</option>
              {(['COUNT', 'SUM', 'AVG'] as const).map((h) => <option key={h} value={h}>{TEN_HAM[h]}</option>)}
            </select>
          </label>
          {giuHam && giuHam !== 'COUNT' ? (
            <label>
              của cột
              <select value={giuCot} onChange={(e) => { setKetQua(null); setGiuCot(e.target.value); }}>
                <option value="">Chọn cột số</option>
                {selectedNguon?.cot.filter((c) => c.kieu === 'INTEGER').map((c) => <option key={c.ten} value={c.ten}>{dienTen(c.ten)}</option>)}
              </select>
            </label>
          ) : null}
          {giuHam ? (
            <label>
              lớn hơn
              <select value={giuThe} onChange={(e) => { setKetQua(null); setGiuThe(e.target.value); }}>
                <option value="">Chọn giấy nhớ số</option>
                {giayNho.filter((g) => /^-?[\d.]+$/.test(g.giaTri.trim())).map((g) => <option key={g.khoa} value={g.khoa}>{dienTen(g.nguon)} · {g.giaTri}</option>)}
              </select>
            </label>
          ) : null}
        </fieldset>
      ) : null}
      <button type="button" onClick={() => void chay()} disabled={dangChay || !selectedNguon || !nhomTheo}>
        {dangChay ? 'Đang chạy…' : 'Chạy truy vấn'}
      </button>
      {sqlXemTruoc ? (
        <p className="v7-sql man-tong-hop__sql" aria-label="Câu SQL đang dựng">
          <code>{sqlXemTruoc.replace(/\) SELECT /, ')\nSELECT ')}</code>
        </p>
      ) : null}
      {thongBao ? <p role="status" ref={vungBao}>{thongBao}</p> : null}
      {ketQua ? (
        <div ref={vungKetQua}>
          <table>
            <thead><tr>{ketQua.cot.map((c) => <th key={c}>{dienTen(c)}</th>)}</tr></thead>
            <tbody>{ketQua.dong.map((row, ri) => <tr key={ri}>{row.map((v, ci) => <td key={ci}>{String(v ?? 'NULL')}</td>)}</tr>)}</tbody>
          </table>
          {ketQuaDung ? (
            <div>
              {ketQua.dong.length <= 3 ? (
                <label>
                  Cột để trích thành note
                  <select value={cotGhiChu} onChange={(e) => setCotGhiChu(e.target.value)}>
                    <option value="">Không tạo note</option>
                    {cotKetQua.map((c) => <option key={c} value={c}>{dienTen(c)}</option>)}
                  </select>
                </label>
              ) : <p>Kết quả có hơn 3 dòng nên chưa thể tạo note.</p>}
              {duocTaoGhiChu ? <button type="button" onClick={taoNote}>Ghim phiếu và tạo note</button> : null}
              <button type="button" onClick={hoanTatKhongNote}>Ghim phiếu kết quả</button>
            </div>
          ) : null}
        </div>
      ) : null}
    </section>
  );
}
