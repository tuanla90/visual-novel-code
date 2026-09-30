// Tách khung / lời (ĐÃ CHỐT A, 30/09/2026): khung đặt "- [LỜI mã]", lời nằm ở loi/*.md dưới "## mã".
import { describe, expect, it } from 'vitest';
import { docTepLoi, ghepLoi, traViTri } from '../../../../tools/noi-dung/ghep-loi.ts';

const LOI = ['# Lời · thử', '', '## n1-mo.1', '- **tung** (neutral): Đi thôi.', '- [DÀN DỰNG] Trời nắng.', '', '## n1-mo.2', '> NHIỆM VỤ: Hỏi bác bảo vệ', ''].join('\n');
const KHUNG = ['### n1-mo — Mở ngày {cảnh: x}', '', '- [LỜI n1-mo.2]', '', '- [LỜI n1-mo.1]', '- [ĐI TỚI n1-b]'].join('\n');

describe('ghép lời vào khung', () => {
  it('thay dòng [LỜI mã] bằng đúng các dòng của đoạn, giữ thứ tự khung', () => {
    const d = docTepLoi('loi/a.md', LOI);
    expect(d.loi).toEqual([]);
    const g = ghepLoi([{ duongDan: 'kich-ban/a.md', noiDung: KHUNG }], d.doan);
    expect(g.loi).toEqual([]);
    expect(g.noiDung.get('kich-ban/a.md')).toBe(
      ['### n1-mo — Mở ngày {cảnh: x}', '', '> NHIỆM VỤ: Hỏi bác bảo vệ', '', '- **tung** (neutral): Đi thôi.', '- [DÀN DỰNG] Trời nắng.', '- [ĐI TỚI n1-b]'].join('\n'),
    );
  });

  it('lỗi ở dòng đã ghép được trả về đúng tệp lời và dòng gốc', () => {
    const g = ghepLoi([{ duongDan: 'kich-ban/a.md', noiDung: KHUNG }], docTepLoi('loi/a.md', LOI).doan);
    // dòng 5 sau ghép là "- **tung** …" = dòng 4 của loi/a.md
    expect(traViTri({ tep: 'kich-ban/a.md', dong: 5, thongBao: 'x' }, g.banDo)).toEqual({ tep: 'loi/a.md', dong: 4, thongBao: 'x' });
    // dòng 7 là "- [ĐI TỚI]" của khung = dòng 6 khung
    expect(traViTri({ tep: 'kich-ban/a.md', dong: 7, thongBao: 'x' }, g.banDo)).toEqual({ tep: 'kich-ban/a.md', dong: 6, thongBao: 'x' });
  });

  it('báo lỗi: khung thiếu lời, lời không ai dùng, lời trùng mã, lời dùng hai chỗ', () => {
    const d = docTepLoi('loi/a.md', `${LOI}\n## n1-mo.1\n- **tung** (neutral): Trùng.\n## le-loi.1\n- **tung** (neutral): Thừa.\n`);
    const g = ghepLoi([{ duongDan: 'kich-ban/a.md', noiDung: `${KHUNG}\n- [LỜI thieu.1]\n- [LỜI n1-mo.1]` }], d.doan);
    const tb = g.loi.map((l) => l.thongBao).join('\n');
    expect(tb).toMatch(/trùng/);
    expect(tb).toMatch(/khung cần lời "thieu\.1"/);
    expect(tb).toMatch(/"le-loi\.1" không được khung nào dùng/);
    expect(tb).toMatch(/"n1-mo\.1" đã được dùng ở chỗ khác/);
  });

  it('tệp lời không được chứa dòng cấu trúc; lời "(tạm)" được đếm', () => {
    const d = docTepLoi('loi/a.md', '## x.1\n- [ĐI TỚI y]\n- **tung** (neutral): (tạm) chờ lời thật\n');
    expect(d.loi.map((l) => l.dong)).toEqual([2]);
    const g = ghepLoi([{ duongDan: 'k.md', noiDung: '- [LỜI x.1]' }], d.doan);
    expect(g.soTam).toBe(1);
  });
});
