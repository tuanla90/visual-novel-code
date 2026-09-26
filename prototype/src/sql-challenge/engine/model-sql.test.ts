/**
 * modelToSql / sqlToModel / validateModel: định dạng đúng tài liệu, khứ hồi bảo toàn, ngoài tập con
 * của trình dựng → null, lý do "chưa chạy được".
 */
import { describe, expect, it } from 'vitest';
import { emptyQueryModel, type QueryCondition, type QueryModel } from '../types';
import { CONNECTOR_PLACEHOLDER, isModelRunnable, likePatternToOp, modelToSql, sqlToModel, validateModel } from './model-sql';
import { runQuery } from './run';

const cond = (id: string, column: QueryCondition['column'], op: QueryCondition['op'], value: string | string[]): QueryCondition => ({
  id,
  column,
  op,
  value,
  source: { kind: 'manual' },
});

/** Bỏ id/source để so cấu trúc (parser sinh id mới và luôn đặt source manual). */
function shape(m: QueryModel | null) {
  if (!m) return null;
  return {
    table: m.table,
    columns: m.columns,
    connector: m.connector,
    conditions: m.conditions.map(({ column, op, value }) => ({ column, op, value })),
  };
}

const C3_MODEL: QueryModel = {
  table: 'sinh_vien',
  columns: ['ma_sv', 'ho_dem', 'ten', 'ma_lop', 'clb'],
  conditions: [cond('a', 'ten', 'startsWith', 'H'), cond('b', 'ma_lop', 'in', ['KT24A', 'QT24B']), cond('c', 'clb', 'eq', 'Báo chí')],
  connector: 'AND',
};

describe('modelToSql — định dạng nhiều dòng như tài liệu', () => {
  it('c3: SELECT / FROM / WHERE / "  AND", kết thúc bằng ;', () => {
    expect(modelToSql(C3_MODEL)).toBe(
      ["SELECT ma_sv, ho_dem, ten, ma_lop, clb", 'FROM sinh_vien', "WHERE ten LIKE 'H%'", "  AND ma_lop IN ('KT24A', 'QT24B')", "  AND clb = 'Báo chí';"].join('\n'),
    );
  });

  it('truy vấn OR của Quân: "   OR" canh phải theo WHERE (§4.4)', () => {
    expect(modelToSql({ ...C3_MODEL, connector: 'OR' })).toBe(
      ["SELECT ma_sv, ho_dem, ten, ma_lop, clb", 'FROM sinh_vien', "WHERE ten LIKE 'H%'", "   OR ma_lop IN ('KT24A', 'QT24B')", "   OR clb = 'Báo chí';"].join('\n'),
    );
  });

  it('ba phép LIKE, =, IN; nháy đơn nhân đôi; * ; một điều kiện không có từ nối', () => {
    expect(modelToSql({ table: 'sinh_vien', columns: '*', conditions: [cond('a', 'ten', 'endsWith', 'h')], connector: null })).toBe("SELECT *\nFROM sinh_vien\nWHERE ten LIKE '%h';");
    expect(modelToSql({ table: 'sinh_vien', columns: ['ten'], conditions: [cond('a', 'ten', 'contains', "O'Br")], connector: null })).toBe("SELECT ten\nFROM sinh_vien\nWHERE ten LIKE '%O''Br%';");
    expect(modelToSql({ table: 'lop_sinh_hoat', columns: ['ma_lop'], conditions: [cond('a', 'toa_nha', 'eq', 'B')], connector: null })).toBe("SELECT ma_lop\nFROM lop_sinh_hoat\nWHERE toa_nha = 'B';");
    expect(modelToSql({ table: 'lop_sinh_hoat', columns: ['ma_lop'], conditions: [cond('a', 'ma_lop', 'in', ["K'T", 'Q'])], connector: null })).toBe("SELECT ma_lop\nFROM lop_sinh_hoat\nWHERE ma_lop IN ('K''T', 'Q');");
  });

  it('model dở dang vẫn sinh được: bảng trống, chưa chọn cột, chưa chọn phép nối', () => {
    expect(modelToSql(emptyQueryModel())).toBe('SELECT\nFROM;');
    expect(modelToSql({ table: 'sinh_vien', columns: [], conditions: [], connector: null })).toBe('SELECT\nFROM sinh_vien;');
    const sql = modelToSql({ ...C3_MODEL, connector: null });
    expect(sql).toContain(`${CONNECTOR_PLACEHOLDER} ma_lop`);
    expect(sqlToModel(sql)).toBeNull();
  });

  it('SQL sinh ra chạy được trên SQLite và cho đúng số dòng của QĐ-012', async () => {
    expect(await runQuery(modelToSql(C3_MODEL))).toMatchObject({ ok: true, rowCount: 2 });
    expect(await runQuery(modelToSql({ ...C3_MODEL, connector: 'OR' }))).toMatchObject({ ok: true, rowCount: 24 });
  });
});

