/**
 * Thanh trên cùng (QĐ-027): tiến trình 5 phần, "Nhiệm vụ hiện tại", nút "Hồ sơ",
 * menu "Chơi lại từ đầu" có xác nhận.
 */
import { useState } from 'react';
import { partName } from '../display-names';
import { PART_IDS, type PartId } from '../ids';
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
}

export function TopBar({ currentPart, completedParts, task, notebookCount, notebookOpen, onToggleNotebook, onReset, isSample }: TopBarProps) {
  const [confirmOpen, setConfirmOpen] = useState(false);
  return (
    <header className="topbar">
      <ol className="topbar__parts" aria-label="Tiến trình 5 phần">
        {PART_IDS.map((p, i) => {
          const state = p === currentPart ? 'current' : completedParts.includes(p) ? 'done' : 'todo';
          return (
            <li key={p} className={`topbar__part topbar__part--${state}`} aria-current={state === 'current' ? 'step' : undefined}>
              <span className="topbar__part-index">{i + 1}</span>
              <span className="topbar__part-name">{partName(p)}</span>
            </li>
          );
        })}
      </ol>
      <div className="topbar__task" aria-live="polite">
        <span className="topbar__task-label">Nhiệm vụ hiện tại:</span>{' '}
        <span className="topbar__task-text">{task ?? 'Chưa có nhiệm vụ'}</span>
      </div>
      <div className="topbar__actions">
        {isSample ? <span className="badge badge--sample">NỘI DUNG MẪU</span> : null}
        <button
          type="button"
          className="btn btn--topbar"
          aria-pressed={notebookOpen}
          aria-label={notebookOpen ? 'Đóng hồ sơ vật chứng' : 'Mở hồ sơ vật chứng'}
          title={notebookOpen ? 'Đóng hồ sơ vật chứng' : 'Mở hồ sơ vật chứng'}
          onClick={onToggleNotebook}
        >
          Hồ sơ ({notebookCount})
        </button>
        <button type="button" className="btn btn--topbar" onClick={() => setConfirmOpen(true)}>
          Chơi lại từ đầu
        </button>
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
