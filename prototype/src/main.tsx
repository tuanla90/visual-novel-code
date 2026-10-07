import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './app/App';
import { loadSqlJs } from './sql-challenge/engine/sqljs';
import { installPersistentTelemetry } from './shared/telemetry/setup';
import { dangKyPwa } from './pwa/dang-ky-sw';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';
import './styles/app.css';
import './styles/portrait.css';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Không tìm thấy phần tử #root trong index.html');
}

// Telemetry lưu cục bộ (localStorage), không gửi mạng — QĐ-029.
installPersistentTelemetry();

// PWA: service worker + tải lại khi bản cũ hỏng sau deploy (chỉ bản dựng; xem src/pwa/dang-ky-sw.ts).
dangKyPwa();

// Nạp sớm SQLite (wasm ~650 KB) ngay khi mở ứng dụng để thử thách đầu tiên không phải chờ.
// Lỗi ở đây không chặn phần kể chuyện; màn thử thách sẽ báo lỗi theo lý do thật khi cần.
loadSqlJs().catch((err: unknown) => {
  console.warn('[sqljs] Nạp sớm SQLite thất bại; sẽ thử lại khi vào thử thách.', err);
});

// Cổng cho công cụ quay ván (tools/quay-van): chỉ ở chế độ dev.
if (import.meta.env.DEV) void import('./mvp/dev/cong-quay');

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
