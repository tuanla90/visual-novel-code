/**
 * Màn chọn dòng lỗi (QĐ-024 bước 2) trên nội dung thật `q-quan-lines`.
 * - Bấm / bàn phím gọi đúng `onPick(index)`.
 * - Tô màu ĐỒNG ĐỀU: không dòng nào, không token `OR` nào có lớp riêng (lộ đáp án).
 * - Chọn sai: dấu nhẹ "đã thử", vẫn chọn lại được; dấu còn sau khi màn bị gỡ rồi dựng lại.
 * - `line_picked` chỉ do runtime phát, đúng một lần mỗi lần chọn (chạy qua GameScreen + store thật).
 */
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GameScreen } from '../../app/GameScreen';
import { realContent } from '../../content/real';
import { useGameStore } from '../../shared/store';
import { initialGameData } from '../../shared/store/store';
import { clearTelemetry, getTelemetryEvents } from '../../shared/telemetry/track';
import type { LinePickNode } from '../../story/types';
import { LinePick } from './LinePick';

const deb01 = realContent.story.sequences.find((s) => s.id === 'deb-01');
const pickNodeIndex = deb01?.nodes.findIndex((n) => n.type === 'line-pick') ?? -1;
const PICK = (deb01?.nodes[pickNodeIndex] as LinePickNode | undefined)?.pick;
if (!PICK) throw new Error('nội dung thật thiếu màn chọn dòng ở deb-01');

const pickRegion = (): HTMLElement => screen.getByRole('region', { name: 'Dòng nào gây lỗi?' });
const lineButtons = (): HTMLButtonElement[] => within(pickRegion()).getAllByRole('button');

describe('LinePick — chọn dòng', () => {
  beforeEach(() => clearTelemetry());

  it('có 5 dòng, mỗi dòng một nút có số dòng và nhãn nói việc nút làm', () => {
    render(<LinePick pick={PICK} attempts={0} onPick={() => {}} />);
    const buttons = lineButtons();
    expect(buttons).toHaveLength(5);
    buttons.forEach((b, i) => {
      expect(b).toHaveAccessibleName(new RegExp(`^Chọn dòng ${i + 1} là dòng lỗi`));
      expect(b).toHaveAttribute('title', `Chọn dòng ${i + 1} là dòng lỗi`);
      expect(b.querySelector('.dbf-lineno')?.textContent).toBe(String(i + 1));
    });
  });

  it.each([4, 2, 5, 1])('bấm dòng %i gọi onPick(%i)', async (n) => {
    const onPick = vi.fn();
    render(<LinePick pick={PICK} attempts={0} onPick={onPick} />);
    await userEvent.click(lineButtons()[n - 1] as HTMLButtonElement);
    expect(onPick).toHaveBeenCalledTimes(1);
    expect(onPick).toHaveBeenCalledWith(n);
  });

  it('bàn phím: Tab tới dòng 4 rồi Enter gọi onPick(4); Tab tới dòng 2 rồi Space gọi onPick(2)', async () => {
    const user = userEvent.setup();
    const onPick = vi.fn();
    const { unmount } = render(<LinePick pick={PICK} attempts={0} onPick={onPick} />);
    // Tiêu điểm ban đầu ở khung (không ở một dòng) → Tab thứ nhất tới dòng 1.
    expect(document.activeElement).toBe(pickRegion());
    await user.tab();
    await user.tab();
    await user.tab();
    await user.tab();
    expect(document.activeElement).toBe(lineButtons()[3]);
    await user.keyboard('{Enter}');
    expect(onPick).toHaveBeenLastCalledWith(4);
    unmount();

    render(<LinePick pick={PICK} attempts={0} onPick={onPick} />);
    await user.tab();
    await user.tab();
    await user.keyboard(' ');
    expect(onPick).toHaveBeenLastCalledWith(2);
    expect(onPick).toHaveBeenCalledTimes(2);
  });

  it('bấm đúp chỉ tính một lần chọn', async () => {
    const onPick = vi.fn();
    render(<LinePick pick={PICK} attempts={0} onPick={onPick} />);
    await userEvent.dblClick(lineButtons()[2] as HTMLButtonElement);
    expect(onPick).toHaveBeenCalledTimes(1);
  });

  it('tô màu đồng đều: mọi dòng cùng lớp; token OR cùng lớp với SELECT/FROM/WHERE; dòng 4, 5 không có lớp nào riêng', () => {
    render(<LinePick pick={PICK} attempts={0} onPick={() => {}} />);
    const buttons = lineButtons();
    // Nút và mục danh sách của mọi dòng cùng một lớp.
    expect(new Set(buttons.map((b) => b.className)).size).toBe(1);
    expect(new Set(buttons.map((b) => b.closest('li')?.className)).size).toBe(1);
    // Mọi từ khóa (kể cả OR) cùng MỘT lớp.
    const tokens = buttons.flatMap((b) => [...b.querySelectorAll<HTMLElement>('.dbf-code *')]);
    const keywordClasses = new Set(
      tokens.filter((t) => /^(SELECT|FROM|WHERE|LIKE|IN|OR|AND)$/i.test(t.textContent ?? '')).map((t) => t.className),
    );
    expect(keywordClasses.size).toBe(1);
    const orTokens = tokens.filter((t) => t.textContent === 'OR');
    expect(orTokens).toHaveLength(2);
    const selectToken = tokens.find((t) => t.textContent === 'SELECT');
    for (const t of orTokens) expect(t.className).toBe(selectToken?.className);
    // Dòng đúng (4, 5) không dùng lớp nào mà các dòng sai (1–3) không dùng.
    const classesOf = (b: HTMLElement): Set<string> =>
      new Set([...b.querySelectorAll<HTMLElement>('*')].flatMap((e) => [...e.classList]));
    const wrongLineClasses = new Set(buttons.slice(0, 3).flatMap((b) => [...classesOf(b)]));
    for (const b of buttons.slice(3)) for (const c of classesOf(b)) expect(wrongLineClasses, c).toContain(c);
    // Không thuộc tính nào khác nhau giữa các nút ngoài nhãn (số dòng + SQL).
    const attrNames = (b: HTMLElement): string[] => [...b.attributes].map((a) => a.name).sort();
    for (const b of buttons) expect(attrNames(b)).toEqual(attrNames(buttons[0] as HTMLElement));
  });

  it('chọn sai → dòng có dấu "đã thử", vẫn bấm lại được; dấu còn khi dựng lại với attempts > 0, mất khi attempts = 0', async () => {
    const onPick = vi.fn();
    const first = render(<LinePick pick={PICK} attempts={0} onPick={onPick} />);
    await userEvent.click(lineButtons()[0] as HTMLButtonElement);
    expect(onPick).toHaveBeenCalledWith(1);
    first.unmount(); // GameScreen gỡ màn này khi hiện phản hồi

    const second = render(<LinePick pick={PICK} attempts={1} onPick={onPick} />);
    const [line1, line2] = lineButtons();
    expect(line1).toHaveClass('dbf-pick__line--tried');
    expect(line1).toHaveAccessibleName(/\(đã thử\)/);
    expect(within(line1 as HTMLElement).getByText('đã thử')).toBeInTheDocument();
    expect(line1).toBeEnabled();
    expect(line2).not.toHaveClass('dbf-pick__line--tried');
    expect(screen.getByRole('status')).toHaveTextContent('Chưa đúng cũng không sao');
    await userEvent.click(line1 as HTMLButtonElement);
    expect(onPick).toHaveBeenLastCalledWith(1);
    second.unmount();

    render(<LinePick pick={PICK} attempts={0} onPick={onPick} />);
    expect(lineButtons().some((b) => b.classList.contains('dbf-pick__line--tried'))).toBe(false);
    expect(screen.getByRole('status')).toHaveTextContent('');
  });

  it('component không tự ghi telemetry', async () => {
    render(<LinePick pick={PICK} attempts={0} onPick={() => {}} />);
    await userEvent.click(lineButtons()[3] as HTMLButtonElement);
    expect(getTelemetryEvents()).toEqual([]);
  });
});

