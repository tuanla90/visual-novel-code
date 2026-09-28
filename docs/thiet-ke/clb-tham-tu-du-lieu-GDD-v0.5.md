# CLB Thám Tử Dữ Liệu — Tài liệu thiết kế (v0.5, cập nhật 28/09/2026)

> Game học SQL nhập vai tân sinh viên năm nhất, lối chơi lấy cảm hứng từ dòng game điều tra – xét xử kiểu Ace Attorney.
> Là dòng game đầu tiên của **Vũ trụ Chấn Hưng** — xem `vu-tru-chan-hung-tong-quan.md` cho nhân vật chung, dòng thời gian và kiến trúc dùng chung.
>
> **Cập nhật 28/09/2026 (theo QĐ-070 → QĐ-083 trong `docs/lich-su-quyet-dinh.md`):**
> - Trường đổi tên thành **Trường Đại học Chấn Hưng** (QĐ-080); tên trường là biến trong nội dung. Chuỗi đổi tên thành **Vũ trụ Chấn Hưng** (QĐ-085).
> - Họ tên: **Lê Minh Anh**, **Trần Hà Vy**; câu cửa miệng theo QĐ-084. Thứ tự ưu tiên tài liệu: vũ trụ → GDD → MVP → prototype (QĐ-084).
> - **Bộ ba cùng năm 1** (QĐ-074, QĐ-081): Tùng giỏi tìm kiếm trên bản đồ, người chơi giỏi tin học, Hà Vy giỏi logic toán; xưng "tớ – cậu". Minh Anh giao vụ, mở địa điểm, bảo vệ người chơi ở giải trình (§3.1).
> - **Sổ tay:** sổ chị Linh chỉ hiện qua hoạt cảnh; người chơi có **sổ cá nhân**, chép dần qua câu kiểm tra toán của Hà Vy; bỏ gợi ý 3 cấp và không đếm gợi ý (QĐ-080, QĐ-083).
> - **Buổi giải trình: phản biện 5 nhịp**, trừ uy tín ở nhịp 1, 4, 5, Minh Anh giải cứu (QĐ-082, QĐ-083) (§5.2). Câu hô đổi thành **"Số liệu đây!"**.
> - **Nhân vật phụ kiểu miền Bắc:** bác Tư → **bác Thịnh** (bảo vệ giảng đường B), chú Bảy → **chú Cường** (QĐ-081).
> - **MVP (QĐ-077):** dữ liệu cố định, chưa có mã đề (§4, §12 là đích sau MVP); trình dựng dạng **bàn làm việc với giấy nhớ** thay cho Khối lệnh/Blockly (QĐ-071); chưa làm trang phục, mini game.
> - **Vụ 1 (§14) viết trước QĐ-073:** vòng chính nay chỉ dạy WHERE, `=`, `LIKE`, AND/OR; "Báo chí" là ngành, có lớp BC24A; câu OR của Quân ra 14 dòng. Phần §14 sẽ viết lại ở gói kịch bản MVP; khi mâu thuẫn, sổ quyết định thắng.
>
> **Thay đổi so với v0.4:**
> - Mục 10.4 mới: **Bảng phân tích** (kéo chiều phân tích, chỉ số — kiểu Power BI) và **Sơ đồ quan hệ** (kéo dây nối bảng = JOIN).
> - Mục 12: thêm các **lỗi kiểu BI** cho truy vấn của rival.
> - Mục 12.1 mới: ghi chú kiến trúc tách phần kể chuyện khỏi phần giải đố.
>
> **Thay đổi ở v0.4 (so với v0.3):**
> - Mục 9 mới: **lối chơi cốt lõi** — point and click đan xen viết code, vòng lặp và tỉ lệ.
> - Mục 10 mới: **dữ kiện thành chip** trong mode Khối lệnh.
> - Mục 15 mới: **phong cách hội họa**.
> - Mục 16 viết lại: **danh sách asset tối thiểu** cho demo, chuẩn kỹ thuật và thứ tự làm.
> - Kịch bản lời thoại buổi giải trình vụ 1 nằm ở file riêng `vu1-buoi-giai-trinh-kich-ban.md`.
>
> **Thay đổi ở v0.3 (so với v0.2):**
> - Lịch sử CLB: mạnh về manh mối thực tế, sa sút vì không ai điều tra được bằng dữ liệu.
> - Hai pha **Điều tra** và **Giải trình**, hệ thống **vật chứng** và **thanh uy tín**.
> - **Dữ kiện phải tự đi tìm** trên bản đồ, không được cho sẵn.
> - **Tùng hỏi chuyện để tạo mã đề** ở đoạn mở đầu.
> - Vòng vụ việc rút còn **4 buổi**; bỏ trắc nghiệm và vấn đáp riêng.
> - Thêm **rival** ở buổi giải trình; Hà Vy chuyển thành trợ thủ.
> - Thêm **mini game giúp NPC**, phần thưởng là **trang phục**.

---

## 1. Các quyết định đã chốt

| Hạng mục | Quyết định |
|---|---|
| Đối tượng mùa 1 | Sinh viên năm 1–2 và học sinh cuối cấp |
| Bối cảnh | Trường đại học đa ngành hư cấu; dữ liệu của trường là database |
| Nhân vật chính | Tân sinh viên năm nhất, ngành không phải IT |
| Lối chơi | Visual novel điều tra – giải trình, tham khảo Ace Attorney |
| Vòng một vụ | 4 buổi: Nhận vụ → Điều tra (2 buổi) → Giải trình |
| Nhịp thời gian | Học kỳ 1 năm nhất, 18 tuần; CLB sinh hoạt 2 buổi/tuần; 1 vụ ≈ 2 tuần |
| Dữ kiện | Một phần phải tìm bằng cách đi bản đồ, xem xét cảnh, nói chuyện |
| Mã đề | Tạo từ câu trả lời của người chơi với Tùng + chuỗi ngẫu nhiên riêng — **sau MVP**; MVP dùng dữ liệu cố định (QĐ-077) |
| Mode chơi | Trình dựng truy vấn dạng **bàn làm việc với giấy nhớ** (QĐ-071, thay Blockly) và Hardcore (SQL thuần, mở sau Vụ 1) |
| Thiết bị | **Laptop là nền chính** (QĐ-028, QĐ-085); điện thoại là mục tiêu sau — các chi tiết cho điện thoại trong tài liệu này (bản đồ dọc, vùng chạm 44 pt, cắt ảnh dọc) để dành cho lúc đó |
| Phần thưởng phụ | Trang phục cho nhân vật chính, kiếm bằng mini game giúp NPC — chưa làm ở MVP |

---

## 2. Thế giới

**Trường Đại học Chấn Hưng** (QĐ-080; trong nội dung là biến `{{truong.ten-day-du}}`) — đại học đa ngành (kinh tế, kế toán, du lịch, công nghệ thông tin, ngôn ngữ, luật). Khuôn viên có giảng đường A–B–C, thư viện, ký túc xá, nhà văn hóa sinh viên và hàng phượng dọc lối vào.

### 2.1. Lịch sử CLB Thám Tử

- **Thời hoàng kim:** CLB do một nhóm sinh viên thành lập hơn 20 năm trước, trong đó có thầy Quang (bí mật cuối mùa). CLB nổi tiếng nhờ **điều tra bằng manh mối thực tế**: quan sát hiện trường, hỏi chuyện nhân chứng, đọc dấu vết. Những vụ việc trong trường khi đó phần lớn được giải bằng đôi mắt và đôi chân.
- **Thời sa sút:** trường chuyển hết sang hệ thống số — thẻ ra vào, đăng ký học phần trực tuyến, thư viện điện tử, sổ quỹ trên máy. Manh mối giờ nằm trong dữ liệu, mà thành viên CLB **không ai đọc được dữ liệu**. CLB giải được ngày càng ít vụ, thành viên bỏ dần.
- **Chị Linh**, cựu chủ nhiệm, là người đầu tiên nhận ra vấn đề. Chị tự học SQL và để lại **cuốn sổ** ở phòng CLB (cú pháp, điểm tâm đắc, lỗi thường gặp), nhưng tốt nghiệp trước khi kịp thay đổi CLB.
- **Người chơi** là mảnh ghép còn thiếu: vẫn đi tìm manh mối thực tế như truyền thống, nhưng biết biến manh mối đó thành truy vấn.

**Chủ đề của game:** *manh mối ngoài đời cho biết phải hỏi gì; dữ liệu cho biết câu trả lời.*

### 2.2. Tình huống mở đầu

Tuần đầu năm học 2026–2027, phòng Công tác sinh viên nhận thư nặc danh đề nghị thu hồi phòng của CLB Thám Tử vì "CLB không còn giải quyết được việc gì". Thầy Phó hiệu trưởng cho CLB **đến hết học kỳ** để chứng minh giá trị.

