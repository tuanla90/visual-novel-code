/**
 * LỊCH THẬT của chương 1 (user chốt 01/10/2026: truyện diễn ra năm 2024) — thuần, không React, không store.
 *
 * Mọi mốc tính từ MỘT ngày: `lich.md` "## Mở đầu" `- Ngày mở đầu: 2024-09-08` (Chủ nhật nhận phòng KTX;
 * `KichBanMvp.lich.ngayMoDau`, thiếu thì `NGAY_MO_DAU_MAC_DINH`):
 *   nhận phòng (CN) → tuần sinh hoạt công dân (T2–T6 kế) → Ngày hội CLB (T7 kế) → phòng CLB 16h, lá thư
 *   (T2 tuần 2) → ngày điều tra n = T2 tuần 2 + n (1–5: T3 → T7) → buổi họp rà soát 16h (T2 tuần 3, hạn của vụ).
 *
 * Ngày viết dạng `YYYY-MM-DD` và tính theo UTC để không lệch múi giờ máy chạy.
 *
 * Chống lộ truyện: `mocLich` chỉ đưa mốc người chơi ĐÃ biết — mốc đã qua, hôm nay, và hạn đã được giao (buổi họp
 * chỉ hiện từ ngày 1, sau khi lá thư đến). Ngày điều tra chưa tới không hiện. Hạn nhiệm vụ phụ (từ Vụ 2) truyền
 * vào qua `hanPhu`; chương 1 không có.
 */
import type { GiaiDoanMvp } from './trang-thai';

export const NGAY_MO_DAU_MAC_DINH = '2024-09-08';

/** 0 = Chủ nhật … 6 = thứ Bảy (như `Date.getUTCDay`). */
const TEN_THU = ['Chủ nhật', 'thứ Hai', 'thứ Ba', 'thứ Tư', 'thứ Năm', 'thứ Sáu', 'thứ Bảy'] as const;
/** Nhãn cột lưới tháng, bắt đầu từ thứ Hai. */
export const NHAN_COT_THU = ['T2', 'T3', 'T4', 'T5', 'T6', 'T7', 'CN'] as const;

const MS_NGAY = 86_400_000;

function veDate(iso: string): Date {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(iso);
  if (!m) throw new Error(`ngày phải dạng YYYY-MM-DD: "${iso}"`);
  return new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
}

function veIso(d: Date): string {
  return d.toISOString().slice(0, 10);
}

/** `iso` cộng `n` ngày (n âm thì lùi). */
export function congNgay(iso: string, n: number): string {
  return veIso(new Date(veDate(iso).getTime() + n * MS_NGAY));
}

/** Số ngày từ `tu` tới `den` (den sau tu → dương). */
export function soNgayGiua(tu: string, den: string): number {
  return Math.round((veDate(den).getTime() - veDate(tu).getTime()) / MS_NGAY);
}

/** 0 = Chủ nhật … 6 = thứ Bảy. */
export function thuCua(iso: string): number {
  return veDate(iso).getUTCDay();
}

/** "thứ Ba", "Chủ nhật". */
export function tenThu(iso: string): string {
  return TEN_THU[thuCua(iso)] ?? '';
}

