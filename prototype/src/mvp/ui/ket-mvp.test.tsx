/**
 * Màn kết bản MVP: màn tra chỉ còn một cách nhập (kéo giấy nhớ) nên không còn câu hỏi so ba cách nhập; tiêu đề là câu
 * của truyện, không ghi "Kết thật:" / "Kết thường:" (chữ của người làm game).
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { clearTelemetry, getTelemetryEvents } from '../../shared/telemetry/track';
import { KetMvp } from './KetMvp';

beforeEach(() => clearTelemetry());

describe('màn kết MVP', () => {
  it('kết thật: tiêu đề là câu truyện, không có chữ "Kết thật", không hỏi cách nhập', () => {
    render(<KetMvp ketQua="that" onChoiLai={vi.fn()} onVeTieuDe={vi.fn()} />);
    const tieuDe = screen.getByRole('heading', { level: 2 });
    expect(tieuDe).toHaveTextContent('Người nộp không phải người viết');
    expect(tieuDe.textContent).not.toMatch(/Kết (thật|thường)/i);
    for (const ten of ['Kéo thả', 'Bấm khối', 'Gõ tay']) expect(screen.queryByRole('button', { name: ten })).toBeNull();
    expect(screen.queryByText(/cách nhập/i)).toBeNull();
    expect(getTelemetryEvents().some((e) => e.type === 'mvp_input_feedback')).toBe(false);
  });

  it('kết thường: tiêu đề khác; chỉ có Chơi lại / Về màn tiêu đề và gọi đúng hàm', async () => {
    const choiLai = vi.fn();
    const veTieuDe = vi.fn();
    render(<KetMvp ketQua="thuong" onChoiLai={choiLai} onVeTieuDe={veTieuDe} />);
    const tieuDe = screen.getByRole('heading', { level: 2 });
    expect(tieuDe).toHaveTextContent('Mới chỉ là một ý kiến sinh viên');
    expect(tieuDe.textContent).not.toMatch(/Kết (thật|thường)/i);
    expect(screen.getAllByRole('button').map((b) => b.textContent)).toEqual(['Chơi lại từ đầu', 'Về màn tiêu đề']);
    await userEvent.click(screen.getByRole('button', { name: 'Chơi lại từ đầu' }));
    await userEvent.click(screen.getByRole('button', { name: 'Về màn tiêu đề' }));
    expect(choiLai).toHaveBeenCalledTimes(1);
    expect(veTieuDe).toHaveBeenCalledTimes(1);
  });

  it('còn vụ sau: nút chính là "Tiếp tục vụ chính · Vụ 2: …", bấm gọi onSangVuSau; Chơi lại vẫn có', async () => {
    const sang = vi.fn();
    render(<KetMvp ketQua="that" vuKe={{ so: 2, ten: 'Bốn mục trong sổ đã ký' }} onSangVuSau={sang} onChoiLai={vi.fn()} />);
    expect(screen.getAllByRole('button').map((b) => b.textContent)).toEqual(['Tiếp tục vụ chính · Vụ 2: Bốn mục trong sổ đã ký', 'Chơi lại từ đầu']);
    await userEvent.click(screen.getByRole('button', { name: /Vụ 2: Bốn mục/ }));
    expect(sang).toHaveBeenCalledTimes(1);
  });

  it('màn kết của một vụ sau: chữ lấy từ lich.md, không dùng chữ của Vụ 1', () => {
    render(<KetMvp ketQua="that" vu={{ so: 2, ten: 'Bốn mục trong sổ đã ký', tieuDeKet: 'Bốn mục có trong sổ, không hơn', loiKet: 'Hai nguồn riêng cùng ra bốn buổi.' }} vuKe={null} onChoiLai={vi.fn()} />);
    expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Bốn mục có trong sổ, không hơn');
    expect(screen.getByText('Hết Vụ 2 — Bốn mục trong sổ đã ký')).toBeInTheDocument();
    expect(screen.getByText('Hai nguồn riêng cùng ra bốn buổi.')).toBeInTheDocument();
    expect(screen.queryByText(/Người nộp không phải người viết/)).toBeNull();
    expect(screen.getAllByRole('button').map((b) => b.textContent)).toEqual(['Chơi lại từ đầu']);
  });

  it('vụ sau có ảnh cg-ket-<mã vụ> thì màn kết hiện CG đó; vụ không có ảnh thì không hiện', () => {
    const { container, rerender } = render(<KetMvp ketQua="that" vu={{ id: 'vu2', so: 2, ten: 'Tin đồn', tieuDeKet: 'A', loiKet: 'B' }} vuKe={null} onChoiLai={vi.fn()} />);
    expect(container.querySelector('img.mvp-ket__cg')?.getAttribute('src')).toContain('cg-ket-vu2');
    rerender(<KetMvp ketQua="that" vu={{ id: 'vu-khong-co-anh', so: 9, ten: 'X', tieuDeKet: 'A', loiKet: 'B' }} vuKe={null} onChoiLai={vi.fn()} />);
    expect(container.querySelector('img.mvp-ket__cg')).toBeNull();
  });

  it('không có màn tiêu đề (bản chơi thử chỉ MVP) → không có nút Về màn tiêu đề', () => {
    render(<KetMvp ketQua="that" onChoiLai={vi.fn()} />);
    expect(screen.queryByRole('button', { name: 'Về màn tiêu đề' })).toBeNull();
  });
});
