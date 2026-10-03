/**
 * Màn lịch (LichMvp): mở từ vé "NGÀY n/5" trên thanh trên; hôm nay, hạn buổi họp đúng lịch thật 2024; Esc / Đóng /
 * bấm ra ngoài thì đóng.
 */
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { useVnStore } from '../../shared/vn/vn-store';
import { taoTrangThai } from '../engine/may';
import { nhayToi } from '../engine/tu-choi';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { SO_O_LUU_MVP, useKhoMvp } from '../store/kho-mvp';
import { LichMvp } from './LichMvp';
import { ManChoiMvp } from './ManChoiMvp';

const kb = KICH_BAN_MVP as unknown as KichBanMvp;

function veManChoi(s: TrangThaiMvp) {
  act(() => useKhoMvp.getState().datTrangThai(s));
  return render(<ManChoiMvp onVeTieuDe={vi.fn()} />);
}
const thanhTren = (): HTMLElement => screen.getByRole('banner', { name: 'Thanh trạng thái' });
const ngay1 = (): TrangThaiMvp => ({ ...taoTrangThai(kb, 1), giaiDoan: 'ngay', ngay: 1, conTro: null });

afterEach(() => {
  act(() => {
    useKhoMvp.getState().xoa();
    useKhoMvp.setState({ oLuu: Array.from({ length: SO_O_LUU_MVP }, () => null) });
    useVnStore.getState().setViewportMode('desktop');
  });
});

describe('màn lịch', () => {
  it('vé ngày trên thanh trên là nút "Mở lịch"; bấm → mở lịch tháng 9/2024 đúng hôm nay; Esc đóng', async () => {
    const s = nhayToi(kb, 'ten-h', 1); // ngày 3
    veManChoi(s);
    const ve = within(thanhTren()).getByRole('button', { name: /^Mở lịch/ });
    expect(ve).toHaveAttribute('title', 'Mở lịch');
    expect(ve.querySelector('.topbar__chapter-number')).toHaveTextContent('19/9');

    await userEvent.click(ve);
    const lich = screen.getByRole('dialog', { name: /Tháng 9 2024/ });
    const homNay = within(lich).getByRole('cell', { current: 'date' });
    expect(homNay).toHaveAccessibleName(/^thứ Năm, 19\/09\/2024 — hôm nay/);
    expect(lich).toHaveTextContent('Thứ Năm, 19/09/2024');
    expect(lich).toHaveTextContent(/Buổi họp rà soát.*Thứ Hai, 23\/09\/2024 \(còn 4 ngày\)/);

    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: /Tháng 9 2024/ })).toBeNull();
  });

  it('ngày 1: hôm nay thứ Ba 17/09/2024 · Sảnh tòa B; hạn họp còn 6 ngày; mốc tuần đầu đã qua; ngày chưa tới không có mốc', () => {
    render(<LichMvp kb={kb} s={ngay1()} onDong={vi.fn()} />);
    const lich = screen.getByRole('dialog');
    expect(lich).toHaveTextContent(/Hôm nay\s*Thứ Ba, 17\/09\/2024\s*Ngày 1 · Sảnh tòa B/);
    expect(lich).toHaveTextContent(/HạnBuổi họp rà soát · 16:00Thứ Hai, 23\/09\/2024 \(còn 6 ngày\)/);
    const daQua = within(lich).getByRole('heading', { name: 'Đã qua' }).nextElementSibling as HTMLElement;
    expect(within(daQua).getAllByRole('listitem').map((li) => li.textContent)).toEqual([
      '16/09Phòng CLB · lá thư · 16:00',
      '14/09Ngày hội CLB',
      '09/09–13/09Tuần sinh hoạt công dân',
      '08/09Nhận phòng KTX · Phòng 408',
    ]);
    expect(within(lich).getByRole('cell', { name: /^thứ Hai, 23\/09\/2024 — Buổi họp rà soát$/ })).toHaveClass('is-co-han');
    expect(within(lich).getByRole('cell', { name: /^thứ Tư, 18\/09\/2024$/ })).not.toHaveClass('is-qua');
    expect(within(lich).getByRole('cell', { name: /^thứ Bảy, 14\/09\/2024 — Ngày hội CLB$/ })).toHaveClass('is-qua');
  });

  it('nút Đóng và bấm ra ngoài tờ lịch đều đóng; bấm trong tờ lịch không đóng', async () => {
    const dong = vi.fn();
    const { container } = render(<LichMvp kb={kb} s={ngay1()} onDong={dong} />);
    await userEvent.click(screen.getByRole('dialog'));
    expect(dong).not.toHaveBeenCalled();
    await userEvent.click(screen.getByRole('button', { name: 'Đóng lịch' }));
    expect(dong).toHaveBeenCalledTimes(1);
    await userEvent.click(container.querySelector('.mvp-lich') as HTMLElement);
    expect(dong).toHaveBeenCalledTimes(2);
  });

  it('mở đầu: không lộ lá thư hay buổi họp', () => {
    render(<LichMvp kb={kb} s={taoTrangThai(kb, 1)} onDong={vi.fn()} />);
    const lich = screen.getByRole('dialog');
    expect(lich).toHaveTextContent('Chủ nhật, 08/09/2024');
    expect(lich).not.toHaveTextContent(/họp|lá thư/i);
  });
});
