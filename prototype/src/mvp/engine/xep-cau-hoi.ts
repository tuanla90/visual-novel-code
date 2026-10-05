/**
 * MÁY XẾP CÂU HỎI (gói B12, đặc tả hành vi: `tools/thu-hoi-dap/thu-hoi-dap.html`, các hàm `chuan`, `dacTrung`, `vec`,
 * `diemChu`, `chot`, `kieuHoi`). Máy so chữ chạy ngay trong máy người chơi: không tải model, không gọi mạng.
 *
 * Câu người chơi gõ được chuẩn hóa (bỏ dấu, viết thường, mở chữ viết tắt kiểu chat), tách thành đặc trưng (từ, cặp từ,
 * ba chữ cái liền nhau), cân theo độ hiếm (idf) trên bộ câu hỏi mẫu, rồi so cosin với từng câu mẫu. Lớp có câu mẫu giống
 * nhất thắng; dưới ngưỡng thì câu có từ khóa trong chuyện là "khong-ro", không có là "ngoai-le".
 *
 * Thuần, không phụ thuộc kịch bản: `hoi-dap.ts` dựng bộ câu mẫu từ tờ dữ kiện rồi gọi vào đây.
 */

/** Chữ viết tắt kiểu chat → chữ đủ (đã bỏ dấu). Giữ đúng bảng của màn thử. */
const VIET_TAT: Readonly<Record<string, string>> = {
  ko: 'khong', k: 'khong', kg: 'khong', hok: 'khong', khg: 'khong', hong: 'khong', dc: 'duoc', dk: 'duoc', j: 'gi', z: 'vay', v: 'vay',
  bn: 'bao nhieu', h: 'gio', ng: 'nguoi', cn: 'chu nhat', t2: 'thu hai', sv: 'sinh vien', bt: 'biet', r: 'roi', vs: 'voi', mn: 'moi nguoi',
  thanks: 'cam on', tks: 'cam on',
};

/** Từ đệm, từ xưng gọi: không mang nghĩa câu hỏi, bỏ trước khi so. */
const TU_DEM: ReadonlySet<string> = new Set(['bac', 'a', 'oi', 'chau', 'cho', 'hoi', 'vay', 'the', 'nhi', 'ha', 'voi', 'giup', 'da', 'thi', 'la', 'cai', 'nay', 'do', 'ay', 'em', 'minh']);

/** Ngưỡng điểm của máy so chữ (màn thử: 0,3). */
export const NGUONG_CHU = 0.3;

export function boDau(s: string): string {
  return s.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/đ/g, 'd');
}

/** Chuẩn hóa một câu: bỏ dấu, "7h" → "7 gio", bỏ ký tự lạ, mở viết tắt. */
export function chuanHoa(s: string): string {
  return boDau(s)
    .replace(/(\d)h\b/g, '$1 gio')
    .replace(/[^a-z0-9 ]+/g, ' ')
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => VIET_TAT[w] ?? w)
    .join(' ');
}

type DacTrung = Map<string, number>;
type Vec = Map<string, number>;

/** Đặc trưng của một câu đã chuẩn hóa: từ (1), cặp từ (1,5), ba chữ cái liền nhau (0,35). */
export function dacTrung(cn: string): DacTrung {
  const tu = cn.split(' ').filter((w) => w !== '' && !TU_DEM.has(w));
  const f: DacTrung = new Map();
  const them = (k: string, w: number): void => {
    f.set(k, (f.get(k) ?? 0) + w);
  };
  for (const w of tu) them('w:' + w, 1);
  for (let i = 0; i + 1 < tu.length; i++) them('b:' + tu[i] + ' ' + tu[i + 1], 1.5);
  const s = ' ' + tu.join(' ') + ' ';
  for (let i = 0; i + 3 <= s.length; i++) them('c:' + s.slice(i, i + 3), 0.35);
  return f;
}

