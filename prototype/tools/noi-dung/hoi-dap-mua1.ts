/**
 * BỘ ĐỌC + MÁY KIỂM TỜ DỮ KIỆN HỎI NHÂN CHỨNG (gói B12, docs/mua-1/brief/b12-vu-1.md mục "Định dạng tờ dữ kiện" và
 * "Luật máy kiểm").
 *
 * Đọc `noi-dung-mua-1/hoi-dap/chung.json` (câu hỏi mẫu cho các ý định chung) và mỗi `hoi-dap/<mã chuỗi>.json` (một tờ),
 * điền mặc định, kiểm chéo với kịch bản đã đọc (chuỗi có dòng `- [HỎI ĐÁP <mã>]`, nhân vật, thẻ hồ sơ), áp mọi luật máy
 * kiểm của đề bài và cho lời trong tờ đi qua máy kiểm giọng. Trả dữ liệu đã chuẩn hóa (hình dạng `BoHoiDapMvp` của
 * `src/content/mvp/types.ts`; tệp sinh kiểm bằng `satisfies`) và các lỗi dạng `<tệp>:<dòng>: …`.
 * Không import gì từ `src/`.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';
import type { RawMvp } from './doc-mvp.ts';
import type { DoanLoi, NguonDong } from './ghep-loi.ts';
import { dongTrongJson, TEP_DONG_HANH } from './hoi-dap-loi.ts';
import { loiGiongHoiDap } from './kiem-giong.ts';
import { docThuMucMvp } from './thu-muc-mvp.ts';

/** Giữ khớp với `Y_DINH_CHUNG` của src/content/mvp/types.ts (bộ công cụ không import từ src/). */
export const Y_DINH_CHUNG = ['chao', 'cam-on', 'tam-biet', 'hoi-mo', 'hoi-rieng-tu', 'pha-game', 'doi-dap-an', 'ngoai-le'] as const;
type YDinh = (typeof Y_DINH_CHUNG)[number];
/** Lớp mà mỗi tờ phải có lời: ý định chung + "khong-ro". */
const LOP_KHAC = [...Y_DINH_CHUNG, 'khong-ro'] as const;
const KIEU_BIEN_THE = ['thang', 'co-khong', 'ke', 'lai', 'tu-ke', 'nho'] as const;
/** Mã dữ kiện không được trùng các tên lớp máy xếp câu hỏi dùng. */
const TEN_DANH_RIENG = new Set<string>([...LOP_KHAC, 'chu-de']);

const SO = '(?:một|hai|ba|bốn|năm|sáu|bảy|tám|chín|mười một|mười hai|mười|\\d{1,2})';
/** Mốc giờ trong lời ("chín giờ sáng", "mười một rưỡi đêm", "7 giờ"): như kiem-bien-the.py của màn thử. */
const MOC_GIO = new RegExp(`(?<![\\p{L}\\p{N}])${SO} (?:giờ|rưỡi)(?: (?:sáng|trưa|chiều|tối|đêm))?(?![\\p{L}])`, 'giu');
/** Lời "co-khong" không mở bằng chữ trả lời có / không (dễ sai nghĩa khi câu hỏi đảo chiều). */
const MO_CO_KHONG = /^\s*(có|không|ừ|vâng)(?![\p{L}])/iu;
/** Thuật ngữ SQL không được có trong lời gợi ý. */
const THUAT_NGU_SQL = /(?<![\p{L}])(SQL|SELECT|WHERE|JOIN|FROM|GROUP BY|ORDER BY|LIKE|AND|OR|COUNT|truy vấn|câu lệnh|mệnh đề|cú pháp)(?![\p{L}])/u;

// ---------- Kiểu (giữ khớp src/content/mvp/types.ts) ----------

export interface DuKienHoiDap {
  ma: string;
  noiDung: string;
  chuBatBuoc: string[];
  giayNho: string;
  an: boolean;
  tuKe: boolean;
  nhoRa: boolean;
  sauKhi: string[];
  canCo: string[];
  tuChoi: string[];
  bienThe: Partial<Record<(typeof KIEU_BIEN_THE)[number], string>> & { thang: string; lai: string };
  cauHoiMau: string[];
  goiY: { ai: string; bac1: string; bac2: string } | null;
}

