# Đề xuất chờ user duyệt

Nơi các phiên ghi đề xuất đổi khung, luật hay quyết định (xem `ban-giao-huong-moi-2026-09-30.md`, mục ĐÃ CHỐT). Chưa ai áp dụng cho tới khi
user duyệt; duyệt xong thì chép quyết định vào mục ĐÃ CHỐT và ghi "đã chốt" ở đây.

## DX-01 · Mở đầu chương 1: cắt chuyến dạo trường (phiên truyện, 30/09) — chờ duyệt

**Vấn đề.** Khung `kich-ban/00-mo-dau.md` còn nguyên chuyến dạo trường của bản cũ: 7 chuỗi từ lúc vào phòng 408 tới Ngày hội
(`md-02` bản đồ → `md-03` tòa B → `md-04` căng tin → `md-05` ngoài phòng máy → `md-06` bảng tin → `md-07` chú Cường tối → `md-08` tuần
sinh hoạt công dân). Chỗ này trái ba điều đã chốt:
- "Câu lọc đầu tiên trong khoảng 5 phút" (mục 3 của tệp bàn giao, dòng "Rút phần mở đầu… Giữ").
- "Mỗi màn chỉ một điều mới", "ít thứ bấm được" (ĐÃ CHỐT C).
- Hai chuỗi dạy thứ chương 1 không còn: `md-02` dạy mở bản đồ, di chuyển (chương 1 không di chuyển tự do); `md-04` dạy khung giờ (đã bỏ).

**Đề xuất.**

| Chuỗi | Đề xuất | Vì sao |
|---|---|---|
| `md-02-ban-do` | Bỏ | Chương 1 không có bản đồ |
| `md-03-toa-b` | Giữ | Người chơi thấy cái hộp tôn trước khi thư xuất hiện; ngày 1 Tùng nhắc lại được |
| `md-04-cang-tin` | Bỏ | Dạy khung giờ, đã bỏ |
| `md-05-phong-may` | Bỏ | Phòng máy chỉ vào ở ngày 4 (tùy chọn), không cần gieo |
| `md-06-bang-tin` | Gộp vào `md-07` | Chỉ một câu "có cả CLB Thám Tử"; chú Cường nói được luôn |
| `md-07-cong-ktx-toi` | Giữ | Gieo chú Cường (chú của Tùng, ngày 5 là nhân chứng) và chuyện CLB ngày xưa |
| `md-08-tuan-cong-dan` | Giữ | Thẻ lịch của khoa mình, để ngày 1 nhận ra thẻ lịch rách |

Nối lại: `md-01-ktx → md-03-toa-b → md-07-cong-ktx-toi → md-08 → md-09-ngay-hoi`. Từ lúc xuống xe tới Ngày hội còn khoảng 3–4 phút.
Lời `loi/00-mo-dau.md` của các chuỗi bỏ đi sẽ do phiên truyện xóa sau khi khung đổi.

**Ai làm.** Phiên logic sửa khung (`[ĐI TỚI]`, xóa chuỗi); phiên truyện viết lại lời cho `md-03`, `md-07`.

## DX-02 · Cảnh buổi tối dùng nền tối (phiên truyện, 30/09) — chờ duyệt

`md-07-cong-ktx-toi` là cảnh buổi tối nhưng hiện nền ban ngày: engine chỉ lấy ảnh `-dem` cho "Cuối ngày", mà chương 1 đã bỏ "Cuối ngày".
Ảnh `bg-mvp-cong-ktx-dem` đã có. Đề xuất: thêm cảnh `cong-ktx-toi — Cổng KTX` vào `canh.md` với `- Ảnh nền: bg-mvp-cong-ktx-dem`, khung
`md-07` đổi `{cảnh: cong-ktx-toi}`. Cùng cách dùng được cho cảnh "tối Hà Vy tóm tắt" ở ngày 5 nếu diễn ra ở phòng CLB buổi tối (chưa có
ảnh tối phòng CLB; cần thì phiên truyện sinh `bg-mvp-phong-clb-dem`).

## DX-03 · Hộp kiến nghị ở mở đầu chưa có thẻ lịch (phiên truyện, 30/09) — chờ duyệt, phụ thuộc DX-01

Nếu giữ `md-03-toa-b`: nền `bg-mvp-sanh-toa-b` không vẽ hộp (hộp là vật riêng `obj-hop-kien-nghi`), mà vật đó có sẵn thẻ lịch rách mắc ở khe —
Chủ nhật tuần 1 thì thư chưa có. Đề xuất: phiên truyện làm thêm `obj-hop-kien-nghi-trong` (sửa ảnh cũ, bỏ thẻ lịch); phiên logic cho chuỗi
`md-03` hiện vật đó trên nền (một `[KHÁM PHÁ]` một chỗ bấm, hoặc cách hiện vật tĩnh nếu engine có).
