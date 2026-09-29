// @vitest-environment node
/**
 * Trình dựng câu phòng máy (QĐ-092): khung khóa từ SQL chuẩn; giấy nhớ tự bọc nháy khi là chữ; ✎ giữ nguyên chữ gõ;
 * bấm khối nối liền trong nháy. Chạy thật trên bộ dữ liệu của vụ để chắc các bài "sai có ích" cho đúng hậu quả.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { chaySql } from './sql-mvp';
import { dieuKienThanhSql, giaTriTuGiayNho, khungTuSqlChuan, noiKhoi, thanhSql, type CauDung, type KieuCot } from './trinh-dung';

const KB = KICH_BAN_MVP as unknown as KichBanMvp;
const duLieu = KB.duLieu;
const kieuCot = (cot: string): KieuCot => (duLieu?.bang.flatMap((b) => b.cot).find((c) => c.ten === cot)?.kieu ?? 'TEXT');

describe('khung khóa và giá trị', () => {
  it('tách SELECT … FROM <bảng> của SQL chuẩn', () => {
    expect(khungTuSqlChuan("SELECT ma_lop, nganh FROM lop_sinh_hoat WHERE toa_nha = 'B';")).toEqual({ khung: 'SELECT ma_lop, nganh FROM lop_sinh_hoat', bang: 'lop_sinh_hoat' });
    expect(khungTuSqlChuan('WHERE x = 1')).toBeNull();
  });

  it('giấy nhớ: chữ → nháy đơn; số vào cột số → trần; chữ vào cột số vẫn bọc nháy (K24 → \'K24\'); bắt đầu bằng → \'H%\'', () => {
    expect(giaTriTuGiayNho('B', 'TEXT', 'bang')).toBe("'B'");
    expect(giaTriTuGiayNho('2024', 'INTEGER', 'bang')).toBe('2024');
    expect(giaTriTuGiayNho('K24', 'INTEGER', 'bang')).toBe("'K24'");
    expect(giaTriTuGiayNho('H', 'TEXT', 'bat-dau-bang')).toBe("'H%'");
    expect(giaTriTuGiayNho("O'Neil", 'TEXT', 'bang')).toBe("'O''Neil'");
  });

  it('✎ gõ tay giữ nguyên chữ, kể cả thiếu nháy', () => {
    expect(dieuKienThanhSql({ cot: 'toa_nha', phep: 'bang', giaTri: { nguon: 'go', tho: 'B' } }, 'TEXT')).toBe('toa_nha = B');
    expect(dieuKienThanhSql({ cot: 'toa_nha', phep: 'bang', giaTri: null }, 'TEXT')).toBeNull();
  });

  it('cả câu: bỏ ô trống, nối theo AND/OR', () => {
    const cau: CauDung = {
      khung: 'SELECT ma_lop FROM lop_sinh_hoat',
      dieuKien: [
        { cot: 'toa_nha', phep: 'bang', giaTri: { nguon: 'giay-nho', tho: 'B' } },
        { cot: 'nganh', phep: 'bang', giaTri: null },
        { cot: 'nganh', phep: 'bang', giaTri: { nguon: 'giay-nho', tho: 'Báo chí' } },
      ],
      noi: ['AND', 'OR'],
    };
    expect(thanhSql(cau, kieuCot)).toBe("SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B' OR nganh = 'Báo chí'");
    expect(thanhSql({ ...cau, dieuKien: [] }, kieuCot)).toBe('SELECT ma_lop FROM lop_sinh_hoat');
  });
});

describe('bấm khối', () => {
  it('nối liền trong nháy, cách một dấu cách ngoài nháy', () => {
    expect(noiKhoi(['SELECT', '*', 'FROM', 'sinh_vien', 'WHERE', 'ten', 'LIKE', "'", 'H', '%', "'"])).toBe("SELECT * FROM sinh_vien WHERE ten LIKE 'H%'");
    expect(noiKhoi(['WHERE', 'nganh', '=', "'", 'Báo chí', "'", 'AND', 'toa_nha', '=', "'", 'B', "'"])).toBe("WHERE nganh = 'Báo chí' AND toa_nha = 'B'");
    expect(noiKhoi(['WHERE', 'toa_nha', '=', 'B'])).toBe('WHERE toa_nha = B');
  });
});

describe('chạy thật trên dữ liệu vụ: hậu quả của từng kiểu nhập', () => {
  it('giấy nhớ [Tòa B] → chạy được; ✎ quên nháy → lỗi không có cột B', async () => {
    if (!duLieu) throw new Error('thiếu du-lieu.md');
    const khung = 'SELECT ma_lop FROM lop_sinh_hoat';
    const tu = (tho: string, nguon: 'giay-nho' | 'go') => thanhSql({ khung, dieuKien: [{ cot: 'toa_nha', phep: 'bang', giaTri: { nguon, tho } }], noi: [] }, kieuCot);
    const dung = await chaySql(duLieu, tu('B', 'giay-nho'));
    expect(dung.ok && dung.dong.length).toBeGreaterThan(0);
    const thieuNhay = await chaySql(duLieu, tu('B', 'go'));
    expect(thieuNhay.ok).toBe(false);
    if (!thieuNhay.ok) expect(thieuNhay.loai).toBe('khong-co-cot');
  });
});
