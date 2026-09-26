/**
 * Trạng thái tiến trình truyện, hành động, hiệu ứng và "khung nhìn" (view) mà runtime
 * trả cho giao diện. Logic thuần, không import React.
 */
import type { EvidenceId, FlagId, PartId } from '../../shared/ids';
import type { TelemetryEventBody } from '../../shared/telemetry/events';
import type {
  ChallengeNode,
  DialogueLine,
  EffectNode,
  ExploreNode,
  FixQueryNode,
  GateNode,
  Hotspot,
  LineNode,
  LinePickNode,
  ProjectorNode,
  QuestionNode,
  Sequence,
  SequenceId,
  ShowDocumentNode,
} from '../types';

export interface Cursor {
  sequenceId: SequenceId;
  nodeIndex: number;
}

/** Khung quay về khi chạy chuỗi con của một điểm xem xét. */
export interface ReturnFrame {
  /** Con trỏ tới node `explore` đang đứng. */
  cursor: Cursor;
  hotspotId: string;
}

/** Tiến trình một câu hỏi hoặc một lần chọn dòng (QĐ-035: ghi lựa chọn đầu tiên). */
export interface ChoiceProgress {
  attempts: number;
  firstChoiceId: string | null;
  /** Id lựa chọn đúng đã chọn; `null` khi chưa trả lời đúng. */
  resolvedChoiceId: string | null;
}

/** Đang hiện phản hồi của một lựa chọn (chạy nối tiếp từng lời). */
export interface FeedbackInteraction {
  kind: 'feedback';
  origin: 'question' | 'line-pick';
  sourceId: string;
  lines: DialogueLine[];
  index: number;
  /** Hết phản hồi thì đi tiếp (`advance`, chọn đúng) hay cho chọn lại (`retry`). */
  then: 'advance' | 'retry';
}

export interface StoryProgress {
  startedAt: number | null;
  cursor: Cursor;
  returnStack: ReturnFrame[];
  currentPart: PartId | null;
  partStartedAt: Partial<Record<PartId, number>>;
  partCompletedAt: Partial<Record<PartId, number>>;
  task: string | null;
  visitedHotspots: string[];
  choices: Record<string, ChoiceProgress>;
  flags: FlagId[];
  interaction: FeedbackInteraction | null;
  ended: boolean;
  endedAt: number | null;
}

export function createInitialProgress(startSequenceId: SequenceId): StoryProgress {
  return {
    startedAt: null,
    cursor: { sequenceId: startSequenceId, nodeIndex: 0 },
    returnStack: [],
    currentPart: null,
    partStartedAt: {},
    partCompletedAt: {},
    task: null,
    visitedHotspots: [],
    choices: {},
    flags: [],
    interaction: null,
    ended: false,
    endedAt: null,
  };
}

// ---------- Hành động ----------

export type StoryAction =
  /** Qua lời / qua một lời phản hồi / qua thẻ chữ. */
  | { type: 'advance' }
  | { type: 'choose'; choiceId: string }
  | { type: 'pick-line'; lineIndex: number }
  | { type: 'inspect'; hotspotId: string }
  /** Nút "Nhiệm vụ tiếp theo →" khi điều kiện qua cảnh đã thỏa. */
  | { type: 'proceed' }
  /** Đóng màn tương tác (tài liệu, thử thách, sửa truy vấn, hiệu ứng, màn chiếu). */
  | { type: 'complete' };

export type StoryActionType = StoryAction['type'];

// ---------- Hiệu ứng runtime trả ra cho store ----------

export type StoryEffect =
  | { type: 'unlock-evidence'; evidenceId: EvidenceId }
  | { type: 'annotate-evidence'; evidenceId: EvidenceId; note: string; redact: boolean }
  | { type: 'set-flag'; flag: FlagId }
  | { type: 'telemetry'; event: TelemetryEventBody };

/** Những gì runtime cần đọc từ bên ngoài (store cung cấp). */
export interface StoryContext {
  now: number;
  hasEvidence: (id: EvidenceId) => boolean;
}

export interface StepResult {
  progress: StoryProgress;
  effects: StoryEffect[];
  /** Có giá trị khi hành động không hợp lệ ở trạng thái hiện tại; progress giữ nguyên. */
  rejected?: string;
}

// ---------- Khung nhìn ----------

export interface GateStatus {
  satisfied: boolean;
  missing: EvidenceId[];
  to: SequenceId;
  buttonLabel: string;
}

export type HotspotView = Hotspot & { visited: boolean };

export type StoryViewBody =
  | { kind: 'line'; node: LineNode }
  | {
      kind: 'feedback';
      origin: 'question' | 'line-pick';
      sourceId: string;
      line: DialogueLine;
      index: number;
      total: number;
      then: 'advance' | 'retry';
    }
  | { kind: 'explore'; node: ExploreNode; hotspots: HotspotView[]; gate: GateStatus | null }
  | { kind: 'gate'; node: GateNode; gate: GateStatus }
  | { kind: 'question'; node: QuestionNode; progress: ChoiceProgress }
  | { kind: 'line-pick'; node: LinePickNode; progress: ChoiceProgress }
  | { kind: 'show-document'; node: ShowDocumentNode }
  | { kind: 'challenge'; node: ChallengeNode }
  | { kind: 'fix-query'; node: FixQueryNode }
  | { kind: 'effect'; node: EffectNode }
  | { kind: 'projector'; node: ProjectorNode }
  | { kind: 'end' }
  /** Nội dung không nhất quán lúc chạy (bộ kiểm toàn vẹn phải bắt trước). */
  | { kind: 'error'; message: string };

export type StoryView = StoryViewBody & {
  /** Chuỗi đang đứng (`null` khi không tìm thấy). */
  sequence: Sequence | null;
  task: string | null;
  part: PartId | null;
};

export type StoryViewKind = StoryView['kind'];

export const EMPTY_CHOICE_PROGRESS: ChoiceProgress = Object.freeze({
  attempts: 0,
  firstChoiceId: null,
  resolvedChoiceId: null,
});
