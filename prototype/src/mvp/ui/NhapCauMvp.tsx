/**
 * NHẬP CÂU Ở PHÒNG MÁY — ba cách, cùng ra một câu SQL (engine/trinh-dung.ts, QĐ-092). Màn thử thách chạy và chấm câu đó.
 *
 * - Kéo thả: khung SELECT…FROM khóa; mỗi điều kiện = cột + phép + ô giá trị. Giá trị lấy bằng cách kéo giấy nhớ vào ô
 *   (hoặc bấm giấy nhớ rồi bấm ô — cho bàn phím / cảm ứng). ✎ = gõ lại nguyên giá trị (máy không thêm nháy).
 * - Bấm khối: bấm mảnh nối vào cuối câu (kiểu SQL Police); khối giá trị vào nguyên chữ, dấu nháy là khối riêng.
 * - Gõ tay: ô chữ tự do, bắt đầu bằng khung đã khóa.
 * Mỗi cách giữ trạng thái riêng; đổi cách thì câu hiện là câu của cách đó.
 */
import { useEffect, useMemo, useState, type DragEvent } from 'react';
import type { BoDuLieuMvp } from '../../content/mvp/types';
import {
  CACH_NHAP,
  KHOI_DAU,
  KHOI_TU_KHOA,
  TEN_CACH_NHAP,
  TEN_PHEP,
  cauTuSql,
  dieuKienThanhSql,
  khungTuSqlChuan,
  noiKhoi,
  thanhSql,
  type CachNhap,
  type CauDung,
  type DieuKienDung,
  type KieuCot,
} from '../engine/trinh-dung';

/** Chữ trên nút nối (chương 1 — người chơi lớp 5 đọc tiếng Việt; câu SQL bên dưới vẫn là AND / OR). */
const TEN_NOI: Record<'AND' | 'OR', string> = { AND: 'VÀ', OR: 'HOẶC' };

/** Một giá trị dùng được: từ giấy nhớ / bằng chứng trong hồ sơ ("Giá trị cho trình dựng"). */
export interface GiayNhoDung {
  /** Khóa duy nhất (mã thẻ + chỉ số giá trị). */
  khoa: string;
  giaTri: string;
  /** Tên thẻ hồ sơ (nhãn giấy nhớ, vd "[Báo chí K24]"). */
  nguon: string;
}

export interface NhapCauMvpProps {
  duLieu: BoDuLieuMvp;
  sqlChuan: string;
  giayNho: GiayNhoDung[];
  cachNhap: CachNhap;
  onDoiCach: (c: CachNhap) => void;
  onSql: (sql: string) => void;
  onChay: () => void;
  khoa: boolean;
  /** Câu có sẵn nạp vào kéo thả (buổi họp: câu của Quân) — người chơi chỉ sửa chỗ cần sửa. */
  cauDau?: string;
  /** Chỉ kéo thả, không hiện các tab cách nhập (màn sửa truy vấn ở buổi họp). */
  chiKeo?: boolean;
}

const TOI_DA_DIEU_KIEN = 3;

