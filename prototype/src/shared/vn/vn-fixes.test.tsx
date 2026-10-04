/**
 * Hồi quy cho các lỗi của bộ tính năng Visual Novel: chữ hiện dần bị kéo lùi, Skip đứng sau một câu,
 * Auto/Skip chạy ngầm sau lớp phủ, Skip tua cả thoại chưa đọc, ô lưu thiếu trạng thái thử thách.
 */
import { act, render, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { DialogueLine } from '../../story/types';
import type { StoryProgress } from '../../story/engine/state';
import { DialogBox } from '../ui/DialogBox';
import { useTypewriter } from '../ui/use-typewriter';
import { readLineKey, SAVE_SLOT_COUNT, useVnStore } from './vn-store';
import { STORE_VERSION } from '../store/store';

const A: DialogueLine = { speaker: 'minh-anh', expression: 'neutral', text: 'Câu thứ nhất.' };
const B: DialogueLine = { speaker: 'ha-vy', expression: 'neutral', text: 'Câu thứ hai, dài hơn một chút.' };

beforeEach(() => {
  vi.useFakeTimers();
  useVnStore.getState().resetSession();
});
afterEach(() => {
  vi.useRealTimers();
});

describe('useTypewriter', () => {
  it('bấm hiện hết câu thì chữ không bị nhịp sau kéo lùi lại', () => {
    const { result } = renderHook(() => useTypewriter({ text: 'Xin chào các bạn', speedMs: 20 }));
    act(() => vi.advanceTimersByTime(60));
    expect(result.current.isDone).toBe(false);
    act(() => result.current.completeImmediately());
    expect(result.current.displayedText).toBe('Xin chào các bạn');
    act(() => vi.advanceTimersByTime(200));
    expect(result.current.isDone).toBe(true);
    expect(result.current.displayedText).toBe('Xin chào các bạn');
  });
});

describe('DialogBox — Auto/Skip', () => {
  it('Skip tua liên tiếp qua các câu đã đọc (không đứng lại sau câu đầu vì chống bấm đúp)', () => {
    useVnStore.getState().markRead(readLineKey(A.speaker, A.text));
    useVnStore.getState().markRead(readLineKey(B.speaker, B.text));
    const onAdvance = vi.fn();
    const { rerender } = render(<DialogBox line={A} onAdvance={onAdvance} />);
    act(() => useVnStore.getState().setSkipMode(true));
    act(() => vi.advanceTimersByTime(100));
    expect(onAdvance).toHaveBeenCalledTimes(1);
    rerender(<DialogBox line={B} onAdvance={onAdvance} />);
    act(() => vi.advanceTimersByTime(100));
    expect(onAdvance).toHaveBeenCalledTimes(2);
  });

  it('Skip tự tắt khi gặp câu chưa đọc', () => {
    const onAdvance = vi.fn();
    render(<DialogBox line={A} onAdvance={onAdvance} />);
    act(() => useVnStore.getState().setSkipMode(true));
    act(() => vi.advanceTimersByTime(500));
    expect(onAdvance).not.toHaveBeenCalled();
    expect(useVnStore.getState().skipMode).toBe(false);
  });

  it('Auto tạm dừng khi có lớp phủ (keyboardEnabled = false)', () => {
    const onAdvance = vi.fn();
    const { rerender } = render(<DialogBox line={A} onAdvance={onAdvance} keyboardEnabled={false} />);
    act(() => useVnStore.getState().setAutoMode(true));
    act(() => vi.advanceTimersByTime(5000));
    expect(onAdvance).not.toHaveBeenCalled();
    rerender(<DialogBox line={A} onAdvance={onAdvance} keyboardEnabled />);
    act(() => vi.advanceTimersByTime(5000));
    expect(onAdvance).toHaveBeenCalledTimes(1);
  });

  it('qua câu bằng tay thì câu đó được ghi là đã đọc', () => {
    const onAdvance = vi.fn();
    render(<DialogBox line={A} onAdvance={onAdvance} />);
    act(() => vi.advanceTimersByTime(401)); // QĐ-066: qua khoảng khóa khi lời vừa hiện
    act(() => {
      window.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter' }));
    });
    expect(onAdvance).toHaveBeenCalledTimes(1);
    expect(useVnStore.getState().readLines[readLineKey(A.speaker, A.text)]).toBe(true);
  });
});

describe('vn-store — ô lưu', () => {
  const progress = { currentPart: 'analysis', task: 'Chạy truy vấn' } as unknown as StoryProgress;
  const evidence = { unlocked: [], savedQueries: {}, annotations: [] };

  it('ô lưu chụp cả trạng thái thử thách và là bản sao độc lập', () => {
    const challenges = { c1: { status: 'completed' } } as never;
    useVnStore.getState().saveToSlot(0, { progress, evidence, challenges }, 'clb-room');
    const slot = useVnStore.getState().loadFromSlot(0)!;
    expect(slot.version).toBe(STORE_VERSION);
    expect(slot.challenges).toEqual({ c1: { status: 'completed' } });
    expect(slot.challenges).not.toBe(challenges);
  });

  it('chơi lại từ đầu xóa ô lưu, lịch sử thoại và thoại đã đọc', () => {
    useVnStore.getState().saveToSlot(2, { progress, evidence, challenges: {} }, 'clb-room');
    useVnStore.getState().markRead('x');
    useVnStore.getState().pushBacklog({ id: '1', speaker: 'narrator', speakerName: '', text: 'a' });
    useVnStore.getState().resetSession();
    const s = useVnStore.getState();
    expect(s.saveSlots).toEqual(Array(SAVE_SLOT_COUNT).fill(null));
    expect(s.backlog).toEqual([]);
    expect(s.readLines).toEqual({});
    expect(sessionStorage.getItem('clb_vn_saves_v2')).toBeNull();
  });
});

describe('vn-store — lưu trong phiên và tùy chọn', () => {
  it('nhân vật đã giới thiệu được ghi vào sessionStorage (F5 không giới thiệu lại) và xóa khi chơi lại', () => {
    useVnStore.getState().markDebutSeen('tung');
    expect(useVnStore.getState().seenDebuts).toEqual(['tung']);
    expect(JSON.parse(sessionStorage.getItem('clb_vn_session_v1')!).seenDebuts).toEqual(['tung']);
    useVnStore.getState().resetSession();
    expect(useVnStore.getState().seenDebuts).toEqual([]);
    expect(sessionStorage.getItem('clb_vn_session_v1')).toBeNull();
  });

  it('tốc độ chữ được nhớ (localStorage) và ghi telemetry khi đổi', async () => {
    const { getTelemetryEvents } = await import('../telemetry/track');
    useVnStore.getState().setTextSpeed('normal');
    useVnStore.getState().setTextSpeed('slow');
    // Tùy chọn lưu cùng chỗ: tốc độ chữ + "Skip cả lời chưa đọc" (01/10/2026) + highlight từ khóa.
    expect(JSON.parse(localStorage.getItem('clb_vn_prefs_v1')!)).toEqual({ textSpeed: 'slow', skipUnread: false, highlightEnabled: true });
    expect(getTelemetryEvents().at(-1)).toMatchObject({ type: 'text_speed_changed', speed: 'slow' });
    useVnStore.getState().setTextSpeed('normal');
  });

  it('bật Auto/Skip bằng tay ghi vn_mode_toggled', async () => {
    const { getTelemetryEvents } = await import('../telemetry/track');
    useVnStore.getState().toggleAutoMode();
    expect(getTelemetryEvents().at(-1)).toMatchObject({ type: 'vn_mode_toggled', mode: 'auto', on: true });
    useVnStore.getState().toggleSkipMode();
    expect(getTelemetryEvents().at(-1)).toMatchObject({ type: 'vn_mode_toggled', mode: 'skip', on: true });
    expect(useVnStore.getState().autoMode).toBe(false);
  });
});
