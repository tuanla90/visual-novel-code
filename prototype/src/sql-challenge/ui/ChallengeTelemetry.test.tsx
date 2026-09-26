/**
 * Telemetry của màn thử thách (union events.ts, QĐ-029/QĐ-043): primaryCode của query_run là mã
 * ĐÃ HIỆN (pickDiagnostic theo nội dung), không phải mã đầu của engine — ca dưới đây hai mã KHÁC nhau
 * (c1 không có lời riêng cho or-connector → hiện lời `other`), nên test phân biệt được.
 */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { gameContent } from '../../shared/store';
import { CHALLENGE_SPECS } from '../data/challenges';
import { gradeChallenge, modelToSql } from '../engine';
import type { QueryModel } from '../types';
import { eventsOf, presetModel, renderChallenge, resetGame } from './test-utils';

const C1_OR: QueryModel = {
  table: 'sinh_vien',
  columns: ['ma_sv', 'ho_dem', 'ten'],
  conditions: [
    { id: 'cond-1', column: 'ten', op: 'startsWith', value: 'H', source: { kind: 'clue', clueId: 'clue-signature-h' } },
    { id: 'cond-2', column: 'clb', op: 'eq', value: 'Báo chí', source: { kind: 'clue', clueId: 'clue-bookmark-baochi' } },
  ],
  connector: 'OR',
};

describe('telemetry query_run ghi mã ĐÃ HIỆN', () => {
  beforeEach(() => resetGame(['clue-signature-h', 'clue-bookmark-baochi']));

  it('tiền đề: với c1 + OR, mã đầu của engine (or-connector) KHÁC mã hiển thị (other)', async () => {
    const grade = await gradeChallenge(CHALLENGE_SPECS.c1, modelToSql(C1_OR), C1_OR);
    expect(grade.primaryCode).toBe('or-connector');
    expect(gameContent.challenges.c1.content.diagnosticLines['or-connector']).toBeUndefined();
  });

  it('c1 + OR: Hà Vy nói lời `other` của nội dung và query_run.primaryCode = other', async () => {
    const user = userEvent.setup();
    presetModel('c1', C1_OR);
    renderChallenge('c1');
    await user.click(screen.getByRole('button', { name: /Chạy truy vấn/ }));
    await screen.findByText('Lần chạy 1');
    const otherLine = gameContent.commonDiagnosticLines.other;
    expect(otherLine && 'line' in otherLine).toBe(true);
    if (otherLine && 'line' in otherLine) expect(document.querySelector('.havy__body')?.textContent).toContain(otherLine.line.text);
    const [ev] = eventsOf('query_run');
    expect(ev).toMatchObject({ challengeId: 'c1', mode: 'builder', attempt: 1, status: 'incorrect', primaryCode: 'other', errorClass: 'logic', connector: 'OR' });
    expect(typeof ev?.msSinceStart).toBe('number');
    expect(ev?.msSinceStart).toBeGreaterThanOrEqual(0);
    expect(document.body.textContent).not.toMatch(/or-connector|\bother\b/);
  });

  it('một lượt c1 đủ sự kiện theo thứ tự: challenge_start → first_run → query_run → hint_used → question_answered → challenge_complete', async () => {
    const user = userEvent.setup();
    presetModel('c1', {
      table: 'sinh_vien',
      columns: ['ma_sv', 'ho_dem', 'ten'],
      conditions: [{ id: 'cond-1', column: 'ten', op: 'startsWith', value: 'H', source: { kind: 'clue', clueId: 'clue-signature-h' } }],
      connector: null,
    });
    renderChallenge('c1');
    await user.click(screen.getByRole('button', { name: 'Hỏi Hà Vy' }));
    await user.click(screen.getByRole('button', { name: /Chạy truy vấn/ }));
    await screen.findByText('10 dòng');
    await user.click(screen.getByRole('button', { name: 'Những người có tên gọi bắt đầu bằng H.' }));
    await user.click(screen.getByRole('button', { name: 'Lưu vào hồ sơ' }));
    const types = [
      ...eventsOf('challenge_start'),
      ...eventsOf('first_run'),
      ...eventsOf('query_run'),
      ...eventsOf('hint_used'),
      ...eventsOf('question_answered'),
      ...eventsOf('challenge_complete'),
    ].map((e) => e.type);
    expect(new Set(types)).toEqual(new Set(['challenge_start', 'first_run', 'query_run', 'hint_used', 'question_answered', 'challenge_complete']));
    expect(eventsOf('question_answered')[0]).toMatchObject({ choiceId: 'ten-h', attempt: 1, correct: true, isFirstChoice: true });
    expect(eventsOf('challenge_complete')[0]).toMatchObject({ challengeId: 'c1', runs: 1, hintsUsed: 1 });
  });
});
