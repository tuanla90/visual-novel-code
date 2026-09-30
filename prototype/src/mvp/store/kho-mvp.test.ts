/**
 * Kho MVP: ván / ô lưu của phiên bản dữ liệu cũ (v1, trước chương 1 theo truyện 30/09/2026) bị bỏ khi nạp, không được
 * nạp thành một trạng thái trỏ tới ngày / chuỗi không còn. Ván cùng phiên bản thì nạp lại nguyên vẹn.
 */
import { describe, expect, it } from 'vitest';
import { taoTrangThai } from '../engine/may';
import { KICH_BAN, PHIEN_BAN_KHO_MVP, SO_O_LUU_MVP, taoKhoMvp } from './kho-mvp';

const ghi = (khoa: string, version: number): void => {
  const s = { ...taoTrangThai(KICH_BAN, 1), giaiDoan: 'ngay', ngay: 2, conTro: null };
  sessionStorage.setItem(khoa, JSON.stringify({ state: { trangThai: s, oLuu: [{ trangThai: s, luuLuc: 'x', nhan: 'Ngày 2 · Trưa', nhiemVu: null }] }, version }));
};

describe('kho MVP: phiên bản dữ liệu lưu', () => {
  it('ván và ô lưu v1 bị bỏ: ván trống, ô lưu trống', () => {
    ghi('thu-kho-v1', 1);
    const kho = taoKhoMvp({ storageKey: 'thu-kho-v1' });
    expect(kho.getState().trangThai).toBeNull();
    expect(kho.getState().oLuu).toEqual(Array.from({ length: SO_O_LUU_MVP }, () => null));
  });

  it('ván cùng phiên bản nạp lại nguyên vẹn', () => {
    ghi('thu-kho-moi', PHIEN_BAN_KHO_MVP);
    const kho = taoKhoMvp({ storageKey: 'thu-kho-moi' });
    expect(kho.getState().trangThai?.ngay).toBe(2);
    expect(kho.getState().oLuu[0]?.nhan).toBe('Ngày 2 · Trưa');
  });
});
