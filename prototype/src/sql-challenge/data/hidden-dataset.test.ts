/**
 * Bất biến của dataset ẨN (QĐ-015): cùng bảng lớp, sinh_vien 12–16 dòng khác hẳn, đáp án c3
 * riêng, và MỖI cách gian lận của QĐ-015 phải cho tập kết quả khác đáp án ẩn.
 *
 * "Trượt ẩn" ở đây đo bằng chính SQLite: tập ma_sv của truy vấn gian lận ≠ tập ma_sv của SQL
 * chuẩn trên dataset ẩn (so tập, không chỉ so số dòng).
 */
import { describe, expect, it } from 'vitest';
import { getDatabase } from '../engine/database';
import { CLASS_ROWS } from './classes';
import { HIDDEN_STUDENT_ROWS } from './hidden-dataset';
import { MAIN_STUDENT_ROWS } from './main-dataset';
import { CLUBS } from './types';
import type { Database } from '../engine/sqljs';

const C1_REF = "SELECT ma_sv FROM sinh_vien WHERE ten LIKE 'H%'";
const C3_REF = "SELECT ma_sv FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí'";

function ids(db: Database, sql: string): string[] {
  return (db.exec(sql)[0]?.values ?? []).map((row) => String(row[0])).sort();
}

describe('dataset ẩn — hình dạng', () => {
  it('12–16 dòng, cùng bảng lớp, không NULL, không trùng mã, mã và tên khác hẳn dataset chính', async () => {
    const db = await getDatabase('hidden');
    const n = HIDDEN_STUDENT_ROWS.length;
    expect(n).toBeGreaterThanOrEqual(12);
    expect(n).toBeLessThanOrEqual(16);
    expect(Number(db.exec('SELECT COUNT(*) FROM sinh_vien')[0]?.values[0]?.[0])).toBe(n);
    expect(db.exec('SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat ORDER BY rowid')[0]?.values).toEqual(
      CLASS_ROWS.map((c) => [c.ma_lop, c.nganh, c.khoa_hoc, c.toa_nha]),
    );
    expect(Number(db.exec('SELECT COUNT(*) FROM sinh_vien WHERE ma_sv IS NULL OR ho_dem IS NULL OR ten IS NULL OR ma_lop IS NULL OR clb IS NULL')[0]?.values[0]?.[0])).toBe(0);
    expect(new Set(HIDDEN_STUDENT_ROWS.map((s) => s.ma_sv)).size).toBe(n);
    const mainIds = new Set(MAIN_STUDENT_ROWS.map((s) => s.ma_sv));
    const mainNames = new Set(MAIN_STUDENT_ROWS.map((s) => `${s.ho_dem} ${s.ten}`));
    for (const s of HIDDEN_STUDENT_ROWS) {
      expect(mainIds.has(s.ma_sv), s.ma_sv).toBe(false);
      expect(mainNames.has(`${s.ho_dem} ${s.ten}`), s.ten).toBe(false);
      expect(CLUBS as readonly string[]).toContain(s.clb);
      expect(CLASS_ROWS.map((c) => c.ma_lop)).toContain(s.ma_lop);
      for (const v of Object.values(s)) expect(v).toBe(v.normalize('NFC'));
    }
  });

  it('đáp án c3 ẩn là ba người khác Hoài/Hiếu; c1 ẩn có ít nhất một người', async () => {
    const db = await getDatabase('hidden');
    const c3 = ids(db, C3_REF);
    expect(c3).toHaveLength(3);
    expect(c3).not.toContain('SV240317');
    expect(c3).not.toContain('SV240228');
    expect(db.exec(`SELECT ten FROM sinh_vien WHERE ma_sv IN (${c3.map((id) => `'${id}'`).join(', ')}) ORDER BY ten`)[0]?.values.flat()).toEqual(['Hòa', 'Hưng', 'Hằng'].sort());
    expect(ids(db, C1_REF).length).toBeGreaterThanOrEqual(1);
  });
});

