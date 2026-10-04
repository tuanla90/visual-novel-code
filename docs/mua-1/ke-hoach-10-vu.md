# Mùa 1 mười vụ: kế hoạch (04/10/2026, bản 5, đã duyệt hướng)

> Theo khung user đưa 04/10: 10 vụ, mỗi vụ một nhóm kỹ năng; vụ thường đan với vụ tuyến Khánh; việc phụ đủ điều kiện thì mở; vụ chính qua vụ trước thì mở vụ sau.
> Bản 2 (cùng ngày) theo góp ý: **nối bảng lên sớm hơn** (Claude chọn: Vụ 6); **vụ chính có hạn chót**, hành động không làm trôi thời gian; **việc phụ ngày lễ diễn ra đúng ngày lễ**.
> Bản 3 (cùng ngày): **mỗi ngày lễ nằm trong đúng một vụ**; việc phụ ngày lễ **không chơi lại**; **mỗi vụ chính mở một người quen** giao 3 việc luyện, đủ 3 thì thưởng ảnh CG; Hoài ra mắt từ Trung thu để mở tuyến Tùng–Hoài; Vụ 1 xử lý chữ ký H không cần `LIKE`.
> Bản 4: người quen nào cũng dẫn về hai màn chốt (đối chất với Khánh cuối Vụ 8, buổi gặp thầy Quang cuối Vụ 10) để giúp ở cuối; Vụ 1 giữ câu đố chữ H, chỉ thêm hai nhịp để Hoài xuất hiện sớm và cho Tùng một lý do có lỗi.
> Bản 5: chốt luật hảo cảm ở màn chốt (chưa đủ thì người chơi tự chọn bằng chứng, đủ thì người quen tự nói thay); làm đủ chín người quen; Túi đồ giữ thành việc CLB. Mô tả việc và nghiệm thu: `giao-viec.md`.
> **Bản đầy đủ, tách riêng khỏi MVP** (user chốt 04/10): nội dung ở `prototype/noi-dung-mua-1/`, tài liệu ở `docs/mua-1/`; MVP giữ nguyên.
> **Chưa dựng gì.** Câu SQL ghi "(đã chạy)" là đã chạy trên SQLite với `prototype/noi-dung-mvp/du-lieu.md` lúc viết.

## 1. Mười vụ

Tuyến Khánh: Vụ 1, 2, 4, 6, 8. Vụ thường: 3, 5, 7, 9. Vụ 10: bí mật CLB (vụ đầu tiên của CLB thời thầy Quang, bác Thịnh bị oan).

| Vụ | Tuyến | Chuyện | Bắt đầu → hạn chót | Việc chốt ở hạn | Ngày lễ trong vụ | Kỹ năng mới |
|---|---|---|---|---|---|---|
| 1 | Khánh | Chữ ký H | (mở đầu từ 08/09) T3 24/09 → T2 30/09 | buổi họp rà soát | 17/09 Trung thu (mở đầu) | chọn cột, lọc bằng, VÀ, HOẶC |
| 2 | Khánh | Tin đồn | T3 08/10 → T3 15/10 | giải trình sau lễ kỷ niệm Hội SV | 15/10 Ngày thành lập Hội Sinh viên Việt Nam | bắt đầu bằng, chứa, `IN`, làm sạch chữ |
| 3 | thường | Gói hàng "phòng 4.." | T4 16/10 → sáng T2 21/10 | shipper tới lấy hàng hoàn | 20/10 Ngày Phụ nữ Việt Nam | lớn / nhỏ, `BETWEEN` số, xếp theo + vài dòng đầu, lọc tiếp trên phiếu |
| 4 | Khánh | Nam ở đâu lúc 22:40 | T3 22/10 → T6 25/10 | Minh Anh định mời Nam lên | | so sánh thời gian, `BETWEEN` thời gian, tách giờ / thứ, quy về tuần |
| 5 | thường | Tiền điện phòng 408 | T2 28/10 → T6 01/11 | hạn nộp tiền điện ở ban quản lý KTX | 31/10 Halloween | `+ - * /`, làm tròn |
| 6 | Khánh | Giúp Nam | T2 04/11 → T6 08/11 | Ban kiểm tra Hội SV xét đơn | | **nối hai bảng** (`JOIN`) |
| 7 | thường | Quỹ quà 20/11 | T2 11/11 → T4 20/11 | lễ tặng hoa cô chủ nhiệm (sáng) | 20/11 Ngày Nhà giáo Việt Nam | `GROUP BY`, `COUNT`, `COUNT(DISTINCT)`, ô trống, `COALESCE` |
| 8 | Khánh | Sổ quỹ | T5 21/11 → T6 29/11 | phòng họp, đối chất với Khánh | | `SUM`, `AVG`, `MAX`, `MIN`, `HAVING`, nối giữ dòng không khớp |
| 9 | thường | Xếp loại học kỳ 1 | T2 06/01 → T6 10/01/2025 | hạn nộp đơn phúc khảo | 09/01 Ngày Học sinh – Sinh viên Việt Nam | `CASE WHEN` nhiều bậc (≥ 3 điều kiện) |
| 10 | bí mật CLB | Vụ đầu tiên của CLB | T2 20/01 → T6 14/02/2025 (nghỉ Tết 25/01–09/02, lịch nhảy qua) | gặp thầy Quang và bác Thịnh (sáng 14/02) | 22/01 Ông Công ông Táo; 14/02 Valentine | tổng hợp, không thêm cú pháp |

