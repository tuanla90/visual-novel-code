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
  it('nút kịch bản: hai điều kiện ten = Tùng VÀ nganh = Du lịch, lấy ô ma_sv', () => {
    expect(NUT).toMatchObject({ sql: expect.stringMatching(/WHERE ten = 'Tùng' AND nganh = 'Du lịch'/), soDong: 1, chon: { cot: 'ma_sv', giaTri: 'SV240251' } });
  });

  it('chưa hiện SQL, không nút chạy; hai hàng điều kiện (ten, nganh); con số là cả danh sách', async () => {
    ve();
    const vung = screen.getByRole('region', { name: 'Lọc danh sách' });
    expect(vung.textContent).not.toMatch(/SELECT|WHERE/);
    expect(screen.queryByRole('button', { name: /CHẠY/ })).toBeNull();
    expect([...vung.querySelectorAll('.v7-o--cot')].map((e) => e.textContent)).toEqual(['ten', 'nganh']);
    await waitFor(() => expect(Number(vung.querySelector('.v7-so__n')?.textContent)).toBeGreaterThan(3));
  });

  it('thả thẻ Tùng → còn 3 người, chưa bấm ô được; thả thẻ Du lịch → còn 1 người', async () => {
    const { u } = ve();
    const o = screen.getByRole('button', { name: 'Ô giá trị của cột ten' });
    await u.click(o);
    expect(screen.queryByRole('table')).toBeNull();
    // Ô ngành chưa tới lượt.
    expect(screen.getByRole('button', { name: 'Ô giá trị của cột nganh' })).toBeDisabled();
    await u.click(screen.getByRole('button', { name: 'Thẻ Tùng' }));
    await u.click(o);
    const bang = await screen.findByRole('table');
    expect(within(bang).getAllByRole('row')).toHaveLength(1 + 3);
    expect(within(bang).queryByRole('button')).toBeNull();
    expect(screen.getByRole('button', { name: 'Đang lọc: ten bằng Tùng' })).toBeDisabled();
    await u.click(screen.getByRole('button', { name: 'Thẻ Du lịch' }));
    await u.click(screen.getByRole('button', { name: 'Ô giá trị của cột nganh' }));
    await waitFor(() => expect(within(screen.getByRole('table')).getAllByRole('row')).toHaveLength(1 + 1));
    expect(document.querySelector('.v7-so__n')).toHaveTextContent('1');
  });

  it('bấm ô khác cột mã → ô gạch, có lời nhắc cột, chưa gọi onChon; bấm ô mã → chép ra giấy nhớ rồi onChon(mã)', async () => {
    const { onChon, u } = ve();
    await u.click(screen.getByRole('button', { name: 'Thẻ Tùng' }));
    await u.click(screen.getByRole('button', { name: 'Ô giá trị của cột ten' }));
    await screen.findByRole('table');
    await u.click(screen.getByRole('button', { name: 'Thẻ Du lịch' }));
    await u.click(screen.getByRole('button', { name: 'Ô giá trị của cột nganh' }));
    const oTen = await screen.findByRole('button', { name: 'Ô ten: Tùng' });
    await u.click(oTen);
    expect(oTen).toHaveClass('is-sai');
    expect(onChon).not.toHaveBeenCalled();
    expect(screen.getByText(/Cái cần lấy nằm ở cột ma_sv/)).toBeInTheDocument();
    await u.click(screen.getByRole('button', { name: 'Ô ma_sv: SV240251' }));
    expect(screen.getByRole('status', { name: 'Giấy nhớ mới: SV240251' })).toBeInTheDocument();
    await waitFor(() => expect(onChon).toHaveBeenCalledWith('SV240251'), { timeout: 3000 });
  });
});
