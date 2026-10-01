# Dữ liệu mùa 1 — bộ cố định (Vụ 1, Vụ 2, nhiệm vụ phụ) {dữ liệu: vu1}

<!-- Bộ dữ liệu SQL CỐ ĐỊNH của Vụ 1 (QĐ-087, QĐ-089: chưa làm dữ liệu ngẫu nhiên). Chép nguyên từ
     docs/mvp/kiem-du-lieu-vu1.py (11 lớp, 26 sinh viên). QĐ-092 thêm 3 lớp khác khóa (BC23A, KT22A, QT23A — KHÔNG có sinh viên)
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
| KT22A | Kế toán | 2022 | A |
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
     docs/mvp/kiem-bang-vu1.py. Thư: tài khoản dùng chung clb_robotics in kien-nghi-phong-clb.docx lúc 23:10 Chủ nhật (01/10/2026: đổi từ mã SV21… để không lộ khóa học của người in — dàn ý mùa 1);
     Hoài và Hiếu đều có in nhưng không phải thư; SV240146 in bài tập 23:18 là nhiễu. Ngày theo lịch thật năm 2024
     (lich.md "Ngày mở đầu"): 14/09 thứ Bảy (Ngày hội), 15/09 Chủ nhật, 16/09 thứ Hai (sáng nộp thư, 16h phòng CLB). -->

| thoi_diem | tai_khoan | ten_tep | so_trang |
|---|---|---|---|
| 2024-09-14 09:40 | SV240131 | lich-truc-nhat-lop.xlsx | 1 |
| 2024-09-14 15:05 | SV240317 | the-dang-ky-thu-vien.pdf | 1 |
| 2024-09-15 20:15 | SV240228 | bai-tap-kinh-te-vi-mo.pdf | 6 |
| 2024-09-15 21:02 | SV240201 | slide-nguyen-ly-ke-toan.pdf | 12 |
| 2024-09-15 22:47 | SV220118 | do-an-mon-hoc.pdf | 30 |
| 2024-09-15 23:10 | clb_robotics | kien-nghi-phong-clb.docx | 1 |
| 2024-09-15 23:18 | SV240146 | bao-cao-nhom-kinh-te-vi-mo.pdf | 4 |
| 2024-09-16 07:30 | SV240122 | danh-sach-lop-BC24A.xlsx | 1 |
| 2024-09-16 08:05 | clb_robotics | don-xin-xuong-thuc-hanh.docx | 2 |

## tra_cuu_k24 {bảng ảo}
- Ghi chú: Danh sách tra cứu tân sinh viên K24 phát ở Ngày hội (mã, họ tên, ngành), lấy từ cùng dữ liệu.

```sql
SELECT s.ma_sv, s.ho_dem, s.ten, l.nganh FROM sinh_vien s JOIN lop_sinh_hoat l ON s.ma_lop = l.ma_lop
```

## nhat_ky_su_dung {bảng}
- Cột: ma_buoi TEXT, ma_phong TEXT, ngay TEXT, hoat_dong TEXT, trang_thai TEXT

<!-- Vụ 2 (docs/mvp/mua-1-du-lieu-va-kiem-chung.md mục 2; ngày đổi sang năm 2024 cho khớp lịch truyện). Bản xuất sổ sử dụng
     phòng tháng 10: mã phòng gõ tay nên lệch hoa/thường và dính dấu cách ở đuôi. `␣` = một dấu cách THẬT trong ô (bảng
     Markdown tự cắt dấu cách đầu/cuối ô nên phải viết lộ ra). Sau LOWER(TRIM(ma_phong)) có 5 dòng phòng CLB; 4 dòng
     DA_XAC_NHAN (BUOI-02/04/06/08, các thứ Tư 02–23/10/2024), 1 dòng DU_KIEN (30/10). Hai dòng P-KHO-CHUNG là nhiễu. -->

