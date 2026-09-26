// @vitest-environment node
/**
 * Test TRUNG THÀNH: dữ liệu ở src/content/real là bản chép nguyên văn docs/kich-ban-prototype.md.
 *
 * Kịch bản được đọc theo đúng "Quy ước đọc file" (testing/read-script.ts — bộ đọc chặt, gặp dòng lạ
 * là ném lỗi) rồi so HAI CHIỀU với dữ liệu: mỗi chuỗi, mỗi thẻ được làm phẳng thành danh sách khóa
 * `loại|trường|…|chữ` ở cả hai phía và so bằng toEqual — thiếu, thừa, sai thứ tự hay sai một ký tự
 * đều đỏ. Thêm một lưới an toàn: mọi chuỗi hiển thị nằm bất kỳ đâu trong dữ liệu phải có nguyên văn
 * trong kịch bản.
 */
import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { BLOCKING_DIAGNOSTIC_CODES, CLUE_IDS, DOCUMENT_IDS, CHALLENGE_IDS } from '../../shared/ids';
import { CHALLENGE_SPECS } from '../../sql-challenge/data/challenges';
import type { DiagnosticResponse } from '../../sql-challenge/types';
import { DEFAULT_GATE_LABEL } from '../../story/engine/runtime';
import type { MultipleChoiceQuestion, StoryNode } from '../../story/types';
import { realContent } from '.';
import {
  readScript,
  type RawChallengeCard,
  type RawDiagnosticResponse,
  type RawLine,
  type RawQuestion,
  type RawSequence,
} from './testing/read-script';

const MARKDOWN = readFileSync(new URL('../../../../docs/kich-ban-prototype.md', import.meta.url), 'utf8').replace(
  /\r\n?/g,
  '\n',
);
const script = readScript(MARKDOWN);

// ---------- Làm phẳng hai phía thành khóa so sánh ----------

type AnyLine = { speaker: string; expression?: string | null; text: string };

const lineKey = (l: AnyLine): string => `${l.speaker}|${l.expression ?? ''}|${l.text}`;

function questionKeys(q: {
  id: string;
  asker: { speaker: string; text: string };
  choices: { id: string; text: string; correct: boolean; feedback: AnyLine[] }[];
}): string[] {
  return [
    `question|${q.id}|${q.asker.speaker}|${q.asker.text}`,
    ...q.choices.flatMap((c) => [
      `choice|${c.id}|${c.correct ? 'ĐÚNG' : ''}|${c.text}`,
      ...c.feedback.map((f) => `feedback|${lineKey(f)}`),
    ]),
  ];
}

/** Dữ liệu → khóa. switch đủ 16 loại node: thêm loại mới mà quên ở đây thì typecheck báo. */
function nodeKeys(node: StoryNode): string[] {
  switch (node.type) {
    case 'line':
      return [`${node.display === 'card' ? 'card' : 'line'}|${lineKey(node)}`];
    case 'task':
      return [`task|${node.text}`];
    case 'note':
      return [`note|${node.text}`];
    case 'goto':
      return [`goto|${node.to}`];
    case 'explore':
      return node.hotspots.map((h) => `hotspot|${h.id}|${h.label}|${h.unlocksClue ?? ''}|${h.runSequence}`);
    case 'gate':
      return [`gate|${node.requires.join(', ')}|${node.buttonLabel ?? DEFAULT_GATE_LABEL}|${node.to}`];
    case 'show-document':
      return [`show-document|${node.documentId}`];
    case 'question':
      return questionKeys(node.question);
    case 'challenge':
      return [`challenge|${node.challengeId}`];
    case 'fix-query':
      return [`fix-query|${node.challengeId}`];
    case 'effect':
      return [`effect|${node.effectId}`];
    case 'line-pick':
      return [
        `line-pick|${node.pick.id}`,
        ...node.pick.lines.flatMap((l) => [
          `pick-line|${l.index}|${l.sql}|${l.correct ? 'ĐÚNG' : 'không'}`,
          ...l.feedback.map((f) => `feedback|${lineKey(f)}`),
        ]),
      ];
    case 'projector': {
      const p = node.projector;
      const src = p.source.kind === 'sql' ? `sql:${p.source.sql}` : `evidence:${p.source.evidenceId}`;
      return [`projector|${src}|run=${String(p.run)}|rows=${p.expectedRowCount ?? ''}|caption=${p.caption ?? ''}`];
    }
    case 'set-flag':
      return [`set-flag|${node.flag}`];
    case 'annotate-evidence':
      return [`annotate-evidence|${node.evidenceId}|${node.note}|redact=${String(node.redact)}`];
    case 'end':
      return ['end'];
  }
}

