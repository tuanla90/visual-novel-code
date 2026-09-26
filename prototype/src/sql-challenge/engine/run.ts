/**
 * Chạy một câu SQL chỉ-đọc trên dataset chính hoặc ẩn (QĐ-006).
 *
 * Hai lớp bảo vệ: (1) checkSingleSelect từ chối mọi thứ không phải MỘT câu SELECT / WITH … SELECT
 * trước khi chạm SQLite; (2) CSDL đã bật `PRAGMA query_only = ON` (database.ts) nên câu ghi lọt
 * qua (1) cũng bị SQLite từ chối.
 *
 * Lấy tên cột bằng prepare + getColumnNames để có tên cột cả khi 0 dòng (`db.exec` trả mảng
 * rỗng khi không có dòng nào, mất tên cột).
 */
import type { DatasetKind } from '../data/types';
import type { RunErrorKind, RunFailure, RunResult, SqlValue } from '../types';
import { getDatabase } from './database';
import { checkSingleSelect } from './sql-text';

const NOT_SELECT_MESSAGES = {
  empty: 'Chưa có câu SQL nào để chạy.',
  multiple: 'Chỉ chạy được một câu SQL mỗi lần.',
  not_select: 'Chỉ chấp nhận một câu SELECT (hoặc WITH … SELECT).',
} as const;

/** Phân loại thông điệp lỗi của SQLite thành RunErrorKind. */
export function classifySqliteError(message: string): RunErrorKind {
  const m = message.toLowerCase();
  if (m.includes('no such table')) return 'no_table';
  if (m.includes('no such column')) return 'no_column';
  if (m.includes('syntax error') || m.includes('incomplete input') || m.includes('unrecognized token')) return 'syntax';
  return 'other';
}

function toSqlValue(v: unknown): SqlValue {
  if (v === null || v === undefined) return null;
  if (typeof v === 'number' || typeof v === 'string') return v;
  if (typeof v === 'bigint') return Number(v);
  if (v instanceof Uint8Array) return Array.from(v, (b) => b.toString(16).padStart(2, '0')).join('');
  return String(v);
}

/** Chạy SQL trên CSDL của `dataset`; không bao giờ ném — mọi lỗi thành RunFailure. */
export async function runQuery(sql: string, dataset: DatasetKind = 'main'): Promise<RunResult> {
  const check = checkSingleSelect(sql);
  if (!check.ok) {
    const failure: RunFailure = { ok: false, kind: 'not_select', message: NOT_SELECT_MESSAGES[check.reason] };
    return failure;
  }
  let db;
  try {
    db = await getDatabase(dataset);
  } catch (err) {
    return { ok: false, kind: 'other', message: `Không nạp được SQLite: ${errorMessage(err)}` };
  }
  let stmt;
  try {
    stmt = db.prepare(check.sql);
  } catch (err) {
    const message = errorMessage(err);
    return { ok: false, kind: classifySqliteError(message), message };
  }
  try {
    const columns = stmt.getColumnNames();
    const rows: SqlValue[][] = [];
    while (stmt.step()) {
      rows.push(stmt.get().map(toSqlValue));
    }
    return { ok: true, columns, rows, rowCount: rows.length };
  } catch (err) {
    const message = errorMessage(err);
    return { ok: false, kind: classifySqliteError(message), message };
  } finally {
    stmt.free();
  }
}

function errorMessage(err: unknown): string {
  return err instanceof Error ? err.message : String(err);
}
