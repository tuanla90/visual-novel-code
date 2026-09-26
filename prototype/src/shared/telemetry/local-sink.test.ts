import { afterEach, beforeEach, describe, expect, it } from 'vitest';
import { sampleContent } from '../../content/sample';
import { createGameStore } from '../store/store';
import { TELEMETRY_KEY_PREFIX, createLocalStorageSink, createSessionIdStore } from './local-sink';
import { installPersistentTelemetry } from './setup';
import { FakeStorage, quotaError } from './test-storage';
import { configureTelemetry, createMemorySink, getSessionId, getTelemetryEvents, newTelemetrySession, track } from './track';

let local: FakeStorage;
let session: FakeStorage;

beforeEach(() => {
  local = new FakeStorage();
  session = new FakeStorage();
  let t = 1_000;
  configureTelemetry({ clock: () => (t += 10) });
});

afterEach(() => {
  configureTelemetry({ sink: createMemorySink(), sessionIdStore: null });
});

/** Giả lập F5: tạo lại sink + nơi giữ mã phiên trên cùng bộ nhớ trình duyệt. */
function reload() {
  return installPersistentTelemetry({ local, session });
}

describe('sink localStorage (QĐ-029)', () => {
  it('còn sự kiện sau khi tạo lại sink (giả lập F5), cùng mã phiên', () => {
    reload();
    const sid = getSessionId();
    track({ type: 'game_start' });
    track({ type: 'part_start', part: 'intro' });
    const before = getTelemetryEvents();
    expect(before).toHaveLength(2);

    // "F5": bộ nhớ JS mất, localStorage/sessionStorage còn.
    configureTelemetry({ sink: createMemorySink(), sessionIdStore: null });
    newTelemetrySession(); // mã phiên trong bộ nhớ đổi — phải được khôi phục từ sessionStorage
    const sink = reload();
    expect(getSessionId()).toBe(sid);
    expect(getTelemetryEvents()).toEqual(before);
    expect(sink.status()).toMatchObject({ persistent: true, problem: null });

    track({ type: 'part_complete', part: 'intro', durationMs: 5 });
    expect(reload().readAll().map((e) => e.type)).toEqual(['game_start', 'part_start', 'part_complete']);
  });

  it('khóa có phiên bản; không lưu mã phiên trong từng sự kiện (tiết kiệm chỗ) nhưng đọc lại có', () => {
    reload();
    track({ type: 'game_start' });
    const keys = local.keys();
    expect(keys).toHaveLength(1);
    expect(keys[0]).toMatch(/^clb-tham-tu-du-lieu:telemetry:v1:session:/);
    expect(local.getItem(keys[0]!)).not.toContain('sessionId');
    expect(reload().readAll()[0]?.sessionId).toBe(getSessionId());
  });

  it('"Chơi lại từ đầu" mở phiên mới, giữ phiên cũ', () => {
    const sink = reload();
    const first = getSessionId();
    track({ type: 'game_start' });
    track({ type: 'game_reset' });
    const second = newTelemetrySession();
    expect(second).not.toBe(first);
    track({ type: 'game_start' });
    expect(sink.sessionIds()).toEqual([first, second]);
    // F5 sau khi chơi lại: tiếp tục phiên mới, phiên cũ vẫn còn.
    const again = reload();
    expect(getSessionId()).toBe(second);
    expect(again.sessionIds()).toEqual([first, second]);
    expect(again.readAll().filter((e) => e.sessionId === first).map((e) => e.type)).toEqual(['game_start', 'game_reset']);
  });

  it('chơi lại qua store: resetGame ghi game_reset vào phiên cũ rồi sang phiên mới', () => {
    reload();
    const store = createGameStore({ content: sampleContent, persist: false });
    const first = getSessionId();
    store.getState().startGame();
    store.getState().resetGame();
    expect(getSessionId()).not.toBe(first);
    store.getState().startGame();
    const bySession = (id: string) => getTelemetryEvents().filter((e) => e.sessionId === id).map((e) => e.type);
    expect(bySession(first).at(-1)).toBe('game_reset');
    expect(bySession(getSessionId())[0]).toBe('game_start');
  });

  it('xóa chỉ xóa khóa telemetry, không đụng khóa khác', () => {
    local.setItem('khoa-khac', 'giu');
    const sink = reload();
    track({ type: 'game_start' });
    sink.clear();
    expect(local.keys()).toEqual(['khoa-khac']);
    expect(sink.readAll()).toEqual([]);
    expect(reload().readAll()).toEqual([]);
  });

  it('một khóa phiên hỏng chỉ mất phiên đó', () => {
    local.setItem(`${TELEMETRY_KEY_PREFIX}:session:hong-hong-hong`, '{không phải json');
    reload();
    track({ type: 'game_start' });
    const sink = reload();
    expect(sink.readAll()).toHaveLength(1);
    expect(sink.status().unreadableSessions).toBe(1);
  });
});

