/**
 * Bộ kiểm toàn vẹn nội dung (hàm thuần). Gói `noi-dung` chạy trên kịch bản thật;
 * test của gói nen-mong chạy trên nội dung mẫu.
 *
 * Kiểm: tham chiếu (chuỗi, manh mối, tài liệu, vật chứng, thử thách, nhân vật, biểu cảm,
 * hiệu ứng, cờ); đi được tới [KẾT THÚC]; không chuỗi mồ côi (trừ chuỗi mở đầu); mọi câu hỏi
 * và chọn dòng có ≥ 1 lựa chọn đúng và id lựa chọn duy nhất; mọi điều kiện qua cảnh thỏa
 * được trên đường đi (giả định người chơi xem hết điểm xem xét); thứ tự phần không lùi.
 */
import {
  CHALLENGE_IDS,
  CLUE_IDS,
  DOCUMENT_IDS,
  PART_IDS,
  SCENE_IDS,
  STANDARD_HINT_IDS,
  isCharacterId,
  isDiagnosticCode,
  isEffectId,
  isEvidenceId,
  isExpressionOf,
  isQueryEvidenceId,
  isSpecialSpeakerId,
  type EvidenceId,
} from '../../shared/ids';
import { TABLE_COLUMNS, isTableName } from '../../sql-challenge/schema';
import { BUILDER_REGIONS, type ChallengeDefinition, type QueryModel } from '../../sql-challenge/types';
import type { GameContent } from '../../content/types';
import { FLAG_IDS } from '../../shared/ids';
import type { DialogueLine, MultipleChoiceQuestion, Sequence, StoryContent } from '../types';

export type IssueLevel = 'error' | 'warning';

export interface ContentIssue {
  level: IssueLevel;
  /** Mã ngắn để test lọc: `missing-sequence`, `orphan-sequence`, `gate-unsatisfiable`, … */
  code: string;
  /** Vị trí: `seq:inv-01#3`, `challenge:c1`, `clue:clue-signature-h`, … */
  where: string;
  message: string;
}

export interface ValidationResult {
  issues: ContentIssue[];
  errors: ContentIssue[];
  warnings: ContentIssue[];
  ok: boolean;
}

class Collector {
  readonly issues: ContentIssue[] = [];
  error(code: string, where: string, message: string): void {
    this.issues.push({ level: 'error', code, where, message });
  }
  warn(code: string, where: string, message: string): void {
    this.issues.push({ level: 'warning', code, where, message });
  }
}

// ---------- Lời thoại ----------

function checkLine(c: Collector, line: DialogueLine, where: string): void {
  const speaker: string = line.speaker;
  if (isSpecialSpeakerId(speaker)) {
    if (line.expression !== undefined) c.error('expression-on-special', where, `"${speaker}" không có biểu cảm.`);
  } else if (isCharacterId(speaker)) {
    const expr: string | undefined = line.expression;
    if (expr === undefined || !isExpressionOf(speaker, expr)) {
      c.error('bad-expression', where, `Biểu cảm "${String(expr)}" không thuộc nhân vật "${speaker}".`);
    }
  } else {
    c.error('unknown-speaker', where, `Người nói "${speaker}" không có trong QĐ-033.`);
  }
  if (line.text.trim().length === 0) c.error('empty-line', where, 'Lời thoại rỗng.');
}

function checkQuestion(c: Collector, q: MultipleChoiceQuestion, where: string, seenIds: Set<string>): void {
  if (seenIds.has(q.id)) c.error('duplicate-question-id', where, `Id câu hỏi "${q.id}" bị trùng.`);
  seenIds.add(q.id);
  checkLine(c, q.asker, `${where}/asker`);
  if (q.choices.length < 2) c.error('too-few-choices', where, `Câu hỏi "${q.id}" cần ≥ 2 lựa chọn.`);
  if (!q.choices.some((ch) => ch.correct)) c.error('no-correct-choice', where, `Câu hỏi "${q.id}" không có lựa chọn đúng.`);
  const ids = new Set<string>();
  for (const ch of q.choices) {
    if (ids.has(ch.id)) c.error('duplicate-choice-id', where, `Id lựa chọn "${ch.id}" trùng trong câu hỏi "${q.id}".`);
    ids.add(ch.id);
    if (ch.text.trim().length === 0) c.error('empty-choice', where, `Lựa chọn "${ch.id}" rỗng.`);
    ch.feedback.forEach((l, i) => checkLine(c, l, `${where}/choice:${ch.id}/feedback#${i}`));
  }
}

