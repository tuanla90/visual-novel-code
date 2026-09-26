/**
 * Dataset CHÍNH — bảng `sinh_vien` 40 dòng (QĐ-010 → QĐ-014). Tên hoàn toàn hư cấu.
 *
 * Cấu trúc theo ba tập H (ten bắt đầu bằng H) · B (lớp ở tòa B) · P (CLB Báo chí):
 *   H∩B∩P = 2 (Hiếu, Hoài — QĐ-011) · chỉ H∩B = 2 · chỉ H∩P = 2 · chỉ B∩P = 2
 *   chỉ H = 4 · chỉ B = 6 · chỉ P = 6 · còn lại = 16
 *   → |H| = 10 (c1) · |H∩B∩P| = 2 (c3) · |H∪B∪P| = 24 (truy vấn OR của Quân)
 *   → bỏ một điều kiện của c3: |H∩B| = |H∩P| = |B∩P| = 4 (≥ 4, QĐ-012)
 *
 * Thứ tự dòng CÓ CHỦ Ý: Hiếu (#7) và Hoài (#12) đứng trước mọi thành viên khác của
 * H∩B, H∩P, B∩P, nên truy vấn thiếu một điều kiện + `LIMIT 2` vẫn ra đúng hai người này
 * trên dataset chính — dataset ẩn (hidden-dataset.ts) mới là lớp bắt kiểu gian lận đó.
 *
 * Bẫy QĐ-013 (xem cột chú thích): ho_dem bắt đầu bằng H mà ten thì không (Tuấn, Mai, Dũng);
 * ten kết thúc bằng h (Linh, Bình, Thanh, Oanh, Vinh, Quỳnh); có h ở giữa (Thảo, Nhung,
 * Khoa, Phương, Thúy, Nhật, Châu); Hạnh học `KT24B` (tòa A) và ở CLB Báo chí — lọc lớp
 * bằng hậu tố `%B` sẽ bắt Hạnh thay vì Hiếu; Hùng và Hương khớp H + tòa B nhưng ở CLB Văn học.
 *
 * QĐ-014: không có tên nhân vật cốt truyện (Minh Anh, Hà Vy, Quân, Khánh, Tùng, bác Tư);
 * Hoài/Hiếu chỉ xuất hiện ở hai dòng cố định; không có họ đệm "Phạm Diệu".
 */
import { CLASS_ROWS } from './classes';
import type { Dataset, StudentRow } from './types';

/** Nhân chứng (người bỏ hộ lá thư) — QĐ-011. */
export const WITNESS: StudentRow = { ma_sv: 'SV240317', ho_dem: 'Lê Thị', ten: 'Hoài', ma_lop: 'QT24B', clb: 'Báo chí' };
/** Người còn lại trong danh sách cần xác minh, hoàn toàn vô can — QĐ-011. */
export const INNOCENT: StudentRow = { ma_sv: 'SV240228', ho_dem: 'Phạm Minh', ten: 'Hiếu', ma_lop: 'KT24A', clb: 'Báo chí' };

const r = (ma_sv: string, ho_dem: string, ten: string, ma_lop: string, clb: string): StudentRow => ({ ma_sv, ho_dem, ten, ma_lop, clb });

