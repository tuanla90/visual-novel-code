/**
 * Mục "Từ manh mối" của ô giá trị (QĐ-017): giá trị cho trình dựng của manh mối ĐÃ MỞ, và danh sách
 * lớp từ vật chứng `ev-c2-classes-b` nếu đã lưu (dùng với cột `ma_lop` + phép "thuộc danh sách").
 * Mỗi lựa chọn ghi `source` tương ứng để model biết giá trị đến từ bằng chứng nào.
 */
import type { GameContent } from '../../content/types';
import { evidenceTitle } from '../../evidence/labels';
import type { SavedQueryEvidence } from '../../evidence/types';
import { CLUE_IDS, type EvidenceId } from '../../shared/ids';
import { CLASS_ROWS } from '../data';
import type { ConditionOp } from '../types';
import type { EvidenceValueOption } from './model-edit';

export const CLASS_LIST_EVIDENCE_ID = 'ev-c2-classes-b' as const;

/**
 * Cột có không quá chừng này giá trị khác nhau (ĐẾM TỪ DỮ LIỆU, không viết cứng tên cột) thì ô giá trị
 * là danh sách chọn; cột nhiều giá trị hơn (mã SV, họ đệm, tên) dùng ô chữ — danh sách 40 mã vừa vô ích
 * vừa gợi ý lối tắt "chọn thẳng mã" (QĐ-056).
 */
export const LIST_MAX_DISTINCT = 12;

export function usesValueList(distinctCount: number): boolean {
  return distinctCount <= LIST_MAX_DISTINCT;
}

/** Ô chữ của phép IN: "An, Bình ,, Chi" → ["An", "Bình", "Chi"] (bỏ khoảng trắng thừa, ô rỗng, giá trị trùng). */
export function parseListText(text: string): string[] {
  const out: string[] = [];
  for (const part of text.split(',')) {
    const v = part.trim();
    if (v !== '' && !out.includes(v)) out.push(v);
  }
  return out;
}

export function formatListText(values: readonly string[]): string {
  return values.join(', ');
}

export function sameList(a: readonly string[], b: readonly string[]): boolean {
  return a.length === b.length && a.every((v, i) => v === b[i]);
}

const CLASS_CODES = new Set(CLASS_ROWS.map((r) => r.ma_lop));

/**
 * Cột mã lớp trong vật chứng đã lưu: cột tên `ma_lop`; nếu người chơi đặt bí danh (SQL gõ tay) thì lấy
 * cột đầu tiên mà mọi giá trị đều là mã lớp có thật.
 */
export function classListFromEvidence(ev: SavedQueryEvidence | undefined): string[] {
  if (!ev || ev.rows.length === 0) return [];
  const pick = (i: number): string[] => [...new Set(ev.rows.map((r) => r[i]).filter((v) => v !== null && v !== undefined).map(String))];
  const named = ev.columns.findIndex((c) => c.toLowerCase() === 'ma_lop');
  if (named >= 0) return pick(named);
  for (let i = 0; i < ev.columns.length; i += 1) {
    const values = pick(i);
    if (values.length > 0 && values.every((v) => CLASS_CODES.has(v))) return values;
  }
  return [];
}

export function evidenceValueOptions(
  content: GameContent,
  unlocked: readonly EvidenceId[],
  classEvidence: SavedQueryEvidence | undefined,
): EvidenceValueOption[] {
  const out: EvidenceValueOption[] = [];
  for (const id of CLUE_IDS) {
    const clue = content.evidence.clues[id];
    if (!clue?.builderValue || !unlocked.includes(id)) continue;
    const bv = clue.builderValue;
    out.push({ key: `clue:${id}`, label: bv.label, column: bv.column, value: bv.value, source: { kind: 'clue', clueId: id } });
  }
  const classes = classListFromEvidence(classEvidence);
  if (classes.length > 0) {
    out.push({
      key: `evidence:${CLASS_LIST_EVIDENCE_ID}`,
      label: `${classes.join(', ')} — ${evidenceTitle(content, CLASS_LIST_EVIDENCE_ID)}`,
      column: 'ma_lop',
      value: classes,
      source: { kind: 'evidence', evidenceId: CLASS_LIST_EVIDENCE_ID },
    });
  }
  return out;
}

/** Lựa chọn "Từ manh mối" dùng được cho một điều kiện (đúng cột; danh sách chỉ dùng với phép IN). */
export function optionsFor(options: readonly EvidenceValueOption[], column: string, op: ConditionOp): EvidenceValueOption[] {
  return options.filter((o) => o.column === column && (op === 'in' || !Array.isArray(o.value)));
}

/** Giá trị áp vào điều kiện khi chọn một lựa chọn "Từ manh mối". */
export function optionValue(option: EvidenceValueOption, op: ConditionOp): string | string[] {
  if (op === 'in') return Array.isArray(option.value) ? [...option.value] : [option.value];
  return Array.isArray(option.value) ? (option.value[0] ?? '') : option.value;
}

/** Khóa của lựa chọn đang được dùng (nguồn + giá trị khớp), hoặc `null`. */
export function selectedOptionKey(options: readonly EvidenceValueOption[], cond: { source: EvidenceValueOption['source']; value: string | string[]; op: ConditionOp }): string | null {
  const src = cond.source;
  if (src.kind === 'manual') return null;
  const hit = options.find((o) => {
    if (src.kind === 'clue') return o.source.kind === 'clue' && o.source.clueId === src.clueId;
    return o.source.kind === 'evidence' && o.source.evidenceId === src.evidenceId;
  });
  if (!hit) return null;
  const v = optionValue(hit, cond.op);
  const same = Array.isArray(v) && Array.isArray(cond.value) ? v.join('\u0000') === cond.value.join('\u0000') : v === cond.value;
  return same ? hit.key : null;
}
