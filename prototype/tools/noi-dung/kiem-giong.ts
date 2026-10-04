/**
 * `npm run kiem-giong` — máy kiểm GIỌNG của lời thoại (`noi-dung-mvp/loi/`), theo luật trong `noi-dung-mvp/giong/luat-giong.md`.
 * Bắt những lỗi lặp đi lặp lại khi sửa lời (rà lời chương 1 ngày 30/09, duyệt bản v2 do Gemini viết ngày 03/10): sai xưng hô
 * theo khóa, gọi trống tên khóa trên, nét riêng của nhân vật này bị đặt vào miệng nhân vật khác, mất câu gài, nhân vật đã bỏ
 * vẫn xuất hiện, lời nhắc lộ đáp án, bong bóng quá dài, câu lặp nguyên văn; và GIỌNG AI (đảo ngược danh mục "Signs of AI
 * writing" của Wikipedia: mẫu sáo, dấu vết công cụ, tệp thiếu tiểu từ).
 *
 *   npm run kiem-giong                      kiểm loi/
 *   npm run kiem-giong -- --so <thư mục>    kiểm bản v2 (cùng tên tệp với loi/) và so với bản gốc: mã đoạn, điều kiện "Khi …",
 *                                           dữ kiện (số, ngày giờ, mã, nguyên văn trong ngoặc kép, biến {{…}}) bị mất,
 *                                           nhân vật mới chen vào đoạn
 *
 * LỖI (mã thoát 1) và CẢNH BÁO (chỉ nhắc). Mỗi dòng `<tệp>:<dòng>: [luật] …`. Chỉ đọc, không ghi tệp. Không import gì từ `src/`.
 * Biểu cảm sai, người nói chưa tới lượt xuất hiện… đã có ở `npm run kiem-noi-dung:mvp`, ở đây không kiểm lại.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join, relative, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { docTepLoi, type DoanLoi } from './ghep-loi.ts';

const GOC = fileURLToPath(new URL('../../noi-dung-mvp/', import.meta.url));

// ---------- Luật ----------

interface LuatXungHo {
  nguoi: string;
  tu: string[];
  tuTep?: string;
  truocTep?: string;
  vi: string;
  /** Nhãn trong báo lỗi: "xưng hô" hoặc "thuật ngữ" (## Thuật ngữ theo vai, cùng cú pháp). */
  nhan: string;
}

export interface LuatGiong {
  thuTu: string[];
  xungHo: LuatXungHo[];
  cachGoi: { ten: string; dung: string; nguoi: Set<string> }[];
  cumRieng: { cum: string; chi: Set<string>; vi: string }[];
  cauKhoa: { cau: string; o: string; vi: string }[];
  tenBo: { cum: string; vi: string }[];
  nhac: { mau: RegExp; vi: string }[];
  doDai: Map<string, number>;
  /** "## Chống giọng AI": mẫu sáo của văn AI, áp cho lời nhân vật ("thoại"), lời dẫn ("dẫn") hay cả hai. */
  chongAi: { mau: RegExp; loi: boolean; ap: 'thoại' | 'dẫn' | 'tất cả'; theChu: boolean; nhan: string; vi: string }[];
  /** "## Xưng theo người có mặt": từ cấm khi trong đoạn có / không có những người nhất định. */
  coMat: { nguoi: Set<string>; khiCo: Set<string>; truKhiCo: Set<string>; chiKhi: string[]; tu: string[]; loi: boolean; vi: string }[];
  /** "## Tiểu từ": tỉ lệ tối thiểu câu thoại có tiểu từ trong một tệp đủ cỡ. */
  tieuTu: { mau: RegExp; toiThieu: number; co: number; boQua: string[] } | null;
}

