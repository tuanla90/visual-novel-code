// @vitest-environment node
/**
 * Máy kiểm màn tra của bộ mùa 1 (gói B14, tools/noi-dung/man-tra-mua1.ts): gợi ý hai bậc của bạn đi cùng và "Chữ trên giấy" của
 * giấy nhớ. Nội dung thật không lỗi; mỗi luật có một ví dụ sai (sửa trên bản đã đọc của nội dung thật).
 */
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { describe, expect, it } from 'vitest';
import type { RawMvp } from '../../../../tools/noi-dung/doc-mvp.ts';
import { docTepLoi } from '../../../../tools/noi-dung/ghep-loi.ts';
import { docLuatGiong, kiemGiong } from '../../../../tools/noi-dung/kiem-giong.ts';
import { kiemManTraMua1, loiChuTrenGiay, TOI_DA_CHU_TREN_GIAY } from '../../../../tools/noi-dung/man-tra-mua1.ts';
import { docGoiY, docPhanUng } from '../../../../tools/noi-dung/phan-ung-mvp.ts';
import { THU_MUC_NOI_DUNG_MUA_1 } from '../../../../tools/noi-dung/sinh-mua1.ts';
import { THU_MUC_NOI_DUNG_MVP } from '../../../../tools/noi-dung/kiem-mvp.ts';
import { docThuMucMvp } from '../../../../tools/noi-dung/thu-muc-mvp.ts';

const doc = () => docThuMucMvp(THU_MUC_NOI_DUNG_MUA_1);
/** Đọc lại nội dung thật rồi sửa một chỗ; trả các lỗi của máy kiểm. */
const loiSau = (sua: (m: RawMvp) => void): string[] => {
  const kq = doc();
  sua(kq.mvp);
  return kiemManTraMua1(kq.mvp, { banDo: kq.banDo, doanLoi: kq.doanLoi }).loi;
};
const the = (m: RawMvp, id: string) => m.challenges.find((c) => c.id === id)!;
const hoSo = (m: RawMvp, id: string) => m.dossier.find((d) => d.id === id)!;

describe('nội dung thật', () => {
  it('bộ mùa 1 không lỗi; đủ gợi ý cho các màn tra của Vụ 1, đủ chữ cho giấy nhớ của Vụ 1', () => {
    const kq = doc();
    const kiem = kiemManTraMua1(kq.mvp, { banDo: kq.banDo, doanLoi: kq.doanLoi });
    expect(kiem.loi).toEqual([]);
    expect(kiem.tomTat).toMatch(/^màn tra: \d+ gợi ý hai bậc, \d+ tờ giấy nhớ có chữ/);
    // B19 (08/10/2026): màn tra của Vụ 1 bản 6.
    for (const id of ['c-sv-hoai', 'c-sv-hoai-bc24', 'c-ra-vao', 'c-sua-or-quan']) expect(docGoiY(the(kq.mvp, id).fields).goiY.some((g) => g.khi === null), id).toBe(true);
    for (const id of ['ev-phieu-gui-hoai', 'ev-the-lich-bc24', 'clue-loi-chu-cuong']) expect(hoSo(kq.mvp, id).fields['Chữ trên giấy'], id).toBeTruthy();
    expect(the(kq.mvp, 'c-sv-hoai-bc24').evidence).toMatchObject({ chuTrenGiay: expect.stringContaining('**SV240317**') });
  });

  it('bộ MVP không có dòng gợi ý hay chữ trên giấy nào (bộ sinh ra y như trước)', () => {
    const kq = docThuMucMvp(THU_MUC_NOI_DUNG_MVP);
    expect(kq.mvp.challenges.some((c) => docGoiY(c.fields).goiY.length > 0 || c.evidence?.chuTrenGiay || c.evidence?.tachGiay)).toBe(false);
    expect(kq.mvp.dossier.some((d) => d.fields['Chữ trên giấy'] !== undefined)).toBe(false);
  });
});

