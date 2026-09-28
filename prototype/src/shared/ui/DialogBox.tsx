/**
 * Hộp thoại: một lời với nhãn người nói ("Bạn" cho player, không nhãn cho narrator).
 * Bấm vào hộp hoặc nhấn Space/Enter để qua (QĐ-028). `display: 'card'` → thẻ chữ lớn giữa màn hình.
 *
 * Chống bỏ lỡ (QĐ-066, mẫu ObjectionEffect — `use-press-guard.ts`): hộp phản hồi hiện đúng chỗ danh
 * sách lựa chọn vừa bấm, nên cú bấm thứ hai của bấm đúp, phím đang giữ, hay cú bấm/phím trong ~400 ms
 * sau khi lời đổi KHÔNG qua lời. Nút "Tiếp tục ▸" là cú bấm chủ ý: nhận ngay cú bấm đơn, chỉ bỏ cú
 * bấm lặp của bấm đúp.
 */
import { useCallback, useEffect, useRef } from 'react';
import { speakerLabel } from '../display-names';
import type { DialogueLine } from '../../story/types';
import { CodeText } from './CodeText';
import { usePressGuard } from './use-press-guard';
import { useTypewriter } from './use-typewriter';
import { readLineKey, SPEED_MS, useVnStore } from '../vn/vn-store';
import { soundEngine } from '../audio/sound-engine';
import {
  IconPlay,
  IconFastForward,
  IconHistory,
  IconSave,
  IconFolderOpen,
  IconEyeOff,
  IconSliders,
} from './icons';

