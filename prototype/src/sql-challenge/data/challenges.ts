/**
 * Đặc tả bốn thử thách (phía engine) — NƠI DUY NHẤT (nghiệm thu nen-mong lần 2): SQL chuẩn, cột bắt
 * buộc/khuyến khích (QĐ-019), chạy dataset ẩn (QĐ-015), số dòng kỳ vọng (QĐ-012), model nạp sẵn của
 * debrief-fix (QĐ-016/QĐ-039), truy vấn OR của Quân nguyên văn (§4.4), và thứ tự ưu tiên mã chẩn đoán
 * theo thẻ (docs/kich-ban-prototype.md, "Quy ước thẻ thử thách"). Gói noi-dung ghép với
 * ChallengeContent thành ChallengeDefinition.
 */
import type { ChallengeId, DiagnosticCode } from '../../shared/ids';
import type { ChallengeSpec, QueryModel } from '../types';

/** Truy vấn OR của Quân, nguyên văn §4.4 / deb-01 (5 dòng). */
export const QUAN_OR_QUERY = [
  'SELECT ma_sv, ho_dem, ten, ma_lop, clb',
  'FROM sinh_vien',
  "WHERE ten LIKE 'H%'",
  "   OR ma_lop IN ('KT24A', 'QT24B')",
  "   OR clb = 'Báo chí';",
].join('\n');

/** SQL chuẩn của c3 và debrief-fix (§4.3). */
export const C3_REFERENCE_SQL = [
  'SELECT ma_sv, ho_dem, ten, ma_lop, clb',
  'FROM sinh_vien',
  "WHERE ten LIKE 'H%'",
  "  AND ma_lop IN ('KT24A', 'QT24B')",
  "  AND clb = 'Báo chí';",
].join('\n');

export const C1_REFERENCE_SQL = ['SELECT ma_sv, ho_dem, ten', 'FROM sinh_vien', "WHERE ten LIKE 'H%';"].join('\n');
export const C2_REFERENCE_SQL = ['SELECT ma_lop', 'FROM lop_sinh_hoat', "WHERE toa_nha = 'B';"].join('\n');

/** Model của truy vấn Quân, nạp sẵn vào trình dựng ở debrief-fix; nguồn giá trị ghi đúng manh mối/vật chứng (QĐ-017). */
export const QUAN_QUERY_MODEL: QueryModel = {
  table: 'sinh_vien',
  columns: ['ma_sv', 'ho_dem', 'ten', 'ma_lop', 'clb'],
  conditions: [
    { id: 'quan-signature-h', column: 'ten', op: 'startsWith', value: 'H', source: { kind: 'clue', clueId: 'clue-signature-h' } },
    { id: 'quan-classes-b', column: 'ma_lop', op: 'in', value: ['KT24A', 'QT24B'], source: { kind: 'evidence', evidenceId: 'ev-c2-classes-b' } },
    { id: 'quan-bookmark', column: 'clb', op: 'eq', value: 'Báo chí', source: { kind: 'clue', clueId: 'clue-bookmark-baochi' } },
  ],
  connector: 'OR',
};

export const CHALLENGE_SPECS: Record<ChallengeId, ChallengeSpec> = {
  c1: {
    id: 'c1',
    table: 'sinh_vien',
    referenceSql: C1_REFERENCE_SQL,
    requiredColumns: ['ma_sv', 'ho_dem', 'ten'],
    encouragedColumns: [],
    runHiddenDataset: true,
    expectedRowCount: 10,
  },
  c2: {
    id: 'c2',
    table: 'lop_sinh_hoat',
    referenceSql: C2_REFERENCE_SQL,
    requiredColumns: ['ma_lop'],
    encouragedColumns: [],
    runHiddenDataset: false,
    expectedRowCount: 2,
  },
  c3: {
    id: 'c3',
    table: 'sinh_vien',
    referenceSql: C3_REFERENCE_SQL,
    requiredColumns: ['ma_sv', 'ho_dem', 'ten'],
    encouragedColumns: ['ma_lop', 'clb'],
    runHiddenDataset: true,
    expectedRowCount: 2,
  },
  'debrief-fix': {
    id: 'debrief-fix',
    table: 'sinh_vien',
    referenceSql: C3_REFERENCE_SQL,
    requiredColumns: ['ma_sv', 'ho_dem', 'ten'],
    encouragedColumns: ['ma_lop', 'clb'],
    runHiddenDataset: true,
    initialModel: QUAN_QUERY_MODEL,
    expectedRowCount: 2,
  },
};

/**
 * Mã `[KHI: …]` của từng thẻ thử thách, ĐÚNG THỨ TỰ LIỆT KÊ trong kịch bản — thứ tự này là thứ tự
 * ưu tiên hiển thị (sau nhóm blocking, trước "Nhận xét chung").
 */
export const CHALLENGE_DIAGNOSTIC_ORDER: Record<ChallengeId, readonly DiagnosticCode[]> = {
  c1: ['no-filter', 'missing-columns'],
  c2: ['wrong-table', 'class-prefix', 'no-filter', 'wrong-value', 'missing-columns'],
  c3: ['or-connector', 'same-column-and', 'missing-condition', 'class-prefix', 'class-subset', 'missing-columns'],
  'debrief-fix': ['or-connector', 'missing-condition', 'missing-columns'],
};

/**
 * Mã ở "Nhận xét chung cho mọi thử thách" của kịch bản, ĐÚNG THỨ TỰ LIỆT KÊ — đủ mã theo kịch bản:
 * - 6 mã blocking đứng đầu, theo thứ tự engine `BLOCKING_DIAGNOSTIC_CODES` (QĐ-052; `no-columns`,
 *   `no-value` do gói 3 thêm — QĐ-047). Thứ tự ưu tiên của nhóm này do `BLOCKING_DIAGNOSTIC_CODES`
 *   quyết định (priority.ts), liệt kê ở đây để trùng với kịch bản.
 * - Rồi các mã "chưa đúng" chung (gồm `too-many-rows`, QĐ-054 thêm `wrong-table`, `or-connector`, `class-prefix`), mã mẹo
 *   `extra-columns` và `other` cuối.
 * Thứ tự khóa của `commonDiagnosticLines` trong nội dung PHẢI trùng mảng này (test diagnostics.test.ts).
 */
export const COMMON_DIAGNOSTIC_ORDER: readonly DiagnosticCode[] = [
  'not-select',
  'syntax-error',
  'no-table',
  'no-columns',
  'no-value',
  'connector-unset',
  'too-many-rows',
  // QĐ-054: ba mã thẻ thử thách không có — sai bảng trước tiên, rồi phép nối, rồi các mã lọc cột.
  'wrong-table',
  'or-connector',
  'wrong-column-ho-dem',
  'like-ends-with',
  'like-contains',
  'class-prefix',
  'hardcoded-ids',
  'limit-used',
  'wrong-value',
  'extra-columns',
  'other',
];
