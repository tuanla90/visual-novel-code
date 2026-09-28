/**
 * BỘ ĐỌC NỘI DUNG — đọc các tệp Markdown trong `prototype/noi-dung/` thành cấu trúc thô.
 *
 * Quy ước: `noi-dung/quy-uoc.md` ("Quy ước đọc file", "Quy ước thẻ thử thách") và đặc tả
 * `docs/dac-ta-dinh-dang-noi-dung.md` (mục 2, 6.3, 10.4, 15). Bước 12a-1 vẫn nhận cú pháp cũ
 * (`[ĐIỂM XEM XÉT]`, `[ĐIỀU KIỆN QUA]`, `[KHI ĐÚNG]`, `[KHI: mã]`, `[GỢI Ý n]`) — QĐ-088.
 *
 * Bộ đọc CHẶT: trong phần kể chuyện, thẻ thử thách, lời chung và thẻ hồ sơ, một dòng không khớp quy
 * ước nào là LỖI (không bỏ qua) — để không dòng hiển thị nào lọt khỏi phép so khớp. Lỗi ghi dạng
 * `<tệp>:<dòng>: <lỗi>` và được GOM (đọc hết mới báo), để người viết sửa một lượt.
 *
 * Không import gì từ `src/` (dùng được từ dòng lệnh: `npm run kiem-noi-dung`).
 */
import { thayBien, type BangTen } from './bien.ts';
import { docModelNapSan, type ModelNapSan } from './nap-san.ts';

export type { BangTen } from './bien.ts';
export type { ModelNapSan } from './nap-san.ts';

// ---------- Kiểu kết quả ----------

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

export type RawProjectorSource = { kind: 'sql'; sql: string } | { kind: 'evidence'; evidenceId: string };

export type StoryItem =
  | { kind: 'task'; text: string }
  /** `card: true` khi dòng viết `- [THẺ CHỮ] **…**: …` (thẻ chữ lớn giữa màn hình). */
  | { kind: 'line'; line: RawLine; card: boolean }
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
  /** `[MÀN CHIẾU <id> · [vật chứng <ev>] · chạy|không chạy · <n> dòng]`; nguồn sql = khối ```sql ngay dưới. */
  | { kind: 'projector'; id: string; source: RawProjectorSource; run: boolean; rows: number | null }
  /** `[ĐẶT CỜ <cờ>]` */
  | { kind: 'set-flag'; flag: string }
  /** `[CHÚ THÍCH HỒ SƠ <ev> [· làm mờ]]`; `note` lấy từ dòng "Chú thích:" của thẻ hồ sơ cùng mã. */
  | { kind: 'annotate-evidence'; id: string; note: string; redact: boolean }
  | { kind: 'end' };

/** Vị trí trong nguồn: `<tệp>:<dòng>`. */
export interface ViTri {
  tep: string;
  dong: number;
}

export interface RawSequence {
  id: string;
  part: string;
  scene: string;
  title: string;
  items: StoryItem[];
  viTri: ViTri;
}

export type RawDiagnosticResponse = { line: RawLine } | { useStandardHint: string };

export interface RawChallengeCard {
  id: string;
  /** Dòng cấp 1 dạng `- Nhãn: giá trị` (Tiêu đề, Đề bài hiển thị, Cột bắt buộc, …). */
  fields: Record<string, string>;
  /** Khối ```sql, theo nhãn của dòng `- Nhãn:` bỏ trống ngay trên (`SQL chuẩn`, `Truy vấn nạp sẵn`). */
  sql: Record<string, string>;
  /** Model trình dựng đọc từ `Truy vấn nạp sẵn` + `Nguồn điều kiện nạp sẵn`; `null` nếu thẻ không có. */
  napSan: ModelNapSan | null;
  steps: { step: number; region: string; line: RawLine }[];
  diagnostics: { code: string; response: RawDiagnosticResponse }[];
  hints: { level: number; line: RawLine }[];
  onCorrect: RawLine | null;
  question: RawQuestion | null;
  evidence: { id: string; title: string; description: string } | null;
  notes: string[];
  viTri: ViTri;
}

export interface RawDossierCard {
  id: string;
  heading: string;
  fields: Record<string, string>;
  /** Đoạn trích (`> …`) nằm ngay dưới một dòng `- Nhãn:` bỏ trống giá trị. Mỗi đoạn một phần tử. */
  quotes: Record<string, string[]>;
  notes: string[];
  viTri: ViTri;
}

