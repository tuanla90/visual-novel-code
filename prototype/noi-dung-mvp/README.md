# Kịch bản MVP — `prototype/noi-dung-mvp/`

Đây là nguồn chữ của **bản MVP** (mở đầu tuần 1 + Vụ 1 "Chữ ký H", theo `docs/mvp/kich-ban-vu1-mvp-khung.md`). Cú pháp đầy đủ: [`docs/dac-ta-dinh-dang-noi-dung.md`](../../docs/dac-ta-dinh-dang-noi-dung.md) mục 18. Bộ nội dung prototype (`../noi-dung/`) là bộ khác, game hiện tại vẫn chạy từ bộ đó; bộ này **chưa có runtime** chơi được (gói kiến trúc MVP sau).

## Sửa xong thì kiểm

Trong thư mục `prototype/`:

```
npm run kiem-noi-dung:mvp
```

- Không lỗi: một dòng `noi-dung-mvp: 20 tệp, không lỗi — 15 nhân vật, … 2 bảng dữ liệu; 5 câu SQL khai số dòng, chạy thật khớp 5.`
- Có lỗi: mỗi lỗi một dòng `<tệp>:<dòng>: <lỗi>` (trong VS Code bấm Ctrl + chuột vào đường dẫn để mở đúng dòng).
- Lệnh chỉ đọc, không ghi gì. Sạch rồi thì `npm run noi-dung:sinh:mvp` ghi `src/content/generated/mvp/kich-ban.gen.ts`; commit **cả** `.md` lẫn `.gen.ts` (quên là test `mvp.gen.test.ts` đỏ). `npm run kiem-noi-dung` và `npm run noi-dung:sinh` (không đuôi `:mvp`) chạy cả hai bộ.

Ví dụ lỗi thật bộ kiểm bắt được:

```
noi-dung-mvp/lich.md:21: ngày 2: dữ kiện chính "dk-loc-lop" tốn 3 khung (qua dk-loc-lop → dk-co-hanh-cap-quyen) — luật "Dữ kiện chính tối đa: 2 khung"
noi-dung-mvp/kich-ban/01-ngay-1.md:13: nhân vật quan nói ở chuỗi tới được từ ngày 1 sáng nhưng "Xuất hiện từ: ngày 3"
noi-dung-mvp/kich-ban/06-hop-va-ket.md:29: [ĐIỀU KIỆN]: không có mã "ev-khong-ton-tai" (chưa khai ở ho-so/ hay thẻ thử thách)
noi-dung-mvp/kich-ban/06-hop-va-ket.md:8: [MÀN CHIẾU hop-chieu-or]: khai 13 dòng nhưng chạy thật trên noi-dung-mvp/du-lieu.md ra 14 dòng — SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop = 'BC24A';
```

## Tệp nào chứa gì (đọc theo thứ tự này)

