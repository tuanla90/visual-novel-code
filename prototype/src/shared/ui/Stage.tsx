/**
 * Sân khấu: nền cảnh TẠM theo token màu + chỗ đặt chân dung. Gói `hinh-giao-dien` thay nền
 * bằng hình SVG theo `scene`; giữ nguyên props.
 */
import type { ReactNode } from 'react';
import { sceneName } from '../display-names';
import { isCharacterId, type SceneId } from '../ids';
import { Portrait } from './Portrait';

export interface StageProps {
  scene: SceneId;
  /** Người đang nói (nếu là nhân vật thì hiện chân dung). */
  speaker?: string;
  expression?: string;
  children?: ReactNode;
}

export function Stage({ scene, speaker, expression, children }: StageProps) {
  const showPortrait = speaker !== undefined && isCharacterId(speaker);
  return (
    <section className="stage" style={{ background: `var(--c-scene-${scene})` }} aria-label={`Cảnh: ${sceneName(scene)}`}>
      <div className="stage__scene-label">{sceneName(scene)}</div>
      <div className="stage__portraits">
        {showPortrait ? <Portrait character={speaker} expression={expression ?? 'neutral'} size={speaker === 'bac-tu' ? 'small' : 'normal'} /> : null}
      </div>
      <div className="stage__content">{children}</div>
    </section>
  );
}
