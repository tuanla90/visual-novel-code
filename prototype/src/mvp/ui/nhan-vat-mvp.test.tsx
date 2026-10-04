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

  it('bà bán trà đá có data-character="ba-lua" trên container và không có băng dính washi tape', () => {
    const { container } = render(<NhanVatMvp kb={kb} daGap={['ba-lua']} />);
    const profile = container.querySelector('.chara-profile') as HTMLElement;
    expect(profile).toHaveAttribute('data-character', 'ba-lua');

    // Băng dính washi tape đã được loại bỏ theo yêu cầu thiết kế mới
    expect(container.querySelector('.chara-profile__tape')).toBeNull();
  });

  it('bấm vào ảnh Polaroid để đổi biểu cảm: nhãn tiếng Việt rõ ràng, lật qua các biểu cảm', () => {
    const { container } = render(<NhanVatMvp kb={kb} daGap={['tung']} />);
    const polaroid = container.querySelector('.chara-profile__polaroid') as HTMLElement;
    expect(polaroid).toBeInTheDocument();
    expect(polaroid).toHaveClass('is-interactive');

    // Ban đầu là biểu cảm đầu tiên (neutral -> Bình thường)
    expect(screen.getByText('Bình thường')).toBeInTheDocument();

    // Bấm vào ảnh -> chuyển sang happy (Vui)
    fireEvent.click(polaroid);
    expect(screen.getByText('Vui')).toBeInTheDocument();

    // Bấm tiếp -> worried (Lo lắng)
    fireEvent.click(polaroid);
    expect(screen.getByText('Lo lắng')).toBeInTheDocument();

    // Hỗ trợ phím Enter để đổi biểu cảm
    fireEvent.keyDown(polaroid, { key: 'Enter' });
    expect(screen.getByText('Ngạc nhiên')).toBeInTheDocument();
  });

  it('chuyển đổi nhân vật hiển thị nền tương ứng theo bối cảnh', () => {
    const { container } = render(<NhanVatMvp kb={kb} daGap={['tung', 'bac-tu', 'ba-lua']} />);
    const layArtWrap = () => container.querySelector('.chara-profile__art-wrap') as HTMLElement;

    // Tùng ở KTX
    expect(layArtWrap().style.backgroundImage).toMatch(/phong-ktx/);

    // Bấm chọn Bác Thịnh
    const bacTuBtn = screen.getByRole('button', { name: /Bác Thịnh/ });
    fireEvent.click(bacTuBtn);
    expect(layArtWrap().style.backgroundImage).toMatch(/sanh-toa-b/);

    // Bấm chọn Bà bán trà đá
    const baLuaBtn = screen.getByRole('button', { name: /Bà bán trà đá/ });
    fireEvent.click(baLuaBtn);
    expect(layArtWrap().style.backgroundImage).toMatch(/tra-da/);
  });
});
