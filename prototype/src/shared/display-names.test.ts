import { describe, expect, it } from 'vitest';
import {
  characterName,
  effectName,
  expressionName,
  partIndex,
  partName,
  sceneName,
  speakerLabel,
} from './display-names';
import { CHARACTER_EXPRESSIONS, CHARACTER_IDS, EFFECT_IDS, PART_IDS, SCENE_IDS } from './ids';

const RAW_ID = /^[a-z0-9]+(-[a-z0-9]+)+$/;

describe('display-names: không lộ định danh thô', () => {
  it('mọi nhân vật QĐ-033 có tên hiển thị khác id', () => {
    for (const id of CHARACTER_IDS) {
      const name = characterName(id);
      expect(name).not.toBe(id);
      expect(name).not.toMatch(RAW_ID);
      expect(name.length).toBeGreaterThan(0);
    }
  });

  it('player → "Bạn", narrator → không nhãn', () => {
    expect(speakerLabel('player')).toBe('Bạn');
    expect(speakerLabel('narrator')).toBe('');
    expect(speakerLabel('minh-anh')).toBe('Minh Anh');
  });

  it('người nói lạ → nhãn dự phòng, không phải id', () => {
    expect(speakerLabel('thay-quang')).toBe('Nhân vật');
    expect(characterName('')).toBe('Nhân vật');
    expect(characterName('__proto__')).toBe('Nhân vật');
    expect(characterName('constructor')).toBe('Nhân vật');
  });

  it('mọi biểu cảm QĐ-033 có tên tiếng Việt; biểu cảm lạ/thiếu → dự phòng', () => {
    for (const exprs of Object.values(CHARACTER_EXPRESSIONS)) {
      for (const e of exprs) {
        expect(expressionName(e)).not.toBe(e);
        expect(expressionName(e).length).toBeGreaterThan(0);
      }
    }
    expect(expressionName('angry')).toBe('bình thường');
    expect(expressionName(undefined)).toBe('bình thường');
  });

  it('phần, cảnh, hiệu ứng có tên; id lạ → dự phòng', () => {
    for (const p of PART_IDS) expect(partName(p)).not.toMatch(RAW_ID);
    for (const s of SCENE_IDS) expect(sceneName(s)).not.toMatch(RAW_ID);
    for (const e of EFFECT_IDS) expect(effectName(e)).not.toMatch(RAW_ID);
    expect(partName('epilogue')).toBe('Phần');
    expect(sceneName('library')).toBe('Cảnh');
    expect(effectName('boom')).toBe('Hiệu ứng');
    expect(partIndex('analysis')).toBe(3);
    expect(partIndex('epilogue')).toBe(0);
  });
});
