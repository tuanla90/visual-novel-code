# Bộ ảnh màn phòng máy (màn core), tách lớp — ngày + đêm (v0.1, 29/09/2026)

User chọn **hướng A** (anime ấm, phòng máy chiều muộn) trong `prompts-man-core-display-v0.1.md` làm gốc. Không vẽ hộp thoại,
không vẽ chữ: hộp thoại và chữ do game vẽ sau. Mỗi phần là **một ảnh riêng** để ghép, đổi kích thước (thử tỉ lệ màn hình),
và bấm được (sổ, hồ sơ).

- Công cụ: Topview, **sửa ảnh (Image Edit)** với `Image1` = ảnh hướng A (`docs/mockups/shots/topview-v6-A-anime.png`, đã có
  trên board) — chỉ dùng làm **tham chiếu phong cách**. GPT Image 2.5, 1K, Medium, chế độ Unlimited (free).
- Vật (prop) theo quy ước mục 3 của `prompts-mvp-vu1-v0.1.md`: nền **magenta #FF00FF** phẳng, không bóng, không quầng → tách
  nền bằng rembg / lọc màu, viền trắng khi rê chuột vẽ theo đường bao.
- **Ban đêm:** sửa từ chính ảnh ban ngày ("same composition"), để các lớp ghép khớp tọa độ. Vật nhỏ dùng chung, game phủ màu.

## Lớp và câu lệnh

Khối phong cách chung (đặt đầu mọi câu):

> Use Image1 only as the art-style reference (clean 2D anime visual-novel illustration, soft cel shading, thin lines, warm
> slightly desaturated palette, Vietnamese university computer lab). Create a NEW image, do not copy Image1's composition.
> No text, no letters, no numbers, no logos, no UI, no dialogue box, no people, no watermark.

| id | Tỉ lệ | Nền | Câu lệnh riêng |
|---|---|---|---|
| `bg-phong-may-core-ngay` | 16:9 | cảnh đầy đủ | Background only: the back of a computer lab seen from a seated student's eye level. Warm late-afternoon light through tall windows on the right, rows of older beige desktop computers and chairs softly blurred in the mid-ground, a blank notice board and blank posters on the back wall. The lower third and the center are calm and uncluttered (a desk, a monitor and objects will be layered on top later). |
| `desk-phong-may-ngay` | 16:9 | magenta phía trên | Only the front wooden desk top seen from a seated student's eye level, spanning the full width, occupying the lower 40 percent of the frame, warm light oak with soft grain and a slightly worn front edge, completely empty surface. Everything above the desk is flat solid magenta #FF00FF. |
| `obj-man-hinh` | 1:1 | magenta | A single desktop computer monitor seen **straight-on from the front** (no perspective tilt), slim dark grey bezel, small stand, the screen is one **flat uniform dark teal rectangle** with no content, no reflections. |
| `obj-ban-phim` | 16:9 | magenta | A single dark grey computer keyboard seen from the front at a slight top-down angle, keys blank with no letters. |
| `obj-so-chi-linh` | 1:1 | magenta | A single closed notebook with a worn brown leather cover and a red ribbon bookmark, lying flat on its back at a slight angle, blank cover. |
| `obj-ho-so-vu` | 1:1 | magenta | A single manila case folder with a tab, closed, a few blank paper edges peeking out, lying flat at a slight angle, blank. |
| `obj-giay-nho` | 16:9 | magenta | Five separate blank square sticky notes spaced well apart in a row (yellow, light blue, pink, light green, cream), each with a short strip of translucent washi tape on top and a slight paper curl, completely blank. |
| `obj-den-ban` | 1:1 | magenta | A single green-shaded banker's desk lamp, brass base, lamp switched on but no glow drawn outside the shade. (dùng cho ban đêm) |
| `bg-phong-may-core-dem` | 16:9 | — | Sửa từ `bg-…-ngay` (Image1 = ảnh ngày): Same exact composition and camera as Image1, but at night: the lab lights are off, cool blue moonlight and city lights through the windows, faint glow from a few distant monitors, light rain streaks on the glass. Keep it readable, not pitch black. |
| `desk-phong-may-dem` | 16:9 | magenta phía trên | Sửa từ `desk-…-ngay`: Same exact desk, same framing, at night: lit by a warm lamp from the left and a cool screen glow from the center-back; everything above the desk stays flat solid magenta #FF00FF. |

Khung magenta: không bóng đổ, không quầng sáng, không có màu hồng/tím trên vật.

## Kết quả đợt 29/09

Ảnh gốc ở `art/nguon/phong-may-core/raw/<mã Topview>.png`; `python tach-nen.py` tách nền magenta, cắt sát, tách 5 giấy nhớ, ghi tọa độ
mặt kính màn hình vào `man-hinh-mat-kinh.json`. Trang thử ghép lớp (kéo vật, đổi cỡ màn hình, ngày/đêm): `docs/mockups/ghep-lop-phong-may.html`.

