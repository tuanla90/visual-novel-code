# Vụ 1 bản 7 — dàn ý

> Bước 1 của plan 09/10/2026. Nguồn quyết định: `docs/mua-1/loi-note-bang-chan-ly.md` (lõi note + hai bảng, chặng, Khánh hỏi). Canon đã sửa: `story-pilot/.../canon/season/mua-1.yaml` case 1.
> Dàn ý này là **khung + logic chứng cứ** (phần của Opus). Lời thoại viết sau theo `story-pilot/docs/bang-kiem-viet-thoai.md`, giữ những câu bản 6 còn dùng được.
> Trạng thái: **user duyệt 09/10** (trả lời 4 câu ở §6).

---

## 0. Đổi so với bản 6 — nhìn một lần

| Bản 6 | Bản 7 |
|---|---|
| Tuần công dân là một cảnh | Gộp vào một thẻ chữ đầu Ngày hội |
| Ngày hội: anh sơ mi trắng nói một câu, Tùng đăng ký | Ngày hội = buổi tuyển CLB; Duy tra mã Tùng, **người chơi tự tra mã mình** để in phiếu |
| Cô Lan mang thư tới phòng CLB | **Minh Anh** đi gặp thầy Quang về, mang thư, kể lời thầy |
| 4 ngày + 1 tối, mỗi ngày một ghim | **3 chặng**, không qua ngày trong chặng |
| Phòng Đào tạo, cô Hạnh ký phiếu | Bỏ. Chủ nhiệm có sẵn bảng sinh viên; **bảng lớp** Minh Anh xin thầy Quang |
| Phòng CTSV, Quân, cô Lan, sổ thu hộp | Bỏ. Bác Thịnh nói giờ thu hộp; "người nộp ≠ người viết" người chơi đã tự trải ở cảnh nhập học |
| Buổi họp: Quân trình, thầy Quang hỏi 3 câu | **Khánh** (Chủ tịch Hội) hỏi 4 lượt, lượt đầu Tùng trả lời mẫu; thầy Quang điều phối + kết luận |
| Dòng thời gian một hàng | Bảng chân lý người × giờ (đang dựng, gói B20-MÁY) |

Nhân vật Vụ 1 (11 + người chơi): Tùng, Hoài, bác Thịnh, chú Cường, Minh Anh, Duy, Hà Vy, bé Na, Khánh, thầy Quang, bà Lụa. **Bỏ khỏi Vụ 1:** Quân, cô Hạnh, cô Lan (giữ trong `nhan-vat.md` cho vụ sau, gỡ khỏi kịch bản Vụ 1).

Khánh: theo `nhan-vat.md`, **họ tên không bao giờ hiện**. Ở Ngày hội nhãn "Anh sơ mi trắng"; ở buổi họp thầy Quang giới thiệu "anh Chủ tịch Hội sinh viên" → nhãn "Chủ tịch Hội". Không đeo balo (balo đen là của người đưa phong bì).

---

## 1. Dữ liệu (sửa `du-lieu.md` + bộ sinh nền `tools/noi-dung/nhieu-mua1.ts`)

**Nhãn khối tiếng Việt** (user 09/10, sửa lại): câu SQL **giữ tên ASCII** (`SELECT ten, ma_lop FROM sinh_vien`). Chỉ **chữ hiện trên khối** ở màn tra đổi sang tiếng Việt có dấu: khối cột `ma_sv` hiện "Mã sinh viên", khối bảng `sinh_vien` hiện "Sinh viên". Câu SQL hiện bên dưới vẫn là tên thật. Máy cần một bảng tra nhãn `cột → nhãn` theo từng bảng (khai trong `du-lieu.md`, vd. `- Nhãn: ma_sv=Mã sinh viên, ten=Tên, ma_lop=Mã lớp`).



