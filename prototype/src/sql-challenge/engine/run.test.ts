/**
 * runQuery (QĐ-006): chỉ một câu SELECT / WITH … SELECT; từ chối câu ghi và nhiều câu; dữ liệu
 * còn nguyên sau mọi cố gắng ghi; tên cột có cả khi 0 dòng; lỗi SQLite có kind đúng.
 */
import { describe, expect, it } from 'vitest';
import { getDatabase } from './database';
import { runQuery } from './run';
import { analyzeShape, checkSingleSelect, stripComments, tokenize } from './sql-text';

async function countStudents(dataset: 'main' | 'hidden' = 'main'): Promise<number> {
  const db = await getDatabase(dataset);
  return Number(db.exec('SELECT COUNT(*) FROM sinh_vien')[0]?.values[0]?.[0]);
}

describe('runQuery — chạy được', () => {
  it('SELECT thường: đúng cột, đúng số dòng, giá trị tiếng Việt nguyên vẹn', async () => {
    const res = await runQuery("SELECT ma_sv, ho_dem, ten FROM sinh_vien WHERE ten LIKE 'H%';");
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.columns).toEqual(['ma_sv', 'ho_dem', 'ten']);
    expect(res.rowCount).toBe(10);
    expect(res.rows).toHaveLength(10);
    expect(res.rows).toContainEqual(['SV240317', 'Lê Thị', 'Hoài']);
  });

  it('0 dòng vẫn có tên cột (prepare + getColumnNames)', async () => {
    const res = await runQuery("SELECT ma_sv, ten AS t FROM sinh_vien WHERE ten = 'không có ai'");
    expect(res).toEqual({ ok: true, columns: ['ma_sv', 't'], rows: [], rowCount: 0 });
  });

  it('WITH … SELECT được chấp nhận; chú thích và dấu ; cuối không ảnh hưởng', async () => {
    const res = await runQuery(`-- lớp tòa B
      WITH b AS (SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B')
      SELECT ma_sv FROM sinh_vien WHERE ma_lop IN (SELECT ma_lop FROM b) /* xong */ ;`);
    expect(res.ok).toBe(true);
    if (res.ok) expect(res.rowCount).toBe(12);
  });

  it('dataset ẩn chạy cùng câu SQL cho kết quả khác', async () => {
    const main = await runQuery("SELECT ma_sv FROM sinh_vien WHERE ten LIKE 'H%'", 'main');
    const hidden = await runQuery("SELECT ma_sv FROM sinh_vien WHERE ten LIKE 'H%'", 'hidden');
    expect(main.ok && hidden.ok).toBe(true);
    if (main.ok && hidden.ok) {
      expect(main.rowCount).toBe(10);
      expect(hidden.rowCount).toBe(7);
    }
  });

  it('giá trị INTEGER giữ kiểu số', async () => {
    const res = await runQuery("SELECT khoa_hoc FROM lop_sinh_hoat WHERE ma_lop = 'KT24A'");
    expect(res.ok && res.rows[0]?.[0]).toBe(2024);
  });
});

describe('runQuery — từ chối câu không phải SELECT, dữ liệu còn nguyên (QĐ-006)', () => {
  it.each([
    ['DELETE FROM sinh_vien'],
    ["UPDATE sinh_vien SET ten = 'X'"],
    ["INSERT INTO sinh_vien VALUES ('SV1', 'A', 'B', 'KT24A', 'Guitar')"],
    ['DROP TABLE sinh_vien'],
    ['PRAGMA query_only = OFF'],
    ["WITH x AS (SELECT 1) DELETE FROM sinh_vien WHERE ma_sv = 'SV240317'"],
    ['VALUES (1)'],
    ['EXPLAIN SELECT * FROM sinh_vien'],
  ])('%s → not_select', async (sql) => {
    const res = await runQuery(sql);
    expect(res).toMatchObject({ ok: false, kind: 'not_select' });
    expect(await countStudents()).toBe(40);
  });

  it('nhiều câu (SELECT 1; DROP TABLE sinh_vien) → not_select, bảng vẫn còn 40 dòng', async () => {
    const res = await runQuery('SELECT 1; DROP TABLE sinh_vien');
    expect(res).toMatchObject({ ok: false, kind: 'not_select' });
    expect(await countStudents()).toBe(40);
    expect(await runQuery('SELECT COUNT(*) FROM sinh_vien')).toMatchObject({ ok: true, rows: [[40]] });
  });

  it('chuỗi rỗng / chỉ chú thích → not_select', async () => {
    expect(await runQuery('')).toMatchObject({ ok: false, kind: 'not_select' });
    expect(await runQuery('   -- chưa viết gì\n')).toMatchObject({ ok: false, kind: 'not_select' });
  });

  it('dấu ; trong chuỗi không bị coi là nhiều câu', async () => {
    const res = await runQuery("SELECT ma_sv FROM sinh_vien WHERE ten = 'a;b'");
    expect(res).toMatchObject({ ok: true, rowCount: 0 });
  });

  it('lớp bảo vệ thứ hai: PRAGMA query_only đang bật trên cả hai CSDL', async () => {
    for (const kind of ['main', 'hidden'] as const) {
      const db = await getDatabase(kind);
      expect(db.exec('PRAGMA query_only')[0]?.values[0]?.[0]).toBe(1);
      expect(() => db.run("DELETE FROM sinh_vien")).toThrow(/readonly|read-only|query_only/i);
      expect(await countStudents(kind)).toBe(kind === 'main' ? 40 : 14);
    }
  });
});

