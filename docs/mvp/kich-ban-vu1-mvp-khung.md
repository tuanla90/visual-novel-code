# Kịch bản khung bản MVP — mở đầu (tuần 1) và Vụ 1 "Chữ ký H"

> **Trạng thái:** kịch bản khung đã được user duyệt (QĐ-087, 28/09/2026). Đây là **tầm nhìn MVP** trong thứ tự ưu tiên tài liệu (vũ trụ → GDD → MVP → prototype, QĐ-084). Gói kịch bản MVP viết lời thoại đầy đủ dựa trên khung này; thoại trong tệp chỉ là thoại mẫu.
>
> **Nguồn:** buổi brainstorm `docs/session-trao-doi-2026-09-28.md`; bốn phiên hội đồng trong `~/.claude/hoi-dong/sessions/` (`20260928-1636-kich-ban-vu1-mvp`, `20260928-1710-kich-ban-vu1-loop2`, `20260928-1742-opening-mvp-loop3`, cùng góp ý của user sau mỗi vòng); QĐ-086, QĐ-087.
>
> **Khác với GDD:** nhịp "ngày × 3 khung giờ" chỉ áp cho MVP (QĐ-086); GDD §5, §6 vẫn giữ 4 buổi/vụ. GDD §14 (Vụ 1 cũ) vẫn là mục "bàn sau" ở tầng sản phẩm (QĐ-085); với MVP, tệp này thay §14.

---

## 1. Nguyên tắc

- **Game phải thú vị trước**; chấp nhận hi sinh một chút cảm giác code thật, nhưng phải truyền tải được **giá trị của SQL** (QĐ-086).
- Thông điệp của vụ: *"SQL giúp thu hẹp điều cần kiểm tra. Bằng chứng và cách diễn giải mới quyết định ta có thể kết luận đến đâu."*
- Truyện **tuyến tính**. Vụ 1 có 5 ngày điều tra × 3 khung giờ (sáng, trưa, chiều); ngày 6 là buổi họp rà soát. Mỗi ngày giải 1 dữ kiện chính, **tối đa 2 khung** nếu chơi tập trung. Hết 3 khung mà chưa có dữ kiện chính thì sang **"Buổi tối"** (nhãn hiện trên màn hình: **"Cuối ngày"**, QĐ-090): đồng đội dẫn tới đúng chỗ, người chơi tự làm bước cuối, không nợ khung. Ngày thực địa và ngày phòng máy xen kẽ.
- Phòng máy: vào tốn 1 khung, ở trong thời gian đứng yên, chạy query thoải mái, không báo đúng/sai. Tắt máy thì lưu thành bằng chứng (key item).
- **Phạm vi SQL:** WHERE, `=`, `LIKE`, AND/OR; thêm bài học tư duy dữ liệu "`=` so khớp chính xác; ra 0 dòng thì xem lại dữ liệu". NULL, hoa/thường, `IN` để nhiệm vụ phụ (QĐ-073, QĐ-082).
- **Người bị thu hẹp tới chưa phải thủ phạm.** Không ai bị phạt vì dữ liệu chỉ ra họ.

## 2. Nhân vật của MVP

