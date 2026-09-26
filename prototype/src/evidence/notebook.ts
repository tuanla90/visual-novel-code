/**
 * Quy tắc hiển thị thẻ hồ sơ theo phần (QĐ-037): "Câu hỏi còn mở" đến hết Phần 4,
 * "Lưu ý" từ Phần 5 trở đi (thay cho "Câu hỏi còn mở").
 */
import { PART_IDS, type PartId } from '../shared/ids';
import type { ClueCard, DocumentCard } from './types';

export type CardNote = { kind: 'open-question'; label: 'Câu hỏi còn mở'; text: string } | { kind: 'caveat'; label: 'Lưu ý'; text: string };

/** Từ Phần 5 (`ending`) trở đi hiện "Lưu ý". */
export function showsCaveat(part: PartId | null): boolean {
  if (part === null) return false;
  return PART_IDS.indexOf(part) >= PART_IDS.indexOf('ending');
}

export function cardNoteForPart(card: ClueCard | DocumentCard, part: PartId | null): CardNote | null {
  if (showsCaveat(part)) {
    return { kind: 'caveat', label: 'Lưu ý', text: card.caveat };
  }
  if (card.openQuestion !== undefined && card.openQuestion.length > 0) {
    return { kind: 'open-question', label: 'Câu hỏi còn mở', text: card.openQuestion };
  }
  return null;
}
