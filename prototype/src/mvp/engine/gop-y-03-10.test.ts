/**
 * Góp ý user 03/10/2026: đối chất có giới hạn trình sai (hết lượt → dừng ở mức đang đạt, cờ `<mã>-het-luot`); tổng kết đếm
 * chuyện ẩn (chỗ bấm tùy chọn đã xem, ghi cả ván ở `s.daXemDiem`).
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN as kb } from '../store/kho-mvp';
import { khungNhin, SO_LAN_SAI_DOI_CHAT, taoTrangThai, TEN_MAC_DINH, xuLy } from './may';
import { tongKetVu } from './tong-ket';
import { choiTuDong, RE_NHANH_KET_THAT, reNhanhTheo } from './tu-choi';
import type { TrangThaiMvp } from './trang-thai';

const ct = { reNhanh: reNhanhTheo(RE_NHANH_KET_THAT), ten: TEN_MAC_DINH, sangVuSau: true, lamPhu: false };
const qua = (s: TrangThaiMvp): TrangThaiMvp => {
  for (let i = 0; i < 20 && khungNhin(kb, s).kind === 'feedback'; i++) s = xuLy(kb, s, { type: 'tiep' });
  return s;
};

describe('đối chất: giới hạn trình sai', () => {
  it(`trình ${SO_LAN_SAI_DOI_CHAT} thẻ không liên quan ở dc-nam → hết lượt: cờ dc-nam-het-luot, rời đối chất, không có cờ đủ căn cứ`, () => {
    let s = choiTuDong(kb, taoTrangThai(kb, 0), ct, (_s, kn) => kn.kind === 'doi-chat' && kn.nut.id === 'dc-nam');
    const kn0 = khungNhin(kb, s);
    if (kn0.kind !== 'doi-chat') throw new Error('không tới đối chất');
    expect(kn0.conLuot).toBe(SO_LAN_SAI_DOI_CHAT);
    const khai = new Set(kn0.nut.bangChung.map((b) => b.id));
    const sai = [...s.hoSo.manhMoi, ...s.hoSo.bangChung, ...s.hoSo.taiLieu].filter((id) => !khai.has(id)).slice(0, SO_LAN_SAI_DOI_CHAT);
    expect(sai).toHaveLength(SO_LAN_SAI_DOI_CHAT);
    for (const [i, the] of sai.entries()) {
      s = qua(xuLy(kb, s, { type: 'trinh-the', the }));
      const kn = khungNhin(kb, s);
      if (i < SO_LAN_SAI_DOI_CHAT - 1) expect(kn).toMatchObject({ kind: 'doi-chat', conLuot: SO_LAN_SAI_DOI_CHAT - i - 1 });
    }
    expect(s.co).toContain('dc-nam-het-luot');
    expect(s.co).not.toContain('dc-nam-du');
    expect(khungNhin(kb, s).kind).not.toBe('doi-chat');
  });
});

describe('tổng kết: chuyện ẩn', () => {
  it('vụ gốc có chỗ bấm tùy chọn; máy tự chơi chỉ bấm vài chỗ → đếm đúng theo s.daXemDiem, phần trăm trong 0–100', () => {
    const s = choiTuDong(kb, taoTrangThai(kb, 0), { ...ct, sangVuSau: false }, (_s, kn) => kn.kind === 'end');
    const tk = tongKetVu(kb, s, null);
    expect(tk.chuyenAn.tong).toBeGreaterThan(0);
    expect(tk.chuyenAn.co).toBeLessThanOrEqual(tk.chuyenAn.tong);
    expect(tk.phanTram).toBeGreaterThanOrEqual(0);
    expect(tk.phanTram).toBeLessThanOrEqual(100);
    const them = tongKetVu(kb, { ...s, daXemDiem: [...(s.daXemDiem ?? []), 'n2-bd-toa-b', 'n2-bd-cang-tin'] }, null);
    expect(them.chuyenAn.co).toBeGreaterThanOrEqual(tk.chuyenAn.co);
  });
});
