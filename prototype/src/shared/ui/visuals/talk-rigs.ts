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
 *
 * 02/10/2026: mọi miếng cắt khít lại (art/nguon/nhep-khit-2026-10-02/) — chỉ còn môi và mí mắt, không kéo theo cằm, cổ áo,
 * viền má, tóc hay gọng kính.
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
import tungHappyMouth from './talk/tung-happy/mouth.webp';
import tungHappyEyes from './talk/tung-happy/eyes.webp';
import tungWorriedMouth from './talk/tung-worried/mouth.webp';
import tungWorriedEyes from './talk/tung-worried/eyes.webp';

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
    mouth: { src: minhAnhNeutralMouth, x: 374, y: 444, w: 73, h: 46 },
    eyes: { src: minhAnhNeutralEyes, x: 320, y: 348, w: 187, h: 58 },
  },
  {
    sourceFile: '/src/assets/characters/char-minh-anh-worried.png',
    width: 768,
    height: 1360,
    mouth: { src: minhAnhWorriedMouth, x: 389, y: 448, w: 55, h: 31 },
    eyes: { src: minhAnhWorriedEyes, x: 328, y: 348, w: 182, h: 58 },
  },
  {
    sourceFile: '/src/assets/characters/char-minh-anh-happy.png',
    width: 768,
    height: 1360,
    mouth: { src: minhAnhHappyMouth, x: 366, y: 440, w: 79, h: 51 },
    eyes: { src: minhAnhHappyEyes, x: 326, y: 349, w: 181, h: 58 },
  },
  {
    sourceFile: '/src/assets/characters/char-ha-vy-anchor.png',
    width: 768,
    height: 1360,
    mouth: { src: haVyNeutralMouth, x: 384, y: 462, w: 51, h: 37 },
    eyes: { src: haVyNeutralEyes, x: 335, y: 364, w: 165, h: 61 },
  },
  {
    sourceFile: '/src/assets/characters/char-ha-vy-smile.png',
    width: 768,
    height: 1360,
    mouth: { src: haVySmileMouth, x: 378, y: 454, w: 60, h: 38 },
    eyes: { src: haVySmileEyes, x: 339, y: 362, w: 165, h: 56 },
  },
  {
    sourceFile: '/src/assets/characters/char-quan-anchor.png',
    width: 768,
    height: 1360,
    mouth: { src: quanNeutralMouth, x: 386, y: 360, w: 69, h: 34 },
    eyes: { src: quanNeutralEyes, x: 351, y: 260, w: 156, h: 49 },
  },
  {
    sourceFile: '/src/assets/characters/char-quan-smug.png',
    width: 768,
    height: 1360,
    mouth: { src: quanSmugMouth, x: 389, y: 321, w: 69, h: 35 },
    eyes: { src: quanSmugEyes, x: 354, y: 241, w: 146, h: 48 },
  },
  {
    sourceFile: '/src/assets/characters/char-quan-stunned.png',
    width: 768,
    height: 1360,
    mouth: { src: quanStunnedMouth, x: 391, y: 346, w: 60, h: 45 },
    eyes: { src: quanStunnedEyes, x: 349, y: 245, w: 156, h: 56 },
  },
  {
    sourceFile: '/src/assets/characters/char-tung-anchor.png',
    width: 768,
    height: 1360,
    mouth: { src: tungNeutralMouth, x: 368, y: 305, w: 83, h: 52 },
    eyes: { src: tungNeutralEyes, x: 337, y: 212, w: 177, h: 73 },
  },
  {
    sourceFile: '/src/assets/characters/char-ha-vy-thinking.png',
    width: 768,
    height: 1360,
    mouth: { src: haVyThinkingMouth, x: 390, y: 464, w: 45, h: 38 },
    eyes: { src: haVyThinkingEyes, x: 339, y: 377, w: 159, h: 51 },
  },
  {
    sourceFile: '/src/assets/characters/char-hoai-anchor.png',
    width: 768,
    height: 1360,
    mouth: { src: hoaiNervousMouth, x: 386, y: 474, w: 56, h: 41 },
    eyes: { src: hoaiNervousEyes, x: 335, y: 379, w: 176, h: 53 },
  },
  {
    sourceFile: '/src/assets/characters/char-hoai-downcast.png',
    width: 768,
    height: 1360,
    mouth: { src: hoaiDowncastMouth, x: 388, y: 477, w: 52, h: 29 },
    eyes: { src: hoaiDowncastEyes, x: 337, y: 389, w: 170, h: 54 },
  },
  {
    sourceFile: '/src/assets/characters/char-hoai-relieved.png',
    width: 768,
    height: 1360,
    mouth: { src: hoaiRelievedMouth, x: 378, y: 467, w: 67, h: 39 },
    eyes: { src: hoaiRelievedEyes, x: 331, y: 375, w: 176, h: 58 },
  },
  // Tùng (30/09, art/nguon/cat-mieng-nhep-moi.py): ảnh neo cười hé miệng → miếng là miệng KHÉP; vui cười to → miệng khép cười.
  {
    sourceFile: '/src/assets/characters/char-tung-anchor.png',
    width: 768,
    height: 1360,
    mouth: { src: tungNeutralMouth, x: 339, y: 292, w: 152, h: 86 },
    eyes: { src: tungNeutralEyes, x: 304, y: 203, w: 228, h: 109 },
  },
  {
    sourceFile: '/src/assets/mvp/nhan-vat/char-tung-happy.png',
    width: 768,
    height: 1360,
    mouth: { src: tungHappyMouth, x: 338, y: 286, w: 164, h: 98 },
    eyes: { src: tungHappyEyes, x: 283, y: 206, w: 246, h: 93 },
  },
  {
    sourceFile: '/src/assets/mvp/nhan-vat/char-tung-worried.png',
    width: 768,
    height: 1360,
    mouth: { src: tungWorriedMouth, x: 352, y: 293, w: 146, h: 84 },
    eyes: { src: tungWorriedEyes, x: 306, y: 197, w: 227, h: 109 },
  },
];

/** Bộ nhép môi của ảnh đang hiện (so URL tệp nguồn); ảnh khác / chưa có bộ → `undefined`. */
export function talkRigFor(character: CharacterId, shownUrl: string | undefined): TalkRig | undefined {
  if (!shownUrl) return undefined;
  // Ảnh chân dung nằm ở src/assets/characters/ hoặc src/assets/mvp/nhan-vat/ (biểu cảm làm cho bản MVP).
  const ten = `/char-${character}-`;
  return RIGS.find((rig) => rig.sourceFile.includes(ten) && artUrlOfFile(rig.sourceFile) === shownUrl);
}

/** Mọi tệp nguồn có bộ nhép môi (cho test). */
export const TALK_RIG_SOURCES: readonly string[] = RIGS.map((rig) => rig.sourceFile);

/** Thời gian giữ một khung miệng (ms): 70–150, thỉnh thoảng giữ lâu hơn như nhịp ngắt chữ. */
export function mouthHoldMs(rand: number): number {
  return rand > 0.9 ? 220 : 70 + Math.round(rand * 90);
}
