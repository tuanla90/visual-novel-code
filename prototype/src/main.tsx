import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { loadSqlJs } from './sql-challenge/engine/sqljs';
import './styles/fonts.css';
import './styles/tokens.css';
import './styles/base.css';

const rootEl = document.getElementById('root');
if (!rootEl) {
  throw new Error('Không tìm thấy phần tử #root trong index.html');
}

// Nạp sớm SQLite (wasm ~650 KB) ngay khi mở ứng dụng để thử thách đầu tiên không phải chờ.
// Lỗi ở đây không chặn phần kể chuyện; màn thử thách sẽ báo lỗi theo lý do thật khi cần.
loadSqlJs().catch((err: unknown) => {
  console.warn('[sqljs] Nạp sớm SQLite thất bại; sẽ thử lại khi vào thử thách.', err);
});

createRoot(rootEl).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
