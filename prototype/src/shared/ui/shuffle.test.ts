import { describe, expect, it } from 'vitest';
import { shuffle } from './shuffle';

describe('shuffle', () => {
  it('là hoán vị, không sửa mảng gốc', () => {
    const src = ['a', 'b', 'c', 'd'];
    const out = shuffle(src, () => 0.99);
    expect([...out].sort()).toEqual(src);
    expect(src).toEqual(['a', 'b', 'c', 'd']);
  });

  it('nguồn ngẫu nhiên khác cho thứ tự khác', () => {
    const src = ['a', 'b', 'c', 'd'];
    expect(shuffle(src, () => 0)).toEqual(['b', 'c', 'd', 'a']);
    expect(shuffle(src, () => 0.99)).toEqual(['a', 'b', 'c', 'd']);
  });
});
