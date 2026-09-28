/**
 * KIỂU DỮ LIỆU KỊCH BẢN MVP (gói 12m, đặc tả §18) — hình dạng của `src/content/generated/mvp/kich-ban.gen.ts`
 * (sinh bởi tools/noi-dung/sinh-mvp.ts, `satisfies KichBanMvp`).
 *
 * Chưa có runtime đọc kiểu này (gói kiến trúc MVP, QĐ-077). Mọi mã (id) là chuỗi thường; kiểm tra tham chiếu
 * do bộ đọc làm lúc sinh (luat-mvp.ts), không phải TypeScript.
 */

/** Mốc thời gian trong lịch. */
export type MocMvp = { kind: 'mo-dau' } | { kind: 'ngay'; ngay: number; khung: string } | { kind: 'ngay-hop' };

export type DieuKienMvp =
  | { kind: 'co'; id: string }
  | { kind: 'khong-co'; id: string }
  | { kind: 'va' | 'hoac'; cac: DieuKienMvp[] };

export type HauQuaMvp =
  | { kind: 'mo-manh-moi'; id: string }
  | { kind: 'hien-tai-lieu'; id: string }
  | { kind: 'luu-bang-chung'; id: string }
  | { kind: 'dat-co'; co: string }
  | { kind: 'bo-co'; co: string }
  | { kind: 'di-toi'; chuoi: string }
  | { kind: 'tru-uy-tin' };

export interface LoiMvp {
  speaker: string;
  expression?: string;
  /** Có thể chứa `{{nv.nguoi-choi}}` — runtime thay bằng tên người chơi. */
  text: string;
}

export interface LuaChonMvp {
  id: string;
  text: string;
  correct: boolean;
  feedback: LoiMvp[];
}

export interface NhanVatMvp {
  id: string;
  ten: string;
  hoTen: string | null;
  trongCau: string;
  vai: string;
  bieuCam: string[];
  xuatHienTu: MocMvp;
  chiQuaLoiKe: boolean;
}

export interface CanhMvp {
  id: string;
  ten: string;
  anhNen: string | null;
}

export type NhanDuKienMvp = 'chinh' | 'phu' | 'nhieu';

export interface DuKienMvp {
  id: string;
  moTa: string;
  /** Chỉ người viết thấy; không hiển thị. */
  nhan: NhanDuKienMvp;
  moTu: MocMvp;
  can: DieuKienMvp | null;
  hanhDong: { kind: 'chuoi'; chuoi: string } | { kind: 'thu-thach'; thuThach: string };
  moManhMoi: string[];
  hienTaiLieu: string[];
  luuBangChung: string[];
  lap: 'mot-lan' | 'moi-lan';
}

export interface DiaDiemMvp {
  id: string;
  ten: string;
  canh: string;
  moTu: MocMvp;
  tonKhung: { vao: number; moiDuKien: number };
  phanBiet: string | null;
  duKien: DuKienMvp[];
}

export interface NgayMvp {
  so: number;
  ten: string;
  duKienChinh: string;
  moNgay: string | null;
  buoiToi: string;
}

export interface LichMvp {
  vu: { id: string; ten: string };
  khung: { id: string; ten: string }[];
  buoiToi: { id: string; ten: string };
  luat: { chinhToiDaKhung: number; phuNhieuMin: number; phuNhieuMax: number; uyTin: number | null };
  chuoiDau: string;
  ngay: NgayMvp[];
  ngayHop: { chuoi: string } | null;
  ket: { that: string; thuong: string } | null;
}

export type NutMvp =
  | { type: 'task'; text: string }
  | { type: 'line'; speaker: string; expression?: string; display?: 'card'; text: string }
  | { type: 'note'; text: string }
  | { type: 'goto'; to: string }
  | { type: 'show-document'; documentId: string }
  | { type: 'question'; id: string; asker: { speaker: string; text: string }; choices: LuaChonMvp[]; truUyTin: boolean }
  | { type: 'challenge'; challengeId: string }
  | { type: 'fix-query'; challengeId: string }
  | { type: 'effect'; effectId: string }
  | { type: 'line-pick'; id: string; lines: { index: number; sql: string; correct: boolean; feedback: LoiMvp[] }[]; truUyTin: boolean }
  | { type: 'projector'; id: string; source: { kind: 'sql'; sql: string } | { kind: 'evidence'; evidenceId: string }; run: boolean; expectedRowCount?: number }
  | { type: 'end' }
  | { type: 'stage'; action: 'vao' | 'ra'; nhanVat: string }
  | { type: 'wait'; giay: number }
  | { type: 'condition'; dieuKien: DieuKienMvp }
  | { type: 'consequence'; hauQua: HauQuaMvp[] }
  | { type: 'branch'; id: string; asker: { speaker: string; text: string }; choices: { id: string; text: string; khi: DieuKienMvp | null; hauQua: HauQuaMvp[] }[] }
  | { type: 'notebook-lookup'; trang: string; phan: string }
  | { type: 'notebook-copy'; trang: string }
  | { type: 'create-character'; truong: 'ten' | 'nganh'; asker: LoiMvp; xucXac: string | null; luaChon: string[] }
  | { type: 'trial-filter'; id: string; sql: string; soDong: number; chon: { cot: string; giaTri: string } }
  | { type: 'save-evidence'; evidenceId: string }
  | { type: 'ending-branch' };

export interface ChuoiMvp {
  id: string;
  title: string;
  canh: string;
  /** Số thứ tự mốc sớm nhất chuỗi có thể chạy (0 = mở đầu, d·10+i = ngày d khung i, d·10+9 = buổi tối, 1000 = ngày họp). */
  mocSomNhat: number;
  nodes: NutMvp[];
}

export interface TheThuThachMvp {
  id: string;
  tieuDe: string;
  deBai: string;
  manhMoiLienQuan: string[];
  mucTieuHoc: string | null;
  soDongKyVong: number | null;
  sqlChuan: string;
  truyVanNapSan: string | null;
  vatChung: { id: string; title: string; description: string };
  ghiChu: string[];
}

export interface TheHoSoMvp {
  id: string;
  loai: 'clue' | 'doc' | 'ev';
  heading: string;
  fields: Record<string, string>;
  quotes: Record<string, string[]>;
}

export interface TrangSoMvp {
  id: string;
  ten: string;
  loai: 'cú pháp' | 'tâm đắc' | 'lỗi thường gặp';
  trangChiLinh: string[];
  haVy: LoiMvp[];
  chonDoanCode: LuaChonMvp[] | null;
  chuThich: string | null;
}

/** Cặp (câu SQL, số dòng người viết khai, vị trí) — đợt 14 chạy trên dữ liệu thật để kiểm. */
export interface SoDongKhaiMvp {
  sql: string;
  soDong: number;
  noi: string;
}

export interface KichBanMvp {
  tenGame: string;
  tenTruong: string;
  tenCam: string[];
  nhanVat: NhanVatMvp[];
  canh: CanhMvp[];
  diaDiem: DiaDiemMvp[];
  lich: LichMvp;
  chuoi: ChuoiMvp[];
  thuThach: Record<string, TheThuThachMvp>;
  hoSo: Record<string, TheHoSoMvp>;
  soTay: Record<string, TrangSoMvp>;
  loiChung: { matUyTin: { loi: LoiMvp[]; hetVach: LoiMvp } | null };
  soDongKhai: SoDongKhaiMvp[];
}
