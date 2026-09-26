/**
 * Phân tích VĂN BẢN SQL ở mức nhẹ, không cần SQLite: bỏ chú thích, tách token (giữ chuỗi
 * nguyên vẹn), kiểm "chỉ một câu SELECT / WITH … SELECT" (QĐ-006), và rút hình dạng truy vấn
 * (bảng, có WHERE không, AND/OR ở tầng ngoài, LIMIT, cột trong WHERE, mẫu LIKE, hằng chuỗi)
 * cho bước chẩn đoán khi không phân tích ngược được thành QueryModel.
 *
 * Đây là phân tích "best-effort": mọi kết luận ở đây chỉ dùng để CHỌN MÃ GỢI Ý, việc chạy
 * và chấm vẫn dựa trên SQLite thật.
 */

export type TokenKind = 'word' | 'string' | 'number' | 'punct';

export interface Token {
  kind: TokenKind;
  /** Với `string`: giá trị đã bỏ nháy và gộp `''` → `'`; với `word`: nguyên văn (giữ hoa/thường). */
  value: string;
  /** Vị trí bắt đầu trong chuỗi đã bỏ chú thích. */
  pos: number;
}

/** Bỏ chú thích dòng (hai gạch ngang) và chú thích khối (sao-gạch), giữ nguyên nội dung trong nháy đơn/kép. */
export function stripComments(sql: string): string {
  let out = '';
  let i = 0;
  while (i < sql.length) {
    const ch = sql[i] ?? '';
    const next = sql[i + 1] ?? '';
    if (ch === "'" || ch === '"') {
      const end = findStringEnd(sql, i, ch);
      out += sql.slice(i, end);
      i = end;
    } else if (ch === '-' && next === '-') {
      const nl = sql.indexOf('\n', i);
      i = nl === -1 ? sql.length : nl;
    } else if (ch === '/' && next === '*') {
      const close = sql.indexOf('*/', i + 2);
      i = close === -1 ? sql.length : close + 2;
      out += ' ';
    } else {
      out += ch;
      i += 1;
    }
  }
  return out;
}

/** Vị trí ngay sau dấu nháy đóng (nháy nhân đôi là ký tự thoát); chuỗi không đóng → hết chuỗi. */
function findStringEnd(sql: string, start: number, quote: string): number {
  let i = start + 1;
  while (i < sql.length) {
    if (sql[i] === quote) {
      if (sql[i + 1] === quote) {
        i += 2;
        continue;
      }
      return i + 1;
    }
    i += 1;
  }
  return sql.length;
}

const WORD_START = /[A-Za-z_À-ɏḀ-ỿ]/;
const WORD_PART = /[\wÀ-ɏḀ-ỿ]/;

export interface TokenizeResult {
  tokens: Token[];
  /** Có chuỗi chưa đóng nháy. */
  unterminatedString: boolean;
}

/** Tách token trên chuỗi ĐÃ bỏ chú thích. Dấu nháy kép giữ như `word` (định danh có nháy) để parser từ chối. */
export function tokenize(sql: string): TokenizeResult {
  const tokens: Token[] = [];
  let unterminatedString = false;
  let i = 0;
  while (i < sql.length) {
    const ch = sql[i] ?? '';
    if (/\s/.test(ch)) {
      i += 1;
      continue;
    }
    if (ch === "'") {
      const end = findStringEnd(sql, i, "'");
      const closed = sql[end - 1] === "'" && end > i + 1 && !isEscapedQuoteRun(sql, i, end);
      if (!closed) unterminatedString = true;
      tokens.push({ kind: 'string', value: sql.slice(i + 1, closed ? end - 1 : end).replaceAll("''", "'"), pos: i });
      i = end;
      continue;
    }
    if (ch === '"') {
      const end = findStringEnd(sql, i, '"');
      tokens.push({ kind: 'word', value: sql.slice(i, end), pos: i });
      i = end;
      continue;
    }
    if (/[0-9]/.test(ch) || (ch === '.' && /[0-9]/.test(sql[i + 1] ?? ''))) {
      let j = i + 1;
      while (j < sql.length && /[\w.]/.test(sql[j] ?? '')) j += 1;
      tokens.push({ kind: 'number', value: sql.slice(i, j), pos: i });
      i = j;
      continue;
    }
    if (WORD_START.test(ch)) {
      let j = i + 1;
      while (j < sql.length && WORD_PART.test(sql[j] ?? '')) j += 1;
      tokens.push({ kind: 'word', value: sql.slice(i, j), pos: i });
      i = j;
      continue;
    }
    // Toán tử hai ký tự thường gặp.
    const two = sql.slice(i, i + 2);
    if (['<>', '!=', '<=', '>=', '||'].includes(two)) {
      tokens.push({ kind: 'punct', value: two, pos: i });
      i += 2;
      continue;
    }
    tokens.push({ kind: 'punct', value: ch, pos: i });
    i += 1;
  }
  return { tokens, unterminatedString };
}

