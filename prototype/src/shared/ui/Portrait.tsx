/**
 * Chân dung TẠM: khối màu chủ đạo của nhân vật + tên hiển thị + biểu cảm (chữ).
 * Gói `hinh-giao-dien` thay bằng SVG theo nhân vật/biểu cảm; giữ nguyên props.
 */
import { characterName, expressionName } from '../display-names';
import type { CharacterId } from '../ids';

export interface PortraitProps {
  character: CharacterId;
  expression: string;
  /** `small`: bác Tư / nhân vật phụ. */
  size?: 'normal' | 'small';
}

export function Portrait({ character, expression, size = 'normal' }: PortraitProps) {
  const name = characterName(character);
  const mood = expressionName(expression);
  return (
    <figure
      className={`portrait portrait--${size}`}
      style={{ background: `var(--c-char-${character})`, color: `var(--c-char-${character}-ink)` }}
      aria-label={`${name}, ${mood}`}
    >
      <span className="portrait__name">{name}</span>
      <span className="portrait__mood">{mood}</span>
    </figure>
  );
}
