// @vitest-environment node
/**
 * Vụ 1 bản 6 của bộ mùa 1 (gói B19, 08/10/2026): máy tự chơi hết vụ trên nội dung thật. Đường chính tới kết thật và Cảnh 12;
 * trình sai ba lần thì rank C, kết tạm, không có Hoài kể, không Cảnh 12; trình sai một lần thì rank B, kết thật, không Cảnh 12.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MUA_1 } from '../../content/generated/mua-1/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { coTrongHoSo, khungNhin, taoTrangThai } from './may';
import type { TrangThaiMvp } from './trang-thai';
import { choiTuDong } from './tu-choi';

const KB = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const CT = { ten: 'Nam' };
const HO_SO = ['ev-phieu-gui-hoai', 'doc-thu-kien-nghi', 'clue-loi-bac-thinh', 'ev-the-lich-bc24', 'ev-mot-hoai', 'clue-loi-co-lan', 'doc-so-thu-hop', 'clue-loi-chu-cuong', 'ev-ra-cong-644'];

/** Chơi tới hết (màn kết), ghi lại mọi chuỗi đã chạy. `truoc`: chơi tay một đoạn trước khi để máy chơi tiếp. */
function choiHet(truoc?: (s: TrangThaiMvp) => TrangThaiMvp, sai: Record<string, number> = {}): { s: TrangThaiMvp; daQua: Set<string> } {
  const daQua = new Set<string>();
  const ghi = (s: TrangThaiMvp): false => {
    if (s.conTro) daQua.add(s.conTro.chuoi);
    return false;
  };
  let s = taoTrangThai(KB, 1);
  if (truoc) s = truoc(s);
  s = choiTuDong(KB, s, { ...CT, traLoi: (id, lan) => (lan < (sai[id] ?? 0) ? 'sai' : 'dung') }, ghi, 8000);
  return { s, daQua };
}

describe('Vụ 1 bản 6: máy tự chơi', () => {
  it('đường chính (0 vạch, rank A): đủ hồ sơ, qua bốn màn tra, kết thật, Hoài kể, cảnh bóng mờ, Cảnh 11 và Cảnh 12', () => {
    const { s, daQua } = choiHet();
    expect(khungNhin(KB, s).kind).toBe('end');
    for (const id of HO_SO) expect(coTrongHoSo(s, id), id).toBe(true);
    for (const c of ['md-11-phong-clb', 'n1-clb', 'n2-co-hanh', 'n3-co-lan', 'n4-chu-cuong', 'n5-toi', 'hop-00', 'hop-01', 'hop-02', 'ket-that', 'ket-bong-mo', 'c11-that', 'c11-phong-clb', 'canh-12']) {
      expect(daQua.has(c), c).toBe(true);
    }
    expect(daQua.has('ket-tam')).toBe(false);
    expect(s.bangRank?.vu1?.rank).toBe('a');
    for (const t of ['c-sv-hoai', 'c-sv-hoai-bc24', 'c-ra-vao', 'c-sua-or-quan']) expect(s.thuThachXong, t).toContain(t);
  });

  it('ba lần trình sai (thẻ lịch ở câu phiếu gửi): rank C, kết tạm, không Hoài kể, không Cảnh 12', () => {
    const { s, daQua } = choiHet(undefined, { 'dc-phieu-gui': 3 });
    expect(khungNhin(KB, s).kind).toBe('end');
    expect(s.bangRank?.vu1?.rank).toBe('c');
    expect(daQua.has('ket-tam')).toBe(true);
    expect(daQua.has('c11-tam')).toBe(true);
    for (const c of ['ket-that', 'ket-bong-mo', 'canh-12']) expect(daQua.has(c), c).toBe(false);
  });

  it('một lần trình sai: rank B, kết thật có Hoài kể, không Cảnh 12', () => {
    const { s, daQua } = choiHet(undefined, { 'dc-phieu-gui': 1 });
    expect(s.bangRank?.vu1?.rank).toBe('b');
    expect(daQua.has('ket-that')).toBe(true);
    expect(daQua.has('ket-bong-mo')).toBe(true);
    expect(daQua.has('canh-12')).toBe(false);
  });
});
