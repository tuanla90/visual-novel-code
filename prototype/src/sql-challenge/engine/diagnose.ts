/**
 * Chẩn đoán (QĐ-040): phát hiện TẤT CẢ mã áp dụng được cho một lần chạy chưa đúng, từ hai nguồn:
 *
 * 1. CẤU TRÚC — QueryModel nếu trình dựng đưa; nếu người chơi gõ SQL tay thì thử sqlToModel; không được
 *    thì phân tích nhẹ văn bản (analyzeShape: bảng, WHERE, AND/OR tầng ngoài, LIMIT, cột, mẫu LIKE, hằng).
 *    So với cấu trúc của SQL chuẩn (sqlToModel(spec.referenceSql)).
 * 2. KẾT QUẢ — so tập kết quả với đáp án: cả bảng → no-filter; đúng dòng thiếu cột → missing-columns.
 *
 * Mã nào không chắc thì KHÔNG đoán: không có mã → `other` (do bước chọn lời quyết định).
 * Engine chỉ trả mã; lời hiển thị thuộc nội dung (gói noi-dung).
 */
import type { DiagnosticCode } from '../../shared/ids';
import type { ChallengeSpec, ConditionOp, Connector, Diagnostic, QueryModel, RunFailure } from '../types';
import type { CompareResult } from './compare';
import { sqlToModel } from './model-sql';
import { analyzeShape, type LikeShape } from './sql-text';

// ---------- Cấu trúc truy vấn (hợp nhất ba nguồn) ----------

export interface StructCondition {
  column: string;
  /** `unknown`: LIKE ngoài ba dạng của trình dựng (giá trị là mẫu nguyên văn). */
  op: ConditionOp | 'unknown';
  values: string[];
}

export interface QueryStructure {
  source: 'model' | 'parsed' | 'text';
  table: string | null;
  hasWhere: boolean;
  /** `null`: ≤ 1 điều kiện hoặc không rõ; `mixed`: vừa AND vừa OR ở tầng ngoài. */
  connector: Connector | 'mixed' | null;
  conditions: StructCondition[];
  /** Mọi cột bị lọc (kể cả cột chỉ thấy tên qua phân tích văn bản). */
  filteredColumns: string[];
  usesLimit: boolean;
  /** Hằng chuỗi trong WHERE. */
  literals: string[];
}

function fromModel(model: QueryModel, source: 'model' | 'parsed'): QueryStructure {
  const conditions: StructCondition[] = model.conditions.map((c) => ({
    column: c.column,
    op: c.op,
    values: Array.isArray(c.value) ? c.value : [c.value],
  }));
  return {
    source,
    table: model.table,
    hasWhere: conditions.length > 0,
    connector: conditions.length >= 2 ? model.connector : null,
    conditions,
    filteredColumns: unique(conditions.map((c) => c.column)),
    usesLimit: false,
    literals: conditions.flatMap((c) => c.values),
  };
}

function likeToCondition(like: LikeShape): StructCondition {
  const inner = like.pattern.replace(/^%/, '').replace(/%$/, '');
  switch (like.wildcard) {
    case 'starts':
      return { column: like.column, op: 'startsWith', values: [inner] };
    case 'ends':
      return { column: like.column, op: 'endsWith', values: [inner] };
    case 'contains':
      return { column: like.column, op: 'contains', values: [inner] };
    default:
      return { column: like.column, op: 'unknown', values: [like.pattern] };
  }
}

