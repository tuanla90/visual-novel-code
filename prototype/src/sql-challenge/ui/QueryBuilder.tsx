/**
 * Trình dựng (QĐ-016): ba hàng SELECT / FROM / WHERE luôn hiện. FROM trống khi mở; SELECT là ô chọn
 * cột của bảng + `*`; WHERE là danh sách điều kiện với một phép nối chung (QĐ-039).
 * Mỗi hàng vẽ thành một KHỐI GHÉP: chưa điền → khối viền đứt; điền đủ → khối "khớp" vào chồng, kèm
 * mảnh SQL của khối đó (câu SQL ghép dần theo từng khối). Chỉ là hình — cơ chế và nhãn không đổi.
 */
import type { ReactNode } from 'react';
import { modelToSql } from '../engine';
import { COLUMN_DESCRIPTIONS, TABLE_NAMES, columnsOf, isTableName, type ColumnName, type TableName } from '../schema';
import type { BuilderRegion, QueryModel } from '../types';
import { tableReadable } from './labels';
import { setAllColumns, setTable, toggleColumn, withoutPending } from './model-edit';

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
  state = 'empty',
  fragment,
}: {
  keyword: string;
  region: BuilderRegion;
  guided: BuilderRegion | null;
  children: ReactNode;
  labelId: string;
  /** `filled`: khối đã khớp; `optional`: được phép để trống (WHERE); `empty`: còn thiếu. */
  state?: BlockState;
  /** Mảnh SQL của khối (chỉ để nhìn; câu đầy đủ ở "Xem câu SQL tương ứng"). */
  fragment?: string;
}) {
  return (
    <div
      className={`qb-row qb-block qb-block--${region} is-${state}${guided === region ? ' is-guided' : ''}`}
      data-region={region}
      role="group"
      aria-labelledby={labelId}
    >
      <span className="qb-row__kw" id={labelId}>
        <small className="qb-row__step" aria-hidden="true">{STEP_LABELS[region]}</small>
        {keyword}
      </span>
      <div className="qb-row__body">{children}</div>
      {fragment ? (
        <code className="qb-block__frag" aria-hidden="true">
          {fragment}
        </code>
      ) : null}
    </div>
  );
}

type BlockState = 'empty' | 'filled' | 'optional';

const STEP_LABELS: Record<BuilderRegion, string> = {
  from: '1 · Chọn bảng',
  select: '2 · Chọn cột',
  where: '3 · Lọc dữ liệu',
  run: 'Chạy',
  preview: 'Xem trước',
};

/** Trạng thái và mảnh SQL của từng khối, suy từ model (điều kiện chưa chọn cột không tính). */
function blockParts(model: QueryModel): Record<'from' | 'select' | 'where', { state: BlockState; fragment: string }> {
  const ready = withoutPending(model);
  const lines = modelToSql(ready).replace(/;$/, '').split('\n');
  const conds = ready.conditions;
  const hasValue = (v: string | string[]) => (Array.isArray(v) ? v.length > 0 : v !== '');
  const whereDone =
    conds.length > 0 && conds.length === model.conditions.length && conds.every((c) => hasValue(c.value)) && (conds.length < 2 || model.connector !== null);
  return {
    from: { state: model.table ? 'filled' : 'empty', fragment: lines[1] ?? 'FROM' },
    select: { state: model.columns === '*' || model.columns.length > 0 ? 'filled' : 'empty', fragment: lines[0] ?? 'SELECT' },
    where: {
      state: whereDone ? 'filled' : model.conditions.length === 0 ? 'optional' : 'empty',
      fragment: lines.length > 2 ? lines.slice(2).map((l) => l.trim()).join(' ') : '',
    },
  };
}

export function QueryBuilder({ model, onChange, guided, disabled, onPreview, whereRow }: QueryBuilderProps) {
  const table = model.table;
  const all = model.columns === '*';
  const parts = blockParts(model);

  return (
    <fieldset className="qb" disabled={disabled}>
      <legend className="visually-hidden">Trình dựng truy vấn</legend>

      <BuilderRow keyword="FROM" region="from" guided={guided} labelId="qb-kw-from" {...parts.from}>
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

      <BuilderRow keyword="SELECT" region="select" guided={guided} labelId="qb-kw-select" {...parts.select}>
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

      <BuilderRow keyword="WHERE" region="where" guided={guided} labelId="qb-kw-where" {...parts.where}>
        {whereRow}
      </BuilderRow>
    </fieldset>
  );
}
