/**
 * `npm run noi-dung:sinh:thu-b19` — đọc BỘ THỬ B19 (`prototype/noi-dung-thu-b19/`, chỉ để test và thử tay các lệnh mới của gói
 * B19), kiểm chéo, chuyển và GHI `src/content/generated/thu-b19/kich-ban.gen.ts`. Có lỗi → in `<tệp>:<dòng>: …`, không ghi,
 * mã thoát 1. `npm run kiem-noi-dung:thu-b19` chỉ kiểm (kể cả chạy thật số dòng SQL). Không import gì từ `src/`.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chuyenMvp, type DuLieuMvp } from './chuyen-mvp.ts';
import { dinhDangLoi } from './doc-mvp.ts';
import { kiemNoiDungMvp } from './kiem-mvp.ts';
import { kiemLuatMvp } from './luat-mvp.ts';
import { tepLechTrenDia } from './sinh.ts';
import { docSpriteVat, docTenAnh, docThuMucMvp, traViTri } from './thu-muc-mvp.ts';

export const THU_MUC_NOI_DUNG_THU_B19 = fileURLToPath(new URL('../../noi-dung-thu-b19/', import.meta.url));
export const THU_MUC_SINH_THU_B19 = fileURLToPath(new URL('../../src/content/generated/thu-b19/', import.meta.url));
const HIEN_THI = 'noi-dung-thu-b19';

const DAU_TEP = [
  '// ĐỪNG SỬA TAY — tệp SINH TỰ ĐỘNG từ prototype/noi-dung-thu-b19/**/*.md (bộ thử của gói B19) bởi',
  '// `npm run noi-dung:sinh:thu-b19` (tools/noi-dung/sinh-thu-b19.ts). Muốn đổi: sửa tệp .md, chạy lại lệnh, commit cả hai.',
].join('\n');

const js = (v: unknown): string => JSON.stringify(v, null, 2);

/** Chữ tệp sinh. Bộ thử đi luật điều hướng tự do như bộ mùa 1. */
export function vanBanThuB19(d: DuLieuMvp): Record<string, string> {
  return {
    'kich-ban.gen.ts': [
      DAU_TEP,
      "import type { KichBanMvp } from '../../mvp/types';",
      '',
      '/** Bộ thử B19: noi-dung-thu-b19/. */',
      `const GOC = ${js(d)} satisfies KichBanMvp;`,
      '',
      'export const KICH_BAN_THU_B19 = { ...GOC, dieuHuongTuDo: true } satisfies KichBanMvp;',
      '',
    ].join('\n'),
  };
}

export function sinhVanBanThuB19(thuMuc: string = THU_MUC_NOI_DUNG_THU_B19): { tep: Record<string, string>; duLieu: DuLieuMvp | null; loi: string[] } {
  const kq = docThuMucMvp(thuMuc, HIEN_THI);
  const luat = kiemLuatMvp(kq.mvp, { spriteVat: docSpriteVat(), anh: docTenAnh() });
  const loi = [...kq.loi, ...luat.loi.map((l) => traViTri(l, kq.banDo))].map(dinhDangLoi);
  if (loi.length > 0) return { tep: {}, duLieu: null, loi };
  try {
    const duLieu = chuyenMvp(kq.mvp, luat);
    return { tep: vanBanThuB19(duLieu), duLieu, loi: [] };
  } catch (e) {
    return { tep: {}, duLieu: null, loi: [(e as Error).message] };
  }
}

/** Kiểm bộ thử như `kiem-noi-dung:mvp` (đọc, luật, chạy thật SQL khai số dòng, tệp sinh khớp). */
export function kiemNoiDungThuB19(thuMuc: string = THU_MUC_NOI_DUNG_THU_B19) {
  return kiemNoiDungMvp(thuMuc, THU_MUC_SINH_THU_B19, vanBanThuB19, HIEN_THI);
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  if (process.argv.includes('--kiem')) {
    const { loi, canhBao, tomTat, tepCu } = await kiemNoiDungThuB19();
    for (const l of loi) console.error(l);
    for (const c of canhBao) console.warn(`Cảnh báo: ${c}`);
    console.log(tomTat);
    if (tepCu.length > 0) console.log(`Nhắc: ${tepCu.join(', ')} chưa khớp nội dung — chạy \`npm run noi-dung:sinh:thu-b19\`.`);
    process.exitCode = loi.length === 0 ? 0 : 1;
  } else {
    const kq = sinhVanBanThuB19();
    if (kq.loi.length > 0) {
      for (const l of kq.loi) console.error(l);
      console.error(`noi-dung:sinh:thu-b19: ${kq.loi.length} lỗi — không ghi tệp nào.`);
      process.exitCode = 1;
    } else {
      const lech = tepLechTrenDia(kq.tep, THU_MUC_SINH_THU_B19);
      mkdirSync(THU_MUC_SINH_THU_B19, { recursive: true });
      for (const ten of lech) writeFileSync(join(THU_MUC_SINH_THU_B19, ten), kq.tep[ten] ?? '', 'utf8');
      console.log(lech.length === 0 ? 'noi-dung:sinh:thu-b19: tệp đã khớp nội dung, không ghi gì.' : `noi-dung:sinh:thu-b19: đã ghi ${lech.map((t) => `src/content/generated/thu-b19/${t}`).join(', ')}.`);
    }
  }
}
