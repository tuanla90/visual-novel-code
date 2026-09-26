# CLB Thám Tử Dữ Liệu — Kịch bản prototype v0.1

> Kịch bản chơi được từ đầu đến cuối, mục tiêu 20–30 phút, cho người chơi là sinh viên năm nhất khối kinh tế, quen Excel, chưa học SQL, chơi một mình trên laptop.
>
> Cấu trúc theo `prototype-scope-down-v0.1.md` §2–§5. Ràng buộc theo `lich-su-quyet-dinh.md` (QĐ-011, QĐ-012, QĐ-016…QĐ-027, QĐ-033). Giọng nhân vật và vài câu thoại lấy từ `vu1-buoi-giai-trinh-kich-ban.md`.
>
> File này được viết để gói sau chuyển thành dữ liệu TypeScript một cách cơ học: mỗi dòng có một tiền tố cố định, xem mục "Quy ước đọc file".

## Quy ước đọc file

- Thứ tự phần: `intro` → `investigation` → `analysis` → `debrief` → `ending`. Chuỗi mở đầu của game: `intro-01`.
- Tiêu đề phần: `## Phần N — <Tên> {part: <part-id>}`. Tiêu đề chuỗi: `### <seq-id> — <mô tả> {scene: <scene-id>}`.
- Dòng bắt đầu bằng `- **<người nói>**` là lời thoại hiển thị. Mọi dòng khác là chỉ dẫn, không hiển thị nguyên văn.
- Dòng `> NHIỆM VỤ: …` đổi chữ trên thanh "Nhiệm vụ hiện tại" tại đúng vị trí của nó trong chuỗi.
- Một chuỗi chạy từ trên xuống. Chuỗi được mở từ một điểm xem xét, khi chạy xong, quay về cảnh đang đứng (không cần `[ĐI TỚI]`).
- `[ĐIỂM XEM XÉT]`: manh mối ghi ở "mở manh mối" được thêm vào Hồ sơ khi chuỗi của điểm đó chạy xong. Điểm đã xem được đánh dấu.
- `[HIỆN TÀI LIỆU x]`: hiện tài liệu x (hình và chữ, xem mục Hồ sơ vật chứng) và thêm vào Hồ sơ.
- `[HỎI]` và `[CHỌN DÒNG]`: chọn sai → hiện phản hồi của lựa chọn đó, cho chọn lại, không phạt. Chọn đúng → hiện phản hồi rồi đi tiếp dòng kế.
- `[THỬ THÁCH x]` và `[SỬA TRUY VẤN x]`: mở màn truy vấn theo thẻ x ở mục "Nội dung thử thách". Người chơi lưu vật chứng xong thì đi tiếp dòng kế.
- `[ĐIỀU KIỆN QUA] cần: …`: khi Hồ sơ có đủ các mục đã liệt kê thì hiện nút "Nhiệm vụ tiếp theo →". Bấm nút thì chuyển cảnh, sang chuỗi đích.
- Khối mã `sql` nằm ngay dưới một dòng `[DÀN DỰNG]` là nội dung hiển thị nguyên văn.
- Dấu `<br>` trong ô bảng tách các lời thoại chạy nối tiếp nhau.

---

## Phần 1 — Mở đầu {part: intro}

### intro-01 — Phòng CLB, lá thư và việc được nhờ {scene: clb-room}

> NHIỆM VỤ: Nghe Minh Anh kể về vụ việc

- [DÀN DỰNG] Cảnh phòng CLB (tông ấm): tủ hồ sơ cũ, bảng trắng, ba cái ghế. Chưa có điểm xem xét. Space/Enter để qua lời.
- **narrator**: Tuần thứ hai năm nhất. Bạn vừa ghi danh vào CLB Thám Tử được ba ngày.
- **minh-anh** (worried): Rồi, việc hôm nay là… giữ lại cái phòng này.
- **minh-anh** (neutral): Ngày xưa CLB phá vụ bằng mắt và chân: quan sát hiện trường, hỏi nhân chứng, đọc dấu vết.
- **minh-anh** (worried): Rồi trường chuyển hết lên hệ thống số. Manh mối nằm trong dữ liệu, mà cả CLB không ai đọc nổi.
- **ha-vy** (neutral): Thế là vụ giải được ít dần, người bỏ đi dần. Giờ còn ba người, tính cả cậu.
- **minh-anh** (worried): Sáng nay, Phòng Công tác sinh viên chuyển cho CLB bản chụp một lá thư lấy từ hộp góp ý.
- **minh-anh** (neutral): Thư đề nghị thu hồi phòng của CLB, vì "CLB không còn giải quyết được việc gì".
- **ha-vy** (thinking): Câu này… hơi đau.
- **minh-anh** (neutral): Nhưng Phòng CTSV không nhờ mình tìm thủ phạm.
- **minh-anh** (neutral): Họ nhờ xác minh ai đã trực tiếp bỏ lá thư, để hỏi nguồn gốc thư và làm rõ quy trình tiếp nhận.
- **ha-vy** (smile): Một CLB "không giải quyết được việc gì" mà làm xong việc này thì…
- **minh-anh** (happy): …thì lá thư tự bác chính nó.
- [ĐI TỚI intro-02]