| Nhân vật | Vai trong MVP |
|---|---|
| **Người chơi** | **Nam** (cố định, QĐ-087), năm 1 khối kinh tế, giỏi Excel. Tạo nhân vật bằng **2 câu**: tên (có nút xúc xắc ngẫu nhiên), ngành. Không hỏi giới tính. |
| **Tùng** | Bạn cùng phòng KTX, năm 1 Du lịch, cháu chú Cường. Dẫn đường, nhắc lịch. "Tớ cá là…" |
| **Hà Vy** | Năm 1 Toán ứng dụng. Đăng ký CLB qua **form online**, nên không có mặt ở Ngày hội. Thích logic, thần tượng Sherlock Holmes. "Khoan, tính lại đã." / "Đừng cá. Tính." |
| **Bộ ba** | Kiểu Harry Potter: người chơi ở giữa (Harry), Tùng trung thành, hay đoán (Ron), Hà Vy logic (Hermione). |
| **Minh Anh** | Năm 3 Luật kinh tế, chủ nhiệm. "Nói có sách, mách có chứng." |
| **Duy** (mới) | **Nguyễn Đức Duy**, năm 2 Hành chính học, thành viên từ năm nhất. **Người giữ tài sản CLB**: chìa khóa phòng, tủ hồ sơ, sổ tài sản, máy tính cũ của CLB (làm sổ hoạt động, không truy cập được dữ liệu trường). Lập biên bản kiểm kê tài sản hè. Giải thích quy trình rà soát để Minh Anh không phải gánh phần giải thích hành chính. Móc cho các vụ sau: Vụ 4 có người đo đạc phòng (Duy nhận ra qua sổ tài sản), Vụ 5 có chìa khóa ngăn tủ. |
| **Quân** | Trưởng ban Pháp chế – Kiểm tra Hội sinh viên. **Gặp CLB lần đầu ở ngày 3** (có mặt ở CTSV để giám sát, QĐ-087), chất vấn ở ngày 6. |
| **Chú Cường** | Bảo vệ KTX, chú của Tùng. Tuần 1 trực tối (kể chuyện CLB); tuần 2 đổi sang ca sáng (nhân chứng 6:45 sáng thứ Hai). Chuyện đổi ca do **Tùng** nhắc ở Vụ 1, chú không tự nói. |
| **Bác Thịnh** | Bảo vệ giảng đường B; cùng cô phụ trách mở hộp lúc 9h sáng thứ Hai. |
| **Cô Hạnh, cô Lan, thầy Khải, thầy Quang** | Như GDD §3.3–§3.4. |
| **Cô phụ trách hộp kiến nghị** (mới) | Chỉ xuất hiện qua lời kể và tài liệu; giữ sổ niêm phong. |
| **Hoài, Hiếu, Đạt** (mới) | Sinh viên lớp BC24A. Hoài là người nộp thư hộ. Hiếu công khai đồng ý với lá thư (nghi phạm giả), lên hình 2–3 cảnh. Đạt là lớp trưởng. |

Không nêu tên **Vương Khánh** trong MVP; chỉ có "một anh năm cuối đeo huy hiệu bánh răng".

---

## 3. Mở đầu (tuần 1 → chiều thứ Hai tuần 2)

**Dòng thời gian:**
- **Chủ nhật tuần 1:** đến KTX, đi dạo trường, tối gặp chú Cường.
- **Thứ Hai → thứ Sáu tuần 1:** một dòng chuyển cảnh "Tuần sinh hoạt công dân".
- **Thứ Bảy tuần 1:** Ngày hội CLB.
- **Thứ Hai tuần 2, 16h:** buổi sinh hoạt đầu năm. Thư đã được mở lúc 9h sáng cùng ngày.
- **Thứ Ba tuần 2:** ngày 1 của Vụ 1.

Thời lượng nhắm tới: 25–35 phút.

