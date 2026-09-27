import { useEffect, useRef } from 'react';
import { useAudioStore } from './audio-store';
import { soundEngine } from './sound-engine';
import './audio.css';

export interface AudioSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

export function AudioSettingsModal({ open, onClose }: AudioSettingsModalProps) {
  const masterVolume = useAudioStore((s) => s.masterVolume);
  const bgmVolume = useAudioStore((s) => s.bgmVolume);
  const sfxVolume = useAudioStore((s) => s.sfxVolume);
  const muted = useAudioStore((s) => s.muted);
  const bgmEnabled = useAudioStore((s) => s.bgmEnabled);

  const setMasterVolume = useAudioStore((s) => s.setMasterVolume);
  const setBgmVolume = useAudioStore((s) => s.setBgmVolume);
  const setSfxVolume = useAudioStore((s) => s.setSfxVolume);
  const toggleMute = useAudioStore((s) => s.toggleMute);
  const toggleBgm = useAudioStore((s) => s.toggleBgm);

  const closeBtnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
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
    <div className="audio-modal__backdrop" onClick={onClose} role="dialog" aria-modal="true" aria-labelledby="audio-title">
      <div className="audio-modal__card" onClick={(e) => e.stopPropagation()}>
        <div className="audio-modal__header">
          <h2 id="audio-title" className="audio-modal__title">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
            </svg>
            Cài đặt Âm thanh
          </h2>
          <button ref={closeBtnRef} type="button" className="audio-modal__close" onClick={onClose} aria-label="Đóng">
            ×
          </button>
        </div>

        <div className="audio-modal__content">
          <label className="audio-row">
            <div className="audio-row__label">
              <span>Tổng âm lượng (Master)</span>
              <span className="audio-row__val">{masterVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={masterVolume}
              onChange={(e) => setMasterVolume(Number(e.target.value))}
              className="audio-slider"
            />
          </label>

          <label className="audio-row">
            <div className="audio-row__label">
              <span>Nhạc nền (BGM)</span>
              <span className="audio-row__val">{bgmVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={bgmVolume}
              onChange={(e) => setBgmVolume(Number(e.target.value))}
              className="audio-slider"
            />
          </label>

          <label className="audio-row">
            <div className="audio-row__label">
              <span>Hiệu ứng âm thanh (SFX)</span>
              <span className="audio-row__val">{sfxVolume}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={sfxVolume}
              onChange={(e) => setSfxVolume(Number(e.target.value))}
              className="audio-slider"
            />
          </label>

          <div className="audio-toggle" onClick={toggleMute}>
            <span>Tắt toàn bộ âm thanh (Mute)</span>
            <input type="checkbox" checked={muted} onChange={() => {}} style={{ pointerEvents: 'none' }} />
          </div>

          <div className="audio-toggle" onClick={() => {
            toggleBgm();
            soundEngine.toggleBgmPlayback();
          }}>
            <span>Phát nhạc nền học đường (Ambient BGM)</span>
            <input type="checkbox" checked={bgmEnabled} onChange={() => {}} style={{ pointerEvents: 'none' }} />
          </div>
        </div>

        <div className="audio-modal__actions">
          <button
            type="button"
            className="audio-btn audio-btn--test"
            onClick={() => soundEngine.playSfx('chime')}
          >
            Thử âm SFX
          </button>
          <button type="button" className="audio-btn audio-btn--close" onClick={onClose}>
            Xong
          </button>
        </div>
      </div>
    </div>
  );
}
