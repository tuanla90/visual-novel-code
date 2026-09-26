/**
 * Chẩn đoán (QĐ-040) — phần dựa trên KẾT QUẢ: so tập kết quả với đáp án (cả bảng → no-filter; đúng
 * dòng nhưng thiếu cột → missing-columns; đúng nhưng có cột thừa → extra-columns; đạt dataset chính
 * mà trượt dataset ẩn → hardcoded-ids khi không có mã cụ thể hơn). Phần dựa trên CẤU TRÚC (model /
 * sqlToModel / phân tích văn bản) và hàm chọn lời theo ưu tiên nằm ở cùng tệp, được nối ở commit sau.
 */
import type { DiagnosticCode } from '../../shared/ids';
import type { Diagnostic, RunFailure } from '../types';
import type { CompareResult } from './compare';

/** Mã cho một lần chạy thất bại ở SQLite / bước kiểm câu (luôn blocking). */
export function codeForRunFailure(failure: RunFailure): DiagnosticCode {
  switch (failure.kind) {
    case 'not_select':
      return 'not-select';
    case 'no_table':
      return 'no-table';
    case 'syntax':
    case 'no_column':
    case 'other':
      return 'syntax-error';
  }
}

export interface ResultDiagnosisInput {
  compare: CompareResult;
  playerRowCount: number;
  /** Số dòng của cả bảng đúng của thử thách trên dataset chính. */
  tableRowCount: number;
  /** Cấu trúc điều kiện của người chơi tương đương SQL chuẩn (biết nhờ model/phân tích) — có thể không biết. */
  conditionsEquivalent: boolean | null;
}

/** Mã rút ra từ tập kết quả của một lần chạy CHƯA ĐÚNG trên dataset chính. */
export function diagnoseFromResult(input: ResultDiagnosisInput): Diagnostic[] {
  const { compare, playerRowCount, tableRowCount, conditionsEquivalent } = input;
  const out: Diagnostic[] = [];
  if (playerRowCount === tableRowCount && tableRowCount > 0) {
    out.push({ code: 'no-filter', severity: 'error' });
  }
  if (compare.rowCountMatch && compare.missingRequired.length > 0 && (compare.valueMappedCount > 0 || conditionsEquivalent === true)) {
    out.push({ code: 'missing-columns', severity: 'error', detail: compare.missingRequired.join(', ') });
  }
  return out;
}
