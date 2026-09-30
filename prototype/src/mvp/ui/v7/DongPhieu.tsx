/**
 * ĐỐNG PHIẾU (mockup v7): mỗi dòng của bảng là một tờ phiếu nhỏ; điều kiện nào loại thì phiếu rơi xuống. Vẽ bằng MỘT canvas
 * và một vòng requestAnimationFrame (nghìn thẻ DOM có transition riêng thì giật). Thành phần cha điều khiển qua ref:
 * tô màu, thả rơi, đặt lại. Không có canvas (jsdom) thì bỏ qua phần vẽ.
 */
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

export interface DongPhieuRef {
  /** Mọi phiếu về lại chỗ, màu xám. */
  datLai: () => void;
  /** Tô các phiếu (chỉ số dòng) bằng màu thứ `mau` (0 xám, 1–3 theo điều kiện, 4 trắng sáng). */
  toMau: (dong: readonly number[], mau: number) => void;
  /** Thả rơi các phiếu, mỗi tờ trễ ngẫu nhiên tới `treToiDa` ms. */
  tha: (dong: readonly number[], treToiDa?: number) => void;
}

export const MAU_PHIEU = ['#9fb3c2', '#ff8a65', '#64b5f6', '#c4a5f5', '#ffffff'] as const;

const ROI_MS = 700;
const de = (t: number): number => t * t * (1.6 - 0.6 * t);

export const DongPhieu = forwardRef<DongPhieuRef, { tong: number }>(function DongPhieu({ tong }, ref) {
  const cv = useRef<HTMLCanvasElement>(null);
  const tt = useRef({ mau: new Uint8Array(0), roi: new Float64Array(0), raf: 0 });

  useEffect(() => {
    tt.current.mau = new Uint8Array(tong);
    tt.current.roi = new Float64Array(tong).fill(Infinity);
    kich();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tong]);

  const ve = (): void => {
    const c = cv.current;
    const s = tt.current;
    s.raf = 0;
    const cx = c?.getContext?.('2d');
    if (!c || !cx) return;
    const khung = c.parentElement;
    if (!khung) return;
    const w = khung.clientWidth;
    const h = khung.clientHeight;
    if (w === 0 || h === 0) return;
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    if (c.width !== Math.round(w * dpr) || c.height !== Math.round(h * dpr)) {
      c.width = Math.round(w * dpr);
      c.height = Math.round(h * dpr);
    }
    cx.setTransform(dpr, 0, 0, dpr, 0, 0);
    cx.clearRect(0, 0, w, h);
    const n = s.mau.length;
    if (n === 0) return;
    // Lưới chiếm ~62% bề ngang (con số lớn nằm bên phải); phiếu giữ tỉ lệ 11:8, to tối đa 46px để ít dòng vẫn ra dáng phiếu.
    const vungW = w * 0.62 - 16;
    const vungH = h - 28;
    let cot = Math.max(1, Math.ceil(Math.sqrt((n * vungW) / (vungH * 1.35))));
    let pw = Math.min(vungW / cot, 46);
    while (Math.ceil(n / cot) * pw * 0.78 > vungH && cot < n) {
      cot++;
      pw = Math.min(vungW / cot, 46);
    }
    const ph = pw * 0.78;
    const cw = pw - Math.max(2, pw * 0.14);
    const ch = ph - Math.max(2, pw * 0.14);
    const hang = Math.ceil(n / cot);
    const ox = 14;
    const oy = Math.max(12, (h - hang * ph) / 2);
    const bo = Math.min(4, cw * 0.18);
    const now = performance.now();
    let dangDong = false;
    for (let m = 0; m < MAU_PHIEU.length; m++) {
      cx.fillStyle = MAU_PHIEU[m] ?? '#fff';
      cx.beginPath();
      for (let k = 0; k < n; k++) {
        if (s.mau[k] !== m || (s.roi[k] ?? Infinity) <= now) continue;
        const x = ox + (k % cot) * pw;
        const y = oy + Math.floor(k / cot) * ph;
        if (cx.roundRect) cx.roundRect(x, y, cw, ch, bo);
        else cx.rect(x, y, cw, ch);
      }
      if (m === 4) {
        cx.shadowColor = '#fff';
        cx.shadowBlur = 10;
      }
      cx.fill();
      cx.shadowBlur = 0;
    }
    for (let k = 0; k < n; k++) {
      const f = s.roi[k] ?? Infinity;
      if (f === Infinity) continue;
      if (f > now) {
        dangDong = true;
        continue;
      }
      const t = Math.min(1, (now - f) / ROI_MS);
      if (t >= 1) continue;
      dangDong = true;
      const e = de(t);
      cx.save();
      cx.globalAlpha = 1 - e;
      cx.translate(ox + (k % cot) * pw + cw / 2, oy + Math.floor(k / cot) * ph + ch / 2 + h * 0.7 * e);
      cx.rotate(e * 2.8);
      cx.fillStyle = MAU_PHIEU[s.mau[k] ?? 0] ?? '#fff';
      cx.fillRect(-cw / 2, -ch / 2, cw, ch);
      cx.restore();
    }
    if (dangDong) s.raf = requestAnimationFrame(ve);
  };
  const kich = (): void => {
    if (!tt.current.raf && typeof requestAnimationFrame === 'function') tt.current.raf = requestAnimationFrame(ve);
  };

  useImperativeHandle(ref, () => ({
    datLai: () => {
      tt.current.mau.fill(0);
      tt.current.roi.fill(Infinity);
      kich();
    },
    toMau: (dong, mau) => {
      for (const k of dong) if (k < tt.current.mau.length) tt.current.mau[k] = mau;
      kich();
    },
    tha: (dong, treToiDa = 350) => {
      const now = performance.now();
      for (const k of dong) if (k < tt.current.roi.length && tt.current.roi[k] === Infinity) tt.current.roi[k] = now + Math.random() * treToiDa;
      kich();
    },
  }));

  useEffect(() => {
    const khung = cv.current?.parentElement;
    if (!khung || typeof ResizeObserver === 'undefined') return;
    const ro = new ResizeObserver(() => kich());
    ro.observe(khung);
    return () => {
      ro.disconnect();
      if (tt.current.raf) cancelAnimationFrame(tt.current.raf);
      tt.current.raf = 0;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return <canvas ref={cv} className="v7-phieu" aria-hidden="true" />;
});