export interface RawScript {
  title: string;
  parts: { id: string; name: string }[];
  sequences: RawSequence[];
  standardHints: { id: string; line: RawLine }[];
  commonDiagnostics: { code: string; response: RawDiagnosticResponse }[];
  challenges: RawChallengeCard[];
  dossier: RawDossierCard[];
}

/**
 * Loại tệp, quyết định cách đọc:
 * - `quy-uoc`: tiêu đề `# …` của bộ nội dung + quy ước cho người viết (bộ đọc chỉ lấy tiêu đề).
 * - `kich-ban`: một phần của mạch chính (`## Phần N — … {part: …}` rồi các chuỗi `### …`).
 * - `thu-thach`: thẻ thử thách `### … {challenge: …}`.
 * - `loi-chung`: "Ba câu gợi ý chuẩn", "Nhận xét chung cho mọi thử thách".
 * - `ho-so`: thẻ hồ sơ vật chứng `### <mã> — …`.
 */
export type LoaiTep = 'quy-uoc' | 'kich-ban' | 'thu-thach' | 'loi-chung' | 'ho-so';

export interface TepNoiDung {
  /** Đường dẫn hiện trong lỗi (thường tương đối với `prototype/`). */
  duongDan: string;
  loai: LoaiTep;
  noiDung: string;
}

export interface LoiNoiDung extends ViTri {
  thongBao: string;
}

export const dinhDangLoi = (l: LoiNoiDung): string => `${l.tep}:${l.dong}: ${l.thongBao}`;

export interface TuyChonDoc {
  /** Có thì thay biến `{{nv.…}}`, `{{truong.…}}` trước khi đọc; không có mà gặp biến thì báo lỗi. */
  bangTen?: BangTen;
}

export interface KetQuaDoc {
  script: RawScript;
  loi: LoiNoiDung[];
}

// ---------- Mẩu đọc dùng chung ----------