// ---------- Chuỗi và node ----------

interface WalkState {
  visited: Set<string>;
  available: Set<EvidenceId>;
  reachedEnd: boolean;
  partIndex: number;
}

function validateStoryStructure(c: Collector, content: GameContent, questionIds: Set<string>): void {
  const story: StoryContent = content.story;
  const ids = new Set<string>();
  const hotspotIds = new Set<string>();
  const pickIds = new Set<string>();
  const projectorIds = new Set<string>();
  const byId = new Map(story.sequences.map((s) => [s.id, s]));

  if (!byId.has(story.startSequenceId)) {
    c.error('missing-start', 'story', `Chuỗi mở đầu "${story.startSequenceId}" không tồn tại.`);
  }

  for (const seq of story.sequences) {
    const w = `seq:${seq.id}`;
    if (ids.has(seq.id)) c.error('duplicate-sequence-id', w, `Id chuỗi "${seq.id}" bị trùng.`);
    ids.add(seq.id);
    if (!(PART_IDS as readonly string[]).includes(seq.part)) c.error('bad-part', w, `Phần "${seq.part}" không hợp lệ.`);
    if (!(SCENE_IDS as readonly string[]).includes(seq.scene)) c.error('bad-scene', w, `Cảnh "${seq.scene}" không hợp lệ.`);
    if (seq.nodes.length === 0) c.error('empty-sequence', w, 'Chuỗi không có node.');

    seq.nodes.forEach((node, i) => {
      const wn = `${w}#${i}`;
      switch (node.type) {
        case 'line':
          checkLine(c, node, wn);
          break;
        case 'task':
          if (node.text.trim().length === 0) c.error('empty-task', wn, 'Nhiệm vụ rỗng.');
          break;
        case 'note':
          break;
        case 'goto':
          if (!byId.has(node.to)) c.error('missing-sequence', wn, `[ĐI TỚI ${node.to}] trỏ tới chuỗi không tồn tại.`);
          if (i !== seq.nodes.length - 1) c.warn('unreachable-after-goto', wn, 'Có node sau [ĐI TỚI]; chúng không bao giờ chạy.');
          break;
        case 'explore':
          if (node.hotspots.length === 0) c.error('empty-explore', wn, 'Nhóm điểm xem xét rỗng.');
          for (const h of node.hotspots) {
            if (hotspotIds.has(h.id)) c.error('duplicate-hotspot-id', wn, `Id điểm xem xét "${h.id}" bị trùng.`);
            hotspotIds.add(h.id);
            if (h.label.trim().length === 0) c.error('empty-hotspot-label', wn, `Điểm xem xét "${h.id}" không có nhãn.`);
            if (!byId.has(h.runSequence)) c.error('missing-sequence', wn, `Điểm xem xét "${h.id}" chạy chuỗi "${h.runSequence}" không tồn tại.`);
            if (h.unlocksClue !== undefined && !(h.unlocksClue in content.evidence.clues)) {
              c.error('missing-clue', wn, `Manh mối "${h.unlocksClue}" chưa có thẻ trong nội dung.`);
            }
          }
          break;
        case 'gate':
          if (!byId.has(node.to)) c.error('missing-sequence', wn, `[ĐIỀU KIỆN QUA] sang "${node.to}" không tồn tại.`);
          if (node.requires.length === 0) c.warn('empty-gate', wn, 'Điều kiện qua cảnh không yêu cầu gì.');
          for (const id of node.requires) {
            if (!isEvidenceId(id)) c.error('bad-evidence-id', wn, `"${id}" không phải định danh Hồ sơ theo QĐ-033.`);
          }
          if (i !== seq.nodes.length - 1) c.warn('unreachable-after-gate', wn, 'Có node sau [ĐIỀU KIỆN QUA]; chúng không bao giờ chạy.');
          break;
        case 'show-document':
          if (!(node.documentId in content.evidence.documents)) c.error('missing-document', wn, `Tài liệu "${node.documentId}" chưa có thẻ.`);
          break;
        case 'question':
          checkQuestion(c, node.question, wn, questionIds);
          break;
        case 'challenge':
        case 'fix-query':
          if (!(node.challengeId in content.challenges)) c.error('missing-challenge', wn, `Thử thách "${node.challengeId}" chưa có thẻ.`);
          break;
        case 'effect':
          if (!isEffectId(node.effectId)) c.error('bad-effect', wn, `Hiệu ứng "${node.effectId}" không có trong QĐ-033.`);
          break;
        case 'line-pick': {
          const pick = node.pick;
          if (pickIds.has(pick.id)) c.error('duplicate-pick-id', wn, `Id chọn dòng "${pick.id}" bị trùng.`);
          pickIds.add(pick.id);
          if (!pick.lines.some((l) => l.correct)) c.error('no-correct-line', wn, `Chọn dòng "${pick.id}" không có dòng đúng.`);
          const idx = new Set<number>();
          for (const l of pick.lines) {
            if (idx.has(l.index)) c.error('duplicate-line-index', wn, `Số dòng ${l.index} trùng trong "${pick.id}".`);
            idx.add(l.index);
            l.feedback.forEach((f, k) => checkLine(c, f, `${wn}/line:${l.index}/feedback#${k}`));
          }
          break;
        }
        case 'projector':
          if (projectorIds.has(node.projector.id)) c.error('duplicate-projector-id', wn, `Id màn chiếu "${node.projector.id}" bị trùng.`);
          projectorIds.add(node.projector.id);
          if (node.projector.source.kind === 'evidence' && !isQueryEvidenceId(node.projector.source.evidenceId)) {
            c.error('bad-evidence-id', wn, `Màn chiếu lấy SQL từ "${node.projector.source.evidenceId}" không phải vật chứng truy vấn.`);
          }
          if (node.projector.source.kind === 'sql' && node.projector.source.sql.trim().length === 0) {
            c.error('empty-projector-sql', wn, 'Màn chiếu không có SQL.');
          }
          break;
        case 'set-flag':
          if (!(FLAG_IDS as readonly string[]).includes(node.flag)) c.error('bad-flag', wn, `Cờ "${node.flag}" không hợp lệ.`);
          break;
        case 'annotate-evidence':
          if (!isEvidenceId(node.evidenceId)) c.error('bad-evidence-id', wn, `Chú thích gắn vào "${node.evidenceId}" không phải định danh Hồ sơ.`);
          if (node.note.trim().length === 0) c.error('empty-annotation', wn, 'Chú thích rỗng.');
          break;
        case 'end':
          if (i !== seq.nodes.length - 1) c.warn('unreachable-after-end', wn, 'Có node sau [KẾT THÚC].');
          break;
      }
    });
  }
}

