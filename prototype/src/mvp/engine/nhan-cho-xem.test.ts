import { describe, expect, it } from 'vitest';
// Chế độ địa điểm (ngày × địa điểm): fixture đóng băng Vụ 1 bản cũ — chương 1 thật không còn địa điểm (ĐÃ CHỐT C, 30/09/2026).
import { KICH_BAN_DIA_DIEM } from './testing/kich-ban-dia-diem.fixture';
import type { KichBanMvp } from '../../content/mvp/types';
import { nhanChoXem, nhanChoXemDs } from './nhan-cho-xem';

const kb = KICH_BAN_DIA_DIEM as unknown as KichBanMvp;

describe('nhãn chỗ xem xét (không lộ manh mối)', () => {
  const tatCa = kb.diaDiem.flatMap((dd) => dd.duKien);

  it('không nhãn nào là dòng mô tả cho tác giả, và không chứa chi tiết manh mối', () => {
    for (const dk of tatCa) {
      const nhan = nhanChoXem(kb, dk);
      expect(nhan, dk.id).not.toBe(dk.moTa);
      expect(nhan, dk.id).not.toMatch(/huy hiệu|bánh răng|6:45|23:10|thẻ lịch rách|năm 4|SV2\d{5}/i);
    }
  });

  it('dựng nhãn theo việc sẽ làm: nói với ai, xem tài liệu nào, ngồi vào máy', () => {
    const theoId = (id: string) => nhanChoXem(kb, tatCa.find((d) => d.id === id)!);
    expect(theoId('dk-loi-chu-cuong')).toBe('Nói chuyện với chú Cường');
    expect(theoId('dk-don-robotics')).toBe('Xem: Đơn xin phòng làm xưởng');
    expect(theoId('dk-loc-lop')).toBe('Ngồi vào máy tính');
    expect(theoId('dk-co-hanh-cap-quyen')).toBe('Nói chuyện với cô Hạnh');
    // Đồ vật mang nhãn theo đồ vật, không theo người nói trong chuỗi (user chốt 29/09).
    expect(theoId('dk-nhat-ky-in')).toBe('Xem xét chỗ này');
    expect(theoId('dk-bac-thinh-the-lich')).toBe('Xem xét chỗ này');
  });

  it('trong cùng một địa điểm, nhãn không trùng nhau', () => {
    for (const dd of kb.diaDiem) {
      const nhan = nhanChoXemDs(kb, dd.duKien);
      expect(new Set(nhan).size, dd.id).toBe(nhan.length);
    }
  });
});
