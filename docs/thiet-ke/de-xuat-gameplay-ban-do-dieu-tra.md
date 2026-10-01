# Đề xuất ý tưởng: gameplay điều tra và bản đồ

> **Trạng thái: đề xuất để thảo luận, chưa được duyệt.** Tài liệu này ghi lại hướng ý tưởng; không ghi đè quyết định đã chốt, không phải yêu cầu triển khai và không thay thế tài liệu thiết kế chuẩn.

## Mục tiêu

Tăng cảm giác người chơi tự điều tra: dùng dữ kiện hiện có để chọn hướng tiếp theo, phát hiện và đánh giá manh mối, rồi mang những gì đã kiểm chứng vào buổi đối chất. Cốt truyện và thông điệp của vụ vẫn được giữ; cách người chơi khám phá và chứng minh có thể linh hoạt hơn.

Song song, làm cho bản đồ trường trở thành nơi người chơi nhìn thấy các lựa chọn điều tra và đi thẳng đến địa điểm tương tác, thay vì phải nhớ địa điểm hoặc tìm chúng qua một chuỗi màn hình.

## 1. Vòng lặp điều tra đề xuất

Người chơi nhận dữ kiện từ hội thoại, cảnh vật hoặc truy vấn, rồi tự hình thành câu hỏi tiếp theo:

1. **Quan sát dữ kiện:** đọc lời kể, xem vật chứng hoặc chạy query.
2. **Đặt giả thuyết:** nhận ra điểm chung, chỗ mâu thuẫn hoặc điều chưa biết.
3. **Chọn hướng:** quyết định địa điểm, nhân vật hoặc câu truy vấn nào có thể xác minh giả thuyết.
4. **Thu thêm manh mối:** thông tin mới có thể củng cố, làm yếu hoặc mở rộng hướng điều tra.
5. **Đánh giá độ chắc chắn:** phân biệt gợi ý, bằng chứng hỗ trợ và bằng chứng đủ mạnh để kết luận.
6. **Đối chất:** dùng bằng chứng thực sự thu thập được để phản hồi các giả thuyết của rival.

Manh mối không tự động chứng minh người cụ thể có lỗi. Ví dụ, nhiều người cùng thỏa điều kiện có thể gợi ra một nhóm hoặc địa điểm; cần thêm nguồn xác minh độc lập trước khi kết luận về một cá nhân.

Không phải vụ nào cũng cần buổi đối chất. Một vụ nhỏ, chẳng hạn tìm lại đồ thất lạc hoặc giải thích một bất thường sinh hoạt, có thể kết thúc ngay khi người chơi tìm ra lời giải. Vụ nhỏ vẫn có thể dạy một kỹ năng query, mở thêm dữ kiện hoặc gieo manh mối cho vụ lớn phía sau. Chỉ dùng đối chất khi có các giả thuyết cần kiểm tra hoặc người chơi cần bảo vệ kết luận bằng bằng chứng.

## 2. Độ mở tăng dần theo tiến trình game

Để giới hạn workload và dạy từng kỹ năng, có thể mở gameplay theo ba nấc:

### Nấc 1 — Đơn tuyến

Một hướng điều tra chính. Người chơi học cách quan sát, đặt query, đọc kết quả và đưa bằng chứng vào lập luận. Có thể có lựa chọn thử, nhưng chúng hội tụ nhanh và không làm mất nội dung cốt lõi.

### Nấc 2 — Song tuyến

Có hai hướng điều tra khả thi. Mỗi hướng dẫn đến manh mối khác nhau hoặc mức độ chắc chắn khác nhau; hai hướng có thể hội tụ về cùng sự thật cốt truyện. Người chơi bắt đầu cân nhắc nên theo hướng nào trước.

### Nấc 3 — Song tuyến lồng

Một hoặc cả hai hướng mở thêm lựa chọn tiếp theo. Manh mối thu được ở nhánh trước có thể mở, đóng hoặc thay đổi lựa chọn sau. Chỉ nên triển khai sau khi đã kiểm nghiệm được nấc song tuyến.

Độ mở có thể ảnh hưởng đến việc người chơi chứng minh được bao nhiêu, nhưng không nhất thiết thay đổi sự thật nền của cốt truyện.