| Tệp | Chứa gì | Viết thế nào |
|---|---|---|
| `quy-uoc.md` | Tên game (`# …`), `- Tên trường:`, `- Tên cấm:` | Tên cấm lọt vào chữ hiển thị là lỗi |
| `nhan-vat.md` | Thẻ nhân vật `### <mã> — <Tên>` với `Vai`, `Biểu cảm`, `Họ tên`, `Xuất hiện từ`, `Chỉ qua lời kể` | Đây là nguồn cho `{{nv.<mã>}}`. Mã không đổi khi đổi tên (bảo vệ tòa B là `bac-tu` dù tên là Bác Thịnh) |
| `canh.md` | Cảnh nền `### <mã> — <Tên>` (+ `- Ảnh nền:` nếu có ảnh) | Mọi `{cảnh: …}` phải có ở đây |
| `dia-diem.md` | `## <mã> — <Tên> {địa điểm: <mã>}` rồi các dữ kiện `### <mã> — <mô tả> {dữ kiện: chính\|phụ\|nhiễu}` | Mỗi dữ kiện có `Chuỗi:` (hội thoại) **hoặc** `Thử thách:` (màn phòng máy); `Mở từ:`, `Cần:`, `Mở manh mối:`, `Hiện tài liệu:`, `Lưu bằng chứng:`; `Ảnh:` đặt vật bấm được lên nền (xem dưới) |
| `lich.md` | `## Luật` (khung giờ, số khung tối đa cho dữ kiện chính, số dữ kiện **phụ/nhiễu** mỗi địa điểm — dữ kiện chính không tính, uy tín), `## Mở đầu`, `## Ngày N … {ngày: N}` (một `Dữ kiện chính`, một `Buổi tối`), `## … {ngày họp}`, `## Kết` | Lịch là chỗ máy kiểm "mỗi ngày một dữ kiện chính, giải được trong ≤ 2 khung" |
| `du-lieu.md` | Bộ dữ liệu SQL **cố định** của vụ: `## <bảng> {bảng}` + `- Cột: <tên> TEXT\|INTEGER, …` + bảng Markdown; `## <tên> {bảng ảo}` + khối ` ```sql ` một câu SELECT | Máy nạp vào SQLite và **chạy thật** mọi câu SQL có khai số dòng; lệch là lỗi (QĐ-089). Sửa dữ liệu thì chạy lại lệnh kiểm |
| `kich-ban/*.md` | Chuỗi hội thoại `### <mã> — <mô tả> {cảnh: <mã cảnh>}` | Lời thoại và chỉ dẫn như bộ prototype; thêm `[TẠO NHÂN VẬT]`, `[LỌC THỬ]`, `[RẼ KẾT]`, `[LƯU BẰNG CHỨNG]`, `[ĐIỀU KIỆN]`, `[HẬU QUẢ]`, `[RẼ NHÁNH]`, `[TRA SỔ]`, `[CHÉP SỔ]`, `· trừ uy tín` |
| `thu-thach/*.md` | Thẻ thử thách phòng máy (khuôn cũ `### <mã> — … {challenge: <mã>}`) + `- Số dòng kỳ vọng:` | Bằng chứng (key item) của phòng máy khai ở `Vật chứng lưu vào hồ sơ` của thẻ |
| `so-tay/*.md` | Trang sổ chị Linh `# <mã> — <Tên> {trang sổ: <mã>}` với `- Loại:` và các mục `## Trang chị Linh`, `## Hà Vy`, `## Chọn đoạn code`, `## Vào sổ cá nhân` | `[CHÉP SỔ]` cần trang có "Chọn đoạn code" |
| `chung/loi-chung.md` | `### Khi mất uy tín {lời chung: mat-uy-tin}`: lời Minh Anh từng lần mất vạch, dòng cuối `[HẾT VẠCH]` | Không nói đáp án |
| `ho-so/*.md` | `clue-…` giấy nhớ, `doc-…` tài liệu, `ev-…` bằng chứng thực địa | Thẻ không ai tạo (không dữ kiện / hậu quả nào mở) là lỗi |

## Vài luật máy kiểm thay bạn

- Mỗi địa điểm 1–3 dữ kiện **phụ/nhiễu** (dữ kiện chính không tính; QĐ-089).
- Mỗi ngày **đúng một** dữ kiện chính; chi phí khung (kể cả dữ kiện nó `Cần` cùng ngày và tiền "vào" phòng máy) ≤ số ở `## Luật`.
- Buổi tối phải `[ĐI TỚI]` chuỗi của dữ kiện chính (hoặc mở `[THỬ THÁCH]` của nó).
- Nhân vật không được nói trước `Xuất hiện từ` (Quân: ngày 3; thầy Quang, Hoài: ngày họp).
- Kết thật mở đầu bằng `[ĐIỀU KIỆN]`; điều kiện phải đạt được và phải **cần dữ kiện phụ** (chỉ dữ kiện chính mà đủ là lỗi).
- `trừ uy tín` chỉ ở chuỗi của ngày họp; có `Uy tín` thì phải có "Khi mất uy tín".
- `[TẠO NHÂN VẬT ten]` rồi `[TẠO NHÂN VẬT nganh]`, mỗi cái đúng một lần, ở mở đầu. `{{nv.nguoi-choi}}` dùng được (runtime thay bằng tên người chơi).
- Chuỗi không được lịch, dữ kiện hay `[ĐI TỚI]` nào nối tới là lỗi ("chuỗi lẻ").
- Số dòng khai ở `[LỌC THỬ … · n dòng]`, `[MÀN CHIẾU … · n dòng]` (có câu SQL) và `- Số dòng kỳ vọng:` của thẻ thử thách phải bằng số dòng câu SQL chạy thật trên `du-lieu.md`. Số dòng chỉ ghi trong `[DÀN DỰNG]` (không kèm câu SQL) máy **chưa** kiểm được.

Nhãn `chính` / `phụ` / `nhiễu` và dòng `Phân biệt:` chỉ để người viết đọc, không hiện trong game.

## Đặt vật bấm được lên nền — dòng `- Ảnh:`

`- Ảnh: obj-hop-kien-nghi · x 28% · y 50% · rộng 8%` (vật, ảnh ở `src/assets/mvp/vat/`) hoặc
`- Ảnh: nv:hieu · x 20% · y 100% · rộng 15%` (người, dùng chân dung). **(x, y) là chân ảnh** (giữa cạnh dưới), % của ảnh
nền; `rộng` là % bề rộng nền. Hai dữ kiện chung một vật ghi y hệt nhau (game gộp thành một điểm). Thiếu dòng này chỉ bị
cảnh báo — dữ kiện vẫn chọn được qua nút "Danh sách" trong nơi đó. Mô tả dữ kiện không bao giờ hiện cho người chơi.
Chi tiết: đặc tả §18.4a.