export interface ToHoiDap {
  ma: string;
  nhanChung: string;
  nguoiDiCung: string[];
  moDau: string;
  tuDongDuKien: string[];
  /** Mã các đoạn [LỜI] của chuỗi mà buổi hỏi đã thay (tùy chọn). Thiếu = máy bỏ khối lời liền sau [HỎI ĐÁP] như cũ. */
  loiDaThay?: string[];
  /** Vị trí trong `items` của chuỗi (= `nodes` sau khi chuyển) các dòng lời thuộc `loiDaThay`; bộ đọc dò, không viết tay. */
  nutDaThay?: number[];
  gioiHan: { soCau: number; lyDo: 'ban' | 'phien'; baoTruoc: { con: number; loi: string }; het: string } | null;
  danhSach: { ma: string; cau: string; can: string[]; moManhMoi: string | null }[];
  duKien: DuKienHoiDap[];
  lopKhac: Record<string, { loi: string[]; cauHoiMau: string[] } | { hoiTiep: string; hetKe: string[]; cauHoiMau: string[] }>;
  chuDeKhongBiet: { ma: string; cauHoiMau: string[]; loi: string[] }[];
  tuKhoaTrongChuyen: string[];
  roiDi: { nut: string; loiBan: string; giuLai: { ai: string; loi: string }; du: { ai: string; loi: string }; thieu: { ai: string; loi: string } };
}

export interface BoHoiDap {
  chung: Record<YDinh, string[]>;
  to: Record<string, ToHoiDap>;
  dongHanh?: DongHanhHoiDap;
}

/** Giữ khớp `Y_DINH_DONG_HANH` của src/content/mvp/types.ts. */
export const Y_DINH_DONG_HANH = ['viec-chinh', 'goi-y'] as const;
/** Bạn đi cùng có lời viết sẵn (giữ khớp `BAN_DONG_HANH` của src/mvp/engine/tri-nho-dong-hanh.ts). */
export const BAN_DONG_HANH = ['tung', 'ha-vy'] as const;
const TRUONG_LOI_DONG_HANH = ['viecChinh', 'conMo', 'khongViec', 'goiY', 'khongGoiY', 'khongMay'] as const;
/** Chỗ điền bắt buộc trong từng lời: nhiệm vụ, các dòng còn mở, lời nhắc việc. */
const CHO_DIEN: Partial<Record<(typeof TRUONG_LOI_DONG_HANH)[number], string>> = { viecChinh: '{viec}', conMo: '{dong}', goiY: '{nhac}' };

export interface DongHanhHoiDap {
  /** Câu mẫu cho hai ý định, và (tùy chọn) "khac": câu chuyện phiếm để máy không ép vào hai ý định kia. */
  cauMau: Record<(typeof Y_DINH_DONG_HANH)[number], string[]> & { khac?: string[] };
  loi: Record<string, Record<(typeof TRUONG_LOI_DONG_HANH)[number], string>>;
}

export interface KetQuaHoiDap {
  /** `null` khi thư mục không có `hoi-dap/`. */
  bo: BoHoiDap | null;
  loi: string[];
  /** Tóm tắt một dòng cho báo cáo kiểm. */
  tomTat: string;
}

// ---------- Đọc ----------

type Json = Record<string, unknown>;
const laObj = (v: unknown): v is Json => typeof v === 'object' && v !== null && !Array.isArray(v);
const dsChu = (v: unknown): string[] => (Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []);
const chu = (v: unknown): string => (typeof v === 'string' ? v : '');
const nguoiBan = (v: unknown): { ai: string; loi: string } => (laObj(v) ? { ai: chu(v.ai), loi: chu(v.loi) } : { ai: '', loi: '' });

