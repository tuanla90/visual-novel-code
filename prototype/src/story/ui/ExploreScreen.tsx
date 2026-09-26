/**
 * Màn xem xét: điểm xem xét là nút có nhãn ≥ 44×44px, đánh dấu đã xem, nút "Nhiệm vụ tiếp theo →"
 * khi đủ điều kiện (QĐ-027). Vị trí trong cảnh: gói `hinh-giao-dien` đặt tọa độ theo `hotspot.id`.
 */
import type { GameContent } from '../../content/types';
import { evidenceTitle } from '../../evidence/labels';
import type { GateStatus, HotspotView } from '../engine/state';

export interface ExploreScreenProps {
  hotspots: HotspotView[];
  gate: GateStatus | null;
  content: GameContent;
  onInspect: (hotspotId: string) => void;
  onProceed: () => void;
}

export function ExploreScreen({ hotspots, gate, content, onInspect, onProceed }: ExploreScreenProps) {
  return (
    <div className="explore">
      <p className="explore__lead">Chọn một điểm để xem xét.</p>
      <ul className="explore__hotspots">
        {hotspots.map((h) => (
          <li key={h.id}>
            <button
              type="button"
              className={h.visited ? 'hotspot hotspot--visited' : 'hotspot'}
              onClick={() => onInspect(h.id)}
              aria-label={h.visited ? `Xem lại: ${h.label} (đã xem)` : `Xem xét: ${h.label}`}
              title={h.visited ? `Xem lại: ${h.label}` : `Xem xét: ${h.label}`}
            >
              <span className="hotspot__label">{h.label}</span>
              {h.visited ? <span className="hotspot__mark">đã xem</span> : null}
            </button>
          </li>
        ))}
      </ul>
      {gate ? (
        gate.satisfied ? (
          <button type="button" className="btn btn--primary explore__next" onClick={onProceed}>
            {gate.buttonLabel}
          </button>
        ) : (
          <p className="explore__missing">
            Để đi tiếp, Hồ sơ cần thêm: {gate.missing.map((id) => evidenceTitle(content, id)).join(', ')}.
          </p>
        )
      ) : null}
    </div>
  );
}
