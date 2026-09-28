# Kế hoạch ảnh MVP Vụ 1 — nền, vật tương tác, khung giờ (v0.1)

28/09 · Đã chốt ở QĐ-089 (ngày/đêm, 1–3 dữ kiện phụ/nhiễu mỗi nơi, vật tương tác có ảnh riêng). Nguồn nội dung: `prototype/noi-dung-mvp/` (dia-diem.md, canh.md, lich.md), `docs/mvp/kich-ban-vu1-mvp-khung.md` §11.
Phong cách nền giữ nguyên `prompts-background-prototype-flow-v0.2.md`; phong cách nhân vật giữ `prompts-characters-topview-v0.2.md`
(trừ hai chỗ sửa ở mục 4). Công cụ: Topview (GPT Image 2.5, 1K medium), nền và vật đều sinh bằng **sửa ảnh (image edit)** có
ảnh tham chiếu để đồng bộ nét vẽ.

## 1. Khung giờ: không sinh ba ảnh cho mỗi nơi

| Khung | Ảnh nền | Cách thể hiện |
|---|---|---|
| Sáng · Trưa · Chiều | **Một ảnh ban ngày** mỗi nơi | Game phủ lớp màu bằng CSS (sáng: trong, hơi lạnh; trưa: trung tính; chiều: ấm cam, tối hơn ~8%) + đồng hồ trên thanh HUD. Người có mặt theo khung (bác Thịnh sáng, Hiếu trưa…) nói lên giờ rõ hơn ánh sáng. |
| Buổi tối | **Ảnh tối riêng**, chỉ cho nơi có cảnh tối | Sửa từ chính ảnh ban ngày ("cùng bố cục, trời tối, đèn trong phòng bật") → bố cục giữ nguyên nên tọa độ vật tương tác dùng chung. |

Nơi có cảnh tối theo kịch bản mẫu: sảnh tòa B (toi-1), phòng máy (toi-2, toi-4), phòng CTSV (toi-3, toi-5), cổng KTX
(mở đầu md-07), phòng KTX (mở đầu). Khung kịch bản §11 ghi cổng KTX "dùng chung ngày và tối" — nếu giữ đúng vậy thì bớt một ảnh.

Tổng: **11 ảnh ngày + 4–5 ảnh tối ≈ 16 ảnh**, thay vì 33+ nếu làm ba khung.

## 2. Ảnh nền: để TRỐNG chỗ đặt vật tương tác

Vật người chơi bấm được (dữ kiện chính / phụ / nhiễu) là **ảnh riêng đặt chồng lên nền**. Nền phải để trống đúng chỗ đó
(mặt bàn trống, bảng tin trống, tường trống cạnh hộp…), không thì vật bị vẽ hai lần.

Khối dùng chung cho mọi nền (ghép sau khối "Shared art direction" của bản flow v0.2):

```text
Asset type: production-ready 2D visual-novel game background
Composition/framing: 16:9 landscape, 2560x1440-ready, eye-level camera at 1.65 meters, three-quarter view, clean center and lower foreground for two or three character sprites and a dialogue box
Interactive-object placeholders: leave the surfaces listed under "Empty spots" clearly empty and uncluttered so separate object sprites can be placed there later
Constraints: no people or silhouettes; no readable text; blank paper shapes only; no logos; no UI; no watermark; adult Vietnamese university scale
Avoid: secondary-school classroom, Japanese school interiors, photorealism, fisheye distortion, excessive clutter, deep black shadows
```

