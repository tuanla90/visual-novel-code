/**
 * BẢNG CA KIỂM của brief gói 3 (QĐ-040): với mỗi ca, mã hiển thị = pickDiagnostic(mã đã phát hiện,
 * lời của thẻ theo đúng thứ tự kịch bản, lời chung) và phải bằng `primaryCode` của engine.
 * Kèm test cho pickDiagnostic (ưu tiên, fallback other, lời thiếu) và phân tích cấu trúc.
 */
import { describe, expect, it } from 'vitest';
import { sampleChallenges, sampleCommonDiagnosticLines } from '../../content/sample/challenges.sample';
import { CHALLENGE_IDS, type ChallengeId, type DiagnosticCode } from '../../shared/ids';
import { CHALLENGE_DIAGNOSTIC_ORDER, CHALLENGE_SPECS, COMMON_DIAGNOSTIC_ORDER, QUAN_OR_QUERY } from '../data/challenges';
import type { ChallengeContent, CommonDiagnosticLines, DiagnosticResponse, GradeStatus, QueryModel } from '../types';
import { analyzeStructure, conditionsEquivalent, diagnoseStructure, referenceStructure } from './diagnose';
import { gradeChallenge } from './grade';
import { pickDiagnostic } from './priority';

/** Bảng lời "đầy đủ" dựng từ danh sách mã của kịch bản (đúng thứ tự), lời chỉ là giữ chỗ. */
const line = (code: string): DiagnosticResponse => ({ line: { speaker: 'ha-vy', expression: 'thinking', text: `[${code}]` } });
const FULL_CARD_LINES: Record<ChallengeId, ChallengeContent['diagnosticLines']> = Object.fromEntries(
  CHALLENGE_IDS.map((id) => [id, Object.fromEntries(CHALLENGE_DIAGNOSTIC_ORDER[id].map((c) => [c, line(c)]))]),
) as Record<ChallengeId, ChallengeContent['diagnosticLines']>;
const FULL_COMMON_LINES: CommonDiagnosticLines = Object.fromEntries(COMMON_DIAGNOSTIC_ORDER.map((c) => [c, line(c)]));

interface Case {
  id: ChallengeId;
  label: string;
  sql: string;
  model?: QueryModel;
  status: GradeStatus;
  /** Mã hiển thị kỳ vọng (null = đúng, không mẹo). */
  shown: DiagnosticCode | null;
  /** Mã khác cũng phải được phát hiện. */
  also?: DiagnosticCode[];
  rowCount?: number;
  hiddenPassed?: boolean | null;
}

const C1 = 'SELECT ma_sv, ho_dem, ten FROM sinh_vien';
const C3 = 'SELECT ma_sv, ho_dem, ten, ma_lop, clb FROM sinh_vien';
const B = "ma_lop IN ('KT24A', 'QT24B')";
const P = "clb = 'Báo chí'";
const H = "ten LIKE 'H%'";
const fixModel = CHALLENGE_SPECS['debrief-fix'].initialModel!;

