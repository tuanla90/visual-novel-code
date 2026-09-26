// @vitest-environment node
/**
 * Đo tương phản WCAG AA bằng công cụ trên các cặp màu chữ/nền thật sự dùng trong tokens.css.
 * Tự kiểm công cụ: #111 trên #dc2626 phải bị bắt (< 4.5).
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

function luminance(hex: string): number {
  const h = hex.replace('#', '');
  const [r, g, b] = [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16) / 255);
  const lin = (c: number): number => (c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
  return 0.2126 * lin(r ?? 0) + 0.7152 * lin(g ?? 0) + 0.0722 * lin(b ?? 0);
}

export function contrastRatio(fg: string, bg: string): number {
  const a = luminance(fg);
  const b = luminance(bg);
  const [hi, lo] = a > b ? [a, b] : [b, a];
  return (hi + 0.05) / (lo + 0.05);
}

function readTokens(): Record<string, string> {
  const css = readFileSync(new URL('./tokens.css', import.meta.url), 'utf8');
  const tokens: Record<string, string> = {};
  for (const m of css.matchAll(/(--c-[a-z0-9-]+):\s*(#[0-9a-fA-F]{6})/g)) {
    tokens[m[1] ?? ''] = m[2] ?? '';
  }
  return tokens;
}

/** Cặp (chữ, nền) dùng trong giao diện khung. Gói 7 thêm cặp mới vào đây khi đổi token. */
const PAIRS: [string, string][] = [
  ['--c-text', '--c-bg'],
  ['--c-text', '--c-surface'],
  ['--c-text-muted', '--c-surface'],
  ['--c-text-muted', '--c-bg'],
  ['--c-topbar-text', '--c-topbar-bg'],
  ['--c-topbar-bg', '--c-topbar-accent'],
  ['--c-paper-ink', '--c-paper'],
  ['--c-paper-note', '--c-paper'],
  ['--c-sql-text', '--c-sql-bg'],
  ['--c-sql-keyword', '--c-sql-bg'],
  ['--c-sql-string', '--c-sql-bg'],
  ['--c-sql-number', '--c-sql-bg'],
  ['--c-sql-comment', '--c-sql-bg'],
  ['--c-success', '--c-success-bg'],
  ['--c-warning', '--c-warning-bg'],
  ['--c-error', '--c-error-bg'],
  ['--c-char-minh-anh-ink', '--c-char-minh-anh'],
  ['--c-char-ha-vy-ink', '--c-char-ha-vy'],
  ['--c-char-quan-ink', '--c-char-quan'],
  ['--c-char-hoai-ink', '--c-char-hoai'],
  ['--c-char-bac-tu-ink', '--c-char-bac-tu'],
  ['--c-char-player-ink', '--c-char-player'],
  ['--c-char-narrator-ink', '--c-char-narrator'],
  ['--c-text', '--c-scene-clb-room'],
  ['--c-text', '--c-scene-corridor-b'],
  ['--c-text', '--c-scene-debrief-room'],
];

describe('tương phản WCAG AA (≥ 4.5:1 cho chữ thường)', () => {
  it('tự kiểm công cụ: #111 trên #dc2626 bị bắt', () => {
    expect(contrastRatio('#111111', '#dc2626')).toBeLessThan(4.5);
    expect(contrastRatio('#ffffff', '#000000')).toBeCloseTo(21, 0);
  });

  it('mọi cặp chữ/nền trong tokens.css đạt AA', () => {
    const tokens = readTokens();
    const failures: string[] = [];
    for (const [fg, bg] of PAIRS) {
      const f = tokens[fg];
      const b = tokens[bg];
      if (!f || !b) {
        failures.push(`${fg} / ${bg}: thiếu token`);
        continue;
      }
      const ratio = contrastRatio(f, b);
      if (ratio < 4.5) failures.push(`${fg} (${f}) trên ${bg} (${b}) = ${ratio.toFixed(2)}`);
    }
    expect(failures).toEqual([]);
  });
});
