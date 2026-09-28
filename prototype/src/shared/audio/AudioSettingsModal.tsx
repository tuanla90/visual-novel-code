import { useEffect, useRef } from 'react';
import { useAudioStore } from './audio-store';
import { soundEngine } from './sound-engine';
import { SPEED_MS, useVnStore, type TextSpeed } from '../vn/vn-store';
import { useTypewriter } from '../ui/use-typewriter';
import './audio.css';

export interface AudioSettingsModalProps {
  open: boolean;
  onClose: () => void;
}

const SPEED_OPTIONS: { value: TextSpeed; label: string }[] = [
  { value: 'slow', label: 'Chậm' },
  { value: 'normal', label: 'Vừa' },
  { value: 'fast', label: 'Nhanh' },
  { value: 'instant', label: 'Hiện ngay' },
];

const PREVIEW_TEXT = 'Chữ sẽ hiện với tốc độ này. Bấm hoặc nhấn Space để hiện hết câu.';

/** Dòng xem trước: chạy lại mỗi khi đổi tốc độ (key đổi → gắn lại). */
function SpeedPreview({ speed }: { speed: TextSpeed }) {
  const { displayedText } = useTypewriter({ text: PREVIEW_TEXT, speedMs: SPEED_MS[speed], instant: speed === 'instant' });
  return (
    <p className="settings-speed__preview" aria-hidden="true">
      {displayedText}
      <span className="settings-speed__rest">{PREVIEW_TEXT.slice(displayedText.length)}</span>
    </p>
  );
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

  const textSpeed = useVnStore((s) => s.textSpeed);
  const setTextSpeed = useVnStore((s) => s.setTextSpeed);

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
            Cài đặt
          </h2>
          <button ref={closeBtnRef} type="button" className="audio-modal__close" onClick={onClose} aria-label="Đóng">
            ×
          </button>
        </div>

        <div className="audio-modal__content">
          <fieldset className="settings-speed">
            <legend className="settings-speed__legend">Tốc độ chạy chữ</legend>
            <div className="settings-speed__options" role="radiogroup" aria-label="Tốc độ chạy chữ">
              {SPEED_OPTIONS.map((o) => (
                <label key={o.value} className={`settings-speed__option${textSpeed === o.value ? ' is-active' : ''}`}>
                  <input
                    type="radio"
                    name="text-speed"
                    value={o.value}
                    checked={textSpeed === o.value}
                    onChange={() => setTextSpeed(o.value)}
                  />
                  <span>{o.label}</span>
                </label>
              ))}
            </div>
            <SpeedPreview key={textSpeed} speed={textSpeed} />
          </fieldset>

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

          <label className="audio-toggle">
            <span>Tắt toàn bộ âm thanh (Mute)</span>
            <input type="checkbox" checked={muted} onChange={toggleMute} />
          </label>

          <label className="audio-toggle">
            <span>Phát nhạc nền học đường (Ambient BGM)</span>
            <input
              type="checkbox"
              checked={bgmEnabled}
              onChange={() => {
                // Phát/dừng theo trạng thái MỚI (cú bấm này là thao tác người dùng nên được phép phát âm thanh).
                const next = !bgmEnabled;
                toggleBgm();
                if (next) soundEngine.startBgm();
                else soundEngine.stopBgm();
              }}
            />
          </label>
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
