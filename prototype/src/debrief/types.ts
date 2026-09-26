/**
 * Hợp đồng kiểu phần `debrief`: chọn dòng lỗi và màn chiếu (QĐ-024).
 * Câu hỏi diễn giải ("hai dòng nghĩa là gì", cú lật) dùng MultipleChoiceQuestion của story.
 */
import type { QueryEvidenceId } from '../shared/ids';
import type { DialogueLine } from '../story/types';

/** Một dòng SQL trên màn chiếu, chạm được. */
export interface PickableLine {
  /** Số thứ tự dòng, bắt đầu từ 1, duy nhất trong một LinePick. */
  index: number;
  sql: string;
  correct: boolean;
  /** Phản hồi khi chạm dòng này (nhiều người nói nối tiếp); dòng đúng có thể rỗng. */
  feedback: DialogueLine[];
}

export interface LinePick {
  /** `q-quan-lines`. Duy nhất trong toàn bộ nội dung. */
  id: string;
  lines: PickableLine[];
}

export type ProjectorSource =
  /** SQL viết cứng trong kịch bản (truy vấn của Quân ở deb-01). */
  | { kind: 'sql'; sql: string }
  /** SQL lấy từ vật chứng đã lưu (truy vấn người chơi đã sửa, deb-03). */
  | { kind: 'evidence'; evidenceId: QueryEvidenceId };

export interface ProjectorSpec {
  /** `proj-quan-or`, `proj-fixed`, … Duy nhất trong toàn bộ nội dung. */
  id: string;
  source: ProjectorSource;
  /** `true`: chạy thật trên dataset chính và hiện bảng + số dòng; `false`: chỉ hiện SQL. */
  run: boolean;
  /** Số dòng kịch bản kỳ vọng (24 cho truy vấn OR, 2 cho truy vấn đã sửa) — để test bất biến. */
  expectedRowCount?: number;
  /** Chú thích dưới màn chiếu (ví dụ "Truy vấn Quân đã tự chạy"). */
  caption?: string;
}
