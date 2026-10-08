# Dữ liệu mùa 1 — Vụ 1 "Chữ ký Hoài" (bản 6, 08/10/2026) {dữ liệu: vu1}

<!-- Gói B19: bộ mùa 1 chỉ còn Vụ 1 (user 08/10: dừng sau Vụ 1), nên chỉ còn hai bảng của Vụ 1. Ở đây chỉ có CÁC DÒNG CỦA TRUYỆN; dữ liệu nền cỡ trường thật (khoảng bốn nghìn sinh viên, sổ ra vào ba tuần) do tools/noi-dung/nhieu-mua1.ts sinh với hạt cố định, máy kiểm chạy câu SQL trên bảng ĐÃ thêm nền. -->
<!-- Không dữ liệu nhiễu, không mồi nhử, không dữ liệu bẩn ở Vụ 1 (user 07/10). Bảng cũ của Vụ 2–5 và việc phụ đã gỡ, git còn giữ. -->

## sinh_vien {bảng}
- Cột: ma_sv TEXT, ho_dem TEXT, ten TEXT, nganh TEXT, khoa_hoc INTEGER, ma_lop TEXT

<!-- Phiếu cô Hạnh cấp (Cảnh 6): CLB chỉ được xem tên, ngành, khóa và lớp, kèm mã. Cả trường đúng bốn người tên Hoài, ở bốn ngành khác nhau (bộ sinh nền không thêm ai tên Hoài); hai Hoài khóa 2024 (Báo chí, Marketing) nên lọc tên với khóa mà quên ngành ra hai dòng. Bốn người của CLB có trong bảng như mọi sinh viên khác. -->

| ma_sv | ho_dem | ten | nganh | khoa_hoc | ma_lop |
|---|---|---|---|---|---|
| SV240317 | Lê Thu | Hoài | Báo chí | 2024 | BC24A |
| SV240588 | Nguyễn Thị | Hoài | Marketing | 2024 | MK24B |
| SV230264 | Phạm Minh | Hoài | Kế toán | 2023 | KT23A |
| SV220419 | Đỗ Thanh | Hoài | Du lịch | 2022 | DL22A |
| SV240251 | Trần | Tùng | Du lịch | 2024 | DL24A |
| SV240466 | Trần Hà | Vy | Toán ứng dụng | 2024 | TU24A |
| SV230142 | Nguyễn Đức | Duy | Hành chính học | 2023 | HC23A |
| SV220337 | Lê Minh | Anh | Luật kinh tế | 2022 | LK22B |

## ra_vao_ktx {bảng}
- Cột: ma_sv TEXT, ngay TEXT, gio TEXT, chieu TEXT

<!-- Sổ quẹt thẻ ở cổng ký túc xá (Cảnh 8). Sáng thứ Hai 16/09/2024 Hoài quẹt thẻ ra lúc 06:44, gần lúc chú Cường giao ca; tối mới quẹt vào. Mã VÀ ngày ra hai dòng, dòng ra cổng là 06:44. Bộ sinh nền không thêm dòng nào của SV240317 ngày 16/09; các ngày khác Hoài ra cổng sớm như chú Cường kể. -->

| ma_sv | ngay | gio | chieu |
|---|---|---|---|
| SV240317 | 2024-09-16 | 06:44 | ra |
| SV240317 | 2024-09-16 | 17:52 | vào |
