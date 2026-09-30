// @vitest-environment node
/** `[GHI SỔ]` (QĐ-092): máy tự thêm trang vào sổ cá nhân rồi chạy tiếp, không dừng hỏi; ghi hai lần vẫn một dòng. */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { ChuoiMvp, KichBanMvp, NutMvp } from '../../content/mvp/types';
import { khungNhin, taoTrangThai, xuLy } from './may';

const THAT = KICH_BAN_MVP as unknown as KichBanMvp;
const loi = (text: string): NutMvp => ({ type: 'line', speaker: 'narrator', text });
const chuoi = (id: string, nodes: NutMvp[]): ChuoiMvp => ({ id, title: id, canh: 'phong-may', mocSomNhat: 0, nodes });

describe('máy MVP: [GHI SỔ]', () => {
  it('tự ghi, không có khung nhìn riêng; ghi trùng không nhân đôi', () => {
    const trang = Object.keys(THAT.soTay)[0] ?? '';
    const kb: KichBanMvp = {
      ...THAT,
      lich: { ...THAT.lich, chuoiDau: 'goc' },
      chuoi: [chuoi('goc', [loi('trước'), { type: 'notebook-note', trang }, { type: 'notebook-note', trang }, loi('sau')]), ...THAT.chuoi],
    };
    let s = taoTrangThai(kb, 1);
    expect(s.soTay).toEqual([]);
    s = xuLy(kb, s, { type: 'tiep' });
    const kn = khungNhin(kb, s);
    expect(kn.kind === 'line' ? kn.loi.text : kn.kind).toBe('sau');
    expect(s.soTay).toEqual([trang]);
  });
});