| Tệp | Mã Topview | Ghi chú |
|---|---|---|
| `bg-phong-may-core-ngay.png` | 316ded21 | 1360×768, đạt |
| `bg-phong-may-core-dem.png` | 4b90cdc7 | sửa từ ảnh ngày, cùng bố cục, mưa + trăng, đạt |
| `desk-phong-may-ngay.png` | add56027 | đạt, mép trên bàn ở ~58% chiều cao |
| `desk-phong-may-dem.png` | (đang sinh) | tạm thời game làm tối ảnh ngày |
| `obj-man-hinh.png` | b68da490 | nhìn thẳng, mặt kính phẳng 846×535 trong ảnh 902×710 |
| `obj-ban-phim.png` | bb079c23 | đạt |
| `obj-so-chi-linh.png` | 121ba39a | đạt |
| `obj-ho-so-vu.png` | 0db840f0 | đạt |
| `obj-giay-nho-1..5.png` | 859b9f3b | vàng, xanh lam, hồng, xanh lá, kem; không chữ |
| `obj-den-ban.png` | 3e92c2cf | đèn bàn kính xanh (cho cảnh đêm) |

## Kiểm khi nhận

- Không chữ, không người, không hộp thoại. Màn hình nhìn thẳng, mặt kính phẳng một màu (để lồng giao diện HTML).
- Nền còn trống ở giữa và phần dưới. Bàn trống. Vật đủ trong khung, không bị cắt.
- Ảnh đêm giữ đúng bố cục ảnh ngày (chồng lên nhau khớp).

## Phương án chốt (29/09, chiều): ảnh cảnh đầy đủ thay cho ghép lớp

Ghép từng vật sinh riêng thì lệch góc nhìn và ánh sáng (user: "trông ko khớp nhau"). Làm lại:

1. **Ảnh cảnh đầy đủ** (Image1 = hướng A chỉ để lấy phong cách, khung hình theo ảnh mẫu tỉ lệ của user): màn hình to ~70% khung,
   **không bàn phím**, mặt kính phẳng một màu. Sửa tiếp: bỏ giấy nhớ khỏi viền; đẩy sổ, hồ sơ vào khung; thêm **nhãn giấy trắng** trên bìa.
   → `raw/nen-sach-1-c9eac7a5.png` (ngày), `raw/dem-a74f1cd3.png` (đêm, sửa từ ảnh ngày, cùng bố cục).
2. **Giấy nhớ** là ảnh riêng, sinh theo đúng giấy nhớ trong cảnh: 10 tờ (5 màu × 2 kiểu băng keo) → `raw/giay-nho-b5e10811.png`.
   Chữ trên giấy nhớ do game viết. Viền màn hình có ~8 chỗ; quá 8 thì xếp chồng lệch, có số "+n"; giấy nhớ bài cũ cất vào sổ.
3. **Chữ trên nhãn sổ / hồ sơ** do game vẽ (font viết tay, biến đổi phối cảnh theo 4 góc nhãn) — tên và số bằng chứng đổi được.
4. **Rê chuột vào sổ / hồ sơ**: không cần ảnh tách. Game cắt **chính ảnh nền** theo đa giác 4–8 góc của vật, làm sáng lên và vẽ
   viền phát sáng → khớp tuyệt đối. (Đã thử cho Topview "giữ vật, còn lại magenta" — nó vẽ lại vật, lệch hình, bỏ cách này.)
5. `python tach-lop-canh.py` → `canh/`: `phong-may-ngay.png`, `phong-may-dem.png`, `giay-nho-01..10.png`, `lop.json` (tọa độ mặt kính:
   x 204, y 81, w 932, h 478 trên khung 1360×768). Đa giác sổ/hồ sơ và 4 góc nhãn ghi trong `docs/mockups/core-game-v7-canh.html`.

### Sửa theo góp ý tính thực tế (29/09, tối)

- **Màn hình phải có đế.** Sửa `nen-sach-1` (Image1) thêm cổ + đế màn hình đặt trên bàn, giữ nguyên phần còn lại →
  `raw/de-1-bcbdf13b.png` (chọn; `de-2-e6cdb4a4` là phương án phụ). Đêm sửa từ chính ảnh đó → `raw/dem-31e66430.png`
  (ảnh đêm cũ không đế cất ở `raw/cu/`). Mặt kính đo lại: x 198, y 78, w 946, h 483 (khung 1360×768).
- **Giấy nhớ xoay dọc**, dải băng keo nằm ở cạnh sát màn hình và đè lên viền (bên trái xoay 90°, bên phải −90°) → trông như
  dán vào viền màn hình, không lơ lửng. Giấy nhớ đã thả vào ô trên màn hình thì về lại thẳng đứng.
- **Phóng to cảnh:** `tach-lop-canh.py` cắt vòng ngoài ảnh gốc (hộp 48,14 → 1276,705 trên khung 1360×768, vẫn 16:9, mép trái/phải
  giữ vừa đủ nhãn trắng của sổ và hồ sơ) rồi đưa về khung game 1600×900. Màn hình từ ~70% lên ~77% chiều ngang. Mặt kính (khung 1600×900):
  x 196, y 84, w 1232, h 628.

Bản chơi thử: `docs/mockups/core-game-v7-canh.html` (nút 🌙 đổi ngày/đêm). Các lớp rời của đợt sáng (`bg-…`, `desk-…`, `obj-…`,
`ghep-lop-phong-may.html`) giữ lại làm lịch sử, không dùng nữa.
