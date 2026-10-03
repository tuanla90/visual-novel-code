import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { AnhChenMvp } from './AnhChenMvp';

describe('AnhChenMvp', () => {
  it('hiển thị ảnh và nút Tiếp tục, bấm Tiếp tục gọi onTiep', async () => {
    const onTiep = vi.fn();
    render(<AnhChenMvp id="chibi-408-vali" onTiep={onTiep} />);

    expect(screen.getByRole('dialog')).toBeInTheDocument();
    const nutTiep = screen.getByRole('button', { name: 'Tiếp tục' });
    expect(nutTiep).toBeInTheDocument();
    expect(screen.queryByRole('button', { name: 'Lùi' })).toBeNull();

    await userEvent.click(nutTiep);
    expect(onTiep).toHaveBeenCalledTimes(1);
  });

  it('khi có onBack, hiển thị nút Lùi và bấm Lùi gọi onBack', async () => {
    const onTiep = vi.fn();
    const onBack = vi.fn();
    render(<AnhChenMvp id="chibi-408-vali" onTiep={onTiep} onBack={onBack} />);

    const nutLui = screen.getByRole('button', { name: 'Lùi' });
    expect(nutLui).toBeInTheDocument();

    await userEvent.click(nutLui);
    expect(onBack).toHaveBeenCalledTimes(1);
    expect(onTiep).not.toHaveBeenCalled();
  });

  it('nhấn phím mũi tên trái hoặc Backspace gọi onBack', () => {
    const onTiep = vi.fn();
    const onBack = vi.fn();
    render(<AnhChenMvp id="chibi-408-vali" onTiep={onTiep} onBack={onBack} />);

    fireEvent.keyDown(window, { key: 'ArrowLeft' });
    expect(onBack).toHaveBeenCalledTimes(1);

    fireEvent.keyDown(window, { key: 'Backspace' });
    expect(onBack).toHaveBeenCalledTimes(2);
    expect(onTiep).not.toHaveBeenCalled();
  });

  it('hiển thị chú thích meme và chữ đè lên ảnh cho cg-hop-doi-dau (JoJo)', () => {
    render(<AnhChenMvp id="cg-hop-doi-dau" onTiep={vi.fn()} />);
    expect(screen.getByText('Ồ? Thay vì nhận thua, cậu lại dám tiến lại gần tôi sao?')).toBeInTheDocument();
    expect(screen.getByText('ゴゴゴ MENACING…')).toBeInTheDocument();
    expect(screen.getByText('Không bước lại gần sao bẻ được câu lệnh của anh!')).toBeInTheDocument();
  });

  it('hiển thị chú thích meme và chữ đè lên ảnh cho cg-quan-bi-bac (Kaiba)', () => {
    render(<AnhChenMvp id="cg-quan-bi-bac" onTiep={vi.fn()} />);
    expect(screen.getByText('KHÔNG THỂ NÀO! KẾT LUẬN CỦA TÔI… BAY MÀU RỒI?!')).toBeInTheDocument();
    expect(screen.getByText('BÁC BỎ HOÀN TOÀN!')).toBeInTheDocument();
    expect(screen.getByText('IT SHOULD HAVE BEEN ME!')).toBeInTheDocument();
    expect(screen.getByText('595 DÒNG → 2 DÒNG!')).toBeInTheDocument();
  });
});
