import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { CharaProfileView } from './CharaProfileView';

describe('CharaProfileView — Hồ sơ nhân vật chuẩn Visual Novel', () => {
  it('hiển thị đầy đủ thông tin của nhân vật mặc định (Minh Anh)', () => {
    render(<CharaProfileView initialCharacterId="minh-anh" />);

    expect(screen.getByRole('navigation', { name: /Danh sách nhân vật/i })).toBeInTheDocument();
    expect(screen.getByText('Lê Minh Anh')).toBeInTheDocument();
    expect(screen.getByText('Chủ nhiệm CLB Thám tử Dữ liệu')).toBeInTheDocument();
    expect(screen.getByText(/Kinh tế Quốc tế/)).toBeInTheDocument();
    expect(screen.getByText(/Dữ liệu không biết nói dối/)).toBeInTheDocument();
  });

  it('cho phép chuyển đổi qua lại giữa các nhân vật', async () => {
    const user = userEvent.setup();
    render(<CharaProfileView initialCharacterId="minh-anh" />);

    // Chuyển sang Hà Vy
    const haVyTab = screen.getByRole('button', { name: /Hà Vy/ });
    await user.click(haVyTab);

    expect(screen.getByText('Trần Hà Vy')).toBeInTheDocument();
    expect(screen.getByText('Chuyên gia Phân tích Dữ liệu')).toBeInTheDocument();
    expect(screen.getByText(/SELECT chọn cột, FROM chọn bảng/)).toBeInTheDocument();
  });

  it('cho phép bấm chuyển đổi giữa các biểu cảm của nhân vật', async () => {
    const user = userEvent.setup();
    render(<CharaProfileView initialCharacterId="minh-anh" />);

    // Kiểm tra danh sách nút biểu cảm
    const worriedBtn = screen.getByRole('button', { name: /Biểu cảm: worried/i });
    expect(worriedBtn).toBeInTheDocument();

    await user.click(worriedBtn);
    expect(worriedBtn).toHaveClass('is-active');
  });
});
