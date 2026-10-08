/**
 * CHẤM VỤ (gói B19, luật chấm user chốt 08/10, docs/mua-1/brief/b19-vu-1-ban-6.md mục 4) — phần thuần, không React.
 *
 *   - Trình sai = mỗi lần chọn sai / bấm Trình sai ở lệnh `· tính vạch` (trắc nghiệm, đối chất, sửa truy vấn ở buổi chấm). Chạy thử,
 *     màn tra lúc điều tra, quan sát, ghép thẻ, kéo sai ở dòng thời gian KHÔNG tính.
 *   - Đủ căn cứ = lúc chấm, hồ sơ có mọi thẻ ở `cần:` và mọi dòng thời gian ở `cần:` đã dựng xong (câu then chốt nào cũng phải
 *     trả lời đúng mới đi tiếp, nên không cần đếm riêng).
 *   - A: đủ căn cứ, 0 vạch · B: đủ căn cứ, 1–2 vạch · C: thiếu căn cứ hoặc từ 3 vạch.
 * Bộ MVP không có `[CHẤM VỤ]`, giữ hạng S/A/B/C theo độ hoàn thành ở `tong-ket.ts`.
 */
import type { KetQuaChamVuMvp, KichBanMvp, NutMvp } from '../../content/mvp/types';
import type { TrangThaiMvp } from './trang-thai';

/** Từ số vạch này trở lên là rank C. */
export const NGUONG_VACH_C = 3;

export type RankMvp = KetQuaChamVuMvp['rank'];

/** Rank theo số vạch và số thứ còn thiếu. */
export function rankTu(vach: number, soThieu: number): RankMvp {
  if (soThieu > 0 || vach >= NGUONG_VACH_C) return 'c';
  return vach === 0 ? 'a' : 'b';
}

/** Có trong ván: thẻ hồ sơ / cờ / thử thách xong (như `coTrongHoSo` của máy), hay dòng thời gian đã dựng xong. */
function daCo(kb: KichBanMvp, s: TrangThaiMvp, id: string): boolean {
  if (kb.dongThoiGian?.[id]) return !!s.dongThoiGian?.[id]?.xong;
  return s.hoSo.manhMoi.includes(id) || s.hoSo.taiLieu.includes(id) || s.hoSo.bangChung.includes(id) || s.co.includes(id) || s.thuThachXong.includes(id);
}

/** Chấm một vụ tại nút `[CHẤM VỤ]`: vạch hiện có + thứ còn thiếu trong `cần:`. */
export function chamVu(kb: KichBanMvp, s: TrangThaiMvp, nut: Extract<NutMvp, { type: 'cham-vu' }>): KetQuaChamVuMvp {
  const vach = s.vach ?? 0;
  const thieu = nut.can.filter((id) => !daCo(kb, s, id));
  return { rank: rankTu(vach, thieu.length), vach, thieu };
}

const boNho = new WeakMap<KichBanMvp, Set<string>>();

/** Mã các vụ có `[CHẤM VỤ]` trong bộ (bộ MVP, bộ mùa 1 cũ: rỗng). */
export function vuCoChamVu(kb: KichBanMvp): ReadonlySet<string> {
  const daCoBo = boNho.get(kb);
  if (daCoBo) return daCoBo;
  const ds = new Set<string>();
  for (const c of kb.chuoi) for (const n of c.nodes) if (n.type === 'cham-vu') ds.add(n.vu);
  boNho.set(kb, ds);
  return ds;
}

/** Bộ có ít nhất một `[CHẤM VỤ]`: rẽ kết theo rank, màn kết kiểu sổ CLB. */
export function boCoChamVu(kb: KichBanMvp): boolean {
  return vuCoChamVu(kb).size > 0;
}

/** Rank hiện tại của vụ trong ván (cờ `<vụ>-rank-x` đặt lúc chấm); chưa chấm → tính tạm theo số vạch hiện có. */
export function rankHienTai(s: TrangThaiMvp, vu: string): RankMvp {
  for (const r of ['a', 'b', 'c'] as const) if (s.co.includes(`${vu}-rank-${r}`)) return r;
  return rankTu(s.vach ?? 0, 0);
}

/** Số thứ tự của một vụ (vụ gốc là 1, vụ sau thứ i là i + 2) và tên. */
export function soVaTenVu(kb: KichBanMvp, vu: string): { so: number; ten: string } {
  const i = (kb.lich.vuSau ?? []).findIndex((v) => v.id === vu);
  if (i >= 0) return { so: i + 2, ten: kb.lich.vuSau?.[i]?.ten ?? vu };
  return { so: 1, ten: kb.lich.vu.ten };
}

/** Chữ rank in trên con dấu. */
export const CHU_RANK: Readonly<Record<RankMvp, string>> = { a: 'A', b: 'B', c: 'C' };
