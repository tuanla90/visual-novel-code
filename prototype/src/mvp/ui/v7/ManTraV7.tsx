/**
 * MÀN TRA DỮ LIỆU KIỂU v7 (docs/mockups/core-game-v7-canh.html; ĐÃ CHỐT B, 30/09/2026): nền là một ảnh cảnh đầy đủ (phòng CLB /
 * phòng máy), phần mềm tra cứu chạy trong mặt kính màn hình, giấy nhớ dán quanh viền màn hình. Người chơi kéo giấy nhớ vào
 * ô giá trị của từng điều kiện (hoặc bấm giấy rồi bấm ô), bấm cột / phép / VÀ–HOẶC để đổi, rồi CHẠY: đống phiếu rơi dần theo
 * từng điều kiện, con số lớn đếm xuống, đóng dấu số dòng. Câu SQL luôn hiện bên dưới, không bắt phải đọc.
 *
 * Máy chỉ MÔ TẢ kết quả (số dòng, bảng); lời Tùng / Hà Vy là lời "Khi …" của thẻ thử thách, hiện thành hộp thoại và Ở LẠI cho
 * tới lần chạy sau (người chơi bấm thì đóng).
 *
 * Gói B14 (05/10/2026, sáu góp ý của user khi chơi thử c-ten-h, docs/mua-1/brief/b14-man-tra.md):
 * - Bạn đi cùng đứng ở góc phải trên (`BanDiCungManTra`): bấm vào, chạy trượt hai lần liền, hay chạy sai mà không ai nói gì thì
 *   bạn gợi ý hai bậc bằng lời viết sẵn của thẻ (`engine/goi-y-man-tra.ts`).
 * - Giấy nhớ không dán sát nhau, tờ có "Chữ trên giấy" in cả câu (`giay-nho-quanh.ts`, `GiayNhoV7`).
 * - Lần chạy nào cũng có hoạt cảnh; đã có bảng mà lần chạy mới làm bảng hẹp lại thì dòng rụng khỏi chính bảng ấy
 *   (`hoat-canh-bang.ts`); bảng vài nghìn dòng vẫn có đống phiếu rơi.
 * - Thẻ có "Bấm ô lấy giấy nhớ" mà phiếu chỉ giữ vài giá trị (vd hai mã trong danh sách cả lớp): chỉ phải bấm đúng các ô ấy.
 * Chạy sai không bị phạt. Đúng (tập kết quả khớp SQL chuẩn, `sql-mvp.ts`) thì hiện nút ghim phiếu lên bảng điều tra.
 * Buổi họp (`fix-query`): cùng màn này nhưng là màn chiếu, câu của Quân nạp sẵn.
 *
 * Từ Vụ 2, thẻ có LOWER/TRIM hay ORDER BY ở SQL chuẩn thì màn có thêm khối tương ứng (`khoiCuaThe`): nút gọt cột trước phép
 * so (y nguyên → bỏ dấu cách thừa → coi như chữ thường → cả hai) và hàng "XẾP THEO" (cột, tăng / giảm). Dấu cách đầu / cuối
 * của ô chữ trong bảng kết quả hiện thành dấu chấm mờ để người chơi nhìn thấy dữ liệu bẩn.
 *
 * Gói B17 (06/10/2026, docs/mua-1/brief/b17-hai-cau-hoi-dau-van.md), chỉ bộ mùa 1 truyền `mucSql` / `mucNhapVai`:
 * - "Ghép khối, chữ SQL": cùng giao diện, nhãn các ô là từ khóa SQL (`engine/nhan-man-tra.ts`), lời gợi ý bậc 2 đổi chữ lúc hiện.
 * - "Tự viết": ô gõ SQL nhiều dòng thay ba cột ghép (bấm giấy nhớ chèn giá trị vào chỗ con trỏ, "Khảo sát bảng" vẫn có); chấm bằng
 *   cùng `chamThuThach` (kể cả luật hẹp B15); lỗi SQLite dịch gọn dưới ô gõ (`engine/dich-loi-sqlite.ts`); bậc 2 của bạn đi cùng là
 *   lời bậc 1 kèm câu SQL chuẩn che giá trị. Màn sửa câu ở buổi họp (`fix-query`) không đổi theo mức.
 * - Mức nhập vai "Như thật": bạn đi cùng không tự lên tiếng (chỉ khi bấm ảnh mặt).
 */
import type { QuanSatTruyVanMvp } from '../../engine/tri-nho-dong-hanh';
import { useCallback, useEffect, useMemo, useRef, useState, type DragEvent } from 'react';
import { createPortal } from 'react-dom';
import { useCheDoGo } from '../ban-phim-ao';
import type { BoDuLieuMvp, KichBanMvp, LoiMvp, TheThuThachMvp } from '../../../content/mvp/types';
import { soundEngine } from '../../../shared/audio/sound-engine';
import { track } from '../../../shared/telemetry/track';
import { CodeText } from '../../../shared/ui/CodeText';
import { IconLock, IconPin, IconPlay, IconPointer, IconSearch } from '../../../shared/ui/icons';
import { dichLoiSqlite } from '../../engine/dich-loi-sqlite';
import type { GiaTriHoSo } from '../../engine/giay-nho';
import { tenNguoiNoi } from '../../engine/may';
import { tuGoiY } from '../../engine/muc-choi';
import { cheGiaTriSql, nhanManTra, thayChuGoiY } from '../../engine/nhan-man-tra';
import { chamThuThach, chaySql, phanUngSauKhiChay, type KetQuaCham, type LuatHep } from '../../engine/sql-mvp';
import type { MucNhapVaiMvp, MucSqlMvp } from '../../engine/trang-thai';
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
import { TRUOT_GOI_Y_MAN_TRA, chonGoiY, nguoiGoiY, xinGoiY, type BongManTra, type LanChayManTra } from '../../engine/goi-y-man-tra';
import { BanDiCungManTra } from './BanDiCungManTra';
import { DongPhieu, type DongPhieuRef } from './DongPhieu';
import { ChuGiay } from './GiayNhoV7';
import { leGiay, lopGiay, nhanGiay, viTriGiay } from './giay-nho-quanh';
import { KiemPhieu } from './KiemPhieu';
import { RUNG_MS, demSo, hepLai, thuocTinhDongRung, useRungBang, type BangKetQua } from './hoat-canh-bang';
import { giamChuyenDong, ngu } from './nhip';
import { CANH_TRA, type CanhTra, type NguonPhieuV7 } from './canh-tra';
import { KhungNguonBangV7 } from './KhungNguonBangV7';
import { nhanKhoi } from '../../engine/nhan-khoi';
import { KhungCotVaXepV7 } from './KhungCotVaXepV7';
import { XemTruocBangModal } from './XemTruocBangModal';
import { boNhapManTra, ghiNhapManTra, layNhapManTra } from './nhap-man-tra';
import './v7.css';

export type { CanhTra, NguonPhieuV7 } from './canh-tra';

/** Tối đa 6 điều kiện WHERE để phục vụ các bài lọc nhiều tiêu chí như phu-tui-do (cần 4 điều kiện). */
const TOI_DA_DIEU_KIEN = 6;
/**
 * Màn lọc đầu tiên (c-lop, ngày 2) dựng sẵn hai điều kiện để dạy VÀ / HOẶC. Qua màn ấy (user chốt 03/10/2026) câu bắt đầu
 * không có điều kiện nào: người chơi tự bấm + thêm, bấm × bỏ.
 */
const DK_DUNG_SAN: Readonly<Record<string, number>> = { 'c-lop': 2 };
const TEN_NOI: Record<'AND' | 'OR', string> = { AND: 'VÀ', OR: 'HOẶC' };

/**
 * Số nhịp nhún của mặt chibi khi nhân vật lên tiếng (CSS `v7-chibi-nhun`, 0,32 s/nhịp): câu hiện ra một lần, nên
 * "nói" chừng 45 ms mỗi ký tự rồi đứng yên — từ 2 tới 10 nhịp.
 */
