/**
 * Hàng WHERE: danh sách điều kiện (cột · phép · giá trị) + một phép nối chung (QĐ-016, QĐ-039).
 * - Ô giá trị (QĐ-017): `=`/`IN` chọn từ giá trị có trong dữ liệu + nhóm "Từ manh mối";
 *   ba phép LIKE là ô chữ + nhóm "Từ manh mối".
 * - Phép nối hiện giữa từng cặp điều kiện, ban đầu CHƯA CHỌN; chọn ở một chỗ là đổi cả loạt.
 */
import { columnsOf, COLUMN_DESCRIPTIONS, isColumnOf, type ColumnName, type TableName } from '../schema';
import { CONDITION_OPS, type ConditionOp, type Connector, type QueryCondition, type QueryModel } from '../types';
import { IconClose, IconPlus } from './icons';
import { CONNECTOR_LABELS, OP_LABELS } from './labels';
import {
  addCondition,
  removeCondition,
  setConditionColumn,
  setConditionOp,
  setConditionValue,
  setConnector,
  type EvidenceValueOption,
} from './model-edit';
import { useDistinctValues } from './use-distinct-values';
import { optionValue, optionsFor, selectedOptionKey } from './value-options';

export interface WhereRowProps {
  model: QueryModel;
  onChange: (model: QueryModel) => void;
  evidenceOptions: readonly EvidenceValueOption[];
  disabled: boolean;
}

const CLUE_GROUP = 'Từ manh mối';
const DATA_GROUP = 'Có trong dữ liệu';

function columnTitle(table: TableName, column: ColumnName): string {
  const t = COLUMN_DESCRIPTIONS[table] as Record<string, { description: string } | undefined>;
  return t[column]?.description ?? 'Cột dữ liệu';
}

export function WhereRow({ model, onChange, evidenceOptions, disabled }: WhereRowProps) {
  const table = model.table;
  return (
    <div className="qb-where">
      {model.conditions.length === 0 ? (
        <p className="qb-empty">Chưa có điều kiện lọc — lúc này truy vấn lấy mọi dòng của bảng.</p>
      ) : (
        <ol className="qb-conds">
          {model.conditions.map((c, i) => (
            <li key={c.id} className="qb-cond-item">
              {i > 0 ? <ConnectorPicker connector={model.connector} onPick={(k) => onChange(setConnector(model, k))} index={i} /> : null}
              {table ? (
                <ConditionRow
                  table={table}
                  cond={c}
                  index={i}
                  model={model}
                  onChange={onChange}
                  evidenceOptions={evidenceOptions}
                  disabled={disabled}
                />
              ) : null}
            </li>
          ))}
        </ol>
      )}
      <button
        type="button"
        className="btn btn--small qb-add"
        disabled={table === null}
        title={table === null ? 'Chọn bảng ở hàng FROM trước' : 'Thêm một điều kiện lọc'}
        onClick={() => onChange(addCondition(model))}
      >
        <IconPlus /> Thêm điều kiện
      </button>
    </div>
  );
}

function ConnectorPicker({ connector, onPick, index }: { connector: Connector | null; onPick: (c: Connector) => void; index: number }) {
  return (
    <div className={`qb-connector${connector === null ? ' is-unset' : ''}`} role="group" aria-label={`Cách nối điều kiện ${index} với điều kiện ${index + 1}`}>
      {(['AND', 'OR'] as const).map((k) => (
        <button
          key={k}
          type="button"
          className={`qb-connector__btn${connector === k ? ' is-on' : ''}`}
          aria-pressed={connector === k}
          onClick={() => onPick(k)}
        >
          <span className="mono qb-connector__kw">{CONNECTOR_LABELS[k].keyword}</span> — {CONNECTOR_LABELS[k].meaning}
        </button>
      ))}
      {connector === null ? <span className="qb-connector__note">chưa chọn cách nối</span> : null}
    </div>
  );
}

interface ConditionRowProps {
  table: TableName;
  cond: QueryCondition;
  index: number;
  model: QueryModel;
  onChange: (model: QueryModel) => void;
  evidenceOptions: readonly EvidenceValueOption[];
  disabled: boolean;
}

