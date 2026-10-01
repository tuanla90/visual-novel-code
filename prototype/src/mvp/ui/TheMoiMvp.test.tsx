/**
 * Thẻ mới vào hồ sơ (thay toast chữ): thẻ thu nhỏ hiện rồi bay đi (trong test NHIP = 0 nên hết ngay), nhiều thẻ xếp chồng
 * (tối đa 3 tờ + "+n thẻ nữa"), lời cho trình đọc màn hình ở `role="status"`; so hồ sơ trước/sau (`maMoi`); nhãn "MỚI" trong
 * khung Hồ sơ cho thẻ chưa xem, bấm thẻ thì mất; màn chơi thật báo khi hồ sơ có thêm thẻ.
 */
import { act, fireEvent, render, screen, waitFor, within } from '@testing-library/react';
import { useCallback, useState } from 'react';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { taoTrangThai } from '../engine/may';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { nhayToi } from '../engine/tu-choi';
import { KICH_BAN as kb, SO_O_LUU_MVP, useKhoMvp } from '../store/kho-mvp';
import { HoSoMvp } from './HoSoMvp';
import { ManChoiMvp } from './ManChoiMvp';
import { maMoi, theMoiTuMa, useTheChuaXem, type TheMoi } from './the-moi';
import { TheMoiMvp } from './TheMoiMvp';

const GIAY_NHO: TheMoi = { id: 'clue-gia-1', loai: 'tin', nhan: '[Tòa B]', anh: null };
const PHIEU: TheMoi = { id: 'ev-gia-2', loai: 'phieu', nhan: 'Hai lớp: BC24A, BC23A', anh: null };

/** Giống ManChoiMvp: hết hoạt ảnh thì nơi gọi bỏ đợt thẻ. */
function KhungThu({ danhSach }: { danhSach: TheMoi[] }) {
  const [ds, setDs] = useState(danhSach);
  const xong = useCallback(() => setDs([]), []);
  return ds.length > 0 ? <TheMoiMvp danhSach={ds} dienTen={(t) => t} onXong={xong} /> : null;
}

afterEach(() => {
  act(() => {
    useTheChuaXem.setState({ chuaXem: [] });
    useKhoMvp.getState().xoa();
    useKhoMvp.setState({ oLuu: Array.from({ length: SO_O_LUU_MVP }, () => null) });
  });
});

describe('TheMoiMvp', () => {
  it('một thẻ: hiện loại + tiêu đề (bỏ ngoặc vuông) + dấu "Thẻ mới", lời đọc ở status; hết hoạt ảnh thì biến mất', async () => {
    render(<KhungThu danhSach={[GIAY_NHO]} />);
    expect(screen.getByRole('status')).toHaveTextContent('Hồ sơ có thẻ mới: Tòa B.');
    expect(screen.getByText('Giấy nhớ')).toBeInTheDocument();
    expect(screen.getByText('Tòa B')).toBeInTheDocument();
    expect(screen.getByText('Thẻ mới')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText('Tòa B')).toBeNull());
    expect(screen.queryByRole('status')).toBeNull();
  });

  it('hai thẻ: xếp chồng, tờ đầu nằm trên cùng (phần tử cuối), dấu "2 thẻ mới"; onXong gọi đúng một lần', async () => {
    const onXong = vi.fn();
    const { container } = render(<TheMoiMvp danhSach={[GIAY_NHO, PHIEU]} dienTen={(t) => t} onXong={onXong} />);
    expect(screen.getByRole('status')).toHaveTextContent('Hồ sơ có 2 thẻ mới: Tòa B; Hai lớp: BC24A, BC23A.');
    expect(screen.getByText('2 thẻ mới')).toBeInTheDocument();
    expect(screen.getByText('Phiếu tra cứu')).toBeInTheDocument();
    const to = container.querySelectorAll('.the-moi__the');
    expect(to).toHaveLength(2);
    expect(to[1]).toHaveClass('the-moi__the--tin');
    expect(to[0]).toHaveClass('the-moi__the--phieu');
    await waitFor(() => expect(onXong).toHaveBeenCalledTimes(1));
    // Đã chuyển sang pha bay (jsdom không đo được nút Hồ sơ → bay theo hướng mặc định).
    expect(container.querySelector('.the-moi')).toHaveClass('is-bay', 'is-bay-mac-dinh');
  });

  it('năm thẻ: chỉ vẽ 3 tờ, ghi "+2 thẻ nữa"; lời đọc vẫn đủ 5', () => {
    const ds = Array.from({ length: 5 }, (_, i): TheMoi => ({ id: `clue-${i}`, loai: 'tin', nhan: `Mẩu ${i}`, anh: null }));
    const { container } = render(<TheMoiMvp danhSach={ds} dienTen={(t) => t} onXong={vi.fn()} />);
    expect(container.querySelectorAll('.the-moi__the')).toHaveLength(3);
    expect(screen.getByText('+2 thẻ nữa')).toBeInTheDocument();
    expect(screen.getByRole('status')).toHaveTextContent('Hồ sơ có 5 thẻ mới: Mẩu 0; Mẩu 1; Mẩu 2; Mẩu 3; Mẩu 4.');
  });
});

