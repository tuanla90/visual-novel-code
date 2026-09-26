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
- `[HIỆN TÀI LIỆU <mã tài liệu>]`: hiện tài liệu đó (hình và chữ, xem mục Hồ sơ vật chứng) và thêm vào Hồ sơ.
- `[HỎI]` và `[CHỌN DÒNG]`: chọn sai → hiện phản hồi của lựa chọn đó, cho chọn lại, không phạt. Chọn đúng → hiện phản hồi rồi đi tiếp dòng kế.
- Lựa chọn của `[HỎI]`: `(A) {id: <id lựa chọn>} <lời lựa chọn> [ĐÚNG] → phản hồi: …`. Chữ (A), (B)… chỉ là nhãn khi viết, không hiển thị. Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; telemetry ghi `<mã câu hỏi>:<id lựa chọn>` (QĐ-035).
- `[THỬ THÁCH <mã>]` và `[SỬA TRUY VẤN <mã>]`: mở màn truy vấn theo thẻ cùng mã ở mục "Nội dung thử thách". Người chơi lưu vật chứng xong thì đi tiếp dòng kế.
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
  - (A) {id: ho} Họ, vì trong họ tên, họ đứng đầu tiên. → phản hồi: **ha-vy** (neutral): Họ đứng đầu thật. Nhưng người Việt được gọi bằng tên, và cũng hay ký bằng tên.
  - (B) {id: ten} Tên gọi, vì người Việt hay ký bằng tên. [ĐÚNG] → phản hồi: **ha-vy** (smile): Mình cũng nghĩ thế. Mình ký "Vy.", có bao giờ ký "Lê." đâu.
  - (C) {id: ma-lop} Mã lớp, vì giấy tờ ở trường hay ghi mã lớp. → phản hồi: **ha-vy** (neutral): Mã lớp thì ai lại ký tay. Thử nghĩ xem cậu hay ký bằng chữ gì.
- [DÀN DỰNG] Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; chữ (A)/(B)/(C) chỉ là nhãn khi viết, không hiển thị; telemetry ghi id lựa chọn (QĐ-035).
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

### ana-01 — Mở dữ liệu {scene: clb-room}

> NHIỆM VỤ: Tìm sinh viên có tên bắt đầu bằng H

- **narrator**: Về phòng CLB. Laptop đã mở sẵn trình dựng truy vấn, nối vào view dữ liệu.
- **minh-anh** (neutral): Ba manh mối rồi. Giờ đến lượt hỏi dữ liệu.
- **ha-vy** (neutral): View có hai bảng: sinh_vien và lop_sinh_hoat. Bắt đầu từ manh mối dễ nhất: chữ H.
- **ha-vy** (smile): Lần đầu thì mình chỉ từng bước. Chạy sai cứ chạy lại, bao nhiêu lần cũng được.
- [THỬ THÁCH c1]
- [ĐI TỚI ana-c2-intro]

### ana-c2-intro — Manh mối tòa B {scene: clb-room}

> NHIỆM VỤ: Tìm các lớp sinh hoạt ở giảng đường B

- **minh-anh** (worried): Mười người. Đi hỏi từng người thì hết buổi mất.
- **ha-vy** (thinking): Thêm manh mối tòa B vào. Nhưng bảng sinh_vien không có cột tòa nhà.
- **ha-vy** (neutral): Mở bảng mô tả cột ra xem. Cột tòa nhà nằm ở bảng nào?
- [DÀN DỰNG] Ô FROM để trống như mọi thử thách (QĐ-016): chọn đúng bảng là việc của người chơi.
- [THỬ THÁCH c2]
- [ĐI TỚI ana-c3-intro]

### ana-c3-intro — Ghép ba manh mối {scene: clb-room}

> NHIỆM VỤ: Tìm người khớp cả ba manh mối

- **ha-vy** (neutral): KT24A và QT24B. Hai mã lớp này giờ cũng là manh mối.
- **minh-anh** (neutral): Chữ ký, tòa B, bookmark. Ai khớp cả ba?
- [DÀN DỰNG] Mục "Từ manh mối" của trình dựng lúc này có: `H` (chữ ký), danh sách `KT24A, QT24B` (vật chứng ev-c2-classes-b), `Báo chí` (bookmark) — QĐ-017.
- [THỬ THÁCH c3]
- [ĐI TỚI ana-c3-done]

### ana-c3-done — "Tìm ra rồi!" {scene: clb-room}

- **minh-anh** (happy): Hai người! Tìm ra rồi! Gửi Phòng CTSV ngay thôi!
- **narrator**: Điện thoại Minh Anh rung. Tin nhắn từ Phòng CTSV.
- **minh-anh** (worried): "Trước khi CTSV liên hệ ai, Ban Pháp chế – Kiểm tra Hội sinh viên sẽ thẩm tra cách CLB dùng dữ liệu."
- **ha-vy** (thinking): Ban của anh Quân. Người gọi CLB mình là "hội trinh thám nghiệp dư".
- **minh-anh** (worried): Mười lăm phút nữa, ở phòng giải trình. Mang theo hồ sơ.
- [DÀN DỰNG] Không nhân vật nào nói hai dòng này là gì trước màn giải trình (QĐ-023). Hà Vy không sửa câu "Tìm ra rồi!" của Minh Anh.

