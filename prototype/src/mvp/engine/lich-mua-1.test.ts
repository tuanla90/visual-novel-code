/**
 * Lịch mùa 1 (user chốt 03/10/2026): ngày đặt giữa vụ bằng [NGÀY], không mang sang vụ sau; "bí mật của mùa" chỉ đếm chi tiết
 * ẩn thật (vung: không dấu) + bốn mẩu giấy + bốn chuyện trà đá; cổng [NẾU bí mật >= 70%].
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { phanTramBiMat, taoTrangThai, thoaDieuKien } from './may';
import { RE_NHANH_KET_THAT, choiTuDong, reNhanhTheo, type ChienThuat } from './tu-choi';

const KB = KICH_BAN_MVP as KichBanMvp;
const CT: ChienThuat = { reNhanh: reNhanhTheo(RE_NHANH_KET_THAT), ten: 'Khôi', sangVuSau: true, lamPhu: false };

describe('lịch mùa 1', () => {
  it('Vụ 3 mở ngày 20/10 rồi sang 22/10; sang Vụ 4 thì bỏ ngày cũ', () => {
    const s20 = choiTuDong(KB, taoTrangThai(KB, 1), CT, (x) => x.ngayThang === '2024-10-20');
    expect(s20.vu).toBe('vu3');
    const s22 = choiTuDong(KB, s20, CT, (x) => x.ngayThang === '2024-10-22');
    expect(s22.vu).toBe('vu3');
    const s4 = choiTuDong(KB, s22, CT, (x) => x.vu === 'vu4');
    expect(s4.ngayThang ?? null).toBeNull();
  });

  it('Vụ 5: 16/11 mở vụ, 26/11 họp, 27/11 đóng hồ sơ', () => {
    const s16 = choiTuDong(KB, taoTrangThai(KB, 1), CT, (x) => x.vu === 'vu5' && x.ngayThang === '2024-11-16');
    const s26 = choiTuDong(KB, s16, CT, (x) => x.ngayThang === '2024-11-26');
    expect(s26.conTro?.chuoi).toMatch(/^v5-/);
    const s27 = choiTuDong(KB, s26, CT, (x) => x.ngayThang === '2024-11-27');
    expect(s27.conTro?.chuoi).toBe('v5-chot');
  });

  it('bí mật của mùa: ván mới 0%; cổng 70% đọc đúng phần trăm', () => {
    const s = taoTrangThai(KB, 1);
    expect(phanTramBiMat(KB, s)).toBe(0);
    expect(thoaDieuKien(KB, s, { kind: 'bi-mat', muc: 70 })).toBe(false);
    expect(thoaDieuKien(KB, s, { kind: 'bi-mat', muc: 0 })).toBe(true);
  });
});