/** Điền mặc định cho một tờ (trường thiếu → rỗng / false / null). Kiểm hình dạng làm ở `kiemTo`. */
export function chuanHoaTo(x: Json): ToHoiDap {
  const lopKhac: ToHoiDap['lopKhac'] = {};
  const lk = laObj(x.lopKhac) ? x.lopKhac : {};
  for (const lop of LOP_KHAC) {
    const v = laObj(lk[lop]) ? lk[lop] : {};
    lopKhac[lop] = lop === 'hoi-mo' ? { hoiTiep: chu(v.hoiTiep), hetKe: dsChu(v.hetKe), cauHoiMau: dsChu(v.cauHoiMau) } : { loi: dsChu(v.loi), cauHoiMau: dsChu(v.cauHoiMau) };
  }
  const gh = laObj(x.gioiHan) ? x.gioiHan : null;
  const rd = laObj(x.roiDi) ? x.roiDi : {};
  return {
    ma: chu(x.ma),
    nhanChung: chu(x.nhanChung),
    nguoiDiCung: dsChu(x.nguoiDiCung),
    moDau: chu(x.moDau),
    tuDongDuKien: dsChu(x.tuDongDuKien),
    ...(Array.isArray(x.loiDaThay) ? { loiDaThay: dsChu(x.loiDaThay) } : {}),
    gioiHan: gh
      ? {
          soCau: typeof gh.soCau === 'number' ? gh.soCau : 0,
          lyDo: gh.lyDo === 'phien' ? 'phien' : 'ban',
          baoTruoc: laObj(gh.baoTruoc) ? { con: typeof gh.baoTruoc.con === 'number' ? gh.baoTruoc.con : 0, loi: chu(gh.baoTruoc.loi) } : { con: 0, loi: '' },
          het: chu(gh.het),
        }
      : null,
    danhSach: (Array.isArray(x.danhSach) ? x.danhSach : []).filter(laObj).map((d) => ({ ma: chu(d.ma), cau: chu(d.cau), can: dsChu(d.can), moManhMoi: typeof d.moManhMoi === 'string' ? d.moManhMoi : null })),
    duKien: (Array.isArray(x.duKien) ? x.duKien : []).filter(laObj).map((d) => {
      const bt: Record<string, string> = {};
      if (laObj(d.bienThe)) for (const k of KIEU_BIEN_THE) if (typeof d.bienThe[k] === 'string') bt[k] = d.bienThe[k] as string;
      return {
        ma: chu(d.ma),
        noiDung: chu(d.noiDung),
        chuBatBuoc: dsChu(d.chuBatBuoc),
        giayNho: chu(d.giayNho),
        an: d.an === true,
        tuKe: d.tuKe === true,
        nhoRa: d.nhoRa === true,
        sauKhi: dsChu(d.sauKhi),
        canCo: dsChu(d.canCo),
        tuChoi: dsChu(d.tuChoi),
        bienThe: { ...bt, thang: bt.thang ?? '', lai: bt.lai ?? '' },
        cauHoiMau: dsChu(d.cauHoiMau),
        goiY: laObj(d.goiY) ? { ai: chu(d.goiY.ai), bac1: chu(d.goiY.bac1), bac2: chu(d.goiY.bac2) } : null,
      };
    }),
    lopKhac,
    chuDeKhongBiet: (Array.isArray(x.chuDeKhongBiet) ? x.chuDeKhongBiet : []).filter(laObj).map((k) => ({ ma: chu(k.ma), cauHoiMau: dsChu(k.cauHoiMau), loi: dsChu(k.loi) })),
    tuKhoaTrongChuyen: dsChu(x.tuKhoaTrongChuyen),
    roiDi: { nut: chu(rd.nut), loiBan: chu(rd.loiBan), giuLai: nguoiBan(rd.giuLai), du: nguoiBan(rd.du), thieu: nguoiBan(rd.thieu) },
  };
}

// ---------- Kiểm ----------

