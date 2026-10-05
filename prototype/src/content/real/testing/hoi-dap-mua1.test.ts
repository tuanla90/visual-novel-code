// @vitest-environment node
/**
 * Bộ đọc + máy kiểm tờ dữ kiện hỏi nhân chứng (gói B12, tools/noi-dung/hoi-dap-mua1.ts): mỗi luật ở mục "Luật máy kiểm" của
 * docs/mua-1/brief/b12-vu-1.md có một ví dụ sai; tờ bác Thịnh thật không lỗi; lời trong tờ đi qua máy kiểm giọng.
 */
import { mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterAll, describe, expect, it } from 'vitest';
import type { RawMvp } from '../../../../tools/noi-dung/doc-mvp.ts';
import { tepLoiTuTo } from '../../../../tools/noi-dung/hoi-dap-loi.ts';
import { chuanHoaTo, docHoiDap, kiemChung, kiemCheoTo, kiemTo, type ToHoiDap } from '../../../../tools/noi-dung/hoi-dap-mua1.ts';
import { docLuatGiong, kiemGiong } from '../../../../tools/noi-dung/kiem-giong.ts';
import { THU_MUC_NOI_DUNG_MUA_1, vanBanMua1 } from '../../../../tools/noi-dung/sinh-mua1.ts';
import { docThuMucMvp, gomTepMvp } from '../../../../tools/noi-dung/thu-muc-mvp.ts';

const RAW = readFileSync(join(THU_MUC_NOI_DUNG_MUA_1, 'hoi-dap/n1-bac-thinh.json'), 'utf8');
const CHUNG = JSON.parse(readFileSync(join(THU_MUC_NOI_DUNG_MUA_1, 'hoi-dap/chung.json'), 'utf8')) as Record<string, string[]>;
const goc = (): ToHoiDap => chuanHoaTo(JSON.parse(RAW) as Record<string, unknown>);
const sua = (f: (t: ToHoiDap) => void): ToHoiDap => {
  const t = goc();
  f(t);
  return t;
};
const dk = (t: ToHoiDap, ma: string) => t.duKien.find((d) => d.ma === ma)!;
const bao = (t: ToHoiDap): string[] => kiemTo(t).map((l) => l.thongBao);

describe('tờ bác Thịnh thật', () => {
  const kq = docThuMucMvp(THU_MUC_NOI_DUNG_MUA_1);

  it('bộ đọc nhận dòng [HỎI ĐÁP] trong khung; thư mục hoi-dap/ không bị báo "tệp nằm ngoài"', () => {
    const c = kq.mvp.chuoi.find((x) => x.id === 'n1-bac-thinh')!;
    expect(c.items[0]).toEqual({ kind: 'hoi-dap', ma: 'n1-bac-thinh' });
    expect(c.items[1]?.kind).toBe('line');
    expect(gomTepMvp(THU_MUC_NOI_DUNG_MUA_1).loi.filter((l) => l.tep.includes('hoi-dap'))).toEqual([]);
  });

  it('không lỗi luật, kiểm chéo hay giọng', () => {
    expect(kiemTo(goc())).toEqual([]);
    expect(kiemChung(CHUNG)).toEqual([]);
    expect(kiemCheoTo(goc(), kq.mvp)).toEqual([]);
    const hd = docHoiDap(THU_MUC_NOI_DUNG_MUA_1, kq.mvp);
    expect(hd.loi).toEqual([]);
    expect(Object.keys(hd.bo!.to)).toEqual(['n1-bac-thinh']);
    expect(hd.bo!.to['n1-bac-thinh']!.chuDeKhongBiet.map((k) => k.ma)).toEqual(expect.arrayContaining(['camera', 'khoa-hop', 'phong-bi', 'cua-sau', 'lao-cong']));
    expect(hd.bo!.to['n1-bac-thinh']!.danhSach.find((d) => d.moManhMoi)?.moManhMoi).toBe('clue-toa-b');
  });

  it('tệp sinh: hoi-dap.gen.ts + kịch bản gắn hoiDap; không có tờ thì sinh như cũ', () => {
    const d = { tenGame: 'x' } as unknown as Parameters<typeof vanBanMua1>[0];
    const co = vanBanMua1(d, { chung: CHUNG as never, to: { 'n1-bac-thinh': goc() } });
    expect(Object.keys(co)).toEqual(['kich-ban.gen.ts', 'hoi-dap.gen.ts']);
    expect(co['kich-ban.gen.ts']).toContain("import { HOI_DAP_MUA_1 } from './hoi-dap.gen';");
    expect(co['hoi-dap.gen.ts']).toContain('satisfies BoHoiDapMvp');
    const khong = vanBanMua1(d);
    expect(Object.keys(khong)).toEqual(['kich-ban.gen.ts']);
    expect(khong['kich-ban.gen.ts']).not.toContain('hoiDap');
  });
});

