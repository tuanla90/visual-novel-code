/**
 * Ngày hội CLB (user 10/10, điện thoại ngang): người chơi lần đầu phải biết làm gì mà không ai nói ngoài màn hình.
 *   - Màn chiếu Duy làm mẫu (`· làm mẫu`): từng bước, người xem bấm "Bước kế", không tự trôi; bước cuối mới ra kết quả một dòng.
 *   - Tự tra mã của mình (`Gõ giá trị: có`): ô giá trị là ô gõ chữ; dòng chỉ dẫn đổi theo việc vừa làm; thử thách khác không có chỉ dẫn.
 */
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { KICH_BAN_MUA_1 } from '../../../content/generated/mua-1/kich-ban.gen';
import type { KichBanMvp, NutMvp, TheThuThachMvp } from '../../../content/mvp/types';
import { ManChieuMvp } from '../ManChieuMvp';
import { ManTraV7 } from './ManTraV7';

const kb = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const the = (id: string): TheThuThachMvp => {
  const t = kb.thuThach[id];
  if (!t) throw new Error(`thiếu thẻ ${id}`);
  return t;
};

beforeEach(() => {
  vi.spyOn(HTMLCanvasElement.prototype, 'getContext').mockReturnValue(null);
});

describe('Màn chiếu Duy làm mẫu từng bước', () => {
  const nut = (): Extract<NutMvp, { type: 'projector' }> => {
    for (const ch of Object.values(kb.chuoi)) {
      for (const n of ch.nodes) if (n.type === 'projector' && n.id === 'md-chieu-ma-tung') return n;
    }
    throw new Error('thiếu màn chiếu md-chieu-ma-tung');
  };

  it('kịch bản gắn `· làm mẫu` cho màn chiếu mã Tùng', () => {
    expect(nut().lamMau).toBe(true);
  });

  it('đi từng bước bằng "Bước kế": bước 1 chỉ có câu chưa lọc, bước 4 mới ra một dòng và nút Tiếp tục', async () => {
    const u = userEvent.setup();
    const onTiep = vi.fn();
    render(<ManChieuMvp kb={kb} duLieu={kb.duLieu} nut={nut()} onTiep={onTiep} />);
    expect(screen.getByText('Bước 1/4')).toBeTruthy();
    expect(document.body.textContent).not.toContain('WHERE');
    expect(screen.queryByRole('button', { name: 'Tiếp tục' })).toBeNull();
    await u.click(screen.getByRole('button', { name: 'Bước kế' }));
    expect(screen.getByText('Bước 2/4')).toBeTruthy();
    expect(document.body.textContent).toContain('SV240251');
    await u.click(screen.getByRole('button', { name: 'Bước kế' }));
    expect(screen.getByText('Bước 3/4')).toBeTruthy();
    expect(onTiep).not.toHaveBeenCalled();
    await u.click(screen.getByRole('button', { name: 'Bước kế' }));
    expect(screen.getByText('Bước 4/4')).toBeTruthy();
    await waitFor(() => expect(document.querySelectorAll('tbody tr').length).toBe(1));
    await u.click(screen.getByRole('button', { name: 'Tiếp tục' }));
    expect(onTiep).toHaveBeenCalledTimes(1);
  });
});

describe('Tự tra mã của mình: ô gõ chữ và chỉ dẫn từng bước', () => {
  function ve(id: string) {
    const onXong = vi.fn();
    render(<ManTraV7 kb={kb} duLieu={kb.duLieu} the={the(id)} mode="challenge" canh="phong-clb" giayNho={[]} dienTen={(t) => t} onXong={onXong} />);
    return { onXong, u: userEvent.setup() };
  }
  const chiDan = (): string => document.querySelector('.v7-huong-dan')?.textContent ?? '';

  it('thẻ c-tra-ma-nguoi-choi khai `Gõ giá trị` và có dòng chỉ dẫn; thẻ khác thì không', () => {
    expect(the('c-tra-ma-nguoi-choi').goGiaTri).toBe(true);
    expect(the('c-nam-hoai').goGiaTri).toBeUndefined();
    ve('c-nam-hoai');
    expect(document.querySelector('.v7-huong-dan')).toBeNull();
  });

  it('làm theo chỉ dẫn: thêm điều kiện → gõ mã → CHẠY ra một dòng, chỉ dẫn đi theo từng bước', async () => {
    const { u } = ve('c-tra-ma-nguoi-choi');
    expect(chiDan()).toContain('+ thêm điều kiện');
    expect(screen.getByRole('button', { name: 'Thêm điều kiện' }).className).toContain('is-chi');
    await u.click(screen.getByRole('button', { name: 'Thêm điều kiện' }));
    // Điều kiện mới lấy cột đầu (ma_sv) nên không có bước chọn cột: chỉ còn gõ mã rồi CHẠY.
    expect(chiDan()).toContain('gõ mã SV240388');
    const o = screen.getByRole('textbox', { name: /Giá trị điều kiện 1/ });
    expect(o.className).toContain('is-chi');
    await u.type(o, 'SV240388');
    expect(chiDan()).toContain('bấm CHẠY');
    await u.click(screen.getByRole('button', { name: /CHẠY/ }));
    await waitFor(() => expect(document.querySelector('.v7-dau')?.textContent).toContain('1 DÒNG'));
    expect(document.querySelector('.v7-huong-dan')).toBeNull();
  });
});
