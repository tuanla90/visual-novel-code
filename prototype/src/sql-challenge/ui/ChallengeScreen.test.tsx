/**
 * Màn thử thách với store thật + nội dung thật + engine thật (sql.js trong Vitest).
 */
import { screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { getTelemetryEvents } from '../../shared/telemetry/track';
import { challengeState, renderChallenge, resetGame, saveEvidence } from './test-utils';

function sqlText(): string {
  return screen.getByLabelText('Câu SQL sinh từ trình dựng').textContent ?? '';
}

const RAW_IDS = /connector-unset|no-value|no-table|no-columns|clue-signature-h|clue-bookmark-baochi|clue-box-building-b|ev-c2-classes-b|ha-vy/;

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

describe('ChallengeScreen — hàng WHERE, "Từ manh mối", phép nối chưa chọn (QĐ-039)', () => {
  beforeEach(() => resetGame(['clue-signature-h', 'clue-box-building-b', 'clue-bookmark-baochi']));

  it('mở ra: nút Chạy vô hiệu kèm lời của mã blocking đầu (no-table) lấy từ nội dung, không in mã thô', () => {
    renderChallenge('c1');
    expect(screen.getByRole('button', { name: /Chạy truy vấn/ })).toBeDisabled();
    expect(screen.getByRole('status')).toHaveTextContent('Hàng FROM còn trống. Mình lấy dữ liệu từ bảng nào?');
    expect(document.body.textContent).not.toMatch(RAW_IDS);
  });

  it('ô giá trị LIKE: ô chữ + nhóm "Từ manh mối" (manh mối đã mở, đúng cột) ghi nguồn manh mối', async () => {
    const user = userEvent.setup();
    renderChallenge('c1');
    await user.selectOptions(screen.getByLabelText('Bảng dữ liệu'), 'sinh_vien');
    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));
    await user.selectOptions(screen.getByLabelText('Cột lọc của điều kiện 1'), 'ten');
    await user.selectOptions(screen.getByLabelText('Phép so sánh của điều kiện 1'), 'startsWith');
    const fromClue = screen.getByLabelText<HTMLSelectElement>('Từ manh mối cho điều kiện 1');
    expect([...fromClue.options].map((o) => o.textContent)).toEqual(['Từ manh mối…', 'H — Chữ ký "H."']);
    await user.selectOptions(fromClue, 'H — Chữ ký "H."');
    expect(screen.getByLabelText<HTMLInputElement>('Giá trị (chữ) của điều kiện 1').value).toBe('H');
    expect(challengeState('c1')?.model.conditions[0]?.source).toEqual({ kind: 'clue', clueId: 'clue-signature-h' });
    expect(sqlText()).toBe("SELECT\nFROM sinh_vien\nWHERE ten LIKE 'H%';");
    // chưa chọn cột → lời no-columns
    expect(screen.getByRole('status')).toHaveTextContent('Hàng SELECT chưa chọn cột nào.');
  });

  it('khối ghép: FROM/SELECT trống → đã khớp khi điền; WHERE được để trống; mảnh SQL theo từng khối', async () => {
    const user = userEvent.setup();
    renderChallenge('c1');
    const block = (name: string) => screen.getByRole('group', { name });
    expect(block('FROM')).toHaveClass('is-empty');
    expect(block('WHERE')).toHaveClass('is-optional');
    await user.selectOptions(screen.getByLabelText('Bảng dữ liệu'), 'sinh_vien');
    expect(block('FROM')).toHaveClass('is-filled');
    expect(block('FROM')).toHaveTextContent('FROM sinh_vien');
    expect(block('SELECT')).toHaveClass('is-empty');
    await user.click(within(block('SELECT')).getByText('ten'));
    expect(block('SELECT')).toHaveClass('is-filled');
    expect(block('SELECT')).toHaveTextContent('SELECT ten');
    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));
    expect(block('WHERE')).toHaveClass('is-empty');
  });

  it('thẻ manh mối: bấm thẻ rồi "Đặt manh mối vào đây" = chọn trong "Từ manh mối"; chỉ điều kiện nhận được mới có nút đặt', async () => {
    const user = userEvent.setup();
    renderChallenge('c1');
    await user.selectOptions(screen.getByLabelText('Bảng dữ liệu'), 'sinh_vien');
    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));
    const card = within(screen.getByRole('group', { name: 'Thẻ manh mối' })).getByRole('button', { name: /H — Chữ ký/ });
    // Điều kiện chưa chọn cột thì không nhận thẻ nào.
    await user.click(card);
    expect(card).toHaveAttribute('aria-pressed', 'true');
    expect(screen.queryByRole('button', { name: 'Đặt manh mối vào đây' })).not.toBeInTheDocument();
    await user.selectOptions(screen.getByLabelText('Cột lọc của điều kiện 1'), 'ten');
    await user.selectOptions(screen.getByLabelText('Phép so sánh của điều kiện 1'), 'startsWith');
    await user.click(screen.getByRole('button', { name: 'Đặt manh mối vào đây' }));
    expect(screen.getByLabelText<HTMLInputElement>('Giá trị (chữ) của điều kiện 1').value).toBe('H');
    expect(challengeState('c1')?.model.conditions[0]?.source).toEqual({ kind: 'clue', clueId: 'clue-signature-h' });
    expect(card).toHaveAttribute('aria-pressed', 'false');
    expect(screen.queryByRole('button', { name: 'Đặt manh mối vào đây' })).not.toBeInTheDocument();
  });

  it('ô giá trị "=": giá trị có trong dữ liệu + "Từ manh mối"; IN với ma_lop: danh sách lớp từ vật chứng c2 đã lưu', async () => {
    const user = userEvent.setup();
    saveEvidence({
      id: 'ev-c2-classes-b',
      challengeId: 'c2',
      sql: "SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B';",
      columns: ['ma_lop'],
      rows: [['KT24A'], ['QT24B']],
      rowCount: 2,
      savedAt: 1,
    });
    renderChallenge('c3');
    await user.selectOptions(screen.getByLabelText('Bảng dữ liệu'), 'sinh_vien');
    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));
    await user.selectOptions(screen.getByLabelText('Cột lọc của điều kiện 1'), 'clb');
    const value = screen.getByLabelText<HTMLSelectElement>('Giá trị của điều kiện 1');
    await waitFor(() => expect(within(value).getByRole('option', { name: 'Robotics' })).toBeInTheDocument());
    expect(within(value).getByRole('group', { name: 'Từ manh mối' })).toHaveTextContent('Báo chí — Nửa bookmark CLB Báo chí');
    await user.selectOptions(value, 'Báo chí — Nửa bookmark CLB Báo chí');
    expect(challengeState('c3')?.model.conditions[0]?.source).toEqual({ kind: 'clue', clueId: 'clue-bookmark-baochi' });

    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));
    await user.selectOptions(screen.getByLabelText('Cột lọc của điều kiện 2'), 'ma_lop');
    await user.selectOptions(screen.getByLabelText('Phép so sánh của điều kiện 2'), 'in');
    const add = screen.getByLabelText<HTMLSelectElement>('Thêm giá trị vào danh sách của điều kiện 2');
    await user.selectOptions(add, 'KT24A, QT24B — Lớp sinh hoạt ở giảng đường B');
    expect(challengeState('c3')?.model.conditions[1]).toMatchObject({
      value: ['KT24A', 'QT24B'],
      source: { kind: 'evidence', evidenceId: 'ev-c2-classes-b' },
    });
    expect(screen.getByRole('button', { name: 'Bỏ KT24A khỏi danh sách' })).toHaveAttribute('title', 'Bỏ KT24A khỏi danh sách');
  });

  it('c3 hai điều kiện, phép nối CHƯA CHỌN → nút Chạy vô hiệu + lời connector-unset; chọn ở một chỗ đổi cả loạt', async () => {
    const user = userEvent.setup();
    renderChallenge('c3');
    await user.selectOptions(screen.getByLabelText('Bảng dữ liệu'), 'sinh_vien');
    await user.click(within(screen.getByRole('group', { name: 'SELECT' })).getByLabelText(/mọi cột/));
    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));
    await user.selectOptions(screen.getByLabelText('Cột lọc của điều kiện 1'), 'ten');
    await user.selectOptions(screen.getByLabelText('Phép so sánh của điều kiện 1'), 'startsWith');
    await user.type(screen.getByLabelText('Giá trị (chữ) của điều kiện 1'), 'H');
    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));
    await user.selectOptions(screen.getByLabelText('Cột lọc của điều kiện 2'), 'clb');
    await user.selectOptions(screen.getByLabelText('Phép so sánh của điều kiện 2'), 'startsWith');
    await user.type(screen.getByLabelText('Giá trị (chữ) của điều kiện 2'), 'B');

    const run = screen.getByRole('button', { name: /Chạy truy vấn/ });
    expect(run).toBeDisabled();
    expect(screen.getByRole('status')).toHaveTextContent('Chưa chọn cách nối các điều kiện. Cậu cần người thỏa bất kỳ, hay thỏa đồng thời?');
    expect(run).toHaveAttribute('aria-describedby', 'chal-run-reason');
    expect(sqlText()).toContain('AND/OR clb');
    const and = screen.getByRole('button', { name: 'AND — thỏa đồng thời' });
    expect(and).toHaveAttribute('aria-pressed', 'false');

    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));
    await user.selectOptions(screen.getByLabelText('Cột lọc của điều kiện 3'), 'ma_lop');
    await user.selectOptions(screen.getByLabelText('Phép so sánh của điều kiện 3'), 'contains');
    await user.type(screen.getByLabelText('Giá trị (chữ) của điều kiện 3'), '2');
    const ors = screen.getAllByRole('button', { name: 'OR — thỏa bất kỳ' });
    expect(ors).toHaveLength(2);
    await user.click(ors[1]!);
    for (const b of screen.getAllByRole('button', { name: 'OR — thỏa bất kỳ' })) expect(b).toHaveAttribute('aria-pressed', 'true');
    expect(challengeState('c3')?.model.connector).toBe('OR');
    expect(run).toBeEnabled();
    expect(screen.queryByRole('status')).not.toBeInTheDocument();
    expect(document.body.textContent).not.toMatch(RAW_IDS);
  });
});
