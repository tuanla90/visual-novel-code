/** Nhiệm vụ phụ "Học trò cũ của cô" (20/11/2024, cô Hạnh nhờ, mở sau Vụ 4): chơi trọn, số dòng, chi tiết ẩn không lộ ra cột nào. */
import { describe, expect, it } from 'vitest';
import { KICH_BAN as kb } from '../store/kho-mvp';
import { khungNhin, phuMoDuoc, taoTrangThai, TEN_MAC_DINH, xuLy } from './may';
import { choiTuDong, RE_NHANH_KET_THAT, reNhanhTheo } from './tu-choi';

describe('nhiệm vụ phụ "Học trò cũ của cô"', () => {
  const phu = kb.lich.nhiemVuPhu?.find((p) => p.id === 'hoc-tro-cu');

  it('khai đúng người giao, vụ mở và ngày 20/11/2024', () => {
    expect(phu).toMatchObject({ chuoi: 'p-hoc-mo', nguoiGiao: 'co-hanh', moSau: 'vu4' });
    expect(phu?.ngay).toBe('2024-11-20');
  });

  it('chưa mở khi Vụ 4 chưa xong', () => {
    expect(phuMoDuoc(kb, taoTrangThai(kb, 0)).map((p) => p.id)).not.toContain('hoc-tro-cu');
  });

  it('chơi trọn: tới [KẾT THÚC], đặt cờ hoc-tro-cu-hoan-tat, hồ sơ có ba phiếu 30 / 26 / 4 dòng', () => {
    const ct = { reNhanh: reNhanhTheo(RE_NHANH_KET_THAT), ten: TEN_MAC_DINH, sangVuSau: true, lamPhu: false };
    const truoc = choiTuDong(kb, taoTrangThai(kb, 0), ct, (s) => phuMoDuoc(kb, s).some((p) => p.id === 'hoc-tro-cu'));
    const vao = xuLy(kb, truoc, { type: 'lam-nhiem-vu-phu', id: 'hoc-tro-cu' });
    expect(vao.giaiDoan).toBe('phu');
    const xong = choiTuDong(kb, vao, ct, (_s, kn) => kn.kind === 'end');
    expect(xong.co).toContain('hoc-tro-cu-hoan-tat');
    expect(xong.hoSo.bangChung).toEqual(expect.arrayContaining(['ev-hoc-ra-truong', 'ev-hoc-ten', 'ev-hoc-hai-dong']));
    expect(khungNhin(kb, xong).kind).toBe('end');
  });

  it('dòng Đỗ Văn Thịnh chỉ nằm trong chi tiết ẩn và bảng, không trong thẻ hồ sơ hay lời kết', () => {
    expect(phu?.loiKet ?? '').not.toMatch(/Thịnh/);
    expect(JSON.stringify(kb.hoSo ?? {})).not.toMatch(/Đỗ Văn Thịnh/);
  });
});