| ma_buoi | ma_phong | ngay | hoat_dong | trang_thai |
|---|---|---|---|---|
| BUOI-08 | clb-tham-tu | 2024-10-23 | Hướng dẫn tân thành viên | DA_XAC_NHAN |
| BUOI-01 | P-KHO-CHUNG | 2024-10-01 | Nhận vật tư | DA_XAC_NHAN |
| BUOI-06 | CLB-THAM-TU␣␣ | 2024-10-16 | Kiểm kê hồ sơ | DA_XAC_NHAN |
| BUOI-05 | clb-tham-tu | 2024-10-30 | Ôn SQL dự kiến | DU_KIEN |
| BUOI-02 | CLB-THAM-TU | 2024-10-02 | Họp thành viên | DA_XAC_NHAN |
| BUOI-04 | clb-tham-tu␣␣ | 2024-10-09 | Ôn SQL | DA_XAC_NHAN |
| BUOI-03 | P-KHO-CHUNG | 2024-10-06 | Nhận vật tư | DA_XAC_NHAN |

## tin_nhan {bảng}
- Cột: ma_tin TEXT, thoi_diem TEXT, tai_khoan TEXT, loai TEXT, noi_dung TEXT

<!-- Vụ 2 "Tin đồn" (docs/mvp/mua-1-dan-y-nam-khanh.md mục 3). Bản xuất các tin công khai của kênh sinh viên, tối thứ Hai 07/10 tới
     trưa thứ Ba 08/10/2024. Năm tin mang câu tin đồn: T-01 là tin GỐC (22:40 tối 07/10, tài khoản kênh clb_robotics), bốn tin
     còn lại là chuyển tiếp. T-08 nhắc chuyện tương tự nhưng viết khác nên không khớp "bắt đầu bằng". -->

| ma_tin | thoi_diem | tai_khoan | loai | noi_dung |
|---|---|---|---|---|
| T-01 | 2024-10-07 22:40 | clb_robotics | GOC | CLB Thám Tử soi dữ liệu sinh viên |
| T-02 | 2024-10-07 22:55 | SV240254 | CHUYEN_TIEP | CLB Thám Tử soi dữ liệu sinh viên |
| T-03 | 2024-10-08 07:10 | SV230311 | CHUYEN_TIEP | CLB Thám Tử soi dữ liệu sinh viên |
| T-04 | 2024-10-08 07:30 | SV240213 | GOC | Ai nhặt được thẻ xe ở căng tin |
| T-05 | 2024-10-08 08:02 | SV220118 | CHUYEN_TIEP | CLB Thám Tử soi dữ liệu sinh viên |
| T-06 | 2024-10-08 09:15 | clb_robotics | GOC | Tuyển thành viên đội robot |
| T-07 | 2024-10-08 11:40 | SV240131 | CHUYEN_TIEP | CLB Thám Tử soi dữ liệu sinh viên |
| T-08 | 2024-10-08 12:05 | SV240412 | GOC | Nghe nói CLB Thám Tử soi điểm |

## dang_nhap_kenh {bảng}
- Cột: tai_khoan TEXT, may TEXT, ngay TEXT, gio TEXT

<!-- Vụ 2, tuyến dữ liệu: nhật ký đăng nhập kênh (Nam là quản trị kênh của Robotics nên mở được). Tài khoản clb_robotics ngày 07/10:
     15:10 từ máy xưởng số 2 (Nam), 22:31 từ máy văn phòng xưởng (9 phút trước tin gốc). -->

| tai_khoan | may | ngay | gio |
|---|---|---|---|
| clb_robotics | MAY-XUONG-02 | 2024-10-07 | 15:10 |
| clb_robotics | MAY-VP-XUONG | 2024-10-07 | 22:31 |
| clb_robotics | MAY-XUONG-02 | 2024-10-08 | 09:05 |
| SV240254 | DIEN-THOAI | 2024-10-07 | 22:50 |
| SV240213 | DIEN-THOAI | 2024-10-08 | 07:25 |

## dat_xuong {bảng}
- Cột: ngay TEXT, thu TEXT, tu_gio TEXT, den_gio TEXT, muc_dich TEXT

