/* Mockup QĐ-071 → QĐ-074: vòng chính chỉ dạy WHERE + AND/OR; FROM/SELECT khóa sẵn.
 * Dữ liệu ĐÃ SỬA theo QĐ-073 (chưa áp vào prototype/src/sql-challenge/data):
 *   lớp tòa B: KT24A, QT24B, BC24A · ngành Báo chí: BC24A (B), BC24B (C)
 *   toa_nha='B' → 3 · OR nganh='Báo chí' → 4 · AND → 1 (BC24A)
 *   ten LIKE 'H%' → 10 · AND ma_lop='BC24A' → 2 (Hiếu, Hoài) · OR → 14 (câu OR của Quân — Ban Pháp chế — ở phần Giải trình)
 *   Bẫy: Hồng (H) học BC24B → ma_lop LIKE 'BC%' ra 3; Hồ Ngọc Mai (họ đệm H) học BC24A.
 */
const SV_COLS = ['ma_sv', 'ho_dem', 'ten', 'ma_lop'];
const SV = [
  ['SV240105', 'Nguyễn Thị', 'Lan', 'TC24A'], ['SV240118', 'Hoàng Văn', 'Tuấn', 'KD24A'], ['SV240131', 'Trần Ngọc', 'Linh', 'QT24B'],
  ['SV240147', 'Lê Minh', 'Thảo', 'BC24A'], ['SV240163', 'Đặng Thu', 'Trang', 'KT24B'], ['SV240190', 'Vũ Đình', 'Phúc', 'BC24B'],
  ['SV240228', 'Phạm Minh', 'Hiếu', 'BC24A'],
  ['SV240244', 'Bùi Thị', 'Nhung', 'KD24A'], ['SV240259', 'Ngô Thanh', 'Bình', 'KT24A'], ['SV240276', 'Hồ Ngọc', 'Mai', 'BC24A'],
  ['SV240293', 'Đỗ Văn', 'Nam', 'KD24A'],
  ['SV240317', 'Lê Thị', 'Hoài', 'BC24A'],
  ['SV240325', 'Nguyễn Văn', 'Hùng', 'KT24A'], ['SV240338', 'Trần Thị', 'Hương', 'QT24B'], ['SV240341', 'Phan Thị', 'Thanh', 'BC24A'],
  ['SV240356', 'Lý Văn', 'Khoa', 'BC24A'], ['SV240362', 'Huỳnh Ngọc', 'Hạnh', 'KT24B'], ['SV240379', 'Vũ Thị', 'Huyền', 'MK24A'],
  ['SV240384', 'Dương Văn', 'Huy', 'TC24A'], ['SV240397', 'Mai Thị', 'Hồng', 'BC24B'], ['SV240402', 'Cao Văn', 'Hải', 'KD24A'],
  ['SV240415', 'Đinh Thị', 'Hân', 'KD24A'], ['SV240423', 'Lưu Văn', 'Đức', 'KT24A'], ['SV240438', 'Tạ Thị', 'Oanh', 'QT24B'],
  ['SV240446', 'Hứa Văn', 'Dũng', 'KT24A'], ['SV240451', 'Trịnh Thị', 'Yến', 'QT24B'], ['SV240469', 'Nguyễn Đức', 'Vinh', 'KT24B'],
  ['SV240477', 'Phùng Thị', 'Quỳnh', 'TC24A'], ['SV240486', 'Lê Văn', 'Long', 'BC24B'], ['SV240498', 'Trần Thị', 'Ngọc', 'KD24A'],
  ['SV240503', 'Đoàn Văn', 'Kiên', 'MK24A'], ['SV240519', 'Nguyễn Thị', 'Phương', 'KD24A'], ['SV240527', 'Bùi Văn', 'Sơn', 'KT24B'],
  ['SV240534', 'Vương Thị', 'Vân', 'BC24B'], ['SV240548', 'Lê Thị', 'Thúy', 'TC24A'], ['SV240556', 'Đặng Văn', 'Nhật', 'MK24A'],
  ['SV240561', 'Phạm Thị', 'Loan', 'KD24A'], ['SV240575', 'Trương Văn', 'Giang', 'KD24A'], ['SV240583', 'Nguyễn Thị', 'Châu', 'KT24B'],
  ['SV240594', 'Võ Văn', 'Tâm', 'BC24B'],
].map((a) => Object.fromEntries(SV_COLS.map((c, i) => [c, a[i]])));
const LOP = [
  ['KT24A', 'Kế toán', 2024, 'B'], ['KT24B', 'Kế toán', 2024, 'A'], ['QT24B', 'Quản trị kinh doanh', 2024, 'B'],
  ['BC24A', 'Báo chí', 2024, 'B'], ['BC24B', 'Báo chí', 2024, 'C'], ['TC24A', 'Tài chính – Ngân hàng', 2024, 'A'],
  ['MK24A', 'Marketing', 2024, 'A'], ['KD24A', 'Kinh doanh quốc tế', 2024, 'C'],
].map(([ma_lop, nganh, khoa_hoc, toa_nha]) => ({ ma_lop, nganh, khoa_hoc, toa_nha }));
const TABLES = { sinh_vien: { cols: SV_COLS, rows: SV }, lop_sinh_hoat: { cols: ['ma_lop', 'nganh', 'khoa_hoc', 'toa_nha'], rows: LOP } };
const OP_LABEL = { '=': 'bằng', start: 'bắt đầu bằng', contains: 'có chứa', end: 'kết thúc bằng' };

