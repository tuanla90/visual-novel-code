// @vitest-environment node
/**
 * Cảnh sảnh ký túc xá của bộ mùa 1 (user chơi thử 05/10): người chơi ĐỨNG NGOÀI nhìn bạn nữ hỏi đường cậu áo xanh, rồi mới
 * bước tới hỏi. Lỗi cũ: hình người chơi đứng cạnh bạn nữ như đang nói chuyện; thẻ "Nhân vật mới" của Hoài và Tùng bật ngay
 * câu đầu; ô "Đi cùng" hiện Tùng khi cậu ấy còn là người lạ.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MUA_1 } from '../../content/generated/mua-1/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { canGioiThieu, khungNhin, taoTrangThai, tenNguoiNoi, xuLy } from './may';
import type { TrangThaiMvp } from './trang-thai';
import { banDangCoMat } from './tri-nho-dong-hanh';
import { choiTuDong, RE_NHANH_KET_THAT, reNhanhTheo } from './tu-choi';

const KB = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const CT = { ten: 'Nam', reNhanh: reNhanhTheo(RE_NHANH_KET_THAT) };

interface Buoc {
  nguoi: string;
  chu: string;
  raDan: string[];
  the: string | null;
  ten: string;
  diCung: string[];
}

/** Đọc từng câu từ lúc vào chuỗi "thấy Tùng chỉ đường" tới hết chuỗi hỏi đường (dừng ở màn đặt tên). */
function docCanh(): Buoc[] {
  let s: TrangThaiMvp = choiTuDong(KB, taoTrangThai(KB, 1), CT, (x) => x.conTro?.chuoi === 'md-00-tung-chi-duong', 2000);
  const ra: Buoc[] = [];
  for (let i = 0; i < 40; i++) {
    const kn = khungNhin(KB, s);
    if (kn.kind !== 'line') break;
    const the = canGioiThieu(KB, s, kn);
    ra.push({ nguoi: kn.loi.speaker, chu: kn.loi.text, raDan: s.raDan ?? [], the, ten: tenNguoiNoi(KB, kn.loi.speaker, s), diCung: banDangCoMat(KB, s) });
    // Giao diện mở thẻ sau khi bấm tiếp ở câu đó, đóng thẻ thì ghi nhận.
    if (the) s = xuLy(KB, s, { type: 'da-gioi-thieu', nhanVat: the });
    s = xuLy(KB, s, { type: 'tiep' });
  }
  return ra;
}

describe('sảnh ký túc xá: người chơi đứng ngoài nhìn Hoài hỏi đường Tùng', () => {
  const canh = docCanh();
  const cau = (doan: string): Buoc => {
    const b = canh.find((x) => x.chu.includes(doan));
    if (!b) throw new Error(`không thấy câu "${doan}"`);
    return b;
  };

  it('lúc hai người nói với nhau, người chơi không đứng trên dàn; bạn nữ đi rồi mới tới lượt người chơi', () => {
    expect(cau('tòa KTX nữ đi đường nào').raDan).toContain('player');
    expect(cau('rẽ trái là tới luôn').raDan).toContain('player');
    // Bạn nữ rời hình trước câu kể "kéo vali lạch cạch đi".
    expect(cau('kéo vali lạch cạch').raDan).toContain('hoai');
    // Người chơi cất lời hỏi thì đã lên dàn; bạn nữ vẫn vắng.
    const hoi = cau('cho tớ hỏi thang bộ');
    expect(hoi.raDan).not.toContain('player');
    expect(hoi.raDan).toContain('hoai');
  });

  it('không thẻ "Nhân vật mới" nào bật trong lúc đứng nhìn; thẻ Tùng bật ở câu tự xưng', () => {
    const truocTuXung = canh.slice(0, canh.findIndex((x) => x.chu.includes('Tớ là')));
    expect(truocTuXung.length).toBeGreaterThan(5);
    expect(truocTuXung.map((x) => x.the).filter(Boolean)).toEqual([]);
    expect(cau('tòa KTX nữ đi đường nào').ten).toBe('Bạn nữ kéo vali');
    expect(cau('rẽ trái là tới luôn').ten).toBe('Cậu bạn áo xanh');
    expect(cau('Tớ là').the).toBe('tung');
  });

  it('ô "Đi cùng" chưa có Tùng khi cậu ấy còn là người lạ, có sau khi đã giới thiệu', () => {
    expect(cau('rẽ trái là tới luôn').diCung).toEqual([]);
    expect(cau('Để tớ dò danh sách').diCung).toEqual([]);
    const sauThe = canh[canh.findIndex((x) => x.chu.includes('Tớ là')) + 1];
    expect(sauThe?.diCung).toContain('tung');
  });

  it('đổi cảnh thì danh sách rời dàn xóa sạch', () => {
    const s = choiTuDong(KB, taoTrangThai(KB, 1), CT, (x) => x.conTro?.chuoi === 'md-01-ktx', 3000);
    expect(s.raDan ?? []).toEqual([]);
  });
});
