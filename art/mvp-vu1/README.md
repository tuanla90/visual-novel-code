# Ảnh MVP Vụ 1 (sinh 28/09)

Nguồn: Topview, GPT Image 2.5 Flare, 1K, medium, chế độ Unlimited. Câu lệnh nguyên văn: `../prompts/mvp-vu1-hang-doi-2026-09-28.json`; kế hoạch: `../prompts/prompts-mvp-vu1-v0.1.md`.

Chưa nối vào game (runtime MVP chưa có). Game prototype hiện chỉ dùng 3 ảnh nền lấy từ bộ này (đã chép vào `prototype/src/assets/art/`):

| Ô trong game | Lấy từ |
|---|---|
| `bg-prototype-club-room` | `nen/bg-mvp-phong-clb` |
| `bg-prototype-hallway` | `nen/bg-mvp-sanh-toa-b` + ghép `vat/obj-hop-kien-nghi` lên tường trái |
| `bg-prototype-hearing-room` | `nen/bg-mvp-phong-hop` (khung màn chiếu đo lại trong `scene-geometry.ts`) |

- `nen/`: 11 nền ngày + 5 nền tối (`*-dem`), WebP.
- `vat/`: 14 vật tương tác, đã tách nền hồng tím (khóa màu + khử viền), cắt sát vật, WebP có kênh alpha. Băng dính trong suốt ở `obj-thong-bao-hop`, `obj-lich-cat-nuoc` còn ánh tím nhẹ.
- `nhan-vat/`: 6 nhân vật mới (Duy, chú Cường, cô Hạnh, cô Lan, Hiếu, Đạt), đã tách nền, giữ khung 768×1360 như các chân dung khác.
- `giay/`: 4 nền giấy tài liệu (chưa dùng: giấy có sẵn dòng kẻ giả, sẽ đè lên chữ thật của màn xem tài liệu).

Chân dung đang dùng trong game (`prototype/src/assets/characters/`) được tách nền bằng rembg `isnet-anime`; 8 ảnh biểu cảm là "chỉ thay đầu": thân và màu áo của ảnh neo, vùng mặt của ảnh biểu cảm (xem `../prompts/prompts-mvp-vu1-v0.1.md` mục 6).
