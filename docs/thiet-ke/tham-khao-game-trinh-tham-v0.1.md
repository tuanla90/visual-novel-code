# Tham khảo game trinh thám / visual novel — bài học cho hệ thống dữ kiện và nhịp chơi (v0.1)

> **Ngày:** 30/09/2026. **Loại tài liệu:** tư liệu tham khảo, không phải quyết định. Mọi thay đổi thiết kế rút ra từ đây phải qua sổ quyết định (`../lich-su-quyet-dinh.md`).
>
> **Nguồn:** ba agent tra web song song (WebSearch/WebFetch). Nhiều trang wiki, review bị lỗi tải (503/403), nên một phần thông tin chỉ lấy từ đoạn trích kết quả tìm kiếm; chỗ nào là suy đoán đã bỏ khỏi tài liệu này hoặc ghi rõ. Danh sách nguồn ở cuối.
>
> **Bối cảnh câu hỏi:** thiết kế 5 loại dữ kiện (chính · hiểu nhân vật · cài cắm chương sau · hồ sơ đối chất · bẫy) và 4 mục tiêu của user: chơi không cần hướng dẫn; không có cảm giác đang học; dữ kiện nhiễu phải có giá trị; hạn chế phạt khi skip hội thoại. Xem thêm phiên hội đồng `~/.claude/hoi-dong/sessions/20260930-0929-5-loai-du-kien`.

---

## 1. Tóm tắt từng game

