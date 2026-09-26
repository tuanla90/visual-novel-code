/**
 * Chơi TRỌN LUỒNG trên nội dung thật, không giao diện: `intro-01` → `[KẾT THÚC]` chỉ bằng API công
 * khai của store + runtime. Bốn thử thách giải bằng SQL chuẩn qua engine thật, đúng trình tự màn thử
 * thách (openChallenge → gradeChallenge → recordRun → [câu đọc kết quả] → completeChallenge), vật chứng
 * lưu thật (bảng kết quả từ sql.js). Khác `jumpToPartStart` (chỉ để nhảy phần: không ghi lần chạy,
 * không gợi ý, phiên bị đánh dấu), ở đây mọi sự kiện là "thật" như một người chơi.
 *
 * Khẳng định: 5 phần bắt đầu/hoàn thành đúng thứ tự · hồ sơ đủ 10 mục · cờ hết quyền · 3 thẻ bị che ·
 * tóm tắt telemetry của phiên (thời gian 5 phần, số lần chạy/gợi ý/thời gian mỗi thử thách, lựa chọn
 * ĐẦU ở hai câu đo lường, `game_complete`). Biến thể "chọn SAI trước": tóm tắt phải ghi lựa chọn đầu
 * là lựa chọn SAI (thước đo chính của §10 — QĐ-035).
 */
import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { realContent } from '../content/real';
import type { SavedQueryEvidence } from '../evidence/types';
import { CHALLENGE_IDS, CLUE_IDS, DOCUMENT_IDS, PART_IDS, QUERY_EVIDENCE_IDS, type ChallengeId } from '../shared/ids';
import { createGameStore, type GameStore } from '../shared/store/store';
import { configureSessionMeta, getSessionMeta } from '../shared/telemetry/session-meta';
import { MEASURED_QUESTIONS, summarizeSession } from '../shared/telemetry/summary';
import { clearTelemetry, configureTelemetry, getSessionId, getTelemetryEvents, track } from '../shared/telemetry/track';
import { QUAN_OR_QUERY } from '../sql-challenge/data/challenges';
import { gradeChallenge, runQuery } from '../sql-challenge/engine';

// ---------- Đồng hồ giả: mỗi hành động của người chơi cách nhau 1 giây ----------

let clock = 1_700_000_000_000;
const tick = (): number => (clock += 1_000);
const readClock = (): number => clock;

function makeStore() {
  return createGameStore({ content: realContent, persist: false, now: tick });
}

// ---------- Người chơi tự động ----------

interface PlayOptions {
  /** Câu hỏi → id lựa chọn SAI sẽ bấm TRƯỚC (một lần), rồi mới chọn đúng. */
  wrongFirstChoice?: Record<string, string>;
  /** Màn chọn dòng → số dòng SAI sẽ bấm TRƯỚC (một lần). */
  wrongFirstLine?: Record<string, number>;
  /** Thử thách → SQL sai chạy TRƯỚC câu chuẩn (để có một lần chạy `incorrect`/`error`). */
  wrongSqlFirst?: Partial<Record<ChallengeId, string>>;
  /** Thử thách được bấm "Hỏi Hà Vy" một lần trước khi chạy. */
  hintOn?: ChallengeId[];
}

interface PlayLog {
  steps: number;
  /** Chuỗi đã đi qua theo thứ tự (từ `scene_enter`). */
  sequences: string[];
}

const MAX_STEPS = 2_000;