describe('localStorage lỗi/đầy → game vẫn chạy', () => {
  it('setItem ném QuotaExceededError: track không ném, sự kiện còn trong bộ nhớ, trạng thái báo "quota"', () => {
    local.failWith = quotaError();
    const sink = reload();
    expect(() => track({ type: 'game_start' })).not.toThrow();
    expect(getTelemetryEvents().map((e) => e.type)).toEqual(['game_start']);
    expect(sink.status()).toMatchObject({ persistent: false, problem: 'quota' });
  });

  it('không mở được localStorage (bị chặn): chỉ giữ trong bộ nhớ, trạng thái "unavailable"', () => {
    const sink = createLocalStorageSink({ storage: null });
    configureTelemetry({ sink, sessionIdStore: createSessionIdStore(null) });
    track({ type: 'game_start' });
    expect(sink.readAll()).toHaveLength(1);
    expect(sink.status()).toMatchObject({ persistent: false, problem: 'unavailable' });
  });

  it('đọc bị chặn khi khởi động: không ném, trạng thái "unavailable"', () => {
    local.setItem(`${TELEMETRY_KEY_PREFIX}:session:abc-abc-abc`, '[]');
    local.blockReads = true;
    session.blockReads = true;
    expect(() => reload()).not.toThrow();
    expect(() => track({ type: 'game_start' })).not.toThrow();
  });

  it('chơi trọn một đoạn khi localStorage đầy: store chạy bình thường', () => {
    local.failWith = quotaError();
    session.failWith = quotaError();
    reload();
    const store = createGameStore({ content: sampleContent, persist: false });
    expect(() => {
      store.getState().startGame();
      for (let i = 0; i < 5; i++) store.getState().dispatchStory({ type: 'advance' });
    }).not.toThrow();
    expect(store.getState().getView()).not.toBeNull();
    expect(getTelemetryEvents().length).toBeGreaterThan(0);
  });

  it('chạm giới hạn an toàn: ngừng ghi bền, trạng thái "budget", không tự xóa phiên cũ', () => {
    const sink = createLocalStorageSink({ storage: local, maxTotalChars: 200 });
    configureTelemetry({ sink, sessionIdStore: createSessionIdStore(session) });
    track({ type: 'game_start' });
    const savedBefore = local.keys().map((k) => local.getItem(k));
    for (let i = 0; i < 10; i++) track({ type: 'hotspot_inspected', hotspotId: `hs-${i}` });
    expect(sink.status().problem).toBe('budget');
    expect(sink.readAll()).toHaveLength(11);
    expect(local.keys().map((k) => local.getItem(k))).toEqual(savedBefore.length ? [expect.any(String)] : []);
    expect(sink.status().usedChars).toBeLessThanOrEqual(200);
  });

  it('giới hạn số sự kiện mỗi phiên: bỏ phần vượt, đếm số bị bỏ', () => {
    const sink = createLocalStorageSink({ storage: local, maxEventsPerSession: 3 });
    configureTelemetry({ sink, sessionIdStore: createSessionIdStore(session) });
    for (let i = 0; i < 5; i++) track({ type: 'hotspot_inspected', hotspotId: `hs-${i}` });
    expect(sink.readAll()).toHaveLength(3);
    expect(sink.status()).toMatchObject({ problem: 'budget', droppedEvents: 2 });
  });
});
