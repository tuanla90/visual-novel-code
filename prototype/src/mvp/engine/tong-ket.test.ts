/** Tổng kết vụ ở màn kết (chị Minh Anh chốt hồ sơ): đếm từ trạng thái ván của máy tự chơi theo đường kết thật. */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { khungNhin, taoTrangThai } from './may';
import { tongKetVu } from './tong-ket';
import { choiTuDong, RE_NHANH_KET_THAT, reNhanhTheo } from './tu-choi';

const KB = KICH_BAN_MVP as unknown as KichBanMvp;

describe('tổng kết vụ', () => {
  it('ván mới: chưa có phiếu nào, mức "thiếu"', () => {
    const tk = tongKetVu(KB, taoTrangThai(KB, 1), null);
    expect(tk.phieu.co).toBe(0);
    expect(tk.phieu.tong).toBeGreaterThan(3);
    expect(tk.muc).toBe('thieu');
  });

  it('máy chơi đường kết thật tới màn kết Vụ 1: đủ phiếu của đường đã đi, có mẩu giấy, không tính chuỗi của vụ sau', () => {
    const s = choiTuDong(KB, taoTrangThai(KB, 1), { reNhanh: reNhanhTheo(RE_NHANH_KET_THAT) }, (_s, kn) => kn.kind === 'end');
    expect(khungNhin(KB, s).kind).toBe('end');
    const tk = tongKetVu(KB, s, null);
    expect(tk.phieu.co).toBe(tk.phieu.tong);
    expect(tk.mauGiay).toBe(true);
    expect(tk.muc).not.toBe('thieu');
    // Vụ 2 chưa chơi: tổng kết của nó trống.
    const v2 = (KB.lich.vuSau ?? [])[0];
    if (!v2) throw new Error('thiếu vụ sau');
    expect(tongKetVu(KB, s, v2.chuoi).phieu.co).toBe(0);
  });
});
