/**
 * `npm run noi-dung:sinh:mvp` — đọc `prototype/noi-dung-mvp/`, kiểm chéo, chuyển và GHI
 * `src/content/generated/mvp/kich-ban.gen.ts` (cách A, QĐ-088). Có lỗi → in `<tệp>:<dòng>: …`, không ghi, mã thoát 1.
 * `sinhVanBanMvp()` trả chữ trong bộ nhớ cho test "file sinh khớp nội dung" (src/content/generated/mvp/mvp.gen.test.ts).
 * Không import gì từ `src/`.
 */
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chuyenMvp, type DuLieuMvp } from './chuyen-mvp.ts';
import { dinhDangLoi } from './doc-mvp.ts';
import { kiemLuatMvp } from './luat-mvp.ts';
import { tepLechTrenDia } from './sinh.ts';
import { docSpriteVat, docTenAnh, docThuMucMvp, traViTri } from './thu-muc-mvp.ts';

export const THU_MUC_NOI_DUNG_MVP = fileURLToPath(new URL('../../noi-dung-mvp/', import.meta.url));
export const THU_MUC_SINH_MVP = fileURLToPath(new URL('../../src/content/generated/mvp/', import.meta.url));

const DAU_TEP = [
  '// ĐỪNG SỬA TAY — tệp SINH TỰ ĐỘNG từ prototype/noi-dung-mvp/**/*.md bởi `npm run noi-dung:sinh:mvp`',
  '// (tools/noi-dung/sinh-mvp.ts). Muốn đổi chữ: sửa tệp .md, chạy `npm run kiem-noi-dung:mvp` rồi',
  '// `npm run noi-dung:sinh:mvp`, commit cả .md lẫn .gen.ts. Sửa tay ở đây → test "file sinh khớp nội dung" đỏ.',
].join('\n');

const js = (v: unknown): string => JSON.stringify(v, null, 2);

export function vanBanMvp(d: DuLieuMvp): Record<string, string> {
  return {
    'kich-ban.gen.ts': [
      DAU_TEP,
      "import type { KichBanMvp } from '../../mvp/types';",
      "import { themNhieuMvp } from '../../../../tools/noi-dung/nhieu-mvp';",
      '',
      '/** Kịch bản MVP (mở đầu + Vụ 1): noi-dung-mvp/. Chưa có runtime đọc (gói kiến trúc MVP, QĐ-077). */',
      `const GOC = ${js(d)} satisfies KichBanMvp;`,
      '',
      '/** Bảng dữ liệu = dòng của truyện (ở trên) + dữ liệu nền sinh lại lúc nạp (tools/noi-dung/nhieu-mvp.ts, hạt cố định). */',
      'export const KICH_BAN_MVP = { ...GOC, duLieu: GOC.duLieu ? themNhieuMvp(GOC.duLieu) : GOC.duLieu } satisfies KichBanMvp;',
      '',
    ].join('\n'),
  };
}

export interface KetQuaSinhMvp {
  tep: Record<string, string>;
  duLieu: DuLieuMvp | null;
  loi: string[];
}

export function sinhVanBanMvp(thuMuc: string = THU_MUC_NOI_DUNG_MVP): KetQuaSinhMvp {
  const kq = docThuMucMvp(thuMuc);
  const luat = kiemLuatMvp(kq.mvp, { spriteVat: docSpriteVat(), anh: docTenAnh() });
  const loi = [...kq.loi, ...luat.loi.map((l) => traViTri(l, kq.banDo))].map(dinhDangLoi);
  if (loi.length > 0) return { tep: {}, duLieu: null, loi };
  try {
    const duLieu = chuyenMvp(kq.mvp, luat);
    return { tep: vanBanMvp(duLieu), duLieu, loi: [] };
  } catch (e) {
    return { tep: {}, duLieu: null, loi: [(e as Error).message] };
  }
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const kq = sinhVanBanMvp(process.argv[2] ?? THU_MUC_NOI_DUNG_MVP);
  if (kq.loi.length > 0) {
    for (const l of kq.loi) console.error(l);
    console.error(`noi-dung:sinh:mvp: ${kq.loi.length} lỗi — không ghi tệp nào.`);
    process.exitCode = 1;
  } else {
    const lech = tepLechTrenDia(kq.tep, THU_MUC_SINH_MVP);
    mkdirSync(THU_MUC_SINH_MVP, { recursive: true });
    for (const ten of lech) writeFileSync(join(THU_MUC_SINH_MVP, ten), kq.tep[ten] ?? '', 'utf8');
    console.log(lech.length === 0 ? 'noi-dung:sinh:mvp: tệp đã khớp nội dung, không ghi gì.' : `noi-dung:sinh:mvp: đã ghi ${lech.map((t) => `src/content/generated/mvp/${t}`).join(', ')}.`);
  }
}
