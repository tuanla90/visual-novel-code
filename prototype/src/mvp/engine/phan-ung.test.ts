// @vitest-environment node
/**
 * Lời nhân vật sau khi chạy gắn với TẬP CỘT đã dùng ("Khi chạy ra <n> dòng với <cột>, <cột>", 30/09/2026): bộ đọc dòng
 * "Khi …" của thẻ (`tools/noi-dung/phan-ung-mvp.ts`) và cách máy chọn lời (`phanUngSauKhiChay`) — lời có cột chỉ nói khi
 * các điều kiện đã điền dùng đúng tập cột đó (không kể thứ tự, lặp), và thắng lời không ghi cột.
 */
import { describe, expect, it } from 'vitest';
import { docPhanUng } from '../../../tools/noi-dung/phan-ung-mvp.ts';
import type { TheThuThachMvp } from '../../content/mvp/types';
import { KICH_BAN as KB } from '../store/kho-mvp';
import { chamThuThach, phanUngSauKhiChay, type KetQuaCham } from './sql-mvp';

const DU_LIEU = KB.duLieu;
if (!DU_LIEU) throw new Error('thiếu du-lieu.md');

describe('bộ đọc "Khi chạy ra <n> dòng với <cột>"', () => {
  it('đọc tập cột (bỏ khoảng trắng, dấu phẩy thừa); không "với" thì không có `cot`', () => {
    const { phanUng, loi } = docPhanUng({
      'Khi chạy ra 0 dòng với ma_lop,  ten': '**ha-vy** (thinking): Không ai.',
      'Khi chạy ra 1 dòng với ho_dem,': '**tung** (surprised): Một người.',
      'Khi chạy ra 0 dòng': '**ha-vy** (thinking): Không dòng nào.',
    });
    expect(loi).toEqual([]);
    expect(phanUng.map((p) => p.khi)).toEqual([
      { kind: 'so-dong', n: 0, cot: ['ma_lop', 'ten'] },
      { kind: 'so-dong', n: 1, cot: ['ho_dem'] },
      { kind: 'so-dong', n: 0 },
    ]);
  });

  it('"với" mà không có cột nào → coi như lời chung; dòng lạ vẫn báo lỗi', () => {
    const { phanUng, loi } = docPhanUng({ 'Khi chạy ra 2 dòng với ,': '**tung** (neutral): Hai.', 'Khi chạy ra vài dòng với ten': '**tung** (neutral): X.' });
    expect(phanUng.map((p) => p.khi)).toEqual([{ kind: 'so-dong', n: 2 }]);
    expect(loi).toEqual([expect.stringMatching(/Khi chạy ra vài dòng với ten" lạ/)]);
  });
});

describe('phanUngSauKhiChay với tập cột (c-ten-h thật)', () => {
  const tenH = KB.thuThach['c-ten-h'] as TheThuThachMvp;
  const khung = 'SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien';
  const cham = (where: string): Promise<KetQuaCham> => chamThuThach(DU_LIEU, `${khung} WHERE ${where}`, tenH.sqlChuan);
  const nguoi = (the: TheThuThachMvp, kq: KetQuaCham, cot?: string[]) => phanUngSauKhiChay(the, kq, cot).map((l) => `${l.speaker}:${l.text}`);

  it('0 dòng: đúng tập {ma_lop, ten} (thứ tự, lặp không kể) → lời riêng hai người; chỉ {ten} → lời một câu; tập khác / không báo → lời chung', async () => {
    const kq = await cham("ma_lop IN ('BC24A', 'BC23A') AND ten = 'H'");
    expect(kq.trangThai).toBe('sai');
    const rieng = nguoi(tenH, kq, ['ten', 'ma_lop', 'ten']);
    expect(rieng).toHaveLength(2);
    expect(rieng[0]).toMatch(/^ha-vy:/);
    expect(rieng[1]).toMatch(/^tung:/);
    expect(nguoi(tenH, kq, ['ma_lop', 'ten'])).toEqual(rieng);

    const chiTen = nguoi(tenH, kq, ['ten']);
    expect(chiTen).toHaveLength(1);
    expect(chiTen[0]).toMatch(/^ha-vy:.*một chữ H/);

    const chung = nguoi(tenH, kq);
    expect(chung).toHaveLength(1);
    expect(chung[0]).toMatch(/^ha-vy:/);
    expect(chung).not.toEqual(chiTen);
    expect(nguoi(tenH, kq, ['ho_dem', 'ten'])).toEqual(chung);
    expect(nguoi(tenH, kq, [])).toEqual(chung);
  });

  it('1 dòng với {ma_lop, ho_dem} có lời riêng; 1 dòng với tập khác không có lời chung → []', async () => {
    const kq = await cham("ma_lop = 'BC24A' AND ho_dem LIKE 'H%'");
    expect(kq.trangThai !== 'loi' && kq.so.soDongNguoiChoi).toBe(1);
    expect(nguoi(tenH, kq, ['ma_lop', 'ho_dem'])).toEqual([expect.stringMatching(/^ha-vy:.*Mai/)]);
    expect(nguoi(tenH, kq, ['ho_dem'])).toEqual([]);
    expect(nguoi(tenH, kq)).toEqual([]);
  });

  it('đúng / lỗi không phụ thuộc tập cột', async () => {
    const dung = await cham("ma_lop IN ('BC24A', 'BC23A') AND ten LIKE 'H%'");
    expect(dung.trangThai).toBe('dung');
    expect(nguoi(tenH, dung, ['ma_lop', 'ten'])).toEqual(nguoi(tenH, dung));
  });
});
