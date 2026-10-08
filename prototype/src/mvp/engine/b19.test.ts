/**
 * Gói B19 — máy chơi (docs/mua-1/brief/b19-vu-1-ban-6.md mục 4–5) trên BỘ THỬ B19 (`noi-dung-thu-b19/`): ranh giới rank 0/1/2/3
 * vạch, thiếu thẻ → C, rẽ kết, rank thay khi chơi lại, dòng thời gian (kéo đúng / sai / phần không điền được / ô khóa sẵn), lời
 * "sai lần đầu cả buổi", ghép mẫu, sổ tổng kết, màn kết. Bộ MVP không đổi: không có màn kết kiểu sổ CLB.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import { KICH_BAN_THU_B19 } from '../../content/generated/thu-b19/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { boCoChamVu, rankTu } from './cham-vu';
import { dongThoiGianXong, loiKeoSai, tachViec, theCuaDongThoiGian } from './dong-thoi-gian';
import { khungNhin, loiTrinhSai, taoTrangThai, tinhVachHienTai, vuChoiLai, xuLy, type KhungNhinMvp } from './may';
import { choiTuDong, type ChienThuat } from './tu-choi';
import type { TrangThaiMvp } from './trang-thai';

const KB = KICH_BAN_THU_B19 as unknown as KichBanMvp;
const MVP = KICH_BAN_MVP as unknown as KichBanMvp;

/** Chiến thuật trả lời sai đúng `sai[id]` lần đầu ở mỗi lệnh `· tính vạch` (theo mã câu / thẻ thử thách). */
function saiLan(sai: Record<string, number>): ChienThuat {
  return { traLoi: (id, lan) => (lan < (sai[id] ?? 0) ? 'sai' : 'dung') };
}

function choiToiKet(ct: ChienThuat, s0: TrangThaiMvp = taoTrangThai(KB, 1)): TrangThaiMvp {
  return choiTuDong(KB, s0, ct, (_s, kn) => kn.kind === 'end');
}

const tuDong = (dung: (s: TrangThaiMvp, kn: KhungNhinMvp) => boolean, s0: TrangThaiMvp = taoTrangThai(KB, 1), ct: ChienThuat = {}): TrangThaiMvp =>
  choiTuDong(KB, s0, ct, dung);

