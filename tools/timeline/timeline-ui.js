const DATA = JSON.parse(document.getElementById('timeline-data').textContent);
const el = (id) => document.getElementById(id);
const esc = (value = '') => String(value).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const href = (file) => '../../' + file.split('/').map(encodeURIComponent).join('/');
const link = (file, label = file) => '<a href="' + esc(href(file)) + '">' + esc(label) + '</a>';
const day = (date) => date ? new Intl.DateTimeFormat('vi-VN', { day: '2-digit', month: '2-digit', year: 'numeric', timeZone: 'UTC' }).format(new Date(date + 'T12:00:00Z')) : 'Chưa khai ngày';
const weekday = (date) => date ? new Intl.DateTimeFormat('vi-VN', { weekday: 'long', timeZone: 'UTC' }).format(new Date(date + 'T12:00:00Z')) : '';
const dateWithDay = (date) => date ? day(date) + ' · ' + weekday(date) : 'Chưa khai ngày';
const caseById = new Map(DATA.cases.map((c) => [c.id, c]));
const eventById = new Map(DATA.events.map((e) => [e.id, e]));
const trackNames = { main: 'Nhiệm vụ chính', side: 'Nhiệm vụ phụ', relationship: 'Tùng – Hoài', hidden: 'Tuyến ẩn', evidence: 'Chứng cứ quan trọng', event: 'Sự kiện học kỳ' };
const sources = [{ id: 'canon', name: 'Lịch đang dùng trong game' }, { id: 'proposal', name: 'Lịch đề xuất / khoảng ngày' }];
const months = [...new Set(DATA.events.flatMap((e) => {
  if (!e.date) return ['undated'];
  const result = [];
  let m = e.date.slice(0, 7);
  const end = (e.end ?? e.date).slice(0, 7);
  while (m <= end) { result.push(m); const [y, n] = m.split('-').map(Number); m = new Date(Date.UTC(y, n, 1)).toISOString().slice(0, 7); }
  return result;
}))].sort();
const monthName = (month) => month === 'undated' ? 'Chưa chốt ngày' : 'Tháng ' + Number(month.slice(5)) + ' / ' + month.slice(0, 4);
const state = { sources: new Set(['canon']), tracks: new Set(Object.keys(trackNames)), months: new Set(months), cases: new Set(DATA.cases.map((c) => c.id)), query: '', group: 'case', view: 'events' };
const fields = [
  { id: 'sources', label: 'Lịch muốn xem', options: sources },
  { id: 'tracks', label: 'Tuyến / loại mốc', options: Object.entries(trackNames).map(([id, name]) => ({ id, name })) },
  { id: 'months', label: 'Tháng', options: months.map((id) => ({ id, name: monthName(id) })) },
  { id: 'cases', label: 'Vụ / nhiệm vụ', options: DATA.cases.map((c) => ({ id: c.id, name: c.title })) },
];
function renderFilters() {
  el('filter-fields').innerHTML = fields.map((f) => '<fieldset class="filter-set"><legend><span>' + esc(f.label) + '</span><button class="text-button" data-all="' + f.id + '" aria-label="Chọn tất cả ' + esc(f.label) + '">Tất cả</button></legend><div class="filter-options">' + f.options.map((o) => '<label class="filter-choice"><input type="checkbox" data-filter="' + f.id + '" value="' + esc(o.id) + '"' + (state[f.id].has(o.id) ? ' checked' : '') + '><span>' + esc(o.name) + '</span></label>').join('') + '</div></fieldset>').join('');
}
function sourceFits(source) { return state.sources.size > 0 && (source === 'shared' || state.sources.has(source)); }
function monthFits(date, end) {
  if (!date) return state.months.has('undated');
  const from = date.slice(0, 7), to = (end ?? date).slice(0, 7);
  return [...state.months].some((m) => m !== 'undated' && m >= from && m <= to);
}
function fits(e) {
  const unchanged = e.sourceType === 'canon' && state.sources.has('proposal') && e.caseIds.every((id) => !caseById.get(id)?.proposedDate) && (e.kind === 'story' || e.kind === 'hidden');
  return (sourceFits(e.sourceType) || unchanged) && e.tracks.some((t) => state.tracks.has(t)) && e.caseIds.some((c) => state.cases.has(c)) && monthFits(e.date, e.end) && (!state.query || [e.title, e.summary, e.condition, e.date, JSON.stringify(e.records ?? [])].join(' ').toLocaleLowerCase('vi').includes(state.query));
}
function tableMarkup(records) {
  const groups = new Map();
  records.forEach(({ table, record }) => groups.set(table, [...(groups.get(table) ?? []), record]));
  return [...groups].map(([name, rows]) => {
    const columns = [...new Set(rows.flatMap((row) => Object.keys(row)))];
    return '<div class="related-table"><h4>' + esc(name) + '</h4><div class="table-wrap"><table><thead><tr>' + columns.map((k) => '<th scope="col">' + esc(k) + '</th>').join('') + '</tr></thead><tbody>' + rows.map((row) => '<tr>' + columns.map((k) => '<td>' + esc(row[k] ?? '') + '</td>').join('') + '</tr>').join('') + '</tbody></table></div></div>';
  }).join('');
}
function usages(e) {
  return e.caseIds.flatMap((id) => {
    const c = caseById.get(id);
    if (!c) return [];
    const canonDate = e.positions?.[id]?.date ?? c.date;
    const list = [];
    if (state.sources.has('canon')) list.push({ title: c.title, date: canonDate, source: 'Trong game', position: e.positions?.[id]?.title });
    if (state.sources.has('proposal')) {
      const date = c.proposedDate ?? canonDate;
      if (!state.sources.has('canon') || date !== canonDate) list.push({ title: c.title, date, end: c.proposedEnd, source: c.proposedDate ? 'Đề xuất' : 'Giữ lịch game', position: e.positions?.[id]?.title });
    }
    return list;
  });
}
function relatedMarkup(c) {
  if (!c?.relatedCount) return '';
  return '<details class="linked"><summary>Sự kiện liên đới · ' + c.relatedCount + ' bản ghi được gộp</summary><p>Các dòng nền, dữ kiện đối chiếu và bảng chưa có ngày vẫn nằm trong nguồn. Chúng không tạo mốc độc lập trên timeline.</p>' + c.related.map((t) => '<details class="related-table"><summary>' + esc(t.table) + ' · ' + t.count + ' dòng · ' + (t.from ? day(t.from) + (t.to !== t.from ? ' → ' + day(t.to) : '') : 'không khai ngày') + '</summary>' + tableMarkup(t.rows.map((record) => ({ table: t.table, record }))) + '</details>').join('') + '</details>';
}
function evidenceFor(e) {
  if (e.kind !== 'story' && e.kind !== 'window') return [];
  const c = caseById.get(e.caseIds[0]);
  const list = (c?.evidenceIds ?? []).map((id) => eventById.get(id));
  if (c?.id === 'vu1' && e.chain && e.chain !== 'hop-00') return list.filter((x) => x.positions?.vu1?.date === e.date);
  return list;
}
function dateMarkup(e) {
  if (!e.date) return 'Chưa khai ngày<small>' + esc(e.dateLabel ?? 'Cần chốt trước khi xếp lịch') + '</small>';
  const dates = day(e.date) + (e.end ? ' → ' + day(e.end) : '') + (e.time ? ' · ' + e.time + (e.timeEnd ? '–' + e.timeEnd : '') : '');
  return esc(dates) + '<small>' + esc(e.end ? 'Khoảng ngày' : weekday(e.date)) + '</small><small>' + esc(e.dateLabel ?? '') + '</small>';
}
function eventMarkup(e, groupId) {
  const requirements = evidenceFor(e);
  const useList = e.kind === 'evidence' ? usages(e) : [];
  const c = caseById.get(e.caseIds[0]);
  const calendarNotes = (DATA.calendarNotes ?? []).filter((n) => e.date && n.date >= e.date && n.date <= (e.end ?? e.date));
  const summary = e.kind === 'evidence' ? e.summary : e.kind === 'hidden' ? e.condition : e.unlockAfter ? 'Kích hoạt sau khi hoàn thành ' + caseById.get(e.unlockAfter)?.title + (e.sourceType === 'proposal' && e.kind === 'window' ? ', trong khoảng đề xuất.' : '.') : e.summary;
  const tagNames = e.tracks.map((t) => '<span class="tag ' + t + '">' + esc(trackNames[t]) + '</span>').join('') + calendarNotes.map((n) => '<span class="tag">' + esc(n.title) + '</span>').join('');
  const detail = '<div class="event-detail">' +
    (e.summary ? '<div class="detail-block"><h4>Vì sao giữ mốc này</h4><p>' + esc(e.summary) + '</p></div>' : '') +
    (calendarNotes.length ? '<div class="detail-block"><h4>Bối cảnh ngày đặc biệt</h4>' + calendarNotes.map((n) => '<p><strong>' + esc(dateWithDay(n.date)) + ' · ' + esc(n.title) + '</strong><br>' + esc(n.note) + (n.source ? ' <a href="' + esc(n.source) + '">Tham chiếu lịch</a>' : '') + '</p>').join('') + '</div>' : '') +
    (e.condition ? '<div class="detail-block"><h4>Điều kiện kích hoạt / đi đến cảnh</h4><p>' + esc(e.condition) + '</p>' + (e.sourceType === 'proposal' ? '<p>Điều kiện này đang ở bản đề xuất, chưa được game thi hành.</p>' : e.kind === 'hidden' ? '<p>Đây là nhánh bên trong vụ; chưa có cửa sổ ngày độc lập.</p>' : '') + '</div>' : '') +
    (requirements.length ? '<div class="detail-block"><h4>Chứng cứ cần có trước lúc dùng</h4><ul class="dependency-list">' + requirements.map((x) => '<li><strong>' + esc(x.title) + '</strong><br>Phát sinh: ' + esc(dateWithDay(x.date)) + (x.time ? ' · ' + esc(x.time) : '') + ' → dùng trong cảnh này: ' + esc(day(e.date)) + (e.end ? ' – ' + esc(day(e.end)) : '') + (x.dateRole === 'scheduled' ? '<br>Ngày của lịch đặt trước; không được hiểu là giờ tạo log.' : !x.date ? '<br>Thiếu ngày phát sinh — cần bổ sung ở dữ liệu gốc.' : '') + '</li>').join('') + '</ul></div>' : '') +
    (useList.length ? '<div class="detail-block"><h4>Liên đới với các cảnh đọc chứng cứ</h4>' + useList.map((u) => '<div class="relationship-line"><span class="node">Phát sinh ' + esc(day(e.date)) + '</span><span class="arrow">→</span><span class="node">' + esc(u.title) + ' · ' + esc(day(u.date)) + (u.end ? ' – ' + esc(day(u.end)) : '') + ' (' + esc(u.source) + ')</span></div>' + (u.position ? '<p>Cảnh đọc: ' + esc(u.position) + '.</p>' : '')).join('') + '</div>' : '') +
    (e.comparisons?.length ? '<div class="detail-block"><h4>Thứ tự cần giữ khi dời lịch</h4>' + e.comparisons.map((x) => '<p>' + esc(day(e.date)) + ' → ' + esc(day(x.date)) + ': ' + esc(x.note) + '</p>').join('') + '</div>' : '') +
    (e.records?.length ? '<div class="detail-block"><h4>Bản ghi quyết định · đọc từ dữ liệu chuẩn</h4>' + tableMarkup(e.records) + '</div>' : '') +
    (e.sourceType === 'canon' && e.tracks.includes('side') ? '<div class="detail-block"><h4>Ngày bối cảnh và ngày mở khóa</h4><p>Ngày ' + esc(day(e.date)) + ' là ngày ghi trong truyện. Game mở việc theo cờ hoàn thành ' + esc(e.unlockAfter) + ', không kiểm tra hôm nay có tới ngày này hay chưa; không có hạn hết hiệu lực.</p></div>' : '') +
    (e.flashback ? '<div class="detail-block"><h4>Hồi tưởng</h4><p>Ngày ở đây là ngày sự việc xảy ra. Cảnh người chơi xem nằm ở đầu Vụ 2; hai mốc không đồng nhất.</p></div>' : '') +
    '<div class="source-links">' + (e.source ? link(e.source, 'Nguồn: ' + e.source.split('/').at(-1)) : '') + (e.script ? link(e.script, 'Kịch bản: ' + e.script.split('/').at(-1)) : '') + (e.chain ? '<code>' + esc(e.chain) + '</code>' : '') + '</div></div>';
  return '<details class="event-row ' + esc(e.kind) + (e.sourceType === 'proposal' ? ' proposal' : '') + '" id="' + esc(e.id + '-' + groupId) + '"><summary class="event-top"><div class="event-date">' + dateMarkup(e) + '</div><div class="event-copy"><h3>' + esc(e.title) + '</h3><div class="tags">' + tagNames + (e.sourceType === 'proposal' ? '<span class="tag proposal">Đề xuất</span>' : '') + '</div>' + (summary ? '<p>' + esc(summary) + '</p>' : '') + '</div><span class="event-chevron" aria-hidden="true">›</span></summary>' + detail + '</details>';
}
function sortEvents(a, b) { return (a.date ?? '9999').localeCompare(b.date ?? '9999') || (a.time ?? '').localeCompare(b.time ?? '') || Number(a.kind !== 'evidence') - Number(b.kind !== 'evidence'); }
function groupEvents(events) {
  const grouped = new Map();
  events.sort(sortEvents).forEach((e) => {
    const keys = state.group === 'case' ? e.caseIds.filter((id) => state.cases.has(id)) : [e.date?.slice(0, 7) ?? 'undated'];
    keys.forEach((key) => grouped.set(key, [...(grouped.get(key) ?? []), e]));
  });
  if (state.group === 'month') return [...grouped].sort(([a], [b]) => a.localeCompare(b));
  return DATA.cases.filter((c) => grouped.has(c.id)).map((c) => [c.id, grouped.get(c.id)]);
}
function caseContext(c) {
  if (!c) return '';
  const rows = [];
  if (state.sources.has('canon') && c.date) rows.push('<span><b>Bối cảnh game:</b> ' + esc(day(c.date)) + (c.end ? ' → ' + esc(day(c.end)) : '') + '</span>');
  if (state.sources.has('proposal') && c.proposedDate) rows.push('<span><b>Đề xuất:</b> ' + esc(day(c.proposedDate)) + (c.proposedEnd ? ' → ' + esc(day(c.proposedEnd)) : '') + '</span>');
  if (c.latestEvidence) rows.push('<span><b>Dữ liệu quan trọng đủ từ:</b> ' + esc(day(c.latestEvidence)) + '</span>');
  if (c.window) rows.push('<span><b>Mở khóa hiện tại:</b> xong ' + esc(c.unlockAfter) + '; không khóa theo ngày</span>');
  return rows.length ? '<div class="case-context">' + rows.join('') + '</div>' : '';
}
function emptyMarkup() { return '<div class="empty"><h2>Không còn mốc phù hợp</h2><p>Mỗi nhóm bộ lọc cần ít nhất một lựa chọn. Bạn có thể chọn “Tất cả” ở nhóm đã bỏ hết, hoặc đặt lại toàn bộ.</p><button data-reset>Đặt lại bộ lọc</button></div>'; }
function renderEvents(events) {
  return groupEvents(events).map(([key, rows]) => '<section class="group-section"><header class="group-header"><h2>' + esc(state.group === 'case' ? caseById.get(key)?.title : monthName(key)) + '</h2><span>' + rows.length + ' mốc</span></header>' + (state.group === 'case' ? caseContext(caseById.get(key)) : '') + rows.map((e) => eventMarkup(e, key)).join('') + (state.group === 'case' && state.tracks.has('evidence') ? '<div class="related-group">' + relatedMarkup(caseById.get(key)) + '</div>' : '') + '</section>').join('') || emptyMarkup();
}
function windowModels() {
  const result = [];
  DATA.cases.filter((c) => c.window).forEach((c) => {
    const story = eventById.get('story-' + c.id);
    result.push({ ...story, id: 'window-' + c.id, date: c.window.from, end: null, openEnded: true, bkg: c.date, window: c.window, tracks: story.tracks, kind: 'window' });
  });
  DATA.events.filter((e) => e.sourceType === 'proposal' && (e.kind === 'window' || e.end)).forEach((e) => result.push(e));
  DATA.events.filter((e) => e.kind === 'hidden' && e.sourceType === 'canon').forEach((e) => result.push({ ...e, internal: true }));
  return result.filter((e) => {
    const withMonths = e.openEnded && e.date ? { ...e, end: '9999-12-31' } : e;
    return fits(withMonths);
  });
}
function windowMarkup(e) {
  const c = caseById.get(e.caseIds[0]);
  const proposal = e.sourceType === 'proposal';
  const start = e.window ? 'Sau khi xong ' + e.unlockAfter : e.internal ? 'Khi đi đến nhánh trong vụ' : day(e.date);
  const startSub = e.window ? 'Mốc vụ trước: ' + day(e.date) + '; chưa phải ngày mở chính xác' : e.internal ? 'Bối cảnh: ' + dateWithDay(e.date) : weekday(e.date);
  const end = e.window ? 'Không có hạn theo lịch' : e.internal ? 'Kết thúc cảnh / nhánh' : e.end ? day(e.end) : 'Chưa chốt hạn';
  const conditions = e.window?.condition ?? e.condition;
  const mode = e.internal ? 'Nhánh trong vụ' : e.window ? 'Mở theo điều kiện' : e.kind === 'window' ? 'Khoảng kích hoạt · đề xuất' : 'Khoảng diễn ra · đề xuất';
  return '<article class="window-entry' + (proposal ? ' proposal' : '') + '"><div class="window-header"><h3>' + esc(e.title) + '</h3><span class="tag' + (proposal ? ' proposal' : '') + '">' + esc(mode) + '</span></div><div class="window-rail"><div><strong>' + esc(start) + '</strong><small>' + esc(startSub) + '</small></div><div class="range-line' + (e.openEnded ? ' open-ended' : '') + '"></div><div><strong>' + esc(end) + '</strong><small>' + esc(e.end ? weekday(e.end) : e.internal ? 'Không có cửa sổ ngày riêng' : 'Chưa thi hành điều kiện thời gian') + '</small></div></div><p>' + esc(conditions ?? '') + '</p><dl>' + (e.bkg ? '<dt>Ngày bối cảnh chuẩn</dt><dd>' + esc(dateWithDay(e.bkg)) + ' · không khóa việc theo ngày này</dd>' : '') + (c?.latestEvidence ? '<dt>Dữ liệu quyết định đủ từ</dt><dd>' + esc(dateWithDay(c.latestEvidence)) + '</dd>' : '') + (c?.unknownEvidenceDates?.length ? '<dt>Ngày còn thiếu</dt><dd>' + esc(c.unknownEvidenceDates.join(', ')) + '</dd>' : '') + '<dt>Hiệu lực trong game</dt><dd>' + (proposal ? 'Chưa triển khai; chỉ là khoảng đề xuất để chốt lịch.' : e.internal ? 'Đọc điều kiện rẽ nhánh của kịch bản.' : 'Chỉ dùng tiến độ/cờ. Chưa kiểm tra ngày bắt đầu hay ngày kết thúc.') + '</dd></dl>' + (e.summary ? '<p style="margin-top:10px">' + esc(e.summary) + '</p>' : '') + '<div class="source-links">' + link(e.source ?? c.source, 'Xem nguồn điều kiện') + '</div></article>';
}
function renderWindows(rows) {
  return '<div class="policy-note"><p><strong>Ngày bối cảnh ≠ ngày mở khóa.</strong> Hiện các việc phụ mở khi vụ trước hoàn tất. Chưa có nhiệm vụ nào được runtime kích hoạt bằng một khoảng ngày.</p><p>Khoảng đề xuất bên dưới thêm cả ngày bắt đầu, ngày hết hiệu lực và cờ tiến độ. Cảnh nằm trong vụ được ghi riêng để tránh nhầm thành việc có thể nhận bất kỳ lúc nào.</p></div>' + (groupEvents(rows).map(([key, list]) => '<section class="group-section"><header class="group-header"><h2>' + esc(state.group === 'case' ? caseById.get(key)?.title : monthName(key)) + '</h2></header>' + list.map(windowMarkup).join('') + '</section>').join('') || emptyMarkup());
}
function currentFindings() {
  return DATA.findings.filter((f) => {
    const c = caseById.get(f.caseId);
    const date = f.sourceType === 'proposal' || !state.sources.has('canon') ? c?.proposedDate ?? c?.date : c?.date;
    return sourceFits(f.sourceType) && state.cases.has(f.caseId) && (state.tracks.has(c?.kind) || state.tracks.has('evidence')) && monthFits(date, f.sourceType === 'proposal' ? c?.proposedEnd : c?.end) && (!state.query || [f.title, f.detail].join(' ').toLocaleLowerCase('vi').includes(state.query));
  });
}
function renderConstraints(findings) {
  return '<div class="policy-note"><p><strong>Chứng cứ phát sinh → cảnh đọc chứng cứ.</strong> Nếu một cảnh tạo log mới thì log ở sau cảnh; nếu cảnh đọc log đã tồn tại thì log phải có trước cảnh.</p><p>Ngày đặt trước, ngày dự kiến và ngày log được tạo là các loại ngày khác nhau. Bảng không ghi ngày tạo thì trang sẽ báo thiếu dữ liệu.</p></div>' + (findings.map((f) => '<article class="finding ' + esc(f.severity) + '"><span class="mark" aria-hidden="true">!</span><div><h3>' + esc(f.title) + '</h3><span class="tag' + (f.sourceType === 'proposal' ? ' proposal' : '') + '">' + esc(caseById.get(f.caseId)?.title) + ' · ' + (f.sourceType === 'proposal' ? 'Đề xuất' : 'Lịch game') + '</span><p>' + esc(f.detail) + '</p></div></article>').join('') || '<div class="empty"><h2>Không có xung đột đã phát hiện trong lựa chọn này</h2><p>Kết quả kiểm tra dựa trên những mốc và chứng cứ đã được khai báo trong kịch bản.</p></div>');
}
function render() {
  const events = DATA.events.filter(fits);
  const findings = currentFindings();
  el('issue-count').textContent = findings.length;
  document.querySelectorAll('[data-view]').forEach((button) => { const active = button.dataset.view === state.view; button.setAttribute('aria-selected', active); button.tabIndex = active ? 0 : -1; });
  const guides = { events: '<strong>Chỉ giữ các mốc ảnh hưởng quyết định lịch.</strong> Mở một dòng để xem chứng cứ cần có trước đó, điều kiện kích hoạt và nguồn. Log phụ được gom vào “Sự kiện liên đới”.', windows: '<strong>Xem khoảng nhiệm vụ có thể được nhận.</strong> Ngày ghi trong truyện được giữ riêng với điều kiện mở khóa. Bật “Lịch đề xuất” để xem các khoảng ngày gợi ý.', constraints: '<strong>Những điểm cần xử lý trước khi chốt lịch.</strong> Gồm cảnh dùng log quá sớm, mở khóa trước khi đủ dữ liệu và chứng cứ chưa có ngày.' };
  el('guide').innerHTML = guides[state.view];
  const windows = state.view === 'windows' ? windowModels() : [];
  el('result-count').textContent = state.view === 'events' ? events.length + ' mốc quyết định · log nền đã gộp' : state.view === 'windows' ? windows.length + ' nhánh / khoảng kích hoạt' : findings.length + ' điểm cần xử lý';
  el('content').innerHTML = state.view === 'events' ? renderEvents(events) : state.view === 'windows' ? renderWindows(windows) : renderConstraints(findings);
}
function reset() {
  state.sources = new Set(['canon']); state.tracks = new Set(Object.keys(trackNames)); state.months = new Set(months); state.cases = new Set(DATA.cases.map((c) => c.id)); state.query = ''; state.group = 'case'; state.view = 'events'; el('search').value = ''; el('group').value = 'case'; renderFilters(); render();
}
el('filter-fields').addEventListener('change', (event) => { const input = event.target; if (!input.dataset.filter) return; if (input.checked) state[input.dataset.filter].add(input.value); else state[input.dataset.filter].delete(input.value); render(); });
el('filter-fields').addEventListener('click', (event) => { const button = event.target.closest('[data-all]'); if (!button) return; const field = fields.find((f) => f.id === button.dataset.all); state[field.id] = new Set(field.options.map((o) => o.id)); renderFilters(); render(); });
el('search').addEventListener('input', (event) => { state.query = event.target.value.trim().toLocaleLowerCase('vi'); render(); });
el('group').addEventListener('change', (event) => { state.group = event.target.value; render(); });
document.querySelector('.views').addEventListener('click', (event) => { const button = event.target.closest('[data-view]'); if (!button) return; state.view = button.dataset.view; render(); });
document.querySelector('.views').addEventListener('keydown', (event) => {
  const buttons = [...document.querySelectorAll('[data-view]')]; const index = buttons.indexOf(event.target);
  if (index < 0 || !['ArrowLeft', 'ArrowRight', 'Home', 'End'].includes(event.key)) return;
  event.preventDefault(); const next = event.key === 'Home' ? 0 : event.key === 'End' ? buttons.length - 1 : (index + (event.key === 'ArrowRight' ? 1 : -1) + buttons.length) % buttons.length;
  state.view = buttons[next].dataset.view; render(); buttons[next].focus();
});
el('reset').addEventListener('click', reset);
el('content').addEventListener('click', (event) => { if (event.target.closest('[data-reset]')) reset(); });
el('collapse').addEventListener('click', () => el('content').querySelectorAll('details[open]').forEach((node) => { node.open = false; }));
el('sources').innerHTML = DATA.sources.map((file) => '<li>' + link(file) + '</li>').join('');
renderFilters(); render();