> NHIỆM VỤ: Đến phòng giải trình

- [ĐIỀU KIỆN QUA] cần: ev-c3-shortlist → nút "Nhiệm vụ tiếp theo →" sang deb-01

---

## Phần 4 — Giải trình {part: debrief}

### deb-01 — Ban Pháp chế thẩm tra {scene: debrief-room}

> NHIỆM VỤ: Trình bày cách CLB dùng dữ liệu

- [DÀN DỰNG] Cảnh phòng giải trình (tông lạnh). Quân ngồi một bên bàn, hồ sơ xếp thẳng mép. Minh Anh, Hà Vy, người chơi ngồi bên kia. Màn chiếu sau lưng Quân. Bước 1 của QĐ-024.
- **quan** (neutral): Tôi là Quân, Ban Pháp chế – Kiểm tra Hội sinh viên. Tôi không xét nội dung lá thư.
- **quan** (neutral): CLB là bên bị đề nghị thu hồi phòng, lại tự tra người bỏ thư. Tôi cần xem CLB dùng dữ liệu thế nào.
- **quan** (smug): Dữ liệu không nói dối. Nhưng người đọc dữ liệu thì có.
- **quan** (neutral): Tôi đã tự chạy lại ba manh mối của CLB, trên đúng view CLB được cấp.
- [DÀN DỰNG] Màn chiếu hiện truy vấn của Quân nguyên văn (5 dòng, §4.4), chạy thật trên dataset chính: bảng kết quả 24 dòng, dòng đếm "24 dòng" (QĐ-012).

```sql
SELECT ma_sv, ho_dem, ten, ma_lop, clb
FROM sinh_vien
WHERE ten LIKE 'H%'
   OR ma_lop IN ('KT24A', 'QT24B')
   OR clb = 'Báo chí';
```

- **quan** (smug): Hai mươi tư người, hơn nửa số sinh viên trong view. Manh mối kiểu này thì vô dụng.
- **quan** (neutral): Vậy danh sách hai người của CLB từ đâu ra?
- **minh-anh** (worried): Hai mươi tư? Cùng ba manh mối mà sao lệch nhiều thế…
- **ha-vy** (thinking): Có gì đó sai. Đọc kỹ từng dòng truy vấn của anh ấy.

> NHIỆM VỤ: Chỉ ra dòng lỗi trong truy vấn của Quân

- [DÀN DỰNG] Bước 2 của QĐ-024. Năm dòng SQL trên màn chiếu thành năm vùng chạm được. Dòng 4 và dòng 5 đều đúng (cùng một lỗi `OR`). Chạm sai không phạt, không giới hạn số lần.
- [CHỌN DÒNG q-quan-lines]

| dòng | SQL | đúng? | phản hồi (speaker, biểu cảm, lời) |
|---|---|---|---|
| 1 | `SELECT ma_sv, ho_dem, ten, ma_lop, clb` | không | **quan** (neutral): Đủ cột cả: mã, họ tên, lớp, câu lạc bộ. <br> **ha-vy** (thinking): Cột thì ổn. Xem anh ấy nối ba manh mối bằng từ gì: "và" hay "hoặc"? |
| 2 | `FROM sinh_vien` | không | **quan** (neutral): Người cần tìm nằm trong bảng này. Không sai. <br> **ha-vy** (thinking): Bảng thì đúng. Xem anh ấy nối ba manh mối bằng từ gì: "và" hay "hoặc"? |
| 3 | `WHERE ten LIKE 'H%'` | không | **quan** (neutral): Điều kiện này lấy đúng từ chữ ký CLB đưa ra. <br> **ha-vy** (thinking): Điều kiện này đúng. Xem nó được nối với hai điều kiện kia bằng từ gì. |
| 4 | `OR ma_lop IN ('KT24A', 'QT24B')` | ĐÚNG | (không có; đi tiếp dòng kế) |
| 5 | `OR clb = 'Báo chí';` | ĐÚNG | (không có; đi tiếp dòng kế) |

- [ĐI TỚI deb-02]

### deb-02 — Có số liệu đây: bất kỳ hay đồng thời {scene: debrief-room}

- [HIỆU ỨNG co-so-lieu-day]
- [DÀN DỰNG] Bước 3 của QĐ-024, lần dùng hiệu ứng thứ nhất (QĐ-025).
- **player**: Anh nối ba manh mối bằng OR. Chỉ cần khớp một manh mối là đã vào danh sách.
- **player**: Tên bắt đầu bằng H, hoặc học lớp tòa B, hoặc ở CLB Báo chí. Bảo sao ra 24 người.
- **player**: Người bỏ thư phải khớp cả ba cùng lúc. Phải nối bằng AND.
- **quan** (stunned): …
- **quan** (neutral): Nói thì dễ. Sửa ngay trên truy vấn của tôi, rồi chạy cho mọi người cùng xem.

> NHIỆM VỤ: Sửa truy vấn của Quân và chạy lại

- [DÀN DỰNG] Bước 4 của QĐ-024: trình dựng mở với truy vấn của Quân nạp sẵn (thẻ debrief-fix).
- [SỬA TRUY VẤN debrief-fix]
- [ĐI TỚI deb-03]

