import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useGameStore } from '../shared/store';
import { initialGameData } from '../shared/store/store';
import { isClosedPreAnswers } from '../shared/telemetry/survey';
import { clearTelemetry, getSessionId, getTelemetryEvents } from '../shared/telemetry/track';
import App from './App';

// Game mặc định vào thẳng MVP; màn tiêu đề và khảo sát của prototype mở bằng `?prototype=1` (App đọc lúc nạp module).
vi.hoisted(() => window.history.replaceState(null, '', '/?prototype=1'));

const surveyEvents = () => getTelemetryEvents().filter((e) => e.type === 'survey_submitted' || e.type === 'survey_skipped');

describe('khảo sát đầu game trên màn tiêu đề (QĐ-031)', () => {
  beforeEach(() => {
    sessionStorage.clear();
    useGameStore.setState(initialGameData());
    clearTelemetry();
  });

  it('trả lời đủ hai câu rồi bấm Bắt đầu → survey_submitted (chỉ giá trị đóng), trước game_start', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('radio', { name: 'Dùng cơ bản' }));
    await userEvent.click(screen.getByRole('radio', { name: 'Chưa học' }));
    await userEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }));
    const evs = surveyEvents();
    expect(evs).toHaveLength(1);
    const e = evs[0]!;
    expect(e).toMatchObject({ type: 'survey_submitted', stage: 'pre', answers: { excelLevel: 'basic', sqlBefore: 'no' } });
    expect(e.type === 'survey_submitted' && isClosedPreAnswers(e.answers)).toBe(true);
    const types = getTelemetryEvents().map((x) => x.type);
    expect(types.indexOf('survey_submitted')).toBeLessThan(types.indexOf('game_start'));
    expect(useGameStore.getState().survey.pre).toEqual({ excelLevel: 'basic', sqlBefore: 'no' });
  });

  it('bấm "Bỏ qua khảo sát" rồi Bắt đầu → survey_skipped pre', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('radio', { name: 'Dùng thành thạo: hàm, lọc, pivot' }));
    await userEvent.click(screen.getByRole('button', { name: 'Bỏ qua khảo sát' }));
    expect(screen.getByText(/Bạn đã bỏ qua khảo sát/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }));
    expect(surveyEvents().map((e) => [e.type, e.stage])).toEqual([['survey_skipped', 'pre']]);
  });

  it('bắt đầu mà chưa trả lời đủ → ghi là bỏ qua (không có câu trả lời nửa vời)', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('radio', { name: 'Chưa dùng' }));
    await userEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }));
    expect(surveyEvents().map((e) => e.type)).toEqual(['survey_skipped']);
  });

  it('"Trả lời khảo sát" sau khi bỏ qua đưa câu hỏi trở lại', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: 'Bỏ qua khảo sát' }));
    await userEvent.click(screen.getByRole('button', { name: 'Trả lời khảo sát' }));
    expect(screen.getByRole('radio', { name: 'Học và dùng được' })).toBeInTheDocument();
  });

  it('không có ô chữ tự do: chỉ nút chọn', () => {
    const { container } = render(<App />);
    expect(screen.queryAllByRole('textbox')).toEqual([]);
    expect(container.querySelectorAll('textarea, input:not([type="radio"]), [contenteditable]')).toHaveLength(0);
    expect(screen.getAllByRole('radio')).toHaveLength(6);
  });

  it('"Bắt đầu" khi chưa có tiến độ: không hỏi xác nhận', async () => {
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }));
    expect(screen.queryByRole('alertdialog')).toBeNull();
    expect(useGameStore.getState().progress).not.toBeNull();
  });

  it('"Bắt đầu lại" khi có tiến độ: hỏi xác nhận nói rõ hậu quả; Hủy → tiến độ, phiên, sự kiện giữ nguyên', async () => {
    useGameStore.getState().startGame();
    useGameStore.getState().submitSurvey('pre', { excelLevel: 'basic', sqlBefore: 'no' });
    const oldSession = getSessionId();
    const oldProgress = useGameStore.getState().progress;
    const oldCount = getTelemetryEvents().length;
    render(<App />);
    await userEvent.click(screen.getByRole('button', { name: 'Bắt đầu lại' }));
    const dialog = screen.getByRole('alertdialog');
    expect(within(dialog).getByText(/sẽ bị xóa/)).toBeInTheDocument();
    expect(within(dialog).getByText(/khảo sát đầu game được giữ/)).toBeInTheDocument();
    await userEvent.click(within(dialog).getByRole('button', { name: 'Hủy' }));
    expect(screen.queryByRole('alertdialog')).toBeNull();
    expect(useGameStore.getState().progress).toBe(oldProgress);
    expect(getSessionId()).toBe(oldSession);
    expect(getTelemetryEvents()).toHaveLength(oldCount);
    // Vẫn ở màn tiêu đề với hai nút.
    expect(screen.getByRole('button', { name: 'Chơi tiếp' })).toBeInTheDocument();
  });

  it('"Bắt đầu lại" sau khi ĐÃ TRẢ LỜI khảo sát ở phiên cũ → phiên mới ghi lại đúng câu trả lời, KHÔNG có survey_skipped giả', async () => {
    useGameStore.getState().startGame();
    const freshCursor = structuredClone(useGameStore.getState().progress?.cursor);
    useGameStore.getState().dispatchStory({ type: 'advance' });
    useGameStore.getState().dispatchStory({ type: 'advance' });
    expect(useGameStore.getState().progress?.cursor).not.toEqual(freshCursor);
    useGameStore.getState().submitSurvey('pre', { excelLevel: 'confident', sqlBefore: 'some' });
    const oldSession = getSessionId();
    render(<App />);
    expect(screen.getByText('Bạn đã trả lời khảo sát đầu game. Cảm ơn bạn!')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Bắt đầu lại' }));
    await userEvent.click(within(screen.getByRole('alertdialog')).getByRole('button', { name: 'Xóa và bắt đầu lại' }));
    const newSession = getSessionId();
    expect(newSession).not.toBe(oldSession);
    const inNew = getTelemetryEvents().filter((e) => e.sessionId === newSession);
    expect(inNew.map((e) => e.type).filter((t) => t === 'survey_skipped')).toEqual([]);
    expect(inNew[0]).toMatchObject({ type: 'survey_submitted', stage: 'pre', answers: { excelLevel: 'confident', sqlBefore: 'some' } });
    expect(inNew.map((e) => e.type)).toContain('game_start');
    expect(useGameStore.getState().survey.pre).toEqual({ excelLevel: 'confident', sqlBefore: 'some' });
    // Phiên cũ: đúng một lần trả lời, không thêm gì.
    expect(surveyEvents().filter((e) => e.sessionId === oldSession)).toHaveLength(1);
    // Con trỏ về đầu game (tiến độ cũ đã xóa).
    expect(useGameStore.getState().progress?.cursor).toEqual(freshCursor);
  });

  it('"Bắt đầu lại" khi có tiến độ (khảo sát cũ đã bỏ qua): khảo sát rơi vào PHIÊN MỚI, không vào phiên cũ', async () => {
    useGameStore.getState().startGame();
    useGameStore.getState().skipSurvey('pre');
    const oldSession = getSessionId();
    render(<App />);
    expect(screen.getByText('Bạn đã bỏ qua khảo sát đầu game.')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Bắt đầu lại' }));
    await userEvent.click(within(screen.getByRole('alertdialog')).getByRole('button', { name: 'Xóa và bắt đầu lại' }));
    const newSession = getSessionId();
    expect(newSession).not.toBe(oldSession);
    const inNew = getTelemetryEvents().filter((e) => e.sessionId === newSession).map((e) => e.type);
    expect(inNew[0]).toBe('survey_skipped');
    expect(inNew).toContain('game_start');
    const inOld = getTelemetryEvents().filter((e) => e.sessionId === oldSession).map((e) => e.type);
    expect(inOld.filter((t) => t === 'survey_skipped')).toHaveLength(1);
  });

  it('"Chơi tiếp" không hỏi lại khi phiên đã có khảo sát', async () => {
    useGameStore.getState().startGame();
    useGameStore.getState().submitSurvey('pre', { excelLevel: 'none', sqlBefore: 'no' });
    render(<App />);
    expect(screen.queryAllByRole('radio')).toEqual([]);
    await userEvent.click(screen.getByRole('button', { name: 'Chơi tiếp' }));
    expect(surveyEvents()).toHaveLength(1);
  });
});
