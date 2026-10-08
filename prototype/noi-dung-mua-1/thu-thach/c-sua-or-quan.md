<!-- Thẻ thử thách Vụ 1 bản 6 (gói B19, 08/10/2026), Cảnh 10, buổi họp rà soát: câu 1/4 tính vạch. Màn chiếu nạp sẵn câu của Quân (tên = 'Hoài' HOẶC ngành = 'Báo chí'), chạy thật trên dữ liệu đã thêm nền ra 276 dòng (bản 6 ghi số tạm 41). Đổi HOẶC thành VÀ còn một dòng (Lê Thu Hoài). Thêm cả khóa 2024 cũng một dòng, máy chấm theo tập kết quả nên vẫn đúng. Khi có B19-MÁY: "Chạy thử" bao nhiêu lần cũng được, "Trình" sai thì +1 vạch và hiện lời "Khi trình sai" (loi/tt-c-sua-or-quan.md). -->

### c-sua-or-quan — Câu tra của Ban Kiểm tra trên màn chiếu {challenge: c-sua-or-quan}

- Tiêu đề: Câu tra trên màn chiếu
- Đề bài hiển thị: CLB ra một dòng. Câu của anh Quân ra hai trăm bảy mươi sáu dòng. Vì sao hai bên khác số?
- Manh mối liên quan: ev-mot-hoai
- Mục tiêu học: HOẶC giữ dòng khớp một trong hai điều kiện, nên ra nhiều; VÀ chỉ giữ dòng khớp cả hai.
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT ma_sv, ho_dem, ten, nganh, khoa_hoc, ma_lop FROM sinh_vien WHERE ten = 'Hoài' AND nganh = 'Báo chí';
```

- Truy vấn nạp sẵn:

```sql
SELECT ma_sv, ho_dem, ten, nganh, khoa_hoc, ma_lop FROM sinh_vien WHERE ten = 'Hoài' OR nganh = 'Báo chí';
```

- Nguồn điều kiện nạp sẵn: dk-ten ← tu-nhap · dk-nganh ← tu-nhap
- [LỜI c-sua-or-quan.1]
