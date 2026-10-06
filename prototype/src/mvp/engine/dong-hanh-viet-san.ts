/**
 * HỎI BẠN ĐI CÙNG "VIỆC CHÍNH", "GỢI Ý" BẰNG LỜI VIẾT SẴN (gói B12, docs/mua-1/brief/b12-vu-1.md: "Muốn biết việc chính và gợi ý
 * thì chat hỏi người đồng hành"). Trước khi gọi máy chủ trò chuyện, khung chat bạn đi cùng (`DongHanhMvp`) cho câu người chơi
 * gõ qua máy so chữ (`xep-cau-hoi.ts`, chạy trong máy, không gọi mạng) để xếp vào hai ý định:
 *   - `viec-chinh` ("việc chính là gì", "làm gì tiếp"): nhiệm vụ hiện tại kèm các dòng "Cần làm rõ" còn mở (`canLamRo`);
 *   - `goi-y` ("gợi ý đi", "bí rồi"): lời nhắc việc hiện tại (`> NHẮC VIỆC` của chuỗi), không lộ đáp án màn tra.
 * Không trúng ý định nào (kể cả câu mẫu "khac") thì trả `null`: khung chat gọi máy chủ như cũ.
 * Câu mẫu và khuôn lời theo giọng từng bạn ở `noi-dung-mua-1/hoi-dap/dong-hanh.json` (`kb.hoiDap.dongHanh`); bộ MVP không có.
 */
import { Y_DINH_DONG_HANH, type DongHanhHoiDapMvp, type KichBanMvp, type LoiDongHanhMvp, type YDinhDongHanhMvp } from '../../content/mvp/types';
import { canLamRo } from './hoi-dap';
import { dienNhanHetNgay, dienTen, hetNgayDangCho } from './may';
import type { TrangThaiMvp } from './trang-thai';
import { dungMaySoChu, xepCau, type CauMau, type MaySoChu } from './xep-cau-hoi';

/** Lớp của câu mẫu "khac": chuyện phiếm, để máy không ép vào hai ý định. */
const KHAC = 'khac';

const BO_NHO = new WeakMap<DongHanhHoiDapMvp, MaySoChu>();

function mayCua(bo: DongHanhHoiDapMvp): MaySoChu {
  const co = BO_NHO.get(bo);
  if (co) return co;
  const mau: CauMau[] = [];
  for (const y of Y_DINH_DONG_HANH) for (const c of bo.cauMau[y] ?? []) mau.push({ lop: y, cau: c });
  for (const c of bo.cauMau.khac ?? []) mau.push({ lop: KHAC, cau: c });
  const may = dungMaySoChu(mau);
  BO_NHO.set(bo, may);
  return may;
}

/** Ý định của câu người chơi gõ cho bạn đi cùng; `null` = không phải hai ý định viết sẵn (gọi máy chủ). */
export function yDinhDongHanh(bo: DongHanhHoiDapMvp, cau: string): YDinhDongHanhMvp | null {
  const kq = xepCau(mayCua(bo), cau, []);
  return (Y_DINH_DONG_HANH as readonly string[]).includes(kq.lop) ? (kq.lop as YDinhDongHanhMvp) : null;
}

const dien = (khuon: string, cho: Record<string, string>): string => khuon.replace(/\{(viec|nhac|dong)\}/g, (_, k: string) => cho[k] ?? '');

/** Lời viết sẵn của bạn `ban` cho một ý định, điền nhiệm vụ / lời nhắc việc / các dòng còn mở của ván đang chơi. */
export function loiVietSan(kb: KichBanMvp, s: TrangThaiMvp, loi: LoiDongHanhMvp, yDinh: YDinhDongHanhMvp): string {
  // Gói B15: việc chính của ngày đã xong, đang chờ người chơi bấm hết ngày → hỏi việc chính hay gợi ý đều nghe câu này.
  const hn = hetNgayDangCho(kb, s);
  if (hn && loi.hetNgay) return dienNhanHetNgay(loi.hetNgay, hn.nhan);
  if (yDinh === 'goi-y') return s.nhacViec ? dien(loi.goiY, { nhac: dienTen(kb, s, s.nhacViec.text) }) : loi.khongGoiY;
  const dong = canLamRo(kb, s).flatMap((x) => x.dong.map((d) => d.cau));
  const dau = s.nhiemVu ? dien(loi.viecChinh, { viec: dienTen(kb, s, s.nhiemVu) }) : loi.khongViec;
  return dong.length > 0 ? `${dau} ${dien(loi.conMo, { dong: dong.join(' ') })}` : dau;
}

/**
 * Trả lời ngay bằng lời viết sẵn khi câu trúng một trong hai ý định: bạn được hỏi (`dich`) trả lời, hỏi cả nhóm thì bạn đầu
 * tiên đang có mặt. Không có bộ lời (bộ MVP), không có bạn nào, hay câu không trúng → `null`.
 */
export function traLoiVietSan(kb: KichBanMvp, s: TrangThaiMvp, coMat: readonly string[], dich: string | null, cau: string): { ban: string; loi: string } | null {
  const bo = kb.hoiDap?.dongHanh;
  if (!bo) return null;
  const y = yDinhDongHanh(bo, cau);
  if (!y) return null;
  const ban = [dich, ...coMat].find((b): b is string => !!b && !!bo.loi[b]);
  const loi = ban ? bo.loi[ban] : undefined;
  return ban && loi ? { ban, loi: loiVietSan(kb, s, loi, y) } : null;
}

/** Câu viết sẵn khi máy chủ trò chuyện không có (bộ mùa 1); `null` = bộ khác, giữ báo lỗi như cũ. */
export function loiKhongMay(kb: KichBanMvp, coMat: readonly string[], dich: string | null): { ban: string; loi: string } | null {
  const bo = kb.hoiDap?.dongHanh;
  if (!bo) return null;
  const ban = [dich, ...coMat].find((b): b is string => !!b && !!bo.loi[b]);
  return ban ? { ban, loi: bo.loi[ban]!.khongMay } : null;
}
