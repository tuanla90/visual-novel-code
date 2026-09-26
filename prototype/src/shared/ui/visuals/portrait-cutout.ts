/**
 * Lớp dán mỏng giữa ảnh chân dung và thuật toán tách nền (`bg-cutout.ts`, QĐ-063): tải ảnh → canvas
 * ngoài màn hình → `removeFlatBackground` → ảnh WebP không mất dữ liệu (nhanh hơn PNG ~10 lần) →
 * URL blob. Kết quả lưu đệm theo URL ảnh gốc (mỗi ảnh chỉ xử lý một lần mỗi phiên).
 *
 * - Đang xử lý → `pending` (Chân dung hiện hình vẽ tạm).
 * - Nền đã tách → `cut` + URL blob. Ảnh đã trong suốt / nền không phẳng → `kept` + ảnh gốc.
 * - Lỗi (tải, giải mã, canvas) → `failed` + ảnh gốc không tách.
 * - Môi trường không có canvas ngoài màn hình (jsdom khi test) → `unsupported` + ảnh gốc, ngay lập tức.
 */
import { useEffect, useSyncExternalStore } from 'react';
import { removeFlatBackground } from './bg-cutout';

export type CutoutStatus = 'pending' | 'cut' | 'kept' | 'failed' | 'unsupported';

export interface CutoutState {
  status: CutoutStatus;
  /** URL để hiển thị (blob đã tách nền, hoặc ảnh gốc); không có khi đang xử lý. */
  src?: string;
}

const PENDING: CutoutState = { status: 'pending' };
const states = new Map<string, CutoutState>();
const listeners = new Set<() => void>();

function notify(): void {
  for (const listener of listeners) listener();
}

/** Trình duyệt có đủ công cụ để tách nền không (jsdom thì không). */
export function canCutout(): boolean {
  return typeof createImageBitmap === 'function' && typeof OffscreenCanvas === 'function' && typeof URL.createObjectURL === 'function';
}

async function cutOut(url: string): Promise<CutoutState> {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const bitmap = await createImageBitmap(await response.blob());
  const canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
  const ctx = canvas.getContext('2d', { willReadFrequently: true });
  if (!ctx) throw new Error('no 2d context');
  ctx.drawImage(bitmap, 0, 0);
  bitmap.close();
  const image = ctx.getImageData(0, 0, canvas.width, canvas.height);
  const result = removeFlatBackground(image);
  if (result.status !== 'cut') return { status: 'kept', src: url };
  ctx.putImageData(image, 0, 0);
  const blob = await canvas.convertToBlob({ type: 'image/webp', quality: 1 });
  return { status: 'cut', src: URL.createObjectURL(blob) };
}

/** Bắt đầu tách nền cho `url` (không làm gì nếu đã có/đang làm). */
export function requestCutout(url: string): void {
  if (states.has(url)) return;
  if (!canCutout()) {
    states.set(url, { status: 'unsupported', src: url });
    notify();
    return;
  }
  states.set(url, PENDING);
  void cutOut(url)
    .catch((): CutoutState => ({ status: 'failed', src: url }))
    .then((state) => {
      states.set(url, state);
      notify();
    });
}

/** Trạng thái hiện tại (ổn định giữa các lần gọi, dùng cho `useSyncExternalStore`). */
export function cutoutState(url: string): CutoutState {
  const known = states.get(url);
  if (known) return known;
  // Không tách được thì dùng ngay ảnh gốc, không qua bước "đang xử lý".
  if (!canCutout()) {
    const state: CutoutState = { status: 'unsupported', src: url };
    states.set(url, state);
    return state;
  }
  return PENDING;
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

const NONE: CutoutState | undefined = undefined;

/**
 * Chân dung có ảnh thật → trạng thái tách nền của ảnh đó; không có ảnh → `undefined` (vẽ tạm).
 */
export function usePortraitCutout(url: string | undefined): CutoutState | undefined {
  const state = useSyncExternalStore(
    subscribe,
    () => (url ? cutoutState(url) : NONE),
    () => (url ? cutoutState(url) : NONE),
  );
  useEffect(() => {
    if (url) requestCutout(url);
  }, [url]);
  return state;
}

/** Chỉ cho test: xóa bộ đệm. */
export function resetCutoutCacheForTest(): void {
  states.clear();
}
