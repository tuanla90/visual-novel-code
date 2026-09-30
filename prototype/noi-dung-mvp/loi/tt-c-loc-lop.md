# Lời · thu-thach/c-loc-lop.md

<!-- Phiên truyện sở hữu tệp này. Mỗi đoạn "## mã" gắn vào dòng "- [LỜI mã]" của khung thu-thach/c-loc-lop.md. -->

## c-loc-khoa.1
- Khi chạy ra 0 dòng: **ha-vy** (thinking): 0 dòng. Cột khóa đang lưu con số 2024, không có chữ K nào cả.
- [DÀN DỰNG] Lần chạy "sai có ích": kéo [K24] vào cột khóa → `khoa_hoc = 'K24'` → 0 dòng. Hà Vy mô tả: cột khóa lưu số 2024. Người chơi ✎ gõ 2024.

## c-loc-toa.1
- Khi lỗi không có cột: **ha-vy** (thinking): Máy đang đi tìm một cột tên là B. Chữ không có nháy thì nó tưởng là tên cột.
- [DÀN DỰNG] Lần chạy "sai có ích": gõ như số `toa_nha = B` → lỗi "no such column: B". Hà Vy mô tả: máy đang đi tìm một cột tên B.

## c-loc-and.1
- Khi chạy ra 5 dòng: **tung** (worried): Ơ, năm lớp? <br> **ha-vy** (neutral): Lớp nào ở tòa B, hoặc học Báo chí, đều được lấy hết.
- [DÀN DỰNG] Tùng nối bằng OR → 5 lớp. Hà Vy mô tả: lấy lớp nào thỏa một trong hai. Đổi AND → 2 lớp (BC24A, BC23A).

## c-loc-lop.1
- Khi chạy ra 2 dòng: **ha-vy** (thinking): Vẫn hai lớp. Một lớp khóa khác cũng ở tòa B.
- [DÀN DỰNG] Dừng ở 2 lớp: Hà Vy mô tả có một lớp khóa khác cũng ở tòa B. Thêm `khoa_hoc = 2024` → BC24A → "Số liệu đây!" lần đầu.