/* Dữ kiện dùng khi soát: mỗi dòng trên tờ note phải khớp. */
const FACTS = {
  boxB: { label: 'hộp góp ý giảng đường B', ok: (r) => r.toa_nha === 'B' },
  bookmark: { label: 'bookmark ngành Báo chí', ok: (r) => r.nganh === 'Báo chí' },
  h: { label: 'chữ ký "H."', ok: (r) => r.ten != null && r.ten.startsWith('H') },
  classPinned: { label: 'lớp BC24A trên tường', ok: (r) => r.ma_lop === 'BC24A' },
};
const CH = {
  c1: {
    title: 'Thử thách 1 — Lớp nào khớp cả hộp góp ý lẫn bookmark?',
    brief: 'Hộp góp ý được mở ở giảng đường B; mẩu bookmark là của ngành Báo chí. Lớp sinh hoạt nào khớp cả hai? Bảng và cột đã chọn sẵn — chỉ cần viết điều kiện lọc.',
    lock: { table: 'lop_sinh_hoat', cols: ['ma_lop', 'nganh', 'toa_nha'] }, ops: ['='], maxConds: 2, startConds: 1,
    facts: ['boxB', 'bookmark'], evTitle: 'Lớp khớp hộp góp ý và bookmark',
    note: (res) => ({ k: 'Lớp khớp cả hai', v: res.rows.map((r) => r.ma_lop).join(', '), use: true }),
    hints: ['Lớp cần tìm phải khớp CẢ hai manh mối: ở tòa B, và thuộc ngành Báo chí.',
      'Hai điều kiện: toa_nha bằng B, nganh bằng Báo chí. Phép nối nào nghĩa là "cả hai cùng lúc"?',
      "Gần như đáp án: WHERE toa_nha = 'B' AND nganh = 'Báo chí'"],
    answer: { conds: [{ col: 'toa_nha', op: '=', val: 'B' }, { col: 'nganh', op: '=', val: 'Báo chí' }], conn: 'AND' },
  },
  c2: {
    title: 'Thử thách 2 — Ai có tên bắt đầu bằng H trong lớp đó?',
    brief: 'Chữ ký ngoài phong bì là "H.", và người bỏ thư học lớp bạn vừa tìm. Những sinh viên nào khớp cả hai? Bảng và cột đã chọn sẵn.',
    lock: { table: 'sinh_vien', cols: ['ma_sv', 'ho_dem', 'ten', 'ma_lop'] }, ops: ['=', 'start', 'contains'], maxConds: 3, startConds: 0,
    facts: ['h', 'classPinned'], evTitle: 'Người tên H trong lớp BC24A',
    note: (res) => ({ k: 'Tên H · lớp trên tường', v: res.rows.length && res.rows.length <= 3 ? res.rows.map((r) => r.ten).join(', ') : `${res.rows.length} người`, use: false }),
    hints: ['Cũng như lúc tìm lớp: người cần tìm phải khớp CẢ chữ ký lẫn lớp.',
      'Hai điều kiện: ten "bắt đầu bằng" H, ma_lop bằng mã lớp trên tường. Nối bằng phép "cả hai cùng lúc".',
      "Gần như đáp án: WHERE ten LIKE 'H%' AND ma_lop = 'BC24A'"],
    answer: { conds: [{ col: 'ten', op: 'start', val: 'H' }, { col: 'ma_lop', op: '=', val: 'BC24A' }], conn: 'AND' },
  },
};

/* ======== trạng thái ======== */
const S = { cur: 'c1', pickMode: false, drafts: {}, saved: {}, pinned: {}, hintLv: {}, guide: 0, armed: null, firstDrag: true, lastDiag: null, sameDiag: 0, log: [] };
function draft() {
  if (!S.drafts[S.cur]) {
    const ch = CH[S.cur];
    S.drafts[S.cur] = { table: ch.lock.table, cols: [...ch.lock.cols], conds: Array.from({ length: ch.startConds }, () => ({ col: '', op: '=', val: '' })), conn: '', result: null, picked: null };
  }
  return S.drafts[S.cur];
}
const $ = (s) => document.querySelector(s);
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const later = (ms, f) => setTimeout(f, ms);
function fit() { const vp = $('#viewport').getBoundingClientRect(); const k = Math.min(vp.width / 1600, vp.height / 900); $('#stage').style.transform = `translate(-50%,-50%) scale(${k})`; }
addEventListener('resize', fit);

