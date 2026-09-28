# Nguồn ảnh — prompt và ảnh gốc

Thư mục này giữ **nguồn** của ảnh: prompt đã dùng để sinh ảnh và ảnh gốc chưa xử lý. Game không nạp gì từ đây.
Ảnh đã xử lý để game dùng nằm trong `prototype/src/assets/` — tên tệp, kích thước và vùng an toàn xem
`prototype/src/assets/art/README.md`.

## `prompts/` — các bộ prompt

| Tệp | Công cụ | Nội dung | Trạng thái |
|---|---|---|---|
| `prompts-assets-prototype-full-v0.1.md` | Topview | Nền (bản có vật / bản sạch), lớp vật, ảnh giới thiệu nhân vật, tài liệu, biểu tượng. Mỗi khối là một prompt hoàn chỉnh | **Đang dùng** cho nền, ảnh giới thiệu, vật phẩm |
| `prompts-assets-prototype-v0.1.md` | Topview | Kế hoạch tách layer (§1) và bản prompt từng phần | Tham khảo: lý do tách layer; prompt đã gộp vào bản `full` |
| `prompts-characters-topview-v0.2.md` | Topview | Nguyên văn prompt các chân dung **đang có trong game** (khung 9:16) | **Đang dùng** cho chân dung |
| `prompts-characters-prototype-flow-v0.1.md` | Google Flow | Chân dung khung 3:4, §1 Manifest đặt tên `char-<nhân vật>-<biểu cảm>` | Phong cách đã thay bằng v0.2; **quy ước tên ở §1 vẫn là chuẩn** (code và test dựa vào) |
| `prompts-background-prototype-v0.1.md` | Google Flow | 3 nền + ảnh neo phong cách, định dạng khối `[id]` `[type]` `[ref]` | Đầu vào của skill `.agents/skills/google-flow-image`; tên `bg-prototype-*` là chuẩn |
| `prompts-background-prototype-flow-v0.2.md` | Google Flow | 3 nền, bản tiếng Anh chuyển từ ảnh tham khảo sang chữ | Đã gộp vào bản `full` |

Đang sinh ảnh trên Topview (GPT Image 2.5, 1K, medium); Google Flow là cách cũ.

## `nguon/` — ảnh gốc

`nguon/topview-2026-09-27/`: ảnh Topview chưa xử lý, để dành cho lớp vật bấm được (commit 221051e): nền
sạch, nền có Bác Tư ghép sẵn, lớp lá thư, hộp góp ý, Bác Tư trong cảnh, nền ký túc xá. Tên tệp theo id trong
`prompts-assets-prototype-full-v0.1.md`; hậu tố `-flat` là lớp vật còn nền phẳng, chưa chạy Remove Background.

## Thêm ảnh mới

1. Viết prompt vào bộ prompt đang dùng (hoặc tạo bộ mới `prompts-<loại>-<phạm vi>-vX.Y.md` rồi thêm một dòng
   vào bảng trên).
2. Ảnh gốc giữ lại thì đặt vào `nguon/<công cụ>-<ngày YYYY-MM-DD>/`.
3. Ảnh đưa vào game thì chuyển sang `.webp` hoặc `.png` và thả vào `prototype/src/assets/` đúng tên ô.
