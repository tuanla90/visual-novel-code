/**
 * MÀN TRA DỮ LIỆU KIỂU v7 (docs/mockups/core-game-v7-canh.html; ĐÃ CHỐT B, 30/09/2026): nền là một ảnh cảnh đầy đủ (phòng CLB /
 * phòng máy), phần mềm tra cứu chạy trong mặt kính màn hình, giấy nhớ dán quanh viền màn hình. Người chơi kéo giấy nhớ vào
 * ô giá trị của từng điều kiện (hoặc bấm giấy rồi bấm ô), bấm cột / phép / VÀ–HOẶC để đổi, rồi CHẠY: đống phiếu rơi dần theo
 * từng điều kiện, con số lớn đếm xuống, đóng dấu số dòng. Câu SQL luôn hiện bên dưới, không bắt phải đọc.
 *
 * Máy chỉ MÔ TẢ kết quả (số dòng, bảng); lời Tùng / Hà Vy là lời "Khi …" của thẻ thử thách, hiện thành hộp thoại rồi ẩn.
 * Chạy sai không bị phạt. Đúng (tập kết quả khớp SQL chuẩn, `sql-mvp.ts`) thì hiện nút ghim phiếu lên bảng điều tra.
 * Buổi họp (`fix-query`): cùng màn này nhưng là màn chiếu, câu của Quân nạp sẵn.
 *
 * Từ Vụ 2, thẻ có LOWER/TRIM hay ORDER BY ở SQL chuẩn thì màn có thêm khối tương ứng (`khoiCuaThe`): nút gọt cột trước phép
 * so (y nguyên → bỏ dấu cách thừa → coi như chữ thường → cả hai) và hàng "XẾP THEO" (cột, tăng / giảm). Dấu cách đầu / cuối
 * của ô chữ trong bảng kết quả hiện thành dấu chấm mờ để người chơi nhìn thấy dữ liệu bẩn.
 */
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties, type DragEvent } from 'react';
import type { BoDuLieuMvp, KichBanMvp, LoiMvp, TheThuThachMvp } from '../../../content/mvp/types';
import { soundEngine } from '../../../shared/audio/sound-engine';
import { track } from '../../../shared/telemetry/track';
import { CodeText } from '../../../shared/ui/CodeText';
import type { GiaTriHoSo } from '../../engine/giay-nho';
import { tenNguoiNoi } from '../../engine/may';
import { chamThuThach, chaySql, phanUngSauKhiChay, type KetQuaCham } from '../../engine/sql-mvp';
import {
  TEN_CHUAN_HOA,
  TEN_PHEP,
  VONG_CHUAN_HOA,
  bangNoiTrongSql,
  cauTuSql,
  dieuKienThanhSql,
  khoiCuaThe,
  khungTuSqlChuan,
  tachWhere,
  tenCte,
  thanhSql,
  type CauDung,
  type DieuKienDung,
  type KieuCot,
  type WhereTach,
} from '../../engine/trinh-dung';
import { anhTheoTen } from '../anh-mvp';
import { SoiDieuKienMvp } from '../SoiDieuKienMvp';
import { DongPhieu, type DongPhieuRef } from './DongPhieu';
import { NHIP, ngu } from './nhip';
import './v7.css';

export type CanhTra = 'phong-clb' | 'phong-may' | 'man-chieu';

/** Ảnh cảnh và tọa độ mặt kính trên khung 1600×900 (đo từ ảnh: art/nguon/phong-*-core). */
const CANH: Record<CanhTra, { anh: string | null; kinh: { x: number; y: number; w: number; h: number }; may: string }> = {
  'phong-clb': { anh: 'canh-tra-phong-clb', kinh: { x: 253, y: 60, w: 1094, h: 588 }, may: 'laptop CLB · tài khoản clb_tham_tu' },
  'phong-may': { anh: 'canh-tra-phong-may', kinh: { x: 196, y: 84, w: 1232, h: 628 }, may: 'máy phòng máy · xem theo phiếu tra cứu' },
  'man-chieu': { anh: null, kinh: { x: 190, y: 60, w: 1220, h: 640 }, may: 'màn chiếu phòng họp' },
};

const TOI_DA_DIEU_KIEN = 3;
const TEN_NOI: Record<'AND' | 'OR', string> = { AND: 'VÀ', OR: 'HOẶC' };

/**
 * Số nhịp nhún của mặt chibi khi nhân vật lên tiếng (CSS `v7-chibi-nhun`, 0,32 s/nhịp): câu hiện ra một lần, nên
 * "nói" chừng 45 ms mỗi ký tự rồi đứng yên — từ 2 tới 10 nhịp.
 */
