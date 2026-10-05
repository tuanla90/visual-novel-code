/**
 * SQL CHO BẢN MVP: chạy thật câu SELECT trên bộ dữ liệu cố định của vụ (`KichBanMvp.duLieu`, từ du-lieu.md;
 * QĐ-087, QĐ-089) và chấm bằng cách so tập kết quả với câu SQL chuẩn của thẻ thử thách.
 *
 * Dùng chung loader sql.js của prototype (`sql-challenge/engine/sqljs.ts`: chạy được cả trình duyệt lẫn Vitest)
 * và bộ kiểm "một câu SELECT" (`sql-text.ts`). KHÔNG dùng `sql-challenge/engine/database.ts` vì bảng của
 * prototype (cột `clb`, dataset mẫu) khác bảng của MVP; MVP có thêm bảng ảo `tra_cuu_k24`.
 *
 * Chấm (đơn giản hơn compare.ts của prototype, đủ cho 3 thẻ MVP): đúng khi số dòng bằng nhau và mọi cột của kết
 * quả chuẩn ánh xạ được (theo giá trị, không cần đúng tên/thứ tự) vào một cột của người chơi sao cho đa tập các
 * bộ giá trị trùng nhau. Cột thừa không làm sai. Thẻ có `ORDER BY` ở SQL chuẩn (từ Vụ 2) thì chấm cả THỨ TỰ dòng: đủ đúng
 * các dòng mà khác thứ tự là "sai thứ tự" (`KetQuaSo.saiThuTu`, lời "Khi sai thứ tự" của thẻ).
 */
import type { BoDuLieuMvp, KhiChayMvp, LoiMvp, TheThuThachMvp } from '../../content/mvp/types';
import { checkSingleSelect } from '../../sql-challenge/engine/sql-text';
import { createDatabase, type Database } from '../../sql-challenge/engine/sqljs';

export type GiaTriSql = string | number | null;

export type KetQuaChay =
  | { ok: true; cot: string[]; dong: GiaTriSql[][] }
  | { ok: false; loai: 'khong-phai-select' | 'cu-phap' | 'khong-co-bang' | 'khong-co-cot' | 'khac'; thongDiep: string };

const ten = (t: string): string => `"${t}"`;

/** Dựng CSDL trong bộ nhớ từ bộ dữ liệu; bật `PRAGMA query_only` (như prototype, QĐ-006). */
export async function moCsdl(duLieu: BoDuLieuMvp): Promise<Database> {
  const db = await createDatabase();
  try {
    for (const b of duLieu.bang) {
      db.run(`CREATE TABLE ${ten(b.ten)} (${b.cot.map((c) => `${ten(c.ten)} ${c.kieu}`).join(', ')})`);
      const st = db.prepare(`INSERT INTO ${ten(b.ten)} VALUES (${b.cot.map(() => '?').join(', ')})`);
      try {
        for (const h of b.dong) st.run(h);
      } finally {
        st.free();
      }
    }
    for (const v of duLieu.bangAo) db.run(`CREATE VIEW ${ten(v.ten)} AS ${v.sql}`);
    db.run('PRAGMA query_only = ON');
  } catch (e) {
    db.close();
    throw e;
  }
  return db;
}

const cache = new WeakMap<BoDuLieuMvp, Promise<Database>>();

/** CSDL của một bộ dữ liệu — dựng một lần, dùng lại (dựng lỗi thì lần sau thử lại). */
export function layCsdl(duLieu: BoDuLieuMvp): Promise<Database> {
  let p = cache.get(duLieu);
  if (!p) {
    p = moCsdl(duLieu);
    p.catch(() => cache.delete(duLieu));
    cache.set(duLieu, p);
  }
  return p;
}

function phanLoaiLoi(thongDiep: string): Extract<KetQuaChay, { ok: false }>['loai'] {
  const m = thongDiep.toLowerCase();
  if (m.includes('no such table')) return 'khong-co-bang';
  if (m.includes('no such column')) return 'khong-co-cot';
  if (m.includes('syntax error') || m.includes('incomplete input') || m.includes('unrecognized token')) return 'cu-phap';
  return 'khac';
}

function giaTri(v: unknown): GiaTriSql {
  if (v === null || v === undefined) return null;
  if (typeof v === 'number' || typeof v === 'string') return v;
  if (typeof v === 'bigint') return Number(v);
  return String(v);
}

const THONG_DIEP_KHONG_SELECT = {
  empty: 'Chưa có câu SQL nào để chạy.',
  multiple: 'Chỉ chạy được một câu SQL mỗi lần.',
  not_select: 'Chỉ chấp nhận một câu SELECT (hoặc WITH … SELECT).',
} as const;

/** Số dòng tối đa của một kết quả (câu của người chơi, câu chuẩn). */
export const TOI_DA_DONG_KET_QUA = 2000;

