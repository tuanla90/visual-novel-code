/**
 * Chuyển đổi hai chiều giữa QueryModel (trình dựng, QĐ-016) và SQL.
 *
 * - modelToSql: SQL nhiều dòng đúng dạng tài liệu (SELECT / FROM / WHERE / `  AND` hoặc `   OR`,
 *   từ khóa nối canh phải theo WHERE, kết thúc bằng `;`).
 * - sqlToModel: phân tích ngược "best-effort" — chỉ nhận đúng tập con mà trình dựng biểu diễn
 *   được (một bảng trong schema, cột hoặc `*`, điều kiện `=` / LIKE ba dạng / IN danh sách hằng,
 *   MỘT phép nối chung). Ngoài tập con → `null` (QĐ-016: UI hỏi xác nhận quay về trạng thái
 *   trình dựng gần nhất).
 * - validateModel: lý do model "chưa chạy được" (mã blocking của QĐ-040) để UI vô hiệu nút Chạy.
 */
import type { DiagnosticCode } from '../../shared/ids';
import { TABLE_COLUMNS, isColumnOf, isTableName, type ColumnName, type TableName } from '../schema';
import type { ConditionOp, Connector, Diagnostic, QueryCondition, QueryModel } from '../types';
import { stripComments, tokenize, type Token } from './sql-text';

// ---------- Model → SQL ----------

/** Chỗ giữ cho phép nối khi model có ≥ 2 điều kiện mà chưa chọn AND/OR (SQL này không chạy được; UI đã chặn). */
export const CONNECTOR_PLACEHOLDER = 'AND/OR';

function quote(value: string): string {
  return `'${value.replaceAll("'", "''")}'`;
}

function conditionToSql(c: QueryCondition): string {
  const single = Array.isArray(c.value) ? (c.value[0] ?? '') : c.value;
  switch (c.op) {
    case 'eq':
      return `${c.column} = ${quote(single)}`;
    case 'startsWith':
      return `${c.column} LIKE ${quote(`${single}%`)}`;
    case 'endsWith':
      return `${c.column} LIKE ${quote(`%${single}`)}`;
    case 'contains':
      return `${c.column} LIKE ${quote(`%${single}%`)}`;
    case 'in': {
      const list = Array.isArray(c.value) ? c.value : [c.value];
      return `${c.column} IN (${list.map(quote).join(', ')})`;
    }
  }
}

/**
 * Sinh SQL từ model. Model dở dang vẫn sinh được (để ô SQL song song cập nhật tức thì):
 * bảng null → dòng `FROM` trống; chưa chọn cột → dòng `SELECT` trống; ≥ 2 điều kiện mà connector
 * null → từ khóa nối là CONNECTOR_PLACEHOLDER. Giá trị `%`/`_` trong LIKE không được thoát
 * (dữ liệu game không dùng hai ký tự này).
 */
export function modelToSql(model: QueryModel): string {
  const cols = model.columns === '*' ? '*' : model.columns.join(', ');
  const lines = [`SELECT${cols ? ` ${cols}` : ''}`, `FROM${model.table ? ` ${model.table}` : ''}`];
  model.conditions.forEach((c, i) => {
    if (i === 0) {
      lines.push(`WHERE ${conditionToSql(c)}`);
      return;
    }
    const keyword = model.connector ?? CONNECTOR_PLACEHOLDER;
    // Canh phải theo WHERE (5 ký tự): "  AND", "   OR" — đúng dạng tài liệu §4.3/§4.4.
    lines.push(`${keyword.padStart(5, ' ')} ${conditionToSql(c)}`);
  });
  return `${lines.join('\n')};`;
}

// ---------- SQL → Model ----------

class Cursor {
  private i = 0;
  constructor(private readonly tokens: Token[]) {}
  peek(offset = 0): Token | undefined {
    return this.tokens[this.i + offset];
  }
  next(): Token | undefined {
    const t = this.tokens[this.i];
    this.i += 1;
    return t;
  }
  done(): boolean {
    return this.i >= this.tokens.length;
  }
  /** Từ khóa (không phân biệt hoa/thường) — không phải định danh có nháy. */
  isKeyword(word: string, offset = 0): boolean {
    const t = this.peek(offset);
    return !!t && t.kind === 'word' && !t.value.startsWith('"') && t.value.toUpperCase() === word;
  }
  isPunct(p: string, offset = 0): boolean {
    const t = this.peek(offset);
    return !!t && t.kind === 'punct' && t.value === p;
  }
}

