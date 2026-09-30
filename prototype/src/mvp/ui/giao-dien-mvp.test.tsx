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
import { SO_O_LUU_MVP, useKhoMvp } from '../store/kho-mvp';
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
    useKhoMvp.setState({ oLuu: Array.from({ length: SO_O_LUU_MVP }, () => null) });
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

  it('buổi họp chương 1: không có thanh uy tín (ĐÃ CHỐT C, 30/09/2026 — sai thì chọn lại, không mất vạch)', () => {
    const s = nhayToi(kb, 'hop-sua-or', 1);
    expect(khungNhin(kb, s).kind).toBe('fix-query');
    veManChoi(s);
    expect(thanhTren()).not.toHaveClass('mvp-topbar--uytin');
    expect(within(thanhTren()).queryByRole('img', { name: /Uy tín/ })).toBeNull();
  });

  it('ngày theo truyện: vé ghi tên ngày thay khung giờ', () => {
    const s = nhayToi(kb, 'lop', 1);
    veManChoi(s);
    expect(thanhTren().querySelector('.topbar__chapter-name')).toHaveTextContent('Tài khoản CLB');
  });
});

describe('hồ sơ + sổ cá nhân MVP (phong cách hòm đồ prototype)', () => {
  it('nút Hồ sơ → khung hòm đồ, tab Hồ sơ; có ô cho từng mục; bấm ô → thẻ chi tiết; Esc đóng', async () => {
    const s = nhayToi(kb, 'ten-h', 1);
    const tatCa = [...s.hoSo.manhMoi, ...s.hoSo.taiLieu, ...s.hoSo.bangChung];
    expect(tatCa.length).toBeGreaterThan(1);
    veManChoi(s);
    await userEvent.click(within(thanhTren()).getByRole('button', { name: /^Mở hồ sơ/ }));
    const hop = screen.getByRole('dialog', { name: 'Hồ sơ' });
    expect(hop).toHaveClass('inventory-frame');
    expect(within(hop).getByRole('tab', { name: 'Hồ sơ' })).toHaveAttribute('aria-selected', 'true');
    const o = within(within(hop).getByRole('group', { name: 'Các mục trong hồ sơ' })).getAllByRole('button');
    expect(o).toHaveLength(tatCa.length);
    for (const b of o) expect(b).toHaveAttribute('title');
    // Mục thứ hai có thẻ (mục đầu đang được chọn sẵn).
    const the = tatCa.map((id) => kb.hoSo[id]).filter((x) => x !== undefined)[1];
    if (!the) throw new Error('thiếu thẻ');
    const nut = within(hop).getByRole('button', { name: the.heading });
    expect(nut).toHaveAttribute('aria-pressed', 'false');
    await userEvent.click(nut);
    expect(nut).toHaveAttribute('aria-pressed', 'true');
    expect(within(hop.querySelector('.inv-details-content') as HTMLElement).getByRole('heading', { name: the.heading })).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: 'Hồ sơ' })).toBeNull();
  });

  it('lọc nhóm: Bằng chứng chỉ còn ô bằng chứng', async () => {
    const s = nhayToi(kb, 'hop-sua-or', 1);
    veManChoi(s);
    await userEvent.click(within(thanhTren()).getByRole('button', { name: /^Mở hồ sơ/ }));
    await userEvent.click(screen.getByRole('button', { name: `Bằng chứng (${s.hoSo.bangChung.length})` }));
    const o = within(screen.getByRole('group', { name: 'Các mục trong hồ sơ' })).getAllByRole('button');
    expect(o).toHaveLength(s.hoSo.bangChung.length);
  });

  it('nút Sổ tay → cùng khung, tab Sổ cá nhân, mỗi dòng đã học một thẻ; đổi tab được; nút Đóng đóng', async () => {
    // Dựng sổ có sẵn vài trang (như sau các [GHI SỔ] của phòng máy).
    const trang = Object.keys(kb.soTay).slice(0, 2);
    expect(trang.length).toBeGreaterThan(0);
    const s = { ...nhayToi(kb, 'hop-sua-or', 1), soTay: trang };
    veManChoi(s);
    await userEvent.click(within(thanhTren()).getByRole('button', { name: /^Mở sổ cá nhân/ }));
    const hop = screen.getByRole('dialog', { name: 'Sổ cá nhân' });
    expect(hop).toHaveClass('is-journal-mode');
    expect(within(hop).getAllByRole('listitem')).toHaveLength(s.soTay.length);
    await userEvent.click(within(hop).getByRole('tab', { name: 'Hồ sơ' }));
    expect(screen.getByRole('dialog', { name: 'Hồ sơ' })).toBeInTheDocument();
    const dong = screen.getByRole('button', { name: 'Đóng hồ sơ' });
    expect(dong).toHaveAttribute('title');
    await userEvent.click(dong);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('sổ trống: báo sổ còn trống', async () => {
    veManChoi(taoTrangThai(kb, 1));
    await userEvent.click(within(thanhTren()).getByRole('button', { name: /^Mở sổ cá nhân/ }));
    expect(screen.getByText(/Sổ còn trống/)).toBeInTheDocument();
  });
});

