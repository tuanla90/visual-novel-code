/** Nhịp hoạt ảnh của màn tra: khi test (jsdom) không chờ. */
export const NHIP = import.meta.env.MODE === 'test' ? 0 : 1;
export const ngu = (ms: number): Promise<void> => (ms * NHIP <= 0 ? Promise.resolve() : new Promise((r) => setTimeout(r, ms * NHIP)));

/** Máy đang bật "giảm chuyển động" (gói B14): hoạt cảnh rụng dòng bỏ qua phần diễn, hiện thẳng kết quả. */
export function giamChuyenDong(): boolean {
  return typeof window !== 'undefined' && typeof window.matchMedia === 'function' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}