describe('sqlToModel — đúng tập con của trình dựng', () => {
  it('SQL chuẩn c1/c2/c3 và truy vấn của Quân phân tích được', () => {
    expect(shape(sqlToModel("SELECT ma_sv, ho_dem, ten\nFROM sinh_vien\nWHERE ten LIKE 'H%';"))).toEqual({
      table: 'sinh_vien',
      columns: ['ma_sv', 'ho_dem', 'ten'],
      connector: null,
      conditions: [{ column: 'ten', op: 'startsWith', value: 'H' }],
    });
    expect(shape(sqlToModel("SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B'"))).toEqual({
      table: 'lop_sinh_hoat',
      columns: ['ma_lop'],
      connector: null,
      conditions: [{ column: 'toa_nha', op: 'eq', value: 'B' }],
    });
    expect(shape(sqlToModel(modelToSql(C3_MODEL)))).toEqual(shape(C3_MODEL));
    expect(sqlToModel("SELECT ma_sv, ho_dem, ten, ma_lop, clb\nFROM sinh_vien\nWHERE ten LIKE 'H%'\n   OR ma_lop IN ('KT24A', 'QT24B')\n   OR clb = 'Báo chí';")?.connector).toBe('OR');
  });

  it('không phân biệt hoa/thường từ khóa và tên; * ; chú thích; khoảng trắng tùy ý; giá trị số', () => {
    expect(shape(sqlToModel("select * from SINH_VIEN where TEN like 'h%'"))).toEqual({
      table: 'sinh_vien',
      columns: '*',
      connector: null,
      conditions: [{ column: 'ten', op: 'startsWith', value: 'h' }],
    });
    expect(sqlToModel("SELECT ma_lop FROM lop_sinh_hoat -- lớp\nWHERE khoa_hoc = 2024")?.conditions[0]?.value).toBe('2024');
  });

  it.each([
    ['DISTINCT', 'SELECT DISTINCT ten FROM sinh_vien'],
    ['alias cột', 'SELECT ten AS t FROM sinh_vien'],
    ['alias bảng', 'SELECT ten FROM sinh_vien s'],
    ['hàm', 'SELECT COUNT(*) FROM sinh_vien'],
    ['ORDER BY', 'SELECT ten FROM sinh_vien ORDER BY ten'],
    ['LIMIT', "SELECT ten FROM sinh_vien WHERE ten LIKE 'H%' LIMIT 2"],
    ['ngoặc', "SELECT ten FROM sinh_vien WHERE (ten LIKE 'H%')"],
    ['trộn AND/OR', "SELECT ten FROM sinh_vien WHERE ten LIKE 'H%' AND clb = 'Báo chí' OR ma_lop = 'KT24A'"],
    ['truy vấn con', "SELECT ten FROM sinh_vien WHERE ma_lop IN (SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B')"],
    ['NOT', "SELECT ten FROM sinh_vien WHERE ten NOT LIKE 'H%'"],
    ['<>', "SELECT ten FROM sinh_vien WHERE clb <> 'Guitar'"],
    ['bảng ngoài schema', "SELECT ten FROM giang_vien"],
    ['cột ngoài schema', "SELECT ten, tuoi FROM sinh_vien"],
    ['cột không thuộc bảng', "SELECT ma_lop FROM sinh_vien WHERE toa_nha = 'B'"],
    ['cột trùng', 'SELECT ten, ten FROM sinh_vien'],
    ['LIKE không có %', "SELECT ten FROM sinh_vien WHERE ten LIKE 'H'"],
    ['LIKE % ở giữa', "SELECT ten FROM sinh_vien WHERE ten LIKE 'H%a'"],
    ['LIKE có _', "SELECT ten FROM sinh_vien WHERE ten LIKE 'H_%'"],
    ['IN rỗng', 'SELECT ten FROM sinh_vien WHERE ma_lop IN ()'],
    ['định danh có nháy kép', 'SELECT "ten" FROM sinh_vien'],
    ['thiếu FROM', 'SELECT ten'],
    ['nhiều câu', 'SELECT ten FROM sinh_vien; SELECT 1'],
    ['câu ghi', 'DELETE FROM sinh_vien'],
    ['chuỗi chưa đóng', "SELECT ten FROM sinh_vien WHERE ten LIKE 'H%"],
    ['rỗng', ''],
  ])('ngoài tập con → null: %s', (_label, sql) => {
    expect(sqlToModel(sql)).toBeNull();
  });

  it('likePatternToOp: ba dạng và các mẫu bị từ chối', () => {
    expect(likePatternToOp('H%')).toEqual({ op: 'startsWith', value: 'H' });
    expect(likePatternToOp('%h')).toEqual({ op: 'endsWith', value: 'h' });
    expect(likePatternToOp('%Báo chí%')).toEqual({ op: 'contains', value: 'Báo chí' });
    expect(likePatternToOp('%')).toBeNull();
    expect(likePatternToOp('%%')).toBeNull();
    expect(likePatternToOp('H')).toBeNull();
  });
});

