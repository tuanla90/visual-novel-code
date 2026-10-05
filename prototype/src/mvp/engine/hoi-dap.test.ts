/**
 * Hỏi nhân chứng (gói B12): luật chơi của buổi hỏi trên tờ bác Thịnh thật (`noi-dung-mua-1/hoi-dap/n1-bac-thinh.json`, đã sinh vào
 * `KICH_BAN_MUA_1`) và trên bản sửa của tờ ấy (giới hạn số câu, từ chối theo `canCo`). Đặc tả: tools/thu-hoi-dap/thu-hoi-dap.html.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MUA_1 } from '../../content/generated/mua-1/kich-ban.gen';
import type { KichBanMvp, ToHoiDapMvp } from '../../content/mvp/types';
import { canLamRo, giayNhoHoiDap, tienDoCua } from './hoi-dap';
import { khungNhin, taoTrangThai, xuLy, type HanhDongMvp, type KhungNhinMvp } from './may';
import type { CachChoiMvp, TrangThaiMvp } from './trang-thai';
import { choiTuDong } from './tu-choi';
import { chuanHoa, kieuHoi } from './xep-cau-hoi';

const KB = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const TO = KB.hoiDap!.to['n1-bac-thinh']!;
const BT = (ma: string): ToHoiDapMvp['duKien'][number] => TO.duKien.find((d) => d.ma === ma)!;

/** Đứng ở cảnh khám phá sảnh tòa B (ngày 1). */
function vaoSanh(kb: KichBanMvp = KB, cach?: CachChoiMvp): TrangThaiMvp {
  const s0 = taoTrangThai(kb, 1);
  const c = kb.chuoi.find((x) => x.id === 'n1-toa-b')!;
  const i = c.nodes.findIndex((n) => n.type === 'explore');
  const s = { ...s0, giaiDoan: 'ngay' as const, ngay: 1, conTro: { chuoi: 'n1-toa-b', nut: i, boiCanh: 'truyen' as const }, ...(cach ? { cachChoi: cach } : {}) };
  return xuLy(kb, s, { type: 'sua-con-tro' });
}

const lam = (kb: KichBanMvp, s: TrangThaiMvp, ...hd: HanhDongMvp[]): TrangThaiMvp => hd.reduce((x, h) => xuLy(kb, x, h), s);
const hoi = (cau: string, lop?: string): HanhDongMvp => (lop ? { type: 'hoi-dap-hoi', cau, lop } : { type: 'hoi-dap-hoi', cau });
const hd = (kn: KhungNhinMvp) => {
  if (kn.kind !== 'hoi-dap') throw new Error(`khung nhìn là ${kn.kind}, không phải hoi-dap`);
  return kn.hoiDap;
};
const loiCuoi = (s: TrangThaiMvp, kb: KichBanMvp = KB): string => hd(khungNhin(kb, s)).nhatKy.at(-1)?.chu ?? '';
const vaoBacThinh = (kb: KichBanMvp = KB, cach?: CachChoiMvp): TrangThaiMvp => xuLy(kb, vaoSanh(kb, cach), { type: 'xem-diem', chuoi: 'n1-bac-thinh' });

describe('máy so chữ', () => {
  it('chuẩn hóa: bỏ dấu, mở viết tắt kiểu chat, "7h" thành "7 gio"', () => {
    expect(chuanHoa('Mấy h bác mở cửa?')).toBe('may gio bac mo cua');
    expect(chuanHoa('bac co thay ai bo thu ko')).toBe('bac co thay ai bo thu khong');
    expect(chuanHoa('7h sáng T2')).toBe('7 gio sang thu hai');
  });
  it('kiểu câu hỏi: thẳng, có-không, kể', () => {
    expect(kieuHoi('ai mở hộp')).toBe('thang');
    expect(kieuHoi('bác có mở cái hộp này không')).toBe('co-khong');
    expect(kieuHoi('bác kể cháu nghe cái hộp thế nào')).toBe('ke');
  });
});

