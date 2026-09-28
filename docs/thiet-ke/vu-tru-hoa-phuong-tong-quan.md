# Vũ trụ Hoa Phượng — Tài liệu tổng quan (v0.1)

> Chuỗi game học lập trình nhập vai, cùng diễn ra ở Trường Đại học Hoa Phượng. Mỗi ngôn ngữ là một câu lạc bộ với câu chuyện riêng; nhân vật và sự kiện đan chéo giữa các game.
> Tài liệu này giữ **hướng chung, nhân vật chung, dòng thời gian và kiến trúc dùng chung**. Chi tiết từng game nằm trong tài liệu thiết kế riêng (ví dụ `clb-tham-tu-du-lieu-GDD-v0.5.md`).

---

## 1. Tầm nhìn

**Một câu:** *Học lập trình bằng cách sống một năm đại học — mỗi kỹ năng là một câu lạc bộ, mỗi bài tập là một vụ việc có người cần mình giúp.*

**Nguyên tắc chung cho mọi game:**
1. **Kỹ năng thật, dùng được ngay.** Người chơi viết code thật, thấy kết quả thật. Chế độ kéo thả luôn hiện code tương ứng song song.
2. **Truyện kéo người chơi đi tiếp.** Mỗi game có một bí ẩn hoặc mục tiêu lớn xuyên suốt, không phải chuỗi bài tập rời.
3. **Chấm theo kết quả, không theo câu chữ.** Nhiều cách viết đúng đều được chấp nhận.
4. **Mỗi người một đề.** Dữ liệu, thiết kế, bản đồ sinh theo mã đề để quay video giải mẫu mà không lộ đáp án.
5. **Sai là để học.** Mỗi lỗi có gợi ý từ nhân vật; không phạt nặng.
6. **Không học IT vẫn làm được.** Nhân vật chính luôn là người học ngành khác.
7. **Nội dung an toàn cho học sinh.** Không tuyến tình cảm; trọng tâm là tình bạn, đồng đội, đạo đức khi dùng dữ liệu và công nghệ.

---

## 2. Trường Đại học Hoa Phượng (bối cảnh chung)

Trường đại học đa ngành hư cấu ở một thành phố cỡ vừa: kinh tế, kế toán, du lịch, luật, ngôn ngữ, thiết kế, kỹ thuật, công nghệ thông tin.

**Địa điểm dùng chung** (vẽ một lần, dùng cho mọi game):

| Địa điểm | Dùng ở |
|---|---|
| Hàng phượng, cổng trường | Mọi game (ảnh mở đầu, sự kiện) |
| Ký túc xá | Mọi game (nơi ở của nhân vật chính) |
| Căng tin | Mọi game (tin đồn, NPC nhờ việc) |
| Giảng đường A, B, C | Mọi game |
| Nhà văn hóa sinh viên | Phòng CLB Thám Tử, CLB Truyền thông, bảng tin CLB |
| Thư viện | SQL, Python phân tích |
| Phòng thực hành khoa HTTT (thầy Khải) | Mọi game |
| Xưởng kỹ thuật | Robotics, Game |
| Phòng Công tác sinh viên, nhà hiệu bộ | Mọi game (giải trình, báo cáo) |

**Sự kiện cố định trong năm** (xuất hiện ở nhiều game, tạo cảm giác cùng một thế giới):
- Tuần sinh hoạt công dân, ngày hội CLB (tháng 9)
- Halloween KTX (tháng 10)
- 20/11
- Noel, thi cuối kỳ (tháng 12)
- Tết (tháng 1–2)
- Giải robot quốc gia (tháng 4)
- Ngày hội việc làm, lễ tốt nghiệp (tháng 5–6)

---

## 3. Các dòng game

| Dòng | Câu lạc bộ | Ngôn ngữ / kỹ năng | Đối tượng | Trạng thái |
|---|---|---|---|---|
| **1. CLB Thám Tử Dữ Liệu** | CLB Thám Tử | SQL, bảng phân tích kiểu Power BI | SV năm 1–2, học sinh cuối cấp | **Đang làm (mùa 1)** |
| **2. Trang Web Không Ngủ** | CLB Truyền thông | HTML/CSS, responsive, accessibility | SV, học sinh, người mới học web | Ý tưởng |
| **3. Đội Robot Hoa Phượng** | CLB Robotics | Python cơ bản (điều khiển robot) | Học sinh, SV mới học lập trình | Ý tưởng |
| **4. Gian Hàng Số 7** | CLB Game | Python làm game | Học sinh, SV thích game | Ý tưởng |
| **5. Đi Làm** | — (công ty) | SQL + Power BI + Python phân tích | Người đi làm: kế toán, phân tích dữ liệu | Ý tưởng, dòng thương mại riêng |

