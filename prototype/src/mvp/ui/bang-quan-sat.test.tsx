/**
 * Bảng người quan sát MVP (gói giao-dien-mvp): chỉ hiện với `?facilitator=1`; "Nhảy tới" hỏi xác nhận rồi dựng đúng
 * trạng thái như người chơi đã tới (máy tự chơi), màn SQL hiện ra, Lưu/Nạp bình thường.
 */
import { act, render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { khungNhin, taoTrangThai, TEN_MAC_DINH } from '../engine/may';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { SO_O_LUU_MVP, useKhoMvp } from '../store/kho-mvp';
import { ManChoiMvp } from './ManChoiMvp';

const kb = KICH_BAN_MVP as unknown as KichBanMvp;

function veManChoi(url: string, s: TrangThaiMvp = taoTrangThai(kb, 1)) {
  window.history.replaceState({}, '', url);
  act(() => useKhoMvp.getState().datTrangThai(s));
  return render(<ManChoiMvp onVeTieuDe={vi.fn()} />);
}
const trangThai = (): TrangThaiMvp => {
  const s = useKhoMvp.getState().trangThai;
  if (!s) throw new Error('kho trống');
  return s;
};

afterEach(() => {
  window.history.replaceState({}, '', '/');
  document.documentElement.classList.remove('facilitator-on');
  act(() => {
    useKhoMvp.getState().xoa();
    useKhoMvp.setState({ oLuu: Array.from({ length: SO_O_LUU_MVP }, () => null) });
  });
});

async function nhayToiQuaBang(nhan: string): Promise<void> {
  const bang = screen.getByRole('complementary', { name: 'Bảng người quan sát (MVP)' });
  await userEvent.click(within(bang).getByRole('button', { name: 'Mở bảng' }));
  await userEvent.click(within(bang).getByRole('button', { name: nhan }));
  await userEvent.click(within(screen.getByRole('alertdialog')).getByRole('button', { name: 'Nhảy tới' }));
  await waitFor(() => expect(within(bang).getByRole('status')).toHaveTextContent(/Đã tới/));
}

describe('bảng người quan sát MVP', () => {
  it('không có ?facilitator=1 → không có bảng, không chừa dải đáy', () => {
    veManChoi('/');
    expect(screen.queryByRole('complementary', { name: 'Bảng người quan sát (MVP)' })).toBeNull();
    expect(document.documentElement).not.toHaveClass('facilitator-on');
  });

  it('?facilitator=1 → có bảng thu gọn, chừa dải đáy; mở ra có bốn nút nhảy tới phần SQL', async () => {
    veManChoi('/?facilitator=1');
    const bang = screen.getByRole('complementary', { name: 'Bảng người quan sát (MVP)' });
    expect(document.documentElement).toHaveClass('facilitator-on');
    await userEvent.click(within(bang).getByRole('button', { name: 'Mở bảng' }));
    for (const nhan of ['Ngày 2 · Lớp ở tòa B và học Báo chí', 'Ngày 3 · Tên bắt đầu bằng H', 'Ngày 4 · Nhật ký in', 'Buổi họp · Sửa câu HOẶC của Quân']) {
      expect(within(bang).getByRole('button', { name: nhan })).toHaveAttribute('title');
    }
  });

  it('hủy xác nhận → không đổi ván', async () => {
    const dau = taoTrangThai(kb, 1);
    veManChoi('/?facilitator=1', dau);
    const bang = screen.getByRole('complementary', { name: 'Bảng người quan sát (MVP)' });
    await userEvent.click(within(bang).getByRole('button', { name: 'Mở bảng' }));
    await userEvent.click(within(bang).getByRole('button', { name: 'Ngày 2 · Lớp ở tòa B và học Báo chí' }));
    await userEvent.click(within(screen.getByRole('alertdialog')).getByRole('button', { name: 'Hủy' }));
    expect(trangThai()).toEqual(dau);
  });

  it('nhảy "Ngày 2 · Lớp …" → ngày 2, phòng tra c-lop mở ở mặt bảng điều tra (nút "Mở laptop"), thanh trên "2/5", tên mặc định', async () => {
    veManChoi('/?facilitator=1');
    await nhayToiQuaBang('Ngày 2 · Lớp ở tòa B và học Báo chí');
    const s = trangThai();
    expect(khungNhin(kb, s)).toMatchObject({ kind: 'challenge', thuThach: { id: 'c-lop' } });
    expect(s.ngay).toBe(2);
    expect(s.tenNguoiChoi).toBe(TEN_MAC_DINH);
    expect(screen.getByRole('banner', { name: 'Thanh trạng thái' }).querySelector('.topbar__chapter-number')).toHaveTextContent(`2/${kb.lich.ngay.length}`);
    const phong = document.querySelector('.phong-tra');
    expect(phong).toHaveAttribute('data-pha', 'bang');
    expect(within(phong as HTMLElement).getByRole('button', { name: /Mở laptop/ })).toBeInTheDocument();
  });

  it('nhảy "Buổi họp" → màn sửa truy vấn; Lưu rồi Nạp giữ nguyên chỗ', async () => {
    veManChoi('/?facilitator=1');
    await nhayToiQuaBang('Buổi họp · Sửa câu HOẶC của Quân');
    const s = trangThai();
    expect(khungNhin(kb, s)).toMatchObject({ kind: 'fix-query', thuThach: { id: 'c-sua-or-quan' } });
    // Buổi họp là màn chiếu: vào thẳng màn tra, không có bảng điều tra.
    expect(document.querySelector('.phong-tra')).toHaveAttribute('data-pha', 'may');
    expect(document.querySelector('.v7[data-canh="man-chieu"]')).not.toBeNull();
    act(() => {
      useKhoMvp.getState().luuVaoO(0, 'Buổi họp');
      useKhoMvp.getState().batDau();
    });
    act(() => {
      useKhoMvp.getState().napTuO(0);
    });
    expect(trangThai()).toEqual(s);
  });
});