**`sinh_vien`** — bảng chủ nhiệm CLB được cấp để duyệt đơn: **chỉ** `ma_sv, ho_dem, ten, ma_lop, noi_o` (`noi_o`: Ký túc xá / Ngoại trú — để CLB biết ai ở gần mà báo lịch; là mối nối Hoài → cổng KTX) (bỏ `nganh`, `khoa_hoc` sang bảng lớp). Mã lớp đọc được: 2 chữ ngành + 2 số khóa + chữ lớp (`DL24A` = Du lịch, khóa 2024, lớp A).

| Dòng truyện | Ghi chú |
|---|---|
| SV240317 Lê Thu **Hoài** BC24A | người cần tìm |
| SV240702 Vũ Ngọc **Hoài** BC24C | **mới** — Hoài thứ hai cùng Báo chí 2024, khác lớp: ép phải dùng bảng lớp |
| ba Hoài khác (MK24B, KT23A, DL22A) | giữ |
| người chơi: **mới**, lớp **KT24A** (Kế toán, user 09/10 đúng) | để người chơi tự tra mã mình ở Ngày hội |
| Tùng DL24A, Hà Vy, Duy, Minh Anh | giữ |

`ten = 'Hoài'` → **5 dòng**. Bộ sinh nền không thêm ai tên Hoài.

**`lop`** — **mới**, Minh Anh xin thầy Quang: `ma_lop, nganh, khoa_hoc, toa, buoi`

| ma_lop | nganh | khoa_hoc | toa | buoi |
|---|---|---|---|---|
| BC24A | Báo chí | 2024 | B | Sáng thứ Hai |
| BC24B | Báo chí | 2024 | C | Sáng thứ Hai |
| BC24C | Báo chí | 2024 | B | Chiều thứ Hai |
| (nền: mọi lớp khác của trường, ~120 dòng) | | | | |

Câu đúng: `nganh = 'Báo chí' AND khoa_hoc = 2024 AND toa = 'B' AND buoi = 'Sáng thứ Hai'` → **1 dòng BC24A**. Thiếu một điều kiện thì ra 2–3 dòng (mỗi điều kiện đều có việc). Bẫy HOẶC: ra hàng chục dòng.

**`ra_vao_ktx`** — giữ (6:44 ra, 17:52 vào).

---

## 2. Mở đầu (≤ 60 dòng lời)

### M1 · CN 08/09 · nhập học (sảnh KTX → tòa B)
- Giữ: xe buýt, cổng trường, sảnh KTX — người chơi **đứng nhìn** cậu áo xanh (Tùng) chỉ đường cho một bạn nữ kéo vali. Bạn nữ **không có tên**, nhãn "Bạn nữ kéo vali". Không bật thẻ ai (luật "đứng nhìn").
- Hỏi đường cậu áo xanh → cùng phòng 408 (giữ).
- **Mới:** thang máy hỏng (tờ giấy trên cửa thang máy — đang là chi tiết ẩn, nâng thành sự kiện). Vác vali bộ lên tầng 4, người chơi bực, **viết mấy dòng góp ý**. Tùng: "Hộp kiến nghị ở sảnh tòa B, tớ dẫn cậu đi, tiện đường đi lấy áo." Tới sảnh tòa B, **bác Thịnh** (nhãn "Bác bảo vệ") đưa phiếu gửi: "Ai bỏ thì ký vào đây." **Tùng cầm bút ký luôn** — người chơi đứng cạnh.
  → Hạt giống cho buổi họp. Không thành note (mở đầu chưa có vụ), chỉ để người chơi nhớ.
- Cổng KTX, chú Cường: Tùng gọi "chú" — **không** nói là chú ruột ở đây (để Trung thu).