/** Giải một thử thách như màn thử thách làm (ChallengeScreen.run + save), bằng engine thật. */
async function solveChallenge(s: () => GameStore, id: ChallengeId, mode: 'challenge' | 'fix-query', opts: PlayOptions): Promise<void> {
  const def = realContent.challenges[id];
  if (!def) throw new Error(`Nội dung thật thiếu thử thách ${id}.`);
  const { spec, content } = def;
  s().openChallenge(id);
  if (opts.hintOn?.includes(id)) s().useHint(id);

  const wrongSql = opts.wrongSqlFirst?.[id];
  if (wrongSql) {
    const g = await gradeChallenge(spec, wrongSql, null);
    if (g.status === 'correct') throw new Error(`SQL "sai" của ${id} lại được chấm đúng.`);
    s().recordRun(id, { mode: 'sql', sql: wrongSql, status: g.status, rowCount: g.run.ok ? g.run.rowCount : null, primaryCode: g.primaryCode, connector: null });
  }

  const grade = await gradeChallenge(spec, spec.referenceSql, null);
  if (grade.status !== 'correct' || !grade.run.ok) throw new Error(`SQL chuẩn của ${id} không được chấm đúng (${grade.status}).`);
  s().recordRun(id, { mode: 'sql', sql: spec.referenceSql, status: 'correct', rowCount: grade.run.rowCount, primaryCode: grade.primaryCode, connector: null });

  // Câu đọc kết quả do màn thử thách tự ghi (QĐ-043) — chọn đúng ngay.
  const rq = content.readQuestion;
  if (rq) {
    const right = rq.choices.find((c) => c.correct);
    if (!right) throw new Error(`Câu đọc kết quả ${rq.id} không có lựa chọn đúng.`);
    track({ type: 'question_answered', questionId: rq.id, choiceId: right.id, attempt: 1, correct: true, isFirstChoice: true });
  }

  let before: SavedQueryEvidence['before'];
  if (mode === 'fix-query') {
    const quan = await runQuery(QUAN_OR_QUERY);
    if (quan.ok) before = { sql: QUAN_OR_QUERY, rowCount: quan.rowCount };
  }
  s().completeChallenge(id, {
    id: content.evidence.id,
    challengeId: id,
    sql: spec.referenceSql,
    columns: grade.run.columns,
    rows: grade.run.rows,
    rowCount: grade.run.rowCount,
    savedAt: tick(),
    ...(before ? { before } : {}),
  });
}

