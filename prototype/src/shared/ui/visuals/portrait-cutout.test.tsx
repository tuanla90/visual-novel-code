/**
 * Lớp dán canvas của tách nền chân dung (QĐ-063): đang xử lý → hình vẽ tạm; xong → ảnh đã tách
 * (URL blob, lưu đệm theo URL); lỗi → ảnh gốc; môi trường không có canvas → ảnh gốc ngay. Nhãn cho
 * trình đọc màn hình không đổi, không định danh thô.
 */
import { render, renderHook, waitFor } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { Portrait } from '../Portrait';
import type * as ArtSlots from './art-slots';
import { resetCutoutCacheForTest, usePortraitCutout } from './portrait-cutout';

const IMAGE_URL = '/src/assets/characters/char-minh-anh-anchor.png';

vi.mock('./art-slots', async (importOriginal) => {
  const actual = await importOriginal<typeof ArtSlots>();
  return {
    ...actual,
    resolvePortrait: (character: string, expression: string) =>
      character === 'minh-anh'
        ? { slot: `minh-anh-${expression}`, from: 'minh-anh-neutral', url: IMAGE_URL }
        : { slot: `${character}-${expression}` },
  };
});

/** Ảnh giả 40×60: nền xám phẳng, "người" đỏ chạm mép dưới. */
function fakeImageData(): { data: Uint8ClampedArray; width: number; height: number } {
  const width = 40;
  const height = 60;
  const data = new Uint8ClampedArray(width * height * 4);
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const body = x >= 10 && x < 30 && y >= 20;
      data.set(body ? [201, 59, 43, 255] : [226, 230, 234, 255], (y * width + x) * 4);
    }
  }
  return { data, width, height };
}

let written: { data: Uint8ClampedArray } | null = null;

class FakeOffscreenCanvas {
  constructor(
    public width: number,
    public height: number,
  ) {}
  getContext() {
    return {
      drawImage: () => {},
      getImageData: () => fakeImageData(),
      putImageData: (image: { data: Uint8ClampedArray }) => {
        written = image;
      },
    };
  }
  convertToBlob() {
    return Promise.resolve(new Blob(['webp']));
  }
}

function stubCanvas(fetchImpl: () => Promise<unknown>): void {
  vi.stubGlobal('OffscreenCanvas', FakeOffscreenCanvas);
  vi.stubGlobal('createImageBitmap', () => Promise.resolve({ width: 40, height: 60, close: () => {} }));
  vi.stubGlobal('fetch', vi.fn(fetchImpl));
  URL.createObjectURL = vi.fn(() => 'blob:tach-nen');
}

const okFetch = () => Promise.resolve({ ok: true, status: 200, blob: () => Promise.resolve(new Blob(['jpg'])) });

beforeEach(() => {
  resetCutoutCacheForTest();
  written = null;
});

afterEach(() => {
  vi.unstubAllGlobals();
  Reflect.deleteProperty(URL, 'createObjectURL');
});

describe('tách nền chân dung trên canvas', () => {
  it('không có canvas ngoài màn hình (jsdom) → ảnh gốc ngay, không qua "đang xử lý"; không có ảnh → undefined', () => {
    const { result } = renderHook(() => usePortraitCutout(IMAGE_URL));
    expect(result.current).toEqual({ status: 'unsupported', src: IMAGE_URL });
    expect(renderHook(() => usePortraitCutout(undefined)).result.current).toBeUndefined();
  });

  it('đang xử lý → hiện ngay ảnh gốc (không nháy hình vẽ tạm); xong → ảnh đã tách nền (góc trong suốt), nhãn tiếng Việt giữ nguyên', async () => {
    stubCanvas(okFetch);
    const { container } = render(<Portrait character="minh-anh" expression="neutral" />);
    const figure = () => container.querySelector('figure');
    expect(figure()?.getAttribute('data-art-cutout')).toBe('pending');
    expect(figure()?.getAttribute('data-art-source')).toBe('image');
    expect(container.querySelector('img')?.getAttribute('src')).toBe(IMAGE_URL);
    expect(container.querySelector('svg')).toBeNull();

    await waitFor(() => expect(figure()?.getAttribute('data-art-cutout')).toBe('cut'));
    expect(figure()?.getAttribute('data-art-source')).toBe('image');
    expect(container.querySelector('img')?.getAttribute('src')).toBe('blob:tach-nen');
    expect(container.querySelector('img')?.getAttribute('alt')).toBe('');
    expect(figure()?.getAttribute('aria-label')).toBe('Minh Anh, bình thường');
    expect(written?.data[3]).toBe(0); // góc trên trái đã trong suốt
    expect(written?.data[((59 * 40) + 20) * 4 + 3]).toBe(255); // thân chạm mép dưới giữ nguyên
  });

  it('lưu đệm theo URL: biểu cảm khác mượn cùng ảnh → không tải/xử lý lại', async () => {
    stubCanvas(okFetch);
    const first = render(<Portrait character="minh-anh" expression="neutral" />);
    await waitFor(() => expect(first.container.querySelector('figure')?.getAttribute('data-art-cutout')).toBe('cut'));
    const second = render(<Portrait character="minh-anh" expression="happy" />);
    expect(second.container.querySelector('img')?.getAttribute('src')).toBe('blob:tach-nen');
    expect(second.container.querySelector('figure')?.getAttribute('data-art-borrowed-from')).toBe('minh-anh-neutral');
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  it('lỗi tải/giải mã → dùng ảnh gốc không tách', async () => {
    stubCanvas(() => Promise.reject(new Error('mạng')));
    const { container } = render(<Portrait character="minh-anh" expression="worried" />);
    await waitFor(() => expect(container.querySelector('figure')?.getAttribute('data-art-cutout')).toBe('failed'));
    expect(container.querySelector('img')?.getAttribute('src')).toBe(IMAGE_URL);
    expect(container.querySelector('figure')?.getAttribute('data-art-source')).toBe('image');
  });

  it('nhân vật chưa có ảnh → hình vẽ tạm, không gắn trạng thái tách nền', () => {
    stubCanvas(okFetch);
    const { container } = render(<Portrait character="ha-vy" expression="smile" />);
    expect(container.querySelector('figure')?.hasAttribute('data-art-cutout')).toBe(false);
    expect(container.querySelector('figure')?.getAttribute('data-art-source')).toBe('placeholder');
    expect(fetch).not.toHaveBeenCalled();
  });
});
