<!-- Thẻ thử thách Vụ 2 "Tin đồn" (kich-ban/10-vu-2-tin-don.md, B4.4a/B4.4b). Tám màn trên tuyến chính, theo ngày: 08/10 c-tin-bang (bằng, 0 dòng: tin còn đoạn sau), c-tin-bat-dau (bắt đầu bằng, 5), c-tin-chua (chứa, 8, có T-08 tự viết phải bỏ); 09/10 c-tin-sach (làm sạch bằng LOWER, TRIM, 7; lưu ev-tin-don), c-tin-in (IN hai tài khoản gõ trả lời, 2), c-tin-goc (một câu VÀ trên bảng gốc, loai = GOC, 1; lưu ev-tin-goc); 10/10 c-tin-may (nhật ký đăng nhập của kênh, 2; ev-tin-may), c-tin-xuong (lịch đặt xưởng, 1; ev-tin-xuong). Lời "Khi …": loi/tt-tin-don.md. -->

### c-tin-bang — Lọc tin đồn y hệt {challenge: c-tin-bang}

- Tiêu đề: Lọc bằng
- Đề bài hiển thị: Kênh sinh viên chuyền nhau câu tin đồn. Thử tìm xem có tin nào giống hệt câu đó không?
- Manh mối liên quan: clue-noi-dung-tin
- Mục tiêu học: Dùng phép = với chuỗi dài.
- Cột nộp: ma_tin
- Số dòng kỳ vọng: 0
- SQL chuẩn:

```sql
SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE noi_dung = 'CLB Thám Tử soi dữ liệu sinh viên';
```

- [LỜI c-tin-bang.1]

### c-tin-bat-dau — Lọc tin bắt đầu bằng {challenge: c-tin-bat-dau}

- Tiêu đề: Bắt đầu bằng
- Đề bài hiển thị: Có thể người ta viết thêm nội dung phía sau. Tìm những tin bắt đầu bằng câu đó.
- Mục tiêu học: Dùng LIKE và % ở cuối chuỗi.
- Cột nộp: ma_tin
- Số dòng kỳ vọng: 5
- SQL chuẩn:

```sql
SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE noi_dung LIKE 'CLB Thám Tử soi dữ liệu sinh viên%';
```

- [LỜI c-tin-bat-dau.1]

### c-tin-chua — Lọc tin có chứa nội dung {challenge: c-tin-chua}

- Tiêu đề: Có chứa
- Đề bài hiển thị: Nhỡ ai đó viết thêm từ ở phía trước thì sao? Tìm những tin có chứa đoạn "CLB Thám Tử soi".
- Mục tiêu học: Dùng LIKE và % ở cả hai đầu chuỗi.
- Cột nộp: ma_tin
- Số dòng kỳ vọng: 8
- SQL chuẩn:

```sql
SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE noi_dung LIKE '%CLB Thám Tử soi%';
```

- [LỜI c-tin-chua.1]

### c-tin-sach — Làm sạch dữ liệu {challenge: c-tin-sach}

- Tiêu đề: Làm sạch
- Đề bài hiển thị: Biết đâu có người cố tình gõ chữ thường hoặc lỡ dính dấu cách ở đầu. Làm sạch nội dung rồi tìm các tin bắt đầu bằng đoạn đó.
- Mục tiêu học: Kết hợp LOWER và TRIM.
- Cột nộp: ma_tin
- Số dòng kỳ vọng: 7
- SQL chuẩn:

```sql
SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE LOWER(TRIM(noi_dung)) LIKE 'clb thám tử soi%';
```

- [LỜI c-tin-sach.1]
- Vật chứng lưu vào hồ sơ: ev-tin-don
  - Tiêu đề: Các tin mang câu tin đồn
  - Mô tả: Kết quả truy vấn: nhiều tin chép lại cùng một câu, từ các tài khoản khác nhau. Phiếu chưa nói tin nào có trước.

### c-tin-in — Kiểm tra tài khoản {challenge: c-tin-in}