/* ======== tường note ======== */
const CLUES = [
  { id: 'h', k: 'Chữ ký ngoài phong bì', v: 'H', src: 'lá thư góp ý', color: 'var(--note-y)', r: '-3deg' },
  { id: 'b', k: 'Hộp được mở sáng nay', v: 'B', src: 'giảng đường B · bác Tư', color: 'var(--note-b)', r: '2deg' },
  { id: 'p', k: 'Nửa bookmark', v: 'Báo chí', src: 'ngành Báo chí – Truyền thông', color: 'var(--note-p)', r: '-1.5deg' },
];
function wallNotes() {
  const mine = Object.entries(S.pinned).map(([k, n], i) => ({ id: 'ev-' + k, k: n.k, v: n.v, src: n.src, mine: true, use: n.use, r: i % 2 ? '2.5deg' : '-2deg', fresh: n.fresh }));
  return [...CLUES, ...mine];
}
function renderWall() {
  $('#wall').innerHTML = wallNotes().map((n) => `<button class="note${n.mine ? ' mine' : ''}${n.fresh ? ' fresh' : ''}${S.armed === n.id ? ' armed' : ''}" data-note="${n.id}" data-val="${n.mine && !n.use ? '' : esc(n.v)}" style="${n.color ? `background:${n.color};` : ''}--r:${n.r}" aria-label="Giấy note ${esc(n.k)}: ${esc(n.v)}"><span class="k">${esc(n.k)}</span><span class="v">${esc(n.v)}</span><span class="src">— ${esc(n.src)}</span>${n.mine ? '<span class="by">bạn ghi</span>' : ''}</button>`).join('');
  Object.values(S.pinned).forEach((n) => (n.fresh = false));
}

/* kéo thả bằng pointer events; bấm (không kéo) = chọn note rồi bấm ô */
let drag = null;
document.addEventListener('pointerdown', (e) => {
  const n = e.target.closest('.note, .wnote'); if (!n) return;
  if (n.classList.contains('note') && n.dataset.val === '') return;
  if (n.classList.contains('wnote') && $('#pin').disabled) return;
  drag = { el: n, x: e.clientX, y: e.clientY, moved: false, ghost: null, isNew: n.classList.contains('wnote') };
});
document.addEventListener('pointermove', (e) => {
  if (!drag) return;
  if (!drag.moved && Math.hypot(e.clientX - drag.x, e.clientY - drag.y) < 6) return;
  if (!drag.moved) {
    drag.moved = true; const g = drag.el.cloneNode(true); g.classList.add('ghost'); g.style.width = drag.el.getBoundingClientRect().width + 'px';
    document.body.append(g); drag.ghost = g; if (drag.isNew) drag.el.style.visibility = 'hidden';
  }
  drag.ghost.style.left = e.clientX - 60 + 'px'; drag.ghost.style.top = e.clientY - 30 + 'px';
  clearHot(); const t = dropAt(e.clientX, e.clientY, drag.isNew); if (t) t.classList.add('drop-hot');
});
document.addEventListener('pointerup', (e) => {
  if (!drag) return; const d = drag; drag = null; clearHot();
  if (!d.moved) {
    if (!d.isNew) { S.armed = S.armed === d.el.dataset.note ? null : d.el.dataset.note; renderWall(); document.querySelectorAll('.slot').forEach((s) => s.classList.toggle('armed', !!S.armed)); }
    return;
  }
  d.ghost.remove(); const t = dropAt(e.clientX, e.clientY, d.isNew);
  if (d.isNew) { d.el.style.visibility = ''; if (t && t.id === 'wall') pinNote(); return; }
  if (t && t.classList.contains('slot')) fillSlot(+t.dataset.i, d.el.dataset.val);
});
function clearHot() { document.querySelectorAll('.drop-hot').forEach((s) => s.classList.remove('drop-hot')); }
function dropAt(x, y, isNew) {
  if (isNew) { const w = $('#wall').getBoundingClientRect(); return x < w.right + 40 ? $('#wall') : null; }
  const el = document.elementsFromPoint(x, y).find((el) => el.closest?.('.slot')); return el ? el.closest('.slot') : null;
}
function fillSlot(i, val) {
  const c = draft().conds[i]; if (!c) return;
  c.val = val; S.armed = null; renderWall(); renderBody();
  if (S.firstDrag && S.cur !== 'c1') say('Lấy thẳng từ tờ note thì khỏi gõ nhầm. Nhớ soát cột và phép so sánh nữa nhé.', 'smile');
  S.firstDrag = false; guideTick();
}

