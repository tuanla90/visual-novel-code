// @vitest-environment node
/**
 * "File sinh khớp nội dung" cho bộ MVP (gói 12m, đặc tả §18.1): sinh lại từ prototype/noi-dung-mvp/ trong bộ nhớ,
 * so với `kich-ban.gen.ts` đã commit. Sửa .md mà quên `npm run noi-dung:sinh:mvp`, hoặc sửa tay .gen.ts, là đỏ.
 */
import { readdirSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { tepLechTrenDia } from '../../../../tools/noi-dung/sinh.ts';
import { sinhVanBanMvp, THU_MUC_NOI_DUNG_MVP, THU_MUC_SINH_MVP } from '../../../../tools/noi-dung/sinh-mvp.ts';
import { kiemSoDongMvp } from '../../../../tools/noi-dung/sql-mvp.ts';
import { docThuMucMvp } from '../../../../tools/noi-dung/thu-muc-mvp.ts';
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

  it('bộ dữ liệu cố định Vụ 1 (du-lieu.md): 11 lớp, 25 sinh viên, bảng ảo tra_cuu_k24', () => {
    const d = kq.duLieu as unknown as KichBanMvp | null;
    expect(d?.duLieu?.bang.map((b) => [b.ten, b.dong.length])).toEqual([
      ['lop_sinh_hoat', 11],
      ['sinh_vien', 25],
    ]);
    expect(d?.duLieu?.bangAo.map((v) => v.ten)).toEqual(['tra_cuu_k24']);
  });

  it('QĐ-089: mọi câu SQL khai số dòng chạy thật trên du-lieu.md ra đúng số khai (số đối chiếu: docs/mvp/kiem-du-lieu-vu1.py)', async () => {
    const d = kq.duLieu as unknown as KichBanMvp | null;
    const raw = docThuMucMvp(THU_MUC_NOI_DUNG_MVP).mvp.duLieu;
    const chay = await kiemSoDongMvp(raw, d?.soDongKhai ?? []);
    expect(chay.loi).toEqual([]);
    expect(chay.ketQua.map((k) => [k.noi.split(' ')[0], k.soDong, k.soDongThat])).toEqual([
      ['noi-dung-mvp/thu-thach/c-loc-lop.md:5', 1, 1],
      ['noi-dung-mvp/thu-thach/c-ten-h.md:3', 2, 2],
      ['noi-dung-mvp/thu-thach/c-ten-h.md:21', 2, 2],
      ['noi-dung-mvp/kich-ban/00-mo-dau.md:92', 3, 3],
      ['noi-dung-mvp/kich-ban/06-hop-va-ket.md:8', 14, 14],
    ]);
  });
});
