// @vitest-environment node
/**
 * Gói B12: Vụ 1 của bộ mùa 1 chơi được TỪ ĐẦU TỚI KẾT THẬT ở cả ba cách chơi của buổi hỏi nhân chứng.
 * Máy tự chơi (tu-choi.ts) đi đường thường; ở buổi hỏi nó để nhân chứng kể nốt rồi rời đi. Cả ba cách phải mở được
 * đủ manh mối của các cảnh hỏi đáp, kẻo màn tra và buổi họp phía sau thiếu thẻ.
 */
import { describe, expect, it } from 'vitest';
// B19 (08/10/2026): test cơ chế máy chạy trên bản đông cứng của bộ mùa 1 trước khi Vụ 1 viết lại (testing/mua1-truoc-b19).
import { KICH_BAN_MUA_1 } from './testing/mua1-truoc-b19/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { khungNhin, taoTrangThai, xuLy } from './may';
import type { CachChoiMvp } from './trang-thai';
import { choiTuDong, RE_NHANH_KET_THAT, reNhanhTheo } from './tu-choi';

const KB = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const MANH_MOI_HOI_DAP = ['clue-toa-b', 'clue-quyen-du-lieu', 'clue-can-ma-va-can-cu', 'clue-phieu-tra-cuu', 'clue-hoai-nguoi-nop', 'clue-loi-chu-cuong'];

describe('Vụ 1 mùa 1 với buổi hỏi nhân chứng', () => {
  for (const cach of ['tu-dong', 'bam', 'go'] as CachChoiMvp[]) {
    it(`cách "${cach}": chơi từ đầu tới kết thật, đủ manh mối của các cảnh hỏi đáp`, () => {
      const dau = xuLy(KB, taoTrangThai(KB, 1), { type: 'doi-cach-choi', cach });
      const daGap = new Set<string>();
      const ket = choiTuDong(KB, dau, { ten: 'Nam', reNhanh: reNhanhTheo(RE_NHANH_KET_THAT) }, (s, kn) => {
        if (kn.kind === 'hoi-dap' && s.conTro) daGap.add(s.conTro.chuoi);
        return kn.kind === 'end';
      }, 20000);
      expect(khungNhin(KB, ket)).toMatchObject({ kind: 'end', ketQua: 'that' });
      expect(ket.hoSo.manhMoi).toEqual(expect.arrayContaining(MANH_MOI_HOI_DAP));
      // Cách nào cũng mở khung hỏi đáp ở các cảnh trên tuyến chính (ba nút đổi cách luôn có mặt, kể cả ở "xem cả đoạn").
      expect([...daGap]).toEqual(expect.arrayContaining(['n1-bac-thinh', 'n2-co-hanh-vao', 'n3-ctsv', 'n4-ctsv-vao', 'n5-chu-cuong']));
    });
  }
});
