/**
 * Hệ ô ảnh (QĐ-060): danh sách ô đủ và khớp README; tệp trong thư mục ô ảnh đều đúng tên; nền/chân
 * dung/tài liệu chọn ảnh thật khi có, rơi về hình vẽ tạm khi không. In bảng ô ↔ nguồn để user kiểm.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { CHARACTER_EXPRESSIONS, CHARACTER_IDS, DOCUMENT_IDS, SCENE_IDS } from '../../ids';
import {
  ART_EXTENSIONS,
  ART_SLOTS,
  artDataAttributes,
  artUrl,
  buildArtIndex,
  foundArtFiles,
  parseArtFileName,
  resolveBackground,
  resolveDocument,
  resolvePortrait,
} from './art-slots';

const ART_DIR = join(dirname(fileURLToPath(import.meta.url)), '../../../assets/art');

function imageFilesOnDisk(): string[] {
  if (!existsSync(ART_DIR)) return [];
  return readdirSync(ART_DIR).filter((f) => parseArtFileName(f) !== null);
}

describe('ô ảnh: danh sách và README', () => {
  it('đủ ô: 3 nền + mọi biểu cảm của mọi nhân vật + 3 tài liệu, không trùng tên', () => {
    const expressions = CHARACTER_IDS.reduce((n, c) => n + CHARACTER_EXPRESSIONS[c].length, 0);
    expect(ART_SLOTS).toHaveLength(SCENE_IDS.length + expressions + DOCUMENT_IDS.length);
    expect(new Set(ART_SLOTS.map((s) => s.name)).size).toBe(ART_SLOTS.length);
    expect(ART_SLOTS.map((s) => s.name)).toEqual(
      expect.arrayContaining(['bg-prototype-club-room', 'bg-prototype-hallway', 'bg-prototype-hearing-room', 'minh-anh-neutral', 'ha-vy-thinking', 'quan-stunned', 'hoai-relieved', 'bac-tu-neutral', 'doc-letter', 'doc-bookmark', 'doc-handover-log']),
    );
  });

  it('README trong thư mục ô ảnh liệt kê đủ mọi tên ô và mọi đuôi được nhận', () => {
    const readme = readFileSync(join(ART_DIR, 'README.md'), 'utf8');
    for (const slot of ART_SLOTS) expect(readme, slot.name).toContain(`\`${slot.name}\``);
    for (const ext of ART_EXTENSIONS) expect(readme).toContain(`.${ext}`);
  });

  it('mọi tệp ảnh trong thư mục đều khớp một ô (bắt tệp đặt sai tên) và in bảng ô ↔ nguồn', () => {
    const names = new Set(ART_SLOTS.map((s) => s.name));
    const unknown = imageFilesOnDisk().filter((f) => !names.has(parseArtFileName(f)?.name ?? ''));
    const report = ART_SLOTS.map((s) => `${artUrl(s.name) ? 'ẢNH THẬT ' : 'vẽ tạm   '} ${s.name}`).join('\n');
    console.info(`Ô ảnh (src/assets/art):\n${report}`);
    expect(unknown, `Tệp không khớp ô nào (xem README): ${unknown.join(', ')}`).toEqual([]);
  });

  it('Vite nhận đúng các tệp đang có trên đĩa (glob không bỏ sót đuôi nào)', () => {
    const onDisk = imageFilesOnDisk().map((f) => f.toLowerCase()).sort();
    const found = foundArtFiles().map((p) => (p.split('/').pop() ?? '').toLowerCase()).sort();
    expect(found).toEqual(onDisk);
  });
});

describe('ô ảnh: chọn ảnh thật hoặc hình vẽ tạm', () => {
  const index = buildArtIndex({
    '/src/assets/art/bg-prototype-hallway.png': '/a/hall.png',
    '/src/assets/art/BG-PROTOTYPE-HALLWAY.JPG': '/a/hall.jpg',
    '/src/assets/art/minh-anh-neutral.webp': '/a/ma-neutral.webp',
    '/src/assets/art/doc-letter.jpg': '/a/letter.jpg',
    '/src/assets/art/ghi-chu.txt': '/a/x.txt',
  });

  it('tên không phân biệt hoa/thường; cùng tên nhiều đuôi → ưu tiên webp > png > jpg; bỏ đuôi lạ', () => {
    expect(artUrl('bg-prototype-hallway', index)).toBe('/a/hall.png');
    expect(artUrl('ghi-chu', index)).toBeUndefined();
  });

  it('nền: có tệp → ảnh; không → vẽ tạm; data-art-* phản ánh đúng', () => {
    const hall = resolveBackground('corridor-b', index);
    expect(hall.url).toBe('/a/hall.png');
    expect(artDataAttributes(hall)).toEqual({ 'data-art-slot': 'bg-prototype-hallway', 'data-art-source': 'image' });
    const club = resolveBackground('clb-room', index);
    expect(club.url).toBeUndefined();
    expect(artDataAttributes(club)).toEqual({ 'data-art-slot': 'bg-prototype-club-room', 'data-art-source': 'placeholder' });
  });

  it('chân dung thiếu biểu cảm → mượn ảnh biểu cảm đầu của nhân vật; nhân vật chưa có ảnh → vẽ tạm', () => {
    const worried = resolvePortrait('minh-anh', 'worried', index);
    expect(worried.url).toBe('/a/ma-neutral.webp');
    expect(artDataAttributes(worried)).toEqual({
      'data-art-slot': 'minh-anh-worried',
      'data-art-source': 'image',
      'data-art-borrowed-from': 'minh-anh-neutral',
    });
    expect(resolvePortrait('ha-vy', 'smile', index).url).toBeUndefined();
  });

  it('tài liệu: nền giấy lấy theo mã tài liệu', () => {
    expect(resolveDocument('doc-letter', index).url).toBe('/a/letter.jpg');
    expect(resolveDocument('doc-bookmark', index).url).toBeUndefined();
  });
});
