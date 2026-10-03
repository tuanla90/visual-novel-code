# Ảnh Topview 03/10/2026 (đợt 2) — Trung thu, hai cô cán bộ, túi đồ rơi

Tạo qua MCP Topview (GPT Image 2, image_edit, 1K, medium; 0,2 credit/ảnh), board 83f0a899380f4d7da8a4e2d2d86cfff5.

- `bg-mvp-san-ktx-trung-thu.png`: sửa từ `bg-mvp-cong-ktx-dem` (giữ nét, dãy nhà KTX). Sân trong KTX đêm Trung thu, không người:
  dây đèn lồng, bàn gấp có đĩa bánh nướng hụt một chiếc, vệt vụn bánh tới đèn cá chép nằm lệch, đôi dép trẻ con, sân khấu
  nhỏ có đầu lân + trống, gian "CLB Robotics" bán đèn ông sao LED, balo đen ghim huy hiệu bánh răng trên ghế nhựa, bảng tin.
  Toạ độ điểm khám phá ở `kich-ban/00-mo-dau.md` (`kp-banh-trung-thu`).
- Cô Hạnh (sắp nghỉ hưu, tóc muối tiêu búi thấp, kính, áo dài đỏ mận) và cô Lan (trẻ, sơ mi trắng xắn tay, quần âu xanh than):
  hai bước — sửa chân dung cũ thành người mới (ra toàn thân, nhỏ), rồi lấy ảnh cũ làm Image1 (khung, cỡ) + ảnh mới làm Image2
  (diện mạo). Bản cười, há miệng, nhắm mắt sửa từ chân dung; ảnh giới thiệu và chibi lấy ảnh cũ làm khung. Nguồn magenta ở
  `art/nguon/topview-2026-10-01/g2/g2-char-co-{hanh,lan}*.png`, `g2-intro-…`, `g2-chibi-…`; khoá nền bằng công thức
  min(r,b)−g (như `topview-2026-10-02/xu-ly.py`) có khử viền hồng. Nhép môi chạy lại `nhep-khit-2026-10-02/cat-bo-moi.py` →
  `loc-net-le.py --tep=mvp --ghi` → `ghi-toa-do.py`; cô Hạnh cười mắt đã híp nên không chớp (miếng mắt 1×1).
- `bg-mvp-ghe-da-tui-do.png`: sửa từ `bg-mvp-cong-truong`. Ghế đá dưới gốc cây, chiều muộn, túi vải rơi, đồ bày ra: giáo trình
  "Kinh tế vi mô" có nhãn lớp học phần, vé gửi xe, hóa đơn photo, đơn trong bìa nhựa có dấu đỏ, ví nâu đóng, điện thoại úp,
  hộp bút, chai nước. Dùng cho nhiệm vụ phụ `tui-do`.
