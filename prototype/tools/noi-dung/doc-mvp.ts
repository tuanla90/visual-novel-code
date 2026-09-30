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

/** Dòng "Danh xưng" / "Năm" / "Ngành" / "Câu nói" / "Giới thiệu" của nhan-vat.md — chữ NGƯỜI CHƠI thấy, không lộ tình tiết. */
export interface RawGioiThieu {
  danhXung: string;
  nam: string | null;
  nganh: string | null;
  cauNoi: string;
  loi: string;
}

export interface RawCanh {
  id: string;
  ten: string;
  anhNen: string | null;
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
 * `- Ảnh: <sprite> · x <n>% · y <n>% · rộng <n>%` — sprite là `obj-…` (tệp src/assets/mvp/vat/) hoặc `nv:<mã nhân vật>`.
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
  const m = /^(obj-[a-z0-9-]+|nv:[a-z0-9-]+)\s*·\s*x\s+(-?\d+(?:[.,]\d+)?)%\s*·\s*y\s+(-?\d+(?:[.,]\d+)?)%\s*·\s*rộng\s+(-?\d+(?:[.,]\d+)?)%$/.exec(v.trim());
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
  duKienChinh: string;
  moNgay: string | null;
  buoiToi: string;
  viTri: ViTri;
  /** Dòng của "- Dữ kiện chính:" để báo lỗi chi phí khung đúng dòng. */
  dongChinh: number;
}

