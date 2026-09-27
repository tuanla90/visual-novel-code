/**
 * Bảng kết quả (hoặc 5 dòng đầu): tên cột dạng mã, tiêu đề cột dính khi cuộn trong khung.
 * `reveal`: các dòng hiện lần lượt sau mỗi lần chạy (chỉ CSS; tắt khi giảm chuyển động).
 */
import type { CSSProperties } from 'react';
import type { SqlValue } from '../types';

export interface ResultTableProps {
  columns: string[];
  rows: SqlValue[][];
  caption: string;
  reveal?: boolean;
}

/** Dòng thứ bao nhiêu trở đi hiện cùng lúc (bảng dài không phải chờ lâu). */
const REVEAL_CAP = 16;

export function ResultTable({ columns, rows, caption, reveal = false }: ResultTableProps) {
  return (
    <div className="result-table-wrap">
      <table className={`result-table${reveal ? ' is-reveal' : ''}`}>
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
            <tr key={i} style={reveal ? ({ '--row': Math.min(i, REVEAL_CAP) } as CSSProperties) : undefined}>
              {r.map((v, j) => (
                <td key={j}>{v === null ? <span className="result-table__null">(trống)</span> : String(v)}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
