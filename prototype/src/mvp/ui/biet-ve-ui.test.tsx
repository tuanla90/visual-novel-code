/**
 * Gói B18: thẻ "Nhân vật mới" (GioiThieuMvp) và tab Nhân vật (NhanVatMvp) chỉ ghi ô đã biết: họ tên chưa biết → tên ngắn +
 * dòng "Họ tên: ?"; danh xưng / năm / ngành chưa biết → "?"; lịch, câu nói chưa biết → ẩn. Bộ MVP không khai → như cũ.
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MUA_1 } from '../engine/testing/mua1-truoc-b19/kich-ban.gen';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { GioiThieuMvp } from './GioiThieuMvp';
import { NhanVatMvp } from './NhanVatMvp';

const kb = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const kbMvp = KICH_BAN_MVP as unknown as KichBanMvp;

describe('GioiThieuMvp — thẻ chỉ ghi điều đã biết', () => {
  it('Tùng mới gặp: tiêu đề là tên ngắn "Tùng", không còn dòng "Họ tên: ?", vẫn ghi danh xưng, năm, ngành đã biết lúc gặp', () => {
    const { container } = render(<GioiThieuMvp kb={kb} nhanVat="tung" onDong={vi.fn()} />);
    expect(container.querySelector('.chara-debut__name')?.textContent).toBe('Tùng');
    expect(screen.queryByText('Họ tên: ?')).toBeNull();
    expect(screen.queryByText('Trần Tùng')).toBeNull();
    expect(container.querySelector('.chara-debut__role')?.textContent).toBe('Bạn cùng phòng 408');
    expect(screen.getByText('Năm nhất')).toBeInTheDocument();
    expect(screen.getByText('Du lịch')).toBeInTheDocument();
  });

  it('biết thêm họ tên (bietVe) → tiêu đề "Trần Tùng", hết dòng "Họ tên: ?"', () => {
    const { container } = render(<GioiThieuMvp kb={kb} nhanVat="tung" bietVe={{ tung: ['ho-ten'] }} onDong={vi.fn()} />);
    expect(container.querySelector('.chara-debut__name')?.textContent).toBe('Trần Tùng');
    expect(screen.queryByText('Họ tên: ?')).toBeNull();
  });

  it('Hiếu chưa biết gì: danh xưng "?", chip "Năm: ?", tiêu đề "Hiếu"', () => {
    const { container } = render(<GioiThieuMvp kb={kb} nhanVat="hieu" onDong={vi.fn()} />);
    expect(container.querySelector('.chara-debut__name')?.textContent).toBe('Hiếu');
    expect(container.querySelector('.chara-debut__role')?.textContent).toBe('?');
    expect(screen.getByText('Năm: ?')).toBeInTheDocument();
    expect(screen.queryByText('Sinh viên lớp BC24A')).toBeNull();
  });

  it('nhân vật không có ô ấy trong thẻ (Quân không có năm, ngành) → không vẽ chip "?"', () => {
    render(<GioiThieuMvp kb={kb} nhanVat="quan" onDong={vi.fn()} />);
    expect(screen.queryByText('Năm: ?')).toBeNull();
    expect(screen.queryByText('Ngành: ?')).toBeNull();
    expect(screen.queryByText('Họ tên: ?')).toBeNull();
  });

  it('bộ MVP (không khai "Biết lúc gặp") → thẻ ghi hết như cũ', () => {
    const { container } = render(<GioiThieuMvp kb={kbMvp} nhanVat="tung" onDong={vi.fn()} />);
    expect(container.querySelector('.chara-debut__name')?.textContent).toBe('Trần Tùng');
    expect(screen.queryByText('Họ tên: ?')).toBeNull();
  });
});

describe('NhanVatMvp — tab Nhân vật chỉ ghi điều đã biết', () => {
  it('Tùng mới gặp: tên ngắn (không dòng "Họ tên: ?"), KHÓA và NGÀNH đã biết; câu nói và "Thường gặp ở đâu" ẩn', () => {
    const { container } = render(<NhanVatMvp kb={kb} daGap={['tung']} />);
    expect(container.querySelector('.chara-profile__name')?.textContent).toBe('Tùng');
    expect(screen.queryByText('Họ tên: ?')).toBeNull();
    expect(container.querySelector('.chara-profile__role-tag')?.textContent).toBe('Bạn cùng phòng 408');
    expect(screen.getByText('Năm nhất')).toBeInTheDocument();
    expect(container.querySelector('.chara-profile__quote')).toBeNull();
    expect(screen.queryByText(/Thường gặp ở đâu/)).toBeNull();
  });

  it('bietVe đủ → họ tên, câu nói, lịch hiện ra', () => {
    const { container } = render(<NhanVatMvp kb={kb} daGap={['tung']} bietVe={{ tung: ['ho-ten', 'lich', 'cau-noi'] }} />);
    expect(container.querySelector('.chara-profile__name')?.textContent).toBe('Trần Tùng');
    expect(screen.queryByText('Họ tên: ?')).toBeNull();
    expect(container.querySelector('.chara-profile__quote')?.textContent).toContain('Tớ cá là mười phút là tới nơi.');
    expect(screen.getByText(/Thường gặp ở đâu/)).toBeInTheDocument();
  });

  it('Hiếu chưa biết gì: danh xưng "?", KHÓA "?"', () => {
    const { container } = render(<NhanVatMvp kb={kb} daGap={['hieu']} />);
    expect(container.querySelector('.chara-profile__role-tag')?.textContent).toBe('?');
    const khoa = [...container.querySelectorAll('.chara-profile__spec-item')].find((e) => e.textContent?.includes('KHÓA'));
    expect(khoa?.querySelector('dd')?.textContent).toBe('?');
  });

  it('bộ MVP → như cũ: họ tên đầy đủ và câu nói', () => {
    const { container } = render(<NhanVatMvp kb={kbMvp} daGap={['tung']} />);
    expect(container.querySelector('.chara-profile__name')?.textContent).toBe('Trần Tùng');
    expect(container.querySelector('.chara-profile__quote')).not.toBeNull();
  });
});
