import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { StrictMode } from 'react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { MultipleChoiceQuestion } from '../../story/types';
import { forgetChoiceOrders } from './choice-order';
import { DialogBox } from './DialogBox';
import { MultipleChoice } from './MultipleChoice';
import { passPressGuard } from '../../test/press-guard';

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
    await passPressGuard();
    await user.click(screen.getByText('Thông điệp'));
    await passPressGuard();
    await user.keyboard(' ');
    await passPressGuard();
    await user.keyboard('{Enter}');
    expect(onAdvance).toHaveBeenCalledTimes(3);
  });

  describe('chống bấm đúp / giữ phím (QĐ-066)', () => {
    it('cú bấm/phím trong khoảng khóa sau khi lời đổi KHÔNG qua lời; hết khoảng khóa thì qua', async () => {
      const onAdvance = vi.fn();
      const { rerender } = render(<DialogBox line={{ speaker: 'narrator', text: 'Lời một' }} onAdvance={onAdvance} />);
      await passPressGuard();
      rerender(<DialogBox line={{ speaker: 'narrator', text: 'Lời hai' }} onAdvance={onAdvance} />);
      fireEvent.click(screen.getByText('Lời hai'), { detail: 1 });
      fireEvent.keyDown(window, { key: ' ' });
      expect(onAdvance).not.toHaveBeenCalled();
      await passPressGuard();
      fireEvent.click(screen.getByText('Lời hai'), { detail: 1 });
      expect(onAdvance).toHaveBeenCalledTimes(1);
    });

    it('bấm đúp vào hộp chỉ qua MỘT lời; phím đang giữ (repeat) không qua lời', async () => {
      const onAdvance = vi.fn();
      render(<DialogBox line={{ speaker: 'narrator', text: 'Thông điệp' }} onAdvance={onAdvance} />);
      await passPressGuard();
      await userEvent.dblClick(screen.getByText('Thông điệp'));
      expect(onAdvance).toHaveBeenCalledTimes(1);
      await passPressGuard();
      fireEvent.keyDown(window, { key: 'Enter', repeat: true });
      fireEvent.keyDown(window, { key: ' ', repeat: true });
      expect(onAdvance).toHaveBeenCalledTimes(1);
    });

    it('nút "Tiếp tục ▸" nhận NGAY cú bấm đơn chủ ý, nhưng bấm đúp chỉ tính một lần', async () => {
      const onAdvance = vi.fn();
      render(<DialogBox line={{ speaker: 'narrator', text: 'Thông điệp' }} onAdvance={onAdvance} />);
      fireEvent.click(screen.getByRole('button', { name: /Tiếp tục/ }), { detail: 1 });
      expect(onAdvance).toHaveBeenCalledTimes(1);
      await passPressGuard();
      await userEvent.dblClick(screen.getByRole('button', { name: /Tiếp tục/ }));
      expect(onAdvance).toHaveBeenCalledTimes(2);
    });
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
  beforeEach(() => forgetChoiceOrders());

  it('xáo thứ tự theo nguồn ngẫu nhiên và gọi onChoose với id lựa chọn', async () => {
    const user = userEvent.setup();
    const onChoose = vi.fn();
    render(<MultipleChoice question={question} attempts={0} gameKey="t" onChoose={onChoose} random={() => 0} />);
    expect(order()).toEqual(['Lựa chọn B', 'Lựa chọn C', 'Lựa chọn A']);
    await passPressGuard();
    await user.click(screen.getByText('Lựa chọn B'));
    expect(onChoose).toHaveBeenCalledWith('b');
    expect(screen.getByText('Chữ H là gì?')).toBeInTheDocument();
    expect(screen.getByText('Hà Vy')).toBeInTheDocument();
  });

  it('QĐ-041: chọn sai rồi chọn lại giữ nguyên thứ tự; sang câu hỏi khác mới xáo lại', () => {
    // Nguồn ngẫu nhiên đổi giữa các lần render: nếu component xáo lại thì thứ tự sẽ đổi.
    let seed = 0;
    const random = (): number => seed;
    const { rerender } = render(<MultipleChoice question={question} attempts={0} gameKey="t" onChoose={() => {}} random={random} />);
    const first = order();
    expect(first).toEqual(['Lựa chọn B', 'Lựa chọn C', 'Lựa chọn A']);

    seed = 0.99; // với seed này shuffle sẽ cho ['A','B','C'] nếu bị gọi lại
    rerender(<MultipleChoice question={question} attempts={1} gameKey="t" onChoose={() => {}} random={random} />);
    expect(order()).toEqual(first);
    expect(screen.getByText(/chọn lại thoải mái/)).toBeInTheDocument();
    rerender(<MultipleChoice question={question} attempts={2} gameKey="t" onChoose={() => {}} random={random} />);
    expect(order()).toEqual(first);

    rerender(<MultipleChoice question={question2} attempts={0} gameKey="t" onChoose={() => {}} random={random} />);
    expect(order()).toEqual(['Lựa chọn A', 'Lựa chọn B', 'Lựa chọn C']);
    expect(screen.getByText('Quân')).toBeInTheDocument();
  });
});

