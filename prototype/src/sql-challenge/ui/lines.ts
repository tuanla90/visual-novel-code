/**
 * Chọn lời Hà Vy theo mã chẩn đoán — lấy từ NỘI DUNG (lời riêng của thẻ → lời chung → gợi ý chuẩn).
 * Không bao giờ trả mã thô: nội dung thiếu lời thì rơi về lời `other` của nội dung, rồi lời dự phòng.
 */
import type { DiagnosticCode } from '../../shared/ids';
import type { DialogueLine } from '../../story/types';
import { pickDiagnostic, validateModel } from '../engine';
import type { ChallengeContent, CommonDiagnosticLines, DiagnosticResponse, QueryModel, StandardHints } from '../types';
import { isPendingCondition } from './model-edit';

/** Lời dự phòng khi nội dung không có lời cho mã (và cả lời `other`). */
export const FALLBACK_LINE: DialogueLine = {
  speaker: 'ha-vy',
  expression: 'thinking',
  text: 'Kết quả chưa khớp câu hỏi. Đọc lại đề bài rồi so từng điều kiện với manh mối xem.',
};

export interface LineSources {
  content: ChallengeContent;
  common: CommonDiagnosticLines;
  standardHints: StandardHints;
}

function fromResponse(response: DiagnosticResponse | null | undefined, standardHints: StandardHints): DialogueLine | null {
  if (!response) return null;
  if ('line' in response) return response.line;
  return standardHints[response.useStandardHint] ?? null;
}

/** Lời cho một phản hồi đã chọn; `null`/thiếu → lời `other` của nội dung → lời dự phòng. */
export function lineFor(response: DiagnosticResponse | null | undefined, src: LineSources): DialogueLine {
  return (
    fromResponse(response, src.standardHints) ??
    fromResponse(src.content.diagnosticLines.other ?? src.common.other, src.standardHints) ??
    FALLBACK_LINE
  );
}

export interface ShownDiagnostic {
  /** Mã đã chọn để hiện (cũng là mã ghi vào telemetry). */
  code: DiagnosticCode;
  line: DialogueLine;
}

/** Chọn MỘT mã để hiện theo thứ tự khóa của nội dung (pickDiagnostic) và lời tương ứng. */
export function showDiagnostic(codes: readonly DiagnosticCode[], src: LineSources): ShownDiagnostic | null {
  const picked = pickDiagnostic(codes, src.content.diagnosticLines, src.common);
  if (!picked) return null;
  return { code: picked.code, line: lineFor(picked.response, src) };
}

/**
 * Lý do model trình dựng CHƯA chạy được (mã blocking của validateModel) + lời tương ứng; `null` = chạy được.
 * Điều kiện chưa chọn cột (QĐ-056) luôn tính là `no-value` (không thêm mã mới) — kể cả khi lỡ có giá trị.
 */
export function blockingReason(model: QueryModel, src: LineSources): ShownDiagnostic | null {
  const codes: DiagnosticCode[] = validateModel(model).map((d) => d.code);
  if (model.conditions.some(isPendingCondition) && !codes.includes('no-value')) codes.push('no-value');
  if (codes.length === 0) return null;
  return showDiagnostic(codes, src);
}
