import { createReadStream } from 'node:fs';
import { stat } from 'node:fs/promises';
import { createServer } from 'node:http';
import { extname, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createGzip } from 'node:zlib';
import { createCompanionHandler } from './ai-companion.mjs';

const dist = resolve(fileURLToPath(new URL('./dist/', import.meta.url)));
const port = Number(process.env.PORT || 4173);
const types = {
  '.avif': 'image/avif',
  '.css': 'text/css; charset=utf-8',
  '.html': 'text/html; charset=utf-8',
  '.ico': 'image/x-icon',
  '.jpeg': 'image/jpeg',
  '.jpg': 'image/jpeg',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.mp3': 'audio/mpeg',
  '.ogg': 'audio/ogg',
  '.png': 'image/png',
  '.svg': 'image/svg+xml',
  '.txt': 'text/plain; charset=utf-8',
  '.wasm': 'application/wasm',
  '.wav': 'audio/wav',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
};

const COMPRESSIBLE = new Set([
  '.css',
  '.html',
  '.js',
  '.json',
  '.svg',
  '.txt',
  '.wasm',
]);

const companionHandler = createCompanionHandler();

createServer(async (request, response) => {
  if (await companionHandler(request, response)) return;
  if (request.method !== 'GET' && request.method !== 'HEAD') {
    response.writeHead(405, { Allow: 'GET, HEAD' }).end();
    return;
  }

  let pathname;
  try {
    pathname = decodeURIComponent(new URL(request.url || '/', 'http://localhost').pathname);
  } catch {
    response.writeHead(400).end('Bad request');
    return;
  }

  let file = resolve(dist, `.${pathname}`);
  if (file !== dist && !file.startsWith(`${dist}${sep}`)) {
    response.writeHead(403).end('Forbidden');
    return;
  }

  let fileStat;
  try {
    fileStat = await stat(file);
    if (fileStat.isDirectory()) {
      file = resolve(file, 'index.html');
      fileStat = await stat(file);
    }
    if (!fileStat.isFile()) throw new Error('Not a file');
  } catch {
    if (extname(pathname)) {
      response.writeHead(404).end('Not found');
      return;
    }
    file = resolve(dist, 'index.html');
    try {
      fileStat = await stat(file);
    } catch {
      response.writeHead(404).end('Not found');
      return;
    }
  }

  const ext = extname(file).toLowerCase();
  const acceptEncoding = request.headers['accept-encoding'] || '';
  const canGzip = COMPRESSIBLE.has(ext) && /\bgzip\b/i.test(acceptEncoding);

  const headers = {
    'Cache-Control': pathname.startsWith('/assets/') ? 'public, max-age=31536000, immutable' : 'no-cache',
    'Content-Type': types[ext] || 'application/octet-stream',
    'X-Content-Type-Options': 'nosniff',
  };

  if (canGzip) {
    headers['Content-Encoding'] = 'gzip';
    headers['Vary'] = 'Accept-Encoding';
    response.writeHead(200, headers);
    if (request.method === 'HEAD') response.end();
    else createReadStream(file).pipe(createGzip()).pipe(response);
  } else {
    headers['Content-Length'] = fileStat.size;
    response.writeHead(200, headers);
    if (request.method === 'HEAD') response.end();
    else createReadStream(file).pipe(response);
  }
}).listen(port, '0.0.0.0', () => {
  console.log(`Serving game on 0.0.0.0:${port}`);
});
