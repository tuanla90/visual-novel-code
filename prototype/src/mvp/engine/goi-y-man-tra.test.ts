/**
 * Gợi ý hai bậc của bạn đi cùng ở màn tra (gói B14): chọn gợi ý theo lần chạy gần nhất, đi bậc 1 rồi bậc 2, và nội dung thật
 * của bộ mùa 1 có đủ gợi ý cho mọi màn tra trên tuyến chính của Vụ 1.
 */
import { describe, expect, it } from 'vitest';
// B19 (08/10/2026): test cơ chế máy chạy trên bản đông cứng của bộ mùa 1 trước khi Vụ 1 viết lại (testing/mua1-truoc-b19).
import { KICH_BAN_MUA_1 } from './testing/mua1-truoc-b19/kich-ban.gen';
import type { GoiYTheMvp, KichBanMvp } from '../../content/mvp/types';
import { chonGoiY, nguoiGoiY, xinGoiY, type LanChayManTra } from './goi-y-man-tra';
import type { KetQuaCham } from './sql-mvp';

const kb = KICH_BAN_MUA_1 as unknown as KichBanMvp;

const sai = (n: number, chuan: number, cotThieu: string[] = []): KetQuaCham => ({ trangThai: 'sai', chay: { ok: true, cot: [], dong: [] }, so: { dung: false, soDongNguoiChoi: n, soDongChuan: chuan, cotThieu } });
const dung = (n: number): KetQuaCham => ({ trangThai: 'dung', chay: { ok: true, cot: [], dong: [] }, so: { dung: true, soDongNguoiChoi: n, soDongChuan: n, cotThieu: [] } });
const loi: KetQuaCham = { trangThai: 'loi', chay: { ok: false, loai: 'khong-co-cot', thongDiep: 'no such column' } };
const lan = (kq: KetQuaCham, cotDung: string[] = [], thuaCot = false): LanChayManTra => ({ kq, cotDung, thuaCot });

const g = (ten: string, khi?: GoiYTheMvp['khi']): GoiYTheMvp => ({ ...(khi ? { khi } : {}), bac1: { speaker: 'ha-vy', text: `${ten} 1` }, bac2: { speaker: 'ha-vy', text: `${ten} 2` } });
const THE = {
  goiY: [
    g('chung'),
    g('thieu', { kind: 'thieu-cot' }),
    g('thua', { kind: 'thua-cot' }),
    g('khong', { kind: 'so-dong', n: 0 }),
    g('khong-ten', { kind: 'so-dong', n: 0, cot: ['ten_tep'] }),
    g('dung', { kind: 'dung' }),
    g('loi-cot', { kind: 'loi-cot' }),
  ],
};
const ten = (the: Parameters<typeof chonGoiY>[0], l: LanChayManTra | null): string | null => chonGoiY(the, l)?.goiY.bac1.text.replace(/ 1$/, '') ?? null;

describe('chọn gợi ý theo lần chạy gần nhất', () => {
  it('chưa chạy lần nào, hoặc không điều kiện nào khớp → gợi ý chung', () => {
    expect(ten(THE, null)).toBe('chung');
    expect(ten(THE, lan(sai(7, 2)))).toBe('chung');
  });

  it('đủ dòng mà thiếu cột → "khi thiếu cột"; thừa cột → "khi thừa cột"', () => {
    expect(ten(THE, lan(sai(2, 2, ['ma_sv'])))).toBe('thieu');
    // Lệch số dòng thì cột thiếu chưa phải chuyện chính.
    expect(ten(THE, lan(sai(5, 2, ['ma_sv'])))).toBe('chung');
    expect(ten(THE, lan(sai(2, 2), [], true))).toBe('thua');
  });

  it('"chạy ra n dòng với <cột>" thắng "chạy ra n dòng" khi câu dùng đúng các cột ấy', () => {
    expect(ten(THE, lan(sai(0, 1), ['ten_tep']))).toBe('khong-ten');
    expect(ten(THE, lan(sai(0, 1), ['tai_khoan', 'ten_tep']))).toBe('khong');
    expect(ten(THE, lan(sai(0, 1)))).toBe('khong');
  });

  it('đúng → chỉ còn "khi đúng" (thẻ không có thì hết gợi ý); lỗi thiếu cột → "khi lỗi không có cột"', () => {
    expect(ten(THE, lan(dung(2)))).toBe('dung');
    expect(chonGoiY({ goiY: [g('chung')] }, lan(dung(2)))).toBeNull();
    expect(ten(THE, lan(loi))).toBe('loi-cot');
  });

  it('thẻ không có gợi ý → null', () => {
    expect(chonGoiY({}, null)).toBeNull();
    expect(xinGoiY({ goiY: [] }, null, {})).toBeNull();
  });
});

