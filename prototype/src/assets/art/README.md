# Ô ảnh — thả ảnh thật vào `src/assets/` (QĐ-060, QĐ-063)

Mọi hình trong prototype đang là **hình vẽ tạm bằng code**. Mỗi hình có một **ô** mang tên cố định.
Thả một tệp **đúng tên** vào **bất kỳ thư mục nào** trong `prototype/src/assets/` (thư mục này
`art/`, hay `characters/`, `backgrounds/`… tùy bạn) là game tự dùng ảnh đó — không sửa code. Gỡ tệp
ra là game quay về hình vẽ tạm.

- Đuôi nhận: `.webp`, `.png`, `.jpg`, `.jpeg`.
- Tên không phân biệt hoa/thường, nhưng nên viết thường đúng như bảng.
- Nhận **hai kiểu tên song song**: tên theo bộ prompt của bạn (`char-minh-anh-worried`,
  `char-minh-anh-anchor`, `bg-prototype-hallway`) và tên ô kiểu cũ (`minh-anh-worried`). Không cần
  đổi tên ảnh đã sinh.
- Đang chạy `npm run dev` thì thêm/bớt tệp trang tự nạp lại; bản `npm run build` tự kèm ảnh.
- Tệp tên gần giống một ô (gõ sai 1–2 ký tự) bị bộ kiểm báo đỏ; tệp tham khảo khác (ví dụ ảnh neo
  phong cách `hoa-phuong-environment-style-anchor.png`, bản nháp `char-minh-anh-worried-2.png`) chỉ
  được liệt kê "bỏ qua" (xem "Kiểm ảnh đã được nhận" bên dưới).

## Cảnh nền — 2560×1440 (16:9)

Ảnh phủ kín sân khấu kiểu `object-fit: cover`, neo giữa: màn rộng cắt bớt trên/dưới, màn hẹp
(1024×768) cắt bớt trái/phải khoảng 8% mỗi bên. Giữ vật kể chuyện trong **70% giữa** (theo chiều
ngang) và để **35% dưới** thoáng cho nhân vật + hộp thoại (theo `prompts-background-prototype-*.md`).
Tên tệp giống hệt id trong bộ prompt cảnh nền. Ảnh cảnh nền **không** bị tách nền.

| Tên tệp (không đuôi)        | Chỗ dùng                                  |
| --------------------------- | ----------------------------------------- |
| `bg-prototype-club-room`    | Nền phòng CLB (Phần 1, 3, 5)              |
| `bg-prototype-hallway`      | Nền hành lang giảng đường B (Phần 2)      |
| `bg-prototype-hearing-room` | Nền phòng giải trình (Phần 4)             |

### Vùng màn chiếu (chỉ phòng giải trình)

Giao diện truy vấn (màn chiếu, màn chọn dòng lỗi) được chồng lên **đúng khung màn chiếu trống** trong
ảnh nền. Khung đó khai báo bằng 4 số trong `prototype/src/shared/ui/visuals/scene-geometry.ts`
(`HEARING_ROOM_SCREEN`), mỗi số là **phần của ảnh** (0–1). Khi thay ảnh thật, đo khung màn chiếu trên
ảnh 2560×1440 rồi đổi 4 số:

- `x0` = mép trái màn chiếu (px) ÷ 2560, `x1` = mép phải ÷ 2560
- `y0` = mép trên (px) ÷ 1440, `y1` = mép dưới ÷ 1440

Ví dụ màn chiếu từ (230, 144) đến (2330, 1037) → `x0: 0.09, y0: 0.1, x1: 0.91, y1: 0.72` (giá trị
của nền vẽ tạm). Game tự quy ra 4 biến `--projector-top/right/bottom/left` (của
`prototype/src/debrief/ui/debrief.css`) theo kích thước màn hình, cùng cách cắt `cover` với ảnh nền.
Màn chiếu trong ảnh nên chiếm khoảng **80% bề ngang và 60% chiều cao** ảnh (mép trên thấp hơn
khoảng 10% để chừa nhãn cảnh ở góc trên trái): nhỏ hơn thì game nới khung giao diện ra (tối thiểu
900×420 px; màn ≤ 1100 px cao tối thiểu 600 px vì SQL và bảng xếp chồng) để SQL còn đọc được, và khung
sẽ tràn ra ngoài màn chiếu vẽ trong ảnh.

## Chân dung — nửa người, khung 3:4 (1536×2048 theo bộ prompt; 1200×1600 cũng được)

