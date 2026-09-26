/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cấu hình dùng chung cho Vite (dev/build/preview) và Vitest.
// sql.js: trình duyệt nạp tệp .wasm qua import `?url` (xem src/sql-challenge/engine/sqljs.ts).
// sql.js là CommonJS (`module.exports = initSqlJs`): ở chế độ dev Vite PHẢI pre-bundle nó thành ESM
// (optimizeDeps) thì `import initSqlJs from 'sql.js'` mới có default export; `exclude: ['sql.js']`
// làm dev vỡ ngay lúc nạp (SyntaxError "does not provide an export named 'default'") trong khi
// build/preview vẫn chạy vì rolldown tự interop CJS. Canary: src/sql-challenge/engine/sqljs.dev.test.ts.
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    include: ['sql.js'],
  },
  build: {
    target: 'es2022',
    sourcemap: false,
  },
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test/setup.ts'],
    include: ['src/**/*.test.{ts,tsx}'],
    css: false,
  },
});
