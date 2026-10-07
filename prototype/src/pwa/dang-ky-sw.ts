/**
 * PWA (user 06/10: "improve khả năng PWA để chơi được trên điện thoại; thi thoảng mở ở chế độ app ngoài màn hình của iOS thì
 * không bấm được nút bắt đầu").
 *
 * - Đăng ký service worker `/sw.js` (chỉ bản dựng). Worker mới (sau deploy) tự kích hoạt; trang đang mở KHÔNG tải lại ngay
 *   giữa ván mà đợi lúc bị ẩn (người chơi chuyển app) rồi tải lại, ván đã nằm trong localStorage nên không mất.
 * - Mỗi lần app hiện lại thì hỏi worker có bản mới không (`registration.update()`), vì iOS giữ trang web-app rất lâu.
 * - Trang cũ nạp module theo tên băm đã bị deploy mới xóa (lỗi "Failed to fetch dynamically imported module"): tải lại
 *   một lần (khóa bằng sessionStorage để không lặp vô hạn).
 */

/** Lỗi do mô-đun/tệp băm không còn trên máy chủ sau deploy (Chrome, Safari, Firefox dùng chữ khác nhau). */
export function laLoiNapModule(thongBao: string): boolean {
  return /Failed to fetch dynamically imported module|Importing a module script failed|error loading dynamically imported module|Unable to preload CSS|ChunkLoadError|Loading chunk \d+ failed/i.test(thongBao);
}

/** Đang chạy như app cài ngoài màn hình chính (Android/Chrome `display-mode: standalone`, iOS `navigator.standalone`). */
export function laCheDoApp(): boolean {
  if (typeof window === 'undefined') return false;
  const nav = window.navigator as Navigator & { standalone?: boolean };
  return nav.standalone === true || (typeof window.matchMedia === 'function' && window.matchMedia('(display-mode: standalone)').matches);
}

const KHOA_TAI_LAI = 'clb_tai_lai_mot_lan';

function taiLaiMotLan(): void {
  try {
    if (sessionStorage.getItem(KHOA_TAI_LAI) === '1') return;
    sessionStorage.setItem(KHOA_TAI_LAI, '1');
  } catch {
    /* sessionStorage có thể bị chặn; vẫn tải lại một lần theo cờ trong bộ nhớ */
  }
  window.location.reload();
}

let daDangKy = false;

export function dangKyPwa(): void {
  if (daDangKy || typeof window === 'undefined' || !import.meta.env.PROD) return;
  daDangKy = true;

  window.addEventListener('error', (e) => {
    if (laLoiNapModule(String(e.message ?? ''))) taiLaiMotLan();
  });
  window.addEventListener('unhandledrejection', (e) => {
    const ly = e.reason as { message?: string } | string | undefined;
    const chu = typeof ly === 'string' ? ly : String(ly?.message ?? '');
    if (laLoiNapModule(chu)) taiLaiMotLan();
  });
  // Trang chạy ổn: lần nạp sau nếu hỏng vẫn được tải lại một lần nữa.
  try {
    sessionStorage.removeItem(KHOA_TAI_LAI);
  } catch {
    /* bỏ qua */
  }

  if (!('serviceWorker' in navigator)) return;
  const sw = navigator.serviceWorker;
  let coDieuKhienTruoc = !!sw.controller;
  let choTaiLai = false;
  sw.addEventListener('controllerchange', () => {
    // Lần đầu cài (chưa có worker điều khiển) thì không cần tải lại; từ lần sau là bản mới sau deploy.
    if (coDieuKhienTruoc) {
      if (document.visibilityState === 'hidden') window.location.reload();
      else choTaiLai = true;
    }
    coDieuKhienTruoc = true;
  });
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden' && choTaiLai) window.location.reload();
  });

  window.addEventListener('load', () => {
    sw.register('/sw.js')
      .then((reg) => {
        document.addEventListener('visibilitychange', () => {
          if (document.visibilityState === 'visible') void reg.update().catch(() => undefined);
        });
      })
      .catch((err: unknown) => {
        console.warn('[pwa] Không đăng ký được service worker.', err);
      });
  });
}