(Tên các dòng 2–4 là tên tạm.)

Mỗi dòng có **câu cửa miệng đặc trưng** thay cho "Objection!":

| Dòng | Câu hô khi phản bác |
|---|---|
| SQL | **"Có số liệu đây!"** |
| HTML/CSS | **"Nhìn kỹ đây!"** |
| Robotics | **"Chạy thử là biết!"** |
| Game | **"Test lại đi!"** |
| Đi Làm | **"Số không khớp!"** |

---

## 4. Chi tiết từng dòng

### 4.1. CLB Thám Tử Dữ Liệu (SQL) — đang làm

Xem tài liệu thiết kế riêng. Tóm tắt:
- **Bối cảnh:** CLB từng mạnh nhờ manh mối thực tế, sa sút vì không ai điều tra được bằng dữ liệu. Có thư nặc danh đòi thu hồi phòng CLB.
- **Nhân vật chính:** tân sinh viên năm nhất ngành kinh tế (người chơi tạo).
- **Rival:** Quân (ban Pháp chế Hội sinh viên), đọc dữ liệu sai theo cách nghe rất hợp lý.
- **Lối chơi:** point and click tìm manh mối → viết truy vấn → vật chứng → giải trình.
- **Chấm:** so sánh tập kết quả truy vấn.

### 4.2. Trang Web Không Ngủ (HTML/CSS)

**Bối cảnh:** CLB Truyền thông lo toàn bộ trang web, fanpage, poster, trang sự kiện của trường. Năm nay trưởng ban kỹ thuật vừa tốt nghiệp, để lại một đống trang "chạy được nhưng vỡ khắp nơi". Trước mỗi sự kiện lớn, CLB phải sửa kịp.

**Mục tiêu lớn:** dựng lại trang web chính thức của ngày hội thành lập trường — sự kiện lớn nhất năm — trong một học kỳ.

**Nhân vật:**
- **Nhân vật chính:** tân sinh viên năm nhất ngành Marketing / Truyền thông đa phương tiện / Du lịch (người chơi tạo).
- **Chị Ngọc Hân** — chủ nhiệm CLB Truyền thông, năm 3, mắt thẩm mỹ tốt nhưng không biết code.
- **Phan Gia Bảo** — **rival**, năm 3 Thiết kế đồ họa, nhận làm web tự do. Làm trang rất đẹp trên máy tính của mình, nhưng hay bỏ quên điện thoại, tương phản màu, người khiếm thị. Câu cửa miệng: "Trên máy anh hiện đẹp mà."
- **Cô phụ trách truyền thông của trường** — người giao việc, duyệt trang.
- **Cameo:** Tùng (đăng ký làm cộng tác viên chụp ảnh), Minh Anh (nhờ làm trang tuyển thành viên CLB Thám Tử).

**Lối chơi:**
- **"Tìm điểm khác biệt":** mỗi màn có bản thiết kế chuẩn và trang đang chạy bị lỗi, thanh trượt để so hai bản chồng lên nhau. Sửa HTML/CSS đến khi khớp.
- **Soi trên nhiều thiết bị:** chuyển giữa khung điện thoại, máy tính bảng, máy tính.
- **Point and click:** đi gặp "khách hàng" trên bản đồ để lấy yêu cầu thật (màu nhận diện của CLB Guitar, logo quán cà phê cổng trường, lịch sự kiện).
- **Buổi duyệt thiết kế (thay buổi giải trình):** Bảo khẳng định trang của mình chuẩn; người chơi chỉ ra lỗi: chữ không đọc được, nút quá nhỏ trên điện thoại, ảnh thiếu mô tả, bố cục vỡ khi chữ dài.
- **Mini game:** NPC nhờ sửa trang của họ; phần thưởng là trang phục.

**Chế độ chơi:**
- **Cơ bản:** chọn thuộc tính và giá trị từ bảng (chip), hiện CSS song song.
- **Hardcore:** gõ HTML/CSS thuần.

**Chấm:** kiểm tra **kết quả hiển thị** — màu, kích thước, vị trí, khoảng cách của phần tử, ở nhiều khổ màn hình — không so từng dòng code.

**Sinh đề:** bản thiết kế đổi màu, khoảng cách, nội dung, bố cục theo mã đề.

