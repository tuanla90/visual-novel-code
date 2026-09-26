import { describe, expect, it } from 'vitest';
import type { RunSuccess, SqlValue } from '../types';
import { compareResults } from './compare';

const table = (columns: string[], rows: SqlValue[][]): RunSuccess => ({ ok: true, columns, rows, rowCount: rows.length });

const REF = table(
  ['ma_sv', 'ho_dem', 'ten'],
  [
    ['SV1', 'Lê Thị', 'Hoài'],
    ['SV2', 'Phạm Minh', 'Hiếu'],
    ['SV3', 'Trần Thị', 'Hương'],
  ],
);
const REQ = ['ma_sv', 'ho_dem', 'ten'] as const;

describe('compareResults — QĐ-019', () => {
  it('trùng hoàn toàn → matches, không cột thừa, quan hệ equal', () => {
    const r = compareResults(REF, REF, [...REQ], []);
    expect(r).toMatchObject({ rowCountMatch: true, matches: true, missingRequired: [], extraColumnIndexes: [], relation: 'equal', valueMappedCount: 3 });
    expect(r.requiredMap).toEqual({ ma_sv: 0, ho_dem: 1, ten: 2 });
  });

  it('đổi thứ tự dòng, đổi thứ tự cột, alias, tên cột chữ hoa → vẫn matches', () => {
    const player = table(
      ['T', 'ma', 'HO_DEM'],
      [
        ['Hương', 'SV3', 'Trần Thị'],
        ['Hoài', 'SV1', 'Lê Thị'],
        ['Hiếu', 'SV2', 'Phạm Minh'],
      ],
    );
    const r = compareResults(player, REF, [...REQ], []);
    expect(r.matches).toBe(true);
    expect(r.requiredMap).toEqual({ ma_sv: 1, ho_dem: 2, ten: 0 });
  });

  it('cột thừa → vẫn matches, extraColumnIndexes ghi cột thừa; cột khuyến khích không tính thừa', () => {
    const player = table(
      ['ma_sv', 'ho_dem', 'ten', 'ma_lop', 'clb'],
      [
        ['SV1', 'Lê Thị', 'Hoài', 'QT24B', 'Báo chí'],
        ['SV2', 'Phạm Minh', 'Hiếu', 'KT24A', 'Báo chí'],
        ['SV3', 'Trần Thị', 'Hương', 'QT24B', 'Văn học'],
      ],
    );
    expect(compareResults(player, REF, [...REQ], []).extraColumnIndexes).toEqual([3, 4]);
    const ref5 = table(['ma_sv', 'ho_dem', 'ten', 'ma_lop', 'clb'], player.rows);
    const r = compareResults(player, ref5, [...REQ], ['ma_lop', 'clb']);
    expect(r.matches).toBe(true);
    expect(r.extraColumnIndexes).toEqual([]);
    expect(r.encouragedMap).toEqual({ ma_lop: 3, clb: 4 });
  });

  it('thiếu cột bắt buộc nhưng đúng dòng → không matches, missingRequired, cột còn lại vẫn ánh xạ', () => {
    const player = table(['ten'], [['Hiếu'], ['Hoài'], ['Hương']]);
    const r = compareResults(player, REF, [...REQ], []);
    expect(r.matches).toBe(false);
    expect(r.missingRequired).toEqual(['ma_sv', 'ho_dem']);
    expect(r.requiredMap).toEqual({ ten: 0 });
    expect(r.valueMappedCount).toBe(1);
  });

  it('cùng số dòng nhưng bộ giá trị ghép sai hàng → không matches (so bộ, không so từng cột)', () => {
    const player = table(
      ['ma_sv', 'ho_dem', 'ten'],
      [
        ['SV1', 'Lê Thị', 'Hiếu'],
        ['SV2', 'Phạm Minh', 'Hoài'],
        ['SV3', 'Trần Thị', 'Hương'],
      ],
    );
    const r = compareResults(player, REF, [...REQ], []);
    expect(r.matches).toBe(false);
    // Ánh xạ tối đa vẫn bảo toàn được (ma_sv, ho_dem) hoặc (ten, …) nhưng không đủ ba cột.
    expect(r.valueMappedCount).toBeLessThan(3);
  });

  it('đa tập: dòng trùng phải trùng đúng số lần', () => {
    const ref = table(['ten'], [['Linh'], ['Linh'], ['Hoa']]);
    expect(compareResults(table(['ten'], [['Linh'], ['Hoa'], ['Hoa']]), ref, ['ten'], []).matches).toBe(false);
    expect(compareResults(table(['ten'], [['Hoa'], ['Linh'], ['Linh']]), ref, ['ten'], []).matches).toBe(true);
  });

  it('hai cột người chơi cùng giá trị: ánh xạ ưu tiên cột trùng tên', () => {
    const ref = table(['ma_lop', 'toa_nha'], [['KT24A', 'B'], ['QT24B', 'B']]);
    const player = table(['toa_nha', 'ma_lop', 'x'], [['B', 'KT24A', 'B'], ['B', 'QT24B', 'B']]);
    const r = compareResults(player, ref, ['ma_lop', 'toa_nha'], []);
    expect(r.matches).toBe(true);
    expect(r.requiredMap).toEqual({ ma_lop: 1, toa_nha: 0 });
    expect(r.extraColumnIndexes).toEqual([2]);
  });

  it('lệch số dòng: ánh xạ theo tên để xét quan hệ tập (subset / superset / disjoint / overlap)', () => {
    const superset = table(['ma_sv', 'ho_dem', 'ten'], [...REF.rows, ['SV9', 'Vũ Văn', 'Hải']]);
    expect(compareResults(superset, REF, [...REQ], [])).toMatchObject({ rowCountMatch: false, matches: false, relation: 'superset' });
    const subset = table(['ma_sv', 'ho_dem', 'ten'], [REF.rows[0]!]);
    expect(compareResults(subset, REF, [...REQ], []).relation).toBe('subset');
    const disjoint = table(['ma_sv', 'ho_dem', 'ten'], [['SV8', 'A', 'B']]);
    expect(compareResults(disjoint, REF, [...REQ], []).relation).toBe('disjoint');
    const overlap = table(['ma_sv', 'ho_dem', 'ten'], [REF.rows[0]!, ['SV8', 'A', 'B']]);
    expect(compareResults(overlap, REF, [...REQ], []).relation).toBe('overlap');
    const renamed = table(['a', 'b', 'c'], [REF.rows[0]!]);
    expect(compareResults(renamed, REF, [...REQ], []).relation).toBe('unknown');
  });

  it('0 dòng cả hai bên: matches khi có đủ tên cột bắt buộc (không có giá trị để so)', () => {
    const empty = table(['ma_sv', 'ho_dem', 'ten'], []);
    expect(compareResults(empty, empty, [...REQ], []).matches).toBe(true);
    // 0 dòng người chơi so với chuẩn có dòng → subset.
    expect(compareResults(empty, REF, [...REQ], []).relation).toBe('subset');
  });
});