/** Chuỗi kết thúc bằng `''` (nháy thoát) ngay trước cuối chuỗi chưa đóng — coi là chưa đóng. */
function isEscapedQuoteRun(sql: string, start: number, end: number): boolean {
  // findStringEnd đã xử lý `''`; nếu nó chạy tới hết chuỗi mà ký tự cuối là nháy thì kiểm số nháy liên tiếp ở đuôi.
  if (end !== sql.length) return false;
  let quotes = 0;
  let k = end - 1;
  while (k > start && sql[k] === "'") {
    quotes += 1;
    k -= 1;
  }
  return quotes % 2 === 0;
}

const READ_ONLY_HEADS = new Set(['SELECT', 'WITH']);
const STATEMENT_HEADS = new Set([
  'SELECT', 'INSERT', 'UPDATE', 'DELETE', 'REPLACE', 'CREATE', 'DROP', 'ALTER', 'PRAGMA', 'ATTACH', 'DETACH',
  'VACUUM', 'BEGIN', 'COMMIT', 'END', 'ROLLBACK', 'SAVEPOINT', 'RELEASE', 'REINDEX', 'ANALYZE', 'EXPLAIN', 'VALUES',
]);

export type StatementCheck =
  | { ok: true; sql: string }
  | { ok: false; reason: 'empty' | 'multiple' | 'not_select' };

/**
 * QĐ-006: chỉ chấp nhận MỘT câu `SELECT …` hoặc `WITH … SELECT …`. Trả về SQL đã bỏ chú thích
 * và dấu `;` cuối để chuyển cho SQLite. Từ chối: chuỗi rỗng, nhiều câu (dấu `;` ở tầng ngoài
 * mà sau đó còn nội dung), câu không phải SELECT (kể cả `WITH … DELETE`, `VALUES`, `EXPLAIN`).
 */
export function checkSingleSelect(rawSql: string): StatementCheck {
  const cleaned = stripComments(rawSql).trim();
  const { tokens } = tokenize(cleaned);
  if (tokens.length === 0) return { ok: false, reason: 'empty' };

  // Cắt ở dấu ';' tầng ngoài đầu tiên; sau nó mà còn token → nhiều câu.
  let depth = 0;
  let cut = -1;
  for (let i = 0; i < tokens.length; i += 1) {
    const t = tokens[i]!;
    if (t.kind !== 'punct') continue;
    if (t.value === '(') depth += 1;
    else if (t.value === ')') depth = Math.max(0, depth - 1);
    else if (t.value === ';' && depth === 0) {
      cut = i;
      break;
    }
  }
  const body = cut === -1 ? tokens : tokens.slice(0, cut);
  if (cut !== -1 && tokens.slice(cut + 1).some((t) => !(t.kind === 'punct' && t.value === ';'))) {
    return { ok: false, reason: 'multiple' };
  }
  if (body.length === 0) return { ok: false, reason: 'empty' };

  // Từ khóa câu lệnh KHÔNG phải SELECT/WITH → từ chối ngay. Từ đầu câu không phải từ khóa nào
  // (ví dụ gõ nhầm `SELEC`) thì để SQLite báo lỗi cú pháp — SQLite không thể chạy câu ghi từ một
  // từ khóa nó không biết, và PRAGMA query_only vẫn là lớp bảo vệ thứ hai.
  const head = body[0]!.value.toUpperCase();
  if (body[0]!.kind === 'word' && STATEMENT_HEADS.has(head) && !READ_ONLY_HEADS.has(head)) {
    return { ok: false, reason: 'not_select' };
  }
  if (head === 'WITH') {
    // Câu chính sau các CTE là từ khóa câu lệnh đầu tiên ở tầng ngoài (không tính WITH/RECURSIVE/AS/…).
    let d = 0;
    for (let i = 1; i < body.length; i += 1) {
      const t = body[i]!;
      if (t.kind === 'punct') {
        if (t.value === '(') d += 1;
        else if (t.value === ')') d = Math.max(0, d - 1);
        continue;
      }
      if (d === 0 && t.kind === 'word' && STATEMENT_HEADS.has(t.value.toUpperCase())) {
        if (t.value.toUpperCase() !== 'SELECT') return { ok: false, reason: 'not_select' };
        break;
      }
    }
  }
  const endPos = cut === -1 ? cleaned.length : tokens[cut]!.pos;
  return { ok: true, sql: cleaned.slice(0, endPos).trim() };
}