/** Một câu mẫu của một lớp (mã dữ kiện, ý định chung, `chu-de:<mã>`…). */
export interface CauMau {
  lop: string;
  cau: string;
}

export interface MaySoChu {
  mau: { lop: string; v: Vec }[];
  idf: Map<string, number>;
}

function vec(f: DacTrung, idf: Map<string, number>): Vec {
  const v: Vec = new Map();
  let n = 0;
  f.forEach((tf, k) => {
    const w = tf * (idf.get(k) ?? 0);
    if (w) {
      v.set(k, w);
      n += w * w;
    }
  });
  n = Math.sqrt(n) || 1;
  v.forEach((w, k) => v.set(k, w / n));
  return v;
}

/** Dựng máy so chữ từ bộ câu mẫu (idf tính trên chính bộ này). */
export function dungMaySoChu(mau: readonly CauMau[]): MaySoChu {
  const f = mau.map((m) => dacTrung(chuanHoa(m.cau)));
  const df = new Map<string, number>();
  for (const x of f) x.forEach((_, k) => df.set(k, (df.get(k) ?? 0) + 1));
  const idf = new Map([...df].map(([k, n]) => [k, Math.log(1 + mau.length / n)] as const));
  return { mau: mau.map((m, i) => ({ lop: m.lop, v: vec(f[i] ?? new Map(), idf) })), idf };
}

/** Điểm cao nhất của từng lớp cho một câu. */
export function diemChu(may: MaySoChu, cau: string): Record<string, number> {
  const q = vec(dacTrung(chuanHoa(cau)), may.idf);
  const diem: Record<string, number> = {};
  for (const m of may.mau) {
    let s = 0;
    q.forEach((w, k) => {
      const x = m.v.get(k);
      if (x) s += w * x;
    });
    const cu = diem[m.lop];
    if (cu === undefined || s > cu) diem[m.lop] = s;
  }
  return diem;
}

/** Câu (đã chuẩn hóa) có chứa một từ khóa trong chuyện (so nguyên từ / cụm từ). */
export function coTuKhoa(cn: string, tuKhoa: readonly string[]): boolean {
  return tuKhoa.some((k) => (' ' + cn + ' ').includes(' ' + k + ' '));
}

export interface KetQuaXep {
  lop: string;
  diem: number;
}

/** Xếp một câu: lớp điểm cao nhất; dưới ngưỡng → "khong-ro" (có từ khóa trong chuyện) hoặc "ngoai-le". */
export function xepCau(may: MaySoChu, cau: string, tuKhoaTrongChuyen: readonly string[], nguong: number = NGUONG_CHU): KetQuaXep {
  const diem = diemChu(may, cau);
  let lop: string | null = null;
  let cao = -1;
  for (const [l, s] of Object.entries(diem)) {
    if (s > cao) {
      cao = s;
      lop = l;
    }
  }
  if (lop === null || cao < nguong) lop = coTuKhoa(chuanHoa(cau), tuKhoaTrongChuyen) ? 'khong-ro' : 'ngoai-le';
  return { lop, diem: Math.max(0, cao) };
}

/** Kiểu câu hỏi để chọn biến thể lời: hỏi thẳng, hỏi có-không, nhờ kể. */
export type KieuHoi = 'thang' | 'co-khong' | 'ke';

export function kieuHoi(cau: string): KieuHoi {
  const cn = chuanHoa(cau).replace(/( (a|bac|vay|the|nhe|voi|ha))+$/, '');
  const hoiMo = /\b(ai|may gio|luc nao|khi nao|o dau|the nao|gi|bao gio|hom nao|bao nhieu|dau)\b/.test(cn);
  if (!hoiMo && /\b(khong|chua|a|u|dung khong|phai khong|chu|hay sao)$/.test(cn)) return 'co-khong';
  if (/\b(ke|the nao|ra sao|trong|ta)\b/.test(cn)) return 'ke';
  return 'thang';
}
