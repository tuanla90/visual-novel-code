import { describe, expect, it } from 'vitest';
import { taoTrangThai } from '../engine/may';
import { KICH_BAN } from '../store/kho-mvp';
import { anhNen } from './anh-mvp';
import { anhSapToi, CHUOI_NHIN_TRUOC } from './tai-truoc-mvp';

describe('tải trước theo văn bản', () => {
  it('từ đầu ván: nền xe buýt đứng đầu, rồi nền các cảnh kế tiếp; không trùng URL', () => {
    const ds = anhSapToi(KICH_BAN, taoTrangThai(KICH_BAN));
    const xe = anhNen('xe-buyt');
    expect(xe).toBeDefined();
    expect(ds[0]?.url).toBe(xe);
    expect(ds.map((a) => a.url)).toContain(anhNen('cong-truong'));
    expect(new Set(ds.map((a) => a.url)).size).toBe(ds.length);
  });

  it('chỉ nhìn trước vài chuỗi, không quét cả kịch bản', () => {
    const ds = anhSapToi(KICH_BAN, taoTrangThai(KICH_BAN));
    expect(ds.length).toBeLessThanOrEqual(40);
    expect(CHUOI_NHIN_TRUOC).toBeLessThan(KICH_BAN.chuoi.length);
  });

  it('con trỏ rỗng (ở bản đồ / hết ngày) không ném lỗi', () => {
    const s = { ...taoTrangThai(KICH_BAN), conTro: null };
    expect(() => anhSapToi(KICH_BAN, s)).not.toThrow();
  });
});