Mọi chân dung **cùng chiều cao khung** và **đầu cùng một vị trí** (GDD §16.7) để đổi biểu cảm không
bị giật. Game hiển thị theo chiều cao, neo đáy khung. Thiếu một biểu cảm → game mượn ảnh biểu cảm
**đầu tiên** của nhân vật đó (chính là ảnh `-anchor`); nhân vật chưa có ảnh nào → hình vẽ tạm.

### Tên theo bộ prompt của bạn (`prompts-characters-prototype-flow-v0.1.md`, §1 Manifest)

`-anchor` = ảnh neo = biểu cảm gốc của nhân vật: **trung tính** với Minh Anh, Hà Vy, Quân, Bác Tư;
**rụt rè** (`nervous`) với Hoài.

| Id trong Manifest       | Nhân vật | Biểu cảm trong game      | Ô (tên kiểu cũ, vẫn nhận) |
| ----------------------- | -------- | ------------------------ | ------------------------- |
| `char-minh-anh-anchor`  | Minh Anh | bình thường (neutral)    | `minh-anh-neutral`        |
| `char-minh-anh-worried` | Minh Anh | lo lắng (worried)        | `minh-anh-worried`        |
| `char-minh-anh-happy`   | Minh Anh | vui (happy)              | `minh-anh-happy`          |
| `char-ha-vy-anchor`     | Hà Vy    | bình thường (neutral)    | `ha-vy-neutral`           |
| `char-ha-vy-thinking`   | Hà Vy    | đang nghĩ (thinking)     | `ha-vy-thinking`          |
| `char-ha-vy-smile`      | Hà Vy    | mỉm cười (smile)         | `ha-vy-smile`             |
| `char-quan-anchor`      | Quân     | bình thường (neutral)    | `quan-neutral`            |
| `char-quan-smug`        | Quân     | đắc ý (smug)             | `quan-smug`               |
| `char-quan-stunned`     | Quân     | sững người (stunned)     | `quan-stunned`            |
| `char-hoai-anchor`      | Hoài     | bối rối (nervous)        | `hoai-nervous`            |
| `char-hoai-downcast`    | Hoài     | cúi mặt (downcast)       | `hoai-downcast`           |
| `char-hoai-relieved`    | Hoài     | nhẹ nhõm (relieved)      | `hoai-relieved`           |
| `char-bac-tu-neutral`   | Bác Tư   | bình thường, cỡ nhỏ      | `bac-tu-neutral`          |
| `char-tung-anchor`      | Tùng     | bình thường (neutral)    | `tung-neutral`            |

`char-<nhân vật>-<biểu cảm>` cũng nhận được cho biểu cảm gốc (ví dụ `char-minh-anh-neutral`,
`char-hoai-nervous`) — dùng khi muốn thay ảnh neo bằng một ảnh riêng cho biểu cảm đó.

### Ảnh toàn thân — hồ sơ nhân vật và màn "Nhân vật mới"

Hai màn này hiện ảnh **toàn thân** (đầu tới giày) nếu có tệp `char-<nhân vật>-full`; chưa có thì
hiện chân dung ở trên (ảnh thật, hoặc hình vẽ tạm). Khung dọc 9:16, nền xám phẳng như chân dung
(game tự tách nền), đặt trong khung theo chiều cao, neo đáy. Prompt: `prompts-assets-prototype-full-v0.1.md`.

| Tên tệp (không đuôi)  | Nhân vật | Ô               |
| --------------------- | -------- | --------------- |
| `char-minh-anh-full`  | Minh Anh | `minh-anh-full` |
| `char-ha-vy-full`     | Hà Vy    | `ha-vy-full`    |
| `char-quan-full`      | Quân     | `quan-full`     |
| `char-hoai-full`      | Hoài     | `hoai-full`     |
| `char-bac-tu-full`    | Bác Tư   | `bac-tu-full`   |
| `char-tung-full`      | Tùng     | `tung-full`     |

### Ảnh giới thiệu 16:9 — màn "Nhân vật mới"

Có tệp `intro-<nhân vật>` thì màn "Nhân vật mới" phủ ảnh này kín khung 16:9 và đặt tên + lời giới
thiệu vào khoảng trống ảnh chừa sẵn (prompt mục E: nhân vật một bên, ~40% bên kia trống). Hà Vy và
Quân đứng bên phải nên chữ nằm bên trái; các nhân vật khác chữ bên phải. Chưa có tệp → khung chân dung.