### 2.3. Ba nguyên tắc của CLB

1. Không kết luận khi chưa có dữ liệu.
2. Chỉ xem dữ liệu khi được phép, và chỉ dùng cho đúng việc.
3. Tìm sự thật để giải quyết vấn đề, không để làm xấu mặt ai.

(Nguyên tắc 1 do chị Linh viết thêm. Tấm bảng cũ chỉ có hai nguyên tắc sau, và ghi "Không kết luận khi chưa có **bằng chứng**" — một chi tiết nhỏ cho người chơi tinh ý.)

---

## 3. Nhân vật

### 3.1. Nhóm thám tử

**Bộ ba cùng năm 1** (QĐ-074, QĐ-081), mỗi người giỏi một thứ, khớp ba mảng lối chơi ở §9: **Tùng** tìm kiếm trên bản đồ · **người chơi** tin học · **Hà Vy** logic toán. Ba người xưng **"tớ – cậu"**. Minh Anh là chủ nhiệm, đứng ngoài bộ ba.

**Người chơi — tân sinh viên năm nhất**
- Tự tạo nhân vật: tên, ngành (khối kinh tế), nam/nữ; có nút "Ngẫu nhiên" (QĐ-077). Ở KTX cùng phòng với Tùng.
- **Giỏi tin học** theo nghĩa quen Excel, máy tính; vẫn học ngành kinh tế, chưa biết SQL. **Tự học**: chép dần kiến thức từ sổ chị Linh vào **sổ cá nhân** (QĐ-083).
- Câu hô khi phản bác — câu "Objection!" của game: **"Số liệu đây!"** (QĐ-082). Lần đầu buột miệng khi truy vấn đầu tiên ra kết quả, về sau hô ở buổi giải trình khi chạy lại truy vấn đã sửa.

**Trần Tùng — năm nhất ngành Quản trị du lịch – lữ hành, bạn cùng phòng KTX**
- Thành viên CLB, **người kéo người chơi vào CLB** (QĐ-074). Vui vẻ, mê game, trung thành, hay đoán bừa. Câu cửa miệng: **"Tớ cá là…"**.
- Biết khắp trường vì: là **cháu chú Cường** (bảo vệ KTX), hồi nhỏ hay theo chú vào trường; làm **tình nguyện viên đón tân sinh viên**; có "máu hướng dẫn viên".
- **Giỏi tìm kiếm trên bản đồ** (QĐ-081): chỉ đường, nhắc lịch và nhiệm vụ, giúp khi người chơi loay hoay tìm điểm xem xét (§9); khi phát sinh nhu cầu học cú pháp mới hoặc khi người chơi bí, gợi ý "tra sổ chị Linh đi" — chỉ gợi ý, **không tra hộ** (QĐ-080, QĐ-083).
- Không biết đọc dữ liệu. Ở thử thách đầu, tự chọn OR sai để mở tình huống (QĐ-073).

**Lê Minh Anh — chủ nhiệm CLB, năm 3 ngành Luật kinh tế**
- Quyết đoán, trách nhiệm, căng thẳng vì sợ CLB bị giải thể. Xưng "chị – em" với bộ ba.
- **Giao vụ**; dẫn người chơi đi gặp thầy cô và người quản lý dữ liệu mới, qua đó **mở địa điểm mới trên bản đồ** (Minh Anh mở, Tùng dẫn đường trong chỗ đã mở) (QĐ-080). Trao sổ chị Linh cho người chơi xem ở cảnh dọn phòng CLB.
- Ở buổi giải trình: đại diện CLB cùng người chơi; **thể hiện cảm xúc theo thanh uy tín**; mỗi lần người chơi mất vạch, cô đổi sắc mặt và **giải cứu** — xin cho làm lại hoặc nói đỡ — nhưng không hoàn lại vạch, không nói thay đáp án (QĐ-083).
- Câu cửa miệng: **"Nói có sách, mách có chứng."** (QĐ-084).

**Trần Hà Vy — năm nhất ngành Toán ứng dụng**
- Kỹ tính, hoài nghi, tốt bụng. Câu cửa miệng: **"Khoan, tính lại đã."** (QĐ-081); đáp Tùng: **"Đừng cá. Tính."** (QĐ-084).
- **Giỏi logic toán, không giải thích cú pháp SQL** (QĐ-080). Diễn giải bằng ẩn dụ toán học (vd hai vòng tròn giao – hợp cho AND/OR); câu hỏi kiểm tra của cô — người chơi chọn đoạn code khớp lời toán học — **chính là bước chép kiến thức vào sổ cá nhân** (QĐ-083).
- Soát hồ sơ trước buổi giải trình (so từng giấy nhớ với dữ kiện). Ở buổi giải trình, gọi tên lỗi của Quân bằng ngôn ngữ toán sau khi người chơi sửa xong (QĐ-082). Chỉ lên tiếng khi con số bất thường; không nói "đúng rồi / sai rồi" về kết quả truy vấn.

**Phạm Diệu Linh — cựu chủ nhiệm (đã tốt nghiệp, đi du học)**
- Để lại **cuốn sổ tự học SQL** ở phòng CLB: đủ nội dung từ đầu (cú pháp, điểm tâm đắc, lỗi thường gặp). Sổ chỉ hiện qua **hoạt cảnh** (một trang viết tay phóng to), không có giao diện lật riêng (QĐ-083).
- Mỗi vụ có một lời nhắn của chị dẫn tới bí ẩn tổng của mùa.
- Châm ngôn ở trang đầu sổ: **"Kiểm hai lần, kết luận một lần."**; cuối lời nhắn đôi khi có "Đừng vội tin một con số." (QĐ-084).

### 3.2. Rival

**Đặng Hoàng Quân — năm 3 ngành Thống kê kinh tế, trưởng ban Pháp chế – Kiểm tra Hội sinh viên**
- Lạnh lùng, chỉn chu, tự tin. Cũng dùng dữ liệu — nhưng **hay đọc dữ liệu sai theo cách nghe rất hợp lý**: quên điều kiện, quên NULL, nối bảng sai, đếm trùng.
- Câu cửa miệng: "Dữ liệu không nói dối. Nhưng người đọc dữ liệu thì có." (dùng thưa, ở lúc quan trọng).
- Xưng "tôi"; gọi người chơi "em" khi nói trực diện, gọi CLB là "các bạn" khi nói với cả nhóm; người chơi gọi "anh".
- Vai trò trong buổi giải trình: đại diện phía chất vấn, **đưa ra truy vấn phản bác**; người chơi phải chỉ ra lỗi trong truy vấn của Quân. Đây là cách game kiểm tra người chơi có thật sự hiểu hay không, thay cho phần vấn đáp riêng.
- Hành trình: coi CLB Thám Tử là "hội chơi trinh thám nghiệp dư" → dần tôn trọng → cuối mùa trở thành đồng minh.

### 3.3. Giảng viên, cán bộ, người quản lý dữ liệu

| Nhân vật | Vị trí | Dữ liệu phụ trách | Tính cách |
|---|---|---|---|
| **Thầy Đỗ Khải** | Giảng viên khoa HTTT, cố vấn CLB | Giải thích cú pháp; `nhat_ky_he_thong` | Dí dỏm, lập dị, không đưa đáp án, chỉ hỏi ngược. Câu cửa miệng: "Máy chạy đúng cái em viết, chứ không chạy cái em nghĩ." (QĐ-084) |
| **Cô Vũ Hạnh** | Phòng Đào tạo | `sinh_vien`, `lop_sinh_hoat`, `hoc_phan`, `dang_ky_hoc_phan` | Chu đáo, cẩn thận, luôn nhắc bảo mật |
| **Cô Đinh Mai** | Thư viện | `sach`, `muon_sach` | Hiền, mê sách |
| **Chú Cường** | Bảo vệ KTX, chú ruột của Tùng (trước là "chú Bảy", đổi theo QĐ-081) | `ra_vao_ktx` | Xuề xòa, vui tính, nhớ thời hoàng kim của CLB |
| **Bác Thịnh** | Bảo vệ giảng đường B, nhân chứng Vụ 1 (trước là "bác Tư lao công", đổi theo QĐ-081) | — | Tốt bụng, tinh ý, nhớ mặt sinh viên |
| **Cô Hoàng Lan** | Phòng Công tác sinh viên | `quy_clb`, `thu_chi` | Rành rọt, sòng phẳng |

### 3.4. Nhân vật gây áp lực

**Thầy Trịnh Quang — Phó hiệu trưởng**
- Chủ trì các buổi giải trình, đóng vai như thẩm phán. Nghiêm, ít nói, công bằng. Câu cửa miệng: **"Căn cứ vào đâu?"** (QĐ-084).
- Nút thắt cuối mùa: là một trong những người sáng lập CLB thời "manh mối thực tế".

