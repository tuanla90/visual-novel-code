// @vitest-environment node
/**
 * Giấy nhớ dán quanh màn tra (`giaTriTuHoSo`): mỗi giá trị của mẩu tin là một tờ; phiếu kết quả của thẻ thử thách có
 * nhiều giá trị là MỘT tờ (`nhieu`) — kéo cả phiếu vào ô thành "là một trong". Mỗi tờ nhớ mã thẻ (`the`) để vẽ sợi chỉ.
 */
import { describe, expect, it } from 'vitest';
import type { KichBanMvp } from '../../content/mvp/types';
import { KICH_BAN as KB } from '../store/kho-mvp';
import { giaTriTuHoSo } from './giay-nho';
import { nhayToi } from './tu-choi';

describe('giaTriTuHoSo', () => {
  it('ngày 4: mẩu tin "Báo chí · K24" thành hai tờ; phiếu hai lớp / hai mã mỗi phiếu một tờ nhiều giá trị; tài liệu và mẩu tin không giá trị không có tờ', () => {
    const s = nhayToi(KB, 'nhat-ky-in', 1);
    const ds = giaTriTuHoSo(KB, s.hoSo);
    expect(ds.map((g) => g.khoa)).toEqual([
      'clue-chu-ky-h#0',
      'clue-bao-chi-k24#0',
      'clue-bao-chi-k24#1',
      'clue-toa-b#0',
      'clue-ten-tep#0',
      'ev-hai-lop#0',
      'ev-hai-ma#0',
    ]);
    expect(ds.find((g) => g.khoa === 'clue-bao-chi-k24#1')).toEqual({ khoa: 'clue-bao-chi-k24#1', giaTri: 'K24', nguon: '[Báo chí K24]', the: 'clue-bao-chi-k24' });
    expect(ds.find((g) => g.the === 'ev-hai-lop')).toEqual({
      khoa: 'ev-hai-lop#0',
      giaTri: 'BC24A, BC23A',
      nguon: 'Hai lớp: BC24A, BC23A',
      the: 'ev-hai-lop',
      nhieu: ['BC24A', 'BC23A'],
    });
    expect(ds.find((g) => g.the === 'ev-hai-ma')?.nhieu).toEqual(['SV240228', 'SV240317']);
    // Mẩu tin một giá trị không mang `nhieu`.
    expect(ds.every((g) => g.the.startsWith('ev-') || g.nhieu === undefined)).toBe(true);
  });

  it('phiếu một giá trị (nhật ký in) là tờ thường, không `nhieu`', () => {
    const s = nhayToi(KB, 'hop-sua-or', 1);
    expect(giaTriTuHoSo(KB, s.hoSo).find((g) => g.the === 'ev-nhat-ky-in')).toEqual({
      khoa: 'ev-nhat-ky-in#0',
      giaTri: 'SV210745',
      nguon: 'Nhật ký in 23:10 Chủ nhật',
      the: 'ev-nhat-ky-in',
    });
  });

  it('thẻ hồ sơ có dòng "Giá trị cho trình dựng" thì dòng đó thắng, tách từng tờ (không gộp thành phiếu)', () => {
    const goc = KB.hoSo['ev-hai-lop'];
    const kb: KichBanMvp = {
      ...KB,
      hoSo: { ...KB.hoSo, 'ev-hai-lop': { id: 'ev-hai-lop', loai: 'ev', heading: goc?.heading ?? 'Hai lớp', fields: { 'Giá trị cho trình dựng': 'BC24A · BC23A' }, quotes: {} } },
    };
    const ds = giaTriTuHoSo(kb, { manhMoi: [], taiLieu: [], bangChung: ['ev-hai-lop'] });
    expect(ds.map((g) => [g.khoa, g.giaTri, g.nhieu])).toEqual([
      ['ev-hai-lop#0', 'BC24A', undefined],
      ['ev-hai-lop#1', 'BC23A', undefined],
    ]);
  });
});
