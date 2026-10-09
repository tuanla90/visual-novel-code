/**
 * LỜI TRONG TỜ DỮ KIỆN → TỆP LỜI GIẢ cho máy kiểm giọng (gói B12).
 *
 * Tờ dữ kiện `noi-dung-mua-1/hoi-dap/<mã>.json` chứa lời viết sẵn của nhân chứng (biến thể, từ chối, lời cho ý định chung…),
 * của bạn đi cùng (gợi ý, giữ lại) và của người chơi (câu hiện ở cách bấm). Máy kiểm giọng (`kiem-giong.ts`) chỉ đọc tệp lời
 * dạng `loi/*.md`, nên ở đây dựng một tệp lời giả: mỗi tờ một đoạn `## hd.<mã>`, mỗi lời một dòng
 * `- Khi hỏi đáp: **<người nói>**: <lời>` (dạng "Khi …" vì các biến thể thay thế nhau, được lặp câu như phản ứng "Khi …"),
 * kèm bản đồ dòng để báo lỗi về đúng dòng trong tệp JSON. Tên tệp giả là tên tệp kich-ban/ chứa dòng `- [HỎI ĐÁP <mã>]`, để
 * các luật theo thứ tự truyện ("từ:", "trước:") áp đúng chỗ. Không import gì từ `src/`.
 */
import { existsSync, readdirSync, readFileSync } from 'node:fs';
import { join } from 'node:path';

export interface TepLoiHoiDap {
  /** Tên tệp kich-ban/ (không đuôi) có dòng `- [HỎI ĐÁP <mã>]`; không thấy → mã tờ. */
  ten: string;
  /** Đường dẫn hiển thị của tệp JSON. */
  duongDan: string;
  /** Tệp lời giả. */
  noiDung: string;
  /** banDo[i] = dòng trong tệp JSON của dòng i+1 tệp lời giả. */
  banDo: number[];
}

/** Tệp lời viết sẵn của bạn đi cùng ("việc chính", "gợi ý"), không phải tờ dữ kiện. */
export const TEP_DONG_HANH = 'dong-hanh.json';
/**
 * Tên tệp lời (thứ tự truyện) mà lời của bạn đi cùng xếp vào (lời dùng từ Vụ 1). Mặc định cũ `01-ngay-1`; nội dung đổi tên tệp (vd `01-chang-1`)
 * thì lấy tệp đầu tiên của kich-ban/ không phải tệp mở đầu `00-…` (không có thì tệp đầu), hay giá trị khai ở `dong-hanh.json` (trường `tepLoi`).
 */
export const TEN_DONG_HANH_MAC_DINH = '01-ngay-1';
export function tenTepDongHanh(thuMucGoc: string, j: Json = {}): string {
  if (typeof j.tepLoi === 'string' && j.tepLoi.trim() !== '') return j.tepLoi.trim();
  const kb = join(thuMucGoc, 'kich-ban');
  if (!existsSync(kb)) return TEN_DONG_HANH_MAC_DINH;
  const ds = readdirSync(kb).filter((x) => x.endsWith('.md')).sort().map((x) => x.replace(/.md$/, ''));
  return ds.find((x) => !x.startsWith('00-')) ?? ds[0] ?? TEN_DONG_HANH_MAC_DINH;
}

type Json = Record<string, unknown>;
const laObj = (v: unknown): v is Json => typeof v === 'object' && v !== null && !Array.isArray(v);
const chuoi = (v: unknown): string[] => (typeof v === 'string' ? [v] : Array.isArray(v) ? v.filter((x): x is string => typeof x === 'string') : []);

/** Dòng (1-based) đầu tiên trong `raw` chứa chuỗi JSON của `chu`; không thấy → 1. */
export function dongTrongJson(raw: string, chu: string): number {
  const kim = JSON.stringify(chu);
  const i = raw.indexOf(kim);
  return i < 0 ? 1 : raw.slice(0, i).split('\n').length;
}

/** Mọi lời hiện cho người chơi trong một tờ, theo người nói. */
export function loiCuaTo(to: Json): { nguoi: string; chu: string }[] {
  const nc = typeof to.nhanChung === 'string' ? to.nhanChung : 'narrator';
  const ra: { nguoi: string; chu: string }[] = [];
  const them = (nguoi: string, v: unknown): void => {
    for (const c of chuoi(v)) if (c.trim() !== '') ra.push({ nguoi, chu: c });
  };
  them('narrator', to.moDau);
  for (const d of Array.isArray(to.duKien) ? to.duKien : []) {
    if (!laObj(d)) continue;
    if (laObj(d.bienThe)) for (const v of Object.values(d.bienThe)) them(nc, v);
    them(nc, d.tuChoi);
    them('player', chuoi(d.cauHoiMau)[0]);
    if (laObj(d.goiY)) {
      const ai = typeof d.goiY.ai === 'string' ? d.goiY.ai : 'narrator';
      them(ai, d.goiY.bac1);
      them('player', d.goiY.bac2);
    }
  }
  if (laObj(to.lopKhac)) {
    for (const [lop, x] of Object.entries(to.lopKhac)) {
      if (!laObj(x)) continue;
      them(nc, x.loi);
      them(nc, x.hetKe);
      if (lop === 'hoi-mo') {
        them('player', x.hoiTiep);
        them('player', chuoi(x.cauHoiMau)[0]);
      }
    }
  }
  for (const k of Array.isArray(to.chuDeKhongBiet) ? to.chuDeKhongBiet : []) if (laObj(k)) them(nc, k.loi);
  if (laObj(to.gioiHan)) {
    if (laObj(to.gioiHan.baoTruoc)) them(nc, to.gioiHan.baoTruoc.loi);
    them(nc, to.gioiHan.het);
  }
  if (laObj(to.roiDi)) {
    them('player', to.roiDi.loiBan);
    for (const k of ['giuLai', 'du', 'thieu'] as const) {
      const x = to.roiDi[k];
      if (laObj(x) && typeof x.ai === 'string') them(x.ai, x.loi);
    }
  }
  return ra;
}

