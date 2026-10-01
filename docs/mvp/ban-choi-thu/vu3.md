# Vụ: Tranh cãi trong nhóm

Quy ước: dòng "- **Tên** (biểu cảm): …" là lời thoại hiện từng câu; "🗂️" là thẻ vào hồ sơ (cũng ghim lên bảng điều tra); "💻" là màn tra dữ liệu trên laptop; "❓" là câu hỏi nhiều lựa chọn; "🔀" là rẽ nhánh do người chơi chọn; "⤵" là rẽ tự động theo cờ (hai đường loại trừ nhau — bản này in CẢ HAI để bạn đọc, người chơi chỉ đi một). Mỗi chuỗi chỉ in một lần; gặp "*(tiếp theo như chuỗi … đã in ở trên)*" thì quay lên đọc.

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
- **Duy** (neutral): Bản xuất bài đăng thì gồm mọi kênh. Lấy riêng bài của kênh Robotics trước, rồi mới gom theo thiết bị mà đếm.
> 🎯 NHIỆM VỤ: Kênh Robotics tháng 10 hay đăng bài từ thiết bị nào?
> 💭 Hà Vy nhắc: Chín bài nhìn hoa mắt. Giá mà gom những bài cùng một thiết bị vào một cục rồi đếm.

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
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
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
Đề bài trên màn hình: *Lấy phiếu chín bài làm nguồn. Gom theo thiết bị gửi, đếm mỗi nhóm bao nhiêu bài: kênh này hay đăng từ đâu?*
Cách chơi: màn TỔNG HỢP — chọn nguồn (phiếu đã ghim `ev-bai-dang`), lọc tùy chọn bằng giấy nhớ, chọn cột để NHÓM; máy đếm số dòng mỗi nhóm (COUNT), có thể tính tổng / trung bình và chỉ giữ nhóm vượt ngưỡng nếu bài cần.
Giấy nhớ đang có quanh màn hình: [clb_robotics]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
WITH bai_dang AS (phiếu "Chín bài của kênh Robotics")
SELECT thiet_bi, COUNT(*) AS so_dong FROM bai_dang GROUP BY thiet_bi;
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
- **Nam** (neutral): Thì tớ đã bảo tối đó tớ ở thư viện. Cửa từ thư viện ghi giờ vào giờ ra của từng thẻ. Trên cổng sinh viên, ai cũng tải được bản ghi của chính mình. Tớ tải rồi gửi vào nhóm cho các cậu.
- **Duy** (neutral): Đấy. Một nguồn ngoài kênh. Đi thư viện.
> 🗂️ Giấy nhớ mới: **[Nam]** — nguồn: Nam tải bản ghi cửa từ của chính mình từ cổng sinh viên
> Bản ghi cửa từ ghi tên chủ thẻ ở cột ten, giờ vào và giờ ra. Mỗi người chỉ tải được bản của chính mình; Nam và Hà Vy gộp hai bản vào một tệp.
> (giấy nhớ kéo được vào màn tra: Nam)
> 🗂️ Giấy nhớ mới: **[Tối 07/10]** — nguồn: Phiếu tin gốc của Vụ 2
> Tin gốc gửi lúc 22:40 thứ Hai 07/10/2024. Bản ghi thư viện ghi ngày theo dạng năm-tháng-ngày.
> (giấy nhớ kéo được vào màn tra: 2024-10-07)

#### 📍 Thư viện trường — Thư viện: bản ghi quẹt thẻ của chính Nam

