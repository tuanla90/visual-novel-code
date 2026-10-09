<!-- Thẻ thử thách Vụ 1 bản 7 (gói B22, 10/10/2026), buổi họp rà soát, lượt 2: Khánh nhờ người tra thử "theo đúng hai thứ các bạn nói" và chiếu câu HOẶC (tên Hoài HOẶC lớp BC24A). Khánh cố tình chiếu câu sai để CLB lúng túng, nhưng không ai nói ra ý đồ; người chơi tự ngộ về sau. Màn chiếu nạp sẵn câu HOẶC, chạy thật trên dữ liệu đã thêm nền (tools/noi-dung/nhieu-mua1.ts); đổi HOẶC thành VÀ còn một dòng (Lê Thu Hoài). Máy chấm theo tập kết quả. "Chạy thử" bao nhiêu lần cũng được; "Trình" sai thì +1 vạch và hiện lời "Khi trình sai" (loi/tt-c-sua-or-khanh.md). -->

### c-sua-or-khanh — Câu tra của Hội trên màn chiếu {challenge: c-sua-or-khanh}

- Tiêu đề: Câu tra trên màn chiếu
- Đề bài hiển thị: CLB ra một dòng. Câu chiếu trên màn ra cả chục dòng. Vì sao hai bên khác số?
- Manh mối liên quan: ev-hoai-bc24a
- Mục tiêu học: HOẶC giữ dòng khớp một trong hai điều kiện, nên ra nhiều; VÀ chỉ giữ dòng khớp cả hai.
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài' AND ma_lop = 'BC24A';
```

- Truy vấn nạp sẵn:

```sql
SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài' OR ma_lop = 'BC24A';
```

- Nguồn điều kiện nạp sẵn: dk-ten ← tu-nhap · dk-lop ← tu-nhap
- [LỜI c-sua-or-khanh.1]
