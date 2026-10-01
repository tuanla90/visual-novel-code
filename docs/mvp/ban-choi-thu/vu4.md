# Vụ: Giúp Nam

Quy ước: dòng "- **Tên** (biểu cảm): …" là lời thoại hiện từng câu; "🗂️" là thẻ vào hồ sơ (cũng ghim lên bảng điều tra); "💻" là màn tra dữ liệu trên laptop; "❓" là câu hỏi nhiều lựa chọn; "🔀" là rẽ nhánh do người chơi chọn; "⤵" là rẽ tự động theo cờ (hai đường loại trừ nhau — bản này in CẢ HAI để bạn đọc, người chơi chỉ đi một). Mỗi chuỗi chỉ in một lần; gặp "*(tiếp theo như chuỗi … đã in ở trên)*" thì quay lên đọc.

## 📍 Phòng CLB — Nam tới phòng CLB với một rắc rối của chính mình

*[Thẻ chữ]* Vụ 4 — Thứ Hai, 14 tháng 10
- **Người kể**: Đầu tuần. Lần này không phải nhóm sang xưởng, mà Nam tự tới phòng CLB, tay cầm một tờ giấy.
- **Nam** (neutral): Các cậu nói đúng. Có người đang mượn tên tớ, mà không phải chỉ cái tin đồn.
- **Minh Anh** (neutral): Ngồi xuống đã. Chuyện gì?
- **Nam** (neutral): Ban kiểm tra của Hội sinh viên gửi giấy yêu cầu giải trình ngân sách xưởng. Họ tạm dừng giải ngân, vì tớ đứng tên năm đơn trong hai tháng, cộng lại hơn hai triệu rưỡi, có đơn gần một triệu. Trong năm đơn ấy tớ chỉ đặt hai: cảm biến với bánh xe, mấy trăm nghìn. Ba đơn kia tớ không đặt.
- **Quân** (neutral): Giấy ấy ban tôi lập. Hôm thứ Sáu chủ tịch Hội chuyển xuống danh sách năm đơn, bảo làm đúng quy trình. Lần trước tôi lọc rộng rồi nghi vội cả một lớp. Lần này tôi mang sổ tới để các bạn tự tra, tra ra gì tôi ghi đúng thế.
> 🗂️ Tài liệu mới: **Giấy yêu cầu giải trình ngân sách** — nguồn: Nam mang tới phòng CLB
> Ban kiểm tra Hội sinh viên tạm dừng giải ngân cho xưởng Robotics, yêu cầu giải trình năm đơn linh kiện đứng tên Nam trong tháng 9 và 10, năm đơn cộng lại 2.670.000 đồng. Giấy đề ngày 11/10, lập theo danh sách chủ tịch Hội sinh viên chuyển xuống; Quân ký. Kèm bản sổ đặt hàng của xưởng.
> Nam nói mình chỉ đặt hai đơn: cảm biến dò line và bánh xe.
> 🗂️ Giấy nhớ mới: **[Đã duyệt]** — nguồn: Sổ đặt hàng của xưởng
> Sổ đặt hàng ghi trạng thái từng đơn ở cột trang_thai: DA_DUYET là đơn đã được duyệt chi, CHO_DUYET là đơn còn chờ.
> (giấy nhớ kéo được vào màn tra: DA_DUYET)
- **Tùng** (worried): Ba đơn lạ. Ai đặt?
- **Nam** (neutral): Đơn đặt trên máy xưởng, ai đăng nhập cũng điền tên người đặt được. Ban kiểm tra gửi kèm bản sổ đặt hàng của xưởng, có cả đơn còn chờ duyệt. Các cậu xem hộ.
- **Hà Vy** (thinking): Chưa đọc tên vội. Đếm trước: mỗi người đứng tên mấy đơn, rồi mới xem đơn của Nam.
> 🎯 NHIỆM VỤ: Sổ đặt hàng của xưởng có những đơn nào đã duyệt?
> 💭 Hà Vy nhắc: Chỉ lấy đơn đã duyệt. Trạng thái ghi ở cột trang_thai.
### 💻 Màn tra: Sổ đặt linh kiện của xưởng (thẻ `c-don-da-duyet`)
Đề bài trên màn hình: *Sổ đặt linh kiện của xưởng Robotics, tháng 9 và 10. Những đơn nào đã duyệt?*
Cách chơi: kéo giấy nhớ vào ô giá trị, bấm cột / phép ("bằng", "bắt đầu bằng") / VÀ–HOẶC rồi CHẠY. Chạy sai không bị phạt.
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
Giấy nhớ đang có quanh màn hình: [DA_DUYET]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
SELECT ma_don, ngay, nguoi_dat, linh_kien, so_tien, ma_phien FROM don_linh_kien WHERE trang_thai = 'DA_DUYET';
```
Kết quả: 8 dòng
| ma_don | ngay | nguoi_dat | linh_kien | so_tien | ma_phien |
|---|---|---|---|---|---|
| DLK-01 | 2024-09-20 | Nam | Cảm biến dò line | 120000 | PH-11 |
| DLK-02 | 2024-09-24 | Bách | Pin 18650 | 200000 | PH-12 |
| DLK-03 | 2024-09-27 | Nam | Động cơ servo | 800000 | PH-13 |
| DLK-04 | 2024-10-01 | Thảo | Dây nối | 60000 | PH-14 |
| DLK-05 | 2024-10-02 | Nam | Bánh xe | 150000 | PH-15 |
| DLK-06 | 2024-10-04 | Nam | Mạch điều khiển | 900000 | PH-16 |
| DLK-07 | 2024-10-05 | Khánh | Ốc vít | 40000 | PH-17 |
| DLK-08 | 2024-10-07 | Nam | Bộ khung nhôm | 700000 | PH-18 |
Lời nhân vật sau mỗi lần chạy:
- Khi ra 0 dòng: **Hà Vy** (thinking): Không dòng nào. Giá trị trạng thái viết hoa, gạch dưới, đúng như giấy nhớ.
- Khi ra 2 dòng: **Hà Vy** (thinking): Hai dòng. Đây là hai đơn còn chờ, mình cần đơn đã duyệt.
- Khi ra 10 dòng: **Tùng** (gai-dau): Cả mười đơn, có cả hai đơn chờ duyệt.
- Khi đúng: **Hà Vy** (neutral): Tám đơn đã duyệt. Ghim lại, rồi gom.
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Tám đơn linh kiện đã duyệt** — Kết quả truy vấn: tám đơn đã duyệt, mỗi đơn ghi ngày, người đứng tên, linh kiện, số tiền và mã phiên đăng nhập lúc tạo đơn.

- **Bạn (người chơi)**: Tám đơn đã duyệt.
- **Hà Vy** (thinking): Tám đơn, gom theo người đặt rồi đếm. Xem Nam đứng tên bao nhiêu so với người khác.
> 🎯 NHIỆM VỤ: Mỗi người đứng tên bao nhiêu đơn đã duyệt?
> 💭 Hà Vy nhắc: Phiếu tám đơn làm nguồn, gom theo người đặt.
### 💻 Màn tra: Đơn đã duyệt, gom theo người đặt (thẻ `c-don-theo-nguoi`)
Đề bài trên màn hình: *Lấy phiếu tám đơn làm nguồn. Gom theo người đứng tên, đếm mỗi người mấy đơn.*
Cách chơi: màn TỔNG HỢP — chọn nguồn (phiếu đã ghim `ev-don-da-duyet`), lọc tùy chọn bằng giấy nhớ, chọn cột để NHÓM; máy đếm số dòng mỗi nhóm (COUNT), có thể tính tổng / trung bình và chỉ giữ nhóm vượt ngưỡng nếu bài cần.
Giấy nhớ đang có quanh màn hình: [DA_DUYET]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
WITH don_da_duyet AS (phiếu "Tám đơn linh kiện đã duyệt")
SELECT nguoi_dat, COUNT(*) AS so_dong FROM don_da_duyet GROUP BY nguoi_dat;
```
Kết quả: 4 dòng
| nguoi_dat | so_dong |
|---|---|
| Bách | 1 |
| Khánh | 1 |
| Nam | 5 |
| Thảo | 1 |
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Nam đứng tên 5 trong 8 đơn** — Kết quả gom theo người đặt: Nam 5 đơn, Bách 1, Thảo 1, Khánh 1. Nam nói mình chỉ đặt hai.