describe('cách "xem cả đoạn": chạy như trước gói B12', () => {
  it('đoạn [LỜI] rồi hậu quả mở manh mối, ghi nhận tuDongDuKien', () => {
    let s = vaoBacThinh(KB, 'tu-dong');
    const kn = khungNhin(KB, s);
    expect(kn.kind).toBe('line');
    expect(kn.kind === 'line' && kn.loi.speaker).toBe('bac-tu');
    expect(tienDoCua(s, 'n1-bac-thinh').biet).toEqual(TO.tuDongDuKien);
    for (let i = 0; i < 10 && khungNhin(KB, s).kind === 'line'; i++) s = xuLy(KB, s, { type: 'tiep' });
    expect(khungNhin(KB, s).kind).toBe('explore');
    expect(s.hoSo.manhMoi).toContain('clue-toa-b');
    expect(s.khamPha?.daXem).toContain('n1-bac-thinh');
  });
});

describe('buổi hỏi (cách gõ, mặc định)', () => {
  it('mặc định là gõ: mở buổi hỏi với lời dẫn mở đầu', () => {
    const s = vaoBacThinh();
    const h = hd(khungNhin(KB, s));
    expect(h.cachChoi).toBe('go');
    expect(h.nhatKy).toEqual([{ ai: 'narrator', chu: TO.moDau }]);
    expect(h.danhSach.every((d) => !d.xong)).toBe(true);
  });

  it('chọn biến thể theo kiểu câu hỏi; hỏi lại thì lời "lai"; hỏi ra thành giấy nhớ', () => {
    let s = lam(KB, vaoBacThinh(), hoi('bác có mở cái hộp này không'));
    expect(loiCuoi(s)).toBe(BT('mo-hop').bienThe['co-khong']);
    expect(tienDoCua(s, 'n1-bac-thinh').biet).toEqual(['mo-hop']);
    expect(giayNhoHoiDap(KB, s).map((g) => g.chu)).toEqual([BT('mo-hop').giayNho]);
    s = lam(KB, s, hoi('ai mở hộp kiến nghị vậy'));
    expect(loiCuoi(s)).toBe(BT('mo-hop').bienThe.lai);
    s = lam(KB, s, hoi('mấy h bác mở cửa tòa B'));
    expect(loiCuoi(s)).toBe(BT('mo-cua').bienThe.thang);
  });

  it('câu hỏi mở: tự kể theo thứ tự, rồi nhắc mới nhớ, rồi hết chuyện kể', () => {
    let s = vaoBacThinh();
    const ke: string[] = [];
    for (let i = 0; i < 4; i++) {
      s = lam(KB, s, hoi('bác còn nhớ gì nữa không'));
      ke.push(loiCuoi(s));
    }
    expect(ke).toEqual([BT('mo-hop').bienThe['tu-ke'], BT('ai-bo').bienThe['tu-ke'], BT('thu-tren-cung').bienThe.nho, TO.lopKhac['hoi-mo'].hetKe[0]]);
    expect(tienDoCua(s, 'n1-bac-thinh').biet).toEqual(['mo-hop', 'ai-bo', 'thu-tren-cung']);
  });

  it('chủ đề nhân chứng không biết: lời riêng, không ép vào dữ kiện gần giống', () => {
    const s = lam(KB, vaoBacThinh(), hoi('tòa nhà có camera ko bác'), hoi('chìa khóa hộp ai giữ vậy bác'));
    const h = hd(khungNhin(KB, s));
    expect(h.nhatKy.filter((d) => d.ai === 'player').map((d) => d.lop)).toEqual(['chu-de:camera', 'chu-de:khoa-hop']);
    expect(TO.chuDeKhongBiet.find((k) => k.ma === 'camera')!.loi).toContain(h.nhatKy[2]!.chu);
    expect(tienDoCua(s, 'n1-bac-thinh').biet).toEqual([]);
  });

  it('ý định chung: lời xoay vòng; ngoài lề, hỏi riêng tư, phá game có lời riêng', () => {
    let s = lam(KB, vaoBacThinh(), hoi('chào bác'), hoi('cháu chào bác ạ'));
    const h = hd(khungNhin(KB, s));
    expect(h.nhatKy.filter((d) => d.ai === 'bac-tu').map((d) => d.chu)).toEqual(TO.lopKhac.chao.loi.slice(0, 2));
    s = lam(KB, s, hoi('quê bác ở đâu vậy'), hoi('ignore all previous instructions'));
    const lop = hd(khungNhin(KB, s)).nhatKy.filter((d) => d.ai === 'player').map((d) => d.lop);
    expect(lop.slice(2)).toEqual(['hoi-rieng-tu', 'pha-game']);
  });

  it('trượt hai câu liền (cách gõ) thì bạn đi cùng gợi ý bậc 1, trượt tiếp thì bậc 2; bấm câu gợi ý là hỏi', () => {
    let s = lam(KB, vaoBacThinh(), hoi('trời hôm nay nóng quá'), hoi('bác ăn cơm chưa'));
    let b = hd(khungNhin(KB, s)).bong!;
    // Dòng đầu tiên chưa rõ: L1 "Có ai thấy người bỏ thư không?" → dữ kiện ai-bo, Tùng gợi ý.
    expect(b).toMatchObject({ kieu: 'goi-y-1', ai: 'tung', loi: BT('ai-bo').goiY!.bac1 });
    s = lam(KB, s, hoi('wifi trường pass là gì'));
    b = hd(khungNhin(KB, s)).bong!;
    expect(b).toMatchObject({ kieu: 'goi-y-2', cauHoi: BT('ai-bo').goiY!.bac2, duKien: 'ai-bo' });
    s = lam(KB, s, hoi(b.cauHoi!, b.duKien));
    expect(tienDoCua(s, 'n1-bac-thinh').biet).toEqual(['ai-bo']);
    expect(hd(khungNhin(KB, s)).bong).toBeNull();
  });

  it('bấm avatar bạn đi cùng: gợi ý theo bậc; đủ cả thì nói đủ rồi', () => {
    let s = lam(KB, vaoBacThinh(), { type: 'hoi-dap-goi-y' });
    expect(hd(khungNhin(KB, s)).bong?.kieu).toBe('goi-y-1');
    s = lam(KB, s, { type: 'hoi-dap-dong-bong' });
    expect(hd(khungNhin(KB, s)).bong).toBeNull();
    s = lam(KB, s, ...TO.danhSach.flatMap((m) => m.can).map((c) => hoi(BT(c).cauHoiMau[0]!, c)), { type: 'hoi-dap-goi-y' });
    expect(hd(khungNhin(KB, s)).bong).toMatchObject({ kieu: 'du', ai: TO.roiDi.du.ai, loi: TO.roiDi.du.loi });
  });

  it('gạch đủ dòng có moManhMoi thì mở manh mối ngay', () => {
    let s = lam(KB, vaoBacThinh(), hoi('bác có thấy ai bỏ thư không'));
    expect(s.hoSo.manhMoi).not.toContain('clue-toa-b');
    s = lam(KB, s, hoi('sáng thứ Hai có những ai vào tòa B'));
    expect(hd(khungNhin(KB, s)).danhSach.find((d) => d.ma === 'L4')?.xong).toBe(true);
    expect(s.hoSo.manhMoi).toContain('clue-toa-b');
  });

  it('dòng cần hai dữ kiện: hỏi một thì mới rõ một phần', () => {
    const s = lam(KB, vaoBacThinh(), hoi('bác khóa cửa tòa B lúc mấy giờ'));
    expect(hd(khungNhin(KB, s)).danhSach.find((d) => d.ma === 'L3')).toMatchObject({ xong: false, motPhan: true });
  });
});

