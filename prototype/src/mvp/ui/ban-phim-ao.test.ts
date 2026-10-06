import { describe, expect, it } from 'vitest';
import { dangGoOBanPhim } from './ban-phim-ao';

function o(tag: 'input' | 'textarea' | 'button', type?: string): Element {
  const el = document.createElement(tag);
  if (type) (el as HTMLInputElement).type = type;
  return el;
}

describe('bàn phím ảo: chế độ gõ', () => {
  it('ô chữ có tiêu điểm + vùng thấy được thấp hơn 80% cửa sổ → đang gõ', () => {
    expect(dangGoOBanPhim(o('input'), 170, 375)).toBe(true);
    expect(dangGoOBanPhim(o('textarea'), 400, 812)).toBe(true);
  });
  it('vùng thấy được còn gần đủ (không có bàn phím) → không', () => {
    expect(dangGoOBanPhim(o('input'), 375, 375)).toBe(false);
    expect(dangGoOBanPhim(o('input'), 320, 375)).toBe(false);
  });
  it('không có ô nhập nào có tiêu điểm (nút, ô tick, trống) → không, dù vùng thấy thấp', () => {
    expect(dangGoOBanPhim(o('button'), 170, 375)).toBe(false);
    expect(dangGoOBanPhim(o('input', 'checkbox'), 170, 375)).toBe(false);
    expect(dangGoOBanPhim(null, 170, 375)).toBe(false);
  });
  it('số đo hỏng (0) → không', () => {
    expect(dangGoOBanPhim(o('input'), 0, 375)).toBe(false);
    expect(dangGoOBanPhim(o('input'), 170, 0)).toBe(false);
  });
});
