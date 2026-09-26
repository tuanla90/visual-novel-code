/**
 * Loader dùng chung cho sql.js (SQLite biên dịch sang WebAssembly).
 *
 * Đây là NƠI DUY NHẤT nạp sql.js. Gói `sql-engine` (gói 3) xây engine đầy đủ
 * (dataset, chạy, chấm) trên `loadSqlJs()` / `createDatabase()`, không nạp lại.
 *
 * Hai môi trường:
 * - Trình duyệt (dev/build/preview): Vite gói tệp .wasm thành asset, ta lấy URL qua
 *   import `?url` rồi đưa cho `locateFile` — tệp được phục vụ với content-type
 *   `application/wasm`, nên WebAssembly.instantiateStreaming dùng được.
 * - Node (Vitest, kể cả môi trường jsdom): không có fetch tệp cục bộ, nên đọc thẳng
 *   bytes của .wasm trong node_modules rồi đưa qua `wasmBinary`. Hai tệp
 *   `sql-wasm.wasm` và `sql-wasm-browser.wasm` của sql.js 1.14 giống hệt nhau (đã cmp),
 *   nên glue nào đi kèm cũng chạy được.
 */
import initSqlJs from 'sql.js';
import type { Database, SqlJsStatic } from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm-browser.wasm?url';

let sqlJsPromise: Promise<SqlJsStatic> | null = null;

/** Đang chạy dưới Node (Vitest) chứ không phải trình duyệt thật. */
function isNodeRuntime(): boolean {
  const g = globalThis as { process?: { versions?: { node?: unknown } } };
  return typeof g.process?.versions?.node === 'string';
}

// Kiểu tối thiểu của hai module Node ta cần, để không phải kéo @types/node vào
// chương trình trình duyệt.
type NodeFsPromises = { readFile(path: string): Promise<Uint8Array> };
type NodeModule = { createRequire(url: string): { resolve(id: string): string } };

async function readWasmBinaryFromNodeModules(): Promise<ArrayBuffer> {
  // Chuỗi ghép + @vite-ignore: Vite/rolldown không phân tích được đặc tả nên không cố
  // gói 'node:fs' / 'node:module' vào bundle trình duyệt; nhánh này chỉ chạy dưới Node.
  const fsSpec = ['node:fs', 'promises'].join('/');
  const moduleSpec = ['node', 'module'].join(':');
  const [fs, nodeModule] = (await Promise.all([
    import(/* @vite-ignore */ fsSpec),
    import(/* @vite-ignore */ moduleSpec),
  ])) as [NodeFsPromises, NodeModule];
  const require = nodeModule.createRequire(import.meta.url);
  const wasmPath = require.resolve('sql.js/dist/sql-wasm.wasm');
  const bytes = await fs.readFile(wasmPath);
  // Sao chép vào ArrayBuffer riêng (Buffer của Node có thể dùng chung pool).
  return new Uint8Array(bytes).buffer;
}

/**
 * Nạp sql.js một lần cho cả ứng dụng (kết quả được cache; nếu nạp lỗi thì lần gọi
 * sau thử lại).
 */
export function loadSqlJs(): Promise<SqlJsStatic> {
  if (!sqlJsPromise) {
    const attempt = isNodeRuntime()
      ? readWasmBinaryFromNodeModules().then((wasmBinary) => initSqlJs({ wasmBinary }))
      : initSqlJs({ locateFile: () => wasmUrl });
    sqlJsPromise = attempt.catch((err: unknown) => {
      sqlJsPromise = null;
      throw err;
    });
  }
  return sqlJsPromise;
}

/** Tạo một CSDL SQLite rỗng trong bộ nhớ. Người gọi chịu trách nhiệm `db.close()`. */
export async function createDatabase(): Promise<Database> {
  const SQL = await loadSqlJs();
  return new SQL.Database();
}

export type { Database, SqlJsStatic } from 'sql.js';
