import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { diemTrongNoi, ghimHien, noiNgoaiBanDo, soChoMoi, type GhimBanDoMvp } from './diem-tuong-tac';
import { danhSachDiaDiem, taoTrangThai, type DiaDiemHienMvp } from './may';
import type { TrangThaiMvp } from './trang-thai';

const kb = KICH_BAN_MVP as unknown as KichBanMvp;

/** Trạng thái "tự do trong ngày" dựng tay (không chạy mở đầu): ngày, khung, hồ sơ, dữ kiện đã làm. */
function tuDo(ngay: number, them: Partial<TrangThaiMvp> & { manhMoi?: string[]; bangChung?: string[] } = {}): TrangThaiMvp {
  const { manhMoi = [], bangChung = [], ...con } = them;
  const s = taoTrangThai(kb, 1);
  return { ...s, giaiDoan: 'ngay', ngay, khung: 0, conTro: null, hoiDap: null, hoSo: { manhMoi, taiLieu: [], bangChung }, ...con };
}

function noi(s: TrangThaiMvp, id: string): DiaDiemHienMvp {
  const n = danhSachDiaDiem(kb, s).find((d) => d.diaDiem.id === id);
  if (!n) throw new Error(`địa điểm ${id} chưa mở`);
  return n;
}

describe('điểm tương tác trong địa điểm', () => {
  it('nội dung thật: mọi dữ kiện đều có dòng Ảnh (không dữ kiện nào chỉ chọn được qua danh sách chữ)', () => {
    const thieu = kb.diaDiem.flatMap((d) => d.duKien).filter((k) => !k.anh);
    expect(thieu.map((k) => k.id)).toEqual([]);
  });

  it('nhãn điểm là nhãn trung tính, không bao giờ là (hay chứa) moTa của dữ kiện', () => {
    const s = tuDo(5, { khung: 1, manhMoi: ['clue-quyen-du-lieu', 'clue-can-ma-va-can-cu'], bangChung: ['ev-hai-ma'] });
    for (const dd of danhSachDiaDiem(kb, s)) {
      for (const d of diemTrongNoi(kb, dd)) {
        expect(d.nhan, d.khoa).not.toBe('');
        for (const k of d.duKien) expect(d.nhan, d.khoa).not.toContain(k.duKien.moTa);
      }
    }
  });

  it('vật dùng chung hai dữ kiện (bàn máy) là MỘT điểm, mở đúng dữ kiện theo ngày', () => {
    // Ngày 2: chỉ dk-loc-lop hiện (dk-ten-h mở từ ngày 4).
    const ngay2 = diemTrongNoi(kb, noi(tuDo(2, { manhMoi: ['clue-quyen-du-lieu'] }), 'phong-may'));
    const banMay2 = ngay2.filter((d) => d.anh.sprite === 'obj-ban-may');
    expect(banMay2).toHaveLength(1);
    expect(banMay2[0]?.moDuoc.map((k) => k.duKien.id)).toEqual(['dk-loc-lop']);
    expect(banMay2[0]?.nhan).toBe('Ngồi vào máy tính');

    // Ngày 4, đã lọc lớp: cùng điểm đó giờ mở dk-ten-h; nhãn không mang số dù hai dữ kiện trùng nhãn.
    const s4 = tuDo(4, { manhMoi: ['clue-quyen-du-lieu', 'clue-can-ma-va-can-cu'], duKienDaLam: ['dk-loc-lop'] });
    const banMay4 = diemTrongNoi(kb, noi(s4, 'phong-may')).filter((d) => d.anh.sprite === 'obj-ban-may');
    expect(banMay4).toHaveLength(1);
    expect(banMay4[0]?.duKien.map((k) => k.duKien.id)).toEqual(['dk-loc-lop', 'dk-ten-h']);
    expect(banMay4[0]?.moDuoc.map((k) => k.duKien.id)).toEqual(['dk-ten-h']);
    expect(banMay4[0]?.trangThai).toBe('mo');
    expect(banMay4[0]?.nhan).toBe('Ngồi vào máy tính');
  });

  it('máy in: hai dữ kiện cùng mở → điểm có hai việc; một chưa đủ điều kiện → chỉ một', () => {
    const du = diemTrongNoi(kb, noi(tuDo(4, { bangChung: ['ev-hai-ma'] }), 'phong-may')).find((d) => d.anh.sprite === 'obj-may-in-nhat-ky');
    expect(du?.moDuoc.map((k) => k.duKien.id)).toEqual(['dk-nhat-ky-in', 'dk-dong-in-bai-tap']);
    const thieu = diemTrongNoi(kb, noi(tuDo(4), 'phong-may')).find((d) => d.anh.sprite === 'obj-may-in-nhat-ky');
    expect(thieu?.moDuoc.map((k) => k.duKien.id)).toEqual(['dk-dong-in-bai-tap']);
  });

  it('trạng thái điểm: đã xem / khóa (không đủ "Cần") / mở', () => {
    const khoa = diemTrongNoi(kb, noi(tuDo(2), 'phong-may')).find((d) => d.anh.sprite === 'obj-ban-may');
    expect(khoa?.trangThai).toBe('khoa');
    const daXem = diemTrongNoi(kb, noi(tuDo(2, { duKienDaLam: ['dk-bac-thinh-the-lich'] }), 'toa-b')).find((d) => d.anh.sprite === 'obj-hop-kien-nghi');
    expect(daXem?.trangThai).toBe('da-xem');
  });
});

describe('ghim bản đồ', () => {
  const GHIM: GhimBanDoMvp[] = [
    { id: 'b', ten: 'Tòa B', x: 10, y: 10, diaDiem: ['toa-b'] },
    { id: 'hc', ten: 'Tòa hành chính', x: 20, y: 20, diaDiem: ['phong-dao-tao', 'phong-ctsv'] },
    { id: 'may', ten: 'Phòng máy', x: 30, y: 30, diaDiem: ['phong-may'] },
  ];

  it('chỉ hiện ghim có nơi đang mở; tòa nhiều phòng chỉ liệt kê phòng đang mở; số chỗ còn mới cộng dồn', () => {
    const ngay1 = ghimHien(GHIM, danhSachDiaDiem(kb, tuDo(1)));
    expect(ngay1.map((g) => g.ghim.id)).toEqual(['b']);
    const ngay2 = ghimHien(GHIM, danhSachDiaDiem(kb, tuDo(2)));
    expect(ngay2.map((g) => g.ghim.id)).toEqual(['b', 'hc', 'may']);
    expect(ngay2.find((g) => g.ghim.id === 'hc')?.noi.map((n) => n.diaDiem.id)).toEqual(['phong-dao-tao']);
    const ngay3 = ghimHien(GHIM, danhSachDiaDiem(kb, tuDo(3)));
    const hc = ngay3.find((g) => g.ghim.id === 'hc');
    expect(hc?.noi.map((n) => n.diaDiem.id)).toEqual(['phong-dao-tao', 'phong-ctsv']);
    expect(hc?.conMoi).toBe((hc?.noi ?? []).reduce((s, n) => s + soChoMoi(n), 0));
  });

  it('nơi đang mở mà không ghim nào chứa → vẫn liệt kê để đến được', () => {
    const ds = danhSachDiaDiem(kb, tuDo(3));
    expect(noiNgoaiBanDo(GHIM, ds).map((d) => d.diaDiem.id)).toEqual(['phong-clb', 'cang-tin', 'cong-ktx']);
  });
});
