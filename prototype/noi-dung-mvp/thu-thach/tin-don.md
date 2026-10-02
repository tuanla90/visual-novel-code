<!-- Thẻ thử thách Vụ 2 "Tin đồn" (kich-ban/10-vu-2-tin-don.md). Ba lần tra: c-tin-don  — laptop phòng CLB: lọc các tin mang câu tin đồn ("bằng" ra 0 dòng vì tin còn đoạn sau → "bắt đầu bằng" ra 5). Phiếu ev-tin-don được ghim và dùng làm nguồn cho thẻ sau. c-tin-goc  — "Kiểu: lọc tiếp": nguồn là PHIẾU ev-tin-don (màn tra hiện WITH tin_don AS (phiếu …)); lọc loai = GOC → 1 dòng. c-tin-may  — tuyến dữ liệu của song tuyến: nhật ký đăng nhập của kênh, tài khoản + ngày → 2 dòng (15:10 máy xưởng số 2, 22:31 máy văn phòng xưởng). Lời "Khi …": loi/tt-tin-don.md. -->

### c-tin-don — Những tin nào mang câu tin đồn? {challenge: c-tin-don}

- Tiêu đề: Tin đồn trên kênh sinh viên
- Đề bài hiển thị: Kênh sinh viên chuyền nhau một câu về CLB. Những tin nào mang câu đó?
- Manh mối liên quan: clue-noi-dung-tin
- Mục tiêu học: Ôn "bắt đầu bằng"; kết quả nhiều dòng được ghim thành phiếu để dùng tiếp.
- Số dòng kỳ vọng: 5
- SQL chuẩn:

```sql
SELECT ma_tin, thoi_diem, tai_khoan, loai FROM tin_nhan WHERE noi_dung LIKE 'CLB Thám Tử soi dữ liệu%';
```

- [LỜI c-tin-don.1]
- Vật chứng lưu vào hồ sơ: ev-tin-don
  - Tiêu đề: Năm tin mang câu tin đồn
  - Mô tả: Kết quả truy vấn: năm tin cùng một câu, từ năm tài khoản. Bốn tài khoản là mã sinh viên, một là clb_robotics. Phiếu chưa nói tin nào có trước.

### c-tin-goc — Trong năm tin đó, tin nào là tin gốc? {challenge: c-tin-goc}

- Kiểu: lọc tiếp
- Nguồn: ev-tin-don
- Tiêu đề: Tin gốc của tin đồn
- Đề bài hiển thị: Năm tin trên phiếu lẫn cả tin chuyển tiếp. Tin nào là tin gốc?
- Manh mối liên quan: clue-tin-goc
- Mục tiêu học: Lấy phiếu kết quả đã ghim làm nguồn cho lần tra kế tiếp (WITH … AS): lọc tiếp trên đống đã thu hẹp.
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT ma_tin, thoi_diem, tai_khoan FROM @ev-tin-don WHERE loai = 'GOC';
```

- [LỜI c-tin-goc.1]
- Vật chứng lưu vào hồ sơ: ev-tin-goc
  - Tiêu đề: Tin gốc: 22:40 tối 07/10
  - Mô tả: Kết quả lọc tiếp trên phiếu năm tin: một tin gốc, gửi 22:40 thứ Hai 07/10 từ tài khoản clb_robotics. Phiếu cho biết tài khoản nào gửi, chưa cho biết ai ngồi gửi.
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
