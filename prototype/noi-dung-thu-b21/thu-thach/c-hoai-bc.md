### c-hoai-bc — Hoài nào học lớp BC24A? {challenge: c-hoai-bc}

- Tiêu đề: Bảng sinh viên: Hoài, lớp BC24A
- Đề bài hiển thị: Trong năm bạn tên Hoài, bạn nào học lớp BC24A?
- Manh mối liên quan: clue-the-lich, clue-bc24
- Mục tiêu học: Hai điều kiện nối bằng VÀ: đúng tên, đúng lớp.
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài' AND ma_lop = 'BC24A';
```

- Khi đúng: **minh-anh** (happy): Một dòng. Lê Thu Hoài, lớp BC24A.
- Vật chứng lưu vào hồ sơ: ev-hoai-bc24
  - Tiêu đề: Lê Thu Hoài, lớp BC24A, ở ký túc xá
  - Mô tả: Bảng sinh viên: tên Hoài VÀ lớp BC24A ra một dòng, SV240317, ở ký túc xá.
  - Giá trị cho trình dựng: SV240317
  - Chữ trên giấy: Lê Thu Hoài, mã **SV240317**, lớp BC24A
