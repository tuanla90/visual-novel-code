/**
 * Lớp nhép môi + chớp mắt đặt chồng lên ảnh chân dung (bộ miếng ở `talk-rigs.ts`). SVG cùng hệ tọa
 * độ ảnh gốc, `xMidYMin meet` = đúng cách `.portrait__img` hiển thị (contain, canh trên giữa) nên
 * miếng luôn trùng mặt dù khung co giãn.
 * - Đang nói (`talking`): miệng đổi qua lại giữa ảnh gốc và miếng "đang nói", mỗi khung giữ 70–150 ms
 *   (thỉnh thoảng lâu hơn); chữ chạy xong → về ảnh gốc.
 * - Mắt chớp ngẫu nhiên mỗi 2,5–6 s (nhắm ~110 ms), thỉnh thoảng chớp đôi.
 * Trang trí thuần (`aria-hidden`); tắt khi bật giảm chuyển động / không có `matchMedia` (test).
 * Miếng được cắt theo `cutoutSrc` (chính ảnh chân dung đã tách nền, làm mặt nạ alpha): miếng sinh từ
 * ảnh sửa nên mép có thể lấn ra nền xám cạnh cằm/má; không cắt thì hiện thành mảng xám ngoài đầu.
 */
import { useEffect, useId, useState } from 'react';
import { mouthHoldMs, type TalkPatch, type TalkRig } from './talk-rigs';

const BLINK_CLOSED_MS = 110;

function motionAllowed(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

function Patch({ patch, hidden = false }: { patch: TalkPatch; hidden?: boolean }) {
  return <image href={patch.src} x={patch.x} y={patch.y} width={patch.w} height={patch.h} opacity={hidden ? 0 : 1} />;
}

export function TalkOverlay({ rig, talking, cutoutSrc }: { rig: TalkRig; talking: boolean; cutoutSrc?: string }) {
  const maskId = `talk-mask-${useId().replace(/:/g, '')}`;
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
    <svg className="portrait__talk" viewBox={`0 0 ${rig.width} ${rig.height}`} preserveAspectRatio="xMidYMin meet" aria-hidden="true" focusable="false">
      {cutoutSrc ? (
        <defs>
          <mask id={maskId} maskUnits="userSpaceOnUse" x={0} y={0} width={rig.width} height={rig.height} style={{ maskType: 'alpha' }}>
            <image href={cutoutSrc} x={0} y={0} width={rig.width} height={rig.height} preserveAspectRatio="none" />
          </mask>
        </defs>
      ) : null}
      <g mask={cutoutSrc ? `url(#${maskId})` : undefined}>
        <Patch patch={rig.eyes} hidden={!eyesClosed} />
        <Patch patch={rig.mouth} hidden={!mouthOpen} />
      </g>
    </svg>
  );
}