**Lộ trình kiến thức (gợi ý):**

| Chương | Vụ việc | Kiến thức |
|---|---|---|
| 1 | Trang tuyển thành viên bị lỗi chữ | Thẻ HTML cơ bản, văn bản, liên kết, ảnh |
| 2 | Poster điện tử sai màu nhận diện | CSS màu, font, chọn phần tử |
| 3 | Lịch sự kiện lệch hàng | Box model, margin, padding |
| 4 | Menu vỡ trên điện thoại | Flexbox, responsive, media query |
| 5 | Trang ảnh ngày hội | Grid, ảnh responsive |
| 6 | Buổi duyệt cuối cùng | Accessibility, form, tổng hợp |

### 4.3. Đội Robot Hoa Phượng (Python cơ bản)

**Bối cảnh:** diễn ra **ngay sau mùa 1 của SQL**. Khánh đã nhận lỗi, CLB Robotics và CLB Thám Tử dùng chung phòng. Đội robot cần thành viên mới để kịp giải robot quốc gia tháng 4.

**Mục tiêu lớn:** đưa đội vào chung kết giải robot quốc gia.

**Nhân vật:**
- **Nhân vật chính:** sinh viên năm nhất (người chơi tạo), mới vào CLB Robotics.
- **Vương Khánh** — trưởng CLB, năm 4. Tuyến chuộc lỗi: từ người từng làm sai vì quá muốn thắng, học cách dẫn dắt đội.
- **Rival:** đội robot trường bạn (Trường ĐH Kỹ thuật Hải Đăng, hư cấu), với đội trưởng giỏi nhưng coi thường "dân không chuyên".
- **Cameo:** thầy Khải (cố vấn kỹ thuật), Hà Vy (giúp tính toán quãng đường), Quân (trọng tài giải trong trường).

**Lối chơi:**
- Robot đi trên sân thi đấu dạng lưới; người chơi viết Python để robot nhặt vật, tránh chướng ngại, về đích.
- **Buổi review chiến thuật (thay giải trình):** đội bạn khoe đoạn code "tối ưu"; người chơi chỉ ra chỗ robot sẽ kẹt, vòng lặp vô tận, trường hợp chưa tính.
- **Point and click:** đi xưởng lấy linh kiện, hỏi kỹ thuật viên, đo sân thi đấu (dữ kiện là kích thước sân, vị trí vật cản theo mã đề).

**Chế độ chơi:**
- **Cơ bản:** **sắp xếp dòng code** (kéo các dòng có sẵn vào đúng thứ tự, đúng thụt lề) — hợp người mới và điện thoại.
- **Hardcore:** gõ Python thuần.

**Chấm:** chạy code bằng Python trong trình duyệt (Pyodide), kiểm tra robot có về đích trên nhiều sân kiểm tra ẩn không.

**Lộ trình kiến thức:** lệnh tuần tự → biến → điều kiện → vòng lặp → hàm → danh sách → xử lý tình huống bất ngờ.

### 4.4. Gian Hàng Số 7 (Python làm game)

**Bối cảnh:** CLB Game được giao gian hàng số 7 ở ngày hội thành lập trường, và phải có **một mini game chơi được** cho khách tham quan. CLB chỉ còn vài người, không ai từng làm game hoàn chỉnh.

**Mục tiêu lớn:** ra mắt mini game ở ngày hội, đạt lượt chơi cao nhất trong các gian hàng.

**Nhân vật:**
- **Nhân vật chính:** sinh viên (người chơi tạo).
- **Tùng** — lúc này đã năm 2, mê game, là cộng sự chính: nghĩ ý tưởng, chơi thử, và đoán bừa lỗi như mọi khi.
- **Rival:** một "cao thủ" viết code chạy được nhưng rối, chậm, dễ sập. Câu cửa miệng: "Chạy được là được."
- **Cameo:** Bảo (vẽ hình cho game), Minh Anh (chơi thử và phàn nàn), chú Bảy (khách chơi thử lớn tuổi nhất).

**Lối chơi:**
- Mỗi chương thêm một tính năng cho game: hiện nhân vật → di chuyển → tính điểm → va chạm → màn chơi → bảng xếp hạng.
- **Buổi playtest và review code (thay giải trình):** khách chơi thử phát hiện lỗi; người chơi chỉ ra nguyên nhân trong code của mình hoặc của rival.
- **Point and click:** đi hỏi khách tham quan muốn game thế nào, lấy yêu cầu từ ban tổ chức.