describe('khứ hồi model → SQL → model bảo toàn (bỏ id/source)', () => {
  const cases: Array<[string, QueryModel]> = [
    ['c1', { table: 'sinh_vien', columns: ['ma_sv', 'ho_dem', 'ten'], conditions: [cond('x', 'ten', 'startsWith', 'H')], connector: null }],
    ['c2', { table: 'lop_sinh_hoat', columns: ['ma_lop'], conditions: [cond('x', 'toa_nha', 'eq', 'B')], connector: null }],
    ['c3 AND', C3_MODEL],
    ['Quân OR', { ...C3_MODEL, connector: 'OR' }],
    ['* không điều kiện', { table: 'lop_sinh_hoat', columns: '*', conditions: [], connector: null }],
    ['tiếng Việt có dấu + nháy đơn', { table: 'sinh_vien', columns: ['ten'], conditions: [cond('x', 'clb', 'eq', "Văn học 'cũ'"), cond('y', 'ho_dem', 'contains', "Đặng O'Hà")], connector: 'OR' }],
    ['endsWith và IN một phần tử', { table: 'sinh_vien', columns: ['ma_sv'], conditions: [cond('x', 'ten', 'endsWith', 'h'), cond('y', 'ma_lop', 'in', ['QT24B'])], connector: 'AND' }],
    ['IN có nháy đơn và dấu', { table: 'lop_sinh_hoat', columns: ['ma_lop', 'nganh'], conditions: [cond('x', 'nganh', 'in', ['Kế toán', "Tài chính 'x'"])], connector: null }],
    ['giá trị rỗng (dở dang nhưng sinh/đọc được)', { table: 'sinh_vien', columns: ['ten'], conditions: [cond('x', 'ten', 'eq', '')], connector: null }],
  ];
  it.each(cases)('%s', (_label, model) => {
    const sql = modelToSql(model);
    const back = sqlToModel(sql);
    expect(shape(back)).toEqual(shape(model));
    expect(modelToSql(back!)).toBe(sql);
  });
});

describe('validateModel — lý do chưa chạy được (mã blocking)', () => {
  it('bảng null → no-table; hai điều kiện mà connector null → connector-unset', () => {
    expect(validateModel(emptyQueryModel()).map((d) => d.code)).toEqual(['no-table', 'no-columns']);
    expect(validateModel({ ...C3_MODEL, connector: null }).map((d) => d.code)).toEqual(['connector-unset']);
    expect(validateModel({ ...C3_MODEL, conditions: [C3_MODEL.conditions[0]!], connector: null })).toEqual([]);
  });

  it('chưa chọn cột → no-columns; điều kiện thiếu giá trị → no-value (kèm cột); * là đủ cột', () => {
    expect(validateModel({ table: 'sinh_vien', columns: [], conditions: [], connector: null }).map((d) => d.code)).toEqual(['no-columns']);
    const noValue = validateModel({ table: 'sinh_vien', columns: '*', conditions: [cond('a', 'ten', 'startsWith', ''), cond('b', 'ma_lop', 'in', [])], connector: 'AND' });
    expect(noValue).toEqual([{ code: 'no-value', severity: 'blocking', detail: 'ten, ma_lop' }]);
    expect(validateModel({ table: 'sinh_vien', columns: '*', conditions: [], connector: null })).toEqual([]);
  });

  it('mọi mã đều blocking; debrief-fix (OR nạp sẵn) chạy được', () => {
    for (const d of validateModel(emptyQueryModel())) expect(d.severity).toBe('blocking');
    expect(isModelRunnable({ ...C3_MODEL, connector: 'OR' })).toBe(true);
    expect(isModelRunnable(emptyQueryModel())).toBe(false);
  });
});
