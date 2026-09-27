/**
 * Đặt GIÁ TRỊ 4 biến vùng màn chiếu của gói 6 (`--projector-top/right/bottom/left`, tên giữ nguyên)
 * trên `.stage` ở phòng giải trình, theo khung màn chiếu trong ảnh nền (`HEARING_ROOM_SCREEN`) và
 * kích thước sân khấu thật — ảnh phủ `cover` nên vị trí màn chiếu đổi theo tỉ lệ màn hình.
 * Cảnh khác: gỡ biến, dùng mặc định của debrief.css.
 */
import { useLayoutEffect, type RefObject } from 'react';
import type { SceneId } from '../../ids';
import { resolveBackground } from './art-slots';
import { HEARING_ROOM_IMAGE_SCREEN, HEARING_ROOM_SCREEN, projectorInsets } from './scene-geometry';

const VARS = ['--projector-top', '--projector-right', '--projector-bottom', '--projector-left'] as const;

export function useProjectorInsets(ref: RefObject<HTMLElement | null>, scene: SceneId): void {
  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const clear = (): void => {
      for (const v of VARS) el.style.removeProperty(v);
    };
    if (scene !== 'debrief-room') {
      clear();
      return;
    }
    const apply = (): void => {
      const { width, height } = el.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      // Có ảnh nền thật → khung đo trên ảnh; không → khung của hình vẽ tạm.
      const frame = resolveBackground('debrief-room').url ? HEARING_ROOM_IMAGE_SCREEN : HEARING_ROOM_SCREEN;
      const i = projectorInsets(width, height, frame);
      el.style.setProperty('--projector-top', `${i.top.toFixed(1)}px`);
      el.style.setProperty('--projector-right', `${i.right.toFixed(1)}px`);
      el.style.setProperty('--projector-bottom', `${i.bottom.toFixed(1)}px`);
      el.style.setProperty('--projector-left', `${i.left.toFixed(1)}px`);
    };
    apply();
    if (typeof ResizeObserver === 'undefined') return clear;
    const ro = new ResizeObserver(apply);
    ro.observe(el);
    return () => {
      ro.disconnect();
      clear();
    };
  }, [ref, scene]);
}
