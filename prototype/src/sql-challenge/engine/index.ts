/**
 * Điểm vào engine SQL (gói sql-engine, gói 3). Chữ ký bốn hàm dưới đây là hợp đồng cố định
 * (docs/ARCHITECTURE.md §2.4); các hàm phụ khác được thêm cho gói trinh-dung-ui / noi-dung.
 *
 * Đã có sẵn: loader sql.js (./sqljs.ts).
 */
import type { ChallengeSpec, GradeResult, QueryModel } from '../types';

export class NotImplementedError extends Error {
  override readonly name = 'NotImplementedError';
  constructor(what: string) {
    super(`${what}: chưa hiện thực — gói sql-engine`);
  }
}

export type { DatasetKind } from '../data/types';

/** Chạy một câu SQL (chỉ SELECT / WITH … SELECT — QĐ-006) trên dataset chính hoặc ẩn. */
export { runQuery } from './run';

/** Chấm một lần chạy theo QĐ-019/QĐ-040 (chạy dataset chính, và dataset ẩn nếu spec yêu cầu). */
export function gradeChallenge(_spec: ChallengeSpec, _sql: string, _model: QueryModel | null): Promise<GradeResult> {
  return Promise.reject(new NotImplementedError('gradeChallenge'));
}

/** Sinh SQL từ model trình dựng (connector null với ≥ 2 điều kiện → SQL không hợp lệ để chạy; UI chặn trước). */
export function modelToSql(_model: QueryModel): string {
  throw new NotImplementedError('modelToSql');
}

/** Phân tích ngược SQL người chơi gõ về model; `null` nếu không phân tích được (QĐ-016). */
export function sqlToModel(_sql: string): QueryModel | null {
  throw new NotImplementedError('sqlToModel');
}