/** Tách `a · khóa: b · khóa2: c` thành phần đầu và các cặp khóa. */
function tachMuc(dong: string): { dau: string; khoa: Map<string, string> } {
  const [dau = '', ...con] = dong.split(' · ');
  const khoa = new Map<string, string>();
  for (const c of con) {
    const m = /^([^:]+):\s*(.*)$/.exec(c);
    if (m) khoa.set((m[1] ?? '').trim(), (m[2] ?? '').trim());
  }
  return { dau: dau.trim(), khoa };
}

const dsach = (s: string | undefined): string[] => (s ?? '').split(',').map((x) => x.trim()).filter(Boolean);
const boNgoac = (s: string): string => s.replace(/^"(.*)"$/, '$1');

export function docLuatGiong(noiDung: string): LuatGiong {
  const luat: LuatGiong = { thuTu: [], xungHo: [], cachGoi: [], cumRieng: [], cauKhoa: [], tenBo: [], nhac: [], doDai: new Map(), chongAi: [], tieuTu: null, coMat: [] };
  let phan = '';
  for (const dong of noiDung.replace(/<!--[\s\S]*?-->/g, '').split(/\r?\n/)) {
    const td = /^## (.+)$/.exec(dong);
    if (td) {
      phan = (td[1] ?? '').trim();
      continue;
    }
    const m = /^- (.+)$/.exec(dong.trim());
    if (!m) continue;
    const { dau, khoa } = tachMuc(m[1] ?? '');
    const vi = khoa.get('vì') ?? '';
    if (phan === 'Thứ tự truyện') luat.thuTu.push(dau);
    else if (phan === 'Xưng hô' || phan === 'Thuật ngữ theo vai')
      luat.xungHo.push({ nguoi: dau, tu: dsach(khoa.get('không nói')), tuTep: khoa.get('từ'), truocTep: khoa.get('trước'), vi, nhan: phan === 'Xưng hô' ? 'xưng hô' : 'thuật ngữ' });
    else if (phan === 'Cách gọi') {
      const [ten = '', dung = ''] = dau.split('→').map((x) => x.trim());
      luat.cachGoi.push({ ten, dung, nguoi: new Set(dsach(khoa.get('người nói'))) });
    } else if (phan === 'Cụm dành riêng') luat.cumRieng.push({ cum: boNgoac(dau), chi: new Set(dsach(khoa.get('chỉ'))), vi });
    else if (phan === 'Câu khóa') luat.cauKhoa.push({ cau: boNgoac(dau), o: khoa.get('ở') ?? '', vi });
    else if (phan === 'Tên đã bỏ') luat.tenBo.push({ cum: dau, vi });
    else if (phan === 'Lời nhắc không lộ đáp án') luat.nhac.push({ mau: new RegExp(dau, 'u'), vi });
    else if (phan === 'Độ dài') luat.doDai.set(dau, Number((m[1] ?? '').split(' · ')[1]));
    else if (phan === 'Chống giọng AI' || phan === 'Nói thẳng') {
      const ap = khoa.get('áp');
      luat.chongAi.push({ mau: new RegExp(dau, 'iu'), loi: khoa.get('mức') === 'lỗi', ap: ap === 'thoại' || ap === 'dẫn' ? ap : 'tất cả', theChu: khoa.get('thẻ chữ') === 'có', nhan: phan === 'Nói thẳng' ? 'nói thẳng' : 'giọng AI', vi });
    } else if (phan === 'Xưng theo người có mặt') {
      luat.coMat.push({
        nguoi: new Set(dsach(dau)),
        khiCo: new Set(dsach(khoa.get('khi có'))),
        truKhiCo: new Set(dsach(khoa.get('trừ khi có'))),
        chiKhi: dsach(khoa.get('chỉ khi câu có')),
        tu: dsach(khoa.get('không nói')),
        loi: khoa.get('mức') !== 'nhắc',
        vi,
      });
    } else if (phan === 'Tiểu từ') {
      luat.tieuTu = { mau: new RegExp(dau.replace(/^mẫu:\s*/, ''), 'iu'), toiThieu: Number(khoa.get('tối thiểu')), co: Number(khoa.get('cỡ')), boQua: dsach(khoa.get('bỏ qua')) };
    }
  }
  return luat;
}

