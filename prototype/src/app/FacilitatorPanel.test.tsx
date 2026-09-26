import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { createLocalStorageSink } from '../shared/telemetry/local-sink';
import { FakeStorage, quotaError } from '../shared/telemetry/test-storage';
import { clearTelemetry, configureTelemetry, createMemorySink, getTelemetryEvents, track } from '../shared/telemetry/track';
import { FacilitatorPanel } from './FacilitatorPanel';
import { storageMessage } from './facilitator-mode';

const baseProps = {
  part: 'investigation' as const,
  sequenceId: 'inv-01',
  nodeIndex: 3,
  viewKind: 'explore',
  eventCount: 0,
  onReset: () => {},
};

async function openPanel() {
  await userEvent.click(screen.getByRole('button', { name: 'Mở bảng' }));
}

describe('bảng người quan sát', () => {
  let blobs: Blob[];
  let downloads: string[];
  beforeEach(() => {
    configureTelemetry({ sink: createMemorySink(), sessionIdStore: null });
    clearTelemetry();
    blobs = [];
    downloads = [];
    URL.createObjectURL = vi.fn((b: Blob) => {
      blobs.push(b);
      return 'blob:thu';
    }) as typeof URL.createObjectURL;
    URL.revokeObjectURL = vi.fn();
    vi.spyOn(HTMLAnchorElement.prototype, 'click').mockImplementation(function (this: HTMLAnchorElement) {
      downloads.push(this.download);
    });
  });
  afterEach(() => {
    vi.restoreAllMocks();
    configureTelemetry({ sink: createMemorySink(), sessionIdStore: null });
  });

  it('thu gọn mặc định: dòng tóm tắt vị trí; mở ra thấy phần/chuỗi/node/màn kèm nhãn dễ đọc', async () => {
    render(<FacilitatorPanel {...baseProps} />);
    expect(screen.getByText(/Điều tra · Xem xét · 0 sự kiện/)).toBeInTheDocument();
    await openPanel();
    const panel = screen.getByRole('complementary', { name: 'Bảng người quan sát' });
    expect(within(panel).getByText('Điều tra (investigation)')).toBeInTheDocument();
    expect(within(panel).getByText('inv-01')).toBeInTheDocument();
    expect(within(panel).getByText('Xem xét (explore)')).toBeInTheDocument();
    expect(within(panel).getByText('Chưa có phiên nào trong trình duyệt này.')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Thu gọn bảng' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('xuất JSON: tên tệp theo ngày + số phiên, nội dung có mọi phiên', async () => {
    track({ type: 'game_start' });
    render(<FacilitatorPanel {...baseProps} />);
    await openPanel();
    await userEvent.click(screen.getByRole('button', { name: 'Xuất dữ liệu thử nghiệm (JSON)' }));
    expect(downloads).toHaveLength(1);
    expect(downloads[0]).toMatch(/^telemetry-\d{4}-\d{2}-\d{2}-1-phien\.json$/);
    const data = JSON.parse(await blobs[0]!.text()) as { sessionCount: number; storageVersion: number; sessions: { events: unknown[] }[] };
    expect(data.sessionCount).toBe(1);
    expect(data.storageVersion).toBe(1);
    expect(data.sessions[0]?.events).toHaveLength(1);
    expect(screen.getByRole('status')).toHaveTextContent(downloads[0]!);
  });

  it('xóa dữ liệu cần xác nhận; hủy thì giữ, xác nhận thì xóa', async () => {
    track({ type: 'game_start' });
    render(<FacilitatorPanel {...baseProps} />);
    await openPanel();
    await userEvent.click(screen.getByRole('button', { name: 'Xóa dữ liệu thử nghiệm' }));
    const dialog = screen.getByRole('alertdialog');
    expect(dialog).toHaveTextContent('Xóa 1 sự kiện của 1 phiên');
    await userEvent.click(within(dialog).getByRole('button', { name: 'Hủy' }));
    expect(getTelemetryEvents()).toHaveLength(1);
    await userEvent.click(screen.getByRole('button', { name: 'Xóa dữ liệu thử nghiệm' }));
    await userEvent.click(within(screen.getByRole('alertdialog')).getByRole('button', { name: 'Xóa dữ liệu' }));
    expect(getTelemetryEvents()).toHaveLength(0);
    expect(screen.getByText('Chưa có phiên nào trong trình duyệt này.')).toBeInTheDocument();
  });

  it('đặt lại phiên cần xác nhận rồi gọi onReset', async () => {
    const onReset = vi.fn();
    render(<FacilitatorPanel {...baseProps} onReset={onReset} />);
    await openPanel();
    await userEvent.click(screen.getByRole('button', { name: 'Đặt lại phiên' }));
    await userEvent.click(within(screen.getByRole('alertdialog')).getByRole('button', { name: 'Đặt lại phiên' }));
    expect(onReset).toHaveBeenCalledTimes(1);
  });

  it('vẽ lại khi có sự kiện mới (không cần props đổi)', async () => {
    render(<FacilitatorPanel {...baseProps} />);
    expect(screen.getByText(/0 sự kiện/)).toBeInTheDocument();
    await act(async () => {
      track({ type: 'game_start' });
      await Promise.resolve();
    });
    expect(screen.getByText(/· 1 sự kiện/)).toBeInTheDocument();
  });

  it('bộ nhớ đầy: bảng báo lỗi lưu theo lý do thật', async () => {
    const local = new FakeStorage();
    local.failWith = quotaError();
    configureTelemetry({ sink: createLocalStorageSink({ storage: local }) });
    track({ type: 'game_start' });
    render(<FacilitatorPanel {...baseProps} />);
    await openPanel();
    expect(screen.getByRole('alert')).toHaveTextContent('Bộ nhớ trình duyệt đã đầy');
  });

  it('câu trạng thái lưu khác nhau theo từng lý do', () => {
    const base = { persistent: false, unreadableSessions: 0, droppedEvents: 0, usedChars: 0, maxChars: 100 };
    const texts = (['unavailable', 'quota', 'budget', 'write-failed'] as const).map((problem) => storageMessage({ ...base, problem }).text);
    expect(new Set(texts).size).toBe(4);
    expect(storageMessage({ ...base, persistent: true, problem: null }).tone).toBe('ok');
    expect(storageMessage({ ...base, persistent: true, problem: null, usedChars: 90 }).tone).toBe('warn');
    expect(storageMessage(null).text).toMatch(/bộ nhớ của tab/);
  });

  it('tóm tắt §10 của phiên hiện tại: lựa chọn đầu kèm nhãn dễ đọc, khảo sát, thử thách', async () => {
    track({ type: 'survey_submitted', stage: 'pre', answers: { excelLevel: 'confident', sqlBefore: 'some' } });
    track({ type: 'game_start' });
    track({ type: 'challenge_start', challengeId: 'c1' });
    track({ type: 'first_run', challengeId: 'c1', msSinceStart: 45_000 });
    track({
      type: 'query_run',
      challengeId: 'c1',
      mode: 'builder',
      attempt: 1,
      rowCount: 10,
      status: 'correct',
      primaryCode: null,
      errorClass: null,
      connector: null,
      msSinceStart: 45_000,
    });
    track({ type: 'question_answered', questionId: 'q-two-rows', choiceId: 'tim-ra-roi', attempt: 1, correct: false, isFirstChoice: true });
    render(<FacilitatorPanel {...baseProps} />);
    await openPanel();
    expect(screen.getByRole('heading', { name: 'Tóm tắt chỉ số §10 theo phiên (1)' })).toBeInTheDocument();
    expect(screen.getByText(/Excel: Dùng thành thạo: hàm, lọc, pivot · SQL: Học qua một ít/)).toBeInTheDocument();
    const firstChoice = screen.getByText('tim-ra-roi').closest('dd');
    expect(firstChoice).toHaveTextContent('Sai · tim-ra-roi — Tìm ra rồi');
    expect(screen.getByRole('row', { name: /\(c1\)/ })).toHaveTextContent('45 giây');
  });

  it('xuất JSON kèm tóm tắt và ghi chú phiên', async () => {
    track({ type: 'game_start' });
    render(<FacilitatorPanel {...baseProps} />);
    await openPanel();
    await userEvent.click(screen.getByRole('button', { name: 'Xuất dữ liệu thử nghiệm (JSON)' }));
    const data = JSON.parse(await blobs[0]!.text()) as { summaries: { sessionId: string; started: boolean }[]; sessionMeta: object };
    expect(data.summaries).toHaveLength(1);
    expect(data.summaries[0]?.started).toBe(true);
    expect(data.sessionMeta).toEqual({});
  });
});