Mỗi ngày lễ nằm trong đúng một vụ. Vụ 4, 6, 8 không có ngày lễ (từ cuối tháng 10 tới cuối tháng 11 không còn ngày lễ hợp). Bỏ Giáng sinh vì rơi vào mùa thi, không vụ nào chứa. Thứ trong tuần của mọi ngày đã kiểm; 22/01/2025 là 23 tháng Chạp năm Giáp Thìn.

Vụ 10 kéo qua Tết: hai ngày trước Tết (ngăn tủ mở, ông Công ông Táo), lịch nhảy qua kỳ nghỉ bằng một cảnh tin nhắn chúc Tết, rồi ba ngày sau Tết, kết đúng Valentine. Kết mùa và lời tỏ tình của Tùng cùng một ngày.

### Vì sao nối bảng ở Vụ 6

- Vụ 6 "Giúp Nam" vốn được thiết kế quanh việc nối (đơn đặt hàng ↔ phiên đăng nhập theo mã phiên); không phải cắt phần ấy.
- Nối bảng chỉ cần lọc là đủ dùng. Nhóm, đếm, tổng đều dùng được trên kết quả nối, nên **từ Vụ 7 tới Vụ 10 vụ nào cũng có nối** (năm vụ luyện, thay vì hai). Vụ 7 nhóm trên bảng nối, Vụ 8 tổng trên bảng nối, Vụ 9 xếp loại trên bảng nối điểm với tín chỉ.
- Vụ 8 "Sổ quỹ" vốn dùng tổng, trung bình, lọc nhóm: khớp nguyên bản cũ.
- Sớm hơn nữa (Vụ 4, 5) thì chen mất chỗ của thời gian và phép tính, mà hai vụ ấy chỉ cần một bảng.

### Đổi khác so với khung user đưa

- **Lọc tiếp trên phiếu (CTE) dời từ Vụ 2 sang Vụ 3**, đúng ý "dùng lại tệp đã có".
- **Xếp theo, lấy vài dòng đầu** (`ORDER BY`, `LIMIT`) đặt ở Vụ 3, đi cùng số.
- **`LEFT JOIN` ở Vụ 8**: "đặt mua mà kiểm kê không có dòng nào", đã có một vụ luyện nối thường trước đó.
- **Window để dành mùa 2.**

## 2. Thời gian trong vụ: có hạn chót, hành động không làm trôi giờ

### Luật

1. **Mỗi vụ chính có ngày bắt đầu và hạn chót** gắn với một việc có thật trong truyện (buổi họp, buổi xét, hạn nộp). Màn lịch hiện "Còn 3 ngày tới buổi xét".
2. **Hành động không tốn thời gian.** Tra, hỏi, khám phá, đi lại bao nhiêu cũng được. Không còn khung giờ.
3. **Ngày chỉ qua khi người chơi chọn "Hết ngày"**, và nút ấy chỉ hiện khi đã xong **việc chính của ngày** (dấu "!" của ngày). Còn nơi tùy chọn hay "?" chưa ghé thì Hà Vy nhắc một câu trước khi qua ngày, không ép.
4. **Thứ gì gắn với ngày thì qua ngày là mất**: nơi tùy chọn trên bản đồ, người chỉ có mặt hôm ấy, chi tiết ẩn của hôm ấy. Manh mối bắt buộc thì không bao giờ mất. Hạn chót có nghĩa ở đây: tới buổi chốt, người chơi cầm gì trình nấy.
5. **Tới hạn chót thì buổi chốt diễn ra.** Đủ căn cứ là kết đủ; thiếu là kết chưa trọn (không có kết xấu, giữ quyết định chương 1). Phần thưởng kết thật (lời nhắn chị Linh) thường nằm ở thứ tùy chọn của một ngày nào đó.
6. **Số ngày do nội dung quyết.** Mỗi ngày 1–2 việc chính, cộng ngày chốt. Nội dung không vừa thì kéo hạn trong truyện (dời buổi họp, có lý do) chứ không nhồi vào một ngày.

### So với máy hiện có

- Vụ 1 đang chạy kiểu "ngày theo truyện": mỗi ngày một chuỗi, tự sang ngày. Đổi thành: chuỗi chính của ngày xong thì hiện nút "Hết ngày".
- Vụ 2–5 cũ dùng bản đồ có ghi giờ (`giờ 09:30`). Giờ chỉ còn để trang trí cảnh (sáng, chiều, tối), không tiêu.
- Cần thêm: dòng `- Hạn chót:` và `- Việc chốt:` cho mỗi vụ ở `lich.md`; khai ngày cho từng ngày trong vụ; máy kiểm báo lỗi nếu một ngày có hơn 2 việc chính hoặc manh mối bắt buộc nằm ở chỗ tùy chọn.