| # | Cảnh | Dạy cơ chế | Nội dung, thoại mẫu |
|---|---|---|---|
| 1 | **Phòng KTX 408** (CN chiều) | Hội thoại; **tạo nhân vật** (2 câu) | Tùng: "Phòng 408 phải không? Để tớ xách hộ cái này." → "Tớ Tùng, Du lịch. Cậu tên gì?" (ô tên có nút xúc xắc; Tùng: "Ngại nghĩ thì bấm xúc xắc, tớ đặt hộ, đảm bảo không xui.") → "Học ngành gì?" (danh sách khối kinh tế). Hồ sơ lưu `ten`, `nganh`; MVP dùng seed cố định (`MVP_FIXED_SEED`), không ghi tên vào telemetry |
| 2 | **Ra bản đồ** | Mở bản đồ, chọn điểm, di chuyển | Tùng: "Tớ cá là mười phút mình tới được nhà văn hóa." — "Cậu biết đường thật à?" — "Biết tương đối. Sai thì coi như biết thêm đường." |
| 3 | **Sảnh tòa B** | Xem xét vật thể | Hộp tôn cũ "Hộp tiếp nhận kiến nghị", mép khe sắc. Tùng: "Trường số hóa hết rồi mà cái hộp vẫn treo đây." Bác Thịnh: "Hai cháu tìm phòng nào? … Mép hộp sắc đấy, đừng thò tay vào." |
| 4 | **Căng tin** | Khung giờ | Tùng: "Bún cá chỉ bán sáng với trưa. Giờ chiều rồi, còn bánh mì thôi. Ở trường này sai giờ là lỡ việc." |
| 5 | **Phòng máy** (nhìn từ ngoài) | Địa điểm khóa | Tùng: "Phòng thầy Khải. Chưa có việc thì chỉ đứng ngoài ngắm." |
| 6 | **Nhà văn hóa, bảng tin** | Đọc bảng tin | Hàng chục CLB; poster "Đăng ký CLB năm nay: quét QR hoặc form online". Tùng: "Có cả CLB Thám Tử này… chưa nghe bao giờ." |
| 7 | **Cổng KTX, tối** | Hội thoại nhóm; gợi ý lưu game khi về phòng | Về muộn, quẹt thẻ ở phòng trực. Chú Cường: "Về muộn thế? … Ngày xưa CLB đó ghê lắm, vụ mất xe, vụ gian lận thi, toàn ra bằng chứng đàng hoàng. Không tài ba gì đâu, chúng nó chịu hỏi từng người rồi đối chiếu giấy tờ. … Giờ cái gì cũng lên hệ thống, ai còn nhờ CLB đi hỏi từng người. … Thứ Bảy có Ngày hội, thích thì ra xem." Tùng: "Đi với tớ nhé?" |
| 8 | **Chuyển cảnh: tuần sinh hoạt công dân** | Túi đồ | Người chơi nhận **thẻ lịch của khoa mình** (phần in theo khoa, dòng viết tay "Họ tên / Lớp"). Gieo cho ngày 1 |
| 9 | **Ngày hội CLB** (thứ Bảy) | Lựa chọn thoại; **lọc thử một lần** trên giao diện của bàn làm việc | Bàn Robotics đông, dán "Đang xin mở rộng xưởng thực hành". Bàn Thám Tử chỉ có Minh Anh. Tùng: "Chị có vụ nào đang điều tra không ạ?" — Minh Anh: "Không. Trường số hóa hồ sơ, đăng ký, phần lớn tra được trên hệ thống. Cách làm cũ của CLB dùng được ít hơn trước." — Tùng: "Thế CLB thám tử giờ điều tra… mật khẩu Wi-Fi ạ?" — Minh Anh: "Nếu em tới để đùa thì bàn bên kia vui hơn." — Tùng: "Em đùa quá. Em xin lỗi chị." Phiếu đăng ký cần **mã sinh viên**; tân sinh viên chưa có thẻ. Đoàn trường phát cho mỗi bàn **danh sách tra cứu tân sinh viên K24** (mã, họ tên, ngành) — Minh Anh: "Danh sách chỉ để điền mã, xong là trả." Tùng tự tin điền mã, nhưng **ghi sai**. Minh Anh bắt đầu dò bằng mắt. Người chơi xin lọc thử: `ten = 'Tùng'` → **3 dòng** (Du lịch, Kế toán, CNTT) → **đọc cột ngành**, chọn Tùng Du lịch. Minh Anh: "…Em lọc nhanh thế. Chị đang cần người làm sổ hoạt động. Thứ Hai tuần sau 4 giờ họp đầu năm. Hai em ghi tên đi." Tùng: "Em thì tìm đường, nhắc lịch…" — Minh Anh: "Em vừa biết xin lỗi. Bắt đầu từ việc đến đúng giờ." |
| 10 | **Phòng CLB, thứ Hai 16h: làm quen và dọn phòng** | Xem xét để tìm đồ; hoạt cảnh sổ | Có mặt: Minh Anh, Duy, Hà Vy, Tùng, người chơi. Hà Vy: "Tớ đăng ký qua form, không ra Ngày hội. Tớ thích logic. Đọc Sherlock Holmes từ cấp hai." Tùng: "Thế cậu đoán được tớ học gì không?" — Hà Vy: "Không đoán. Áo đội tình nguyện, huy hiệu khoa trên balo. Du lịch." Duy: "Duy, năm hai Hành chính học. Tớ giữ chìa khóa, tủ hồ sơ với cái máy tính cũ của CLB." Dọn tủ: Duy "chưa kiểm kê tới ngăn dưới" → **sổ chị Linh** (hoạt cảnh: "Kiểm hai lần, kết luận một lần.") → Minh Anh: "Sổ tự học của chị Linh. Em cứ giữ mà dùng." Duy lấy ra **báo cáo năm ngoái ghi "hoạt động yếu"** |
| 11 | **Phòng CLB, 16h40: lá thư** | Xem xét tài liệu → **giấy nhớ đầu tiên**; bật bảng hồ sơ vụ | Cô Lan gọi Minh Anh lên CTSV (còn trong giờ hành chính). Bên bị phản ánh được nghe **nội dung** để giải trình, không được biết danh tính người gửi. 20 phút sau cô mang về **thông báo lịch họp rà soát thứ Hai tuần 3** và **bản chụp thư đã che thông tin**. Người chơi tự xem bản chụp: chữ ký tay lượn dài, chỉ đọc được chữ **H** đầu (QĐ-091), dòng "đề nghị phản hồi chính thức" → **tự tạo giấy nhớ [H]**. Duy: "Đủ 5 người chỉ là giữ tư cách CLB. Phòng vẫn bị xét vì báo cáo yếu, đơn của Robotics, giờ thêm cái thư." Minh Anh: "Thư muốn được phản hồi thì người gửi có mã trong sổ niêm phong. Không ai được mở sổ. Thầy Quang cho CLB lập căn cứ, cô phụ trách tự tra, bên Hội sinh viên giám sát." Hà Vy: "Khoan, tính lại đã. Mình có một chữ H và một cái hộp." Minh Anh: "Nói có sách, mách có chứng. Sáng mai bắt đầu." → HUD: **Ngày 1 — Sáng** |

