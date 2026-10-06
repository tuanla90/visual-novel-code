/**
 * Hộp thoại: một lời với nhãn người nói ("Bạn" cho player, không nhãn cho narrator).
 * Bấm vào hộp hoặc nhấn Space/Enter để qua (QĐ-028). `display: 'card'` → thẻ chữ lớn giữa màn hình.
 *
 * Chống bỏ lỡ (QĐ-066, mẫu ObjectionEffect — `use-press-guard.ts`): hộp phản hồi hiện đúng chỗ danh
 * sách lựa chọn vừa bấm, nên cú bấm thứ hai của bấm đúp, phím đang giữ, hay cú bấm/phím trong ~400 ms
 * sau khi lời đổi KHÔNG qua lời. Nút "Tiếp tục ▸" là cú bấm chủ ý: nhận ngay cú bấm đơn, chỉ bỏ cú
 * bấm lặp của bấm đúp.
 */
import { useCallback, useEffect, useRef, useState, type MouseEvent as ReactMouseEvent } from 'react';
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
  IconChevronLeft,
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
  /** Lùi lại bước trước (bản MVP). Không truyền → không có nút Lùi; phím tắt: ← hoặc PageUp. */
  onBack?: () => void;
  /**
   * Nhãn người nói thay cho tra cứu `speakerLabel` (bản MVP: nhân vật lấy từ nhan-vat.md, không nằm trong
   * `shared/ids.ts`). Không truyền → hành vi cũ của prototype.
   */
  speakerName?: string;
  /**
   * Bản MVP (user 06/10): nút "Tiếp tục" nằm TRONG khung thoại (tam giác nhỏ + chữ ở góc phải dưới) thay cho nút to
   * chiếm một góc màn hình; footer ngoài khung chỉ còn thanh nút nhanh của màn dọc. Không truyền → nút ngoài khung như cũ.
   */
  nutTiepTrongKhung?: boolean;
}

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || target.isContentEditable;
}

