/**
 * Hệ ô ảnh (QĐ-060, QĐ-063): mỗi hình trong game có một "ô" mang tên cố định. Thả tệp ảnh vào BẤT KỲ
 * thư mục nào trong `src/assets/` (đuôi .webp / .png / .jpg / .jpeg) là game tự dùng ảnh đó; không có
 * tệp thì dùng hình vẽ tạm bằng code (SVG/CSS). Không cần sửa code — xem `src/assets/art/README.md`.
 *
 * Tên tệp được nhận (không phân biệt hoa/thường):
 * - tên ô (quy ước cũ của gói 7): `bg-prototype-hallway`, `minh-anh-worried`, `doc-letter`;
 * - quy ước của user (bộ prompt `prompts-characters-prototype-flow-v0.1.md`): `char-minh-anh-worried`,
 *   và `char-<nhân vật>-anchor` = biểu cảm ĐẦU của nhân vật (`CHARACTER_EXPRESSIONS`, Hoài = `nervous`);
 * - ảnh toàn thân cho hồ sơ nhân vật và màn ra mắt: `char-<nhân vật>-full` (ô `<nhân vật>-full`);
 * - ảnh giới thiệu 16:9 cho màn "Nhân vật mới": `intro-<nhân vật>` (có thì dùng thay khung chân dung);
 *   chưa có thì hai màn đó dùng chân dung (ảnh thật hoặc hình vẽ tạm).
 *
 * Kiểm ô nào đang dùng ảnh thật:
 * - trên màn chơi: phần tử hình có `data-art-slot="<tên ô>"` và `data-art-source="image" | "placeholder"`;
 * - bằng test: `npx vitest run src/shared/ui/visuals` in bảng ô ↔ tệp và báo tệp nghi gõ sai tên.
 *
 * Tên ô là định danh kỹ thuật: CHỈ nằm trong thuộc tính data-*, không bao giờ hiện ra màn hình
 * hay trong alt/aria.
 */
import {
  CHARACTER_EXPRESSIONS,
  CHARACTER_IDS,
  DOCUMENT_IDS,
  isCharacterId,
  type CharacterId,
  type DocumentId,
  type SceneId,
} from '../../ids';

export type ArtKind = 'background' | 'portrait' | 'full' | 'intro' | 'document';

export interface ArtSlot {
  /** Tên tệp không có đuôi, ví dụ `bg-prototype-hallway`. */
  name: string;
  kind: ArtKind;
  /** Chỗ dùng (tiếng Việt, cho README/bảng kiểm). */
  usage: string;
}

/** Đuôi được nhận, theo thứ tự ưu tiên khi cùng một tên có nhiều tệp. */
export const ART_EXTENSIONS = ['webp', 'png', 'jpg', 'jpeg'] as const;

/** Thư mục gốc được quét (mọi thư mục con, kể cả `art/`). */
export const ART_ROOT = '/src/assets/';

/** Tiền tố tên chân dung theo quy ước của user. */
export const USER_PORTRAIT_PREFIX = 'char-';
/** Hậu tố "ảnh neo" của user = biểu cảm đầu của nhân vật. */
export const USER_ANCHOR_SUFFIX = '-anchor';

/** Cảnh ↔ tên ô nền (tên theo bộ prompt của user `prompts-background-prototype-*.md`). */
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

/** Tên ô ảnh toàn thân của một nhân vật (hồ sơ nhân vật, màn ra mắt). */
export function fullArtSlotName(character: CharacterId): string {
  return `${character}-full`;
}

/** Tên ô ảnh giới thiệu 16:9 của một nhân vật (màn "Nhân vật mới"). */
export function introArtSlotName(character: CharacterId): string {
  return `intro-${character}`;
}

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
  ...CHARACTER_IDS.map((character) => ({
    name: fullArtSlotName(character),
    kind: 'full' as const,
    usage: 'Ảnh toàn thân (hồ sơ nhân vật, màn ra mắt)',
  })),
  ...CHARACTER_IDS.map((character) => ({
    name: introArtSlotName(character),
    kind: 'intro' as const,
    usage: 'Ảnh giới thiệu 16:9 (màn "Nhân vật mới")',
  })),
  ...DOCUMENT_IDS.map((doc) => ({ name: doc, kind: 'document' as const, usage: DOCUMENT_USAGE[doc] })),
];

const SLOT_BY_NAME = new Map(ART_SLOTS.map((s) => [s.name, s]));

/** Tên ô chân dung ứng với ảnh neo `char-<nhân vật>-anchor` (biểu cảm đầu của nhân vật). */
export function anchorSlotName(character: CharacterId): string {
  return portraitSlotName(character, CHARACTER_EXPRESSIONS[character][0]);
}

