/**
 * Gói B13 (điều hướng tự do, bộ mùa 1): màn tra lùi về bảng điều tra, bảng lùi về cảnh đã mở nó ("Về phòng CLB"); câu đang
 * soạn còn nguyên khi quay lại. Cảnh khám phá có nút rời cảnh do máy cho ("Về bản đồ" / "Đi tiếp").
 */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MUA_1 } from '../../engine/testing/mua1-truoc-b19/kich-ban.gen';
import type { KichBanMvp, NutMvp, TheThuThachMvp } from '../../../content/mvp/types';
import { giaTriTuHoSo } from '../../engine/giay-nho';
import { diemDangHien } from '../../engine/may';
import { nhayToi } from '../../engine/tu-choi';
import { KhamPhaMvp } from '../KhamPhaMvp';
import { PhongTraMvp } from './PhongTraMvp';

const kb = KICH_BAN_MUA_1 as unknown as KichBanMvp;

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
});

const pha = (): string | null => document.querySelector('.phong-tra')?.getAttribute('data-pha') ?? null;

describe('màn tra có đường lùi (gói B13)', () => {
  it('phòng CLB: bảng có "Về phòng CLB"; máy → bảng → máy giữ câu đang soạn; mở lại sau khi rời vẫn còn câu', async () => {
    const s = nhayToi(kb, 'lop', 11);
    const the = kb.thuThach['c-lop'] as TheThuThachMvp;
    const onRoi = vi.fn();
    const ve = () => (
      <PhongTraMvp kb={kb} s={s} duLieu={kb.duLieu} the={the} mode="challenge" giayNho={giaTriTuHoSo(kb, s.hoSo)} dienTen={(t) => t} noi="Phòng CLB" onDoiCho={vi.fn()} onXong={vi.fn()} onRoi={onRoi} tenCanhRoi="Phòng CLB" />
    );
    const { unmount } = render(ve());
    const u = userEvent.setup();
    expect(pha()).toBe('bang');
    await u.click(screen.getByRole('button', { name: 'Về phòng CLB' }));
    expect(onRoi).toHaveBeenCalledTimes(1);

    await u.click(screen.getByRole('button', { name: /Mở laptop/ }));
    expect(pha()).toBe('may');
    const cot1 = () => screen.getByRole('button', { name: /^Cột của điều kiện 1: / });
    const truoc = cot1().textContent;
    await u.click(cot1());
    const daDoi = cot1().textContent;
    expect(daDoi).not.toBe(truoc);

    await u.click(screen.getByRole('button', { name: 'Về bảng điều tra' }));
    expect(pha()).toBe('bang');
    await u.click(screen.getByRole('button', { name: /Mở laptop/ }));
    expect(cot1().textContent).toBe(daDoi);

    // Rời hẳn màn tra (giao diện gỡ cả phòng tra) rồi mở lại: câu vẫn như lúc rời.
    unmount();
    render(ve());
    await u.click(screen.getByRole('button', { name: /Mở laptop/ }));
    expect(cot1().textContent).toBe(daDoi);
  });

  it('không có onRoi (bộ MVP, buổi họp): bảng không có nút rời', () => {
    const s = nhayToi(kb, 'lop', 12);
    const the = kb.thuThach['c-lop'] as TheThuThachMvp;
    render(<PhongTraMvp kb={kb} s={s} duLieu={kb.duLieu} the={the} mode="challenge" giayNho={giaTriTuHoSo(kb, s.hoSo)} dienTen={(t) => t} noi="Phòng CLB" onDoiCho={vi.fn()} onXong={vi.fn()} />);
    expect(screen.queryByRole('button', { name: /^Về phòng/ })).toBeNull();
  });

  it('phòng máy (không có bảng): màn máy lùi thẳng về cảnh', () => {
    const s = nhayToi(kb, 'nhat-ky-in', 13);
    const the = kb.thuThach['c-in'] as TheThuThachMvp;
    const onRoi = vi.fn();
    render(<PhongTraMvp kb={kb} s={s} duLieu={kb.duLieu} the={the} mode="challenge" giayNho={giaTriTuHoSo(kb, s.hoSo)} dienTen={(t) => t} noi="Trong phòng máy" onDoiCho={vi.fn()} onXong={vi.fn()} onRoi={onRoi} tenCanhRoi="Phòng Công tác sinh viên" />);
    expect(pha()).toBe('may');
    expect(screen.queryByRole('button', { name: 'Về bảng điều tra' })).toBeNull();
    screen.getByRole('button', { name: 'Về phòng Công tác sinh viên' }).click();
    expect(onRoi).toHaveBeenCalledTimes(1);
  });
});

describe('cảnh khám phá có nút rời cảnh (gói B13)', () => {
  const nut = (id: string): Extract<NutMvp, { type: 'explore' }> => {
    for (const c of kb.chuoi) for (const n of c.nodes) if (n.type === 'explore' && n.id === id) return n;
    throw new Error(`thiếu ${id}`);
  };

  it('"Về bản đồ" khi máy cho; không cho thì không có nút', async () => {
    const n = nut('kp-toi-n2-co-hanh');
    const onRoi = vi.fn();
    const { unmount } = render(<KhamPhaMvp kb={kb} id={n.id} canh="phong-dao-tao" diem={diemDangHien(n, [])} onXem={() => {}} roi={{ kieu: 've-ban-do', nhan: 'Về bản đồ' }} onRoi={onRoi} />);
    await userEvent.setup().click(screen.getByRole('button', { name: 'Về bản đồ' }));
    expect(onRoi).toHaveBeenCalledTimes(1);
    unmount();
    render(<KhamPhaMvp kb={kb} id={n.id} canh="phong-dao-tao" diem={diemDangHien(n, [])} onXem={() => {}} roi={null} onRoi={onRoi} />);
    expect(screen.queryByRole('button', { name: 'Về bản đồ' })).toBeNull();
  });
});