/** Các luật máy kiểm của một tờ (không kể giọng và kiểm chéo kịch bản). Mỗi lỗi kèm chữ để dò dòng trong JSON. */
export function kiemTo(to: ToHoiDap): { kim: string; thongBao: string }[] {
  const loi: { kim: string; thongBao: string }[] = [];
  const bao = (kim: string, thongBao: string): void => void loi.push({ kim, thongBao });
  const theoMa = new Map<string, DuKienHoiDap>();
  for (const d of to.duKien) {
    if (!d.ma) bao(d.noiDung, 'dữ kiện thiếu "ma"');
    else if (theoMa.has(d.ma)) bao(d.ma, `dữ kiện "${d.ma}" trùng mã`);
    else if (TEN_DANH_RIENG.has(d.ma) || d.ma.startsWith('chu-de:')) bao(d.ma, `mã dữ kiện "${d.ma}" trùng tên lớp của máy xếp câu hỏi`);
    theoMa.set(d.ma, d);
  }
  if (!to.ma) bao('"ma"', 'tờ thiếu "ma" (mã chuỗi)');
  if (!to.nhanChung) bao('"nhanChung"', 'tờ thiếu "nhanChung"');
  if (!to.moDau) bao('"moDau"', 'tờ thiếu "moDau"');
  if (to.nguoiDiCung.length === 0) bao('"nguoiDiCung"', 'tờ thiếu "nguoiDiCung"');
  if (to.tuKhoaTrongChuyen.length === 0) bao('"tuKhoaTrongChuyen"', 'tờ thiếu "tuKhoaTrongChuyen"');

  for (const d of to.duKien) {
    const batBuoc = d.chuBatBuoc.map((c) => c.toLowerCase());
    for (const [kieu, cau] of Object.entries(d.bienThe)) {
      if (cau === undefined || cau === '') continue;
      const thap = cau.toLowerCase();
      for (const c of batBuoc) if (!thap.includes(c)) bao(cau, `${d.ma}/${kieu}: thiếu chữ bắt buộc "${c}"`);
      for (const m of cau.matchAll(MOC_GIO)) {
        if (!batBuoc.some((c) => c.includes(m[0].toLowerCase()))) bao(cau, `${d.ma}/${kieu}: có mốc giờ lạ "${m[0]}" (chỉ được nói mốc giờ trong chữ bắt buộc)`);
      }
    }
    if (!d.bienThe.thang || !d.bienThe.lai) bao(d.ma, `${d.ma}: phải có biến thể "thang" và "lai"`);
    if (d.bienThe['co-khong'] && MO_CO_KHONG.test(d.bienThe['co-khong'])) bao(d.bienThe['co-khong'], `${d.ma}/co-khong: không mở bằng "Có", "Không", "Ừ", "Vâng" (sai nghĩa khi câu hỏi đảo chiều)`);
    if (d.tuKe && !d.bienThe['tu-ke'] && !d.bienThe.ke) bao(d.ma, `${d.ma}: tự kể ("tuKe") nhưng không có biến thể "tu-ke" hay "ke"`);
    if (d.nhoRa && !d.bienThe.nho) bao(d.ma, `${d.ma}: nhắc mới nhớ ("nhoRa") nhưng không có biến thể "nho"`);
    if (d.cauHoiMau.length < 6) bao(d.ma, `${d.ma}: cần ít nhất 6 câu hỏi mẫu (đang có ${d.cauHoiMau.length})`);
    if (d.canCo.length > 0 && d.tuChoi.length === 0) bao(d.ma, `${d.ma}: có "canCo" thì phải có "tuChoi"`);
    if (!d.giayNho) bao(d.ma, `${d.ma}: thiếu "giayNho"`);
    for (const s of d.sauKhi) if (!theoMa.has(s)) bao(d.ma, `${d.ma}: "sauKhi" trỏ tới dữ kiện không có "${s}"`);
    if (d.goiY) {
      if (!to.nguoiDiCung.includes(d.goiY.ai)) bao(d.goiY.bac1, `${d.ma}: người gợi ý "${d.goiY.ai}" không nằm trong "nguoiDiCung"`);
      if (batBuoc.some((c) => d.goiY!.bac1.toLowerCase().includes(c))) bao(d.goiY.bac1, `${d.ma}: gợi ý bậc 1 lộ chữ bắt buộc`);
      for (const g of [d.goiY.bac1, d.goiY.bac2]) {
        const m = THUAT_NGU_SQL.exec(g);
        if (m) bao(g, `${d.ma}: gợi ý có thuật ngữ SQL "${m[0]}"`);
      }
    }
  }

  const trongDs = new Set<string>();
  const maDong = new Set<string>();
  for (const m of to.danhSach) {
    if (!m.ma || maDong.has(m.ma)) bao(m.cau, `danh sách: dòng "${m.cau}" thiếu mã hoặc trùng mã`);
    maDong.add(m.ma);
    if (m.can.length === 0) bao(m.cau, `danh sách ${m.ma}: "can" rỗng`);
    for (const c of m.can) {
      trongDs.add(c);
      const d = theoMa.get(c);
      if (!d) bao(m.cau, `danh sách ${m.ma}: không có dữ kiện "${c}"`);
      else if (!d.goiY || !d.goiY.bac1 || !d.goiY.bac2) bao(c, `${c}: nằm trong danh sách nhưng thiếu gợi ý hai bậc`);
      if (d?.an) bao(c, `${c}: nằm trong danh sách nên không được "an": true`);
    }
  }
  for (const c of trongDs) if (!to.tuDongDuKien.includes(c)) bao('"tuDongDuKien"', `"tuDongDuKien" thiếu "${c}" (dữ kiện trong danh sách; cách "xem cả đoạn" không được thiếu việc chính)`);
  for (const c of to.tuDongDuKien) if (!theoMa.has(c)) bao('"tuDongDuKien"', `"tuDongDuKien" trỏ tới dữ kiện không có "${c}"`);
  if (to.gioiHan) {
    const g = to.gioiHan;
    if (g.soCau < trongDs.size + 3) bao('"gioiHan"', `"gioiHan.soCau" = ${g.soCau} nhỏ hơn số dữ kiện trong danh sách cộng 3 (${trongDs.size + 3})`);
    if (!g.het) bao('"gioiHan"', '"gioiHan" thiếu lời "het"');
    if (g.baoTruoc.con <= 0 || g.baoTruoc.con >= g.soCau || !g.baoTruoc.loi) bao('"gioiHan"', '"gioiHan.baoTruoc" cần "con" (1 tới soCau − 1) và "loi"');
  }

  for (const lop of LOP_KHAC) {
    const v = to.lopKhac[lop];
    if (!v) continue;
    if ('hoiTiep' in v) {
      if (!v.hoiTiep || v.hetKe.length === 0) bao('"hoi-mo"', `lopKhac.hoi-mo: cần "hoiTiep" và ít nhất một lời "hetKe"`);
    } else if (v.loi.length === 0) bao('"lopKhac"', `lopKhac.${lop}: thiếu lời (mỗi tờ phải có lời cho đủ ý định chung và "khong-ro")`);
  }
  const maKb = new Set<string>();
  for (const k of to.chuDeKhongBiet) {
    if (!k.ma || maKb.has(k.ma)) bao(k.ma || '"chuDeKhongBiet"', `chuDeKhongBiet: mã "${k.ma}" thiếu hoặc trùng`);
    maKb.add(k.ma);
    if (k.cauHoiMau.length === 0 || k.loi.length === 0) bao(k.ma, `chuDeKhongBiet ${k.ma}: cần câu hỏi mẫu và lời`);
  }
  // Lời không mang dữ kiện thì không được nói mốc giờ.
  const khongDuKien = [
    ...Object.values(to.lopKhac).flatMap((v) => ('hoiTiep' in v ? v.hetKe : v.loi)),
    ...to.chuDeKhongBiet.flatMap((k) => k.loi),
    ...to.duKien.flatMap((d) => d.tuChoi),
  ];
  for (const l of khongDuKien) for (const m of l.matchAll(MOC_GIO)) bao(l, `lời không mang dữ kiện mà có mốc giờ "${m[0]}"`);
  const rd = to.roiDi;
  if (!rd.nut || !rd.loiBan || !rd.giuLai.loi || !rd.du.loi || !rd.thieu.loi) bao('"roiDi"', '"roiDi" cần "nut", "loiBan", "giuLai", "du", "thieu"');
  for (const k of [rd.giuLai, rd.du, rd.thieu]) if (k.ai && !to.nguoiDiCung.includes(k.ai)) bao(k.loi, `roiDi: "${k.ai}" không nằm trong "nguoiDiCung"`);
  return loi;
}