/** Cấu trúc của truy vấn người chơi: model → sqlToModel → phân tích văn bản. */
export function analyzeStructure(sql: string, model: QueryModel | null): QueryStructure {
  if (model) return fromModel(model, 'model');
  const parsed = sqlToModel(sql);
  if (parsed) return fromModel(parsed, 'parsed');
  const shape = analyzeShape(sql);
  const conditions: StructCondition[] = [
    ...shape.likes.map(likeToCondition),
    ...shape.comparisons.map((c) => ({ column: c.column, op: c.op, values: c.values })),
  ];
  const connector: QueryStructure['connector'] =
    shape.hasTopLevelOr && shape.hasTopLevelAnd ? 'mixed' : shape.hasTopLevelOr ? 'OR' : shape.hasTopLevelAnd ? 'AND' : null;
  return {
    source: 'text',
    table: shape.table,
    hasWhere: shape.hasWhere,
    connector,
    conditions,
    filteredColumns: unique([...shape.whereColumns, ...conditions.map((c) => c.column)]),
    usesLimit: shape.hasLimit,
    literals: shape.whereLiterals,
  };
}

const referenceCache = new WeakMap<ChallengeSpec, QueryStructure | null>();

/** Cấu trúc của SQL chuẩn (null nếu SQL chuẩn ngoài tập con của trình dựng — khi đó bỏ các so sánh cấu trúc). */
export function referenceStructure(spec: ChallengeSpec): QueryStructure | null {
  if (!referenceCache.has(spec)) {
    const model = sqlToModel(spec.referenceSql);
    referenceCache.set(spec, model ? fromModel(model, 'parsed') : null);
  }
  return referenceCache.get(spec) ?? null;
}

// ---------- Mã theo cấu trúc ----------

const LIKE_OPS: ReadonlySet<StructCondition['op']> = new Set(['startsWith', 'endsWith', 'contains']);
const VALUE_OPS: ReadonlySet<StructCondition['op']> = new Set(['eq', 'in']);
const STUDENT_ID = /^SV\d+$/i;

function normalizedConditionKey(c: StructCondition): string {
  const values = LIKE_OPS.has(c.op) ? c.values.map((v) => v.toLowerCase()) : [...c.values];
  return `${c.column}|${c.op}|${JSON.stringify(values.sort())}`;
}

/** Cấu trúc điều kiện của người chơi tương đương SQL chuẩn (chỉ kết luận khi có model/parse được). */
export function conditionsEquivalent(player: QueryStructure, reference: QueryStructure | null): boolean | null {
  if (!reference || player.source === 'text') return null;
  const a = player.conditions.map(normalizedConditionKey).sort();
  const b = reference.conditions.map(normalizedConditionKey).sort();
  if (a.length !== b.length || a.some((k, i) => k !== b[i])) return false;
  return a.length < 2 || player.connector === reference.connector;
}

