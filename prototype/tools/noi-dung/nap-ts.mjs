// Cho `node` chạy thẳng tệp .ts của repo (Node ≥ 23.6 tự bỏ kiểu): mã trong src/ import không ghi
// đuôi (`./ids`) theo kiểu Vite, nên thử thêm `.ts` khi không tìm thấy. Dùng: node --import ./tools/noi-dung/nap-ts.mjs <tệp.ts>
import { registerHooks } from 'node:module';

registerHooks({
  resolve(specifier, context, next) {
    try {
      return next(specifier, context);
    } catch (e) {
      if (/^\.\.?\//.test(specifier) && !/\.[cm]?[jt]sx?$/.test(specifier)) return next(`${specifier}.ts`, context);
      throw e;
    }
  },
});
