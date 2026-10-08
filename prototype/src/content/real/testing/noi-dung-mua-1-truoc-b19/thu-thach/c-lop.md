<!-- Thẻ thử thách chương 1 — ngày 2, laptop phòng CLB (ĐÃ CHỐT C, 30/09/2026). Chuỗi chạy ở kich-ban/02-ngay-2.md (n2-laptop). Tài khoản CLB chỉ xem được bảng lớp. SQL chuẩn, số dòng: phiên logic giữ (bộ kiểm chạy thật). Lời "Khi …": loi/tt-c-lop.md. -->

### c-bang-lop — Tài khoản CLB xem được bảng nào? {challenge: c-bang-lop}

- Tiêu đề: Bảng lớp sinh hoạt
- Đề bài hiển thị: Tài khoản CLB chỉ xem được một bảng. Chọn bảng ấy rồi chạy, xem nó ghi những gì.
- Mục tiêu học: Mỗi lần tra bắt đầu bằng việc chọn bảng. Chạy mà chưa lọc thì ra mọi dòng của bảng.
- Số dòng kỳ vọng: 112
- SQL chuẩn:

```sql
SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat;
```

- [LỜI c-bang-lop.1]
- Vật chứng lưu vào hồ sơ: ev-bang-lop
  - Tiêu đề: Bảng lớp: 112 lớp, 4 cột
  - Mô tả: Cả bảng lớp sinh hoạt: một trăm mười hai lớp của bốn khóa. Mỗi dòng ghi mã lớp, ngành, khóa học và tòa nhà.

### c-cot-lop — Chỉ lấy cột cần xem {challenge: c-cot-lop}

- Tiêu đề: Lớp nào ở tòa nào
- Đề bài hiển thị: Bảng lớp có bốn cột. Lần này chỉ cần biết lớp nào ở tòa nào: bấm lấy hai cột ấy rồi chạy.
- Mục tiêu học: SELECT chọn CỘT muốn xem; số dòng không đổi, bảng gọn lại.
- Chọn cột: không
- Số dòng kỳ vọng: 112
- SQL chuẩn:

```sql
SELECT ma_lop, toa_nha FROM lop_sinh_hoat;
```

- [LỜI c-cot-lop.1]

### c-lop — Lớp nào vừa ở tòa B vừa học Báo chí? {challenge: c-lop}

- Tiêu đề: Lớp ở tòa B và học Báo chí
- Đề bài hiển thị: Hộp ở tòa B. Thẻ lịch của khoa Báo chí. Lớp nào khớp cả hai?
- Manh mối liên quan: clue-toa-b, clue-bao-chi-k24
- Mục tiêu học: Hai điều kiện. VÀ giữ lớp khớp cả hai (2 lớp); HOẶC giữ lớp khớp một trong hai (33 lớp).
- Số dòng kỳ vọng: 2
- SQL chuẩn:

```sql
SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí';
```

- [LỜI c-lop.1]
- Vật chứng lưu vào hồ sơ: ev-hai-lop
  - Tiêu đề: Hai lớp: BC24A, BC23A
  - Mô tả: Lớp ở tòa B và học ngành Báo chí: đúng hai lớp.
  - Giá trị cho trình dựng: BC24A · BC23A
  - Giấy nhớ: mỗi giá trị một tờ
  - Chữ trên giấy: Lớp ở tòa B, học Báo chí: **BC24A** · Lớp ở tòa B, học Báo chí: **BC23A**