**Cặp câu "Tớ cá là…" / "Đừng cá. Tính."** lần đầu xuất hiện ở ngày 2 (Tùng chọn OR), lúc có con số để tính thật. Không dùng ở mở đầu.

---

## 4. Vụ 1 — bối cảnh và chuỗi quyền lực

- **Lá thư** (đánh máy): "Đề nghị thu hồi phòng sinh hoạt của CLB Thám Tử, vì CLB không còn giải quyết được việc gì. Đề nghị Phòng phản hồi chính thức." Chữ ký tay trên phiếu gửi: chữ H viết hoa rõ, phần sau là một nét lượn không đọc được (QĐ-091); không có tên, không có mã trên thư.
- **Thư không được thụ lý như tố cáo.** Nó được xếp vào hồ sơ **đợt rà soát phòng CLB đầu năm** như một "ý kiến sinh viên", cùng **báo cáo năm ngoái ghi CLB "hoạt động yếu"** và **đơn chính thức của Robotics xin phòng làm xưởng** (nộp từ tuần trước). Ba thứ cộng lại đưa phòng CLB vào **buổi họp rà soát** (thứ Hai tuần 3). Thư không đủ để kỷ luật ai, không tự động thu phòng.
- **Ai quản lý:** phòng CTSV quản lý phòng; Hội sinh viên (Ban Pháp chế – Kiểm tra, Quân) quản lý hoạt động CLB và cùng rà soát; thầy Quang (Phó hiệu trưởng phụ trách sinh viên) chủ trì và quyết định.
- **Quy chế CLB:** tối thiểu 5 thành viên sinh hoạt thật, tính cả chủ nhiệm. Đây là điều kiện giữ **tư cách CLB**, không phải điều kiện đủ để giữ phòng.
- **Hộp tiếp nhận kiến nghị và sổ niêm phong:** nội dung thư có thể giấu tên. Người gửi muốn được **phản hồi chính thức** thì ghi mã sinh viên vào phiếu gửi; mã được chép vào **sổ niêm phong**. **Không ai được mở sổ xem**, kể cả CTSV. Chỉ khi có **căn cứ bằng văn bản cho một mã cụ thể**, cô phụ trách mới trả lời có hoặc không. Vì vậy phải dùng SQL mới có mã để hỏi.
- **Vì sao cần biết người gửi:** thư yêu cầu phản hồi, nên trước khi tính nó là ý kiến sinh viên, nhà trường phải mời người gửi đến làm rõ.
- **Vì sao CLB được làm việc này:** CLB có quyền lợi liên quan và xin được tự lập căn cứ. Thầy Quang cho phép trong giới hạn: CLB chỉ lập **danh sách mã ứng viên kèm căn cứ**; cô phụ trách tự tra sổ; cô Hạnh cấp quyền dữ liệu tạm theo đơn Minh Anh đứng tên, thầy Quang duyệt; Duy ngồi cùng ở phòng máy, ký sổ mượn máy (QĐ-090) (2 bảng, chỉ các cột cần thiết, thu hồi sau buổi họp); Quân giám sát.
- **Vì sao Hoài ghi mã thật:** cô tin mình đang nộp hộ một bản kiến nghị đàng hoàng. **Vì sao người nhờ không tự nộp:** anh ta biết phiếu ghi mã người nộp.
- **Kết quả buổi họp** chính là mốc "cho CLB đến hết học kỳ" của GDD §2.2; cả hai kết đều dẫn tới mốc này, chỉ khác điều kiện đi kèm.

