import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import type { MultipleChoiceQuestion } from '../../story/types';
import { DialogBox } from './DialogBox';
import { MultipleChoice } from './MultipleChoice';

describe('DialogBox', () => {
  it('nhãn "Bạn" cho player, không nhãn cho narrator, tên nhân vật cho nhân vật', () => {
    const { rerender } = render(<DialogBox line={{ speaker: 'player', text: 'Xin chào' }} onAdvance={() => {}} />);
    expect(screen.getByText('Bạn')).toBeInTheDocument();
    rerender(<DialogBox line={{ speaker: 'narrator', text: 'Tuần thứ hai' }} onAdvance={() => {}} />);
    expect(screen.queryByText('Bạn')).not.toBeInTheDocument();
    expect(document.querySelector('.dialog__speaker')).toBeNull();
    rerender(<DialogBox line={{ speaker: 'ha-vy', expression: 'smile', text: 'Yên tâm.' }} onAdvance={() => {}} />);
    expect(screen.getByText('Hà Vy')).toBeInTheDocument();
    expect(document.body.textContent).not.toContain('ha-vy');
  });

  it('bấm vào hộp, Space hoặc Enter đều qua lời; thẻ chữ lớn có lớp dialog--card', async () => {
    const user = userEvent.setup();
    const onAdvance = vi.fn();
    render(<DialogBox line={{ speaker: 'narrator', text: 'Thông điệp' }} display="card" onAdvance={onAdvance} />);
    expect(document.querySelector('.dialog--card')).not.toBeNull();
    await user.click(screen.getByText('Thông điệp'));
    await user.keyboard(' ');
    await user.keyboard('{Enter}');
    expect(onAdvance).toHaveBeenCalledTimes(3);
  });
});

const question: MultipleChoiceQuestion = {
  id: 'q-test',
  asker: { speaker: 'ha-vy', expression: 'thinking', text: 'Chữ H là gì?' },
  choices: [
    { id: 'a', text: 'Lựa chọn A', correct: false, feedback: [] },
    { id: 'b', text: 'Lựa chọn B', correct: true, feedback: [] },
    { id: 'c', text: 'Lựa chọn C', correct: false, feedback: [] },
  ],
};

const question2: MultipleChoiceQuestion = {
  ...question,
  id: 'q-test-2',
  asker: { speaker: 'quan', expression: 'neutral', text: 'Câu thứ hai?' },
};

function order(): string[] {
  return screen.getAllByRole('button').map((b) => b.textContent ?? '');
}

describe('MultipleChoice', () => {
  it('xáo thứ tự theo nguồn ngẫu nhiên và gọi onChoose với id lựa chọn', async () => {
    const user = userEvent.setup();
    const onChoose = vi.fn();
    render(<MultipleChoice question={question} attempts={0} onChoose={onChoose} random={() => 0} />);
    expect(order()).toEqual(['Lựa chọn B', 'Lựa chọn C', 'Lựa chọn A']);
    await user.click(screen.getByText('Lựa chọn B'));
    expect(onChoose).toHaveBeenCalledWith('b');
    expect(screen.getByText('Chữ H là gì?')).toBeInTheDocument();
    expect(screen.getByText('Hà Vy')).toBeInTheDocument();
  });

  it('QĐ-041: chọn sai rồi chọn lại giữ nguyên thứ tự; sang câu hỏi khác mới xáo lại', () => {
    // Nguồn ngẫu nhiên đổi giữa các lần render: nếu component xáo lại thì thứ tự sẽ đổi.
    let seed = 0;
    const random = (): number => seed;
    const { rerender } = render(<MultipleChoice question={question} attempts={0} onChoose={() => {}} random={random} />);
    const first = order();
    expect(first).toEqual(['Lựa chọn B', 'Lựa chọn C', 'Lựa chọn A']);

    seed = 0.99; // với seed này shuffle sẽ cho ['A','B','C'] nếu bị gọi lại
    rerender(<MultipleChoice question={question} attempts={1} onChoose={() => {}} random={random} />);
    expect(order()).toEqual(first);
    expect(screen.getByText(/chọn lại thoải mái/)).toBeInTheDocument();
    rerender(<MultipleChoice question={question} attempts={2} onChoose={() => {}} random={random} />);
    expect(order()).toEqual(first);

    rerender(<MultipleChoice question={question2} attempts={0} onChoose={() => {}} random={random} />);
    expect(order()).toEqual(['Lựa chọn A', 'Lựa chọn B', 'Lựa chọn C']);
    expect(screen.getByText('Quân')).toBeInTheDocument();
  });
});
