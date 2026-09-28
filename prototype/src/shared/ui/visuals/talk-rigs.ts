/**
 * Bộ "nhép môi + chớp mắt" cho chân dung ảnh thật: mỗi ảnh chân dung (một biểu cảm) có một miếng
 * MIỆNG KHÁC và một miếng MẮT NHẮM đặt chồng lên đúng chỗ, thân và tóc đứng yên. Tọa độ miếng tính
 * bằng điểm ảnh của chính tệp ảnh đó; tệp đổi (URL khác) → không khớp bộ nào → tự tắt (`talkRigFor`).
 *
 * Nguồn (Topview 28/09, GPT Image 2.5, image-edit từ chính ảnh chân dung): ảnh biểu cảm sửa từ ảnh
 * neo rồi căn về đúng khung ảnh neo (đổi biểu cảm thân người không xê dịch); ảnh "miệng mở"/"mắt
 * nhắm" sửa từ ảnh biểu cảm, căn khớp + khớp màu, miếng = vùng khác biệt làm mềm mép.
 * Hà Vy "đang nghĩ" (sinh lại mặt 28/09, ghép vào ảnh neo) chưa có bộ miếng → không nhép môi.
 * Quân sững sờ: ảnh gốc miệng đang há, miếng miệng là miệng KHÉP (nhép vẫn là đổi qua lại).
 * Tệp được sinh bằng công cụ cắt miếng — sửa tay thì giữ đúng tọa độ.
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
    width: 1536,
    height: 2736,
    mouth: { src: minhAnhNeutralMouth, x: 666, y: 690, w: 290, h: 244 },
    eyes: { src: minhAnhNeutralEyes, x: 559, y: 462, w: 533, h: 266 },
  },
  {
    sourceFile: '/src/assets/characters/char-minh-anh-worried.png',
    width: 768,
    height: 1368,
    mouth: { src: minhAnhWorriedMouth, x: 336, y: 345, w: 142, h: 112 },
    eyes: { src: minhAnhWorriedEyes, x: 272, y: 230, w: 270, h: 148 },
  },
  {
    sourceFile: '/src/assets/characters/char-minh-anh-happy.png',
    width: 768,
    height: 1368,
    mouth: { src: minhAnhHappyMouth, x: 328, y: 331, w: 156, h: 126 },
    eyes: { src: minhAnhHappyEyes, x: 278, y: 238, w: 265, h: 140 },
  },
  {
    sourceFile: '/src/assets/characters/char-ha-vy-anchor.png',
    width: 768,
    height: 1360,
    mouth: { src: haVyNeutralMouth, x: 342, y: 367, w: 133, h: 103 },
    eyes: { src: haVyNeutralEyes, x: 296, y: 271, w: 239, h: 119 },
  },
  {
    sourceFile: '/src/assets/characters/char-ha-vy-smile.png',
    width: 768,
    height: 1360,
    mouth: { src: haVySmileMouth, x: 331, y: 358, w: 140, h: 113 },
    eyes: { src: haVySmileEyes, x: 295, y: 268, w: 239, h: 124 },
  },
  {
    sourceFile: '/src/assets/characters/char-quan-anchor.png',
    width: 768,
    height: 1360,
    mouth: { src: quanNeutralMouth, x: 348, y: 319, w: 135, h: 110 },
    eyes: { src: quanNeutralEyes, x: 295, y: 223, w: 242, h: 103 },
  },
  {
    sourceFile: '/src/assets/characters/char-quan-smug.png',
    width: 768,
    height: 1360,
    mouth: { src: quanSmugMouth, x: 328, y: 308, w: 159, h: 112 },
    eyes: { src: quanSmugEyes, x: 298, y: 222, w: 235, h: 102 },
  },
  {
    sourceFile: '/src/assets/characters/char-quan-stunned.png',
    width: 768,
    height: 1360,
    mouth: { src: quanStunnedMouth, x: 351, y: 315, w: 128, h: 104 },
    eyes: { src: quanStunnedEyes, x: 294, y: 207, w: 241, h: 108 },
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
