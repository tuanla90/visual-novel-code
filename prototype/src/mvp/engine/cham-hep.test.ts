// @vitest-environment node
/**
 * Gói B15 (mục E): thẻ "Bấm ô lấy giấy nhớ" mà vật chứng chỉ giữ một phần giá trị của cột (vd `c-ten-h`: câu chuẩn là cả lớp
 * BC24A, 32 dòng; vật chứng là hai mã của Hiếu và Hoài). Câu HẸP hơn câu chuẩn được tính đúng khi có cột lấy giấy nhớ, mọi dòng
 * nằm trong tập dòng của câu chuẩn và còn đủ mọi giá trị của vật chứng. Chạy sql.js thật trên dữ liệu bộ mùa 1.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MUA_1 } from '../../content/generated/mua-1/kich-ban.gen';
import type { KichBanMvp, TheThuThachMvp } from '../../content/mvp/types';
import { chonGoiY } from './goi-y-man-tra';
import { chamThuThach, phanUngSauKhiChay, soHep, type KetQuaChay, type LuatHep } from './sql-mvp';

const KB = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const DU_LIEU = KB.duLieu!;
const THE = KB.thuThach['c-ten-h'] as TheThuThachMvp;
const LUAT: LuatHep = { cot: THE.bamO!, giaTri: THE.vatChung!.giaTri, cotCan: [THE.bamO!] };
const DU_COT = 'SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien';
const cham = (sql: string, luat: LuatHep | null = LUAT) => chamThuThach(DU_LIEU, sql, THE.sqlChuan, luat);
const loi = (kq: Awaited<ReturnType<typeof cham>>): string => phanUngSauKhiChay(THE, kq, ['ten', 'ma_lop'])[0]?.text ?? '';

describe('c-ten-h: câu hẹp hơn câu chuẩn', () => {
  it('thẻ thật: bấm ô ma_sv, vật chứng là hai mã, câu chuẩn ra 32 dòng', () => {
    expect(THE.bamO).toBe('ma_sv');
    expect(THE.vatChung?.giaTri).toEqual(['SV240228', 'SV240317']);
    expect(THE.soDongKyVong).toBe(32);
  });

  it('hẹp mà đủ (tên bắt đầu bằng H trong lớp BC24A, có cột mã): ĐÚNG, Hà Vy nói lời nhận, gợi ý chỉ còn việc chép hai ô', async () => {
    const kq = await cham(`${DU_COT} WHERE ten LIKE 'H%' AND ma_lop = 'BC24A'`);
    expect(kq.trangThai).toBe('dung');
    if (kq.trangThai === 'loi') throw new Error('lỗi');
    expect(kq.so).toMatchObject({ dung: true, soDongNguoiChoi: 2, soDongChuan: 32, hepDu: true, cotThieu: [] });
    expect(kq.chay.dong.map((d) => d[0]).sort()).toEqual(['SV240228', 'SV240317']);
    expect(loi(kq)).toBe('Hai người, Hiếu với Hoài. Lọc thẳng thế này gọn hơn tớ nghĩ.');
    const g = chonGoiY(THE, { kq, cotDung: ['ten', 'ma_lop'], thuaCot: false });
    expect(g?.goiY.khi).toEqual({ kind: 'dung-hep' });
    expect(g?.goiY.bac2.text).toContain('ô ma_sv');
  });

  it('hẹp mà đủ, kèm vài dòng khác của lớp (cũng tính đúng); cột mã đứng đâu cũng được', async () => {
    const kq = await cham(`SELECT ten, ma_sv FROM sinh_vien WHERE ma_lop = 'BC24A' AND (ten LIKE 'H%' OR ten LIKE 'M%')`);
    expect(kq.trangThai).toBe('dung');
    expect(kq.trangThai !== 'loi' && kq.so.hepDu).toBe(true);
    expect(kq.trangThai !== 'loi' && kq.so.soDongNguoiChoi).toBeGreaterThan(2);
  });

  it('hẹp mà thiếu (chỉ ra Hiếu): vẫn SAI, có lời', async () => {
    const kq = await cham(`${DU_COT} WHERE ten = 'Hiếu' AND ma_lop = 'BC24A'`);
    expect(kq.trangThai).toBe('sai');
    if (kq.trangThai === 'loi') throw new Error('lỗi');
    expect(kq.so).toMatchObject({ dung: false, soDongNguoiChoi: 1, hepThieu: true });
    expect(kq.so.hepDu).toBeUndefined();
    expect(loi(kq)).toBe('Mới có một người. Chữ ký chỉ đọc được mỗi chữ H, lọc hẹp thế này dễ sót người khác.');
  });

  it('rộng hơn câu chuẩn (mọi người tên H trong trường; cả hai lớp): vẫn SAI, không dính luật hẹp', async () => {
    for (const sql of [`${DU_COT} WHERE ten LIKE 'H%'`, `${DU_COT} WHERE ma_lop = 'BC24A' OR ma_lop = 'BC23A'`]) {
      const kq = await cham(sql);
      expect(kq.trangThai, sql).toBe('sai');
      if (kq.trangThai === 'loi') throw new Error('lỗi');
      expect(kq.so.soDongNguoiChoi).toBeGreaterThan(32);
      expect(kq.so.hepDu ?? kq.so.hepThieu).toBeUndefined();
    }
  });

  it('hai dòng đúng người mà CHƯA có cột mã: chưa đúng; gợi ý "khi chạy ra 2 dòng" là Duy nhắc lấy mã', async () => {
    const kq = await cham(`SELECT ho_dem, ten, ma_lop FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop = 'BC24A'`);
    expect(kq.trangThai).toBe('sai');
    if (kq.trangThai === 'loi') throw new Error('lỗi');
    expect(kq.so.hepDu ?? kq.so.hepThieu).toBeUndefined();
    expect(loi(kq)).toBe('');
    const g = chonGoiY(THE, { kq, cotDung: ['ten', 'ma_lop'], thuaCot: false });
    expect(g?.goiY.khi).toEqual({ kind: 'so-dong', n: 2 });
    expect(g?.goiY.bac1.speaker).toBe('duy');
    expect(g?.goiY.bac1.text).toContain('một mã cụ thể');
    expect(g?.goiY.bac2.text).toContain('ma_sv');
  });

  it('câu chuẩn (cả lớp, đủ cột) vẫn đúng như cũ, lời "Khi đúng" cũ; không truyền luật (bộ MVP, thẻ khác) thì câu hẹp vẫn sai', async () => {
    const chuan = await cham(THE.sqlChuan);
    expect(chuan.trangThai).toBe('dung');
    expect(chuan.trangThai !== 'loi' && chuan.so.hepDu).toBeUndefined();
    expect(loi(chuan)).toContain('Ba mươi hai người lớp BC24A');
    const cu = await cham(`${DU_COT} WHERE ten LIKE 'H%' AND ma_lop = 'BC24A'`, null);
    expect(cu.trangThai).toBe('sai');
    expect(cu.trangThai !== 'loi' && (cu.so.hepDu ?? cu.so.hepThieu)).toBeUndefined();
  });
});

describe('soHep (thuần)', () => {
  const kq = (cot: string[], dong: (string | number | null)[][]): Extract<KetQuaChay, { ok: true }> => ({ ok: true, cot, dong }) as Extract<KetQuaChay, { ok: true }>;
  const chuan = kq(['ma', 'ten'], [['A1', 'An'], ['A2', 'Hà'], ['A3', 'Hoa'], ['A4', 'Mai']]);
  const luat: LuatHep = { cot: 'ma', giaTri: ['A2', 'A3'], cotCan: ['ma'] };

  it('đủ / thiếu / không áp được', () => {
    expect(soHep(chuan, kq(['ma'], [['A3'], ['A2']]), luat)).toBe('du');
    expect(soHep(chuan, kq(['TEN', 'MA'], [['Hà', 'A2'], ['Hoa', 'A3'], ['An', 'A1']]), luat)).toBe('du');
    expect(soHep(chuan, kq(['ma'], [['A2']]), luat)).toBe('thieu');
    // Có dòng ngoài câu chuẩn, dòng lặp, thiếu cột lấy giấy nhớ, không ít dòng hơn câu chuẩn, không có dòng nào.
    expect(soHep(chuan, kq(['ma'], [['A2'], ['A3'], ['B9']]), luat)).toBeNull();
    expect(soHep(chuan, kq(['ma'], [['A2'], ['A2'], ['A3']]), luat)).toBeNull();
    expect(soHep(chuan, kq(['ten'], [['Hà'], ['Hoa']]), luat)).toBeNull();
    expect(soHep(chuan, kq(['ma'], [['A1'], ['A2'], ['A3'], ['A4']]), luat)).toBeNull();
    expect(soHep(chuan, kq(['ma'], []), luat)).toBeNull();
  });

  it('thiếu cột nộp, vật chứng giữ hết cột, vật chứng không nằm trong kết quả chuẩn: không áp', () => {
    expect(soHep(chuan, kq(['ma'], [['A2'], ['A3']]), { ...luat, cotCan: ['ma', 'ten'] })).toBeNull();
    expect(soHep(chuan, kq(['ma'], [['A2'], ['A3']]), { ...luat, giaTri: ['A1', 'A2', 'A3', 'A4'] })).toBeNull();
    expect(soHep(chuan, kq(['ma'], [['A2'], ['A3']]), { ...luat, giaTri: ['A2', 'Z9'] })).toBeNull();
    expect(soHep(chuan, kq(['ma'], [['A2'], ['A3']]), { ...luat, giaTri: [] })).toBeNull();
  });
});
