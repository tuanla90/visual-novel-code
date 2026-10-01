# Vụ: Tranh cãi trong nhóm

Quy ước: dòng "- **Tên** (biểu cảm): …" là lời thoại hiện từng câu; "🗂️" là thẻ vào hồ sơ (cũng ghim lên bảng điều tra); "💻" là màn tra dữ liệu trên laptop; "❓" là câu hỏi nhiều lựa chọn; "🔀" là rẽ nhánh do người chơi chọn.

## 📍 Phòng CLB — Phòng CLB: bốn người, bốn cách đọc một phiếu

*[Thẻ chữ]* Vụ 3 — Thứ Năm, 10 tháng 10
- **Người kể**: Chiều hôm sau. Phiếu tin gốc vẫn ghim giữa bảng. Bốn người, bốn cách đọc.
- **Tùng** (chi-tay): Tài khoản kênh của Robotics. Nam trực kênh. Tối đó xưởng mở, Nam bảo về sớm mà chẳng ai làm chứng. Còn gì nữa?
- **Minh Anh** (serious): Chị không nói là Nam. Nhưng Nam là đầu mối duy nhất mình có, và cô Lan đang chờ. Chị cần biết đã đủ để mời Nam lên hỏi chưa.
- **Hà Vy** (thinking): Khoan. Mình mới đếm có một kiểu: tài khoản nào gửi. Đổi cách đếm xem có thấy gì khác không đã.
- **Duy** (neutral): Tớ thì chờ một nguồn nữa, ngoài kênh, rồi mới nói.
> 🗂️ Giấy nhớ mới: **[Kênh Robotics]** — nguồn: Phiếu tin gốc của Vụ 2
> Kênh của CLB Robotics mang mã clb_robotics. Bản xuất bài đăng ghi mã kênh ở cột kenh.
> (giấy nhớ kéo được vào màn tra: clb_robotics)
- **Bạn (người chơi)**: Đổi cách đếm là đếm cái gì ạ?
- **Hà Vy** (thinking): Kênh của Robotics đăng bao nhiêu bài trong tháng, từ máy nào, buổi nào. Nếu bài tin đồn khác hẳn thói quen của kênh thì cũng là một điều đáng ghi.
- **Minh Anh** (neutral): Được. Sang xưởng. Nhưng lần này hỏi thẳng Nam: tối đó cậu ấy ở đâu, có gì chứng minh.
> 🎯 NHIỆM VỤ: Kênh Robotics tháng 10 đăng bài từ máy nào, buổi nào?
> 💭 Hà Vy nhắc: Nhóm các bài theo thiết bị gửi. Đếm mỗi nhóm bao nhiêu bài.

### 📍 Xưởng CLB Robotics — Xưởng Robotics: Nam mở bản xuất bài đăng của kênh

