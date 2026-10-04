import test from 'node:test';
import assert from 'node:assert/strict';
import { createRequire } from 'node:module';
import { readFile } from 'node:fs/promises';
import { Engine } from '../../prototype/src/shared/highlight/engine.js';
const { JSDOM } = createRequire(new URL('../../prototype/package.json', import.meta.url))('jsdom');
const engine = new Engine([
  { text: 'Nam', category: 'person' }, { text: 'Hà Vy', category: 'person' },
  { text: 'Trần Tùng', category: 'person' }, { text: 'Tùng', category: 'person' },
  { text: 'Phòng CLB', category: 'place' }, { text: 'Lá thư', category: 'item' },
  { text: 'CHI-002', category: 'item' },
]);
test('recognizes Unicode names, longest phrases, dates, places and evidence without partial matches', () => {
  const tokens = engine.tokenize('Trần Tùng và Hà Vy gặp Nam ở Phòng CLB ngày 20/10/2024 lúc 08:30, đọc Lá thư CHI-002. Việt Nam, miền Nam, nam, Nameless.');
  assert.deepEqual(tokens.map(t => t.text), ['Trần Tùng', 'Hà Vy', 'Nam', 'Phòng CLB', 'ngày 20/10/2024', '08:30', 'Lá thư', 'CHI-002']);
  assert.equal(engine.tokenize('Hà Vy'.normalize('NFD'))[0].category, 'person');
  assert.equal(engine.tokenize('20/10/2024')[0].category, 'time');
  assert.equal(engine.tokenize('Hà Vy và Lá thư', ['item']).length, 1);
});
test('DOM highlighting is reversible and preserves text, links, code and expanded details', () => {
  const dom = new JSDOM('<main><details open><summary>Hà Vy</summary><p>Nam đọc Lá thư &lt;img&gt;</p></details><a href="/Nam">Nam</a><code>Lá thư</code></main>');
  const root = dom.window.document.querySelector('main'), original = root.textContent;
  assert.equal(engine.apply(root), 3);
  assert.equal(engine.apply(root), 3);
  assert.equal(root.querySelectorAll('[data-highlight] [data-highlight]').length, 0);
  assert.equal(root.textContent, original);
  assert.equal(root.querySelector('img'), null);
  assert.equal(root.querySelector('a').innerHTML, 'Nam');
  assert.equal(root.querySelector('code').innerHTML, 'Lá thư');
  assert.equal(root.querySelector('details').open, true);
  engine.apply(root, []);
  assert.equal(root.querySelectorAll('[data-highlight]').length, 0);
  assert.equal(root.textContent, original);
});
test('standalone timeline toggles categories and retains selection after grouping', async () => {
  const html = await readFile(new URL('../../docs/mvp/timeline-mua-1.html', import.meta.url), 'utf8');
  const dom = new JSDOM(html, { runScripts: 'dangerously' });
  const d = dom.window.document;
  assert.ok(d.querySelectorAll('#content [data-highlight]').length > 0);
  const person = d.querySelector('#highlight-options input[value="person"]');
  person.checked = false; person.dispatchEvent(new dom.window.Event('change', { bubbles: true }));
  assert.equal(d.querySelectorAll('#content [data-highlight="person"]').length, 0);
  const group = d.querySelector('#group'); group.value = 'month'; group.dispatchEvent(new dom.window.Event('change'));
  assert.equal(d.querySelectorAll('#content [data-highlight="person"]').length, 0);
  d.querySelector('#highlight-toggle').click();
  assert.equal(d.querySelectorAll('#content [data-highlight]').length, 0);
  d.querySelector('#highlight-toggle').click();
  assert.ok(d.querySelectorAll('#content [data-highlight="person"]').length > 0);
  dom.window.close();
});