describe('luật máy kiểm (mỗi luật một ví dụ sai)', () => {
  it('biến thể thiếu chữ bắt buộc', () => {
    expect(bao(sua((t) => (dk(t, 'mo-hop').bienThe.ke = 'Cái hộp ấy à? Bác với cô cùng mở.')))).toContainEqual(expect.stringContaining('mo-hop/ke: thiếu chữ bắt buộc "chín giờ sáng thứ hai"'));
  });
  it('mốc giờ ngoài chữ bắt buộc', () => {
    expect(bao(sua((t) => (dk(t, 'mo-cua').bienThe.lai = 'Bảy giờ sáng thứ Hai, tám giờ tối bác về.')))).toContainEqual(expect.stringContaining('mo-cua/lai: có mốc giờ lạ "tám giờ tối"'));
  });
  it('thiếu biến thể "thang" hoặc "lai"', () => {
    expect(bao(sua((t) => (dk(t, 'mo-cua').bienThe.lai = '')))).toContainEqual(expect.stringContaining('phải có biến thể "thang" và "lai"'));
  });
  it('ít hơn 6 câu hỏi mẫu', () => {
    expect(bao(sua((t) => (dk(t, 'mo-cua').cauHoiMau = dk(t, 'mo-cua').cauHoiMau.slice(0, 5))))).toContainEqual(expect.stringContaining('mo-cua: cần ít nhất 6 câu hỏi mẫu'));
  });
  it('biến thể "co-khong" mở bằng Có / Không / Ừ / Vâng', () => {
    for (const mo of ['Không cháu ạ.', 'Có, bác thấy.', 'Ừ thì', 'Vâng.']) {
      expect(bao(sua((t) => (dk(t, 'ai-bo').bienThe['co-khong'] = `${mo} Đông thế bác nhớ sao nổi.`)))).toContainEqual(expect.stringContaining('ai-bo/co-khong: không mở bằng'));
    }
  });
  it('dữ kiện trong danh sách thiếu gợi ý hai bậc', () => {
    expect(bao(sua((t) => (dk(t, 'mo-cua').goiY = null)))).toContainEqual(expect.stringContaining('mo-cua: nằm trong danh sách nhưng thiếu gợi ý hai bậc'));
  });
  it('gợi ý bậc 1 lộ chữ bắt buộc', () => {
    expect(bao(sua((t) => (dk(t, 'mo-hop').goiY!.bac1 = 'Hỏi xem cô Lan mở hộp lúc nào.')))).toContainEqual(expect.stringContaining('mo-hop: gợi ý bậc 1 lộ chữ bắt buộc'));
  });
  it('gợi ý có thuật ngữ SQL', () => {
    expect(bao(sua((t) => (dk(t, 'mo-hop').goiY!.bac2 = 'Dùng WHERE lọc giờ mở hộp đi.')))).toContainEqual(expect.stringContaining('gợi ý có thuật ngữ SQL "WHERE"'));
  });
  it('tuDongDuKien không phủ dữ kiện trong danh sách', () => {
    expect(bao(sua((t) => (t.tuDongDuKien = t.tuDongDuKien.filter((c) => c !== 'ai-bo'))))).toContainEqual(expect.stringContaining('"tuDongDuKien" thiếu "ai-bo"'));
  });
  it('có canCo mà không có tuChoi', () => {
    expect(bao(sua((t) => (dk(t, 'mo-hop').canCo = ['clue-phieu-tra-cuu'])))).toContainEqual(expect.stringContaining('mo-hop: có "canCo" thì phải có "tuChoi"'));
  });
  it('gioiHan.soCau nhỏ hơn số dữ kiện trong danh sách cộng 3', () => {
    const t = sua((x) => (x.gioiHan = { soCau: 7, lyDo: 'ban', baoTruoc: { con: 2, loi: 'Bác sắp phải đi rồi.' }, het: 'Thôi bác đi đây.' }));
    expect(bao(t)).toContainEqual(expect.stringContaining('"gioiHan.soCau" = 7 nhỏ hơn số dữ kiện trong danh sách cộng 3 (8)'));
    t.gioiHan!.soCau = 8;
    expect(bao(t)).toEqual([]);
  });
  it('thiếu lời cho một ý định chung', () => {
    expect(bao(sua((t) => (t.lopKhac['pha-game'] = { loi: [], cauHoiMau: [] })))).toContainEqual(expect.stringContaining('lopKhac.pha-game: thiếu lời'));
  });
  it('chung.json: mỗi ý định 6–10 câu', () => {
    expect(kiemChung({ ...CHUNG, chao: ['chào'] }).map((l) => l.thongBao)).toContainEqual(expect.stringContaining('ý định "chao": cần 6–10 câu mẫu (đang có 1)'));
  });
});

