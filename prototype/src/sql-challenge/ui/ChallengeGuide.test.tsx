/**
 * Hướng dẫn từng bước c1 (QĐ-021), "Hỏi Hà Vy" (gợi ý 1 → 2 → 3, rồi lặp 3), bảng dữ liệu +
 * "Xem 5 dòng đầu".
 */
import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it } from 'vitest';
import { challengeState, eventsOf, renderChallenge, resetGame } from './test-utils';

function havyText(): string {
  return document.querySelector('.havy__body')?.textContent ?? '';
}
function havyLabel(): string {
  return document.querySelector('.havy__label')?.textContent ?? '';
}
function guidedRegions(): string[] {
  return [...document.querySelectorAll('.is-guided')].map((e) => e.getAttribute('data-region') ?? '?');
}

describe('Hướng dẫn từng bước (chỉ c1)', () => {
  beforeEach(() => resetGame(['clue-signature-h']));

  it('đi qua 5 bước: vùng nổi bật + lời của bước, tự sang bước khi làm xong, hết hướng dẫn sau khi chạy', async () => {
    const user = userEvent.setup();
    renderChallenge('c1');
    expect(challengeState('c1')?.guideStep).toBe(1);
    expect(havyLabel()).toBe('Hướng dẫn · bước 1/5');
    expect(havyText()).toContain('Hàng FROM trước');
    expect(guidedRegions()).toEqual(['from']);

    await user.selectOptions(screen.getByLabelText('Bảng dữ liệu'), 'sinh_vien');
    expect(challengeState('c1')?.guideStep).toBe(2);
    expect(guidedRegions()).toEqual(['preview']);
    expect(havyText()).toContain('Xem 5 dòng đầu');

    await user.click(screen.getByRole('button', { name: 'Xem 5 dòng đầu' }));
    const preview = await screen.findByRole('table', { name: '5 dòng đầu của bảng sinh_vien' });
    expect(within(preview).getAllByRole('row')).toHaveLength(6);
    expect(challengeState('c1')?.guideStep).toBe(3);
    expect(guidedRegions()).toEqual(['select']);

    const select = screen.getByRole('group', { name: 'SELECT' });
    for (const col of ['ma_sv', 'ho_dem', 'ten']) await user.click(within(select).getByLabelText(col));
    expect(challengeState('c1')?.guideStep).toBe(4);
    expect(guidedRegions()).toEqual(['where']);
    expect(havyText()).toContain('như nút Filter trong Excel');

    await user.click(screen.getByRole('button', { name: /Thêm điều kiện/ }));
    expect(challengeState('c1')?.guideStep).toBe(4); // điều kiện chưa có giá trị → chưa xong
    await user.selectOptions(screen.getByLabelText('Cột lọc của điều kiện 1'), 'ten');
    await user.selectOptions(screen.getByLabelText('Phép so sánh của điều kiện 1'), 'startsWith');
    await user.selectOptions(screen.getByLabelText('Từ manh mối cho điều kiện 1'), 'H — Chữ ký "H."');
    expect(challengeState('c1')?.guideStep).toBe(5);
    expect(guidedRegions()).toEqual(['run']);
    expect(havyText()).toContain('Dấu % nghĩa là "sau đó là gì cũng được"');

    await user.click(screen.getByRole('button', { name: /Chạy truy vấn/ }));
    await screen.findByText('10 dòng');
    expect(challengeState('c1')?.guideStep).toBe(0);
    expect(guidedRegions()).toEqual([]);
    expect(havyText()).toContain('Truy vấn đầu tiên của cậu đấy!');
  });

  it('không khóa thao tác: làm bước sau trước vẫn được (bước "xem 5 dòng" tùy chọn); "Bỏ qua hướng dẫn" tắt hẳn', async () => {
    const user = userEvent.setup();
    renderChallenge('c1');
    await user.selectOptions(screen.getByLabelText('Bảng dữ liệu'), 'sinh_vien');
    expect(challengeState('c1')?.guideStep).toBe(2);
    await user.click(within(screen.getByRole('group', { name: 'SELECT' })).getByLabelText('ten'));
    expect(challengeState('c1')?.guideStep).toBe(4);

    await user.click(screen.getByRole('button', { name: 'Bỏ qua hướng dẫn' }));
    expect(challengeState('c1')?.guideStep).toBe(0);
    expect(guidedRegions()).toEqual([]);
    expect(screen.queryByRole('button', { name: 'Bỏ qua hướng dẫn' })).not.toBeInTheDocument();
  });

  it('thử thách không có bước (c2) không hiện hướng dẫn', () => {
    renderChallenge('c2');
    expect(challengeState('c2')?.guideStep).toBe(0);
    expect(guidedRegions()).toEqual([]);
    expect(screen.queryByRole('button', { name: 'Bỏ qua hướng dẫn' })).not.toBeInTheDocument();
  });
});