/** Kiểm `chung.json`: đủ tám ý định, mỗi ý định 6–10 câu mẫu. */
export function kiemChung(chung: Json): { kim: string; thongBao: string }[] {
  const loi: { kim: string; thongBao: string }[] = [];
  for (const k of Y_DINH_CHUNG) {
    const ds = dsChu(chung[k]);
    if (ds.length < 6 || ds.length > 10) loi.push({ kim: `"${k}"`, thongBao: `ý định "${k}": cần 6–10 câu mẫu (đang có ${ds.length})` });
  }
  for (const k of Object.keys(chung)) if (!(Y_DINH_CHUNG as readonly string[]).includes(k)) loi.push({ kim: `"${k}"`, thongBao: `ý định lạ "${k}" (chỉ: ${Y_DINH_CHUNG.join(', ')})` });
  return loi;
}

/** Dò một mục của chuỗi về đoạn [LỜI] gốc: tệp khung đã ghép + dòng (1-based) → mã đoạn lời, không phải dòng lời → `null`. */
export type DoDoanLoi = (tep: string, dong: number) => string | null;

/** Bộ dò đoạn lời từ bản đồ ghép lời (`docThuMucMvp`: `banDo`, `doanLoi`). */
export function dungDoDoanLoi(nguon: { banDo: Map<string, NguonDong[]>; doanLoi: readonly DoanLoi[] }): DoDoanLoi {
  const theoDong = new Map<string, string>();
  for (const d of nguon.doanLoi) for (const l of d.dong) theoDong.set(`${d.tep}:${l.so}`, d.ma);
  return (tep, dong) => {
    const n = nguon.banDo.get(tep)?.[dong - 1];
    return n ? (theoDong.get(`${n.tep}:${n.dong}`) ?? null) : null;
  };
}

/**
 * Các mục của chuỗi thuộc những đoạn lời `loiDaThay` (sau dòng `[HỎI ĐÁP]`): trả vị trí các DÒNG LỜI (mục `line`, máy bỏ
 * qua khi buổi hỏi đã thay) và lỗi khi một mã không phải đoạn lời có thật của chuỗi sau `[HỎI ĐÁP]`.
 */
