/**
 * Runtime kể chuyện: từ nội dung + tiến trình → khung nhìn hiện tại và các hành động hợp lệ.
 * Reducer thuần: không import React, không đụng store; mọi thay đổi ngoài tiến trình
 * (mở manh mối, gắn chú thích, đặt cờ, telemetry) trả ra dưới dạng `effects`.
 */
import { PART_IDS } from '../../shared/ids';
import type { TelemetryEventBody } from '../../shared/telemetry/events';
import type {
  DialogueLine,
  ExploreNode,
  GateNode,
  Sequence,
  SequenceId,
  StoryContent,
  StoryNode,
} from '../types';
import {
  EMPTY_CHOICE_PROGRESS,
  createInitialProgress,
  type ChoiceProgress,
  type Cursor,
  type GateStatus,
  type StepResult,
  type StoryAction,
  type StoryActionType,
  type StoryContext,
  type StoryEffect,
  type StoryProgress,
  type StoryView,
} from './state';

export const DEFAULT_GATE_LABEL = 'Nhiệm vụ tiếp theo →';

/** Số node tự động tối đa xử lý liên tiếp — chặn vòng lặp [ĐI TỚI] khép kín. */
const MAX_AUTO_STEPS = 1000;

// ---------- Tra cứu nội dung ----------

const indexCache = new WeakMap<StoryContent, Map<SequenceId, Sequence>>();

export function sequenceIndex(content: StoryContent): Map<SequenceId, Sequence> {
  let map = indexCache.get(content);
  if (!map) {
    map = new Map(content.sequences.map((s) => [s.id, s]));
    indexCache.set(content, map);
  }
  return map;
}

export function findSequence(content: StoryContent, id: SequenceId): Sequence | undefined {
  return sequenceIndex(content).get(id);
}

function nodeAt(content: StoryContent, cursor: Cursor): StoryNode | undefined {
  return findSequence(content, cursor.sequenceId)?.nodes[cursor.nodeIndex];
}

// ---------- Sao chép tiến trình (bất biến với người gọi) ----------

function cloneProgress(p: StoryProgress): StoryProgress {
  return {
    ...p,
    cursor: { ...p.cursor },
    returnStack: p.returnStack.map((f) => ({ cursor: { ...f.cursor }, hotspotId: f.hotspotId })),
    partStartedAt: { ...p.partStartedAt },
    partCompletedAt: { ...p.partCompletedAt },
    visitedHotspots: [...p.visitedHotspots],
    choices: Object.fromEntries(Object.entries(p.choices).map(([k, v]) => [k, { ...v }])),
    flags: [...p.flags],
    interaction: p.interaction ? { ...p.interaction, lines: [...p.interaction.lines] } : null,
  };
}

// ---------- Bước nội bộ (mutate bản sao) ----------

interface Work {
  content: StoryContent;
  ctx: StoryContext;
  p: StoryProgress;
  effects: StoryEffect[];
}

function telemetry(w: Work, event: TelemetryEventBody): void {
  w.effects.push({ type: 'telemetry', event });
}

function enterPart(w: Work, seq: Sequence): void {
  const { p, ctx } = w;
  if (seq.part === p.currentPart) return;
  const prev = p.currentPart;
  if (prev !== null) {
    p.partCompletedAt[prev] = ctx.now;
    telemetry(w, { type: 'part_complete', part: prev, durationMs: ctx.now - (p.partStartedAt[prev] ?? ctx.now) });
  }
  p.currentPart = seq.part;
  if (p.partStartedAt[seq.part] === undefined) p.partStartedAt[seq.part] = ctx.now;
  telemetry(w, { type: 'part_start', part: seq.part });
}

function jumpTo(w: Work, to: SequenceId): boolean {
  const seq = findSequence(w.content, to);
  w.p.cursor = { sequenceId: to, nodeIndex: 0 };
  if (!seq) return false;
  enterPart(w, seq);
  telemetry(w, { type: 'scene_enter', scene: seq.scene, sequenceId: seq.id });
  return true;
}

