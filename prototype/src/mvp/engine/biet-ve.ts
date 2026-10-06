/**
 * Gói B18: ô thẻ nhân vật người chơi vừa biết thêm (`[BIẾT <mã> <trường>]`). Hàm thuần trên trạng thái, dùng chung cho máy chính
 * (`may.ts`, nút `biet`) và buổi hỏi nhân chứng (`hoi-dap.ts`, khi khối lời viết sẵn bị buổi hỏi thay nhưng điều lộ ra vẫn phải ghi).
 */
import type { TruongBietMvp } from '../../content/mvp/types';
import type { TrangThaiMvp } from './trang-thai';

/** Cộng các trường vào `s.bietVe[nhanVat]` (không nhân đôi); không có gì mới → trả lại đúng `s`. */
export function apBiet(s: TrangThaiMvp, nhanVat: string, truong: readonly TruongBietMvp[]): TrangThaiMvp {
  const cu = s.bietVe?.[nhanVat] ?? [];
  const them = truong.filter((t) => !cu.includes(t));
  if (them.length === 0) return s;
  return { ...s, bietVe: { ...(s.bietVe ?? {}), [nhanVat]: [...cu, ...them] } };
}
