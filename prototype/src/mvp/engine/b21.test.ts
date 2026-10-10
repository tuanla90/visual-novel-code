/**
 * Gói B21 — máy (docs/mua-1/loi-note-bang-chan-ly.md) trên BỘ THỬ B21 (`noi-dung-thu-b21/`): chặng (HUD, chốt, "Khi chốt",
 * `[HẾT CHẶNG]`, "Có mặt"), note có loại / nguồn (`engine/note.ts`), `[ĐỔI LOẠI]`, nối note thành câu hỏi (`→ tra`, `→ hiện trường`),
 * `[NẾU có <thẻ>]`, đối chất chỉ ô (lượt mẫu, tính vạch, ô trống bắt buộc). Bộ mùa 1 và bộ MVP không đổi.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_THU_B21 } from '../../content/generated/thu-b21/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { boCoLoaiNote, loaiNote, thongTinNote, tachKeyword } from './note';
import { theCuaDongThoiGian } from './dong-thoi-gian';
import { cauHoiDaNoi, changHienTai, coMatChang, khungNhin, taoTrangThai, timCauNoi, xuLy, type HanhDongMvp, type KhungNhinMvp } from './may';
import { choiTuDong, type ChienThuat } from './tu-choi';
import { tuyenChuoi } from './tuyen-chuoi';
import type { TrangThaiMvp } from './trang-thai';

const KB = KICH_BAN_THU_B21 as unknown as KichBanMvp;

const tuDong = (dung: (s: TrangThaiMvp, kn: KhungNhinMvp) => boolean, s0: TrangThaiMvp = taoTrangThai(KB, 1), ct: ChienThuat = {}): TrangThaiMvp => choiTuDong(KB, s0, ct, dung);
const lam = (s: TrangThaiMvp, hd: HanhDongMvp): TrangThaiMvp => {
  const moi = xuLy(KB, s, hd);
  expect(moi, `hành động ${hd.type} bị từ chối`).not.toBe(s);
  return moi;
};

/** Tới bản đồ chặng 1 (cảnh khám phá gốc). */
const toiBanDoC1 = (): TrangThaiMvp => tuDong((_s, kn) => kn.kind === 'explore' && kn.nut.id === 'c1-bd');

describe('B21 · chặng', () => {
  it('lich.md khai chặng: mỗi chặng là một ngày theo truyện mang trường chang', () => {
    expect(KB.lich.ngay.map((n) => [n.so, n.ten, n.kieu, !!n.chang])).toEqual([
      [1, 'Hoài nào?', 'theo-truyen', true],
      [2, 'Hoài ra cổng lúc nào?', 'theo-truyen', true],
    ]);
    expect(KB.lich.ngay[0]?.chang).toEqual({
      ngayTruyen: '2024-09-23',
      gio: '16:30',
      chotKhi: ['ev-hoai-bc24'],
      khiChot: 'c1-chot',
      coMat: [
        { nhanVat: 'minh-anh', noi: 'phong-clb' },
        { nhanVat: 'bac-thinh', noi: 'sanh-toa-b' },
      ],
    });
  });

  it('vào chặng 1: giai đoạn ngày, ngày truyện đặt theo chặng, bản đồ không có nút Hết ngày', () => {
    const s = toiBanDoC1();
    expect(s.giaiDoan).toBe('ngay');
    expect(s.ngay).toBe(1);
    expect(s.ngayThang).toBe('2024-09-23');
    expect(changHienTai(KB, s)?.chang.gio).toBe('16:30');
    const kn = khungNhin(KB, s);
    expect(kn.kind).toBe('explore');
    if (kn.kind !== 'explore') return;
    expect(kn.hetNgay ?? null).toBeNull();
    expect(kn.roi ?? null).toBeNull();
    // Ghim đã mở đi được: hai ghim có dấu "!" hiện ngay; ghim cổng ký túc xá và khe hộp (sau: chéo nhau) chưa hiện.
    expect(kn.diem.map((d) => d.diem.chuoi)).toEqual(['c1-phong-clb', 'c1-sanh']);
  });

  it('"Có mặt" của chặng: ai ở ghim nào', () => {
    const s = toiBanDoC1();
    expect(coMatChang(KB, s)).toEqual([
      { nhanVat: 'minh-anh', noi: 'phong-clb' },
      { nhanVat: 'bac-thinh', noi: 'sanh-toa-b' },
    ]);
  });
});

