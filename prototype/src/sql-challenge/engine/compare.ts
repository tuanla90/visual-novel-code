/**
 * So tập kết quả của người chơi với tập kết quả chuẩn (QĐ-019):
 * - đúng số dòng;
 * - đủ cột bắt buộc, so THEO GIÁ TRỊ: tìm ánh xạ (đơn ánh) cột bắt buộc → cột người chơi sao cho
 *   đa tập các bộ giá trị trên các cột đó trùng nhau (tên cột, alias, thứ tự cột không quan trọng);
 * - bỏ qua thứ tự dòng; dòng trùng tính đúng số lần (đa tập);
 * - cột thừa (ngoài bắt buộc + khuyến khích) chỉ ghi nhận, không làm sai.
 *
 * Ngoài kết luận đúng/sai, hàm trả thêm quan hệ tập (bằng / tập con / tập cha / rời / giao một
 * phần) trên các cột ánh xạ được, để bước chẩn đoán dùng.
 */
import type { ColumnName } from '../schema';
import type { RunSuccess, SqlValue } from '../types';

export type SetRelation = 'equal' | 'subset' | 'superset' | 'disjoint' | 'overlap' | 'unknown';

export interface CompareResult {
  /** Số dòng bằng nhau. */
  rowCountMatch: boolean;
  /** Mọi cột bắt buộc ánh xạ được và đa tập bộ giá trị trùng nhau (kéo theo rowCountMatch). */
  matches: boolean;
  /** Cột bắt buộc → chỉ số cột người chơi (chỉ các cột ánh xạ được). */
  requiredMap: Partial<Record<ColumnName, number>>;
  missingRequired: ColumnName[];
  /** Cột khuyến khích → chỉ số cột người chơi (ánh xạ theo giá trị, hoặc theo tên khi lệch số dòng). */
  encouragedMap: Partial<Record<ColumnName, number>>;
  /** Chỉ số cột người chơi không thuộc bắt buộc/khuyến khích. */
  extraColumnIndexes: number[];
  /** Quan hệ giữa tập dòng người chơi và tập chuẩn trên các cột bắt buộc ánh xạ được ('unknown' nếu không ánh xạ đủ). */
  relation: SetRelation;
  /** Số cột bắt buộc ánh xạ được THEO GIÁ TRỊ (không tính ánh xạ theo tên khi lệch số dòng). */
  valueMappedCount: number;
}

type Multiset = Map<string, number>;

function key(values: SqlValue[]): string {
  return JSON.stringify(values);
}

