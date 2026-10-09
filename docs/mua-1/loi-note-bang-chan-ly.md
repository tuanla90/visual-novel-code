# Lõi mới: note, bảng manh mối, bảng chân lý — và Vụ 1 bản 7

> Bước 0 của plan 09/10/2026. User chốt sau buổi cho người chơi thử. Tài liệu này **ghi đè** các luật cũ chỗ nào va (ghi rõ ở §7).
> Trạng thái: **chờ user duyệt**. Duyệt xong mới sửa canon `story-pilot/thu-nghiem/chan-hung/canon/season/mua-1.yaml` (bản sửa đề xuất ở §8) và chia Bước 1 (kịch bản) + Bước 2 (máy).

---

## 1. Một câu

Mọi thứ người chơi làm trong một vụ đều đẻ ra **note**. Note chưa rõ nằm ở **bảng manh mối**, nối với nhau thành **câu hỏi**; câu hỏi được trả lời bằng **query** hoặc **ra hiện trường**. Note đã rõ đi vào **bảng chân lý**. Buổi họp cuối, người chơi **chỉ ô trên bảng chân lý** để bác lời người hỏi.

```
Quan sát ─┐                         ┌─> query SQL ──────┐
Hỏi người ─┼─> NOTE ─(chưa rõ)─> BẢNG MANH MỐI ─nối─> CÂU HỎI ─┤                   ├─> NOTE mới
Tài liệu ─┘        │                                    └─> ra hiện trường ─┘
                   └─(đã rõ)─> BẢNG CHÂN LÝ ─> buổi họp: chỉ ô bác lời Khánh
```

Luật lọc: **cách chơi nào trong vụ không tạo note thì bỏ**. Hoạt cảnh chỉ để xem, không tương tác. Lớp ngoài vụ (album, người quen, việc ngày lễ, bản đồ, điều hướng) không thuộc luật này.

---

## 2. Note

### 2.1. Keyword — bốn loại

Mỗi note mang **một keyword chính** thuộc một trong bốn loại (kiểu Case Solved):

| Loại | Ví dụ Vụ 1 | Màu ghim (đề xuất) |
|---|---|---|
| Người | Hoài, người đưa phong bì, bác Thịnh | đỏ |
| Thời gian | 6:44, 7:00, trước 9:00 | xanh dương |
| Địa điểm | cổng KTX, sảnh tòa B, hộp kiến nghị | xanh lá |
| Hành động | ra cổng, nhận phong bì, bỏ thư, ký phiếu gửi | vàng |

"Vai trò/công việc" để dành làm loại thứ năm, chỉ thêm khi ma trận bắt đầu lặp (§4.3).

Hệ quả:
- **Luật tô màu chữ gọn lại:** chữ được tô = keyword, tô theo màu loại. Không khai cụm theo từng thẻ nữa (`highlight.json` đổi thành danh sách keyword theo vụ).
- **Keyword chính là giá trị kéo vào SQL:** `WHERE ten = 'Hoài'`, `WHERE gio < '07:00'`. Người chơi thấy cùng một mẩu chữ đi từ lời thoại → note → khối truy vấn.

### 2.2. Manh mối hay sự thật — máy tự phân loại theo nguồn

Người chơi **không** phải tự phân loại. Máy xếp theo nguồn và cho thấy bằng **hình thẻ + màu viền + bảng nó rơi vào**:

| Nguồn | Loại | Rơi vào |
|---|---|---|
| Quan sát, lời kể, tin đồn, suy luận | **Manh mối** (thẻ giấy nhớ, góc gấp) | Bảng manh mối |
| Kết quả query, giấy tờ có dấu/chữ ký, hai manh mối độc lập khớp nhau (do kịch bản khai) | **Sự thật** (thẻ cứng, ghim tròn) | Bảng chân lý (ô tương ứng sáng lên chờ đặt) |

Bài học đi kèm, đúng chủ đề Vụ 1: **lời kể chưa phải sự thật cho tới khi dữ liệu xác nhận** (lời Tùng buột miệng đối lại sổ ra vào).

### 2.3. Câu hỏi

