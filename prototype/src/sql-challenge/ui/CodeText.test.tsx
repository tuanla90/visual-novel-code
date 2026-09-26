/**
 * Helper chữ mã (QĐ-051, src/shared/ui/CodeText.tsx): đoạn trong dấu ` thành <code> (phông mono,
 * nền nhạt), KHÔNG để lộ dấu ` trong mọi trường hợp; DialogBox dùng helper này.
 */
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { gameContent } from '../../shared/store';
import { CodeText } from '../../shared/ui/CodeText';
import { DialogBox } from '../../shared/ui/DialogBox';

function shown(text: string): { text: string; codes: string[] } {
  const { container, unmount } = render(
    <p>
      <CodeText text={text} />
    </p>,
  );
  const out = { text: container.textContent ?? '', codes: [...container.querySelectorAll('code')].map((c) => c.textContent ?? '') };
  unmount();
  return out;
}

describe('CodeText — chữ mã không lộ dấu `', () => {
  it('cặp dấu → <code>, chữ thường giữ nguyên', () => {
    expect(shown("Lọc `ten LIKE 'H%'` rồi chạy.")).toEqual({ text: "Lọc ten LIKE 'H%' rồi chạy.", codes: ["ten LIKE 'H%'"] });
    expect(shown('`SELECT`, `FROM` và `WHERE`.')).toEqual({ text: 'SELECT, FROM và WHERE.', codes: ['SELECT', 'FROM', 'WHERE'] });
    expect(shown('Không có mã nào.')).toEqual({ text: 'Không có mã nào.', codes: [] });
  });

  it('dấu lẻ, cặp rỗng, dấu ở đầu/cuối: không bao giờ còn dấu `', () => {
    for (const t of ['a `b', '`', '``', 'x `` y', '`a` b `c', 'đầu `mã`', '`mã` cuối', '```']) {
      expect(shown(t).text).not.toContain('`');
    }
    expect(shown('a `b').codes).toEqual([]);
    expect(shown('`a` b `c').codes).toEqual(['a']);
  });

  it('chữ mã có kiểu riêng (phông mono qua token, nền nhạt đổi được bằng biến CSS)', () => {
    const { container } = render(<CodeText text="dùng `IN`" />);
    const code = container.querySelector('code');
    expect(code?.className).toBe('code-text');
    expect(code?.getAttribute('style')).toContain('var(--font-mono)');
    expect(code?.getAttribute('style')).toContain('var(--code-text-bg, var(--c-bg))');
  });

  it('mọi lời/đề bài/gợi ý có dấu ` của bốn thử thách hiển thị không lộ dấu', () => {
    const texts: string[] = [];
    for (const def of Object.values(gameContent.challenges)) {
      const c = def.content;
      texts.push(c.title, c.prompt, c.onCorrect.text, ...c.hints.map((h) => h.text), ...c.steps.map((s) => s.line.text));
    }
    const withTicks = texts.filter((t) => t.includes('`'));
    expect(withTicks.length).toBeGreaterThan(0);
    for (const t of withTicks) expect(shown(t).text).not.toContain('`');
  });

  it('DialogBox hiển thị chữ mã, không lộ dấu `', () => {
    const { container } = render(<DialogBox line={{ speaker: 'ha-vy', expression: 'neutral', text: 'Cột `ten` nằm ở bảng `sinh_vien`.' }} onAdvance={() => {}} />);
    const p = container.querySelector('.dialog__text');
    expect(p?.textContent).toBe('Cột ten nằm ở bảng sinh_vien.');
    expect([...(p?.querySelectorAll('code') ?? [])].map((c) => c.textContent)).toEqual(['ten', 'sinh_vien']);
  });
});
