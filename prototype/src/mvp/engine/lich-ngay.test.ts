import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import {
  conLai,
  congNgay,
  dinhDangNgay,
  homNay,
  lichNgay,
  luoiThang,
  mocLich,
  NGAY_MO_DAU_MAC_DINH,
  soNgayGiua,
  tenThu,
} from './lich-ngay';

const ngayDt = (n: number) => ({ giaiDoan: 'ngay' as const, ngay: n });

describe('lich-ngay: mốc chương 1 năm 2024', () => {
  it('lich.md khai ngày mở đầu 2024-09-08, là Chủ nhật', () => {
    expect(KICH_BAN_MVP.lich.ngayMoDau).toBe('2024-09-08');
    expect(tenThu('2024-09-08')).toBe('Chủ nhật');
  });

  it('từng mốc đúng ngày, đúng thứ', () => {
    const l = lichNgay('2024-09-08');
    expect(dinhDangNgay(l.nhanPhong)).toBe('Chủ nhật, 08/09/2024');
    expect(l.tuanCongDan).toEqual({ tu: '2024-09-09', den: '2024-09-13' });
    expect(tenThu(l.tuanCongDan.tu)).toBe('thứ Hai');
    expect(tenThu(l.tuanCongDan.den)).toBe('thứ Sáu');
    expect(dinhDangNgay(l.ngayHoi)).toBe('thứ Bảy, 14/09/2024');
    expect(dinhDangNgay(l.trungThu)).toBe('thứ Ba, 17/09/2024');
    expect(dinhDangNgay(l.phongClb)).toBe('thứ Hai, 23/09/2024');
    expect([1, 2, 3, 4, 5].map((n) => dinhDangNgay(l.ngayDieuTra(n)))).toEqual([
      'thứ Ba, 24/09/2024',
      'thứ Tư, 25/09/2024',
      'thứ Năm, 26/09/2024',
      'thứ Sáu, 27/09/2024',
      'thứ Bảy, 28/09/2024',
    ]);
    expect(dinhDangNgay(l.hop)).toBe('thứ Hai, 30/09/2024');
  });

  it('thiếu ngày mở đầu → mặc định 2024-09-08', () => {
    expect(lichNgay(null).nhanPhong).toBe(NGAY_MO_DAU_MAC_DINH);
    expect(lichNgay(undefined).hop).toBe('2024-09-30');
  });

  it('thư in đêm Chủ nhật trước ngày nộp (nhat_ky_in 2024-09-15 23:10) khớp lịch', () => {
    const l = lichNgay('2024-09-08');
    const bang = KICH_BAN_MVP.duLieu?.bang.find((b) => b.ten === 'nhat_ky_in');
    const thu = bang?.dong.find((d) => d[2] === 'kien-nghi-phong-clb.docx');
    expect(thu?.[0]).toBe('2024-09-15 23:10');
    expect(congNgay(l.trungThu, -2)).toBe('2024-09-15');
    expect(congNgay(l.phongClb, -7)).toBe('2024-09-16');
    expect(tenThu('2024-09-15')).toBe('Chủ nhật');
  });

  it('homNay theo giai đoạn', () => {
    expect(homNay({ giaiDoan: 'mo-dau', ngay: 0 })).toEqual({ ngay: '2024-09-08', moDau: true });
    expect(homNay({ giaiDoan: 'mo-dau', ngay: 0, conTro: { chuoi: 'md-10-mat-banh' } }).ngay).toBe('2024-09-17');
    expect(homNay({ giaiDoan: 'mo-dau', ngay: 0, conTro: { chuoi: 'md-11-la-thu' } }).ngay).toBe('2024-09-23');
    expect(homNay(ngayDt(1))).toEqual({ ngay: '2024-09-24', moDau: false });
    expect(homNay(ngayDt(5)).ngay).toBe('2024-09-28');
    expect(homNay({ giaiDoan: 'hop', ngay: 5 }).ngay).toBe('2024-09-30');
    expect(homNay({ giaiDoan: 'het', ngay: 5 }).ngay).toBe('2024-09-30');
  });

  it('còn n ngày tới buổi họp', () => {
    const hop = lichNgay().hop;
    expect(soNgayGiua('2024-09-24', hop)).toBe(6);
    expect(conLai(hop, homNay(ngayDt(1)).ngay)).toBe('còn 6 ngày');
    expect(conLai(hop, homNay(ngayDt(5)).ngay)).toBe('còn 2 ngày');
    expect(conLai(hop, '2024-09-29')).toBe('ngày mai');
    expect(conLai(hop, hop)).toBe('hôm nay');
    expect(conLai(hop, '2024-10-01')).toBe('đã qua');
  });
});

