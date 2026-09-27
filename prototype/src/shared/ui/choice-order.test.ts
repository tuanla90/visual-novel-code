import { beforeEach, describe, expect, it } from 'vitest';
import type { MultipleChoiceQuestion } from '../../story/types';
import { clearTelemetry } from '../telemetry/track';
import { forgetChoiceOrders, orderedChoices } from './choice-order';

const SAMPLE_QUESTION: MultipleChoiceQuestion = {
  id: 'q-test-strictmode',
  asker: { speaker: 'minh-anh', expression: 'neutral', text: 'Thử nghiệm?' },
  choices: [
    { id: 'c-1', text: 'Lựa chọn 1', correct: false, feedback: [] },
    { id: 'c-2', text: 'Lựa chọn 2', correct: true, feedback: [] },
    { id: 'c-3', text: 'Lựa chọn 3', correct: false, feedback: [] },
    { id: 'c-4', text: 'Lựa chọn 4', correct: false, feedback: [] },
  ],
};

describe('orderedChoices — ổn định trong React 19 StrictMode', () => {
  beforeEach(() => {
    forgetChoiceOrders();
    clearTelemetry();
  });

  it('giữ nguyên trật tự lựa chọn qua các lần render trong cùng tick ở attempts = 0 (React 19 StrictMode double-render)', () => {
    // Lần render 1 (nguồn ngẫu nhiên A)
    const firstRender = orderedChoices(SAMPLE_QUESTION, 0, () => 0.1);
    const firstIds = firstRender.map((c) => c.id);

    // Lần render 2 (cùng tick trong StrictMode, nguồn ngẫu nhiên B khác hẳn nếu bị tính lại)
    const secondRender = orderedChoices(SAMPLE_QUESTION, 0, () => 0.9);
    const secondIds = secondRender.map((c) => c.id);

    // StrictMode double render phải giữ nguyên kết quả của lần xáo đầu tiên!
    expect(secondIds).toEqual(firstIds);
  });

  it('giữ nguyên trật tự khi attempts > 0 (chọn sai rồi chọn lại)', async () => {
    const initial = orderedChoices(SAMPLE_QUESTION, 0);
    // Chờ microtask để sang tick mới
    await Promise.resolve();
    const retry = orderedChoices(SAMPLE_QUESTION, 1);

    expect(retry.map((c) => c.id)).toEqual(initial.map((c) => c.id));
  });

  it('xáo mới khi chơi lại từ đầu ở phiên mới (attempts = 0 qua microtask mới)', async () => {
    // Lần chơi 1
    const session1Order = orderedChoices(SAMPLE_QUESTION, 0, () => 0.1).map((c) => c.id);

    // Sang microtask tiếp theo (mô phỏng chu trình unmount và chơi lại từ đầu)
    await new Promise((resolve) => setTimeout(resolve, 10));

    // Lần chơi 2 với attempts = 0
    const session2Order = orderedChoices(SAMPLE_QUESTION, 0, () => 0.8).map((c) => c.id);

    expect(session1Order).not.toEqual(session2Order);
  });
});
