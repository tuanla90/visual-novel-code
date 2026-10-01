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

**Lưu ý 28/09/2026:** các bộ prompt là **bản ghi nguyên văn** prompt đã dùng, không sửa lại. Khi viết prompt mới, theo các quyết định sau (nguồn chuẩn: `nhan-vat.yaml` trong đặc tả nội dung): Hà Vy **năm 1** (QĐ-081); Tùng nói "Tớ cá là…" (QĐ-074); bác Tư đổi tên thành **bác Thịnh, bảo vệ giảng đường B** (khớp ảnh `char-bac-tu-neutral` đã vẽ); chú Bảy → chú Cường; trường là **Đại học Chấn Hưng** (QĐ-080). Màu áo thầy Khải trong ảnh (xanh xám) đang lệch GDD §15.1 (nâu cà phê), chưa chốt bên nào.

## `nguon/` — ảnh gốc

`nguon/topview-2026-09-27/`: ảnh Topview chưa xử lý, để dành cho lớp vật bấm được (commit 221051e): nền
sạch, nền có Bác Tư ghép sẵn, lớp lá thư, hộp góp ý, Bác Tư trong cảnh, nền ký túc xá. Tên tệp theo id trong
`prompts-assets-prototype-full-v0.1.md`; hậu tố `-flat` là lớp vật còn nền phẳng, chưa chạy Remove Background.

## Thêm ảnh mới

Trước khi sinh, đọc `quy-trinh-dong-nhat-va-duyet-anh.md`: cách viết prompt "khối gốc + một mệnh đề đổi" để giữ
nhân vật và phong cách đồng nhất, và vòng duyệt ảnh (tiêu chí viết trước, chấm từng ảnh, tối đa ba vòng sửa).

1. Viết bảng tiêu chí đạt / không đạt cho đợt ảnh, rồi viết prompt vào bộ prompt đang dùng (hoặc tạo bộ mới
   `prompts-<loại>-<phạm vi>-vX.Y.md` rồi thêm một dòng vào bảng trên).
2. Sinh lô nhỏ, chấm theo tiêu chí, sửa ảnh trượt theo quy trình; đạt rồi mới chạy cả lô.
3. Ảnh gốc giữ lại thì đặt vào `nguon/<công cụ>-<ngày YYYY-MM-DD>/`.
4. Ảnh đưa vào game thì chuyển sang `.webp` hoặc `.png` và thả vào `prototype/src/assets/` đúng tên ô.
