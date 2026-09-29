/**
 * PHẢN ỨNG SAU MỖI LẦN CHẠY ở phòng máy (bộ MVP, QĐ-092) — dòng "Khi …" trong thẻ thử thách, để phiên truyện viết lời
 * Hà Vy / Tùng theo kết quả mà không đụng code. Lời chỉ MÔ TẢ kết quả (QĐ-071), không phán đúng sai.
 *
 *   - Khi chạy ra 0 dòng: **ha-vy** (thinking): Cột khóa đang lưu số 2024.
 *   - Khi chạy ra 5 dòng: **tung** (worried): Ơ, năm lớp? <br> **ha-vy** (neutral): Lớp nào thỏa một trong hai là lấy.
 *   - Khi lỗi không có cột: **ha-vy** (thinking): Máy đang đi tìm một cột tên B.
 *   - Khi lỗi: …            (mọi lỗi khác)
 *   - Khi đúng: …           (kết quả khớp, trước nút lưu / đi tiếp)
 * Nhiều lời một lúc: nối bằng `<br>`. Không import gì từ `src/`.
 */
import { parseSpoken, type RawLine } from './doc.ts';

export type KhiChay = { kind: 'so-dong'; n: number } | { kind: 'loi-cot' } | { kind: 'loi' } | { kind: 'dung' };

export interface RawPhanUng {
  khi: KhiChay;
  loi: RawLine[];
}

/** Đọc các dòng "Khi …" trong `fields` của thẻ; trả phản ứng và lỗi (chữ) cho dòng sai quy ước. */
export function docPhanUng(fields: Readonly<Record<string, string>>): { phanUng: RawPhanUng[]; loi: string[] } {
  const phanUng: RawPhanUng[] = [];
  const loi: string[] = [];
  for (const [nhan, gt] of Object.entries(fields)) {
    if (!nhan.startsWith('Khi ')) continue;
    let khi: KhiChay | null = null;
    const m = /^Khi chạy ra (\d+) dòng$/.exec(nhan);
    if (m) khi = { kind: 'so-dong', n: Number(m[1]) };
    else if (nhan === 'Khi lỗi không có cột') khi = { kind: 'loi-cot' };
    else if (nhan === 'Khi lỗi') khi = { kind: 'loi' };
    else if (nhan === 'Khi đúng') khi = { kind: 'dung' };
    if (!khi) {
      loi.push(`dòng "${nhan}" lạ — dùng "Khi chạy ra <n> dòng", "Khi lỗi không có cột", "Khi lỗi", "Khi đúng"`);
      continue;
    }
    try {
      phanUng.push({ khi, loi: gt.split('<br>').map((p) => parseSpoken(p)) });
    } catch (e) {
      loi.push(`dòng "${nhan}": ${(e as Error).message} — viết "**<người nói>** (<biểu cảm>): <lời>"`);
    }
  }
  return { phanUng, loi };
}
