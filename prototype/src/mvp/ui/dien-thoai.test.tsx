import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { ChonMucMvp } from './ChonMucMvp';
import { GHI_DIEN_THOAI, laDienThoai, mucNhapVaiTheoMay, mucSqlTheoMay } from './dien-thoai';

describe('điện thoại: ẩn hai mức phải gõ chữ', () => {
  it('nhận biết: cảm ứng thô và cạnh ngắn dưới 500 px; máy tính bảng và máy tính thì không', () => {
    expect(laDienThoai(812, 375, true)).toBe(true);
    expect(laDienThoai(375, 812, true)).toBe(true);
    expect(laDienThoai(1024, 768, true)).toBe(false);
    expect(laDienThoai(812, 375, false)).toBe(false);
    expect(laDienThoai(1280, 800, false)).toBe(false);
  });
  it('mức hiệu lực: "Như thật" thành "Tự dò", "Tự viết" thành "Ghép khối, chữ SQL"; mức khác giữ nguyên; máy tính giữ hết', () => {
    expect(mucNhapVaiTheoMay('that', true)).toBe('tu-do');
    expect(mucNhapVaiTheoMay('dan', true)).toBe('dan');
    expect(mucNhapVaiTheoMay('that', false)).toBe('that');
    expect(mucSqlTheoMay('tu-viet', true)).toBe('ghep-sql');
    expect(mucSqlTheoMay('ghep', true)).toBe('ghep');
    expect(mucSqlTheoMay('tu-viet', false)).toBe('tu-viet');
  });
  it('màn hai câu hỏi trên điện thoại: không có thẻ "Như thật" và "Tự viết", có dòng ghi, nấc đã lưu bị ẩn thì về nấc còn lại', async () => {
    const onXong = vi.fn();
    render(<ChonMucMvp nhapVai="that" sql="tu-viet" dienThoai onXong={onXong} />);
    expect(screen.queryByRole('radio', { name: 'Như thật' })).toBeNull();
    expect(screen.queryByRole('radio', { name: 'Tự viết' })).toBeNull();
    expect(screen.getByRole('radio', { name: 'Tự dò' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'Ghép khối, chữ SQL' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByText(GHI_DIEN_THOAI)).toBeInTheDocument();
    expect(GHI_DIEN_THOAI).not.toMatch(/[—→]/);
    await userEvent.click(screen.getByRole('button', { name: 'Bắt đầu' }));
    expect(onXong).toHaveBeenCalledWith('tu-do', 'ghep-sql');
  });
  it('máy tính: đủ ba thẻ mỗi câu, không có dòng ghi', () => {
    render(<ChonMucMvp nhapVai="that" sql="tu-viet" dienThoai={false} onXong={vi.fn()} />);
    expect(screen.getByRole('radio', { name: 'Như thật' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByRole('radio', { name: 'Tự viết' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.queryByText(GHI_DIEN_THOAI)).toBeNull();
  });
});