- **Nam** (neutral): Lại các cậu. Hôm nay định hỏi gì nữa?
- **Tùng** (chi-tay): Hỏi thẳng: tối thứ Hai cậu ở đâu?
- **Nam** (neutral): Thư viện. Tối thứ Hai nào cũng thế, tới khi họ đóng cửa. Nhưng các cậu đâu có tin.
- **Hà Vy** (neutral): Chưa tin, chưa không tin. Cậu cho bọn tớ xem bản xuất bài đăng của kênh được không? Cả tháng, mọi kênh cũng được, bọn tớ tự lọc.
- **Nam** (neutral): Bản xuất của mục kênh thì ai quản trị cũng tải được. Đây. Lọc đi.
### 💻 Màn tra: Bài đăng của các kênh CLB (thẻ `c-bai-dang`)
Đề bài trên màn hình: *Bản xuất bài đăng của mọi kênh CLB trong tháng 10. Kênh Robotics đăng những bài nào?*
Cách chơi: kéo giấy nhớ vào ô giá trị, bấm cột / phép ("bằng", "bắt đầu bằng") / VÀ–HOẶC rồi CHẠY. Chạy sai không bị phạt.
Bảng `bai_dang_kenh` (14 dòng):
| ma_bai | kenh | ngay | buoi | thiet_bi |
|---|---|---|---|---|
| BD-01 | clb_robotics | 2024-10-01 | CHIEU | DIEN-THOAI-TRUC |
| BD-02 | clb_van_nghe | 2024-10-01 | TOI | DIEN-THOAI |
| BD-03 | clb_robotics | 2024-10-02 | CHIEU | DIEN-THOAI-TRUC |
| BD-04 | clb_robotics | 2024-10-03 | CHIEU | DIEN-THOAI-TRUC |
| BD-05 | clb_tham_tu | 2024-10-03 | CHIEU | MAY-CLB |
| BD-06 | clb_robotics | 2024-10-04 | CHIEU | DIEN-THOAI-TRUC |
| BD-07 | clb_robotics | 2024-10-05 | CHIEU | DIEN-THOAI-TRUC |
| BD-08 | clb_van_nghe | 2024-10-06 | TOI | DIEN-THOAI |
| BD-09 | clb_robotics | 2024-10-07 | CHIEU | DIEN-THOAI-TRUC |
| BD-10 | clb_robotics | 2024-10-07 | TOI | MAY-VP-XUONG |
| BD-11 | clb_robotics | 2024-10-08 | CHIEU | DIEN-THOAI-TRUC |
| BD-12 | clb_tham_tu | 2024-10-08 | CHIEU | MAY-CLB |
| BD-13 | clb_robotics | 2024-10-09 | CHIEU | DIEN-THOAI-TRUC |
| BD-14 | clb_van_nghe | 2024-10-09 | TOI | DIEN-THOAI |
Giấy nhớ đang có quanh màn hình: [clb_robotics]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả):
```sql
SELECT ma_bai, ngay, buoi, thiet_bi FROM bai_dang_kenh WHERE kenh = 'clb_robotics';
```
Kết quả: 9 dòng
| ma_bai | ngay | buoi | thiet_bi |
|---|---|---|---|
| BD-01 | 2024-10-01 | CHIEU | DIEN-THOAI-TRUC |
| BD-03 | 2024-10-02 | CHIEU | DIEN-THOAI-TRUC |
| BD-04 | 2024-10-03 | CHIEU | DIEN-THOAI-TRUC |
| BD-06 | 2024-10-04 | CHIEU | DIEN-THOAI-TRUC |
| BD-07 | 2024-10-05 | CHIEU | DIEN-THOAI-TRUC |
| BD-09 | 2024-10-07 | CHIEU | DIEN-THOAI-TRUC |
| BD-10 | 2024-10-07 | TOI | MAY-VP-XUONG |
| BD-11 | 2024-10-08 | CHIEU | DIEN-THOAI-TRUC |
| BD-13 | 2024-10-09 | CHIEU | DIEN-THOAI-TRUC |
Lời nhân vật sau mỗi lần chạy:
- Khi ra 0 dòng: **Hà Vy** (thinking): Không dòng nào. Giá trị này có đang nằm đúng cột của nó không nhỉ?
- Khi ra 14 dòng: **Tùng** (gai-dau): Cả ba kênh. Mình chỉ cần kênh Robotics.
- Khi đúng: **Hà Vy** (neutral): Chín bài. Ghim lại, rồi nhóm.
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Chín bài của kênh Robotics** — Kết quả truy vấn: chín bài kênh Robotics đăng trong tháng 10, mỗi bài ghi ngày, buổi và thiết bị gửi.

