/**
 * THẺ MỚI TRONG HỒ SƠ — phần thuần + kho nhỏ của GIAO DIỆN (không lưu, không vào `TrangThaiMvp`).
 *   - `maMoi`: so hồ sơ trước/sau → mã các thẻ vừa thêm (theo thứ tự nhận).
 *   - `theMoiTuMa`: mã → dữ liệu vẽ thẻ thu nhỏ (cùng loại / nhãn / ảnh như trên bảng điều tra, `dungBang`).
 *   - `useTheChuaXem`: các thẻ người chơi chưa xem — nhãn "MỚI" ở khung Hồ sơ và trên bảng. Bấm vào thẻ = đã xem thẻ đó;
 *     đóng khung Hồ sơ = đã xem hết (mở khung là đã thấy cả bảng).
 */
import { create } from 'zustand';
import type { KichBanMvp } from '../../content/mvp/types';
import { dungBang, type LoaiTheBang } from '../engine/bang-dieu-tra';
import type { HoSoMvp, TrangThaiMvp } from '../engine/trang-thai';

/** Thẻ thu nhỏ trong hoạt ảnh "thẻ mới". */
export interface TheMoi {
  id: string;
  loai: LoaiTheBang;
  /** Tiêu đề thẻ (chưa điền tên người chơi). */
  nhan: string;
  /** Tên tệp ảnh (không đuôi) — có thì vẽ ảnh nhỏ. */
  anh: string | null;
}

/** Thời gian (ms) của hoạt ảnh: rơi xuống · giữ để đọc · bay về nút Hồ sơ (khớp CSS `.the-moi*` trong mvp.css). */
export const THOI_GIAN_THE_MOI = { vao: 450, giu: 1600, bay: 560 } as const;

const tatCaMa =(h: HoSoMvp): string[] => [...h.manhMoi, ...h.taiLieu, ...h.bangChung];

/**
 * Mã các thẻ có ở `sau` mà chưa có ở `truoc`. `null` khi `truoc` có thẻ mà `sau` không có (nạp ván khác, chơi lại):
 * không phải "nhận thêm", nơi gọi nên đặt lại mốc thay vì báo.
 */
export function maMoi(truoc: HoSoMvp | null, sau: HoSoMvp | null): string[] | null {
  const cu = truoc ? tatCaMa(truoc) : [];
  const moi = sau ? tatCaMa(sau) : [];
  const coMoi = new Set(moi);
  if (cu.some((id) => !coMoi.has(id))) return null;
  const coCu = new Set(cu);
  return moi.filter((id) => !coCu.has(id));
}

/** Dữ liệu vẽ của các mã (bỏ qua mã không dựng được thẻ — vd bằng chứng chưa có thẻ hồ sơ). */
export function theMoiTuMa(kb: KichBanMvp, s: TrangThaiMvp, ids: readonly string[]): TheMoi[] {
  if (ids.length === 0) return [];
  const bang = dungBang(kb, s);
  const out: TheMoi[] = [];
  for (const id of ids) {
    const t = bang.the.find((x) => x.id === id);
    if (t) out.push({ id, loai: t.loai, nhan: t.nhan, anh: t.anh });
  }
  return out;
}

interface KhoTheMoi {
  chuaXem: string[];
  them: (ids: readonly string[]) => void;
  daXem: (id: string) => void;
  daXemHet: () => void;
}

export const useTheChuaXem = create<KhoTheMoi>((set) => ({
  chuaXem: [],
  them: (ids) => set((k) => ({ chuaXem: [...k.chuaXem, ...ids.filter((id) => !k.chuaXem.includes(id))] })),
  daXem: (id) => set((k) => (k.chuaXem.includes(id) ? { chuaXem: k.chuaXem.filter((x) => x !== id) } : k)),
  daXemHet: () => set((k) => (k.chuaXem.length === 0 ? k : { chuaXem: [] })),
}));