describe('"Hỏi Hà Vy" và bảng dữ liệu', () => {
  beforeEach(() => resetGame(['clue-signature-h', 'clue-box-building-b', 'clue-bookmark-baochi']));

  it('mỗi lần bấm mở gợi ý mức kế: 1 → 2 → 3 → 3; hint_used ghi mức + số lần; chữ mã không lộ dấu `', async () => {
    const user = userEvent.setup();
    renderChallenge('c3');
    const ask = screen.getByRole('button', { name: 'Hỏi Hà Vy' });
    await user.click(ask);
    expect(havyLabel()).toBe('Gợi ý 1/3');
    expect(havyText()).toContain('Ghép cả ba manh mối vào một truy vấn');
    await user.click(ask);
    expect(havyLabel()).toBe('Gợi ý 2/3');
    await user.click(ask);
    expect(havyLabel()).toBe('Gợi ý 3/3');
    await user.click(ask);
    expect(havyLabel()).toBe('Gợi ý 3/3');
    expect(havyText()).toContain("SELECT ma_sv, ho_dem, ten, ma_lop, clb FROM sinh_vien WHERE ten LIKE 'H%'");
    expect(havyText()).not.toContain('`');
    expect(document.querySelector('.havy__body code')).not.toBeNull();
    expect(eventsOf('hint_used').map((e) => [e.level, e.count])).toEqual([
      [1, 1],
      [2, 2],
      [3, 3],
      [3, 4],
    ]);
    expect(challengeState('c3')).toMatchObject({ hintLevel: 3, hintsUsed: 4 });
  });

  it('bảng dữ liệu: mô tả cột tiếng Việt, thu gọn được, "Xem 5 dòng đầu" từng bảng', async () => {
    const user = userEvent.setup();
    renderChallenge('c2');
    const schema = screen.getByRole('region', { name: /Bảng dữ liệu/ });
    expect(within(schema).getByText('Tòa nhà sinh hoạt (A, B, C)', { exact: false })).toBeInTheDocument();
    const toggle = within(schema).getByRole('button', { name: /Bảng dữ liệu/ });
    expect(toggle).toHaveAttribute('aria-expanded', 'true');
    await user.click(within(schema).getByRole('button', { name: 'Xem 5 dòng đầu của bảng lop_sinh_hoat' }));
    const t = await screen.findByRole('table', { name: '5 dòng đầu của bảng lop_sinh_hoat' });
    expect(within(t).getAllByRole('row')).toHaveLength(6);
    expect(within(t).getByText('toa_nha')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Đóng bản xem trước' }));
    expect(screen.queryByRole('table', { name: '5 dòng đầu của bảng lop_sinh_hoat' })).not.toBeInTheDocument();
    await user.click(toggle);
    expect(toggle).toHaveAttribute('aria-expanded', 'false');
    expect(within(schema).queryByText('Tòa nhà sinh hoạt (A, B, C)', { exact: false })).not.toBeVisible();
  });
});
