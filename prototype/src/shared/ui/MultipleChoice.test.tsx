import { act, render, screen } from '@testing-library/react';
import { StrictMode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { MultipleChoiceQuestion } from '../../story/types';
import { forgetChoiceOrders } from './choice-order';
import { MultipleChoice } from './MultipleChoice';

const QUESTION: MultipleChoiceQuestion = {
  id: 'q-mc-guard',
  asker: { speaker: 'ha-vy', expression: 'neutral', text: 'Chọn đáp án?' },
  choices: [
    { id: 'opt-a', text: 'Đáp án A', correct: true, feedback: [] },
    { id: 'opt-b', text: 'Đáp án B', correct: false, feedback: [] },
    { id: 'opt-c', text: 'Đáp án C', correct: false, feedback: [] },
  ],
};

describe('MultipleChoice', () => {
  beforeEach(() => {
    vi.useFakeTimers();
    forgetChoiceOrders();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('ngăn bấm đúp câu hỏi (rapid double-click) trong vòng 400ms', async () => {
    const onChoose = vi.fn();
    render(<MultipleChoice question={QUESTION} attempts={0} onChoose={onChoose} />);

    const buttons = screen.getAllByRole('button');
    const firstButton = buttons[0];
    expect(firstButton).toBeDefined();

    // Bấm lần 1
    act(() => {
      firstButton!.click();
    });
    expect(onChoose).toHaveBeenCalledTimes(1);

    // Bấm lần 2 ngay lập tức (< 400ms)
    act(() => {
      firstButton!.click();
    });
    expect(onChoose).toHaveBeenCalledTimes(1);

    // Qua 401ms
    act(() => {
      vi.advanceTimersByTime(401);
      firstButton!.click();
    });
    expect(onChoose).toHaveBeenCalledTimes(2);
  });

  it('giữ nguyên vị trí lựa chọn khi bọc trong React.StrictMode (mount 2 lần)', () => {
    const onChoose = vi.fn();
    const { container: c1 } = render(
      <StrictMode>
        <MultipleChoice question={QUESTION} attempts={0} onChoose={onChoose} />
      </StrictMode>,
    );

    const labels1 = [...c1.querySelectorAll('.mc__choice')].map((el) => el.textContent);

    // Render lần nữa với attempts=0 cùng phiên
    const { container: c2 } = render(
      <StrictMode>
        <MultipleChoice question={QUESTION} attempts={0} onChoose={onChoose} />
      </StrictMode>,
    );
    const labels2 = [...c2.querySelectorAll('.mc__choice')].map((el) => el.textContent);

    expect(labels1).toEqual(labels2);
  });
});