export function nutDaThayCua(to: ToHoiDap, chuoi: RawMvp['chuoi'][number], doDoan: DoDoanLoi): { nut: number[]; loi: { kim: string; thongBao: string }[] } {
  const loi: { kim: string; thongBao: string }[] = [];
  const ma = to.loiDaThay ?? [];
  const viTri = chuoi.items.findIndex((it) => it.kind === 'hoi-dap' && it.ma === to.ma);
  const gap = new Set<string>();
  const nut: number[] = [];
  chuoi.items.forEach((it, k) => {
    const doan = doDoan(chuoi.viTri.tep, chuoi.itemDong[k] ?? 0);
    if (!doan || !ma.includes(doan)) return;
    if (k < viTri) {
      loi.push({ kim: doan, thongBao: `"loiDaThay" có "${doan}" nhưng đoạn này đứng trước dòng [HỎI ĐÁP ${to.ma}]` });
      return;
    }
    gap.add(doan);
    if (it.kind === 'line') nut.push(k);
  });
  const trung = new Set<string>();
  for (const m of ma) {
    if (trung.has(m)) loi.push({ kim: m, thongBao: `"loiDaThay" có "${m}" hai lần` });
    trung.add(m);
    if (!gap.has(m) && !loi.some((l) => l.kim === m)) loi.push({ kim: m, thongBao: `"loiDaThay" có "${m}" nhưng chuỗi "${to.ma}" không có đoạn [LỜI ${m}] sau dòng [HỎI ĐÁP]` });
  }
  return { nut, loi };
}

/**
 * Kiểm chéo tờ với kịch bản: chuỗi có `[HỎI ĐÁP]`, nhân vật, thẻ hồ sơ, đoạn [LỜI] viết sẵn chứa đủ chữ bắt buộc; `loiDaThay`
 * (nếu khai) là các đoạn lời có thật của chuỗi (cần `doDoan`).
 */
export function kiemCheoTo(to: ToHoiDap, mvp: RawMvp, doDoan?: DoDoanLoi): { kim: string; thongBao: string }[] {
  const loi: { kim: string; thongBao: string }[] = [];
  const bao = (kim: string, thongBao: string): void => void loi.push({ kim, thongBao });
  const nv = new Set(mvp.nhanVat.map((n) => n.id));
  const hoSo = new Set(mvp.dossier.map((d) => d.id));
  if (to.nhanChung && !nv.has(to.nhanChung)) bao('"nhanChung"', `không có nhân vật "${to.nhanChung}" trong nhan-vat.md`);
  for (const n of to.nguoiDiCung) if (!nv.has(n)) bao('"nguoiDiCung"', `không có nhân vật "${n}" trong nhan-vat.md`);
  for (const m of to.danhSach) {
    if (m.moManhMoi && !(m.moManhMoi.startsWith('clue-') && hoSo.has(m.moManhMoi))) bao(m.moManhMoi, `danh sách ${m.ma}: "moManhMoi" "${m.moManhMoi}" không phải giấy nhớ (clue-…) có trong ho-so/`);
  }
  for (const d of to.duKien) {
    // canCo: mã thẻ hồ sơ (clue-/doc-/ev-) phải có trong ho-so/; mã dữ kiện cùng tờ cũng được; mã khác là cờ.
    for (const c of d.canCo) if (!to.duKien.some((x) => x.ma === c) && /^(clue|doc|ev)-/.test(c) && !hoSo.has(c)) bao(d.ma, `${d.ma}: "canCo" trỏ tới thẻ không có trong ho-so/ "${c}"`);
  }
  const chuoi = mvp.chuoi.find((c) => c.id === to.ma);
  const viTri = chuoi?.items.findIndex((it) => it.kind === 'hoi-dap' && it.ma === to.ma) ?? -1;
  if (!chuoi || viTri < 0) {
    bao('"ma"', `không có chuỗi "${to.ma}" với dòng "- [HỎI ĐÁP ${to.ma}]" trong kich-ban/`);
    return loi;
  }
  // Các đoạn [LỜI] viết sẵn của chuỗi (mọi đoạn, kể cả đoạn bị ngắt bởi màn soi, [HẬU QUẢ], [ẢNH]…) là cách "xem cả đoạn":
  // gộp lại phải nói ra đủ chữ bắt buộc của mọi dữ kiện trong tuDongDuKien.
  const doan = chuoi.items.flatMap((it) => (it.kind === 'line' ? [it.line.text] : []));
  if (doan.length === 0) bao('"ma"', `chuỗi "${to.ma}" không có đoạn [LỜI] viết sẵn nào (cách "xem cả đoạn")`);
  const toanDoan = doan.join('\n').toLowerCase();
  for (const c of to.tuDongDuKien) {
    for (const b of to.duKien.find((d) => d.ma === c)?.chuBatBuoc ?? []) {
      if (!toanDoan.includes(b.toLowerCase())) bao('"tuDongDuKien"', `"tuDongDuKien" có "${c}" nhưng đoạn [LỜI] của chuỗi không nói "${b}"`);
    }
  }
  if (to.loiDaThay) {
    if (!doDoan) bao('"loiDaThay"', '"loiDaThay": thiếu bản đồ ghép lời để dò đoạn lời của chuỗi');
    else loi.push(...nutDaThayCua(to, chuoi, doDoan).loi);
  }
  return loi;
}