/**
 * Dạng tên của tệp, cũng là HẠNG ƯU TIÊN khi nhiều tệp cùng cấp ảnh cho một ô (số nhỏ thắng):
 * 0 `user` — `char-<nhân vật>-<biểu cảm>` (quy ước của user, ghi đúng biểu cảm);
 * 1 `anchor` — `char-<nhân vật>-anchor` (quy ước của user, ảnh neo = biểu cảm đầu);
 * 2 `slot` — tên ô kiểu cũ (`minh-anh-worried`, `bg-prototype-hallway`, `doc-letter`).
 * Ảnh nền và tài liệu chỉ có một dạng tên (user đặt đúng tên ô) nên luôn là `slot`.
 */
export type ArtNameForm = 'user' | 'anchor' | 'slot';
const FORM_RANK: Record<ArtNameForm, number> = { user: 0, anchor: 1, slot: 2 };

/** Tên tệp (không đuôi, đã viết thường) → ô nó cấp ảnh, hoặc `null` nếu không khớp ô nào. */
export function slotForFileName(name: string): { slot: string; form: ArtNameForm } | null {
  const lower = name.toLowerCase();
  if (lower.startsWith(USER_PORTRAIT_PREFIX)) {
    const rest = lower.slice(USER_PORTRAIT_PREFIX.length);
    if (rest.endsWith(USER_ANCHOR_SUFFIX)) {
      const character = rest.slice(0, -USER_ANCHOR_SUFFIX.length);
      return isCharacterId(character) ? { slot: anchorSlotName(character), form: 'anchor' } : null;
    }
    const kind = SLOT_BY_NAME.get(rest)?.kind;
    return kind === 'portrait' || kind === 'full' ? { slot: rest, form: 'user' } : null;
  }
  return SLOT_BY_NAME.has(lower) ? { slot: lower, form: 'slot' } : null;
}

/** Mọi tên tệp (không đuôi) được nhận: tên ô + `char-<ô chân dung>` + `char-<nhân vật>-anchor`. */
export const KNOWN_FILE_NAMES: readonly string[] = [
  ...ART_SLOTS.map((s) => s.name),
  ...ART_SLOTS.filter((s) => s.kind === 'portrait' || s.kind === 'full').map((s) => `${USER_PORTRAIT_PREFIX}${s.name}`),
  ...CHARACTER_IDS.map((c) => `${USER_PORTRAIT_PREFIX}${c}${USER_ANCHOR_SUFFIX}`),
];

/** `…/src/assets/art/Minh-Anh-Neutral.PNG` → { name: 'minh-anh-neutral', ext: 'png' }. */
export function parseArtFileName(path: string): { name: string; ext: string } | null {
  const file = path.split(/[\\/]/).pop() ?? '';
  const match = /^(.+)\.([a-z0-9]+)$/i.exec(file);
  if (!match) return null;
  const ext = (match[2] ?? '').toLowerCase();
  if (!(ART_EXTENSIONS as readonly string[]).includes(ext)) return null;
  return { name: (match[1] ?? '').toLowerCase(), ext };
}

interface Candidate {
  path: string;
  url: string;
  slot: string;
  form: ArtNameForm;
  ext: string;
}

/**
 * Thứ tự ưu tiên khi cùng một ô có nhiều tệp (README "Hai tệp cùng một ô"):
 * 1. dạng tên: `char-<nv>-<biểu cảm>` > `char-<nv>-anchor` > tên ô kiểu cũ;
 * 2. đuôi: webp > png > jpg > jpeg;
 * 3. đường dẫn theo thứ tự chữ cái (không phân biệt hoa/thường) — `src/assets/art/…` đứng trước
 *    `src/assets/characters/…`.
 */
function compareCandidates(a: Candidate, b: Candidate): number {
  const byForm = FORM_RANK[a.form] - FORM_RANK[b.form];
  if (byForm !== 0) return byForm;
  const byExt = ART_EXTENSIONS.indexOf(a.ext as (typeof ART_EXTENSIONS)[number]) - ART_EXTENSIONS.indexOf(b.ext as (typeof ART_EXTENSIONS)[number]);
  if (byExt !== 0) return byExt;
  const pa = a.path.toLowerCase();
  const pb = b.path.toLowerCase();
  return pa < pb ? -1 : pa > pb ? 1 : 0;
}

function candidatesOf(files: Record<string, string>): Candidate[] {
  const out: Candidate[] = [];
  for (const [path, url] of Object.entries(files)) {
    const parsed = parseArtFileName(path);
    if (!parsed) continue;
    const match = slotForFileName(parsed.name);
    if (match) out.push({ path, url, slot: match.slot, form: match.form, ext: parsed.ext });
  }
  return out.sort(compareCandidates);
}

/**
 * Gom các tệp tìm được (đường dẫn → URL) thành bảng tên ô → URL, theo thứ tự ưu tiên của
 * `compareCandidates`. Tệp không khớp ô nào bị bỏ qua (xem `classifyArtFiles`).
 */