/**
 * Chạy một câu SELECT chỉ-đọc; không bao giờ ném. `toiDa`: số dòng tối đa của kết quả (mặc định 2000); câu soi của hoạt cảnh
 * màn tra (một dòng 0/1 cho mỗi dòng của bảng) truyền số lớn hơn để bảng vài nghìn dòng vẫn có hoạt cảnh (gói B14).
 */
export async function chaySql(duLieu: BoDuLieuMvp, sql: string, toiDa: number = TOI_DA_DONG_KET_QUA): Promise<KetQuaChay> {
  const kiem = checkSingleSelect(sql.normalize('NFC').trim());
  if (!kiem.ok) return { ok: false, loai: 'khong-phai-select', thongDiep: THONG_DIEP_KHONG_SELECT[kiem.reason] };
  let db: Database;
  try {
    db = await layCsdl(duLieu);
  } catch (e) {
    return { ok: false, loai: 'khac', thongDiep: `Không nạp được SQLite: ${(e as Error).message}` };
  }
  let st;
  try {
    st = db.prepare(kiem.sql);
  } catch (e) {
    const thongDiep = (e as Error).message;
    return { ok: false, loai: phanLoaiLoi(thongDiep), thongDiep };
  }
  try {
    const cot = st.getColumnNames();
    const dong: GiaTriSql[][] = [];
    while (st.step()) {
      if (dong.length >= toiDa) return { ok: false, loai: 'khac', thongDiep: `Kết quả vượt quá ${toiDa} dòng.` };
      dong.push(st.get().map(giaTri));
    }
    return { ok: true, cot, dong };
  } catch (e) {
    const thongDiep = (e as Error).message;
    return { ok: false, loai: phanLoaiLoi(thongDiep), thongDiep };
  } finally {
    st.free();
  }
}

// ---------- So kết quả với chuẩn ----------

export interface KetQuaSo {
  /** Đúng: đủ dòng và mọi cột chuẩn khớp theo giá trị. */
  dung: boolean;
  soDongNguoiChoi: number;
  soDongChuan: number;
  /** Cột chuẩn không tìm được cột người chơi khớp giá trị (theo tên cột chuẩn). */
  cotThieu: string[];
  /** Chấm có thứ tự: tập dòng khớp nhưng thứ tự khác câu chuẩn. */
  saiThuTu?: boolean;
}

function daTap(dong: GiaTriSql[][], chiSo: number[]): Map<string, number> {
  const m = new Map<string, number>();
  for (const d of dong) {
    const k = JSON.stringify(chiSo.map((i) => d[i] ?? null));
    m.set(k, (m.get(k) ?? 0) + 1);
  }
  return m;
}

function cungDaTap(a: Map<string, number>, b: Map<string, number>): boolean {
  if (a.size !== b.size) return false;
  for (const [k, n] of a) if (b.get(k) !== n) return false;
  return true;
}

/** Tìm ánh xạ đơn ánh cột chuẩn → cột người chơi sao cho đa tập bộ giá trị trùng nhau (quay lui; kết quả nhỏ). */
function timAnhXa(chuan: Extract<KetQuaChay, { ok: true }>, nguoiChoi: Extract<KetQuaChay, { ok: true }>, thuTu = false): number[] | null {
  const n = chuan.cot.length;
  const daDung = new Set<number>();
  const anhXa: number[] = [];
  const cungThuTu = (): boolean => chuan.dong.every((d, r) => JSON.stringify(d.map((v) => v ?? null)) === JSON.stringify(anhXa.map((j) => nguoiChoi.dong[r]?.[j] ?? null)));
  const thu = (i: number): boolean => {
    if (i === n) return thuTu ? cungThuTu() : cungDaTap(daTap(chuan.dong, chuan.cot.map((_c, k) => k)), daTap(nguoiChoi.dong, anhXa));
    for (let j = 0; j < nguoiChoi.cot.length; j++) {
      if (daDung.has(j)) continue;
      // Cắt tỉa: từng cột phải khớp đa tập giá trị riêng.
      if (!cungDaTap(daTap(chuan.dong, [i]), daTap(nguoiChoi.dong, [j]))) continue;
      daDung.add(j);
      anhXa.push(j);
      if (thu(i + 1)) return true;
      anhXa.pop();
      daDung.delete(j);
    }
    return false;
  };
  return thu(0) ? anhXa : null;
}

/** Câu có `ORDER BY` (ngoài nháy đơn) → kết quả có thứ tự, chấm cả thứ tự dòng. */
export function coThuTu(sql: string): boolean {
  return /\bORDER\s+BY\b/i.test(sql.replace(/'(?:[^']|'')*'/g, "''"));
}