describe('mocLich', () => {
  it('ngày 1: mốc tuần đầu đã qua, ngày 1 là hôm nay, buổi họp là hạn của vụ; ngày chưa tới không hiện', () => {
    const ds = mocLich(ngayDt(1), { tenNgay: (n) => (n === 1 ? 'Sảnh tòa B' : '') });
    expect(ds.map((m) => [m.ngay, m.ten, m.loai])).toEqual([
      ['2024-09-08', 'Nhận phòng KTX', 'qua'],
      ['2024-09-09', 'Tuần sinh hoạt công dân', 'qua'],
      ['2024-09-14', 'Ngày hội CLB', 'qua'],
      ['2024-09-17', 'Trung thu · CLB gặp mặt', 'qua'],
      ['2024-09-23', 'Phòng CLB · lá thư', 'qua'],
      ['2024-09-24', 'Ngày 1', 'hom-nay'],
      ['2024-09-30', 'Buổi họp rà soát', 'han'],
    ]);
    expect(ds.find((m) => m.ten === 'Ngày 1')?.chiTiet).toBe('Sảnh tòa B');
    expect(ds.find((m) => m.loai === 'han')?.han).toBe('vu');
  });

  it('mở đầu: chỉ ngày nhận phòng, không lộ lá thư hay buổi họp', () => {
    const ds = mocLich({ giaiDoan: 'mo-dau', ngay: 0 });
    expect(ds).toEqual([{ ngay: '2024-09-08', ten: 'Nhận phòng KTX', ngan: 'Nhận phòng', chiTiet: 'Phòng 408', loai: 'hom-nay' }]);
  });

  it('mở đầu: mốc Trung thu hiện lúc tới sân KTX, lá thư chỉ hiện sau đó', () => {
    const trungThu = mocLich({ giaiDoan: 'mo-dau', ngay: 0, conTro: { chuoi: 'md-10-mat-banh' } });
    expect(trungThu.at(-1)).toMatchObject({ ngay: '2024-09-17', ten: 'Trung thu · CLB gặp mặt', chiTiet: '19:00', loai: 'hom-nay' });
    expect(trungThu.some((m) => m.ten.includes('lá thư'))).toBe(false);
    const nhanThu = mocLich({ giaiDoan: 'mo-dau', ngay: 0, conTro: { chuoi: 'md-11-la-thu' } });
    expect(nhanThu.at(-1)).toMatchObject({ ngay: '2024-09-23', ten: 'Phòng CLB · lá thư', chiTiet: '16:00', loai: 'hom-nay' });
  });

  it('buổi họp: năm ngày đã qua, hạn thành hôm nay mà vẫn đánh dấu hạn', () => {
    const ds = mocLich({ giaiDoan: 'hop', ngay: 5 });
    const ngayDieuTra = ds.filter((m) => /^Ngày \d$/.test(m.ten));
    expect(ngayDieuTra).toHaveLength(5);
    expect(ngayDieuTra.every((m) => m.loai === 'qua')).toBe(true);
    expect(ds.at(-1)).toMatchObject({ ten: 'Buổi họp rà soát', loai: 'hom-nay', han: 'vu' });
  });

  it('hạn nhiệm vụ phụ (chỗ cho Vụ 2) xếp đúng chỗ, đánh dấu phu', () => {
    const ds = mocLich(ngayDt(2), { hanPhu: [{ ngay: '2024-09-27', ten: 'Nộp biên bản' }] });
    const i = ds.findIndex((m) => m.ten === 'Nộp biên bản');
    expect(ds[i]).toMatchObject({ loai: 'han', han: 'phu' });
    expect(ds[i + 1]?.ten).toBe('Buổi họp rà soát');
  });
});

describe('luoiThang', () => {
  it('tháng 9/2024: bắt đầu chủ nhật → hàng đầu 6 ô trống; 30 ngày', () => {
    const l = luoiThang(2024, 9);
    expect(l[0]).toEqual([null, null, null, null, null, null, '2024-09-01']);
    expect(l.flat().filter(Boolean)).toHaveLength(30);
    expect(l.every((h) => h.length === 7)).toBe(true);
    expect(l.at(-1)?.[0]).toBe('2024-09-30');
  });
});
