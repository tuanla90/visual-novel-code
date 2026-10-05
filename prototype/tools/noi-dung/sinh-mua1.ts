/**
 * `npm run noi-dung:sinh:mua1` — đọc `prototype/noi-dung-mua-1/`, kiểm chéo, chuyển và GHI
 * `src/content/generated/mua-1/kich-ban.gen.ts` cùng `hoi-dap.gen.ts` (tờ dữ kiện hỏi nhân chứng, `hoi-dap/*.json`, gói B12).
 * Có lỗi → in `<tệp>:<dòng>: …`, không ghi, mã thoát 1.
 * Không import gì từ `src/`.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chuyenMvp, type DuLieuMvp } from './chuyen-mvp.ts';
import { dinhDangLoi } from './doc-mvp.ts';
import { docHoiDap, type BoHoiDap } from './hoi-dap-mua1.ts';
import { kiemLuatMvp } from './luat-mvp.ts';
import { tepLechTrenDia } from './sinh.ts';
import { docSpriteVat, docTenAnh, docThuMucMvp, traViTri } from './thu-muc-mvp.ts';

export const THU_MUC_NOI_DUNG_MUA_1 = fileURLToPath(new URL('../../noi-dung-mua-1/', import.meta.url));
export const THU_MUC_SINH_MUA_1 = fileURLToPath(new URL('../../src/content/generated/mua-1/', import.meta.url));

const DAU_TEP = [
  '// ĐỪNG SỬA TAY — tệp SINH TỰ ĐỘNG từ prototype/noi-dung-mua-1/**/*.md bởi `npm run noi-dung:sinh:mua1`',
  '// (tools/noi-dung/sinh-mua1.ts). Muốn đổi chữ: sửa tệp .md, chạy `npm run kiem-noi-dung:mua1` rồi',
  '// `npm run noi-dung:sinh:mua1`, commit cả .md lẫn .gen.ts.',
].join('\n');

const DAU_TEP_HOI_DAP = [
  '// ĐỪNG SỬA TAY — tệp SINH TỰ ĐỘNG từ prototype/noi-dung-mua-1/hoi-dap/*.json bởi `npm run noi-dung:sinh:mua1`',
  '// (tools/noi-dung/sinh-mua1.ts, tools/noi-dung/hoi-dap-mua1.ts). Muốn đổi chữ: sửa tệp .json, chạy `npm run kiem-noi-dung:mua1`',
  '// rồi `npm run noi-dung:sinh:mua1`, commit cả .json lẫn .gen.ts.',
].join('\n');

const js = (v: unknown): string => JSON.stringify(v, null, 2);

/** Chữ các tệp sinh. `hoiDap` = tờ dữ kiện đã đọc (`null` / thiếu = thư mục không có hoi-dap/, sinh như trước gói B12). */
export function vanBanMua1(d: DuLieuMvp, hoiDap: BoHoiDap | null = null): Record<string, string> {
  const tep: Record<string, string> = {
    'kich-ban.gen.ts': [
      DAU_TEP,
      "import type { KichBanMvp } from '../../mvp/types';",
      "import { themNhieuMvp } from '../../../../tools/noi-dung/nhieu-mvp';",
      ...(hoiDap ? ["import { HOI_DAP_MUA_1 } from './hoi-dap.gen';"] : []),
      '',
      '/** Kịch bản Mùa 1: noi-dung-mua-1/. */',
      `const GOC = ${js(d)} satisfies KichBanMvp;`,
      '',
      '/** Bảng dữ liệu = dòng của truyện (ở trên) + dữ liệu nền sinh lại lúc nạp (tools/noi-dung/nhieu-mvp.ts, hạt cố định). */',
      hoiDap
        ? 'export const KICH_BAN_MUA_1 = { ...GOC, hoiDap: HOI_DAP_MUA_1, duLieu: GOC.duLieu ? themNhieuMvp(GOC.duLieu) : GOC.duLieu } satisfies KichBanMvp;'
        : 'export const KICH_BAN_MUA_1 = { ...GOC, duLieu: GOC.duLieu ? themNhieuMvp(GOC.duLieu) : GOC.duLieu } satisfies KichBanMvp;',
      'export const KICH_BAN_MVP = KICH_BAN_MUA_1;',
      '',
    ].join('\n'),
  };
  if (hoiDap) {
    tep['hoi-dap.gen.ts'] = [
      DAU_TEP_HOI_DAP,
      "import type { BoHoiDapMvp } from '../../mvp/types';",
      '',
      '/** Tờ dữ kiện hỏi nhân chứng Mùa 1 (gói B12): câu hỏi mẫu chung + tờ theo mã chuỗi. */',
      `export const HOI_DAP_MUA_1 = ${js(hoiDap)} satisfies BoHoiDapMvp;`,
      '',
    ].join('\n');
  }
  return tep;
}

export interface KetQuaSinhMua1 {
  tep: Record<string, string>;
  duLieu: DuLieuMvp | null;
  loi: string[];
}

export function sinhVanBanMua1(thuMuc: string = THU_MUC_NOI_DUNG_MUA_1): KetQuaSinhMua1 {
  const kq = docThuMucMvp(thuMuc);
  const luat = kiemLuatMvp(kq.mvp, { spriteVat: docSpriteVat(), anh: docTenAnh() });
  // Giọng của lời trong tờ dữ kiện do `kiem-noi-dung:mua1` / `kiem-giong:mua1` kiểm (như lời trong loi/); ở đây chỉ luật tờ.
  const hd = docHoiDap(thuMuc, kq.mvp, { giong: false });
  const loi = [...kq.loi, ...luat.loi.map((l) => traViTri(l, kq.banDo))].map(dinhDangLoi).concat(hd.loi);
  if (loi.length > 0) return { tep: {}, duLieu: null, loi };
  try {
    const duLieu = chuyenMvp(kq.mvp, luat);
    return { tep: vanBanMua1(duLieu, hd.bo), duLieu, loi: [] };
  } catch (e) {
    return { tep: {}, duLieu: null, loi: [(e as Error).message] };
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const kq = sinhVanBanMua1(process.argv[2] ?? THU_MUC_NOI_DUNG_MUA_1);
  if (kq.loi.length > 0) {
    for (const l of kq.loi) console.error(l);
    console.error(`noi-dung:sinh:mua1: ${kq.loi.length} lỗi — không ghi tệp nào.`);
    process.exitCode = 1;
  } else {
    const lech = tepLechTrenDia(kq.tep, THU_MUC_SINH_MUA_1);
    mkdirSync(THU_MUC_SINH_MUA_1, { recursive: true });
    for (const ten of lech) writeFileSync(join(THU_MUC_SINH_MUA_1, ten), kq.tep[ten] ?? '', 'utf8');
    console.log(lech.length === 0 ? 'noi-dung:sinh:mua1: tệp đã khớp nội dung, không ghi gì.' : `noi-dung:sinh:mua1: đã ghi ${lech.map((t) => `src/content/generated/mua-1/${t}`).join(', ')}.`);
  }
}
