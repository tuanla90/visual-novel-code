// Gom mọi tài liệu Markdown của repo thành MỘT tệp HTML tự chứa (dist/index.html) để đọc và rà soát.
// Chạy: `npm run build` (một lần) hoặc `npm run watch` (tự dựng lại khi sửa tài liệu).
// Thứ tự đọc và đánh giá tác động từng tài liệu lấy từ danh-muc.json.
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, watch, writeFileSync } from 'node:fs';
import { dirname, join, relative, resolve, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { Marked } from 'marked';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '../..');
const OUT_DIR = join(HERE, 'dist');
const OUT_FILE = join(OUT_DIR, 'index.html');
const CATALOG_FILE = join(HERE, 'danh-muc.json');
const ASSESS_DIR = join(HERE, 'danh-gia');

/** Nơi tìm tài liệu (tính từ gốc repo). Thư mục thì quét đệ quy mọi tệp .md. */
const SOURCES = ['README.md', 'docs', 'art', 'prototype/README.md', 'prototype/docs', 'prototype/src/assets/art/README.md'];
const DECISION_LOG = 'docs/lich-su-quyet-dinh.md';

const toPosix = (p) => p.split(sep).join('/');

function collectMarkdown() {
  const files = [];
  const walk = (abs) => {
    const st = statSync(abs);
    if (st.isDirectory()) {
      for (const name of readdirSync(abs)) if (name !== 'node_modules' && !name.startsWith('.')) walk(join(abs, name));
    } else if (abs.endsWith('.md')) files.push(toPosix(relative(ROOT, abs)));
  };
  for (const s of SOURCES) if (existsSync(join(ROOT, s))) walk(join(ROOT, s));
  return [...new Set(files)].sort();
}

const escapeHtml = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

const decodeEntities = (s) =>
  s.replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&amp;/g, '&');

function slugify(text) {
  return text
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/đ/gi, 'd')
    .toLowerCase()
    .replace(/<[^>]+>/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80) || 'muc';
}

/**
 * Gắn link cho tham chiếu trong HTML đã dựng (chỉ phần chữ, không đụng thẻ, bỏ qua trong <a>/<pre>):
 * - `ten-tep.md` hoặc `ten-tep.md:120` (hay `:120-130`) → trang tài liệu, nhảy tới dòng;
 * - `QĐ-072` → mục quyết định trong sổ;
 * - `GDD:83`, `dac-ta:101` → tên tắt của hai tài liệu hay được dẫn;
 * - chỉ trong thẻ đánh giá (có `ctxPath`): `dòng 86`, `(:52-72)` → dòng của chính tài liệu đang xem.
 */
