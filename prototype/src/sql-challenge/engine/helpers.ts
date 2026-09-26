/**
 * Hàm phụ cho giao diện trình dựng (QĐ-016/QĐ-017/QĐ-021):
 * - distinctValues: các giá trị khác nhau của một cột (ô chọn giá trị cho `=` / `IN`), sắp theo tiếng Việt;
 * - previewRows: 5 dòng đầu của một bảng (nút "Xem 5 dòng đầu").
 * Chỉ đọc dataset chính trừ khi nói rõ; cột/bảng phải thuộc schema (lỗi lập trình → ném).
 */
import type { DatasetKind } from '../data/types';
import { isColumnOf, isTableName, type ColumnName, type TableName } from '../schema';
import type { RunSuccess } from '../types';
import { runQuery } from './run';

const collator = new Intl.Collator('vi', { sensitivity: 'base', numeric: true });

/** So sánh chuỗi theo tiếng Việt (dùng chung cho ô chọn giá trị). */
export function compareVietnamese(a: string, b: string): number {
  return collator.compare(a, b) || a.localeCompare(b, 'vi');
}

function assertColumn(table: TableName, column: string): asserts column is ColumnName {
  if (!isTableName(table)) throw new Error(`Bảng không có trong schema: ${table}`);
  if (!isColumnOf(table, column)) throw new Error(`Cột ${column} không thuộc bảng ${table}`);
}

/** Giá trị khác nhau của `column` trong `table`, dạng chuỗi, đã sắp theo tiếng Việt (số theo giá trị số). */
export async function distinctValues(table: TableName, column: ColumnName, dataset: DatasetKind = 'main'): Promise<string[]> {
  assertColumn(table, column);
  const res = await runQuery(`SELECT DISTINCT ${column} FROM ${table}`, dataset);
  if (!res.ok) throw new Error(`Không đọc được giá trị của ${table}.${column}: ${res.message}`);
  return res.rows
    .map((row) => row[0])
    .filter((v): v is string | number => v !== null)
    .map(String)
    .sort(compareVietnamese);
}

/** `limit` dòng đầu của bảng (thứ tự nạp), đủ tên cột — cho nút "Xem 5 dòng đầu". */
export async function previewRows(table: TableName, limit = 5, dataset: DatasetKind = 'main'): Promise<RunSuccess> {
  if (!isTableName(table)) throw new Error(`Bảng không có trong schema: ${String(table)}`);
  const n = Math.max(0, Math.floor(limit));
  const res = await runQuery(`SELECT * FROM ${table} LIMIT ${n}`, dataset);
  if (!res.ok) throw new Error(`Không đọc được ${table}: ${res.message}`);
  return res;
}
