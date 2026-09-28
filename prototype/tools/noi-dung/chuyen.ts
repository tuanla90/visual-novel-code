/**
 * BỘ CHUYỂN "kết quả đọc → dữ liệu game" (gói 12a-2): `RawScript` của bộ đọc → các khối dữ liệu có
 * đúng hình dạng `GameContent` (trừ `spec` của thử thách, do engine ghép — `CHALLENGE_SPECS`).
 *
 * Mọi luật trước đây nằm rải trong bản chép tay `src/content/real/**` nay nằm ở đây:
 * - `[ĐIỂM XEM XÉT]` liền nhau → MỘT node `explore` (nhiều hotspot, chọn thứ tự tùy ý).
 * - `[ĐIỀU KIỆN QUA]` có nút đúng nhãn mặc định → bỏ `buttonLabel` (runtime tự dùng nhãn mặc định).
 * - Biểu cảm người hỏi ở `[HỎI]` (kịch bản không ghi): lấy ở lời GẦN NHẤT của chính người đó ngay trước,
 *   trong cùng chuỗi; ở câu đọc kết quả của thẻ thử thách: lấy ở lời `[KHI ĐÚNG]` (lời ngay trước).
 * - Thẻ hồ sơ `clue-…` → manh mối (nhãn ô chọn "Từ manh mối" = `<giá trị> — <tiêu đề>`, không thêm chữ
 *   mới); `doc-…` → tài liệu (đoạn trích `> …` → mảng); `ev-…` chỉ cấp chú thích cho `[CHÚ THÍCH HỒ SƠ]`.
 * - Tên game = phần trước " — " của tiêu đề `# …` ở quy-uoc.md.
 *
 * THỨ TỰ KHÓA của từng đối tượng giữ đúng như bản chép tay cũ (JSON của dữ liệu sinh bằng đúng JSON cũ —
 * kiểm một lần khi xóa bản chép tay, gói 12a-2). Thứ tự khóa `diagnosticLines`/`commonDiagnosticLines`
 * là thứ tự ưu tiên hiển thị (QĐ-047) = thứ tự liệt kê trong nội dung.
 *
 * Không import gì từ `src/`. Nội dung sai hình dạng (thiếu dòng bắt buộc…) → ném lỗi có `<tệp>:<dòng>`.
 */
import type {
  RawChallengeCard,
  RawDiagnosticResponse,
  RawDossierCard,
  RawLine,
  RawQuestion,
  RawScript,
  RawSequence,
  ViTri,
} from './doc.ts';
import type { ModelNapSan } from './nap-san.ts';

/** Nhãn nút mặc định của `[ĐIỀU KIỆN QUA]` — phải bằng `DEFAULT_GATE_LABEL` của runtime (test khẳng định). */
export const NHAN_NUT_MAC_DINH = 'Nhiệm vụ tiếp theo →';

type Obj = Record<string, unknown>;

export interface SqlThuThach {
  /** Khối ```sql dưới "SQL chuẩn:". */
  referenceSql: string;
  /** Khối ```sql dưới "Truy vấn nạp sẵn:" (chỉ thẻ có nạp sẵn). */
  preloadSql?: string;
  /** Model trình dựng đọc từ "Truy vấn nạp sẵn" + "Nguồn điều kiện nạp sẵn". */
  initialModel?: ModelNapSan;
}

export interface DuLieuSinh {
  /** `meta.title` của GameContent. */
  tieuDe: string;
  story: { startSequenceId: string; sequences: Obj[] };
  evidence: { clues: Record<string, Obj>; documents: Record<string, Obj> };
  /** mã thử thách → ChallengeContent. */
  challenges: Record<string, Obj>;
  challengeSql: Record<string, SqlThuThach>;
  standardHints: Record<string, Obj>;
  commonDiagnosticLines: Record<string, Obj>;
}

const o = (vt: ViTri): string => `${vt.tep}:${vt.dong}`;

function dialogue(l: RawLine): Obj {
  return l.expression === null ? { speaker: l.speaker, text: l.text } : { speaker: l.speaker, expression: l.expression, text: l.text };
}

function response(r: RawDiagnosticResponse): Obj {
  return 'line' in r ? { line: dialogue(r.line) } : { useStandardHint: r.useStandardHint };
}

function question(q: RawQuestion, askerExpression: string | undefined, noi: string): Obj {
  if (askerExpression === undefined) {
    throw new Error(`${noi}: [HỎI ${q.id}] — không tìm được biểu cảm của "${q.asker.speaker}" (lấy ở lời gần nhất của chính người đó ngay trước câu hỏi)`);
  }
  return {
    id: q.id,
    asker: { speaker: q.asker.speaker, expression: askerExpression, text: q.asker.text },
    choices: q.choices.map((c) => ({ id: c.id, text: c.text, correct: c.correct, feedback: c.feedback.map(dialogue) })),
  };
}