Nối hai (hoặc ba) note trên bảng manh mối → ra **thẻ câu hỏi** (giấy nhớ một câu cố định do kịch bản viết, không gõ). Thẻ câu hỏi có nhãn đích:
- `→ tra` : mở màn tra, keyword của các note nối thành khối điều kiện sẵn để kéo.
- `→ hiện trường` : thêm một ghim/điểm bấm trên bản đồ hoặc cảnh khám phá.

Nối sai thì không ra câu hỏi (sợi chỉ rơi), không phạt. Nếu kịch bản muốn có bẫy thì khai cặp nối sai ra câu hỏi dẫn vào ngõ cụt có lời riêng.

---

## 3. Bảng manh mối

= **bảng ghim hiện tại** (`BangGhimMvp`), giữ ghim tự do, sợi chỉ. Đổi:
- Chỉ chứa **manh mối và câu hỏi**; sự thật đã chuyển sang bảng chân lý thì để lại một thẻ mờ có dấu tích (giống ô đã đặt ở dòng thời gian bây giờ).
- Thao tác nối hai thẻ là thao tác người chơi tự làm (bước "ghép thẻ" của canon), có làm mẫu ở Trung thu (§6.3).

---

## 4. Bảng chân lý

### 4.1. Hình dạng

- **Cột luôn là người.** Có thể có cột "?" (người chưa biết là ai).
- Mỗi bảng đúng **ba yếu tố**: người + hai trong {thời gian, địa điểm, hành động}. Một yếu tố làm **dòng**, một yếu tố là **nội dung ô**.
- Ba loại:

| Mã | Dòng | Ô | Hỏi kiểu |
|---|---|---|---|
| **TH** | thời gian | hành động | "lúc ấy người này làm gì" |
| **TĐ** | thời gian | địa điểm | "lúc ấy người này ở đâu" |
| **ĐH** | địa điểm | hành động | "ở chỗ ấy người này làm gì" (chốt một khoảng giờ) |

- Ô có ba trạng thái do vụ khai: **điền sẵn**, **phải điền** (đặt note sự thật vào), **trống bắt buộc** (không có dữ liệu — để trống là đúng; điền vào là sai).
- Cỡ tối đa **4 cột × 5 dòng** để vừa điện thoại cầm ngang (cao 375 px).
- Dòng thời gian cũ (`DongThoiGianMvp`) = bảng loại **TH** một cột. Dựng bảng chân lý bằng cách mở rộng nó, không viết lại từ đầu.

### 4.2. Mâu thuẫn tự lộ

Máy kiểm một luật duy nhất: **một người không thể có hai ô khác nhau ở cùng một dòng** (loại TH/TĐ) — nếu kịch bản cho một note sự thật đặt vào ô đã có, ô đỏ lên và lời kể nào dẫn tới ô cũ bị gạch. Đây là nguồn "cảm giác thám tử" không cần thêm thoại.

### 4.3. Lịch ma trận cả mùa (đề xuất)

> **User 09/10: để sau**, làm một lượt brainstorm riêng cho cả mùa. Bảng dưới chỉ là nháp đầu vào cho lượt đó. Vụ 1 chốt loại **TH**.
>
> Yếu tố để dành cho lượt brainstorm mùa: **vai trò/công việc** và **cảm xúc / suy nghĩ** (nói dối, che giấu, hung thủ) — hợp các vụ có người cố tình khai sai.

Ba loại × ba vụ = chín vụ, Vụ 10 tổng hợp. Vụ chẵn là vụ **dạy** — lần đầu một loại hoặc một kiểu ô mới xuất hiện.

| Vụ | Loại | Cái mới về ma trận |
|---|---|---|
| 1 | TH | Lần đầu: bảng 1 dòng thời gian, ô điền sẵn + phải điền + **một ô trống bắt buộc** (người đưa phong bì) |
| 2 | TĐ | Loại mới: "ở đâu" (gói hàng đi qua những chỗ nào) |
| 3 | TH | Nhiều cột hơn, có lời đồn đặt nhầm ô (mâu thuẫn tự lộ lần đầu) |
| 4 | ĐH | Loại mới: chốt một buổi, dòng là địa điểm (đêm dẫn lạc) |
| 5 | TĐ | "Nam ở đâu" — ô điền sẵn là **sai**, phải gỡ |
| 6 | ĐH | Đêm hội nhiều chỗ — thay cho cách chơi "kéo bóng người vào cảnh" đã cắt |
| 7 | TĐ | Ba người giữ chìa: cột "?" phải loại trừ |
| 8 | TH | Ai nộp hộ ai |
| 9 | ĐH | Người duyệt × khoản, đối chất Khánh |
| 10 | trộn | Hai bảng khác loại cùng lúc |

