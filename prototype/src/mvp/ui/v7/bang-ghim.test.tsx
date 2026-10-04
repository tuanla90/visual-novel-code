/**
 * Bảng ghim (ĐÃ CHỐT B.1–B.2, 30/09/2026) vẽ từ `dungBang` trên ván chương 1 THẬT: số thẻ, số sợi chỉ theo loại, hình
 * dạng theo loại, phiếu có giá trị bị gạch, bấm thẻ (nhấn không nhích) mở chi tiết, kéo thẻ gọi `onDoiCho`.
 * jsdom không đo được kích thước nên bảng vẽ theo khung gốc 1600×900 (tỉ lệ 1).
 */
import { fireEvent, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { nhayToi } from '../../engine/tu-choi';
import { KICH_BAN as kb } from '../../store/kho-mvp';
import { BangGhimMvp } from './BangGhimMvp';

const bamThe = (el: HTMLElement): void => {
  fireEvent.pointerDown(el, { button: 0, pointerId: 1, clientX: 50, clientY: 50 });
  fireEvent.pointerUp(el, { pointerId: 1, clientX: 52, clientY: 51 });
};

describe('bảng ghim', () => {
  it('ngày 4: mỗi mục một thẻ + thẻ câu hỏi; 3 sợi đỏ (truy vấn) + 1 sợi cam (loại trừ); hình dạng theo loại', () => {
    const s = nhayToi(kb, 'nhat-ky-in', 1);
    render(<BangGhimMvp kb={kb} s={s} dienTen={(t) => t} />);
    const bang = screen.getByRole('region', { name: 'Bảng điều tra' });
    const soMuc = s.hoSo.taiLieu.length + s.hoSo.manhMoi.length + s.hoSo.bangChung.length;
    expect(bang.querySelectorAll('article.the')).toHaveLength(soMuc + 1);
    expect(bang.querySelectorAll('.the--tai-lieu')).toHaveLength(s.hoSo.taiLieu.length);
    expect(bang.querySelectorAll('.the--phieu')).toHaveLength(3);
    expect(bang.querySelectorAll('.the--vat')).toHaveLength(1);
    expect(bang.querySelectorAll('.the--hoi')).toHaveLength(1);
    expect(bang.querySelectorAll('.the--tin')).toHaveLength(s.hoSo.manhMoi.length);
    expect(bang.querySelectorAll('.the--tin.is-khong-du-lieu').length).toBeGreaterThan(0);
    expect(bang.querySelectorAll('path.bang__chi--truy-van')).toHaveLength(3);
    expect(bang.querySelectorAll('path.bang__chi--loai-tru')).toHaveLength(1);
    // Phiếu hai mã: SV240228 bị gạch (sổ niêm phong), SV240317 không.
    const haiMa = within(bang).getByRole('article', { name: 'Phiếu kết quả: Hai mã ứng viên kèm căn cứ' });
    expect(within(haiMa).getByText('SV240228')).toHaveClass('is-gach');
    expect(within(haiMa).getByText('SV240317')).not.toHaveClass('is-gach');
    expect(within(bang).getByRole('article', { name: `Câu hỏi đang mở: ${s.nhiemVu}` })).toBeInTheDocument();
  });

  it('bấm thẻ (không nhích) → hộp chi tiết; phiếu bị loại ghi "Đã loại"; Đóng / bấm nền thì tắt', async () => {
    render(<BangGhimMvp kb={kb} s={nhayToi(kb, 'nhat-ky-in', 1)} dienTen={(t) => t} />);
    bamThe(screen.getByRole('article', { name: 'Phiếu kết quả: Hai mã ứng viên kèm căn cứ' }));
    const xem = screen.getByRole('dialog', { name: 'Thẻ đang xem' });
    expect(within(xem).getByText('Đã loại: SV240228')).toBeInTheDocument();
    await userEvent.click(within(xem).getByRole('button', { name: 'Đóng' }));
    expect(screen.queryByRole('dialog', { name: 'Thẻ đang xem' })).toBeNull();

    bamThe(screen.getByRole('article', { name: /^Câu hỏi đang mở/ }));
    const hoi = screen.getByRole('dialog', { name: 'Thẻ đang xem' });
    expect(hoi.querySelector('.bang__xem-hoi')).toHaveTextContent('Lá thư được in từ tài khoản nào?');
    await userEvent.click(hoi);
    expect(screen.queryByRole('dialog', { name: 'Thẻ đang xem' })).toBeNull();
  });

  it('kéo thẻ quá 6px → onDoiCho(mã, chỗ mới), không mở chi tiết; không có onDoiCho thì kéo không làm gì', () => {
    const s = nhayToi(kb, 'ten-h', 1);
    const onDoiCho = vi.fn();
    const { unmount } = render(<BangGhimMvp kb={kb} s={s} dienTen={(t) => t} onDoiCho={onDoiCho} />);
    const the = screen.getByRole('article', { name: 'Mẩu tin: Tòa B' });
    const x0 = parseFloat(the.style.left);
    const y0 = parseFloat(the.style.top);
    fireEvent.pointerDown(the, { button: 0, pointerId: 1, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(the, { pointerId: 1, clientX: 60, clientY: 130 });
    expect(the).toHaveClass('is-keo');
    fireEvent.pointerUp(the, { pointerId: 1, clientX: 60, clientY: 130 });
    expect(onDoiCho).toHaveBeenCalledWith('clue-toa-b', x0 - 40, y0 + 30);
    expect(screen.queryByRole('dialog', { name: 'Thẻ đang xem' })).toBeNull();
    unmount();

    render(<BangGhimMvp kb={kb} s={s} dienTen={(t) => t} />);
    const the2 = screen.getByRole('article', { name: 'Mẩu tin: Tòa B' });
    fireEvent.pointerDown(the2, { button: 0, pointerId: 1, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(the2, { pointerId: 1, clientX: 200, clientY: 200 });
    fireEvent.pointerUp(the2, { pointerId: 1, clientX: 200, clientY: 200 });
    expect(the2.style.left).toBe(`${x0}px`);
    expect(screen.queryByRole('dialog', { name: 'Thẻ đang xem' })).toBeNull();
  });

  it('chỗ đã kéo trong ván (s.bang.viTri) được dùng; `them` + `moi` vẽ phiếu sắp ghim kèm sợi mới', () => {
    const s0 = nhayToi(kb, 'ten-h', 1);
    const s = { ...s0, bang: { day: {}, viTri: { 'clue-chu-ky-h': { x: 777, y: 333 } } } };
    render(<BangGhimMvp kb={kb} s={s} dienTen={(t) => t} them={{ id: 'ev-hai-ma', dung: ['ev-hai-lop', 'clue-chu-ky-h'] }} moi="ev-hai-ma" />);
    const h = screen.getByRole('article', { name: 'Mẩu tin: H' });
    expect(h.style.left).toBe('777px');
    expect(h.style.top).toBe('333px');
    expect(screen.getByRole('article', { name: 'Phiếu kết quả: Hai mã ứng viên kèm căn cứ' })).toHaveClass('is-moi');
    expect(document.querySelectorAll('.bang__chi--truy-van.is-moi')).toHaveLength(2);
  });

  it('sau khi thả thẻ đã kéo, thẻ giữ nguyên vị trí mới và không bị tự động sắp xếp lại về vị trí cũ', () => {
    const s = nhayToi(kb, 'ten-h', 1);
    const onDoiCho = vi.fn();
    render(<BangGhimMvp kb={kb} s={s} dienTen={(t) => t} onDoiCho={onDoiCho} />);
    const the = screen.getByRole('article', { name: 'Mẩu tin: Tòa B' });
    const x0 = parseFloat(the.style.left);
    const y0 = parseFloat(the.style.top);

    // Kéo thẻ
    fireEvent.pointerDown(the, { button: 0, pointerId: 1, clientX: 100, clientY: 100 });
    fireEvent.pointerMove(the, { pointerId: 1, clientX: 160, clientY: 180 });
    // Thả thẻ
    fireEvent.pointerUp(the, { pointerId: 1, clientX: 160, clientY: 180 });

    expect(onDoiCho).toHaveBeenCalledWith('clue-toa-b', x0 + 60, y0 + 80);
    // Vị trí vẫn được ghim ở chỗ mới, không giật về chỗ cũ
    expect(the.style.left).toBe(`${x0 + 60}px`);
    expect(the.style.top).toBe(`${y0 + 80}px`);
  });

  it('bảng trống (chưa có gì trong hồ sơ, không nhiệm vụ) → "Bảng còn trống."', () => {
    const s = { ...nhayToi(kb, 'lop', 1), hoSo: { manhMoi: [], taiLieu: [], bangChung: [] }, nhiemVu: null };
    render(<BangGhimMvp kb={kb} s={s} dienTen={(t) => t} />);
    expect(screen.getByText('Bảng còn trống.')).toBeInTheDocument();
  });
});