/** Kiểm `dong-hanh.json`: câu mẫu đủ hai ý định (6–12 câu), lời đủ trường cho từng bạn đi cùng, đúng chỗ điền, không thuật ngữ SQL. */
export function kiemDongHanh(j: Json): { kim: string; thongBao: string }[] {
  const loi: { kim: string; thongBao: string }[] = [];
  const cm = laObj(j.cauMau) ? j.cauMau : {};
  for (const y of Y_DINH_DONG_HANH) {
    const n = dsChu(cm[y]).length;
    if (n < 6 || n > 12) loi.push({ kim: '"cauMau"', thongBao: `dong-hanh: ý định "${y}" cần 6–12 câu mẫu (đang có ${n})` });
  }
  for (const k of Object.keys(cm)) if (![...Y_DINH_DONG_HANH, 'khac'].includes(k)) loi.push({ kim: `"${k}"`, thongBao: `dong-hanh: ý định lạ "${k}" (chỉ: ${Y_DINH_DONG_HANH.join(', ')}, khac)` });
  const l = laObj(j.loi) ? j.loi : {};
  for (const ban of BAN_DONG_HANH) {
    const x = laObj(l[ban]) ? l[ban] : null;
    if (!x) {
      loi.push({ kim: '"loi"', thongBao: `dong-hanh: thiếu lời của "${ban}"` });
      continue;
    }
    for (const t of TRUONG_LOI_DONG_HANH) {
      const c = chu(x[t]);
      if (!c) loi.push({ kim: `"${ban}"`, thongBao: `dong-hanh: ${ban} thiếu lời "${t}"` });
      const dien = CHO_DIEN[t];
      if (c && dien && !c.includes(dien)) loi.push({ kim: c, thongBao: `dong-hanh: ${ban}.${t} phải có chỗ điền "${dien}"` });
      const m = THUAT_NGU_SQL.exec(c);
      if (m) loi.push({ kim: c, thongBao: `dong-hanh: ${ban}.${t} có thuật ngữ SQL "${m[0]}"` });
    }
  }
  return loi;
}

function chuanHoaDongHanh(j: Json): DongHanhHoiDap {
  const cm = laObj(j.cauMau) ? j.cauMau : {};
  const l = laObj(j.loi) ? j.loi : {};
  const loi: DongHanhHoiDap['loi'] = {};
  for (const ban of BAN_DONG_HANH) {
    const x = laObj(l[ban]) ? l[ban] : {};
    loi[ban] = Object.fromEntries(TRUONG_LOI_DONG_HANH.map((t) => [t, chu(x[t])])) as DongHanhHoiDap['loi'][string];
  }
  return {
    cauMau: { 'viec-chinh': dsChu(cm['viec-chinh']), 'goi-y': dsChu(cm['goi-y']), ...(Array.isArray(cm.khac) ? { khac: dsChu(cm.khac) } : {}) },
    loi,
  };
}

/**
 * Đọc + kiểm cả thư mục `hoi-dap/`. `mvp` = kịch bản đã đọc (kiểm chéo); `giong` = cho lời qua máy kiểm giọng; `nguonLoi` =
 * bản đồ ghép lời của chính lần đọc `mvp` (để dò `loiDaThay`); thiếu mà có tờ khai `loiDaThay` thì tự đọc lại thư mục.
 */
