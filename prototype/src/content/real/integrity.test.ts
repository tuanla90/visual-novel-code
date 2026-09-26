/** Toàn vẹn nội dung thật (bộ kiểm của story/engine/validate.ts — chạy, không sửa) + nội dung đang dùng. */
import { describe, expect, it } from 'vitest';
import { formatIssues, validateContent } from '../../story/engine/validate';
import { activeContent } from '..';
import { realContent } from '.';

describe('nội dung thật', () => {
  it('validateContent: 0 lỗi', () => {
    const r = validateContent(realContent);
    expect(formatIssues(r.errors)).toBe('');
    expect(r.ok).toBe(true);
  });

  it('validateContent: 0 cảnh báo', () => {
    expect(formatIssues(validateContent(realContent).warnings)).toBe('');
  });

  it('activeContent trỏ vào nội dung thật', () => {
    expect(activeContent).toBe(realContent);
    expect(activeContent.meta.isSample).toBe(false);
  });
});
