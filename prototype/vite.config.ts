/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Cấu hình dùng chung cho Vite (dev/build/preview) và Vitest.
// sql.js: trình duyệt nạp tệp .wasm qua import `?url` (xem src/sql-challenge/engine/sqljs.ts);
// không đưa sql.js vào optimizeDeps để Vite không cố bundle phần nạp wasm của nó.
export default defineConfig({
  plugins: [react()],
  optimizeDeps: {
    exclude: ['sql.js'],
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
