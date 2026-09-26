/**
 * Hệ ô ảnh (QĐ-060): mỗi hình trong game có một "ô" mang tên cố định. Thả tệp ảnh đúng tên vào
 * `src/assets/art/` (đuôi .webp / .png / .jpg / .jpeg) là game tự dùng ảnh đó; không có tệp thì
 * dùng hình vẽ tạm bằng code (SVG/CSS). Không cần sửa code — xem `src/assets/art/README.md`.
 *
 * Kiểm ô nào đang dùng ảnh thật:
 * - trên màn chơi: phần tử hình có `data-art-slot="<tên ô>"` và `data-art-source="image" | "placeholder"`;
 * - bằng test: `npx vitest run src/shared/ui/visuals` in bảng ô ↔ nguồn và báo tệp đặt sai tên.
 *
 * Tên ô là định danh kỹ thuật: CHỈ nằm trong thuộc tính data-*, không bao giờ hiện ra màn hình
 * hay trong alt/aria.
 */
import { CHARACTER_EXPRESSIONS, CHARACTER_IDS, DOCUMENT_IDS, type CharacterId, type DocumentId, type SceneId } from '../../ids';

export type ArtKind = 'background' | 'portrait' | 'document';

export interface ArtSlot {
  /** Tên tệp không có đuôi, ví dụ `bg-prototype-hallway`. */
  name: string;
  kind: ArtKind;
  /** Chỗ dùng (tiếng Việt, cho README/bảng kiểm). */
  usage: string;
}

/** Đuôi được nhận, theo thứ tự ưu tiên khi cùng một tên có nhiều tệp. */
export const ART_EXTENSIONS = ['webp', 'png', 'jpg', 'jpeg'] as const;

/** Cảnh ↔ tên ô nền (tên theo bộ prompt của user `prompts-background-prototype-v0.1.md`). */
export const BACKGROUND_SLOTS: Record<SceneId, string> = {
  'clb-room': 'bg-prototype-club-room',
  'corridor-b': 'bg-prototype-hallway',
  'debrief-room': 'bg-prototype-hearing-room',
};

const SCENE_USAGE: Record<SceneId, string> = {
  'clb-room': 'Nền phòng CLB (Phần 1, 3, 5)',
  'corridor-b': 'Nền hành lang giảng đường B (Phần 2)',
  'debrief-room': 'Nền phòng giải trình (Phần 4)',
};

const DOCUMENT_USAGE: Record<DocumentId, string> = {
  'doc-letter': 'Nền giấy lá thư nặc danh',
  'doc-bookmark': 'Nền giấy bookmark Báo chí',
  'doc-handover-log': 'Nền giấy sổ bàn giao hộp góp ý',
};

/** Tên ô chân dung của một nhân vật ở một biểu cảm. */
export function portraitSlotName(character: CharacterId, expression: string): string {
  return `${character}-${expression}`;
}

/** Danh sách ĐỦ mọi ô ảnh của prototype (test so với README và thư mục ảnh). */
export const ART_SLOTS: readonly ArtSlot[] = [
  ...(Object.keys(BACKGROUND_SLOTS) as SceneId[]).map((scene) => ({
    name: BACKGROUND_SLOTS[scene],
    kind: 'background' as const,
    usage: SCENE_USAGE[scene],
  })),
  ...CHARACTER_IDS.flatMap((character) =>
    (CHARACTER_EXPRESSIONS[character] as readonly string[]).map((expression) => ({
      name: portraitSlotName(character, expression),
      kind: 'portrait' as const,
      usage: 'Chân dung',
    })),
  ),
  ...DOCUMENT_IDS.map((doc) => ({ name: doc, kind: 'document' as const, usage: DOCUMENT_USAGE[doc] })),
];

/**
 * Gom các tệp tìm được (đường dẫn → URL) thành bảng tên ô → URL. Tên so khớp không phân biệt
 * hoa/thường; cùng tên nhiều đuôi thì lấy theo thứ tự `ART_EXTENSIONS`.
 */
