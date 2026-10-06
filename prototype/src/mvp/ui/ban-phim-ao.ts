/**
 * Bàn phím ảo trên điện thoại (user 06/10: "gõ bàn phím hơi tệ, gần như không nhìn được gì khi bàn phím hiện lên").
 *
 * Khi một ô nhập đang có tiêu điểm và vùng còn thấy được của trang (`visualViewport`) thấp hơn hẳn cửa sổ (bàn phím chiếm
 * chỗ) thì vào CHẾ ĐỘ GÕ: gắn `data-ban-phim="1"` lên <html> cùng hai biến CSS `--vv-tren` (đỉnh vùng thấy) và `--vv-cao`
 * (chiều cao vùng thấy). CSS (mvp.css, khối "chế độ gõ") neo khung đang gõ (hỏi nhân chứng, chat bạn đi cùng, nhập tên,
 * SQL gõ tay) vào đúng vùng ấy, bỏ sân khấu và các phần phụ, nên người chơi luôn thấy ô nhập và vài dòng gần nhất.
 *
 * Chrome Android mặc định không co trang khi bàn phím mở (chỉ co `visualViewport`), Safari iOS cũng vậy, nên không dựa vào
 * `100dvh`/`@media (max-height)`; dựa vào `visualViewport` là cách chạy được ở cả hai.
 */
import { useEffect, useSyncExternalStore } from 'react';

/** Bàn phím "có" khi vùng thấy được mất hơn 1/5 chiều cao cửa sổ (bàn phím ảo thường chiếm 35–60%). */
const TI_LE_MAT = 0.8;

function laONhap(el: Element | null): boolean {
  if (!el) return false;
  const tag = el.tagName;
  if (tag === 'TEXTAREA') return true;
  if (tag === 'INPUT') {
    const kieu = ((el as HTMLInputElement).type || 'text').toLowerCase();
    return !['button', 'checkbox', 'radio', 'range', 'submit', 'reset', 'file', 'color'].includes(kieu);
  }
  return (el as HTMLElement).isContentEditable === true;
}

/** Hàm thuần để test: có đang gõ với bàn phím ảo chiếm chỗ không. */
export function dangGoOBanPhim(hoat: Element | null, caoThay: number, caoCuaSo: number): boolean {
  if (!laONhap(hoat)) return false;
  if (!(caoCuaSo > 0) || !(caoThay > 0)) return false;
  return caoThay < caoCuaSo * TI_LE_MAT;
}

/** Trạng thái chế độ gõ dùng chung (màn tra v7 nằm trong khung bị scale nên không dùng được position: fixed, phải vẽ qua portal). */
let dangCheDoGo = false;
const nguoiNghe = new Set<() => void>();
function datCheDoGo(co: boolean): void {
  if (dangCheDoGo === co) return;
  dangCheDoGo = co;
  for (const n of nguoiNghe) n();
}
/** Hook đọc chế độ gõ ở bất kỳ màn nào (true = bàn phím ảo đang chiếm chỗ). */
export function useCheDoGo(): boolean {
  return useSyncExternalStore(
    (n) => {
      nguoiNghe.add(n);
      return () => nguoiNghe.delete(n);
    },
    () => dangCheDoGo,
    () => false,
  );
}

function apDung(co: boolean, tren: number, cao: number): void {
  datCheDoGo(co);
  const html = document.documentElement;
  if (co) {
    html.dataset.banPhim = '1';
    html.style.setProperty('--vv-tren', `${Math.max(0, Math.round(tren))}px`);
    html.style.setProperty('--vv-cao', `${Math.max(0, Math.round(cao))}px`);
  } else {
    delete html.dataset.banPhim;
    html.style.removeProperty('--vv-tren');
    html.style.removeProperty('--vv-cao');
  }
}

/** Theo dõi bàn phím ảo; trả về `true` khi đang ở chế độ gõ (để vẽ nút "Xong" thu bàn phím). */
export function useBanPhimAo(): boolean {
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const vv = window.visualViewport;
    let hen: ReturnType<typeof setTimeout> | null = null;
    const tinh = (): void => {
      if (import.meta.env.DEV && document.documentElement.dataset.banPhimGia === '1') return;
      const caoThay = vv?.height ?? window.innerHeight;
      const tren = vv?.offsetTop ?? 0;
      const moi = dangGoOBanPhim(document.activeElement, caoThay, window.innerHeight);
      apDung(moi, tren, caoThay);
    };
    // Sau focus/blur, bàn phím trượt lên/xuống mất vài trăm ms: tính lại vài lần.
    const tinhTre = (): void => {
      if (hen) clearTimeout(hen);
      tinh();
      hen = setTimeout(tinh, 120);
      setTimeout(tinh, 400);
    };
    vv?.addEventListener('resize', tinh);
    vv?.addEventListener('scroll', tinh);
    window.addEventListener('resize', tinh);
    document.addEventListener('focusin', tinhTre);
    document.addEventListener('focusout', tinhTre);
    return () => {
      if (hen) clearTimeout(hen);
      vv?.removeEventListener('resize', tinh);
      vv?.removeEventListener('scroll', tinh);
      window.removeEventListener('resize', tinh);
      document.removeEventListener('focusin', tinhTre);
      document.removeEventListener('focusout', tinhTre);
      apDung(false, 0, 0);
    };
  }, []);
  return useCheDoGo();
}

// Cổng dev: trình duyệt máy tính không có bàn phím ảo; gọi `window.__clbBanPhim(175)` để giả vùng thấy cao 175px (0 = tắt).
if (import.meta.env.DEV && typeof window !== 'undefined') {
  (window as unknown as Record<string, unknown>).__clbBanPhim = (cao: number): void => {
    if (cao > 0) document.documentElement.dataset.banPhimGia = '1';
    else delete document.documentElement.dataset.banPhimGia;
    apDung(cao > 0, 0, cao);
  };
}

/** Thu bàn phím: bỏ tiêu điểm khỏi ô đang gõ. */
export function thuBanPhim(): void {
  const el = document.activeElement;
  if (el instanceof HTMLElement) el.blur();
}
