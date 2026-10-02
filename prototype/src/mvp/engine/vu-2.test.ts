/**
 * VỤ 2 "Tin đồn" (vụ sau `vu2` của lich.md) và NHIỆM VỤ PHỤ "Bốn mục trong sổ đã ký" (`so-phong`, Duy giao, mở sau Vụ 2) —
 * trên kịch bản thật. Kiểm: nút sang vụ, cờ máy đặt, thẻ vụ trước gỡ khỏi bảng, song tuyến (đi một hay hai hướng), lời nhắn
 * chị Linh khi đi đủ hai hướng, nhiệm vụ phụ nhận ở màn kết rồi quay lại, và chấm SQL thật: phiếu làm nguồn (WITH … AS) ở
 * `c-tin-goc`, gọt cột + xếp theo ngày ở `v2-loc-buoi`.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { BoDuLieuMvp, KichBanMvp } from '../../content/mvp/types';
import { giaTriTuHoSo } from './giay-nho';
import { khungNhin, taoTrangThai, xuLy, type KhungNhinMvp } from './may';
import { chamThuThach, chaySql, phanUngSauKhiChay } from './sql-mvp';
import type { TrangThaiMvp } from './trang-thai';
import { cauSoiDieuKien, cauTuSql, khoiCuaThe, khungTuSqlChuan, tachWhere, tenCte, thanhSql, type CauDung } from './trinh-dung';
import { RE_NHANH_KET_THAT, choiTuDong, nhayToi, reNhanhTheo, type ChienThuat } from './tu-choi';

const KB = KICH_BAN_MVP as unknown as KichBanMvp;
const DU_LIEU = KB.duLieu as BoDuLieuMvp;
const the = (id: string) => {
  const t = KB.thuThach[id];
  if (!t) throw new Error(`thiếu thẻ ${id}`);
  return t;
};
const THE = the('v2-loc-buoi');

const ketVu1 = (that: boolean): TrangThaiMvp => {
  const ct: ChienThuat = { reNhanh: reNhanhTheo(that ? RE_NHANH_KET_THAT : { 'r-moi-hoai': 'dung' }) };
  return choiTuDong(KB, taoTrangThai(KB, 1), ct, () => false);
};
const chuoiDangChay = (s: TrangThaiMvp): string => s.conTro?.chuoi ?? '';
type KnEnd = Extract<KhungNhinMvp, { kind: 'end' }>;
const ketCua = (s: TrangThaiMvp): KnEnd => {
  const kn = khungNhin(KB, s);
  if (kn.kind !== 'end') throw new Error(`chưa tới màn kết (đang ở ${kn.kind})`);
  return kn;
};
/** Chơi từ đầu tới màn kết Vụ 2 theo bảng rẽ nhánh; ghi lại các chuỗi `tin-…` đã qua. */
const ketVu2 = (re: Record<string, string>, traLoi?: ChienThuat['traLoi']): { s: TrangThaiMvp; daQua: string[] } => {
  const daQua: string[] = [];
  const ct: ChienThuat = { reNhanh: reNhanhTheo({ ...RE_NHANH_KET_THAT, ...re }), sangVuSau: true, ...(traLoi ? { traLoi } : {}) };
  const s = choiTuDong(KB, taoTrangThai(KB, 1), ct, (x, kn) => {
    const c = chuoiDangChay(x);
    if (c.startsWith('tin-') && !daQua.includes(c)) daQua.push(c);
    return kn.kind === 'end' && x.vu === 'vu2';
  });
  return { s, daQua };
};

