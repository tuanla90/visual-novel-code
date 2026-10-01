# Vụ: Sổ quỹ

Quy ước: dòng "- **Tên** (biểu cảm): …" là lời thoại hiện từng câu; "🗂️" là thẻ vào hồ sơ (cũng ghim lên bảng điều tra); "💻" là màn tra dữ liệu trên laptop; "❓" là câu hỏi nhiều lựa chọn; "🔀" là rẽ nhánh do người chơi chọn; "⤵" là rẽ tự động theo cờ (hai đường loại trừ nhau — bản này in CẢ HAI để bạn đọc, người chơi chỉ đi một). Mỗi chuỗi chỉ in một lần; gặp "*(tiếp theo như chuỗi … đã in ở trên)*" thì quay lên đọc.

## 📍 Xưởng CLB Robotics — Nam đếm kho: ba linh kiện không có một cái

*[Thẻ chữ]* Vụ 5 — Thứ Sáu, 18 tháng 10
- **Người kể**: Xưởng Robotics, cuối tuần. Nam đứng giữa các kệ linh kiện, tay cầm bảng kiểm kê, mặt khó coi.
- **Nam** (neutral): Tớ đếm kho. Đếm tay từng loại, hai lần.
- **Tùng** (worried): Rồi sao?
- **Nam** (neutral): Ba đơn mang tên tớ: động cơ servo, mạch điều khiển, khung nhôm. Trong kho không có lấy một cái. Đã duyệt chi, hai triệu tư, mà hàng chưa từng về.
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
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Ba đơn đặt mua thứ không có trong kho** — Kết quả nối sổ đặt hàng với kiểm kê: động cơ servo, mạch điều khiển, khung nhôm — ba đơn đứng tên Nam từ máy văn phòng xưởng, tổng 2.400.000 đồng, đã duyệt chi mà kho không có một cái.

- **Bạn (người chơi)**: Ba đơn. Đúng ba đơn đứng tên Nam từ máy văn phòng xưởng.
- **Nam** (neutral): Linh kiện chỉ là cái cớ để ghi vào sổ. Tiền đi đâu đó rồi.
- **Minh Anh** (serious): Tiền thì nằm trong sổ quỹ. Sổ quỹ khối CLB không phải của mình, chị không tự mở được. Phải xin thầy Quang.
- **Tùng** (gai-dau): Thầy Quang thì lại "căn cứ vào đâu".
- **Hà Vy** (neutral): Thì mang căn cứ đi.

### 📍 Phòng Đào tạo — Phòng Đào tạo: "Căn cứ vào đâu?"

