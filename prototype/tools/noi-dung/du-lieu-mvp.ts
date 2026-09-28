/**
 * BỘ ĐỌC DỮ LIỆU SQL cố định của bộ MVP: `noi-dung-mvp/du-lieu.md` (đặc tả §18.10, QĐ-089).
 *
 * Tách riêng một hàm (`docDuLieuMvp`) để gói sau đổi nguồn dữ liệu (YAML, CSV…) chỉ cần thay tệp này: đầu ra
 * `BoDuLieuMvp` là thứ duy nhất phần chạy SQL (sql-mvp.ts) và bộ chuyển (chuyen-mvp.ts) dùng.
 *
 * Cú pháp:
 *   ## <tên_bảng> {bảng}          + `- Cột: <cột> TEXT|INTEGER, …` + bảng Markdown (hàng tiêu đề = tên cột, đúng thứ tự)
 *   ## <tên_bảng_ảo> {bảng ảo}    + (tùy chọn) `- Ghi chú: …` + khối ```sql là một câu SELECT (thành CREATE VIEW)
 * Ô `NULL` là giá trị rỗng; ô trống là lỗi. Chú thích `<!-- … -->` (một hay nhiều dòng) bỏ qua.
 * Không ném lỗi: lỗi nằm trong `loi`, mỗi lỗi có `<tệp>:<dòng>`. Không import gì từ `src/`.
 */
import type { LoiNoiDung, ViTri } from './doc.ts';

export type KieuCot = 'TEXT' | 'INTEGER';
export type GiaTriO = string | number | null;

export interface BangDuLieuMvp {
  ten: string;
  cot: { ten: string; kieu: KieuCot }[];
  dong: GiaTriO[][];
  viTri: ViTri;
}

export interface BangAoMvp {
  ten: string;
  sql: string;
  viTri: ViTri;
}

export interface BoDuLieuMvp {
  bang: BangDuLieuMvp[];
  bangAo: BangAoMvp[];
  viTri: ViTri;
}

const TEN = '[a-z_][a-z0-9_]*';

/** Tách một dòng bảng Markdown `| a | b |` thành các ô (đã cắt khoảng trắng). */
function oCua(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, '')
    .replace(/\|$/, '')
    .split('|')
    .map((o) => o.trim());
}

