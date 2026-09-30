/**
 * `npm run kiem-noi-dung:mvp` — đọc toàn bộ `prototype/noi-dung-mvp/`, kiểm chéo (luat-mvp.ts), chạy thử bộ
 * chuyển (chuyen-mvp.ts), rồi CHẠY THẬT từng câu SQL có khai số dòng (`soDongKhai`) trên bộ dữ liệu cố định
 * du-lieu.md bằng sql.js (sql-mvp.ts, QĐ-089). CHỈ báo lỗi, không ghi tệp. Mỗi lỗi một dòng `<tệp>:<dòng>: <lỗi>`; mã thoát 1 khi
 * có lỗi. Nhắc (không tính lỗi) khi `src/content/generated/mvp/*.gen.ts` chưa sinh lại.
 * Không import gì từ `src/` (bảng tên lấy từ nhan-vat.md).
 */
import { fileURLToPath } from 'node:url';
import { chuyenMvp, type DuLieuMvp } from './chuyen-mvp.ts';
import { dinhDangLoi, type RawMvp } from './doc-mvp.ts';
import { kiemLuatMvp } from './luat-mvp.ts';
import { tepLechTrenDia } from './sinh.ts';
import { THU_MUC_SINH_MVP, vanBanMvp } from './sinh-mvp.ts';
import { kiemSoDongMvp, type KetQuaChayMvp } from './sql-mvp.ts';
import { docSpriteVat, docTenAnh, docThuMucMvp, traViTri } from './thu-muc-mvp.ts';

export const THU_MUC_NOI_DUNG_MVP = fileURLToPath(new URL('../../noi-dung-mvp/', import.meta.url));

export interface KetQuaKiemMvp {
  loi: string[];
  /** Nhắc, không tính lỗi (vd. dữ kiện chưa có dòng "- Ảnh:"). */
  canhBao: string[];
  tomTat: string;
  tepCu: string[];
  /** Kết quả chạy thật từng câu SQL khai số dòng; `null` khi chưa tới bước chạy (có lỗi đọc/luật). */
  sql: KetQuaChayMvp['ketQua'] | null;
}

function dem(m: RawMvp): string {
  const loiThoai = m.chuoi.flatMap((c) => c.items).filter((it) => it.kind === 'line').length;
  const duKien = m.diaDiem.reduce((s, d) => s + d.duKien.length, 0);
  return `${m.nhanVat.length} nhân vật, ${m.canh.length} cảnh, ${m.diaDiem.length} địa điểm, ${duKien} dữ kiện, ${m.lich?.ngay.length ?? 0} ngày, ${m.chuoi.length} chuỗi, ${loiThoai} lời thoại, ${m.challenges.length} thẻ thử thách, ${m.soTay.length} trang sổ, ${m.dossier.length} thẻ hồ sơ, ${m.duLieu?.bang.length ?? 0} bảng dữ liệu`;
}

export async function kiemNoiDungMvp(thuMuc: string = THU_MUC_NOI_DUNG_MVP): Promise<KetQuaKiemMvp> {
  const kq = docThuMucMvp(thuMuc);
  const loiDoc = [...kq.loi];
  const luat = kiemLuatMvp(kq.mvp, { spriteVat: docSpriteVat(), anh: docTenAnh() });
  loiDoc.push(...luat.loi.map((l) => traViTri(l, kq.banDo)));
  const loi = loiDoc.map(dinhDangLoi);
  let tepCu: string[] = [];
  let duLieu: DuLieuMvp | null = null;
  if (loi.length === 0) {
    try {
      duLieu = chuyenMvp(kq.mvp, luat);
      tepCu = tepLechTrenDia(vanBanMvp(duLieu), THU_MUC_SINH_MVP);
    } catch (e) {
      loi.push((e as Error).message);
    }
  }
  let sql: KetQuaChayMvp['ketQua'] | null = null;
  if (duLieu) {
    const chay = await kiemSoDongMvp(kq.mvp.duLieu, duLieu.soDongKhai);
    loi.push(...chay.loi);
    sql = chay.ketQua;
  }
  const soSql = sql ? `; ${sql.length} câu SQL khai số dòng, chạy thật khớp ${sql.filter((s) => s.soDongThat === s.soDong).length}` : '';
  const tomTat = loi.length === 0 ? `noi-dung-mvp: ${kq.tep.length} tệp, không lỗi — ${dem(kq.mvp)}${soSql}.` : `noi-dung-mvp: ${kq.tep.length} tệp, ${loi.length} lỗi.`;
  const canhBao = luat.canhBao.map((l) => dinhDangLoi(traViTri(l, kq.banDo)));
  if (kq.soLoiTam > 0) canhBao.push(`noi-dung-mvp/loi/: còn ${kq.soLoiTam} dòng lời "(tạm)" chờ phiên truyện viết lời thật`);
  return { loi, canhBao, tomTat, tepCu, sql };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const { loi, canhBao, tomTat, tepCu } = await kiemNoiDungMvp(process.argv[2] ?? THU_MUC_NOI_DUNG_MVP);
  for (const l of loi) console.error(l);
  for (const c of canhBao) console.warn(`Cảnh báo: ${c}`);
  console.log(tomTat);
  if (tepCu.length > 0) console.log(`Nhắc: ${tepCu.join(', ')} chưa khớp nội dung — chạy \`npm run noi-dung:sinh:mvp\` rồi commit cả .gen.ts.`);
  process.exitCode = loi.length === 0 ? 0 : 1;
}