- **Người kể**: Phòng Đào tạo. Thầy Quang nghe Minh Anh trình bày, không ngắt lời, rồi hỏi đúng một câu.
> ⚖️ ĐỐI CHẤT — Thầy Quang nêu giả thuyết: "Các em muốn thầy cho xuất sổ quỹ của khối CLB, một sổ không thuộc CLB các em. Căn cứ vào đâu?". Người chơi trình thẻ trong hồ sơ, hoặc nói "chưa đủ căn cứ".
>   - Trình ev-dat-ma-khong-co [ĐỦ CĂN CỨ] → **Minh Anh** (neutral): Thưa thầy, ba đơn linh kiện đã duyệt chi, tổng hai triệu tư, nhưng kiểm kê xưởng không có một cái nào. Tiền đã chi mà hàng không về, nên bọn em cần xem khoản chi ấy trả từ quỹ nào, ai duyệt. / **Thầy Quang** (neutral): Chi mà không có hàng. Căn cứ ấy đủ để mở sổ quỹ. Thầy cho xuất, các em chỉ được xem các khoản liên quan ba đơn này và quỹ CLB Thám Tử.
>   - Trình ev-don-nam-may [HỖ TRỢ] → **Hà Vy** (neutral): Ba đơn ấy tạo ban đêm từ máy văn phòng xưởng, đứng tên Nam mà Nam không đặt ạ. / **Thầy Quang** (neutral): Đơn mượn tên là chuyện của xưởng Robotics. Chuyện tiền thì thầy cần căn cứ về tiền.
>   - Trình ev-toi-07 [GỢI Ý] → **Thầy Quang** (neutral): Em Nam ở thư viện tối đó. Thầy ghi nhận, nhưng điều ấy liên quan gì tới sổ quỹ?
>   - Chưa đủ căn cứ → **Thầy Quang** (stern): Chưa đủ căn cứ thì thầy chưa mở sổ của người khác cho các em xem. Về làm rõ đã. / **Minh Anh** (worried): Dạ. Bọn em về đếm lại kho ạ.
>   - Thẻ khác → **Thầy Quang** (neutral): Cái này nói gì về tiền? / **Minh Anh** (worried): Em xem lại hồ sơ ạ.
> ⤵ RẼ TỰ ĐỘNG: nếu có dc-xin-so-quy-du thì sang "Sổ quỹ khối CLB: khoản nào ghi vào quỹ CLB Thám Tử" (in ở dưới); nếu KHÔNG thì chạy tiếp các dòng ngay sau đây. Hai đường loại trừ nhau, người chơi chỉ thấy một.
- **Người kể**: Cả nhóm ra khỏi phòng Đào tạo, chưa có sổ quỹ. Minh Anh dừng ở hành lang.
- **Minh Anh** (serious): Thầy nói đúng. Mình phải mang căn cứ về tiền và hàng, không phải về người. Xem lại hồ sơ rồi vào lại.

*— Chỉ khi có dc-xin-so-quy-du (đường rẽ tự động ở trên) —*

#### 📍 Phòng CLB — Sổ quỹ khối CLB: khoản nào ghi vào quỹ CLB Thám Tử

