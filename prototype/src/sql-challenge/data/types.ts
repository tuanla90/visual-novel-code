/**
 * Kiểu dữ liệu của dataset (QĐ-010). Mỗi dataset là hai mảng dòng đã có kiểu; engine
 * (engine/database.ts) tạo bảng SQLite từ đây theo đúng schema trong ../schema.ts.
 */

export type DatasetKind = 'main' | 'hidden';

export interface StudentRow {
  ma_sv: string;
  ho_dem: string;
  ten: string;
  ma_lop: string;
  clb: string;
}

export interface ClassRow {
  ma_lop: string;
  nganh: string;
  khoa_hoc: number;
  toa_nha: string;
}

export interface Dataset {
  kind: DatasetKind;
  lop_sinh_hoat: readonly ClassRow[];
  sinh_vien: readonly StudentRow[];
}

/** Bốn CLB cố định (QĐ-011). */
export const CLUBS = ['Báo chí', 'Văn học', 'Robotics', 'Guitar'] as const;
export type Club = (typeof CLUBS)[number];

/** Ba tòa nhà (QĐ-010). */
export const BUILDINGS = ['A', 'B', 'C'] as const;
