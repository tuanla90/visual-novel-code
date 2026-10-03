import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';

export async function buildHighlightLexicon(root, model) {
  const dir = path.join(root, 'prototype/noi-dung-mvp');
  const entries = new Map();
  const sources = [];
  const add = (text, category, canonical = text) => {
    text = text.replace(/\{[^}]*\}/g, '').replace(/[“”"`\[\]]/g, '').replace(/\s+/g, ' ').trim();
    if (text.length < 3 || /^\d+$/.test(text) || text.includes('{{')) return;
    entries.set(`${category}:${text.toLocaleLowerCase('vi')}`, { text, category, canonical });
  };
  for (const file of ['nhan-vat.md', 'canh.md', 'dia-diem.md']) {
    const body = await readFile(path.join(dir, file), 'utf8');
    sources.push(`prototype/noi-dung-mvp/${file}`);
    for (const [, , title, rest] of body.matchAll(/^###\s+([\w-]+)\s*[—–]\s*([^\r\n]+)\r?\n?([\s\S]*?)(?=^### |$(?![\s\S]))/gm)) {
      const category = file === 'nhan-vat.md' ? 'person' : 'place';
      add(title, category);
      if (category === 'person') {
        const fullName = rest.match(/^- Họ tên:\s*(.+)$/m)?.[1];
        if (fullName) add(fullName, category, title);
        const withoutHonorific = title.replace(/^(?:thầy|cô|bác|chú|chị|anh)\s+/i, '');
        if (withoutHonorific !== title) add(withoutHonorific, category, title);
      } else {
        add(title.replace(/,.*$/, '').replace(/^(?:Trong|Ngoài)\s+/i, '').replace(/\s+cổng trường$/i, '').replace(/\s+trường$/i, ''), category, title);
        add(title.replace(/\bCLB\s+/g, ''), category, title);
      }
    }
  }
  for (const file of (await readdir(path.join(dir, 'ho-so'))).filter((f) => f.endsWith('.md'))) {
    const body = await readFile(path.join(dir, 'ho-so', file), 'utf8');
    sources.push(`prototype/noi-dung-mvp/ho-so/${file}`);
    for (const [, title] of body.matchAll(/^- Tiêu đề:\s*(.+)$/gm)) {
      add(title, 'item');
      add(title.replace(/\s*\([^)]*\)/g, ''), 'item', title);
    }
    for (const [, id, title] of body.matchAll(/^###\s+([\w-]+)\s*[—–]\s*([^\r\n]+)/gm)) {
      add(title, 'item');
      add(id, 'item', title);
      add(title.replace(/\s*\([^)]*\)/g, '').replace(/^Bản (?:xuất|chụp)\s+/i, ''), 'item', title);
    }
  }
  for (const event of model.events.filter((e) => e.kind === 'evidence')) {
    for (const { record } of event.records ?? []) {
      for (const [key, value] of Object.entries(record)) {
        if (/^ma_(?:don|chi|phien|phieu|tin|bai|luot|tai_san|tham_chieu)$/.test(key) || ['linh_kien', 'ten_tep'].includes(key)) add(value, 'item');
      }
    }
  }
  return { entries: [...entries.values()], sources };
}