describe('dataset ẩn — từng cách gian lận của QĐ-015 phải trượt', () => {
  it('gõ cứng ma_sv của dataset chính → 0 dòng (c1 và c3)', async () => {
    const main = await getDatabase('main');
    const hidden = await getDatabase('hidden');
    const c1Ids = ids(main, C1_REF).map((id) => `'${id}'`).join(', ');
    expect(ids(hidden, `SELECT ma_sv FROM sinh_vien WHERE ma_sv IN (${c1Ids})`)).toEqual([]);
    expect(ids(hidden, "SELECT ma_sv FROM sinh_vien WHERE ma_sv IN ('SV240317', 'SV240228')")).toEqual([]);
    expect(ids(hidden, "SELECT ma_sv FROM sinh_vien WHERE ten IN ('Hoài', 'Hiếu')")).toEqual([]);
  });

  it('LIMIT 2 (thiếu điều kiện hoặc đủ ba điều kiện) → không bao giờ bằng đáp án ba người', async () => {
    const db = await getDatabase('hidden');
    const answer = ids(db, C3_REF);
    for (const where of [
      "ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí'",
      "ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí'",
      "ten LIKE 'H%' AND clb = 'Báo chí'",
      "ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B')",
    ]) {
      expect(ids(db, `SELECT ma_sv FROM sinh_vien WHERE ${where} LIMIT 2`), where).not.toEqual(answer);
    }
  });

  it('bỏ một điều kiện của c3 → mỗi cặp giao rộng hơn tập ba (H∩B = 4, H∩P = 5, B∩P = 4)', async () => {
    const db = await getDatabase('hidden');
    const answer = ids(db, C3_REF);
    const drop = {
      "ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí'": 4,
      "ten LIKE 'H%' AND clb = 'Báo chí'": 5,
      "ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B')": 4,
    };
    for (const [where, expected] of Object.entries(drop)) {
      const got = ids(db, `SELECT ma_sv FROM sinh_vien WHERE ${where}`);
      expect(got, where).toHaveLength(expected);
      expect(got).not.toEqual(answer);
      for (const id of answer) expect(got).toContain(id); // tập cha thật sự
    }
  });

  it('OR thay AND → hợp rộng hơn nhiều', async () => {
    const db = await getDatabase('hidden');
    const or = ids(db, "SELECT ma_sv FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop IN ('KT24A', 'QT24B') OR clb = 'Báo chí'");
    expect(or.length).toBeGreaterThan(ids(db, C3_REF).length + 3);
  });

  it("LIKE '%H%' và LIKE '%H' trên ten → khác đáp án c1 ẩn", async () => {
    const db = await getDatabase('hidden');
    const c1 = ids(db, C1_REF);
    const contains = ids(db, "SELECT ma_sv FROM sinh_vien WHERE ten LIKE '%H%'");
    expect(contains).not.toEqual(c1);
    expect(contains.length).toBeGreaterThan(c1.length);
    const endsWith = ids(db, "SELECT ma_sv FROM sinh_vien WHERE ten LIKE '%H'");
    expect(endsWith).not.toEqual(c1);
    expect(endsWith.length).toBeGreaterThanOrEqual(2);
  });

  it("lọc theo ho_dem LIKE 'H%' → khác đáp án c1 ẩn (có ≥ 2 người ho_dem H mà ten không)", async () => {
    const db = await getDatabase('hidden');
    expect(ids(db, "SELECT ma_sv FROM sinh_vien WHERE ho_dem LIKE 'H%'")).not.toEqual(ids(db, C1_REF));
    expect(ids(db, "SELECT ma_sv FROM sinh_vien WHERE ho_dem LIKE 'H%' AND ten NOT LIKE 'H%'").length).toBeGreaterThanOrEqual(2);
  });

  it("lọc lớp bằng hậu tố '%B' / tiền tố 'KT%' → khác đáp án c3 ẩn (tiền tố cho cùng 3 dòng nhưng khác người)", async () => {
    const db = await getDatabase('hidden');
    const answer = ids(db, C3_REF);
    const suffix = ids(db, "SELECT ma_sv FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop LIKE '%B' AND clb = 'Báo chí'");
    expect(suffix).not.toEqual(answer);
    const prefix = ids(db, "SELECT ma_sv FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop LIKE 'KT%' AND clb = 'Báo chí'");
    expect(prefix).toHaveLength(3);
    expect(prefix).not.toEqual(answer);
  });
});
