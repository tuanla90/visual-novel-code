/**
 * Dàn nhân vật trên sân khấu (chỉ là trình bày — không đổi props của Stage): Stage nhớ các nhân vật
 * ĐÃ NÓI trong cảnh hiện tại để họ đứng lại khi người khác nói (người đang nói nổi bật, người khác
 * lùi nhẹ). Đổi cảnh → dàn trống lại. Vị trí đứng cố định theo nhân vật và cảnh để không nhảy chỗ.
 */
import { CHARACTER_EXPRESSIONS, isCharacterId, type CharacterId, type SceneId } from '../../ids';

export interface CastMember {
  character: CharacterId;
  expression: string;
}

export interface CastState {
  scene: SceneId;
  members: readonly CastMember[];
}

/**
 * Tâm chân dung theo phần chiều ngang sân khấu (0–1). Phòng CLB/hành lang: CLB ở hai bên, chừa
 * vật kể chuyện (bảng nguyên tắc; hộp góp ý ở cột giữa-phải). Phòng giải trình: CLB bên trái,
 * Quân + nhân chứng bên phải (bộ prompt: hai vùng đứng đối diện trái/phải, màn chiếu ở giữa).
 */
const POSITIONS: Record<SceneId, Record<CharacterId, number>> = {
  'clb-room': { 'minh-anh': 0.24, 'ha-vy': 0.76, quan: 0.6, hoai: 0.5, 'bac-tu': 0.88, tung: 0.5 },
  'corridor-b': { 'minh-anh': 0.2, 'ha-vy': 0.44, quan: 0.6, hoai: 0.5, 'bac-tu': 0.9, tung: 0.65 },
  'debrief-room': { 'minh-anh': 0.28, 'ha-vy': 0.11, quan: 0.87, hoai: 0.68, 'bac-tu': 0.5, tung: 0.5 },
};

export function castPosition(scene: SceneId, character: CharacterId): number {
  return POSITIONS[scene][character];
}

/** Trạng thái dàn mới sau một lượt hiển thị; trả lại CHÍNH `prev` nếu không có gì đổi. */
export function nextCast(prev: CastState | null, scene: SceneId, speaker: string | undefined, expression: string | undefined): CastState {
  let state: CastState = prev && prev.scene === scene ? prev : { scene, members: [] };
  if (speaker !== undefined && isCharacterId(speaker)) {
    const existing = state.members.find((m) => m.character === speaker);
    // Lời không ghi biểu cảm: giữ biểu cảm đang có, nhân vật mới vào thì dùng biểu cảm đầu.
    const mood = expression ?? existing?.expression ?? CHARACTER_EXPRESSIONS[speaker][0];
    if (!existing) {
      state = { scene, members: [...state.members, { character: speaker, expression: mood }] };
    } else if (existing.expression !== mood) {
      state = { scene, members: state.members.map((m) => (m.character === speaker ? { ...m, expression: mood } : m)) };
    }
  }
  return state;
}
