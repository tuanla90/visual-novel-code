// @vitest-environment node
/**
 * (7) SQL của 3 thẻ thử thách MVP chạy THẬT trên bảng của du-lieu.md ra đúng số dòng khai; chấm đúng/sai;
 * bảng ảo tra_cuu_k24 dùng được; câu ghi bị chặn.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { chamThuThach, chaySql, phanUngSauKhiChay, soVoiChuan, xemDongDau } from './sql-mvp';

const KB = KICH_BAN_MVP as unknown as KichBanMvp;
const DU_LIEU = KB.duLieu;
if (!DU_LIEU) throw new Error('KICH_BAN_MVP.duLieu rỗng');

describe('SQL MVP trên du-lieu.md', () => {
  it('mọi thẻ thử thách: SQL chuẩn ra đúng "Số dòng kỳ vọng" (chuỗi ngày 2: 11 → 4 → 2 → 1; ngày 4: 6 → 2; c-sua-or-quan 2)', async () => {
    const the = Object.values(KB.thuThach);
    expect(the.map((t) => t.id).sort()).toEqual(['c-loc-and', 'c-loc-khoa', 'c-loc-lop', 'c-loc-toa', 'c-sua-or-quan', 'c-ten-h', 'c-ten-lop']);
    for (const t of the) {
      const kq = await chaySql(DU_LIEU, t.sqlChuan);
      expect(kq.ok, t.id).toBe(true);
      if (kq.ok) expect(kq.dong.length, t.id).toBe(t.soDongKyVong);
    }
  });

  it('truy vấn OR của Quân (nạp sẵn c-sua-or-quan) ra 14 dòng như [MÀN CHIẾU] khai, và bị chấm sai', async () => {
    const the = KB.thuThach['c-sua-or-quan'];
    if (!the?.truyVanNapSan) throw new Error('thiếu truy vấn nạp sẵn');
    const kq = await chaySql(DU_LIEU, the.truyVanNapSan);
    expect(kq.ok && kq.dong.length).toBe(14);
    const cham = await chamThuThach(DU_LIEU, the.truyVanNapSan, the.sqlChuan);
    expect(cham.trangThai).toBe('sai');
    if (cham.trangThai === 'sai') expect(cham.so).toMatchObject({ soDongNguoiChoi: 14, soDongChuan: 2 });
  });

  it('chấm đúng khi đổi thứ tự cột, đặt bí danh, thêm cột thừa; sai khi thiếu cột bắt buộc', async () => {
    const the = KB.thuThach['c-ten-h'];
    if (!the) throw new Error('thiếu thẻ c-ten-h');
    const dung = await chamThuThach(DU_LIEU, "SELECT ten AS ten_goi, ho_dem, ma_sv FROM sinh_vien WHERE ma_lop = 'BC24A' AND ten LIKE 'H%'", the.sqlChuan);
    expect(dung.trangThai).toBe('dung');
    const thieu = await chamThuThach(DU_LIEU, "SELECT ten FROM sinh_vien WHERE ma_lop = 'BC24A' AND ten LIKE 'H%'", the.sqlChuan);
    expect(thieu.trangThai).toBe('sai');
    if (thieu.trangThai === 'sai') expect(thieu.so.cotThieu).toEqual(['ma_sv']);
  });

  it('bảng ảo tra_cuu_k24 dùng được: [LỌC THỦ] Ngày hội ra 3 dòng có SV240251', async () => {
    const kq = await chaySql(DU_LIEU, "SELECT ma_sv, ho_dem, ten, nganh FROM tra_cuu_k24 WHERE ten = 'Tùng';");
    expect(kq.ok).toBe(true);
    if (kq.ok) {
      expect(kq.dong.length).toBe(3);
      expect(kq.dong.map((d) => d[0])).toContain('SV240251');
    }
    const dau = await xemDongDau(DU_LIEU, 'lop_sinh_hoat');
    expect(dau.ok && dau.dong.length).toBe(5);
  });

  it('không chạy câu ghi hay nhiều câu; lỗi cột/bảng phân loại được', async () => {
    expect((await chaySql(DU_LIEU, 'DELETE FROM sinh_vien')).ok).toBe(false);
    expect((await chaySql(DU_LIEU, 'SELECT 1; SELECT 2')).ok).toBe(false);
    const cot = await chaySql(DU_LIEU, 'SELECT clb FROM sinh_vien');
    expect(cot.ok === false && cot.loai).toBe('khong-co-cot');
    const bang = await chaySql(DU_LIEU, 'SELECT * FROM khong_co');
    expect(bang.ok === false && bang.loai).toBe('khong-co-bang');
    // Sau câu ghi bị chặn, dữ liệu còn nguyên.
    const dem = await chaySql(DU_LIEU, 'SELECT COUNT(*) FROM sinh_vien');
    expect(dem.ok && dem.dong[0]?.[0]).toBe(25);
  });

  it('soVoiChuan: dòng trùng phải trùng đủ số lần', () => {
    const chuan = { ok: true as const, cot: ['a'], dong: [['x'], ['x'], ['y']] };
    expect(soVoiChuan(chuan, { ok: true, cot: ['a'], dong: [['x'], ['y'], ['y']] }).dung).toBe(false);
    expect(soVoiChuan(chuan, { ok: true, cot: ['b'], dong: [['y'], ['x'], ['x']] }).dung).toBe(true);
  });
});

describe('phản ứng sau khi chạy (dòng "Khi …" của thẻ)', () => {
  it('bài 2.1 kéo [K24] ra 0 dòng → lời Hà Vy; bài 2.2 thiếu nháy → lời lỗi thiếu cột; ra số dòng không có lời → []', async () => {
    const khoa = KB.thuThach['c-loc-khoa'];
    const toa = KB.thuThach['c-loc-toa'];
    if (!khoa || !toa) throw new Error('thiếu thẻ');
    const khung = 'SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat';
    const k0 = phanUngSauKhiChay(khoa, await chamThuThach(DU_LIEU, `${khung} WHERE khoa_hoc = 'K24'`, khoa.sqlChuan));
    expect(k0.map((l) => l.speaker)).toEqual(['ha-vy']);
    expect(k0[0]?.text).toContain('2024');
    const loi = phanUngSauKhiChay(toa, await chamThuThach(DU_LIEU, `${khung} WHERE toa_nha = B`, toa.sqlChuan));
    expect(loi[0]?.text).toContain('tên cột');
    expect(phanUngSauKhiChay(toa, await chamThuThach(DU_LIEU, `${khung} WHERE toa_nha = 'A'`, toa.sqlChuan))).toEqual([]);
  });
});
