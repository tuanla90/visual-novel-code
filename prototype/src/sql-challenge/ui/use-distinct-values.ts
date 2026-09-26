/**
 * Giá trị có trong dữ liệu của một cột (ô chọn giá trị cho `=` / `IN`, QĐ-017) — đọc qua engine
 * (`distinctValues`), nhớ đệm theo bảng.cột cho cả phiên.
 */
import { useEffect, useState } from 'react';
import { distinctValues } from '../engine';
import type { ColumnName, TableName } from '../schema';

const cache = new Map<string, Promise<string[]>>();

function load(table: TableName, column: ColumnName): Promise<string[]> {
  const key = `${table}.${column}`;
  let p = cache.get(key);
  if (!p) {
    p = distinctValues(table, column).catch((err: unknown) => {
      cache.delete(key);
      throw err;
    });
    cache.set(key, p);
  }
  return p;
}

export type DistinctState = { status: 'loading' } | { status: 'ready'; values: string[] } | { status: 'error' };

export function useDistinctValues(table: TableName | null, column: ColumnName | null, enabled: boolean): DistinctState {
  const key = table && column ? `${table}.${column}` : '';
  const [state, setState] = useState<{ key: string; value: DistinctState }>({ key: '', value: { status: 'loading' } });

  useEffect(() => {
    if (!enabled || !table || !column) return;
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

  return state.key === key ? state.value : { status: 'loading' };
}
