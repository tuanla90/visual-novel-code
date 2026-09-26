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
import type { ChallengeContent, CommonDiagnosticLines, Diagnostic, DiagnosticResponse } from '../types';

export interface PickedDiagnostic {
  /** Mã đã chọn để hiển thị — cũng là `primaryCode` ghi vào telemetry `query_run`. */
  code: DiagnosticCode;
  /** Lời tương ứng; `null` khi nội dung chưa có lời cho mã đó (UI hiện lời dự phòng, không hiện mã thô). */
  response: DiagnosticResponse | null;
}

/**
 * Chọn MỘT mã để hiện lời, theo "Quy ước thẻ thử thách": mã blocking (theo thứ tự
 * BLOCKING_DIAGNOSTIC_CODES) → mã có trong `challengeLines` theo thứ tự khóa của thẻ → mã có trong
 * `commonLines` theo thứ tự khóa → `other`. Thứ tự khóa của hai bảng lời CHÍNH LÀ thứ tự ưu tiên,
 * nên gói noi-dung phải liệt kê đúng thứ tự trong kịch bản.
 *
 * Trả `null` khi không có mã nào (chạy đúng, không mẹo → UI hiện lời `[KHI ĐÚNG]`).
 * Hàm thuần, không phụ thuộc thử thách nào — gói UI dùng để hiện lời và ghi telemetry đúng mã đã hiện.
 */
export function pickDiagnostic(
  codes: readonly DiagnosticCode[],
  challengeLines: ChallengeContent['diagnosticLines'],
  commonLines: CommonDiagnosticLines,
): PickedDiagnostic | null {
  if (codes.length === 0) return null;
  const has = (code: string): code is DiagnosticCode => (codes as readonly string[]).includes(code);
  const responseFor = (code: DiagnosticCode): DiagnosticResponse | null => challengeLines[code] ?? commonLines[code] ?? null;

  const blocking = BLOCKING_DIAGNOSTIC_CODES.find(has);
  if (blocking) return { code: blocking, response: responseFor(blocking) };

  for (const key of Object.keys(challengeLines)) {
    if (key !== 'other' && has(key) && challengeLines[key]) return { code: key, response: challengeLines[key] ?? null };
  }
  for (const key of Object.keys(commonLines)) {
    if (key !== 'other' && has(key) && commonLines[key]) return { code: key, response: commonLines[key] ?? null };
  }
  return { code: 'other', response: responseFor('other') };
}

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