describe('Vụ 2 "Tin đồn": sang vụ sau từ màn kết Vụ 1', () => {
  it('lịch: vụ sau vu2 (Tin đồn) và nhiệm vụ phụ so-phong do Duy giao, mở sau vu2', () => {
    expect(KB.lich.vuSau?.map((v) => [v.id, v.chuoi, v.ngay]).slice(0, 2)).toEqual([['vu2', 'tin-mo', '2024-10-09'], ['vu3', 'v3-mo', '2024-10-10']]);
    expect(KB.lich.nhiemVuPhu?.map((p) => [p.id, p.chuoi, p.nguoiGiao, p.moSau])).toEqual([['so-phong', 'v2-mo', 'duy', 'vu2'], ['micro', 'p-mic-mo', 'duy', 'vu4'], ['hoan-tien', 'p-hoan-mo', 'minh-anh', 'vu5']]);
  });

  it('màn kết Vụ 1: còn vụ kế, máy đã đặt cờ kết, chưa có nhiệm vụ phụ nào mở', () => {
    const s = ketVu1(true);
    const kn = ketCua(s);
    expect(kn).toMatchObject({ ketQua: 'that', vu: null, vuKe: { id: 'vu2', chuoi: 'tin-mo' }, phu: [], phuXong: null });
    expect(s.co).toEqual(expect.arrayContaining(['vu1-hoan-tat', 'vu1-ket-that']));
    expect(s.co).not.toContain('vu1-ket-thuong');
    expect(ketVu1(false).co).toContain('vu1-ket-thuong');
  });

  it('sang-vu-sau: giai đoạn vu-sau, thẻ Vụ 1 gỡ khỏi bảng (vẫn trong hồ sơ), màn tra không còn giấy nhớ cũ', () => {
    const truoc = ketVu1(true);
    const s = xuLy(KB, truoc, { type: 'sang-vu-sau' });
    expect(s.giaiDoan).toBe('vu-sau');
    expect(s.vu).toBe('vu2');
    expect(s.ketQua).toBe('that');
    expect(chuoiDangChay(s)).toBe('tin-mo');
    expect(s.hoSo).toEqual(truoc.hoSo);
    const tatCa = [...truoc.hoSo.taiLieu, ...truoc.hoSo.manhMoi, ...truoc.hoSo.bangChung];
    expect(tatCa.length).toBeGreaterThan(5);
    expect(s.bang?.boGhim).toEqual(expect.arrayContaining(tatCa));
    expect(giaTriTuHoSo(KB, truoc.hoSo).length).toBeGreaterThan(3);
    expect(giaTriTuHoSo(KB, s.hoSo, [], s.bang?.boGhim)).toEqual([]);
  });

  it('kết thường của Vụ 1 cũng vào được Vụ 2 và cũng đã có bóng người Robotics (lời chú Cường)', () => {
    const s = xuLy(KB, ketVu1(false), { type: 'sang-vu-sau' });
    expect(chuoiDangChay(s)).toBe('tin-mo');
    expect(s.hoSo.manhMoi).toContain('clue-loi-chu-cuong');
  });
});

