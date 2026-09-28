/**
 * Thứ tự lựa chọn đã xáo của mỗi câu hỏi, nhớ NGOÀI component (QĐ-041): GameScreen gỡ `MultipleChoice`
 * khi hiện phản hồi (khung nhìn `feedback`) rồi dựng lại khi cho chọn lại — `useMemo` trong component
 * mất theo, câu hỏi bị xáo lại và nút vừa bấm "chạy chỗ khác" (lỗi tìm thấy khi chơi thật, gói 9b).
 *
 * Khóa nhớ = phiên chơi (`gameKey`: GameScreen/SuccessPanel truyền `progress.startedAt`) + id câu hỏi.
 * Đã nhớ thì KHÔNG ghi đè (QĐ-066): ở chế độ dev, StrictMode gọi thân component (và `useMemo`) hai lần —
 * cách cũ "attempts === 0 → xáo mới và ghi đè" làm lần gọi thứ hai ghi đè thứ tự ĐANG HIỆN, nên khi
 * dựng lại với attempts > 0 các nút đổi chỗ (rà soát code 10a). Chơi lại từ đầu → `startedAt` mới →
 * khóa mới → xáo mới. Nội dung đổi bộ lựa chọn (HMR) → thứ tự nhớ không khớp → xáo lại.
 */
import type { MultipleChoiceQuestion } from '../../story/types';
import { shuffle } from './shuffle';

type Choice = MultipleChoiceQuestion['choices'][number];

/** Định danh phiên chơi; `null`/`undefined` (chưa có tiến độ, test đơn vị) gom về một khóa chung. */
export type GameKey = string | number | null | undefined;

const remembered = new Map<string, string[]>();

export function orderedChoices(question: MultipleChoiceQuestion, gameKey: GameKey, random?: () => number): Choice[] {
  const key = `${String(gameKey ?? '')}|${question.id}`;
  const ids = remembered.get(key);
  if (ids && ids.length === question.choices.length && ids.every((id) => question.choices.some((c) => c.id === id))) {
    return ids.map((id) => question.choices.find((c) => c.id === id) as Choice);
  }

  const shuffled = shuffle(question.choices, random);
  remembered.set(
    key,
    shuffled.map((c) => c.id),
  );
  return shuffled;
}

/** Test dùng để trả lại trạng thái ban đầu. */
export function forgetChoiceOrders(): void {
  remembered.clear();
}