- **Người kể**: Chiều, phòng CLB. Phòng Kế hoạch gửi bản xuất sổ quỹ khối CLB, chỉ gồm các khoản chi ghi vào quỹ CLB Thám Tử và các khoản liên quan ba đơn.
- **Duy** (neutral): Mỗi khoản chi có mã quỹ. Bảng quỹ cho biết mã nào là quỹ của CLB nào. Lại hai bảng.
> 🎯 NHIỆM VỤ: Khoản chi nào ghi vào quỹ CLB Thám Tử?
> 💭 Hà Vy nhắc: Nối sổ chi với bảng quỹ theo mã quỹ, rồi lọc quỹ của CLB mình.
> 🗂️ Tài liệu mới: **Bản xuất sổ quỹ khối CLB** — nguồn: Phòng Kế hoạch, qua Thầy Quang
> Sổ chi: mỗi khoản có mã chi, mã đơn, mã quỹ, số tiền, người duyệt. Bảng quỹ: mã quỹ nào thuộc CLB nào.
> Chỉ gồm các khoản ghi vào quỹ CLB Thám Tử và các khoản liên quan ba đơn đang xét.
> 🗂️ Giấy nhớ mới: **[Quỹ CLB Thám Tử]** — nguồn: Bảng quỹ
> Bảng quỹ ghi CLB chủ quỹ ở cột clb: THAM_TU là CLB Thám Tử, ROBOTICS là CLB Robotics.
> (giấy nhớ kéo được vào màn tra: THAM_TU)
> 🗂️ Giấy nhớ mới: **[Hạn mức 1.000.000]** — nguồn: Quy chế quỹ CLB, Duy nhắc
> Mỗi lần chi từ quỹ một CLB không quá một triệu đồng. Vượt thì phải có giải trình.
> (giấy nhớ kéo được vào màn tra: 1000000)
### 💻 Màn tra: Sổ chi nối với bảng quỹ (thẻ `c-chi-tham-tu`)
Đề bài trên màn hình: *Sổ chi ghi mã quỹ; bảng quỹ cho biết mã nào là quỹ của CLB nào. Khoản chi nào ghi vào quỹ CLB Thám Tử?*
Cách chơi: kéo giấy nhớ vào ô giá trị, bấm cột / phép ("bằng", "bắt đầu bằng") / VÀ–HOẶC, hàng "nối với bảng … theo cột …" rồi CHẠY. Chạy sai không bị phạt.
Bảng `khoan_chi` (11 dòng):
| ma_chi | ma_don | ma_quy | so_tien | nguoi_duyet |
|---|---|---|---|---|
| KC-01 | DLK-01 | Q-RB | 120000 | Bách |
| KC-02 | DLK-02 | Q-RB | 200000 | Bách |
| KC-03 | DLK-03 | Q-TT | 800000 | Khánh |
| KC-04 | DLK-04 | Q-RB | 60000 | Bách |
| KC-05 | DLK-05 | Q-RB | 150000 | Bách |
| KC-06 | DLK-06 | Q-TT | 900000 | Khánh |
| KC-07 | DLK-07 | Q-RB | 40000 | Khánh |
| KC-08 | DLK-08 | Q-TT | 700000 | Khánh |
| KC-09 | VPP-01 | Q-TT | 150000 | Minh Anh |
| KC-10 | VPP-02 | Q-TT | 120000 | Minh Anh |
| KC-11 | VPP-03 | Q-TT | 180000 | Minh Anh |
Bảng `quy` (2 dòng):
| ma_quy | clb | ten_quy |
|---|---|---|
| Q-TT | THAM_TU | Quỹ CLB Thám Tử Dữ Liệu |
| Q-RB | ROBOTICS | Quỹ CLB Robotics |
Giấy nhớ đang có quanh màn hình: [0] [THAM_TU] [1000000]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
SELECT ma_chi, ma_don, so_tien, nguoi_duyet FROM khoan_chi JOIN quy ON khoan_chi.ma_quy = quy.ma_quy WHERE clb = 'THAM_TU';
```
Kết quả: 6 dòng
| ma_chi | ma_don | so_tien | nguoi_duyet |
|---|---|---|---|
| KC-03 | DLK-03 | 800000 | Khánh |
| KC-06 | DLK-06 | 900000 | Khánh |
| KC-08 | DLK-08 | 700000 | Khánh |
| KC-09 | VPP-01 | 150000 | Minh Anh |
| KC-10 | VPP-02 | 120000 | Minh Anh |
| KC-11 | VPP-03 | 180000 | Minh Anh |
Lời nhân vật sau mỗi lần chạy:
- Khi lỗi không có cột: **Duy** (neutral): Máy báo không có cột đó. Tên CLB nằm ở bảng quỹ, nối rồi mới lọc được.
- Khi ra 0 dòng: **Hà Vy** (thinking): Không dòng nào. Mã CLB viết hoa, gạch dưới, đúng như giấy nhớ.
- Khi ra 11 dòng: **Tùng** (gai-dau): Cả sổ, có cả quỹ Robotics. Mình chỉ cần quỹ CLB mình.
- Khi đúng: **Minh Anh** (neutral): Sáu khoản. Ba khoản chị duyệt, ba khoản chị chưa từng thấy.
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Sáu khoản chi ghi vào quỹ CLB Thám Tử** — Kết quả nối sổ chi với bảng quỹ: sáu khoản ghi vào quỹ CLB Thám Tử. Ba khoản văn phòng phẩm nhỏ do Minh Anh duyệt; ba khoản lớn gắn với ba đơn linh kiện, người duyệt ghi là Khánh.

- **Bạn (người chơi)**: Sáu khoản ghi vào quỹ CLB Thám Tử. Ba khoản nhỏ chị Minh Anh duyệt. Ba khoản lớn người duyệt ghi là Khánh.
- **Minh Anh** (khoanh-tay): Ba khoản chị duyệt là văn phòng phẩm, chị nhớ. Ba khoản kia chị chưa từng thấy.
- **Hà Vy** (thinking): Gom theo người duyệt rồi đếm. Nhưng lần này đếm số dòng chưa đủ: phải tính cả tiền, tổng và trung bình mỗi khoản.
> 🎯 NHIỆM VỤ: Mỗi người duyệt bao nhiêu khoản, tổng bao nhiêu tiền, trung bình một khoản bao nhiêu?
> 💭 Hà Vy nhắc: Gom theo người duyệt; ngoài đếm, tính thêm tổng và trung bình của cột tiền.
### 💻 Màn tra: Khoản chi gom theo người duyệt (thẻ `c-chi-theo-nguoi-duyet`)
Đề bài trên màn hình: *Lấy phiếu sáu khoản làm nguồn. Gom theo người duyệt: đếm số khoản, tính tổng và trung bình số tiền.*
Cách chơi: màn TỔNG HỢP — chọn nguồn (phiếu đã ghim `ev-chi-tham-tu`), lọc tùy chọn bằng giấy nhớ, chọn cột để NHÓM; máy đếm số dòng mỗi nhóm (COUNT), có thể tính tổng / trung bình và chỉ giữ nhóm vượt ngưỡng nếu bài cần.
Giấy nhớ đang có quanh màn hình: [0] [THAM_TU] [1000000]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
WITH chi_tham_tu AS (phiếu "Sáu khoản chi ghi vào quỹ CLB Thám Tử")
SELECT nguoi_duyet, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien, AVG(so_tien) AS tb_so_tien FROM chi_tham_tu GROUP BY nguoi_duyet;
```
Kết quả: 2 dòng
| nguoi_duyet | so_dong | tong_so_tien | tb_so_tien |
|---|---|---|---|
| Khánh | 3 | 2400000 | 800000 |
| Minh Anh | 3 | 450000 | 150000 |
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Minh Anh 3 khoản, 450.000; Khánh 3 khoản, 2.400.000** — Kết quả gom theo người duyệt: Minh Anh ba khoản, tổng 450.000, trung bình 150.000; Khánh ba khoản, tổng 2.400.000, trung bình 800.000 một khoản.