export const MAIN_STUDENT_ROWS: readonly StudentRow[] = [
  //  ma_sv       ho_dem          ten       ma_lop   clb          nhóm            ghi chú
  r('SV240105', 'Nguyễn Thị', 'Lan', 'TC24A', 'Guitar'), //     còn lại
  r('SV240118', 'Hoàng Văn', 'Tuấn', 'KD24A', 'Robotics'), //   còn lại        ho_dem H, ten không
  r('SV240131', 'Trần Ngọc', 'Linh', 'QT24B', 'Văn học'), //    chỉ B          ten kết thúc h; Văn học gần khớp
  r('SV240147', 'Lê Minh', 'Thảo', 'MK24A', 'Báo chí'), //      chỉ P          h ở giữa
  r('SV240163', 'Đặng Thu', 'Trang', 'KT24B', 'Guitar'), //     còn lại        lớp KT24B (tòa A)
  r('SV240190', 'Vũ Đình', 'Phúc', 'QT24A', 'Robotics'), //     còn lại        lớp QT24A (tòa C)
  INNOCENT, //                                                    H∩B∩P          Phạm Minh Hiếu — QĐ-011
  r('SV240244', 'Bùi Thị', 'Nhung', 'TM24A', 'Văn học'), //     còn lại        h ở giữa
  r('SV240259', 'Ngô Thanh', 'Bình', 'KT24A', 'Robotics'), //   chỉ B          ten kết thúc h
  r('SV240276', 'Hồ Ngọc', 'Mai', 'TC24A', 'Báo chí'), //       chỉ P          ho_dem H, ten không
  r('SV240293', 'Đỗ Văn', 'Nam', 'KD24A', 'Guitar'), //         còn lại
  WITNESS, //                                                     H∩B∩P          Lê Thị Hoài — QĐ-011
  r('SV240325', 'Nguyễn Văn', 'Hùng', 'KT24A', 'Văn học'), //   chỉ H∩B        Văn học gần khớp
  r('SV240338', 'Trần Thị', 'Hương', 'QT24B', 'Văn học'), //    chỉ H∩B        Văn học gần khớp
  r('SV240341', 'Phan Thị', 'Thanh', 'KT24A', 'Báo chí'), //    chỉ B∩P        ten kết thúc h
  r('SV240356', 'Lý Văn', 'Khoa', 'QT24B', 'Báo chí'), //       chỉ B∩P        h ở giữa
  r('SV240362', 'Huỳnh Ngọc', 'Hạnh', 'KT24B', 'Báo chí'), //   chỉ H∩P        KT24B ở tòa A — bẫy hậu tố mã lớp
  r('SV240379', 'Vũ Thị', 'Huyền', 'MK24A', 'Báo chí'), //      chỉ H∩P
  r('SV240384', 'Dương Văn', 'Huy', 'TC24A', 'Robotics'), //    chỉ H
  r('SV240397', 'Mai Thị', 'Hồng', 'QT24A', 'Guitar'), //       chỉ H          QT24A ở tòa C
  r('SV240402', 'Cao Văn', 'Hải', 'KD24A', 'Robotics'), //      chỉ H
  r('SV240415', 'Đinh Thị', 'Hân', 'TM24A', 'Văn học'), //      chỉ H
  r('SV240423', 'Lưu Văn', 'Đức', 'KT24A', 'Guitar'), //        chỉ B
  r('SV240438', 'Tạ Thị', 'Oanh', 'QT24B', 'Robotics'), //      chỉ B          ten kết thúc h
  r('SV240446', 'Hứa Văn', 'Dũng', 'KT24A', 'Văn học'), //      chỉ B          ho_dem H, ten không
  r('SV240451', 'Trịnh Thị', 'Yến', 'QT24B', 'Guitar'), //      chỉ B
  r('SV240469', 'Nguyễn Đức', 'Vinh', 'KT24B', 'Báo chí'), //   chỉ P          ten kết thúc h; KT24B ở tòa A
  r('SV240477', 'Phùng Thị', 'Quỳnh', 'TC24A', 'Báo chí'), //   chỉ P          ten kết thúc h
  r('SV240486', 'Lê Văn', 'Long', 'QT24A', 'Báo chí'), //       chỉ P
  r('SV240498', 'Trần Thị', 'Ngọc', 'KD24A', 'Báo chí'), //     chỉ P
  r('SV240503', 'Đoàn Văn', 'Kiên', 'MK24A', 'Guitar'), //      còn lại
  r('SV240519', 'Nguyễn Thị', 'Phương', 'TM24A', 'Robotics'), // còn lại       h ở giữa
  r('SV240527', 'Bùi Văn', 'Sơn', 'KT24B', 'Văn học'), //       còn lại
  r('SV240534', 'Vương Thị', 'Vân', 'QT24A', 'Guitar'), //      còn lại
  r('SV240548', 'Lê Thị', 'Thúy', 'TC24A', 'Văn học'), //       còn lại        h ở giữa
  r('SV240556', 'Đặng Văn', 'Nhật', 'MK24A', 'Robotics'), //    còn lại        h ở giữa
  r('SV240561', 'Phạm Thị', 'Loan', 'KD24A', 'Văn học'), //     còn lại
  r('SV240575', 'Trương Văn', 'Giang', 'TM24A', 'Guitar'), //   còn lại
  r('SV240583', 'Nguyễn Thị', 'Châu', 'KT24B', 'Robotics'), //  còn lại        h ở giữa
  r('SV240594', 'Võ Văn', 'Tâm', 'QT24A', 'Văn học'), //        còn lại
];

export const MAIN_DATASET: Dataset = {
  kind: 'main',
  lop_sinh_hoat: CLASS_ROWS,
  sinh_vien: MAIN_STUDENT_ROWS,
};
