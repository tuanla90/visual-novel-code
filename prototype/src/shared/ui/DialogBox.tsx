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
  // Chống bấm đúp chỉ áp cho thao tác của người chơi; Auto/Skip gọi thẳng `advanceFromLine`
  // (nếu đi qua bộ chống bấm đúp 400 ms, Skip 80 ms/câu sẽ bị chặn và đứng lại sau câu đầu).
  const guardedAdvance = usePressGuard(advanceFromLine);

  const autoMode = useVnStore((s) => s.autoMode);
  const toggleAutoMode = useVnStore((s) => s.toggleAutoMode);
  const skipMode = useVnStore((s) => s.skipMode);
  const setSkipMode = useVnStore((s) => s.setSkipMode);
  const toggleSkipMode = useVnStore((s) => s.toggleSkipMode);
  const toggleHideUi = useVnStore((s) => s.toggleHideUi);
  const textSpeed = useVnStore((s) => s.textSpeed);
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

  const handleBoxClick = () => {
    if (!isDone) {
      completeImmediately();
    } else {
      guardedAdvance();
    }
  };

  useEffect(() => {
    if (!keyboardEnabled) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key !== ' ' && e.key !== 'Enter') return;
      if (isTypingTarget(e.target)) return;
      const active = document.activeElement;
      if (active instanceof HTMLButtonElement && !rootRef.current?.contains(active)) return;
      e.preventDefault();

      if (!isDone) {
        completeImmediately();
      } else {
        guardedAdvance();
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [guardedAdvance, keyboardEnabled, isDone, completeImmediately]);

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
            <IconPlay width={10} height={10} />
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
            <IconFastForward width={11} height={11} />
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
              <IconHistory width={11} height={11} />
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
              <IconSave width={11} height={11} />
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
              <IconFolderOpen width={11} height={11} />
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
            <IconEyeOff width={11} height={11} />
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
              <IconSliders width={11} height={11} />
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
            <span>{label}</span>
          </div>
        ) : null}
        <p className="dialog__text">
          <CodeText text={displayedText} />
        </p>
        {isDone ? <span className="dialog__indicator">▼</span> : null}
        <div className="dialog__footer">
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
              <svg viewBox="0 0 24 24" aria-hidden="true">
                <path d="M4 5.5h5l1.5 2H20v11H4z" />
              </svg>
              Hồ sơ {notebookCount !== undefined ? `(${notebookCount})` : ''}
            </button>
          ) : null}
          {hint ? <span className="dialog__hint">{hint}</span> : null}
          <button
            type="button"
            className="dialog__next"
            onClick={(e) => {
              e.stopPropagation();
              completeImmediately();
              guardedAdvance();
            }}
          >
            <span>Tiếp tục</span>
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="m9 6 6 6-6 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
