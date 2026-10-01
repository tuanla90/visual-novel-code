// @vitest-environment node
/**
 * Lối tắt "Nhảy tới" của người quan sát (gói giao-dien-mvp), chương 1 theo truyện (ĐÃ CHỐT C, 30/09/2026): mỗi điểm
 * nhảy dựng đúng trạng thái như người chơi đã đi tới đó bình thường (ngày, màn thử thách đúng mã, hồ sơ có thẻ mong
 * đợi); nhảy buổi họp rồi chơi tiếp đúng vẫn tới kết thật.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { khungNhin, TEN_MAC_DINH } from './may';
import { choiTuDong, DIEM_NHAY_MVP, nhayToi, RE_NHANH_KET_THAT, reNhanhTheo } from './tu-choi';

const KB = KICH_BAN_MVP as unknown as KichBanMvp;
const DUNG_KET_THAT = { reNhanh: reNhanhTheo(RE_NHANH_KET_THAT) };

describe('nhảy tới (MVP)', () => {
  it('có đúng mười một điểm nhảy (bốn của chương 1, hai của Vụ 2, hai của Vụ 3, một của Vụ 4, một của Vụ 5, một của việc phụ), mỗi điểm có nhãn và mô tả', () => {
    expect(DIEM_NHAY_MVP.map((d) => d.id)).toEqual(['lop', 'ten-h', 'nhat-ky-in', 'hop-sua-or', 'vu2-tin-don', 'vu2-tin-goc', 'vu3-thiet-bi', 'vu3-toi-07', 'vu4-noi', 'vu5-vuot-muc', 'vu2-buoi', 'phu-micro', 'phu-hoan-nhom']);
    for (const d of DIEM_NHAY_MVP) {
      expect(d.nhan.length).toBeGreaterThan(0);
      expect(d.moTa.length).toBeGreaterThan(0);
    }
  });

  it('ngày 2 · lớp: đang ở c-lop, có tòa B + Báo chí K24 + tài khoản CLB, tên mặc định, ngành đầu danh sách', () => {
    const s = nhayToi(KB, 'lop', 1);
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'challenge', thuThach: { id: 'c-lop' } });
    expect(s.giaiDoan).toBe('ngay');
    expect(s.ngay).toBe(2);
    expect(s.hoSo.manhMoi).toEqual(expect.arrayContaining(['clue-chu-ky-h', 'clue-toa-b', 'clue-bao-chi-k24', 'clue-quyen-du-lieu']));
    expect(s.hoSo.bangChung).toEqual(['ev-the-lich', 'ev-bang-lop']);
    expect(s.tenNguoiChoi).toBe(TEN_MAC_DINH);
    expect(s.nganh.length).toBeGreaterThan(0);
    // Làm xong như người chơi → phiếu hai lớp vào hồ sơ, hết ngày 2.
    const sau = choiTuDong(KB, s, DUNG_KET_THAT, (st) => st.ngay === 3);
    expect(sau.hoSo.bangChung).toContain('ev-hai-lop');
  });

  it('ngày 3 · tên H: đang ở c-ten-h, có phiếu hai lớp + phiếu tra cứu, chưa có hai mã', () => {
    const s = nhayToi(KB, 'ten-h', 1);
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'challenge', thuThach: { id: 'c-ten-h' } });
    expect(s.ngay).toBe(3);
    expect(s.hoSo.bangChung).toContain('ev-hai-lop');
    expect(s.hoSo.manhMoi).toEqual(expect.arrayContaining(['clue-phieu-tra-cuu', 'clue-can-ma-va-can-cu']));
    expect(s.hoSo.bangChung).not.toContain('ev-hai-ma');
  });

  it('ngày 4 · nhật ký in: ở c-in (đã chọn ghé phòng máy), có hai mã, Hoài là người nộp, tên tệp', () => {
    const s = nhayToi(KB, 'nhat-ky-in', 1);
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'challenge', thuThach: { id: 'c-in' } });
    expect(s.ngay).toBe(4);
    expect(s.hoSo.bangChung).toContain('ev-hai-ma');
    expect(s.hoSo.manhMoi).toEqual(expect.arrayContaining(['clue-hoai-nguoi-nop', 'clue-ten-tep']));
  });

  it('buổi họp · sửa HOẶC: ở c-sua-or-quan, đủ nhật ký in + lời chú Cường; chơi tiếp đúng → kết thật', () => {
    const s = nhayToi(KB, 'hop-sua-or', 1);
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'fix-query', thuThach: { id: 'c-sua-or-quan' } });
    expect(s.giaiDoan).toBe('hop');
    expect(s.conTro?.chuoi).toBe('hop-00');
    expect(s.hoSo.bangChung).toEqual(expect.arrayContaining(['ev-the-lich', 'ev-hai-lop', 'ev-hai-ma', 'ev-nhat-ky-in']));
    expect(s.hoSo.manhMoi).toContain('clue-loi-chu-cuong');
    const ket = choiTuDong(KB, s, DUNG_KET_THAT, (_st, kn) => kn.kind === 'end');
    expect(khungNhin(KB, ket)).toMatchObject({ kind: 'end', ketQua: 'that' });
  });

  it('trạng thái nhảy tới giống hệt tự chơi đường thường (không có "cửa sau"), và lưu/nạp JSON được', () => {
    const s = nhayToi(KB, 'ten-h', 7);
    const thuong = choiTuDong(KB, nhayToi(KB, 'lop', 7), DUNG_KET_THAT, (_st, kn) => kn.kind === 'challenge' && kn.thuThach.id === 'c-ten-h');
    expect(thuong).toEqual(s);
    expect(JSON.parse(JSON.stringify(s))).toEqual(s);
  });
});
