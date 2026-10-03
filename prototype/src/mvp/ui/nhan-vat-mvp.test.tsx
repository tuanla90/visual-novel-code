import { render, screen, fireEvent } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { KICH_BAN as kb } from '../store/kho-mvp';
import { NhanVatMvp } from './NhanVatMvp';

describe('NhanVatMvp — Hồ sơ nhân vật MVP', () => {
  it('hiển thị nền quán trà đá chuẩn bối cảnh cho Bà bán trà đá', () => {
    const { container } = render(<NhanVatMvp kb={kb} daGap={['ba-lua']} />);
    const artWrap = container.querySelector('.chara-profile__art-wrap') as HTMLElement;
    expect(artWrap).toBeInTheDocument();
    // Bối cảnh phải là quán trà đá (bg-mvp-tra-da) chứ không phải phòng CLB
    expect(artWrap.style.backgroundImage).toMatch(/tra-da/);
    expect(artWrap.style.backgroundImage).not.toMatch(/phong-clb/);
  });

  it('bà bán trà đá có data-character="ba-lua" trên container và preview biểu cảm', () => {
    const { container } = render(<NhanVatMvp kb={kb} daGap={['ba-lua']} />);
    const profile = container.querySelector('.chara-profile') as HTMLElement;
    expect(profile).toHaveAttribute('data-character', 'ba-lua');

    const preview = container.querySelector('.chara-profile__expr-preview') as HTMLElement;
    expect(preview).toHaveAttribute('data-character', 'ba-lua');
  });

  it('các biểu cảm đặc biệt của Tùng hiển thị nhãn tiếng Việt rõ ràng, không vỡ chuỗi raw', () => {
    const { container } = render(<NhanVatMvp kb={kb} daGap={['tung']} />);
    // Các biểu cảm của Tùng
    expect(screen.getByText('Áo xanh')).toBeInTheDocument();
    expect(screen.getByText('Áo xanh (Vui)')).toBeInTheDocument();
    expect(screen.getByText('Gãi đầu')).toBeInTheDocument();
    expect(screen.getByText('Chỉ tay')).toBeInTheDocument();
    expect(screen.getByText('Đội mũ')).toBeInTheDocument();

    // Dải biểu cảm có overflow-x cho phép cuộn ngang
    const exprList = container.querySelector('.chara-profile__expr-list');
    expect(exprList).toBeInTheDocument();
  });

  it('chuyển đổi nhân vật hiển thị nền tương ứng theo bối cảnh', () => {
    const { container } = render(<NhanVatMvp kb={kb} daGap={['tung', 'bac-tu', 'ba-lua']} />);
    const artWrap = container.querySelector('.chara-profile__art-wrap') as HTMLElement;

    // Tùng ở KTX
    expect(artWrap.style.backgroundImage).toMatch(/phong-ktx/);

    // Bấm chọn Bác Thịnh
    const bacTuBtn = screen.getByRole('button', { name: /Bác Thịnh/ });
    fireEvent.click(bacTuBtn);
    expect(artWrap.style.backgroundImage).toMatch(/sanh-toa-b/);

    // Bấm chọn Bà bán trà đá
    const baLuaBtn = screen.getByRole('button', { name: /Bà bán trà đá/ });
    fireEvent.click(baLuaBtn);
    expect(artWrap.style.backgroundImage).toMatch(/tra-da/);
  });
});
