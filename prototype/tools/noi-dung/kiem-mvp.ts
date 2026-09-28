/**
 * `npm run kiem-noi-dung:mvp` — đọc toàn bộ `prototype/noi-dung-mvp/`, kiểm chéo (luat-mvp.ts), chạy thử bộ
 * chuyển (chuyen-mvp.ts), CHỈ báo lỗi, không ghi tệp. Mỗi lỗi một dòng `<tệp>:<dòng>: <lỗi>`; mã thoát 1 khi
 * có lỗi. Nhắc (không tính lỗi) khi `src/content/generated/mvp/*.gen.ts` chưa sinh lại.
 * Không import gì từ `src/` (bảng tên lấy từ nhan-vat.md).
 */
import { fileURLToPath } from 'node:url';
import { chuyenMvp } from './chuyen-mvp.ts';
import { dinhDangLoi, type RawMvp } from './doc-mvp.ts';
import { kiemLuatMvp } from './luat-mvp.ts';
import { tepLechTrenDia } from './sinh.ts';
import { THU_MUC_SINH_MVP, vanBanMvp } from './sinh-mvp.ts';
import { docThuMucMvp } from './thu-muc-mvp.ts';

export const THU_MUC_NOI_DUNG_MVP = fileURLToPath(new URL('../../noi-dung-mvp/', import.meta.url));

export interface KetQuaKiemMvp {
  loi: string[];
  tomTat: string;
  tepCu: string[];
}

function dem(m: RawMvp): string {
  const loiThoai = m.chuoi.flatMap((c) => c.items).filter((it) => it.kind === 'line').length;
  const duKien = m.diaDiem.reduce((s, d) => s + d.duKien.length, 0);
  return `${m.nhanVat.length} nhân vật, ${m.canh.length} cảnh, ${m.diaDiem.length} địa điểm, ${duKien} dữ kiện, ${m.lich?.ngay.length ?? 0} ngày, ${m.chuoi.length} chuỗi, ${loiThoai} lời thoại, ${m.challenges.length} thẻ thử thách, ${m.soTay.length} trang sổ, ${m.dossier.length} thẻ hồ sơ`;
}

export function kiemNoiDungMvp(thuMuc: string = THU_MUC_NOI_DUNG_MVP): KetQuaKiemMvp {
  const kq = docThuMucMvp(thuMuc);
  const loiDoc = [...kq.loi];
  const luat = kiemLuatMvp(kq.mvp);
  loiDoc.push(...luat.loi);
  const loi = loiDoc.map(dinhDangLoi);
  let tepCu: string[] = [];
  if (loi.length === 0) {
    try {
      tepCu = tepLechTrenDia(vanBanMvp(chuyenMvp(kq.mvp, luat)), THU_MUC_SINH_MVP);
    } catch (e) {
      loi.push((e as Error).message);
    }
  }
  const tomTat = loi.length === 0 ? `noi-dung-mvp: ${kq.tep.length} tệp, không lỗi — ${dem(kq.mvp)}.` : `noi-dung-mvp: ${kq.tep.length} tệp, ${loi.length} lỗi.`;
  return { loi, tomTat, tepCu };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const { loi, tomTat, tepCu } = kiemNoiDungMvp(process.argv[2] ?? THU_MUC_NOI_DUNG_MVP);
  for (const l of loi) console.error(l);
  console.log(tomTat);
  if (tepCu.length > 0) console.log(`Nhắc: ${tepCu.join(', ')} chưa khớp nội dung — chạy \`npm run noi-dung:sinh:mvp\` rồi commit cả .gen.ts.`);
  process.exitCode = loi.length === 0 ? 0 : 1;
}