### deb-03 — Hai dòng nghĩa là gì {scene: debrief-room}

- [HIỆU ỨNG co-so-lieu-day]
- [DÀN DỰNG] Lần dùng hiệu ứng thứ hai, cũng là lần cuối (QĐ-025). Màn chiếu hiện truy vấn đã sửa và kết quả 2 dòng.
- **player**: Vẫn ba manh mối ấy, nối bằng AND: còn hai dòng.
- **quan** (stunned): …Lần này là tôi đọc vội.
- **quan** (neutral): Tôi công nhận truy vấn. Giờ đến câu quan trọng hơn.

> NHIỆM VỤ: Giải thích hai dòng kết quả

- [DÀN DỰNG] Bước 5 của QĐ-024. Đây là lần đầu game hỏi ranh giới giữa nghi vấn và kết luận (QĐ-023).
- [HỎI q-two-rows] quan: "Hai dòng này nghĩa là gì?"
  - (A) {id: tim-ra-roi} Tìm ra rồi: người bỏ thư là một trong hai bạn này. → phản hồi: **ha-vy** (thinking): Hai dòng này cho biết ai cần hỏi tiếp, hay đã đủ để kết luận ai làm?
  - (B) {id: can-xac-minh} Hai người cần xác minh thêm, chưa phải người bỏ thư. [ĐÚNG] → phản hồi: **quan** (neutral): Đúng. Khớp manh mối là một chuyện. Đã bỏ thư là chuyện khác.
  - (C) {id: vo-dung} Chưa nói lên gì, vì manh mối nào cũng có thể trùng hợp. → phản hồi: **ha-vy** (thinking): Từ bốn mươi người còn hai. Thu hẹp được thế là có ích chứ. Nhưng ích đến đâu?
- [DÀN DỰNG] Ba lựa chọn dài 11–13 chữ, cùng giọng thường; lựa chọn `tim-ra-roi` nối tiếp câu "Tìm ra rồi!" của Minh Anh, `vo-dung` nối tiếp kết luận của Quân (QĐ-035). Phản hồi của `tim-ra-roi` là câu gợi ý chuẩn hint-ask-or-conclude (§5.2).
- [DÀN DỰNG] Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; chữ (A)/(B)/(C) chỉ là nhãn khi viết, không hiển thị; telemetry ghi id lựa chọn (QĐ-035). Ghi riêng lựa chọn ĐẦU TIÊN của q-two-rows: đo chỉ số "trả lời đúng rằng kết quả truy vấn chưa tự chứng minh hành vi" (§10).
- [ĐI TỚI deb-04]

### deb-04 — Cú lật: dựa vào đâu? {scene: debrief-room}

- **quan** (neutral): Vậy tôi hỏi thẳng.

> NHIỆM VỤ: Trả lời câu hỏi của Quân

- [DÀN DỰNG] Bước 6 của QĐ-024, cú lật chính (§4.4). Câu hỏi của Quân giữ nguyên văn.
- [HỎI q-verify] quan: "Nếu dữ liệu chưa kết luận được, CLB dựa vào đâu để biết ai đã bỏ thư?"
  - (A) {id: them-dieu-kien} Thêm điều kiện vào truy vấn cho đến khi chỉ còn một dòng. → phản hồi: **quan** (neutral): Thêm điều kiện nào? Không có manh mối đứng sau thì chỉ là cắt cho gọn. Cắt nhầm là mất người thật.
  - (B) {id: chon-dang-ngo} Chọn bạn trông đáng ngờ hơn trong hai bạn để hỏi trước. → phản hồi: **quan** (neutral): Đáng ngờ theo cột nào? Bảng này không có cột "đáng ngờ".
  - (C) {id: goi-ca-hai} Mời cả hai bạn lên, hỏi thẳng xem ai đã bỏ thư. → phản hồi: **minh-anh** (worried): Gọi cả hai lên thì người vô can cũng bị làm phiền. CLB tìm sự thật, không để làm ai bẽ mặt.
  - (D) {id: nguon-doc-lap} Tìm một nguồn khác ngoài dữ liệu để đối chiếu hai bạn này. [ĐÚNG] → phản hồi: **quan** (neutral): Đó là câu tôi chờ. Nguồn nào?
- [DÀN DỰNG] Bốn lựa chọn dài 12–13 chữ, cùng giọng thường. Lựa chọn đúng không nêu nguồn cụ thể: người chơi tự nối với lời bác Tư ở inv-bac-tu (QĐ-035).
- [DÀN DỰNG] Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; chữ (A)…(D) chỉ là nhãn khi viết, không hiển thị; telemetry ghi id lựa chọn (QĐ-035). Ghi riêng lựa chọn ĐẦU TIÊN của q-verify (câu "dữ liệu đã đủ kết luận chưa?", §9.3); cho chọn lại không giới hạn.
- **player**: Cô phụ trách hộp góp ý. Bác Tư bảo sáng nay cô mở hộp B.
- **minh-anh** (neutral): CLB chỉ xin cô đối chiếu đúng hai mã này thôi, không hơn.
- **quan** (neutral): Tôi sẽ chuyển đề nghị ngay.
- [ĐI TỚI end-01]

---

## Phần 5 — Kết {part: ending}

### end-01 — Sổ bàn giao niêm phong {scene: debrief-room}

