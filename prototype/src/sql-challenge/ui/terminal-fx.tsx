/**
 * Hiệu ứng "máy tính CLB" của màn thử thách — chỉ để trang trí, không đổi cơ chế chơi:
 * - `BootSequence`: vài dòng khởi động khi mở một thử thách lần đầu trong phiên chơi; bấm hay nhấn
 *   phím nào cũng bỏ qua; không chặn thao tác của trình dựng.
 * - `SessionClock`: đồng hồ phiên truy cập ĐẾM LÊN (không đếm ngược, không phạt — QĐ-018).
 * - `RowCounter`: số dòng kết quả quay từ 0 lên.
 * Mọi thứ đều `aria-hidden` (lời đọc cho trình đọc màn hình nằm ở chỗ khác) và tắt khi người chơi
 * bật giảm chuyển động hoặc môi trường không có `matchMedia` (test).
 */
import { useEffect, useState } from 'react';
import type { ChallengeId } from '../../shared/ids';

/** Có được chạy chuyển động không (thiếu `matchMedia` → không, để test và trình duyệt cũ hiện thẳng). */
function motionAllowed(): boolean {
  if (typeof window === 'undefined' || typeof window.matchMedia !== 'function') return false;
  return !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

const BOOT_LINES = [
  'Khởi động máy tính CLB…',
  'Kết nối view dữ liệu của CLB… OK',
  'Quyền truy cập: một buổi làm việc',
  'Sẵn sàng. Chúc điều tra suôn sẻ.',
];
const BOOT_LINE_MS = 380;
const booted = new Set<ChallengeId>();

export function BootSequence({ challengeId }: { challengeId: ChallengeId }) {
  const [shown, setShown] = useState(() => (motionAllowed() && !booted.has(challengeId) ? 0 : -1));

  useEffect(() => {
    if (shown < 0) return;
    booted.add(challengeId);
    const skip = () => setShown(-1);
    window.addEventListener('keydown', skip, { once: true });
    const timer = window.setTimeout(
      () => setShown((n) => (n < 0 || n >= BOOT_LINES.length ? -1 : n + 1)),
      shown >= BOOT_LINES.length ? 500 : BOOT_LINE_MS,
    );
    return () => {
      window.clearTimeout(timer);
      window.removeEventListener('keydown', skip);
    };
  }, [shown, challengeId]);

  if (shown < 0) return null;
  return (
    <div className="terminal-boot" aria-hidden="true" onClick={() => setShown(-1)}>
      <div className="terminal-boot__screen">
        {BOOT_LINES.slice(0, shown + 1).map((line, i) => (
          <p key={line} className={i === shown ? 'is-typing' : undefined}>
            <span className="terminal-boot__prompt">&gt;</span> {line}
          </p>
        ))}
        <p className="terminal-boot__skip">Bấm hoặc nhấn phím bất kỳ để bỏ qua</p>
      </div>
    </div>
  );
}

function formatElapsed(ms: number): string {
  const s = Math.floor(ms / 1000);
  const mm = String(Math.floor(s / 60)).padStart(2, '0');
  const ss = String(s % 60).padStart(2, '0');
  return `${mm}:${ss}`;
}

export function SessionClock({ closed }: { closed: boolean }) {
  const [start] = useState(() => Date.now());
  const [now, setNow] = useState(start);
  useEffect(() => {
    if (closed) return;
    const id = window.setInterval(() => setNow(Date.now()), 1000);
    return () => window.clearInterval(id);
  }, [closed]);
  return (
    <span className={`terminal-clock${closed ? ' is-closed' : ''}`} aria-hidden="true">
      <i className="terminal-clock__dot" />
      {closed ? 'Phiên đã đóng' : `Phiên truy cập ${formatElapsed(now - start)}`}
    </span>
  );
}

const COUNT_MS = 650;

export function RowCounter({ value, failed }: { value: number; failed: boolean }) {
  const [shown, setShown] = useState(() => (motionAllowed() && !failed ? 0 : value));
  useEffect(() => {
    if (failed || !motionAllowed()) return;
    let frame = 0;
    const t0 = performance.now();
    const tick = (t: number) => {
      const p = Math.min(1, (t - t0) / COUNT_MS);
      const eased = 1 - (1 - p) ** 3;
      setShown(Math.round(value * eased));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, failed]);
  return (
    <span className={`terminal-counter${failed ? ' is-failed' : ''}`} aria-hidden="true">
      {failed ? (
        'LỖI'
      ) : (
        <>
          <b>{shown}</b> dòng
        </>
      )}
    </span>
  );
}