/** Dựng tệp lời giả của một tờ. */
export function tepLoiTuTo(to: Json, raw: string, ten: string, duongDan: string): TepLoiHoiDap {
  const ma = typeof to.ma === 'string' && to.ma !== '' ? to.ma : 'khong-ma';
  const dong: string[] = [`# Lời · ${duongDan}`, `## hd.${ma}`];
  const banDo: number[] = [1, 1];
  for (const l of loiCuaTo(to)) {
    dong.push(`- Khi hỏi đáp: **${l.nguoi}**: ${l.chu.replace(/\s*\n\s*/g, ' ')}`);
    banDo.push(dongTrongJson(raw, l.chu));
  }
  return { ten, duongDan, noiDung: dong.join('\n'), banDo };
}

/** Tên tệp kich-ban/ (không đuôi) chứa dòng `- [HỎI ĐÁP <mã>]` của từng mã. */
export function tepCuaHoiDap(thuMucGoc: string): Map<string, string> {
  const ra = new Map<string, string>();
  const kb = join(thuMucGoc, 'kich-ban');
  if (!existsSync(kb)) return ra;
  for (const f of readdirSync(kb).filter((x) => x.endsWith('.md')).sort()) {
    for (const m of readFileSync(join(kb, f), 'utf8').matchAll(/^- \[HỎI ĐÁP ([a-z0-9-]+)\]\s*$/gm)) ra.set(m[1] ?? '', f.replace(/\.md$/, ''));
  }
  return ra;
}

/** Tệp lời giả của `dong-hanh.json`: mỗi lời viết sẵn một dòng của đúng bạn đi cùng nói nó. */
export function tepLoiDongHanh(j: Json, raw: string, duongDan: string, ten: string = TEN_DONG_HANH_MAC_DINH): TepLoiHoiDap {
  const dong: string[] = [`# Lời · ${duongDan}`, '## hd.dong-hanh'];
  const banDo: number[] = [1, 1];
  const loi = laObj(j.loi) ? j.loi : {};
  for (const [ban, x] of Object.entries(loi)) {
    if (!laObj(x)) continue;
    for (const v of Object.values(x)) {
      for (const c of chuoi(v)) {
        if (c.trim() === '') continue;
        dong.push(`- Khi hỏi bạn đi cùng: **${ban}**: ${c.replace(/\s*\n\s*/g, ' ')}`);
        banDo.push(dongTrongJson(raw, c));
      }
    }
  }
  return { ten, duongDan, noiDung: dong.join('\n'), banDo };
}

/** Tệp lời giả của mọi tờ trong `<thuMucGoc>/hoi-dap/` (bỏ chung.json; tệp JSON hỏng thì bỏ qua — bộ đọc báo lỗi). */
export function tepLoiHoiDap(thuMucGoc: string, hienThi: string): TepLoiHoiDap[] {
  const thuMuc = join(thuMucGoc, 'hoi-dap');
  if (!existsSync(thuMuc)) return [];
  const tepKb = tepCuaHoiDap(thuMucGoc);
  const ra: TepLoiHoiDap[] = [];
  for (const f of readdirSync(thuMuc).filter((x) => x.endsWith('.json') && x !== 'chung.json').sort()) {
    if (f === TEP_DONG_HANH) {
      const raw = readFileSync(join(thuMuc, f), 'utf8');
      try {
        const j: unknown = JSON.parse(raw);
        if (laObj(j)) ra.push(tepLoiDongHanh(j, raw, `${hienThi}/${f}`, tenTepDongHanh(thuMucGoc, j)));
      } catch {
        // JSON hỏng: bộ đọc báo lỗi.
      }
      continue;
    }
    const raw = readFileSync(join(thuMuc, f), 'utf8');
    let to: unknown;
    try {
      to = JSON.parse(raw);
    } catch {
      continue;
    }
    if (!laObj(to)) continue;
    const ma = typeof to.ma === 'string' ? to.ma : f.replace(/\.json$/, '');
    ra.push(tepLoiTuTo(to, raw, tepKb.get(ma) ?? ma, `${hienThi}/${f}`));
  }
  return ra;
}

/** Đổi `<tệp giả>:<dòng>:` ở đầu một dòng báo lỗi về dòng trong tệp JSON. */
export function traDongHoiDap(baoLoi: string, tep: readonly TepLoiHoiDap[]): string {
  for (const t of tep) {
    const m = /^:(\d+):/.exec(baoLoi.startsWith(t.duongDan) ? baoLoi.slice(t.duongDan.length) : '');
    if (!m) continue;
    return `${t.duongDan}:${t.banDo[Number(m[1]) - 1] ?? 1}:${baoLoi.slice(t.duongDan.length + m[0].length)}`;
  }
  return baoLoi;
}
