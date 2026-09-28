# Nội dung game — `prototype/noi-dung/`

Đây là **nguồn chữ** của game: lời thoại, câu hỏi, thẻ thử thách, thẻ hồ sơ. Định dạng: [`docs/dac-ta-dinh-dang-noi-dung.md`](../../docs/dac-ta-dinh-dang-noi-dung.md) (mục 2, 6.3, 9.1, 10.4) và [`quy-uoc.md`](quy-uoc.md). Tệp README này bộ đọc bỏ qua.

## Sửa xong thì kiểm

Trong thư mục `prototype/`:

```
npm run kiem-noi-dung
```

- Không lỗi: in một dòng `noi-dung: 15 tệp, không lỗi — …`.
- Có lỗi: mỗi lỗi một dòng `<tệp>:<dòng>: <lỗi>` (trong VS Code bấm Ctrl + chuột vào đường dẫn để mở đúng dòng), rồi `noi-dung: … N lỗi.`; mã thoát 1.
- Lệnh chỉ **đọc**, không ghi tệp nào.

Ví dụ: viết `{{nv.khong-co}}` vào dòng 24 của `02-dieu-tra.md` thì lệnh báo

```
noi-dung/kich-ban/chinh/02-dieu-tra.md:24: biến "{{nv.khong-co}}": không có nhân vật mã "khong-co" (có: minh-anh, ha-vy, quan, hoai, bac-tu, tung)
```

Ở gói 12a-1 game **chưa đọc** thư mục này lúc chạy (vẫn dùng bản chép tay trong `src/content/real/`). Vì thế sửa chữ ở đây phải sửa cả bản chép tay; test `npm test` (tệp `src/content/real/faithfulness.test.ts`) so hai bên từng ký tự và báo `lệch đầu tiên ở <tệp>:<dòng>`. Gói 12a-2 sinh dữ liệu game từ thư mục này và bỏ bản chép tay.

## Tệp nào chứa gì

| Tệp | Nội dung |
|---|---|
| `quy-uoc.md` | Tên game (`# …`), quy ước đọc file, quy ước thẻ thử thách |
| `kich-ban/chinh/01-mo-dau.md` … `05-ket.md` | Năm phần của mạch chính; mỗi tệp mở đầu bằng `## Phần N — <Tên> {part: <mã>}` |
| `thu-thach/c1.md`, `c2.md`, `c3.md`, `debrief-fix.md` | Thẻ thử thách (SQL chuẩn, truy vấn nạp sẵn, lời Hà Vy, câu hỏi đọc kết quả, vật chứng) |
| `chung/loi-chung.md` | Ba câu gợi ý chuẩn; nhận xét chung cho mọi thử thách |
| `ho-so/00-chung.md` … `03-chu-thich-ket-qua.md` | Thẻ manh mối, tài liệu, chú thích gắn vào thẻ kết quả sau giải trình |

Thứ tự đọc: `quy-uoc.md` → `kich-ban/chinh/` → `thu-thach/` → `chung/` → `ho-so/`, trong mỗi thư mục theo tên tệp. Tệp `.md` đặt chỗ khác là lỗi.

## Nhắc nhanh cú pháp mới (gói 12a-1)

| Viết | Nghĩa |
|---|---|
| `- [MÀN CHIẾU <mã> · chạy · 24 dòng]` + khối ` ```sql ` ngay dưới | Màn chiếu chạy câu SQL trong khối |
| `- [MÀN CHIẾU <mã> · vật chứng ev-… · chạy · 2 dòng]` | Màn chiếu chạy câu SQL của vật chứng người chơi đã lưu |
| `- [ĐẶT CỜ access-revoked]` | Hết quyền xem dữ liệu |
| `- [CHÚ THÍCH HỒ SƠ ev-… · làm mờ]` | Gắn chú thích (lấy từ dòng `- Chú thích:` của thẻ hồ sơ cùng mã) và làm mờ tên, mã |
| `- [THẺ CHỮ] **narrator**: …` | Lời hiện dạng thẻ chữ lớn |
| `- Truy vấn nạp sẵn:` + khối sql, `- Nguồn điều kiện nạp sẵn: id ← nguồn · …` | Truy vấn nằm sẵn trong trình dựng (thẻ thử thách) |
| `{{nv.<mã>}}`, `{{nv.<mã>.<dạng>}}`, `{{truong.ten-day-du}}`, `{{truong.ten-ngan}}` | Tên nhân vật / tên trường (chưa dùng trong nội dung; 12a-2 thay bằng script) |