- **Bạn (người chơi)**: Chín bài của kênh Robotics trong tháng 10.
- **Hà Vy** (thinking): Chín bài, chín dòng. Đọc từng dòng thì được, nhưng mình muốn biết kênh này hay đăng từ máy nào. Nhóm theo thiết bị, đếm mỗi nhóm.
> 🎯 NHIỆM VỤ: Chín bài đó đăng từ những thiết bị nào, mỗi thiết bị mấy bài?
> 💭 Hà Vy nhắc: Lấy phiếu chín bài làm nguồn, nhóm theo thiết bị.
### 💻 Màn tra: Bài đăng nhóm theo thiết bị (thẻ `c-bai-thiet-bi`)
Đề bài trên màn hình: *Lấy phiếu chín bài làm nguồn. Nhóm theo thiết bị gửi, đếm mỗi nhóm bao nhiêu bài.*
Cách chơi: màn TỔNG HỢP — chọn nguồn (phiếu đã ghim `ev-bai-dang`), lọc tùy chọn bằng giấy nhớ, chọn cột để NHÓM; máy đếm số dòng mỗi nhóm (COUNT), có thể tính tổng / trung bình và chỉ giữ nhóm vượt ngưỡng nếu bài cần.
Giấy nhớ đang có quanh màn hình: [clb_robotics]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả):
```sql
SELECT thiet_bi, COUNT(*) AS so_dong FROM @ev-bai-dang GROUP BY thiet_bi;
```
Kết quả: 2 dòng
| thiet_bi | so_dong |
|---|---|
| DIEN-THOAI-TRUC | 8 |
| MAY-VP-XUONG | 1 |
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **8 bài từ điện thoại trực, 1 bài từ máy văn phòng** — Kết quả nhóm theo thiết bị: 8 bài gửi từ điện thoại trực kênh (Nam giữ), 1 bài gửi từ máy văn phòng xưởng. Bài tin đồn là bài duy nhất khác thói quen đăng của kênh.

- **Bạn (người chơi)**: Tám bài từ điện thoại trực kênh. Một bài từ máy văn phòng xưởng.
- **Nam** (neutral): Điện thoại trực là cái tớ giữ. Tớ đăng toàn buổi chiều, bằng cái đó.
- **Tùng** (worried): Điện thoại cậu giữ thì chứng minh được gì? Hôm đó cậu đổi sang máy bàn thì sao.
- **Nam** (neutral): Thì tớ đã bảo tối đó tớ ở thư viện. Thẻ thư viện có ghi giờ vào giờ ra. Tớ xin bản ghi của chính tớ được, thư viện cho mỗi người tự xem của mình.
- **Duy** (neutral): Đấy. Một nguồn ngoài kênh. Đi thư viện.
> 🗂️ Giấy nhớ mới: **[Nam]** — nguồn: Nam xin thư viện in bản ghi quẹt thẻ của chính mình
> Bản ghi quẹt thẻ ghi tên người quẹt ở cột ten. Thư viện chỉ in cho mỗi người bản ghi của chính họ.
> (giấy nhớ kéo được vào màn tra: Nam)
> 🗂️ Giấy nhớ mới: **[Tối 07/10]** — nguồn: Phiếu tin gốc của Vụ 2
> Tin gốc gửi lúc 22:40 thứ Hai 07/10/2024. Bản ghi thư viện ghi ngày theo dạng năm-tháng-ngày.
> (giấy nhớ kéo được vào màn tra: 2024-10-07)

#### 📍 Thư viện trường — Thư viện: bản ghi quẹt thẻ của chính Nam

