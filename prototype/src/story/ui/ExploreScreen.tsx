/**
 * Màn xem xét: điểm xem xét là nút có nhãn ≥ 44×44px, đánh dấu đã xem, nút "Nhiệm vụ tiếp theo →"
 * khi đủ điều kiện (QĐ-027). Props giữ nguyên.
 *
 * QĐ-053: dòng nhắc khi chưa đủ điều kiện CHỈ nêu SỐ điểm còn lại ("Còn 1 điểm chưa xem xét"),
 * không nêu tên manh mối/tài liệu còn thiếu — nêu tên là lộ trước manh mối (ví dụ "bookmark"
 * trước khi người chơi xem hộp góp ý).
 */
import type { GameContent } from '../../content/types';
import type { GateStatus, HotspotView } from '../engine/state';

/** Dòng nhắc chỉ có số lượng (QĐ-053). */
function missingLine(hotspots: HotspotView[], gate: GateStatus): string {
  const unvisited = hotspots.filter((h) => !h.visited).length;
  if (unvisited > 0) return `Còn ${unvisited} điểm chưa xem xét.`;
  // Đã xem hết điểm mà Hồ sơ vẫn thiếu (nội dung lệch): vẫn chỉ nêu số lượng.
  return `Hồ sơ còn thiếu ${gate.missing.length} mục để đi tiếp.`;
}

export interface ExploreScreenProps {
  hotspots: HotspotView[];
  gate: GateStatus | null;
  content: GameContent;
  onInspect: (hotspotId: string) => void;
  onProceed: () => void;
}

// `content` giữ trong props (khung đã chốt) nhưng không còn dùng để tra tên mục thiếu (QĐ-053).
export function ExploreScreen({ hotspots, gate, onInspect, onProceed }: ExploreScreenProps) {
  return (
    <div className="explore">
      <p className="explore__lead">
        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: '#d97706', flexShrink: 0 }}>
          <circle cx="11" cy="11" r="8" />
          <line x1="21" y1="21" x2="16.65" y2="16.65" />
        </svg>
        <span>Chọn một điểm để xem xét.</span>
      </p>
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
          <p className="explore__missing" role="status">
            {missingLine(hotspots, gate)}
          </p>
        )
      ) : null}
    </div>
  );
}
