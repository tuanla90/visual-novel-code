import { useEffect, useRef } from 'react';
import { useVnStore } from './vn-store';
import { soundEngine } from '../audio/sound-engine';
import './vn-controls.css';

export interface BacklogModalProps {
  open: boolean;
  onClose: () => void;
}

export function BacklogModal({ open, onClose }: BacklogModalProps) {
  const backlog = useVnStore((s) => s.backlog);
  const listRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    soundEngine.playSfx('page');
    closeBtnRef.current?.focus();
    // Cuộn xuống cuối để đọc câu thoại gần nhất
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight;
    }

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
    <div className="backlog-modal__backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="backlog-title">
      <div className="backlog-modal__card" onClick={(e) => e.stopPropagation()}>
        <div className="backlog-modal__header">
          <h2 id="backlog-title" className="backlog-modal__title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            Lịch sử Hội thoại (Backlog)
          </h2>
          <button ref={closeBtnRef} type="button" className="audio-modal__close" onClick={onClose} aria-label="Đóng">
            ×
          </button>
        </div>

        <div ref={listRef} className="backlog-modal__list">
          {backlog.length === 0 ? (
            <p style={{ textAlign: 'center', color: '#64748b', fontStyle: 'italic', margin: 'auto' }}>
              Chưa có lời thoại nào được ghi lại.
            </p>
          ) : (
            backlog.map((item, idx) => (
              <div key={`${item.id}-${idx}`} className="backlog-item">
                <span className="backlog-item__speaker">{item.speakerName || 'Người dẫn truyện'}</span>
                <span className="backlog-item__text">{item.text}</span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