| id | Nơi | Chỗ trống cho vật (Empty spots) | Ánh sáng ngày | Ảnh tối |
|---|---|---|---|---|
| `bg-mvp-phong-ktx` | Phòng KTX 408, hai giường tầng, bàn học | — (chỉ cảnh mở đầu) | nắng sáng từ cửa sổ trái | có |
| `bg-mvp-cong-ktx` | Cổng KTX, chốt bảo vệ, bảng thông báo | bảng thông báo cạnh cổng; cửa sổ chốt bảo vệ | nắng sáng sớm | có (hoặc dùng chung) |
| `bg-mvp-sanh-toa-b` | Sảnh tòa B, hộp tiếp nhận kiến nghị, chân cầu thang | tường cạnh hộp; bậc cầu thang dưới cùng; **không vẽ hộp** | sáng mát, trong | có |
| `bg-mvp-cang-tin` | Căng tin sinh viên | hai bàn ăn ở trung cảnh | trưa sáng, quạt trần | — |
| `bg-mvp-ngoai-phong-may` | Hành lang ngoài phòng máy | — | trung tính | — |
| `bg-mvp-nha-van-hoa` | Nhà văn hóa: bảng tin + gian hàng Ngày hội | các bàn gian hàng trống | nắng sáng, cờ dây | — |
| `bg-mvp-phong-clb` | Phòng CLB (**khác phòng máy**) | kệ sách tầng giữa; mặt tủ hồ sơ; góc bàn trái | chiều ấm | — |
| `bg-mvp-phong-may` | Trong phòng máy: dãy máy, máy in chung | một bàn máy tính ở trung cảnh (tắt màn hình); **không vẽ máy in** | đèn trần trắng + cửa chớp | có |
| `bg-mvp-phong-ctsv` | Phòng CTSV: quầy tiếp nhận, khay hồ sơ | mặt quầy; khay hồ sơ; bảng ghim | sáng hành chính | có |
| `bg-mvp-phong-dao-tao` | Phòng Đào tạo: bàn cô Hạnh, bảng thông báo | bảng thông báo | sáng hành chính | — |
| `bg-mvp-phong-hop` | Phòng họp rà soát (ngày họp) | — | lạnh trung tính | — |

`bg-prototype-club-room` hiện có **thiếu máy tính** (Duy giữ máy của CLB) → làm lại thành `bg-mvp-phong-clb`, thêm một
máy bàn cũ nhưng sạch ở góc, **không** biến phòng CLB thành phòng máy.

## 3. Vật tương tác: ảnh riêng, viền trắng khi rê chuột

**Vì sao cần nền hồng tím thuần:** viền trắng khi rê chuột được game vẽ theo **đường bao trong suốt** của ảnh vật (CSS
`drop-shadow` chồng nhiều lớp). Đường bao phải sạch; bóng đổ, quầng sáng hay nền pha màu đều bị viền theo thành vệt bẩn.

Khối dùng chung cho mọi vật:

```text
Use case: production-asset
Asset type: single isolated 2D visual-novel prop sprite for a point-and-click hotspot
Style/medium: exactly match the attached background reference: clean 2D visual-novel illustration, restrained cel shading, thin or nearly invisible outlines, slightly desaturated
Camera: same eye-level 1.65 m three-quarter perspective and same light direction as the attached background, so the prop sits naturally on it
Background: one perfectly flat solid magenta (#FF00FF) background filling the whole canvas, no gradient, no texture, no vignette
Framing: 1:1 square, the single prop centered and filling about 70 percent of the frame, fully inside the canvas, nothing cropped
Constraints: no cast shadow, no contact shadow, no glow, no rim light, no outline stroke around the prop, no magenta or pink anywhere on the prop; no readable text (blank or abstract marks only); no logos; no people; no watermark
```

Mỗi vật ghi thêm `Primary request` và `Reference: <id ảnh nền>`. Danh sách theo `dia-diem.md` (mỗi nơi 1–3 dữ kiện phụ/nhiễu):

