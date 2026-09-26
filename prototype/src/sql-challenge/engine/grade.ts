/**
 * gradeChallenge (QĐ-018/QĐ-019/QĐ-040): chạy SQL của người chơi trên dataset chính, so tập kết quả
 * với SQL chuẩn; nếu đúng và spec yêu cầu thì chạy thêm dataset ẩn; gom mã chẩn đoán (cấu trúc +
 * kết quả) và sắp theo thứ tự ưu tiên của thẻ.
 *
 * Trạng thái:
 * - `error`: không chạy được (model chưa hợp lệ, câu không phải SELECT, lỗi SQLite). Diagnostics thường
 *   là mã blocking; riêng lỗi "no such column" khi FROM sai bảng cho `wrong-table` (không blocking) vì
 *   đó là lời cần hiện.
 * - `incorrect`: chạy được nhưng chưa đúng, kể cả đạt dataset chính mà trượt dataset ẩn (khi đó nếu
 *   cấu trúc không cho mã cụ thể hơn thì `hardcoded-ids`).
 * - `correct`: đúng trên dataset chính (và ẩn nếu có); có thể kèm mẹo `extra-columns`.
 *
 * `primaryCode` = phần tử đầu của `diagnostics` đã sắp theo ưu tiên mặc định của engine (bảng thứ tự
 * trong data/challenges.ts, chép từ kịch bản). Khi có nội dung thật, gói UI gọi `pickDiagnostic(codes,
 * content.diagnosticLines, commonDiagnosticLines)` để lấy mã hiển thị + lời; hai kết quả trùng nhau khi
 * nội dung liệt kê mã đúng thứ tự kịch bản.
 */
import type { DiagnosticCode } from '../../shared/ids';
import type { ChallengeSpec, Diagnostic, GradeResult, QueryModel, RunFailure, RunResult } from '../types';
import { compareResults } from './compare';
import { analyzeStructure, conditionsEquivalent, diagnoseFromResult, diagnoseRunFailure, diagnoseStructure, referenceStructure } from './diagnose';
import { validateModel } from './model-sql';
import { orderDiagnostics } from './priority';
import { getReferenceResult, getTableRowCount } from './reference';
import { runQuery } from './run';

function dedupe(diagnostics: Diagnostic[]): Diagnostic[] {
  const seen = new Set<DiagnosticCode>();
  return diagnostics.filter((d) => (seen.has(d.code) ? false : (seen.add(d.code), true)));
}

/** Sắp theo ưu tiên; lần chạy chưa đúng mà không có mã nào → `other` (không đoán mã cụ thể). */
function finish(spec: ChallengeSpec, status: GradeResult['status'], diagnostics: Diagnostic[], run: RunResult, hidden: GradeResult['hidden'], extraColumns: boolean): GradeResult {
  const ordered = orderDiagnostics(spec.id, dedupe(diagnostics));
  if (status === 'incorrect' && ordered.length === 0) ordered.push({ code: 'other', severity: 'error' });
  return { status, diagnostics: ordered, primaryCode: ordered[0]?.code ?? null, extraColumns, hidden, run };
}

const NOT_RUN: GradeResult['hidden'] = { ran: false, passed: null };

export async function gradeChallenge(spec: ChallengeSpec, sql: string, model: QueryModel | null): Promise<GradeResult> {
  // 0. Model trình dựng chưa hợp lệ → không chạy (UI đã chặn; đây là lưới an toàn).
  if (model) {
    const blocking = validateModel(model);
    if (blocking.length > 0) {
      const run: RunFailure = { ok: false, kind: 'other', message: `Model chưa chạy được: ${blocking.map((d) => d.code).join(', ')}` };
      return finish(spec, 'error', blocking, run, NOT_RUN, false);
    }
  }

  const structure = analyzeStructure(sql, model);
  const reference = referenceStructure(spec);

  // 1. Chạy trên dataset chính.
  const run = await runQuery(sql, 'main');
  if (!run.ok) {
    return finish(spec, 'error', diagnoseRunFailure(spec, run, structure), run, NOT_RUN, false);
  }

  // 2. So với đáp án chính.
  const referenceRun = await getReferenceResult(spec, 'main');
  const compare = compareResults(run, referenceRun, spec.requiredColumns, spec.encouragedColumns);

  if (!compare.matches) {
    const tableRowCount = await getTableRowCount(spec.table, 'main');
    const diagnostics = [
      ...diagnoseStructure(spec, structure, reference),
      ...diagnoseFromResult({ compare, playerRowCount: run.rowCount, tableRowCount, conditionsEquivalent: conditionsEquivalent(structure, reference) }),
    ];
    return finish(spec, 'incorrect', diagnostics, run, NOT_RUN, false);
  }

  // 3. Đúng dataset chính → dataset ẩn (QĐ-015).
  let hidden: GradeResult['hidden'] = NOT_RUN;
  if (spec.runHiddenDataset) {
    const hiddenRun = await runQuery(sql, 'hidden');
    let passed = false;
    if (hiddenRun.ok) {
      const hiddenReference = await getReferenceResult(spec, 'hidden');
      passed = compareResults(hiddenRun, hiddenReference, spec.requiredColumns, spec.encouragedColumns).matches;
    }
    hidden = { ran: true, passed };
    if (!passed) {
      const structural = diagnoseStructure(spec, structure, reference).filter((d) => d.code !== 'no-filter');
      const diagnostics = structural.length > 0 ? structural : [{ code: 'hardcoded-ids', severity: 'error', detail: 'đạt dataset chính, trượt dataset ẩn' } satisfies Diagnostic];
      return finish(spec, 'incorrect', diagnostics, run, hidden, false);
    }
  }

  // 4. Đúng; cột thừa chỉ là mẹo.
  const extraColumns = compare.extraColumnIndexes.length > 0;
  const tips: Diagnostic[] = extraColumns
    ? [{ code: 'extra-columns', severity: 'tip', detail: compare.extraColumnIndexes.map((i) => run.columns[i] ?? '').join(', ') }]
    : [];
  return finish(spec, 'correct', tips, run, hidden, extraColumns);
}
