/**
 * Ảnh toàn thân của nhân vật cho hồ sơ nhân vật và màn ra mắt: tệp `char-<nhân vật>-full.*` trong
 * `src/assets/` (ô `<nhân vật>-full`). Chưa có tệp thì nơi dùng hiện `Portrait` (ảnh chân dung thật
 * hoặc hình vẽ tạm SVG). Ảnh nền xám phẳng được tự tách nền như chân dung (QĐ-063).
 */
import { artDataAttributes, type ResolvedArt } from './visuals/art-slots';
import { usePortraitCutout } from './visuals/portrait-cutout';

export interface FullArtImageProps {
  art: ResolvedArt;
  alt: string;
  className: string;
}

export function FullArtImage({ art, alt, className }: FullArtImageProps) {
  const cutout = usePortraitCutout(art.url);
  // Đang tách nền → chưa hiện gì (tránh chớp nền xám), giống cách Portrait chờ tách.
  if (!cutout?.src) return null;
  return (
    <img
      src={cutout.src}
      alt={alt}
      className={className}
      draggable={false}
      {...artDataAttributes(art)}
      data-art-cutout={cutout.status}
    />
  );
}