**Phần thưởng lớn nhất:** cuối mùa, **người chơi có một game của chính mình**, chơi được và chia sẻ bằng link. Đây cũng là cơ chế lan truyền tự nhiên của dòng này.

**Chấm:** bộ test ẩn cho từng tính năng, cộng kiểm tra game chạy không lỗi.

### 4.5. Đi Làm (dòng thương mại cho người đi làm)

**Bối cảnh:** vài năm sau tốt nghiệp. Nhân vật chính vào công ty mới, "quên bớt" kiến thức, phải làm quen hệ thống dữ liệu doanh nghiệp.

**Nhân vật:** nhân vật chính (tạo mới hoặc mang từ mùa SQL), gặp lại Hà Vy (kiểm toán), Quân (công ty đối tác), Khánh (mở startup).

**Kỹ năng:** SQL trên dữ liệu doanh nghiệp (bán hàng, kho, công nợ, chứng từ kế toán), Bảng phân tích kiểu Power BI, Python phân tích.

**Điểm bán:** "Kéo thả trong game, nhìn thấy SQL phía sau" — giải đúng chỗ hổng của người dùng Power BI, Looker Studio hằng ngày. Có bài ôn nhanh đầu phần nên chơi được mà không cần mùa trước.

**Giọng văn:** công sở hơn, có yếu tố "vả mặt bằng dữ liệu" vì đối tượng là người lớn.

---

## 5. Nhân vật chung và xuất hiện chéo

| Nhân vật | Nhà | Vai trong các dòng khác |
|---|---|---|
| **Tùng** | SQL (bạn cùng phòng) | Cộng sự chính của dòng Game; cộng tác viên ảnh ở Truyền thông |
| **Minh Anh** | SQL (chủ nhiệm CLB Thám Tử) | Khách hàng ở Truyền thông; người chơi thử khó tính ở Game |
| **Hà Vy** | SQL (trợ thủ) | Giúp tính toán ở Robotics; kiểm toán ở Đi Làm |
| **Quân** | SQL (rival) | Trọng tài giải trong trường ở Robotics; đối tác ở Đi Làm |
| **Khánh** | SQL (người đứng sau bức thư) | Nhân vật chính phụ ở Robotics (tuyến chuộc lỗi); mở startup ở Đi Làm |
| **Thầy Khải** | SQL (cố vấn) | Cố vấn kỹ thuật chung của mọi CLB |
| **Thầy Quang** | SQL (Phó hiệu trưởng) | Người trao giải, chủ trì các buổi duyệt quan trọng |
| **Chú Bảy** | SQL (bảo vệ KTX) | Xuất hiện ở KTX mọi dòng |
| **Chị Linh** | SQL (cựu chủ nhiệm, du học) | Lời nhắn, email thỉnh thoảng; có thể trở về ở Đi Làm |
| **Bảo** | Truyền thông (rival) | Vẽ hình cho game ở dòng Game |
| **Chị Ngọc Hân** | Truyền thông | Người lo truyền thông cho giải robot, ngày hội |

---

## 6. Dòng thời gian trong truyện

| Thời gian trong truyện | Dòng | Nhân vật chính |
|---|---|---|
| Năm học 2026–2027, HK1 | **SQL mùa 1** | Tân SV khóa 2026 |
| Năm học 2026–2027, HK2 | **Robotics** | SV khóa 2026 (nhân vật mới) |
| Năm học 2027–2028, HK1 | **Truyền thông (HTML/CSS)** | Tân SV khóa 2027 |
| Năm học 2027–2028, HK2 | **Game** | SV (nhân vật mới), Tùng năm 2 |
| Năm học 2027 trở đi | **SQL mùa 2–4** (để trống) | Nhân vật chính SQL lên năm 2 |
| Khoảng 2031 | **Đi Làm** | Cựu SV |

---

## 7. Quy tắc giữ nhất quán (canon)

1. **Không tiết lộ nút thắt của dòng trước ở dòng sau** một cách bắt buộc. Người chơi Robotics có thể chưa chơi SQL: chuyện Khánh viết thư nặc danh chỉ được nhắc mơ hồ ("chuyện hồi học kỳ trước"); chuyện thầy Quang sáng lập CLB Thám Tử không được nhắc.
2. **Mỗi game đứng độc lập.** Không bắt buộc chơi game trước; cameo là phần thưởng cho người đã chơi, không phải điều kiện hiểu truyện.
3. **Tên, ngành, năm học, tính cách** của nhân vật chung ghi trong một **bảng nhân vật gốc** duy nhất; mọi kịch bản tra bảng này.
4. **Địa điểm và sự kiện** dùng chung một lịch năm học.
5. **Giọng nói nhân vật ổn định:** Tùng luôn "Tui cá là…", Hà Vy luôn đẩy kính, Quân luôn điềm tĩnh.

