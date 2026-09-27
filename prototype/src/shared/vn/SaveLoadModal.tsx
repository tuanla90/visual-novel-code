import { useEffect, useRef } from 'react';
import { useVnStore, type SaveSlot } from './vn-store';
import { soundEngine } from '../audio/sound-engine';
import type { StoryProgress } from '../../story/engine/state';
import type { GameData } from '../store/store';
import './vn-controls.css';

export interface SaveLoadModalProps {
  open: boolean;
  mode: 'save' | 'load';
  onClose: () => void;
  progress: StoryProgress | null;
  evidence: GameData['evidence'] | null;
  scene: string;
  onRestore: (slot: SaveSlot) => void;
  onToast: (msg: string) => void;
}

export function SaveLoadModal({
  open,
  mode,
  onClose,
  progress,
  evidence,
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
      if (!progress || !evidence) return;
      saveToSlot(index, progress, evidence, scene);
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
    <div className="saveload-modal__backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="saveload-title">
      <div className="saveload-modal__card" onClick={(e) => e.stopPropagation()}>
        <div className="backlog-modal__header" style={{ padding: 0, paddingBottom: 16 }}>
          <h2 id="saveload-title" className="backlog-modal__title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z" />
              <polyline points="17 21 17 13 7 13 7 21" />
              <polyline points="7 3 7 8 15 8" />
            </svg>
            {mode === 'save' ? 'Lưu Tiến Độ (Save Game)' : 'Nạp Tiến Độ (Load Game)'}
          </h2>
          <button ref={closeBtnRef} type="button" className="audio-modal__close" onClick={onClose} aria-label="Đóng">
            ×
          </button>
        </div>

        <div className="saveload-grid">
          {saveSlots.map((slot, idx) => (
            <div
              key={idx}
              className="save-slot"
              onClick={() => handleSlotClick(idx)}
              style={mode === 'load' && !slot ? { opacity: 0.5, cursor: 'not-allowed' } : {}}
            >
              <div className="save-slot__header">
                <span className="save-slot__index">Ô SỐ {idx + 1}</span>
                <span>{slot ? slot.date : 'Trống'}</span>
              </div>
              <div className="save-slot__thumb">
                {slot ? slot.thumbnailText : <span className="save-slot__empty">— Trống —</span>}
              </div>
              <div className="save-slot__task">
                {slot ? slot.task : mode === 'save' ? 'Bấm để lưu vào đây' : 'Chưa có dữ liệu'}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
