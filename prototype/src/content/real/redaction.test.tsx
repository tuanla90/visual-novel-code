/**
 * QĐ-050 + QĐ-062: sau end-03 (hết quyền truy cập), KHÔNG thẻ hồ sơ nào render họ tên / mã sinh viên
 * của dataset trong DOM — trừ tài liệu doc-handover-log (tài liệu của cán bộ, giữ mã theo thiết kế).
 * Chơi thật trên nội dung thật: nhảy tới đầu Kết (vật chứng tự điền bằng SQL chuẩn qua engine thật),
 * đi tiếp end-01 → end-03 bằng API công khai của store, rồi dựng Hồ sơ từ đúng trạng thái đó.
 */
import { render } from '@testing-library/react';
import { beforeEach, describe, expect, it } from 'vitest';
import { jumpToPartStart } from '../../app/facilitator-mode';
import { EvidenceNotebook } from '../../evidence/ui/EvidenceNotebook';
import { createGameStore } from '../../shared/store/store';
import { configureSessionMeta } from '../../shared/telemetry/session-meta';
import { clearTelemetry } from '../../shared/telemetry/track';
import { runQuery } from '../../sql-challenge/engine';
import { realContent } from '.';

/** Chơi tới cổng "Về phòng CLB" của end-03 (ngay sau các node annotate-evidence). */
async function playPastEnd03() {
  const store = createGameStore({ content: realContent, persist: false });
  const jumped = await jumpToPartStart('ending', { store, content: realContent, run: runQuery });
  if (!jumped.ok) throw new Error(jumped.reason);
  const s = () => store.getState();
  for (let step = 0; step < 200; step++) {
    const view = s().getView();
    if (!view) throw new Error('không đọc được màn');
    if (view.kind === 'gate' && view.sequence?.id === 'end-03') return store;
    let rejected: string | undefined;
    if (view.kind === 'line' || view.kind === 'feedback') rejected = s().dispatchStory({ type: 'advance' });
    else if (view.kind === 'show-document' || view.kind === 'effect' || view.kind === 'projector') rejected = s().dispatchStory({ type: 'complete' });
    else throw new Error(`màn bất ngờ trước cổng end-03: ${view.kind}`);
    if (rejected) throw new Error(rejected);
  }
  throw new Error('không tới được cổng end-03');
}

async function personalData(): Promise<{ codes: string[]; fullNames: string[]; nameParts: string[] }> {
  const r = await runQuery('SELECT ma_sv, ho_dem, ten FROM sinh_vien');
  if (!r.ok) throw new Error(r.message);
  const rows = r.rows.map((row) => row.map(String) as [string, string, string]);
  return {
    codes: rows.map(([code]) => code),
    fullNames: rows.map(([, hoDem, ten]) => `${hoDem} ${ten}`),
    nameParts: [...new Set(rows.flatMap(([, hoDem, ten]) => [hoDem, ten]))],
  };
}

/** Mọi chữ hiện ra + mọi thuộc tính (aria-label, title…) của một phần tử. */
function textsOf(el: Element): string[] {
  const out: string[] = [];
  const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
  for (let n = walker.nextNode(); n; n = walker.nextNode()) out.push(n.textContent ?? '');
  for (const node of [el, ...Array.from(el.querySelectorAll('*'))]) for (const a of Array.from(node.attributes)) out.push(a.value);
  return out;
}

describe('hết quyền truy cập (end-03): không thẻ nào còn tên/mã sinh viên (QĐ-050, QĐ-062)', () => {
  beforeEach(() => {
    clearTelemetry();
    configureSessionMeta(null);
  });

  it('trạng thái: cờ hết quyền; chú thích hủy cho đúng ba thẻ có dữ liệu cá nhân, không nêu mã sinh viên', { timeout: 30_000 }, async () => {
    const store = await playPastEnd03();
    const { evidence, progress } = store.getState();
    expect(progress?.flags).toContain('access-revoked');
    expect(evidence.annotations.filter((a) => a.redact).map((a) => a.evidenceId).sort()).toEqual(['ev-c1-names-h', 'ev-c3-shortlist', 'ev-quan-fixed']);
    expect(evidence.annotations.some((a) => a.evidenceId === 'ev-c2-classes-b')).toBe(false);
    for (const a of evidence.annotations) expect(a.note, a.evidenceId).not.toMatch(/SV\d{6}/);
  });

  it('DOM Hồ sơ: mọi thẻ trừ sổ bàn giao không có họ tên/mã; ev-c2-classes-b giữ; ev-quan-fixed vẫn "24 → 2"', { timeout: 30_000 }, async () => {
    const store = await playPastEnd03();
    const { evidence } = store.getState();
    const { container } = render(
      <EvidenceNotebook
        open
        onClose={() => {}}
        content={realContent}
        part="ending"
        unlocked={evidence.unlocked}
        savedQueries={evidence.savedQueries}
        annotations={evidence.annotations}
      />,
    );
    const cards = Array.from(container.querySelectorAll('article.card'));
    expect(cards.length).toBe(evidence.unlocked.length);
    const handoverTitle = realContent.evidence.documents['doc-handover-log'].title;
    const data = await personalData();
    let checked = 0;
    for (const card of cards) {
      const title = card.querySelector('.card__title')?.textContent ?? '';
      if (title === handoverTitle) continue; // tài liệu của cán bộ: giữ mã theo thiết kế
      const texts = textsOf(card);
      const joined = texts.join('\n');
      for (const code of data.codes) expect(joined, `${title}: mã ${code}`).not.toContain(code);
      for (const name of data.fullNames) expect(joined, `${title}: họ tên ${name}`).not.toContain(name);
      // Họ đệm / tên đứng riêng một ô (bảng) — so khớp cả chuỗi chữ để không bắt nhầm chữ thường.
      for (const t of texts.map((x) => x.trim())) expect(data.nameParts, `${title}: ô "${t}"`).not.toContain(t);
      checked++;
    }
    expect(checked).toBe(cards.length - 1);

    const redacted = Array.from(container.querySelectorAll('.card--redacted')).map((c) => c.querySelector('.card__title')?.textContent);
    const titleOf = (id: 'ev-c1-names-h' | 'ev-c2-classes-b' | 'ev-c3-shortlist' | 'ev-quan-fixed') =>
      Object.values(realContent.challenges).find((d) => d.content.evidence.id === id)?.content.evidence.title;
    expect(redacted.sort()).toEqual([titleOf('ev-c1-names-h'), titleOf('ev-c3-shortlist'), titleOf('ev-quan-fixed')].sort());
    const c2 = cards.find((c) => c.querySelector('.card__title')?.textContent === titleOf('ev-c2-classes-b'));
    expect(c2?.classList.contains('card--redacted')).toBe(false);
    expect(c2?.textContent).toContain('QT24B');

    // ev-quan-fixed: dải "24 → 2" vẫn hiện số dòng.
    const fixed = cards.find((c) => c.querySelector('.card__title')?.textContent === titleOf('ev-quan-fixed'));
    expect(fixed?.querySelector('.card__compare-num--before')?.textContent).toBe('24');
    expect(fixed?.querySelector('.card__compare-num--after')?.textContent).toBe('2');
    expect(fixed?.querySelector('.card__table--redacted')).not.toBeNull();
  });
});
