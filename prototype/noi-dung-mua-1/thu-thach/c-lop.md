<!-- Thẻ thử thách Vụ 1 bản 7 (gói B22, 10/10/2026): màn tra bảng lớp. Bảng lớp (ma_lop, nganh, khoa_hoc, toa, buoi) không thuộc quyền tra sẵn của CLB: Minh Anh xin thầy Quang (chặng 1, dàn ý 1.6) và mang về ở chặng 2. Báo chí khóa 2024 có ba lớp (BC24A tòa B sáng thứ Hai, BC24B tòa C sáng thứ Hai, BC24C tòa B chiều thứ Hai); thiếu một điều kiện thì ra hai hoặc ba dòng. Giá trị kéo vào ô: Báo chí, 2024 (clue-bc24); B, Sáng thứ Hai (ev-the-lich-bc24). -->

### c-lop-bc24a — Lớp nào học Báo chí khóa 2024, tòa B, sáng thứ Hai? {challenge: c-lop-bc24a}

- Tiêu đề: Bảng lớp: Báo chí 2024, tòa B, sáng thứ Hai
- Đề bài hiển thị: Lớp nào học Báo chí khóa 2024, ở tòa B, vào sáng thứ Hai?
- Manh mối liên quan: ev-the-lich-bc24, clue-bc24
- Mục tiêu học: Bốn điều kiện nối bằng VÀ: thêm từng điều kiện thấy số dòng rơi, thiếu một điều kiện vẫn còn thừa lớp.
- Bấm ô lấy giấy nhớ: ma_lop
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT ma_lop, nganh, khoa_hoc, toa, buoi FROM lop WHERE nganh = 'Báo chí' AND khoa_hoc = 2024 AND toa = 'B' AND buoi = 'Sáng thứ Hai';
```

- [LỜI c-lop-bc24a.1]
- Vật chứng lưu vào hồ sơ: ev-lop-bc24a
  - Tiêu đề: Lớp BC24A học tòa B sáng thứ Hai
  - Mô tả: Bảng lớp, lọc Báo chí VÀ khóa 2024 VÀ tòa B VÀ sáng thứ Hai: một dòng, lớp BC24A. Báo chí 2024 còn BC24B (tòa C) và BC24C (chiều thứ Hai) nhưng không khớp đủ bốn điều kiện.
  - Giá trị cho trình dựng: BC24A
  - Chữ trên giấy: Lớp học tòa B sáng thứ Hai của Báo chí 2024: **BC24A**
