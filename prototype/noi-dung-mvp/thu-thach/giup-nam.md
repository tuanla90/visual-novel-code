<!-- Thẻ thử thách Vụ 4 "Giúp Nam" (kich-ban/12-vu-4-giup-nam.md). Điều mới: NỐI HAI BẢNG (khối "nối với … theo …" ở màn tra; nối theo cột trùng tên khác như ngay thì ra kết quả sai). c-don-da-duyet (lọc đơn đã duyệt → phiếu 8 đơn) → c-don-theo-nguoi (tổng hợp theo người đặt: Nam 5) → c-don-nam-may (nối đơn với phiên đăng nhập theo ma_phien, lọc Nam → 5 đơn kèm máy, giờ) → c-don-nam-theo-may (tổng hợp theo máy: máy văn phòng 3, máy xưởng số 2 hai) → c-may-vp (tùy chọn: mọi đơn từ máy văn phòng → 4). Lời "Khi …": loi/tt-giup-nam.md. -->

### c-don-da-duyet — Sổ đặt hàng của xưởng có những đơn nào đã duyệt? {challenge: c-don-da-duyet}

- Tiêu đề: Sổ đặt linh kiện của xưởng
- Đề bài hiển thị: Sổ đặt linh kiện của xưởng Robotics, tháng 9 và 10. Những đơn nào đã duyệt?
- Manh mối liên quan: clue-da-duyet
- Mục tiêu học: Lọc theo trạng thái để ghim thành phiếu, chuẩn bị gom và đếm.
- Số dòng kỳ vọng: 8
- SQL chuẩn:

```sql
SELECT ma_don, ngay, nguoi_dat, linh_kien, so_tien, ma_phien FROM don_linh_kien WHERE trang_thai = 'DA_DUYET';
```

- [LỜI c-don-da-duyet.1]
- Vật chứng lưu vào hồ sơ: ev-don-da-duyet
  - Tiêu đề: Tám đơn linh kiện đã duyệt
  - Mô tả: Kết quả truy vấn: tám đơn đã duyệt, mỗi đơn ghi ngày, người đứng tên, linh kiện, số tiền và mã phiên đăng nhập lúc tạo đơn.

### c-don-theo-nguoi — Mỗi người đứng tên bao nhiêu đơn đã duyệt? {challenge: c-don-theo-nguoi}

- Kiểu: tổng hợp
- Nguồn: ev-don-da-duyet
- Nhóm theo: nguoi_dat
- Tiêu đề: Đơn đã duyệt, gom theo người đặt
- Đề bài hiển thị: Lấy phiếu tám đơn làm nguồn. Gom theo người đứng tên, đếm mỗi người mấy đơn.
- Mục tiêu học: Thống kê trước khi đọc từng dòng: con số bất thường chỉ ra chỗ cần xem.
- Số dòng kỳ vọng: 4
- SQL chuẩn:

```sql
SELECT nguoi_dat, COUNT(*) AS so_dong FROM @ev-don-da-duyet GROUP BY nguoi_dat;
```

- Vật chứng lưu vào hồ sơ: ev-don-theo-nguoi
  - Tiêu đề: Nam đứng tên 5 trong 8 đơn
  - Mô tả: Kết quả gom theo người đặt: Nam 5 đơn, Bách 1, Thảo 1, Khánh 1. Nam nói mình chỉ đặt hai.

### c-don-nam-may — Năm đơn đứng tên Nam được tạo từ máy nào, lúc mấy giờ? {challenge: c-don-nam-may}