// ---------- Hình dạng truy vấn (cho chẩn đoán) ----------

export interface LikeShape {
  column: string;
  pattern: string;
  /** Vị trí % trong mẫu: 'starts' = 'x%' · 'ends' = '%x' · 'contains' = '%x%' · 'none' = không có % · 'other'. */
  wildcard: 'starts' | 'ends' | 'contains' | 'none' | 'other';
}

export interface ComparisonShape {
  column: string;
  op: 'eq' | 'in';
  values: string[];
}

export interface QueryShape {
  /** Bảng đầu tiên sau FROM (chữ thường), hoặc null nếu không thấy. */
  table: string | null;
  /** So sánh `cột = hằng` và `cột IN (hằng, …)` ở tầng ngoài của WHERE (IN chứa truy vấn con thì bỏ qua). */
  comparisons: ComparisonShape[];
  hasWhere: boolean;
  /** Từ khóa nối ở TẦNG NGOÀI của WHERE. */
  hasTopLevelOr: boolean;
  hasTopLevelAnd: boolean;
  hasLimit: boolean;
  hasSubquery: boolean;
  /** Tên cột (chữ thường) xuất hiện ở tầng ngoài của WHERE (trước một toán tử so sánh/LIKE/IN). */
  whereColumns: string[];
  /** Mẫu LIKE ở tầng ngoài của WHERE. */
  likes: LikeShape[];
  /** Mọi hằng chuỗi trong WHERE (kể cả trong ngoặc). */
  whereLiterals: string[];
  /** Có `NOT` ở tầng ngoài của WHERE. */
  hasTopLevelNot: boolean;
}

const CLAUSE_ENDERS = new Set(['GROUP', 'HAVING', 'ORDER', 'LIMIT', 'UNION', 'EXCEPT', 'INTERSECT', 'WINDOW']);