| Game | Là gì | Đáng mượn | Nên tránh |
|---|---|---|---|
| **Danganronpa: Trigger Happy Havoc** (Spike Chunsoft, 2010; studio chuyên nghiệp) | Mỗi chương: sinh hoạt thường ngày → điều tra → phiên xử (Class Trial) | Bằng chứng và lời khai **tự ghi vào một sổ** (e-Handbook), người chơi chỉ chọn từ đó. Free Time: đi chơi, tặng quà → mở trang hồ sơ nhân vật (Report Card) và kỹ năng hỗ trợ phiên xử, **không cho manh mối phá án**. Độ khó tách hai thang: suy luận và thao tác | Nhiều minigame trong phiên xử, bị chê "lạc điệu". **Hangman's Gambit** bị chê nhất: bắt thao tác chậm trong khi người chơi đã biết đáp án. Phiên xử bị chê quá dễ, dắt tay |
| **Adventure Escape Mysteries** (Haiku Games, 2014→; App Store 4,8★, Steam 86%) | Thoát phòng có truyện trinh thám, chia chương | Không có màn hướng dẫn riêng: **nhiệm vụ đầu nhỏ, mục tiêu rõ**, dạy chạm–nhặt–dùng trong bối cảnh. **Sao giấu trong cảnh**: quan sát kỹ thì nhặt được, đổi lấy gợi ý. **Sai không bị phạt**; gợi ý có thể bỏ qua hẳn câu đố. Độ khó tăng dần trong truyện | Khóa chương bằng thời gian chờ (chìa 3 giờ). Vài câu đố tùy tiện, người chơi phải mua gợi ý |
| **Underworld Office** (Buff Studio, 2020; mobile) | Truyện dạng chat, 7 chương, 7 kết | **Hồ sơ nhân vật tự mở dần** khi gặp. Dòng thời gian theo chương để chơi lại | **Mỗi lựa chọn tốn vé** → người chơi ngại thử. Bộ sưu tập (danh hiệu, album) không có tác dụng. **Thiếu nút skip**, bị chê |
| **Mysterious Forum and 7 Rumors** (Entabridge, 2018; mobile, 4,9★) | Truyện chat kinh dị học đường, 7 chương | Mỗi chương **một khuôn cố định**: thấy tin đồn → điều tra → đăng kết quả; lặp lại nên không cần hướng dẫn. Skip theo chương | "Bẫy" chỉ đoán được bằng trực giác (rẽ trái hay phải), không có dấu hiệu công bằng |
| **Lucid9: Inciting Incident** (Fallen Snow Studios, 2016; nhóm fan, Ren'Py, ~90% tích cực) | Visual novel trinh thám tuyến tính, miễn phí | Đội nhỏ vẫn làm được truyện trinh thám được khen. Phần một khép vụ chính, để lại cài cắm cho phần hai | **Mấy giờ đầu kém hơn phần sau** — bị chê nhiều nhất. Phần slice-of-life làm loãng căng thẳng |
| **Project: Eden's Garden** (fangame Danganronpa, itch.io) | Lồng tiếng đầy đủ, rất công phu | Phiên xử nhiều dạng câu hỏi (chọn điểm sai, chọn bằng chứng, trắc nghiệm) | Minigame phản xạ quá khó ngay chương 1. **Hai năm mới ra một chương**; dự án bị hủy (25/04/2026) vì khủng hoảng nhân sự |

Underworld Office và Mysterious Forum không có hệ thống bằng chứng; Lucid9 không có cơ chế điều tra. Về cơ chế dữ kiện, chỉ Danganronpa và Adventure Escape là mẫu trực tiếp.

---

## 2. Áp vào 4 mục tiêu

### 2.1. Chơi không cần hướng dẫn
- Việc đầu tiên nhỏ, mục tiêu rõ, dạy thao tác trong bối cảnh (Adventure Escape).
- Mỗi vụ lặp cùng một khuôn để người chơi tự quen (Mysterious Forum). Vụ 1 đã có khuôn điều tra → phòng máy → họp; giữ giống hệt ở các vụ sau.

### 2.2. Không có cảm giác đang học
- **Đừng bắt làm thủ tục khi người chơi đã biết đáp án** (bài học Hangman's Gambit). Câu truy vấn là cách *tìm ra* điều chưa biết, không phải *chép lại* điều đã rõ.
- Không thêm minigame lạc điệu vào phiên giải trình; giữ SQL là cơ chế duy nhất (Danganronpa bị chê đúng chỗ này).

### 2.3. Dữ kiện nhiễu có giá trị
- Dữ kiện tùy chọn thưởng thứ dùng được ngay: một lượt gợi ý, một dòng hồ sơ (sao giấu của Adventure Escape).
- Bộ sưu tập không có tác dụng thì bị chê (Underworld Office) → loại "hiểu nhân vật" và "cài cắm" phải có đầu ra dùng được.

### 2.4. Skip hội thoại ít bị phạt
- **Sổ tự ghi** (e-Handbook): thông tin nằm ở sổ/giấy nhớ/bằng chứng, không nằm ở câu thoại.
- Nút skip là mặc định người chơi mong đợi (Underworld Office bị chê vì thiếu).

---

## 3. Áp vào 5 loại dữ kiện

| Loại | Bài học |
|---|---|
| 1. Dữ kiện chính | Không bao giờ để người chơi kẹt; ghi tự động vào sổ (Danganronpa, Adventure Escape) |
| 2. Hiểu nhân vật | Danganronpa có đúng cơ chế tặng quà, nhưng **quà chỉ mở hồ sơ và kỹ năng, không mở manh mối bắt buộc** → người bỏ qua vẫn phá được án. MVP: thẻ nhân vật tự mở (Underworld Office); tặng quà để khi có mini game |
| 3. Cài cắm chương sau | Danganronpa đặt gợi ý twist ngay trong thoại thường ngày, người chơi không cần thao tác; Lucid9 khép vụ và để móc cho phần sau |
| 4. Hồ sơ đối chất | Chọn từ một khay duy nhất (Truth Bullet / e-Handbook) |
| 5. Bẫy | Danganronpa V3 có "nói dối" nhưng **chỉ ở vài thời điểm định sẵn**; bẫy kiểu đoán trực giác bị chê (Mysterious Forum) → bẫy phải có mâu thuẫn tự thân để phát hiện |

---

## 4. Nhịp, chi phí thời gian, quy mô
- **Chi phí trên mỗi lựa chọn làm người chơi ngại thử** (vé của Underworld Office) — gần với luật "mỗi dữ kiện tốn 1 khung" hiện tại của MVP.
- **Giờ rảnh giới hạn nhưng tách khỏi phá án** (Free Time của Danganronpa): lựa chọn có giá trị mà không làm hỏng vụ án.
- **Mở đầu phải hay ngay** (Lucid9 bị chê phần đầu).
- **Ra chương đều** (Eden's Garden 2 năm/chương rồi hủy). Chương trọn vẹn 20–40 phút là nhịp dễ tiêu thụ (Adventure Escape).
- **Thu tiền theo chương: mở khóa một lần, không khóa bằng thời gian chờ** (Adventure Escape bị chê chìa 3 giờ; sinh viên chơi theo buổi).

---

## 5. Nguồn
- Danganronpa: https://en.wikipedia.org/wiki/Danganronpa:_Trigger_Happy_Havoc · https://en.wikipedia.org/wiki/Danganronpa · https://en.wikipedia.org/wiki/Danganronpa_V3:_Killing_Harmony
- Adventure Escape Mysteries: https://apps.apple.com/us/app/adventure-escape-mysteries/id1419796608 · https://roomescapeartist.com/2025/06/09/adventure-escape-mysteries-review/ · https://learningworksforkids.com/playbooks/mini-guide-adventure-escape-mysteries/ · https://store.steampowered.com/app/1141020/Adventure_Escape_Mysteries/
- Underworld Office: https://apps.apple.com/us/app/underworld-office-novel-game/id1523265842 · https://en.namu.wiki/w/%EC%96%B8%EB%8D%94%EC%9B%94%EB%93%9C%20%EC%98%A4%ED%94%BC%EC%8A%A4 · https://www.talkandroid.com/9016-underworld-office-guide-walkthrough/
- Mysterious Forum and 7 Rumors: https://apps.apple.com/us/app/mysterious-forum-and-7-rumors/id1435682088 · https://unwinnable.com/2020/04/17/mysterious-forum-and-7-rumors/
- Lucid9: https://store.steampowered.com/app/439940/Lucid9_Inciting_Incident/ · https://en.everybodywiki.com/Lucid9 · https://gamerescape.com/2016/04/19/review-lucid9-inciting-incident/
- Project: Eden's Garden: https://project-edens-garden.itch.io/projecteg · https://fanlore.org/wiki/Project_Eden's_Garden
