# Vụ: Sổ quỹ

Quy ước: dòng "- **Tên** (biểu cảm): …" là lời thoại hiện từng câu; "🗂️" là thẻ vào hồ sơ (cũng ghim lên bảng điều tra); "💻" là màn tra dữ liệu trên laptop; "❓" là câu hỏi nhiều lựa chọn; "🔀" là rẽ nhánh do người chơi chọn; "⤵" là rẽ tự động theo cờ (hai đường loại trừ nhau — bản này in CẢ HAI để bạn đọc, người chơi chỉ đi một). Mỗi chuỗi chỉ in một lần; gặp "*(tiếp theo như chuỗi … đã in ở trên)*" thì quay lên đọc.

## 📍 Xưởng CLB Robotics — Nam đếm kho: ba linh kiện không có một cái

*[Thẻ chữ]* Vụ 5 — Thứ Sáu, 18 tháng 10
- **Người kể**: Xưởng Robotics, cuối tuần. Nam đứng giữa các kệ linh kiện, tay cầm bảng kiểm kê, mặt khó coi.
- **Nam** (neutral): Tớ đếm kho. Đếm tay từng loại, hai lần.
- **Tùng** (worried): Rồi sao?
- **Nam** (neutral): Ba đơn mang tên tớ: động cơ servo, mạch điều khiển, khung nhôm. Trong kho không có lấy một cái. Sổ ghi đã duyệt, mà lúc tớ kiểm kê, kho không có.
> 🗂️ Tài liệu mới: **Bảng kiểm kê xưởng của Nam** — nguồn: Nam đếm tay từng loại, hai lần
> Mười loại linh kiện trong sổ đặt hàng, đếm thực tế trong kho. Ba loại đang là số không: động cơ servo, mạch điều khiển, bộ khung nhôm.
> 🗂️ Giấy nhớ mới: **[Kho: 0]** — nguồn: Bảng kiểm kê của Nam
> Cột so_luong_co của bảng kiểm kê ghi số lượng đếm được trong kho. Không có một cái thì ghi 0.
> (giấy nhớ kéo được vào màn tra: 0)
- **Hà Vy** (thinking): Vậy phải so sổ đặt hàng với bảng kiểm kê. Hai bảng, chung nhau tên linh kiện.
- **Duy** (neutral): Nối theo tên linh kiện rồi lọc thứ nào trong kho đang là số không.
> 🎯 NHIỆM VỤ: Đơn nào đặt mua thứ mà trong kho không có một cái?
> 💭 Hà Vy nhắc: Nối sổ đặt hàng với bảng kiểm kê theo tên linh kiện. Kho không có là số không.
### 💻 Màn tra: Sổ đặt hàng so với kiểm kê (thẻ `c-dat-ma-khong-co`)
Đề bài trên màn hình: *Nối sổ đặt hàng với bảng kiểm kê của Nam. Đơn nào đặt mua thứ mà trong kho đang là số không?*
Cách chơi: kéo giấy nhớ vào ô giá trị, bấm cột / phép ("bằng", "bắt đầu bằng") / VÀ–HOẶC, hàng "nối với bảng … theo cột …" rồi CHẠY. Chạy sai không bị phạt.
Bảng `don_linh_kien` (10 dòng):
| ma_don | ngay | nguoi_dat | linh_kien | so_luong | so_tien | ma_phien | trang_thai |
|---|---|---|---|---|---|---|---|
| DLK-01 | 2024-09-20 | Nam | Cảm biến dò line | 4 | 120000 | PH-11 | DA_DUYET |
| DLK-02 | 2024-09-24 | Bách | Pin 18650 | 10 | 200000 | PH-12 | DA_DUYET |
| DLK-03 | 2024-09-27 | Nam | Động cơ servo | 8 | 800000 | PH-13 | DA_DUYET |
| DLK-04 | 2024-10-01 | Thảo | Dây nối | 20 | 60000 | PH-14 | DA_DUYET |
| DLK-05 | 2024-10-02 | Nam | Bánh xe | 6 | 150000 | PH-15 | DA_DUYET |
| DLK-06 | 2024-10-04 | Nam | Mạch điều khiển | 3 | 900000 | PH-16 | DA_DUYET |
| DLK-07 | 2024-10-05 | Khánh | Ốc vít | 100 | 40000 | PH-17 | DA_DUYET |
| DLK-08 | 2024-10-07 | Nam | Bộ khung nhôm | 2 | 700000 | PH-18 | DA_DUYET |
| DLK-09 | 2024-10-08 | Thảo | Keo dán | 5 | 30000 | PH-19 | CHO_DUYET |
| DLK-10 | 2024-10-08 | Bách | Mỏ hàn | 2 | 180000 | PH-20 | CHO_DUYET |
Bảng `kiem_ke` (10 dòng):
| linh_kien | so_luong_co |
|---|---|
| Cảm biến dò line | 4 |
| Pin 18650 | 9 |
| Động cơ servo | 0 |
| Dây nối | 18 |
| Bánh xe | 6 |
| Mạch điều khiển | 0 |
| Ốc vít | 85 |
| Bộ khung nhôm | 0 |
| Keo dán | 3 |
| Mỏ hàn | 2 |
Giấy nhớ đang có quanh màn hình: [0]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
SELECT ma_don, nguoi_dat, so_tien, so_luong_co FROM don_linh_kien JOIN kiem_ke ON don_linh_kien.linh_kien = kiem_ke.linh_kien WHERE so_luong_co = 0;
```
Kết quả: 3 dòng
| ma_don | nguoi_dat | so_tien | so_luong_co |
|---|---|---|---|
| DLK-03 | Nam | 800000 | 0 |
| DLK-06 | Nam | 900000 | 0 |
| DLK-08 | Nam | 700000 | 0 |
Lời nhân vật sau mỗi lần chạy:
- Khi lỗi không có cột: **Duy** (neutral): Máy báo không có cột đó. Số lượng trong kho nằm ở bảng kiểm kê, nối rồi mới lọc được.
- Khi ra 0 dòng: **Hà Vy** (thinking): Không dòng nào. Kho không có thì bảng kiểm kê ghi số 0, giấy nhớ cũng là số 0.
- Khi ra 10 dòng: **Tùng** (gai-dau): Cả sổ. Mình chỉ cần thứ trong kho đang là số không.
- Khi đúng: **Nam** (neutral): Ba đơn. Đúng ba đơn mang tên tớ.
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Ba đơn đặt mua thứ không có trong kho** — Kết quả nối sổ đặt hàng với kiểm kê: động cơ servo, mạch điều khiển, khung nhôm — ba đơn đứng tên Nam từ máy văn phòng xưởng, ghi đã duyệt, mà kho không có một cái. Tiền có thật sự xuất khỏi quỹ nào thì phải xem sổ quỹ.

- **Bạn (người chơi)**: Ba đơn. Đúng ba đơn đứng tên Nam từ máy văn phòng xưởng.
- **Nam** (neutral): Linh kiện chỉ là cái cớ để ghi vào sổ. Còn tiền có thật sự đi đâu không, sổ đặt hàng không nói.
- **Minh Anh** (serious): Tiền thì nằm trong sổ quỹ. Sổ quỹ khối CLB không phải của mình, chị không tự mở được. Phải xin thầy Quang.
- **Tùng** (gai-dau): Thầy Quang thì lại "căn cứ vào đâu".
- **Hà Vy** (neutral): Thì mang căn cứ đi.

### 📍 Phòng Đào tạo — Phòng Đào tạo: "Căn cứ vào đâu?"

- **Người kể**: Phòng Đào tạo. Thầy Quang nghe Minh Anh trình bày, không ngắt lời, rồi hỏi đúng một câu.
> ⚖️ ĐỐI CHẤT — Thầy Quang nêu giả thuyết: "Các em muốn thầy cho xuất sổ quỹ của khối CLB, một sổ không thuộc CLB các em. Căn cứ vào đâu?". Người chơi trình thẻ trong hồ sơ, hoặc nói "chưa đủ căn cứ".
>   - Trình ev-dat-ma-khong-co [ĐỦ CĂN CỨ] → **Minh Anh** (neutral): Thưa thầy, ba đơn linh kiện ghi đã duyệt, trên đơn tổng hai triệu tư, nhưng kiểm kê xưởng không có một cái nào. Đơn đã duyệt mà hàng không có, nên bọn em cần xác minh tiền ấy có xuất khỏi quỹ nào không, ai duyệt. Bọn em cũng xin thầy cho mở trang sổ ký phòng máy tối 15/9. Hồi tháng 9 thầy Khải chưa cho mở. / **Thầy Quang** (neutral): Đơn đã duyệt mà không có hàng. Giờ là chuyện tiền quỹ và mượn tên người khác, không còn là chuyện một lá thư kiến nghị. Căn cứ ấy đủ để mở sổ quỹ, và mở trang sổ ký ấy. Thầy cho xuất, các em chỉ được xem các khoản liên quan ba đơn này và quỹ CLB Thám Tử.
>   - Trình ev-don-nam-may [HỖ TRỢ] → **Hà Vy** (neutral): Ba đơn ấy tạo ban đêm từ máy văn phòng xưởng, đứng tên Nam mà Nam không đặt ạ. / **Thầy Quang** (neutral): Đơn mượn tên là chuyện của xưởng Robotics. Chuyện tiền thì thầy cần căn cứ về tiền.
>   - Trình ev-toi-07 [GỢI Ý] → **Thầy Quang** (neutral): Em Nam ở thư viện tối đó. Thầy ghi nhận, nhưng điều ấy liên quan gì tới sổ quỹ?
>   - Chưa đủ căn cứ → **Thầy Quang** (stern): Chưa đủ căn cứ thì thầy chưa mở sổ của người khác cho các em xem. Về làm rõ đã. / **Minh Anh** (worried): Dạ. Bọn em về đếm lại kho ạ.
>   - Thẻ khác → **Thầy Quang** (neutral): Cái này nói gì về tiền? / **Minh Anh** (worried): Em xem lại hồ sơ ạ.
> ⤵ RẼ TỰ ĐỘNG: nếu có dc-xin-so-quy-du thì sang "Cô Hạnh đưa bản xuất, cô Lan in quy chế" (in ở dưới); nếu KHÔNG thì chạy tiếp các dòng ngay sau đây. Hai đường loại trừ nhau, người chơi chỉ thấy một.
- **Người kể**: Cả nhóm ra khỏi phòng Đào tạo, chưa có sổ quỹ. Minh Anh dừng ở hành lang.
- **Minh Anh** (serious): Thầy nói đúng. Mình phải mang căn cứ về tiền và hàng, không phải về người. Xem lại hồ sơ rồi vào lại.

*— Chỉ khi có dc-xin-so-quy-du (đường rẽ tự động ở trên) —*

#### 📍 Phòng Đào tạo — Cô Hạnh đưa bản xuất, cô Lan in quy chế

- **Cô Hạnh** (smile): Thầy Quang ký rồi. Bản xuất sổ quỹ cô gửi về laptop CLB. Các em chỉ xem đúng dòng liên quan thôi nhé.
- **Cô Lan** (neutral): Cô bên Công tác sinh viên in kèm quy chế quỹ khối CLB. Khoản dưới một triệu thì chủ tịch Hội duyệt thẳng. Tổng một người duyệt vượt một triệu thì người đó phải giải trình. Và CLB nào không còn phòng sinh hoạt hết một học kỳ thì làm thủ tục giải thể: quỹ đóng sổ, số dư chuyển về Hội sinh viên.
- **Cô Hạnh** (neutral): Trang sổ ký phòng máy tối 15/9 thầy Quang cũng ký cho mở. Thầy Khải chụp đúng một trang ấy, cô gửi kèm.
- **Minh Anh** (neutral): Em cảm ơn hai cô ạ.

##### 📍 Phòng CLB — Sổ quỹ khối CLB: khoản nào ghi vào quỹ CLB Thám Tử

- **Người kể**: Chiều, phòng CLB. Bản xuất cô Hạnh gửi đã nằm trong laptop: chỉ gồm các khoản chi ghi vào quỹ CLB Thám Tử và các khoản liên quan ba đơn.
- **Duy** (neutral): Mỗi khoản chi có mã quỹ. Bảng quỹ cho biết mã nào là quỹ của CLB nào. Lại hai bảng.
> 🎯 NHIỆM VỤ: Khoản chi nào ghi vào quỹ CLB Thám Tử?
> 💭 Hà Vy nhắc: Nối sổ chi với bảng quỹ theo mã quỹ, rồi lọc quỹ của CLB mình.
> 🗂️ Tài liệu mới: **Bản xuất sổ quỹ khối CLB** — nguồn: Phòng Kế hoạch, Cô Hạnh gửi theo chữ ký của Thầy Quang; quy chế do Cô Lan in kèm
> Sổ chi: mỗi khoản có mã chi, mã đơn, mã quỹ, số tiền, người duyệt. Bảng quỹ: mã quỹ nào thuộc CLB nào.
> Chỉ gồm các khoản ghi vào quỹ CLB Thám Tử và các khoản liên quan ba đơn đang xét.
> 🗂️ Giấy nhớ mới: **[Quỹ CLB Thám Tử]** — nguồn: Bảng quỹ
> Bảng quỹ ghi CLB chủ quỹ ở cột clb: THAM_TU là CLB Thám Tử, ROBOTICS là CLB Robotics.
> (giấy nhớ kéo được vào màn tra: THAM_TU)
> 🗂️ Giấy nhớ mới: **[Ngưỡng giải trình 1.000.000]** — nguồn: Quy chế quỹ khối CLB, Minh Anh và Duy nhắc
> Khoản dưới một triệu thì chủ tịch Hội sinh viên duyệt thẳng được, không cần trưởng CLB chủ quỹ ký. Nhưng tổng các khoản do cùng một người duyệt vượt một triệu thì Phòng Kế hoạch yêu cầu người đó giải trình. Đây là ngưỡng để tìm nhóm cần hỏi tiếp, không phải mức cấm.
> (giấy nhớ kéo được vào màn tra: 1000000)
### 💻 Màn tra: Sổ chi nối với bảng quỹ (thẻ `c-chi-tham-tu`)
Đề bài trên màn hình: *Sổ chi ghi mã quỹ; bảng quỹ cho biết mã nào là quỹ của CLB nào. Khoản chi nào ghi vào quỹ CLB Thám Tử?*
Cách chơi: kéo giấy nhớ vào ô giá trị, bấm cột / phép ("bằng", "bắt đầu bằng") / VÀ–HOẶC, hàng "nối với bảng … theo cột …" rồi CHẠY. Chạy sai không bị phạt.
Bảng `khoan_chi` (11 dòng):
| ma_chi | ma_don | ma_quy | so_tien | nguoi_duyet | ngay_chi |
|---|---|---|---|---|---|
| KC-01 | DLK-01 | Q-RB | 120000 | Bách | 2024-09-20 |
| KC-02 | DLK-02 | Q-RB | 200000 | Bách | 2024-09-24 |
| KC-03 | DLK-03 | Q-TT | 800000 | Khánh | 2024-09-10 |
| KC-04 | DLK-04 | Q-RB | 60000 | Bách | 2024-10-01 |
| KC-05 | DLK-05 | Q-RB | 150000 | Bách | 2024-10-02 |
| KC-06 | DLK-06 | Q-TT | 900000 | Khánh | 2024-09-11 |
| KC-07 | DLK-07 | Q-RB | 40000 | Khánh | 2024-10-05 |
| KC-08 | DLK-08 | Q-TT | 700000 | Khánh | 2024-09-12 |
| KC-09 | VPP-01 | Q-TT | 150000 | Minh Anh | 2024-09-18 |
| KC-10 | VPP-02 | Q-TT | 120000 | Minh Anh | 2024-10-03 |
| KC-11 | VPP-03 | Q-TT | 180000 | Minh Anh | 2024-10-09 |
Bảng `quy` (2 dòng):
| ma_quy | clb | ten_quy |
|---|---|---|
| Q-TT | THAM_TU | Quỹ CLB Thám Tử Dữ Liệu |
| Q-RB | ROBOTICS | Quỹ CLB Robotics |
Giấy nhớ đang có quanh màn hình: [0] [THAM_TU] [1000000]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
SELECT ma_chi, ma_don, so_tien, nguoi_duyet, ngay_chi FROM khoan_chi JOIN quy ON khoan_chi.ma_quy = quy.ma_quy WHERE clb = 'THAM_TU';
```
Kết quả: 6 dòng
| ma_chi | ma_don | so_tien | nguoi_duyet | ngay_chi |
|---|---|---|---|---|
| KC-03 | DLK-03 | 800000 | Khánh | 2024-09-10 |
| KC-06 | DLK-06 | 900000 | Khánh | 2024-09-11 |
| KC-08 | DLK-08 | 700000 | Khánh | 2024-09-12 |
| KC-09 | VPP-01 | 150000 | Minh Anh | 2024-09-18 |
| KC-10 | VPP-02 | 120000 | Minh Anh | 2024-10-03 |
| KC-11 | VPP-03 | 180000 | Minh Anh | 2024-10-09 |
Lời nhân vật sau mỗi lần chạy:
- Khi lỗi không có cột: **Duy** (neutral): Máy báo không có cột đó. Tên CLB nằm ở bảng quỹ, nối rồi mới lọc được.
- Khi ra 0 dòng: **Hà Vy** (thinking): Không dòng nào. Mã CLB viết hoa, gạch dưới, đúng như giấy nhớ.
- Khi ra 11 dòng: **Tùng** (gai-dau): Cả sổ, có cả quỹ Robotics. Mình chỉ cần quỹ CLB mình.
- Khi đúng: **Minh Anh** (neutral): Sáu khoản. Ba khoản chị duyệt, ba khoản chị chưa từng thấy.
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Sáu khoản chi ghi vào quỹ CLB Thám Tử** — Kết quả nối sổ chi với bảng quỹ: sáu khoản ghi vào quỹ CLB Thám Tử. Ba khoản văn phòng phẩm nhỏ do Minh Anh duyệt; ba khoản lớn gắn với ba đơn linh kiện, người duyệt ghi là Khánh, xuất ngày 10, 11 và 12 tháng 9.

