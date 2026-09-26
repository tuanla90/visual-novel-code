/**
 * Định danh dùng chung theo QĐ-033 (lich-su-quyet-dinh.md).
 *
 * ĐÂY LÀ NƠI DUY NHẤT khai báo các định danh này. Mọi kiểu khác (story, evidence,
 * sql-challenge, debrief, telemetry, store) tham chiếu từ đây; không chép chuỗi rời rạc.
 * Muốn thêm định danh mới → thêm vào đây và báo người giao (tệp "đóng băng", xem
 * docs/ARCHITECTURE.md).
 */

// ---------- Phần (part) ----------
export const PART_IDS = ['intro', 'investigation', 'analysis', 'debrief', 'ending'] as const;
export type PartId = (typeof PART_IDS)[number];

// ---------- Cảnh ----------
export const SCENE_IDS = ['clb-room', 'corridor-b', 'debrief-room'] as const;
export type SceneId = (typeof SCENE_IDS)[number];

// ---------- Nhân vật và biểu cảm ----------
export const CHARACTER_EXPRESSIONS = {
  'minh-anh': ['neutral', 'worried', 'happy'],
  'ha-vy': ['neutral', 'thinking', 'smile'],
  quan: ['neutral', 'smug', 'stunned'],
  hoai: ['nervous', 'downcast', 'relieved'],
  'bac-tu': ['neutral'],
} as const satisfies Record<string, readonly string[]>;

export type CharacterId = keyof typeof CHARACTER_EXPRESSIONS;
export const CHARACTER_IDS = Object.keys(CHARACTER_EXPRESSIONS) as CharacterId[];

/** Biểu cảm hợp lệ của một nhân vật cụ thể. */
export type ExpressionOf<C extends CharacterId> = (typeof CHARACTER_EXPRESSIONS)[C][number];
/** Mọi biểu cảm có trong game (dùng khi không biết nhân vật lúc biên dịch). */
export type ExpressionId = ExpressionOf<CharacterId>;

/** Người nói đặc biệt: `player` (nhãn "Bạn"), `narrator` (không nhãn), không có biểu cảm. */
export const SPECIAL_SPEAKER_IDS = ['player', 'narrator'] as const;
export type SpecialSpeakerId = (typeof SPECIAL_SPEAKER_IDS)[number];

export type SpeakerId = CharacterId | SpecialSpeakerId;

export function isCharacterId(value: string): value is CharacterId {
  return Object.prototype.hasOwnProperty.call(CHARACTER_EXPRESSIONS, value);
}

export function isSpecialSpeakerId(value: string): value is SpecialSpeakerId {
  return (SPECIAL_SPEAKER_IDS as readonly string[]).includes(value);
}

export function isSpeakerId(value: string): value is SpeakerId {
  return isCharacterId(value) || isSpecialSpeakerId(value);
}

export function isExpressionOf(character: CharacterId, expression: string): boolean {
  return (CHARACTER_EXPRESSIONS[character] as readonly string[]).includes(expression);
}

// ---------- Manh mối ----------
export const CLUE_IDS = ['clue-signature-h', 'clue-box-building-b', 'clue-bookmark-baochi'] as const;
export type ClueId = (typeof CLUE_IDS)[number];

// ---------- Vật chứng tài liệu ----------
export const DOCUMENT_IDS = ['doc-letter', 'doc-bookmark', 'doc-handover-log'] as const;
export type DocumentId = (typeof DOCUMENT_IDS)[number];

// ---------- Vật chứng từ truy vấn ----------
export const QUERY_EVIDENCE_IDS = [
  'ev-c1-names-h',
  'ev-c2-classes-b',
  'ev-c3-shortlist',
  'ev-quan-fixed',
] as const;
export type QueryEvidenceId = (typeof QUERY_EVIDENCE_IDS)[number];

/** Mọi mục có thể nằm trong Hồ sơ (dùng cho điều kiện qua cảnh, telemetry). */
export type EvidenceId = ClueId | DocumentId | QueryEvidenceId;

export function isClueId(value: string): value is ClueId {
  return (CLUE_IDS as readonly string[]).includes(value);
}
export function isDocumentId(value: string): value is DocumentId {
  return (DOCUMENT_IDS as readonly string[]).includes(value);
}
export function isQueryEvidenceId(value: string): value is QueryEvidenceId {
  return (QUERY_EVIDENCE_IDS as readonly string[]).includes(value);
}
export function isEvidenceId(value: string): value is EvidenceId {
  return isClueId(value) || isDocumentId(value) || isQueryEvidenceId(value);
}

// ---------- Thử thách ----------
export const CHALLENGE_IDS = ['c1', 'c2', 'c3', 'debrief-fix'] as const;
export type ChallengeId = (typeof CHALLENGE_IDS)[number];

export function isChallengeId(value: string): value is ChallengeId {
  return (CHALLENGE_IDS as readonly string[]).includes(value);
}

// ---------- Hiệu ứng ----------
export const EFFECT_IDS = ['co-so-lieu-day'] as const;
export type EffectId = (typeof EFFECT_IDS)[number];

export function isEffectId(value: string): value is EffectId {
  return (EFFECT_IDS as readonly string[]).includes(value);
}

// ---------- Cờ trạng thái do kịch bản đặt ----------
/** `access-revoked`: đặt ở end-03 — hết quyền xem dữ liệu, khóa trình dựng, làm mờ thẻ. */
export const FLAG_IDS = ['access-revoked'] as const;
export type FlagId = (typeof FLAG_IDS)[number];

// ---------- Câu gợi ý chuẩn (§5.2) ----------
export const STANDARD_HINT_IDS = [
  'hint-any-or-all',
  'hint-right-columns',
  'hint-ask-or-conclude',
] as const;
export type StandardHintId = (typeof STANDARD_HINT_IDS)[number];

// ---------- Mã chẩn đoán (QĐ-040) ----------
/**
 * Nhóm "không chạy được": ưu tiên cao nhất khi nhiều mã cùng khớp.
 * `no-columns` (hàng SELECT chưa chọn cột) và `no-value` (điều kiện chưa có giá trị) do gói
 * sql-engine thêm cho trạng thái "chưa chạy được" của trình dựng (brief gói 3, mục 6); gói
 * noi-dung viết lời Hà Vy cho hai mã này.
 */
export const BLOCKING_DIAGNOSTIC_CODES = [
  'not-select',
  'syntax-error',
  'no-table',
  'no-columns',
  'no-value',
  'connector-unset',
] as const;

export const DIAGNOSTIC_CODES = [
  ...BLOCKING_DIAGNOSTIC_CODES,
  'wrong-table',
  'no-filter',
  'missing-columns',
  'extra-columns',
  'wrong-column-ho-dem',
  'like-ends-with',
  'like-contains',
  'class-prefix',
  'wrong-value',
  'hardcoded-ids',
  'limit-used',
  'or-connector',
  'missing-condition',
  'other',
] as const;
export type DiagnosticCode = (typeof DIAGNOSTIC_CODES)[number];

export function isDiagnosticCode(value: string): value is DiagnosticCode {
  return (DIAGNOSTIC_CODES as readonly string[]).includes(value);
}