describe('runQuery — lỗi SQLite có kind', () => {
  it('SELEC … (gõ nhầm từ khóa) → syntax, không phải not_select', async () => {
    const res = await runQuery('SELEC ma_sv FROM sinh_vien');
    expect(res).toMatchObject({ ok: false, kind: 'syntax' });
    if (!res.ok) expect(res.message).toMatch(/syntax error/);
    expect(await runQuery('sinh_vien')).toMatchObject({ ok: false, kind: 'syntax' });
  });

  it('bảng không có → no_table; cột không có → no_column', async () => {
    expect(await runQuery('SELECT * FROM sinhvien')).toMatchObject({ ok: false, kind: 'no_table' });
    expect(await runQuery("SELECT ma_lop FROM sinh_vien WHERE toa_nha = 'B'")).toMatchObject({ ok: false, kind: 'no_column' });
  });

  it('thiếu nháy đóng → syntax', async () => {
    expect(await runQuery("SELECT * FROM sinh_vien WHERE ten LIKE 'H%")).toMatchObject({ ok: false, kind: 'syntax' });
  });

  it('không bao giờ ném: kết quả luôn là RunResult', async () => {
    await expect(runQuery('SELECT * FROM')).resolves.toMatchObject({ ok: false });
    await expect(runQuery('SELECT 1/0')).resolves.toMatchObject({ ok: true });
  });
});

describe('sql-text — phân tích văn bản', () => {
  it('stripComments giữ nguyên chuỗi có -- bên trong', () => {
    expect(stripComments("SELECT '--a' -- b\nFROM t /* c */")).toBe("SELECT '--a' \nFROM t  ");
  });

  it('tokenize gộp nháy nhân đôi và giữ tiếng Việt', () => {
    const { tokens } = tokenize("SELECT ten FROM sinh_vien WHERE clb = 'Báo chí' AND ho_dem = 'O''Neil'");
    expect(tokens.filter((t) => t.kind === 'string').map((t) => t.value)).toEqual(['Báo chí', "O'Neil"]);
  });

  it('checkSingleSelect: WITH … SELECT ok; WITH … INSERT không', () => {
    expect(checkSingleSelect('WITH a AS (SELECT 1) SELECT * FROM a;').ok).toBe(true);
    expect(checkSingleSelect('WITH a AS (SELECT 1) INSERT INTO t SELECT * FROM a')).toEqual({ ok: false, reason: 'not_select' });
    expect(checkSingleSelect('SELECT 1;;')).toEqual({ ok: true, sql: 'SELECT 1' });
  });

  it('analyzeShape rút bảng, WHERE, OR/AND tầng ngoài, LIMIT, cột, LIKE, hằng', () => {
    const s = analyzeShape("SELECT * FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop IN ('KT24A', 'QT24B') OR clb = 'Báo chí' LIMIT 2");
    expect(s.table).toBe('sinh_vien');
    expect(s.hasWhere).toBe(true);
    expect(s.hasTopLevelOr).toBe(true);
    expect(s.hasTopLevelAnd).toBe(false);
    expect(s.hasLimit).toBe(true);
    expect(s.whereColumns).toEqual(['ten', 'ma_lop', 'clb']);
    expect(s.likes).toEqual([{ column: 'ten', pattern: 'H%', wildcard: 'starts' }]);
    expect(s.whereLiterals).toEqual(['H%', 'KT24A', 'QT24B', 'Báo chí']);
  });

  it('analyzeShape: truy vấn con không làm OR bên trong thành OR tầng ngoài; không WHERE', () => {
    const s = analyzeShape("SELECT ma_sv FROM sinh_vien WHERE ma_lop IN (SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B' OR toa_nha = 'C') AND clb = 'Báo chí'");
    expect(s.hasSubquery).toBe(true);
    expect(s.hasTopLevelOr).toBe(false);
    expect(s.hasTopLevelAnd).toBe(true);
    expect(s.whereColumns).toEqual(['ma_lop', 'clb']);
    expect(analyzeShape('SELECT * FROM lop_sinh_hoat').hasWhere).toBe(false);
  });
});