/* ======== truy vấn ======== */
function condSql(c) {
  const v = c.val ?? ''; const q = (x) => `<span class="s">'${esc(x)}'</span>`;
  switch (c.op) {
    case '=': return `${c.col} = ${q(v)}`;
    case 'start': return `${c.col} <span class="k">LIKE</span> ${q(v + '%')}`;
    case 'contains': return `${c.col} <span class="k">LIKE</span> ${q('%' + v + '%')}`;
    case 'end': return `${c.col} <span class="k">LIKE</span> ${q('%' + v)}`;
  }
}
const condReady = (c) => c.col && c.op && String(c.val ?? '').trim() !== '';
function sqlHtml(d) {
  let s = `<span class="k">SELECT</span> ${d.cols.join(', ')}\n<span class="k">FROM</span> ${d.table}`;
  const ready = d.conds.filter(condReady);
  if (ready.length) s += '\n<span class="k">WHERE</span> ' + ready.map((c, i) => (i ? `\n  <span class="k">${d.conn || '???'}</span> ` : '') + condSql(c)).join('');
  return s + ';';
}
function match(r, c) {
  const cell = r[c.col]; if (cell == null) return false; const x = String(cell), v = String(c.val).trim();
  switch (c.op) { case '=': return x === v; case 'start': return x.startsWith(v); case 'contains': return x.includes(v); case 'end': return x.endsWith(v); }
}
function runQuery(d) {
  const t = TABLES[d.table]; const ready = d.conds.filter(condReady);
  const rows = t.rows.filter((r) => !ready.length || (d.conn === 'OR' ? ready.some((c) => match(r, c)) : ready.every((c) => match(r, c))));
  return { cols: d.cols, rows: rows.map((r) => ({ ...r })), sql: sqlHtml(d).replace(/<[^>]+>/g, ''), table: d.table, conn: d.conn, nConds: ready.length };
}
/* Lời mô tả sau khi chạy — chỉ tả cái đang thấy, không phán đúng/sai (QĐ-071). */
function describe(d, res) {
  const n = res.rows.length; let diag, line, ex = 'neutral';
  if (!res.nConds) { diag = 'no-filter'; line = `Đây là cả bảng ${d.table}, ${n} dòng, chưa lọc gì. Như mở sheet mà chưa bật Filter.`; }
  else if (n === 0) { diag = 'zero'; line = 'Không ra dòng nào. Soát lại giá trị trong ô điều kiện xem, có sai chữ hay dư dấu cách không.'; ex = 'thinking'; }
  else { diag = 'rows-' + n + res.conn; line = `${n} dòng. Đọc lướt một lượt, thấy ổn thì ghi lại thành dữ kiện.`; }
  if (diag === S.lastDiag) S.sameDiag++; else { S.sameDiag = 1; S.lastDiag = diag; }
  if (S.sameDiag >= 3) { line += ' Ra y như lần trước rồi đấy. Cần thì bấm vào tớ.'; ex = 'thinking'; }
  return [line, ex];
}