- **Bạn (người chơi)**: Nam năm đơn. Bách, Thảo, Khánh mỗi người một.
- **Nam** (neutral): Năm. Mà tớ chỉ đặt hai: cảm biến dò line với bánh xe. Động cơ servo, mạch điều khiển, khung nhôm thì tớ không đặt. Anh Bách là phó CLB, chị Thảo lo kỹ thuật, anh Khánh là trưởng CLB.
- **Tùng** (chi-tay): Thế ba đơn kia ai gõ tên cậu vào?
- **Duy** (neutral): Sổ không ghi ai gõ. Nhưng mỗi đơn có một cột mã phiên: phiên đăng nhập của máy lúc tạo đơn. Máy xưởng có bảng phiên đăng nhập không?
- **Nam** (neutral): Có. Phần mềm đặt hàng ghi mỗi phiên là máy nào, giờ nào. Nhưng tài khoản quản trị của tớ bị khóa từ sáng nay, chờ giải trình xong. Mai là hôm tớ kiểm kê kho, lịch với sổ đều nằm trong tài khoản ấy. Khóa rồi thì chỉ còn cách đếm tay.
- **Minh Anh** (neutral): Khóa là phải. Bảng ấy mà do Nam xuất thì ai cũng bảo Nam sửa được. Chị nhờ thầy Quang xin thầy Khải bên phòng máy xuất thẳng cho CLB mình. Máy chủ phần mềm đặt hàng đặt ở đó.
- **Hà Vy** (thinking): Vậy là hai bảng. Đơn thì ở sổ đặt hàng, máy thì ở bảng phiên. Chung nhau cái mã phiên.
- **Tùng** (chi-tay): Đơn cảm biến ghi PH-11. Bên bảng phiên mà cũng có một dòng PH-11 thì đấy là cái máy tạo ra đơn ấy, đúng không?
> 🗂️ Giấy nhớ mới: **[Mã phiên]** — nguồn: Duy nhìn thấy trong sổ đặt hàng
> Cột ma_phien của sổ đặt hàng ghi phiên đăng nhập của máy lúc tạo đơn. Bảng phiên đăng nhập của phần mềm ghi mỗi phiên là máy nào, ngày nào, giờ nào. Hai bảng chung nhau cột ma_phien.
> 🗂️ Giấy nhớ mới: **[Nam]** — nguồn: Sổ đặt hàng của xưởng
> Cột nguoi_dat ghi tên người đứng tên đơn. Ai đăng nhập máy xưởng cũng gõ được tên vào cột này.
> (giấy nhớ kéo được vào màn tra: Nam)