/** Xử lý các node tự động cho tới khi gặp node cần người chơi (hoặc kết thúc/lỗi). */
function settle(w: Work): void {
  const { p, content } = w;
  for (let guard = 0; guard < MAX_AUTO_STEPS; guard++) {
    const seq = findSequence(content, p.cursor.sequenceId);
    if (!seq) return;
    const node = seq.nodes[p.cursor.nodeIndex];
    if (!node) {
      // Hết chuỗi: chuỗi con thì quay về điểm xem xét; chuỗi chính thì là lỗi nội dung (view 'error').
      const frame = p.returnStack.pop();
      if (!frame) return;
      p.cursor = { ...frame.cursor };
      const explore = nodeAt(content, p.cursor);
      if (explore?.type === 'explore') {
        const hotspot = explore.hotspots.find((h) => h.id === frame.hotspotId);
        if (!p.visitedHotspots.includes(frame.hotspotId)) p.visitedHotspots.push(frame.hotspotId);
        if (hotspot?.unlocksClue) w.effects.push({ type: 'unlock-evidence', evidenceId: hotspot.unlocksClue });
      }
      return;
    }
    switch (node.type) {
      case 'task':
        p.task = node.text;
        p.cursor.nodeIndex++;
        break;
      case 'note':
        p.cursor.nodeIndex++;
        break;
      case 'goto':
        if (!jumpTo(w, node.to)) return;
        break;
      case 'set-flag':
        if (!p.flags.includes(node.flag)) p.flags.push(node.flag);
        w.effects.push({ type: 'set-flag', flag: node.flag });
        p.cursor.nodeIndex++;
        break;
      case 'annotate-evidence':
        w.effects.push({ type: 'annotate-evidence', evidenceId: node.evidenceId, note: node.note, redact: node.redact });
        p.cursor.nodeIndex++;
        break;
      case 'end':
        if (!p.ended) {
          p.ended = true;
          p.endedAt = w.ctx.now;
          if (p.currentPart !== null) {
            p.partCompletedAt[p.currentPart] = w.ctx.now;
            telemetry(w, {
              type: 'part_complete',
              part: p.currentPart,
              durationMs: w.ctx.now - (p.partStartedAt[p.currentPart] ?? w.ctx.now),
            });
          }
          telemetry(w, { type: 'game_complete', durationMs: w.ctx.now - (p.startedAt ?? w.ctx.now) });
        }
        return;
      default:
        return;
    }
  }
}

function gateStatus(node: GateNode, ctx: StoryContext): GateStatus {
  const missing = node.requires.filter((id) => !ctx.hasEvidence(id));
  return { satisfied: missing.length === 0, missing, to: node.to, buttonLabel: node.buttonLabel ?? DEFAULT_GATE_LABEL };
}

function gateAfterExplore(seq: Sequence, exploreIndex: number, ctx: StoryContext): GateStatus | null {
  const next = seq.nodes[exploreIndex + 1];
  return next?.type === 'gate' ? gateStatus(next, ctx) : null;
}

// ---------- API công khai ----------

export function startStory(content: StoryContent, ctx: StoryContext): StepResult {
  const p = createInitialProgress(content.startSequenceId);
  p.startedAt = ctx.now;
  const w: Work = { content, ctx, p, effects: [] };
  telemetry(w, { type: 'game_start' });
  jumpTo(w, content.startSequenceId);
  settle(w);
  return { progress: w.p, effects: w.effects };
}