describe('MultipleChoice nhớ thứ tự theo (phiên chơi, câu hỏi), không ghi đè (QĐ-041, QĐ-066)', () => {
  beforeEach(() => forgetChoiceOrders());

  /** Hai lần gọi đầu (một lần xáo) cho ['B','C','A'] (seed 0); các lần sau cho ['A','B','C'] (seed 0,99) — cố ý khác. */
  function twoDifferentShuffles(): () => number {
    let calls = 0;
    return () => (calls++ < 2 ? 0 : 0.99);
  }

  it('StrictMode (chế độ dev dựng hai lần): thứ tự ĐANG HIỆN là thứ tự được nhớ → dựng lại với attempts=1 không đổi chỗ', () => {
    const random = twoDifferentShuffles();
    const first = render(
      <StrictMode>
        <MultipleChoice question={question} attempts={0} gameKey={1} onChoose={() => {}} random={random} />
      </StrictMode>,
    );
    const shown = order();
    expect(shown).toEqual(['Lựa chọn B', 'Lựa chọn C', 'Lựa chọn A']);
    first.unmount(); // GameScreen gỡ câu hỏi khi hiện phản hồi rồi dựng lại
    render(
      <StrictMode>
        <MultipleChoice question={question} attempts={1} gameKey={1} onChoose={() => {}} random={random} />
      </StrictMode>,
    );
    expect(order()).toEqual(shown);
  });

  it('phiên chơi khác (chơi lại từ đầu) → xáo mới; cùng phiên, attempts về 0 → vẫn giữ thứ tự cũ', () => {
    const random = twoDifferentShuffles();
    const a = render(<MultipleChoice question={question} attempts={0} gameKey={1} onChoose={() => {}} random={random} />);
    expect(order()).toEqual(['Lựa chọn B', 'Lựa chọn C', 'Lựa chọn A']);
    a.unmount();
    const b = render(<MultipleChoice question={question} attempts={0} gameKey={1} onChoose={() => {}} random={random} />);
    expect(order()).toEqual(['Lựa chọn B', 'Lựa chọn C', 'Lựa chọn A']);
    b.unmount();
    render(<MultipleChoice question={question} attempts={0} gameKey={2} onChoose={() => {}} random={random} />);
    expect(order()).toEqual(['Lựa chọn A', 'Lựa chọn B', 'Lựa chọn C']);
  });
});

describe('MultipleChoice chống bấm đúp / giữ phím (QĐ-066)', () => {
  beforeEach(() => forgetChoiceOrders());

  it('cú bấm ngay khi câu hỏi vừa hiện (cú thứ hai của bấm đúp lên lời trước) không tính là chọn', async () => {
    const onChoose = vi.fn();
    render(<MultipleChoice question={question} attempts={0} gameKey="t" onChoose={onChoose} random={() => 0} />);
    fireEvent.click(screen.getByText('Lựa chọn A'), { detail: 1 });
    fireEvent.click(screen.getByText('Lựa chọn A'), { detail: 2 });
    expect(onChoose).not.toHaveBeenCalled();
    await passPressGuard();
    fireEvent.click(screen.getByText('Lựa chọn A'), { detail: 1 });
    expect(onChoose).toHaveBeenCalledTimes(1);
  });

  it('bấm đúp một lựa chọn → chỉ MỘT lần chọn; Enter đang giữ trên nút không bấm lặp', async () => {
    const onChoose = vi.fn();
    render(<MultipleChoice question={question} attempts={0} gameKey="t" onChoose={onChoose} random={() => 0} />);
    await passPressGuard();
    await userEvent.dblClick(screen.getByText('Lựa chọn A'));
    expect(onChoose).toHaveBeenCalledTimes(1);
    const button = screen.getByRole('button', { name: 'Lựa chọn A' });
    // fireEvent trả false khi trình xử lý đã preventDefault → trình duyệt không sinh click lặp.
    expect(fireEvent.keyDown(button, { key: 'Enter', repeat: true })).toBe(false);
    expect(fireEvent.keyDown(button, { key: 'Enter', repeat: false })).toBe(true);
  });
});
