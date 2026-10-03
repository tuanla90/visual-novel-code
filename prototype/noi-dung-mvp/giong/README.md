# Giọng nhân vật — luật viết lời và máy kiểm

Học từ cách OOC xếp tầng prompt: **luật văn phong → thẻ nhân vật → sổ từ khóa**. Ở đây tầng chữ cho người / AI đọc là
`docs/mvp/v2-thoai/brief-chung.md` (tính cách, giọng, xưng hô, luật viết). Thư mục này giữ phần **máy kiểm được** của brief ấy,
để mỗi lần sửa lời không phải nhắc lại cùng một luật.

| Tệp | Chứa gì |
|---|---|
| `luat-giong.md` | Thứ tự truyện, xưng hô theo nhân vật (có mốc "từ / trước" tệp nào), cách gọi khóa trên, cụm dành riêng, câu khóa (câu gài không được mất), tên đã bỏ, mẫu cấm trong lời nhắc, độ dài bong bóng, **chống giọng AI**, **tiểu từ** |

Bộ đọc nội dung game bỏ qua thư mục này.

## Chạy

Trong `prototype/`:

```
npm run kiem-giong                       # kiểm loi/
npm run kiem-giong -- --chi-loi          # chỉ hiện lỗi
npm run kiem-giong -- --so <thư mục v2>  # kiểm bản v2 do AI viết và so với loi/
```

- **LỖI** (mã thoát 1): sai xưng hô, gọi trống tên khóa trên, mất câu khóa, tên đã bỏ, lời nhắc lộ đáp án; ở chế độ `--so`: mã đoạn
  đổi, điều kiện `- Khi …` đổi.
- **nhắc**: cụm dành riêng bị người khác dùng, bong bóng quá dài, câu lặp nguyên văn ở hai đoạn; ở chế độ `--so`: **mất dữ kiện**
  (số, giờ, ngày, mã, nguyên văn trong ngoặc kép, biến `{{…}}` có ở bản gốc mà bản v2 không còn), **người nói mới** chen vào đoạn.
- **giọng AI**: dấu vết công cụ, ngoặc cong, chữ đậm, emoji, giọng trợ lý ảo, "đóng vai trò then chốt" là LỖI; các mẫu sáo khác là nhắc.
- **nói thẳng**: nhân vật tự khai sở trường, vai trò ("chứ Excel thì tớ lo", "là việc của em", "cậu lo X, tớ lo Y") là LỖI.
- **tiểu từ**: tệp từ 30 câu thoại trở lên mà dưới 20% câu có tiểu từ (à, ừ, nhỉ, chứ, đấy, thế, mà, ạ…) là nhắc.
- Lời trong ngoặc kép (nhại lời người khác) và ngôi thứ ba ("cậu ấy", "anh ấy") không tính là xưng hô.
- Biểu cảm sai, người nói chưa tới lượt xuất hiện: đã có ở `npm run kiem-noi-dung:mvp`.

## Quy trình cho AI viết lời (rút ra khi duyệt v2 Vụ 1, 03/10/2026)

1. Gửi AI `brief-chung.md` + brief của vụ + các tệp `loi/` cần viết. Bắt AI ghi ra **thư mục v2 riêng**, không sửa tệp gốc.
2. `npm run kiem-giong -- --so <thư mục v2>`. Mọi LỖI và mọi dòng "mất dữ kiện" là chỗ phải giữ bản cũ hoặc vá.
3. Người duyệt nhặt từng đoạn cũ ↔ mới (máy không chấm được gu: lời có hay không, có lệch ảnh không, có thừa không).
4. Mỗi lần phải sửa tay cùng một kiểu lỗi lần thứ hai, thêm một dòng luật vào `luat-giong.md`. Luật mới thì thêm cả ví dụ
   vào `src/content/real/kiem-giong.test.ts` nếu là kiểu luật mới.

AI hợp **gọt câu** hơn **viết cảnh mới** (cảnh mới do Gemini viết lệch tính cách nặng). Cảnh mới: người viết dựng khung nhịp
và câu mang manh mối trước, AI chỉ gọt.

## Chống giọng AI — viết thế này thay vì thế kia

Đảo ngược danh mục "Signs of AI writing" của Wikipedia (bài "AI slop" / "Rác AI") sang lời thoại tiếng Việt. Dán nguyên mục này
vào brief khi giao AI viết lời. Máy kiểm bắt được phần có mẫu chữ; phần nhịp và gu vẫn phải duyệt bằng tai.

