import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { dangO, noiTheoLich } from './lich-nhan-vat';
import { lichNgay, thuCua } from './lich-ngay';

const KB = KICH_BAN_MVP as unknown as KichBanMvp;

/** Ngày trong truyện của từng bản đồ (thêm bản đồ mới thì thêm dòng ở đây). */
const l = lichNgay(KB.lich.ngayMoDau ?? null);
const ngayVu = (id: string): string => (KB.lich.vuSau ?? []).find((v) => v.id === id)?.ngay ?? '';
const NGAY_BAN_DO: Record<string, string> = {
  'kp-bd-n2': l.ngayDieuTra(2),
  'kp-bd-n3': l.ngayDieuTra(3),
  'kp-bd-n4': l.ngayDieuTra(4),
  'kp-bd-v2': ngayVu('vu2'),
  'kp-bd-v3': ngayVu('vu3'),
  'kp-bd-v5': ngayVu('vu5'),
};

const banDo = KB.chuoi.flatMap((c) => c.nodes.flatMap((n) => (n.type === 'explore' && n.kieu === 'ban-do' ? [n] : [])));

describe('lịch nhân vật theo thứ và giờ', () => {
  it('bác Thịnh: thứ Hai tới thứ Bảy ở sảnh tòa B cả ngày, Chủ nhật chỉ buổi tối', () => {
    expect(dangO(KB.nhanVat, 3, '09:30', 'toa-b')).toContain('bac-tu');
    expect(dangO(KB.nhanVat, 0, '09:30', 'toa-b')).not.toContain('bac-tu');
    expect(dangO(KB.nhanVat, 0, '20:30', 'toa-b')).toContain('bac-tu');
  });

  it('Minh Anh chỉ ở phòng CLB chiều thứ Hai, Tư, Sáu; Duy chiều nào cũng ở', () => {
    expect(dangO(KB.nhanVat, 5, '15:00', 'nha-clb').sort()).toEqual(['duy', 'minh-anh']);
    expect(dangO(KB.nhanVat, 4, '15:00', 'nha-clb')).toEqual(['duy']);
    expect(dangO(KB.nhanVat, 5, '09:30', 'nha-clb')).toEqual([]);
  });

  it('bà Lụa: ngày thường chỉ bán buổi chiều, cuối tuần bán từ sớm', () => {
    const ba = KB.nhanVat.find((n) => n.id === 'ba-lua');
    expect(noiTheoLich(ba, 3, '09:30')).toBeNull();
    expect(noiTheoLich(ba, 3, '16:30')).toBe('tra-da');
    expect(noiTheoLich(ba, 6, '07:00')).toBe('tra-da');
  });

  it('bản đồ nào cũng có giờ và có ngày trong bảng của bài kiểm này', () => {
    expect(banDo.map((n) => n.id).sort()).toEqual(Object.keys(NGAY_BAN_DO).sort());
    for (const n of banDo) expect(n.gio, n.id).toMatch(/^\d\d:\d\d$/);
  });

  it('người kịch bản đặt ở một ghim (`có:`) không bị lịch đặt ở ghim khác vào đúng lúc đó', () => {
    for (const n of banDo) {
      const thu = thuCua(NGAY_BAN_DO[n.id] ?? '');
      for (const d of n.diem) {
        for (const ma of d.co ?? []) {
          const noi = noiTheoLich(KB.nhanVat.find((x) => x.id === ma), thu, n.gio ?? '');
          expect(noi === null || `ghim:${noi}` === d.sprite, `${n.id}: ${ma} được đặt ở ${d.sprite} nhưng lịch ghi ${noi}`).toBe(true);
        }
      }
    }
  });
});
