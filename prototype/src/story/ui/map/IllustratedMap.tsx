/**
 * Bản đồ khuôn viên dạng tranh (ảnh Topview 27/09): nền là ảnh phối cảnh trường, mỗi địa điểm là
 * một ghim cắm đúng tòa nhà + nhãn tên vẽ bằng code (tấm biển trong ảnh ghim quá hẹp cho tên dài
 * nên đã cắt bỏ). Ảnh không tải được → `onArtError`, bản đồ quay về sơ đồ SVG cũ.
 * Hệ tọa độ = điểm ảnh của ảnh bản đồ 1360×768; (x, y) của ghim là ĐẦU NHỌN chạm tòa nhà.
 */
import type { KeyboardEvent } from 'react';
import type { CampusPoi } from './campus-map-data';
import mapArt from './art/campus-map.webp';
import pinBed from './art/pin-bed.webp';
import pinBook from './art/pin-book.webp';
import pinFood from './art/pin-food.webp';
import pinPodium from './art/pin-podium.webp';
import pinScroll from './art/pin-scroll.webp';
import pinTree from './art/pin-tree.webp';

const ART = { width: 1360, height: 768 } as const;
const PIN_W = 78;
/** Ảnh ghim (đã cắt biển) cao ≈ 1,05 lần rộng. */
const PIN_H = 82;

const PINS: Record<string, { src: string; x: number; y: number }> = {
  'dorm-b': { src: pinBed, x: 1085, y: 470 },
  canteen: { src: pinFood, x: 1170, y: 125 },
  'lecture-a': { src: pinPodium, x: 230, y: 290 },
  'lecture-b': { src: pinTree, x: 385, y: 118 },
  library: { src: pinBook, x: 840, y: 245 },
  'club-room': { src: pinScroll, x: 1262, y: 300 },
  'debrief-room': { src: pinPodium, x: 735, y: 98 },
};

/** Rộng nhãn theo số ký tự (ước lượng, đủ cho chữ Việt cỡ 13). */
function labelWidth(name: string): number {
  return Math.round(name.length * 7.4 + 24);
}

export interface IllustratedMapProps {
  pois: readonly CampusPoi[];
  selectedId: string;
  currentScene?: string;
  onSelect: (poi: CampusPoi) => void;
  onArtError: () => void;
}

export function IllustratedMap({ pois, selectedId, currentScene, onSelect, onArtError }: IllustratedMapProps) {
  return (
    <svg className="campus-map__svg campus-map__svg--art" viewBox={`0 0 ${ART.width} ${ART.height}`} preserveAspectRatio="xMidYMid meet">
      <image href={mapArt} width={ART.width} height={ART.height} preserveAspectRatio="xMidYMid slice" onError={onArtError} />
      {pois.map((poi) => {
        const pin = PINS[poi.id];
        if (!pin) return null;
        const isSelected = selectedId === poi.id;
        const isHere = poi.sceneId !== undefined && poi.sceneId === currentScene;
        const w = labelWidth(poi.name);
        const onKeyDown = (e: KeyboardEvent<SVGGElement>) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onSelect(poi);
          }
        };
        return (
          <g
            key={poi.id}
            className={`map-pin${isSelected ? ' is-selected' : ''}${isHere ? ' is-current' : ''}`}
            role="button"
            tabIndex={0}
            aria-label={`${poi.name}${isHere ? ' (vị trí hiện tại)' : ''}`}
            aria-pressed={isSelected}
            onClick={() => onSelect(poi)}
            onKeyDown={onKeyDown}
          >
            {isHere ? <circle className="map-pin__pulse" cx={pin.x} cy={pin.y - PIN_H * 0.58} r={PIN_W * 0.55} /> : null}
            <image className="map-pin__img" href={pin.src} x={pin.x - PIN_W / 2} y={pin.y - PIN_H} width={PIN_W} height={PIN_H} />
            <g className="map-pin__label">
              <rect x={pin.x - w / 2} y={pin.y + 6} width={w} height={26} rx={5} />
              <text x={pin.x} y={pin.y + 24} textAnchor="middle">
                {poi.name}
              </text>
            </g>
          </g>
        );
      })}
    </svg>
  );
}