// ---------- Đọc lời ----------

/** Một bong bóng hiện cho người chơi. `nguoi` = null cho lời nhắc "NHIỆM VỤ" (không ai nói). */
interface Bong {
  tep: string; // tên tệp không đuôi
  duongDan: string;
  dong: number;
  doan: string;
  nguoi: string | null;
  loai: 'thoai' | 'nhac';
  /** Phản ứng "- Khi …": các nhánh thay thế nhau nên được lặp câu. */
  khi: boolean;
  /** Thẻ chữ (ngày tháng, tiêu đề cảnh): không phải lời nói. */
  theChu: boolean;
  chu: string;
}

const THOAI = /\*\*([a-z0-9-]+)\*\*(?: \([^)]*\))?:\s*/g;

/** Thay `{{nv.<mã>[.đuôi]}}` bằng tên trong nhan-vat.md để luật đọc như người chơi đọc. */
function moBien(chu: string, ten: Map<string, string>): string {
  return chu.replace(/\{\{nv\.([a-z-]+)(?:\.[a-z.-]+)?\}\}/g, (_, ma: string) => (ma === 'nguoi-choi' ? 'Khoa' : (ten.get(ma) ?? ma)));
}

function tachBong(d: DoanLoi, tep: string, duongDan: string, ten: Map<string, string>): Bong[] {
  const out: Bong[] = [];
  for (const { chu, so } of d.dong) {
    const base = { tep, duongDan, dong: so, doan: d.ma, khi: chu.startsWith('- Khi '), theChu: chu.startsWith('- [THẺ CHỮ]') };
    const nv = /^> NHIỆM VỤ:\s*(.*)$/.exec(chu);
    if (nv) {
      out.push({ ...base, nguoi: null, loai: 'nhac', chu: moBien(nv[1] ?? '', ten) });
      continue;
    }
    const nh = /^> NHẮC VIỆC ([a-z0-9-]+)(?: \([^)]*\))?:\s*(.*)$/.exec(chu);
    if (nh) {
      out.push({ ...base, nguoi: nh[1] ?? null, loai: 'nhac', chu: moBien(nh[2] ?? '', ten) });
      continue;
    }
    if (chu.startsWith('- [DÀN DỰNG]')) continue;
    // Thoại thường, thẻ chữ, và "- Khi …: **a** (…): … <br> **b** (…): …"
    const than = chu.replace(/^- (?:\[THẺ CHỮ\] |Khi [^*]*?:\s*)?/, '');
    for (const phan of than.split(/\s*<br>\s*/)) {
      THOAI.lastIndex = 0;
      const m = THOAI.exec(phan);
      if (!m || m.index !== 0) continue;
      out.push({ ...base, nguoi: m[1] ?? null, loai: 'thoai', chu: moBien(phan.slice(m[0].length), ten) });
    }
  }
  return out;
}