### M2 · T7 14/09 · Ngày hội = buổi tuyển CLB
- Thẻ chữ mở: "Một tuần sinh hoạt công dân. Thẻ lịch học in theo khoa, phát tay." (gộp md-08, giữ ảnh `doc-the-lich-cua-toi` — để người chơi biết thẻ lịch trông thế nào).
- Bàn CLB Thám Tử vắng; **Anh sơ mi trắng** (Khánh) đeo thẻ ban tổ chức ghé, nói một câu: CLB dưới năm thành viên là bị xét giải thể (giữ).
- **Minh Anh và Duy cùng giữ bàn** (user 09/10: CLB chỉ có hai thành viên cũ, để mỗi chủ nhiệm đi thì buồn cười). Duy ôm laptop CLB. Bản 6 Duy ra mắt ở Trung thu → dời lên đây; ở Trung thu chỉ còn giới thiệu Hà Vy (cảnh `md-10-gap-duy` bỏ hoặc đổi thành chào lại).
- Tùng đăng ký, khai mã. **Duy tra làm mẫu**: `ma_sv = 'SV240251'` → `DL24A`. Duy đọc mã lớp: "DL là Du lịch, 24 là khóa 2024." (← dạy đọc mã lớp; Hà Vy sẽ dùng lại ở chặng 1)
- Tùng quay sang người chơi: *"Hay cậu cứ in phiếu tham gia đi, hôm Trung thu đến họp ký cái là xong."*
- **Query mẫu (người chơi tự làm):** gõ mã mình vào khối `ma_sv = …` → ra một dòng → in phiếu. Không chấm, không tính vào tỉ lệ note.
- Minh Anh đếm: "Năm tên rồi." → mời Trung thu. (Đây là lý do Khánh gửi thư hai hôm sau — không nói ra.)

### M3 · T3 17/09 · Trung thu ở sân KTX
- Giữ khung bản 6 (memory trung-thu-day-soi-kinh-lup), đổi hai chỗ:
  1. **Hà Vy soi Tùng** tự động: áo tình nguyện → *tình nguyện viên*; băng gạc trên mũi → *va quệt khi khuân đồ*; bản đồ tay → *hay dẫn đường*. Mỗi cái một bậc. Rồi **Vy nối ba cái**: "Cậu ấy là kiểu thấy ai cần là lao vào giúp." (bậc mới: nhiều manh mối → một suy luận về người)
  2. **Người chơi soi** vụn bánh + dép, **nối hai note → bé Na** (giữ). Ngay sau đó **Minh Anh dạy nối note thành câu hỏi**: nối "đĩa còn ba lúc 19:15" + "bé Na ôm nửa chiếc" → giấy nhớ "Bé Na lấy lúc nào?" → hỏi Minh Anh → 19:00 còn bốn. (thay bảng tập dượt cũ bằng thao tác nối; bảng chân lý tập dượt dtg-banh giữ nếu máy làm kịp)
- Hà Vy: "Cậu có tố chất đấy." → người chơi ký phiếu.
- **Chú Cường** ghé phát bánh cho trẻ con: Tùng "Chú cháu đấy!" — chú ruột, làm ca sáng ở cổng KTX.
- **Hoài không xuất hiện ở Trung thu** (user 09/10: không đẩy truyện chính, làm Trung thu dài; buổi ấy đã giới thiệu ba nhân vật và hai cách chơi). Nhịp canon "Hoài hỏi Tùng đường ra phòng máy in" bỏ khỏi Vụ 1. Hoài gặp lại lần đầu ở buổi họp.

### M4 · T2 23/09 · phòng CLB, lá thư
- Minh Anh về muộn, tay cầm phong bì: "Thầy Quang gọi chị lên." **Kể lại** lời thầy (thầy chưa lên hình): có thư kiến nghị thu hồi phòng; thứ Hai tuần sau họp rà soát; CLB muốn giữ phòng thì tự chứng minh.
- Quan sát: **lá thư** (không tên người viết) · **phiếu gửi** (dòng người nộp ký "Hoài"). Người chơi tự nhớ lại cảnh Tùng ký phiếu? → **Không** nói ra ở đây; để Tùng nói ở buổi họp.
- Chi tiết ẩn: tủ sắt cũ (giữ).
- Note sinh ra: `doc-thu-kien-nghi` (tài liệu), `ev-phieu-gui-hoai` (tài liệu). → **Vào chặng 1.**