---

## 8. Kiến trúc kỹ thuật dùng chung

**Nguyên tắc:** tách **phần kể chuyện** khỏi **phần giải đố**. Thêm ngôn ngữ mới chỉ cần viết thêm một phần giải đố.

### 8.1. Phần kể chuyện (dùng chung cho mọi dòng)
- Bản đồ, điểm xem xét, hội thoại, lịch học kỳ, nhóm chat
- Sổ tay, dữ kiện, vật chứng
- Màn phản bác (giải trình / duyệt thiết kế / review): lời khai, "Hỏi thêm", câu hô, thanh uy tín
- Mã đề, tạo nhân vật, trang phục, huy hiệu, xếp hạng
- Tài khoản, tiến độ, chế độ lớp học cho giáo viên
- Kịch bản viết dạng dữ liệu (JSON/Markdown), không viết cứng trong code

### 8.2. Phần giải đố (mỗi ngôn ngữ một bộ)

Mỗi bộ giải đố cần cung cấp cùng một bộ chức năng:

| Chức năng | SQL | HTML/CSS | Python robot | Python game |
|---|---|---|---|---|
| **Sinh đề** từ mã đề | Dữ liệu, mồi nhử | Bản thiết kế, nội dung | Sân thi đấu, vật cản | Tài nguyên, yêu cầu tính năng |
| **Trình soạn — chế độ cơ bản** | Khối lệnh + chip; Bảng phân tích | Bảng thuộc tính + chip | Sắp xếp dòng code | Sắp xếp dòng code + điền chỗ trống |
| **Trình soạn — Hardcore** | SQL thuần | HTML/CSS thuần | Python thuần | Python thuần |
| **Chạy** | sql.js (SQLite) trong trình duyệt | iframe cô lập | Pyodide | Pyodide + khung vẽ |
| **Chấm** | So tập kết quả | So kết quả hiển thị | Test sân ẩn | Test tính năng ẩn |
| **Sinh lỗi cho rival** | Cài lỗi vào truy vấn chuẩn | Cài lỗi hiển thị | Cài lỗi logic robot | Cài lỗi code |
| **Tạo vật chứng** | Kết quả truy vấn | Ảnh chụp so sánh | Đoạn phát lại robot | Đoạn phát lại game |

Tất cả chạy trong trình duyệt, không cần server chạy code — rẻ và an toàn.

---

## 9. Lộ trình ra mắt

| Giai đoạn | Nội dung | Điều kiện để sang giai đoạn sau |
|---|---|---|
| 1 | **SQL mùa 1** — demo vụ 1, rồi đủ 6 vụ | Có người dùng trả tiền (cá nhân hoặc trường); tỉ lệ chơi hết vụ 1 tốt |
| 2 | **HTML/CSS** — dễ làm nhất, chấm bằng hình ảnh trực quan, hợp viral | Phần kể chuyện đã tách được khỏi phần giải đố SQL |
| 3 | **Robotics (Python cơ bản)** | HTML/CSS có người chơi ổn định |
| 4 | **Game (Python)** | Robotics hoàn chỉnh |
| Song song khi có khách B2B | **Đi Làm** | Có doanh nghiệp hoặc trung tâm đặt hàng |

**Nguyên tắc:** không mở hai dòng cùng lúc trước khi dòng SQL có người trả tiền.

---

## 10. Kinh doanh

| Gói | Nội dung | Khách hàng |
|---|---|---|
| Miễn phí | Tuần 1 + vụ đầu của mỗi dòng | Mọi người (phễu) |
| Cá nhân | Trọn một dòng + video giải mẫu + chứng chỉ | Học sinh, sinh viên, phụ huynh |
| **Lộ trình số năm nhất** | SQL + HTML/CSS + Python | Trường đại học, chương trình hướng nghiệp |
| Lớp học | Tạo lớp, giao bài, theo dõi tiến độ | Giáo viên, trung tâm tin học |
| Đi Làm | SQL + Power BI + Python phân tích trên dữ liệu doanh nghiệp | Doanh nghiệp, người đi làm |

**Tài sản thương hiệu dùng chung:** nhân vật (sticker, merch), câu hô đặc trưng, clip "khoảnh khắc phản bác" cho mạng xã hội.