function soNhipNhun(cau: string): number {
  return Math.min(10, Math.max(2, Math.round((cau.length * 0.045) / 0.32)));
}
export interface ManTraV7Props {
  onDaXemTruyVan?: QuanSatTruyVanMvp;
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
  /**
   * Gói B13: khóa bản nháp (`nhap-man-tra.ts`). Có khóa thì câu đang soạn được giữ khi màn tra đóng (lùi về bảng, rời về cảnh)
   * và mở lại đúng như lúc rời. Thiếu = như cũ (mỗi lần mở là câu mới).
   */
  khoaNhap?: string;
  /**
   * Gói B14: bạn đang có mặt kèm một câu viết sẵn, dùng khi THẺ CHƯA CÓ gợi ý hai bậc (bộ mùa 1, các vụ sau): bấm vào bạn thì
   * bạn nhắc lại việc đang làm. Thẻ có `goiY` thì người gợi ý và lời lấy từ thẻ. Thiếu / rỗng và thẻ không có gợi ý = không có
   * bạn đi cùng ở màn tra (bộ MVP).
   */
  banDuPhong?: readonly { ai: string; loi: string }[];
  /** Gói B17 (bộ mùa 1): mức SQL ("ghép" / "ghép, chữ SQL" / "tự viết"); thiếu = ghép như cũ. Buổi họp (`fix-query`) bỏ qua. */
  mucSql?: MucSqlMvp;
  /** Gói B17: mức nhập vai; "Như thật" thì bạn đi cùng chỉ gợi ý khi được bấm. Thiếu = như cũ. */
  mucNhapVai?: MucNhapVaiMvp;
  /** Người chơi bấm ghim / đi tiếp sau khi tra đúng; `dung` = mã các thẻ đã kéo vào câu. */
  onXong: (dung: string[], result?: { sql: string; cot: { ten: string; kieu: 'TEXT' | 'INTEGER' }[]; soDong: number }) => void;
  /**
   * Gói B19: màn sửa `· tính vạch` ở buổi chấm. Có thì nút chạy thành "Chạy thử" (bao nhiêu lần cũng được, không tính) và thêm nút
   * "Trình": câu đúng thì đi tiếp (`onXong`); sai thì lời `loiSai()` ("Khi trình sai") hiện ở bóng thoại và `onSai()` (một vạch).
   */
  trinh?: { loiSai: () => LoiMvp[]; onSai: () => void };
}

/** Câu soi của hoạt cảnh trả một dòng cho mỗi dòng của bảng: cho phép bảng lớn hơn hạn 2000 dòng của kết quả thường. */
const TOI_DA_DONG_SOI = 100_000;

/** Bảng kết quả chỉ vẽ ngần này dòng đầu (bảng thật có tới vài nghìn dòng); con số lớn bên cạnh vẫn là tổng thật. */
export const TOI_DA_DONG_HIEN = 40;
/** Số giấy nhớ tối đa dán quanh laptop; tờ cũ hơn vào ngăn "Còn trên bảng". */
export const TOI_DA_GIAY = 10;

