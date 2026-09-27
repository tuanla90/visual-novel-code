/**
 * Khung Hà Vy (cột phải): một lời tại một thời điểm — bước hướng dẫn, gợi ý, hoặc nhận xét sau lần
 * chạy. Lời lấy từ nội dung; nhãn nhỏ cho biết lời thuộc loại nào. Chữ mã hiển thị qua CodeText.
 */
import { useState, type ReactNode } from 'react';
import { speakerLabel } from '../../shared/display-names';
import { CodeText } from '../../shared/ui/CodeText';
import { usePressGuard } from '../../shared/ui/use-press-guard';
import { resolvePortrait } from '../../shared/ui/visuals/art-slots';
import type { DialogueLine } from '../../story/types';

export interface HaVyNote {
  /** Nhãn nhỏ: "Bước 2/5", "Gợi ý 1/3", "Nhận xét lần chạy 3"… */
  label: string;
  line: DialogueLine;
  tone?: 'default' | 'success';
  /** Đổi khi có lời mới (để khung nháy nhẹ). */
  key: string;
}

export interface HaVyPanelProps {
  note: HaVyNote | null;
  /** Chữ khi chưa có lời nào. */
  idle: string;
  actions?: ReactNode;
  onAskHaVy?: () => void;
  askDisabled?: boolean;
}

export function HaVyPanel({ note, idle, actions, onAskHaVy, askDisabled }: HaVyPanelProps) {
  const [minimized, setMinimized] = useState(false);
  const who = note ? speakerLabel(note.line.speaker) : speakerLabel('ha-vy');
  const guardedAskHaVy = usePressGuard(onAskHaVy);
  const avatarArt = resolvePortrait('ha-vy', note?.tone === 'success' ? 'smile' : 'thinking');

  return (
    <section className={`havy${note?.tone === 'success' ? ' havy--success' : ''}`} aria-labelledby="havy-name">
      <div className="havy__head">
        <span className="havy__avatar" aria-hidden="true">
          {avatarArt.url ? (
            <img src={avatarArt.url} alt="" className="havy__avatar-img" />
          ) : (
            <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="8" r="4" />
              <circle cx="10.2" cy="8" r="1.1" />
              <circle cx="13.8" cy="8" r="1.1" />
              <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
            </svg>
          )}
        </span>
        <h3 id="havy-name" className="havy__name">
          {who}
        </h3>
        {note ? <span className="havy__label">{note.label}</span> : null}
        <button type="button" className="qb-icon-btn" aria-label={minimized ? 'Mở chat Hà Vy' : 'Thu nhỏ chat Hà Vy'} aria-expanded={!minimized} aria-controls="havy-chat" onClick={() => setMinimized(!minimized)}>
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true"><path d={minimized ? 'M5 12h14M12 5v14' : 'M5 12h14'} /></svg>
        </button>
      </div>
      <div id="havy-chat" className="havy__chat" hidden={minimized}>
      <div className="havy__body" aria-live="polite">
        {note ? (
          <p key={note.key} className="havy__text">
            <CodeText text={note.line.text} />
          </p>
        ) : (
          <p className="havy__idle">{idle}</p>
        )}
      </div>
      {onAskHaVy || actions ? (
        <div className="havy__actions">
          {onAskHaVy ? (
            <button type="button" className="btn btn--small btn--havy" onClick={guardedAskHaVy} disabled={askDisabled}>
              Hỏi Hà Vy
            </button>
          ) : null}
          {actions}
        </div>
      ) : null}
      </div>
    </section>
  );
}
