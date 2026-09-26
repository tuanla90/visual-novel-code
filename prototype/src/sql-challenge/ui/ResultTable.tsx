/** Bảng kết quả (hoặc 5 dòng đầu): tên cột dạng mã, tiêu đề cột dính khi cuộn trong khung. */
import type { SqlValue } from '../types';

export interface ResultTableProps {
  columns: string[];
  rows: SqlValue[][];
  caption: string;
}

export function ResultTable({ columns, rows, caption }: ResultTableProps) {
  return (
    <table className="result-table">
      <caption className="visually-hidden">{caption}</caption>
      <thead>
        <tr>
          {columns.map((c, i) => (
            <th key={`${c}-${i}`} scope="col" className="mono">
              {c}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            {r.map((v, j) => (
              <td key={j}>{v === null ? <span className="result-table__null">(trống)</span> : String(v)}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