describe('B19 · chấm vụ: ranh giới rank', () => {
  it('rankTu: 0 vạch A, 1–2 vạch B, từ 3 vạch C; thiếu thẻ là C', () => {
    expect(rankTu(0, 0)).toBe('a');
    expect(rankTu(1, 0)).toBe('b');
    expect(rankTu(2, 0)).toBe('b');
    expect(rankTu(3, 0)).toBe('c');
    expect(rankTu(7, 0)).toBe('c');
    expect(rankTu(0, 1)).toBe('c');
  });

  it('0 vạch → rank A, kết thật, qua cảnh bóng mờ, có Cảnh 12; cờ rank và cờ kết', () => {
    const s = choiToiKet({});
    expect(s.bangRank?.vu1).toEqual({ rank: 'a', vach: 0, thieu: [] });
    expect(s.co).toEqual(expect.arrayContaining(['vu1-rank-a', 'vu1-ket-that', 'vu1-hoan-tat']));
    expect(s.co).not.toContain('vu1-ket-tam');
    expect(s.ketQua).toBe('that');
    expect(s.conTro?.chuoi).toBe('canh-12');
    expect(s.daXemDiem).toEqual(['tt-minh-anh', 'tt-ha-vy']);
    const kn = khungNhin(KB, s);
    expect(kn.kind).toBe('end');
    if (kn.kind !== 'end') return;
    expect(kn.ketQua).toBe('that');
    expect(kn.chamVu).toEqual({ vu: 'vu1', soVu: 1, tenVu: 'Vụ thử B19 — Chữ ký Hoài', ket: { rank: 'a', vach: 0, thieu: [] }, choiLai: true });
  });

  it('1 vạch (trình sai màn sửa truy vấn) → rank B, kết thật, không Cảnh 12', () => {
    const s = choiToiKet(saiLan({ 'c-sua-or': 1 }));
    expect(s.bangRank?.vu1).toEqual({ rank: 'b', vach: 1, thieu: [] });
    expect(s.ketQua).toBe('that');
    expect(s.conTro?.chuoi).toBe('sau-hop-hoi');
    expect(s.co).toContain('vu1-rank-b');
  });

  it('2 vạch (một trắc nghiệm, một đối chất) → rank B', () => {
    const s = choiToiKet(saiLan({ 'q-ai-dung-sau': 1, 'dc-phieu-gui': 1 }));
    expect(s.bangRank?.vu1?.rank).toBe('b');
    expect(s.bangRank?.vu1?.vach).toBe(2);
    expect(s.ketQua).toBe('that');
  });

  it('3 vạch → rank C, kết tạm (không qua cảnh bóng mờ), cờ vu1-ket-tam, câu Tùng đổi theo kết', () => {
    const s0 = taoTrangThai(KB, 1);
    let quaBongMo = false;
    const s = choiTuDong(KB, s0, saiLan({ 'c-sua-or': 2, 'dc-ai-mang': 1 }), (st, kn) => {
      if (st.conTro?.chuoi === 'bong-mo') quaBongMo = true;
      return kn.kind === 'end';
    });
    expect(s.bangRank?.vu1).toEqual({ rank: 'c', vach: 3, thieu: [] });
    expect(s.ketQua).toBe('tam');
    expect(s.co).toEqual(expect.arrayContaining(['vu1-rank-c', 'vu1-ket-tam', 'vu1-hoan-tat']));
    expect(s.co).not.toContain('vu1-ket-that');
    expect(quaBongMo).toBe(false);
    const kn = khungNhin(KB, s);
    expect(kn.kind === 'end' && kn.ketQua).toBe('tam');
  });

  it('thiếu thẻ bắt buộc lúc chấm → rank C dù 0 vạch', () => {
    const tai = tuDong((_s, kn) => kn.kind === 'question' && kn.nut.id === 'q-ai-dung-sau');
    const thieu: TrangThaiMvp = { ...tai, hoSo: { ...tai.hoSo, manhMoi: tai.hoSo.manhMoi.filter((x) => x !== 'clue-loi-chu-cuong') } };
    const s = choiToiKet({}, thieu);
    expect(s.bangRank?.vu1).toEqual({ rank: 'c', vach: 0, thieu: ['clue-loi-chu-cuong'] });
    expect(s.ketQua).toBe('tam');
  });

  it('kéo sai ở dòng thời gian, chạy thử, ghép mẫu không tính vạch', () => {
    const tai = tuDong((_s, kn) => kn.kind === 'dong-thoi-gian' && kn.dtg.id === 'dtg-vu1');
    expect(tai.vach ?? 0).toBe(0);
    expect(xuLy(KB, tai, { type: 'dat-the-dtg', o: 'o1', the: 'ev-the-lich' })).toBe(tai);
  });
});

describe('B19 · tính vạch: lời sai lần đầu cả buổi, lề sổ', () => {
  it('đối chất: lần sai đầu cả buổi có lời Hà Vy; lần sai sau thì không; chọn lại tới khi đúng', () => {
    let s = tuDong((_s, kn) => kn.kind === 'doi-chat' && kn.nut.id === 'dc-phieu-gui');
    expect(tinhVachHienTai(KB, s)?.cau).toEqual({ so: 2, tong: 4 });
    s = xuLy(KB, s, { type: 'trinh-the', the: 'ev-the-lich' });
    expect(s.vach).toBe(1);
    const loi1 = s.hoiDap?.phanHoi.map((l) => l.text) ?? [];
    expect(loi1[0]).toMatch(/^Tấm thẻ cho biết/);
    expect(loi1).toContain('Hôm ấy cô Lan nói gì về chữ ký nhỉ?');
    while (khungNhin(KB, s).kind === 'feedback') s = xuLy(KB, s, { type: 'tiep' });
    let kn = khungNhin(KB, s);
    expect(kn.kind).toBe('doi-chat');
    if (kn.kind !== 'doi-chat') return;
    expect(kn.daTrinh).toEqual(['ev-the-lich']);
    // Thẻ khác (không khai) → lời [KHÁC], thêm vạch, không còn lời "sai lần đầu".
    s = xuLy(KB, s, { type: 'trinh-the', the: 'clue-ra-cong' });
    expect(s.vach).toBe(2);
    expect(s.hoiDap?.phanHoi.map((l) => l.text)).toEqual(['Cái này không trả lời câu thầy hỏi.']);
    while (khungNhin(KB, s).kind === 'feedback') s = xuLy(KB, s, { type: 'tiep' });
    // "Chưa đủ căn cứ" không có ở đối chất tính vạch.
    expect(xuLy(KB, s, { type: 'chua-du' })).toBe(s);
    s = xuLy(KB, s, { type: 'trinh-the', the: 'clue-loi-co-lan' });
    kn = khungNhin(KB, s);
    expect(s.vach).toBe(2);
    expect(kn.kind === 'line' && kn.loi.speaker).toBe('player');
  });

  it('màn sửa truy vấn: "Trình" sai thêm một vạch, ở lại màn; lời "Khi trình sai" + lời sai lần đầu chỉ ở vạch đầu', () => {
    let s = tuDong((_s, kn) => kn.kind === 'fix-query');
    const kn = khungNhin(KB, s);
    expect(kn.kind === 'fix-query' && kn.tinhVach?.cau).toEqual({ so: 1, tong: 4 });
    expect(loiTrinhSai(KB, s).map((l) => l.text)).toEqual(['Vẫn chưa ra một dòng. Vậy câu của tôi sai ở đâu?', 'Nhìn lại chữ HOẶC trên màn chiếu.']);
    s = xuLy(KB, s, { type: 'trinh-sai' });
    expect(s.vach).toBe(1);
    expect(khungNhin(KB, s).kind).toBe('fix-query');
    expect(loiTrinhSai(KB, s).map((l) => l.text)).toEqual(['Vẫn chưa ra một dòng. Vậy câu của tôi sai ở đâu?']);
    // Ở màn không tính vạch thì "trinh-sai" bị từ chối.
    const dau = taoTrangThai(KB, 1);
    expect(xuLy(KB, dau, { type: 'trinh-sai' })).toBe(dau);
  });
});