const CASES: Case[] = [
  { id: 'c1', label: 'SQL chuẩn', sql: CHALLENGE_SPECS.c1.referenceSql, status: 'correct', shown: null, rowCount: 10, hiddenPassed: true },
  { id: 'c1', label: 'đổi thứ tự cột, chữ thường', sql: "SELECT ten, ma_sv, ho_dem FROM sinh_vien WHERE ten LIKE 'h%'", status: 'correct', shown: null },
  { id: 'c1', label: 'alias', sql: "SELECT ma_sv AS ma, ho_dem, ten AS t FROM sinh_vien WHERE ten LIKE 'H%'", status: 'correct', shown: null },
  { id: 'c1', label: 'SELECT *', sql: "SELECT * FROM sinh_vien WHERE ten LIKE 'H%'", status: 'correct', shown: 'extra-columns' },
  { id: 'c1', label: 'không lọc', sql: C1, status: 'incorrect', shown: 'no-filter', rowCount: 40 },
  { id: 'c1', label: 'lọc ho_dem', sql: `${C1} WHERE ho_dem LIKE 'H%'`, status: 'incorrect', shown: 'wrong-column-ho-dem' },
  { id: 'c1', label: "LIKE '%H'", sql: `${C1} WHERE ten LIKE '%H'`, status: 'incorrect', shown: 'like-ends-with' },
  { id: 'c1', label: "LIKE '%h%'", sql: `${C1} WHERE ten LIKE '%h%'`, status: 'incorrect', shown: 'like-contains' },
  { id: 'c1', label: "LIKE 'H' (0 dòng)", sql: `${C1} WHERE ten LIKE 'H'`, status: 'incorrect', shown: 'other', rowCount: 0 },
  { id: 'c1', label: 'chỉ SELECT ten', sql: "SELECT ten FROM sinh_vien WHERE ten LIKE 'H%'", status: 'incorrect', shown: 'missing-columns' },
  {
    id: 'c1',
    label: 'gõ cứng 10 mã',
    sql: `${C1} WHERE ma_sv IN ('SV240228','SV240317','SV240325','SV240338','SV240362','SV240379','SV240384','SV240397','SV240402','SV240415')`,
    status: 'incorrect',
    shown: 'hardcoded-ids',
    hiddenPassed: false,
  },
  { id: 'c2', label: 'SQL chuẩn', sql: CHALLENGE_SPECS.c2.referenceSql, status: 'correct', shown: null, rowCount: 2, hiddenPassed: null },
  { id: 'c2', label: 'SELECT *', sql: "SELECT * FROM lop_sinh_hoat WHERE toa_nha = 'B'", status: 'correct', shown: 'extra-columns' },
  { id: 'c2', label: 'sai bảng (chạy được)', sql: "SELECT ma_lop FROM sinh_vien WHERE ma_lop LIKE '%B'", status: 'incorrect', shown: 'wrong-table', also: ['class-prefix'] },
  { id: 'c2', label: 'sai bảng (cột toa_nha không có → lỗi SQLite)', sql: "SELECT ma_lop FROM sinh_vien WHERE toa_nha = 'B'", status: 'error', shown: 'wrong-table' },
  { id: 'c2', label: 'hậu tố mã lớp', sql: "SELECT ma_lop FROM lop_sinh_hoat WHERE ma_lop LIKE '%B'", status: 'incorrect', shown: 'class-prefix' },
  { id: 'c2', label: 'không lọc', sql: 'SELECT ma_lop FROM lop_sinh_hoat', status: 'incorrect', shown: 'no-filter', rowCount: 8 },
  { id: 'c2', label: "toa_nha = 'A'", sql: "SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'A'", status: 'incorrect', shown: 'wrong-value' },
  { id: 'c2', label: "toa_nha = 'b' (0 dòng)", sql: "SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'b'", status: 'incorrect', shown: 'wrong-value', rowCount: 0 },
  { id: 'c2', label: 'thiếu cột (chỉ nganh)', sql: "SELECT nganh FROM lop_sinh_hoat WHERE toa_nha = 'B'", status: 'incorrect', shown: 'missing-columns' },
  { id: 'c3', label: 'SQL chuẩn', sql: CHALLENGE_SPECS.c3.referenceSql, status: 'correct', shown: null, rowCount: 2, hiddenPassed: true },
  { id: 'c3', label: 'truy vấn con cho lớp tòa B', sql: `${C3} WHERE ${H} AND ma_lop IN (SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B') AND ${P}`, status: 'correct', shown: null },
  { id: 'c3', label: 'ba điều kiện nối OR', sql: `${C3} WHERE ${H} OR ${B} OR ${P}`, status: 'incorrect', shown: 'or-connector', rowCount: 24 },
  { id: 'c3', label: 'bỏ điều kiện H', sql: `${C3} WHERE ${B} AND ${P}`, status: 'incorrect', shown: 'missing-condition', rowCount: 4 },
  { id: 'c3', label: 'bỏ điều kiện lớp', sql: `${C3} WHERE ${H} AND ${P}`, status: 'incorrect', shown: 'missing-condition', rowCount: 4 },
  { id: 'c3', label: 'bỏ điều kiện CLB', sql: `${C3} WHERE ${H} AND ${B}`, status: 'incorrect', shown: 'missing-condition', rowCount: 4 },
  { id: 'c3', label: 'thiếu điều kiện + LIMIT 2 (đạt chính, trượt ẩn)', sql: `${C3} WHERE ${H} AND ${P} LIMIT 2`, status: 'incorrect', shown: 'missing-condition', also: ['limit-used'], rowCount: 2, hiddenPassed: false },
  { id: 'c3', label: 'gõ cứng hai mã', sql: `${C3} WHERE ma_sv IN ('SV240317','SV240228')`, status: 'incorrect', shown: 'hardcoded-ids', hiddenPassed: false },
  { id: 'c3', label: 'lớp bằng hậu tố %B', sql: `${C3} WHERE ${H} AND ma_lop LIKE '%B' AND ${P}`, status: 'incorrect', shown: 'class-prefix' },
  { id: 'c3', label: "lớp KT24B (chữ B trong mã)", sql: `${C3} WHERE ${H} AND ma_lop IN ('KT24B', 'QT24B') AND ${P}`, status: 'incorrect', shown: 'class-prefix' },
  { id: 'c3', label: 'cùng một cột nối AND', sql: `${C3} WHERE ${H} AND ma_lop = 'KT24A' AND ma_lop = 'QT24B' AND ${P}`, status: 'incorrect', shown: 'same-column-and', rowCount: 0 },
  { id: 'c3', label: 'chỉ lọc 1 lớp KT24A (thiếu lớp)', sql: `${C3} WHERE ${H} AND ma_lop = 'KT24A' AND ${P}`, status: 'incorrect', shown: 'class-subset', rowCount: 1 },
  { id: 'c3', label: 'không lọc gì', sql: C3, status: 'incorrect', shown: 'missing-condition', also: ['no-filter'], rowCount: 40 },
  { id: 'c3', label: 'đúng dòng, thiếu cột', sql: `SELECT ten FROM sinh_vien WHERE ${H} AND ${B} AND ${P}`, status: 'incorrect', shown: 'missing-columns' },
  { id: 'c3', label: 'đủ ba điều kiện + LIMIT 2 (đáp án ẩn 3 dòng)', sql: `${C3} WHERE ${H} AND ${B} AND ${P} LIMIT 2`, status: 'incorrect', shown: 'limit-used', hiddenPassed: false },
  { id: 'c1', label: 'quá 2000 dòng', sql: 'SELECT a.ma_sv FROM sinh_vien a, sinh_vien b, sinh_vien c', status: 'error', shown: 'too-many-rows' },
  { id: 'debrief-fix', label: 'truy vấn Quân nguyên văn (model OR)', sql: QUAN_OR_QUERY, model: fixModel, status: 'incorrect', shown: 'or-connector', rowCount: 24 },
  { id: 'debrief-fix', label: 'truy vấn Quân nguyên văn (SQL tay)', sql: QUAN_OR_QUERY, status: 'incorrect', shown: 'or-connector', rowCount: 24 },
  { id: 'debrief-fix', label: 'đổi OR → AND', sql: CHALLENGE_SPECS['debrief-fix'].referenceSql, model: { ...fixModel, connector: 'AND' }, status: 'correct', shown: null, rowCount: 2 },
  { id: 'debrief-fix', label: 'AND nhưng xóa một điều kiện', sql: '', model: { ...fixModel, connector: 'AND', conditions: fixModel.conditions.slice(0, 2) }, status: 'incorrect', shown: 'missing-condition' },
  { id: 'c1', label: 'DELETE', sql: 'DELETE FROM sinh_vien', status: 'error', shown: 'not-select' },
  { id: 'c3', label: 'SELECT 1; DROP TABLE', sql: 'SELECT 1; DROP TABLE sinh_vien', status: 'error', shown: 'not-select' },
  { id: 'c2', label: 'SELEC', sql: 'SELEC ma_sv FROM sinh_vien', status: 'error', shown: 'syntax-error' },
  { id: 'c1', label: 'model bảng null', sql: 'SELECT\nFROM;', model: { table: null, columns: ['ten'], conditions: [], connector: null }, status: 'error', shown: 'no-table' },
  { id: 'c3', label: 'model 2 điều kiện, connector null', sql: '', model: { ...fixModel, connector: null }, status: 'error', shown: 'connector-unset' },
];

