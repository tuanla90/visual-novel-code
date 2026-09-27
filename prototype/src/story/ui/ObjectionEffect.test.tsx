import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ObjectionEffect } from './ObjectionEffect';

describe('ObjectionEffect — hỗ trợ prefers-reduced-motion và skip guard', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it('ở chế độ bình thường: cú bấm trong 400ms đầu bị chặn, sau 400ms mới được bỏ qua', () => {
    const onDone = vi.fn();
    render(<ObjectionEffect effectId="co-so-lieu-day" onDone={onDone} />);

    const dialog = screen.getByRole('dialog');

    // Cú bấm ở 100ms: bị chặn bởi guard
    act(() => {
      vi.advanceTimersByTime(100);
      fireEvent.click(dialog);
    });
    expect(onDone).not.toHaveBeenCalled();

    // Qua 401ms: bấm là bỏ qua ngay
    act(() => {
      vi.advanceTimersByTime(301);
      fireEvent.click(dialog);
    });
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('khi bật prefers-reduced-motion: cho phép bỏ qua ngay lập tức không cần đợi 400ms', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion: reduce'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const onDone = vi.fn();
    render(<ObjectionEffect effectId="co-so-lieu-day" onDone={onDone} />);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('data-reduced-motion', 'true');

    // Bấm ngay lập tức (thời điểm 50ms)
    act(() => {
      vi.advanceTimersByTime(50);
      fireEvent.click(dialog);
    });

    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('khi bật prefers-reduced-motion: phím Space/Enter bỏ qua ngay lập tức', () => {
    window.matchMedia = vi.fn().mockImplementation((query: string) => ({
      matches: query.includes('prefers-reduced-motion: reduce'),
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    }));

    const onDone = vi.fn();
    render(<ObjectionEffect effectId="co-so-lieu-day" onDone={onDone} />);

    act(() => {
      fireEvent.keyDown(window, { key: 'Enter' });
    });

    expect(onDone).toHaveBeenCalledTimes(1);
  });
});
