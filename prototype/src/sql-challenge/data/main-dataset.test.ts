/**
 * Bất biến của dataset CHÍNH (QĐ-010 → QĐ-014). Số liệu ở đây đã được viết cứng vào lời
 * thoại ("mười người", "hai mươi tư", "bốn mươi", "tám lớp") nên test này là hàng rào:
 * đổi một dòng dữ liệu là lời thoại sai theo.
 *
 * Chạy bằng SQLite thật (không đếm bằng JS) để đúng ngữ nghĩa LIKE / IN / = của máy.
 */
import { describe, expect, it } from 'vitest';
import { getDatabase } from '../engine/database';
import { BUILDING_B_CLASSES, CLASS_ROWS } from './classes';
import { INNOCENT, MAIN_STUDENT_ROWS, WITNESS } from './main-dataset';
import { CLUBS } from './types';
import type { Database } from '../engine/sqljs';

async function count(db: Database, sql: string): Promise<number> {
  const res = db.exec(`SELECT COUNT(*) FROM (${sql})`);
  return Number(res[0]?.values[0]?.[0] ?? -1);
}

async function col(db: Database, sql: string): Promise<string[]> {
  const res = db.exec(sql);
  return (res[0]?.values ?? []).map((row) => String(row[0]));
}

const C3_AND = "SELECT ma_sv FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí'";
const QUAN_OR = "SELECT ma_sv FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop IN ('KT24A', 'QT24B') OR clb = 'Báo chí'";

describe('dataset chính — QĐ-010/011: kích thước và giá trị cố định', () => {
  it('40 sinh viên, 8 lớp, tòa A/B/C, 4 CLB, không NULL, khóa chính duy nhất', async () => {
    const db = await getDatabase('main');
    expect(await count(db, 'SELECT * FROM sinh_vien')).toBe(40);
    expect(await count(db, 'SELECT * FROM lop_sinh_hoat')).toBe(8);
    expect(await col(db, 'SELECT DISTINCT toa_nha FROM lop_sinh_hoat ORDER BY toa_nha')).toEqual(['A', 'B', 'C']);
    expect((await col(db, 'SELECT DISTINCT clb FROM sinh_vien')).sort()).toEqual([...CLUBS].sort());
    expect(await count(db, 'SELECT * FROM sinh_vien WHERE ma_sv IS NULL OR ho_dem IS NULL OR ten IS NULL OR ma_lop IS NULL OR clb IS NULL')).toBe(0);
    expect(await count(db, 'SELECT * FROM lop_sinh_hoat WHERE ma_lop IS NULL OR nganh IS NULL OR khoa_hoc IS NULL OR toa_nha IS NULL')).toBe(0);
    expect(await count(db, "SELECT * FROM sinh_vien WHERE ma_sv = '' OR ho_dem = '' OR ten = '' OR ma_lop = '' OR clb = ''")).toBe(0);
    expect(new Set(MAIN_STUDENT_ROWS.map((s) => s.ma_sv)).size).toBe(40);
    expect(new Set(CLASS_ROWS.map((c) => c.ma_lop)).size).toBe(8);
    // Mọi sinh viên thuộc một lớp có trong bảng lớp; mọi lớp có ít nhất một sinh viên.
    expect(await count(db, 'SELECT * FROM sinh_vien WHERE ma_lop NOT IN (SELECT ma_lop FROM lop_sinh_hoat)')).toBe(0);
    expect(await count(db, 'SELECT * FROM lop_sinh_hoat WHERE ma_lop NOT IN (SELECT ma_lop FROM sinh_vien)')).toBe(0);
  });

  it('lớp ở tòa B đúng là KT24A và QT24B; hai dòng cố định của QĐ-011 có mặt nguyên văn', async () => {
    const db = await getDatabase('main');
    expect(await col(db, "SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B' ORDER BY ma_lop")).toEqual([...BUILDING_B_CLASSES]);
    const fixed = db.exec("SELECT ma_sv, ho_dem, ten, ma_lop, clb FROM sinh_vien WHERE ma_sv IN ('SV240317', 'SV240228') ORDER BY ma_sv");
    expect(fixed[0]?.values).toEqual([
      ['SV240228', 'Phạm Minh', 'Hiếu', 'KT24A', 'Báo chí'],
      ['SV240317', 'Lê Thị', 'Hoài', 'QT24B', 'Báo chí'],
    ]);
    expect(WITNESS).toEqual({ ma_sv: 'SV240317', ho_dem: 'Lê Thị', ten: 'Hoài', ma_lop: 'QT24B', clb: 'Báo chí' });
    expect(INNOCENT).toEqual({ ma_sv: 'SV240228', ho_dem: 'Phạm Minh', ten: 'Hiếu', ma_lop: 'KT24A', clb: 'Báo chí' });
  });

  it('chuỗi tiếng Việt ở dạng NFC (LIKE và = của SQLite so byte, không chuẩn hóa)', () => {
    for (const s of MAIN_STUDENT_ROWS) {
      for (const v of Object.values(s)) expect(v, `${s.ma_sv}: ${v}`).toBe(v.normalize('NFC'));
    }
    for (const c of CLASS_ROWS) expect(c.nganh).toBe(c.nganh.normalize('NFC'));
  });
});