## 3. Kết quả query và phát hiện pattern

Kết quả nhiều dòng có thể tiếp tục được giữ như nguồn tham khảo cho câu truy vấn tiếp theo, thay vì chỉ là màn hình phải đọc hết hoặc bỏ đi.

- Kết quả query có thể trở thành thẻ/danh sách được lưu trong hồ sơ hoặc ghim trên bảng điều tra.
- Danh sách đã lưu có thể được chọn làm nguồn `FROM` cho query sau, để lọc tiếp hoặc tổng hợp dữ liệu từ tập con đã tìm được.
- Bảng/schema gốc cũng có thể xuất hiện dưới dạng thẻ nguồn, giúp người chơi chọn bảng và cột phù hợp.
- Kết quả lớn có thể xem ở dạng tổng quan/hoạt cảnh nhưng không nhất thiết mở hồ sơ chi tiết từng người. Muốn điều tra cá nhân, người chơi cần chọn cột cần thiết bằng `SELECT` và thu hẹp dữ liệu.
- Có thể dùng `GROUP BY` để biến nhiều bản ghi thành một số ít nhóm có ý nghĩa, chẳng hạn nhóm theo lớp, phòng ký túc xá hoặc CLB.
- Hình dạng thẻ biểu thị loại/chức năng; **người chơi được đổi màu từng thẻ**, và có thể đổi màu đường nối để tự nhóm thông tin. Màu là cách tổ chức cá nhân, không được thay thế hình dạng/nhãn làm dấu hiệu loại thẻ.
- Có thể phân biệt ba loại làm việc: **schema/bảng** (nguồn gốc), **danh sách kết quả** (nhiều dòng, có thể dùng tiếp làm nguồn `FROM`), và **note** (các giá trị/cột đã trích chọn, dùng trong điều kiện query).
- Danh sách nhiều dòng vẫn có thể được lưu/ghim làm nguồn query kế tiếp. Khi query thu hẹp kết quả còn **tối đa 3 dòng** và người chơi chọn các cột cần thiết, họ có thể chuyển kết quả thành note/đầu mối nhỏ. Giá trị kiểu `string`, `date`, `int` trong note có thể được kéo vào điều kiện `WHERE`.
- Ngưỡng **tối đa 3 dòng** là giới hạn hệ thống cho bước chuyển kết quả thành một số ít lựa chọn điều tra mới: ghim tối đa vài nhóm/đầu mối để quyết định sẽ đi đâu hoặc xác minh điều gì tiếp. Cốt truyện nên nhắm khoảng **2 lựa chọn ở mức medium**, còn mức hard có thể dùng đủ **3 lựa chọn**.

Ngưỡng này không chặn việc chạy query khám phá hoặc xem pattern. Nó áp dụng cho việc tạo các hướng hành động hữu hạn, để người chơi không phải chọn từ danh sách quá dài. Nếu pattern có hơn ba nhóm, người chơi có thể đổi cách nhóm hoặc thêm điều kiện. Ba là giới hạn tối đa; một nội dung medium thường chỉ nên đưa ra khoảng hai lựa chọn có ý nghĩa.

Một kết quả tổng hợp cho biết nhóm nào đáng chú ý, không chứng minh vì sao nhóm đó có đặc điểm ấy. Lời giải nguyên nhân vẫn cần manh mối thực địa hoặc nguồn độc lập.

### Mô hình thẻ trên bảng điều tra

| Loại thẻ | Vai trò | Dùng tiếp trong query |
|---|---|---|
| Schema/bảng | Cho biết bảng và các cột có sẵn | Có thể kéo vào `FROM` |
| Danh sách kết quả | Lưu tập dòng trả về từ một query; có thể vẫn còn nhiều dòng | Có thể kéo vào `FROM` như nguồn tạm |
| Note | Lưu một số giá trị/cột đã chọn từ kết quả đủ hẹp | Có thể kéo giá trị vào điều kiện `WHERE` |
| Bằng chứng/tài liệu | Vật chứng ngoài query hoặc kết quả đã được diễn giải trong truyện | Dùng để đánh giá giả thuyết; không mặc định là bảng SQL |