describe('BẢNG CA KIỂM — mã hiển thị sau khi áp quy tắc ưu tiên', () => {
  it.each(CASES.map((c) => [`${c.id} · ${c.label}`, c] as const))('%s', async (_label, c) => {
    const model = c.model ?? null;
    const sql = c.sql || (model ? require_sql(model) : '');
    const g = await gradeChallenge(CHALLENGE_SPECS[c.id], sql, model);
    expect(g.status, `status; diagnostics = ${JSON.stringify(g.diagnostics)}`).toBe(c.status);
    const codes = g.diagnostics.map((d) => d.code);
    const picked = pickDiagnostic(codes, FULL_CARD_LINES[c.id], FULL_COMMON_LINES);
    expect(picked?.code ?? null, `mã hiển thị; phát hiện = ${codes.join(', ')}`).toBe(c.shown);
    expect(g.primaryCode, 'primaryCode của engine phải trùng mã hiển thị').toBe(c.shown);
    for (const extra of c.also ?? []) expect(codes, `cũng phải phát hiện ${extra}`).toContain(extra);
    if (c.rowCount !== undefined) expect(g.run).toMatchObject({ ok: true, rowCount: c.rowCount });
    if (c.hiddenPassed !== undefined) expect(g.hidden.passed).toBe(c.hiddenPassed);
  });

  it("'other' chỉ khi engine không có mã nào (LIKE 'H' 0 dòng); danh sách rỗng = đúng không mẹo → null", async () => {
    const g = await gradeChallenge(CHALLENGE_SPECS.c1, "SELECT ma_sv, ho_dem, ten FROM sinh_vien WHERE ten LIKE 'H'", null);
    expect(g.diagnostics).toEqual([{ code: 'other', severity: 'error' }]);
    expect(pickDiagnostic(g.diagnostics.map((d) => d.code), FULL_CARD_LINES.c1, FULL_COMMON_LINES)).toEqual({ code: 'other', response: line('other') });
    expect(pickDiagnostic([], FULL_CARD_LINES.c1, FULL_COMMON_LINES)).toBeNull();
  });
});

