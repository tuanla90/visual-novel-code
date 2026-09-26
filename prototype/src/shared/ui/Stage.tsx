/**
 * Sân khấu: nền cảnh (ảnh thật trong ô ảnh hoặc SVG vẽ tạm — QĐ-060) + chỗ đặt chân dung + nội dung.
 * Props giữ nguyên từ khung (ARCHITECTURE.md §4).
 */
import type { ReactNode } from 'react';
import { sceneName } from '../display-names';
import { isCharacterId, type SceneId } from '../ids';
import { Portrait } from './Portrait';
import { SceneBackdrop } from './visuals/SceneBackdrop';

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
    <section className="stage" data-scene={scene} style={{ backgroundColor: `var(--c-scene-${scene})` }} aria-label={`Cảnh: ${sceneName(scene)}`}>
      <SceneBackdrop scene={scene} />
      <div className="stage__scene-label">{sceneName(scene)}</div>
      <div className="stage__portraits">
        {showPortrait ? <Portrait character={speaker} expression={expression ?? 'neutral'} size={speaker === 'bac-tu' ? 'small' : 'normal'} /> : null}
      </div>
      <div className="stage__content">{children}</div>
    </section>
  );
}