## 3. Khuôn mỗi vụ chính (lấy Vụ 1 làm chuẩn)

1. Số ngày theo mục 2; mỗi ngày một nơi bên ngoài + một buổi chiều ở phòng CLB.
2. Bản đồ ngày với 1–2 nơi tùy chọn, mỗi nơi một chi tiết ẩn.
3. Một buổi tối không khí sinh viên, không manh mối.
4. Hà Vy soi một người.
5. ≥ 3 đối chất: một giữa vụ, một màn chốt nhiều nhịp ở ngày hạn chót, có nhịp người chơi tự nói giới hạn của chứng cứ.
6. Mỗi kỹ năng mới gỡ một kết luận sai của một nhân vật, kèm bẫy "sai có ích" (số dòng sai có lời riêng).

Mục tiêu đo: **≥ 300 dòng thoại, ≥ 40 chuỗi, ≥ 5 màn tra, ≥ 3 đối chất.** Vụ thường cũng theo khuôn này.

## 4. Từng vụ

### Vụ 1: Chữ ký H (Khánh) · 24/09 → 30/09

- **Kỹ năng:** chọn cột, lọc bằng, VÀ, HOẶC. `LIKE` (bắt đầu bằng, chứa) dời sang Vụ 2, `IN` sang Vụ 2.
- **Câu đố giữ gần như cũ:** chữ ký chỉ đọc được chữ H. Ngày 3 tra từng lớp (`ma_lop = 'BC24A'`, rồi `'BC23A'`), kết quả hiện theo vần, người chơi dò và bấm chọn tên bắt đầu bằng H → Hiếu, Hoài. Ngày 4 sổ niêm phong chỉ có mã của Hoài (giữ nguyên).
- **Câu HOẶC của Quân ở buổi họp:** `ten = 'Hoài' OR ma_lop = 'BC24A'` ra cả lớp cộng mọi bạn tên Hoài toàn trường; người chơi sửa thành VÀ → 1 dòng, rồi chỉ ra đó là người nộp, không phải người viết (nhật ký in).

#### Đưa Hoài vào sớm: lý do Tùng thấy có lỗi

Chỉ thêm hai nhịp nhỏ, không đổi câu đố:

1. **Nhập học 08/09 (mở đầu):** Tùng (áo xanh tình nguyện) dẫn một bạn nữ năm nhất đi nhận phòng, dẫn nhầm ra nhà xe (chuyện đã có ở việc "Một lần dẫn lạc"). Đó là Hoài.
2. **Trung thu 17/09 (mở đầu):** Hoài gặp lại Tùng ở sân KTX, cảm ơn rồi hỏi **phòng máy in của trường ở đâu** (Hoài cần in bài tập). Tùng chỉ đường, hơi lúng túng; Hà Vy để ý.

Từ đó tới Vụ 1, câu hỏi vô hại ấy thành lý do để Tùng nghi:

3. **Vụ 1, ngày 3–4:** tên Hoài hiện trong kết quả tra. Tùng nhớ câu hỏi hôm Trung thu, buột miệng "Thư đánh máy thì phải in. Hoài hỏi tớ đường ra phòng máy đấy, chắc Hoài in" (câu "chắc Hoài in" đã có ở phòng máy, nay có căn cứ của riêng Tùng).
4. **Buổi họp:** nhật ký in nói thư in từ tài khoản dùng chung của Robotics, không phải của Hoài. Hoài chỉ nộp hộ.
5. **Cảnh trà đá sau kết (đã có):** "Hôm ở phòng máy tớ lỡ mồm nghi cho Hoài." Tùng có lỗi vì chính lòng tốt của Hoài (hỏi đường, cảm ơn) bị Tùng biến thành căn cứ buộc tội.

Tuyến sau đó: 20/10 Tùng chọn quà xin lỗi (Vụ 3) → Hoài là người quen của Vụ 3 → 22/01 chung xe về quê → 14/02 tỏ tình (Vụ 10).

Sửa theo: thẻ `c-ten-h`, sổ CLB `like` và `where-chu`, nhân vật `hoai` (`Xuất hiện từ: mở đầu`), hai cảnh mở đầu, một câu của Tùng ở ngày 4.

### Vụ 2: Tin đồn (Khánh) · 08/10 → 15/10: chữ

- **Kết luận sai bị gỡ:** Hiếu: "Tin này có từ lâu, ai cũng chuyển."
- **Nhịp:**
  1. Lọc "bằng" câu tin đồn → 0 dòng (tin còn đoạn sau).
  2. Bắt đầu bằng "CLB Thám Tử soi dữ liệu" → 5 (đã chạy).
  3. Chứa "CLB Thám Tử soi" → 6, thêm T-08 tin tự viết (đã chạy); người chơi đọc để bỏ T-08.
  4. Thêm dữ liệu: tin chép lại viết thường, dính dấu cách → đổi chữ thường, bỏ dấu cách thừa mới bắt đủ.
  5. `IN`: hai tài khoản, hai máy trong một lần lọc.
