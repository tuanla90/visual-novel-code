/** Hoạt cảnh đi tiếp từ bảng đang có (gói B14 mục E): khi nào lần chạy mới là "bảng cũ bớt dòng", và dòng nào còn lại. */
import { describe, expect, it } from 'vitest';
import { demSo, hepLai, type BangKetQua } from './hoat-canh-bang';

const bang = (cot: string[], dong: (string | number | null)[][]): BangKetQua => ({ cot, dong });
const CU = bang(['ma_lop', 'toa_nha'], [['A1', 'B'], ['A2', 'B'], ['A3', 'C'], ['A2', 'B']]);

describe('hepLai', () => {
  it('bảng mới là bảng cũ bớt dòng → đánh dấu dòng còn lại theo nội dung, đúng thứ tự', () => {
    expect(hepLai(CU, bang(['ma_lop', 'toa_nha'], [['A2', 'B'], ['A3', 'C']]))).toEqual([false, true, true, false]);
  });

  it('dòng trùng nội dung được tính đủ số lần', () => {
    expect(hepLai(CU, bang(['ma_lop', 'toa_nha'], [['A2', 'B'], ['A2', 'B']]))).toEqual([false, true, false, true]);
  });

  it('không còn dòng nào → mọi dòng rụng', () => {
    expect(hepLai(CU, bang(['ma_lop', 'toa_nha'], []))).toEqual([false, false, false, false]);
  });

  it('bằng hoặc nhiều dòng hơn, khác cột, có dòng lạ, hay bảng cũ rỗng → không phải hẹp lại', () => {
    expect(hepLai(CU, CU)).toBeNull();
    expect(hepLai(CU, bang(['ma_lop', 'toa_nha'], [...CU.dong, ['A9', 'A']]))).toBeNull();
    expect(hepLai(CU, bang(['ma_lop'], [['A1']]))).toBeNull();
    expect(hepLai(CU, bang(['ma_lop', 'nganh'], [['A1', 'B']]))).toBeNull();
    expect(hepLai(CU, bang(['ma_lop', 'toa_nha'], [['A9', 'A']]))).toBeNull();
    expect(hepLai(bang(['ma_lop'], []), bang(['ma_lop'], []))).toBeNull();
  });

  it('tên cột không phân biệt hoa thường', () => {
    expect(hepLai(CU, bang(['MA_LOP', 'Toa_Nha'], [['A1', 'B']]))).toEqual([true, false, false, false]);
  });
});

describe('demSo', () => {
  it('khi test (không chờ nhịp) đặt thẳng số cuối', async () => {
    const ra: number[] = [];
    await demSo(64, 1, 1100, (n) => ra.push(n));
    expect(ra).toEqual([1]);
  });
});
