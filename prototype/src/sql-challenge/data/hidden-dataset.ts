/**
 * Dataset ẨN (QĐ-015) — cùng bảng `lop_sinh_hoat`, bảng `sinh_vien` 14 dòng khác hẳn.
 * Dùng cho c1, c3, debrief-fix (c2 chỉ chạy dataset chính vì bảng lớp giống nhau).
 * Người chơi không bao giờ thấy dataset này; nó chỉ để bắt truy vấn "tình cờ đúng" trên
 * dataset chính.
 *
 * Đáp án c3 ở đây là BA người (Hòa, Hưng, Hằng — không phải Hoài/Hiếu), nên:
 * - gõ cứng `ma_sv` hoặc tên của dataset chính → 0 dòng;
 * - `LIMIT 2` (kể cả kèm đủ ba điều kiện) → tối đa 2 dòng ≠ 3;
 * - bỏ một điều kiện → mỗi cặp giao rộng hơn tập ba: H∩B = 4, H∩P = 5, B∩P = 4;
 * - `OR` → hợp rộng hơn nhiều;
 * - `LIKE '%H%'` bắt thêm Trinh, Ninh, Thu, Khuê; `LIKE '%H'` chỉ ra Trinh, Ninh;
 * - lọc theo `ho_dem` bắt Thu (Hoàng Thị), Lộc (Hồ Văn) thay vì người tên H;
 * - lọc lớp bằng hậu tố `%B` bắt Hoa (KT24B, tòa A) và bỏ sót Hòa, Hằng (KT24A);
 *   tiền tố `KT%` bắt Hoa thay Hưng — cùng 3 dòng nhưng khác người (so tập, không so số).
 */
import { CLASS_ROWS } from './classes';
import type { Dataset, StudentRow } from './types';

const r = (ma_sv: string, ho_dem: string, ten: string, ma_lop: string, clb: string): StudentRow => ({ ma_sv, ho_dem, ten, ma_lop, clb });

export const HIDDEN_STUDENT_ROWS: readonly StudentRow[] = [
  //  ma_sv       ho_dem         ten      ma_lop   clb         nhóm       ghi chú
  r('SV240608', 'Hoàng Thị', 'Thu', 'KT24A', 'Guitar'), //   chỉ B      ho_dem H, ten không; h ở giữa
  r('SV240615', 'Nguyễn Văn', 'Hòa', 'KT24A', 'Báo chí'), // H∩B∩P
  r('SV240627', 'Trần Thị', 'Trinh', 'KT24A', 'Báo chí'), // chỉ B∩P    ten kết thúc h
  r('SV240634', 'Lê Văn', 'Hào', 'TC24A', 'Báo chí'), //     chỉ H∩P
  r('SV240649', 'Phạm Thị', 'Ninh', 'QT24B', 'Văn học'), //  chỉ B      ten kết thúc h
  r('SV240652', 'Đỗ Văn', 'Tiến', 'KD24A', 'Robotics'), //   còn lại
  r('SV240668', 'Vũ Thị', 'Hoa', 'KT24B', 'Báo chí'), //     chỉ H∩P    KT24B ở tòa A — bẫy hậu tố mã lớp
  r('SV240673', 'Bùi Văn', 'Hưng', 'QT24B', 'Báo chí'), //   H∩B∩P
  r('SV240681', 'Hồ Văn', 'Lộc', 'TC24A', 'Guitar'), //      còn lại    ho_dem H, ten không
  r('SV240695', 'Ngô Thị', 'Khuê', 'QT24A', 'Báo chí'), //   chỉ P      h ở giữa
  r('SV240702', 'Đinh Văn', 'Hậu', 'QT24B', 'Robotics'), //  chỉ H∩B
  r('SV240716', 'Trương Thị', 'Hằng', 'KT24A', 'Báo chí'), // H∩B∩P
  r('SV240724', 'Lý Thị', 'Mỹ', 'TM24A', 'Văn học'), //      còn lại
  r('SV240739', 'Cao Thị', 'Hạ', 'MK24A', 'Guitar'), //      chỉ H
];

export const HIDDEN_DATASET: Dataset = {
  kind: 'hidden',
  lop_sinh_hoat: CLASS_ROWS,
  sinh_vien: HIDDEN_STUDENT_ROWS,
};