describe('rời đi', () => {
  it('còn dòng chưa gạch: giữ lại đúng một lần; vẫn đi thì đi, chỗ bấm coi như chưa xem, quay lại vẫn nhớ điều đã hỏi', () => {
    let s = lam(KB, vaoBacThinh(), hoi('ai mở hộp'), { type: 'hoi-dap-roi-di' });
    let h = hd(khungNhin(KB, s));
    expect(h.daRoi).toBe(false);
    expect(h.bong).toMatchObject({ kieu: 'giu-lai', ai: TO.roiDi.giuLai.ai, dongThieu: TO.danhSach[0]!.cau });
    s = lam(KB, s, { type: 'hoi-dap-roi-di' });
    h = hd(khungNhin(KB, s));
    expect(h.daRoi).toBe(true);
    expect(h.nhatKy.slice(-2).map((d) => d.chu)).toEqual([TO.roiDi.loiBan, TO.lopKhac['tam-biet'].loi[0]]);
    expect(h.bong?.kieu).toBe('roi-di-thieu');
    s = lam(KB, s, { type: 'tiep' });
    // Lời viết sẵn và hậu quả mở manh mối của chuỗi đã được buổi hỏi thay: về thẳng cảnh khám phá, chưa có manh mối.
    expect(khungNhin(KB, s).kind).toBe('explore');
    expect(s.hoSo.manhMoi).not.toContain('clue-toa-b');
    expect(s.khamPha?.daXem).not.toContain('n1-bac-thinh');
    expect(canLamRo(KB, s)[0]?.dong.map((d) => d.ma)).toEqual(['L1', 'L3', 'L4']);
    s = lam(KB, s, { type: 'xem-diem', chuoi: 'n1-bac-thinh' });
    h = hd(khungNhin(KB, s));
    expect(h.danhSach.find((d) => d.ma === 'L2')?.xong).toBe(true);
    expect(h.nhatKy).toHaveLength(1);
  });

  it('đã gạch đủ: đi luôn, không giữ; chỗ bấm đã xem, manh mối mở qua danh sách', () => {
    let s = lam(KB, vaoBacThinh(), ...TO.danhSach.flatMap((m) => m.can).map((c) => hoi(BT(c).cauHoiMau[0]!, c)), { type: 'hoi-dap-roi-di' });
    expect(hd(khungNhin(KB, s))).toMatchObject({ daRoi: true, bong: { kieu: 'roi-di-du' } });
    s = lam(KB, s, { type: 'tiep' });
    expect(khungNhin(KB, s).kind).toBe('explore');
    expect(s.khamPha?.daXem).toContain('n1-bac-thinh');
    expect(s.hoSo.manhMoi).toContain('clue-toa-b');
  });

  it('gõ lời chào để đi cũng là rời đi', () => {
    const s = lam(KB, vaoBacThinh(), ...TO.danhSach.flatMap((m) => m.can).map((c) => hoi(BT(c).cauHoiMau[0]!, c)), hoi('thôi cháu đi đây ạ'));
    const h = hd(khungNhin(KB, s));
    expect(h.daRoi).toBe(true);
    expect(h.nhatKy.at(-2)).toMatchObject({ ai: 'player', lop: 'tam-biet' });
  });
});

