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
- `ban-do/ban-do-truong.webp`: bản đồ trường cho bản MVP (Topview 29/09, GPT Image 2.5, 1K, Unlimited). Sinh hai lượt: lượt đầu kiểu "khuôn viên trưng bày" bị user chê chưa giống thật; lượt hai theo trường công lập nội thành Hà Nội (sát phố, cổng + chòi bảo vệ, dãy giảng đường vàng kem hành lang mở, nhà để xe, KTX có cổng trong, căng tin mái tôn), user chọn phương án D. Ghim đặt trong `prototype/src/mvp/ui/ban-do-mvp.ts`.
- `nen/bg-mvp-cong-truong.webp`: cổng trường + trạm xe buýt cho đoạn mở đầu người chơi xuống xe (Topview 29/09, cùng khối phong cách BG của `mvp-vu1-hang-doi-2026-09-28.json`, 1K, Unlimited). Sinh lại lần 2 cho KHỚP bản đồ D (user thấy lệch): cổng chỉ hai trụ kem + thanh chắn, chòi nhỏ mái chóp xám xanh bên phải cổng, nhà hành chính mái ngói đỏ + bồn hoa tròn bên trái, tòa cầu thang kính xanh bên phải.
- Chân dung nhân vật chính: `prototype/src/assets/mvp/nhan-vat/char-nguoi-choi.png` — tách nền bằng rembg `isnet-anime` từ `char-player-nam-anchor.png` (người chơi nam, QĐ-084).

## Đợt 30/09 (tối): ảnh giới thiệu, biểu cảm, chibi, ảnh còn thiếu

Topview GPT Image 2.5 Flare, 1K, medium, Unlimited. Câu lệnh: `../prompts/sinh-hang-doi-2026-09-30.py` (→ `mvp-vu1-hang-doi-2026-09-30.json`); ảnh gốc `../nguon/topview-2026-09-30/`; xử lý (tách nền hồng tím, WebP, đặt tên ô): `../nguon/xu-ly-anh-2026-09-30.py`. Bảng tệp và chỗ dùng: `docs/thiet-ke/ban-giao-anh-loi-2026-09-30.md`.

- Ảnh giới thiệu 16:9 cho mọi nhân vật chưa có (tham chiếu: chân dung + `intro-tung`/`intro-quan` làm mẫu phong cách + nền MVP của nơi đó) → `prototype/src/assets/art/intro-*.webp`.
- Biểu cảm "chỉ đổi mặt" sửa từ ảnh neo, nền hồng tím → `prototype/src/assets/mvp/nhan-vat/char-<mã>-<biểu cảm>.png`.
- Chibi (sticker 2,5 đầu, viền nâu) → `prototype/src/assets/mvp/chibi/`. Lượt đầu Tùng ra tóc nâu → sinh lại, ghi rõ tóc đen.
- Chữ ký H (`giay/doc-chu-ky-h.png`): sinh 3 bản, chọn bản đọc ra chữ H ngay, không đọc được chữ nào khác.