/** Rút hình dạng từ SQL bất kỳ (đã hoặc chưa bỏ chú thích). Không ném lỗi. */
export function analyzeShape(rawSql: string): QueryShape {
  const { tokens } = tokenize(stripComments(rawSql));
  const shape: QueryShape = {
    table: null,
    comparisons: [],
    hasWhere: false,
    hasTopLevelOr: false,
    hasTopLevelAnd: false,
    hasLimit: false,
    hasSubquery: false,
    whereColumns: [],
    likes: [],
    whereLiterals: [],
    hasTopLevelNot: false,
  };
  const upper = (t: Token | undefined): string => (t && t.kind === 'word' ? t.value.toUpperCase() : '');

  let depth = 0;
  let whereStart = -1;
  let whereEnd = -1;
  for (let i = 0; i < tokens.length; i += 1) {
    const t = tokens[i]!;
    if (t.kind === 'punct') {
      if (t.value === '(') depth += 1;
      else if (t.value === ')') depth = Math.max(0, depth - 1);
      continue;
    }
    const w = upper(t);
    if (depth === 0) {
      if (w === 'FROM' && shape.table === null) {
        const next = tokens[i + 1];
        if (next && next.kind === 'word') shape.table = next.value.toLowerCase();
      } else if (w === 'WHERE' && whereStart === -1) {
        whereStart = i + 1;
        shape.hasWhere = true;
      } else if (w === 'LIMIT') {
        shape.hasLimit = true;
        if (whereStart !== -1 && whereEnd === -1) whereEnd = i;
      } else if (CLAUSE_ENDERS.has(w) && whereStart !== -1 && whereEnd === -1) {
        whereEnd = i;
      }
    }
    if (w === 'SELECT' && depth > 0) shape.hasSubquery = true;
  }
  if (whereStart === -1) return shape;
  const where = tokens.slice(whereStart, whereEnd === -1 ? tokens.length : whereEnd);

  let d = 0;
  for (let i = 0; i < where.length; i += 1) {
    const t = where[i]!;
    if (t.kind === 'punct') {
      if (t.value === '(') d += 1;
      else if (t.value === ')') d = Math.max(0, d - 1);
      continue;
    }
    if (t.kind === 'string') {
      shape.whereLiterals.push(t.value);
      continue;
    }
    if (d !== 0 || t.kind !== 'word') continue;
    const w = t.value.toUpperCase();
    if (w === 'OR') shape.hasTopLevelOr = true;
    else if (w === 'AND') shape.hasTopLevelAnd = true;
    else if (w === 'NOT') shape.hasTopLevelNot = true;
    else if (w === 'LIKE') {
      const col = where[i - 1];
      const pat = where[i + 1];
      if (col && col.kind === 'word' && pat && pat.kind === 'string') {
        shape.likes.push({ column: col.value.toLowerCase(), pattern: pat.value, wildcard: classifyLike(pat.value) });
      }
    } else if (w === 'IN' || w === 'IS' || w === 'BETWEEN') {
      const col = where[i - 1];
      if (col && col.kind === 'word') pushUnique(shape.whereColumns, col.value.toLowerCase());
      if (w === 'IN' && col && col.kind === 'word') {
        const values = readLiteralList(where, i + 1);
        if (values) shape.comparisons.push({ column: col.value.toLowerCase(), op: 'in', values });
      }
    } else {
      const next = where[i + 1];
      if (next && next.kind === 'punct' && ['=', '<>', '!=', '<', '>', '<=', '>='].includes(next.value)) {
        pushUnique(shape.whereColumns, t.value.toLowerCase());
        const lit = where[i + 2];
        if (next.value === '=' && lit && (lit.kind === 'string' || lit.kind === 'number')) {
          shape.comparisons.push({ column: t.value.toLowerCase(), op: 'eq', values: [lit.value] });
        }
      } else if (next && next.kind === 'word' && ['LIKE', 'IN', 'IS', 'BETWEEN', 'NOT', 'GLOB'].includes(next.value.toUpperCase())) {
        pushUnique(shape.whereColumns, t.value.toLowerCase());
      }
    }
  }
  return shape;
}

/** `( hằng, hằng, … )` bắt đầu tại `start`; null nếu không phải danh sách hằng thuần. */
function readLiteralList(tokens: Token[], start: number): string[] | null {
  const open = tokens[start];
  if (!open || open.kind !== 'punct' || open.value !== '(') return null;
  const values: string[] = [];
  let i = start + 1;
  for (;;) {
    const t = tokens[i];
    if (!t) return null;
    if (t.kind === 'punct' && t.value === ')' && values.length === 0) return values;
    if (t.kind !== 'string' && t.kind !== 'number') return null;
    values.push(t.value);
    const sep = tokens[i + 1];
    if (!sep || sep.kind !== 'punct') return null;
    if (sep.value === ')') return values;
    if (sep.value !== ',') return null;
    i += 2;
  }
}

export function classifyLike(pattern: string): LikeShape['wildcard'] {
  const starts = pattern.startsWith('%');
  const ends = pattern.endsWith('%');
  const inner = pattern.slice(starts ? 1 : 0, ends && pattern.length > (starts ? 1 : 0) ? -1 : undefined);
  if (!pattern.includes('%')) return 'none';
  if (inner.includes('%') || inner.length === 0) return 'other';
  if (starts && ends) return 'contains';
  if (starts) return 'ends';
  if (ends) return 'starts';
  return 'other';
}

function pushUnique(list: string[], value: string): void {
  if (!list.includes(value)) list.push(value);
}