function multiset(rows: SqlValue[][], indexes: number[]): Multiset {
  const m: Multiset = new Map();
  for (const row of rows) {
    const k = key(indexes.map((i) => row[i] ?? null));
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return m;
}

function sameMultiset(a: Multiset, b: Multiset): boolean {
  if (a.size !== b.size) return false;
  for (const [k, n] of a) if (b.get(k) !== n) return false;
  return true;
}

function relationOf(player: Multiset, reference: Multiset): SetRelation {
  if (sameMultiset(player, reference)) return 'equal';
  let playerInRef = true;
  let refInPlayer = true;
  let anyCommon = false;
  for (const [k, n] of player) {
    const r = reference.get(k) ?? 0;
    if (r > 0) anyCommon = true;
    if (r < n) playerInRef = false;
  }
  for (const [k, n] of reference) if ((player.get(k) ?? 0) < n) refInPlayer = false;
  if (playerInRef) return 'subset';
  if (refInPlayer) return 'superset';
  return anyCommon ? 'overlap' : 'disjoint';
}

function columnIndex(columns: string[], name: string): number {
  return columns.findIndex((c) => c.toLowerCase() === name.toLowerCase());
}

/**
 * Tìm ánh xạ cột bắt buộc → cột người chơi theo giá trị, tối đa hóa số cột ánh xạ được sao cho
 * đa tập bộ giá trị trên các cột đã ánh xạ trùng với chuẩn; ưu tiên ánh xạ trùng tên khi hòa.
 */
function bestValueMapping(
  player: RunSuccess,
  reference: RunSuccess,
  targets: ColumnName[],
): { map: Partial<Record<ColumnName, number>>; count: number } {
  const refIdx = targets.map((c) => columnIndex(reference.columns, c));
  const playerCols = player.columns.map((_, i) => multiset(player.rows, [i]));
  const candidates: number[][] = refIdx.map((ri, t) => {
    if (ri === -1) return [];
    const refCol = multiset(reference.rows, [ri]);
    const list = playerCols.map((m, i) => (sameMultiset(m, refCol) ? i : -1)).filter((i) => i !== -1);
    const name = targets[t] ?? '';
    // Cột trùng tên đứng trước để kết quả ổn định khi có nhiều cột cùng giá trị.
    return list.sort((a, b) => Number(player.columns[b]?.toLowerCase() === name) - Number(player.columns[a]?.toLowerCase() === name));
  });

  let best: { map: Partial<Record<ColumnName, number>>; count: number; nameHits: number } = { map: {}, count: 0, nameHits: 0 };
  const current: Array<number | null> = new Array<number | null>(targets.length).fill(null);
  const used = new Set<number>();

  const evaluate = (): void => {
    const mapped = current.map((p, t) => (p === null ? null : t)).filter((t): t is number => t !== null);
    if (mapped.length <= best.count && mapped.length !== 0) {
      // Vẫn xét khi bằng để ưu tiên trùng tên.
      if (mapped.length < best.count) return;
    }
    if (mapped.length === 0) return;
    const pm = multiset(player.rows, mapped.map((t) => current[t] as number));
    const rm = multiset(reference.rows, mapped.map((t) => refIdx[t] as number));
    if (!sameMultiset(pm, rm)) return;
    const nameHits = mapped.filter((t) => player.columns[current[t] as number]?.toLowerCase() === targets[t]).length;
    if (mapped.length > best.count || (mapped.length === best.count && nameHits > best.nameHits)) {
      const map: Partial<Record<ColumnName, number>> = {};
      for (const t of mapped) map[targets[t]!] = current[t] as number;
      best = { map, count: mapped.length, nameHits };
    }
  };

  const walk = (t: number): void => {
    if (t === targets.length) {
      evaluate();
      return;
    }
    for (const p of candidates[t] ?? []) {
      if (used.has(p)) continue;
      used.add(p);
      current[t] = p;
      walk(t + 1);
      used.delete(p);
    }
    current[t] = null;
    walk(t + 1);
  };
  walk(0);
  return { map: best.map, count: best.count };
}

/** Ánh xạ theo TÊN cột (dùng khi lệch số dòng — chỉ để xét quan hệ tập, không để kết luận đúng). */
function nameMapping(player: RunSuccess, targets: ColumnName[], exclude: Set<number>): Partial<Record<ColumnName, number>> {
  const map: Partial<Record<ColumnName, number>> = {};
  for (const c of targets) {
    const i = columnIndex(player.columns, c);
    if (i !== -1 && !exclude.has(i)) map[c] = i;
  }
  return map;
}

export function compareResults(player: RunSuccess, reference: RunSuccess, requiredColumns: ColumnName[], encouragedColumns: ColumnName[]): CompareResult {
  const rowCountMatch = player.rowCount === reference.rowCount;

  let requiredMap: Partial<Record<ColumnName, number>>;
  let valueMappedCount = 0;
  if (rowCountMatch) {
    const best = bestValueMapping(player, reference, requiredColumns);
    requiredMap = best.map;
    valueMappedCount = best.count;
  } else {
    requiredMap = nameMapping(player, requiredColumns, new Set());
  }
  const missingRequired = requiredColumns.filter((c) => requiredMap[c] === undefined);
  const matches = rowCountMatch && missingRequired.length === 0;

  const usedByRequired = new Set(Object.values(requiredMap) as number[]);
  const encouragedMap: Partial<Record<ColumnName, number>> = {};
  if (encouragedColumns.length > 0) {
    if (rowCountMatch) {
      // Ánh xạ khuyến khích theo giá trị trên phần cột còn lại.
      const rest: RunSuccess = {
        ok: true,
        columns: player.columns.map((c, i) => (usedByRequired.has(i) ? `\u0000used-${i}` : c)),
        rows: player.rows,
        rowCount: player.rowCount,
      };
      const best = bestValueMapping(rest, reference, encouragedColumns);
      for (const [c, i] of Object.entries(best.map) as Array<[ColumnName, number]>) if (!usedByRequired.has(i)) encouragedMap[c] = i;
    } else {
      Object.assign(encouragedMap, nameMapping(player, encouragedColumns, usedByRequired));
    }
  }
  const mappedAll = new Set([...usedByRequired, ...(Object.values(encouragedMap) as number[])]);
  const extraColumnIndexes = player.columns.map((_, i) => i).filter((i) => !mappedAll.has(i));

  let relation: SetRelation = 'unknown';
  if (missingRequired.length === 0) {
    const pIdx = requiredColumns.map((c) => requiredMap[c] as number);
    const rIdx = requiredColumns.map((c) => columnIndex(reference.columns, c));
    if (!rIdx.includes(-1)) relation = relationOf(multiset(player.rows, pIdx), multiset(reference.rows, rIdx));
  }

  return { rowCountMatch, matches, requiredMap, missingRequired, encouragedMap, extraColumnIndexes, relation, valueMappedCount };
}