---

## 3. Vòng điều tra — ba chặng

Trong một chặng: không có "hết ngày"; mọi nơi đã mở trên bản đồ đều đi được; nhân vật luôn có mặt ở nơi của họ; lời đổi khi người chơi đã có note liên quan. Sang chặng mới khi đạt **câu hỏi chốt**.

### Chặng 1 · "Hoài nào?" — chiều 23/09 → 24/09
Mở: phòng CLB. Nơi mở: phòng CLB, sảnh tòa B.

| # | Ở đâu | Việc | Note (loại · nguồn) |
|---|---|---|---|
| 1.1 | Phòng CLB | Người chơi tự tra `ten = 'Hoài'` (Duy giúp mở máy, không gợi ý) → **5 dòng** | **Q1** "Cả trường có năm Hoài" · sự thật · tra |
| 1.2 | Phòng CLB | Hỏi Minh Anh "khoanh vùng thế nào?" → "Xem lại chỗ thư được bỏ." → mở ghim **sảnh tòa B** | — |
| 1.3 | Sảnh tòa B | **Hỏi bác Thịnh**: 7:00 mở sảnh; 9:00 "cô bên Công tác sinh viên" xuống thu hộp. Nếu đã có note phiếu gửi: bác nhớ "phiếu ký Hoài, bác nhớ vì chữ đẹp" (lời đổi theo note) | **bác Thịnh: 7:00 mở sảnh** · **bác Thịnh: 9:00 thu hộp** · manh mối · lời kể |
| 1.4 | Sảnh tòa B | **Mẩu giấy** mắc ở mép khe hộp: thẻ lịch "BC-24 · Thứ Hai · tòa B · tiết 1" | **thẻ lịch BC-24** · manh mối · quan sát |
| 1.5 | Sảnh tòa B | Hà Vy soi thẻ: "BC giống mã lớp anh Duy đọc hôm Ngày hội. Báo chí, khóa 24." | **BC-24 = Báo chí 2024** · manh mối · suy luận |
| 1.6 | Phòng CLB | Người chơi **nối** Q1 + BC-24 → câu hỏi "Hoài nào học Báo chí 2024, sáng thứ Hai ở tòa B?" → thẻ câu hỏi `→ tra` nhưng **bảng sinh viên không có ngành, tòa** → Minh Anh: "Bảng mình chỉ có mã lớp. Bảng lớp thì phải xin thầy. Để chị đi xin, buổi sinh hoạt sau có." | — |

**Câu hỏi chốt:** thẻ câu hỏi 1.6 đã nối → **hết chặng 1**. (Chi tiết ẩn ở sảnh: quạt treo tường — giữ.)

### Chặng 2 · "Hoài là ai?" — buổi sinh hoạt thứ Tư 25/09
Mở: phòng CLB. Nơi mở: phòng CLB, sảnh tòa B (vẫn đi lại được).

| # | Ở đâu | Việc | Note |
|---|---|---|---|
| 2.1 | Phòng CLB | Minh Anh mang bảng lớp về, kể "thầy hỏi để làm gì, chị nói để tìm đúng người nộp, thầy gật". | — |
| 2.2 | Phòng CLB | **Q2** bảng lớp: ngành VÀ khóa VÀ tòa VÀ buổi → **BC24A**. Bài dạy: so sánh + VÀ, thêm từng điều kiện thấy số dòng rơi (hoạt cảnh lọc từng bước đã có) | **Q2** "Lớp BC24A học tòa B sáng thứ Hai" · sự thật · tra |
| 2.3 | Phòng CLB | **Q3** quay lại bảng sinh viên: `ten = 'Hoài'` VÀ `ma_lop = 'BC24A'` → **1**: Lê Thu Hoài, nơi ở **Ký túc xá** | **Q3** "Lê Thu Hoài, BC24A, ở KTX" · sự thật · tra |
| 2.4 | Phòng CLB | Tùng **buột miệng** đúng một câu: "Hoài ký tên rõ thế, Hoài viết chứ còn ai!" Không ai đáp, Tùng không tự sửa (user 09/10). Là áy náy riêng của Tùng, không thành note. | — |
| 2.5 | Phòng CLB | Người chơi **nối** "Hoài ở KTX" (Q3) + "bác Thịnh: 7:00 mở sảnh" → câu hỏi "Sáng 16/09 Hoài ra khỏi KTX lúc nào?" → `→ hiện trường` → mở ghim **cổng KTX** | — |

