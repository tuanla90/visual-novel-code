/**
 * Thứ tự ưu tiên mã chẩn đoán ("Quy ước thẻ thử thách"): blocking → mã trong thẻ của thử thách theo thứ
 * tự liệt kê → mã ở "Nhận xét chung" theo thứ tự liệt kê → `other`.
 *
 * Hai mặt của cùng một quy tắc:
 * - orderDiagnostics: engine sắp `GradeResult.diagnostics` theo bảng thứ tự trong data/challenges.ts
 *   (không cần nội dung) → `primaryCode` = phần tử đầu.
 * - pickDiagnostic (commit sau): gói UI đưa danh sách mã + lời của thẻ + lời chung, nhận `{ code, response }`
 *   để hiện lời và ghi telemetry đúng mã đã hiện.
 */
import { BLOCKING_DIAGNOSTIC_CODES, DIAGNOSTIC_CODES, type ChallengeId, type DiagnosticCode } from '../../shared/ids';
import { CHALLENGE_DIAGNOSTIC_ORDER, COMMON_DIAGNOSTIC_ORDER } from '../data/challenges';
import type { Diagnostic } from '../types';

function rank(order: readonly DiagnosticCode[], code: DiagnosticCode): number {
  const i = order.indexOf(code);
  return i === -1 ? Number.POSITIVE_INFINITY : i;
}

/** Khóa sắp xếp: nhóm (0 blocking · 1 thẻ · 2 chung · 3 khác · 4 other) rồi vị trí trong nhóm. */
export function priorityKey(challengeId: ChallengeId, code: DiagnosticCode): [number, number] {
  if ((BLOCKING_DIAGNOSTIC_CODES as readonly string[]).includes(code)) return [0, rank(BLOCKING_DIAGNOSTIC_CODES, code)];
  if (code === 'other') return [4, 0];
  const card = CHALLENGE_DIAGNOSTIC_ORDER[challengeId];
  if (card.includes(code)) return [1, rank(card, code)];
  if (COMMON_DIAGNOSTIC_ORDER.includes(code)) return [2, rank(COMMON_DIAGNOSTIC_ORDER, code)];
  return [3, rank(DIAGNOSTIC_CODES, code)];
}

/** Sắp ổn định theo priorityKey. */
export function orderDiagnostics(challengeId: ChallengeId, diagnostics: Diagnostic[]): Diagnostic[] {
  return diagnostics
    .map((d, i) => ({ d, i, k: priorityKey(challengeId, d.code) }))
    .sort((a, b) => a.k[0] - b.k[0] || a.k[1] - b.k[1] || a.i - b.i)
    .map((x) => x.d);
}
