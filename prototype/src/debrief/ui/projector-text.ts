/**
 * Chữ giao diện của màn chiếu (không phải lời thoại). Câu báo lỗi nói theo LÝ DO thật của lần chạy;
 * không bao giờ in thông điệp gốc của SQLite hay định danh thô ra màn hình.
 */
import type { RunErrorKind } from '../../sql-challenge/types';

export const RUN_FAILURE_TEXT: Record<RunErrorKind, string> = {
  not_select: 'Câu trên màn chiếu không phải một câu SELECT nên không được chạy.',
  syntax: 'Máy chưa đọc được câu này (sai cú pháp) nên chưa có bảng kết quả.',
  no_table: 'Câu này lấy dữ liệu từ một bảng không có trong dữ liệu nên chưa có bảng kết quả.',
  no_column: 'Câu này dùng một cột không có trong bảng nên chưa có bảng kết quả.',
  other: 'Bộ chạy SQL gặp lỗi khi chạy câu này nên chưa có bảng kết quả. Tải lại trang rồi thử lại.',
};

/** Nguồn là vật chứng nhưng Hồ sơ chưa lưu vật chứng đó. */
export const MISSING_EVIDENCE_TEXT = 'Hồ sơ chưa có truy vấn này nên màn chiếu chưa có gì để chiếu.';

/** Nguồn có nhưng câu SQL rỗng. */
export const EMPTY_SQL_TEXT = 'Màn chiếu chưa có câu truy vấn nào để chạy.';

export const RUNNING_TEXT = 'Đang chạy truy vấn trên dữ liệu…';

export function rowCountLabel(rowCount: number): string {
  return `${rowCount} dòng`;
}
