# Tham khảo cảm hứng kịch bản — CLB Thám Tử Dữ Liệu

> **Loại tài liệu:** Kho tham khảo và gợi ý sáng tác, không phải đặc tả, canon, quy tắc thực thi, checklist hay yêu cầu bắt buộc dành cho sub-agent/biên kịch.
>
> Các mô-típ và ví dụ dưới đây chỉ để khơi gợi cách nghĩ. Có thể bỏ, biến đổi hoặc thay thế chúng. Không lấy tên, tình tiết, câu thoại hay cấu trúc từ tác phẩm tham khảo làm nội dung của game. Khi một ý tưởng được chọn để đưa vào dự án, cần thiết kế lại cho phù hợp với thế giới, nhân vật, gameplay và dữ liệu của game.

## Cách dùng kho tham khảo

- Tài liệu này **không quyết định** hướng thiết kế của game và không được dùng để ghi đè tài liệu chuẩn.
- Với các quyết định đã được chốt, hãy tra [Bàn giao hướng thiết kế mới](ban-giao-huong-moi-2026-09-30.md). Với thông tin thế giới và nhân vật chung, tra [Tổng quan Vũ trụ Chấn Hưng](vu-tru-chan-hung-tong-quan.md). Nội dung đang chạy và cấu trúc tệp nằm trong README của từng bộ nội dung.
- Những vụ việc trong tài liệu là **phác thảo chưa kiểm chứng**, không phải cốt truyện đã duyệt. Không mặc định chúng thuộc mùa hiện tại, không đưa thẳng vào kịch bản hoặc dữ liệu mà chưa đối chiếu hướng thiết kế đang có.
- Các nhận xét về tác phẩm là tóm lược/diễn giải để trao đổi ý tưởng, không phải trích dẫn nguyên văn. Tên tác phẩm, nhân vật và tình tiết thuộc về tác giả/chủ sở hữu tương ứng.

## Một số hướng gợi ý

### Bí ẩn nhỏ từ sinh hoạt thường ngày

Các chuyện vụn vặt có thể trở nên thú vị khi người điều tra để ý đến một thói quen, thời điểm, cách dùng đồ vật hoặc lời kể tưởng như không đáng kể. Hướng này gợi nhớ đến chất đời thường trong *Hyouka* và *Shōshimin Series* của Honobu Yonezawa.

Một số chất liệu để phát triển theo cách riêng:

- Một vật thường xuyên được mượn hoặc đặt sai chỗ.
- Một món ăn, đồ uống hoặc đồ dùng xuất hiện không đúng như dự đoán.
- Một chuỗi sự việc lặp lại theo thứ tự hoặc thời gian đáng chú ý.
- Nhiều cách giải thích cùng phù hợp với một phần manh mối, nhưng cần thêm thông tin để phân biệt.

Đây là chất liệu gợi ý, không phải danh sách vụ án của game. Riêng các ví dụ thường được nhắc đến trong *Hyouka* và *Shōshimin* có thể bị nhớ sai hoặc giản lược; hãy kiểm tra tác phẩm nếu cần mô tả tình tiết cụ thể.

### Lịch sử và dấu vết

Một đồ vật, hồ sơ hoặc hệ thống lưu lại lịch sử của người đã dùng nó. Hướng này có thể gợi ý cho các bài toán về nguồn gốc, trình tự, phiên bản hoặc dấu vết số:

- Nhật ký mượn/trả, ra vào hoặc sử dụng thiết bị.
- Dữ liệu sửa đổi, phiên bản cũ và tên gọi đã thay đổi.
- Thời gian tạo, in, gửi hoặc cập nhật một bản ghi.
- Dấu hiệu vật lý đi cùng dữ liệu hệ thống.

*Biblia Koshodou no Jiken Techou* gợi ý cách kể chuyện xoay quanh lịch sử và đặc điểm của sách cũ. Việc chuyển một mô-típ như vậy sang dữ liệu số chỉ là một khả năng, không phải mô hình bắt buộc.

### Tranh luận bằng chứng và cách đọc dữ liệu

Một cuộc tranh luận có thể xoay quanh việc hai người đọc cùng dữ liệu nhưng dùng giả định, phạm vi lọc hoặc cách nhóm khác nhau. Có thể lấy đây làm điểm khởi đầu để nghĩ về điều kiện SQL, thứ tự ưu tiên `AND`/`OR`, `JOIN`, tổng hợp hoặc cách trình bày số liệu.

Điểm cần giữ trong thiết kế là phân biệt rõ:

- dữ liệu quan sát được;
- giả định dùng để diễn giải dữ liệu;
- kết luận mà dữ liệu thực sự hỗ trợ;
- điều còn chưa thể kết luận.

Đây là gợi ý về cấu trúc lập luận, không phải quy tắc rằng mọi vụ đều phải có rival, buổi đối chất hoặc một query sai.

