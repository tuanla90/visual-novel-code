<!-- Thẻ thử thách chương 1 — ngày 3, laptop phòng CLB (kich-ban/03-ngay-3.md, n3-laptop; ĐÃ CHỐT C 30/09/2026) và buổi họp. Phiếu tra cứu mở bảng sinh viên 4 cột. Kéo phiếu hai lớp vào cột lớp, [H] vào cột tên: "bằng" → 0 → "bắt đầu bằng" → Hiếu, Hoài. Chấm theo tập kết quả: ma_lop = 'BC24A' cũng ra đúng hai dòng (BC23A có sinh viên nhưng không ai tên hay họ bắt đầu bằng H — luật của tools/noi-dung/nhieu-mvp.ts). -->

### c-ten-h — Ai trong hai lớp có tên bắt đầu bằng H? {challenge: c-ten-h}

- Tiêu đề: Tên bắt đầu bằng H trong hai lớp
- Đề bài hiển thị: Chữ ký chỉ đọc được chữ H. Người ký học một trong hai lớp. Là ai?
- Manh mối liên quan: clue-chu-ky-h, ev-hai-lop
- Mục tiêu học: "=" so khớp chính xác, ra 0 dòng thì xem lại dữ liệu; "bắt đầu bằng" (LIKE 'H%') mới khớp một chữ cái.
- Số dòng kỳ vọng: 2
- SQL chuẩn:

```sql
SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_lop IN ('BC24A', 'BC23A') AND ten LIKE 'H%';
```

- [LỜI c-ten-h.1]
- Vật chứng lưu vào hồ sơ: ev-hai-ma
  - Tiêu đề: Hai mã ứng viên kèm căn cứ
  - Mô tả: Kết quả truy vấn: hai sinh viên có tên bắt đầu bằng H, cùng lớp BC24A — Hiếu và Hoài.
  - Giá trị cho trình dựng: SV240228 · SV240317

### c-sua-or-quan — Sửa câu OR của Quân ở buổi họp {challenge: c-sua-or-quan}

- Tiêu đề: Câu truy vấn trên màn chiếu
- Đề bài hiển thị: Câu của Quân đang chiếu trên màn: "tên bắt đầu bằng H hoặc lớp BC24A", ra 595 dòng. Hồ sơ CLB nộp chỉ có 2.
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

- Nguồn điều kiện nạp sẵn: dk-ten ← clue-chu-ky-h · dk-lop ← ev-hai-lop
- Vật chứng lưu vào hồ sơ: ev-hai-dong-sua
  - Tiêu đề: Hai dòng sau khi sửa
  - Mô tả: Truy vấn của Quân sau khi đổi OR thành AND.