describe('Vụ 2 "Tin đồn": song tuyến', () => {
  it.each([
    ['may', ['tin-tuyen-may', 'tin-tuyen-xuong']],
    ['xuong', ['tin-tuyen-xuong', 'tin-tuyen-may']],
  ])('bắt đầu từ hướng %s rồi đi nốt hướng kia: đủ thẻ hai hướng, có lời nhắn thứ hai của chị Linh', (dau, thuTu) => {
    const { s, daQua } = ketVu2({ 'r-tin-tuyen': dau, 'r-tin-sau-may': 'di-not', 'r-tin-sau-xuong': 'di-not' }, (id, lan) => (id === 'q-tin-ket-luan' && lan === 0 ? 'sai' : 'dung'));
    expect(daQua.filter((c) => c.startsWith('tin-tuyen-'))).toEqual(thuTu);
    expect(daQua).toContain('tin-ket-du');
    expect(daQua).not.toContain('tin-ket');
    expect(s.co).not.toContain('tin-ve-som');
    expect(s.hoSo.bangChung).toEqual(expect.arrayContaining(['ev-tin-don', 'ev-tin-goc', 'ev-tin-may', 'ev-tin-xuong']));
    expect(daQua).toContain(dau === 'may' ? 'tin-xuong-doi-chieu' : 'tin-may-doi-chieu');
    expect(s.hoSo.manhMoi).toEqual(expect.arrayContaining(['clue-noi-dung-tin', 'clue-tin-goc', 'clue-ngay-gui', 'clue-xuong-toi', 'clue-loi-nhan-linh-2']));
    expect(s.hoSo.taiLieu).toEqual(expect.arrayContaining(['doc-tin-don', 'doc-lich-xuong']));
    // Chọn sai kết luận một lần: chỉ có phản hồi và hỏi lại.
    expect(s.lanThu['q-tin-ket-luan']).toBe(2);
    expect(s.co).toContain('vu2-hoan-tat');
    expect(ketCua(s)).toMatchObject({ vu: { id: 'vu2' }, vuKe: { id: 'vu3' } });
  });

  it.each([
    ['may', 'r-tin-sau-may', 'tin-tuyen-xuong'],
    ['xuong', 'r-tin-sau-xuong', 'tin-tuyen-may'],
  ])('chỉ đi hướng %s rồi về sớm: Minh Anh bắt quay lại xem nốt; vẫn kết được vụ nhưng không có lời nhắn chị Linh', (dau, reSau, kia) => {
    const { s, daQua } = ketVu2({ 'r-tin-tuyen': dau, [reSau]: 've' });
    expect(daQua.filter((c) => c.startsWith('tin-tuyen-'))).toEqual([`tin-tuyen-${dau}`, kia]);
    expect(daQua).toContain('tin-ket');
    expect(daQua).toContain('tin-ket-du');
    expect(s.co).toContain('tin-ve-som');
    const tatCa = [...s.hoSo.manhMoi, ...s.hoSo.bangChung];
    expect(tatCa).toEqual(expect.arrayContaining(['ev-tin-may', 'ev-tin-xuong']));
    expect(tatCa).not.toContain('clue-loi-nhan-linh-2');
    expect(s.co).toContain('vu2-hoan-tat');
  });

  it('hết Vụ 2 Nam vẫn chưa được gỡ nghi: không thẻ nào nói Nam vô can', () => {
    const chu = JSON.stringify(Object.values(KB.hoSo).filter((t) => /tin|xuong|ngay-gui/.test(t.id))) + JSON.stringify(['c-tin-don', 'c-tin-goc', 'c-tin-may'].map((id) => the(id).vatChung));
    expect(chu).not.toMatch(/Nam không|không phải Nam|vô can/);
  });

  it('điểm nhảy tới hai lần tra của Vụ 2; màn tra chỉ có giấy nhớ của vụ này', () => {
    const s1 = nhayToi(KB, 'vu2-tin-don', 1);
    expect(khungNhin(KB, s1)).toMatchObject({ kind: 'challenge', thuThach: { id: 'c-tin-don' } });
    expect(giaTriTuHoSo(KB, s1.hoSo, [], s1.bang?.boGhim).map((g) => g.giaTri)).toEqual(['CLB Thám Tử soi dữ liệu']);
    const s2 = nhayToi(KB, 'vu2-tin-goc', 1);
    expect(khungNhin(KB, s2)).toMatchObject({ kind: 'challenge', thuThach: { id: 'c-tin-goc', kieuTrinhDung: 'loc-tiep', nguon: 'ev-tin-don' } });
    expect(giaTriTuHoSo(KB, s2.hoSo, [], s2.bang?.boGhim).map((g) => g.giaTri)).toEqual(['CLB Thám Tử soi dữ liệu', 'GOC']);
  });
});