export function docDuLieuMvp(tep: { duongDan: string; noiDung: string }): { duLieu: BoDuLieuMvp; loi: LoiNoiDung[] } {
  const loi: LoiNoiDung[] = [];
  const duLieu: BoDuLieuMvp = { bang: [], bangAo: [], viTri: { tep: tep.duongDan, dong: 1 } };
  const dongs = tep.noiDung.replace(/\r\n?/g, '\n').split('\n');
  const err = (dong: number, thongBao: string): void => void loi.push({ tep: tep.duongDan, dong, thongBao });

  let bang: BangDuLieuMvp | null = null;
  let bangAo: BangAoMvp | null = null;
  /** Trạng thái đọc bảng Markdown của `bang`: chưa gặp tiêu đề → đã có tiêu đề → đã có hàng gạch. */
  let buoc: 'cho-tieu-de' | 'cho-gach' | 'hang' = 'cho-tieu-de';
  let trongChuThich = false;
  let sqlMo: { dong: number; dongs: string[] } | null = null;
  const ten = new Map<string, number>();

  const dongBang = (): void => {
    if (bang && bang.cot.length === 0) err(bang.viTri.dong, `bảng ${bang.ten}: thiếu dòng "- Cột: <tên> TEXT|INTEGER, …"`);
    else if (bang && buoc !== 'hang') err(bang.viTri.dong, `bảng ${bang.ten}: thiếu bảng Markdown (hàng tiêu đề + hàng |---|) sau dòng "- Cột:"`);
    if (bangAo && bangAo.sql === '') err(bangAo.viTri.dong, `bảng ảo ${bangAo.ten}: thiếu khối \`\`\`sql (một câu SELECT)`);
    bang = null;
    bangAo = null;
    buoc = 'cho-tieu-de';
  };

  for (let i = 0; i < dongs.length; i++) {
    const so = i + 1;
    const line = dongs[i] ?? '';
    const t = line.trim();

    if (sqlMo) {
      if (t === '```') {
        const sql = sqlMo.dongs.join('\n').trim();
        const ao = bangAo as BangAoMvp | null;
        if (!ao) err(sqlMo.dong, 'khối ```sql chỉ dùng trong mục "## <tên> {bảng ảo}"');
        else if (ao.sql !== '') err(sqlMo.dong, `bảng ảo ${ao.ten}: chỉ một khối \`\`\`sql`);
        else if (!/^select\b/i.test(sql)) err(sqlMo.dong, `bảng ảo ${ao.ten}: khối sql phải là một câu SELECT`);
        else ao.sql = sql.replace(/;\s*$/, '');
        sqlMo = null;
      } else sqlMo.dongs.push(line);
      continue;
    }
    if (trongChuThich) {
      if (t.includes('-->')) trongChuThich = false;
      continue;
    }
    if (t.startsWith('<!--')) {
      if (!t.includes('-->')) trongChuThich = true;
      continue;
    }
    if (t === '') continue;

    if (i === 0 || (t.startsWith('# ') && !t.startsWith('## '))) {
      if (!/^# .+ \{dữ liệu: [a-z0-9-]+\}$/.test(t)) err(so, `tiêu đề tệp dữ liệu phải là "# <Tên> {dữ liệu: <mã vụ>}": "${t}"`);
      continue;
    }

    if (t.startsWith('## ')) {
      dongBang();
      const m = new RegExp(`^## (${TEN}) \\{(bảng|bảng ảo)\\}$`).exec(t);
      if (!m) {
        err(so, `tiêu đề mục phải là "## <tên_bảng> {bảng}" hoặc "## <tên_bảng> {bảng ảo}" (tên chữ thường, số, gạch dưới): "${t}"`);
        continue;
      }
      const tenBang = m[1] ?? '';
      const truoc = ten.get(tenBang);
      if (truoc !== undefined) err(so, `bảng "${tenBang}" khai hai lần (lần đầu ở dòng ${truoc})`);
      ten.set(tenBang, so);
      if (m[2] === 'bảng') {
        bang = { ten: tenBang, cot: [], dong: [], viTri: { tep: tep.duongDan, dong: so } };
        duLieu.bang.push(bang);
      } else {
        bangAo = { ten: tenBang, sql: '', viTri: { tep: tep.duongDan, dong: so } };
        duLieu.bangAo.push(bangAo);
      }
      continue;
    }

    if (t.startsWith('```')) {
      if (t !== '```sql') err(so, `khối mã phải mở bằng \`\`\`sql: "${t}"`);
      sqlMo = { dong: so, dongs: [] };
      continue;
    }

    const cur = bang as BangDuLieuMvp | null;
    if (cur) {
      const mCot = /^- Cột: (.+)$/.exec(t);
      if (mCot) {
        if (cur.cot.length > 0) err(so, `bảng ${cur.ten}: dòng "- Cột:" lặp lại`);
        else {
          for (const p of (mCot[1] ?? '').split(',').map((s) => s.trim())) {
            const c = new RegExp(`^(${TEN}) (TEXT|INTEGER)$`).exec(p);
            if (!c) err(so, `bảng ${cur.ten}: cột phải viết "<tên_cột> TEXT" hoặc "<tên_cột> INTEGER": "${p}"`);
            else if (cur.cot.some((x) => x.ten === c[1])) err(so, `bảng ${cur.ten}: cột "${c[1]}" lặp lại`);
            else cur.cot.push({ ten: c[1] ?? '', kieu: c[2] as KieuCot });
          }
        }
        continue;
      }
      if (t.startsWith('|')) {
        if (cur.cot.length === 0) {
          err(so, `bảng ${cur.ten}: khai "- Cột: <tên> TEXT|INTEGER, …" trước bảng Markdown`);
          continue;
        }
        const o = oCua(t);
        if (buoc === 'cho-tieu-de') {
          const mong = cur.cot.map((c) => c.ten);
          if (o.join('|') !== mong.join('|')) err(so, `bảng ${cur.ten}: hàng tiêu đề phải đúng tên cột theo thứ tự "- Cột:" (${mong.join(', ')}); đang là: ${o.join(', ')}`);
          buoc = 'cho-gach';
        } else if (buoc === 'cho-gach') {
          if (!o.every((x) => /^:?-{3,}:?$/.test(x))) err(so, `bảng ${cur.ten}: sau hàng tiêu đề phải là hàng gạch |---|---|`);
          buoc = 'hang';
        } else {
          if (o.length !== cur.cot.length) {
            err(so, `bảng ${cur.ten}: hàng có ${o.length} ô, bảng có ${cur.cot.length} cột`);
            continue;
          }
          const hang: GiaTriO[] = [];
          cur.cot.forEach((c, k) => {
            const v = o[k] ?? '';
            if (v === '') err(so, `bảng ${cur.ten}, cột ${c.ten}: ô trống — ghi NULL nếu cố ý để rỗng`);
            if (v === 'NULL') hang.push(null);
            else if (c.kieu === 'INTEGER') {
              if (!/^-?\d+$/.test(v)) err(so, `bảng ${cur.ten}, cột ${c.ten} (INTEGER): "${v}" không phải số nguyên`);
              hang.push(Number(v));
            } else hang.push(v);
          });
          cur.dong.push(hang);
        }
        continue;
      }
      err(so, `bảng ${cur.ten}: dòng lạ (chỉ có "- Cột:" và bảng Markdown): "${t}"`);
      continue;
    }

    const ao = bangAo as BangAoMvp | null;
    if (ao) {
      if (/^- Ghi chú: .+$/.test(t)) continue;
      err(so, `bảng ảo ${ao.ten}: dòng lạ (chỉ có "- Ghi chú:" và khối \`\`\`sql): "${t}"`);
      continue;
    }
    err(so, `dòng nằm ngoài mục "## <tên_bảng> {bảng}" nào: "${t}"`);
  }
  if (sqlMo) err(sqlMo.dong, 'khối ```sql chưa đóng');
  dongBang();
  if (duLieu.bang.length === 0) err(1, 'tệp dữ liệu không có bảng nào ("## <tên_bảng> {bảng}")');
  return { duLieu, loi };
}
