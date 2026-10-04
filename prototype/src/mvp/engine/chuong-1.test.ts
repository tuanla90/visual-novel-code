// @vitest-environment node
/**
 * Chương 1 theo truyện (ĐÃ CHỐT C, 30/09/2026) trên nội dung sinh thật `KICH_BAN_MVP`: mỗi ngày một chuỗi, không bản đồ,
 * không khung giờ, không uy tín; sai ở buổi họp thì chọn lại, không mất gì.
 * Kết (01/10/2026, đề xuất gameplay §4–5): ở buổi họp Quân nêu giả thuyết "Hoài viết" ([ĐỐI CHẤT dc-ai-viet]); kết thật khi
 * người chơi trình được nhật ký in (ĐỦ CĂN CỨ — cần đã ghé phòng máy ngày 4); lời chú Cường chỉ là HỖ TRỢ; không có nhật ký
 * in thì "chưa đủ căn cứ" → kết thường.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { khungNhin, taoTrangThai, tenKhungHienTai, xuLy, type KhungNhinMvp } from './may';
import type { TrangThaiMvp } from './trang-thai';
import { choiTuDong, RE_NHANH_KET_THAT, reNhanhTheo } from './tu-choi';

const KB = KICH_BAN_MVP as unknown as KichBanMvp;

/** Chơi tự động; ném lỗi nếu gặp màn chọn địa điểm (chương 1 không được có). */
function choi(s: TrangThaiMvp, reNhanh: Record<string, string>, dung: (s: TrangThaiMvp, kn: KhungNhinMvp) => boolean): TrangThaiMvp {
  return choiTuDong(KB, s, { ten: 'Nam', reNhanh: reNhanhTheo(reNhanh) }, (st, kn) => {
    if (kn.kind === 'chon-dia-diem') throw new Error(`chương 1 hiện màn chọn địa điểm (ngày ${st.ngay})`);
    return dung(st, kn);
  });
}
const toiKet = (_s: TrangThaiMvp, kn: KhungNhinMvp): boolean => kn.kind === 'end';

