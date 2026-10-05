/**
 * MÁY KIỂM MÀN TRA CỦA BỘ MÙA 1 (gói B14, docs/mua-1/brief/b14-man-tra.md mục A và D). Chạy trong `npm run kiem-noi-dung:mua1`
 * và `npm run noi-dung:sinh:mua1`, sau khi kịch bản đã đọc xong. Hai thứ được kiểm:
 *
 * 1. GỢI Ý HAI BẬC của bạn đi cùng (dòng "- Gợi ý[ khi …]: <bậc 1> <br> <bậc 2>" cạnh các dòng "Khi …" của thẻ thử thách,
 *    cú pháp ở phan-ung-mvp.ts):
 *    - đúng hai lời, người nói là nhân vật có thật, biểu cảm có trong thẻ nhân vật;
 *    - có dòng "Gợi ý khi …" thì phải có dòng "Gợi ý" chung;
 *    - cả hai bậc không nói từ của câu lệnh (SELECT, WHERE…), không gạch dài, không mũi tên;
 *    - bậc 1 không lộ đáp án: không tên cột, không chữ trên nút của màn tra, không động từ thao tác (bấm, kéo, thả, tích);
 *    - mọi màn tra trên tuyến chính của Vụ 1 (thẻ được chuỗi ở `kich-ban/0x-….md` gọi) phải có dòng "Gợi ý" chung.
 *
 * 2. CHỮ TRÊN GIẤY NHỚ (dòng "- Chữ trên giấy: …" của thẻ hồ sơ, dòng con cùng tên của vật chứng thẻ thử thách): câu ngắn in
 *    trên tờ giấy nhớ dán quanh màn tra, giá trị kéo vào ô lọc bọc trong `**…**`.
 *    - thẻ có "Chữ trên giấy" phải có "Giá trị cho trình dựng"; mỗi tờ một câu, các câu cách nhau bằng " · " như các giá trị;
 *    - mỗi câu chứa đúng một cụm `**…**` và cụm ấy đúng bằng giá trị của tờ (phiếu nhiều giá trị đi chung một tờ: các giá trị
 *      nối bằng ", ");
 *    - tối đa 60 ký tự (không tính dấu `**`), không gạch dài, không mũi tên;
 *    - bắt buộc có cho giấy nhớ và phiếu của Vụ 1 (thẻ ở `ho-so/0x-….md`, vật chứng của thẻ thử thách Vụ 1).
 *
 * Không import gì từ `src/`.
 */
import { dinhDangLoi, type RawMvp } from './doc-mvp.ts';
import type { RawLine } from './doc.ts';
import { traViTri, type DoanLoi, type NguonDong } from './ghep-loi.ts';
import { docGoiY } from './phan-ung-mvp.ts';

export const TOI_DA_CHU_TREN_GIAY = 60;

/** Từ của câu lệnh: không ai trong nhóm nói (giong/luat-giong.md mục "Thuật ngữ theo vai"); gợi ý nói bằng chữ trên màn hình. */
const TU_CAU_LENH = /(?<![\p{L}\p{N}_])(SQL|SELECT|WHERE|FROM|JOIN|GROUP BY|ORDER BY|LIKE|AND|OR|IN|COUNT|truy vấn|câu lệnh|mệnh đề|cú pháp)(?![\p{L}\p{N}_])/u;
/** Chữ trên nút / nhãn của màn tra: chỉ bậc 2 được nhắc. */
const CHU_TREN_MAN = /(LẤY CỘT|ĐIỀU KIỆN LỌC|NGUỒN BẢNG|XẾP THEO|CHẠY|(?<![\p{L}])(VÀ|HOẶC|LỌC)(?![\p{L}]))/u;
/** Động từ thao tác: chỉ bậc 2 được nói. */
const THAO_TAC = /(?<![\p{L}])(bấm|kéo|thả|tích|nhấn|gõ)(?![\p{L}])/iu;
const DAU_CAM = /[—→←⇒➜➔]|->/u;