export function NhapCauMvp({ duLieu, sqlChuan, giayNho, cachNhap: cachChon, onDoiCach, onSql, onChay, khoa, cauDau, chiKeo = false }: NhapCauMvpProps) {
  const cachNhap: CachNhap = chiKeo ? 'keo' : cachChon;
  const khung = useMemo(() => khungTuSqlChuan(sqlChuan), [sqlChuan]);
  const bang = duLieu.bang.find((b) => b.ten === khung?.bang);
  const cot = bang?.cot.map((c) => c.ten) ?? [];
  const kieuCot = (ten: string): KieuCot => bang?.cot.find((c) => c.ten === ten)?.kieu ?? 'TEXT';

  const [cau, setCau] = useState<CauDung>(
    () => (cauDau ? cauTuSql(cauDau) : null) ?? { khung: khung?.khung ?? '', dieuKien: [{ cot: cot[0] ?? '', phep: 'bang', giaTri: null }], noi: [] },
  );
  const [khoi, setKhoi] = useState<string[]>(() => (khung ? khungThanhKhoi(khung.khung) : []));
  const [go, setGo] = useState<string>(() => (khung ? `${khung.khung} WHERE ` : ''));

  const sql = cachNhap === 'keo' ? thanhSql(cau, kieuCot) : cachNhap === 'khoi' ? noiKhoi(khoi) : go;
  useEffect(() => {
    onSql(sql);
  }, [sql, onSql]);

  if (!khung || !bang) return <p className="game__error">Thẻ thử thách này thiếu khung SELECT … FROM … hợp lệ.</p>;

  return (
    <div className="mvp-nhap" data-cach={cachNhap}>
      {chiKeo ? null : (
        <div className="mvp-nhap__cach" role="tablist" aria-label="Cách nhập câu">
          {CACH_NHAP.map((c) => (
            <button key={c} type="button" role="tab" aria-selected={cachNhap === c} className={`mvp-nhap__tab${cachNhap === c ? ' is-active' : ''}`} onClick={() => onDoiCach(c)}>
              {TEN_CACH_NHAP[c]}
            </button>
          ))}
        </div>
      )}
      {cachNhap === 'keo' ? (
        <KeoTha cau={cau} setCau={setCau} cot={cot} kieuCot={kieuCot} giayNho={giayNho} khoa={khoa} />
      ) : cachNhap === 'khoi' ? (
        <BamKhoi khoi={khoi} setKhoi={setKhoi} bang={duLieu.bang.map((b) => b.ten)} cot={cot} giayNho={giayNho} khoa={khoa} />
      ) : (
        <textarea
          className="chal-sql__editor mvp-nhap__go"
          aria-label="Câu SQL (gõ tay)"
          spellCheck={false}
          autoCapitalize="off"
          autoCorrect="off"
          rows={4}
          value={go}
          disabled={khoa}
          onChange={(e) => setGo(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
              e.preventDefault();
              onChay();
            }
          }}
        />
      )}
      {cachNhap !== 'go' ? (
        <p className="mvp-nhap__sql" aria-label="Câu SQL đang dựng">
          <code>{sql}</code>
        </p>
      ) : null}
    </div>
  );
}

/** "SELECT ma_lop, nganh FROM lop" → ["SELECT", "ma_lop, nganh", "FROM", "lop"]. */
function khungThanhKhoi(k: string): string[] {
  const m = /^SELECT\s+(.+?)\s+FROM\s+(\S+)$/i.exec(k);
  return m ? ['SELECT', m[1] ?? '*', 'FROM', m[2] ?? ''] : [k];
}

// ---------- Kéo thả ----------

