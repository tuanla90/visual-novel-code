/**
 * In cỡ từng bảng (sau khi thêm dữ liệu nền) và số dòng của các câu "chạy sai hay gặp" — để viết lại lời "Khi chạy ra n dòng"
 * mỗi khi đổi bộ sinh dữ liệu nền (tools/noi-dung/nhieu-mvp.ts). Chạy: node --import ./tools/noi-dung/nap-ts.mjs tools/dem-nhieu.ts
 */
import { THU_MUC_NOI_DUNG_MVP } from './noi-dung/kiem-mvp.ts';
import { themNhieuMvp } from './noi-dung/nhieu-mvp.ts';
import { demDong, moCsdlMvp } from './noi-dung/sql-mvp.ts';
import { docThuMucMvp } from './noi-dung/thu-muc-mvp.ts';

const kq = docThuMucMvp(THU_MUC_NOI_DUNG_MVP);
if (!kq.mvp.duLieu) throw new Error('không có dữ liệu');
const d = themNhieuMvp(structuredClone(kq.mvp.duLieu));
const db = await moCsdlMvp(d);
console.log('== Cỡ bảng');
for (const b of d.bang) console.log(`${b.ten}: ${b.dong.length}`);
const DON = 'don_linh_kien JOIN phien_dang_nhap ON don_linh_kien.ma_phien = phien_dang_nhap.ma_phien';
const DON_NGAY = 'don_linh_kien JOIN phien_dang_nhap ON don_linh_kien.ngay = phien_dang_nhap.ngay';
const LC = 'luan_chuyen JOIN tai_san ON luan_chuyen.ma_tai_san = tai_san.ma_tai_san';
const LC_VT = 'luan_chuyen JOIN tai_san ON luan_chuyen.vi_tri = tai_san.vi_tri';
const CAU: [string, string][] = [
  ['tra_cuu_k24 (cả bảng)', 'SELECT * FROM tra_cuu_k24'],
  ['c-lop: tòa B HOẶC Báo chí', "SELECT * FROM lop_sinh_hoat WHERE toa_nha = 'B' OR nganh = 'Báo chí'"],
  ['c-lop: chỉ tòa B', "SELECT * FROM lop_sinh_hoat WHERE toa_nha = 'B'"],
  ['c-lop: chỉ Báo chí', "SELECT * FROM lop_sinh_hoat WHERE nganh = 'Báo chí'"],
  ['c-ten-h: chỉ tên H%', "SELECT * FROM sinh_vien WHERE ten LIKE 'H%'"],
  ['c-ten-h: chỉ hai lớp', "SELECT * FROM sinh_vien WHERE ma_lop IN ('BC24A','BC23A')"],
  ['c-ten-h: hai lớp + họ đệm H%', "SELECT * FROM sinh_vien WHERE ma_lop IN ('BC24A','BC23A') AND ho_dem LIKE 'H%'"],
  ['c-sua-or: chỉ BC24A', "SELECT * FROM sinh_vien WHERE ma_lop = 'BC24A'"],
  ['c-in: cả bảng', 'SELECT * FROM nhat_ky_in'],
  ['tin-don: cả bảng', 'SELECT * FROM tin_nhan'],
  ['dang-nhap: chỉ tài khoản', "SELECT * FROM dang_nhap_kenh WHERE tai_khoan = 'clb_robotics'"],
  ['dang-nhap: chỉ ngày', "SELECT * FROM dang_nhap_kenh WHERE ngay = '2024-10-07'"],
  ['dat-xuong: cả bảng', 'SELECT * FROM dat_xuong'],
  ['bai-dang: cả bảng', 'SELECT * FROM bai_dang_kenh'],
  ['v2: chỉ đã xác nhận', "SELECT * FROM nhat_ky_su_dung WHERE trang_thai = 'DA_XAC_NHAN'"],
  ['v2: chuẩn hóa, mọi trạng thái', "SELECT * FROM nhat_ky_su_dung WHERE LOWER(TRIM(ma_phong)) = 'clb-tham-tu'"],
  ['v2: đúng chữ thường + đã xác nhận', "SELECT * FROM nhat_ky_su_dung WHERE ma_phong = 'clb-tham-tu' AND trang_thai = 'DA_XAC_NHAN'"],
  ['v2: đúng chữ thường', "SELECT * FROM nhat_ky_su_dung WHERE ma_phong = 'clb-tham-tu'"],
  ['v2: LOWER + đã xác nhận', "SELECT * FROM nhat_ky_su_dung WHERE LOWER(ma_phong) = 'clb-tham-tu' AND trang_thai = 'DA_XAC_NHAN'"],
  ['v2: TRIM + đã xác nhận', "SELECT * FROM nhat_ky_su_dung WHERE TRIM(ma_phong) = 'clb-tham-tu' AND trang_thai = 'DA_XAC_NHAN'"],
  ['v2: LOWER', "SELECT * FROM nhat_ky_su_dung WHERE LOWER(ma_phong) = 'clb-tham-tu'"],
  ['v2: TRIM', "SELECT * FROM nhat_ky_su_dung WHERE TRIM(ma_phong) = 'clb-tham-tu'"],
  ['don: cả sổ', 'SELECT * FROM don_linh_kien'],
  ['don: chờ duyệt', "SELECT * FROM don_linh_kien WHERE trang_thai = 'CHO_DUYET'"],
  ['don-may: nối đúng, không lọc', `SELECT * FROM ${DON}`],
  ['don-may: nối theo ngày + Nam', `SELECT * FROM ${DON_NGAY} WHERE nguoi_dat = 'Nam'`],
  ['don-may: nối theo ngày, không lọc', `SELECT * FROM ${DON_NGAY}`],
  ['may-vp: nối theo ngày + máy VP', `SELECT * FROM ${DON_NGAY} WHERE may = 'MAY-VP-XUONG'`],
  ['kho: nối, không lọc', 'SELECT * FROM don_linh_kien JOIN kiem_ke ON don_linh_kien.linh_kien = kiem_ke.linh_kien'],
  ['chi: nối, không lọc', 'SELECT * FROM khoan_chi JOIN quy ON khoan_chi.ma_quy = quy.ma_quy'],
  ['hoan: cả bảng', 'SELECT * FROM giao_dich'],
  ['micro: nối đúng, không lọc', `SELECT * FROM ${LC}`],
  ['micro: nối đúng + tên', `SELECT * FROM ${LC} WHERE ten_tai_san = 'Micro không dây'`],
  ['micro: nối đúng + đã nhận', `SELECT * FROM ${LC} WHERE trang_thai = 'DA_NHAN'`],
  ['micro: nối vị trí, không lọc', `SELECT * FROM ${LC_VT}`],
  ['micro: nối vị trí + tên', `SELECT * FROM ${LC_VT} WHERE ten_tai_san = 'Micro không dây'`],
  ['micro: nối vị trí + tên + đã nhận', `SELECT * FROM ${LC_VT} WHERE ten_tai_san = 'Micro không dây' AND trang_thai = 'DA_NHAN'`],
  ['micro: nối vị trí + đã nhận', `SELECT * FROM ${LC_VT} WHERE trang_thai = 'DA_NHAN'`],
];
console.log('== Câu chạy sai hay gặp');
for (const [ten, sql] of CAU) console.log(`${demDong(db, sql)}\t${ten}`);
