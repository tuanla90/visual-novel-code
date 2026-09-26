/**
 * Tự tách nền phẳng của chân dung (QĐ-063): chỉ nền NỐI với mép bị xóa (loang), chi tiết sáng bên
 * trong người giữ nguyên, thân người chạm mép dưới không bị ăn; khoảng nền kẹt lớn và phẳng bị xóa,
 * vùng nhỏ gần màu nền (mắt) giữ; logo nhỏ trên nền bị xóa; ảnh đã trong suốt / nền không phẳng để nguyên.
 */
import { describe, expect, it } from 'vitest';
import { removeFlatBackground, type PixelData } from './bg-cutout';

type RGB = [number, number, number];
const BG: RGB = [226, 230, 234]; // #E2E6EA — nền xám phẳng trong prompt của user
const RED: RGB = [201, 59, 43]; // áo polo đỏ phượng
const INK: RGB = [30, 30, 36]; // nét viền
const COLLAR: RGB = [236, 238, 240]; // cổ áo trắng: lệch nền ≈ 14 (< ngưỡng loang 18)
const SKIN: RGB = [247, 214, 190];

function makeImage(width: number, height: number, color: RGB = BG): PixelData {
  const data = new Uint8ClampedArray(width * height * 4);
  for (let p = 0; p < width * height; p++) data.set([...color, 255], p * 4);
  return { data, width, height };
}

function fillRect(img: PixelData, x0: number, y0: number, x1: number, y1: number, color: RGB, alpha = 255): void {
  for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) img.data.set([...color, alpha], (y * img.width + x) * 4);
}

/** Khung viền dày `t` bao quanh hình chữ nhật (cạnh dưới để hở nếu `openBottom`). */
function outline(img: PixelData, x0: number, y0: number, x1: number, y1: number, t: number, openBottom = false): void {
  fillRect(img, x0, y0, x1, y0 + t, INK);
  fillRect(img, x0, y0, x0 + t, y1, INK);
  fillRect(img, x1 - t, y0, x1, y1, INK);
  if (!openBottom) fillRect(img, x0, y1 - t, x1, y1, INK);
}

function pixel(img: PixelData, x: number, y: number): number[] {
  const i = (y * img.width + x) * 4;
  return Array.from(img.data.slice(i, i + 4));
}

/**
 * Chân dung giả 300×400: thân áo đỏ có viền, chạm mép dưới; đầu da có viền; cổ áo gần màu nền bên
 * trong; "mắt" nhỏ gần đúng màu nền; khoảng nền kẹt giữa tay và thân (đúng màu nền, kín).
 */
function fakePortrait(): PixelData {
  const img = makeImage(300, 400);
  // Thân: x 60–240, y 200–400 (chạm mép dưới), viền 3 px, cạnh dưới hở (bị mép ảnh cắt).
  fillRect(img, 60, 200, 240, 400, RED);
  outline(img, 60, 200, 240, 400, 3, true);
  // Cổ áo gần màu nền, nằm TRONG thân (được viền bao).
  fillRect(img, 120, 205, 180, 230, COLLAR);
  // Khoảng nền kẹt giữa tay và thân: ô 30×40 đúng màu nền, bao bởi viền (không nối với mép).
  outline(img, 190, 280, 226, 326, 3);
  fillRect(img, 193, 283, 223, 323, BG);
  // Đầu: x 100–200, y 60–200, viền 3 px; "mắt" 5×4 gần đúng màu nền (lệch ≈ 3) bên trong.
  fillRect(img, 100, 60, 200, 203, SKIN);
  outline(img, 100, 60, 200, 203, 3);
  fillRect(img, 130, 110, 135, 114, [228, 231, 235]);
  return img;
}

