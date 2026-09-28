### debrief-fix — Sửa truy vấn của Quân {challenge: debrief-fix}

- Tiêu đề: Sửa truy vấn của Quân
- Đề bài hiển thị: Truy vấn của Quân đã nạp sẵn. Sửa để chỉ lấy những người khớp đồng thời cả ba manh mối, rồi chạy. Kết quả cần có: mã sinh viên, họ đệm, tên (giữ lớp và câu lạc bộ để đối chiếu).
- Cột bắt buộc: `ma_sv`, `ho_dem`, `ten` (khuyến khích thêm `ma_lop`, `clb`) · Kết quả chuẩn: 2 dòng, giống c3 · Chạy thêm dataset ẩn: có (QĐ-015)
- Nạp sẵn vào trình dựng: `FROM sinh_vien`; `SELECT ma_sv, ho_dem, ten, ma_lop, clb`; ba điều kiện của §4.4; phép nối chung `OR` (QĐ-016; theo QĐ-039 phép nối ở đây nạp sẵn `OR`, không ở trạng thái chưa chọn).
- Truy vấn nạp sẵn:

```sql
SELECT ma_sv, ho_dem, ten, ma_lop, clb
FROM sinh_vien
WHERE ten LIKE 'H%'
   OR ma_lop IN ('KT24A', 'QT24B')
   OR clb = 'Báo chí';
```

- Nguồn điều kiện nạp sẵn: quan-signature-h ← clue-signature-h · quan-classes-b ← ev-c2-classes-b · quan-bookmark ← clue-bookmark-baochi
- Manh mối liên quan: clue-signature-h, clue-box-building-b (qua ev-c2-classes-b), clue-bookmark-baochi
- Mục tiêu học: `OR` lấy người thỏa bất kỳ điều kiện nào; `AND` lấy người thỏa đồng thời mọi điều kiện.
- SQL chuẩn:

```sql
SELECT ma_sv, ho_dem, ten, ma_lop, clb
FROM sinh_vien
WHERE ten LIKE 'H%'
  AND ma_lop IN ('KT24A', 'QT24B')
  AND clb = 'Báo chí';
```

- [KHI: or-connector] dùng hint-any-or-all
- [KHI: missing-condition] **ha-vy** (thinking): Bớt manh mối thì danh sách rộng ra. Giữ đủ ba điều kiện, chỉ đổi cách nối.
- [KHI: missing-columns] dùng hint-right-columns
- [GỢI Ý 1] **ha-vy** (neutral): Truy vấn của anh Quân lấy cả người chỉ khớp một manh mối. Mình cần người khớp cả ba.
- [GỢI Ý 2] **ha-vy** (thinking): Giữ nguyên ba điều kiện. Chỉ đổi phép nối giữa chúng.
- [GỢI Ý 3] **ha-vy** (smile): Đổi OR thành AND: `WHERE ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí'`.
- [KHI ĐÚNG] **ha-vy** (smile): Hai dòng. Đưa lên màn chiếu đi!
- Vật chứng lưu vào hồ sơ: ev-quan-fixed
  - Tiêu đề: Truy vấn của Quân, đã sửa
  - Mô tả: Cùng ba điều kiện, đổi `OR` thành `AND`: từ 24 dòng còn 2 dòng.