- Tiêu đề: Đơn của Nam nối với phiên đăng nhập
- Đề bài hiển thị: Sổ đặt hàng ghi mã phiên; bảng phiên đăng nhập ghi máy và giờ của mỗi phiên. Năm đơn đứng tên Nam được tạo từ máy nào, lúc mấy giờ?
- Manh mối liên quan: clue-ma-phien, clue-nguoi-dat-nam
- Nối được với: phien_dang_nhap
- Mục tiêu học: Nối hai bảng theo cột chung đúng nghĩa (mã phiên); nối theo cột trùng tên khác (ngày) thì mỗi đơn kéo theo cả phiên của người khác.
- Số dòng kỳ vọng: 5
- SQL chuẩn:

```sql
SELECT ma_don, linh_kien, may, gio FROM don_linh_kien JOIN phien_dang_nhap ON don_linh_kien.ma_phien = phien_dang_nhap.ma_phien WHERE nguoi_dat = 'Nam';
```

- [LỜI c-don-nam-may.1]
- Vật chứng lưu vào hồ sơ: ev-don-nam-may
  - Tiêu đề: Năm đơn của Nam: máy và giờ tạo
  - Mô tả: Kết quả nối hai bảng: hai đơn tạo buổi chiều từ máy xưởng số 2, ba đơn tạo ban đêm từ máy văn phòng xưởng (21:50, 22:10, 22:05). Đơn 07/10 tạo lúc 22:05, khi Nam đang ở thư viện.

### c-don-nam-theo-may — Năm đơn đứng tên Nam chia theo máy ra sao? {challenge: c-don-nam-theo-may}

- Kiểu: tổng hợp
- Nguồn: ev-don-nam-may
- Nhóm theo: may
- Tiêu đề: Đơn của Nam, gom theo máy
- Đề bài hiển thị: Lấy phiếu năm đơn làm nguồn. Gom theo máy, đếm mỗi máy mấy đơn.
- Mục tiêu học: Gom và đếm trên phiếu đã nối: cùng một thao tác, nguồn khác.
- Số dòng kỳ vọng: 2
- SQL chuẩn:

```sql
SELECT may, COUNT(*) AS so_dong FROM @ev-don-nam-may GROUP BY may;
```

- Vật chứng lưu vào hồ sơ: ev-don-nam-theo-may
  - Tiêu đề: 3 đơn từ máy văn phòng xưởng, 2 từ máy xưởng số 2
  - Mô tả: Kết quả gom theo máy: ba đơn mang tên Nam tạo từ máy văn phòng xưởng (phòng khóa, chìa ban chủ nhiệm giữ), hai đơn từ máy xưởng số 2 là của Nam.

### c-may-vp — Máy văn phòng xưởng đã tạo những đơn nào? {challenge: c-may-vp}

- Tiêu đề: Mọi đơn từ máy văn phòng xưởng
- Đề bài hiển thị: Nối sổ đặt hàng với bảng phiên đăng nhập. Máy văn phòng xưởng đã tạo những đơn nào, đứng tên ai, lúc mấy giờ?
- Manh mối liên quan: clue-may-vp, clue-ma-phien
- Nối được với: phien_dang_nhap
- Mục tiêu học: Ôn nối bảng; đổi điều kiện lọc sang cột của bảng thứ hai.
- Số dòng kỳ vọng: 4
- SQL chuẩn:

```sql
SELECT ma_don, nguoi_dat, linh_kien, gio FROM don_linh_kien JOIN phien_dang_nhap ON don_linh_kien.ma_phien = phien_dang_nhap.ma_phien WHERE may = 'MAY-VP-XUONG';
```

- [LỜI c-may-vp.1]
- Vật chứng lưu vào hồ sơ: ev-may-vp
  - Tiêu đề: Máy văn phòng xưởng: 3 đơn đêm mang tên Nam, 1 đơn ngày của Khánh
  - Mô tả: Kết quả: bốn đơn tạo từ máy văn phòng xưởng. Ba đơn ban đêm đứng tên Nam; một đơn ốc vít 10:15 sáng đứng tên Khánh, trưởng CLB, là người dùng máy đó hợp lệ ban ngày. Ba người có chìa phòng: Khánh, Bách, Thảo.