function soNhipNhun(cau: string): number {
  return Math.min(10, Math.max(2, Math.round((cau.length * 0.045) / 0.32)));
}
export interface ManTraV7Props {
  kb: KichBanMvp;
  duLieu: BoDuLieuMvp | null;
  the: TheThuThachMvp;
  mode: 'challenge' | 'fix-query';
  canh: CanhTra;
  giayNho: GiaTriHoSo[];
  dienTen: (t: string) => string;
  /**
   * Thẻ `Kiểu: lọc tiếp`: phiếu kết quả đã ghim dùng làm nguồn thay cho bảng. Câu chạy thành
   * `WITH <tên> AS (<câu của phiếu>) SELECT … FROM <tên> WHERE …` — người chơi thấy phiếu trở thành một "bảng tạm" có tên.
   */
  nguonPhieu?: NguonPhieuV7 | null;
  /** Người chơi bấm ghim / đi tiếp sau khi tra đúng; `dung` = mã các thẻ đã kéo vào câu. */
  onXong: (dung: string[], result?: { sql: string; cot: { ten: string; kieu: 'TEXT' | 'INTEGER' }[]; soDong: number }) => void;
}

export interface NguonPhieuV7 {
  id: string;
  nhan: string;
  sql: string;
  cot: { ten: string; kieu: 'TEXT' | 'INTEGER' }[];
  soDong: number;
}