### 📍 Phòng CLB — Mã phiên dẫn sang bảng phiên đăng nhập: phải nối hai bảng

> 🗂️ Tài liệu mới: **Bảng phiên đăng nhập do thầy Khải xuất** — nguồn: Thầy Khải (phòng máy, nơi đặt máy chủ), theo đề nghị của Thầy Quang
> Mỗi phiên đăng nhập của phần mềm đặt hàng: mã phiên, máy, ngày, giờ. Có cả phiên không tạo đơn.
> Tài khoản quản trị của Nam đang bị khóa; bảng này không qua tay Nam.
- **Người kể**: Chiều. Thầy Khải tự mang bản xuất sang phòng CLB.
- **Thầy Khải** (neutral): Bảng phiên đăng nhập của phần mềm đặt hàng. Thầy xuất nguyên bản từ máy chủ theo đề nghị của thầy Quang, chưa lọc dòng nào. Lần trước các em tra nhật ký in cũng ở chỗ thầy, nhớ không?
> 🎯 NHIỆM VỤ: Năm đơn đứng tên Nam được tạo từ máy nào, lúc mấy giờ?
> 💭 Hà Vy nhắc: Hai bảng chung nhau một cột. Nối đúng cột đó thì mỗi đơn kéo theo đúng máy của nó.
- **Duy** (neutral): Nối hai bảng thì phải chọn cột chung. Chọn sai cột là đơn kéo theo máy của người khác.
### 💻 Màn tra: Đơn của Nam nối với phiên đăng nhập (thẻ `c-don-nam-may`)
Đề bài trên màn hình: *Sổ đặt hàng ghi mã phiên; bảng phiên đăng nhập ghi máy và giờ của mỗi phiên. Năm đơn đứng tên Nam được tạo từ máy nào, lúc mấy giờ?*
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
Bảng `phien_dang_nhap` (13 dòng):
| ma_phien | may | ngay | gio |
|---|---|---|---|
| PH-11 | MAY-XUONG-02 | 2024-09-20 | 15:20 |
| PH-12 | MAY-XUONG-01 | 2024-09-24 | 16:05 |
| PH-13 | MAY-VP-XUONG | 2024-09-27 | 21:50 |
| PH-14 | MAY-XUONG-01 | 2024-10-01 | 14:40 |
| PH-15 | MAY-XUONG-02 | 2024-10-02 | 15:45 |
| PH-16 | MAY-VP-XUONG | 2024-10-04 | 22:10 |
| PH-17 | MAY-VP-XUONG | 2024-10-05 | 10:15 |
| PH-18 | MAY-VP-XUONG | 2024-10-07 | 22:05 |
| PH-19 | MAY-XUONG-01 | 2024-10-08 | 15:00 |
| PH-20 | MAY-XUONG-01 | 2024-10-08 | 16:30 |
| PH-21 | MAY-XUONG-01 | 2024-10-07 | 16:00 |
| PH-22 | MAY-XUONG-02 | 2024-09-27 | 15:30 |
| PH-23 | MAY-VP-XUONG | 2024-10-02 | 10:40 |
Giấy nhớ đang có quanh màn hình: [DA_DUYET] [Nam]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
SELECT ma_don, linh_kien, may, gio FROM don_linh_kien JOIN phien_dang_nhap ON don_linh_kien.ma_phien = phien_dang_nhap.ma_phien WHERE nguoi_dat = 'Nam';
```
Kết quả: 5 dòng
| ma_don | linh_kien | may | gio |
|---|---|---|---|
| DLK-01 | Cảm biến dò line | MAY-XUONG-02 | 15:20 |
| DLK-03 | Động cơ servo | MAY-VP-XUONG | 21:50 |
| DLK-05 | Bánh xe | MAY-XUONG-02 | 15:45 |
| DLK-06 | Mạch điều khiển | MAY-VP-XUONG | 22:10 |
| DLK-08 | Bộ khung nhôm | MAY-VP-XUONG | 22:05 |
Lời nhân vật sau mỗi lần chạy:
- Khi lỗi không có cột: **Duy** (neutral): Máy báo không có cột đó. Sổ đặt hàng không ghi máy; máy nằm ở bảng phiên đăng nhập. Phải nối hai bảng trước đã.
- Khi ra 0 dòng: **Hà Vy** (thinking): Không dòng nào. Tên người đặt viết đúng như giấy nhớ: Nam.
- Khi ra 8 dòng: **Tùng** (gai-dau): Tám dòng cho năm đơn? Đơn bánh xe ngày 02/10 hiện hai lần, một lần ở máy xưởng số 2, một lần ở máy văn phòng. Một đơn sao tạo ở hai máy được. / **Hà Vy** (thinking): Nối theo cột này thì đơn nào cũng dính mọi phiên cùng ngày, kể cả phiên của máy khác.
- Khi ra 13 dòng: **Tùng** (gai-dau): Mười ba dòng. Nối theo cột này thì ngày nào trùng là dính nhau hết.
- Khi ra 10 dòng: **Tùng** (gai-dau): Mười dòng. Cả sổ. Mình chỉ cần đơn của Nam.
- Khi đúng: **Nam** (neutral): Năm đơn, mỗi đơn đúng một máy, một giờ. Hai cái buổi chiều là tớ.
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Năm đơn của Nam: máy và giờ tạo** — Kết quả nối hai bảng: hai đơn tạo buổi chiều từ máy xưởng số 2, ba đơn tạo ban đêm từ máy văn phòng xưởng (21:50, 22:10, 22:05). Đơn 07/10 tạo lúc 22:05, khi Nam đang ở thư viện.

- **Bạn (người chơi)**: Năm đơn của Nam. Hai đơn buổi chiều từ máy xưởng số 2. Ba đơn còn lại từ máy văn phòng xưởng, 21 giờ 50, 22 giờ 10 và 22 giờ 05.
- **Nam** (neutral): Máy xưởng số 2 buổi chiều là tớ. Máy văn phòng ban đêm thì tớ chưa bao giờ ngồi. Phòng đó khóa.
- **Hà Vy** (thinking): Năm dòng này gom theo máy rồi đếm, cho chắc.
> 🎯 NHIỆM VỤ: Năm đơn đứng tên Nam chia theo máy ra sao?
> 💭 Hà Vy nhắc: Phiếu năm đơn làm nguồn, gom theo máy.
### 💻 Màn tra: Đơn của Nam, gom theo máy (thẻ `c-don-nam-theo-may`)
Đề bài trên màn hình: *Lấy phiếu năm đơn làm nguồn. Gom theo máy, đếm mỗi máy mấy đơn.*
Cách chơi: màn TỔNG HỢP — chọn nguồn (phiếu đã ghim `ev-don-nam-may`), lọc tùy chọn bằng giấy nhớ, chọn cột để NHÓM; máy đếm số dòng mỗi nhóm (COUNT), có thể tính tổng / trung bình và chỉ giữ nhóm vượt ngưỡng nếu bài cần.
Giấy nhớ đang có quanh màn hình: [DA_DUYET] [Nam]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
WITH don_nam_may AS (phiếu "Năm đơn của Nam: máy và giờ tạo")
SELECT may, COUNT(*) AS so_dong FROM don_nam_may GROUP BY may;
```
Kết quả: 2 dòng
| may | so_dong |
|---|---|
| MAY-VP-XUONG | 3 |
| MAY-XUONG-02 | 2 |
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **3 đơn từ máy văn phòng xưởng, 2 từ máy xưởng số 2** — Kết quả gom theo máy: ba đơn mang tên Nam tạo từ máy văn phòng xưởng (phòng khóa, chìa ban chủ nhiệm giữ), hai đơn từ máy xưởng số 2 là của Nam.

