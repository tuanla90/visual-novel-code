import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { HaVyPanel } from './HaVyPanel';

// Lọc bấm đúp "Hỏi Hà Vy" nằm ở ChallengeScreen (`usePressGuard`, QĐ-066) — xem ChallengeGuide.test.tsx.
describe('HaVyPanel — nút "Hỏi Hà Vy"', () => {
  it('chuyển nguyên sự kiện bấm và phím cho lớp gọi', () => {
    const onAskHaVy = vi.fn();
    const onAskKeyDown = vi.fn();
    render(<HaVyPanel note={null} idle="Sẵn sàng" onAskHaVy={onAskHaVy} onAskKeyDown={onAskKeyDown} />);

    const btn = screen.getByRole('button', { name: 'Hỏi Hà Vy' });
    fireEvent.click(btn, { detail: 2 });
    fireEvent.keyDown(btn, { key: 'Enter', repeat: true });

    expect(onAskHaVy).toHaveBeenCalledTimes(1);
    expect(onAskHaVy.mock.calls[0]?.[0]).toMatchObject({ detail: 2 });
    expect(onAskKeyDown).toHaveBeenCalledTimes(1);
  });

  it('không có onAskHaVy → không hiện nút', () => {
    render(<HaVyPanel note={null} idle="Sẵn sàng" />);
    expect(screen.queryByRole('button', { name: 'Hỏi Hà Vy' })).not.toBeInTheDocument();
  });
});