**Vật chứng ở khe hộp: thẻ lịch Tuần sinh hoạt công dân.** Tân sinh viên nào cũng được phát, in theo khoa (người chơi đã có một tấm của khoa mình từ cảnh 8, nên nhận ra ngay). Phần in còn nguyên: logo ngòi bút, dòng "Khoa Báo chí – Truyền thông · K24". **Dòng viết tay "Họ tên / Lớp" bị mép tôn sắc xé mất** khi ai đó nhét vội một phong bì dày. Phần còn lại chỉ ra **cả một khóa** (Báo chí K24 có 2 lớp), phần định danh thì mất; người chơi phải ghép với dữ kiện tòa B và dùng SQL để thu hẹp. Tùng: "Tớ cá tên chủ thẻ nằm ở mẩu bị rách!" — Hà Vy: "Mẩu đó giờ ở đâu chẳng ai biết. Cái còn lại là của cả một khóa." Lúc soát hồ sơ, Hà Vy nhắc: thẻ nằm ở khe hộp chưa chứng minh chủ thẻ là người bỏ thư.

## 5. Địa điểm × dữ kiện (nhãn chỉ để người viết biết)

| Địa điểm | Dữ kiện (mở khi nào) | Người chơi phân biệt bằng gì |
|---|---|---|
| **Phòng CLB** | [chính] sổ chị Linh · [phụ] báo cáo năm ngoái "hoạt động yếu" · [nhiễu] biên bản kiểm kê tài sản hè của Duy ("điều hòa số 2 hỏng") | Đối chiếu với lời cô Lan |
| **Sảnh tòa B + hộp** (từ N1) | [chính] bác Thịnh: 9h sáng thứ Hai bác và cô phụ trách mở hộp, thư nằm trên cùng · [chính] thẻ lịch rách ở khe · [nhiễu] tờ rơi CLB Guitar dưới chân cầu thang · [phụ] thông báo lịch họp rà soát dán cạnh hộp | Tờ rơi ở chân cầu thang, không kẹt trong khe; chỉ thẻ lịch mắc vào mép tôn |
| **Phòng Đào tạo** (N2) | [chính] cô Hạnh cấp quyền tạm, kèm văn bản của thầy Quang · [nhiễu] thông báo đổi phòng học tuần này | — |
| **Phòng máy** (N2, N4) | [chính] bàn làm việc · [phụ, chỉ khi đã có 2 mã] một dòng nhật ký in: 23:10 Chủ nhật, 1 trang, tệp `kien-nghi-phong…`, tài khoản `SV21xx…` (năm 4) · [nhiễu] dòng in cùng đêm `bao-cao-nhom-kinh-te-vi-mo.pdf` | Tên tệp và giờ in khớp lúc thư có mặt sáng thứ Hai; dòng kia là bài tập |
| **Phòng CTSV** (N3, N5) | [chính] quy chế phiếu gửi và sổ niêm phong · [phụ] đơn xin phòng của Robotics, chữ ký "Chủ nhiệm CLB Robotics" (không đọc được tên) · [nhiễu] đơn xin lịch phòng tập của CLB Guitar · **Quân** có mặt (N3) | So đơn Robotics với "huy hiệu bánh răng" trong lời chú Cường |
| **Căng tin** (từ N3) | [nhiễu] Hiếu: "CLB chiếm phòng mà có làm gì đâu", Tùng cá là Hiếu · [phụ, chỉ N5, giờ ra chơi sau tiết sinh hoạt lớp] Đạt kể sáng thứ Hai Hoài nói "đi gửi hộ anh khóa trên cái phong bì" · [nhiễu] sinh viên phàn nàn Robotics ồn ban đêm | Ý kiến không phải hành động; sổ niêm phong mới loại được Hiếu |
| **Cổng KTX** (khung sáng) | [phụ, từ N3] chú Cường: 6:45 sáng thứ Hai thấy một anh năm cuối đeo huy hiệu bánh răng đưa phong bì nâu cho một bạn nữ, bạn nữ đi thẳng về phía tòa B (QĐ-090 bỏ chi tiết dây thẻ) · [nhiễu] lịch cắt nước bảo trì | Chú chỉ tả dáng người và huy hiệu, không nhận diện mặt. Tùng nhắc trước: "Tuần này chú tớ đổi sang ca sáng." |

