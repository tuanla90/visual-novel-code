import { describe, expect, it } from 'vitest';
import { artUrlOfFile } from './art-slots';
import { mouthHoldMs, TALK_RIG_SOURCES, talkRigFor } from './talk-rigs';

describe('bộ nhép môi', () => {
  it('mọi tệp nguồn của bộ nhép môi đều có thật trong src/assets', () => {
    for (const file of TALK_RIG_SOURCES) expect(artUrlOfFile(file), file).toBeDefined();
  });

  it('chỉ bật khi ảnh đang hiện đúng là tệp nguồn của bộ đó', () => {
    const anchor = artUrlOfFile('/src/assets/characters/char-minh-anh-anchor.webp');
    const worried = artUrlOfFile('/src/assets/characters/char-minh-anh-worried.webp');
    expect(talkRigFor('minh-anh', anchor)?.sourceFile).toBe('/src/assets/characters/char-minh-anh-anchor.webp');
    expect(talkRigFor('minh-anh', worried)?.sourceFile).toBe('/src/assets/characters/char-minh-anh-worried.webp');
    expect(talkRigFor('minh-anh', '/khac.png')).toBeUndefined();
    expect(talkRigFor('minh-anh', undefined)).toBeUndefined();
    expect(talkRigFor('quan', anchor)).toBeUndefined();
  });

  it('thời gian giữ khung miệng nằm trong 70–220 ms', () => {
    for (const r of [0, 0.3, 0.6, 0.9, 0.95, 0.999]) {
      const ms = mouthHoldMs(r);
      expect(ms).toBeGreaterThanOrEqual(70);
      expect(ms).toBeLessThanOrEqual(220);
    }
  });
});
