import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { sampleContent } from '../content/sample';
import { createGameStore } from '../shared/store/store';
import type { PostSurveyAnswers } from '../shared/telemetry/events';
import { isClosedPostAnswers } from '../shared/telemetry/survey';
import { clearTelemetry, getTelemetryEvents } from '../shared/telemetry/track';
import { EndScreen } from './EndScreen';

function setup(surveyDone = false) {
  const props = { onSubmitSurvey: vi.fn(), onSkipSurvey: vi.fn(), onReplay: vi.fn(), surveyDone };
  const utils = render(<EndScreen {...props} />);
  return { ...utils, props };
}

describe('màn kết + khảo sát cuối game (QĐ-031, QĐ-042)', () => {
  beforeEach(() => clearTelemetry());

  it('chọn tối đa 2 phần đáng nhớ: phần thứ 3 bị khóa', async () => {
    setup();
    await userEvent.click(screen.getByRole('checkbox', { name: 'Màn phản bác Quân' }));
    await userEvent.click(screen.getByRole('checkbox', { name: 'Tự tạo truy vấn' }));
    expect(screen.getByRole('checkbox', { name: 'Tìm manh mối' })).toBeDisabled();
    expect(screen.getByText(/Đã chọn đủ 2 phần/)).toBeInTheDocument();
    await userEvent.click(screen.getByRole('checkbox', { name: 'Tự tạo truy vấn' }));
    expect(screen.getByRole('checkbox', { name: 'Tìm manh mối' })).toBeEnabled();
  });

  it('gửi: đúng câu trả lời, chỉ giá trị đóng; "Không có" → annoying null', async () => {
    const { props } = setup();
    expect(screen.getByRole('button', { name: 'Gửi câu trả lời' })).toBeDisabled();
    await userEvent.click(screen.getByRole('checkbox', { name: 'Màn phản bác Quân' }));
    await userEvent.click(screen.getByRole('checkbox', { name: 'Cú lật: xác minh bằng nguồn độc lập' }));
    await userEvent.click(screen.getByRole('radio', { name: 'Không có' }));
    await userEvent.click(screen.getByRole('radio', { name: 'Có thể' }));
    await userEvent.click(screen.getByRole('button', { name: 'Gửi câu trả lời' }));
    const answers = props.onSubmitSurvey.mock.calls[0]?.[0] as PostSurveyAnswers;
    expect(answers).toEqual({ memorable: ['rebut-quan', 'independent-source'], annoying: null, playNext: 'maybe' });
    expect(isClosedPostAnswers(answers)).toBe(true);
  });

  it('đoạn gây khó chịu chọn một phần → ghi id phần đó', async () => {
    const { props } = setup();
    await userEvent.click(screen.getByRole('radio', { name: 'Tự tạo truy vấn' }));
    await userEvent.click(screen.getByRole('radio', { name: 'Không' }));
    await userEvent.click(screen.getByRole('button', { name: 'Gửi câu trả lời' }));
    expect(props.onSubmitSurvey).toHaveBeenCalledWith({ memorable: [], annoying: 'build-query', playNext: 'no' });
  });

  it('bỏ qua gọi onSkipSurvey; "Chơi lại" chỉ hiện sau khi gửi/bỏ qua, kèm lời cảm ơn', async () => {
    const { props, rerender } = setup();
    expect(screen.queryByRole('button', { name: 'Chơi lại từ đầu' })).toBeNull();
    await userEvent.click(screen.getByRole('button', { name: 'Bỏ qua khảo sát' }));
    expect(props.onSkipSurvey).toHaveBeenCalledTimes(1);
    rerender(<EndScreen {...props} surveyDone />);
    expect(screen.getByRole('status')).toHaveTextContent('Cảm ơn bạn đã chơi thử!');
    await userEvent.click(screen.getByRole('button', { name: 'Chơi lại từ đầu' }));
    expect(props.onReplay).toHaveBeenCalledTimes(1);
  });

  it('không có ô chữ tự do: chỉ ô chọn/nút chọn', () => {
    const { container } = setup();
    expect(screen.queryAllByRole('textbox')).toEqual([]);
    expect(container.querySelectorAll('textarea, input:not([type="radio"]):not([type="checkbox"]), [contenteditable]')).toHaveLength(0);
  });

  it('qua store: gửi ghi survey_submitted post; bỏ qua ghi survey_skipped post', async () => {
    const store = createGameStore({ content: sampleContent, persist: false });
    const s = store.getState;
    const { unmount } = render(
      <EndScreen onSubmitSurvey={s().submitPostSurvey} onSkipSurvey={() => s().skipSurvey('post')} onReplay={s().resetGame} surveyDone={false} />,
    );
    await userEvent.click(screen.getByRole('radio', { name: 'Có' }));
    await userEvent.click(screen.getByRole('button', { name: 'Gửi câu trả lời' }));
    unmount();
    render(<EndScreen onSubmitSurvey={s().submitPostSurvey} onSkipSurvey={() => s().skipSurvey('post')} onReplay={s().resetGame} surveyDone={false} />);
    await userEvent.click(screen.getByRole('button', { name: 'Bỏ qua khảo sát' }));
    const evs = getTelemetryEvents().filter((e) => e.type === 'survey_submitted' || e.type === 'survey_skipped');
    expect(evs.map((e) => [e.type, e.stage])).toEqual([
      ['survey_submitted', 'post'],
      ['survey_skipped', 'post'],
    ]);
    const submitted = evs[0];
    expect(submitted?.type === 'survey_submitted' && isClosedPostAnswers(submitted.answers)).toBe(true);
  });
});