/** Mô phỏng đường đi: thu thập Hồ sơ, kiểm điều kiện qua cảnh, phát hiện mồ côi, tới kết. */
function walkStory(c: Collector, content: GameContent): void {
  const byId = new Map(content.story.sequences.map((s) => [s.id, s]));
  const state: WalkState = { visited: new Set(), available: new Set(), reachedEnd: false, partIndex: -1 };

  const walk = (id: string, sub: boolean, from: string): void => {
    const seq = byId.get(id);
    if (!seq) return; // đã báo ở validateStoryStructure
    if (state.visited.has(id)) return;
    state.visited.add(id);
    const w = `seq:${seq.id}`;

    const pi = (PART_IDS as readonly string[]).indexOf(seq.part);
    if (!sub) {
      if (pi < state.partIndex) c.error('part-goes-backward', w, `Từ "${from}" quay lại phần "${seq.part}" (thứ tự phần phải tiến).`);
      else if (pi > state.partIndex + 1 && state.partIndex >= 0) c.warn('part-skipped', w, `Nhảy từ phần ${state.partIndex + 1} tới "${seq.part}", bỏ qua phần ở giữa.`);
      state.partIndex = Math.max(state.partIndex, pi);
    }

    for (let i = 0; i < seq.nodes.length; i++) {
      const node = seq.nodes[i];
      if (!node) continue;
      const wn = `${w}#${i}`;
      switch (node.type) {
        case 'show-document':
          state.available.add(node.documentId);
          break;
        case 'challenge':
        case 'fix-query': {
          const def = content.challenges[node.challengeId];
          if (def) state.available.add(def.content.evidence.id);
          break;
        }
        case 'explore':
          for (const h of node.hotspots) {
            walk(h.runSequence, true, seq.id);
            if (h.unlocksClue) state.available.add(h.unlocksClue);
          }
          break;
        case 'projector':
          if (node.projector.source.kind === 'evidence' && !state.available.has(node.projector.source.evidenceId)) {
            c.error('projector-evidence-unavailable', wn, `Màn chiếu cần vật chứng "${node.projector.source.evidenceId}" nhưng trên đường đi chưa có.`);
          }
          break;
        case 'annotate-evidence':
          if (!state.available.has(node.evidenceId)) c.warn('annotate-unavailable', wn, `Gắn chú thích vào "${node.evidenceId}" khi Hồ sơ chưa có nó.`);
          break;
        case 'gate': {
          if (sub) c.error('gate-in-subsequence', wn, 'Chuỗi con của điểm xem xét không được có [ĐIỀU KIỆN QUA].');
          const missing = node.requires.filter((r) => !state.available.has(r));
          if (missing.length > 0) c.error('gate-unsatisfiable', wn, `Điều kiện qua cảnh không thỏa được trên đường đi; thiếu: ${missing.join(', ')}.`);
          walk(node.to, false, seq.id);
          return;
        }
        case 'goto':
          if (sub) c.error('goto-in-subsequence', wn, 'Chuỗi con của điểm xem xét không được có [ĐI TỚI]; nó tự quay về cảnh.');
          walk(node.to, false, seq.id);
          return;
        case 'end':
          if (sub) c.error('end-in-subsequence', wn, 'Chuỗi con của điểm xem xét không được có [KẾT THÚC].');
          state.reachedEnd = true;
          return;
        default:
          break;
      }
    }
    if (!sub) c.error('sequence-falls-off', w, 'Chuỗi chính kết thúc mà không có [ĐI TỚI], [ĐIỀU KIỆN QUA] hay [KẾT THÚC].');
  };

  walk(content.story.startSequenceId, false, '(bắt đầu)');

  if (!state.reachedEnd) c.error('end-unreachable', 'story', 'Không đi được tới [KẾT THÚC] từ chuỗi mở đầu.');
  for (const seq of content.story.sequences) {
    if (!state.visited.has(seq.id)) c.error('orphan-sequence', `seq:${seq.id}`, 'Chuỗi mồ côi: không con trỏ nào dẫn tới.');
  }
  for (const clueId of CLUE_IDS) {
    if (!state.available.has(clueId)) c.warn('clue-never-unlocked', `clue:${clueId}`, 'Manh mối không được mở ở điểm xem xét nào.');
  }
  for (const docId of DOCUMENT_IDS) {
    if (!state.available.has(docId)) c.warn('document-never-shown', `doc:${docId}`, 'Tài liệu không được [HIỆN TÀI LIỆU] ở đâu.');
  }
}

