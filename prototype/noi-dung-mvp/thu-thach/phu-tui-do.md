<!-- Thẻ thử thách của nhiệm vụ phụ "Túi đồ trên ghế đá" (kich-ban/25-phu-tui-do.md): ÔN lọc nhiều điều kiện (= và bắt đầu bằng) rồi nối hai bảng, không dạy kỹ năng mới. c-tui-lop (lich_hoc: mã bắt đầu KTVM-0, thứ Tư, buổi sáng, phòng tòa B → KTVM-03, 05, 07) → c-tui-nguoi (nối dang_ky_hoc với sinh_vien theo ma_sv; ma_lhp là một trong ba lớp trên phiếu, ma_lop bắt đầu BC → Hiếu, Hồng, Toàn). Sai có ích: thiếu một điều kiện ở lớp → thêm lớp bẫy (KTVM-04 buổi chiều, KTVM-06 tòa C, KTVM-08 tòa A…); quên "bắt đầu bằng" mã (= 'KTVM-0') → 0 dòng; quên lọc BC → cả đám đông của ba lớp. Lời "Khi …": loi/tt-phu-tui-do.md. -->

### c-tui-lop — Lớp học phần nào có thể là lớp của chủ túi? {challenge: c-tui-lop}

- Tiêu đề: Lịch lớp học phần
- Đề bài hiển thị: Giáo trình ghi mã lớp học phần bị bong mất chữ số cuối, vé xe ghi nhà xe tòa B vào buổi sáng, hóa đơn ghi thứ Tư. Những lớp học phần nào khớp cả bốn điều?
- Manh mối liên quan: clue-tui-nhan, clue-tui-toa-b, clue-tui-sang, clue-tui-thu
- Mục tiêu học: Ôn ghép nhiều điều kiện bằng AND; chỉ biết đầu mã thì dùng "bắt đầu bằng".
- Bấm ô lấy giấy nhớ: ma_lhp
- Số dòng kỳ vọng: 3
- SQL chuẩn:

```sql
SELECT ma_lhp, mon, phong, gio_bat_dau FROM lich_hoc WHERE ma_lhp LIKE 'KTVM-0%' AND thu = 'THU_TU' AND ca = 'SANG' AND phong LIKE 'B%';
```

- [LỜI c-tui-lop.1]
- Vật chứng lưu vào hồ sơ: ev-tui-lop
  - Tiêu đề: Ba lớp Kinh tế vi mô sáng thứ Tư ở tòa B
  - Mô tả: Kết quả truy vấn: KTVM-03 (B204, 07:30), KTVM-05 (B102, 09:30), KTVM-07 (B305, 09:30). Cả ba là lớp học sáng thứ Tư, tòa B, mã bắt đầu KTVM-0.
  - Giá trị cho trình dựng: KTVM-03 · KTVM-05 · KTVM-07

### c-tui-nguoi — Trong ba lớp ấy, những ai là sinh viên Báo chí? {challenge: c-tui-nguoi}

- Tiêu đề: Danh sách đăng ký nối với bảng sinh viên
- Đề bài hiển thị: Danh sách đăng ký chỉ ghi mã lớp học phần và mã sinh viên; tên và lớp sinh hoạt nằm ở bảng sinh viên. Trong ba lớp trên phiếu, những ai thuộc lớp Báo chí?
- Manh mối liên quan: ev-tui-lop, clue-tui-khoa
- Nối được với: sinh_vien
- Mục tiêu học: Ôn nối hai bảng theo mã sinh viên; lấy nhiều lớp học phần từ phiếu ("là một trong"); lọc tiếp theo đầu mã lớp.
- Số dòng kỳ vọng: 3
- SQL chuẩn:

```sql
SELECT dang_ky_hoc.ma_lhp, sinh_vien.ma_sv, ho_dem, ten, ma_lop FROM dang_ky_hoc JOIN sinh_vien ON dang_ky_hoc.ma_sv = sinh_vien.ma_sv WHERE ma_lhp IN ('KTVM-03', 'KTVM-05', 'KTVM-07') AND ma_lop LIKE 'BC%';
```

- [LỜI c-tui-nguoi.1]
- Vật chứng lưu vào hồ sơ: ev-tui-nguoi
  - Tiêu đề: Ba sinh viên Báo chí trong ba lớp
  - Mô tả: Kết quả nối: Hiếu (BC24A) học KTVM-03 lúc 07:30; Hồng (BC24B) học KTVM-05 và Toàn (BC24B) học KTVM-07, cùng lúc 09:30. Bảng chỉ nói ai đăng ký lớp nào, chưa nói ai đánh rơi túi.