| id sprite | Dữ kiện | Nơi | Primary request (tóm tắt) |
|---|---|---|---|
| `obj-so-chi-linh` | dk-so-chi-linh (phụ) | phong-clb | cuốn sổ bìa cứng cũ màu xanh rêu, gáy sờn, kẹp vài giấy nhớ |
| `obj-bao-cao-nam-ngoai` | dk-bao-cao-yeu (phụ) | phong-clb | kẹp hồ sơ nhựa trong, vài trang A4 đóng ghim |
| `obj-bien-ban-kiem-ke` | dk-bien-ban-kiem-ke (nhiễu) | phong-clb | bìa kẹp (clipboard) kẹp tờ kẻ bảng |
| `obj-hop-kien-nghi` | dk-bac-thinh-the-lich (chính) | toa-b | hộp tiếp nhận kiến nghị kim loại gắn tường, có khe; **mép thẻ lịch rách thò ra ở khe** |
| `obj-to-roi-guitar` | dk-to-roi-guitar (nhiễu) | toa-b | tờ rơi A5 hơi nhàu nằm trên sàn, hình cây đàn cách điệu |
| `obj-thong-bao-hop` | dk-thong-bao-hop (phụ) | toa-b | tờ A4 dán băng dính bốn góc trên tường |
| `obj-thong-bao-doi-phong` | dk-doi-phong-hoc (nhiễu) | phong-dao-tao | tờ thông báo ghim trên bảng |
| `obj-ban-may` | dk-loc-lop, dk-ten-h (chính) | phong-may | bàn máy tính đơn: màn hình đang sáng giao diện truy vấn trừu tượng, bàn phím, chuột |
| `obj-may-in-nhat-ky` | dk-nhat-ky-in (phụ), dk-dong-in-bai-tap (nhiễu) | phong-may | máy in văn phòng cỡ vừa kèm tập giấy nhật ký in đặt trên nóc |
| `obj-so-niem-phong` | dk-quy-che-so-niem-phong, dk-nop-hai-ma (chính) | phong-ctsv | sổ bìa cứng có dải niêm phong và con dấu đỏ trừu tượng, đặt trên quầy |
| `obj-don-robotics` | dk-don-robotics (phụ) | phong-ctsv | tờ đơn trong khay hồ sơ, góc có hình bánh răng nhỏ |
| `obj-don-guitar` | dk-don-guitar (nhiễu) | phong-ctsv | tờ đơn ghim trên bảng |
| `obj-lich-cat-nuoc` | dk-lich-cat-nuoc (nhiễu) | cong-ktx | tờ lịch dán trên bảng thông báo cổng |

Hai chỗ một vật gánh hai dữ kiện (bàn máy, máy in, sổ niêm phong): mở theo ngày / theo lần xem, không cần hai ảnh.

**Người là điểm tương tác** (bác Thịnh, cô Hạnh, chú Cường, Hiếu, Đạt; nhóm sinh viên ở căng tin cho dk-robotics-on):
dùng ảnh nhân vật đứng trong cảnh, viền trắng khi rê chuột theo cùng cách. Nhóm sinh viên căng tin: một sprite
`obj-ban-an-sinh-vien` (bàn có khay cơm, ba người nhìn từ sau lưng, không lộ mặt).

## 4. Nhân vật: sửa hai chỗ trong câu lệnh cũ

Bộ `prompts-characters-topview-v0.2.md` có `clean rim-light separating character from background` và nền `#E2E6EA`.
Viền sáng + nền xám nhạt là nguồn của **viền trắng giữa các lọn tóc**. Nhân vật mới (Duy, Hiếu, Đạt, chú Cường, cô Hạnh,
cô Lan) và biểu cảm mới dùng:

```text
Lighting: soft even studio front-light, no rim light, no backlight glow, no halo around hair
Background: one perfectly flat solid magenta (#FF00FF) background, no gradient; no magenta or pink on the character
```

Biểu cảm mới chỉ cần **sinh phần mặt** rồi ghép vào ảnh gốc (cách "chỉ thay đầu" đã thử 28/09): thân, tóc, màu áo luôn
giống ảnh gốc.

## 5. Việc code đi kèm (chưa làm)

- Bộ tách nền nhận nền hồng tím (hiện chỉ nhận nền xám phẳng).
- Cú pháp vị trí sprite trong `dia-diem.md` (ví dụ `- Ảnh: obj-hop-kien-nghi · x 62% · y 48% · rộng 9%`) + viền trắng khi
  rê chuột — thuộc gói kiến trúc/runtime MVP.
- Lớp màu theo khung giờ (CSS) — cùng gói runtime.

## 6. Tách nền: dùng rembg `isnet-anime` chạy trên máy

