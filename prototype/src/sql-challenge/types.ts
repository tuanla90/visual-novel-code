/**
 * Hợp đồng kiểu phần `sql-challenge`: model trình dựng, kết quả chạy, kết quả chấm,
 * đặc tả thử thách (phía engine) và nội dung thử thách (phía nội dung).
 *
 * Gói `sql-engine` hiện thực các hàm trong ./engine/index.ts theo đúng các kiểu này.
 * Gói `trinh-dung-ui` chỉ dùng kiểu + hàm, không tự chạy SQL.
 */
import type {
  ChallengeId,
  ClueId,
  DiagnosticCode,
  QueryEvidenceId,
  StandardHintId,
} from '../shared/ids';
import type { DialogueLine, MultipleChoiceQuestion } from '../story/types';
import type { ColumnName, TableName } from './schema';

// ---------- Model trình dựng (QĐ-016, QĐ-017, QĐ-039) ----------

/** Phép so sánh: `eq` "bằng" · `startsWith` LIKE 'x%' · `endsWith` LIKE '%x' · `contains` LIKE '%x%' · `in` IN (…). */
export type ConditionOp = 'eq' | 'startsWith' | 'endsWith' | 'contains' | 'in';
export const CONDITION_OPS = ['eq', 'startsWith', 'endsWith', 'contains', 'in'] as const satisfies readonly ConditionOp[];

/** Giá trị đến từ đâu (QĐ-017: "giá trị trong truy vấn phải đến từ bằng chứng"). */
export type ConditionValueSource =
  | { kind: 'manual' }
  | { kind: 'clue'; clueId: ClueId }
  | { kind: 'evidence'; evidenceId: QueryEvidenceId };

export interface QueryCondition {
  /** Id cục bộ trong model (để React key + sửa/xóa). */
  id: string;
  column: ColumnName;
  op: ConditionOp;
  /** `string[]` chỉ dùng với `in`; các phép khác dùng `string`. */
  value: string | string[];
  source: ConditionValueSource;
}

export type Connector = 'AND' | 'OR';

export interface QueryModel {
  /** `null` = hàng FROM còn trống (bắt đầu mỗi thử thách, QĐ-016). */
  table: TableName | null;
  /** Danh sách cột hoặc `'*'`. */
  columns: ColumnName[] | '*';
  conditions: QueryCondition[];
  /** Một phép nối chung cho mọi điều kiện; `null` = chưa chọn (QĐ-039). */
  connector: Connector | null;
}

export type BuilderMode = 'builder' | 'sql';

// ---------- Kết quả chạy ----------

/** Giá trị ô kết quả (schema chỉ có TEXT/INTEGER; NULL phòng hờ). */
export type SqlValue = string | number | null;

export type RunErrorKind = 'not_select' | 'syntax' | 'no_table' | 'no_column' | 'other';

export interface RunSuccess {
  ok: true;
  columns: string[];
  rows: SqlValue[][];
  rowCount: number;
}

export interface RunFailure {
  ok: false;
  kind: RunErrorKind;
  /** Thông điệp gốc của SQLite (chỉ để gỡ lỗi / bảng người quan sát, không phải lời thoại). */
  message: string;
}

export type RunResult = RunSuccess | RunFailure;

// ---------- Kết quả chấm (QĐ-019, QĐ-040) ----------

/** `blocking`: không chạy được · `error`: chưa đúng · `tip`: đúng nhưng có mẹo (cột thừa). */
export type DiagnosticSeverity = 'blocking' | 'error' | 'tip';

export interface Diagnostic {
  code: DiagnosticCode;
  severity: DiagnosticSeverity;
  /** Chi tiết máy (ví dụ tên cột thiếu) — không hiện nguyên văn cho người chơi. */
  detail?: string;
}

export type GradeStatus = 'correct' | 'incorrect' | 'error';

export interface HiddenDatasetResult {
  /** Thử thách này có chạy dataset ẩn không (QĐ-015). */
  ran: boolean;
  /** `null` khi không chạy. */
  passed: boolean | null;
}

