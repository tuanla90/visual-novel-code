/**
 * Chạy là chấm (QĐ-018): bảng kết quả + số dòng theo lý do + MỘT lời Hà Vy chọn bằng pickDiagnostic,
 * chạy lại không giới hạn; telemetry query_run ghi mã ĐÃ HIỆN.
 */
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { c3Model, challengeState, eventsOf, presetModel, renderChallenge, resetGame } from './test-utils';

const ALL_CLUES = ['clue-signature-h', 'clue-box-building-b', 'clue-bookmark-baochi'] as const;

function havyText(): string {
  return document.querySelector('.havy__body')?.textContent ?? '';
}

describe('Chạy truy vấn → bảng kết quả + số dòng + nhận xét theo mã', () => {
  beforeEach(() => resetGame([...ALL_CLUES]));

  it('c1 chưa lọc: 40 dòng, lời no-filter của thẻ c1, query_run ghi đúng mã đã hiện', async () => {
    const user = userEvent.setup();
    presetModel('c1', { table: 'sinh_vien', columns: ['ma_sv', 'ho_dem', 'ten'], conditions: [], connector: null });
    renderChallenge('c1');
    await user.click(screen.getByRole('button', { name: /Chạy truy vấn/ }));
    expect(await screen.findByText('40 dòng')).toBeInTheDocument();
    const table = screen.getByRole('table', { name: 'Kết quả lần chạy 1' });
    expect(within(table).getAllByRole('row')).toHaveLength(41);
    expect(havyText()).toContain('Đây là cả bảng, chưa lọc gì. Như mở sheet mà chưa bật Filter.');
    const [runEv] = eventsOf('query_run');
    expect(runEv).toMatchObject({ challengeId: 'c1', mode: 'builder', attempt: 1, rowCount: 40, status: 'incorrect', primaryCode: 'no-filter', errorClass: 'logic', connector: null });
    expect(eventsOf('first_run')).toHaveLength(1);
    expect(challengeState('c1')?.runs).toBe(1);

    // chạy lại không giới hạn, không phạt
    await user.click(screen.getByRole('button', { name: /Chạy truy vấn/ }));
    expect(await screen.findByText('Lần chạy 2')).toBeInTheDocument();
    expect(eventsOf('first_run')).toHaveLength(1);
    expect(eventsOf('query_run')).toHaveLength(2);
  });

  it('0 dòng có câu theo LÝ DO (không sinh viên nào thỏa điều kiện lọc), không có bảng rỗng', async () => {
    const user = userEvent.setup();
    presetModel('c1', {
      table: 'sinh_vien',
      columns: ['ma_sv', 'ho_dem', 'ten'],
      conditions: [{ id: 'cond-1', column: 'ten', op: 'startsWith', value: 'Zz', source: { kind: 'manual' } }],
      connector: null,
    });
    renderChallenge('c1');
    await user.click(screen.getByRole('button', { name: /Chạy truy vấn/ }));
    expect(await screen.findByText('0 dòng — không sinh viên nào thỏa điều kiện lọc')).toBeInTheDocument();
    expect(screen.queryByRole('table')).not.toBeInTheDocument();
    expect(havyText().length).toBeGreaterThan(10);
  });

  it('c3 chọn OR → lời hint-any-or-all (gợi ý chuẩn), bảng 24 dòng', async () => {
    const user = userEvent.setup();
    presetModel('c3', c3Model('OR'));
    renderChallenge('c3');
    await user.click(screen.getByRole('button', { name: /Chạy truy vấn/ }));
    expect(await screen.findByText('24 dòng')).toBeInTheDocument();
    expect(havyText()).toContain('Truy vấn này đang lấy cả người chỉ khớp một manh mối. Cậu muốn khớp bất kỳ, hay khớp đồng thời?');
    expect(eventsOf('query_run')[0]).toMatchObject({ primaryCode: 'or-connector', connector: 'OR', rowCount: 24 });
  });
});
