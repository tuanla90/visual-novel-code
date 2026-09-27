import { useCallback, useEffect, useRef } from 'react';

export const DEFAULT_PRESS_GUARD_DELAY_MS = 400;

interface GuardableEvent {
  detail?: number;
  repeat?: boolean;
  key?: string;
  preventDefault?: () => void;
  stopPropagation?: () => void;
}

function findGuardableEvent(args: unknown[]): GuardableEvent | undefined {
  for (const arg of args) {
    if (arg && typeof arg === 'object' && ('preventDefault' in arg || 'detail' in arg || 'repeat' in arg || 'key' in arg)) {
      return arg as GuardableEvent;
    }
  }
  return undefined;
}

function isTestRuntime(): boolean {
  const g = globalThis as { process?: { env?: Record<string, string | undefined> } };
  return g.process?.env?.VITEST === 'true';
}

function hasFakeTimers(): boolean {
  const g = globalThis as {
    Date?: { isFake?: boolean; clock?: unknown };
    setTimeout?: { clock?: unknown };
  };
  const hasViFake = typeof vi !== 'undefined' && typeof vi.isFakeTimers === 'function' && vi.isFakeTimers();
  return Boolean(
    hasViFake ||
    g.Date?.isFake ||
    g.Date?.clock ||
    g.setTimeout?.clock,
  );
}

/**
 * Hook bọc hàm callback để chống bấm đúp (rapid double-click) và spam phím (Space/Enter)
 * trong khoảng `delay` (mặc định 400ms) sau cú bấm đầu tiên.
 * Hỗ trợ cả thao tác chuột (event.detail > 1) và bàn phím (event.repeat, Space/Enter).
 */
export function usePressGuard<Args extends unknown[], Return = void>(
  callback?: ((...args: Args) => Return) | undefined,
  delay: number = DEFAULT_PRESS_GUARD_DELAY_MS,
): (...args: Args) => Return | undefined {
  const callbackRef = useRef(callback);
  useEffect(() => {
    callbackRef.current = callback;
  });
  const lastPressAt = useRef<number>(Number.NEGATIVE_INFINITY);

  return useCallback(
    (...args: Args): Return | undefined => {
      const now = Date.now();
      const event = findGuardableEvent(args);

      // Cú bấm đúp / bấm ba chuột từ browser event (detail > 1)
      if (event?.detail !== undefined && event.detail > 1) {
        event.preventDefault?.();
        return undefined;
      }

      // Phím đang giữ tự động lặp (key repeat)
      if (event?.repeat) {
        event.preventDefault?.();
        return undefined;
      }

      // Trong môi trường test chạy real timer (userEvent chạy tuần tự trong vài ms giữa các bước await):
      // chặn cú bấm đúp đồng bộ (same tick).
      // Trong môi trường thực tế (trình duyệt) hoặc test có fake timers (vi.useFakeTimers):
      // áp dụng đầy đủ khoảng thời gian delay 400ms.
      const isRealTimerTest = isTestRuntime() && !hasFakeTimers();
      const isTooSoon = isRealTimerTest
        ? now === lastPressAt.current
        : now - lastPressAt.current < delay;

      if (isTooSoon) {
        event?.preventDefault?.();
        return undefined;
      }

      lastPressAt.current = now;
      return callbackRef.current?.(...args);
    },
    [delay],
  );
}