export function ManTraV7({ kb, duLieu, the, mode, canh, giayNho, dienTen, nguonPhieu, khoaNhap, banDuPhong, mucSql, mucNhapVai, onXong, onDaXemTruyVan, trinh }: ManTraV7Props) {
  const [nhap] = useState(() => layNhapManTra(khoaNhap));
  // Gói B17: màn cốt truyện (buổi họp) không đổi theo mức; "Tự viết" thay ba cột ghép bằng ô gõ; "chữ SQL" chỉ đổi nhãn.
  const muc: MucSqlMvp = mode === 'fix-query' ? 'ghep' : (mucSql ?? 'ghep');
  const tuViet = muc === 'tu-viet';
  const nh = useMemo(() => nhanManTra(muc), [muc]);
  // Gói B21: chữ tiếng Việt trên khối bảng / cột (câu SQL và ô gõ tay giữ tên thật).
  const nk = useMemo(() => nhanKhoi(duLieu, muc), [duLieu, muc]);
  const tuNoi = tuGoiY(mucNhapVai ?? 'tu-do');
  const [goSql, setGoSql] = useState<string>(() => nhap?.goSql ?? '');
  // Điện thoại, bàn phím ảo mở (ban-phim-ao.ts): `.v7-san` bị scale nên ô gõ trong đó không neo lên vùng thấy được bằng
  // position: fixed; vẽ một ô gõ nổi qua portal ở document.body, cùng giá trị, kèm nút CHẠY; thu bàn phím thì ô nổi biến mất.
  const cheDoGo = useCheDoGo();
  const [goCoTieuDiem, setGoCoTieuDiem] = useState(false);
  const oNoiRef = useRef<HTMLTextAreaElement>(null);
  const hienONoi = cheDoGo && goCoTieuDiem;
  useEffect(() => {
    if (hienONoi) oNoiRef.current?.focus();
  }, [hienONoi]);
  const maOGo = `v7-go-${the.id}`;
  /** Nấc "Tự viết": mã thẻ → chữ đã chèn của các tờ giấy nhớ đã bấm (vẽ sợi chỉ nếu chữ ấy còn trong câu). */
  const [theDaChen, setTheDaChen] = useState<Record<string, string>>({});
  const cauHinh = CANH_TRA[canh];
  // Nguồn là phiếu: `FROM @<mã phiếu>` của SQL chuẩn thành `FROM <tên tạm>`, mọi câu chạy có tiền tố `WITH <tên tạm> AS (…)`.
  const tenNguon = nguonPhieu ? tenCte(nguonPhieu.id) : null;
  const tienTo = nguonPhieu && tenNguon ? `WITH ${tenNguon} AS (${nguonPhieu.sql.trim().replace(/;\s*$/, '')}) ` : '';
  const sqlChuan = useMemo(
    () => (nguonPhieu && tenNguon ? the.sqlChuan.replace(new RegExp(`@${nguonPhieu.id}(?![a-z0-9-])`, 'i'), tenNguon) : the.sqlChuan),
    [the.sqlChuan, nguonPhieu, tenNguon],
  );
  const khung = useMemo(() => khungTuSqlChuan(sqlChuan), [sqlChuan]);
  const [bangGocChon, setBangGocChon] = useState<string | null>(() => nhap?.bangGocChon ?? null);
  // Đổi thẻ (không phải lần mở đầu) thì bỏ bảng đã chọn; lần mở đầu giữ bảng của bản nháp.
  const theTruoc = useRef(the.id);
  useEffect(() => {
    if (theTruoc.current === the.id) return;
    theTruoc.current = the.id;
    setBangGocChon(null);
  }, [the.id]);
  const bang = useMemo(() => {
    if (nguonPhieu && tenNguon) return { ten: tenNguon, cot: nguonPhieu.cot, soDong: nguonPhieu.soDong };
    const tenCanTim = bangGocChon ?? khung?.bang;
    const b = duLieu?.bang.find((x) => x.ten === tenCanTim);
    return b ? { ten: b.ten, cot: b.cot, soDong: b.dong.length } : undefined;
  }, [duLieu, khung, nguonPhieu, tenNguon, bangGocChon]);
  const khoi = useMemo(() => khoiCuaThe(sqlChuan), [sqlChuan]);
  // Thẻ "chọn bảng" (bài nhập môn): SQL chuẩn chỉ là SELECT … FROM <bảng>, không lọc / nối / xếp → người chơi chọn bảng rồi CHẠY.
  const khongLoc = mode !== 'fix-query' && !nguonPhieu && !/\b(?:WHERE|JOIN|ORDER\s+BY|GROUP\s+BY)\b/i.test(sqlChuan);
  // Bài chọn cột (`- Chọn cột:` của thẻ; chưa dùng cho thẻ có nối bảng / phiếu làm nguồn): người chơi tự bật tắt cột của SELECT.
  const chonCot = the.chonCot && mode !== 'fix-query' && !nguonPhieu && !khoi.noi ? the.chonCot : null;
  const chonBang = khongLoc && !chonCot;
  const cotChuan = useMemo(() => (/^SELECT\s+(.+?)\s+FROM\s/i.exec(khung?.khung ?? '')?.[1] ?? '').split(',').map((c) => c.trim()).filter((c) => c !== ''), [khung]);
  const khungCua = (ds: readonly string[]): string => `SELECT ${ds.length > 0 ? ds.join(', ') : '…'} FROM ${khung?.bang ?? ''}`;
  const [cotLay, setCotLay] = useState<string[]>(() => nhap?.cotLay ?? chonCot ?? []);
  /**
   * HAI NGƯỜI KIỂM PHIẾU (user chốt 02/10/2026): Duy kiểm hình thức — phiếu phải đủ gọn để dò tay (tối đa 3 / 5 / 10 dòng, làm tròn lên
   * từ số dòng của đáp án) và có cột mã nếu thẻ cần; Hà Vy kiểm ý nghĩa — phiếu có trả lời đúng câu hỏi ghim trên bảng không.
   * Bài nhập môn (không lọc) và màn chiếu ở buổi họp không có Duy kiểm.
   */
  const nguongDuy = useMemo(() => {
    const n = the.soDongKyVong;
    if (khongLoc || mode === 'fix-query' || n === null) return null;
    return n <= 3 ? 3 : n <= 5 ? 5 : n <= 10 ? 10 : null;
  }, [the.soDongKyVong, khongLoc, mode]);
  // Khối "nối với" (thẻ có JOIN): các bảng được chọn khai ở thẻ, thiếu thì lấy bảng JOIN của SQL chuẩn.
  const bangNoiDuoc = useMemo(() => (khoi.noi ? (the.bangNoi?.length ? the.bangNoi : bangNoiTrongSql(sqlChuan)) : []), [khoi.noi, the.bangNoi, sqlChuan]);

  const dkSan = khongLoc ? 0 : (DK_DUNG_SAN[the.id] ?? 0);
  const [cau, setCau] = useState<CauDung>(() => {
    if (nhap) return nhap.cau;
    const napSan = mode === 'fix-query' && the.truyVanNapSan ? cauTuSql(the.truyVanNapSan) : null;
    if (napSan) return napSan;
    const cotGoc = bang?.cot.map((c) => c.ten) ?? [];
    return {
      khung: chonCot ? khungCua(chonCot) : (khung?.khung ?? ''),
      dieuKien: Array.from({ length: dkSan }, (_x, i) => ({ cot: cotGoc[i % Math.max(1, cotGoc.length)] ?? '', phep: 'bang', giaTri: null })),
      noi: Array.from({ length: Math.max(0, dkSan - 1) }, () => 'AND'),
    };
  });
  const bangNoi = useMemo(() => (cau.noiBang?.bang ? duLieu?.bang.find((b) => b.ten === cau.noiBang?.bang) : undefined), [duLieu, cau.noiBang?.bang]);
  /** Cột chung của bảng gốc và bảng nối (ứng viên khóa nối; trong điều kiện được viết `<bảng gốc>.<cột>`). */
  const cotChung = useMemo(() => (bang && bangNoi ? bang.cot.map((c) => c.ten).filter((t) => bangNoi.cot.some((c) => c.ten === t)) : []), [bang, bangNoi]);
  const cot = useMemo(() => [...(bang?.cot.map((c) => c.ten) ?? []), ...(bangNoi?.cot.map((c) => c.ten).filter((t) => !cotChung.includes(t)) ?? [])], [bang, bangNoi, cotChung]);
  const kieuCot = useCallback((ten: string): KieuCot => bang?.cot.find((c) => c.ten === ten)?.kieu ?? bangNoi?.cot.find((c) => c.ten === ten)?.kieu ?? 'TEXT', [bang, bangNoi]);
  const tongDong = bang?.soDong ?? 0;
  const sqlGhep = thanhSql(cau, kieuCot, cotChung);
  // Nấc "Tự viết": câu là chữ người chơi gõ; nguồn là phiếu thì vẫn bọc `WITH <tên tạm> AS (…)` trừ khi người chơi tự viết WITH.
  const goGon = goSql.trim().replace(/;\s*$/, '');
  const sqlNgoai = tuViet ? goGon : sqlGhep;
  const sql = tuViet ? (/^WITH\b/i.test(goGon) ? goGon : tienTo + goGon) : tienTo + sqlGhep;
  const [dangChon, setDangChon] = useState<GiaTriHoSo | null>(null);
  const [daChonBang, setDaChonBang] = useState(() => nhap?.daChonBang ?? !chonBang);
  /** Tự viết: người chơi tự gõ FROM, không có bước chọn bảng. */
  const daChonBangHL = tuViet || daChonBang;
  useEffect(() => {
    ghiNhapManTra(khoaNhap, { cau, cotLay, bangGocChon, daChonBang, goSql });
  }, [khoaNhap, cau, cotLay, bangGocChon, daChonBang, goSql]);
  const [xemTruocMo, setXemTruocMo] = useState(false);
  const [cham, setCham] = useState<KetQuaCham | null>(null);
  const [daChay, setDaChay] = useState<WhereTach | null>(null);
  const [dangChay, setDangChay] = useState(false);
  const [soi, setSoi] = useState(false);
  const [so, setSo] = useState<{ n: number; nhan: string }>({ n: tongDong, nhan: 'DÒNG' });
  const [dau, setDau] = useState<number | null>(null);
  const [loiNoi, setLoiNoi] = useState<LoiMvp[]>([]);
  const [xongRoi, setXongRoi] = useState(false);
  const [moCon, setMoCon] = useState(false);
  /** Bài "bấm ô lấy giấy nhớ": các dòng kết quả đã được chép ô. */
  const [daChep, setDaChep] = useState<number[]>([]);
  /** Ô bấm nhầm ở bài "bấm ô lấy giấy nhớ" (ô không thuộc phiếu): gạch mờ; `oRung` = ô đang rung. */
  const [oSai, setOSai] = useState<number[]>([]);
  const [oRung, setORung] = useState<number | null>(null);
  /**
   * Bảng của lần chạy trước còn hiện (mờ) sau khi người chơi sửa câu, và trong lúc lần chạy mới đang tính: hoạt cảnh của lần
   * chạy sau đi tiếp từ bảng này nếu kết quả mới là bảng ấy bớt dòng (gói B14 mục E).
   */
  const [bangCu, setBangCu] = useState<BangKetQua | null>(null);
  /** Đổi mỗi khi bảng kết quả được dựng mới hẳn (không phải dồn từ bảng cũ): các dòng hiện dần lại như lần đầu. */
  const [lanBang, setLanBang] = useState(0);
  const { than: thanBang, vuaDon, rung, rungDi, xong: xongRung, datLai: boRung } = useRungBang();
  /** Bóng thoại gợi ý của bạn đi cùng; bậc đã nói của từng gợi ý; số lần chạy trượt liền nhau; lần chạy gần nhất. */
  const [bong, setBong] = useState<BongManTra | null>(null);
  const bacGoiY = useRef<Record<string, number>>({});
  const truot = useRef(0);
  const lanCuoi = useRef<LanChayManTra | null>(null);
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
  /**
   * Gói B15 (mục E, chỉ bộ mùa 1): thẻ "bấm ô lấy giấy nhớ" có vật chứng nêu giá trị thì nhận cả câu HẸP hơn câu chuẩn miễn là
   * kết quả còn đủ mọi giá trị ấy (vd `c-ten-h`: lọc thẳng tên bắt đầu bằng H trong lớp, ra đúng Hiếu và Hoài).
   */
  const luatHep = useMemo<LuatHep | null>(() => {
    const giaTri = the.vatChung?.giaTri ?? [];
    if (!kb.dieuHuongTuDo || mode === 'fix-query' || !the.bamO || giaTri.length === 0) return null;
    return { cot: the.bamO, giaTri, cotCan: [the.bamO, ...(the.cotNop ?? [])] };
  }, [kb.dieuHuongTuDo, mode, the.bamO, the.cotNop, the.vatChung]);

  /**
   * Sửa câu → kết quả cũ không còn là kết quả của câu đang hiện: bỏ con dấu, nút soi; bảng cũ (nếu có dòng) ở lại, mờ đi và ghi
   * rõ là của lần chạy trước. Lời nhân vật và bóng gợi ý Ở LẠI cho tới lần chạy sau (gói B14).
   */
  const doiCau = useCallback(
    (f: (c: CauDung) => CauDung): void => {
      setCau(f);
      const con = cham && cham.trangThai !== 'loi' && cham.chay.dong.length > 0 ? { cot: cham.chay.cot, dong: cham.chay.dong } : null;
      if (cham) setBangCu(con);
      setCham(null);
      setDaChay(null);
      setSoi(false);
      setDau(null);
      setDaChep([]);
      setOSai([]);
      boRung();
      if (con) setSo({ n: con.dong.length, nhan: 'DÒNG · LẦN CHẠY TRƯỚC' });
      else if (cham || !bangCu) setSo({ n: tongDong, nhan: 'DÒNG' });
      phieu.current?.datLai();
    },
    [tongDong, cham, bangCu, boRung],
  );

  /** Bạn đi cùng: người gợi ý của thẻ; thẻ chưa có gợi ý thì bạn đang có mặt (câu viết sẵn). */
  const nguoiBan = useMemo(() => {
    const cuaThe = nguoiGoiY(the);
    return cuaThe.length > 0 ? cuaThe : (banDuPhong ?? []).map((b) => b.ai);
  }, [the, banDuPhong]);
  /** Xin gợi ý (bấm vào bạn, chạy trượt hai lần liền, chạy sai mà không ai nói gì, bấm nhầm ô hai lần). */
  const hoiBan = useCallback(
    (lan: LanChayManTra | null = lanCuoi.current): void => {
      const kq = xinGoiY(the, lan, bacGoiY.current);
      if (kq) {
        bacGoiY.current = kq.bac;
        // Nấc "Tự viết" (gói B17): lời bậc 2 nói thao tác ghép ("Ở hàng LẤY CỘT, bấm…") không còn đúng; thay bằng lời bậc 1 kèm câu SQL
        // chuẩn che giá trị (giữ cấu trúc câu).
        const chon = tuViet && kq.bong.bac === 2 ? chonGoiY(the, lan) : null;
        setBong(chon ? { ...kq.bong, loi: `${chon.goiY.bac1.text} Câu mẫu, tự điền giá trị rồi CHẠY: \`${cheGiaTriSql(sqlChuan)}\`` } : kq.bong);
      } else if (!the.goiY?.length && banDuPhong?.[0]) {
        setBong({ ai: banDuPhong[0].ai, loi: banDuPhong[0].loi, bac: 2 });
      }
    },
    [the, banDuPhong, tuViet, sqlChuan],
  );
  /** Nấc "Tự viết": sửa câu gõ tay (kết quả cũ không còn là của câu đang hiện, như `doiCau`). */
  const doiGo = (chu: string): void => {
    setGoSql(chu);
    doiCau((c) => c);
  };
  /** Nấc "Tự viết": bấm tờ giấy nhớ thì chèn giá trị (trong nháy đơn) vào chỗ con trỏ của ô gõ. */
  const chenGiay = (g: GiaTriHoSo): void => {
    const nhay = (v: string): string => `'${v.replace(/'/g, "''")}'`;
    const chu = g.nhieu && g.nhieu.length > 1 ? g.nhieu.map(nhay).join(', ') : nhay(g.giaTri);
    // Ô gõ tìm theo id (không giữ ref: trình biên dịch React không cho đọc ref trong hàm có thể chạy lúc vẽ).
    const el = typeof document !== 'undefined' ? (document.getElementById(maOGo) as HTMLTextAreaElement | null) : null;
    const dau = el?.selectionStart ?? goSql.length;
    const cuoi = el?.selectionEnd ?? goSql.length;
    setTheDaChen((m) => ({ ...m, [g.the]: chu }));
    soundEngine.playSfx('select');
    doiGo(goSql.slice(0, dau) + chu + goSql.slice(cuoi));
    requestAnimationFrame(() => {
      el?.focus();
      el?.setSelectionRange(dau + chu.length, dau + chu.length);
    });
  };
  /** Bật / tắt một cột của SELECT (giữ thứ tự cột của bảng). */
  const doiCot = (ten: string): void => {
    const moi = (bang?.cot.map((c) => c.ten) ?? []).filter((c) => (c === ten ? !cotLay.includes(c) : cotLay.includes(c)));
    soundEngine.playSfx('tab');
    setCotLay(moi);
    doiCau((c) => ({ ...c, khung: khungCua(moi) }));
  };
  const doiDk = (i: number, f: (d: DieuKienDung) => DieuKienDung): void => doiCau((c) => ({ ...c, dieuKien: c.dieuKien.map((d, k) => (k === i ? f(d) : d)) }));
  /** Đặt lại câu ban đầu với thử thách nạp sẵn (fix-query, màn chiếu). */
  const datLaiCauBanDau = useCallback(() => {
    if (!the.truyVanNapSan) return;
    const goc = cauTuSql(the.truyVanNapSan);
    if (!goc) return;
    soundEngine.playSfx('click');
    doiCau(() => goc);
  }, [the.truyVanNapSan, doiCau]);
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

  /** Con số lớn đếm tới `toi` (hàm dùng chung `demSo`: test và máy bật giảm chuyển động thì đặt thẳng). */
  const demToi = useCallback((tu: number, toi: number, ms: number, nhan: string): Promise<void> => demSo(tu, toi, ms, (n) => setSo({ n, nhan }), () => song.current), []);

  const chay = useCallback(async () => {
    if (!duLieu || !khung || banRon.current || dung || (tuViet && goGon === '')) return;
    banRon.current = true;
    // Máy bật giảm chuyển động: không diễn cảnh rơi / rụng, không chờ nhịp, hiện thẳng kết quả.
    const giam = giamChuyenDong();
    const cho = (ms: number): Promise<void> => (giam ? Promise.resolve() : ngu(ms));
    // Bảng đang có trên màn (của lần chạy vừa rồi, hoặc còn lại sau khi sửa câu): ở lại cho tới khi biết kết quả mới.
    const bangTruoc: BangKetQua | null = cham && cham.trangThai !== 'loi' && cham.chay.dong.length > 0 ? { cot: cham.chay.cot, dong: cham.chay.dong } : bangCu;
    setDangChay(true);
    setBangCu(bangTruoc);
    setCham(null);
    setSoi(false);
    setDau(null);
    setLoiNoi([]);
    setBong(null);
    setDaChep([]);
    setOSai([]);
    boRung();
    if (!bangTruoc) {
      phieu.current?.datLai();
      setSo({ n: tongDong, nhan: 'DÒNG' });
    }
    soundEngine.playSfx('click');
    try {
      const tho = await chamThuThach(duLieu, sql, tienTo + sqlChuan, luatHep);
      // Bài chọn cột: đủ dòng, đủ cột cần mà lấy thừa cột thì chưa tính là đúng (có lời "Khi thừa cột"). Tự viết: đếm cột của kết quả.
      const soCotLay = tuViet && tho.trangThai !== 'loi' ? tho.chay.cot.length : cotLay.length;
      const thuaCot = !!chonCot && tho.trangThai === 'dung' && soCotLay > cotChuan.length;
      const kq: KetQuaCham = thuaCot && tho.trangThai === 'dung' ? { ...tho, trangThai: 'sai' } : tho;
      const tach = kq.trangThai === 'loi' ? null : tachWhere(sqlNgoai);
      const t = tach && tienTo ? { ...tach, tienTo } : tach;
      // Cột của các điều kiện đã điền (lời "Khi chạy ra n dòng với a, b", gợi ý theo cột): câu ghép lấy từ ô, câu gõ tay đọc từ WHERE.
      const cotDung = tuViet ? cotTrongDieuKien(t?.dieuKien ?? []) : cau.dieuKien.filter((d) => d.giaTri !== null).map((d) => d.cot);
      track({
        type: 'mvp_query_run',
        challengeId: the.id,
        mode: tuViet ? 'go' : 'keo',
        rows: kq.trangThai === 'loi' ? null : kq.so.soDongNguoiChoi,
        error: kq.trangThai === 'loi',
        correct: kq.trangThai === 'dung',
      });
      let daRung = false;
      if (kq.trangThai !== 'loi') {
        const n = kq.chay.dong.length;
        // Mỗi dòng của bảng qua / không qua từng điều kiện, và có được giữ theo cách nối không (bảng vài nghìn dòng vẫn soi được).
        const giu = t ? t.dieuKien.reduce((acc, d, i) => (i === 0 ? `(${d})` : `${acc} ${t.noi[i - 1] ?? 'AND'} (${d})`), '') : '';
        const co = t ? await chaySql(duLieu, `${tienTo}SELECT ${t.dieuKien.map((d) => `CASE WHEN ${d} THEN 1 ELSE 0 END`).join(', ')}, CASE WHEN ${giu} THEN 1 ELSE 0 END FROM ${t.bang}`, TOI_DA_DONG_SOI) : null;
        if (!song.current) return;
        const hang = t && co?.ok ? co.dong : null;
        const soDk = t?.dieuKien.length ?? 0;
        const moiHang = hang ? hang.map((_h, k) => k) : [];
        const conLai = hang ? moiHang.filter((k) => hang[k]?.[soDk] === 1) : [];
        const biLoai = hang ? moiHang.filter((k) => hang[k]?.[soDk] !== 1) : [];
        const hep = bangTruoc ? hepLai(bangTruoc, kq.chay) : null;
        if (bangTruoc && hep) {
          daRung = true;
          // Đi tiếp TỪ BẢNG ĐANG CÓ: dòng không còn khớp rụng khỏi bảng, con số đếm xuống cùng nhịp; đống phiếu phía sau chỉ
          // xếp lại theo kết quả mới, không diễn lại.
          phieu.current?.datLai();
          phieu.current?.an(biLoai);
          await Promise.all([rungDi(hep), demToi(bangTruoc.dong.length, n, RUNG_MS, 'DÒNG')]);
        } else {
          // Bảng rộng hơn hoặc khác hẳn (hay chưa có bảng): diễn như lần đầu, đống phiếu rơi theo từng điều kiện.
          setBangCu(null);
          if (bangTruoc) {
            phieu.current?.datLai();
            setSo({ n: tongDong, nhan: 'DÒNG' });
          }
          if (t && hang && giam) phieu.current?.an(biLoai);
          else if (t && hang) {
            const toanVa = t.noi.every((x) => x === 'AND');
            if (toanVa) {
              let con = moiHang;
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
                  moiHang.filter((k) => hang[k]?.[i] === 1),
                  (i % 3) + 1,
                );
              }
              await ngu(480);
              phieu.current?.tha(biLoai);
              await demToi(hang.length, n, 750, t.noi.every((x) => x === 'OR') ? 'HOẶC: khớp một điều kiện là được giữ' : 'DÒNG');
            }
          }
        }
        if (hang && n <= 12) phieu.current?.toMau(conLai, 4);
        if (!song.current) return;
        setSo({ n, nhan: 'DÒNG' });
        setDau(n);
        soundEngine.playSfx(kq.trangThai === 'dung' ? 'chime' : 'sai');
        // Bảng vừa rụng dòng thì bảng mới thay vào ngay (dòng còn lại dồn lên); không thì chờ một nhịp rồi bảng mới hiện dần.
        if (!hep) await cho(380);
      } else {
        setBangCu(null);
        phieu.current?.datLai();
        setSo({ n: tongDong, nhan: 'DÒNG' });
      }
      if (!song.current) return;
      if (daRung) xongRung();
      else setLanBang((x) => x + 1);
      setBangCu(null);
      setCham(kq);
      setDaChay(t);
      const loiThe = phanUngSauKhiChay(the, kq, cotDung, thuaCot);
      // Thẻ không có lời riêng cho kết quả này: Duy nói khi phiếu còn quá dài, Hà Vy nói khi phiếu gọn mà chưa đúng câu hỏi.
      const soDongKq = kq.trangThai === 'loi' ? 0 : kq.so.soDongNguoiChoi;
      const macDinh: LoiMvp[] =
        loiThe.length === 0 && kq.trangThai === 'sai' && kq.so.hepThieu
          ? // Gói B15: câu hẹp hơn câu chuẩn mà lọc sót thứ cần giữ.
            [{ speaker: 'ha-vy', expression: 'thinking', text: 'Lọc hẹp thế này thì sót mất dòng cần giữ rồi. Nới điều kiện ra một chút xem.' }]
          : loiThe.length > 0 || kq.trangThai !== 'sai' || nguongDuy === null
          ? []
          : soDongKq > nguongDuy
            ? [{ speaker: 'duy', expression: 'neutral', text: `Còn ${soDongKq.toLocaleString('vi-VN')} dòng. Phiếu dài thế tớ không dò nổi, tớ chỉ nhận tối đa ${nguongDuy} dòng.` }]
            : soDongKq > 0
              ? [{ speaker: 'ha-vy', expression: 'thinking', text: 'Phiếu gọn rồi, nhưng chưa trả lời đúng câu hỏi trên bảng. Xem lại điều kiện xem.' }]
              : [];
      const loiHien = loiThe.length > 0 ? loiThe : macDinh;
      setLoiNoi(loiHien);
      if (kq.trangThai !== 'loi') onDaXemTruyVan?.({ id: the.id, nhan: the.tieuDe, sql }, loiHien);
      // Bạn đi cùng (gói B14): nhớ lần chạy này để gợi ý cho hợp; chạy trượt hai lần liền, hoặc chạy sai mà không ai nói gì
      // (người chơi không biết thiếu gì), thì bạn tự lên tiếng.
      const lan: LanChayManTra = { kq, cotDung, thuaCot };
      lanCuoi.current = lan;
      if (kq.trangThai === 'dung') truot.current = 0;
      else {
        truot.current += 1;
        // Mức nhập vai "Như thật" (gói B17): bạn không tự lên tiếng, chỉ khi người chơi bấm ảnh mặt.
        if (tuNoi && (truot.current >= TRUOT_GOI_Y_MAN_TRA || (kq.trangThai === 'sai' && loiHien.length === 0))) hoiBan(lan);
      }
    } finally {
      banRon.current = false;
      if (song.current) setDangChay(false);
    }
  }, [duLieu, khung, dung, sql, sqlNgoai, sqlChuan, tienTo, the, tongDong, demToi, cau, chonCot, cotLay, cotChuan, nguongDuy, onDaXemTruyVan, cham, bangCu, boRung, rungDi, xongRung, hoiBan, luatHep, tuViet, goGon, tuNoi]);

  if (!duLieu) return <p className="game__error">Vụ này chưa có bộ dữ liệu (du-lieu.md) nên không chạy được.</p>;
  if (!khung || !bang) return <p className="game__error">Thẻ thử thách này thiếu khung SELECT … FROM … hợp lệ.</p>;

  const laChieu = canh === 'man-chieu';
  // Dấu ✓ / ✗ của hai người kiểm sau mỗi lần chạy (chưa chạy: chưa có dấu).
  const soDongChay = cham && cham.trangThai !== 'loi' ? cham.chay.dong.length : null;
  const duyDat = nguongDuy === null || soDongChay === null ? null : soDongChay > 0 && soDongChay <= nguongDuy && (!the.bamO || cham?.trangThai === 'loi' || (cham?.chay.cot ?? []).some((c) => c.toLowerCase() === the.bamO?.toLowerCase()));
  // Đủ đúng dòng, chỉ thiếu cột (vd chưa lấy cột mã): Hà Vy coi là đã trả lời đúng câu hỏi, phần thiếu là việc của Duy.
  const chiThieuCot = cham?.trangThai === 'sai' && cham.so.soDongNguoiChoi === cham.so.soDongChuan && cham.so.cotThieu.length > 0 && !cham.so.saiThuTu;
  const vyDat = soDongChay === null ? null : dung || chiThieuCot;
  // Tra đúng rồi mới bấm ô: cột `the.bamO` của bảng kết quả thành các ô bấm được.
  const iBamO = dung && the.bamO && cham?.trangThai === 'dung' ? cham.chay.cot.findIndex((c) => c.toLowerCase() === the.bamO?.toLowerCase()) : -1;
  // Phiếu của thẻ chỉ giữ vài giá trị của cột ấy (vd hai mã trong danh sách cả lớp): chỉ các ô ấy phải chép, người chơi tự tìm;
  // phiếu giữ mọi giá trị (hoặc thẻ không khai giá trị) thì ô nào cũng chép như trước.
  const oDich = ((): number[] | null => {
    if (iBamO < 0 || cham?.trangThai !== 'dung') return null;
    const giu = new Set(the.vatChung?.giaTri ?? []);
    const ds = cham.chay.dong.map((h, r) => (h[iBamO] !== null && giu.has(String(h[iBamO])) ? r : -1)).filter((r) => r >= 0);
    return ds.length > 0 && ds.length < cham.chay.dong.length ? ds : null;
  })();
  const conChep = iBamO >= 0 && cham?.trangThai === 'dung' ? (oDich ? oDich.filter((r) => !daChep.includes(r)).length : cham.chay.dong.length - daChep.length) : 0;
  const bamOKq = (r: number): void => {
    if (oDich && !oDich.includes(r)) {
      // Ô không thuộc phiếu: rung, gạch mờ; nhầm hai lần thì bạn đi cùng gợi ý.
      soundEngine.playSfx('sai');
      setORung(r);
      setTimeout(() => song.current && setORung(null), 320);
      const moi = oSai.includes(r) ? oSai : [...oSai, r];
      setOSai(moi);
      if (tuNoi && moi.length >= TRUOT_GOI_Y_MAN_TRA) hoiBan();
      return;
    }
    soundEngine.playSfx('select');
    setDaChep((ds) => [...ds, r]);
  };
  // Bảng đang hiện: kết quả của câu đang có, hoặc bảng của lần chạy trước (mờ) chờ lần chạy sau.
  const bangHien: BangKetQua | null = cham && cham.trangThai !== 'loi' ? cham.chay : bangCu;
  const bangLaCu = bangHien !== null && !(cham && cham.trangThai !== 'loi');
  const anhCanh = cauHinh.anh ? anhTheoTen(cauHinh.anh) : undefined;
  const loi = loiNoi[0];
  const chibiNoi = loi ? anhTheoTen(`chibi-${loi.speaker}`) : undefined;
  const dungCacThe = tuViet
    ? Object.entries(theDaChen).filter(([, chu]) => goGon.includes(chu)).map(([t]) => t)
    : [...new Set(cau.dieuKien.map((d) => (d.giaTri?.nguon === 'giay-nho' ? d.giaTri.the : undefined)).filter((x): x is string => !!x))];
  const xong = (): void => {
    if (xongRoi) return;
    setXongRoi(true);
    boNhapManTra(khoaNhap);
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
  /** Gói B19: "Trình" ở màn sửa `· tính vạch` — chấm câu đang có (không diễn cảnh lọc); đúng thì đi tiếp, sai thì một vạch. */
  const trinhCau = async (): Promise<void> => {
    if (!trinh || !duLieu || banRon.current || xongRoi) return;
    if (dung) {
      xong();
      return;
    }
    banRon.current = true;
    setDangChay(true);
    try {
      const kq = await chamThuThach(duLieu, sql, tienTo + sqlChuan, luatHep);
      if (!song.current) return;
      if (kq.trangThai === 'dung') {
        soundEngine.playSfx('chime');
        xong();
        return;
      }
      soundEngine.playSfx('sai');
      setBong(null);
      setLoiNoi(trinh.loiSai());
      trinh.onSai();
    } finally {
      banRon.current = false;
      if (song.current) setDangChay(false);
    }
  };

  // Giấy nhớ quanh viền: nửa trái, nửa phải. Tối đa TOI_DA_GIAY tờ (user chốt 02/10/2026: 8–10 tờ, không thì dàn khắp màn hình):
  // lấy các tờ mới nhất; tờ cũ hơn nằm ở ngăn "Còn trên bảng", bấm để cầm lên như một tờ giấy nhớ thường.
  const giayCu = giayNho.slice(0, Math.max(0, giayNho.length - TOI_DA_GIAY));
  const giayHien = giayNho.slice(giayCu.length);
  const nua = Math.ceil(giayHien.length / 2);

  // Chỗ dán: `giay-nho-quanh.ts`; chữ trên giấy: `GiayNhoV7` (gói B14: giấy dán trên rìa máy, các tờ không sát nhau, tờ có câu thì in cả câu).
  const giay = giayHien.map((g, i) => (
    <button
      key={g.khoa}
      type="button"
      className={`v7-giay v7-giay--quanh${i >= nua ? ' is-phai' : ''}${dangChon?.khoa === g.khoa ? ' is-chon' : ''}${lopGiay(g)}`}
      style={viTriGiay(i, giayHien.length, cauHinh.kinh)}
      draggable={!khoa}
      disabled={khoa}
      aria-pressed={dangChon?.khoa === g.khoa}
      aria-label={nhanGiay(g, dienTen)}
      onDragStart={(e) => e.dataTransfer.setData('text/plain', g.khoa)}
      onClick={() => {
        if (tuViet) {
          chenGiay(g);
          return;
        }
        soundEngine.playSfx('tab');
        setDangChon(dangChon?.khoa === g.khoa ? null : g);
      }}
    >
      <ChuGiay g={g} dienTen={dienTen} />
    </button>
  ));

  const kinh = (
    <div className="v7-kinh" data-region="sql">
      <div className="v7-thanh">
        <span>▣ tra-cuu — {cauHinh.may}</span>
        {the.truyVanNapSan ? (
          <button
            type="button"
            className="v7-dat-lai"
            disabled={dangChay}
            onClick={datLaiCauBanDau}
            title="Khôi phục câu truy vấn ban đầu trên màn chiếu"
          >
            ↺ Đặt lại câu ban đầu
          </button>
        ) : null}
      </div>
      <p className="v7-de">{dienTen(the.deBai)}</p>
      {nguongDuy !== null ? (
        <KiemPhieu duy={`phiếu tối đa ${nguongDuy} dòng${the.bamO ? `, có cột ${the.bamO}` : ''}`} duyDat={duyDat} vy="đúng câu hỏi trên bảng" vyDat={vyDat} />
      ) : null}
      {xemTruocMo && duLieu && bang ? (
        <XemTruocBangModal
          onDaXemTruyVan={(sql) => onDaXemTruyVan?.({ id: `${the.id}:xem-truoc`, nhan: `Xem trước bảng ${bang.ten}`, sql }, [])}
          duLieu={duLieu}
          tenBangGoc={bang.ten}
          tenBangNoi={cau.noiBang?.bang}
          khoaNoi={cau.noiBang?.cot}
          sqlPhieuNguon={nguonPhieu?.sql}
          nhanPhieuNguon={nguonPhieu?.nhan}
          onDong={() => setXemTruocMo(false)}
        />
      ) : null}
      {tuViet ? (
        <div className="v7-cau v7-go" data-region="sql-go">
          <div className="v7-go__bang">
            <span className="v7-o v7-o--bang" title={nguonPhieu ? `Phiếu đã ghim "${dienTen(nguonPhieu.nhan)}" dùng làm nguồn, tên tạm ${bang.ten}` : `Bảng ${bang.ten}`}>
              {nguonPhieu ? <IconPin className="v7-bt" /> : <IconLock className="v7-bt" />} {bang.ten}
            </span>
            <small>{tongDong} dòng</small>
            {nguonPhieu ? <small>(phiếu "{dienTen(nguonPhieu.nhan)}")</small> : null}
            {(the.bangChon ?? []).filter((b) => b !== bang.ten).length > 0 ? <small>Bảng khác dùng được: {(the.bangChon ?? []).filter((b) => b !== bang.ten).join(', ')}</small> : null}
            {bangNoiDuoc.length > 0 ? <small>Nối được với: {bangNoiDuoc.join(', ')}</small> : null}
            <button type="button" className="v7-btn-preview" onClick={() => setXemTruocMo(true)} aria-label={nguonPhieu ? 'Xem trước dữ liệu phiếu nguồn' : 'Xem trước dữ liệu mẫu'} title="Xem trước 6 dòng mẫu của bảng">
              <span className="v7-btn-preview__icon" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
                  <circle cx="12" cy="12" r="3" />
                </svg>
              </span>
              <span className="v7-btn-preview__text">{nguonPhieu ? 'Khảo sát phiếu nguồn' : 'Khảo sát bảng'}</span>
            </button>
          </div>
          <div className="v7-go__cot" aria-label="Các cột của bảng">
            {bang.cot.map((c) => (
              <code key={c.ten} title={c.kieu}>
                {c.ten}
              </code>
            ))}
          </div>
          <label className="visually-hidden" htmlFor={maOGo}>
            Câu SQL gõ tay
          </label>
          <textarea
            id={maOGo}
            className="v7-go__o"
            rows={4}
            spellCheck={false}
            autoCapitalize="off"
            autoCorrect="off"
            placeholder={`SELECT … FROM ${bang.ten}`}
            value={goSql}
            disabled={khoa}
            onChange={(e) => doiGo(e.target.value)}
            onFocus={() => setGoCoTieuDiem(true)}
            onKeyDown={(e) => {
              e.stopPropagation();
              if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                e.preventDefault();
                void chay();
              }
            }}
          />
          {hienONoi
            ? createPortal(
                <div className="v7-go-noi" role="group" aria-label="Câu SQL gõ tay">
                  <textarea
                    ref={oNoiRef}
                    className="v7-go-noi__o"
                    spellCheck={false}
                    autoCapitalize="off"
                    autoCorrect="off"
                    placeholder={`SELECT … FROM ${bang.ten}`}
                    value={goSql}
                    disabled={khoa}
                    onChange={(e) => doiGo(e.target.value)}
                    onBlur={() => {
                      // Bấm CHẠY trong ô nổi thì giữ (nút chặn mousedown); còn lại là thu bàn phím.
                      setTimeout(() => {
                        if (document.activeElement !== oNoiRef.current) setGoCoTieuDiem(false);
                      }, 60);
                    }}
                    onKeyDown={(e) => {
                      e.stopPropagation();
                      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                        e.preventDefault();
                        void chay();
                      }
                    }}
                  />
                  <button type="button" className="v7-go-noi__chay" disabled={khoa} onMouseDown={(e) => e.preventDefault()} onClick={() => void chay()}>
                    Chạy
                  </button>
                </div>,
                document.body,
              )
            : null}
          {cham?.trangThai === 'loi' ? (
            <p className="v7-go__loi" role="alert">
              {dichLoiSqlite(cham.chay)}
            </p>
          ) : (
            <p className="v7-go__ghi">Bấm một tờ giấy nhớ để chèn giá trị vào chỗ con trỏ. Ctrl+Enter cũng là CHẠY.</p>
          )}
        </div>
      ) : (
      <div className="v7-cau v7-cau--3cot">
        {bang ? (
          <KhungNguonBangV7
            nhan={nh}
            nhanBang={nk.bang}
            nhanCot={(t) => nk.cot(t, bang.ten)}
            bang={bang}
            daChonBang={daChonBang}
            chonBang={chonBang}
            onChonBang={(ten) => {
              setDaChonBang(ten !== '');
              if (ten && duLieu) {
                setBangGocChon(ten);
                doiCau((c) => {
                  const bMoi = duLieu.bang.find((x) => x.ten === ten);
                  const cotMoi = bMoi?.cot.map((x) => x.ten) ?? [];
                  const khungMoi = c.khung.replace(/\bFROM\s+[a-z0-9_]+/i, `FROM ${ten}`);
                  return {
                    ...c,
                    khung: khungMoi,
                    dieuKien: c.dieuKien.map((d) => (cotMoi.includes(d.cot) ? d : { ...d, cot: cotMoi[0] ?? d.cot })),
                  };
                });
              }
            }}
            danhSachBangChon={the.bangChon}
            nguonPhieu={nguonPhieu}
            dienTen={dienTen}
            tongDong={tongDong}
            khoa={khoa}
            khoiNoi={khoi.noi}
            bangNoiDuoc={bangNoiDuoc}
            cauNoiBang={cau.noiBang ?? undefined}
            cotChung={cotChung}
            onDoiNoiBang={(b, cot) =>
              doiCau((c) => {
                const cotGoc = bang?.cot.map((x) => x.ten) ?? [];
                if (!b) return { ...c, noiBang: undefined, dieuKien: c.dieuKien.map((d) => (cotGoc.includes(d.cot) ? d : { ...d, cot: cotGoc[0] ?? d.cot })) };
                const bDuLieu = duLieu?.bang.find((x) => x.ten === b);
                const cotGiao = bang && bDuLieu ? bang.cot.map((x) => x.ten).filter((t) => bDuLieu.cot.some((x) => x.ten === t)) : [];
                const khoaNoi = cot !== undefined ? cot : (cotGiao[0] ?? '');
                return { ...c, noiBang: { bang: b, cot: khoaNoi } };
              })
            }
            onMoXemTruoc={() => setXemTruocMo(true)}
          />
        ) : null}

        <div className="v7-cot v7-cot--chinh">
          <span className="v7-cot__nhan">{nh('2. ĐIỀU KIỆN LỌC')}</span>
          <ol className="v7-cau__dk" aria-label="Các điều kiện">
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
                      {nh(TEN_NOI[noi])}
                    </button>
                  ) : (
                    <span className="v7-o v7-o--dau" aria-hidden="true">
                      {nh('LỌC')}
                    </span>
                  )}
                  <button
                    type="button"
                    className="v7-o v7-o--cot"
                    disabled={khoa || laChieu}
                    title={laChieu ? 'Cột cố định trên màn chiếu' : undefined}
                    aria-label={`Cột của điều kiện ${i + 1}: ${nk.cot(d.cot, bang?.ten)}${laChieu ? ' (cố định)' : ' — bấm để đổi'}`}
                    onClick={() => doiDk(i, (x) => ({ ...x, cot: cot[(cot.indexOf(x.cot) + 1) % cot.length] ?? x.cot }))}
                  >
                    {nk.cot(d.cot, bang?.ten)}
                  </button>
                  {khoi.chuanHoa && kieuCot(d.cot) === 'TEXT' ? (
                    <button
                      type="button"
                      className={`v7-o v7-o--got${d.chuanHoa && d.chuanHoa !== 'khong' ? ' is-bat' : ''}`}
                      disabled={khoa || laChieu}
                      title={laChieu ? 'Gọt cột cố định trên màn chiếu' : 'Làm sạch cột: để nguyên / bỏ cách / chữ thường / cả hai'}
                      aria-label={`Gọt cột ${nk.cot(d.cot, bang?.ten)} trước khi so: ${TEN_CHUAN_HOA[d.chuanHoa ?? 'khong']}${laChieu ? ' (cố định)' : ' — bấm để đổi'}`}
                      onClick={() => doiDk(i, (x) => ({ ...x, chuanHoa: VONG_CHUAN_HOA[(VONG_CHUAN_HOA.indexOf(x.chuanHoa ?? 'khong') + 1) % VONG_CHUAN_HOA.length] ?? 'khong' }))}
                    >
                      <span className="v7-o--got-icon" aria-hidden="true">✨</span> {TEN_CHUAN_HOA[d.chuanHoa ?? 'khong']}
                    </button>
                  ) : null}
                  <button
                    type="button"
                    className="v7-o v7-o--phep"
                    disabled={khoa || laChieu}
                    title={laChieu ? 'Phép so sánh cố định trên màn chiếu' : undefined}
                    aria-label={`Phép so sánh của điều kiện ${i + 1}: ${TEN_PHEP[d.phep]}${laChieu ? ' (cố định)' : ' — bấm để đổi'}`}
                    onClick={() => doiDk(i, (x) => ({ ...x, phep: x.phep === 'bang' ? 'bat-dau-bang' : 'bang' }))}
                  >
                    {nh(nhieu && d.phep === 'bang' ? 'là một trong' : TEN_PHEP[d.phep])}
                  </button>
                  <button
                    type="button"
                    className={`v7-khe${d.giaTri ? ' is-co' : ''}${dangChon && !d.giaTri ? ' is-moi' : ''}${laChieu ? (d.giaTri ? ' is-co-dinh' : ' is-khoi-phuc') : ''}`}
                    disabled={khoa}
                    aria-label={
                      d.giaTri
                        ? laChieu
                          ? `Giá trị điều kiện ${i + 1}: ${d.giaTri.tho} (cố định trên màn chiếu)`
                          : `Giá trị điều kiện ${i + 1}: ${d.giaTri.tho} — bấm để gỡ`
                        : laChieu
                          ? `Ô giá trị điều kiện ${i + 1}: trống — bấm để khôi phục`
                          : `Ô giá trị điều kiện ${i + 1}: thả giấy nhớ vào đây`
                    }
                    title={laChieu ? (d.giaTri ? 'Giá trị cố định trên màn chiếu' : 'Bấm để khôi phục giá trị ban đầu') : undefined}
                    onDragOver={(e) => e.preventDefault()}
                    onDrop={laChieu ? undefined : tha(i)}
                    onClick={() => {
                      if (laChieu) {
                        if (!d.giaTri && the.truyVanNapSan) {
                          const goc = cauTuSql(the.truyVanNapSan);
                          const gGoc = goc?.dieuKien[i]?.giaTri;
                          if (gGoc) {
                            soundEngine.playSfx('select');
                            doiDk(i, (x) => ({ ...x, giaTri: gGoc }));
                          }
                        }
                        return;
                      }
                      if (dangChon) dat(i, dangChon);
                      else if (d.giaTri) doiDk(i, (x) => ({ ...x, giaTri: null }));
                    }}
                  >
                    {d.giaTri ? (
                      <span className="v7-khe__giay">{d.giaTri.tho}</span>
                    ) : laChieu ? (
                      '↺ khôi phục'
                    ) : (
                      'thả giấy nhớ'
                    )}
                  </button>
                  {!laChieu ? (
                    <button
                      type="button"
                      className="v7-o v7-o--bo"
                      disabled={khoa}
                      aria-label={`Bỏ điều kiện ${i + 1}`}
                      title="Bỏ điều kiện này"
                      onClick={() => doiCau((c) => ({ ...c, dieuKien: c.dieuKien.filter((_x, k) => k !== i), noi: c.noi.filter((_x, k) => k !== Math.max(0, i - 1)) }))}
                    >
                      ×
                    </button>
                  ) : null}
                </li>
              );
            })}
            {cau.dieuKien.length < TOI_DA_DIEU_KIEN && !laChieu && !khongLoc ? (
              <li className={cau.dieuKien.length === 0 ? 'v7-dk' : undefined}>
                {cau.dieuKien.length === 0 ? (
                  <span className="v7-o v7-o--dau" aria-hidden="true">
                    {nh('LỌC')}
                  </span>
                ) : null}
                <button
                  type="button"
                  className={`v7-o v7-o--them${cau.dieuKien.length === 0 ? ' is-dau' : ''}`}
                  disabled={khoa}
                  aria-label="Thêm điều kiện"
                  onClick={() =>
                    doiCau((c) => ({
                      ...c,
                      dieuKien: [...c.dieuKien, { cot: cot[c.dieuKien.length % Math.max(1, cot.length)] ?? '', phep: 'bang', giaTri: null }],
                      noi: c.dieuKien.length === 0 ? [] : [...c.noi, 'AND'],
                    }))
                  }
                >
                  {cau.dieuKien.length === 0 ? '+ thêm điều kiện' : '+'}
                </button>
              </li>
            ) : null}
          </ol>
        </div>

        <KhungCotVaXepV7
          nhan={nh}
          nhanCot={(t) => nk.cot(t, bang?.ten)}
          chonCot={chonCot}
          bang={bang}
          cotLay={cotLay}
          onDoiCot={doiCot}
          khoa={khoa}
          onChonTatCaCot={() => {
            if (!bang) return;
            const tatCa = bang.cot.map((c) => c.ten);
            const daChonHet = tatCa.every((t) => cotLay.includes(t));
            if (daChonHet) {
              doiCau((c) => ({ ...c, cot: [] }));
            } else {
              doiCau((c) => ({ ...c, cot: tatCa }));
            }
          }}
          khoiSapXep={khoi.sapXep}
          cauXep={cau.xep ?? null}
          cot={cot}
          onDoiXep={(updater) => doiCau((c) => ({ ...c, xep: updater(c.xep ?? null) }))}
        />
      </div>
      )}

      <div className={`v7-vung${bangHien ? ' co-ket-qua' : ''}`} aria-live="polite" aria-label="Kết quả">
        <DongPhieu ref={phieu} tong={daChonBangHL ? tongDong : 0} />
        {bangHien && !soi ? (
          <div className={`v7-kq${bangLaCu && !dangChay ? ' v7-kq--cu' : ''}${vuaDon ? ' v7-kq--don' : ''}`}>
            {bangLaCu && !dangChay ? <p className="v7-kq__cu">Kết quả của lần chạy trước</p> : null}
            {bangHien.dong.length === 0 ? (
              <p className="v7-kq__trong">Không dòng nào.</p>
            ) : (
              <table key={lanBang}>
                <caption className="visually-hidden">{bangLaCu ? 'Kết quả của lần chạy trước' : 'Kết quả truy vấn của bạn'}</caption>
                <thead>
                  <tr>
                    {bangHien.cot.map((c) => (
                      <th key={c} scope="col">
                        {c}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody ref={thanBang}>
                  {bangHien.dong.slice(0, TOI_DA_DONG_HIEN).map((h, r) => (
                    <tr key={r} style={{ ['--i' as string]: Math.min(r, 12), ['--j' as string]: r }} {...thuocTinhDongRung(rung, r)}>
                      {h.map((v, k) =>
                        iBamO === k && v !== null ? (
                          <td key={k} className="v7-kq__o">
                            <button
                              type="button"
                              className={`v7-o-bam is-moi${daChep.includes(r) ? ' is-chep' : ''}${oSai.includes(r) ? ' is-sai' : ''}${oRung === r ? ' is-rung' : ''}`}
                              aria-label={`Ô ${the.bamO ?? ''}: ${String(v)}${daChep.includes(r) ? ' (đã chép)' : ''}`}
                              disabled={daChep.includes(r)}
                              onClick={() => bamOKq(r)}
                            >
                              {String(v)}
                            </button>
                          </td>
                        ) : (
                          <td key={k}>{v === null ? '(trống)' : <ChuCoDauCach chu={String(v)} />}</td>
                        ),
                      )}
                    </tr>
                  ))}
                  {bangHien.dong.length > TOI_DA_DONG_HIEN ? (
                    <tr className="v7-kq__con">
                      <td colSpan={bangHien.cot.length}>… còn {(bangHien.dong.length - TOI_DA_DONG_HIEN).toLocaleString('vi-VN')} dòng nữa (đang hiện {TOI_DA_DONG_HIEN} dòng đầu)</td>
                    </tr>
                  ) : null}
                </tbody>
              </table>
            )}
          </div>
        ) : null}
        {conChep > 0 ? (
          <p className="v7-kq__nhac v7-kq__nhac--tra">
            <IconPointer className="v7-bt" /> {oDich ? `Tìm trong bảng rồi bấm ô ${the.bamO ?? ''} của những dòng cần giữ để chép ra giấy nhớ (còn ${conChep}).` : `Bấm từng ô ${the.bamO ?? ''} để chép ra giấy nhớ (còn ${conChep}).`}
          </p>
        ) : null}
        {cham?.trangThai === 'loi' && !tuViet ? <p className="v7-loi">Chưa chạy được: {cham.chay.thongDiep}</p> : null}
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
          <div className="v7-so__n">{daChonBangHL ? so.n : '–'}</div>
          <div className="v7-so__l">{so.nhan}</div>
        </div>
      </div>

      {!tuViet ? (
        <p className="v7-sql" aria-label="Câu SQL đang dựng">
          {daChonBang ? (
            <CauSql cau={cau} kieuCot={kieuCot} cotChung={cotChung} cte={nguonPhieu && tenNguon ? { ten: tenNguon, nhan: dienTen(nguonPhieu.nhan) } : null} />
          ) : (
            <code>
              <span className="k">SELECT</span> … <span className="k">FROM</span> <em>chưa chọn bảng</em>
            </code>
          )}
        </p>
      ) : null}
      {giayCu.length > 0 && !laChieu ? (
        <details className="v7-con" open={moCon} onToggle={(e) => setMoCon((e.target as HTMLDetailsElement).open)}>
          <summary>Còn trên bảng ({giayCu.length})</summary>
          <div className="v7-con__ds">
            {giayCu.map((g) => (
              <button key={g.khoa} type="button" className={`v7-con__to${dangChon?.khoa === g.khoa ? ' is-chon' : ''}`} disabled={khoa} aria-pressed={dangChon?.khoa === g.khoa} aria-label={`${g.giaTri} (giấy nhớ ${dienTen(g.nguon)})`} onClick={() => (tuViet ? chenGiay(g) : setDangChon(dangChon?.khoa === g.khoa ? null : g))}>
                {g.giaTri}
              </button>
            ))}
          </div>
        </details>
      ) : null}
      <div className="v7-day">
        {the.truyVanNapSan && !dung ? (
          <button
            type="button"
            className="v7-nut v7-nut--phu v7-nut--dat-lai"
            disabled={dangChay}
            onClick={datLaiCauBanDau}
            title="Khôi phục lại câu truy vấn ban đầu trên màn chiếu"
          >
            ↺ Đặt lại
          </button>
        ) : null}
        {daChay && cham && cham.trangThai !== 'loi' ? (
          <button type="button" className={`v7-nut v7-nut--soi${soi ? ' is-mo' : ''}`} onClick={() => setSoi(!soi)}>
            <IconSearch className="v7-bt" /> Xem từng điều kiện
          </button>
        ) : null}
        {trinh ? (
          <>
            {!dung ? (
              <button type="button" className="v7-nut v7-nut--chay" disabled={dangChay} onClick={() => void chay()} title="Chạy thử bao nhiêu lần cũng được, không tính">
                <IconPlay className="v7-bt" /> {dangChay ? 'Đang chạy' : 'Chạy thử'}
              </button>
            ) : null}
            <button type="button" className="v7-nut v7-nut--ghim v7-nut--trinh" disabled={dangChay || xongRoi} onClick={() => void trinhCau()} autoFocus={dung} title="Trình câu đang có trước cuộc họp">
              Trình
            </button>
          </>
        ) : dung ? (
          <button type="button" className="v7-nut v7-nut--ghim" disabled={xongRoi || conChep > 0} title={conChep > 0 ? `Bấm ${conChep} ô ${the.bamO ?? ''} còn lại để chép ra giấy nhớ` : undefined} onClick={xong} autoFocus>
            {the.vatChung && !laChieu ? (
              <>
                <IconPin className="v7-bt" /> Ghim lên bảng
              </>
            ) : 'Tiếp tục'}
          </button>
        ) : (
          <button type="button" className="v7-nut v7-nut--chay" disabled={dangChay || !daChonBangHL || (tuViet ? goGon === '' : !!chonCot && cotLay.length === 0)} onClick={() => void chay()}>
            <IconPlay className="v7-bt" /> {nh(dangChay ? 'ĐANG CHẠY' : 'CHẠY')}
          </button>
        )}
      </div>
    </div>
  );

  return (
    <VungV7 canh={canh} anhCanh={anhCanh} kinhO={cauHinh.kinh} giay={laChieu ? null : giay} le={laChieu || giayHien.length === 0 ? 0 : leGiay(cauHinh.kinh)} nhan={mode === 'fix-query' ? 'Sửa truy vấn' : 'Tra dữ liệu'}>
      {kinh}
      <BanDiCungManTra nguoi={nguoiBan} bong={bong} ten={(ma) => tenNguoiNoi(kb, ma)} dienTen={(t) => thayChuGoiY(muc, dienTen(t))} onHoi={() => hoiBan()} onDong={() => setBong(null)} />
      {loi ? (
        <button
          type="button"
          className="v7-thoai"
          onClick={() => {
            if (cham && cham.trangThai !== 'loi') onDaXemTruyVan?.({ id: the.id, nhan: the.tieuDe, sql }, loiNoi.slice(1, 2));
            setLoiNoi((ds) => ds.slice(1));
          }}
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

/** Cột được so trong từng điều kiện WHERE của câu gõ tay (bỏ `bảng.`, bỏ LOWER / TRIM), cho lời "Khi chạy ra n dòng với a, b". */
function cotTrongDieuKien(dieuKien: readonly string[]): string[] {
  return dieuKien.flatMap((d) => {
    const m = /^\s*\(*\s*(?:(?:LOWER|TRIM)\s*\(\s*)*(?:[A-Za-z_][A-Za-z0-9_]*\.)?([A-Za-z_][A-Za-z0-9_]*)/i.exec(d);
    return m?.[1] ? [m[1]] : [];
  });
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
  le = 0,
  nhan,
  children,
}: {
  canh: CanhTra | 'loc-thu';
  anhCanh: string | undefined;
  kinhO: { x: number; y: number; w: number; h: number };
  giay: React.ReactNode;
  /** Giấy nhớ dán trên rìa máy thò ra ngoài khung 1600 mỗi bên chừng này (`leGiay`): khung co lại để cửa sổ hẹp không cắt giấy. */
  le?: number;
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
  const tiLe = co && co.w > 0 ? Math.min(co.w / (1600 + 2 * le), co.h / 900) : 1;
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