**Vương Khánh — năm 4, trưởng CLB Robotics**
- Đứng sau lá thư nặc danh và các tin đồn vì muốn phòng CLB làm xưởng. Ghi nhầm khoản chi vào quỹ CLB Thám Tử rồi giấu đi.
- Kết: nhận lỗi, xin lỗi; hai CLB dùng chung phòng vào một số buổi.

---

## 4. Đoạn mở đầu: Tùng hỏi chuyện, tạo mã đề

> **Giới hạn 3–4 câu (QĐ-084).** **MVP (QĐ-077):** chỉ hỏi tên, ngành, nam/nữ (có nút "Ngẫu nhiên"), không tạo mã đề; sau MVP thêm tối đa 1 câu nếu cần cho mã đề hoặc nội dung (thay 6 câu bên dưới); không thu thông tin thật, không ghi tên vào telemetry. Phần mã đề dưới đây là đích sau MVP.

**Bối cảnh:** tối đầu tiên ở ký túc xá. Tùng vừa đi đón tân sinh viên về, vừa dọn đồ vừa làm quen.

**Tùng hỏi (người chơi chọn hoặc nhập):**
1. "Cậu tên gì? Tớ gọi sao cho tiện?" → tên nhân vật
2. "Học ngành gì đó?" → chọn 1 trong 3 ngành
3. "Quê ở đâu?" → chọn tỉnh/thành từ danh sách
4. "Sinh nhật ngày nào? Để phòng mình còn tổ chức." → ngày sinh **của nhân vật**
5. "Con số may mắn?" → 1–99
6. "Thích ăn gì nhất ở căng tin?" → chọn từ danh sách món

**Cách tạo mã đề:**
- Mã đề = hàm băm của (các câu trả lời + **một chuỗi ngẫu nhiên riêng** tạo khi lập hồ sơ).
- Chuỗi ngẫu nhiên là bắt buộc: nếu chỉ băm câu trả lời, người chơi có thể nhập lại đúng các câu trả lời trong video giải mẫu để ra cùng dữ liệu và chép đáp án.
- Các câu trả lời còn **đi vào nội dung**: có vài sinh viên cùng quê trong dữ liệu (dùng ở mini game), sinh nhật nhân vật trở thành một sự kiện trong lịch, món ăn yêu thích xuất hiện trong hội thoại ở căng tin.

**Lưu ý thiết kế:**
- Đây là thông tin **của nhân vật trong game**, không phải của người chơi thật. Mỗi câu có nút "Ngẫu nhiên" và game không khuyến khích nhập thông tin thật.
- **Mã đề dạng chữ** (ví dụ `PHUONG-7K2Q`) hiện ở hồ sơ, để giáo viên hỗ trợ hoặc để quay video trên một mã đề cố định.
- "Chơi lại vụ với dữ liệu mới" có thể đổi chuỗi ngẫu nhiên của riêng vụ đó.

---

## 5. Vòng một vụ việc: 4 buổi

| Buổi | Tên | Nội dung |
|---|---|---|
| 1 | **Nhận vụ** | Vấn đề xuất hiện; gặp người quản lý dữ liệu, được cấp quyền truy cập bảng mới; xem vài dòng dữ liệu mẫu |
| 2 | **Điều tra I** | Đi bản đồ, xem xét cảnh, nói chuyện → tìm dữ kiện → truy vấn → lưu vật chứng |
| 3 | **Điều tra II** | Tiếp tục; khép lại các nghi vấn; chốt danh sách vật chứng mang theo |
| 4 | **Giải trình** | Đối chất với nhân chứng, phản bác rival, trình bày kết luận trước thầy Quang |

Giữa các buổi: nhóm chat CLB, mini game giúp NPC.

### 5.1. Pha Điều tra

**Ba cách tìm dữ kiện:**
- **Xem xét cảnh:** chạm vào vật thể trong phông nền (lá thư, bảng tin, sổ trực, tờ rơi, dấu vết). Một số vật thể chứa **một đoạn thông tin** — chữ cái, mã phòng, giờ, logo, số đuôi thẻ.
- **Nói chuyện:** hỏi NPC theo chủ đề. Thông tin mới mở thêm chủ đề hỏi.
- **Đưa vật chứng:** đưa một vật chứng cho NPC để mở thông tin mới.

**Dữ kiện là tham số ngẫu nhiên theo mã đề.** Chữ cái trên chữ ký, tòa nhà có hộp góp ý, logo câu lạc bộ… đều khác nhau giữa các người chơi. Muốn viết truy vấn đúng thì phải thực sự đi tìm.

**Giấy nhớ dữ kiện** (QĐ-071/072, QĐ-081): người chơi ghi mỗi dữ kiện tìm được thành một giấy nhớ, dán lên tường; cuối vụ các giấy nhớ được đính vào sổ cá nhân. Có cả **dữ kiện gây nhiễu** (tin đồn sai, chi tiết không liên quan) để người chơi phải chọn lọc.

**Vật chứng:** gồm vật thể tìm được (ảnh lá thư, mẩu logo…) và **kết quả truy vấn** người chơi chủ động lưu lại. Vật chứng mang vào buổi giải trình.

**Khóa tiến trình:** buổi điều tra chỉ kết thúc khi đã có đủ các vật chứng then chốt. Tùng nhắc nếu còn thiếu ("Mình chưa hỏi bác Thịnh ở giảng đường B đó").

### 5.2. Pha Giải trình

**Bối cảnh:** phòng họp phòng Công tác sinh viên. Thầy Quang chủ trì (ở phiên họp có thể gọi sinh viên là "anh/chị"). Minh Anh và người chơi đại diện CLB; Hà Vy ngồi phía CLB; Tùng có mặt (chỗ ngồi chưa chốt). Quân đại diện phía chất vấn.

**Cơ chế:**
- **Lời khai:** nhân chứng khai từng câu. Người chơi đi tới lui giữa các câu.
- **"Hỏi thêm":** ép nhân chứng nói chi tiết hơn; có thể lộ câu khai mới.
- **"Số liệu đây!":** đưa vật chứng mâu thuẫn với một câu khai.
- **Truy vấn tại chỗ:** ở câu khai then chốt, người chơi phải viết truy vấn mới ngay trong buổi để bác bỏ (dùng dữ kiện đã tìm).
- **Phản biện rival — 5 nhịp** (QĐ-082, QĐ-083):
  0. Quân **nói lập luận sai bằng lời**, rồi chiếu truy vấn.
  1. Người chơi **chỉ dòng sai** (cáo buộc) — chạm sai mất 1 vạch.
  2. Người chơi **sửa và chạy lại** trên màn chiếu → **"Số liệu đây!"** — chạy thử không phạt.
  3. **Hà Vy gọi tên lỗi bằng ngôn ngữ toán** — không hỏi, không chấm.
  4. Câu đọc kết quả (vd "Theo điều kiện trên màn hình, hai dòng này là ai?") — chọn sai mất 1 vạch.
  5. Thầy Quang hỏi kết luận (vd "Vậy hai bạn này là thủ phạm?") → đáp đúng là yêu cầu nguồn xác minh độc lập; **kết luận vội** mất 1 vạch.
  - Mỗi lần mất vạch, **Minh Anh đổi sắc mặt và giải cứu** (xin cho làm lại hoặc nói đỡ); không hoàn vạch. Telemetry ghi lựa chọn đầu tiên ở nhịp 4–5.
  - Luật viết: mỗi buổi **một lỗi chính** của Quân; lỗi đó người chơi **đã gặp và tự sửa trước**; truy vấn của Quân chạy được, chỉ sai logic; đáp án kiểm bằng cách chạy trên dữ liệu vụ (QĐ-082).
- **Sổ cá nhân** mở được để tự xem lại, không bắt chọn trang.
- **Thanh uy tín 5 vạch:** đưa sai vật chứng, chạm sai dòng, chọn sai ở nhịp 4–5 → mất 1 vạch. Hết vạch → thầy Quang hoãn buổi giải trình, người chơi quay lại điều tra (không mất tiến độ đã có).

**Đánh giá cuối vụ:** số vạch uy tín còn lại, mode chơi → xếp hạng S/A/B/C, ảnh hưởng tới phần thưởng. **Không tính số lần tra sổ** (QĐ-080).

---

## 6. Lịch học kỳ (mùa 1)

CLB sinh hoạt **tối thứ Ba và tối thứ Sáu**. Ngày khác được tua nhanh bằng lịch.