export interface DialogBoxProps {
  line: DialogueLine;
  display?: 'dialog' | 'card';
  /** Nhãn phụ (ví dụ "Phản hồi 1/2"). */
  hint?: string;
  onAdvance: () => void;
  /** Tắt phím tắt khi có lớp phủ (ngăn kéo hồ sơ, hộp xác nhận); Auto/Skip cũng tạm dừng khi đó. */
  keyboardEnabled?: boolean;
  onOpenNotebook?: () => void;
  notebookCount?: number;
  onOpenBacklog?: () => void;
  onOpenSave?: () => void;
  onOpenLoad?: () => void;
  onOpenAudio?: () => void;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

export function DialogBox({
  line,
  display = 'dialog',
  hint,
  onAdvance,
  keyboardEnabled = true,
  onOpenNotebook,
  notebookCount,
  onOpenBacklog,
  onOpenSave,
  onOpenLoad,
  onOpenAudio,
}: DialogBoxProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const label = speakerLabel(line.speaker);
  const readKey = readLineKey(line.speaker, line.text);
  const markRead = useVnStore((s) => s.markRead);
  const alreadyRead = useVnStore((s) => s.readLines[readKey] === true);
  /** Qua lời: ghi nhận đã đọc (để Skip lần sau tua được) rồi mới đi tiếp. */
  const advanceFromLine = useCallback(() => {
    markRead(readKey);
    onAdvance();
  }, [markRead, readKey, onAdvance]);
  // Chống bấm đúp (QĐ-066) chỉ áp cho thao tác của người chơi; Auto/Skip gọi thẳng `advanceFromLine`
  // (nếu đi qua bộ chống bấm đúp, Skip 80 ms/câu sẽ bị chặn và đứng lại sau câu đầu).
  // Khóa lại mỗi khi lời đổi (khóa theo chữ, không theo đối tượng, để lời dựng tại chỗ không khóa mãi).
  const guard = usePressGuard(`${line.speaker}|${line.text}|${hint ?? ''}`);

  const autoMode = useVnStore((s) => s.autoMode);
  const toggleAutoMode = useVnStore((s) => s.toggleAutoMode);
  const skipMode = useVnStore((s) => s.skipMode);
  const setSkipMode = useVnStore((s) => s.setSkipMode);
  const toggleSkipMode = useVnStore((s) => s.toggleSkipMode);
  const toggleHideUi = useVnStore((s) => s.toggleHideUi);
  const textSpeed = useVnStore((s) => s.textSpeed);
  const dialogueFont = useVnStore((s) => s.dialogueFont);
  const pushBacklog = useVnStore((s) => s.pushBacklog);

  // Skip chỉ tua thoại đã đọc: gặp lời mới thì dừng để người chơi không lỡ manh mối.
  const skipping = skipMode && alreadyRead;
  useEffect(() => {
    if (skipMode && !alreadyRead) setSkipMode(false);
  }, [skipMode, alreadyRead, setSkipMode]);

  // Lưu vào Backlog
  useEffect(() => {
    pushBacklog({
      id: `${Date.now()}-${Math.random()}`,
      speaker: line.speaker,
      speakerName: label || 'Người dẫn chuyện',
      text: line.text,
    });
  }, [line, label, pushBacklog]);

  const isTestEnv = typeof process !== 'undefined' && process.env?.NODE_ENV === 'test';
  const speed = isTestEnv || skipping ? 0 : SPEED_MS[textSpeed];

  const { displayedText, isDone, completeImmediately } = useTypewriter({
    text: line.text,
    speedMs: speed,
    instant: isTestEnv || skipping || textSpeed === 'instant',
  });

  // Chân dung người nói mấp máy môi trong lúc chữ còn chạy (visuals/TalkOverlay.tsx).
  const setLineTyping = useVnStore((s) => s.setLineTyping);
  useEffect(() => {
    setLineTyping(!isDone);
    return () => setLineTyping(false);
  }, [isDone, setLineTyping]);

  // Tự động chuyển câu trong chế độ Auto hoặc Skip; tạm dừng khi có lớp phủ (hồ sơ, lịch sử, giới thiệu nhân vật…).
  useEffect(() => {
    if (!isDone || !keyboardEnabled) return;
    if (skipping) {
      const timer = setTimeout(advanceFromLine, 80);
      return () => clearTimeout(timer);
    }
    if (autoMode) {
      const delay = Math.max(1400, line.text.length * 45);
      const timer = setTimeout(advanceFromLine, delay);
      return () => clearTimeout(timer);
    }
  }, [isDone, keyboardEnabled, autoMode, skipping, line.text.length, advanceFromLine]);

  const handleBoxClick = (e: { detail: number }) => {
    if (!guard.click(e)) return;
    if (!isDone) completeImmediately();
    else advanceFromLine();
  };

  useEffect(() => {
    if (!keyboardEnabled) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key !== ' ' && e.key !== 'Enter') return;
      if (isTypingTarget(e.target)) return;
      const active = document.activeElement;
      if (active instanceof HTMLButtonElement && !rootRef.current?.contains(active)) return;
      e.preventDefault();
      if (!guard.key(e)) return;
      if (!isDone) completeImmediately();
      else advanceFromLine();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [guard, advanceFromLine, keyboardEnabled, isDone, completeImmediately]);

  return (
    <div className="dialog-container">
      {/* Thanh điều khiển nhanh phong cách Visual Novel */}
      {display !== 'card' ? (
        <div className="vn-quick-bar" role="toolbar" aria-label="Điều khiển hội thoại">
          <button
            type="button"
            className={`vn-btn${autoMode ? ' vn-btn--active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              soundEngine.playSfx('click');
              toggleAutoMode();
            }}
            title="Tự động chạy hội thoại"
          >
            <IconPlay width={14} height={14} />
            <span>Auto</span>
          </button>
          <button
            type="button"
            className={`vn-btn${skipMode ? ' vn-btn--active' : ''}`}
            onClick={(e) => {
              e.stopPropagation();
              soundEngine.playSfx('click');
              toggleSkipMode();
            }}
            disabled={!skipMode && !alreadyRead}
            title={alreadyRead || skipMode ? 'Tua nhanh qua thoại đã đọc' : 'Chỉ tua được thoại đã đọc'}
          >
            <IconFastForward width={14} height={14} />
            <span>Skip</span>
          </button>
          {onOpenBacklog ? (
            <button
              type="button"
              className="vn-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenBacklog();
              }}
              title="Xem lại lịch sử trò chuyện"
            >
              <IconHistory width={14} height={14} />
              <span>Log</span>
            </button>
          ) : null}
          {onOpenSave ? (
            <button
              type="button"
              className="vn-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenSave();
              }}
              title="Lưu tiến độ game"
            >
              <IconSave width={14} height={14} />
              <span>Lưu</span>
            </button>
          ) : null}
          {onOpenLoad ? (
            <button
              type="button"
              className="vn-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenLoad();
              }}
              title="Nạp tiến độ game"
            >
              <IconFolderOpen width={14} height={14} />
              <span>Nạp</span>
            </button>
          ) : null}
          <button
            type="button"
            className="vn-btn"
            onClick={(e) => {
              e.stopPropagation();
              soundEngine.playSfx('click');
              toggleHideUi();
            }}
            title="Ẩn giao diện để xem cảnh (Phím tắt: H)"
          >
            <IconEyeOff width={14} height={14} />
            <span>Ẩn UI</span>
          </button>
          {onOpenAudio ? (
            <button
              type="button"
              className="vn-btn"
              onClick={(e) => {
                e.stopPropagation();
                onOpenAudio();
              }}
              title="Cài đặt: tốc độ chữ, âm lượng"
            >
              <IconSliders width={14} height={14} />
              <span>Cài đặt</span>
            </button>
          ) : null}
        </div>
      ) : null}

      <div
        ref={rootRef}
        className={display === 'card' ? 'dialog dialog--card' : 'dialog dialog--glass'}
        onClick={handleBoxClick}
        data-speaker={line.speaker}
      >
        {label ? (
          <div className="dialog__speaker">
            <svg className="dialog__speaker-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
            <span>{label}</span>
          </div>
        ) : null}
        <p className={`dialog__text dialog__text--${dialogueFont}`}>
          <CodeText text={displayedText} />
        </p>
        <div className="dialog__indicator" aria-hidden="true">
          <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor">
            <path d="M8 5v14l11-7z" />
          </svg>
        </div>
      </div>

      {/* Button Hồ sơ và Tiếp tục nằm ngoài khung thoại */}
      <div className="dialog__footer dialog__footer--external">
        <div className="dialog__footer-left">
          {onOpenNotebook ? (
            <button
              type="button"
              className="dialog__btn-notebook"
              onClick={(e) => {
                e.stopPropagation();
                soundEngine.playSfx('page');
                onOpenNotebook();
              }}
              title="Mở hòm đồ & hồ sơ vụ án"
            >
              <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
              </svg>
              <span>Hồ sơ {notebookCount !== undefined ? `(${notebookCount})` : ''}</span>
            </button>
          ) : null}
        </div>
        {hint ? <span className="dialog__hint">{hint}</span> : null}
        <div className="dialog__footer-right">
          <button
            type="button"
            className="dialog__next"
            onKeyDown={guard.holdKey}
            onClick={(e) => {
              e.stopPropagation();
              // Nút chủ ý: nhận ngay cú bấm đơn, chỉ bỏ cú bấm lặp của bấm đúp.
              if (!guard.click(e, { immediate: true })) return;
              completeImmediately();
              advanceFromLine();
            }}
          >
            <span>Tiếp tục</span>
            <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
