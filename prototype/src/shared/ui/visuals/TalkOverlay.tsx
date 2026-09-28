/**
 * Lớp nhép môi + chớp mắt đặt chồng lên ảnh chân dung (bộ miếng ở `talk-rigs.ts`). SVG cùng hệ tọa
 * độ ảnh gốc, `xMidYMax meet` = đúng cách `.portrait__img` hiển thị (contain, canh đáy giữa) nên
 * miếng luôn trùng mặt dù khung co giãn.
 * - Đang nói (`talking`): miệng đổi qua lại giữa ảnh gốc và miếng "đang nói", mỗi khung giữ 70–150 ms
 *   (thỉnh thoảng lâu hơn); chữ chạy xong → về ảnh gốc.
 * - Mắt chớp ngẫu nhiên mỗi 2,5–6 s (nhắm ~110 ms), thỉnh thoảng chớp đôi.
 * Trang trí thuần (`aria-hidden`); tắt khi bật giảm chuyển động / không có `matchMedia` (test).
 */
import { useEffect, useState } from 'react';
import { mouthHoldMs, type TalkPatch, type TalkRig } from './talk-rigs';

const BLINK_CLOSED_MS = 110;

function motionAllowed(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function Patch({ patch, hidden = false }: { patch: TalkPatch; hidden?: boolean }) {
  return <image href={patch.src} x={patch.x} y={patch.y} width={patch.w} height={patch.h} opacity={hidden ? 0 : 1} />;
}

export function TalkOverlay({ rig, talking }: { rig: TalkRig; talking: boolean }) {
  const [motion] = useState(motionAllowed);
  const [mouthOpen, setMouthOpen] = useState(false);
  const [eyesClosed, setEyesClosed] = useState(false);

  useEffect(() => {
    if (!motion || !talking) return;
    let timer = 0;
    const flap = (open: boolean) => {
      setMouthOpen(open);
      timer = window.setTimeout(() => flap(!open), mouthHoldMs(Math.random()));
    };
    flap(true);
    return () => {
      window.clearTimeout(timer);
      setMouthOpen(false);
    };
  }, [motion, talking]);

  useEffect(() => {
    if (!motion) return;
    let timer = 0;
    const blink = (again: boolean) => {
      setEyesClosed(true);
      timer = window.setTimeout(() => {
        setEyesClosed(false);
        timer = again
          ? window.setTimeout(() => blink(false), 140)
          : window.setTimeout(() => blink(Math.random() < 0.2), 2500 + Math.random() * 3500);
      }, BLINK_CLOSED_MS);
    };
    timer = window.setTimeout(() => blink(false), 1500 + Math.random() * 3000);
    return () => window.clearTimeout(timer);
  }, [motion]);

  if (!motion) return null;
  // Miếng luôn nằm trong SVG (ẩn bằng opacity) → ảnh đã nạp sẵn, đổi khung không nháy trống.
  return (
    <svg className="portrait__talk" viewBox={`0 0 ${rig.width} ${rig.height}`} preserveAspectRatio="xMidYMax meet" aria-hidden="true" focusable="false">
      <Patch patch={rig.eyes} hidden={!eyesClosed} />
      <Patch patch={rig.mouth} hidden={!mouthOpen} />
    </svg>
  );
}