export interface GradeResult {
  status: GradeStatus;
  /** Đã sắp theo thứ tự ưu tiên của "Quy ước thẻ thử thách"; phần tử đầu là mã hiển thị. */
  diagnostics: Diagnostic[];
  /** Mã dùng để chọn lời nhận xét (phần tử đầu của `diagnostics`, hoặc `null` khi đúng và không có mẹo). */
  primaryCode: DiagnosticCode | null;
  /** Có cột ngoài cột bắt buộc/khuyến khích (vẫn tính đúng, kèm mẹo). */
  extraColumns: boolean;
  hidden: HiddenDatasetResult;
  /** Kết quả trên dataset chính (đã có sẵn để hiển thị bảng). */
  run: RunResult;
}

// ---------- Đặc tả thử thách (phía engine) ----------

export interface ChallengeSpec {
  id: ChallengeId;
  /** Bảng đúng của thử thách (để chẩn đoán `wrong-table`). */
  table: TableName;
  /** SQL chuẩn; kết quả của nó là tập kết quả kỳ vọng trên mọi dataset. */
  referenceSql: string;
  requiredColumns: ColumnName[];
  encouragedColumns: ColumnName[];
  /** Chạy thêm dataset ẩn (QĐ-015: c1, c3, debrief-fix). */
  runHiddenDataset: boolean;
  /** Model nạp sẵn (debrief-fix: truy vấn của Quân với connector 'OR'); mặc định model trống. */
  initialModel?: QueryModel;
  /** Số dòng kỳ vọng trên dataset chính (QĐ-012) — để test bất biến, không dùng để chấm. */
  expectedRowCount: number;
}

// ---------- Nội dung thử thách (phía nội dung) ----------

/** Vùng của trình dựng được làm nổi bật trong một bước hướng dẫn (QĐ-021). */
export type BuilderRegion = 'from' | 'select' | 'where' | 'run' | 'preview';
export const BUILDER_REGIONS = ['from', 'select', 'where', 'run', 'preview'] as const satisfies readonly BuilderRegion[];

export interface GuideStep {
  /** 1, 2, 3, … theo thứ tự. */
  step: number;
  highlight: BuilderRegion;
  line: DialogueLine;
}

/** Lời cho một mã chẩn đoán: lời riêng hoặc dùng câu gợi ý chuẩn. */
export type DiagnosticResponse = { line: DialogueLine } | { useStandardHint: StandardHintId };

export interface QueryEvidenceCardContent {
  id: QueryEvidenceId;
  title: string;
  description: string;
}

export interface ChallengeContent {
  id: ChallengeId;
  title: string;
  /** Đề bài hiển thị; phải nói rõ cần những cột nào (QĐ-019). */
  prompt: string;
  relatedClues: ClueId[];
  learningGoal: string;
  /** Bước hướng dẫn từng bước (chỉ c1 có; thử thách khác để rỗng). */
  steps: GuideStep[];
  /** Ba mức "Hỏi Hà Vy"; bấm thêm thì lặp mức 3. */
  hints: [DialogueLine, DialogueLine, DialogueLine];
  /** Lời riêng của thử thách theo mã chẩn đoán; mã không có ở đây rơi về bảng dùng chung. */
  diagnosticLines: Partial<Record<DiagnosticCode, DiagnosticResponse>>;
  onCorrect: DialogueLine;
  /** Câu hỏi đọc kết quả sau khi đúng (QĐ-023); `null` với debrief-fix. */
  readQuestion: MultipleChoiceQuestion | null;
  evidence: QueryEvidenceCardContent;
}

/** Ba câu gợi ý chuẩn §5.2 (giọng Hà Vy). */
export type StandardHints = Record<StandardHintId, DialogueLine>;

/** "Nhận xét chung cho mọi thử thách". */
export type CommonDiagnosticLines = Partial<Record<DiagnosticCode, DiagnosticResponse>>;

export interface ChallengeDefinition {
  spec: ChallengeSpec;
  content: ChallengeContent;
}

// ---------- Tóm tắt một lần chạy (lưu trong store, không lưu bảng kết quả) ----------

export interface RunSummary {
  at: number;
  mode: BuilderMode;
  sql: string;
  status: GradeStatus;
  rowCount: number | null;
  primaryCode: DiagnosticCode | null;
  connector: Connector | null;
}

export function emptyQueryModel(): QueryModel {
  return { table: null, columns: [], conditions: [], connector: null };
}