> NHIỆM VỤ: Đối chiếu với sổ bàn giao

- [DÀN DỰNG] Bước 7 của QĐ-024; theo §2.1, phần Kết bắt đầu từ bước xác minh độc lập. Cô phụ trách hộp góp ý không lên hình, chỉ xuất hiện qua lời kể và tài liệu. Không dùng hiệu ứng "Có số liệu đây!" ở đây: khoảnh khắc này dẫn tới nhân chứng, cần nhẹ nhàng.
- **narrator**: Hai mươi phút sau, cô phụ trách hộp góp ý gửi lên kết quả đối chiếu.
- [HIỆN TÀI LIỆU doc-handover-log]
- **ha-vy** (thinking): Sổ không cho xem tên. Cô chỉ trả lời mã nào có, mã nào không.
- **quan** (neutral): SV240317 có trong sổ. Phòng CTSV sẽ mời bạn ấy lên.
- **quan** (neutral): Nói trước: bạn ấy đến để kể lại, không phải để bị xét.
- [ĐI TỚI end-02]

### end-02 — Người bỏ hộ lá thư {scene: debrief-room}

> NHIỆM VỤ: Nghe nhân chứng kể lại

- [DÀN DỰNG] Hoài xuất hiện lần đầu (một mẫu chân dung, ba biểu cảm), bước vào, ôm balo trước ngực. Không tiêu đề "lời khai", không nhạc thẩm vấn. Không ai gọi Hoài là thủ phạm.
- **hoai** (nervous): Em là Hoài, lớp QT24B. Em… có làm gì sai không ạ?
- **minh-anh** (neutral): Không ai trách em cả. Bọn chị chỉ muốn biết lá thư từ đâu đến.
- **hoai** (downcast): Em không viết thư đó. Em chỉ bỏ hộ thôi ạ.
- **hoai** (downcast): Chiều thứ Sáu, một anh năm cuối đeo huy hiệu Robotics nhờ em. Anh ấy đang vội.
- **hoai** (nervous): Phiếu gửi phải ký và ghi mã. Anh ấy bảo em ký giúp. Em không đọc thư.
- **minh-anh** (neutral): Cảm ơn em. Chuyện ký hộ là quy trình phải sửa, không phải lỗi của em.
- **hoai** (relieved): Dạ… Em cứ tưởng mình bị gọi lên vì làm sai.
- [ĐI TỚI end-03]

### end-03 — Khép buổi làm việc {scene: debrief-room}

- [DÀN DỰNG] Bước 8 của QĐ-024. Hoài cúi chào rồi ra về trước khi Quân nói về người còn lại.
- **quan** (neutral): Bạn Hiếu, SV240228, không có trong sổ. Bạn ấy vô can, CTSV sẽ không liên hệ.
- **quan** (neutral): Tìm được người bỏ thư chưa phải là tìm được người viết thư, CLB Thám Tử.
- **ha-vy** (neutral): Chúng em biết.
- **narrator**: Năm giờ chiều. Quyền xem dữ liệu của CLB hết hạn. Danh sách hai người được hủy.
- [DÀN DỰNG] Thẻ ev-c3-shortlist được gắn chú thích sau giải trình (mục Hồ sơ vật chứng); tên và mã trong thẻ bị làm mờ; nút mở trình dựng truy vấn bị khóa. Quân chứng kiến việc hủy.

> NHIỆM VỤ: Về phòng CLB

- [ĐIỀU KIỆN QUA] cần: doc-handover-log → nút "Nhiệm vụ tiếp theo →" sang end-04

### end-04 — Phòng CLB, chiều muộn {scene: clb-room}

- **minh-anh** (happy): Giá mà còn quyền, chị tra ngay CLB Robotics.
- **ha-vy** (smile): Quyền cấp cho việc này thôi chị. Hết việc là hết quyền.
- **narrator**: SQL giúp thu hẹp điều cần kiểm tra. Bằng chứng và cách diễn giải mới quyết định ta có thể kết luận đến đâu.
- [DÀN DỰNG] Câu trên là thông điệp kết của §4.5, giữ nguyên văn, hiện dạng thẻ chữ lớn giữa màn hình.
- **minh-anh** (happy): Rồi, việc hôm nay xong. Anh năm cuối đeo huy hiệu Robotics… để vụ sau. Em đi tiếp cùng CLB chứ?
- [DÀN DỰNG] Sau `[KẾT THÚC]`, gói khác hiện khảo sát cuối game (QĐ-031); kịch bản này không viết khảo sát.
- [KẾT THÚC]

---

## Nội dung thử thách

### Quy ước thẻ thử thách