/** SQL cho các ca chỉ có model (giống UI: SQL sinh từ model). */
function require_sql(model: QueryModel): string {
  const cols = model.columns === '*' ? '*' : model.columns.join(', ');
  const conds = model.conditions.map((c) => (c.op === 'in' ? `${c.column} IN (${(c.value as string[]).map((v) => `'${v}'`).join(', ')})` : c.op === 'eq' ? `${c.column} = '${c.value as string}'` : `${c.column} LIKE '${c.value as string}%'`));
  return `SELECT ${cols} FROM ${model.table} WHERE ${conds.join(` ${model.connector ?? 'AND'} `)}`;
}

describe('pickDiagnostic — quy tắc ưu tiên và fallback', () => {
  it('blocking thắng mọi mã khác, theo thứ tự BLOCKING_DIAGNOSTIC_CODES', () => {
    expect(pickDiagnostic(['missing-columns', 'connector-unset', 'no-table'], FULL_CARD_LINES.c3, FULL_COMMON_LINES)?.code).toBe('no-table');
    expect(pickDiagnostic(['or-connector', 'syntax-error'], FULL_CARD_LINES.c3, FULL_COMMON_LINES)?.code).toBe('syntax-error');
  });

  it('mã trong thẻ theo thứ tự khóa của thẻ, trước mã chung', () => {
    expect(pickDiagnostic(['missing-columns', 'limit-used', 'missing-condition', 'or-connector'], FULL_CARD_LINES.c3, FULL_COMMON_LINES)?.code).toBe('or-connector');
    expect(pickDiagnostic(['limit-used', 'wrong-column-ho-dem'], FULL_CARD_LINES.c1, FULL_COMMON_LINES)?.code).toBe('wrong-column-ho-dem');
    // QĐ-054: wrong-table không có trong thẻ c1 nhưng có ở mục chung → lời chung (không còn rơi về other).
    expect(pickDiagnostic(['wrong-table'], FULL_CARD_LINES.c1, FULL_COMMON_LINES)).toEqual({ code: 'wrong-table', response: line('wrong-table') });
  });

  it('mã không có lời ở thẻ lẫn mục chung vẫn rơi về other (missing-condition ở c1, no-filter ở c3 / debrief-fix)', () => {
    // Tiền đề: các mã này thật sự không có trong thẻ tương ứng và không có ở mục chung.
    expect(COMMON_DIAGNOSTIC_ORDER).not.toContain('missing-condition');
    expect(COMMON_DIAGNOSTIC_ORDER).not.toContain('no-filter');
    expect(CHALLENGE_DIAGNOSTIC_ORDER.c1).not.toContain('missing-condition');
    expect(CHALLENGE_DIAGNOSTIC_ORDER.c3).not.toContain('no-filter');
    expect(CHALLENGE_DIAGNOSTIC_ORDER['debrief-fix']).not.toContain('no-filter');
    const other = { code: 'other', response: line('other') };
    expect(pickDiagnostic(['missing-condition'], FULL_CARD_LINES.c1, FULL_COMMON_LINES)).toEqual(other);
    expect(pickDiagnostic(['no-filter'], FULL_CARD_LINES.c3, FULL_COMMON_LINES)).toEqual(other);
    expect(pickDiagnostic(['no-filter'], FULL_CARD_LINES['debrief-fix'], FULL_COMMON_LINES)).toEqual(other);
  });

  it('lời: thẻ trước, chung sau; blocking chưa có lời → response null nhưng vẫn trả mã', () => {
    const own = { 'no-filter': line('riêng') } satisfies ChallengeContent['diagnosticLines'];
    expect(pickDiagnostic(['no-filter'], own, FULL_COMMON_LINES)).toEqual({ code: 'no-filter', response: line('riêng') });
    expect(pickDiagnostic(['no-columns'], {}, {})).toEqual({ code: 'no-columns', response: null });
    expect(pickDiagnostic(['extra-columns'], {}, FULL_COMMON_LINES)).toEqual({ code: 'extra-columns', response: line('extra-columns') });
  });

  it('với nội dung MẪU (thiếu nhiều mã) vẫn không lộ mã thô: rơi về other, và trùng với ưu tiên engine khi mã có lời', () => {
    const c2Sample = sampleChallenges.c2.content.diagnosticLines;
    expect(pickDiagnostic(['class-prefix'], c2Sample, sampleCommonDiagnosticLines)?.code).toBe('other');
    expect(pickDiagnostic(['wrong-table', 'class-prefix'], c2Sample, sampleCommonDiagnosticLines)?.code).toBe('wrong-table');
    for (const id of CHALLENGE_IDS) {
      const keys = Object.keys(sampleChallenges[id].content.diagnosticLines);
      const order = CHALLENGE_DIAGNOSTIC_ORDER[id] as readonly string[];
      // Khóa của nội dung mẫu là tập con đúng thứ tự của kịch bản.
      expect(keys.filter((k) => order.includes(k))).toEqual(order.filter((k) => keys.includes(k)));
    }
  });
});

