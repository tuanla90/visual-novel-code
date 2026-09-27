# Cấu trúc Prompt & Cú pháp Google Flow

Google Flow (`labs.google/fx/tools/flow`) sử dụng kiến trúc tạo ảnh và video theo lô (batch generation) dựa trên Imagen / Veo với cơ chế neo phong cách và tham chiếu đối tượng.

---

## 1. Cú pháp Khối Prompt (Metadata Tags)

Mỗi prompt được đóng gói trong một khối mã văn bản (` ```text `) với các thẻ metadata đầu dòng:

```text
[id: <unique-identifier>]
[type: image | video]
[ref: <parent-or-anchor-id>]
```

### Chi tiết các thẻ:
* **`[id: <tên_id>]`**: Định danh duy nhất cho asset (ví dụ: `hoa-phuong-environment-style-anchor`, `bg-prototype-club-room`). Dùng để quản lý tiến trình và lưu file kết quả.
* **`[type: image]`**: Loại asset đầu ra (`image` cho ảnh tĩnh 2D, hoặc `video` cho chuyển động Veo).
* **`[ref: <id_tham_chiếu>]`**: ID của ảnh neo phong cách hoặc ảnh gốc cần sửa. Google Flow sử dụng ảnh tham chiếu này để giữ nguyên phong cách vẽ (visual consistency), chất liệu, màu sắc và mật độ nét vẽ, tránh bị "trôi phong cách" (style drift).

---

## 2. Các trường trong Schema Prompt

Mỗi prompt bao gồm các trường chuẩn hóa để điều khiển mô hình AI:

1. **Use case**: Mục đích sử dụng (`stylized-concept`, `precise-object-edit`, `lighting-weather`, `production-asset`).
2. **Asset type**: Loại tài sản chi tiết (ví dụ: `production-ready 2D visual-novel game background`).
3. **Primary request**: Câu yêu cầu cốt lõi bằng tiếng Anh.
4. **Input images**: Chỉ định cách dùng ảnh tham chiếu (`ref`).
5. **Scene/backdrop**: Miêu tả kiến trúc, không gian, đồ vật nội thất, bối cảnh.
6. **Subject**: Trọng tâm thị giác của bức ảnh.
7. **Style/medium**: Phong cách minh họa (ví dụ: `original clean school-life anime environment illustration; restrained two-level cel-shaded light; thin outlines`).
8. **Composition/framing**: Bố cục, tỉ lệ (16:9), độ phân giải (2560×1440), chiều cao camera (tầm mắt 1.6m).
9. **Lighting/mood**: Ánh sáng và bầu không khí (nắng chiều muộn, ánh sáng tự nhiên).
10. **Color palette**: Bảng màu chủ đạo.
11. **Materials/textures**: Chất liệu bề mặt (gỗ, gạch men ceramic, kính nhôm, bảng bần corkboard).
12. **Constraints**: Các ràng buộc cấm (không người, không chữ đọc được, không logo, không watermark).
13. **Avoid**: Danh sách các yếu tố tiêu cực cần loại bỏ (tránh bàn ghế trẻ em, tránh phong cách noir, tránh phòng học cấp 3...).

---

## 3. Quy trình chạy chuẩn (Chaining & Anchoring)

1. **Tạo Style Anchor trước:** Chạy prompt có `[id: ...style-anchor]` không có `[ref]`.
2. **Đánh giá ảnh Anchor:** Kiểm tra xem phong cách đã chuẩn đại học Việt Nam, đúng màu và nét vẽ mong muốn chưa.
3. **Chạy các cảnh tiếp theo có `[ref: ...style-anchor]`:** Google Flow sẽ nạp ảnh anchor làm input reference và sinh các cảnh tiếp nối theo cùng phong cách.