export function docHoiDap(
  thuMucGoc: string,
  mvp: RawMvp | null,
  tuyChon: { hienThi?: string; giong?: boolean; nguonLoi?: { banDo: Map<string, NguonDong[]>; doanLoi: readonly DoanLoi[] } } = {},
): KetQuaHoiDap {
  const ht = tuyChon.hienThi ?? 'noi-dung-mua-1';
  const thuMuc = join(thuMucGoc, 'hoi-dap');
  const loi: string[] = [];
  // Chuỗi có [HỎI ĐÁP] mà thư mục không có tờ nào vẫn phải báo.
  const coDanhDau = (mvp?.chuoi ?? []).flatMap((c) => c.items.flatMap((it, k) => (it.kind === 'hoi-dap' ? [{ c, it, k }] : [])));
  if (!existsSync(thuMuc)) {
    for (const { c, it, k } of coDanhDau) loi.push(`${c.viTri.tep}:${c.itemDong[k] ?? c.viTri.dong}: [HỎI ĐÁP ${it.ma}]: thiếu tờ ${ht}/hoi-dap/${it.ma}.json`);
    return { bo: null, loi, tomTat: '' };
  }
  const docJson = (f: string): { raw: string; v: unknown } | null => {
    const raw = readFileSync(join(thuMuc, f), 'utf8');
    try {
      return { raw, v: JSON.parse(raw) };
    } catch (e) {
      loi.push(`${ht}/hoi-dap/${f}:1: JSON hỏng: ${(e as Error).message}`);
      return null;
    }
  };
  const ghi = (f: string, raw: string, ds: { kim: string; thongBao: string }[]): void => {
    for (const l of ds) loi.push(`${ht}/hoi-dap/${f}:${dongTrongJson(raw, l.kim.replace(/^"(.*)"$/, '$1'))}: ${l.thongBao}`);
  };

  const chung = {} as Record<YDinh, string[]>;
  for (const k of Y_DINH_CHUNG) chung[k] = [];
  if (!existsSync(join(thuMuc, 'chung.json'))) loi.push(`${ht}/hoi-dap/chung.json:1: thiếu tệp câu hỏi mẫu cho các ý định chung`);
  else {
    const c = docJson('chung.json');
    if (c && laObj(c.v)) {
      ghi('chung.json', c.raw, kiemChung(c.v));
      for (const k of Y_DINH_CHUNG) chung[k] = dsChu(c.v[k]);
    } else if (c) loi.push(`${ht}/hoi-dap/chung.json:1: phải là một đối tượng { "<ý định>": [câu mẫu…] }`);
  }

  let dongHanh: DongHanhHoiDap | undefined;
  if (existsSync(join(thuMuc, TEP_DONG_HANH))) {
    const d = docJson(TEP_DONG_HANH);
    if (d && laObj(d.v)) {
      ghi(TEP_DONG_HANH, d.raw, kiemDongHanh(d.v));
      dongHanh = chuanHoaDongHanh(d.v);
    } else if (d) loi.push(`${ht}/hoi-dap/${TEP_DONG_HANH}:1: phải là một đối tượng { "cauMau": …, "loi": … }`);
  }

  let doDoan: DoDoanLoi | undefined;
  const layDoDoan = (): DoDoanLoi => {
    if (!doDoan) {
      const nguon = tuyChon.nguonLoi ?? docThuMucMvp(thuMucGoc, ht);
      doDoan = dungDoDoanLoi(nguon);
    }
    return doDoan;
  };
  const to: Record<string, ToHoiDap> = {};
  for (const f of readdirSync(thuMuc).filter((x) => x.endsWith('.json') && x !== 'chung.json' && x !== TEP_DONG_HANH).sort()) {
    const j = docJson(f);
    if (!j) continue;
    if (!laObj(j.v)) {
      loi.push(`${ht}/hoi-dap/${f}:1: tờ dữ kiện phải là một đối tượng JSON`);
      continue;
    }
    const t = chuanHoaTo(j.v);
    if (t.ma && `${t.ma}.json` !== f) loi.push(`${ht}/hoi-dap/${f}:${dongTrongJson(j.raw, t.ma)}: tên tệp phải là "<ma>.json" ("${t.ma}.json")`);
    ghi(f, j.raw, kiemTo(t));
    if (mvp) {
      const dd = t.loiDaThay ? layDoDoan() : undefined;
      ghi(f, j.raw, kiemCheoTo(t, mvp, dd));
      const chuoi = mvp.chuoi.find((c) => c.id === t.ma);
      // Tệp sinh mang sẵn vị trí các dòng lời đã thay, máy game khỏi phải dò lại.
      if (dd && chuoi) t.nutDaThay = nutDaThayCua(t, chuoi, dd).nut;
    }
    if (t.ma) to[t.ma] = t;
  }
  for (const { c, it, k } of coDanhDau) {
    if (!to[it.ma]) loi.push(`${c.viTri.tep}:${c.itemDong[k] ?? c.viTri.dong}: [HỎI ĐÁP ${it.ma}]: thiếu tờ ${ht}/hoi-dap/${it.ma}.json`);
    if (it.ma !== c.id) loi.push(`${c.viTri.tep}:${c.itemDong[k] ?? c.viTri.dong}: [HỎI ĐÁP ${it.ma}] phải nằm trong chuỗi cùng mã (đang ở "${c.id}")`);
  }
  if (tuyChon.giong !== false) loi.push(...loiGiongHoiDap(thuMucGoc));
  const so = Object.values(to);
  const tomTat = `${so.length} tờ hỏi đáp (${so.reduce((s, t) => s + t.duKien.length, 0)} dữ kiện, ${so.reduce((s, t) => s + t.chuDeKhongBiet.length, 0)} chủ đề không biết)`;
  return { bo: { chung, to, ...(dongHanh ? { dongHanh } : {}) }, loi, tomTat: `${tomTat}${dongHanh ? ', lời viết sẵn của bạn đi cùng' : ''}` };
}
