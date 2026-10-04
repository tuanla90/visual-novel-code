import { readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';
import { buildSourceModel, applyPlan } from './source-model.mjs';
import { buildHighlightLexicon } from './highlight-lexicon.mjs';

const here = path.dirname(fileURLToPath(import.meta.url));
const root = path.resolve(here, '../..');
const model = await buildSourceModel(root);
const plan = JSON.parse(await readFile(path.join(root, 'docs/mvp/timeline-mua-1.plan.json'), 'utf8'));
applyPlan(model, plan);
const data = {
  cases: model.cases,
  events: model.events,
  findings: model.findings,
  sources: [...model.sources, 'docs/mvp/timeline-mua-1.plan.json'],
  rowCount: model.rowCount,
  calendarNotes: JSON.parse(await readFile(path.join(root, 'docs/mvp/timeline-mua-1.calendar.json'), 'utf8')).marks,
};
data.sources.push('docs/mvp/timeline-mua-1.calendar.json');
const lexicon = await buildHighlightLexicon(root, model);
data.highlightTerms = lexicon.entries;
data.sources = [...new Set([...data.sources, ...lexicon.sources])];
const [template, styles, script, sharedEngine] = await Promise.all([
  ...['template.html', 'timeline.css', 'timeline-ui.js'].map((f) => readFile(path.join(here, f), 'utf8')),
  readFile(path.join(root, 'prototype/src/shared/highlight/engine.js'), 'utf8'),
]);
const highlightScript = sharedEngine.replace('export { Engine, categories };', 'const TimelineHighlight = { Engine, categories };');
const html = template.replace('/* TIMELINE_STYLES */', () => styles)
  .replace('/* TIMELINE_DATA */', () => JSON.stringify(data).replace(/</g, '\\u003c'))
  .replace('/* TIMELINE_SCRIPT */', () => highlightScript + '\n' + script);
const output = path.join(root, 'docs/mvp/timeline-mua-1.html');
await writeFile(output, html, 'utf8');
console.log(`Generated ${path.relative(root, output)}: ${model.events.length} decision events, ${model.cases.length} case groups, ${model.findings.length} scheduling findings.`);