- **Người kể**: Thư viện trường, quầy mượn trả. Nam điền phiếu xin bản ghi quẹt thẻ của chính mình trong tháng 9 và tháng 10, cô thủ thư in ra một tờ.
- **Nam** (neutral): Của tớ đấy. Tên tớ, từng ngày, giờ vào, giờ ra. Lọc ra của tớ rồi xem.
> 🎯 NHIỆM VỤ: Nam vào thư viện những ngày nào?
> 💭 Hà Vy nhắc: Bản ghi có tên. Lọc đúng tên Nam.
### 💻 Màn tra: Bản ghi quẹt thẻ thư viện (thẻ `c-nam-thu-vien`)
Đề bài trên màn hình: *Bản ghi quẹt thẻ do chính Nam và Hà Vy xin thư viện in ra. Nam vào thư viện những ngày nào?*
Cách chơi: kéo giấy nhớ vào ô giá trị, bấm cột / phép ("bằng", "bắt đầu bằng") / VÀ–HOẶC rồi CHẠY. Chạy sai không bị phạt.
Bảng `quet_the_thu_vien` (10 dòng):
| ten | ngay | thu | gio_vao | gio_ra |
|---|---|---|---|---|
| Nam | 2024-09-16 | THU_HAI | 21:45 | 23:00 |
| Hà Vy | 2024-09-16 | THU_HAI | 20:00 | 22:50 |
| Nam | 2024-09-23 | THU_HAI | 21:50 | 23:05 |
| Hà Vy | 2024-09-23 | THU_HAI | 20:05 | 23:00 |
| Nam | 2024-09-26 | THU_NAM | 19:30 | 21:00 |
| Nam | 2024-09-30 | THU_HAI | 21:40 | 23:00 |
| Hà Vy | 2024-09-30 | THU_HAI | 20:00 | 22:55 |
| Hà Vy | 2024-10-02 | THU_TU | 19:00 | 20:30 |
| Nam | 2024-10-07 | THU_HAI | 21:50 | 23:05 |
| Hà Vy | 2024-10-07 | THU_HAI | 20:00 | 23:00 |
Giấy nhớ đang có quanh màn hình: [clb_robotics] [Nam] [2024-10-07]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả):
```sql
SELECT ngay, thu, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ten = 'Nam';
```
Kết quả: 5 dòng
| ngay | thu | gio_vao | gio_ra |
|---|---|---|---|
| 2024-09-16 | THU_HAI | 21:45 | 23:00 |
| 2024-09-23 | THU_HAI | 21:50 | 23:05 |
| 2024-09-26 | THU_NAM | 19:30 | 21:00 |
| 2024-09-30 | THU_HAI | 21:40 | 23:00 |
| 2024-10-07 | THU_HAI | 21:50 | 23:05 |
Lời nhân vật sau mỗi lần chạy:
- Khi ra 0 dòng: **Hà Vy** (thinking): Không dòng nào. Tên trên bản ghi viết đúng như giấy nhớ: Nam.
- Khi ra 10 dòng: **Tùng** (gai-dau): Cả tờ, của cả hai người. Mình cần riêng của Nam.
- Khi đúng: **Nam** (neutral): Năm lần. Đúng là của tớ.
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Năm lần Nam quẹt thẻ thư viện** — Kết quả truy vấn: năm lần Nam vào thư viện trong tháng 9 và 10, có ngày, thứ, giờ vào, giờ ra.

- **Bạn (người chơi)**: Năm lần. Ngày với thứ ghi sẵn.
- **Hà Vy** (thinking): Năm dòng, nhìn là thấy thứ Hai nhiều. Nhưng nhóm theo thứ rồi đếm cho chắc: thói quen là thứ đếm được.
> 🎯 NHIỆM VỤ: Nam hay vào thư viện vào thứ mấy?
> 💭 Hà Vy nhắc: Lấy phiếu năm lần làm nguồn, nhóm theo thứ.
### 💻 Màn tra: Thói quen của Nam, nhóm theo thứ (thẻ `c-nam-thu`)
Đề bài trên màn hình: *Lấy phiếu năm lần làm nguồn. Nhóm theo thứ, đếm mỗi thứ mấy lần.*
Cách chơi: màn TỔNG HỢP — chọn nguồn (phiếu đã ghim `ev-nam-thu-vien`), lọc tùy chọn bằng giấy nhớ, chọn cột để NHÓM; máy đếm số dòng mỗi nhóm (COUNT), có thể tính tổng / trung bình và chỉ giữ nhóm vượt ngưỡng nếu bài cần.
Giấy nhớ đang có quanh màn hình: [clb_robotics] [Nam] [2024-10-07]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả):
```sql
SELECT thu, COUNT(*) AS so_dong FROM @ev-nam-thu-vien GROUP BY thu;
```
Kết quả: 2 dòng
| thu | so_dong |
|---|---|
| THU_HAI | 4 |
| THU_NAM | 1 |
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Nam: tối thứ Hai 4 lần, thứ Năm 1 lần** — Kết quả nhóm theo thứ: bốn tối thứ Hai liền Nam đều ở thư viện. Một thói quen đếm được; chưa phải bằng chứng cho riêng tối 07/10.

