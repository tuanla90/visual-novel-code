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
  ['--c-char-tung-ink', '--c-char-tung'],
  ['--c-char-player-ink', '--c-char-player'],
  ['--c-char-narrator-ink', '--c-char-narrator'],
  ['--c-text', '--c-scene-clb-room'],
  ['--c-text', '--c-scene-corridor-b'],
  ['--c-text', '--c-scene-debrief-room'],
];

/**
 * Cặp (chữ, nền, chỗ dùng) — token hoặc mã màu viết thẳng trong CSS/SVG.
 * Phần 1: 12 cặp của màn thử thách, gộp từ src/sql-challenge/ui/contrast-ui.test.ts (gói 4 — tệp đó
 * giữ nguyên). Phần 2: cặp mới của gói 7 (hinh-giao-dien).
 */
const USED_PAIRS: [string, string, string][] = [
  // --- Gộp từ contrast-ui.test.ts (gói 4) ---
  ['--c-sql-text', '--c-sql-surface', 'tiêu đề khung SQL, nút "Sửa SQL trực tiếp"'],
  ['--c-sql-comment', '--c-sql-surface', 'dòng nhắc dưới ô soạn SQL'],
  ['--c-sql-highlight', '--c-sql-bg', 'chỗ giữ AND/OR khi chưa chọn phép nối'],
  ['--c-focus', '--c-surface', 'từ khóa SELECT/FROM/WHERE ở đầu hàng'],
  ['#ffffff', '--c-focus', 'nút Chạy, phép nối đang chọn'],
  ['--c-warning', '--c-surface', '"chưa chọn cách nối"; chữ mã trong chú thích Hồ sơ'],
  ['--c-char-ha-vy', '--c-surface', 'tên Hà Vy, nút "Hỏi Hà Vy"'],
  ['--c-char-player', '--c-surface', '"Bạn chọn:"'],
  ['--c-text', '--c-bg', 'chữ mã (nền nhạt) trong khung sáng'],
  ['--c-paper-ink', '--c-bg', 'chữ mã trong thẻ chữ lớn và trong Hồ sơ'],
  ['--c-char-ha-vy', '--c-bg', '"Hà Vy:" trong khung phản hồi nền nhạt'],
  ['--c-text-muted', '--c-bg', 'ghi chú phụ trên nền nhạt'],
  // --- Gói 7 (hinh-giao-dien) ---
  ['--c-surface', '--c-text', 'bảng tên người hỏi (MultipleChoice)'],
  ['--c-text', '--c-surface', 'nhãn cảnh, dòng nhắc màn xem xét, dòng từ chối trên nền panel'],
  ['--c-paper-ink', '--c-paper-edge', 'tiêu đề "Hồ sơ" trên bìa kraft'],
  ['--c-paper-ink', '--c-surface', 'ghi chú thẻ, bảng kết quả trong Hồ sơ'],
  ['--c-focus', '--c-paper', 'nút "Xem đủ N dòng" trên thẻ giấy'],
  ['--c-success', '--c-paper', 'số dòng sau khi sửa (dải 24 → 2)'],
  ['--c-paper-ink', '#fbfaf5', 'chữ lá thư trên giấy bản chụp (SVG tạm)'],
  ['--c-paper-ink', '#fbf4e2', 'chữ sổ bàn giao trên giấy kẻ dòng (SVG tạm)'],
  ['#1e3a5f', '#fdf6e3', 'chữ "…ÁO CHÍ" trên bookmark (SVG tạm)'],
  ['#0f172a', '#facc15', 'câu hô "Có số liệu đây!" trên mảng nổ vàng'],
  ['#0f172a', '#f8fafc', 'câu hô trên viền trắng của chính nó'],
  ['#f8fafc', '#0f172a', 'nút "Bỏ qua" của hiệu ứng'],
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

  it('mọi cặp chữ/nền đang dùng (thử thách + hình giao diện) đạt AA', () => {
    const tokens = readTokens();
    const resolve = (x: string): string | undefined => (x.startsWith('#') ? x : tokens[x]);
    const failures: string[] = [];
    for (const [fg, bg, where] of USED_PAIRS) {
      const f = resolve(fg);
      const b = resolve(bg);
      if (!f || !b) {
        failures.push(`${fg} / ${bg}: thiếu token (${where})`);
        continue;
      }
      const ratio = contrastRatio(f, b);
      if (ratio < 4.5) failures.push(`${fg} (${f}) trên ${bg} (${b}) = ${ratio.toFixed(2)} — ${where}`);
    }
    expect(failures).toEqual([]);
  });
});
