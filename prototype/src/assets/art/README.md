# Ô ảnh — thả ảnh thật vào đây (QĐ-060)

Mọi hình trong prototype đang là **hình vẽ tạm bằng code**. Mỗi hình có một **ô** mang tên cố định.
Thả một tệp **đúng tên** vào thư mục này (`prototype/src/assets/art/`) là game tự dùng ảnh đó —
không sửa code. Gỡ tệp ra là game quay về hình vẽ tạm.

- Đuôi nhận: `.webp`, `.png`, `.jpg`, `.jpeg` (cùng tên có nhiều đuôi thì ưu tiên theo thứ tự đó).
- Tên không phân biệt hoa/thường, nhưng nên viết thường đúng như bảng.
- Đang chạy `npm run dev` thì thêm/bớt tệp trang tự nạp lại; bản `npm run build` tự kèm ảnh.
- Tệp đặt sai tên sẽ bị bộ kiểm báo (xem "Kiểm ảnh đã được nhận" bên dưới).

## Cảnh nền — 2560×1440 (16:9)

Ảnh phủ kín sân khấu kiểu `object-fit: cover`, neo giữa: màn rộng cắt bớt trên/dưới, màn hẹp
(1024×768) cắt bớt trái/phải khoảng 8% mỗi bên. Giữ vật kể chuyện trong **70% giữa** (theo chiều
ngang) và để **35% dưới** thoáng cho nhân vật + hộp thoại (theo `prompts-background-prototype-v0.1.md`).

| Tên tệp (không đuôi)        | Chỗ dùng                                  |
| --------------------------- | ----------------------------------------- |
| `bg-prototype-club-room`    | Nền phòng CLB (Phần 1, 3, 5)              |
| `bg-prototype-hallway`      | Nền hành lang giảng đường B (Phần 2)      |
| `bg-prototype-hearing-room` | Nền phòng giải trình (Phần 4)             |

### Vùng màn chiếu (chỉ phòng giải trình)

Giao diện truy vấn được chồng lên sân khấu tại "vùng màn chiếu" = 4 biến
`--projector-top/right/bottom/left` (mặc định trong `prototype/src/debrief/ui/debrief.css`).

## Chân dung — PNG nền trong, nửa người, khung 1200×1600

Mọi chân dung **cùng chiều cao khung** và **đầu cùng một vị trí** (GDD §16.7) để đổi biểu cảm không
bị giật. Game hiển thị theo chiều cao, neo đáy khung. Thiếu một biểu cảm → game mượn ảnh biểu cảm
**đầu tiên** (cột thứ nhất) của nhân vật đó; nhân vật chưa có ảnh nào → hình vẽ tạm.

| Nhân vật | Tên tệp (theo thứ tự biểu cảm)                                   |
| -------- | ---------------------------------------------------------------- |
| Minh Anh | `minh-anh-neutral` · `minh-anh-worried` · `minh-anh-happy`       |
| Hà Vy    | `ha-vy-neutral` · `ha-vy-thinking` · `ha-vy-smile`               |
| Quân     | `quan-neutral` · `quan-smug` · `quan-stunned`                    |
| Hoài     | `hoai-nervous` · `hoai-downcast` · `hoai-relieved`               |
| Bác Tư   | `bac-tu-neutral` (hiển thị cỡ nhỏ)                               |

Nghĩa biểu cảm: neutral = bình thường · worried = lo lắng · happy = vui · thinking = đang nghĩ ·
smile = mỉm cười · smug = đắc ý · stunned = sững người · nervous = bối rối · downcast = cúi mặt ·
relieved = nhẹ nhõm.

## Tài liệu — chỉ NỀN giấy, không có chữ

Chữ tiếng Việt của tài liệu vẫn do giao diện chồng lên (đọc được bằng trình đọc màn hình, đổi được
nội dung), nên ảnh **không được nướng chữ vào**. Nền giấy nên sáng, ít hoa văn ở vùng giữa để chữ
đọc rõ; khung gợi ý 1600×1200 (4:3), ảnh phủ kín khung tài liệu, neo giữa.

| Tên tệp (không đuôi) | Chỗ dùng                          |
| -------------------- | --------------------------------- |
| `doc-letter`         | Nền giấy lá thư nặc danh          |
| `doc-bookmark`       | Nền giấy mẩu bookmark bị xé       |
| `doc-handover-log`   | Nền giấy sổ bàn giao hộp góp ý    |

## Kiểm ảnh đã được nhận

1. Chạy `npx vitest run src/shared/ui/visuals` trong `prototype/`: bộ kiểm in bảng từng ô đang
   dùng **ảnh thật** hay **hình vẽ tạm**, và báo đỏ nếu thư mục có tệp không khớp ô nào (sai tên).
2. Trên trang đang chơi: mở công cụ nhà phát triển (F12), tìm phần tử có `data-art-slot` —
   `data-art-source="image"` là đang dùng ảnh thật, `"placeholder"` là hình vẽ tạm;
   `data-art-borrowed-from` cho biết chân dung đang mượn ảnh biểu cảm nào.