- **Bạn (người chơi)**: Thứ Hai bốn lần. Thứ Năm một lần.
- **Nam** (neutral): Tối thứ Hai thư viện vắng. Tớ ngồi bàn cạnh cửa sổ, làm bài tới khi họ đuổi.
- **Hà Vy** (thinking): …Bàn cạnh cửa sổ. Tối thứ Hai.
- **Tùng** (surprised): Sao thế?
- **Hà Vy** (thinking): Tối thứ Hai nào tớ cũng ở thư viện. Tớ nhớ có một cậu tuần nào cũng tới muộn, ngồi bàn cạnh cửa sổ. Tớ không để ý mặt.
- **Duy** (neutral): Nhớ thì nhớ. Nhưng tối mùng 7 cụ thể thì bản ghi nói gì? Lọc đúng ngày đó.
> 🎯 NHIỆM VỤ: Tối 07/10 ai quẹt thẻ, vào và ra lúc mấy giờ?
> 💭 Hà Vy nhắc: Ngày là mùng 7. Bản ghi của tớ cũng in chung tờ này, cô thủ thư in cả hai vì tớ cũng xin.
### 💻 Màn tra: Thư viện tối 07/10 (thẻ `c-toi-07`)
Đề bài trên màn hình: *Trên bản ghi quẹt thẻ, tối 07/10 có ai, vào và ra lúc mấy giờ?*
Cách chơi: kéo giấy nhớ vào ô giá trị, bấm cột / phép ("bằng", "bắt đầu bằng") / VÀ–HOẶC rồi CHẠY. Chạy sai không bị phạt.
Bảng `quet_the_thu_vien` (10 dòng):
| ten | ngay | thu | gio_vao | gio_ra |
|---|---|---|---|---|
| Nam | 2024-09-16 | THU_HAI | 21:45 | 23:00 |
| Hà Vy | 2024-09-16 | THU_HAI | 20:00 | 22:50 |
| Nam | 2024-09-23 | THU_HAI | 21:50 | 23:05 |
| Hà Vy | 2024-09-23 | THU_HAI | 20:05 | 23:00 |
| Nam | 2024-09-26 | THU_NAM | 19:30 | 21:00 |
| Nam | 2024-09-30 | THU_HAI | 21:40 | 23:00 |
| Hà Vy | 2024-09-30 | THU_HAI | 20:00 | 22:55 |
| Hà Vy | 2024-10-02 | THU_TU | 19:00 | 20:30 |
| Nam | 2024-10-07 | THU_HAI | 21:50 | 23:05 |
| Hà Vy | 2024-10-07 | THU_HAI | 20:00 | 23:00 |
Giấy nhớ đang có quanh màn hình: [clb_robotics] [Nam] [2024-10-07]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả):
```sql
SELECT ten, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ngay = '2024-10-07';
```
Kết quả: 2 dòng
| ten | gio_vao | gio_ra |
|---|---|---|
| Nam | 21:50 | 23:05 |
| Hà Vy | 20:00 | 23:00 |
Lời nhân vật sau mỗi lần chạy:
- Khi ra 0 dòng: **Hà Vy** (thinking): Không dòng nào. Ngày trên bản ghi viết dạng năm-tháng-ngày.
- Khi ra 1 dòng: **Hà Vy** (thinking): Một dòng thôi à? Tối đó tớ cũng ở đấy mà.
- Khi ra 5 dòng: **Tùng** (gai-dau): Năm lần. Mình chỉ cần tối mùng 7.
- Khi đúng: **Hà Vy** (smile): Hai dòng. Tối mùng 7, cả hai đứa.
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Tối 07/10: Hà Vy 20:00–23:00, Nam 21:50–23:05** — Kết quả truy vấn: tối 07/10 Hà Vy quẹt thẻ vào 20:00, ra 23:00; Nam vào 21:50, ra 23:05. Tin gốc gửi lúc 22:40. Nguồn độc lập của thư viện, có giờ vào giờ ra.

- **Bạn (người chơi)**: Tối mùng 7 có hai người. Hà Vy vào 20 giờ, ra 23 giờ. Nam vào 21 giờ 50, ra 23 giờ 05.
- **Hà Vy** (smile): 22 giờ 40 thì cả hai đứa ở thư viện. Tớ ngồi cách Nam hai bàn mà không biết.
- **Tùng** (gai-dau): Thế là… thói quen của cậu làm chứng cho thói quen của Nam.
- **Duy** (neutral): Hai thói quen, một tối cụ thể, một bản ghi của thư viện. Đủ ba thứ.
- **Nam** (neutral): Tớ đã bảo mà.
> 🔀 Tùng: "Hà Vy, thế thẻ của cậu đâu? Hay là tớ cũng xin bản của cậu xem tối thứ Hai nào cậu cũng ngồi đấy thật không?"
>   - Xin luôn bản ghi của Hà Vy.
>   - Thôi, về CLB.