Nếu tới Vụ 5–6 thấy lặp: thêm yếu tố **vai trò** (4 chọn 2 → 6 loại).

---

## 5. Buổi họp: một người hỏi, chỉ ô

- **Người hỏi duy nhất: Khánh** (thay Quân), đại diện Hội sinh viên. Khánh gộp cả các câu thầy Quang hỏi trước đây và **có thể** có một yêu cầu sửa query (câu HOẶC trên màn chiếu).
- **Thầy Quang chỉ điều phối và kết luận.** Không hỏi.
- Mỗi lượt: Khánh đưa **một dữ kiện sai** → người chơi **chỉ một ô** trên bảng chân lý bác lại (hoặc chỉ ô trống bắt buộc khi Khánh khẳng định điều không có căn cứ).
- **Tính vạch giữ nguyên:** chỉ sai thì mất một vạch; **ba lần không bác được → thầy Quang xử thua** (kết tạm). Rank A/B/C theo số vạch còn.
- Hà Vy vẫn nhắc nhỏ ở lần sai đầu cả buổi.
- **Lượt đầu là lượt mẫu** (user 09/10): Khánh nói "Hoài ký thì Hoài viết", **Tùng bật dậy trả lời hộ**: "Phiếu góp ý thang máy hôm nhập học cũng là tớ ký đấy, đâu phải tớ viết!" — vừa dạy cách bác (đưa ra một sự việc trái lời), vừa là lúc Tùng gỡ áy náy. Lượt này không tính vạch. Từ lượt sau người chơi tự chỉ ô.

### 5.1. Giữ canon: Khánh không được lộ

Canon: Khánh viết thư, nhờ **một tân sinh viên lạ mặt** đưa Hoài bỏ hộ. Hoài chưa từng gặp Khánh. Thêm hai khóa an toàn:
1. Người đưa phong bì **trùm mũ áo, đeo khẩu trang** — chú Cường chỉ thấy "một cậu balo đen" (đã có), Hoài kể cũng không tả được mặt.
2. Khánh **rời phòng họp ngay sau khi thua** ("chiều nay Hội còn họp") — thầy Quang mời Hoài vào khi Khánh đã đi.

Chơi lại lần hai người chơi sẽ nhận ra: kẻ đứng sau chính là người đứng buộc tội Hoài.

---

## 6. Vụ 1 bản 7 — khung

### 6.1. Nhân vật

| Giữ | Cắt khỏi Vụ 1 | Lý do |
|---|---|---|
| Người chơi, Tùng, Hoài (không tên tới khi xuất hiện), Minh Anh, Duy, Hà Vy, bác Thịnh, chú Cường, bé Na, Khánh, thầy Quang (gặp mặt ở buổi họp), bà Lụa (Cảnh 12) | **Quân**, **cô Hạnh**, **cô Lan** | Quân → Khánh hỏi; cô Hạnh (ký phiếu xin bảng) → không cần, chủ nhiệm CLB có sẵn bảng sinh viên; cô Lan (sổ thu hộp, câu "người nộp") → bác Thịnh nói giờ thu hộp, cảnh góp ý thang máy dạy "người nộp ≠ người viết" |

Quân, cô Hạnh, cô Lan ra mắt ở vụ sau (mỗi vụ giới thiệu thêm người).

**Thầy Quang** (user 09/10): thầy gọi Minh Anh lên đưa thư; người chơi biết thầy **qua lời Minh Anh kể** trước, tới buổi họp mới gặp mặt.

