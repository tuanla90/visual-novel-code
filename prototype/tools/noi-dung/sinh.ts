/**
 * `npm run noi-dung:sinh` — đọc `prototype/noi-dung/`, chuyển thành dữ liệu game (chuyen.ts) và GHI
 * `src/content/generated/*.gen.ts` (cách A của QĐ-079/QĐ-088: file sinh được commit).
 *
 * - Có lỗi nội dung → in lỗi `<tệp>:<dòng>: …`, KHÔNG ghi tệp nào, mã thoát 1.
 * - `sinhVanBan()` trả chữ của từng tệp sinh trong bộ nhớ: test "file sinh khớp nội dung"
 *   (src/content/generated/generated.test.ts) so với tệp đã commit — quên sinh lại là đỏ.
 *
 * Như kiem.ts, tệp CLI này chạm `src/` duy nhất qua nguồn tên tạm (nguon-ten.ts).
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { bangTenTam } from '../../src/content/real/testing/nguon-ten.ts';
import { chuyenNoiDung, type DuLieuSinh } from './chuyen.ts';
import { dinhDangLoi, type BangTen } from './doc.ts';
import { docThuMuc } from './thu-muc.ts';

export const THU_MUC_NOI_DUNG = fileURLToPath(new URL('../../noi-dung/', import.meta.url));
export const THU_MUC_SINH = fileURLToPath(new URL('../../src/content/generated/', import.meta.url));

const DAU_TEP = [
  '// ĐỪNG SỬA TAY — tệp SINH TỰ ĐỘNG từ prototype/noi-dung/*.md bởi `npm run noi-dung:sinh`',
  '// (tools/noi-dung/sinh.ts). Muốn đổi chữ: sửa tệp .md, chạy `npm run kiem-noi-dung` rồi',
  '// `npm run noi-dung:sinh`, commit cả .md lẫn .gen.ts. Sửa tay ở đây → test "file sinh khớp nội dung" đỏ.',
].join('\n');

const js = (v: unknown): string => JSON.stringify(v, null, 2);

/** Chữ của từng tệp sinh (tên tệp → nội dung, xuống dòng `\n`). */
export function vanBanTuDuLieu(d: DuLieuSinh): Record<string, string> {
  return {
    'cot-truyen.gen.ts': [
      DAU_TEP,
      "import type { StoryContent } from '../../story/types';",
      '',
      '/** Tên game: phần trước " — " của tiêu đề `# …` ở noi-dung/quy-uoc.md. */',
      `export const TEN_GAME = ${js(d.tieuDe)};`,
      '',
      '/** Mạch chính: noi-dung/kich-ban/chinh/*.md, đúng thứ tự tệp và thứ tự chuỗi. */',
      `export const COT_TRUYEN = ${js(d.story)} satisfies StoryContent;`,
      '',
    ].join('\n'),
    'ho-so.gen.ts': [
      DAU_TEP,
      "import type { EvidenceContent } from '../../evidence/types';",
      '',
      '/** Thẻ manh mối (clue-…) và tài liệu (doc-…): noi-dung/ho-so/*.md. */',
      `export const HO_SO = ${js(d.evidence)} satisfies EvidenceContent;`,
      '',
    ].join('\n'),
    'thu-thach.gen.ts': [
      DAU_TEP,
      "import type { ChallengeId } from '../../shared/ids';",
      "import type { ChallengeContent, CommonDiagnosticLines, QueryModel, StandardHints } from '../../sql-challenge/types';",
      '',
      '/** Phần hiển thị của thẻ thử thách: noi-dung/thu-thach/*.md. */',
      `export const THU_THACH = ${js(d.challenges)} satisfies Record<ChallengeId, ChallengeContent>;`,
      '',
      '/** SQL của thẻ ("SQL chuẩn", "Truy vấn nạp sẵn" + model nạp sẵn) — engine ghép vào CHALLENGE_SPECS. */',
      `export const SQL_THU_THACH = ${js(d.challengeSql)} satisfies Record<ChallengeId, { referenceSql: string; preloadSql?: string; initialModel?: QueryModel }>;`,
      '',
      '/** "Ba câu gợi ý chuẩn": noi-dung/chung/loi-chung.md. */',
      `export const GOI_Y_CHUAN = ${js(d.standardHints)} satisfies StandardHints;`,
      '',
      '/** "Nhận xét chung cho mọi thử thách" — thứ tự khóa = thứ tự ưu tiên hiển thị (QĐ-047). */',
      `export const NHAN_XET_CHUNG = ${js(d.commonDiagnosticLines)} satisfies CommonDiagnosticLines;`,
      '',
    ].join('\n'),
  };
}

export interface KetQuaSinh {
  /** Rỗng khi có lỗi. */
  tep: Record<string, string>;
  duLieu: DuLieuSinh | null;
  loi: string[];
}

/** Đọc + chuyển trong bộ nhớ, không ghi gì. */
export function sinhVanBan(thuMuc: string = THU_MUC_NOI_DUNG, bangTen: BangTen = bangTenTam()): KetQuaSinh {
  const kq = docThuMuc(thuMuc, { bangTen });
  if (kq.loi.length > 0) return { tep: {}, duLieu: null, loi: kq.loi.map(dinhDangLoi) };
  let duLieu: DuLieuSinh;
  try {
    duLieu = chuyenNoiDung(kq.script);
  } catch (e) {
    return { tep: {}, duLieu: null, loi: [(e as Error).message] };
  }
  return { tep: vanBanTuDuLieu(duLieu), duLieu, loi: [] };
}

/** Tệp sinh nào khác chữ đã có trên đĩa (bỏ qua khác biệt CRLF/LF do git trên Windows). */
export function tepLechTrenDia(tep: Record<string, string>, thuMucSinh: string = THU_MUC_SINH): string[] {
  const doc = (p: string): string | null => {
    try {
      return readFileSync(p, 'utf8').replace(/\r\n?/g, '\n');
    } catch {
      return null;
    }
  };
  return Object.entries(tep)
    .filter(([ten, chu]) => doc(join(thuMucSinh, ten)) !== chu)
    .map(([ten]) => ten);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const kq = sinhVanBan(process.argv[2] ?? THU_MUC_NOI_DUNG);
  if (kq.loi.length > 0) {
    for (const l of kq.loi) console.error(l);
    console.error(`noi-dung:sinh: ${kq.loi.length} lỗi — không ghi tệp nào.`);
    process.exitCode = 1;
  } else {
    const lech = tepLechTrenDia(kq.tep);
    mkdirSync(THU_MUC_SINH, { recursive: true });
    for (const ten of lech) writeFileSync(join(THU_MUC_SINH, ten), kq.tep[ten] ?? '', 'utf8');
    console.log(
      lech.length === 0
        ? `noi-dung:sinh: ${Object.keys(kq.tep).length} tệp đã khớp nội dung, không ghi gì.`
        : `noi-dung:sinh: đã ghi ${lech.map((t) => `src/content/generated/${t}`).join(', ')}.`,
    );
  }
}