Tên và ranh giới chính xác giữa danh sách, note và bằng chứng cần được chốt khi thiết kế UI/dữ liệu. Đổi màu chỉ thay đổi cách người chơi tổ chức bảng, không đổi ý nghĩa hay độ tin cậy của thẻ.

## 4. Buổi đối chất dựa trên bằng chứng người chơi có

### Core concept

- Người chơi mang vào buổi đối chất tập hợp **X bằng chứng** đã thu thập.
- Rival nêu **Y giả thuyết** hoặc cách diễn giải dữ liệu.
- Người chơi chọn bằng chứng liên quan để kiểm tra, củng cố hoặc bác bỏ từng giả thuyết.
- Nếu lập luận được các bằng chứng hợp lệ và không kết luận vượt quá điều chúng chứng minh, người chơi vượt qua phần đối chất.

Buổi đối chất nên phản ánh hồ sơ người chơi thực sự có, không mặc định mọi người đều đi cùng một tuyến và thu đúng một bộ vật chứng.

### Thiếu bằng chứng và đi sai hướng

Người chơi có thể đến buổi đối chất khi chưa thu đủ căn cứ. Khi đó, trải nghiệm nên cho phép họ:

- nói rõ điều gì đã biết và điều gì chưa thể kết luận;
- không chấp nhận một giả thuyết quá mạnh của rival;
- nhận ra còn thiếu loại bằng chứng nào và được chọn quay lại điều tra nếu cấu trúc nhiệm vụ cho phép;
- đạt một kết quả chưa trọn vẹn thay vì bị buộc đoán mò.

Đây là hướng thiết kế cần cân nhắc cùng cốt truyện và điều kiện kết thúc từng vụ. Không mặc định dữ kiện ngoài tuyến chính là dữ liệu nhiễu; mỗi dữ kiện cần có vai trò được định nghĩa trong nội dung vụ.

### Mức kết luận

Có thể phân biệt ba trạng thái lập luận để tránh nhị phân đúng/sai:

1. **Gợi ý:** dữ kiện làm một hướng đáng kiểm tra, chưa xác minh.
2. **Hỗ trợ:** bằng chứng độc lập củng cố một giả thuyết hoặc loại trừ một số giả thuyết khác.
3. **Đủ căn cứ:** tập hợp bằng chứng cho phép đưa ra kết luận giới hạn, đúng với phạm vi chứng minh.

Đây là mô hình tham khảo; cần đơn giản hóa nếu làm tăng quá nhiều trạng thái và nội dung phản hồi.

## 5. Dạy đối chất từ Mission 1

Nên giới thiệu cơ chế đối chất ở Mission 1 dưới dạng đơn tuyến và ít giả thuyết:

1. Rival nêu một giả thuyết dễ hiểu.
2. Người chơi chọn một bằng chứng liên quan.
3. Game phản hồi bằng chứng đó chứng minh được gì và chưa chứng minh được gì.
4. Người chơi chọn kết luận có phạm vi phù hợp.

Mission 1 dạy cách dùng bằng chứng và giới hạn suy luận; chưa cần có nhiều rival, nhánh lồng hoặc nhiều kết thúc phức tạp. Ví dụ của vụ thư: dữ liệu về người nộp thư không tự chứng minh người viết thư; nhật ký in và lời kể độc lập có thể giúp làm rõ vai trò của Hoài mà không ép buộc hay bêu tên người khác.

## 6. Bản đồ điều tra

### Hướng đề xuất

Nâng bản đồ trường hiện có thành màn điều hướng/tổng quan thường trực khi người chơi được tự chọn địa điểm. Người chơi bấm trực tiếp ghim hoặc khu vực trên bản đồ để đến nơi; vẫn giữ cảnh riêng sau khi chọn để xem xét vật thể và trò chuyện.

MVP hiện đã có nền phù hợp: ảnh bản đồ trường, ghim địa điểm bấm được, bộ đếm tương tác còn mới, và chọn phòng khi một tòa nhà gom nhiều địa điểm. Hướng này có thể bắt đầu bằng cải tiến lớp hiển thị trên cấu trúc đó, chưa cần RPG di chuyển tự do.