describe('chương 1: ngày theo truyện', () => {
  it('lịch: năm ngày theo truyện của vụ lá thư cộng ngày 6 thử màn tổng hợp, không dữ kiện chính / buổi tối, không uy tín, không địa điểm', () => {
    expect(KB.lich.ngay.map((n) => [n.so, n.kieu, n.chuoi])).toEqual([
      [1, 'theo-truyen', 'n1-mo'],
      [2, 'theo-truyen', 'n2-mo'],
      [3, 'theo-truyen', 'n3-mo'],
      [4, 'theo-truyen', 'n4-mo'],
      [5, 'theo-truyen', 'n5-mo'],
    ]);
    expect(KB.lich.luat.uyTin).toBeNull();
    expect(KB.diaDiem).toEqual([]);
  });

  it('hết mở đầu → ngày 1 chạy chuỗi n1-mo (ngữ cảnh "truyen"); HUD ghi tên ngày thay khung giờ', () => {
    const s = choi(taoTrangThai(KB, 1), {}, (st) => st.giaiDoan === 'ngay');
    expect(s.ngay).toBe(1);
    expect(s.conTro).toMatchObject({ chuoi: 'n1-mo', boiCanh: 'truyen' });
    expect(tenKhungHienTai(KB, s)).toBe('Sảnh tòa B');
  });

  it('ngày 1: ba chỗ bấm hiện ngay; xem hết cả ba → hết ngày, thẻ tự vào hồ sơ', () => {
    let s = choi(taoTrangThai(KB, 1), {}, (st, kn) => st.ngay === 1 && kn.kind === 'explore');
    const kn = khungNhin(KB, s);
    if (kn.kind !== 'explore') throw new Error('không tới khám phá');
    expect(kn.diem.map((d) => d.diem.chuoi)).toEqual(['n1-hop', 'n1-bac-thinh', 'n1-thong-bao-hop']);
    // Bấm theo thứ tự tùy ý: bác Thịnh trước.
    s = xuLy(KB, s, { type: 'xem-diem', chuoi: 'n1-bac-thinh' });
    s = choi(s, {}, (_st, k) => k.kind === 'explore');
    expect(s.hoSo.manhMoi).toContain('clue-toa-b');
    s = choi(s, {}, (st) => st.ngay === 2);
    expect(s.hoSo.bangChung).toEqual(['ev-the-lich']);
    expect(s.hoSo.manhMoi).toEqual(expect.arrayContaining(['clue-toa-b', 'clue-bao-chi-k24']));
    expect(s.hoSo.taiLieu).toContain('doc-thong-bao-hop');
    expect(s.conTro).toMatchObject({ chuoi: 'n2-mo', boiCanh: 'truyen' });
  });

  it('đường kết thật: ghé phòng máy + hỏi chú Cường + mời Hoài tự kể', () => {
    let s = choi(taoTrangThai(KB, 1), RE_NHANH_KET_THAT, (st) => st.giaiDoan === 'hop');
    expect(s.hoSo.bangChung).toEqual(expect.arrayContaining(['ev-the-lich', 'ev-hai-lop', 'ev-hai-ma', 'ev-nhat-ky-in']));
    expect(s.hoSo.manhMoi).toEqual(expect.arrayContaining(['clue-hoai-nguoi-nop', 'clue-loi-chu-cuong', 'clue-ten-tep']));
    s = choi(s, RE_NHANH_KET_THAT, toiKet);
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'end', ketQua: 'that' });
    expect(s.hoSo.bangChung).toContain('ev-hai-dong-sua');
  });

  it.each([
    ['không ghé phòng máy', { 'r-phong-may': 've' }],
    ['dừng, không mời Hoài', { 'r-moi-hoai': 'dung' }],
    ['mời Hoài vào đối chất', { 'r-moi-hoai': 'doi-chat' }],
  ])('kết thường khi %s', (_ten, doi) => {
    const s = choi(taoTrangThai(KB, 1), { ...RE_NHANH_KET_THAT, ...doi }, toiKet);
    expect(khungNhin(KB, s)).toMatchObject({ kind: 'end', ketQua: 'thuong' });
    expect(s.co).not.toContain('dc-ai-viet-du');
  });

  it('lời chú Cường là cảnh bắt buộc (01/10): kết nào cũng có thẻ bóng người đeo huy hiệu Robotics, không nói năm', () => {
    for (const re of [RE_NHANH_KET_THAT, { 'r-phong-may': 've', 'r-moi-hoai': 'dung' }]) {
      const s = choi(taoTrangThai(KB, 1), re, toiKet);
      expect(s.hoSo.manhMoi).toContain('clue-loi-chu-cuong');
    }
    expect(KB.chuoi.flatMap((c) => c.nodes).some((n) => n.type === 'branch' && n.id === 'r-chu-cuong')).toBe(false);
    const the = KB.hoSo['clue-loi-chu-cuong'];
    expect(the?.fields['Nội dung']).toMatch(/huy hiệu bánh răng của CLB Robotics/);
    expect(JSON.stringify(the)).not.toMatch(/khóa trên|năm tư|năm cuối/);
  });

  it('nhật ký in không lộ khóa học: tài khoản dùng chung clb_robotics; lời chương 1 không còn "năm tư" / "khóa trên"', () => {
    expect(KB.thuThach['c-in']?.vatChung?.giaTri).toEqual(['clb_robotics']);
    const chu = JSON.stringify(KB.chuoi) + JSON.stringify(KB.thuThach) + JSON.stringify(KB.hoSo);
    expect(chu).not.toMatch(/SV210745|năm tư|khóa trên|khóa 2021/);
  });

  it('phần thưởng kết thật là lời nhắn chị Linh; kết thường không có', () => {
    const that = choi(taoTrangThai(KB, 1), RE_NHANH_KET_THAT, toiKet);
    expect(khungNhin(KB, that)).toMatchObject({ kind: 'end', ketQua: 'that' });
    expect(that.co).toContain('dc-ai-viet-du');
    expect(that.hoSo.manhMoi).toContain('clue-loi-nhan-linh-1');
    const thuong = choi(taoTrangThai(KB, 1), { 'r-phong-may': 've', 'r-moi-hoai': 'tu-ke' }, toiKet);
    expect(khungNhin(KB, thuong)).toMatchObject({ kind: 'end', ketQua: 'thuong' });
    expect(thuong.hoSo.manhMoi).not.toContain('clue-loi-nhan-linh-1');
  });

  describe('[ĐỐI CHẤT dc-ai-viet] ở buổi họp', () => {
    const toiDoiChat = (): TrangThaiMvp => choi(taoTrangThai(KB, 1), RE_NHANH_KET_THAT, (_st, kn) => kn.kind === 'doi-chat');
    const quaPhanHoi = (s: TrangThaiMvp): TrangThaiMvp => {
      while (khungNhin(KB, s).kind === 'feedback') s = xuLy(KB, s, { type: 'tiep' });
      return s;
    };

    it('khung nhìn: giả thuyết của Quân, chưa trình gì, mức "khong"', () => {
      const kn = khungNhin(KB, toiDoiChat());
      expect(kn).toMatchObject({ kind: 'doi-chat', daTrinh: [], muc: 'khong', nut: { id: 'dc-ai-viet', asker: { speaker: 'quan' } } });
    });

    it('thẻ gợi ý → phản hồi, ở lại, mức gợi ý; thẻ không khai → phản hồi [KHÁC], ở lại; không trình lại thẻ đã trình', () => {
      let s = toiDoiChat();
      s = xuLy(KB, s, { type: 'trinh-the', the: 'clue-hoai-nguoi-nop' });
      expect(s.hoiDap?.nguon).toBe('doi-chat');
      s = quaPhanHoi(s);
      expect(khungNhin(KB, s)).toMatchObject({ kind: 'doi-chat', daTrinh: ['clue-hoai-nguoi-nop'], muc: 'goi-y' });
      const truoc = s;
      s = xuLy(KB, s, { type: 'trinh-the', the: 'clue-hoai-nguoi-nop' });
      expect(s).toBe(truoc);
      s = xuLy(KB, s, { type: 'trinh-the', the: 'doc-bao-cao-yeu' });
      const kn = khungNhin(KB, s);
      if (kn.kind !== 'feedback') throw new Error('không có phản hồi');
      expect(kn.loi.speaker).toBe('quan');
      s = quaPhanHoi(s);
      expect(khungNhin(KB, s)).toMatchObject({ kind: 'doi-chat', daTrinh: ['clue-hoai-nguoi-nop', 'doc-bao-cao-yeu'], muc: 'goi-y' });
      expect(s.uyTin).toBe(0);
      expect(s.giaiDoan).toBe('hop');
    });

    it('lời chú Cường (hỗ trợ) rồi "chưa đủ căn cứ" → kết thường, có cờ ho-tro, không có cờ du', () => {
      let s = toiDoiChat();
      s = quaPhanHoi(xuLy(KB, s, { type: 'trinh-the', the: 'clue-loi-chu-cuong' }));
      expect(khungNhin(KB, s)).toMatchObject({ kind: 'doi-chat', muc: 'ho-tro' });
      expect(s.co).toContain('dc-ai-viet-ho-tro');
      s = quaPhanHoi(xuLy(KB, s, { type: 'chua-du' }));
      s = choi(s, RE_NHANH_KET_THAT, toiKet);
      expect(khungNhin(KB, s)).toMatchObject({ kind: 'end', ketQua: 'thuong' });
      expect(s.co).not.toContain('dc-ai-viet-du');
    });

    it('nhật ký in (đủ căn cứ) → phản hồi rồi rời nút, cờ du, kết thật; thẻ không có trong hồ sơ thì không trình được', () => {
      let s = toiDoiChat();
      const truoc = s;
      s = xuLy(KB, s, { type: 'trinh-the', the: 'clue-khong-ton-tai' });
      expect(s).toBe(truoc);
      s = quaPhanHoi(xuLy(KB, s, { type: 'trinh-the', the: 'ev-nhat-ky-in' }));
      expect(s.doiChat ?? null).toBeNull();
      expect(s.co).toContain('dc-ai-viet-du');
      s = choi(s, RE_NHANH_KET_THAT, toiKet);
      expect(khungNhin(KB, s)).toMatchObject({ kind: 'end', ketQua: 'that' });
    });
  });

  it('không ghé phòng máy: không gặp c-in, không có nhật ký in; ngày 4 vẫn hết bình thường', () => {
    const s = choi(taoTrangThai(KB, 1), { ...RE_NHANH_KET_THAT, 'r-phong-may': 've' }, (st) => st.ngay === 5);
    expect(s.thuThachXong).not.toContain('c-in');
    expect(s.hoSo.bangChung).not.toContain('ev-nhat-ky-in');
    expect(s.hoSo.manhMoi).not.toContain('clue-ten-tep');
  });

  it('buổi họp: chọn sai thì nghe phản hồi rồi chọn lại — không mất vạch, không hoãn', () => {
    let s = choi(taoTrangThai(KB, 1), RE_NHANH_KET_THAT, (_st, kn) => kn.kind === 'question');
    const kn = khungNhin(KB, s);
    if (kn.kind !== 'question') throw new Error('không tới câu hỏi');
    expect(kn.nut.truUyTin).toBe(false);
    for (const sai of kn.nut.choices.filter((c) => !c.correct)) {
      s = xuLy(KB, s, { type: 'chon', luaChon: sai.id });
      expect(s.hoiDap?.phanHoi).toEqual(sai.feedback);
      for (let i = 0; i < sai.feedback.length; i++) s = xuLy(KB, s, { type: 'tiep' });
      expect(khungNhin(KB, s)).toMatchObject({ kind: 'question', nut: { id: kn.nut.id } });
    }
    expect(s.uyTin).toBe(0);
    expect(s.giaiDoan).toBe('hop');
  });

  it('lưu giữa ngày 3 rồi nạp lại: chơi tiếp tới kết thật y như không nạp', () => {
    const truoc = choi(taoTrangThai(KB, 1), RE_NHANH_KET_THAT, (st, kn) => st.ngay === 3 && kn.kind === 'challenge');
    const sau = JSON.parse(JSON.stringify(truoc)) as TrangThaiMvp;
    expect(sau).toEqual(truoc);
    const ketA = choi(truoc, RE_NHANH_KET_THAT, toiKet);
    const ketB = choi(sau, RE_NHANH_KET_THAT, toiKet);
    expect(khungNhin(KB, ketB)).toMatchObject({ kind: 'end', ketQua: 'that' });
    expect(ketB).toEqual(ketA);
  });
});

