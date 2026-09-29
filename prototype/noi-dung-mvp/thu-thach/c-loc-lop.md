<!-- Thẻ thử thách phòng máy — ngày 2: chuỗi bài 2.1 → 2.4 (QĐ-092, docs/mvp/thuc-hanh-sql-vu1-mvp.md mục 4). Chuỗi chạy ở kich-ban/02-phong-may-ngay-2.md (pm2-lop). Bài giữa chuỗi không có vật chứng; chỉ 2.4 lưu Lớp BC24A. SQL chuẩn, số dòng: phiên logic giữ (bộ kiểm chạy thật). Lời dẫn / thoại: phiên truyện. -->

### c-loc-khoa — Bài 2.1: các lớp khóa K24 {challenge: c-loc-khoa}

- Tiêu đề: Các lớp khóa K24
- Đề bài hiển thị: Thẻ lịch ghi "K24". Lọc bảng lớp sinh hoạt lấy các lớp khóa đó.
- Manh mối liên quan: clue-bao-chi-k24
- Mục tiêu học: WHERE lọc dòng; so sánh với số thì viết đúng như dữ liệu đang lưu (2024, không phải K24).
- Số dòng kỳ vọng: 11
- SQL chuẩn:

```sql
SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE khoa_hoc = 2024;
```

- Khi chạy ra 0 dòng: **ha-vy** (thinking): 0 dòng. Cột khóa đang lưu con số 2024, không có chữ K nào cả.
- [DÀN DỰNG] Lần chạy "sai có ích": kéo [K24] vào cột khóa → `khoa_hoc = 'K24'` → 0 dòng. Hà Vy mô tả: cột khóa lưu số 2024. Người chơi ✎ gõ 2024.

### c-loc-toa — Bài 2.2: các lớp học ở tòa B {challenge: c-loc-toa}

- Tiêu đề: Các lớp sinh hoạt ở tòa B
- Đề bài hiển thị: Hộp kiến nghị ở tòa B. Lọc các lớp sinh hoạt ở tòa B.
- Manh mối liên quan: clue-toa-b
- Mục tiêu học: So sánh với chữ phải đặt trong nháy đơn; thiếu nháy máy tưởng là tên cột.
- Số dòng kỳ vọng: 4
- SQL chuẩn:

```sql
SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B';
```

- Khi lỗi không có cột: **ha-vy** (thinking): Máy đang đi tìm một cột tên là B. Chữ không có nháy thì nó tưởng là tên cột.
- [DÀN DỰNG] Lần chạy "sai có ích": gõ như số `toa_nha = B` → lỗi "no such column: B". Hà Vy mô tả: máy đang đi tìm một cột tên B.

### c-loc-and — Bài 2.3: tòa B và ngành Báo chí {challenge: c-loc-and}

- Tiêu đề: Lớp ở tòa B và thuộc ngành Báo chí
- Đề bài hiển thị: Lớp cần tìm vừa ở tòa B, vừa thuộc ngành Báo chí.
- Manh mối liên quan: clue-toa-b, clue-bao-chi-k24
- Mục tiêu học: AND giữ dòng thỏa cả hai điều kiện (phần giao); OR giữ dòng thỏa một trong hai (phần hợp).
- Số dòng kỳ vọng: 2
- SQL chuẩn:

```sql
SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí';
```

- Khi chạy ra 5 dòng: **tung** (worried): Ơ, năm lớp? <br> **ha-vy** (neutral): Lớp nào ở tòa B, hoặc học Báo chí, đều được lấy hết.
- [DÀN DỰNG] Tùng nối bằng OR → 5 lớp. Hà Vy mô tả: lấy lớp nào thỏa một trong hai. Đổi AND → 2 lớp (BC24A, BC23A).

### c-loc-lop — Bài 2.4: thêm khóa, chốt một lớp {challenge: c-loc-lop}

- Tiêu đề: Lớp ở tòa B, ngành Báo chí, khóa K24
- Đề bài hiển thị: Còn hai lớp. Thêm điều kiện khóa để chỉ còn lớp khớp cả ba manh mối.
- Manh mối liên quan: clue-toa-b, clue-bao-chi-k24
- Mục tiêu học: Ghép ba điều kiện bằng AND.
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí' AND khoa_hoc = 2024;
```

- Khi chạy ra 2 dòng: **ha-vy** (thinking): Vẫn hai lớp. Một lớp khóa khác cũng ở tòa B.
- [DÀN DỰNG] Dừng ở 2 lớp: Hà Vy mô tả có một lớp khóa khác cũng ở tòa B. Thêm `khoa_hoc = 2024` → BC24A → "Số liệu đây!" lần đầu.
- Vật chứng lưu vào hồ sơ: ev-lop-bc24a
  - Tiêu đề: Lớp BC24A — tòa B, Báo chí, khóa 2024
  - Mô tả: Kết quả truy vấn ghép ba điều kiện (tòa B, ngành Báo chí, khóa 2024): đúng một lớp.
  - Giá trị cho trình dựng: BC24A
