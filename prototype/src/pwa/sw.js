/* Service worker của CLB Thám Tử Dữ Liệu (user 06/10: chơi trên điện thoại ở chế độ app, thi thoảng mở ra bấm không được).
 * `__PHIEN_BAN__` được plugin `clb-sw` trong vite.config.ts thay bằng mã bản dựng lúc build, nên mỗi lần deploy là một
 * worker mới: cài xong tự kích hoạt (skipWaiting + clients.claim), xóa kho cũ; trang đang mở sẽ tải lại khi bị ẩn
 * (src/pwa/dang-ky-sw.ts). Chiến lược: trang (navigate) MẠNG TRƯỚC, hỏng mạng thì trả index.html đã cất; tệp /assets/
 * (tên có mã băm, bất biến) KHO TRƯỚC. Không đụng /api/ và nguồn ngoài. */
const PHIEN_BAN = '__PHIEN_BAN__';
const KHO = 'clb-tham-tu-' + PHIEN_BAN;

self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    (async () => {
      const ten = await caches.keys();
      await Promise.all(ten.filter((k) => k !== KHO).map((k) => caches.delete(k)));
      await self.clients.claim();
    })(),
  );
});

self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== self.location.origin) return;
  if (url.pathname.startsWith('/api/')) return;
  if (req.mode === 'navigate') {
    event.respondWith(mangTruoc(req));
    return;
  }
  if (url.pathname.startsWith('/assets/') || url.pathname.startsWith('/icons/') || url.pathname === '/manifest.webmanifest') {
    event.respondWith(khoTruoc(req));
  }
});

async function mangTruoc(req) {
  const kho = await caches.open(KHO);
  try {
    const res = await fetch(req);
    if (res.ok) kho.put('/index.html', res.clone());
    return res;
  } catch {
    const cu = await kho.match('/index.html');
    return cu || Response.error();
  }
}

async function khoTruoc(req) {
  const kho = await caches.open(KHO);
  const co = await kho.match(req);
  if (co) return co;
  const res = await fetch(req);
  if (res.ok) kho.put(req, res.clone());
  return res;
}
