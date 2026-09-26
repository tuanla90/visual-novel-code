import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useGameStore } from '../shared/store';
import { initialGameData } from '../shared/store/store';
import { configureSessionMeta, getSessionMeta } from '../shared/telemetry/session-meta';
import { clearTelemetry, getSessionId, getTelemetryEvents } from '../shared/telemetry/track';
import { TopBar } from '../shared/ui/TopBar';
import { FacilitatorPanel } from './FacilitatorPanel';

describe('notebook_opened (QĐ-044)', () => {
  beforeEach(() => clearTelemetry());

  it('ghi khi MỞ Hồ sơ kèm phần hiện tại; không ghi khi đóng', async () => {
    const props = {
      currentPart: 'analysis' as const,
      completedParts: [],
      task: null,
      notebookCount: 2,
      onToggleNotebook: () => {},
      onReset: () => {},
      isSample: false,
    };
    const { rerender } = render(<TopBar {...props} notebookOpen={false} />);
    await userEvent.click(screen.getByRole('button', { name: 'Mở hồ sơ vật chứng' }));
    rerender(<TopBar {...props} notebookOpen />);
    await userEvent.click(screen.getByRole('button', { name: 'Đóng hồ sơ vật chứng' }));
    const opened = getTelemetryEvents().filter((e) => e.type === 'notebook_opened');
    expect(opened).toHaveLength(1);
    expect(opened[0]).toMatchObject({ type: 'notebook_opened', part: 'analysis' });
  });
});

describe('nút nhảy phần trong bảng người quan sát', () => {
  beforeEach(() => {
    sessionStorage.clear();
    useGameStore.setState(initialGameData());
    clearTelemetry();
    configureSessionMeta(null);
  });

  it('trên màn tiêu đề: không có nút nhảy, nói rõ lý do', async () => {
    render(<FacilitatorPanel part={null} sequenceId={null} nodeIndex={null} viewKind="title" eventCount={0} onReset={() => {}} />);
    await userEvent.click(screen.getByRole('button', { name: 'Mở bảng' }));
    expect(screen.getByText(/rồi mới nhảy phần được/)).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: '1. Mở đầu' })).toBeNull();
  });

  it('trong game: xác nhận rồi nhảy, phiên mới được đánh dấu, báo kết quả', async () => {
    useGameStore.getState().startGame();
    const p = useGameStore.getState().progress!;
    render(
      <FacilitatorPanel part={p.currentPart} sequenceId={p.cursor.sequenceId} nodeIndex={p.cursor.nodeIndex} viewKind="line" eventCount={0} onReset={() => {}} />,
    );
    await userEvent.click(screen.getByRole('button', { name: 'Mở bảng' }));
    await userEvent.click(screen.getByRole('button', { name: '1. Mở đầu' }));
    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toHaveTextContent('Tiến độ hiện tại bị xóa');
    await userEvent.click(within(dialog).getByRole('button', { name: 'Nhảy tới đó' }));
    await waitFor(() => expect(screen.getByRole('status')).toHaveTextContent('Đã tới đầu Phần 1 — Mở đầu'));
    expect(getSessionMeta()[getSessionId()]?.jumps[0]).toMatchObject({ target: 'intro', ok: true });
    expect(useGameStore.getState().progress?.currentPart).toBe('intro');
  });
});