**Quyền tra dữ liệu — vá lỗ "lúc đầu tra được, lúc sau phải xin":** mỗi chủ nhiệm CLB được cấp **tài khoản tra bảng sinh viên** (cột cơ bản: mã, tên, ngành, khóa, lớp) ngay từ buổi lễ đầu năm, để duyệt đơn thành viên. Vì thế ở Ngày hội Duy tra được Tùng và người chơi. **Bảng khác thì phải nhờ người giữ** — thang quyền dữ liệu có lý do trong truyện:
- **Bảng lớp** (`lop`: mã lớp, ngành, khóa, tòa, buổi học) — Minh Anh **xin thầy Quang** (người chơi chỉ nghe Minh Anh kể). Đây là bảng cho biết lớp nào học ở tòa nào, buổi nào.
- **Sổ ra vào KTX** — chú Cường cho xem vì là chú của Tùng.
- Vụ sau mỗi bảng mới mở bằng một người.

### 6.2. Nhịp

| # | Ngày | Cảnh | Note / SQL đẻ ra | Giữ từ bản 6 |
|---|---|---|---|---|
| M1 | CN 08/09 nhập học | Sảnh KTX: Tùng dẫn lạc **một bạn nữ kéo vali** (không tên). Thang máy hỏng → **người chơi viết góp ý**, Tùng dẫn sang **hộp kiến nghị tòa B**, **bác Thịnh bắt Tùng ký phiếu gửi** | (mở đầu, chưa vào vụ) | dẫn lạc, bác Thịnh |
| M2 | T7 14/09 Ngày hội = tuyển CLB | Bàn CLB: Minh Anh + Duy. **Khánh** ghé, nói "dưới năm người là xét giải thể". Tùng khai mã → **Duy tra bảng sinh viên**, ra khoa của Tùng (làm mẫu). Tùng: *"Hay cậu cứ in phiếu tham gia đi, hôm Trung thu đến họp ký cái là xong."* → **người chơi tự tra mã mình** để in phiếu. Phiếu in xong là danh sách đủ năm tên — lý do Khánh gửi thư 16/09 | **Query mẫu** (`WHERE ma_sv = …`) | Ngày hội (gộp tuần công dân thành 1 thẻ chữ) |
| M3 | T3 17/09 Trung thu | Hà Vy soi Tùng: áo → băng gạc → bản đồ (mỗi cái **một bậc**), rồi **nối ba cái thành một suy luận** ("nhiệt tình, hay giúp người"). Người chơi soi vụn bánh + dép → nối → **bé Na**. Vy: "có tố chất". **Minh Anh dạy nối note thành câu hỏi** ngay trên chuyện bánh. Gặp **chú Cường** (chú của Tùng). Người chơi ký phiếu | Thao tác nối lần đầu | hai lần soi, chú Cường |
| M4 | T2 23/09 | Minh Anh đi gặp thầy Quang về, mang thư tới phòng CLB, kể lại lời thầy | Tài liệu: thư, phiếu gửi ký "Hoài" | — |
| C1 | Chặng 1 · "Hoài nào?" | Phòng CLB, ngay sau khi nhận thư: người chơi **tra luôn `ten = 'Hoài'`** → ra nhiều dòng. Hỏi Minh Anh "có cách nào khoanh vùng không?" → đi tìm manh mối về lớp: **sảnh tòa B** — **hỏi bác Thịnh giờ** (7:00 mở sảnh, 9:00 thu hộp) + **mẩu giấy** thẻ lịch "BC-24 · Thứ Hai · tòa B" mắc ở khe hộp; Hà Vy suy **Báo chí khóa 2024**. Về CLB kể với Minh Anh → "để chị đi xin thầy Quang bảng lớp, buổi sinh hoạt sau họp" → **hết chặng** | **Query 1** (`ten = 'Hoài'` → nhiều dòng) · sự thật 7:00, 9:00 · manh mối thẻ lịch · suy luận BC-24 | bác Thịnh, mẩu giấy |
| C2 | Chặng 2 · "Hoài là ai?" | Buổi sinh hoạt sau: Minh Anh mang bảng lớp về (kể lời thầy Quang). **Query 2** bảng lớp: ngành VÀ khóa VÀ tòa VÀ buổi → **BC24A** (Báo chí 2024 có lớp A, B, C; chỉ A học tòa B sáng thứ Hai) — **bài dạy so sánh + VÀ**. **Query 3** quay lại bảng sinh viên: `ten = 'Hoài'` VÀ `ma_lop = 'BC24A'` → **1** (dữ liệu có hai Hoài Báo chí 2024 ở hai lớp khác nhau). Tùng buột miệng "hôm ấy tớ thấy Hoài cầm phong bì" (áy náy riêng của Tùng) → nối với "trước 9:00" → câu hỏi "Hoài ra khỏi KTX lúc nào?" → **hết chặng** | Q2: lớp BC24A · Q3: Lê Thu Hoài BC24A · manh mối lời Tùng | màn tra 1 (bỏ Phòng Đào tạo, bỏ cô Hạnh) |
| C3 | Chặng 3 · "Sáng 16/09 Hoài làm gì?" | Cổng KTX: **chú Cường cho xem** (vì là chú của Tùng): **Query 4** sổ ra vào (mã VÀ ngày → 6:44) + lời chú "cậu balo đen trao phong bì gần 7 giờ". Tối về phòng CLB **dựng bảng chân lý TH** (cột: Hoài, ?, bác Thịnh; dòng: 6:44 · ~6:50 · 7:00 · trước 9:00 · 9:00). Ô "? — đưa phong bì" là **trống bắt buộc** về danh tính | Q4: Hoài ra cổng 6:44 · lời chú Cường → sự thật khi khớp sổ | giữ |
| H | T2 30/09 | Buổi họp: Khánh 4 lượt, Khánh rời, Hoài vào kể, cảnh bóng mờ, hành lang, Cảnh 12 (rank A) | — | kết thật/tạm, Cảnh 11, Cảnh 12 |

