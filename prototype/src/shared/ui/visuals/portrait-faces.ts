/**
 * Thiết kế chân dung vẽ tạm (GDD §15.1, QĐ-026, QĐ-033): mỗi nhân vật một màu chủ đạo; mỗi biểu
 * cảm là một tổ hợp mày/mắt/miệng/dấu phụ KHÁC NHAU (test kiểm) để phân biệt được ở khoảng cách
 * laptop. Tách khỏi component để test đọc được.
 */
import type { CharacterId, ExpressionOf } from '../../ids';

export type Brows = 'flat' | 'worried' | 'raised' | 'one-up' | 'soft' | 'stern';
export type Eyes = 'open' | 'wide' | 'happy' | 'soft' | 'down' | 'relieved' | 'side' | 'half';
export type Mouth = 'flat' | 'smile' | 'grin' | 'frown' | 'wavy' | 'o' | 'smirk' | 'small-smile';
export type Extra = 'sweat' | 'blush' | 'shock' | 'gloom' | 'hand-chin' | 'puff' | 'sparkle';

export interface Face {
  brows: Brows;
  eyes: Eyes;
  mouth: Mouth;
  extras?: readonly Extra[];
  /** Cúi đầu: độ nghiêng (độ) và độ hạ (đơn vị viewBox). */
  tilt?: number;
  drop?: number;
}

export interface CharacterLook {
  /** Màu chủ đạo (áo) + sắc tối của nó. */
  main: string;
  mainShade: string;
  /** Áo lót/cổ áo. */
  inner: string;
  hair: string;
  hairShade: string;
  iris: string;
  skin: string;
  skinShade: string;
  hairStyle: 'side-ponytail' | 'long-bangs' | 'short-neat' | 'short-messy' | 'gray-cap';
  glasses?: boolean;
  /** Dây balo (nhân chứng). */
  straps?: string;
  mustache?: boolean;
}

export const CHARACTER_LOOKS: Record<CharacterId, CharacterLook> = {
  'minh-anh': {
    main: '#c8102e',
    mainShade: '#96101f',
    inner: '#fbf7f2',
    hair: '#3a2420',
    hairShade: '#2a1916',
    iris: '#5a2b1e',
    skin: '#f6d8c2',
    skinShade: '#e9b99c',
    hairStyle: 'side-ponytail',
  },
  'ha-vy': {
    main: '#0f766e',
    mainShade: '#0b5751',
    inner: '#e6f4f1',
    hair: '#1d1a1f',
    hairShade: '#0f0d11',
    iris: '#2c2a33',
    skin: '#f4d6c0',
    skinShade: '#e5b597',
    hairStyle: 'long-bangs',
    glasses: true,
  },
  quan: {
    main: '#334155',
    mainShade: '#1e293b',
    inner: '#cbd5e1',
    hair: '#1b1b1f',
    hairShade: '#0c0c0f',
    iris: '#24262d',
    skin: '#f0cfb4',
    skinShade: '#deae8c',
    hairStyle: 'short-neat',
  },
  hoai: {
    main: '#6d5aa8',
    mainShade: '#4f3f86',
    inner: '#ece8f6',
    hair: '#2e2522',
    hairShade: '#1e1715',
    iris: '#3a2c26',
    skin: '#f3d3b9',
    skinShade: '#e2b192',
    hairStyle: 'short-messy',
    straps: '#3f4652',
  },
  'bac-tu': {
    main: '#8a5a2b',
    mainShade: '#6a431d',
    inner: '#efe6d6',
    hair: '#a7a9ad',
    hairShade: '#8b8d92',
    iris: '#3b2f28',
    skin: '#e9c3a2',
    skinShade: '#d4a37f',
    hairStyle: 'gray-cap',
    mustache: true,
  },
  tung: {
    main: '#c2410c',
    mainShade: '#9a3412',
    inner: '#ffedd5',
    hair: '#292524',
    hairShade: '#1c1917',
    iris: '#44403c',
    skin: '#fed7aa',
    skinShade: '#fdba74',
    hairStyle: 'short-messy',
  },
};

type FaceTable = { [C in CharacterId]: Record<ExpressionOf<C>, Face> };

export const FACES: FaceTable = {
  'minh-anh': {
    neutral: { brows: 'flat', eyes: 'open', mouth: 'small-smile' },
    worried: { brows: 'worried', eyes: 'open', mouth: 'wavy', extras: ['sweat'] },
    happy: { brows: 'raised', eyes: 'happy', mouth: 'grin', extras: ['blush', 'sparkle'] },
    serious: { brows: 'stern', eyes: 'half', mouth: 'flat' },
  },
  'ha-vy': {
    neutral: { brows: 'flat', eyes: 'open', mouth: 'flat' },
    thinking: { brows: 'one-up', eyes: 'side', mouth: 'smirk', extras: ['hand-chin'] },
    smile: { brows: 'soft', eyes: 'soft', mouth: 'smile', extras: ['blush'] },
  },
  quan: {
    neutral: { brows: 'stern', eyes: 'open', mouth: 'flat' },
    smug: { brows: 'one-up', eyes: 'half', mouth: 'smirk' },
    stunned: { brows: 'raised', eyes: 'wide', mouth: 'o', extras: ['sweat', 'shock'] },
  },
  hoai: {
    nervous: { brows: 'worried', eyes: 'side', mouth: 'wavy', extras: ['sweat'] },
    downcast: { brows: 'worried', eyes: 'down', mouth: 'frown', extras: ['gloom'], tilt: -7, drop: 14 },
    relieved: { brows: 'soft', eyes: 'relieved', mouth: 'small-smile', extras: ['blush', 'puff'] },
  },
  'bac-tu': {
    neutral: { brows: 'soft', eyes: 'soft', mouth: 'smile' },
    smile: { brows: 'soft', eyes: 'happy', mouth: 'grin', extras: ['blush'] },
  },
  tung: {
    neutral: { brows: 'raised', eyes: 'happy', mouth: 'grin' },
    happy: { brows: 'raised', eyes: 'happy', mouth: 'grin', extras: ['sparkle'] },
    worried: { brows: 'worried', eyes: 'open', mouth: 'wavy', extras: ['sweat'] },
    surprised: { brows: 'raised', eyes: 'wide', mouth: 'o' },
    thinking: { brows: 'one-up', eyes: 'side', mouth: 'flat', extras: ['hand-chin'] },
  },
};

/** Mặt của một nhân vật ở một biểu cảm; biểu cảm lạ → biểu cảm đầu tiên của nhân vật. */
export function faceOf(character: CharacterId, expression: string): Face {
  const table = FACES[character] as Record<string, Face>;
  const found = table[expression];
  if (found) return found;
  const first = Object.values(table)[0];
  if (!first) throw new Error('Nhân vật không có biểu cảm nào');
  return first;
}
