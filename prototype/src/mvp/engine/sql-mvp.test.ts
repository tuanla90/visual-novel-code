// @vitest-environment node
/**
 * (7) SQL của các thẻ thử thách MVP (chương 1: c-lop, c-ten-h, c-in, c-sua-or-quan) chạy THẬT trên bảng của du-lieu.md ra đúng số dòng khai; chấm đúng/sai;
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
  it('mọi thẻ thử thách: SQL chuẩn ra đúng "Số dòng kỳ vọng" (c-lop 2, c-ten-h 2, c-in 1, c-sua-or-quan 2)', async () => {
    const the = Object.values(KB.thuThach);
    expect(the.map((t) => t.id).sort()).toEqual(['c-in', 'c-lop', 'c-sua-or-quan', 'c-ten-h', 'c-tin-don', 'c-tin-goc', 'c-tin-may', 'c-v2-nguon-lop', 'c-v2-nhom-lop', 'v2-loc-buoi']);
    for (const t of the) {
      // Thẻ tổng hợp lấy phiếu làm nguồn (`FROM @<mã phiếu>`): bộ kiểm nội dung chạy sau khi thay nguồn, không chạy thẳng được ở đây.
      if (t.sqlChuan.includes('@')) continue;
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
    // Chấm theo tập kết quả: chỉ lọc lớp BC24A (không có BC23A) vẫn đúng — BC23A không có sinh viên.
    const dung = await chamThuThach(DU_LIEU, "SELECT ten AS ten_goi, ma_lop, ho_dem, ma_sv FROM sinh_vien WHERE ma_lop = 'BC24A' AND ten LIKE 'H%'", the.sqlChuan);
    expect(dung.trangThai).toBe('dung');
    const thieu = await chamThuThach(DU_LIEU, "SELECT ten, ho_dem, ma_lop FROM sinh_vien WHERE ma_lop = 'BC24A' AND ten LIKE 'H%'", the.sqlChuan);
    expect(thieu.trangThai).toBe('sai');
    if (thieu.trangThai === 'sai') expect(thieu.so.cotThieu).toEqual(['ma_sv']);
  });

  it('bảng ảo tra_cuu_k24 dùng được: [LỌC THỦ] Ngày hội ra 3 dòng có SV240251 (Tùng Du lịch)', async () => {
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
  it('c-lop nối HOẶC ra 5 lớp → Tùng rồi Hà Vy; c-ten-h "bằng" H ra 0 → Hà Vy; c-in mã + tên tệp ra 0 → Hà Vy; số dòng không có lời → []', async () => {
    const lop = KB.thuThach['c-lop'];
    const tenH = KB.thuThach['c-ten-h'];
    const inAn = KB.thuThach['c-in'];
    if (!lop || !tenH || !inAn) throw new Error('thiếu thẻ');
    const khungLop = 'SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat';
    const hoac = phanUngSauKhiChay(lop, await chamThuThach(DU_LIEU, `${khungLop} WHERE toa_nha = 'B' OR nganh = 'Báo chí'`, lop.sqlChuan));
    expect(hoac.map((l) => l.speaker)).toEqual(['tung', 'ha-vy']);
    const khongH = phanUngSauKhiChay(tenH, await chamThuThach(DU_LIEU, "SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_lop = 'BC24A' AND ten = 'H'", tenH.sqlChuan));
    expect(khongH[0]?.speaker).toBe('ha-vy');
    // Lời "… với tai_khoan, ten_tep" (Hà Vy rồi Tùng) chỉ nói khi màn tra báo đúng tập cột đã điền.
    const kqIn = await chamThuThach(DU_LIEU, "SELECT thoi_diem, tai_khoan, ten_tep, so_trang FROM nhat_ky_in WHERE tai_khoan = 'SV240317' AND ten_tep LIKE 'kien-nghi%'", inAn.sqlChuan);
    expect(phanUngSauKhiChay(inAn, kqIn, ['tai_khoan', 'ten_tep']).map((l) => l.speaker)).toEqual(['ha-vy', 'tung']);
    // Không báo cột → lời chung "Khi chạy ra 0 dòng" (một lời Hà Vy).
    expect(phanUngSauKhiChay(inAn, kqIn).map((l) => l.speaker)).toEqual(['ha-vy']);
    expect(phanUngSauKhiChay(lop, await chamThuThach(DU_LIEU, `${khungLop} WHERE nganh = 'Du lịch'`, lop.sqlChuan))).toEqual([]);
  });

  it('c-in: bỏ điều kiện mã → đúng một dòng clb_robotics, 23:10 Chủ nhật', async () => {
    const inAn = KB.thuThach['c-in'];
    if (!inAn) throw new Error('thiếu thẻ c-in');
    const kq = await chaySql(DU_LIEU, inAn.sqlChuan);
    expect(kq.ok && kq.dong).toEqual([['2024-09-15 23:10', 'clb_robotics', 'kien-nghi-phong-clb.docx', 1]]);
  });
});
