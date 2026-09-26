/**
 * Màn sửa truy vấn của Quân (`fix-query`, debrief-fix): nạp sẵn model OR, không có câu đọc kết quả,
 * vật chứng ev-quan-fixed kèm `before` (SQL OR của Quân + số dòng THẬT của nó). Hết quyền → khóa.
 */
import { fireEvent, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { QUAN_OR_QUERY } from '../data/challenges';
import { useGameStore } from '../../shared/store';
import { challengeState, eventsOf, renderChallenge, resetGame, saveEvidence } from './test-utils';

function havyText(): string {
  return document.querySelector('.havy__body')?.textContent ?? '';
}

describe('Màn sửa truy vấn của Quân', () => {
  beforeEach(() => {
    resetGame(['clue-signature-h', 'clue-box-building-b', 'clue-bookmark-baochi']);
    saveEvidence({
      id: 'ev-c2-classes-b',
      challengeId: 'c2',
      sql: "SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B';",
      columns: ['ma_lop'],
      rows: [['KT24A'], ['QT24B']],
      rowCount: 2,
      savedAt: 1,
    });
  });

  it('nạp OR → chạy 24 dòng → đổi AND → đúng 2 dòng → lưu ev-quan-fixed với before.rowCount = 24', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    renderChallenge('debrief-fix', { mode: 'fix-query', onComplete });

    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Sửa truy vấn của Quân');
    expect(challengeState('debrief-fix')?.model.connector).toBe('OR');
    for (const b of screen.getAllByRole('button', { name: 'OR — thỏa bất kỳ' })) expect(b).toHaveAttribute('aria-pressed', 'true');
    expect(screen.getByLabelText('Câu SQL sinh từ trình dựng').textContent).toBe(
      "SELECT ma_sv, ho_dem, ten, ma_lop, clb\nFROM sinh_vien\nWHERE ten LIKE 'H%'\n   OR ma_lop IN ('KT24A', 'QT24B')\n   OR clb = 'Báo chí';",
    );
    // danh sách lớp của Quân đến từ vật chứng c2 (nguồn được giữ), hiện dạng chip
    expect(screen.getByRole('button', { name: 'Bỏ KT24A khỏi danh sách' })).toBeInTheDocument();

    await user.click(screen.getByRole('button', { name: /Chạy truy vấn/ }));
    expect(await screen.findByText('24 dòng')).toBeInTheDocument();
    expect(havyText()).toContain('Cậu muốn khớp bất kỳ, hay khớp đồng thời?');

    await user.click(screen.getAllByRole('button', { name: 'AND — thỏa đồng thời' })[0]!);
    await user.click(screen.getByRole('button', { name: /Chạy truy vấn/ }));
    expect(await screen.findByText('2 dòng')).toBeInTheDocument();
    expect(havyText()).toContain('Hai dòng. Đưa lên màn chiếu đi!');
    // không có câu đọc kết quả ở màn này → nút lưu hiện ngay, dòng nhắc không nhắc tới câu hỏi
    expect(within(screen.getByRole('region', { name: 'Kết quả' })).queryByRole('group')).not.toBeInTheDocument();
    expect(screen.getByText('Truy vấn đã đúng — lưu vào hồ sơ để đi tiếp.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Lưu vào hồ sơ' }));

    await vi.waitFor(() => expect(onComplete).toHaveBeenCalledTimes(1));
    const ev = useGameStore.getState().evidence.savedQueries['ev-quan-fixed'];
    expect(ev).toMatchObject({ challengeId: 'debrief-fix', rowCount: 2, before: { sql: QUAN_OR_QUERY, rowCount: 24 } });
    expect(ev?.rows.map((r) => r[2]).sort()).toEqual(['Hiếu', 'Hoài']);
    expect(ev?.sql).toContain('  AND ma_lop IN');
    expect(eventsOf('query_run').map((e) => [e.connector, e.rowCount, e.status])).toEqual([
      ['OR', 24, 'incorrect'],
      ['AND', 2, 'correct'],
    ]);
    expect(eventsOf('question_answered')).toHaveLength(0);
  });

  it('bấm đúp "Lưu vào hồ sơ" chỉ lưu và gọi onComplete MỘT lần', async () => {
    const user = userEvent.setup();
    const onComplete = vi.fn();
    renderChallenge('debrief-fix', { mode: 'fix-query', onComplete });
    await user.click(screen.getAllByRole('button', { name: 'AND — thỏa đồng thời' })[0]!);
    await user.click(screen.getByRole('button', { name: /Chạy truy vấn/ }));
    const saveBtn = await screen.findByRole('button', { name: 'Lưu vào hồ sơ' });
    fireEvent.click(saveBtn);
    fireEvent.click(saveBtn);
    await vi.waitFor(() => expect(onComplete).toHaveBeenCalled());
    await new Promise((r) => setTimeout(r, 50));
    expect(onComplete).toHaveBeenCalledTimes(1);
    expect(eventsOf('challenge_complete')).toHaveLength(1);
  });

  it('hết quyền truy cập: khóa toàn bộ, nêu lý do, không chạy / không hỏi / không sửa SQL được', () => {
    renderChallenge('debrief-fix', { mode: 'fix-query', accessRevoked: true });
    expect(screen.getByText(/Quyền xem dữ liệu của CLB đã kết thúc/)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Chạy truy vấn/ })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Hỏi Hà Vy' })).toBeDisabled();
    expect(screen.getByRole('button', { name: 'Sửa SQL trực tiếp' })).toBeDisabled();
    expect(screen.getByLabelText('Bảng dữ liệu')).toBeDisabled();
    for (const b of screen.getAllByRole('button', { name: /Xem 5 dòng đầu/ })) expect(b).toBeDisabled();
    expect(screen.queryByText(/Hàng FROM còn trống/)).not.toBeInTheDocument();
  });
});
