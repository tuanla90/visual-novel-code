/**
 * Lọc thử ở Ngày hội (`[LỌC THỬ]`, ĐÃ CHỐT C 30/09/2026) với nút kịch bản THẬT `lt-ngay-hoi`: chưa hiện SQL, không nút
 * chạy, không câu hướng dẫn; bấm thẻ [Tùng] rồi bấm ô → danh sách còn 3 người; bấm một dòng gọi `onChon(ngành)`; bấm
 * nhầm thì dòng gạch (`is-sai`), thử lại được.
 */
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { NutMvp } from '../../../content/mvp/types';
import { KICH_BAN as kb } from '../../store/kho-mvp';
import { LocThuV7 } from './LocThuV7';

type NutLoc = Extract<NutMvp, { type: 'trial-filter' }>;

/** Tìm nút `[LỌC THỬ]` trong kịch bản (duyệt cây, không phụ thuộc chỗ đặt). */
function timNut(o: unknown, id: string): NutLoc | null {
  if (!o || typeof o !== 'object') return null;
  const x = o as Record<string, unknown>;
  if (x.type === 'trial-filter' && x.id === id) return x as unknown as NutLoc;
  for (const v of Object.values(x)) {
    const r = timNut(v, id);
    if (r) return r;
  }
  return null;
}
const NUT = timNut(kb, 'lt-ngay-hoi');

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
});

function ve() {
  if (!NUT) throw new Error('kịch bản thiếu [LỌC THỬ] lt-ngay-hoi');
  const onChon = vi.fn();
  render(<LocThuV7 duLieu={kb.duLieu} nut={NUT} onChon={onChon} />);
  return { onChon, u: userEvent.setup() };
}

describe('lọc thử Ngày hội (v7)', () => {
  it('nút kịch bản có dạng … WHERE ten = \'Tùng\', chọn nganh = Du lịch', () => {
    expect(NUT).toMatchObject({ sql: expect.stringMatching(/WHERE ten = 'Tùng'/), soDong: 3, chon: { cot: 'nganh', giaTri: 'Du lịch' } });
  });

  it('chưa hiện SQL, không nút chạy; ô cột "ten"; con số là cả danh sách', async () => {
    ve();
    const vung = screen.getByRole('region', { name: 'Lọc danh sách' });
    expect(vung.textContent).not.toMatch(/SELECT|WHERE/);
    expect(screen.queryByRole('button', { name: /CHẠY/ })).toBeNull();
    expect(vung.querySelector('.v7-o--cot')).toHaveTextContent('ten');
    await waitFor(() => expect(Number(vung.querySelector('.v7-so__n')?.textContent)).toBeGreaterThan(3));
  });

  it('bấm ô khi chưa cầm thẻ → không gì xảy ra; bấm thẻ [Tùng] rồi bấm ô → còn 3 dòng, thẻ nằm trong ô', async () => {
    const { u } = ve();
    const o = screen.getByRole('button', { name: 'Ô giá trị của cột ten' });
    await u.click(o);
    expect(screen.queryByRole('table')).toBeNull();
    const the = screen.getByRole('button', { name: 'Thẻ Tùng' });
    await u.click(the);
    expect(the).toHaveAttribute('aria-pressed', 'true');
    await u.click(o);
    const bang = await screen.findByRole('table');
    expect(within(bang).getAllByRole('button', { name: /^Chọn dòng / })).toHaveLength(3);
    expect(screen.getByRole('button', { name: 'Đang lọc: ten bằng Tùng' })).toBeDisabled();
    expect(screen.queryByRole('button', { name: 'Thẻ Tùng' })).toBeNull();
    expect(document.querySelector('.v7-so__n')).toHaveTextContent('3');
  });

  it('bấm nhầm dòng → onChon(ngành của dòng đó), dòng gạch; bấm đúng dòng Du lịch → onChon("Du lịch")', async () => {
    const { onChon, u } = ve();
    await u.click(screen.getByRole('button', { name: 'Thẻ Tùng' }));
    await u.click(screen.getByRole('button', { name: 'Ô giá trị của cột ten' }));
    const dong = within(await screen.findByRole('table')).getAllByRole('button', { name: /^Chọn dòng / });
    const nham = dong.find((d) => !/Du lịch/.test(d.getAttribute('aria-label') ?? ''));
    const dung = dong.find((d) => /Du lịch/.test(d.getAttribute('aria-label') ?? ''));
    if (!nham || !dung) throw new Error('thiếu dòng');
    await u.click(nham);
    expect(onChon).toHaveBeenLastCalledWith(expect.not.stringMatching(/^Du lịch$/));
    expect(nham).toHaveClass('is-sai');
    expect(dung).not.toHaveClass('is-sai');
    // Bàn phím cũng chọn được.
    dung.focus();
    await u.keyboard('{Enter}');
    expect(onChon).toHaveBeenLastCalledWith('Du lịch');
    expect(dung).not.toHaveClass('is-sai');
  });
});
