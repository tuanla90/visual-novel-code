// @vitest-environment node
/**
 * Gói B18, bộ đọc + bộ kiểm (tools/noi-dung/doc-mvp.ts, luat-mvp.ts): dòng `- Biết lúc gặp:` của nhan-vat.md và nút
 * `- [BIẾT <mã> <trường>, <trường>]` của khung. Đọc bộ mùa 1 thật (đã ghép lời) rồi sửa vài dòng để xem lỗi báo đúng chỗ.
 */
import { describe, expect, it } from 'vitest';
import { dinhDangLoi, docDanhSachTruongBiet, docNoiDungMvp, type TepMvp } from '../../../../tools/noi-dung/doc-mvp.ts';
import { kiemLuatMvp } from '../../../../tools/noi-dung/luat-mvp.ts';
import { THU_MUC_NOI_DUNG_MUA_1 } from '../../../../tools/noi-dung/sinh-mua1.ts';
import { docThuMucMvp } from '../../../../tools/noi-dung/thu-muc-mvp.ts';

const GOC = docThuMucMvp(THU_MUC_NOI_DUNG_MUA_1);

/** Đọc lại bộ mùa 1 với vài tệp được sửa (`sua`: đường dẫn hiển thị → hàm sửa chữ). Trả lỗi và cảnh báo đã định dạng. */
function doc(sua: Record<string, (s: string) => string> = {}): { loi: string[]; canhBao: string[]; mvp: ReturnType<typeof docNoiDungMvp>['mvp'] } {
  const tep: TepMvp[] = GOC.tep.map((t) => {
    const f = sua[t.duongDan];
    return f ? { ...t, noiDung: f(t.noiDung) } : t;
  });
  const kq = docNoiDungMvp(tep);
  const luat = kiemLuatMvp(kq.mvp);
  return { loi: [...kq.loi, ...luat.loi].map(dinhDangLoi), canhBao: luat.canhBao.map(dinhDangLoi), mvp: kq.mvp };
}

describe('docDanhSachTruongBiet', () => {
  it('đọc tên trường tiếng Việt, không phân biệt hoa thường, "không" = rỗng', () => {
    expect(docDanhSachTruongBiet('danh xưng, Năm, ngành')).toEqual({ truong: ['danh-xung', 'nam', 'nganh'], loi: null });
    expect(docDanhSachTruongBiet('không')).toEqual({ truong: [], loi: null });
    expect(docDanhSachTruongBiet('họ tên, bừa').loi).toMatch(/trường "bừa" không hợp lệ/);
    expect(docDanhSachTruongBiet('năm, năm').loi).toMatch(/lặp lại/);
  });
});

describe('bộ mùa 1 thật: Biết lúc gặp và [BIẾT]', () => {
  it('đọc sạch; thẻ Tùng biết danh xưng, năm, ngành; khung có nút biet "câu nói, lịch" của Tùng; cảnh báo ô chưa ai mở', () => {
    const { loi, canhBao, mvp } = doc();
    expect(loi).toEqual([]);
    expect(mvp.nhanVat.find((n) => n.id === 'tung')?.gioiThieu?.bietLucGap).toEqual(['danh-xung', 'nam', 'nganh']);
    // B19 (Vụ 1 bản 6): Hoài chưa biết gì lúc gặp; họ tên, ngành… mở sau màn tra bảng sinh viên ngày 2.
    expect(mvp.nhanVat.find((n) => n.id === 'hoai')?.gioiThieu?.bietLucGap).toEqual([]);
    const phong408 = mvp.chuoi.find((c) => c.id === 'md-01-phong-408');
    expect(phong408?.items.some((it) => it.kind === 'biet' && it.nhanVat === 'tung' && it.truong.join() === 'cau-noi,lich')).toBe(true);
    // Ô chưa biết lúc gặp mà cả bộ không có [BIẾT] nào mở → cảnh báo (không lỗi), ví dụ họ tên của Duy.
    expect(canhBao).toEqual(expect.arrayContaining([expect.stringMatching(/nhan-vat\.md:\d+: nhân vật duy: ô "họ tên" chưa biết lúc gặp mà cả bộ không có dòng \[BIẾT duy …\] nào mở/)]));
    expect(canhBao.some((c) => /nhân vật chu-cuong:/.test(c))).toBe(false);
  });

  it('[BIẾT] sai: trường đã biết lúc gặp (thừa), ô thẻ không có, nhân vật không có, thẻ không khai "Biết lúc gặp"', () => {
    const { loi } = doc({
      'noi-dung-mua-1/kich-ban/00-mo-dau.md': (s) =>
        s
          .replace('- [BIẾT tung câu nói, lịch]', '- [BIẾT tung năm]\n- [BIẾT quan ngành]\n- [BIẾT khong-co họ tên]\n- [BIẾT narrator họ tên]'),
      // Hoài bỏ dòng "Biết lúc gặp" → [BIẾT hoai …] sau màn tra ngày 2 thành thừa.
      'noi-dung-mua-1/nhan-vat.md': (s) => s.replace('- Biết lúc gặp: không\n', ''),
    });
    expect(loi).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/kich-ban\/00-mo-dau\.md:\d+: \[BIẾT tung năm\]: "năm" đã có trong "Biết lúc gặp" của tung \(dòng thừa\)/),
        expect.stringMatching(/kich-ban\/00-mo-dau\.md:\d+: \[BIẾT quan ngành\]: thẻ nhân vật quan không có "ngành" để biết/),
        expect.stringMatching(/kich-ban\/00-mo-dau\.md:\d+: \[BIẾT khong-co\]: không có nhân vật "khong-co"/),
        expect.stringMatching(/kich-ban\/02-ngay-2\.md:\d+: \[BIẾT hoai họ tên\]: thẻ nhân vật hoai không khai "Biết lúc gặp" nên đã biết hết \(dòng thừa\)/),
      ]),
    );
  });

  it('dòng [BIẾT] viết sai (trường lạ, thiếu trường) và "Biết lúc gặp" liệt kê ô thẻ không có → lỗi ở đúng dòng', () => {
    const { loi } = doc({
      'noi-dung-mua-1/kich-ban/00-mo-dau.md': (s) => s.replace('- [BIẾT tung câu nói, lịch]', '- [BIẾT tung bừa]'),
      'noi-dung-mua-1/nhan-vat.md': (s) => s.replace('- Biết lúc gặp: danh xưng, câu nói\n- Khi chưa quen: Người ngồi sẵn', '- Biết lúc gặp: danh xưng, câu nói, năm\n- Khi chưa quen: Người ngồi sẵn'),
    });
    expect(loi).toEqual(
      expect.arrayContaining([
        expect.stringMatching(/kich-ban\/00-mo-dau\.md:\d+: .*\[BIẾT tung\]: trường "bừa" không hợp lệ/),
        expect.stringMatching(/nhan-vat\.md:\d+: nhân vật quan, "Biết lúc gặp": thẻ không có "năm" để biết \(thừa\)/),
      ]),
    );
  });
});
