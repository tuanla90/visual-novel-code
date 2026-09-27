/**
 * Chống bấm đúp / giữ phím dùng chung (QĐ-061 Đ2, QĐ-066) — theo mẫu `ObjectionEffect`:
 *
 * - Khoảng khóa ngắn (~400 ms) mỗi khi NỘI DUNG đổi (`contentKey`) và ngay sau mỗi lần bấm được nhận:
 *   cú bấm thứ hai của một lần bấm đúp rơi vào nội dung vừa hiện (hộp phản hồi thay chỗ lựa chọn,
 *   câu hỏi thay chỗ lời thoại, tài liệu vừa mở) không được tính.
 * - Bỏ cú bấm có `detail > 1` (cú thứ hai/ba của bấm đúp/ba) và phím đang giữ (`repeat`).
 * - `immediate`: nút bấm CHỦ Ý (ví dụ "Tiếp tục ▸", "Hỏi Hà Vy") nhận ngay cú bấm đơn, chỉ bỏ cú bấm
 *   lặp của bấm đúp.
 * - `holdKey`: gắn vào `onKeyDown` của nút — Enter đang giữ không bấm lặp nút (trình duyệt tự sinh
 *   click cho mỗi keydown lặp của Enter).
 */
import { useCallback, useLayoutEffect, useMemo, useRef } from 'react';

/** Khoảng khóa sau khi nội dung đổi / sau một lần bấm được nhận. */
export const PRESS_GUARD_MS = 400;

export interface PressGuard {
  /** Cú bấm chuột/chạm (hoặc click do bàn phím sinh ra) có được tính không. */
  click: (e: { detail: number }, options?: { immediate?: boolean }) => boolean;
  /** Phím tắt (keydown trên cửa sổ) có được tính không. */
  key: (e: { repeat: boolean }) => boolean;
  /** `onKeyDown` cho nút: chặn click lặp do giữ Enter. */
  holdKey: (e: { repeat: boolean; preventDefault: () => void }) => void;
}

export function usePressGuard(contentKey: unknown, ms: number = PRESS_GUARD_MS): PressGuard {
  const armed = useRef(false);
  const timer = useRef<number | undefined>(undefined);

  const disarm = useCallback(() => {
    armed.current = false;
    window.clearTimeout(timer.current);
    timer.current = window.setTimeout(() => {
      armed.current = true;
    }, ms);
  }, [ms]);

  // Layout effect: khóa ngay lúc nội dung mới được gắn vào trang, trước khi cú bấm kế tiếp tới.
  useLayoutEffect(() => {
    disarm();
    return () => window.clearTimeout(timer.current);
  }, [contentKey, disarm]);

  return useMemo<PressGuard>(
    () => ({
      click: (e, options) => {
        if (e.detail > 1) return false;
        if (options?.immediate !== true && !armed.current) return false;
        disarm();
        return true;
      },
      key: (e) => {
        if (e.repeat || !armed.current) return false;
        disarm();
        return true;
      },
      holdKey: (e) => {
        if (e.repeat) e.preventDefault();
      },
    }),
    [disarm],
  );
}