/* ======== vẽ lòng màn hình ======== */
function renderBody() {
  if (S.cur === 'audit') return renderAudit();
  const ch = CH[S.cur], d = draft(), L = ch.lock;
  $('#ch-title').textContent = ch.title; $('#ch-brief').textContent = ch.brief;
  const cols = TABLES[d.table].cols;
  const hlKey = S.cur === 'c1' ? GUIDE_HL[S.guide] : null; const hl = (k) => (hlKey === k ? ' guide-hl' : '');
  const guided = S.cur === 'c1' && S.guide < G.DONE;
  const condsHtml = d.conds.map((c, i) => `
    ${i ? `<div class="conn">nối với điều kiện trên bằng <select data-conn class="${d.conn ? '' : 'unset'}${hl('conn')}" aria-label="Phép nối"><option value="">— chọn —</option><option ${d.conn === 'AND' ? 'selected' : ''}>AND</option><option ${d.conn === 'OR' ? 'selected' : ''}>OR</option></select><span>${d.conn === 'AND' ? 'thỏa đồng thời (cả hai)' : d.conn === 'OR' ? 'thỏa bất kỳ (một trong hai)' : ''}</span></div>` : ''}
    <div class="cond">
      <select data-f="col" data-i="${i}" aria-label="Cột" class="${hl('col' + i)}"><option value="">cột…</option>${cols.map((k) => `<option ${c.col === k ? 'selected' : ''}>${k}</option>`).join('')}</select>
      <select data-f="op" data-i="${i}" aria-label="Phép so sánh" ${ch.ops.length === 1 ? 'disabled' : ''}>${ch.ops.map((v) => `<option value="${v}" ${c.op === v ? 'selected' : ''}>${OP_LABEL[v]}</option>`).join('')}</select>
      <div class="slot${S.armed ? ' armed' : ''}${hl('val' + i)}" data-i="${i}"><input class="val" data-f="val" data-i="${i}" value="${esc(c.val ?? '')}" placeholder="kéo note vào đây" aria-label="Giá trị"></div>
      ${guided ? '<span></span>' : `<button class="x" data-del="${i}" aria-label="Xóa điều kiện">×</button>`}
    </div>`).join('');
  const res = d.result, pick = S.pickMode, connMissing = d.conds.filter(condReady).length > 1 && !d.conn;
  const canSave = pick ? res && d.picked != null : res && res.rows.length;
  const canAdd = !guided && d.conds.length < ch.maxConds;
  $('#body').innerHTML = `
  <div class="builder">
    <div class="step locked"><div class="lab"><span>1 · Lấy dữ liệu từ</span><b>FROM</b></div><div class="fixed"><span>${L.table}</span><small>🔒 chọn sẵn</small></div></div>
    <div class="step locked"><div class="lab"><span>2 · Hiện các cột</span><b>SELECT</b></div><div class="fixed">${L.cols.map((c) => `<span>${c}</span>`).join('')}<small>🔒 chọn sẵn</small></div></div>
    <div class="step focus"><div class="lab"><span>3 · Lọc dữ liệu</span><b>WHERE</b></div>
      ${condsHtml || '<div style="font-size:13px;color:var(--ink-soft);margin-bottom:6px">Chưa có điều kiện — lúc này lấy mọi dòng.</div>'}
      ${canAdd ? '<button class="add" id="add">+ Thêm điều kiện</button>' : ''}</div>
    <div class="sql" aria-label="Câu SQL tương ứng">${sqlHtml(d)}</div>
    <div class="run${hl('run')}"><button class="btn" id="run" ${connMissing ? 'disabled' : ''}>▶ Chạy truy vấn</button>
      <small>${connMissing ? 'Chọn AND hay OR giữa các điều kiện.' : ''}</small></div>
  </div>
  <div class="results">
    <div class="rhead"><h2>Kết quả truy vấn</h2><span>${res ? `${res.rows.length} dòng · ${res.table}` : 'chờ truy vấn'}</span></div>
    ${res ? (res.rows.length ? `<div class="tablewrap"><table><thead><tr>${pick ? '<th></th>' : ''}<th>#</th>${res.cols.map((c) => `<th>${c}</th>`).join('')}</tr></thead><tbody>
      ${res.rows.map((r, i) => `<tr class="${pick && d.picked === i ? 'sel' : ''}" ${pick ? `data-pick="${i}" style="cursor:pointer"` : ''}>${pick ? `<td class="pick"><input type="radio" name="pick" ${d.picked === i ? 'checked' : ''} aria-label="Chọn dòng ${i + 1}"></td>` : ''}<td class="mono">${i + 1}</td>${res.cols.map((c) => `<td class="${/^(ma_|khoa)/.test(c) ? 'mono' : ''}">${esc(r[c])}</td>`).join('')}</tr>`).join('')}
      </tbody></table></div>` : '<div class="empty">Không có dòng nào.</div>') : '<div class="empty">Chưa chạy truy vấn nào.<br>Viết điều kiện rồi bấm "Chạy truy vấn" để xem kết quả ở đây.</div>'}
    <div class="tray">
      <span class="t">${S.pinned[S.cur] ? '<b>Đã dán lên tường.</b> Chạy lại rồi ghi lại nếu muốn sửa.' : pick ? `<b>Bước tìm dữ kiện:</b> chọn đúng 1 dòng để ghi.${d.picked != null ? ` Đang chọn dòng ${d.picked + 1}.` : ''}` : 'Ghi cả kết quả thành một tờ note.'}</span>
      <button class="btn${hl('save')}" id="save" ${canSave && !(guided && S.guide < G.SAVE) ? '' : 'disabled'}>✍️ Ghi thành dữ kiện</button>
    </div>
  </div>`;
  bind();
}
function bind() {
  const d = draft(), ch = CH[S.cur];
  $('#add') && ($('#add').onclick = () => { d.conds.push({ col: '', op: ch.ops[0], val: '' }); renderBody(); });
  document.querySelectorAll('[data-f]').forEach((el) => {
    const ev = el.tagName === 'INPUT' ? 'input' : 'change';
    el.addEventListener(ev, () => { d.conds[+el.dataset.i][el.dataset.f] = el.value; if (ev === 'change') renderBody(); else $('.sql').innerHTML = sqlHtml(d); guideTick(); });
  });
  document.querySelectorAll('.slot').forEach((s) => s.addEventListener('click', () => { if (S.armed) { const n = wallNotes().find((n) => n.id === S.armed); fillSlot(+s.dataset.i, n.v); } }));
  document.querySelectorAll('[data-del]').forEach((b) => (b.onclick = () => { d.conds.splice(+b.dataset.del, 1); if (d.conds.length < 2) d.conn = ''; renderBody(); }));
  const cs = document.querySelector('[data-conn]'); if (cs) cs.onchange = (e) => { d.conn = e.target.value; renderBody(); guideTick(); };
  $('#run').onclick = () => {
    d.result = runQuery(d); d.picked = null; renderBody();
    if (S.cur === 'c1' && S.guide < G.SAVE && guideRun(d.result)) return;
    const [l, ex] = describe(d, d.result); say(l, ex);
  };
  document.querySelectorAll('[data-pick]').forEach((tr) => (tr.onclick = () => { d.picked = +tr.dataset.pick; renderBody(); }));
  $('#save').onclick = openWriter;
}