### Avatar và ký hiệu trạng thái

- **Avatar nhân vật:** chỉ hiện cạnh địa điểm khi người chơi đã có thông tin về lịch sinh hoạt của nhân vật và ngày/giờ trong game khớp với lịch đó. Có thể dùng chân dung nhỏ hoặc biểu tượng đơn sắc để tránh che tên ghim.
- **`!` — việc chính:** báo địa điểm liên quan đến mục tiêu/câu hỏi chính hiện tại.
- **`?` — tương tác/manh mối mới:** báo nơi còn có tương tác chưa khám phá.
- **Không có dấu:** không có tương tác mới đã biết; địa điểm vẫn có thể mở để xem lại nếu nội dung cho phép.
- **Địa điểm chưa mở:** có thể vẫn xuất hiện dạng mờ nếu muốn cho người chơi thấy bố cục tổng thể; tránh hiển thị chi tiết làm lộ manh mối hoặc nhánh chưa khám phá.

Icon là gợi ý điều hướng, không nên tiết lộ đáp án hoặc luôn chỉ ra “đường đúng”. Có thể để manh mối phụ không có `!`, và chỉ hiện `?` khi người chơi có căn cứ nhận biết nơi đó còn điều đáng xem.

### Routines nhân vật và thông tin lịch

Hồ sơ nhân vật có thể được làm giàu bằng routines: nhân vật thường ở đâu vào ngày/khung giờ nào, lịch nào cố định và lịch nào chỉ là thói quen có ngoại lệ. Ví dụ: “thứ Hai–Tư học ở giảng đường A; thứ Năm–Bảy thường ở giảng đường B”. Đây là **dữ liệu thế giới có thể tra cứu**, không chỉ là đoạn mô tả nhân vật.

- Có thể lưu lịch trong bảng như `lich_giang_day` hoặc một bảng lịch sinh hoạt có cấu trúc tương đương, với mã nhân vật, ngày/khung giờ, địa điểm và loại lịch.
- Manh mối lời thoại/hồ sơ hoặc một query có thể cung cấp thông tin về routine; khi người chơi đã biết lịch, bản đồ dùng lịch đó cùng ngày/giờ hiện tại để quyết định có hiện avatar ở địa điểm nào.
- Nếu nhân vật nói lịch bằng lời, đó vẫn là một nguồn thông tin hợp lệ; truy vấn dữ liệu có thể dùng để xác minh, so sánh lịch hoặc phát hiện ngoại lệ. Không cần buộc mọi routine phải được khám phá bằng SQL.
- Khi có nhiều nhân vật ở cùng địa điểm, hiển thị tối đa ba avatar rồi `+n`, như cụm; chọn cụm có thể mở danh sách nhân vật.
- Lịch có thể là “thường có mặt” thay vì bảo đảm tuyệt đối. Cốt truyện cần phân biệt routine, lịch hẹn cụ thể và ngoại lệ để avatar không bị hiểu nhầm thành bằng chứng chắc chắn về sự hiện diện.

Lịch thật trong game (ví dụ năm 2024) giúp xác định chính xác thứ trong tuần, nhưng routine vẫn cần gắn với mốc truyện và khung giờ phù hợp. Nếu nhiệm vụ có hạn ngày, tránh để đường chính phụ thuộc duy nhất vào một nhân vật chỉ có mặt vào ngày người chơi có thể bỏ lỡ. Nếu muốn lịch nhân vật là một ràng buộc điều tra, cần có phương án hỏi lại, quay lại hoặc xác minh bằng nguồn khác.

### Trạng thái cần phân biệt

Để icon đúng nghĩa, dữ liệu địa điểm/tương tác cần phân biệt ít nhất:

- nhiệm vụ hoặc câu hỏi chính;
- tương tác mới có thể khám phá;
- tương tác đã hoàn tất;
- nhân vật hiện diện và việc hiện diện đó đã được người chơi biết hay chưa;
- địa điểm chưa mở hoặc đang bị khóa bởi điều kiện truyện.