/** Bấm chỗ `chuoi` ở bản đồ rồi đọc hết chuỗi tới khi về lại cảnh khám phá gốc (hay dừng ở màn khác). */
const bamVaDoc = (s: TrangThaiMvp, chuoi: string): TrangThaiMvp => {
  const sau = lam(s, { type: 'xem-diem', chuoi });
  return tuDong((st, kn) => (kn.kind === 'explore' && !!st.khamPha && !st.khamPha.cha && kn.nut.kieu === 'ban-do') || kn.kind === 'challenge' || kn.kind === 'dong-thoi-gian', sau);
};

describe('B21 · note có loại, nguồn, keyword; [NẾU có <thẻ>]', () => {
  it('lời đổi theo thẻ: vào sảnh khi chưa có thẻ lịch bác Thịnh nói câu chung, khi đã có thì nhắc thẻ', () => {
    const chua = tuDong((_s, kn) => kn.kind === 'line' && kn.loi.speaker === 'bac-thinh', lam(toiBanDoC1(), { type: 'xem-diem', chuoi: 'c1-sanh' }));
    const kn1 = khungNhin(KB, chua);
    expect(kn1.kind === 'line' && kn1.loi.text).toContain('Cậu hỏi gì?');
    const s0 = bamVaDoc(toiBanDoC1(), 'c1-phong-clb');
    expect(s0.hoSo.manhMoi).toEqual(expect.arrayContaining(['clue-the-lich', 'clue-bc24']));
    const co = tuDong((_s, kn) => kn.kind === 'line' && kn.loi.speaker === 'bac-thinh', lam(s0, { type: 'xem-diem', chuoi: 'c1-sanh' }));
    const kn2 = khungNhin(KB, co);
    expect(kn2.kind === 'line' && kn2.loi.text).toContain('Thẻ lịch Báo chí à?');
  });
});

