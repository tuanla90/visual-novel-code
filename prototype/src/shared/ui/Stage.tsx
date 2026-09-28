/**
 * Sân khấu: nền cảnh (ảnh thật trong ô ảnh hoặc SVG vẽ tạm — QĐ-060) + dàn chân dung + nội dung.
 * Props giữ nguyên từ khung (ARCHITECTURE.md §4). Dàn chân dung: các nhân vật đã nói trong cảnh
 * hiện tại đứng ở vị trí cố định; người đang nói nổi bật, người khác lùi nhẹ (visuals/cast.ts).
 */
import { useRef, useState, type CSSProperties, type ReactNode } from 'react';
import { sceneName } from '../display-names';
import type { SceneId, PartId } from '../ids';
import { Portrait } from './Portrait';
import { SceneBackdrop } from './visuals/SceneBackdrop';
import { SceneTransitionOverlay } from './visuals/SceneTransitionOverlay';
import { castPosition, nextCast, type CastState } from './visuals/cast';
import { useProjectorInsets } from './visuals/use-projector-insets';
import { useVnStore } from '../vn/vn-store';

export interface StageProps {
  scene: SceneId;
  part?: PartId | null;
  sequenceId?: string;
  /** Người đang nói (nếu là nhân vật thì hiện chân dung). */
  speaker?: string;
  expression?: string;
  children?: ReactNode;
}

export function Stage({ scene, part, sequenceId, speaker, expression, children }: StageProps) {
  const [cast, setCast] = useState<CastState>(() => nextCast(null, scene, speaker, expression));
  const current = nextCast(cast, scene, speaker, expression);
  // Suy trạng thái từ props lúc render (mẫu "lưu thông tin từ lần render trước" của React).
  if (current !== cast) setCast(current);
  const ref = useRef<HTMLElement>(null);
  // Phòng giải trình: vùng màn chiếu (gói 6) khớp màn chiếu trong ảnh nền.
  useProjectorInsets(ref, scene);
  const lineTyping = useVnStore((s) => s.lineTyping);

  return (
    <section ref={ref} className="stage" data-scene={scene} style={{ backgroundColor: `var(--c-scene-${scene})` }} aria-label={`Cảnh: ${sceneName(scene)}`}>
      <SceneBackdrop scene={scene} />
      <SceneTransitionOverlay scene={scene} part={part} sequenceId={sequenceId} />
      <div className="stage__scene-label">{sceneName(scene)}</div>
      <div className="stage__portraits">
        {current.members.map((m) => {
          const speaking = m.character === speaker;
          const pos = castPosition(scene, m.character);
          const isRight = pos > 0.5;
          const style = { '--cast-x': `${pos * 100}%` } as CSSProperties;
          return (
            <div
              key={m.character}
              className={`cast-member${speaking ? ' cast-member--speaking' : ' cast-member--idle'}${m.character === 'bac-tu' ? ' cast-member--small' : ''}${isRight ? ' cast-member--side-right' : ' cast-member--side-left'}`}
              style={style}
              data-speaking={speaking ? 'true' : 'false'}
              data-side={isRight ? 'right' : 'left'}
            >
              <Portrait character={m.character} expression={m.expression} size={m.character === 'bac-tu' ? 'small' : 'normal'} talking={speaking && lineTyping} />
            </div>
          );
        })}
      </div>
      <div className="stage__content">{children}</div>
    </section>
  );
}
