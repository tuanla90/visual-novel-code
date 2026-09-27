import { useEffect, useRef, useState } from 'react';
import { CAMPUS_POIS, type CampusPoi } from './campus-map-data';
import { soundEngine } from '../../../shared/audio/sound-engine';
import '../../../shared/vn/vn-controls.css';

export interface CampusMapModalProps {
  open: boolean;
  onClose: () => void;
  currentScene?: string;
}

interface PoiLayout {
  x: number;
  y: number;
  width: number;
  height: number;
  categoryLabel: string;
  accentColor: string;
  icon: (accent: string) => React.ReactNode;
}

const POI_LAYOUTS: Record<string, PoiLayout> = {
  'canteen': {
    x: 100,
    y: 120,
    width: 210,
    height: 72,
    categoryLabel: 'KHU TIỆN ÍCH',
    accentColor: '#fbbf24',
    icon: (accent) => (
      <svg x="12" y="14" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M18 8h1a4 4 0 0 1 0 8h-1" /><path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" /><line x1="6" y1="1" x2="6" y2="4" /><line x1="10" y1="1" x2="10" y2="4" /><line x1="14" y1="1" x2="14" y2="4" />
      </svg>
    ),
  },
  'lecture-a': {
    x: 395,
    y: 60,
    width: 210,
    height: 72,
    categoryLabel: 'KHU GIẢNG ĐƯỜNG',
    accentColor: '#c084fc',
    icon: (accent) => (
      <svg x="12" y="14" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 10v6M2 10l10-5 10 5-10 5z" /><path d="M6 12v5c3 3 9 3 12 0v-5" />
      </svg>
    ),
  },
  'lecture-b': {
    x: 690,
    y: 110,
    width: 210,
    height: 72,
    categoryLabel: 'HÀNH LANG VỤ ÁN',
    accentColor: '#f472b6',
    icon: (accent) => (
      <svg x="12" y="14" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" /><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
      </svg>
    ),
  },
  'debrief-room': {
    x: 395,
    y: 205,
    width: 210,
    height: 76,
    categoryLabel: 'HỘI ĐỒNG HỌC VỤ',
    accentColor: '#38bdf8',
    icon: (accent) => (
      <svg x="12" y="14" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" /><path d="M7 21h10" /><path d="M12 3v18" /><path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
      </svg>
    ),
  },
  'dorm-b': {
    x: 100,
    y: 350,
    width: 210,
    height: 72,
    categoryLabel: 'KHU NỘI TRÚ',
    accentColor: '#60a5fa',
    icon: (accent) => (
      <svg x="12" y="14" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
  },
  'library': {
    x: 395,
    y: 360,
    width: 210,
    height: 72,
    categoryLabel: 'TRA CỨU DỮ LIỆU',
    accentColor: '#34d399',
    icon: (accent) => (
      <svg x="12" y="14" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" /><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
      </svg>
    ),
  },
  'club-room': {
    x: 690,
    y: 350,
    width: 215,
    height: 72,
    categoryLabel: 'CĂN CỨ ĐIỀU TRA',
    accentColor: '#f87171',
    icon: (accent) => (
      <svg x="12" y="14" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="11" cy="11" r="8" /><line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
};

export function CampusMapModal({ open, onClose, currentScene }: CampusMapModalProps) {
  const [selectedPoi, setSelectedPoi] = useState<CampusPoi>(() => {
    return CAMPUS_POIS.find((p) => p.sceneId === currentScene) ?? CAMPUS_POIS[5]!;
  });
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    soundEngine.playSfx('page');
    closeBtnRef.current?.focus();
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className="campus-map__backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="map-title">
      <div className="campus-map__card" onClick={(e) => e.stopPropagation()}>
        <div className="campus-map__header">
          <h2 id="map-title" className="backlog-modal__title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#38bdf8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
            Bản đồ Khuôn viên — Đại học Hoa Phượng
          </h2>
          <button ref={closeBtnRef} type="button" className="audio-modal__close" onClick={onClose} aria-label="Đóng">
            ×
          </button>
        </div>

        {/* Khu vực Bản đồ SVG tương tác */}
        <div className="campus-map__view">
          <svg className="campus-map__svg" viewBox="0 0 1000 520" preserveAspectRatio="xMidYMid meet">
            {/* Nền bãi cỏ khuôn viên xanh thẫm */}
            <rect width="1000" height="520" fill="#0f241a" />
            
            {/* Lớp nền phân vùng các khu vực chức năng */}
            <rect x="70" y="30" width="860" height="460" rx="20" fill="#132e22" stroke="rgba(255,255,255,0.06)" strokeWidth="1.5" />

            {/* Vòng xoay quảng trường trung tâm */}
            <circle cx="500" cy="242" r="54" fill="#18382a" stroke="rgba(203, 213, 225, 0.4)" strokeWidth="6" />
            <circle cx="500" cy="242" r="28" fill="#1e4635" />

            {/* Mạng lưới đường lộ đi lại giữa các tòa nhà (Không bị đè bởi text) */}
            <path
              d="M205,192 L205,350 M500,132 L500,205 M500,281 L500,360 M795,182 L795,350 M205,192 Q350,220 500,242 M205,350 Q350,260 500,242 M795,182 Q650,220 500,242 M795,350 Q650,260 500,242"
              fill="none"
              stroke="#64748b"
              strokeWidth="20"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.3"
            />
            <path
              d="M205,192 L205,350 M500,132 L500,205 M500,281 L500,360 M795,182 L795,350 M205,192 Q350,220 500,242 M205,350 Q350,260 500,242 M795,182 Q650,220 500,242 M795,350 Q650,260 500,242"
              fill="none"
              stroke="#e2e8f0"
              strokeWidth="12"
              strokeLinecap="round"
              strokeLinejoin="round"
              opacity="0.75"
            />

            {/* Cây cảnh rải rác tạo cảm giác khuôn viên trường học sinh động */}
            {(
              [
                [80, 80], [330, 80], [640, 60], [920, 90],
                [80, 270], [330, 300], [640, 280], [920, 260],
                [70, 440], [330, 450], [640, 450], [920, 440],
              ] as [number, number][]
            ).map(([tx, ty], i) => (
              <g key={`tree-${i}`}>
                <circle cx={tx} cy={ty} r="14" fill="#0d5236" opacity="0.6" />
                <circle cx={tx} cy={ty - 2} r="11" fill="#15803d" opacity="0.8" />
                <circle cx={tx - 3} cy={ty - 4} r="5" fill="#22c55e" opacity="0.7" />
              </g>
            ))}

            {/* Các khối tòa nhà POI tương tác độc lập (Không text đè, không jitter) */}
            {CAMPUS_POIS.map((poi) => {
              const layout = POI_LAYOUTS[poi.id];
              if (!layout) return null;
              const isSelected = selectedPoi.id === poi.id;
              const isHere = poi.sceneId === currentScene;

              return (
                <g
                  key={poi.id}
                  className={`campus-poi-node${isSelected ? ' is-selected' : ''}${isHere ? ' is-current' : ''}`}
                  onClick={() => {
                    soundEngine.playSfx('select');
                    setSelectedPoi(poi);
                  }}
                  tabIndex={0}
                  role="button"
                  aria-label={`${poi.name}: ${layout.categoryLabel}`}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      soundEngine.playSfx('select');
                      setSelectedPoi(poi);
                    }
                  }}
                >
                  {/* Hào quang phát sáng nếu là điểm người chơi đang đứng */}
                  {isHere ? (
                    <rect
                      x={layout.x - 4}
                      y={layout.y - 4}
                      width={layout.width + 8}
                      height={layout.height + 8}
                      rx="14"
                      fill="none"
                      stroke="#22c55e"
                      strokeWidth="2"
                      opacity="0.6"
                    >
                      <animate attributeName="opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" />
                    </rect>
                  ) : null}

                  {/* Nền Card tòa nhà Glassmorphism */}
                  <rect
                    x={layout.x}
                    y={layout.y}
                    width={layout.width}
                    height={layout.height}
                    rx="10"
                    fill="rgba(15, 23, 42, 0.94)"
                    stroke={isHere ? '#22c55e' : isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.2)'}
                    strokeWidth={isHere || isSelected ? '2.5' : '1.5'}
                  />

                  {/* Icon & Category Tag */}
                  <g transform={`translate(${layout.x}, ${layout.y})`}>
                    {layout.icon(isHere ? '#22c55e' : isSelected ? '#38bdf8' : layout.accentColor)}
                  </g>
                  <text
                    x={layout.x + 38}
                    y={layout.y + 24}
                    fill={isHere ? '#4ade80' : isSelected ? '#7dd3fc' : layout.accentColor}
                    fontSize="10"
                    fontWeight="800"
                    letterSpacing="0.08em"
                  >
                    {layout.categoryLabel}
                  </text>

                  {/* Tên Tòa Nhà (Rõ ràng, không bị đè bởi bất kỳ hình nào) */}
                  <text
                    x={layout.x + 14}
                    y={layout.y + 52}
                    fill="#ffffff"
                    fontSize="13.5"
                    fontWeight="700"
                  >
                    {poi.name}
                  </text>

                  {/* Badge Báo hiệu Vị trí Hiện tại */}
                  {isHere ? (
                    <g transform={`translate(${layout.x + layout.width - 24}, ${layout.y + 20})`}>
                      <circle r="10" fill="#22c55e" opacity="0.3">
                        <animate attributeName="r" values="6;14;6" dur="2s" repeatCount="indefinite" />
                        <animate attributeName="opacity" values="0.5;0.05;0.5" dur="2s" repeatCount="indefinite" />
                      </circle>
                      <circle r="5" fill="#22c55e" stroke="#ffffff" strokeWidth="1.5" />
                    </g>
                  ) : isSelected ? (
                    <circle cx={layout.x + layout.width - 18} cy={layout.y + 20} r="4" fill="#38bdf8" />
                  ) : null}
                </g>
              );
            })}
          </svg>
        </div>

        {/* Bảng chi tiết POI đã chọn */}
        <div className="campus-map__info">
          <div>
            <h3 style={{ margin: 0, fontSize: '1.15rem', color: '#38bdf8', display: 'flex', alignItems: 'center', gap: 10 }}>
              {selectedPoi.name}
              {selectedPoi.sceneId === currentScene ? (
                <span style={{ fontSize: '0.75rem', background: '#16a34a', color: '#fff', padding: '3px 10px', borderRadius: 12, fontWeight: 700 }}>
                  VỊ TRÍ HIỆN TẠI
                </span>
              ) : null}
            </h3>
            <p style={{ margin: '6px 0', fontSize: '0.92rem', color: '#cbd5e1' }}>{selectedPoi.description}</p>
            <p style={{ margin: 0, fontSize: '0.86rem', color: '#94a3b8', fontStyle: 'italic' }}>
              💡 {selectedPoi.storyNote}
            </p>
          </div>
          <button type="button" className="audio-btn audio-btn--close" onClick={onClose}>
            Đóng bản đồ
          </button>
        </div>
      </div>
    </div>
  );
}
