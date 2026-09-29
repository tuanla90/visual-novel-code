## Phần 2 — Điều tra {part: investigation}

### inv-01 — Phòng CLB: xem xét lá thư {scene: clb-room}

> NHIỆM VỤ: Xem xét lá thư

- [DÀN DỰNG] Một điểm xem xét trên bàn, có viền và nhãn rõ; đã xem thì đánh dấu (QĐ-027). Không có vật nào khác bấm được.
- [ĐIỂM XEM XÉT hs-letter] nhãn: "Lá thư" · mở manh mối: clue-signature-h · chạy chuỗi: inv-letter
- [ĐIỀU KIỆN QUA] cần: clue-signature-h → nút "Nhiệm vụ tiếp theo →" sang inv-02

### inv-letter — Chữ ký ngoài phong bì {scene: clb-room}

- [HIỆN TÀI LIỆU doc-letter]
- **narrator**: Thư đánh máy, không có tên người viết. Ngoài phong bì có một chữ ký tay lượn dài, chỉ đọc được chữ H đầu.
- **ha-vy** (thinking): Chữ ký chỉ có một chữ cái. H là họ, hay là tên?
- [HỎI q-sig-h] ha-vy: "Theo cậu, chữ H nhiều khả năng là chữ đầu của gì?"
  - (A) {id: ho} Họ, vì trong họ tên, họ đứng đầu tiên. → phản hồi: **ha-vy** (neutral): Họ đứng đầu thật. Nhưng người Việt được gọi bằng tên, và cũng hay ký bằng tên.
  - (B) {id: ten} Tên gọi, vì người Việt hay ký bằng tên. [ĐÚNG] → phản hồi: **ha-vy** (smile): Mình cũng nghĩ thế. Mình ký "Vy.", có bao giờ ký "Lê." đâu.
  - (C) {id: ma-lop} Mã lớp, vì giấy tờ ở trường hay ghi mã lớp. → phản hồi: **ha-vy** (neutral): Mã lớp thì ai lại ký tay. Thử nghĩ xem cậu hay ký bằng chữ gì.
- [DÀN DỰNG] Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; chữ (A)/(B)/(C) chỉ là nhãn khi viết, không hiển thị; telemetry ghi id lựa chọn (QĐ-035).
- **minh-anh** (neutral): Vẫn chỉ là khả năng thôi. Nhưng là khả năng đáng thử trước.
- [DÀN DỰNG] Vì sao giữ manh mối này: nó quyết định cấu trúc truy vấn — lọc cột `ten` (không phải `ho_dem`) bằng phép "bắt đầu bằng" (`LIKE 'H%'`); đây là điều kiện của c1 và điều kiện đầu tiên của c3. Sau chuỗi này, mục "Từ manh mối" của trình dựng có giá trị `H`.
- **minh-anh** (neutral): Thư lấy ra từ hộp góp ý sáng nay. Mà trường có ba hộp, ở ba giảng đường.
- **ha-vy** (neutral): {{nv.bac-tu}} lao công sáng nào cũng đi cả ba tòa. Hỏi bác là nhanh nhất.

> NHIỆM VỤ: Tìm hộp góp ý đã chứa lá thư

### inv-02 — Hành lang giảng đường {scene: corridor-b}

> NHIỆM VỤ: Hỏi {{nv.bac-tu.trong-cau}}, xem xét hộp góp ý

- [DÀN DỰNG] Cảnh hành lang: {{nv.bac-tu.trong-cau}} đang lau sàn cạnh hộp góp ý. Biển "Giảng đường B" nhỏ trên tường, không nhấn mạnh. Hai điểm xem xét, chọn theo thứ tự nào cũng được.
- **narrator**: Hành lang giảng đường. {{nv.bac-tu}} đang lau sàn cạnh một hộp góp ý.
- [ĐIỂM XEM XÉT hs-bac-tu] nhãn: "{{nv.bac-tu}}" · mở manh mối: clue-box-building-b · chạy chuỗi: inv-bac-tu
- [ĐIỂM XEM XÉT hs-box] nhãn: "Hộp góp ý" · mở manh mối: clue-bookmark-baochi · chạy chuỗi: inv-box
- [ĐIỀU KIỆN QUA] cần: clue-signature-h, clue-box-building-b, clue-bookmark-baochi → nút "Nhiệm vụ tiếp theo →" sang ana-01

### inv-bac-tu — Hộp nào được mở sáng nay {scene: corridor-b}

- **bac-tu** (neutral): CLB Thám Tử đấy à? Lâu lắm rồi mới thấy các cháu đi hỏi chuyện.
- **minh-anh** (neutral): Dạ. Bác ơi, sáng nay hộp góp ý nào được mở ạ?
- **bac-tu** (neutral): Mỗi hộp này thôi, hộp giảng đường B. Cô phụ trách hộp góp ý mở, bác đứng lau ngay đây.
- **bac-tu** (neutral): Hộp tòa A với tòa C tuần này chưa đến lượt mở.
- **ha-vy** (thinking): Vậy người bỏ thư đã đến tòa B. Lớp nào sinh hoạt ở tòa B thì sinh viên lớp ấy hay qua lại đây.
- **minh-anh** (worried): Nhưng view của mình chỉ có lớp, làm gì có tòa nhà.
- **ha-vy** (thinking): Thì tìm xem lớp nào sinh hoạt ở tòa B. Chắc phải có bảng ghi chuyện đó.
- [DÀN DỰNG] Vì sao giữ manh mối này: nó đổi câu hỏi và cấu trúc truy vấn — bảng `sinh_vien` không có cột tòa nhà, nên phải hỏi bảng `lop_sinh_hoat` trước (c2), rồi dùng kết quả làm điều kiện `ma_lop IN (…)` của c3. Câu "cô phụ trách hộp góp ý" cài sẵn nguồn xác minh độc lập cho cú lật ở deb-04 và end-01.

### inv-box — Mẩu bookmark ở khe hộp {scene: corridor-b}

- **narrator**: Sát khe hộp góp ý có nửa mẩu bookmark bị xé, kẹt ở mép khe.
- [HIỆN TÀI LIỆU doc-bookmark]
- **ha-vy** (thinking): Nửa logo ngòi bút, còn mấy chữ "…ÁO CHÍ". Bookmark của CLB Báo chí, họ phát ở ngày hội CLB.
- **minh-anh** (neutral): Kẹt ngay khe hộp. Có thể rơi ra lúc ai đó nhét thư vội.
- **ha-vy** (smile): Thám tử ngày xưa chắc cũng nhặt được mấy thứ kiểu này.
- [DÀN DỰNG] Vì sao giữ manh mối này: nó thêm điều kiện `clb = 'Báo chí'` cho c3, và đổi cách diễn giải — bookmark cho biết câu lạc bộ, không cho biết ai làm rơi (ghi ở "Lưu ý" của thẻ, không nói trong thoại để giữ QĐ-023). Sau chuỗi này, mục "Từ manh mối" có giá trị `Báo chí`.
