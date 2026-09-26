/**
 * Lớp nền của sân khấu: ảnh thật nếu có tệp trong ô (QĐ-060), không thì SVG vẽ tạm.
 * Cả hai phủ kín sân khấu, neo giữa (`object-fit: cover` / `xMidYMid slice`) để vùng màn chiếu
 * và vùng an toàn tính giống nhau. Trang trí thuần: aria-hidden, alt rỗng.
 */
import type { SceneId } from '../../ids';
import { artDataAttributes, resolveBackground } from './art-slots';
import { SceneArt } from './scene-art';

export function SceneBackdrop({ scene }: { scene: SceneId }) {
  const art = resolveBackground(scene);
  return (
    <div className="stage__backdrop" aria-hidden="true" {...artDataAttributes(art)}>
      {art.url ? <img className="stage__backdrop-img" src={art.url} alt="" draggable={false} /> : <SceneArt scene={scene} />}
    </div>
  );
}
