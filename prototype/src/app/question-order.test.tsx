/**
 * QĐ-041 qua GameScreen + store thật: câu hỏi trong chuỗi truyện bị GỠ khi hiện phản hồi rồi dựng lại
 * khi cho chọn lại — thứ tự lựa chọn phải GIỮ NGUYÊN (lỗi gói 9b tìm thấy khi chơi thật: useMemo trong
 * component mất theo lần gỡ, câu hỏi xáo lại). Chơi lại từ đầu (attempts = 0) thì xáo mới.
 *
 * Nguồn ngẫu nhiên được thay bằng dãy đổi liên tục, và test tự chứng minh: xáo hai lần liên tiếp bằng dãy
 * đó cho hai thứ tự KHÁC nhau — nên nếu component xáo lại sau khi dựng lại, thứ tự sẽ đổi và test đỏ.
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import { StrictMode } from 'react';
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
    render(<StrictMode><GameScreen /></StrictMode>);
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

  it('bấm đúp lựa chọn sai (phát hiện CAO rà soát code): cú bấm thứ hai KHÔNG qua mất lời phản hồi', async () => {
    const user = userEvent.setup();
    render(<StrictMode><GameScreen /></StrictMode>);
    const wrong = QUESTION.choices.find((c) => !c.correct);
    if (!wrong) throw new Error('q-two-rows thiếu lựa chọn sai');
    await passPressGuard();
    await user.click(screen.getByRole('button', { name: wrong.text }));
    // Cú bấm thứ hai của bấm đúp (~100–200 ms sau, `detail: 2`) rơi vào HỘP PHẢN HỒI vừa thay chỗ danh
    // sách lựa chọn (jsdom không hit-test theo vị trí nên phải bắn thẳng vào hộp như trình duyệt làm).
    const box = document.querySelector('.dialog');
    if (!box) throw new Error('hộp phản hồi chưa hiện sau khi chọn sai');
    fireEvent.click(box, { detail: 2 });
    expect(screen.queryByRole('group')).toBeNull();
    expect(screen.getByText(/Phản hồi 1\//)).toBeInTheDocument();
    const shown = document.querySelector('.dialog__text')?.textContent?.replace(/\s+/g, ' ');
    expect(shown).toBe(wrong.feedback[0]?.text.replace(/`/g, '').replace(/\s+/g, ' '));
    expect(useGameStore.getState().progress?.choices['q-two-rows']?.attempts).toBe(1);
  });

  it('chơi lại từ đầu (attempts = 0) thì câu hỏi được xáo mới', async () => {
    const user = userEvent.setup();
    const first = render(<StrictMode><GameScreen /></StrictMode>);
    const before = choiceTexts();
    await passPressGuard();
    await user.click(screen.getByRole('button', { name: QUESTION.choices.find((c) => !c.correct)?.text }));
    first.unmount();

    // Phiên mới: runtime báo attempts = 0 → xáo mới (dãy ngẫu nhiên khác → thứ tự khác).
    startAtQuestion();
    render(<StrictMode><GameScreen /></StrictMode>);
    expect(useGameStore.getState().progress?.choices['q-two-rows']).toBeUndefined();
    expect(choiceTexts()).not.toEqual(before);
  });
});