/** Chơi từ đầu tới `[KẾT THÚC]`; ném lỗi nêu rõ chỗ kẹt. */
async function playToEnd(store: ReturnType<typeof makeStore>, opts: PlayOptions = {}): Promise<PlayLog> {
  const s = () => store.getState();
  const wrongChoices = { ...(opts.wrongFirstChoice ?? {}) };
  const wrongLines = { ...(opts.wrongFirstLine ?? {}) };
  s().startGame();
  let steps = 0;
  for (; steps < MAX_STEPS; steps++) {
    const view = s().getView();
    if (!view) throw new Error('Không đọc được màn hiện tại.');
    const where = `${view.sequence?.id ?? '?'}#${s().progress?.cursor.nodeIndex ?? '?'} (${view.kind})`;
    let rejected: string | undefined;
    switch (view.kind) {
      case 'end': {
        const sequences = getTelemetryEvents()
          .filter((e) => e.sessionId === getSessionId() && e.type === 'scene_enter')
          .map((e) => (e.type === 'scene_enter' ? e.sequenceId : ''));
        return { steps, sequences };
      }
      case 'error':
        throw new Error(`Lỗi nội dung tại ${where}: ${view.message}`);
      case 'line':
      case 'feedback':
        rejected = s().dispatchStory({ type: 'advance' });
        break;
      case 'explore': {
        if (view.gate?.satisfied) {
          rejected = s().dispatchStory({ type: 'proceed' });
          break;
        }
        const next = view.hotspots.find((h) => !h.visited);
        if (!next) throw new Error(`Đã xem hết điểm xem xét mà chưa qua được cảnh tại ${where}; còn thiếu ${view.gate?.missing.join(', ') ?? '?'}.`);
        rejected = s().dispatchStory({ type: 'inspect', hotspotId: next.id });
        break;
      }
      case 'gate':
        if (!view.gate.satisfied) throw new Error(`Kẹt ở điều kiện qua cảnh tại ${where}: hồ sơ còn thiếu ${view.gate.missing.join(', ')}.`);
        rejected = s().dispatchStory({ type: 'proceed' });
        break;
      case 'question': {
        const q = view.node.question;
        const wrongId = wrongChoices[q.id];
        let choiceId: string;
        if (wrongId !== undefined) {
          const wrong = q.choices.find((c) => c.id === wrongId);
          if (!wrong || wrong.correct) throw new Error(`"${wrongId}" không phải lựa chọn sai của ${q.id}.`);
          delete wrongChoices[q.id];
          choiceId = wrongId;
        } else {
          const right = q.choices.find((c) => c.correct);
          if (!right) throw new Error(`Câu ${q.id} không có lựa chọn đúng.`);
          choiceId = right.id;
        }
        rejected = s().dispatchStory({ type: 'choose', choiceId });
        break;
      }
      case 'line-pick': {
        const pick = view.node.pick;
        const wrongIndex = wrongLines[pick.id];
        let lineIndex: number;
        if (wrongIndex !== undefined) {
          const wrong = pick.lines.find((l) => l.index === wrongIndex);
          if (!wrong || wrong.correct) throw new Error(`Dòng ${wrongIndex} không phải dòng sai của ${pick.id}.`);
          delete wrongLines[pick.id];
          lineIndex = wrongIndex;
        } else {
          const right = pick.lines.find((l) => l.correct);
          if (!right) throw new Error(`Màn chọn dòng ${pick.id} không có dòng đúng.`);
          lineIndex = right.index;
        }
        rejected = s().dispatchStory({ type: 'pick-line', lineIndex });
        break;
      }
      case 'challenge':
      case 'fix-query':
        await solveChallenge(s, view.node.challengeId, view.kind, opts);
        rejected = s().dispatchStory({ type: 'complete' });
        break;
      case 'show-document':
      case 'effect':
      case 'projector':
        rejected = s().dispatchStory({ type: 'complete' });
        break;
    }
    if (rejected) throw new Error(`Runtime từ chối hành động tại ${where}: ${rejected}`);
  }
  throw new Error(`Quá ${MAX_STEPS} bước mà chưa tới [KẾT THÚC].`);
}

function sessionSummary() {
  const sid = getSessionId();
  return summarizeSession(
    sid,
    getTelemetryEvents().filter((e) => e.sessionId === sid),
    getSessionMeta()[sid],
  );
}

const ALL_EVIDENCE = [...CLUE_IDS, ...DOCUMENT_IDS, ...QUERY_EVIDENCE_IDS];
const REDACTED = ['ev-c1-names-h', 'ev-c3-shortlist', 'ev-quan-fixed'] as const;

// SQL sai cho từng thử thách: c1 không lọc (no-filter), c3 nối OR (or-connector).
const WRONG_SQL: Partial<Record<ChallengeId, string>> = {
  c1: 'SELECT ma_sv, ho_dem, ten FROM sinh_vien;',
  c3: QUAN_OR_QUERY,
};

