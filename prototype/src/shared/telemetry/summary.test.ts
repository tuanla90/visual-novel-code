import { describe, expect, it } from 'vitest';
import type { TelemetryEvent, TelemetryEventBody } from './events';
import { formatDuration, summarizeSession, summarizeSessions } from './summary';

let clock = 0;
function mk(sessionId: string) {
  return (body: TelemetryEventBody, at?: number): TelemetryEvent => {
    clock = at ?? clock + 1_000;
    return { ...body, at: clock, sessionId } as TelemetryEvent;
  };
}

const run = (challengeId: 'c1' | 'c2' | 'c3' | 'debrief-fix', attempt: number, errorClass: 'syntax' | 'logic' | null): TelemetryEventBody => ({
  type: 'query_run',
  challengeId,
  mode: 'builder',
  attempt,
  rowCount: errorClass === 'syntax' ? null : 10,
  status: errorClass === 'syntax' ? 'error' : errorClass === 'logic' ? 'incorrect' : 'correct',
  primaryCode: null,
  errorClass,
  connector: null,
  msSinceStart: attempt * 10_000,
});

/** Phiên thật, đủ các chỉ số; có hai bản ghi isFirstChoice cho q-two-rows (tải lại trang). */
function fullSession(): TelemetryEvent[] {
  clock = 0;
  const e = mk('s-full');
  return [
    e({ type: 'survey_submitted', stage: 'pre', answers: { excelLevel: 'basic', sqlBefore: 'no' } }),
    e({ type: 'game_start' }),
    e({ type: 'part_start', part: 'intro' }),
    e({ type: 'notebook_opened', part: 'intro' }),
    e({ type: 'part_complete', part: 'intro', durationMs: 60_000 }),
    e({ type: 'part_start', part: 'investigation' }),
    e({ type: 'challenge_start', challengeId: 'c1' }),
    e({ type: 'first_run', challengeId: 'c1', msSinceStart: 30_000 }),
    e(run('c1', 1, 'syntax')),
    e({ type: 'hint_used', challengeId: 'c1', level: 1, count: 1 }),
    e(run('c1', 2, 'logic')),
    e({ type: 'hint_used', challengeId: 'c1', level: 2, count: 2 }),
    e(run('c1', 3, null)),
    e({ type: 'challenge_complete', challengeId: 'c1', durationMs: 90_000, runs: 3, hintsUsed: 2 }),
    e({ type: 'part_complete', part: 'investigation', durationMs: 300_000 }),
    e({ type: 'part_start', part: 'debrief' }),
    e({ type: 'question_answered', questionId: 'q-two-rows', choiceId: 'tim-ra-roi', attempt: 1, correct: false, isFirstChoice: true }),
    e({ type: 'question_answered', questionId: 'q-two-rows', choiceId: 'can-xac-minh', attempt: 2, correct: true, isFirstChoice: false }),
    // Tải lại trang: câu hỏi hiện lại, lại ghi một bản "đầu tiên" — phải bỏ qua bản này.
    e({ type: 'question_answered', questionId: 'q-two-rows', choiceId: 'can-xac-minh', attempt: 1, correct: true, isFirstChoice: true }),
    e({ type: 'question_answered', questionId: 'q-verify', choiceId: 'nguon-khac', attempt: 1, correct: true, isFirstChoice: true }),
    e({ type: 'line_picked', pickId: 'pick-or-line', lineIndex: 3, attempt: 1, correct: true, isFirstChoice: true }),
    e({ type: 'part_complete', part: 'debrief', durationMs: 400_000 }),
    e({ type: 'game_complete', durationMs: 30 * 60_000 }),
    e({ type: 'survey_submitted', stage: 'post', answers: { memorable: ['rebut-quan', 'clues'], annoying: null, playNext: 'yes' } }),
  ];
}