(User 09/10: vòng điều tra chia **chặng**, không qua ngày — §10. Trong chặng, mọi nơi đã mở đều đi được, nhân vật luôn có mặt.)

**Lượt hỏi của Khánh (nháp):**
1. "Hoài ký thì Hoài viết" → **lượt mẫu: Tùng trả lời hộ** (§5), không tính vạch.
2. *Màn chiếu*: câu HOẶC ra 276 dòng "trường này Hoài nào cũng nghi được" → **sửa query** (VÀ). Tính vạch.
3. "Hoài tự mang thư từ phòng đi" → chỉ ô **6:44 Hoài: ra cổng** + ô **~6:50 ?: đưa phong bì**. Tính vạch.
4. "Vậy Hoài đứng sau" → chỉ **ô trống bắt buộc** ở cột "?": chưa đủ căn cứ. Tính vạch.

### 6.3. Tỉ lệ query — đo bằng số manh mối

User 09/10: **manh mối đến từ query ≈ 1/3 tổng số note của vụ** (không đo bằng thời gian). Máy kiểm đếm được từ kịch bản: note có nguồn `tra` / tổng note. Vụ 1 nháp:

| Nguồn | Note |
|---|---|
| Tài liệu | lá thư · phiếu gửi ký "Hoài" |
| Quan sát | thẻ lịch BC-24 |
| Suy luận (Hà Vy) | BC-24 = Báo chí khóa 2024 |
| Lời kể | bác Thịnh: 7:00 mở sảnh · bác Thịnh: 9:00 thu hộp · Tùng: thấy Hoài cầm phong bì · chú Cường: balo đen trao phong bì |
| **Query** | Q1: nhiều Hoài · Q2: lớp BC24A học tòa B sáng thứ Hai · Q3: Lê Thu Hoài BC24A · Q4: Hoài ra cổng 6:44 |

= **4/12 = 1/3** (user 09/10: lần tra `ten = 'Hoài'` đầu tiên là lần thực hành, ra nhiều dòng để người chơi tự thấy cần khoanh vùng). Query mẫu ở Ngày hội và màn sửa query ở buổi họp không tính. Bước 1 phải sửa `du-lieu.md`: thêm bảng `lop`; bảng `sinh_vien` có **hai** Hoài Báo chí 2024 ở hai lớp khác nhau.

