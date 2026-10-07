import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { describe, expect, it } from 'vitest';
import { laLoiNapModule } from './dang-ky-sw';

// Vitest chạy ở prototype/ (jsdom không cho URL file: từ import.meta.url).
const goc = process.cwd();
const doc = (p: string): string => readFileSync(resolve(goc, p), 'utf8');

describe('PWA (manifest, meta iOS, service worker, tải lại khi mô-đun cũ hỏng)', () => {
  it('index.html có manifest, meta cho iOS web app, theme-color và viewport-fit=cover', () => {
    const html = doc('index.html');
    expect(html).toMatch(/<link rel="manifest" href="\/manifest\.webmanifest"/);
    expect(html).toMatch(/apple-mobile-web-app-capable" content="yes"/);
    expect(html).toMatch(/apple-touch-icon/);
    expect(html).toMatch(/name="theme-color"/);
    expect(html).toMatch(/viewport-fit=cover/);
  });
  it('manifest hợp lệ: tên, chạy ngang, standalone, đủ icon 192/512/maskable', () => {
    const m = JSON.parse(doc('public/manifest.webmanifest')) as { name: string; display: string; orientation: string; icons: { src: string; sizes: string; purpose?: string }[] };
    expect(m.name).toBe('CLB Thám Tử Dữ Liệu');
    expect(m.display).toBe('standalone');
    expect(m.orientation).toBe('landscape');
    expect(m.icons.map((i) => i.sizes)).toEqual(['192x192', '512x512', '512x512']);
    expect(m.icons.some((i) => i.purpose === 'maskable')).toBe(true);
    for (const i of m.icons) expect(() => readFileSync(resolve(goc, `public${i.src}`))).not.toThrow();
    expect(() => readFileSync(resolve(goc, 'public/icons/apple-touch-icon.png'))).not.toThrow();
  });
  it('service worker: có chỗ thay mã bản dựng, skipWaiting, clients.claim, không đụng /api/', () => {
    const sw = doc('src/pwa/sw.js');
    expect(sw).toContain('__PHIEN_BAN__');
    expect(sw).toContain('skipWaiting');
    expect(sw).toContain('clients.claim');
    expect(sw).toContain("startsWith('/api/')");
  });
  it('nhận ra lỗi nạp mô-đun băm cũ của Chrome, Safari, Firefox; lỗi khác thì không', () => {
    expect(laLoiNapModule('TypeError: Failed to fetch dynamically imported module: https://x/assets/index-abc.js')).toBe(true);
    expect(laLoiNapModule('TypeError: Importing a module script failed.')).toBe(true);
    expect(laLoiNapModule('TypeError: error loading dynamically imported module')).toBe(true);
    expect(laLoiNapModule('Unable to preload CSS for /assets/a.css')).toBe(true);
    expect(laLoiNapModule('Cannot read properties of undefined')).toBe(false);
  });
});