describe('B21 · nối note thành câu hỏi', () => {
  const sauPhongClb = (): TrangThaiMvp => bamVaDoc(toiBanDoC1(), 'c1-phong-clb');

  it('[CÁC CÂU NỐI] mở cặp; cặp lạ không ra câu hỏi, máy đứng yên, không phạt', () => {
    const s = sauPhongClb();
    expect(s.cauNoiMo).toEqual(['cau-hoai-nao']);
    expect(timCauNoi(KB, s, 'clue-the-lich', 'clue-bc24')?.id).toBe('cau-hoai-nao');
    expect(timCauNoi(KB, s, 'clue-bc24', 'clue-the-lich')?.id).toBe('cau-hoai-nao');
    // Cặp lạ (hai thẻ có thật nhưng không khai) và thẻ chưa có: không ra câu hỏi.
    expect(timCauNoi(KB, s, 'clue-the-lich', 'doc-thu')).toBeNull();
    expect(timCauNoi(KB, s, 'clue-the-lich', 'clue-loi-thinh')).toBeNull();
    expect(xuLy(KB, s, { type: 'noi-the', a: 'clue-the-lich', b: 'doc-thu' })).toBe(s);
    expect(s.cauNoiXong ?? []).toEqual([]);
    expect(s.vach ?? 0).toBe(0);
  });

  it('nối đúng cặp → ra thẻ câu hỏi, mở màn tra; tra xong về lại bản đồ, chặng 1 chốt, chạy "Khi chốt" rồi sang chặng 2', () => {
    let s = lam(sauPhongClb(), { type: 'noi-the', a: 'clue-the-lich', b: 'clue-bc24' });
    expect(s.cauNoiXong).toEqual(['cau-hoai-nao']);
    expect(cauHoiDaNoi(KB, s).map((c) => c.cau)).toEqual(['Hoài nào học Báo chí, khóa 2024?']);
    expect(s.thuThachDangLam).toBe('c-hoai-bc');
    expect(s.traTuNoi).toBe('c-hoai-bc');
    expect(khungNhin(KB, s).kind).toBe('challenge');
    // Rời màn tra chưa xong: về chỗ đang đứng, câu hỏi vẫn còn, mở lại được.
    const roi = lam(s, { type: 'dong-tra-noi' });
    expect(roi.thuThachDangLam).toBeNull();
    expect(khungNhin(KB, roi).kind).toBe('explore');
    s = lam(roi, { type: 'mo-tra-noi', cau: 'cau-hoai-nao' });
    expect(s.thuThachDangLam).toBe('c-hoai-bc');
    // Tra xong: vật chứng vào hồ sơ; chặng chốt (Khi chốt chạy) rồi sang chặng 2.
    s = lam(s, { type: 'xong-thu-thach', thuThach: 'c-hoai-bc' });
    expect(s.hoSo.bangChung).toContain('ev-hoai-bc24');
    expect(s.thuThachDangLam).toBeNull();
    expect(s.conTro?.chuoi).toBe('c1-chot');
    expect(s.conTro?.boiCanh).toBe('chang-chot');
    const sang = tuDong((st) => st.ngay === 2, s);
    expect(sang.ngay).toBe(2);
    const s2 = tuDong((st, kn) => st.ngay === 2 && kn.kind === 'explore', sang);
    expect(s2.ngayThang).toBe('2024-09-27');
    expect(coMatChang(KB, s2)).toEqual([
      { nhanVat: 'chu-cuong', noi: 'cong-ktx' },
      { nhanVat: 'minh-anh', noi: 'phong-clb' },
    ]);
  });

  it('→ hiện trường ghim: nối lời bác Thịnh với lá thư thì ghim cổng ký túc xá hiện thêm trên bản đồ', () => {
    let s = bamVaDoc(toiBanDoC1(), 'c1-sanh');
    expect(s.cauNoiMo).toContain('cau-ai-bo-thu');
    const truoc = khungNhin(KB, s);
    expect(truoc.kind === 'explore' && truoc.diem.map((d) => d.diem.chuoi)).not.toContain('c1-cong');
    s = lam(s, { type: 'noi-the', a: 'doc-thu', b: 'clue-loi-thinh' });
    expect(s.hienTruong).toEqual(['c1-cong']);
    const sau = khungNhin(KB, s);
    expect(sau.kind === 'explore' && sau.diem.map((d) => d.diem.chuoi)).toContain('c1-cong');
    // Nối lại cặp đã nối: không làm gì.
    expect(xuLy(KB, s, { type: 'noi-the', a: 'doc-thu', b: 'clue-loi-thinh' })).toBe(s);
  });
});

/** Tới bản đồ chặng 2: chặng 1 chơi đúng (phòng CLB, nối, tra) rồi đọc nốt "Khi chốt". */
function toiBanDoC2(): TrangThaiMvp {
  let s = bamVaDoc(toiBanDoC1(), 'c1-phong-clb');
  s = lam(s, { type: 'noi-the', a: 'clue-the-lich', b: 'clue-bc24' });
  s = lam(s, { type: 'xong-thu-thach', thuThach: 'c-hoai-bc' });
  return tuDong((st, kn) => st.ngay === 2 && kn.kind === 'explore', s);
}