// ---------- Thử thách, hồ sơ, gợi ý chuẩn ----------

function checkModel(c: Collector, model: QueryModel, where: string): void {
  if (model.table !== null) {
    if (!isTableName(model.table)) {
      c.error('bad-table', where, `Bảng "${String(model.table)}" không có trong schema.`);
      return;
    }
    const cols = TABLE_COLUMNS[model.table] as readonly string[];
    if (model.columns !== '*') {
      for (const col of model.columns) if (!cols.includes(col)) c.error('bad-column', where, `Cột "${col}" không thuộc bảng "${model.table}".`);
    }
    for (const cond of model.conditions) {
      if (!cols.includes(cond.column)) c.error('bad-column', where, `Điều kiện dùng cột "${cond.column}" không thuộc bảng "${model.table}".`);
      if (cond.op === 'in' && !Array.isArray(cond.value)) c.error('in-needs-list', where, `Điều kiện "${cond.id}" dùng IN phải có danh sách giá trị.`);
      if (cond.op !== 'in' && Array.isArray(cond.value)) c.error('list-needs-in', where, `Điều kiện "${cond.id}" có danh sách giá trị nhưng không dùng IN.`);
    }
  }
  if (model.conditions.length >= 2 && model.connector === null) {
    // Hợp lệ theo QĐ-039 (trạng thái "chưa chọn"); chỉ ghi nhận, không phải lỗi.
  }
}

