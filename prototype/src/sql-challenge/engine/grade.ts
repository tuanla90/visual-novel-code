/**
 * gradeChallenge (QĐ-018/QĐ-019/QĐ-040): chạy SQL của người chơi trên dataset chính, so tập kết quả
 * với SQL chuẩn; nếu đúng và spec yêu cầu thì chạy thêm dataset ẩn; gom mã chẩn đoán và sắp theo
 * thứ tự ưu tiên của thẻ.
 *
 * Trạng thái:
 * - `error`: không chạy được (model chưa hợp lệ, câu không phải SELECT, lỗi SQLite) — diagnostics có mã blocking.
 * - `incorrect`: chạy được nhưng chưa đúng (kể cả đạt dataset chính mà trượt dataset ẩn).
 * - `correct`: đúng trên dataset chính (và ẩn nếu có); có thể kèm mẹo `extra-columns`.
 */
import type { DiagnosticCode } from '../../shared/ids';
import type { ChallengeSpec, Diagnostic, GradeResult, QueryModel, RunFailure, RunResult } from '../types';
import { compareResults } from './compare';
import { codeForRunFailure, diagnoseFromResult } from './diagnose';
import { validateModel } from './model-sql';
import { orderDiagnostics } from './priority';
import { getReferenceResult, getTableRowCount } from './reference';
import { runQuery } from './run';

function dedupe(diagnostics: Diagnostic[]): Diagnostic[] {
  const seen = new Set<DiagnosticCode>();
  return diagnostics.filter((d) => (seen.has(d.code) ? false : (seen.add(d.code), true)));
}

function finish(spec: ChallengeSpec, status: GradeResult['status'], diagnostics: Diagnostic[], run: RunResult, hidden: GradeResult['hidden'], extraColumns: boolean): GradeResult {
  const ordered = orderDiagnostics(spec.id, dedupe(diagnostics));
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

  // 1. Chạy trên dataset chính.
  const run = await runQuery(sql, 'main');
  if (!run.ok) {
    return finish(spec, 'error', [{ code: codeForRunFailure(run), severity: 'blocking', detail: run.message }], run, NOT_RUN, false);
  }

  // 2. So với đáp án chính.
  const reference = await getReferenceResult(spec, 'main');
  const compare = compareResults(run, reference, spec.requiredColumns, spec.encouragedColumns);

  if (!compare.matches) {
    const tableRowCount = await getTableRowCount(spec.table, 'main');
    const diagnostics = diagnoseFromResult({ compare, playerRowCount: run.rowCount, tableRowCount, conditionsEquivalent: null });
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
      return finish(spec, 'incorrect', [{ code: 'hardcoded-ids', severity: 'error', detail: 'đạt dataset chính, trượt dataset ẩn' }], run, hidden, false);
    }
  }

  // 4. Đúng; cột thừa chỉ là mẹo.
  const extraColumns = compare.extraColumnIndexes.length > 0;
  const tips: Diagnostic[] = extraColumns
    ? [{ code: 'extra-columns', severity: 'tip', detail: compare.extraColumnIndexes.map((i) => run.columns[i] ?? '').join(', ') }]
    : [];
  return finish(spec, 'correct', tips, run, hidden, extraColumns);
}
