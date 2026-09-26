/**
 * Hàng WHERE: danh sách điều kiện (cột · phép · giá trị) + một phép nối chung (QĐ-016, QĐ-039).
 * - Điều kiện mới CHƯA chọn cột ("Chọn cột…"); phép và giá trị chỉ hiện sau khi chọn cột (QĐ-056).
 * - Ô giá trị (QĐ-017, QĐ-056): cột ÍT giá trị (≤ LIST_MAX_DISTINCT giá trị khác nhau, ĐẾM TỪ DỮ LIỆU) →
 *   `=` chọn từ danh sách, `IN` là chip + ô thêm; cột NHIỀU giá trị → ô chữ (`IN`: nhiều giá trị cách nhau
 *   bằng dấu phẩy); ba phép LIKE luôn là ô chữ. Kiểu nào cũng kèm nhóm "Từ manh mối".
 * - Phép nối hiện giữa từng cặp điều kiện, ban đầu CHƯA CHỌN; chọn ở một chỗ là đổi cả loạt.
 */
import { useId, useState, type ReactNode } from 'react';
import { columnsOf, COLUMN_DESCRIPTIONS, isColumnOf, type ColumnName, type TableName } from '../schema';
import { CONDITION_OPS, type ConditionOp, type Connector, type QueryCondition, type QueryModel } from '../types';
import { IconClose, IconPlus } from './icons';
import { CONNECTOR_LABELS, OP_LABELS } from './labels';
import {
  addCondition,
  conditionKey,
  isPendingCondition,
  removeCondition,
  setConditionColumn,
  setConditionOp,
  setConditionValue,
  setConnector,
  type EvidenceValueOption,
} from './model-edit';
import { useDistinctValues } from './use-distinct-values';
import {
  formatListText,
  optionValue,
  optionsFor,
  parseListText,
  sameList,
  selectedOptionKey,
  usesValueList,
} from './value-options';

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
            <li key={conditionKey(c)} className="qb-cond-item">
              {i > 0 ? <ConnectorPicker connector={model.connector} onPick={(k) => onChange(setConnector(model, k))} index={i} /> : null}
              {table ? (
                <ConditionRow table={table} cond={c} index={i} model={model} onChange={onChange} evidenceOptions={evidenceOptions} />
              ) : null}
            </li>
          ))}
        </ol>
      )}
      <button
        type="button"
        className="btn btn--small qb-add"
        disabled={table === null || disabled}
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

/** Các ô của điều kiện bị khóa cùng lúc qua `<fieldset disabled>` của trình dựng (QueryBuilder). */
interface ConditionRowProps {
  table: TableName;
  cond: QueryCondition;
  index: number;
  model: QueryModel;
  onChange: (model: QueryModel) => void;
  evidenceOptions: readonly EvidenceValueOption[];
}