- **Bạn (người chơi)**: Chị Minh Anh: ba khoản, tổng bốn trăm năm mươi nghìn, trung bình một trăm năm mươi. Khánh: ba khoản, tổng hai triệu tư, trung bình tám trăm nghìn.
- **Duy** (neutral): Hạn mức mỗi lần chi của quỹ CLB là một triệu. Nhưng nói "vượt" thì phải để bảng tự lọc ra, đừng chỉ tay.
> 🎯 NHIỆM VỤ: Người duyệt nào có tổng chi vượt một triệu?
> 💭 Hà Vy nhắc: Gom như vừa rồi, nhưng chỉ giữ nhóm có tổng lớn hơn một triệu.
### 💻 Màn tra: Chỉ giữ nhóm vượt hạn mức (thẻ `c-chi-vuot-muc`)
Đề bài trên màn hình: *Gom theo người duyệt như vừa rồi, tính tổng, nhưng chỉ giữ nhóm có tổng lớn hơn một triệu.*
Cách chơi: màn TỔNG HỢP — chọn nguồn (phiếu đã ghim `ev-chi-tham-tu`), lọc tùy chọn bằng giấy nhớ, chọn cột để NHÓM; máy đếm số dòng mỗi nhóm (COUNT), có thể tính tổng / trung bình và chỉ giữ nhóm vượt ngưỡng nếu bài cần.
Giấy nhớ đang có quanh màn hình: [0] [THAM_TU] [1000000]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
WITH chi_tham_tu AS (phiếu "Sáu khoản chi ghi vào quỹ CLB Thám Tử")
SELECT nguoi_duyet, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien FROM chi_tham_tu GROUP BY nguoi_duyet HAVING SUM(so_tien) > 1000000;
```
Kết quả: 1 dòng
| nguoi_duyet | so_dong | tong_so_tien |
|---|---|---|
| Khánh | 3 | 2400000 |
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Khánh: 3 khoản, tổng 2.400.000, vượt hạn mức** — Kết quả lọc nhóm: chỉ Khánh có tổng chi từ quỹ CLB Thám Tử vượt một triệu (2.400.000 cho ba khoản). Ba khoản ấy là ba đơn linh kiện không có hàng.

- **Bạn (người chơi)**: Còn một dòng. Khánh.
- **Nam** (neutral): Khánh. Trưởng CLB của tớ. Chủ tịch Hội sinh viên.
- **Tùng** (worried): Chủ tịch Hội duyệt chi quỹ CLB khác… cho hàng không về.
- **Hà Vy** (thinking): Bảng nói được tới đó. Vì sao thì bảng không nói. Chỉ có người mới nói được.
- **Minh Anh** (serious): Chị gửi thầy Quang. Việc còn lại là của thầy.

##### 📍 Phòng họp rà soát — Phòng họp: Khánh trước thầy Quang

- **Người kể**: Thứ Hai tuần sau, phòng họp. Thầy Quang chủ trì. Khánh ngồi một bên, mặt không đổi. Nam ngồi cạnh nhóm CLB Thám Tử.
- **Thầy Quang** (neutral): Thầy mời em Khánh tới vì sổ quỹ. CLB Thám Tử trình bày trước. Em Khánh nghe, rồi trả lời.
> ⚖️ ĐỐI CHẤT — Khánh nêu giả thuyết: "Ba khoản đó là chi cho đội robot trước giải quốc gia. Quỹ khối CLB thì tôi là chủ tịch Hội, tôi duyệt là đúng thẩm quyền. Các bạn có gì mà nói tôi sai?". Người chơi trình thẻ trong hồ sơ, hoặc nói "chưa đủ căn cứ".
>   - Trình ev-chi-vuot-muc [ĐỦ CĂN CỨ] → **Minh Anh** (neutral): Ba khoản ấy không ghi vào quỹ Robotics. Chúng ghi vào quỹ CLB Thám Tử, tổng hai triệu tư, trung bình tám trăm nghìn một khoản, gấp năm lần mọi khoản khác của quỹ này. Và ba đơn linh kiện ấy chưa có cái nào về xưởng. / **Thầy Quang** (neutral): Chi quỹ của CLB khác, cho hàng không về. Em Khánh, thầy cần em nói. / **Khánh** (neutral): …Em nhận. Tiền ấy em dùng vào việc riêng, không phải cho đội. Lá thư, cái tin, mấy cái đơn, là để không ai mở sổ quỹ ấy ra nữa. Em xin lỗi Nam. Em xin lỗi CLB Thám Tử.
>   - Trình ev-chi-theo-nguoi-duyet [HỖ TRỢ] → **Hà Vy** (neutral): Sổ quỹ CLB Thám Tử có hai người duyệt: chị Minh Anh ba khoản nhỏ, và anh ba khoản lớn. / **Khánh** (neutral): Chủ tịch Hội duyệt được mọi quỹ. Thế thì sai chỗ nào?
>   - Trình ev-dat-ma-khong-co [HỖ TRỢ] → **Nam** (neutral): Ba đơn đó không có cái linh kiện nào trong kho. Tớ đếm hai lần. / **Khánh** (neutral): Hàng về chậm thì đổ cho tôi à?
>   - Trình ev-don-nam-may [GỢI Ý] → **Khánh** (neutral): Đơn đứng tên Nam thì hỏi Nam. / **Duy** (neutral): Đơn tạo từ máy trong phòng khóa, mà Nam không có chìa.
>   - Chưa đủ căn cứ → **Minh Anh** (neutral): Thưa thầy, bọn em chỉ nói được tới đây: ba khoản chi không có hàng, ghi vào quỹ CLB Thám Tử. Ai chi vào việc gì, bọn em không có căn cứ. / **Thầy Quang** (neutral): Biết dừng ở chỗ chứng cứ dừng. Phần còn lại thầy làm việc với Hội sinh viên.
>   - Thẻ khác → **Khánh** (neutral): Cái này thì liên quan gì tới quỹ? / **Minh Anh** (worried): Em xem lại hồ sơ ạ.
> ⤵ RẼ TỰ ĐỘNG: nếu có dc-khanh-du thì sang "Khánh nhận; Nam nhận CLB Robotics" (in ở dưới); nếu KHÔNG thì chạy tiếp các dòng ngay sau đây. Hai đường loại trừ nhau, người chơi chỉ thấy một.
- **Thầy Quang** (neutral): Các em dừng đúng chỗ. Chuyện ba khoản chi, thầy làm việc riêng với Hội sinh viên và Phòng Kế hoạch. Có kết luận thầy sẽ thông báo.
- **Người kể**: Một tuần sau, trường thông báo Khánh thôi chức chủ tịch Hội sinh viên và trưởng CLB Robotics. Lý do không được nêu. Nam được bầu làm trưởng CLB.
- **Nam** (neutral): Tớ không biết cậu ấy nói gì với thầy. Nhưng tớ biết các cậu đã dừng ở đúng chỗ.

*— Chỉ khi có dc-khanh-du (đường rẽ tự động ở trên) —*

###### 📍 Phòng họp rà soát — Khánh nhận; Nam nhận CLB Robotics

- **Thầy Quang** (neutral): Em Khánh nhận rồi. Việc kỷ luật và trả lại quỹ, thầy làm với Hội sinh viên, không bàn ở đây. Việc riêng của em ấy, thầy không hỏi trước mọi người.
- **Khánh** (neutral): Robotics… tớ giao lại cho Nam. Cậu giữ sổ sách của xưởng tốt hơn tớ.
- **Nam** (neutral): Tớ nhận. Nhưng sổ sách thì ai cũng xem được, kể cả cậu.
- **Thầy Quang** (neutral): Hai CLB dùng chung phòng tới hết học kỳ. Thầy nhận hồ sơ của CLB Thám Tử vào đợt rà soát cuối kỳ.
- **Tùng** (happy): Giữ được phòng. Lần này tớ không cá nữa, tớ chắc.

###### 📍 Phòng CLB — Chốt mùa: mình nói chắc được gì

> ❓ Minh Anh hỏi: "Hồ sơ cuối kỳ, mục cuối cùng. Mình nói chắc được điều gì?" (chọn sai thì nghe phản hồi rồi chọn lại)
>   - Ba khoản chi không có hàng được ghi vào quỹ CLB Thám Tử, do chủ tịch Hội sinh viên duyệt. Mỗi bước đều có phiếu để ai cũng tự kiểm được. ✅ → **Minh Anh** (neutral): Đúng chừng ấy. Phần "vì sao" là lời người nhận, không phải của bảng.
>   - Cả Hội sinh viên và CLB Robotics cùng bao che cho Khánh. → **Hà Vy** (thinking): Bảng ghi một người duyệt. "Cả Hội" thì cột nào nói?
>   - Khánh viết lá thư ngay từ đầu để chiếm phòng CLB. → **Duy** (neutral): Khánh nhận lá thư là để không ai mở sổ quỹ. "Chiếm phòng" là mình đoán thêm.
> ⤵ RẼ TỰ ĐỘNG: nếu (có clue-loi-nhan-linh-1 và có clue-loi-nhan-linh-2 và có clue-loi-nhan-linh-3 và có clue-loi-nhan-linh-4) thì sang "Đủ bốn mẩu giấy: ngăn tủ khóa trong phòng CLB" (in ở dưới); nếu KHÔNG thì chạy tiếp các dòng ngay sau đây. Hai đường loại trừ nhau, người chơi chỉ thấy một.
- **Minh Anh** (neutral): Hồ sơ cuối kỳ xong. Mục nào cũng có phiếu, ai mở ra cũng tự kiểm được.
- **Hà Vy** (smile): Từ một chữ H tới một sổ quỹ. Mỗi bước là một phiếu.
- **Duy** (neutral): Và chị Linh để lại nhiều mẩu giấy hơn mình tưởng.
*[Thẻ chữ]* Dữ liệu chỉ ra ai cần hỏi. Người trả lời mới là người nói "vì sao". Mùa 1 khép lại ở chỗ chứng cứ dừng.
> 🏁 KẾT THÚC vụ → màn kết.

*— Chỉ khi (có clue-loi-nhan-linh-1 và có clue-loi-nhan-linh-2 và có clue-loi-nhan-linh-3 và có clue-loi-nhan-linh-4) (đường rẽ tự động ở trên) —*

###### 📍 Phòng CLB — Đủ bốn mẩu giấy: ngăn tủ khóa trong phòng CLB

- **Duy** (neutral): Bốn mẩu giấy. Mẩu nào cũng nhắc "cuốn sổ cũ" với "vụ đầu tiên". Mà ngăn dưới tủ hồ sơ thì khóa, tớ chưa bao giờ có chìa.
- **Tùng** (surprised): Thì cạy ra!
- **Hà Vy** (thinking): Khoan. Mẩu đầu: "Căn phòng này giữ nhiều hơn em nghĩ." Chị ấy không nói "tủ".
- **Duy** (neutral): …Chìa ngăn dưới.
> 🗂️ Giấy nhớ mới: **[Lời nhắn chị Linh, mẩu cuối]** — nguồn: Ngăn dưới tủ hồ sơ phòng CLB
> Chữ chị Linh, dưới nét chữ ngả màu của thầy Quang: "Manh mối cũ, câu hỏi mới."
> 🗂️ Tài liệu mới: **Hồ sơ vụ thứ nhất của CLB** — nguồn: Ngăn dưới tủ hồ sơ phòng CLB, chìa dán sau bảng nguyên tắc
> "Hồ sơ vụ thứ nhất — CLB Thám Tử Dữ Liệu", chữ viết tay, ký tên Trịnh Quang.
> Chị Linh chép lại cuốn này vào sổ tự học. Vụ đầu tiên kết luận sai một người.
- **Người kể**: Trong ngăn tủ: một cuốn sổ bìa cứng, chữ viết tay đã ngả màu. Trang đầu ghi "Hồ sơ vụ thứ nhất — CLB Thám Tử Dữ Liệu", ký tên Trịnh Quang.
- **Tùng** (surprised): Thầy Quang? Thầy Quang lập CLB này á?
- **Hà Vy** (thinking): Và vụ đầu tiên của CLB kết luận sai. Chị Linh tìm ra, chép lại, rồi để lại giấy cho mình.
- **Bạn (người chơi)**: Trang cuối có thêm một dòng mới, chữ chị Linh: "Manh mối cũ, câu hỏi mới."
- **Minh Anh** (neutral): Mùa sau. Giờ thì cất đi, và đừng cá.
- **Tùng** (gai-dau): Tớ có cá đâu.
> 🏁 KẾT THÚC vụ → màn kết.

*(tiếp theo như chuỗi "Chốt mùa: mình nói chắc được gì" đã in ở trên)*

*(tiếp theo như chuỗi "Phòng Đào tạo: "Căn cứ vào đâu?"" đã in ở trên)*

## 🏁 Màn kết
**Mỗi bước là một phiếu** — Ba khoản chi không có hàng được ghi vào quỹ CLB Thám Tử, do chủ tịch Hội sinh viên duyệt. Người nhận là người nói "vì sao". Mùa 1 khép lại ở chỗ chứng cứ dừng.