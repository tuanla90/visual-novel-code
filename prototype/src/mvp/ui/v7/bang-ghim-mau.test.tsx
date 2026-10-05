/**
 * Gói B14 mục B: chọn màu ghim bằng BẤM. Bấm đầu ghim thì dải màu mở và ở lại (rê chuột ra không đóng); chọn màu thì đổi màu và
 * đóng; bấm ra ngoài hoặc Esc chỉ đóng dải màu, thẻ vẫn mở; dùng được bằng bàn phím (Enter mở, mũi tên đi giữa các màu).
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { nhayToi } from '../../engine/tu-choi';
import { KICH_BAN as kb } from '../../store/kho-mvp';
import { BangGhimMvp } from './BangGhimMvp';

const bamThe = (el: HTMLElement): void => {
  fireEvent.pointerDown(el, { button: 0, pointerId: 1, clientX: 50, clientY: 50 });
  fireEvent.pointerUp(el, { pointerId: 1, clientX: 52, clientY: 51 });
};

function mo(o: { onGhim?: boolean } = {}) {
  const onDoiMau = vi.fn();
  const onGhim = vi.fn();
  render(<BangGhimMvp kb={kb} s={nhayToi(kb, 'ten-h', 1)} dienTen={(t) => t} onDoiMau={onDoiMau} {...(o.onGhim ? { onGhim } : {})} />);
  bamThe(screen.getByRole('article', { name: 'Mẩu tin: Tòa B' }));
  const xem = screen.getByRole('dialog', { name: 'Thẻ đang xem' });
  const ghim = within(xem).getByRole('button', { name: /^Đầu ghim / });
  return { onDoiMau, onGhim, xem, ghim, u: userEvent.setup() };
}
const daiMau = (): HTMLElement | null => screen.queryByRole('radiogroup', { name: 'Chọn màu đầu ghim' });

describe('chọn màu ghim bằng bấm (gói B14)', () => {
  it('rê chuột lên đầu ghim không mở gì; bấm mới mở, rê chuột ra dải màu vẫn ở lại', async () => {
    const { ghim, u } = mo();
    fireEvent.mouseEnter(ghim.parentElement as HTMLElement);
    await u.hover(ghim);
    expect(daiMau()).toBeNull();
    await u.click(ghim);
    expect(daiMau()).not.toBeNull();
    expect(ghim).toHaveAttribute('aria-expanded', 'true');
    fireEvent.mouseLeave(ghim.parentElement as HTMLElement);
    await u.unhover(ghim);
    expect(daiMau()).not.toBeNull();
    expect(within(daiMau() as HTMLElement).getAllByRole('radio')).toHaveLength(5);
  });

  it('chọn một màu → onDoiMau(thẻ, màu), dải màu đóng, thẻ vẫn mở, tiêu điểm về đầu ghim', async () => {
    const { onDoiMau, ghim, u } = mo();
    await u.click(ghim);
    await u.click(screen.getByRole('radio', { name: /^Ghim lục/ }));
    expect(onDoiMau).toHaveBeenCalledWith('clue-toa-b', 'luc');
    expect(daiMau()).toBeNull();
    expect(screen.getByRole('dialog', { name: 'Thẻ đang xem' })).toBeInTheDocument();
    expect(ghim).toHaveFocus();
  });

  it('bấm ra ngoài (thân thẻ, rồi nền) chỉ đóng dải màu; bấm nền lần nữa mới đóng thẻ', async () => {
    const { onDoiMau, xem, ghim, u } = mo();
    await u.click(ghim);
    await u.click(xem.querySelector('.bang__xem-the-than') as HTMLElement);
    expect(daiMau()).toBeNull();
    expect(screen.getByRole('dialog', { name: 'Thẻ đang xem' })).toBeInTheDocument();
    await u.click(ghim);
    expect(daiMau()).not.toBeNull();
    await u.click(xem);
    expect(daiMau()).toBeNull();
    expect(screen.getByRole('dialog', { name: 'Thẻ đang xem' })).toBeInTheDocument();
    await u.click(xem);
    expect(screen.queryByRole('dialog', { name: 'Thẻ đang xem' })).toBeNull();
    expect(onDoiMau).not.toHaveBeenCalled();
  });

  it('bàn phím: Enter mở và đứng ở màu đang chọn; mũi tên đi giữa các màu; Enter chọn; Esc đóng dải màu trước, rồi mới đóng thẻ', async () => {
    const { onDoiMau, ghim, u } = mo();
    ghim.focus();
    await u.keyboard('{Enter}');
    const mau = within(daiMau() as HTMLElement).getAllByRole('radio');
    const dangChon = mau.findIndex((m) => m.getAttribute('aria-checked') === 'true');
    expect(dangChon).toBeGreaterThanOrEqual(0);
    expect(mau[dangChon]).toHaveFocus();
    await u.keyboard('{ArrowRight}');
    expect(mau[(dangChon + 1) % mau.length]).toHaveFocus();
    await u.keyboard('{ArrowLeft}{ArrowLeft}');
    expect(mau[(dangChon - 1 + mau.length) % mau.length]).toHaveFocus();
    await u.keyboard('{Enter}');
    expect(onDoiMau).toHaveBeenCalledTimes(1);
    expect(daiMau()).toBeNull();

    await u.keyboard('{Enter}');
    expect(daiMau()).not.toBeNull();
    await u.keyboard('{Escape}');
    expect(daiMau()).toBeNull();
    expect(screen.getByRole('dialog', { name: 'Thẻ đang xem' })).toBeInTheDocument();
    await u.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: 'Thẻ đang xem' })).toBeNull();
  });

  it('khung Hồ sơ (có onGhim): dải màu kèm nút "Gỡ khỏi bảng"', async () => {
    const { onGhim, ghim, u } = mo({ onGhim: true });
    await u.click(ghim);
    await u.click(screen.getByRole('button', { name: 'Gỡ khỏi bảng' }));
    expect(onGhim).toHaveBeenCalledWith('clue-toa-b', false);
    expect(screen.queryByRole('dialog', { name: 'Thẻ đang xem' })).toBeNull();
  });
});