describe('maMoi / theMoiTuMa', () => {
  const hs = (manhMoi: string[], taiLieu: string[] = [], bangChung: string[] = []) => ({ manhMoi, taiLieu, bangChung });

  it('trả mã vừa thêm theo thứ tự; không đổi → rỗng; mất thẻ (nạp / chơi lại) → null', () => {
    expect(maMoi(hs(['clue-a']), hs(['clue-a', 'clue-b'], ['doc-c']))).toEqual(['clue-b', 'doc-c']);
    expect(maMoi(null, hs(['clue-a']))).toEqual(['clue-a']);
    expect(maMoi(hs(['clue-a']), hs(['clue-a']))).toEqual([]);
    expect(maMoi(hs(['clue-a', 'clue-b']), hs(['clue-a']))).toBeNull();
    expect(maMoi(hs(['clue-a']), null)).toBeNull();
  });

  it('dựng dữ liệu vẽ từ bảng điều tra thật (loại theo hình dạng trên bảng)', () => {
    const s = nhayToi(kb, 'ten-h', 1);
    const ds = theMoiTuMa(kb, s, ['clue-toa-b', 'ma-khong-co']);
    expect(ds).toEqual([{ id: 'clue-toa-b', loai: 'tin', nhan: expect.stringContaining('Tòa B'), anh: null }]);
  });
});

describe('nhãn MỚI trong khung Hồ sơ', () => {
  const ve = (s: TrangThaiMvp, tab: 'ho-so' | 'so-tay' = 'ho-so') =>
    render(
      <HoSoMvp
        kb={kb}
        trangThai={s}
        hoSo={s.hoSo}
        soTay={s.soTay}
        tenNguoiChoi="An"
        nganh="Kế toán"
        daGap={[]}
        tab={tab}
        onDoiTab={vi.fn()}
        dienTen={(t) => t}
        onDong={vi.fn()}
      />,
    );

  it('thẻ chưa xem có dấu MỚI trên bảng; mở khung = đã xem hết (kho trống) nhưng nhãn còn tới khi bấm thẻ', () => {
    const s = nhayToi(kb, 'ten-h', 1);
    act(() => useTheChuaXem.getState().them(['clue-toa-b']));
    ve(s);
    expect(useTheChuaXem.getState().chuaXem).toEqual([]);
    const the = screen.getByRole('article', { name: 'Mẩu tin: Tòa B (mới)' });
    expect(within(the).getByText('MỚI')).toBeInTheDocument();
    fireEvent.pointerDown(the, { button: 0, pointerId: 1, clientX: 50, clientY: 50 });
    fireEvent.pointerUp(the, { pointerId: 1, clientX: 50, clientY: 50 });
    expect(screen.getByRole('dialog', { name: 'Thẻ đang xem' })).toBeInTheDocument();
    expect(screen.getByRole('article', { name: 'Mẩu tin: Tòa B' })).toBeInTheDocument();
    expect(screen.queryByText('MỚI')).toBeNull();
  });

  it('đang ở tab khác: tab Bảng điều tra ghi số thẻ mới', () => {
    const s = nhayToi(kb, 'ten-h', 1);
    act(() => useTheChuaXem.getState().them(['clue-toa-b', 'ma-khong-trong-ho-so']));
    ve(s, 'so-tay');
    expect(screen.getByRole('tab', { name: /Bảng điều tra/ })).toHaveTextContent('1 mới');
  });
});

describe('màn chơi: hồ sơ có thêm thẻ', () => {
  it('thêm một giấy nhớ → thẻ thu nhỏ hiện rồi đi; thẻ vào danh sách chưa xem; không còn toast chữ cũ', async () => {
    const s0 = taoTrangThai(kb, 1);
    act(() => useKhoMvp.getState().datTrangThai(s0));
    render(<ManChoiMvp onVeTieuDe={vi.fn()} />);
    expect(document.querySelector('.the-moi')).toBeNull();
    act(() => useKhoMvp.getState().datTrangThai({ ...s0, hoSo: { ...s0.hoSo, manhMoi: ['clue-toa-b'] } }));
    expect(useTheChuaXem.getState().chuaXem).toEqual(['clue-toa-b']);
    expect(document.querySelector('.the-moi [role="status"]')).toHaveTextContent(/^Hồ sơ có thẻ mới: .*Tòa B/);
    expect(screen.queryByText('Bảng điều tra có thêm thẻ mới.')).toBeNull();
    // NHIP = 0: hoạt ảnh xong ngay sau một vòng hẹn giờ — chờ tới khi thẻ biến mất.
    await waitFor(() => expect(document.querySelector('.the-moi')).toBeNull());
    // Chơi lại (hồ sơ mất thẻ) → không báo, bỏ danh sách chưa xem.
    act(() => useKhoMvp.getState().datTrangThai(taoTrangThai(kb, 1)));
    expect(document.querySelector('.the-moi')).toBeNull();
    expect(useTheChuaXem.getState().chuaXem).toEqual([]);
  });
});
