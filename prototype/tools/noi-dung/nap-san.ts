/**
 * Đọc "Truy vấn nạp sẵn" của thẻ thử thách thành model trình dựng (đặc tả mục 9.1, trường
 * `Truy vấn nạp sẵn:` + `Nguồn điều kiện nạp sẵn:`).
 *
 * Chỉ nhận đúng dạng trình dựng sinh ra được: `SELECT <cột>, … FROM <bảng> [WHERE <đk> {AND|OR <đk>}] ;`
 * với một phép nối chung. Điều kiện: `<cột> = '<giá trị>'`, `<cột> LIKE '<x>%'|'%<x>'|'%<x>%'`,
 * `<cột> IN ('<a>', '<b>', …)`. Khác dạng đó thì báo lỗi — model nạp sẵn phải dựng lại được trong
 * trình dựng. Tệp này không import gì từ `src/`.
 */

export type NguonGiaTri = { kind: 'manual' } | { kind: 'clue'; clueId: string } | { kind: 'evidence'; evidenceId: string };

export interface DieuKienNapSan {
  id: string;
  column: string;
  op: 'eq' | 'startsWith' | 'endsWith' | 'contains' | 'in';
  value: string | string[];
  source: NguonGiaTri;
}

/** Cùng hình dạng với `QueryModel` của game (so bằng toEqual trong test). */
export interface ModelNapSan {
  table: string;
  columns: string[];
  conditions: DieuKienNapSan[];
  connector: 'AND' | 'OR' | null;
}

const ID = '[a-z_][a-z0-9_]*';
const CHUOI = "'((?:[^']|'')*)'";

function boNhay(s: string): string {
  return s.replace(/''/g, "'");
}

function docDieuKien(s: string): Omit<DieuKienNapSan, 'id' | 'source'> {
  let m = new RegExp(`^(${ID}) = ${CHUOI}$`).exec(s);
  if (m) return { column: m[1] ?? '', op: 'eq', value: boNhay(m[2] ?? '') };
  m = new RegExp(`^(${ID}) LIKE ${CHUOI}$`).exec(s);
  if (m) {
    const v = boNhay(m[2] ?? '');
    const dau = v.startsWith('%');
    const cuoi = v.endsWith('%');
    const loi = v.slice(dau ? 1 : 0, cuoi ? -1 : undefined);
    if (loi === '' || loi.includes('%')) throw new Error(`điều kiện LIKE lạ: "${s}"`);
    const op = dau && cuoi ? 'contains' : cuoi ? 'startsWith' : dau ? 'endsWith' : null;
    if (!op) throw new Error(`LIKE không có % — dùng "=": "${s}"`);
    return { column: m[1] ?? '', op, value: loi };
  }
  m = new RegExp(`^(${ID}) IN \\((.+)\\)$`).exec(s);
  if (m) {
    const phan = (m[2] ?? '').split(/\s*,\s*/);
    const value = phan.map((p) => {
      const q = new RegExp(`^${CHUOI}$`).exec(p);
      if (!q) throw new Error(`giá trị IN phải là chuỗi trong nháy đơn: "${p}"`);
      return boNhay(q[1] ?? '');
    });
    return { column: m[1] ?? '', op: 'in', value };
  }
  throw new Error(`điều kiện không dựng được trong trình dựng: "${s}"`);
}

function docNguon(ma: string): NguonGiaTri {
  if (ma === 'tu-nhap') return { kind: 'manual' };
  if (ma.startsWith('clue-')) return { kind: 'clue', clueId: ma };
  if (ma.startsWith('ev-')) return { kind: 'evidence', evidenceId: ma };
  throw new Error(`nguồn "${ma}" phải là clue-…, ev-… hoặc tu-nhap`);
}

/**
 * @param sql      khối ```sql dưới dòng `Truy vấn nạp sẵn:`
 * @param nguon    giá trị dòng `Nguồn điều kiện nạp sẵn:`, dạng `<id> ← <nguồn> · <id> ← <nguồn> …`,
 *                 đúng thứ tự điều kiện trong WHERE.
 */
export function docModelNapSan(sql: string, nguon: string): ModelNapSan {
  const gon = sql.replace(/\s+/g, ' ').trim().replace(/;$/, '').trim();
  const m = new RegExp(`^SELECT (.+?) FROM (${ID})(?: WHERE (.+))?$`).exec(gon);
  if (!m) throw new Error('truy vấn nạp sẵn phải có dạng SELECT … FROM <bảng> [WHERE …];');
  const columns = (m[1] ?? '').split(/\s*,\s*/);
  for (const c of columns) if (!new RegExp(`^${ID}$`).test(c)) throw new Error(`tên cột lạ trong SELECT: "${c}"`);
  const where = m[3];
  let connector: ModelNapSan['connector'] = null;
  let phan: string[] = [];
  if (where !== undefined) {
    // Tách theo AND/OR ngoài nháy đơn.
    const cat = where.split(/ (AND|OR) (?=(?:[^']*'[^']*')*[^']*$)/);
    phan = cat.filter((_, i) => i % 2 === 0);
    const noi = new Set(cat.filter((_, i) => i % 2 === 1));
    if (noi.size > 1) throw new Error('trình dựng chỉ có MỘT phép nối chung — không trộn AND với OR');
    connector = noi.size === 1 ? ([...noi][0] as 'AND' | 'OR') : null;
  }
  const cap = nguon.trim() === '' ? [] : nguon.split(' · ').map((s) => s.trim());
  if (cap.length !== phan.length) {
    throw new Error(`có ${phan.length} điều kiện trong WHERE nhưng ${cap.length} mục ở "Nguồn điều kiện nạp sẵn"`);
  }
  const conditions = phan.map((p, i): DieuKienNapSan => {
    const c = /^([a-z0-9-]+) ← ([a-z0-9-]+)$/.exec(cap[i] ?? '');
    if (!c) throw new Error(`mục nguồn thứ ${i + 1} phải có dạng "<id điều kiện> ← <nguồn>": "${cap[i] ?? ''}"`);
    return { id: c[1] ?? '', ...docDieuKien(p.trim()), source: docNguon(c[2] ?? '') };
  });
  return { table: m[2] ?? '', columns, conditions, connector };
}
