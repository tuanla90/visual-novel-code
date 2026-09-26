/**
 * Đọc docs/kich-ban-prototype.md theo "Quy ước đọc file" + "Quy ước thẻ thử thách" thành cấu trúc
 * thô — CHỈ dùng trong test (so khớp hai chiều với dữ liệu ở src/content/real). Không import
 * trong ứng dụng.
 *
 * Bộ đọc CHẶT: trong phần kể chuyện, thẻ thử thách và thẻ hồ sơ, một dòng không khớp quy ước nào
 * thì ném lỗi thay vì bỏ qua — để không có dòng hiển thị nào lọt khỏi phép so khớp.
 */

export interface RawLine {
  speaker: string;
  /** `null` với `player` / `narrator` (kịch bản không ghi biểu cảm). */
  expression: string | null;
  text: string;
}

export interface RawChoice {
  /** Nhãn khi viết (A), (B)… — không hiển thị, không vào dữ liệu. */
  label: string;
  id: string;
  text: string;
  correct: boolean;
  feedback: RawLine[];
}

export interface RawQuestion {
  id: string;
  /** Kịch bản chỉ ghi người hỏi và lời, không ghi biểu cảm. */
  asker: { speaker: string; text: string };
  choices: RawChoice[];
}

export interface RawPickRow {
  index: number;
  sql: string;
  correct: boolean;
  feedback: RawLine[];
}

export type StoryItem =
  | { kind: 'task'; text: string }
  | { kind: 'line'; line: RawLine }
  | { kind: 'note'; text: string }
  | { kind: 'goto'; to: string }
  | { kind: 'hotspot'; id: string; label: string; clue: string; sequence: string }
  | { kind: 'gate'; requires: string[]; button: string; to: string }
  | { kind: 'show-document'; id: string }
  | { kind: 'question'; question: RawQuestion }
  | { kind: 'challenge'; id: string }
  | { kind: 'fix-query'; id: string }
  | { kind: 'effect'; id: string }
  | { kind: 'line-pick'; id: string; rows: RawPickRow[] }
  /** Khối ```sql ngay dưới một dòng [DÀN DỰNG] — nội dung hiển thị nguyên văn. */
  | { kind: 'sql-block'; sql: string }
  | { kind: 'end' };

export interface RawSequence {
  id: string;
  part: string;
  scene: string;
  title: string;
  items: StoryItem[];
}

export type RawDiagnosticResponse = { line: RawLine } | { useStandardHint: string };

export interface RawChallengeCard {
  id: string;
  /** Dòng cấp 1 dạng `- Nhãn: giá trị` (Tiêu đề, Đề bài hiển thị, Cột bắt buộc, …). */
  fields: Record<string, string>;
  sqlBlocks: string[];
  steps: { step: number; region: string; line: RawLine }[];
  diagnostics: { code: string; response: RawDiagnosticResponse }[];
  hints: { level: number; line: RawLine }[];
  onCorrect: RawLine | null;
  question: RawQuestion | null;
  evidence: { id: string; title: string; description: string } | null;
  notes: string[];
}

export interface RawDossierCard {
  id: string;
  heading: string;
  fields: Record<string, string>;
  /** Đoạn trích (`> …`) nằm ngay dưới một dòng `- Nhãn:` bỏ trống giá trị. Mỗi đoạn một phần tử. */
  quotes: Record<string, string[]>;
  notes: string[];
}

export interface RawScript {
  title: string;
  parts: { id: string; name: string }[];
  sequences: RawSequence[];
  standardHints: { id: string; line: RawLine }[];
  commonDiagnostics: { code: string; line: RawLine }[];
  challenges: RawChallengeCard[];
  dossier: RawDossierCard[];
}

const SPOKEN_RE = /^\*\*([a-z-]+)\*\*(?: \(([a-z]+)\))?: (.*)$/;
const CHOICE_RE = /^ {2}- \(([A-Z])\) \{id: ([a-z0-9-]+)\} (.+?)( \[ĐÚNG\])? → phản hồi: (.+)$/;
const QUESTION_RE = /^- \[HỎI ([a-z0-9-]+)\] ([a-z-]+): "(.*)"$/;

export function parseSpoken(s: string, where: string): RawLine {
  const m = SPOKEN_RE.exec(s.trim());
  if (!m) throw new Error(`${where}: không đọc được lời "${s}"`);
  return { speaker: m[1] ?? '', expression: m[2] ?? null, text: m[3] ?? '' };
}

function parseFeedback(s: string, where: string): RawLine[] {
  return s.split('<br>').map((part) => parseSpoken(part, where));
}

function parseChoice(line: string, where: string): RawChoice | null {
  const m = CHOICE_RE.exec(line);
  if (!m) return null;
  return {
    label: m[1] ?? '',
    id: m[2] ?? '',
    text: m[3] ?? '',
    correct: m[4] !== undefined,
    feedback: parseFeedback(m[5] ?? '', where),
  };
}