function dossierField(id: string, label: string): string {
  const card = script.dossier.find((d) => d.id === id);
  const value = card?.fields[label];
  if (value === undefined) throw new Error(`kịch bản: thẻ ${id} không có dòng "${label}"`);
  return value;
}

/** Vật chứng do màn sửa truy vấn gần nhất tạo ra (theo thẻ thử thách của kịch bản). */
function fixQueryEvidence(seqs: RawSequence[], upTo: RawSequence): string {
  let last: string | null = null;
  for (const s of seqs) {
    for (const it of s.items) if (it.kind === 'fix-query') last = it.id;
    if (s === upTo) break;
  }
  const ev = script.challenges.find((c) => c.id === last)?.evidence?.id;
  if (!ev) throw new Error('kịch bản: không tìm được vật chứng của màn sửa truy vấn trước màn chiếu');
  return ev;
}

/**
 * Kịch bản → khóa. Ba hiệu ứng phụ nằm trong [DÀN DỰNG] thành node tường minh NGAY SAU note
 * (ARCHITECTURE.md §5), suy ra từ chính chữ của note:
 * - "Màn chiếu hiện … kết quả N dòng": màn chiếu chạy thật, N dòng; SQL là khối ```sql ngay dưới
 *   (deb-01), không có khối thì là vật chứng của màn sửa truy vấn trước đó (deb-03).
 * - "Thẻ ev-… được gắn chú thích sau giải trình …": cờ hết quyền `access-revoked` (ids.ts: "đặt ở
 *   end-03") + gắn chú thích nguyên văn mục "Hồ sơ vật chứng › ev-…" (redact khi note nói "làm mờ").
 * - Lời ngay trước note "… hiện dạng thẻ chữ lớn …": thẻ chữ lớn (`display: 'card'`).
 */
function scriptKeys(seq: RawSequence): string[] {
  const out: string[] = [];
  const items = seq.items;
  for (let i = 0; i < items.length; i++) {
    const it = items[i];
    if (!it) continue;
    switch (it.kind) {
      case 'line': {
        const next = items[i + 1];
        const card = next?.kind === 'note' && next.text.includes('hiện dạng thẻ chữ lớn');
        out.push(`${card ? 'card' : 'line'}|${lineKey(it.line)}`);
        break;
      }
      case 'note': {
        out.push(`note|${it.text}`);
        const rows = /kết quả (\d+) dòng/.exec(it.text)?.[1];
        if (it.text.includes('Màn chiếu hiện') && rows !== undefined) {
          const next = items[i + 1];
          if (next?.kind === 'sql-block') {
            out.push(`projector|sql:${next.sql}|run=true|rows=${rows}|caption=`);
            i++;
          } else {
            out.push(`projector|evidence:${fixQueryEvidence(script.sequences, seq)}|run=true|rows=${rows}|caption=`);
          }
        }
        const annotated = /Thẻ (ev-[a-z0-9-]+) được gắn chú thích sau giải trình/.exec(it.text)?.[1];
        if (annotated) {
          out.push('set-flag|access-revoked');
          const redact = it.text.includes('bị làm mờ');
          out.push(`annotate-evidence|${annotated}|${dossierField(annotated, 'Chú thích')}|redact=${String(redact)}`);
        }
        break;
      }
      case 'sql-block':
        throw new Error(`kịch bản ${seq.id}: khối SQL không nằm ngay dưới một [DÀN DỰNG] "Màn chiếu hiện …"`);
      case 'task':
        out.push(`task|${it.text}`);
        break;
      case 'goto':
        out.push(`goto|${it.to}`);
        break;
      case 'hotspot':
        out.push(`hotspot|${it.id}|${it.label}|${it.clue}|${it.sequence}`);
        break;
      case 'gate':
        out.push(`gate|${it.requires.join(', ')}|${it.button}|${it.to}`);
        break;
      case 'show-document':
        out.push(`show-document|${it.id}`);
        break;
      case 'question':
        out.push(...questionKeys(it.question));
        break;
      case 'challenge':
        out.push(`challenge|${it.id}`);
        break;
      case 'fix-query':
        out.push(`fix-query|${it.id}`);
        break;
      case 'effect':
        out.push(`effect|${it.id}`);
        break;
      case 'line-pick':
        out.push(`line-pick|${it.id}`);
        for (const r of it.rows) {
          out.push(`pick-line|${r.index}|${r.sql}|${r.correct ? 'ĐÚNG' : 'không'}`);
          out.push(...r.feedback.map((f) => `feedback|${lineKey(f)}`));
        }
        break;
      case 'end':
        out.push('end');
        break;
    }
  }
  return out;
}