- Trình tự một thử thách: (chỉ c1) các bước hướng dẫn → người chơi chạy truy vấn, không giới hạn số lần → khi chạy đúng: khung thành công và lời `[KHI ĐÚNG]` → câu hỏi đọc kết quả `[HỎI]` → nút "Lưu vào hồ sơ" → vật chứng vào Hồ sơ → quay về chuỗi kể chuyện. `debrief-fix` không có câu hỏi đọc kết quả (QĐ-024 đã có).
- `[BƯỚC n · nổi bật: <vùng>]`: bước hướng dẫn của Hà Vy; vùng là `from`, `select`, `where`, `run`, `preview` (nút "Xem 5 dòng đầu"). Bước tự chuyển khi người chơi làm xong thao tác đang nổi bật; không khóa thao tác (QĐ-021).
- `[GỢI Ý n]`: lời cho lần bấm "Hỏi Hà Vy" thứ n (n = 1, 2, 3; bấm thêm thì lặp mức 3). Đếm số lần bấm cho telemetry.
- `[KHI: <mã chẩn đoán>]`: nhận xét tự động khi một lần chạy chưa đúng rơi vào trường hợp đó. Mã chẩn đoán là đề xuất cho gói sql-engine, đổi tên được. Nhiều mã cùng khớp thì ưu tiên theo thứ tự liệt kê trong thẻ.
- `dùng <mã gợi ý chuẩn>`: hiện đúng lời của câu gợi ý chuẩn đó (mục ngay dưới).
- Không có lời phạt, không trừ điểm; chạy sai chỉ nhận một nhận xét theo ý nghĩa (QĐ-018).

### Ba câu gợi ý chuẩn (§5.2) — giọng Hà Vy

- [GỢI Ý CHUẨN hint-any-or-all] **ha-vy** (thinking): Truy vấn này đang lấy cả người chỉ khớp một manh mối. Cậu muốn khớp bất kỳ, hay khớp đồng thời?
  - Dùng khi: c3 hoặc debrief-fix chạy với phép nối `OR` (mã `or-connector`). Không có ở c1, c2 vì chỉ có một điều kiện.
- [GỢI Ý CHUẨN hint-right-columns] **ha-vy** (thinking): Kết quả đã có đúng cột cần để trả lời câu hỏi chưa? Đọc lại đề xem cần những cột nào.
  - Dùng khi: ở bất kỳ thử thách nào, kết quả ra đúng các dòng nhưng thiếu cột bắt buộc (mã `missing-columns`, QĐ-019).
- [GỢI Ý CHUẨN hint-ask-or-conclude] **ha-vy** (thinking): Hai dòng này cho biết ai cần hỏi tiếp, hay đã đủ để kết luận ai làm?
  - Dùng khi: CHỈ ở màn giải trình, là phản hồi khi chọn lựa chọn `tim-ra-roi` ở q-two-rows (deb-03). Không dùng ở c3, không dùng ở bất kỳ đâu trước màn giải trình (QĐ-023).

### Nhận xét chung cho mọi thử thách

- [KHI: not-select] **ha-vy** (neutral): Trong buổi làm việc này CLB chỉ có quyền xem dữ liệu.
- [KHI: syntax-error] **ha-vy** (thinking): Máy chưa đọc được câu lệnh này. Soát lại dấu nháy, dấu phẩy, hoặc quay về trình dựng.
- [KHI: no-table] **ha-vy** (neutral): Hàng FROM còn trống. Mình lấy dữ liệu từ bảng nào?
- [KHI: extra-columns] **ha-vy** (smile): Đúng rồi! Mẹo nhỏ: chỉ cần các cột đề bài hỏi là đủ.
  - Vẫn tính là chạy đúng; lời này thay cho lời `[KHI ĐÚNG]` của thử thách (QĐ-019).
- [KHI: other] **ha-vy** (thinking): Kết quả chưa khớp câu hỏi. So từng điều kiện với manh mối trong hồ sơ xem.

### c1 — Ai có tên bắt đầu bằng H? {challenge: c1}

- Tiêu đề: Thử thách 1 — Ai có tên bắt đầu bằng H?
- Đề bài hiển thị: Trong dữ liệu có những sinh viên nào có tên (tên gọi, không phải họ) bắt đầu bằng chữ H? Kết quả cần có: mã sinh viên, họ đệm, tên.
- Cột bắt buộc: `ma_sv`, `ho_dem`, `ten` · Kết quả chuẩn: 10 dòng (QĐ-012) · Chạy thêm dataset ẩn: có (QĐ-015)
- Manh mối liên quan: clue-signature-h
- Mục tiêu học: `SELECT`, `FROM`, `WHERE`, `LIKE` và ký hiệu `%`.
- SQL chuẩn:

```sql
SELECT ma_sv, ho_dem, ten
FROM sinh_vien
WHERE ten LIKE 'H%';
```

