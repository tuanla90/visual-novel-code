// @vitest-environment node
/**
 * Tương phản WCAG AA (≥ 4.5:1) cho các cặp chữ/nền màn thử thách dùng mà src/styles/contrast.test.ts
 * chưa đo (tệp đó thuộc gói khác — không sửa). Đọc giá trị thật trong tokens.css.
 * Tự kiểm công cụ: #111 trên #dc2626 phải bị bắt.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = (c: number): number => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r ?? 0) + 0.7152 * lin(g ?? 0) + 0.0722 * lin(b ?? 0);
}

function ratio(fg: string, bg: string): number {
  const a = luminance(fg);
  const b = luminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

function tokens(): Record<string, string> {
  const css = readFileSync(new URL('../../styles/tokens.css', import.meta.url), 'utf8');
  const out: Record<string, string> = {};
  for (const m of css.matchAll(/(--c-[a-z0-9-]+):\s*(#[0-9a-fA-F]{6})/g)) out[m[1] ?? ''] = m[2] ?? '';
  return out;
}

/** (chữ, nền) — token hoặc mã màu viết thẳng trong challenge.css (#fff trên nút chính). */
const PAIRS: [string, string, string][] = [
  ['--c-sql-text', '--c-sql-surface', 'tiêu đề khung SQL, nút "Sửa SQL trực tiếp"'],
  ['--c-sql-comment', '--c-sql-surface', 'dòng nhắc dưới ô soạn SQL'],
  ['--c-sql-highlight', '--c-sql-bg', 'chỗ giữ AND/OR khi chưa chọn phép nối'],
  ['--c-focus', '--c-surface', 'từ khóa SELECT/FROM/WHERE ở đầu hàng'],
  ['#ffffff', '--c-focus', 'nút Chạy, phép nối đang chọn'],
  ['--c-warning', '--c-surface', '"chưa chọn cách nối"'],
  ['--c-char-ha-vy', '--c-surface', 'tên Hà Vy, nút "Hỏi Hà Vy"'],
  ['--c-char-player', '--c-surface', '"Bạn chọn:"'],
  ['--c-text', '--c-bg', 'chữ mã (nền nhạt) trong khung sáng'],
  ['--c-paper-ink', '--c-bg', 'chữ mã trong thẻ chữ lớn'],
  ['--c-char-ha-vy', '--c-bg', '"Hà Vy:" trong khung phản hồi nền nhạt'],
  ['--c-text-muted', '--c-bg', 'ghi chú phụ trên nền nhạt'],
];

describe('tương phản — màn thử thách', () => {
  it('tự kiểm công cụ: #111 trên #dc2626 bị bắt, trắng/đen = 21', () => {
    expect(ratio('#111111', '#dc2626')).toBeLessThan(4.5);
    expect(ratio('#ffffff', '#000000')).toBeCloseTo(21, 0);
  });

  it('mọi cặp chữ/nền mới đạt AA', () => {
    const t = tokens();
    const resolve = (x: string): string | undefined => (x.startsWith('#') ? x : t[x]);
    const failures: string[] = [];
    for (const [fg, bg, where] of PAIRS) {
      const f = resolve(fg);
      const b = resolve(bg);
      if (!f || !b) {
        failures.push(`${fg} / ${bg}: thiếu token (${where})`);
        continue;
      }
      const r = ratio(f, b);
      if (r < 4.5) failures.push(`${fg} (${f}) trên ${bg} (${b}) = ${r.toFixed(2)} — ${where}`);
    }
    expect(failures).toEqual([]);
  });
});
