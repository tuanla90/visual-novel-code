// @vitest-environment node
/**
 * Máy kiểm LUẬT TÔ MÀU (user 04/10/2026; noi-dung-mvp/highlight.README.md). Chạy riêng: `npm run kiem-to-mau`.
 * 1. Thẻ hồ sơ nào tuyến mở cũng phải có cụm tô; cụm tô nào cũng gắn với một thẻ của tuyến đó.
 * 2. Cụm tô có mặt trong chính thẻ, và ít nhất một lần trong lời của tuyến (không thì tô cho ai xem).
 * 3. Cụm tô cụ thể: từ hai chữ trở lên, hoặc là mã (có chữ số), hoặc có chữ viết hoa (tên riêng); cụm bắt đầu bằng số
 *    đếm không khớp nhầm vào giữa số lớn hơn.
 * 4. Không bao giờ tô người chơi và bạn đồng hành.
 * 5. Mật độ: một câu tối đa 3 chỗ tô (bộ máy tự cắt); vụ chính không quá 30%, việc phụ không quá 40% số câu có tô.
 */
import { describe, expect, it } from 'vitest';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp } from '../../content/mvp/types';
import { tuyenChuoi } from '../engine/tuyen-chuoi';
import { highlightMvp } from './highlight-mvp';
import { DONG_HANH, LUAT_TO_MAU } from './story-highlight';

const kb = KICH_BAN_MVP as unknown as KichBanMvp;
const chuan = (s: string): string => s.normalize('NFC').toLocaleLowerCase('vi');
const CHU_SO = 'một|hai|ba|bốn|năm|sáu|bảy|tám|chín|mười|mươi|trăm|nghìn|ngàn';
const SO_DEM = new RegExp(`^(?:${CHU_SO}) `, 'u');
const { tuyenCua, theCua, viecPhu } = tuyenChuoi(kb);

/** Lời hiện cho người chơi của từng tuyến. */
const loiCua = new Map<string, string[]>();
for (const c of kb.chuoi) {
  const tuyen = tuyenCua.get(c.id);
  if (!tuyen) continue;
  const ds = loiCua.get(tuyen) ?? [];
  for (const n of c.nodes) if (n.type === 'line' && n.speaker !== 'narrator' || (n.type === 'line' && n.display !== 'card')) ds.push(n.text);
  loiCua.set(tuyen, ds);
}

describe('luật tô màu', () => {
  it('mọi chuỗi đều thuộc một tuyến', () => {
    expect(kb.chuoi.filter((c) => !tuyenCua.has(c.id)).map((c) => c.id)).toEqual([]);
  });

  it('1. thẻ hồ sơ của tuyến ↔ cụm tô khai ở highlight.json khớp nhau', () => {
    const loi: string[] = [];
    for (const [tuyen, the] of theCua) {
      const luat = LUAT_TO_MAU[tuyen];
      if (!luat) {
        loi.push(`${tuyen}: chưa có mục trong highlight.json`);
        continue;
      }
      for (const id of the.keys()) if (!luat.the[id]?.length) loi.push(`${tuyen}: thẻ ${id} chưa có cụm tô`);
      for (const id of Object.keys(luat.the)) if (!the.has(id)) loi.push(`${tuyen}: "${id}" không phải thẻ hồ sơ tuyến này mở`);
    }
    for (const tuyen of Object.keys(LUAT_TO_MAU)) if (!theCua.has(tuyen)) loi.push(`highlight.json: tuyến "${tuyen}" không có trong lịch`);
    expect(loi).toEqual([]);
  });

  it('2–3. cụm tô có trong thẻ, có trong lời của tuyến, và đủ cụ thể', () => {
    const loi: string[] = [];
    for (const [tuyen, luat] of Object.entries(LUAT_TO_MAU)) {
      const loiTuyen = chuan((loiCua.get(tuyen) ?? []).join(' | '));
      for (const [id, cum] of Object.entries(luat.the)) {
        const chuThe = theCua.get(tuyen)?.get(id) ?? '';
        for (const k of cum) {
          if (!chuThe.includes(chuan(k))) loi.push(`${tuyen} · ${id}: "${k}" không có trong thẻ`);
          if (!loiTuyen.includes(chuan(k))) loi.push(`${tuyen} · ${id}: "${k}" không xuất hiện trong lời của tuyến`);
          if (k.trim().split(/\s+/).length < 2 && !/\d/.test(k) && k === chuan(k)) loi.push(`${tuyen} · ${id}: "${k}" là một chữ thường, quá chung`);
          // Cụm bắt đầu bằng số đếm không được khớp vào giữa số lớn hơn ("mười hai lớp" không phải "hai lớp").
          if (SO_DEM.test(chuan(k)) && new RegExp(`(?:${CHU_SO}) ${chuan(k)}`, 'u').test(loiTuyen)) loi.push(`${tuyen} · ${id}: "${k}" khớp nhầm vào giữa một số lớn hơn trong lời`);
        }
      }
    }
    expect(loi).toEqual([]);
  });

  it('4–5. không tô người chơi / bạn đồng hành; mật độ trong ngưỡng', () => {
    const tenDongHanh = new Set(kb.nhanVat.filter((n) => DONG_HANH.has(n.id)).flatMap((n) => [n.ten, n.hoTen].filter(Boolean).map((t) => chuan(t as string))));
    const loi: string[] = [];
    const bao: string[] = [];
    for (const [tuyen, ds] of loiCua) {
      const phu = viecPhu.has(tuyen);
      const eng = highlightMvp(kb, 'Bảo', phu ? 'vu5' : tuyen, phu ? tuyen : null);
      let coTo = 0;
      for (const t of ds) {
        const tok = eng.tokenize(t);
        if (tok.length) coTo++;
        const theoCau = new Map<number, number>();
        for (const k of tok) {
          const cau = t.slice(0, k.start).search(/[^.!?…\n]*$/u);
          theoCau.set(cau, (theoCau.get(cau) ?? 0) + 1);
        }
        for (const [cau, n] of theoCau) if (n > 3) loi.push(`${tuyen}: ${n} chỗ tô trong một câu «${t.slice(cau, cau + 80)}»`);
        for (const k of tok) if (k.category === 'person' && (tenDongHanh.has(chuan(k.text)) || k.text === 'Bảo')) loi.push(`${tuyen}: tô bạn đồng hành / người chơi "${k.text}"`);
      }
      const tiLe = coTo / Math.max(1, ds.length);
      bao.push(`${tuyen} ${Math.round(tiLe * 100)}%`);
      // Việc phụ ngắn, câu nào cũng bàn chứng cứ: ngưỡng cao hơn vụ chính.
      const tran = phu ? 0.4 : 0.3;
      if (tiLe > tran) loi.push(`${tuyen}: ${Math.round(tiLe * 100)}% số câu có tô (tối đa ${tran * 100}%)`);
    }
    if (process.env.TO_MAU_BAO) console.log(bao.join(' · '));
    expect(loi).toEqual([]);
  });
});
