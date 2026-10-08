/**
 * Hỏi bạn đi cùng "việc chính", "gợi ý" bằng lời viết sẵn (gói B12): máy so chữ xếp câu vào hai ý định, câu khác để máy chủ
 * trò chuyện lo; lời điền nhiệm vụ, dòng "Cần làm rõ" còn mở, lời nhắc việc của ván đang chơi. Bộ MVP không có.
 */
import { describe, expect, it } from 'vitest';
// B19 (08/10/2026): test cơ chế máy chạy trên bản đông cứng của bộ mùa 1 trước khi Vụ 1 viết lại (testing/mua1-truoc-b19).
import { KICH_BAN_MUA_1 } from './testing/mua1-truoc-b19/kich-ban.gen';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { loiKhongMay, traLoiVietSan, yDinhDongHanh } from './dong-hanh-viet-san';
import { taoTrangThai, xuLy } from './may';
import type { TrangThaiMvp } from './trang-thai';

const KB = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const BO = KB.hoiDap!.dongHanh!;

describe('xếp câu vào hai ý định', () => {
  it.each([
    ['việc chính là gì', 'viec-chinh'],
    ['Giờ làm gì?', 'viec-chinh'],
    ['làm gì tiếp đây', 'viec-chinh'],
    ['giờ mình phải làm gì nhỉ', 'viec-chinh'],
    ['gợi ý đi', 'goi-y'],
    ['bí rồi', 'goi-y'],
    ['giúp tớ với', 'goi-y'],
    ['cho tớ xin gợi ý', 'goi-y'],
  ])('"%s" → %s', (cau, y) => {
    expect(yDinhDongHanh(BO, cau)).toBe(y);
  });
  it.each(['cậu nghĩ ai viết lá thư này', 'anh Quân là người thế nào', 'tối nay ăn gì', 'chào cậu', 'Hiếu có đáng nghi không'])('"%s" → để máy chủ trò chuyện lo', (cau) => {
    expect(yDinhDongHanh(BO, cau)).toBeNull();
  });
});

describe('lời viết sẵn', () => {
  /** Đứng ở buổi hỏi bác Thịnh, chào đi khi còn thiếu: có nhiệm vụ, có dòng "Cần làm rõ" còn mở. */
  const sauBuoiHoi = (): TrangThaiMvp => {
    const s0 = taoTrangThai(KB, 1);
    const c = KB.chuoi.find((x) => x.id === 'n1-toa-b')!;
    let s = xuLy(KB, { ...s0, giaiDoan: 'ngay', ngay: 1, conTro: { chuoi: 'n1-toa-b', nut: c.nodes.findIndex((n) => n.type === 'explore'), boiCanh: 'truyen' } }, { type: 'sua-con-tro' });
    s = xuLy(KB, s, { type: 'xem-diem', chuoi: 'n1-bac-thinh' });
    for (const hd of [{ type: 'hoi-dap-roi-di' }, { type: 'hoi-dap-roi-di' }, { type: 'tiep' }] as const) s = xuLy(KB, s, hd);
    return { ...s, nhiemVu: 'Ai đã bỏ lá thư vào hộp?', nhacViec: { nhanVat: 'ha-vy', text: 'Hỏi bác bảo vệ xem sáng thứ Hai ai mở hộp.' } };
  };

  it('việc chính: nhiệm vụ hiện tại kèm các dòng "Cần làm rõ" còn mở, đúng giọng bạn được hỏi', () => {
    const s = sauBuoiHoi();
    const tl = traLoiVietSan(KB, s, ['tung', 'ha-vy'], 'ha-vy', 'việc chính là gì vậy');
    expect(tl?.ban).toBe('ha-vy');
    expect(tl?.loi).toContain('Ai đã bỏ lá thư vào hộp?');
    expect(tl?.loi).toContain(KB.hoiDap!.to['n1-bac-thinh']!.danhSach[0]!.cau);
    expect(tl?.loi.startsWith(BO.loi['ha-vy']!.viecChinh.split('{viec}')[0]!)).toBe(true);
  });

  it('gợi ý: lời nhắc việc hiện tại; hỏi cả nhóm thì bạn đầu tiên có mặt trả lời; chưa có lời nhắc thì câu riêng', () => {
    const s = sauBuoiHoi();
    expect(traLoiVietSan(KB, s, ['tung', 'ha-vy'], null, 'gợi ý đi')).toEqual({ ban: 'tung', loi: BO.loi['tung']!.goiY.replace('{nhac}', 'Hỏi bác bảo vệ xem sáng thứ Hai ai mở hộp.') });
    expect(traLoiVietSan(KB, { ...s, nhacViec: null }, ['ha-vy'], null, 'bí rồi')?.loi).toBe(BO.loi['ha-vy']!.khongGoiY);
  });

  it('câu khác, bộ MVP, không có bạn nào: không trả lời viết sẵn; máy chủ không có thì câu riêng của bạn', () => {
    const s = sauBuoiHoi();
    expect(traLoiVietSan(KB, s, ['tung'], null, 'cậu nghĩ ai viết lá thư này')).toBeNull();
    expect(traLoiVietSan(KICH_BAN_MVP as unknown as KichBanMvp, s, ['tung'], null, 'việc chính là gì')).toBeNull();
    expect(traLoiVietSan(KB, s, [], null, 'việc chính là gì')).toBeNull();
    expect(loiKhongMay(KB, ['tung', 'ha-vy'], 'ha-vy')).toEqual({ ban: 'ha-vy', loi: BO.loi['ha-vy']!.khongMay });
    expect(loiKhongMay(KICH_BAN_MVP as unknown as KichBanMvp, ['tung'], null)).toBeNull();
  });
});