describe('xin gợi ý: bậc 1 rồi bậc 2, đếm riêng cho từng gợi ý', () => {
  it('lần một bậc 1, lần hai bậc 2, lần ba vẫn bậc 2; đổi tình huống thì gợi ý kia lại bắt đầu từ bậc 1', () => {
    const a = xinGoiY(THE, null, {});
    expect(a?.bong).toEqual({ ai: 'ha-vy', loi: 'chung 1', bac: 1 });
    const b = xinGoiY(THE, null, a?.bac ?? {});
    expect(b?.bong).toMatchObject({ loi: 'chung 2', bac: 2 });
    const c = xinGoiY(THE, null, b?.bac ?? {});
    expect(c?.bong).toMatchObject({ loi: 'chung 2', bac: 2 });
    const d = xinGoiY(THE, lan(sai(2, 2, ['ma_sv'])), c?.bac ?? {});
    expect(d?.bong).toMatchObject({ loi: 'thieu 1', bac: 1 });
    expect(d?.bac).toMatchObject({ chung: 2 });
  });
});

describe('nội dung thật của bộ mùa 1', () => {
  const VU_1 = ['c-bang-lop', 'c-cot-lop', 'c-lop', 'c-ten-h', 'c-in', 'c-sua-or-quan'];

  it.each(VU_1)('thẻ %s có gợi ý chung đủ hai bậc, bậc 2 khác bậc 1', (id) => {
    const the = kb.thuThach[id];
    const chung = (the?.goiY ?? []).find((x) => !x.khi);
    expect(chung, `thẻ ${id} thiếu dòng "Gợi ý"`).toBeDefined();
    expect(chung?.bac1.text.length).toBeGreaterThan(10);
    expect(chung?.bac2.text.length).toBeGreaterThan(10);
    expect(chung?.bac2.text).not.toBe(chung?.bac1.text);
  });

  it('c-ten-h: người gợi ý là Hà Vy và Duy; thiếu cột thì Duy nói, xưng anh', () => {
    const the = kb.thuThach['c-ten-h']!;
    expect(nguoiGoiY(the)).toEqual(['ha-vy', 'duy']);
    const thieu = chonGoiY(the, lan(sai(32, 32, ['ma_sv'])));
    expect(thieu?.goiY.bac1.speaker).toBe('duy');
    expect(thieu?.goiY.bac2.text).toMatch(/LẤY CỘT.*ma_sv/);
  });

  it('không lời gợi ý nào nói từ của câu lệnh, gạch dài hay mũi tên', () => {
    for (const the of Object.values(kb.thuThach)) {
      for (const x of the.goiY ?? []) {
        for (const l of [x.bac1, x.bac2]) {
          expect(l.text, the.id).not.toMatch(/(?<![\p{L}])(SELECT|WHERE|FROM|JOIN|LIKE|SQL|AND|OR)(?![\p{L}])/u);
          expect(l.text, the.id).not.toMatch(/[—→]/);
        }
      }
    }
  });
});
