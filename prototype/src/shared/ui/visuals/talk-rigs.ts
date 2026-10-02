/**
 * Bộ "nhép môi + chớp mắt" cho chân dung ảnh thật: mỗi ảnh chân dung (một biểu cảm) có một miếng
 * MIỆNG KHÁC và một miếng MẮT NHẮM đặt chồng lên đúng chỗ, thân và tóc đứng yên. Tọa độ miếng tính
 * bằng điểm ảnh của chính tệp ảnh đó; tệp đổi (URL khác) → không khớp bộ nào → tự tắt (`talkRigFor`).
 *
 * Nguồn (Topview 28/09, GPT Image 2.5, image-edit từ chính ảnh chân dung): ảnh biểu cảm sửa từ ảnh
 * neo rồi căn về đúng khung ảnh neo (đổi biểu cảm thân người không xê dịch); ảnh "miệng mở"/"mắt
 * nhắm" sửa từ ảnh biểu cảm, căn khớp + khớp màu, miếng = vùng khác biệt làm mềm mép.
 * Quân sững sờ: ảnh gốc miệng đang há, miếng miệng là miệng KHÉP (nhép vẫn là đổi qua lại).
 * Tệp được sinh bằng công cụ cắt miếng — sửa tay thì giữ đúng tọa độ.
 *
 * 01/10/2026: thêm Tùng neo và Hà Vy "đang nghĩ" — ảnh sửa Topview (GPT Image 2.5, image-edit "chỉ đổi miệng / chỉ nhắm mắt"),
 * miếng cắt bằng art/nguon/cat-mieng-mat.py (so chênh lệch làm mờ, vệt lớn nhất quanh mắt; miệng tìm trong cửa sổ dưới hộp mắt).
 * Tùng neo miệng gốc đã hé cười nên nhép môi chỉ hơi mở thêm. Ảnh biểu cảm/dáng riêng của MVP (Tùng vui, gãi đầu…, Quân chỉ
 * màn…) có bộ riêng ở src/mvp/ui/nhep-moi-mvp.ts.
 */
import type { CharacterId } from '../../ids';
import { artUrlOfFile } from './art-slots';
import minhAnhNeutralMouth from './talk/minh-anh-neutral/mouth.webp';
import minhAnhNeutralEyes from './talk/minh-anh-neutral/eyes.webp';
import minhAnhWorriedMouth from './talk/minh-anh-worried/mouth.webp';
import minhAnhWorriedEyes from './talk/minh-anh-worried/eyes.webp';
import minhAnhHappyMouth from './talk/minh-anh-happy/mouth.webp';
import minhAnhHappyEyes from './talk/minh-anh-happy/eyes.webp';
import haVyNeutralMouth from './talk/ha-vy-neutral/mouth.webp';
import haVyNeutralEyes from './talk/ha-vy-neutral/eyes.webp';
import haVySmileMouth from './talk/ha-vy-smile/mouth.webp';
import haVySmileEyes from './talk/ha-vy-smile/eyes.webp';
import quanNeutralMouth from './talk/quan-neutral/mouth.webp';
import quanNeutralEyes from './talk/quan-neutral/eyes.webp';
import quanSmugMouth from './talk/quan-smug/mouth.webp';
import quanSmugEyes from './talk/quan-smug/eyes.webp';
import quanStunnedMouth from './talk/quan-stunned/mouth.webp';
import quanStunnedEyes from './talk/quan-stunned/eyes.webp';
import hoaiNervousMouth from './talk/hoai-nervous/mouth.webp';
import hoaiNervousEyes from './talk/hoai-nervous/eyes.webp';
import hoaiDowncastMouth from './talk/hoai-downcast/mouth.webp';
import hoaiDowncastEyes from './talk/hoai-downcast/eyes.webp';
import hoaiRelievedMouth from './talk/hoai-relieved/mouth.webp';
import hoaiRelievedEyes from './talk/hoai-relieved/eyes.webp';
import tungNeutralMouth from './talk/tung-neutral/mouth.webp';
import tungNeutralEyes from './talk/tung-neutral/eyes.webp';
import haVyThinkingMouth from './talk/ha-vy-thinking/mouth.webp';
import haVyThinkingEyes from './talk/ha-vy-thinking/eyes.webp';

