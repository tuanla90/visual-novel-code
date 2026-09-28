// @vitest-environment node
/**
 * Nội dung (prototype/noi-dung/) ↔ dữ liệu game — phần còn cần kiểm sau khi bỏ bản chép tay (gói 12a-2).
 *
 * Dữ liệu hiển thị giờ SINH từ nội dung (src/content/generated, test "file sinh khớp nội dung"), nên phép
 * so hai chiều từng ký tự của faithfulness.test.ts cũ không còn cần. Ở đây giữ các khẳng định KHÔNG tự
 * đúng nhờ bộ sinh:
 * - bộ đọc không bỏ sót dòng nào (đếm dòng thô ↔ mục bộ đọc ↔ node dữ liệu);
 * - phần đặc tả engine còn viết tay (`CHALLENGE_SPECS`: cột, số dòng, dataset ẩn) khớp dòng "Cột bắt buộc"
 *   / "Nạp sẵn vào trình dựng" của thẻ;
 * - các luật nội dung: biểu cảm người hỏi, thứ tự mã blocking (QĐ-052), phản hồi = câu gợi ý chuẩn.
 */
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { BLOCKING_DIAGNOSTIC_CODES, CHALLENGE_IDS, CLUE_IDS, DOCUMENT_IDS } from '../../shared/ids';
import { CHALLENGE_SPECS } from '../../sql-challenge/data/challenges';
import { dinhDangLoi } from '../../../tools/noi-dung/doc.ts';
import { docThuMuc } from '../../../tools/noi-dung/thu-muc.ts';
import { realContent } from '.';
import { bangTenTam } from './testing/nguon-ten';

const NOI_DUNG = fileURLToPath(new URL('../../../noi-dung/', import.meta.url));
const doc = docThuMuc(NOI_DUNG, { bangTen: bangTenTam() });
if (doc.loi.length > 0) throw new Error(`bộ đọc báo lỗi:\n${doc.loi.map(dinhDangLoi).join('\n')}`);
const script = doc.script;
/** Toàn bộ chữ các tệp bộ đọc đọc (đúng thứ tự đọc), chưa thay biến. */
const MARKDOWN = doc.tep.map((t) => t.noiDung.replace(/\r\n?/g, '\n')).join('\n');

describe('nội dung đọc được trọn', () => {
  it('đủ 5 phần theo thứ tự, 20 chuỗi, 4 thẻ thử thách, 7 thẻ hồ sơ + chú thích của 3 thẻ có dữ liệu cá nhân (QĐ-062)', () => {
    expect(script.parts.map((p) => p.id)).toEqual(['intro', 'investigation', 'analysis', 'debrief', 'ending']);
    expect(script.sequences).toHaveLength(20);
    expect(script.challenges.map((c) => c.id)).toEqual([...CHALLENGE_IDS]);
    expect(script.dossier.map((d) => d.id)).toEqual([...CLUE_IDS, ...DOCUMENT_IDS, 'ev-c1-names-h', 'ev-c3-shortlist', 'ev-quan-fixed']);
    expect(realContent.story.sequences.map((s) => s.id)).toEqual(script.sequences.map((s) => s.id));
    expect(realContent.meta.isSample).toBe(false);
  });
});

