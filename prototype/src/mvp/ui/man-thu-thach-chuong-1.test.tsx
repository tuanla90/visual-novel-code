/**
 * Màn thử thách ở chương 1 (ĐÃ CHỐT C, 30/09/2026 — bạn lớp 5 tự chơi, không đọc dòng hướng dẫn nào): không hiện
 * "Mục tiêu học" của thẻ, chỉ hiện bảng mà câu chuẩn dùng (tài khoản CLB chỉ mở bảng đó), nhãn máy theo cảnh.
 */
import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { ManThuThachMvp } from './ManThuThachMvp';

const kb = KICH_BAN_MVP as unknown as KichBanMvp;

function ve(id: string, noi?: string): void {
  const the = kb.thuThach[id];
  if (!the) throw new Error(`thiếu thẻ ${id}`);
  render(<ManThuThachMvp kb={kb} duLieu={kb.duLieu} the={the} mode="challenge" dienTen={(t) => t} onXong={vi.fn()} noi={noi} />);
}

const bangDangHien = (): string[] => [...document.querySelectorAll('.mvp-chal__bang .schema__name')].map((e) => e.textContent ?? '');

describe('màn thử thách chương 1', () => {
  it('ngày 2 · c-lop ở phòng CLB: chỉ bảng lớp, máy là "Laptop CLB", không có "Hôm nay học gì"', () => {
    ve('c-lop', 'Phòng CLB');
    expect(bangDangHien()).toEqual(['lop_sinh_hoat']);
    expect(screen.getByText('Laptop CLB')).toBeInTheDocument();
    expect(screen.queryByText('Hôm nay học gì')).toBeNull();
    expect(screen.queryByText(kb.thuThach['c-lop']?.mucTieuHoc ?? '—')).toBeNull();
  });

  it('ngày 4 · c-in ở phòng máy: chỉ bảng nhật ký in, máy là "Máy tính phòng máy"', () => {
    ve('c-in', 'Trong phòng máy');
    expect(bangDangHien()).toEqual(['nhat_ky_in']);
    expect(screen.getByText('Máy tính phòng máy')).toBeInTheDocument();
  });
});

describe('màn thử thách chương 1: chạy đúng câu đang hiện', () => {
  it('c-lop: lắp tòa B + Báo chí, đổi nối sang HOẶC rồi chạy ngay → 5 dòng, không bị chấm đúng', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const the = kb.thuThach['c-lop'];
    if (!the) throw new Error('thiếu c-lop');
    const giayNho = [
      { khoa: 'clue-toa-b#0', giaTri: 'B', nguon: '[Tòa B]' },
      { khoa: 'clue-bao-chi-k24#0', giaTri: 'Báo chí', nguon: '[Báo chí K24]' },
    ];
    render(<ManThuThachMvp kb={kb} duLieu={kb.duLieu} the={the} mode="challenge" dienTen={(t) => t} onXong={vi.fn()} giayNho={giayNho} noi="Phòng CLB" />);
    const u = userEvent.setup();
    await u.selectOptions(screen.getByRole('combobox', { name: 'Cột của điều kiện 1' }), 'toa_nha');
    await u.click(screen.getByRole('button', { name: /^B \(giấy nhớ/ }));
    await u.click(screen.getByRole('button', { name: /^Ô giá trị điều kiện 1/ }));
    await u.click(screen.getByRole('button', { name: '+ Thêm điều kiện' }));
    await u.selectOptions(screen.getByRole('combobox', { name: 'Cột của điều kiện 2' }), 'nganh');
    await u.click(screen.getByRole('button', { name: /^Báo chí \(giấy nhớ/ }));
    await u.click(screen.getByRole('button', { name: /^Ô giá trị điều kiện 2/ }));
    await u.click(screen.getByRole('button', { name: /^Nối điều kiện 2: VÀ/ }));
    await u.click(screen.getByRole('button', { name: 'Chạy truy vấn' }));
    expect((await screen.findAllByText(/5 dòng/)).length).toBeGreaterThan(0);
    expect(screen.queryByText('Số liệu đây!')).toBeNull();
  });
});

describe('buổi họp chương 1: sửa câu của Quân bằng một cú bấm', () => {
  it('câu HOẶC nạp sẵn vào kéo thả, không có tab cách nhập; bấm HOẶC → VÀ, chạy → 2 dòng, "Số liệu đây!"', async () => {
    const { default: userEvent } = await import('@testing-library/user-event');
    const the = kb.thuThach['c-sua-or-quan'];
    if (!the) throw new Error('thiếu c-sua-or-quan');
    render(<ManThuThachMvp kb={kb} duLieu={kb.duLieu} the={the} mode="fix-query" dienTen={(t) => t} onXong={vi.fn()} />);
    expect(screen.queryByRole('tablist', { name: 'Cách nhập câu' })).toBeNull();
    const u = userEvent.setup();
    await u.click(screen.getByRole('button', { name: /^Nối điều kiện 2: HOẶC \(OR\)/ }));
    expect(screen.getByRole('button', { name: /^Nối điều kiện 2: VÀ \(AND\)/ })).toBeInTheDocument();
    await u.click(screen.getByRole('button', { name: 'Chạy truy vấn' }));
    expect(await screen.findByText('Số liệu đây!')).toBeInTheDocument();
  });
});
