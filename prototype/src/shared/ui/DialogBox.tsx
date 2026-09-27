/**
 * Hộp thoại: một lời với nhãn người nói ("Bạn" cho player, không nhãn cho narrator).
 * Bấm vào hộp hoặc nhấn Space/Enter để qua (QĐ-028). `display: 'card'` → thẻ chữ lớn giữa màn hình.
 *
 * Chống bỏ lỡ (QĐ-066, mẫu ObjectionEffect — `use-press-guard.ts`): hộp phản hồi hiện đúng chỗ danh
 * sách lựa chọn vừa bấm, nên cú bấm thứ hai của bấm đúp, phím đang giữ, hay cú bấm/phím trong ~400 ms
 * sau khi lời đổi KHÔNG qua lời. Nút "Tiếp tục ▸" là cú bấm chủ ý: nhận ngay cú bấm đơn, chỉ bỏ cú
 * bấm lặp của bấm đúp.
 */
import { useEffect, useRef } from 'react';
import { speakerLabel } from '../display-names';
import type { DialogueLine } from '../../story/types';
import { CodeText } from './CodeText';
import { usePressGuard } from './use-press-guard';

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
  // Khóa lại mỗi khi lời đổi (khóa theo chữ, không theo đối tượng, để lời dựng tại chỗ không khóa mãi).
  const guard = usePressGuard(`${line.speaker}|${line.text}|${hint ?? ''}`);

  useEffect(() => {
    if (!keyboardEnabled) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key !== ' ' && e.key !== 'Enter') return;
      if (isTypingTarget(e.target)) return;
      // Nếu tiêu điểm đang ở một nút khác thì để nút đó xử lý, tránh kích hoạt hai lần.
      const active = document.activeElement;
      if (active instanceof HTMLButtonElement && !rootRef.current?.contains(active)) return;
      e.preventDefault();
      if (!guard.key(e)) return;
      onAdvance();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onAdvance, keyboardEnabled, guard]);

  return (
    <div
      ref={rootRef}
      className={display === 'card' ? 'dialog dialog--card' : 'dialog'}
      onClick={(e) => {
        if (guard.click(e)) onAdvance();
      }}
      data-speaker={line.speaker}
    >
      {label ? <div className="dialog__speaker">{label}</div> : null}
      <p className="dialog__text">
        <CodeText text={line.text} />
      </p>
      <div className="dialog__footer">
        {hint ? <span className="dialog__hint">{hint}</span> : null}
        <button
          type="button"
          className="dialog__next"
          onClick={(e) => {
            e.stopPropagation();
            if (guard.click(e, { immediate: true })) onAdvance();
          }}
        >
          Tiếp tục ▸
        </button>
      </div>
    </div>
  );
}
