// @vitest-environment node
/**
 * Tương phản WCAG AA cho màu riêng của màn chiếu / màn chọn dòng (biến --dbf-* trong debrief.css).
 * Chữ thường ≥ 4.5:1; viền tiêu điểm (không phải chữ) ≥ 3:1.
 * Tự kiểm công cụ trước: #111 trên #dc2626 phải bị bắt; và một biến cố ý đặt sai phải bị bắt.
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

function readVars(css: string): Record<string, string> {
  const out: Record<string, string> = {};
  for (const m of css.matchAll(/(--dbf-[a-z0-9-]+):\s*(#[0-9a-fA-F]{6})\b/g)) out[m[1] ?? ''] = m[2] ?? '';
  return out;
}

const CSS = readFileSync(new URL('./debrief.css', import.meta.url), 'utf8');

/** (chữ, nền, nơi dùng, ngưỡng). */
const PAIRS: [string, string, string, number][] = [
  ['--dbf-ink', '--dbf-screen-bg', 'tiêu đề, chữ trên nền màn chiếu', 4.5],
  ['--dbf-ink', '--dbf-screen-glow', 'tiêu đề ở vùng sáng nhất của nền', 4.5],
  ['--dbf-ink-muted', '--dbf-screen-bg', 'nhãn "Màn chiếu", lời dẫn, ghi chú', 4.5],
  ['--dbf-ink-muted', '--dbf-screen-glow', 'nhãn "Màn chiếu" ở vùng sáng nhất', 4.5],
  ['--dbf-ink', '--dbf-panel-bg', 'tên cột/định danh trong dòng SQL', 4.5],
  ['--dbf-ink', '--dbf-panel-hover', 'dòng SQL khi rê chuột', 4.5],
  ['--dbf-ink-muted', '--dbf-panel-bg', 'số dòng, nhãn "đã thử"', 4.5],
  ['--dbf-ink-muted', '--dbf-panel-hover', 'số dòng khi rê chuột', 4.5],
  ['--dbf-kw', '--dbf-panel-bg', 'từ khóa SQL', 4.5],
  ['--dbf-kw', '--dbf-panel-hover', 'từ khóa SQL khi rê chuột', 4.5],
  ['--dbf-str', '--dbf-panel-bg', 'chuỗi SQL', 4.5],
  ['--dbf-str', '--dbf-panel-hover', 'chuỗi SQL khi rê chuột', 4.5],
  ['--dbf-num', '--dbf-panel-bg', 'số trong SQL', 4.5],
  ['--dbf-punct', '--dbf-panel-bg', 'dấu câu SQL', 4.5],
  ['--dbf-punct', '--dbf-panel-hover', 'dấu câu SQL khi rê chuột', 4.5],
  ['--dbf-count', '--dbf-screen-bg', '"24 dòng"', 4.5],
  ['--dbf-count', '--dbf-screen-glow', '"24 dòng" ở vùng sáng nhất', 4.5],
  ['--dbf-count', '--dbf-panel-bg', '"Sau: 2 dòng" trong dải so sánh', 4.5],
  ['--dbf-ink', '--dbf-table-head', 'tiêu đề cột bảng kết quả', 4.5],
  ['--dbf-ink', '--dbf-row-alt', 'dòng chẵn của bảng kết quả', 4.5],
  ['--dbf-ink-muted', '--dbf-row-alt', '"(trống)" ở dòng chẵn', 4.5],
  ['--dbf-error', '--dbf-screen-bg', 'câu báo chạy lỗi', 4.5],
  ['--dbf-btn-ink', '--dbf-btn-bg', 'nút "Tiếp tục"', 4.5],
  ['--dbf-btn-ink', '--dbf-btn-hover', 'nút "Tiếp tục" khi rê chuột', 4.5],
  ['--dbf-focus', '--dbf-screen-bg', 'viền tiêu điểm trên nền màn chiếu', 3],
  ['--dbf-focus', '--dbf-panel-bg', 'viền tiêu điểm trên dòng SQL', 3],
];

function failuresOf(vars: Record<string, string>): string[] {
  const failures: string[] = [];
  for (const [fg, bg, where, min] of PAIRS) {
    const f = vars[fg];
    const b = vars[bg];
    if (!f || !b) {
      failures.push(`${fg} / ${bg}: thiếu biến (${where})`);
      continue;
    }
    const r = ratio(f, b);
    if (r < min) failures.push(`${fg} (${f}) trên ${bg} (${b}) = ${r.toFixed(2)} < ${min} — ${where}`);
  }
  return failures;
}

describe('tương phản — màn chiếu / màn chọn dòng', () => {
  it('tự kiểm công cụ: #111 trên #dc2626 bị bắt; trắng/đen = 21; đổi một biến thành màu tối thì bị bắt', () => {
    expect(ratio('#111111', '#dc2626')).toBeLessThan(4.5);
    expect(ratio('#ffffff', '#000000')).toBeCloseTo(21, 0);
    const broken = { ...readVars(CSS), '--dbf-kw': '#1e3a5f' };
    expect(failuresOf(broken).some((f) => f.startsWith('--dbf-kw'))).toBe(true);
  });

  it('đọc được đủ biến màu trong debrief.css', () => {
    const vars = readVars(CSS);
    for (const [fg, bg] of PAIRS) {
      expect(vars[fg], fg).toMatch(/^#[0-9a-f]{6}$/i);
      expect(vars[bg], bg).toMatch(/^#[0-9a-f]{6}$/i);
    }
  });

  it('mọi cặp chữ/nền đạt AA', () => {
    expect(failuresOf(readVars(CSS))).toEqual([]);
  });
});

describe('vùng màn chiếu: 4 biến CSS có giá trị mặc định, khung dùng đúng 4 biến đó', () => {
  it('định nghĩa ở :root và dùng ở .dbf-screen', () => {
    const root = /:root\s*\{([^}]*)\}/.exec(CSS)?.[1] ?? '';
    const screen = /\.dbf-screen\s*\{([^}]*)\}/.exec(CSS)?.[1] ?? '';
    for (const side of ['top', 'right', 'bottom', 'left']) {
      expect(root, side).toMatch(new RegExp(`--projector-${side}:\\s*\\d+(\\.\\d+)?%;`));
      expect(screen, side).toContain(`${side}: var(--projector-${side});`);
    }
  });
});