- [BƯỚC 1 · nổi bật: from] **ha-vy** (neutral): Hàng FROM trước: lấy dữ liệu từ bảng nào. Người mình tìm nằm trong bảng sinh_vien.
- [BƯỚC 2 · nổi bật: preview] **ha-vy** (smile): Muốn nhìn bảng trước thì bấm "Xem 5 dòng đầu". Như liếc qua sheet trước khi lọc.
- [BƯỚC 3 · nổi bật: select] **ha-vy** (neutral): Hàng SELECT: chọn cột muốn hiện. Đề bài cần ma_sv, ho_dem và ten.
- [BƯỚC 4 · nổi bật: where] **ha-vy** (neutral): Hàng WHERE là bộ lọc, như nút Filter trong Excel. Chọn cột ten, phép "bắt đầu bằng", giá trị H trong mục "Từ manh mối".
- [BƯỚC 5 · nổi bật: run] **ha-vy** (smile): Bên cạnh là câu SQL tự viết theo lựa chọn của cậu. Dấu % nghĩa là "sau đó là gì cũng được". Bấm Chạy nào!
- [KHI: wrong-column-ho-dem] **ha-vy** (thinking): Cậu đang lọc theo cột ho_dem. Chữ ký thường là tên gọi, tức cột ten.
- [KHI: like-ends-with] **ha-vy** (thinking): "Kết thúc bằng H" sẽ bắt cả những tên như Linh, Thanh. Trên chữ ký, H đứng đầu.
- [KHI: like-contains] **ha-vy** (thinking): "Chứa H" bắt cả tên có chữ h ở giữa. Mình chỉ cần H đứng đầu tên.
- [KHI: no-filter] **ha-vy** (neutral): Đây là cả bảng, chưa lọc gì. Như mở sheet mà chưa bật Filter.
- [KHI: hardcoded-ids] **ha-vy** (thinking): Truy vấn này gọi thẳng mã sinh viên, tức là đi từ đáp án. Hãy lọc bằng manh mối.
- [KHI: limit-used] **ha-vy** (thinking): LIMIT chỉ cắt bớt số dòng, không lọc theo manh mối.
- [KHI: missing-columns] dùng hint-right-columns
- [GỢI Ý 1] **ha-vy** (neutral): Mình đang tìm người có tên gọi bắt đầu bằng chữ trên chữ ký. Chỉ cần một điều kiện lọc.
- [GỢI Ý 2] **ha-vy** (thinking): Bảng sinh_vien. Lọc cột ten, phép "bắt đầu bằng", giá trị H. Hiện ba cột ma_sv, ho_dem, ten.
- [GỢI Ý 3] **ha-vy** (smile): Gần như đáp án đây: `SELECT ma_sv, ho_dem, ten FROM sinh_vien WHERE ten LIKE 'H%';`
- [KHI ĐÚNG] **ha-vy** (smile): Truy vấn đầu tiên của cậu đấy! Mười dòng, đúng như bộ lọc.
- [HỎI q-c1-read] ha-vy: "Mười dòng này là những ai?"
  - (A) {id: chua-h} Những người có chữ H trong họ tên. → phản hồi: **ha-vy** (thinking): 'H%' chỉ khớp khi H đứng đầu. H ở giữa hay ở cuối đều không tính.
  - (B) {id: ten-h} Những người có tên gọi bắt đầu bằng H. [ĐÚNG] → phản hồi: **ha-vy** (smile): Chuẩn. Cột ten, H đứng đầu, phía sau là gì cũng được.
  - (C) {id: ho-h} Những người có họ bắt đầu bằng H. → phản hồi: **ha-vy** (thinking): Điều kiện đặt ở cột ten, không phải ho_dem. Người họ Hoàng mà tên Lan sẽ không có ở đây.
- [DÀN DỰNG] Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; chữ (A)/(B)/(C) chỉ là nhãn khi viết, không hiển thị; telemetry ghi id lựa chọn (QĐ-035).
- Vật chứng lưu vào hồ sơ: ev-c1-names-h
  - Tiêu đề: Sinh viên có tên bắt đầu bằng H
  - Mô tả: 10 dòng từ bảng `sinh_vien`, lọc `ten LIKE 'H%'`. Nguồn: truy vấn của bạn ở thử thách 1. Thẻ kèm câu SQL đã chạy và bảng kết quả.

### c2 — Lớp nào sinh hoạt ở giảng đường B? {challenge: c2}

- Tiêu đề: Thử thách 2 — Lớp nào sinh hoạt ở giảng đường B?
- Đề bài hiển thị: Những lớp sinh hoạt nào thuộc giảng đường B? Kết quả cần có: mã lớp.
- Cột bắt buộc: `ma_lop` · Kết quả chuẩn: 2 dòng, `KT24A` và `QT24B` (QĐ-011, QĐ-012) · Chạy thêm dataset ẩn: không (QĐ-015)
- Manh mối liên quan: clue-box-building-b
- Mục tiêu học: chọn đúng bảng, chọn đúng cột; kết quả của một truy vấn có thể thành đầu vào cho câu hỏi tiếp theo.
- SQL chuẩn:

```sql
SELECT ma_lop
FROM lop_sinh_hoat
WHERE toa_nha = 'B';
```