Hiện bộ đếm “còn mới” cho biết số tương tác chưa làm, nhưng chưa tự nói tương tác nào là nhiệm vụ chính. Cần bổ sung phân loại nội dung trước khi có thể gắn `!` và `?` nhất quán.

### Trải nghiệm truy cập

- Ngoài ghim trên ảnh, cung cấp danh sách/nút địa điểm cùng trạng thái để người chơi dùng bàn phím, cảm ứng hoặc công nghệ hỗ trợ.
- Tên địa điểm và nhãn trạng thái cần đọc được; không dựa riêng vào màu sắc.
- Nếu có nhiều nhân vật tại một điểm, tránh xếp chồng chân dung; dùng cụm avatar hoặc mở thẻ địa điểm khi chọn.

## 7. Minigame quan sát ảnh và âm thanh

Có thể dùng tương tác ngắn để người chơi chủ động trích xuất manh mối từ tư liệu hiện trường:

- **Ảnh:** bấm vào vùng có tên lớp, logo, biển phòng, vật thể hoặc chi tiết nền đáng chú ý.
- **Âm thanh:** đánh dấu tín hiệu nghe được như tiếng loa, độ vọng của không gian, nhiều người đang nói, tiếng chó sủa xa hoặc tiếng cửa/thiết bị.
- Kết quả minigame trở thành dữ kiện cần diễn giải hoặc đối chiếu với query; bản thân nó không nhất thiết chứng minh danh tính hay hành vi.
- Tránh yêu cầu suy đoán giới tính/danh tính từ giọng nói. Ưu tiên đặc điểm âm thanh có thể kiểm tra độc lập, kèm phụ đề hoặc mô tả thay thế để không khóa người chơi khiếm thính/thị lực.
- Minigame là một cách trình bày manh mối, không cần xuất hiện trong mọi vụ. Có thể thử một loại media trong vụ nhỏ trước khi kết hợp ảnh và âm thanh.

## 8. Phạm vi workload và cách thử

Hệ thống rẽ nhánh ảnh hưởng workload ở các phần sau:

- viết và kiểm tra các tổ hợp bằng chứng–giả thuyết;
- xác định manh mối nào mở hướng nào;
- lời phản hồi cho trường hợp có/thiếu bằng chứng;
- kiểm tra không có nhánh vô tình khóa người chơi khỏi tiến triển;
- nội dung và trạng thái bản đồ thay đổi theo điều tra;
- kiểm tra độ nhất quán của kết luận ở mọi đường đi.

Có thể triển khai từng bước:

1. Giữ Mission 1 gần đơn tuyến và dùng nó để kiểm chứng cách chọn bằng chứng phản biện giả thuyết.
2. Thử một vụ song tuyến nhỏ, hai hướng cùng dẫn về một sự thật nhưng tạo bộ bằng chứng hoặc mức chắc chắn khác nhau.
3. Sau khi vòng đối chất ổn định, thêm một nhánh lồng có giới hạn.
4. Mở rộng trạng thái bản đồ song song với các nhánh: địa điểm chỉ đổi dấu/nhân vật khi người chơi đã biết thay đổi đó.

Trước khi xây nhiều nội dung, nên mô phỏng một vụ trên giấy hoặc bằng dữ liệu nhỏ: liệt kê các đường điều tra, bằng chứng thu được ở mỗi đường, giả thuyết rival, và kết luận người chơi có thể bảo vệ. Nếu có đường nào không cho phép tiến triển hoặc tạo kết luận không được bằng chứng hỗ trợ, sửa cấu trúc trước khi viết thoại đầy đủ.

## Câu hỏi cần chốt khi biến đề xuất thành thiết kế

