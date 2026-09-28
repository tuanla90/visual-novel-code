/**
 * Telemetry của màn thử thách (union events.ts, QĐ-029/QĐ-043): primaryCode của query_run là mã
 * ĐÃ HIỆN (pickDiagnostic theo nội dung), không phải mã đầu của engine.
 *
 * Từ QĐ-054, nội dung thật có lời chung cho or-connector nên với c1 + OR hai mã TRÙNG nhau — test mất
 * sức phân biệt. Vì vậy tệp này chạy trên một bản nội dung GIẢ: sao từ nội dung thật rồi xóa lời của
 * mã engine trả về (or-connector) ở cả thẻ c1 lẫn "Nhận xét chung" → mã hiện là `other` ≠ mã engine.
 * Test tiền đề khẳng định hai mã khác nhau trên bản giả (và trùng nhau trên nội dung thật).
 */
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { realContent } from '../../content/real';
import { gameContent } from '../../shared/store';
import type * as StoreModule from '../../shared/store';
import { CHALLENGE_SPECS } from '../data/challenges';
import { gradeChallenge, modelToSql } from '../engine';
import { pickDiagnostic } from '../engine/priority';
import type { QueryModel } from '../types';
import { passPressGuard } from '../../test/press-guard';
import { eventsOf, presetModel, renderChallenge, resetGame } from './test-utils';

// Bản nội dung giả cho CẢ tệp (màn thử thách và test-utils đọc `gameContent` của module store).
vi.mock('../../shared/store', async (importOriginal) => {
  const real = await importOriginal<typeof StoreModule>();
  const content = real.gameContent;
  const drop = <T extends object>(lines: T): T =>
    Object.fromEntries(Object.entries(lines).filter(([code]) => code !== 'or-connector')) as T;
  const c1 = content.challenges.c1;
  return {
    ...real,
    gameContent: {
      ...content,
      commonDiagnosticLines: drop(content.commonDiagnosticLines),
      challenges: { ...content.challenges, c1: { ...c1, content: { ...c1.content, diagnosticLines: drop(c1.content.diagnosticLines) } } },
    },
  };
});

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

  it('tiền đề: với c1 + OR trên bản giả, mã đầu của engine (or-connector) KHÁC mã hiển thị (other)', async () => {
    const grade = await gradeChallenge(CHALLENGE_SPECS.c1, modelToSql(C1_OR), C1_OR);
    expect(grade.primaryCode).toBe('or-connector');
    const codes = grade.diagnostics.map((d) => d.code);
    const fake = gameContent.challenges.c1.content.diagnosticLines;
    expect(gameContent.commonDiagnosticLines['or-connector']).toBeUndefined();
    expect(pickDiagnostic(codes, fake, gameContent.commonDiagnosticLines)?.code).toBe('other');
    // Nội dung thật (QĐ-054) hiện đúng mã engine — lý do phải dùng bản giả ở đây.
    const real = realContent.challenges.c1.content.diagnosticLines;
    expect(pickDiagnostic(codes, real, realContent.commonDiagnosticLines)?.code).toBe('or-connector');
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
    await passPressGuard();
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
