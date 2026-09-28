/**
 * Tóm tắt chỉ số §10 theo từng phiên (hàm thuần, có test với dữ liệu giả).
 *
 * - Thời gian từng phần (`part_complete.durationMs`).
 * - Mỗi thử thách: số lần chạy, số gợi ý, lỗi cú pháp/logic, thời gian đến lần chạy đầu, thời gian
 *   hoàn thành.
 * - Lựa chọn ĐẦU TIÊN ở `q-two-rows` và `q-verify`: nhiều bản ghi `isFirstChoice` cho cùng câu
 *   (ví dụ tải lại trang) → lấy bản SỚM NHẤT.
 * - Hoàn thành game, thời lượng; khảo sát đầu (Excel, SQL); khảo sát cuối (muốn chơi tiếp, phần đáng nhớ).
 * - Phiên có nhảy phần (người quan sát): sự kiện trong khoảng game tự chơi bị loại khỏi số liệu và
 *   tóm tắt ghi rõ "có nhảy phần".
 */
import { CHALLENGE_IDS, PART_IDS, type ChallengeId, type PartId } from '../ids';
import type { ExcelLevel, MemorablePart, PlayNext, SqlBefore, TelemetryEvent } from './events';
import { groupBySession } from './export';
import type { SessionMeta, SessionMetaMap } from './session-meta';

/** Hai câu đo lường chính (QĐ-035, §9.3, §10). */
export const MEASURED_QUESTIONS = ['q-two-rows', 'q-verify'] as const;
export type MeasuredQuestionId = (typeof MEASURED_QUESTIONS)[number];

/** Ngưỡng "hoàn thành trong 35 phút" (§10). */
export const TARGET_DURATION_MS = 35 * 60 * 1000;

export interface PartSummary {
  part: PartId;
  started: boolean;
  /** Thời lượng phần (lần hoàn thành thật đầu tiên); null nếu chưa xong hoặc bị nhảy qua. */
  durationMs: number | null;
  /** Phần được game tự chơi qua khi người quan sát nhảy phần. */
  skippedByJump: boolean;
}

export interface ChallengeSummary {
  challengeId: ChallengeId;
  started: boolean;
  runs: number;
  hints: number;
  syntaxErrors: number;
  logicErrors: number;
  msToFirstRun: number | null;
  durationMs: number | null;
  completed: boolean;
  skippedByJump: boolean;
}

export interface FirstChoice {
  choiceId: string;
  correct: boolean;
  at: number;
}

export interface SessionSummary {
  sessionId: string;
  firstAt: number | null;
  lastAt: number | null;
  eventCount: number;
  /** Số sự kiện do game tự chơi khi nhảy phần (không tính vào chỉ số). */
  autoEventCount: number;
  started: boolean;
  completed: boolean;
  gameDurationMs: number | null;
  /** Hoàn thành trong 35 phút; null nếu chưa hoàn thành hoặc có nhảy phần (không so được). */
  within35Min: boolean | null;
  reset: boolean;
  jumped: boolean;
  jumpTargets: PartId[];
  parts: PartSummary[];
  challenges: ChallengeSummary[];
  firstChoices: Record<MeasuredQuestionId, FirstChoice | null>;
  /** Lần chọn dòng đầu tiên trên màn chiếu (tham khảo cho chỉ số AND/OR). */
  firstLinePicks: Record<string, { lineIndex: number; correct: boolean } | null>;
  notebookOpens: number;
  /** Điều khiển kiểu Visual Novel (số lần bật Auto/Skip, mở lịch sử thoại, lưu/nạp). */
  vn: { autoOn: number; skipOn: number; backlogOpens: number; saves: number; loads: number; textSpeed: string | null };
  /** Có nạp ô lưu → thời lượng không so trực tiếp được với người chơi một mạch. */
  loadedSave: boolean;
  pre: { status: 'submitted' | 'skipped' | 'none'; excelLevel: ExcelLevel | null; sqlBefore: SqlBefore | null };
  post: {
    status: 'submitted' | 'skipped' | 'none';
    memorable: MemorablePart[];
    annoying: MemorablePart | null;
    playNext: PlayNext | null;
    /** "Màn phản bác" nằm trong hai phần đáng nhớ (§10); null nếu chưa trả lời. */
    rebutInTop2: boolean | null;
  };
}