- **Bạn (người chơi)**: Sáu khoản ghi vào quỹ CLB Thám Tử. Ba khoản nhỏ chị Minh Anh duyệt. Ba khoản lớn người duyệt ghi là Khánh, xuất ngày 10, 11 và 12 tháng 9.
- **Minh Anh** (khoanh-tay): Ba khoản chị duyệt là văn phòng phẩm, chị nhớ. Ba khoản kia chị chưa từng thấy.
- **Nam** (neutral): Đơn sớm nhất trong ba đơn ấy tạo ngày 27 tháng 9. Tiền đi trước, đơn viết sau.
- **Hà Vy** (thinking): Gom theo người duyệt rồi đếm. Nhưng lần này đếm số dòng chưa đủ: ba khoản nhỏ với ba khoản lớn đếm ra bằng nhau. Phải cộng tiền.
> 🎯 NHIỆM VỤ: Mỗi người duyệt bao nhiêu khoản, tổng bao nhiêu tiền?
> 💭 Hà Vy nhắc: Gom theo người duyệt; ngoài đếm, tính thêm tổng của cột tiền.
### 💻 Màn tra: Khoản chi gom theo người duyệt (thẻ `c-chi-theo-nguoi-duyet`)
Đề bài trên màn hình: *Lấy phiếu sáu khoản làm nguồn. Gom theo người duyệt: đếm số khoản, tính tổng số tiền.*
Cách chơi: màn TỔNG HỢP — chọn nguồn (phiếu đã ghim `ev-chi-tham-tu`), lọc tùy chọn bằng giấy nhớ, chọn cột để NHÓM; máy đếm số dòng mỗi nhóm (COUNT), có thể tính tổng / trung bình và chỉ giữ nhóm vượt ngưỡng nếu bài cần.
Giấy nhớ đang có quanh màn hình: [0] [THAM_TU] [1000000]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
WITH chi_tham_tu AS (phiếu "Sáu khoản chi ghi vào quỹ CLB Thám Tử")
SELECT nguoi_duyet, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien FROM chi_tham_tu GROUP BY nguoi_duyet;
```
Kết quả: 2 dòng
| nguoi_duyet | so_dong | tong_so_tien |
|---|---|---|
| Khánh | 3 | 2400000 |
| Minh Anh | 3 | 450000 |
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Minh Anh 3 khoản, 450.000; Khánh 3 khoản, 2.400.000** — Kết quả gom theo người duyệt: Minh Anh ba khoản, tổng 450.000; Khánh ba khoản, tổng 2.400.000. Cùng số khoản, tiền gấp hơn năm lần.

- **Bạn (người chơi)**: Chị Minh Anh: ba khoản, tổng bốn trăm năm mươi nghìn. Khánh: ba khoản, tổng hai triệu tư.
- **Minh Anh** (khoanh-tay): Tờ quy chế cô Lan in đây: khoản dưới một triệu thì chủ tịch Hội duyệt thẳng, không cần trưởng CLB chủ quỹ ký. Chị là chủ quỹ mà không biết ba khoản này, là vì thế. Sao kê tổng thì Phòng Kế hoạch giữ, cuối kỳ mới gửi.
- **Duy** (neutral): Nhưng tổng các khoản do cùng một người duyệt mà vượt một triệu thì Phòng Kế hoạch đòi người đó giải trình. Ngưỡng ấy để tìm nhóm cần hỏi, không phải để kết tội. Để bảng tự lọc ra, đừng chỉ tay.
- **Hà Vy** (thinking): Và tính thêm trung bình mỗi khoản. Xem từng khoản to cỡ nào so với mức duyệt thẳng.
> 🎯 NHIỆM VỤ: Người duyệt nào có tổng chi vượt ngưỡng giải trình một triệu? Mỗi khoản trung bình bao nhiêu?
> 💭 Hà Vy nhắc: Gom như vừa rồi, tính thêm trung bình, rồi chỉ giữ nhóm có tổng lớn hơn một triệu.
### 💻 Màn tra: Chỉ giữ nhóm vượt ngưỡng giải trình (thẻ `c-chi-vuot-muc`)
Đề bài trên màn hình: *Gom theo người duyệt như vừa rồi, tính thêm trung bình mỗi khoản, nhưng chỉ giữ nhóm có tổng lớn hơn một triệu.*
Cách chơi: màn TỔNG HỢP — chọn nguồn (phiếu đã ghim `ev-chi-tham-tu`), lọc tùy chọn bằng giấy nhớ, chọn cột để NHÓM; máy đếm số dòng mỗi nhóm (COUNT), có thể tính tổng / trung bình và chỉ giữ nhóm vượt ngưỡng nếu bài cần.
Giấy nhớ đang có quanh màn hình: [0] [THAM_TU] [1000000]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
WITH chi_tham_tu AS (phiếu "Sáu khoản chi ghi vào quỹ CLB Thám Tử")
SELECT nguoi_duyet, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien, AVG(so_tien) AS tb_so_tien FROM chi_tham_tu GROUP BY nguoi_duyet HAVING SUM(so_tien) > 1000000;
```
Kết quả: 1 dòng
| nguoi_duyet | so_dong | tong_so_tien | tb_so_tien |
|---|---|---|---|
| Khánh | 3 | 2400000 | 800000 |
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Khánh: 3 khoản, tổng 2.400.000, trung bình 800.000** — Kết quả lọc nhóm: chỉ Khánh có tổng chi từ quỹ CLB Thám Tử vượt ngưỡng giải trình một triệu (2.400.000 cho ba khoản). Trung bình 800.000 một khoản; phiếu sáu khoản cho thấy từng khoản (800.000, 900.000, 700.000) đều dưới một triệu, mức chủ tịch Hội duyệt thẳng được. Ba khoản ấy là ba đơn linh kiện không có hàng.