describe('tách nền phẳng của chân dung', () => {
  it('nền nối với mép → trong suốt; thân chạm mép dưới, viền, da giữ nguyên', () => {
    const img = fakePortrait();
    const result = removeFlatBackground(img);
    expect(result).toMatchObject({ status: 'cut', background: BG });
    for (const [x, y] of [[0, 0], [299, 0], [0, 399], [299, 399], [20, 300], [150, 20], [280, 390]] as const) expect(pixel(img, x, y)[3], `nền (${x},${y})`).toBe(0);
    expect(pixel(img, 150, 399)).toEqual([...RED, 255]); // thân chạm mép dưới
    expect(pixel(img, 90, 300)).toEqual([...RED, 255]);
    expect(pixel(img, 150, 150)).toEqual([...SKIN, 255]);
    expect(pixel(img, 61, 250)[3]).toBe(255); // viền
  });

  it('cổ áo trắng bên trong (gần màu nền nhưng được viền bao) giữ nguyên', () => {
    const img = fakePortrait();
    removeFlatBackground(img);
    for (const [x, y] of [[121, 206], [150, 217], [179, 229]] as const) expect(pixel(img, x, y), `cổ áo (${x},${y})`).toEqual([...COLLAR, 255]);
  });

  it('khoảng nền kẹt lớn và phẳng (giữa tay và thân) → trong suốt; "mắt" nhỏ gần màu nền → giữ', () => {
    const img = fakePortrait();
    const result = removeFlatBackground(img);
    expect(result).toMatchObject({ status: 'cut', holes: 1 });
    expect(pixel(img, 208, 303)[3]).toBe(0);
    expect(pixel(img, 132, 112)).toEqual([228, 231, 235, 255]);
  });

  it('logo/dấu nhỏ nằm giữa nền (không nối với người) → xóa; phần người không bị đụng', () => {
    const img = fakePortrait();
    fillRect(img, 262, 352, 272, 362, [252, 252, 252]); // ngôi sao mờ góc dưới phải
    const result = removeFlatBackground(img);
    expect(result).toMatchObject({ status: 'cut', islands: 1 });
    expect(pixel(img, 266, 356)[3]).toBe(0);
    expect(pixel(img, 150, 150)[3]).toBe(255);
  });

  it('làm mềm 1 px ở biên: điểm pha giữa nền và viền → trong một phần, màu gỡ bớt nền', () => {
    const img = makeImage(100, 100);
    fillRect(img, 30, 30, 70, 100, RED);
    // 90% nền + 10% nét viền: lệch nền ≈ 34, giữa ngưỡng loang (18) và ngưỡng biên (60).
    const mix: RGB = [BG[0] * 0.9 + INK[0] * 0.1, BG[1] * 0.9 + INK[1] * 0.1, BG[2] * 0.9 + INK[2] * 0.1].map(Math.round) as RGB;
    fillRect(img, 29, 30, 30, 100, mix); // cột pha (khử răng cưa) sát mép trái của thân
    removeFlatBackground(img);
    const [r, g, b, a] = pixel(img, 29, 60) as [number, number, number, number];
    expect(a).toBeGreaterThan(0);
    expect(a).toBeLessThan(255);
    expect(r + g + b).toBeLessThan(mix[0] + mix[1] + mix[2]); // tối hơn: phần xám nền đã được gỡ
    expect(pixel(img, 50, 60)).toEqual([...RED, 255]);
  });

  it('ảnh đã trong suốt → để nguyên (không đụng điểm nào)', () => {
    const img = fakePortrait();
    fillRect(img, 0, 0, 300, 10, BG, 0);
    const before = Array.from(img.data);
    expect(removeFlatBackground(img)).toEqual({ status: 'skipped', reason: 'transparent' });
    expect(Array.from(img.data)).toEqual(before);
  });

  it('bốn góc khác màu (nền không phẳng, ví dụ ảnh cảnh) → để nguyên', () => {
    const img = fakePortrait();
    fillRect(img, 280, 0, 300, 20, [120, 160, 90]);
    const before = Array.from(img.data);
    expect(removeFlatBackground(img)).toEqual({ status: 'skipped', reason: 'uneven-corners' });
    expect(Array.from(img.data)).toEqual(before);
  });

  it('hiệu năng: ảnh 1536×2048 (cỡ trong prompt) xử lý đủ nhanh', () => {
    const img = makeImage(1536, 2048);
    fillRect(img, 300, 500, 1236, 2048, RED);
    outline(img, 300, 500, 1236, 2048, 6, true);
    fillRect(img, 500, 200, 1036, 520, SKIN);
    outline(img, 500, 200, 1036, 520, 6);
    fillRect(img, 1000, 1100, 1150, 1500, BG);
    const t0 = performance.now();
    const result = removeFlatBackground(img);
    const ms = performance.now() - t0;
    console.info(`Tách nền 1536×2048 (jsdom): ${ms.toFixed(0)} ms`);
    expect(result.status).toBe('cut');
    // Ngưỡng rộng để không chập chờn khi máy bận; số đo thật trên trình duyệt ghi trong báo cáo.
    expect(ms).toBeLessThan(1500);
  });
});