describe('B21 · loại / nguồn / keyword của note', () => {
  it('thông tin khai ở ho-so/ và mặc định theo mã', () => {
    expect(thongTinNote(KB, 'clue-loi-thinh')).toEqual({
      loai: 'manh-moi',
      nguon: 'loi-ke',
      keyword: [
        { loai: 'nguoi', chu: 'bác Thịnh' },
        { loai: 'thoi-gian', chu: '7:00' },
        { loai: 'hanh-dong', chu: 'mở sảnh' },
      ],
    });
    expect(thongTinNote(KB, 'clue-the-lich').nguon).toBe('quan-sat');
    expect(thongTinNote(KB, 'clue-bc24').nguon).toBe('suy-luan');
    expect(thongTinNote(KB, 'doc-thu')).toMatchObject({ loai: 'su-that', nguon: 'tai-lieu' });
    // Vật chứng của màn tra: mặc định sự thật / tra, kể cả không khai gì ở ho-so/.
    expect(thongTinNote(KB, 'ev-ra-cong')).toMatchObject({ loai: 'su-that', nguon: 'tra' });
    expect(thongTinNote(KB, 'ev-hoai-bc24')).toMatchObject({ loai: 'su-that', nguon: 'tra' });
    expect(boCoLoaiNote(KB)).toBe(true);
  });

  it('thiếu khai thì suy: clue- manh mối / lời kể, doc- sự thật / tài liệu, ev- nhặt ngoài hiện trường manh mối / quan sát', () => {
    const kb = { ...KB, chuoi: [], hoSo: { 'clue-x': { id: 'clue-x', loai: 'clue', heading: 'x', fields: {}, quotes: {} }, 'ev-y': { id: 'ev-y', loai: 'ev', heading: 'y', fields: {}, quotes: {} } }, thuThach: {} } as unknown as KichBanMvp;
    expect(thongTinNote(kb, 'clue-x')).toMatchObject({ loai: 'manh-moi', nguon: 'loi-ke' });
    expect(thongTinNote(kb, 'doc-z')).toMatchObject({ loai: 'su-that', nguon: 'tai-lieu' });
    expect(thongTinNote(kb, 'ev-y')).toMatchObject({ loai: 'manh-moi', nguon: 'quan-sat' });
    expect(boCoLoaiNote(kb)).toBe(false);
  });

  it('`Nguồn` cũ là chữ tự do: không phải một trong năm nguồn thì giữ làm chữ dưới thẻ, nguồn suy theo mã', () => {
    const kb = { ...KB, hoSo: { 'clue-x': { id: 'clue-x', loai: 'clue', heading: 'x', fields: { 'Nguồn': 'Lời cô Lan, phòng Công tác sinh viên' }, quotes: {} } } } as unknown as KichBanMvp;
    expect(thongTinNote(kb, 'clue-x').nguon).toBe('loi-ke');
  });

  it('tô keyword: tìm không phân biệt hoa thường, chữ dài tìm trước', () => {
    const kw = thongTinNote(KB, 'clue-loi-cuong').keyword;
    const doan = tachKeyword('Gần 7:00 cậu balo đen đưa phong bì cho Hoài', kw);
    expect(doan.filter((d) => d.loai).map((d) => [d.chu, d.loai])).toEqual([
      ['Gần 7:00', 'thoi-gian'],
      ['cậu balo đen', 'nguoi'],
      ['đưa phong bì', 'hanh-dong'],
    ]);
    expect(doan.map((d) => d.chu).join('')).toBe('Gần 7:00 cậu balo đen đưa phong bì cho Hoài');
    expect(tachKeyword('không có gì', kw)).toEqual([{ chu: 'không có gì', loai: null }]);
  });
});

/** Tới buổi họp: chặng 2 chơi đúng, dựng bảng chân lý, hết chặng. */
function toiHop(): TrangThaiMvp {
  let s = lam(toiBanDoC2(), { type: 'xem-diem', chuoi: 'c2-cong' });
  s = tuDong((_st, kn) => kn.kind === 'challenge', s);
  s = lam(s, { type: 'xong-thu-thach', thuThach: 'c-ra-vao' });
  s = tuDong((_st, kn) => kn.kind === 'dong-thoi-gian', s);
  for (const [o, the] of [['o1', 'ev-ra-cong'], ['o2', 'clue-loi-cuong'], ['o4', 'doc-thu']] as const) s = lam(s, { type: 'dat-the-dtg', o, the });
  return lam(s, { type: 'tiep' });
}

const toiDoiChat = (id: string, s: TrangThaiMvp): TrangThaiMvp => tuDong((_st, kn) => kn.kind === 'doi-chat' && kn.nut.id === id, s);

