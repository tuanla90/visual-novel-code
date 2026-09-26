/**
 * gradeChallenge — chấm theo tập kết quả (QĐ-019) và dataset ẩn (QĐ-015). Các ca cần chẩn đoán
 * cấu trúc (wrong-column-ho-dem, like-*, or-connector, missing-condition, class-prefix, wrong-value,
 * limit-used) nằm ở diagnose.test.ts (commit sau).
 */
import { describe, expect, it } from 'vitest';
import { CHALLENGE_SPECS, QUAN_OR_QUERY } from '../data/challenges';
import { emptyQueryModel, type QueryModel } from '../types';
import { gradeChallenge } from './grade';
import { getDatabase } from './database';

const c1 = CHALLENGE_SPECS.c1;
const c2 = CHALLENGE_SPECS.c2;
const c3 = CHALLENGE_SPECS.c3;
const fix = CHALLENGE_SPECS['debrief-fix'];

async function studentCount(): Promise<number> {
  const db = await getDatabase('main');
  return Number(db.exec('SELECT COUNT(*) FROM sinh_vien')[0]?.values[0]?.[0]);
}

describe('gradeChallenge — đúng', () => {
  it('c1: SQL chuẩn → correct, 10 dòng, không mẹo, dataset ẩn đã chạy và đạt', async () => {
    const g = await gradeChallenge(c1, c1.referenceSql, null);
    expect(g).toMatchObject({ status: 'correct', primaryCode: null, diagnostics: [], extraColumns: false, hidden: { ran: true, passed: true } });
    expect(g.run).toMatchObject({ ok: true, rowCount: 10 });
  });

  it("c1: đổi thứ tự cột + chữ thường → correct", async () => {
    const g = await gradeChallenge(c1, "select ten, ma_sv, ho_dem from sinh_vien where ten like 'h%'", null);
    expect(g.status).toBe('correct');
    expect(g.diagnostics).toEqual([]);
  });

  it('c1: alias → correct', async () => {
    const g = await gradeChallenge(c1, "SELECT ma_sv AS ma, ho_dem, ten AS t FROM sinh_vien WHERE ten LIKE 'H%'", null);
    expect(g).toMatchObject({ status: 'correct', primaryCode: null });
  });

  it('c1: SELECT * → correct + extra-columns (tip), extraColumns = true', async () => {
    const g = await gradeChallenge(c1, "SELECT * FROM sinh_vien WHERE ten LIKE 'H%'", null);
    expect(g.status).toBe('correct');
    expect(g.extraColumns).toBe(true);
    expect(g.primaryCode).toBe('extra-columns');
    expect(g.diagnostics).toEqual([{ code: 'extra-columns', severity: 'tip', detail: 'ma_lop, clb' }]);
  });

  it('c1: ORDER BY và LIMIT thừa (không cắt bớt) vẫn đúng — thứ tự dòng không xét', async () => {
    expect((await gradeChallenge(c1, "SELECT ma_sv, ho_dem, ten FROM sinh_vien WHERE ten LIKE 'H%' ORDER BY ten DESC", null)).status).toBe('correct');
  });

  it('c2: SQL chuẩn → correct; SELECT * → correct + extra-columns; dataset ẩn không chạy', async () => {
    expect(await gradeChallenge(c2, c2.referenceSql, null)).toMatchObject({ status: 'correct', hidden: { ran: false, passed: null } });
    const star = await gradeChallenge(c2, "SELECT * FROM lop_sinh_hoat WHERE toa_nha = 'B'", null);
    expect(star).toMatchObject({ status: 'correct', extraColumns: true, primaryCode: 'extra-columns', hidden: { ran: false, passed: null } });
  });

  it('c3: SQL chuẩn → correct 2 dòng; bản dùng truy vấn con cho lớp tòa B → correct', async () => {
    expect(await gradeChallenge(c3, c3.referenceSql, null)).toMatchObject({ status: 'correct', hidden: { ran: true, passed: true } });
    const sub = await gradeChallenge(
      c3,
      "SELECT ma_sv, ho_dem, ten, ma_lop, clb FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop IN (SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B') AND clb = 'Báo chí'",
      null,
    );
    expect(sub).toMatchObject({ status: 'correct', extraColumns: false, primaryCode: null });
    expect(sub.run).toMatchObject({ ok: true, rowCount: 2 });
  });

  it('c3: chỉ ba cột bắt buộc (bỏ cột khuyến khích) vẫn correct, không mẹo', async () => {
    const g = await gradeChallenge(c3, "SELECT ma_sv, ho_dem, ten FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí'", null);
    expect(g).toMatchObject({ status: 'correct', extraColumns: false, diagnostics: [] });
  });

  it('debrief-fix: đổi OR → AND (qua model) → correct, 2 dòng', async () => {
    const model: QueryModel = { ...fix.initialModel!, connector: 'AND' };
    const g = await gradeChallenge(fix, fix.referenceSql, model);
    expect(g).toMatchObject({ status: 'correct', hidden: { ran: true, passed: true } });
    expect(g.run).toMatchObject({ ok: true, rowCount: 2 });
  });
});