describe('ba cách chơi đổi được giữa buổi', () => {
  it('cách bấm: câu hỏi mở đứng đầu, dữ kiện ẩn chỉ hiện khi đã biết điều liên quan', () => {
    let s = lam(KB, vaoBacThinh(), { type: 'doi-cach-choi', cach: 'bam' });
    let h = hd(khungNhin(KB, s));
    expect(h.cachChoi).toBe('bam');
    expect(h.cauBam[0]).toEqual({ cau: TO.lopKhac['hoi-mo'].cauHoiMau[0], lop: 'hoi-mo' });
    expect(h.cauBam.map((c) => c.lop)).not.toContain('thu-tren-cung');
    expect(h.cauBam.map((c) => c.lop)).not.toContain('lich-truc');
    s = lam(KB, s, hoi(h.cauBam.find((c) => c.lop === 'mo-hop')!.cau, 'mo-hop'));
    h = hd(khungNhin(KB, s));
    expect(h.cauBam[0]).toEqual({ cau: TO.lopKhac['hoi-mo'].hoiTiep, lop: 'hoi-mo' });
    expect(h.cauBam.map((c) => c.lop)).toContain('thu-tren-cung');
  });

  it('sang "xem cả đoạn" khi chưa hỏi ra gì: chạy đoạn viết sẵn; khi đã hỏi dở: kể nốt từng điều', () => {
    const s1 = lam(KB, vaoBacThinh(), { type: 'doi-cach-choi', cach: 'tu-dong' });
    expect(khungNhin(KB, s1).kind).toBe('line');
    let s = lam(KB, vaoBacThinh(), hoi('ai mở hộp'), { type: 'doi-cach-choi', cach: 'tu-dong' });
    expect(hd(khungNhin(KB, s)).conKe).toBe(true);
    for (let i = 0; i < 10 && hd(khungNhin(KB, s)).conKe; i++) s = lam(KB, s, { type: 'hoi-dap-ke-tiep' });
    expect(tienDoCua(s, 'n1-bac-thinh').biet.sort()).toEqual([...TO.tuDongDuKien].sort());
    expect(hd(khungNhin(KB, s)).du).toBe(true);
    expect(s.cachChoi).toBe('tu-dong');
  });

  it('thiết lập cách chơi và buổi hỏi lưu, nạp được', () => {
    const s = lam(KB, vaoBacThinh(), { type: 'doi-cach-choi', cach: 'bam' }, hoi('ai mở hộp', 'mo-hop'));
    const nap = xuLy(KB, JSON.parse(JSON.stringify(s)) as TrangThaiMvp, { type: 'sua-con-tro' });
    expect(nap.cachChoi).toBe('bam');
    expect(khungNhin(KB, nap)).toEqual(khungNhin(KB, s));
  });
});

