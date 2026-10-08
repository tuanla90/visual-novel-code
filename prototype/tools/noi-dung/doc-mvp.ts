/**
 * BỘ ĐỌC KỊCH BẢN MVP (gói 12m, đặc tả §18) — đọc `prototype/noi-dung-mvp/` thành cấu trúc thô `RawMvp`.
 *
 * Tệp riêng của MVP (lich.md, nhan-vat.md, canh.md, dia-diem.md, kich-ban/, so-tay/, chung/) đọc ở đây;
 * thẻ thử thách, thẻ hồ sơ và tiêu đề bộ (quy-uoc.md) đọc bằng bộ đọc hiện có (doc.ts) với cùng bảng tên.
 * Kiểm chéo (mốc thời gian, chi phí khung, true end…) nằm ở luat-mvp.ts. Lỗi gom, dạng `<tệp>:<dòng>`.
 * Không import gì từ `src/`.
 */
import { thayBien, type BangTen } from './bien.ts';
import { docDieuKien, docHauQua, type DieuKien, type HauQua } from './dieu-kien.ts';
import { docDuLieuMvp, type BoDuLieuMvp } from './du-lieu-mvp.ts';
import {
  docNoiDung,
  FIELD_RE,
  parseChoice,
  parseProjector,
  parseSpoken,
  type LoiNoiDung,
  type RawChallengeCard,
  type RawChoice,
  type RawDossierCard,
  type RawLine,
  type RawPickRow,
  type RawProjectorSource,
  type TepNoiDung,
  type ViTri,
} from './doc.ts';

export { dinhDangLoi } from './doc.ts';
export type { LoiNoiDung, ViTri } from './doc.ts';

// ---------- Kiểu thô ----------

export interface RawNhanVat {
  id: string;
  ten: string;
  hoTen: string | null;
  trongCau: string;
  vai: string;
  bieuCam: string[];
  /** Chữ gốc của "Xuất hiện từ" (mặc định "mở đầu"); luat-mvp.ts đổi sang Moc khi đã biết khung giờ. */
  xuatHienTu: string;
  chiQuaLoiKe: boolean;
  /** Thẻ giới thiệu người chơi thấy (màn "Nhân vật mới", tab Nhân vật); `null` = nhân vật không có thẻ. */
  gioiThieu: RawGioiThieu | null;
  viTri: ViTri;
}

/** Dòng "Danh xưng" / "Khi chưa quen" / "Năm" / "Ngành" / "Câu nói" / "Giới thiệu" của nhan-vat.md — chữ NGƯỜI CHƠI thấy, không lộ tình tiết. */
export interface RawGioiThieu {
  /** "Lịch": thói quen đi lại (thường ở đâu, lúc nào) — hiện ở thẻ nhân vật; có thì ảnh mặt mới hiện trên bản đồ. */
  lich: string | null;
  /** "Thường ở": lịch theo thứ và giờ (`T2–T7 07:00–23:00 → toa-b; CN 20:00–23:00 → toa-b`); bản đồ tính ai đang ở ghim nào từ đây. */
  thuongO?: RawThuongO[];
  danhXung: string;
  /** "Khi chưa quen": chữ trên thẻ tên trước khi nhân vật được giới thiệu (vd "Chị khóa trên"); bỏ trống → "???". */
  chuaQuen: string | null;
  /** "Không xưng tên: có": nhân vật không tự xưng tên (bà bán trà đá); tên hiện là cách gọi theo việc họ làm. */
  khongXungTen?: boolean;
  /**
   * "Biết lúc gặp" (gói B18): các ô của thẻ người chơi đã biết khi thẻ mở lần đầu (mã ASCII: `ho-ten`, `danh-xung`, `nam`, `nganh`,
   * `lich`, `cau-noi`); ô khác chờ `[BIẾT]` trong khung. Thiếu dòng = biết hết.
   */
  bietLucGap?: string[];
  nam: string | null;
  nganh: string | null;
  cauNoi: string;
  loi: string;
}

/** Một quãng trong lịch của nhân vật: các thứ (0 = Chủ nhật … 6 = thứ Bảy), từ giờ, tới giờ ("HH:MM"), ở ghim nào của bản đồ. */
export interface RawThuongO {
  thu: number[];
  tu: string;
  den: string;
  noi: string;
}

const MA_THU: Record<string, number> = { CN: 0, T2: 1, T3: 2, T4: 3, T5: 4, T6: 5, T7: 6 };

/** Đọc dòng "Thường ở". Trả về danh sách quãng, hoặc một chuỗi báo lỗi. */
export function docThuongO(s: string): RawThuongO[] | string {
  const ra: RawThuongO[] = [];
  for (const phan of s.split(';').map((x) => x.trim()).filter((x) => x.length > 0)) {
    const m = /^(.+?) (\d\d:\d\d)[–-](\d\d:\d\d) → ([a-z0-9-]+)$/.exec(phan);
    if (!m) return `"${phan}" không có dạng "<thứ> HH:MM–HH:MM → <mã ghim>"`;
    const [, cacThu = '', tu = '', den = '', noi = ''] = m;
    if (tu >= den) return `"${phan}": giờ bắt đầu phải trước giờ kết thúc`;
    const thu = new Set<number>();
    if (cacThu === 'mọi ngày') for (let i = 0; i < 7; i++) thu.add(i);
    else
      for (const t of cacThu.split(',').map((x) => x.trim())) {
        const kh = /^(CN|T[2-7])(?:[–-](CN|T[2-7]))?$/.exec(t);
        if (!kh) return `"${phan}": thứ "${t}" phải là T2…T7, CN, một khoảng như T2–T6, hoặc "mọi ngày"`;
        const a = MA_THU[kh[1] ?? ''] ?? 0;
        const b = kh[2] ? (MA_THU[kh[2]] ?? 0) : a;
        // Khoảng tính theo tuần bắt đầu từ thứ Hai: T2–CN là cả tuần.
        const vt = (x: number): number => (x + 6) % 7;
        if (vt(a) > vt(b)) return `"${phan}": khoảng thứ "${t}" bị ngược`;
        for (let i = vt(a); i <= vt(b); i++) thu.add((i + 1) % 7);
      }
    ra.push({ thu: [...thu].sort((x, y) => x - y), tu, den, noi });
  }
  if (ra.length === 0) return 'dòng "Thường ở" trống';
  return ra;
}

export interface RawCanh {
  id: string;
  ten: string;
  anhNen: string | null;
  moTa?: string | null;
  viTri: ViTri;
}

export type NhanDuKien = 'chinh' | 'phu' | 'nhieu';

export interface RawDuKien {
  id: string;
  moTa: string;
  nhan: NhanDuKien;
  diaDiem: string;
  /** Chữ gốc "Mở từ" của dữ kiện; `null` = theo địa điểm. */
  moTu: string | null;
  can: DieuKien | null;
  chuoi: string | null;
  thuThach: string | null;
  moManhMoi: string[];
  hienTaiLieu: string[];
  luuBangChung: string[];
  lap: 'mot-lan' | 'moi-lan';
  /** Dòng `- Ảnh:` (vị trí vật tương tác trên nền, QĐ-089); `null` = chưa đặt (chỉ chọn được qua danh sách chữ). */
  anh: RawAnhDuKien | null;
  viTri: ViTri;
}

/**
 * `- Ảnh: <sprite> · x <n>% · y <n>% · rộng <n>%` — sprite là `obj-…` (tệp src/assets/mvp/vat/) hoặc `nv:<mã nhân vật>` (thêm `/<biểu cảm>` để chọn ảnh, vd `nv:tung/ao-xanh`).
 * (x, y) là CHÂN ẢNH (điểm giữa cạnh dưới) tính theo % bề rộng / bề cao nền; rộng = % bề rộng nền.
 */
export interface RawAnhDuKien {
  sprite: string;
  x: number;
  y: number;
  rong: number;
}

/** Đọc giá trị dòng "Ảnh"; sai cú pháp → ném lỗi (thông báo đầy đủ). Không kiểm miền 0–100 (luật làm). */
export function docAnhDuKien(v: string): RawAnhDuKien {
  const m = /^(obj-[a-z0-9-]+|nv:[a-z0-9-]+(?:\/[a-z0-9-]+)?|ghim:[a-z0-9-]+|vung:[a-z0-9-]+)\s*·\s*x\s+(-?\d+(?:[.,]\d+)?)%\s*·\s*y\s+(-?\d+(?:[.,]\d+)?)%\s*·\s*rộng\s+(-?\d+(?:[.,]\d+)?)%$/.exec(v.trim());
  if (!m) throw new Error(`"Ảnh" phải là "<obj-… hoặc nv:<mã>> · x <n>% · y <n>% · rộng <n>%": "${v}"`);
  const so = (t: string | undefined): number => Number((t ?? '').replace(',', '.'));
  return { sprite: m[1] ?? '', x: so(m[2]), y: so(m[3]), rong: so(m[4]) };
}

export interface RawDiaDiem {
  id: string;
  ten: string;
  canh: string;
  /** Chữ gốc "Mở từ" (mặc định "ngày 1"). */
  moTu: string;
  tonKhung: { vao: number; moiDuKien: number };
  phanBiet: string | null;
  duKien: RawDuKien[];
  viTri: ViTri;
}

export interface RawNgay {
  so: number;
  ten: string;
  /** `{ngày: n · theo truyện}` → `theo-truyen` (một chuỗi, không địa điểm). */
  kieu: 'dia-diem' | 'theo-truyen';
  chuoi: string | null;
  batDauO: string | null;
  duKienChinh: string;
  moNgay: string | null;
  buoiToi: string;
  viTri: ViTri;
  /** Dòng của "- Dữ kiện chính:" để báo lỗi chi phí khung đúng dòng. */
  dongChinh: number;
}

export interface RawViecNgayLe {
  id: string;
  ten: string;
  ngay: string;
  thuocVu: string;
  chuoi: string;
  nguoiGiao: string;
  khiLo: string;
  tieuDeKet: string | null;
  loiKet: string | null;
  viTri: ViTri;
}

export interface RawViecNguoiQuen {
  id: string;
  moSau: string;
}

export interface RawNguoiQuen {
  id: string;
  ten: string;
  moSau: string;
  viec: RawViecNguoiQuen[];
  anhCg: {
    anh: string;
    chuThich: string | null;
    moTa: string | null;
  };
  giupO: string;
  viTri: ViTri;
}

export interface RawLich {
  vu: { id: string; ten: string };
  khung: { id: string; ten: string }[];
  buoiToi: { id: string; ten: string };
  luat: { chinhToiDaKhung: number; phuNhieuMin: number; phuNhieuMax: number; uyTin: number | null };
  chuoiDau: string;
  /** `- Ngày mở đầu: YYYY-MM-DD` ở "## Mở đầu": ngày thật của mở đầu (lịch trong game). Thiếu → null. */
  ngayMoDau: string | null;
  hanChot: string | null;
  viecChot: string | null;
  ngay: RawNgay[];
  ngayHop: { chuoi: string; viTri: ViTri } | null;
  /** `tam` (gói B19): dòng `- Kết tạm:` (kết rank C của bộ có `[CHẤM VỤ]`); chỉ khai "Kết tạm" thì `thuong` = `tam`. */
  ket: { that: string; thuong: string; tam: string | null; viTri: ViTri } | null;
  /** `## <Tên> {vụ sau: <mã>}`: vụ chơi tiếp sau vụ gốc — một chuỗi, ngày thật (tùy chọn), chữ màn kết. */
  vuSau: RawVuSau[];
  viecNgayLe: RawViecNgayLe[];
  nguoiQuen: RawNguoiQuen[];
  viTri: ViTri;
}

export interface RawVuSau {
  id: string;
  ten: string;
  chuoi: string;
  ngay: string | null;
  batDauO: string | null;
  hanChot: string | null;
  viecChot: string | null;
  cacNgay: { ngay: string; chuoi: string; batDauO: string | null }[];
  tieuDeKet: string;
  loiKet: string;
  /** `{nhiệm vụ phụ: <mã>}`: việc NPC giao, làm từ màn kết của một vụ chính rồi quay lại; không thuộc chuỗi vụ chính. */
  phu: boolean;
  /** Nhiệm vụ phụ: nhân vật giao việc (`- Người giao:`) và vụ phải xong trước (`- Mở sau:`). */
  nguoiGiao: string | null;
  moSau: string | null;
  viTri: ViTri;
}

export interface RawTaoNhanVat {
  truong: 'ten' | 'nganh';
  asker: RawLine;
  /** `ten`: lời khi bấm xúc xắc. */
  xucXac: string | null;
  /** `nganh`: các lựa chọn. */
  luaChon: string[];
}

export interface RawReNhanh {
  id: string;
  asker: { speaker: string; text: string };
  choices: { id: string; text: string; khi: DieuKien | null; hauQua: HauQua[] }[];
}

/** Nguồn màn chiếu: như bộ prototype, thêm `preload` (câu SQL ở "Truy vấn nạp sẵn" của thẻ, gắn khi kiểm chéo). */
export type NguonChieuMvp = RawProjectorSource | { kind: 'preload'; challengeId: string };

