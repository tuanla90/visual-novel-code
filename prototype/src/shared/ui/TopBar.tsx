/**
 * Thanh trên cùng (QĐ-027): tiến trình 5 phần, "Nhiệm vụ hiện tại", nút "Hồ sơ",
 * menu "Chơi lại từ đầu" có xác nhận.
 */
import { useState } from 'react';
import { partName } from '../display-names';
import { PART_IDS, type PartId } from '../ids';
import { track } from '../telemetry/track';
import { ConfirmDialog } from './ConfirmDialog';

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
  return (
    <header className="topbar">
      <div className="topbar__chapter" aria-label={`Tiến trình: ${completedParts.length} trên ${PART_IDS.length} phần hoàn thành`}>
        <span className="topbar__chapter-count">{currentIndex >= 0 ? `${currentIndex + 1}/${PART_IDS.length}` : `0/${PART_IDS.length}`}</span>
        <span className="topbar__chapter-name">{currentPart ? partName(currentPart) : 'Mở đầu'}</span>
      </div>
      <div className="topbar__task" aria-live="polite">
        <span className="topbar__task-label">Mục tiêu</span>
        <span className="topbar__task-text" title={task ?? undefined}>
          {task ?? 'Chưa có nhiệm vụ'}
        </span>
      </div>
      <div className="topbar__actions">
        {isSample ? <span className="badge badge--sample">NỘI DUNG MẪU</span> : null}

        {onOpenMap ? (
          <button
            type="button"
            className="topbar__dossier"
            aria-label="Mở bản đồ trường"
            title="Bản đồ khuôn viên Đại học Hoa Phượng"
            onClick={onOpenMap}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="2">
              <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
              <line x1="8" y1="2" x2="8" y2="18" />
              <line x1="16" y1="6" x2="16" y2="22" />
            </svg>
            <span>Bản đồ</span>
          </button>
        ) : null}

        <button
          type="button"
          className="topbar__dossier"
          aria-pressed={notebookOpen}
          aria-label={notebookOpen ? 'Đóng hồ sơ vật chứng' : 'Mở hồ sơ vật chứng'}
          title={notebookOpen ? 'Đóng hồ sơ vật chứng' : 'Mở hồ sơ vật chứng'}
          onClick={() => {
            // QĐ-044: ghi khi MỞ Hồ sơ (kèm phần hiện tại), không ghi khi đóng.
            if (!notebookOpen) track({ type: 'notebook_opened', part: currentPart });
            onToggleNotebook();
          }}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5h5l1.5 2H20v11H4z" /></svg>
          <span>Hồ sơ</span>
          <span className="topbar__dossier-count" aria-label={`${notebookCount} vật chứng`}>{notebookCount}</span>
        </button>
        <details className="topbar__menu" role="presentation">
          <summary
            className="topbar__menu-trigger"
            aria-label="Mở menu tạm dừng"
            title="Menu"
          >
            <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 7h14M5 12h14M5 17h14" /></svg>
          </summary>
          <div className="topbar__menu-panel">
            <strong>Tùy chọn Game</strong>
            {onOpenSave ? (
              <button
                type="button"
                onClick={(e) => {
                  e.currentTarget.closest('details')?.removeAttribute('open');
                  onOpenSave();
                }}
              >
                Lưu tiến độ (Save)
              </button>
            ) : null}
            {onOpenLoad ? (
              <button
                type="button"
                onClick={(e) => {
                  e.currentTarget.closest('details')?.removeAttribute('open');
                  onOpenLoad();
                }}
              >
                Nạp tiến độ (Load)
              </button>
            ) : null}
            {onOpenAudio ? (
              <button
                type="button"
                onClick={(e) => {
                  e.currentTarget.closest('details')?.removeAttribute('open');
                  onOpenAudio();
                }}
              >
                Cài đặt (tốc độ chữ, âm thanh)
              </button>
            ) : null}
            <button
              type="button"
              style={{ color: '#ef4444' }}
              onClick={(e) => {
                e.currentTarget.closest('details')?.removeAttribute('open');
                setConfirmOpen(true);
              }}
            >
              Chơi lại từ đầu
            </button>
          </div>
        </details>
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