describe('gradeChallenge — chưa đúng theo tập kết quả', () => {
  it('c1: không lọc → incorrect, no-filter, 40 dòng', async () => {
    const g = await gradeChallenge(c1, 'SELECT ma_sv, ho_dem, ten FROM sinh_vien', null);
    expect(g).toMatchObject({ status: 'incorrect', primaryCode: 'no-filter', hidden: { ran: false, passed: null } });
    expect(g.run).toMatchObject({ ok: true, rowCount: 40 });
  });

  it('c1: chỉ SELECT ten → incorrect, missing-columns (kèm chi tiết cột thiếu)', async () => {
    const g = await gradeChallenge(c1, "SELECT ten FROM sinh_vien WHERE ten LIKE 'H%'", null);
    expect(g.status).toBe('incorrect');
    expect(g.primaryCode).toBe('missing-columns');
    expect(g.diagnostics[0]).toMatchObject({ code: 'missing-columns', severity: 'error', detail: 'ma_sv, ho_dem' });
  });

  it('c1: gõ cứng 10 mã đúng → đạt chính, trượt ẩn → incorrect, hardcoded-ids', async () => {
    const ids = "'SV240228','SV240317','SV240325','SV240338','SV240362','SV240379','SV240384','SV240397','SV240402','SV240415'";
    const g = await gradeChallenge(c1, `SELECT ma_sv, ho_dem, ten FROM sinh_vien WHERE ma_sv IN (${ids})`, null);
    expect(g).toMatchObject({ status: 'incorrect', primaryCode: 'hardcoded-ids', hidden: { ran: true, passed: false } });
    expect(g.run).toMatchObject({ ok: true, rowCount: 10 });
  });

  it("c3: gõ cứng hai mã → đạt chính, trượt ẩn → incorrect, hardcoded-ids", async () => {
    const g = await gradeChallenge(c3, "SELECT ma_sv, ho_dem, ten, ma_lop, clb FROM sinh_vien WHERE ma_sv IN ('SV240317', 'SV240228')", null);
    expect(g).toMatchObject({ status: 'incorrect', primaryCode: 'hardcoded-ids', hidden: { ran: true, passed: false } });
  });

  it('debrief-fix: truy vấn Quân nguyên văn → incorrect, 24 dòng, không chạy dataset ẩn', async () => {
    const g = await gradeChallenge(fix, QUAN_OR_QUERY, fix.initialModel!);
    expect(g.status).toBe('incorrect');
    expect(g.run).toMatchObject({ ok: true, rowCount: 24 });
    expect(g.hidden).toEqual({ ran: false, passed: null });
  });

  it('c2: sai giá trị tòa nhà → incorrect (theo tập kết quả), 3 dòng', async () => {
    const g = await gradeChallenge(c2, "SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'A'", null);
    expect(g.status).toBe('incorrect');
    expect(g.run).toMatchObject({ ok: true, rowCount: 3 });
  });

  it('c1: 0 dòng (LIKE không có %) → incorrect, không có mã cụ thể → primaryCode null hoặc other', async () => {
    const g = await gradeChallenge(c1, "SELECT ma_sv, ho_dem, ten FROM sinh_vien WHERE ten LIKE 'H'", null);
    expect(g.status).toBe('incorrect');
    expect(g.run).toMatchObject({ ok: true, rowCount: 0 });
    expect([null, 'other']).toContain(g.primaryCode);
  });
});

describe('gradeChallenge — không chạy được', () => {
  it('DELETE và nhiều câu → error, not-select; dữ liệu còn nguyên 40 dòng', async () => {
    for (const sql of ['DELETE FROM sinh_vien', 'SELECT 1; DROP TABLE sinh_vien']) {
      const g = await gradeChallenge(c1, sql, null);
      expect(g).toMatchObject({ status: 'error', primaryCode: 'not-select', hidden: { ran: false, passed: null } });
      expect(g.diagnostics[0]).toMatchObject({ code: 'not-select', severity: 'blocking' });
      expect(g.run).toMatchObject({ ok: false, kind: 'not_select' });
      expect(await studentCount()).toBe(40);
    }
  });

  it('SELEC … → error, syntax-error (kèm thông điệp gốc trong detail)', async () => {
    const g = await gradeChallenge(c1, 'SELEC ma_sv FROM sinh_vien', null);
    expect(g).toMatchObject({ status: 'error', primaryCode: 'syntax-error' });
    expect(g.diagnostics[0]?.detail).toMatch(/syntax error/);
  });

  it('bảng không tồn tại → error, no-table', async () => {
    expect(await gradeChallenge(c1, 'SELECT * FROM sinhvien', null)).toMatchObject({ status: 'error', primaryCode: 'no-table' });
  });

  it('model: bảng null → error no-table; 2 điều kiện + connector null → error connector-unset (không chạy SQL)', async () => {
    const empty = await gradeChallenge(c1, 'SELECT\nFROM;', emptyQueryModel());
    expect(empty).toMatchObject({ status: 'error', primaryCode: 'no-table' });
    expect(empty.diagnostics.map((d) => d.code)).toEqual(['no-table', 'no-columns']);
    const unset: QueryModel = { ...fix.initialModel!, connector: null };
    const g = await gradeChallenge(c3, 'SELECT 1', unset);
    expect(g).toMatchObject({ status: 'error', primaryCode: 'connector-unset' });
    expect(g.run.ok).toBe(false);
  });
});