1. Người chơi có thể vào buổi đối chất khi thiếu bằng chứng, hay cần điều kiện tối thiểu để bắt đầu?
2. Thiếu bằng chứng dẫn đến quay lại điều tra, kết quả chưa trọn vẹn, hay kết thúc nhánh?
3. Ngưỡng tối đa 3 dòng áp dụng cho mọi loại đầu mối hành động hay chỉ một số màn/vụ? Medium nhắm hai lựa chọn, hard có thể lên ba.
4. Danh sách query, note và bằng chứng khác nhau thế nào về hình dạng, dữ liệu lưu và quyền dùng trong query?
5. Màu thẻ/đường nối dùng bảng màu tự do hay bộ màu giới hạn; màu nào do người chơi chọn và trạng thái nào do hệ thống biểu thị?
6. Kết quả query đã pin tồn tại như bảng tạm dùng tiếp trong `FROM` ra sao, và lưu query nguồn/cột nào?
7. Routine là lịch cố định, lịch thường lệ có ngoại lệ, hay cả hai; người chơi biết routine qua hồ sơ/lời kể/query nào?
8. Truy vấn lịch là một bài học SQL có chủ đích hay chỉ là một trong nhiều cách để biết lịch?
9. Bản đồ luôn hiện trong toàn bộ chương hay chỉ ở những đoạn cho phép tự chọn hướng?
10. Vụ nhỏ nào phù hợp để kết thúc không cần đối chất và thử trích xuất manh mối từ ảnh/âm thanh?

## Quyết định 01/10/2026 (user chốt, Claude triển khai đợt 1)

Trả lời các câu hỏi cuối tài liệu và phần đã làm:

| Câu | Chốt | Ghi chú phản biện đã được chấp nhận |
|---|---|---|
| 1+2 | Hai loại nhiệm vụ: **có thời hạn** — được vào đối chất khi thiếu bằng chứng; **cốt truyện** — cần điều kiện tối thiểu để có đối tượng phản biện. Thiếu → kết chưa trọn, không quay lại. | Sàn cho loại có thời hạn: luôn có nước đi "Chưa đủ căn cứ để nói" (hợp lệ, không phạt). Save/load **không** là nguồn đa dạng trải nghiệm — đa dạng đến từ nhánh và bằng chứng thu được; ngẫu nhiên chỉ ở thứ tự lựa chọn, không bao giờ ở dữ liệu SQL (máy kiểm chạy thật mọi câu). |
| 5 | Hệ thống quyết định **hình dạng** thẻ, người chơi quyết định **màu** (≈4 màu); hai khoảnh khắc: (1) thẻ vào hồ sơ, (2) ghim lên bảng không, ghim màu gì. | Màu đặt ở **đầu ghim + sợi chỉ**, không tô thân thẻ (thân thẻ là dấu hiệu loại). Mặc định tự ghim, chọn màu là tùy chọn — làm ở Vụ 2 khi bảng đông. |
| 7 | Avatar nhân vật trên bản đồ chỉ hiện khi hồ sơ nhân vật đã có thông tin (vd lịch tuần: 3 ngày giảng đường A, 3 ngày giảng đường B). | Lịch tuần nên đi qua bảng SQL (`lich_giang_day`) để avatar là phần thưởng của truy vấn; thêm luật kiểm "đường chính không phụ thuộc nhân vật vắng mặt". Làm cùng Vụ 2 (ngày kiểu địa điểm). |
| 8 | Bản đồ để trong nút như hiện tại. | Ở ngày kiểu địa điểm bản đồ tự là màn chọn. |

**Đã triển khai (đợt 1, nhánh `claude/game-polish-ea0ca6`):** mục 4 + 5 — chỉ dẫn `[ĐỐI CHẤT <mã>] <rival>: "<giả thuyết>"` với dòng con
`{<mã thẻ>} [ĐỦ CĂN CỨ|HỖ TRỢ|GỢI Ý] → phản hồi: …`, `[CHƯA ĐỦ]`, `[KHÁC]` (cú pháp ở `prototype/noi-dung-mvp/README.md`); mức đạt thành cờ
`<mã>-du` / `<mã>-ho-tro` dùng ở `[ĐIỀU KIỆN]`; màn `DoiChatMvp` (khay thẻ hồ sơ cùng hình dạng bảng điều tra, hộp giả thuyết, hai nút).
Buổi họp chương 1: Quân nêu "Hoài viết"; nhật ký in = đủ căn cứ → kết thật; lời chú Cường = hỗ trợ; thẻ chỉ nói ai nộp = gợi ý; chưa đủ → kết thường.
Chưa làm: màu ghim (câu 5), avatar bản đồ (câu 7), FROM/SELECT/GROUP BY (mục 3) — chờ Vụ 2.
