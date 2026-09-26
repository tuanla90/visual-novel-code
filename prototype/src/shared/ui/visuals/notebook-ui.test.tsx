/**
 * Hồ sơ tông giấy (QĐ-026, QĐ-037, QĐ-050, QĐ-051):
 * - thẻ đã hủy KHÔNG có tên/mã trong DOM (bảng lẫn mô tả) — không chỉ làm mờ;
 * - thẻ kết quả truy vấn: SQL + bảng thu gọn + số dòng; ev-quan-fixed có câu trước/sau + "24 → 2";
 * - "Câu hỏi còn mở" đến hết Phần 4, "Lưu ý" từ Phần 5; chữ trong dấu ` hiện dạng chữ mã.
 */
import { render, screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it } from 'vitest';
import { realContent } from '../../../content/real';
import { SHORTLIST_ANNOTATION } from '../../../content/real/story/ending';
import { EvidenceNotebook } from '../../../evidence/ui/EvidenceNotebook';
import type { EvidenceAnnotation, SavedQueryEvidence } from '../../../evidence/types';
import type { EvidenceId, PartId, QueryEvidenceId } from '../../ids';

const SHORTLIST: SavedQueryEvidence = {
  id: 'ev-c3-shortlist',
  challengeId: 'c3',
  sql: "SELECT ma_sv, ho_dem, ten, ma_lop, clb\nFROM sinh_vien\nWHERE ten LIKE 'H%'\n  AND ma_lop IN ('KT24A', 'QT24B')\n  AND clb = 'Báo chí';",
  columns: ['ma_sv', 'ho_dem', 'ten', 'ma_lop', 'clb'],
  rows: [
    ['SV240317', 'Lê Thị', 'Hoài', 'QT24B', 'Báo chí'],
    ['SV240228', 'Phạm Minh', 'Hiếu', 'KT24A', 'Báo chí'],
  ],
  rowCount: 2,
  savedAt: 1,
};

const NAMES_H: SavedQueryEvidence = {
  id: 'ev-c1-names-h',
  challengeId: 'c1',
  sql: "SELECT ma_sv, ho_dem, ten FROM sinh_vien WHERE ten LIKE 'H%';",
  columns: ['ma_sv', 'ho_dem', 'ten'],
  rows: Array.from({ length: 10 }, (_, i) => [`SV2400${i}`, 'Nguyễn Văn', `Hải${i}`]),
  rowCount: 10,
  savedAt: 1,
};

const FIXED: SavedQueryEvidence = {
  id: 'ev-quan-fixed',
  challengeId: 'debrief-fix',
  sql: "SELECT ma_sv, ho_dem, ten\nFROM sinh_vien\nWHERE ten LIKE 'H%'\n  AND ma_lop IN ('KT24A', 'QT24B')\n  AND clb = 'Báo chí';",
  columns: ['ma_sv', 'ho_dem', 'ten'],
  rows: [
    ['SV240317', 'Lê Thị', 'Hoài'],
    ['SV240228', 'Phạm Minh', 'Hiếu'],
  ],
  rowCount: 2,
  savedAt: 2,
  before: { sql: "SELECT ma_sv, ho_dem, ten\nFROM sinh_vien\nWHERE ten LIKE 'H%'\n  OR ma_lop IN ('KT24A', 'QT24B')\n  OR clb = 'Báo chí';", rowCount: 24 },
};

function renderNotebook(opts: { part: PartId; unlocked: EvidenceId[]; saved?: Partial<Record<QueryEvidenceId, SavedQueryEvidence>>; annotations?: EvidenceAnnotation[] }) {
  return render(
    <EvidenceNotebook
      open
      onClose={() => {}}
      content={realContent}
      part={opts.part}
      unlocked={opts.unlocked}
      savedQueries={opts.saved ?? {}}
      annotations={opts.annotations ?? []}
    />,
  );
}

const REDACT: EvidenceAnnotation = { evidenceId: 'ev-c3-shortlist', note: SHORTLIST_ANNOTATION, redact: true, at: 3 };

