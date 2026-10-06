/**
 * Gói B15 (mục F, bộ mùa 1): đóng thẻ "Nhân vật mới" là sang câu kế luôn. Trước đây đóng thẻ xong màn vẫn đứng ở chính câu tự
 * xưng (chỉ đổi thẻ tên), người chơi phải bấm "Tiếp tục" thêm lần nữa và đọc lại câu cũ.
 * Kho của màn chơi chọn bộ nội dung lúc nạp mô-đun, nên đặt khóa bộ mùa 1 TRƯỚC mọi import (vi.hoisted).
 * Cũng thử nút hết ngày của cảnh khám phá (mục A) qua giao diện thật: có bước hỏi lại khi còn nơi chưa ghé.
 */
import { act, render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { afterAll, afterEach, describe, expect, it, vi } from 'vitest';

vi.hoisted(() => {
  sessionStorage.setItem('clb_bo_noi_dung', 'mua-1');
});

import { canGioiThieu, dieuHuongTuDo, khungNhin, taoTrangThai, xuLy } from '../engine/may';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { choiTuDong, RE_NHANH_KET_THAT, reNhanhTheo } from '../engine/tu-choi';
import { KICH_BAN as kb, useKhoMvp } from '../store/kho-mvp';
import { KhamPhaMvp } from './KhamPhaMvp';
import { ManChoiMvp } from './ManChoiMvp';

const CT = { ten: 'Nam', reNhanh: reNhanhTheo(RE_NHANH_KET_THAT) };

function veManChoi(s: TrangThaiMvp) {
  act(() => useKhoMvp.getState().datTrangThai(s));
  return render(<ManChoiMvp onVeTieuDe={vi.fn()} />);
}

afterEach(() => {
  act(() => useKhoMvp.getState().xoa());
});
afterAll(() => {
  sessionStorage.removeItem('clb_bo_noi_dung');
});

describe('gói B15 · F: đóng thẻ "Nhân vật mới" thì đi tiếp', () => {
  it('bộ mùa 1: bấm "Tiếp tục" ở câu tự xưng → thẻ bật; đóng thẻ → ghi nhận và sang câu kế, không phải bấm lại câu cũ', async () => {
    expect(dieuHuongTuDo(kb)).toBe(true);
    // Chơi tới câu đầu tiên cần bật thẻ giới thiệu.
    const s = choiTuDong(kb, taoTrangThai(kb, 1), CT, (st, kn) => !!canGioiThieu(kb, st, kn), 20000);
    const kn = khungNhin(kb, s);
    if (kn.kind !== 'line') throw new Error(`đang ở ${kn.kind}`);
    const nhanVat = canGioiThieu(kb, s, kn)!;
    const sauCauNay = xuLy(kb, xuLy(kb, s, { type: 'da-gioi-thieu', nhanVat }), { type: 'tiep' });

    veManChoi(s);
    const u = userEvent.setup();
    expect(screen.queryByRole('dialog', { name: /Giới thiệu nhân vật/ })).toBeNull();
    await u.click(screen.getByRole('button', { name: 'Tiếp tục' }));
    const the = screen.getByRole('dialog', { name: /^Giới thiệu nhân vật: / });
    // Thẻ đang mở thì truyện chưa chạy.
    expect(useKhoMvp.getState().trangThai?.conTro).toEqual(s.conTro);

    await u.click(within(the).getByRole('button', { name: /Tiếp tục/ }));
    expect(screen.queryByRole('dialog', { name: /Giới thiệu nhân vật/ })).toBeNull();
    const sau = useKhoMvp.getState().trangThai!;
    expect(sau.daGioiThieu).toContain(nhanVat);
    // Đã sang đúng bước kế của truyện (như bấm "Tiếp tục" thêm một lần ở bản cũ).
    expect(sau.conTro).toEqual(sauCauNay.conTro);
    expect(sau.conTro).not.toEqual(s.conTro);
    expect(khungNhin(kb, sau)).toEqual(khungNhin(kb, sauCauNay));
  });
});

describe('gói B15 · A, B: nút hết ngày và ghim đã ghé trên cảnh khám phá', () => {
  const banDoNgay2 = (): TrangThaiMvp => choiTuDong(kb, taoTrangThai(kb, 1), CT, (_s, kn) => kn.kind === 'explore' && kn.nut.id === 'kp-bd-n2', 20000);

  it('còn nơi có dấu chưa ghé: bấm nút hết ngày thì hỏi lại; "Ở lại đã" đóng câu hỏi, "Hết ngày" mới hết ngày', async () => {
    const s = banDoNgay2();
    const kn = khungNhin(kb, s);
    if (kn.kind !== 'explore') throw new Error(kn.kind);
    const onHetNgay = vi.fn();
    render(<KhamPhaMvp kb={kb} id={kn.nut.id} canh={s.canh} diem={kn.diem} kieu={kn.nut.kieu} onXem={vi.fn()} hetNgay={{ nhan: 'Về phòng KTX ăn tối', conChuaGhe: 2 }} onHetNgay={onHetNgay} />);
    const u = userEvent.setup();
    const nut = screen.getByRole('button', { name: 'Về phòng KTX ăn tối' });
    expect(nut).toHaveClass('mvp-canh__het-ngay-nut');
    await u.click(nut);
    expect(onHetNgay).not.toHaveBeenCalled();
    const hoi = screen.getByRole('alertdialog', { name: 'Hết ngày khi còn nơi chưa ghé' });
    expect(hoi).toHaveTextContent('Còn 2 nơi chưa ghé. Hết ngày luôn chứ?');
    await u.click(within(hoi).getByRole('button', { name: 'Ở lại đã' }));
    expect(screen.queryByRole('alertdialog')).toBeNull();
    expect(onHetNgay).not.toHaveBeenCalled();
    await u.click(nut);
    await u.click(within(screen.getByRole('alertdialog')).getByRole('button', { name: 'Hết ngày' }));
    expect(onHetNgay).toHaveBeenCalledTimes(1);
  });

  it('đã ghé hết: bấm là hết ngày luôn; không truyền `hetNgay` thì không có nút', async () => {
    const s = banDoNgay2();
    const kn = khungNhin(kb, s);
    if (kn.kind !== 'explore') throw new Error(kn.kind);
    const onHetNgay = vi.fn();
    const { rerender } = render(<KhamPhaMvp kb={kb} id={kn.nut.id} canh={s.canh} diem={kn.diem} kieu={kn.nut.kieu} onXem={vi.fn()} hetNgay={{ nhan: 'Về phòng KTX ăn tối', conChuaGhe: 0 }} onHetNgay={onHetNgay} />);
    await userEvent.setup().click(screen.getByRole('button', { name: 'Về phòng KTX ăn tối' }));
    expect(screen.queryByRole('alertdialog')).toBeNull();
    expect(onHetNgay).toHaveBeenCalledTimes(1);
    rerender(<KhamPhaMvp kb={kb} id={kn.nut.id} canh={s.canh} diem={kn.diem} kieu={kn.nut.kieu} onXem={vi.fn()} hetNgay={null} onHetNgay={onHetNgay} />);
    expect(screen.queryByRole('button', { name: 'Về phòng KTX ăn tối' })).toBeNull();
  });

  it('ghim đã ghé mà vào lại được thì bấm được; ghim đã ghé thường thì vẫn khóa', async () => {
    const s = banDoNgay2();
    const kn = khungNhin(kb, s);
    if (kn.kind !== 'explore') throw new Error(kn.kind);
    const onXem = vi.fn();
    const diem = kn.diem.map((d) => (d.diem.chuoi === 'n2-co-hanh' ? { ...d, daXem: true, vaoLai: true } : d.diem.chuoi === 'n2-bd-toa-b' ? { ...d, daXem: true } : d.diem.chuoi === 'n2-bd-cang-tin' ? { ...d, daXem: true, vaoLai: true, xemHet: true } : d));
    render(<KhamPhaMvp kb={kb} id={kn.nut.id} canh={s.canh} diem={diem} kieu={kn.nut.kieu} onXem={onXem} />);
    const daGhe = screen.getByRole('button', { name: /^Phòng Đào tạo.*đã ghé, vào lại được/ });
    expect(daGhe).toBeEnabled();
    expect(daGhe).toHaveClass('is-xong', 'is-vao-lai');
    await userEvent.setup().click(daGhe);
    expect(onXem).toHaveBeenCalledWith('n2-co-hanh');
    expect(daGhe.querySelector('.mvp-dau--het')).toBeNull();
    expect(screen.getByRole('button', { name: /^Sảnh tòa B.*đã ghé$/ })).toBeDisabled();
    // Nơi đã xem hết mọi chỗ: ghim mang dấu tích, vẫn bấm được.
    const xemHet = screen.getByRole('button', { name: /^Căng tin.*đã ghé, đã xem hết, vào lại được/ });
    expect(xemHet).toBeEnabled();
    expect(xemHet.querySelector('.mvp-dau--het')).not.toBeNull();
  });

  it('màn chơi thật: chờ hết ngày ở phòng CLB → có nút hết ngày, bấm (không còn nơi chưa ghé) là sang buổi tối', async () => {
    let s = choiTuDong(kb, taoTrangThai(kb, 1), CT, (_s, kn) => kn.kind === 'challenge' && kn.thuThach.id === 'c-lop', 20000);
    s = xuLy(kb, s, { type: 'xong-thu-thach', thuThach: 'c-lop' });
    for (let i = 0; i < 40 && khungNhin(kb, s).kind !== 'explore'; i++) s = xuLy(kb, s, { type: 'tiep' });
    expect(khungNhin(kb, s)).toMatchObject({ kind: 'explore', hetNgay: { nhan: 'Về phòng KTX ăn tối', conChuaGhe: 0 } });
    veManChoi(s);
    expect(screen.getByRole('button', { name: 'Về bản đồ' })).toBeInTheDocument();
    await userEvent.setup().click(screen.getByRole('button', { name: 'Về phòng KTX ăn tối' }));
    const sau = useKhoMvp.getState().trangThai!;
    expect(sau.conTro?.chuoi).toBe('n2-toi');
    expect(sau.ngay).toBe(2);
  });
});
