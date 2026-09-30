# Dữ liệu Vụ 1 — bộ cố định {dữ liệu: vu1}

<!-- Bộ dữ liệu SQL CỐ ĐỊNH của Vụ 1 (QĐ-087, QĐ-089: chưa làm dữ liệu ngẫu nhiên). Chép nguyên từ
     docs/mvp/kiem-du-lieu-vu1.py (11 lớp, 26 sinh viên). QĐ-092 thêm 3 lớp khác khóa (BC23A, KT25A, QT23A — KHÔNG có sinh viên)
     cho bài lọc số / ghép 3 điều kiện ngày 2; không đổi bảng ảo tra_cuu_k24, câu 14 dòng của Quân, bẫy ngày 4. `npm run kiem-noi-dung:mvp` nạp bảng này vào SQLite
     (sql.js) rồi chạy từng câu SQL có khai số dòng trong kịch bản ([LỌC THỬ], [MÀN CHIẾU … · n dòng],
     "Số dòng kỳ vọng" của thẻ thử thách): số dòng khai lệch kết quả thật là lỗi. Cú pháp: đặc tả §18.10. -->

## lop_sinh_hoat {bảng}
- Cột: ma_lop TEXT, nganh TEXT, khoa_hoc INTEGER, toa_nha TEXT

| ma_lop | nganh | khoa_hoc | toa_nha |
|---|---|---|---|
| KT24A | Kế toán | 2024 | B |
| KT24B | Kế toán | 2024 | A |
| QT24A | Quản trị kinh doanh | 2024 | C |
| QT24B | Quản trị kinh doanh | 2024 | B |
| BC24A | Báo chí | 2024 | B |
| BC24B | Báo chí | 2024 | C |
| TC24A | Tài chính – Ngân hàng | 2024 | A |
| MK24A | Marketing | 2024 | A |
| DL24A | Du lịch | 2024 | C |
| CT24A | Công nghệ thông tin | 2024 | A |
| TM24A | Thương mại điện tử | 2024 | C |
| BC23A | Báo chí | 2023 | B |
| KT25A | Kế toán | 2025 | A |
| QT23A | Quản trị kinh doanh | 2023 | C |

## sinh_vien {bảng}
- Cột: ma_sv TEXT, ho_dem TEXT, ten TEXT, ma_lop TEXT

<!-- BC24A 6 người; BC24B 3; 7 người tên H ở lớp khác; ba người tên Tùng (Trần Tùng DL24A là Tùng của truyện);
     còn lại là người khác (họ đệm bắt đầu bằng H để làm bẫy cột ho_dem). -->

| ma_sv | ho_dem | ten | ma_lop |
|---|---|---|---|
| SV240228 | Trần Minh | Hiếu | BC24A |
| SV240317 | Lê Thu | Hoài | BC24A |
| SV240105 | Hồ Ngọc | Mai | BC24A |
| SV240122 | Phạm Tiến | Đạt | BC24A |
| SV240131 | Vũ Hải | Yến | BC24A |
| SV240146 | Đỗ Gia | Phúc | BC24A |
| SV240412 | Đỗ Thu | Hồng | BC24B |
| SV240415 | Nguyễn Bảo | Ngọc | BC24B |
| SV240418 | Bùi Đức | Toàn | BC24B |
| SV240201 | Nguyễn Văn | Hải | KT24A |
| SV240204 | Phan Quốc | Huy | QT24B |
| SV240207 | Đinh Thị | Hương | KT24B |
| SV240210 | Lương Mạnh | Hùng | TC24A |
| SV240213 | Cao Văn | Hậu | MK24A |
| SV240216 | Tạ Thu | Hằng | DL24A |
| SV240219 | Kiều Minh | Hưng | TM24A |
| SV240251 | Trần | Tùng | DL24A |
| SV240254 | Nguyễn Thanh | Tùng | KT24B |
| SV240257 | Vũ Sơn | Tùng | CT24A |
| SV240301 | Hoàng Anh | Tuấn | QT24A |
| SV240304 | Trịnh Mỹ | Châu | KT24A |
| SV240307 | Mạc Văn | Khoa | QT24B |
| SV240310 | Lâm Thị | Nga | MK24A |
| SV240313 | Tô Bảo | Long | TC24A |
| SV240316 | Âu Minh | Trang | DL24A |

## nhat_ky_in {bảng}
- Cột: thoi_diem TEXT, tai_khoan TEXT, ten_tep TEXT, so_trang INTEGER

<!-- Chương 1, ngày 4 (ĐÃ CHỐT C, 30/09/2026): nhật ký máy in phòng máy, mở bằng phiếu tra cứu thứ hai. Chép từ
     docs/mvp/kiem-bang-vu1.py. Thư: SV210745 (khóa 2021 = năm 4) in kien-nghi-phong-clb.docx lúc 23:10 Chủ nhật;
     Hoài và Hiếu đều có in nhưng không phải thư; SV240146 in bài tập 23:18 là nhiễu. -->

| thoi_diem | tai_khoan | ten_tep | so_trang |
|---|---|---|---|
| 2026-09-12 09:40 | SV240131 | lich-truc-nhat-lop.xlsx | 1 |
| 2026-09-12 15:05 | SV240317 | the-dang-ky-thu-vien.pdf | 1 |
| 2026-09-13 20:15 | SV240228 | bai-tap-kinh-te-vi-mo.pdf | 6 |
| 2026-09-13 21:02 | SV240201 | slide-nguyen-ly-ke-toan.pdf | 12 |
| 2026-09-13 22:47 | SV220118 | do-an-mon-hoc.pdf | 30 |
| 2026-09-13 23:10 | SV210745 | kien-nghi-phong-clb.docx | 1 |
| 2026-09-13 23:18 | SV240146 | bao-cao-nhom-kinh-te-vi-mo.pdf | 4 |
| 2026-09-14 07:30 | SV240122 | danh-sach-lop-BC24A.xlsx | 1 |
| 2026-09-14 08:05 | SV210745 | don-xin-xuong-thuc-hanh.docx | 2 |

## tra_cuu_k24 {bảng ảo}
- Ghi chú: Danh sách tra cứu tân sinh viên K24 phát ở Ngày hội (mã, họ tên, ngành), lấy từ cùng dữ liệu.

```sql
SELECT s.ma_sv, s.ho_dem, s.ten, l.nganh FROM sinh_vien s JOIN lop_sinh_hoat l ON s.ma_lop = l.ma_lop
```
