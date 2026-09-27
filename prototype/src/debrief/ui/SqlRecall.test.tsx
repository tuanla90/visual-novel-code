/**
 * QĐ-061-Đ1: khi phản hồi đến từ màn chọn dòng (chọn sai), 5 dòng SQL của Quân vẫn hiện CHỈ ĐỌC phía
 * trên hộp thoại, tô màu đồng đều (không phần tử nào mang lớp nổi bật riêng cho `OR`); hết phản hồi
 * thì bảng chỉ đọc biến mất, màn chọn dòng quay lại. Phản hồi của câu hỏi thường không có bảng này.
 * Chạy qua GameScreen + store thật trên nội dung thật.
 */
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { GameScreen } from '../../app/GameScreen';
import { realContent } from '../../content/real';
import { useGameStore } from '../../shared/store';
import { initialGameData } from '../../shared/store/store';
import { clearTelemetry } from '../../shared/telemetry/track';
import type { LinePickNode, QuestionNode } from '../../story/types';
import { passPressGuard } from '../../test/press-guard';
import { SQL_RECALL_LABEL } from './SqlRecall';

function nodeIndexOf(sequenceId: string, predicate: (n: LinePickNode | QuestionNode) => boolean): number {
  const seq = realContent.story.sequences.find((s) => s.id === sequenceId);
  const i = seq?.nodes.findIndex((n) => (n.type === 'line-pick' || n.type === 'question') && predicate(n)) ?? -1;
  if (i < 0) throw new Error(`nội dung thật thiếu node ở ${sequenceId}`);
  return i;
}
const PICK_INDEX = nodeIndexOf('deb-01', (n) => n.type === 'line-pick' && n.pick.id === 'q-quan-lines');
const PICK = (realContent.story.sequences.find((s) => s.id === 'deb-01')?.nodes[PICK_INDEX] as LinePickNode).pick;
const Q_INDEX = nodeIndexOf('deb-03', (n) => n.type === 'question' && n.question.id === 'q-two-rows');

function startAt(sequenceId: string, nodeIndex: number): void {
  useGameStore.setState({ ...initialGameData() });
  clearTelemetry();
  useGameStore.getState().startGame();
  const progress = useGameStore.getState().progress;
  if (!progress) throw new Error('chưa bắt đầu được game');
  useGameStore.setState({ progress: { ...progress, currentPart: 'debrief', cursor: { sequenceId, nodeIndex } } });
}

const recall = () => screen.queryByRole('complementary', { name: SQL_RECALL_LABEL });
const pickButtons = () => within(screen.getByRole('region', { name: 'Dòng nào gây lỗi?' })).getAllByRole('button');

describe('SqlRecall — câu SQL của Quân khi hiện phản hồi chọn dòng (QĐ-061-Đ1)', () => {
  beforeEach(() => startAt('deb-01', PICK_INDEX));

  it('chọn sai → trong suốt các lời phản hồi, 5 dòng SQL có trong DOM (chỉ đọc), rồi biến mất khi quay lại màn chọn', async () => {
    const user = userEvent.setup();
    render(<GameScreen />);
    expect(recall()).toBeNull();
    await user.click(pickButtons()[0] as HTMLButtonElement); // dòng 1 — sai

    const feedback = PICK.lines[0]?.feedback ?? [];
    expect(feedback.length).toBeGreaterThan(0);
    for (const line of feedback) {
      expect(await screen.findByText(line.text)).toBeInTheDocument();
      const panel = recall();
      expect(panel).not.toBeNull();
      const items = within(panel as HTMLElement).getAllByRole('listitem');
      expect(items).toHaveLength(5);
      PICK.lines.forEach((l, i) => expect(items[i]?.querySelector('.dbf-code')?.textContent).toBe(l.sql));
      // Chỉ đọc: không nút (lớp dbf-recall tắt nhận chuột trong CSS); hộp thoại vẫn còn nút đi tiếp.
      expect(within(panel as HTMLElement).queryAllByRole('button')).toHaveLength(0);
      expect(panel).toHaveClass('dbf-recall');
      expect(screen.getByRole('button', { name: /Tiếp tục/ })).toBeInTheDocument();
      await user.click(screen.getByRole('button', { name: /Tiếp tục/ }));
    }
    expect(recall()).toBeNull();
    expect(pickButtons()).toHaveLength(5);
  });

  it('tô màu đồng đều: mọi từ khóa (kể cả OR) cùng một lớp; không phần tử nào mang lớp riêng cho OR', async () => {
    const user = userEvent.setup();
    render(<GameScreen />);
    await user.click(pickButtons()[2] as HTMLButtonElement); // dòng 3 — sai
    const panel = recall();
    expect(panel).not.toBeNull();
    const tokens = [...(panel as HTMLElement).querySelectorAll<HTMLElement>('.dbf-code *')];
    const keywordClasses = new Set(tokens.filter((t) => /^(SELECT|FROM|WHERE|LIKE|IN|OR|AND)$/i.test(t.textContent ?? '')).map((t) => t.className));
    expect(keywordClasses.size).toBe(1);
    const orTokens = tokens.filter((t) => t.textContent === 'OR');
    expect(orTokens).toHaveLength(2);
    const selectToken = tokens.find((t) => t.textContent === 'SELECT');
    for (const t of orTokens) expect(t.className).toBe(selectToken?.className);
    // Không phần tử nào trong bảng mang lớp/thuộc tính nổi bật riêng (sql-term, tooltip, aria-describedby).
    for (const el of (panel as HTMLElement).querySelectorAll('*')) {
      expect([...el.classList].some((c) => /term|or\b|highlight|hl/i.test(c)), el.className).toBe(false);
      expect(el.hasAttribute('aria-describedby')).toBe(false);
      expect(el.getAttribute('role')).not.toBe('tooltip');
    }
    // Dòng 4, 5 (đúng) không dùng lớp nào mà dòng 1–3 không dùng.
    const items = within(panel as HTMLElement).getAllByRole('listitem');
    const classesOf = (li: HTMLElement) => new Set([...li.querySelectorAll<HTMLElement>('*')].flatMap((e) => [...e.classList]));
    const wrong = new Set(items.slice(0, 3).flatMap((li) => [...classesOf(li)]));
    for (const li of items.slice(3)) for (const c of classesOf(li)) expect(wrong, c).toContain(c);
    // Không lộ định danh thô.
    expect((panel as HTMLElement).textContent).not.toMatch(/q-quan|deb-0|proj-/);
  });

  it('phản hồi của câu hỏi thường (q-two-rows) không có bảng SQL', async () => {
    startAt('deb-03', Q_INDEX);
    const user = userEvent.setup();
    render(<GameScreen />);
    const wrongText = (realContent.story.sequences.find((s) => s.id === 'deb-03')?.nodes[Q_INDEX] as QuestionNode).question.choices.find((c) => !c.correct)?.text;
    await passPressGuard();
    await user.click(screen.getByRole('button', { name: wrongText }));
    expect(await screen.findByRole('button', { name: /Tiếp tục/ })).toBeInTheDocument();
    expect(recall()).toBeNull();
  });
});