## Phôi ý tưởng chưa duyệt

Các mục sau là ví dụ để khơi gợi. Chúng chưa có dữ liệu, lời giải hay tình tiết đủ chặt để dùng trực tiếp.

### Suất ăn và bản ghi thanh toán

Một căn tin thấy số suất ăn, lượt quẹt thẻ và doanh thu không khớp như dự kiến. Có thể khai thác sự khác nhau giữa các khái niệm như suất đã chuẩn bị, suất đã bán, giao dịch được ghi nhận và lượt hoàn tiền. Trước khi phát triển, cần xác định chính xác mỗi bảng ghi điều gì và thiết kế dữ liệu đủ để phân biệt các giả thuyết.

### Phòng tự học bị đặt kín

Lịch đặt phòng cho thấy nhiều lượt giữ chỗ vào cùng một thời điểm, nhưng cách sử dụng thực tế không rõ. Dữ liệu đặt phòng có thể đối chiếu với một nguồn độc lập, miễn là nguồn đó thật sự cho biết điều cần kiểm tra và có khóa/thời gian nối hợp lý. Riêng số lượt đặt nhanh không tự nó chứng minh có bot hoặc người đặt không có mặt.

### Ba báo cáo cho cùng một khoản chi

Ba báo cáo cho kết quả khác nhau dù dùng chung dữ liệu nguồn. Có thể dùng để khám phá phạm vi lọc, điều kiện logic, phép cộng trùng hoặc cách phân loại. Cần dựng dữ liệu mẫu và tính từng kết quả để bảo đảm mỗi báo cáo có nguyên nhân khác nhau, có thể giải thích và kiểm chứng.

### Hồ sơ cũ và tên phòng đã đổi

Một ghi chú cũ nhắc đến mã phòng không còn dùng. Bảng lịch sử cơ sở vật chất có thể giúp nối mã cũ với mã mới, nếu dự án chọn hướng truyện này và dữ liệu cung cấp bằng chứng đủ rõ. “Hồ sơ bí mật”, tài liệu dưới tầng hầm hay việc giữ lại phòng CLB chỉ là các khả năng hư cấu, chưa phải canon.

## Ghi chú tham khảo tác phẩm

- *Hyouka* / loạt *Koten-bu* — Honobu Yonezawa: gợi ý về bí ẩn học đường, quan sát chi tiết và lịch sử CLB. “Hyouka” chơi chữ giữa 氷菓 (kem/đồ lạnh) và “I scream”; không dịch thành “băng điểm”. Vụ Juumonji dựa trên thứ tự gojūon tiếng Nhật, không chỉ là bảng chữ cái Latin.
- *Shōshimin Series* — Honobu Yonezawa: gợi ý về những điều bất thường trong sinh hoạt thường ngày. Các ví dụ cụ thể nên được kiểm tra theo đúng tập truyện/phần phim trước khi nhắc lại.
- *Biblia Koshodou no Jiken Techou* — En Mikami: gợi ý về việc vật phẩm và lịch sử của sách chứa manh mối. Đây không phải bằng chứng rằng mọi vụ cần giải bằng metadata.
- *Classroom of the Elite* — Shōgo Kinugasa: có thể gợi ý về cơ chế điểm và đấu trí, nhưng không nên mô tả tác phẩm là hoàn toàn không có bạo lực/đe dọa. Chỉ tham khảo khía cạnh phù hợp với hướng game.
- *Liar Game* — Shinobu Kaitani: có thể gợi ý về cách trình bày số liệu, chiến lược và phát hiện giả định sai. Tránh bê nguyên luật chơi, tình tiết hoặc cấu trúc của tác phẩm.

## Từ ý tưởng đến nội dung dự án

Đây là gợi ý làm việc, không phải checklist bắt buộc:

1. Chọn một chất liệu khiến mình tò mò; chưa cần chốt thủ phạm hay kết luận.
2. Nghĩ xem người chơi có thể quan sát được gì ngoài đời và dữ liệu có thể xác nhận điều gì.
3. Tạo một ví dụ dữ liệu nhỏ để kiểm tra xem các giả thuyết có thể được phân biệt bằng chứng cứ hay không.
4. Tra tài liệu dự án hiện hành để bảo đảm ý tưởng khớp bối cảnh, nhân vật, cách chơi và phạm vi công việc.
5. Chỉ sau khi chọn phát triển, mới chuyển ý tưởng thành đề xuất/kịch bản và các dữ liệu tương ứng theo quy trình dự án.

Nếu ý tưởng mâu thuẫn với tài liệu đã chốt, hãy xem đó là một ý tưởng cần sửa hoặc đề xuất xem xét lại; bản tham khảo này không phải căn cứ để tự đổi quyết định.
