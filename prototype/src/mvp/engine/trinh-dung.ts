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
export type GiaTriDung = { nguon: 'giay-nho'; tho: string } | { nguon: 'go'; tho: string };

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
