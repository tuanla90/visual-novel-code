# Nền lời

Bộ nền để máy viết lời và soát lời, thay cho việc người duyệt đọc từng câu. Ý của user 05/10/2026: phải chốt được văn hóa,
persona, bối cảnh, cảm xúc, mục tiêu trước khi viết, và làm thành thứ dùng lại được cho dự án sau.

## Ba tệp, năm tầng

| Tệp | Tầng | Phạm vi | Ai duyệt, khi nào |
|---|---|---|---|
| `van-hoa.md` | Văn hóa: luật chung theo vùng và lứa tuổi | Mục 1 tới 6 dùng cho mọi dự án cùng vùng; mục 7 riêng dự án này | User duyệt một lần, sau đó chỉ thêm mục |
| `persona.md` | Persona: vai, tính cách, giọng, xưng hô, sở thích, điều biết và không biết, câu mẫu | Mỗi nhân vật một mục, dùng cho cả mùa | User duyệt từng nhân vật |
| `the-canh-<vụ>.md` | Bối cảnh, cảm xúc, mục tiêu của từng cảnh | Mỗi cảnh một thẻ (một nơi, một lúc, một nhịp cảm xúc) | User duyệt từng thẻ trước khi máy viết lời cảnh đó |

Luật viết đã có sẵn (chống giọng AI, lời khớp ảnh, không chỉ cách bấm) vẫn nằm ở `../giong/`; máy kiểm chữ `npm run kiem-giong:mua1` vẫn chạy như cũ.

## Quy ước

- Mỗi mục là một gạch đầu dòng mở bằng tên in đậm. Dòng thụt vào bên dưới ("Đúng:", "Sai:", "Nguồn:") thuộc về mục đó.
- Mã `[VH-xx]` và mã thẻ cảnh không đổi khi sửa chữ: máy soát trích mã khi loại một câu, góp ý của user được ghi vào đúng mã.
- "Nguồn: user dd/mm" là điều user đã nói. "Nguồn: rút từ lời đã có" là điều rút từ câu đang nằm trong truyện, chờ user xác nhận.
- Thẻ cảnh: "Ảnh có gì / không có gì" ghi theo tệp ảnh thật, không theo trí nhớ. "Đã biết" của thẻ sau bằng "Đã biết" cộng "Biết thêm" của thẻ trước.

## Dây chuyền dự kiến (chưa dựng công cụ)

1. Ghép đề bài cho một cảnh: các mục văn hóa liên quan, persona của người có mặt, thẻ cảnh, phần "đã biết".
2. Model viết lời theo đề bài, trong giới hạn số câu của thẻ.
3. Model khác soát: câu bị loại phải kèm mã mục mà nó phạm.
4. User đọc mẫu ở trang đọc truyện. Mỗi góp ý được ghi về đúng tầng (thêm mục văn hóa, sửa persona, sửa thẻ cảnh), rồi các cảnh dùng mục đó được viết lại.

## Tình trạng

05/10/2026: bản đầu của ba tệp cho đoạn thử (Vụ 1 từ Trung thu tới hết 24/09), chờ user duyệt theo thứ tự văn hóa, persona, thẻ cảnh.
Xem trên trang đọc truyện, nhóm "Nền lời" ở ô chọn vụ. Lời trong `../loi/` chưa đổi theo các thẻ này.