describe('ảnh chèn giữa hội thoại ([ẢNH …])', () => {
  it('máy dừng ở nút ảnh (khung nhìn "image"), "tiep" thì đi tiếp nút sau', () => {
    const chuoi = KB.chuoi.map((c) => (c.id === KB.lich.chuoiDau ? { ...c, nodes: [{ type: 'image' as const, imageId: 'chibi-thu' }, ...c.nodes] } : c));
    const kb: KichBanMvp = { ...KB, chuoi };
    let s = taoTrangThai(kb, 1);
    expect(khungNhin(kb, s)).toEqual({ kind: 'image', imageId: 'chibi-thu' });
    s = xuLy(kb, s, { type: 'tiep' });
    expect(s.conTro?.nut).toBeGreaterThan(0);
    expect(khungNhin(kb, s).kind).not.toBe('image');
  });

  it('tự phục hồi khi con trỏ chuỗi md-00-tren-xe vượt quá độ dài (lưu phiên bản cũ)', () => {
    let s = taoTrangThai(KB, 1);
    s = { ...s, conTro: { chuoi: 'md-00-tren-xe', nut: 8, boiCanh: 'mo-dau' } };
    expect(khungNhin(KB, s).kind).toBe('error');
    const sau = xuLy(KB, s, { type: 'sua-con-tro' });
    expect(sau.loi).toBeNull();
    expect(sau.conTro?.chuoi).toBe('md-00-xe-buyt');
    expect(khungNhin(KB, sau).kind).toBe('line');
  });
});
