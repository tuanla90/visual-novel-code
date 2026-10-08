// @vitest-environment node
/**
 * "File sinh khớp nội dung" cho bộ Mùa 1 (như ../mvp/mvp.gen.test.ts cho bộ MVP): sinh lại từ prototype/noi-dung-mua-1/ trong bộ
 * nhớ, so với `kich-ban.gen.ts` và `hoi-dap.gen.ts` đã commit. Sửa .md / hoi-dap/*.json mà quên `npm run noi-dung:sinh:mua1`, hoặc
 * sửa tay .gen.ts, là đỏ (`kiem-noi-dung:mua1` chỉ in lời nhắc).
 */
import { readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { tepLechTrenDia } from '../../../../tools/noi-dung/sinh.ts';
import { sinhVanBanMua1, THU_MUC_NOI_DUNG_MUA_1, THU_MUC_SINH_MUA_1 } from '../../../../tools/noi-dung/sinh-mua1.ts';
import { kiemSoDongMvp } from '../../../../tools/noi-dung/sql-mvp.ts';
import { themNhieuMvp } from '../../../../tools/noi-dung/nhieu-mvp.ts';
import { docThuMucMvp } from '../../../../tools/noi-dung/thu-muc-mvp.ts';
import type { KichBanMvp } from '../../mvp/types';

describe('bộ Mùa 1: file sinh khớp nội dung', () => {
  const kq = sinhVanBanMua1();

  it('nội dung Mùa 1 đọc, kiểm chéo và chuyển được, không lỗi', () => {
    expect(kq.loi).toEqual([]);
  });

  it('kich-ban.gen.ts và hoi-dap.gen.ts đã commit bằng đúng bản sinh lại (nếu đỏ: chạy `npm run noi-dung:sinh:mua1` rồi commit)', () => {
    expect(Object.keys(kq.tep).sort()).toEqual(['hoi-dap.gen.ts', 'kich-ban.gen.ts']);
    expect(tepLechTrenDia(kq.tep, THU_MUC_SINH_MUA_1)).toEqual([]);
  });

  it('không có tệp .gen.ts thừa trong generated/mua-1/', () => {
    const trenDia = readdirSync(THU_MUC_SINH_MUA_1).filter((t) => t.endsWith('.gen.ts')).sort();
    expect(trenDia).toEqual(Object.keys(kq.tep).sort());
  });

  it('QĐ-089: mọi câu SQL khai số dòng chạy thật trên du-lieu.md + dữ liệu nền ra đúng số khai', async () => {
    const d = kq.duLieu as unknown as KichBanMvp | null;
    expect(d?.soDongKhai.length).toBeGreaterThan(0);
    const raw = docThuMucMvp(THU_MUC_NOI_DUNG_MUA_1).mvp.duLieu;
    const chay = await kiemSoDongMvp(raw ? themNhieuMvp(structuredClone(raw)) : null, d?.soDongKhai ?? []);
    expect(chay.loi).toEqual([]);
    for (const k of chay.ketQua) expect(k.soDongThat, k.noi).toBe(k.soDong);
  });
});
