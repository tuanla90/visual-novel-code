/**
 * CHẠY THẬT câu SQL của kịch bản MVP trên bộ dữ liệu cố định (QĐ-089, đặc tả §18.10): nạp `BoDuLieuMvp`
 * (du-lieu-mvp.ts) vào SQLite trong bộ nhớ bằng sql.js (cùng thư viện game dùng trong trình duyệt), chạy từng
 * cặp `soDongKhai` (bộ chuyển đã gom từ [LỌC THỬ], [MÀN CHIẾU … · n dòng], "Số dòng kỳ vọng" của thẻ) và so
 * số dòng. Lỗi: `<tệp>:<dòng>: …` lấy từ `noi` của từng cặp.
 *
 * Chạy dưới Node (lệnh `kiem-noi-dung:mvp`, Vitest): đọc thẳng bytes `sql.js/dist/sql-wasm.wasm` rồi đưa qua
 * `wasmBinary` — không cần `locateFile`/fetch. Không import gì từ `src/`.
 */
import { readFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import initSqlJs from 'sql.js';
import type { Database, SqlJsStatic } from 'sql.js';
import type { BoDuLieuMvp } from './du-lieu-mvp.ts';

export interface KhaiSoDong {
  sql: string;
  soDong: number;
  noi: string;
  resultId?: string;
  sourceResultId?: string;
  sourceGroupColumn?: string;
}

export interface KetQuaChayMvp {
  /** Mỗi cặp khai: số dòng chạy thật (`null` = câu SQL lỗi hoặc chưa chạy được). */
  ketQua: (KhaiSoDong & { soDongThat: number | null })[];
  loi: string[];
}

let sqlJs: Promise<SqlJsStatic> | null = null;

function napSqlJs(): Promise<SqlJsStatic> {
  if (!sqlJs) {
    const duongDan = createRequire(import.meta.url).resolve('sql.js/dist/sql-wasm.wasm');
    const wasmBinary = new Uint8Array(readFileSync(duongDan)).buffer;
    sqlJs = initSqlJs({ wasmBinary }).catch((e: unknown) => {
      sqlJs = null;
      throw e;
    });
  }
  return sqlJs;
}

const tenSql = (ten: string): string => `"${ten}"`;

/** Dựng CSDL trong bộ nhớ từ bộ dữ liệu. Ném lỗi `<tệp>:<dòng>: …` nếu bảng hay bảng ảo không dựng được. */
export async function moCsdlMvp(duLieu: BoDuLieuMvp): Promise<Database> {
  const SQL = await napSqlJs();
  const db = new SQL.Database();
  try {
    for (const b of duLieu.bang) {
      const noi = `${b.viTri.tep}:${b.viTri.dong}`;
      try {
        db.run(`CREATE TABLE ${tenSql(b.ten)} (${b.cot.map((c) => `${tenSql(c.ten)} ${c.kieu}`).join(', ')})`);
        const st = db.prepare(`INSERT INTO ${tenSql(b.ten)} VALUES (${b.cot.map(() => '?').join(', ')})`);
        try {
          for (const h of b.dong) st.run(h);
        } finally {
          st.free();
        }
      } catch (e) {
        throw new Error(`${noi}: bảng ${b.ten}: không nạp được vào SQLite: ${(e as Error).message}`, { cause: e });
      }
    }
    for (const v of duLieu.bangAo) {
      try {
        db.run(`CREATE VIEW ${tenSql(v.ten)} AS ${v.sql}`);
        db.exec(`SELECT * FROM ${tenSql(v.ten)} LIMIT 0`); // bảng ảo trỏ cột/bảng không có chỉ lộ lỗi khi đọc
      } catch (e) {
        throw new Error(`${v.viTri.tep}:${v.viTri.dong}: bảng ảo ${v.ten}: câu SELECT lỗi: ${(e as Error).message}`, { cause: e });
      }
    }
  } catch (e) {
    db.close();
    throw e;
  }
  return db;
}

/** Đếm số dòng câu SELECT trả về. Chỉ nhận MỘT câu SELECT/WITH (dấu `;` cuối được phép). */
export function demDong(db: Database, sql: string): number {
  const cau = sql.trim().replace(/;\s*$/, '');
  if (!/^(select|with)\b/i.test(cau)) throw new Error('chỉ chạy được câu SELECT');
  // prepare() chỉ dịch câu đầu, câu sau bị bỏ im lặng → chặn nhiều câu (bỏ chữ trong '…' trước khi tìm ';').
  if (cau.replace(/'(?:[^']|'')*'/g, "''").includes(';')) throw new Error('mỗi chỗ khai chỉ được một câu SQL');
  const st = db.prepare(cau);
  try {
    let n = 0;
    while (st.step()) n++;
    return n;
  } finally {
    st.free();
  }
}

/** Resolve opt-in `FROM @evidence-id` placeholders against earlier canonical card queries. */
type NguonDaChay = Pick<KhaiSoDong, 'sql' | 'sourceResultId'> & { cot: string[] };
function moRongNguon(k: Pick<KhaiSoDong, 'sql' | 'sourceResultId' | 'sourceGroupColumn'>, daChay: Map<string, NguonDaChay>, stack = new Set<string>()): string {
  if (!k.sourceResultId) return k.sql;
  const id = k.sourceResultId;
  if (stack.has(id)) throw new Error(`phụ thuộc nguồn vòng lặp tại "${id}"`);
  const source = daChay.get(id);
  if (!source) throw new Error(`nguồn "${id}" chưa có SQL chuẩn đã kiểm ở phía trước`);
  if (k.sourceGroupColumn && !source.cot.includes(k.sourceGroupColumn)) throw new Error(`cột nhóm "${k.sourceGroupColumn}" không có trong kết quả nguồn "${id}" (${source.cot.join(', ')})`);
  const re = new RegExp(`\\bFROM\\s+@${id}\\b`, 'gi');
  if ([...k.sql.matchAll(re)].length !== 1) throw new Error(`SQL chuẩn phải tham chiếu nguồn đúng một lần bằng "FROM @${id}"`);
  const nested = moRongNguon(source, daChay, new Set([...stack, id]));
  return k.sql.replace(re, `FROM (${nested.replace(/;\s*$/, '')}) AS "${id}"`);
}

/** Tách `noi` dạng "<tệp>:<dòng> <mô tả>" để lỗi mở đúng dòng trong trình soạn thảo. */
function tachNoi(noi: string): { viTri: string; moTa: string } {
  const m = /^(\S+?:\d+)\s+(.*)$/.exec(noi);
  return m ? { viTri: m[1] ?? noi, moTa: m[2] ?? '' } : { viTri: noi, moTa: '' };
}

/**
 * Chạy từng câu khai trên bộ dữ liệu; lệch số dòng hay câu SQL lỗi → một dòng lỗi `<tệp>:<dòng>: …`.
 * `duLieu = null` mà có câu khai → lỗi ở từng câu (thiếu du-lieu.md).
 */
export async function kiemSoDongMvp(duLieu: BoDuLieuMvp | null, khai: readonly KhaiSoDong[]): Promise<KetQuaChayMvp> {
  const ketQua: KetQuaChayMvp['ketQua'] = [];
  const loi: string[] = [];
  if (khai.length === 0) return { ketQua, loi };
  if (!duLieu) {
    for (const k of khai) {
      const { viTri, moTa } = tachNoi(k.noi);
      loi.push(`${viTri}: ${moTa}: khai ${k.soDong} dòng nhưng noi-dung-mvp/ thiếu du-lieu.md để chạy thật (QĐ-089)`);
      ketQua.push({ ...k, soDongThat: null });
    }
    return { ketQua, loi };
  }
  let db: Database;
  try {
    db = await moCsdlMvp(duLieu);
  } catch (e) {
    return { ketQua: khai.map((k) => ({ ...k, soDongThat: null })), loi: [(e as Error).message] };
  }
  try {
    const daChay = new Map<string, NguonDaChay>();
    for (const k of khai) {
      const { viTri, moTa } = tachNoi(k.noi);
      const dau = `${viTri}: ${moTa === '' ? '' : `${moTa}: `}`;
      let that: number | null = null;
      let sqlChay = k.sql;
      try {
        sqlChay = moRongNguon(k, daChay);
        that = demDong(db, sqlChay);
        if (k.resultId) {
          const st = db.prepare(sqlChay.trim().replace(/;\s*$/, ''));
          try { daChay.set(k.resultId, { sql: k.sql, cot: st.getColumnNames() }); } finally { st.free(); }
        }
      } catch (e) {
        loi.push(`${dau}câu SQL lỗi khi chạy trên ${duLieu.viTri.tep}: ${(e as Error).message} — ${k.sql.replace(/\s+/g, ' ').trim()}`);
      }
      if (that !== null && that !== k.soDong) {
        loi.push(`${dau}khai ${k.soDong} dòng nhưng chạy thật trên ${duLieu.viTri.tep} ra ${that} dòng — ${k.sql.replace(/\s+/g, ' ').trim()}`);
      }
      ketQua.push({ ...k, soDongThat: that });
    }
  } finally {
    db.close();
  }
  return { ketQua, loi };
}