- **Bạn (người chơi)**: Máy văn phòng xưởng ba đơn. Máy xưởng số 2 hai đơn.
- **Tùng** (surprised): Máy văn phòng xưởng. Lại nó. Tin đồn cũng gửi từ đó.
- **Hà Vy** (thinking): Và đơn ngày 07/10 tạo lúc 22 giờ 05. Tối đó Nam ở thư viện tới 23 giờ 05, mình đã có bản ghi.
- **Nam** (neutral): Vậy là cùng một chỗ, cùng một tối, có người vừa gửi tin đồn vừa đặt hàng bằng tên tớ.
- **Minh Anh** (neutral): Nam, chuyện này không còn là chuyện riêng của CLB nào. Điều tra cùng bọn chị không?
- **Nam** (neutral): Tớ xin. Tên tớ, tớ phải tự đi tìm xem ai đang dùng.
> 🗂️ Giấy nhớ mới: **[Máy văn phòng xưởng]** — nguồn: Bảng phiên đăng nhập
> Máy trong phòng văn phòng nhỏ của xưởng mang mã MAY-VP-XUONG. Phòng thường khóa, chìa ban chủ nhiệm giữ.
> (giấy nhớ kéo được vào màn tra: MAY-VP-XUONG)

#### 📍 Phòng CLB — Mọi đơn từ máy văn phòng xưởng

