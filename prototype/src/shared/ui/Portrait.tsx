/**
 * Chân dung nhân vật: ảnh thật trong ô ảnh `<nhân vật>-<biểu cảm>` nếu có (thiếu biểu cảm → mượn ảnh
 * biểu cảm đầu), không thì SVG vẽ tạm (QĐ-060). Ảnh nền xám phẳng của user được tự tách nền
 * (QĐ-063, `visuals/portrait-cutout.ts`); trong lúc tách hiện hình vẽ tạm. Props giữ nguyên từ khung
 * (ARCHITECTURE.md §4). Trình đọc màn hình nghe "Tên, biểu cảm" bằng tiếng Việt — không bao giờ
 * định danh thô.
 */
import { characterName, expressionName } from '../display-names';
import type { CharacterId } from '../ids';
import { artDataAttributes, resolvePortrait } from './visuals/art-slots';
import { PortraitArt } from './visuals/PortraitArt';
import { usePortraitCutout } from './visuals/portrait-cutout';
import { talkRigFor } from './visuals/talk-rigs';
import { TalkOverlay } from './visuals/TalkOverlay';

export interface PortraitProps {
  character: CharacterId;
  expression: string;
  /** `small`: bác Tư / nhân vật phụ. */
  size?: 'normal' | 'small';
  /** Đang nói và chữ còn chạy → nhép môi (nếu nhân vật có bộ miếng khớp ảnh, `visuals/talk-rigs.ts`). */
  talking?: boolean;
}

export function Portrait({ character, expression, size = 'normal', talking = false }: PortraitProps) {
  const name = characterName(character);
  const mood = expressionName(expression);
  const art = resolvePortrait(character, expression);
  const cutout = usePortraitCutout(art.url);
  // data-art-source phản ánh cái ĐANG hiện: đang tách nền → hình vẽ tạm.
  const shown = cutout?.src ? art : { slot: art.slot };
  const rig = cutout?.src ? talkRigFor(character, art.url) : undefined;
  return (
    <figure
      className={`portrait portrait--${size}`}
      role="img"
      aria-label={`${name}, ${mood}`}
      {...artDataAttributes(shown)}
      {...(cutout ? { 'data-art-cutout': cutout.status } : {})}
    >
      {cutout?.src ? <img className="portrait__img" src={cutout.src} alt="" draggable={false} /> : <PortraitArt character={character} expression={expression} />}
      {rig ? <TalkOverlay rig={rig} talking={talking} /> : null}
    </figure>
  );
}
