/** Nhịp hoạt ảnh của màn tra: khi test (jsdom) không chờ. */
export const NHIP = import.meta.env.MODE === 'test' ? 0 : 1;
export const ngu = (ms: number): Promise<void> => (ms * NHIP <= 0 ? Promise.resolve() : new Promise((r) => setTimeout(r, ms * NHIP)));