<!-- Vụ 2, tuyến hiện trường: lịch đặt xưởng tuần 07/10 (bản xuất từ phần mềm đặt phòng của nhà văn hóa; bảng dán ở cửa là bản sao). -->

| ngay | thu | tu_gio | den_gio | muc_dich |
|---|---|---|---|---|
| 2024-10-07 | THU_HAI | 19:00 | 23:00 | Đội thi đấu tập |
| 2024-10-08 | THU_BA | 14:00 | 17:00 | Sinh hoạt thành viên |
| 2024-10-09 | THU_TU | 19:00 | 21:00 | Đội thi đấu tập |
| 2024-10-10 | THU_NAM | 14:00 | 16:00 | Hướng dẫn thành viên mới |
| 2024-10-11 | THU_SAU | 19:00 | 21:30 | Đội thi đấu tập |
| 2024-10-12 | THU_BAY | 08:00 | 11:00 | Dọn xưởng |

## bai_dang_kenh {bảng}
- Cột: ma_bai TEXT, kenh TEXT, ngay TEXT, buoi TEXT, thiet_bi TEXT

<!-- Vụ 3: bản xuất bài đăng của các kênh CLB trong tháng 10 (mục kênh, ai quản trị cũng tải được). Kênh Robotics 9 bài: 8 bài buổi chiều
     từ điện thoại trực kênh (Nam giữ), 1 bài buổi tối 07/10 từ máy văn phòng xưởng (tin đồn). Hai kênh khác là nhiễu. -->

| ma_bai | kenh | ngay | buoi | thiet_bi |
|---|---|---|---|---|
| BD-01 | clb_robotics | 2024-10-01 | CHIEU | DIEN-THOAI-TRUC |
| BD-02 | clb_van_nghe | 2024-10-01 | TOI | DIEN-THOAI |
| BD-03 | clb_robotics | 2024-10-02 | CHIEU | DIEN-THOAI-TRUC |
| BD-04 | clb_robotics | 2024-10-03 | CHIEU | DIEN-THOAI-TRUC |
| BD-05 | clb_tham_tu | 2024-10-03 | CHIEU | MAY-CLB |
| BD-06 | clb_robotics | 2024-10-04 | CHIEU | DIEN-THOAI-TRUC |
| BD-07 | clb_robotics | 2024-10-05 | CHIEU | DIEN-THOAI-TRUC |
| BD-08 | clb_van_nghe | 2024-10-06 | TOI | DIEN-THOAI |
| BD-09 | clb_robotics | 2024-10-07 | CHIEU | DIEN-THOAI-TRUC |
| BD-10 | clb_robotics | 2024-10-07 | TOI | MAY-VP-XUONG |
| BD-11 | clb_robotics | 2024-10-08 | CHIEU | DIEN-THOAI-TRUC |
| BD-12 | clb_tham_tu | 2024-10-08 | CHIEU | MAY-CLB |
| BD-13 | clb_robotics | 2024-10-09 | CHIEU | DIEN-THOAI-TRUC |
| BD-14 | clb_van_nghe | 2024-10-09 | TOI | DIEN-THOAI |

## quet_the_thu_vien {bảng}
- Cột: ten TEXT, ngay TEXT, thu TEXT, gio_vao TEXT, gio_ra TEXT

<!-- Vụ 3: bản ghi quẹt thẻ thư viện do CHÍNH Nam và Hà Vy xin in (thư viện chỉ in cho mỗi người bản của họ). Cột thứ có sẵn vì hàm
     ngày giờ nằm ngoài phạm vi mùa 1. Thói quen: tối thứ Hai nào cả hai cũng ở thư viện; tối 07/10 (thứ Hai) Hà Vy 20:00–23:00,
     Nam 21:50–23:05, tin gửi 22:40. -->

