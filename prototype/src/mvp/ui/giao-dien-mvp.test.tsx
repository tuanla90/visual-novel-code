/**
 * Giao diện MVP mang phong cách prototype (gói giao-dien-mvp): thanh trên (lớp `.topbar*`), hồ sơ, sổ cá nhân, Lưu/Nạp.
 * Mỗi nút chỉ biểu tượng có `aria-label` + `title`; popup mở/đóng được, Esc đóng.
 */
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { useVnStore } from '../../shared/vn/vn-store';
import { khungNhin, taoTrangThai } from '../engine/may';
import { nhayToi } from '../engine/tu-choi';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { useKhoMvp } from '../store/kho-mvp';
import { ManChoiMvp } from './ManChoiMvp';

const kb = KICH_BAN_MVP as unknown as KichBanMvp;

function veManChoi(s: TrangThaiMvp) {
  act(() => useKhoMvp.getState().datTrangThai(s));
  return render(<ManChoiMvp onVeTieuDe={vi.fn()} />);
}
const thanhTren = (): HTMLElement => screen.getByRole('banner', { name: 'Thanh trạng thái' });

afterEach(() => {
  act(() => {
    useKhoMvp.getState().xoa();
    useVnStore.getState().setViewportMode('desktop');
  });
});

describe('thanh trên MVP (phong cách .topbar của prototype)', () => {
  it('dùng lớp .topbar: vé ngày + vạch ngày, viên nhiệm vụ, nhóm nút con nhộng', () => {
    veManChoi(taoTrangThai(kb, 1));
    const hdr = thanhTren();
    expect(hdr).toHaveClass('topbar');
    expect(hdr.querySelector('.topbar__chapter-number')).toHaveTextContent(`0/${kb.lich.ngay.length}`);
    expect(hdr.querySelectorAll('.topbar__pip')).toHaveLength(kb.lich.ngay.length);
    expect(hdr.querySelector('.topbar__task-label')).toHaveTextContent('Nhiệm vụ');
    expect(hdr.querySelector('.topbar__capsule-group')).not.toBeNull();
  });

  it('mọi nút có aria-label + title', () => {
    veManChoi(taoTrangThai(kb, 1));
    const nut = within(thanhTren()).getAllByRole('button');
    expect(nut.length).toBeGreaterThanOrEqual(4);
    for (const b of nut) {
      expect(b).toHaveAttribute('aria-label');
      expect(b).toHaveAttribute('title');
    }
  });

  it('ngày đang chơi: vé "n/5", vạch trước là xong, vạch hiện tại sáng', () => {
    const s = nhayToi(kb, 'ten-h', 1);
    veManChoi(s);
    const hdr = thanhTren();
    expect(hdr.querySelector('.topbar__chapter-number')).toHaveTextContent(`${s.ngay}/${kb.lich.ngay.length}`);
    const vach = [...hdr.querySelectorAll('.topbar__pip')];
    expect(vach.filter((v) => v.classList.contains('is-done'))).toHaveLength(s.ngay - 1);
    expect(vach[s.ngay - 1]).toHaveClass('is-current');
  });

  it('menu: mở bằng nút ≡, có Lịch sử / Lưu / Nạp / Về tiêu đề / Bắt đầu lại; Esc đóng', async () => {
    veManChoi(taoTrangThai(kb, 1));
    const nutMenu = within(thanhTren()).getByRole('button', { name: 'Mở menu tạm dừng' });
    expect(nutMenu).toHaveAttribute('aria-expanded', 'false');
    await userEvent.click(nutMenu);
    const menu = screen.getByRole('menu', { name: 'Menu tạm dừng' });
    for (const ten of ['Lịch sử thoại', 'Lưu tiến độ (Save)', 'Nạp tiến độ (Load)', 'Về màn tiêu đề', 'Bắt đầu lại bản MVP']) {
      expect(within(menu).getByRole('menuitem', { name: ten })).toBeInTheDocument();
    }
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('menu')).toBeNull();
    expect(within(thanhTren()).getByRole('button', { name: 'Mở menu tạm dừng' })).toHaveAttribute('aria-expanded', 'false');
  });

  it('menu: bấm ra ngoài thì đóng; chọn Lưu → mở màn Lưu, menu đóng', async () => {
    veManChoi(taoTrangThai(kb, 1));
    await userEvent.click(within(thanhTren()).getByRole('button', { name: 'Mở menu tạm dừng' }));
    await userEvent.click(thanhTren().querySelector('.topbar__task') as HTMLElement);
    expect(screen.queryByRole('menu')).toBeNull();
    await userEvent.click(within(thanhTren()).getByRole('button', { name: 'Mở menu tạm dừng' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Lưu tiến độ (Save)' }));
    expect(screen.getByRole('dialog', { name: 'Lưu tiến độ' })).toBeInTheDocument();
    expect(screen.queryByRole('menu')).toBeNull();
  });

  it('buổi họp: thanh uy tín đủ vạch nằm trong thanh trên', () => {
    const s = nhayToi(kb, 'hop-sua-or', 1);
    expect(khungNhin(kb, s).kind).toBe('fix-query');
    veManChoi(s);
    const uyTin = within(thanhTren()).getByRole('img', { name: /Uy tín/ });
    expect(uyTin.querySelectorAll('.mvp-uytin__o')).toHaveLength(kb.lich.luat.uyTin ?? 0);
  });
});