const toDialogue = (l: RawLine): AnyLine =>
  l.expression === null ? { speaker: l.speaker, text: l.text } : { speaker: l.speaker, expression: l.expression, text: l.text };

const toResponse = (r: RawDiagnosticResponse): unknown =>
  'line' in r ? { line: toDialogue(r.line) } : { useStandardHint: r.useStandardHint };

const plainResponse = (r: DiagnosticResponse | undefined): unknown =>
  r && 'line' in r ? { line: { ...r.line } } : r;

/** Câu hỏi của dữ liệu, bỏ biểu cảm người hỏi (kịch bản không ghi — kiểm riêng ở test quy ước). */
function questionShape(q: MultipleChoiceQuestion | RawQuestion): unknown {
  return {
    id: q.id,
    asker: { speaker: q.asker.speaker, text: q.asker.text },
    choices: q.choices.map((c) => ({
      id: c.id,
      text: c.text,
      correct: c.correct,
      feedback: c.feedback.map((f) => ('expression' in f && f.expression !== null ? { ...f } : { speaker: f.speaker, text: f.text })),
    })),
  };
}

function expectedChallenge(card: RawChallengeCard): unknown {
  const field = (label: string): string => {
    const v = card.fields[label];
    if (v === undefined) throw new Error(`kịch bản: thẻ ${card.id} thiếu dòng "${label}"`);
    return v;
  };
  if (!card.onCorrect) throw new Error(`kịch bản: thẻ ${card.id} thiếu [KHI ĐÚNG]`);
  return {
    id: card.id,
    title: field('Tiêu đề'),
    prompt: field('Đề bài hiển thị'),
    relatedClues: field('Manh mối liên quan').match(/clue-[a-z0-9-]+/g) ?? [],
    learningGoal: field('Mục tiêu học'),
    steps: card.steps.map((s) => ({ step: s.step, highlight: s.region, line: toDialogue(s.line) })),
    diagnosticLines: Object.fromEntries(card.diagnostics.map((d) => [d.code, toResponse(d.response)])),
    hints: card.hints.map((h) => toDialogue(h.line)),
    onCorrect: toDialogue(card.onCorrect),
    readQuestion: card.question ? questionShape(card.question) : null,
    evidence: card.evidence,
  };
}

// ---------- Test ----------

describe('kịch bản đọc được trọn (bộ đọc chặt)', () => {
  it('đủ 5 phần theo thứ tự, 19 chuỗi, 4 thẻ thử thách, 7 thẻ hồ sơ + chú thích ev-c3-shortlist', () => {
    expect(script.parts.map((p) => p.id)).toEqual(['intro', 'investigation', 'analysis', 'debrief', 'ending']);
    expect(script.sequences).toHaveLength(19);
    expect(script.challenges.map((c) => c.id)).toEqual([...CHALLENGE_IDS]);
    expect(script.dossier.map((d) => d.id)).toEqual([...CLUE_IDS, ...DOCUMENT_IDS, 'ev-c3-shortlist']);
  });
});

