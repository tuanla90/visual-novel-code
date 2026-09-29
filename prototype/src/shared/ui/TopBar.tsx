/**
 * Thanh trên cùng (QĐ-027): tiến trình 5 phần, "Nhiệm vụ hiện tại", nút "Hồ sơ",
 * menu "Chơi lại từ đầu" có xác nhận.
 */
import { useState } from 'react';
import { partName } from '../display-names';
import { PART_IDS, type PartId } from '../ids';
import { track } from '../telemetry/track';
import { ConfirmDialog } from './ConfirmDialog';
import { IconSave, IconFolderOpen, IconSliders, IconRotateCcw } from './icons';
import { useVnStore } from '../vn/vn-store';

export interface TopBarProps {
  currentPart: PartId | null;
  completedParts: PartId[];
  task: string | null;
  notebookCount: number;
  notebookOpen: boolean;
  onToggleNotebook: () => void;
  onReset: () => void;
  isSample: boolean;
  onOpenMap?: () => void;
  onOpenAudio?: () => void;
  onOpenSave?: () => void;
  onOpenLoad?: () => void;
}

export function TopBar({
  currentPart,
  completedParts,
  task,
  notebookCount,
  notebookOpen,
  onToggleNotebook,
  onReset,
  isSample,
  onOpenMap,
  onOpenAudio,
  onOpenSave,
  onOpenLoad,
}: TopBarProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const currentIndex = currentPart ? PART_IDS.indexOf(currentPart) : -1;
  const viewportMode = useVnStore((s) => s.viewportMode);
  const toggleViewportMode = useVnStore((s) => s.toggleViewportMode);
  return (
    <header className="topbar">
      <div className="topbar__chapter" aria-label={`Tiến trình: ${completedParts.length} trên ${PART_IDS.length} phần hoàn thành`}>
        <span className="topbar__chapter-count">
          <span className="topbar__chapter-kicker" aria-hidden="true">Phần</span>
          <span className="topbar__chapter-number">{currentIndex >= 0 ? `${currentIndex + 1}/${PART_IDS.length}` : `0/${PART_IDS.length}`}</span>
        </span>
        <span className="topbar__chapter-info">
          <span className="topbar__chapter-name">{currentPart ? partName(currentPart) : 'Mở đầu'}</span>
          <span className="topbar__pips" aria-hidden="true">
            {PART_IDS.map((part, i) => (
              <span
                key={part}
                className={`topbar__pip${completedParts.includes(part) ? ' is-done' : ''}${i === currentIndex ? ' is-current' : ''}`}
                title={partName(part)}
              />
            ))}
          </span>
        </span>
      </div>
      <div className="topbar__task" aria-live="polite">
        <svg className="topbar__task-icon" viewBox="0 0 24 24" aria-hidden="true">
          <circle cx="12" cy="12" r="7" stroke="currentColor" strokeWidth="1.8" fill="none" />
          <circle cx="12" cy="12" r="2.5" fill="currentColor" />
          <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          <polygon points="12,0.5 13.5,2 12,3.5 10.5,2" fill="currentColor" />
          <polygon points="12,20.5 13.5,22 12,23.5 10.5,22" fill="currentColor" />
          <polygon points="0.5,12 2,10.5 3.5,12 2,13.5" fill="currentColor" />
          <polygon points="20.5,12 22,10.5 23.5,12 22,13.5" fill="currentColor" />
        </svg>
        <div className="topbar__task-content">
          <span className="topbar__task-label">Mục tiêu</span>
          <span className="topbar__task-text" title={task ?? undefined}>
            {task ?? 'Chưa có nhiệm vụ'}
          </span>
        </div>
      </div>
      <div className="topbar__actions">
        {isSample ? <span className="badge badge--sample">NỘI DUNG MẪU</span> : null}

        {/* Nhóm button con nhộng liền mạch theo đúng Asset mẫu */}
        <div className="topbar__capsule-group">
          <button
            type="button"
            className={`topbar__capsule-btn topbar__capsule-btn--viewport${viewportMode === 'mobile' ? ' is-active' : ''}`}
            aria-label={viewportMode === 'mobile' ? 'Chuyển sang màn hình ngang PC' : 'Chuyển sang màn hình dọc Mobile 9:16'}
            title={viewportMode === 'mobile' ? 'Chuyển sang màn hình ngang PC' : 'Chuyển sang màn hình dọc Mobile 9:16'}
            onClick={toggleViewportMode}
          >
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
              <line x1="12" y1="18" x2="12.01" y2="18" />
            </svg>
            <span className="topbar__capsule-text-responsive">{viewportMode === 'mobile' ? 'Dọc' : 'Dọc/Ngang'}</span>
          </button>

          {onOpenMap ? (
            <button
              type="button"
              className="topbar__capsule-btn topbar__capsule-btn--map"
              aria-label="Mở bản đồ trường"
              title="Bản đồ khuôn viên Đại học Hoa Phượng"
              onClick={onOpenMap}
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
                <line x1="8" y1="2" x2="8" y2="18" />
                <line x1="16" y1="6" x2="16" y2="22" />
              </svg>
              <span>Bản đồ</span>
            </button>
          ) : null}

          <button
            type="button"
            className="topbar__capsule-btn topbar__capsule-btn--dossier"
            aria-pressed={notebookOpen}
            aria-label={notebookOpen ? 'Đóng hồ sơ vật chứng' : 'Mở hồ sơ vật chứng'}
            title={notebookOpen ? 'Đóng hồ sơ vật chứng' : 'Mở hồ sơ vật chứng'}
            onClick={() => {
              // QĐ-044: ghi khi MỞ Hồ sơ (kèm phần hiện tại), không ghi khi đóng.
              if (!notebookOpen) track({ type: 'notebook_opened', part: currentPart });
              onToggleNotebook();
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 5.5h5l1.5 2H20v11H4z" />
            </svg>
            <span>Hồ sơ</span>
            <span className="topbar__dossier-count" aria-label={`${notebookCount} vật chứng`}>{notebookCount}</span>
          </button>

          <details className="topbar__menu topbar__capsule-menu" role="presentation">
            <summary
              className="topbar__capsule-btn topbar__capsule-btn--menu topbar__menu-trigger"
              aria-label="Mở menu tạm dừng"
              title="Menu"
            >
              <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            </summary>
            <div className="topbar__menu-panel">
              <span className="topbar__menu-title">TÙY CHỌN HỆ THỐNG</span>
              <button
                type="button"
                className="topbar__menu-item"
                onClick={(e) => {
                  e.currentTarget.closest('details')?.removeAttribute('open');
                  toggleViewportMode();
                }}
              >
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                <span>{viewportMode === 'mobile' ? 'Màn hình Ngang (PC)' : 'Màn hình Dọc (Mobile)'}</span>
              </button>
              {onOpenSave ? (
                <button
                  type="button"
                  className="topbar__menu-item"
                  onClick={(e) => {
                    e.currentTarget.closest('details')?.removeAttribute('open');
                    onOpenSave();
                  }}
                >
                  <IconSave width={16} height={16} />
                  <span>Lưu tiến độ (Save)</span>
                </button>
              ) : null}
              {onOpenLoad ? (
                <button
                  type="button"
                  className="topbar__menu-item"
                  onClick={(e) => {
                    e.currentTarget.closest('details')?.removeAttribute('open');
                    onOpenLoad();
                  }}
                >
                  <IconFolderOpen width={16} height={16} />
                  <span>Nạp tiến độ (Load)</span>
                </button>
              ) : null}
              {onOpenAudio ? (
                <button
                  type="button"
                  className="topbar__menu-item"
                  onClick={(e) => {
                    e.currentTarget.closest('details')?.removeAttribute('open');
                    onOpenAudio();
                  }}
                >
                  <IconSliders width={16} height={16} />
                  <span>Cài đặt (tốc độ chữ, âm thanh)</span>
                </button>
              ) : null}
              <button
                type="button"
                className="topbar__menu-item topbar__menu-item--danger"
                onClick={(e) => {
                  e.currentTarget.closest('details')?.removeAttribute('open');
                  setConfirmOpen(true);
                }}
              >
                <IconRotateCcw width={16} height={16} />
                <span>Chơi lại từ đầu</span>
              </button>
            </div>
          </details>
        </div>
      </div>
      <ConfirmDialog
        open={confirmOpen}
        title="Chơi lại từ đầu?"
        message="Toàn bộ tiến độ, hồ sơ và truy vấn của phiên này sẽ bị xóa. Không thể hoàn tác."
        confirmLabel="Xóa và chơi lại"
        onConfirm={() => {
          setConfirmOpen(false);
          onReset();
        }}
        onCancel={() => setConfirmOpen(false)}
      />
    </header>
  );
}
