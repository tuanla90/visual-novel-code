/**
 * Giá trị có trong dữ liệu của một cột (ô chọn giá trị cho `=` / `IN`, QĐ-017; số giá trị quyết định
 * danh sách hay ô chữ, QĐ-056) — đọc qua engine (`distinctValues`), nhớ đệm theo bảng.cột cho cả phiên.
 * Kết quả đã có thì trả NGAY (đồng bộ) để ô giá trị không nháy "đang tải" rồi mới đổi kiểu.
 */
import { useEffect, useState } from 'react';
import { distinctValues } from '../engine';
import { columnsOf, type ColumnName, type TableName } from '../schema';

const pending = new Map<string, Promise<string[]>>();
const resolved = new Map<string, string[]>();

function load(table: TableName, column: ColumnName): Promise<string[]> {
  const key = `${table}.${column}`;
  let p = pending.get(key);
  if (!p) {
    p = distinctValues(table, column).then(
      (values) => {
        resolved.set(key, values);
        return values;
      },
      (err: unknown) => {
        pending.delete(key);
        throw err;
      },
    );
    pending.set(key, p);
  }
  return p;
}

/** Nạp sẵn giá trị của mọi cột một bảng (gọi khi người chơi chọn bảng ở hàng FROM). */
export function preloadDistinctValues(table: TableName): void {
  for (const column of columnsOf(table)) {
    load(table, column).catch(() => undefined);
  }
}

export type DistinctState = { status: 'loading' } | { status: 'ready'; values: string[] } | { status: 'error' };

export function useDistinctValues(table: TableName | null, column: ColumnName | null, enabled: boolean): DistinctState {
  const key = table && column ? `${table}.${column}` : '';
  const [state, setState] = useState<{ key: string; value: DistinctState }>({ key: '', value: { status: 'loading' } });

  useEffect(() => {
    if (!enabled || !table || !column || resolved.has(`${table}.${column}`)) return;
    let alive = true;
    load(table, column).then(
      (values) => {
        if (alive) setState({ key: `${table}.${column}`, value: { status: 'ready', values } });
      },
      () => {
        if (alive) setState({ key: `${table}.${column}`, value: { status: 'error' } });
      },
    );
    return () => {
      alive = false;
    };
  }, [table, column, enabled]);

  const cached = enabled && key ? resolved.get(key) : undefined;
  if (cached) return { status: 'ready', values: cached };
  return state.key === key ? state.value : { status: 'loading' };
}
