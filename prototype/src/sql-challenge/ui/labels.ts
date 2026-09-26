/**
 * Nhãn hiển thị của màn thử thách (chữ giao diện, không phải lời thoại). Mọi tra cứu theo định danh
 * đều có nhánh dự phòng — không bao giờ in định danh thô ra màn hình.
 */
import type { TableName } from '../schema';
import type { ConditionOp, Connector } from '../types';

/** Nhãn tiếng Việt của phép so sánh (QĐ-016) + dạng SQL nhỏ hiện bên cạnh. */
export const OP_LABELS: Record<ConditionOp, { label: string; sql: string }> = {
  eq: { label: 'bằng', sql: '=' },
  startsWith: { label: 'bắt đầu bằng', sql: "LIKE 'x%'" },
  endsWith: { label: 'kết thúc bằng', sql: "LIKE '%x'" },
  contains: { label: 'chứa', sql: "LIKE '%x%'" },
  in: { label: 'thuộc danh sách', sql: 'IN (…)' },
};

/** Nhãn phép nối (QĐ-039): giải thích ngay trên nút chọn. */
export const CONNECTOR_LABELS: Record<Connector, { keyword: string; meaning: string }> = {
  AND: { keyword: 'AND', meaning: 'thỏa đồng thời' },
  OR: { keyword: 'OR', meaning: 'thỏa bất kỳ' },
};

/** Tên đọc được của bảng (kèm tên thật dạng mã ở nơi hiển thị). */
const TABLE_READABLE: Record<TableName, string> = {
  sinh_vien: 'sinh viên',
  lop_sinh_hoat: 'lớp sinh hoạt',
};

/** Danh từ đếm được cho câu "0 dòng — không … nào thỏa …". */
const TABLE_ENTITY: Record<TableName, string> = {
  sinh_vien: 'sinh viên',
  lop_sinh_hoat: 'lớp',
};

function lookup(table: Record<string, string>, key: string | null | undefined, fallback: string): string {
  if (key && Object.prototype.hasOwnProperty.call(table, key)) {
    const v = table[key];
    if (typeof v === 'string') return v;
  }
  return fallback;
}

export function tableReadable(table: string | null | undefined): string {
  return lookup(TABLE_READABLE, table, 'bảng dữ liệu');
}

export function tableEntity(table: string | null | undefined): string | null {
  const v = lookup(TABLE_ENTITY, table, '');
  return v === '' ? null : v;
}

/**
 * Câu số dòng theo LÝ DO (không đổ lỗi cho bộ lọc khi chưa có điều kiện nào).
 * `conditionCount` = số điều kiện lọc của câu đã chạy (null khi không biết, ví dụ SQL gõ tay ngoài trình dựng).
 */
export function rowCountText(rowCount: number, table: string | null, conditionCount: number | null): string {
  if (rowCount > 0) return `${rowCount} dòng`;
  const entity = tableEntity(table);
  if (conditionCount === 0) return '0 dòng — bảng này chưa có dữ liệu nào';
  const what = conditionCount === 1 ? 'điều kiện lọc' : 'các điều kiện lọc';
  return entity ? `0 dòng — không ${entity} nào thỏa ${what}` : `0 dòng — không có dòng nào thỏa ${what}`;
}