/* ======== nhân vật chính ghi note ======== */
let pending = null, typeT;
function openWriter() {
  const d = draft(), ch = CH[S.cur], r = d.result;
  const res = S.pickMode ? { ...r, rows: [r.rows[d.picked]] } : r;
  const n = ch.note(res); pending = { ...n, src: `từ bảng ${r.table}`, res };
  $('#wk').textContent = ''; $('#wv').innerHTML = ''; $('#wsrc').textContent = ''; $('#pin').disabled = true;
  $('#wcap').textContent = 'Bạn lấy một tờ note, ghi lại kết quả…'; $('#writer').hidden = false;
  const parts = [['#wk', n.k], ['#wv', n.v], ['#wsrc', '— ' + pending.src]]; let pi = 0, ci = 0; clearInterval(typeT);
  typeT = setInterval(() => {
    const [sel, txt] = parts[pi]; const el = $(sel); ci++; el.innerHTML = esc(txt.slice(0, ci)) + '<span class="caret"></span>';
    if (ci >= txt.length) {
      el.textContent = txt; pi++; ci = 0;
      if (pi >= parts.length) {
        clearInterval(typeT); $('#pin').disabled = false;
        $('#wcap').textContent = 'Kéo tờ note lên tường bên trái — hoặc bấm "Dán lên tường".';
        if (S.cur === 'c1' && S.guide === G.SAVE) { S.guide = G.PIN; say('Xong thì kéo tờ note dán lên tường, cạnh mấy manh mối kia.', 'neutral', true); }
      }
    }
  }, 38);
}
function pinNote() {
  if (!pending) return;
  S.saved[S.cur] = { rows: pending.res.rows, cols: pending.res.cols, sql: pending.res.sql, table: pending.res.table };
  S.pinned[S.cur] = { k: pending.k, v: pending.v, src: pending.src, use: pending.use, fresh: true };
  pending = null; $('#writer').hidden = true; renderWall();
  if (S.cur === 'c1' && S.guide === G.PIN) {
    S.guide = G.DONE; renderBody();
    say('Dữ kiện đầu tiên của cậu đấy. Vòng sau cậu tự làm nhé, tớ ngồi đây, cần thì gọi.', 'smile', true);
    later(1800, () => tungSay('Vòng sau cậu cứ làm, tớ ngồi uống trà cổ vũ. Không cá nữa đâu… chắc thế.', '(cười)'));
    later(6500, tungQuiet);
  } else { renderBody(); say('Dán rồi. Trước buổi giải trình tớ sẽ soát lại cả tường một lượt.', 'smile'); }
}
$('#pin').onclick = pinNote;
$('#wcancel').onclick = () => { clearInterval(typeT); pending = null; $('#writer').hidden = true; };

