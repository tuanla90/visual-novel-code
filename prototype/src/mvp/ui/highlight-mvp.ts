import type { KichBanMvp } from '../../content/mvp/types';
import type { HighlightEntry, HighlightCategory } from '../../shared/highlight/engine.js';
import { DONG_HANH, StoryHighlightEngine, storyHighlightProfile } from './story-highlight';

/** Canonical generated game content supplies the lexicon; no second handwritten list. */
export function highlightMvp(kb: KichBanMvp, playerName: string, caseId = 'vu1', sideQuestId: string | null = null): StoryHighlightEngine {
  const entries = new Map<string, HighlightEntry>();
  const add = (text: string | null | undefined, category: HighlightCategory) => {
    if (!text || text.includes('{{')) return;
    text = text.replace(/["“”`[\]]/g, '').replace(/\s+/g, ' ').trim();
    if (text.length < 3) return;
    entries.set(`${category}:${text.toLocaleLowerCase('vi')}`, { text, category });
  };
  // Người chơi và bạn đồng hành không tô (luật tô màu 04/10): có mặt gần như mọi câu.
  for (const nv of kb.nhanVat) {
    if (nv.id === 'nguoi-choi' || DONG_HANH.has(nv.id)) continue;
    add(nv.ten, 'person'); add(nv.hoTen, 'person'); add(nv.trongCau, 'person');
    add(nv.ten.replace(/^(?:thầy|cô|bác|chú|chị|anh)\s+/i, ''), 'person');
  }
  void playerName;
  for (const place of [...kb.canh, ...kb.diaDiem]) {
    add(place.ten, 'place');
    add(place.ten.replace(/,.*$/, '').replace(/^(?:Trong|Ngoài)\s+/i, '').replace(/\s+cổng trường$/i, '').replace(/\s+trường$/i, ''), 'place');
    add(place.ten.replace(/\bCLB\s+/g, ''), 'place');
  }
  for (const card of Object.values(kb.hoSo)) {
    for (const title of [card.heading, card.fields['Tiêu đề']]) {
      add(title, 'item');
      if (title) add(title.replace(/\s*\([^)]*\)/g, '').replace(/^Bản (?:xuất|chụp)\s+/i, ''), 'item');
    }
  }
  for (const table of kb.duLieu?.bang ?? []) {
    const columns = table.cot.map((column, index) => /^(?:ma_(?:don|chi|phien|phieu|tin|bai|luot|tai_san|tham_chieu)|linh_kien|ten_tep)$/.test(column.ten) ? index : -1).filter(index => index >= 0);
    for (const row of table.dong) for (const index of columns) if (typeof row[index] === 'string') add(row[index], 'item');
  }
  return new StoryHighlightEngine([...entries.values()], storyHighlightProfile(kb, caseId, sideQuestId));
}
