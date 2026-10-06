/**
 * LUẬT TÔ MÀU (user 04/10/2026). Tô = thứ sẽ vào hồ sơ của tuyến đang chơi:
 * - cụm tô khai theo từng thẻ hồ sơ ở highlight.json của từng bộ nội dung (`noi-dung-mvp/`, `noi-dung-mua-1/`; mã tuyến hai bộ
 *   khác nhau, vd. `vu2` ↔ `vu-tin-don`), theo thẻ (`the`), nên không trôi khỏi hồ sơ;
 * - người chơi và bốn bạn đồng hành không bao giờ tô; người khác chỉ tô khi tên họ có trong thẻ hồ sơ của tuyến;
 * - người, nơi, giờ chỉ tô trong câu có cụm tô của tuyến (và nơi cần thêm từ ngữ cảnh `relations`).
 * Máy kiểm luật: src/mvp/ui/to-mau-luat.test.ts.
 */
import { Engine, type HighlightEntry, type HighlightCategory } from '../../shared/highlight/engine.js';
import type { KichBanMvp } from '../../content/mvp/types';
import { tuyenChuoi } from '../engine/tuyen-chuoi';
import luatMvp from '../../../noi-dung-mvp/highlight.json';
import luatMua1 from '../../../noi-dung-mua-1/highlight.json';

export interface LuatTuyen {
  the: Record<string, string[]>;
  relations: string[];
}
export type LuatToMau = Record<string, LuatTuyen>;
/** Luật tô của từng bộ nội dung; phải đi cùng kịch bản của chính bộ đó (mã tuyến lấy từ lich.md của bộ). */
export const LUAT_TO_MAU: Record<'mvp' | 'mua-1', LuatToMau> = { mvp: luatMvp as LuatToMau, 'mua-1': luatMua1 as LuatToMau };
/** Người chơi đi cùng họ suốt game: tô thì câu nào cũng sáng, mất tác dụng. */
export const DONG_HANH = new Set(['tung', 'ha-vy', 'minh-anh', 'duy']);

type Profile = { clues: string[]; relations: string[]; people: string[] };
const chuan = (s: string): string => s.normalize('NFC').toLocaleLowerCase('vi');
const contains = (text: string, terms: string[]) =>
  terms.some((term) => {
    term = chuan(term);
    const word = /[\p{L}\p{M}\p{N}_]/u;
    let index = text.indexOf(term);
    while (index >= 0) {
      if (!word.test(text[index - 1] ?? '') && !word.test(text[index + term.length] ?? '')) return true;
      index = text.indexOf(term, index + term.length);
    }
    return false;
  });

/** A date shape alone is never enough. Each sentence needs an active-case evidence anchor. */
export class StoryHighlightEngine extends Engine {
  private profile: Profile | null;
  constructor(entries: HighlightEntry[], profile: Profile | null) {
    super([...entries, ...(profile?.clues ?? []).map((text) => ({ text, category: 'item' as const }))]);
    this.profile = profile;
  }

  override tokenize(text: string, enabled?: HighlightCategory[]) {
    if (!this.profile) return [];
    const profile = this.profile;
    const giu = super.tokenize(text, enabled).filter((token) => {
      // Work in the original string so decomposed accents do not shift token positions.
      const before = text.slice(0, token.start).search(/[^.!?…\n]*$/u);
      const tail = text.slice(token.end).search(/[.!?…\n]/u);
      const sentence = chuan(text.slice(before, tail < 0 ? text.length : token.end + tail));
      const clue = contains(sentence, profile.clues);
      const relation = contains(sentence, profile.relations);
      if (token.category === 'time') return clue && (relation || /(?:giờ|ngày|tối|lúc|vào|từ|đến|trước|sau|mở tới|gửi)/u.test(sentence));
      if (token.category === 'person') return clue && contains(chuan(token.text), profile.people);
      if (token.category === 'place') return clue && relation;
      // Evidence objects remain visible even when the speaker states only their name.
      const keyItem = contains(chuan(token.text), profile.clues);
      const evidenceCode = /[\p{L}].*[-_]\d|\d.*[-_][\p{L}]/u.test(token.text);
      return clue && (keyItem || (relation && evidenceCode));
    });
    // Một câu tối đa 3 chỗ tô; dư thì giữ theo ưu tiên vật chứng → người → giờ → nơi, rồi theo vị trí.
    const uuTien: Record<HighlightCategory, number> = { item: 0, person: 1, time: 2, place: 3 };
    const theoCau = new Map<number, typeof giu>();
    for (const t of giu) {
      const cau = text.slice(0, t.start).search(/[^.!?…\n]*$/u);
      theoCau.set(cau, [...(theoCau.get(cau) ?? []), t]);
    }
    const bo = new Set<(typeof giu)[number]>();
    for (const ds of theoCau.values()) if (ds.length > 3) for (const t of [...ds].sort((x, y) => uuTien[x.category] - uuTien[y.category] || x.start - y.start).slice(3)) bo.add(t);
    return giu.filter((t) => !bo.has(t));
  }
}

/** Cụm tô, từ ngữ cảnh và người được tô của một tuyến (vụ chính, hoặc việc phụ nếu đang chơi việc phụ). */
export function storyHighlightProfile(kb: KichBanMvp, luatBo: LuatToMau, caseId: string, sideQuestId: string | null): Profile {
  const tuyen = sideQuestId ?? caseId;
  const luat = luatBo[tuyen];
  const chuThe = [...(tuyenChuoi(kb).theCua.get(tuyen)?.values() ?? [])].join(' | ');
  const people: string[] = [];
  for (const nv of kb.nhanVat) {
    if (DONG_HANH.has(nv.id) || nv.id === 'nguoi-choi') continue;
    const ten = [nv.ten, nv.hoTen, nv.ten.replace(/^(?:thầy|cô|bác|chú|chị|anh)\s+/i, '')].filter((t): t is string => !!t && t.length >= 2);
    if (ten.some((t) => contains(chuThe, [t]))) people.push(...ten);
  }
  return { clues: Object.values(luat?.the ?? {}).flat(), relations: luat?.relations ?? [], people };
}
