/**
 * TRÌNH DỰNG CÂU PHÒNG MÁY (QĐ-092, mockup v7) — phần thuần, không React. Màn tra v7 (`ui/v7/ManTraV7.tsx`) chỉ có MỘT
 * cách nhập (user chốt 30/09/2026): kéo giấy nhớ. Câu dựng ra là SQL chữ; máy chấm câu đó như câu gõ tay (`sql-mvp.ts`).
 *
 * Khung `SELECT … FROM …` khóa theo SQL chuẩn của thẻ; người chơi dựng các điều kiện WHERE: chọn cột, phép ("bằng" /
 * "bắt đầu bằng"), kéo giấy nhớ vào ô giá trị, nối AND/OR. Giá trị từ giấy nhớ được máy tự bọc nháy đơn khi là chữ
 * (hoặc khi cột là cột chữ) — nên kéo [K24] vào cột số `khoa_hoc` ra `'K24'` → 0 dòng. Giấy nhiều giá trị (phiếu kết
 * quả) với "bằng" thành `IN (…)`. Giá trị `nguon: 'go'` (giữ nguyên chữ) chỉ còn đến từ câu nạp sẵn có điều kiện lạ.
 *
 * Từ Vụ 2 có thêm hai khối, chỉ hiện khi SQL chuẩn của thẻ dùng tới (`khoiCuaThe`):
 *   - CHUẨN HÓA cột của một điều kiện trước khi so (`chuanHoa`): bỏ dấu cách thừa → `TRIM(cột)`, coi như chữ thường →
 *     `LOWER(cột)`, cả hai → `LOWER(TRIM(cột))`;
 *   - XẾP THEO một cột (`xep`) → `ORDER BY cột [DESC]`.
 * Từ Vụ 4 có khối NỐI VỚI bảng khác theo một cột chung (`noiBang`) → `FROM a JOIN b ON a.cot = b.cot`; cột trùng tên ở hai
 * bảng được viết `a.cot` (bảng gốc) trong điều kiện / xếp.
 */

export type KieuCot = 'TEXT' | 'INTEGER';

export type PhepSo = 'bang' | 'bat-dau-bang';
export const TEN_PHEP: Record<PhepSo, string> = { bang: 'bằng', 'bat-dau-bang': 'bắt đầu bằng' };

/** Giá trị một điều kiện: từ giấy nhớ (máy tự bọc nháy khi cần) hay gõ tay qua ✎ (giữ nguyên chữ). */
export type GiaTriDung =
  /** `nhieu`: phiếu kết quả mang nhiều giá trị (vd hai lớp) — phép "bằng" thành `IN (…)` ("là một trong"). */
  | { nguon: 'giay-nho'; tho: string; nhieu?: string[]; /** Mã thẻ trên bảng điều tra mà giá trị này lấy từ (để vẽ sợi chỉ). */ the?: string }
  | { nguon: 'go'; tho: string };

/** Cách gọt cột trước khi so: y nguyên / bỏ dấu cách đầu cuối (TRIM) / coi như chữ thường (LOWER) / cả hai. */
export type ChuanHoa = 'khong' | 'got' | 'thuong' | 'got-thuong';
export const VONG_CHUAN_HOA: readonly ChuanHoa[] = ['khong', 'got', 'thuong', 'got-thuong'];
export const TEN_CHUAN_HOA: Record<ChuanHoa, string> = {
  khong: 'y nguyên',
  got: 'bỏ dấu cách thừa',
  thuong: 'đổi chữ thường',
  'got-thuong': 'bỏ cách + chữ thường',
};

export interface DieuKienDung {
  cot: string;
  phep: PhepSo;
  giaTri: GiaTriDung | null;
  /** Không có = y nguyên. */
  chuanHoa?: ChuanHoa;
}

/** Cột sau khi gọt, thành chữ SQL: `TRIM(cot)`, `LOWER(cot)`, `LOWER(TRIM(cot))`. */
export function cotThanhSql(cot: string, chuanHoa: ChuanHoa | undefined): string {
  switch (chuanHoa) {
    case 'got':
      return `TRIM(${cot})`;
    case 'thuong':
      return `LOWER(${cot})`;
    case 'got-thuong':
      return `LOWER(TRIM(${cot}))`;
    default:
      return cot;
  }
}

