/**
 * Phép sửa model trình dựng (thuần, không React) — mỗi hàm trả model MỚI.
 * Quy ước: cột trong SELECT luôn theo thứ tự cột của bảng (SQL song song đọc tự nhiên, giống đáp án);
 * đổi bảng thì bỏ cột/điều kiện không thuộc bảng mới; phép nối giữ nguyên lựa chọn của người chơi.
 *
 * Điều kiện "chưa chọn cột" (QĐ-056): kiểu `QueryCondition.column` (tệp đóng băng) không cho rỗng, nên
 * trạng thái này được ghi bằng TIỀN TỐ CỦA ID (`new-N`; chọn cột xong đổi thành `cond-N`). Cột giữ chỗ
 * là cột đầu của bảng, KHÔNG bao giờ đi vào SQL (`withoutPending`) và không hiện trên giao diện; giá trị
 * rỗng nên `validateModel` chặn nút Chạy bằng `no-value`. Lưu được qua tải lại trang (nằm trong model).
 */
import { columnsOf, isColumnOf, type ColumnName, type TableName } from '../schema';
import type { ConditionOp, ConditionValueSource, Connector, QueryCondition, QueryModel } from '../types';

export const PENDING_ID_PREFIX = 'new-';

/** Điều kiện vừa thêm, chưa chọn cột (QĐ-056). */
export function isPendingCondition(c: Pick<QueryCondition, 'id'>): boolean {
  return c.id.startsWith(PENDING_ID_PREFIX);
}

/** Khóa React ổn định khi điều kiện đổi từ "chưa chọn cột" (`new-N`) sang đã chọn (`cond-N`). */
export function conditionKey(c: Pick<QueryCondition, 'id'>): string {
  return isPendingCondition(c) ? `cond-${c.id.slice(PENDING_ID_PREFIX.length)}` : c.id;
}

/** Model bỏ các điều kiện chưa chọn cột — dùng để sinh SQL (song song, lưu store). */
export function withoutPending(model: QueryModel): QueryModel {
  return model.conditions.some(isPendingCondition) ? { ...model, conditions: model.conditions.filter((c) => !isPendingCondition(c)) } : model;
}

function sortColumns(table: TableName, columns: ColumnName[]): ColumnName[] {
  const order = columnsOf(table);
  return [...new Set(columns)].sort((a, b) => order.indexOf(a) - order.indexOf(b));
}

export function setTable(model: QueryModel, table: TableName): QueryModel {
  if (model.table === table) return model;
  const columns = model.columns === '*' ? '*' : sortColumns(table, model.columns.filter((c) => isColumnOf(table, c)));
  const placeholder = columnsOf(table)[0];
  // Điều kiện chưa chọn cột không thuộc bảng nào → giữ lại, trỏ cột giữ chỗ sang bảng mới.
  const conditions = model.conditions
    .filter((c) => isPendingCondition(c) || isColumnOf(table, c.column))
    .map((c) => (isPendingCondition(c) && placeholder ? { ...c, column: placeholder } : c));
  return { ...model, table, columns, conditions };
}

export function toggleColumn(model: QueryModel, column: ColumnName, on: boolean): QueryModel {
  if (model.table === null || model.columns === '*') return model;
  const next = on ? [...model.columns, column] : model.columns.filter((c) => c !== column);
  return { ...model, columns: sortColumns(model.table, next) };
}

/** Bật `*` (mọi cột) hoặc tắt về danh sách rỗng để chọn từng cột. */
export function setAllColumns(model: QueryModel, on: boolean): QueryModel {
  return { ...model, columns: on ? '*' : [] };
}

/** Số N lớn hơn mọi `cond-N` / `new-N` đang có (và không nhỏ hơn số điều kiện). */
function nextConditionNumber(model: QueryModel): number {
  let max = model.conditions.length;
  for (const c of model.conditions) {
    const m = /^(?:cond|new)-(\d+)$/.exec(c.id);
    if (m) max = Math.max(max, Number(m[1]));
  }
  return max + 1;
}

export function emptyValueFor(op: ConditionOp): string | string[] {
  return op === 'in' ? [] : '';
}

/**
 * Thêm một điều kiện CHƯA CHỌN CỘT (QĐ-056): giao diện hiện "Chọn cột…", phép + giá trị chỉ hiện sau
 * khi chọn cột. Cột giữ chỗ (cột đầu của bảng) không bao giờ hiện ra hay đi vào SQL.
 */