---|---|
| Tài liệu | lá thư · phiếu gửi ký "Hoài" |
| Quan sát | thẻ lịch BC24 |
| Lời kể | bác Thịnh: 7:00 mở sảnh · bác Thịnh: 9:00 thu hộp · Tùng: thấy Hoài cầm phong bì · chú Cường: balo đen trao phong bì |
| Suy luận (Hà Vy) | BC-24 = Báo chí khóa 2024 |
| **Query** | Q2a: lớp BC24A học tòa B sáng thứ Hai · Q2b: Lê Thu Hoài BC24A · Q3: Hoài ra cổng 6:44 |

= **3/11 ≈ 27%** (query mẫu ở Ngày hội và màn sửa query ở buổi họp không tính vì không đẻ note của vụ). User 09/10: 3/10 tạm ổn; bảng lớp giữ tỉ lệ và làm câu tra Hoài có lý do hơn. Nếu sau này cần thêm: Q3 ra hai dòng (6:44 ra, 17:52 vào). Bước 1 phải sửa `du-lieu.md`: thêm bảng `lop`; bảng `sinh_vien` có **hai** Hoài Báo chí 2024 ở hai lớp khác nhau để bước mã lớp là bắt buộc.

---

## 7. Luật cũ bị ghi đè

| Luật cũ | Thay bằng |
|---|---|
| Canon: ma trận mở ở Vụ 8 | Bảng chân lý là lõi từ Vụ 1; lịch cả mùa brainstorm riêng |
| Canon Vụ 4 `tung-ke-lai`, Vụ 6 `dung-canh-tu-keo` | **Luật chung (user 09/10, mạnh hơn kịch bản các vụ có sẵn): cách chơi nào đưa về được hai bảng lõi thì giữ, không thì bỏ.** `tung-ke-lai` giữ — mỗi câu Tùng kể đẻ một note (một kiểu hỏi người). `dung-canh-tu-keo` **bỏ**. |
| Canon Vụ 1: Quân kết luận sai; beat Vụ 5 "Quân nhớ lần sai ở Vụ 1" | Khánh hỏi ở Vụ 1; beat Vụ 5 đổi |
| Ban Kiểm tra dùng lời Tùng làm căn cứ | Lời buột miệng chỉ là áy náy riêng của Tùng, không ai ngoài nhóm biết |
| Thầy Quang hỏi 3 câu trắc nghiệm, xuất hiện từ lúc giao thư | Thầy chỉ điều phối + kết luận; xuất hiện qua lời Minh Anh trước buổi họp |
| Phải xin phép (cô Hạnh) mới tra bảng sinh viên | Chủ nhiệm CLB có sẵn bảng sinh viên; bảng nhạy cảm mới phải nhờ người |
| Luật tô màu theo từng thẻ hồ sơ | Tô theo keyword, 4 màu loại |
| Chuẩn C2: ≥ 300 dòng/vụ; Vụ 1 làm chuẩn độ dài | Đo tỉ lệ note từ query ≈ 1/3; Vụ 1 ngắn có chủ ý |
| Vy chỉ soi một bậc mỗi điểm | Vy dạy thêm bước nối nhiều manh mối thành một suy luận |
| Dòng thời gian là màn riêng | Là bảng chân lý loại TH |

Giữ nguyên: Vụ 1 tuyến tính, Vy + Minh Anh dạy; đáp án duy nhất; lộ trình SQL 08/10; điều hướng tự do; vai tinh ý là của Hà Vy; giới thiệu nhân vật đúng trình tự; ô "ai đưa phong bì" trống; Cảnh 12.

---

## 8. Sửa canon `mua-1.yaml` (đề xuất, chưa sửa)

- `cases[n=1]`: `wrong_conclusion` → "Khánh (đại diện Hội): 'Hoài ký tên thì Hoài viết'; chiếu câu HOẶC 276 dòng." · `beats` → `[Khánh hỏi ở buổi họp rồi rời đi, Hà Vy dạy quan sát + nối suy luận, Minh Anh dạy nối câu hỏi, người chơi tự tra mã ở Ngày hội, Tùng trả lời mẫu]` · `why` thêm "phiếu in ở Ngày hội làm danh sách đủ năm; người đưa trùm mũ, đeo khẩu trang".
- `cases[n=5].beats`: bỏ "Quân nhớ lần sai ở Vụ 1".
- `mechanics.schedule`: Vụ 1 thêm `note-keyword`, `bang-manh-moi`, `bang-chan-ly`; bỏ `dung-canh-tu-keo`; `ma-tran-case-solved` gộp vào bảng chân lý. Các vụ sau: ghi "chờ brainstorm mùa".
- Thế giới: chủ nhiệm CLB có tài khoản tra bảng sinh viên từ đầu năm.
- Ghi chú người giúp: "trắc nghiệm = thầy Quang" → "hỏi = Khánh (V1), thầy Quang điều phối".