/** Che chữ trong nháy đơn (giữ nguyên độ dài) để tìm từ khóa mà không dính giá trị. */
const cheNhay = (sql: string): string => sql.replace(/'(?:[^']|'')*'/g, (m) => 'x'.repeat(m.length));

/** Khối trình dựng cần cho một thẻ, suy từ SQL chuẩn: có LOWER/TRIM → khối chuẩn hóa; có ORDER BY → khối xếp theo. */
export function khoiCuaThe(sqlChuan: string): { chuanHoa: boolean; sapXep: boolean; noi: boolean } {
  const che = cheNhay(sqlChuan);
  return { chuanHoa: /\b(?:LOWER|TRIM)\s*\(/i.test(che), sapXep: /\bORDER\s+BY\b/i.test(che), noi: /\bJOIN\b/i.test(che) };
}

export interface XepTheo {
  cot: string;
  /** `true` = giảm dần (`DESC`). */
  giam: boolean;
}

/** Khối nối bảng: bảng thứ hai và cột chung dùng làm khóa nối. */
export interface NoiBang {
  bang: string;
  cot: string;
}

/** Bảng gốc của khung `SELECT … FROM <bảng>`. */
export function bangGocCuaKhung(khung: string): string {
  return /\bFROM\s+([A-Za-z_][A-Za-z0-9_]*)\s*$/i.exec(khung.trim())?.[1] ?? '';
}

/** Các bảng được nối trong SQL chuẩn (`JOIN <bảng>`), theo thứ tự xuất hiện. */
export function bangNoiTrongSql(sql: string): string[] {
  return [...cheNhay(sql).matchAll(/\bJOIN\s+([A-Za-z_][A-Za-z0-9_]*)/gi)].map((m) => m[1] ?? '').filter(Boolean);
}

export interface CauDung {
  /** Phần `SELECT … FROM …` khóa sẵn (lấy từ SQL chuẩn của thẻ). */
  khung: string;
  dieuKien: DieuKienDung[];
  /** `noi[i]` nối điều kiện i với i+1. */
  noi: ('AND' | 'OR')[];
  /** Khối "xếp theo"; không có / `null` = không xếp. */
  xep?: XepTheo | null;
  /** Khối "nối với"; không có / `null` = không nối. */
  noiBang?: NoiBang | null;
}

/** Tách `SELECT … FROM <bảng>` của SQL chuẩn làm khung khóa; `null` khi câu không có dạng đó. */
export function khungTuSqlChuan(sql: string): { khung: string; bang: string } | null {
  const m = /^\s*(SELECT\s+[\s\S]+?\s+FROM\s+([A-Za-z_][A-Za-z0-9_]*))\b/i.exec(sql);
  if (!m) return null;
  return { khung: (m[1] ?? '').replace(/\s+/g, ' ').trim(), bang: m[2] ?? '' };
}

/** Tách phần `ORDER BY …` ở cuối câu (ngoài nháy): trả câu đã bỏ và khối xếp (chỉ nhận MỘT cột, ASC/DESC). */
export function tachXep(sql: string): { cau: string; xep: XepTheo | null; la: boolean } {
  const cau = sql.trim().replace(/;\s*$/, '');
  const i = cheNhay(cau).search(/\s+ORDER\s+BY\s/i);
  if (i < 0) return { cau, xep: null, la: false };
  const m = /^\s+ORDER\s+BY\s+([A-Za-z_][A-Za-z0-9_]*)(?:\s+(ASC|DESC))?\s*$/i.exec(cau.slice(i));
  // `la`: có ORDER BY nhưng không phải dạng một cột — không dựng lại được bằng khối.
  return { cau: cau.slice(0, i), xep: m ? { cot: m[1] ?? '', giam: (m[2] ?? '').toUpperCase() === 'DESC' } : null, la: !m };
}

/** `cot`, `TRIM(cot)`, `LOWER(cot)`, `LOWER(TRIM(cot))` (hay `TRIM(LOWER(cot))`) → cột + cách gọt; dạng khác → `null`. */
export function tachCot(bieuThuc: string): { cot: string; chuanHoa: ChuanHoa } | null {
  const b = bieuThuc.trim();
  const tran = /^[A-Za-z_][A-Za-z0-9_]*$/.exec(b);
  if (tran) return { cot: b, chuanHoa: 'khong' };
  const mot = /^(LOWER|TRIM)\s*\(\s*([A-Za-z_][A-Za-z0-9_]*)\s*\)$/i.exec(b);
  if (mot) return { cot: mot[2] ?? '', chuanHoa: (mot[1] ?? '').toUpperCase() === 'TRIM' ? 'got' : 'thuong' };
  const hai = /^(LOWER|TRIM)\s*\(\s*(LOWER|TRIM)\s*\(\s*([A-Za-z_][A-Za-z0-9_]*)\s*\)\s*\)$/i.exec(b);
  if (hai && (hai[1] ?? '').toUpperCase() !== (hai[2] ?? '').toUpperCase()) return { cot: hai[3] ?? '', chuanHoa: 'got-thuong' };
  return null;
}

const LA_SO = /^-?\d+(?:\.\d+)?$/;

/** Chữ SQL của một giá trị từ giấy nhớ: số đặt vào cột số → để trần; còn lại → nháy đơn (nháy trong chữ nhân đôi). */
export function giaTriTuGiayNho(tho: string, kieuCot: KieuCot, phep: PhepSo): string {
  if (phep === 'bat-dau-bang') return `'${tho.replace(/'/g, "''")}%'`;
  if (kieuCot === 'INTEGER' && LA_SO.test(tho.trim())) return tho.trim();
  return `'${tho.replace(/'/g, "''")}'`;
}

/** Một điều kiện thành chữ; `null` khi chưa có giá trị. ✎ giữ nguyên chữ người chơi gõ (kể cả thiếu nháy). */
export function dieuKienThanhSql(dk: DieuKienDung, kieuCot: KieuCot): string | null {
  if (!dk.giaTri) return null;
  const phep = dk.phep === 'bat-dau-bang' ? 'LIKE' : '=';
  const cot = cotThanhSql(dk.cot, dk.chuanHoa);
  if (dk.giaTri.nguon === 'giay-nho' && dk.giaTri.nhieu && dk.giaTri.nhieu.length > 1) {
    const ds = dk.giaTri.nhieu.map((v) => giaTriTuGiayNho(v, kieuCot, dk.phep));
    return dk.phep === 'bat-dau-bang' ? `(${ds.map((v) => `${cot} LIKE ${v}`).join(' OR ')})` : `${cot} IN (${ds.join(', ')})`;
  }
  const gt = dk.giaTri.nguon === 'go' ? dk.giaTri.tho.trim() : giaTriTuGiayNho(dk.giaTri.tho, kieuCot, dk.phep);
  if (gt === '') return null;
  return `${cot} ${phep} ${gt}`;
}

/** Khối xếp theo thành chữ (kèm dấu cách đầu); không xếp → rỗng. */
export function xepThanhSql(xep: XepTheo | null | undefined): string {
  return xep && xep.cot !== '' ? ` ORDER BY ${xep.cot}${xep.giam ? ' DESC' : ''}` : '';
}

/**
 * Cả câu: khung + các điều kiện đã có giá trị (bỏ qua ô trống), nối theo `noi`. `cotChung`: cột có ở cả hai bảng khi đã nối —
 * được viết `<bảng gốc>.<cột>` để SQLite không báo mơ hồ.
 */
export function thanhSql(cau: CauDung, kieuCot: (cot: string) => KieuCot, cotChung: readonly string[] = []): string {
  const nb = cau.noiBang && cau.noiBang.bang !== '' && cau.noiBang.cot !== '' ? cau.noiBang : null;
  const goc = bangGocCuaKhung(cau.khung);
  const q = (cot: string): string => (nb && cotChung.includes(cot) ? `${goc}.${cot}` : cot);
  const phan: string[] = [];
  cau.dieuKien.forEach((dk, i) => {
    const chu = dieuKienThanhSql({ ...dk, cot: q(dk.cot) }, kieuCot(dk.cot));
    if (chu === null) return;
    if (phan.length > 0) phan.push(cau.noi[i - 1] ?? 'AND');
    phan.push(chu);
  });
  const khung = nb ? `${cau.khung} JOIN ${nb.bang} ON ${goc}.${nb.cot} = ${nb.bang}.${nb.cot}` : cau.khung;
  const xep = cau.xep && cau.xep.cot !== '' ? { ...cau.xep, cot: q(cau.xep.cot) } : cau.xep;
  return `${phan.length === 0 ? khung : `${khung} WHERE ${phan.join(' ')}`}${xepThanhSql(xep)}`;
}

/**
 * Câu có sẵn → cách dựng kéo thả (màn sửa truy vấn ở buổi họp, chương 1: người chơi chỉ cần bấm chữ HOẶC để đổi thành
 * VÀ). Mỗi điều kiện `cot = 'x'` / `cot = 5` / `cot LIKE 'x%'` thành một ô với giá trị như giấy nhớ; điều kiện khác
 * giữ nguyên chữ (như gõ tay qua ✎). `null` khi câu không tách được (có ngoặc, GROUP BY…).
 */
export function cauTuSql(sql: string): CauDung | null {
  const x = tachXep(sql);
  if (x.la) return null;
  const coXep = x.xep ? { xep: x.xep } : {};
  const t = tachWhere(sql);
  if (!t) {
    const k = khungTuSqlChuan(sql);
    return k && !/\bWHERE\b/i.test(sql) ? { khung: k.khung, dieuKien: [], noi: [], ...coXep } : null;
  }
  // Vế trái: cột trần hoặc cột bọc LOWER / TRIM (tới hai lớp).
  const VE = String.raw`((?:(?:LOWER|TRIM)\s*\(\s*){0,2}[A-Za-z_][A-Za-z0-9_]*(?:\s*\)){0,2})`;
  const dieuKien = t.dieuKien.map((d): DieuKienDung => {
    const o = (ve: string | undefined, phep: PhepSo, giaTri: GiaTriDung): DieuKienDung | null => {
      const c = tachCot(ve ?? '');
      if (!c) return null;
      return c.chuanHoa === 'khong' ? { cot: c.cot, phep, giaTri } : { cot: c.cot, phep, giaTri, chuanHoa: c.chuanHoa };
    };
    const bang = new RegExp(String.raw`^${VE}\s*=\s*(?:'((?:[^']|'')*)'|(-?\d+(?:\.\d+)?))$`, 'i').exec(d);
    const oBang = bang ? o(bang[1], 'bang', { nguon: 'giay-nho', tho: (bang[2] ?? bang[3] ?? '').replace(/''/g, "'") }) : null;
    if (oBang) return oBang;
    const trong = new RegExp(String.raw`^${VE}\s+IN\s*\(([^()]*)\)$`, 'i').exec(d);
    if (trong) {
      const ds = [...(trong[2] ?? '').matchAll(/'((?:[^']|'')*)'|(-?\d+(?:\.\d+)?)/g)].map((v) => (v[1] ?? v[2] ?? '').replace(/''/g, "'"));
      const oTrong = ds.length > 0 ? o(trong[1], 'bang', { nguon: 'giay-nho', tho: ds.join(', '), nhieu: ds }) : null;
      if (oTrong) return oTrong;
    }
    const like = new RegExp(String.raw`^${VE}\s+LIKE\s+'((?:[^'%]|'')*)%'$`, 'i').exec(d);
    const oLike = like ? o(like[1], 'bat-dau-bang', { nguon: 'giay-nho', tho: (like[2] ?? '').replace(/''/g, "'") }) : null;
    if (oLike) return oLike;
    const cot = new RegExp(String.raw`^${VE}\s*(=|LIKE)\s*([\s\S]+)$`, 'i').exec(d);
    const phep: PhepSo = cot?.[2]?.toUpperCase() === 'LIKE' ? 'bat-dau-bang' : 'bang';
    return o(cot?.[1], phep, { nguon: 'go', tho: cot?.[3] ?? d }) ?? { cot: '', phep, giaTri: { nguon: 'go', tho: cot?.[3] ?? d } };
  });
  return { khung: t.khung, dieuKien, noi: t.noi, ...coXep };
}

