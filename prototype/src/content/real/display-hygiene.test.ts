/**
 * Canh giữ QĐ-049: không chuỗi hiển thị nào của nội dung thật chứa định danh thô hay chỉ dẫn của
 * người viết. Quét MỌI chuỗi người chơi đọc được (testing/shown-strings.ts — không gồm [DÀN DỰNG]).
 *
 * Luật (ranh giới tính cả chữ có dấu và gạch nối, không dùng `\b` ASCII):
 * - định danh chuỗi `intro-/inv-/ana-/deb-/end-NN`; tiền tố `hs-`, `q-`, `clue-`, `doc-`, `ev-`;
 * - mọi mã trong DIAGNOSTIC_CODES đứng riêng (kể cả `other`);
 * - mọi token chữ thường ASCII có gạch nối (dạng id: `inv-letter`, `ha-vy`, `co-so-lieu-day`…);
 * - id một chữ tiếng Anh của ids.ts (biểu cảm, phần, `player`, `narrator`, `c1`…) — TRỪ `quan`, `hoai`
 *   vì trùng âm tiết tiếng Việt ("quan trọng", "quan sát");
 * - cụm chỉ dẫn: "xem mục", "Thẻ kèm", "[DÀN DỰNG]", "QĐ-…", "§…".
 * Canary tự chứng minh: phải bắt đủ các mẫu lỗi cắm sẵn và KHÔNG bắt nhầm chữ/SQL bình thường.
 */
import { describe, expect, it } from 'vitest';
import {
  CHALLENGE_IDS,
  CHARACTER_EXPRESSIONS,
  DIAGNOSTIC_CODES,
  PART_IDS,
  SPECIAL_SPEAKER_IDS,
  CHARACTER_IDS,
} from '../../shared/ids';
import { QUAN_OR_QUERY } from '../../sql-challenge/data/challenges';
import { realContent } from '.';
import { shownStrings } from './testing/shown-strings';

const START = '(?<![\\p{L}\\p{N}_-])';
const END = '(?![\\p{L}\\p{N}_-])';
const word = (alternatives: readonly string[]): RegExp => new RegExp(`${START}(?:${alternatives.join('|')})${END}`, 'gu');

/** id một chữ (không gạch nối) trùng âm tiết tiếng Việt — không coi là định danh thô khi đứng riêng. */
const VIETNAMESE_SYLLABLE_IDS = new Set(['quan', 'hoai']);
const SINGLE_WORD_IDS = [
  ...CHARACTER_IDS,
  ...Object.values(CHARACTER_EXPRESSIONS).flat(),
  ...SPECIAL_SPEAKER_IDS,
  ...PART_IDS,
  ...CHALLENGE_IDS,
].filter((id, i, all) => !id.includes('-') && !VIETNAMESE_SYLLABLE_IDS.has(id) && all.indexOf(id) === i);

const RULES: { name: string; re: RegExp }[] = [
  { name: 'định danh chuỗi', re: new RegExp(`${START}(?:intro|inv|ana|deb|end)-\\d\\d${END}`, 'gu') },
  { name: 'tiền tố định danh', re: new RegExp(`${START}(?:hs|q|clue|doc|ev)-[a-z0-9]+(?:-[a-z0-9]+)*`, 'gu') },
  { name: 'mã chẩn đoán', re: word(DIAGNOSTIC_CODES) },
  { name: 'token id có gạch nối', re: new RegExp(`${START}[a-z][a-z0-9]*(?:-[a-z0-9]+)+${END}`, 'gu') },
  { name: 'id một chữ', re: word(SINGLE_WORD_IDS) },
  { name: 'cụm chỉ dẫn', re: /xem mục|thẻ kèm|\[DÀN DỰNG\]|QĐ-\d|§\s?\d/giu },
];

function findLeaks(text: string): string[] {
  const found: string[] = [];
  for (const { name, re } of RULES) for (const m of text.matchAll(re)) found.push(`${name}: ${m[0]}`);
  return found;
}