function VnQuickButtons({
  autoMode,
  toggleAutoMode,
  skipMode,
  toggleSkipMode,
  alreadyRead,
  onBack,
  onOpenBacklog,
  onOpenSave,
  onOpenLoad,
  toggleHideUi,
  onOpenAudio,
  className,
}: {
  onBack?: () => void;
  autoMode: boolean;
  toggleAutoMode: () => void;
  skipMode: boolean;
  toggleSkipMode: () => void;
  alreadyRead: boolean;
  onOpenBacklog?: () => void;
  onOpenSave?: () => void;
  onOpenLoad?: () => void;
  toggleHideUi: () => void;
  onOpenAudio?: () => void;
  className?: string;
}) {
  return (
    <div className={`vn-quick-bar ${className ?? ''}`} role="toolbar" aria-label="Điều khiển hội thoại">
      {onBack ? (
        <button
          type="button"
          className="vn-btn"
          onClick={(e) => {
            e.stopPropagation();
            soundEngine.playSfx('click');
            onBack();
          }}
          title="Lùi lại câu trước (Phím tắt: ←)"
        >
          <IconChevronLeft width={14} height={14} />
          <span>Lùi</span>
        </button>
      ) : null}
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
        title={alreadyRead || skipMode ? 'Tua nhanh qua thoại đã đọc (giữ Ctrl để tua cả thoại mới)' : 'Chỉ tua được thoại đã đọc — giữ Ctrl để tua cả thoại mới'}
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
          className="vn-btn vn-btn--audio-desktop"
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
  );
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
  onBack,
  speakerName,
  nutTiepTrongKhung = false,
}: DialogBoxProps) {
  const trongKhung = nutTiepTrongKhung && display !== 'card';
  const rootRef = useRef<HTMLDivElement>(null);
  const label = speakerName ?? speakerLabel(line.speaker);
  const readKey = readLineKey(line.speaker, line.text);
  const markRead = useVnStore((s) => s.markRead);
  const skipUnread = useVnStore((s) => s.skipUnread);
  // Tùy chọn "Skip cả lời chưa đọc" (Cài đặt): coi mọi lời như đã đọc để tua.
  const alreadyRead = useVnStore((s) => s.readLines[readKey] === true) || skipUnread;
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
  const giuTua = useVnStore((s) => s.giuTua);
  // Giữ Ctrl thì tua cả lời chưa đọc (người chơi tự chọn, như các game hình ảnh khác).
  const skipping = (skipMode && alreadyRead) || giuTua;
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

  const textRef = useRef<HTMLParagraphElement>(null);
  const [pageIndex, setPageIndex] = useState<number>(0);

  // Khi đổi câu thoại: reset trang và cuộn lên đầu
  useEffect(() => {
    setPageIndex(0);
    if (textRef.current) textRef.current.scrollTop = 0;
  }, [line.text]);

  const hasMoreText = useCallback((): boolean => {
    const el = textRef.current;
    if (!el) return false;
    return el.scrollTop + el.clientHeight < el.scrollHeight - 6;
  }, []);

  const scrollNextPage = useCallback((): void => {
    const el = textRef.current;
    if (el) {
      el.scrollBy({ top: el.clientHeight, behavior: 'smooth' });
      setPageIndex((p: number) => p + 1);
    }
  }, []);

  // Tự động chuyển câu trong chế độ Auto hoặc Skip; tạm dừng khi có lớp phủ (hồ sơ, lịch sử, giới thiệu nhân vật…).
  useEffect(() => {
    if (!isDone || !keyboardEnabled) return;
    if (skipping) {
      const timer = setTimeout(() => {
        if (hasMoreText()) {
          scrollNextPage();
        } else {
          advanceFromLine();
        }
      }, 80);
      return () => clearTimeout(timer);
    }
    if (autoMode) {
      const delay = Math.max(1400, line.text.length * 45);
      const timer = setTimeout(() => {
        if (hasMoreText()) {
          scrollNextPage();
        } else {
          advanceFromLine();
        }
      }, delay);
      return () => clearTimeout(timer);
    }
  }, [isDone, keyboardEnabled, autoMode, skipping, line.text.length, pageIndex, hasMoreText, scrollNextPage, advanceFromLine]);

  // Nút "Tiếp tục" (trong hay ngoài khung): cú bấm chủ ý, nhận ngay cú bấm đơn, chỉ bỏ cú bấm lặp của bấm đúp.
  const bamTiep = (e: ReactMouseEvent<HTMLButtonElement>): void => {
    e.stopPropagation();
    if (!guard.click(e, { immediate: true })) return;
    if (!isDone) {
      completeImmediately();
      return;
    }
    if (hasMoreText()) {
      scrollNextPage();
      return;
    }
    advanceFromLine();
  };

  const handleBoxClick = (e: { detail: number }) => {
    if (!guard.click(e)) return;
    if (!isDone) {
      completeImmediately();
      return;
    }
    if (hasMoreText()) {
      scrollNextPage();
      return;
    }
    advanceFromLine();
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
      if (!isDone) {
        completeImmediately();
        return;
      }
      if (hasMoreText()) {
        scrollNextPage();
        return;
      }
      advanceFromLine();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [guard, advanceFromLine, keyboardEnabled, isDone, completeImmediately, hasMoreText, scrollNextPage]);

  // Lùi lại câu trước: ← hoặc PageUp.
  useEffect(() => {
    if (!keyboardEnabled || !onBack) return;
    const onKey = (e: KeyboardEvent): void => {
      if (e.key !== 'ArrowLeft' && e.key !== 'PageUp') return;
      if (isTypingTarget(e.target)) return;
      e.preventDefault();
      onBack();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [keyboardEnabled, onBack]);

  return (
    <div className="dialog-container">
      {/* Thanh điều khiển nhanh trên desktop */}
      {display !== 'card' ? (
        <VnQuickButtons
          className="vn-quick-bar--desktop"
          autoMode={autoMode}
          toggleAutoMode={toggleAutoMode}
          skipMode={skipMode}
          toggleSkipMode={toggleSkipMode}
          alreadyRead={alreadyRead}
          onBack={onBack}
          onOpenBacklog={onOpenBacklog}
          onOpenSave={onOpenSave}
          onOpenLoad={onOpenLoad}
          toggleHideUi={toggleHideUi}
          onOpenAudio={onOpenAudio}
        />
      ) : null}

      <div
        ref={rootRef}
        className={display === 'card' ? 'dialog dialog--card' : 'dialog dialog--glass'}
        onClick={handleBoxClick}
        data-speaker={line.speaker}
      >
        {display === 'card' ? (
          <div className="dialog__card-decor" aria-hidden="true">
            <span className="dialog__card-line" />
            <span className="dialog__card-icon">✦</span>
            <span className="dialog__card-line" />
          </div>
        ) : null}
        {label ? (
          <div className="dialog__speaker">
            <svg className="dialog__speaker-icon" viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
              <path d="M17 8C8 10 5.9 16.17 3.82 21.34L5.71 22l1-2.3A4.49 4.49 0 0 0 8 20C19 20 22 3 22 3c-1 2-8 2.25-13 3.25S2 11.5 2 13.5s1.75 3.75 1.75 3.75C7 8 17 8 17 8z" />
            </svg>
            <span>{label}</span>
          </div>
        ) : null}
        <p ref={textRef} className={`dialog__text dialog__text--${dialogueFont}`}>
          <CodeText text={displayedText} />
        </p>
        {trongKhung ? (
          <button type="button" className={`dialog__tiep${isDone ? ' is-san-sang' : ''}`} aria-label="Tiếp tục" onKeyDown={guard.holdKey} onClick={bamTiep}>
            <span className="dialog__tiep-chu">Tiếp tục</span>
            <span className="dialog__tiep-tam-giac" aria-hidden="true" />
          </button>
        ) : null}
      </div>

      {/* Button Hồ sơ / QuickBar mobile và Tiếp tục nằm ngoài khung thoại */}
      <div className={`dialog__footer dialog__footer--external${display === 'card' ? ' dialog__footer--card' : ''}${trongKhung ? ' dialog__footer--trong-khung' : ''}`}>
        <div className="dialog__footer-left">
          {display !== 'card' && onOpenNotebook ? (
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

          {/* Trên màn hình dọc: thanh quick bar dưới hộp thoại. Lưu / Nạp / Cài đặt đã có trong menu ≡ của thanh trên nên
              bỏ ở đây — năm nút còn lại vừa một hàng 360 px, khỏi phải vuốt ngang. */}
          {display !== 'card' ? (
            <VnQuickButtons
              className="vn-quick-bar--mobile"
              autoMode={autoMode}
              toggleAutoMode={toggleAutoMode}
              skipMode={skipMode}
              toggleSkipMode={toggleSkipMode}
              alreadyRead={alreadyRead}
              onBack={onBack}
              onOpenBacklog={onOpenBacklog}
              toggleHideUi={toggleHideUi}
            />
          ) : null}
        </div>
        {hint ? <span className="dialog__hint">{hint}</span> : null}
        <div className="dialog__footer-right">
          {trongKhung ? null : (
            <button type="button" className="dialog__next" aria-label="Tiếp tục" onKeyDown={guard.holdKey} onClick={bamTiep}>
              <span className="dialog__next-text">Tiếp tục</span>
              <span className="dialog__next-arrow" aria-hidden="true">
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M13 6l6 6-6 6" />
                </svg>
              </span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