const SPOKEN_RE = /^\*\*([a-z-]+)\*\*(?: \(([a-z]+)\))?: (.*)$/;
const CHOICE_RE = /^ {2}- \(([A-Z])\) \{id: ([a-z0-9-]+)\} (.+?)( \[ĐÚNG\])? → phản hồi: (.+)$/;
const QUESTION_RE = /^- \[HỎI ([a-z0-9-]+)\] ([a-z-]+): "(.*)"$/;
const FIELD_RE = /^- ([^[\]:`]+?):\s*(.*)$/;

export function parseSpoken(s: string): RawLine {
  const m = SPOKEN_RE.exec(s.trim());
  if (!m) throw new Error(`không đọc được lời "${s}"`);
  return { speaker: m[1] ?? '', expression: m[2] ?? null, text: m[3] ?? '' };
}

/** Phần sau `[KHI: mã]`: `dùng <mã gợi ý chuẩn>` hoặc một lời. */
function parseDiagnosticResponse(rest: string): RawDiagnosticResponse {
  const use = /^dùng ([a-z-]+)$/.exec(rest);
  return use ? { useStandardHint: use[1] ?? '' } : { line: parseSpoken(rest) };
}

function parseFeedback(s: string): RawLine[] {
  return s.split('<br>').map((part) => parseSpoken(part));
}

function parseChoice(line: string): RawChoice | null {
  const m = CHOICE_RE.exec(line);
  if (!m) return null;
  return {
    label: m[1] ?? '',
    id: m[2] ?? '',
    text: m[3] ?? '',
    correct: m[4] !== undefined,
    feedback: parseFeedback(m[5] ?? ''),
  };
}

/** `[MÀN CHIẾU <id> · vật chứng <ev> · chạy · 2 dòng]` — các mục sau id theo thứ tự tùy ý. */
function parseProjector(line: string): { id: string; evidence: string | null; run: boolean; rows: number | null } | null {
  const m = /^- \[MÀN CHIẾU ([a-z0-9-]+)((?: · [^\]·]+)*)\]$/.exec(line);
  if (!m) return null;
  let evidence: string | null = null;
  let run: boolean | null = null;
  let rows: number | null = null;
  for (const raw of (m[2] ?? '').split(' · ').slice(1)) {
    const p = raw.trim();
    const ev = /^vật chứng ([a-z0-9-]+)$/.exec(p);
    const r = /^(\d+) dòng$/.exec(p);
    if (ev) evidence = ev[1] ?? '';
    else if (p === 'chạy') run = true;
    else if (p === 'không chạy') run = false;
    else if (r) rows = Number(r[1]);
    else throw new Error(`[MÀN CHIẾU]: mục lạ "${p}" — dùng "vật chứng <mã>", "chạy" / "không chạy", "<n> dòng"`);
  }
  if (run === null) throw new Error('[MÀN CHIẾU]: phải ghi "chạy" hoặc "không chạy"');
  return { id: m[1] ?? '', evidence, run, rows };
}

// ---------- Bộ đọc ----------

type ChallengeSub = 'standard-hints' | 'common' | 'card' | null;

/** Đọc một bộ tệp (đúng thứ tự truyền vào) thành một khối dữ liệu. Không ném lỗi: lỗi nằm trong `loi`. */
export function docNoiDung(tepList: readonly TepNoiDung[], tuyChon: TuyChonDoc = {}): KetQuaDoc {
  const out: RawScript = {
    title: '',
    parts: [],
    sequences: [],
    standardHints: [],
    commonDiagnostics: [],
    challenges: [],
    dossier: [],
  };
  const loi: LoiNoiDung[] = [];
  /** Kiểm tra chéo chạy sau khi đọc hết mọi tệp (tham chiếu sang tệp khác). */
  const kiemSau: { viTri: ViTri; kiem: () => void }[] = [];

  for (const tep of tepList) docMotTep(tep);
  for (const k of kiemSau) {
    try {
      k.kiem();
    } catch (e) {
      loi.push({ ...k.viTri, thongBao: (e as Error).message });
    }
  }
  kiemTrung(out.sequences.map((s) => [s.id, s.viTri] as const), 'chuỗi');
  kiemTrung(out.challenges.map((c) => [c.id, c.viTri] as const), 'thẻ thử thách');
  kiemTrung(out.dossier.map((d) => [d.id, d.viTri] as const), 'thẻ hồ sơ');
  if (out.title === '') loi.push({ tep: tepList[0]?.duongDan ?? '(không có tệp)', dong: 1, thongBao: 'thiếu tiêu đề "# …" của bộ nội dung (tệp quy-uoc.md)' });
  return { script: out, loi };

  function kiemTrung(ds: readonly (readonly [string, ViTri])[], ten: string): void {
    const da = new Map<string, ViTri>();
    for (const [id, vt] of ds) {
      const truoc = da.get(id);
      if (truoc) loi.push({ ...vt, thongBao: `${ten} "${id}" trùng định danh với ${truoc.tep}:${truoc.dong}` });
      else da.set(id, vt);
    }
  }

  function docMotTep(tep: TepNoiDung): void {
    const lines = tep.noiDung.replace(/\r\n?/g, '\n').split('\n');
    const bangTen = tuyChon.bangTen;
    for (let i = 0; i < lines.length; i++) {
      const raw = lines[i] ?? '';
      if (!raw.includes('{{') && !raw.includes('}}')) continue;
      if (!bangTen) {
        loi.push({ tep: tep.duongDan, dong: i + 1, thongBao: 'có biến {{…}} nhưng không có bảng tên để thay' });
        continue;
      }
      const kq = thayBien(raw, bangTen);
      for (const t of kq.loi) loi.push({ tep: tep.duongDan, dong: i + 1, thongBao: t });
      lines[i] = kq.chu;
    }

    let part = '';
    let seq: RawSequence | null = null;
    let sub: ChallengeSub = null;
    let card: RawChallengeCard | null = null;
    let dcard: RawDossierCard | null = null;
    let question: RawQuestion | null = null;
    let pick: { id: string; rows: RawPickRow[] } | null = null;
    let quoteField: string | null = null;
    let evidenceOpen = false;
    /** Nhãn `- Nhãn:` bỏ trống gần nhất của thẻ thử thách — khối ```sql kế tiếp thuộc nhãn này. */
    let sqlField: string | null = null;
    /** `[MÀN CHIẾU]` chưa có nguồn: dòng khác trống kế tiếp phải là khối ```sql. */
    let chieuCho: (StoryItem & { kind: 'projector' }) | null = null;
    let partSeen = false;
    let dongHienTai = 0;
    const viTri = (): ViTri => ({ tep: tep.duongDan, dong: dongHienTai });

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i] ?? '';
      dongHienTai = i + 1;
      try {
        i = docDong(line, i);
      } catch (e) {
        loi.push({ ...viTri(), thongBao: (e as Error).message });
      }
    }
    // (TS không thấy các hàm con gán lại biến này → ép kiểu lại.)
    const choCuoi = chieuCho as (StoryItem & { kind: 'projector' }) | null;
    if (choCuoi) loi.push({ ...viTri(), thongBao: `[MÀN CHIẾU ${choCuoi.id}] thiếu khối \`\`\`sql ngay dưới (hoặc ghi "vật chứng <mã>")` });
    if (tep.loai === 'kich-ban' && !partSeen) loi.push({ tep: tep.duongDan, dong: 1, thongBao: 'tệp kịch bản phải mở đầu bằng "## Phần N — <Tên> {part: <mã>}"' });

    /** Đọc một dòng; trả về chỉ số dòng cuối đã dùng (khối mã dùng nhiều dòng). */
    function docDong(line: string, i: number): number {
      // Ghi chú của người viết (đặc tả mục 1): bỏ qua.
      if (line.startsWith('<!--')) return i;

      if (tep.loai === 'quy-uoc') {
        if (line.startsWith('# ')) {
          if (out.title !== '') throw new Error('tiêu đề "# …" của bộ nội dung đã có ở tệp khác');
          out.title = line.slice(2);
        }
        return i; // phần còn lại là quy ước cho người viết
      }

      // ---------- Tiêu đề ----------
      if (line.startsWith('# ')) throw new Error(`tiêu đề cấp 1 chỉ đặt ở quy-uoc.md: "${line}"`);
      if (line.startsWith('## ')) {
        seq = null;
        card = null;
        dcard = null;
        sub = null;
        question = null;
        pick = null;
        if (tep.loai === 'kich-ban') {
          const pm = /^## Phần \d+ — (.+) \{part: ([a-z]+)\}$/.exec(line);
          if (!pm) throw new Error(`tiêu đề phần sai quy ước "${line}"`);
          if (partSeen) throw new Error('mỗi tệp kịch bản chỉ có một phần');
          partSeen = true;
          part = pm[2] ?? '';
          out.parts.push({ id: part, name: pm[1] ?? '' });
        } else if (tep.loai !== 'ho-so') {
          throw new Error(`tiêu đề cấp 2 lạ trong tệp ${tep.loai}: "${line}"`);
        }
        return i;
      }
      if (line.startsWith('### ')) {
        question = null;
        pick = null;
        quoteField = null;
        evidenceOpen = false;
        sqlField = null;
        if (chieuCho) throw new Error(`[MÀN CHIẾU ${chieuCho.id}] thiếu khối \`\`\`sql ngay dưới`);
        if (tep.loai === 'kich-ban') {
          if (!partSeen) throw new Error('chuỗi nằm trước tiêu đề "## Phần …"');
          const m = /^### (\S+) — (.+) \{scene: ([a-z0-9-]+)\}$/.exec(line);
          if (!m) throw new Error(`tiêu đề chuỗi sai quy ước "${line}"`);
          seq = { id: m[1] ?? '', part, scene: m[3] ?? '', title: m[2] ?? '', items: [], viTri: viTri() };
          out.sequences.push(seq);
        } else if (tep.loai === 'thu-thach') {
          const cm = /^### (\S+) — .+ \{challenge: ([a-z0-9-]+)\}$/.exec(line);
          if (!cm) throw new Error(`tiêu đề thẻ thử thách sai quy ước "${line}"`);
          if (cm[1] !== cm[2]) throw new Error(`mã đầu tiêu đề "${cm[1] ?? ''}" khác {challenge: ${cm[2] ?? ''}}`);
          sub = 'card';
          card = {
            id: cm[2] ?? '',
            fields: {},
            sql: {},
            napSan: null,
            steps: [],
            diagnostics: [],
            hints: [],
            onCorrect: null,
            question: null,
            evidence: null,
            notes: [],
            viTri: viTri(),
          };
          out.challenges.push(card);
          const c = card;
          kiemSau.push({ viTri: viTri(), kiem: () => ganNapSan(c) });
        } else if (tep.loai === 'loi-chung') {
          if (line.startsWith('### Ba câu gợi ý chuẩn')) sub = 'standard-hints';
          else if (line.startsWith('### Nhận xét chung')) sub = 'common';
          else throw new Error(`tiêu đề lạ trong lời chung: "${line}"`);
        } else if (tep.loai === 'ho-so') {
          const m = /^### (\S+) — (.+)$/.exec(line);
          if (!m) throw new Error(`tiêu đề thẻ hồ sơ sai quy ước "${line}"`);
          dcard = { id: m[1] ?? '', heading: m[2] ?? '', fields: {}, quotes: {}, notes: [], viTri: viTri() };
          out.dossier.push(dcard);
        }
        return i;
      }

      // ---------- Khối mã ----------
      if (line.startsWith('```')) {
        const lang = line.slice(3);
        const body: string[] = [];
        let j = i + 1;
        while (j < lines.length && !(lines[j] ?? '').startsWith('```')) {
          body.push(lines[j] ?? '');
          j++;
        }
        if (j >= lines.length) throw new Error('khối mã không có dòng ``` đóng');
        const code = body.join('\n');
        if (lang !== 'sql') throw new Error(`khối mã phải là \`\`\`sql (gặp "${line}")`);
        if (tep.loai === 'kich-ban') {
          if (!seq || !chieuCho) throw new Error('khối ```sql trong kịch bản phải nằm ngay dưới một [MÀN CHIẾU …] (không ghi "vật chứng")');
          chieuCho.source = { kind: 'sql', sql: code };
          chieuCho = null;
        } else if (tep.loai === 'thu-thach' && card) {
          if (!sqlField) throw new Error('khối ```sql trong thẻ thử thách phải nằm ngay dưới một dòng "- Nhãn:" bỏ trống (vd "- SQL chuẩn:")');
          if (card.sql[sqlField] !== undefined) throw new Error(`nhãn "${sqlField}" đã có khối sql`);
          card.sql[sqlField] = code;
          sqlField = null;
        } else {
          throw new Error('khối mã ở chỗ không nhận khối mã');
        }
        return j;
      }

      if (tep.loai === 'kich-ban') readStoryLine(line);
      else if (tep.loai === 'thu-thach' || tep.loai === 'loi-chung') readChallengeLine(line);
      else readDossierLine(line);
      return i;
    }

    // ---------- Phần kể chuyện ----------
    function readStoryLine(line: string): void {
      if (line.trim() === '' || line === '---') return;
      if (!seq) throw new Error(`dòng nằm ngoài chuỗi "${line}"`);
      if (chieuCho) throw new Error(`[MÀN CHIẾU ${chieuCho.id}] thiếu khối \`\`\`sql ngay dưới`);
      const items = seq.items;
      const here = viTri();

      if (line.startsWith('|')) {
        if (!pick) throw new Error('bảng nằm ngoài [CHỌN DÒNG]');
        const cells = line.split('|').slice(1, -1).map((c) => c.trim());
        const index = Number(cells[0]);
        if (!Number.isInteger(index)) return; // dòng tiêu đề / dòng kẻ của bảng
        const sqlCell = cells[1] ?? '';
        const sm = /^`(.*)`$/.exec(sqlCell);
        if (!sm) throw new Error('ô SQL phải là một đoạn mã `…`');
        const fb = cells[3] ?? '';
        pick.rows.push({
          index,
          sql: sm[1] ?? '',
          correct: cells[2] === 'ĐÚNG',
          feedback: fb.startsWith('(không có') ? [] : parseFeedback(fb),
        });
        return;
      }
      if (line.startsWith('  - ')) {
        const choice = parseChoice(line);
        if (!choice || !question) throw new Error(`lựa chọn sai quy ước hoặc không thuộc câu hỏi "${line}"`);
        question.choices.push(choice);
        return;
      }
      // Dòng thường kết thúc danh sách lựa chọn và bảng chọn dòng đang mở (dòng trống thì không).
      question = null;
      pick = null;

      const task = /^> NHIỆM VỤ: (.+)$/.exec(line);
      if (task) return void items.push({ kind: 'task', text: task[1] ?? '' });
      if (line.startsWith('- **')) return void items.push({ kind: 'line', line: parseSpoken(line.slice(2)), card: false });
      if (line.startsWith('- [THẺ CHỮ] **')) {
        return void items.push({ kind: 'line', line: parseSpoken(line.slice('- [THẺ CHỮ] '.length)), card: true });
      }
      if (line.startsWith('- [DÀN DỰNG] ')) return void items.push({ kind: 'note', text: line.slice('- [DÀN DỰNG] '.length) });

      const goto = /^- \[ĐI TỚI ([a-z0-9-]+)\]$/.exec(line);
      if (goto) {
        const to = goto[1] ?? '';
        kiemSau.push({ viTri: here, kiem: () => canChuoi(to) });
        return void items.push({ kind: 'goto', to });
      }
      const hs = /^- \[ĐIỂM XEM XÉT ([a-z0-9-]+)\] nhãn: "(.+)" · mở manh mối: ([a-z0-9-]+) · chạy chuỗi: ([a-z0-9-]+)$/.exec(line);
      if (hs) {
        const sequence = hs[4] ?? '';
        const clue = hs[3] ?? '';
        kiemSau.push({ viTri: here, kiem: () => {
            canChuoi(sequence);
            canHoSo(clue);
          },
        });
        return void items.push({ kind: 'hotspot', id: hs[1] ?? '', label: hs[2] ?? '', clue, sequence });
      }
      const gate = /^- \[ĐIỀU KIỆN QUA\] cần: (.+) → nút "(.+)" sang ([a-z0-9-]+)$/.exec(line);
      if (gate) {
        const requires = (gate[1] ?? '').split(',').map((s) => s.trim());
        const to = gate[3] ?? '';
        kiemSau.push({ viTri: here, kiem: () => {
            canChuoi(to);
            requires.forEach(canHoSo);
          },
        });
        return void items.push({ kind: 'gate', requires, button: gate[2] ?? '', to });
      }
      const doc = /^- \[HIỆN TÀI LIỆU ([a-z0-9-]+)\]$/.exec(line);
      if (doc) {
        const id = doc[1] ?? '';
        kiemSau.push({ viTri: here, kiem: () => canHoSo(id) });
        return void items.push({ kind: 'show-document', id });
      }
      const q = QUESTION_RE.exec(line);
      if (q) {
        question = { id: q[1] ?? '', asker: { speaker: q[2] ?? '', text: q[3] ?? '' }, choices: [] };
        return void items.push({ kind: 'question', question });
      }
      const ch = /^- \[(THỬ THÁCH|SỬA TRUY VẤN) ([a-z0-9-]+)\]$/.exec(line);
      if (ch) {
        const id = ch[2] ?? '';
        kiemSau.push({ viTri: here, kiem: () => canThuThach(id) });
        return void items.push({ kind: ch[1] === 'THỬ THÁCH' ? 'challenge' : 'fix-query', id });
      }
      const eff = /^- \[HIỆU ỨNG ([a-z0-9-]+)\]$/.exec(line);
      if (eff) return void items.push({ kind: 'effect', id: eff[1] ?? '' });
      const lp = /^- \[CHỌN DÒNG ([a-z0-9-]+)\]$/.exec(line);
      if (lp) {
        pick = { id: lp[1] ?? '', rows: [] };
        return void items.push({ kind: 'line-pick', id: pick.id, rows: pick.rows });
      }
      if (line.startsWith('- [MÀN CHIẾU ')) {
        const p = parseProjector(line);
        if (!p) throw new Error(`[MÀN CHIẾU] sai quy ước "${line}" — viết [MÀN CHIẾU <mã> · chạy · <n> dòng]`);
        const item: StoryItem & { kind: 'projector' } = {
          kind: 'projector',
          id: p.id,
          source: p.evidence ? { kind: 'evidence', evidenceId: p.evidence } : { kind: 'sql', sql: '' },
          run: p.run,
          rows: p.rows,
        };
        if (p.evidence) {
          const ev = p.evidence;
          kiemSau.push({ viTri: here, kiem: () => canVatChungThuThach(ev) });
        } else chieuCho = item;
        return void items.push(item);
      }
      const flag = /^- \[ĐẶT CỜ ([a-z0-9-]+)\]$/.exec(line);
      if (flag) return void items.push({ kind: 'set-flag', flag: flag[1] ?? '' });
      const ann = /^- \[CHÚ THÍCH HỒ SƠ ([a-z0-9-]+)( · làm mờ)?\]$/.exec(line);
      if (ann) {
        const item: StoryItem & { kind: 'annotate-evidence' } = { kind: 'annotate-evidence', id: ann[1] ?? '', note: '', redact: ann[2] !== undefined };
        kiemSau.push({
          viTri: here,
          kiem: () => {
            canVatChungThuThach(item.id);
            const the = out.dossier.find((d) => d.id === item.id);
            const note = the?.fields['Chú thích'];
            if (note === undefined) throw new Error(`[CHÚ THÍCH HỒ SƠ ${item.id}]: thẻ hồ sơ "${item.id}" không có dòng "- Chú thích: …"`);
            item.note = note;
          },
        });
        return void items.push(item);
      }
      if (line === '- [KẾT THÚC]') return void items.push({ kind: 'end' });
      throw new Error(`dòng không khớp quy ước nào trong phần kể chuyện: "${line}"`);
    }

    // ---------- Thẻ thử thách + lời chung ----------
    function readChallengeLine(line: string): void {
      if (line.trim() === '' || line === '---') return;
      if (sub === null) throw new Error(`dòng nằm trước tiêu đề "### …": "${line}"`);

      if (sub === 'standard-hints') {
        if (line.startsWith('  - ')) return; // "Dùng khi: …" — chỉ dẫn
        const m = /^- \[GỢI Ý CHUẨN ([a-z0-9-]+)\] (.+)$/.exec(line);
        if (!m) throw new Error(`dòng lạ trong "Ba câu gợi ý chuẩn": "${line}"`);
        out.standardHints.push({ id: m[1] ?? '', line: parseSpoken(m[2] ?? '') });
        return;
      }
      if (sub === 'common') {
        if (line.startsWith('  - ')) return; // chỉ dẫn dưới một mã
        const m = /^- \[KHI: ([a-z-]+)\] (.+)$/.exec(line);
        if (!m) throw new Error(`dòng lạ trong "Nhận xét chung": "${line}"`);
        // QĐ-054: "Nhận xét chung" dùng được câu gợi ý chuẩn như thẻ thử thách (`dùng hint-x`).
        out.commonDiagnostics.push({ code: m[1] ?? '', response: parseDiagnosticResponse(m[2] ?? '') });
        return;
      }
      if (!card) throw new Error('dòng nằm ngoài thẻ thử thách');
      const c: RawChallengeCard = card;
      sqlField = null; // khối ```sql chỉ thuộc dòng "- Nhãn:" bỏ trống NGAY trên nó

      if (line.startsWith('  - (')) {
        const choice = parseChoice(line);
        if (!choice || !c.question) throw new Error(`lựa chọn sai quy ước "${line}"`);
        c.question.choices.push(choice);
        return;
      }
      if (line.startsWith('  - ')) {
        const m = /^ {2}- (Tiêu đề|Mô tả): (.+)$/.exec(line);
        if (!m || !evidenceOpen || !c.evidence) throw new Error(`dòng con lạ trong thẻ thử thách "${line}"`);
        if (m[1] === 'Tiêu đề') c.evidence.title = m[2] ?? '';
        else c.evidence.description = m[2] ?? '';
        return;
      }
      evidenceOpen = false;
      if (line.startsWith('- [DÀN DỰNG] ')) return void c.notes.push(line.slice('- [DÀN DỰNG] '.length));
      const step = /^- \[BƯỚC (\d+) · nổi bật: ([a-z]+)\] (.+)$/.exec(line);
      if (step) {
        return void c.steps.push({ step: Number(step[1]), region: step[2] ?? '', line: parseSpoken(step[3] ?? '') });
      }
      const diag = /^- \[KHI: ([a-z-]+)\] (.+)$/.exec(line);
      if (diag) {
        return void c.diagnostics.push({ code: diag[1] ?? '', response: parseDiagnosticResponse(diag[2] ?? '') });
      }
      const hint = /^- \[GỢI Ý (\d)\] (.+)$/.exec(line);
      if (hint) return void c.hints.push({ level: Number(hint[1]), line: parseSpoken(hint[2] ?? '') });
      const ok = /^- \[KHI ĐÚNG\] (.+)$/.exec(line);
      if (ok) {
        c.onCorrect = parseSpoken(ok[1] ?? '');
        return;
      }
      const q = QUESTION_RE.exec(line);
      if (q) {
        c.question = { id: q[1] ?? '', asker: { speaker: q[2] ?? '', text: q[3] ?? '' }, choices: [] };
        return;
      }
      const ev = /^- Vật chứng lưu vào hồ sơ: ([a-z0-9-]+)$/.exec(line);
      if (ev) {
        c.evidence = { id: ev[1] ?? '', title: '', description: '' };
        evidenceOpen = true;
        return;
      }
      const field = FIELD_RE.exec(line);
      if (field) {
        const label = field[1] ?? '';
        if (c.fields[label] !== undefined) throw new Error(`thẻ ${c.id}: dòng "${label}" lặp lại`);
        c.fields[label] = field[2] ?? '';
        sqlField = (field[2] ?? '') === '' ? label : null;
        return;
      }
      throw new Error(`dòng không khớp quy ước thẻ thử thách: "${line}"`);
    }

    // ---------- Hồ sơ vật chứng ----------
    function readDossierLine(line: string): void {
      if (line.trim() === '' || line === '---') return;
      if (!dcard) {
        // Chỉ dẫn chung của hồ sơ, trước thẻ đầu tiên.
        if (line.startsWith('- [DÀN DỰNG] ')) return;
        throw new Error(`dòng nằm ngoài thẻ hồ sơ: "${line}"`);
      }
      const d: RawDossierCard = dcard;
      if (line.startsWith('>')) {
        if (!quoteField) throw new Error('đoạn trích không thuộc dòng "- Nhãn:" nào');
        const text = line.replace(/^>\s?/, '');
        if (text.trim() === '') return; // dòng trống giữa hai đoạn
        (d.quotes[quoteField] ??= []).push(text);
        return;
      }
      quoteField = null;
      if (line.startsWith('- [DÀN DỰNG] ')) return void d.notes.push(line.slice('- [DÀN DỰNG] '.length));
      const field = FIELD_RE.exec(line);
      if (field) {
        const label = field[1] ?? '';
        const value = field[2] ?? '';
        d.fields[label] = value;
        if (value === '') quoteField = label;
        return;
      }
      if (line.startsWith('- ')) return void d.notes.push(line.slice(2));
      throw new Error(`dòng không khớp quy ước thẻ hồ sơ: "${line}"`);
    }
  }

  // ---------- Kiểm tra chéo (sau khi đọc hết) ----------
  function canChuoi(id: string): void {
    if (!out.sequences.some((s) => s.id === id)) throw new Error(`không có chuỗi "${id}"`);
  }
  function canHoSo(id: string): void {
    if (!out.dossier.some((d) => d.id === id)) throw new Error(`không có thẻ hồ sơ "${id}"`);
  }
  function canThuThach(id: string): void {
    if (!out.challenges.some((c) => c.id === id)) throw new Error(`không có thẻ thử thách "${id}"`);
  }
  function canVatChungThuThach(id: string): void {
    if (!out.challenges.some((c) => c.evidence?.id === id)) throw new Error(`không thẻ thử thách nào lưu vật chứng "${id}"`);
  }
  function ganNapSan(c: RawChallengeCard): void {
    const sql = c.sql['Truy vấn nạp sẵn'];
    const nguon = c.fields['Nguồn điều kiện nạp sẵn'];
    if (sql === undefined && nguon === undefined) return;
    if (sql === undefined) throw new Error(`thẻ ${c.id}: có "Nguồn điều kiện nạp sẵn" mà thiếu "Truy vấn nạp sẵn" + khối sql`);
    try {
      c.napSan = docModelNapSan(sql, nguon ?? '');
    } catch (e) {
      throw new Error(`thẻ ${c.id}, truy vấn nạp sẵn: ${(e as Error).message}`, { cause: e });
    }
    for (const dk of c.napSan.conditions) {
      if (dk.source.kind === 'clue') canHoSo(dk.source.clueId);
      if (dk.source.kind === 'evidence') canVatChungThuThach(dk.source.evidenceId);
    }
  }
}