export function getStoryView(content: StoryContent, progress: StoryProgress, ctx: StoryContext): StoryView {
  const seq = findSequence(content, progress.cursor.sequenceId) ?? null;
  const base = { sequence: seq, task: progress.task, part: progress.currentPart };
  if (progress.interaction) {
    const it = progress.interaction;
    const line = it.lines[it.index];
    if (!line) return { ...base, kind: 'error', message: 'Phản hồi lựa chọn không có lời nào để hiện.' };
    return { ...base, kind: 'feedback', origin: it.origin, sourceId: it.sourceId, line, index: it.index, total: it.lines.length, then: it.then };
  }
  if (!seq) {
    return { ...base, kind: 'error', message: `Không tìm thấy chuỗi "${progress.cursor.sequenceId}" trong nội dung.` };
  }
  const node = seq.nodes[progress.cursor.nodeIndex];
  if (!node) {
    return { ...base, kind: 'error', message: `Chuỗi "${seq.id}" kết thúc mà không có [ĐI TỚI], [ĐIỀU KIỆN QUA] hay [KẾT THÚC].` };
  }
  switch (node.type) {
    case 'line':
      return { ...base, kind: 'line', node };
    case 'explore':
      return {
        ...base,
        kind: 'explore',
        node,
        hotspots: node.hotspots.map((h) => ({ ...h, visited: progress.visitedHotspots.includes(h.id) })),
        gate: gateAfterExplore(seq, progress.cursor.nodeIndex, ctx),
      };
    case 'gate':
      return { ...base, kind: 'gate', node, gate: gateStatus(node, ctx) };
    case 'question':
      return { ...base, kind: 'question', node, progress: progress.choices[node.question.id] ?? EMPTY_CHOICE_PROGRESS };
    case 'line-pick':
      return { ...base, kind: 'line-pick', node, progress: progress.choices[node.pick.id] ?? EMPTY_CHOICE_PROGRESS };
    case 'show-document':
      return { ...base, kind: 'show-document', node };
    case 'challenge':
      return { ...base, kind: 'challenge', node };
    case 'fix-query':
      return { ...base, kind: 'fix-query', node };
    case 'effect':
      return { ...base, kind: 'effect', node };
    case 'projector':
      return { ...base, kind: 'projector', node };
    case 'end':
      return { ...base, kind: 'end' };
    case 'task':
    case 'note':
    case 'goto':
    case 'set-flag':
    case 'annotate-evidence':
      return { ...base, kind: 'error', message: `Node tự động "${node.type}" chưa được xử lý (gọi startStory/stepStory trước).` };
  }
}

/** Các hành động hợp lệ tại khung nhìn hiện tại (giao diện dùng để bật/tắt nút). */
export function validActions(view: StoryView): StoryActionType[] {
  switch (view.kind) {
    case 'line':
    case 'feedback':
      return ['advance'];
    case 'explore':
      return view.gate?.satisfied ? ['inspect', 'proceed'] : ['inspect'];
    case 'gate':
      return view.gate.satisfied ? ['proceed'] : [];
    case 'question':
      return ['choose'];
    case 'line-pick':
      return ['pick-line'];
    case 'show-document':
    case 'challenge':
    case 'fix-query':
    case 'effect':
    case 'projector':
      return ['complete'];
    case 'end':
    case 'error':
      return [];
  }
}

type CompletableKind = 'show-document' | 'challenge' | 'fix-query' | 'effect' | 'projector';

function isCompletable(kind: StoryView['kind']): kind is CompletableKind {
  return kind === 'show-document' || kind === 'challenge' || kind === 'fix-query' || kind === 'effect' || kind === 'projector';
}