describe('chuỗi kể chuyện — hai chiều', () => {
  it('danh sách chuỗi: id, phần, cảnh, tiêu đề, thứ tự', () => {
    const data = realContent.story.sequences.map((s) => [s.id, s.part, s.scene, s.title]);
    expect(data).toEqual(script.sequences.map((s) => [s.id, s.part, s.scene, s.title]));
    expect(realContent.story.startSequenceId).toBe(script.sequences[0]?.id);
  });

  it.each(script.sequences.map((s) => s.id))('chuỗi %s: từng node khớp nguyên văn', (id) => {
    const expected = script.sequences.find((s) => s.id === id);
    const actual = realContent.story.sequences.find((s) => s.id === id);
    if (!expected || !actual) throw new Error(`thiếu chuỗi ${id}`);
    expect(actual.nodes.flatMap(nodeKeys)).toEqual(scriptKeys(expected));
  });

  it('biểu cảm người hỏi (kịch bản không ghi): lấy ở lời gần nhất của chính người đó ngay trước', () => {
    for (const seq of realContent.story.sequences) {
      const last = new Map<string, string>();
      for (const node of seq.nodes) {
        if (node.type === 'line' && node.expression) last.set(node.speaker, node.expression);
        if (node.type === 'question') {
          const a = node.question.asker;
          expect(a.expression, `${seq.id}/${node.question.id}`).toBe(last.get(a.speaker));
        }
      }
    }
    for (const id of CHALLENGE_IDS) {
      const c = realContent.challenges[id].content;
      if (c.readQuestion) expect(c.readQuestion.asker.expression, id).toBe(c.onCorrect.expression);
    }
  });
});

describe('thẻ thử thách, gợi ý chuẩn, nhận xét chung — hai chiều', () => {
  it.each([...CHALLENGE_IDS])('%s: nội dung hiển thị khớp nguyên văn', (id) => {
    const card = script.challenges.find((c) => c.id === id);
    if (!card) throw new Error(`kịch bản thiếu thẻ ${id}`);
    const c = realContent.challenges[id].content;
    const actual = {
      ...c,
      steps: c.steps.map((s) => ({ ...s, line: { ...s.line } })),
      diagnosticLines: Object.fromEntries(Object.entries(c.diagnosticLines).map(([k, v]) => [k, plainResponse(v)])),
      readQuestion: c.readQuestion ? questionShape(c.readQuestion) : null,
    };
    expect(actual).toEqual(expectedChallenge(card));
    // Thứ tự khóa [KHI: mã] = thứ tự liệt kê trong thẻ (thứ tự ưu tiên hiển thị).
    expect(Object.keys(c.diagnosticLines)).toEqual(card.diagnostics.map((d) => d.code));
    expect(card.hints.map((h) => h.level)).toEqual([1, 2, 3]);
  });

  it.each([...CHALLENGE_IDS])('%s: đặc tả engine khớp dòng "SQL chuẩn" / "Cột bắt buộc" của thẻ', (id) => {
    const card = script.challenges.find((c) => c.id === id);
    if (!card) throw new Error(`kịch bản thiếu thẻ ${id}`);
    const spec = realContent.challenges[id].spec;
    expect(spec).toBe(CHALLENGE_SPECS[id]); // ghép, không chép lại
    expect(card.sqlBlocks).toEqual([spec.referenceSql]);
    const cols = card.fields['Cột bắt buộc'] ?? '';
    const [requiredPart = ''] = cols.split(' · ');
    const [required = '', encouraged = ''] = requiredPart.split('(khuyến khích');
    const ticks = (s: string): string[] => [...s.matchAll(/`([a-z_]+)`/g)].map((m) => m[1] ?? '');
    expect(spec.requiredColumns).toEqual(ticks(required));
    expect(spec.encouragedColumns).toEqual(ticks(encouraged));
    expect(spec.expectedRowCount).toBe(Number(/Kết quả chuẩn: (\d+) dòng/.exec(cols)?.[1]));
    expect(spec.runHiddenDataset).toBe(/dataset ẩn: có/.test(cols));
    const preload = card.fields['Nạp sẵn vào trình dựng'];
    expect(spec.initialModel !== undefined).toBe(preload !== undefined);
    if (preload !== undefined) expect(spec.initialModel?.connector).toBe(/phép nối chung `OR`/.test(preload) ? 'OR' : null);
  });

  it('ba câu gợi ý chuẩn', () => {
    const expected = Object.fromEntries(script.standardHints.map((h) => [h.id, toDialogue(h.line)]));
    expect(realContent.standardHints).toEqual(expected);
    expect(Object.keys(realContent.standardHints)).toEqual(script.standardHints.map((h) => h.id));
  });

  it('nhận xét chung: đủ mã, đúng lời, ĐÚNG THỨ TỰ liệt kê', () => {
    const actual = Object.entries(realContent.commonDiagnosticLines).map(([k, v]) => [k, plainResponse(v)]);
    expect(actual).toEqual(script.commonDiagnostics.map((d) => [d.code, { line: toDialogue(d.line) }]));
  });

  it('QĐ-052: kịch bản liệt kê mã blocking đúng thứ tự engine — ở dòng quy ước ưu tiên và ở "Nhận xét chung"', () => {
    const convention = /lỗi không chạy được \(([^)]*)\)/.exec(MARKDOWN)?.[1] ?? '';
    expect([...convention.matchAll(/`([a-z-]+)`/g)].map((m) => m[1])).toEqual([...BLOCKING_DIAGNOSTIC_CODES]);
    const blocking = script.commonDiagnostics.map((d) => d.code).filter((c) => (BLOCKING_DIAGNOSTIC_CODES as readonly string[]).includes(c));
    expect(blocking).toEqual([...BLOCKING_DIAGNOSTIC_CODES]);
  });

  it('phản hồi tim-ra-roi của q-two-rows chính là câu gợi ý chuẩn hint-ask-or-conclude', () => {
    const node = realContent.story.sequences
      .flatMap((s) => s.nodes)
      .find((n) => n.type === 'question' && n.question.id === 'q-two-rows');
    const choice = node?.type === 'question' ? node.question.choices.find((c) => c.id === 'tim-ra-roi') : undefined;
    expect(choice?.feedback).toEqual([realContent.standardHints['hint-ask-or-conclude']]);
  });
});

