/**
 * LỊCH NHÂN VẬT THEO THỨ VÀ GIỜ (user chốt 02/10/2026): mỗi nhân vật khai "Thường ở" trong nhan-vat.md; bản đồ khai giờ trong
 * truyện; thứ lấy từ ngày trong truyện. Ảnh mặt trên ghim = người lịch đặt ở đó lúc ấy, cộng người kịch bản đặt bằng `có:`.
 */
import type { NhanVatMvp } from '../../content/mvp/types';

/** Nhân vật đang ở ghim `noi` vào thứ `thu` (0 = Chủ nhật), lúc `gio` ("HH:MM"), theo lịch "Thường ở". */
export function dangO(nhanVat: readonly NhanVatMvp[], thu: number, gio: string, noi: string): string[] {
  return nhanVat.filter((n) => (n.gioiThieu?.thuongO ?? []).some((q) => q.noi === noi && q.thu.includes(thu) && q.tu <= gio && gio < q.den)).map((n) => n.id);
}

/** Lúc ấy lịch đặt nhân vật ở ghim nào; `null` = lịch không nói (đang ở chỗ không có trên bản đồ). */
export function noiTheoLich(nv: NhanVatMvp | undefined, thu: number, gio: string): string | null {
  return (nv?.gioiThieu?.thuongO ?? []).find((q) => q.thu.includes(thu) && q.tu <= gio && gio < q.den)?.noi ?? null;
}