describe('cú pháp dòng gợi ý', () => {
  it('đúng hai lời nối bằng <br>; phần sau "khi" đọc như dòng "Khi …"', () => {
    const { goiY, loi } = docGoiY({
      'Gợi ý': '**ha-vy** (thinking): Một. <br> **ha-vy** (neutral): Hai.',
      'Gợi ý khi thiếu cột': '**duy** (neutral): A. <br> **duy** (neutral): B.',
      'Gợi ý khi chạy ra 0 dòng với ten_tep': '**ha-vy** (thinking): C. <br> **ha-vy** (neutral): D.',
      'Khi đúng': '**ha-vy** (neutral): Không phải gợi ý.',
    });
    expect(loi).toEqual([]);
    expect(goiY.map((g) => g.khi)).toEqual([null, { kind: 'thieu-cot' }, { kind: 'so-dong', n: 0, cot: ['ten_tep'] }]);
    expect(goiY[0]).toMatchObject({ bac1: { speaker: 'ha-vy', expression: 'thinking', text: 'Một.' }, bac2: { text: 'Hai.' } });
    // Dòng gợi ý không lẫn vào phản ứng "Khi …".
    expect(docPhanUng({ 'Gợi ý khi thiếu cột': 'x', 'Khi đúng': '**ha-vy** (neutral): Ừ.' }).phanUng).toHaveLength(1);
  });

  it('một lời, ba lời, điều kiện lạ, lời sai dạng → lỗi', () => {
    expect(docGoiY({ 'Gợi ý': '**ha-vy** (thinking): Chỉ một.' }).loi[0]).toMatch(/đúng hai lời/);
    expect(docGoiY({ 'Gợi ý': '**a** (x): 1 <br> **a** (x): 2 <br> **a** (x): 3' }).loi[0]).toMatch(/đúng hai lời/);
    expect(docGoiY({ 'Gợi ý khi trời mưa': '**a** (x): 1 <br> **a** (x): 2' }).loi[0]).toMatch(/lạ/);
    expect(docGoiY({ 'Gợi ý': 'không ai nói <br> **a** (x): 2' }).loi[0]).toMatch(/không đọc được lời/);
  });

  it('tệp lời nhận dòng "- Gợi ý…"; máy kiểm giọng soát cả hai bậc, bậc 1 theo luật "không lộ đáp án"', () => {
    const tep = ['## x.1', '- Gợi ý: **ha-vy** (thinking): Lớp nào khớp cả hai, tòa B VÀ Báo chí? <br> **duy** (neutral): Tớ bảo cậu bấm chữ VÀ.'].join('\n');
    expect(docTepLoi('loi/tt-x.md', tep).loi).toEqual([]);
    const kq = kiemGiong(docLuatGiong(readFileSync(join(THU_MUC_NOI_DUNG_MUA_1, 'giong/luat-giong.md'), 'utf8')), [{ ten: 'tt-c-lop', duongDan: 'loi/tt-x.md', noiDung: tep }]);
    expect(kq.bong.filter((b) => b.doan === 'x.1').map((b) => [b.nguoi, b.goiYBac])).toEqual([['ha-vy', 1], ['duy', 2]]);
    // Bậc 1 có từ khóa viết hoa → lỗi; bậc 2 thì được nhắc chữ "VÀ" trên màn hình, nhưng Duy xưng "tớ", "cậu" là lỗi xưng hô.
    expect(kq.loi.some((l) => /\[gợi ý bậc 1\]/.test(l))).toBe(true);
    expect(kq.loi.filter((l) => /duy nói "(tớ|cậu)"/.test(l))).toHaveLength(2);
    expect(kq.loi.some((l) => /\[gợi ý bậc 1\].*Tớ bảo/.test(l))).toBe(false);
  });
});