export function stepStory(content: StoryContent, progress: StoryProgress, ctx: StoryContext, action: StoryAction): StepResult {
  const view = getStoryView(content, progress, ctx);
  const reject = (why: string): StepResult => ({ progress, effects: [], rejected: why });
  const w: Work = { content, ctx, p: cloneProgress(progress), effects: [] };
  const done = (): StepResult => ({ progress: w.p, effects: w.effects });

  switch (action.type) {
    case 'advance': {
      if (view.kind === 'feedback') {
        const it = w.p.interaction;
        if (!it) return reject('Không có phản hồi đang hiện.');
        if (it.index + 1 < it.lines.length) {
          it.index++;
          return done();
        }
        w.p.interaction = null;
        if (it.then === 'advance') {
          w.p.cursor.nodeIndex++;
          settle(w);
        }
        return done();
      }
      if (view.kind === 'line') {
        w.p.cursor.nodeIndex++;
        settle(w);
        return done();
      }
      return reject(`Không thể "qua lời" ở khung nhìn ${view.kind}.`);
    }

    case 'choose': {
      if (view.kind !== 'question') return reject('Không có câu hỏi đang hiện.');
      const q = view.node.question;
      const choice = q.choices.find((c) => c.id === action.choiceId);
      if (!choice) return reject(`Lựa chọn "${action.choiceId}" không thuộc câu hỏi "${q.id}".`);
      const cp = recordChoice(w.p, q.id, choice.id, choice.correct);
      telemetry(w, {
        type: 'question_answered',
        questionId: q.id,
        choiceId: choice.id,
        attempt: cp.attempts,
        correct: choice.correct,
        isFirstChoice: cp.attempts === 1,
      });
      afterChoice(w, 'question', q.id, choice.feedback, choice.correct);
      return done();
    }

    case 'pick-line': {
      if (view.kind !== 'line-pick') return reject('Không có màn chọn dòng đang hiện.');
      const pick = view.node.pick;
      const line = pick.lines.find((l) => l.index === action.lineIndex);
      if (!line) return reject(`Dòng ${action.lineIndex} không có trong "${pick.id}".`);
      const cp = recordChoice(w.p, pick.id, String(line.index), line.correct);
      telemetry(w, {
        type: 'line_picked',
        pickId: pick.id,
        lineIndex: line.index,
        attempt: cp.attempts,
        correct: line.correct,
        isFirstChoice: cp.attempts === 1,
      });
      afterChoice(w, 'line-pick', pick.id, line.feedback, line.correct);
      return done();
    }

    case 'inspect': {
      if (view.kind !== 'explore') return reject('Không ở màn xem xét.');
      const hotspot = view.node.hotspots.find((h) => h.id === action.hotspotId);
      if (!hotspot) return reject(`Điểm xem xét "${action.hotspotId}" không có trong cảnh này.`);
      w.p.returnStack.push({ cursor: { ...w.p.cursor }, hotspotId: hotspot.id });
      telemetry(w, { type: 'hotspot_inspected', hotspotId: hotspot.id });
      if (!jumpTo(w, hotspot.runSequence)) return reject(`Chuỗi "${hotspot.runSequence}" của điểm xem xét không tồn tại.`);
      settle(w);
      return done();
    }

    case 'proceed': {
      const gate = view.kind === 'explore' ? view.gate : view.kind === 'gate' ? view.gate : null;
      if (!gate) return reject('Không có điều kiện qua cảnh ở đây.');
      if (!gate.satisfied) return reject(`Hồ sơ còn thiếu: ${gate.missing.join(', ')}.`);
      if (!jumpTo(w, gate.to)) return reject(`Chuỗi đích "${gate.to}" không tồn tại.`);
      settle(w);
      return done();
    }

    case 'complete': {
      if (!isCompletable(view.kind)) return reject(`Khung nhìn ${view.kind} không phải màn tương tác đóng được.`);
      if (view.kind === 'show-document') {
        w.effects.push({ type: 'unlock-evidence', evidenceId: view.node.documentId });
      } else if (view.kind === 'effect') {
        telemetry(w, { type: 'effect_shown', effectId: view.node.effectId });
      }
      w.p.cursor.nodeIndex++;
      settle(w);
      return done();
    }
  }
}

function recordChoice(p: StoryProgress, id: string, choiceId: string, correct: boolean): ChoiceProgress {
  const prev = p.choices[id] ?? EMPTY_CHOICE_PROGRESS;
  const next: ChoiceProgress = {
    attempts: prev.attempts + 1,
    firstChoiceId: prev.firstChoiceId ?? choiceId,
    resolvedChoiceId: correct ? choiceId : prev.resolvedChoiceId,
  };
  p.choices[id] = next;
  return next;
}

function afterChoice(w: Work, origin: 'question' | 'line-pick', sourceId: string, feedback: DialogueLine[], correct: boolean): void {
  if (feedback.length > 0) {
    w.p.interaction = { kind: 'feedback', origin, sourceId, lines: [...feedback], index: 0, then: correct ? 'advance' : 'retry' };
    return;
  }
  if (correct) {
    w.p.cursor.nodeIndex++;
    settle(w);
  }
}

/** Thứ tự phần: dùng cho thanh tiến trình và bộ kiểm. */
export function partOrder(part: string): number {
  return (PART_IDS as readonly string[]).indexOf(part);
}

/** Node hiện tại của một explore view (tiện cho test/giao diện). */
export function currentExploreNode(content: StoryContent, progress: StoryProgress): ExploreNode | null {
  const node = nodeAt(content, progress.cursor);
  return node?.type === 'explore' ? node : null;
}
