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

  it('hiển thị bóng chat hội thoại đối đầu cho cg-hop-doi-dau (JoJo)', () => {
    render(<AnhChenMvp id="cg-hop-doi-dau" onTiep={vi.fn()} />);
    expect(screen.getByText('Quân')).toBeInTheDocument();
    expect(screen.getByText('Ồ? Thay vì nhận thua, cậu lại dám bước lên đối chất sao?')).toBeInTheDocument();
    expect(screen.getByText('Bạn')).toBeInTheDocument();
    expect(screen.getByText('Không bước lên, sao bẻ được câu truy vấn của anh!')).toBeInTheDocument();
    expect(screen.queryByText('ゴゴゴ MENACING…')).toBeNull();
  });

  it('hiển thị 2 câu cho cg-quan-bi-bac (Kaiba) không tiếng Anh và không che mặt', () => {
    render(<AnhChenMvp id="cg-quan-bi-bac" onTiep={vi.fn()} />);
    expect(screen.getByText('Quân')).toBeInTheDocument();
    expect(screen.getByText('Không thể nào! Kết luận của tôi… bay màu rồi?!')).toBeInTheDocument();
    expect(screen.getByText('BÁC BỎ HOÀN TOÀN!')).toBeInTheDocument();
    expect(screen.queryByText('IT SHOULD HAVE BEEN ME!')).toBeNull();
    expect(screen.queryByText('595 DÒNG → 2 DÒNG!')).toBeNull();
  });
});