export type MucMvp =
  | { kind: 'task'; text: string }
  /** `> NHẮC VIỆC <ai>( (<biểu cảm>))?: …` — việc đang làm do một nhân vật nhắc, hiện kèm ảnh mặt ở góc sân khấu (01/10/2026). */
  | { kind: 'reminder'; speaker: string; expression: string | null; text: string }
  | { kind: 'line'; line: RawLine; card: boolean }
  | { kind: 'note'; text: string }
  | { kind: 'goto'; to: string }
  | { kind: 'show-document'; id: string }
  /** `- [ẢNH <tên tệp>]`: ảnh chèn giữa hội thoại (chibi, CG) — tên tệp ảnh trong src/assets/**, không đuôi. */
  | { kind: 'image'; id: string; chuThich: string | null; moTa: string | null }
  | { kind: 'question'; id: string; asker: { speaker: string; text: string }; choices: RawChoice[]; truUyTin: boolean; /** Gói B19 `· tính vạch`. */ tinhVach: RawTinhVach | null }
  /**
   * `- [ĐỐI CHẤT <mã>( · trừ uy tín)?] <rival>: "<giả thuyết>"` + dòng con:
   *   `  - {<mã thẻ>} [ĐỦ CĂN CỨ|HỖ TRỢ|GỢI Ý] → phản hồi: <lời>[<br><lời>]`
   *   `  - [CHƯA ĐỦ] → phản hồi: <lời>` (nước đi "chưa đủ căn cứ", bắt buộc)
   *   `  - [KHÁC] → phản hồi: <lời>` (thẻ không khai, bắt buộc)
   *   `  - [NGƯỜI QUEN <mã>] → nói thay: <chuỗi>` (A5)
   */
  | { kind: 'doi-chat'; id: string; asker: { speaker: string; text: string }; cauHoi: string | null; bangChung: RawBangChungDoiChat[]; chuaDu: RawLine[] | null; khac: RawLine[] | null; hetLuot: RawLine[] | null; truUyTin: boolean; nguoiQuen: { ma: string; noiThay: string } | null; /** Gói B19 `· tính vạch`: dòng con `{thẻ} [ĐÚNG]`, `{thẻ} [SAI] → phản hồi:`, `[KHÁC]`, `[SAI LẦN ĐẦU CẢ BUỔI]`. */ tinhVach: RawTinhVach | null }
  | { kind: 'xong-viec-chinh' }
  /** `- [HỎI ĐÁP <mã>]` (gói B12): cảnh hỏi nhân chứng theo tờ `hoi-dap/<mã>.json`; các dòng lời ngay sau là cách "xem cả đoạn". */
  | { kind: 'hoi-dap'; ma: string }
  | { kind: 'challenge'; id: string }
  /** `- [SỬA TRUY VẤN <thẻ>( · tính vạch( · câu n/m)?)?]` (gói B19: dòng con `[SAI LẦN ĐẦU CẢ BUỔI] → phản hồi: …`). */
  | { kind: 'fix-query'; id: string; tinhVach: RawTinhVach | null }
  /** Gói B19: `- [DÒNG THỜI GIAN <mã>]` (màn kéo thả) / `- [HIỆN DÒNG THỜI GIAN <mã>]` (`chiXem`: hiện bản đã dựng). */
  | { kind: 'dong-thoi-gian'; id: string; chiXem: boolean }
  /** Gói B19: `- [CHẤM VỤ <vụ>] cần: <thẻ>, <thẻ>, <dòng thời gian>`. */
  | { kind: 'cham-vu'; vu: string; can: string[] }
  /** Gói B19: `- [SỔ TỔNG KẾT <vụ>]`. */
  | { kind: 'so-tong-ket'; vu: string }
  /** Gói B19: `- [ĐIỂM LƯU VỤ <vụ>]`. */
  | { kind: 'diem-luu-vu'; vu: string }
  /** Gói B19: `- [GHÉP MẪU] <ai>: <thẻ> + <thẻ> · giấy nhớ: "<chữ>"`. */
  | { kind: 'ghep-mau'; nguoi: string; the: string[]; giayNho: string }
  | { kind: 'effect'; id: string }
  | { kind: 'line-pick'; id: string; rows: RawPickRow[]; truUyTin: boolean }
  | { kind: 'projector'; id: string; source: NguonChieuMvp; run: boolean; rows: number | null }
  | { kind: 'end' }
  | { kind: 'stage'; action: 'vao' | 'ra'; nhanVat: string }
  /** `- [BIẾT <mã> <trường>, <trường>]` (gói B18): người chơi vừa biết thêm ô ấy của thẻ nhân vật `nhanVat` (mã trường ASCII). */
  | { kind: 'biet'; nhanVat: string; truong: string[] }
  | { kind: 'wait'; giay: number }
  | { kind: 'set-date'; date: string }
  | { kind: 'condition'; dieuKien: DieuKien; chu: string }
  /** `- [NẾU <điều kiện>] → đi tới <chuỗi>`: thỏa thì sang chuỗi đó, không thì chạy tiếp dòng dưới. */
  | { kind: 'jump-if'; dieuKien: DieuKien; chuoi: string }
  | { kind: 'consequence'; hauQua: HauQua[] }
  | { kind: 'branch'; branch: RawReNhanh }
  | { kind: 'notebook-lookup'; trang: string; phan: string }
  | { kind: 'notebook-note'; trang: string }
  | { kind: 'create-character'; tao: RawTaoNhanVat }
  | { kind: 'trial-filter'; id: string; sql: string; soDong: number; chon: { cot: string; giaTri: string } }
  | { kind: 'save-evidence'; id: string }
  | { kind: 'ending-branch' }
  | { kind: 'go-with'; to: string; label: string }
  /**
   * `- [HẾT NGÀY <chuỗi tối>] <nhãn nút>` (gói B15, bộ mùa 1): việc chính của ngày đã xong. Máy không chạy chuỗi tối ngay mà
   * chờ người chơi bấm nút mang nhãn này. `- [HẾT NGÀY] <nhãn>` (không chuỗi): bấm là sang ngày kế luôn.
   */
  | { kind: 'het-ngay'; to: string | null; label: string }
  /** `kieu: 'dan'` (gói B19, `[KHÁM PHÁ <mã> · dàn]`): chân dung những người bấm được đứng trên dàn của cảnh, không cần x / y / rộng. */
  | { kind: 'explore'; id: string; diem: RawDiemKhamPha[]; kieu: 'canh' | 'ban-do' | 'quan-sat' | 'dan'; nhanVat: string | null; gio: string | null; dang: string | null; haVySoi: boolean };

export interface RawBangChungDoiChat {
  id: string;
  /** `dung` / `sai`: dòng con `{thẻ} [ĐÚNG]` / `{thẻ} [SAI]` của đối chất `· tính vạch` (gói B19). */
  muc: 'du' | 'ho-tro' | 'goi-y' | 'dung' | 'sai';
  feedback: RawLine[];
}

/** Gói B19: đuôi `· tính vạch` (và `· câu n/m`) của `[SỬA TRUY VẤN]`, `[ĐỐI CHẤT]`, `[HỎI]`. */
export interface RawTinhVach {
  cau: { so: number; tong: number } | null;
  /** Dòng con `[SAI LẦN ĐẦU CẢ BUỔI] → phản hồi: …`. */
  saiLanDau: RawLine[] | null;
}

/**
 * Đọc phần ` · …` sau mã của `[HỎI]` / `[ĐỐI CHẤT]` / `[SỬA TRUY VẤN]`: `trừ uy tín` (chỉ khi `choUyTin`), `tính vạch`, `câu n/m`
 * (gói B19). Sai → ném lỗi.
 */
export function docTuyChonLenh(phan: string, ten: string, choUyTin: boolean): { truUyTin: boolean; tinhVach: RawTinhVach | null } {
  let truUyTin = false;
  let tinh = false;
  let cau: { so: number; tong: number } | null = null;
  for (const p of phan.split(' · ').slice(1).map((x) => x.trim())) {
    const c = /^câu (\d+)\/(\d+)$/.exec(p);
    if (p === 'trừ uy tín' && choUyTin) truUyTin = true;
    else if (p === 'tính vạch') tinh = true;
    else if (c) {
      cau = { so: Number(c[1]), tong: Number(c[2]) };
      if (cau.so < 1 || cau.so > cau.tong) throw new Error(`${ten}: "câu ${cau.so}/${cau.tong}" sai — số câu phải từ 1 tới ${cau.tong}`);
    } else throw new Error(`${ten}: mục lạ "${p}" — dùng ${choUyTin ? '"trừ uy tín", ' : ''}"tính vạch", "câu <n>/<tổng>"`);
  }
  if (cau && !tinh) throw new Error(`${ten}: "câu n/m" chỉ đi cùng "tính vạch"`);
  if (truUyTin && tinh) throw new Error(`${ten}: không dùng cùng lúc "trừ uy tín" và "tính vạch"`);
  return { truUyTin, tinhVach: tinh ? { cau, saiLanDau: null } : null };
}

/** Gói B19: một ô của dòng thời gian (dong-thoi-gian.md). */
export interface RawODongThoiGian {
  id: string;
  gio: string | null;
  noi: string | null;
  viec: string;
  nhan: string[];
  khoaSan: boolean;
  khongDien: string | null;
  keoSai: RawLine[] | null;
  keoVaoTrong: RawLine[] | null;
  viTri: ViTri;
}

/** Gói B19: một dòng thời gian (`## <mã> — <tên> {kiểu: tập dượt|chính}`). */
export interface RawDongThoiGian {
  id: string;
  ten: string;
  kieu: 'tap-duot' | 'chinh';
  nguoiNhac: string | null;
  keoSai: RawLine[] | null;
  theTam: { id: string; chu: string }[];
  o: RawODongThoiGian[];
  viTri: ViTri;
}

/** Phần giữa của tiêu đề ô là giờ khi là "?" hoặc có dạng giờ "6:44", "trước 9:00", "7:00–9:00". */
const LA_GIO = /^(?:\?|.*\d{1,2}:\d{2}.*)$/;

/**
 * Đọc tiêu đề ô `### <mã> · <giờ> · <nơi> · <việc>` (thiếu phần nào thì bỏ phần ấy; một phần giữa là giờ nếu có dạng giờ / "?",
 * không thì là nơi). Sai → ném lỗi.
 */
export function docTieuDeO(tieuDe: string): { id: string; gio: string | null; noi: string | null; viec: string } {
  const phan = tieuDe.split(' · ').map((x) => x.trim());
  const id = phan[0] ?? '';
  if (!/^[a-z0-9-]+$/.test(id)) throw new Error(`ô dòng thời gian: mã "${id}" không hợp lệ — viết "### <mã> · <giờ> · <nơi> · <việc>"`);
  if (phan.length < 2 || phan.length > 4) throw new Error(`ô ${id}: tiêu đề phải là "### <mã> · <giờ> · <nơi> · <việc>" (bỏ phần thiếu): "${tieuDe}"`);
  const viec = phan[phan.length - 1] ?? '';
  const giua = phan.slice(1, -1);
  let gio: string | null = null;
  let noi: string | null = null;
  if (giua.length === 2) {
    gio = giua[0] ?? null;
    noi = giua[1] ?? null;
  } else if (giua.length === 1) {
    if (LA_GIO.test(giua[0] ?? '')) gio = giua[0] ?? null;
    else noi = giua[0] ?? null;
  }
  if (viec === '') throw new Error(`ô ${id}: thiếu phần việc`);
  return { id, gio, noi, viec };
}

const MUC_DOI_CHAT: Record<string, RawBangChungDoiChat['muc']> = { 'ĐỦ CĂN CỨ': 'du', 'HỖ TRỢ': 'ho-tro', 'GỢI Ý': 'goi-y' };
const parseFeedbackDc = (s: string): RawLine[] => s.split('<br>').map((p) => parseSpoken(p.trim()));

/** Dòng con của `[KHÁM PHÁ]`: `  - <sprite> · x … · y … · rộng … → <chuỗi>[ · sau: a, b][ · nhãn: …]`. */
export interface RawDiemKhamPha extends RawAnhDuKien {
  chuoi: string;
  sau: string[];
  nhan: string | null;
  /** `· dấu: !` (việc chính) / `· dấu: ?` (tùy chọn, còn mới). */
  dau: 'chinh' | 'phu' | null;
  /** `· có: a, b`: nhân vật có mặt ở điểm này (bản đồ: ảnh mặt cạnh ghim khi người chơi đã biết lịch của họ). */
  co: string[];
}

/**
 * Gói B19: dòng con của `[KHÁM PHÁ <mã> · dàn]` (đã bỏ `  - `): `nv:<mã>[/<biểu cảm>] → <chuỗi>[ · nhãn: …][ · dấu: !|?]…` — người
 * đứng trên dàn, không cần x / y / rộng (viết kèm cũng được, máy bỏ qua). Sai cú pháp → ném lỗi.
 */
export function docDiemDan(v: string): RawDiemKhamPha {
  const m = new RegExp(`^(nv:${MA}(?:/${MA})?)(?: · x [^→]+)? → (${MA})((?: · (?:sau|nhãn|dấu|có): [^·]+)*)$`).exec(v.trim());
  if (!m) throw new Error(`[KHÁM PHÁ · dàn]: dòng con phải là "nv:<mã>[/<biểu cảm>] → <chuỗi>[ · nhãn: <chữ>][ · dấu: !|?]": "${v}"`);
  return { sprite: m[1] ?? '', x: 0, y: 0, rong: 0, chuoi: m[2] ?? '', ...docPhanThemDiem(m[3] ?? '') };
}

/** Phần ` · sau: … · nhãn: … · dấu: … · có: …` của một chỗ bấm `[KHÁM PHÁ]`. */
function docPhanThemDiem(phanThem: string): { sau: string[]; nhan: string | null; dau: 'chinh' | 'phu' | null; co: string[] } {
  let sau: string[] = [];
  let nhan: string | null = null;
  let dau: 'chinh' | 'phu' | null = null;
  let co: string[] = [];
  for (const phan of phanThem.split(' · ').slice(1)) {
    const [khoa, ...con] = phan.split(': ');
    const gt = con.join(': ').trim();
    if (khoa === 'sau') sau = chiaDanhSach(gt);
    else if (khoa === 'có') co = chiaDanhSach(gt);
    else if (khoa === 'dấu') {
      if (gt !== '!' && gt !== '?') throw new Error(`[KHÁM PHÁ]: "dấu:" chỉ nhận ! hoặc ?: "${gt}"`);
      dau = gt === '!' ? 'chinh' : 'phu';
    } else nhan = gt;
  }
  return { sau, nhan, dau, co };
}