- **Duy** (neutral): Nếu máy văn phòng là chỗ người ta làm việc đó, thì xem mọi đơn từ máy ấy, không chỉ đơn mang tên Nam.
> 🎯 NHIỆM VỤ: Máy văn phòng xưởng đã tạo những đơn nào?
> 💭 Hà Vy nhắc: Vẫn nối hai bảng theo mã phiên, nhưng lần này lọc theo máy.
### 💻 Màn tra: Mọi đơn từ máy văn phòng xưởng (thẻ `c-may-vp`)
Đề bài trên màn hình: *Nối sổ đặt hàng với bảng phiên đăng nhập. Máy văn phòng xưởng đã tạo những đơn nào, đứng tên ai, lúc mấy giờ?*
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
Bảng `phien_dang_nhap` (13 dòng):
| ma_phien | may | ngay | gio |
|---|---|---|---|
| PH-11 | MAY-XUONG-02 | 2024-09-20 | 15:20 |
| PH-12 | MAY-XUONG-01 | 2024-09-24 | 16:05 |
| PH-13 | MAY-VP-XUONG | 2024-09-27 | 21:50 |
| PH-14 | MAY-XUONG-01 | 2024-10-01 | 14:40 |
| PH-15 | MAY-XUONG-02 | 2024-10-02 | 15:45 |
| PH-16 | MAY-VP-XUONG | 2024-10-04 | 22:10 |
| PH-17 | MAY-VP-XUONG | 2024-10-05 | 10:15 |
| PH-18 | MAY-VP-XUONG | 2024-10-07 | 22:05 |
| PH-19 | MAY-XUONG-01 | 2024-10-08 | 15:00 |
| PH-20 | MAY-XUONG-01 | 2024-10-08 | 16:30 |
| PH-21 | MAY-XUONG-01 | 2024-10-07 | 16:00 |
| PH-22 | MAY-XUONG-02 | 2024-09-27 | 15:30 |
| PH-23 | MAY-VP-XUONG | 2024-10-02 | 10:40 |
Giấy nhớ đang có quanh màn hình: [DA_DUYET] [Nam] [MAY-VP-XUONG]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
SELECT ma_don, nguoi_dat, linh_kien, gio FROM don_linh_kien JOIN phien_dang_nhap ON don_linh_kien.ma_phien = phien_dang_nhap.ma_phien WHERE may = 'MAY-VP-XUONG';
```
Kết quả: 4 dòng
| ma_don | nguoi_dat | linh_kien | gio |
|---|---|---|---|
| DLK-03 | Nam | Động cơ servo | 21:50 |
| DLK-06 | Nam | Mạch điều khiển | 22:10 |
| DLK-07 | Khánh | Ốc vít | 10:15 |
| DLK-08 | Nam | Bộ khung nhôm | 22:05 |
Lời nhân vật sau mỗi lần chạy:
- Khi lỗi không có cột: **Duy** (neutral): Máy báo không có cột đó. Cột máy nằm ở bảng phiên đăng nhập, nối rồi mới lọc được.
- Khi ra 0 dòng: **Hà Vy** (thinking): Không dòng nào. Mã máy viết hoa, có gạch nối, đúng như giấy nhớ.
- Khi ra 5 dòng: **Hà Vy** (thinking): Năm dòng, mà máy văn phòng chỉ có bốn phiên tạo đơn. Có đơn tạo ở máy xưởng dính vào, vì cùng ngày có một phiên ở máy văn phòng. Cột nối chưa đúng nghĩa.
- Khi ra 10 dòng: **Tùng** (gai-dau): Cả sổ. Mình chỉ cần đơn từ máy văn phòng.
- Khi đúng: **Hà Vy** (neutral): Bốn đơn. Ba đơn đêm mang tên Nam, một đơn sáng mang tên Khánh.
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Máy văn phòng xưởng: 3 đơn đêm mang tên Nam, 1 đơn ngày của Khánh** — Kết quả: bốn đơn tạo từ máy văn phòng xưởng. Ba đơn ban đêm đứng tên Nam; một đơn ốc vít 10:15 sáng đứng tên Khánh, trưởng CLB, là người dùng máy đó hợp lệ ban ngày. Ba người có chìa phòng: Khánh, Bách, Thảo.

- **Bạn (người chơi)**: Bốn đơn. Ba đơn đứng tên Nam, ban đêm. Một đơn ốc vít đứng tên Khánh, 10 giờ 15 sáng.
- **Nam** (neutral): Ốc vít thì đúng là anh Khánh đặt, hôm đó tớ thấy. Trưởng CLB ngồi máy văn phòng ban ngày là chuyện thường.
- **Hà Vy** (thinking): Vậy máy đó ban ngày có người dùng hợp lệ. Ban đêm có ba đơn đứng tên Nam, mà một trong ba tạo lúc Nam ở thư viện. Mình mới biết máy, chưa biết tay.
- **Duy** (neutral): Mà bảng phiên ghi máy văn phòng có năm phiên, nối xong chỉ ra bốn đơn. Một phiên sáng 02/10 không tạo đơn nào: có người mở phần mềm rồi thôi. Nối kiểu này thì phiên không có đơn không hiện ra.
- **Duy** (neutral): Tờ giao chìa hôm trước: ba người có chìa. Đừng vội.
> 🗂️ Giấy nhớ mới: **[Lời nhắn chị Linh, mẩu thứ tư]** — nguồn: Sổ tự học của chị Linh, phòng CLB
> Chữ chị Linh: "Cái tên trên bản ghi và người ngồi ở đó là hai chuyện. Vụ đầu tiên, không ai hỏi câu ấy."
- **Duy** (neutral): Tên một người, tay một người khác… chị Linh có ghi một câu. Để tớ xem.
- **Bạn (người chơi)**: "Cái tên trên bản ghi và người ngồi ở đó là hai chuyện. Vụ đầu tiên, không ai hỏi câu ấy."
- **Tùng** (worried): Giống hệt chuyện Nam.
- **Hà Vy** (thinking): Chị ấy ghi từ năm ngoái. Cuốn sổ cũ mà chị ấy nhắc, chắc kể đúng chuyện này.

##### 📍 Phòng CLB — Nam điều tra cùng; ba người có chìa

> ❓ Minh Anh hỏi: "Vậy mình nói chắc được điều gì với Ban kiểm tra của Hội?" (chọn sai thì nghe phản hồi rồi chọn lại)
>   - Ba đơn đứng tên Nam được tạo ban đêm từ máy văn phòng xưởng; đơn 07/10 tạo đúng lúc Nam ở thư viện. Ai ngồi máy thì bảng này chưa nói. ✅ → **Minh Anh** (neutral): Đúng chừng ấy. Chị gửi kèm phiếu nối bảng để họ tự kiểm. Ai ngồi máy thì phải có nguồn khác.
>   - Nam tự đặt cả năm đơn rồi chối. → **Hà Vy** (thinking): Một trong ba đơn đó tạo lúc 22:05 tối 07/10. Tối đó Nam ở thư viện, mình vừa chứng minh xong ở vụ trước.
>   - Ban chủ nhiệm Robotics cố tình đổ nợ cho Nam. → **Duy** (neutral): Máy văn phòng thì ban chủ nhiệm giữ chìa, nhưng "cố tình" và "cả ban" thì bảng nào nói? Mình mới có máy và giờ.
- **Minh Anh** (neutral): Phiếu bốn đơn từ máy văn phòng chị gửi kèm luôn: ba đơn đêm đứng tên Nam, một đơn ngày đứng tên trưởng CLB. Đủ để Ban kiểm tra thấy máy đó ban ngày ai dùng, ban đêm đứng tên ai.
- **Duy** (neutral): Và ba người giữ chìa phòng đó. Mình ghi tên, không ghi tội.
- **Duy** (neutral): Giấy giải trình đề ngày 11, một ngày sau hôm mình gỡ nghi cho Nam. Tớ ghi lại thôi, chưa nói gì.
- **Khánh** (neutral): Nam ở đây à. Danh sách Ban kiểm tra cầm là anh chuyển. Đủ cả năm đơn, kể cả hai đơn em đặt thật, để họ khỏi bảo mình chọn lọc. Cứ giải trình đúng sự thật, anh sẽ nói đỡ một câu.
- **Nam** (neutral): Vâng anh.
- **Tùng** (worried): Tớ thấy rồi. Cái huy hiệu. Nãy giờ tớ nín thở.
- **Hà Vy** (thinking): Nín là đúng. Nói ra lúc ấy là cá.
- **Nam** (neutral): Huy hiệu làm ba chục cái hồi đầu năm. Cái sứt là lỗi khuôn, anh Khánh xin giữ. Nhưng balo anh ấy hay để ở xưởng, ai cũng cầm ra cổng được. Tớ không nói là anh ấy.
- **Hà Vy** (neutral): Biết balo chưa phải biết người. Ghi thẻ, không kết.
> 🗂️ Giấy nhớ mới: **[Huy hiệu sứt: lỗi khuôn, Khánh giữ]** — nguồn: Nam, sau khi Khánh ghé phòng CLB
> Robotics làm ba chục huy hiệu hồi đầu năm; cái sứt một răng là lỗi khuôn, Khánh xin giữ và gắn trên balo. Balo hay để ở xưởng, ai cũng cầm được. Biết balo chưa phải biết người.
- **Tùng** (gai-dau): Lần này tớ biết mà vẫn không cá. Khó hơn tớ tưởng nhiều.
- **Minh Anh** (serious): Chắc trong lòng là lúc phải cẩn thận nhất. Muốn nói với thầy Quang thì cần một nguồn thứ hai, không dính gì tới cái huy hiệu. Và phải biết ba đơn kia tiền ở đâu ra, trả bằng quỹ nào, ai duyệt. Sổ quỹ là nguồn tiếp theo. Sao kê thì cuối kỳ mới về, mình không chờ được tới đó.
- **Nam** (neutral): Tớ không nghi ai cả. Nhưng tớ muốn biết là ai.
- **Hà Vy** (smile): Thì hỏi sổ.
*[Thẻ chữ]* Hai bảng nối nhau bằng một cột chung. Nối đúng cột thì mỗi dòng kéo theo đúng phần còn lại của nó. Nghi ngờ mạnh vẫn chưa phải bằng chứng: càng chắc trong lòng, càng phải tìm nguồn thứ hai.
> 🏁 KẾT THÚC vụ → màn kết.

## 🏁 Màn kết
**Có người mượn tên Nam** — Ba đơn đứng tên Nam được tạo ban đêm từ máy văn phòng xưởng, cùng cái máy đã gửi tin đồn, một đơn đúng tối Nam ở thư viện. Máy thì biết, tay thì chưa. Ba người có chìa phòng.