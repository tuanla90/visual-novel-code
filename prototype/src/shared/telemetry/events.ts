/**
 * Sự kiện telemetry (§9.3, QĐ-029). Chỉ lưu cục bộ, ẩn danh, không có trường tự do
 * chứa dữ liệu cá nhân (không tên, không SQL ngoài phạm vi thử thách).
 *
 * Gói `telemetry` (gói 8) thay phần lưu trữ (localStorage + xuất JSON) nhưng GIỮ union này;
 * muốn thêm sự kiện thì thêm vào đây và báo người giao.
 */
import type {
  ChallengeId,
  DiagnosticCode,
  EffectId,
  EvidenceId,
  PartId,
  SceneId,
} from '../ids';
import type { BuilderMode, Connector, GradeStatus } from '../../sql-challenge/types';

// ---------- Khảo sát (QĐ-031) — chỉ lựa chọn đóng, không chữ tự do ----------

export type ExcelLevel = 'none' | 'basic' | 'confident';
export type SqlBefore = 'no' | 'some' | 'yes';

export interface PreSurveyAnswers {
  excelLevel: ExcelLevel;
  sqlBefore: SqlBefore;
}

export const MEMORABLE_PARTS = [
  'clues',
  'build-query',
  'rebut-quan',
  'independent-source',
  'story-characters',
] as const;
export type MemorablePart = (typeof MEMORABLE_PARTS)[number];

export type PlayNext = 'yes' | 'maybe' | 'no';

export interface PostSurveyAnswers {
  /** Tối đa 2 phần đáng nhớ nhất. */
  memorable: MemorablePart[];
  /** Đoạn gây khó chịu (tùy chọn) — chọn từ cùng danh sách, không chữ tự do. */
  annoying: MemorablePart | null;
  playNext: PlayNext;
}

export type SurveyStage = 'pre' | 'post';

// ---------- Sự kiện ----------

/** Loại lỗi gộp cho §9.3 "loại lỗi cú pháp hoặc logic". */
export type RunErrorClass = 'syntax' | 'logic' | null;

export type TelemetryEventBody =
  | { type: 'game_start' }
  | { type: 'part_start'; part: PartId }
  | { type: 'part_complete'; part: PartId; durationMs: number }
  | { type: 'scene_enter'; scene: SceneId; sequenceId: string }
  | { type: 'hotspot_inspected'; hotspotId: string }
  | { type: 'evidence_unlocked'; evidenceId: EvidenceId }
  | { type: 'notebook_opened'; part: PartId | null }
  | { type: 'challenge_start'; challengeId: ChallengeId }
  | {
      type: 'query_run';
      challengeId: ChallengeId;
      mode: BuilderMode;
      /** Lần chạy thứ mấy trong thử thách này (1-based). */
      attempt: number;
      rowCount: number | null;
      status: GradeStatus;
      primaryCode: DiagnosticCode | null;
      errorClass: RunErrorClass;
      connector: Connector | null;
      /** Mili-giây kể từ khi mở thử thách. */
      msSinceStart: number;
    }
  | { type: 'first_run'; challengeId: ChallengeId; msSinceStart: number }
  | { type: 'hint_used'; challengeId: ChallengeId; level: 1 | 2 | 3; count: number }
  | {
      type: 'challenge_complete';
      challengeId: ChallengeId;
      durationMs: number;
      runs: number;
      hintsUsed: number;
    }
  | {
      type: 'question_answered';
      questionId: string;
      choiceId: string;
      attempt: number;
      correct: boolean;
      /** Lựa chọn đầu tiên của câu hỏi này (QĐ-035, §9.3 "dữ liệu đã đủ kết luận chưa?"). */
      isFirstChoice: boolean;
    }
  | {
      type: 'line_picked';
      pickId: string;
      lineIndex: number;
      attempt: number;
      correct: boolean;
      isFirstChoice: boolean;
    }
  | { type: 'effect_shown'; effectId: EffectId }
  | { type: 'game_complete'; durationMs: number }
  | { type: 'survey_submitted'; stage: 'pre'; answers: PreSurveyAnswers }
  | { type: 'survey_submitted'; stage: 'post'; answers: PostSurveyAnswers }
  | { type: 'survey_skipped'; stage: SurveyStage }
  | { type: 'game_reset' };

export type TelemetryEventType = TelemetryEventBody['type'];

/** Sự kiện đã ghi: thêm mốc thời gian và mã phiên ẩn danh. */
export type TelemetryEvent = TelemetryEventBody & {
  at: number;
  sessionId: string;
};
