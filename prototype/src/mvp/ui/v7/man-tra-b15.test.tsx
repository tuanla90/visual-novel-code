/**
 * Gói B15 (mục E) trên màn tra thật, sql.js chạy thật: ở `c-ten-h` người chơi ghép "tên bắt đầu bằng H VÀ lớp BC24A" và lấy cột
 * mã thì được nhận là đúng (trước đây bị bắt làm lại theo câu chuẩn cả lớp), rồi chép hai ô mã và ghim. Lọc sót còn một người thì
 * chưa đúng và có lời. Bộ MVP (cùng thẻ) giữ cách chấm cũ.
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MUA_1 } from '../../../content/generated/mua-1/kich-ban.gen';
import type { KichBanMvp, TheThuThachMvp } from '../../../content/mvp/types';
import { giaTriTuHoSo, type GiaTriHoSo } from '../../engine/giay-nho';
import { nhayToi } from '../../engine/tu-choi';
import { KICH_BAN as kbMvp } from '../../store/kho-mvp';
import { ManTraV7 } from './ManTraV7';

const kb = KICH_BAN_MUA_1 as unknown as KichBanMvp;
type U = ReturnType<typeof userEvent.setup>;

function ve(bo: KichBanMvp, giayNho: GiaTriHoSo[]) {
  const the = bo.thuThach['c-ten-h'] as TheThuThachMvp | undefined;
  if (!the) throw new Error('thiếu thẻ c-ten-h');
  const onXong = vi.fn();
  render(<ManTraV7 kb={bo} duLieu={bo.duLieu} the={the} mode="challenge" canh="phong-clb" giayNho={giayNho} dienTen={(t) => t} onXong={onXong} />);
  return { onXong, u: userEvent.setup() };
}
async function coDk(u: U, i: number): Promise<void> {
  while (screen.queryAllByRole('button', { name: /^Cột của điều kiện \d+: / }).length < i) await u.click(screen.getByRole('button', { name: 'Thêm điều kiện' }));
}
async function chonCot(u: U, i: number, cot: string): Promise<void> {
  await coDk(u, i);
  for (let k = 0; k < 8; k++) {
    const nut = screen.getByRole('button', { name: new RegExp(`^Cột của điều kiện ${i}: `) });
    if (nut.textContent === cot) return;
    await u.click(nut);
  }
  throw new Error(`không chọn được cột ${cot}`);
}
async function datGiay(u: U, giaTri: string, i: number): Promise<void> {
  await coDk(u, i);
  await u.click(screen.getByRole('button', { name: new RegExp(`^${giaTri} \\(giấy nhớ`) }));
  await u.click(screen.getByRole('button', { name: new RegExp(`^Ô giá trị điều kiện ${i}`) }));
}
/** Ghép "ten bắt đầu bằng H VÀ ma_lop = BC24A" như user đã làm. */
async function ghepTenHTrongLop(u: U): Promise<void> {
  await chonCot(u, 1, 'ten');
  await datGiay(u, 'H', 1);
  await u.click(screen.getByRole('button', { name: /^Phép so sánh của điều kiện 1/ }));
  await chonCot(u, 2, 'ma_lop');
  await datGiay(u, 'BC24A', 2);
}
const nutChay = (): HTMLElement => screen.getByRole('button', { name: /CHẠY$/ });
const dau = (): string | null => document.querySelector('.v7-dau')?.textContent ?? null;
const thoai = (): HTMLElement | null => document.querySelector<HTMLElement>('.v7-thoai');

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
});

describe('gói B15 · c-ten-h: câu hẹp mà đủ', () => {
  const giay = (): GiaTriHoSo[] => giaTriTuHoSo(kb, nhayToi(kb, 'ten-h', 1).hoSo);

  it('tên bắt đầu bằng H VÀ lớp BC24A, có cột mã → 2 dòng, ĐÚNG: Hà Vy nhận, chép hai ô mã rồi ghim', async () => {
    const { onXong, u } = ve(kb, giay());
    await ghepTenHTrongLop(u);
    await u.click(screen.getByRole('button', { name: /^Cột ma_sv: chưa lấy/ }));
    await u.click(nutChay());
    const ghim = await screen.findByRole('button', { name: 'Ghim lên bảng' });
    expect(dau()).toBe('2 DÒNG');
    expect(thoai()).toHaveAccessibleName(/^Hà Vy: Hai người, Hiếu với Hoài\. Lọc thẳng thế này gọn hơn tớ nghĩ\./);
    // Hai dòng đều thuộc phiếu: bấm đủ cả hai ô mã mới ghim được.
    expect(ghim).toBeDisabled();
    expect(screen.getByText(/Bấm từng ô ma_sv để chép ra giấy nhớ \(còn 2\)/)).toBeInTheDocument();
    await u.click(screen.getByRole('button', { name: 'Ô ma_sv: SV240228' }));
    expect(ghim).toBeDisabled();
    await u.click(screen.getByRole('button', { name: 'Ô ma_sv: SV240317' }));
    expect(ghim).toBeEnabled();
    await u.click(ghim);
    expect(onXong).toHaveBeenCalledTimes(1);
    expect(new Set(onXong.mock.calls[0]?.[0] as string[])).toEqual(new Set(['clue-chu-ky-h', 'ev-hai-lop']));
  });

  it('lọc sót (tên bằng Hiếu trong lớp, có cột mã) → 1 dòng, chưa đúng, Hà Vy nói vì sao; không có nút ghim', async () => {
    // Thêm một tờ giấy "Hiếu" (như tờ người chơi tự chép từ kết quả) để ghép điều kiện tên bằng Hiếu.
    const { u } = ve(kb, [...giay(), { khoa: 'thu-hieu#0', giaTri: 'Hiếu', nguon: 'Tên nghe ở căng tin', the: 'clue-chu-ky-h' }]);
    await chonCot(u, 1, 'ten');
    await datGiay(u, 'Hiếu', 1);
    await chonCot(u, 2, 'ma_lop');
    await datGiay(u, 'BC24A', 2);
    await u.click(screen.getByRole('button', { name: /^Cột ma_sv: chưa lấy/ }));
    await u.click(nutChay());
    await waitFor(() => expect(dau()).toBe('1 DÒNG'));
    expect(screen.queryByRole('button', { name: 'Ghim lên bảng' })).toBeNull();
    expect(thoai()).toHaveAccessibleName(/^Hà Vy: Mới có một người\./);
  });

  it('kịch bản không có cờ bộ mùa 1 (cách chấm cũ, như bộ MVP): cùng câu hẹp có cột mã vẫn chưa đúng', async () => {
    // Thẻ c-ten-h của bộ MVP có câu chuẩn khác (hai dòng) nên ở đây dùng thẻ mùa 1 với kịch bản đã tắt cờ.
    const { u } = ve({ ...kb, dieuHuongTuDo: false }, giay());
    await ghepTenHTrongLop(u);
    await u.click(screen.getByRole('button', { name: /^Cột ma_sv: chưa lấy/ }));
    await u.click(nutChay());
    await waitFor(() => expect(dau()).toBe('2 DÒNG'));
    expect(screen.queryByRole('button', { name: 'Ghim lên bảng' })).toBeNull();
  });

  it('bộ MVP: thẻ c-ten-h vẫn là câu chuẩn hai dòng của nó, chấm như cũ', () => {
    expect(kbMvp.dieuHuongTuDo ?? false).toBe(false);
    expect(kbMvp.thuThach['c-ten-h']?.soDongKyVong).toBe(2);
  });
});
