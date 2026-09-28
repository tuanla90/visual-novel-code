// @vitest-environment node
/**
 * "File sinh khớp nội dung" cho bộ MVP (gói 12m, đặc tả §18.1): sinh lại từ prototype/noi-dung-mvp/ trong bộ nhớ,
 * so với `kich-ban.gen.ts` đã commit. Sửa .md mà quên `npm run noi-dung:sinh:mvp`, hoặc sửa tay .gen.ts, là đỏ.
 */
import { readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { tepLechTrenDia } from '../../../../tools/noi-dung/sinh.ts';
import { sinhVanBanMvp, THU_MUC_SINH_MVP } from '../../../../tools/noi-dung/sinh-mvp.ts';
import type { KichBanMvp } from '../../mvp/types';

describe('bộ MVP: file sinh khớp nội dung', () => {
  const kq = sinhVanBanMvp();

  it('nội dung MVP đọc, kiểm chéo và chuyển được, không lỗi', () => {
    expect(kq.loi).toEqual([]);
  });

  it('kich-ban.gen.ts đã commit bằng đúng bản sinh lại (nếu đỏ: chạy `npm run noi-dung:sinh:mvp` rồi commit)', () => {
    expect(Object.keys(kq.tep)).toEqual(['kich-ban.gen.ts']);
    expect(tepLechTrenDia(kq.tep, THU_MUC_SINH_MVP)).toEqual([]);
  });

  it('không có tệp .gen.ts thừa trong generated/mvp/', () => {
    const trenDia = readdirSync(THU_MUC_SINH_MVP).filter((t) => t.endsWith('.gen.ts')).sort();
    expect(trenDia).toEqual(Object.keys(kq.tep).sort());
  });

  it('dữ liệu sinh đủ hình dạng KichBanMvp: 5 ngày, ngày họp, hai kết, một dữ kiện chính mỗi ngày', () => {
    const d = kq.duLieu as unknown as KichBanMvp | null;
    expect(d).not.toBeNull();
    if (!d) return;
    expect(d.lich.ngay.map((n) => n.so)).toEqual([1, 2, 3, 4, 5]);
    expect(d.lich.ngayHop).not.toBeNull();
    expect(d.lich.ket).toEqual({ that: 'ket-that', thuong: 'ket-thuong' });
    const chinh = d.diaDiem.flatMap((x) => x.duKien).filter((k) => k.nhan === 'chinh').map((k) => k.id);
    for (const n of d.lich.ngay) expect(chinh).toContain(n.duKienChinh);
    expect(d.soDongKhai.length).toBeGreaterThan(0);
    expect(d.chuoi.find((c) => c.id === 'md-01-ktx')?.mocSomNhat).toBe(0);
    expect(d.nhanVat.find((n) => n.id === 'quan')?.xuatHienTu).toEqual({ kind: 'ngay', ngay: 3, khung: 'sang' });
  });
});
