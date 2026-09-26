// @vitest-environment jsdom
/**
 * CANARY: `npm run dev` phải nạp được sql.js.
 *
 * Lỗi đã xảy ra (nghiệm thu lần 1): vite.config.ts có `optimizeDeps.exclude: ['sql.js']` → Vite dev
 * không pre-bundle, phục vụ nguyên tệp CommonJS (`module.exports = initSqlJs`) như ES module → trình
 * duyệt ném "does not provide an export named 'default'" → trang trắng. build/preview KHÔNG lộ vì
 * rolldown tự interop CJS; Vitest KHÔNG lộ vì Node nạp sql.js bằng CJS loader. Vì vậy phải kiểm
 * đúng đường đi của trình duyệt ở chế độ dev.
 *
 * Cách kiểm: khởi động Vite dev server thật (config thật của dự án, cache riêng, ép tối ưu lại),
 * rồi làm đúng như trình duyệt: GET module importer → đọc các câu `import X from "…"` đã biến đổi →
 * GET từng module đích → (1) phải có default export; (2) NẠP THẬT đồ thị module đã phục vụ vào Node
 * (jsdom) và gọi `initSqlJs({ wasmBinary })` → chạy một câu SELECT; (3) tệp .wasm mà `?url` trỏ tới
 * phải trả 200 + `application/wasm` + magic bytes `\0asm`.
 *
 * Canary MÙ ở đâu: không chạy trong trình duyệt thật (không thấy lỗi CSP, lỗi fetch/instantiateStreaming
 * của trình duyệt, lỗi HMR); không kiểm build/preview (đã có `npm run build` + curl content-type) hay
 * Vitest (sqljs.test.ts); phân tích câu import bằng regex theo dạng Vite đang sinh (`import X from "…"`),
 * nếu loader đổi sang `import()` động thì canary FAIL với thông điệp "không thấy import" chứ không
 * âm thầm qua; chỉ nạp các chunk trong `/node_modules/.vite/deps/`, module ngoài đó (nếu có) sẽ làm
 * bước nạp thật FAIL rõ ràng.
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { createServer, type ViteDevServer } from 'vite';
import type { SqlJsStatic } from 'sql.js';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../../..'); // prototype/
const CACHE_DIR = 'node_modules/.vite-canary';
const SERVED_DIR = path.join(root, CACHE_DIR, 'served');
const IMPORTER_URL = '/src/sql-challenge/engine/sqljs.ts';

const DEFAULT_IMPORT = /import\s+([A-Za-z_$][\w$]*)\s+from\s+["']([^"']+)["']/g;
const HAS_DEFAULT_EXPORT = /export\s+default\b|export\s*\{[^}]*\bas\s+default\b[^}]*\}/;

let server: ViteDevServer | null = null;
let base = '';

async function getText(url: string): Promise<{ status: number; type: string; text: string }> {
  const res = await fetch(new URL(url, base));
  return { status: res.status, type: res.headers.get('content-type') ?? '', text: await res.text() };
}

/** Tải một module đã phục vụ và mọi chunk `/node_modules/.vite/deps/…` nó import về đĩa, trả đường dẫn tệp. */
async function materialize(url: string, seen = new Map<string, string>()): Promise<string> {
  const key = url.split('?')[0] ?? url;
  const known = seen.get(key);
  if (known) return known;
  const file = path.join(SERVED_DIR, `${path.basename(key).replace(/[^\w.-]/g, '_')}.mjs`);
  seen.set(key, file);
  const { status, text } = await getText(url);
  expect(status, `GET ${url}`).toBe(200);
  let code = text;
  // Chunk của optimizer nằm ở /node_modules/<cacheDir>/deps/… (cacheDir của canary là .vite-canary).
  for (const m of text.matchAll(/from\s+["'](\/node_modules\/\.vite[\w.-]*\/deps\/[^"']+)["']/g)) {
    const depUrl = m[1] ?? '';
    const depFile = await materialize(depUrl, seen);
    code = code.replaceAll(`"${depUrl}"`, JSON.stringify(pathToFileURL(depFile).href));
  }
  mkdirSync(SERVED_DIR, { recursive: true });
  writeFileSync(file, code, 'utf8');
  return file;
}

