<!-- Thẻ thử thách Vụ 1 bản 7 (gói B22, 10/10/2026): màn tra bảng sinh viên của CLB. Chủ nhiệm CLB được cấp tài khoản tra bảng sinh viên từ buổi lễ đầu năm để duyệt đơn thành viên (cột cơ bản: mã, họ đệm, tên, mã lớp, nơi ở). Bảng khác phải nhờ người giữ. Câu SQL giữ tên ASCII; chữ hiện trên khối là nhãn tiếng Việt (khai ở du-lieu.md). Số dòng đếm trên dữ liệu đã thêm nền (tools/noi-dung/nhieu-mua1.ts): tên Hoài đúng năm dòng (bộ sinh nền không thêm ai tên Hoài). -->

### c-tra-ma-tung — Duy tra mã của Tùng (mẫu ở Ngày hội) {challenge: c-tra-ma-tung}

<!-- Màn mẫu: Duy gõ, người chơi chỉ xem qua [MÀN CHIẾU] (chạy sẵn, một dòng). Không lưu vật chứng, không tính vào tỉ lệ note. -->
- Tiêu đề: Bảng sinh viên: mã của Tùng
- Đề bài hiển thị: Tùng khai mã sinh viên SV240251. Mã ấy thuộc lớp nào?
- Mục tiêu học: Một điều kiện: mã sinh viên bằng đúng mã khai. Mỗi mã là một người nên ra đúng một dòng.
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_sv = 'SV240251';
```

- Truy vấn nạp sẵn:

```sql
SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_sv = 'SV240251';
```

- Nguồn điều kiện nạp sẵn: dk-ma-sv ← tu-nhap

### c-tra-ma-nguoi-choi — Người chơi tự tra mã của mình (Ngày hội) {challenge: c-tra-ma-nguoi-choi}

<!-- Query mẫu người chơi tự làm (dàn ý M2): gõ mã mình vào khối ma_sv, ra một dòng, in phiếu. Không chấm điểm, không lưu vật chứng, không tính vào tỉ lệ note. -->
- Tiêu đề: Bảng sinh viên: mã của mình
- Đề bài hiển thị: Giấy báo nhập học in mã sinh viên của bạn: SV240388. Mã ấy thuộc lớp nào?
- Mục tiêu học: Một điều kiện: gõ đúng mã của mình vào ô, bấm CHẠY. Ra một dòng là in phiếu được.
- Số dòng kỳ vọng: 1
- Gõ giá trị: có
- SQL chuẩn:

```sql
SELECT ma_sv, ho_dem, ten, ma_lop FROM sinh_vien WHERE ma_sv = 'SV240388';
```

- [LỜI c-tra-ma-nguoi-choi.1]

### c-nam-hoai — Cả trường có những ai tên Hoài? {challenge: c-nam-hoai}

<!-- Chặng 1, Q1 (dàn ý 1.1): người chơi tự tra ten = 'Hoài', Duy chỉ mở máy, không gợi ý. Ra năm dòng để người chơi tự thấy cần khoanh vùng. -->
- Tiêu đề: Bảng sinh viên: những ai tên Hoài
- Đề bài hiển thị: Phiếu gửi ký một chữ: Hoài. Cả trường có những bạn nào tên Hoài?
- Manh mối liên quan: ev-phieu-gui-hoai
- Mục tiêu học: Lọc bằng một điều kiện: tên đúng bằng Hoài. Mỗi dòng còn lại là một bạn tên Hoài.
- Số dòng kỳ vọng: 5
- SQL chuẩn:

```sql
SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài';
```

- [LỜI c-nam-hoai.1]
- Vật chứng lưu vào hồ sơ: ev-nam-hoai
  - Tiêu đề: Cả trường có năm Hoài
  - Mô tả: Bảng sinh viên, lọc tên Hoài: năm dòng, năm bạn ở năm lớp khác nhau, hai bạn cùng học Báo chí khóa 2024 ở hai lớp BC24A và BC24C. Chưa nói bạn nào đã ký phiếu.

### c-hoai-bc24a — Hoài nào học lớp BC24A? {challenge: c-hoai-bc24a}

<!-- Chặng 2, Q3 (dàn ý 2.3): quay lại bảng sinh viên với mã lớp lấy từ bảng lớp. Ra một dòng, cột nơi ở là mối nối sang cổng ký túc xá. -->
- Tiêu đề: Bảng sinh viên: Hoài, lớp BC24A
- Đề bài hiển thị: Trong năm bạn tên Hoài, bạn nào học lớp BC24A?
- Manh mối liên quan: ev-nam-hoai, ev-lop-bc24a
- Mục tiêu học: Hai điều kiện nối bằng VÀ: đúng tên, đúng lớp. Cột nơi ở cho biết bạn ấy ở đâu.
- Bấm ô lấy giấy nhớ: ma_sv
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài' AND ma_lop = 'BC24A';
```

- [LỜI c-hoai-bc24a.1]
- Vật chứng lưu vào hồ sơ: ev-hoai-bc24a
  - Tiêu đề: Lê Thu Hoài, BC24A, ở ký túc xá
  - Mô tả: Bảng sinh viên, lọc tên Hoài VÀ lớp BC24A: một dòng, Lê Thu Hoài, mã SV240317, lớp BC24A, nơi ở Ký túc xá. Mới cho biết đi tìm ai, chưa nói ai bỏ thư.
  - Giá trị cho trình dựng: SV240317
  - Chữ trên giấy: Mã sinh viên của Lê Thu Hoài: **SV240317**