| Tuần | Nội dung | Bảng mở khóa | Kiến thức SQL |
|---|---|---|---|
| 1 | Đêm đầu ở KTX (tạo nhân vật; mã đề sau MVP) · Tùng dẫn đi khắp trường · Ngày hội CLB | — | — |
| 2–3 | **Vụ 1: Bức thư nặc danh** | `sinh_vien`, `lop_sinh_hoat` | WHERE, `=`, LIKE, AND/OR (QĐ-073; IN để màn phụ) |
| 4–5 | **Vụ 2: Lớp học phần biến mất** | `hoc_phan`, `dang_ky_hoc_phan` | ORDER BY, COUNT, SUM, AVG, GROUP BY |
| 6–7 | **Vụ 3: Cuốn sổ biến mất** | `sach`, `muon_sach` | INNER JOIN |
| 8–9 | **Thi giữa kỳ** · Sự kiện Halloween KTX · Mini game | — | Ôn tập |
| 10–11 | **Vụ 4: Ai ở nhà văn hóa lúc 10 giờ tối?** | `ra_vao_ktx` | Ngày giờ, BETWEEN, LEFT JOIN, NULL |
| 12–13 | **Vụ 5: Quỹ hội trại bị lệch** (trùng dịp 20/11) | `quy_clb`, `thu_chi` | GROUP BY + HAVING, subquery |
| 14–15 | **Vụ 6: Ai đã sửa dữ liệu?** | `nhat_ky_he_thong` | CTE, window function |
| 16 | Sự kiện Noel · Mini game | — | Ôn tập |
| 17–18 | **Thi cuối kỳ** · Kết mùa | — | Bài tổng kết |

---

## 7. Mini game: giúp NPC

- NPC có việc cần giúp hiện dấu **"!"** trên bản đồ.
- Mỗi yêu cầu cùng dạng kiến thức với vụ chính gần nhất, dùng bảng đã mở, dữ liệu ngẫu nhiên, **chơi lại được**.
- Quy mô nhỏ: 1–2 truy vấn, không có giải trình.
- **Tiêu chí chia nội dung** (QĐ-082): mạch chính chứa kiến thức cần để phá án hoặc sẽ được coi là đã biết ở vụ sau; mini game / nhiệm vụ phụ chứa biến thể, mẹo nâng cao, bỏ qua không ảnh hưởng. Ví dụ: sắc thái hoa thường của `LIKE` với chữ có dấu trong SQLite là nhiệm vụ phụ nâng cao; mạch chính chỉ dạy "`=` so khớp chính xác từng ký tự, ra 0 dòng thì kiểm dữ liệu".

| Sau vụ | Ví dụ yêu cầu | Kiến thức |
|---|---|---|
| 1 | Bạn tân sinh viên nhờ tìm người cùng quê, cùng khóa để lập nhóm (dùng quê của nhân vật) | WHERE, AND |
| 2 | Lớp trưởng nhờ xem lớp học phần nào sắp bị hủy vì thiếu người | COUNT, GROUP BY |
| 3 | Cô Mai nhờ tìm sinh viên mượn sách quá hạn | JOIN |
| 4 | Chú Cường nhờ tìm thẻ quẹt vào mà không quẹt ra | LEFT JOIN, NULL |
| 5 | Trưởng CLB Guitar nhờ xem tháng nào chi vượt thu | HAVING |

---

## 8. Trang phục

- **Nguồn:** mini game NPC, xếp hạng S của vụ chính, sự kiện theo mùa.
- **Ví dụ:** áo khoa theo ngành, áo CLB Thám Tử, áo tình nguyện, đồ hóa trang Halloween, áo dài 20/11, đồ Noel, áo khoác "thám tử cổ điển" (phần thưởng hoàn thành mùa — gợi về thời manh mối thực tế).
- **Nơi hiển thị:** thẻ hồ sơ, màn hình giải trình, cảnh kết vụ. Nhân vật chính không xuất hiện toàn thân trong hội thoại thường, nên không cần vẽ trang phục cho mọi biểu cảm.
- **Kỹ thuật vẽ:** nhân vật chính vẽ theo lớp (thân – trang phục – phụ kiện) để ghép.
- **Nguyên tắc:** trang phục kiếm bằng việc học, không bán trực tiếp.

---

## 9. Lối chơi cốt lõi: point and click + viết code

Game có hai lối chơi đan xen. Thiết kế xoay quanh việc **cái này dẫn sang cái kia**.

| Lối chơi | Người chơi làm gì | Kết quả |
|---|---|---|
| **Point and click** (manh mối thực tế) — Tùng giỏi | Chọn địa điểm trên bản đồ; chạm vật thể để xem xét; nói chuyện theo chủ đề; đưa vật chứng cho NPC | **Dữ kiện** (chữ cái, tòa nhà, logo, giờ…) ghi thành giấy nhớ |
| **Viết code** (điều tra dữ liệu) — người chơi giỏi | Biến dữ kiện thành truy vấn (bàn làm việc hoặc Hardcore) | **Vật chứng** là kết quả truy vấn |
| **Diễn giải** — Hà Vy giỏi | Đọc kết quả bằng tư duy toán, soát hồ sơ | Kết luận có căn cứ |
| **Giải trình** (hai lối gặp nhau) | Đưa vật chứng bác lời khai; truy vấn tại chỗ; tìm lỗi truy vấn của rival | Thắng vụ, xếp hạng |

**Vòng lặp:** tìm manh mối → biết phải hỏi gì → viết truy vấn → có vật chứng → dùng vật chứng mở thêm manh mối hoặc thắng giải trình.

**Tỉ lệ nhắm tới:** khoảng **40% point and click + hội thoại, 60% viết code và dùng kết quả truy vấn**. Tìm kiếm quá nhiều thì game trôi thành truyện; code quá nhiều thì thành bài tập.

**Ba lỗi point and click cần tránh:**
- **Săn từng điểm ảnh:** có nút "hiện điểm có thể xem xét" — gắn với Tùng (QĐ-081); điểm đã xem được đánh dấu.
- **Bí không biết làm gì:** Tùng nhắc khi người chơi loay hoay quá lâu; khi bí ở màn truy vấn, Tùng gợi ý tra phần "điểm tâm đắc / lỗi thường gặp" của sổ chị Linh (QĐ-083).
- **Điểm chạm quá nhỏ trên điện thoại** (khi làm bản điện thoại, QĐ-085): vùng chạm của mỗi vật thể đủ to cho ngón tay (tối thiểu khoảng 44×44 pt), kể cả khi hình vật thể nhỏ.

---

## 10. Hai mode chơi và chip dữ kiện

> **Cập nhật (QĐ-071, QĐ-085):** **bàn làm việc là hướng của sản phẩm**, không chỉ của MVP — mode Khối lệnh/Blockly được thay bằng bàn làm việc: FROM/SELECT khóa sẵn ở vòng chính, người chơi kéo **giấy nhớ dữ kiện** vào ô giá trị (giấy nhớ đóng vai chip bên dưới), không báo đúng/sai khi chạy. Phần dưới giữ làm tham khảo.

### 10.1. Hai mode
- **Khối lệnh:** Blockly, khối tiếng Việt, SQL hiện song song, có mức "điền vào chỗ trống".
- **Hardcore:** SQL thuần. Mở sau vụ 1; chuyển mode bất cứ lúc nào. Xếp hạng vụ có thưởng thêm khi chơi Hardcore.
- Trong buổi giải trình, **truy vấn tại chỗ** dùng mode người chơi đang chọn.

### 10.2. Dữ kiện thành chip (mode Khối lệnh)

**Ý tưởng:** manh mối tìm được ngoài đời chính là giá trị cắm vào câu lệnh. Người chơi học được rằng giá trị trong truy vấn phải đến từ bằng chứng, không phải đoán mò.

**Cách hoạt động:**
- Mỗi dữ kiện tìm được xuất hiện trong khay **"Manh mối"** cạnh khay khối lệnh, dạng chip có biểu tượng nguồn (lá thư, lời bác Thịnh, bookmark…).
- Kéo chip vào ô trống của khối. Ví dụ: `CHỈ KHI [tên] [bắt đầu bằng] [ ]` + thả chip **"H" (từ lá thư)** → khung SQL hiện `WHERE ten LIKE 'H%'`.

**Các loại chip:**

| Loại | Ví dụ | Cắm vào |
|---|---|---|
| Chữ | "H", "Báo chí" | `=`, `bắt đầu bằng`, `chứa` |
| Số | Tầng 3, 50.000 đồng | `=`, `>`, `<` |
| Ngày giờ | Thứ Hai 14/9, 22:00 | So sánh thời gian, `trong khoảng` |
| **Danh sách** | Các lớp ở giảng đường B | `thuộc danh sách` (IN) |

**Chip danh sách từ kết quả truy vấn:** kết quả truy vấn (ví dụ các lớp ở giảng đường B) lưu được thành chip danh sách, rồi thả thẳng vào khối `thuộc danh sách` của truy vấn sau. Vụ 1 không phải gõ tay mã lớp, và người chơi làm quen ý tưởng "dùng kết quả truy vấn này cho truy vấn khác" — nền cho subquery và JOIN ở các vụ sau.

