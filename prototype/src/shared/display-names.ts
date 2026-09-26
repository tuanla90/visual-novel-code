/**
 * Tra cứu tên hiển thị cho định danh. KHÔNG BAO GIỜ trả định danh thô ra màn hình:
 * thiếu dữ liệu thì trả về nhãn dự phòng tiếng Việt rõ ràng (có test).
 */
import {
  PART_IDS,
  type CharacterId,
  type EffectId,
  type ExpressionId,
  type PartId,
  type SceneId,
  type SpeakerId,
} from './ids';

const CHARACTER_NAMES: Record<CharacterId, string> = {
  'minh-anh': 'Minh Anh',
  'ha-vy': 'Hà Vy',
  quan: 'Quân',
  hoai: 'Hoài',
  'bac-tu': 'Bác Tư',
};

const SPEAKER_LABELS: Record<SpeakerId, string> = {
  ...CHARACTER_NAMES,
  player: 'Bạn',
  narrator: '',
};

const EXPRESSION_NAMES: Record<ExpressionId, string> = {
  neutral: 'bình thường',
  worried: 'lo lắng',
  happy: 'vui',
  thinking: 'đang nghĩ',
  smile: 'mỉm cười',
  smug: 'đắc ý',
  stunned: 'sững người',
  nervous: 'bối rối',
  downcast: 'cúi mặt',
  relieved: 'nhẹ nhõm',
};

const PART_NAMES: Record<PartId, string> = {
  intro: 'Mở đầu',
  investigation: 'Điều tra',
  analysis: 'Phân tích',
  debrief: 'Giải trình',
  ending: 'Kết',
};

const SCENE_NAMES: Record<SceneId, string> = {
  'clb-room': 'Phòng CLB',
  'corridor-b': 'Hành lang giảng đường B',
  'debrief-room': 'Phòng giải trình',
};

const EFFECT_NAMES: Record<EffectId, string> = {
  'co-so-lieu-day': 'Có số liệu đây!',
};

/** Nhãn dự phòng khi định danh không có tên hiển thị (không lộ id ra màn hình). */
export const FALLBACK_LABELS = {
  character: 'Nhân vật',
  expression: 'bình thường',
  part: 'Phần',
  scene: 'Cảnh',
  effect: 'Hiệu ứng',
} as const;

function lookup<K extends string>(table: Record<K, string>, key: string, fallback: string): string {
  if (Object.prototype.hasOwnProperty.call(table, key)) {
    const value = (table as Record<string, string>)[key];
    if (typeof value === 'string') return value;
  }
  return fallback;
}

/** Tên nhân vật; `player` → "Bạn"; `narrator` → "" (không nhãn); id lạ → "Nhân vật". */
export function speakerLabel(speaker: string): string {
  if (speaker === 'narrator') return '';
  return lookup(SPEAKER_LABELS, speaker, FALLBACK_LABELS.character);
}

export function characterName(character: string): string {
  return lookup(CHARACTER_NAMES, character, FALLBACK_LABELS.character);
}

export function expressionName(expression: string | undefined): string {
  if (expression === undefined) return FALLBACK_LABELS.expression;
  return lookup(EXPRESSION_NAMES, expression, FALLBACK_LABELS.expression);
}

export function partName(part: string): string {
  return lookup(PART_NAMES, part, FALLBACK_LABELS.part);
}

/** Số thứ tự phần (1..5) để hiện "Phần 3"; id lạ → 0. */
export function partIndex(part: string): number {
  const i = (PART_IDS as readonly string[]).indexOf(part);
  return i < 0 ? 0 : i + 1;
}

export function sceneName(scene: string): string {
  return lookup(SCENE_NAMES, scene, FALLBACK_LABELS.scene);
}

export function effectName(effect: string): string {
  return lookup(EFFECT_NAMES, effect, FALLBACK_LABELS.effect);
}