function ConditionRow({ table, cond, index, model, onChange, evidenceOptions }: ConditionRowProps) {
  const n = index + 1;
  const pending = isPendingCondition(cond);
  const column = !pending && isColumnOf(table, cond.column) ? cond.column : null;
  const listCapable = cond.op === 'eq' || cond.op === 'in';
  // Đếm giá trị khác nhau của cột để chọn kiểu ô (danh sách hay ô chữ) — cả khi màn đang khóa, để hiển thị đúng.
  const distinct = useDistinctValues(table, column, listCapable && column !== null);
  const listHintId = useId();
  const clueOpts = pending ? [] : optionsFor(evidenceOptions, cond.column, cond.op);
  const clueKey = selectedOptionKey(clueOpts, cond);
  // Ô chữ: phép LIKE; cột nhiều giá trị; hoặc không đọc được giá trị (vẫn gõ được). Đang đếm → giữ ô chọn.
  const asText = !listCapable || distinct.status === 'error' || (distinct.status === 'ready' && !usesValueList(distinct.values.length));

  const applyOption = (key: string): void => {
    const opt = clueOpts.find((o) => o.key === key);
    if (opt) onChange(setConditionValue(model, cond.id, optionValue(opt, cond.op), opt.source));
  };

  const clueSelect =
    clueOpts.length > 0 ? (
      <select className="qb-select" aria-label={`${CLUE_GROUP} cho điều kiện ${n}`} value={clueKey ?? ''} onChange={(e) => applyOption(e.target.value)}>
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
    ) : null;

  let valueEditor: ReactNode;
  if (pending) {
    valueEditor = <span className="qb-hint">Chọn cột muốn lọc trước, rồi đến phép so sánh và giá trị.</span>;
  } else if (cond.op === 'in' && asText) {
    const list = Array.isArray(cond.value) ? cond.value : cond.value === '' ? [] : [cond.value];
    valueEditor = (
      <div className="qb-text">
        <ListTextInput
          value={list}
          label={`Danh sách giá trị của điều kiện ${n}`}
          describedBy={listHintId}
          onValue={(v) => onChange(setConditionValue(model, cond.id, v, { kind: 'manual' }))}
        />
        <span id={listHintId} className="qb-hint">
          nhiều giá trị: cách nhau bằng dấu phẩy
        </span>
        {clueSelect}
      </div>
    );
  } else if (asText) {
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
        {clueSelect}
      </div>
    );
  } else if (cond.op === 'eq') {
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
          {distinct.status === 'ready' ? (
            dataValues.map((d) => (
              <option key={d} value={`data:${d}`}>
                {d}
              </option>
            ))
          ) : (
            <option value="__loading" disabled>
              Đang tải giá trị…
            </option>
          )}
        </optgroup>
      </select>
    );
  } else {
    // IN trên cột ít giá trị: chip + ô thêm từ danh sách.
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
            {distinct.status === 'ready' ? (
              dataValues.map((d) => (
                <option key={d} value={`data:${d}`}>
                  {d}
                </option>
              ))
            ) : (
              <option value="__loading" disabled>
                Đang tải giá trị…
              </option>
            )}
          </optgroup>
        </select>
      </div>
    );
  }

  return (
    <div className={`qb-cond${pending ? ' is-pending' : ''}`} role="group" aria-label={`Điều kiện ${n}`}>
      <select
        className="qb-select mono"
        aria-label={`Cột lọc của điều kiện ${n}`}
        value={pending ? '' : cond.column}
        title={pending ? 'Chọn cột muốn lọc' : columnTitle(table, cond.column)}
        onChange={(e) => {
          const col = e.target.value;
          if (isColumnOf(table, col)) onChange(setConditionColumn(model, cond.id, col));
        }}
      >
        {pending ? (
          <option value="" disabled>
            Chọn cột…
          </option>
        ) : null}
        {columnsOf(table).map((col) => (
          <option key={col} value={col}>
            {col}
          </option>
        ))}
      </select>
      {pending ? null : (
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
      )}
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

/**
 * Ô chữ cho phép IN trên cột nhiều giá trị: gõ nhiều giá trị cách nhau bằng dấu phẩy. Giữ nguyên chữ người
 * chơi đang gõ (kể cả dấu phẩy cuối); chỉ viết lại ô khi giá trị đổi từ ngoài ("Từ manh mối", quay về từ SQL).
 */
function ListTextInput({ value, label, describedBy, onValue }: { value: string[]; label: string; describedBy: string; onValue: (v: string[]) => void }) {
  const [draft, setDraft] = useState(() => formatListText(value));
  const [synced, setSynced] = useState<readonly string[]>(value);
  if (!sameList(synced, value)) {
    setSynced(value);
    if (!sameList(parseListText(draft), value)) setDraft(formatListText(value));
  }
  return (
    <input
      className="qb-input qb-value qb-input--list"
      type="text"
      aria-label={label}
      aria-describedby={describedBy}
      placeholder="giá trị 1, giá trị 2"
      value={draft}
      onChange={(e) => {
        setDraft(e.target.value);
        onValue(parseListText(e.target.value));
      }}
    />
  );
}