describe('chơi trọn luồng intro-01 → [KẾT THÚC] (store + runtime + engine thật, không UI)', () => {
  beforeEach(() => {
    clearTelemetry();
    configureSessionMeta(null);
    configureTelemetry({ clock: readClock });
  });
  afterEach(() => {
    configureTelemetry({ clock: () => Date.now() });
  });

  it('trả lời đúng ngay: đi hết 5 phần đúng thứ tự, hồ sơ đủ, hết quyền che 3 thẻ, tóm tắt đủ số liệu', { timeout: 60_000 }, async () => {
    const store = makeStore();
    const log = await playToEnd(store, { wrongSqlFirst: WRONG_SQL, hintOn: ['c1'] });
    const s = store.getState();
    const progress = s.progress;
    if (!progress) throw new Error('mất tiến độ');

    // Kết thúc thật, đi từ chuỗi đầu tới chuỗi cuối.
    expect(progress.ended).toBe(true);
    expect(log.sequences[0]).toBe('intro-01');
    expect(log.sequences.at(-1)).toBe('end-04');
    expect(log.steps).toBeGreaterThan(100);

    // 5 phần bắt đầu và hoàn thành đúng thứ tự (mốc trong tiến độ + sự kiện).
    const startedAt = PART_IDS.map((p) => progress.partStartedAt[p]);
    const completedAt = PART_IDS.map((p) => progress.partCompletedAt[p]);
    expect(startedAt.every((t) => typeof t === 'number')).toBe(true);
    expect(completedAt.every((t) => typeof t === 'number')).toBe(true);
    for (let i = 0; i < PART_IDS.length; i++) {
      expect(startedAt[i]! < completedAt[i]!, `phần ${PART_IDS[i]} phải hoàn thành sau khi bắt đầu`).toBe(true);
      if (i > 0) expect(completedAt[i - 1]! <= startedAt[i]!, `phần ${PART_IDS[i]} phải bắt đầu sau khi phần trước xong`).toBe(true);
    }
    const events = getTelemetryEvents().filter((e) => e.sessionId === getSessionId());
    expect(events.filter((e) => e.type === 'part_start').map((e) => (e.type === 'part_start' ? e.part : ''))).toEqual([...PART_IDS]);
    expect(events.filter((e) => e.type === 'part_complete').map((e) => (e.type === 'part_complete' ? e.part : ''))).toEqual([...PART_IDS]);
    expect(events.filter((e) => e.type === 'game_complete')).toHaveLength(1);
    expect(events[0]?.type).toBe('game_start');
    expect(events.at(-1)?.type).toBe('game_complete');

    // Hồ sơ đủ 3 manh mối + 3 tài liệu + 4 vật chứng truy vấn, số dòng đúng QĐ-012.
    expect([...s.evidence.unlocked].sort()).toEqual([...ALL_EVIDENCE].sort());
    const saved = s.evidence.savedQueries;
    expect(saved['ev-c1-names-h']?.rowCount).toBe(10);
    expect(saved['ev-c2-classes-b']?.rowCount).toBe(2);
    expect(saved['ev-c3-shortlist']?.rowCount).toBe(2);
    expect(saved['ev-quan-fixed']).toMatchObject({ rowCount: 2, before: { sql: QUAN_OR_QUERY, rowCount: 24 } });
    expect(saved['ev-c1-names-h']?.rows).toHaveLength(10);

    // Hết quyền truy cập: cờ bật, đúng 3 thẻ có dữ liệu cá nhân bị che, thẻ mã lớp thì không.
    expect(progress.flags).toEqual(['access-revoked']);
    const redacted = s.evidence.annotations.filter((a) => a.redact).map((a) => a.evidenceId);
    expect([...redacted].sort()).toEqual([...REDACTED].sort());
    expect(s.evidence.annotations.some((a) => a.evidenceId === 'ev-c2-classes-b')).toBe(false);

    // Thử thách trong store: xong hết, c1 có 2 lần chạy + 1 gợi ý.
    for (const id of CHALLENGE_IDS) expect(s.challenges[id]?.status, id).toBe('completed');
    expect(s.challenges.c1).toMatchObject({ runs: 2, hintsUsed: 1, hintLevel: 1 });
    expect(s.challenges.c2).toMatchObject({ runs: 1, hintsUsed: 0 });

    // Tóm tắt telemetry của phiên (bảng người quan sát đọc từ đây).
    const summary = sessionSummary();
    expect(summary).toMatchObject({ started: true, completed: true, jumped: false, autoEventCount: 0, reset: false, within35Min: true });
    expect(summary.gameDurationMs).toBeGreaterThan(0);
    expect(summary.parts.map((p) => p.part)).toEqual([...PART_IDS]);
    for (const p of summary.parts) {
      expect(p.started, p.part).toBe(true);
      expect(p.durationMs, p.part).toBeGreaterThan(0);
      expect(p.skippedByJump, p.part).toBe(false);
    }
    expect(summary.challenges.map((c) => c.challengeId)).toEqual([...CHALLENGE_IDS]);
    for (const c of summary.challenges) {
      expect(c.started, c.challengeId).toBe(true);
      expect(c.completed, c.challengeId).toBe(true);
      expect(c.runs, c.challengeId).toBeGreaterThanOrEqual(1);
      expect(c.msToFirstRun, c.challengeId).not.toBeNull();
      expect(c.durationMs, c.challengeId).toBeGreaterThan(0);
      expect(c.skippedByJump, c.challengeId).toBe(false);
    }
    const c1 = summary.challenges.find((c) => c.challengeId === 'c1');
    const c3 = summary.challenges.find((c) => c.challengeId === 'c3');
    expect(c1).toMatchObject({ runs: 2, hints: 1, logicErrors: 1, syntaxErrors: 0 });
    expect(c3).toMatchObject({ runs: 2, hints: 0, logicErrors: 1 });
    expect(summary.firstChoices).toEqual({
      'q-two-rows': { choiceId: 'can-xac-minh', correct: true, at: expect.any(Number) },
      'q-verify': { choiceId: 'nguon-khac', correct: true, at: expect.any(Number) },
    });
    expect(summary.firstLinePicks).toEqual({ 'q-quan-lines': { lineIndex: 4, correct: true } });
    // Ba câu đọc kết quả của thử thách cũng được ghi (QĐ-043).
    const read = events.filter((e) => e.type === 'question_answered' && e.questionId.endsWith('-read'));
    expect(read.map((e) => (e.type === 'question_answered' ? e.questionId : ''))).toEqual(['q-c1-read', 'q-c2-read', 'q-c3-read']);
  });

  it('chọn SAI trước ở q-two-rows, q-verify và màn chọn dòng: vẫn tới Kết; tóm tắt ghi lựa chọn ĐẦU là lựa chọn sai', { timeout: 60_000 }, async () => {
    const store = makeStore();
    await playToEnd(store, {
      wrongFirstChoice: { 'q-two-rows': 'tim-ra-roi', 'q-verify': 'them-dieu-kien' },
      wrongFirstLine: { 'q-quan-lines': 1 },
    });
    const s = store.getState();
    expect(s.progress?.ended).toBe(true);
    expect(s.progress?.choices['q-two-rows']).toEqual({ attempts: 2, firstChoiceId: 'tim-ra-roi', resolvedChoiceId: 'can-xac-minh' });
    expect(s.progress?.choices['q-verify']).toEqual({ attempts: 2, firstChoiceId: 'them-dieu-kien', resolvedChoiceId: 'nguon-khac' });

    const summary = sessionSummary();
    expect(summary.completed).toBe(true);
    expect(summary.firstChoices).toEqual({
      'q-two-rows': { choiceId: 'tim-ra-roi', correct: false, at: expect.any(Number) },
      'q-verify': { choiceId: 'them-dieu-kien', correct: false, at: expect.any(Number) },
    });
    expect(summary.firstLinePicks).toEqual({ 'q-quan-lines': { lineIndex: 1, correct: false } });

    // Mỗi câu đo lường có đúng 2 lần trả lời: lần 1 sai (isFirstChoice), lần 2 đúng.
    const events = getTelemetryEvents().filter((e) => e.sessionId === getSessionId());
    for (const q of MEASURED_QUESTIONS) {
      const answers = events.filter((e) => e.type === 'question_answered' && e.questionId === q);
      expect(answers.map((e) => (e.type === 'question_answered' ? [e.attempt, e.correct, e.isFirstChoice] : []))).toEqual([
        [1, false, true],
        [2, true, false],
      ]);
    }
  });
});