/* ======== Thử thách 1: Hà Vy dẫn, Tùng đoán bừa OR (QĐ-073, QĐ-074) ======== */
const G = { INTRO: 0, COL: 1, VAL: 2, RUN1: 3, TUNG: 4, VAL2: 5, RUN_OR: 6, FIX: 7, SAVE: 8, PIN: 9, DONE: 10 };
const GUIDE_HL = { 1: 'col0', 2: 'val0', 3: 'run', 5: 'val1', 6: 'run', 7: 'conn', 8: 'save' };
function guideTick() {
  if (S.cur !== 'c1') return; const d = draft(), c0 = d.conds[0], c1 = d.conds[1]; const before = S.guide;
  if (S.guide === G.COL && c0.col === 'toa_nha') { S.guide = G.VAL; say('Phép so sánh để "bằng". Giờ kéo tờ note "B" trên tường, thả vào ô giá trị.', 'neutral', true); }
  else if (S.guide === G.VAL && condReady(c0)) { S.guide = G.RUN1; say("Câu SQL bên dưới đọc là: chỉ giữ lớp có toa_nha bằng B. Bấm Chạy xem.", 'smile', true); }
  else if (S.guide === G.VAL2 && c1 && condReady(c1)) { S.guide = G.RUN_OR; say('Rồi, bấm Chạy.', 'neutral', true); }
  if (S.guide !== before) renderBody();
}
/* trả true nếu lần chạy này được kịch bản dẫn xử lý */
function guideRun(res) {
  const n = res.rows.length, ready = res.nConds;
  if ((S.guide === G.RUN1 || S.guide === G.VAL) && ready === 1 && draft().conds[0].col === 'toa_nha' && draft().conds[0].val === 'B') {
    S.guide = G.TUNG; renderBody();
    say(`${n} lớp ở tòa B: ${res.rows.map((r) => r.ma_lop).join(', ')}. Vẫn còn nhiều. Bookmark còn nói gì nữa?`, 'thinking', true);
    later(2200, () => {
      tungSay('Trà tắc tới đây! Ơ, 3 lớp à? Dễ! Tớ cá là thêm dòng nganh bằng Báo chí, nối OR vào — tòa B hoặc Báo chí, kiểu gì chả ra.', '(tự tin)');
      const d = draft(); d.conds[1] = { col: 'nganh', op: '=', val: '' }; d.conn = 'OR'; S.guide = G.VAL2; renderBody();
      later(2600, () => say('Được, thử cách của Tùng xem. Cậu kéo tờ note "Báo chí" vào ô giá trị dòng thứ hai.', 'neutral', true));
    });
    return true;
  }
  if ((S.guide === G.RUN_OR || S.guide === G.VAL2) && ready === 2 && res.conn === 'OR') {
    S.guide = G.FIX; renderBody();
    tungSay(`Ơ… ${n} lớp? Thêm manh mối mà lại ra nhiều hơn lúc nãy? Tớ cá là máy lỗi.`, '(bối rối)');
    later(2400, () => say('Đừng cá. Đếm. OR là thỏa bất kỳ: lớp nào ở tòa B, hoặc lớp nào ngành Báo chí, đều lọt vào. Mình cần lớp thỏa cả hai cùng lúc — đổi phép nối sang AND rồi chạy lại.', 'thinking', true));
    return true;
  }
  if (S.guide >= G.VAL2 && S.guide <= G.FIX && ready === 2 && res.conn === 'AND' && n === 1) {
    const fromOr = S.guide === G.FIX; S.guide = G.SAVE; renderBody();
    tungSay(fromOr ? `Một lớp: ${res.rows[0].ma_lop}! OR là "hoặc", AND là "và"… Được rồi, lần này tớ cá thua.` : 'Ơ, AND luôn à? Ừ nhỉ… phải khớp cả hai mới đúng là lớp mình tìm.', '(gãi đầu)');
    later(2400, () => say('Giờ bấm "Ghi thành dữ kiện" — tờ note này cậu tự ghi.', 'smile', true));
    return true;
  }
  return false;
}

/* ======== soát hồ sơ (đối soát nghiệp vụ) ======== */
function audit(key) {
  const sv = S.saved[key], ch = CH[key];
  if (!sv) return { status: 'bad', lines: ['Chưa có tờ note này trên tường.'] };
  const table = ch.lock.table, facts = ch.facts.map((f) => FACTS[f]), lines = [];
  for (const f of facts) {
    const bad = sv.rows.filter((r) => !f.ok(r));
    if (bad.length) { const who = bad.slice(0, 3).map((r) => (r.ten ? `${r.ho_dem} ${r.ten}` : r.ma_lop)).join(', '); lines.push(`${bad.length} dòng không khớp với dữ kiện ${f.label}: ${who}${bad.length > 3 ? '…' : ''}.`); }
  }
  const key0 = table === 'sinh_vien' ? 'ma_sv' : 'ma_lop';
  const want = TABLES[table].rows.filter((r) => facts.every((f) => f.ok(r))); const have = new Set(sv.rows.map((r) => r[key0]));
  const missing = want.filter((r) => !have.has(r[key0]));
  if (missing.length) lines.push(`Còn ${missing.length} ${table === 'sinh_vien' ? 'người' : 'lớp'} khớp đủ dữ kiện nhưng chưa có trên tờ note.`);
  return { status: lines.length ? 'bad' : 'ok', lines };
}
function renderAudit() {
  $('#ch-title').textContent = 'Soát hồ sơ trước buổi giải trình';
  $('#ch-brief').textContent = 'Hà Vy đối chiếu từng tờ note bạn đã dán với các dữ kiện gốc. Tờ nào lệch sẽ được mở lại để làm tiếp.';
  const keys = ['c1', 'c2'];
  $('#body').innerHTML = `<div class="audit" style="grid-column:1/-1">${keys.map((k) => { const sv = S.saved[k]; return `<div class="item" id="it-${k}"><h3>${CH[k].evTitle}</h3>
      <div class="meta">${sv ? `${sv.rows.length} dòng · ${esc(sv.sql)}` : '— chưa có trên tường —'}</div><div class="detail"></div><span class="st wait">Đang soát…</span></div>`; }).join('')}</div>`;
  say('Để tớ soát lại cả tường một lượt. Kiểm tra hai lần, kết luận một lần.', 'neutral', true);
  keys.forEach((k, i) => later(1100 * (i + 1), () => {
    const a = audit(k), it = $('#it-' + k); if (!it || S.cur !== 'audit') return;
    const st = it.querySelector('.st'); st.className = 'st ' + a.status; st.textContent = a.status === 'ok' ? 'Khớp dữ kiện' : 'Cần xem lại';
    if (a.status === 'bad') {
      it.querySelector('.detail').innerHTML = `<ul>${a.lines.map((l) => `<li>${esc(l)}</li>`).join('')}</ul><button class="btn ghost" data-reopen="${k}" style="margin-top:6px;padding:5px 12px;font-size:13px">Mở lại thử thách này</button>`;
      it.querySelector('[data-reopen]').onclick = () => go(k);
      say(`Khoan, đếm lại đã. Tờ "${CH[k].evTitle}": ${a.lines[0]}`, 'thinking', true);
    }
    if (i === keys.length - 1) later(400, () => { if (S.cur === 'audit' && keys.every((k) => audit(k).status === 'ok')) say('Tường khớp hết. Mình sang phòng Pháp chế được rồi.', 'smile', true); });
  }));
}

