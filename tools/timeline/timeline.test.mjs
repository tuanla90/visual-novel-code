import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { buildSourceModel, applyPlan } from './source-model.mjs';
import { lichNgay } from '../../prototype/src/mvp/engine/lich-ngay.ts';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
// B19: bộ mùa 1 chỉ còn Vụ 1 bản 6; các test này đo công cụ trên bộ mùa 1 trước B19 (bản đông cứng).
const CU = 'src/content/real/testing/noi-dung-mua-1-truoc-b19';
const require = createRequire(new URL('../../prototype/package.json', import.meta.url));
const { JSDOM, VirtualConsole } = require('jsdom');

test('timeline keeps the game calendar and separates historical evidence from discovery', async () => {
  const model = await buildSourceModel(root, CU);
  const calendar = lichNgay(model.calendar.nhanPhong);
  const day1 = model.events.find((e) => e.id === 'story-vu1-day1');
  const day4 = model.events.find((e) => e.id === 'story-vu1-day4');
  assert.equal(day1.date, calendar.ngayDieuTra(1));
  assert.notEqual(day1.date, calendar.nhanPhong);
  const print = model.events.find((e) => e.ruleId === 'thu-in');
  assert.equal(print.positions.vu1.date, day4.date);
  assert.ok(print.date < day4.date);
  const lead = model.events.find((e) => e.ruleId === 'tung-dan-hoai');
  const quest = model.cases.find((c) => c.id === 'dan-lac');
  assert.ok(lead.date < quest.date);
  assert.equal(quest.window.dateEnforced, false);
  assert.equal(quest.window.to, null);
  const refund = model.events.find((e) => e.ruleId === 'hoan-trung');
  assert.equal(refund.date, null);
  assert.equal(refund.records.length, 2);
});

test('moving a case ahead of its logs produces a decision finding', async () => {
  const model = await buildSourceModel(root, CU);
  const latest = model.cases.find((c) => c.id === 'vu4').latestEvidence;
  const dayBefore = new Date(latest + 'T12:00:00Z');
  dayBefore.setUTCDate(dayBefore.getUTCDate() - 1);
  applyPlan(model, { items: [{ ref: 'vu4', date: dayBefore.toISOString().slice(0, 10) }] });
  assert.ok(model.findings.some((f) => f.id === 'late-proposal-vu4'));
  assert.ok(model.findings.some((f) => f.id === 'early-so-phong'));
  // Việc phụ mở bằng cờ trước khi dữ liệu của nó đủ theo lịch thì phải có cảnh báo, và ngược lại.
  for (const c of model.cases.filter((x) => x.window && x.latestEvidence)) {
    assert.equal(model.findings.some((f) => f.id === `early-${c.id}`), c.window.from < c.latestEvidence, c.id);
  }
  assert.ok(model.findings.some((f) => f.id === 'undated-hoan-tien'));
});

test('multi-selection, grouping, availability windows and empty-state recovery work together', async () => {
  const errors = [];
  const virtualConsole = new VirtualConsole();
  virtualConsole.on('jsdomError', (error) => errors.push(error.message));
  const html = await readFile(path.join(root, 'docs/mvp/timeline-mua-1.html'), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously', virtualConsole });
  try {
    const doc = dom.window.document;
    const change = (input) => input.dispatchEvent(new dom.window.Event('change', { bubbles: true }));
    const selectMany = (field, values) => {
      for (const input of doc.querySelectorAll(`[data-filter="${field}"]`)) {
        input.checked = values.includes(input.value);
        change(input);
      }
    };
    assert.deepEqual(errors, []);
    assert.ok(doc.querySelectorAll('.event-row').length > 0);
    const day4 = doc.getElementById('story-vu1-day4-vu1');
    assert.match(day4.textContent, /Chứng cứ cần có trước lúc dùng/);
    const printDate = (await buildSourceModel(root, CU)).events.find((e) => e.ruleId === 'thu-in').date.split('-').reverse().join('/');
    assert.ok(day4.textContent.includes(printDate), printDate);
    selectMany('cases', ['vu3', 'vu4']);
    selectMany('tracks', ['main', 'evidence']);
    const headings = [...doc.querySelectorAll('.group-header h2')].map((n) => n.textContent);
    assert.equal(headings.length, 2);
    assert.ok(headings.some((s) => s.startsWith('Vụ 3')));
    assert.ok(headings.some((s) => s.startsWith('Vụ 4')));
    assert.equal(doc.querySelectorAll('.tag.side,.tag.hidden').length, 0);
    const group = doc.getElementById('group');
    group.value = 'month'; change(group);
    assert.ok([...doc.querySelectorAll('.group-header h2')].every((h) => h.textContent.startsWith('Tháng')));
    const proposal = doc.querySelector('[data-filter="sources"][value="proposal"]');
    proposal.checked = true; change(proposal);
    assert.ok(doc.querySelectorAll('.event-row.proposal').length > 0);
    doc.getElementById('reset').click();
    selectMany('cases', ['micro', 'so-phong', 'hoan-tien']);
    selectMany('sources', ['canon', 'proposal']);
    doc.querySelector('[data-view="windows"]').click();
    assert.match(doc.getElementById('content').textContent, /Không có hạn theo lịch/);
    assert.match(doc.getElementById('content').textContent, /Khoảng kích hoạt · đề xuất/);
    assert.match(doc.getElementById('content').textContent, /03\/12\/2024/);
    selectMany('sources', []);
    assert.ok(doc.querySelector('[data-reset]'));
    doc.querySelector('[data-reset]').click();
    assert.ok(doc.querySelectorAll('.event-row').length > 0);
    assert.deepEqual(errors, []);
  } finally { dom.window.close(); }
});
