/**
 * NỘI DUNG THẬT — ghép từ dữ liệu SINH (`src/content/generated/*.gen.ts`, sinh từ `prototype/noi-dung/*.md`
 * bằng `npm run noi-dung:sinh` — gói 12a-2) với đặc tả engine `CHALLENGE_SPECS`. Không còn bản chép tay:
 * muốn đổi chữ thì sửa tệp .md rồi sinh lại (test "file sinh khớp nội dung" đỏ nếu quên).
 */
import { CHALLENGE_SPECS } from '../../sql-challenge/data/challenges';
import { COT_TRUYEN, TEN_GAME } from '../generated/cot-truyen.gen';
import { HO_SO } from '../generated/ho-so.gen';
import { GOI_Y_CHUAN, NHAN_XET_CHUNG, THU_THACH } from '../generated/thu-thach.gen';
import type { GameContent } from '../types';

export const realContent: GameContent = {
  meta: { title: TEN_GAME, isSample: false, version: 'kich-ban-prototype-v0.1' },
  story: COT_TRUYEN,
  evidence: HO_SO,
  challenges: {
    c1: { spec: CHALLENGE_SPECS.c1, content: THU_THACH.c1 },
    c2: { spec: CHALLENGE_SPECS.c2, content: THU_THACH.c2 },
    c3: { spec: CHALLENGE_SPECS.c3, content: THU_THACH.c3 },
    'debrief-fix': { spec: CHALLENGE_SPECS['debrief-fix'], content: THU_THACH['debrief-fix'] },
  },
  standardHints: GOI_Y_CHUAN,
  commonDiagnosticLines: NHAN_XET_CHUNG,
};
