/**
 * Nhớ các dòng đã chọn SAI của một màn chọn dòng, qua các lần màn này bị gỡ khỏi màn hình.
 *
 * Runtime chỉ giữ `attempts` / lựa chọn đầu / lựa chọn đúng (ChoiceProgress), và GameScreen gỡ
 * LinePick trong lúc hiện phản hồi rồi dựng lại → trạng thái trong component mất. Bộ nhớ nhỏ này
 * nằm ngoài component (theo id màn chọn), đọc qua useSyncExternalStore.
 *
 * Quy ước làm mới: khi runtime báo `attempts === 0` (lần đầu, hoặc đã chơi lại từ đầu) thì bỏ qua
 * mọi thứ đã nhớ; lần chọn sai đầu tiên sau đó ghi đè. Tải lại trang thì mất dấu (chỉ là dấu nhẹ).
 */

const EMPTY: ReadonlySet<number> = new Set();
const memory = new Map<string, ReadonlySet<number>>();
const listeners = new Set<() => void>();

/** Các dòng đã chọn sai của màn `pickId` (tham chiếu ổn định khi không đổi). */
export function triedLines(pickId: string): ReadonlySet<number> {
  return memory.get(pickId) ?? EMPTY;
}

/** Ghi thêm một dòng chọn sai. `fresh`: bắt đầu lại từ rỗng (runtime báo chưa chọn lần nào). */
export function rememberTried(pickId: string, lineIndex: number, fresh: boolean): void {
  const base = fresh ? EMPTY : triedLines(pickId);
  if (base.has(lineIndex) && !fresh) return;
  memory.set(pickId, new Set([...base, lineIndex]));
  for (const l of listeners) l();
}

export function subscribeTried(listener: () => void): () => void {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

export const NO_TRIED_LINES = EMPTY;