| ten | ngay | thu | gio_vao | gio_ra |
|---|---|---|---|---|
| Nam | 2024-09-16 | THU_HAI | 21:45 | 23:00 |
| Hà Vy | 2024-09-16 | THU_HAI | 20:00 | 22:50 |
| Nam | 2024-09-23 | THU_HAI | 21:50 | 23:05 |
| Hà Vy | 2024-09-23 | THU_HAI | 20:05 | 23:00 |
| Nam | 2024-09-26 | THU_NAM | 19:30 | 21:00 |
| Nam | 2024-09-30 | THU_HAI | 21:40 | 23:00 |
| Hà Vy | 2024-09-30 | THU_HAI | 20:00 | 22:55 |
| Hà Vy | 2024-10-02 | THU_TU | 19:00 | 20:30 |
| Nam | 2024-10-07 | THU_HAI | 21:50 | 23:05 |
| Hà Vy | 2024-10-07 | THU_HAI | 20:00 | 23:00 |

## don_linh_kien {bảng}
- Cột: ma_don TEXT, ngay TEXT, nguoi_dat TEXT, linh_kien TEXT, so_luong INTEGER, so_tien INTEGER, ma_phien TEXT, trang_thai TEXT

<!-- Vụ 4 (và Vụ 5): sổ đặt linh kiện của xưởng Robotics, tháng 9–10. Nam đứng tên 5 đơn nhưng chỉ đặt 2 (DLK-01, DLK-05, từ máy
     xưởng số 2 buổi chiều); ba đơn kia (DLK-03, 06, 08) tạo ban đêm từ máy văn phòng xưởng, trong đó DLK-08 lúc 22:05 tối 07/10 khi Nam
     ở thư viện. Hai đơn CHO_DUYET là nhiễu cho bài lọc. Vụ 5: ba đơn đêm là ba linh kiện không có trong kho. -->

| ma_don | ngay | nguoi_dat | linh_kien | so_luong | so_tien | ma_phien | trang_thai |
|---|---|---|---|---|---|---|---|
| DLK-01 | 2024-09-20 | Nam | Cảm biến dò line | 4 | 120000 | PH-11 | DA_DUYET |
| DLK-02 | 2024-09-24 | Bách | Pin 18650 | 10 | 200000 | PH-12 | DA_DUYET |
| DLK-03 | 2024-09-27 | Nam | Động cơ servo | 8 | 800000 | PH-13 | DA_DUYET |
| DLK-04 | 2024-10-01 | Thảo | Dây nối | 20 | 60000 | PH-14 | DA_DUYET |
| DLK-05 | 2024-10-02 | Nam | Bánh xe | 6 | 150000 | PH-15 | DA_DUYET |
| DLK-06 | 2024-10-04 | Nam | Mạch điều khiển | 3 | 900000 | PH-16 | DA_DUYET |
| DLK-07 | 2024-10-05 | Khánh | Ốc vít | 100 | 40000 | PH-17 | DA_DUYET |
| DLK-08 | 2024-10-07 | Nam | Bộ khung nhôm | 2 | 700000 | PH-18 | DA_DUYET |
| DLK-09 | 2024-10-08 | Thảo | Keo dán | 5 | 30000 | PH-19 | CHO_DUYET |
| DLK-10 | 2024-10-08 | Bách | Mỏ hàn | 2 | 180000 | PH-20 | CHO_DUYET |

## phien_dang_nhap {bảng}
- Cột: ma_phien TEXT, may TEXT, ngay TEXT, gio TEXT

<!-- Vụ 4: phiên đăng nhập của phần mềm đặt hàng trên máy xưởng (có cả phiên không tạo đơn: PH-21, 22, 23). Cột ngay trùng tên với sổ đặt
     hàng: nối theo ngay (sai) thì đơn kéo theo mọi phiên cùng ngày (đơn của Nam ra 8 dòng thay vì 5); nối theo ma_phien (đúng) thì mỗi đơn một phiên. -->

