<!-- Thẻ thử thách phòng máy — ngày 2 -->

<!-- Khuôn thẻ hiện có (đặc tả §9.1 "bước 1"). Thêm "Số dòng kỳ vọng" để đợt 14 kiểm khớp dữ liệu. Khối sự kiện [KHI …] (§9.2) là việc đợt 15. -->

### c-loc-lop — Lớp nào ở tòa B và ngành Báo chí? {challenge: c-loc-lop}

- Tiêu đề: Lớp nào ở tòa B và thuộc ngành Báo chí?
- Đề bài hiển thị: Hộp được mở ở tòa B; thẻ lịch là của khoa Báo chí K24. Lớp sinh hoạt nào khớp cả hai?
- Manh mối liên quan: clue-toa-b, clue-bao-chi-k24
- Mục tiêu học: Hai điều kiện nối bằng AND (phần giao) và OR (phần hợp) cho kết quả khác nhau.
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT ma_lop, nganh, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí';
```

- [DÀN DỰNG] Tùng: "Tớ cá là cứ OR vào…" → `toa_nha='B' OR nganh='Báo chí'` → 4 lớp. Hà Vy: "Đừng cá. Tính." Đổi AND → 1 lớp: BC24A → "Số liệu đây!" lần đầu. Chép sổ trang and-or.
- Vật chứng lưu vào hồ sơ: ev-lop-bc24a
  - Tiêu đề: Lớp khớp cả hai điều kiện
  - Mô tả: Kết quả truy vấn: một lớp sinh hoạt ở tòa B thuộc ngành Báo chí.