export function soVoiChuan(chuan: Extract<KetQuaChay, { ok: true }>, nguoiChoi: Extract<KetQuaChay, { ok: true }>, thuTu = false): KetQuaSo {
  const soDongNguoiChoi = nguoiChoi.dong.length;
  const soDongChuan = chuan.dong.length;
  if (soDongNguoiChoi !== soDongChuan) {
    // Lệch số dòng: báo cột thiếu theo tên để lời nhắc có ích.
    const cotThieu = chuan.cot.filter((c) => !nguoiChoi.cot.map((x) => x.toLowerCase()).includes(c.toLowerCase()));
    return { dung: false, soDongNguoiChoi, soDongChuan, cotThieu };
  }
  const anhXa = timAnhXa(chuan, nguoiChoi, thuTu);
  if (anhXa) return { dung: true, soDongNguoiChoi, soDongChuan, cotThieu: [] };
  if (thuTu && timAnhXa(chuan, nguoiChoi)) return { dung: false, soDongNguoiChoi, soDongChuan, cotThieu: [], saiThuTu: true };
  const cotThieu = chuan.cot.filter((_c, i) => !nguoiChoi.cot.some((_x, j) => cungDaTap(daTap(chuan.dong, [i]), daTap(nguoiChoi.dong, [j]))));
  return { dung: false, soDongNguoiChoi, soDongChuan, cotThieu };
}

export type KetQuaCham =
  | { trangThai: 'loi'; chay: Extract<KetQuaChay, { ok: false }> }
  | { trangThai: 'dung' | 'sai'; chay: Extract<KetQuaChay, { ok: true }>; so: KetQuaSo };

/** Chạy câu của người chơi và câu chuẩn của thẻ, so hai tập kết quả. */
export async function chamThuThach(duLieu: BoDuLieuMvp, sqlNguoiChoi: string, sqlChuan: string): Promise<KetQuaCham> {
  const chay = await chaySql(duLieu, sqlNguoiChoi);
  if (!chay.ok) return { trangThai: 'loi', chay };
  const chuan = await chaySql(duLieu, sqlChuan);
  if (!chuan.ok) return { trangThai: 'loi', chay: { ok: false, loai: 'khac', thongDiep: `SQL chuẩn của thẻ lỗi: ${chuan.thongDiep}` } };
  const so = soVoiChuan(chuan, chay, coThuTu(sqlChuan));
  return { trangThai: so.dung ? 'dung' : 'sai', chay, so };
}

/** 5 dòng đầu của một bảng / bảng ảo (nút "Xem 5 dòng đầu"). */
export function xemDongDau(duLieu: BoDuLieuMvp, bang: string, soDong = 5): Promise<KetQuaChay> {
  return chaySql(duLieu, `SELECT * FROM ${ten(bang)} LIMIT ${soDong}`);
}

/**
 * Lời nhân vật sau một lần chạy (dòng "Khi …" của thẻ, QĐ-092): đúng → "Khi đúng"; lỗi thiếu cột → "Khi lỗi không có cột"
 * (không có thì "Khi lỗi"); lỗi khác → "Khi lỗi"; đủ dòng nhưng sai thứ tự → "Khi sai thứ tự" (không có thì theo số dòng);
 * chạy được → "Khi chạy ra <n> dòng" đúng số dòng. Không khớp → [].
 */
export function phanUngSauKhiChay(the: Pick<TheThuThachMvp, 'phanUng'>, kq: KetQuaCham, cotDung?: readonly string[], thuaCot = false): LoiMvp[] {
  const tim = (f: (k: KhiChayMvp) => boolean): LoiMvp[] => the.phanUng.find((p) => f(p.khi))?.loi ?? [];
  // Bài chọn cột: đủ dòng, đủ cột cần nhưng lấy thừa cột (màn tra báo qua `thuaCot`).
  if (thuaCot) return tim((k) => k.kind === 'thua-cot');
  if (kq.trangThai === 'dung') return tim((k) => k.kind === 'dung');
  if (kq.trangThai === 'loi') {
    const cot = kq.chay.loai === 'khong-co-cot' ? tim((k) => k.kind === 'loi-cot') : [];
    return cot.length > 0 ? cot : tim((k) => k.kind === 'loi');
  }
  if (kq.so.saiThuTu) {
    const thuTu = tim((k) => k.kind === 'sai-thu-tu');
    if (thuTu.length > 0) return thuTu;
  }
  const n = kq.so.soDongNguoiChoi;
  // Đủ đúng số dòng mà thiếu cột của câu chuẩn → lời "Khi thiếu cột" (nếu thẻ có).
  if (n === kq.so.soDongChuan && kq.so.cotThieu.length > 0) {
    const thieu = tim((k) => k.kind === 'thieu-cot');
    if (thieu.length > 0) return thieu;
  }
  // Lời gắn với tập cột ("… với a, b") chỉ nói khi câu dùng đúng các cột đó — để lời tả đúng lý do; không có thì lời chung.
  const tap = cotDung ? [...new Set(cotDung)].sort().join(',') : null;
  const rieng = tap === null ? [] : tim((k) => k.kind === 'so-dong' && k.n === n && !!k.cot && [...k.cot].sort().join(',') === tap);
  return rieng.length > 0 ? rieng : tim((k) => k.kind === 'so-dong' && k.n === n && !k.cot);
}