*— Nếu chọn "Xin luôn bản ghi của Hà Vy." —*

##### 📍 Thư viện trường — Thói quen của Hà Vy, tra cho chắc

- **Hà Vy** (neutral): Xin thì xin. Thói quen của tớ cũng phải đếm được như của Nam.
> 🎯 NHIỆM VỤ: Hà Vy vào thư viện những ngày nào?
> 💭 Hà Vy nhắc: Lọc đúng tên tớ.
### 💻 Màn tra: Bản ghi quẹt thẻ của Hà Vy (thẻ `c-vy-thu-vien`)
Đề bài trên màn hình: *Hà Vy vào thư viện những ngày nào?*
Cách chơi: kéo giấy nhớ vào ô giá trị, bấm cột / phép ("bằng", "bắt đầu bằng") / VÀ–HOẶC rồi CHẠY. Chạy sai không bị phạt.
Bảng `quet_the_thu_vien` (10 dòng):
| ten | ngay | thu | gio_vao | gio_ra |
|---|---|---|---|---|
| Nam | 2024-09-16 | THU_HAI | 21:45 | 23:00 |
| Hà Vy | 2024-09-16 | THU_HAI | 20:00 | 22:50 |
| Nam | 2024-09-23 | THU_HAI | 21:50 | 23:05 |
| Hà Vy | 2024-09-23 | THU_HAI | 20:05 | 23:00 |
| Nam | 2024-09-26 | THU_NAM | 19:30 | 21:00 |
| Nam | 2024-09-30 | THU_HAI | 21:40 | 23:00 |
| Hà Vy | 2024-09-30 | THU_HAI | 20:00 | 22:55 |
| Hà Vy | 2024-10-02 | THU_TU | 19:00 | 20:30 |
| Nam | 2024-10-07 | THU_HAI | 21:50 | 23:05 |
| Hà Vy | 2024-10-07 | THU_HAI | 20:00 | 23:00 |
Giấy nhớ đang có quanh màn hình: [clb_robotics] [Nam] [2024-10-07]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả):
```sql
SELECT ngay, thu, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ten = 'Hà Vy';
```
Kết quả: 5 dòng
| ngay | thu | gio_vao | gio_ra |
|---|---|---|---|
| 2024-09-16 | THU_HAI | 20:00 | 22:50 |
| 2024-09-23 | THU_HAI | 20:05 | 23:00 |
| 2024-09-30 | THU_HAI | 20:00 | 22:55 |
| 2024-10-02 | THU_TU | 19:00 | 20:30 |
| 2024-10-07 | THU_HAI | 20:00 | 23:00 |
Lời nhân vật sau mỗi lần chạy:
- Khi ra 0 dòng: **Hà Vy** (thinking): Không dòng nào. Tên tớ trên bản ghi có dấu cách, viết đúng như giấy nhớ.
- Khi ra 10 dòng: **Tùng** (gai-dau): Cả tờ. Mình cần riêng của Hà Vy.
- Khi đúng: **Hà Vy** (neutral): Năm lần. Bốn tối thứ Hai.
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Năm lần Hà Vy quẹt thẻ thư viện** — Kết quả truy vấn: bốn tối thứ Hai và một tối thứ Tư. Thói quen của Hà Vy trùng với thói quen của Nam.

- **Bạn (người chơi)**: Năm lần. Bốn tối thứ Hai, một tối thứ Tư.
- **Tùng** (happy): Hai đứa như nhau. Đúng là hai cái máy.
- **Hà Vy** (neutral): Thói quen đếm được thì mới nói được. Về CLB.

###### 📍 Phòng CLB — Phòng CLB: Tùng nêu giả thuyết, người chơi trình thẻ

