// @vitest-environment node
/**
 * Máy kiểm giọng (tools/noi-dung/kiem-giong.ts): đọc luật từ giong/luat-giong.md và bắt đúng các lỗi lặp lại khi sửa lời.
 * Kiểm trên lời mẫu, không trên lời thật (lời thật còn đang sửa theo các luật chốt 03/10).
 */
import { describe, expect, it } from 'vitest';
import { docLuatGiong, kiemGiong } from '../../../tools/noi-dung/kiem-giong';

const LUAT = `
## Thứ tự truyện
- 01-a
- 02-b

## Xưng hô
- duy · không nói: tớ, cậu · vì: anh/em
- hieu · không nói: tôi · từ: 02-b · vì: đổi theo cung

## Cách gọi
- Duy → anh Duy · người nói: tung

## Cụm dành riêng
- "nói thẳng" · chỉ: hieu · vì: nét Hiếu

## Câu khóa
- "Căn cứ vào đâu?" · ở: 01-a · vì: gài

## Tên đã bỏ
- thầy Khải · vì: bỏ

## Lời nhắc không lộ đáp án
- (?<!\\p{L})(VÀ|HOẶC)(?!\\p{L}) · vì: lộ đáp án

## Độ dài
- mặc định · 5

## Chống giọng AI
- [“”] · mức: lỗi · vì: ngoặc cong
- (đóng|giữ) vai trò (quan trọng|then chốt) · mức: lỗi · vì: thổi phồng
- (tớ|em) (cảm thấy|thấy) (rất )?(vui|buồn) · mức: nhắc · áp: thoại · vì: gọi tên cảm xúc
- — · mức: nhắc · vì: gạch dài

## Tiểu từ
- mẫu: (?<!\\p{L})(à|nhỉ|chứ|đấy|mà|ạ)(?!\\p{L}) · tối thiểu: 0.5 · cỡ: 2 · bỏ qua: tt-
`;

const tep = (ten: string, ...dong: string[]): { ten: string; duongDan: string; noiDung: string } => ({ ten, duongDan: `loi/${ten}.md`, noiDung: ['## d.1', ...dong].join('\n') });

describe('kiem-giong', () => {
  const luat = docLuatGiong(LUAT);

  it('đọc đủ các phần luật', () => {
    expect(luat.thuTu).toEqual(['01-a', '02-b']);
    expect(luat.xungHo[1]).toMatchObject({ nguoi: 'hieu', tu: ['tôi'], tuTep: '02-b' });
    expect(luat.doDai.get('mặc định')).toBe(5);
  });

  it('bắt sai xưng hô, gọi trống, tên đã bỏ, lời nhắc lộ đáp án, mất câu khóa', () => {
    const kq = kiemGiong(luat, [
      tep('01-a', '- **duy** (neutral): Tớ giữ chìa.', '- **tung** (happy): Duy ơi.', '- **hieu** (annoyed): Tôi nói vậy.', '> NHIỆM VỤ: Lọc tòa B VÀ Báo chí', '- **narrator**: Gặp thầy Khải.'),
      tep('02-b', '- **hieu** (neutral): Tôi gỡ rồi.'),
    ]);
    const luatBat = kq.loi.map((l) => /\[([^\]]+)\]/.exec(l)?.[1]);
    expect(luatBat.sort()).toEqual(['câu khóa', 'cách gọi', 'lời nhắc', 'tên đã bỏ', 'xưng hô', 'xưng hô'].sort());
    expect(kq.loi.some((l) => l.includes('02-b.md') && l.includes('hieu nói "tôi"'))).toBe(true);
    expect(kq.loi.some((l) => l.includes('01-a.md') && l.includes('hieu'))).toBe(false);
  });

  it('không bắt lời nhại trong ngoặc kép, ngôi thứ ba, cách gọi đúng', () => {
    const kq = kiemGiong(luat, [tep('01-a', '- **duy** (neutral): Cậu ấy bảo "tớ cá là".', '- **tung** (happy): Anh Duy ơi. Căn cứ vào đâu?')]);
    expect(kq.loi).toEqual([]);
  });

  it('cảnh báo cụm dành riêng và bong bóng dài', () => {
    const kq = kiemGiong(luat, [tep('01-a', '- **tung** (thinking): Bạn ấy nói thẳng lắm, thật đấy. Căn cứ vào đâu?')]);
    expect(kq.canhBao.map((c) => /\[([^\]]+)\]/.exec(c)?.[1]).sort()).toEqual(['cụm riêng', 'độ dài']);
  });

  it('chống giọng AI: lỗi và nhắc theo mức, đúng phạm vi áp, bỏ qua thẻ chữ', () => {
    const kq = kiemGiong(luat, [
      tep(
        '01-a',
        '- [THẺ CHỮ] **narrator**: Ngày 1 — Thứ Ba',
        '- **ha-vy** (smile): Cái sổ này đóng vai trò then chốt. Căn cứ vào đâu?',
        '- **tung** (happy): Tớ cảm thấy rất vui đấy.',
        '- **narrator**: Em cảm thấy buồn — trời mưa.',
        '- **duy** (neutral): Anh để ở “ngăn hai”.',
      ),
    ]);
    const giongAi = (ds: string[]): string[] => ds.filter((x) => x.includes('[giọng AI]')).map((x) => /"([^"]+)" —/.exec(x)?.[1] ?? '');
    expect(giongAi(kq.loi).sort()).toEqual(['đóng vai trò then chốt', '“'].sort());
    // "cảm thấy buồn" của narrator không tính (luật chỉ áp cho thoại); gạch dài của thẻ chữ không tính.
    expect(giongAi(kq.canhBao).sort()).toEqual(['Tớ cảm thấy rất vui', '—'].sort());
  });

  it('tiểu từ: nhắc khi tệp đủ cỡ mà ít tiểu từ, bỏ qua tệp tt-', () => {
    const kho = ['- **tung** (happy): Lịch ghi xưởng đăng ký tới mười một giờ.', '- **ha-vy** (neutral): Nhật ký in có hai lệnh lúc mười giờ.', '- **tung** (happy): Căn cứ vào đâu?'];
    const kq = kiemGiong(luat, [tep('01-a', ...kho), tep('02-b', '- **tung** (happy): Thế à, cậu chắc chứ?', '- **ha-vy** (neutral): Chắc mà, tớ đếm rồi đấy.')]);
    const tieuTu = kq.canhBao.filter((x) => x.includes('[tiểu từ]'));
    expect(tieuTu).toHaveLength(1);
    expect(tieuTu[0]).toContain('01-a.md');
    const luatTt = { ...luat, thuTu: [...luat.thuTu, 'tt-x'] };
    expect(kiemGiong(luatTt, [tep('01-a', '- **tung** (happy): Căn cứ vào đâu? Ừ thì vậy đấy.'), tep('tt-x', ...kho)]).canhBao.filter((x) => x.includes('[tiểu từ]'))).toEqual([]);
  });
});
