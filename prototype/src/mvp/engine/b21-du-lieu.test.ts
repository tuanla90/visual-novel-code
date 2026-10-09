/**
 * Gói B21 mục 7 — dữ liệu bộ mùa 1 (docs/mua-1/vu-1-ban-7-dan-y.md §1): sinh_vien(ma_sv, ho_dem, ten, ma_lop, noi_o), bảng lop, nhãn khối
 * tiếng Việt. Chạy SQL thật trên dữ liệu đã thêm nền.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MUA_1 } from '../../content/generated/mua-1/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { nhanKhoi } from './nhan-khoi';
import { chaySql } from './sql-mvp';

const KB = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const dem = async (sql: string): Promise<number> => {
  const kq = await chaySql(KB.duLieu as NonNullable<KichBanMvp['duLieu']>, sql);
  if (!kq.ok) throw new Error(JSON.stringify(kq));
  return kq.dong.length;
};
const lop = (ma: string) => KB.duLieu?.bang.find((b) => b.ten === 'lop')?.dong.filter((d) => d[0] === ma);

describe('B21 · dữ liệu Vụ 1 bản 7', () => {
  it('sinh_vien chỉ còn mã, họ đệm, tên, mã lớp, nơi ở; bảng lớp có ~120 lớp + các lớp của truyện', () => {
    const sv = KB.duLieu?.bang.find((b) => b.ten === 'sinh_vien');
    expect(sv?.cot.map((c) => c.ten)).toEqual(['ma_sv', 'ho_dem', 'ten', 'ma_lop', 'noi_o']);
    const l = KB.duLieu?.bang.find((b) => b.ten === 'lop');
    expect(l?.cot.map((c) => c.ten)).toEqual(['ma_lop', 'nganh', 'khoa_hoc', 'toa', 'buoi']);
    expect(l?.dong.length).toBeGreaterThanOrEqual(110);
    expect(l?.dong.length).toBeLessThanOrEqual(140);
    expect(lop('BC24A')).toEqual([['BC24A', 'Báo chí', 2024, 'B', 'Sáng thứ Hai']]);
    expect(lop('BC24B')).toEqual([['BC24B', 'Báo chí', 2024, 'C', 'Sáng thứ Hai']]);
    expect(lop('BC24C')).toEqual([['BC24C', 'Báo chí', 2024, 'B', 'Chiều thứ Hai']]);
    expect(new Set(sv?.dong.map((d) => d[4]))).toEqual(new Set(['Ký túc xá', 'Ngoại trú']));
  });

  it('có Hoài thứ hai SV240702 BC24C và người chơi KT24A', async () => {
    expect(await dem("SELECT * FROM sinh_vien WHERE ma_sv = 'SV240702' AND ten = 'Hoài' AND ma_lop = 'BC24C'")).toBe(1);
    expect(await dem("SELECT * FROM sinh_vien WHERE ma_sv = 'SV240388' AND ma_lop = 'KT24A'")).toBe(1);
  });

  it("ten = 'Hoài' ra 5 dòng; thêm ma_lop = 'BC24A' ra 1", async () => {
    expect(await dem("SELECT ma_sv FROM sinh_vien WHERE ten = 'Hoài'")).toBe(5);
    expect(await dem("SELECT ma_sv FROM sinh_vien WHERE ten = 'Hoài' AND ma_lop = 'BC24A'")).toBe(1);
  });

  it('câu bốn điều kiện trên lop ra 1 dòng BC24A; thiếu một điều kiện ra 2–3 dòng', async () => {
    const goc = "nganh = 'Báo chí' AND khoa_hoc = 2024 AND toa = 'B' AND buoi = 'Sáng thứ Hai'";
    expect(await dem(`SELECT ma_lop FROM lop WHERE ${goc}`)).toBe(1);
    for (const bo of ["nganh = 'Báo chí' AND ", 'khoa_hoc = 2024 AND ', "toa = 'B' AND ", " AND buoi = 'Sáng thứ Hai'"]) {
      const n = await dem(`SELECT ma_lop FROM lop WHERE ${goc.replace(bo, '')}`);
      expect(n, `thiếu "${bo}"`).toBeGreaterThanOrEqual(2);
      expect(n, `thiếu "${bo}"`).toBeLessThanOrEqual(3);
    }
  });

  it('nhãn khối tiếng Việt: khối bảng / khối cột; câu SQL giữ tên ASCII; nấc chữ SQL và tự viết giữ tên thật', () => {
    const nk = nhanKhoi(KB.duLieu, 'ghep');
    expect(nk.bang('sinh_vien')).toBe('Sinh viên');
    expect(nk.bang('lop')).toBe('Lớp');
    expect(nk.cot('ma_sv', 'sinh_vien')).toBe('Mã sinh viên');
    expect(nk.cot('ma_lop')).toBe('Mã lớp');
    expect(nk.cot('khong_co')).toBe('khong_co');
    expect(nk.bang('bang_la')).toBe('bang_la');
    for (const muc of ['ghep-sql', 'tu-viet'] as const) expect(nhanKhoi(KB.duLieu, muc).cot('ma_sv')).toBe('ma_sv');
  });
});