- **Đối chất:** Hiếu ở căng tin (giữa vụ); Quân 2 nhịp ở hạn chót: buổi giải trình chiều 15/10, ngay sau lễ kỷ niệm thành lập Hội SV. Sáng 15/10 là việc ngày lễ của Quân.
- Tìm tin gốc đổi từ lọc tiếp trên phiếu thành một câu có VÀ (`loai = 'GOC'`).

### Vụ 3: Gói hàng "phòng 4.." (thường) · 16/10 → 21/10: số

- **Sự việc:** chốt bảo vệ KTX có gói hàng vô chủ, nhãn bị nước làm nhòe, chỉ đọc được "phòng 4..", ghi "hơn một cân". Sáng thứ Hai 21/10 shipper tới lấy hàng hoàn nếu không ai nhận. Không khí: sale 10/10, ai cũng đặt hàng.
- **Nhịp:**
  1. Tầng 4: `so_phong BETWEEN 400 AND 499`; bẫy `> 400` sót phòng 400.
  2. Hơn một cân: `khoi_luong > 1`; bẫy `>= 1`.
  3. Ghim phiếu tầng 4, **lọc tiếp** theo khối lượng, rồi theo "chưa nhận".
  4. **Xếp theo** khối lượng giảm dần, lấy 3 dòng đầu.
- **Đối chất:** bác bảo vệ ("nhãn nhòe rồi, tìm sao được"); hai người cùng nhận là chủ gói (hạn chót).
- Chủ nhật 20/10 (Ngày Phụ nữ Việt Nam): việc ngày lễ, Tùng chọn quà xin lỗi Hoài (mục 5).

### Vụ 4: Nam ở đâu lúc 22:40 (Khánh) · 22/10 → 25/10: thời gian

- **Kết luận sai bị gỡ:** Tùng: "Nam gửi tin"; Minh Anh: "Đủ để mời Nam lên rồi."
- Bảng thư viện và bài đăng **bỏ cột `thu`, `buoi` dựng sẵn**, chỉ còn cột thời điểm.
- **Nhịp:**
  1. Tin trong ngày 07/10: `BETWEEN '2024-10-07' AND '2024-10-07'` → 0 dòng (đã chạy); phải `'2024-10-07 00:00'` tới `'2024-10-07 23:59'`.
  2. Ai ở thư viện đúng lúc 22:40: `'22:40' BETWEEN gio_vao AND gio_ra` → Nam, Hà Vy (đã chạy).
  3. Tách giờ bài đăng: 8 bài buổi chiều, 1 bài sau 21 giờ.
  4. Tách thứ: tối thứ Hai nào Nam cũng lên thư viện.
  5. Quy về tuần: tuần của 07/10 chỉ còn hai người.
- **Đối chất:** Tùng (giữa vụ); Minh Anh; dc-nam 2 nhịp ở hạn chót.
- SQLite: `strftime('%H' | '%w' | '%W', …)`; sổ CLB ghi `EXTRACT`, `DATE_TRUNC('week', …)` ở hệ khác.

### Vụ 5: Tiền điện phòng 408 (thường) · 28/10 → 01/11: phép tính

- **Sự việc:** hóa đơn điện tháng 10 về; Tùng chia đều sáu người, một bạn về quê nửa tháng kêu bị tính oan.
- **Nhịp:**
  1. Số điện = chỉ số cuối − chỉ số đầu.
  2. Tiền = số điện × đơn giá.
  3. Phần mỗi người = tiền × ngày ở ÷ tổng ngày ở; bẫy chia số nguyên: `15 / 31` ra 0 (đã chạy), phải nhân 1.0 trước.
  4. Làm tròn tới nghìn đồng: SQLite không nhận `ROUND(x, -3)` (đã chạy), khối sinh `ROUND(x / 1000.0) * 1000`. Bẫy: làm tròn từng người rồi cộng lại lệch hóa đơn; ai chịu phần lẻ.
- **Đối chất:** Tùng ("chia đều cho nhanh"); trưởng phòng ở cuộc họp phòng (hạn chót).
- Thứ Năm 31/10: giao lưu Halloween các CLB ở sân KTX, việc ngày lễ (mục 5).

### Vụ 6: Giúp Nam (Khánh) · 04/11 → 08/11: nối hai bảng

- **Kết luận sai bị gỡ:** Quân (Ban kiểm tra Hội SV): "Nam đứng tên năm đơn, Nam đặt."
- **Nhịp:**
  1. Lọc đơn đứng tên Nam đã duyệt: 5 đơn (ôn làm sạch: ô trạng thái dính dấu cách, đã học ở Vụ 2). Nam nói chỉ đặt 2.
  2. Mỗi đơn có mã phiên → **nối** với bảng phiên đăng nhập theo mã phiên. Bẫy nối theo ngày ra thừa dòng (đã có).
  3. Trên bảng nối, lọc máy văn phòng xưởng: 3 đơn, cả ba ban đêm (ôn tách giờ Vụ 4).
  4. Nối thêm phiên với bảng tài khoản phần mềm: người đăng nhập máy văn phòng là tài khoản dùng chung.