describe('canary: Vite dev phục vụ sql.js nạp được như trình duyệt', () => {
  beforeAll(async () => {
    server = await createServer({
      configFile: path.join(root, 'vite.config.ts'),
      root,
      logLevel: 'silent',
      cacheDir: CACHE_DIR,
      optimizeDeps: { force: true },
      server: { host: '127.0.0.1', port: 0, strictPort: false, hmr: false, watch: null, open: false },
    });
    await server.listen();
    const addr = server.httpServer?.address();
    if (!addr || typeof addr === 'string') throw new Error('Dev server không có địa chỉ TCP');
    base = `http://127.0.0.1:${addr.port}`;
  }, 90_000);

  afterAll(async () => {
    await server?.close();
  });

  it('module importer trỏ tới sql.js dạng ESM có default export; nạp thật và chạy SELECT tiếng Việt', async () => {
    const importer = await getText(IMPORTER_URL);
    expect(importer.status).toBe(200);
    const imports = [...importer.text.matchAll(DEFAULT_IMPORT)].map((m) => ({ name: m[1] ?? '', url: m[2] ?? '' }));
    const sqlImports = imports.filter((i) => /sql/i.test(i.url));
    expect(sqlImports.map((i) => i.url), 'không thấy câu import mặc định nào của sql.js trong module đã biến đổi').not.toEqual([]);

    const jsImports = sqlImports.filter((i) => !/[?&]url\b/.test(i.url));
    expect(jsImports.length, 'phải có đúng một import mặc định của glue sql.js').toBe(1);
    const glue = jsImports[0]!;

    // (1) Module đích phải là ESM có default export (đây chính là chỗ lỗi cũ vỡ).
    const served = await getText(glue.url);
    expect(served.status, `GET ${glue.url}`).toBe(200);
    expect(served.text, `${glue.url} không có default export → trình duyệt sẽ ném SyntaxError`).toMatch(HAS_DEFAULT_EXPORT);

    // (2) Nạp thật đồ thị module đã phục vụ và khởi tạo SQLite với wasm đọc từ node_modules.
    const g = globalThis as { self?: unknown; window?: unknown };
    if (g.self === undefined) g.self = g.window; // glue web dùng self.location khi ở môi trường web
    const entry = await materialize(glue.url);
    const mod = (await import(/* @vite-ignore */ pathToFileURL(entry).href)) as { default?: unknown };
    expect(typeof mod.default, 'default export của module sql.js đã phục vụ phải là hàm initSqlJs').toBe('function');
    const require = createRequire(import.meta.url);
    const wasmBinary = new Uint8Array(readFileSync(require.resolve('sql.js/dist/sql-wasm-browser.wasm'))).buffer;
    const SQL = (await (mod.default as (cfg: object) => Promise<SqlJsStatic>)({ wasmBinary })) as SqlJsStatic;
    const db = new SQL.Database();
    try {
      const rows = db.exec("SELECT 'Hoài' AS ten WHERE 'Hoài' LIKE 'H%'");
      expect(rows[0]?.values).toEqual([['Hoài']]);
    } finally {
      db.close();
    }
  }, 60_000);

  it('tệp .wasm mà import ?url trỏ tới được phục vụ với application/wasm', async () => {
    const importer = await getText(IMPORTER_URL);
    const urlImport = [...importer.text.matchAll(DEFAULT_IMPORT)].map((m) => m[2] ?? '').find((u) => /wasm.*[?&]url\b/.test(u));
    expect(urlImport, 'không thấy import ?url của tệp wasm').toBeDefined();
    const urlModule = await getText(urlImport!);
    expect(urlModule.status).toBe(200);
    const wasmUrl = /export\s+default\s+"([^"]+)"/.exec(urlModule.text)?.[1];
    expect(wasmUrl, `module ?url không export chuỗi URL: ${urlModule.text.slice(0, 120)}`).toBeDefined();
    const res = await fetch(new URL(wasmUrl!, base));
    expect(res.status).toBe(200);
    expect(res.headers.get('content-type')).toBe('application/wasm');
    const head = new Uint8Array(await res.arrayBuffer()).subarray(0, 4);
    expect([...head]).toEqual([0x00, 0x61, 0x73, 0x6d]); // "\0asm"
  }, 60_000);
});