describe('Hồ sơ: thẻ đã hủy (QĐ-050)', () => {
  it('không còn tên/mã sinh viên trong DOM của thẻ (bảng, mô tả, nhãn); có vạch che + dòng lý do', () => {
    const { container } = renderNotebook({ part: 'ending', unlocked: ['ev-c3-shortlist'], saved: { 'ev-c3-shortlist': SHORTLIST }, annotations: [REDACT] });
    const card = container.querySelector('.card--query');
    expect(card).not.toBeNull();
    const html = card?.innerHTML ?? '';
    // Tên: không ở đâu trong Hồ sơ (kể cả chú thích — chú thích không nêu tên).
    for (const name of ['Lê Thị', 'Hoài', 'Phạm Minh', 'Hiếu']) expect(container.innerHTML, name).not.toContain(name);
    // Mã sinh viên: không ở bảng/mô tả/nhãn; chỉ chú thích nguyên văn của kịch bản được nhắc (xem báo cáo).
    const withoutAnnotation = html.replace(/<ul class="card__annotations">[\s\S]*<\/ul>/, '');
    for (const code of ['SV240317', 'SV240228']) expect(withoutAnnotation, code).not.toContain(code);
    expect(card?.querySelector('.card__table--redacted')).not.toBeNull();
    expect(card?.querySelectorAll('.card__redacted-cell').length).toBe(SHORTLIST.rows.length * SHORTLIST.columns.length);
    expect(card?.querySelector('.card__table--redacted td')?.textContent).toBe('');
    expect(within(card as HTMLElement).getByText('Tên và mã đã hủy khi quyền truy cập kết thúc.')).toBeInTheDocument();
    expect(within(card as HTMLElement).getByText(/Danh sách đã hủy khi quyền truy cập kết thúc/)).toBeInTheDocument();
  });

  it('chưa hủy thì thẻ hiện mô tả (chữ mã qua CodeText, không lộ dấu `) + bảng + số dòng', () => {
    const { container } = renderNotebook({ part: 'debrief', unlocked: ['ev-c3-shortlist'], saved: { 'ev-c3-shortlist': SHORTLIST } });
    const card = container.querySelector('.card--query') as HTMLElement;
    expect(card.textContent).toContain('Lê Thị Hoài');
    expect(card.textContent).not.toContain('`');
    expect(card.querySelector('.card__body code.code-text')).not.toBeNull();
    expect(within(card).getByText('2 dòng')).toBeInTheDocument();
    expect(card.querySelector('.card__sql')?.textContent).toContain("ten LIKE 'H%'");
  });
});

describe('Hồ sơ: thẻ kết quả truy vấn', () => {
  it('bảng dài thu gọn còn 5 dòng; nút đổi nhãn theo trạng thái, xem đủ được', async () => {
    const user = userEvent.setup();
    const { container } = renderNotebook({ part: 'analysis', unlocked: ['ev-c1-names-h'], saved: { 'ev-c1-names-h': NAMES_H } });
    expect(container.querySelectorAll('.card__table tbody tr')).toHaveLength(5);
    const more = screen.getByRole('button', { name: 'Xem đủ 10 dòng' });
    expect(more).toHaveAttribute('aria-expanded', 'false');
    await user.click(more);
    expect(container.querySelectorAll('.card__table tbody tr')).toHaveLength(10);
    expect(screen.getByRole('button', { name: 'Thu gọn còn 5 dòng' })).toHaveAttribute('aria-expanded', 'true');
  });

  it('ev-quan-fixed: câu trước/sau khi sửa và dải 24 → 2 lấy từ dữ liệu đã lưu', () => {
    const { container } = renderNotebook({ part: 'debrief', unlocked: ['ev-quan-fixed'], saved: { 'ev-quan-fixed': FIXED } });
    const card = container.querySelector('.card--query') as HTMLElement;
    expect(card.querySelector('.card__compare-num--before')?.textContent).toBe('24');
    expect(card.querySelector('.card__compare-num--after')?.textContent).toBe('2');
    const sqls = Array.from(card.querySelectorAll('.card__sql')).map((p) => p.textContent ?? '');
    expect(sqls).toHaveLength(2);
    expect(sqls[0]).toContain('OR ma_lop');
    expect(sqls[1]).toContain('AND ma_lop');
    expect(card.textContent).toContain('Trước khi sửa · 24 dòng');
    expect(card.textContent).toContain('Sau khi sửa · 2 dòng');
  });
});

describe('Hồ sơ: ba nhóm, ghi chú theo phần, chữ mã', () => {
  it('ba nhóm theo thứ tự Manh mối · Tài liệu · Kết quả truy vấn', () => {
    renderNotebook({ part: 'analysis', unlocked: ['ev-c1-names-h', 'doc-letter', 'clue-signature-h'], saved: { 'ev-c1-names-h': NAMES_H } });
    const titles = screen.getAllByRole('heading', { level: 3 }).map((h) => h.textContent);
    expect(titles).toEqual(['Manh mối (1)', 'Tài liệu (1)', 'Kết quả truy vấn (1)']);
  });

  it('Phần 4: "Câu hỏi còn mở", không "Lưu ý"; Phần 5: "Lưu ý", không "Câu hỏi còn mở"', () => {
    const { container, unmount } = renderNotebook({ part: 'debrief', unlocked: ['clue-signature-h', 'doc-letter'] });
    expect(container.textContent).toContain('Câu hỏi còn mở:');
    expect(container.textContent).not.toContain('Lưu ý:');
    unmount();
    const later = renderNotebook({ part: 'ending', unlocked: ['clue-signature-h', 'doc-letter'] });
    expect(later.container.textContent).toContain('Lưu ý:');
    expect(later.container.textContent).not.toContain('Câu hỏi còn mở:');
  });

  it('chữ trong dấu ` của manh mối hiện dạng chữ mã; không lộ dấu ` hay định danh thô', () => {
    const { container } = renderNotebook({ part: 'investigation', unlocked: ['clue-signature-h', 'clue-box-building-b'] });
    expect(container.textContent).not.toContain('`');
    const codes = Array.from(container.querySelectorAll('code.code-text')).map((c) => c.textContent);
    expect(codes).toEqual(expect.arrayContaining(['ten', 'ho_dem', 'sinh_vien']));
    expect(container.textContent).not.toMatch(/clue-|doc-|ev-/);
  });
});
