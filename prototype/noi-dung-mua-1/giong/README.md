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

## Quyết định 04/10/2026 (rút từ đợt rà soát lời cb4deef và bản AI gọt 6922085)

- **Đúng vai khi nói chuyện dữ liệu**: chỉ người chơi gõ lệnh và nói "câu lệnh". Hà Vy nghĩ bằng tập hợp ("Họ lấy cả hai thay vì
  chỉ lấy phần trùng nhau"), Minh Anh nói căn cứ, Tùng ngợp trước số. Máy bắt: mục "## Thuật ngữ theo vai".
- **Xưng theo người được nói tới, cho mọi khóa dưới**: Duy đáp lời Minh Anh thì "em" ("Em nạp vào laptop rồi chị"); Tùng, Hà Vy
  đáp lời Duy thì "em" ("Em không cười. Em đang chỉnh kính"); Nam, Hiếu đáp lời Minh Anh thì "em". Nói với cả nhóm có Minh Anh thì
  bỏ đại từ ("Còn chưa kịp đặt hoa…", "Cảm ơn mọi người"). Máy không biết câu nói với ai: soát tay theo câu ngay trước.
- **Không nịnh**: "Các cậu nói đúng" bỏ, nói thẳng vào việc ("Có người đang mượn tên em…").
- **Giọng miền Bắc**: không "ủa, nè, hông, tui". Máy bắt ở "## Chống giọng AI".
- **AI gọt câu không được đổi dữ kiện của tuyến khác**: bản gọt 6922085 đổi lời Tùng thành "hôm đấy cậu bảo muốn đi gửi xe" làm
  gãy việc phụ "Một lần dẫn lạc" (Tùng tự nhận không hỏi lại); thêm "xe buýt" cho Hoài trong khi Hoài kéo vali vào ký túc.

## Quyết định 04/10/2026, bảng lý do sửa Vụ 1 (Ngày hội Trung thu)

Lời phải hợp tuổi 18–21. Bảng user duyệt cho bản sửa 6922085, rút thành luật:

| Lỗi | Ví dụ bị sửa | Viết thay | Máy |
|---|---|---|---|
| Ẩn dụ, nhân hóa kiểu hoạt hình mẫu giáo | Minh Anh "Trăng tròn mà như sắp lăn khỏi bảng"; Tùng tả đầu lân "Tớ hiểu nó"; "bánh tự mọc chân" | Một nhận xét thực tế: "Dán chèn cả lên bảng tin trường, gió thổi cái là bong" | nhắc |
| Tự gọi người khác là "người lớn" (cả nhóm là người lớn) | Hà Vy "Nhìn chỗ người lớn không để ý ấy" | "Đám đông mải nhìn lên sân khấu", "Ai cũng nhìn quanh bàn thôi" | lỗi |
| Câu cụt kiểu tập đếm, bài tập đọc lớp 2 | "Sao năm cánh mà nhấp nháy tám màu"; "đĩa bánh vừa đủ năm người mà hụt mất một chiếc. Ai cầm nhỉ?" | Câu đời thường có ngạc nhiên, có tiểu từ: "Thiếu mất một cái rồi này", "Ơ tớ thề tớ mới rót trà…" | (tiểu từ) |
| Suy nghĩ người chơi nói điều hiển nhiên | Dép trẻ con "Chẳng ai trong CLB đi vừa" | Suy nghĩ bật ra câu hỏi tiếp theo: "Quanh đây có trẻ nhỏ chạy chơi à?" | tay |
| Cường điệu kiểu sitcom: người ở xa phản ứng với câu nói nhỏ | Bạn Robotics khựng tay, khách ngoái nhìn khi người chơi đoán | Bỏ phản ứng; nhân vật bên mình bác bằng lý | tay |
| Xưng hô sai vai với trẻ con | Minh Anh nói với bé Na "Con cứ ăn đi" (giọng phụ huynh) | "Bé cứ cầm ăn đi nhé", chị/bé | tay |
| Khen cộc như cô giáo | Hà Vy "Giỏi." | Nói việc vừa làm được: "Quan sát tốt đấy. Lần theo vệt vụn bánh với đôi dép là ra ngay." | lỗi |

Gợi ý theo tinh thần Sherlock Holmes: chỉ hướng quan sát (ai cũng nhìn chỗ nào, chỗ nào chưa ai nhìn), không phán theo tuổi, vai người khác.

## Gọt lời 04/10/2026 (user: "bỏ bớt câu nói trực tiếp, ngây ngô, sách giáo khoa, cụt lủn, gượng ép, cường điệu")

Soát tay, máy không bắt được. Câu thuộc một trong các loại dưới thì cắt hẳn, hoặc giữ đúng phần việc:

- **Nói trực tiếp bài học / luật**: "Chi tiết không nói gì thì bỏ qua, đừng ép nó nói", "Ngưỡng ấy để tìm nhóm cần hỏi, không phải để kết tội", "Đến đây dữ liệu dừng, không phải mình non". Thẻ chữ cuối cảnh đã nói bài học, nhân vật không nói lại.
- **Nhắc lại điều người chơi vừa làm / vừa biết**: "Bảng, cột, dòng. Tớ ghi vào sổ", "Gọt cho các dòng về cùng một kiểu rồi mới so", Vy đọc lại cả chuỗi lập luận sau khi người chơi đã tra ra.
- **Liệt kê manh mối**: "Một nhãn bong nửa mã, một vé xe, một hóa đơn…", "Phải xem ai mở hộp, mở lúc nào, trong hộp còn sót lại gì".
- **Thoại độc thoại cảm xúc kiểu văn mẫu**: "Một mình giữa thành phố to thế này… háo hức nhiều hơn", "Mong là mình không phí nó".
- **Câu đệm gượng**: "Lần đầu tớ thấy một tập giấy nặng thế."
- **Cường điệu, gắt quá mức với người lớn hơn**: Tùng nói khóa trên "Nói điêu là lộ ngay", "Giải thích đi!".
- **Câu cụt kiểu khẩu hiệu** (user 04/10): "Thử thì biết." → "Tớ cũng chưa rõ. Cứ thử đi."; "Đừng cá. Dò." → "Đừng cá nữa. Dò từng dòng đi."; "Ghi là ghi." → "Ghi rồi thì là nợ, cậu cãi cũng không được." Hà Vy vẫn ngắn, nhưng là câu nói thật: có tiểu từ, có chủ ngữ khi cần. Hoặc cắt hẳn. "Đừng cá" vẫn là câu riêng của Vy, chỉ nói thêm cho tròn.


## Lời khớp ảnh (user 04/10, cảnh mở đầu)

- Lời chỉ nhắc vật / người **có trên ảnh** của cảnh đó. Cổng trường, cổng KTX vẽ trống: không "vài chiếc vali lăn qua thanh chắn", không "bánh vali kẹt ray cổng". Vali của người chơi chỉ hiện ở xe buýt, sảnh KTX và hai ảnh chibi cầu thang.
- Ảnh đã vẽ thì lời dẫn không tả lại (người chơi tựa cửa sổ, vali dưới chân). Ghi điều ảnh vẽ vào `[DÀN DỰNG]` để người sửa lời sau đối chiếu.
- Độc thoại nhớ nhà, tự sự kiểu văn mẫu ("mẹ nhét thêm hộp ruốc", "đọc giấy báo đến lần thứ ba mới dám tin") là vi phạm, cắt.

## Tự vấn và lời dẫn (user 05/10/2026, cảnh mở đầu Vụ 1)

User đọc cảnh xuống xe buýt và trả lại. Bốn điều, áp cho mọi vụ:

- **Tự vấn là câu hỏi, không phải bản tin.** Lời người chơi tự nghĩ và lời `> NHẮC VIỆC player` viết như người thật tự hỏi: "Tìm ký túc xá đã. Thông báo chỉ ghi: phòng 408." → "Không biết ký túc xá ở chỗ nào nhỉ?". Các câu thuật "thông báo chỉ ghi…", "sơ đồ chỉ vẽ…", "X ở đâu thì thông báo không ghi" là nói trực tiếp: máy bắt (các mẫu "tự vấn kể lể" ở cuối mục "## Nói thẳng" của `luat-giong.md`).
- **Lời dẫn không nói điều hiển nhiên.** "Xe buýt chạy đi." không cho biết gì: cắt. Lời dẫn chỉ ở lại khi nó đưa một điều người chơi cần mà ảnh không cho (nội dung tờ giấy, một tiếng động, thời gian trôi).
- **Đúng với đời thật.** Ngày nhập học không ai đóng cửa kính chốt bảo vệ. Ảnh nền vẽ trống thì lời im, không bịa lý do cho cái trống ấy.
- **Câu tự hỏi phải là câu người thường sẽ hỏi.** Vào sảnh tìm đường lên tầng bốn, không ai tự hỏi "Thang máy hay thang bộ đây?"; người ta hỏi "Thang máy ở chỗ nào nhỉ?" hoặc "Không biết có thang máy không."
- **Có cảm xúc, giọng sinh viên, không ngây ngô.** "Hết tuần… Nghĩa là cả tuần leo bộ." là câu suy ra khô; "Nhường thì nhường… nhưng tầng bốn cơ đấy. Lại còn cả cái vali." mới là người đang xách vali. "Dây cờ giăng tận cổng thế kia, chắc ký túc xá đây rồi." bị trả lại vì ngây ngô.
- **Đừng làm thế giới truyện xấu đi vô cớ.** Thang máy "bảo trì đến hết tuần" đúng dịp nhập học làm trường trông kém; đổi thành thang quá tải, nhường phụ huynh lớn tuổi. Chi tiết gây khó cho người chơi phải có lý do đời thường và không bôi xấu nơi chốn, nhân vật.
- **Lời người ngoài nói theo lệ của nghề họ.** Phụ xe gọi bến bằng tên đầy đủ: "Đại học Chấn Hưng! Ai xuống thì chuẩn bị!", không "Ai xuống cổng Chấn Hưng chuẩn bị!".
- **Chưa biết thì nói kiểu đoán.** Người mới tới trường không khẳng định: "Mọi người kéo vali vào cả lối này. Chắc ký túc xá đây rồi."; "Phòng 408 chắc ở tầng bốn. Trường to đẹp thế này chắc phải có thang máy chứ nhỉ?" (user 05/10 chiều).
- **Nhìn ảnh thấy rồi thì không hỏi.** Ảnh sảnh đã vẽ thang máy thì không có câu "Thang máy ở chỗ nào nhỉ?".
- **Lý do phải xuôi, lời chấp nhận phải gọn.** "Nhường thang cho phụ huynh lớn tuổi" bị chê khiên cưỡng; "Nhường thì nhường…" bị chê không hay. User gợi: "Đành vậy, thế thang bộ ở đâu nhỉ" hoặc "Đen thật, đành đi thang bộ vậy".
- **Không tự xưng tên khi không ai hỏi.** Ngoài đời ít ai tự xưng nếu không có quan hệ đặc thù hoặc bị hỏi (user 05/10 chiều). Tên nhân vật lộ ra qua người khác gọi ("Hiếu ơi, lấy cơm này!"), qua giấy tờ, hoặc khi bị hỏi.
- **Lời không hướng dẫn thao tác.** Không "lên hàng LẤY CỘT bấm thêm…"; phần hướng dẫn thuộc về bạn đi cùng / chat bot (giao-viec B11).
- **Vai tinh ý là của Hà Vy** (user 05/10 chiều): người chơi là tân sinh viên bình thường, không tự phát hiện điều người mới tới không thể biết (ví dụ Tùng chỉ sai đường cho Hoài: người chơi tin, tới Trung thu Hoài mới nói ra). Suy luận từ dấu vết nhỏ là việc của Hà Vy; về sau Hà Vy chỉ cho người chơi cách nhìn. Trước bài dạy của Hà Vy ở Trung thu, người chơi không có màn soi nào (user 05/10 tối: "dời đi, để Hà Vy dạy soi sau"); màn soi cậu áo xanh ở sảnh và hai màn tự soi Duy, Hà Vy đã bỏ.
- **Điều đã nói thì không nhắc lại.** Số phòng 408 chỉ nói một lần ở chỗ người chơi cần tới nó (nghĩ ra "tức là tầng bốn"), không lặp ở mỗi cảnh.