Thử 28/09 trên 6 ảnh gốc (Minh Anh, Hà Vy, Quân, Hoài, Tùng, bác Tư/Thịnh): hết vệt sáng bao quanh tóc mà thuật toán
trong game để lại; không ăn mất phần người nào (phần bị bỏ so với bản của game chỉ là viền mảnh quanh tóc, khối lớn nhất
~280 điểm ảnh). Mỗi ảnh ~2–3 giây trên CPU. Ảnh đã trong suốt thì game tự bỏ qua bước tách của nó (bg-cutout bước 1).

Cài đặt đã chạy được trên máy này (ghi lại vì có hai bẫy):
- Đường dẫn thư viện phải **ngắn** (Windows giới hạn 260 ký tự): đặt ở `D:/Users/tuanla2/.cache/rbg`.
- `onnxruntime` 1.30 **sập khi nạp** (access violation, nghi thư viện Visual C++ trên máy cũ) → dùng `onnxruntime==1.20.1`
  ở `D:/Users/tuanla2/.cache/ort120`, đặt trước trong `PYTHONPATH`.
- Mô hình `isnet-anime.onnx` (176MB) ở `D:/Users/tuanla2/.rembg/models/`.

## 7. Kế hoạch sản xuất

Làm theo đợt, mỗi đợt xong thì user duyệt bằng bảng so sánh trước khi thả vào game. Sinh qua Topview MCP (GPT Image 2.5,
1K medium), gửi song song trong một đợt.

| Đợt | Việc | Số ảnh | Ghi chú |
|---|---|---|---|
| 0 | Nối Topview MCP vào phiên làm ảnh | — | Phiên 28/09 không có công cụ Topview; user bật connector (hoặc làm qua web, chậm hơn) |
| 1 | Sửa chân dung đang dùng: rembg 6 ảnh gốc; 8 ảnh biểu cảm "chỉ thay đầu" dùng viền của ảnh gốc; sinh lại mặt Hà Vy "đang nghĩ" (bớt trợn); thu nhỏ `char-minh-anh-anchor` về 768×1368 (tọa độ bộ nhép môi phải chia đôi) | 1 ảnh sinh + 14 xử lý | Không tốn lượt sinh trừ mặt Hà Vy |
| 2 | Nền ngày MVP: `bg-mvp-phong-clb` trước (sửa từ nền prototype, thêm máy bàn, làm ảnh neo phong cách), rồi 10 nền còn lại lấy nó làm tham chiếu | 11 | Thứ tự theo truyện: KTX → cổng KTX → nhà văn hóa → sảnh tòa B → Đào tạo → phòng máy → ngoài phòng máy → CTSV → căng tin → phòng họp |
| 3 | Nền tối: sửa từ ảnh ngày, giữ bố cục | 4–5 | sảnh tòa B, phòng máy, CTSV, phòng KTX, (cổng KTX) |
| 4 | Vật tương tác: sửa ảnh với nền của nơi đó làm tham chiếu, nền hồng tím, rồi rembg | 14 | 13 vật ở mục 3 + `obj-ban-an-sinh-vien` |
| 5 | Nhân vật mới (nền hồng tím, không viền sáng): Duy, Hiếu, Đạt, chú Cường, cô Hạnh, cô Lan; biểu cảm Tùng (2–3, chỉ sinh mặt) | 6 + 2–3 | Bác Thịnh dùng lại ảnh `bac-tu` |
| 6 | Nền giấy tài liệu cho màn xem tài liệu: lá thư nặc danh, sổ niêm phong, nhật ký in, … | theo `ho-so/02-tai-lieu.md` | Chữ do game vẽ, ảnh chỉ là giấy trống |

Tổng lượt sinh ước tính: **~40–45 ảnh** (chưa tính ảnh làm lại). Kiểm mỗi ảnh trước khi nhận: đúng góc máy 1,65 m; không chữ
đọc được; chỗ trống cho vật còn trống (nền); đường bao trong suốt sạch, không bóng (vật, nhân vật); cỡ vật hợp tỉ lệ khi đặt
lên nền.