- **Bạn (người chơi)**: Còn một dòng. Khánh: ba khoản, tổng hai triệu tư, trung bình tám trăm nghìn.
- **Hà Vy** (thinking): Trung bình tám trăm nghìn một khoản, dưới mức một triệu. Nhìn lại phiếu sáu khoản: tám trăm, chín trăm, bảy trăm. Từng khoản đều dưới mức duyệt thẳng, cộng lại thì vượt ngưỡng giải trình.
- **Tùng** (worried): Ba khoản nhỏ vừa đủ lọt… ghi vào quỹ CLB mình, cho ba đơn kho không có hàng.
- **Nam** (neutral): Anh Khánh. Trưởng CLB của tớ. Hôm ở xưởng anh ấy còn bảo mọi người hỏi tớ nhẹ thôi.
- **Hà Vy** (thinking): Bảng nói được tới đó: ai duyệt, bao nhiêu, chia thế nào. Vì sao thì bảng không nói. Chỉ có người mới nói được.
- **Minh Anh** (serious): Chị gửi thầy Quang. Việc còn lại là của thầy.
> 🗂️ Giấy nhớ mới: **[Sổ ký phòng máy tối 15/9]** — nguồn: Thầy Khải giữ sổ; Thầy Quang ký cho mở đúng một trang, Cô Hạnh gửi kèm bản xuất sổ quỹ
> Tối Chủ nhật muốn vào phòng máy phải ký sổ. Tối 15/9 có hai dòng: Thảo vào 20:10, ra 21:30; Khánh vào 22:40, ra 23:20. Nhật ký in ghi lá thư in lúc 23:10. Sổ nói ai ở trong phòng, không nói ai bấm in.
- **Duy** (neutral): Chị Minh Anh dặn tìm một nguồn không dính tới cái huy hiệu. Trang sổ ký phòng máy thầy Quang cho mở đây. Hồi tháng 9 Tùng đòi xem, thầy Khải không cho.
- **Tùng** (gai-dau): Hồi ấy tớ đòi mở để truy người viết thư. Thầy không cho là phải.
- **Bạn (người chơi)**: Tối Chủ nhật 15/9, hai dòng. Thảo: vào 20 giờ 10, ra 21 giờ 30. Khánh: vào 22 giờ 40, ra 23 giờ 20.
- **Hà Vy** (thinking): Nhật ký in ghi lá thư in lúc 23 giờ 10.
- **Tùng** (gai-dau): Tớ không cá. Tớ ghi.
- **Minh Anh** (serious): Sổ ký là giấy, nhật ký in là máy. Hai nguồn riêng. Mang cả hai lên.