export interface TalkPatch {
  src: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface TalkRig {
  /** Tệp ảnh chân dung mà các miếng được căn theo. */
  sourceFile: string;
  width: number;
  height: number;
  /** Miệng khung "đang nói" (khung còn lại = ảnh gốc). */
  mouth: TalkPatch;
  /** Mắt nhắm (mở = ảnh gốc). */
  eyes: TalkPatch;
}

const RIGS: readonly TalkRig[] = [
  {
    sourceFile: '/src/assets/characters/char-minh-anh-anchor.png',
    width: 768,
    height: 1360,
    mouth: { src: minhAnhNeutralMouth, x: 336, y: 311, w: 170, h: 148 },
    eyes: { src: minhAnhNeutralEyes, x: 292, y: 128, w: 259, h: 193 },
  },
  {
    sourceFile: '/src/assets/characters/char-minh-anh-worried.png',
    width: 768,
    height: 1360,
    mouth: { src: minhAnhWorriedMouth, x: 228, y: 325, w: 240, h: 206 },
    eyes: { src: minhAnhWorriedEyes, x: 160, y: 128, w: 376, h: 193 },
  },
  {
    sourceFile: '/src/assets/characters/char-minh-anh-happy.png',
    width: 768,
    height: 1360,
    mouth: { src: minhAnhHappyMouth, x: 227, y: 325, w: 240, h: 207 },
    eyes: { src: minhAnhHappyEyes, x: 159, y: 128, w: 377, h: 193 },
  },
  {
    sourceFile: '/src/assets/characters/char-ha-vy-anchor.png',
    width: 768,
    height: 1360,
    mouth: { src: haVyNeutralMouth, x: 275, y: 360, w: 207, h: 178 },
    eyes: { src: haVyNeutralEyes, x: 218, y: 187, w: 321, h: 175 },
  },
  {
    sourceFile: '/src/assets/characters/char-ha-vy-smile.png',
    width: 768,
    height: 1360,
    mouth: { src: haVySmileMouth, x: 279, y: 360, w: 207, h: 178 },
    eyes: { src: haVySmileEyes, x: 222, y: 180, w: 321, h: 182 },
  },
  {
    sourceFile: '/src/assets/characters/char-quan-anchor.png',
    width: 768,
    height: 1360,
    mouth: { src: quanNeutralMouth, x: 284, y: 337, w: 197, h: 170 },
    eyes: { src: quanNeutralEyes, x: 231, y: 161, w: 304, h: 180 },
  },
  {
    sourceFile: '/src/assets/characters/char-quan-smug.png',
    width: 768,
    height: 1360,
    mouth: { src: quanSmugMouth, x: 285, y: 296, w: 205, h: 177 },
    eyes: { src: quanSmugEyes, x: 229, y: 151, w: 318, h: 148 },
  },
  {
    sourceFile: '/src/assets/characters/char-quan-stunned.png',
    width: 768,
    height: 1360,
    mouth: { src: quanStunnedMouth, x: 332, y: 330, w: 158, h: 145 },
    eyes: { src: quanStunnedEyes, x: 289, y: 151, w: 255, h: 189 },
  },
  {
    sourceFile: '/src/assets/characters/char-tung-anchor.png',
    width: 768,
    height: 1360,
    mouth: { src: tungNeutralMouth, x: 296, y: 331, w: 192, h: 166 },
    eyes: { src: tungNeutralEyes, x: 244, y: 146, w: 297, h: 190 },
  },
  {
    sourceFile: '/src/assets/characters/char-ha-vy-thinking.png',
    width: 768,
    height: 1360,
    mouth: { src: haVyThinkingMouth, x: 277, y: 362, w: 209, h: 180 },
    eyes: { src: haVyThinkingEyes, x: 220, y: 208, w: 324, h: 156 },
  },
  {
    sourceFile: '/src/assets/characters/char-hoai-anchor.png',
    width: 768,
    height: 1360,
    mouth: { src: hoaiNervousMouth, x: 347, y: 364, w: 135, h: 109 },
    eyes: { src: hoaiNervousEyes, x: 297, y: 269, w: 251, h: 111 },
  },
  {
    sourceFile: '/src/assets/characters/char-hoai-downcast.png',
    width: 768,
    height: 1360,
    mouth: { src: hoaiDowncastMouth, x: 352, y: 368, w: 127, h: 100 },
    eyes: { src: hoaiDowncastEyes, x: 302, y: 279, w: 241, h: 109 },
  },
  {
    sourceFile: '/src/assets/characters/char-hoai-relieved.png',
    width: 768,
    height: 1360,
    mouth: { src: hoaiRelievedMouth, x: 341, y: 354, w: 144, h: 112 },
    eyes: { src: hoaiRelievedEyes, x: 295, y: 263, w: 248, h: 121 },
  },
];

/** Bộ nhép môi của ảnh đang hiện (so URL tệp nguồn); ảnh khác / chưa có bộ → `undefined`. */
export function talkRigFor(character: CharacterId, shownUrl: string | undefined): TalkRig | undefined {
  if (!shownUrl) return undefined;
  const prefix = `/src/assets/characters/char-${character}-`;
  return RIGS.find((rig) => rig.sourceFile.startsWith(prefix) && artUrlOfFile(rig.sourceFile) === shownUrl);
}

/** Mọi tệp nguồn có bộ nhép môi (cho test). */
export const TALK_RIG_SOURCES: readonly string[] = RIGS.map((rig) => rig.sourceFile);

/** Thời gian giữ một khung miệng (ms): 70–150, thỉnh thoảng giữ lâu hơn như nhịp ngắt chữ. */
export function mouthHoldMs(rand: number): number {
  return rand > 0.9 ? 220 : 70 + Math.round(rand * 90);
}
