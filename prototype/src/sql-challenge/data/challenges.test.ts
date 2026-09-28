/**
 * Specs bốn thử thách: SQL chuẩn cho đúng số dòng QĐ-012 trên dataset chính; truy vấn OR của Quân
 * nguyên văn §4.4 và bằng SQL sinh từ initialModel của debrief-fix; cột bắt buộc theo QĐ-019.
 */
import { describe, expect, it } from 'vitest';
import { CHALLENGE_IDS, DIAGNOSTIC_CODES } from '../../shared/ids';
import { modelToSql, sqlToModel } from '../engine/model-sql';
import { runQuery } from '../engine/run';
import { CHALLENGE_DIAGNOSTIC_ORDER, CHALLENGE_SPECS, COMMON_DIAGNOSTIC_ORDER, QUAN_OR_QUERY, QUAN_QUERY_MODEL } from './challenges';

describe('CHALLENGE_SPECS', () => {
  it('có đủ 4 thử thách, id khớp khóa', () => {
    expect(Object.keys(CHALLENGE_SPECS).sort()).toEqual([...CHALLENGE_IDS].sort());
    for (const id of CHALLENGE_IDS) expect(CHALLENGE_SPECS[id].id).toBe(id);
  });

  it.each(CHALLENGE_IDS)('%s: SQL chuẩn chạy trên dataset chính ra đúng expectedRowCount và có đủ cột bắt buộc + khuyến khích', async (id) => {
    const spec = CHALLENGE_SPECS[id];
    const res = await runQuery(spec.referenceSql, 'main');
    expect(res.ok).toBe(true);
    if (!res.ok) return;
    expect(res.rowCount).toBe(spec.expectedRowCount);
    for (const c of [...spec.requiredColumns, ...spec.encouragedColumns]) expect(res.columns).toContain(c);
    expect(res.columns.length).toBe(spec.requiredColumns.length + spec.encouragedColumns.length);
  });

  it('expectedRowCount theo QĐ-012: 10 / 2 / 2 / 2; cột bắt buộc theo QĐ-019', () => {
    expect(CHALLENGE_IDS.map((id) => CHALLENGE_SPECS[id].expectedRowCount)).toEqual([10, 2, 2, 2]);
    expect(CHALLENGE_SPECS.c1.requiredColumns).toEqual(['ma_sv', 'ho_dem', 'ten']);
    expect(CHALLENGE_SPECS.c2.requiredColumns).toEqual(['ma_lop']);
    expect(CHALLENGE_SPECS.c3).toMatchObject({ requiredColumns: ['ma_sv', 'ho_dem', 'ten'], encouragedColumns: ['ma_lop', 'clb'] });
    expect(CHALLENGE_SPECS['debrief-fix']).toMatchObject({ requiredColumns: ['ma_sv', 'ho_dem', 'ten'], encouragedColumns: ['ma_lop', 'clb'] });
  });

  it('dataset ẩn chạy cho c1, c3, debrief-fix; c2 không (QĐ-015)', () => {
    expect(CHALLENGE_IDS.map((id) => CHALLENGE_SPECS[id].runHiddenDataset)).toEqual([true, false, true, true]);
  });

  it('SQL chuẩn c3 trên dataset ẩn ra 3 dòng (đáp án ẩn riêng)', async () => {
    expect(await runQuery(CHALLENGE_SPECS.c3.referenceSql, 'hidden')).toMatchObject({ ok: true, rowCount: 3 });
  });
});

describe('truy vấn OR của Quân và model nạp sẵn của debrief-fix', () => {
  it('QUAN_OR_QUERY nguyên văn §4.4 (5 dòng, OR canh phải) và ra 24 dòng', async () => {
    expect(QUAN_OR_QUERY).toBe(
      "SELECT ma_sv, ho_dem, ten, ma_lop, clb\nFROM sinh_vien\nWHERE ten LIKE 'H%'\n   OR ma_lop IN ('KT24A', 'QT24B')\n   OR clb = 'Báo chí';",
    );
    expect(await runQuery(QUAN_OR_QUERY)).toMatchObject({ ok: true, rowCount: 24 });
  });

  it('initialModel: bảng sinh_vien, 5 cột, 3 điều kiện, OR, nguồn giá trị đúng manh mối/vật chứng; sinh SQL đúng nguyên văn', () => {
    const m = CHALLENGE_SPECS['debrief-fix'].initialModel;
    expect(m).toBe(QUAN_QUERY_MODEL);
    expect(m).toMatchObject({ table: 'sinh_vien', columns: ['ma_sv', 'ho_dem', 'ten', 'ma_lop', 'clb'], connector: 'OR' });
    expect(m!.conditions.map((c) => c.source)).toEqual([
      { kind: 'clue', clueId: 'clue-signature-h' },
      { kind: 'evidence', evidenceId: 'ev-c2-classes-b' },
      { kind: 'clue', clueId: 'clue-bookmark-baochi' },
    ]);
    expect(modelToSql(m!)).toBe(QUAN_OR_QUERY);
    expect(sqlToModel(QUAN_OR_QUERY)?.connector).toBe('OR');
    // Đổi OR → AND ra đúng SQL chuẩn của c3/debrief-fix.
    expect(modelToSql({ ...m!, connector: 'AND' })).toBe(CHALLENGE_SPECS['debrief-fix'].referenceSql);
    // Ba thử thách còn lại không nạp sẵn model.
    expect(CHALLENGE_SPECS.c1.initialModel).toBeUndefined();
    expect(CHALLENGE_SPECS.c2.initialModel).toBeUndefined();
    expect(CHALLENGE_SPECS.c3.initialModel).toBeUndefined();
  });
});

describe('thứ tự ưu tiên mã chẩn đoán theo kịch bản', () => {
  it('mã trong thẻ và mục chung đều là mã hợp lệ, đúng thứ tự liệt kê của docs/prototype/kich-ban-prototype.md', () => {
    for (const id of CHALLENGE_IDS) for (const code of CHALLENGE_DIAGNOSTIC_ORDER[id]) expect(DIAGNOSTIC_CODES).toContain(code);
    for (const code of COMMON_DIAGNOSTIC_ORDER) expect(DIAGNOSTIC_CODES).toContain(code);
    expect(CHALLENGE_DIAGNOSTIC_ORDER.c1).toEqual(['no-filter', 'missing-columns']);
    expect(CHALLENGE_DIAGNOSTIC_ORDER.c2).toEqual(['wrong-table', 'class-prefix', 'no-filter', 'wrong-value', 'missing-columns']);
    expect(CHALLENGE_DIAGNOSTIC_ORDER.c3).toEqual(['or-connector', 'same-column-and', 'missing-condition', 'class-prefix', 'class-subset', 'missing-columns']);
    expect(CHALLENGE_DIAGNOSTIC_ORDER['debrief-fix']).toEqual(['or-connector', 'missing-condition', 'missing-columns']);
    expect(COMMON_DIAGNOSTIC_ORDER[0]).toBe('not-select');
    expect(COMMON_DIAGNOSTIC_ORDER.at(-1)).toBe('other');
  });
});