function validateChallenges(c: Collector, content: GameContent, questionIds: Set<string>): void {
  const evidenceIds = new Set<string>();
  for (const id of CHALLENGE_IDS) {
    const def: ChallengeDefinition | undefined = content.challenges[id];
    const w = `challenge:${id}`;
    if (!def) {
      c.error('missing-challenge', w, `Thử thách "${id}" (QĐ-033) chưa có trong nội dung.`);
      continue;
    }
    const { spec, content: cc } = def;
    if (spec.id !== id) c.error('challenge-id-mismatch', w, `spec.id "${spec.id}" khác khóa "${id}".`);
    if (cc.id !== id) c.error('challenge-id-mismatch', w, `content.id "${cc.id}" khác khóa "${id}".`);
    if (!isTableName(spec.table)) c.error('bad-table', w, `Bảng "${String(spec.table)}" không có trong schema.`);
    else {
      const cols = TABLE_COLUMNS[spec.table] as readonly string[];
      for (const col of [...spec.requiredColumns, ...spec.encouragedColumns]) {
        if (!cols.includes(col)) c.error('bad-column', w, `Cột "${col}" không thuộc bảng "${spec.table}".`);
      }
    }
    if (spec.requiredColumns.length === 0) c.error('no-required-columns', w, 'Thử thách không có cột bắt buộc.');
    if (spec.referenceSql.trim().length === 0) c.error('empty-reference-sql', w, 'Thiếu SQL chuẩn.');
    if (spec.initialModel) checkModel(c, spec.initialModel, `${w}/initialModel`);

    if (!isQueryEvidenceId(cc.evidence.id)) c.error('bad-evidence-id', w, `Vật chứng "${cc.evidence.id}" không phải định danh ev-… của QĐ-033.`);
    if (evidenceIds.has(cc.evidence.id)) c.error('duplicate-evidence-id', w, `Vật chứng "${cc.evidence.id}" được hai thử thách cùng tạo.`);
    evidenceIds.add(cc.evidence.id);
    if (cc.prompt.trim().length === 0) c.error('empty-prompt', w, 'Đề bài rỗng.');
    if (cc.title.trim().length === 0) c.error('empty-title', w, 'Tiêu đề rỗng.');
    for (const clue of cc.relatedClues) {
      if (!(clue in content.evidence.clues)) c.error('missing-clue', w, `Manh mối liên quan "${clue}" chưa có thẻ.`);
    }
    cc.hints.forEach((h, i) => checkLine(c, h, `${w}/hint#${i + 1}`));
    if (cc.hints.length !== 3) c.error('hints-count', w, 'Cần đúng 3 mức gợi ý.');
    cc.steps.forEach((s, i) => {
      if (s.step !== i + 1) c.error('step-order', w, `Bước ${s.step} ở vị trí ${i + 1}.`);
      if (!(BUILDER_REGIONS as readonly string[]).includes(s.highlight)) c.error('bad-region', w, `Vùng nổi bật "${s.highlight}" không hợp lệ.`);
      checkLine(c, s.line, `${w}/step#${s.step}`);
    });
    for (const [code, resp] of Object.entries(cc.diagnosticLines)) {
      if (!isDiagnosticCode(code)) c.error('bad-diagnostic-code', w, `Mã chẩn đoán "${code}" không có trong QĐ-040.`);
      if (!resp) continue;
      if ('line' in resp) checkLine(c, resp.line, `${w}/diag:${code}`);
      else if (!(STANDARD_HINT_IDS as readonly string[]).includes(resp.useStandardHint)) {
        c.error('bad-standard-hint', w, `Gợi ý chuẩn "${resp.useStandardHint}" không tồn tại.`);
      }
    }
    checkLine(c, cc.onCorrect, `${w}/onCorrect`);
    if (cc.readQuestion) checkQuestion(c, cc.readQuestion, `${w}/readQuestion`, questionIds);
  }
  for (const key of Object.keys(content.challenges)) {
    if (!(CHALLENGE_IDS as readonly string[]).includes(key)) c.error('unknown-challenge', `challenge:${key}`, 'Thử thách không có trong QĐ-033.');
  }
}

