/**
 * Màn thử thách (gói 4 `trinh-dung-ui`) — và màn sửa truy vấn của Quân (`mode: 'fix-query'`), cùng props.
 *
 * Hợp đồng: màn này tự gọi store (openChallenge/updateChallenge/recordRun/useHint/completeChallenge)
 * qua `challengeId`, rồi gọi `onComplete()` sau khi vật chứng đã lưu để runtime đi tiếp.
 * Chạy là chấm (QĐ-018): mỗi lần bấm Chạy gọi `gradeChallenge`; bảng hiện theo `run.ok`, lời Hà Vy
 * theo mã đã chọn bằng `pickDiagnostic` (QĐ-046) — mã ĐÃ HIỆN cũng là mã ghi vào telemetry.
 */
import './challenge.css';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import type { ChallengeId } from '../../shared/ids';
import { gameContent, useGameStore } from '../../shared/store';
import { CodeText } from '../../shared/ui/CodeText';
import { gradeChallenge, modelToSql, sqlToModel } from '../engine';
import type { TableName } from '../schema';
import type { BuilderMode, ChallengeDefinition, GradeResult, QueryModel } from '../types';
import { HaVyPanel, type HaVyNote } from './HaVyPanel';
import { IconPlay } from './icons';
import { rowCountText } from './labels';
import { blockingReason, showDiagnostic, type LineSources } from './lines';
import { QueryBuilder } from './QueryBuilder';
import { ResultTable } from './ResultTable';
import { SqlCode } from './SqlCode';
import { CLASS_LIST_EVIDENCE_ID, evidenceValueOptions } from './value-options';
import { WhereRow } from './WhereRow';

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

export function ChallengeScreen({ challengeId, definition, mode, accessRevoked, onComplete: _onComplete }: ChallengeScreenProps) {
  const openChallenge = useGameStore((s) => s.openChallenge);
  const updateChallenge = useGameStore((s) => s.updateChallenge);
  const recordRun = useGameStore((s) => s.recordRun);
  const state = useGameStore((s) => s.challenges[challengeId]);
  const unlocked = useGameStore((s) => s.evidence.unlocked);
  const classEvidence = useGameStore((s) => s.evidence.savedQueries[CLASS_LIST_EVIDENCE_ID]);

  const [running, setRunning] = useState(false);
  const [outcome, setOutcome] = useState<RunOutcome | null>(null);
  const [note, setNote] = useState<HaVyNote | null>(null);
  const resultRef = useRef<HTMLElement>(null);

  useEffect(() => {
    openChallenge(challengeId);
  }, [challengeId, openChallenge]);

  const evidenceOptions = useMemo(() => evidenceValueOptions(gameContent, unlocked, classEvidence), [unlocked, classEvidence]);

  const setModel = useCallback(
    (model: QueryModel) => updateChallenge(challengeId, { model, sql: modelToSql(model) }),
    [challengeId, updateChallenge],
  );

  const onPreview = useCallback((_table: TableName) => {
    // Nhóm sau: hiện 5 dòng đầu trong khung kết quả.
  }, []);

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
  const builderSql = modelToSql(model);
  const locked = accessRevoked;
  const blocked = blockingReason(model, src);
  const canRun = !locked && !running && blocked === null;

  const run = async (): Promise<void> => {
    if (!canRun) return;
    const runMode: BuilderMode = state.mode;
    const sql = runMode === 'sql' ? state.sql : builderSql;
    const shape = runMode === 'sql' ? sqlToModel(sql) : model;
    setRunning(true);
    try {
      const grade = await gradeChallenge(spec, sql, runMode === 'sql' ? null : model);
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
      setOutcome({ attempt, mode: runMode, sql, grade, table: shape?.table ?? null, conditionCount: shape ? shape.conditions.length : null });
      if (grade.status === 'correct') {
        setNote({ key: `run-${attempt}`, label: 'Đúng rồi', tone: 'success', line: shown?.line ?? content.onCorrect });
      } else if (shown) {
        setNote({ key: `run-${attempt}`, label: `Nhận xét lần chạy ${attempt}`, line: shown.line });
      }
      resultRef.current?.scrollTo?.({ top: 0 });
    } finally {
      setRunning(false);
    }
  };

  return (
    <div className="chal" role="region" aria-labelledby="chal-title">
      <div className="chal__left">
        <header className="chal-card chal-head">
          <h2 id="chal-title" className="chal-head__title">
            {mode === 'fix-query' ? <span className="chal-head__tag">Sửa truy vấn</span> : null}
            <CodeText text={content.title} />
          </h2>
          <p className="chal-head__prompt">
            <CodeText text={content.prompt} />
          </p>
        </header>

        {locked ? (
          <p className="chal-locked" role="status">
            Quyền xem dữ liệu của CLB đã kết thúc, nên trình dựng bị khóa: không chọn, không chạy được truy vấn nữa.
          </p>
        ) : null}

        <section className="chal-card chal-builder" aria-label="Trình dựng truy vấn">
          <QueryBuilder
            model={model}
            onChange={setModel}
            guided={null}
            disabled={locked}
            onPreview={onPreview}
            whereRow={<WhereRow model={model} onChange={setModel} evidenceOptions={evidenceOptions} disabled={locked} />}
          />
          <div className="chal-runbar" data-region="run">
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
                <span className="chal-runbar__who">Hà Vy:</span> {blocked.line.text}
              </p>
            ) : null}
          </div>
        </section>

        <section className="chal-card chal-result" aria-label="Kết quả" ref={resultRef}>
          {outcome ? <RunResultView outcome={outcome} /> : <p className="qb-empty">Chưa chạy truy vấn nào. Dựng truy vấn rồi bấm “Chạy truy vấn” để xem kết quả ở đây.</p>}
        </section>
      </div>

      <aside className="chal__right" aria-label="Câu SQL và trợ giúp">
        <section className="chal-sql" aria-labelledby="chal-sql-title">
          <div className="chal-sql__head">
            <h3 id="chal-sql-title" className="chal-sql__title">
              Câu SQL tương ứng
            </h3>
          </div>
          <SqlCode sql={builderSql} label="Câu SQL sinh từ trình dựng" />
        </section>
        <HaVyPanel note={note} idle="Dựng truy vấn theo đề bài rồi bấm “Chạy truy vấn”. Chạy sai không sao — chạy lại bao nhiêu lần cũng được." />
      </aside>
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
            Câu này chưa chạy được nên chưa có bảng kết quả — xem nhận xét của Hà Vy.
          </strong>
        )}
      </div>
      {run.ok && run.rowCount > 0 ? <ResultTable columns={run.columns} rows={run.rows} caption={`Kết quả lần chạy ${outcome.attempt}`} /> : null}
    </div>
  );
}
