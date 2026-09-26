/**
 * Tô màu SQL ĐỒNG ĐỀU cho màn giải trình (QĐ-024 bước 2): mỗi LOẠI mẩu một lớp — mọi từ khóa
 * (SELECT, FROM, WHERE, LIKE, IN, OR, AND…) cùng một lớp, mọi chuỗi cùng một lớp.
 *
 * TUYỆT ĐỐI không có lớp riêng cho `OR`/`AND` hay cho một dòng nào: làm nổi bật riêng sẽ lộ đáp án
 * của màn chọn dòng. Vì vậy KHÔNG dùng SqlCode của màn thử thách (nó gắn chú thích cho OR/AND/LIKE/IN);
 * chỉ mượn bộ tách mẩu thuần `tokenizeSql` rồi bỏ qua trường `term`.
 */
import { tokenizeSql, type SqlTokenKind } from '../../sql-challenge/ui/sql-tokens';

/** Lớp theo loại mẩu — `null` = khoảng trắng, in thẳng. */
const KIND_CLASS: Record<SqlTokenKind, string | null> = {
  keyword: 'dbf-tok dbf-tok--kw',
  placeholder: 'dbf-tok dbf-tok--kw',
  ident: 'dbf-tok dbf-tok--id',
  string: 'dbf-tok dbf-tok--str',
  wildcard: 'dbf-tok dbf-tok--str',
  number: 'dbf-tok dbf-tok--num',
  punct: 'dbf-tok dbf-tok--punct',
  comment: 'dbf-tok dbf-tok--cmt',
  space: null,
};

export interface HighlightPiece {
  text: string;
  className: string | null;
}

export function highlightSql(sql: string): HighlightPiece[] {
  return tokenizeSql(sql).map((t) => ({ text: t.text, className: KIND_CLASS[t.kind] }));
}

/** Phép nối duy nhất của câu (chỉ OR hoặc chỉ AND); `null` khi không có hoặc lẫn cả hai. */
export function soleConnector(sql: string): 'AND' | 'OR' | null {
  const found = new Set<string>();
  for (const t of tokenizeSql(sql)) {
    if (t.kind !== 'keyword') continue;
    const up = t.text.toUpperCase();
    if (up === 'AND' || up === 'OR') found.add(up);
  }
  if (found.size !== 1) return null;
  return found.has('OR') ? 'OR' : 'AND';
}