/* ======== Hà Vy ngồi cạnh (phải) · Tùng ngồi cạnh (trái) ======== */
let quietT;
const EX = { neutral: '', thinking: '(nghĩ ngợi)', smile: '(mỉm cười)' };
function say(text, ex = 'neutral', sticky = false) {
  $('#say').textContent = text; $('#ex').textContent = EX[ex] || '';
  $('#havy').classList.remove('quiet'); $('#bubble').classList.remove('hide');
  S.log.push('Hà Vy: ' + text); renderLog();
  clearTimeout(quietT);
  // Lời dẫn từng bước giữ tới bước sau; lời thường tự thu sau vài giây.
  if (!sticky) quietT = later(7000, () => { $('#bubble').classList.add('hide'); $('#havy').classList.add('quiet'); });
  resetIdle();
}
function tungSay(text, ex = '') {
  $('#tung').classList.add('on'); $('#tung').classList.remove('quiet'); $('#q-say').textContent = text; $('#q-ex').textContent = ex; $('#q-bubble').classList.remove('hide');
  S.log.push('Tùng: ' + text); renderLog();
}
/* Tùng ngồi lại nhưng thu xuống góc (thành viên CLB, QĐ-074) */
function tungQuiet() { $('#q-bubble').classList.add('hide'); if ($('#tung').classList.contains('on')) $('#tung').classList.add('quiet'); }
function renderLog() { $('#log-list').innerHTML = S.log.slice().reverse().map((t) => `<p>${esc(t)}</p>`).join(''); }
$('#bust').onclick = () => {
  if (S.cur === 'audit') return say('Đang soát, xong tớ báo.');
  const lv = (S.hintLv[S.cur] = Math.min((S.hintLv[S.cur] ?? -1) + 1, 2)); say(`Gợi ý ${lv + 1}: ${CH[S.cur].hints[lv]}`, lv ? 'thinking' : 'neutral');
};
$('#log-btn').onclick = (e) => { const l = $('#log'); l.hidden = !l.hidden; e.target.setAttribute('aria-expanded', !l.hidden); };
let idleT;
function resetIdle() { clearTimeout(idleT); idleT = later(40000, () => { if (S.cur !== 'audit' && !draft().result) say('Kẹt chỗ nào à? Nhìn lại mấy tờ note trên tường xem, manh mối nằm cả ở đó.', 'thinking'); }); }
['pointerdown', 'keydown'].forEach((t) => addEventListener(t, resetIdle));

/* ======== điều hướng mockup ======== */
function go(k) {
  S.cur = k; S.armed = null;
  document.querySelectorAll('[data-go]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.go === k));
  tungQuiet();
  renderWall(); renderBody();
  if (k === 'c1' && S.guide === G.INTRO) {
    say('Hộp góp ý với bookmark đều chỉ về một lớp. Bảng và cột tớ chọn sẵn rồi, cậu chỉ lo hàng WHERE thôi.', 'smile', true);
    later(3500, () => { if (S.cur === 'c1' && S.guide === G.INTRO) { S.guide = G.COL; renderBody(); say('WHERE là bộ lọc, như nút Filter trong Excel. Bắt đầu từ hộp góp ý: ô đầu tiên chọn cột toa_nha.', 'neutral', true); } });
  }
  if (k === 'c2' && !S.drafts.c2?.result) say('Vòng này cậu tự làm: tìm người tên bắt đầu bằng H trong lớp trên tường. Hai tờ note là đủ, nhớ chọn phép nối cho đúng ý.', 'smile');
}
document.querySelectorAll('[data-go]').forEach((b) => (b.onclick = () => go(b.dataset.go)));
$('#toggle-pick').onclick = (e) => { S.pickMode = !S.pickMode; e.target.setAttribute('aria-pressed', S.pickMode); if (S.cur !== 'audit') renderBody(); };
$('#autofill').onclick = () => {
  if (S.cur === 'audit') return; const a = CH[S.cur].answer, d = draft();
  d.conds = a.conds.map((c) => ({ ...c })); d.conn = a.conn || ''; d.result = null; d.picked = null;
  if (S.cur === 'c1' && S.guide < G.FIX) { S.guide = G.FIX; $('#tung').classList.add('on'); }
  renderBody();
};
$('#reset').onclick = () => location.reload();

fit(); renderWall(); go('c1');
