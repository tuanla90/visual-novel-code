import { beforeEach, describe, expect, it } from 'vitest';
import { sampleContent } from '../../content/sample';
import { clearTelemetry, getTelemetryEvents } from '../telemetry/track';
import { STORE_VERSION, createGameStore, initialGameData, migrate } from './store';

const KEY = 'test-store';

function makeStore(persistOn = true) {
  let t = 10_000;
  return createGameStore({ content: sampleContent, now: () => (t += 1_000), storageKey: KEY, persist: persistOn });
}

describe('store zustand + persist sessionStorage', () => {
  beforeEach(() => {
    sessionStorage.clear();
    clearTelemetry();
  });

  it('bắt đầu game: progress có, khung nhìn là lời đầu, telemetry game_start', () => {
    const store = makeStore();
    expect(store.getState().progress).toBeNull();
    expect(store.getState().getView()).toBeNull();
    store.getState().startGame();
    const view = store.getState().getView();
    expect(view?.kind).toBe('line');
    expect(getTelemetryEvents().map((e) => e.type)).toContain('game_start');
  });

  it('dispatchStory áp hiệu ứng: mở tài liệu vào Hồ sơ, manh mối khi quay về, từ chối hành động sai', () => {
    const store = makeStore();
    const s = store.getState;
    s().startGame();
    for (let i = 0; i < 10 && s().getView()?.kind === 'line'; i++) s().dispatchStory({ type: 'advance' });
    expect(s().getView()?.kind).toBe('explore');
    expect(s().dispatchStory({ type: 'proceed' })).toMatch(/thiếu/);
    expect(s().dispatchStory({ type: 'inspect', hotspotId: 'hs-letter' })).toBeUndefined();
    expect(s().getView()?.kind).toBe('show-document');
    s().dispatchStory({ type: 'complete' });
    expect(s().hasEvidence('doc-letter')).toBe(true);
    for (let i = 0; i < 10 && s().getView()?.kind === 'line'; i++) s().dispatchStory({ type: 'advance' });
    s().dispatchStory({ type: 'choose', choiceId: 'ten' });
    for (let i = 0; i < 10 && s().getView()?.kind !== 'explore'; i++) s().dispatchStory({ type: 'advance' });
    expect(s().hasEvidence('clue-signature-h')).toBe(true);
    expect(s().evidence.unlocked).toEqual(['doc-letter', 'clue-signature-h']);
  });

  it('ghi sessionStorage với version; nạp lại từ storage khôi phục tiến độ', () => {
    const store = makeStore();
    store.getState().startGame();
    store.getState().dispatchStory({ type: 'advance' });
    const raw = sessionStorage.getItem(KEY);
    expect(raw).not.toBeNull();
    const parsed = JSON.parse(raw ?? '{}') as { version: number; state: { progress: { cursor: { nodeIndex: number } } } };
    expect(parsed.version).toBe(STORE_VERSION);
    expect(parsed.state.progress.cursor.nodeIndex).toBe(3);
    // Không lưu hàm
    expect(Object.keys(parsed.state).sort()).toEqual(['challenges', 'evidence', 'progress', 'survey']);

    const again = makeStore();
    expect(again.getState().progress?.cursor.nodeIndex).toBe(3);
  });

  it('thử thách: mở (model nạp sẵn với debrief-fix), chạy, gợi ý, hoàn thành → vật chứng + telemetry', () => {
    const store = makeStore();
    const s = store.getState;
    s().openChallenge('debrief-fix');
    const st = s().challenges['debrief-fix'];
    expect(st?.model.connector).toBe('OR');
    expect(st?.model.conditions).toHaveLength(3);
    expect(st?.status).toBe('in-progress');
    s().openChallenge('c1');
    expect(s().challenges.c1?.guideStep).toBe(1);
    expect(s().challenges.c1?.model.table).toBeNull();

    s().recordRun('c1', { mode: 'builder', sql: 'SELECT * FROM sinh_vien', status: 'incorrect', rowCount: 40, primaryCode: 'no-filter', connector: null });
    expect(s().useHint('c1')).toBe(1);
    expect(s().useHint('c1')).toBe(2);
    expect(s().useHint('c1')).toBe(3);
    expect(s().useHint('c1')).toBe(3);
    expect(s().challenges.c1?.hintsUsed).toBe(4);
    s().recordRun('c1', { mode: 'sql', sql: "SELECT ma_sv, ho_dem, ten FROM sinh_vien WHERE ten LIKE 'H%'", status: 'correct', rowCount: 10, primaryCode: null, connector: null });
    expect(s().challenges.c1?.status).toBe('correct');
    expect(s().challenges.c1?.runs).toBe(2);
    s().completeChallenge('c1', { id: 'ev-c1-names-h', challengeId: 'c1', sql: 'x', columns: ['ten'], rows: [['Hoài']], rowCount: 1, savedAt: 1 });
    expect(s().challenges.c1?.status).toBe('completed');
    expect(s().hasEvidence('ev-c1-names-h')).toBe(true);
    expect(s().evidence.savedQueries['ev-c1-names-h']?.rowCount).toBe(1);

    const types = getTelemetryEvents().map((e) => e.type);
    expect(types).toEqual([
      'challenge_start',
      'challenge_start',
      'first_run',
      'query_run',
      'hint_used',
      'hint_used',
      'hint_used',
      'hint_used',
      'query_run',
      'challenge_complete',
      'evidence_unlocked',
    ]);
    const runs = getTelemetryEvents().filter((e) => e.type === 'query_run');
    expect(runs[0]).toEqual(expect.objectContaining({ attempt: 1, errorClass: 'logic', primaryCode: 'no-filter' }));
    expect(runs[1]).toEqual(expect.objectContaining({ attempt: 2, errorClass: null, status: 'correct' }));
  });

  it('khảo sát và resetGame', () => {
    const store = makeStore();
    const s = store.getState;
    s().submitSurvey('pre', { excelLevel: 'basic', sqlBefore: 'no' });
    s().skipSurvey('post');
    expect(s().survey.pre?.excelLevel).toBe('basic');
    expect(s().survey.postSkipped).toBe(true);
    s().startGame();
    s().resetGame();
    expect(s().progress).toBeNull();
    expect(s().survey).toEqual(initialGameData().survey);
    expect(getTelemetryEvents().at(-1)?.type).toBe('game_reset');
  });

  it('migrate: version khác hoặc dữ liệu hỏng → trạng thái mới', () => {
    expect(migrate({ garbage: true }, STORE_VERSION)).toEqual(initialGameData());
    expect(migrate(initialGameData(), 0)).toEqual(initialGameData());
    const data = initialGameData();
    expect(migrate(data, STORE_VERSION)).toBe(data);
  });
});