/** "17/09/2024". */
export function ngayNgan(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${d}/${m}/${y}`;
}

/** "thứ Ba, 17/09/2024" · "Chủ nhật, 08/09/2024". */
export function dinhDangNgay(iso: string): string {
  return `${tenThu(iso)}, ${ngayNgan(iso)}`;
}

/** Viết hoa chữ đầu (đầu câu: "Thứ Ba, 17/09/2024"). */
export function hoaDau(s: string): string {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

/** Ngày đầu tiên SAU `iso` rơi vào `thu` (0 = CN … 6 = T7). */
function thuKeTiep(iso: string, thu: number): string {
  const lech = (thu - thuCua(iso) + 7) % 7;
  return congNgay(iso, lech === 0 ? 7 : lech);
}

export interface LichNgay {
  nhanPhong: string;
  tuanCongDan: { tu: string; den: string };
  ngayHoi: string;
  phongClb: string;
  /** Ngày điều tra `n` (1 = thứ Ba tuần 2). */
  ngayDieuTra: (n: number) => string;
  hop: string;
}

/** Các mốc truyện của chương 1 tính từ ngày mở đầu (thiếu → 2024-09-08). */
export function lichNgay(ngayMoDau?: string | null): LichNgay {
  const nhanPhong = ngayMoDau || NGAY_MO_DAU_MAC_DINH;
  const thuHai1 = thuKeTiep(nhanPhong, 1);
  const ngayHoi = thuKeTiep(nhanPhong, 6);
  const phongClb = thuKeTiep(ngayHoi, 1);
  return {
    nhanPhong,
    tuanCongDan: { tu: thuHai1, den: congNgay(thuHai1, 4) },
    ngayHoi,
    phongClb,
    ngayDieuTra: (n) => congNgay(phongClb, n),
    hop: congNgay(phongClb, 7),
  };
}

export interface HomNay {
  ngay: string;
  /** Mở đầu kéo dài cả tuần đầu (CN nhận phòng → T2 16h phòng CLB) — không chỉ ra một ngày: `ngay` là ngày nhận phòng. */
  moDau: boolean;
}

/** Hôm nay theo tiến độ: mở đầu → ngày nhận phòng (cờ `moDau`); ngày n → ngày điều tra n; họp / hết → ngày họp. */
export function homNay(s: { giaiDoan: GiaiDoanMvp; ngay: number }, ngayMoDau?: string | null): HomNay {
  const l = lichNgay(ngayMoDau);
  if (s.giaiDoan === 'mo-dau') return { ngay: l.nhanPhong, moDau: true };
  if (s.giaiDoan === 'ngay') return { ngay: l.ngayDieuTra(Math.max(1, s.ngay)), moDau: false };
  return { ngay: l.hop, moDau: false };
}

export type LoaiMoc = 'truyen' | 'han' | 'hom-nay' | 'qua';

export interface MocLich {
  ngay: string;
  ten: string;
  /** So với hôm nay: đã qua / hôm nay; còn lại là mốc truyện hay hạn. */
  loai: LoaiMoc;
  chiTiet?: string;
  /** Mốc là một hạn — giữ cả khi đã thành `hom-nay` / `qua`. `vu`: hạn của vụ; `phu`: hạn nhiệm vụ phụ. */
  han?: 'vu' | 'phu';
  /** Mốc kéo dài nhiều ngày (tuần sinh hoạt công dân): ngày cuối. */
  den?: string;
}

/** Hạn của nhiệm vụ phụ (Vụ 2 trở đi). */
export interface HanPhu {
  ngay: string;
  ten: string;
  chiTiet?: string;
}

export interface TuyChonMocLich {
  ngayMoDau?: string | null;
  /** Tên ngày điều tra (lich.md "## <Tên> {ngày: n …}"); thiếu → "Ngày n". */
  tenNgay?: (so: number) => string;
  hanPhu?: HanPhu[];
}

function xepLoai(ngay: string, den: string | undefined, hom: string, goc: 'truyen' | 'han'): LoaiMoc {
  if (soNgayGiua(den ?? ngay, hom) > 0) return 'qua';
  if (soNgayGiua(ngay, hom) >= 0) return 'hom-nay';
  return goc;
}

/** Mốc người chơi đã biết, xếp theo ngày (xem đầu tệp: không lộ ngày chưa tới). */
export function mocLich(s: { giaiDoan: GiaiDoanMvp; ngay: number }, tuy: TuyChonMocLich = {}): MocLich[] {
  const l = lichNgay(tuy.ngayMoDau);
  const hn = homNay(s, tuy.ngayMoDau);
  const hom = hn.ngay;
  const ds: MocLich[] = [];
  const them = (m: Omit<MocLich, 'loai'>, goc: 'truyen' | 'han' = 'truyen'): void => {
    ds.push({ ...m, loai: xepLoai(m.ngay, m.den, hom, goc) });
  };

  them({ ngay: l.nhanPhong, ten: 'Nhận phòng KTX', chiTiet: 'Phòng 408' });
  if (!hn.moDau) {
    them({ ngay: l.tuanCongDan.tu, den: l.tuanCongDan.den, ten: 'Tuần sinh hoạt công dân' });
    them({ ngay: l.ngayHoi, ten: 'Ngày hội CLB' });
    them({ ngay: l.phongClb, ten: 'Phòng CLB · lá thư', chiTiet: '16:00' });
    const toi = s.giaiDoan === 'ngay' ? Math.max(1, s.ngay) : 5;
    for (let n = 1; n <= toi; n++) {
      const ten = tuy.tenNgay?.(n);
      them({ ngay: l.ngayDieuTra(n), ten: `Ngày ${n}`, ...(ten ? { chiTiet: ten } : {}) });
    }
    them({ ngay: l.hop, ten: 'Buổi họp rà soát', chiTiet: '16:00', han: 'vu' }, 'han');
  }
  for (const h of tuy.hanPhu ?? []) them({ ngay: h.ngay, ten: h.ten, han: 'phu', ...(h.chiTiet ? { chiTiet: h.chiTiet } : {}) }, 'han');
  return ds.sort((a, b) => soNgayGiua(b.ngay, a.ngay));
}

/** "còn 6 ngày" · "ngày mai" · "hôm nay" · "đã qua". */
export function conLai(han: string, hom: string): string {
  const n = soNgayGiua(hom, han);
  if (n < 0) return 'đã qua';
  if (n === 0) return 'hôm nay';
  if (n === 1) return 'ngày mai';
  return `còn ${n} ngày`;
}

/** Lưới một tháng, mỗi hàng 7 ô từ thứ Hai; ô ngoài tháng là `null`. */
export function luoiThang(nam: number, thang: number): (string | null)[][] {
  const dau = veIso(new Date(Date.UTC(nam, thang - 1, 1)));
  const soNgay = new Date(Date.UTC(nam, thang, 0)).getUTCDate();
  const lechDau = (thuCua(dau) + 6) % 7; // thứ Hai = 0
  const o: (string | null)[] = Array.from({ length: lechDau }, () => null);
  for (let i = 0; i < soNgay; i++) o.push(congNgay(dau, i));
  while (o.length % 7 !== 0) o.push(null);
  const hang: (string | null)[][] = [];
  for (let i = 0; i < o.length; i += 7) hang.push(o.slice(i, i + 7));
  return hang;
}