describe('thẻ hồ sơ — hai chiều', () => {
  it.each([...CLUE_IDS])('%s', (id) => {
    const card = script.dossier.find((d) => d.id === id);
    if (!card) throw new Error(`kịch bản thiếu thẻ ${id}`);
    const f = card.fields;
    expect(Object.keys(f)).toEqual(['Tiêu đề', 'Nguồn', 'Nội dung', 'Giá trị cho trình dựng', 'Câu hỏi còn mở', 'Lưu ý']);
    const spec = f['Giá trị cho trình dựng'] ?? '';
    const ticks = [...spec.matchAll(/`([^`]+)`/g)].map((m) => m[1] ?? '');
    const value = ticks[0] ?? '';
    const title = f['Tiêu đề'] ?? '';
    expect(realContent.evidence.clues[id]).toEqual({
      id,
      title,
      source: f['Nguồn'],
      content: f['Nội dung'],
      builderValue: {
        // Nhãn ô chọn "Từ manh mối": kịch bản không ghi → ghép giá trị + tiêu đề thẻ (không chữ mới).
        label: `${value} — ${title}`,
        column: ticks[ticks.length - 1],
        suggestedOp: spec.includes('phép "bắt đầu bằng"') ? 'startsWith' : 'eq',
        value,
      },
      openQuestion: f['Câu hỏi còn mở'],
      caveat: f['Lưu ý'],
    });
  });

  it.each([...DOCUMENT_IDS])('%s', (id) => {
    const card = script.dossier.find((d) => d.id === id);
    if (!card) throw new Error(`kịch bản thiếu thẻ ${id}`);
    const f = card.fields;
    const bodyLabel = Object.keys(f).find((k) => k.startsWith('Nội dung hiển thị'));
    if (!bodyLabel) throw new Error(`kịch bản: thẻ ${id} thiếu "Nội dung hiển thị"`);
    const known = ['Tiêu đề', 'Nguồn', bodyLabel, 'Mặt ngoài phong bì', 'Câu hỏi còn mở', 'Lưu ý'];
    expect(Object.keys(f).filter((k) => !known.includes(k))).toEqual([]);
    const extra = f['Mặt ngoài phong bì'];
    expect(realContent.evidence.documents[id]).toEqual({
      id,
      title: f['Tiêu đề'],
      source: f['Nguồn'],
      body: card.quotes[bodyLabel] ?? f[bodyLabel],
      ...(extra !== undefined ? { extra: `Mặt ngoài phong bì: ${extra}` } : {}),
      ...(f['Câu hỏi còn mở'] !== undefined ? { openQuestion: f['Câu hỏi còn mở'] } : {}),
      caveat: f['Lưu ý'],
    });
  });

  it('tên game = phần trước " — " của tiêu đề kịch bản; không phải nội dung mẫu', () => {
    expect(realContent.meta.title).toBe(script.title.split(' — ')[0]);
    expect(realContent.meta.isSample).toBe(false);
  });
});

describe('lưới an toàn: mọi chuỗi hiển thị trong dữ liệu đều có nguyên văn trong kịch bản', () => {
  /** Trường chứa chữ người chơi đọc được (id, mã, loại node… không tính). `spec` là đặc tả engine. */
  const DISPLAY_KEYS = new Set([
    'text', 'title', 'label', 'prompt', 'learningGoal', 'description', 'source', 'content', 'body', 'extra',
    'openQuestion', 'caveat', 'note', 'sql', 'caption', 'buttonLabel',
  ]);

  function scriptStrings(): Set<string> {
    const s = new Set<string>();
    const addLine = (l: RawLine): void => void s.add(l.text);
    const addQuestion = (q: RawQuestion): void => {
      s.add(q.asker.text);
      for (const c of q.choices) {
        s.add(c.text);
        c.feedback.forEach(addLine);
      }
    };
    for (const seq of script.sequences) {
      s.add(seq.title);
      for (const it of seq.items) {
        if (it.kind === 'line') addLine(it.line);
        else if (it.kind === 'task' || it.kind === 'note') s.add(it.text);
        else if (it.kind === 'hotspot') s.add(it.label);
        else if (it.kind === 'gate') s.add(it.button);
        else if (it.kind === 'question') addQuestion(it.question);
        else if (it.kind === 'sql-block') s.add(it.sql);
        else if (it.kind === 'line-pick') {
          for (const r of it.rows) {
            s.add(r.sql);
            r.feedback.forEach(addLine);
          }
        }
      }
    }
    for (const h of script.standardHints) addLine(h.line);
    for (const d of script.commonDiagnostics) addLine(d.line);
    for (const c of script.challenges) {
      Object.values(c.fields).forEach((v) => s.add(v));
      c.steps.forEach((st) => addLine(st.line));
      c.hints.forEach((h) => addLine(h.line));
      for (const d of c.diagnostics) if ('line' in d.response) addLine(d.response.line);
      if (c.onCorrect) addLine(c.onCorrect);
      if (c.question) addQuestion(c.question);
      if (c.evidence) {
        s.add(c.evidence.title);
        s.add(c.evidence.description);
      }
    }
    for (const d of script.dossier) {
      for (const [k, v] of Object.entries(d.fields)) {
        s.add(v);
        s.add(`${k}: ${v}`);
      }
      Object.values(d.quotes).forEach((ps) => ps.forEach((p) => s.add(p)));
    }
    return s;
  }

  function displayStrings(value: unknown, key: string, path: string, out: { path: string; text: string }[]): void {
    if (typeof value === 'string') {
      if (DISPLAY_KEYS.has(key)) out.push({ path, text: value });
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((v, i) => displayStrings(v, key, `${path}[${i}]`, out));
      return;
    }
    if (value && typeof value === 'object') {
      for (const [k, v] of Object.entries(value)) {
        if (k === 'spec' || k === 'meta') continue;
        displayStrings(v, k, `${path}.${k}`, out);
      }
    }
  }

  it('không chuỗi nào ngoài kịch bản (trừ nhãn ô chọn ghép từ giá trị + tiêu đề thẻ)', () => {
    const known = scriptStrings();
    const found: { path: string; text: string }[] = [];
    displayStrings(realContent, '', 'realContent', found);
    const composedLabels = Object.values(realContent.evidence.clues).map((c) =>
      c.builderValue ? `${String(c.builderValue.value)} — ${c.title}` : '',
    );
    const stray = found.filter((f) => !known.has(f.text) && !composedLabels.includes(f.text));
    expect(stray).toEqual([]);
    expect(found.length).toBeGreaterThan(300);
  });
});

describe('số liệu kịch bản (BỐI CẢNH của brief gói 5) — kịch bản thô, bộ đọc, dữ liệu cùng khớp', () => {
  const storyText = MARKDOWN.slice(MARKDOWN.indexOf('## Phần 1'), MARKDOWN.indexOf('## Nội dung thử thách'));
  const rawCount = (text: string, re: RegExp): number => text.split('\n').filter((l) => re.test(l)).length;
  const items = script.sequences.flatMap((s) => s.items);
  const nodes = realContent.story.sequences.flatMap((s) => s.nodes);
  const countItems = (kind: string): number => items.filter((i) => i.kind === kind).length;
  const countNodes = (type: string): number => nodes.filter((n) => n.type === type).length;

  /** Dòng thô trong 5 Phần (không qua bộ đọc) · mục của bộ đọc · node của dữ liệu · số kỳ vọng. */
  const ROWS: { name: string; re: RegExp; item: string | null; node: string | null; n: number }[] = [
    { name: 'chuỗi `### `', re: /^### /, item: null, node: null, n: 19 },
    { name: 'lời thoại `- **người nói**`', re: /^- \*\*/, item: 'line', node: 'line', n: 89 },
    { name: '`> NHIỆM VỤ`', re: /^> NHIỆM VỤ: /, item: 'task', node: 'task', n: 16 },
    { name: '[HỎI] trong chuỗi truyện', re: /^- \[HỎI /, item: 'question', node: 'question', n: 3 },
    { name: '[ĐIỀU KIỆN QUA]', re: /^- \[ĐIỀU KIỆN QUA\]/, item: 'gate', node: 'gate', n: 4 },
    { name: '[HIỆN TÀI LIỆU]', re: /^- \[HIỆN TÀI LIỆU /, item: 'show-document', node: 'show-document', n: 3 },
    { name: '[HIỆU ỨNG]', re: /^- \[HIỆU ỨNG /, item: 'effect', node: 'effect', n: 2 },
    { name: '[CHỌN DÒNG]', re: /^- \[CHỌN DÒNG /, item: 'line-pick', node: 'line-pick', n: 1 },
    { name: '[DÀN DỰNG]', re: /^- \[DÀN DỰNG\] /, item: 'note', node: 'note', n: 28 },
    { name: '[ĐI TỚI]', re: /^- \[ĐI TỚI /, item: 'goto', node: 'goto', n: 11 },
    { name: '[THỬ THÁCH]', re: /^- \[THỬ THÁCH /, item: 'challenge', node: 'challenge', n: 3 },
    { name: '[SỬA TRUY VẤN]', re: /^- \[SỬA TRUY VẤN /, item: 'fix-query', node: 'fix-query', n: 1 },
    { name: '[KẾT THÚC]', re: /^- \[KẾT THÚC\]$/, item: 'end', node: 'end', n: 1 },
  ];

  it.each(ROWS)('$name: $n', ({ re, item, node, n }) => {
    expect(rawCount(storyText, re)).toBe(n);
    if (item) expect(countItems(item)).toBe(n);
    if (node) expect(countNodes(node)).toBe(n);
  });

  it('[ĐIỂM XEM XÉT]: 3 điểm; lời thoại gồm cả thẻ chữ lớn; bảng chọn dòng 5 dòng SQL', () => {
    expect(rawCount(storyText, /^- \[ĐIỂM XEM XÉT /)).toBe(3);
    expect(countItems('hotspot')).toBe(3);
    expect(nodes.flatMap((n) => (n.type === 'explore' ? n.hotspots : []))).toHaveLength(3);
    const pick = nodes.find((n) => n.type === 'line-pick');
    expect(pick?.type === 'line-pick' ? pick.pick.lines.map((l) => l.index) : []).toEqual([1, 2, 3, 4, 5]);
  });

  it('[HỎI]: 3 trong chuỗi truyện + 3 câu đọc kết quả trong thẻ thử thách = 6 dòng [HỎI] của cả tệp', () => {
    expect(rawCount(MARKDOWN, /^- \[HỎI /)).toBe(6);
    expect(script.challenges.filter((c) => c.question).map((c) => c.question?.id)).toEqual(['q-c1-read', 'q-c2-read', 'q-c3-read']);
    expect(CHALLENGE_IDS.map((id) => realContent.challenges[id].content.readQuestion?.id ?? null)).toEqual([
      'q-c1-read',
      'q-c2-read',
      'q-c3-read',
      null,
    ]);
  });

  it('[ĐIỀU KIỆN QUA] và [HIỆN TÀI LIỆU] ở cả tệp: thêm đúng một dòng quy ước / chỉ dẫn mỗi loại', () => {
    expect(MARKDOWN.split('\n').filter((l) => l.includes('[ĐIỀU KIỆN QUA]'))).toHaveLength(5);
    expect(MARKDOWN.split('\n').filter((l) => /^- \[HIỆN TÀI LIỆU /.test(l))).toHaveLength(3);
  });
});
