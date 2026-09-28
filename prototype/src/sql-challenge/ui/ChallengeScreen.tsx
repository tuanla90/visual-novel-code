/**
 * Màn thử thách (gói 4 `trinh-dung-ui`) — và màn sửa truy vấn của Quân (`mode: 'fix-query'`), cùng props.
 *
 * Hợp đồng: màn này tự gọi store (openChallenge/updateChallenge/recordRun/useHint/completeChallenge)
 * qua `challengeId`, rồi gọi `onComplete()` sau khi vật chứng đã lưu để runtime đi tiếp.
 * Chạy là chấm (QĐ-018): mỗi lần bấm Chạy gọi `gradeChallenge`; bảng hiện theo `run.ok`, lời Hà Vy
 * theo mã đã chọn bằng `pickDiagnostic` (QĐ-046) — mã ĐÃ HIỆN cũng là mã ghi vào telemetry.
 */
import './challenge.css';
import './terminal.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { SavedQueryEvidence } from '../../evidence/types';
import { characterName, speakerLabel } from '../../shared/display-names';
import type { ChallengeId } from '../../shared/ids';
import { gameContent, useGameStore } from '../../shared/store';
import { CodeText } from '../../shared/ui/CodeText';
import { ConfirmDialog } from '../../shared/ui/ConfirmDialog';
import { usePressGuard } from '../../shared/ui/use-press-guard';
import { QUAN_OR_QUERY } from '../data/challenges';
import { gradeChallenge, modelToSql, previewRows, runQuery, sqlToModel } from '../engine';
import type { TableName } from '../schema';
import type { BuilderMode, BuilderRegion, ChallengeDefinition, GradeResult, QueryModel, RunSuccess } from '../types';
import { nextGuideStep } from './guide';
import { HaVyPanel, type HaVyNote } from './HaVyPanel';
import { IconClose, IconPlay } from './icons';
import { rowCountText, tableReadable } from './labels';
import { blockingReason, showDiagnostic, type LineSources } from './lines';
import { attributeSources, withoutPending } from './model-edit';
import { preloadDistinctValues } from './use-distinct-values';
import { QueryBuilder } from './QueryBuilder';
import { ResultTable } from './ResultTable';
import { SchemaPanel } from './SchemaPanel';
import { SqlPane } from './SqlPane';
import { SuccessPanel } from './SuccessPanel';
import { CLASS_LIST_EVIDENCE_ID, evidenceValueOptions } from './value-options';
import { WhereRow } from './WhereRow';
import { BootSequence, RowCounter, SessionClock } from './terminal-fx';
import { soundEngine } from '../../shared/audio/sound-engine';

export interface ChallengeScreenProps {
  challengeId: ChallengeId;
  definition: ChallengeDefinition | undefined;
  /** `fix-query`: trình dựng nạp sẵn truy vấn của Quân (debrief-fix). */
  mode: 'challenge' | 'fix-query';
  /** Đã hết quyền xem dữ liệu (end-03) — trình dựng bị khóa. */
  accessRevoked: boolean;
  onComplete: () => void;
}

/** Một lần chạy đã chấm, giữ trong màn (store chỉ giữ tóm tắt). */
interface RunOutcome {
  attempt: number;
  mode: BuilderMode;
  sql: string;
  grade: GradeResult;
  /** Bảng và số điều kiện của câu đã chạy (để nói số dòng theo lý do); `null` khi không biết. */
  table: string | null;
  conditionCount: number | null;
}

type Preview = { table: TableName; status: 'loading' } | { table: TableName; status: 'ready'; run: RunSuccess } | { table: TableName; status: 'error' };

/** Lời trong khung Hà Vy + bước hướng dẫn lúc lời được tạo (bước đổi thì lời bước mới thay). */
type Note = HaVyNote & { guideStep: number };

