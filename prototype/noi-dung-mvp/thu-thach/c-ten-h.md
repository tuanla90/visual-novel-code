<!-- Thẻ thử thách phòng máy — ngày 4 và buổi họp -->

### c-ten-h — Ai trong lớp BC24A có tên bắt đầu bằng H? {challenge: c-ten-h}

- Tiêu đề: Tên bắt đầu bằng H trong lớp BC24A
- Đề bài hiển thị: Chữ ký "H." trên phiếu gửi; lớp đã thu hẹp còn BC24A. Những sinh viên nào khớp cả hai?
- Manh mối liên quan: clue-chu-ky-h
- Mục tiêu học: "=" so khớp chính xác, ra 0 dòng thì xem lại dữ liệu; "bắt đầu bằng" (LIKE 'H%') mới khớp một chữ cái.
- Số dòng kỳ vọng: 2
- SQL chuẩn:

```sql
SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop = 'BC24A';
```

- [DÀN DỰNG] Kéo [H.] với phép "bằng" → 0 dòng. Tùng: "Tra sổ chị Linh đi" → trang lỗi thường gặp → đổi "bắt đầu bằng" → 2 dòng. Bẫy: `ma_lop LIKE 'BC%'` → 3 dòng; lọc nhầm cột ho_dem → 1 dòng.
- Vật chứng lưu vào hồ sơ: ev-hai-ma
  - Tiêu đề: Hai mã ứng viên kèm căn cứ
  - Mô tả: Kết quả truy vấn: hai sinh viên lớp BC24A có tên bắt đầu bằng H.

### c-sua-or-quan — Sửa câu OR của Quân ở buổi họp {challenge: c-sua-or-quan}

- Tiêu đề: Câu truy vấn trên màn chiếu
- Đề bài hiển thị: Câu của Quân lấy "tên H hoặc lớp BC24A". Sửa để chỉ còn những người khớp cả hai.
- Manh mối liên quan: clue-chu-ky-h
- Mục tiêu học: Phần hợp (OR) và phần giao (AND).
- Số dòng kỳ vọng: 2
- SQL chuẩn:

```sql
SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop = 'BC24A';
```

- Truy vấn nạp sẵn:

```sql
SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop = 'BC24A';
```

- Nguồn điều kiện nạp sẵn: dk-ten ← clue-chu-ky-h · dk-lop ← ev-lop-bc24a
- Vật chứng lưu vào hồ sơ: ev-hai-dong-sua
  - Tiêu đề: Hai dòng sau khi sửa
  - Mô tả: Truy vấn của Quân sau khi đổi OR thành AND.
