# Dữ liệu bộ thử B21 {dữ liệu: vu1}

<!-- Bảng nhỏ của bộ thử B21, theo dàn ý Vụ 1 bản 7 mục 1: sinh_vien (mã, họ đệm, tên, lớp, nơi ở), lop (ngành, khóa, tòa, buổi), ra_vao_ktx. Chữ trên khối ở màn tra là tiếng Việt (nhãn); câu SQL giữ tên ASCII. Câu `ten = 'Hoài'` ra 5 dòng; `ten = 'Hoài' AND ma_lop = 'BC24A'` ra 1; câu 4 điều kiện trên lop ra 1 dòng BC24A. -->

## sinh_vien {bảng · nhãn: Sinh viên}
- Cột: ma_sv TEXT, ho_dem TEXT, ten TEXT, ma_lop TEXT, noi_o TEXT
- Nhãn: ma_sv=Mã sinh viên, ho_dem=Họ đệm, ten=Tên, ma_lop=Mã lớp, noi_o=Nơi ở

| ma_sv | ho_dem | ten | ma_lop | noi_o |
|---|---|---|---|---|
| SV240317 | Lê Thu | Hoài | BC24A | Ký túc xá |
| SV240702 | Vũ Ngọc | Hoài | BC24C | Ngoại trú |
| SV240588 | Nguyễn Thị | Hoài | MK24B | Ký túc xá |
| SV230264 | Phạm Minh | Hoài | KT23A | Ngoại trú |
| SV220419 | Đỗ Thanh | Hoài | DL22A | Ký túc xá |
| SV240251 | Trần | Tùng | DL24A | Ký túc xá |
| SV240388 | Người chơi | Người chơi | KT24A | Ký túc xá |

## lop {bảng · nhãn: Lớp}
- Cột: ma_lop TEXT, nganh TEXT, khoa_hoc INTEGER, toa TEXT, buoi TEXT
- Nhãn: ma_lop=Mã lớp, nganh=Ngành, khoa_hoc=Khóa, toa=Tòa, buoi=Buổi học

| ma_lop | nganh | khoa_hoc | toa | buoi |
|---|---|---|---|---|
| BC24A | Báo chí | 2024 | B | Sáng thứ Hai |
| BC24B | Báo chí | 2024 | C | Sáng thứ Hai |
| BC24C | Báo chí | 2024 | B | Chiều thứ Hai |
| MK24B | Marketing | 2024 | A | Sáng thứ Ba |
| KT23A | Kế toán | 2023 | A | Sáng thứ Tư |
| DL22A | Du lịch | 2022 | C | Chiều thứ Năm |
| DL24A | Du lịch | 2024 | C | Sáng thứ Sáu |
| KT24A | Kế toán | 2024 | A | Sáng thứ Năm |

## ra_vao_ktx {bảng · nhãn: Sổ ra vào}
- Cột: ma_sv TEXT, ngay TEXT, gio TEXT, chieu TEXT
- Nhãn: ma_sv=Mã sinh viên, ngay=Ngày, gio=Giờ, chieu=Chiều

| ma_sv | ngay | gio | chieu |
|---|---|---|---|
| SV240317 | 2024-09-16 | 06:44 | ra |
| SV240317 | 2024-09-16 | 17:52 | vào |