export interface RawLich {
  vu: { id: string; ten: string };
  khung: { id: string; ten: string }[];
  buoiToi: { id: string; ten: string };
  luat: { chinhToiDaKhung: number; phuNhieuMin: number; phuNhieuMax: number; uyTin: number | null };
  chuoiDau: string;
  ngay: RawNgay[];
  ngayHop: { chuoi: string; viTri: ViTri } | null;
  ket: { that: string; thuong: string; viTri: ViTri } | null;
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
  | { kind: 'line'; line: RawLine; card: boolean }
  | { kind: 'note'; text: string }
  | { kind: 'goto'; to: string }
  | { kind: 'show-document'; id: string }
  | { kind: 'question'; id: string; asker: { speaker: string; text: string }; choices: RawChoice[]; truUyTin: boolean }
  | { kind: 'challenge'; id: string }
  | { kind: 'fix-query'; id: string }
  | { kind: 'effect'; id: string }
  | { kind: 'line-pick'; id: string; rows: RawPickRow[]; truUyTin: boolean }
  | { kind: 'projector'; id: string; source: NguonChieuMvp; run: boolean; rows: number | null }
  | { kind: 'end' }
  | { kind: 'stage'; action: 'vao' | 'ra'; nhanVat: string }
  | { kind: 'wait'; giay: number }
  | { kind: 'condition'; dieuKien: DieuKien; chu: string }
  | { kind: 'consequence'; hauQua: HauQua[] }
  | { kind: 'branch'; branch: RawReNhanh }
  | { kind: 'notebook-lookup'; trang: string; phan: string }
  | { kind: 'notebook-note'; trang: string }
  | { kind: 'create-character'; tao: RawTaoNhanVat }
  | { kind: 'trial-filter'; id: string; sql: string; soDong: number; chon: { cot: string; giaTri: string } }
  | { kind: 'save-evidence'; id: string }
  | { kind: 'ending-branch' }
  | { kind: 'explore'; id: string; diem: RawDiemKhamPha[] };

/** Dòng con của `[KHÁM PHÁ]`: `  - <sprite> · x … · y … · rộng … → <chuỗi>[ · sau: a, b][ · nhãn: …]`. */
export interface RawDiemKhamPha extends RawAnhDuKien {
  chuoi: string;
  sau: string[];
  nhan: string | null;
}

/** Đọc một dòng con của `[KHÁM PHÁ]` (đã bỏ `  - `); sai cú pháp → ném lỗi. */
export function docDiemKhamPha(v: string): RawDiemKhamPha {
  const m = new RegExp(`^(.+?) → (${MA})((?: · (?:sau|nhãn): [^·]+)*)$`).exec(v.trim());
  if (!m) throw new Error(`[KHÁM PHÁ]: dòng con phải là "<obj-… hoặc nv:<mã>> · x <n>% · y <n>% · rộng <n>% → <chuỗi>[ · sau: <chuỗi>, …][ · nhãn: <chữ>]": "${v}"`);
  let anh: RawAnhDuKien;
  try {
    anh = docAnhDuKien(m[1] ?? '');
  } catch (e) {
    throw new Error(`[KHÁM PHÁ]: ${(e as Error).message}`, { cause: e });
  }
  let sau: string[] = [];
  let nhan: string | null = null;
  for (const phan of (m[3] ?? '').split(' · ').slice(1)) {
    const [khoa, ...con] = phan.split(': ');
    const gt = con.join(': ').trim();
    if (khoa === 'sau') sau = chiaDanhSach(gt);
    else nhan = gt;
  }
  return { ...anh, chuoi: m[2] ?? '', sau, nhan };
}

export interface RawChuoiMvp {
  id: string;
  title: string;
  canh: string;
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
}

export type LoaiTepMvp = 'quy-uoc' | 'nhan-vat' | 'canh' | 'dia-diem' | 'lich' | 'du-lieu' | 'kich-ban' | 'thu-thach' | 'so-tay' | 'loi-chung' | 'ho-so';

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
const TRUONG_GIOI_THIEU = ['Danh xưng', 'Năm', 'Ngành', 'Câu nói', 'Giới thiệu'];

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
        nv.gioiThieu = {
          danhXung: fields['Danh xưng'] ?? '',
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
        const m = new RegExp(`^### (${MA}) — (.+)$`).exec(line);
        if (!m) throw new Error(`tiêu đề cảnh sai quy ước "${line}" — viết "### <mã> — <Tên cảnh>"`);
        canh = { id: m[1] ?? '', ten: m[2] ?? '', anhNen: null, viTri: viTri() };
        mvp.canh.push(canh);
        return i;
      }
      if (!canh) throw new Error(`dòng nằm ngoài thẻ cảnh: "${line}"`);
      const m = /^- Ảnh nền: (\S+)$/.exec(line);
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
  function docLich({ viTri, tep }: { viTri: () => ViTri; tep: TepMvp }) {
    type Muc = 'luat' | 'mo-dau' | 'ngay' | 'ngay-hop' | 'ket' | null;
    let muc: Muc = null;
    let ngay: RawNgay | null = null;
    let fields: Record<string, string> = {};
    let chuMuc: ViTri | null = null;
    const lich: RawLich = {
      vu: { id: '', ten: '' },
      khung: [],
      buoiToi: { id: 'toi', ten: 'Buổi tối' },
      luat: { chinhToiDaKhung: 2, phuNhieuMin: 1, phuNhieuMax: 3, uyTin: null },
      chuoiDau: '',
      ngay: [],
      ngayHop: null,
      ket: null,
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
        case 'mo-dau':
          laNgoai(['Chuỗi đầu'], 'mục "## Mở đầu"');
          lich.chuoiDau = canCo(f, 'Chuỗi đầu', vt, 'mục "## Mở đầu"') ?? '';
          break;
        case 'ngay': {
          if (!ngay) break;
          if (ngay.kieu === 'theo-truyen') {
            laNgoai(['Chuỗi'], `ngày ${ngay.so} (theo truyện)`);
            ngay.chuoi = canCo(f, 'Chuỗi', vt, `ngày ${ngay.so} (theo truyện)`) ?? '';
            lich.ngay.push(ngay);
            ngay = null;
            break;
          }
          laNgoai(['Dữ kiện chính', 'Mở ngày', 'Buổi tối'], `ngày ${ngay.so}`);
          ngay.duKienChinh = canCo(f, 'Dữ kiện chính', vt, `ngày ${ngay.so}`) ?? '';
          ngay.buoiToi = canCo(f, 'Buổi tối', vt, `ngày ${ngay.so}`) ?? '';
          ngay.moNgay = f['Mở ngày'] ?? null;
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
          laNgoai(['Kết thật', 'Kết thường'], 'mục "## Kết"');
          lich.ket = { that: canCo(f, 'Kết thật', vt, 'mục "## Kết"') ?? '', thuong: canCo(f, 'Kết thường', vt, 'mục "## Kết"') ?? '', viTri: vt };
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
          const n = /^## (.+) \{ngày: (\d+)( · theo truyện)?\}$/.exec(line);
          const h = /^## (.+) \{ngày họp\}$/.exec(line);
          if (n) {
            muc = 'ngay';
            const kieu = n[3] ? 'theo-truyen' : 'dia-diem';
            ngay = { so: Number(n[2]), ten: n[1] ?? '', kieu, chuoi: null, duKienChinh: '', moNgay: null, buoiToi: '', viTri: viTri(), dongChinh: viTri().dong };
          } else if (h) muc = 'ngay-hop';
          else throw new Error(`tiêu đề lạ trong lich.md "${line}" — dùng "## Luật", "## Mở đầu", "## <Tên> {ngày: n}", "## <Tên> {ngày: n · theo truyện}", "## <Tên> {ngày họp}", "## Kết"`);
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
    let branch: RawReNhanh | null = null;
    let pick: (MucMvp & { kind: 'line-pick' }) | null = null;
    let tao: RawTaoNhanVat | null = null;
    let kham: (MucMvp & { kind: 'explore' }) | null = null;
    let choSql: (MucMvp & { kind: 'trial-filter' }) | (MucMvp & { kind: 'projector' }) | null = null;

    const dongCon = (): void => {
      question = null;
      branch = null;
      pick = null;
      tao = null;
      kham = null;
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
        const m = new RegExp(`^### (${MA}) — (.+) \\{cảnh: (${MA})\\}$`).exec(line);
        if (!m) throw new Error(`tiêu đề chuỗi sai quy ước "${line}" — viết "### <mã> — <mô tả> {cảnh: <mã cảnh>}"`);
        seq = { id: m[1] ?? '', title: m[2] ?? '', canh: m[3] ?? '', items: [], itemDong: [], viTri: viTri() };
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
          const c = parseChoice(line);
          if (!c) throw new Error(`lựa chọn sai quy ước "${line}"`);
          question.choices.push(c);
          return i;
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
          kham.diem.push(docDiemKhamPha(line.slice(4)));
          return i;
        }
        throw new Error(`dòng con không thuộc [HỎI], [RẼ NHÁNH], [TẠO NHÂN VẬT] hay [KHÁM PHÁ]: "${line}"`);
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
      if (line.startsWith('- **')) return add({ kind: 'line', line: parseSpoken(line.slice(2)), card: false });
      if (line.startsWith('- [THẺ CHỮ] **')) return add({ kind: 'line', line: parseSpoken(line.slice('- [THẺ CHỮ] '.length)), card: true });
      if (line.startsWith('- [DÀN DỰNG] ')) return add({ kind: 'note', text: line.slice('- [DÀN DỰNG] '.length) });
      let m: RegExpExecArray | null;
      if ((m = new RegExp(`^- \\[ĐI TỚI (${MA})\\]$`).exec(line))) return add({ kind: 'goto', to: m[1] ?? '' });
      if ((m = new RegExp(`^- \\[HIỆN TÀI LIỆU (${MA})\\]$`).exec(line))) return add({ kind: 'show-document', id: m[1] ?? '' });
      if ((m = new RegExp(`^- \\[HỎI (${MA})( · trừ uy tín)?\\] ([a-z-]+): "(.*)"$`).exec(line))) {
        question = { kind: 'question', id: m[1] ?? '', asker: { speaker: m[3] ?? '', text: m[4] ?? '' }, choices: [], truUyTin: m[2] !== undefined };
        return add(question);
      }
      if ((m = new RegExp(`^- \\[(THỬ THÁCH|SỬA TRUY VẤN) (${MA})\\]$`).exec(line))) return add({ kind: m[1] === 'THỬ THÁCH' ? 'challenge' : 'fix-query', id: m[2] ?? '' });
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
      if (line === '- [KẾT THÚC]') return add({ kind: 'end' });
      if ((m = /^- \[(VÀO|RA) ([a-z-]+)\]$/.exec(line))) return add({ kind: 'stage', action: m[1] === 'VÀO' ? 'vao' : 'ra', nhanVat: m[2] ?? '' });
      if ((m = /^- \[CHỜ (\d+) giây\]$/.exec(line))) return add({ kind: 'wait', giay: Number(m[1]) });
      if ((m = /^- \[ĐIỀU KIỆN\] (.+)$/.exec(line))) {
        if (seq.items.length > 0) throw new Error('[ĐIỀU KIỆN] phải là dòng đầu của chuỗi');
        return add({ kind: 'condition', dieuKien: docDieuKien(m[1] ?? ''), chu: m[1] ?? '' });
      }
      if ((m = /^- \[HẬU QUẢ\] (.+)$/.exec(line))) return add({ kind: 'consequence', hauQua: docHauQua(m[1] ?? '') });
      if ((m = new RegExp(`^- \\[RẼ NHÁNH (${MA})\\] ([a-z-]+): "(.*)"$`).exec(line))) {
        branch = { id: m[1] ?? '', asker: { speaker: m[2] ?? '', text: m[3] ?? '' }, choices: [] };
        return add({ kind: 'branch', branch });
      }
      if ((m = new RegExp(`^- \\[TRA SỔ (${MA}) · (cú pháp|tâm đắc|lỗi thường gặp)\\]$`).exec(line))) return add({ kind: 'notebook-lookup', trang: m[1] ?? '', phan: m[2] ?? '' });
      if ((m = new RegExp(`^- \\[GHI SỔ (${MA})\\]$`).exec(line))) return add({ kind: 'notebook-note', trang: m[1] ?? '' });
      if (line.startsWith('- [CHÉP SỔ ')) throw new Error('[CHÉP SỔ] đã bỏ (QĐ-092): dùng [GHI SỔ <trang>] — dòng "Vào sổ cá nhân" của trang tự vào sổ cá nhân');
      if ((m = /^- \[TẠO NHÂN VẬT (ten|nganh)\] ([a-z-]+)(?: \(([a-z]+)\))?: "(.*)"$/.exec(line))) {
        tao = { truong: m[1] === 'ten' ? 'ten' : 'nganh', asker: { speaker: m[2] ?? '', expression: m[3] ?? null, text: m[4] ?? '' }, xucXac: null, luaChon: [] };
        return add({ kind: 'create-character', tao });
      }
      if ((m = new RegExp(`^- \\[LỌC THỬ (${MA}) · (\\d+) dòng · chọn ([a-z_][a-z0-9_]*) = (.+)\\]$`).exec(line))) {
        const item: MucMvp & { kind: 'trial-filter' } = { kind: 'trial-filter', id: m[1] ?? '', sql: '', soDong: Number(m[2]), chon: { cot: m[3] ?? '', giaTri: m[4] ?? '' } };
        choSql = item;
        return add(item);
      }
      if ((m = new RegExp(`^- \\[LƯU BẰNG CHỨNG (${MA})\\]$`).exec(line))) return add({ kind: 'save-evidence', id: m[1] ?? '' });
      if (line === '- [RẼ KẾT]') return add({ kind: 'ending-branch' });
      if ((m = new RegExp(`^- \\[KHÁM PHÁ (${MA})\\]$`).exec(line))) {
        kham = { kind: 'explore', id: m[1] ?? '', diem: [] };
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
        if (line === '## Trang chị Linh') muc = 'linh';
        else if (line === '## Hà Vy') muc = 'ha-vy';
        else if (line === '## Vào sổ cá nhân') muc = 'so-ca-nhan';
        else if (line === '## Chọn đoạn code') throw new Error('mục "## Chọn đoạn code" đã bỏ (QĐ-092): dòng "Vào sổ cá nhân" tự vào sổ khi kịch bản [GHI SỔ]');
        else throw new Error(`mục lạ trong trang sổ "${line}" — dùng "## Trang chị Linh", "## Hà Vy", "## Vào sổ cá nhân"`);
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
    } else if (it.kind === 'branch') out.push({ line: { speaker: it.branch.asker.speaker, expression: null, text: it.branch.asker.text }, dong });
    else if (it.kind === 'create-character') out.push({ line: it.tao.asker, dong });
    else if (it.kind === 'line-pick') for (const r of it.rows) for (const f of r.feedback) out.push({ line: f, dong });
  });
  return out;
}
