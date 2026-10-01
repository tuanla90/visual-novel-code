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

  it('dữ liệu sinh đủ hình dạng KichBanMvp: 5 ngày theo truyện (chương 1, ĐÃ CHỐT C), ngày họp, hai kết', () => {
    const d = kq.duLieu as unknown as KichBanMvp | null;
    expect(d).not.toBeNull();
    if (!d) return;
    expect(d.lich.ngay.map((n) => n.so)).toEqual([1, 2, 3, 4, 5, 6]);
    expect(d.lich.ngayHop).not.toBeNull();
    expect(d.lich.ket).toEqual({ that: 'ket-that', thuong: 'ket-thuong' });
    // Ngày 6 là ngày thử màn tổng hợp (phiếu làm nguồn, nhóm và đếm), chuỗi v2-tong-hop.
    for (const n of d.lich.ngay) expect([n.kieu, n.chuoi]).toEqual(['theo-truyen', n.so === 6 ? 'v2-tong-hop' : `n${n.so}-mo`]);
    expect(d.soDongKhai.length).toBeGreaterThan(0);
    expect(d.chuoi.find((c) => c.id === 'md-01-ktx')?.mocSomNhat).toBe(0);
    expect(d.nhanVat.find((n) => n.id === 'quan')?.xuatHienTu).toEqual({ kind: 'ngay', ngay: 3, khung: 'sang' });
  });

  it('bộ dữ liệu cố định Vụ 1 (du-lieu.md): 14 lớp (3 lớp khác khóa, QĐ-092), 25 sinh viên, 9 dòng nhật ký in, bảng ảo tra_cuu_k24', () => {
    const d = kq.duLieu as unknown as KichBanMvp | null;
    expect(d?.duLieu?.bang.map((b) => [b.ten, b.dong.length])).toEqual([
      ['lop_sinh_hoat', 14],
      ['sinh_vien', 25],
      ['nhat_ky_in', 9],
      ['nhat_ky_su_dung', 7],
      ['tin_nhan', 8],
      ['dang_nhap_kenh', 5],
    ]);
    // Vụ 2: `␣` trong du-lieu.md là dấu cách thật ở đuôi mã phòng (bảng Markdown tự cắt dấu cách nên phải viết lộ).
    const maPhong = d?.duLieu?.bang.find((b) => b.ten === 'nhat_ky_su_dung')?.dong.map((h) => h[1]);
    expect(maPhong).toContain('CLB-THAM-TU  ');
    expect(maPhong).toContain('clb-tham-tu  ');
    expect(d?.duLieu?.bangAo.map((v) => v.ten)).toEqual(['tra_cuu_k24']);
  });

  it('QĐ-089: mọi câu SQL khai số dòng chạy thật trên du-lieu.md ra đúng số khai (số đối chiếu: docs/mvp/kiem-bang-vu1.py)', async () => {
    const d = kq.duLieu as unknown as KichBanMvp | null;
    const raw = docThuMucMvp(THU_MUC_NOI_DUNG_MVP).mvp.duLieu;
    const chay = await kiemSoDongMvp(raw, d?.soDongKhai ?? []);
    expect(chay.loi).toEqual([]);
    // So theo tệp (bỏ số dòng): viết lại lời thoại phía trên chỉ dẫn không được làm test đỏ oan.
    expect(chay.ketQua.map((k) => [(k.noi.split(' ')[0] ?? '').replace(/:\d+$/, ''), k.soDong, k.soDongThat])).toEqual([
      ['noi-dung-mvp/thu-thach/c-in.md', 1, 1],
      ['noi-dung-mvp/thu-thach/c-lop.md', 2, 2],
      ['noi-dung-mvp/thu-thach/c-ten-h.md', 2, 2],
      ['noi-dung-mvp/thu-thach/c-ten-h.md', 2, 2],
      ['noi-dung-mvp/thu-thach/tin-don.md', 5, 5],
      ['noi-dung-mvp/thu-thach/tin-don.md', 1, 1],
      ['noi-dung-mvp/thu-thach/tin-don.md', 2, 2],
      ['noi-dung-mvp/thu-thach/v2-loc-buoi.md', 4, 4],
      ['noi-dung-mvp/thu-thach/v2-tong-hop.md', 14, 14],
      ['noi-dung-mvp/thu-thach/v2-tong-hop.md', 3, 3],
      ['noi-dung-mvp/kich-ban/00-mo-dau.md', 3, 3],
      ['noi-dung-mvp/kich-ban/06-hop-va-ket.md', 14, 14],
    ]);
  });
});