/** Mã rút ra từ CẤU TRÚC truy vấn (so với cấu trúc SQL chuẩn). */
export function diagnoseStructure(spec: ChallengeSpec, s: QueryStructure, ref: QueryStructure | null): Diagnostic[] {
  const out: Diagnostic[] = [];
  const add = (code: DiagnosticCode, detail?: string): void => {
    out.push(detail === undefined ? { code, severity: 'error' } : { code, severity: 'error', detail });
  };
  const filtered = new Set(s.filteredColumns.map((c) => c.toLowerCase()));

  if (s.table !== null && s.table !== spec.table) add('wrong-table', s.table);
  if (filtered.has('ho_dem')) add('wrong-column-ho-dem');

  for (const c of s.conditions) {
    if (c.column === 'ten' && c.op === 'endsWith') add('like-ends-with', c.values[0]);
    if (c.column === 'ten' && c.op === 'contains') add('like-contains', c.values[0]);
  }

  // class-prefix: lọc ma_lop bằng LIKE, hoặc bằng =/IN với mã lớp có chữ B ở cuối mà không thuộc danh sách lớp tòa B của SQL chuẩn.
  const refClasses = ref?.conditions.filter((c) => c.column === 'ma_lop' && VALUE_OPS.has(c.op)).flatMap((c) => c.values) ?? [];
  for (const c of s.conditions.filter((c) => c.column === 'ma_lop')) {
    if (LIKE_OPS.has(c.op) || c.op === 'unknown') add('class-prefix', c.values[0]);
    else if (c.values.some((v) => !refClasses.includes(v) && /b$/i.test(v))) add('class-prefix', c.values.join(', '));
  }

  // wrong-value: cùng cột, cùng loại phép, giá trị khác SQL chuẩn.
  for (const rc of ref?.conditions ?? []) {
    for (const pc of s.conditions.filter((c) => c.column === rc.column)) {
      if (LIKE_OPS.has(rc.op) && pc.op === rc.op && (pc.values[0] ?? '').toLowerCase() !== (rc.values[0] ?? '').toLowerCase()) {
        add('wrong-value', `${pc.column}: ${pc.values[0] ?? ''}`);
      } else if (VALUE_OPS.has(rc.op) && VALUE_OPS.has(pc.op) && pc.values.some((v) => !rc.values.includes(v))) {
        add('wrong-value', `${pc.column}: ${pc.values.join(', ')}`);
      }
    }
  }

  if (filtered.has('ma_sv') || s.literals.some((l) => STUDENT_ID.test(l))) add('hardcoded-ids');
  if (s.usesLimit) add('limit-used');
  if (s.connector === 'OR') add('or-connector');

  // missing-condition: thiếu cột điều kiện so với SQL chuẩn (khi đã có lọc, hoặc SQL chuẩn cần ≥ 2 điều kiện).
  // Không xét khi đã lọc thẳng ma_sv: truy vấn đó không "thiếu manh mối" mà thay manh mối bằng đáp án
  // (hardcoded-ids mới là lời đúng; missing-condition đứng trước trong thẻ c3 nên phải loại ở đây).
  if (ref && !filtered.has('ma_sv')) {
    const refCols = unique(ref.conditions.map((c) => c.column));
    const missing = refCols.filter((c) => !filtered.has(c));
    if (missing.length > 0 && (filtered.size > 0 || refCols.length >= 2)) add('missing-condition', missing.join(', '));
  }

  if (!s.hasWhere) add('no-filter');
  return out;
}

// ---------- Mã theo kết quả ----------

/** Mã cho một lần chạy thất bại ở SQLite / bước kiểm câu. `no_column` với bảng sai → wrong-table (không blocking). */
export function diagnoseRunFailure(spec: ChallengeSpec, failure: RunFailure, structure: QueryStructure): Diagnostic[] {
  switch (failure.kind) {
    case 'not_select':
      return [{ code: 'not-select', severity: 'blocking', detail: failure.message }];
    case 'no_table':
      return [{ code: 'no-table', severity: 'blocking', detail: failure.message }];
    case 'no_column':
      if (structure.table !== null && structure.table !== spec.table) {
        return [{ code: 'wrong-table', severity: 'error', detail: `${structure.table}: ${failure.message}` }];
      }
      return [{ code: 'syntax-error', severity: 'blocking', detail: failure.message }];
    case 'syntax':
    case 'other':
      return [{ code: 'syntax-error', severity: 'blocking', detail: failure.message }];
  }
}

export interface ResultDiagnosisInput {
  compare: CompareResult;
  playerRowCount: number;
  /** Số dòng của cả bảng đúng của thử thách trên dataset chính. */
  tableRowCount: number;
  /** Cấu trúc điều kiện tương đương SQL chuẩn (null = không biết). */
  conditionsEquivalent: boolean | null;
}

/** Mã rút ra từ TẬP KẾT QUẢ của một lần chạy chưa đúng trên dataset chính. */
export function diagnoseFromResult(input: ResultDiagnosisInput): Diagnostic[] {
  const { compare, playerRowCount, tableRowCount, conditionsEquivalent } = input;
  const out: Diagnostic[] = [];
  if (playerRowCount === tableRowCount && tableRowCount > 0) out.push({ code: 'no-filter', severity: 'error' });
  if (compare.rowCountMatch && compare.missingRequired.length > 0 && (compare.valueMappedCount > 0 || conditionsEquivalent === true)) {
    out.push({ code: 'missing-columns', severity: 'error', detail: compare.missingRequired.join(', ') });
  }
  return out;
}

function unique<T>(list: T[]): T[] {
  return [...new Set(list)];
}