/** Đọc một dòng con của `[KHÁM PHÁ]` (đã bỏ `  - `); sai cú pháp → ném lỗi. */
export function docDiemKhamPha(v: string): RawDiemKhamPha {
  const m = new RegExp(`^(.+?) → (${MA})((?: · (?:sau|nhãn|dấu|có): [^·]+)*)$`).exec(v.trim());
  if (!m) throw new Error(`[KHÁM PHÁ]: dòng con phải là "<obj-… hoặc nv:<mã>> · x <n>% · y <n>% · rộng <n>% → <chuỗi>[ · sau: <chuỗi>, …][ · nhãn: <chữ>]": "${v}"`);
  let anh: RawAnhDuKien;
  try {
    anh = docAnhDuKien(m[1] ?? '');
  } catch (e) {
    throw new Error(`[KHÁM PHÁ]: ${(e as Error).message}`, { cause: e });
  }
  let sau: string[] = [];
  let nhan: string | null = null;
  let dau: 'chinh' | 'phu' | null = null;
  let co: string[] = [];
  for (const phan of (m[3] ?? '').split(' · ').slice(1)) {
    const [khoa, ...con] = phan.split(': ');
    const gt = con.join(': ').trim();
    if (khoa === 'sau') sau = chiaDanhSach(gt);
    else if (khoa === 'có') co = chiaDanhSach(gt);
    else if (khoa === 'dấu') {
      if (gt !== '!' && gt !== '?') throw new Error(`[KHÁM PHÁ]: "dấu:" chỉ nhận ! hoặc ?: "${gt}"`);
      dau = gt === '!' ? 'chinh' : 'phu';
    } else nhan = gt;
  }
  return { ...anh, chuoi: m[2] ?? '', sau, nhan, dau, co };
}

export interface RawChuoiMvp {
  id: string;
  title: string;
  canh: string;
  canhCat?: boolean;
  items: MucMvp[];
  itemDong: number[];
  viTri: ViTri;
}

export interface RawTrangSo {
  id: string;
  ten: string;
  loai: 'cú pháp' | 'tâm đắc' | 'lỗi thường gặp';
  trangChiLinh: string[];
  haVy: RawLine[];
  chuThich: string | null;
  viTri: ViTri;
}

export interface RawLoiChungMvp {
  matUyTin: { loi: RawLine[]; hetVach: RawLine; viTri: ViTri } | null;
}

export interface RawMvp {
  /** Tiêu đề `# …` của quy-uoc.md. */
  title: string;
  tenTruong: string;
  tenCam: string[];
  nhanVat: RawNhanVat[];
  canh: RawCanh[];
  diaDiem: RawDiaDiem[];
  lich: RawLich | null;
  chuoi: RawChuoiMvp[];
  challenges: RawChallengeCard[];
  dossier: RawDossierCard[];
  soTay: RawTrangSo[];
  loiChung: RawLoiChungMvp;
  /** Bộ dữ liệu SQL cố định (du-lieu.md, đọc bằng du-lieu-mvp.ts); `null` = không có tệp. */
  duLieu: BoDuLieuMvp | null;
  /** Gói B19: dòng thời gian (dong-thoi-gian.md, tùy chọn). */
  dongThoiGian: RawDongThoiGian[];
}

export type LoaiTepMvp = 'quy-uoc' | 'nhan-vat' | 'canh' | 'dia-diem' | 'lich' | 'du-lieu' | 'dong-thoi-gian' | 'kich-ban' | 'thu-thach' | 'so-tay' | 'loi-chung' | 'ho-so';

export interface TepMvp {
  duongDan: string;
  loai: LoaiTepMvp;
  noiDung: string;
}

export interface KetQuaDocMvp {
  mvp: RawMvp;
  loi: LoiNoiDung[];
}

// ---------- Bảng tên từ quy-uoc.md + nhan-vat.md ----------

const DANH_XUNG = ['Bác', 'Chú', 'Cô', 'Thầy', 'Anh', 'Chị', 'Em'];
/** Dòng của thẻ nhân vật: phần cho người viết / bộ kiểm, và phần giới thiệu người chơi thấy. */
const TRUONG_NHAN_VAT = ['Họ tên', 'Vai', 'Biểu cảm', 'Xuất hiện từ', 'Chỉ qua lời kể', 'Trong câu'];
const TRUONG_GIOI_THIEU = ['Danh xưng', 'Khi chưa quen', 'Không xưng tên', 'Năm', 'Ngành', 'Câu nói', 'Giới thiệu', 'Lịch', 'Thường ở', 'Biết lúc gặp'];

/** Tên trường trên thẻ nhân vật (chữ trong nội dung) → mã ASCII dùng trong máy (gói B18). */
export const TEN_TRUONG_BIET: Readonly<Record<string, string>> = {
  'họ tên': 'ho-ten',
  'danh xưng': 'danh-xung',
  'năm': 'nam',
  'ngành': 'nganh',
  'lịch': 'lich',
  'câu nói': 'cau-noi',
};
/** Mã ASCII → chữ người viết đọc. */
export const CHU_TRUONG_BIET: Readonly<Record<string, string>> = Object.fromEntries(Object.entries(TEN_TRUONG_BIET).map(([k, v]) => [v, k]));

/** Đọc một trường ("họ tên", "Ngành"…) → mã ASCII; không nhận → `null`. */
export function docTruongBiet(chu: string): string | null {
  return TEN_TRUONG_BIET[chu.normalize('NFC').trim().toLowerCase()] ?? null;
}

/**
 * Đọc danh sách trường "họ tên, năm, ngành" (gói B18). "không" (hoặc rỗng) = không trường nào. Trả về mã ASCII theo thứ tự viết;
 * trường lạ hay lặp lại → thông báo lỗi.
 */
export function docDanhSachTruongBiet(chu: string): { truong: string[]; loi: string | null } {
  const sach = chu.normalize('NFC').trim();
  if (sach === '' || sach.toLowerCase() === 'không') return { truong: [], loi: null };
  const truong: string[] = [];
  for (const phan of sach.split(',')) {
    const ma = docTruongBiet(phan);
    if (!ma) return { truong, loi: `trường "${phan.trim()}" không hợp lệ (nhận: ${Object.keys(TEN_TRUONG_BIET).join(', ')})` };
    if (truong.includes(ma)) return { truong, loi: `trường "${phan.trim()}" lặp lại` };
    truong.push(ma);
  }
  return { truong, loi: null };
}

export function tenTrongCau(ten: string): string {
  const [dau = '', ...con] = ten.split(' ');
  return DANH_XUNG.includes(dau) && con.length > 0 ? [dau.toLowerCase(), ...con].join(' ') : ten;
}

/** Dựng bảng tên cho `{{nv.…}}` / `{{truong.…}}` từ thẻ nhân vật và dòng "Tên trường". */
export function bangTenMvp(nhanVat: readonly RawNhanVat[], tenTruong: string): BangTen {
  const dayDu = tenTruong;
  return {
    nv: Object.fromEntries(nhanVat.map((n) => [n.id, { ten: n.ten, 'ho-ten': n.hoTen ?? n.ten, 'trong-cau': n.trongCau }])),
    truong: {
      'ten-day-du': dayDu,
      'ten-ngan': dayDu.replace(/^Trường Đại học /, ''),
      'ten-khong-tien-to': dayDu.replace(/^Trường /, ''),
    },
  };
}

// ---------- Mẩu dùng chung ----------

const MA = '[a-z0-9-]+';

function chiaDanhSach(v: string): string[] {
  return v
    .split(/[,·]/)
    .map((s) => s.trim())
    .filter((s) => s !== '');
}

function dongTheoDong(noiDung: string): string[] {
  return noiDung.replace(/\r\n?/g, '\n').split('\n');
}

/** Đọc `- Nhãn: giá trị` vào `fields`, báo lặp. */
function ganField(fields: Record<string, string>, line: string, ten: string): boolean {
  const m = FIELD_RE.exec(line);
  if (!m) return false;
  const label = m[1] ?? '';
  if (fields[label] !== undefined) throw new Error(`${ten}: dòng "${label}" lặp lại`);
  fields[label] = m[2] ?? '';
  return true;
}

// ---------- Bộ đọc ----------

/**
 * Đọc bộ tệp MVP (đúng thứ tự đã gom). Hai lượt: lượt 1 lấy tiêu đề, tên trường, nhân vật (để dựng bảng tên);
 * lượt 2 đọc mọi tệp còn lại với biến đã thay. Không ném lỗi: lỗi nằm trong `loi`.
 */