const RESERVED = new Set(['SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'LIKE', 'AS', 'DISTINCT', 'ORDER', 'LIMIT', 'GROUP', 'BY', 'HAVING', 'NULL', 'IS']);

/** Định danh trần (không nháy, không phải từ khóa), trả về chữ thường. */
function readIdentifier(cur: Cursor): string | null {
  const t = cur.peek();
  if (!t || t.kind !== 'word' || t.value.startsWith('"') || RESERVED.has(t.value.toUpperCase())) return null;
  cur.next();
  return t.value.toLowerCase();
}

/** Hằng chuỗi hoặc số → chuỗi giá trị của model. */
function readLiteral(cur: Cursor): string | null {
  const t = cur.peek();
  if (!t || (t.kind !== 'string' && t.kind !== 'number')) return null;
  cur.next();
  return t.value;
}

/** Mẫu LIKE → (op, giá trị) nếu đúng một trong ba dạng của trình dựng và phần lõi không chứa ký tự đại diện. */
export function likePatternToOp(pattern: string): { op: ConditionOp; value: string } | null {
  const starts = pattern.startsWith('%');
  const ends = pattern.length > 1 && pattern.endsWith('%');
  if (!starts && !ends) return null;
  const inner = pattern.slice(starts ? 1 : 0, ends ? pattern.length - 1 : pattern.length);
  if (inner.length === 0 || inner.includes('%') || inner.includes('_')) return null;
  if (starts && ends) return { op: 'contains', value: inner };
  if (starts) return { op: 'endsWith', value: inner };
  return { op: 'startsWith', value: inner };
}

function parseCondition(cur: Cursor, table: TableName, index: number): QueryCondition | null {
  const column = readIdentifier(cur);
  if (column === null || !isColumnOf(table, column)) return null;
  const id = `cond-${index}`;
  const source = { kind: 'manual' } as const;
  if (cur.isPunct('=')) {
    cur.next();
    const value = readLiteral(cur);
    if (value === null) return null;
    return { id, column, op: 'eq', value, source };
  }
  if (cur.isKeyword('LIKE')) {
    cur.next();
    const t = cur.peek();
    if (!t || t.kind !== 'string') return null;
    cur.next();
    const parsed = likePatternToOp(t.value);
    if (!parsed) return null;
    return { id, column, op: parsed.op, value: parsed.value, source };
  }
  if (cur.isKeyword('IN')) {
    cur.next();
    if (!cur.isPunct('(')) return null;
    cur.next();
    const values: string[] = [];
    for (;;) {
      const v = readLiteral(cur);
      if (v === null) return null;
      values.push(v);
      if (cur.isPunct(',')) {
        cur.next();
        continue;
      }
      break;
    }
    if (!cur.isPunct(')')) return null;
    cur.next();
    return { id, column, op: 'in', value: values, source };
  }
  return null;
}

/**
 * Phân tích ngược SQL về model; `null` khi ngoài tập con của trình dựng (ngoặc, truy vấn con,
 * trộn AND/OR, NOT, hàm, alias, DISTINCT, ORDER BY, LIMIT, bảng/cột không có trong schema,
 * LIKE ngoài ba dạng, IN rỗng, cột trùng…). `id` điều kiện sinh mới (`cond-1`…), `source` là
 * `manual` (SQL không mang thông tin nguồn giá trị).
 */
export function sqlToModel(sql: string): QueryModel | null {
  const { tokens, unterminatedString } = tokenize(stripComments(sql));
  if (unterminatedString || tokens.length === 0) return null;
  const cur = new Cursor(tokens);

  if (!cur.isKeyword('SELECT')) return null;
  cur.next();

  let columns: ColumnName[] | '*';
  const rawColumns: string[] = [];
  if (cur.isPunct('*')) {
    cur.next();
    columns = '*';
  } else {
    for (;;) {
      const col = readIdentifier(cur);
      if (col === null) return null;
      rawColumns.push(col);
      if (cur.isPunct(',')) {
        cur.next();
        continue;
      }
      break;
    }
    columns = [];
  }

  if (!cur.isKeyword('FROM')) return null;
  cur.next();
  const tableName = readIdentifier(cur);
  if (tableName === null || !isTableName(tableName)) return null;
  const table: TableName = tableName;

  if (columns !== '*') {
    const valid = TABLE_COLUMNS[table] as readonly string[];
    if (rawColumns.some((c) => !valid.includes(c))) return null;
    if (new Set(rawColumns).size !== rawColumns.length) return null;
    columns = rawColumns as ColumnName[];
  }

  const conditions: QueryCondition[] = [];
  let connector: Connector | null = null;
  if (cur.isKeyword('WHERE')) {
    cur.next();
    const first = parseCondition(cur, table, 1);
    if (!first) return null;
    conditions.push(first);
    while (cur.isKeyword('AND') || cur.isKeyword('OR')) {
      const word = cur.next()!.value.toUpperCase() as Connector;
      if (connector !== null && connector !== word) return null; // trộn AND/OR
      connector = word;
      const cond = parseCondition(cur, table, conditions.length + 1);
      if (!cond) return null;
      conditions.push(cond);
    }
  }

  while (cur.isPunct(';')) cur.next();
  if (!cur.done()) return null;

  return { table, columns, conditions, connector };
}

// ---------- Kiểm model "chưa chạy được" ----------

/**
 * Lý do model chưa chạy được, theo thứ tự ưu tiên hiển thị: bảng trống (`no-table`) → chưa chọn
 * cột (`no-columns`) → điều kiện thiếu giá trị (`no-value`) → ≥ 2 điều kiện mà chưa chọn phép nối
 * (`connector-unset`, QĐ-039). Rỗng = chạy được. Mọi mã đều `blocking`.
 */
export function validateModel(model: QueryModel): Diagnostic[] {
  const issues: Diagnostic[] = [];
  const add = (code: DiagnosticCode, detail?: string): void => {
    issues.push(detail === undefined ? { code, severity: 'blocking' } : { code, severity: 'blocking', detail });
  };
  if (model.table === null) add('no-table');
  if (model.columns !== '*' && model.columns.length === 0) add('no-columns');
  const missingValue = model.conditions.filter((c) =>
    Array.isArray(c.value) ? c.value.length === 0 || c.value.every((v) => v.trim() === '') : c.value.trim() === '',
  );
  if (missingValue.length > 0) add('no-value', missingValue.map((c) => c.column).join(', '));
  if (model.conditions.length >= 2 && model.connector === null) add('connector-unset');
  return issues;
}

/** Model chạy được (không có lý do chặn nào). */
export function isModelRunnable(model: QueryModel): boolean {
  return validateModel(model).length === 0;
}
