/**
 * Kết quả chuẩn (SQL chuẩn của spec chạy trên từng dataset) và kích thước bảng — tính một lần, cache.
 */
import type { DatasetKind } from '../data/types';
import type { TableName } from '../schema';
import type { ChallengeSpec, RunSuccess } from '../types';
import { runQuery } from './run';

const referenceCache = new Map<string, Promise<RunSuccess>>();
const tableSizeCache = new Map<string, Promise<number>>();

/** Kết quả của SQL chuẩn trên dataset; ném nếu SQL chuẩn không chạy được (lỗi cấu hình spec, không phải lỗi người chơi). */
export function getReferenceResult(spec: ChallengeSpec, dataset: DatasetKind): Promise<RunSuccess> {
  const key = `${dataset}\u0000${spec.referenceSql}`;
  let pending = referenceCache.get(key);
  if (!pending) {
    pending = runQuery(spec.referenceSql, dataset).then((res) => {
      if (!res.ok) throw new Error(`SQL chuẩn của ${spec.id} không chạy được trên dataset ${dataset}: ${res.message}`);
      return res;
    });
    pending.catch(() => referenceCache.delete(key));
    referenceCache.set(key, pending);
  }
  return pending;
}

/** Số dòng của cả bảng trên dataset (để nhận ra "kết quả = cả bảng" → no-filter). */
export function getTableRowCount(table: TableName, dataset: DatasetKind): Promise<number> {
  const key = `${dataset}\u0000${table}`;
  let pending = tableSizeCache.get(key);
  if (!pending) {
    pending = runQuery(`SELECT COUNT(*) FROM ${table}`, dataset).then((res) => {
      if (!res.ok) throw new Error(`Không đếm được bảng ${table}: ${res.message}`);
      return Number(res.rows[0]?.[0] ?? 0);
    });
    pending.catch(() => tableSizeCache.delete(key));
    tableSizeCache.set(key, pending);
  }
  return pending;
}