describe('luật gợi ý', () => {
  const dat = (id: string, nhan: string, chu: string) => (m: RawMvp) => void (the(m, id).fields[nhan] = chu);

  it('màn tra của Vụ 1 thiếu dòng "Gợi ý" chung → lỗi; thẻ vụ sau thì không bắt', () => {
    const loi = loiSau((m) => {
      delete the(m, 'c-ra-vao').fields['Gợi ý'];
    });
    expect(loi.some((l) => /thẻ c-ra-vao: có dòng "Gợi ý khi …" thì phải có dòng "Gợi ý" chung/.test(l))).toBe(true);
    expect(loi.some((l) => /thẻ c-ra-vao: màn tra trên tuyến chính của Vụ 1 phải có dòng "- Gợi ý:/.test(l))).toBe(true);
    expect(loi.every((l) => /c-ra-vao/.test(l))).toBe(true);
  });

  it('bậc 1 lộ đáp án: tên cột, chữ trên màn tra, động từ thao tác', () => {
    expect(loiSau(dat('c-ra-vao', 'Gợi ý', '**ha-vy** (thinking): Xem cột ma_sv đi. <br> **ha-vy** (neutral): Bấm CHẠY.')).join('\n')).toMatch(/bậc 1: lộ đáp án, có tên cột "ma_sv"/);
    expect(loiSau(dat('c-ra-vao', 'Gợi ý', '**ha-vy** (thinking): Nhìn hàng LẤY CỘT xem. <br> **ha-vy** (neutral): Bấm CHẠY.')).join('\n')).toMatch(/bậc 1: lộ đáp án, có chữ trên màn tra "LẤY CỘT"/);
    expect(loiSau(dat('c-ra-vao', 'Gợi ý', '**ha-vy** (thinking): Bấm vào tờ giấy đi. <br> **ha-vy** (neutral): Bấm CHẠY.')).join('\n')).toMatch(/bậc 1: nói thao tác \("Bấm"\)/);
  });

  it('bậc nào cũng không nói từ của câu lệnh, không gạch dài, không mũi tên; bậc 2 không lặp bậc 1', () => {
    expect(loiSau(dat('c-ra-vao', 'Gợi ý', '**ha-vy** (thinking): Lớp nào khớp cả hai? <br> **ha-vy** (neutral): Thêm WHERE rồi chạy.')).join('\n')).toMatch(/bậc 2: có từ của câu lệnh "WHERE"/);
    expect(loiSau(dat('c-ra-vao', 'Gợi ý', '**ha-vy** (thinking): Lớp nào khớp cả hai? <br> **ha-vy** (neutral): Đổi HOẶC → VÀ.')).join('\n')).toMatch(/bậc 2: có gạch dài hoặc mũi tên/);
    expect(loiSau(dat('c-ra-vao', 'Gợi ý', '**ha-vy** (thinking): Lớp nào khớp cả hai? <br> **ha-vy** (neutral): Lớp nào khớp cả hai?')).join('\n')).toMatch(/bậc 2 phải nói rõ hơn bậc 1/);
  });

  it('người gợi ý phải là nhân vật có thật, biểu cảm có trong thẻ nhân vật', () => {
    expect(loiSau(dat('c-ra-vao', 'Gợi ý', '**narrator**: Lớp nào khớp? <br> **ha-vy** (neutral): Để chữ nối là VÀ.')).join('\n')).toMatch(/bậc 1: người gợi ý phải là một nhân vật đi cùng/);
    expect(loiSau(dat('c-ra-vao', 'Gợi ý', '**ong-ba** (neutral): Lớp nào khớp? <br> **ha-vy** (neutral): Để chữ nối là VÀ.')).join('\n')).toMatch(/bậc 1: người nói lạ "ong-ba"/);
    expect(loiSau(dat('c-ra-vao', 'Gợi ý', '**ha-vy** (nhay-mua): Lớp nào khớp? <br> **ha-vy** (neutral): Để chữ nối là VÀ.')).join('\n')).toMatch(/không có biểu cảm "nhay-mua"/);
  });
});

describe('luật chữ trên giấy', () => {
  it('mỗi tờ một câu; câu chứa đúng một cụm **giá trị**', () => {
    expect(loiChuTrenGiay('Chữ ký trên thư bắt đầu bằng chữ **H**', ['H'], false)).toEqual([]);
    expect(loiChuTrenGiay('Thẻ lịch của khoa **Báo chí** · Thẻ lịch của khóa **K24**', ['Báo chí', 'K24'], false)).toEqual([]);
    expect(loiChuTrenGiay('Mã của Hiếu và Hoài: **SV240228, SV240317**', ['SV240228', 'SV240317'], true)).toEqual([]);
    expect(loiChuTrenGiay(undefined, ['H'], false)).toEqual([]);
    expect(loiChuTrenGiay('Thẻ lịch của khoa **Báo chí**', ['Báo chí', 'K24'], false)[0]).toMatch(/có 1 câu nhưng cần 2/);
    expect(loiChuTrenGiay('Chữ ký bắt đầu bằng chữ H', ['H'], false)[0]).toMatch(/đúng một cụm \*\*…\*\*/);
    expect(loiChuTrenGiay('Chữ ký bắt đầu bằng chữ **K**', ['H'], false)[0]).toMatch(/phải đúng bằng giá trị "H"/);
    expect(loiChuTrenGiay('Hai lớp: **BC24A** và **BC23A**', ['BC24A', 'BC23A'], true)[0]).toMatch(/đúng một cụm/);
    expect(loiChuTrenGiay('Chữ **H**', [], false)[0]).toMatch(/không có "Giá trị cho trình dựng"/);
  });

  it(`dài quá ${TOI_DA_CHU_TREN_GIAY} ký tự, chỉ có giá trị, có gạch dài hay mũi tên → lỗi`, () => {
    const dai = `${'Chữ ký trên thư gửi hộp kiến nghị ở sảnh tòa B bắt đầu bằng chữ'} **H**`;
    expect([...dai.replace(/\*\*/g, '')].length).toBeGreaterThan(TOI_DA_CHU_TREN_GIAY);
    expect(loiChuTrenGiay(dai, ['H'], false)[0]).toMatch(/tối đa 60/);
    expect(loiChuTrenGiay('**H**', ['H'], false)[0]).toMatch(/chỉ có giá trị/);
    expect(loiChuTrenGiay('Chữ ký — chữ **H**', ['H'], false)[0]).toMatch(/gạch dài hoặc mũi tên/);
  });

  it('giấy nhớ và phiếu của Vụ 1 bắt buộc có chữ; phiếu tách tờ cần từ hai giá trị', () => {
    const thieu = loiSau((m) => {
      delete hoSo(m, 'clue-loi-chu-cuong').fields['Chữ trên giấy'];
      delete the(m, 'c-ra-vao').evidence!.chuTrenGiay;
    });
    expect(thieu.some((l) => /ho-so\/01-giay-nho\.md:\d+: thẻ hồ sơ clue-loi-chu-cuong: giấy nhớ dùng ở màn tra của Vụ 1 phải có dòng "- Chữ trên giấy/.test(l))).toBe(true);
    expect(thieu.some((l) => /thu-thach\/c-ra-vao\.md:\d+: vật chứng ev-ra-cong-644 của thẻ c-ra-vao: phiếu dùng làm giấy nhớ ở màn tra của Vụ 1/.test(l))).toBe(true);
    expect(thieu).toHaveLength(2);
    const tach = loiSau((m) => {
      const ev = the(m, 'c-ra-vao').evidence!;
      ev.tachGiay = true;
    });
    expect(tach.join('\n')).toMatch(/"Giấy nhớ: mỗi giá trị một tờ" cần ít nhất hai giá trị/);
  });
});
