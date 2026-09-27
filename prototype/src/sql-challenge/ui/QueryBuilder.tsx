/**
 * Trình dựng (QĐ-016): ba hàng SELECT / FROM / WHERE luôn hiện. FROM trống khi mở; SELECT là ô chọn
 * cột của bảng + `*`; WHERE là danh sách điều kiện với một phép nối chung (QĐ-039).
 */
import type { ReactNode } from 'react';
import { COLUMN_DESCRIPTIONS, TABLE_NAMES, columnsOf, isTableName, type ColumnName, type TableName } from '../schema';
import type { BuilderRegion, QueryModel } from '../types';
import { tableReadable } from './labels';
import { setAllColumns, setTable, toggleColumn } from './model-edit';

export interface QueryBuilderProps {
  model: QueryModel;
  onChange: (model: QueryModel) => void;
  /** Vùng đang được hướng dẫn làm nổi bật (QĐ-021); `null` = không có. */
  guided: BuilderRegion | null;
  disabled: boolean;
  onPreview: (table: TableName) => void;
  /** Hàng WHERE (danh sách điều kiện) do màn thử thách dựng. */
  whereRow: ReactNode;
}

function columnDescription(table: TableName, column: ColumnName): string {
  const table_ = COLUMN_DESCRIPTIONS[table] as Record<string, { description: string } | undefined>;
  return table_[column]?.description ?? 'Cột dữ liệu';
}

export function BuilderRow({
  keyword,
  region,
  guided,
  children,
  labelId,
}: {
  keyword: string;
  region: BuilderRegion;
  guided: BuilderRegion | null;
  children: ReactNode;
  labelId: string;
}) {
  return (
    <div className={`qb-row${guided === region ? ' is-guided' : ''}`} data-region={region} role="group" aria-labelledby={labelId}>
      <span className="qb-row__kw" id={labelId}>
        <small className="qb-row__step" aria-hidden="true">{region === "from" ? "1 · Chọn bảng" : region === "select" ? "2 · Chọn cột" : "3 · Lọc dữ liệu"}</small>
        {keyword}
      </span>
      <div className="qb-row__body">{children}</div>
    </div>
  );
}

export function QueryBuilder({ model, onChange, guided, disabled, onPreview, whereRow }: QueryBuilderProps) {
  const table = model.table;
  const all = model.columns === '*';

  return (
    <fieldset className="qb" disabled={disabled}>
      <legend className="visually-hidden">Trình dựng truy vấn</legend>

      <BuilderRow keyword="FROM" region="from" guided={guided} labelId="qb-kw-from">
        <div className="qb-from">
          <select
            className="qb-select mono"
            aria-label="Bảng dữ liệu"
            value={table ?? ''}
            onChange={(e) => {
              const v = e.target.value;
              if (isTableName(v)) onChange(setTable(model, v));
            }}
          >
            <option value="" disabled>
              Chọn bảng…
            </option>
            {TABLE_NAMES.map((t) => (
              <option key={t} value={t}>
                {t} ({tableReadable(t)})
              </option>
            ))}
          </select>
          <span className={`qb-preview${guided === 'preview' ? ' is-guided' : ''}`} data-region="preview">
            <button
              type="button"
              className="btn btn--small"
              disabled={table === null}
              title={table === null ? 'Chọn bảng trước để xem 5 dòng đầu' : `Xem 5 dòng đầu của bảng ${table}`}
              onClick={() => {
                if (table) onPreview(table);
              }}
            >
              Xem 5 dòng đầu
            </button>
          </span>
        </div>
      </BuilderRow>

      <BuilderRow keyword="SELECT" region="select" guided={guided} labelId="qb-kw-select">
        {table === null ? (
          <p className="qb-empty">Chọn bảng ở hàng FROM trước, rồi chọn cột muốn hiện.</p>
        ) : (
          <div className="qb-chips">
            {columnsOf(table).map((col) => {
              const checked = all || (model.columns as ColumnName[]).includes(col);
              return (
                <label key={col} className={`chip${checked ? ' is-on' : ''}${all ? ' is-dim' : ''}`} title={columnDescription(table, col)}>
                  <input
                    type="checkbox"
                    checked={checked}
                    disabled={all}
                    onChange={(e) => onChange(toggleColumn(model, col, e.target.checked))}
                  />
                  <span className="mono">{col}</span>
                </label>
              );
            })}
            <label className={`chip chip--all${all ? ' is-on' : ''}`} title="Hiện mọi cột của bảng">
              <input type="checkbox" checked={all} onChange={(e) => onChange(setAllColumns(model, e.target.checked))} />
              <span>
                <span className="mono">*</span> mọi cột
              </span>
            </label>
          </div>
        )}
      </BuilderRow>

      <BuilderRow keyword="WHERE" region="where" guided={guided} labelId="qb-kw-where">
        {whereRow}
      </BuilderRow>
    </fieldset>
  );
}
