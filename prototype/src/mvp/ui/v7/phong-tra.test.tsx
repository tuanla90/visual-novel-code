/**
 * Hai mặt của phòng (user chốt 30/09/2026): phòng CLB mở ở mặt BẢNG điều tra → "Mở laptop" → màn tra v7 → tra đúng, bấm
 * ghim → quay về bảng, phiếu mới ghim kèm sợi chỉ → "Tiếp tục" mới báo xong. Phòng máy vào thẳng màn máy; buổi họp
 * (`fix-query`, màn chiếu) xong là đi tiếp, không qua bảng.
 */
import { render, screen, waitFor, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import type { TheThuThachMvp } from '../../../content/mvp/types';
import { giaTriTuHoSo } from '../../engine/giay-nho';
import type { MaDiemNhayMvp } from '../../engine/tu-choi';
import { nhayToi } from '../../engine/tu-choi';
import { KICH_BAN as kb } from '../../store/kho-mvp';
import { PhongTraMvp } from './PhongTraMvp';

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
});

function ve(diem: MaDiemNhayMvp, idThe: string, mode: 'challenge' | 'fix-query', noi: string) {
  const s = nhayToi(kb, diem, 1);
  const the = kb.thuThach[idThe] as TheThuThachMvp;
  const onXong = vi.fn();
  const onDoiCho = vi.fn();
  render(
    <PhongTraMvp kb={kb} s={s} duLieu={kb.duLieu} the={the} mode={mode} giayNho={giaTriTuHoSo(kb, s.hoSo)} dienTen={(t) => t} noi={noi} onDoiCho={onDoiCho} onXong={onXong} />,
  );
  return { onXong, u: userEvent.setup() };
}
const pha = (): string | null => document.querySelector('.phong-tra')?.getAttribute('data-pha') ?? null;

describe('phòng tra: bảng → máy → ghim', () => {
  it('c-lop ở phòng CLB: mở ở bảng; Mở laptop → màn tra phong-clb; tra đúng + ghim → bảng có phiếu mới và sợi chỉ; Tiếp tục → onXong', async () => {
    const { onXong, u } = ve('lop', 'c-lop', 'challenge', 'Phòng CLB');
    expect(pha()).toBe('bang');
    expect(screen.getByRole('region', { name: 'Bảng điều tra' })).toBeInTheDocument();
    // Phiếu hai lớp chưa có trên bảng.
    expect(screen.queryByRole('article', { name: /^Phiếu kết quả/ })).toBeNull();

    await u.click(screen.getByRole('button', { name: /Mở laptop/ }));
    expect(pha()).toBe('may');
    expect(screen.getByRole('region', { name: 'Tra dữ liệu' })).toHaveAttribute('data-canh', 'phong-clb');

    // Dựng câu đúng: toa_nha = B VÀ nganh = Báo chí (ô cột 1 bấm ba lần: ma_lop → nganh → khoa_hoc → toa_nha).
    const cot1 = () => screen.getByRole('button', { name: /^Cột của điều kiện 1: / });
    while (cot1().textContent !== 'toa_nha') await u.click(cot1());
    await u.click(screen.getByRole('button', { name: /^B \(giấy nhớ/ }));
    await u.click(screen.getByRole('button', { name: /^Ô giá trị điều kiện 1/ }));
    await u.click(screen.getByRole('button', { name: /^Báo chí \(giấy nhớ/ }));
    await u.click(screen.getByRole('button', { name: /^Ô giá trị điều kiện 2/ }));
    await u.click(screen.getByRole('button', { name: /CHẠY$/ }));
    await u.click(await screen.findByRole('button', { name: '📌 Ghim lên bảng' }));

    expect(pha()).toBe('ghim');
    expect(onXong).not.toHaveBeenCalled();
    const bang = screen.getByRole('region', { name: 'Bảng điều tra' });
    const phieu = within(bang).getByRole('article', { name: 'Phiếu kết quả: Hai lớp: BC24A, BC23A' });
    expect(phieu).toHaveClass('is-moi');
    expect(phieu).toHaveTextContent('2 DÒNG');
    // Hai sợi chỉ đỏ từ hai mẩu tin đã kéo vào câu, vẽ mới tới phiếu.
    expect(bang.querySelectorAll('.bang__chi--truy-van.is-moi')).toHaveLength(2);

    const tiep = screen.getByRole('button', { name: 'Tiếp tục' });
    await u.click(tiep);
    expect(onXong).toHaveBeenCalledTimes(1);
    expect(onXong).toHaveBeenCalledWith(['clue-toa-b', 'clue-bao-chi-k24']);
    expect(tiep).toBeDisabled();
  });

  it('phòng máy (c-in): không có bảng trên tường → vào thẳng màn máy, cảnh phòng máy', () => {
    ve('nhat-ky-in', 'c-in', 'challenge', 'Trong phòng máy');
    expect(pha()).toBe('may');
    expect(screen.queryByRole('button', { name: /Mở laptop/ })).toBeNull();
    expect(screen.getByRole('region', { name: 'Tra dữ liệu' })).toHaveAttribute('data-canh', 'phong-may');
  });

  it('buổi họp (fix-query): màn chiếu, xong là onXong luôn — không qua pha ghim', async () => {
    const { onXong, u } = ve('hop-sua-or', 'c-sua-or-quan', 'fix-query', 'Phòng họp rà soát');
    expect(pha()).toBe('may');
    expect(screen.getByRole('region', { name: 'Sửa truy vấn' })).toHaveAttribute('data-canh', 'man-chieu');
    await u.click(screen.getByRole('button', { name: /^Nối điều kiện 2: HOẶC/ }));
    await u.click(screen.getByRole('button', { name: /CHẠY$/ }));
    await u.click(await screen.findByRole('button', { name: 'Tiếp tục' }));
    await waitFor(() => expect(onXong).toHaveBeenCalledWith([]));
    expect(pha()).toBe('may');
  });
});