###### 📍 Phòng họp rà soát — Phòng họp, nhịp một: "đúng thẩm quyền"

- **Người kể**: Thứ Hai tuần sau. Thầy Quang mời cả Hoài lên dự buổi họp. Hoài nhắn cho Duy đúng một dòng: "Nhờ bạn áo xanh hôm nhập học ra đón tớ được không? Tớ chỉ nhớ mỗi cái áo."
- **Hoài** (nervous): Tớ vẫn không nhớ mặt người đưa thư. Vào đấy tớ có phải chỉ ai không?
- **Tùng** (neutral): Không. Cậu nhớ gì thì nói chừng ấy. Hôm nay tớ xem biển rồi, không dẫn nhầm tòa nữa đâu.
- **Hà Vy** (neutral): Mặc áo ấy thì cậu ngồi cạnh Hoài, không ngồi với bọn tớ. Và không được chỉ cho bạn ấy nhìn cái gì.
- **Tùng** (gai-dau): Tớ biết. Bạn ấy thấy gì thì bạn ấy tự thưa.
- **Người kể**: Phòng họp. Thầy Quang chủ trì, cô Lan ngồi bên. Khánh ngồi một phía, mặt không đổi, balo dựng cạnh chân ghế. Nam ngồi cạnh nhóm CLB Thám Tử. Quân ngồi cuối bàn ghi biên bản. Tùng áo xanh ngồi hàng ghế cạnh cửa với Hoài và chú Cường.
- **Thầy Quang** (neutral): Thầy mời em Khánh tới vì sổ quỹ. CLB Thám Tử trình bày, em Khánh trả lời. Ai nói gì thì kèm căn cứ.
> 🎯 NHIỆM VỤ: Trình phiếu cho thấy Khánh phải giải trình
> ⚖️ ĐỐI CHẤT — Khánh nêu giả thuyết: "Ba khoản đó là chi cho đội robot trước giải quốc gia. Khoản dưới một triệu, chủ tịch Hội duyệt là đúng thẩm quyền. Các bạn có gì mà nói tôi sai?". Người chơi trình thẻ trong hồ sơ, hoặc nói "chưa đủ căn cứ".
>   - Trình ev-chi-vuot-muc [ĐỦ CĂN CỨ] → **Minh Anh** (neutral): Từng khoản thì đúng thẩm quyền ạ. Nhưng sổ chi ghi ba khoản ấy vào quỹ CLB Thám Tử, không phải quỹ Robotics. Cộng lại hai triệu tư, vượt ngưỡng phải giải trình, người duyệt là anh Khánh. Em là chủ quỹ mà chưa từng thấy. / **Thầy Quang** (neutral): Vượt ngưỡng thì phải giải trình. Em Khánh, giải trình đi.
>   - Trình ev-chi-theo-nguoi-duyet [HỖ TRỢ] → **Hà Vy** (neutral): Sổ quỹ CLB Thám Tử có hai người duyệt: chị Minh Anh ba khoản nhỏ, và anh ba khoản lớn. / **Khánh** (neutral): Khoản dưới một triệu thì chủ tịch Hội duyệt được. Thế thì sai chỗ nào?
>   - Trình ev-dat-ma-khong-co [HỖ TRỢ] → **Nam** (neutral): Ba đơn đó không có cái linh kiện nào trong kho. Em đếm hai lần. / **Khánh** (neutral): Chuyện hàng nói sau. Tôi đang hỏi về thẩm quyền.
>   - Trình ev-don-nam-may [GỢI Ý] → **Khánh** (neutral): Đơn đứng tên Nam thì hỏi Nam. Tôi đang hỏi về thẩm quyền duyệt chi.
>   - Chưa đủ căn cứ → **Minh Anh** (neutral): Thưa thầy, bọn em chỉ nói được tới đây: ba khoản chi gắn với ba đơn kho không có hàng, ghi vào quỹ CLB Thám Tử. Ai chi vào việc gì, bọn em không có căn cứ. / **Thầy Quang** (neutral): Biết dừng ở chỗ chứng cứ dừng. Phần còn lại thầy làm việc với Hội sinh viên.
>   - Thẻ khác → **Khánh** (neutral): Cái này thì liên quan gì tới quỹ? / **Minh Anh** (worried): Em xem lại hồ sơ ạ.
> ⤵ RẼ TỰ ĐỘNG: nếu có dc-khanh-du thì sang "Nhịp hai: "đơn do Nam lập, tôi chỉ duyệt"" (in ở dưới); nếu KHÔNG thì chạy tiếp các dòng ngay sau đây. Hai đường loại trừ nhau, người chơi chỉ thấy một.