- [KHI: wrong-table] **ha-vy** (thinking): Bảng sinh_vien không có cột tòa nhà. Xem bảng mô tả cột: toa_nha nằm ở bảng nào?
- [KHI: class-prefix] **ha-vy** (thinking): Mã lớp có chữ B chưa chắc sinh hoạt ở tòa B. Tòa nhà nằm ở cột toa_nha.
- [KHI: no-filter] **ha-vy** (neutral): Đây là cả tám lớp. Lọc lại, chỉ giữ lớp ở tòa B thôi.
- [KHI: wrong-value] **ha-vy** (neutral): Soát lại giá trị tòa nhà. Bác Tư nói hộp được mở ở giảng đường B.
- [KHI: missing-columns] dùng hint-right-columns
- [GỢI Ý 1] **ha-vy** (neutral): Mình cần biết lớp nào sinh hoạt ở tòa B, để lát nữa lọc sinh viên theo lớp.
- [GỢI Ý 2] **ha-vy** (thinking): Bảng lop_sinh_hoat có cột toa_nha. Lọc toa_nha bằng B, rồi hiện cột ma_lop.
- [GỢI Ý 3] **ha-vy** (smile): Gần như đáp án: `SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B';`
- [KHI ĐÚNG] **ha-vy** (smile): KT24A và QT24B. Hai lớp sinh hoạt ở tòa B.
- [HỎI q-c2-read] ha-vy: "Hai mã lớp này dùng để làm gì tiếp?"
  - (A) {id: loc-sinh-vien} Làm điều kiện lọc lớp trong bảng sinh_vien. [ĐÚNG] → phản hồi: **ha-vy** (smile): Đúng. Kết quả của truy vấn này thành đầu vào cho truy vấn sau.
  - (B) {id: dem-toa-b} Đếm xem tòa B có bao nhiêu sinh viên. → phản hồi: **ha-vy** (thinking): Bảng lớp không chứa sinh viên. Muốn biết ai, phải mang hai mã này sang bảng sinh_vien.
  - (C) {id: bo-qua} Bỏ qua, vì bảng sinh_vien không có tòa nhà. → phản hồi: **ha-vy** (thinking): Không có cột tòa nhà, nhưng có cột ma_lop. Hai mã này chính là cầu nối.
- [DÀN DỰNG] Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; chữ (A)/(B)/(C) chỉ là nhãn khi viết, không hiển thị; telemetry ghi id lựa chọn (QĐ-035).
- Vật chứng lưu vào hồ sơ: ev-c2-classes-b
  - Tiêu đề: Lớp sinh hoạt ở giảng đường B
  - Mô tả: 2 dòng: `KT24A`, `QT24B`. Từ bảng `lop_sinh_hoat`, lọc `toa_nha = 'B'`. Dùng làm giá trị "Từ manh mối" cho điều kiện lớp ở thử thách 3.

### c3 — Ai khớp cả ba manh mối? {challenge: c3}

- Tiêu đề: Thử thách 3 — Ai khớp cả ba manh mối?
- Đề bài hiển thị: Ai đồng thời khớp cả ba manh mối: tên bắt đầu bằng H, học một lớp sinh hoạt ở giảng đường B, thuộc CLB Báo chí? Kết quả cần có: mã sinh viên, họ đệm, tên. Nên thêm lớp và câu lạc bộ để dễ đối chiếu.
- Cột bắt buộc: `ma_sv`, `ho_dem`, `ten` (khuyến khích thêm `ma_lop`, `clb`) · Kết quả chuẩn: 2 dòng — Lê Thị Hoài, SV240317, QT24B, Báo chí; Phạm Minh Hiếu, SV240228, KT24A, Báo chí (QĐ-011, QĐ-012) · Chạy thêm dataset ẩn: có (QĐ-015)
- Manh mối liên quan: clue-signature-h, clue-box-building-b (qua ev-c2-classes-b), clue-bookmark-baochi
- Mục tiêu học: `AND`, `IN` và ý nghĩa của việc thỏa đồng thời nhiều điều kiện.
- SQL chuẩn:

```sql
SELECT ma_sv, ho_dem, ten, ma_lop, clb
FROM sinh_vien
WHERE ten LIKE 'H%'
  AND ma_lop IN ('KT24A', 'QT24B')
  AND clb = 'Báo chí';
```

- [KHI: or-connector] dùng hint-any-or-all
- [KHI: missing-condition] **ha-vy** (thinking): Vẫn còn nhiều người hơn mình nghĩ. Soát lại xem đủ ba manh mối chưa: chữ ký, tòa B, bookmark.
- [KHI: class-prefix] **ha-vy** (thinking): Mã lớp có chữ B chưa chắc ở tòa B. Dùng đúng danh sách lớp từ thử thách 2.
- [KHI: wrong-column-ho-dem] **ha-vy** (thinking): Cậu đang lọc theo cột ho_dem. Chữ ký thường là tên gọi, tức cột ten.
- [KHI: like-ends-with] **ha-vy** (thinking): "Kết thúc bằng H" sẽ bắt cả những tên như Linh, Thanh. Trên chữ ký, H đứng đầu.
- [KHI: like-contains] **ha-vy** (thinking): "Chứa H" bắt cả tên có chữ h ở giữa. Mình chỉ cần H đứng đầu tên.
- [KHI: hardcoded-ids] **ha-vy** (thinking): Truy vấn này gọi thẳng mã sinh viên, tức là đi từ đáp án. Hãy lọc bằng manh mối.
- [KHI: limit-used] **ha-vy** (thinking): LIMIT chỉ cắt bớt số dòng, không lọc theo manh mối.
- [KHI: missing-columns] dùng hint-right-columns
- [GỢI Ý 1] **ha-vy** (neutral): Ghép cả ba manh mối vào một truy vấn: chữ ký, tòa B, bookmark. Người cần tìm phải khớp hết.
- [GỢI Ý 2] **ha-vy** (thinking): Bảng sinh_vien, ba điều kiện: ten bắt đầu bằng H; ma_lop thuộc danh sách lớp tòa B; clb bằng Báo chí. Như lọc ba cột cùng lúc trong Excel.
- [GỢI Ý 3] **ha-vy** (smile): Gần như đáp án: `SELECT ma_sv, ho_dem, ten, ma_lop, clb FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí';`
- [KHI ĐÚNG] **ha-vy** (smile): Ba manh mối, một truy vấn, hai dòng.
- [HỎI q-c3-read] ha-vy: "Vì sao chỉ còn 2 dòng?"
  - (A) {id: chi-hai-ten-h} Vì LIKE 'H%' chỉ tìm được hai người tên H. → phản hồi: **ha-vy** (thinking): Thử thách 1 ra mười người tên H cơ mà. Có gì đó đã lọc bớt họ.
  - (B) {id: in-ca-hai-lop} Vì IN chỉ lấy người thuộc cả hai lớp một lúc. → phản hồi: **ha-vy** (thinking): IN nghĩa là thuộc một lớp bất kỳ trong danh sách. Mỗi người chỉ học một lớp thôi.
  - (C) {id: and-dong-thoi} Vì AND giữ người khớp cả ba điều kiện cùng lúc. [ĐÚNG] → phản hồi: **ha-vy** (smile): Đúng. Như bật Filter ở ba cột cùng lúc: trượt một cột là rơi khỏi bảng.
