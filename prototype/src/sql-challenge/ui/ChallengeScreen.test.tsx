/**
 * Màn thử thách với store thật + nội dung thật + engine thật (sql.js trong Vitest).
 */
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { getTelemetryEvents } from '../../shared/telemetry/track';
import { challengeState, renderChallenge, resetGame } from './test-utils';

function sqlText(): string {
  return screen.getByLabelText('Câu SQL sinh từ trình dựng').textContent ?? '';
}

describe('ChallengeScreen — khung + FROM/SELECT + SQL song song', () => {
  beforeEach(() => resetGame(['clue-signature-h']));

  it('mở c1: ba hàng SELECT/FROM/WHERE luôn hiện, FROM trống, challenge_start được ghi', () => {
    renderChallenge('c1');
    expect(screen.getByRole('group', { name: 'SELECT' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'FROM' })).toBeInTheDocument();
    expect(screen.getByRole('group', { name: 'WHERE' })).toBeInTheDocument();
    expect(screen.getByLabelText<HTMLSelectElement>('Bảng dữ liệu').value).toBe('');
    expect(sqlText()).toBe('SELECT\nFROM;');
    expect(getTelemetryEvents().filter((e) => e.type === 'challenge_start')).toHaveLength(1);
  });

  it('chọn bảng + cột → SQL cập nhật tức thì, cột theo thứ tự của bảng, lưu vào store', async () => {
    const user = userEvent.setup();
    renderChallenge('c1');
    await user.selectOptions(screen.getByLabelText('Bảng dữ liệu'), 'sinh_vien');
    const select = screen.getByRole('group', { name: 'SELECT' });
    await user.click(within(select).getByLabelText('ten'));
    await user.click(within(select).getByLabelText('ma_sv'));
    expect(sqlText()).toBe('SELECT ma_sv, ten\nFROM sinh_vien;');
    expect(challengeState('c1')?.model.columns).toEqual(['ma_sv', 'ten']);
    expect(challengeState('c1')?.sql).toBe('SELECT ma_sv, ten\nFROM sinh_vien;');
    await user.click(within(select).getByLabelText(/mọi cột/));
    expect(sqlText()).toBe('SELECT *\nFROM sinh_vien;');
  });

  it('từ khóa có chú thích đọc được bằng bàn phím (Tab tới LIKE hiện bong bóng)', async () => {
    const user = userEvent.setup();
    resetGame();
    renderChallenge('debrief-fix', { mode: 'fix-query' });
    const code = screen.getByLabelText('Câu SQL sinh từ trình dựng');
    const like = within(code).getByText('LIKE');
    expect(like).toHaveAttribute('tabindex', '0');
    like.focus();
    expect(await screen.findByRole('tooltip')).toHaveTextContent('So khớp theo mẫu chữ');
    await user.keyboard('{Escape}');
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
    expect(within(code).getAllByText('OR')).toHaveLength(2);
    expect(within(code).getByText('%')).toHaveAttribute('aria-describedby');
  });
});