describe('canary tự kiểm: bắt đúng lỗi cắm sẵn', () => {
  it.each([
    ['Cô phụ trách hộp góp ý, gửi qua Phòng CTSV theo đề nghị của CLB (end-01)', 'end-01'],
    ['Mở lại thẻ clue-signature-h', 'clue-signature-h'],
    ['Câu q-sig-h chưa trả lời', 'q-sig-h'],
    ['Điểm hs-letter', 'hs-letter'],
    ['Tài liệu doc-letter', 'doc-letter'],
    ['Thẻ ev-c3-shortlist', 'ev-c3-shortlist'],
    ['Lỗi no-filter ở đây', 'no-filter'],
    ['Rơi về other.', 'other'],
    ['Chuỗi inv-letter', 'inv-letter'],
    ['ha-vy nói', 'ha-vy'],
    ['Hiệu ứng co-so-lieu-day', 'co-so-lieu-day'],
    ['Biểu cảm neutral', 'neutral'],
    ['Sang phần investigation', 'investigation'],
    ['Người nói narrator', 'narrator'],
    ['Thử thách c3', 'c3'],
    ['Thẻ kèm câu SQL đã chạy và bảng kết quả.', 'Thẻ kèm'],
    ['Chú thích gắn sau màn giải trình: xem mục Hồ sơ vật chứng.', 'xem mục'],
    ['Ba lựa chọn cân nhau (QĐ-035).', 'QĐ-0'],
    ['Truy vấn của Quân (§4.4).', '§4'],
  ])('bắt: %s', (text, token) => {
    const leaks = findLeaks(text);
    expect(leaks.some((l) => l.includes(token)), `không bắt được "${token}" trong "${text}"`).toBe(true);
  });

  it.each([
    'Tôi công nhận truy vấn. Giờ đến câu quan trọng hơn.',
    'Ngày xưa CLB phá vụ bằng mắt và chân: quan sát hiện trường, hỏi nhân chứng, đọc dấu vết.',
    'SV240317 có trong sổ. Phòng CTSV sẽ mời bạn ấy lên.',
    'Tôi là Quân, Ban Pháp chế – Kiểm tra Hội sinh viên. Tôi không xét nội dung lá thư.',
    QUAN_OR_QUERY,
    "Gần như đáp án: `SELECT ma_sv, ho_dem, ten, ma_lop, clb FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí';`",
    'Nửa logo ngòi bút, còn mấy chữ "…ÁO CHÍ". Bookmark của CLB Báo chí, họ phát ở ngày hội CLB.',
    'Em là Hoài, lớp QT24B. Em… có làm gì sai không ạ?',
    'Mở bảng mô tả cột ra xem. Cột tòa nhà nằm ở bảng nào?',
    'H — Chữ ký tay (chỉ đọc được chữ H)',
    'Dấu % nghĩa là "sau đó là gì cũng được". Bấm Chạy nào!',
    'Nhiệm vụ tiếp theo →',
  ])('không bắt nhầm: %s', (text) => {
    expect(findLeaks(text)).toEqual([]);
  });
});

describe('QĐ-049: chuỗi hiển thị của nội dung thật sạch định danh thô và chỉ dẫn', () => {
  const shown = shownStrings(realContent);

  it('quét đủ rộng (mọi loại chuỗi hiển thị đều có mặt)', () => {
    // 273 lúc viết: chuỗi truyện 144 (89 lời, 16 nhiệm vụ, 3 nhãn, 23 chữ của 3 câu hỏi, 5 dòng SQL + 6 phản hồi
    // chọn dòng, 1 SQL màn chiếu, 1 chú thích) · thử thách 74 · manh mối 18 · tài liệu 19 · nhận xét chung 14
    // · gợi ý chuẩn 3 · tên game 1.
    expect(shown.length).toBeGreaterThanOrEqual(273);
    for (const prefix of ['seq:', 'clue:', 'doc:', 'challenge:', 'hint:', 'common-diag:', 'meta/']) {
      expect(shown.some((s) => s.where.startsWith(prefix)), prefix).toBe(true);
    }
  });

  it('0 chuỗi dính định danh thô hay cụm chỉ dẫn', () => {
    const leaks = shown.flatMap((s) => findLeaks(s.text).map((l) => `${s.where} → ${l} | ${s.text}`));
    expect(leaks).toEqual([]);
  });
});
