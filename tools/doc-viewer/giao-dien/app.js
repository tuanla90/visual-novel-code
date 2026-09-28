(() => {
  const DATA = JSON.parse(document.getElementById('data').textContent);
  const DOCS = new Map(DATA.docs.map((d) => [d.path, d]));
  const STATUS = {
    'hieu-luc': 'Đang hiệu lực',
    'mot-phan-loi-thoi': 'Một phần lỗi thời',
    'de-xuat-chua-duyet': 'Đề xuất, chưa duyệt',
    'da-bi-thay': 'Đã bị thay',
    'lich-su': 'Lịch sử',
  };
  const PRIORITY = { cao: 'Ưu tiên cao', trung: 'Ưu tiên vừa', thap: 'Ưu tiên thấp' };
  const IMPACT = [
    ['tai_lieu', 'Tài liệu khác', 'ic-doc', 'T'],
    ['quyet_dinh', 'Quyết định', 'ic-qd', 'Q'],
    ['gameplay', 'Gameplay', 'ic-game', 'G'],
    ['workload', 'Workload', 'ic-work', 'W'],
  ];

  // ---------- Thứ tự đọc ----------
  const ORDER = [];
  for (const g of DATA.phases) for (const p of g.tai_lieu) if (DOCS.has(p) && !ORDER.includes(p)) ORDER.push(p);
  const UNLISTED = DATA.docs.map((d) => d.path).filter((p) => !ORDER.includes(p));
  const SEQ = [...ORDER, ...UNLISTED];
  const numberOf = (p) => SEQ.indexOf(p) + 1;

  // ---------- Lưu trạng thái cá nhân (chỉ trong trình duyệt này) ----------
  const KEY = 'ra-soat-tai-lieu:v1';
  let state = { read: {}, checks: {}, notes: {}, theme: 'auto' };
  try {
    const saved = JSON.parse(localStorage.getItem(KEY) || 'null');
    if (saved) state = { ...state, ...saved };
  } catch { /* chế độ riêng tư: chạy không lưu */ }
  const save = () => {
    try { localStorage.setItem(KEY, JSON.stringify(state)); } catch { /* bỏ qua */ }
  };
  const applyTheme = () => {
    if (state.theme === 'auto') document.documentElement.removeAttribute('data-theme');
    else document.documentElement.setAttribute('data-theme', state.theme);
  };
  applyTheme();

  const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const fold = (s) => Array.from(s, (c) => {
    const f = c.normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D').toLowerCase();
    return f[0] ?? c;
  }).join('');
  const minutes = (p) => (DATA.assess[p] && Number(DATA.assess[p].thoi_gian_doc_phut)) || 0;
  // Bỏ tiền tố tên game lặp lại ở đầu nhiều tài liệu cho danh sách gọn.
  const titleOf = (p) => (DOCS.get(p)?.title ?? p).replace(/^CLB Thám Tử Dữ Liệu\s*[—–-]\s*/, '');
  const statusBadge = (s) => (s ? `<span class="badge st-${esc(s)}">${esc(STATUS[s] || s)}</span>` : '');
  const prioBadge = (s) => (s ? `<span class="badge pr-${esc(s)}">${esc(PRIORITY[s] || s)}</span>` : '');

  const app = document.getElementById('app');

  // ---------- Thanh bên ----------
  function sidebar(active) {
    const done = SEQ.filter((p) => state.read[p]).length;
    const item = (p) => `<a class="side-item${p === active ? ' active' : ''}${state.read[p] ? ' done' : ''}" href="#${esc(p)}">
        <span class="num">${state.read[p] ? '✓' : numberOf(p)}</span>
        <span class="t">${esc(titleOf(p))}<span class="p">${esc(p)}</span></span></a>`;
    let html = `<a class="brand" href="#">Rà soát tài liệu</a>
      <div class="brand-sub">CLB Thám Tử Dữ Liệu · dựng ${esc(DATA.builtAt)}</div>
      <div class="progress"><div class="progress-bar"><span style="width:${(100 * done) / SEQ.length}%"></span></div>
      <div class="progress-text">Đã đọc ${done}/${SEQ.length} tài liệu</div></div>
      <input class="search" id="q" type="search" placeholder="Tìm trong mọi tài liệu…" value="${esc(currentQuery())}">`;
    for (const g of DATA.phases) {
      const items = g.tai_lieu.filter((p) => DOCS.has(p));
      if (!items.length) continue;
      html += `<div class="side-group">${esc(g.ten)}</div>` + items.map(item).join('');
    }
    if (UNLISTED.length) html += `<div class="side-group">Khác (chưa xếp)</div>` + UNLISTED.map(item).join('');
    html += `<div class="side-tools">
      <button class="btn primary" data-act="export">Xuất ghi chú</button>
      <button class="btn" data-act="theme">Giao diện: ${{ auto: 'tự động', light: 'sáng', dark: 'tối' }[state.theme]}</button>
    </div>`;
    return html;
  }

  // ---------- Trang chủ ----------
  function home() {
    const total = ORDER.reduce((n, p) => n + minutes(p), 0);
    const row = (p) => {
      const a = DATA.assess[p] || {};
      return `<a class="row${state.read[p] ? ' done' : ''}" href="#${esc(p)}">
        <span class="num">${state.read[p] ? '✓' : numberOf(p)}</span>
        <span><span class="rt">${esc(titleOf(p))}</span> <span class="rp">${esc(p)}</span>
          ${a.vai_tro ? `<div class="rr">${a.vai_tro}</div>` : ''}</span>
        <span class="rm">${statusBadge(a.trang_thai)}${prioBadge(a.muc_uu_tien_doc)}${a.thoi_gian_doc_phut ? `<span>~${esc(a.thoi_gian_doc_phut)} phút</span>` : ''}</span>
      </a>`;
    };
    let html = `<div class="hero"><h1>Thứ tự đọc để rà soát tài liệu</h1>
      <p>${ORDER.length} tài liệu theo thứ tự đề xuất, tổng khoảng <b>${Math.round(total / 6) / 10} giờ</b> đọc. Mỗi tài liệu có thẻ đánh giá tác động
      tới tài liệu khác, quyết định, gameplay và workload; danh sách "Cần rà khi đọc" để đánh dấu; ô ghi chú riêng.
      Đánh dấu và ghi chú chỉ lưu trong trình duyệt này; bấm <b>Xuất ghi chú</b> để lấy tệp Markdown.</p>
      <div class="legend">${Object.keys(STATUS).map(statusBadge).join('')}</div></div>`;
    if (DATA.ghi_chu_chung.length) html += `<div class="card" style="margin-top:20px"><h2>Trước khi đọc</h2><ul>${DATA.ghi_chu_chung.map((x) => `<li>${x}</li>`).join('')}</ul></div>`;
    for (const g of DATA.phases) {
      const items = g.tai_lieu.filter((p) => DOCS.has(p));
      const mins = items.reduce((n, p) => n + minutes(p), 0);
      html += `<section class="phase"><h2>${esc(g.ten)}${mins ? ` <small style="color:var(--faint);font-weight:500">· ~${mins} phút</small>` : ''}</h2>
        ${g.muc_dich ? `<p class="goal">${g.muc_dich}</p>` : ''}${items.map(row).join('')}</section>`;
    }
    if (DATA.external.length) {
      html += `<section class="phase"><h2>Tệp HTML (mở riêng)</h2>` + DATA.external.map((x) => `<a class="row" href="${esc(x.href)}" target="_blank" rel="noopener">
        <span class="num">↗</span><span><span class="rt">${esc(x.ten)}</span> <span class="rp">${esc(x.path)}</span><div class="rr">${x.mo_ta}</div></span><span></span></a>`).join('') + '</section>';
    }
    if (UNLISTED.length) html += `<section class="phase"><h2>Khác (chưa xếp thứ tự)</h2>${UNLISTED.map(row).join('')}</section>`;
    return `<div class="page wide"><div class="content">${html}</div></div>`;
  }

  // ---------- Trang tài liệu ----------
  let tab = 'read';
  function docPage(p) {
    const d = DOCS.get(p);
    const a = DATA.assess[p];
    const i = SEQ.indexOf(p);
    const list = (arr) => (arr && arr.length ? `<ul>${arr.map((x) => `<li>${x}</li>`).join('')}</ul>` : '<div class="empty">Không có.</div>');
    let html = `<div class="crumb"><code>${esc(p)}</code><span>${d.lineCount} dòng</span>
        <a href="${esc(d.fileHref)}" target="_blank" rel="noopener">Mở tệp gốc ↗</a></div>
      <h1 class="doc-title">${esc(d.title)}</h1>
      <div class="meta">${a ? statusBadge(a.trang_thai) + prioBadge(a.muc_uu_tien_doc) : '<span class="badge st-none">Chưa đánh giá</span>'}
        ${a?.thoi_gian_doc_phut ? `<span>~${esc(a.thoi_gian_doc_phut)} phút đọc</span>` : ''}
        <label class="readmark"><input type="checkbox" data-act="read" ${state.read[p] ? 'checked' : ''}> Đã đọc xong</label></div>`;

    if (a) {
      html += `<div class="card"><h2>Tài liệu này là gì</h2>
        ${a.vai_tro ? `<p class="role">${a.vai_tro}</p>` : ''}
        ${a.trang_thai_giai_thich ? `<p class="why"><b>Trạng thái:</b> ${a.trang_thai_giai_thich}</p>` : ''}
        ${a.tom_tat?.length ? `<h3>Ý chính</h3>${list(a.tom_tat)}` : ''}</div>`;
      if (a.tac_dong) {
        html += `<div class="card"><h2>Đánh giá tác động — sửa tài liệu này thì ảnh hưởng tới đâu</h2><div class="impact">${IMPACT.map(([k, label, cls, ic]) => `<div><h3><span class="ic ${cls}">${ic}</span>${label}</h3>${list(a.tac_dong[k])}</div>`).join('')}</div></div>`;
      }
      if (a.can_ra_khi_doc?.length) {
        const checks = state.checks[p] || {};
        html += `<div class="card"><h2>Cần rà khi đọc <small style="color:var(--faint);font-weight:500">(${Object.values(checks).filter(Boolean).length}/${a.can_ra_khi_doc.length} đã xem)</small></h2>
          <ul class="checklist">${a.can_ra_khi_doc.map((x, k) => `<li class="${checks[k] ? 'checked' : ''}"><input type="checkbox" data-act="check" data-k="${k}" ${checks[k] ? 'checked' : ''}><span>${x}</span></li>`).join('')}</ul></div>`;
      }
      const extra = [['chuoi_thay_the', 'Chuỗi quyết định bị thay'], ['viec_con_treo', 'Việc còn treo theo các quyết định']].filter(([k]) => a[k]?.length);
      for (const [k, label] of extra) html += `<details class="card"><summary>${label} (${a[k].length})</summary>${list(a[k])}</details>`;
    }

    html += `<details class="card"><summary>Tự động: liên kết với tài liệu khác</summary>
      <h3>Được nhắc tới trong (${d.mentionedBy.length})</h3>
      <div class="auto">${d.mentionedBy.length ? d.mentionedBy.map((x) => `<a href="#${esc(x)}">${esc(x)}</a>`).join(' ') : '<span class="empty">Không tài liệu nào nhắc tên tệp này.</span>'}</div>
      <h3>Quyết định được nhắc trong tài liệu (${d.qdRefs.length})</h3>
      <div class="chips">${d.qdRefs.map((n) => `<a class="chip" href="#docs/lich-su-quyet-dinh.md@qd-${n}">QĐ-${n}</a>`).join('') || '<span class="empty">Không có.</span>'}</div></details>`;

    html += `<div class="card notes-card"><h2>Ghi chú rà soát của bạn</h2>
      <textarea class="notes" data-act="note" placeholder="Chỗ sai, chỗ mâu thuẫn, câu hỏi cần chốt… (tự lưu)">${esc(state.notes[p] || '')}</textarea></div>`;

    html += `<div class="tabs"><button class="tab${tab === 'read' ? ' on' : ''}" data-act="tab" data-tab="read">Bản đọc</button>
      <button class="tab${tab === 'src' ? ' on' : ''}" data-act="tab" data-tab="src">Nguồn (có số dòng)</button></div>`;
    html += tab === 'read' ? `<article class="md">${d.html}</article>` : sourceView(d);

    const prev = SEQ[i - 1];
    const next = SEQ[i + 1];
    html += `<nav class="pager">${prev ? `<a href="#${esc(prev)}"><small>← Trước (${numberOf(prev)})</small>${esc(titleOf(prev))}</a>` : '<span></span>'}
      ${next ? `<a href="#${esc(next)}" style="text-align:right"><small>Tiếp theo (${numberOf(next)}) →</small>${esc(titleOf(next))}</a>` : ''}</nav>`;

    const toc = d.toc.length ? `<aside class="toc"><div class="toc-title">Trong tài liệu</div>${d.toc.map((t) => `<a class="d${t.depth}" href="#${esc(p)}@${esc(t.slug)}">${esc(t.text)}</a>`).join('')}</aside>` : '<aside></aside>';
    return `<div class="page"><div class="content">${html}</div>${toc}</div>`;
  }

  function sourceView(d) {
    const lines = d.source.split('\n');
    return `<div class="src">${lines.map((l, k) => `<div class="srow" id="L${k + 1}"><span class="ln"><a href="#${esc(d.path)}@L${k + 1}">${k + 1}</a></span><span class="tx">${esc(l) || ' '}</span></div>`).join('')}</div>`;
  }

  // ---------- Tìm kiếm ----------
  function currentQuery() {
    const h = decodeURIComponent(location.hash.slice(1));
    return h.startsWith('?q=') ? h.slice(3) : '';
  }
  function searchPage(q) {
    // Gõ có dấu thì tìm đúng dấu ("Hoài" không khớp "thoại"); gõ không dấu thì bỏ qua dấu.
    const exact = fold(q) !== q.toLowerCase();
    const norm = exact ? (s) => s.toLowerCase() : fold;
    const nq = norm(q.trim());
    if (nq.length < 2) return `<div class="page wide"><div class="content"><h1>Tìm kiếm</h1><p class="empty">Gõ ít nhất 2 ký tự.</p></div></div>`;
    let count = 0;
    let html = '';
    for (const p of SEQ) {
      const d = DOCS.get(p);
      const hits = [];
      d.source.split('\n').forEach((line, k) => {
        const f = norm(line);
        const at = f.indexOf(nq);
        if (at < 0) return;
        const from = Math.max(0, at - 70);
        const snippet = (from ? '…' : '') + esc(line.slice(from, at)) + '<mark>' + esc(line.slice(at, at + nq.length)) + '</mark>' + esc(line.slice(at + nq.length, at + nq.length + 110));
        hits.push(`<a class="res" href="#${esc(p)}@L${k + 1}"><small>dòng ${k + 1}</small> ${snippet}</a>`);
      });
      if (!hits.length) continue;
      count += hits.length;
      html += `<h3>${esc(d.title)} <small style="color:var(--faint);font-weight:400">${esc(p)} · ${hits.length}</small></h3>${hits.slice(0, 60).join('')}${hits.length > 60 ? `<p class="empty">… và ${hits.length - 60} kết quả nữa</p>` : ''}`;
    }
    return `<div class="page wide"><div class="content results"><h1>Tìm “${esc(q)}”</h1><p class="auto">${count} dòng khớp (${exact ? 'đúng dấu' : 'không phân biệt dấu'}, không phân biệt hoa/thường).</p>${html}</div></div>`;
  }

  // ---------- Điều hướng ----------
  function parseHash() {
    const h = decodeURIComponent(location.hash.slice(1));
    if (!h) return { view: 'home' };
    if (h.startsWith('?q=')) return { view: 'search', q: h.slice(3) };
    const at = h.indexOf('@');
    const path = at < 0 ? h : h.slice(0, at);
    const anchor = at < 0 ? '' : h.slice(at + 1);
    return DOCS.has(path) ? { view: 'doc', path, anchor } : { view: 'home' };
  }

  let lastPath = null;
  function render() {
    const r = parseHash();
    if (r.view === 'doc' && r.path !== lastPath) tab = 'read';
    if (r.view === 'doc' && /^L\d+$/.test(r.anchor) && tab === 'src') { /* giữ tab nguồn khi bấm số dòng */ }
    const main = r.view === 'doc' ? docPage(r.path) : r.view === 'search' ? searchPage(r.q) : home();
    app.innerHTML = `<div class="layout"><aside class="side">${sidebar(r.path)}</aside>
      <main class="main"><button class="btn menu-btn" data-act="menu">☰ Mục lục</button>${main}</main></div>`;
    document.body.classList.remove('side-open');
    const samePage = r.view === 'doc' && r.path === lastPath;
    lastPath = r.view === 'doc' ? r.path : null;
    requestAnimationFrame(() => {
      if (r.view === 'doc' && r.anchor) jump(r.anchor);
      else if (!samePage) window.scrollTo(0, 0);
      const q = document.getElementById('q');
      if (r.view === 'search' && q) { q.focus(); q.setSelectionRange(q.value.length, q.value.length); }
      const act = document.querySelector('.side-item.active');
      if (act) act.scrollIntoView({ block: 'nearest' });
    });
  }

  function flash(el) {
    el.classList.add('flash');
    setTimeout(() => el.classList.remove('flash'), 1600);
  }
  function jump(anchor) {
    if (/^L\d+$/.test(anchor)) {
      const line = Number(anchor.slice(1));
      if (tab === 'src') {
        const row = document.getElementById(anchor);
        if (row) { row.scrollIntoView({ block: 'center' }); flash(row); }
        return;
      }
      let target = null;
      for (const b of document.querySelectorAll('.md .blk')) {
        if (Number(b.dataset.l) <= line) target = b;
        else break;
      }
      if (target) { target.scrollIntoView({ block: 'start' }); flash(target); }
      return;
    }
    const el = document.getElementById(anchor);
    if (el) { el.scrollIntoView({ block: 'start' }); if (el.classList.contains('blk')) flash(el); }
  }

  // ---------- Xuất ghi chú ----------
  function exportNotes() {
    const today = new Date().toISOString().slice(0, 10);
    let md = `# Ghi chú rà soát tài liệu — ${today}\n\nĐã đọc ${SEQ.filter((p) => state.read[p]).length}/${SEQ.length} tài liệu.\n`;
    for (const p of SEQ) {
      const note = (state.notes[p] || '').trim();
      const a = DATA.assess[p];
      const checked = a?.can_ra_khi_doc ? a.can_ra_khi_doc.filter((_, k) => state.checks[p]?.[k]) : [];
      if (!note && !state.read[p] && !checked.length) continue;
      md += `\n## ${numberOf(p)}. ${titleOf(p)}\n\n\`${p}\` · ${state.read[p] ? 'đã đọc' : 'chưa đọc xong'}\n`;
      if (checked.length) {
        const plain = (h) => { const t = document.createElement('div'); t.innerHTML = h; return t.textContent; };
        md += `\nĐã xem các điểm cần rà:\n${checked.map((x) => `- [x] ${plain(x)}`).join('\n')}\n`;
      }
      if (note) md += `\n${note}\n`;
    }
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = Object.assign(document.createElement('a'), { href: url, download: `ghi-chu-ra-soat-${today}.md` });
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  // ---------- Sự kiện ----------
  let searchTimer = null;
  app.addEventListener('input', (e) => {
    const t = e.target;
    if (t.id === 'q') {
      clearTimeout(searchTimer);
      searchTimer = setTimeout(() => {
        const v = t.value.trim();
        location.hash = v ? '?q=' + encodeURIComponent(v) : '';
      }, 350);
    } else if (t.dataset.act === 'note') {
      const p = parseHash().path;
      state.notes[p] = t.value;
      save();
    }
  });
  app.addEventListener('change', (e) => {
    const t = e.target;
    const p = parseHash().path;
    if (t.dataset.act === 'read') { state.read[p] = t.checked; save(); render(); }
    if (t.dataset.act === 'check') {
      state.checks[p] = { ...(state.checks[p] || {}), [t.dataset.k]: t.checked };
      save();
      t.closest('li').classList.toggle('checked', t.checked);
    }
  });
  app.addEventListener('click', (e) => {
    const t = e.target.closest('[data-act]');
    if (!t) return;
    const act = t.dataset.act;
    if (act === 'tab') { tab = t.dataset.tab; const y = window.scrollY; render(); requestAnimationFrame(() => window.scrollTo(0, y)); }
    if (act === 'export') exportNotes();
    if (act === 'theme') { state.theme = { auto: 'light', light: 'dark', dark: 'auto' }[state.theme]; save(); applyTheme(); render(); }
    if (act === 'menu') document.body.classList.toggle('side-open');
  });
  // Bấm số dòng trong tab nguồn: giữ tab nguồn.
  window.addEventListener('hashchange', render);
  render();
})();