## 6. Năm ngày điều tra (thứ Ba → thứ Bảy tuần 2)

| Ngày | Dữ kiện chính (≤ 2 khung) | Ghi chú |
|---|---|---|
| **1 · Thực địa** | Sảnh tòa B: lời bác Thịnh + thẻ lịch → giấy nhớ **[Tòa B]**, **[Báo chí K24]** | Buổi tối: Tùng dẫn tới trước khi bác Thịnh giao ca; người chơi tự soi khe hộp |
| **2 · Phòng máy** | Cô Hạnh cấp quyền (1 khung), rồi vào phòng máy. Tùng: "Tớ cá là cứ OR vào…" → `toa_nha='B' OR nganh='Báo chí'` → **4 lớp**. Hà Vy: "Đừng cá. Tính." Đổi AND → **1 lớp: BC24A** → **"Số liệu đây!"** lần đầu | Chép sổ: AND/OR bằng hai vòng tròn giao và hợp |
| **3 · Thực địa** | CTSV: quy chế sổ niêm phong → giấy nhớ **[Cần mã và căn cứ]**. **Quân** có mặt để giám sát, lạnh lùng nhắc: "Các bạn chỉ được lập căn cứ. Tra sổ là việc của cô phụ trách." | Phụ: đơn Robotics; chú Cường (khung sáng, cổng KTX) |
| **4 · Phòng máy** | Kéo [H] với phép "bằng" → **0 dòng** (không ai tên đúng một chữ "H"). Tùng: "Tra sổ chị Linh đi" → trang lỗi thường gặp → đổi "bắt đầu bằng" (`ten LIKE 'H%' AND ma_lop='BC24A'`) → **2 dòng: Hiếu SV240228, Hoài SV240317** | Bẫy tự chọn: `ma_lop LIKE 'BC%'` → 3 dòng (thêm Hồng BC24B); lọc nhầm cột `ho_dem` → Hồ Ngọc Mai. Phụ: nhật ký in. Chép sổ: LIKE |
| **5 · Thực địa** | Nộp 2 mã kèm căn cứ; cô phụ trách tra sổ: **SV240317 có, SV240228 không** → **[Hoài là người nộp]**. Minh Anh: "Nói có sách, mách có chứng. Tới đây thôi." | Phụ: Đạt. Nhiễu: ảnh Hiếu chạy tiếp sức. Buổi tối: Hà Vy soát hồ sơ |

