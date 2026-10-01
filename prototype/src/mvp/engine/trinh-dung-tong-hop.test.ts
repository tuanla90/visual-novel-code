// @vitest-environment node
import { describe, expect, it } from 'vitest';
import {
  cotKetQuaTongHop,
  giaiNguonSql,
  taoSqlTongHop,
  type CauTongHop,
  type NguonTongHop,
} from './trinh-dung-tong-hop';

const bang: NguonTongHop = {
  id: 'sinh_vien',
  sql: null,
  cot: [
    { ten: 'ma_lop', kieu: 'TEXT' },
    { ten: 'ten', kieu: 'TEXT' },
    { ten: 'ma_sv', kieu: 'TEXT' },
  ],
};

const cau: CauTongHop = {
  nguonId: 'sinh_vien',
  select: ['ma_lop'],
  where: [],
  nhomTheo: 'ma_lop',
};

describe('trình dựng truy vấn tổng hợp', () => {
  it('dựng nguồn bảng gốc, GROUP BY một cột và COUNT(*)', () => {
    expect(taoSqlTongHop(cau, bang)).toBe(
      'SELECT "ma_lop", COUNT(*) AS "so_dong" FROM "sinh_vien" GROUP BY "ma_lop"',
    );
    expect(cotKetQuaTongHop(cau, bang)).toEqual(['TEXT', 'INTEGER']);
  });

  it('dùng SQL của phiếu trước làm subquery, không cần lưu các dòng kết quả', () => {
    const phieu: NguonTongHop = {
      id: 'ev-hai-lop',
      sql: 'SELECT ma_lop, ma_sv FROM sinh_vien WHERE ma_lop IN (\'BC24A\', \'BC23A\')',
      cot: [
        { ten: 'ma_lop', kieu: 'TEXT' },
        { ten: 'ma_sv', kieu: 'TEXT' },
      ],
    };
    const tuPhieu: CauTongHop = {
      nguonId: 'ev-hai-lop',
      select: ['ma_lop'],
      where: [],
      nhomTheo: 'ma_lop',
    };

    expect(taoSqlTongHop(tuPhieu, phieu)).toBe(
      'WITH "hai_lop" AS (SELECT ma_lop, ma_sv FROM sinh_vien WHERE ma_lop IN (\'BC24A\', \'BC23A\')) SELECT "ma_lop", COUNT(*) AS "so_dong" FROM "hai_lop" GROUP BY "ma_lop"',
    );
  });

  it('resolve marker FROM @id sang nguồn bảng hoặc SQL của phiếu', () => {
    expect(giaiNguonSql('SELECT ma_lop FROM @sinh_vien', bang)).toBe(
      'SELECT ma_lop FROM "sinh_vien"',
    );
    const phieu = {
      ...bang,
      id: 'ev-hai-lop',
      sql: 'SELECT ma_lop FROM sinh_vien',
    };
    expect(giaiNguonSql('SELECT ma_lop FROM @ev-hai-lop', phieu)).toBe(
      'SELECT ma_lop FROM (SELECT ma_lop FROM sinh_vien) AS "ev-hai-lop"',
    );
  });

  it('từ chối nguồn/cột không hợp lệ hoặc lựa chọn vượt phạm vi COUNT bản đầu', () => {
    expect(() => taoSqlTongHop({ ...cau, nguonId: 'khac' }, bang)).toThrow(/không khớp/i);
    expect(() => taoSqlTongHop({ ...cau, nhomTheo: 'khong_co' }, bang)).toThrow(/cột nhóm/i);
    expect(() => taoSqlTongHop({ ...cau, select: [] }, bang)).toThrow(/chọn ít nhất/i);
    expect(() => taoSqlTongHop({ ...cau, select: ['ma_lop', 'ma_sv'] }, bang)).toThrow(/chỉ SELECT/i);
    expect(() => taoSqlTongHop({ ...cau, where: [{ cot: 'khong_co', phep: 'bang', giaTri: { nguon: 'go', tho: "'x'" } }] }, bang)).toThrow(/điều kiện/i);
    expect(() => giaiNguonSql('SELECT ma_lop FROM sinh_vien', bang)).toThrow(/thiếu nguồn/i);
    expect(() => giaiNguonSql('SELECT ma_lop FROM @bad.id', { ...bang, id: 'bad.id' })).toThrow(/mã nguồn/i);
  });
});
