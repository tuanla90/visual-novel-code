/**
 * Tách câu SQL thành mẩu để TÔ MÀU (chỉ hiển thị — không dùng để chạy hay chấm; engine làm việc đó).
 * Giữ nguyên mọi ký tự (khoảng trắng, xuống dòng) để ghép lại đúng câu gốc.
 *
 * `term` đánh dấu mẩu có chú thích (QĐ-016): `%` trong chuỗi, `LIKE`, `AND`, `OR`, `IN`.
 */
import { CONNECTOR_PLACEHOLDER } from '../engine';

export type SqlTerm = 'percent' | 'LIKE' | 'AND' | 'OR' | 'IN';

export type SqlTokenKind =
  | 'keyword'
  | 'ident'
  | 'string'
  | 'wildcard'
  | 'number'
  | 'punct'
  | 'space'
  | 'comment'
  | 'placeholder';

export interface SqlToken {
  kind: SqlTokenKind;
  text: string;
  term?: SqlTerm;
}

const KEYWORDS = new Set([
  'SELECT', 'FROM', 'WHERE', 'AND', 'OR', 'NOT', 'IN', 'LIKE', 'AS', 'DISTINCT', 'ORDER', 'BY', 'LIMIT',
  'GROUP', 'HAVING', 'NULL', 'IS', 'ASC', 'DESC', 'BETWEEN', 'WITH', 'UNION', 'JOIN', 'ON', 'INSERT',
  'INTO', 'VALUES', 'UPDATE', 'SET', 'DELETE', 'DROP', 'CREATE', 'TABLE', 'OFFSET', 'CASE', 'WHEN',
  'THEN', 'ELSE', 'END', 'COUNT', 'ALL', 'EXISTS',
]);

const TERM_WORDS: Record<string, SqlTerm> = { LIKE: 'LIKE', AND: 'AND', OR: 'OR', IN: 'IN' };

function escapeRegExp(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\/]/g, '\\$&');
}

// Thứ tự thử: chỗ giữ phép nối → khoảng trắng → chú thích → chuỗi → định danh có nháy → số → từ → ký tự lẻ.
const PATTERN = new RegExp(
  [
    `(?<placeholder>${escapeRegExp(CONNECTOR_PLACEHOLDER)})`,
    '(?<space>\\s+)',
    '(?<comment>--[^\\n]*)',
    "(?<string>'(?:[^']|'')*'?)",
    '(?<quoted>"(?:[^"]|"")*"?)',
    '(?<number>\\d+(?:\\.\\d+)?)',
    '(?<word>[\\p{L}_][\\p{L}\\p{N}_]*)',
    '(?<punct>[\\s\\S])',
  ].join('|'),
  'gu',
);

/** Chuỗi `'…'` → mẩu `string` xen mẩu `wildcard` cho từng dấu `%`. */
function splitString(text: string, out: SqlToken[]): void {
  let buf = '';
  for (const ch of text) {
    if (ch === '%') {
      if (buf) out.push({ kind: 'string', text: buf });
      buf = '';
      out.push({ kind: 'wildcard', text: '%', term: 'percent' });
    } else {
      buf += ch;
    }
  }
  if (buf) out.push({ kind: 'string', text: buf });
}

export function tokenizeSql(sql: string): SqlToken[] {
  const out: SqlToken[] = [];
  for (const m of sql.matchAll(PATTERN)) {
    const g = m.groups ?? {};
    const text = m[0];
    if (g.placeholder !== undefined) out.push({ kind: 'placeholder', text });
    else if (g.space !== undefined) out.push({ kind: 'space', text });
    else if (g.comment !== undefined) out.push({ kind: 'comment', text });
    else if (g.string !== undefined) splitString(text, out);
    else if (g.quoted !== undefined) out.push({ kind: 'ident', text });
    else if (g.number !== undefined) out.push({ kind: 'number', text });
    else if (g.word !== undefined) {
      const upper = text.toUpperCase();
      if (KEYWORDS.has(upper)) {
        const term = TERM_WORDS[upper];
        out.push(term ? { kind: 'keyword', text, term } : { kind: 'keyword', text });
      } else {
        out.push({ kind: 'ident', text });
      }
    } else out.push({ kind: 'punct', text });
  }
  return out;
}

/** Chú thích cho từng mẩu có `term` (đọc được bằng bàn phím và trình đọc màn hình). */
export const TERM_NOTES: Record<SqlTerm, { title: string; text: string }> = {
  percent: { title: '%', text: 'Thay cho một đoạn chữ bất kỳ, kể cả không có chữ nào. \'H%\' = bắt đầu bằng H, sau đó là gì cũng được.' },
  LIKE: { title: 'LIKE', text: 'So khớp theo mẫu chữ, thường đi cùng dấu %.' },
  AND: { title: 'AND', text: 'Chỉ giữ dòng thỏa ĐỒNG THỜI mọi điều kiện.' },
  OR: { title: 'OR', text: 'Giữ dòng thỏa BẤT KỲ điều kiện nào (một điều kiện là đủ).' },
  IN: { title: 'IN', text: 'Giá trị thuộc một trong các giá trị trong danh sách.' },
};

export const PLACEHOLDER_NOTE = 'Chưa chọn cách nối các điều kiện: AND (thỏa đồng thời) hay OR (thỏa bất kỳ).';
