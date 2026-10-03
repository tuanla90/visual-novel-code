export type HighlightCategory = 'person' | 'time' | 'place' | 'item';
export interface HighlightEntry { text: string; category: HighlightCategory; canonical?: string }
export interface HighlightToken { start: number; end: number; text: string; category: HighlightCategory; canonical: string }
export const categories: Record<HighlightCategory, string>;
export class Engine {
  constructor(entries?: HighlightEntry[]);
  tokenize(text: string, enabled?: HighlightCategory[]): HighlightToken[];
  clear(root: Element): void;
  apply(root: Element, enabled?: HighlightCategory[]): number;
}