export function addCondition(model: QueryModel): QueryModel {
  if (model.table === null) return model;
  const placeholder = columnsOf(model.table)[0];
  if (!placeholder) return model;
  const cond: QueryCondition = {
    id: `${PENDING_ID_PREFIX}${nextConditionNumber(model)}`,
    column: placeholder,
    op: 'eq',
    value: '',
    source: { kind: 'manual' },
  };
  return { ...model, conditions: [...model.conditions, cond] };
}

export function removeCondition(model: QueryModel, id: string): QueryModel {
  return { ...model, conditions: model.conditions.filter((c) => c.id !== id) };
}

function mapCondition(model: QueryModel, id: string, f: (c: QueryCondition) => QueryCondition): QueryModel {
  return { ...model, conditions: model.conditions.map((c) => (c.id === id ? f(c) : c)) };
}

/**
 * Chọn/đổi cột: giá trị cũ thuộc cột cũ nên xóa về trống. Điều kiện chưa chọn cột thì thành điều kiện
 * thật (`new-N` → `cond-N`) kể cả khi cột chọn trùng cột giữ chỗ.
 */
export function setConditionColumn(model: QueryModel, id: string, column: ColumnName): QueryModel {
  return mapCondition(model, id, (c) => {
    if (isPendingCondition(c)) {
      let n = Number(c.id.slice(PENDING_ID_PREFIX.length));
      if (!Number.isFinite(n)) n = nextConditionNumber(model);
      while (model.conditions.some((x) => x.id === `cond-${n}`)) n += 1;
      return { ...c, id: `cond-${n}`, column, value: emptyValueFor(c.op), source: { kind: 'manual' } };
    }
    return c.column === column ? c : { ...c, column, value: emptyValueFor(c.op), source: { kind: 'manual' } };
  });
}

/** Đổi phép: giữ giá trị khi còn dùng được (chuỗi ↔ danh sách một phần tử). */
export function setConditionOp(model: QueryModel, id: string, op: ConditionOp): QueryModel {
  return mapCondition(model, id, (c) => {
    if (c.op === op) return c;
    let value: string | string[] = c.value;
    if (op === 'in' && !Array.isArray(value)) value = value.trim() === '' ? [] : [value];
    if (op !== 'in' && Array.isArray(value)) value = value[0] ?? '';
    // Danh sách từ vật chứng không còn nguyên vẹn khi rút về một giá trị → coi như tự nhập.
    const source: ConditionValueSource = Array.isArray(c.value) && !Array.isArray(value) && c.value.length > 1 ? { kind: 'manual' } : c.source;
    return { ...c, op, value, source };
  });
}

export function setConditionValue(model: QueryModel, id: string, value: string | string[], source: ConditionValueSource): QueryModel {
  return mapCondition(model, id, (c) => ({ ...c, value, source }));
}

export function setConnector(model: QueryModel, connector: Connector): QueryModel {
  return model.connector === connector ? model : { ...model, connector };
}

/** Giá trị có sẵn từ manh mối / vật chứng cho mục "Từ manh mối" (QĐ-017). */
export interface EvidenceValueOption {
  key: string;
  label: string;
  column: ColumnName;
  value: string | string[];
  source: ConditionValueSource;
}

function sameValue(a: string | string[], b: string | string[]): boolean {
  if (Array.isArray(a) && Array.isArray(b)) {
    return a.length === b.length && [...a].sort().every((v, i) => v === [...b].sort()[i]);
  }
  return !Array.isArray(a) && !Array.isArray(b) && a === b;
}

/**
 * SQL gõ tay không mang nguồn giá trị (`sqlToModel` trả `manual`): điều kiện nào trùng đúng cột +
 * giá trị của một manh mối/vật chứng thì ghi lại nguồn đó khi quay về trình dựng.
 */
export function attributeSources(model: QueryModel, options: readonly EvidenceValueOption[]): QueryModel {
  return {
    ...model,
    conditions: model.conditions.map((c) => {
      if (c.source.kind !== 'manual') return c;
      const hit = options.find((o) => o.column === c.column && sameValue(o.value, c.value));
      return hit ? { ...c, source: hit.source } : c;
    }),
  };
}
