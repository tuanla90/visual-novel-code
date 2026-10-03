# Ảnh Topview 03/10/2026 — phòng CLB có người ngồi

Tạo qua MCP Topview (GPT Image 2, image_edit, 1K, medium; mỗi ảnh 0,2 credit), lưu board 83f0a899380f4d7da8a4e2d2d86cfff5.

- `bg-mvp-phong-clb-ngoi-duy-ha-vy-minh-anh-tung.png`: Image1 = nền `bg-mvp-phong-clb`, Image2 = bốn chân dung trong game
  (char-minh-anh-serious, char-duy, char-ha-vy-day-kinh, char-tung-happy) ghép một hàng. Lời nhắc: giữ nguyên phòng, góc máy,
  ánh sáng; Duy ngồi bàn máy tính bên trái, Hà Vy ghi sổ ở mép trái bàn dài, Minh Anh ở đầu bàn cạnh cửa sổ, Tùng ngồi ngược ghế
  bên phải; mọi người tách nhau để bấm được; một ghế trống quay ra người xem cho người chơi.
- `…-duy-ha-vy-minh-anh.png`, `…-duy.png`: sửa từ ảnh trên, chỉ xóa người (giữ ghế trống) — vị trí người còn lại không đổi nên
  vùng bấm `CHO_NGOI` trong `src/mvp/ui/KhamPhaMvp.tsx` dùng chung.
