/**
 * Gói B18: thẻ nhân vật chỉ ghi điều đã biết. "Biết lúc gặp" trong nhan-vat.md, nút `[BIẾT <mã> <trường>]` trong khung cộng
 * trường vào `bietVe` (máy tự chạy qua, không dừng), lưu / nạp giữ được; thẻ không khai (bộ MVP) thì biết hết.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MUA_1 } from '../../content/generated/mua-1/kich-ban.gen';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import { CAC_TRUONG_BIET, type KichBanMvp } from '../../content/mvp/types';
import { khoiThayThe } from './hoi-dap';
import { khungNhin, taoTrangThai, truongDaBiet, truongDaBietTu, xuLy } from './may';
import type { TrangThaiMvp } from './trang-thai';

const kb = KICH_BAN_MUA_1 as unknown as KichBanMvp;
const kbMvp = KICH_BAN_MVP as unknown as KichBanMvp;

/** Trạng thái đứng ngay tại nút `[BIẾT]` đầu tiên của `nhanVat` trong chuỗi `chuoi`. */
function dungTaiBiet(chuoi: string, nhanVat: string): { s: TrangThaiMvp; nut: number } {
  const c = kb.chuoi.find((x) => x.id === chuoi);
  const nut = c?.nodes.findIndex((n) => n.type === 'biet' && n.nhanVat === nhanVat) ?? -1;
  expect(nut).toBeGreaterThanOrEqual(0);
  return { s: { ...taoTrangThai(kb), conTro: { chuoi, nut, boiCanh: 'mo-dau' } }, nut };
}

describe('Biết lúc gặp (nhan-vat.md) và truongDaBiet', () => {
  it('Tùng mới gặp: biết danh xưng, năm, ngành; chưa biết họ tên, lịch, câu nói', () => {
    const s = taoTrangThai(kb);
    expect([...truongDaBiet(kb, s, 'tung')].sort()).toEqual(['danh-xung', 'nam', 'nganh']);
    expect(truongDaBiet(kb, s, 'tung').has('ho-ten')).toBe(false);
  });

  it('Hiếu "Biết lúc gặp: không" → chưa biết ô nào', () => {
    expect(truongDaBiet(kb, taoTrangThai(kb), 'hieu').size).toBe(0);
  });

  it('thẻ không khai "Biết lúc gặp" (bộ MVP) → biết hết như cũ', () => {
    const s = taoTrangThai(kbMvp);
    expect([...truongDaBiet(kbMvp, s, 'tung')].sort()).toEqual([...CAC_TRUONG_BIET].sort());
    expect(truongDaBietTu(undefined, undefined).size).toBe(CAC_TRUONG_BIET.length);
  });

  it('truongDaBietTu bỏ qua mã lạ trong danh sách đã biết', () => {
    const gt = kb.nhanVat.find((n) => n.id === 'tung')?.gioiThieu;
    const kq = truongDaBietTu(gt, ['ho-ten', 'bua' as never]);
    expect(kq.has('ho-ten')).toBe(true);
    expect(kq.size).toBe(4);
  });
});

describe('[BIẾT] trong khung', () => {
  it('máy chạy qua nút [BIẾT tung câu nói] như consequence: không dừng, cộng trường vào bietVe', () => {
    const { s: s0, nut } = dungTaiBiet('md-00-gap-tung', 'tung');
    const s1 = xuLy(kb, s0, { type: 'sua-con-tro' });
    expect(s1.loi).toBeNull();
    expect(s1.bietVe?.['tung']).toEqual(['cau-noi']);
    expect(truongDaBiet(kb, s1, 'tung').has('cau-noi')).toBe(true);
    // Con trỏ đã đi tiếp (sang nút kế hoặc chuỗi kế), khung nhìn không phải lỗi.
    expect(s1.conTro?.chuoi !== 'md-00-gap-tung' || (s1.conTro?.nut ?? 0) > nut).toBe(true);
    expect(khungNhin(kb, s1).kind).not.toBe('error');
  });

  it('[BIẾT] lặp lại không nhân đôi trường; nhân vật khác không bị ảnh hưởng', () => {
    const { s: s0 } = dungTaiBiet('md-00-gap-tung', 'tung');
    const s1 = xuLy(kb, s0, { type: 'sua-con-tro' });
    const s2 = xuLy(kb, { ...s1, conTro: s0.conTro }, { type: 'sua-con-tro' });
    expect(s2.bietVe?.['tung']).toEqual(['cau-noi']);
    expect(truongDaBiet(kb, s2, 'ha-vy').has('cau-noi')).toBe(false);
  });

  it('[BIẾT hieu họ tên, danh xưng, năm] sau màn tra c-ten-h: ba trường vào một lần', () => {
    const { s: s0 } = dungTaiBiet('n3-laptop', 'hieu');
    const s1 = xuLy(kb, s0, { type: 'sua-con-tro' });
    expect(s1.bietVe?.['hieu']).toEqual(['ho-ten', 'danh-xung', 'nam']);
  });

  it('lưu / nạp (JSON và structuredClone) giữ bietVe', () => {
    const { s: s0 } = dungTaiBiet('md-00-gap-tung', 'tung');
    const s1 = xuLy(kb, s0, { type: 'sua-con-tro' });
    const quaJson = JSON.parse(JSON.stringify(s1)) as TrangThaiMvp;
    const quaClone = structuredClone(s1);
    expect([...truongDaBiet(kb, quaJson, 'tung')].sort()).toEqual(['cau-noi', 'danh-xung', 'nam', 'nganh']);
    expect([...truongDaBiet(kb, quaClone, 'tung')].sort()).toEqual(['cau-noi', 'danh-xung', 'nam', 'nganh']);
  });

  it('mọi [BIẾT] của bộ mùa 1 trỏ tới nhân vật có thẻ và trường chưa biết lúc gặp', () => {
    const sai: string[] = [];
    for (const c of kb.chuoi) {
      for (const n of c.nodes) {
        if (n.type !== 'biet') continue;
        const gt = kb.nhanVat.find((x) => x.id === n.nhanVat)?.gioiThieu;
        if (!gt) sai.push(`${c.id}: ${n.nhanVat} không có thẻ`);
        else for (const t of n.truong) if (!gt.bietLucGap || gt.bietLucGap.includes(t)) sai.push(`${c.id}: ${n.nhanVat} ${t} thừa`);
      }
    }
    expect(sai).toEqual([]);
  });
});

describe('[BIẾT] trong khối lời bị buổi hỏi nhân chứng thay', () => {
  it('khoiThayThe đi qua nút biet (không dừng ở đó) và trả nó về để nơi gọi ghi; hậu quả sau nó vẫn được gom', () => {
    const c = kb.chuoi.find((x) => x.id === 'n1-bac-thinh');
    const to = kb.hoiDap?.to['n1-bac-thinh'];
    expect(c && to).toBeTruthy();
    if (!c || !to) return;
    const viTri = c.nodes.findIndex((n) => n.type === 'hoi-dap');
    const kq = khoiThayThe(c.nodes, viTri, to);
    expect(kq.biet.map((b) => `${b.nhanVat}:${b.truong.join()}`)).toEqual(['bac-tu:lich']);
    // Khối thay gồm lời, [BIẾT], [HẬU QUẢ]: con trỏ đặt sau cả khối (hết chuỗi), không đứng lại ở nút biet.
    expect(kq.nutSau).toBe(c.nodes.length);
  });
});
