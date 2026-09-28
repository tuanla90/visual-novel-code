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

  it('cùng phiên: gọi hai lần liền (React 19 StrictMode double-render) giữ đúng lần xáo đầu', () => {
    const firstIds = orderedChoices(SAMPLE_QUESTION, 'phien-1', () => 0.1).map((c) => c.id);
    // Lần gọi thứ hai với nguồn ngẫu nhiên khác hẳn: nếu bị xáo lại / ghi đè thì thứ tự đổi.
    const secondIds = orderedChoices(SAMPLE_QUESTION, 'phien-1', () => 0.9).map((c) => c.id);
    expect(secondIds).toEqual(firstIds);
  });

  it('cùng phiên: chọn sai rồi chọn lại (dựng lại component) → giữ nguyên trật tự', async () => {
    const initial = orderedChoices(SAMPLE_QUESTION, 'phien-1');
    await new Promise((resolve) => setTimeout(resolve, 10));
    const retry = orderedChoices(SAMPLE_QUESTION, 'phien-1');
    expect(retry.map((c) => c.id)).toEqual(initial.map((c) => c.id));
  });

  it('chơi lại từ đầu (phiên mới, khóa `startedAt` mới) → xáo mới', () => {
    const session1Order = orderedChoices(SAMPLE_QUESTION, 1000, () => 0.1).map((c) => c.id);
    const session2Order = orderedChoices(SAMPLE_QUESTION, 2000, () => 0.8).map((c) => c.id);
    expect(session1Order).not.toEqual(session2Order);
  });
});