const laVu1 = (tep: string): boolean => /(?:^|\/)(?:kich-ban|ho-so)\/0\d-[^/]*\.md$/.test(tep.replace(/\\/g, '/'));

const chia = (v: string | undefined): string[] =>
  (v ?? '')
    .split('·')
    .map((x) => x.trim())
    .filter((x) => x !== '');

/** Các cụm `**…**` của một câu. */
const cumDam = (cau: string): string[] => [...cau.matchAll(/\*\*([^*]+)\*\*/g)].map((m) => m[1] ?? '');
const boDam = (cau: string): string => cau.replace(/\*\*/g, '');

export interface KetQuaKiemManTra {
  loi: string[];
  tomTat: string;
}

/** Lỗi của một bộ "Chữ trên giấy" so với các giá trị của tờ giấy; `motTo` = phiếu nhiều giá trị đi chung một tờ. */
export function loiChuTrenGiay(chu: string | undefined, giaTri: readonly string[], motTo: boolean): string[] {
  const loi: string[] = [];
  if (chu === undefined) return loi;
  if (giaTri.length === 0) return ['có "Chữ trên giấy" mà không có "Giá trị cho trình dựng" (tờ giấy không kéo được vào ô lọc)'];
  const cau = chia(chu);
  const can = motTo ? [giaTri.join(', ')] : [...giaTri];
  if (cau.length !== can.length) {
    loi.push(`"Chữ trên giấy" có ${cau.length} câu nhưng cần ${can.length} (mỗi tờ giấy một câu, cách nhau bằng " · "${motTo ? '; phiếu này đi chung một tờ' : ''})`);
    return loi;
  }
  cau.forEach((c, i) => {
    const dam = cumDam(c);
    const gt = can[i] ?? '';
    if (dam.length !== 1) loi.push(`"Chữ trên giấy" câu ${i + 1} ("${c}") phải có đúng một cụm **…** bọc giá trị "${gt}"`);
    else if (dam[0] !== gt) loi.push(`"Chữ trên giấy" câu ${i + 1}: cụm in đậm "${dam[0]}" phải đúng bằng giá trị "${gt}"`);
    const tran = boDam(c);
    if ([...tran].length > TOI_DA_CHU_TREN_GIAY) loi.push(`"Chữ trên giấy" câu ${i + 1} dài ${[...tran].length} ký tự (tối đa ${TOI_DA_CHU_TREN_GIAY}): "${tran}"`);
    if (tran.replace(gt, '').trim() === '') loi.push(`"Chữ trên giấy" câu ${i + 1} chỉ có giá trị "${gt}": phải là một câu nói đó là gì`);
    if (DAU_CAM.test(tran)) loi.push(`"Chữ trên giấy" câu ${i + 1} có gạch dài hoặc mũi tên: "${tran}"`);
  });
  return loi;
}

