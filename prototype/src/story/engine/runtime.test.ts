import { describe, expect, it } from 'vitest';
import { sampleContent } from '../../content/sample';
import type { EvidenceId } from '../../shared/ids';
import type { TelemetryEventBody } from '../../shared/telemetry/events';
import { getStoryView, startStory, stepStory, validActions } from './runtime';
import type { StoryAction, StoryContext, StoryEffect, StoryProgress, StoryView } from './state';

/** Bộ mô phỏng store: giữ Hồ sơ, áp hiệu ứng, gom telemetry. */
class Harness {
  progress: StoryProgress;
  evidence = new Set<EvidenceId>();
  flags: string[] = [];
  annotations: { evidenceId: string; note: string; redact: boolean }[] = [];
  events: TelemetryEventBody[] = [];
  now = 1_000;
  private readonly story = sampleContent.story;

  constructor() {
    const r = startStory(this.story, this.ctx());
    this.progress = r.progress;
    this.apply(r.effects);
  }

  ctx(): StoryContext {
    return { now: this.now, hasEvidence: (id) => this.evidence.has(id) };
  }

  view(): StoryView {
    return getStoryView(this.story, this.progress, this.ctx());
  }

  step(action: StoryAction): string | undefined {
    this.now += 1_000;
    const r = stepStory(this.story, this.progress, this.ctx(), action);
    this.progress = r.progress;
    this.apply(r.effects);
    return r.rejected;
  }

  apply(effects: StoryEffect[]): void {
    for (const e of effects) {
      switch (e.type) {
        case 'unlock-evidence':
          this.evidence.add(e.evidenceId);
          break;
        case 'annotate-evidence':
          this.annotations.push({ evidenceId: e.evidenceId, note: e.note, redact: e.redact });
          break;
        case 'set-flag':
          this.flags.push(e.flag);
          break;
        case 'telemetry':
          this.events.push(e.event);
          break;
      }
    }
  }

  /** Qua hết các lời liên tiếp. */
  skipLines(max = 50): void {
    for (let i = 0; i < max && this.view().kind === 'line'; i++) {
      expect(this.step({ type: 'advance' })).toBeUndefined();
    }
  }

  /** Qua hết phản hồi đang hiện. */
  skipFeedback(): void {
    for (let i = 0; i < 20 && this.view().kind === 'feedback'; i++) {
      expect(this.step({ type: 'advance' })).toBeUndefined();
    }
  }

  /** Mô phỏng màn thử thách đã lưu vật chứng rồi đóng. */
  completeChallenge(): void {
    const v = this.view();
    expect(['challenge', 'fix-query']).toContain(v.kind);
    if (v.kind === 'challenge' || v.kind === 'fix-query') {
      this.evidence.add(sampleContent.challenges[v.node.challengeId].content.evidence.id);
    }
    expect(this.step({ type: 'complete' })).toBeUndefined();
  }
}

