/**
 * Chữ mã trong nội dung (QĐ-051): dữ liệu giữ nguyên dấu `…` như kịch bản; khi hiển thị, đoạn trong
 * dấu thành chữ mã (phông mono, nền nhạt) và KHÔNG để lộ dấu `. Dấu ` lẻ (không có cặp) bị bỏ.
 *
 * Kiểu dáng nằm ngay trong helper (một tệp, dùng được ở mọi nơi); màu nền đổi được qua biến CSS
 * `--code-text-bg` / `--code-text-fg` đặt ở khung chứa (gói hinh-giao-dien có thể thay bằng lớp CSS).
 */
import { Fragment, type CSSProperties } from 'react';
import { HighlightText } from '../highlight/HighlightText';

const CODE_STYLE: CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.92em',
  background: 'var(--code-text-bg, var(--c-bg))',
  color: 'var(--code-text-fg, inherit)',
  padding: '0 0.3em',
  borderRadius: 4,
  overflowWrap: 'anywhere',
  boxDecorationBreak: 'clone',
  WebkitBoxDecorationBreak: 'clone',
};

export interface CodeTextProps {
  text: string;
}

export function CodeText({ text }: CodeTextProps) {
  if (!text.includes('`')) return <HighlightText text={text} />;
  const parts = text.split('`');
  // Số dấu lẻ → mẩu cuối không có dấu đóng: ghép lại thành chữ thường (bỏ dấu lẻ).
  const unmatched = parts.length % 2 === 0;
  const nodes = parts.map((part, i) => {
    const isCode = i % 2 === 1 && !(unmatched && i === parts.length - 1);
    if (part === '') return null;
    return isCode ? (
      <code key={i} className="code-text" style={CODE_STYLE}>
        {part}
      </code>
    ) : (
      <Fragment key={i}><HighlightText text={part} /></Fragment>
    );
  });
  return <>{nodes}</>;
}