describe('phân tích cấu trúc (model → parse → văn bản)', () => {
  it('cấu trúc SQL chuẩn của cả bốn spec phân tích được', () => {
    for (const id of CHALLENGE_IDS) expect(referenceStructure(CHALLENGE_SPECS[id])).not.toBeNull();
    expect(referenceStructure(CHALLENGE_SPECS.c3)?.conditions.map((c) => c.column)).toEqual(['ten', 'ma_lop', 'clb']);
  });

  it('văn bản: LIMIT + IN + LIKE + = rút được điều kiện; truy vấn con giữ tên cột', () => {
    const s = analyzeStructure("SELECT * FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop IN ('KT24B', 'QT24B') AND clb = 'Báo chí' LIMIT 2", null);
    expect(s.source).toBe('text');
    expect(s.usesLimit).toBe(true);
    expect(s.connector).toBe('AND');
    expect(s.conditions).toEqual([
      { column: 'ten', op: 'startsWith', values: ['H'] },
      { column: 'ma_lop', op: 'in', values: ['KT24B', 'QT24B'] },
      { column: 'clb', op: 'eq', values: ['Báo chí'] },
    ]);
    const sub = analyzeStructure("SELECT * FROM sinh_vien WHERE ma_lop IN (SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B')", null);
    expect(sub.filteredColumns).toEqual(['ma_lop']);
    expect(sub.conditions).toEqual([]);
  });

  it('conditionsEquivalent: đúng khi cùng điều kiện (không phân biệt thứ tự, hoa/thường của LIKE); null với văn bản', () => {
    const ref = referenceStructure(CHALLENGE_SPECS.c3);
    expect(conditionsEquivalent(analyzeStructure("SELECT ten FROM sinh_vien WHERE clb = 'Báo chí' AND ten LIKE 'h%' AND ma_lop IN ('QT24B', 'KT24A')", null), ref)).toBe(true);
    expect(conditionsEquivalent(analyzeStructure("SELECT ten FROM sinh_vien WHERE clb = 'Báo chí' OR ten LIKE 'H%' OR ma_lop IN ('QT24B', 'KT24A')", null), ref)).toBe(false);
    expect(conditionsEquivalent(analyzeStructure("SELECT ten FROM sinh_vien WHERE ten LIKE 'H%' LIMIT 1", null), ref)).toBeNull();
  });

  it('diagnoseStructure không đoán: SQL chuẩn không sinh mã nào; wrong-value chỉ khi cùng cột cùng phép', () => {
    for (const id of CHALLENGE_IDS) {
      const spec = CHALLENGE_SPECS[id];
      expect(diagnoseStructure(spec, analyzeStructure(spec.referenceSql, null), referenceStructure(spec))).toEqual([]);
    }
    const spec = CHALLENGE_SPECS.c3;
    const codes = (sql: string) => diagnoseStructure(spec, analyzeStructure(sql, null), referenceStructure(spec)).map((d) => d.code);
    expect(codes(`${C3} WHERE ${H} AND ma_lop IN ('KT24A') AND ${P}`)).toEqual(['class-subset']);
    expect(codes(`${C3} WHERE ${H} AND ${B} AND clb = 'Văn học'`)).toEqual(['wrong-value']);
  });
});
