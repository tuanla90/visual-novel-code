import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { lichNgay, mocLich } from '../../prototype/src/mvp/engine/lich-ngay.ts';

export const clean = (s = '') => s.replace(/\{[^}]*\}/g, '').replace(/[`*_]/g, '').replace(/\s+/g, ' ').trim();
const get = (body, name) => body.match(new RegExp(`^-\\s*${name}:\\s*(.+)$`, 'm'))?.[1]?.trim() ?? null;
const dateOf = (row) => Object.values(row).join(' ').match(/\b\d{4}-\d{2}-\d{2}\b/)?.[0] ?? null;
const timeOf = (row) => row.gio ?? row.gio_vao ?? Object.values(row).join(' ').match(/\b\d{2}:\d{2}\b/)?.[0] ?? null;
const matches = (row, where = {}) => Object.entries(where).every(([key, values]) => (Array.isArray(values) ? values : [values]).includes(row[key]));
const refComment = /<!--\s*timeline-ref\s+([\s\S]*?)-->/g;

export function parseTables(markdown) {
  const result = new Map();
  for (const [, name, body] of markdown.matchAll(/^##\s+(\w+)\s*\{bảng\}\s*\r?\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)) {
    const lines = body.split(/\r?\n/).filter((line) => line.trim().startsWith('|'));
    const cells = (line) => line.trim().replace(/^\|/, '').replace(/\|$/, '').split('|').map((s) => s.trim().replaceAll('␣', ' '));
    if (!lines.length) continue;
    const columns = cells(lines[0]);
    const rows = lines.slice(1).filter((line) => !/^\|\s*:?-{2,}/.test(line)).map((line, index) => {
      const values = cells(line);
      if (values.length !== columns.length) throw new Error(`${name}: số cột không khớp ở dòng ${index + 1}`);
      return Object.fromEntries(columns.map((column, i) => [column, values[i]]));
    });
    result.set(name, { name, rows, columns });
  }
  return result;
}

export async function buildSourceModel(root) {
  const sourceDir = path.join(root, 'prototype/noi-dung-mvp');
  const sourcePath = 'prototype/noi-dung-mvp/';
  const schedule = await readFile(path.join(sourceDir, 'lich.md'), 'utf8');
  const tables = parseTables(await readFile(path.join(sourceDir, 'du-lieu.md'), 'utf8'));
  const scripts = await Promise.all((await readdir(path.join(sourceDir, 'kich-ban'))).filter((f) => f.endsWith('.md')).sort().map(async (file) => {
    const body = await readFile(path.join(sourceDir, 'kich-ban', file), 'utf8');
    const metadata = [...body.matchAll(refComment)].map(([, json]) => {
      try { return JSON.parse(json); } catch (error) { throw new Error(`${file}: timeline-ref không phải JSON hợp lệ: ${error.message}`); }
    });
    const chains = [...body.matchAll(/^###\s+([\w-]+)\s*[—–-]\s*([^\r\n]+)\r?\n([\s\S]*?)(?=^### |$(?![\s\S]))/gm)].map(([, id, title, text]) => ({ id, title: clean(title), text }));
    return { file, body, path: `${sourcePath}kich-ban/${file}`, chains, evidence: metadata.flatMap((m) => m.evidence ?? []), tables: [...new Set(metadata.flatMap((m) => m.tables ?? []))], dependsOn: metadata.flatMap((m) => m.dependsOn ?? []) };
  }));
  const scriptFor = (chain) => scripts.find((script) => script.chains.some((c) => c.id === chain));
  const sections = [...schedule.matchAll(/^##\s+(.+?)\s*\{([^}]+)\}\s*\r?\n([\s\S]*?)(?=^## |$(?![\s\S]))/gm)].map(([, title, meta, body]) => ({ title: clean(title), meta, body, chain: get(body, 'Chuỗi') }));
  const openingDate = get(schedule, 'Ngày mở đầu');
  const calendar = lichNgay(openingDate);
  const caseTitle = schedule.match(/^#\s+(.+?)\s*\{vụ:/m)?.[1] ?? 'Vụ 1';
  const cases = [
    { id: 'intro', title: 'Đầu học kỳ', kind: 'main', date: calendar.nhanPhong, end: calendar.phongClb, source: `${sourcePath}lich.md`, script: `${sourcePath}kich-ban/00-mo-dau.md` },
    { id: 'vu1', title: clean(caseTitle), kind: 'main', date: calendar.ngayDieuTra(1), end: calendar.hop, source: `${sourcePath}lich.md` },
  ];
  const events = [];
  const daySections = sections.filter((s) => /ngày:\s*\d/.test(s.meta));
  const tenNgay = (n) => daySections.find((s) => Number(s.meta.match(/ngày:\s*(\d+)/)?.[1]) === n)?.title;
  for (const m of mocLich({ giaiDoan: 'ngay', ngay: 5 }, { ngayMoDau: openingDate, tenNgay })) {
    const n = m.ten.match(/^Ngày (\d+)$/)?.[1];
    const caseId = n || m.han ? 'vu1' : 'intro';
    const section = n ? daySections.find((s) => Number(s.meta.match(/ngày:\s*(\d+)/)?.[1]) === Number(n)) : m.han ? sections.find((s) => /ngày họp/.test(s.meta)) : null;
    const script = section ? scriptFor(section.chain) : scripts.find((s) => s.file === '00-mo-dau.md');
    events.push({ id: `story-${n ? `vu1-day${n}` : m.han ? 'vu1-meeting' : m.ngay}`, title: n ? `Ngày ${n} — ${tenNgay(Number(n))}` : m.ten, date: m.ngay, end: m.den ?? null, time: m.chiTiet === '16:00' ? m.chiTiet : null, kind: 'story', tracks: ['main'], sourceType: 'canon', caseIds: [caseId], source: `${sourcePath}lich.md`, script: script?.path, chain: section?.chain, summary: n ? 'Ngày điều tra, tính bằng cùng hàm lịch mà game sử dụng.' : m.chiTiet ?? '', condition: n ? Number(n) === 1 ? 'Kết thúc mở đầu và nhận lá thư.' : `Hoàn thành Ngày ${Number(n) - 1}.` : m.han ? 'Đi hết các ngày điều tra của Vụ 1.' : 'Theo tiến độ chuỗi mở đầu.', dateLabel: m.den ? 'Khoảng diễn ra' : 'Ngày diễn ra' });
  }
  let previous = 'vu1';
  for (const section of sections) {
    const mainId = section.meta.match(/vụ sau:\s*(\S+)/)?.[1];
    const sideId = section.meta.match(/nhiệm vụ phụ:\s*(\S+)/)?.[1];
    if (!mainId && !sideId) continue;
    const id = mainId ?? sideId;
    const script = scriptFor(section.chain);
    if (!script) throw new Error(`Không tìm thấy chuỗi ${section.chain} trong kịch bản.`);
    const item = { id, title: mainId ? `Vụ ${mainId.replace('vu', '')} — ${section.title}` : section.title, kind: sideId ? 'side' : 'main', date: get(section.body, 'Ngày'), end: null, unlockAfter: sideId ? get(section.body, 'Mở sau') : previous, giver: get(section.body, 'Người giao'), source: `${sourcePath}lich.md`, script: script.path, chain: section.chain, result: get(section.body, 'Lời kết'), tableNames: script.tables, dependsOn: script.dependsOn, evidenceRules: script.evidence.map((r) => r.id) };
    script.caseId = id;
    cases.push(item);
    events.push({ id: `story-${id}`, title: item.title, date: item.date, kind: 'story', tracks: sideId === 'dan-lac' ? ['side', 'relationship'] : [item.kind], sourceType: 'canon', caseIds: [id], source: item.source, script: item.script, chain: item.chain, summary: item.result, dateLabel: sideId ? 'Ngày bối cảnh · không phải ngày mở khóa' : 'Ngày bối cảnh của vụ', condition: sideId ? `Hoàn thành ${item.unlockAfter}; chưa hoàn thành việc này; nhận trong bảng hoạt động hoặc màn kết. Có thể cất và chơi tiếp.` : `Kết thúc ${previous}, chọn chơi vụ kế tiếp.`, unlockAfter: item.unlockAfter });
    if (mainId) previous = id;
  }
  for (const script of scripts) {
    if (!script.caseId) script.caseId = /^(0[1-6])/.test(script.file) ? 'vu1' : 'intro';
  }
  const caseById = new Map(cases.map((c) => [c.id, c]));
  const rules = scripts.flatMap((script) => script.evidence.map((rule) => ({ ...rule, caseId: script.caseId, script: script.path })));
  const ruleIds = new Set();
  const keyRows = new Set();
  const evidenceEvents = [];
  for (const rule of rules) {
    if (ruleIds.has(rule.id)) throw new Error(`Trùng mã timeline-ref: ${rule.id}`);
    ruleIds.add(rule.id);
    const table = tables.get(rule.table);
    if (!table) throw new Error(`${rule.script}: không có bảng ${rule.table}`);
    for (const column of Object.keys(rule.where ?? {})) if (!table.columns.includes(column)) throw new Error(`${rule.id}: bảng ${rule.table} không có cột ${column}`);
    let chosen = table.rows.filter((row) => matches(row, rule.where));
    if (rule.dateFrom) {
      const referenceRows = tables.get(rule.dateFrom.table)?.rows.filter((row) => matches(row, rule.dateFrom.where)) ?? [];
      if (referenceRows.length !== 1) throw new Error(`${rule.id}: dateFrom phải chọn đúng một bản ghi.`);
      chosen = chosen.filter((row) => dateOf(row) === dateOf(referenceRows[0]));
    }
    if (!chosen.length) throw new Error(`${rule.id}: không chọn được bản ghi chứng cứ.`);
    const groups = new Map();
    chosen.forEach((row) => { const key = rule.splitBy ? row[rule.splitBy] : 'all'; groups.set(key, [...(groups.get(key) ?? []), row]); keyRows.add(`${rule.table}:${JSON.stringify(row)}`); });
    for (const [group, rows] of groups) {
      const joined = rule.join ? rows.flatMap((row) => (tables.get(rule.join.table)?.rows ?? []).filter((other) => other[rule.join.on] === row[rule.join.on])) : [];
      if (rule.join && joined.length !== rows.length) throw new Error(`${rule.id}: khóa nối không tạo một phiên cho mỗi bản ghi.`);
      joined.forEach((row) => keyRows.add(`${rule.join.table}:${JSON.stringify(row)}`));
      const dates = [...new Set([...rows, ...joined].map(dateOf).filter(Boolean))].sort();
      if (rule.join && dates.length > 1) throw new Error(`${rule.id}: ngày của đơn và phiên không khớp.`);
      const consumers = [...new Set([rule.caseId, ...cases.filter((c) => c.dependsOn?.includes(rule.id)).map((c) => c.id)])];
      const scriptDay = rule.script.match(/0([1-5])-ngay-/)?.[1];
      const readDate = scriptDay ? calendar.ngayDieuTra(Number(scriptDay)) : caseById.get(rule.caseId)?.date;
      const positions = { [rule.caseId]: { chain: rule.usedAt, date: readDate, title: scripts.find((s) => s.path === rule.script)?.chains.find((c) => c.id === rule.usedAt)?.title } };
      if (rule.usedAt && !positions[rule.caseId].title) throw new Error(`${rule.id}: không tìm thấy cảnh đọc ${rule.usedAt}.`);
      const compareRows = rule.compare ? rows.flatMap((row) => tables.get(rule.compare.table).rows.filter((other) => other[rule.compare.on] === row[rule.compare.on])) : [];
      const comparisons = compareRows.map((row) => ({ date: dateOf(row), record: row, table: rule.compare.table, relation: rule.compare.relation, note: rule.compare.note }));
      const event = { id: `evidence-${rule.id}-${group}`, ruleId: rule.id, title: rule.title + (group === 'all' ? '' : ` · ${group}`), date: dates[0] ?? null, end: dates.at(-1) === dates[0] ? null : dates.at(-1), time: rows.length === 1 ? timeOf(joined[0] ?? rows[0]) : null, timeEnd: rows.length === 1 ? rows[0]?.gio_ra ?? null : null, kind: 'evidence', tracks: ['evidence'], sourceType: 'shared', caseIds: consumers, summary: rule.note, dateLabel: rule.dateRole === 'scheduled' ? 'Ngày sử dụng đã đặt trước' : 'Ngày chứng cứ phát sinh', dateRole: rule.dateRole ?? 'record', source: `${sourcePath}du-lieu.md`, script: rule.script, records: rows.map((record) => ({ table: rule.table, record })).concat(joined.map((record) => ({ table: rule.join.table, record }))), comparisons, positions };
      evidenceEvents.push(event);
    }
  }
  events.push(...evidenceEvents);
  for (const item of cases) {
    item.evidenceIds = evidenceEvents.filter((e) => e.caseIds.includes(item.id)).map((e) => e.id);
    const required = evidenceEvents.filter((e) => e.caseIds.includes(item.id) && e.dateRole !== 'scheduled');
    item.latestEvidence = required.map((e) => e.end ?? e.date).filter(Boolean).sort().at(-1) ?? null;
    item.unknownEvidenceDates = required.filter((e) => !e.date).map((e) => e.title);
    const relevantTables = [...new Set([...(item.tableNames ?? []), ...rules.filter((r) => r.caseId === item.id).flatMap((r) => [r.table, r.join?.table].filter(Boolean))])];
    item.related = relevantTables.map((name) => {
      const rows = (tables.get(name)?.rows ?? []).filter((row) => !keyRows.has(`${name}:${JSON.stringify(row)}`));
      const dates = rows.map(dateOf).filter(Boolean).sort();
      return { table: name, count: rows.length, from: dates[0] ?? null, to: dates.at(-1) ?? null, rows };
    }).filter((t) => t.count);
    item.relatedCount = item.related.reduce((sum, t) => sum + t.count, 0);
    item.window = item.kind === 'side' ? { mode: 'condition', after: item.unlockAfter, from: caseById.get(item.unlockAfter)?.end ?? caseById.get(item.unlockAfter)?.date ?? null, to: null, dateEnforced: false, startExact: false, condition: `Có cờ ${item.unlockAfter}-hoan-tat; chưa có ${item.id}-hoan-tat; việc chưa đang nhận/cất. Nhận mới khi không ở mở đầu, buổi họp, kết toàn game hoặc đang làm một việc phụ khác.`, label: 'Mở bằng tiến độ, không có hạn ngày', detail: 'Ngày bối cảnh không phải điều kiện thời gian. Có thể nhận giữa vụ chính, cất lại và tiếp tục sau; game giữ tiến độ riêng.' } : null;
  }
  const hiddenClues = new Map();
  for (const script of scripts) {
    for (const chain of script.chains) {
      for (const [, number] of chain.text.matchAll(/mở manh mối (clue-loi-nhan-linh-[1-5])/g)) {
        if (hiddenClues.has(number)) continue;
        const owner = caseById.get(script.caseId);
        const date = script.file === '06-hop-va-ket.md' ? calendar.hop : owner?.date ?? null;
        const gate = [...script.body.matchAll(/\[NẾU\s+([^\]]+)\]\s*→\s*đi tới\s+(\S+)/g)].find((m) => m[2] === chain.id)?.[1];
        const event = { id: `hidden-${number}`, title: number.endsWith('-5') ? 'Mở ngăn tủ khóa: hồ sơ vụ đầu của CLB' : `Nhận mẩu giấy của Linh số ${number.at(-1)}`, date, kind: 'hidden', tracks: ['hidden'], sourceType: 'canon', caseIds: [script.caseId], source: script.path, chain: chain.id, summary: chain.title, condition: gate ? `Điều kiện [NẾU] trong kịch bản: ${gate}.` : `Đi đến nhánh “${chain.title}”; đây là cảnh trong vụ, chưa có khoảng kích hoạt độc lập.`, rawCondition: gate ?? null };
        hiddenClues.set(number, event);
      }
    }
  }
  events.push(...hiddenClues.values());
  return { cases, events, calendar, tables, scripts, sources: [`${sourcePath}lich.md`, `${sourcePath}du-lieu.md`, ...scripts.map((s) => s.path), 'prototype/src/mvp/engine/lich-ngay.ts', 'prototype/src/mvp/engine/may.ts'], rowCount: [...tables.values()].reduce((n, t) => n + t.rows.length, 0) };
}

export function applyPlan(model, plan) {
  const byId = new Map(model.cases.map((c) => [c.id, c]));
  const planCases = new Map();
  const events = plan.items.map((item, index) => {
    const original = item.ref ? byId.get(item.ref) : null;
    if (item.ref && !original) throw new Error(`Plan tham chiếu vụ không tồn tại: ${item.ref}`);
    const id = item.ref ?? item.id ?? `plan-${index}`;
    const event = { id: `proposal-${id}`, title: original?.title ?? item.title, date: item.date ?? item.from ?? null, end: item.to ?? null, sourceType: 'proposal', tracks: item.tracks ?? [original?.kind ?? item.track ?? 'event'], kind: item.windowMode === 'activation' ? 'window' : 'story', caseIds: original ? [original.id] : [item.caseId ?? 'season'], source: 'docs/mvp/timeline-mua-1.plan.json', script: original?.script, summary: item.detail, dateLabel: item.windowMode === 'activation' ? 'Khoảng có thể kích hoạt · đề xuất' : item.to ? 'Khoảng diễn ra · đề xuất' : 'Ngày đề xuất', condition: item.condition ?? (original?.unlockAfter ? `Hoàn thành ${original.unlockAfter}${item.windowMode === 'activation' ? ' và đang trong khoảng ngày đề xuất' : ''}.` : 'Chưa đặc tả điều kiện trong kịch bản.'), unlockAfter: original?.unlockAfter, notImplemented: true, flashback: item.flashback ?? false };
    if (original) planCases.set(original.id, { ...original, proposedDate: event.date, proposedEnd: event.end, proposedWindowMode: item.windowMode, proposedEvent: event });
    return event;
  });
  model.cases.forEach((c) => Object.assign(c, planCases.get(c.id) ?? {}));
  model.events.push(...events);
  for (const event of model.events.filter((e) => e.kind === 'hidden' && e.sourceType === 'canon')) {
    const owner = byId.get(event.caseIds[0]);
    if (!owner?.proposedDate) continue;
    model.events.push({ ...event, id: `proposal-${event.id}`, sourceType: 'proposal', date: owner.proposedDate, end: owner.proposedEnd, dateLabel: 'Trong khoảng vụ đề xuất · ngày cảnh chưa chốt', inherited: true });
  }
  model.cases.push({ id: 'season', title: 'Sự kiện học kỳ và act bổ sung', kind: 'event', date: null, related: [], relatedCount: 0, evidenceIds: [] });
  const findings = [];
  for (const event of model.events.filter((e) => e.kind === 'evidence')) {
    for (const comparison of event.comparisons ?? []) {
      if (comparison.relation === 'before' && event.date && comparison.date && event.date >= comparison.date) findings.push({ id: `order-${event.id}`, sourceType: 'shared', caseId: event.caseIds[0], severity: 'conflict', title: 'Thứ tự dữ liệu không còn khớp ý đồ kịch bản', detail: `${event.title}: ${event.date}; mốc phải nằm sau nó hiện là ${comparison.date}. ${comparison.note}` });
    }
  }
  for (const c of model.cases) {
    const needs = model.events.filter((e) => e.kind === 'evidence' && e.caseIds.includes(c.id) && e.dateRole !== 'scheduled');
    for (const version of ['canon', 'proposal']) {
      const date = version === 'canon' ? c.date : c.proposedDate;
      if (!date) continue;
      const late = needs.filter((e) => e.date && (e.end ?? e.date) > date);
      if (late.length) findings.push({ id: `late-${version}-${c.id}`, sourceType: version, caseId: c.id, severity: 'conflict', title: 'Cảnh dùng chứng cứ trước khi chứng cứ tồn tại', detail: `${c.title}: ${date}; chứng cứ cần dùng còn phát sinh tới ${late.map((e) => e.end ?? e.date).sort().at(-1)}.`, events: late.map((e) => e.id) });
    }
    if (c.window && c.latestEvidence && c.window.from && c.window.from < c.latestEvidence) findings.push({ id: `early-${c.id}`, sourceType: 'canon', caseId: c.id, severity: 'decision', title: 'Có thể mở bằng cờ trước khi đủ dữ liệu theo lịch', detail: `${c.title}: hoàn thành ${c.unlockAfter} đã mở việc; dữ liệu quyết định chỉ đủ từ ${c.latestEvidence}. Cần thêm điều kiện ngày nếu muốn lịch truyện liên tục.` });
    if (c.unknownEvidenceDates?.length) findings.push({ id: `undated-${c.id}`, sourceType: 'shared', caseId: c.id, severity: 'missing', title: 'Chứng cứ chưa khai ngày phát sinh', detail: `${c.title}: ${c.unknownEvidenceDates.join(', ')}. Chưa thể xác nhận thời điểm nhiệm vụ có đủ dữ liệu.` });
    if (c.proposedWindowMode === 'activation') {
      const predecessor = byId.get(c.unlockAfter);
      const ready = [c.latestEvidence, predecessor?.proposedEnd ?? predecessor?.proposedDate ?? predecessor?.end ?? predecessor?.date].filter(Boolean).sort().at(-1);
      if (ready && c.proposedDate < ready) findings.push({ id: `window-${c.id}`, sourceType: 'proposal', caseId: c.id, severity: 'conflict', title: 'Khoảng kích hoạt đề xuất mở quá sớm', detail: `${c.title}: mở từ ${c.proposedDate}, nhưng tiến độ/chứng cứ chỉ đủ từ ${ready}.` });
    }
  }
  model.plan = plan;
  model.findings = findings;
  return model;
}