describe('B21 · buổi họp chỉ ô', () => {
  it('lượt mẫu `· chỉ ô · mẫu` thành lời viết sẵn (người hỏi rồi phản hồi), không chờ người chơi, không tính vạch', () => {
    const hop = KB.chuoi.find((c) => c.id === 'hop-00');
    expect(hop?.nodes.map((n) => n.type).slice(0, 6)).toEqual(['line', 'hien-dong-thoi-gian', 'line', 'line', 'line', 'doi-chat']);
    const s = toiDoiChat('dc-chi-o', toiHop());
    expect(s.vach ?? 0).toBe(0);
    expect(s.co).not.toContain('dc-mau-du');
  });

  it('chỉ ô: đáp án hai ô phải chỉ đủ; chỉ dở thì chờ; chỉ ô sai thêm một vạch + lời của đáp án [SAI], rồi chỉ lại', () => {
    let s = toiDoiChat('dc-chi-o', toiHop());
    const kn0 = khungNhin(KB, s);
    expect(kn0.kind === 'doi-chat' && kn0.nut.chiO).toBe(true);
    // Chỉ dở một ô của đáp án hai ô: chờ, chưa phạt.
    s = lam(s, { type: 'chi-o', o: 'dtg-vu1:o1' });
    let kn = khungNhin(KB, s);
    expect(kn.kind === 'doi-chat' && kn.oDangChon).toEqual(['dtg-vu1:o1']);
    expect(s.vach ?? 0).toBe(0);
    // Chỉ lại ô đã chỉ: bỏ chọn.
    s = lam(s, { type: 'chi-o', o: 'dtg-vu1:o1' });
    kn = khungNhin(KB, s);
    expect(kn.kind === 'doi-chat' && kn.oDangChon).toEqual([]);
    // Chỉ ô sai (đáp án [SAI] có lời riêng): một vạch, lời [SAI] rồi lời "sai lần đầu cả buổi".
    s = lam(s, { type: 'chi-o', o: 'dtg-vu1:o3' });
    expect(s.vach).toBe(1);
    const loi = (st: TrangThaiMvp): string[] => {
      const k = khungNhin(KB, st);
      return k.kind === 'feedback' ? [k.loi.text] : [];
    };
    expect(loi(s)[0]).toContain('Bác bảo vệ mở sảnh');
    s = lam(s, { type: 'tiep' });
    expect(loi(s)[0]).toContain('Chỉ vào ô cạnh giờ 6:44');
    s = lam(s, { type: 'tiep' });
    // Vẫn ở câu cũ, chỉ lại: đủ hai ô đúng thì qua.
    kn = khungNhin(KB, s);
    expect(kn.kind === 'doi-chat' && kn.nut.id).toBe('dc-chi-o');
    s = lam(s, { type: 'chi-o', o: 'dtg-vu1:o2' });
    s = lam(s, { type: 'chi-o', o: 'dtg-vu1:o1' });
    expect(loi(s)[0]).toContain('Có người đưa phong bì');
    expect(s.vach).toBe(1);
  });

  it('chỉ dở một ô đúng rồi chỉ thêm một ô sai có lời riêng → lời [SAI] của ô ấy (không phải [KHÁC]), một vạch, bỏ chọn cả hai', () => {
    let s = toiDoiChat('dc-chi-o', toiHop());
    s = lam(s, { type: 'chi-o', o: 'dtg-vu1:o1' });
    s = lam(s, { type: 'chi-o', o: 'dtg-vu1:o3' });
    const k = khungNhin(KB, s);
    expect(k.kind === 'feedback' && k.loi.text).toContain('Bác bảo vệ mở sảnh');
    expect(s.vach).toBe(1);
    expect(s.doiChat?.o ?? []).toEqual([]);
  });

  it('ô không có trong đáp án → lời [KHÁC]; ô trống bắt buộc (`{dtg:?}`) là đáp án của câu "người đứng sau"', () => {
    let s = toiDoiChat('dc-chi-o', toiHop());
    s = lam(s, { type: 'chi-o', o: 'dtg-vu1:o4' });
    const k = khungNhin(KB, s);
    expect(k.kind === 'feedback' && k.loi.text).toContain('không nói Hoài đưa thư');
    // Đi tiếp tới câu ô trống bắt buộc bằng tự chơi (đáp án đúng).
    const toi = tuDong((_st, kn) => kn.kind === 'doi-chat' && kn.nut.id === 'dc-trong', s);
    const sai = lam(toi, { type: 'chi-o', o: 'dtg-vu1:o2' });
    const ks = khungNhin(KB, sai);
    expect(ks.kind === 'feedback' && ks.loi.text).toContain('Em chỉ ô nào thế?');
    expect(sai.vach).toBe(2);
  });

  it('chơi đủ buổi họp: không vạch → rank A, kết thật', () => {
    const s = tuDong((_st, kn) => kn.kind === 'end', toiHop());
    expect(s.bangRank?.vu1).toMatchObject({ rank: 'a', vach: 0 });
    expect(s.ketQua).toBe('that');
  });

  it('chơi sai một lần ở mỗi câu chỉ ô: hai vạch → rank B', () => {
    const s = tuDong((_st, kn) => kn.kind === 'end', toiHop(), { traLoi: (_id, lan) => (lan < 1 ? 'sai' : 'dung') });
    expect(s.bangRank?.vu1?.vach).toBe(2);
    expect(s.bangRank?.vu1?.rank).toBe('b');
  });
});

