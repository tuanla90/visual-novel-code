// @vitest-environment node
/**
 * Vụ 1 bản 7 của bộ mùa 1 (gói B22, 10/10/2026): máy tự chơi hết vụ trên nội dung thật. Ba chặng, mỗi chặng 1–2 chốt bằng nối note
 * (không "Đi tiếp" sang chặng sau khi chưa nối); buổi họp Khánh hỏi bốn lượt. Đường chính tới kết thật và Cảnh 12; trình sai ba lần
 * thì rank C, kết tạm, không Cảnh 12; sai một lần thì rank B, kết thật, không Cảnh 12.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MUA_1 } from '../../content/generated/mua-1/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { cachRoiCanh, coTrongHoSo, khungNhin, taoTrangThai } from './may';
import type { TrangThaiMvp } from './trang-thai';
import { choiTuDong } from './tu-choi';

const KB = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const CT = { ten: 'Nam' };
const HO_SO = ['ev-phieu-gui-hoai', 'doc-thu-kien-nghi', 'clue-loi-thinh-7h', 'clue-loi-thinh-9h', 'ev-the-lich-bc24', 'clue-bc24', 'ev-nam-hoai', 'ev-lop-bc24a', 'ev-hoai-bc24a', 'clue-loi-chu-cuong', 'ev-ra-cong-644'];

function choiHet(sai: Record<string, number> = {}): { s: TrangThaiMvp; daQua: Set<string> } {
  const daQua = new Set<string>();
  const ghi = (s: TrangThaiMvp): false => {
    if (s.conTro) daQua.add(s.conTro.chuoi);
    return false;
  };
  const s = choiTuDong(KB, taoTrangThai(KB, 1), { ...CT, traLoi: (id, lan) => (lan < (sai[id] ?? 0) ? 'sai' : 'dung') }, ghi, 20000);
  return { s, daQua };
}

describe('Vụ 1 bản 7: máy tự chơi', () => {
  it('đường chính (0 vạch, rank A): đủ hồ sơ, hai câu nối chốt chặng, năm màn tra, kết thật, Cảnh 11 và Cảnh 12', () => {
    const { s, daQua } = choiHet();
    expect(khungNhin(KB, s).kind).toBe('end');
    for (const id of HO_SO) expect(coTrongHoSo(s, id), id).toBe(true);
    expect(s.cauNoiXong).toEqual(expect.arrayContaining(['cau-hoai-nao', 'cau-hoai-ra-luc-nao']));
    for (const c of ['md-11-phong-clb', 'c1-mo', 'c1-bac-thinh', 'c1-thieu-bang-lop', 'c2-mo', 'c2-chot', 'c3-cong', 'c3-clb', 'hop-00', 'hop-01', 'hop-02', 'hop-03', 'ket-that', 'ket-bong-mo', 'c11-that', 'c11-phong-clb', 'canh-12']) {
      expect(daQua.has(c), c).toBe(true);
    }
    expect(daQua.has('ket-tam')).toBe(false);
    expect(s.bangRank?.vu1?.rank).toBe('a');
    for (const t of ['c-nam-hoai', 'c-lop-bc24a', 'c-hoai-bc24a', 'c-ra-vao', 'c-sua-or-khanh']) expect(s.thuThachXong, t).toContain(t);
  });

  it('chặng chưa chốt thì bản đồ không có "Đi tiếp": xem hết ghim ở chặng 1 mà chưa nối vẫn ở chặng 1', () => {
    const s = choiTuDong(KB, taoTrangThai(KB, 1), CT, (x, kn) => kn.kind === 'explore' && x.conTro?.chuoi === 'c1-ban-do' && kn.diem.every((d) => d.daXem), 20000);
    expect(s.ngay).toBe(1);
    expect(cachRoiCanh(KB, s)).toBeNull();
    expect(s.cauNoiXong ?? []).not.toContain('cau-hoai-nao');
  });

  it('ba lần chỉ sai ô (lượt "Hoài tự cầm thư"): rank C, kết tạm, không Cảnh 12', () => {
    const { s, daQua } = choiHet({ 'dc-tu-mang': 3 });
    expect(khungNhin(KB, s).kind).toBe('end');
    expect(s.bangRank?.vu1?.rank).toBe('c');
    expect(daQua.has('ket-tam')).toBe(true);
    expect(daQua.has('c11-tam')).toBe(true);
    for (const c of ['ket-that', 'canh-12']) expect(daQua.has(c), c).toBe(false);
  });

  it('một lần chỉ sai ô: rank B, kết thật, không Cảnh 12', () => {
    const { s, daQua } = choiHet({ 'dc-nguoi-dung-sau': 1 });
    expect(s.bangRank?.vu1?.rank).toBe('b');
    expect(daQua.has('ket-that')).toBe(true);
    expect(daQua.has('canh-12')).toBe(false);
  });
});
