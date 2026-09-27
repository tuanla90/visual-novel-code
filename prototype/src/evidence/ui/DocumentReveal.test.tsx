import { act, fireEvent, render, screen } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { DocumentCard } from '../types';
import { DocumentReveal } from './DocumentReveal';

const DOC: DocumentCard = {
  id: 'doc-letter',
  title: 'Thư mời họp',
  source: 'Bàn giáo viên',
  body: ['Kính gửi thầy cô và các bạn sinh viên.'],
  caveat: 'Chưa rõ ai là người ký.',
};

describe('DocumentReveal — chống bấm đúp cất vào hồ sơ', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('bấm đúp Cất vào hồ sơ chỉ gọi onClose 1 lần trong 400ms', () => {
    const onClose = vi.fn();
    render(<DocumentReveal document={DOC} onClose={onClose} />);

    const closeBtn = screen.getByRole('button', { name: 'Cất vào hồ sơ' });

    act(() => {
      fireEvent.click(closeBtn);
      fireEvent.click(closeBtn);
    });

    expect(onClose).toHaveBeenCalledTimes(1);

    act(() => {
      vi.advanceTimersByTime(401);
      fireEvent.click(closeBtn);
    });

    expect(onClose).toHaveBeenCalledTimes(2);
  });
});
