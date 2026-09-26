/**
 * Bảng `lop_sinh_hoat` — DÙNG CHUNG cho dataset chính và dataset ẩn (QĐ-015).
 *
 * 8 lớp, tòa A/B/C. Lớp ở giảng đường B đúng là `KT24A` và `QT24B` (QĐ-011).
 * Bẫy QĐ-013: `KT24B` ở tòa A và `QT24A` ở tòa C — mã gần giống lớp tòa B nhưng không
 * sinh hoạt ở tòa B, để lọc theo tiền tố/hậu tố mã lớp (`LIKE 'KT%'`, `LIKE '%B'`) cho
 * kết quả khác với lọc theo cột `toa_nha`.
 */
import type { ClassRow } from './types';

export const BUILDING_B_CLASSES = ['KT24A', 'QT24B'] as const;

export const CLASS_ROWS: readonly ClassRow[] = [
  { ma_lop: 'KT24A', nganh: 'Kế toán', khoa_hoc: 2024, toa_nha: 'B' },
  { ma_lop: 'KT24B', nganh: 'Kế toán', khoa_hoc: 2024, toa_nha: 'A' },
  { ma_lop: 'QT24A', nganh: 'Quản trị kinh doanh', khoa_hoc: 2024, toa_nha: 'C' },
  { ma_lop: 'QT24B', nganh: 'Quản trị kinh doanh', khoa_hoc: 2024, toa_nha: 'B' },
  { ma_lop: 'TC24A', nganh: 'Tài chính – Ngân hàng', khoa_hoc: 2024, toa_nha: 'A' },
  { ma_lop: 'MK24A', nganh: 'Marketing', khoa_hoc: 2024, toa_nha: 'A' },
  { ma_lop: 'KD24A', nganh: 'Kinh doanh quốc tế', khoa_hoc: 2024, toa_nha: 'C' },
  { ma_lop: 'TM24A', nganh: 'Thương mại điện tử', khoa_hoc: 2024, toa_nha: 'C' },
];