- **Đối chất:** cô Hạnh (giữa vụ, "căn cứ vào đâu mà xin bảng phiên"); Quân 3 nhịp ở hạn chót, có nhịp đơn DLK-08 lúc 22:05 tối 07/10 khi Nam ở thư viện (thẻ Vụ 4).
- **Mảnh ghép:** có người mượn tên Nam từ máy văn phòng xưởng; ba người có chìa; Khánh lộ mặt, Hà Vy soi Khánh.

### Vụ 7: Quỹ quà 20/11 (thường) · 11/11 → sáng 20/11: nhóm, đếm, ô trống

- **Sự việc:** lớp BC24A góp tiền mua quà 20/11. Lớp trưởng nói còn thiếu, nghi vài bạn chưa đóng; Hiếu bị nghi vì hay chê quà đắt.
- **Bảng:** danh sách lớp, sao kê chuyển khoản, sổ thu tay (ô tiền để trống với bạn đóng tiền mặt nhờ người khác nộp hộ).
- **Nhịp:**
  1. Nối danh sách lớp với sao kê (ôn Vụ 6), nhóm theo người, đếm số lần chuyển.
  2. Đếm người khác nhau đã chuyển: sao kê có 52 dòng nhưng chỉ 38 người (có người chuyển hai lần).
  3. Ô trống: lọc `ghi_chu <> 'Nộp hộ'` làm rơi các dòng để trống; khối "ô trống coi là Tự nộp" (`COALESCE`).
  4. Nhóm theo người nộp hộ: Hiếu nộp hộ ba bạn, chính là lý do sao kê của Hiếu "thiếu".
- **Đối chất:** lớp trưởng (giữa vụ); buổi sinh hoạt lớp, Hoài lên tiếng đỡ Hiếu (hạn chót là lễ tặng hoa sáng 20/11).
- Chiều 20/11: việc ngày lễ của cô Hạnh (mục 5).

### Vụ 8: Sổ quỹ (Khánh) · 21/11 → 29/11: tổng, trung bình, lớn nhất, nhỏ nhất, lọc nhóm

Là Vụ 5 cũ. **Dời mốc:** Nam kiểm kê kho đang ghi thứ Ba 12/11, đổi thành ngày đầu Vụ 8 (21/11).

- **Nhịp:**
  1. Nối đơn với kiểm kê: đơn đặt thứ mà kho có 0 cái.
  2. **Nối giữ dòng không khớp** (`LEFT JOIN … IS NULL`): linh kiện chưa từng có dòng trong kiểm kê, khác với có số 0.
  3. Nối sổ chi với bảng quỹ, gom theo người duyệt: tổng, trung bình, khoản lớn nhất, nhỏ nhất.
  4. Lọc nhóm vượt ngưỡng giải trình một triệu (`HAVING`).
- **Đối chất:** thầy Quang (giữa vụ, xin sổ quỹ, đã có); Quân ("Minh Anh cũng duyệt, sao không nghi?", trình trung bình 150.000 so với 800.000); Khánh 5 nhịp ở hạn chót (đã có).
- **Kết tuyến Khánh.** Sau đó: liên hoan, CLB nghỉ ôn thi.

### Vụ 9: Xếp loại học kỳ 1 (thường) · 06/01 → 10/01/2025: CASE WHEN

- **Sự việc:** điểm học kỳ 1 về. Hiếu bị xếp "Khá", tự tính ra "Giỏi", sắp lỡ học bổng; Phòng Đào tạo bảo phần mềm đúng. Hạn phúc khảo thứ Sáu 10/01. Thứ Năm 09/01 (Ngày HSSV) có việc ngày lễ "Sinh viên 5 tốt", ôn `CASE WHEN` ngay sau khi học.
- **Nhịp:**
  1. Nối điểm học phần với bảng học phần lấy tín chỉ; trung bình có trọng số (ôn Vụ 5, 7, 8).
  2. Xếp loại bằng `CASE WHEN` **năm bậc**: Xuất sắc ≥ 3,6; Giỏi ≥ 3,2; Khá ≥ 2,5; Trung bình ≥ 2,0; còn lại Yếu.
  3. Bẫy thứ tự điều kiện: viết `>= 2.5` trước `>= 3.2` thì ai cũng thành Khá.
  4. Điều kiện kép: Giỏi mà có môn điểm D thì hạ một bậc.
  5. Bẫy làm tròn: 3,18 làm tròn thành 3,2 rồi mới xếp thì thành Giỏi; quy chế xếp trên điểm chưa làm tròn. Chuyện của Hiếu là ở đây. (Tránh số kiểu 3,195: SQLite làm tròn ra 3,19, đã chạy.)
- **Đối chất:** cán bộ Phòng Đào tạo (cô trẻ); Hiếu tự tin sai ở một nhịp.
- Không khí: sau thi, săn vé xe về quê.

### Vụ 10: Vụ đầu tiên của CLB (bí mật CLB) · 20/01 → 14/02/2025: tổng hợp