describe('B19 · dòng thời gian', () => {
  const dtg = KB.dongThoiGian?.['dtg-vu1'];
  const tap = KB.dongThoiGian?.['dtg-banh'];

  it('bộ đọc: ô khóa sẵn, phần không điền được, thẻ tạm của dòng tập dượt', () => {
    expect(dtg?.o.map((o) => [o.id, o.gio, o.noi, o.khoaSan])).toEqual([
      ['o1', '6:44', 'cổng ký túc xá', false],
      ['o2', '?', 'cổng ký túc xá', false],
      ['o3', '7:00', 'sảnh tòa B', true],
      ['o4', 'trước 9:00', 'sảnh tòa B', false],
      ['o5', '9:00', 'sảnh tòa B', false],
    ]);
    expect(dtg?.o[1]?.khongDien).toBe('ai');
    expect(tachViec(dtg?.o[1]?.viec ?? '')).toEqual([null, ' đưa phong bì nâu cho Hoài']);
    expect(tap?.kieu).toBe('tap-duot');
    expect(tap?.theTam.map((t) => t.id)).toEqual(['lk-dem-bon', 'lk-tay-na', 'lk-chia-ba']);
    expect(tap?.o.map((o) => [o.gio, o.noi])).toEqual([['19:00', null], ['?', null], ['19:15', null]]);
  });

  it('tập dượt: thẻ là thẻ tạm; kéo đúng thì ô xong, kéo sai máy đứng yên; xong mới đi tiếp', () => {
    let s = tuDong((_s, kn) => kn.kind === 'dong-thoi-gian');
    let kn = khungNhin(KB, s);
    expect(kn.kind === 'dong-thoi-gian' && kn.dtg.id).toBe('dtg-banh');
    if (kn.kind !== 'dong-thoi-gian' || !tap) return;
    expect(theCuaDongThoiGian(KB, s, tap).map((t) => [t.id, t.tam])).toEqual([['lk-dem-bon', true], ['lk-tay-na', true], ['lk-chia-ba', true]]);
    expect(xuLy(KB, s, { type: 'tiep' })).toBe(s);
    expect(xuLy(KB, s, { type: 'dat-the-dtg', o: 'o3', the: 'lk-tay-na' })).toBe(s);
    expect(loiKeoSai(tap, tap.o[2] ?? null).map((l) => l.text)).toEqual(['Lúc chia thì đã thiếu rồi. Chỗ này cần cái gì xảy ra lúc chia cơ.']);
    for (const [o, the] of [['o1', 'lk-dem-bon'], ['o2', 'lk-tay-na'], ['o3', 'lk-chia-ba']] as const) s = xuLy(KB, s, { type: 'dat-the-dtg', o, the });
    kn = khungNhin(KB, s);
    expect(kn.kind === 'dong-thoi-gian' && kn.xong).toBe(true);
    s = xuLy(KB, s, { type: 'tiep' });
    expect(s.dongThoiGian?.['dtg-banh']?.xong).toBe(true);
    expect(khungNhin(KB, s).kind).toBe('line');
  });

  it('dòng chính: thẻ hồ sơ; ô khóa sẵn không nhận; phần "không điền được" và câu nhắc chung', () => {
    let s = tuDong((_s, kn) => kn.kind === 'dong-thoi-gian' && kn.dtg.id === 'dtg-vu1');
    if (!dtg) throw new Error('thiếu dtg-vu1');
    expect(theCuaDongThoiGian(KB, s, dtg).map((t) => t.id).sort()).toEqual(['clue-loi-chu-cuong', 'clue-loi-co-lan', 'clue-ra-cong', 'ev-phieu-gui', 'ev-the-lich']);
    expect(xuLy(KB, s, { type: 'dat-the-dtg', o: 'o3', the: 'clue-ra-cong' })).toBe(s);
    expect(loiKeoSai(dtg, dtg.o[1] ?? null, 'trong').map((l) => l.text)).toEqual(['Chưa ai biết người ấy. Cứ để trống.']);
    expect(loiKeoSai(dtg, dtg.o[3] ?? null).map((l) => l.text)).toEqual(['Thẻ này nói chuyện ở chỗ khác.']);
    // Thẻ chưa có trong hồ sơ thì không thả được.
    const thieu: TrangThaiMvp = { ...s, hoSo: { ...s.hoSo, manhMoi: s.hoSo.manhMoi.filter((x) => x !== 'clue-ra-cong') } };
    expect(xuLy(KB, thieu, { type: 'dat-the-dtg', o: 'o1', the: 'clue-ra-cong' })).toBe(thieu);
    for (const [o, the] of [['o1', 'clue-ra-cong'], ['o2', 'clue-loi-chu-cuong'], ['o4', 'ev-phieu-gui']] as const) s = xuLy(KB, s, { type: 'dat-the-dtg', o, the });
    expect(dongThoiGianXong(dtg, s.dongThoiGian?.['dtg-vu1']?.o ?? {})).toBe(false);
    s = xuLy(KB, s, { type: 'dat-the-dtg', o: 'o5', the: 'clue-loi-co-lan' });
    expect(dongThoiGianXong(dtg, s.dongThoiGian?.['dtg-vu1']?.o ?? {})).toBe(true);
    // Ô đã có thẻ không nhận thẻ khác.
    expect(xuLy(KB, s, { type: 'dat-the-dtg', o: 'o1', the: 'clue-ra-cong' })).toBe(s);
  });

  it('[HIỆN DÒNG THỜI GIAN] ở buổi họp: bản đã dựng, chỉ xem', () => {
    const s = tuDong((_s, kn) => kn.kind === 'dong-thoi-gian' && kn.chiXem);
    const kn = khungNhin(KB, s);
    if (kn.kind !== 'dong-thoi-gian') throw new Error('không tới màn xem lại');
    expect(kn.daDat).toEqual({ o1: 'clue-ra-cong', o2: 'clue-loi-chu-cuong', o4: 'ev-phieu-gui', o5: 'clue-loi-co-lan' });
    expect(xuLy(KB, s, { type: 'dat-the-dtg', o: 'o1', the: 'clue-ra-cong' })).toBe(s);
    expect(khungNhin(KB, xuLy(KB, s, { type: 'tiep' })).kind).toBe('doi-chat');
  });
});