describe('kiểm chéo với kịch bản', () => {
  const mvp = (loiDoan: string[], kieu = 'hoi-dap'): RawMvp =>
    ({
      nhanVat: ['bac-tu', 'ha-vy', 'tung'].map((id) => ({ id })),
      dossier: [{ id: 'clue-toa-b' }],
      chuoi: [{ id: 'n1-bac-thinh', items: [{ kind: kieu, ma: 'n1-bac-thinh' }, ...loiDoan.map((text) => ({ kind: 'line', line: { speaker: 'bac-tu', expression: null, text } }))], itemDong: [], viTri: { tep: 'k.md', dong: 1 } }],
    }) as unknown as RawMvp;
  const doanThat = (): string[] => docThuMucMvp(THU_MUC_NOI_DUNG_MUA_1).mvp.chuoi.find((c) => c.id === 'n1-bac-thinh')!.items.flatMap((it) => (it.kind === 'line' ? [it.line.text] : []));

  it('không có chuỗi với dòng [HỎI ĐÁP] cùng mã', () => {
    expect(kiemCheoTo(goc(), mvp(['x'], 'note')).map((l) => l.thongBao)).toContainEqual(expect.stringContaining('không có chuỗi "n1-bac-thinh" với dòng "- [HỎI ĐÁP n1-bac-thinh]"'));
  });
  it('đoạn [LỜI] viết sẵn không nói chữ bắt buộc của dữ kiện trong tuDongDuKien', () => {
    const doan = doanThat().map((l) => l.replace('Bảy giờ sáng thứ Hai', 'Sáng thứ Hai'));
    expect(kiemCheoTo(goc(), mvp(doan)).map((l) => l.thongBao)).toContainEqual(expect.stringContaining('"tuDongDuKien" có "mo-cua" nhưng đoạn [LỜI] của chuỗi không nói "bảy giờ sáng thứ Hai"'));
  });
  it('manh mối của danh sách không có trong hồ sơ', () => {
    const t = sua((x) => (x.danhSach[3]!.moManhMoi = 'clue-khong-co'));
    expect(kiemCheoTo(t, mvp(doanThat())).map((l) => l.thongBao)).toContainEqual(expect.stringContaining('"moManhMoi" "clue-khong-co" không phải giấy nhớ'));
  });
});

describe('lời trong tờ đi qua máy kiểm giọng', () => {
  const luat = docLuatGiong(readFileSync(join(THU_MUC_NOI_DUNG_MUA_1, 'giong/luat-giong.md'), 'utf8'));
  const giong = (to: Record<string, unknown>): string[] => {
    const raw = JSON.stringify(to, null, 2);
    const tep = tepLoiTuTo(to, raw, '01-ngay-1', 'x/hoi-dap/n1-bac-thinh.json');
    return kiemGiong(luat, [tep]).loi.filter((l) => l.startsWith('x/hoi-dap/'));
  };
  const toThat = (): Record<string, unknown> => JSON.parse(RAW) as Record<string, unknown>;

  it('tờ thật không lỗi giọng', () => {
    expect(giong(toThat())).toEqual([]);
  });
  it('xưng hô theo nhân vật nói, giọng miền Nam, gạch dài', () => {
    const t = toThat() as { lopKhac: Record<string, { loi: string[] }>; roiDi: { giuLai: { loi: string } } };
    t.lopKhac['ngoai-le']!.loi = ['Tôi đang trực, cháu ạ.', 'Ủa, cháu hỏi gì nè?', 'Chuyện đó — bác chịu.'];
    t.roiDi.giuLai.loi = 'Khoan, tôi tính lại đã.';
    const l = giong(t);
    expect(l).toContainEqual(expect.stringContaining('[xưng hô] bac-tu nói "tôi"'));
    expect(l).toContainEqual(expect.stringContaining('[giọng AI] bac-tu "Ủa"'));
    expect(l).toContainEqual(expect.stringContaining('[giọng AI] bac-tu "—"'));
    expect(l).toContainEqual(expect.stringContaining('[xưng hô] ha-vy nói "tôi"'));
  });
});

