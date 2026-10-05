/**
 * PHẢN ỨNG SAU MỖI LẦN CHẠY ở phòng máy (bộ MVP, QĐ-092) — dòng "Khi …" trong thẻ thử thách, để phiên truyện viết lời
 * Hà Vy / Tùng theo kết quả mà không đụng code. Lời chỉ MÔ TẢ kết quả (QĐ-071), không phán đúng sai.
 *
 *   - Khi chạy ra 0 dòng: **ha-vy** (thinking): Cột khóa đang lưu số 2024.
 *   - Khi chạy ra 5 dòng: **tung** (worried): Ơ, năm lớp? <br> **ha-vy** (neutral): Lớp nào thỏa một trong hai là lấy.
 *   - Khi chạy ra 0 dòng với tai_khoan, ten_tep: …   (chỉ khi các điều kiện đã điền dùng ĐÚNG các cột này; ưu tiên hơn dòng không ghi cột)
 *   - Khi lỗi không có cột: **ha-vy** (thinking): Máy đang đi tìm một cột tên B.
 *   - Khi lỗi: …            (mọi lỗi khác)
 *   - Khi đúng: …           (kết quả khớp, trước nút lưu / đi tiếp)
 *   - Khi sai thứ tự: …     (thẻ có ORDER BY: đủ đúng các dòng nhưng thứ tự khác câu chuẩn)
 * Nhiều lời một lúc: nối bằng `<br>`. Không import gì từ `src/`.
 */
import { parseSpoken, type RawLine } from './doc.ts';

export type KhiChay =
  | { kind: 'so-dong'; n: number; cot?: string[] }
  | { kind: 'loi-cot' }
  | { kind: 'loi' }
  | { kind: 'dung' }
  | { kind: 'sai-thu-tu' }
  | { kind: 'thieu-cot' }
  | { kind: 'thua-cot' }
  | { kind: 'sai-cot-nop' }
  | { kind: 'xem-tung-buoc' };

export interface RawPhanUng {
  khi: KhiChay;
  loi: RawLine[];
}

/** Nhãn "Khi …" → điều kiện; `null` = sai quy ước. */
export function docKhi(nhan: string): KhiChay | null {
  const m = /^Khi chạy ra (\d+) dòng(?: với (.+))?$/.exec(nhan);
  if (m) {
    const cot = (m[2] ?? '').split(',').map((c) => c.trim()).filter((c) => c !== '');
    return cot.length > 0 ? { kind: 'so-dong', n: Number(m[1]), cot } : { kind: 'so-dong', n: Number(m[1]) };
  }
  if (nhan === 'Khi lỗi không có cột') return { kind: 'loi-cot' };
  if (nhan === 'Khi lỗi') return { kind: 'loi' };
  if (nhan === 'Khi đúng') return { kind: 'dung' };
  if (nhan === 'Khi sai thứ tự') return { kind: 'sai-thu-tu' };
  if (nhan === 'Khi thiếu cột') return { kind: 'thieu-cot' };
  if (nhan === 'Khi thừa cột') return { kind: 'thua-cot' };
  if (nhan === 'Khi chọn sai cột nộp') return { kind: 'sai-cot-nop' };
  if (nhan === 'Khi xem từng bước') return { kind: 'xem-tung-buoc' };
  return null;
}

/** Đọc các dòng "Khi …" trong `fields` của thẻ; trả phản ứng và lỗi (chữ) cho dòng sai quy ước. */
export function docPhanUng(fields: Readonly<Record<string, string>>): { phanUng: RawPhanUng[]; loi: string[] } {
  const phanUng: RawPhanUng[] = [];
  const loi: string[] = [];
  for (const [nhan, gt] of Object.entries(fields)) {
    if (!nhan.startsWith('Khi ')) continue;
    const khi = docKhi(nhan);
    if (!khi) {
      loi.push(`dòng "${nhan}" lạ — dùng "Khi chạy ra <n> dòng", "Khi chạy ra <n> dòng với <cột>, <cột>", "Khi lỗi không có cột", "Khi lỗi", "Khi đúng", "Khi sai thứ tự", "Khi thiếu cột", "Khi thừa cột", "Khi chọn sai cột nộp", "Khi xem từng bước"`);
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

/**
 * GỢI Ý HAI BẬC CỦA BẠN ĐI CÙNG Ở MÀN TRA (gói B14, docs/mua-1/brief/b14-man-tra.md mục A). Viết cạnh các dòng "Khi …":
 *
 *   - Gợi ý: **ha-vy** (thinking): <bậc 1: điều còn thiếu về mặt điều tra> <br> **ha-vy** (neutral): <bậc 2: nói thẳng thao tác>
 *   - Gợi ý khi thiếu cột: **duy** (neutral): … <br> **duy** (neutral): …
 *   - Gợi ý khi chạy ra 33 dòng: …          (phần sau "khi" viết y như sau chữ "Khi" của dòng phản ứng)
 *
 * Dòng "Gợi ý" (không điều kiện) là gợi ý chung; dòng "Gợi ý khi …" thay nó khi lần chạy gần nhất khớp điều kiện.
 * Mỗi dòng đúng HAI lời nối bằng `<br>`: bậc 1 rồi bậc 2.
 */
export interface RawGoiY {
  /** `null` = gợi ý chung. */
  khi: KhiChay | null;
  nhan: string;
  bac1: RawLine;
  bac2: RawLine;
}

export function docGoiY(fields: Readonly<Record<string, string>>): { goiY: RawGoiY[]; loi: string[] } {
  const goiY: RawGoiY[] = [];
  const loi: string[] = [];
  for (const [nhan, gt] of Object.entries(fields)) {
    if (nhan !== 'Gợi ý' && !nhan.startsWith('Gợi ý ')) continue;
    let khi: KhiChay | null = null;
    if (nhan !== 'Gợi ý') {
      const m = /^Gợi ý khi (.+)$/.exec(nhan);
      khi = m ? docKhi(`Khi ${m[1] ?? ''}`) : null;
      if (!khi) {
        loi.push(`dòng "${nhan}" lạ — dùng "Gợi ý" hoặc "Gợi ý khi <điều kiện như dòng Khi …>" (vd "Gợi ý khi thiếu cột", "Gợi ý khi chạy ra 33 dòng")`);
        continue;
      }
    }
    const phan = gt.split('<br>');
    if (phan.length !== 2) {
      loi.push(`dòng "${nhan}": cần đúng hai lời nối bằng <br> (bậc 1 rồi bậc 2), đang có ${phan.length}`);
      continue;
    }
    try {
      goiY.push({ khi, nhan, bac1: parseSpoken(phan[0] ?? ''), bac2: parseSpoken(phan[1] ?? '') });
    } catch (e) {
      loi.push(`dòng "${nhan}": ${(e as Error).message} — viết "**<người nói>** (<biểu cảm>): <lời>"`);
    }
  }
  return { goiY, loi };
}
