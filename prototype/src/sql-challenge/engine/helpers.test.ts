import { describe, expect, it } from 'vitest';
import { TABLE_COLUMNS } from '../schema';
import { compareVietnamese, distinctValues, previewRows } from './helpers';

describe('distinctValues — ô chọn giá trị cho = / IN', () => {
  it('clb: 4 CLB, sắp theo tiếng Việt', async () => {
    expect(await distinctValues('sinh_vien', 'clb')).toEqual(['Báo chí', 'Guitar', 'Robotics', 'Văn học']);
  });

  it('toa_nha: A, B, C; ma_lop: 8 mã; khoa_hoc là chuỗi số', async () => {
    expect(await distinctValues('lop_sinh_hoat', 'toa_nha')).toEqual(['A', 'B', 'C']);
    const classes = await distinctValues('lop_sinh_hoat', 'ma_lop');
    expect(classes).toHaveLength(8);
    expect(classes).toEqual([...classes].sort(compareVietnamese));
    expect(await distinctValues('lop_sinh_hoat', 'khoa_hoc')).toEqual(['2024']);
  });

  it('ten: sắp tiếng Việt — dấu và chữ hoa/thường không làm lệch thứ tự chữ cái gốc', async () => {
    const names = await distinctValues('sinh_vien', 'ten');
    expect(names.length).toBeGreaterThan(30);
    expect(names.indexOf('Đức')).toBeGreaterThan(names.indexOf('Dũng')); // Đ đứng sau D
    expect(names.indexOf('Hoài')).toBeLessThan(names.indexOf('Linh'));
    expect(names.indexOf('Ánh') === -1 || names.indexOf('Ánh') < names.indexOf('Bình')).toBe(true);
    expect(compareVietnamese('ă', 'b')).toBeLessThan(0);
    expect(compareVietnamese('Văn học', 'Robotics')).toBeGreaterThan(0);
  });

  it('dataset ẩn đọc được khi nói rõ; cột không thuộc bảng → ném', async () => {
    expect(await distinctValues('sinh_vien', 'clb', 'hidden')).toEqual(['Báo chí', 'Guitar', 'Robotics', 'Văn học']);
    await expect(distinctValues('sinh_vien', 'toa_nha' as never)).rejects.toThrow(/không thuộc bảng/);
  });
});

describe('previewRows — nút "Xem 5 dòng đầu"', () => {
  it('5 dòng đầu của sinh_vien theo thứ tự nạp, đủ 5 cột của schema', async () => {
    const res = await previewRows('sinh_vien');
    expect(res.columns).toEqual([...TABLE_COLUMNS.sinh_vien]);
    expect(res.rowCount).toBe(5);
    expect(res.rows[0]).toEqual(['SV240105', 'Nguyễn Thị', 'Lan', 'TC24A', 'Guitar']);
  });

  it('lop_sinh_hoat: limit lớn hơn bảng trả cả bảng; limit 0 trả 0 dòng nhưng vẫn có tên cột', async () => {
    expect((await previewRows('lop_sinh_hoat', 100)).rowCount).toBe(8);
    const none = await previewRows('lop_sinh_hoat', 0);
    expect(none.rowCount).toBe(0);
    expect(none.columns).toEqual([...TABLE_COLUMNS.lop_sinh_hoat]);
  });
});