describe('tóm tắt chỉ số §10 theo phiên', () => {
  it('phiên thật: thời gian phần, thử thách, lựa chọn đầu, hoàn thành, khảo sát', () => {
    const s = summarizeSession('s-full', fullSession());
    expect(s.started).toBe(true);
    expect(s.completed).toBe(true);
    expect(s.gameDurationMs).toBe(30 * 60_000);
    expect(s.within35Min).toBe(true);
    expect(s.jumped).toBe(false);
    expect(s.parts.map((p) => [p.part, p.durationMs])).toEqual([
      ['intro', 60_000],
      ['investigation', 300_000],
      ['analysis', null],
      ['debrief', 400_000],
      ['ending', null],
    ]);
    const c1 = s.challenges.find((c) => c.challengeId === 'c1');
    expect(c1).toMatchObject({ runs: 3, hints: 2, syntaxErrors: 1, logicErrors: 1, msToFirstRun: 30_000, durationMs: 90_000, completed: true });
    expect(s.challenges.find((c) => c.challengeId === 'c2')).toMatchObject({ started: false, runs: 0, completed: false });
    expect(s.firstChoices['q-verify']).toMatchObject({ choiceId: 'nguon-khac', correct: true });
    expect(s.firstLinePicks).toEqual({ 'pick-or-line': { lineIndex: 3, correct: true } });
    expect(s.notebookOpens).toBe(1);
    expect(s.pre).toEqual({ status: 'submitted', excelLevel: 'basic', sqlBefore: 'no' });
    expect(s.post).toEqual({ status: 'submitted', memorable: ['rebut-quan', 'clues'], annoying: null, playNext: 'yes', rebutInTop2: true });
  });

  it('nhiều bản ghi isFirstChoice cho cùng câu (tải lại trang) → lấy bản SỚM NHẤT', () => {
    const s = summarizeSession('s-full', fullSession());
    expect(s.firstChoices['q-two-rows']).toMatchObject({ choiceId: 'tim-ra-roi', correct: false });
  });

  it('bản sớm nhất theo thời điểm, kể cả khi thứ tự ghi bị đảo', () => {
    const e = mk('s-dao');
    const later = e({ type: 'question_answered', questionId: 'q-verify', choiceId: 'goi-ca-hai', attempt: 1, correct: false, isFirstChoice: true }, 9_000);
    const earlier = e({ type: 'question_answered', questionId: 'q-verify', choiceId: 'nguon-khac', attempt: 1, correct: true, isFirstChoice: true }, 5_000);
    expect(summarizeSession('s-dao', [later, earlier]).firstChoices['q-verify']?.choiceId).toBe('nguon-khac');
  });

  it('phiên có nhảy phần: ghi rõ, loại sự kiện game tự chơi khỏi chỉ số', () => {
    const e = mk('s-jump');
    const events = [
      e({ type: 'game_start' }, 5_000),
      e({ type: 'part_start', part: 'intro' }, 5_010),
      e({ type: 'part_complete', part: 'intro', durationMs: 20 }, 5_020),
      e({ type: 'part_start', part: 'investigation' }, 5_030),
      e({ type: 'challenge_start', challengeId: 'c1' }, 5_040),
      e({ type: 'challenge_complete', challengeId: 'c1', durationMs: 5, runs: 0, hintsUsed: 0 }, 5_050),
      e({ type: 'question_answered', questionId: 'q-two-rows', choiceId: 'can-xac-minh', attempt: 1, correct: true, isFirstChoice: true }, 5_060),
      e({ type: 'part_complete', part: 'investigation', durationMs: 30 }, 5_070),
      e({ type: 'part_start', part: 'analysis' }, 5_080),
      // Người chơi thật chơi tiếp từ đầu Phần 3.
      e({ type: 'challenge_start', challengeId: 'c3' }, 60_000),
      e({ type: 'first_run', challengeId: 'c3', msSinceStart: 12_000 }, 72_000),
      e(run('c3', 1, null), 72_000),
      e({ type: 'challenge_complete', challengeId: 'c3', durationMs: 40_000, runs: 1, hintsUsed: 0 }, 100_000),
      e({ type: 'part_complete', part: 'analysis', durationMs: 200_000 }, 205_080),
    ];
    const s = summarizeSession('s-jump', events, { jumps: [{ target: 'analysis', startAt: 5_000, endAt: 5_080, ok: true }] });
    expect(s.jumped).toBe(true);
    expect(s.jumpTargets).toEqual(['analysis']);
    expect(s.autoEventCount).toBe(9);
    expect(s.parts.find((p) => p.part === 'intro')).toMatchObject({ durationMs: null, skippedByJump: true });
    expect(s.parts.find((p) => p.part === 'analysis')).toMatchObject({ durationMs: 200_000, skippedByJump: false });
    expect(s.challenges.find((c) => c.challengeId === 'c1')).toMatchObject({ completed: false, skippedByJump: true });
    expect(s.challenges.find((c) => c.challengeId === 'c3')).toMatchObject({ runs: 1, msToFirstRun: 12_000, durationMs: 40_000, completed: true });
    // Câu trả lời do game tự chọn không được tính là lựa chọn đầu của người chơi.
    expect(s.firstChoices['q-two-rows']).toBeNull();
    expect(s.within35Min).toBeNull();
  });

  it('phiên chơi lại/chưa xong: đặt lại, chưa hoàn thành, chưa khảo sát; khảo sát cuối bỏ qua', () => {
    const e = mk('s-reset');
    const s = summarizeSession('s-reset', [
      e({ type: 'survey_skipped', stage: 'pre' }),
      e({ type: 'game_start' }),
      e({ type: 'survey_skipped', stage: 'post' }),
      e({ type: 'game_reset' }),
    ]);
    expect(s).toMatchObject({ reset: true, completed: false, gameDurationMs: null, within35Min: null });
    expect(s.pre.status).toBe('skipped');
    expect(s.post).toMatchObject({ status: 'skipped', rebutInTop2: null, playNext: null });
  });

  it('nhiều phiên: tách theo mã phiên, giữ thứ tự', () => {
    const events = [...fullSession(), mk('s-b')({ type: 'game_start' })];
    expect(summarizeSessions(events).map((s) => [s.sessionId, s.eventCount])).toEqual([
      ['s-full', 24],
      ['s-b', 1],
    ]);
  });

  it('định dạng thời lượng', () => {
    expect(formatDuration(null)).toBe('—');
    expect(formatDuration(45_000)).toBe('45 giây');
    expect(formatDuration(12 * 60_000 + 5_000)).toBe('12 phút 05 giây');
  });
});