export function kiemManTraMua1(mvp: RawMvp, nguonLoi?: { banDo: Map<string, NguonDong[]>; doanLoi: readonly DoanLoi[] }): KetQuaKiemManTra {
  const loi: string[] = [];
  const nhanVat = new Map(mvp.nhanVat.map((n) => [n.id, n]));
  /** Tên cột của các bảng mà SQL chuẩn của thẻ dùng (bậc 1 không được nhắc). */
  const cotCuaThe = (sql: string): string[] => {
    const bang = new Set([...sql.matchAll(/\b(?:FROM|JOIN)\s+([A-Za-z_][A-Za-z0-9_]*)/gi)].map((m) => m[1] ?? ''));
    return [...new Set((mvp.duLieu?.bang ?? []).filter((b) => bang.has(b.ten)).flatMap((b) => b.cot.map((c) => c.ten)))];
  };
  /** Vị trí dòng lời "- <nhãn>: …" trong loi/ (đúng tệp, đúng dòng); không thấy thì vị trí thẻ. */
  const viTriDong = (the: { viTri: { tep: string; dong: number } }, nhan: string, giaTri: string): { tep: string; dong: number } => {
    for (const d of nguonLoi?.doanLoi ?? []) {
      const dong = d.dong.find((x) => x.chu === `- ${nhan}: ${giaTri}`);
      if (dong) return { tep: d.tep, dong: dong.so };
    }
    const vt = { ...the.viTri, thongBao: '' };
    const goc = nguonLoi ? traViTri(vt, nguonLoi.banDo) : vt;
    return { tep: goc.tep, dong: goc.dong };
  };
  const bao = (vt: { tep: string; dong: number }, thongBao: string): void => void loi.push(dinhDangLoi({ ...vt, thongBao }));

  // ---------- 1. Gợi ý hai bậc ----------
  /** Thẻ được chuỗi của Vụ 1 gọi ([THỬ THÁCH x] / [SỬA TRUY VẤN x] trong kich-ban/0x-….md). */
  const theVu1 = new Set<string>();
  for (const c of mvp.chuoi) {
    if (!laVu1(c.viTri.tep)) continue;
    for (const it of c.items) if (it.kind === 'challenge' || it.kind === 'fix-query') theVu1.add(it.id);
  }
  let soGoiY = 0;
  const kiemBac = (vt: { tep: string; dong: number }, the: string, nhan: string, bac: 1 | 2, l: RawLine, tenCot: readonly string[]): void => {
    const dau = `thẻ ${the}, "${nhan}" bậc ${bac}`;
    if (l.speaker === 'player' || l.speaker === 'narrator') bao(vt, `${dau}: người gợi ý phải là một nhân vật đi cùng, không phải "${l.speaker}"`);
    else {
      const n = nhanVat.get(l.speaker);
      if (!n) bao(vt, `${dau}: người nói lạ "${l.speaker}"`);
      else if (l.expression !== null && !n.bieuCam.includes(l.expression)) bao(vt, `${dau}: nhân vật ${l.speaker} không có biểu cảm "${l.expression}"`);
    }
    if (l.text.trim() === '') bao(vt, `${dau}: lời trống`);
    const lenh = TU_CAU_LENH.exec(l.text);
    if (lenh) bao(vt, `${dau}: có từ của câu lệnh "${lenh[0]}" — gợi ý nói bằng chữ trên màn hình ("LẤY CỘT", tên cột), không nói từ của câu lệnh`);
    if (DAU_CAM.test(l.text)) bao(vt, `${dau}: có gạch dài hoặc mũi tên`);
    if (bac === 1) {
      const cot = tenCot.find((c) => new RegExp(`(?<![\\p{L}\\p{N}_])${c.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}(?![\\p{L}\\p{N}_])`, 'u').test(l.text));
      if (cot) bao(vt, `${dau}: lộ đáp án, có tên cột "${cot}" — bậc 1 chỉ nói điều còn thiếu về mặt điều tra`);
      const nut = CHU_TREN_MAN.exec(l.text);
      if (nut) bao(vt, `${dau}: lộ đáp án, có chữ trên màn tra "${nut[0]}" — để dành cho bậc 2`);
      const tt = THAO_TAC.exec(l.text);
      if (tt) bao(vt, `${dau}: nói thao tác ("${tt[0]}") — bậc 1 chỉ nói điều còn thiếu về mặt điều tra, thao tác để bậc 2`);
    }
  };
  for (const c of mvp.challenges) {
    const { goiY, loi: loiDoc } = docGoiY(c.fields);
    for (const l of loiDoc) bao(viTriDong(c, '', ''), `thẻ ${c.id}: ${l}`);
    if (goiY.length > 0 && !goiY.some((g) => g.khi === null)) bao(viTriDong(c, goiY[0]?.nhan ?? '', c.fields[goiY[0]?.nhan ?? ''] ?? ''), `thẻ ${c.id}: có dòng "Gợi ý khi …" thì phải có dòng "Gợi ý" chung (dùng khi không điều kiện nào khớp)`);
    for (const g of goiY) {
      soGoiY += 1;
      const vt = viTriDong(c, g.nhan, c.fields[g.nhan] ?? '');
      const tenCot = cotCuaThe(c.sql['SQL chuẩn'] ?? '');
      kiemBac(vt, c.id, g.nhan, 1, g.bac1, tenCot);
      kiemBac(vt, c.id, g.nhan, 2, g.bac2, tenCot);
      if (g.bac1.text.trim() === g.bac2.text.trim()) bao(vt, `thẻ ${c.id}, "${g.nhan}": bậc 2 phải nói rõ hơn bậc 1, không lặp y nguyên`);
    }
    if (theVu1.has(c.id) && !goiY.some((g) => g.khi === null)) bao(viTriDong(c, '', ''), `thẻ ${c.id}: màn tra trên tuyến chính của Vụ 1 phải có dòng "- Gợi ý: <bậc 1> <br> <bậc 2>" (gợi ý hai bậc của bạn đi cùng, gói B14)`);
  }

  // ---------- 2. Chữ trên giấy ----------
  let soChu = 0;
  let thieuVuSau = 0;
  for (const d of mvp.dossier) {
    const giaTri = chia(d.fields['Giá trị cho trình dựng']);
    const chu = d.fields['Chữ trên giấy'];
    for (const l of loiChuTrenGiay(chu, giaTri, false)) bao(d.viTri, `thẻ hồ sơ ${d.id}: ${l}`);
    if (chu !== undefined) soChu += chia(chu).length;
    else if (giaTri.length > 0) {
      if (laVu1(d.viTri.tep)) bao(d.viTri, `thẻ hồ sơ ${d.id}: giấy nhớ dùng ở màn tra của Vụ 1 phải có dòng "- Chữ trên giấy: …" (câu ngắn nói đó là gì, giá trị bọc **…**; ${giaTri.length} câu cho ${giaTri.length} giá trị)`);
      else thieuVuSau += giaTri.length;
    }
  }
  for (const c of mvp.challenges) {
    const ev = c.evidence;
    if (!ev) continue;
    const giaTri = chia(ev.giaTri);
    const vt = ((): { tep: string; dong: number } => {
      const goc = nguonLoi ? traViTri({ ...c.viTri, thongBao: '' }, nguonLoi.banDo) : c.viTri;
      return { tep: goc.tep, dong: goc.dong };
    })();
    if (ev.tachGiay && giaTri.length < 2) bao(vt, `vật chứng ${ev.id} của thẻ ${c.id}: "Giấy nhớ: mỗi giá trị một tờ" cần ít nhất hai giá trị ở "Giá trị cho trình dựng"`);
    for (const l of loiChuTrenGiay(ev.chuTrenGiay, giaTri, !ev.tachGiay && giaTri.length > 1)) bao(vt, `vật chứng ${ev.id} của thẻ ${c.id}: ${l}`);
    if (ev.chuTrenGiay !== undefined) soChu += chia(ev.chuTrenGiay).length;
    else if (giaTri.length > 0) {
      if (theVu1.has(c.id)) bao(vt, `vật chứng ${ev.id} của thẻ ${c.id}: phiếu dùng làm giấy nhớ ở màn tra của Vụ 1 phải có dòng con "  - Chữ trên giấy: …"`);
      else thieuVuSau += ev.tachGiay ? giaTri.length : 1;
    }
  }
  const tomTat = `màn tra: ${soGoiY} gợi ý hai bậc, ${soChu} tờ giấy nhớ có chữ${thieuVuSau > 0 ? ` (${thieuVuSau} tờ của các vụ sau chưa có "Chữ trên giấy")` : ''}`;
  return { loi, tomTat };
}
