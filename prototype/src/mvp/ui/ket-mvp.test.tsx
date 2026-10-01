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

  it('không có màn tiêu đề (bản chơi thử chỉ MVP) → không có nút Về màn tiêu đề', () => {
    render(<KetMvp ketQua="that" onChoiLai={vi.fn()} />);
    expect(screen.queryByRole('button', { name: 'Về màn tiêu đề' })).toBeNull();
  });
});
