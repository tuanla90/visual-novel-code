import { describe, expect, it } from 'vitest';
import { sampleContent } from '../../content/sample';
import type { GameContent } from '../../content/types';
import type { Sequence, StoryNode } from '../types';
import { formatIssues, validateContent } from './validate';

/** Bản sao sâu để sửa mà không đụng nội dung mẫu dùng chung. */
function clone(): GameContent {
  return structuredClone(sampleContent);
}

function seq(content: GameContent, id: string): Sequence {
  const s = content.story.sequences.find((x) => x.id === id);
  if (!s) throw new Error(`không có chuỗi ${id}`);
  return s;
}

function codes(content: GameContent): string[] {
  return validateContent(content).errors.map((i) => i.code);
}

describe('bộ kiểm toàn vẹn nội dung', () => {
  it('nội dung mẫu sạch: 0 lỗi, 0 cảnh báo', () => {
    const r = validateContent(sampleContent);
    expect(formatIssues(r.issues)).toBe('');
    expect(r.ok).toBe(true);
  });

  it('bắt [ĐI TỚI] trỏ tới chuỗi không tồn tại và chuỗi mồ côi', () => {
    const c = clone();
    const nodes = seq(c, 'intro-01').nodes;
    nodes[nodes.length - 1] = { type: 'goto', to: 'khong-co' };
    const r = codes(c);
    expect(r).toContain('missing-sequence');
    expect(r).toContain('orphan-sequence');
    expect(r).toContain('end-unreachable');
  });

  it('bắt câu hỏi không có lựa chọn đúng và id lựa chọn trùng', () => {
    const c = clone();
    const q = seq(c, 'inv-letter').nodes.find((n): n is Extract<StoryNode, { type: 'question' }> => n.type === 'question');
    if (!q) throw new Error('mẫu thiếu câu hỏi');
    for (const ch of q.question.choices) ch.correct = false;
    q.question.choices[1]!.id = q.question.choices[0]!.id;
    const r = codes(c);
    expect(r).toContain('no-correct-choice');
    expect(r).toContain('duplicate-choice-id');
  });

  it('bắt chọn dòng không có dòng đúng', () => {
    const c = clone();
    const lp = seq(c, 'deb-01').nodes.find((n): n is Extract<StoryNode, { type: 'line-pick' }> => n.type === 'line-pick');
    if (!lp) throw new Error('mẫu thiếu chọn dòng');
    for (const l of lp.pick.lines) l.correct = false;
    expect(codes(c)).toContain('no-correct-line');
  });

  it('bắt điều kiện qua cảnh không thỏa được trên đường đi', () => {
    const c = clone();
    const gate = seq(c, 'inv-01').nodes.find((n): n is Extract<StoryNode, { type: 'gate' }> => n.type === 'gate');
    if (!gate) throw new Error('mẫu thiếu gate');
    gate.requires = ['clue-signature-h', 'doc-handover-log'];
    const r = validateContent(c);
    const issue = r.errors.find((i) => i.code === 'gate-unsatisfiable');
    expect(issue?.message).toContain('doc-handover-log');
  });

  it('bắt biểu cảm không thuộc nhân vật và người nói lạ', () => {
    const c = clone();
    const nodes = seq(c, 'intro-01').nodes as Record<string, unknown>[];
    nodes[3] = { type: 'line', speaker: 'minh-anh', expression: 'smug', text: 'x' };
    nodes[4] = { type: 'line', speaker: 'thay-quang', expression: 'neutral', text: 'y' };
    const r = codes(c);
    expect(r).toContain('bad-expression');
    expect(r).toContain('unknown-speaker');
  });

  it('bắt tham chiếu tài liệu/thử thách/manh mối/hiệu ứng không tồn tại', () => {
    const c = clone();
    const nodes = seq(c, 'inv-letter').nodes as Record<string, unknown>[];
    nodes[0] = { type: 'show-document', documentId: 'doc-khong-co' };
    const ana = seq(c, 'ana-01').nodes as Record<string, unknown>[];
    ana[2] = { type: 'challenge', challengeId: 'c9' };
    const deb = seq(c, 'deb-02').nodes as Record<string, unknown>[];
    deb[0] = { type: 'effect', effectId: 'boom' };
    const inv = seq(c, 'inv-01').nodes.find((n): n is Extract<StoryNode, { type: 'explore' }> => n.type === 'explore');
    (inv!.hotspots[0] as unknown as Record<string, unknown>).unlocksClue = 'clue-la';
    const r = codes(c);
    expect(r).toEqual(expect.arrayContaining(['missing-document', 'missing-challenge', 'bad-effect', 'missing-clue']));
  });

  it('bắt chuỗi chính rơi khỏi cuối mà không có con trỏ', () => {
    const c = clone();
    seq(c, 'intro-01').nodes.pop();
    expect(codes(c)).toContain('sequence-falls-off');
  });

  it('bắt chuỗi con của điểm xem xét có [ĐI TỚI]', () => {
    const c = clone();
    seq(c, 'inv-bac-tu').nodes.push({ type: 'goto', to: 'inv-02' });
    expect(codes(c)).toContain('goto-in-subsequence');
  });

  it('bắt phần đi lùi', () => {
    const c = clone();
    seq(c, 'deb-01').part = 'intro';
    expect(codes(c)).toContain('part-goes-backward');
  });

  it('bắt thử thách thiếu thẻ và cột bắt buộc không thuộc bảng', () => {
    const c = clone();
    (c.challenges.c1.spec.requiredColumns as string[]).push('toa_nha');
    delete (c.challenges as Partial<typeof c.challenges>).c2;
    const r = codes(c);
    expect(r).toContain('bad-column');
    expect(r).toContain('missing-challenge');
  });

  it('bắt thẻ manh mối thiếu "Câu hỏi còn mở"/"Lưu ý" (QĐ-037)', () => {
    const c = clone();
    c.evidence.clues['clue-signature-h'].openQuestion = '';
    c.evidence.documents['doc-letter'].caveat = ' ';
    const r = codes(c);
    expect(r).toContain('empty-open-question');
    expect(r).toContain('empty-caveat');
  });

  it('cảnh báo node sau [ĐI TỚI] và manh mối không bao giờ được mở', () => {
    const c = clone();
    seq(c, 'intro-01').nodes.push({ type: 'line', speaker: 'narrator', text: 'không bao giờ chạy' });
    const explore = seq(c, 'inv-02').nodes.find((n): n is Extract<StoryNode, { type: 'explore' }> => n.type === 'explore');
    delete explore!.hotspots[1]!.unlocksClue;
    const r = validateContent(c);
    const warn = r.warnings.map((i) => i.code);
    expect(warn).toContain('unreachable-after-goto');
    expect(warn).toContain('clue-never-unlocked');
    expect(r.errors.map((i) => i.code)).toContain('gate-unsatisfiable');
  });
});
