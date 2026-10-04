import { Engine, type HighlightEntry, type HighlightCategory } from '../../shared/highlight/engine.js';
import rules from '../../../noi-dung-mvp/highlight.json';

type Profile = { clues: string[]; relations: string[]; people?: string[] };
const contains = (text: string, terms: string[]) => terms.some(term => {
  term = term.normalize('NFC').toLocaleLowerCase('vi');
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
  constructor(entries: HighlightEntry[], private profile: Profile | null) {
    super([...entries, ...(profile?.clues ?? []).map(text => ({ text, category: 'item' as const })), ...(profile?.people ?? []).map(text => ({ text, category: 'person' as const }))]);
  }

  override tokenize(text: string, enabled?: HighlightCategory[]) {
    if (!this.profile) return [];
    const profile = this.profile;
    return super.tokenize(text, enabled).filter(token => {
      // Work in the original string so decomposed accents do not shift token positions.
      const before = text.slice(0, token.start).search(/[^.!?…\n]*$/u);
      const tail = text.slice(token.end).search(/[.!?…\n]/u);
      const sentence = text.slice(before, tail < 0 ? text.length : token.end + tail).normalize('NFC').toLocaleLowerCase('vi');
      const clue = contains(sentence, profile.clues);
      const relation = contains(sentence, profile.relations);
      if (token.category === 'time') return clue && (relation || /(?:giờ|ngày|tối|lúc|vào|từ|đến|trước|sau|mở tới|gửi)/u.test(sentence));
      if (token.category === 'person') return clue && (relation || contains(token.text.normalize('NFC').toLocaleLowerCase('vi'), profile.people ?? []));
      if (token.category === 'place') return clue && relation;
      // Evidence objects remain visible even when the speaker states only their name.
      const keyItem = contains(token.text.normalize('NFC').toLocaleLowerCase('vi'), profile.clues);
      const evidenceCode = /[\p{L}].*[-_]\d|\d.*[-_][\p{L}]/u.test(token.text);
      return clue && (keyItem || (relation && evidenceCode));
    });
  }
}

export function storyHighlightProfile(caseId: string, sideQuestId: string | null): Profile {
  const selected: Profile | undefined = rules[(sideQuestId ?? caseId) as keyof typeof rules];
  // Hidden cues can occur in either route. Only text already visible is highlighted.
  return {
    clues: [...(selected?.clues ?? []), ...rules.hidden.clues],
    relations: [...(selected?.relations ?? []), ...rules.hidden.relations],
    people: rules.hidden.people,
  };
}