function sequence(seq: RawSequence): Obj {
  const nodes: Obj[] = [];
  /** Biểu cảm gần nhất của từng người nói trong chuỗi (cho người hỏi ở `[HỎI]`). */
  const bieuCam = new Map<string, string>();
  for (const [k, it] of seq.items.entries()) {
    const noi = `${seq.viTri.tep}:${seq.itemDong[k] ?? seq.viTri.dong}`;
    switch (it.kind) {
      case 'line': {
        const l = it.line;
        if (l.expression !== null) bieuCam.set(l.speaker, l.expression);
        const node: Obj = { type: 'line', speaker: l.speaker };
        if (l.expression !== null) node.expression = l.expression;
        if (it.card) node.display = 'card';
        node.text = l.text;
        nodes.push(node);
        break;
      }
      case 'task':
      case 'note':
        nodes.push({ type: it.kind, text: it.text });
        break;
      case 'goto':
        nodes.push({ type: 'goto', to: it.to });
        break;
      case 'hotspot': {
        const hs = { id: it.id, label: it.label, unlocksClue: it.clue, runSequence: it.sequence };
        const prev = nodes[nodes.length - 1];
        const prevItem = seq.items[k - 1];
        if (prev && prev.type === 'explore' && prevItem?.kind === 'hotspot') (prev.hotspots as Obj[]).push(hs);
        else nodes.push({ type: 'explore', hotspots: [hs] });
        break;
      }
      case 'gate':
        nodes.push({
          type: 'gate',
          requires: it.requires,
          to: it.to,
          ...(it.button !== NHAN_NUT_MAC_DINH ? { buttonLabel: it.button } : {}),
        });
        break;
      case 'show-document':
        nodes.push({ type: 'show-document', documentId: it.id });
        break;
      case 'question':
        nodes.push({ type: 'question', question: question(it.question, bieuCam.get(it.question.asker.speaker), noi) });
        break;
      case 'challenge':
      case 'fix-query':
        nodes.push({ type: it.kind, challengeId: it.id });
        break;
      case 'effect':
        nodes.push({ type: 'effect', effectId: it.id });
        break;
      case 'line-pick':
        nodes.push({
          type: 'line-pick',
          pick: {
            id: it.id,
            lines: it.rows.map((r) => ({ index: r.index, sql: r.sql, correct: r.correct, feedback: r.feedback.map(dialogue) })),
          },
        });
        break;
      case 'projector': {
        const source = it.source.kind === 'sql' ? { kind: 'sql', sql: it.source.sql } : { kind: 'evidence', evidenceId: it.source.evidenceId };
        nodes.push({
          type: 'projector',
          projector: { id: it.id, source, run: it.run, ...(it.rows !== null ? { expectedRowCount: it.rows } : {}) },
        });
        break;
      }
      case 'set-flag':
        nodes.push({ type: 'set-flag', flag: it.flag });
        break;
      case 'annotate-evidence':
        nodes.push({ type: 'annotate-evidence', evidenceId: it.id, note: it.note, redact: it.redact });
        break;
      case 'end':
        nodes.push({ type: 'end' });
        break;
    }
  }
  return { id: seq.id, part: seq.part, scene: seq.scene, title: seq.title, nodes };
}

function challenge(card: RawChallengeCard): { content: Obj; sql: SqlThuThach } {
  const noi = o(card.viTri);
  const field = (label: string): string => {
    const v = card.fields[label];
    if (v === undefined) throw new Error(`${noi}: thẻ ${card.id} thiếu dòng "- ${label}: …"`);
    return v;
  };
  if (!card.onCorrect) throw new Error(`${noi}: thẻ ${card.id} thiếu [KHI ĐÚNG]`);
  if (!card.evidence) throw new Error(`${noi}: thẻ ${card.id} thiếu "Vật chứng lưu vào hồ sơ"`);
  if (card.hints.map((h) => h.level).join(',') !== '1,2,3') throw new Error(`${noi}: thẻ ${card.id} phải có đúng [GỢI Ý 1], [GỢI Ý 2], [GỢI Ý 3] theo thứ tự`);
  const referenceSql = card.sql['SQL chuẩn'];
  if (referenceSql === undefined) throw new Error(`${noi}: thẻ ${card.id} thiếu "- SQL chuẩn:" + khối sql`);
  const onCorrect = card.onCorrect;
  const askerExpr = card.question && card.question.asker.speaker === onCorrect.speaker ? (onCorrect.expression ?? undefined) : undefined;
  const content: Obj = {
    id: card.id,
    title: field('Tiêu đề'),
    prompt: field('Đề bài hiển thị'),
    relatedClues: field('Manh mối liên quan').match(/clue-[a-z0-9-]+/g) ?? [],
    learningGoal: field('Mục tiêu học'),
    steps: card.steps.map((s) => ({ step: s.step, highlight: s.region, line: dialogue(s.line) })),
    diagnosticLines: Object.fromEntries(card.diagnostics.map((d) => [d.code, response(d.response)])),
    hints: card.hints.map((h) => dialogue(h.line)),
    onCorrect: dialogue(onCorrect),
    readQuestion: card.question ? question(card.question, askerExpr, noi) : null,
    evidence: { id: card.evidence.id, title: card.evidence.title, description: card.evidence.description },
  };
  const sql: SqlThuThach = { referenceSql };
  const preload = card.sql['Truy vấn nạp sẵn'];
  if (preload !== undefined) sql.preloadSql = preload;
  if (card.napSan) sql.initialModel = card.napSan;
  return { content, sql };
}