function docTenNhanVat(): Map<string, string> {
  const ten = new Map<string, string>();
  for (const m of readFileSync(join(GOC, 'nhan-vat.md'), 'utf8').matchAll(/^### ([a-z0-9-]+) — (.+)$/gm)) ten.set(m[1] ?? '', (m[2] ?? '').trim());
  return ten;
}

// ---------- Kiểm ----------

export interface KetQuaGiong {
  loi: string[];
  canhBao: string[];
}

const thoat = (s: string): string => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
/** So nguyên từ tiếng Việt (chữ có dấu tính là chữ), không phân biệt hoa thường. */
const nguyenTu = (tu: string, co = 'giu'): RegExp => new RegExp(`(?<![\\p{L}\\p{N}])${thoat(tu)}(?![\\p{L}\\p{N}])`, co);
/** Bỏ phần trích nguyên văn trong ngoặc kép: nhại lời người khác không tính là xưng hô của người nói. */
const boTrich = (s: string): string => s.replace(/"[^"]*"|“[^”]*”/g, ' ');
/** "cậu ấy", "anh ấy"… là ngôi thứ ba, không phải xưng hô với người nghe. */
const boNgoiBa = (s: string): string => s.replace(/(?<![\p{L}])(cậu|anh|chị|em|bạn) ấy(?![\p{L}])/giu, ' ');
const soChu = (s: string): number => s.split(/\s+/).filter(Boolean).length;

export function kiemGiong(luat: LuatGiong, tepLoi: { ten: string; duongDan: string; noiDung: string }[]): KetQuaGiong & { bong: Bong[] } {
  const loi: string[] = [];
  const canhBao: string[] = [];
  const ten = docTenNhanVat();
  const viTriTep = new Map(luat.thuTu.map((t, i) => [t, i]));
  const bong: Bong[] = [];

  for (const t of tepLoi) {
    if (!viTriTep.has(t.ten)) loi.push(`${t.duongDan}:1: [thứ tự] tệp chưa có trong "## Thứ tự truyện" của giong/luat-giong.md`);
    for (const d of docTepLoi(t.duongDan, t.noiDung).doan) bong.push(...tachBong(d, t.ten, t.duongDan, ten));
  }
  const vt = (b: Bong): string => `${b.duongDan}:${b.dong}`;
  const trongKhoang = (tep: string, tu?: string, truoc?: string): boolean => {
    const i = viTriTep.get(tep);
    if (i === undefined) return true;
    if (tu !== undefined && i < (viTriTep.get(tu) ?? 0)) return false;
    if (truoc !== undefined && i >= (viTriTep.get(truoc) ?? Infinity)) return false;
    return true;
  };

  for (const b of bong) {
    const loiNoi = boTrich(b.chu);
    // Xưng hô
    for (const x of luat.xungHo) {
      if (b.nguoi !== x.nguoi || !trongKhoang(b.tep, x.tuTep, x.truocTep)) continue;
      for (const tu of x.tu) if (nguyenTu(tu).test(boNgoiBa(loiNoi))) loi.push(`${vt(b)}: [${x.nhan}] ${x.nguoi} nói "${tu}" — ${x.vi}`);
    }
    // Cách gọi
    if (b.nguoi) {
      for (const g of luat.cachGoi) {
        if (!g.nguoi.has(b.nguoi)) continue;
        const truocTen = g.dung.slice(0, g.dung.length - g.ten.length).toLowerCase();
        for (const m of loiNoi.matchAll(nguyenTu(g.ten))) {
          if (!loiNoi.slice(0, m.index).toLowerCase().endsWith(truocTen)) loi.push(`${vt(b)}: [cách gọi] ${b.nguoi} gọi trống "${g.ten}" — phải là "${g.dung}"`);
        }
      }
    }
    // Cụm dành riêng
    for (const c of luat.cumRieng) {
      if (b.nguoi && !c.chi.has(b.nguoi) && nguyenTu(c.cum).test(loiNoi)) canhBao.push(`${vt(b)}: [cụm riêng] ${b.nguoi} dùng "${c.cum}" — ${c.vi}`);
    }
    // Tên đã bỏ
    for (const tb of luat.tenBo) if (nguyenTu(tb.cum, 'u').test(b.chu)) loi.push(`${vt(b)}: [tên đã bỏ] "${tb.cum}" — ${tb.vi}`);
    // Lời nhắc
    if (b.loai === 'nhac') for (const n of luat.nhac) if (n.mau.test(b.chu)) loi.push(`${vt(b)}: [lời nhắc] "${b.chu}" — ${n.vi}`);
    // Độ dài
    const gioiHan = luat.doDai.get(b.nguoi ?? '') ?? luat.doDai.get('mặc định') ?? Infinity;
    const n = soChu(b.chu);
    if (n > gioiHan) canhBao.push(`${vt(b)}: [độ dài] ${b.nguoi ?? 'nhắc'} ${n} chữ (tối đa ${gioiHan})`);
    // Chống giọng AI
    {
      const laDan = b.nguoi === 'narrator';
      for (const r of luat.chongAi) {
        if (b.theChu && !r.theChu) continue;
        if ((r.ap === 'thoại' && laDan) || (r.ap === 'dẫn' && !laDan)) continue;
        const m = r.mau.exec(b.chu);
        if (m) (r.loi ? loi : canhBao).push(`${vt(b)}: [${r.nhan}] ${b.nguoi ?? 'nhắc'} "${m[0]}" — ${r.vi}`);
      }
    }
  }

  // Xưng theo người có mặt trong đoạn
  const coMatDoan = new Map<string, Set<string>>();
  const loiDoan = new Map<string, Bong[]>();
  for (const b of bong) loiDoan.set(`${b.tep}#${b.doan}`, [...(loiDoan.get(`${b.tep}#${b.doan}`) ?? []), b]);
  for (const b of bong) if (b.nguoi) coMatDoan.set(`${b.tep}#${b.doan}`, (coMatDoan.get(`${b.tep}#${b.doan}`) ?? new Set()).add(b.nguoi));
  for (const b of bong) {
    if (!b.nguoi || b.loai !== 'thoai') continue;
    const coMat = coMatDoan.get(`${b.tep}#${b.doan}`) ?? new Set<string>();
    const loiNoi = boNgoiBa(boTrich(b.chu));
    for (const r of luat.coMat) {
      if (!r.nguoi.has(b.nguoi) || ![...r.khiCo].some((x) => coMat.has(x)) || [...r.truKhiCo].some((x) => coMat.has(x))) continue;
      if (r.chiKhi.length && !r.chiKhi.some((t) => nguyenTu(t).test(loiNoi))) continue;
      for (const tu of r.tu) {
        // Người ngoài tự nói từ ấy trước trong đoạn (cô Hạnh dạy "bảng, cột, dòng") thì sinh viên được nói lại.
        if (loiDoan.get(`${b.tep}#${b.doan}`)?.some((x) => r.khiCo.has(x.nguoi ?? '') && x.dong < b.dong && nguyenTu(tu).test(x.chu))) continue;
        if (nguyenTu(tu).test(loiNoi)) (r.loi ? loi : canhBao).push(`${vt(b)}: [người có mặt] ${b.nguoi} nói "${tu}" khi có ${[...r.khiCo].filter((x) => coMat.has(x)).join(', ')} — ${r.vi}`);
      }
    }
  }

  // Tiểu từ: tệp đủ cỡ mà lời nhân vật ít tiểu từ quá thì nghe như văn viết.
  if (luat.tieuTu) {
    const { mau, toiThieu, co, boQua } = luat.tieuTu;
    const theoTep = new Map<string, { ten: string; duongDan: string; cau: number; co: number }>();
    for (const b of bong) {
      if (b.loai !== 'thoai' || b.theChu || b.nguoi === 'narrator') continue;
      const dem = theoTep.get(b.tep) ?? { ten: b.tep, duongDan: b.duongDan, cau: 0, co: 0 };
      for (const cau of b.chu.split(/(?<=[.!?…])\s+/)) {
        if (soChu(cau) < 3) continue;
        dem.cau += 1;
        if (mau.test(cau.trim())) dem.co += 1;
      }
      theoTep.set(b.tep, dem);
    }
    for (const d of theoTep.values()) {
      if (d.cau >= co && d.co / d.cau < toiThieu && !boQua.some((p) => d.ten.startsWith(p))) canhBao.push(`${d.duongDan}:1: [tiểu từ] ${d.co}/${d.cau} câu thoại có tiểu từ (${(d.co / d.cau).toFixed(2)} < ${toiThieu}) — nghe như văn viết`);
    }
  }

  // Câu khóa
  for (const k of luat.cauKhoa) {
    const t = tepLoi.find((x) => x.ten === k.o);
    if (!t) loi.push(`noi-dung-mvp/giong/luat-giong.md:1: [câu khóa] không có tệp lời "${k.o}"`);
    else if (!t.noiDung.includes(k.cau)) loi.push(`${t.duongDan}:1: [câu khóa] mất câu "${k.cau}" — ${k.vi}`);
  }

  // Câu lặp nguyên văn (≥ 7 chữ) ở hai đoạn khác nhau; câu khóa được lặp.
  const khoa = new Set(luat.cauKhoa.map((k) => k.cau.toLowerCase()));
  const gap = new Map<string, Bong[]>();
  for (const b of bong.filter((x) => !x.khi)) {
    for (const cau of boTrich(b.chu).split(/(?<=[.!?…])\s+/)) {
      const chuan = cau.toLowerCase().replace(/[^\p{L}\p{N}\s]/gu, '').replace(/\s+/g, ' ').trim();
      if (soChu(chuan) < 7 || khoa.has(cau.trim().toLowerCase())) continue;
      gap.set(chuan, [...(gap.get(chuan) ?? []), b]);
    }
  }
  for (const [cau, ds] of gap) {
    if (new Set(ds.map((b) => `${b.tep}#${b.doan}`)).size < 2) continue;
    canhBao.push(`${vt(ds[1] as Bong)}: [lặp] "${cau}" đã có ở ${ds.filter((_, i) => i !== 1).map(vt).join(', ')}`);
  }

  return { loi, canhBao, bong };
}

// ---------- So bản v2 với bản gốc ----------

/** Dữ kiện trong một đoạn: số, giờ, ngày, mã (BC24A, PX-19, kien-nghi-…), nguyên văn trong ngoặc kép, biến. */
function duKien(chu: string): Set<string> {
  const s = new Set<string>();
  for (const m of chu.matchAll(/\{\{[^}]+\}\}|"[^"]{3,}"|“[^”]{3,}”|\b[A-Z]{2,}[-0-9A-Z]*\d[0-9A-Z]*\b|\b[a-z]+(?:[-_][a-z0-9]+){2,}\b|\d+(?:[:h.,/]\d+)*/g)) s.add(m[0]);
  return s;
}

function soBanV2(goc: { ten: string; duongDan: string; noiDung: string }, moi: { duongDan: string; noiDung: string }): KetQuaGiong {
  const loi: string[] = [];
  const canhBao: string[] = [];
  const a = docTepLoi(goc.duongDan, goc.noiDung).doan;
  const b = docTepLoi(moi.duongDan, moi.noiDung).doan;
  const maA = a.map((d) => d.ma).join(' ');
  const maB = b.map((d) => d.ma).join(' ');
  if (maA !== maB) loi.push(`${moi.duongDan}:1: [mã đoạn] khác bản gốc — gốc: ${maA} | v2: ${maB}`);
  const theoMa = new Map(b.map((d) => [d.ma, d]));
  for (const da of a) {
    const db = theoMa.get(da.ma);
    if (!db) continue;
    const vtB = `${moi.duongDan}:${db.dongTieuDe}`;
    const khi = (d: DoanLoi): string => d.dong.map((x) => /^- (Khi [^*]*?):/.exec(x.chu)?.[1]).filter(Boolean).join(' | ');
    if (khi(da) !== khi(db)) loi.push(`${vtB}: [điều kiện] đoạn ${da.ma} đổi dòng "Khi …" — gốc: ${khi(da) || '(không)'} | v2: ${khi(db) || '(không)'}`);
    const chuA = da.dong.filter((x) => !x.chu.startsWith('- [DÀN DỰNG]')).map((x) => x.chu).join('\n');
    const chuB = db.dong.filter((x) => !x.chu.startsWith('- [DÀN DỰNG]')).map((x) => x.chu).join('\n');
    const mat = [...duKien(chuA)].filter((k) => !chuB.includes(k.replace(/^["“]|["”]$/g, '')));
    if (mat.length) canhBao.push(`${vtB}: [mất dữ kiện] đoạn ${da.ma}: ${mat.join(' · ')}`);
    const nguoi = (s: string): Set<string> => new Set([...s.matchAll(/\*\*([a-z0-9-]+)\*\*/g)].map((m) => m[1] ?? ''));
    const nA = nguoi(chuA);
    const moiVao = [...nguoi(chuB)].filter((x) => !nA.has(x));
    if (moiVao.length) canhBao.push(`${vtB}: [người nói mới] đoạn ${da.ma} thêm ${moiVao.join(', ')} — bản gốc không có`);
  }
  return { loi, canhBao };
}

// ---------- Chạy ----------

function docTepLoiThuMuc(thuMuc: string, hienThi: string): { ten: string; duongDan: string; noiDung: string }[] {
  return readdirSync(thuMuc)
    .filter((f) => f.endsWith('.md') && f !== 'README.md' && f !== 'DUYET.md')
    .sort()
    .map((f) => ({ ten: f.replace(/\.md$/, ''), duongDan: `${hienThi}/${f}`, noiDung: readFileSync(join(thuMuc, f), 'utf8') }));
}

export function chayKiemGiong(thuMucV2?: string): KetQuaGiong & { tomTat: string } {
  const luat = docLuatGiong(readFileSync(join(GOC, 'giong/luat-giong.md'), 'utf8'));
  const goc = docTepLoiThuMuc(join(GOC, 'loi'), 'noi-dung-mvp/loi');
  let tep = goc;
  const them: KetQuaGiong = { loi: [], canhBao: [] };
  if (thuMucV2) {
    const tuyetDoi = resolve(process.env.INIT_CWD ?? process.cwd(), thuMucV2);
    if (!existsSync(tuyetDoi)) throw new Error(`không thấy thư mục ${tuyetDoi}`);
    const v2 = docTepLoiThuMuc(tuyetDoi, relative(process.cwd(), tuyetDoi).split('\\').join('/'));
    for (const m of v2) {
      const g = goc.find((x) => x.ten === m.ten);
      if (!g) {
        them.loi.push(`${m.duongDan}:1: [so bản gốc] không có tệp gốc loi/${m.ten}.md`);
        continue;
      }
      const s = soBanV2(g, m);
      them.loi.push(...s.loi);
      them.canhBao.push(...s.canhBao);
    }
    // Kiểm giọng trên bộ lời đã thay các tệp v2 vào chỗ bản gốc.
    tep = goc.map((g) => v2.find((m) => m.ten === g.ten) ?? g);
  }
  const kq = kiemGiong(luat, tep);
  const loi = [...them.loi, ...kq.loi];
  const canhBao = [...them.canhBao, ...kq.canhBao];
  const tomTat = `kiem-giong: ${tep.length} tệp lời, ${kq.bong.length} bong bóng — ${loi.length} lỗi, ${canhBao.length} cảnh báo.`;
  return { loi, canhBao, tomTat };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const i = process.argv.indexOf('--so');
  const { loi, canhBao, tomTat } = chayKiemGiong(i >= 0 ? process.argv[i + 1] : undefined);
  const nhom = (ds: string[]): string[] => [...ds].sort((x, y) => (/\[([^\]]+)\]/.exec(x)?.[1] ?? '').localeCompare(/\[([^\]]+)\]/.exec(y)?.[1] ?? '') || x.localeCompare(y));
  for (const l of nhom(loi)) console.error(`LỖI  ${l}`);
  if (!process.argv.includes('--chi-loi')) for (const c of nhom(canhBao)) console.log(`nhắc ${c}`);
  console.log(tomTat);
  process.exitCode = loi.length === 0 ? 0 : 1;
}