describe('dataset chính — QĐ-012: bất biến số dòng (lời thoại viết cứng các số này)', () => {
  it("c1: ten LIKE 'H%' → 10 dòng (\"mười người\")", async () => {
    const db = await getDatabase('main');
    expect(await count(db, "SELECT * FROM sinh_vien WHERE ten LIKE 'H%'")).toBe(10);
  });

  it("c2: toa_nha = 'B' → 2 dòng", async () => {
    const db = await getDatabase('main');
    expect(await count(db, "SELECT * FROM lop_sinh_hoat WHERE toa_nha = 'B'")).toBe(2);
  });

  it('c3: H AND lớp tòa B AND Báo chí → đúng 2 dòng: Hiếu và Hoài', async () => {
    const db = await getDatabase('main');
    expect((await col(db, C3_AND)).sort()).toEqual(['SV240228', 'SV240317']);
  });

  it('truy vấn OR của Quân (§4.4) → 24 dòng ("hai mươi tư"), tức 40 − 16', async () => {
    const db = await getDatabase('main');
    expect(await count(db, QUAN_OR)).toBe(24);
  });

  it('bỏ lần lượt từng điều kiện của c3 → mỗi lần ≥ 4 dòng', async () => {
    const db = await getDatabase('main');
    expect(await count(db, "SELECT * FROM sinh_vien WHERE ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí'")).toBeGreaterThanOrEqual(4);
    expect(await count(db, "SELECT * FROM sinh_vien WHERE ten LIKE 'H%' AND clb = 'Báo chí'")).toBeGreaterThanOrEqual(4);
    expect(await count(db, "SELECT * FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B')")).toBeGreaterThanOrEqual(4);
  });

  it('cấu trúc giao H/B/P đúng như thiết kế: 2·2·2·2·4·6·6·16 (|H|=10, |B|=12, |P|=12)', async () => {
    const db = await getDatabase('main');
    const H = "ten LIKE 'H%'";
    const B = "ma_lop IN ('KT24A', 'QT24B')";
    const P = "clb = 'Báo chí'";
    const n = (where: string) => count(db, `SELECT * FROM sinh_vien WHERE ${where}`);
    expect(await n(`${H} AND ${B} AND ${P}`)).toBe(2);
    expect(await n(`${H} AND ${B} AND NOT ${P}`)).toBe(2);
    expect(await n(`${H} AND NOT ${B} AND ${P}`)).toBe(2);
    expect(await n(`NOT ${H} AND ${B} AND ${P}`)).toBe(2);
    expect(await n(`${H} AND NOT ${B} AND NOT ${P}`)).toBe(4);
    expect(await n(`NOT ${H} AND ${B} AND NOT ${P}`)).toBe(6);
    expect(await n(`NOT ${H} AND NOT ${B} AND ${P}`)).toBe(6);
    expect(await n(`NOT ${H} AND NOT ${B} AND NOT ${P}`)).toBe(16);
    expect(await n(B)).toBe(12);
    expect(await n(P)).toBe(12);
  });

  it('thiếu một điều kiện + LIMIT 2 vẫn ra Hiếu, Hoài trên dataset chính (dataset ẩn phải bắt)', async () => {
    const db = await getDatabase('main');
    for (const where of ["ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí'", "ten LIKE 'H%' AND clb = 'Báo chí'", "ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B')"]) {
      expect((await col(db, `SELECT ma_sv FROM sinh_vien WHERE ${where} LIMIT 2`)).sort()).toEqual(['SV240228', 'SV240317']);
    }
  });
});