describe('luật nội dung trên dữ liệu sinh', () => {
  it('biểu cảm người hỏi (nội dung không ghi): lời gần nhất của chính người đó ngay trước', () => {
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

  it('QĐ-052: nội dung liệt kê mã blocking đúng thứ tự engine — ở dòng quy ước ưu tiên và ở "Nhận xét chung"', () => {
    const convention = /lỗi không chạy được \(([^)]*)\)/.exec(MARKDOWN)?.[1] ?? '';
    expect([...convention.matchAll(/`([a-z-]+)`/g)].map((m) => m[1])).toEqual([...BLOCKING_DIAGNOSTIC_CODES]);
    const blocking = Object.keys(realContent.commonDiagnosticLines).filter((c) => (BLOCKING_DIAGNOSTIC_CODES as readonly string[]).includes(c));
    expect(blocking).toEqual([...BLOCKING_DIAGNOSTIC_CODES]);
  });

  it('phản hồi tim-ra-roi của q-two-rows chính là câu gợi ý chuẩn hint-ask-or-conclude', () => {
    const node = realContent.story.sequences.flatMap((s) => s.nodes).find((n) => n.type === 'question' && n.question.id === 'q-two-rows');
    const choice = node?.type === 'question' ? node.question.choices.find((c) => c.id === 'tim-ra-roi') : undefined;
    expect(choice?.feedback).toEqual([realContent.standardHints['hint-ask-or-conclude']]);
  });

  it('thẻ thử thách có đủ ba mức gợi ý 1, 2, 3', () => {
    for (const card of script.challenges) expect(card.hints.map((h) => h.level), card.id).toEqual([1, 2, 3]);
  });
});

describe('đặc tả engine (CHALLENGE_SPECS) khớp dòng của thẻ thử thách', () => {
  it.each([...CHALLENGE_IDS])('%s: SQL chuẩn, cột bắt buộc/khuyến khích, số dòng, dataset ẩn, nạp sẵn', (id) => {
    const card = script.challenges.find((c) => c.id === id);
    if (!card) throw new Error(`nội dung thiếu thẻ ${id}`);
    const spec = CHALLENGE_SPECS[id];
    expect(realContent.challenges[id].spec).toBe(spec); // ghép, không chép lại
    expect(spec.referenceSql).toBe(card.sql['SQL chuẩn']);
    expect(Object.keys(card.sql).sort()).toEqual(spec.initialModel ? ['SQL chuẩn', 'Truy vấn nạp sẵn'] : ['SQL chuẩn']);
    const cols = card.fields['Cột bắt buộc'] ?? '';
    const [requiredPart = ''] = cols.split(' · ');
    const [required = '', encouraged = ''] = requiredPart.split('(khuyến khích');
    const ticks = (s: string): string[] => [...s.matchAll(/`([a-z_]+)`/g)].map((m) => m[1] ?? '');
    expect(spec.requiredColumns).toEqual(ticks(required));
    expect(spec.encouragedColumns).toEqual(ticks(encouraged));
    expect(spec.expectedRowCount).toBe(Number(/Kết quả chuẩn: (\d+) dòng/.exec(cols)?.[1]));
    expect(spec.runHiddenDataset).toBe(/dataset ẩn: có/.test(cols));
    expect(spec.table).toBe(/FROM (\w+)/.exec(spec.referenceSql)?.[1]);
    const preload = card.fields['Nạp sẵn vào trình dựng'];
    expect(spec.initialModel !== undefined).toBe(preload !== undefined);
    if (preload !== undefined) expect(spec.initialModel?.connector).toBe(/phép nối chung `OR`/.test(preload) ? 'OR' : null);
    expect(card.napSan).toEqual(spec.initialModel ?? null);
  });
});

describe('bộ đọc không bỏ sót dòng: dòng thô ↔ mục bộ đọc ↔ node dữ liệu', () => {
  const storyText = doc.tep.filter((t) => t.loai === 'kich-ban').map((t) => t.noiDung.replace(/\r\n?/g, '\n')).join('\n');
  const rawCount = (text: string, re: RegExp): number => text.split('\n').filter((l) => re.test(l)).length;
  const items = script.sequences.flatMap((s) => s.items);
  const nodes = realContent.story.sequences.flatMap((s) => s.nodes);
  const countItems = (kind: string): number => items.filter((i) => i.kind === kind).length;
  const countNodes = (type: string): number => nodes.filter((n) => n.type === type).length;

  const ROWS: { name: string; re: RegExp; item: string | null; node: string | null; n: number }[] = [
    { name: 'chuỗi `### `', re: /^### /, item: null, node: null, n: 20 },
    { name: 'lời thoại `- **người nói**` (kể cả `- [THẺ CHỮ] **…**`)', re: /^- (\[THẺ CHỮ\] )?\*\*/, item: 'line', node: 'line', n: 99 },
    { name: '`> NHIỆM VỤ`', re: /^> NHIỆM VỤ: /, item: 'task', node: 'task', n: 17 },
    { name: '[HỎI] trong chuỗi truyện', re: /^- \[HỎI /, item: 'question', node: 'question', n: 3 },
    { name: '[ĐIỀU KIỆN QUA]', re: /^- \[ĐIỀU KIỆN QUA\]/, item: 'gate', node: 'gate', n: 4 },
    { name: '[HIỆN TÀI LIỆU]', re: /^- \[HIỆN TÀI LIỆU /, item: 'show-document', node: 'show-document', n: 3 },
    { name: '[HIỆU ỨNG]', re: /^- \[HIỆU ỨNG /, item: 'effect', node: 'effect', n: 2 },
    { name: '[CHỌN DÒNG]', re: /^- \[CHỌN DÒNG /, item: 'line-pick', node: 'line-pick', n: 1 },
    { name: '[DÀN DỰNG]', re: /^- \[DÀN DỰNG\] /, item: 'note', node: 'note', n: 29 },
    { name: '[ĐI TỚI]', re: /^- \[ĐI TỚI /, item: 'goto', node: 'goto', n: 12 },
    { name: '[THỬ THÁCH]', re: /^- \[THỬ THÁCH /, item: 'challenge', node: 'challenge', n: 3 },
    { name: '[SỬA TRUY VẤN]', re: /^- \[SỬA TRUY VẤN /, item: 'fix-query', node: 'fix-query', n: 1 },
    { name: '[KẾT THÚC]', re: /^- \[KẾT THÚC\]$/, item: 'end', node: 'end', n: 1 },
    { name: '[MÀN CHIẾU]', re: /^- \[MÀN CHIẾU /, item: 'projector', node: 'projector', n: 2 },
    { name: '[ĐẶT CỜ]', re: /^- \[ĐẶT CỜ /, item: 'set-flag', node: 'set-flag', n: 1 },
    { name: '[CHÚ THÍCH HỒ SƠ]', re: /^- \[CHÚ THÍCH HỒ SƠ /, item: 'annotate-evidence', node: 'annotate-evidence', n: 3 },
    { name: '[THẺ CHỮ]', re: /^- \[THẺ CHỮ\] /, item: null, node: null, n: 1 },
  ];

  it.each(ROWS)('$name: $n', ({ re, item, node, n }) => {
    expect(rawCount(storyText, re)).toBe(n);
    if (item) expect(countItems(item)).toBe(n);
    if (node) expect(countNodes(node)).toBe(n);
  });

  it('[ĐIỂM XEM XÉT]: 3 điểm; bảng chọn dòng 5 dòng SQL', () => {
    expect(rawCount(storyText, /^- \[ĐIỂM XEM XÉT /)).toBe(3);
    expect(countItems('hotspot')).toBe(3);
    expect(nodes.flatMap((n) => (n.type === 'explore' ? n.hotspots : []))).toHaveLength(3);
    const pick = nodes.find((n) => n.type === 'line-pick');
    expect(pick?.type === 'line-pick' ? pick.pick.lines.map((l) => l.index) : []).toEqual([1, 2, 3, 4, 5]);
  });

  it('[HỎI]: 3 trong chuỗi truyện + 3 câu đọc kết quả trong thẻ thử thách = 6 dòng [HỎI] của cả thư mục', () => {
    expect(rawCount(MARKDOWN, /^- \[HỎI /)).toBe(6);
    expect(CHALLENGE_IDS.map((id) => realContent.challenges[id].content.readQuestion?.id ?? null)).toEqual(['q-c1-read', 'q-c2-read', 'q-c3-read', null]);
  });

  it('thẻ hồ sơ: mỗi clue-/doc- thành đúng một thẻ dữ liệu', () => {
    expect(Object.keys(realContent.evidence.clues)).toEqual([...CLUE_IDS]);
    expect(Object.keys(realContent.evidence.documents)).toEqual([...DOCUMENT_IDS]);
  });
});
