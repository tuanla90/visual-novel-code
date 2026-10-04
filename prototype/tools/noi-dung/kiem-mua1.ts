/**
 * `npm run kiem-noi-dung:mua1` — kiểm nội dung `prototype/noi-dung-mua-1/` theo quy tắc Mùa 1.
 * Không import gì từ `src/`.
 */
import { fileURLToPath } from 'node:url';
import { kiemNoiDungMvp } from './kiem-mvp.ts';
import { THU_MUC_NOI_DUNG_MUA_1, THU_MUC_SINH_MUA_1, vanBanMua1 } from './sinh-mua1.ts';

export async function kiemNoiDungMua1(
  thuMuc: string = THU_MUC_NOI_DUNG_MUA_1,
  thuMucSinh: string = THU_MUC_SINH_MUA_1,
) {
  return kiemNoiDungMvp(thuMuc, thuMucSinh, vanBanMua1, 'noi-dung-mua-1');
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const { loi, canhBao, tomTat, tepCu } = await kiemNoiDungMua1(process.argv[2] ?? THU_MUC_NOI_DUNG_MUA_1);
  for (const l of loi) console.error(l);
  for (const c of canhBao) console.warn(`Cảnh báo: ${c}`);
  console.log(tomTat);
  if (tepCu.length > 0) console.log(`Nhắc: ${tepCu.join(', ')} chưa khớp nội dung — chạy \`npm run noi-dung:sinh:mua1\` rồi commit cả .gen.ts.`);
  process.exitCode = loi.length === 0 ? 0 : 1;
}