describe('lỗi về đúng tệp và dòng JSON (npm run kiem-noi-dung:mua1)', () => {
  const tam = mkdtempSync(join(tmpdir(), 'hoi-dap-'));
  afterAll(() => rmSync(tam, { recursive: true, force: true }));

  it('tờ hỏng → lỗi `<tệp>:<dòng>:` trỏ vào dòng có lỗi; chuỗi có [HỎI ĐÁP] mà thiếu tờ cũng báo', () => {
    mkdirSync(join(tam, 'hoi-dap'));
    writeFileSync(join(tam, 'hoi-dap/chung.json'), JSON.stringify(CHUNG));
    const hong = RAW.replace('"co-khong": "Bác chịu, cháu ạ.', '"co-khong": "Không, cháu ạ.');
    writeFileSync(join(tam, 'hoi-dap/n1-bac-thinh.json'), hong);
    const mvp = docThuMucMvp(THU_MUC_NOI_DUNG_MUA_1).mvp;
    const kq = docHoiDap(tam, mvp, { giong: false });
    const dong = hong.split('\n').findIndex((x) => x.includes('"co-khong": "Không, cháu ạ.')) + 1;
    expect(kq.loi).toEqual([expect.stringMatching(new RegExp(`^noi-dung-mua-1/hoi-dap/n1-bac-thinh\\.json:${dong}: ai-bo/co-khong: không mở bằng`))]);
    rmSync(join(tam, 'hoi-dap/n1-bac-thinh.json'));
    expect(docHoiDap(tam, mvp, { giong: false }).loi).toContainEqual(expect.stringContaining('[HỎI ĐÁP n1-bac-thinh]: thiếu tờ noi-dung-mua-1/hoi-dap/n1-bac-thinh.json'));
  });
});

describe('bổ sung 05/10 tối: đoạn lời rải nhiều chỗ, trường lạ, canCo nhiều loại mã', () => {
  const mvpTach = (items: unknown[]): RawMvp =>
    ({
      nhanVat: ['bac-tu', 'ha-vy', 'tung'].map((id) => ({ id })),
      dossier: [{ id: 'clue-toa-b' }, { id: 'ev-the-lich' }],
      chuoi: [{ id: 'n1-bac-thinh', items, itemDong: [], viTri: { tep: 'k.md', dong: 1 } }],
    }) as unknown as RawMvp;
  const line = (text: string) => ({ kind: 'line', line: { speaker: 'bac-tu', expression: null, text } });
  const doan = (): string[] => docThuMucMvp(THU_MUC_NOI_DUNG_MUA_1).mvp.chuoi.find((c) => c.id === 'n1-bac-thinh')!.items.flatMap((it) => (it.kind === 'line' ? [it.line.text] : []));

  it('chữ bắt buộc nằm rải qua nhiều đoạn [LỜI] bị ngắt bởi mục khác: vẫn đủ', () => {
    const d = doan();
    const items = [{ kind: 'hoi-dap', ma: 'n1-bac-thinh' }, ...d.slice(0, 2).map(line), { kind: 'image', id: 'x', chuThich: null, moTa: null }, ...d.slice(2, 4).map(line), { kind: 'consequence', hauQua: [] }, ...d.slice(4).map(line)];
    expect(kiemCheoTo(goc(), mvpTach(items))).toEqual([]);
    const thieu = items.filter((it) => !(typeof it === 'object' && it && 'line' in it && (it as { line: { text: string } }).line.text.includes('Bảy giờ')));
    expect(kiemCheoTo(goc(), mvpTach(thieu)).map((l) => l.thongBao)).toContainEqual(expect.stringContaining('không nói "bảy giờ sáng thứ Hai"'));
  });

  it('trường ngoài định dạng (nguon, ten, ngay, canh, ghiChu) bị bỏ qua, không báo lỗi', () => {
    const j = JSON.parse(RAW) as Record<string, unknown> & { duKien: Record<string, unknown>[] };
    Object.assign(j, { ten: 'Hỏi bác', ngay: 'Thứ Ba', canh: 'sanh-toa-b', ghiChu: 'nháp' });
    j.duKien.forEach((d) => (d.nguon = 'loi/01-ngay-1.md'));
    const t = chuanHoaTo(j);
    expect(kiemTo(t)).toEqual([]);
    expect(Object.keys(t)).not.toContain('ghiChu');
    expect(Object.keys(t.duKien[0]!)).not.toContain('nguon');
  });

  it('canCo nhận mã manh mối, mã bằng chứng và mã dữ kiện cùng tờ; mã thẻ không có thì báo', () => {
    const t = sua((x) => {
      dk(x, 'mo-cua').canCo = ['clue-toa-b', 'ev-the-lich', 'mo-hop'];
      dk(x, 'mo-cua').tuChoi = ['Cháu hỏi chuyện cái hộp trước đã.'];
    });
    const items = [{ kind: 'hoi-dap', ma: 'n1-bac-thinh' }, ...doan().map(line)];
    expect(kiemTo(t)).toEqual([]);
    expect(kiemCheoTo(t, mvpTach(items))).toEqual([]);
    dk(t, 'mo-cua').canCo = ['ev-khong-co'];
    expect(kiemCheoTo(t, mvpTach(items)).map((l) => l.thongBao)).toContainEqual(expect.stringContaining('"canCo" trỏ tới thẻ không có trong ho-so/ "ev-khong-co"'));
  });
});
