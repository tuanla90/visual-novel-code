/**
 * CHỮ TRÊN MÀN HAI CÂU HỎI ĐẦU VÁN (gói B17): đúng chữ của đề bài docs/mua-1/brief/b17-hai-cau-hoi-dau-van.md (không gạch dài, không
 * mũi tên). Tách khỏi `ChonMucMvp.tsx` để tệp component chỉ xuất component (Fast Refresh).
 */
import type { MucNhapVaiMvp, MucSqlMvp } from '../engine/trang-thai';

export const CAU_HOI_NHAP_VAI = 'Cậu muốn nhập vai thám tử tới mức nào?';
export const CAU_HOI_SQL = 'Cậu muốn tra dữ liệu tới mức nào?';
export const DONG_DOI_SAU = 'Đổi lúc nào cũng được, trong Cài đặt.';
export const NUT_BAT_DAU = 'Bắt đầu';

export interface NacMvp<M extends string> {
  muc: M;
  ten: string;
  moTa: string;
}
export const NAC_NHAP_VAI: readonly NacMvp<MucNhapVaiMvp>[] = [
  { muc: 'dan', ten: 'Có người dẫn', moTa: 'Chỗ cần xem có dấu, kể cả chi tiết nhỏ. Hỏi chuyện thì nhân chứng tự kể, cậu ngồi nghe.' },
  { muc: 'tu-do', ten: 'Tự dò', moTa: 'Trên bản đồ có dấu, vào trong thì không. Hỏi chuyện bằng cách chọn câu hỏi.' },
  { muc: 'that', ten: 'Như thật', moTa: 'Không dấu nào cả. Muốn biết gì phải tự hỏi bằng lời của mình.' },
];
export const NAC_SQL: readonly NacMvp<MucSqlMvp>[] = [
  { muc: 'ghep', ten: 'Ghép khối', moTa: 'Ghép câu tra bằng các ô chữ tiếng Việt. Chưa cần biết gì về SQL.' },
  { muc: 'ghep-sql', ten: 'Ghép khối, chữ SQL', moTa: 'Vẫn ghép ô, nhưng các ô mang đúng từ của SQL: SELECT, WHERE, LIKE…' },
  { muc: 'tu-viet', ten: 'Tự viết', moTa: 'Gõ thẳng câu SQL. Có bảng để xem cột, có bạn đi cùng để hỏi.' },
];
