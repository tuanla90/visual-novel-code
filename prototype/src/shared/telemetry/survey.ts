/**
 * Khảo sát trong game (QĐ-031, QĐ-042): chỉ lựa chọn đóng, không ô chữ tự do, không dữ liệu cá nhân.
 * Nhãn hiển thị + kiểm câu trả lời chỉ gồm giá trị trong danh sách đóng.
 */
import {
  MEMORABLE_PARTS,
  type ExcelLevel,
  type MemorablePart,
  type PlayNext,
  type PostSurveyAnswers,
  type PreSurveyAnswers,
  type SqlBefore,
} from './events';

export interface SurveyOption<T extends string> {
  value: T;
  label: string;
}

export const EXCEL_OPTIONS: SurveyOption<ExcelLevel>[] = [
  { value: 'none', label: 'Chưa dùng' },
  { value: 'basic', label: 'Dùng cơ bản' },
  { value: 'confident', label: 'Dùng thành thạo: hàm, lọc, pivot' },
];

export const SQL_OPTIONS: SurveyOption<SqlBefore>[] = [
  { value: 'no', label: 'Chưa học' },
  { value: 'some', label: 'Học qua một ít' },
  { value: 'yes', label: 'Học và dùng được' },
];

export const MEMORABLE_OPTIONS: SurveyOption<MemorablePart>[] = [
  { value: 'clues', label: 'Tìm manh mối' },
  { value: 'build-query', label: 'Tự tạo truy vấn' },
  { value: 'rebut-quan', label: 'Màn phản bác Quân' },
  { value: 'independent-source', label: 'Cú lật: xác minh bằng nguồn độc lập' },
  { value: 'story-characters', label: 'Câu chuyện và nhân vật' },
];

export const PLAY_NEXT_OPTIONS: SurveyOption<PlayNext>[] = [
  { value: 'yes', label: 'Có' },
  { value: 'maybe', label: 'Có thể' },
  { value: 'no', label: 'Không' },
];

/** Tối đa 2 phần đáng nhớ nhất (QĐ-031). */
export const MAX_MEMORABLE = 2;

export function optionLabel<T extends string>(options: SurveyOption<T>[], value: T | null | undefined): string {
  if (value === null || value === undefined) return '—';
  return options.find((o) => o.value === value)?.label ?? '—';
}

// ---------- Khảo sát đầu game ----------

/** Bản nháp trên màn tiêu đề; ghi thành sự kiện khi bấm "Bắt đầu"/"Chơi tiếp". */
export interface PreSurveyDraft {
  excelLevel: ExcelLevel | null;
  sqlBefore: SqlBefore | null;
  skipped: boolean;
}

export const EMPTY_PRE_DRAFT: PreSurveyDraft = { excelLevel: null, sqlBefore: null, skipped: false };

/**
 * Trả lời đủ hai câu → gửi; bấm "Bỏ qua" hoặc chưa trả lời đủ → bỏ qua
 * (sự kiện chỉ nhận câu trả lời đủ hai câu, không có "trả lời một nửa").
 */
export function resolvePreSurvey(draft: PreSurveyDraft): { kind: 'submit'; answers: PreSurveyAnswers } | { kind: 'skip' } {
  if (!draft.skipped && draft.excelLevel !== null && draft.sqlBefore !== null) {
    return { kind: 'submit', answers: { excelLevel: draft.excelLevel, sqlBefore: draft.sqlBefore } };
  }
  return { kind: 'skip' };
}

// ---------- Khảo sát cuối game ----------

export interface PostSurveyDraft {
  memorable: MemorablePart[];
  /** `null` = chưa chọn hoặc chọn "Không có" (sự kiện không phân biệt hai trường hợp này). */
  annoying: MemorablePart | null;
  playNext: PlayNext | null;
}

export const EMPTY_POST_DRAFT: PostSurveyDraft = { memorable: [], annoying: null, playNext: null };

/** Bật/tắt một phần đáng nhớ; đã đủ 2 thì không thêm được nữa. */
export function toggleMemorable(current: readonly MemorablePart[], part: MemorablePart): MemorablePart[] {
  if (current.includes(part)) return current.filter((p) => p !== part);
  if (current.length >= MAX_MEMORABLE) return [...current];
  return [...current, part];
}

/** Gửi được khi đã trả lời "có muốn chơi tiếp" (hai câu còn lại có thể để trống). */
export function resolvePostSurvey(draft: PostSurveyDraft): PostSurveyAnswers | null {
  if (draft.playNext === null) return null;
  return {
    memorable: draft.memorable.filter((p) => (MEMORABLE_PARTS as readonly string[]).includes(p)).slice(0, MAX_MEMORABLE),
    annoying: draft.annoying,
    playNext: draft.playNext,
  };
}

// ---------- Kiểm "chỉ lựa chọn đóng" ----------

const inList = (list: readonly string[], v: unknown): boolean => typeof v === 'string' && list.includes(v);

function sameKeys(o: object, keys: string[]): boolean {
  const k = Object.keys(o).sort();
  return k.length === keys.length && k.every((x, i) => x === [...keys].sort()[i]);
}

/** true khi câu trả lời chỉ gồm đúng các trường đã định, mỗi giá trị nằm trong danh sách đóng. */
export function isClosedPreAnswers(a: unknown): boolean {
  if (typeof a !== 'object' || a === null) return false;
  const o = a as Record<string, unknown>;
  return (
    sameKeys(o, ['excelLevel', 'sqlBefore']) &&
    inList(EXCEL_OPTIONS.map((x) => x.value), o.excelLevel) &&
    inList(SQL_OPTIONS.map((x) => x.value), o.sqlBefore)
  );
}

export function isClosedPostAnswers(a: unknown): boolean {
  if (typeof a !== 'object' || a === null) return false;
  const o = a as Record<string, unknown>;
  return (
    sameKeys(o, ['memorable', 'annoying', 'playNext']) &&
    Array.isArray(o.memorable) &&
    o.memorable.length <= MAX_MEMORABLE &&
    o.memorable.every((p) => inList(MEMORABLE_PARTS, p)) &&
    (o.annoying === null || inList(MEMORABLE_PARTS, o.annoying)) &&
    inList(PLAY_NEXT_OPTIONS.map((x) => x.value), o.playNext)
  );
}