describe('runtime kể chuyện — trọn luồng trên nội dung mẫu', () => {
  it('bắt đầu ở chuỗi mở đầu, phát game_start + part_start(intro) + scene_enter, xử lý task/note tự động', () => {
    const h = new Harness();
    const v = h.view();
    expect(v.kind).toBe('line');
    expect(v.sequence?.id).toBe('intro-01');
    expect(v.task).toContain('Nghe Minh Anh');
    expect(v.part).toBe('intro');
    expect(h.events.map((e) => e.type)).toEqual(['game_start', 'part_start', 'scene_enter']);
    expect(validActions(v)).toEqual(['advance']);
  });

  it('đi hết Phần 1 → Phần 2: goto đổi phần, phát part_complete(intro) rồi part_start(investigation)', () => {
    const h = new Harness();
    h.skipLines();
    const v = h.view();
    expect(v.kind).toBe('explore');
    expect(v.part).toBe('investigation');
    const parts = h.events.filter((e) => e.type === 'part_start' || e.type === 'part_complete');
    expect(parts).toEqual([
      { type: 'part_start', part: 'intro' },
      { type: 'part_complete', part: 'intro', durationMs: expect.any(Number) },
      { type: 'part_start', part: 'investigation' },
    ]);
  });

  it('điểm xem xét: chạy chuỗi con (tài liệu → câu hỏi → lời), quay về cảnh, mở manh mối, gate mở', () => {
    const h = new Harness();
    h.skipLines();
    let v = h.view();
    expect(v.kind).toBe('explore');
    if (v.kind !== 'explore') return;
    expect(v.hotspots).toEqual([expect.objectContaining({ id: 'hs-letter', visited: false })]);
    expect(v.gate).toEqual(expect.objectContaining({ satisfied: false, missing: ['clue-signature-h'] }));
    expect(validActions(v)).toEqual(['inspect']);
    expect(h.step({ type: 'proceed' })).toMatch(/thiếu/);

    expect(h.step({ type: 'inspect', hotspotId: 'hs-letter' })).toBeUndefined();
    v = h.view();
    expect(v.kind).toBe('show-document');
    expect(h.step({ type: 'advance' })).toMatch(/không thể/i);
    expect(h.step({ type: 'complete' })).toBeUndefined();
    expect(h.evidence.has('doc-letter')).toBe(true);

    h.skipLines();
    v = h.view();
    expect(v.kind).toBe('question');
    if (v.kind !== 'question') return;
    expect(v.node.question.id).toBe('q-sig-h');

    // Chọn sai → phản hồi → chọn lại; ghi lựa chọn đầu tiên
    expect(h.step({ type: 'choose', choiceId: 'khong-co' })).toMatch(/không thuộc/);
    expect(h.step({ type: 'choose', choiceId: 'ho' })).toBeUndefined();
    v = h.view();
    expect(v.kind).toBe('feedback');
    if (v.kind === 'feedback') expect(v.then).toBe('retry');
    h.skipFeedback();
    v = h.view();
    expect(v.kind).toBe('question');
    if (v.kind === 'question') expect(v.progress).toEqual({ attempts: 1, firstChoiceId: 'ho', resolvedChoiceId: null });

    expect(h.step({ type: 'choose', choiceId: 'ten' })).toBeUndefined();
    h.skipFeedback();
    expect(h.progress.choices['q-sig-h']).toEqual({ attempts: 2, firstChoiceId: 'ho', resolvedChoiceId: 'ten' });
    const answered = h.events.filter((e) => e.type === 'question_answered');
    expect(answered).toEqual([
      expect.objectContaining({ questionId: 'q-sig-h', choiceId: 'ho', attempt: 1, correct: false, isFirstChoice: true }),
      expect.objectContaining({ questionId: 'q-sig-h', choiceId: 'ten', attempt: 2, correct: true, isFirstChoice: false }),
    ]);

    // Lời cuối chuỗi con → hết chuỗi → quay về explore, manh mối mở, gate thỏa
    h.skipLines();
    v = h.view();
    expect(v.kind).toBe('explore');
    if (v.kind !== 'explore') return;
    expect(v.sequence?.id).toBe('inv-01');
    expect(v.hotspots[0]?.visited).toBe(true);
    expect(h.evidence.has('clue-signature-h')).toBe(true);
    expect(v.gate?.satisfied).toBe(true);
    expect(validActions(v)).toEqual(['inspect', 'proceed']);
    expect(h.progress.returnStack).toEqual([]);
  });

  it('chạy trọn 5 phần tới [KẾT THÚC]: mọi loại node đều đi qua; cờ, chú thích, game_complete', () => {
    const h = new Harness();
    const seen = new Set<string>();
    const act = (a: StoryAction): void => {
      expect(h.step(a)).toBeUndefined();
    };

    for (let guard = 0; guard < 500 && !h.progress.ended; guard++) {
      const v = h.view();
      seen.add(v.kind);
      switch (v.kind) {
        case 'line':
        case 'feedback':
          act({ type: 'advance' });
          break;
        case 'explore': {
          const next = v.hotspots.find((hs) => !hs.visited);
          if (next) act({ type: 'inspect', hotspotId: next.id });
          else {
            expect(v.gate?.satisfied).toBe(true);
            act({ type: 'proceed' });
          }
          break;
        }
        case 'gate':
          expect(v.gate.satisfied).toBe(true);
          act({ type: 'proceed' });
          break;
        case 'question': {
          const correct = v.node.question.choices.find((c) => c.correct);
          act({ type: 'choose', choiceId: correct?.id ?? '' });
          break;
        }
        case 'line-pick': {
          // Chạm dòng sai trước để đi qua nhánh phản hồi nhiều người nói
          if (v.progress.attempts === 0) act({ type: 'pick-line', lineIndex: 1 });
          else act({ type: 'pick-line', lineIndex: 4 });
          break;
        }
        case 'challenge':
        case 'fix-query':
          h.completeChallenge();
          break;
        case 'show-document':
        case 'effect':
        case 'projector':
          act({ type: 'complete' });
          break;
        case 'end':
        case 'error':
          throw new Error(`Khung nhìn bất ngờ: ${v.kind}`);
      }
    }

    expect(h.progress.ended).toBe(true);
    expect(h.view().kind).toBe('end');
    expect(validActions(h.view())).toEqual([]);
    for (const kind of ['line', 'feedback', 'explore', 'gate', 'question', 'line-pick', 'challenge', 'fix-query', 'show-document', 'effect', 'projector']) {
      expect(seen.has(kind), `chưa đi qua khung nhìn ${kind}`).toBe(true);
    }
    expect(h.flags).toEqual(['access-revoked']);
    expect(h.annotations).toEqual([expect.objectContaining({ evidenceId: 'ev-c3-shortlist', redact: true })]);
    expect(h.progress.choices['q-quan-lines']).toEqual({ attempts: 2, firstChoiceId: '1', resolvedChoiceId: '4' });

    const types = h.events.map((e) => e.type);
    expect(types.filter((t) => t === 'part_start')).toHaveLength(5);
    expect(types.filter((t) => t === 'part_complete')).toHaveLength(5);
    expect(types.filter((t) => t === 'effect_shown')).toHaveLength(2);
    expect(types.at(-1)).toBe('game_complete');
    expect(h.progress.partCompletedAt.ending).toBeDefined();
    expect(h.evidence).toEqual(
      new Set<EvidenceId>([
        'doc-letter',
        'clue-signature-h',
        'clue-box-building-b',
        'clue-bookmark-baochi',
        'doc-bookmark',
        'ev-c1-names-h',
        'ev-c2-classes-b',
        'ev-c3-shortlist',
        'ev-quan-fixed',
        'doc-handover-log',
      ]),
    );
    // Thẻ chữ lớn của narrator
    const cardLine = sampleContent.story.sequences.find((s) => s.id === 'end-02')?.nodes[0];
    expect(cardLine).toEqual(expect.objectContaining({ type: 'line', display: 'card' }));
  });

  it('stepStory không sửa tiến trình đầu vào; hành động sai bị từ chối mà không đổi gì', () => {
    const h = new Harness();
    const before = JSON.stringify(h.progress);
    const snapshot = h.progress;
    h.step({ type: 'advance' });
    expect(JSON.stringify(snapshot)).toBe(before);
    expect(h.progress).not.toBe(snapshot);

    const rejected = h.step({ type: 'choose', choiceId: 'x' });
    expect(rejected).toMatch(/câu hỏi/);
    expect(h.step({ type: 'inspect', hotspotId: 'hs-letter' })).toMatch(/xem xét/);
    expect(h.step({ type: 'complete' })).toMatch(/không phải màn tương tác/);
  });

  it('khung nhìn lỗi khi con trỏ trỏ vào chuỗi không tồn tại (không ném)', () => {
    const h = new Harness();
    h.progress = { ...h.progress, cursor: { sequenceId: 'khong-co', nodeIndex: 0 } };
    const v = h.view();
    expect(v.kind).toBe('error');
    if (v.kind === 'error') expect(v.message).toMatch(/Không tìm thấy chuỗi/);
    expect(validActions(v)).toEqual([]);
  });
});
