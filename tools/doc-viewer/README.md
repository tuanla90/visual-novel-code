# doc-viewer — đọc và rà soát tài liệu

Gom mọi tài liệu Markdown của repo (`README.md`, `docs/`, `art/`, `prototype/README.md`, `prototype/docs/`,
`prototype/src/assets/art/README.md`) thành **một tệp HTML tự chứa** để đọc và rà soát.

## Chạy

```bash
cd tools/doc-viewer
npm install        # lần đầu (chỉ cần gói marked)
npm run build      # dựng dist/index.html
npm run watch      # dựng lại mỗi khi sửa tài liệu hoặc tệp đánh giá
```

Mở `tools/doc-viewer/dist/index.html` bằng trình duyệt (đúp chuột là được, không cần máy chủ). `dist/` không
đưa vào git.

## Trang có gì

- **Thứ tự đọc** chia 6 giai đoạn, kèm thời gian đọc ước tính; tiến độ "đã đọc" ở thanh bên.
- Mỗi tài liệu có:
  - **Tài liệu này là gì**: vai trò, trạng thái (đang hiệu lực / một phần lỗi thời / đề xuất chưa duyệt / đã bị thay / lịch sử), ý chính.
  - **Đánh giá tác động**: sửa tài liệu này thì ảnh hưởng tới tài liệu khác, quyết định, gameplay, workload nào.
  - **Cần rà khi đọc**: danh sách điểm nghi lệch, có ô đánh dấu đã xem.
  - **Tự động**: tài liệu nào nhắc tới tệp này, QĐ nào được nhắc trong tệp.
  - **Ghi chú của bạn**: tự lưu trong trình duyệt.
  - Hai tab **Bản đọc** và **Nguồn (có số dòng)**.
- Tham chiếu `ten-tep.md:123`, `dòng 123`, `QĐ-072` đều bấm được và nhảy đúng chỗ.
- Ô tìm kiếm không phân biệt dấu, hoa/thường, trên mọi tài liệu.
- **Xuất ghi chú**: tải một tệp Markdown gồm ghi chú, điểm đã xem, tài liệu đã đọc.

Đánh dấu và ghi chú chỉ nằm trong trình duyệt đang dùng (localStorage). Muốn giữ lâu dài thì xuất ghi chú.

## Sửa nội dung trang

| Tệp | Nội dung |
|---|---|
| `danh-muc.json` | Thứ tự đọc (`giai_doan`), ghi chú đầu trang (`ghi_chu_chung`), tệp HTML mở riêng (`ngoai`) |
| `danh-gia/*.json` | Đánh giá từng tài liệu, mỗi khối một `path`. Chuỗi viết được Markdown dòng đơn |
| `giao-dien/style.css`, `giao-dien/app.js` | Giao diện |
| `build.mjs` | Bộ dựng |

Tài liệu mới chưa có trong `danh-muc.json` vẫn hiện, ở nhóm "Khác (chưa xếp)".

Đánh giá trong `danh-gia/` do agent viết ngày 28/09/2026 và điều phối viên kiểm lại một phần. Số dòng dẫn trong đó
đúng với tài liệu lúc ấy; sửa tài liệu thì số dòng có thể lệch.
