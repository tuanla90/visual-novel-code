import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { CharacterDebutSplash } from './CharacterDebutSplash';

describe('CharacterDebutSplash — Hiệu ứng xuất hiện nhân vật mới full picture', () => {
  it('hiển thị đầy đủ thông tin nhân vật xuất hiện lần đầu (Minh Anh)', () => {
    const handleDismiss = vi.fn();
    render(<CharacterDebutSplash characterId="minh-anh" onDismiss={handleDismiss} />);

    expect(screen.getByText('NHÂN VẬT MỚI')).toBeInTheDocument();
    expect(screen.getByText('Lê Minh Anh')).toBeInTheDocument();
    expect(screen.getByText('Chủ nhiệm CLB Thám tử Dữ liệu')).toBeInTheDocument();
  });

  it('gọi onDismiss khi người dùng bấm chuột vào màn hình', async () => {
    const user = userEvent.setup();
    const handleDismiss = vi.fn();
    render(<CharacterDebutSplash characterId="minh-anh" onDismiss={handleDismiss} />);

    await user.click(screen.getByRole('dialog'));
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('gọi onDismiss khi người dùng nhấn phím Space hoặc Enter', async () => {
    const user = userEvent.setup();
    const handleDismiss = vi.fn();
    render(<CharacterDebutSplash characterId="minh-anh" onDismiss={handleDismiss} />);

    await user.keyboard('{Enter}');
    expect(handleDismiss).toHaveBeenCalledTimes(1);
  });

  it('đưa tiêu điểm vào nút Tiếp tục để modal dùng được bằng bàn phím', () => {
    render(<CharacterDebutSplash characterId="minh-anh" onDismiss={() => {}} />);

    expect(screen.getByRole('button', { name: 'Tiếp tục' })).toHaveFocus();
  });

  it('đặt thẻ chữ sang bên phải (is-text-right) cho Quân và Hà Vy để không che nhân vật đứng bên trái', () => {
    const { container: cQuan } = render(<CharacterDebutSplash characterId="quan" onDismiss={() => {}} />);
    const cardQuan = cQuan.querySelector('.chara-debut__card--intro');
    expect(cardQuan).toHaveClass('is-text-right');
    expect(cardQuan).not.toHaveClass('is-text-left');

    const { container: cHaVy } = render(<CharacterDebutSplash characterId="ha-vy" onDismiss={() => {}} />);
    const cardHaVy = cHaVy.querySelector('.chara-debut__card--intro');
    expect(cardHaVy).toHaveClass('is-text-right');
    expect(cardHaVy).not.toHaveClass('is-text-left');
  });

  it('thiết lập đồng bộ cả 3 biến CSS accent, grad và glow từ accentColor', () => {
    render(<CharacterDebutSplash characterId="minh-anh" onDismiss={() => {}} />);
    const dialog = screen.getByRole('dialog');
    const styleAttr = dialog.getAttribute('style') ?? '';
    expect(styleAttr).toContain('--debut-accent: #f87171');
    expect(styleAttr).toContain('--debut-accent-grad:');
    expect(styleAttr).toContain('--debut-accent-glow:');
  });
});