- **Người kể**: Thư viện trường nằm trên tầng ba giảng đường B. Bác Thịnh ngồi ở bàn trực dưới chân cầu thang.
- **Bác Thịnh** (smile): Lại mấy đứa CLB Thám Tử. Lên thư viện à? Tối thứ Hai trên ấy vắng lắm, chỉ có vài đứa quen mặt.
- **Người kể**: Bàn cạnh cửa sổ. Ở bàn bên, Hoài ngẩng lên khỏi chồng sách.
- **Hoài** (nervous): Tớ chào các cậu. Lá thư hôm ấy tớ chỉ nộp hộ. Tớ vẫn nghĩ mãi về cái anh đã nhờ tớ.
- **Hà Vy** (neutral): Nhớ thêm được gì thì bảo bọn tớ nhé.
- **Hoài** (neutral): Ừ. Tớ mà gặp lại cái balo ấy là tớ nhận ra.
- **Hoài** (neutral): Mà cậu là bạn áo xanh tình nguyện tuần đầu đúng không? Hôm ấy cậu dẫn tớ lạc sang tận nhà xe.
- **Tùng** (gai-dau): Tớ dẫn đúng hướng, chỉ sai tòa thôi. Áo thì tớ vẫn cất trong tủ.
- **Người kể**: Nam mở cổng sinh viên trên điện thoại, tải bản ghi cửa từ của chính mình trong tháng 9 và tháng 10, gửi vào nhóm.
- **Hà Vy** (neutral): Tớ cũng tải bản của tớ, gộp chung vào một tệp cho dễ tra. Tên ai thì ghi tên người đó.
- **Nam** (neutral): Lọc ra của tớ rồi xem.
> 🎯 NHIỆM VỤ: Nam vào thư viện những ngày nào?
> 💭 Hà Vy nhắc: Tệp có cả hai tên. Lọc đúng tên Nam.
### 💻 Màn tra: Bản ghi quẹt thẻ thư viện (thẻ `c-nam-thu-vien`)
Đề bài trên màn hình: *Bản ghi cửa từ thư viện do chính Nam và Hà Vy tải về từ cổng sinh viên, gộp chung một tệp. Nam vào thư viện những ngày nào?*
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
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
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
- **Hà Vy** (thinking): Năm dòng, nhìn là thấy thứ Hai nhiều. Nhưng "nhiều" là mấy? Thói quen thì phải đếm được.
> 🎯 NHIỆM VỤ: Nam quẹt thẻ thư viện vào thứ mấy nhiều nhất, mấy lần?
> 💭 Hà Vy nhắc: Cùng một cục phiếu, gom theo thứ rồi đếm.
### 💻 Màn tra: Thói quen của Nam, nhóm theo thứ (thẻ `c-nam-thu`)
Đề bài trên màn hình: *Lấy phiếu năm lần làm nguồn. Gom theo thứ trong tuần, đếm mỗi thứ mấy lần: Nam hay đi thư viện vào thứ mấy?*
Cách chơi: màn TỔNG HỢP — chọn nguồn (phiếu đã ghim `ev-nam-thu-vien`), lọc tùy chọn bằng giấy nhớ, chọn cột để NHÓM; máy đếm số dòng mỗi nhóm (COUNT), có thể tính tổng / trung bình và chỉ giữ nhóm vượt ngưỡng nếu bài cần.
Giấy nhớ đang có quanh màn hình: [clb_robotics] [Nam] [2024-10-07]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
WITH nam_thu_vien AS (phiếu "Năm lần Nam quẹt thẻ thư viện")
SELECT thu, COUNT(*) AS so_dong FROM nam_thu_vien GROUP BY thu;
```
Kết quả: 2 dòng
| thu | so_dong |
|---|---|
| THU_HAI | 4 |
| THU_NAM | 1 |
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Nam: tối thứ Hai 4 lần, thứ Năm 1 lần** — Kết quả nhóm theo thứ: bốn tối thứ Hai liền Nam đều ở thư viện. Một thói quen đếm được; chưa phải bằng chứng cho riêng tối 07/10.

- **Bạn (người chơi)**: Thứ Hai bốn lần, tối nào có trong tệp cũng thế. Thứ Năm một lần.
- **Nam** (neutral): Tối thứ Hai thư viện vắng. Tớ ngồi bàn cạnh cửa sổ, làm bài tới khi họ đuổi.
- **Hà Vy** (thinking): …Bàn cạnh cửa sổ. Tối thứ Hai.
- **Tùng** (surprised): Sao thế?
- **Hà Vy** (thinking): Tối thứ Hai nào tớ cũng ở thư viện. Tớ nhớ có một cậu tuần nào cũng tới muộn, ngồi bàn cạnh cửa sổ. Tớ không để ý mặt.
- **Duy** (neutral): Nhớ thì nhớ. Nhưng tối mùng 7 cụ thể thì bản ghi nói gì? Lọc đúng ngày đó, cả hai tên.
> 🎯 NHIỆM VỤ: Tối 07/10 ai quẹt thẻ, vào và ra lúc mấy giờ?
> 💭 Hà Vy nhắc: Ngày là mùng 7. Tệp có cả bản của tớ.
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
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
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
- **Tùng** (gai-dau): Quẹt vào rồi trèo cửa sổ ra thì sao? Cửa từ chỉ biết lúc vào với lúc ra.
- **Hà Vy** (smile): Tớ ngồi cách Nam hai bàn. Chuông 22 giờ 30 nhắc sắp đóng cửa, cậu ấy còn đang xếp sách. Tớ nhớ vì tớ cũng đang xếp.
- **Duy** (neutral): Cửa từ một nguồn, lời Vy một nguồn. Nhưng lời Vy thì ai làm chứng? Thẻ của Vy.
- **Tùng** (chi-tay): Cậu nhớ nhầm sang hôm khác thì sao? Tối thứ Hai nào chuông chả reo lúc 22 giờ 30.
- **Hà Vy** (neutral): Tớ không nhầm, vì tối thứ Hai nào tớ cũng ngồi đó, quen tới mức biết hôm nào khác hôm nào. Không tin thì xem bản ghi của tớ.
- **Nam** (neutral): Tớ đã bảo mà.
> 🗂️ Giấy nhớ mới: **[Hà Vy]** — nguồn: Hà Vy tải bản ghi cửa từ của chính mình
> Hà Vy tải bản ghi cửa từ của mình, gộp chung tệp với Nam để lời chứng của mình cũng đếm được.
> (giấy nhớ kéo được vào màn tra: Hà Vy)

##### 📍 Thư viện trường — Lời chứng cũng phải đếm được: thói quen của Hà Vy

- **Hà Vy** (neutral): Được. Lời chứng của tớ cũng phải đếm được như của Nam. Bản của tớ có sẵn trong tệp.
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
Giấy nhớ đang có quanh màn hình: [clb_robotics] [Nam] [2024-10-07] [Hà Vy]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
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
- **Hà Vy** (neutral): Thói quen đếm được thì lời chứng mới nặng. Về CLB.

###### 📍 Phòng CLB — Phòng CLB: Tùng nêu giả thuyết, người chơi trình thẻ

- **Người kể**: Phòng CLB. Mọi phiếu đã ghim lên bảng. Minh Anh chờ.
- **Minh Anh** (serious): Tùng nói trước. Rồi các em trình cái gì có trong hồ sơ.
> ⚖️ ĐỐI CHẤT — Tùng nêu giả thuyết: "Tài khoản kênh của Robotics gửi tin lúc 22:40. Nam trực kênh. Tối đó xưởng mở, Nam bảo về sớm mà không ai làm chứng. Tớ cá là Nam gửi.". Người chơi trình thẻ trong hồ sơ, hoặc nói "chưa đủ căn cứ".
>   - Trình ev-toi-07 [ĐỦ CĂN CỨ] → **Hà Vy** (neutral): Tối 07/10, cửa từ thư viện ghi Nam vào 21:50, ra 23:05. Tin gửi 22:40. / **Tùng** (surprised): Quẹt vào rồi trèo cửa sổ ra thì sao? / **Hà Vy** (neutral): Tớ ngồi cách cậu ấy hai bàn, cùng tối đó. Tớ nhớ lúc chuông 22 giờ 30 nhắc sắp đóng cửa, cậu ấy còn đang xếp sách. Thẻ của tớ ghi tớ ở đó tới 23 giờ. / **Hà Vy** (neutral): Và máy gửi tin nằm trong phòng văn phòng xưởng, cách thư viện cả một sân trường. / **Minh Anh** (neutral): Cửa từ là nguồn độc lập, có giờ vào giờ ra; lời Vy khớp đúng quãng giữa; chỗ gửi tin thì cách xa. Đủ để không mời Nam lên.
>   - Trình ev-nam-thu [HỖ TRỢ] → **Hà Vy** (thinking): Bốn tối thứ Hai có trong tệp, tối nào Nam cũng ở thư viện. Một thói quen. Thói quen thì chưa phải bằng chứng cho đúng tối đó. / **Tùng** (gai-dau): Thì có thể tối đó cậu ấy nghỉ một hôm.
>   - Trình ev-vy-thu-vien [HỖ TRỢ] → **Hà Vy** (neutral): Tối thứ Hai nào tớ cũng ở thư viện, thẻ của tớ ghi thế. Nên lời tớ kể về tối đó không phải nhớ bừa. / **Duy** (neutral): Lời chứng mà đếm được thì nặng hơn lời chứng suông.
>   - Trình ev-bai-thiet-bi [HỖ TRỢ] → **Hà Vy** (thinking): Tám bài từ điện thoại trực, một bài từ máy văn phòng xưởng. Bài tin đồn khác hẳn thói quen đăng của kênh. / **Tùng** (worried): Khác thói quen thôi. Ai cấm Nam đổi máy một hôm.
>   - Trình ev-tin-goc [GỢI Ý] → **Tùng** (chi-tay): Chính phiếu này nói tài khoản Robotics gửi. Cậu đang củng cố cho tớ đấy. / **Duy** (neutral): Tài khoản. Chưa phải người.
>   - Chưa đủ căn cứ → **Minh Anh** (serious): Chưa đủ để nói Nam không làm, cũng chưa đủ để nói Nam làm. Vậy chị mời Nam lên hỏi. / **Duy** (neutral): Mời lên hỏi thì cũng là một nguồn. Nhưng mình đang thiếu nguồn, không phải thiếu người để hỏi.
>   - Thẻ khác → **Tùng** (worried): Cái này thì liên quan gì tới tối thứ Hai? / **Hà Vy** (thinking): Xem lại hồ sơ đã.
> ⤵ RẼ TỰ ĐỘNG: nếu có dc-nam-du thì sang "Không mời Nam lên; Tùng xin lỗi; lời nhắn thứ ba của chị Linh" (in ở dưới); nếu KHÔNG thì chạy tiếp các dòng ngay sau đây. Hai đường loại trừ nhau, người chơi chỉ thấy một.
- **Minh Anh** (serious): Vậy chị mời Nam lên.
- **Người kể**: Chiều hôm đó, Nam lên phòng CLB. Không nói nhiều, Nam đặt lên bàn tờ bản ghi quẹt thẻ thư viện của mình.
- **Nam** (neutral): Tối mùng 7, 21 giờ 50 vào, 23 giờ 05 ra. Các cậu có cả tờ này rồi mà vẫn gọi tớ lên.
- **Hà Vy** (thinking): …Tối đó tớ cũng ở đấy. Tớ nhớ ra muộn quá.
- **Tùng** (worried): Xin lỗi cậu.
- **Nam** (neutral): Không sao. Lần sau các cậu đọc kỹ hồ sơ trước đã.
> (máy đặt cờ v3-moi-nam-len)

*— Chỉ khi có dc-nam-du (đường rẽ tự động ở trên) —*

###### 📍 Phòng CLB — Không mời Nam lên; Tùng xin lỗi; lời nhắn thứ ba của chị Linh

- **Minh Anh** (neutral): Không mời Nam lên. Chị báo cô Lan: tối đó Nam ở thư viện, có bản ghi và có người cùng ngồi.
- **Tùng** (gai-dau): Khỉ thật… tại cái tài khoản ghi lù lù tên kênh của cậu ấy. Tớ cá trượt, mà lần này trượt đau. Tớ xin lỗi Nam. Lần sau đợi đủ bài mới lật.
- **Duy** (neutral): Cá thì không sao. Kết tội mới sao.
- **Hà Vy** (thinking): Tớ cũng suýt nữa. Nhìn tài khoản thấy tên kênh, nhìn kênh thấy người trực. Mỗi bước nhảy một tí là tới một con người.
- **Minh Anh** (neutral): Hai nguồn riêng cùng khớp một quãng giờ. Lại là "kiểm hai lần" của chị Linh.

###### 📍 Phòng CLB — Hai thói quen, hai người làm chứng cho nhau: mẩu giấy thứ ba

- **Duy** (neutral): Nhắc mới nhớ. Trang "Kiểm hai lần" ấy… hôm trước có một mẩu, để tớ xem lại.
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
- **Minh Anh** (neutral): Chuyện này không chỉ là tin đồn về mình nữa. Các em sang xưởng lần nữa, hỏi xem ai vào được phòng ấy. Hỏi thôi, chưa nghi ai.

###### 📍 Xưởng CLB Robotics — Xưởng, chiều muộn: tờ giao chìa, ba người cần hỏi

- **Người kể**: Chiều muộn, xưởng Robotics. Nam dẫn cả nhóm tới cửa phòng văn phòng. Trên cửa dán một tờ giấy đã ngả màu.
- **Bạn (người chơi)**: "Giao chìa phòng văn phòng." Ba tên: Khánh, Bách, Thảo.
- **Nam** (neutral): Anh Khánh đang họp bên Hội. Anh Bách với chị Thảo thì ở kia.
- **Thảo** (neutral): Phòng ấy chị mở nhiều nhất. Nhưng chìa của chị nằm ngăn bàn ngoài xưởng cả tháng nay, ai mở ngăn cũng lấy được. Chị không chối.
- **Bách** (neutral): Tối mùng 7 anh về quê, vé xe còn giữ. Chìa anh không cho ai mượn.
- **Thảo** (neutral): Còn hỏi chuyện in ấn thì tối Chủ nhật nào chị cũng ra phòng máy in sơ đồ mạch. Tuần nào cũng thế, chị không nhớ nổi từng tuần.
- **Tùng** (gai-dau): Tối Chủ nhật, phòng máy… Tớ không cá. Tớ ghi.
> 🗂️ Giấy nhớ mới: **[Tờ giao chìa: Khánh, Bách, Thảo]** — nguồn: Tờ giấy dán ở cửa phòng, xem cùng Nam cuối Vụ 3
> Tờ giao chìa phòng văn phòng xưởng Robotics ghi ba người giữ chìa: Khánh (trưởng CLB), Bách (phó CLB), Thảo (kỹ thuật). Tờ giấy nói ai có chìa, không nói ai mở cửa tối nào. Bách nói tối 07/10 về quê; Thảo nói chìa của mình để ngăn bàn ngoài xưởng, ai cũng lấy được.
- **Hà Vy** (thinking): Ghi ba tên. Người cần hỏi, chưa phải người bị nghi.
- **Nam** (neutral): Thứ Ba tuần sau tớ kiểm kê kho. Ban tổ chức giải bắt đội nào cũng nộp biên bản kiểm kê trước khi đóng lệ phí, nên lịch anh Khánh phải ký từ mùng 9. Xong việc tớ hỏi tiếp giúp các cậu.
- **Tùng** (neutral): Lần này tớ ghi tên mà không khoanh ai cả.
*[Thẻ chữ]* Nhóm theo cách khác thì thấy chuyện khác. Thói quen đếm được, và đôi khi thói quen của người này là lời chứng cho người kia.
> 🏁 KẾT THÚC vụ → màn kết.

*(tiếp theo như chuỗi "Không phải Nam thì là ai?" đã in ở trên)*

## 🏁 Màn kết
**Nam ở thư viện lúc tin được gửi** — Bản ghi quẹt thẻ của thư viện và trí nhớ của Hà Vy là hai nguồn riêng, cùng đặt Nam ở thư viện lúc 22:40. Người gửi tin ngồi máy văn phòng xưởng, là ai thì chưa biết.