- Ngăn tủ khóa mở (đủ lời nhắn chị Linh). Hồ sơ vụ đầu tiên thời thầy Quang: kết luận bác Thịnh ở trong phòng lúc mất đồ vì "bản ghi khớp giờ".
- Mỗi ngày dùng một nhóm kỹ năng cũ: chữ (sổ chép tay lệch kiểu viết), thời gian (lượt ra vào), phép tính (thời gian ở trong phòng), nhóm và đếm, nối sổ ra vào với lịch trực, xếp loại lượt đi tuần.
- Đối chất: thầy Quang thời nay ("Căn cứ vào đâu?" lần này dành cho chính thầy), bác Thịnh.
- Chưa đủ lời nhắn thì Vụ 10 vẫn mở, nhưng thiếu cảnh ngăn tủ và kết thật.
- Hai ngày lễ: 22/01 (gom xe về quê, Tùng và Hoài cùng tuyến) và 14/02 (Tùng tỏ tình; kết mùa cùng ngày).
- Bốn người quen (bác Thịnh, bà Lụa, thầy Quang, cô Hạnh) giúp ở buổi gặp cuối nếu đủ hảo cảm (mục 5.2). Không bắt buộc để kết đủ.

## 5. Việc phụ

Ba loại: **việc ngày lễ** (một ngày, không chơi lại), **việc của người quen** (mỗi vụ chính mở một người, 3 việc, có hảo cảm và ảnh CG), **việc CLB** (các việc phụ đã có của Duy, Tùng, Minh Anh).

### 5.1. Việc ngày lễ: đúng ngày, không chơi lại

- Mỗi việc có **đúng một ngày**, nằm trong một vụ chính. Ngày ấy tới thì việc hiện, kèm dấu "?" ở người giao.
- **Chỉ chơi được trong ngày ấy.** Bấm "Hết ngày" là lỡ hẳn, không chơi lại, kể cả sau khi xong mùa. Hà Vy nhắc trước khi qua ngày.
- Lỡ thì có hậu quả nhỏ, cho thấy chứ không kể: hôm sau người giao nhắc lại, món quà để trên bàn chưa ai mở…
- Kỹ năng chỉ dùng thứ đã học trước ngày ấy.

| Ngày | Ngày lễ | Vụ | Việc (tạm) | Người giao | Ôn |
|---|---|---|---|---|---|
| T3 17/09 | Trung thu | 1 (mở đầu) | Tuyến chính, không phải việc phụ: buổi gặp đầu CLB, Hoài ra mắt | | |
| T3 15/10 | Ngày thành lập Hội Sinh viên Việt Nam | 2 | Danh sách bốc thăm quà của Hội gõ lộn xộn tên, lọc ra ai trúng | Quân | chữ, làm sạch, `IN` |
| CN 20/10 | Ngày Phụ nữ Việt Nam | 3 | Tùng chọn quà xin lỗi Hoài: lọc quà trong khoảng giá, xếp theo | Tùng | lớn / nhỏ, `BETWEEN`, xếp theo |
| T5 31/10 | Halloween | 5 | Giao lưu các CLB ở sân KTX: chia tiền đồ hóa trang và bánh kẹo theo CLB | Duy | phép tính, làm tròn |
| T4 20/11 | Ngày Nhà giáo Việt Nam | 7 (chiều) | Học trò cũ của cô (đã có) | cô Hạnh | nối, đếm người khác nhau |
| T5 09/01 | Ngày Học sinh – Sinh viên Việt Nam | 9 | Tuyên dương "Sinh viên 5 tốt": xếp từng bạn vào mức theo nhiều tiêu chí | Quân | `CASE WHEN` |
| T4 22/01 | Ông Công ông Táo | 10 | Gom xe về quê: ai đi cùng tuyến, cùng ngày; Tùng và Hoài chung một xe | Tùng | thời gian, nhóm |
| T6 14/02 | Valentine | 10 | Tùng tỏ tình; Hoài trả lời bằng một câu đố dữ liệu kiểu CLB (sổ mượn sách thư viện, xếp theo ngày, chữ đầu tên sách ghép thành câu trả lời) | Tùng | chữ, xếp theo, tổng hợp |

### 5.2. Người quen: mỗi vụ chính mở một người, giúp ở hai màn chốt cuối

**Mỗi người quen đều dẫn về một trong hai màn chốt lớn:** đối chất với Khánh (cuối Vụ 8, kết tuyến Khánh) hoặc buổi gặp thầy Quang và bác Thịnh (cuối Vụ 10, kết mùa). Người chơi kết thân với ai thì đến cuối, người ấy đứng ra giúp.

- **Mở:** xong một vụ chính thì một người có vai trong vụ ấy thành người quen. Không tính thành viên CLB.
- **Ba việc mỗi người**, mở giãn cách (sau vụ N, N+1, N+2), nhưng **cả ba phải mở xong trước màn chốt người ấy giúp**. Người giúp ở Vụ 8 thì muộn nhất mở hết sau Vụ 7. Mỗi việc 1–2 màn tra, khoảng 20–40 dòng thoại, ôn kỹ năng đã học. Không hết hạn.
- **Hảo cảm:** mỗi việc xong lên một bậc. **Đủ 3 bậc thì thưởng ảnh CG.**
- **Ở nhịp người ấy giúp (user chốt 04/10):**
  - **Chưa đủ hảo cảm:** người chơi **tự chọn bằng chứng** trong hồ sơ để trình, như mọi nhịp đối chất (có thể chọn sai, có lời phản hồi).
  - **Đủ hảo cảm:** người quen **tự đứng ra nói thay**: một cảnh ngắn, người ấy đưa ra bằng chứng của mình, nhịp tính là đủ căn cứ, người chơi không phải chọn.
  - Bằng chứng để tự chọn **luôn kiếm được trong vụ chính**, không phụ thuộc người quen. Người quen chỉ thay người chơi trình, không mở khóa thứ bắt buộc.

