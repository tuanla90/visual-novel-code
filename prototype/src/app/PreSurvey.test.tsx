import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { useGameStore } from '../shared/store';
import { initialGameData } from '../shared/store/store';
import { isClosedPreAnswers } from '../shared/telemetry/survey';
import { clearTelemetry, getSessionId, getTelemetryEvents } from '../shared/telemetry/track';
import App from './App';

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

  it('"Bắt đầu lại" khi có tiến độ: khảo sát rơi vào PHIÊN MỚI, không vào phiên cũ', async () => {
    useGameStore.getState().startGame();
    useGameStore.getState().skipSurvey('pre');
    const oldSession = getSessionId();
    render(<App />);
    expect(screen.getByText('Bạn đã bỏ qua khảo sát đầu game.')).toBeInTheDocument();
    await userEvent.click(screen.getByRole('button', { name: 'Bắt đầu lại' }));
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
