import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { GioiThieuMvp } from './GioiThieuMvp';

const kb = KICH_BAN_MVP as unknown as KichBanMvp;

describe('GioiThieuMvp — Màn giới thiệu nhân vật mới trên MVP', () => {
  it('hiển thị thông tin Bác Thịnh với tên và danh xưng rõ ràng', () => {
    const handleDong = vi.fn();
    render(<GioiThieuMvp kb={kb} nhanVat="bac-tu" onDong={handleDong} />);

    expect(screen.getByText('NHÂN VẬT MỚI')).toBeInTheDocument();
    expect(screen.getByText('Bác Thịnh')).toBeInTheDocument();
    expect(screen.getByText('Bảo vệ giảng đường B')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Tiếp tục' })).toBeInTheDocument();
  });

  it('bấm nút Tiếp tục gọi onDong với mã nhân vật', async () => {
    const user = userEvent.setup();
    const handleDong = vi.fn();
    render(<GioiThieuMvp kb={kb} nhanVat="bac-tu" onDong={handleDong} />);

    const nutTiepTuc = screen.getByRole('button', { name: 'Tiếp tục' });
    await user.click(nutTiepTuc);

    expect(handleDong).toHaveBeenCalledTimes(1);
    expect(handleDong).toHaveBeenCalledWith('bac-tu');
  });

  it('nhân vật không có trong danh sách hoặc không có giới thiệu thì không render', () => {
    const handleDong = vi.fn();
    const { container } = render(<GioiThieuMvp kb={kb} nhanVat="khong-ton-tai" onDong={handleDong} />);
    expect(container.firstChild).toBeNull();
  });
});