*— Chỉ khi có dc-khanh-du (đường rẽ tự động ở trên) —*

###### 📍 Phòng họp rà soát — Nhịp hai: "đơn do Nam lập, tôi chỉ duyệt"

- **Khánh** (neutral): Em giải trình được ạ.
> 🎯 NHIỆM VỤ: Trình phiếu cho thấy ba đơn không phải do Nam lập
> ⚖️ ĐỐI CHẤT — Khánh nêu giả thuyết: "Giải trình thì đơn giản. Hàng đặt gia công bên ngoài, chưa về kho. Còn ba đơn ấy do Nam lập, tên Nam còn trên sổ. Tôi chỉ duyệt theo đề xuất của thành viên. Ghi nhầm mã quỹ là lỗi nhập liệu.". Người chơi trình thẻ trong hồ sơ, hoặc nói "chưa đủ căn cứ".
>   - Trình ev-don-nam-may [ĐỦ CĂN CỨ] → **Duy** (neutral): Ba đơn ấy tạo ban đêm từ máy trong phòng văn phòng xưởng. Phòng khóa, Nam không có chìa. Đơn ngày 07/10 tạo lúc 22 giờ 05. / **Hà Vy** (neutral): Tối đó cửa từ thư viện ghi Nam ở trong tới 23 giờ 05. Em ngồi cách Nam hai bàn. / **Thầy Quang** (neutral): Vậy ít nhất một đơn không thể do em Nam lập. Người lập ngồi ở máy văn phòng, sau cửa khóa.
>   - Trình ev-may-vp [ĐỦ CĂN CỨ] → **Duy** (neutral): Máy văn phòng xưởng tạo bốn đơn. Một đơn ban ngày đứng tên anh. Ba đơn ban đêm đứng tên Nam, mà phòng ấy khóa, Nam không có chìa. / **Hà Vy** (neutral): Đơn đêm 07/10 tạo lúc 22 giờ 05. Cửa từ thư viện ghi Nam ở trong tới 23 giờ 05. / **Thầy Quang** (neutral): Vậy ít nhất một đơn không thể do em Nam lập. Người lập ngồi ở máy văn phòng, sau cửa khóa.
>   - Trình ev-toi-07 [HỖ TRỢ] → **Hà Vy** (neutral): Tối 07/10 Nam ở thư viện từ 21 giờ 50 tới 23 giờ 05. / **Khánh** (neutral): Thư viện thì liên quan gì tới đơn đặt hàng? Đơn tạo lúc nào, ở đâu, các bạn có không?
>   - Trình ev-dat-ma-khong-co [HỖ TRỢ] → **Nam** (neutral): Gia công ngoài thì phải có biên nhận giao việc. Anh có không ạ? / **Khánh** (neutral): Sẽ bổ sung. Nhưng đơn vẫn là đơn của em.
>   - Chưa đủ căn cứ → **Minh Anh** (neutral): Thưa thầy, ai lập ba đơn ấy thì bọn em chưa có căn cứ để nói. Bọn em dừng ở chỗ ba khoản vượt ngưỡng. / **Thầy Quang** (neutral): Vậy dừng ở đó. Phần còn lại thầy làm việc với Hội sinh viên.
>   - Thẻ khác → **Khánh** (neutral): Cái này nói gì về người lập đơn? / **Minh Anh** (worried): Em xem lại hồ sơ ạ.
> ⤵ RẼ TỰ ĐỘNG: nếu có dc-khanh-don-du thì sang "Khánh nhận phần tiền; nhịp ba: lá thư" (in ở dưới); nếu KHÔNG thì chạy tiếp các dòng ngay sau đây. Hai đường loại trừ nhau, người chơi chỉ thấy một.

*— Chỉ khi có dc-khanh-don-du (đường rẽ tự động ở trên) —*

###### 📍 Phòng họp rà soát — Khánh nhận phần tiền; nhịp ba: lá thư