**Câu hỏi chốt:** thẻ câu hỏi 2.5 → **hết chặng 2**.

### Chặng 3 · "Sáng 16/09 Hoài làm gì?" — chiều thứ Sáu 27/09 → tối thứ Bảy 28/09
Mở: phòng 408. Nơi mở: cổng KTX, phòng CLB, sảnh tòa B.

| # | Ở đâu | Việc | Note |
|---|---|---|---|
| 3.1 | Cổng KTX | **Chú Cường** (chú của Tùng nên cho xem nhờ trên máy ở chốt, chỉ mã của Hoài sáng 16/09). Chú kể: "Gần bảy giờ có cậu balo đen, trùm mũ áo, đeo khẩu trang, đưa con bé phong bì nâu." | **chú Cường: cậu balo đen trao phong bì gần 7 giờ** · manh mối · lời kể |
| 3.2 | Cổng KTX | **Q4** `ma_sv = 'SV240317'` VÀ `ngay = '2024-09-16'` → 2 dòng; bấm ô 06:44 | **Q4** "Hoài ra cổng 6:44" · sự thật · tra |
| 3.3 | (tự động) | Lời chú Cường **khớp** sổ ra vào (6:44 ra, gần 7:00 có người đưa) → manh mối 3.1 **thành sự thật** "có người đưa phong bì cho Hoài ở cổng" (máy đổi hình thẻ, chuyển sang chồng bảng chân lý) | (đổi loại) |
| 3.4 | Phòng CLB, tối T7 | Cả năm người. **Dựng bảng chân lý** dtg-vu1 (người × giờ). Ô `?` danh tính trống bắt buộc | bảng chân lý |

**Câu hỏi chốt:** bảng chân lý xong → **hết chặng 3** → buổi họp (truyện ép, Vụ 1 tuyến tính).

**Tỉ lệ:** 4 note tra (Q1–Q4) / 11 note (2 tài liệu · 1 quan sát · 1 suy luận · 3 lời kể · 4 tra) ≈ **36%**.

---

## 4. Buổi họp rà soát — T2 30/09, 16:00

Có mặt: thầy Quang (lần đầu lên hình, điều phối), Chủ tịch Hội (Khánh), năm người CLB. **Hoài ngồi chờ ngoài hành lang** (bản 6 đã có câu hỏi mở "ai mời Hoài ngồi chờ" → thầy Quang mời, để đối chất nếu cần).

Bảng chân lý hiện ở góc (chế độ chỉ ô). Bốn lượt, mỗi lượt Khánh nói một câu sai:

| Lượt | Khánh nói | Người chơi làm | Tính vạch |
|---|---|---|---|
| 1 | "Phiếu ký Hoài. Ký thì là người viết." | **Lượt mẫu: Tùng bật dậy** — "Phiếu góp ý thang máy hôm nhập học cũng là em ký, mà em có viết đâu ạ!" Chỉ Tùng nói, thầy Quang không thêm, Tùng không nhắc lại câu mình buột miệng (user 09/10). | Không |
| 2 | (Ẩn ý: Khánh **cố tình** chiếu câu sai để CLB lúng túng — không ai nói ra, người chơi tự ngộ về sau.) Chiếu câu `ten = 'Hoài' OR ma_lop = 'BC24A'` → hàng chục dòng: "CLB tra kiểu gì cũng ra cả lớp người ta." | **Sửa query** thành VÀ trên màn chiếu → 1 dòng | Có |
| 3 | "Thì Hoài tự cầm thư từ phòng đi bỏ." | **Chỉ ô** Hoài 6:44 "ra cổng" + ô `?` ~6:50 "đưa phong bì cho Hoài" | Có |
| 4 | "Vậy người đứng sau là Hoài, hoặc người Hoài quen." | **Chỉ ô trống bắt buộc** (danh tính cột `?`): chưa có căn cứ | Có |

