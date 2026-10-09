/**
 * DỮ LIỆU NỀN CỦA BỘ MÙA 1 (gói B19, 08/10/2026: Vụ 1 bản 6). Nâng hai bảng của `noi-dung-mua-1/du-lieu.md` lên cỡ một
 * trường thật, như `nhieu-mvp.ts` làm cho bộ MVP:
 *   - `sinh_vien` (ma_sv, ho_dem, ten, ma_lop, noi_o): bảng sinh viên cả trường mà chủ nhiệm CLB được cấp (mã, tên, lớp, nơi ở: Ký
 *     túc xá / Ngoại trú). Khoảng bốn nghìn người, bốn khóa 2021–2024, mười ba ngành.
 *   - `lop` (ma_lop, nganh, khoa_hoc, toa, buoi): bảng lớp của trường (gói B21), khoảng 120 lớp; ngành, khóa, tòa, buổi học nằm ở đây.
 *   - `ra_vao_ktx` (ma_sv, ngay, gio, chieu): sổ quẹt thẻ ở cổng ký túc xá từ 09/09 tới 27/09/2024.
 *
 * du-lieu.md giữ CÁC DÒNG CỦA TRUYỆN (bốn bạn tên Hoài, mấy người của CLB, hai lượt quẹt thẻ của Hoài sáng thứ Hai 16/09).
 * Tệp này thêm dòng nền quanh chúng bằng bộ sinh số giả ngẫu nhiên CÓ HẠT CỐ ĐỊNH (chạy lại ra đúng từng dòng).
 *
 * LUẬT GIỮ ĐÁP ÁN (đổi bộ sinh phải giữ đủ):
 *   - sinh_vien: không thêm ai tên "Hoài" (cả trường đúng năm Hoài: tên = 'Hoài' ra 5 dòng; thêm ma_lop = 'BC24A' ra 1 dòng); không dùng
 *     tên nhân vật truyện; mã không trùng dòng của truyện. Không có dữ liệu bẩn (Vụ 1).
 *   - lop: không thêm lớp nào khớp cả tòa B lẫn sáng thứ Hai (truyện đã có BC24A, BC24B, BC23A, KT24B): câu 4 điều kiện ra 1 dòng BC24A,
 *     thiếu một điều kiện ra 2 dòng.
 *   - ra_vao_ktx: không thêm dòng nào của SV240317 ngày 2024-09-16 (mã VÀ ngày ra đúng hai dòng của truyện: ra 06:44, vào 17:52).
 *     Những ngày khác Hoài ra cổng sớm (chú Cường: "sáng nào cũng ra cổng sớm").
 *
 * Chỉ chạy khi bảng có đúng hình của bộ mùa 1 (`sinh_vien` có cột `noi_o`; bảng `lop`, `ra_vao_ktx`): bộ MVP không có, không đổi gì.
 * Không import gì (chạy được cả trong công cụ lẫn trong trình duyệt).
 */
type GiaTriO = string | number | null;
interface BangMua1 {
  ten: string;
  cot?: readonly { ten: string }[];
  dong: GiaTriO[][];
}
interface BoMua1 {
  bang: BangMua1[];
}