describe('B19 · khám phá kiểu dàn', () => {
  it('bấm một người trên dàn: chạy chuỗi rồi về lại màn dàn; xem hết người "!" là việc chính xong', () => {
    let s = tuDong((_s, kn) => kn.kind === 'explore');
    let kn = khungNhin(KB, s);
    if (kn.kind !== 'explore') throw new Error('không tới màn dàn');
    expect(kn.nut.kieu).toBe('dan');
    expect(kn.diem.map((d) => d.diem.sprite)).toEqual(['nv:minh-anh/worried', 'nv:ha-vy/thinking', 'nv:tung']);
    s = xuLy(KB, s, { type: 'xem-diem', chuoi: 'tt-minh-anh' });
    expect(khungNhin(KB, s).kind).toBe('line');
    s = xuLy(KB, s, { type: 'tiep' });
    kn = khungNhin(KB, s);
    expect(kn.kind === 'explore' && kn.xongChinh).toBe(false);
    s = xuLy(KB, xuLy(KB, s, { type: 'xem-diem', chuoi: 'tt-ha-vy' }), { type: 'tiep' });
    kn = khungNhin(KB, s);
    expect(kn.kind === 'explore' && kn.xongChinh).toBe(true);
    expect(kn.kind === 'explore' && kn.roi).toEqual({ kieu: 'di-tiep', nhan: 'Đi tiếp' });
  });
});

