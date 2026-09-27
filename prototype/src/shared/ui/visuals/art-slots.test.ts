/**
 * Hệ ô ảnh (QĐ-060, QĐ-063): danh sách ô đủ và khớp README; nhận ảnh ở MỌI thư mục con của
 * `src/assets/`, theo tên ô kiểu cũ lẫn quy ước của user (`char-<nhân vật>-<biểu cảm>`, `-anchor` =
 * biểu cảm đầu); thứ tự ưu tiên khi hai tệp cùng một ô; tệp nghi gõ sai tên → đỏ, tệp tham khảo của
 * user → "bỏ qua". In bảng ô ↔ tệp để user kiểm.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { CHARACTER_EXPRESSIONS, CHARACTER_IDS, DOCUMENT_IDS, SCENE_IDS } from '../../ids';
import {
  ART_EXTENSIONS,
  ART_SLOTS,
  artDataAttributes,
  artUrl,
  buildArtIndex,
  classifyArtFiles,
  foundArtFiles,
  parseArtFileName,
  resolveBackground,
  resolveDocument,
  resolveFullArt,
  resolvePortrait,
  slotForFileName,
} from './art-slots';

const ASSETS_DIR = join(dirname(fileURLToPath(import.meta.url)), '../../../assets');
const ART_DIR = join(ASSETS_DIR, 'art');

/** Mọi tệp ảnh (đuôi được nhận) dưới `src/assets/`, dạng `/src/assets/<thư mục>/<tệp>` như Vite. */
function imageFilesOnDisk(dir = ASSETS_DIR): string[] {
  if (!existsSync(dir)) return [];
  return readdirSync(dir).flatMap((entry) => {
    const full = join(dir, entry);
    if (statSync(full).isDirectory()) return imageFilesOnDisk(full);
    if (parseArtFileName(entry) === null) return [];
    return [`/src/assets/${relative(ASSETS_DIR, full).split(/[\\/]/).join('/')}`];
  });
}

/** 13 id trong §1 Manifest của `prompts-characters-prototype-flow-v0.1.md` → ô chân dung. */
const USER_MANIFEST: Record<string, string> = {
  'char-minh-anh-anchor': 'minh-anh-neutral',
  'char-minh-anh-worried': 'minh-anh-worried',
  'char-minh-anh-happy': 'minh-anh-happy',
  'char-ha-vy-anchor': 'ha-vy-neutral',
  'char-ha-vy-thinking': 'ha-vy-thinking',
  'char-ha-vy-smile': 'ha-vy-smile',
  'char-quan-anchor': 'quan-neutral',
  'char-quan-smug': 'quan-smug',
  'char-quan-stunned': 'quan-stunned',
  'char-hoai-anchor': 'hoai-nervous',
  'char-hoai-downcast': 'hoai-downcast',
  'char-hoai-relieved': 'hoai-relieved',
  'char-bac-tu-neutral': 'bac-tu-neutral',
  'char-tung-anchor': 'tung-neutral',
};