function KeoTha({
  cau,
  setCau,
  cot,
  kieuCot,
  giayNho,
  khoa,
}: {
  cau: CauDung;
  setCau: (f: (c: CauDung) => CauDung) => void;
  cot: string[];
  kieuCot: (c: string) => KieuCot;
  giayNho: GiayNhoDung[];
  khoa: boolean;
}) {
  const [dangChon, setDangChon] = useState<GiayNhoDung | null>(null);
  const [dangSua, setDangSua] = useState<number | null>(null);
  const [chuSua, setChuSua] = useState('');

  const doiDk = (i: number, f: (d: DieuKienDung) => DieuKienDung): void =>
    setCau((c) => ({ ...c, dieuKien: c.dieuKien.map((d, k) => (k === i ? f(d) : d)) }));
  const dat = (i: number, g: GiayNhoDung): void => {
    doiDk(i, (d) => ({ ...d, giaTri: { nguon: 'giay-nho', tho: g.giaTri } }));
    setDangChon(null);
  };
  const tha = (i: number) => (e: DragEvent) => {
    e.preventDefault();
    const g = giayNho.find((x) => x.khoa === e.dataTransfer.getData('text/plain'));
    if (g) dat(i, g);
  };
  const moSua = (i: number): void => {
    const d = cau.dieuKien[i];
    const hien = d ? dieuKienThanhSql(d, kieuCot(d.cot)) : null;
    setChuSua(hien ? hien.replace(/^\S+\s+(=|LIKE)\s+/, '') : '');
    setDangSua(i);
  };
  const xongSua = (i: number): void => {
    doiDk(i, (d) => ({ ...d, giaTri: chuSua.trim() === '' ? null : { nguon: 'go', tho: chuSua } }));
    setDangSua(null);
  };

  return (
    <div className="mvp-keo">
      <p className="mvp-keo__khung">
        <span aria-hidden="true">🔒 </span>
        <code>{cau.khung}</code>
      </p>
      <div className="mvp-keo__giay" role="group" aria-label="Giấy nhớ — kéo vào ô giá trị, hoặc bấm rồi bấm ô">
        {giayNho.length === 0 ? <span className="mvp-keo__trong">Chưa có giấy nhớ nào mang giá trị.</span> : null}
        {giayNho.map((g) => (
          <button
            key={g.khoa}
            type="button"
            className={`mvp-giay${dangChon?.khoa === g.khoa ? ' is-chon' : ''}`}
            draggable={!khoa}
            disabled={khoa}
            aria-pressed={dangChon?.khoa === g.khoa}
            aria-label={`${g.giaTri} (giấy nhớ ${g.nguon})`}
            title={`${g.nguon} — kéo vào ô giá trị`}
            onDragStart={(e) => e.dataTransfer.setData('text/plain', g.khoa)}
            onClick={() => setDangChon(dangChon?.khoa === g.khoa ? null : g)}
          >
            {g.giaTri}
          </button>
        ))}
      </div>
      <ol className="mvp-keo__ds" aria-label="Các điều kiện WHERE">
        {cau.dieuKien.map((d, i) => (
          <li key={i} className="mvp-keo__dk">
            {i > 0 ? (
              <button
                type="button"
                className="mvp-keo__noi"
                disabled={khoa}
                aria-label={`Nối điều kiện ${i + 1}: ${TEN_NOI[cau.noi[i - 1] ?? 'AND']} (${cau.noi[i - 1] ?? 'AND'}) — bấm để đổi`}
                title={`${TEN_NOI[cau.noi[i - 1] ?? 'AND']} — trong câu SQL là ${cau.noi[i - 1] ?? 'AND'}`}
                onClick={() => setCau((c) => ({ ...c, noi: c.noi.map((x, k) => (k === i - 1 ? (x === 'AND' ? 'OR' : 'AND') : x)) }))}
              >
                {TEN_NOI[cau.noi[i - 1] ?? 'AND']} <small className="mvp-keo__noi-sql">{cau.noi[i - 1] ?? 'AND'}</small>
              </button>
            ) : (
              <span className="mvp-keo__where">WHERE</span>
            )}
            <select aria-label={`Cột của điều kiện ${i + 1}`} value={d.cot} disabled={khoa} onChange={(e) => doiDk(i, (x) => ({ ...x, cot: e.target.value }))}>
              {cot.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
            <button
              type="button"
              className="mvp-keo__phep"
              disabled={khoa}
              aria-label={`Phép so sánh của điều kiện ${i + 1}: ${TEN_PHEP[d.phep]} — bấm để đổi`}
              onClick={() => doiDk(i, (x) => ({ ...x, phep: x.phep === 'bang' ? 'bat-dau-bang' : 'bang' }))}
            >
              {TEN_PHEP[d.phep]}
            </button>
            {dangSua === i ? (
              <input
                className="mvp-keo__sua"
                aria-label={`Gõ giá trị điều kiện ${i + 1} (gõ đúng như trong câu SQL)`}
                value={chuSua}
                autoFocus
                onChange={(e) => setChuSua(e.target.value)}
                onBlur={() => xongSua(i)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    xongSua(i);
                  }
                }}
              />
            ) : (
              <button
                type="button"
                className={`mvp-keo__o${d.giaTri ? ' is-co' : ''}`}
                disabled={khoa}
                aria-label={d.giaTri ? `Giá trị điều kiện ${i + 1}: ${d.giaTri.tho} — bấm để gỡ` : `Ô giá trị điều kiện ${i + 1}: thả giấy nhớ vào đây`}
                onDragOver={(e) => e.preventDefault()}
                onDrop={tha(i)}
                onClick={() => {
                  if (dangChon) dat(i, dangChon);
                  else if (d.giaTri) doiDk(i, (x) => ({ ...x, giaTri: null }));
                }}
              >
                {d.giaTri ? (d.giaTri.nguon === 'go' ? <code>{d.giaTri.tho}</code> : d.giaTri.tho) : 'thả giấy nhớ'}
              </button>
            )}
            <button type="button" className="mvp-keo__but" disabled={khoa} title="Tự gõ giá trị (máy không thêm nháy)" aria-label={`Tự gõ giá trị điều kiện ${i + 1}`} onClick={() => moSua(i)}>
              ✎
            </button>
            {cau.dieuKien.length > 1 ? (
              <button
                type="button"
                className="mvp-keo__bo"
                disabled={khoa}
                aria-label={`Bỏ điều kiện ${i + 1}`}
                title="Bỏ điều kiện này"
                onClick={() => setCau((c) => ({ ...c, dieuKien: c.dieuKien.filter((_x, k) => k !== i), noi: c.noi.filter((_x, k) => k !== Math.max(0, i - 1)) }))}
              >
                ×
              </button>
            ) : null}
          </li>
        ))}
      </ol>
      {cau.dieuKien.length < TOI_DA_DIEU_KIEN ? (
        <button
          type="button"
          className="btn btn--small"
          disabled={khoa}
          onClick={() => setCau((c) => ({ ...c, dieuKien: [...c.dieuKien, { cot: cot[0] ?? '', phep: 'bang', giaTri: null }], noi: [...c.noi, 'AND'] }))}
        >
          + Thêm điều kiện
        </button>
      ) : null}
    </div>
  );
}

