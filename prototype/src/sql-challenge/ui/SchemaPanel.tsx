/**
 * Bảng dữ liệu (QĐ-021): mô tả cột tiếng Việt từ schema.ts, thu gọn được; mỗi bảng có nút
 * "Xem 5 dòng đầu" (kết quả hiện ở khung kết quả bên trái).
 */
import { useState } from 'react';
import { COLUMN_DESCRIPTIONS, TABLE_DESCRIPTIONS, TABLE_NAMES, columnsOf, type TableName } from '../schema';
import { IconChevron } from './icons';

export interface SchemaPanelProps {
  onPreview: (table: TableName) => void;
  previewDisabled: boolean;
}

function describe(table: TableName, column: string): { type: string; description: string } {
  const t = COLUMN_DESCRIPTIONS[table] as Record<string, { type: string; description: string } | undefined>;
  const info = t[column];
  return { type: info?.type === 'INTEGER' ? 'số' : 'chữ', description: info?.description ?? 'Cột dữ liệu' };
}

export function SchemaPanel({ onPreview, previewDisabled }: SchemaPanelProps) {
  const [open, setOpen] = useState(true);
  return (
    <section className={`schema${open ? ' is-open' : ''}`} aria-labelledby="schema-title">
      <h3 id="schema-title" className="schema__title">
        <button type="button" className="schema__toggle" aria-expanded={open} aria-controls="schema-body" onClick={() => setOpen((o) => !o)}>
          <IconChevron open={open} />
          Bảng dữ liệu
          <span className="schema__hint">{open ? 'Thu gọn' : 'Mở ra'}</span>
        </button>
      </h3>
      <div id="schema-body" className="schema__body" hidden={!open}>
        {TABLE_NAMES.map((table) => (
          <div key={table} className="schema__table">
            <div className="schema__table-head">
              <span className="mono schema__name">{table}</span>
              <button
                type="button"
                className="btn btn--small"
                onClick={() => onPreview(table)}
                disabled={previewDisabled}
                aria-label={`Xem 5 dòng đầu của bảng ${table}`}
                title={`Xem 5 dòng đầu của bảng ${table}`}
              >
                Xem 5 dòng đầu
              </button>
            </div>
            <p className="schema__desc">{TABLE_DESCRIPTIONS[table]}</p>
            <table className="schema__cols">
              <caption className="visually-hidden">Các cột của bảng {table}</caption>
              <thead>
                <tr>
                  <th scope="col">Cột</th>
                  <th scope="col">Nghĩa</th>
                </tr>
              </thead>
              <tbody>
                {columnsOf(table).map((col) => {
                  const d = describe(table, col);
                  return (
                    <tr key={col}>
                      <th scope="row" className="mono">
                        {col}
                      </th>
                      <td>
                        {d.description} <span className="schema__type">({d.type})</span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        ))}
      </div>
    </section>
  );
}