/** Sự kiện do game tự chơi khi nhảy phần: theo chỉ số trong phiên (thứ tự ghi). */
function isAutoFactory(events: readonly TelemetryEvent[], meta: SessionMeta | undefined): (e: TelemetryEvent) => boolean {
  const jumps = meta?.jumps ?? [];
  if (jumps.length === 0) return () => false;
  const auto = new Set(events.filter((_, i) => jumps.some((j) => i >= j.fromIndex && i < j.toIndex)));
  return (e) => auto.has(e);
}

/** Phần tử sớm nhất theo `at` (bằng nhau thì giữ thứ tự ghi). */
function earliest<T extends { at: number }>(list: T[]): T | undefined {
  let best: T | undefined;
  for (const x of list) if (!best || x.at < best.at) best = x;
  return best;
}

type Of<T extends TelemetryEvent['type']> = Extract<TelemetryEvent, { type: T }>;
const ofType =
  <T extends TelemetryEvent['type']>(type: T) =>
  (e: TelemetryEvent): e is Of<T> =>
    e.type === type;

export function summarizeSession(sessionId: string, events: readonly TelemetryEvent[], meta?: SessionMeta): SessionSummary {
  const all = [...events];
  const isAuto = isAutoFactory(all, meta);
  const real = all.filter((e) => !isAuto(e));
  const jumped = (meta?.jumps.length ?? 0) > 0;

  const parts: PartSummary[] = PART_IDS.map((part) => {
    const starts = all.filter(ofType('part_start')).filter((e) => e.part === part);
    const completes = all.filter(ofType('part_complete')).filter((e) => e.part === part);
    const realComplete = earliest(completes.filter((e) => !isAuto(e)));
    return {
      part,
      started: starts.length > 0,
      durationMs: realComplete?.durationMs ?? null,
      skippedByJump: completes.length > 0 && !realComplete,
    };
  });

  const challenges: ChallengeSummary[] = CHALLENGE_IDS.map((challengeId) => {
    const mine = <T extends { challengeId: ChallengeId }>(list: T[]) => list.filter((e) => e.challengeId === challengeId);
    const runs = mine(real.filter(ofType('query_run')));
    const autoComplete = mine(all.filter(ofType('challenge_complete'))).some((e) => isAuto(e));
    const complete = earliest(mine(real.filter(ofType('challenge_complete'))));
    return {
      challengeId,
      started: mine(all.filter(ofType('challenge_start'))).length > 0,
      runs: runs.length,
      hints: mine(real.filter(ofType('hint_used'))).length,
      syntaxErrors: runs.filter((r) => r.errorClass === 'syntax').length,
      logicErrors: runs.filter((r) => r.errorClass === 'logic').length,
      msToFirstRun: earliest(mine(real.filter(ofType('first_run'))))?.msSinceStart ?? null,
      durationMs: complete?.durationMs ?? null,
      completed: complete !== undefined,
      skippedByJump: autoComplete && !complete,
    };
  });

  const answered = real.filter(ofType('question_answered')).filter((e) => e.isFirstChoice);
  const firstChoices = Object.fromEntries(
    MEASURED_QUESTIONS.map((q) => {
      const first = earliest(answered.filter((e) => e.questionId === q));
      return [q, first ? { choiceId: first.choiceId, correct: first.correct, at: first.at } : null];
    }),
  ) as Record<MeasuredQuestionId, FirstChoice | null>;

  const picks = real.filter(ofType('line_picked')).filter((e) => e.isFirstChoice);
  const firstLinePicks: SessionSummary['firstLinePicks'] = {};
  for (const id of new Set(all.filter(ofType('line_picked')).map((e) => e.pickId))) {
    const first = earliest(picks.filter((e) => e.pickId === id));
    firstLinePicks[id] = first ? { lineIndex: first.lineIndex, correct: first.correct } : null;
  }

  const complete = earliest(all.filter(ofType('game_complete')));
  const gameDurationMs = complete?.durationMs ?? null;

  const surveys = real.filter((e): e is Of<'survey_submitted'> | Of<'survey_skipped'> => e.type === 'survey_submitted' || e.type === 'survey_skipped');
  const lastOf = (stage: 'pre' | 'post') => {
    const submitted = surveys.filter((e): e is Of<'survey_submitted'> => e.type === 'survey_submitted' && e.stage === stage).at(-1);
    const skipped = surveys.some((e) => e.type === 'survey_skipped' && e.stage === stage);
    return { submitted, status: submitted ? ('submitted' as const) : skipped ? ('skipped' as const) : ('none' as const) };
  };
  const preS = lastOf('pre');
  const postS = lastOf('post');
  const preAnswers = preS.submitted?.stage === 'pre' ? preS.submitted.answers : null;
  const postAnswers = postS.submitted?.stage === 'post' ? postS.submitted.answers : null;

  return {
    sessionId,
    firstAt: all[0]?.at ?? null,
    lastAt: all.at(-1)?.at ?? null,
    eventCount: all.length,
    autoEventCount: all.length - real.length,
    started: all.some((e) => e.type === 'game_start'),
    completed: complete !== undefined,
    gameDurationMs,
    within35Min: gameDurationMs === null || jumped ? null : gameDurationMs <= TARGET_DURATION_MS,
    reset: all.some((e) => e.type === 'game_reset'),
    jumped,
    jumpTargets: meta?.jumps.map((j) => j.target) ?? [],
    parts,
    challenges,
    firstChoices,
    firstLinePicks,
    notebookOpens: real.filter((e) => e.type === 'notebook_opened').length,
    vn: {
      autoOn: real.filter((e) => e.type === 'vn_mode_toggled' && e.mode === 'auto' && e.on).length,
      skipOn: real.filter((e) => e.type === 'vn_mode_toggled' && e.mode === 'skip' && e.on).length,
      backlogOpens: real.filter((e) => e.type === 'backlog_opened').length,
      saves: real.filter((e) => e.type === 'progress_saved').length,
      loads: real.filter((e) => e.type === 'progress_loaded').length,
      textSpeed: real.filter(ofType('text_speed_changed')).at(-1)?.speed ?? null,
    },
    loadedSave: real.some((e) => e.type === 'progress_loaded'),
    pre: { status: preS.status, excelLevel: preAnswers?.excelLevel ?? null, sqlBefore: preAnswers?.sqlBefore ?? null },
    post: {
      status: postS.status,
      memorable: postAnswers?.memorable ?? [],
      annoying: postAnswers?.annoying ?? null,
      playNext: postAnswers?.playNext ?? null,
      rebutInTop2: postAnswers ? postAnswers.memorable.includes('rebut-quan') : null,
    },
  };
}

/** Tóm tắt mọi phiên theo thứ tự xuất hiện. */
export function summarizeSessions(events: readonly TelemetryEvent[], meta: SessionMetaMap = {}): SessionSummary[] {
  return [...groupBySession(events)].map(([id, list]) => summarizeSession(id, list, meta[id]));
}

/** "12 phút 05 giây" / "45 giây" / "—". */
export function formatDuration(ms: number | null): string {
  if (ms === null || !Number.isFinite(ms) || ms < 0) return '—';
  const total = Math.round(ms / 1000);
  const m = Math.floor(total / 60);
  const s = total % 60;
  return m > 0 ? `${m} phút ${String(s).padStart(2, '0')} giây` : `${s} giây`;
}
