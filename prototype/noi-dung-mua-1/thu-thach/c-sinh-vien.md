<!-- Thẻ thử thách Vụ 1 bản 6 (gói B19, 08/10/2026), Cảnh 6, Phòng Đào tạo, laptop CLB của Duy: màn tra 1 hai bước trên bảng sinh viên (phiếu cô Hạnh chỉ cho xem tên, ngành, khóa, lớp và mã). Bước 1: tên = 'Hoài' ra 4 dòng ở 4 ngành (không lưu phiếu). Bước 2: thêm VÀ ngành = 'Báo chí' VÀ khóa = 2024 ra 1 dòng, Lê Thu Hoài, SV240317, BC24A; bấm ô mã lấy giấy nhớ cho sổ ra vào (Cảnh 8). Câu hay gặp ở bước 2 (đếm thật trên dữ liệu đã thêm nền): tên VÀ khóa 2024 ra 2 dòng (Hoài Báo chí, Hoài Marketing); ngành VÀ khóa (quên tên) ra 69; tên HOẶC ngành ra 276; ba điều kiện nối HOẶC ra 1218; tên VÀ ngành (không khóa) ra đúng 1 dòng nên máy chấm đúng. Dùng được ở cả ba mức SQL (B17): ghép khối, ghép khối chữ SQL, tự viết (máy so tập kết quả). Lời "Khi …" và gợi ý: loi/tt-c-sinh-vien.md. -->

### c-sv-hoai — Cả trường có những ai tên Hoài? {challenge: c-sv-hoai}

- Tiêu đề: Bảng sinh viên: những ai tên Hoài
- Đề bài hiển thị: Phiếu gửi ký một chữ: Hoài. Cả trường có những bạn nào tên Hoài?
- Manh mối liên quan: ev-phieu-gui-hoai
- Mục tiêu học: Lọc bằng một điều kiện: tên đúng bằng Hoài. Mỗi dòng còn lại là một bạn tên Hoài.
- Số dòng kỳ vọng: 5
- SQL chuẩn:

```sql
SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài';
```

- [LỜI c-sv-hoai.1]

### c-sv-hoai-bc24 — Hoài nào học Báo chí, khóa 2024? {challenge: c-sv-hoai-bc24}

- Tiêu đề: Bảng sinh viên: Hoài, Báo chí, khóa 2024
- Đề bài hiển thị: Hoài nào học Báo chí, khóa 2024?
- Manh mối liên quan: ev-phieu-gui-hoai, ev-the-lich-bc24
- Mục tiêu học: Ba điều kiện nối bằng VÀ: dòng nào khớp cả ba mới được giữ.
- Bấm ô lấy giấy nhớ: ma_sv
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT ma_sv, ho_dem, ten, ma_lop, noi_o FROM sinh_vien WHERE ten = 'Hoài' AND ma_lop = 'BC24A';
```

- [LỜI c-sv-hoai-bc24.1]
- Vật chứng lưu vào hồ sơ: ev-mot-hoai
  - Tiêu đề: Chỉ một người: Lê Thu Hoài, lớp BC24A
  - Mô tả: Bảng sinh viên, lọc tên Hoài VÀ ngành Báo chí VÀ khóa 2024: một dòng, Lê Thu Hoài, mã SV240317, lớp BC24A. Tên, khoa, khóa khớp; mới cho biết đi tìm ai, chưa nói ai bỏ thư.
  - Giá trị cho trình dựng: SV240317
  - Chữ trên giấy: Mã sinh viên của Lê Thu Hoài: **SV240317**