| ma_phien | may | ngay | gio |
|---|---|---|---|
| PH-11 | MAY-XUONG-02 | 2024-09-20 | 15:20 |
| PH-12 | MAY-XUONG-01 | 2024-09-24 | 16:05 |
| PH-13 | MAY-VP-XUONG | 2024-09-27 | 21:50 |
| PH-14 | MAY-XUONG-01 | 2024-10-01 | 14:40 |
| PH-15 | MAY-XUONG-02 | 2024-10-02 | 15:45 |
| PH-16 | MAY-VP-XUONG | 2024-10-04 | 22:10 |
| PH-17 | MAY-VP-XUONG | 2024-10-05 | 10:15 |
| PH-18 | MAY-VP-XUONG | 2024-10-07 | 22:05 |
| PH-19 | MAY-XUONG-01 | 2024-10-08 | 15:00 |
| PH-20 | MAY-XUONG-01 | 2024-10-08 | 16:30 |
| PH-21 | MAY-XUONG-01 | 2024-10-07 | 16:00 |
| PH-22 | MAY-XUONG-02 | 2024-09-27 | 15:30 |
| PH-23 | MAY-VP-XUONG | 2024-10-02 | 10:40 |

## kiem_ke {bảng}
- Cột: linh_kien TEXT, so_luong_co INTEGER

<!-- Vụ 5: Nam kiểm kê xưởng, đếm tay. Ba linh kiện của ba đơn mượn tên Nam là 0. -->

| linh_kien | so_luong_co |
|---|---|
| Cảm biến dò line | 4 |
| Pin 18650 | 9 |
| Động cơ servo | 0 |
| Dây nối | 18 |
| Bánh xe | 6 |
| Mạch điều khiển | 0 |
| Ốc vít | 85 |
| Bộ khung nhôm | 0 |
| Keo dán | 3 |
| Mỏ hàn | 2 |

## quy {bảng}
- Cột: ma_quy TEXT, clb TEXT, ten_quy TEXT

| ma_quy | clb | ten_quy |
|---|---|---|
| Q-TT | THAM_TU | Quỹ CLB Thám Tử Dữ Liệu |
| Q-RB | ROBOTICS | Quỹ CLB Robotics |

## khoan_chi {bảng}
- Cột: ma_chi TEXT, ma_don TEXT, ma_quy TEXT, so_tien INTEGER, nguoi_duyet TEXT, ngay_chi TEXT

<!-- Vụ 5: bản xuất sổ chi khối CLB (chỉ các khoản ghi vào quỹ CLB Thám Tử và khoản liên quan các đơn). Ba khoản lớn (KC-03, 06, 08)
     trả cho ba đơn không có hàng, ghi vào quỹ CLB Thám Tử, người duyệt Khánh; ba khoản văn phòng phẩm nhỏ Minh Anh duyệt. Trung bình:
     Khánh 800000, Minh Anh 150000 (chia hết). ngay_chi: ba khoản lớn xuất 10–12/09, TRƯỚC lá thư 16/09 và trước ngày tạo ba đơn (27/09, 04/10, 07/10):
     tiền đi trước, thư đi sau, đơn viết sau cùng cho khớp sổ. -->

| ma_chi | ma_don | ma_quy | so_tien | nguoi_duyet | ngay_chi |
|---|---|---|---|---|---|
| KC-01 | DLK-01 | Q-RB | 120000 | Bách | 2024-09-20 |
| KC-02 | DLK-02 | Q-RB | 200000 | Bách | 2024-09-24 |
| KC-03 | DLK-03 | Q-TT | 800000 | Khánh | 2024-09-10 |
| KC-04 | DLK-04 | Q-RB | 60000 | Bách | 2024-10-01 |
| KC-05 | DLK-05 | Q-RB | 150000 | Bách | 2024-10-02 |
| KC-06 | DLK-06 | Q-TT | 900000 | Khánh | 2024-09-11 |
| KC-07 | DLK-07 | Q-RB | 40000 | Khánh | 2024-10-05 |
| KC-08 | DLK-08 | Q-TT | 700000 | Khánh | 2024-09-12 |
| KC-09 | VPP-01 | Q-TT | 150000 | Minh Anh | 2024-09-18 |
| KC-10 | VPP-02 | Q-TT | 120000 | Minh Anh | 2024-10-03 |
| KC-11 | VPP-03 | Q-TT | 180000 | Minh Anh | 2024-10-09 |