// ---------- Xem từng điều kiện (kế hoạch màn core v0.3 mục 2) ----------

export interface WhereTach {
  /** `SELECT … FROM <bảng>` của câu người chơi. */
  khung: string;
  bang: string;
  /** Từng điều kiện (chữ SQL) theo thứ tự. */
  dieuKien: string[];
  noi: ('AND' | 'OR')[];
  /** Nguồn là phiếu đã ghim: phần `WITH <tên> AS (…) ` phải đứng trước mọi câu chạy trên `bang`. */
  tienTo?: string;
}

/**
 * Tên tạm (CTE) của một phiếu kết quả khi lấy làm nguồn: `ev-tin-don` → `tin_don`. Thẻ `Kiểu: lọc tiếp` viết SQL chuẩn với
 * `FROM @<mã phiếu>`; màn tra đổi thành `WITH <tên> AS (<câu của phiếu>) SELECT … FROM <tên> …`.
 */
export function tenCte(maPhieu: string): string {
  return maPhieu.replace(/^ev-/, '').replace(/[^a-z0-9]+/gi, '_').replace(/^(\d)/, 'p_$1');
}

/**
 * Tách WHERE PHẲNG (chỉ AND/OR, không ngoặc) thành từng điều kiện — tách ở AND/OR nằm ngoài nháy đơn. Câu có ngoặc,
 * GROUP BY… hay không có WHERE → `null` (nút "Xem từng điều kiện" không hiện). `ORDER BY` ở cuối được bỏ ra trước (xếp
 * không đổi dòng nào được giữ); cột bọc `LOWER(…)` / `TRIM(…)` vẫn là một điều kiện phẳng.
 */