// ---------- Bấm khối ----------

function BamKhoi({
  khoi,
  setKhoi,
  bang,
  cot,
  giayNho,
  khoa,
}: {
  khoi: string[];
  setKhoi: (f: (k: string[]) => string[]) => void;
  bang: string[];
  cot: string[];
  giayNho: GiayNhoDung[];
  khoa: boolean;
}) {
  const [chuThem, setChuThem] = useState('');
  const them = (k: string): void => setKhoi((cu) => [...cu, k]);
  const nhom: { ten: string; ds: string[] }[] = [
    { ten: 'Từ khóa', ds: [...KHOI_TU_KHOA] },
    { ten: 'Bảng', ds: bang },
    { ten: 'Cột', ds: cot },
    { ten: 'Giá trị (giấy nhớ)', ds: [...new Set(giayNho.map((g) => g.giaTri))] },
    { ten: 'Dấu', ds: [...KHOI_DAU] },
  ];
  return (
    <div className="mvp-khoi">
      <div className="mvp-khoi__cau" aria-label="Các khối đã bấm">
        {khoi.length === 0 ? <span className="mvp-keo__trong">Bấm các khối bên dưới để ghép câu.</span> : null}
        {khoi.map((k, i) => (
          <span key={i} className="mvp-khoi__manh">
            {k}
          </span>
        ))}
      </div>
      <div className="mvp-khoi__lenh">
        <button type="button" className="btn btn--small" disabled={khoa || khoi.length === 0} onClick={() => setKhoi((cu) => cu.slice(0, -1))} aria-label="Xóa khối cuối">
          ⌫ Xóa khối cuối
        </button>
        <button type="button" className="btn btn--small" disabled={khoa || khoi.length === 0} onClick={() => setKhoi(() => [])}>
          Xóa hết
        </button>
      </div>
      {nhom.map((n) =>
        n.ds.length > 0 ? (
          <div key={n.ten} className="mvp-khoi__nhom" role="group" aria-label={`Khối: ${n.ten}`}>
            <span className="mvp-khoi__ten">{n.ten}</span>
            {n.ds.map((k) => (
              <button key={k} type="button" className="mvp-khoi__nut" disabled={khoa} onClick={() => them(k)} aria-label={`Thêm khối ${k}`}>
                {k}
              </button>
            ))}
          </div>
        ) : null,
      )}
      <form
        className="mvp-khoi__nhom"
        onSubmit={(e) => {
          e.preventDefault();
          if (chuThem.trim() === '') return;
          them(chuThem.trim());
          setChuThem('');
        }}
      >
        <label className="mvp-khoi__ten" htmlFor="mvp-khoi-them">
          Khối khác
        </label>
        <input id="mvp-khoi-them" value={chuThem} disabled={khoa} onChange={(e) => setChuThem(e.target.value)} placeholder="vd 2024" />
        <button type="submit" className="btn btn--small" disabled={khoa}>
          Thêm
        </button>
      </form>
    </div>
  );
}