/** mulberry32: gọn, ra cùng một dãy trên mọi máy. */
function taoNgauNhien(hat: number): () => number {
  let a = hat >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function xn(hat: number) {
  const r = taoNgauNhien(hat);
  const so = (tu: number, den: number): number => tu + Math.floor(r() * (den - tu + 1));
  return {
    so,
    chon: <T>(ds: readonly T[]): T => ds[Math.floor(r() * ds.length)] as T,
    co: (p: number): boolean => r() < p,
    tron: <T>(ds: T[]): T[] => {
      for (let i = ds.length - 1; i > 0; i--) {
        const j = Math.floor(r() * (i + 1));
        const t = ds[i] as T;
        ds[i] = ds[j] as T;
        ds[j] = t;
      }
      return ds;
    },
  };
}

const hai = (n: number): string => String(n).padStart(2, '0');
const chu = (v: GiaTriO | undefined): string => String(v ?? '');
const NGAY_MS = 86400000;
const tuNgay = (s: string): number => Date.parse(`${s}T00:00:00Z`);
const raNgay = (ms: number): string => new Date(ms).toISOString().slice(0, 10);

const HO = ['Nguyễn', 'Trần', 'Lê', 'Phạm', 'Hoàng', 'Huỳnh', 'Phan', 'Vũ', 'Võ', 'Đặng', 'Bùi', 'Đỗ', 'Hồ', 'Ngô', 'Dương', 'Lý', 'Đinh', 'Trịnh', 'Mai', 'Lương', 'Tạ', 'Cao', 'Chu', 'Tô', 'Lâm', 'Hà', 'Nguyễn', 'Nguyễn', 'Trần', 'Lê'] as const;
const DEM = ['Văn', 'Thị', 'Minh', 'Thu', 'Ngọc', 'Quốc', 'Đức', 'Thanh', 'Gia', 'Bảo', 'Hải', 'Kim', 'Xuân', 'Tuấn', 'Hữu', 'Thùy', 'Phương', 'Mỹ', 'Tiến', 'Mạnh', 'Nhật', 'Hồng', 'Trọng', 'Diệu', 'Khả', 'Thành', 'Như', 'Công'] as const;
/** Không có "Hoài" và không có tên nhân vật truyện (Tùng, Duy, Vy, Anh, Quân, Khánh, Hạnh, Lan, Thịnh, Cường, Quang, Na…). */
const TEN = [
  'An', 'Bình', 'Chi', 'Dũng', 'Dung', 'Giang', 'Hải', 'Hằng', 'Hân', 'Hòa', 'Huy', 'Hùng', 'Hương', 'Hưng', 'Hồng', 'Khoa', 'Kiên', 'Lâm', 'Long',
  'Ly', 'Mai', 'My', 'Nga', 'Ngân', 'Nghĩa', 'Ngọc', 'Nhân', 'Nhi', 'Nhung', 'Oanh', 'Phát', 'Phong', 'Phúc', 'Phương', 'Quyên', 'Quỳnh', 'Sơn', 'Tâm', 'Thành',
  'Thắng', 'Thư', 'Thủy', 'Tiến', 'Toàn', 'Trang', 'Trâm', 'Trí', 'Trinh', 'Trung', 'Tú', 'Tuấn', 'Tuyết', 'Uyên', 'Vân', 'Việt', 'Vinh', 'Vũ', 'Xuân', 'Yến',
  'Đạt', 'Đức', 'Châu', 'Diệp', 'Đông', 'Khang', 'Kiệt', 'Lộc', 'Minh', 'Nguyên', 'Nhật', 'Thiện', 'Thái', 'Tín', 'Trúc', 'Hiền', 'Huyền',
] as const;
const TEN_CAM = new Set(['Hoài']);

/** Mười ba ngành của trường; `lop`: chữ cái các lớp mỗi khóa. */
const NGANH: readonly { ma: string; ten: string; lop: string }[] = [
  { ma: 'KT', ten: 'Kế toán', lop: 'ABC' },
  { ma: 'QT', ten: 'Quản trị kinh doanh', lop: 'ABC' },
  { ma: 'BC', ten: 'Báo chí', lop: 'ABC' },
  { ma: 'TC', ten: 'Tài chính – Ngân hàng', lop: 'AB' },
  { ma: 'MK', ten: 'Marketing', lop: 'AB' },
  { ma: 'DL', ten: 'Du lịch', lop: 'AB' },
  { ma: 'CT', ten: 'Công nghệ thông tin', lop: 'ABC' },
  { ma: 'TM', ten: 'Thương mại điện tử', lop: 'AB' },
  { ma: 'HC', ten: 'Hành chính học', lop: 'AB' },
  { ma: 'LK', ten: 'Luật kinh tế', lop: 'AB' },
  { ma: 'NA', ten: 'Ngôn ngữ Anh', lop: 'ABC' },
  { ma: 'LG', ten: 'Logistics', lop: 'AB' },
  { ma: 'TU', ten: 'Toán ứng dụng', lop: 'A' },
];
const KHOA = [2021, 2022, 2023, 2024] as const;

const bangTheo = (d: BoMua1, ten: string): BangMua1 | undefined => d.bang.find((b) => b.ten === ten);
const coCot = (b: BangMua1, ten: string): boolean => (b.cot ?? []).some((c) => c.ten === ten);

const TOA = ['A', 'B', 'C', 'D'] as const;
const BUOI = ['Sáng thứ Hai', 'Sáng thứ Ba', 'Sáng thứ Tư', 'Sáng thứ Năm', 'Sáng thứ Sáu', 'Chiều thứ Hai', 'Chiều thứ Ba', 'Chiều thứ Tư', 'Chiều thứ Năm', 'Chiều thứ Sáu'] as const;
const khoaCua = (ma: string): number => 2000 + Number(ma.slice(2, 4));

/** Bảng lớp cả trường: thêm lớp quanh các lớp của truyện; không lớp nào khớp cả tòa B lẫn sáng thứ Hai. */
function themLop(d: BoMua1): void {
  const b = bangTheo(d, 'lop');
  if (!b || !coCot(b, 'toa')) return;
  const r = xn(1900);
  const daCo = new Set(b.dong.map((h) => chu(h[0])));
  for (const k of KHOA) {
    const yy = String(k).slice(2);
    for (const n of NGANH) {
      for (const chuCai of n.lop) {
        const ma = `${n.ma}${yy}${chuCai}`;
        const toa = r.chon(TOA);
        const buoi = r.chon(BUOI);
        if (daCo.has(ma)) continue;
        daCo.add(ma);
        // Tránh mọi lớp khớp cả tòa B lẫn sáng thứ Hai (đáp án câu 4 điều kiện nằm ở các lớp của truyện).
        b.dong.push([ma, n.ten, k, toa === 'B' && buoi === 'Sáng thứ Hai' ? 'C' : toa, buoi]);
      }
    }
  }
  b.dong.sort((x, y) => (chu(x[0]) < chu(y[0]) ? -1 : chu(x[0]) > chu(y[0]) ? 1 : 0));
}

/** Bảng sinh viên cả trường: thêm người quanh các dòng của truyện (mỗi lớp trong bảng lớp có 30–40 người). */
function themSinhVien(d: BoMua1): void {
  const b = bangTheo(d, 'sinh_vien');
  const lop = bangTheo(d, 'lop');
  if (!b || !lop || !coCot(b, 'noi_o')) return;
  const r = xn(1901);
  const daCo = new Set(b.dong.map((h) => chu(h[0])));
  const siSo = new Map<string, number>();
  for (const h of b.dong) siSo.set(chu(h[3]), (siSo.get(chu(h[3])) ?? 0) + 1);
  for (const k of KHOA) {
    const yy = String(k).slice(2);
    const can: string[] = [];
    for (const l of lop.dong) {
      if (Number(l[2]) !== k) continue;
      const ma = chu(l[0]);
      const muc = r.so(30, 40);
      for (let i = siSo.get(ma) ?? 0; i < muc; i++) can.push(ma);
    }
    // Mã theo số thứ tự trong khóa; trộn để mã không xếp theo lớp.
    r.tron(can);
    let stt = 100;
    for (const maLop of can) {
      let ma: string;
      do {
        stt += 1;
        ma = `SV${yy}${String(stt).padStart(4, '0')}`;
      } while (daCo.has(ma));
      daCo.add(ma);
      let ten: string;
      do ten = r.chon(TEN);
      while (TEN_CAM.has(ten));
      // Tân sinh viên phần đông ở ký túc xá; khóa trên ít hơn.
      b.dong.push([ma, `${r.chon(HO)} ${r.chon(DEM)}`, ten, maLop, r.co(k === 2024 ? 0.7 : 0.35) ? 'Ký túc xá' : 'Ngoại trú']);
    }
  }
  b.dong.sort((x, y) => (chu(x[0]) < chu(y[0]) ? -1 : chu(x[0]) > chu(y[0]) ? 1 : 0));
}

/** Một ngày của một người ở ký túc xá: các lượt quẹt thẻ, xen kẽ ra rồi vào (ngủ ở ký túc xá nên lượt đầu là ra). */
function luotTrongNgay(r: ReturnType<typeof xn>, thu: number, sangSom: boolean): string[] {
  const gio: number[] = [];
  const cuoiTuan = thu === 0 || thu === 6;
  // Buổi sáng ra cổng (đi học, đi làm thêm); cuối tuần ít hơn, muộn hơn.
  if (sangSom && !cuoiTuan) gio.push(6 * 60 + r.so(36, 52));
  else if (r.co(cuoiTuan ? 0.45 : 0.78)) gio.push(cuoiTuan ? r.so(8 * 60, 11 * 60) : r.so(6 * 60 + 20, 9 * 60 + 40));
  // Trưa về ăn, chiều đi tiếp.
  if (gio.length > 0 && r.co(cuoiTuan ? 0.2 : 0.35)) {
    const ve = Math.max(r.so(11 * 60, 12 * 60 + 40), (gio[0] ?? 0) + 30);
    gio.push(ve, ve + r.so(40, 110));
  }
  // Tối về.
  if (gio.length % 2 === 1) gio.push(r.so(16 * 60 + 30, 22 * 60 + 40));
  else if (gio.length === 0 && r.co(cuoiTuan ? 0.35 : 0.15)) {
    const ra = r.so(14 * 60, 19 * 60);
    gio.push(ra, Math.min(23 * 60 + 15, ra + r.so(60, 240)));
  }
  return gio.map((p) => `${hai(Math.floor(p / 60))}:${hai(p % 60)}`);
}

/** Sổ quẹt thẻ cổng ký túc xá, 09/09 tới 27/09/2024. */
function themRaVao(d: BoMua1): void {
  const b = bangTheo(d, 'ra_vao_ktx');
  const sv = bangTheo(d, 'sinh_vien');
  if (!b || !sv) return;
  const r = xn(1902);
  const HOAI = 'SV240317';
  const NGAY_TRUYEN = '2024-09-16';
  // Người ở ký túc xá: phần đông là tân sinh viên; người của truyện có mặt trong bảng thì ở luôn (Hoài, Tùng, Hà Vy).
  const theoKhoa = (k: number): string[] => sv.dong.filter((h) => khoaCua(chu(h[0])) === k && h[4] === 'Ký túc xá').map((h) => chu(h[0]));
  const o = new Set<string>([HOAI, 'SV240251', 'SV240466']);
  for (const [k, n] of [[2024, 200], [2023, 70], [2022, 35], [2021, 15]] as const) {
    const ds = r.tron(theoKhoa(k).filter((m) => !o.has(m)));
    for (const m of ds.slice(0, n)) o.add(m);
  }
  const nguoi = [...o].filter((m) => sv.dong.some((h) => chu(h[0]) === m)).sort();
  const daCo = new Set(b.dong.map((h) => `${chu(h[0])}|${chu(h[1])}`));
  for (let ng = tuNgay('2024-09-09'); ng <= tuNgay('2024-09-27'); ng += NGAY_MS) {
    const ngay = raNgay(ng);
    const thu = new Date(ng).getUTCDay();
    for (const m of nguoi) {
      if (m === HOAI && ngay === NGAY_TRUYEN) continue; // hai lượt của truyện đã có trong du-lieu.md
      if (daCo.has(`${m}|${ngay}`)) continue;
      const ds = luotTrongNgay(r, thu, m === HOAI);
      ds.forEach((g, i) => b.dong.push([m, ngay, g, i % 2 === 0 ? 'ra' : 'vào']));
    }
  }
  b.dong.sort((x, y) => (chu(x[1]) + chu(x[2]) + chu(x[0]) < chu(y[1]) + chu(y[2]) + chu(y[0]) ? -1 : 1));
}

/** Thêm dữ liệu nền của bộ mùa 1 (sửa tại chỗ, trả lại chính nó). Bộ MVP không có hai bảng này nên không đổi gì. */
export function themNhieuMua1<T extends BoMua1>(d: T): T {
  themLop(d);
  themSinhVien(d);
  themRaVao(d);
  return d;
}
