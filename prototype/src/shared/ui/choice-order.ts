/**
 * Thứ tự lựa chọn đã xáo của mỗi câu hỏi, nhớ NGOÀI component (QĐ-041): GameScreen gỡ `MultipleChoice`
 * khi hiện phản hồi (khung nhìn `feedback`) rồi dựng lại khi cho chọn lại — `useMemo` trong component
 * mất theo, câu hỏi bị xáo lại và nút vừa bấm "chạy chỗ khác" (lỗi tìm thấy khi chơi thật, gói 9b).
 *
 * - An toàn với React 19 StrictMode: không xáo lại trong cùng một chu kỳ render đồng bộ (render 2 lần ở dev mode).
 * - `attempts > 0`: giữ nguyên trật tự lựa chọn đã nhớ (QĐ-041).
 * - Chơi lại từ đầu (phiên mới, attempts = 0 ở chu kỳ mới): xáo mới và ghi nhớ.
 */
import type { MultipleChoiceQuestion } from '../../story/types';
import { shuffle } from './shuffle';

type Choice = MultipleChoiceQuestion['choices'][number];

interface OrderEntry {
  ids: string[];
  version: number;
}

const remembered = new Map<string, OrderEntry>();

let tick = 0;
let pending = false;

function advanceTickLater(): void {
  if (pending || typeof queueMicrotask !== 'function') return;
  pending = true;
  queueMicrotask(() => {
    tick += 1;
    pending = false;
  });
}

export function orderedChoices(question: MultipleChoiceQuestion, attempts: number, random?: () => number): Choice[] {
  advanceTickLater();
  const entry = remembered.get(question.id);
  const ids = entry?.ids;
  const isCompatible = Boolean(ids && ids.length === question.choices.length && ids.every((id) => question.choices.some((c) => c.id === id)));

  // Nếu là lượt thử lại (attempts > 0) hoặc cùng một chu kỳ render đồng bộ (React 19 StrictMode double-render):
  if (isCompatible && (attempts > 0 || entry?.version === tick)) {
    return ids!.map((id) => question.choices.find((c) => c.id === id) as Choice);
  }

  const shuffled = shuffle(question.choices, random);
  remembered.set(question.id, {
    ids: shuffled.map((c) => c.id),
    version: tick,
  });
  return shuffled;
}

/** Test dùng để trả lại trạng thái ban đầu. */
export function forgetChoiceOrders(): void {
  remembered.clear();
}