| Tên tệp (không đuôi) | Nhân vật |
| -------------------- | -------- |
| `intro-minh-anh`     | Minh Anh |
| `intro-ha-vy`        | Hà Vy    |
| `intro-quan`         | Quân     |
| `intro-hoai`         | Hoài     |
| `intro-bac-tu`       | Bác Tư   |
| `intro-tung`         | Tùng     |

### Nền xám phẳng được tự tách

Ảnh sinh theo bộ prompt có nền xám phẳng một màu (#E2E6EA–#E8ECEF). Game **tự tách nền** cho chân
dung khi hiển thị (không sửa tệp của bạn): lấy màu nền ở bốn góc, xóa phần nền nối với mép ảnh,
xóa dấu logo nhỏ nằm giữa nền và các khoảng nền kẹt lớn (giữa tay và thân, giữa đuôi tóc và cổ).
Chi tiết sáng bên trong người (cổ áo trắng, mắt, điểm sáng) được giữ. Trong lúc tách (lần đầu mỗi
ảnh, khoảng 0,1–0,3 giây) game hiện hình vẽ tạm.

- Có sẵn ảnh **PNG/WebP nền trong suốt** thì cứ dùng: game thấy mép đã trong suốt thì để nguyên.
- Nền không phẳng (bốn góc khác màu nhau) → game để nguyên ảnh, không tách.
- Để tách sạch: giữ nền **một màu phẳng**, không bóng đổ/họa tiết; người **không che bốn góc ảnh**
  (game lấy màu nền ở bốn góc); tóc, vai nên chừa khoảng trống với mép trên và hai mép bên (thân
  chạm mép dưới thì được); tránh áo/da **trùng màu nền** ở chỗ chạm mép ảnh.

### Hai tệp cùng một ô

Game chọn **một** tệp theo thứ tự:

1. Kiểu tên: `char-<nhân vật>-<biểu cảm>` › `char-<nhân vật>-anchor` › tên ô kiểu cũ
   (`minh-anh-neutral`).
2. Đuôi: `.webp` › `.png` › `.jpg` › `.jpeg`.
3. Đường dẫn theo thứ tự chữ cái (ví dụ `src/assets/art/…` trước `src/assets/characters/…`).

Tệp thua được bộ kiểm liệt kê "bị che" để bạn biết.

## Tài liệu — chỉ NỀN giấy, không có chữ

Chữ tiếng Việt của tài liệu vẫn do giao diện chồng lên (đọc được bằng trình đọc màn hình, đổi được
nội dung), nên ảnh **không được nướng chữ vào**. Nền giấy nên sáng, ít hoa văn ở vùng giữa để chữ
đọc rõ; khung gợi ý 1600×1200 (4:3), ảnh phủ kín khung tài liệu, neo giữa. Ảnh tài liệu **không** bị
tách nền.

| Tên tệp (không đuôi) | Chỗ dùng                          |
| -------------------- | --------------------------------- |
| `doc-letter`         | Nền giấy lá thư nặc danh          |
| `doc-bookmark`       | Nền giấy mẩu bookmark bị xé       |
| `doc-handover-log`   | Nền giấy sổ bàn giao hộp góp ý    |

## Kiểm ảnh đã được nhận

1. Chạy `npx vitest run src/shared/ui/visuals/art-slots.test.ts --reporter=verbose` trong
   `prototype/`: bộ kiểm in bảng từng ô — **ẢNH THẬT** (kèm tệp đang dùng), **mượn** (dùng ảnh neo
   của nhân vật), **vẽ tạm** — rồi các tệp **bị che**, **bỏ qua** (không khớp ô nào) và
   **NGHI SAI** (gần giống tên một ô, ví dụ `bg-prototype-halway.png` → báo đỏ).
2. Trên trang đang chơi: mở công cụ nhà phát triển (F12), tìm phần tử có `data-art-slot` —
   `data-art-source="image"` là đang hiện ảnh thật, `"placeholder"` là hình vẽ tạm;
   `data-art-borrowed-from` cho biết chân dung đang mượn ảnh biểu cảm nào; `data-art-cutout` cho
   biết tách nền: `cut` = đã tách, `kept` = để nguyên (ảnh đã trong suốt hoặc nền không phẳng),
   `pending` = đang tách, `failed` = lỗi nên dùng ảnh gốc.
