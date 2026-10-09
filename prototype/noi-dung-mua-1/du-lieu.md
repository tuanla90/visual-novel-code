# Dữ liệu mùa 1 — Vụ 1 "Chữ ký Hoài" (bản 6, 08/10/2026) {dữ liệu: vu1}

<!-- Gói B19: bộ mùa 1 chỉ còn Vụ 1 (user 08/10: dừng sau Vụ 1), nên chỉ còn hai bảng của Vụ 1. Ở đây chỉ có CÁC DÒNG CỦA TRUYỆN; dữ liệu nền cỡ trường thật (khoảng bốn nghìn sinh viên, sổ ra vào ba tuần) do tools/noi-dung/nhieu-mua1.ts sinh với hạt cố định, máy kiểm chạy câu SQL trên bảng ĐÃ thêm nền. -->
<!-- Không dữ liệu nhiễu, không mồi nhử, không dữ liệu bẩn ở Vụ 1 (user 07/10). Bảng cũ của Vụ 2–5 và việc phụ đã gỡ, git còn giữ. -->

## sinh_vien {bảng · nhãn: Sinh viên}
- Cột: ma_sv TEXT, ho_dem TEXT, ten TEXT, ma_lop TEXT, noi_o TEXT
- Nhãn: ma_sv=Mã sinh viên, ho_dem=Họ đệm, ten=Tên, ma_lop=Mã lớp, noi_o=Nơi ở

<!-- Gói B21 (10/10/2026, dàn ý Vụ 1 bản 7 mục 1): bảng chủ nhiệm CLB được cấp chỉ còn mã, tên, mã lớp và nơi ở (Ký túc xá / Ngoại trú); ngành, khóa, tòa, buổi học sang bảng lop (Minh Anh xin thầy Quang). Cả trường năm người tên Hoài: ba Hoài Báo chí / Marketing / Kế toán / Du lịch như cũ, thêm Vũ Ngọc Hoài BC24C (Hoài thứ hai Báo chí 2024, khác lớp: ép phải dùng bảng lớp). Người chơi học Kế toán, lớp KT24A, tên hiện "Người chơi" (máy chưa thay tên người chơi vào dữ liệu). Bộ sinh nền không thêm ai tên Hoài. -->

| ma_sv | ho_dem | ten | ma_lop | noi_o |
|---|---|---|---|---|
| SV240317 | Lê Thu | Hoài | BC24A | Ký túc xá |
| SV240702 | Vũ Ngọc | Hoài | BC24C | Ngoại trú |
| SV240588 | Nguyễn Thị | Hoài | MK24B | Ký túc xá |
| SV230264 | Phạm Minh | Hoài | KT23A | Ngoại trú |
| SV220419 | Đỗ Thanh | Hoài | DL22A | Ký túc xá |
| SV240251 | Trần | Tùng | DL24A | Ký túc xá |
| SV240388 | Người | chơi | KT24A | Ký túc xá |
| SV240466 | Trần Hà | Vy | TU24A | Ký túc xá |
| SV230142 | Nguyễn Đức | Duy | HC23A | Ngoại trú |
| SV220337 | Lê Minh | Anh | LK22B | Ngoại trú |

## lop {bảng · nhãn: Lớp}
- Cột: ma_lop TEXT, nganh TEXT, khoa_hoc INTEGER, toa TEXT, buoi TEXT
- Nhãn: ma_lop=Mã lớp, nganh=Ngành, khoa_hoc=Khóa, toa=Tòa, buoi=Buổi học

<!-- Gói B21: bảng lớp do thầy Quang cấp. Các dòng của truyện ở đây; khoảng 120 lớp còn lại của trường do tools/noi-dung/nhieu-mua1.ts sinh (hạt cố định). Câu bốn điều kiện ngành = 'Báo chí' VÀ khóa = 2024 VÀ tòa = 'B' VÀ buổi = 'Sáng thứ Hai' ra đúng 1 dòng BC24A; thiếu một điều kiện ra 2 dòng (buổi: BC24A, BC24C; tòa: BC24A, BC24B; ngành: BC24A, KT24B; khóa: BC24A, BC23A). Bộ sinh nền không thêm lớp nào khớp cả tòa B lẫn sáng thứ Hai. -->

| ma_lop | nganh | khoa_hoc | toa | buoi |
|---|---|---|---|---|
| BC24A | Báo chí | 2024 | B | Sáng thứ Hai |
| BC24B | Báo chí | 2024 | C | Sáng thứ Hai |
| BC24C | Báo chí | 2024 | B | Chiều thứ Hai |
| BC23A | Báo chí | 2023 | B | Sáng thứ Hai |
| KT24B | Kế toán | 2024 | B | Sáng thứ Hai |
| KT24A | Kế toán | 2024 | A | Sáng thứ Năm |
| KT23A | Kế toán | 2023 | A | Sáng thứ Tư |
| MK24B | Marketing | 2024 | A | Sáng thứ Ba |
| DL22A | Du lịch | 2022 | C | Chiều thứ Năm |
| DL24A | Du lịch | 2024 | C | Sáng thứ Sáu |
| TU24A | Toán ứng dụng | 2024 | D | Chiều thứ Ba |
| HC23A | Hành chính học | 2023 | A | Chiều thứ Tư |
| LK22B | Luật kinh tế | 2022 | D | Sáng thứ Sáu |

## ra_vao_ktx {bảng}
- Cột: ma_sv TEXT, ngay TEXT, gio TEXT, chieu TEXT

<!-- Sổ quẹt thẻ ở cổng ký túc xá (Cảnh 8). Sáng thứ Hai 16/09/2024 Hoài quẹt thẻ ra lúc 06:44, gần lúc chú Cường giao ca; tối mới quẹt vào. Mã VÀ ngày ra hai dòng, dòng ra cổng là 06:44. Bộ sinh nền không thêm dòng nào của SV240317 ngày 16/09; các ngày khác Hoài ra cổng sớm như chú Cường kể. -->

| ma_sv | ngay | gio | chieu |
|---|---|---|---|
| SV240317 | 2024-09-16 | 06:44 | ra |
| SV240317 | 2024-09-16 | 17:52 | vào |