**Giữ độ khó:**
- **Chip nhiễu** nằm chung khay (ví dụ "CLB Kịch" từ tin đồn căng tin). Người chơi phải chọn đúng chip, không cắm hết.
- **Chip chỉ cắm được vào ô đúng kiểu:** chip ngày không cắm vào ô chữ — dạy kiểu dữ liệu mà không cần giảng lý thuyết.
- Thử thách chuyển từ "nhớ cú pháp" sang **chọn đúng dữ kiện và đúng phép so sánh**.

### 10.3. Chip ở các chế độ khác
- **Hardcore:** không có chip; người chơi tự gõ giá trị. Được phép **chạm dữ kiện trong sổ tay để chèn giá trị** (chỉ giá trị, không kèm cú pháp) để đỡ gõ sai dấu trên điện thoại.
- **Giải trình:** truy vấn tại chỗ ở mode Khối lệnh vẫn dùng chip, nhưng khay chip gồm **toàn bộ dữ kiện và vật chứng của vụ**, nên phải chọn lọc nhiều hơn lúc điều tra.

### 10.4. Bảng phân tích và Sơ đồ quan hệ (kiểu Power BI)

**Ý tưởng:** từ vụ 2, dữ liệu cần tổng hợp chứ không chỉ lọc. Mode Khối lệnh được nâng cấp thành **Bảng phân tích**: kéo cột vào "Chiều phân tích", kéo cột vào "Chỉ số" — giống công cụ BI người đi làm dùng hằng ngày. Câu SQL tương ứng **luôn hiện song song**, nên người chơi vẫn đang học SQL, không phải học một phần mềm.

**Đây không phải mode thứ ba.** Bảng phân tích là dạng nâng cấp của mode Khối lệnh cho các vụ có tổng hợp. Mode Hardcore vẫn là SQL thuần.

**Thao tác và SQL tương ứng:**

| Thao tác | SQL sinh ra |
|---|---|
| Kéo cột vào **Chiều phân tích** | `SELECT cột … GROUP BY cột` |
| Kéo cột vào **Chỉ số**, chọn Đếm / Đếm không trùng / Tổng / Trung bình / Lớn nhất / Nhỏ nhất | `COUNT()`, `COUNT(DISTINCT)`, `SUM()`, `AVG()`, `MAX()`, `MIN()` |
| **Bộ lọc dòng** (trước tổng hợp) | `WHERE` |
| **Bộ lọc chỉ số** (sau tổng hợp, ví dụ "số người < 20") | `HAVING` |
| Sắp xếp, Top N | `ORDER BY … LIMIT` |
| Kéo dây nối giữa hai bảng (Sơ đồ quan hệ) | `JOIN … ON` |
| Bật **"Hiện cả mục không có dữ liệu"** | `LEFT JOIN` |

**Chip dữ kiện vẫn dùng được:** chip số "sĩ số tối thiểu 20" thả thẳng vào bộ lọc chỉ số; chip danh sách thả vào bộ lọc dòng.

**Nguyên tắc: không tự đoán thay người chơi.** Công cụ BI thật tự tổng hợp và tự nối bảng, khiến người dùng không hiểu vì sao ra con số. Trong game:
- Kéo cột số vào Chỉ số thì **phải tự chọn** kiểu tổng hợp, không mặc định là Tổng.
- Quan hệ giữa các bảng **không tự tạo**; người chơi phải tự nối và chọn cột nối.
- Bộ lọc dòng và bộ lọc chỉ số tách thành **hai ô riêng**, có nhãn rõ "trước khi tổng hợp" / "sau khi tổng hợp".

**Lộ trình mở khóa:**

| Vụ | Công cụ mở | Ví dụ dùng |
|---|---|---|
| 1 | Bàn làm việc + giấy nhớ (chỉ lọc) | Lọc sinh viên theo chữ ký, giảng đường, CLB |
| 2 | **Bảng phân tích** | Kéo `ma_lop_hp` vào Chiều phân tích, "Đếm sinh viên" vào Chỉ số, lọc lớp dưới sĩ số tối thiểu |
| 3 | **Sơ đồ quan hệ** | Nối `muon_sach.ma_sv` với `sinh_vien.ma_sv`, `muon_sach.ma_sach` với `sach.ma_sach` |
| 4 | "Hiện cả mục không có dữ liệu" | Tìm thẻ quẹt vào mà không có lần quẹt ra |
| 5 | Bộ lọc chỉ số nâng cao, lồng truy vấn | Tháng nào chi vượt thu |

**Sơ đồ quan hệ trông như bảng ghim chứng cứ:** mỗi bảng là một tấm thẻ ghim trên bảng gỗ, quan hệ là sợi dây đỏ nối giữa hai cột. Nối sai cột (ví dụ `ma_sv` với `ma_sach`) thì kết quả sai ngay, người chơi thấy được hậu quả. Hình ảnh này khớp với chủ đề "manh mối cũ, công cụ mới" và rất hợp để cắt clip.

**Vụ 2 có chìa khóa nằm ở chính một cái bẫy BI:** lớp học phần "biến mất" vì có 0 người đăng ký hợp lệ nên không hiện trong bảng tổng hợp. Người chơi phải nhận ra cần bật "Hiện cả mục không có dữ liệu" (hoặc đếm ngược từ bảng `hoc_phan`) mới thấy lớp đó. (Nếu giữ LEFT JOIN cho vụ 4, vụ 2 có thể dùng cách so sánh `si_so_toi_thieu` với số đếm; chốt khi viết kịch bản vụ 2.)

**Giá trị kinh doanh:** công cụ này là cầu nối thẳng sang dòng **Đi Làm** — "kéo thả trong game, nhìn thấy SQL phía sau" cho người dùng Power BI, Looker Studio.

---

## 11. Schema toàn mùa (SQLite)

```sql
-- Vụ 1
CREATE TABLE lop_sinh_hoat (
  ma_lop TEXT PRIMARY KEY, nganh TEXT, khoa_hoc INTEGER,
  toa_nha TEXT, co_van TEXT
);
CREATE TABLE sinh_vien (
  ma_sv TEXT PRIMARY KEY, ho_dem TEXT, ten TEXT, gioi_tinh TEXT,
  ngay_sinh TEXT, que_quan TEXT, ma_lop TEXT, clb TEXT,
  o_ktx INTEGER, ngay_nhap_hoc TEXT
);

-- Vụ 2
CREATE TABLE hoc_phan (
  ma_lop_hp TEXT PRIMARY KEY, ten_hp TEXT, so_tin_chi INTEGER,
  giang_vien TEXT, phong TEXT, thu INTEGER, tiet_bat_dau INTEGER,
  si_so_toi_thieu INTEGER, trang_thai TEXT
);
CREATE TABLE dang_ky_hoc_phan (
  id INTEGER PRIMARY KEY, ma_sv TEXT, ma_lop_hp TEXT,
  thoi_gian_dk TEXT, trang_thai TEXT
);

-- Vụ 3
CREATE TABLE sach (ma_sach TEXT PRIMARY KEY, ten_sach TEXT, the_loai TEXT, vi_tri_ke TEXT);
CREATE TABLE muon_sach (
  id INTEGER PRIMARY KEY, ma_sach TEXT, ma_sv TEXT,
  ngay_muon TEXT, han_tra TEXT, ngay_tra TEXT
);

-- Vụ 4
CREATE TABLE ra_vao_ktx (
  id INTEGER PRIMARY KEY, ma_the TEXT, thoi_gian TEXT, huong TEXT, cong TEXT
);

-- Vụ 5
CREATE TABLE quy_clb (ma_clb TEXT PRIMARY KEY, ten_clb TEXT, truong_clb TEXT, so_du_dau_ky REAL);
CREATE TABLE thu_chi (
  id INTEGER PRIMARY KEY, ma_clb TEXT, ngay TEXT,
  loai TEXT, so_tien REAL, noi_dung TEXT, nguoi_ghi TEXT
);

-- Vụ 6
CREATE TABLE nhat_ky_he_thong (
  id INTEGER PRIMARY KEY, thoi_gian TEXT, tai_khoan TEXT,
  hanh_dong TEXT, bang TEXT, ban_ghi TEXT, gia_tri_cu TEXT, gia_tri_moi TEXT
);
```

(Từ v0.3 thêm cột `que_quan` vào `sinh_vien` để dùng quê của nhân vật trong mini game.)

**Đạo đức dữ liệu:** bản dữ liệu CLB được cấp không có địa chỉ, số điện thoại, điểm số cá nhân.

---

## 12. Hệ thống sinh đề