| Dấu hiệu văn AI | Viết thay bằng |
|---|---|
| Thổi phồng ý nghĩa: "đóng vai trò then chốt", "minh chứng cho", "đánh dấu bước ngoặt" | Nói việc cụ thể: "Không có tờ này thì cô Lan không mở sổ." |
| Ẩn dụ sáo: "hành trình", "bức tranh toàn cảnh" | Gọi đúng tên đồ vật, nơi chốn: "cái sổ", "phòng 204" |
| Giọng quảng cáo: "sôi động", "rực rỡ", "tuyệt vời", "vô cùng" | Một chi tiết thấy được: "cờ bánh răng treo kín gian" |
| Từ vựng AI: "khám phá", "trải nghiệm", "kết nối", "thấu hiểu", "trân trọng", "sâu sắc" | Từ sinh viên nói thật: "đi xem", "ngồi với nhau", "hiểu rồi" |
| Đuôi phân tích hời hợt: ", qua đó cho thấy…", ", góp phần…" | Dừng câu ở việc. Ý nghĩa để người chơi tự rút |
| "Không chỉ… mà còn", "Không phải X, mà là Y" | Nói thẳng Y. Hoặc hai câu ngắn |
| Ba vế đều tăm tắp ("nhanh, gọn và chính xác") | Một hoặc hai vế; câu dài ngắn so le |
| Tự hỏi tự đáp: "Vì sao ư? Vì…" | Để người khác hỏi, hoặc bỏ câu hỏi |
| Quy kết mơ hồ: "nhiều người cho rằng" | Nói ai nói: "Hiếu bảo…", "bác Thịnh kể…" |
| Kết luận, giảng đạo lý: "tóm lại", "điều quan trọng là", "có lẽ… mới là…" | Cảnh cho thấy hậu quả (luật show, don't tell); nhân vật nói việc tiếp theo |
| Gọi tên cảm xúc: "tớ cảm thấy rất vui" | Hành động hoặc câu nói lộ cảm xúc: "Thế mai tớ khao trà đá." |
| Cử chỉ sáo: "hít một hơi thật sâu", "khẽ mỉm cười", "ánh mắt kiên định" | Biểu cảm đã có ở ảnh `(happy)`, `(worried)`; lời dẫn chỉ tả cái khác thường |
| Xu nịnh: "cậu nói đúng", "ý hay" | Đồng ý bằng việc làm: "Ừ, lọc lại đi." |
| Giọng trợ lý ảo: "Tất nhiên rồi!", "Hy vọng điều này giúp…" | Nhân vật có việc riêng, không phục vụ người chơi |
| Câu đủ chủ vị, không tiểu từ, ai cũng nói trơn tru như nhau | Tiểu từ (à, ừ, nhỉ, chứ, đấy, thế, mà, ạ), câu cụt, nói dở, ngắt lời; mỗi người một nhịp (Tùng cảm thán, Hà Vy cộc, bác Thịnh rất ngắn) |
| Gạch dài "—" (kể cả thẻ chữ tiêu đề), ngoặc cong “ ”, chữ **đậm**, emoji | Dấu chấm, phẩy, "…"; ngoặc thẳng "…"; "Việc của cô Hạnh, thứ Tư 20 tháng 11" |
| **Nói thẳng**: nhân vật tự khai sở trường, vai trò, tính cách. "Toán thì chịu, chứ Excel thì tớ lo được." "Cậu lo lọc, tớ lo đường." "Em thì lọc kém, chứ tìm đường là việc của em." (máy bắt các mẫu này) | Cho thấy bằng việc: Tùng dò bảng xếp phòng mãi chưa ra, người chơi chỉ ngay "Dòng gần cuối kìa. 408, hai tên." Ở Ngày hội Tùng chỉ nhắc lại: "Lại cậu." |
| **Lời dẫn tả lại cảnh** (soát tay): "Sảnh tòa B vắng tanh. Trên tường gần cửa ra vào treo một cái hộp tôn xanh, biển ghi…" — điều ảnh nền đã cho thấy hay lẽ ra phải cho thấy (ảnh còn không có hộp, biển trên ảnh để trống) | Để ảnh nói: chèn ảnh vật (`[ẢNH obj-hop-kien-nghi-trong]`), nhân vật gọi tên nó trong lúc làm việc của mình ("Hộp kiến nghị đây. Trường số hóa hết rồi mà vẫn treo cái hộp này nhỉ."). Lời dẫn chỉ dành cho điều ảnh không vẽ được: thời gian, âm thanh, mùi, việc đang xảy ra |
| **Lời dẫn kể sai sự thật** (máy không bắt được, soát tay): lời dẫn nói điều thoại không có, hay sai ai làm gì. "Vừa leo thang bộ vừa cãi nhau" mà không ai cãi; người chơi nói "khiêng nửa cái vali của cậu" trong khi vali là của người chơi | Lời dẫn chỉ kể điều thấy được và khớp thoại; đọc lại xem đồ là của ai, ai giúp ai, ai nợ ai. Cá trật thì cho thấy: "Bảy phút sau, cả hai mới tới chiếu nghỉ tầng ba, đứng thở." |
| **Nhét chữ vào mồm** (máy không bắt được, soát tay): nhân vật đọc lại luật / thói quen của mình cho người chơi nghe, điều người chơi đã biết. "Cô mở cho tài khoản CLB đúng một bảng này. Bảng nào khác cô không mở, xong việc là cô khóa lại." | Cho thấy bằng việc hoặc một câu đời thường: "Ừ, cô mở cho các em đúng cái danh sách ấy. Xong thì báo cô một tiếng." |
| Sinh viên nói thuật ngữ dữ liệu với người ngoài CLB: "Bọn cháu chỉ cần cột ghi chú và cột tên." | Nói như đời thật: "Bọn em chỉ cần tên, lớp, năm học và ghi chú thôi ạ." (người ngoài tự nói "cột" trước thì được nói lại) |

## Quyết định 03/10/2026

- Hoài: rụt rè, nói nhỏ; với bạn cùng tuổi bạo dần (dám góp một câu ngắn, đúng việc). Không "nói thẳng": đó là nét của Hiếu.
- Duy (năm hai) xưng **anh/em** với năm nhất, **em/chị** với Minh Anh. Năm nhất gọi "anh Duy".
- Người chơi xưng theo **người được nói tới**: với Minh Anh "em/chị"; với Tùng, Hà Vy "tớ/cậu" dù Minh Anh đứng đó; nói với cả
  nhóm thì tránh đại từ.
- Với thầy cô ở trường (cô Hạnh, cô Lan, thầy Quang), sinh viên luôn xưng **em**, kể cả cô sắp nghỉ hưu; thầy cô gọi "các em".
  "Cháu" chỉ với bác bảo vệ, chú Cường, bà bán trà đá.
- Quân luôn **tôi/các bạn**. Hiếu **tôi** ở Vụ 1 (còn gắt); từ Vụ 2 (đã gỡ tin) **tớ/các cậu** với nhóm, "em" với cô Lan.
