/**
 * Gói B17: màn hai câu hỏi hiện sau "Chơi mới" ở bộ mùa 1 (không hiện ở bộ MVP); chọn rồi "Bắt đầu" thì ván mới mang hai mức, lần
 * "Chơi mới" sau chọn sẵn nấc cũ. Bộ nội dung của kho (`KICH_BAN`) chốt lúc nạp mô-đun theo `sessionStorage`, nên mỗi bộ nạp
 * mô-đun riêng (`vi.resetModules`).
 */
import { act, cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterEach, describe, expect, it, vi } from 'vitest';

async function napBo(bo: 'mvp' | 'mua-1') {
  vi.resetModules();
  sessionStorage.clear();
  sessionStorage.setItem('clb_bo_noi_dung', bo);
  const kho = await import('../store/kho-mvp');
  const { TieuDeMvp } = await import('./TieuDeMvp');
  act(() => kho.useKhoMvp.getState().xoa());
  return { kho, TieuDeMvp };
}

afterEach(() => {
  cleanup();
  sessionStorage.clear();
});

describe('"Chơi mới" và màn hai câu hỏi', () => {
  it('bộ MVP: bấm "Chơi mới" là vào ván ngay, không có màn hỏi', async () => {
    const { TieuDeMvp, kho } = await napBo('mvp');
    expect(kho.KICH_BAN.dieuHuongTuDo).not.toBe(true);
    const onVao = vi.fn();
    render(<TieuDeMvp onVao={onVao} />);
    await userEvent.setup().click(screen.getByRole('button', { name: 'Chơi mới' }));
    expect(onVao).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('dialog')).toBeNull();
  });

  it('bộ mùa 1: "Chơi mới" mở màn hỏi (chọn sẵn Tự dò + Ghép khối); "Bắt đầu" vào ván với hai mức đã chọn; lần sau chọn sẵn nấc cũ', async () => {
    const { TieuDeMvp, kho } = await napBo('mua-1');
    expect(kho.KICH_BAN.dieuHuongTuDo).toBe(true);
    const u = userEvent.setup();
    const onVao = vi.fn();
    const { unmount } = render(<TieuDeMvp onVao={onVao} />);
    await u.click(screen.getByRole('button', { name: 'Chơi mới' }));
    expect(onVao).not.toHaveBeenCalled();
    const hop = screen.getByRole('dialog');
    expect(hop).toHaveTextContent('Cậu muốn nhập vai thám tử tới mức nào?');
    expect(hop).toHaveTextContent('Cậu muốn tra dữ liệu tới mức nào?');
    expect(screen.getByRole('radio', { name: 'Tự dò' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'Ghép khối' })).toHaveAttribute('aria-checked', 'true');
    await u.click(screen.getByRole('radio', { name: 'Như thật' }));
    await u.click(screen.getByRole('radio', { name: 'Tự viết' }));
    await u.click(screen.getByRole('button', { name: 'Bắt đầu' }));
    expect(onVao).toHaveBeenCalledWith(true);
    expect(screen.queryByRole('dialog')).toBeNull();
    expect(kho.docMucDaChon()).toEqual({ nhapVai: 'that', sql: 'tu-viet' });
    // App gọi batDau sau onVao(true): ván mới mang hai mức.
    act(() => kho.useKhoMvp.getState().batDau());
    expect(kho.useKhoMvp.getState().trangThai).toMatchObject({ mucNhapVai: 'that', mucSql: 'tu-viet' });
    unmount();
    // Lần "Chơi mới" sau (có ván → xác nhận xóa trước) chọn sẵn nấc cũ.
    render(<TieuDeMvp onVao={onVao} />);
    await u.click(screen.getByRole('button', { name: 'Chơi mới' }));
    await u.click(screen.getByRole('button', { name: 'Xóa và chơi mới' }));
    expect(screen.getByRole('radio', { name: 'Như thật' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'Tự viết' })).toHaveAttribute('aria-checked', 'true');
  });

  it('bộ mùa 1, chưa chọn gì (máy tự chơi, công cụ quay): ván mới không có hai trường', async () => {
    const { kho } = await napBo('mua-1');
    act(() => kho.useKhoMvp.getState().batDau());
    const s = kho.useKhoMvp.getState().trangThai!;
    expect(s.mucNhapVai).toBeUndefined();
    expect(s.mucSql).toBeUndefined();
  });
});