#### Năm người giúp ở màn đối chất với Khánh (cuối Vụ 8)

Mỗi người ứng với một nhịp trong năm nhịp đã có.

| Mở sau | Người quen | Ba việc (gợi ý) | Ảnh CG | Giúp ở nhịp |
|---|---|---|---|---|
| Vụ 2 | Hiếu | danh sách lớp gõ sai dấu (chữ) / điểm chuyên cần (số) / giờ nhận tin trong nhóm lớp (thời gian) | Hiếu và cả nhóm ở sân bóng | **"Cái tin đừng gán cho tôi":** Hiếu mở máy, chỉ tin đồn tới nhóm lớp mình lúc 22:41, từ ai chuyển |
| Vụ 3 | Hoài | quỹ phòng KTX (số) / lịch học nhóm (thời gian) / sổ mượn sách (chữ, xếp theo) | Hoài ở bàn cạnh cửa sổ thư viện | **"Lá thư":** Hoài nhớ người nhờ nộp hộ đeo huy hiệu bánh răng sứt một răng |
| Vụ 4 | Nam | lịch tập đội robot (thời gian) / điểm thi thử robot (phép tính) / đơn đặt của đội (nối) | đội robot chạy thử trong xưởng | **"Đơn do Nam lập":** Nam mang chính bản kiểm kê đếm tay có chữ ký hai người |
| Vụ 5 | chú Cường (cổng KTX) | sổ khách theo phòng (số) / khách sau giờ đóng cổng (thời gian) / tiền gửi xe tháng (phép tính) | chú Cường và chiếc đài cũ ở cổng | **"Em vào in sơ đồ":** sổ cổng KTX tối 15/9, giờ cậu sinh viên đeo huy hiệu về |
| Vụ 6 | Quân | báo cáo hoạt động các CLB (nối) / CLB nộp muộn (thời gian) / số thành viên từng CLB (nhóm, đếm) | Quân bỏ gi lê, ngồi trà đá cùng nhóm | **"Đúng thẩm quyền":** Quân tự đọc quy chế Hội SV, người giữ quy trình đứng về phía bằng chứng |

#### Bốn người giúp ở buổi gặp thầy Quang và bác Thịnh (cuối Vụ 10)

| Mở sau | Người quen | Ba việc (gợi ý) | Ảnh CG | Giúp ở |
|---|---|---|---|---|
| Vụ 1 | bác Thịnh (bảo vệ tòa B) | sổ giao ca (lọc) / giờ khóa tòa (thời gian) / tổng giờ trực (tổng) | bác Thịnh pha trà trong chốt bảo vệ | bác tự kể đêm năm xưa, không đợi bị hỏi |
| Vụ 7 | bà Lụa (trà đá) | sổ nợ của Tùng (phép tính, làm tròn) / khách quen theo thứ (nhóm) / giá nhập theo tháng (tổng) | gốc cây trà đá chiều mưa | kể thêm về "cậu trà nóng" (thầy Quang thời sinh viên) |
| Vụ 8 | thầy Quang | ba việc của CLB thời thầy lập (ghép kỹ năng) | thầy Quang thời sinh viên, ảnh cũ trong hồ sơ | thầy tự nhận phần sai sớm một nhịp |
| Vụ 9 | cô Hạnh (Phòng Đào tạo, sắp nghỉ hưu) | lịch thi (nối) / phòng thi thiếu ghế (nhóm) / học bổng theo khoa (`CASE`) | cô Hạnh mặc áo dài | mở kho lưu trữ, tìm sổ ra vào năm xưa |

Chín người, 27 việc, 9 ảnh CG. Việc cũ dùng lại: "Sổ nợ trà đá" thành việc 1 của bà Lụa.

### 5.3. Việc CLB: giữ như cũ

Năm việc. Đủ điều kiện thì mở (vụ có kỹ năng ấy đã xong + một điều kiện trong truyện), không hết hạn, không tính hảo cảm.

| Việc | Ôn | Mở khi |
|---|---|---|
| Túi đồ trên ghế đá (Tùng) | chữ, `IN` | xong Vụ 2 + đã ghé ghế đá sân KTX (bỏ phần nối với bảng sinh viên, bỏ ngày 30/10) |
| Sổ sử dụng phòng (Duy) | làm sạch, xếp theo | xong Vụ 3 + Duy đã nhắc sổ phòng |
| Một lần dẫn lạc (Tùng) | thời gian | xong Vụ 4 + đã nghe chuyện Tùng và Hoài (bỏ nhóm, đếm; đổi sang lọc theo giờ) |
| Chiếc micro ở tủ chung (Duy) | nối | xong Vụ 6 + Duy nhờ |
| Một lần hoàn tiền (Minh Anh) | tổng, lọc nhóm | xong Vụ 8 + Minh Anh nhờ |

