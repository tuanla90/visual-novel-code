/**
 * Sân khấu MVP: nhân vật chính (`player`) lên dàn chân dung khi nói (user yêu cầu 29/09), dùng ảnh đã tách nền
 * `char-nguoi-choi`, nhãn là tên người chơi; người kể (`narrator`) thì không.
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { SanKhauMvp } from './SanKhauMvp';

const kb = KICH_BAN_MVP as unknown as KichBanMvp;

describe('SanKhauMvp — nhân vật chính lên hình khi nói', () => {
  it('player nói → có chân dung mang tên người chơi, ảnh char-nguoi-choi, đang nói', () => {
    render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="player" tenNguoiChoi="An" />);
    const cd = screen.getByRole('img', { name: 'An' });
    expect(cd.getAttribute('data-art-source')).toBe('image');
    expect(cd.querySelector('img')?.getAttribute('src') ?? '').toContain('char-nguoi-choi');
    expect(cd.closest('.cast-member')?.getAttribute('data-speaking')).toBe('true');
  });

  it('chưa có tên → nhãn "Bạn"', () => {
    render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="player" />);
    expect(screen.getByRole('img', { name: 'Bạn' })).toBeInTheDocument();
  });

  it('người kể nói → không ai lên dàn', () => {
    const { container } = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="narrator" />);
    expect(container.querySelectorAll('.cast-member')).toHaveLength(0);
  });
});

describe('SanKhauMvp — biểu cảm riêng của MVP', () => {
  const anhCua = (container: HTMLElement): string => container.querySelector('.cast-member img')?.getAttribute('src') ?? '';

  it('Tùng worried (ngoài danh sách prototype) → ảnh char-tung-worried, không phải ảnh neo', () => {
    const { container } = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="tung" expression="worried" />);
    expect(anhCua(container)).toContain('char-tung-worried');
  });

  it('Minh Anh serious, bác Thịnh smile → ảnh MVP riêng', () => {
    const a = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="minh-anh" expression="serious" />);
    expect(anhCua(a.container)).toContain('char-minh-anh-serious');
    a.unmount();
    const b = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="bac-tu" expression="smile" />);
    expect(anhCua(b.container)).toContain('char-bac-tu-smile');
  });

  it('biểu cảm prototype đã biết (Hà Vy thinking) → vẫn đi qua Portrait của prototype', () => {
    const { container } = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="ha-vy" expression="thinking" />);
    expect(container.querySelector('.mvp-portrait')).toBeNull();
    expect(container.querySelector('.cast-member .portrait')).not.toBeNull();
  });
});

describe('SanKhauMvp — tối đa 3 người trên dàn', () => {
  const dan = (container: HTMLElement): string[] => [...container.querySelectorAll('.cast-member')].map((e) => e.getAttribute('data-nhan-vat') ?? '');

  it('người thứ tư nói → người nói lâu nhất trước đó rời dàn, người đang nói ở lại, người mới đứng vào chỗ trống', () => {
    const { container, rerender } = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="tung" />);
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="minh-anh" />);
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="ha-vy" />);
    // Tùng nói lại → người nói lâu nhất trước đó giờ là Minh Anh.
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="tung" />);
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="narrator" />);
    expect(dan(container)).toEqual(['tung', 'minh-anh', 'ha-vy']);
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="quan" />);
    expect(dan(container)).toEqual(['tung', 'quan', 'ha-vy']);
    expect(container.querySelector('.stage__portraits')?.getAttribute('data-so-nguoi')).toBe('3');
    expect(container.querySelector('[data-nhan-vat="quan"]')?.getAttribute('data-speaking')).toBe('true');
    // Người chơi nói → Hà Vy (nói lâu nhất trước đó: Hà Vy < Tùng < Quân) rời dàn.
    rerender(<SanKhauMvp kb={kb} canh="cong-truong" speaker="player" />);
    expect(dan(container)).toEqual(['tung', 'quan', 'player']);
  });

  it('đổi cảnh → dàn trống lại', () => {
    const { container, rerender } = render(<SanKhauMvp kb={kb} canh="cong-truong" speaker="tung" />);
    rerender(<SanKhauMvp kb={kb} canh="phong-clb" speaker="minh-anh" />);
    expect(dan(container)).toEqual(['minh-anh']);
  });
});