- Mã đề sinh ra: tham số dữ kiện của từng vụ, khoảng 300 sinh viên ngẫu nhiên, nhân vật của vụ việc, mồi nhử.
- Nhân vật chính của truyện có thông tin cố định trong dữ liệu.
- **Mồi nhử:** 3–6 sinh viên thỏa mọi dữ kiện trừ đúng một.
- **Dữ kiện gây nhiễu** trong sổ tay cũng sinh theo mã đề.
- **Truy vấn của rival** được sinh từ truy vấn chuẩn bằng cách cài một lỗi (bỏ điều kiện, bỏ ngoặc, sai phép nối…), để lỗi luôn cho ra kết quả khác trên dữ liệu của người chơi.
- **Kho lỗi của rival theo vụ:**

| Vụ | Lỗi cài vào truy vấn của Quân |
|---|---|
| 1 | OR thay AND · thiếu ngoặc khi trộn AND/OR · bỏ sót điều kiện · `LIKE` sai mẫu |
| 2 | Nhầm WHERE với HAVING (lọc sai tầng) · đếm cả đăng ký "đã hủy" · lấy trung bình của các trung bình · bỏ mất nhóm có 0 dòng |
| 3 | **Đếm trùng** do nối qua quan hệ nhiều–nhiều · nối sai cột · dùng `COUNT(*)` thay `COUNT(DISTINCT)` |
| 4 | Dùng INNER JOIN làm mất dòng không khớp · so sánh `= NULL` thay `IS NULL` · sai biên thời gian |
| 5–6 | Subquery trả nhiều dòng · cộng dồn sai thứ tự · xếp hạng sai phân vùng |

### 12.1. Ghi chú kiến trúc

Tách **phần kể chuyện** (bản đồ, hội thoại, vật chứng, giải trình, mã đề, tiến độ) khỏi **phần giải đố SQL** (sql.js, Khối lệnh, Bảng phân tích, Sơ đồ quan hệ, chấm bài, sinh lỗi rival) ngay từ prototype. Các dòng HTML/CSS và Python của Vũ trụ Chấn Hưng sẽ dùng lại phần kể chuyện và chỉ viết phần giải đố mới. Chi tiết giao diện chung giữa hai phần xem mục 8 của `vu-tru-chan-hung-tong-quan.md`.
- Chấm bài: so sánh tập kết quả với truy vấn chuẩn chạy trên cùng dữ liệu.
- Kiểm thử: mỗi khuôn đề chạy ít nhất 1.000 mã đề, bảo đảm có đúng một đáp án và lỗi của rival luôn lộ ra.

---

## 13. Bí ẩn tổng qua 6 vụ

| Vụ | Mảnh ghép | Lời nhắn chị Linh |
|---|---|---|
| 1. Bức thư nặc danh | Người bỏ thư được "một anh năm cuối đeo huy hiệu Robotics" nhờ | "Căn phòng này giữ nhiều hơn em nghĩ." |
| 2. Lớp học phần biến mất | Tin đồn "CLB Thám Tử soi dữ liệu sinh viên" được lan có chủ đích | Một dãy số sau tấm bảng nguyên tắc |
| 3. Cuốn sổ biến mất | Sổ tư liệu cũ của CLB (ghi các vụ thời hoàng kim) bị một người liên quan Robotics mượn | Dãy số khớp vị trí kệ trong thư viện |
| 4. Ai ở nhà văn hóa lúc 10 giờ tối? | Có người đo đạc phòng CLB như chuẩn bị chuyển đồ | Trong kệ sách có chiếc chìa khóa nhỏ |
| 5. Quỹ hội trại bị lệch | Khoản chi ghi nhầm của Robotics, người ghi giấu đi | Chìa khóa mở ngăn tủ trong phòng CLB |
| 6. Ai đã sửa dữ liệu? | Khánh nhận lỗi; thầy Quang tiết lộ là người sáng lập | Ngăn tủ chứa hồ sơ vụ án đầu tiên của CLB, viết tay bởi thầy Quang — và một dòng chị Linh viết thêm: "Manh mối cũ, câu hỏi mới." |

---

## 14. Vụ 1 — Bức thư nặc danh

> **Lưu ý (28/09):** mục này viết trước QĐ-073/074/077/082. Khi mâu thuẫn, theo sổ quyết định: dữ liệu cố định cho MVP; vòng chính chỉ WHERE, `=`, `LIKE`, AND/OR; "Báo chí" là ngành, có lớp BC24A; câu OR của Quân ra 14 dòng; kết buổi giải trình là "chưa đủ kết luận, cần nguồn xác minh độc lập" (QĐ-024), không phải truy vấn ra đúng một người; bác Tư → bác Thịnh (bảo vệ). Viết lại ở gói kịch bản MVP.

> Nguyên tắc cho vụ đầu: **ngắn, dễ, có một cú lật lời khai thật đã**. Người chơi nên nghi đúng người khá sớm; cái thú nằm ở việc chứng minh.

**Thời gian:** tuần 2–3 · 4 buổi
**Bảng:** `sinh_vien`, `lop_sinh_hoat`
**Kiến thức:** SELECT, cột cụ thể, LIMIT, WHERE, so sánh, LIKE, IN, AND/OR, dấu ngoặc, so sánh ngày

**Tham số theo mã đề:**
- `CHU_CAI` — chữ cái chữ ký (H, L, N, P, T, V)
- `TOA` — giảng đường có hộp góp ý (A, B, C)
- `CLB_NGHI` — hai câu lạc bộ có logo giống nhau một phần (ví dụ Báo chí / Văn học)
- `NAM_NHAP` — năm nhập học thật của người bỏ thư (2023–2025)
- `NHAN_CHUNG` — người bỏ thư (sinh ngẫu nhiên, thỏa mọi dữ kiện)

### Buổi 1 — Nhận vụ (tối thứ Ba, tuần 2)

- **Phòng CLB:** Minh Anh báo tin về lá thư nặc danh và hạn "hết học kỳ". Hà Vy: "Mình có thể hỏi chuyện cả trường, nhưng giờ ai cũng nói 'để em xem trên hệ thống'." Minh Anh kể ngắn về thời hoàng kim của CLB và vì sao sa sút.
- **Lời nhắn chị Linh:** người chơi xem xét tấm bảng nguyên tắc, thấy mẩu giấy ký "L.": *"Căn phòng này giữ nhiều hơn em nghĩ."* Người chơi cũng thấy cuốn "sổ tự học SQL" dang dở của chị.
- **Phòng thực hành (thầy Khải):** thầy giới thiệu SQL ("Hỏi máy tính cũng như hỏi cô giáo vụ, nhưng phải đúng mẫu câu"), viết giấy giới thiệu.
- **Phòng Đào tạo (cô Hạnh):** cấp quyền xem `sinh_vien`, `lop_sinh_hoat` (bản lược bớt), nhắc ba nguyên tắc.
- **Truy vấn làm quen:**
  ```sql
  SELECT * FROM sinh_vien LIMIT 10;
  SELECT ho_dem, ten, ma_lop FROM sinh_vien WHERE clb = 'Thám Tử';
  ```
- **Kết buổi:** kết quả chỉ ra 3 thành viên. Minh Anh: "Thứ Sáu mình đi tìm manh mối như ngày xưa. Còn phần dữ liệu thì… trông vào em đấy."

### Buổi 2 — Điều tra I (tối thứ Sáu, tuần 2)

**Tìm dữ kiện:**
- **Phòng Công tác sinh viên (cô Lan):** xem xét bản chụp lá thư → thấy chữ ký **`CHU_CAI`**. (Hỏi chuyện thêm: thư được lấy ra từ hộp góp ý sáng thứ Hai.)
- **Hỏi Tùng:** "Hộp góp ý thì giảng đường nào cũng có. Để tớ hỏi bác Thịnh bảo vệ, bác quen tớ từ hồi tớ mới đi mẫu giáo."
- **Giảng đường (bác Thịnh):** hỏi chuyện → hộp góp ý được mở sáng thứ Hai là hộp ở **giảng đường `TOA`**.
- **Dữ kiện gây nhiễu:** một sinh viên ở căng tin khẳng định "thư do CLB Kịch viết, chắc chắn luôn" — không có cơ sở.

**Truy vấn và vật chứng:**
```sql
-- Sinh viên có tên bắt đầu bằng chữ cái trên chữ ký
SELECT ho_dem, ten, ma_lop FROM sinh_vien WHERE ten LIKE 'H%';

-- Lớp sinh hoạt ở giảng đường có hộp góp ý        → lưu vật chứng
SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B';

-- Kết hợp (mode Khối lệnh: thả chip danh sách lớp; Hardcore: tự gõ — JOIN học ở vụ 3) → lưu vật chứng
SELECT ma_sv, ho_dem, ten, ma_lop, clb
FROM sinh_vien
WHERE ten LIKE 'H%' AND ma_lop IN ('KT24A', 'QT25B', 'MK23A');
```

