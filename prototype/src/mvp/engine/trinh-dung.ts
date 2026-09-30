/**
 * TRÌNH DỰNG CÂU PHÒNG MÁY (QĐ-092, mockup v7) — phần thuần, không React. Ba cách nhập cùng ra MỘT câu SQL chữ; máy
 * chấm câu đó như câu gõ tay (`sql-mvp.ts`), nên cách nhập không đổi luật chấm và đổi qua lại được bất cứ lúc nào.
 *
 * - **Kéo thả** (`keo`): khung `SELECT … FROM …` khóa theo SQL chuẩn của thẻ; người chơi dựng các điều kiện WHERE:
 *   chọn cột, phép ("bằng" / "bắt đầu bằng"), kéo giấy nhớ vào ô giá trị, nối AND/OR. Giá trị từ giấy nhớ được máy tự
 *   bọc nháy đơn khi là chữ (hoặc khi cột là cột chữ) — nên kéo [K24] vào cột số `khoa_hoc` ra `'K24'` → 0 dòng.
 *   Nút ✎ cho gõ lại nguyên giá trị (máy không thêm gì): chỗ duy nhất quên nháy được → lỗi "no such column".
 * - **Bấm khối** (`khoi`, kiểu SQL Police): bấm các mảnh (từ khóa, bảng, cột, phép, giá trị giấy nhớ, dấu nháy `'`,
 *   dấu `%`) nối vào cuối câu; giá trị giấy nhớ vào NGUYÊN chữ (không tự thêm nháy) — quên khối `'` là lỗi thật.
 * - **Gõ tay** (`go`): ô chữ tự do.
 */

export type CachNhap = 'keo' | 'khoi' | 'go';
export const CACH_NHAP: readonly CachNhap[] = ['keo', 'khoi', 'go'];
export const TEN_CACH_NHAP: Record<CachNhap, string> = { keo: 'Kéo thả', khoi: 'Bấm khối', go: 'Gõ tay' };

export type KieuCot = 'TEXT' | 'INTEGER';

export type PhepSo = 'bang' | 'bat-dau-bang';
export const TEN_PHEP: Record<PhepSo, string> = { bang: 'bằng', 'bat-dau-bang': 'bắt đầu bằng' };

/** Giá trị một điều kiện: từ giấy nhớ (máy tự bọc nháy khi cần) hay gõ tay qua ✎ (giữ nguyên chữ). */
export type GiaTriDung =
  /** `nhieu`: phiếu kết quả mang nhiều giá trị (vd hai lớp) — phép "bằng" thành `IN (…)` ("là một trong"). */
  | { nguon: 'giay-nho'; tho: string; nhieu?: string[]; /** Mã thẻ trên bảng điều tra mà giá trị này lấy từ (để vẽ sợi chỉ). */ the?: string }
  | { nguon: 'go'; tho: string };

export interface DieuKienDung {
  cot: string;
  phep: PhepSo;
  giaTri: GiaTriDung | null;
}

export interface CauDung {
  /** Phần `SELECT … FROM …` khóa sẵn (lấy từ SQL chuẩn của thẻ). */
  khung: string;
  dieuKien: DieuKienDung[];
  /** `noi[i]` nối điều kiện i với i+1. */
  noi: ('AND' | 'OR')[];
}

/** Tách `SELECT … FROM <bảng>` của SQL chuẩn làm khung khóa; `null` khi câu không có dạng đó. */
export function khungTuSqlChuan(sql: string): { khung: string; bang: string } | null {
  const m = /^\s*(SELECT\s+[\s\S]+?\s+FROM\s+([A-Za-z_][A-Za-z0-9_]*))\b/i.exec(sql);
  if (!m) return null;
  return { khung: (m[1] ?? '').replace(/\s+/g, ' ').trim(), bang: m[2] ?? '' };
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
  if (dk.giaTri.nguon === 'giay-nho' && dk.giaTri.nhieu && dk.giaTri.nhieu.length > 1) {
    const ds = dk.giaTri.nhieu.map((v) => giaTriTuGiayNho(v, kieuCot, dk.phep));
    return dk.phep === 'bat-dau-bang' ? `(${ds.map((v) => `${dk.cot} LIKE ${v}`).join(' OR ')})` : `${dk.cot} IN (${ds.join(', ')})`;
  }
  const gt = dk.giaTri.nguon === 'go' ? dk.giaTri.tho.trim() : giaTriTuGiayNho(dk.giaTri.tho, kieuCot, dk.phep);
  if (gt === '') return null;
  return `${dk.cot} ${phep} ${gt}`;
}

/** Cả câu: khung + các điều kiện đã có giá trị (bỏ qua ô trống), nối theo `noi`. */
export function thanhSql(cau: CauDung, kieuCot: (cot: string) => KieuCot): string {
  const phan: string[] = [];
  cau.dieuKien.forEach((dk, i) => {
    const chu = dieuKienThanhSql(dk, kieuCot(dk.cot));
    if (chu === null) return;
    if (phan.length > 0) phan.push(cau.noi[i - 1] ?? 'AND');
    phan.push(chu);
  });
  return phan.length === 0 ? cau.khung : `${cau.khung} WHERE ${phan.join(' ')}`;
}