describe('từ chối theo canCo, giới hạn số câu (tờ sửa)', () => {
  const sua = (f: (t: ToHoiDapMvp) => ToHoiDapMvp): KichBanMvp => ({ ...KB, hoiDap: { ...KB.hoiDap!, to: { ...KB.hoiDap!.to, 'n1-bac-thinh': f(structuredClone(TO)) } } });

  it('chưa có thứ trong canCo thì từ chối, không tính là hỏi ra; có rồi thì nói', () => {
    const kb = sua((t) => ({ ...t, duKien: t.duKien.map((d) => (d.ma === 'mo-hop' ? { ...d, canCo: ['clue-phieu-thu'], tuChoi: ['Chưa có giấy thì bác chưa nói được.', 'Cháu mang giấy tới đã.'] } : d)) }));
    let s = lam(kb, vaoBacThinh(kb), hoi('ai mở hộp'), hoi('ai mở hộp kiến nghị'));
    const h = hd(khungNhin(kb, s));
    expect(h.nhatKy.filter((d) => d.ai === 'bac-tu').map((d) => d.chu)).toEqual(['Chưa có giấy thì bác chưa nói được.', 'Cháu mang giấy tới đã.']);
    expect(tienDoCua(s, 'n1-bac-thinh').biet).toEqual([]);
    // Câu hỏi mở cũng không tự kể dữ kiện bị khóa.
    s = lam(kb, s, hoi('bác còn nhớ gì nữa không'));
    expect(loiCuoi(s, kb)).toBe(BT('ai-bo').bienThe['tu-ke']);
    s = { ...s, hoSo: { ...s.hoSo, manhMoi: [...s.hoSo.manhMoi, 'clue-phieu-thu'] } };
    s = lam(kb, s, hoi('ai mở hộp'));
    expect(loiCuoi(s, kb)).toBe(BT('mo-hop').bienThe.thang);
  });

  it('giới hạn: chào không tính; còn hai lượt thì báo trước; hết lượt thì đóng; làm việc khác thì nạp lại', () => {
    const kb = sua((t) => ({ ...t, gioiHan: { soCau: 8, lyDo: 'ban', baoTruoc: { con: 2, loi: 'Bác sắp phải lên khóa phòng rồi đấy.' }, het: 'Thôi, bác đi khóa phòng đây.' } }));
    let s = lam(kb, vaoBacThinh(kb), hoi('chào bác'));
    expect(hd(khungNhin(kb, s)).conLuot).toBe(8);
    s = lam(kb, s, ...Array.from({ length: 6 }, () => hoi('trời hôm nay nóng quá')));
    expect(loiCuoi(s, kb)).toBe('Bác sắp phải lên khóa phòng rồi đấy.');
    s = lam(kb, s, hoi('ai mở hộp'), hoi('mấy h bác mở cửa tòa B'));
    let h = hd(khungNhin(kb, s));
    expect(h).toMatchObject({ daDong: true, conLuot: 0 });
    expect(h.nhatKy.at(-1)?.chu).toBe('Thôi, bác đi khóa phòng đây.');
    expect(tienDoCua(s, 'n1-bac-thinh').biet).toEqual(['mo-hop', 'mo-cua']);
    // Hết lượt: hỏi nữa không được trả lời, nhưng "xem cả đoạn" vẫn dùng được (không có ngõ cụt).
    expect(lam(kb, s, hoi('ai bỏ thư'))).toBe(s);
    expect(h.conKe).toBe(true);
    // Đi rồi quay lại ngay: vẫn hết lượt.
    s = lam(kb, s, { type: 'hoi-dap-roi-di' }, { type: 'hoi-dap-roi-di' }, { type: 'tiep' }, { type: 'xem-diem', chuoi: 'n1-bac-thinh' });
    h = hd(khungNhin(kb, s));
    expect(h.daDong).toBe(true);
    // Làm việc khác trong cảnh rồi quay lại: lượt nạp lại.
    s = lam(kb, s, { type: 'hoi-dap-roi-di' }, { type: 'hoi-dap-roi-di' }, { type: 'tiep' }, { type: 'xem-diem', chuoi: 'n1-hop' });
    for (let i = 0; i < 10 && khungNhin(kb, s).kind !== 'explore'; i++) s = xuLy(kb, s, { type: 'tiep' });
    s = lam(kb, s, { type: 'xem-diem', chuoi: 'n1-bac-thinh' });
    h = hd(khungNhin(kb, s));
    expect(h).toMatchObject({ daDong: false, conLuot: 8 });
  });
});