function ConditionRow({ table, cond, index, model, onChange, evidenceOptions, disabled }: ConditionRowProps) {
  const n = index + 1;
  const column = isColumnOf(table, cond.column) ? cond.column : null;
  const usesList = cond.op === 'eq' || cond.op === 'in';
  const distinct = useDistinctValues(table, column, usesList && !disabled);
  const clueOpts = optionsFor(evidenceOptions, cond.column, cond.op);
  const clueKey = selectedOptionKey(clueOpts, cond);

  const applyOption = (key: string): void => {
    const opt = clueOpts.find((o) => o.key === key);
    if (opt) onChange(setConditionValue(model, cond.id, optionValue(opt, cond.op), opt.source));
  };

  let valueEditor;
  if (cond.op === 'eq') {
    const v = Array.isArray(cond.value) ? (cond.value[0] ?? '') : cond.value;
    const dataValues = distinct.status === 'ready' ? distinct.values : [];
    const current = clueKey ?? (v !== '' ? `data:${v}` : '');
    const customNeeded = clueKey === null && v !== '' && !dataValues.includes(v);
    valueEditor = (
      <select
        className="qb-select qb-value"
        aria-label={`Giá trị của điều kiện ${n}`}
        value={current}
        onChange={(e) => {
          const key = e.target.value;
          if (key.startsWith('data:')) onChange(setConditionValue(model, cond.id, key.slice(5), { kind: 'manual' }));
          else applyOption(key);
        }}
      >
        <option value="" disabled>
          Chọn giá trị…
        </option>
        {clueOpts.length > 0 ? (
          <optgroup label={CLUE_GROUP}>
            {clueOpts.map((o) => (
              <option key={o.key} value={o.key}>
                {o.label}
              </option>
            ))}
          </optgroup>
        ) : null}
        {customNeeded ? (
          <optgroup label="Đang dùng">
            <option value={`data:${v}`}>{v}</option>
          </optgroup>
        ) : null}
        <optgroup label={DATA_GROUP}>
          {distinct.status === 'loading' ? (
            <option value="__loading" disabled>
              Đang tải giá trị…
            </option>
          ) : distinct.status === 'error' ? (
            <option value="__error" disabled>
              Không đọc được giá trị của cột này
            </option>
          ) : (
            dataValues.map((d) => (
              <option key={d} value={`data:${d}`}>
                {d}
              </option>
            ))
          )}
        </optgroup>
      </select>
    );
  } else if (cond.op === 'in') {
    const list = Array.isArray(cond.value) ? cond.value : cond.value === '' ? [] : [cond.value];
    const dataValues = distinct.status === 'ready' ? distinct.values.filter((d) => !list.includes(d)) : [];
    valueEditor = (
      <div className="qb-list">
        {list.map((item) => (
          <span key={item} className="qb-list__item mono">
            {item}
            <button
              type="button"
              className="qb-icon-btn"
              aria-label={`Bỏ ${item} khỏi danh sách`}
              title={`Bỏ ${item} khỏi danh sách`}
              onClick={() => onChange(setConditionValue(model, cond.id, list.filter((x) => x !== item), { kind: 'manual' }))}
            >
              <IconClose />
            </button>
          </span>
        ))}
        <select
          className="qb-select qb-value"
          aria-label={`Thêm giá trị vào danh sách của điều kiện ${n}`}
          value=""
          onChange={(e) => {
            const key = e.target.value;
            if (key.startsWith('data:')) onChange(setConditionValue(model, cond.id, [...list, key.slice(5)], { kind: 'manual' }));
            else applyOption(key);
          }}
        >
          <option value="" disabled>
            {list.length === 0 ? 'Chọn giá trị…' : 'Thêm giá trị…'}
          </option>
          {clueOpts.length > 0 ? (
            <optgroup label={CLUE_GROUP}>
              {clueOpts.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </optgroup>
          ) : null}
          <optgroup label={DATA_GROUP}>
            {distinct.status === 'loading' ? (
              <option value="__loading" disabled>
                Đang tải giá trị…
              </option>
            ) : (
              dataValues.map((d) => (
                <option key={d} value={`data:${d}`}>
                  {d}
                </option>
              ))
            )}
          </optgroup>
        </select>
      </div>
    );
  } else {
    const v = Array.isArray(cond.value) ? (cond.value[0] ?? '') : cond.value;
    valueEditor = (
      <div className="qb-text">
        <input
          className="qb-input qb-value"
          type="text"
          aria-label={`Giá trị (chữ) của điều kiện ${n}`}
          placeholder="Gõ chữ…"
          value={v}
          onChange={(e) => onChange(setConditionValue(model, cond.id, e.target.value, { kind: 'manual' }))}
        />
        {clueOpts.length > 0 ? (
          <select
            className="qb-select"
            aria-label={`${CLUE_GROUP} cho điều kiện ${n}`}
            value={clueKey ?? ''}
            onChange={(e) => applyOption(e.target.value)}
          >
            <option value="" disabled>
              {CLUE_GROUP}…
            </option>
            <optgroup label={CLUE_GROUP}>
              {clueOpts.map((o) => (
                <option key={o.key} value={o.key}>
                  {o.label}
                </option>
              ))}
            </optgroup>
          </select>
        ) : null}
      </div>
    );
  }

  return (
    <div className="qb-cond" role="group" aria-label={`Điều kiện ${n}`}>
      <select
        className="qb-select mono"
        aria-label={`Cột lọc của điều kiện ${n}`}
        value={cond.column}
        title={columnTitle(table, cond.column)}
        onChange={(e) => {
          const col = e.target.value;
          if (isColumnOf(table, col)) onChange(setConditionColumn(model, cond.id, col));
        }}
      >
        {columnsOf(table).map((col) => (
          <option key={col} value={col}>
            {col}
          </option>
        ))}
      </select>
      <span className="qb-op">
        <select
          className="qb-select"
          aria-label={`Phép so sánh của điều kiện ${n}`}
          value={cond.op}
          onChange={(e) => {
            const op = CONDITION_OPS.find((o) => o === e.target.value);
            if (op) onChange(setConditionOp(model, cond.id, op as ConditionOp));
          }}
        >
          {CONDITION_OPS.map((op) => (
            <option key={op} value={op}>
              {OP_LABELS[op].label}
            </option>
          ))}
        </select>
        <code className="qb-op__sql" aria-hidden="true">
          {OP_LABELS[cond.op].sql}
        </code>
      </span>
      {valueEditor}
      <button
        type="button"
        className="qb-icon-btn qb-remove"
        aria-label={`Xóa điều kiện ${n}`}
        title="Xóa điều kiện này"
        onClick={() => onChange(removeCondition(model, cond.id))}
      >
        <IconClose />
      </button>
    </div>
  );
}