export function ChallengeScreen({ challengeId, definition, mode, accessRevoked, onComplete }: ChallengeScreenProps) {
  const openChallenge = useGameStore((s) => s.openChallenge);
  const updateChallenge = useGameStore((s) => s.updateChallenge);
  const recordRun = useGameStore((s) => s.recordRun);
  // Đặt tên khác "use…" để quy tắc hook không nhầm lời gọi trong trình xử lý sự kiện là hook.
  const takeHint = useGameStore((s) => s.useHint);
  const completeChallenge = useGameStore((s) => s.completeChallenge);
  const state = useGameStore((s) => s.challenges[challengeId]);
  const unlocked = useGameStore((s) => s.evidence.unlocked);
  const classEvidence = useGameStore((s) => s.evidence.savedQueries[CLASS_LIST_EVIDENCE_ID]);

  const [running, setRunning] = useState(false);
  const [saving, setSaving] = useState(false);
  const [outcome, setOutcome] = useState<RunOutcome | null>(null);
  const [note, setNote] = useState<Note | null>(null);
  const [confirmBack, setConfirmBack] = useState(false);
  const [preview, setPreview] = useState<Preview | null>(null);
  const [previewed, setPreviewed] = useState(false);
  const resultRef = useRef<HTMLElement>(null);
  // "Hỏi Hà Vy" là cú bấm chủ ý: nhận ngay, nhưng bấm đúp/giữ Enter không nhảy 2 mức gợi ý (QĐ-066).
  const hintGuard = usePressGuard(challengeId);
  const previewSeq = useRef(0);
  // Chặn bấm đúp (hai cú bấm trước khi React vẽ lại): chạy/lưu hai lần sẽ ghi telemetry hai lần và
  // gọi onComplete hai lần (lần hai rơi vào node kế tiếp của runtime).
  const busy = useRef({ running: false, saving: false });
  const cancelBack = useCallback(() => setConfirmBack(false), []);

  useEffect(() => {
    openChallenge(challengeId);
  }, [challengeId, openChallenge]);

  // Chọn bảng xong thì đếm sẵn giá trị của từng cột: ô giá trị biết ngay là danh sách hay ô chữ (QĐ-056).
  const chosenTable = state?.model.table ?? null;
  useEffect(() => {
    if (chosenTable) preloadDistinctValues(chosenTable);
  }, [chosenTable]);

  const evidenceOptions = useMemo(() => evidenceValueOptions(gameContent, unlocked, classEvidence), [unlocked, classEvidence]);

  const setModel = useCallback(
    // Điều kiện chưa chọn cột (QĐ-056) không đi vào SQL.
    (model: QueryModel) => updateChallenge(challengeId, { model, sql: modelToSql(withoutPending(model)) }),
    [challengeId, updateChallenge],
  );

  const showPreview = useCallback((table: TableName) => {
    previewSeq.current += 1;
    const seq = previewSeq.current;
    setPreviewed(true);
    setPreview({ table, status: 'loading' });
    previewRows(table, 5).then(
      (run) => {
        if (previewSeq.current === seq) setPreview({ table, status: 'ready', run });
      },
      () => {
        if (previewSeq.current === seq) setPreview({ table, status: 'error' });
      },
    );
  }, []);

  // Hướng dẫn từng bước: tự sang bước khi thao tác của vùng đã xong (QĐ-021).
  const steps = definition?.content.steps;
  const guideStep = state?.guideStep ?? 0;
  const guideModel = state?.model;
  const ranWithFilter = outcome !== null && (outcome.conditionCount ?? 0) > 0;
  useEffect(() => {
    if (!steps || !guideModel || guideStep === 0) return;
    const next = nextGuideStep(steps, guideStep, { model: guideModel, previewed, ranWithFilter });
    if (next !== guideStep) updateChallenge(challengeId, { guideStep: next });
  }, [steps, guideStep, guideModel, previewed, ranWithFilter, challengeId, updateChallenge]);

  if (!definition) {
    return (
      <div className="chal" role="region" aria-label="Thử thách">
        <div className="chal__left">
          <div className="chal-card chal-head">
            <h2 className="chal-head__title">Thử thách chưa có nội dung</h2>
            <p className="chal-head__prompt">Thẻ thử thách này chưa được viết trong nội dung.</p>
          </div>
        </div>
      </div>
    );
  }
  const { content, spec } = definition;
  if (!state) return null;

  const src: LineSources = { content, common: gameContent.commonDiagnosticLines, standardHints: gameContent.standardHints };
  const model = state.model;
  const builderSql = modelToSql(withoutPending(model));
  const locked = accessRevoked;
  const sqlMode = state.mode === 'sql';
  const solved = outcome !== null && outcome.grade.status === 'correct' && outcome.grade.run.ok;
  // Lý do chặn chỉ áp cho trình dựng; SQL gõ tay luôn chạy được (engine chấm và nói lỗi nếu có).
  const blocked = sqlMode ? null : blockingReason(model, src);
  const canRun = !locked && !solved && !running && blocked === null;

  const currentStep = guideStep > 0 && !locked ? content.steps[guideStep - 1] : undefined;
  const guided: BuilderRegion | null = currentStep?.highlight ?? null;
  const stepNote: Note | null = currentStep
    ? { key: `step-${currentStep.step}`, label: `Hướng dẫn · bước ${guideStep}/${content.steps.length}`, line: currentStep.line, guideStep }
    : null;
  const shownNote: Note | null = stepNote && (note === null || note.guideStep !== guideStep) ? stepNote : note;

  /** "Sửa SQL trực tiếp" ↔ trình dựng (QĐ-016): về được thì nạp model, không được thì hỏi xác nhận. */
  const toggleSqlMode = (): void => {
    if (!sqlMode) {
      updateChallenge(challengeId, { mode: 'sql', sql: builderSql });
      return;
    }
    const parsed = sqlToModel(state.sql);
    if (parsed) {
      const next = attributeSources(parsed, evidenceOptions);
      updateChallenge(challengeId, { mode: 'builder', model: next, sql: modelToSql(next) });
    } else {
      setConfirmBack(true);
    }
  };
  const backToLastBuilder = (): void => {
    setConfirmBack(false);
    updateChallenge(challengeId, { mode: 'builder', sql: modelToSql(withoutPending(state.model)) });
  };

  const askHaVy = (e: { detail: number }): void => {
    if (!hintGuard.click(e, { immediate: true })) return;
    const level = takeHint(challengeId);
    const line = content.hints[level - 1] ?? content.hints[2];
    setNote({ key: `hint-${state.hintsUsed + 1}`, label: `Gợi ý ${level}/3`, line, guideStep });
  };

  const save = async (): Promise<void> => {
    if (!outcome || !solved || saving || locked || !outcome.grade.run.ok || busy.current.saving) return;
    busy.current.saving = true;
    const r = outcome.grade.run;
    setSaving(true);
    let before: SavedQueryEvidence['before'];
    if (mode === 'fix-query') {
      // Số dòng "trước khi sửa" lấy từ lần chạy thật truy vấn OR của Quân (không viết cứng).
      const quan = await runQuery(QUAN_OR_QUERY);
      if (quan.ok) before = { sql: QUAN_OR_QUERY, rowCount: quan.rowCount };
    }
    completeChallenge(challengeId, {
      id: content.evidence.id,
      challengeId,
      sql: outcome.sql,
      columns: r.columns,
      rows: r.rows,
      rowCount: r.rowCount,
      savedAt: Date.now(),
      ...(before ? { before } : {}),
    });
    onComplete();
  };

  const run = async (): Promise<void> => {
    if (!canRun || busy.current.running) return;
    busy.current.running = true;
    const runMode: BuilderMode = state.mode;
    const sql = runMode === 'sql' ? state.sql : builderSql;
    const shape = runMode === 'sql' ? sqlToModel(sql) : model;
    setRunning(true);
    soundEngine.playSfx('typewriter');
    try {
      const grade = await gradeChallenge(spec, sql, runMode === 'sql' ? null : model);
      if (grade.status === 'correct') soundEngine.playSfx('chime');
      const shown = showDiagnostic(
        grade.diagnostics.map((d) => d.code),
        src,
      );
      const attempt = state.runs + 1;
      recordRun(challengeId, {
        mode: runMode,
        sql,
        status: grade.status,
        rowCount: grade.run.ok ? grade.run.rowCount : null,
        primaryCode: shown?.code ?? null,
        connector: shape && shape.conditions.length >= 2 ? shape.connector : null,
      });
      setPreview(null);
      previewSeq.current += 1;
      setOutcome({ attempt, mode: runMode, sql, grade, table: shape?.table ?? null, conditionCount: shape ? shape.conditions.length : null });
      if (grade.status === 'correct') {
        setNote({ key: `run-${attempt}`, label: 'Đúng rồi', tone: 'success', line: shown?.line ?? content.onCorrect, guideStep });
      } else if (shown) {
        setNote({ key: `run-${attempt}`, label: `Nhận xét lần chạy ${attempt}`, line: shown.line, guideStep });
      }
      resultRef.current?.scrollTo?.({ top: 0 });
    } finally {
      busy.current.running = false;
      setRunning(false);
    }
  };

  const guideActions =
    currentStep !== undefined ? (
      <button type="button" className="btn btn--small" onClick={() => updateChallenge(challengeId, { guideStep: 0 })}>
        Bỏ qua hướng dẫn
      </button>
    ) : null;

  return (
    <div className={`chal${solved ? ' chal--solved' : ''}`} role="region" aria-labelledby="chal-title">
      <div className="terminal-bar"><span className="terminal-bar__brand"><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true"><rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M7 8l3 3-3 3M13 14h4"/></svg> Máy tính CLB</span><span className="terminal-bar__status"><SessionClock closed={locked} /><span>Phiên điều tra / {challengeId.toUpperCase()}</span></span></div>
      <BootSequence challengeId={challengeId} />
      <div className="chal__left">
        <div className="chal-card chal-workspace">
          <div className="terminal-windowbar"><span>Trạm truy vấn</span><span className="terminal-windowbar__lights" aria-hidden="true"><i/><i/><i/></span></div>
          <header className="chal-head">
            <h2 id="chal-title" className="chal-head__title">
              <CodeText text={content.title} />
            </h2>
            <p className="chal-head__prompt">
              <CodeText text={content.prompt} />
            </p>
          </header>

          {/* Thanh chuyển đổi cơ chế giải đố (Visual Builder ↔ Direct SQL) */}
          <div className="chal-mode-switcher" aria-label="Chuyển đổi chế độ soạn thảo">
              <button
                type="button"
                disabled={locked || solved}
                aria-pressed={!sqlMode}
                className={`chal-mode-tab${!sqlMode ? ' chal-mode-tab--active' : ''}`}
                onClick={() => {
                  if (sqlMode) toggleSqlMode();
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                Dựng truy vấn
              </button>
              <button
                type="button"
                disabled={locked || solved}
                aria-pressed={sqlMode}
                className={`chal-mode-tab${sqlMode ? ' chal-mode-tab--active' : ''}`}
                onClick={() => {
                  if (!sqlMode) toggleSqlMode();
                }}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="16 18 22 12 16 6" />
                  <polyline points="8 6 2 12 8 18" />
                </svg>
                Viết SQL
              </button>
            </div>

          {locked ? (
            <p className="chal-locked" role="status">
              Quyền xem dữ liệu của CLB đã kết thúc, nên trình dựng bị khóa: không chọn, không chạy được truy vấn nữa.
            </p>
          ) : null}

          <section className="chal-builder" aria-label="Trình dựng truy vấn">
            {solved ? (
              <p className="chal-solved">
                {content.readQuestion ? 'Truy vấn đã đúng — trả lời câu hỏi bên dưới rồi lưu vào hồ sơ.' : 'Truy vấn đã đúng — lưu vào hồ sơ để đi tiếp.'}
              </p>
            ) : null}
            {sqlMode ? (
        <SqlPane
          compact
          mode={state.mode}
          builderSql={builderSql}
          draft={state.sql}
          onDraft={(sql) => updateChallenge(challengeId, { sql })}
          onToggle={toggleSqlMode}
          onRunShortcut={() => void run()}
          disabled={locked || solved}
          guided={false}
        />
            ) : (
            <QueryBuilder
              model={model}
              onChange={setModel}
              guided={guided}
              disabled={locked || solved || sqlMode}
              onPreview={showPreview}
              whereRow={<WhereRow model={model} onChange={setModel} evidenceOptions={evidenceOptions} disabled={locked || solved || sqlMode} />}
            />
            )}
          </section>

          {!sqlMode && <details className="terminal-source"><summary>Xem câu SQL tương ứng</summary>        <SqlPane
          compact
          mode={state.mode}
          builderSql={builderSql}
          draft={state.sql}
          onDraft={(sql) => updateChallenge(challengeId, { sql })}
          onToggle={toggleSqlMode}
          onRunShortcut={() => void run()}
          disabled={locked || solved}
          guided={false}
        />
</details>}

          {/* Thanh Chạy nằm liền kề dưới đáy workspace để thao tác tự nhiên */}
          <div className={`chal-runbar${guided === 'run' ? ' is-guided' : ''}`} data-region="run" hidden={solved}>
            <button
              type="button"
              className="btn btn--primary chal-run"
              disabled={!canRun}
              aria-describedby={blocked && !locked ? 'chal-run-reason' : undefined}
              onClick={() => void run()}
            >
              <IconPlay /> {running ? 'Đang chạy…' : 'Chạy truy vấn'}
            </button>
            {blocked && !locked ? (
              <p id="chal-run-reason" className="chal-runbar__reason" role="status">
                <span className="chal-runbar__who">{speakerLabel(blocked.line.speaker)}:</span> <CodeText text={blocked.line.text} />
              </p>
            ) : null}
          </div>
        </div>

        <section className="chal-card chal-result" aria-label="Kết quả" ref={resultRef}>
          <div className="terminal-resultbar">
            <span>Kết quả truy vấn</span>
            {outcome && !preview ? (
              <RowCounter key={outcome.attempt} value={outcome.grade.run.ok ? outcome.grade.run.rowCount : 0} failed={!outcome.grade.run.ok} />
            ) : (
              <span>{preview ? 'Xem trước' : 'Chờ truy vấn'}</span>
            )}
          </div>
          {outcome && !preview ? <span key={`scan-${outcome.attempt}`} className="result-scanline" aria-hidden="true" /> : null}
          {preview ? (
            <PreviewView preview={preview} onClose={() => setPreview(null)} />
          ) : outcome && solved && outcome.grade.run.ok ? (
            <SuccessPanel
              attempt={outcome.attempt}
              run={outcome.grade.run}
              table={outcome.table}
              conditionCount={outcome.conditionCount}
              question={content.readQuestion}
              saving={saving}
              disabled={locked}
              onSave={() => void save()}
            />
          ) : outcome ? (
            <RunResultView outcome={outcome} />
          ) : (
            <p className="qb-empty terminal-empty">Chưa chạy truy vấn nào. Dựng truy vấn rồi bấm “Chạy truy vấn” để xem kết quả ở đây.</p>
          )}
        </section>
      </div>

      <aside className="chal__right" aria-label="Câu SQL và trợ giúp">
        <HaVyPanel
          note={shownNote}
          idle="Dựng truy vấn theo đề bài rồi bấm “Chạy truy vấn”. Chạy sai không sao — chạy lại bao nhiêu lần cũng được."
          onAskHaVy={askHaVy}
          onAskKeyDown={hintGuard.holdKey}
          askDisabled={locked || solved}
          actions={guideActions}
        />
        <SchemaPanel onPreview={showPreview} previewDisabled={locked || solved} />
      </aside>
      <ConfirmDialog
        open={confirmBack}
        title="Quay về trình dựng?"
        message="Trình dựng chưa đọc được câu SQL này (có phần nằm ngoài các hàng SELECT / FROM / WHERE của trình dựng). Quay về trạng thái trình dựng gần nhất thì phần sửa trong ô SQL sẽ không được giữ lại."
        confirmLabel="Quay về trạng thái gần nhất"
        cancelLabel="Ở lại sửa SQL"
        onConfirm={backToLastBuilder}
        onCancel={cancelBack}
      />
    </div>
  );
}

function PreviewView({ preview, onClose }: { preview: Preview; onClose: () => void }) {
  const title = `5 dòng đầu của bảng ${preview.table}`;
  return (
    <div className="result result--preview">
      <div className="result__head">
        <strong className="result__count">
          <span className="mono">{preview.table}</span> — 5 dòng đầu
        </strong>
        <span className="result__attempt">Chỉ để xem bảng {tableReadable(preview.table)} trông thế nào, chưa phải kết quả truy vấn.</span>
        <button type="button" className="qb-icon-btn result__close" aria-label="Đóng bản xem trước" title="Đóng bản xem trước" onClick={onClose}>
          <IconClose />
        </button>
      </div>
      {preview.status === 'loading' ? <p className="qb-empty">Đang mở bảng…</p> : null}
      {preview.status === 'error' ? <p className="qb-empty">Không mở được bảng này. Thử bấm lại “Xem 5 dòng đầu”.</p> : null}
      {preview.status === 'ready' ? <ResultTable columns={preview.run.columns} rows={preview.run.rows} caption={title} /> : null}
    </div>
  );
}

function RunResultView({ outcome }: { outcome: RunOutcome }) {
  const { grade } = outcome;
  const run = grade.run;
  return (
    <div className="result">
      <div className="result__head">
        <span className="result__attempt">Lần chạy {outcome.attempt}</span>
        {run.ok ? (
          <strong className="result__count" role="status">
            {rowCountText(run.rowCount, outcome.table, outcome.conditionCount)}
          </strong>
        ) : (
          <strong className="result__count" role="status">
            Câu này chưa chạy được nên chưa có bảng kết quả — xem nhận xét của {characterName('ha-vy')}.
          </strong>
        )}
      </div>
      {run.ok && run.rowCount > 0 ? <ResultTable key={outcome.attempt} reveal columns={run.columns} rows={run.rows} caption={`Kết quả lần chạy ${outcome.attempt}`} /> : null}
    </div>
  );
}