describe('ô ảnh: danh sách và README', () => {
  it('đủ ô: 3 nền + mọi biểu cảm của mọi nhân vật + ảnh toàn thân mỗi nhân vật + 3 tài liệu, không trùng tên', () => {
    const expressions = CHARACTER_IDS.reduce((n, c) => n + CHARACTER_EXPRESSIONS[c].length, 0);
    expect(ART_SLOTS).toHaveLength(SCENE_IDS.length + expressions + CHARACTER_IDS.length + DOCUMENT_IDS.length);
    expect(new Set(ART_SLOTS.map((s) => s.name)).size).toBe(ART_SLOTS.length);
    expect(ART_SLOTS.map((s) => s.name)).toEqual(
      expect.arrayContaining(['bg-prototype-club-room', 'bg-prototype-hallway', 'bg-prototype-hearing-room', 'minh-anh-neutral', 'ha-vy-thinking', 'quan-stunned', 'hoai-relieved', 'bac-tu-neutral', 'doc-letter', 'doc-bookmark', 'doc-handover-log']),
    );
  });

  it('README trong thư mục ô ảnh liệt kê đủ mọi tên ô, 13 id của user và mọi đuôi được nhận', () => {
    const readme = readFileSync(join(ART_DIR, 'README.md'), 'utf8');
    for (const slot of ART_SLOTS) expect(readme, slot.name).toContain(`\`${slot.name}\``);
    for (const id of Object.keys(USER_MANIFEST)) expect(readme, id).toContain(`\`${id}\``);
    for (const ext of ART_EXTENSIONS) expect(readme).toContain(`.${ext}`);
    // Bảng Manifest trong README: mỗi dòng id ↔ đúng ô.
    for (const [id, slot] of Object.entries(USER_MANIFEST)) expect(readme).toMatch(new RegExp(`\\| \`${id}\`[^\\n]*\`${slot}\``));
  });

  it('tệp ảnh trong src/assets: không tệp nào nghi gõ sai tên; in bảng ô ↔ tệp, tệp bị che, tệp bỏ qua', () => {
    const report = classifyArtFiles(imageFilesOnDisk());
    const usedBySlot = new Map(report.used.map((u) => [u.slot, u.path]));
    const resolved = [
      ...SCENE_IDS.map((scene) => resolveBackground(scene)),
      ...CHARACTER_IDS.flatMap((c) => CHARACTER_EXPRESSIONS[c].map((e: string) => resolvePortrait(c, e))),
      ...DOCUMENT_IDS.map((doc) => resolveDocument(doc)),
    ];
    const fullArt = CHARACTER_IDS.map((c) => resolveFullArt(c));
    const lines = resolved.map((art) => {
      if (!art.url) return `vẽ tạm    ${art.slot}`;
      if (art.from !== art.slot) return `mượn      ${art.slot} ← ô ${art.from ?? '?'}`;
      return `ẢNH THẬT  ${art.slot} ← ${usedBySlot.get(art.slot) ?? '?'}`;
    });
    for (const art of fullArt) lines.push(art.url ? `ẢNH THẬT  ${art.slot} ← ${usedBySlot.get(art.slot) ?? '?'}` : `dùng chân dung ${art.slot}`);
    for (const s of report.shadowed) lines.push(`bị che    ${s.path} (ô ${s.slot} dùng ${s.by})`);
    for (const path of report.ignored) lines.push(`bỏ qua    ${path} (không khớp ô nào — tệp tham khảo/bản nháp?)`);
    for (const s of report.suspicious) lines.push(`NGHI SAI  ${s.path} (gần giống \`${s.closest}\`)`);
    console.info(`Ô ảnh (mọi thư mục trong src/assets):\n${lines.join('\n')}`);
    expect(
      report.suspicious.map((s) => s.path),
      `Tệp nghi đặt sai tên (xem README): ${report.suspicious.map((s) => `${s.path} → ${s.closest}?`).join(', ')}`,
    ).toEqual([]);
  });

  it('Vite nhận đúng các tệp đang có trên đĩa ở mọi thư mục con (glob không bỏ sót đuôi/thư mục nào)', () => {
    const onDisk = imageFilesOnDisk().map((f) => f.toLowerCase()).sort();
    const found = foundArtFiles().map((p) => p.toLowerCase()).sort();
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

describe('ô ảnh: quy ước tên của user (QĐ-063)', () => {
  it('13 id của Manifest khớp đúng 13 ô chân dung, không trùng, phủ kín mọi ô chân dung', () => {
    for (const [id, slot] of Object.entries(USER_MANIFEST)) expect(slotForFileName(id)?.slot, id).toBe(slot);
    const portraitSlots = ART_SLOTS.filter((s) => s.kind === 'portrait').map((s) => s.name).sort();
    expect([...new Set(Object.values(USER_MANIFEST))].sort()).toEqual(portraitSlots);
  });

  it('`-anchor` = biểu cảm ĐẦU của nhân vật: char-hoai-anchor ↔ hoai-nervous, các nhân vật khác ↔ neutral', () => {
    expect(slotForFileName('char-hoai-anchor')).toEqual({ slot: 'hoai-nervous', form: 'anchor' });
    for (const c of CHARACTER_IDS) expect(slotForFileName(`char-${c}-anchor`)?.slot).toBe(`${c}-${CHARACTER_EXPRESSIONS[c][0]}`);
    const index = buildArtIndex({ '/src/assets/characters/char-hoai-anchor.png': '/a/hoai.png' });
    expect(resolvePortrait('hoai', 'nervous', index)).toEqual({ slot: 'hoai-nervous', from: 'hoai-nervous', url: '/a/hoai.png' });
    expect(resolvePortrait('hoai', 'downcast', index)).toEqual({ slot: 'hoai-downcast', from: 'hoai-nervous', url: '/a/hoai.png' });
  });

  it('`char-` chỉ dành cho chân dung có thật; tên ô kiểu cũ vẫn nhận song song', () => {
    expect(slotForFileName('char-minh-anh-worried')).toEqual({ slot: 'minh-anh-worried', form: 'user' });
    expect(slotForFileName('CHAR-Minh-Anh-Worried')).toEqual({ slot: 'minh-anh-worried', form: 'user' });
    expect(slotForFileName('minh-anh-worried')).toEqual({ slot: 'minh-anh-worried', form: 'slot' });
    expect(slotForFileName('bg-prototype-hallway')).toEqual({ slot: 'bg-prototype-hallway', form: 'slot' });
    expect(slotForFileName('doc-letter')).toEqual({ slot: 'doc-letter', form: 'slot' });
    expect(slotForFileName('char-hoai-neutral')).toBeNull();
    expect(slotForFileName('char-bg-prototype-hallway')).toBeNull();
    expect(slotForFileName('char-ai-do-anchor')).toBeNull();
    expect(slotForFileName('hoa-phuong-environment-style-anchor')).toBeNull();
  });

  it('ảnh của user ở thư mục bất kỳ trong src/assets → game dùng; biểu cảm chưa có → mượn ảnh neo', () => {
    const index = buildArtIndex({
      '/src/assets/characters/char-minh-anh-anchor.png': '/a/ma-anchor.png',
      '/src/assets/characters/char-minh-anh-worried.png': '/a/ma-worried.png',
      '/src/assets/nhan-vat/moi/char-quan-smug.jpg': '/a/quan-smug.jpg',
      '/src/assets/bg-prototype-hallway.webp': '/a/hall.webp',
    });
    expect(resolvePortrait('minh-anh', 'neutral', index).url).toBe('/a/ma-anchor.png');
    expect(resolvePortrait('minh-anh', 'worried', index).url).toBe('/a/ma-worried.png');
    expect(resolvePortrait('minh-anh', 'happy', index)).toEqual({ slot: 'minh-anh-happy', from: 'minh-anh-neutral', url: '/a/ma-anchor.png' });
    expect(resolvePortrait('quan', 'smug', index).url).toBe('/a/quan-smug.jpg');
    expect(resolvePortrait('quan', 'neutral', index).url).toBeUndefined();
    expect(resolveBackground('corridor-b', index).url).toBe('/a/hall.webp');
  });

  it('hai tệp cùng một ô: char-<biểu cảm> > char-…-anchor > tên kiểu cũ; rồi webp > png > jpg; rồi đường dẫn a→z', () => {
    const files = {
      '/src/assets/art/minh-anh-neutral.webp': 'old-webp',
      '/src/assets/characters/char-minh-anh-anchor.webp': 'anchor-webp',
      '/src/assets/characters/char-minh-anh-neutral.png': 'user-png',
    };
    expect(artUrl('minh-anh-neutral', buildArtIndex(files))).toBe('user-png');
    const { ['/src/assets/characters/char-minh-anh-neutral.png']: _user, ...noUser } = files;
    expect(artUrl('minh-anh-neutral', buildArtIndex(noUser))).toBe('anchor-webp');
    expect(artUrl('minh-anh-worried', buildArtIndex({ '/src/assets/b/char-minh-anh-worried.jpg': 'b-jpg', '/src/assets/c/char-minh-anh-worried.png': 'c-png' }))).toBe('c-png');
    expect(artUrl('minh-anh-worried', buildArtIndex({ '/src/assets/characters/char-minh-anh-worried.png': 'characters', '/src/assets/art/char-minh-anh-worried.png': 'art' }))).toBe('art');
    const report = classifyArtFiles(Object.keys(files));
    expect(report.used).toEqual([{ path: '/src/assets/characters/char-minh-anh-neutral.png', slot: 'minh-anh-neutral' }]);
    expect(report.shadowed.map((s) => s.path)).toEqual(['/src/assets/characters/char-minh-anh-anchor.webp', '/src/assets/art/minh-anh-neutral.webp']);
  });

  it('tệp không khớp ô: tham khảo/bản nháp → bỏ qua (không lỗi); lệch 1–2 ký tự so với tên được nhận → nghi gõ sai', () => {
    const report = classifyArtFiles([
      '/src/assets/characters/hoa-phuong-environment-style-anchor.png',
      '/src/assets/characters/char-minh-anh-worried-2.png',
      '/src/assets/characters/char-minh-anh-worried (1).png',
      '/src/assets/characters/char-minh-anh-woried.png',
      '/src/assets/art/bg-prototype-halway.png',
      '/src/assets/characters/char-minh-anh-anchor.png',
    ]);
    expect(report.used).toEqual([{ path: '/src/assets/characters/char-minh-anh-anchor.png', slot: 'minh-anh-neutral' }]);
    expect(report.ignored).toEqual([
      '/src/assets/characters/hoa-phuong-environment-style-anchor.png',
      '/src/assets/characters/char-minh-anh-worried-2.png',
      '/src/assets/characters/char-minh-anh-worried (1).png',
    ]);
    expect(report.suspicious).toEqual([
      { path: '/src/assets/characters/char-minh-anh-woried.png', closest: 'char-minh-anh-worried' },
      { path: '/src/assets/art/bg-prototype-halway.png', closest: 'bg-prototype-hallway' },
    ]);
  });
});
