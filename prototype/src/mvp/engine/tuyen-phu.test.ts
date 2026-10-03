/**
 * Luân phiên tuyến chính ↔ việc phụ (bảng hoạt động, 03/10/2026): nhận việc phụ giữa vụ không làm vụ chính "xong";
 * cất việc phụ thì về đúng màn đang làm với bảng điều tra (và giấy nhớ) như lúc rời; tiếp tục việc phụ về đúng chỗ đã cất.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN as kb } from '../store/kho-mvp';
import { dungBang } from './bang-dieu-tra';
import { khungNhin, phuMoDuoc, taoTrangThai, TEN_MAC_DINH, xuLy } from './may';
import { choiTuDong, RE_NHANH_KET_THAT, reNhanhTheo } from './tu-choi';

const ids = (s: Parameters<typeof dungBang>[1]): string[] => dungBang(kb, s).the.map((t) => t.id).sort();

describe('luân phiên tuyến chính và việc phụ', () => {
  const giuaVu3 = choiTuDong(kb, taoTrangThai(kb, 0), { reNhanh: reNhanhTheo(RE_NHANH_KET_THAT), ten: TEN_MAC_DINH, sangVuSau: true, lamPhu: false }, (_s, kn) => kn.kind === 'challenge' && kn.thuThach.id === 'c-bai-thiet-bi');

  it('nhận việc phụ giữa Vụ 3: Vụ 3 chưa xong, việc phụ mở sau Vụ 3 chưa mở', () => {
    expect(phuMoDuoc(kb, giuaVu3).map((p) => p.id)).toEqual(['so-phong']);
    const s = xuLy(kb, giuaVu3, { type: 'lam-nhiem-vu-phu', id: 'so-phong' });
    expect(s.giaiDoan).toBe('phu');
    expect(s.co).not.toContain('vu3-hoan-tat');
    expect(phuMoDuoc(kb, s).map((p) => p.id)).not.toContain('dan-lac');
  });

  it('cất việc phụ: về đúng màn tra của Vụ 3 với bảng điều tra như cũ; tiếp tục việc phụ về đúng chỗ đã cất', () => {
    const vao = xuLy(kb, giuaVu3, { type: 'lam-nhiem-vu-phu', id: 'so-phong' });
    const knPhu = khungNhin(kb, vao);
    const ve = xuLy(kb, vao, { type: 'tam-dung-nhiem-vu-phu' });
    expect(ve.giaiDoan).toBe('vu-sau');
    expect(khungNhin(kb, ve)).toMatchObject({ kind: 'challenge', thuThach: { id: 'c-bai-thiet-bi' } });
    expect(ids(ve)).toEqual(ids(giuaVu3));
    expect(ve.co).not.toContain('vu3-hoan-tat');
    const lai = xuLy(kb, ve, { type: 'lam-nhiem-vu-phu', id: 'so-phong' });
    expect(lai.giaiDoan).toBe('phu');
    expect(khungNhin(kb, lai).kind).toBe(knPhu.kind);
    expect(lai.conTro).toEqual(vao.conTro);
  });
});
