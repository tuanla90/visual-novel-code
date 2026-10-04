// @vitest-environment jsdom
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { KICH_BAN as kb } from '../../store/kho-mvp';
import { XemTruocBangModal } from './XemTruocBangModal';
import { ManTraV7 } from './ManTraV7';

describe('XemTruocBangModal — Khảo sát dữ liệu & Xem trước cột mới khi JOIN', () => {
  it('khảo sát bảng đơn: hiển thị tiêu đề, câu SELECT và các cột gốc', async () => {
    const onDong = vi.fn();
    render(
      <XemTruocBangModal
        duLieu={kb.duLieu!}
        tenBangGoc="don_linh_kien"
        onDong={onDong}
      />,
    );

    expect(screen.getByRole('dialog', { name: 'Khảo sát dữ liệu' })).toBeInTheDocument();
    expect(screen.getByText(/Khảo sát bảng dữ liệu:/)).toBeInTheDocument();

    await waitFor(
      () => {
        expect(screen.getByText('ma_don')).toBeInTheDocument();
        expect(screen.getByText('linh_kien')).toBeInTheDocument();
        expect(screen.getByText('ma_phien')).toBeInTheDocument();
      },
      { timeout: 10000 },
    );

    // Bấm nút đóng
    await userEvent.click(screen.getByRole('button', { name: /Đóng bảng xem trước/ }));
    expect(onDong).toHaveBeenCalled();
  });

  it('khảo sát JOIN: hiển thị các cột mới từ bảng nối và gắn nhãn "mới"', async () => {
    const onDong = vi.fn();
    render(
      <XemTruocBangModal
        duLieu={kb.duLieu!}
        tenBangGoc="don_linh_kien"
        tenBangNoi="phien_dang_nhap"
        khoaNoi="ma_phien"
        onDong={onDong}
      />,
    );

    expect(screen.getByText(/Khảo sát kết quả JOIN:/)).toBeInTheDocument();

    await waitFor(() => {
      // Cột gốc
      expect(screen.getByText('ma_don')).toBeInTheDocument();
      // Cột mới từ phien_dang_nhap
      expect(screen.getByText('may')).toBeInTheDocument();
      expect(screen.getByText('gio')).toBeInTheDocument();
      // Tag "mới" cho cột mới
      const tags = screen.getAllByText('mới');
      expect(tags.length).toBeGreaterThan(0);
    });

    // Bấm phím Escape đóng modal
    await userEvent.keyboard('{Escape}');
    expect(onDong).toHaveBeenCalled();
  });

  it('ManTraV7: bài c-don-nam-may có nút xem trước, bấm mở modal khảo sát bảng nối', async () => {
    const the = kb.thuThach['c-don-nam-may'];
    expect(the).toBeDefined();

    render(
      <ManTraV7
        kb={kb}
        duLieu={kb.duLieu}
        the={the!}
        mode="challenge"
        canh="phong-clb"
        giayNho={[]}
        dienTen={(t) => t}
        onXong={vi.fn()}
      />,
    );

    // Nút xem trước tồn tại trên màn hình
    const nutXemTruoc = screen.getByRole('button', { name: 'Xem trước dữ liệu mẫu' });
    expect(nutXemTruoc).toBeInTheDocument();

    // Bấm nút xem trước để mở modal
    await userEvent.click(nutXemTruoc);

    // Modal xuất hiện
    const dialog = await screen.findByRole('dialog', { name: 'Khảo sát dữ liệu' });
    expect(dialog).toBeInTheDocument();
    expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent(/Khảo sát bảng dữ liệu:\s*don_linh_kien/);

    // Đóng modal
    await userEvent.click(screen.getByRole('button', { name: /Đã hiểu & Quay lại dựng câu/ }));
    expect(screen.queryByRole('dialog', { name: 'Khảo sát dữ liệu' })).not.toBeInTheDocument();
  });
});