### intro-02 — Quyền xem dữ liệu trong một buổi {scene: clb-room}

- **player**: Vậy mình sẽ được xem dữ liệu sinh viên ạ?
- **minh-anh** (neutral): Một view tối thiểu thôi em: mã sinh viên, họ đệm, tên, lớp, câu lạc bộ.
- **ha-vy** (neutral): Không có ngày sinh, quê quán, số điện thoại hay chỗ ở KTX. Việc cần gì thì cấp nấy.
- **minh-anh** (worried): Quyền chỉ có trong buổi làm việc hôm nay. Hết buổi là hết.
- **minh-anh** (neutral): Em quen Excel đúng không? Hà Vy chỉ cách đọc dữ liệu, em cầm máy.
- **ha-vy** (smile): Yên tâm. Bảng dữ liệu cũng chỉ là một cái sheet to thôi.
- **minh-anh** (neutral): Nhưng trước khi đụng vào dữ liệu, xem kỹ lá thư đã.
- [ĐI TỚI inv-01]

---

## Phần 2 — Điều tra {part: investigation}

### inv-01 — Phòng CLB: xem xét lá thư {scene: clb-room}

> NHIỆM VỤ: Xem xét lá thư

- [DÀN DỰNG] Một điểm xem xét trên bàn, có viền và nhãn rõ; đã xem thì đánh dấu (QĐ-027). Không có vật nào khác bấm được.
- [ĐIỂM XEM XÉT hs-letter] nhãn: "Lá thư" · mở manh mối: clue-signature-h · chạy chuỗi: inv-letter
- [ĐIỀU KIỆN QUA] cần: clue-signature-h → nút "Nhiệm vụ tiếp theo →" sang inv-02

### inv-letter — Chữ ký ngoài phong bì {scene: clb-room}

- [HIỆN TÀI LIỆU doc-letter]
- **narrator**: Thư đánh máy, không có tên người viết. Ngoài phong bì có một chữ ký tay: "H."
- **ha-vy** (thinking): Chữ ký chỉ có một chữ cái. H là họ, hay là tên?
- [HỎI q-sig-h] ha-vy: "Theo cậu, chữ H nhiều khả năng là chữ đầu của gì?"
  - (A) Họ, vì họ đứng đầu họ tên → phản hồi: **ha-vy** (neutral): Họ đứng đầu thật. Nhưng người Việt được gọi bằng tên, và cũng hay ký bằng tên.
  - (B) Tên gọi, vì người Việt hay ký bằng tên [ĐÚNG] → phản hồi: **ha-vy** (smile): Mình cũng nghĩ thế. Mình ký "Vy.", có bao giờ ký "Lê." đâu.
  - (C) Mã lớp của người gửi → phản hồi: **ha-vy** (neutral): Ai lại ký tay bằng mã lớp. Thử nghĩ xem cậu hay ký bằng chữ gì.
- **minh-anh** (neutral): Vẫn chỉ là khả năng thôi. Nhưng là khả năng đáng thử trước.
- [DÀN DỰNG] Vì sao giữ manh mối này: nó quyết định cấu trúc truy vấn — lọc cột `ten` (không phải `ho_dem`) bằng phép "bắt đầu bằng" (`LIKE 'H%'`); đây là điều kiện của c1 và điều kiện đầu tiên của c3. Sau chuỗi này, mục "Từ manh mối" của trình dựng có giá trị `H`.
- **minh-anh** (neutral): Thư lấy ra từ hộp góp ý sáng nay. Mà trường có ba hộp, ở ba giảng đường.
- **ha-vy** (neutral): Bác Tư lao công sáng nào cũng đi cả ba tòa. Hỏi bác là nhanh nhất.

> NHIỆM VỤ: Tìm hộp góp ý đã chứa lá thư

### inv-02 — Hành lang giảng đường {scene: corridor-b}

> NHIỆM VỤ: Hỏi bác Tư, xem xét hộp góp ý

- [DÀN DỰNG] Cảnh hành lang: bác Tư (chân dung nhỏ) đang lau sàn cạnh hộp góp ý. Biển "Giảng đường B" nhỏ trên tường, không nhấn mạnh. Hai điểm xem xét, chọn theo thứ tự nào cũng được.
- **narrator**: Hành lang giảng đường. Bác Tư đang lau sàn cạnh một hộp góp ý.
- [ĐIỂM XEM XÉT hs-bac-tu] nhãn: "Bác Tư" · mở manh mối: clue-box-building-b · chạy chuỗi: inv-bac-tu
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

---

## Phần 3 — Phân tích dữ liệu {part: analysis}

(đang viết)

---

## Phần 4 — Giải trình {part: debrief}

(đang viết)

---

## Phần 5 — Kết {part: ending}

(đang viết)

---

## Nội dung thử thách

(đang viết)

---

## Hồ sơ vật chứng

(đang viết)

---

## Tự kiểm

(đang viết)
