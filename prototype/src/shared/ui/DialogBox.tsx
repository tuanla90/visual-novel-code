/**
 * Hộp thoại: một lời với nhãn người nói ("Bạn" cho player, không nhãn cho narrator).
 * Bấm vào hộp hoặc nhấn Space/Enter để qua (QĐ-028). `display: 'card'` → thẻ chữ lớn giữa màn hình.
 */
import { useEffect, useRef } from 'react';
import { speakerLabel } from '../display-names';
import type { DialogueLine } from '../../story/types';

export interface DialogBoxProps {
  line: DialogueLine;
  display?: 'dialog' | 'card';
  /** Nhãn phụ (ví dụ "Phản hồi 1/2"). */
  hint?: string;
  onAdvance: () => void;
  /** Tắt phím tắt khi có lớp phủ (ngăn kéo hồ sơ, hộp xác nhận). */
  keyboardEnabled?: boolean;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

export function DialogBox({ line, display = 'dialog', hint, onAdvance, keyboardEnabled = true }: DialogBoxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const label = speakerLabel(line.speaker);

  useEffect(() => {
    if (!keyboardEnabled) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key !== ' ' && e.key !== 'Enter') return;
      if (isTypingTarget(e.target)) return;
      // Nếu tiêu điểm đang ở một nút khác thì để nút đó xử lý, tránh kích hoạt hai lần.
      const active = document.activeElement;
      if (active instanceof HTMLButtonElement && !rootRef.current?.contains(active)) return;
      e.preventDefault();
      onAdvance();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onAdvance, keyboardEnabled]);

  return (
    <div
      ref={rootRef}
      className={display === 'card' ? 'dialog dialog--card' : 'dialog'}
      onClick={onAdvance}
      data-speaker={line.speaker}
    >
      {label ? <div className="dialog__speaker">{label}</div> : null}
      <p className="dialog__text">{line.text}</p>
      <div className="dialog__footer">
        {hint ? <span className="dialog__hint">{hint}</span> : null}
        <button
          type="button"
          className="dialog__next"
          onClick={(e) => {
            e.stopPropagation();
            onAdvance();
          }}
        >
          Tiếp tục ▸
        </button>
      </div>
    </div>
  );
}
