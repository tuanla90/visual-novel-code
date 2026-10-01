/** Trình dựng truy vấn tổng hợp Vụ 2. Tách khỏi `CauDung` để giữ nguyên grammar/chấm của chương 1. */
import type { BoDuLieuMvp } from '../../content/mvp/types';
import { dieuKienThanhSql, type DieuKienDung } from './trinh-dung';
import type { GiaTriSql, KetQuaChay } from './sql-mvp';

export interface CauTongHop {
  /** Bảng gốc hoặc ID phiếu kết quả. */
  nguonId: string;
  /** Tập con cột SELECT, phải gồm cột nhóm. */
  select: string[];
  where: DieuKienDung[];
  nhomTheo: string;
}

export interface NguonTongHop {
  id: string;
  sql: string | null;
  cot: { ten: string; kieu: 'TEXT' | 'INTEGER' }[];
}

export interface DongKetQuaTongHop {
  cot: string[];
  kieu: ('TEXT' | 'INTEGER')[];
  dong: GiaTriSql[][];
}

const quote = (s: string): string => `"${s.replace(/"/g, '""')}"`;

/** Resolve content marker `FROM @<card-id>` identically for the checker and runtime. */
export function giaiNguonSql(sql: string, nguon: NguonTongHop): string {
  if (!/^[a-z0-9_-]+$/i.test(nguon.id)) throw new Error('Mã nguồn không hợp lệ.');
  const marker = new RegExp(`\\bFROM\\s+@${nguon.id}(?![a-z0-9_-])`, 'i');
  const thay = nguon.sql === null ? `FROM ${quote(nguon.id)}` : `FROM (${nguon.sql}) AS ${quote(nguon.id)}`;
  if (!marker.test(sql)) throw new Error(`SQL chuẩn thiếu nguồn FROM @${nguon.id}.`);
  return sql.replace(marker, thay);
}

/** Tạo một SELECT tổng hợp chỉ từ nguồn/cột đã biết; không nhận SQL tự do từ UI. */
export function taoSqlTongHop(cau: CauTongHop, nguon: NguonTongHop): string {
  if (cau.nguonId !== nguon.id) throw new Error('Nguồn truy vấn không khớp phiếu đã chọn.');
  const cotHopLe = new Set(nguon.cot.map((c) => c.ten));
  if (!cotHopLe.has(cau.nhomTheo)) throw new Error(`Cột nhóm không thuộc nguồn: ${cau.nhomTheo}`);
  if (cau.select.length === 0 || cau.select.some((c) => !cotHopLe.has(c))) throw new Error('Chọn ít nhất một cột có trong nguồn.');
  if (!cau.select.includes(cau.nhomTheo)) throw new Error('Cột nhóm phải có trong SELECT.');
  if (cau.select.some((c) => c !== cau.nhomTheo)) throw new Error('Bản đầu chỉ SELECT cột nhóm và COUNT(*).');

  const kieu = (cot: string) => nguon.cot.find((c) => c.ten === cot)?.kieu ?? 'TEXT';
  const where = cau.where
    .map((d) => {
      if (!cotHopLe.has(d.cot)) throw new Error(`Cột điều kiện không thuộc nguồn: ${d.cot}`);
      const text = dieuKienThanhSql(d, kieu(d.cot));
      return text?.replaceAll(d.cot, quote(d.cot)) ?? null;
    })
    .filter((x): x is string => x !== null);
  const from = nguon.sql === null ? quote(nguon.id) : `(${nguon.sql}) AS ${quote(nguon.id)}`;
  return `SELECT ${quote(cau.nhomTheo)}, COUNT(*) AS "so_dong" FROM ${from}${where.length ? ` WHERE ${where.join(' AND ')}` : ''} GROUP BY ${quote(cau.nhomTheo)}`;
}

/** Mô tả schema kết quả COUNT theo một cột nhóm. */
export function cotKetQuaTongHop(cau: CauTongHop, nguon: NguonTongHop): DongKetQuaTongHop['kieu'] {
  return [nguon.cot.find((c) => c.ten === cau.nhomTheo)?.kieu ?? 'TEXT', 'INTEGER'];
}

/** Chuyển bộ dữ liệu cố định thành danh sách nguồn bảng. */
export function nguonBangTongHop(duLieu: BoDuLieuMvp): NguonTongHop[] {
  return duLieu.bang.map((b) => ({ id: b.ten, sql: null, cot: b.cot }));
}

/** Tạo metadata cột gốc từ một danh sách tên cột đã được kiểm tra. */
export function cotNguonTongHop(duLieu: BoDuLieuMvp, id: string, cot: readonly string[]): NguonTongHop | null {
  const bang = duLieu.bang.find((b) => b.ten === id);
  if (!bang) return null;
  return { id, sql: null, cot: cot.map((ten) => ({ ten, kieu: bang.cot.find((c) => c.ten === ten)?.kieu ?? 'TEXT' })) };
}

/** SQL checker/UI có thể dùng chung để chứng minh query hợp lệ trên SQLite. */
export async function chayTongHop(
  duLieu: BoDuLieuMvp,
  cau: CauTongHop,
  nguon: NguonTongHop,
  chay: (duLieu: BoDuLieuMvp, sql: string) => Promise<KetQuaChay>,
): Promise<{ sql: string; ketQua: KetQuaChay }> {
  const sql = taoSqlTongHop(cau, nguon);
  return { sql, ketQua: await chay(duLieu, sql) };
}
