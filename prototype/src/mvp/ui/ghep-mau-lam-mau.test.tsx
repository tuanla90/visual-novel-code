/**
 * User 09/10/2026: màn ghép mẫu cho người chơi thấy rõ Minh Anh đang làm và làm thế nào (ghim hai thẻ → nối chỉ đỏ → viết
 * giấy nhớ), mỗi bước một câu, để Vụ 3 người chơi tự nối được.
 */
import { fireEvent, render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MUA_1 as kb } from '../engine/testing/mua1-ban6/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { khungNhin, taoTrangThai } from '../engine/may';
import { choiTuDong, RE_NHANH_KET_THAT, reNhanhTheo } from '../engine/tu-choi';
import { GhepMauMvp } from './GhepMauMvp';

const KB = kb as unknown as KichBanMvp;

describe('ghép mẫu làm từng bước', () => {
  const s = choiTuDong(KB, taoTrangThai(KB, 1), { ten: 'Nam', reNhanh: reNhanhTheo(RE_NHANH_KET_THAT) }, (_st, kn) => kn.kind === 'ghep-mau', 20000);
  const kn = khungNhin(KB, s);
  if (kn.kind !== 'ghep-mau') throw new Error(`đang ở ${kn.kind}`);

  it('bộ đọc: [GHÉP MẪU … · làm mẫu] gom đúng ba câu của Minh Anh, câu ấy không còn là lời thoại riêng trong chuỗi', () => {
    expect(kn.nut.lamMau?.map((l) => l.speaker)).toEqual(['minh-anh', 'minh-anh', 'minh-anh']);
    const chuoi = KB.chuoi.find((c) => c.id === 'n1-clb');
    expect(chuoi?.nodes.filter((n) => n.type === 'line' && n.text.startsWith('Một bên là phiếu gửi'))).toHaveLength(0);
  });

  it('ba bước: bước 1 chưa có chỉ và giấy nhớ, bước 2 có chỉ, bước 3 có giấy nhớ; bàn tay mang tên Minh Anh; Tiếp tục ở bước 3 mới đi tiếp truyện', () => {
    const onTiep = vi.fn();
    const { container } = render(<GhepMauMvp kb={KB} s={s} nut={kn.nut} dienTen={(t) => t} tenNguoi={() => 'Minh Anh'} onTiep={onTiep} />);
    const nut = (): HTMLElement => screen.getByRole('button', { name: 'Tiếp tục' });
    expect(screen.getByRole('group', { name: /Minh Anh ghép mẫu, bước 1 trên 3/ })).toBeTruthy();
    expect(container.querySelector('.bang__tay-ten')?.textContent).toBe('Minh Anh');
    expect(container.querySelectorAll('.the.is-ghep-mau')).toHaveLength(2);
    expect(container.querySelector('.bang__chi--ghep')).toBeNull();
    expect(container.querySelector('.bang__giay-ghep.is-moi')).toBeNull();
    expect(screen.getByText(/Chị ghim hai tờ cạnh nhau đã/)).toBeTruthy();

    fireEvent.click(nut());
    expect(screen.getByText(/Bước 2\/3 · Nối chỉ đỏ/)).toBeTruthy();
    expect(container.querySelector('.bang__chi--ghep')).not.toBeNull();
    expect(container.querySelector('.bang__giay-ghep.is-moi')).toBeNull();
    expect(onTiep).not.toHaveBeenCalled();

    fireEvent.click(nut());
    expect(screen.getByText(/Bước 3\/3 · Viết câu hỏi/)).toBeTruthy();
    expect(container.querySelector('.bang__giay-ghep.is-moi')?.textContent).toMatch(/Hoài nào học Báo chí, khóa 2024\?/);
    expect(onTiep).not.toHaveBeenCalled();

    fireEvent.click(nut());
    expect(onTiep).toHaveBeenCalledTimes(1);
  });
});
