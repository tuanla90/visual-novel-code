/**
 * QĐ-041 qua GameScreen + store thật: câu hỏi trong chuỗi truyện bị GỠ khi hiện phản hồi rồi dựng lại
 * khi cho chọn lại — thứ tự lựa chọn phải GIỮ NGUYÊN (lỗi gói 9b tìm thấy khi chơi thật: useMemo trong
 * component mất theo lần gỡ, câu hỏi xáo lại). Chơi lại từ đầu (attempts = 0) thì xáo mới.
 *
 * Nguồn ngẫu nhiên được thay bằng dãy đổi liên tục, và test tự chứng minh: xáo hai lần liên tiếp bằng dãy
 * đó cho hai thứ tự KHÁC nhau — nên nếu component xáo lại sau khi dựng lại, thứ tự sẽ đổi và test đỏ.
 */
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { realContent } from '../content/real';
import { useGameStore } from '../shared/store';
import { initialGameData } from '../shared/store/store';
import { clearTelemetry } from '../shared/telemetry/track';
import { forgetChoiceOrders } from '../shared/ui/choice-order';
import { shuffle } from '../shared/ui/shuffle';
import type { QuestionNode } from '../story/types';
import { passPressGuard } from '../test/press-guard';
import { GameScreen } from './GameScreen';

const SEQ = 'deb-03';
const seq = realContent.story.sequences.find((s) => s.id === SEQ);
const Q_INDEX = seq?.nodes.findIndex((n) => n.type === 'question' && n.question.id === 'q-two-rows') ?? -1;
const QUESTION = (seq?.nodes[Q_INDEX] as QuestionNode | undefined)?.question;
if (!QUESTION) throw new Error('nội dung thật thiếu q-two-rows ở deb-03');

/** Dãy giả ngẫu nhiên đổi liên tục (không lặp chu kỳ ngắn). */
function makeRandom(): () => number {
  let x = 0.137;
  return () => {
    x = (x * 9301 + 0.49297) % 1;
    return x;
  };
}

function startAtQuestion(): void {
  useGameStore.setState({ ...initialGameData() });
  clearTelemetry();
  useGameStore.getState().startGame();
  const progress = useGameStore.getState().progress;
  if (!progress) throw new Error('chưa bắt đầu được game');
  useGameStore.setState({ progress: { ...progress, currentPart: 'debrief', cursor: { sequenceId: SEQ, nodeIndex: Q_INDEX } } });
}

const choiceTexts = () => within(screen.getByRole('group')).getAllByRole('button').map((b) => b.textContent?.trim());

describe('thứ tự lựa chọn giữ nguyên khi chọn lại (QĐ-041, qua GameScreen)', () => {
  beforeEach(() => {
    forgetChoiceOrders();
    vi.spyOn(Math, 'random').mockImplementation(makeRandom());
    startAtQuestion();
  });
  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('tự kiểm: dãy ngẫu nhiên dùng trong test làm hai lần xáo liên tiếp ra hai thứ tự khác nhau', () => {
    const r = makeRandom();
    const a = shuffle(QUESTION.choices, r).map((c) => c.id);
    const b = shuffle(QUESTION.choices, r).map((c) => c.id);
    expect(a).not.toEqual(b);
  });

  it('chọn sai → đọc phản hồi → quay lại: thứ tự y hệt; chọn sai lần nữa vẫn y hệt', async () => {
    const user = userEvent.setup();
    render(<GameScreen />);
    const before = choiceTexts();
    expect(before).toHaveLength(3);
    const wrong = QUESTION.choices.filter((c) => !c.correct);

    await passPressGuard();
    await user.click(screen.getByRole('button', { name: wrong[0]?.text }));
    await user.click(await screen.findByRole('button', { name: /Tiếp tục/ }));
    expect(choiceTexts()).toEqual(before);
    expect(screen.getByText('Chưa đúng cũng không sao — chọn lại thoải mái.')).toBeInTheDocument();

    await passPressGuard();
    await user.click(screen.getByRole('button', { name: wrong[1]?.text }));
    await user.click(await screen.findByRole('button', { name: /Tiếp tục/ }));
    expect(choiceTexts()).toEqual(before);
  });

  it('chơi lại từ đầu (attempts = 0) thì câu hỏi được xáo mới', async () => {
    const user = userEvent.setup();
    const first = render(<GameScreen />);
    const before = choiceTexts();
    await passPressGuard();
    await user.click(screen.getByRole('button', { name: QUESTION.choices.find((c) => !c.correct)?.text }));
    first.unmount();

    // Phiên mới: runtime báo attempts = 0 → xáo mới (dãy ngẫu nhiên khác → thứ tự khác).
    startAtQuestion();
    render(<GameScreen />);
    expect(useGameStore.getState().progress?.choices['q-two-rows']).toBeUndefined();
    expect(choiceTexts()).not.toEqual(before);
  });
});
