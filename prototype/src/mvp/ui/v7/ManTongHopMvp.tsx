/**
 * MÀN TỔNG HỢP (nhóm và đếm trên phiếu đã ghim) — cùng giao diện màn tra v7: khung màn hình máy, giấy nhớ dán hai bên,
 * các khối bấm để đổi, ô giá trị nhận giấy nhớ (bấm giấy rồi bấm ô, hoặc kéo thả). Hàng khối:
 *   NGUỒN [phiếu đã ghim] · LỌC [cột] bằng [giấy nhớ] (không bắt buộc) · NHÓM THEO [cột] · TÍNH [đếm dòng] [tổng] [trung bình]
 *   · CHỈ GIỮ NHÓM [phép] lớn hơn [giấy nhớ số]
 * Hai hàng cuối chỉ hiện khi SQL chuẩn của thẻ dùng tới (SUM/AVG, HAVING). Câu SQL đang dựng luôn hiện bên dưới.
 */
import { useMemo, useState, type CSSProperties } from 'react';
import type { BoDuLieuMvp, KichBanMvp, TheThuThachMvp } from '../../../content/mvp/types';
import { IconPin, IconPlay } from '../../../shared/ui/icons';
import type { GiaTriHoSo } from '../../engine/giay-nho';
import type { DieuKienDung } from '../../engine/trinh-dung';
import { TEN_HAM, khoiTongHopCuaThe, taoSqlTongHop, type CauTongHop, type HamTongHop, type NguonTongHop } from '../../engine/trinh-dung-tong-hop';
import { chaySql, soVoiChuan, type GiaTriSql } from '../../engine/sql-mvp';
import { tenNguoiNoi } from '../../engine/may';
import { anhTheoTen } from '../anh-mvp';
import { CANH_TRA, type CanhTra } from './canh-tra';
import { VungV7 } from './ManTraV7';
import { KiemPhieu } from './KiemPhieu';
import './v7.css';

export interface KetQuaTraTongHop {
  sql: string;
  source: string;
  cot: string[];
  rows: GiaTriSql[][];
  selectedNoteColumn?: string;
  noteValues?: GiaTriSql[];
}

export interface ManTongHopMvpProps {
  kb: KichBanMvp;
  duLieu: BoDuLieuMvp;
  the: TheThuThachMvp;
  canh: CanhTra;
  nguon: NguonTongHop[];
  giayNho: GiaTriHoSo[];
  dienTen: (t: string) => string;
  /** Tên hiển thị của một phiếu nguồn (nhãn phiếu thay cho mã). */
  nhanNguon?: (id: string) => string | undefined;
  onXong: (payload: KetQuaTraTongHop) => void;
}

const q = (s: string): string => `"${s.replace(/"/g, '""')}"`;
const LA_SO = /^-?[\d.]+$/;

/** Resolve the content-only FROM @evidence-id notation using the same saved query as runtime sources. */
function sqlChuanCoNguon(sql: string, nguon: NguonTongHop[]): string {
  return sql.replace(/\bFROM\s+@([A-Za-z0-9_-]+)/gi, (_full, id: string) => {
    const n = nguon.find((x) => x.id === id);
    if (!n) throw new Error(`Không tìm thấy nguồn phiếu "${id}" của câu chuẩn.`);
    return n.sql === null ? `FROM ${q(n.id)}` : `FROM (${n.sql}) AS ${q(n.id)}`;
  });
}

/** Phần tử kế tiếp trong vòng `ds` (sau phần tử cuối là `''` = chưa chọn). */
const vongKe = (ds: readonly string[], dang: string): string => ds[ds.indexOf(dang) + 1] ?? '';