type Section = 'preamble' | 'story' | 'challenges' | 'dossier' | 'other';
type ChallengeSub = 'convention' | 'standard-hints' | 'common' | 'card' | null;

export function readScript(markdown: string): RawScript {
  const lines = markdown.replace(/\r\n?/g, '\n').split('\n');
  const out: RawScript = {
    title: '',
    parts: [],
    sequences: [],
    standardHints: [],
    commonDiagnostics: [],
    challenges: [],
    dossier: [],
  };

  let section: Section = 'preamble';
  let part = '';
  let seq: RawSequence | null = null;
  let sub: ChallengeSub = null;
  let card: RawChallengeCard | null = null;
  let dcard: RawDossierCard | null = null;
  let question: RawQuestion | null = null;
  let pick: { id: string; rows: RawPickRow[] } | null = null;
  let quoteField: string | null = null;
  let evidenceOpen = false;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i] ?? '';
    const where = `dòng ${i + 1}`;

    // ---------- Tiêu đề ----------
    if (line.startsWith('# ')) {
      out.title = line.slice(2);
      continue;
    }
    if (line.startsWith('## ')) {
      seq = null;
      card = null;
      dcard = null;
      sub = null;
      question = null;
      pick = null;
      const pm = /^## Phần \d+ — (.+) \{part: ([a-z]+)\}$/.exec(line);
      if (pm) {
        section = 'story';
        part = pm[2] ?? '';
        out.parts.push({ id: part, name: pm[1] ?? '' });
      } else if (line === '## Nội dung thử thách') section = 'challenges';
      else if (line === '## Hồ sơ vật chứng') section = 'dossier';
      else section = 'other';
      continue;
    }
    if (line.startsWith('### ')) {
      question = null;
      pick = null;
      quoteField = null;
      evidenceOpen = false;
      if (section === 'story') {
        const m = /^### (\S+) — (.+) \{scene: ([a-z0-9-]+)\}$/.exec(line);
        if (!m) throw new Error(`${where}: tiêu đề chuỗi sai quy ước "${line}"`);
        seq = { id: m[1] ?? '', part, scene: m[3] ?? '', title: m[2] ?? '', items: [] };
        out.sequences.push(seq);
      } else if (section === 'challenges') {
        const cm = /^### (\S+) — .+ \{challenge: ([a-z0-9-]+)\}$/.exec(line);
        if (cm) {
          sub = 'card';
          card = {
            id: cm[2] ?? '',
            fields: {},
            sqlBlocks: [],
            steps: [],
            diagnostics: [],
            hints: [],
            onCorrect: null,
            question: null,
            evidence: null,
            notes: [],
          };
          out.challenges.push(card);
        } else if (line.startsWith('### Quy ước thẻ thử thách')) sub = 'convention';
        else if (line.startsWith('### Ba câu gợi ý chuẩn')) sub = 'standard-hints';
        else if (line.startsWith('### Nhận xét chung')) sub = 'common';
        else throw new Error(`${where}: tiêu đề lạ trong "Nội dung thử thách": "${line}"`);
      } else if (section === 'dossier') {
        const m = /^### (\S+) — (.+)$/.exec(line);
        if (!m) throw new Error(`${where}: tiêu đề thẻ hồ sơ sai quy ước "${line}"`);
        dcard = { id: m[1] ?? '', heading: m[2] ?? '', fields: {}, quotes: {}, notes: [] };
        out.dossier.push(dcard);
      }
      continue;
    }

    // ---------- Khối mã ----------
    if (line.startsWith('```')) {
      const lang = line.slice(3);
      const body: string[] = [];
      i++;
      while (i < lines.length && !(lines[i] ?? '').startsWith('```')) {
        body.push(lines[i] ?? '');
        i++;
      }
      const code = body.join('\n');
      if (section === 'story') {
        if (!seq || lang !== 'sql') throw new Error(`${where}: khối mã ngoài chuỗi hoặc không phải sql`);
        seq.items.push({ kind: 'sql-block', sql: code });
      } else if (section === 'challenges' && sub === 'card' && card) {
        card.sqlBlocks.push(code);
      }
      continue;
    }

    if (section === 'story') readStoryLine(line, where);
    else if (section === 'challenges') readChallengeLine(line, where);
    else if (section === 'dossier') readDossierLine(line, where);
  }
  return out;

  // ---------- Phần kể chuyện ----------
  function readStoryLine(line: string, where: string): void {
    if (line.trim() === '' || line === '---') return;
    if (!seq) throw new Error(`${where}: dòng nằm ngoài chuỗi "${line}"`);
    const items = seq.items;

    if (line.startsWith('|')) {
      if (!pick) throw new Error(`${where}: bảng nằm ngoài [CHỌN DÒNG]`);
      const cells = line.split('|').slice(1, -1).map((c) => c.trim());
      const index = Number(cells[0]);
      if (!Number.isInteger(index)) return; // dòng tiêu đề / dòng kẻ của bảng
      const sqlCell = cells[1] ?? '';
      const sm = /^`(.*)`$/.exec(sqlCell);
      if (!sm) throw new Error(`${where}: ô SQL phải là một đoạn mã \`…\``);
      const fb = cells[3] ?? '';
      pick.rows.push({
        index,
        sql: sm[1] ?? '',
        correct: cells[2] === 'ĐÚNG',
        feedback: fb.startsWith('(không có') ? [] : parseFeedback(fb, where),
      });
      return;
    }
    if (line.startsWith('  - ')) {
      const choice = parseChoice(line, where);
      if (!choice || !question) throw new Error(`${where}: lựa chọn sai quy ước hoặc không thuộc câu hỏi "${line}"`);
      question.choices.push(choice);
      return;
    }
    // Dòng thường kết thúc danh sách lựa chọn và bảng chọn dòng đang mở (dòng trống thì không).
    question = null;
    pick = null;

    const task = /^> NHIỆM VỤ: (.+)$/.exec(line);
    if (task) return void items.push({ kind: 'task', text: task[1] ?? '' });
    if (line.startsWith('- **')) return void items.push({ kind: 'line', line: parseSpoken(line.slice(2), where) });
    if (line.startsWith('- [DÀN DỰNG] ')) return void items.push({ kind: 'note', text: line.slice('- [DÀN DỰNG] '.length) });

    const goto = /^- \[ĐI TỚI ([a-z0-9-]+)\]$/.exec(line);
    if (goto) return void items.push({ kind: 'goto', to: goto[1] ?? '' });
    const hs = /^- \[ĐIỂM XEM XÉT ([a-z0-9-]+)\] nhãn: "(.+)" · mở manh mối: ([a-z0-9-]+) · chạy chuỗi: ([a-z0-9-]+)$/.exec(line);
    if (hs) {
      return void items.push({ kind: 'hotspot', id: hs[1] ?? '', label: hs[2] ?? '', clue: hs[3] ?? '', sequence: hs[4] ?? '' });
    }
    const gate = /^- \[ĐIỀU KIỆN QUA\] cần: (.+) → nút "(.+)" sang ([a-z0-9-]+)$/.exec(line);
    if (gate) {
      const requires = (gate[1] ?? '').split(',').map((s) => s.trim());
      return void items.push({ kind: 'gate', requires, button: gate[2] ?? '', to: gate[3] ?? '' });
    }
    const doc = /^- \[HIỆN TÀI LIỆU ([a-z0-9-]+)\]$/.exec(line);
    if (doc) return void items.push({ kind: 'show-document', id: doc[1] ?? '' });
    const q = QUESTION_RE.exec(line);
    if (q) {
      question = { id: q[1] ?? '', asker: { speaker: q[2] ?? '', text: q[3] ?? '' }, choices: [] };
      return void items.push({ kind: 'question', question });
    }
    const ch = /^- \[THỬ THÁCH ([a-z0-9-]+)\]$/.exec(line);
    if (ch) return void items.push({ kind: 'challenge', id: ch[1] ?? '' });
    const fix = /^- \[SỬA TRUY VẤN ([a-z0-9-]+)\]$/.exec(line);
    if (fix) return void items.push({ kind: 'fix-query', id: fix[1] ?? '' });
    const eff = /^- \[HIỆU ỨNG ([a-z0-9-]+)\]$/.exec(line);
    if (eff) return void items.push({ kind: 'effect', id: eff[1] ?? '' });
    const lp = /^- \[CHỌN DÒNG ([a-z0-9-]+)\]$/.exec(line);
    if (lp) {
      pick = { id: lp[1] ?? '', rows: [] };
      return void items.push({ kind: 'line-pick', id: pick.id, rows: pick.rows });
    }
    if (line === '- [KẾT THÚC]') return void items.push({ kind: 'end' });
    throw new Error(`${where}: dòng không khớp quy ước nào trong phần kể chuyện: "${line}"`);
  }

  // ---------- Nội dung thử thách ----------
  function readChallengeLine(line: string, where: string): void {
    if (line.trim() === '' || line === '---') return;
    if (sub === 'convention' || sub === null) return;

    if (sub === 'standard-hints') {
      if (line.startsWith('  - ')) return; // "Dùng khi: …" — chỉ dẫn
      const m = /^- \[GỢI Ý CHUẨN ([a-z0-9-]+)\] (.+)$/.exec(line);
      if (!m) throw new Error(`${where}: dòng lạ trong "Ba câu gợi ý chuẩn": "${line}"`);
      out.standardHints.push({ id: m[1] ?? '', line: parseSpoken(m[2] ?? '', where) });
      return;
    }
    if (sub === 'common') {
      if (line.startsWith('  - ')) return; // chỉ dẫn dưới một mã
      const m = /^- \[KHI: ([a-z-]+)\] (.+)$/.exec(line);
      if (!m) throw new Error(`${where}: dòng lạ trong "Nhận xét chung": "${line}"`);
      out.commonDiagnostics.push({ code: m[1] ?? '', line: parseSpoken(m[2] ?? '', where) });
      return;
    }
    if (!card) throw new Error(`${where}: dòng nằm ngoài thẻ thử thách`);

    if (line.startsWith('  - (')) {
      const choice = parseChoice(line, where);
      if (!choice || !card.question) throw new Error(`${where}: lựa chọn sai quy ước "${line}"`);
      card.question.choices.push(choice);
      return;
    }
    if (line.startsWith('  - ')) {
      const m = /^ {2}- (Tiêu đề|Mô tả): (.+)$/.exec(line);
      if (!m || !evidenceOpen || !card.evidence) throw new Error(`${where}: dòng con lạ trong thẻ thử thách "${line}"`);
      if (m[1] === 'Tiêu đề') card.evidence.title = m[2] ?? '';
      else card.evidence.description = m[2] ?? '';
      return;
    }
    evidenceOpen = false;
    if (line.startsWith('- [DÀN DỰNG] ')) return void card.notes.push(line.slice('- [DÀN DỰNG] '.length));
    const step = /^- \[BƯỚC (\d+) · nổi bật: ([a-z]+)\] (.+)$/.exec(line);
    if (step) {
      return void card.steps.push({ step: Number(step[1]), region: step[2] ?? '', line: parseSpoken(step[3] ?? '', where) });
    }
    const diag = /^- \[KHI: ([a-z-]+)\] (.+)$/.exec(line);
    if (diag) {
      const rest = diag[2] ?? '';
      const use = /^dùng ([a-z-]+)$/.exec(rest);
      const response: RawDiagnosticResponse = use ? { useStandardHint: use[1] ?? '' } : { line: parseSpoken(rest, where) };
      return void card.diagnostics.push({ code: diag[1] ?? '', response });
    }
    const hint = /^- \[GỢI Ý (\d)\] (.+)$/.exec(line);
    if (hint) return void card.hints.push({ level: Number(hint[1]), line: parseSpoken(hint[2] ?? '', where) });
    const ok = /^- \[KHI ĐÚNG\] (.+)$/.exec(line);
    if (ok) {
      card.onCorrect = parseSpoken(ok[1] ?? '', where);
      return;
    }
    const q = QUESTION_RE.exec(line);
    if (q) {
      card.question = { id: q[1] ?? '', asker: { speaker: q[2] ?? '', text: q[3] ?? '' }, choices: [] };
      return;
    }
    const ev = /^- Vật chứng lưu vào hồ sơ: ([a-z0-9-]+)$/.exec(line);
    if (ev) {
      card.evidence = { id: ev[1] ?? '', title: '', description: '' };
      evidenceOpen = true;
      return;
    }
    const field = /^- ([^[\]:`]+?):\s*(.*)$/.exec(line);
    if (field) {
      card.fields[field[1] ?? ''] = field[2] ?? '';
      return;
    }
    throw new Error(`${where}: dòng không khớp quy ước thẻ thử thách: "${line}"`);
  }

  // ---------- Hồ sơ vật chứng ----------
  function readDossierLine(line: string, where: string): void {
    if (line.trim() === '' || line === '---') return;
    if (!dcard) return; // chỉ dẫn [DÀN DỰNG] chung của mục, trước thẻ đầu tiên
    if (line.startsWith('>')) {
      if (!quoteField) throw new Error(`${where}: đoạn trích không thuộc dòng "- Nhãn:" nào`);
      const text = line.replace(/^>\s?/, '');
      if (text.trim() === '') return; // dòng trống giữa hai đoạn
      (dcard.quotes[quoteField] ??= []).push(text);
      return;
    }
    quoteField = null;
    if (line.startsWith('- [DÀN DỰNG] ')) return void dcard.notes.push(line.slice('- [DÀN DỰNG] '.length));
    const field = /^- ([^[\]:`]+?):\s*(.*)$/.exec(line);
    if (field) {
      const label = field[1] ?? '';
      const value = field[2] ?? '';
      dcard.fields[label] = value;
      if (value === '') quoteField = label;
      return;
    }
    if (line.startsWith('- ')) return void dcard.notes.push(line.slice(2));
    throw new Error(`${where}: dòng không khớp quy ước thẻ hồ sơ: "${line}"`);
  }
}