- **Thầy Quang** (neutral): Em Khánh. Em có chìa phòng ấy. Ba khoản em duyệt gắn với ba đơn lập sau cửa khóa, cho hàng mà kho không có. Em giải thích mối liên hệ này thế nào?
- **Khánh** (neutral): …Ba khoản đó không chi cho đội ạ. Đơn là em lập. Tiền em dùng vào việc riêng. Em sẽ trả lại.
- **Nam** (neutral): Anh lấy tên em.
- **Khánh** (neutral): Anh xin lỗi em, Nam.
- **Thầy Quang** (neutral): CLB Thám Tử còn đề nghị hỏi lại chuyện lá thư hồi tháng 9. Em Hoài, chú Cường, mời hai người lên gần đây.
- **Tùng** (neutral): Tớ không nói hộ được. Cậu thấy gì thì thưa với thầy.
- **Hoài** (nervous): Thưa thầy, cái huy hiệu sứt một răng trên balo kia. Đúng cái em thấy sáng hôm ấy. Mặt người thì em vẫn không dám chắc ạ.
- **Thầy Quang** (neutral): Thầy ghi đúng như em nói: một cái balo, chưa phải một người.
> 🎯 NHIỆM VỤ: Trình một nguồn nối lá thư với một người, không dính tới cái huy hiệu
> ⚖️ ĐỐI CHẤT — Khánh nêu giả thuyết: "Tiền thì tôi nhận. Nhưng lá thư với cái tin thì đừng gán cho tôi. Huy hiệu phát ba chục người, tài khoản in với tài khoản kênh cả ban chủ nhiệm dùng. Phiếu nào của các bạn có tên tôi?". Người chơi trình thẻ trong hồ sơ, hoặc nói "chưa đủ căn cứ".
>   - Trình clue-so-phong-may [ĐỦ CĂN CỨ] → **Hà Vy** (neutral): Nhật ký in ghi lá thư in lúc 23 giờ 10 tối Chủ nhật 15/9, ở phòng máy. Sổ ký vào phòng tối đó có hai dòng. Chị Thảo ra lúc 21 giờ 30. Anh vào 22 giờ 40, ra 23 giờ 20. / **Khánh** (neutral): Tôi vào in sơ đồ cho đội. / **Thầy Quang** (neutral): Có thể. Nhưng lúc lá thư được in, sổ ghi trong phòng có một mình em. Và sáng hôm sau có người thấy cái huy hiệu của em ở cổng ký túc xá. Hai nguồn riêng, cùng một hướng. Em Khánh?
>   - Trình clue-loi-chu-cuong [HỖ TRỢ] → **Hà Vy** (neutral): Sáng thứ Hai 16/9, người đưa phong bì ở cổng ký túc xá đeo balo có huy hiệu bánh răng sứt một răng. / **Chú Cường** (neutral): Đúng cái huy hiệu trên balo kia. Mặt thì chú không dám nói, hôm ấy trời mới sáng. / **Khánh** (neutral): Balo tôi hay để ở xưởng, ai cầm chả được. Một cái huy hiệu thôi à? / **Hà Vy** (thinking): Đúng, mới một nguồn. Cần một nguồn không dính gì tới cái huy hiệu.
>   - Trình clue-huy-hieu-sut [HỖ TRỢ] → **Nam** (neutral): Cái sứt là lỗi khuôn, chỉ có một cái, anh xin giữ. / **Khánh** (neutral): Và balo anh để ở xưởng cả ngày, em cũng biết thế.
>   - Trình ev-nhat-ky-in [HỖ TRỢ] → **Hà Vy** (neutral): Lá thư in từ tài khoản dùng chung của Robotics, 23 giờ 10 tối Chủ nhật. / **Khánh** (neutral): Dùng chung. Chính các bạn nói tài khoản chưa phải là người. / **Duy** (neutral): Tài khoản thì chung. Nhưng phòng máy tối Chủ nhật thì phải ký sổ mới vào được.
>   - Trình clue-giao-chia [GỢI Ý] → **Khánh** (neutral): Ba người có chìa. Thảo còn để chìa ngoài ngăn bàn. Mà lá thư đâu có in ở xưởng.
>   - Chưa đủ căn cứ → **Minh Anh** (neutral): Thưa thầy, phần lá thư bọn em không có căn cứ nào gắn với một người. Bọn em dừng ở phần tiền. / **Thầy Quang** (neutral): Dừng đúng chỗ. Phần ấy thầy sẽ hỏi riêng.
>   - Thẻ khác → **Khánh** (neutral): Cái này thì liên quan gì tới lá thư? / **Minh Anh** (worried): Em xem lại hồ sơ ạ.
> ⤵ RẼ TỰ ĐỘNG: nếu có dc-khanh-thu-du thì sang "Khánh nhận lá thư; nhịp bốn: lá thư liên quan gì tới ba khoản chi" (in ở dưới); nếu KHÔNG thì chạy tiếp các dòng ngay sau đây. Hai đường loại trừ nhau, người chơi chỉ thấy một.
- **Thầy Quang** (neutral): Phần tiền em Khánh đã nhận. Việc kỷ luật và trả lại quỹ, thầy làm với Hội sinh viên. Phần lá thư thì chưa có căn cứ gắn với một người, thầy sẽ hỏi riêng. Cảm ơn chú Cường và em Hoài đã tới.
- **Hoài** (downcast): Em xin lỗi, em không giúp được gì ạ.
- **Minh Anh** (neutral): Em tới là giúp rồi. Chưa đủ thì ghi là chưa đủ.
- **Thầy Quang** (neutral): Phòng của CLB Thám Tử giữ nguyên. Thầy nhận hồ sơ của các em vào đợt rà soát cuối kỳ.

*— Chỉ khi có dc-khanh-thu-du (đường rẽ tự động ở trên) —*

###### 📍 Phòng họp rà soát — Khánh nhận lá thư; nhịp bốn: lá thư liên quan gì tới ba khoản chi

- **Khánh** (neutral): …Em in. Sáng hôm sau em nhờ em ấy nộp hộ. Anh xin lỗi em, Hoài.
- **Hoài** (nervous): Vâng ạ.
> 🎯 NHIỆM VỤ: Trình thứ cho thấy lá thư liên quan gì tới ba khoản chi
> ⚖️ ĐỐI CHẤT — Thầy Quang nêu giả thuyết: "Thầy chưa hiểu một điều. Một lá thư đòi thu phòng thì liên quan gì tới ba khoản chi? Các em có gì cho thấy mối liên hệ ấy không?". Người chơi trình thẻ trong hồ sơ, hoặc nói "chưa đủ căn cứ".
>   - Trình ev-chi-tham-tu [ĐỦ CĂN CỨ] → **Bạn (người chơi)**: Tiền rời quỹ ngày 10, 11 và 12 tháng 9. Lá thư đòi thu phòng tới ngày 16. Đơn linh kiện đầu tiên mãi ngày 27 mới có, sau buổi họp bọn em giữ được phòng. / **Bạn (người chơi)**: Em chưa biết anh ấy nghĩ gì. Nhưng thư xuất hiện sau khi tiền đã đi, còn đơn xuất hiện sau khi thư không thành. / **Thầy Quang** (neutral): Tiền trước, thư sau, đơn sau cùng. Thầy thấy rồi.
>   - Trình clue-sao-ke-cuoi-ky [ĐỦ CĂN CỨ] → **Bạn (người chơi)**: Sao kê quỹ chỉ tự về các CLB vào cuối kỳ, cùng đợt rà soát phòng. Muốn xem sớm hơn thì giấy phải qua chủ tịch Hội. / **Bạn (người chơi)**: Tức là tới cuối kỳ mới có người đọc ba khoản ấy. Mà lá thư đòi thu phòng lại tới ngay tuần đầu. / **Thầy Quang** (neutral): Thư đi trước ngày có người đọc sổ. Thầy thấy rồi.
>   - Trình ev-chi-vuot-muc [HỖ TRỢ] → **Duy** (neutral): Phiếu này nói bao nhiêu và ai duyệt. Còn bao giờ, và bao giờ mới có người đọc, thì phiếu khác nói.
>   - Trình clue-loi-nhan-linh-1 [GỢI Ý] → **Thầy Quang** (neutral): Mẩu giấy này của ai? / **Duy** (neutral): Chuyện khác ạ. Em xin lỗi thầy.
>   - Chưa đủ căn cứ → **Minh Anh** (neutral): Thưa thầy, lá thư để làm gì thì bọn em không có căn cứ ạ. / **Thầy Quang** (neutral): Vậy phần ấy thầy hỏi riêng.
>   - Thẻ khác → **Thầy Quang** (neutral): Cái này nói gì về lá thư và ba khoản chi? / **Minh Anh** (worried): Em xem lại hồ sơ ạ.
> ⤵ RẼ TỰ ĐỘNG: nếu có dc-khanh-vi-sao-du thì sang "Người chơi tự nối: lá thư để làm gì" (in ở dưới); nếu KHÔNG thì chạy tiếp các dòng ngay sau đây. Hai đường loại trừ nhau, người chơi chỉ thấy một.
- **Thầy Quang** (neutral): Phần tiền và phần lá thư em Khánh đã nhận. Vì sao thì thầy hỏi riêng. Việc kỷ luật và trả lại quỹ, thầy làm với Hội sinh viên.
- **Thầy Quang** (neutral): Phòng của CLB Thám Tử giữ nguyên. Em Hoài, em Nam: tên hai em không dính gì tới việc này nữa.
- **Hoài** (relieved): Em cảm ơn thầy ạ.

