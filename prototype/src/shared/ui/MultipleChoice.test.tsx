import { act, render, screen } from '@testing-library/react';
import { StrictMode } from 'react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import type { MultipleChoiceQuestion } from '../../story/types';
import { forgetChoiceOrders } from './choice-order';
import { HighlightProvider } from '../highlight/HighlightText';
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

  it('ngăn bấm đúp câu hỏi (rapid double-click) trong vòng 400ms (QĐ-066: kể cả 400ms đầu khi câu hỏi vừa hiện)', async () => {
    const onChoose = vi.fn();
    render(<MultipleChoice question={QUESTION} attempts={0} gameKey={null} onChoose={onChoose} />);

    const buttons = screen.getAllByRole('button');
    const firstButton = buttons[0];
    expect(firstButton).toBeDefined();

    // Bấm ngay khi câu hỏi vừa hiện (cú bấm thứ hai của bấm đúp rơi vào câu hỏi mới) → không tính
    act(() => {
      firstButton!.click();
    });
    expect(onChoose).toHaveBeenCalledTimes(0);

    // Bấm lần 1 sau khoảng khóa
    act(() => {
      vi.advanceTimersByTime(401);
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
        <MultipleChoice question={QUESTION} attempts={0} gameKey={null} onChoose={onChoose} />
      </StrictMode>,
    );

    const labels1 = [...c1.querySelectorAll('.mc__choice')].map((el) => el.textContent);

    // Render lần nữa với attempts=0 cùng phiên
    const { container: c2 } = render(
      <StrictMode>
        <MultipleChoice question={QUESTION} attempts={0} gameKey={null} onChoose={onChoose} />
      </StrictMode>,
    );
    const labels2 = [...c2.querySelectorAll('.mc__choice')].map((el) => el.textContent);

    expect(labels1).toEqual(labels2);
  });

  it('bọc nội dung trong .mc__choice-text và bảo toàn khoảng trắng khi tô màu từ khóa', () => {
    const onChoose = vi.fn();
    const mockEngine = {
      tokenize(text: string) {
        if (text.includes('thư viện')) {
          const start = text.indexOf('thư viện');
          return [{ start, end: start + 8, text: 'thư viện', category: 'place' as const }];
        }
        return [];
      },
    };

    const questionWithKeywords: MultipleChoiceQuestion = {
      id: 'q-mc-highlight',
      asker: { speaker: 'ha-vy', expression: 'neutral', text: 'Tìm ở đâu?' },
      choices: [
        { id: 'opt-1', text: 'Gặp Nam ở thư viện vào buổi sáng', correct: true, feedback: [] },
        { id: 'opt-2', text: 'Kiểm tra `select * from users` ngay', correct: false, feedback: [] },
      ],
    };

    const { container } = render(
      <HighlightProvider engine={mockEngine as any}>
        <MultipleChoice question={questionWithKeywords} attempts={0} gameKey={null} onChoose={onChoose} />
      </HighlightProvider>,
    );

    const choiceButtons = container.querySelectorAll<HTMLButtonElement>('.mc__choice');
    expect(choiceButtons.length).toBe(2);

    // Kiểm tra cấu trúc .mc__choice-text để bảo đảm inline formatting context
    const textWrappers = container.querySelectorAll('.mc__choice-text');
    expect(textWrappers.length).toBe(2);

    // Kiểm tra văn bản giữ nguyên khoảng trắng, không dính chữ ("ở thư viện" chứ không phải "ởthư viện")
    const opt1Btn = Array.from(choiceButtons).find((b) => b.textContent?.includes('Gặp Nam'));
    const opt2Btn = Array.from(choiceButtons).find((b) => b.textContent?.includes('Kiểm tra'));
    expect(opt1Btn).toBeDefined();
    expect(opt2Btn).toBeDefined();
    expect(opt1Btn?.textContent).toBe('Gặp Nam ở thư viện vào buổi sáng');

    const highlightSpan = opt1Btn?.querySelector('.game-highlight');
    expect(highlightSpan).not.toBeNull();
    expect(highlightSpan?.textContent).toBe('thư viện');
    expect(highlightSpan?.classList.contains('game-highlight--place')).toBe(true);

    // Kiểm tra code text trong lựa chọn
    const codeTag = opt2Btn?.querySelector('code');
    expect(codeTag).not.toBeNull();
    expect(codeTag?.textContent).toBe('select * from users');
  });
});