/**
 * Câu có sẵn → cách dựng kéo thả (màn sửa truy vấn ở buổi họp, chương 1: người chơi chỉ cần bấm chữ HOẶC để đổi thành
 * VÀ). Mỗi điều kiện `cot = 'x'` / `cot = 5` / `cot LIKE 'x%'` thành một ô với giá trị như giấy nhớ; điều kiện khác
 * giữ nguyên chữ (như gõ tay qua ✎). `null` khi câu không tách được (có ngoặc, GROUP BY…).
 */
export function cauTuSql(sql: string): CauDung | null {
  const t = tachWhere(sql);
  if (!t) {
    const k = khungTuSqlChuan(sql);
    return k && !/\bWHERE\b/i.test(sql) ? { khung: k.khung, dieuKien: [], noi: [] } : null;
  }
  const dieuKien = t.dieuKien.map((d): DieuKienDung => {
    const bang = /^([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(?:'((?:[^']|'')*)'|(-?\d+(?:\.\d+)?))$/.exec(d);
    if (bang) return { cot: bang[1] ?? '', phep: 'bang', giaTri: { nguon: 'giay-nho', tho: (bang[2] ?? bang[3] ?? '').replace(/''/g, "'") } };
    const trong = /^([A-Za-z_][A-Za-z0-9_]*)\s+IN\s*\(([^()]*)\)$/i.exec(d);
    if (trong) {
      const ds = [...(trong[2] ?? '').matchAll(/'((?:[^']|'')*)'|(-?\d+(?:\.\d+)?)/g)].map((x) => (x[1] ?? x[2] ?? '').replace(/''/g, "'"));
      if (ds.length > 0) return { cot: trong[1] ?? '', phep: 'bang', giaTri: { nguon: 'giay-nho', tho: ds.join(', '), nhieu: ds } };
    }
    const like = /^([A-Za-z_][A-Za-z0-9_]*)\s+LIKE\s+'((?:[^'%]|'')*)%'$/i.exec(d);
    if (like) return { cot: like[1] ?? '', phep: 'bat-dau-bang', giaTri: { nguon: 'giay-nho', tho: (like[2] ?? '').replace(/''/g, "'") } };
    const cot = /^([A-Za-z_][A-Za-z0-9_]*)\s*(=|LIKE)\s*([\s\S]+)$/i.exec(d);
    return { cot: cot?.[1] ?? '', phep: cot?.[2]?.toUpperCase() === 'LIKE' ? 'bat-dau-bang' : 'bang', giaTri: { nguon: 'go', tho: cot?.[3] ?? d } };
  });
  return { khung: t.khung, dieuKien, noi: t.noi };
}

// ---------- Bấm khối ----------

/**
 * Nối các khối thành câu: cách nhau một dấu cách, trừ bên trong cặp nháy đơn — ở đó khối dính liền nhau
 * (`'` + `B` + `'` → `'B'`, `'` + `H` + `%` + `'` → `'H%'`). Khối giá trị nhiều chữ ("Báo chí") là một khối.
 */
export function noiKhoi(khoi: readonly string[]): string {
  let ra = '';
  let trongNhay = false;
  for (const k of khoi) {
    if (k === "'") {
      if (trongNhay) ra += "'";
      else ra += (ra === '' ? '' : ' ') + "'";
      trongNhay = !trongNhay;
      continue;
    }
    if (trongNhay) ra += k;
    else ra += (ra === '' ? '' : ' ') + k;
  }
  return ra;
}

export const KHOI_TU_KHOA: readonly string[] = ['SELECT', '*', 'FROM', 'WHERE', 'AND', 'OR', '=', 'LIKE'];
export const KHOI_DAU: readonly string[] = ["'", '%'];

// ---------- Xem từng điều kiện (kế hoạch màn core v0.3 mục 2) ----------

export interface WhereTach {
  /** `SELECT … FROM <bảng>` của câu người chơi. */
  khung: string;
  bang: string;
  /** Từng điều kiện (chữ SQL) theo thứ tự. */
  dieuKien: string[];
  noi: ('AND' | 'OR')[];
}

/**
 * Tách WHERE PHẲNG (chỉ AND/OR, không ngoặc) thành từng điều kiện — tách ở AND/OR nằm ngoài nháy đơn. Câu có ngoặc,
 * GROUP BY, ORDER BY… hay không có WHERE → `null` (nút "Xem từng điều kiện" không hiện).
 */
export function tachWhere(sql: string): WhereTach | null {
  const cau = sql.trim().replace(/;\s*$/, '');
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
  const boIn = (d: string): string => d.replace(/'[^']*'/g, '').replace(/\bIN\s*\([^()]*\)/gi, 'IN');
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
  return `SELECT *, ${cot.join(', ')}, CASE WHEN ${giu} THEN 1 ELSE 0 END AS giu FROM ${t.bang} WHERE ${hoac} LIMIT ${toiDa}`;
}