*— Chỉ khi có dc-khanh-vi-sao-du (đường rẽ tự động ở trên) —*

###### 📍 Phòng họp rà soát — Người chơi tự nối: lá thư để làm gì

> ❓ Thầy Quang hỏi: "Vậy theo các em, lá thư đòi thu phòng là để làm gì?" (chọn sai thì nghe phản hồi rồi chọn lại)
>   - Để CLB mất phòng, hết kỳ thì phải giải thể, quỹ đóng sổ trước khi có ai đọc sao kê. ✅ → **Cô Lan** (neutral): Quy chế đúng là thế: CLB không còn phòng sinh hoạt hết một học kỳ thì làm thủ tục giải thể, quỹ đóng sổ, số dư chuyển về Hội sinh viên. / **Nam** (neutral): Em cứ tưởng anh muốn cái phòng. Anh muốn cái sổ.
>   - Để lấy căn phòng ấy cho CLB Robotics. → **Khánh** (neutral): Xưởng bọn tôi rộng gấp ba cái phòng ấy.
>   - Để trả đũa CLB Thám Tử. → **Hà Vy** (thinking): Tháng 9 mình đã tra gì ai đâu mà trả đũa.

###### 📍 Phòng họp rà soát — Không phải cái phòng, là cái sổ

- **Khánh** (neutral): Quỹ ấy nằm im từ hồi chị Linh nghỉ, không ai đọc sao kê. Đợt rà soát phòng chỉ nhận kiến nghị tới 20 tháng 9, nên em gửi thư ngay. Em không chờ xem mình có lấp kịp không. Em chọn đường dễ trước.
- **Khánh** (neutral): Em là người đứng tên duyệt chi. Tự em đề nghị rà soát CLB ấy thì chính em phải giải thích sổ quỹ trước. Thư sinh viên thì chỉ là một ý kiến.
- **Nam** (neutral): Rồi CLB Thám Tử giữ được phòng. Cái tin trong kênh, ba cái đơn, cái danh sách chuyển xuống Quân…
- **Khánh** (neutral): Cái tin là để tới cuối kỳ, các em có hỏi tới sổ thì lời các em khó được tin. Đơn là để khớp sổ. Danh sách là để kết quả kiểm kê của em bị nghi trước khi nộp. Anh không tính xa thế đâu. Anh chỉ tìm cách qua lần hỏi kế tiếp.
- **Quân** (stunned): Em lại cầm một danh sách đi nghi người khác. Lần thứ hai.
- **Thầy Quang** (stern): Em Khánh nhận rồi. Việc kỷ luật và trả lại quỹ, thầy làm với Hội sinh viên, không bàn ở đây. Việc riêng của em ấy, thầy không hỏi trước mọi người.
- **Thầy Quang** (neutral): Phòng của CLB Thám Tử giữ nguyên. Hoàn quỹ đi theo thủ tục, mất vài tháng; từ giờ tới đó quỹ CLB tạm đóng. Biên bản cũng ghi một dòng: chủ quỹ chưa từng xin sao kê giữa kỳ.
- **Minh Anh** (serious): Em nhận ạ.
- **Thầy Quang** (neutral): Em Hoài, em Nam: tên hai em không dính gì tới việc này nữa.
- **Hoài** (relieved): Em cảm ơn thầy ạ.

###### 📍 Phòng họp rà soát — Biên bản buổi họp: nói chắc được gì

> ❓ Thầy Quang hỏi: "Biên bản buổi họp. Phần của CLB Thám Tử, các em muốn thầy ghi câu nào?" (chọn sai thì nghe phản hồi rồi chọn lại)
>   - Ba khoản chi gắn với ba đơn kho không có hàng được ghi vào quỹ CLB Thám Tử, do chủ tịch Hội sinh viên duyệt. Mỗi bước đều có phiếu để ai cũng tự kiểm được. ✅ → **Thầy Quang** (neutral): Thầy ghi đúng chừng ấy. Phần "vì sao" là lời người nhận, không phải lời của bảng.
>   - Cả Hội sinh viên và CLB Robotics cùng bao che cho Khánh. → **Hà Vy** (thinking): Bảng ghi một người duyệt. "Cả Hội" thì cột nào nói?
>   - Khánh viết lá thư ngay từ đầu để chiếm phòng CLB. → **Duy** (neutral): Lá thư để làm gì thì chỉ người viết nói được. "Chiếm phòng" là mình đoán thêm.
> ⤵ RẼ TỰ ĐỘNG: nếu có dc-khanh-don-du thì sang "Hành lang sau buổi họp: chiếc chìa" (in ở dưới); nếu KHÔNG thì chạy tiếp các dòng ngay sau đây. Hai đường loại trừ nhau, người chơi chỉ thấy một.

*— Chỉ khi có dc-khanh-don-du (đường rẽ tự động ở trên) —*

###### 📍 Phòng họp rà soát — Hành lang sau buổi họp: chiếc chìa

- **Người kể**: Hành lang ngoài phòng họp. Khánh dừng trước Nam, lấy trong túi ra một chiếc chìa.
- **Khánh** (neutral): Chìa phòng văn phòng. Robotics anh xin thôi. Anh sẽ đề nghị CLB bầu em.
- **Nam** (neutral): Em không nhận vì anh đưa. CLB bầu thì em nhận. Và sổ của xưởng từ giờ dán ngoài cửa, ai cũng xem được, kể cả anh.
- **Nam** (neutral): Có những việc anh giúp đội thật. Tuần lệ phí anh xin thêm cũng là thật. Nhưng chuyện anh lấy tên em thì em vẫn phải ghi đúng vào biên bản.
- **Khánh** (neutral): Ừ. Em giữ sổ tốt hơn anh.
- **Nam** (neutral): Lệ phí giải hạn thứ Sáu tuần sau. Kinh phí năm nay toàn anh ấy chạy. Giờ tớ phải tự đi xin lại từ đầu.
- **Thảo** (neutral): Chìa của chị treo lên móc cạnh cửa rồi. Ai lấy cũng phải ký tên. Tiền giải thì chị với Bách đi xin cùng em.
- **Minh Anh** (serious): Chị cũng có phần. Làm chủ quỹ mà chưa từng xin sao kê giữa kỳ. Từ tháng này chị xin hằng tháng, dán cạnh bảng nguyên tắc.
- **Chú Cường** (smile): Chú về trực đây. Lần sau chú cố nhìn mặt cho kỹ.
- **Hoài** (neutral): Tùng ơi, cái áo xanh ấy… CLB các cậu còn nhận người không? Tớ muốn biết lần sau nên hỏi gì trước khi cầm phong bì của người lạ.
- **Tùng** (happy): Đơn ở chỗ Duy. Chiều thứ Tư, phòng CLB. Lần này tớ dẫn đúng tòa.