describe('Lưu / Nạp MVP (phong cách saveload prototype)', () => {
  it('Lưu: thẻ ô kẹp ảnh, mọi nút có aria-label + title; lưu ô trống → đóng, ô có dữ liệu', async () => {
    veManChoi(nhayToi(kb, 'lop', 1));
    await userEvent.click(within(thanhTren()).getByRole('button', { name: 'Mở menu tạm dừng' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Lưu tiến độ (Save)' }));
    const hop = screen.getByRole('dialog', { name: 'Lưu tiến độ' });
    expect(hop).toHaveClass('saveload-card');
    for (const b of screen.getAllByRole('button')) {
      if (!b.closest('.mvp-luunap')) continue;
      expect(b).toHaveAttribute('aria-label');
      expect(b).toHaveAttribute('title');
    }
    await userEvent.click(within(hop).getByRole('button', { name: 'Lưu vào ô 2 (trống)' }));
    expect(screen.queryByRole('dialog', { name: 'Lưu tiến độ' })).toBeNull();
    expect(useKhoMvp.getState().oLuu[1]?.nhan).toMatch(/Ngày 2/);
  });

  it('Lưu đè: hỏi xác nhận (nổi trên màn Lưu); Esc chỉ đóng hộp hỏi, màn Lưu còn', async () => {
    veManChoi(nhayToi(kb, 'lop', 1));
    act(() => useKhoMvp.getState().luuVaoO(0, 'Cũ'));
    await userEvent.click(within(thanhTren()).getByRole('button', { name: 'Mở menu tạm dừng' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Lưu tiến độ (Save)' }));
    await userEvent.click(screen.getByRole('button', { name: 'Ghi đè ô 1: Cũ' }));
    expect(screen.getByRole('alertdialog', { name: 'Ghi đè ô 1?' }).closest('.mvp-luunap__xacnhan')).not.toBeNull();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('alertdialog')).toBeNull();
    expect(screen.getByRole('dialog', { name: 'Lưu tiến độ' })).toBeInTheDocument();
    await userEvent.keyboard('{Escape}');
    expect(screen.queryByRole('dialog', { name: 'Lưu tiến độ' })).toBeNull();
  });

  it('Nạp: ô trống bị tắt; nạp ô có dữ liệu → trạng thái quay về', async () => {
    const s = nhayToi(kb, 'ten-h', 1);
    act(() => {
      useKhoMvp.getState().datTrangThai(s);
      useKhoMvp.getState().luuVaoO(3, 'Ngày 4');
    });
    veManChoi(taoTrangThai(kb, 2));
    await userEvent.click(within(thanhTren()).getByRole('button', { name: 'Mở menu tạm dừng' }));
    await userEvent.click(screen.getByRole('menuitem', { name: 'Nạp tiến độ (Load)' }));
    const hop = screen.getByRole('dialog', { name: 'Nạp tiến độ' });
    expect(within(hop).getByRole('button', { name: 'Ô 1 trống' })).toBeDisabled();
    await userEvent.click(within(hop).getByRole('button', { name: 'Nạp ô 4: Ngày 4' }));
    expect(useKhoMvp.getState().trangThai?.ngay).toBe(s.ngay);
    expect(screen.queryByRole('dialog', { name: 'Nạp tiến độ' })).toBeNull();
  });
});
