/**
 * Hiệu ứng "Có số liệu đây!" (QĐ-025, GDD §15.4): phủ TOÀN MÀN HÌNH kiểu truyện tranh — đường tốc
 * độ, mảng nổ, chữ lớn nghiêng, rung — khoảng 1,2 giây rồi tự đi tiếp; bấm hoặc nhấn Enter/Space/Esc
 * để bỏ qua. Props giữ nguyên.
 *
 * Chống bỏ lỡ (QĐ-061 Đ2): hiệu ứng hiện ngay sau cú chọn dòng lỗi ở màn chọn dòng, nên cú bấm thứ
 * hai của một lần bấm đúp, phím đang giữ, hay cú bấm/phím trong ~400 ms đầu KHÔNG được tính là
 * "bỏ qua" — người chơi luôn thấy được khoảnh khắc này.
 *
 * Tắt rung/thu phóng khi `prefers-reduced-motion` (app.css). Trình đọc màn hình đọc câu hô qua
 * vùng `role="alert"`. Vẽ qua portal vào `document.body` để phủ cả thanh trên và ngăn hồ sơ.
 */
import { useCallback, useEffect, useRef, type MouseEvent as ReactMouseEvent } from 'react';
import { createPortal } from 'react-dom';
import { effectName } from '../../shared/display-names';
import type { EffectId } from '../../shared/ids';
import { EFFECT_DURATION_MS, EFFECT_SKIP_GUARD_MS } from '../../shared/ui/visuals/effect-timing';

export interface ObjectionEffectProps {
  effectId: EffectId;
  onDone: () => void;
}

const SKIP_KEYS = new Set(['Enter', ' ', 'Escape']);

/** Đường tốc độ tỏa từ tâm (tam giác mảnh) — tính sẵn một lần. */
const SPEED_LINES = Array.from({ length: 36 }, (_, i) => {
  const a = (i / 36) * Math.PI * 2 + (i % 3) * 0.03;
  const spread = 0.022 + (i % 4) * 0.006;
  const r0 = 150 + (i % 5) * 26;
  const p = (ang: number, r: number): string => `${(800 + Math.cos(ang) * r).toFixed(1)},${(450 + Math.sin(ang) * r).toFixed(1)}`;
  return `${p(a - spread, 1400)} ${p(a + spread, 1400)} ${p(a, r0)}`;
});

/** Mảng nổ răng cưa sau chữ. */
const BURST = Array.from({ length: 28 }, (_, i) => {
  const a = (i / 28) * Math.PI * 2;
  const r = i % 2 === 0 ? 330 : 250 + (i % 3) * 14;
  return `${(800 + Math.cos(a) * r * 1.9).toFixed(1)},${(450 + Math.sin(a) * r * 0.78).toFixed(1)}`;
}).join(' ');

export function ObjectionEffect({ effectId, onDone }: ObjectionEffectProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const armed = useRef(false);
  const done = useRef(false);
  const onDoneRef = useRef(onDone);
  useEffect(() => {
    onDoneRef.current = onDone;
  }, [onDone]);

  const finish = useCallback(() => {
    if (done.current) return;
    done.current = true;
    onDoneRef.current();
  }, []);

  useEffect(() => {
    done.current = false;
    armed.current = false;
    rootRef.current?.focus({ preventScroll: true });
    const arm = window.setTimeout(() => {
      armed.current = true;
    }, EFFECT_SKIP_GUARD_MS);
    const auto = window.setTimeout(finish, EFFECT_DURATION_MS);
    const onKey = (e: KeyboardEvent): void => {
      if (!SKIP_KEYS.has(e.key)) return;
      e.preventDefault();
      if (e.repeat || !armed.current) return;
      finish();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.clearTimeout(arm);
      window.clearTimeout(auto);
      window.removeEventListener('keydown', onKey);
    };
  }, [effectId, finish]);

  const onClick = (e: ReactMouseEvent): void => {
    // Cú bấm thứ hai của bấm đúp (detail > 1) và mọi cú bấm trong ~400 ms đầu không bỏ qua.
    if (e.detail > 1 || !armed.current) return;
    finish();
  };

  const shout = effectName(effectId);
  return createPortal(
    <div ref={rootRef} className="objection" onClick={onClick} tabIndex={-1} aria-modal="true" role="dialog" aria-label={shout}>
      <svg className="objection__art" viewBox="0 0 1600 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true" focusable="false">
        <rect width={1600} height={900} fill="#0f172a" />
        <g className="objection__lines" fill="#f8fafc" opacity={0.55}>
          {SPEED_LINES.map((pts) => (
            <polygon key={pts} points={pts} />
          ))}
        </g>
        <polygon className="objection__burst" points={BURST} fill="#facc15" stroke="#0f172a" strokeWidth={10} strokeLinejoin="round" />
      </svg>
      <p className="objection__shout" role="alert">
        <span>{shout}</span>
      </p>
      <button
        type="button"
        className="objection__skip"
        aria-label="Bỏ qua hiệu ứng"
        title="Bỏ qua hiệu ứng"
        onClick={(e) => {
          e.stopPropagation();
          onClick(e);
        }}
      >
        Bỏ qua ▸
      </button>
    </div>,
    document.body,
  );
}
