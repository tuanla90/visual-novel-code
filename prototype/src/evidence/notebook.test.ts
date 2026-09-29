import { describe, expect, it } from 'vitest';
import { cardNoteForPart, showsCaveat } from './notebook';
import type { ClueCard, DocumentCard } from './types';

const clue: ClueCard = {
  id: 'clue-signature-h',
  title: 'Chữ ký tay (chỉ đọc được chữ H)',
  source: 'nguồn',
  content: 'nội dung',
  openQuestion: 'Trong dữ liệu, những ai có tên bắt đầu bằng H?',
  caveat: 'Chỉ là khả năng.',
};

const handoverLog: DocumentCard = {
  id: 'doc-handover-log',
  title: 'Sổ bàn giao',
  source: 'nguồn',
  body: ['dòng 1'],
  caveat: 'Sổ cho biết ai đã ký gửi, không cho biết ai viết.',
};

describe('QĐ-037: Câu hỏi còn mở trước, Lưu ý sau', () => {
  it('Phần 1–4 hiện "Câu hỏi còn mở"', () => {
    for (const part of ['intro', 'investigation', 'analysis', 'debrief'] as const) {
      expect(showsCaveat(part)).toBe(false);
      expect(cardNoteForPart(clue, part)).toEqual({
        kind: 'open-question',
        label: 'Câu hỏi còn mở',
        text: clue.openQuestion,
      });
    }
  });

  it('Phần 5 hiện "Lưu ý" thay cho "Câu hỏi còn mở"', () => {
    expect(showsCaveat('ending')).toBe(true);
    expect(cardNoteForPart(clue, 'ending')).toEqual({ kind: 'caveat', label: 'Lưu ý', text: clue.caveat });
  });

  it('tài liệu không có "Câu hỏi còn mở" thì trước Phần 5 không hiện gì', () => {
    expect(cardNoteForPart(handoverLog, 'debrief')).toBeNull();
    expect(cardNoteForPart(handoverLog, 'ending')?.kind).toBe('caveat');
  });

  it('chưa vào phần nào → như trước Phần 5', () => {
    expect(cardNoteForPart(clue, null)?.kind).toBe('open-question');
  });
});
