/**
 * Chân dung nhân vật: ảnh thật trong ô ảnh `<nhân vật>-<biểu cảm>` nếu có (thiếu biểu cảm → mượn ảnh
 * biểu cảm đầu), không thì SVG vẽ tạm (QĐ-060). Props giữ nguyên từ khung (ARCHITECTURE.md §4).
 * Trình đọc màn hình nghe "Tên, biểu cảm" bằng tiếng Việt — không bao giờ định danh thô.
 */
import { characterName, expressionName } from '../display-names';
import type { CharacterId } from '../ids';
import { artDataAttributes, resolvePortrait } from './visuals/art-slots';
import { PortraitArt } from './visuals/PortraitArt';

export interface PortraitProps {
  character: CharacterId;
  expression: string;
  /** `small`: bác Tư / nhân vật phụ. */
  size?: 'normal' | 'small';
}

export function Portrait({ character, expression, size = 'normal' }: PortraitProps) {
  const name = characterName(character);
  const mood = expressionName(expression);
  const art = resolvePortrait(character, expression);
  return (
    <figure className={`portrait portrait--${size}`} role="img" aria-label={`${name}, ${mood}`} {...artDataAttributes(art)}>
      {art.url ? <img className="portrait__img" src={art.url} alt="" draggable={false} /> : <PortraitArt character={character} expression={expression} />}
    </figure>
  );
}
