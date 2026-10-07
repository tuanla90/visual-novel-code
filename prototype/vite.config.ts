/// <reference types="vitest/config" />
import { readFileSync, realpathSync } from 'node:fs';
import { defineConfig, searchForWorkspaceRoot, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { createCompanionHandler } from './ai-companion.mjs';

const companionHandler = createCompanionHandler();
const companionApiPlugin: Plugin = {
  name: 'ai-companion-api',
  configureServer(server) {
    server.middlewares.use((request, response, next) => {
      void companionHandler(request, response).then((handled) => {
        if (!handled) next();
      }).catch(next);
    });
  },
  configurePreviewServer(server) {
    server.middlewares.use((request, response, next) => {
      void companionHandler(request, response).then((handled) => {
        if (!handled) next();
      }).catch(next);
    });
  },
};

// PWA: phát `sw.js` ở gốc dist từ src/pwa/sw.js, thay `__PHIEN_BAN__` bằng mã bản dựng để mỗi lần deploy là một worker mới.
const swPlugin: Plugin = {
  name: 'clb-sw',
  apply: 'build',
  generateBundle() {
    const nguon = readFileSync(new URL('./src/pwa/sw.js', import.meta.url), 'utf8').replaceAll('__PHIEN_BAN__', Date.now().toString(36));
    this.emitFile({ type: 'asset', fileName: 'sw.js', source: nguon });
  },
};

// Cấu hình dùng chung cho Vite (dev/build/preview) và Vitest.
// sql.js: trình duyệt nạp tệp .wasm qua import `?url` (xem src/sql-challenge/engine/sqljs.ts).
// sql.js là CommonJS (`module.exports = initSqlJs`): ở chế độ dev Vite PHẢI pre-bundle nó thành ESM
// (optimizeDeps) thì `import initSqlJs from 'sql.js'` mới có default export; `exclude: ['sql.js']`
// làm dev vỡ ngay lúc nạp (SyntaxError "does not provide an export named 'default'") trong khi
// build/preview vẫn chạy vì rolldown tự interop CJS. Canary: src/sql-challenge/engine/sqljs.dev.test.ts.
export default defineConfig({
  plugins: [react(), companionApiPlugin, swPlugin],
  optimizeDeps: {
    include: ['sql.js'],
  },
  // Ở worktree, node_modules là lối tắt trỏ về bản chính: cho phép nạp tệp (phông @fontsource) từ đường dẫn thật.
  server: {
    fs: { allow: [searchForWorkspaceRoot(process.cwd()), realpathSync(new URL('./node_modules', import.meta.url))] },
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
    // Màn tra dựng CSDL thật (bảng sinh viên gần bốn nghìn dòng): chạy cả bộ song song thì 5 giây mặc định không đủ.
    testTimeout: 20000,
  },
});
