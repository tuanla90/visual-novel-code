/**
 * Ba cú pháp nhỏ dùng trong bộ MVP (đặc tả §13.1, §13.2, §18): điều kiện, hậu quả, mốc thời gian.
 * Hàm thuần, ném `Error` với thông báo tiếng Việt; nơi gọi gắn `<tệp>:<dòng>`. Không import gì từ `src/`.
 */

// ---------- Điều kiện: `có <mã>`, `không có <mã>`, `và`, `hoặc`, ngoặc ----------

export type DieuKien =
  | { kind: 'co'; id: string }
  | { kind: 'khong-co'; id: string }
  | { kind: 'va' | 'hoac'; cac: DieuKien[] }
  | { kind: 'bi-mat'; muc: number };

const MA_RE = /^[a-z0-9-]+$/;

function tokens(s: string): string[] {
  return s
    .replace(/\(/g, ' ( ')
    .replace(/\)/g, ' ) ')
    .trim()
    .split(/\s+/)
    .filter((t) => t !== '');
}

/** `có ev-x và (có clue-a hoặc có clue-b)` → cây điều kiện. */
export function docDieuKien(chu: string): DieuKien {
  const tk = tokens(chu);
  if (tk.length === 0) throw new Error('điều kiện trống');
  let i = 0;
  const peek = (): string | undefined => tk[i];
  const next = (): string => tk[i++] ?? '';
  const atom = (): DieuKien => {
    const t = next();
    if (t === '(') {
      const e = expr();
      if (next() !== ')') throw new Error('thiếu dấu ")" trong điều kiện');
      return e;
    }
    if (t === 'có') {
      const id = next();
      if (!MA_RE.test(id)) throw new Error(`sau "có" phải là một mã (clue-…, doc-…, ev-…): "${id}"`);
      return { kind: 'co', id };
    }
    if (t === 'không' && peek() === 'có') {
      next();
      const id = next();
      if (!MA_RE.test(id)) throw new Error(`sau "không có" phải là một mã: "${id}"`);
      return { kind: 'khong-co', id };
    }
    if (t === 'bí' && peek() === 'mật') {
      next(); // skip 'mật'
      if (next() !== '>=') throw new Error('dùng "bí mật >= n%"');
      const so = next();
      if (!so.endsWith('%')) throw new Error('dùng "bí mật >= n%" (thiếu dấu %)');
      const muc = Number(so.slice(0, -1));
      if (isNaN(muc) || muc < 0 || muc > 100) throw new Error(`số % không hợp lệ: "${so}"`);
      return { kind: 'bi-mat', muc };
    }
    throw new Error(`điều kiện chỉ nhận "có <mã>", "không có <mã>", "bí mật >= n%", "và", "hoặc", ngoặc — gặp "${t}"`);
  };
  const term = (): DieuKien => {
    const cac = [atom()];
    while (peek() === 'và') {
      next();
      cac.push(atom());
    }
    return cac.length === 1 ? (cac[0] as DieuKien) : { kind: 'va', cac };
  };
  const expr = (): DieuKien => {
    const cac = [term()];
    while (peek() === 'hoặc') {
      next();
      cac.push(term());
    }
    return cac.length === 1 ? (cac[0] as DieuKien) : { kind: 'hoac', cac };
  };
  const e = expr();
  if (i < tk.length) throw new Error(`điều kiện có phần thừa từ "${tk[i] ?? ''}"`);
  return e;
}

/** Mọi mã được nhắc trong điều kiện. */
export function maTrongDieuKien(dk: DieuKien): string[] {
  if (dk.kind === 'co' || dk.kind === 'khong-co') return [dk.id];
  if (dk.kind === 'bi-mat') return [];
  return dk.cac.flatMap(maTrongDieuKien);
}

/** Đánh giá với tập mã "đang có". */
export function danhGiaDieuKien(dk: DieuKien, co: ReadonlySet<string>, mucBiMat: number = 0): boolean {
  switch (dk.kind) {
    case 'co':
      return co.has(dk.id);
    case 'khong-co':
      return !co.has(dk.id);
    case 'va':
      return dk.cac.every((c) => danhGiaDieuKien(c, co, mucBiMat));
    case 'hoac':
      return dk.cac.some((c) => danhGiaDieuKien(c, co, mucBiMat));
    case 'bi-mat':
      return mucBiMat >= dk.muc;
  }
}

// ---------- Hậu quả: `mở manh mối x, lưu bằng chứng y, đặt co.z, đi tới <chuỗi>` ----------