- **Người kể**: Phòng CLB. Mọi phiếu đã ghim lên bảng. Minh Anh chờ.
- **Minh Anh** (serious): Tùng nói trước. Rồi các em trình cái gì có trong hồ sơ.
> ⚖️ ĐỐI CHẤT — Tùng nêu giả thuyết: "Tài khoản kênh của Robotics gửi tin lúc 22:40. Nam trực kênh. Tối đó xưởng mở, Nam bảo về sớm mà không ai làm chứng. Tớ cá là Nam gửi.". Người chơi trình thẻ trong hồ sơ, hoặc nói "chưa đủ căn cứ".
>   - Trình ev-toi-07 [ĐỦ CĂN CỨ] → **Hà Vy** (neutral): Tối 07/10, thẻ thư viện ghi Nam vào 21:50, ra 23:05. Tin gửi 22:40. Lúc đó Nam ở thư viện. / **Tùng** (surprised): Thẻ thư viện á? / **Hà Vy** (neutral): Và tớ ngồi cách cậu ấy hai bàn. Tối thứ Hai nào tớ cũng ở đó. Tớ nhớ ra rồi. / **Minh Anh** (neutral): Nguồn độc lập, có giờ vào giờ ra. Đủ để không mời Nam lên.
>   - Trình ev-nam-thu [HỖ TRỢ] → **Hà Vy** (thinking): Bốn tối thứ Hai liền Nam đều ở thư viện. Một thói quen. Thói quen thì chưa phải bằng chứng cho đúng tối đó. / **Tùng** (gai-dau): Thì có thể tối đó cậu ấy nghỉ một hôm.
>   - Trình ev-bai-thiet-bi [HỖ TRỢ] → **Hà Vy** (thinking): Tám bài từ điện thoại trực, một bài từ máy văn phòng xưởng. Bài tin đồn khác hẳn thói quen đăng của kênh. / **Tùng** (worried): Khác thói quen thôi. Ai cấm Nam đổi máy một hôm.
>   - Trình ev-tin-goc [GỢI Ý] → **Tùng** (chi-tay): Chính phiếu này nói tài khoản Robotics gửi. Cậu đang củng cố cho tớ đấy. / **Duy** (neutral): Tài khoản. Chưa phải người.
>   - Chưa đủ căn cứ → **Minh Anh** (serious): Chưa đủ để nói Nam không làm, cũng chưa đủ để nói Nam làm. Vậy chị mời Nam lên hỏi. / **Duy** (neutral): Mời lên hỏi thì cũng là một nguồn. Nhưng mình đang thiếu nguồn, không phải thiếu người để hỏi.
>   - Thẻ khác → **Tùng** (worried): Cái này thì liên quan gì tới tối thứ Hai? / **Hà Vy** (thinking): Xem lại hồ sơ đã.
> (nếu có dc-nam-du → sang "Không mời Nam lên; Tùng xin lỗi; lời nhắn thứ ba của chị Linh")
- **Minh Anh** (serious): Vậy chị mời Nam lên.
- **Người kể**: Chiều hôm đó, Nam lên phòng CLB. Không nói nhiều, Nam đặt lên bàn tờ bản ghi quẹt thẻ thư viện của mình.
- **Nam** (neutral): Tối mùng 7, 21 giờ 50 vào, 23 giờ 05 ra. Các cậu có cả tờ này rồi mà vẫn gọi tớ lên.
- **Hà Vy** (thinking): …Tối đó tớ cũng ở đấy. Tớ nhớ ra muộn quá.
- **Tùng** (worried): Xin lỗi cậu.
- **Nam** (neutral): Không sao. Lần sau các cậu đọc kỹ hồ sơ trước đã.
> (máy đặt cờ v3-moi-nam-len)

*— Nếu có dc-nam-du —*

###### 📍 Phòng CLB — Không mời Nam lên; Tùng xin lỗi; lời nhắn thứ ba của chị Linh

