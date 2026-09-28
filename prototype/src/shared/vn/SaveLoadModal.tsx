import { useEffect, useRef } from 'react';
import { useVnStore, type SaveSlot, type SaveSnapshot } from './vn-store';
import { soundEngine } from '../audio/sound-engine';
import { resolveBackground } from '../ui/visuals/art-slots';
import type { SceneId } from '../ids';
import { partName, sceneName } from '../display-names';
import './saveload-modal.css';

export interface SaveLoadModalProps {
  open: boolean;
  mode: 'save' | 'load';
  onClose: () => void;
  /** Trạng thái game hiện tại để lưu (null khi chưa bắt đầu). */
  snapshot: SaveSnapshot | null;
  scene: string;
  onRestore: (slot: SaveSlot) => void;
  onToast: (msg: string) => void;
}

const PLACEHOLDER_THUMB = '/src/assets/art/bg-prototype-hallway.webp';

/**
 * Chụp nhanh màn hình cảnh chơi hiện tại để lưu vào ô save (thumbnail 16:9).
 */
function captureCurrentScreenshot(scene: string): string {
  try {
    const bgImg = document.querySelector<HTMLImageElement>('.stage__backdrop-img');
    if (bgImg && bgImg.complete && bgImg.naturalWidth > 0) {
      const canvas = document.createElement('canvas');
      canvas.width = 320;
      canvas.height = 180;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(bgImg, 0, 0, 320, 180);
        return canvas.toDataURL('image/jpeg', 0.85);
      }
    }
  } catch {
    // Không thể capture (canvas tainted do sandbox/cross-origin)
  }
  const art = resolveBackground(scene as SceneId);
  return art.url || PLACEHOLDER_THUMB;
}

export function SaveLoadModal({
  open,
  mode,
  onClose,
  snapshot,
  scene,
  onRestore,
  onToast,
}: SaveLoadModalProps) {
  const saveSlots = useVnStore((s) => s.saveSlots);
  const saveToSlot = useVnStore((s) => s.saveToSlot);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    soundEngine.playSfx('click');
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

  const handleSlotClick = (index: number) => {
    if (mode === 'save') {
      if (!snapshot) return;
      saveToSlot(index, snapshot, scene, captureCurrentScreenshot(scene));
      soundEngine.playSfx('select');
      onToast(`Đã lưu tiến độ vào Ô số ${index + 1}!`);
      onClose();
    } else {
      const slot = saveSlots[index];
      if (!slot) return;
      soundEngine.playSfx('select');
      onRestore(slot);
      onToast(`Đã nạp tiến độ từ Ô số ${index + 1}!`);
      onClose();
    }
  };

  return (
    <div
      className="saveload-modal__backdrop"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="saveload-title"
    >
      {/* 1. NÚT QUAY LẠI Ở GÓC DƯỚI BÊN TRÁI MÀN HÌNH */}
      <button
        type="button"
        className="saveload-back-btn"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label="Quay lại trò chơi"
      >
        <span className="saveload-back-btn__arrow" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="19" y1="12" x2="5" y2="12" />
            <polyline points="12 19 5 12 12 5" />
          </svg>
        </span>
        <span className="saveload-back-btn__text">Quay lại</span>
        <span className="saveload-back-btn__leaves" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z" />
            <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12" />
          </svg>
        </span>
      </button>

      {/* 2. KHUNG MODAL SỔ TAY GIẤY NGÀ CỔ ĐIỂN */}
      <div className="saveload-card" onClick={(e) => e.stopPropagation()}>
        {/* TIÊU ĐỀ: Vệt màu vàng cam + Icon + Font nghệ thuật in nghiêng */}
        <div className="saveload-header">
          <div className="saveload-title-wrap">
            <div className="saveload-title-badge">
              <span className="saveload-title-badge__icon" aria-hidden="true">
                {mode === 'save' ? (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
                    <polyline points="17 21 17 13 7 13 7 21" />
                    <polyline points="7 3 7 8 15 8" />
                  </svg>
                ) : (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                  </svg>
                )}
              </span>
              <h2 id="saveload-title" className="saveload-title-badge__text">
                {mode === 'save' ? 'Lưu Tiến Độ' : 'Tải Tiến Độ'}
              </h2>
            </div>
            <span className="saveload-title-sub">
              {mode === 'save' ? '(Save Game)' : '(Load Game)'}
            </span>
          </div>

          <button
            ref={closeBtnRef}
            type="button"
            className="saveload-close-btn"
            onClick={onClose}
            aria-label="Đóng"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* LƯỚI 6 Ô LƯU TIẾN ĐỘ */}
        <div className="saveload-grid">
          {saveSlots.map((slot, idx) => {
            const hasData = Boolean(slot);
            const thumbUrl = slot?.screenshot || (slot ? resolveBackground(slot.scene as SceneId).url : null) || PLACEHOLDER_THUMB;

            return (
              <div
                key={idx}
                className={`save-slot-card ${hasData ? 'is-saved' : 'is-empty'}`}
                tabIndex={0}
                role="button"
                aria-disabled={mode === 'load' && !slot}
                onClick={() => handleSlotClick(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSlotClick(idx);
                  }
                }}
                style={mode === 'load' && !slot ? { opacity: 0.6, cursor: 'not-allowed' } : {}}
              >
                {/* Hoa văn góc trang trí */}
                <svg className="save-slot-card__decor-corner" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2L15 8L21 9L17 14L18 20L12 17L6 20L7 14L3 9L9 8L12 2Z" opacity="0.6" />
                </svg>

                {/* Phần nhãn đầu thẻ */}
                <div className="save-slot-card__header">
                  <span className="save-slot-card__badge">Ô số {idx + 1}</span>
                  <span className={`save-slot-card__status ${hasData ? 'has-data' : ''}`}>
                    {slot ? slot.date : 'Trống'}
                  </span>
                </div>

                {/* Khung ảnh Polaroid (placeholder đen trắng hoặc screenshot có màu) */}
                <div className="save-slot-card__thumb-box">
                  <img
                    className={hasData ? 'save-slot-card__thumb-img--saved' : 'save-slot-card__thumb-img--placeholder'}
                    src={thumbUrl}
                    alt=""
                    draggable={false}
                  />
                  {hasData && (
                    <div className="save-slot-card__thumb-overlay">
                      <span>{partName(slot?.part || '')}</span>
                      <span>{sceneName(slot?.scene || '')}</span>
                    </div>
                  )}
                </div>

                {/* Footer với icon đồng hồ và hướng dẫn */}
                <div className="save-slot-card__footer">
                  <span className="save-slot-card__clock-icon" aria-hidden="true">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <polyline points="12 6 12 12 16 14" />
                    </svg>
                  </span>
                  <span className="save-slot-card__footer-text">
                    {slot ? slot.task : mode === 'save' ? 'Bấm để lưu vào đây' : 'Chưa có dữ liệu'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
