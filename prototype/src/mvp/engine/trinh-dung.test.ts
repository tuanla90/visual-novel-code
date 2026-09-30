// @vitest-environment node
/**
 * Trình dựng câu phòng máy (QĐ-092): khung khóa từ SQL chuẩn; giấy nhớ tự bọc nháy khi là chữ; ✎ giữ nguyên chữ gõ;
 * bấm khối nối liền trong nháy. Chạy thật trên bộ dữ liệu của vụ để chắc các bài "sai có ích" cho đúng hậu quả.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { chaySql } from './sql-mvp';
import { cauSoiDieuKien, cauTuSql, dieuKienThanhSql, giaTriTuGiayNho, khungTuSqlChuan, noiKhoi, tachWhere, thanhSql, type CauDung, type KieuCot } from './trinh-dung';

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

  it('giấy nhiều giá trị (phiếu hai lớp): "bằng" → IN (…); một giá trị thì như tờ thường; "bắt đầu bằng" → các LIKE nối OR trong ngoặc', () => {
    const phieu = { nguon: 'giay-nho' as const, tho: 'BC24A, BC23A', nhieu: ['BC24A', 'BC23A'], the: 'ev-hai-lop' };
    expect(dieuKienThanhSql({ cot: 'ma_lop', phep: 'bang', giaTri: phieu }, 'TEXT')).toBe("ma_lop IN ('BC24A', 'BC23A')");
    expect(dieuKienThanhSql({ cot: 'ma_lop', phep: 'bat-dau-bang', giaTri: phieu }, 'TEXT')).toBe("(ma_lop LIKE 'BC24A%' OR ma_lop LIKE 'BC23A%')");
    expect(dieuKienThanhSql({ cot: 'khoa_hoc', phep: 'bang', giaTri: { nguon: 'giay-nho', tho: '1, 2', nhieu: ['1', '2'] } }, 'INTEGER')).toBe('khoa_hoc IN (1, 2)');
    expect(dieuKienThanhSql({ cot: 'ma_sv', phep: 'bang', giaTri: { nguon: 'giay-nho', tho: 'SV210745', nhieu: ['SV210745'] } }, 'TEXT')).toBe("ma_sv = 'SV210745'");
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

describe('xem từng điều kiện', () => {
  it('tách WHERE phẳng ở AND/OR ngoài nháy; có ngoặc / không WHERE → null', () => {
    expect(tachWhere("SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B' OR nganh = 'Báo chí';")).toEqual({
      khung: 'SELECT ma_lop FROM lop_sinh_hoat',
      bang: 'lop_sinh_hoat',
      dieuKien: ["toa_nha = 'B'", "nganh = 'Báo chí'"],
      noi: ['OR'],
    });
    expect(tachWhere("SELECT * FROM t WHERE ten = 'AND OR' AND x = 1")?.dieuKien).toEqual(["ten = 'AND OR'", 'x = 1']);
    expect(tachWhere('SELECT * FROM t WHERE (a = 1 OR b = 2) AND c = 3')).toBeNull();
    expect(tachWhere('SELECT * FROM t')).toBeNull();
  });

  it('`cot IN (…)` (phiếu kéo vào ô) là một điều kiện phẳng; ngoặc khác, GROUP BY… vẫn null', () => {
    expect(tachWhere("SELECT ma_sv FROM sinh_vien WHERE ma_lop IN ('BC24A', 'BC23A') AND ten LIKE 'H%';")).toEqual({
      khung: 'SELECT ma_sv FROM sinh_vien',
      bang: 'sinh_vien',
      dieuKien: ["ma_lop IN ('BC24A', 'BC23A')", "ten LIKE 'H%'"],
      noi: ['AND'],
    });
    // Ngoặc bên trong chữ nháy không tính.
    expect(tachWhere("SELECT * FROM t WHERE ten IN ('a (b)', 'c') OR x = 1")?.dieuKien).toEqual(["ten IN ('a (b)', 'c')", 'x = 1']);
    expect(tachWhere("SELECT * FROM t WHERE (ten LIKE 'a%' OR ten LIKE 'b%')")).toBeNull();
    expect(tachWhere("SELECT * FROM t WHERE lower(ten) = 'a'")).toBeNull();
    expect(tachWhere("SELECT * FROM t WHERE ten IN ('a') GROUP BY ten")).toBeNull();
  });

  it('câu soi chạy thật với IN: hai lớp × tên bắt đầu bằng H → giữ đúng 2 (Hiếu, Hoài)', async () => {
    if (!duLieu) throw new Error('thiếu du-lieu.md');
    const t = tachWhere("SELECT ma_sv, ten FROM sinh_vien WHERE ma_lop IN ('BC24A', 'BC23A') AND ten LIKE 'H%'");
    if (!t) throw new Error('không tách được');
    const kq = await chaySql(duLieu, cauSoiDieuKien(t));
    if (!kq.ok) throw new Error(kq.thongDiep);
    const iGiu = kq.cot.indexOf('giu');
    const iTen = kq.cot.indexOf('ten');
    expect(kq.dong.filter((d) => d[iGiu] === 1).map((d) => d[iTen]).sort()).toEqual(['Hiếu', 'Hoài']);
  });

  it('câu soi chạy thật: OR tòa B / Báo chí → 5 dòng giữ, mỗi dòng có dấu từng điều kiện; AND chỉ giữ 2', async () => {
    if (!duLieu) throw new Error('thiếu du-lieu.md');
    const soi = async (sql: string) => {
      const t = tachWhere(sql);
      if (!t) throw new Error('không tách được');
      const kq = await chaySql(duLieu, cauSoiDieuKien(t));
      if (!kq.ok) throw new Error(kq.thongDiep);
      const iGiu = kq.cot.indexOf('giu');
      return { tong: kq.dong.length, giu: kq.dong.filter((d) => d[iGiu] === 1).length, cot: kq.cot };
    };
    const hoac = await soi("SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B' OR nganh = 'Báo chí'");
    expect(hoac).toMatchObject({ tong: 5, giu: 5 });
    expect(hoac.cot).toEqual(expect.arrayContaining(['dk1', 'dk2', 'giu']));
    const va = await soi("SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí'");
    expect(va).toMatchObject({ tong: 5, giu: 2 });
  });
});

describe('nạp câu có sẵn vào kéo thả (buổi họp, chương 1)', () => {
  const kieu = (): KieuCot => 'TEXT';
  it("câu HOẶC của Quân → hai ô giấy nhớ (H bắt đầu bằng, BC24A bằng), nối OR; dựng lại ra đúng câu", () => {
    const cau = cauTuSql("SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop = 'BC24A';");
    expect(cau).toEqual({
      khung: 'SELECT ma_sv, ten FROM sinh_vien',
      dieuKien: [
        { cot: 'ten', phep: 'bat-dau-bang', giaTri: { nguon: 'giay-nho', tho: 'H' } },
        { cot: 'ma_lop', phep: 'bang', giaTri: { nguon: 'giay-nho', tho: 'BC24A' } },
      ],
      noi: ['OR'],
    });
    if (!cau) return;
    expect(thanhSql(cau, kieu)).toBe("SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop = 'BC24A'");
    expect(thanhSql({ ...cau, noi: ['AND'] }, kieu)).toBe("SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop = 'BC24A'");
  });

  it('SQL chuẩn c-ten-h có IN (…) → ô "là một trong" mang cả hai lớp; dựng lại ra đúng IN', () => {
    const cau = cauTuSql("SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_lop IN ('BC24A', 'BC23A') AND ten LIKE 'H%';");
    expect(cau?.dieuKien).toEqual([
      { cot: 'ma_lop', phep: 'bang', giaTri: { nguon: 'giay-nho', tho: 'BC24A, BC23A', nhieu: ['BC24A', 'BC23A'] } },
      { cot: 'ten', phep: 'bat-dau-bang', giaTri: { nguon: 'giay-nho', tho: 'H' } },
    ]);
    if (!cau) return;
    expect(thanhSql(cau, kieu)).toBe("SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_lop IN ('BC24A', 'BC23A') AND ten LIKE 'H%'");
    // IN có số, nháy trong chữ.
    expect(cauTuSql("SELECT a FROM t WHERE k IN (1, 2) AND ten IN ('O''Neil')")?.dieuKien.map((d) => d.giaTri)).toEqual([
      { nguon: 'giay-nho', tho: '1, 2', nhieu: ['1', '2'] },
      { nguon: 'giay-nho', tho: "O'Neil", nhieu: ["O'Neil"] },
    ]);
  });

  it('số để trần, điều kiện lạ giữ nguyên chữ, câu không tách được → null', () => {
    const cau = cauTuSql('SELECT a FROM t WHERE khoa_hoc = 2024 AND ten <> 1');
    expect(cau?.dieuKien[0]).toEqual({ cot: 'khoa_hoc', phep: 'bang', giaTri: { nguon: 'giay-nho', tho: '2024' } });
    expect(cau?.dieuKien[1]?.giaTri).toEqual({ nguon: 'go', tho: 'ten <> 1' });
    expect(cauTuSql('SELECT a FROM t WHERE (x = 1 OR y = 2) AND z = 3')).toBeNull();
    expect(cauTuSql('SELECT a FROM t')).toEqual({ khung: 'SELECT a FROM t', dieuKien: [], noi: [] });
  });
});
