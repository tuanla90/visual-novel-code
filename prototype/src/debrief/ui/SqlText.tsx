/** Một đoạn SQL tô màu đồng đều (xem sql-highlight.ts). Dùng chung cho màn chiếu và màn chọn dòng. */
import { highlightSql } from './sql-highlight';

export interface SqlTextProps {
  sql: string;
}

export function SqlText({ sql }: SqlTextProps) {
  return (
    <>
      {highlightSql(sql).map((p, i) =>
        p.className === null ? (
          p.text
        ) : (
          <span key={i} className={p.className}>
            {p.text}
          </span>
        ),
      )}
    </>
  );
}
