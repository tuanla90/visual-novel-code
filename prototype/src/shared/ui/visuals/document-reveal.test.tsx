/**
 * Màn tài liệu (QĐ-026, QĐ-060): chữ tài liệu do giao diện chồng lên (có trong DOM, đọc được), nền
 * giấy gắn ô ảnh theo mã tài liệu, không định danh thô trên màn hình, nút cất vào hồ sơ gọi onClose.
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, it, vi } from 'vitest';
import { realEvidence } from '../../../content/real/evidence';
import { DocumentReveal } from '../../../evidence/ui/DocumentReveal';
import { DOCUMENT_IDS } from '../../ids';
import { artUrl } from './art-slots';

describe('DocumentReveal', () => {
  it.each(DOCUMENT_IDS)('%s: tiêu đề, nguồn, toàn bộ chữ tài liệu hiện bằng giao diện; nền giấy gắn đúng ô', (id) => {
    const doc = realEvidence.documents[id];
    const { container } = render(<DocumentReveal document={doc} onClose={() => {}} />);
    expect(screen.getByRole('dialog', { name: doc.title })).toBeInTheDocument();
    expect(container.textContent).toContain(doc.source);
    const body = Array.isArray(doc.body) ? doc.body : [doc.body];
    const shown = (container.textContent ?? '').replace(/\s+/g, ' ');
    for (const p of body) expect(shown).toContain(p.replace(/`/g, '').replace(/\s+/g, ' '));
    if (doc.extra) expect(shown).toContain(doc.extra.replace(/`/g, ''));
    const slot = container.querySelector(`[data-art-slot="${id}"]`);
    expect(slot).not.toBeNull();
    expect(slot?.getAttribute('data-art-source')).toBe(artUrl(id) ? 'image' : 'placeholder');
    // Không định danh thô trong chữ hiện ra hay nhãn.
    expect(container.textContent).not.toContain(id);
    for (const el of Array.from(container.querySelectorAll('[aria-label]'))) expect(el.getAttribute('aria-label')).not.toContain(id);
    // Hình vẽ tạm là trang trí: không có chữ bên trong SVG.
    for (const svg of Array.from(container.querySelectorAll('svg'))) {
      expect(svg.getAttribute('aria-hidden')).toBe('true');
      expect(svg.querySelector('text')).toBeNull();
    }
  });

  it('bookmark: chữ in trên bookmark lấy từ nội dung, chồng bằng giao diện và ẩn khỏi trình đọc (chú thích đã đọc)', () => {
    const { container } = render(<DocumentReveal document={realEvidence.documents['doc-bookmark']} onClose={() => {}} />);
    const print = container.querySelector('.docview__bookmark-print');
    expect(print?.textContent).toBe('…ÁO CHÍ');
    expect(print?.getAttribute('aria-hidden')).toBe('true');
    expect(container.querySelector('figcaption')?.textContent).toContain('"…ÁO CHÍ"');
  });

  it('nút "Cất vào hồ sơ" gọi onClose; thiếu nội dung thì nói đúng lý do', async () => {
    const user = userEvent.setup();
    const onClose = vi.fn();
    render(<DocumentReveal document={undefined} onClose={onClose} />);
    expect(screen.getByText('Thẻ tài liệu này chưa được viết trong nội dung.')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Cất vào hồ sơ' }));
    expect(onClose).toHaveBeenCalledTimes(1);
  });
});