export function docNoiDungMvp(tepList: readonly TepMvp[]): KetQuaDocMvp {
  const loi: LoiNoiDung[] = [];
  const mvp: RawMvp = {
    title: '',
    tenTruong: '',
    tenCam: [],
    nhanVat: [],
    canh: [],
    diaDiem: [],
    lich: null,
    chuoi: [],
    challenges: [],
    dossier: [],
    soTay: [],
    loiChung: { matUyTin: null },
    duLieu: null,
    dongThoiGian: [],
  };

  // Lượt 1: quy-uoc.md (dòng cấu hình) và nhan-vat.md — hai tệp này không được dùng biến.
  for (const tep of tepList) {
    if (tep.loai === 'quy-uoc') docQuyUoc(tep);
    else if (tep.loai === 'nhan-vat') docNhanVat(tep);
  }
  if (mvp.tenTruong === '') {
    loi.push({ tep: tepList.find((t) => t.loai === 'quy-uoc')?.duongDan ?? 'noi-dung-mvp/quy-uoc.md', dong: 1, thongBao: 'quy-uoc.md thiếu dòng "- Tên trường: …"' });
  }
  const bangTen = bangTenMvp(mvp.nhanVat, mvp.tenTruong);

  // Thẻ thử thách, thẻ hồ sơ, tiêu đề: bộ đọc hiện có.
  const choDocCu: TepNoiDung[] = tepList
    .filter((t): t is TepMvp & { loai: 'quy-uoc' | 'thu-thach' | 'ho-so' } => t.loai === 'quy-uoc' || t.loai === 'thu-thach' || t.loai === 'ho-so')
    .map((t) => ({ duongDan: t.duongDan, loai: t.loai, noiDung: t.noiDung }));
  const cu = docNoiDung(choDocCu, { bangTen, giuCho: true });
  loi.push(...cu.loi);
  mvp.title = cu.script.title;
  mvp.challenges = cu.script.challenges;
  mvp.dossier = cu.script.dossier;

  // Lượt 2: tệp riêng của MVP.
  for (const tep of tepList) {
    switch (tep.loai) {
      case 'canh':
        docTheoDong(tep, bangTen, docCanh);
        break;
      case 'dia-diem':
        docTheoDong(tep, bangTen, docDiaDiem);
        break;
      case 'lich':
        docTheoDong(tep, bangTen, docLich);
        break;
      case 'kich-ban':
        docTheoDong(tep, bangTen, docKichBan);
        break;
      case 'so-tay':
        docTheoDong(tep, bangTen, docSoTay);
        break;
      case 'loi-chung':
        docTheoDong(tep, bangTen, docLoiChung);
        break;
      case 'dong-thoi-gian':
        docTheoDong(tep, bangTen, docDongThoiGian);
        break;
      case 'du-lieu': {
        // Dữ liệu không thay biến {{…}}: giá trị ô là dữ liệu thô.
        const d = docDuLieuMvp(tep);
        loi.push(...d.loi);
        if (mvp.duLieu) loi.push({ tep: tep.duongDan, dong: 1, thongBao: `chỉ một tệp dữ liệu (đã có ${mvp.duLieu.viTri.tep})` });
        else mvp.duLieu = d.duLieu;
        break;
      }
      default:
        break;
    }
  }
  if (!mvp.lich) loi.push({ tep: 'noi-dung-mvp/lich.md', dong: 1, thongBao: 'thiếu tệp lich.md (lịch ngày × khung giờ)' });

  kiemTrung(mvp.nhanVat.map((n) => [n.id, n.viTri] as const), 'nhân vật');
  kiemTrung(mvp.canh.map((c) => [c.id, c.viTri] as const), 'cảnh');
  kiemTrung(mvp.diaDiem.map((d) => [d.id, d.viTri] as const), 'địa điểm');
  kiemTrung(mvp.diaDiem.flatMap((d) => d.duKien).map((k) => [k.id, k.viTri] as const), 'dữ kiện');
  kiemTrung(mvp.chuoi.map((c) => [c.id, c.viTri] as const), 'chuỗi');
  kiemTrung(mvp.soTay.map((s) => [s.id, s.viTri] as const), 'trang sổ');
  kiemTrung(mvp.dongThoiGian.map((d) => [d.id, d.viTri] as const), 'dòng thời gian');
  for (const d of mvp.dongThoiGian) {
    kiemTrung(d.o.map((o) => [o.id, o.viTri] as const), `ô của dòng thời gian ${d.id}:`);
  }
  return { mvp, loi };

  function kiemTrung(ds: readonly (readonly [string, ViTri])[], ten: string): void {
    const da = new Map<string, ViTri>();
    for (const [id, vt] of ds) {
      const truoc = da.get(id);
      if (truoc) loi.push({ ...vt, thongBao: `${ten} "${id}" trùng định danh với ${truoc.tep}:${truoc.dong}` });
      else da.set(id, vt);
    }
  }

  /** Đọc một tệp theo từng dòng: thay biến, gọi `docDong(line, i, lines) → chỉ số dòng cuối đã dùng`. */
  function docTheoDong(
    tep: TepMvp,
    bang: BangTen | null,
    lam: (ctx: { tep: TepMvp; viTri: () => ViTri; lines: string[] }) => { dong: (line: string, i: number) => number; het?: () => void },
  ): void {
    const lines = dongTheoDong(tep.noiDung);
    if (bang) {
      for (let i = 0; i < lines.length; i++) {
        const raw = lines[i] ?? '';
        if (!raw.includes('{{') && !raw.includes('}}')) continue;
        const kq = thayBien(raw, bang, { giuCho: true });
        for (const t of kq.loi) loi.push({ tep: tep.duongDan, dong: i + 1, thongBao: t });
        lines[i] = kq.chu;
      }
    }
    let dongHienTai = 0;
    const viTri = (): ViTri => ({ tep: tep.duongDan, dong: dongHienTai });
    const bo = lam({ tep, viTri, lines });
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i] ?? '';
      dongHienTai = i + 1;
      if (line.startsWith('<!--')) continue;
      try {
        i = bo.dong(line, i);
      } catch (e) {
        loi.push({ ...viTri(), thongBao: (e as Error).message });
      }
    }
    try {
      bo.het?.();
    } catch (e) {
      loi.push({ ...viTri(), thongBao: (e as Error).message });
    }
  }

  // ---------- quy-uoc.md: chỉ hai dòng cấu hình ----------
  function docQuyUoc(tep: TepMvp): void {
    const lines = dongTheoDong(tep.noiDung);
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i] ?? '';
      const m = /^- (Tên trường|Tên cấm): (.+)$/.exec(line);
      if (!m) continue;
      if (m[1] === 'Tên trường') {
        if (mvp.tenTruong !== '') loi.push({ tep: tep.duongDan, dong: i + 1, thongBao: 'dòng "Tên trường" lặp lại' });
        mvp.tenTruong = m[2] ?? '';
      } else mvp.tenCam.push(...chiaDanhSach(m[2] ?? ''));
    }
  }

  // ---------- nhan-vat.md ----------
  function docNhanVat(tep: TepMvp): void {
    const lines = dongTheoDong(tep.noiDung);
    let nv: RawNhanVat | null = null;
    let fields: Record<string, string> = {};
    const dong = (): void => {
      if (!nv) return;
      const vt = nv.viTri;
      const vai = fields['Vai'];
      const bieuCam = fields['Biểu cảm'];
      const chiQuaLoiKe = fields['Chỉ qua lời kể'] === 'có';
      if (vai === undefined) loi.push({ ...vt, thongBao: `nhân vật ${nv.id} thiếu dòng "- Vai: …"` });
      if (bieuCam === undefined && !chiQuaLoiKe) loi.push({ ...vt, thongBao: `nhân vật ${nv.id} thiếu dòng "- Biểu cảm: …" (hoặc "- Chỉ qua lời kể: có")` });
      const la = Object.keys(fields).filter((k) => ![...TRUONG_NHAN_VAT, ...TRUONG_GIOI_THIEU].includes(k));
      if (la.length > 0) loi.push({ ...vt, thongBao: `nhân vật ${nv.id} có dòng lạ: ${la.join(', ')}` });
      nv.vai = vai ?? '';
      nv.bieuCam = bieuCam === undefined ? [] : chiaDanhSach(bieuCam);
      nv.hoTen = fields['Họ tên'] ?? null;
      nv.trongCau = fields['Trong câu'] ?? tenTrongCau(nv.ten);
      nv.xuatHienTu = fields['Xuất hiện từ'] ?? 'mở đầu';
      nv.chiQuaLoiKe = chiQuaLoiKe;
      const coGt = TRUONG_GIOI_THIEU.filter((k) => fields[k] !== undefined);
      if (coGt.length > 0) {
        const thieu = ['Danh xưng', 'Câu nói', 'Giới thiệu'].filter((k) => fields[k] === undefined);
        if (thieu.length > 0) loi.push({ ...vt, thongBao: `nhân vật ${nv.id} có thẻ giới thiệu nhưng thiếu dòng: ${thieu.join(', ')}` });
        if (chiQuaLoiKe) loi.push({ ...vt, thongBao: `nhân vật ${nv.id} "Chỉ qua lời kể: có" nên không có thẻ giới thiệu` });
        const thuongO = fields['Thường ở'] === undefined ? undefined : docThuongO(fields['Thường ở']);
        if (typeof thuongO === 'string') loi.push({ ...vt, thongBao: `nhân vật ${nv.id}, "Thường ở": ${thuongO}` });
        if (thuongO !== undefined && fields['Lịch'] === undefined) loi.push({ ...vt, thongBao: `nhân vật ${nv.id} có "Thường ở" thì phải có dòng "Lịch" (chữ người chơi đọc)` });
        // Gói B18: "Biết lúc gặp" — ô đã biết khi thẻ mở; ô liệt kê phải là ô nhân vật có dữ liệu (luat-mvp.ts kiểm).
        const bietLucGap = fields['Biết lúc gặp'] === undefined ? undefined : docDanhSachTruongBiet(fields['Biết lúc gặp']);
        if (bietLucGap?.loi) loi.push({ ...vt, thongBao: `nhân vật ${nv.id}, "Biết lúc gặp": ${bietLucGap.loi}` });
        nv.gioiThieu = {
          lich: fields['Lịch'] ?? null,
          ...(Array.isArray(thuongO) ? { thuongO } : {}),
          ...(bietLucGap ? { bietLucGap: bietLucGap.truong } : {}),
          danhXung: fields['Danh xưng'] ?? '',
          chuaQuen: fields['Khi chưa quen'] ?? null,
          ...(fields['Không xưng tên'] === 'có' ? { khongXungTen: true } : {}),
          nam: fields['Năm'] ?? null,
          nganh: fields['Ngành'] ?? null,
          cauNoi: fields['Câu nói'] ?? '',
          loi: fields['Giới thiệu'] ?? '',
        };
      }
      mvp.nhanVat.push(nv);
      nv = null;
      fields = {};
    };
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i] ?? '';
      const vt: ViTri = { tep: tep.duongDan, dong: i + 1 };
      if (line.startsWith('<!--') || line.trim() === '' || line.startsWith('## ')) continue;
      if (line.includes('{{')) loi.push({ ...vt, thongBao: 'nhan-vat.md là nguồn tên, không dùng biến {{…}}' });
      if (line.startsWith('### ')) {
        dong();
        const m = new RegExp(`^### (${MA}) — (.+)$`).exec(line);
        if (!m) {
          loi.push({ ...vt, thongBao: `tiêu đề nhân vật sai quy ước "${line}" — viết "### <mã> — <Tên hiển thị>"` });
          continue;
        }
        if (m[1] === 'player' || m[1] === 'narrator' || m[1] === 'nguoi-choi') {
          loi.push({ ...vt, thongBao: `"${m[1]}" là người nói đặc biệt, không khai báo trong nhan-vat.md` });
          continue;
        }
        nv = { id: m[1] ?? '', ten: m[2] ?? '', hoTen: null, trongCau: '', vai: '', bieuCam: [], xuatHienTu: 'mở đầu', chiQuaLoiKe: false, gioiThieu: null, viTri: vt };
        continue;
      }
      if (!nv) {
        loi.push({ ...vt, thongBao: `dòng nằm ngoài thẻ nhân vật: "${line}"` });
        continue;
      }
      try {
        if (!ganField(fields, line, `nhân vật ${nv.id}`)) loi.push({ ...vt, thongBao: `dòng không khớp quy ước thẻ nhân vật: "${line}"` });
      } catch (e) {
        loi.push({ ...vt, thongBao: (e as Error).message });
      }
    }
    dong();
  }

  // ---------- canh.md ----------
  function docCanh({ viTri }: { viTri: () => ViTri }) {
    let canh: RawCanh | null = null;
    const dong = (line: string, i: number): number => {
      if (line.trim() === '' || line.startsWith('## ')) return i;
      if (line.startsWith('### ')) {
        const m = new RegExp(`^### (${MA}) — (.+?)(?: · mô tả: (.+))?$`).exec(line);
        if (!m) throw new Error(`tiêu đề cảnh sai quy ước "${line}" — viết "### <mã> — <Tên cảnh>"`);
        canh = { id: m[1] ?? '', ten: m[2] ?? '', anhNen: null, moTa: m[3] ? m[3].trim() : null, viTri: viTri() };
        mvp.canh.push(canh);
        return i;
      }
      if (!canh) throw new Error(`dòng nằm ngoài thẻ cảnh: "${line}"`);
      const m = /^- Ảnh nền: (\S+)(?: · mô tả: .*)?$/.exec(line);
      const moTa = /^- Mô tả: (.+)$/.exec(line);
      if (moTa) {
        canh.moTa = moTa[1]?.trim() ?? null;
        return i;
      }
      if (!m) throw new Error(`dòng không khớp quy ước thẻ cảnh (chỉ có "- Ảnh nền: <mã ảnh>"): "${line}"`);
      canh.anhNen = m[1] ?? '';
      return i;
    };
    return { dong };
  }

  // ---------- dia-diem.md ----------
  function docDiaDiem({ viTri }: { viTri: () => ViTri }) {
    let dd: RawDiaDiem | null = null;
    let dk: RawDuKien | null = null;
    let fields: Record<string, string> = {};
    let chuDong: ViTri | null = null;
    const dongDiaDiem = (): void => {
      if (!dd || dk || !chuDong) return;
      const f = fields;
      const la = Object.keys(f).filter((k) => !['Cảnh', 'Mở từ', 'Tốn khung', 'Phân biệt'].includes(k));
      if (la.length > 0) loi.push({ ...chuDong, thongBao: `địa điểm ${dd.id} có dòng lạ: ${la.join(', ')}` });
      if (f['Cảnh'] === undefined) loi.push({ ...chuDong, thongBao: `địa điểm ${dd.id} thiếu dòng "- Cảnh: <mã cảnh>"` });
      dd.canh = f['Cảnh'] ?? '';
      dd.moTu = f['Mở từ'] ?? 'ngày 1';
      dd.phanBiet = f['Phân biệt'] ?? null;
      const tk = f['Tốn khung'];
      if (tk !== undefined) {
        const a = /^mỗi dữ kiện (\d+)$/.exec(tk);
        const b = /^vào (\d+), bên trong (\d+)$/.exec(tk);
        if (a) dd.tonKhung = { vao: 0, moiDuKien: Number(a[1]) };
        else if (b) dd.tonKhung = { vao: Number(b[1]), moiDuKien: Number(b[2]) };
        else loi.push({ ...chuDong, thongBao: `"Tốn khung" phải là "mỗi dữ kiện <n>" hoặc "vào <n>, bên trong <n>": "${tk}"` });
      }
      fields = {};
      chuDong = null; // các dòng của địa điểm đã đọc xong; không đọc lại ở dữ kiện kế
    };
    const dongDuKien = (): void => {
      if (!dk) return;
      const f = fields;
      const vt = dk.viTri;
      const biet = ['Mở từ', 'Cần', 'Chuỗi', 'Thử thách', 'Mở manh mối', 'Hiện tài liệu', 'Lưu bằng chứng', 'Lặp', 'Ảnh'];
      const la = Object.keys(f).filter((k) => !biet.includes(k));
      if (la.length > 0) loi.push({ ...vt, thongBao: `dữ kiện ${dk.id} có dòng lạ: ${la.join(', ')}` });
      dk.chuoi = f['Chuỗi'] ?? null;
      dk.thuThach = f['Thử thách'] ?? null;
      if ((dk.chuoi === null) === (dk.thuThach === null)) {
        loi.push({ ...vt, thongBao: `dữ kiện ${dk.id} phải có đúng một trong hai dòng "- Chuỗi: <chuỗi>" hoặc "- Thử thách: <thẻ>"` });
      }
      dk.moTu = f['Mở từ'] ?? null;
      dk.moManhMoi = chiaDanhSach(f['Mở manh mối'] ?? '');
      dk.hienTaiLieu = chiaDanhSach(f['Hiện tài liệu'] ?? '');
      dk.luuBangChung = chiaDanhSach(f['Lưu bằng chứng'] ?? '');
      const lap = f['Lặp'];
      if (lap !== undefined && lap !== 'mỗi lần' && lap !== 'một lần') loi.push({ ...vt, thongBao: `"Lặp" chỉ nhận "một lần" hoặc "mỗi lần": "${lap}"` });
      dk.lap = lap === 'mỗi lần' ? 'moi-lan' : 'mot-lan';
      const anh = f['Ảnh'];
      if (anh !== undefined) {
        try {
          dk.anh = docAnhDuKien(anh);
        } catch (e) {
          loi.push({ ...vt, thongBao: `dữ kiện ${dk.id}: ${(e as Error).message}` });
        }
      }
      const can = f['Cần'];
      if (can !== undefined) {
        try {
          dk.can = docDieuKien(can);
        } catch (e) {
          loi.push({ ...vt, thongBao: `"Cần": ${(e as Error).message}` });
        }
      }
      dk = null;
      fields = {};
    };
    const dong = (line: string, i: number): number => {
      if (line.trim() === '') return i;
      if (line.startsWith('## ')) {
        dongDuKien();
        dongDiaDiem();
        const m = new RegExp(`^## (${MA}) — (.+) \\{địa điểm: (${MA})\\}$`).exec(line);
        if (!m) throw new Error(`tiêu đề địa điểm sai quy ước "${line}" — viết "## <mã> — <Tên> {địa điểm: <mã>}"`);
        if (m[1] !== m[3]) throw new Error(`mã đầu tiêu đề "${m[1] ?? ''}" khác {địa điểm: ${m[3] ?? ''}}`);
        dd = { id: m[1] ?? '', ten: m[2] ?? '', canh: '', moTu: 'ngày 1', tonKhung: { vao: 0, moiDuKien: 1 }, phanBiet: null, duKien: [], viTri: viTri() };
        chuDong = viTri();
        mvp.diaDiem.push(dd);
        return i;
      }
      if (line.startsWith('### ')) {
        dongDuKien();
        dongDiaDiem();
        if (!dd) throw new Error('dữ kiện nằm trước tiêu đề địa điểm "## …"');
        const m = new RegExp(`^### (${MA}) — (.+) \\{dữ kiện: (chính|phụ|nhiễu)\\}$`).exec(line);
        if (!m) throw new Error(`tiêu đề dữ kiện sai quy ước "${line}" — viết "### <mã> — <Mô tả> {dữ kiện: chính|phụ|nhiễu}"`);
        const nhan: NhanDuKien = m[3] === 'chính' ? 'chinh' : m[3] === 'phụ' ? 'phu' : 'nhieu';
        dk = { id: m[1] ?? '', moTa: m[2] ?? '', nhan, diaDiem: dd.id, moTu: null, can: null, chuoi: null, thuThach: null, moManhMoi: [], hienTaiLieu: [], luuBangChung: [], lap: 'mot-lan', anh: null, viTri: viTri() };
        dd.duKien.push(dk);
        return i;
      }
      if (!dd) throw new Error(`dòng nằm ngoài địa điểm: "${line}"`);
      if (!ganField(fields, line, dk ? `dữ kiện ${dk.id}` : `địa điểm ${dd.id}`)) throw new Error(`dòng không khớp quy ước "- Nhãn: giá trị": "${line}"`);
      return i;
    };
    return {
      dong,
      het: () => {
        dongDuKien();
        dongDiaDiem();
      },
    };
  }

  // ---------- lich.md ----------
  /** `YYYY-MM-DD` và là ngày có thật (2024-02-30 sai). */
  function ngayHopLe(s: string): boolean {
    const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(s);
    if (!m) return false;
    const d = new Date(Date.UTC(Number(m[1]), Number(m[2]) - 1, Number(m[3])));
    return d.toISOString().slice(0, 10) === s;
  }

  function docLich({ viTri, tep }: { viTri: () => ViTri; tep: TepMvp }) {
    type Muc = 'luat' | 'mo-dau' | 'ngay' | 'ngay-hop' | 'ket' | 'vu-sau' | 'viec-ngay-le' | 'nguoi-quen' | null;
    let muc: Muc = null;
    let ngay: RawNgay | null = null;
    let vuSau: { id: string; ten: string; phu: boolean } | null = null;
    let viecNgayLe: { id: string; ten: string } | null = null;
    let nguoiQuen: { id: string; ten: string } | null = null;
    let fields: Record<string, string> = {};
    let chuMuc: ViTri | null = null;
    const lich: RawLich = {
      vu: { id: '', ten: '' },
      khung: [],
      buoiToi: { id: 'toi', ten: 'Buổi tối' },
      luat: { chinhToiDaKhung: 2, phuNhieuMin: 1, phuNhieuMax: 3, uyTin: null },
      chuoiDau: '',
      ngayMoDau: null,
      hanChot: null,
      viecChot: null,
      ngay: [],
      ngayHop: null,
      ket: null,
      vuSau: [],
      viecNgayLe: [],
      nguoiQuen: [],
      viTri: { tep: tep.duongDan, dong: 1 },
    };
    if (mvp.lich) loi.push({ ...viTri(), tep: tep.duongDan, dong: 1, thongBao: 'chỉ được có một tệp lịch (lich.md)' });
    mvp.lich = lich;
    const canCo = (f: Record<string, string>, nhan: string, vt: ViTri, ten: string): string | null => {
      const v = f[nhan];
      if (v === undefined) loi.push({ ...vt, thongBao: `${ten} thiếu dòng "- ${nhan}: …"` });
      return v ?? null;
    };
    const dongMuc = (): void => {
      if (!chuMuc || muc === null) return;
      const f = fields;
      const vt = chuMuc;
      const laNgoai = (biet: string[], ten: string): void => {
        const la = Object.keys(f).filter((k) => !biet.includes(k));
        if (la.length > 0) loi.push({ ...vt, thongBao: `${ten} có dòng lạ: ${la.join(', ')}` });
      };
      switch (muc) {
        case 'luat': {
          laNgoai(['Khung giờ', 'Buổi tối', 'Dữ kiện chính tối đa', 'Mỗi địa điểm', 'Uy tín'], 'mục "## Luật"');
          const kg = canCo(f, 'Khung giờ', vt, 'mục "## Luật"');
          if (kg !== null) {
            for (const p of chiaDanhSach(kg)) {
              const m = new RegExp(`^(${MA}) "(.+)"$`).exec(p);
              if (!m) loi.push({ ...vt, thongBao: `khung giờ phải viết dạng <mã> "<Tên>", cách nhau bằng dấu phẩy: "${p}"` });
              else lich.khung.push({ id: m[1] ?? '', ten: m[2] ?? '' });
            }
            if (lich.khung.length === 0) loi.push({ ...vt, thongBao: 'phải có ít nhất một khung giờ' });
          }
          const bt = f['Buổi tối'];
          if (bt !== undefined) {
            const m = new RegExp(`^(${MA}) "(.+)"$`).exec(bt);
            if (!m) loi.push({ ...vt, thongBao: `"Buổi tối" phải viết dạng <mã> "<Tên>": "${bt}"` });
            else lich.buoiToi = { id: m[1] ?? '', ten: m[2] ?? '' };
          }
          const td = f['Dữ kiện chính tối đa'];
          if (td !== undefined) {
            const m = /^(\d+) khung$/.exec(td);
            if (!m) loi.push({ ...vt, thongBao: `"Dữ kiện chính tối đa" phải là "<n> khung": "${td}"` });
            else lich.luat.chinhToiDaKhung = Number(m[1]);
          }
          const md = f['Mỗi địa điểm'];
          if (md !== undefined) {
            // QĐ-089: con số chỉ đếm dữ kiện phụ/nhiễu, nên dòng luật phải ghi rõ "phụ/nhiễu".
            const m = /^(\d+)[–-](\d+) dữ kiện phụ\/nhiễu$/.exec(md);
            if (!m) loi.push({ ...vt, thongBao: `"Mỗi địa điểm" phải là "<min>–<max> dữ kiện phụ/nhiễu" (dữ kiện chính không tính, QĐ-089): "${md}"` });
            else lich.luat = { ...lich.luat, phuNhieuMin: Number(m[1]), phuNhieuMax: Number(m[2]) };
          }
          const ut = f['Uy tín'];
          if (ut !== undefined) {
            const m = /^(\d+) vạch$/.exec(ut);
            if (!m) loi.push({ ...vt, thongBao: `"Uy tín" phải là "<n> vạch": "${ut}"` });
            else lich.luat.uyTin = Number(m[1]);
          }
          break;
        }
        case 'mo-dau': {
          laNgoai(['Chuỗi đầu', 'Ngày mở đầu', 'Hạn chót', 'Việc chốt'], 'mục "## Mở đầu"');
          lich.chuoiDau = canCo(f, 'Chuỗi đầu', vt, 'mục "## Mở đầu"') ?? '';
          const nmd = f['Ngày mở đầu'];
          if (nmd !== undefined) {
            if (ngayHopLe(nmd)) lich.ngayMoDau = nmd;
            else loi.push({ ...vt, thongBao: `"Ngày mở đầu" phải là ngày có thật dạng YYYY-MM-DD (ví dụ 2024-09-08): "${nmd}"` });
          }
          const hc = f['Hạn chót'];
          if (hc !== undefined) {
            if (ngayHopLe(hc)) lich.hanChot = hc;
            else loi.push({ ...vt, thongBao: `mục "## Mở đầu": "Hạn chót" phải là ngày có thật dạng YYYY-MM-DD: "${hc}"` });
          }
          lich.viecChot = f['Việc chốt'] ?? null;
          break;
        }
        case 'ngay': {
          if (!ngay) break;
          if (ngay.kieu === 'theo-truyen') {
            laNgoai(['Chuỗi', 'Bắt đầu ở'], `ngày ${ngay.so} (theo truyện)`);
            ngay.chuoi = canCo(f, 'Chuỗi', vt, `ngày ${ngay.so} (theo truyện)`) ?? '';
            if (f['Bắt đầu ở']) ngay.batDauO = f['Bắt đầu ở'].trim();
            if (ngay.chuoi) {
              const mBdo = /·\s*bắt đầu ở:\s*([a-zA-Z0-9_-]+)/.exec(ngay.chuoi);
              if (mBdo) {
                if (!ngay.batDauO) ngay.batDauO = mBdo[1] ?? null;
                ngay.chuoi = ngay.chuoi.replace(/·\s*bắt đầu ở:\s*[a-zA-Z0-9_-]+/, '').trim();
              }
            }
            lich.ngay.push(ngay);
            ngay = null;
            break;
          }
          laNgoai(['Dữ kiện chính', 'Mở ngày', 'Buổi tối', 'Bắt đầu ở'], `ngày ${ngay.so}`);
          ngay.duKienChinh = canCo(f, 'Dữ kiện chính', vt, `ngày ${ngay.so}`) ?? '';
          ngay.buoiToi = canCo(f, 'Buổi tối', vt, `ngày ${ngay.so}`) ?? '';
          ngay.moNgay = f['Mở ngày'] ?? null;
          if (f['Bắt đầu ở']) ngay.batDauO = f['Bắt đầu ở'].trim();
          if (ngay.duKienChinh.includes(',')) loi.push({ ...vt, dong: ngay.dongChinh, thongBao: `ngày ${ngay.so}: chỉ MỘT dữ kiện chính mỗi ngày (QĐ-086); dữ kiện đi kèm khai bằng "Cần" ở dữ kiện chính` });
          lich.ngay.push(ngay);
          ngay = null;
          break;
        }
        case 'ngay-hop': {
          laNgoai(['Chuỗi'], 'ngày họp');
          const c = canCo(f, 'Chuỗi', vt, 'ngày họp');
          lich.ngayHop = { chuoi: c ?? '', viTri: vt };
          break;
        }
        case 'ket': {
          // Gói B19: "Kết tạm" (kết rank C của bộ có [CHẤM VỤ]) thay được "Kết thường"; có cả hai thì rank C đi "Kết tạm".
          laNgoai(['Kết thật', 'Kết thường', 'Kết tạm'], 'mục "## Kết"');
          const tam = f['Kết tạm']?.trim() || null;
          const thuong = tam && f['Kết thường'] === undefined ? tam : (canCo(f, 'Kết thường', vt, 'mục "## Kết"') ?? '');
          lich.ket = { that: canCo(f, 'Kết thật', vt, 'mục "## Kết"') ?? '', thuong, tam, viTri: vt };
          break;
        }
        case 'vu-sau': {
          if (!vuSau) break;
          const ten = `${vuSau.phu ? 'nhiệm vụ phụ' : 'vụ sau'} ${vuSau.id}`;
          const ngayKeys = Object.keys(f).filter((k) => /^Ngày \d{4}-\d{2}-\d{2}$/.test(k));
          laNgoai(['Chuỗi', 'Ngày', 'Bắt đầu ở', 'Hạn chót', 'Việc chốt', 'Tiêu đề kết', 'Lời kết', ...ngayKeys, ...(vuSau.phu ? ['Người giao', 'Mở sau'] : [])], ten);
          let batDauO: string | null = null;
          if (f['Bắt đầu ở']) batDauO = f['Bắt đầu ở'].trim();
          let ng = f['Ngày'];
          if (ng !== undefined) {
            const mBdo = /·\s*bắt đầu ở:\s*([a-zA-Z0-9_-]+)/.exec(ng);
            if (mBdo) {
              if (!batDauO) batDauO = mBdo[1] ?? null;
              ng = ng.replace(/·\s*bắt đầu ở:\s*[a-zA-Z0-9_-]+/, '').trim();
            }
          }
          if (ng !== undefined && !ngayHopLe(ng)) loi.push({ ...vt, thongBao: `${ten}: "Ngày" phải là ngày có thật dạng YYYY-MM-DD: "${ng}"` });
          const hc = f['Hạn chót'];
          if (hc !== undefined && !ngayHopLe(hc)) loi.push({ ...vt, thongBao: `${ten}: "Hạn chót" phải là ngày có thật dạng YYYY-MM-DD: "${hc}"` });
          const cacNgay = ngayKeys.map((k) => {
            const val = f[k] ?? '';
            const mBdo = /·\s*bắt đầu ở:\s*([a-zA-Z0-9_-]+)/.exec(val);
            const bdo = mBdo ? mBdo[1] ?? null : null;
            const chuoi = val.replace(/·\s*bắt đầu ở:\s*[a-zA-Z0-9_-]+/, '').trim();
            return { ngay: k.replace(/^Ngày /, ''), chuoi, batDauO: bdo };
          });
          if (lich.vuSau.some((v) => v.id === vuSau?.id) || vuSau.id === lich.vu.id) loi.push({ ...vt, thongBao: `mã vụ "${vuSau.id}" khai hai lần trong lich.md` });
          lich.vuSau.push({
            id: vuSau.id,
            ten: vuSau.ten,
            chuoi: canCo(f, 'Chuỗi', vt, ten) ?? '',
            ngay: ng !== undefined && ngayHopLe(ng) ? ng : null,
            batDauO,
            hanChot: hc !== undefined && ngayHopLe(hc) ? hc : null,
            viecChot: f['Việc chốt'] ?? null,
            cacNgay,
            tieuDeKet: canCo(f, 'Tiêu đề kết', vt, ten) ?? '',
            loiKet: canCo(f, 'Lời kết', vt, ten) ?? '',
            phu: vuSau.phu,
            nguoiGiao: vuSau.phu ? canCo(f, 'Người giao', vt, ten) : null,
            moSau: vuSau.phu ? canCo(f, 'Mở sau', vt, ten) : null,
            viTri: vt,
          });
          vuSau = null;
          break;
        }
        case 'viec-ngay-le': {
          if (!viecNgayLe) break;
          const ten = `việc ngày lễ ${viecNgayLe.id}`;
          laNgoai(['Ngày', 'Thuộc vụ', 'Chuỗi', 'Người giao', 'Khi lỡ', 'Tiêu đề kết', 'Lời kết'], ten);
          const ng = canCo(f, 'Ngày', vt, ten);
          if (ng !== null && !ngayHopLe(ng)) loi.push({ ...vt, thongBao: `${ten}: "Ngày" phải là ngày có thật dạng YYYY-MM-DD: "${ng}"` });
          if (lich.viecNgayLe.some((v) => v.id === viecNgayLe?.id)) loi.push({ ...vt, thongBao: `mã việc ngày lễ "${viecNgayLe.id}" trùng lặp trong lich.md` });
          lich.viecNgayLe.push({
            id: viecNgayLe.id,
            ten: viecNgayLe.ten,
            ngay: ng ?? '',
            thuocVu: canCo(f, 'Thuộc vụ', vt, ten) ?? '',
            chuoi: canCo(f, 'Chuỗi', vt, ten) ?? '',
            nguoiGiao: canCo(f, 'Người giao', vt, ten) ?? '',
            khiLo: canCo(f, 'Khi lỡ', vt, ten) ?? '',
            tieuDeKet: f['Tiêu đề kết'] ?? null,
            loiKet: f['Lời kết'] ?? null,
            viTri: vt,
          });
          viecNgayLe = null;
          break;
        }
        case 'nguoi-quen': {
          if (!nguoiQuen) break;
          const ten = `người quen ${nguoiQuen.id}`;
          laNgoai(['Mở sau', 'Việc 1', 'Việc 2', 'Việc 3', 'Ảnh CG', 'Giúp ở'], ten);
          const viec: RawViecNguoiQuen[] = [];
          for (let vi = 1; vi <= 3; vi++) {
            const rawV = f[`Việc ${vi}`];
            if (rawV) {
              const m = new RegExp(`^(${MA})\\s*·\\s*mở sau\\s+(${MA})$`).exec(rawV.trim());
              if (!m) loi.push({ ...vt, thongBao: `${ten}: "Việc ${vi}" phải có dạng "<mã> · mở sau <vụ>": "${rawV}"` });
              else viec.push({ id: m[1] ?? '', moSau: m[2] ?? '' });
            }
          }
          let anh = '';
          let chuThich: string | null = null;
          let moTa: string | null = null;
          const rawCg = f['Ảnh CG'];
          if (rawCg) {
            const mCg = new RegExp(`^(${MA})((?:\\s*·\\s*(?:chú thích|mô tả):\\s*[^·]+)*)$`).exec(rawCg.trim());
            if (!mCg) {
              anh = rawCg.trim();
            } else {
              anh = mCg[1] ?? '';
              for (const part of (mCg[2] ?? '').split('·').slice(1)) {
                const [k, ...v] = part.split(':');
                const key = (k ?? '').trim();
                const val = v.join(':').trim();
                if (key === 'chú thích') chuThich = val;
                else if (key === 'mô tả') moTa = val;
              }
            }
          }
          if (lich.nguoiQuen.some((n) => n.id === nguoiQuen?.id)) loi.push({ ...vt, thongBao: `mã người quen "${nguoiQuen.id}" trùng lặp trong lich.md` });
          lich.nguoiQuen.push({
            id: nguoiQuen.id,
            ten: nguoiQuen.ten,
            moSau: canCo(f, 'Mở sau', vt, ten) ?? '',
            viec,
            anhCg: { anh, chuThich, moTa },
            giupO: canCo(f, 'Giúp ở', vt, ten) ?? '',
            viTri: vt,
          });
          nguoiQuen = null;
          break;
        }
        default:
          break;
      }
      fields = {};
      chuMuc = null;
      muc = null;
    };
    const dong = (line: string, i: number): number => {
      if (line.trim() === '') return i;
      if (line.startsWith('# ')) {
        const m = new RegExp(`^# (.+) \\{vụ: (${MA})\\}$`).exec(line);
        if (!m) throw new Error(`tiêu đề lịch sai quy ước "${line}" — viết "# <Tên vụ> {vụ: <mã>}"`);
        lich.vu = { id: m[2] ?? '', ten: m[1] ?? '' };
        return i;
      }
      if (line.startsWith('## ')) {
        dongMuc();
        chuMuc = viTri();
        if (line === '## Luật') muc = 'luat';
        else if (line === '## Mở đầu') muc = 'mo-dau';
        else if (line === '## Kết') muc = 'ket';
        else {
          const n = /^## (.+) \{ngày: (\d+)( · theo truyện)?(?: · bắt đầu ở: ([a-zA-Z0-9_-]+))?\}$/.exec(line);
          const h = /^## (.+) \{ngày họp\}$/.exec(line);
          const v = new RegExp(`^## (.+) \\{(vụ sau|nhiệm vụ phụ): (${MA})\\}$`).exec(line);
          const le = new RegExp(`^## (.+) \\{việc ngày lễ: (${MA})\\}$`).exec(line);
          const nq = new RegExp(`^## (.+) \\{người quen: (${MA})\\}$`).exec(line);
          if (v) {
            muc = 'vu-sau';
            vuSau = { id: v[3] ?? '', ten: v[1] ?? '', phu: v[2] === 'nhiệm vụ phụ' };
          } else if (le) {
            muc = 'viec-ngay-le';
            viecNgayLe = { id: le[2] ?? '', ten: le[1] ?? '' };
          } else if (nq) {
            muc = 'nguoi-quen';
            nguoiQuen = { id: nq[2] ?? '', ten: nq[1] ?? '' };
          } else if (n) {
            muc = 'ngay';
            const kieu = n[3] ? 'theo-truyen' : 'dia-diem';
            const batDauO = n[4] ?? null;
            ngay = { so: Number(n[2]), ten: n[1] ?? '', kieu, chuoi: null, batDauO, duKienChinh: '', moNgay: null, buoiToi: '', viTri: viTri(), dongChinh: viTri().dong };
          } else if (h) muc = 'ngay-hop';
          else throw new Error(`tiêu đề lạ trong lich.md "${line}" — dùng "## Luật", "## Mở đầu", "## <Tên> {ngày: n}", "## <Tên> {ngày: n · theo truyện}", "## <Tên> {ngày họp}", "## Kết", "## <Tên> {vụ sau: <mã>}", "## <Tên> {nhiệm vụ phụ: <mã>}", "## <Tên> {việc ngày lễ: <mã>}", "## <Tên> {người quen: <mã>}"`);
        }
        return i;
      }
      if (muc === null) throw new Error(`dòng nằm ngoài mục "## …": "${line}"`);
      if (!ganField(fields, line, `mục ${muc}`)) throw new Error(`dòng không khớp quy ước "- Nhãn: giá trị": "${line}"`);
      if (ngay && line.startsWith('- Dữ kiện chính:')) ngay.dongChinh = viTri().dong;
      return i;
    };
    return { dong, het: dongMuc };
  }

  // ---------- kich-ban/*.md ----------
  function docKichBan({ viTri, lines }: { viTri: () => ViTri; lines: string[] }) {
    let seq: RawChuoiMvp | null = null;
    let question: (MucMvp & { kind: 'question' }) | null = null;
    let doiChat: (MucMvp & { kind: 'doi-chat' }) | null = null;
    let branch: RawReNhanh | null = null;
    let pick: (MucMvp & { kind: 'line-pick' }) | null = null;
    let tao: RawTaoNhanVat | null = null;
    let kham: (MucMvp & { kind: 'explore' }) | null = null;
    /** Gói B19: `[SỬA TRUY VẤN … · tính vạch]` vừa đọc — nhận dòng con `[SAI LẦN ĐẦU CẢ BUỔI]`. */
    let suaTinhVach: RawTinhVach | null = null;
    let choSql: (MucMvp & { kind: 'trial-filter' }) | (MucMvp & { kind: 'projector' }) | null = null;

    const dongCon = (): void => {
      question = null;
      doiChat = null;
      branch = null;
      pick = null;
      tao = null;
      kham = null;
      suaTinhVach = null;
    };
    /** `  - [SAI LẦN ĐẦU CẢ BUỔI] → phản hồi: …` (gói B19); không phải dòng ấy → `null`. */
    const docSaiLanDau = (line: string, tv: RawTinhVach | null, ten: string): boolean => {
      const m = /^ {2}- \[SAI LẦN ĐẦU CẢ BUỔI\] → phản hồi: (.+)$/.exec(line);
      if (!m) return false;
      if (!tv) throw new Error(`${ten}: dòng con [SAI LẦN ĐẦU CẢ BUỔI] chỉ dùng trong lệnh "· tính vạch"`);
      if (tv.saiLanDau) throw new Error(`${ten}: [SAI LẦN ĐẦU CẢ BUỔI] lặp lại`);
      tv.saiLanDau = parseFeedbackDc(m[1] ?? '');
      return true;
    };
    const hetChoSql = (): void => {
      const cho = choSql;
      if (!cho) return;
      choSql = null;
      throw new Error(`[${cho.kind === 'trial-filter' ? 'LỌC THỬ' : 'MÀN CHIẾU'} ${cho.id}] thiếu khối \`\`\`sql ngay dưới`);
    };
    const push = (it: MucMvp): void => {
      if (!seq) throw new Error('dòng nằm ngoài chuỗi');
      seq.items.push(it);
      seq.itemDong.push(viTri().dong);
    };

    const dong = (line: string, i: number): number => {
      const add = (it: MucMvp): number => {
        push(it);
        return i;
      };
      if (line.trim() === '' || line === '---' || line.startsWith('## ')) return i;
      if (line.startsWith('### ')) {
        dongCon();
        hetChoSql();
        const m = new RegExp(`^### (${MA}) — (.+) \\{cảnh: (${MA})(?: · (cảnh cắt))?\\}$`).exec(line);
        if (!m) throw new Error(`tiêu đề chuỗi sai quy ước "${line}" — viết "### <mã> — <mô tả> {cảnh: <mã cảnh>[ · cảnh cắt]}"`);
        const canhCat = m[4] === 'cảnh cắt';
        seq = { id: m[1] ?? '', title: m[2] ?? '', canh: m[3] ?? '', canhCat, items: [], itemDong: [], viTri: viTri() };
        mvp.chuoi.push(seq);
        return i;
      }
      if (!seq) throw new Error(`dòng nằm ngoài chuỗi "${line}"`);

      if (line.startsWith('```')) {
        const lang = line.slice(3);
        const body: string[] = [];
        let j = i + 1;
        while (j < lines.length && !(lines[j] ?? '').startsWith('```')) {
          body.push(lines[j] ?? '');
          j++;
        }
        if (j >= lines.length) throw new Error('khối mã không có dòng ``` đóng');
        const cho = choSql;
        choSql = null;
        if (lang !== 'sql') {
          loi.push({ ...viTri(), thongBao: `khối mã phải là \`\`\`sql (gặp "${line}")` });
          return j;
        }
        if (!cho) {
          loi.push({ ...viTri(), thongBao: 'khối ```sql phải nằm ngay dưới [LỌC THỬ …] hoặc [MÀN CHIẾU …] chưa có nguồn' });
          return j;
        }
        if (cho.kind === 'trial-filter') cho.sql = body.join('\n');
        else cho.source = { kind: 'sql', sql: body.join('\n') };
        return j;
      }

      // Dòng con (thụt 2 khoảng)
      if (line.startsWith('  - ')) {
        if (question) {
          if (docSaiLanDau(line, question.tinhVach, `[HỎI ${question.id}]`)) return i;
          const c = parseChoice(line);
          if (!c) throw new Error(`lựa chọn sai quy ước "${line}"`);
          question.choices.push(c);
          return i;
        }
        if (doiChat) {
          const dc = doiChat;
          let m2: RegExpExecArray | null;
          if ((m2 = new RegExp(`^ {2}- \\{(${MA})\\} \\[(ĐỦ CĂN CỨ|HỖ TRỢ|GỢI Ý)\\] → phản hồi: (.+)$`).exec(line))) {
            dc.bangChung.push({ id: m2[1] ?? '', muc: MUC_DOI_CHAT[m2[2] ?? ''] ?? 'goi-y', feedback: parseFeedbackDc(m2[3] ?? '') });
            return i;
          }
          if ((m2 = /^ {2}- \[CÂU HỎI\] (.+)$/.exec(line))) {
            dc.cauHoi = (m2[1] ?? '').trim();
            return i;
          }
          // Gói B19: đối chất `· tính vạch` — `{thẻ} [ĐÚNG]` (lời tùy chọn), `{thẻ} [SAI] → phản hồi:`, `[SAI LẦN ĐẦU CẢ BUỔI]`.
          if ((m2 = new RegExp(`^ {2}- \\{(${MA})\\} \\[(ĐÚNG|SAI)\\](?: → phản hồi: (.+))?$`).exec(line))) {
            if (!dc.tinhVach) throw new Error(`[ĐỐI CHẤT ${dc.id}]: [${m2[2] ?? ''}] chỉ dùng trong đối chất "· tính vạch" — đối chất thường dùng [ĐỦ CĂN CỨ|HỖ TRỢ|GỢI Ý]`);
            if (m2[2] === 'SAI' && !m2[3]) throw new Error(`[ĐỐI CHẤT ${dc.id}]: {${m2[1] ?? ''}} [SAI] cần "→ phản hồi: …"`);
            dc.bangChung.push({ id: m2[1] ?? '', muc: m2[2] === 'ĐÚNG' ? 'dung' : 'sai', feedback: m2[3] ? parseFeedbackDc(m2[3]) : [] });
            return i;
          }
          if (docSaiLanDau(line, dc.tinhVach, `[ĐỐI CHẤT ${dc.id}]`)) return i;
          if ((m2 = /^ {2}- \[CHƯA ĐỦ\] → phản hồi: (.+)$/.exec(line))) {
            dc.chuaDu = parseFeedbackDc(m2[1] ?? '');
            return i;
          }
          if ((m2 = /^ {2}- \[KHÁC\] → phản hồi: (.+)$/.exec(line))) {
            dc.khac = parseFeedbackDc(m2[1] ?? '');
            return i;
          }
          if ((m2 = /^ {2}- \[HẾT LƯỢT\] → phản hồi: (.+)$/.exec(line))) {
            dc.hetLuot = parseFeedbackDc(m2[1] ?? '');
            return i;
          }
          if ((m2 = new RegExp(`^ {2}- \\[NGƯỜI QUEN (${MA})\\] → nói thay: (${MA})$`).exec(line))) {
            dc.nguoiQuen = { ma: m2[1] ?? '', noiThay: m2[2] ?? '' };
            return i;
          }
          throw new Error(`dòng con [ĐỐI CHẤT] sai quy ước "${line}" — viết "  - [CÂU HỎI] …", "  - {<mã thẻ>} [ĐỦ CĂN CỨ|HỖ TRỢ|GỢI Ý] → phản hồi: …", "  - [CHƯA ĐỦ] → phản hồi: …", "  - [KHÁC] → phản hồi: …", "  - [HẾT LƯỢT] → phản hồi: …", "  - [NGƯỜI QUEN <mã>] → nói thay: <chuỗi>"; đối chất "· tính vạch": "  - {<mã thẻ>} [ĐÚNG]", "  - {<mã thẻ>} [SAI] → phản hồi: …", "  - [SAI LẦN ĐẦU CẢ BUỔI] → phản hồi: …"`);
        }
        if (suaTinhVach) {
          if (docSaiLanDau(line, suaTinhVach, '[SỬA TRUY VẤN · tính vạch]')) return i;
          throw new Error(`dòng con của [SỬA TRUY VẤN … · tính vạch] chỉ có "  - [SAI LẦN ĐẦU CẢ BUỔI] → phản hồi: …": "${line}"`);
        }
        if (branch) {
          const m = new RegExp(`^ {2}- \\{id: (${MA})\\}(?: \\[KHI (.+?)\\])? (.+?) → hậu quả: (.+)$`).exec(line);
          if (!m) throw new Error(`lựa chọn rẽ nhánh sai quy ước "${line}" — viết "  - {id: <id>} <lời> → hậu quả: <hậu quả>"`);
          if (line.includes('[ĐÚNG]')) throw new Error('[RẼ NHÁNH] không có lựa chọn [ĐÚNG] (đặc tả §8)');
          branch.choices.push({ id: m[1] ?? '', text: m[3] ?? '', khi: m[2] === undefined ? null : docDieuKien(m[2]), hauQua: docHauQua(m[4] ?? '') });
          return i;
        }
        if (tao) {
          const xx = /^ {2}- xúc xắc: (.+)$/.exec(line);
          const lc = /^ {2}- lựa chọn: (.+)$/.exec(line);
          if (xx && tao.truong === 'ten') tao.xucXac = xx[1] ?? '';
          else if (lc && tao.truong === 'nganh') tao.luaChon = chiaDanhSach(lc[1] ?? '');
          else throw new Error(`[TẠO NHÂN VẬT ${tao.truong}]: dòng con phải là "${tao.truong === 'ten' ? 'xúc xắc: <lời>' : 'lựa chọn: A · B · C'}"`);
          return i;
        }
        if (kham) {
          kham.diem.push(kham.kieu === 'dan' ? docDiemDan(line.slice(4)) : docDiemKhamPha(line.slice(4)));
          return i;
        }
        throw new Error(`dòng con không thuộc [HỎI], [ĐỐI CHẤT], [RẼ NHÁNH], [TẠO NHÂN VẬT] hay [KHÁM PHÁ]: "${line}"`);
      }
      if (line.startsWith('|')) {
        if (!pick) throw new Error('bảng nằm ngoài [CHỌN DÒNG]');
        const cells = line.split('|').slice(1, -1).map((c) => c.trim());
        const index = Number(cells[0]);
        if (!Number.isInteger(index)) return i;
        const sm = /^`(.*)`$/.exec(cells[1] ?? '');
        if (!sm) throw new Error('ô SQL phải là một đoạn mã `…`');
        const fb = cells[3] ?? '';
        pick.rows.push({ index, sql: sm[1] ?? '', correct: cells[2] === 'ĐÚNG', feedback: fb.startsWith('(không có') ? [] : fb.split('<br>').map((p) => parseSpoken(p)) });
        return i;
      }
      // Dòng thường: đóng danh sách con, đòi khối sql nếu đang chờ.
      if (tao && (tao.truong === 'ten' ? tao.xucXac === null : tao.luaChon.length === 0)) {
        const t = tao;
        tao = null;
        throw new Error(`[TẠO NHÂN VẬT ${t.truong}] thiếu dòng con "${t.truong === 'ten' ? 'xúc xắc' : 'lựa chọn'}"`);
      }
      dongCon();
      hetChoSql();

      const task = /^> NHIỆM VỤ: (.+)$/.exec(line);
      if (task) return add({ kind: 'task', text: task[1] ?? '' });
      const nhac = /^> NHẮC VIỆC ([a-z][a-z0-9-]*)(?: \(([a-z][a-z-]*)\))?: (.+)$/.exec(line);
      if (nhac) return add({ kind: 'reminder', speaker: nhac[1] ?? '', expression: nhac[2] ?? null, text: nhac[3] ?? '' });
      if (line.startsWith('> NHẮC VIỆC')) throw new Error(`"${line}" sai quy ước — viết "> NHẮC VIỆC <mã nhân vật> (<biểu cảm>): <câu>"`);
      if (line.startsWith('- **')) return add({ kind: 'line', line: parseSpoken(line.slice(2)), card: false });
      if (line.startsWith('- [THẺ CHỮ] **')) return add({ kind: 'line', line: parseSpoken(line.slice('- [THẺ CHỮ] '.length)), card: true });
      if (line.startsWith('- [DÀN DỰNG] ')) return add({ kind: 'note', text: line.slice('- [DÀN DỰNG] '.length) });
      let m: RegExpExecArray | null;
      if ((m = new RegExp(`^- \\[ĐI TỚI (${MA})\\]$`).exec(line))) return add({ kind: 'goto', to: m[1] ?? '' });
      if ((m = new RegExp(`^- \\[HIỆN TÀI LIỆU (${MA})\\]$`).exec(line))) return add({ kind: 'show-document', id: m[1] ?? '' });
      if ((m = new RegExp(`^- \\[ẢNH (${MA})((?:\\s*·\\s*(?:chú thích|mô tả):\\s*[^·\\]]+)*)\\]$`).exec(line))) {
        let chuThich: string | null = null;
        let moTa: string | null = null;
        const extra = m[2] ?? '';
        if (extra) {
          for (const part of extra.split('·').slice(1)) {
            const [k, ...v] = part.split(':');
            const key = (k ?? '').trim();
            const val = v.join(':').trim();
            if (key === 'chú thích') chuThich = val;
            else if (key === 'mô tả') moTa = val;
          }
        }
        return add({ kind: 'image', id: m[1] ?? '', chuThich, moTa });
      }
      if ((m = new RegExp(`^- \\[HỎI (${MA})((?: · [^\\]·]+)*)\\] ([a-z-]+): "(.*)"$`).exec(line))) {
        const tc = docTuyChonLenh(m[2] ?? '', `[HỎI ${m[1] ?? ''}]`, true);
        question = { kind: 'question', id: m[1] ?? '', asker: { speaker: m[3] ?? '', text: m[4] ?? '' }, choices: [], truUyTin: tc.truUyTin, tinhVach: tc.tinhVach };
        return add(question);
      }
      if ((m = new RegExp(`^- \\[ĐỐI CHẤT (${MA})((?: · [^\\]·]+)*)\\] ([a-z-]+): "(.*)"$`).exec(line))) {
        const tc = docTuyChonLenh(m[2] ?? '', `[ĐỐI CHẤT ${m[1] ?? ''}]`, true);
        doiChat = { kind: 'doi-chat', id: m[1] ?? '', asker: { speaker: m[3] ?? '', text: m[4] ?? '' }, cauHoi: null, bangChung: [], chuaDu: null, khac: null, hetLuot: null, truUyTin: tc.truUyTin, nguoiQuen: null, tinhVach: tc.tinhVach };
        return add(doiChat);
      }
      if ((m = new RegExp(`^- \\[(THỬ THÁCH|SỬA TRUY VẤN) (${MA})((?: · [^\\]·]+)*)\\]$`).exec(line))) {
        if (m[1] === 'THỬ THÁCH') {
          if (m[3]) throw new Error(`[THỬ THÁCH ${m[2] ?? ''}] không có mục thêm (" · tính vạch" chỉ dùng với [SỬA TRUY VẤN], [ĐỐI CHẤT], [HỎI])`);
          return add({ kind: 'challenge', id: m[2] ?? '' });
        }
        const tc = docTuyChonLenh(m[3] ?? '', `[SỬA TRUY VẤN ${m[2] ?? ''}]`, false);
        suaTinhVach = tc.tinhVach;
        return add({ kind: 'fix-query', id: m[2] ?? '', tinhVach: tc.tinhVach });
      }
      // Gói B19: dòng thời gian, chấm vụ, sổ tổng kết, điểm lưu đầu vụ, ghép mẫu.
      if ((m = new RegExp(`^- \\[(HIỆN )?DÒNG THỜI GIAN (${MA})\\]$`).exec(line))) return add({ kind: 'dong-thoi-gian', id: m[2] ?? '', chiXem: m[1] !== undefined });
      if ((m = new RegExp(`^- \\[CHẤM VỤ (${MA})\\](?: cần: (.+))?$`).exec(line))) return add({ kind: 'cham-vu', vu: m[1] ?? '', can: chiaDanhSach(m[2] ?? '') });
      if (line.startsWith('- [CHẤM VỤ')) throw new Error(`[CHẤM VỤ] sai quy ước "${line}" — viết "- [CHẤM VỤ <vụ>] cần: <thẻ>, <thẻ>, <dòng thời gian>"`);
      if ((m = new RegExp(`^- \\[SỔ TỔNG KẾT (${MA})\\]$`).exec(line))) return add({ kind: 'so-tong-ket', vu: m[1] ?? '' });
      if ((m = new RegExp(`^- \\[ĐIỂM LƯU VỤ (${MA})\\]$`).exec(line))) return add({ kind: 'diem-luu-vu', vu: m[1] ?? '' });
      if ((m = new RegExp(`^- \\[GHÉP MẪU\\] ([a-z][a-z0-9-]*): (${MA}) \\+ (${MA}) · giấy nhớ: "(.+)"$`).exec(line))) {
        if (m[2] === m[3]) throw new Error(`[GHÉP MẪU]: hai thẻ phải khác nhau ("${m[2] ?? ''}")`);
        return add({ kind: 'ghep-mau', nguoi: m[1] ?? '', the: [m[2] ?? '', m[3] ?? ''], giayNho: m[4] ?? '' });
      }
      if (line.startsWith('- [GHÉP MẪU]')) throw new Error(`[GHÉP MẪU] sai quy ước "${line}" — viết "- [GHÉP MẪU] <ai>: <thẻ> + <thẻ> · giấy nhớ: \\"<chữ>\\""`);
      if ((m = new RegExp(`^- \\[HIỆU ỨNG (${MA})\\]$`).exec(line))) return add({ kind: 'effect', id: m[1] ?? '' });
      if ((m = new RegExp(`^- \\[CHỌN DÒNG (${MA})( · trừ uy tín)?\\]$`).exec(line))) {
        pick = { kind: 'line-pick', id: m[1] ?? '', rows: [], truUyTin: m[2] !== undefined };
        return add(pick);
      }
      if (line.startsWith('- [MÀN CHIẾU ')) {
        const p = parseProjector(line);
        if (!p) throw new Error(`[MÀN CHIẾU] sai quy ước "${line}" — viết [MÀN CHIẾU <mã> · chạy · <n> dòng]`);
        const item: MucMvp & { kind: 'projector' } = {
          kind: 'projector',
          id: p.id,
          source: p.evidence ? { kind: 'evidence', evidenceId: p.evidence } : p.preload ? { kind: 'preload', challengeId: p.preload } : { kind: 'sql', sql: '' },
          run: p.run,
          rows: p.rows,
        };
        if (!p.evidence && !p.preload) choSql = item;
        return add(item);
      }
      if (line === '- [XONG VIỆC CHÍNH]') return add({ kind: 'xong-viec-chinh' });
      if ((m = new RegExp(`^- \\[HỎI ĐÁP (${MA})\\]$`).exec(line))) return add({ kind: 'hoi-dap', ma: m[1] ?? '' });
      if (line === '- [KẾT THÚC]') return add({ kind: 'end' });
      if ((m = /^- \[(VÀO|RA) ([a-z-]+)\]$/.exec(line))) return add({ kind: 'stage', action: m[1] === 'VÀO' ? 'vao' : 'ra', nhanVat: m[2] ?? '' });
      if ((m = new RegExp(`^- \\[BIẾT (${MA}) ([^\\]]+)\\]$`).exec(line))) {
        const ds = docDanhSachTruongBiet(m[2] ?? '');
        if (ds.loi || ds.truong.length === 0) throw new Error(`[BIẾT ${m[1]}]: ${ds.loi ?? 'cần ít nhất một trường'} — viết "[BIẾT <mã> họ tên, năm]"`);
        return add({ kind: 'biet', nhanVat: m[1] ?? '', truong: ds.truong });
      }
      if ((m = /^- \[CHỜ (\d+) giây\]$/.exec(line))) return add({ kind: 'wait', giay: Number(m[1]) });
      if ((m = /^- \[NGÀY (\d{4}-\d{2}-\d{2})\]$/.exec(line))) {
        if (!ngayHopLe(m[1] ?? '')) throw new Error(`[NGÀY] không hợp lệ: "${m[1]}"`);
        return add({ kind: 'set-date', date: m[1] ?? '' });
      }
      if ((m = /^- \[ĐIỀU KIỆN\] (.+)$/.exec(line))) {
        if (seq.items.length > 0) throw new Error('[ĐIỀU KIỆN] phải là dòng đầu của chuỗi');
        return add({ kind: 'condition', dieuKien: docDieuKien(m[1] ?? ''), chu: m[1] ?? '' });
      }
      if ((m = new RegExp(`^- \\[NẾU (.+)\\] → đi tới (${MA})$`).exec(line))) return add({ kind: 'jump-if', dieuKien: docDieuKien(m[1] ?? ''), chuoi: m[2] ?? '' });
      if (line.startsWith('- [NẾU ')) throw new Error(`[NẾU] sai quy ước "${line}" — viết "- [NẾU <điều kiện>] → đi tới <chuỗi>"`);
      if ((m = /^- \[HẬU QUẢ\] (.+)$/.exec(line))) return add({ kind: 'consequence', hauQua: docHauQua(m[1] ?? '') });
      if ((m = new RegExp(`^- \\[RẼ NHÁNH (${MA})\\] ([a-z-]+): "(.*)"$`).exec(line))) {
        branch = { id: m[1] ?? '', asker: { speaker: m[2] ?? '', text: m[3] ?? '' }, choices: [] };
        return add({ kind: 'branch', branch });
      }
      if ((m = new RegExp(`^- \\[TRA SỔ (${MA}) · (cú pháp|tâm đắc|lỗi thường gặp)\\]$`).exec(line))) return add({ kind: 'notebook-lookup', trang: m[1] ?? '', phan: m[2] ?? '' });
      if ((m = new RegExp(`^- \\[GHI SỔ (${MA})\\]$`).exec(line))) return add({ kind: 'notebook-note', trang: m[1] ?? '' });
      if (line.startsWith('- [CHÉP SỔ ')) throw new Error('[CHÉP SỔ] đã bỏ (QĐ-092): dùng [GHI SỔ <trang>] — dòng "Vào sổ cá nhân" của trang tự vào sổ cá nhân');
      if ((m = /^- \[TẠO NHÂN VẬT (ten|nganh)\] ([a-z-]+)(?: \(([a-z][a-z-]*)\))?: "(.*)"$/.exec(line))) {
        tao = { truong: m[1] === 'ten' ? 'ten' : 'nganh', asker: { speaker: m[2] ?? '', expression: m[3] ?? null, text: m[4] ?? '' }, xucXac: null, luaChon: [] };
        return add({ kind: 'create-character', tao });
      }
      if ((m = new RegExp(`^- \\[LỌC THỬ (${MA}) · (\\d+) dòng · chọn ([a-z_][a-z0-9_]*) = (.+)\\]$`).exec(line))) {
        const item: MucMvp & { kind: 'trial-filter' } = { kind: 'trial-filter', id: m[1] ?? '', sql: '', soDong: Number(m[2]), chon: { cot: m[3] ?? '', giaTri: m[4] ?? '' } };
        choSql = item;
        return add(item);
      }
      if ((m = new RegExp(`^- \\[LƯU BẰNG CHỨNG (${MA})\\]$`).exec(line))) return add({ kind: 'save-evidence', id: m[1] ?? '' });
      if ((m = new RegExp(`^- \\[ĐI CÙNG (${MA})\\](?: (.*))?$`).exec(line))) {
        if (!m[2] || m[2].trim() === '') throw new Error(`[ĐI CÙNG] thiếu nhãn nút`);
        return add({ kind: 'go-with', to: m[1] ?? '', label: m[2].trim() });
      }
      if ((m = new RegExp(`^- \\[HẾT NGÀY(?: (${MA}))?\\](?: (.*))?$`).exec(line))) {
        if (!m[2] || m[2].trim() === '') throw new Error(`[HẾT NGÀY] thiếu nhãn nút`);
        return add({ kind: 'het-ngay', to: m[1] ?? null, label: m[2].trim() });
      }
      if (line === '- [RẼ KẾT]') return add({ kind: 'ending-branch' });
      // `quan sát <nv>/<dáng>`: soi nhân vật trong một dáng / bộ đồ cụ thể; `· Hà Vy soi`: mở bằng cảnh cắt đôi mắt Hà Vy (kính lóe sáng).
      if ((m = new RegExp(`^- \\[KHÁM PHÁ (${MA})(?: · (bản đồ(?: · giờ (\\d\\d:\\d\\d))?|quan sát (${MA})(?:/(${MA}))?( · Hà Vy soi)?|dàn))?\\]$`).exec(line))) {
        kham = { kind: 'explore', id: m[1] ?? '', diem: [], kieu: m[2]?.startsWith('bản đồ') ? 'ban-do' : m[2] === 'dàn' ? 'dan' : m[2] ? 'quan-sat' : 'canh', nhanVat: m[4] ?? null, gio: m[3] ?? null, dang: m[5] ?? null, haVySoi: m[6] !== undefined };
        return add(kham);
      }
      if (line.startsWith('- [') && /^- \[[A-ZÀ-Ỹ]/.test(line)) {
        const tu = /^- \[([^\]·\s]+(?: [^\]·\s]+)*)/.exec(line)?.[1] ?? '';
        throw new Error(`chỉ dẫn "[${tu}…]" không có trong đặc tả §18.6 hoặc viết sai chính tả: "${line}"`);
      }
      throw new Error(`dòng không khớp quy ước nào trong chuỗi: "${line}"`);
    };
    return {
      dong,
      het: () => {
        hetChoSql();
        if (tao && (tao.truong === 'ten' ? tao.xucXac === null : tao.luaChon.length === 0)) throw new Error(`[TẠO NHÂN VẬT ${tao.truong}] thiếu dòng con`);
      },
    };
  }

  // ---------- dong-thoi-gian.md (gói B19) ----------
  /**
   * `## <mã> — <tên> {kiểu: tập dượt|chính}` rồi các dòng đầu mục (`- Người nhắc khi kéo sai:`, `- Thẻ tạm: a = … · b = …`,
   * `- Kéo sai: <lời>`), rồi các ô `### <mã> · <giờ> · <nơi> · <việc>` với `- Nhận:`, `- Khóa sẵn`, `- Không điền được:`,
   * `- Kéo sai:`, `- Kéo vào chỗ trống:`.
   */
  function docDongThoiGian({ viTri }: { viTri: () => ViTri }) {
    let dtg: RawDongThoiGian | null = null;
    let o: RawODongThoiGian | null = null;
    const dong = (line: string, i: number): number => {
      if (line.trim() === '' || line === '---' || line.startsWith('# ')) return i;
      if (line.startsWith('## ')) {
        const m = new RegExp(`^## (${MA}) — (.+?)(?: \\{kiểu: (tập dượt|chính)\\})?$`).exec(line);
        if (!m) throw new Error(`tiêu đề dòng thời gian sai quy ước "${line}" — viết "## <mã> — <tên> {kiểu: tập dượt|chính}"`);
        dtg = { id: m[1] ?? '', ten: (m[2] ?? '').trim(), kieu: m[3] === 'tập dượt' ? 'tap-duot' : 'chinh', nguoiNhac: null, keoSai: null, theTam: [], o: [], viTri: viTri() };
        mvp.dongThoiGian.push(dtg);
        o = null;
        return i;
      }
      if (!dtg) throw new Error(`dòng nằm ngoài dòng thời gian "## …": "${line}"`);
      const d: RawDongThoiGian = dtg;
      if (line.startsWith('### ')) {
        const td = docTieuDeO(line.slice(4).trim());
        o = { ...td, nhan: [], khoaSan: false, khongDien: null, keoSai: null, keoVaoTrong: null, viTri: viTri() };
        d.o.push(o);
        return i;
      }
      if (line.trim() === '- Khóa sẵn') {
        if (!o) throw new Error('"- Khóa sẵn" phải nằm trong một ô "### …"');
        o.khoaSan = true;
        return i;
      }
      const f = /^- ([^:]+): (.+)$/.exec(line);
      if (!f) throw new Error(`dòng lạ trong dòng thời gian ${d.id}: "${line}"`);
      const nhan = (f[1] ?? '').trim();
      const gt = (f[2] ?? '').trim();
      if (!o) {
        if (nhan === 'Người nhắc khi kéo sai') {
          if (!/^[a-z][a-z0-9-]*$/.test(gt)) throw new Error(`dòng thời gian ${d.id}: "Người nhắc khi kéo sai" phải là mã nhân vật: "${gt}"`);
          d.nguoiNhac = gt;
        } else if (nhan === 'Thẻ tạm') {
          for (const phan of gt.split(/\s+·\s+/)) {
            const t = new RegExp(`^(${MA}) = (.+)$`).exec(phan.trim());
            if (!t) throw new Error(`dòng thời gian ${d.id}: thẻ tạm phải viết "<mã> = <chữ trên thẻ>", cách nhau bằng " · ": "${phan}"`);
            if (d.theTam.some((x) => x.id === t[1])) throw new Error(`dòng thời gian ${d.id}: thẻ tạm "${t[1] ?? ''}" khai hai lần`);
            d.theTam.push({ id: t[1] ?? '', chu: (t[2] ?? '').trim() });
          }
        } else if (nhan === 'Kéo sai') d.keoSai = parseFeedbackDc(gt);
        else throw new Error(`dòng thời gian ${d.id}: dòng lạ "- ${nhan}:" — đầu mục chỉ có "Người nhắc khi kéo sai", "Thẻ tạm", "Kéo sai"`);
        return i;
      }
      if (nhan === 'Nhận') o.nhan = chiaDanhSach(gt);
      else if (nhan === 'Không điền được') o.khongDien = gt;
      else if (nhan === 'Kéo sai') o.keoSai = parseFeedbackDc(gt);
      else if (nhan === 'Kéo vào chỗ trống') o.keoVaoTrong = parseFeedbackDc(gt);
      else throw new Error(`ô ${o.id}: dòng lạ "- ${nhan}:" — ô có "Nhận", "Khóa sẵn", "Không điền được", "Kéo sai", "Kéo vào chỗ trống"`);
      return i;
    };
    return { dong };
  }

  // ---------- so-tay/<trang>.md ----------
  function docSoTay({ viTri }: { viTri: () => ViTri }) {
    let trang: RawTrangSo | null = null;
    let muc: 'linh' | 'ha-vy' | 'so-ca-nhan' | null = null;
    const dong = (line: string, i: number): number => {
      if (line.trim() === '') return i;
      if (line.startsWith('# ')) {
        if (trang) throw new Error('mỗi tệp sổ tay chỉ có một trang');
        const m = new RegExp(`^# (${MA}) — (.+) \\{trang sổ: (${MA})\\}$`).exec(line);
        if (!m) throw new Error(`tiêu đề trang sổ sai quy ước "${line}" — viết "# <mã> — <Tên> {trang sổ: <mã>}"`);
        if (m[1] !== m[3]) throw new Error(`mã đầu tiêu đề "${m[1] ?? ''}" khác {trang sổ: ${m[3] ?? ''}}`);
        trang = { id: m[1] ?? '', ten: m[2] ?? '', loai: 'cú pháp', trangChiLinh: [], haVy: [], chuThich: null, viTri: viTri() };
        mvp.soTay.push(trang);
        return i;
      }
      if (!trang) throw new Error(`dòng nằm trước tiêu đề trang sổ: "${line}"`);
      if (line.startsWith('## ')) {
        if (line === '## Trang sổ CLB' || line === '## Trang chị Linh') muc = 'linh';
        else if (line === '## Hà Vy') muc = 'ha-vy';
        else if (line === '## Vào sổ cá nhân') muc = 'so-ca-nhan';
        else if (line === '## Chọn đoạn code') throw new Error('mục "## Chọn đoạn code" đã bỏ (QĐ-092): dòng "Vào sổ cá nhân" tự vào sổ khi kịch bản [GHI SỔ]');
        else throw new Error(`mục lạ trong trang sổ "${line}" — dùng "## Trang sổ CLB", "## Hà Vy", "## Vào sổ cá nhân"`);
        return i;
      }
      if (muc === null) {
        const m = /^- Loại: (cú pháp|tâm đắc|lỗi thường gặp)$/.exec(line);
        if (!m) throw new Error(`trước các mục chỉ có dòng "- Loại: cú pháp | tâm đắc | lỗi thường gặp": "${line}"`);
        trang.loai = m[1] as RawTrangSo['loai'];
        return i;
      }
      if (muc === 'linh') {
        trang.trangChiLinh.push(line);
        return i;
      }
      if (muc === 'ha-vy') {
        if (!line.startsWith('- **')) throw new Error(`mục "## Hà Vy" chỉ có lời thoại "- **ha-vy** (…): …": "${line}"`);
        trang.haVy.push(parseSpoken(line.slice(2)));
        return i;
      }
      const ct = /^- Chú thích: (.+)$/.exec(line);
      if (!ct) throw new Error(`mục "## Vào sổ cá nhân" chỉ có dòng "- Chú thích: …": "${line}"`);
      trang.chuThich = ct[1] ?? '';
      return i;
    };
    return {
      dong,
      het: () => {
        if (!trang) throw new Error('tệp sổ tay thiếu tiêu đề "# <mã> — … {trang sổ: <mã>}"');
      },
    };
  }

  // ---------- chung/loi-chung.md ----------
  function docLoiChung({ viTri }: { viTri: () => ViTri }) {
    let muc: 'mat-uy-tin' | null = null;
    const loiTam: RawLine[] = [];
    let hetVach: RawLine | null = null;
    let vt: ViTri | null = null;
    const dong = (): void => {
      if (muc !== 'mat-uy-tin' || !vt) return;
      if (!hetVach) loi.push({ ...vt, thongBao: '"Khi mất uy tín" thiếu dòng "[HẾT VẠCH] **…**: …"' });
      if (loiTam.length === 0) loi.push({ ...vt, thongBao: '"Khi mất uy tín" cần ít nhất một lời khi mất vạch' });
      mvp.loiChung.matUyTin = { loi: [...loiTam], hetVach: hetVach ?? { speaker: '', expression: null, text: '' }, viTri: vt };
      muc = null;
    };
    const docDong = (line: string, i: number): number => {
      if (line.trim() === '' || line.startsWith('## ')) return i;
      if (line.startsWith('### ')) {
        dong();
        if (!/^### Khi mất uy tín \{lời chung: mat-uy-tin\}$/.test(line)) throw new Error(`tiêu đề lạ trong lời chung "${line}" — bước này chỉ có "### Khi mất uy tín {lời chung: mat-uy-tin}"`);
        if (mvp.loiChung.matUyTin) throw new Error('"Khi mất uy tín" đã có');
        muc = 'mat-uy-tin';
        vt = viTri();
        return i;
      }
      if (muc === null) throw new Error(`dòng nằm ngoài khối lời chung: "${line}"`);
      if (line.startsWith('- [HẾT VẠCH] **')) {
        if (hetVach) throw new Error('chỉ một dòng [HẾT VẠCH]');
        hetVach = parseSpoken(line.slice('- [HẾT VẠCH] '.length));
        return i;
      }
      if (line.startsWith('- **')) {
        if (hetVach) throw new Error('[HẾT VẠCH] phải là dòng cuối của khối');
        loiTam.push(parseSpoken(line.slice(2)));
        return i;
      }
      throw new Error(`dòng lạ trong "Khi mất uy tín": "${line}"`);
    };
    return { dong: docDong, het: dong };
  }
}

