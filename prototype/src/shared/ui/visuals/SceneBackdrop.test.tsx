/**
 * Sân khấu dùng ảnh nền thật khi thư mục ô ảnh có tệp đúng tên, không thì SVG vẽ tạm (QĐ-060);
 * không lộ tên ô ra chữ/alt/aria.
 */
import { render } from '@testing-library/react';
import { existsSync, readdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { SCENE_IDS } from '../../ids';
import { Stage } from '../Stage';
import { BACKGROUND_SLOTS, parseArtFileName } from './art-slots';

const ART_DIR = join(dirname(fileURLToPath(import.meta.url)), '../../../assets/art');

function hasFileFor(slot: string): boolean {
  if (!existsSync(ART_DIR)) return false;
  return readdirSync(ART_DIR).some((f) => parseArtFileName(f)?.name === slot);
}

describe('SceneBackdrop trong Stage', () => {
  it.each(SCENE_IDS)('cảnh %s: nguồn nền khớp với tệp trong thư mục ô ảnh', (scene) => {
    const slot = BACKGROUND_SLOTS[scene];
    const { container } = render(<Stage scene={scene} />);
    const backdrop = container.querySelector(`[data-art-slot="${slot}"]`);
    expect(backdrop).not.toBeNull();
    const expected = hasFileFor(slot) ? 'image' : 'placeholder';
    expect(backdrop?.getAttribute('data-art-source')).toBe(expected);
    if (expected === 'image') {
      expect(backdrop?.querySelector('img')).not.toBeNull();
      expect(backdrop?.querySelector('svg')).toBeNull();
    } else {
      expect(backdrop?.querySelector('svg.scene-art')).not.toBeNull();
      expect(backdrop?.querySelector('img')).toBeNull();
    }
    expect(backdrop?.getAttribute('aria-hidden')).toBe('true');
    // Không định danh thô trong chữ hiển thị hay nhãn cho trình đọc màn hình.
    const section = container.querySelector('section.stage');
    expect(section?.textContent ?? '').not.toContain(slot);
    expect(section?.getAttribute('aria-label') ?? '').not.toMatch(/bg-|clb-room|corridor|debrief-room/);
  });

  it('SVG nền tạm không chứa chữ (prompt của user: không chữ, không logo)', () => {
    for (const scene of SCENE_IDS) {
      const { container, unmount } = render(<Stage scene={scene} />);
      const svg = container.querySelector('svg.scene-art');
      if (svg) {
        expect(svg.querySelector('text')).toBeNull();
        expect((svg.textContent ?? '').trim()).toBe('');
      }
      unmount();
    }
  });
});