const CLUE_FIELDS = ['Tiêu đề', 'Nguồn', 'Nội dung', 'Giá trị cho trình dựng', 'Câu hỏi còn mở', 'Lưu ý'];

function clue(d: RawDossierCard): Obj {
  const noi = o(d.viTri);
  const f = d.fields;
  const la = Object.keys(f).filter((k) => !CLUE_FIELDS.includes(k));
  if (la.length > 0) throw new Error(`${noi}: thẻ manh mối ${d.id} có dòng lạ: ${la.join(', ')}`);
  const field = (label: string): string => {
    const v = f[label];
    if (v === undefined) throw new Error(`${noi}: thẻ manh mối ${d.id} thiếu dòng "- ${label}: …"`);
    return v;
  };
  const title = field('Tiêu đề');
  const spec = field('Giá trị cho trình dựng');
  const ticks = [...spec.matchAll(/`([^`]+)`/g)].map((m) => m[1] ?? '');
  const value = ticks[0];
  const column = ticks[ticks.length - 1];
  if (value === undefined || column === undefined || ticks.length < 2) {
    throw new Error(`${noi}: "Giá trị cho trình dựng" phải có dạng "\`<giá trị>\`, … cột \`<cột>\`"`);
  }
  return {
    id: d.id,
    title,
    source: field('Nguồn'),
    content: field('Nội dung'),
    builderValue: {
      label: `${value} — ${title}`,
      column,
      suggestedOp: spec.includes('phép "bắt đầu bằng"') ? 'startsWith' : 'eq',
      value,
    },
    openQuestion: field('Câu hỏi còn mở'),
    caveat: field('Lưu ý'),
  };
}

function documentCard(d: RawDossierCard): Obj {
  const noi = o(d.viTri);
  const f = d.fields;
  const bodyLabel = Object.keys(f).find((k) => k.startsWith('Nội dung hiển thị'));
  if (!bodyLabel) throw new Error(`${noi}: thẻ tài liệu ${d.id} thiếu "- Nội dung hiển thị…:"`);
  const known = ['Tiêu đề', 'Nguồn', bodyLabel, 'Mặt ngoài phong bì', 'Câu hỏi còn mở', 'Lưu ý'];
  const la = Object.keys(f).filter((k) => !known.includes(k));
  if (la.length > 0) throw new Error(`${noi}: thẻ tài liệu ${d.id} có dòng lạ: ${la.join(', ')}`);
  for (const k of ['Tiêu đề', 'Nguồn', 'Lưu ý']) if (f[k] === undefined) throw new Error(`${noi}: thẻ tài liệu ${d.id} thiếu dòng "- ${k}: …"`);
  const extra = f['Mặt ngoài phong bì'];
  const open = f['Câu hỏi còn mở'];
  return {
    id: d.id,
    title: f['Tiêu đề'],
    source: f['Nguồn'],
    body: d.quotes[bodyLabel] ?? f[bodyLabel],
    ...(extra !== undefined ? { extra: `Mặt ngoài phong bì: ${extra}` } : {}),
    ...(open !== undefined ? { openQuestion: open } : {}),
    caveat: f['Lưu ý'],
  };
}

/** Chuyển kết quả đọc (đã thay biến, KHÔNG lỗi) thành dữ liệu game. */
export function chuyenNoiDung(script: RawScript): DuLieuSinh {
  const first = script.sequences[0];
  if (!first) throw new Error('nội dung không có chuỗi kể chuyện nào');
  const challenges: Record<string, Obj> = {};
  const challengeSql: Record<string, SqlThuThach> = {};
  for (const card of script.challenges) {
    const c = challenge(card);
    challenges[card.id] = c.content;
    challengeSql[card.id] = c.sql;
  }
  const clues: Record<string, Obj> = {};
  const documents: Record<string, Obj> = {};
  for (const d of script.dossier) {
    if (d.id.startsWith('clue-')) clues[d.id] = clue(d);
    else if (d.id.startsWith('doc-')) documents[d.id] = documentCard(d);
    else if (!d.id.startsWith('ev-')) throw new Error(`${o(d.viTri)}: thẻ hồ sơ "${d.id}" phải bắt đầu bằng clue-, doc- hoặc ev-`);
  }
  return {
    tieuDe: script.title.split(' — ')[0] ?? script.title,
    story: { startSequenceId: first.id, sequences: script.sequences.map(sequence) },
    evidence: { clues, documents },
    challenges,
    challengeSql,
    standardHints: Object.fromEntries(script.standardHints.map((h) => [h.id, dialogue(h.line)])),
    commonDiagnosticLines: Object.fromEntries(script.commonDiagnostics.map((d) => [d.code, response(d.response)])),
  };
}
