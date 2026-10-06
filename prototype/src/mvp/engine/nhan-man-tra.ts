/**
 * NHÃN MÀN TRA THEO MỨC SQL (gói B17): nấc "Ghép khối, chữ SQL" dùng CÙNG giao diện ghép, chỉ đổi chữ trên các ô thành từ khóa SQL.
 * Một bảng thay chữ áp LÚC HIỆN (nhãn trên màn, và các chữ trên màn được nhắc trong lời gợi ý bậc 2 của bạn đi cùng), KHÔNG sửa tệp
 * lời. Nấc "Tự viết" không có ô ghép: bậc 2 là lời bậc 1 kèm câu SQL chuẩn đã che giá trị (`cheGiaTriSql`).
 */
import type { MucSqlMvp } from './trang-thai';

/** Chữ trên các ô của màn ghép → từ khóa SQL (nấc `ghep-sql`). Khóa là đúng chuỗi màn ghép đang hiện. */
export const NHAN_SQL: Readonly<Record<string, string>> = {
  '1. NGUỒN BẢNG': 'FROM',
  '2. ĐIỀU KIỆN LỌC': 'WHERE',
  '3. CỘT & SẮP XẾP': 'SELECT · ORDER BY',
  '3. SẮP XẾP': 'ORDER BY',
  'LẤY CỘT': 'SELECT',
  'XẾP THEO': 'ORDER BY',
  'NỐI VỚI': 'JOIN',
  THEO: 'ON',
  LỌC: 'WHERE',
  bằng: '=',
  'bắt đầu bằng': "LIKE 'x%'",
  'là một trong': 'IN',
  'một trong': 'IN',
  VÀ: 'AND',
  HOẶC: 'OR',
  CHẠY: 'RUN',
  'ĐANG CHẠY': 'RUNNING',
  'tăng dần': 'ASC',
  'giảm dần': 'DESC',
};

/** Hàm đổi nhãn cho một mức: `ghep` và `tu-viet` giữ nguyên chữ, `ghep-sql` tra bảng (không có trong bảng thì giữ). */
export function nhanManTra(muc: MucSqlMvp | undefined): (chu: string) => string {
  if (muc !== 'ghep-sql') return (chu) => chu;
  return (chu) => NHAN_SQL[chu] ?? chu;
}

/**
 * Các chữ trên màn xuất hiện trong lời gợi ý bậc 2 (vd 'Ở hàng LẤY CỘT, bấm…', 'bấm chữ "bằng" cho nó thành "bắt đầu bằng"',
 * 'để chữ nối là VÀ rồi bấm CHẠY'): chữ viết hoa thay thẳng; chữ thường chỉ thay khi nằm trong ngoặc kép (kẻo "bằng" trong câu
 * thường cũng bị đổi). Thứ tự: cụm dài trước.
 */
const CHU_HOA = ['NGUỒN BẢNG', 'ĐIỀU KIỆN LỌC', 'LẤY CỘT', 'XẾP THEO', 'NỐI VỚI', 'HOẶC', 'CHẠY', 'VÀ'] as const;
const CHU_HOA_SANG: Readonly<Record<(typeof CHU_HOA)[number], string>> = {
  'NGUỒN BẢNG': 'FROM',
  'ĐIỀU KIỆN LỌC': 'WHERE',
  'LẤY CỘT': 'SELECT',
  'XẾP THEO': 'ORDER BY',
  'NỐI VỚI': 'JOIN',
  HOẶC: 'OR',
  CHẠY: 'RUN',
  VÀ: 'AND',
};
const TRONG_NGOAC = ['bắt đầu bằng', 'là một trong', 'bằng', 'tăng dần', 'giảm dần'] as const;

export function thayChuGoiY(muc: MucSqlMvp | undefined, loi: string): string {
  if (muc !== 'ghep-sql') return loi;
  let ra = loi;
  for (const c of CHU_HOA) ra = ra.split(c).join(CHU_HOA_SANG[c]);
  for (const c of TRONG_NGOAC) ra = ra.split(`"${c}"`).join(`"${NHAN_SQL[c] ?? c}"`);
  return ra;
}

/**
 * Câu SQL chuẩn che giá trị cho nấc "Tự viết": chuỗi trong nháy đơn thành `'…'`, số sau phép so sánh thành `…`; từ khóa, tên bảng,
 * tên cột giữ nguyên để câu còn đúng cấu trúc. Bỏ `;` cuối, gộp khoảng trắng.
 */
export function cheGiaTriSql(sql: string): string {
  return sql
    .replace(/'(?:[^']|'')*'/g, "'…'")
    .replace(/([=<>]=?|\bIN\s*\()\s*(-?\d+(?:\.\d+)?)/gi, (_m, phep: string) => `${phep} …`)
    .replace(/\s+/g, ' ')
    .replace(/;\s*$/, '')
    .trim();
}
