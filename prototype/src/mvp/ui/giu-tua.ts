/**
 * Nhấn giữ khung thoại để tua (user 07/10/2026): điện thoại không có phím Ctrl. Giữ ngón tay (hay chuột) trên khung thoại
 * `GIU_TUA_MS` thì bật cờ `giuTua` của vn-store — cùng cờ với giữ Ctrl, nên tua cả lời chưa đọc; nhấc tay thì thôi.
 * Nghe ở `window` chứ không ở `DialogBox`: hộp thoại có thể bị thay (gặp câu hỏi, cảnh cắt) trong lúc còn giữ.
 * Cú bấm đi kèm lúc nhấc tay bị nuốt, để không qua thêm một câu hay lỡ chọn vào câu hỏi vừa hiện ra dưới ngón tay.
 */
import { useEffect } from 'react';
import { useVnStore } from '../../shared/vn/vn-store';

export const GIU_TUA_MS = 400;
/** Vùng nhấn giữ: khung thoại (cả nút "Tiếp tục" trong khung), không tính thanh nút nhanh. */
const VUNG_GIU = '.dialog-container .dialog';
/** Cú click sau khi nhấc tay đến trong khoảng này (iOS có thể trễ một nhịp sau pointerup). */
const NUOT_CLICK_MS = 400;

export function useGiuDeTua(): void {
  useEffect(() => {
    const dat = useVnStore.getState().setGiuTua;
    let hen: ReturnType<typeof setTimeout> | undefined;
    let dangTua = false;
    let boNuot: (() => void) | undefined;

    const huyHen = (): void => {
      if (hen !== undefined) clearTimeout(hen);
      hen = undefined;
    };
    const xuong = (e: PointerEvent): void => {
      if (e.button !== 0 || !e.isPrimary) return;
      const t = e.target instanceof Element ? e.target : null;
      if (!t?.closest(VUNG_GIU)) return;
      huyHen();
      hen = setTimeout(() => {
        hen = undefined;
        dangTua = true;
        dat(true);
      }, GIU_TUA_MS);
    };
    const nuotClick = (e: MouseEvent): void => {
      e.stopPropagation();
      e.preventDefault();
      boNuot?.();
    };
    const len = (): void => {
      huyHen();
      if (!dangTua) return;
      dangTua = false;
      dat(false);
      boNuot?.();
      window.addEventListener('click', nuotClick, true);
      const tg = setTimeout(() => boNuot?.(), NUOT_CLICK_MS);
      boNuot = () => {
        clearTimeout(tg);
        window.removeEventListener('click', nuotClick, true);
        boNuot = undefined;
      };
    };
    // Nhấn giữ lâu trên điện thoại Android / chuột phải: không mở trình đơn ngữ cảnh khi đang giữ khung thoại.
    const chanMenu = (e: Event): void => {
      if (hen !== undefined || dangTua) e.preventDefault();
    };
    const thoi = (): void => {
      huyHen();
      if (dangTua) {
        dangTua = false;
        dat(false);
      }
    };

    window.addEventListener('pointerdown', xuong);
    window.addEventListener('pointerup', len);
    window.addEventListener('pointercancel', thoi);
    window.addEventListener('contextmenu', chanMenu);
    window.addEventListener('blur', thoi);
    return () => {
      window.removeEventListener('pointerdown', xuong);
      window.removeEventListener('pointerup', len);
      window.removeEventListener('pointercancel', thoi);
      window.removeEventListener('contextmenu', chanMenu);
      window.removeEventListener('blur', thoi);
      boNuot?.();
      thoi();
    };
  }, []);
}