## 7. True end

Cần **nhật ký in** và **ít nhất một trong hai lời kể**: chú Cường hoặc Đạt (QĐ-087).
- Nhật ký in (hệ thống) cho thấy người **in** thư là một tài khoản năm 4, không phải người nộp.
- Chú Cường (người ngoài cuộc) thấy phong bì được **trao tay** cho một bạn nữ Báo chí trước giờ nộp.
- Đạt là người quen, thuật lại lời Hoài nói cùng buổi sáng; khi giải trình phải nói rõ giới hạn đó.
- Thiếu nhật ký in, hoặc thiếu cả hai lời kể → kết thường.

## 8. Ngày 6 — buổi họp rà soát (thứ Hai tuần 3)

Thầy Quang chủ trì; có cô Lan; Quân trình bày tóm tắt của Hội sinh viên: "phản ánh là **diện rộng**".
- **Nhịp 0:** Quân chiếu truy vấn "tên H **hoặc** lớp BC24A" → **14 dòng**: "Các bạn chỉ đưa ra hai."
- **Nhịp 1:** người chơi chạm vào `OR`. Chạm sai mất 1 vạch.
- **Nhịp 2:** sửa thành AND → **2 dòng** → **"Số liệu đây!"**. Chạy thử không phạt.
- **Nhịp 3:** Hà Vy: "Anh lấy phần hợp, câu hỏi cần phần giao."
- **Nhịp 4:** "Theo điều kiện trên màn hình, hai dòng này là ai?" → *hai người thỏa điều kiện lọc, cần kiểm tiếp.* Sai: hai người đã bỏ thư / cùng động cơ / đã viết thư. Sai mất 1 vạch.
- **Nhịp 5:** thầy Quang: "Vậy hai bạn này là thủ phạm?" → *chưa nói được; sổ niêm phong chỉ cho biết mã của Hoài có trên phiếu gửi, chưa cho biết ai viết thư.* Sai: "có", hoặc "không, hai bạn không liên quan" (QĐ-090). Sai mất 1 vạch.
- Mỗi lần mất vạch, Minh Anh đổi sắc mặt và giải cứu (xin làm lại hoặc nói đỡ); không hoàn vạch, không nói thay đáp án. Hết vạch thì hoãn buổi, quay lại điều tra, không mất tiến độ.
- **Cú lật:** Hoài ngồi chờ ngoài phòng họp theo quy chế (thư yêu cầu phản hồi). Người chơi chọn: mời vào tự kể (→ rẽ kết theo bằng chứng) / đối chất (mất 1 vạch, kết thường) / không mời (kết thường) — QĐ-090.
  - **Có đủ bằng chứng true end:** người chơi trình nhật ký in và lời kể. Hoài kể "một anh khóa trên" nhờ cô nộp hộ "bản kiến nghị", dặn cứ ký như bình thường; cô không đọc thư. Hoài **không nêu tên**.
  - **Không đủ:** Hoài chỉ nói "em chỉ nộp thôi", rồi im lặng.

## 9. Hai kết

- **Kết thường:** thư vẫn được tính là một ý kiến sinh viên trong hồ sơ. Hoài **không bị phạt**. Thầy Quang: không thu phòng ngay; CLB được **đến hết học kỳ**, kèm điều kiện **báo cáo hoạt động hằng tháng**. Câu cuối: *"Hai dòng chỉ cho ta chỗ cần đến. Phần còn lại phải đợi một nguồn khác."*
- **True end:** thư bị **loại khỏi hồ sơ rà soát**, vì được soạn bởi người khác rồi mượn tay tân sinh viên. CLB được đến hết học kỳ **không kèm điều kiện**. Thầy Quang giao Hội sinh viên xác minh việc mượn tay, không nêu tên người nhờ. Quân: "Dữ liệu không nói dối. Nhưng người đọc dữ liệu thì có… hôm nay là tôi." Hiếu ghé phòng CLB, gật đầu. Câu cuối (thông điệp của game) như ở mục 1.
- **Cả hai kết:** thu hồi quyền dữ liệu tạm, hủy danh sách mã, ghi một dòng vào nhật ký vụ.
- **Móc sang mùa:** trang cuối sổ chị Linh: *"Căn phòng này giữ nhiều hơn em nghĩ."* (lời nhắn Vụ 1 trong GDD §13). Một bóng người đeo huy hiệu bánh răng đi ngang sân. Tùng: "Tớ cá là…"; Hà Vy: "Đừng cá."