const ALIASES = { GDD: 'docs/thiet-ke/clb-tham-tu-du-lieu-GDD-v0.5.md', 'dac-ta': 'docs/dac-ta-dinh-dang-noi-dung.md' };
function makeLinkifier(byName, hasDecisionLog) {
  const RE = /((?:[\w.-]+\/)*([\w.-]+\.md))(?::(\d+)(?:[-–](\d+))?)?|QĐ-(\d{3})|(GDD|dac-ta):(\d+)|(dòng) (\d+)|(?<=[\s(,;])(:)(\d+)/g;
  const docLink = (path, line, text) => `<a class="ref ref--doc" href="#${path}${line ? `@L${line}` : ''}">${text}</a>`;
  return function linkify(html, ctxPath = null) {
    const parts = html.split(/(<[^>]*>)/);
    let inA = 0;
    let inPre = 0;
    for (let i = 0; i < parts.length; i++) {
      const part = parts[i];
      if (part.startsWith('<')) {
        if (/^<a[\s>]/i.test(part)) inA++;
        else if (/^<\/a>/i.test(part)) inA = Math.max(0, inA - 1);
        else if (/^<pre[\s>]/i.test(part)) inPre++;
        else if (/^<\/pre>/i.test(part)) inPre = Math.max(0, inPre - 1);
        continue;
      }
      if (inA || inPre || !part) continue;
      parts[i] = part.replace(RE, (m, full, base, line, _end, qd, alias, aliasLine, dong, dongLine, colon, colonLine) => {
        if (qd) return hasDecisionLog ? `<a class="ref ref--qd" href="#${DECISION_LOG}@qd-${qd}">${m}</a>` : m;
        if (alias) return docLink(ALIASES[alias], aliasLine, m);
        if (dong || colon) return ctxPath ? docLink(ctxPath, dongLine || colonLine, m) : m;
        const target = byName.get(full) || byName.get(base) || (base === 'README.md' && full === base ? 'README.md' : null);
        return target ? docLink(target, line, m) : m;
      });
    }
    return parts.join('');
  };
}

function renderDoc(path, source, linkify) {
  const slugs = new Map();
  const toc = [];
  const md = new Marked({ gfm: true });
  md.use({
    renderer: {
      heading(token) {
        const inner = this.parser.parseInline(token.tokens);
        let slug = 'h-' + slugify(token.text);
        const n = slugs.get(slug) ?? 0;
        slugs.set(slug, n + 1);
        if (n) slug += '-' + (n + 1);
        if (token.depth >= 2 && token.depth <= 3) toc.push({ depth: token.depth, slug, text: decodeEntities(inner.replace(/<[^>]+>/g, '')) });
        return `<h${token.depth} id="${slug}">${inner}</h${token.depth}>\n`;
      },
    },
  });

  const tokens = md.lexer(source);
  let line = 1;
  const blocks = [];
  let title = null;
  for (const token of tokens) {
    const start = line;
    line += (token.raw.match(/\n/g) || []).length;
    if (token.type === 'space') continue;
    if (!title && token.type === 'heading' && token.depth === 1) title = token.text;
    const list = Object.assign([token], { links: tokens.links });
    // Bọc bảng để cuộn ngang trên màn hẹp.
    const inner = linkify(md.parser(list)).replace(/<table>/g, '<div class="table-wrap"><table>').replace(/<\/table>/g, '</table></div>');
    const qd = /^\*\*QĐ-(\d{3})/.exec(token.raw);
    const id = qd ? ` id="qd-${qd[1]}"` : '';
    blocks.push(`<div class="blk" data-l="${start}"${id}>${inner}</div>`);
  }
  const qdRefs = [...new Set([...source.matchAll(/QĐ-(\d{3})/g)].map((m) => m[1]))].sort();
  return {
    path,
    title: (title || path.split('/').pop()).replace(/[*_`]/g, ''),
    html: blocks.join('\n'),
    toc,
    lineCount: source.split('\n').length,
    qdRefs,
  };
}

function renderInline(text, linkify, ctxPath = null) {
  const md = new Marked({ gfm: true });
  return linkify(md.parseInline(String(text)), ctxPath);
}

function build() {
  const started = Date.now();
  const paths = collectMarkdown();
  const byBasename = new Map();
  const dupes = new Set();
  for (const p of paths) {
    const base = p.split('/').pop();
    if (byBasename.has(base)) dupes.add(base);
    byBasename.set(base, p);
  }
  // Tên trùng (vd nhiều README.md) thì chỉ link khi có đường dẫn đủ; bỏ ánh xạ theo tên trần.
  for (const d of dupes) byBasename.delete(d);
  for (const p of paths) byBasename.set(p, p); // khớp cả đường dẫn đầy đủ tính từ gốc repo

  const linkify = makeLinkifier(byBasename, paths.includes(DECISION_LOG));
  const sources = Object.fromEntries(paths.map((p) => [p, readFileSync(join(ROOT, p), 'utf8').replace(/\r\n/g, '\n')]));
  const docs = paths.map((p) => renderDoc(p, sources[p], linkify));

  // Tài liệu nào nhắc tới tài liệu này (theo tên tệp) — tính tự động.
  for (const d of docs) {
    const base = d.path.split('/').pop();
    const needle = dupes.has(base) ? d.path : base;
    d.mentionedBy = docs.filter((o) => o.path !== d.path && sources[o.path].includes(needle)).map((o) => o.path);
  }

  let catalog = { giai_doan: [], ngoai: [] };
  if (existsSync(CATALOG_FILE)) catalog = { ...catalog, ...JSON.parse(readFileSync(CATALOG_FILE, 'utf8')) };

  // Đánh giá từng tài liệu: mọi tệp danh-gia/*.json (mảng các khối, khóa theo `path`).
  const raw = {};
  if (existsSync(ASSESS_DIR)) {
    for (const f of readdirSync(ASSESS_DIR).filter((x) => x.endsWith('.json')).sort()) {
      for (const a of JSON.parse(readFileSync(join(ASSESS_DIR, f), 'utf8'))) raw[a.path] = a;
    }
  }
  const assess = {};
  for (const [p, a] of Object.entries(raw)) {
    const ctx = p.endsWith('/') ? null : p; // thư mục (vd docs/mockups/) không có số dòng
    const conv = (v) => (Array.isArray(v) ? v.map((x) => renderInline(x, linkify, ctx)) : typeof v === 'string' ? renderInline(v, linkify, ctx) : v);
    const out = {};
    for (const [k, v] of Object.entries(a)) {
      if (k === 'path') out[k] = v;
      else if (k === 'tac_dong' && v) out[k] = Object.fromEntries(Object.entries(v).map(([kk, vv]) => [kk, conv(vv)]));
      else out[k] = conv(v);
    }
    assess[p] = out;
  }
  // Thư mục được xếp vào thứ tự đọc hoặc có đánh giá (vd docs/mockups/): tạo một trang liệt kê tệp.
  const dirPaths = [...new Set([...(catalog.giai_doan || []).flatMap((g) => g.tai_lieu), ...Object.keys(raw)])].filter(
    (p) => p.endsWith('/') && existsSync(join(ROOT, p)) && statSync(join(ROOT, p)).isDirectory(),
  );
  for (const dir of dirPaths) {
    const files = readdirSync(join(ROOT, dir)).filter((f) => statSync(join(ROOT, dir, f)).isFile()).sort();
    const rows = files
      .map((f) => {
        const href = toPosix(relative(OUT_DIR, join(ROOT, dir, f)));
        const open = f.endsWith('.html') ? ' — <b>mở trong tab mới</b>' : '';
        return `<li><a href="${escapeHtml(href)}" target="_blank" rel="noopener"><code>${escapeHtml(f)}</code></a>${open}</li>`;
      })
      .join('');
    const source = files.join('\n');
    sources[dir] = source;
    docs.push({
      path: dir,
      title: catalog.ten_thu_muc?.[dir] || `Thư mục ${dir}`,
      html: `<div class="blk" data-l="1"><p>Thư mục này chứa tệp HTML/ảnh, không phải Markdown. Bấm để mở từng tệp:</p><ul>${rows}</ul></div>`,
      toc: [],
      lineCount: files.length,
      qdRefs: [],
      mentionedBy: docs.filter((o) => sources[o.path]?.includes(dir.replace(/\/$/, ''))).map((o) => o.path),
    });
    paths.push(dir);
  }

  const unknown = Object.keys(raw).filter((p) => !paths.includes(p));
  if (unknown.length) console.warn(`[doc-viewer] đánh giá cho tệp không tồn tại: ${unknown.join(', ')}`);

  const data = {
    builtAt: new Date().toLocaleString('vi-VN'),
    phases: (catalog.giai_doan || []).map((g) => ({ ...g, muc_dich: g.muc_dich ? renderInline(g.muc_dich, linkify) : '' })),
    external: (catalog.ngoai || []).map((x) => ({ ...x, href: toPosix(relative(OUT_DIR, join(ROOT, x.path))), mo_ta: renderInline(x.mo_ta || '', linkify) })),
    ghi_chu_chung: catalog.ghi_chu_chung ? (Array.isArray(catalog.ghi_chu_chung) ? catalog.ghi_chu_chung : [catalog.ghi_chu_chung]).map((x) => renderInline(x, linkify)) : [],
    docs: docs.map((d) => ({ ...d, source: sources[d.path], fileHref: toPosix(relative(OUT_DIR, join(ROOT, d.path))) })),
    assess,
  };

  const css = readFileSync(join(HERE, 'giao-dien', 'style.css'), 'utf8');
  const js = readFileSync(join(HERE, 'giao-dien', 'app.js'), 'utf8');
  const json = JSON.stringify(data).replace(/</g, '\\u003c');
  const html = `<!doctype html>
<html lang="vi">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Rà soát tài liệu — CLB Thám Tử Dữ Liệu</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Be+Vietnam+Pro:ital,wght@0,400;0,500;0,600;0,700;1,400&family=JetBrains+Mono:wght@400;600&display=swap">
<style>${css}</style>
</head>
<body>
<div id="app"></div>
<script id="data" type="application/json">${json}</script>
<script>${js}</script>
</body>
</html>`;
  mkdirSync(OUT_DIR, { recursive: true });
  writeFileSync(OUT_FILE, html);
  const missing = (catalog.giai_doan || []).flatMap((g) => g.tai_lieu).filter((p) => !paths.includes(p));
  console.log(`[doc-viewer] ${docs.length} tài liệu → ${toPosix(relative(ROOT, OUT_FILE))} (${Math.round(html.length / 1024)} KB, ${Date.now() - started} ms)`);
  if (missing.length) console.warn(`[doc-viewer] danh-muc.json nhắc tệp không tồn tại: ${missing.join(', ')}`);
}

build();

if (process.argv.includes('--watch')) {
  let timer = null;
  const rebuild = (why) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      try {
        build();
      } catch (e) {
        console.error('[doc-viewer] lỗi khi dựng:', e.message);
      }
    }, 250);
    void why;
  };
  const targets = [...SOURCES.map((s) => join(ROOT, s)), CATALOG_FILE, ASSESS_DIR, join(HERE, 'giao-dien')].filter(existsSync);
  for (const t of targets) {
    const isDir = statSync(t).isDirectory();
    watch(t, { recursive: isDir }, (_e, f) => {
      if (!f || String(f).includes('node_modules')) return;
      if (isDir && !/\.(md|css|js|json)$/.test(String(f))) return;
      rebuild(f);
    });
  }
  console.log('[doc-viewer] đang theo dõi thay đổi… (Ctrl+C để dừng)');
}
