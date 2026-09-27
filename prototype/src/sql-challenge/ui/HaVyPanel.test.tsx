import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { HaVyPanel } from './HaVyPanel';

describe('HaVyPanel — chống đếm đôi lượt gợi ý', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('bấm đúp Hỏi Hà Vy chỉ gọi onAskHaVy 1 lần trong 400ms', () => {
    const onAskHaVy = vi.fn();
    render(<HaVyPanel note={null} idle="Sẵn sàng" onAskHaVy={onAskHaVy} />);

    const btn = screen.getByRole('button', { name: 'Hỏi Hà Vy' });

    act(() => {
      fireEvent.click(btn);
      fireEvent.click(btn);
    });

    expect(onAskHaVy).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(401);
      fireEvent.click(btn);
    });

    expect(onAskHaVy).toHaveBeenCalledTimes(2);
  });
});
