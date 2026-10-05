// @vitest-environment node
/**
 * Bảng điều tra (ĐÃ CHỐT B.1–B.2, 30/09/2026) trên kịch bản chương 1 THẬT: thẻ đúng loại theo hình dạng, sợi chỉ truy vấn
 * (ghi lúc tra xong, không có thì theo "Manh mối liên quan"), sợi loại trừ + gạch giá trị, phiếu sắp ghim (`them`), thẻ câu
 * hỏi theo nhiệm vụ, chỗ ghim. Kèm hai hành động của máy ghi vào bảng: `xong-thu-thach` có `dung`, `doi-cho-the`.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN as KB } from '../store/kho-mvp';
import { CO_THE, KHUNG_BANG, MA_THE_HOI, dungBang, gocNghieng, viTriThe, type BangDieuTra, type TheBang } from './bang-dieu-tra';
import { khungNhin, xuLy } from './may';
import type { TrangThaiMvp } from './trang-thai';
import { nhayToi } from './tu-choi';

const tim = (b: BangDieuTra, id: string): TheBang => {
  const t = b.the.find((x) => x.id === id);
  if (!t) throw new Error(`bảng thiếu thẻ ${id}`);
  return t;
};
const soi = (b: BangDieuTra, kieu: 'truy-van' | 'loai-tru'): string[] =>
  b.day
    .filter((d) => d.kieu === kieu)
    .map((d) => `${d.tu}>${d.den}`)
    .sort();

describe('thẻ trên bảng', () => {
  it('ngày 4 (nhật ký in): mỗi mục trong hồ sơ một thẻ đúng loại, cộng thẻ "?" của nhiệm vụ', () => {
    const s = nhayToi(KB, 'nhat-ky-in', 1);
    const b = dungBang(KB, s);
    const tatCa = [...s.hoSo.taiLieu, ...s.hoSo.manhMoi, ...s.hoSo.bangChung];
    expect(b.the.map((t) => t.id)).toEqual([...tatCa, MA_THE_HOI]);

    for (const id of s.hoSo.taiLieu) expect(tim(b, id).loai).toBe('tai-lieu');
    // Mẩu tin có giá trị kéo được / không có (mẩu tin không có dữ liệu vẽ khác).
    expect(tim(b, 'clue-chu-ky-h')).toMatchObject({ loai: 'tin', giaTri: ['H'], khongDuLieu: false });
    expect(tim(b, 'clue-bao-chi-k24')).toMatchObject({ loai: 'tin', giaTri: ['Báo chí', 'K24'] });
    expect(tim(b, 'clue-quyen-du-lieu')).toMatchObject({ loai: 'tin', giaTri: [], khongDuLieu: true });
    // Vật chứng nhặt ở hiện trường là ảnh chụp; vật chứng của thẻ thử thách là phiếu có con dấu số dòng.
    expect(tim(b, 'ev-the-lich').loai).toBe('vat');
    expect(tim(b, 'ev-hai-lop')).toMatchObject({ loai: 'phieu', phu: '2 dòng', giaTri: ['BC24A', 'BC23A'], khongDuLieu: false });
    expect(tim(b, 'ev-hai-ma')).toMatchObject({ loai: 'phieu', phu: '2 dòng', giaTri: ['SV240228', 'SV240317'] });
    expect(tim(b, MA_THE_HOI)).toMatchObject({ loai: 'hoi', nhan: s.nhiemVu, the: null });
  });

  it('không có nhiệm vụ, hoặc game đã hết → không có thẻ câu hỏi', () => {
    const s = nhayToi(KB, 'ten-h', 1);
    expect(dungBang(KB, { ...s, nhiemVu: null }).the.some((t) => t.loai === 'hoi')).toBe(false);
    expect(dungBang(KB, { ...s, giaiDoan: 'het' }).the.some((t) => t.loai === 'hoi')).toBe(false);
  });
});

describe('sợi chỉ', () => {
  it('chưa ghi lần tra nào (s.bang trống) → sợi truy vấn theo "Manh mối liên quan" của thẻ thử thách', () => {
    const s = nhayToi(KB, 'nhat-ky-in', 1);
    expect(s.bang?.day ?? {}).toEqual({});
    const b = dungBang(KB, s);
    expect(soi(b, 'truy-van')).toEqual(['clue-bao-chi-k24>ev-hai-lop', 'clue-chu-ky-h>ev-hai-ma', 'clue-toa-b>ev-hai-lop']);
    // Nhãn trên sợi là số dòng của phiếu.
    expect(b.day.find((d) => d.den === 'ev-hai-ma' && d.kieu === 'truy-van')?.nhan).toBe('2 dòng');
  });

  it('đã ghi thẻ dùng lúc tra (s.bang.day) → sợi theo đúng các thẻ đó; thẻ không có trên bảng hay chính phiếu thì bỏ', () => {
    const s0 = nhayToi(KB, 'nhat-ky-in', 1);
    const s: TrangThaiMvp = { ...s0, bang: { day: { 'ev-hai-ma': ['ev-hai-lop', 'clue-chu-ky-h', 'clue-khong-co', 'ev-hai-ma'] }, viTri: {} } };
    const b = dungBang(KB, s);
    expect(soi(b, 'truy-van')).toEqual(['clue-bao-chi-k24>ev-hai-lop', 'clue-chu-ky-h>ev-hai-ma', 'clue-toa-b>ev-hai-lop', 'ev-hai-lop>ev-hai-ma']);
  });

  it('mẩu tin sổ niêm phong ("Loại trừ: ev-hai-ma", "Gạch: SV240228") → sợi loại trừ tới phiếu hai mã, gạch SV240228', () => {
    const b = dungBang(KB, nhayToi(KB, 'nhat-ky-in', 1));
    expect(soi(b, 'loai-tru')).toEqual(['clue-hoai-nguoi-nop>ev-hai-ma']);
    expect(tim(b, 'ev-hai-ma').gach).toEqual(['SV240228']);
    expect(tim(b, 'ev-hai-lop').gach).toEqual([]);
  });

  it('chưa có mẩu tin loại trừ (ngày 3) → không sợi cam, không gạch', () => {
    const s = nhayToi(KB, 'ten-h', 1);
    const b = dungBang(KB, s, { id: 'ev-hai-ma', dung: [] });
    expect(soi(b, 'loai-tru')).toEqual([]);
    expect(tim(b, 'ev-hai-ma').gach).toEqual([]);
  });
});

describe('phiếu sắp ghim (`them`)', () => {
  it('ngày 3, vừa tra đúng c-ten-h: phiếu hai mã vẽ thêm (một lần) kèm sợi từ các thẻ đã dùng', () => {
    const s = nhayToi(KB, 'ten-h', 1);
    expect(s.hoSo.bangChung).not.toContain('ev-hai-ma');
    expect(dungBang(KB, s).the.some((t) => t.id === 'ev-hai-ma')).toBe(false);
    const b = dungBang(KB, s, { id: 'ev-hai-ma', dung: ['ev-hai-lop', 'clue-chu-ky-h'] });
    expect(b.the.filter((t) => t.id === 'ev-hai-ma')).toHaveLength(1);
    expect(soi(b, 'truy-van')).toEqual(expect.arrayContaining(['ev-hai-lop>ev-hai-ma', 'clue-chu-ky-h>ev-hai-ma']));
    expect(soi(b, 'truy-van').filter((x) => x.endsWith('>ev-hai-ma'))).toHaveLength(2);
  });

  it('`them` không kèm thẻ nào → sợi theo "Manh mối liên quan"; phiếu đã có trong hồ sơ thì không nhân đôi', () => {
    const s = nhayToi(KB, 'ten-h', 1);
    expect(soi(dungBang(KB, s, { id: 'ev-hai-ma', dung: [] }), 'truy-van').filter((x) => x.endsWith('>ev-hai-ma'))).toEqual(['clue-chu-ky-h>ev-hai-ma']);
    const lai = dungBang(KB, s, { id: 'ev-hai-lop', dung: ['clue-toa-b'] });
    expect(lai.the.filter((t) => t.id === 'ev-hai-lop')).toHaveLength(1);
    // `them` đè lên thứ đã ghi / manh mối liên quan của chính phiếu đó.
    expect(soi(lai, 'truy-van').filter((x) => x.endsWith('>ev-hai-lop'))).toEqual(['clue-toa-b>ev-hai-lop']);
  });
});

describe('chỗ ghim', () => {
  it('ưu tiên chỗ người chơi đã kéo; không thì chỗ dựng sẵn; tài liệu xếp cột bên trái; còn lại tự xếp lưới', () => {
    const s = nhayToi(KB, 'ten-h', 1);
    const b = dungBang(KB, s);
    const vt = viTriThe(b);
    expect(vt['clue-chu-ky-h']).toEqual({ x: 196, y: 64 });
    expect(vt[s.hoSo.taiLieu[0] ?? '']).toEqual({ x: 26, y: 34 });
    expect(vt[s.hoSo.taiLieu[1] ?? '']).toEqual({ x: 40, y: 174 });
    expect(viTriThe(b, { 'clue-chu-ky-h': { x: 700, y: 500 } })['clue-chu-ky-h']).toEqual({ x: 700, y: 500 });
    // Thẻ đã kéo không làm tài liệu khác bị tự động sắp xếp / dồn lên.
    expect(viTriThe(b, { [s.hoSo.taiLieu[0] ?? '']: { x: 900, y: 10 } })[s.hoSo.taiLieu[1] ?? '']).toEqual({ x: 40, y: 174 });

    const la = (id: string): TheBang => ({ id, loai: 'tin', nhan: id, phu: null, giaTri: [], gach: [], anh: null, khongDuLieu: true, the: null, mau: 'do' });
    const tu = viTriThe({ the: [la('x1'), la('x2'), la('x3'), la('x4'), la('x5'), la('x6'), la('x7')], day: [], boGhim: [] });
    expect(tu.x1).toEqual({ x: 190, y: 60 });
    expect(tu.x2).toEqual({ x: 422, y: 60 });
    expect(tu.x7).toEqual({ x: 190, y: 270 });
    // Kéo x2 đi chỗ khác: x3 và x7 không bị tự động dồn lên hay sắp xếp lại ô của x2
    const tuSauKhiKeo = viTriThe({ the: [la('x1'), la('x2'), la('x3'), la('x4'), la('x5'), la('x6'), la('x7')], day: [], boGhim: [] }, { x2: { x: 800, y: 800 } });
    expect(tuSauKhiKeo.x1).toEqual({ x: 190, y: 60 });
    expect(tuSauKhiKeo.x2).toEqual({ x: 800, y: 800 });
    expect(tuSauKhiKeo.x3).toEqual({ x: 654, y: 60 });
    expect(tuSauKhiKeo.x7).toEqual({ x: 190, y: 270 });
  });

  it('buổi họp (bảng đầy nhất chương 1): mọi thẻ nằm trọn trong khung 1600×900', () => {
    const b = dungBang(KB, nhayToi(KB, 'hop-sua-or', 1), { id: 'ev-hai-dong-sua', dung: [] });
    const vt = viTriThe(b);
    for (const t of b.the) {
      const p = vt[t.id];
      if (!p) throw new Error(`thiếu chỗ ${t.id}`);
      expect(p.x, t.id).toBeGreaterThanOrEqual(0);
      expect(p.y, t.id).toBeGreaterThanOrEqual(0);
      expect(p.x + CO_THE[t.loai].rong, t.id).toBeLessThanOrEqual(KHUNG_BANG.rong);
      expect(p.y + CO_THE[t.loai].cao, t.id).toBeLessThanOrEqual(KHUNG_BANG.cao);
    }
  });

  it('góc nghiêng cố định theo mã, trong khoảng ±2,8°', () => {
    const ma = ['clue-chu-ky-h', 'ev-hai-ma', 'doc-thu-che', MA_THE_HOI];
    for (const id of ma) {
      expect(gocNghieng(id)).toBe(gocNghieng(id));
      expect(Math.abs(gocNghieng(id))).toBeLessThanOrEqual(2.8 + 1e-9);
    }
    expect(new Set(ma.map(gocNghieng)).size).toBeGreaterThan(1);
  });
});

describe('máy ghi vào bảng', () => {
  it('xong-thu-thach kèm `dung` → s.bang.day[<mã phiếu>] (bỏ trùng); bảng vẽ sợi theo đó', () => {
    const s = nhayToi(KB, 'ten-h', 1);
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'challenge', thuThach: { id: 'c-ten-h' } });
    const sau = xuLy(KB, s, { type: 'xong-thu-thach', thuThach: 'c-ten-h', dung: ['ev-hai-lop', 'clue-chu-ky-h', 'ev-hai-lop'] });
    expect(sau.hoSo.bangChung).toContain('ev-hai-ma');
    expect(sau.bang?.day).toEqual({ 'ev-hai-ma': ['ev-hai-lop', 'clue-chu-ky-h'] });
    expect(soi(dungBang(KB, sau), 'truy-van').filter((x) => x.endsWith('>ev-hai-ma'))).toEqual(['clue-chu-ky-h>ev-hai-ma', 'ev-hai-lop>ev-hai-ma']);
  });

  it('xong-thu-thach không kèm `dung` (hoặc rỗng) → không ghi bảng; sai mã thẻ → không đổi gì', () => {
    const s = nhayToi(KB, 'ten-h', 1);
    expect(xuLy(KB, s, { type: 'xong-thu-thach', thuThach: 'c-ten-h' }).bang?.day['ev-hai-ma']).toBeUndefined();
    expect(xuLy(KB, s, { type: 'xong-thu-thach', thuThach: 'c-ten-h', dung: [] }).bang?.day['ev-hai-ma']).toBeUndefined();
    expect(xuLy(KB, s, { type: 'xong-thu-thach', thuThach: 'c-lop', dung: ['clue-toa-b'] })).toBe(s);
  });

  it('doi-cho-the → s.bang.viTri làm tròn; giữ sợi đã ghi; làm được ở bất cứ khung nào', () => {
    const s0 = nhayToi(KB, 'ten-h', 1);
    const s = { ...s0, bang: { day: { 'ev-hai-lop': ['clue-toa-b'] }, viTri: {} } };
    const sau = xuLy(KB, s, { type: 'doi-cho-the', the: 'clue-chu-ky-h', x: 300.6, y: 120.2 });
    expect(sau.bang).toEqual({ day: { 'ev-hai-lop': ['clue-toa-b'] }, viTri: { 'clue-chu-ky-h': { x: 301, y: 120 } } });
    // Không đổi chỗ đang đứng trong truyện.
    expect(khungNhin(KB, sau)).toEqual(khungNhin(KB, s));
    // Chưa có s.bang (ván lưu cũ) cũng ghi được; bảng dùng chỗ đó.
    const moi = xuLy(KB, s0, { type: 'doi-cho-the', the: 'ev-hai-lop', x: 10, y: 20 });
    expect(moi.bang).toEqual({ day: {}, viTri: { 'ev-hai-lop': { x: 10, y: 20 } } });
    expect(viTriThe(dungBang(KB, moi), moi.bang?.viTri)['ev-hai-lop']).toEqual({ x: 10, y: 20 });
  });
});

describe('màu ghim và gỡ / ghim lại (câu 5 đề xuất gameplay, 01/10)', () => {
  const toiHop = (): TrangThaiMvp => nhayToi(KB, 'hop-sua-or', 1);
  it('mặc định mọi thẻ ghim đỏ, không thẻ nào bị gỡ; sợi mang màu ghim của thẻ nguồn', () => {
    const s = toiHop();
    const b = dungBang(KB, s);
    expect(b.boGhim).toEqual([]);
    expect(b.the.every((t) => t.mau === 'do')).toBe(true);
    expect(b.day.every((d) => d.mau === 'do')).toBe(true);
  });

  it('doi-mau-ghim: ghi s.bang.mau, thẻ và sợi đi từ thẻ đó đổi màu; màu lạ / thẻ không có trong hồ sơ → không đổi', () => {
    let s = toiHop();
    s = xuLy(KB, s, { type: 'doi-mau-ghim', the: 'clue-toa-b', mau: 'xanh' });
    expect(s.bang?.mau).toEqual({ 'clue-toa-b': 'xanh' });
    const b = dungBang(KB, s);
    expect(tim(b, 'clue-toa-b').mau).toBe('xanh');
    expect(b.day.filter((d) => d.tu === 'clue-toa-b').every((d) => d.mau === 'xanh')).toBe(true);
    expect(b.day.filter((d) => d.tu !== 'clue-toa-b').every((d) => d.mau === 'do')).toBe(true);
    expect(xuLy(KB, s, { type: 'doi-mau-ghim', the: 'clue-toa-b', mau: 'hong' as never })).toBe(s);
    expect(xuLy(KB, s, { type: 'doi-mau-ghim', the: 'clue-khong-co', mau: 'luc' })).toBe(s);
  });

  it('ghim-the false: thẻ rời bảng sang `boGhim`, sợi tới/từ nó biến mất; ghim lại thì về chỗ cũ; thẻ "?" không gỡ được', () => {
    let s = toiHop();
    const truoc = dungBang(KB, s);
    expect(truoc.day.some((d) => d.tu === 'clue-toa-b')).toBe(true);
    s = xuLy(KB, s, { type: 'ghim-the', the: 'clue-toa-b', ghim: false });
    expect(s.bang?.boGhim).toEqual(['clue-toa-b']);
    const b = dungBang(KB, s);
    expect(b.the.some((t) => t.id === 'clue-toa-b')).toBe(false);
    expect(b.boGhim.map((t) => t.id)).toEqual(['clue-toa-b']);
    expect(b.day.some((d) => d.tu === 'clue-toa-b' || d.den === 'clue-toa-b')).toBe(false);
    expect(xuLy(KB, s, { type: 'ghim-the', the: 'clue-toa-b', ghim: false })).toBe(s);
    s = xuLy(KB, s, { type: 'ghim-the', the: 'clue-toa-b', ghim: true });
    expect(s.bang?.boGhim).toEqual([]);
    expect(dungBang(KB, s).the.map((t) => t.id)).toEqual(truoc.the.map((t) => t.id));
    expect(xuLy(KB, s, { type: 'ghim-the', the: MA_THE_HOI, ghim: false })).toBe(s);
  });

  it('phiếu sắp ghim (`them`) luôn lên bảng dù đã bị gỡ trước đó', () => {
    let s = toiHop();
    s = xuLy(KB, s, { type: 'ghim-the', the: 'ev-hai-ma', ghim: false });
    const b = dungBang(KB, s, { id: 'ev-hai-ma', dung: ['clue-chu-ky-h'] });
    expect(b.the.some((t) => t.id === 'ev-hai-ma')).toBe(true);
    expect(b.boGhim).toEqual([]);
  });
});