describe('Vụ 2: chấm SQL thật — phiếu làm nguồn', () => {
  const tinDon = the('c-tin-don');
  const tinGoc = the('c-tin-goc');
  const kieu = (): 'TEXT' => 'TEXT';

  it('c-tin-don: "bằng" ra 0 dòng (tin còn đoạn sau), "bắt đầu bằng" ra 5 dòng và đúng', async () => {
    const khung = khungTuSqlChuan(tinDon.sqlChuan)?.khung ?? '';
    const cau = (phep: 'bang' | 'bat-dau-bang'): CauDung => ({ khung, dieuKien: [{ cot: 'noi_dung', phep, giaTri: { nguon: 'giay-nho', tho: 'CLB Thám Tử soi dữ liệu' } }], noi: [] });
    const bang = await chamThuThach(DU_LIEU, thanhSql(cau('bang'), kieu), tinDon.sqlChuan);
    expect(bang.trangThai).toBe('sai');
    if (bang.trangThai !== 'loi') {
      expect(bang.so.soDongNguoiChoi).toBe(0);
      expect(phanUngSauKhiChay(tinDon, bang, ['noi_dung']).length).toBeGreaterThan(0);
    }
    const like = await chamThuThach(DU_LIEU, thanhSql(cau('bat-dau-bang'), kieu), tinDon.sqlChuan);
    expect(like.trangThai).toBe('dung');
    if (like.trangThai !== 'loi') expect(like.chay.dong.map((d) => d[0])).toEqual(['T-097', 'T-102', 'T-160', 'T-193', 'T-317']);
  });

  it('c-tin-goc: SQL chuẩn viết FROM @ev-tin-don; màn tra đổi thành WITH tin_don AS (<câu của phiếu>) … và chấm đúng', async () => {
    expect(tinGoc.sqlChuan).toMatch(/FROM @ev-tin-don\b/);
    expect(tenCte('ev-tin-don')).toBe('tin_don');
    // Như ManTraV7: phiếu là câu người chơi đã ghim ở lần tra trước (ở đây lấy SQL chuẩn của thẻ ra phiếu).
    const tienTo = `WITH tin_don AS (${tinDon.sqlChuan.trim().replace(/;\s*$/, '')}) `;
    const sqlChuan = tienTo + tinGoc.sqlChuan.replace('@ev-tin-don', 'tin_don');
    const khung = khungTuSqlChuan(tinGoc.sqlChuan.replace('@ev-tin-don', 'tin_don'));
    expect(khung).toEqual({ khung: 'SELECT ma_tin, thoi_diem, tai_khoan FROM tin_don', bang: 'tin_don' });
    const cau: CauDung = { khung: khung?.khung ?? '', dieuKien: [{ cot: 'loai', phep: 'bang', giaTri: { nguon: 'giay-nho', tho: 'GOC' } }], noi: [] };
    const ngoai = thanhSql(cau, kieu);
    const kq = await chamThuThach(DU_LIEU, tienTo + ngoai, sqlChuan);
    expect(kq.trangThai).toBe('dung');
    if (kq.trangThai !== 'loi') expect(kq.chay.dong).toEqual([['T-097', '2024-10-07 22:40', 'clb_robotics']]);
    // Chưa lọc gì: vẫn đủ năm tin của phiếu (không phải tám tin của cả kênh), có lời nhân vật.
    const chuaLoc = await chamThuThach(DU_LIEU, tienTo + (khung?.khung ?? ''), sqlChuan);
    expect(chuaLoc.trangThai).toBe('sai');
    if (chuaLoc.trangThai !== 'loi') {
      expect(chuaLoc.so.soDongNguoiChoi).toBe(5);
      expect(phanUngSauKhiChay(tinGoc, chuaLoc, []).length).toBeGreaterThan(0);
    }
    // "Xem từng điều kiện" trên nguồn là phiếu: câu soi mang tiền tố WITH và chạy được.
    const tach = tachWhere(ngoai);
    expect(tach?.bang).toBe('tin_don');
    const soi = await chaySql(DU_LIEU, cauSoiDieuKien({ ...(tach as NonNullable<typeof tach>), tienTo }));
    expect(soi.ok && soi.dong.length).toBe(1);
  });

  it('c-tin-may: tài khoản + ngày → hai lần đăng nhập ngày 07/10; chỉ một điều kiện → 21 hoặc 42 dòng', async () => {
    const may = the('c-tin-may');
    const khung = khungTuSqlChuan(may.sqlChuan)?.khung ?? '';
    const dk = (cot: string, tho: string) => ({ cot, phep: 'bang' as const, giaTri: { nguon: 'giay-nho' as const, tho } });
    const du = await chamThuThach(DU_LIEU, thanhSql({ khung, dieuKien: [dk('tai_khoan', 'clb_robotics'), dk('ngay', '2024-10-07')], noi: ['AND'] }, kieu), may.sqlChuan);
    expect(du.trangThai).toBe('dung');
    if (du.trangThai !== 'loi') expect(du.chay.dong).toEqual([['MAY-XUONG-02', '15:10'], ['MAY-VP-XUONG', '22:31']]);
    for (const [mot, n] of [[dk('tai_khoan', 'clb_robotics'), 21], [dk('ngay', '2024-10-07'), 42]] as const) {
      const kq = await chamThuThach(DU_LIEU, thanhSql({ khung, dieuKien: [mot], noi: [] }, kieu), may.sqlChuan);
      expect(kq.trangThai).toBe('sai');
      if (kq.trangThai !== 'loi') expect(kq.so.soDongNguoiChoi).toBe(n);
    }
  });
});