export function buildArtIndex(files: Record<string, string>): Map<string, string> {
  const index = new Map<string, string>();
  for (const c of candidatesOf(files)) if (!index.has(c.slot)) index.set(c.slot, c.url);
  return index;
}

/** Khoảng cách sửa chữ (Levenshtein) — để nhận ra tên gõ sai một vài ký tự. */
export function editDistance(a: string, b: string): number {
  let prev = Array.from({ length: b.length + 1 }, (_, j) => j);
  for (let i = 1; i <= a.length; i++) {
    const cur = [i];
    for (let j = 1; j <= b.length; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      cur.push(Math.min((prev[j] ?? 0) + 1, (cur[j - 1] ?? 0) + 1, (prev[j - 1] ?? 0) + cost));
    }
    prev = cur;
  }
  return prev[b.length] ?? 0;
}

/** Tên lệch ≤ ngần này ký tự so với một tên được nhận → nghi gõ sai (test báo đỏ). */
export const TYPO_DISTANCE = 2;

export interface ArtFileReport {
  /** Tệp đang cấp ảnh cho một ô. */
  used: { path: string; slot: string }[];
  /** Tệp khớp một ô nhưng thua tệp khác cùng ô (theo thứ tự ưu tiên). */
  shadowed: { path: string; slot: string; by: string }[];
  /** Tệp không khớp ô nào và không giống tên ô nào — tệp tham khảo, bản nháp… (không lỗi). */
  ignored: string[];
  /** Tệp không khớp ô nào nhưng lệch ≤ `TYPO_DISTANCE` ký tự so với một tên được nhận → nghi gõ sai. */
  suspicious: { path: string; closest: string }[];
}

/**
 * Phân loại mọi tệp ảnh tìm được. Tên dạng "<tên được nhận><dấu ngăn><gì đó>" (ví dụ
 * `char-minh-anh-worried-2`, `char-minh-anh-worried (1)`) coi là bản nháp/biến thể → bỏ qua, không lỗi.
 */
export function classifyArtFiles(paths: readonly string[]): ArtFileReport {
  const files = Object.fromEntries(paths.map((p) => [p, p]));
  const report: ArtFileReport = { used: [], shadowed: [], ignored: [], suspicious: [] };
  const winner = new Map<string, string>();
  for (const c of candidatesOf(files)) {
    const first = winner.get(c.slot);
    if (first === undefined) {
      winner.set(c.slot, c.path);
      report.used.push({ path: c.path, slot: c.slot });
    } else {
      report.shadowed.push({ path: c.path, slot: c.slot, by: first });
    }
  }
  for (const path of paths) {
    const parsed = parseArtFileName(path);
    if (!parsed || slotForFileName(parsed.name)) continue;
    const variant = KNOWN_FILE_NAMES.some((k) => parsed.name.startsWith(k) && /^[^a-z0-9]/.test(parsed.name.slice(k.length)));
    let closest = '';
    let best = Number.POSITIVE_INFINITY;
    for (const k of KNOWN_FILE_NAMES) {
      const d = editDistance(parsed.name, k);
      if (d < best) {
        best = d;
        closest = k;
      }
    }
    if (!variant && best <= TYPO_DISTANCE) report.suspicious.push({ path, closest });
    else report.ignored.push(path);
  }
  return report;
}

// Vite gom tệp lúc dựng: thêm/bớt tệp → trang dev tự nạp lại, bản build tự kèm ảnh.
// Quét MỌI thư mục con của src/assets (QĐ-063) — user đặt ảnh ở `src/assets/characters/`.
const FOUND_FILES = import.meta.glob('/src/assets/**/*.{webp,png,jpg,jpeg,WEBP,PNG,JPG,JPEG}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const ART_INDEX = buildArtIndex(FOUND_FILES);

/** Đường dẫn các tệp ảnh đang có trong `src/assets/**` (cho test/bảng kiểm). */
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
  const fallbackSlot = anchorSlotName(character);
  const fallback = artUrl(fallbackSlot, index);
  return fallback ? { slot, from: fallbackSlot, url: fallback } : { slot };
}

/** Ô ảnh toàn thân; không có tệp → `url` rỗng, nơi dùng tự rơi về chân dung. */
export function resolveFullArt(character: CharacterId, index: ReadonlyMap<string, string> = ART_INDEX): ResolvedArt {
  const slot = fullArtSlotName(character);
  const url = artUrl(slot, index);
  return url ? { slot, from: slot, url } : { slot };
}

/** Ô ảnh giới thiệu 16:9; không có tệp → màn "Nhân vật mới" dùng khung chân dung như cũ. */
export function resolveIntroArt(character: CharacterId, index: ReadonlyMap<string, string> = ART_INDEX): ResolvedArt {
  const slot = introArtSlotName(character);
  const url = artUrl(slot, index);
  return url ? { slot, from: slot, url } : { slot };
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