**Kết buổi:** danh sách còn khoảng 8–12 người. Tùng: "Tớ cá là cái ông hay giành bàn ở căng tin!" — người chơi có thể kiểm tra, và thấy Tùng đoán sai.

### Buổi 3 — Điều tra II (tối thứ Ba, tuần 3)

**Tìm dữ kiện:**
- **Giảng đường `TOA` (xem xét cảnh):** dưới hộp góp ý có một **mẩu bookmark bị xé**, còn nửa logo. Đưa cho Minh Anh → logo khớp một phần với **hai câu lạc bộ `CLB_NGHI`**.
- **Nhà văn hóa (bảng tin CLB):** xem xét bảng tin → xác nhận logo của hai câu lạc bộ đó.

**Truy vấn và vật chứng:**
```sql
-- Thu hẹp theo câu lạc bộ                           → lưu vật chứng
SELECT ma_sv, ho_dem, ten, ma_lop, clb
FROM sinh_vien
WHERE ten LIKE 'H%'
  AND ma_lop IN ('KT24A', 'QT25B', 'MK23A')
  AND clb IN ('Báo chí', 'Văn học');
```

**Kết buổi:** danh sách còn 2–3 người (có mồi nhử). Minh Anh hẹn gặp một người trong số đó hỏi chuyện — bạn ấy chối và nói "sẵn sàng giải trình". Phòng Công tác sinh viên xếp lịch buổi giải trình vào thứ Sáu, **do ban Pháp chế Hội sinh viên chất vấn** — lần đầu người chơi nghe tên Quân.

### Buổi 4 — Giải trình (tối thứ Sáu, tuần 3)

**Mở màn:** thầy Quang chủ trì. Quân mở đầu: "CLB Thám Tử cho rằng mình tìm ra người bỏ thư chỉ nhờ vài câu truy vấn. Ban Pháp chế cần thấy bằng chứng, không phải phỏng đoán."

**Lời khai của `NHAN_CHUNG`:**

1. *"Hôm đó em không hề đến giảng đường `TOA`."*
   - Hỏi thêm → "Em học cả ngày ở giảng đường khác."
   - **Số liệu đây!** → vật chứng: lớp sinh hoạt của bạn ấy ở giảng đường `TOA`.
2. *"Em không tham gia câu lạc bộ nào cả."*
   - **Truy vấn tại chỗ:**
     ```sql
     SELECT clb FROM sinh_vien WHERE ma_sv = 'SV24xxxx';
     ```
   - Kết quả khớp với vật chứng mẩu bookmark.
3. *"Em mới vào trường năm nay, còn chẳng biết CLB Thám Tử là gì."*
   - **Truy vấn tại chỗ:**
     ```sql
     SELECT ngay_nhap_hoc FROM sinh_vien WHERE ma_sv = 'SV24xxxx';
     ```
   - Kết quả cho thấy bạn ấy nhập học từ năm `NAM_NHAP`.

**Rival phản bác:**
Quân: "Trường có hơn 40 người tên bắt đầu bằng chữ `CHU_CAI` ở hai câu lạc bộ đó. Ban Pháp chế vừa kiểm tra lại:"
```sql
SELECT * FROM sinh_vien
WHERE ten LIKE 'H%' OR clb = 'Báo chí' OR clb = 'Văn học';
```
"Ra 57 người. Làm sao CLB Thám Tử khẳng định là bạn này?"

Người chơi phải chỉ ra lỗi: **Quân dùng OR thay vì AND** và bỏ điều kiện giảng đường — rồi đưa truy vấn kết hợp đầy đủ, ra đúng một người.
```sql
SELECT ma_sv, ho_dem, ten
FROM sinh_vien
WHERE ten LIKE 'H%'
  AND ma_lop IN ('KT24A', 'QT25B', 'MK23A')
  AND clb IN ('Báo chí', 'Văn học')
  AND ngay_nhap_hoc < '2026-01-01';
```

(Theo mã đề, lỗi cài vào truy vấn của Quân có thể khác: thiếu ngoặc khi trộn AND/OR, hoặc bỏ điều kiện ngày.)

**Kết buổi giải trình:**
- `NHAN_CHUNG` thừa nhận chỉ **bỏ hộ** lá thư, do một anh năm cuối **đeo huy hiệu CLB Robotics** nhờ. Bạn ấy xin lỗi.
- Quân: "…Lần này là do tôi đọc vội." Nhưng anh nói thêm: "Tìm được người bỏ thư chưa phải là tìm được người viết thư."
- Thầy Quang: "Tìm được sự thật mà không làm ai bẽ mặt. Được. Nhưng học kỳ còn dài."
- **Thầy Khải** sau buổi: bài kiểm tra ngắn viết tay → mở **mode Hardcore**, huy hiệu "Thám tử tập sự".

**Kết vụ:** tối đó ở KTX, Tùng lật mẩu giấy của chị Linh: "Ê, mặt sau có dãy số nè." Mở mini game đầu tiên: bạn cùng quê nhờ tìm người lập nhóm đồng hương.

---

## 15. Phong cách hội họa

**Hướng chọn:** anime học đường nét sạch, tô màu phẳng hai tầng sáng tối (cel-shading), kết hợp chất liệu đời sống Việt Nam. Hợp đối tượng, biểu cảm dễ đọc, dễ tách lớp và dễ giữ đồng đều khi làm nhiều hình (kể cả khi dùng AI).

**Các hướng đã cân nhắc và loại:**

| Phong cách | Lý do không chọn |
|---|---|
| Bán tả thực, kiểu tranh sơn | Khó giữ đồng đều, tốn công, biểu cảm khó đọc trên điện thoại |
| Vector phẳng tối giản | Kém cảm xúc, nhân vật khó được yêu thích, khó viral |
| Chibi đầu to | Khó tạo không khí căng thẳng ở buổi giải trình (có thể dùng cho sticker) |

### 15.1. Nhân vật
- Viền đậm, rõ để nhìn tốt trên màn hình nhỏ.
- Màu phẳng hai tầng (sáng, tối), gần như không dùng chuyển màu.
- Tỉ lệ khoảng 7 đầu, không kéo chân quá dài.
- Biểu cảm mạnh, rõ: ngạc nhiên thì mắt mở hẳn, bị bác thì đổ mồ hôi.
- **Mỗi nhân vật một màu chủ đạo**, nhận ra được ngay cả khi chỉ thấy bóng:

| Nhân vật | Màu chủ đạo |
|---|---|
| Tùng | Cam |
| Minh Anh | Đỏ phượng |
| Hà Vy | Xanh ngọc |
| Quân | Xanh than, xám |
| Thầy Khải | Nâu cà phê |
| Thầy Quang | Xám đậm |

### 15.2. Cảnh nền
- Chi tiết hơn nhân vật nhưng **nhạt và ít bão hòa hơn**, để nhân vật luôn nổi lên trên.
- Không viền, hoặc viền rất mảnh.
- Ánh sáng ấm cho KTX và phòng CLB; lạnh, nghiêm cho phòng giải trình.

### 15.3. Dấu ấn Việt Nam
- Hàng phượng đỏ, quạt trần, bàn ghế gỗ giảng đường, bảng tin dán giấy A4, căng tin với cơm phần và trà đá, bãi xe máy trước KTX.
- Trang phục đời thường sinh viên Việt, áo đồng phục khoa, áo tình nguyện màu xanh.
- Chữ viết tay tiếng Việt trên lá thư, sổ tay, mẩu giấy của chị Linh.

### 15.4. Màn cao trào và giao diện
- **Màn "Số liệu đây!"**: chuyển sang phong cách truyện tranh — đường tốc độ, chữ lớn nghiêng, tương phản mạnh — tách hẳn khỏi khung hội thoại thường.
- **Sổ tay và vật chứng:** tông giấy hồ sơ (kem, ghim, kẹp giấy), gợi thời "manh mối thực tế" của CLB.
- **Trình soạn SQL:** tông màn hình máy tính hiện đại. Tương phản giữa hai tông chính là chủ đề game: manh mối cũ, công cụ mới.

### 15.5. Lưu ý
- Không bắt chước y hệt phong cách của một game hay họa sĩ cụ thể, kể cả Ace Attorney. Chỉ học cách dàn cảnh và thể hiện biểu cảm.
- Nếu dùng AI tạo hình: chốt bảng thiết kế từng nhân vật, luôn dùng ảnh tham chiếu đó khi tạo hình mới, và có người chỉnh tay lại cho đồng đều.
- **Làm thử trước:** Hà Vy (1 tư thế, 3 biểu cảm) trên phông phòng giải trình, xem trên điện thoại. Ưng rồi mới nhân rộng.