---

## 10. Dữ liệu minh họa và kiểm số dòng

Bộ dữ liệu đầy đủ và các truy vấn nằm trong `docs/mvp/kiem-du-lieu-vu1.py` (chạy `python docs/mvp/kiem-du-lieu-vu1.py`). Dữ liệu được chốt trước, số dòng trong thoại suy ra từ dữ liệu, không làm ngược lại.

- **`lop_sinh_hoat`** (`ma_lop`, `nganh`, `khoa_hoc`, `toa_nha`): 11 lớp, gồm KT24A (B), QT24B (B), **BC24A (Báo chí, B)**, **BC24B (Báo chí, C)**, CT24A (Công nghệ thông tin, A) và 6 lớp ở tòa A/C.
- **`sinh_vien`** (`ma_sv`, `ho_dem`, `ten`, `ma_lop`): 26 người.
  - **BC24A có 6 người:** Hiếu SV240228, Hoài SV240317, Hồ Ngọc Mai, Đạt, Yến, Phúc.
  - Hồng ở BC24B. 7 người tên H ở các lớp khác: Hải, Huy, Hương, Hùng, Hậu, Hằng, Hưng.
  - **3 người tên Tùng:** Trần Tùng (DL24A, SV240251 — Tùng của truyện), Nguyễn Thanh Tùng (KT24B), Vũ Sơn Tùng (CT24A).
  - Không dùng tên trùng nhân vật truyện ngoài ba người tên Tùng (Hạnh, Hà, Linh, Thịnh, Cường, Duy, Quân…). Test QĐ-014 cần thêm ngoại lệ cho "Tùng".
- **Danh sách tra cứu ở Ngày hội** là một bảng nhỏ (mã, họ tên, ngành) lấy từ cùng dữ liệu; giao diện lọc giống bàn làm việc.

**Kiểm số dòng** (đã chạy SQLite ngày 28/09/2026):

| Truy vấn | Số dòng |
|---|---|
| Ngày hội: `ten = 'Tùng'` | 3 |
| N2: `toa_nha='B' OR nganh='Báo chí'` | 4 |
| N2: `toa_nha='B' AND nganh='Báo chí'` | 1 (BC24A) |
| N4: `ten = 'H'` | 0 |
| N4: `ten LIKE 'H%' AND ma_lop='BC24A'` | 2 |
| Bẫy `ma_lop LIKE 'BC%'` | 3 |
| Bẫy `ho_dem LIKE 'H%'` trong lớp | 1 |
| Quên điều kiện lớp | 10 |
| N6: câu OR của Quân | **14** |
| N6: AND sau khi sửa | 2 |

## 11. Tài sản cần cho MVP (ước lượng)

- **7 cảnh nền:** phòng KTX; cổng KTX (dùng chung ngày và tối); sảnh tòa B; căng tin; ngoài phòng máy; nhà văn hóa (dùng chung bảng tin và Ngày hội); phòng CLB. Cộng các cảnh Vụ 1 đã có hoặc đã liệt kê ở GDD §16 (phòng máy trong, CTSV, phòng Đào tạo, phòng họp).
- **Ảnh nhân vật mới:** Duy; Hiếu (2–3 cảnh); Hoài (đã có ảnh ở prototype); Đạt (chỉ khi cần lên hình). Cô phụ trách hộp chỉ qua lời kể.
- Nhân vật chính là nam; nếu có ảnh người chơi thì chỉ cần một bộ.