describe('B19 · ghép mẫu, sổ tổng kết', () => {
  it('[GHÉP MẪU]: bấm tiếp thì hai thẻ lên bảng, giấy nhớ ở lại', () => {
    const tai = tuDong((_s, kn) => kn.kind === 'ghep-mau');
    const kn = khungNhin(KB, tai);
    expect(kn.kind === 'ghep-mau' && kn.nut.giayNho).toBe('Hoài nào học Báo chí, khóa 2024?');
    const go: TrangThaiMvp = { ...tai, bang: { day: {}, viTri: {}, boGhim: ['ev-the-lich'] } };
    const s = xuLy(KB, go, { type: 'tiep' });
    expect(s.bang?.ghepMau).toEqual([{ id: 'ev-phieu-gui+ev-the-lich', the: ['ev-phieu-gui', 'ev-the-lich'], chu: 'Hoài nào học Báo chí, khóa 2024?', nguoi: 'minh-anh' }]);
    expect(s.bang?.boGhim).toEqual([]);
  });

  it('[SỔ TỔNG KẾT]: trang sổ mang kết quả chấm của vụ', () => {
    const s = tuDong((_s, kn) => kn.kind === 'so-tong-ket', taoTrangThai(KB, 1), saiLan({ 'c-sua-or': 1 }));
    const kn = khungNhin(KB, s);
    expect(kn).toMatchObject({ kind: 'so-tong-ket', vu: 'vu1', soVu: 1, ket: { rank: 'b', vach: 1 } });
  });
});

describe('B19 · điểm lưu đầu vụ, chơi lại', () => {
  it('chơi lại Vụ 1: về đầu ngày 1, hồ sơ và vạch như lúc lưu; bảng rank giữ tới khi chấm lại; rank mới thay rank cũ', () => {
    const ketA = choiToiKet({});
    expect(vuChoiLai(KB, ketA)).toEqual({ vu: 'vu1', soVu: 1, tenVu: 'Vụ thử B19 — Chữ ký Hoài' });
    const lai = xuLy(KB, ketA, { type: 'choi-lai-vu', luc: 99 });
    expect(lai.batDauLuc).toBe(99);
    expect(lai.conTro?.chuoi).toBe('n1-mo');
    expect(lai.giaiDoan).toBe('ngay');
    expect(lai.vach).toBe(0);
    expect(lai.hoSo.bangChung).toEqual([]);
    expect(lai.co).not.toContain('vu1-rank-a');
    expect(lai.ketQua).toBeNull();
    expect(lai.dongThoiGian?.['dtg-banh']?.xong).toBe(true);
    expect(lai.dongThoiGian?.['dtg-vu1']).toBeUndefined();
    // Bảng rank cũ còn, điểm lưu còn (chơi lại được nhiều lần).
    expect(lai.bangRank?.vu1?.rank).toBe('a');
    expect(lai.diemLuuVu?.vu1).toBeDefined();
    // Chơi lại tới ngay trước chấm: rank cũ vẫn là A.
    const truocCham = tuDong((_s, kn) => kn.kind === 'question' && kn.nut.id === 'q-ai-dung-sau', lai, saiLan({ 'c-sua-or': 3 }));
    expect(truocCham.bangRank?.vu1?.rank).toBe('a');
    expect(truocCham.vach).toBe(3);
    const ketC = choiToiKet({}, truocCham);
    expect(ketC.bangRank?.vu1).toEqual({ rank: 'c', vach: 3, thieu: [] });
    expect(ketC.ketQua).toBe('tam');
  });

  it('chưa tới điểm lưu thì không chơi lại được', () => {
    const s = taoTrangThai(KB, 1);
    expect(vuChoiLai(KB, s)).toBeNull();
    expect(xuLy(KB, s, { type: 'choi-lai-vu' })).toBe(s);
  });

  it('điểm lưu không chụp bảng rank và điểm lưu (ảnh chụp không lồng nhau)', () => {
    const s = tuDong((st) => st.conTro?.chuoi === 'n1-mo');
    const chup = s.diemLuuVu?.vu1;
    expect(chup).toBeDefined();
    expect(chup?.diemLuuVu).toBeUndefined();
    expect(chup?.bangRank).toBeUndefined();
    expect(JSON.parse(JSON.stringify(s)).diemLuuVu.vu1.conTro).toEqual({ chuoi: 'n1-mo', nut: 1, boiCanh: 'truyen' });
  });
});

describe('B19 · bộ MVP không đổi', () => {
  it('bộ MVP không có [CHẤM VỤ]: màn kết không có phần sổ CLB', () => {
    expect(boCoChamVu(MVP)).toBe(false);
    expect(boCoChamVu(KB)).toBe(true);
  });
});
