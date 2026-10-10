/**
 * Nhận biết ĐIỆN THOẠI (user 06/10: "màn hình ngang + bàn phím thì còn rất ít đất, hay là ẩn cơ chế typing ở điện thoại?"
 * và chốt "ok"): màn hình chạm (pointer: coarse) và cạnh ngắn dưới 500 px. Máy tính bảng (cạnh ngắn ≥ 768) và máy tính không tính.
 *
 * Trên điện thoại hai mức gõ chữ bị ẩn: nhập vai "Như thật" chạy như "Tự dò" (hỏi bằng câu bấm sẵn), SQL "Tự viết" hạ về
 * "Ghép khối, chữ SQL". Nhập tên và chat với bạn đi cùng (ngắn, tùy chọn) vẫn gõ được, có chế độ gõ (ban-phim-ao.ts) đỡ.
 */
import { useEffect, useState } from 'react';
import type { MucNhapVaiMvp, MucSqlMvp } from '../engine/trang-thai';

/** Cạnh ngắn của màn hình dưới mức này (px) thì là điện thoại. */
export const CANH_NGAN_DIEN_THOAI = 500;

/** Hàm thuần để test: điện thoại = có cảm ứng thô và cạnh ngắn của khung nhìn dưới 500 px. */
export function laDienThoai(rong: number, cao: number, chamTho: boolean): boolean {
  return chamTho && Math.min(rong, cao) < CANH_NGAN_DIEN_THOAI;
}

/** Mức nhập vai hiệu lực trên thiết bị: điện thoại không có "Như thật" (phải gõ). */
export function mucNhapVaiTheoMay(muc: MucNhapVaiMvp, dienThoai: boolean): MucNhapVaiMvp {
  return dienThoai && muc === 'that' ? 'tu-do' : muc;
}
/** Mức SQL hiệu lực trên thiết bị: điện thoại không có "Tự viết". */
export function mucSqlTheoMay(muc: MucSqlMvp, dienThoai: boolean): MucSqlMvp {
  return dienThoai && muc === 'tu-viet' ? 'ghep-sql' : muc;
}

/** Dòng ghi ở màn chọn mức khi đang ở điện thoại. */
export const GHI_DIEN_THOAI = 'Hai mức gõ chữ (Như thật, Tự viết) chỉ có trên máy tính.';

function doHienTai(): boolean {
  if (typeof window === 'undefined') return false;
  const chamTho = typeof window.matchMedia === 'function' ? window.matchMedia('(pointer: coarse)').matches : false;
  return laDienThoai(window.innerWidth, window.innerHeight, chamTho);
}

/** Hook: đang ở điện thoại không; cập nhật khi xoay máy / đổi cỡ. */
export function useDienThoai(): boolean {
  const [co, setCo] = useState<boolean>(doHienTai);
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const tinh = (): void => setCo(doHienTai());
    tinh();
    window.addEventListener('resize', tinh);
    window.addEventListener('orientationchange', tinh);
    return () => {
      window.removeEventListener('resize', tinh);
      window.removeEventListener('orientationchange', tinh);
    };
  }, []);
  return co;
}
