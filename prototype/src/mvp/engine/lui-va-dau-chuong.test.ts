/** Lùi lại từng bước (kho MVP) và nhảy tới đầu chương (bảng người quan sát). */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { taoKhoMvp } from '../store/kho-mvp';
import { khungNhin } from './may';
import { dauChuongMvp, nhayToiDauChuong } from './tu-choi';

const kb = KICH_BAN_MVP as unknown as KichBanMvp;

describe('lùi lại từng bước', () => {
  it('mỗi hành động thêm một bước lùi; lùi trả đúng trạng thái trước; hết thì trả false', () => {
    const kho = taoKhoMvp({ persist: false });
    kho.getState().batDau();
    const s0 = kho.getState().trangThai;
    expect(kho.getState().lui()).toBe(false);
    kho.getState().hanhDong({ type: 'tiep' });
    const s1 = kho.getState().trangThai;
    kho.getState().hanhDong({ type: 'tiep' });
    expect(kho.getState().lichSuLui).toHaveLength(2);
    expect(kho.getState().lui()).toBe(true);
    expect(kho.getState().trangThai).toBe(s1);
    expect(kho.getState().lui()).toBe(true);
    expect(kho.getState().trangThai).toBe(s0);
    expect(kho.getState().lui()).toBe(false);
  });

  it('nạp ván khác, nhảy tới, chơi lại → xóa các bước lùi của ván cũ', () => {
    const kho = taoKhoMvp({ persist: false });
    kho.getState().batDau();
    kho.getState().hanhDong({ type: 'tiep' });
    kho.getState().luuVaoO(0, 'thử');
    kho.getState().hanhDong({ type: 'tiep' });
    expect(kho.getState().lichSuLui.length).toBeGreaterThan(0);
    kho.getState().napTuO(0);
    expect(kho.getState().lichSuLui).toEqual([]);
    kho.getState().hanhDong({ type: 'tiep' });
    kho.getState().batDau();
    expect(kho.getState().lichSuLui).toEqual([]);
  });
});

describe('nhảy tới đầu chương', () => {
  const ds = dauChuongMvp(kb);

  it('danh sách có mở đầu, đủ các ngày, buổi họp, các vụ sau và việc phụ của lịch', () => {
    const ids = ds.map((c) => c.id);
    expect(ids[0]).toBe('mo-dau');
    for (const n of kb.lich.ngay) expect(ids).toContain(`ngay-${n.so}`);
    expect(ids).toContain('hop');
    for (const v of kb.lich.vuSau ?? []) expect(ids).toContain(`vu-${v.id}`);
    for (const p of kb.lich.nhiemVuPhu ?? []) expect(ids).toContain(`phu-${p.id}`);
  });

  it.each(ds.map((c) => [c.id, c.nhan] as const))('tới được %s (%s), đứng ở bước đầu của chương, máy không báo lỗi', (id) => {
    const s = nhayToiDauChuong(kb, id, 1);
    const chuong = ds.find((c) => c.id === id);
    expect(chuong?.toi(s)).toBe(true);
    expect(khungNhin(kb, s).kind).not.toBe('error');
  });

  it('mã lạ → ném lỗi', () => {
    expect(() => nhayToiDauChuong(kb, 'khong-co')).toThrow();
  });
});
