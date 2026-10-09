/**
 * User 08/10/2026 tối: Trung thu là màn dạy soi kính lúp. Lần 1 Hà Vy tự soi Tùng (kính tự tới từng điểm theo thứ tự viết, từ
 * chi tiết kém quan trọng tới quan trọng); lần 2 người chơi tự soi quanh bàn bánh và tự đoán ra một đứa trẻ lấy bánh.
 */
import { act, fireEvent, render } from '@testing-library/react';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MUA_1 as kb } from '../../content/generated/mua-1/kich-ban.gen';
import type { NutMvp } from '../../content/mvp/types';
import { diemDangHien } from '../engine/may';
import { KhamPhaMvp } from './KhamPhaMvp';

const nut = (id: string): Extract<NutMvp, { type: 'explore' }> => {
  for (const c of kb.chuoi) for (const n of c.nodes) if (n.type === 'explore' && n.id === id) return n;
  throw new Error(`thiếu ${id}`);
};

describe('Trung thu: Hà Vy soi Tùng tự động', () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it('bộ đọc: quan sát Tùng có cờ Hà Vy soi + tự động, điểm xếp áo → băng mũi → bản đồ', () => {
    const n = nut('kp-soi-tung');
    expect([n.kieu, n.nhanVat, n.dang, n.haVySoi, n.tuDong]).toEqual(['quan-sat', 'tung', 'happy', true, true]);
    expect(n.diem.map((d) => d.chuoi)).toEqual(['md-10-soi-ao', 'md-10-soi-mui', 'md-10-soi-ban-do']);
  });

  it('sau cảnh cắt, kính tự tới điểm chưa xem đầu tiên rồi tự mở; các điểm sau ẩn, không bấm trước được', () => {
    const n = nut('kp-soi-tung');
    const xem = vi.fn();
    const { rerender } = render(<KhamPhaMvp kb={kb} id={n.id} canh="san-ktx-trung-thu" diem={diemDangHien(n, [])} onXem={xem} kieu="quan-sat" nhanVat="tung" dang="happy" haVySoi tuDong />);
    // Đang cảnh cắt đôi mắt Hà Vy: chưa soi gì.
    act(() => vi.advanceTimersByTime(1500));
    expect(xem).not.toHaveBeenCalled();
    act(() => vi.advanceTimersByTime(300));
    const soi = [...document.querySelectorAll<HTMLButtonElement>('.mvp-soi')];
    expect(soi.map((b) => b.classList.contains('is-dang-soi'))).toEqual([true, false, false]);
    expect(soi.slice(1).every((b) => b.classList.contains('mvp-soi--cho') && b.disabled)).toBe(true);
    act(() => vi.advanceTimersByTime(1500));
    expect(xem).toHaveBeenLastCalledWith('md-10-soi-ao');
    // Xem xong áo: tới lượt băng mũi; bấm vào kính thì mở ngay khỏi chờ.
    rerender(<KhamPhaMvp kb={kb} id={n.id} canh="san-ktx-trung-thu" diem={diemDangHien(n, ['md-10-soi-ao'])} onXem={xem} kieu="quan-sat" nhanVat="tung" dang="happy" haVySoi tuDong />);
    const dang = document.querySelector<HTMLButtonElement>('.mvp-soi.is-dang-soi');
    expect(dang?.dataset['diem']).toBe('md-10-soi-mui');
    fireEvent.click(dang!);
    expect(xem).toHaveBeenLastCalledWith('md-10-soi-mui');
  });
});

describe('Trung thu: người chơi tự soi quanh bàn bánh', () => {
  it('cảnh khám phá trên nền ba bánh: bốn đầu mối "!" (đĩa, vệt vụn, đèn cá chép, dép), đầu lân là chi tiết ẩn', () => {
    const n = nut('kp-banh-trung-thu');
    expect(n.kieu).toBeUndefined();
    expect(n.diem.map((d) => [d.chuoi, d.dau ?? null])).toEqual([
      ['md-10-dia-banh', 'chinh'],
      ['md-10-vun-banh', 'chinh'],
      ['md-10-den-ca-chep', 'chinh'],
      ['md-10-doi-dep', 'chinh'],
      ['md-10-dau-lan', null],
    ]);
  });
});