---

## 9. Câu hỏi đã trả lời (09/10)

- Q1 → luật chung ở §7: về được hai bảng thì giữ.
- Q2 → lượt đầu Tùng trả lời hộ làm mẫu (§5).
- Q3 → giữ Cảnh 12.
- Q4 → lịch ma trận để lượt brainstorm mùa.
- Q5 → Khánh không cần biết; chỉ là áy náy của Tùng.

---

## 10. Bỏ "qua ngày" trong vòng điều tra — đánh giá

Ý user 09/10: người chơi tương tác thoải mái, không cần qua ngày; qua ngày chỉ khi cốt truyện cần.

**User 09/10 đồng ý chia chặng**, thêm: nhân vật **luôn có mặt**; khi người chơi đủ manh mối thì nhân vật **trả lời khác đi**; việc ngày lễ rơi vào một chặng, hoặc mở suốt vụ lúc nào vào cũng được (bỏ luật cũ "chỉ chơi đúng ngày, lỡ là mất").

Đánh giá ban đầu: **đáng làm, nhưng theo kiểu "chặng" chứ không bỏ hẳn thời gian.**

Được:
- Hợp luật điều hướng tự do và lõi mới: vòng lặp là **câu hỏi → nơi cần đến**, không phải "hôm nay đi đâu". Bản đồ mỗi ngày một ghim (chỗ bị chê ở bản 6) tự biến mất.
- Người chơi không bị kẹt chờ "hết ngày" mới làm được việc vừa nghĩ ra.
- Bớt việc viết lời đi đường, lời mở mỗi ngày.

Mất / phải thay:
- **Hạn chót vụ chính** (canon: tới hạn là buổi chốt, "cầm gì trình nấy") đang dựa vào ngày. → Buổi họp diễn ra khi người chơi bấm "Đủ rồi, đi họp" hoặc khi truyện ép (Vụ 1 tuyến tính thì truyện ép). Áp lực chuyển sang tính vạch: thiếu ô thì không bác được.
- **Lịch nhân vật theo thứ/giờ** và **việc ngày lễ đúng ngày** mất chỗ bám. → Giữ ngày ở lớp ngoài vụ (giữa hai vụ, ngày lễ) và ở **chặng** trong vụ.
- Thời gian truyện vẫn phải hợp lý (sáng thứ Hai không thể đứng ở quán trà đá tối thứ Bảy). → Mỗi chặng có một mốc giờ cố định; ai ở đâu theo mốc ấy.

**Đề xuất — "chặng":** mỗi vụ chia 2–3 chặng do truyện quyết. Trong một chặng: mọi ghim đã mở đều đi được, không có "hết ngày". Sang chặng mới khi người chơi trả lời được câu hỏi chốt của chặng (Vụ 1: chặng 1 kết khi biết đó là Lê Thu Hoài BC24A; chặng 2 kết khi có 6:44). Ngày/giờ trên HUD đi theo chặng, chỉ để giữ lịch truyện đúng. Máy: `[HẾT NGÀY]` đổi thành `[HẾT CHẶNG]` khi đạt điều kiện; lịch nhân vật đọc mốc giờ của chặng.

Máy cần thêm: lời của một nhân vật có điều kiện theo note đã có (`[NẾU có note-x]` chọn đoạn lời). Lịch nhân vật theo giờ thành "luôn có mặt trong chặng" — ai không hợp lý có mặt (vd. thầy Quang trước buổi họp) thì không đặt vào chặng.

Với Vụ 1 (tuyến tính) đổi ít: D1–D5 thành 2 chặng + buổi tối dựng bảng. Lợi thật sự rơi vào Vụ 2 trở đi, khi mở nhiều ghim.