describe('Nhiệm vụ phụ "Bốn mục trong sổ đã ký" (Duy giao, mở sau Vụ 2)', () => {
  const toiKetVu2 = (): TrangThaiMvp => ketVu2({ 'r-tin-tuyen': 'may', 'r-tin-sau-may': 've' }).s;

  it('màn kết Vụ 2 có nhiệm vụ phụ; nhận → giai đoạn phu, bảng sạch; xong → về lại màn kết Vụ 2, hết việc để nhận', () => {
    const ket = toiKetVu2();
    expect(ketCua(ket).phu.map((p) => p.id)).toEqual(['so-phong']);
    const vao = xuLy(KB, ket, { type: 'lam-nhiem-vu-phu', id: 'so-phong' });
    expect(vao.giaiDoan).toBe('phu');
    expect(vao.phu).toMatchObject({ id: 'so-phong', veLai: ket.conTro, giaiDoan: 'vu-sau' });
    expect(vao.vu).toBe('vu2');
    expect(chuoiDangChay(vao)).toMatch(/^v2-mo/);
    expect(giaTriTuHoSo(KB, vao.hoSo, [], vao.bang?.boGhim)).toEqual([]);
    // Đang làm việc phụ thì không sang vụ sau, không nhận việc khác.
    expect(xuLy(KB, vao, { type: 'sang-vu-sau' })).toBe(vao);

    const xong = choiTuDong(KB, vao, { traLoi: (id, lan) => (id === 'q-v2-ket-luan' && lan === 0 ? 'sai' : 'dung') }, (_s, kn) => kn.kind === 'end');
    expect(ketCua(xong)).toMatchObject({ phuXong: { id: 'so-phong' }, vu: null, vuKe: null, phu: [] });
    expect(xong.co).toEqual(expect.arrayContaining(['so-phong-hoan-tat', 'v2-log-mo', 'v2-ket-luan-dung']));
    expect(xong.hoSo.bangChung).toContain('ev-v2-activities');
    expect(xong.soTay).toEqual(expect.arrayContaining(['chuan-hoa', 'sap-xep']));
    expect(xong.lanThu['q-v2-ket-luan']).toBe(2);

    const ve = xuLy(KB, xong, { type: 'xong-nhiem-vu-phu' });
    expect(ve.giaiDoan).toBe('vu-sau');
    expect(ve.phu ?? null).toBeNull();
    expect(ve.conTro).toEqual(ket.conTro);
    expect(ketCua(ve)).toMatchObject({ vu: { id: 'vu2' }, phu: [], phuXong: null });
  });

  it('câu mở của việc phụ vẫn rẽ theo kết Vụ 1; điểm nhảy vu2-buoi tới đúng thẻ với hai giấy nhớ của việc này', () => {
    const vao = xuLy(KB, toiKetVu2(), { type: 'lam-nhiem-vu-phu', id: 'so-phong' });
    expect(chuoiDangChay(vao)).toBe('v2-mo-that');
    const s = nhayToi(KB, 'vu2-buoi', 1);
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'challenge', thuThach: { id: 'v2-loc-buoi' } });
    expect(s.giaiDoan).toBe('phu');
    expect(giaTriTuHoSo(KB, s.hoSo, [], s.bang?.boGhim).map((g) => g.giaTri)).toEqual(['clb-tham-tu', 'DA_XAC_NHAN']);
  });

  it('lưu giữa việc phụ rồi nạp lại: chơi tiếp tới màn kết của việc phụ', () => {
    const nap = JSON.parse(JSON.stringify(nhayToi(KB, 'vu2-buoi', 1))) as TrangThaiMvp;
    const s = choiTuDong(KB, nap, {}, (_x, kn) => kn.kind === 'end');
    expect(ketCua(s).phuXong?.id).toBe('so-phong');
  });
});

describe('thẻ v2-loc-buoi chấm SQL thật (gọt cột, xếp theo)', () => {
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

  it('thẻ bật cả hai khối mới; thẻ chương 1 và Vụ 2 không bật khối nào', () => {
    expect(khoiCuaThe(THE.sqlChuan)).toEqual({ chuanHoa: true, sapXep: true, noi: false });
    for (const id of ['c-lop', 'c-ten-h', 'c-in', 'c-sua-or-quan', 'c-tin-don', 'c-tin-goc', 'c-tin-may', 'c-tin-xuong']) expect(khoiCuaThe(the(id).sqlChuan), id).toEqual({ chuanHoa: false, sapXep: false, noi: false });
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
