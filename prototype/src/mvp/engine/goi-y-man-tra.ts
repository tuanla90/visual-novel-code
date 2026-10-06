/**
 * GỢI Ý HAI BẬC CỦA BẠN ĐI CÙNG Ở MÀN TRA (gói B14, docs/mua-1/brief/b14-man-tra.md mục A). Theo mẫu buổi hỏi nhân chứng
 * (`hoi-dap.ts` hàm `goiY`): người chơi bấm vào bạn đi cùng, hoặc chạy trượt hai lần liền, thì bạn nói bậc 1 (điều còn thiếu
 * về mặt điều tra); xin lần nữa thì bậc 2 (nói thẳng thao tác, bằng chữ trên màn hình). Lời viết sẵn theo từng thẻ thử thách
 * (`TheThuThachMvp.goiY`, dòng "- Gợi ý[ khi …]: <bậc 1> <br> <bậc 2>" trong `loi/tt-*.md`), không gọi mạng.
 *
 * Thẻ có nhiều gợi ý thì chọn theo LẦN CHẠY GẦN NHẤT, cùng luật với lời "Khi …" (`sql-mvp.ts` `phanUngSauKhiChay`): thừa cột →
 * đúng (đúng mà hẹp hơn trước, gói B15) → lỗi → sai thứ tự → thiếu cột → "chạy ra n dòng với <cột>" → "chạy ra n dòng"; không dòng nào khớp (hay chưa chạy lần
 * nào) thì dùng gợi ý chung. Đã tra đúng mà thẻ không có "Gợi ý khi đúng" thì không còn gì để gợi ý.
 */
import type { GoiYTheMvp, KhiChayMvp, LoiMvp, TheThuThachMvp } from '../../content/mvp/types';
import type { KetQuaCham } from './sql-mvp';

/** Một lần chạy ở màn tra, đủ để biết gợi ý nào hợp. */
export interface LanChayManTra {
  kq: KetQuaCham;
  /** Các cột của những điều kiện đã điền giá trị. */
  cotDung: readonly string[];
  /** Bài chọn cột: đủ dòng, đủ cột cần nhưng lấy thừa cột. */
  thuaCot: boolean;
}

/** Số lần chạy trượt liền nhau thì bạn đi cùng tự lên tiếng (như `TRUOT_GOI_Y` của buổi hỏi). */
export const TRUOT_GOI_Y_MAN_TRA = 2;

/** Điều kiện của một gợi ý có khớp lần chạy không; kèm độ ưu tiên (số lớn thắng). */
function doKhop(khi: KhiChayMvp, lan: LanChayManTra): number {
  const { kq } = lan;
  if (lan.thuaCot) return khi.kind === 'thua-cot' ? 9 : 0;
  // Gói B15: đúng bằng câu hẹp hơn → gợi ý "khi đúng mà hẹp hơn" thắng gợi ý "khi đúng" (thẻ không có thì vẫn dùng "khi đúng").
  if (kq.trangThai === 'dung') return khi.kind === 'dung-hep' ? (kq.so.hepDu ? 9 : 0) : khi.kind === 'dung' ? 8 : 0;
  if (kq.trangThai === 'loi') {
    if (khi.kind === 'loi-cot') return kq.chay.loai === 'khong-co-cot' ? 7 : 0;
    return khi.kind === 'loi' ? 6 : 0;
  }
  if (khi.kind === 'sai-thu-tu') return kq.so.saiThuTu ? 5 : 0;
  const n = kq.so.soDongNguoiChoi;
  if (khi.kind === 'thieu-cot') return n === kq.so.soDongChuan && kq.so.cotThieu.length > 0 ? 4 : 0;
  if (khi.kind !== 'so-dong' || khi.n !== n) return 0;
  if (!khi.cot) return 2;
  const tap = [...new Set(lan.cotDung)].sort().join(',');
  return [...khi.cot].sort().join(',') === tap ? 3 : 0;
}

export interface GoiYDuocChon {
  /** Khóa đếm bậc của gợi ý này trong màn ("chung" hoặc điều kiện của nó). */
  khoa: string;
  goiY: GoiYTheMvp;
}

/** Gợi ý hợp với lần chạy gần nhất (`null` = chưa chạy); không có gì để gợi ý thì `null`. */
export function chonGoiY(the: Pick<TheThuThachMvp, 'goiY'>, lan: LanChayManTra | null): GoiYDuocChon | null {
  const ds = the.goiY ?? [];
  if (ds.length === 0) return null;
  let hon: { diem: number; g: GoiYTheMvp } | null = null;
  if (lan) {
    for (const g of ds) {
      if (!g.khi) continue;
      const diem = doKhop(g.khi, lan);
      if (diem > 0 && (!hon || diem > hon.diem)) hon = { diem, g };
    }
  }
  if (hon) return { khoa: JSON.stringify(hon.g.khi), goiY: hon.g };
  // Tra đúng rồi thì gợi ý chung (cách dựng câu) không còn ích gì.
  if (lan && lan.kq.trangThai === 'dung' && !lan.thuaCot) return null;
  const chung = ds.find((g) => !g.khi);
  return chung ? { khoa: 'chung', goiY: chung } : null;
}

/** Bóng thoại của bạn đi cùng ở màn tra. `bac` 2 = đã nói thẳng thao tác, không còn bậc nào nữa. */
export interface BongManTra {
  ai: string;
  loi: string;
  bac: 1 | 2;
}

/**
 * Xin gợi ý một lần: trả bóng thoại và bảng đếm bậc mới. Mỗi gợi ý (theo `khoa`) đi bậc 1 rồi bậc 2, xin nữa vẫn là bậc 2.
 * Không có gợi ý hợp → `null`.
 */
export function xinGoiY(the: Pick<TheThuThachMvp, 'goiY'>, lan: LanChayManTra | null, bac: Readonly<Record<string, number>>): { bong: BongManTra; bac: Record<string, number> } | null {
  const chon = chonGoiY(the, lan);
  if (!chon) return null;
  const moi = Math.min(2, (bac[chon.khoa] ?? 0) + 1) as 1 | 2;
  const l: LoiMvp = moi === 1 ? chon.goiY.bac1 : chon.goiY.bac2;
  return { bong: { ai: l.speaker, loi: l.text, bac: moi }, bac: { ...bac, [chon.khoa]: moi } };
}

/** Những người gợi ý của thẻ (ảnh mặt ở góc phải màn tra), theo thứ tự xuất hiện. */
export function nguoiGoiY(the: Pick<TheThuThachMvp, 'goiY'>): string[] {
  return [...new Set((the.goiY ?? []).flatMap((g) => [g.bac1.speaker, g.bac2.speaker]))];
}
