// @vitest-environment node
/**
 * Vụ 1 bản 6 của bộ mùa 1 (gói B19, 08/10/2026): máy tự chơi hết vụ trên nội dung thật. Đường chính tới kết thật và Cảnh 12;
 * dừng ở đối chất "phiếu gửi do ai ký" bằng "Chưa đủ căn cứ" thì ra kết tạm, không có Hoài kể, không có Cảnh 12. Đây là phần
 * chạy được với bộ đọc hiện tại (lệnh cũ đánh dấu TẠM); tính vạch, chấm A/B/C, dòng thời gian là việc của B19-MÁY.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MUA_1 } from '../../content/generated/mua-1/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { coTrongHoSo, khungNhin, taoTrangThai, xuLy } from './may';
import type { TrangThaiMvp } from './trang-thai';
import { choiTuDong } from './tu-choi';

const KB = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const CT = { ten: 'Nam' };
const HO_SO = ['ev-phieu-gui-hoai', 'doc-thu-kien-nghi', 'clue-loi-bac-thinh', 'ev-the-lich-bc24', 'ev-mot-hoai', 'clue-loi-co-lan', 'doc-so-thu-hop', 'clue-loi-chu-cuong', 'ev-ra-cong-644'];

/** Chơi tới hết (màn kết), ghi lại mọi chuỗi đã chạy. `truoc`: chơi tay một đoạn trước khi để máy chơi tiếp. */
function choiHet(truoc?: (s: TrangThaiMvp) => TrangThaiMvp): { s: TrangThaiMvp; daQua: Set<string> } {
  const daQua = new Set<string>();
  const ghi = (s: TrangThaiMvp): false => {
    if (s.conTro) daQua.add(s.conTro.chuoi);
    return false;
  };
  let s = taoTrangThai(KB, 1);
  if (truoc) s = truoc(s);
  s = choiTuDong(KB, s, CT, ghi, 8000);
  return { s, daQua };
}

describe('Vụ 1 bản 6: máy tự chơi', () => {
  it('đường chính: đủ hồ sơ, qua bốn màn tra, kết thật, Hoài kể, cảnh bóng mờ, Cảnh 11 và Cảnh 12', () => {
    const { s, daQua } = choiHet();
    expect(khungNhin(KB, s).kind).toBe('end');
    for (const id of HO_SO) expect(coTrongHoSo(s, id), id).toBe(true);
    for (const c of ['md-11-phong-clb', 'n1-clb', 'n2-co-hanh', 'n3-co-lan', 'n4-chu-cuong', 'n5-toi', 'hop-00', 'hop-01', 'hop-02', 'ket-that', 'ket-bong-mo', 'c11-that', 'c11-phong-clb', 'canh-12']) {
      expect(daQua.has(c), c).toBe(true);
    }
    expect(daQua.has('ket-tam')).toBe(false);
    for (const t of ['c-sv-hoai', 'c-sv-hoai-bc24', 'c-ra-vao', 'c-sua-or-quan']) expect(s.thuThachXong, t).toContain(t);
  });

  it('bấm "Chưa đủ căn cứ" ở câu phiếu gửi: kết tạm, không Hoài kể, không Cảnh 12', () => {
    const { s, daQua } = choiHet((s0) => {
      let s = choiTuDong(KB, s0, CT, (_x, kn) => kn.kind === 'doi-chat' && kn.nut.id === 'dc-phieu-gui', 8000);
      s = xuLy(KB, s, { type: 'chua-du' });
      return s;
    });
    expect(khungNhin(KB, s).kind).toBe('end');
    expect(daQua.has('ket-tam')).toBe(true);
    expect(daQua.has('c11-tam')).toBe(true);
    for (const c of ['hop-01', 'ket-that', 'ket-bong-mo', 'canh-12']) expect(daQua.has(c), c).toBe(false);
  });
});
