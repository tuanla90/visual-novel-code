/* Reusable text/DOM highlighter: safe text nodes, Unicode boundaries, no nested spans. */
  const categories = { person: 'Tên người', time: 'Thời gian', place: 'Địa điểm', item: 'Vật phẩm / chứng cứ' };
  const word = /[\p{L}\p{M}\p{N}_]/u;
  const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const timePattern = /(?:\b20\d{2}-(?:0[1-9]|1[0-2])-(?:0[1-9]|[12]\d|3[01])(?:[ T](?:[01]\d|2[0-3]):[0-5]\d)?\b|\b(?:0?[1-9]|[12]\d|3[01])\/(?:0?[1-9]|1[0-2])(?:\/(?:20\d{2}|\d{2}))?\b|\b(?:[01]?\d|2[0-3]):[0-5]\d(?:[–—-](?:[01]?\d|2[0-3]):[0-5]\d)?\b|(?:thứ\s+(?:Hai|Ba|Tư|Năm|Sáu|Bảy)|Chủ\s+nhật|ngày\s+(?:mai|hôm\s+sau|\d+(?:\/\d{1,2}(?:\/\d{2,4})?)?)|hôm\s+nay|tháng\s+\d{1,2}|tuần\s+\d+|trưa\s+hôm\s+sau)|\b(?:T[2-7]|CN)\b|\b(?:[01]?\d|2[0-3])\s*giờ(?:\s*rưỡi|\s*kém\s*\d{1,2}|\s*[0-5]?\d(?:\s*phút)?)?(?![\p{L}\p{N}])|\b(?:[01]?\d|2[0-3])h(?:[0-5]\d)?\b)/giu;
  class Engine {
    constructor(entries = []) {
      this.dictionary = new Map();
      const groups = new Map();
      entries.forEach(({ text, category, canonical }) => {
        const clean = text?.trim();
        if (!categories[category] || !clean) return;
        for (const variant of new Set([clean.normalize('NFC'), clean.normalize('NFD')])) {
          this.dictionary.set(category + ':' + variant.toLocaleLowerCase('vi'), canonical ?? clean);
          if (!groups.has(category)) groups.set(category, []);
          groups.get(category).push(variant);
        }
      });
      this.patterns = [...groups].map(([category, terms]) => ({ category, regex: new RegExp([...new Set(terms)].sort((a, b) => b.length - a.length).map(escapeRegex).join('|'), 'giu') }));
    }
    tokenize(text, enabled = Object.keys(categories)) {
      const active = new Set(enabled);
      const candidates = [];
      for (const { category, regex } of [...this.patterns, { category: 'time', regex: timePattern }]) {
        if (!active.has(category)) continue;
        regex.lastIndex = 0;
        for (const match of text.matchAll(regex)) {
          const start = match.index, end = start + match[0].length;
          if ((start && word.test(text[start - 1])) || (end < text.length && word.test(text[end]))) continue;
          if (category === 'person' && /^nam$/i.test(match[0]) && /(?:Việt|phía|miền)\s+$/iu.test(text.slice(Math.max(0, start - 12), start))) continue;
          // A short personal name must retain its capital letter; place/item phrases remain case insensitive.
          if (category === 'person' && !match[0].includes(' ') && match[0][0] === match[0][0].toLocaleLowerCase('vi')) continue;
          candidates.push({ start, end, category, text: match[0], canonical: this.dictionary.get(category + ':' + match[0].toLocaleLowerCase('vi')) ?? match[0] });
        }
      }
      const priority = { person: 0, place: 1, item: 2, time: 3 };
      candidates.sort((a, b) => a.start - b.start || b.end - a.end || priority[a.category] - priority[b.category]);
      const result = []; let end = 0;
      for (const token of candidates) if (token.start >= end) { result.push(token); end = token.end; }
      return result;
    }
    clear(root) {
      const parents = new Set();
      root.querySelectorAll('span[data-highlight]').forEach((span) => { parents.add(span.parentNode); span.replaceWith(root.ownerDocument.createTextNode(span.textContent)); });
      parents.forEach((parent) => parent.normalize());
    }
    apply(root, enabled = Object.keys(categories)) {
      this.clear(root);
      if (!enabled.length) return 0;
      const doc = root.ownerDocument;
      const walker = doc.createTreeWalker(root, 4);
      const nodes = []; let node;
      while ((node = walker.nextNode())) {
        if (!node.textContent.trim() || node.parentElement.closest('script,style,code,pre,a,input,textarea,select,button,.tags,.source-links,[data-no-highlight]')) continue;
        nodes.push(node);
      }
      let count = 0;
      for (const node of nodes) {
        const tokens = this.tokenize(node.textContent, enabled);
        if (!tokens.length) continue;
        const fragment = doc.createDocumentFragment(); let last = 0;
        for (const token of tokens) {
          fragment.append(doc.createTextNode(node.textContent.slice(last, token.start)));
          const span = doc.createElement('span');
          span.dataset.highlight = token.category; span.className = 'hl hl-' + token.category;
          span.title = categories[token.category] + ': ' + token.canonical;
          span.textContent = token.text; fragment.append(span); last = token.end; count++;
        }
        fragment.append(doc.createTextNode(node.textContent.slice(last))); node.replaceWith(fragment);
      }
      return count;
    }
  }
export { Engine, categories };