## tai_san {bảng}
- Cột: ma_tai_san TEXT, ten_tai_san TEXT, vi_tri TEXT

<!-- Nhiệm vụ phụ "micro": sổ tài sản CLB. vi_tri = chỗ để ghi trong sổ lúc kiểm kê đầu kỳ. Cột vi_tri trùng tên với bảng luan_chuyen
     nhưng khác nghĩa (ở đó là nơi chuyển tới): nối theo vi_tri thì thứ gì từng ở tủ CLB cũng dính vào mọi phiếu chuyển tới tủ CLB. -->

| ma_tai_san | ten_tai_san | vi_tri |
|---|---|---|
| MIC-01 | Micro có dây | TU_CLB |
| MIC-02 | Micro không dây | TU_CLB |
| CAM-01 | Máy ảnh CLB | TU_CLB |
| LOA-01 | Loa kéo | KHO_CHUNG |
| CHAN-01 | Chân máy ảnh | TU_CLB |

## luan_chuyen {bảng}
- Cột: ma_phieu TEXT, ma_tai_san TEXT, vi_tri TEXT, nguoi_nhan TEXT, ngay TEXT, trang_thai TEXT

<!-- Nhiệm vụ phụ "micro": phiếu luân chuyển thiết bị của tòa nhà. vi_tri = nơi chuyển tới. Phiếu chỉ ghi mã tài sản, không ghi tên.
     MIC-02 có hai phiếu: PX-17 (đã nhận, sang tủ thiết bị dùng chung) và PX-19 (mới đề xuất, chưa ai nhận). -->

| ma_phieu | ma_tai_san | vi_tri | nguoi_nhan | ngay | trang_thai |
|---|---|---|---|---|---|
| PX-11 | MIC-01 | TU_THIET_BI_CHUNG | Tổ thiết bị | 2024-10-22 | DA_NHAN |
| PX-14 | LOA-01 | TU_CLB | Tùng | 2024-10-23 | DA_NHAN |
| PX-17 | MIC-02 | TU_THIET_BI_CHUNG | Tổ thiết bị | 2024-10-24 | DA_NHAN |
| PX-19 | MIC-02 | PHONG_AM_THANH | Minh Anh | 2024-10-31 | DE_XUAT |
| PX-20 | CAM-01 | TU_CLB | Minh Anh | 2024-10-28 | DA_NHAN |
| PX-21 | MIC-01 | PHONG_AM_THANH | Tùng | 2024-10-31 | DE_XUAT |
| PX-22 | CHAN-01 | TU_CLB | Duy | 2024-10-28 | DA_NHAN |

## giao_dich {bảng}
- Cột: ma_gd TEXT, ma_phieu TEXT, loai TEXT, so_tien INTEGER, ma_tham_chieu TEXT

<!-- Nhiệm vụ phụ "hoàn tiền": bản xuất thu chi buổi hướng dẫn SQL cho tân thành viên. GD-06 và GD-07 là cùng một lần hoàn (cùng mã
     tham chiếu NH-771) bị ghi hai dòng. Bảng không ghi ai nhập. -->

| ma_gd | ma_phieu | loai | so_tien | ma_tham_chieu |
|---|---|---|---|---|
| GD-01 | PH-01 | CHI | 250000 | CT-101 |
| GD-02 | PH-01 | HOAN | -20000 | NH-770 |
| GD-03 | PH-02 | CHI | 180000 | CT-102 |
| GD-04 | PH-03 | CHI | 90000 | CT-103 |
| GD-05 | PH-04 | CHI | 350000 | CT-104 |
| GD-06 | PH-04 | HOAN | -60000 | NH-771 |
| GD-07 | PH-04 | HOAN | -60000 | NH-771 |
| GD-08 | PH-06 | HOAN | -15000 | NH-776 |
