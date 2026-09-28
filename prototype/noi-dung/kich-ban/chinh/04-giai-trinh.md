## Phần 4 — Giải trình {part: debrief}

### deb-01 — Ban Pháp chế thẩm tra {scene: debrief-room}

> NHIỆM VỤ: Trình bày cách CLB dùng dữ liệu

- [DÀN DỰNG] Cảnh phòng giải trình (tông lạnh). Quân ngồi một bên bàn, hồ sơ xếp thẳng mép. Minh Anh, Hà Vy, người chơi ngồi bên kia. Màn chiếu sau lưng Quân. Bước 1 của QĐ-024.
- **quan** (neutral): Tôi là Quân, Ban Pháp chế – Kiểm tra Hội sinh viên. Tôi không xét nội dung lá thư.
- **quan** (neutral): CLB là bên bị đề nghị thu hồi phòng, lại tự tra người bỏ thư. Tôi cần xem CLB dùng dữ liệu thế nào.
- **quan** (smug): Dữ liệu không nói dối. Nhưng người đọc dữ liệu thì có.
- **quan** (neutral): Tôi đã tự chạy lại ba manh mối của CLB, trên đúng view CLB được cấp.
- [DÀN DỰNG] Màn chiếu hiện truy vấn của Quân nguyên văn (5 dòng, §4.4), chạy thật trên dataset chính: bảng kết quả 24 dòng, dòng đếm "24 dòng" (QĐ-012).
- [MÀN CHIẾU proj-quan-or · truy vấn nạp sẵn debrief-fix · chạy · 24 dòng]

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
- [MÀN CHIẾU proj-fixed · vật chứng ev-quan-fixed · chạy · 2 dòng]
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
  - (D) {id: nguon-khac} Tìm một nguồn khác ngoài dữ liệu để đối chiếu hai bạn này. [ĐÚNG] → phản hồi: **quan** (neutral): Đó là câu tôi chờ. Nguồn nào?
- [DÀN DỰNG] Bốn lựa chọn dài 12–13 chữ, cùng giọng thường. Lựa chọn đúng không nêu nguồn cụ thể: người chơi tự nối với lời bác Tư ở inv-bac-tu (QĐ-035).
- [DÀN DỰNG] Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; chữ (A)…(D) chỉ là nhãn khi viết, không hiển thị; telemetry ghi id lựa chọn (QĐ-035). Ghi riêng lựa chọn ĐẦU TIÊN của q-verify (câu "dữ liệu đã đủ kết luận chưa?", §9.3); cho chọn lại không giới hạn.
- **player**: Cô phụ trách hộp góp ý. Bác Tư bảo sáng nay cô mở hộp B.
- **minh-anh** (neutral): CLB chỉ xin cô đối chiếu đúng hai mã này thôi, không hơn.
- **quan** (neutral): Tôi sẽ chuyển đề nghị ngay.
- [ĐI TỚI end-01]