/** Lời thoại trong chuỗi (kể cả thẻ chữ) — dùng cho kiểm tên cấm, xuất hiện từ. */
export function loiTrongChuoi(c: RawChuoiMvp): { line: RawLine; dong: number }[] {
  const out: { line: RawLine; dong: number }[] = [];
  c.items.forEach((it, k) => {
    const dong = c.itemDong[k] ?? c.viTri.dong;
    if (it.kind === 'line') out.push({ line: it.line, dong });
    else if (it.kind === 'question') {
      out.push({ line: { speaker: it.asker.speaker, expression: null, text: it.asker.text }, dong });
      for (const ch of it.choices) for (const f of ch.feedback) out.push({ line: f, dong });
      for (const f of it.tinhVach?.saiLanDau ?? []) out.push({ line: f, dong });
    } else if (it.kind === 'doi-chat') {
      out.push({ line: { speaker: it.asker.speaker, expression: null, text: it.asker.text }, dong });
      for (const b of it.bangChung) for (const f of b.feedback) out.push({ line: f, dong });
      for (const f of [...(it.chuaDu ?? []), ...(it.khac ?? []), ...(it.hetLuot ?? []), ...(it.tinhVach?.saiLanDau ?? [])]) out.push({ line: f, dong });
    } else if (it.kind === 'fix-query') for (const f of it.tinhVach?.saiLanDau ?? []) out.push({ line: f, dong });
    else if (it.kind === 'branch') out.push({ line: { speaker: it.branch.asker.speaker, expression: null, text: it.branch.asker.text }, dong });
    else if (it.kind === 'create-character') out.push({ line: it.tao.asker, dong });
    else if (it.kind === 'line-pick') for (const r of it.rows) for (const f of r.feedback) out.push({ line: f, dong });
  });
  return out;
}
