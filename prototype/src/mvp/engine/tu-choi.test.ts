// @vitest-environment node
/**
 * Lối tắt "Nhảy tới" của người quan sát (gói giao-dien-mvp): mỗi điểm nhảy dựng đúng trạng thái như người chơi đã đi
 * tới đó bình thường (ngày/khung, màn thử thách đúng mã, hồ sơ có thẻ mong đợi); nhảy buổi họp còn đủ 5 vạch và
 * chơi tiếp đúng vẫn tới kết thật.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { khungNhin, TEN_MAC_DINH } from './may';
import { choiTuDong, chonTheoUuTien, DIEM_NHAY_MVP, DUONG_DU_BANG_CHUNG, nhayToi } from './tu-choi';

const KB = KICH_BAN_MVP as unknown as KichBanMvp;

describe('nhảy tới (MVP)', () => {
  it('có đúng ba điểm nhảy, mỗi điểm có nhãn và mô tả', () => {
    expect(DIEM_NHAY_MVP.map((d) => d.id)).toEqual(['loc-lop', 'ten-h', 'hop-sua-or']);
    for (const d of DIEM_NHAY_MVP) {
      expect(d.nhan.length).toBeGreaterThan(0);
      expect(d.moTa.length).toBeGreaterThan(0);
    }
  });

  it('ngày 2 · lọc lớp: đang ở bài đầu chuỗi (c-loc-khoa), ngày 2, có quyền dữ liệu + thẻ lịch, tên mặc định, ngành đầu danh sách', () => {
    const s = nhayToi(KB, 'loc-lop', 1);
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'challenge', thuThach: { id: 'c-loc-khoa' } });
    expect(s.giaiDoan).toBe('ngay');
    expect(s.ngay).toBe(2);
    expect(s.khung).toBe(2);
    expect(s.duKienDangLam).toBe('dk-loc-lop');
    expect(s.hoSo.manhMoi).toEqual(expect.arrayContaining(['clue-chu-ky-h', 'clue-quyen-du-lieu']));
    expect(s.hoSo.bangChung).toContain('ev-the-lich');
    expect(s.hoSo.bangChung).not.toContain('ev-lop-bc24a');
    expect(s.tenNguoiChoi).toBe(TEN_MAC_DINH);
    expect(s.nganh.length).toBeGreaterThan(0);
    // Làm hết chuỗi như người chơi → bằng chứng vào hồ sơ, dữ kiện chính đạt.
    const sau = choiTuDong(KB, s, { chonDuKien: () => null }, (st) => st.chinhXong);
    expect(sau.hoSo.bangChung).toContain('ev-lop-bc24a');
    expect(sau.chinhXong).toBe(true);
  });

  it('ngày 4 · tên H: đang ở thử thách c-ten-h, ngày 4, hồ sơ có lớp BC24A và căn cứ nộp mã', () => {
    const s = nhayToi(KB, 'ten-h', 1);
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'challenge', thuThach: { id: 'c-ten-h' } });
    expect(s.giaiDoan).toBe('ngay');
    expect(s.ngay).toBe(4);
    expect(s.duKienDangLam).toBe('dk-ten-h');
    expect(s.hoSo.bangChung).toEqual(expect.arrayContaining(['ev-the-lich', 'ev-lop-bc24a']));
    expect(s.hoSo.manhMoi).toContain('clue-can-ma-va-can-cu');
    expect(s.hoSo.bangChung).not.toContain('ev-hai-ma');
  });

  it('buổi họp · sửa OR: đang ở màn sửa truy vấn c-sua-or-quan, 5 vạch, đủ dữ kiện phụ; chơi tiếp đúng → kết thật', () => {
    const s = nhayToi(KB, 'hop-sua-or', 1);
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'fix-query', thuThach: { id: 'c-sua-or-quan' } });
    expect(s.giaiDoan).toBe('hop');
    expect(s.uyTin).toBe(5);
    expect(s.conTro?.chuoi).toBe('hop-00');
    expect(s.hoSo.bangChung).toEqual(expect.arrayContaining(['ev-the-lich', 'ev-lop-bc24a', 'ev-hai-ma', 'ev-nhat-ky-in']));
    expect(s.hoSo.manhMoi).toEqual(expect.arrayContaining(['clue-loi-chu-cuong', 'clue-loi-dat']));
    const ket = choiTuDong(KB, s, { chonDuKien: () => null, reNhanh: () => 'tu-ke' }, (_st, kn) => kn.kind === 'end');
    expect(khungNhin(KB, ket)).toEqual({ kind: 'end', ketQua: 'that' });
    expect(ket.uyTin).toBe(5);
  });

  it('trạng thái nhảy tới giống hệt tự chơi đường thường (không có "cửa sau"), và lưu/nạp JSON được', () => {
    const s = nhayToi(KB, 'ten-h', 7);
    const thuong = choiTuDong(
      KB,
      // Ván mới cùng mốc: tự chơi cùng đường đi, dừng ở cùng màn.
      nhayToi(KB, 'loc-lop', 7),
      { chonDuKien: chonTheoUuTien(DUONG_DU_BANG_CHUNG, false) },
      (_st, kn) => kn.kind === 'challenge' && kn.thuThach.id === 'c-ten-h',
    );
    expect(thuong).toEqual(s);
    expect(JSON.parse(JSON.stringify(s))).toEqual(s);
  });
});