describe('dataset chính — QĐ-013: bẫy sư phạm', () => {
  it("≥ 2 người ho_dem bắt đầu bằng H mà ten thì không; lọc ho_dem cho kết quả khác c1", async () => {
    const db = await getDatabase('main');
    expect(await count(db, "SELECT * FROM sinh_vien WHERE ho_dem LIKE 'H%' AND ten NOT LIKE 'H%'")).toBeGreaterThanOrEqual(2);
    const byHoDem = (await col(db, "SELECT ma_sv FROM sinh_vien WHERE ho_dem LIKE 'H%'")).sort();
    const byTen = (await col(db, "SELECT ma_sv FROM sinh_vien WHERE ten LIKE 'H%'")).sort();
    expect(byHoDem).not.toEqual(byTen);
  });

  it("≥ 2 người ten kết thúc bằng h (không bắt đầu bằng H); LIKE '%H' ra tập khác c1", async () => {
    const db = await getDatabase('main');
    expect(await count(db, "SELECT * FROM sinh_vien WHERE ten LIKE '%h' AND ten NOT LIKE 'H%'")).toBeGreaterThanOrEqual(2);
    expect(await count(db, "SELECT * FROM sinh_vien WHERE ten LIKE '%H'")).not.toBe(10);
  });

  it("≥ 1 người có h ở giữa tên; LIKE '%H%' ra nhiều hơn 10", async () => {
    const db = await getDatabase('main');
    expect(await count(db, "SELECT * FROM sinh_vien WHERE ten LIKE '%h%' AND ten NOT LIKE 'H%' AND ten NOT LIKE '%h'")).toBeGreaterThanOrEqual(1);
    expect(await count(db, "SELECT * FROM sinh_vien WHERE ten LIKE '%H%'")).toBeGreaterThan(10);
  });

  it('lớp mã gần giống ở tòa khác: KT24B (tòa A), QT24A (tòa C); lọc theo hậu tố/tiền tố mã lớp lệch đáp án', async () => {
    const db = await getDatabase('main');
    expect(await col(db, "SELECT toa_nha FROM lop_sinh_hoat WHERE ma_lop = 'KT24B'")).toEqual(['A']);
    expect(await col(db, "SELECT toa_nha FROM lop_sinh_hoat WHERE ma_lop = 'QT24A'")).toEqual(['C']);
    const answer = ['SV240228', 'SV240317'];
    expect((await col(db, "SELECT ma_sv FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop LIKE '%B' AND clb = 'Báo chí'")).sort()).not.toEqual(answer);
    expect((await col(db, "SELECT ma_sv FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop LIKE 'KT%' AND clb = 'Báo chí'")).sort()).not.toEqual(answer);
    expect((await col(db, "SELECT ma_lop FROM lop_sinh_hoat WHERE ma_lop LIKE '%B' ORDER BY ma_lop")).sort()).not.toEqual([...BUILDING_B_CLASSES]);
  });

  it('có thành viên Văn học khớp H + lớp tòa B (gần khớp nhưng không phải Báo chí)', async () => {
    const db = await getDatabase('main');
    expect(await count(db, "SELECT * FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B') AND clb = 'Văn học'")).toBeGreaterThanOrEqual(1);
  });
});

describe('dataset chính — QĐ-014: không có nhân vật cốt truyện', () => {
  it('không có tên Minh Anh, Hà Vy, Quân, Khánh, Tùng, Tư; Hoài/Hiếu chỉ ở hai dòng cố định; không họ đệm "Phạm Diệu"', () => {
    const forbiddenTen = new Set(['Anh', 'Vy', 'Hà', 'Quân', 'Khánh', 'Tùng', 'Tư', 'Minh']);
    for (const s of MAIN_STUDENT_ROWS) {
      const full = `${s.ho_dem} ${s.ten}`;
      expect(forbiddenTen.has(s.ten), full).toBe(false);
      expect(full.endsWith('Minh Anh') || full.endsWith('Hà Vy'), full).toBe(false);
      expect(s.ho_dem.startsWith('Phạm Diệu'), full).toBe(false);
      if (s.ten === 'Hoài') expect(s.ma_sv).toBe('SV240317');
      if (s.ten === 'Hiếu') expect(s.ma_sv).toBe('SV240228');
    }
  });
});
