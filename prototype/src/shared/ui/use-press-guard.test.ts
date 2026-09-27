import { act, renderHook } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { usePressGuard } from './use-press-guard';

describe('usePressGuard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('gọi callback thành công ở lần bấm đầu tiên', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => usePressGuard(fn));

    act(() => {
      result.current();
    });

    expect(fn).toHaveBeenCalledTimes(1);
  });

  it('chặn cú bấm thứ hai trong vòng 400ms (rapid double-click)', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => usePressGuard(fn));

    act(() => {
      result.current();
      result.current();
    });

    expect(fn).toHaveBeenCalledTimes(1);

    // Chờ 200ms vẫn trong khoảng 400ms
    act(() => {
      vi.advanceTimersByTime(200);
      result.current();
    });

    expect(fn).toHaveBeenCalledTimes(1);

    // Qua 400ms (tổng 401ms kể từ lần bấm đầu)
    act(() => {
      vi.advanceTimersByTime(201);
      result.current();
    });

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it('chặn chuột có detail > 1 (native double click event)', () => {
    const fn = vi.fn();
    const preventDefault = vi.fn();
    const { result } = renderHook(() => usePressGuard(fn));

    act(() => {
      // Giả sử sau 1000ms nhưng detail = 2
      vi.advanceTimersByTime(1000);
      result.current({ detail: 2, preventDefault });
    });

    expect(fn).not.toHaveBeenCalled();
    expect(preventDefault).toHaveBeenCalled();
  });

  it('chặn phím có repeat = true (giữ phím Space/Enter)', () => {
    const fn = vi.fn();
    const preventDefault = vi.fn();
    const { result } = renderHook(() => usePressGuard(fn));

    act(() => {
      result.current({ repeat: true, key: 'Enter', preventDefault });
    });

    expect(fn).not.toHaveBeenCalled();
    expect(preventDefault).toHaveBeenCalled();
  });

  it('truyền đúng tham số vào callback ban đầu', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => usePressGuard(fn));

    act(() => {
      result.current('choice-abc', 42);
    });

    expect(fn).toHaveBeenCalledWith('choice-abc', 42);
  });

  it('luôn gọi callback mới nhất khi prop thay đổi mà không mất ref', () => {
    let count = 0;
    const { result, rerender } = renderHook(
      ({ cb }) => usePressGuard(cb),
      { initialProps: { cb: () => count += 1 } },
    );

    rerender({ cb: () => count += 10 });

    act(() => {
      result.current();
    });

    expect(count).toBe(10);
  });

  it('hỗ trợ tùy biến thời gian delay', () => {
    const fn = vi.fn();
    const { result } = renderHook(() => usePressGuard(fn, 200));

    act(() => {
      result.current();
    });
    expect(fn).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(201);
      result.current();
    });
    expect(fn).toHaveBeenCalledTimes(2);
  });
});