describe('B21 · [ĐỔI LOẠI], chồng sự thật, [HẾT CHẶNG], chặng 2', () => {
  it('chặng 2: chú Cường kể (manh mối) → tra sổ ra vào (sự thật) → [ĐỔI LOẠI] manh mối thành sự thật → bảng chân lý', () => {
    const s0 = toiBanDoC2();
    expect(s0.ngay).toBe(2);
    expect(loaiNote(KB, s0, 'clue-loi-cuong')).toBe('manh-moi');
    let s = lam(s0, { type: 'xem-diem', chuoi: 'c2-cong' });
    s = tuDong((_st, kn) => kn.kind === 'challenge', s);
    expect(s.hoSo.manhMoi).toContain('clue-loi-cuong');
    s = lam(s, { type: 'xong-thu-thach', thuThach: 'c-ra-vao' });
    expect(s.hoSo.bangChung).toContain('ev-ra-cong');
    s = tuDong((_st, kn) => kn.kind === 'dong-thoi-gian', s);
    expect(s.doiLoai).toEqual(['clue-loi-cuong']);
    expect(loaiNote(KB, s, 'clue-loi-cuong')).toBe('su-that');
    const kn = khungNhin(KB, s);
    expect(kn.kind).toBe('dong-thoi-gian');
    if (kn.kind !== 'dong-thoi-gian') return;
    // Chồng "Sự thật chờ đặt": chỉ sự thật (tra, tài liệu, manh mối đã đổi loại); manh mối còn lại ở bảng manh mối.
    const chong = theCuaDongThoiGian(KB, s, kn.dtg).map((t) => [t.id, t.nguon]);
    expect(chong).toEqual(expect.arrayContaining([['ev-ra-cong', 'tra'], ['doc-thu', 'tai-lieu'], ['clue-loi-cuong', 'loi-ke']]));
    expect(chong.map((c) => c[0])).not.toEqual(expect.arrayContaining(['clue-loi-thinh']));
    expect(chong.map((c) => c[0])).not.toContain('clue-the-lich');
  });

  it('dựng xong bảng chân lý rồi [HẾT CHẶNG]: chặng cuối hết thì sang buổi họp', () => {
    let s = lam(toiBanDoC2(), { type: 'xem-diem', chuoi: 'c2-cong' });
    s = tuDong((_st, kn) => kn.kind === 'challenge', s);
    s = lam(s, { type: 'xong-thu-thach', thuThach: 'c-ra-vao' });
    s = tuDong((_st, kn) => kn.kind === 'dong-thoi-gian', s);
    s = lam(s, { type: 'dat-the-dtg', o: 'o1', the: 'ev-ra-cong' });
    s = lam(s, { type: 'dat-the-dtg', o: 'o2', the: 'clue-loi-cuong' });
    s = lam(s, { type: 'dat-the-dtg', o: 'o4', the: 'doc-thu' });
    s = lam(s, { type: 'tiep' });
    expect(s.giaiDoan).toBe('hop');
    expect(s.conTro?.chuoi).toBe('hop-00');
  });
});

describe('B21 · tuyến chuỗi: chuỗi "Khi chốt" thuộc tuyến của vụ', () => {
  it('c1-chot (chỉ chạy khi chặng 1 chốt) nằm trong tuyến vu1; mọi chuỗi của bộ thử đều thuộc một tuyến', () => {
    const t = tuyenChuoi(KB);
    expect(t.tuyenCua.get('c1-chot')).toBe('vu1');
    expect(KB.chuoi.filter((c) => !t.tuyenCua.has(c.id)).map((c) => c.id)).toEqual([]);
  });
});