- 3 lần không bác được (cộng dồn) → thầy Quang: "Hôm nay CLB chưa thuyết phục được thầy." → **kết tạm** (rank C).
- Thắng: thầy Quang kết luận **không nhận lá thư vào hồ sơ**. Chủ tịch Hội: "Tôi còn họp bên Hội." **Rời phòng** — rồi thầy mới mời Hoài vào.
- Hoài vào, kể: sáng hôm ấy một bạn trùm mũ, khẩu trang nhờ bỏ hộ phong bì, "bảo là đơn xin của lớp", Hoài ký vì bác bảo vệ bắt ký. → **cảnh bóng mờ** ở cổng KTX (giữ).
- Rank A/B/C theo vạch còn; Cảnh 11 (hành lang: Tùng nhận ra Hoài là bạn kéo vali, hỏi có nên xin lỗi) giữ; **Cảnh 12** quán trà đá (rank A) giữ.

**Chơi lại lần hai:** người buộc tội Hoài chính là người gửi thư — không câu nào nói ra.

---

## 5. Việc máy cần thêm (cho gói sau B21-MÁY, sau khi B20 bảng chân lý xong)

1. **Chặng:** `[HẾT CHẶNG <mã>]` khi đạt câu hỏi chốt; lịch.md khai chặng thay ngày (`## Chặng 1 · Hoài nào? {chặng: 1 · bắt đầu ở: phong-clb}`), HUD hiện tên chặng + ngày truyện.
2. **Note có loại + nguồn:** mỗi thẻ hồ sơ thêm `- Loại: manh mối|sự thật`, `- Nguồn: tài liệu|quan sát|suy luận|lời kể|tra`, `- Keyword: <loại>:<chữ>`. Máy vẽ hình thẻ theo loại; manh mối → bảng manh mối, sự thật → chồng chờ của bảng chân lý. `[ĐỔI LOẠI <thẻ> → sự thật]` cho bước 3.3.
3. **Nối note → câu hỏi do người chơi tự làm** (`[NỐI … + … → câu hỏi: "…" · → tra|→ hiện trường <ghim>]`) — dựa trên `[GHÉP MẪU]` đã có, bỏ cờ `· làm mẫu`.
4. **Lời đổi theo note:** `[NẾU có <thẻ>]` trong chuỗi lời của nhân vật luôn có mặt (đã có `[NẾU có <cờ>]`, mở rộng sang thẻ).
5. **Buổi họp chỉ ô:** `[ĐỐI CHẤT … · chỉ ô]` nhận câu trả lời là ô của bảng chân lý (`{dtg-vu1:o1}`) hoặc ô trống bắt buộc; lượt mẫu `· mẫu` không tính vạch.
6. **Máy kiểm:** tỉ lệ note từ tra ≈ 1/3 mỗi vụ; mọi câu hỏi chốt của chặng phải đạt được.
7. Tô màu chữ theo keyword (4 màu loại) — có thể để gói sau nữa.

---

## 6. User trả lời 09/10

1. Người chơi học Kế toán, KT24A — đúng.
2. Duy ra mắt ở Ngày hội — đúng; Minh Anh và Duy cùng giữ bàn.
3. Hoài không xuất hiện ở Trung thu.
4. Lượt 1 chỉ Tùng nói.
5. (Thêm) Nhãn khối tiếng Việt, câu SQL giữ tên ASCII — §1.