export function tachWhere(sql: string): WhereTach | null {
  const cau = tachXep(sql).cau;
  const m = /^(SELECT\s+[\s\S]+?\s+FROM\s+([A-Za-z_][A-Za-z0-9_]*))\s+WHERE\s+([\s\S]+)$/i.exec(cau);
  if (!m) return null;
  const than = m[3] ?? '';
  const dieuKien: string[] = [];
  const noi: ('AND' | 'OR')[] = [];
  let dang = '';
  let trongNhay = false;
  const tu = than.split(/(\s+)/);
  for (const t of tu) {
    const soNhay = (t.match(/'/g) ?? []).length;
    if (!trongNhay && /^(AND|OR)$/i.test(t)) {
      if (dang.trim() === '') return null;
      dieuKien.push(dang.trim());
      noi.push(t.toUpperCase() as 'AND' | 'OR');
      dang = '';
    } else {
      dang += t;
    }
    if (soNhay % 2 === 1) trongNhay = !trongNhay;
  }
  if (trongNhay || dang.trim() === '') return null;
  dieuKien.push(dang.trim());
  // `cot IN ('a', 'b')` là một điều kiện phẳng (phiếu kết quả kéo vào ô); ngoặc khác thì không soi được.
  const HAM = /\b(?:LOWER|TRIM)\s*\(\s*[A-Za-z_][A-Za-z0-9_]*\s*\)/gi;
  const boIn = (d: string): string => d.replace(/'[^']*'/g, '').replace(/\bIN\s*\([^()]*\)/gi, 'IN').replace(HAM, 'cot').replace(HAM, 'cot');
  if (dieuKien.some((d) => /[()]/.test(boIn(d)) || /\b(GROUP|ORDER|LIMIT|HAVING)\b/i.test(d.replace(/'[^']*'/g, '')))) return null;
  return { khung: (m[1] ?? '').replace(/\s+/g, ' '), bang: m[2] ?? '', dieuKien, noi };
}

/**
 * Câu soi: mọi dòng của bảng thỏa ÍT NHẤT một điều kiện, kèm cột 0/1 cho từng điều kiện và cột "giữ" theo đúng cách
 * nối của người chơi — để thấy dòng nào qua cửa nào, vì sao AND loại mà OR giữ.
 */
export function cauSoiDieuKien(t: WhereTach, toiDa = 40): string {
  const cot = t.dieuKien.map((d, i) => `CASE WHEN ${d} THEN 1 ELSE 0 END AS dk${i + 1}`);
  const giu = t.dieuKien.reduce((acc, d, i) => (i === 0 ? `(${d})` : `${acc} ${t.noi[i - 1] ?? 'AND'} (${d})`), '');
  const hoac = t.dieuKien.map((d) => `(${d})`).join(' OR ');
  return `${t.tienTo ?? ''}SELECT *, ${cot.join(', ')}, CASE WHEN ${giu} THEN 1 ELSE 0 END AS giu FROM ${t.bang} WHERE ${hoac} ORDER BY giu DESC LIMIT ${toiDa}`;
}