describe('máy tự chơi và chuỗi không có tờ', () => {
  it('máy tự chơi (cách gõ) qua được buổi hỏi: nghe kể nốt, chào đi, manh mối mở, rời cảnh sảnh', () => {
    const s = choiTuDong(KB, vaoBacThinh(), {}, (x) => x.conTro?.chuoi !== 'n1-toa-b' && x.conTro?.chuoi !== 'n1-bac-thinh' && x.conTro?.chuoi !== 'n1-hop' && x.conTro?.chuoi !== 'n1-thong-bao-hop', 200);
    expect(s.hoSo.manhMoi).toContain('clue-toa-b');
    expect(tienDoCua(s, 'n1-bac-thinh').biet.sort()).toEqual([...TO.tuDongDuKien].sort());
  });

  it('dòng [HỎI ĐÁP] mà kịch bản không có tờ: chạy qua như dòng thường', () => {
    const kb: KichBanMvp = { ...KB, hoiDap: { ...KB.hoiDap!, to: {} } };
    const s = vaoBacThinh(kb);
    const kn = khungNhin(kb, s);
    expect(kn.kind === 'line' && kn.loi.speaker).toBe('bac-tu');
  });
});

describe('canCo là mã dữ kiện cùng tờ hay mã bằng chứng', () => {
  it('chưa hỏi ra dữ kiện cần trước thì từ chối; hỏi ra rồi thì nói', () => {
    const t = structuredClone(TO);
    t.duKien = t.duKien.map((d) => (d.ma === 'mo-cua' ? { ...d, canCo: ['mo-hop', 'ev-the-lich'], tuChoi: ['Cháu hỏi chuyện cái hộp trước đã.'] } : d));
    const kb: KichBanMvp = { ...KB, hoiDap: { ...KB.hoiDap!, to: { ...KB.hoiDap!.to, 'n1-bac-thinh': t } } };
    let s = lam(kb, vaoBacThinh(kb), hoi('mấy h bác mở cửa tòa B'));
    expect(loiCuoi(s, kb)).toBe('Cháu hỏi chuyện cái hộp trước đã.');
    s = { ...s, hoSo: { ...s.hoSo, bangChung: [...s.hoSo.bangChung, 'ev-the-lich'] } };
    s = lam(kb, s, hoi('ai mở hộp'), hoi('mấy h bác mở cửa tòa B'));
    expect(loiCuoi(s, kb)).toBe(BT('mo-cua').bienThe.thang);
  });
});
