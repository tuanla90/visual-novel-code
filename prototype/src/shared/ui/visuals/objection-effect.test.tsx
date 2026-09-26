/**
 * Hiệu ứng "Có số liệu đây!" (QĐ-025) + chống bỏ lỡ (QĐ-061 Đ2): cú bấm lặp (detail > 1), phím giữ
 * và mọi cú bấm/phím trong ~400 ms đầu KHÔNG bỏ qua hiệu ứng; sau đó bấm/phím bỏ qua được; tự đi
 * tiếp sau ~1,2 giây; gọi onDone đúng một lần; trình đọc màn hình đọc được câu hô.
 */
import { act, fireEvent, render, screen } from '@testing-library/react';
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { ObjectionEffect } from '../../../story/ui/ObjectionEffect';
import { EFFECT_DURATION_MS, EFFECT_SKIP_GUARD_MS } from './effect-timing';

function overlay(): HTMLElement {
  const el = document.querySelector('.objection');
  if (!(el instanceof HTMLElement)) throw new Error('không thấy lớp phủ hiệu ứng');
  return el;
}

describe('ObjectionEffect', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  afterEach(() => {
    vi.useRealTimers();
  });

  it('câu hô nằm trong vùng role=alert; phủ toàn màn hình qua portal; nút bỏ qua có nhãn + tooltip', () => {
    render(<ObjectionEffect effectId="co-so-lieu-day" onDone={() => {}} />);
    expect(screen.getByRole('alert')).toHaveTextContent('Có số liệu đây!');
    expect(overlay().parentElement).toBe(document.body);
    const skip = screen.getByRole('button', { name: 'Bỏ qua hiệu ứng' });
    expect(skip).toHaveAttribute('title', 'Bỏ qua hiệu ứng');
    expect(document.body.textContent).not.toContain('co-so-lieu-day');
  });

  it('cú bấm thứ hai của bấm đúp (detail 2) không bỏ qua — kể cả sau 400 ms', () => {
    const onDone = vi.fn();
    render(<ObjectionEffect effectId="co-so-lieu-day" onDone={onDone} />);
    fireEvent.click(overlay(), { detail: 2 });
    act(() => {
      vi.advanceTimersByTime(EFFECT_SKIP_GUARD_MS + 50);
    });
    fireEvent.click(overlay(), { detail: 2 });
    fireEvent.click(overlay(), { detail: 3 });
    expect(onDone).not.toHaveBeenCalled();
  });

  it('bấm hoặc phím trong ~400 ms đầu không bỏ qua; phím giữ (repeat) không bỏ qua', () => {
    const onDone = vi.fn();
    render(<ObjectionEffect effectId="co-so-lieu-day" onDone={onDone} />);
    fireEvent.click(overlay(), { detail: 1 });
    fireEvent.keyDown(window, { key: 'Enter' });
    fireEvent.keyDown(window, { key: ' ' });
    act(() => {
      vi.advanceTimersByTime(EFFECT_SKIP_GUARD_MS - 50);
    });
    fireEvent.click(overlay(), { detail: 1 });
    expect(onDone).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(100);
    });
    fireEvent.keyDown(window, { key: 'Enter', repeat: true });
    expect(onDone).not.toHaveBeenCalled();
  });

  it('sau 400 ms: một cú bấm đơn bỏ qua; onDone chỉ gọi một lần kể cả khi hết giờ sau đó', () => {
    const onDone = vi.fn();
    render(<ObjectionEffect effectId="co-so-lieu-day" onDone={onDone} />);
    act(() => {
      vi.advanceTimersByTime(EFFECT_SKIP_GUARD_MS + 10);
    });
    fireEvent.click(overlay(), { detail: 1 });
    expect(onDone).toHaveBeenCalledTimes(1);
    act(() => {
      vi.advanceTimersByTime(EFFECT_DURATION_MS);
    });
    fireEvent.keyDown(window, { key: 'Enter' });
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('sau 400 ms: Enter/Space/Esc bỏ qua; phím khác thì không', () => {
    for (const key of ['Enter', ' ', 'Escape']) {
      const onDone = vi.fn();
      const { unmount } = render(<ObjectionEffect effectId="co-so-lieu-day" onDone={onDone} />);
      act(() => {
        vi.advanceTimersByTime(EFFECT_SKIP_GUARD_MS + 10);
      });
      fireEvent.keyDown(window, { key: 'a' });
      expect(onDone).not.toHaveBeenCalled();
      fireEvent.keyDown(window, { key });
      expect(onDone).toHaveBeenCalledTimes(1);
      unmount();
    }
  });

  it('không làm gì thì tự đi tiếp sau ~1,2 giây', () => {
    const onDone = vi.fn();
    render(<ObjectionEffect effectId="co-so-lieu-day" onDone={onDone} />);
    act(() => {
      vi.advanceTimersByTime(EFFECT_DURATION_MS - 10);
    });
    expect(onDone).not.toHaveBeenCalled();
    act(() => {
      vi.advanceTimersByTime(20);
    });
    expect(onDone).toHaveBeenCalledTimes(1);
  });

  it('app.css tắt rung/thu phóng của hiệu ứng khi prefers-reduced-motion', () => {
    const css = readFileSync(join(dirname(fileURLToPath(import.meta.url)), '../../../styles/app.css'), 'utf8');
    const block = /@media \(prefers-reduced-motion: reduce\) \{([^@]*?)\n\}/.exec(css.slice(css.indexOf('.objection')))?.[1] ?? '';
    for (const cls of ['.objection__lines', '.objection__burst', '.objection__shout']) expect(block).toContain(cls);
    expect(block).toContain('animation: none');
  });
});
