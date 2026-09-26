/**
 * Hợp đồng kiểu phần `evidence`: manh mối, tài liệu, vật chứng từ truy vấn, thẻ hồ sơ.
 *
 * Thẻ hồ sơ có: tiêu đề, nguồn, nội dung (có thể là đoạn trích nhiều dòng), giá trị cho
 * trình dựng (không hiện trên thẻ), "Câu hỏi còn mở" (hiện đến hết Phần 4), "Lưu ý"
 * (hiện từ Phần 5 — QĐ-037), chú thích gắn sau (end-03).
 */
import type { ChallengeId, ClueId, DocumentId, EvidenceId, QueryEvidenceId } from '../shared/ids';
import type { ColumnName } from '../sql-challenge/schema';
import type { ConditionOp, SqlValue } from '../sql-challenge/types';

/** Giá trị mà manh mối cung cấp cho mục "Từ manh mối" của trình dựng (QĐ-017). Không hiện trên thẻ. */
export interface BuilderValue {
  /** Nhãn trong ô chọn, ví dụ "H — chữ ký lá thư". */
  label: string;
  column: ColumnName;
  /** Phép so sánh gợi ý (ví dụ `startsWith` cho chữ ký). */
  suggestedOp: ConditionOp;
  value: string | string[];
}

export interface ClueCard {
  id: ClueId;
  title: string;
  source: string;
  content: string;
  builderValue?: BuilderValue;
  /** Câu hỏi manh mối này đặt ra; hiện đến hết Phần 4. */
  openQuestion: string;
  /** Giới hạn của bằng chứng; chỉ hiện từ Phần 5 (thay cho "Câu hỏi còn mở"). */
  caveat: string;
}

/** Nội dung tài liệu: chuỗi = mô tả hình/chữ; mảng = đoạn trích nhiều dòng (thư, sổ). */
export type DocumentBody = string | string[];

export interface DocumentCard {
  id: DocumentId;
  title: string;
  source: string;
  body: DocumentBody;
  /** Dòng phụ dưới nội dung (ví dụ mặt ngoài phong bì). */
  extra?: string;
  /** Không có với tài liệu xuất hiện ở Phần 5 (doc-handover-log). */
  openQuestion?: string;
  caveat: string;
}

/** Vật chứng từ truy vấn đã lưu vào Hồ sơ (dữ liệu runtime; tiêu đề/mô tả nằm ở ChallengeContent.evidence). */
export interface SavedQueryEvidence {
  id: QueryEvidenceId;
  challengeId: ChallengeId;
  sql: string;
  columns: string[];
  rows: SqlValue[][];
  rowCount: number;
  savedAt: number;
  /** Với ev-quan-fixed: câu SQL trước khi sửa và số dòng của nó. */
  before?: { sql: string; rowCount: number };
}

/** Chú thích gắn sau vào một thẻ (ev-c3-shortlist ở end-03). */
export interface EvidenceAnnotation {
  evidenceId: EvidenceId;
  note: string;
  /** Làm mờ tên/mã trong bảng của thẻ. */
  redact: boolean;
  at: number;
}

export type EvidenceGroup = 'clue' | 'document' | 'query';

export interface EvidenceContent {
  clues: Record<ClueId, ClueCard>;
  documents: Record<DocumentId, DocumentCard>;
}
