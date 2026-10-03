// @vitest-environment node
/**
 * `[KHÁM PHÁ]` trong máy MVP (đặc tả §18.6): bấm chỗ → chạy chuỗi của chỗ đó → hết nút thì về cảnh; chỗ có "sau:" hiện
 * dần; xem hết → qua nút, chạy tiếp chuỗi chứa nó; `[ĐI TỚI]` trong chuỗi của một chỗ → rời cảnh. Kịch bản tự dựng nhỏ
 * (mượn khung lịch của bản thật) để không phụ thuộc lời thoại.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { ChuoiMvp, KichBanMvp, NutMvp } from '../../content/mvp/types';
import { khungNhin, taoTrangThai, xuLy } from './may';
import type { TrangThaiMvp } from './trang-thai';

const THAT = KICH_BAN_MVP as unknown as KichBanMvp;
const loi = (text: string): NutMvp => ({ type: 'line', speaker: 'narrator', text });
const chuoi = (id: string, nodes: NutMvp[]): ChuoiMvp => ({ id, title: id, canh: 'cong-ktx', mocSomNhat: 0, nodes });

function kichBan(sauCung: NutMvp[] = [loi('sau khám phá')], gapNodes: NutMvp[] = [loi('gặp')]): KichBanMvp {
  return {
    ...THAT,
    lich: { ...THAT.lich, chuoiDau: 'goc' },
    chuoi: [
      chuoi('goc', [
        loi('trước'),
        {
          type: 'explore',
          id: 'kp',
          diem: [
            { sprite: 'obj-a', x: 10, y: 50, rong: 5, chuoi: 'xem-a', sau: [], nhan: null },
            { sprite: 'obj-b', x: 50, y: 50, rong: 5, chuoi: 'xem-b', sau: [], nhan: 'Xem bảng' },
            { sprite: 'nv:tung', x: 80, y: 100, rong: 15, chuoi: 'gap', sau: ['xem-a', 'xem-b'], nhan: null },
          ],
        },
        ...sauCung,
      ]),
      chuoi('xem-a', [loi('a')]),
      chuoi('xem-b', [loi('b1'), loi('b2')]),
      chuoi('gap', gapNodes),
      chuoi('noi-khac', [loi('nơi khác')]),
      ...THAT.chuoi,
    ],
  };
}

const tiep = (kb: KichBanMvp, s: TrangThaiMvp): TrangThaiMvp => xuLy(kb, s, { type: 'tiep' });
const xem = (kb: KichBanMvp, s: TrangThaiMvp, c: string): TrangThaiMvp => xuLy(kb, s, { type: 'xem-diem', chuoi: c });
const chu = (kb: KichBanMvp, s: TrangThaiMvp): string | null => {
  const kn = khungNhin(kb, s);
  return kn.kind === 'line' ? kn.loi.text : null;
};
const hien = (kb: KichBanMvp, s: TrangThaiMvp): string[] => {
  const kn = khungNhin(kb, s);
  return kn.kind === 'explore' ? kn.diem.map((d) => `${d.diem.chuoi}${d.daXem ? '*' : ''}`) : [];
};

describe('máy MVP: [KHÁM PHÁ]', () => {
  it('mở cảnh: chỉ hiện chỗ không có "sau:"; chỗ có "sau:" hiện khi đã xem đủ', () => {
    const kb = kichBan();
    let s = tiep(kb, taoTrangThai(kb, 1));
    expect(khungNhin(kb, s).kind).toBe('explore');
    expect(hien(kb, s)).toEqual(['xem-a', 'xem-b']);

    s = xem(kb, s, 'xem-a');
    expect(chu(kb, s)).toBe('a');
    s = tiep(kb, s);
    expect(hien(kb, s)).toEqual(['xem-a*', 'xem-b']);

    s = xem(kb, s, 'xem-b');
    s = tiep(kb, tiep(kb, s));
    expect(hien(kb, s)).toEqual(['xem-a*', 'xem-b*', 'gap']);
  });

  it('chỗ đã xem / chưa hiện không bấm được (máy đứng yên)', () => {
    const kb = kichBan();
    let s = tiep(kb, taoTrangThai(kb, 1));
    expect(xem(kb, s, 'gap')).toBe(s);
    s = tiep(kb, xem(kb, s, 'xem-a'));
    expect(xem(kb, s, 'xem-a')).toBe(s);
  });

  it('xem hết mọi chỗ → qua [KHÁM PHÁ], chạy tiếp chuỗi chứa nó; cảnh đóng', () => {
    const kb = kichBan();
    let s = tiep(kb, taoTrangThai(kb, 1));
    s = tiep(kb, xem(kb, s, 'xem-a'));
    s = tiep(kb, tiep(kb, xem(kb, s, 'xem-b')));
    s = tiep(kb, xem(kb, s, 'gap'));
    expect(chu(kb, s)).toBe('sau khám phá');
    expect(s.khamPha).toBeNull();
  });

  it('[ĐI TỚI] trong chuỗi của một chỗ → rời cảnh, không quay lại', () => {
    const kb = kichBan(undefined, [loi('gặp'), { type: 'goto', to: 'noi-khac' }]);
    let s = tiep(kb, taoTrangThai(kb, 1));
    s = tiep(kb, xem(kb, s, 'xem-a'));
    s = tiep(kb, tiep(kb, xem(kb, s, 'xem-b')));
    s = tiep(kb, xem(kb, s, 'gap'));
    expect(chu(kb, s)).toBe('nơi khác');
    expect(s.khamPha).toBeNull();
  });

  it('Lưu/Nạp giữa cảnh (JSON) giữ các chỗ đã xem; ô lưu cũ không có trường khamPha vẫn chạy', () => {
    const kb = kichBan();
    let s = tiep(kb, taoTrangThai(kb, 1));
    s = tiep(kb, xem(kb, s, 'xem-a'));
    const nap = JSON.parse(JSON.stringify(s)) as TrangThaiMvp;
    expect(hien(kb, nap)).toEqual(['xem-a*', 'xem-b']);

    const cu = { ...taoTrangThai(kb, 1) } as Partial<TrangThaiMvp>;
    delete cu.khamPha;
    const s2 = tiep(kb, cu as TrangThaiMvp);
    expect(hien(kb, s2)).toEqual(['xem-a', 'xem-b']);
  });
});

describe('mở đầu thật: sảnh KTX', () => {
  it('chuỗi đầu dẫn tới [KHÁM PHÁ] ở sảnh KTX; bảng tin hiện sau tờ giấy thang máy, Tùng hiện sau cả hai', () => {
    let s = taoTrangThai(THAT, 1);
    for (let i = 0; i < 50 && khungNhin(THAT, s).kind === 'line'; i++) s = tiep(THAT, s);
    const kn = khungNhin(THAT, s);
    expect(kn.kind).toBe('explore');
    expect(s.canh).toBe('sanh-ktx');
    expect(hien(THAT, s)).toEqual(['md-00-thang-may']);
  });
});
