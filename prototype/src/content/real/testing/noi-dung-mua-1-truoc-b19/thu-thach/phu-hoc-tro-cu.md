<!-- Thẻ thử thách của nhiệm vụ phụ "Học trò cũ của cô" (kich-ban/24-phu-hoc-tro-cu.md): ÔN gọt chữ (LOWER + TRIM), nhóm và đếm, lọc nhóm theo số dòng. c-hoc-ra-truong (ghi chú ra trường, gọt cả hai → phiếu 30 dòng) → c-hoc-ten (gom theo họ tên → 26 tên) → c-hoc-hai-dong (chỉ giữ tên có hơn một dòng → 4 tên). Lời "Khi …": loi/tt-phu-hoc-tro-cu.md. -->

### c-hoc-ra-truong — Những dòng nào ghi học trò đã ra trường? {challenge: c-hoc-ra-truong}

- Tiêu đề: Danh sách lớp cũ của cô Hạnh
- Đề bài hiển thị: Danh sách lớp các khóa 1995–2005, nhập tay mỗi năm một kiểu. Những dòng nào ghi học trò đã ra trường?
- Manh mối liên quan: clue-hoc-ghi-chu
- Mục tiêu học: Ôn gọt dữ liệu: ô gõ tay lệch chữ hoa và dấu cách thì gọt cả hai trước khi so.
- Số dòng kỳ vọng: 30
- SQL chuẩn:

```sql
SELECT nam_hoc, lop, ho_ten FROM danh_sach_lop_cu WHERE LOWER(TRIM(ghi_chu)) = 'ra trường';
```

- [LỜI c-hoc-ra-truong.1]
- Vật chứng lưu vào hồ sơ: ev-hoc-ra-truong
  - Tiêu đề: Ba mươi dòng ghi ra trường
  - Mô tả: Kết quả truy vấn: ba mươi dòng ghi học trò đã ra trường, từ các lớp 1997 đến 2005, mỗi dòng ghi năm học, lớp và họ tên.

### c-hoc-ten — Ba mươi dòng đó gom lại còn bao nhiêu tên? {challenge: c-hoc-ten}

- Kiểu: tổng hợp
- Nguồn: ev-hoc-ra-truong
- Nhóm theo: ho_ten
- Tiêu đề: Dòng ra trường gom theo họ tên
- Đề bài hiển thị: Lấy phiếu ba mươi dòng làm nguồn. Gom theo họ tên: mỗi tên một nhóm, đếm mỗi tên mấy dòng.
- Mục tiêu học: Gom và đếm để ra danh sách không trùng: cùng một thao tác, nguồn khác.
- Số dòng kỳ vọng: 26
- SQL chuẩn:

```sql
SELECT ho_ten, COUNT(*) AS so_dong FROM @ev-hoc-ra-truong GROUP BY ho_ten;
```

- Vật chứng lưu vào hồ sơ: ev-hoc-ten
  - Tiêu đề: Hai mươi sáu tên không trùng
  - Mô tả: Kết quả gom theo họ tên: ba mươi dòng ra trường còn hai mươi sáu tên. Hai mươi hai tên có một dòng, bốn tên có hai dòng.

### c-hoc-hai-dong — Tên nào xuất hiện hơn một dòng ra trường? {challenge: c-hoc-hai-dong}

- Kiểu: tổng hợp
- Nguồn: ev-hoc-ra-truong
- Tiêu đề: Tên có hơn một dòng
- Đề bài hiển thị: Lấy phiếu ba mươi dòng làm nguồn. Gom theo họ tên, chỉ giữ tên có hơn một dòng.
- Manh mối liên quan: clue-hoc-mot-dong
- Mục tiêu học: Ôn lọc nhóm (HAVING) theo số dòng của nhóm.
- Số dòng kỳ vọng: 4
- SQL chuẩn:

```sql
SELECT ho_ten, COUNT(*) AS so_dong FROM @ev-hoc-ra-truong GROUP BY ho_ten HAVING COUNT(*) > 1;
```

- Vật chứng lưu vào hồ sơ: ev-hoc-hai-dong
  - Tiêu đề: Bốn tên có hai dòng ra trường
  - Mô tả: Kết quả gom theo họ tên, chỉ giữ tên có hơn một dòng: Hoàng Minh Châu, Đinh Công Sơn, Hà Đức Long, Nguyễn Văn Hùng, mỗi tên hai dòng. Trùng tên chưa nói được là một người hay hai người.
