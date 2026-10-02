/**
 * Thẻ "Nhân vật mới": mỗi nhân vật có thẻ giới thiệu phải có đúng một chỗ mở thẻ khi đi qua kịch bản thật — câu tự xưng
 * nếu chuỗi đó có, không thì câu đầu tiên người đó nói.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { canGioiThieu, taoTrangThai, tenNguoiNoi, type KhungNhinMvp } from './may';

const kb = KICH_BAN_MVP as unknown as KichBanMvp;

/** Chỗ đầu tiên (chuỗi, nút) mà thẻ của `nguoi` mở, quét các chuỗi theo thứ tự trong kịch bản. */
function choMoThe(nguoi: string): { chuoi: string; text: string } | null {
  for (const c of kb.chuoi) {
    for (let i = 0; i < c.nodes.length; i++) {
      const n = c.nodes[i];
      if (!n || n.type !== 'line' || n.speaker !== nguoi) continue;
      const s = { ...taoTrangThai(kb), conTro: { chuoi: c.id, nut: i, boiCanh: 'mo-dau' as const } };
      const kn: KhungNhinMvp = { kind: 'line', loi: { speaker: n.speaker, expression: n.expression, text: n.text } };
      if (canGioiThieu(kb, s, kn) === nguoi) return { chuoi: c.id, text: n.text };
    }
  }
  return null;
}

describe('thẻ giới thiệu nhân vật', () => {
  it('nhân vật nào có thẻ giới thiệu và có lời thoại cũng có chỗ mở thẻ', () => {
    const coLoi = new Set(kb.chuoi.flatMap((c) => c.nodes.flatMap((n) => (n.type === 'line' ? [n.speaker] : []))));
    const thieu = kb.nhanVat.filter((n) => n.gioiThieu && coLoi.has(n.id) && !choMoThe(n.id)).map((n) => n.id);
    expect(thieu).toEqual([]);
  });

  it('thẻ của mọi nhân vật mở ở chính câu tự xưng tên ("Chị là…", "Bác là…"), không mở trống không', () => {
    const tuXung = /(?:^|[.!?…]\s+)(?:còn\s+)?(?:tôi|mình|tớ|tui|em|anh|chị|chú|bác|cô|thầy)\s+là\s+/iu;
    const khongTuXung = kb.nhanVat.filter((n) => n.gioiThieu && !tuXung.test(choMoThe(n.id)?.text.normalize('NFC') ?? '')).map((n) => n.id);
    expect(khongTuXung).toEqual([]);
    expect(choMoThe('minh-anh')?.chuoi.startsWith('md-')).toBe(true);
  });

  it('thẻ tên trước khi được giới thiệu là cách gọi tạm, sau đó mới là tên', () => {
    const s0 = taoTrangThai(kb);
    expect(tenNguoiNoi(kb, 'minh-anh', s0)).toBe('Chị khóa trên');
    expect(tenNguoiNoi(kb, 'minh-anh', { ...s0, daGioiThieu: ['minh-anh'] })).toBe('Minh Anh');
    expect(tenNguoiNoi(kb, 'minh-anh')).toBe('Minh Anh');
    expect(tenNguoiNoi(kb, 'player', s0)).toBe('Bạn');
  });

  it('đã giới thiệu rồi thì không mở lại', () => {
    const c = kb.chuoi.find((x) => x.nodes.some((n) => n.type === 'line' && n.speaker === 'tung'));
    const i = c?.nodes.findIndex((n) => n.type === 'line' && n.speaker === 'tung') ?? -1;
    const n = c?.nodes[i];
    if (!c || !n || n.type !== 'line') throw new Error('không thấy lời của Tùng');
    const s = { ...taoTrangThai(kb), conTro: { chuoi: c.id, nut: i, boiCanh: 'mo-dau' as const }, daGioiThieu: ['tung'] };
    expect(canGioiThieu(kb, s, { kind: 'line', loi: { speaker: 'tung', text: n.text } })).toBeNull();
  });
});