export function buildArtIndex(files: Record<string, string>): Map<string, string> {
  const ranked = new Map<string, { url: string; rank: number }>();
  for (const [path, url] of Object.entries(files)) {
    const parsed = parseArtFileName(path);
    if (!parsed) continue;
    const rank = ART_EXTENSIONS.indexOf(parsed.ext as (typeof ART_EXTENSIONS)[number]);
    const prev = ranked.get(parsed.name);
    if (!prev || rank < prev.rank) ranked.set(parsed.name, { url, rank });
  }
  return new Map([...ranked].map(([name, v]) => [name, v.url]));
}

/** `…/src/assets/art/Minh-Anh-Neutral.PNG` → { name: 'minh-anh-neutral', ext: 'png' }. */
export function parseArtFileName(path: string): { name: string; ext: string } | null {
  const file = path.split(/[\\/]/).pop() ?? '';
  const match = /^(.+)\.([a-z0-9]+)$/i.exec(file);
  if (!match) return null;
  const ext = (match[2] ?? '').toLowerCase();
  if (!(ART_EXTENSIONS as readonly string[]).includes(ext)) return null;
  return { name: (match[1] ?? '').toLowerCase(), ext };
}

// Vite gom tệp lúc dựng: thêm/bớt tệp → trang dev tự nạp lại, bản build tự kèm ảnh.
const FOUND_FILES = import.meta.glob('/src/assets/art/*.{webp,png,jpg,jpeg,WEBP,PNG,JPG,JPEG}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const ART_INDEX = buildArtIndex(FOUND_FILES);

/** Đường dẫn các tệp ảnh đang có trong thư mục ô ảnh (cho test/bảng kiểm). */
export function foundArtFiles(): string[] {
  return Object.keys(FOUND_FILES);
}

/** URL ảnh thật của một ô, hoặc `undefined` nếu chưa có tệp. */
export function artUrl(name: string, index: ReadonlyMap<string, string> = ART_INDEX): string | undefined {
  return index.get(name.toLowerCase());
}

export interface ResolvedArt {
  /** Ô được yêu cầu (luôn có, để gắn vào data-art-slot). */
  slot: string;
  /** Ô thật sự cấp ảnh (khác `slot` khi chân dung mượn ảnh biểu cảm đầu). */
  from?: string;
  url?: string;
}

/** Ô nền theo cảnh. */
export function resolveBackground(scene: SceneId, index: ReadonlyMap<string, string> = ART_INDEX): ResolvedArt {
  const slot = BACKGROUND_SLOTS[scene];
  const url = artUrl(slot, index);
  return url ? { slot, from: slot, url } : { slot };
}

/**
 * Ô chân dung: đúng biểu cảm → ảnh biểu cảm đầu của nhân vật (nếu có) → không có (vẽ tạm).
 */
export function resolvePortrait(
  character: CharacterId,
  expression: string,
  index: ReadonlyMap<string, string> = ART_INDEX,
): ResolvedArt {
  const slot = portraitSlotName(character, expression);
  const exact = artUrl(slot, index);
  if (exact) return { slot, from: slot, url: exact };
  const first = CHARACTER_EXPRESSIONS[character][0];
  const fallbackSlot = portraitSlotName(character, first);
  const fallback = artUrl(fallbackSlot, index);
  return fallback ? { slot, from: fallbackSlot, url: fallback } : { slot };
}

/** Ô nền giấy tài liệu. */
export function resolveDocument(doc: DocumentId, index: ReadonlyMap<string, string> = ART_INDEX): ResolvedArt {
  const url = artUrl(doc, index);
  return url ? { slot: doc, from: doc, url } : { slot: doc };
}

/** Thuộc tính data-* gắn lên phần tử hình để kiểm ô nào đang dùng ảnh thật. */
export function artDataAttributes(art: ResolvedArt): Record<string, string> {
  const attrs: Record<string, string> = {
    'data-art-slot': art.slot,
    'data-art-source': art.url ? 'image' : 'placeholder',
  };
  if (art.url && art.from && art.from !== art.slot) attrs['data-art-borrowed-from'] = art.from;
  return attrs;
}