- Tiêu đề: Một trong mấy giá trị
- Đề bài hiển thị: Trong các tin mới tìm thấy, có hai tài khoản lạ. Lọc xem có tin nào gửi từ một trong hai tài khoản đó không?
- Mục tiêu học: Sử dụng IN cho danh sách giá trị.
- Cột nộp: ma_tin
- Số dòng kỳ vọng: 2
- SQL chuẩn:

```sql
SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE tai_khoan IN ('SV240201', 'SV240207');
```

- [LỜI c-tin-in.1]

### c-tin-goc — Tìm tin gốc {challenge: c-tin-goc}

- Tiêu đề: Tin gốc của tin đồn
- Đề bài hiển thị: Bỏ qua các tin chuyển tiếp, tìm duy nhất tin gốc từ những tin chép lại.
- Manh mối liên quan: clue-tin-goc
- Mục tiêu học: Kết hợp điều kiện VÀ.
- Cột nộp: ma_tin
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT ma_tin, thoi_diem, tai_khoan, loai, noi_dung FROM tin_nhan WHERE LOWER(TRIM(noi_dung)) LIKE 'clb thám tử soi%' AND loai = 'GOC';
```

- [LỜI c-tin-goc.1]
- Vật chứng lưu vào hồ sơ: ev-tin-goc
  - Tiêu đề: Tin gốc: 22:40 tối 07/10
  - Mô tả: Kết quả truy vấn bảng gốc: một tin gốc, gửi 22:40 thứ Hai 07/10 từ tài khoản clb_robotics. Phiếu cho biết tài khoản nào gửi, chưa cho biết ai ngồi gửi.
  - Giá trị cho trình dựng: clb_robotics

### c-tin-may — Ngày 07/10, tài khoản kênh đăng nhập những lần nào, từ máy nào? {challenge: c-tin-may}

- Tiêu đề: Nhật ký đăng nhập của kênh
- Đề bài hiển thị: Trong ngày tin được gửi, tài khoản kênh của Robotics đăng nhập những lần nào, từ máy nào?
- Manh mối liên quan: clue-ngay-gui
- Mục tiêu học: Dùng giá trị trên phiếu trước làm điều kiện cho bảng khác.
- Số dòng kỳ vọng: 2
- SQL chuẩn:

```sql
SELECT may, gio FROM dang_nhap_kenh WHERE tai_khoan = 'clb_robotics' AND ngay = '2024-10-07';
```

- [LỜI c-tin-may.1]
- Vật chứng lưu vào hồ sơ: ev-tin-may
  - Tiêu đề: Hai lần đăng nhập ngày 07/10
  - Mô tả: Kết quả truy vấn: tài khoản clb_robotics đăng nhập 15:10 từ máy xưởng số 2 và 22:31 từ máy văn phòng xưởng. Tin gốc gửi lúc 22:40. Phiếu cho biết máy nào, chưa cho biết ai ngồi máy.

### c-tin-xuong — Tối 07/10, xưởng được đăng ký từ mấy giờ tới mấy giờ, cho hoạt động nào? {challenge: c-tin-xuong}

- Tiêu đề: Lịch đặt xưởng
- Đề bài hiển thị: Lịch đặt xưởng của nhà văn hóa. Tối 07/10 xưởng được đăng ký từ mấy giờ tới mấy giờ, cho hoạt động nào?
- Manh mối liên quan: clue-ngay-gui
- Mục tiêu học: Hai hướng điều tra, mỗi hướng một nguồn riêng; cùng một giá trị ngày dùng cho hai bảng.
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT ngay, tu_gio, den_gio, muc_dich FROM dat_xuong WHERE ngay = '2024-10-07';
```

- [LỜI c-tin-xuong.1]
- Vật chứng lưu vào hồ sơ: ev-tin-xuong
  - Tiêu đề: Tối 07/10 xưởng mở tới 23 giờ
  - Mô tả: Kết quả truy vấn: thứ Hai 07/10, xưởng đăng ký từ 19:00 tới 23:00 cho đội thi đấu tập. Đây là lịch đăng ký, chưa cho biết ai thật sự có mặt.