export function ManTongHopMvp({ kb, duLieu, the, canh, nguon, giayNho, dienTen, nhanNguon, onXong }: ManTongHopMvpProps) {
  const cauHinh = CANH_TRA[canh];
  const [nguonId, setNguonId] = useState(nguon.length === 1 ? (nguon[0]?.id ?? '') : '');
  const [nhomTheo, setNhomTheo] = useState('');
  const [whereCot, setWhereCot] = useState('');
  const [whereGiay, setWhereGiay] = useState<GiaTriHoSo | null>(null);
  // Phép tính thêm trên mỗi nhóm và ngưỡng giữ nhóm — chỉ hiện khi SQL chuẩn của thẻ dùng tới.
  const khoi = useMemo(() => khoiTongHopCuaThe(the.sqlChuan), [the.sqlChuan]);
  const [tinh, setTinh] = useState<{ ham: 'SUM' | 'AVG'; cot: string }[]>([]);
  const [giuHam, setGiuHam] = useState<HamTongHop | ''>('');
  const [giuCot, setGiuCot] = useState('');
  const [giuGiay, setGiuGiay] = useState<GiaTriHoSo | null>(null);
  const [dangChon, setDangChon] = useState<GiaTriHoSo | null>(null);
  const [ketQua, setKetQua] = useState<{ sql: string; cot: string[]; dong: GiaTriSql[][]; dung: boolean; duSo: boolean } | null>(null);
  const [loiNoi, setLoiNoi] = useState<{ speaker: string; text: string } | null>(null);
  const [dangChay, setDangChay] = useState(false);
  const [xongRoi, setXongRoi] = useState(false);
  const selectedNguon = useMemo(() => nguon.find((n) => n.id === nguonId) ?? null, [nguon, nguonId]);
  const cot = selectedNguon?.cot.map((c) => c.ten) ?? [];
  const cotSo = selectedNguon?.cot.filter((c) => c.kieu === 'INTEGER').map((c) => c.ten) ?? [];
  const dung = ketQua?.dung === true;
  const khoa = dung || dangChay;

  const doi = (f: () => void): void => {
    if (khoa) return;
    setKetQua(null);
    setLoiNoi(null);
    f();
  };

  const cauHienTai = (): CauTongHop | null => {
    if (!selectedNguon || !nhomTheo) return null;
    const where: DieuKienDung[] =
      whereCot && whereGiay
        ? [{ cot: whereCot, phep: 'bang', giaTri: { nguon: 'giay-nho', tho: whereGiay.giaTri, ...(whereGiay.nhieu ? { nhieu: whereGiay.nhieu } : {}), the: whereGiay.the } }]
        : [];
    const lonHon = giuGiay ? Number(giuGiay.giaTri.replace(/[^\d.-]/g, '')) : NaN;
    return {
      nguonId,
      select: [nhomTheo],
      where,
      nhomTheo,
      ...(tinh.length ? { tinh } : {}),
      ...(giuHam && giuGiay ? { giuNhom: { ham: giuHam, cot: giuHam === 'COUNT' ? null : giuCot || null, lonHon } } : {}),
    };
  };

  const sqlXemTruoc = ((): string => {
    const cau = cauHienTai();
    if (!cau || !selectedNguon) return '';
    try {
      return taoSqlTongHop(cau, selectedNguon);
    } catch {
      return '';
    }
  })();

  const chay = async (): Promise<void> => {
    const cau = cauHienTai();
    if (!cau || !selectedNguon) return;
    setLoiNoi(null);
    setKetQua(null);
    setDangChay(true);
    try {
      const sql = taoSqlTongHop(cau, selectedNguon);
      const kq = await chaySql(duLieu, sql);
      if (!kq.ok) {
        setLoiNoi({ speaker: 'duy', text: `Máy báo lỗi: ${kq.thongDiep}` });
        return;
      }
      const chuan = await chaySql(duLieu, sqlChuanCoNguon(the.sqlChuan, nguon));
      if (!chuan.ok) {
        setLoiNoi({ speaker: 'duy', text: `Không chạy được câu chuẩn của thẻ: ${chuan.thongDiep}` });
        return;
      }
      const so = soVoiChuan(chuan, kq);
      setKetQua({ sql, cot: kq.cot, dong: kq.dong, dung: so.dung, duSo: so.cotThieu.filter((c) => !kq.cot.includes(c)).length === 0 });
      if (!so.dung) {
        // Lời tả kết quả, không nói cách sửa: thiếu cột → nêu cột thiếu; lệch số nhóm → nêu số nhóm.
        const thieu = so.cotThieu.filter((c) => !kq.cot.includes(c));
        setLoiNoi({
          speaker: 'ha-vy',
          text:
            so.soDongNguoiChoi !== so.soDongChuan
              ? `Ra ${so.soDongNguoiChoi} nhóm. Đề bài hỏi một thứ khác, đọc lại xem mình cần gom theo gì và giữ nhóm nào.`
              : thieu.length > 0
                ? `Số nhóm thì khớp, nhưng bảng còn thiếu con số đề bài hỏi (${thieu.join(', ')}).`
                : 'Số nhóm thì khớp, nhưng các con số trong bảng chưa đúng thứ đề bài hỏi.',
        });
      }
    } catch (e) {
      setLoiNoi({ speaker: 'duy', text: (e as Error).message });
    } finally {
      setDangChay(false);
    }
  };

  const xong = (): void => {
    if (!ketQua || !selectedNguon || !dung || xongRoi) return;
    setXongRoi(true);
    onXong({ sql: ketQua.sql, source: selectedNguon.id, cot: ketQua.cot, rows: ketQua.dong });
  };

  /** Bấm ô giá trị: đang cầm giấy thì đặt vào; ô đang có giấy (không cầm) thì gỡ. */
  const bamO = (dang: GiaTriHoSo | null, dat: (g: GiaTriHoSo | null) => void, chiSo: boolean): void =>
    doi(() => {
      if (dangChon && (!chiSo || LA_SO.test(dangChon.giaTri.trim()))) {
        dat(dangChon);
        setDangChon(null);
      } else if (dang && !dangChon) dat(null);
    });
  const tha = (khoaGiay: string, dat: (g: GiaTriHoSo | null) => void, chiSo: boolean): void =>
    doi(() => {
      const g = giayNho.find((x) => x.khoa === khoaGiay);
      if (g && (!chiSo || LA_SO.test(g.giaTri.trim()))) dat(g);
    });

  // Giấy nhớ quanh viền: nửa trái, nửa phải (cùng cách xếp với màn tra).
  const nua = Math.ceil(giayNho.length / 2);
  const buocGiay = Math.min(146, (cauHinh.kinh.h - 8) / Math.max(1, nua));
  const viTriGiay = (i: number): CSSProperties => {
    const phai = i >= nua;
    const k = phai ? i - nua : i;
    return {
      left: phai ? cauHinh.kinh.x + cauHinh.kinh.w - 6 : cauHinh.kinh.x - 122,
      top: cauHinh.kinh.y + 22 + k * buocGiay,
      ['--r' as string]: `${((i * 37) % 9) - 4}deg`,
      ['--img' as string]: `url("${anhTheoTen(`giay-nho-${String((i % 10) + 1).padStart(2, '0')}`) ?? ''}")`,
    };
  };
  const giay = giayNho.map((g, i) => (
    <button
      key={g.khoa}
      type="button"
      className={`v7-giay${i >= nua ? ' is-phai' : ''}${dangChon?.khoa === g.khoa ? ' is-chon' : ''}${g.nhieu ? ' is-nhieu' : ''}${(g.nhieu ?? [g.giaTri]).some((v) => v.length > 6) ? ' is-dai' : ''}`}
      style={viTriGiay(i)}
      draggable={!khoa}
      disabled={khoa}
      aria-pressed={dangChon?.khoa === g.khoa}
      aria-label={`${g.giaTri} (giấy nhớ ${dienTen(g.nguon)})`}
      onDragStart={(e) => e.dataTransfer.setData('text/plain', g.khoa)}
      onClick={() => setDangChon(dangChon?.khoa === g.khoa ? null : g)}
    >
      <span className="v7-giay__chu">{g.nhieu ? g.nhieu.map((v) => <span key={v}>{v}</span>) : g.giaTri}</span>
      <small className="v7-giay__nguon">{dienTen(g.nguon).replace(/^\[|\]$/g, '')}</small>
    </button>
  ));

  const tenNguon = (id: string): string => dienTen(nhanNguon?.(id) ?? id);
  const khe = (nhan: string, dang: GiaTriHoSo | null, dat: (g: GiaTriHoSo | null) => void, chiSo: boolean): React.ReactNode => (
    <button
      type="button"
      className={`v7-khe${dang ? ' is-co' : ''}${dangChon && !dang ? ' is-moi' : ''}`}
      disabled={khoa}
      aria-label={dang ? `${nhan}: ${dang.giaTri} — bấm để gỡ` : `${nhan}: thả giấy nhớ vào đây`}
      onClick={() => bamO(dang, dat, chiSo)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={(e) => {
        e.preventDefault();
        tha(e.dataTransfer.getData('text/plain'), dat, chiSo);
      }}
    >
      {dang ? <span className="v7-khe__giay">{dang.giaTri}</span> : chiSo ? 'thả giấy nhớ số' : 'thả giấy nhớ'}
    </button>
  );
  const nutTinh = (ham: 'SUM' | 'AVG'): React.ReactNode => {
    const dang = tinh.find((t) => t.ham === ham);
    return (
      <button
        key={ham}
        type="button"
        className={`v7-o v7-o--cot${dang ? '' : ' is-trong'}`}
        disabled={khoa || cotSo.length === 0}
        aria-label={`Tính ${TEN_HAM[ham]}: ${dang ? dang.cot : 'không tính'} — bấm để đổi`}
        onClick={() =>
          doi(() => {
            // Vòng: không tính → từng cột số → không tính.
            const ke = vongKe(cotSo, dang?.cot ?? '');
            setTinh((ds) => [...ds.filter((t) => t.ham !== ham), ...(ke ? [{ ham, cot: ke }] : [])]);
          })
        }
      >
        {dang ? `${TEN_HAM[ham]}: ${dang.cot}` : `+ ${TEN_HAM[ham]}`}
      </button>
    );
  };

  const kinh = (
    <div className="v7-kinh v7-kinh--tong-hop" data-region="sql" data-man="tong-hop">
      <div className="v7-thanh">
        <span>▣ tong-hop — {cauHinh.may} · nhóm và đếm trên phiếu đã ghim</span>
      </div>
      <p className="v7-de">{dienTen(the.deBai)}</p>
      <KiemPhieu duy="mỗi nhóm một dòng, đủ con số đề hỏi" duyDat={ketQua ? ketQua.duSo : null} vy="đúng câu hỏi trên bảng" vyDat={ketQua ? ketQua.dung : null} />
      <div className="v7-cau">
        <div className="v7-cau__bang">
          <button
            type="button"
            className={`v7-o v7-o--bang v7-o--phieu${selectedNguon ? '' : ' is-trong'}`}
            disabled={khoa}
            aria-label={`Nguồn: ${selectedNguon ? tenNguon(selectedNguon.id) : 'chưa chọn phiếu'} — bấm để đổi`}
            onClick={() =>
              doi(() => {
                const ids = nguon.map((n) => n.id);
                setNguonId(nguon.length === 1 ? (ids[0] ?? '') : vongKe(ids, nguonId));
                setNhomTheo('');
                setWhereCot('');
                setTinh([]);
                setGiuCot('');
              })
            }
          >
            <IconPin className="v7-bt" /> {selectedNguon ? tenNguon(selectedNguon.id) : 'chọn phiếu nguồn'}
          </button>
          <small>{selectedNguon ? 'phiếu làm nguồn' : 'bấm để chọn'}</small>
        </div>
        <ol className="v7-cau__dk" aria-label="Các khối của câu tổng hợp">
          <li className="v7-dk">
            <span className="v7-o v7-o--dau" aria-hidden="true">
              LỌC
            </span>
            <button
              type="button"
              className={`v7-o v7-o--cot${whereCot ? '' : ' is-trong'}`}
              disabled={khoa || !selectedNguon}
              aria-label={`Cột lọc: ${whereCot || 'không lọc'} — bấm để đổi`}
              onClick={() => doi(() => setWhereCot(vongKe(cot, whereCot)))}
            >
              {whereCot || 'không lọc'}
            </button>
            {whereCot ? (
              <>
                <span className="v7-o v7-o--phep" aria-hidden="true">
                  bằng
                </span>
                {khe('Ô giá trị lọc', whereGiay, setWhereGiay, false)}
              </>
            ) : null}
          </li>
          <li className="v7-dk">
            <span className="v7-o v7-o--dau" aria-hidden="true">
              NHÓM THEO
            </span>
            <button
              type="button"
              className={`v7-o v7-o--cot${nhomTheo ? '' : ' is-trong'}`}
              disabled={khoa || !selectedNguon}
              aria-label={`Nhóm theo: ${nhomTheo || 'chưa chọn cột'} — bấm để đổi`}
              onClick={() => doi(() => setNhomTheo(vongKe(cot, nhomTheo)))}
            >
              {nhomTheo || 'chọn cột'}
            </button>
          </li>
          <li className="v7-dk">
            <span className="v7-o v7-o--dau" aria-hidden="true">
              TÍNH
            </span>
            <span className="v7-o v7-o--phep" title="Mỗi nhóm luôn được đếm số dòng">
              đếm dòng
            </span>
            {khoi.tinh ? (['SUM', 'AVG'] as const).map(nutTinh) : null}
          </li>
          {khoi.giuNhom ? (
            <li className="v7-dk">
              <span className="v7-o v7-o--dau" aria-hidden="true">
                CHỈ GIỮ NHÓM
              </span>
              <button
                type="button"
                className={`v7-o v7-o--cot${giuHam ? '' : ' is-trong'}`}
                disabled={khoa || !selectedNguon}
                aria-label={`Giữ nhóm theo: ${giuHam ? TEN_HAM[giuHam] : 'giữ mọi nhóm'} — bấm để đổi`}
                onClick={() =>
                  doi(() => {
                    const ke = vongKe(['COUNT', 'SUM', 'AVG'], giuHam) as HamTongHop | '';
                    setGiuHam(ke);
                    if (ke && ke !== 'COUNT' && !giuCot) setGiuCot(cotSo[0] ?? '');
                  })
                }
              >
                {giuHam ? `có ${TEN_HAM[giuHam]}` : 'giữ mọi nhóm'}
              </button>
              {giuHam && giuHam !== 'COUNT' ? (
                <button
                  type="button"
                  className="v7-o v7-o--cot"
                  disabled={khoa}
                  aria-label={`Cột của phép giữ nhóm: ${giuCot || 'chưa chọn'} — bấm để đổi`}
                  onClick={() => doi(() => setGiuCot(vongKe(cotSo, giuCot) || (cotSo[0] ?? '')))}
                >
                  {giuCot || 'chọn cột số'}
                </button>
              ) : null}
              {giuHam ? (
                <>
                  <span className="v7-o v7-o--phep" aria-hidden="true">
                    lớn hơn
                  </span>
                  {khe('Ô ngưỡng giữ nhóm', giuGiay, setGiuGiay, true)}
                </>
              ) : null}
            </li>
          ) : null}
        </ol>
      </div>

      <div className={`v7-vung${ketQua ? ' co-ket-qua' : ''}`} aria-live="polite" aria-label="Kết quả">
        {ketQua ? (
          <div className="v7-kq">
            {ketQua.dong.length === 0 ? (
              <p className="v7-kq__trong">Không nhóm nào.</p>
            ) : (
              <table>
                <caption className="visually-hidden">Kết quả truy vấn của bạn</caption>
                <thead>
                  <tr>
                    {ketQua.cot.map((c) => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {ketQua.dong.map((h, r) => (
                    <tr key={r} style={{ ['--i' as string]: Math.min(r, 12) }}>
                      {h.map((v, k) => (
                        <td key={k}>{v === null ? '(trống)' : String(v)}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : (
          <p className="v7-kq__trong">{selectedNguon ? (nhomTheo ? 'Bấm CHẠY để gom nhóm.' : 'Chọn cột để nhóm.') : 'Chọn phiếu làm nguồn.'}</p>
        )}
        <div className="v7-so">
          <div className="v7-so__n">{ketQua ? ketQua.dong.length : '–'}</div>
          <div className="v7-so__l">NHÓM</div>
        </div>
      </div>

      <p className="v7-sql man-tong-hop__sql" aria-label="Câu SQL đang dựng">
        <code>{sqlXemTruoc ? sqlXemTruoc.replace(/\) SELECT /, ')\nSELECT ') : 'SELECT … GROUP BY …'}</code>
      </p>
      <div className="v7-day">
        {dung ? (
          <button type="button" className="v7-nut v7-nut--ghim" disabled={xongRoi} onClick={xong} autoFocus>
            <IconPin className="v7-bt" /> Ghim lên bảng
          </button>
        ) : (
          <button type="button" className="v7-nut v7-nut--chay" disabled={dangChay || !selectedNguon || !nhomTheo} onClick={() => void chay()}>
            <IconPlay className="v7-bt" /> {dangChay ? 'ĐANG CHẠY' : 'CHẠY'}
          </button>
        )}
      </div>
    </div>
  );

  const chibiNoi = loiNoi ? anhTheoTen(`chibi-${loiNoi.speaker}`) : undefined;
  return (
    <VungV7 canh={canh} anhCanh={cauHinh.anh ? anhTheoTen(cauHinh.anh) : undefined} kinhO={cauHinh.kinh} giay={giay} nhan="Tổng hợp dữ liệu">
      {kinh}
      {loiNoi ? (
        <button type="button" className="v7-thoai" onClick={() => setLoiNoi(null)} aria-label={`${tenNguoiNoi(kb, loiNoi.speaker)}: ${loiNoi.text} — bấm để đóng`}>
          {chibiNoi ? <img className="v7-thoai__mat" src={chibiNoi} alt="" draggable={false} /> : null}
          <span className="v7-thoai__than">
            <b>{tenNguoiNoi(kb, loiNoi.speaker)}</b>
            <span>{loiNoi.text}</span>
          </span>
          <span className="v7-thoai__them" aria-hidden="true">
            ✕
          </span>
        </button>
      ) : null}
    </VungV7>
  );
}
