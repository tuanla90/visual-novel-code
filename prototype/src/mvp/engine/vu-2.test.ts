/**
 * VỤ 2 "Bốn mục trong sổ đã ký" — chơi tiếp sau màn kết Vụ 1 (lich.md `{vụ sau: vu2}`), trên kịch bản thật.
 * Kiểm: nút sang vụ, cờ máy đặt, câu mở rẽ theo kết Vụ 1, thẻ vụ trước gỡ khỏi bảng, đường chơi tới màn kết Vụ 2,
 * và chấm SQL thật của thẻ `v2-loc-buoi` (gọt cột + xếp theo ngày, chấm cả thứ tự dòng).
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { BoDuLieuMvp, KichBanMvp } from '../../content/mvp/types';
import { giaTriTuHoSo } from './giay-nho';
import { khungNhin, taoTrangThai, xuLy, type KhungNhinMvp } from './may';
import { chamThuThach, phanUngSauKhiChay } from './sql-mvp';
import type { TrangThaiMvp } from './trang-thai';
import { cauTuSql, khoiCuaThe, khungTuSqlChuan, tachWhere, thanhSql, type CauDung } from './trinh-dung';
import { RE_NHANH_KET_THAT, choiTuDong, nhayToi, reNhanhTheo, type ChienThuat } from './tu-choi';

const KB = KICH_BAN_MVP as unknown as KichBanMvp;
const DU_LIEU = KB.duLieu as BoDuLieuMvp;
const THE = KB.thuThach['v2-loc-buoi'];
if (!THE) throw new Error('thiếu thẻ v2-loc-buoi');

const ketVu1 = (that: boolean): TrangThaiMvp => {
  const ct: ChienThuat = { reNhanh: reNhanhTheo(that ? RE_NHANH_KET_THAT : { 'r-moi-hoai': 'dung' }) };
  return choiTuDong(KB, taoTrangThai(KB, 1), ct, () => false);
};
const chuoiDangChay = (s: TrangThaiMvp): string => s.conTro?.chuoi ?? '';
const laEnd = (kn: KhungNhinMvp): kn is Extract<KhungNhinMvp, { kind: 'end' }> => kn.kind === 'end';

describe('Vụ 2: sang vụ sau từ màn kết Vụ 1', () => {
  it('lịch có vụ sau vu2; màn kết Vụ 1 báo còn vụ kế và máy đã đặt cờ kết', () => {
    expect(KB.lich.vuSau?.map((v) => v.id)).toEqual(['vu2']);
    const s = ketVu1(true);
    const kn = khungNhin(KB, s);
    expect(kn).toMatchObject({ kind: 'end', ketQua: 'that', vu: null, vuKe: { id: 'vu2', chuoi: 'v2-mo', ngay: '2024-10-25' } });
    expect(s.co).toEqual(expect.arrayContaining(['vu1-hoan-tat', 'vu1-ket-that']));
    expect(s.co).not.toContain('vu1-ket-thuong');
  });

  it('sang-vu-sau: giai đoạn vu-sau, thẻ Vụ 1 gỡ khỏi bảng (vẫn trong hồ sơ), không còn giấy nhớ cũ ở màn tra', () => {
    const truoc = ketVu1(true);
    const s = xuLy(KB, truoc, { type: 'sang-vu-sau' });
    expect(s.giaiDoan).toBe('vu-sau');
    expect(s.vu).toBe('vu2');
    expect(s.ketQua).toBe('that');
    expect(s.hoSo).toEqual(truoc.hoSo);
    const tatCa = [...truoc.hoSo.taiLieu, ...truoc.hoSo.manhMoi, ...truoc.hoSo.bangChung];
    expect(tatCa.length).toBeGreaterThan(5);
    expect(s.bang?.boGhim).toEqual(expect.arrayContaining(tatCa));
    expect(giaTriTuHoSo(KB, truoc.hoSo).length).toBeGreaterThan(3);
    expect(giaTriTuHoSo(KB, s.hoSo, [], s.bang?.boGhim)).toEqual([]);
  });

  it('câu mở rẽ theo kết Vụ 1: kết thật → v2-mo-that; kết thường → v2-mo', () => {
    expect(chuoiDangChay(xuLy(KB, ketVu1(true), { type: 'sang-vu-sau' }))).toBe('v2-mo-that');
    const thuong = ketVu1(false);
    expect(khungNhin(KB, thuong)).toMatchObject({ kind: 'end', ketQua: 'thuong' });
    expect(thuong.co).toContain('vu1-ket-thuong');
    expect(chuoiDangChay(xuLy(KB, thuong, { type: 'sang-vu-sau' }))).toBe('v2-mo');
  });

  it.each([
    ['kiem-ma', false],
    ['tin-tung', true],
  ])('đường chơi (rẽ %s) tới màn kết Vụ 2: đủ thẻ, đủ sổ, cờ vu2-hoan-tat, không còn vụ kế', (re, quaTinTung) => {
    const daQua: string[] = [];
    const ct: ChienThuat = { reNhanh: reNhanhTheo({ ...RE_NHANH_KET_THAT, 'r-v2-huong': re }), sangVuSau: true, traLoi: (id, lan) => (id === 'q-v2-ket-luan' && lan === 0 ? 'sai' : 'dung') };
    const s = choiTuDong(KB, taoTrangThai(KB, 1), ct, (x) => {
      const c = chuoiDangChay(x);
      if (c.startsWith('v2-') && !daQua.includes(c)) daQua.push(c);
      return false;
    });
    const kn = khungNhin(KB, s);
    expect(laEnd(kn) && kn.vu?.id).toBe('vu2');
    expect(laEnd(kn) && kn.vuKe).toBeNull();
    expect(daQua.includes('v2-tin-tung')).toBe(quaTinTung);
    expect(daQua).toEqual(expect.arrayContaining(['v2-mo-that', 'v2-giao-viec', 'v2-tra', 'v2-xac-nhan']));
    expect(s.hoSo.taiLieu).toContain('doc-v2-raw-logs');
    expect(s.hoSo.manhMoi).toEqual(expect.arrayContaining(['clue-ma-phong-clb', 'clue-da-xac-nhan', 'clue-v2-so-giay']));
    expect(s.hoSo.bangChung).toContain('ev-v2-activities');
    expect(s.soTay).toEqual(expect.arrayContaining(['chuan-hoa', 'sap-xep']));
    expect(s.co).toEqual(expect.arrayContaining(['v2-log-mo', 'v2-ket-luan-dung', 'vu2-hoan-tat']));
    // Chọn sai kết luận một lần: chỉ có phản hồi và hỏi lại, không phạt.
    expect(s.lanThu['q-v2-ket-luan']).toBe(2);
    // Hết vụ: bấm sang vụ sau không làm gì.
    expect(xuLy(KB, s, { type: 'sang-vu-sau' })).toBe(s);
  });

  it('màn tra Vụ 2 chỉ có hai giấy nhớ của vụ này; điểm nhảy vu2-buoi tới đúng thẻ', () => {
    const s = nhayToi(KB, 'vu2-buoi', 1);
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'challenge', thuThach: { id: 'v2-loc-buoi' } });
    expect(giaTriTuHoSo(KB, s.hoSo, [], s.bang?.boGhim).map((g) => g.giaTri)).toEqual(['clb-tham-tu', 'DA_XAC_NHAN']);
  });

  it('lưu giữa Vụ 2 rồi nạp lại: chơi tiếp tới màn kết Vụ 2', () => {
    const giua = nhayToi(KB, 'vu2-buoi', 1);
    const nap = JSON.parse(JSON.stringify(giua)) as TrangThaiMvp;
    const s = choiTuDong(KB, nap, {}, () => false);
    const kn = khungNhin(KB, s);
    expect(laEnd(kn) && kn.vu?.id).toBe('vu2');
  });
});

describe('Vụ 2: thẻ v2-loc-buoi chấm SQL thật', () => {
  const khung = khungTuSqlChuan(THE.sqlChuan);
  const kieu = (): 'TEXT' => 'TEXT';
  const cau = (ch: CauDung['dieuKien'][number]['chuanHoa'], xep: CauDung['xep'], coTrangThai = true): CauDung => ({
    khung: khung?.khung ?? '',
    dieuKien: [
      { cot: 'ma_phong', phep: 'bang', giaTri: { nguon: 'giay-nho', tho: 'clb-tham-tu' }, ...(ch ? { chuanHoa: ch } : {}) },
      ...(coTrangThai ? [{ cot: 'trang_thai', phep: 'bang' as const, giaTri: { nguon: 'giay-nho' as const, tho: 'DA_XAC_NHAN' } }] : []),
    ],
    noi: coTrangThai ? ['AND'] : [],
    xep,
  });
  const cham = (c: CauDung) => chamThuThach(DU_LIEU, thanhSql(c, kieu), THE.sqlChuan);

  it('thẻ bật cả hai khối mới; thẻ chương 1 không bật khối nào', () => {
    expect(khoiCuaThe(THE.sqlChuan)).toEqual({ chuanHoa: true, sapXep: true });
    for (const id of ['c-lop', 'c-ten-h', 'c-in', 'c-sua-or-quan']) expect(khoiCuaThe(KB.thuThach[id]?.sqlChuan ?? ''), id).toEqual({ chuanHoa: false, sapXep: false });
  });

  it('câu dựng đủ khối ra đúng chữ SQL và được chấm đúng', async () => {
    const c = cau('got-thuong', { cot: 'ngay', giam: false });
    expect(thanhSql(c, kieu)).toBe("SELECT ma_buoi, ngay, hoat_dong FROM nhat_ky_su_dung WHERE LOWER(TRIM(ma_phong)) = 'clb-tham-tu' AND trang_thai = 'DA_XAC_NHAN' ORDER BY ngay");
    const kq = await cham(c);
    expect(kq.trangThai).toBe('dung');
    if (kq.trangThai !== 'loi') expect(kq.chay.dong.map((d) => d[0])).toEqual(['BUOI-02', 'BUOI-04', 'BUOI-06', 'BUOI-08']);
  });

  it.each([
    [undefined, true, 1],
    ['got', true, 2],
    ['thuong', true, 2],
    [undefined, false, 2],
    ['got', false, 3],
    ['got-thuong', false, 5],
  ] as const)('các lần chạy "sai có ích": gọt %s, lọc trạng thái %s → %i dòng, có lời nhân vật', async (ch, coTrangThai, soDong) => {
    const c = cau(ch, { cot: 'ngay', giam: false }, coTrangThai);
    const kq = await cham(c);
    expect(kq.trangThai).toBe('sai');
    if (kq.trangThai === 'loi') return;
    expect(kq.so.soDongNguoiChoi).toBe(soDong);
    expect(kq.so.saiThuTu).toBeUndefined();
    expect(phanUngSauKhiChay(THE, kq, c.dieuKien.map((d) => d.cot)).length).toBeGreaterThan(0);
  });

  it('đủ bốn dòng nhưng chưa xếp / xếp ngược → sai thứ tự, lời "Khi sai thứ tự" của Duy', async () => {
    for (const xep of [null, { cot: 'ngay', giam: true }, { cot: 'hoat_dong', giam: false }]) {
      const kq = await cham(cau('got-thuong', xep));
      expect(kq.trangThai).toBe('sai');
      if (kq.trangThai === 'loi') continue;
      expect(kq.so).toMatchObject({ soDongNguoiChoi: 4, soDongChuan: 4, saiThuTu: true });
      const loi = phanUngSauKhiChay(THE, kq, ['ma_phong', 'trang_thai']);
      expect(loi[0]?.speaker).toBe('duy');
      expect(loi[0]?.text).toMatch(/thứ tự/);
    }
  });

  it('xếp theo mã buổi cũng ra đúng thứ tự ngày → chấm theo kết quả, vẫn đúng', async () => {
    expect((await cham(cau('got-thuong', { cot: 'ma_buoi', giam: false }))).trangThai).toBe('dung');
  });

  it('SQL chuẩn dựng lại được bằng khối và soi được từng điều kiện', () => {
    expect(cauTuSql(THE.sqlChuan)).toEqual(cau('got-thuong', { cot: 'ngay', giam: false }));
    expect(tachWhere(THE.sqlChuan)).toEqual({
      khung: 'SELECT ma_buoi, ngay, hoat_dong FROM nhat_ky_su_dung',
      bang: 'nhat_ky_su_dung',
      dieuKien: ["LOWER(TRIM(ma_phong)) = 'clb-tham-tu'", "trang_thai = 'DA_XAC_NHAN'"],
      noi: ['AND'],
    });
  });
});