function validateEvidenceCards(c: Collector, content: GameContent): void {
  for (const id of CLUE_IDS) {
    const card = content.evidence.clues[id];
    const w = `clue:${id}`;
    if (!card) {
      c.error('missing-clue', w, 'Thiếu thẻ manh mối.');
      continue;
    }
    if (card.id !== id) c.error('clue-id-mismatch', w, `card.id "${card.id}" khác khóa.`);
    if (card.title.trim().length === 0) c.error('empty-title', w, 'Thiếu tiêu đề.');
    if (card.openQuestion.trim().length === 0) c.error('empty-open-question', w, 'Thiếu "Câu hỏi còn mở" (QĐ-037).');
    if (card.caveat.trim().length === 0) c.error('empty-caveat', w, 'Thiếu "Lưu ý" (QĐ-037).');
    if (card.builderValue) {
      const bv = card.builderValue;
      const inSome = Object.values(TABLE_COLUMNS).some((cols) => (cols as readonly string[]).includes(bv.column));
      if (!inSome) c.error('bad-column', w, `Giá trị cho trình dựng trỏ cột "${bv.column}" không có trong schema.`);
    }
  }
  for (const id of DOCUMENT_IDS) {
    const card = content.evidence.documents[id];
    const w = `doc:${id}`;
    if (!card) {
      c.error('missing-document', w, 'Thiếu thẻ tài liệu.');
      continue;
    }
    if (card.id !== id) c.error('document-id-mismatch', w, `card.id "${card.id}" khác khóa.`);
    if (card.title.trim().length === 0) c.error('empty-title', w, 'Thiếu tiêu đề.');
    if (card.caveat.trim().length === 0) c.error('empty-caveat', w, 'Thiếu "Lưu ý" (QĐ-037).');
    const body = Array.isArray(card.body) ? card.body.join('') : card.body;
    if (body.trim().length === 0) c.error('empty-body', w, 'Nội dung tài liệu rỗng.');
  }
}

function validateHints(c: Collector, content: GameContent): void {
  for (const id of STANDARD_HINT_IDS) {
    const line = content.standardHints[id];
    if (!line) c.error('missing-standard-hint', `hint:${id}`, 'Thiếu câu gợi ý chuẩn.');
    else checkLine(c, line, `hint:${id}`);
  }
  for (const [code, resp] of Object.entries(content.commonDiagnosticLines)) {
    const w = `common-diag:${code}`;
    if (!isDiagnosticCode(code)) c.error('bad-diagnostic-code', w, 'Mã chẩn đoán không có trong QĐ-040.');
    if (!resp) continue;
    if ('line' in resp) checkLine(c, resp.line, w);
    else if (!(STANDARD_HINT_IDS as readonly string[]).includes(resp.useStandardHint)) c.error('bad-standard-hint', w, 'Gợi ý chuẩn không tồn tại.');
  }
}

// ---------- API ----------

export function validateContent(content: GameContent): ValidationResult {
  const c = new Collector();
  const questionIds = new Set<string>();
  validateStoryStructure(c, content, questionIds);
  walkStory(c, content);
  validateChallenges(c, content, questionIds);
  validateEvidenceCards(c, content);
  validateHints(c, content);
  const errors = c.issues.filter((i) => i.level === 'error');
  const warnings = c.issues.filter((i) => i.level === 'warning');
  return { issues: c.issues, errors, warnings, ok: errors.length === 0 };
}

/** Chuỗi một dòng/issue để in trong test hoặc bảng người quan sát. */
export function formatIssues(issues: ContentIssue[]): string {
  return issues.map((i) => `[${i.level}] ${i.code} @ ${i.where}: ${i.message}`).join('\n');
}

/** Tiện ích cho test: mọi chuỗi có phần theo đúng thứ tự tiến (không bắt buộc liên tiếp). */
export function sequencesByPart(story: StoryContent): Map<string, Sequence[]> {
  const map = new Map<string, Sequence[]>();
  for (const s of story.sequences) {
    const list = map.get(s.part) ?? [];
    list.push(s);
    map.set(s.part, list);
  }
  return map;
}
