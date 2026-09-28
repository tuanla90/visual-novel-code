# Nội dung game — `prototype/noi-dung/`

Đây là **nguồn chữ** của game: lời thoại, câu hỏi, thẻ thử thách, thẻ hồ sơ. Định dạng: [`docs/dac-ta-dinh-dang-noi-dung.md`](../../docs/dac-ta-dinh-dang-noi-dung.md) (mục 2, 6.3, 9.1, 10.4) và [`quy-uoc.md`](quy-uoc.md). Tệp README này bộ đọc bỏ qua.

## Sửa xong thì kiểm

Trong thư mục `prototype/`:

```
npm run kiem-noi-dung
```

- Không lỗi: in một dòng `noi-dung: 15 tệp, không lỗi — …`.
- Có lỗi: mỗi lỗi một dòng `<tệp>:<dòng>: <lỗi>` (trong VS Code bấm Ctrl + chuột vào đường dẫn để mở đúng dòng), rồi `noi-dung: … N lỗi.`; mã thoát 1.
- Lệnh chỉ **đọc**, không ghi tệp nào. Đọc được thì chạy thử luôn bộ chuyển sang dữ liệu game, và in dòng `Nhắc: … chưa khớp nội dung` nếu file sinh chưa cập nhật.

Ví dụ: viết `{{nv.khong-co}}` vào dòng 24 của `02-dieu-tra.md` thì lệnh báo

```
noi-dung/kich-ban/chinh/02-dieu-tra.md:24: biến "{{nv.khong-co}}": không có nhân vật mã "khong-co" (có: minh-anh, ha-vy, quan, hoai, bac-tu, tung)
```

## Sinh dữ liệu game rồi commit

Từ gói 12a-2 game lấy **toàn bộ** chữ từ thư mục này, qua các tệp sinh `src/content/generated/*.gen.ts` (không còn bản chép tay). Quy trình mỗi lần sửa:

1. Sửa tệp `.md` ở đây.
2. `npm run kiem-noi-dung` — hết lỗi.
3. `npm run noi-dung:sinh` — ghi lại `src/content/generated/*.gen.ts` (có lỗi thì không ghi gì).
4. Commit **cả** tệp `.md` lẫn tệp `.gen.ts`.

Quên bước 3 thì test `npm test` (tệp `src/content/generated/generated.test.ts`, "file sinh khớp nội dung") đỏ. Tệp `.gen.ts` ghi "ĐỪNG SỬA TAY" ở đầu: sửa tay cũng làm test đỏ. `npm run dev` và `npm run build` tự chạy bước 3 trước (`predev`, `prebuild`).

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
| `- [MÀN CHIẾU <mã> · truy vấn nạp sẵn <thẻ> · chạy · 24 dòng]` | Màn chiếu chạy câu SQL ở dòng `Truy vấn nạp sẵn` của thẻ thử thách (câu SQL chỉ viết một chỗ; deb-01 dùng cách này) |
| `- [ĐẶT CỜ access-revoked]` | Hết quyền xem dữ liệu |
| `- [CHÚ THÍCH HỒ SƠ ev-… · làm mờ]` | Gắn chú thích (lấy từ dòng `- Chú thích:` của thẻ hồ sơ cùng mã) và làm mờ tên, mã |
| `- [THẺ CHỮ] **narrator**: …` | Lời hiện dạng thẻ chữ lớn |
| `- Truy vấn nạp sẵn:` + khối sql, `- Nguồn điều kiện nạp sẵn: id ← nguồn · …` | Truy vấn nằm sẵn trong trình dựng (thẻ thử thách) |
| `{{nv.<mã>}}`, `{{nv.<mã>.ho-ten}}`, `{{nv.<mã>.trong-cau}}` | Tên nhân vật: tên hiển thị ("Bác Tư"), họ tên ("Trần Tùng"), tên giữa câu ("bác Tư") |
| `{{truong.ten-day-du}}`, `{{truong.ten-ngan}}`, `{{truong.ten-khong-tien-to}}` | Tên trường: "Trường Đại học Hoa Phượng", "Hoa Phượng", "Đại học Hoa Phượng" (khi câu đã có chữ "trường" viết thường) |

**Tên riêng viết bằng biến, không viết trần** (test chặn): tên nhân vật có mã và tên trường. Ngoại lệ hiện có: tên sinh viên trong dòng kết quả truy vấn ("Lê Thị Hoài", "Phạm Minh Hiếu" ở `thu-thach/c3.md`) là dữ liệu SQL, thành biến ở đợt 14; `quy-uoc.md` là quy ước cho người viết, không kiểm.
