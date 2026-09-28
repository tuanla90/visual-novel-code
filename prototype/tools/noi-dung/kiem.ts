/**
 * `npm run kiem-noi-dung` — đọc toàn bộ `prototype/noi-dung/`, CHỈ báo lỗi, không ghi tệp nào.
 *
 * In mỗi lỗi một dòng `<tệp>:<dòng>: <lỗi>` (bấm được trong VS Code), cuối cùng một dòng tóm tắt.
 * Mã thoát 0 khi không lỗi, 1 khi có lỗi. Đọc được thì chạy thử luôn bộ chuyển (chuyen.ts — lỗi hình dạng
 * như thẻ thiếu dòng bắt buộc cũng là lỗi) và báo nếu `src/content/generated/*.gen.ts` chưa sinh lại
 * (chỉ nhắc, không tính lỗi: đang sửa .md thì chưa sinh là bình thường).
 *
 * Nguồn tên cho biến `{{nv.…}}` / `{{truong.…}}` ở bước 12a-1 là `CHARACTER_NAMES` của game
 * (src/content/real/testing/nguon-ten.ts) — tệp CLI này là chỗ DUY NHẤT của tools/noi-dung chạm
 * vào src/; bộ đọc (doc.ts, bien.ts, nap-san.ts, thu-muc.ts) không import src/.
 */
import { fileURLToPath } from 'node:url';
import { bangTenTam } from '../../src/content/real/testing/nguon-ten.ts';
import { dinhDangLoi, type BangTen, type RawScript } from './doc.ts';
import { chuyenNoiDung } from './chuyen.ts';
import { tepLechTrenDia, vanBanTuDuLieu } from './sinh.ts';
import { docThuMuc } from './thu-muc.ts';

export const THU_MUC_NOI_DUNG = fileURLToPath(new URL('../../noi-dung/', import.meta.url));

export interface KetQuaKiem {
  loi: string[];
  tomTat: string;
  /** Tệp .gen.ts khác bản sinh từ nội dung hiện tại (chỉ tính khi không lỗi). */
  tepCu: string[];
}

function demNoiDung(s: RawScript): string {
  const loiThoai = s.sequences.flatMap((q) => q.items).filter((it) => it.kind === 'line').length;
  return `${s.parts.length} phần, ${s.sequences.length} chuỗi, ${loiThoai} lời thoại, ${s.challenges.length} thẻ thử thách, ${s.dossier.length} thẻ hồ sơ`;
}

export function kiemNoiDung(thuMuc: string = THU_MUC_NOI_DUNG, bangTen: BangTen = bangTenTam()): KetQuaKiem {
  const kq = docThuMuc(thuMuc, { bangTen });
  const loi = kq.loi.map(dinhDangLoi);
  let tepCu: string[] = [];
  if (loi.length === 0) {
    try {
      tepCu = tepLechTrenDia(vanBanTuDuLieu(chuyenNoiDung(kq.script)));
    } catch (e) {
      loi.push((e as Error).message);
    }
  }
  const tomTat =
    loi.length === 0
      ? `noi-dung: ${kq.tep.length} tệp, không lỗi — ${demNoiDung(kq.script)}.`
      : `noi-dung: ${kq.tep.length} tệp, ${loi.length} lỗi.`;
  return { loi, tomTat, tepCu };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const { loi, tomTat, tepCu } = kiemNoiDung(process.argv[2] ?? THU_MUC_NOI_DUNG);
  for (const l of loi) console.error(l);
  console.log(tomTat);
  if (tepCu.length > 0) console.log(`Nhắc: ${tepCu.join(', ')} chưa khớp nội dung — chạy \`npm run noi-dung:sinh\` rồi commit cả .gen.ts.`);
  process.exitCode = loi.length === 0 ? 0 : 1;
}