###### 📍 Phòng CLB — Phòng CLB: đóng hồ sơ mùa

- **Minh Anh** (neutral): Hồ sơ cuối kỳ xong. Mục nào cũng có phiếu, ai mở ra cũng tự kiểm được.
- **Hà Vy** (smile): Từ một chữ H tới một sổ quỹ. Mỗi bước là một phiếu.
- **Nam** (neutral): Cảm biến của xưởng ghi mỗi giây một dòng. Kéo giấy nhớ thì không kịp. Tớ muốn tự viết chương trình đọc nó.
- **Tùng** (gai-dau): Thế là sang chuyện khác rồi.
- **Duy** (neutral): Nam bảo để lại đây. Và chị Linh để lại nhiều mẩu giấy hơn mình tưởng.
*[Thẻ chữ]* Dữ liệu chỉ ra ai cần hỏi. Người trả lời mới là người nói "vì sao". Mùa 1 khép lại ở chỗ chứng cứ dừng.
> ⤵ RẼ TỰ ĐỘNG: nếu (có clue-loi-nhan-linh-1 và có clue-loi-nhan-linh-2 và có clue-loi-nhan-linh-3 và có clue-loi-nhan-linh-4) thì sang "Cảnh sau kết (chỉ khi đủ bốn mẩu giấy): ngăn tủ khóa trong phòng CLB" (in ở dưới); nếu KHÔNG thì chạy tiếp các dòng ngay sau đây. Hai đường loại trừ nhau, người chơi chỉ thấy một.
> 🏁 KẾT THÚC vụ → màn kết.

*— Chỉ khi (có clue-loi-nhan-linh-1 và có clue-loi-nhan-linh-2 và có clue-loi-nhan-linh-3 và có clue-loi-nhan-linh-4) (đường rẽ tự động ở trên) —*

###### 📍 Phòng CLB — Cảnh sau kết (chỉ khi đủ bốn mẩu giấy): ngăn tủ khóa trong phòng CLB

*[Thẻ chữ]* Sau kết — tối hôm ấy, phòng CLB
- **Người kể**: Hồ sơ đã nộp. Mọi người sắp về thì Duy bày bốn mẩu giấy của chị Linh lên bàn.
- **Duy** (neutral): Bốn mẩu giấy. Mẩu nào cũng nhắc "cuốn sổ cũ" với "vụ đầu tiên". Mà ngăn dưới tủ hồ sơ thì khóa, tớ chưa bao giờ có chìa.
- **Tùng** (surprised): Thì cạy ra!
- **Hà Vy** (thinking): Khoan. Mẩu đầu: "Căn phòng này giữ nhiều hơn em nghĩ." Chị ấy không nói "tủ". Mẩu thứ hai kẹp ở trang "Kiểm hai lần". Chị ấy toàn giấu ở chỗ mình nhìn mỗi ngày.
- **Duy** (neutral): …Chìa ngăn dưới.
> 🗂️ Giấy nhớ mới: **[Lời nhắn chị Linh, mẩu cuối]** — nguồn: Ngăn dưới tủ hồ sơ phòng CLB
> Chữ chị Linh, dưới nét chữ ngả màu của thầy Quang: "Manh mối cũ, câu hỏi mới."
> 🗂️ Tài liệu mới: **Hồ sơ vụ thứ nhất của CLB** — nguồn: Ngăn dưới tủ hồ sơ phòng CLB, chìa dán sau bảng nguyên tắc
> "Hồ sơ vụ thứ nhất — CLB Thám Tử Dữ Liệu", chữ viết tay, ký tên Trịnh Quang.
> Chị Linh chép lại cuốn này vào sổ tự học. Ở trang kết luận, một cái tên bị gạch bằng mực tím của chị Linh; bên lề có hai chữ mực xanh đã ngả màu của thầy Quang: "Xem lại."
- **Người kể**: Trong ngăn tủ: một cuốn sổ bìa cứng, chữ viết tay đã ngả màu. Trang đầu ghi "Hồ sơ vụ thứ nhất — CLB Thám Tử Dữ Liệu", ký tên Trịnh Quang.
- **Tùng** (surprised): Thầy Quang? Thầy Quang lập CLB này á?
- **Hà Vy** (thinking): Và vụ đầu tiên của CLB kết luận sai. Chị Linh tìm ra, chép lại, rồi để lại giấy cho mình.
- **Bạn (người chơi)**: Trang kết luận có một cái tên bị gạch đi bằng mực tím, còn mới. Bên lề, mực xanh đã ngả màu, chữ thầy Quang: "Xem lại."
- **Duy** (neutral): Mực tím là bút chị Linh. Còn hai chữ kia thì thầy viết từ bao giờ, không ghi ngày.
- **Bạn (người chơi)**: Trang cuối có thêm một dòng mới, chữ chị Linh: "Manh mối cũ, câu hỏi mới."
- **Minh Anh** (neutral): Mùa sau. Giờ thì cất đi, và đừng cá.
- **Tùng** (gai-dau): Tớ có cá đâu.
> 🏁 KẾT THÚC vụ → màn kết.

*(tiếp theo như chuỗi "Phòng CLB: đóng hồ sơ mùa" đã in ở trên)*

*(tiếp theo như chuỗi "Biên bản buổi họp: nói chắc được gì" đã in ở trên)*

*(tiếp theo như chuỗi "Biên bản buổi họp: nói chắc được gì" đã in ở trên)*

###### 📍 Phòng họp rà soát — Chưa đủ căn cứ: chưa ngã ngũ

- **Thầy Quang** (neutral): Các em dừng đúng chỗ. Chuyện ba khoản chi, thầy chuyển Phòng Kế hoạch yêu cầu Hội sinh viên giải trình. Có kết luận thầy sẽ thông báo.
- **Khánh** (neutral): Em sẽ giải trình với Phòng Kế hoạch. Không phải ở đây.
- **Người kể**: Một tuần sau, chưa có kết luận. Khánh vẫn là chủ tịch Hội sinh viên. Phòng CLB thì thầy Quang nói: chờ.
- **Nam** (neutral): Tớ không biết cậu ấy sẽ nói gì với Phòng Kế hoạch. Nhưng tớ biết các cậu đã dừng ở đúng chỗ. Sổ sách của xưởng, từ giờ tớ giữ cho rõ.
- **Minh Anh** (serious): Chưa ngã ngũ thì hồ sơ ghi "chưa ngã ngũ". Mình không viết thêm.

*(tiếp theo như chuỗi "Biên bản buổi họp: nói chắc được gì" đã in ở trên)*

*(tiếp theo như chuỗi "Chưa đủ căn cứ: chưa ngã ngũ" đã in ở trên)*

*(tiếp theo như chuỗi "Phòng Đào tạo: "Căn cứ vào đâu?"" đã in ở trên)*

## 🏁 Màn kết
**Mỗi bước là một phiếu** — Ba khoản chi không có hàng được ghi vào quỹ CLB Thám Tử, do chủ tịch Hội sinh viên duyệt. Người nhận là người nói "vì sao". Mùa 1 khép lại ở chỗ chứng cứ dừng.