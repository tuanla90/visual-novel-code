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
import { castPosition, nextCast, type CastMember, type CastState } from './visuals/cast';
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

/**
 * Tính toán vị trí đứng của nhân vật theo phong cách Visual Novel (DDLC):
 * - Nếu chỉ có 1 nhân vật: luôn đứng ở CHÍNH GIỮA (50%) màn hình.
 * - Nếu có 2 nhân vật: đứng cân xứng 2 bên (35% và 65%).
 * - Nếu có 3 nhân vật: đứng đều 3 vị trí (22%, 50%, 78%).
 * - Phòng giải trình (debrief): giữ phân chia 2 phe (CLB bên trái, đối phương bên phải).
 */
function getMemberPosition(members: readonly CastMember[], member: CastMember, scene: SceneId): number {
  if (scene === 'debrief-room') {
    return castPosition(scene, member.character);
  }
  if (members.length === 1) {
    return 0.5;
  }
  const sorted = [...members].sort((a, b) => castPosition(scene, a.character) - castPosition(scene, b.character));
  const idx = sorted.findIndex((m) => m.character === member.character);
  if (members.length === 2) {
    return idx === 0 ? 0.35 : 0.65;
  }
  if (members.length === 3) {
    return idx === 0 ? 0.22 : idx === 1 ? 0.5 : 0.78;
  }
  return castPosition(scene, member.character);
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
      <div className="stage__scene-label">
        <svg
          className="stage__scene-icon"
          viewBox="0 0 24 24"
          width="18"
          height="18"
          fill="none"
          aria-hidden="true"
        >
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" fill="#ea580c" stroke="#c2410c" strokeWidth="1.2" />
          <circle cx="12" cy="10" r="3" fill="#fffdf2" />
        </svg>
        <span className="stage__scene-text">{sceneName(scene)}</span>
      </div>
      <div className="stage__portraits">
        {current.members.map((m) => {
          const speaking = m.character === speaker;
          const pos = getMemberPosition(current.members, m, scene);
          const isRight = pos > 0.5;
          const style = { '--cast-x': `${pos * 100}%` } as CSSProperties;
          return (
            <div
              key={m.character}
              className={`cast-member${speaking ? ' cast-member--speaking' : ' cast-member--idle'}${isRight ? ' cast-member--side-right' : ' cast-member--side-left'}`}
              style={style}
              data-speaking={speaking ? 'true' : 'false'}
              data-side={isRight ? 'right' : 'left'}
            >
              <Portrait character={m.character} expression={m.expression} size="normal" talking={speaking && lineTyping} />
            </div>
          );
        })}
      </div>
      <div className="stage__content">{children}</div>
    </section>
  );
}