- **Minh Anh** (neutral): Không mời Nam lên. Chị báo cô Lan: tối đó Nam ở thư viện, có bản ghi và có người cùng ngồi.
- **Tùng** (gai-dau): Tớ… cá trượt. Mà lần này trượt đau. Tớ xin lỗi Nam vậy.
- **Duy** (neutral): Cá thì không sao. Kết tội mới sao.
- **Hà Vy** (thinking): Tớ cũng suýt nữa. Nhìn tài khoản thấy tên kênh, nhìn kênh thấy người trực. Mỗi bước nhảy một tí là tới một con người.
> (nếu có ev-vy-thu-vien → sang "Hai thói quen, hai người làm chứng cho nhau: mẩu giấy thứ ba")

*— Nếu có ev-vy-thu-vien —*

###### 📍 Phòng CLB — Hai thói quen, hai người làm chứng cho nhau: mẩu giấy thứ ba

- **Duy** (neutral): Hai thói quen làm chứng cho nhau. Chị Linh có ghi chuyện này… trang "Kiểm hai lần". Để tớ xem.
> 🗂️ Giấy nhớ mới: **[Lời nhắn chị Linh, mẩu thứ ba]** — nguồn: Sổ tự học của chị Linh, phòng CLB
> Chữ chị Linh: "Vụ đầu tiên của CLB kết luận sai. Chị tìm ra cuốn sổ ghi lại nó."
- **Duy** (neutral): Mẩu thứ ba. Chữ chị Linh.
- **Bạn (người chơi)**: "Vụ đầu tiên của CLB kết luận sai. Chị tìm ra cuốn sổ ghi lại nó."
- **Tùng** (surprised): Vụ đầu tiên của CLB? Từ hồi nào?
- **Hà Vy** (thinking): Chưa biết. Nhưng chị ấy ghi "kết luận sai". Giống chuyện hôm nay.

###### 📍 Phòng CLB — Không phải Nam thì là ai?

> ❓ Minh Anh hỏi: "Vậy giờ mình nói chắc được điều gì?" (chọn sai thì nghe phản hồi rồi chọn lại)
>   - Tối 07/10 Nam ở thư viện lúc tin được gửi. Người gửi là ai thì chưa biết, chỉ biết người đó ngồi máy văn phòng xưởng. ✅ → **Minh Anh** (neutral): Đúng chừng ấy. Nam không phải người gửi; còn lại vẫn là câu hỏi.
>   - Người gửi chắc chắn là một trong ban chủ nhiệm, vì chỉ họ biết mật khẩu. → **Hà Vy** (thinking): "Chỉ họ biết" là lời Nam nói, chưa có bảng nào ghi. Và mật khẩu thì truyền tai được.
>   - Nam vẫn đáng ngờ, vì Nam nói về sớm mà không ai làm chứng. → **Duy** (neutral): Giờ đã có người làm chứng, và có cả thẻ. Cậu đang giữ nghi ngờ cũ sau khi bằng chứng đã đổi.
- **Tùng** (worried): Không phải Nam. Thế thì ai ngồi máy văn phòng xưởng tối đó?
- **Duy** (neutral): Máy trong phòng văn phòng, giờ xưởng mở. Ai vào được phòng đó thì mình chưa biết.
- **Hà Vy** (thinking): Và tên Nam vẫn nằm trên tài khoản kênh. Ai muốn người ta nghĩ là Nam, thì đã được như ý.
- **Minh Anh** (neutral): Mai chị nói chuyện với Nam. Chuyện này không chỉ là tin đồn về mình nữa.
*[Thẻ chữ]* Nhóm theo cách khác thì thấy chuyện khác. Thói quen đếm được, và đôi khi thói quen của người này là lời chứng cho người kia.
> 🏁 KẾT THÚC vụ → màn kết.

*(tiếp theo như chuỗi "Không phải Nam thì là ai?" đã in ở trên)*

*(tiếp theo như chuỗi "Không phải Nam thì là ai?" đã in ở trên)*

*— Nếu chọn "Thôi, về CLB." —*

*(tiếp theo như chuỗi "Phòng CLB: Tùng nêu giả thuyết, người chơi trình thẻ" đã in ở trên)*

## 🏁 Màn kết
**Nam ở thư viện lúc tin được gửi** — Bản ghi quẹt thẻ của thư viện và trí nhớ của Hà Vy là hai nguồn riêng, cùng đặt Nam ở thư viện lúc 22:40. Người gửi tin ngồi máy văn phòng xưởng, là ai thì chưa biết.