describe('LinePick trong GameScreen + store thật (deb-01)', () => {
  beforeEach(() => {
    useGameStore.setState({ ...initialGameData() });
    clearTelemetry();
    useGameStore.getState().startGame();
    const progress = useGameStore.getState().progress;
    if (!progress) throw new Error('chưa bắt đầu được game');
    useGameStore.setState({
      progress: { ...progress, currentPart: 'debrief', cursor: { sequenceId: 'deb-01', nodeIndex: pickNodeIndex } },
    });
    clearTelemetry();
  });

  const picked = () => getTelemetryEvents().filter((e) => e.type === 'line_picked');

  it('chọn sai rồi chọn đúng: mỗi lần chọn đúng MỘT line_picked; phản hồi hiện qua hộp thoại; dấu "đã thử" còn khi quay lại', async () => {
    const user = userEvent.setup();
    render(<GameScreen />);
    await user.click(lineButtons()[1] as HTMLButtonElement); // dòng 2 — sai
    expect(picked()).toHaveLength(1);
    expect(picked()[0]).toMatchObject({ pickId: PICK.id, lineIndex: 2, attempt: 1, correct: false, isFirstChoice: true });

    // Phản hồi của runtime (Quân rồi Hà Vy), không phạt.
    const feedback = PICK.lines[1]?.feedback ?? [];
    expect(feedback.length).toBeGreaterThan(0);
    for (const line of feedback) {
      expect(await screen.findByText(line.text)).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: /Tiếp tục/ }));
    }

    // Quay lại màn chọn: dòng 2 có dấu, dòng khác không.
    const buttons = lineButtons();
    expect(buttons[1]).toHaveClass('dbf-pick__line--tried');
    expect(buttons.filter((b) => b.classList.contains('dbf-pick__line--tried'))).toHaveLength(1);
    await user.click(buttons[3] as HTMLButtonElement); // dòng 4 — đúng
    expect(picked()).toHaveLength(2);
    expect(picked()[1]).toMatchObject({ lineIndex: 4, attempt: 2, correct: true, isFirstChoice: false });
    // Đi tiếp khỏi màn chọn dòng (deb-02).
    expect(useGameStore.getState().progress?.cursor.sequenceId).toBe('deb-02');
  });
});