---

## 16. Danh sách asset tối thiểu cho demo (tuần 1 + vụ 1)

**Nguyên tắc:** ít nhân vật hơn, nhưng mỗi nhân vật đã làm thì đủ bộ. Vẽ nhân vật **theo lớp**: thân người kèm tay (tư thế) tách riêng khuôn mặt (biểu cảm). Giữ **góc đầu cố định** giữa các tư thế để một bộ biểu cảm dùng được cho mọi tư thế.

### 16.1. Nhân vật (nửa người)

**Nhóm A — xuất hiện liên tục, đủ bộ**

| Nhân vật | Tư thế | Biểu cảm |
|---|---|---|
| Tùng | Đứng thường · giơ ngón cái · gãi đầu | 7 |
| Minh Anh | Đứng thường, cầm sổ đỏ · chống tay lên bàn · khoanh tay suy nghĩ | 7 |
| Hà Vy | Đứng thường · đẩy kính · giơ tay ngăn "Khoan, tính lại đã." | 7 |
| Quân | Khoanh tay · cầm laptop/hồ sơ · chỉ tay phản bác | 7 |

Bảy biểu cảm chuẩn: bình thường, vui, ngạc nhiên, suy nghĩ, lo lắng, nghiêm/bực, và một biểu cảm đặc trưng (Tùng đắc ý, Hà Vy mỉm cười hiếm hoi, Quân khựng lại khi bị bác, Minh Anh thở phào).

**Nhóm B — xuất hiện theo cảnh**

| Nhân vật | Tư thế | Biểu cảm |
|---|---|---|
| Thầy Quang | Ngồi chủ trì · gõ bàn | 4 (nghiêm, liếc, dịu, hài lòng thoáng qua) |
| Thầy Khải | Cầm cốc cà phê · giảng giải | 4 |
| Cô Hạnh | Đứng tại bàn | 3 |
| Cô Lan | Đứng tại bàn | 3 |
| Nhân chứng vụ 1 (2 mẫu: nam, nữ) | Ôm balo · cúi đầu | 6 (lo lắng, cứng giọng, khó chịu, tái mặt, mắt đỏ, cúi đầu) |

Tên nhân chứng thay đổi theo mã đề, hình chỉ cần 2 mẫu.

**Nhóm C — nhân vật phụ**
- Bác Thịnh (bảo vệ giảng đường B), chú Cường (bảo vệ KTX): 1 tư thế, 2–3 biểu cảm.
- 2 mẫu sinh viên chung (căng tin, ngày hội): 1 tư thế, 2 biểu cảm.

**Nhân vật chính**
- Chân dung vai trở lên (thẻ hồ sơ, góc màn giải trình).
- 2 mẫu (nam, nữ) × 3 biểu cảm, cộng 3 lớp trang phục ghép được: áo ngành, áo CLB, áo tình nguyện.

### 16.2. Cảnh nền

**Bắt buộc cho demo**
1. Phòng KTX (đêm đầu và cảnh kết vụ)
2. Phòng CLB, có điểm xem xét: bảng nguyên tắc, kệ, tủ khóa
3. **Phòng giải trình, 3 góc máy:** phía CLB, phía Quân và nhân chứng, ghế chủ trì — đầu tư nhiều nhất
4. Hành lang giảng đường có hộp góp ý
5. Phòng Công tác sinh viên
6. Phòng Đào tạo
7. Phòng thực hành của thầy Khải
8. Căng tin
9. **Bản đồ trường**, dạng dọc cho điện thoại

**Để sau:** sân phượng và ngày hội CLB (tạm dùng căng tin hoặc bản đồ), bảng tin nhà văn hóa (thay bằng ảnh cận vật thể), thư viện, cổng KTX.

**Mẹo:** cảnh ngày và đêm không vẽ hai lần — phủ lớp màu hoàng hôn hoặc tối bằng code.

### 16.3. Vật chứng và cận cảnh
- Lá thư nặc danh (chữ ký là lớp riêng, đổi theo mã đề)
- Mẩu bookmark bị xé (logo là lớp riêng)
- Logo 6 câu lạc bộ để ghép theo mã đề, cộng huy hiệu bánh răng của Robotics
- Mẩu giấy của chị Linh (mặt trước và mặt sau có dãy số)
- Cận cảnh tấm bảng nguyên tắc
- Sổ tự học SQL của chị Linh

### 16.4. Hình đặc biệt
- **Màn "Số liệu đây!"** — thương hiệu của game, xuất hiện nhiều nhất trong clip, làm kỹ nhất.
- Minh họa mở đầu: cảnh lá thư được bỏ vào hộp góp ý (dùng làm ảnh bìa, thumbnail).

### 16.5. Để sau hết
- Hoạt ảnh chớp mắt, mấp máy môi
- Hình toàn thân, cảnh sự kiện (CG) cho các vụ sau
- Trang phục theo mùa
- Nhân vật các vụ sau: Khánh, cô Mai, chú Cường bản đầy đủ

### 16.6. Tổng số lượng

| Nhóm | Số hình (lớp) |
|---|---|
| Nhân vật nhóm A | 4 × (3 tư thế + 7 biểu cảm) = 40 |
| Nhân vật nhóm B | khoảng 35 |
| Nhân vật nhóm C | khoảng 12 |
| Nhân vật chính | khoảng 11 |
| Cảnh nền | 11 (tính 3 góc phòng giải trình) + bản đồ |
| Vật chứng và cận cảnh | khoảng 15 |
| Hình đặc biệt | 2 |
| **Tổng** | **khoảng 125 lớp hình** |

### 16.7. Chuẩn kỹ thuật
- **Nhân vật:** PNG nền trong, cùng chiều cao khung (khoảng 1600 px cho nửa người), đầu đặt cùng một vị trí để ghép biểu cảm không lệch.
- **Cảnh nền:** 2560×1440, có **vùng an toàn ở giữa** để khi cắt dọc trên điện thoại vẫn đủ nội dung chính.
- **Điểm xem xét:** vùng chạm tối thiểu khoảng 44×44 pt trên điện thoại.
- Giữ file gốc nhiều lớp (PSD) để sau này thêm trang phục, biểu cảm.

### 16.8. Thứ tự làm
1. Bảng thiết kế nhân vật (character sheet): góc chính diện, bảng màu, độ dày nét — duyệt 4 nhân vật nhóm A cùng lúc.
2. 4 nhân vật nhóm A đủ bộ.
3. Phòng giải trình (3 góc).
4. Màn "Số liệu đây!".
5. Phần còn lại.

Xong bước 1–4 là dựng thử được màn giải trình — phần quan trọng nhất của demo.

---

## 17. Ảnh hưởng đến thời gian

- Bỏ trắc nghiệm và vấn đáp → kịch bản mỗi vụ gọn hơn.
- Thêm pha giải trình, điểm xem xét cảnh, hệ thống vật chứng, sinh truy vấn lỗi cho rival → phần kỹ thuật tăng khoảng 3–4 tuần.
- Hệ thống chip dữ kiện dùng chung khối Blockly, chủ yếu thêm kiểm tra kiểu dữ liệu và chip danh sách → khoảng 1 tuần, nằm trong ước tính dưới.
- Asset demo khoảng 125 lớp hình (mục 16); nếu thuê họa sĩ, phần này chạy song song với lập trình.
- Ước tính, làm bán thời gian:
  - Story bible + kịch bản tuần 1 và vụ 1 + bộ nhân vật: **4–6 tuần**
  - Demo chơi được (tuần 1 + vụ 1, đủ hai mode): **khoảng 3,5–4 tháng**
  - Mùa 1 hoàn chỉnh: **khoảng 6–8 tháng**

---

## 18. Việc tiếp theo

1. ~~Viết lời thoại đầy đủ buổi giải trình vụ 1~~ — đã xong, xem `vu1-buoi-giai-trinh-kich-ban.md`.
2. Viết kịch bản chi tiết tuần 1 (đêm đầu ở KTX, Tùng dẫn đi khắp trường, ngày hội CLB).
3. Viết lời thoại buổi 1–3 của vụ 1 (điểm xem xét, hội thoại, chip dữ kiện nhận được).
4. Viết hồ sơ ngoại hình chi tiết từng nhân vật (dùng cho họa sĩ hoặc prompt AI); làm thử Hà Vy trên phông phòng giải trình.
5. Prototype: bản đồ + xem xét cảnh + hội thoại + trình soạn SQL có chip + màn giải trình + sinh đề cho vụ 1. Tách phần kể chuyện và phần giải đố ngay từ đầu (mục 12.1).
6. Viết kịch bản vụ 2 để thử Bảng phân tích; chốt vụ 2 dùng cách nào để tìm lớp "biến mất".