### 5.4. Album ảnh và sticker (user chốt 04/10)

- **Ảnh CG được lưu lại** vào một **album kiểu ảnh chụp hồi sinh viên**: mở ra như cuốn album cũ, mỗi ảnh một trang, có ngày chụp và một dòng chú thích viết tay. Album gom mọi CG: kết vụ, ngày lễ, người quen đủ hảo cảm. Ảnh chưa mở thì là khung trống có ngày, để người chơi biết mình đã lỡ dịp nào (việc ngày lễ lỡ thì khung trống mãi).
- **Cảnh chibi thành sticker**: những khoảnh khắc vui của nhóm (Tùng cá thua Hà Vy, sổ nợ trà đá, Duy kiểm kê tủ…) là sticker kiểu các bạn in ra dán, nhớ lại chuyện thú vị cùng nhau. Sticker dán vào một trang riêng (bìa sổ CLB hoặc mặt sau album).
- Màn xem album và trang sticker là việc ở máy; nguồn ảnh theo đường làm ảnh CG và chibi hiện có.

### 5.5. Vụ chính

Xong vụ N thì vụ N+1 mở (nút "Sang Vụ N+1" ở màn kết). Lịch nhảy tới ngày bắt đầu vụ mới. Vụ chính không bao giờ đòi kỹ năng chỉ có ở việc phụ.

## 6. Khối mới ở màn tra (việc ở máy)

| Khối | Vụ | Câu sinh ra |
|---|---|---|
| Kết quả theo vần + bấm chọn dòng | 1 | (không SQL) |
| So chữ "bằng / bắt đầu bằng / chứa"; một trong mấy giá trị | 2 | `LIKE`, `IN` |
| So "lớn hơn / nhỏ hơn / từ … đến …"; lấy n dòng đầu | 3 | `>`, `<`, `BETWEEN`, `LIMIT` |
| LẤY [giờ / thứ / tuần / ngày] TỪ [cột] | 4 | `strftime` |
| Cột tính [cột] [+ - × ÷] [cột / số]; làm tròn tới … | 5 | phép tính, `ROUND` |
| Nối hai bảng (đã có) | 6 | `JOIN` |
| Đếm người khác nhau; ô trống coi là … | 7 | `COUNT(DISTINCT)`, `COALESCE`, `IS NULL` |
| Lớn nhất, nhỏ nhất; nối giữ dòng không khớp | 8 | `MAX`, `MIN`, `LEFT JOIN` |
| Xếp loại nhiều bậc: NẾU … THÌ … NẾU KHÔNG NẾU … | 9 | `CASE WHEN` |
| Hết ngày, hạn chót, việc ngày lễ | mọi vụ | máy lịch (mục 2, 5.1) |
| Hảo cảm, việc mở giãn cách | mọi vụ | máy người quen (mục 5.2) |
| Album ảnh hồi sinh viên, trang sticker chibi | mọi vụ | mục 5.4 |

## 7. Khối lượng việc

| | Bây giờ | Sau kế hoạch |
|---|---|---|
| Vụ chính | 5 | 10 |
| Việc phụ | 6 | 7 việc ngày lễ + 27 việc người quen + 5 việc CLB |
| Ảnh CG mới | | 9 (người quen) + cảnh ngày lễ |
| Dòng thoại vụ chính | khoảng 800 | khoảng 3.000 |
| Dựng lại từ vụ cũ | | Vụ 1, 2, 4 (từ Vụ 3 cũ), 6 (từ Vụ 4 cũ), 8 (từ Vụ 5 cũ) |
| Viết mới | | Vụ 3, 5, 7, 9, 10; 7 việc ngày lễ; 27 việc người quen (ngắn) |

## 8. Thứ tự làm

1. **Chốt khung này** cùng các chỗ "còn mở".
2. **Máy lịch:** hạn chót, nút "Hết ngày", thứ gắn ngày, việc ngày lễ. **Máy người quen:** hảo cảm, mở giãn cách, album CG. Làm trước vì mọi vụ dựa vào.
3. **Sắp lại tuyến Khánh** (Vụ 1, 2, 4, 6, 8): làm nhẹ Vụ 1 + đưa Hoài vào Trung thu, dời kỹ năng, đổi dữ liệu thời gian, dời mốc kiểm kê.
4. **Khối màn tra theo thứ tự vụ.**
5. **Vụ thường** 3, 5, 7, 9, mỗi vụ đưa hội đồng chấm dàn ý trước khi viết lời; việc ngày lễ viết cùng vụ chứa ngày ấy; việc người quen viết theo đợt, mỗi đợt ba người.
6. **Vụ 10** sau cùng.

Mỗi vụ: viết khung + lời, chạy `kiem-noi-dung:mvp`, `kiem-giong`, `kiem-to-mau`, chơi thử trên trình duyệt trước khi báo xong.

## 9. Còn mở

Không còn câu hỏi về hướng. Chi tiết từng gói việc, cú pháp mới và tiêu chí nghiệm thu ở `giao-viec.md`.
