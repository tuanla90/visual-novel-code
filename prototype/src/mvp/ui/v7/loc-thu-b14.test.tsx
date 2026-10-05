/**
 * Gói B14, hai góp ý của user ở màn LỌC THỬ (Ngày hội):
 * - "màn này tôi đã thấy có animation giảm từ 64 về 1 đâu": thẻ thứ hai thả khi bảng kết quả đã hiện thì hoạt cảnh đi TỪ BẢNG
 *   ĐANG HIỆN (dòng rụng khỏi bảng, dòng còn lại dồn lên: bảng mang lớp `v7-kq--don`), dùng chung `hoat-canh-bang.ts` với màn tra.
 * - "cần phải di chuyển sang bên trái để sát với rìa của laptop hơn": thẻ dán trên rìa trái của máy, cùng phép tính với giấy nhớ ở
 *   màn tra (mép trái thẻ = mép kính + 6 − bề ngang thẻ), không lấn vào màn hình.
 */
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { NutMvp } from '../../../content/mvp/types';
import { KICH_BAN as kb } from '../../store/kho-mvp';
import { CHONG_VIEN, RONG_GIAY, leGiay, traiGiay } from './giay-nho-quanh';
import { LocThuV7 } from './LocThuV7';

type NutLoc = Extract<NutMvp, { type: 'trial-filter' }>;
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
const KINH = { x: 90, y: 36, w: 1420, h: 740 };

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
});

function ve() {
  if (!NUT) throw new Error('kịch bản thiếu [LỌC THỬ] lt-ngay-hoi');
  render(<LocThuV7 duLieu={kb.duLieu} nut={NUT} onChon={vi.fn()} />);
  return userEvent.setup();
}

describe('lọc thử · gói B14', () => {
  it('thẻ dán trên rìa trái của máy: mép trái -40 (đè viền kính 6 đơn vị), không lấn vào màn hình; khung chừa lề cho thẻ', () => {
    ve();
    expect(traiGiay(KINH)).toBe(KINH.x + CHONG_VIEN - RONG_GIAY);
    expect(traiGiay(KINH)).toBe(-40);
    // Mép phải của thẻ chỉ chạm viền kính (dày 4), chưa tới vùng chữ.
    expect(traiGiay(KINH) + RONG_GIAY).toBeLessThanOrEqual(KINH.x + CHONG_VIEN);
    // Thẻ thò ra ngoài khung 1600 thì khung co lại chừng ấy, cửa sổ hẹp không cắt thẻ.
    expect(leGiay(KINH)).toBeGreaterThanOrEqual(-traiGiay(KINH));
    for (const ten of ['Thẻ Du lịch', 'Thẻ Tùng']) {
      const the = screen.getByRole('button', { name: ten });
      expect(the).toHaveClass('v7-giay--quanh');
      expect(the.style.left).toBe('-40px');
    }
  });

  it('thẻ đầu: bảng dựng mới (đống phiếu rơi); thẻ thứ hai: đi tiếp từ bảng đang hiện, còn 1 người', async () => {
    const u = ve();
    await u.click(screen.getByRole('button', { name: 'Thẻ Du lịch' }));
    await u.click(screen.getByRole('button', { name: 'Ô giá trị của cột Ngành' }));
    const bang = await screen.findByRole('table');
    expect(within(bang).getAllByRole('row').length).toBeGreaterThan(2);
    expect(document.querySelector('.v7-kq')).not.toHaveClass('v7-kq--don');
    const truoc = Number(document.querySelector('.v7-so__n')?.textContent);
    expect(truoc).toBeGreaterThan(1);

    await u.click(screen.getByRole('button', { name: 'Thẻ Tùng' }));
    await u.click(screen.getByRole('button', { name: 'Ô giá trị của cột Tên' }));
    await waitFor(() => expect(within(screen.getByRole('table')).getAllByRole('row')).toHaveLength(1 + 1));
    expect(document.querySelector('.v7-kq')).toHaveClass('v7-kq--don');
    expect(document.querySelector('.v7-so__n')).toHaveTextContent(/^1$/);
    // Hết hoạt cảnh thì không dòng nào còn mang dấu "đang rụng"; bảng bấm ô được như trước.
    expect(document.querySelector('tr.is-roi')).toBeNull();
    expect(screen.getByRole('button', { name: 'Ô Mã SV: SV240251' })).toBeEnabled();
  });
});