- [DÀN DỰNG] Câu hỏi này chỉ hỏi ý nghĩa của `AND`; lựa chọn `in-ca-hai-lop` là một hiểu nhầm hay gặp về `IN`. Không lựa chọn và không phản hồi nào nói hai dòng là nghi vấn hay bằng chứng (QĐ-023).
- [DÀN DỰNG] Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; chữ (A)/(B)/(C) chỉ là nhãn khi viết, không hiển thị; telemetry ghi id lựa chọn (QĐ-035).
- Vật chứng lưu vào hồ sơ: ev-c3-shortlist
  - Tiêu đề: Người khớp cả ba manh mối
  - Mô tả: 2 dòng: Lê Thị Hoài — SV240317 — QT24B — Báo chí; Phạm Minh Hiếu — SV240228 — KT24A — Báo chí. Truy vấn: `ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí'`. Chú thích gắn sau màn giải trình: xem mục Hồ sơ vật chứng.

### debrief-fix — Sửa truy vấn của Quân {challenge: debrief-fix}

- Tiêu đề: Sửa truy vấn của Quân
- Đề bài hiển thị: Truy vấn của Quân đã nạp sẵn. Sửa để chỉ lấy những người khớp đồng thời cả ba manh mối, rồi chạy. Kết quả cần có: mã sinh viên, họ đệm, tên (giữ lớp và câu lạc bộ để đối chiếu).
- Cột bắt buộc: `ma_sv`, `ho_dem`, `ten` · Kết quả chuẩn: 2 dòng, giống c3 · Chạy thêm dataset ẩn: có (QĐ-015)
- Nạp sẵn vào trình dựng: `FROM sinh_vien`; `SELECT ma_sv, ho_dem, ten, ma_lop, clb`; ba điều kiện của §4.4; phép nối chung `OR` (QĐ-016).
- Manh mối liên quan: clue-signature-h, clue-box-building-b (qua ev-c2-classes-b), clue-bookmark-baochi
- Mục tiêu học: `OR` lấy người thỏa bất kỳ điều kiện nào; `AND` lấy người thỏa đồng thời mọi điều kiện.
- SQL chuẩn:

```sql
SELECT ma_sv, ho_dem, ten, ma_lop, clb
FROM sinh_vien
WHERE ten LIKE 'H%'
  AND ma_lop IN ('KT24A', 'QT24B')
  AND clb = 'Báo chí';
```

- [KHI: or-connector] dùng hint-any-or-all
- [KHI: missing-condition] **ha-vy** (thinking): Bớt một manh mối thì danh sách lại rộng ra. Giữ đủ ba điều kiện, chỉ đổi cách nối.
- [KHI: hardcoded-ids] **ha-vy** (thinking): Truy vấn này gọi thẳng mã sinh viên, tức là đi từ đáp án. Hãy lọc bằng manh mối.
- [KHI: limit-used] **ha-vy** (thinking): LIMIT chỉ cắt bớt số dòng, không lọc theo manh mối.
- [KHI: missing-columns] dùng hint-right-columns
- [GỢI Ý 1] **ha-vy** (neutral): Truy vấn của anh Quân lấy cả người chỉ khớp một manh mối. Mình cần người khớp cả ba.
- [GỢI Ý 2] **ha-vy** (thinking): Giữ nguyên ba điều kiện. Chỉ đổi phép nối giữa chúng: bấm vào chữ OR để đổi cả loạt.
- [GỢI Ý 3] **ha-vy** (smile): Đổi OR thành AND: `WHERE ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT24B') AND clb = 'Báo chí'`.
- [KHI ĐÚNG] **ha-vy** (smile): Hai dòng. Đưa lên màn chiếu đi!
- Vật chứng lưu vào hồ sơ: ev-quan-fixed
  - Tiêu đề: Truy vấn của Quân, đã sửa
  - Mô tả: Cùng ba điều kiện, đổi `OR` thành `AND`: từ 24 dòng còn 2 dòng. Thẻ kèm hai câu SQL (trước và sau khi sửa) và số dòng của mỗi câu.

---

## Hồ sơ vật chứng

(đang viết)

---

## Tự kiểm

(đang viết)
