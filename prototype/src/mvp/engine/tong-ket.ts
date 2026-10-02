/**
 * TỔNG KẾT MỘT VỤ ở màn kết (user chốt 02/10/2026): chị Minh Anh là người chốt hồ sơ, coi như một dạng chấm độ hoàn thành.
 * Không phải điểm số: bốn dòng đếm được từ trạng thái ván, và một câu chốt theo mức.
 *   - phiếu tra cứu đã ghim / số thẻ thử thách của vụ (có nhánh tùy chọn thì thiếu phiếu của nhánh chưa đi);
 *   - giả thuyết đã bác ĐỦ CĂN CỨ / số lần đối chất đã gặp;
 *   - câu hỏi trả lời đúng ngay lần đầu / số câu đã gặp;
 *   - mẩu giấy trong sổ CLB của vụ (nếu vụ có).
 * Chuỗi của một vụ = mọi chuỗi đi tới được từ chuỗi mở vụ (dò mọi chuỗi ký tự trùng mã chuỗi); vụ gốc = phần còn lại.
 */
import type { KichBanMvp } from '../../content/mvp/types';
import type { TrangThaiMvp } from './trang-thai';

export interface TongKetVu {
  phieu: { co: number; tong: number };
  doiChat: { du: number; tong: number };
  cauHoi: { ngay: number; tong: number };
  /** `null` = vụ không có mẩu giấy. */
  mauGiay: boolean | null;
  muc: 'kin' | 'du' | 'thieu';
}

function chuoiTu(kb: KichBanMvp, batDau: string): Set<string> {
  const ma = new Set(kb.chuoi.map((c) => c.id));
  const thay = new Set<string>();
  const hang = [batDau];
  const do_ = (o: unknown): void => {
    if (typeof o === 'string') {
      if (ma.has(o) && !thay.has(o)) hang.push(o);
    } else if (Array.isArray(o)) o.forEach(do_);
    else if (o && typeof o === 'object') Object.values(o).forEach(do_);
  };
  while (hang.length > 0) {
    const id = hang.pop() as string;
    if (thay.has(id)) continue;
    thay.add(id);
    const c = kb.chuoi.find((x) => x.id === id);
    if (c) do_(c.nodes);
  }
  return thay;
}

/** `batDau`: chuỗi mở vụ (`VuSauMvp.chuoi`); `null` = vụ gốc (mọi chuỗi không thuộc vụ sau / nhiệm vụ phụ nào). */
export function tongKetVu(kb: KichBanMvp, s: TrangThaiMvp, batDau: string | null): TongKetVu {
  let tap: Set<string>;
  if (batDau) tap = chuoiTu(kb, batDau);
  else {
    const khac = new Set<string>();
    for (const v of [...(kb.lich.vuSau ?? []), ...(kb.lich.nhiemVuPhu ?? [])]) for (const id of chuoiTu(kb, v.chuoi)) khac.add(id);
    tap = new Set(kb.chuoi.map((c) => c.id).filter((id) => !khac.has(id)));
  }
  const nut = kb.chuoi.filter((c) => tap.has(c.id)).flatMap((c) => c.nodes);
  const thuThach = [...new Set(nut.flatMap((n) => (n.type === 'challenge' || n.type === 'fix-query' ? [n.challengeId] : [])))];
  const phieu = { co: thuThach.filter((id) => s.thuThachXong.includes(id)).length, tong: thuThach.length };
  const dc = nut.flatMap((n) => (n.type === 'doi-chat' && n.bangChung.some((b) => b.muc === 'du') && (s.lanThu[n.id] ?? 0) > 0 ? [n.id] : []));
  const doiChat = { du: dc.filter((id) => s.co.includes(`${id}-du`)).length, tong: dc.length };
  const hoi = nut.flatMap((n) => (n.type === 'question' && (s.lanThu[n.id] ?? 0) > 0 ? [n.id] : []));
  const cauHoi = { ngay: hoi.filter((id) => s.lanThu[id] === 1).length, tong: hoi.length };
  // Mẩu giấy "của vụ" là mẩu được MỞ trong vụ (hậu quả), không tính mẩu chỉ được nhắc tới làm bằng chứng / điều kiện.
  const moTrongVu = [...new Set(nut.flatMap((n) => (n.type === 'consequence' ? (JSON.stringify(n.hauQua).match(/clue-loi-nhan-linh-\d+/g) ?? []) : [])))];
  const mauGiay = moTrongVu.length === 0 ? null : moTrongVu.every((id) => s.hoSo.manhMoi.includes(id));
  const diem = [phieu.tong === 0 ? 1 : phieu.co / phieu.tong, doiChat.tong === 0 ? 1 : doiChat.du / doiChat.tong, cauHoi.tong === 0 ? 1 : cauHoi.ngay / cauHoi.tong, mauGiay === false ? 0 : 1];
  const tb = diem.reduce((a, b) => a + b, 0) / diem.length;
  return { phieu, doiChat, cauHoi, mauGiay, muc: tb >= 0.999 ? 'kin' : tb >= 0.7 ? 'du' : 'thieu' };
}

/** Câu chị Minh Anh chốt theo mức. */
export const LOI_CHOT: Record<TongKetVu['muc'], string> = {
  kin: 'Hồ sơ kín. Phiếu nào cũng có căn cứ, câu nào cũng trả lời được. Chị ký.',
  du: 'Đủ để nộp. Còn vài chỗ chị phải hỏi lại, nhưng kết luận đứng được.',
  thieu: 'Nộp được, nhưng còn hở. Lần sau kiểm thêm một lượt rồi hãy kết luận.',
};
