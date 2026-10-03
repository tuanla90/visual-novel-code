/** Nhiệm vụ phụ "Túi đồ trên ghế đá" (30/10/2024, Tùng giao, mở sau Vụ 2): hai đường đều chơi trọn; quyền riêng tư; không lộ tên chủ túi trong lời kết. */
import { describe, expect, it } from 'vitest';
import { KICH_BAN as kb } from '../store/kho-mvp';
import { phuMoDuoc, taoTrangThai, TEN_MAC_DINH, xuLy, khungNhin } from './may';
import { choiTuDong, RE_NHANH_KET_THAT, reNhanhTheo } from './tu-choi';

const choiPhu = (duong: 'bao-ve' | 'tu-tim') => {
  const ct = { reNhanh: reNhanhTheo({ ...RE_NHANH_KET_THAT, 'r-tui': duong }), ten: TEN_MAC_DINH, sangVuSau: true, lamPhu: false };
  const truoc = choiTuDong(kb, taoTrangThai(kb, 0), ct, (s) => phuMoDuoc(kb, s).some((p) => p.id === 'tui-do'));
  const vao = xuLy(kb, truoc, { type: 'lam-nhiem-vu-phu', id: 'tui-do' });
  expect(vao.giaiDoan).toBe('phu');
  return choiTuDong(kb, vao, ct, (_s, kn) => kn.kind === 'end');
};

describe('nhiệm vụ phụ "Túi đồ trên ghế đá"', () => {
  const phu = kb.lich.nhiemVuPhu?.find((p) => p.id === 'tui-do');

  it('khai đúng người giao, vụ mở và ngày 30/10/2024', () => {
    expect(phu).toMatchObject({ chuoi: 'p-tui-mo', nguoiGiao: 'tung', moSau: 'vu2' });
    expect(phu?.ngay).toBe('2024-10-30');
  });

  it('chưa mở khi Vụ 2 chưa xong', () => {
    expect(phuMoDuoc(kb, taoTrangThai(kb, 0)).map((p) => p.id)).not.toContain('tui-do');
  });

  it('đường nộp bác Thịnh: không có màn tra, vẫn tới [KẾT THÚC] và đặt cờ tui-do-hoan-tat', () => {
    const ket = choiPhu('bao-ve');
    expect(ket.co).toContain('tui-do-hoan-tat');
    expect(ket.hoSo.bangChung).not.toContain('ev-tui-lop');
    expect(khungNhin(kb, ket).kind).toBe('end');
  });

  it('đường tự tìm: soi đồ, hai phiếu 3 dòng / 3 dòng, tới [KẾT THÚC] và đặt cờ tui-do-hoan-tat', () => {
    const ket = choiPhu('tu-tim');
    expect(ket.co).toContain('tui-do-hoan-tat');
    expect(ket.hoSo.bangChung).toEqual(expect.arrayContaining(['ev-tui-lop', 'ev-tui-nguoi']));
    expect(khungNhin(kb, ket).kind).toBe('end');
  });

  it('quyền riêng tư: ví và điện thoại là điểm bấm được nhưng không mở manh mối nào; lời kết không nêu tên hai người Báo chí còn lại', () => {
    const kp = kb.chuoi.find((c) => c.id === 'p-tui-nhin')?.nodes.find((n) => n.type === 'explore');
    expect(kp).toBeTruthy();
    for (const ch of ['p-tui-vi', 'p-tui-dien-thoai']) {
      const c = kb.chuoi.find((x) => x.id === ch);
      expect(c?.nodes.some((n) => n.type === 'consequence')).toBe(false);
    }
    expect(JSON.stringify(phu?.loiKet ?? '')).not.toMatch(/Hồng|Toàn/);
  });
});
