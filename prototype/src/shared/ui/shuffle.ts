/** Xáo mảng (Fisher–Yates) với nguồn ngẫu nhiên tiêm được — QĐ-035 xáo lựa chọn mỗi lần hiện. */
export function shuffle<T>(items: readonly T[], random: () => number = Math.random): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(random() * (i + 1));
    const a = out[i] as T;
    out[i] = out[j] as T;
    out[j] = a;
  }
  return out;
}
