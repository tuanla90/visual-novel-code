/**
 * Nhảy tới đầu mỗi phần trên NỘI DUNG THẬT, chạy SQL chuẩn qua engine thật (sql.js) — chỉ bằng API
 * công khai của store/runtime. Phiên được đánh dấu "có nhảy phần"; sự kiện tự chơi bị loại khỏi tóm tắt.
 */
import { beforeEach, describe, expect, it } from 'vitest';
import { realContent } from '../content/real';
import { PART_IDS } from '../shared/ids';
import { createGameStore } from '../shared/store/store';
import { configureSessionMeta, getSessionMeta } from '../shared/telemetry/session-meta';
import { summarizeSession } from '../shared/telemetry/summary';
import { clearTelemetry, getSessionId, getTelemetryEvents } from '../shared/telemetry/track';
import { runQuery } from '../sql-challenge/engine';
import { jumpNeedsRestart, jumpToPartStart } from './facilitator-mode';

function makeStore() {
  return createGameStore({ content: realContent, persist: false });
}

describe('nhảy tới đầu mỗi phần (bảng người quan sát)', () => {
  beforeEach(() => {
    clearTelemetry();
    configureSessionMeta(null);
  });

  it('jumpNeedsRestart: lùi hoặc đứng yên thì chơi lại, tiến thì đi tiếp', () => {
    expect(jumpNeedsRestart(null, 'intro')).toBe(true);
    expect(jumpNeedsRestart('analysis', 'investigation')).toBe(true);
    expect(jumpNeedsRestart('analysis', 'analysis')).toBe(true);
    expect(jumpNeedsRestart('analysis', 'debrief')).toBe(false);
  });

  for (const target of PART_IDS) {
    it(`từ đầu game tới đầu phần ${target}: đúng phần, màn chơi được, phiên đánh dấu nhảy`, { timeout: 30_000 }, async () => {
      const store = makeStore();
      const outcome = await jumpToPartStart(target, { store, content: realContent, run: runQuery });
      expect(outcome).toMatchObject({ ok: true, target });
      const s = store.getState();
      expect(s.progress?.currentPart).toBe(target);
      const view = s.getView();
      expect(view?.kind).not.toBe('error');
      expect(view?.kind).not.toBe('end');
      const sid = getSessionId();
      const meta = getSessionMeta()[sid];
      expect(meta?.jumps).toEqual([expect.objectContaining({ target, ok: true })]);
      const summary = summarizeSession(
        sid,
        getTelemetryEvents().filter((e) => e.sessionId === sid),
        meta,
      );
      expect(summary.jumped).toBe(true);
      // Không lựa chọn "đầu tiên" nào do game tự chọn lọt vào số liệu.
      expect(summary.firstChoices).toEqual({ 'q-two-rows': null, 'q-verify': null });
      expect(summary.challenges.every((c) => !c.completed)).toBe(true);
    });
  }

  it('vật chứng tự điền bằng SQL chuẩn: tới đầu Kết có đủ bốn thẻ truy vấn, số dòng đúng', { timeout: 30_000 }, async () => {
    const store = makeStore();
    await jumpToPartStart('ending', { store, content: realContent, run: runQuery });
    const saved = store.getState().evidence.savedQueries;
    expect(saved['ev-c1-names-h']?.rowCount).toBe(10);
    expect(saved['ev-c2-classes-b']?.rowCount).toBe(2);
    expect(saved['ev-c3-shortlist']?.rowCount).toBe(2);
    expect(saved['ev-quan-fixed']).toMatchObject({ rowCount: 2, before: { rowCount: 24 } });
  });

  it('nhảy tới phần sau: giữ phiên và dữ liệu thật trước đó; nhảy lùi: phiên mới, phiên cũ kết thúc bằng game_reset', { timeout: 30_000 }, async () => {
    const store = makeStore();
    store.getState().startGame();
    store.getState().dispatchStory({ type: 'advance' });
    const first = getSessionId();
    const realBefore = getTelemetryEvents().length;

    const fwd = await jumpToPartStart('analysis', { store, content: realContent, run: runQuery });
    expect(fwd).toMatchObject({ ok: true, restarted: false });
    expect(getSessionId()).toBe(first);
    const summary = summarizeSession(
      first,
      getTelemetryEvents().filter((e) => e.sessionId === first),
      getSessionMeta()[first],
    );
    expect(summary.eventCount - summary.autoEventCount).toBeGreaterThanOrEqual(realBefore);

    const back = await jumpToPartStart('investigation', { store, content: realContent, run: runQuery });
    expect(back).toMatchObject({ ok: true, restarted: true });
    expect(getSessionId()).not.toBe(first);
    expect(getTelemetryEvents().filter((e) => e.sessionId === first).at(-1)?.type).toBe('game_reset');
    expect(store.getState().progress?.currentPart).toBe('investigation');
  });
});