export function ManTraV7({ kb, duLieu, the, mode, canh, giayNho, dienTen, nguonPhieu, onXong }: ManTraV7Props) {
  const cauHinh = CANH[canh];
  // Nguồn là phiếu: `FROM @<mã phiếu>` của SQL chuẩn thành `FROM <tên tạm>`, mọi câu chạy có tiền tố `WITH <tên tạm> AS (…)`.
  const tenNguon = nguonPhieu ? tenCte(nguonPhieu.id) : null;
  const tienTo = nguonPhieu && tenNguon ? `WITH ${tenNguon} AS (${nguonPhieu.sql.trim().replace(/;\s*$/, '')}) ` : '';
  const sqlChuan = useMemo(
    () => (nguonPhieu && tenNguon ? the.sqlChuan.replace(new RegExp(`@${nguonPhieu.id}(?![a-z0-9-])`, 'i'), tenNguon) : the.sqlChuan),
    [the.sqlChuan, nguonPhieu, tenNguon],
  );
  const khung = useMemo(() => khungTuSqlChuan(sqlChuan), [sqlChuan]);
  const bang = useMemo(() => {
    if (nguonPhieu && tenNguon) return { ten: tenNguon, cot: nguonPhieu.cot, soDong: nguonPhieu.soDong };
    const b = duLieu?.bang.find((x) => x.ten === khung?.bang);
    return b ? { ten: b.ten, cot: b.cot, soDong: b.dong.length } : undefined;
  }, [duLieu, khung, nguonPhieu, tenNguon]);
  const khoi = useMemo(() => khoiCuaThe(sqlChuan), [sqlChuan]);
  // Khối "nối với" (thẻ có JOIN): các bảng được chọn khai ở thẻ, thiếu thì lấy bảng JOIN của SQL chuẩn.
  const bangNoiDuoc = useMemo(() => (khoi.noi ? (the.bangNoi?.length ? the.bangNoi : bangNoiTrongSql(sqlChuan)) : []), [khoi.noi, the.bangNoi, sqlChuan]);

  const [cau, setCau] = useState<CauDung>(() => {
    const napSan = mode === 'fix-query' && the.truyVanNapSan ? cauTuSql(the.truyVanNapSan) : null;
    if (napSan) return napSan;
    const cotGoc = bang?.cot.map((c) => c.ten) ?? [];
    return {
      khung: khung?.khung ?? '',
      dieuKien: [0, 1].map((i) => ({ cot: cotGoc[i % Math.max(1, cotGoc.length)] ?? '', phep: 'bang', giaTri: null })),
      noi: ['AND'],
    };
  });
  const bangNoi = useMemo(() => (cau.noiBang?.bang ? duLieu?.bang.find((b) => b.ten === cau.noiBang?.bang) : undefined), [duLieu, cau.noiBang?.bang]);
  /** Cột chung của bảng gốc và bảng nối (ứng viên khóa nối; trong điều kiện được viết `<bảng gốc>.<cột>`). */
  const cotChung = useMemo(() => (bang && bangNoi ? bang.cot.map((c) => c.ten).filter((t) => bangNoi.cot.some((c) => c.ten === t)) : []), [bang, bangNoi]);
  const cot = useMemo(() => [...(bang?.cot.map((c) => c.ten) ?? []), ...(bangNoi?.cot.map((c) => c.ten).filter((t) => !cotChung.includes(t)) ?? [])], [bang, bangNoi, cotChung]);
  const kieuCot = useCallback((ten: string): KieuCot => bang?.cot.find((c) => c.ten === ten)?.kieu ?? bangNoi?.cot.find((c) => c.ten === ten)?.kieu ?? 'TEXT', [bang, bangNoi]);
  const tongDong = bang?.soDong ?? 0;
  const sqlNgoai = thanhSql(cau, kieuCot, cotChung);
  const sql = tienTo + sqlNgoai;
  const [dangChon, setDangChon] = useState<GiaTriHoSo | null>(null);
  const [cham, setCham] = useState<KetQuaCham | null>(null);
  const [daChay, setDaChay] = useState<WhereTach | null>(null);
  const [dangChay, setDangChay] = useState(false);
  const [soi, setSoi] = useState(false);
  const [so, setSo] = useState<{ n: number; nhan: string }>({ n: tongDong, nhan: 'DÒNG' });
  const [dau, setDau] = useState<number | null>(null);
  const [loiNoi, setLoiNoi] = useState<LoiMvp[]>([]);
  const [xongRoi, setXongRoi] = useState(false);
  const phieu = useRef<DongPhieuRef>(null);
  const banRon = useRef(false);
  const song = useRef(true);
  useEffect(() => {
    song.current = true;
    return () => {
      song.current = false;
    };
  }, []);

  const dung = cham?.trangThai === 'dung';
  const khoa = dung || dangChay;

  /** Sửa câu → kết quả cũ không còn là kết quả của câu đang hiện: xóa đi, đống phiếu về đủ. */
  const doiCau = useCallback(
    (f: (c: CauDung) => CauDung): void => {
      setCau(f);
      setCham(null);
      setDaChay(null);
      setSoi(false);
      setDau(null);
      setLoiNoi([]);
      setSo({ n: tongDong, nhan: 'DÒNG' });
      phieu.current?.datLai();
    },
    [tongDong],
  );
  const doiDk = (i: number, f: (d: DieuKienDung) => DieuKienDung): void => doiCau((c) => ({ ...c, dieuKien: c.dieuKien.map((d, k) => (k === i ? f(d) : d)) }));
  const dat = (i: number, g: GiaTriHoSo): void => {
    soundEngine.playSfx('select');
    doiDk(i, (d) => ({ ...d, giaTri: { nguon: 'giay-nho', tho: g.giaTri, nhieu: g.nhieu, the: g.the } }));
    setDangChon(null);
  };
  const tha = (i: number) => (e: DragEvent) => {
    e.preventDefault();
    const g = giayNho.find((x) => x.khoa === e.dataTransfer.getData('text/plain'));
    if (g && !khoa) dat(i, g);
  };

  const demToi = useCallback(async (tu: number, toi: number, ms: number, nhan: string): Promise<void> => {
    if (NHIP === 0) {
      setSo({ n: toi, nhan });
      return;
    }
    // Đếm bằng setTimeout, không bằng requestAnimationFrame: tab bị ẩn thì rAF đứng, lần chạy sẽ treo ở "ĐANG CHẠY".
    await new Promise<void>((xong) => {
      const t0 = Date.now();
      const buoc = (): void => {
        if (!song.current) return xong();
        const k = Math.min(1, (Date.now() - t0) / ms);
        setSo({ n: Math.round(tu + (toi - tu) * (1 - Math.pow(1 - k, 3))), nhan });
        if (k < 1) setTimeout(buoc, 16);
        else xong();
      };
      buoc();
    });
  }, []);

  const chay = useCallback(async () => {
    if (!duLieu || !khung || banRon.current || dung) return;
    banRon.current = true;
    setDangChay(true);
    setCham(null);
    setSoi(false);
    setDau(null);
    setLoiNoi([]);
    phieu.current?.datLai();
    setSo({ n: tongDong, nhan: 'DÒNG' });
    soundEngine.playSfx('click');
    try {
      const kq = await chamThuThach(duLieu, sql, tienTo + sqlChuan);
      const tach = kq.trangThai === 'loi' ? null : tachWhere(sqlNgoai);
      const t = tach && tienTo ? { ...tach, tienTo } : tach;
      track({
        type: 'mvp_query_run',
        challengeId: the.id,
        mode: 'keo',
        rows: kq.trangThai === 'loi' ? null : kq.so.soDongNguoiChoi,
        error: kq.trangThai === 'loi',
        correct: kq.trangThai === 'dung',
      });
      if (kq.trangThai !== 'loi') {
        const n = kq.chay.dong.length;
        if (t) {
          // Mỗi dòng của bảng qua / không qua từng điều kiện, và có được giữ theo cách nối không.
          const giu = t.dieuKien.reduce((acc, d, i) => (i === 0 ? `(${d})` : `${acc} ${t.noi[i - 1] ?? 'AND'} (${d})`), '');
          const co = await chaySql(duLieu, `${tienTo}SELECT ${t.dieuKien.map((d) => `CASE WHEN ${d} THEN 1 ELSE 0 END`).join(', ')}, CASE WHEN ${giu} THEN 1 ELSE 0 END FROM ${t.bang}`);
          if (co.ok && song.current) {
            const soDk = t.dieuKien.length;
            const hang = co.dong;
            const toanVa = t.noi.every((x) => x === 'AND');
            if (toanVa) {
              let con = hang.map((_h, k) => k);
              for (let i = 0; i < soDk; i++) {
                const qua = con.filter((k) => hang[k]?.[i] === 1);
                phieu.current?.toMau(qua, (i % 3) + 1);
                phieu.current?.tha(con.filter((k) => hang[k]?.[i] !== 1));
                await demToi(con.length, qua.length, 600, `${i > 0 ? 'VÀ ' : ''}${t.dieuKien[i] ?? ''}`);
                con = qua;
                await ngu(220);
              }
            } else {
              for (let i = 0; i < soDk; i++) {
                phieu.current?.toMau(
                  hang.map((_h, k) => k).filter((k) => hang[k]?.[i] === 1),
                  (i % 3) + 1,
                );
              }
              await ngu(480);
              phieu.current?.tha(hang.map((_h, k) => k).filter((k) => hang[k]?.[soDk] !== 1));
              await demToi(hang.length, n, 750, t.noi.every((x) => x === 'OR') ? 'HOẶC: khớp một điều kiện là được giữ' : 'DÒNG');
            }
            if (n <= 12) phieu.current?.toMau(hang.map((_h, k) => k).filter((k) => hang[k]?.[soDk] === 1), 4);
          }
        }
        if (!song.current) return;
        setSo({ n, nhan: 'DÒNG' });
        setDau(n);
        soundEngine.playSfx(kq.trangThai === 'dung' ? 'chime' : 'sai');
        await ngu(380);
      }
      if (!song.current) return;
      setCham(kq);
      setDaChay(t);
      setLoiNoi(
        phanUngSauKhiChay(
          the,
          kq,
          cau.dieuKien.filter((d) => d.giaTri !== null).map((d) => d.cot),
        ),
      );
    } finally {
      banRon.current = false;
      if (song.current) setDangChay(false);
    }
  }, [duLieu, khung, dung, sql, sqlNgoai, sqlChuan, tienTo, the, tongDong, demToi, cau]);

  if (!duLieu) return <p className="game__error">Vụ này chưa có bộ dữ liệu (du-lieu.md) nên không chạy được.</p>;
  if (!khung || !bang) return <p className="game__error">Thẻ thử thách này thiếu khung SELECT … FROM … hợp lệ.</p>;

  const laChieu = canh === 'man-chieu';
  const anhCanh = cauHinh.anh ? anhTheoTen(cauHinh.anh) : undefined;
  const loi = loiNoi[0];
  const chibiNoi = loi ? anhTheoTen(`chibi-${loi.speaker}`) : undefined;
  const dungCacThe = [...new Set(cau.dieuKien.map((d) => (d.giaTri?.nguon === 'giay-nho' ? d.giaTri.the : undefined)).filter((x): x is string => !!x))];
  const xong = (): void => {
    if (xongRoi) return;
    setXongRoi(true);
    const duocDungLamNguon = !!the.vatChung && Object.values(kb.thuThach).some((challenge) => challenge.nguon === the.vatChung?.id);
    if (duocDungLamNguon && cham?.trangThai === 'dung' && cham.chay.ok) {
      onXong(dungCacThe, {
        sql,
        cot: cham.chay.cot.map((ten, i) => ({
          ten,
          kieu: bang?.cot.find((c) => c.ten === ten)?.kieu ?? (typeof cham.chay.dong.find((row) => row[i] !== null)?.[i] === 'number' ? 'INTEGER' : 'TEXT'),
        })),
        soDong: cham.chay.dong.length,
      });
    } else onXong(dungCacThe);
  };

  // Giấy nhớ quanh viền: nửa trái, nửa phải; nhiều hơn 8 tờ thì xếp sát lại.
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
      onClick={() => {
        soundEngine.playSfx('tab');
        setDangChon(dangChon?.khoa === g.khoa ? null : g);
      }}
    >
      <span className="v7-giay__chu">{g.nhieu ? g.nhieu.map((v) => <span key={v}>{v}</span>) : g.giaTri}</span>
      <small className="v7-giay__nguon">{dienTen(g.nguon).replace(/^\[|\]$/g, '')}</small>
    </button>
  ));

  const kinh = (
    <div className="v7-kinh" data-region="sql">
      <div className="v7-thanh">
        <span>▣ tra-cuu — {cauHinh.may}</span>
      </div>
      <p className="v7-de">{dienTen(the.deBai)}</p>
      <div className="v7-cau">
        <div className="v7-cau__bang">
          {nguonPhieu ? (
            <span className="v7-o v7-o--bang v7-o--phieu" title={`Phiếu đã ghim "${dienTen(nguonPhieu.nhan)}" dùng làm nguồn, tên tạm ${bang.ten}`}>
              <span aria-hidden="true">📌</span> {dienTen(nguonPhieu.nhan)}
            </span>
          ) : (
            <span className="v7-o v7-o--bang" title={`Bảng ${bang.ten}`}>
              <span aria-hidden="true">🔒</span> {bang.ten}
            </span>
          )}
          <small>{tongDong} dòng</small>
        </div>
        <ol className="v7-cau__dk" aria-label="Các điều kiện">
          {khoi.noi ? (
            <li className="v7-dk v7-noi" aria-label="Nối với bảng khác">
              <span className="v7-o v7-o--dau" aria-hidden="true">
                NỐI VỚI
              </span>
              <button
                type="button"
                className={`v7-o v7-o--bang v7-o--noi-bang${cau.noiBang?.bang ? '' : ' is-trong'}`}
                disabled={khoa}
                aria-label={`Nối với bảng: ${cau.noiBang?.bang || 'chưa nối'} — bấm để đổi`}
                onClick={() =>
                  doiCau((c) => {
                    // Vòng: chưa nối → từng bảng → chưa nối. Đổi bảng thì chọn lại khóa; cột điều kiện thuộc bảng cũ về cột đầu.
                    const k = c.noiBang?.bang ? bangNoiDuoc.indexOf(c.noiBang.bang) + 1 : 0;
                    const ke = bangNoiDuoc[k];
                    const cotGoc = bang?.cot.map((x) => x.ten) ?? [];
                    return { ...c, noiBang: ke === undefined ? null : { bang: ke, cot: '' }, dieuKien: c.dieuKien.map((d) => (cotGoc.includes(d.cot) ? d : { ...d, cot: cotGoc[0] ?? d.cot })) };
                  })
                }
              >
                {cau.noiBang?.bang ? `${cau.noiBang.bang}` : 'chưa nối'}
              </button>
              {cau.noiBang?.bang ? (
                <>
                  <span className="v7-o v7-o--dau" aria-hidden="true">
                    THEO
                  </span>
                  <button
                    type="button"
                    className={`v7-o v7-o--cot${cau.noiBang.cot ? '' : ' is-trong'}`}
                    disabled={khoa}
                    aria-label={`Cột nối: ${cau.noiBang.cot || 'chưa chọn'} — bấm để đổi`}
                    onClick={() =>
                      doiCau((c) => {
                        if (!c.noiBang) return c;
                        const ke = cotChung[(cotChung.indexOf(c.noiBang.cot) + 1) % Math.max(1, cotChung.length)];
                        return { ...c, noiBang: { ...c.noiBang, cot: ke ?? '' } };
                      })
                    }
                  >
                    {cau.noiBang.cot || 'chưa chọn cột'}
                  </button>
                </>
              ) : null}
            </li>
          ) : null}
          {cau.dieuKien.map((d, i) => {
            const noi = cau.noi[i - 1] ?? 'AND';
            const nhieu = d.giaTri?.nguon === 'giay-nho' && (d.giaTri.nhieu?.length ?? 0) > 1;
            return (
              <li key={i} className="v7-dk" data-dk={i + 1}>
                {i > 0 ? (
                  <button
                    type="button"
                    className={`v7-o v7-o--noi${noi === 'OR' ? ' is-hoac' : ''}`}
                    disabled={khoa}
                    aria-label={`Nối điều kiện ${i + 1}: ${TEN_NOI[noi]} (${noi}) — bấm để đổi`}
                    onClick={() => doiCau((c) => ({ ...c, noi: c.noi.map((x, k) => (k === i - 1 ? (x === 'AND' ? 'OR' : 'AND') : x)) }))}
                  >
                    {TEN_NOI[noi]}
                  </button>
                ) : (
                  <span className="v7-o v7-o--dau" aria-hidden="true">
                    LỌC
                  </span>
                )}
                <button
                  type="button"
                  className="v7-o v7-o--cot"
                  disabled={khoa}
                  aria-label={`Cột của điều kiện ${i + 1}: ${d.cot} — bấm để đổi`}
                  onClick={() => doiDk(i, (x) => ({ ...x, cot: cot[(cot.indexOf(x.cot) + 1) % cot.length] ?? x.cot }))}
                >
                  {d.cot}
                </button>
                {khoi.chuanHoa && kieuCot(d.cot) === 'TEXT' ? (
                  <button
                    type="button"
                    className={`v7-o v7-o--got${d.chuanHoa && d.chuanHoa !== 'khong' ? ' is-bat' : ''}`}
                    disabled={khoa}
                    aria-label={`Gọt cột ${d.cot} trước khi so: ${TEN_CHUAN_HOA[d.chuanHoa ?? 'khong']} — bấm để đổi`}
                    onClick={() => doiDk(i, (x) => ({ ...x, chuanHoa: VONG_CHUAN_HOA[(VONG_CHUAN_HOA.indexOf(x.chuanHoa ?? 'khong') + 1) % VONG_CHUAN_HOA.length] ?? 'khong' }))}
                  >
                    {TEN_CHUAN_HOA[d.chuanHoa ?? 'khong']}
                  </button>
                ) : null}
                <button
                  type="button"
                  className="v7-o v7-o--phep"
                  disabled={khoa}
                  aria-label={`Phép so sánh của điều kiện ${i + 1}: ${TEN_PHEP[d.phep]} — bấm để đổi`}
                  onClick={() => doiDk(i, (x) => ({ ...x, phep: x.phep === 'bang' ? 'bat-dau-bang' : 'bang' }))}
                >
                  {nhieu && d.phep === 'bang' ? 'là một trong' : TEN_PHEP[d.phep]}
                </button>
                <button
                  type="button"
                  className={`v7-khe${d.giaTri ? ' is-co' : ''}${dangChon && !d.giaTri ? ' is-moi' : ''}`}
                  disabled={khoa}
                  aria-label={d.giaTri ? `Giá trị điều kiện ${i + 1}: ${d.giaTri.tho} — bấm để gỡ` : `Ô giá trị điều kiện ${i + 1}: thả giấy nhớ vào đây`}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={tha(i)}
                  onClick={() => {
                    if (dangChon) dat(i, dangChon);
                    else if (d.giaTri) doiDk(i, (x) => ({ ...x, giaTri: null }));
                  }}
                >
                  {d.giaTri ? <span className="v7-khe__giay">{d.giaTri.tho}</span> : 'thả giấy nhớ'}
                </button>
                {cau.dieuKien.length > 1 && !laChieu ? (
                  <button
                    type="button"
                    className="v7-o v7-o--bo"
                    disabled={khoa}
                    aria-label={`Bỏ điều kiện ${i + 1}`}
                    onClick={() => doiCau((c) => ({ ...c, dieuKien: c.dieuKien.filter((_x, k) => k !== i), noi: c.noi.filter((_x, k) => k !== Math.max(0, i - 1)) }))}
                  >
                    ×
                  </button>
                ) : null}
              </li>
            );
          })}
          {cau.dieuKien.length < TOI_DA_DIEU_KIEN && !laChieu ? (
            <li>
              <button
                type="button"
                className="v7-o v7-o--them"
                disabled={khoa}
                aria-label="Thêm điều kiện"
                onClick={() => doiCau((c) => ({ ...c, dieuKien: [...c.dieuKien, { cot: cot[c.dieuKien.length % Math.max(1, cot.length)] ?? '', phep: 'bang', giaTri: null }], noi: [...c.noi, 'AND'] }))}
              >
                +
              </button>
            </li>
          ) : null}
          {khoi.sapXep ? (
            <li className="v7-dk v7-xep" aria-label="Xếp kết quả">
              <span className="v7-o v7-o--dau" aria-hidden="true">
                XẾP THEO
              </span>
              <button
                type="button"
                className={`v7-o v7-o--cot${cau.xep ? '' : ' is-trong'}`}
                disabled={khoa}
                aria-label={`Xếp theo: ${cau.xep ? cau.xep.cot : 'chưa xếp'} — bấm để đổi`}
                onClick={() =>
                  doiCau((c) => {
                    // Vòng: chưa xếp → từng cột → chưa xếp.
                    const k = c.xep ? cot.indexOf(c.xep.cot) + 1 : 0;
                    const ke = cot[k];
                    return { ...c, xep: ke === undefined ? null : { cot: ke, giam: c.xep?.giam ?? false } };
                  })
                }
              >
                {cau.xep ? cau.xep.cot : 'chưa xếp'}
              </button>
              {cau.xep ? (
                <button
                  type="button"
                  className="v7-o v7-o--phep"
                  disabled={khoa}
                  aria-label={`Chiều xếp: ${cau.xep.giam ? 'giảm dần' : 'tăng dần'} — bấm để đổi`}
                  onClick={() => doiCau((c) => (c.xep ? { ...c, xep: { ...c.xep, giam: !c.xep.giam } } : c))}
                >
                  {cau.xep.giam ? '↓ giảm dần' : '↑ tăng dần'}
                </button>
              ) : null}
            </li>
          ) : null}
        </ol>
      </div>

      <div className={`v7-vung${cham && cham.trangThai !== 'loi' ? ' co-ket-qua' : ''}`} aria-live="polite" aria-label="Kết quả">
        <DongPhieu ref={phieu} tong={tongDong} />
        {cham && cham.trangThai !== 'loi' && !soi ? (
          <div className="v7-kq">
            {cham.chay.dong.length === 0 ? (
              <p className="v7-kq__trong">Không dòng nào.</p>
            ) : (
              <table>
                <caption className="visually-hidden">Kết quả truy vấn của bạn</caption>
                <thead>
                  <tr>
                    {cham.chay.cot.map((c) => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {cham.chay.dong.map((h, r) => (
                    <tr key={r} style={{ ['--i' as string]: Math.min(r, 12) }}>
                      {h.map((v, k) => (
                        <td key={k}>{v === null ? '(trống)' : <ChuCoDauCach chu={String(v)} />}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        ) : null}
        {cham?.trangThai === 'loi' ? <p className="v7-loi">Chưa chạy được: {cham.chay.thongDiep}</p> : null}
        {soi && daChay ? (
          <div className="v7-soi">
            <SoiDieuKienMvp duLieu={duLieu} where={daChay} onDong={() => setSoi(false)} />
          </div>
        ) : null}
        {dau !== null ? (
          <div className={`v7-dau${dung ? ' is-dung' : ''}`} key={`${dau}-${dung}`}>
            {dau} DÒNG
          </div>
        ) : null}
        <div className="v7-so" aria-hidden={dau !== null}>
          <div className="v7-so__n">{so.n}</div>
          <div className="v7-so__l">{so.nhan}</div>
        </div>
      </div>

      <p className="v7-sql" aria-label="Câu SQL đang dựng">
        <CauSql cau={cau} kieuCot={kieuCot} cotChung={cotChung} cte={nguonPhieu && tenNguon ? { ten: tenNguon, nhan: dienTen(nguonPhieu.nhan) } : null} />
      </p>
      <div className="v7-day">
        {daChay && cham && cham.trangThai !== 'loi' ? (
          <button type="button" className={`v7-nut v7-nut--soi${soi ? ' is-mo' : ''}`} onClick={() => setSoi(!soi)}>
            🔍 Xem từng điều kiện
          </button>
        ) : null}
        {dung ? (
          <button type="button" className="v7-nut v7-nut--ghim" disabled={xongRoi} onClick={xong} autoFocus>
            {the.vatChung && !laChieu ? '📌 Ghim lên bảng' : 'Tiếp tục'}
          </button>
        ) : (
          <button type="button" className="v7-nut v7-nut--chay" disabled={dangChay} onClick={() => void chay()}>
            ▶ {dangChay ? 'ĐANG CHẠY' : 'CHẠY'}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <VungV7 canh={canh} anhCanh={anhCanh} kinhO={cauHinh.kinh} giay={laChieu ? null : giay} nhan={mode === 'fix-query' ? 'Sửa truy vấn' : 'Tra dữ liệu'}>
      {kinh}
      {loi ? (
        <button
          type="button"
          className="v7-thoai"
          onClick={() => setLoiNoi((ds) => ds.slice(1))}
          aria-label={`${tenNguoiNoi(kb, loi.speaker)}: ${dienTen(loi.text)} — bấm để đóng`}
        >
          {chibiNoi ? (
            <img
              key={`${loiNoi.length}-${loi.text}`}
              className="v7-thoai__mat"
              src={chibiNoi}
              alt=""
              draggable={false}
              style={{ ['--nhip' as string]: soNhipNhun(loi.text) }}
            />
          ) : null}
          <span className="v7-thoai__than">
            <b>{tenNguoiNoi(kb, loi.speaker)}</b>
            <span>
              <CodeText text={dienTen(loi.text)} />
            </span>
          </span>
          <span className="v7-thoai__them" aria-hidden="true">
            {loiNoi.length > 1 ? '▼' : '✕'}
          </span>
        </button>
      ) : null}
    </VungV7>
  );
}

/** Câu SQL tô màu: từ khóa xanh, giá trị vàng, mỗi điều kiện gạch chân cùng màu với phiếu của nó. */
function CauSql({ cau, kieuCot, cotChung = [], cte }: { cau: CauDung; kieuCot: (c: string) => KieuCot; cotChung?: readonly string[]; cte?: { ten: string; nhan: string } | null }) {
  const m = /^SELECT\s+(.+?)\s+FROM\s+(\S+)$/i.exec(cau.khung);
  const nb = cau.noiBang && cau.noiBang.bang && cau.noiBang.cot ? cau.noiBang : null;
  const q = (c: string): string => (nb && cotChung.includes(c) ? `${m?.[2] ?? ''}.${c}` : c);
  const phan = cau.dieuKien
    .map((d, i) => ({ chu: dieuKienThanhSql({ ...d, cot: q(d.cot) }, kieuCot(d.cot)), i }))
    .filter((x): x is { chu: string; i: number } => x.chu !== null);
  return (
    <code>
      {cte ? (
        <>
          <span className="k">WITH</span> {cte.ten} <span className="k">AS</span> (<span className="v7-sql__phieu">phiếu “{cte.nhan}”</span>){' '}
        </>
      ) : null}
      <span className="k">SELECT</span> {m?.[1] ?? '*'} <span className="k">FROM</span> {m?.[2] ?? ''}
      {nb ? (
        <>
          {' '}
          <span className="k">JOIN</span> {nb.bang} <span className="k">ON</span> {m?.[2] ?? ''}.{nb.cot} = {nb.bang}.{nb.cot}
        </>
      ) : null}
      {phan.length > 0 ? (
        <>
          {' '}
          <span className="k">WHERE</span>
          {phan.map((p, k) => (
            <span key={p.i}>
              {k > 0 ? <span className="k"> {cau.noi[p.i - 1] ?? 'AND'}</span> : null}{' '}
              <span className={`u u${(p.i % 3) + 1}`}>{toMauDieuKien(p.chu)}</span>
            </span>
          ))}
        </>
      ) : null}
      {cau.xep && cau.xep.cot !== '' ? (
        <>
          {' '}
          <span className="k">ORDER BY</span> {q(cau.xep.cot)}
          {cau.xep.giam ? <span className="k"> DESC</span> : null}
        </>
      ) : null}
    </code>
  );
}

/** Ô chữ có dấu cách đầu / cuối: mỗi dấu cách hiện thành một chấm mờ (dữ liệu nhập tay hay dính dấu cách thừa). */
export function ChuCoDauCach({ chu }: { chu: string }) {
  const m = /^(\s*)([\s\S]*?)(\s*)$/.exec(chu);
  const dau = m?.[1] ?? '';
  const cuoi = m?.[3] ?? '';
  if (dau === '' && cuoi === '') return <>{chu}</>;
  const cham = (s: string) =>
    s === '' ? null : (
      <span className="v7-dau-cach" aria-label={`${s.length} dấu cách`} title={`${s.length} dấu cách`}>
        {'·'.repeat(s.length)}
      </span>
    );
  return (
    <>
      {cham(dau)}
      {m?.[2] ?? ''}
      {cham(cuoi)}
    </>
  );
}

function toMauDieuKien(chu: string) {
  return chu.split(/('(?:[^']|'')*'|\b(?:LIKE|IN|OR|LOWER|TRIM)\b)/g).map((x, i) =>
    /^'/.test(x) ? (
      <span key={i} className="s">
        {x}
      </span>
    ) : /^(LIKE|IN|OR|LOWER|TRIM)$/.test(x) ? (
      <span key={i} className="k">
        {x}
      </span>
    ) : (
      x
    ),
  );
}

/**
 * Khung cảnh: màn ngang thì vẽ cảnh 1600×900 co vừa vùng chứa, mặt kính nằm đúng chỗ màn hình trong ảnh, giấy nhớ dán quanh
 * viền; màn dọc (điện thoại) thì bỏ cảnh, giấy nhớ thành một dải phía trên, màn hình chiếm phần còn lại.
 */
export function VungV7({
  canh,
  anhCanh,
  kinhO,
  giay,
  nhan,
  children,
}: {
  canh: CanhTra | 'loc-thu';
  anhCanh: string | undefined;
  kinhO: { x: number; y: number; w: number; h: number };
  giay: React.ReactNode;
  nhan: string;
  children: React.ReactNode;
}) {
  const goc = useRef<HTMLDivElement>(null);
  const [co, setCo] = useState<{ w: number; h: number } | null>(null);
  useEffect(() => {
    const el = goc.current;
    if (!el) return;
    const do_ = (): void => setCo({ w: el.clientWidth, h: el.clientHeight });
    do_();
    if (typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(do_);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);
  const doc = co !== null && co.w > 0 && co.w / Math.max(1, co.h) < 1.15;
  const tiLe = co && co.w > 0 ? Math.min(co.w / 1600, co.h / 900) : 1;
  const [kinh, ...khac] = Array.isArray(children) ? children : [children];
  return (
    <div ref={goc} className={`v7 ${doc ? 'v7--doc' : 'v7--ngang'}`} data-canh={canh} role="region" aria-label={nhan}>
      {doc ? (
        <>
          {giay ? <div className="v7-dai">{giay}</div> : null}
          <div className="v7-o-kinh">{kinh}</div>
        </>
      ) : (
        <div className="v7-san" style={{ transform: `translate(-50%, -50%) scale(${tiLe})` }}>
          {anhCanh ? <img className="v7-nen" src={anhCanh} alt="" draggable={false} /> : null}
          <div className="v7-o-kinh" style={{ left: kinhO.x, top: kinhO.y, width: kinhO.w, height: kinhO.h }}>
            {kinh}
          </div>
          {giay}
        </div>
      )}
      {khac}
    </div>
  );
}
