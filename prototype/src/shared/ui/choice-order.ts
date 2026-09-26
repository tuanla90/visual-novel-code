/**
 * Thứ tự lựa chọn đã xáo của mỗi câu hỏi, nhớ NGOÀI component (QĐ-041): GameScreen gỡ `MultipleChoice`
 * khi hiện phản hồi (khung nhìn `feedback`) rồi dựng lại khi cho chọn lại — `useMemo` trong component
 * mất theo, câu hỏi bị xáo lại và nút vừa bấm "chạy chỗ khác" (lỗi tìm thấy khi chơi thật, gói 9b).
 *
 * - `attempts === 0` (câu hỏi vừa mở, hoặc đã chơi lại từ đầu) → xáo mới và ghi nhớ.
 * - `attempts > 0` → dùng lại thứ tự đã nhớ (nếu vẫn khớp bộ lựa chọn); chưa nhớ thì xáo rồi nhớ.
 */
import type { MultipleChoiceQuestion } from '../../story/types';
import { shuffle } from './shuffle';

type Choice = MultipleChoiceQuestion['choices'][number];

const remembered = new Map<string, string[]>();

export function orderedChoices(question: MultipleChoiceQuestion, attempts: number, random?: () => number): Choice[] {
  const ids = remembered.get(question.id);
  if (attempts > 0 && ids && ids.length === question.choices.length && ids.every((id) => question.choices.some((c) => c.id === id))) {
    return ids.map((id) => question.choices.find((c) => c.id === id) as Choice);
  }
  const shuffled = shuffle(question.choices, random);
  remembered.set(
    question.id,
    shuffled.map((c) => c.id),
  );
  return shuffled;
}

/** Test dùng để trả lại trạng thái ban đầu. */
export function forgetChoiceOrders(): void {
  remembered.clear();
}