export type HauQua =
  | { kind: 'mo-manh-moi'; id: string }
  | { kind: 'hien-tai-lieu'; id: string }
  | { kind: 'luu-bang-chung'; id: string }
  | { kind: 'dat-co'; co: string }
  | { kind: 'bo-co'; co: string }
  | { kind: 'di-toi'; chuoi: string }
  | { kind: 'tru-uy-tin' };

const HAU_QUA_RE: readonly [RegExp, (m: RegExpExecArray) => HauQua][] = [
  [/^mở manh mối ([a-z0-9-]+)$/, (m) => ({ kind: 'mo-manh-moi', id: m[1] ?? '' })],
  [/^hiện tài liệu ([a-z0-9-]+)$/, (m) => ({ kind: 'hien-tai-lieu', id: m[1] ?? '' })],
  [/^lưu bằng chứng ([a-z0-9-]+)$/, (m) => ({ kind: 'luu-bang-chung', id: m[1] ?? '' })],
  [/^đặt co\.([a-z0-9-]+)$/, (m) => ({ kind: 'dat-co', co: m[1] ?? '' })],
  [/^bỏ co\.([a-z0-9-]+)$/, (m) => ({ kind: 'bo-co', co: m[1] ?? '' })],
  [/^đi tới ([a-z0-9-]+)$/, (m) => ({ kind: 'di-toi', chuoi: m[1] ?? '' })],
  [/^trừ uy tín$/, () => ({ kind: 'tru-uy-tin' })],
];

export function docHauQua(chu: string): HauQua[] {
  return chu.split(',').map((p) => {
    const s = p.trim();
    for (const [re, lam] of HAU_QUA_RE) {
      const m = re.exec(s);
      if (m) return lam(m);
    }
    throw new Error(`hậu quả lạ "${s}" — dùng: mở manh mối <mã>, hiện tài liệu <mã>, lưu bằng chứng <mã>, đặt co.<x>, bỏ co.<x>, đi tới <chuỗi>, trừ uy tín`);
  });
}

// ---------- Mốc thời gian: `mở đầu` | `ngày <n>` | `ngày <n> <khung>` | `ngày họp` ----------

export type Moc = { kind: 'mo-dau' } | { kind: 'ngay'; ngay: number; khung: string } | { kind: 'ngay-hop' };

export interface KhungGio {
  id: string;
  ten: string;
}

/** `khung`: khung giờ của lịch, đúng thứ tự trong ngày. Viết được mã (`sang`) hay tên viết thường (`sáng`). */
export function docMoc(chu: string, khung: readonly KhungGio[]): Moc {
  const s = chu.trim();
  if (s === 'mở đầu') return { kind: 'mo-dau' };
  if (s === 'ngày họp') return { kind: 'ngay-hop' };
  const m = /^ngày (\d+)(?: (.+))?$/.exec(s);
  if (!m) throw new Error(`mốc thời gian lạ "${s}" — dùng "mở đầu", "ngày <n>", "ngày <n> <khung>", "ngày họp"`);
  const ngay = Number(m[1]);
  const khungChu = m[2];
  const k = khungChu === undefined ? khung[0] : khung.find((x) => x.id === khungChu || x.ten.toLowerCase() === khungChu.toLowerCase());
  if (k === undefined) throw new Error(`khung giờ lạ "${khungChu ?? ''}" — có: ${khung.map((x) => `${x.id} (${x.ten})`).join(', ')}`);
  return { kind: 'ngay', ngay, khung: k.id };
}

/**
 * Số thứ tự để so "trước / sau": mở đầu = 0; ngày d khung thứ i (1-based) = d·10 + i; buổi tối = d·10 + 9;
 * ngày họp = 1000. Cần `khungIds` để biết vị trí khung.
 */
export function thuTuMoc(m: Moc, khung: readonly KhungGio[]): number {
  if (m.kind === 'mo-dau') return 0;
  if (m.kind === 'ngay-hop') return 1000;
  const i = khung.findIndex((k) => k.id === m.khung);
  return m.ngay * 10 + (i < 0 ? 9 : i + 1);
}

export const THU_TU_BUOI_TOI = (ngay: number): number => ngay * 10 + 9;

/** Ngược của thuTuMoc, để in lỗi: 0 → "mở đầu", 31 → "ngày 3 sáng", 19 → "buổi tối ngày 1", 1000 → "ngày họp". */
export function taThuTu(t: number, khung: readonly KhungGio[]): string {
  if (t === 0) return 'mở đầu';
  if (t >= 1000) return 'ngày họp';
  const ngay = Math.floor(t / 10);
  const i = t % 10;
  if (i === 9) return `buổi tối ngày ${ngay}`;
  return `ngày ${ngay} ${(khung[i - 1]?.ten ?? '').toLowerCase()}`.trim();
}
