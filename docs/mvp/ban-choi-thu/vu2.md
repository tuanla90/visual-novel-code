# Vụ: Tin đồn

Quy ước: dòng "- **Tên** (biểu cảm): …" là lời thoại hiện từng câu; "🗂️" là thẻ vào hồ sơ (cũng ghim lên bảng điều tra); "💻" là màn tra dữ liệu trên laptop; "❓" là câu hỏi nhiều lựa chọn; "🔀" là rẽ nhánh do người chơi chọn.

## 📍 Phòng CLB — Tin đồn về CLB; lọc các tin mang câu đó

*[Thẻ chữ]* Vụ 2 — Thứ Tư, 9 tháng 10
- **Người kể**: Hơn hai tuần sau buổi họp rà soát. Chiều thứ Tư, phòng CLB.
- **Minh Anh** (serious): Từ tối thứ Hai, kênh sinh viên chuyền nhau một tin về CLB mình. Sáng nay cô Lan gọi chị lên hỏi.
- **Tùng** (surprised): Tin gì thế ạ?
> 🗂️ Tài liệu mới: **Ảnh chụp tin đồn** — nguồn: Cô Lan chuyển cho Minh Anh
> "CLB Thám Tử soi dữ liệu sinh viên"
> Kênh sinh viên Chấn Hưng. Tin được chuyển tiếp nhiều lần từ tối thứ Hai 07/10.
> 🗂️ Giấy nhớ mới: **[Câu tin đồn]** — nguồn: Ảnh chụp tin, Phòng CTSV chuyển về
> Tin nào cũng mở đầu bằng mấy chữ này. Bản xuất của kênh ghi nguyên văn từng tin, nên phần sau có thể dài hơn.
> (giấy nhớ kéo được vào màn tra: CLB Thám Tử soi dữ liệu)
- **Bạn (người chơi)**: "CLB Thám Tử soi dữ liệu sinh viên."
- **Tùng** (worried): Ơ, mình có soi ai đâu. Tra gì cũng có phiếu, lại có anh Quân ngồi giám sát mà.
- **Minh Anh** (khoanh-tay): Thế nên chị mới cần biết tin này bắt đầu từ đâu. Cô Lan cho mình bản xuất các tin công khai của kênh, từ tối thứ Hai tới trưa hôm qua.
- **Duy** (neutral): Tin công khai, ai vào kênh cũng đọc được. Tớ nạp vào laptop rồi. Bản xuất ghi nguyên văn từng tin, kể cả tin bấm chuyển tiếp: bấm chuyển thì chữ giữ y nguyên.
> 🎯 NHIỆM VỤ: Những tin nào trong kênh mang câu tin đồn?
> 💭 Hà Vy nhắc: Lọc ra các tin mang câu đó trước đã. Chưa vội đọc tên ai.
### 💻 Màn tra: Tin đồn trên kênh sinh viên (thẻ `c-tin-don`)
Đề bài trên màn hình: *Kênh sinh viên chuyền nhau một câu về CLB. Những tin nào mang câu đó?*
Cách chơi: kéo giấy nhớ vào ô giá trị, bấm cột / phép ("bằng", "bắt đầu bằng") / VÀ–HOẶC rồi CHẠY. Chạy sai không bị phạt.
Bảng `tin_nhan` (8 dòng):
| ma_tin | thoi_diem | tai_khoan | loai | noi_dung |
|---|---|---|---|---|
| T-01 | 2024-10-07 22:40 | clb_robotics | GOC | CLB Thám Tử soi dữ liệu sinh viên |
| T-02 | 2024-10-07 22:55 | SV240254 | CHUYEN_TIEP | CLB Thám Tử soi dữ liệu sinh viên |
| T-03 | 2024-10-08 07:10 | SV230311 | CHUYEN_TIEP | CLB Thám Tử soi dữ liệu sinh viên |
| T-04 | 2024-10-08 07:30 | SV240213 | GOC | Ai nhặt được thẻ xe ở căng tin |
| T-05 | 2024-10-08 08:02 | SV220118 | CHUYEN_TIEP | CLB Thám Tử soi dữ liệu sinh viên |
| T-06 | 2024-10-08 09:15 | clb_robotics | GOC | Tuyển thành viên đội robot |
| T-07 | 2024-10-08 11:40 | SV240131 | CHUYEN_TIEP | CLB Thám Tử soi dữ liệu sinh viên |
| T-08 | 2024-10-08 12:05 | SV240412 | GOC | Nghe nói CLB Thám Tử soi điểm |
Giấy nhớ đang có quanh màn hình: [CLB Thám Tử soi dữ liệu]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả):
```sql
SELECT ma_tin, thoi_diem, tai_khoan, loai FROM tin_nhan WHERE noi_dung LIKE 'CLB Thám Tử soi dữ liệu%';
```
Kết quả: 5 dòng
| ma_tin | thoi_diem | tai_khoan | loai |
|---|---|---|---|
| T-01 | 2024-10-07 22:40 | clb_robotics | GOC |
| T-02 | 2024-10-07 22:55 | SV240254 | CHUYEN_TIEP |
| T-03 | 2024-10-08 07:10 | SV230311 | CHUYEN_TIEP |
| T-05 | 2024-10-08 08:02 | SV220118 | CHUYEN_TIEP |
| T-07 | 2024-10-08 11:40 | SV240131 | CHUYEN_TIEP |
Lời nhân vật sau mỗi lần chạy:
- Khi ra 0 dòng: **Hà Vy** (thinking): Không dòng nào. Tin trong kênh dài hơn mấy chữ trên giấy nhớ, còn đoạn sau nữa. "Bằng" thì phải khớp cả câu; mình chỉ có mấy chữ đầu thôi.
- Khi ra 8 dòng: **Tùng** (gai-dau): Cả tám tin của kênh. Có cả tin tìm thẻ xe với tin tuyển thành viên.
- Khi đúng: **Hà Vy** (neutral): Năm tin cùng một câu. Ghim lại đã.
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Năm tin mang câu tin đồn** — Kết quả truy vấn: năm tin cùng một câu, từ năm tài khoản. Bốn tài khoản là mã sinh viên, một là clb_robotics. Phiếu chưa nói tin nào có trước.

- **Bạn (người chơi)**: Năm tin mang câu đó, từ năm tài khoản. Bốn cái là mã sinh viên. Một cái là clb_robotics.
- **Tùng** (chi-tay): Lại Robotics! Hôm trước là cái huy hiệu bánh răng, giờ là tài khoản. Tớ cá là…
- **Hà Vy** (day-kinh): Đừng cá. Mới biết có năm tin mang câu đó. Tin nào có trước thì phiếu chưa nói.
- **Minh Anh** (neutral): Kênh của Robotics thì phải có người trực. Các em sang xưởng hỏi xem.

### 📍 Xưởng CLB Robotics — Xưởng Robotics: gặp Nam; lấy phiếu làm nguồn, tìm tin gốc

- **Người kể**: Xưởng của CLB Robotics nằm cuối dãy nhà văn hóa. Một cậu đang ngồi dán nhãn hộp linh kiện, ngẩng lên khi thấy cả nhóm.
- **Nam** (neutral): Các cậu tìm ai? Ban chủ nhiệm chiều nay đi họp cả rồi.
- **Bạn (người chơi)**: Bọn tớ bên CLB Thám Tử. Kênh của Robotics do ai trực thế?
- **Nam** (neutral): Tớ. Tớ là Nam. Bài tuyển thành viên, lịch xưởng, đều tớ đăng.
- **Tùng** (chi-tay): Thế cái tin "CLB Thám Tử soi dữ liệu sinh viên" cũng là cậu đăng à?
- **Nam** (neutral): Tin nào cơ? Cho tớ xem.
- **Nam** (neutral): Năm dòng này lẫn cả tin chuyển tiếp. Chuyển tiếp thì ai cũng bấm được. Muốn biết nó bắt đầu từ đâu thì tìm tin gốc ấy. Kênh có ghi loại của từng tin.
- **Hà Vy** (thinking): Phiếu này mình ghim rồi. Năm tin ấy là đống đã thu hẹp; lọc tiếp ngay trên nó thì chắc chắn chỉ tìm trong đúng năm tin, không lạc sang tin khác của kênh.
> 🎯 NHIỆM VỤ: Trong năm tin đó, tin nào là tin gốc?
> 💭 Hà Vy nhắc: Phiếu vừa ghim dùng làm nguồn được. Lọc tiếp ra tin gốc.
> 🗂️ Giấy nhớ mới: **[Tin gốc]** — nguồn: Nam, người trực kênh của CLB Robotics
> Mỗi tin có một loại: GOC là tin người đó tự viết, CHUYEN_TIEP là tin bấm chuyển lại. Chuyển tiếp thì ai cũng bấm được.
> (giấy nhớ kéo được vào màn tra: GOC)
### 💻 Màn tra: Tin gốc của tin đồn (thẻ `c-tin-goc`)
Đề bài trên màn hình: *Năm tin trên phiếu lẫn cả tin chuyển tiếp. Tin nào là tin gốc?*
Cách chơi: nguồn là PHIẾU đã ghim `ev-tin-don` (câu hiện thành WITH … AS). Kéo giấy nhớ vào ô giá trị, bấm cột / phép ("bằng", "bắt đầu bằng") / VÀ–HOẶC rồi CHẠY.
Giấy nhớ đang có quanh màn hình: [CLB Thám Tử soi dữ liệu] [GOC]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả):
```sql
SELECT ma_tin, thoi_diem, tai_khoan FROM @ev-tin-don WHERE loai = 'GOC';
```
Kết quả: 1 dòng
| ma_tin | thoi_diem | tai_khoan |
|---|---|---|
| T-01 | 2024-10-07 22:40 | clb_robotics |
Lời nhân vật sau mỗi lần chạy:
- Khi ra 0 dòng: **Hà Vy** (thinking): Không dòng nào. Giá trị này có đang nằm đúng cột của nó không nhỉ?
- Khi ra 5 dòng: **Tùng** (gai-dau): Vẫn đủ năm tin. Chưa tách được tin gốc ra.
- Khi đúng: **Hà Vy** (thinking): Còn đúng một tin. Phiếu năm tin vẫn nguyên trên bảng, mình chỉ lọc tiếp trên nó.
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Tin gốc: 22:40 tối 07/10** — Kết quả lọc tiếp trên phiếu năm tin: một tin gốc, gửi 22:40 thứ Hai 07/10 từ tài khoản clb_robotics. Phiếu cho biết tài khoản nào gửi, chưa cho biết ai ngồi gửi. (giấy nhớ: clb_robotics)

- **Bạn (người chơi)**: Một tin gốc. 22 giờ 40 tối thứ Hai, mùng 7. Tài khoản clb_robotics.
- **Nam** (neutral): …Từ kênh của bọn tớ thật à.
- **Tùng** (chi-tay): Kênh của cậu, tài khoản của cậu. Cậu đăng chứ còn ai!
- **Nam** (neutral): Tớ chỉ đăng bài buổi chiều. 22 giờ 40 thì tớ không ngồi kênh.
- **Tùng** (worried): Ai trực kênh mà chẳng nói thế.
- **Nam** (neutral): Thế cậu tưởng mỗi mình tớ có mật khẩu à? Cả ban chủ nhiệm đều biết. Giờ đó xưởng còn mở, ai chả vào máy được, sao cứ đổ cho tớ.
- **Tùng** (chi-tay): Xưởng mở giờ đó? Ngoài cửa dán rành rành cái bảng đăng ký kia kìa. Nói điêu là lộ ngay.
- **Hà Vy** (thinking): Còn mật khẩu nhiều người biết thì kênh có ghi ai đăng nhập không? Không có thì bọn tớ nhờ bên quản trị trường mở.
- **Nam** (neutral): …Khỏi nhờ. Tớ là quản trị kênh, tớ mở nhật ký đăng nhập được. Xem đi, xem cả bảng ngoài cửa luôn.
- **Duy** (neutral): Vậy là hai chỗ kiểm được. Xem cả hai, hay xem một rồi về báo chị Minh Anh, tùy mình.
> 🗂️ Giấy nhớ mới: **[Ngày gửi tin gốc]** — nguồn: Phiếu tin gốc
> Tin gốc gửi lúc 22:40 thứ Hai 07/10/2024. Nhật ký đăng nhập của kênh ghi ngày theo dạng năm-tháng-ngày.
> (giấy nhớ kéo được vào màn tra: 2024-10-07)
> 🔀 Hà Vy: "Hai chỗ Nam vừa buột miệng nói ra. Xem chỗ nào trước?"
>   - Nhật ký đăng nhập của kênh.
>   - Bảng đăng ký dùng xưởng ngoài cửa.

*— Nếu chọn "Nhật ký đăng nhập của kênh." —*

#### 📍 Xưởng CLB Robotics — Tuyến dữ liệu: nhật ký đăng nhập của kênh

> 🎯 NHIỆM VỤ: Ngày 07/10, tài khoản kênh đăng nhập những lần nào, từ máy nào?
> 💭 Hà Vy nhắc: Tài khoản thì có trên phiếu tin gốc. Ngày là mùng 7. Lần nào khớp giờ tin gửi thì so sau.
- **Nam** (neutral): Bảng này ghi tài khoản nào đăng nhập, từ máy nào, ngày nào, giờ nào. Tớ chỉ mở ra thôi, không lọc gì.
- **Nam** (neutral): Mã máy thì thế này: MAY-XUONG-01 và 02 là hai máy bàn ngoài xưởng, ai tập cũng dùng. MAY-VP-XUONG là máy trong phòng văn phòng nhỏ của xưởng, chỗ ban chủ nhiệm ngồi. DIEN-THOAI là đăng nhập bằng điện thoại.
### 💻 Màn tra: Nhật ký đăng nhập của kênh (thẻ `c-tin-may`)
Đề bài trên màn hình: *Trong ngày tin được gửi, tài khoản kênh của Robotics đăng nhập những lần nào, từ máy nào?*
Cách chơi: kéo giấy nhớ vào ô giá trị, bấm cột / phép ("bằng", "bắt đầu bằng") / VÀ–HOẶC rồi CHẠY. Chạy sai không bị phạt.
Bảng `dang_nhap_kenh` (5 dòng):
| tai_khoan | may | ngay | gio |
|---|---|---|---|
| clb_robotics | MAY-XUONG-02 | 2024-10-07 | 15:10 |
| clb_robotics | MAY-VP-XUONG | 2024-10-07 | 22:31 |
| clb_robotics | MAY-XUONG-02 | 2024-10-08 | 09:05 |
| SV240254 | DIEN-THOAI | 2024-10-07 | 22:50 |
| SV240213 | DIEN-THOAI | 2024-10-08 | 07:25 |
Giấy nhớ đang có quanh màn hình: [CLB Thám Tử soi dữ liệu] [GOC] [clb_robotics] [2024-10-07]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả):
```sql
SELECT may, gio FROM dang_nhap_kenh WHERE tai_khoan = 'clb_robotics' AND ngay = '2024-10-07';
```
Kết quả: 2 dòng
| may | gio |
|---|---|
| MAY-XUONG-02 | 15:10 |
| MAY-VP-XUONG | 22:31 |
Lời nhân vật sau mỗi lần chạy:
- Khi ra 0 dòng: **Hà Vy** (thinking): Không dòng nào. Giá trị này có đang nằm đúng cột của nó không nhỉ?
- Khi ra 3 dòng: **Hà Vy** (thinking): Ba dòng. Vẫn còn dòng không thuộc đúng tài khoản ấy, hoặc không đúng ngày ấy.
- Khi ra 5 dòng: **Tùng** (gai-dau): Cả năm lần đăng nhập của mọi tài khoản.
- Khi đúng: **Hà Vy** (neutral): Hai lần trong ngày mùng 7. 15 giờ 10 từ máy xưởng số 2, 22 giờ 31 từ máy văn phòng xưởng.
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Hai lần đăng nhập ngày 07/10** — Kết quả truy vấn: tài khoản clb_robotics đăng nhập 15:10 từ máy xưởng số 2 và 22:31 từ máy văn phòng xưởng. Tin gốc gửi lúc 22:40. Phiếu cho biết máy nào, chưa cho biết ai ngồi máy.

- **Bạn (người chơi)**: Ngày mùng 7 có hai lần. 15 giờ 10 từ máy xưởng số 2. 22 giờ 31 từ máy văn phòng xưởng.
- **Nam** (neutral): Lần buổi chiều là tớ, tớ hay ngồi máy số 2. Lần buổi tối thì không phải tớ. Phòng văn phòng là phòng riêng, thường khóa, chìa thì ban chủ nhiệm giữ. Tớ có vào đó bao giờ đâu.
- **Hà Vy** (thinking): Đăng nhập 22:31, tin gửi 22:40. Khớp giờ. Nhưng mới biết máy nào, chưa biết ai ngồi máy.
> (nếu có ev-tin-xuong → sang "Đã xem bảng xưởng rồi mới xem nhật ký: Tùng đối chiếu hai nguồn")
> 🔀 Hà Vy: "Còn chỗ thứ hai Nam chỉ: bảng đăng ký dùng xưởng. Xem nốt, hay về báo chị Minh Anh?"
>   - Ra cửa xem nốt bảng đăng ký.
>   - Về báo chị Minh Anh.

*— Nếu có ev-tin-xuong —*

##### 📍 Xưởng CLB Robotics — Đã xem bảng xưởng rồi mới xem nhật ký: Tùng đối chiếu hai nguồn

- **Tùng** (chi-tay): Khoan! Bảng xưởng ghi tối đó đội thi đấu tập tới 23 giờ, cậu bảo cậu về sớm. Mà 22 giờ 31 tài khoản của cậu đăng nhập ngay trong phòng văn phòng xưởng. Giải thích đi!
- **Nam** (neutral): …Tài khoản của kênh, không phải của tớ. Tớ về trước 22 giờ. Phòng văn phòng thường khóa, chìa ban chủ nhiệm giữ, tớ không có.
- **Hà Vy** (thinking): Hai nguồn khớp nhau ở một chỗ: 22 giờ 31, máy văn phòng xưởng, lúc xưởng đang mở. Chúng không nói ai ngồi đó. Tùng, cậu đang ghép hai bảng với một người, mà bảng nào cũng không có tên người.
- **Tùng** (gai-dau): …Ừ thì chưa có tên.

###### 📍 Phòng CLB — Về phòng CLB báo lại

> (nếu (có ev-tin-may và có ev-tin-xuong) → sang "Về phòng CLB báo lại, đủ hai hướng")
- **Minh Anh** (neutral): Thế nào rồi?
- **Bạn (người chơi)**: Tin gốc gửi lúc 22:40 tối thứ Hai, từ tài khoản kênh của CLB Robotics ạ.
- **Hà Vy** (neutral): Nam nói ra hai chỗ kiểm được. Bọn em mới xem một, chỗ kia chưa xem.
- **Minh Anh** (khoanh-tay): Một nguồn thì chị chưa nói với cô Lan được. Nói có sách, mách có chứng: chứng phải hai. Các em quay lại xưởng, xem nốt chỗ kia rồi về.
- **Tùng** (gai-dau): Biết thế xem luôn cho rồi.
> (máy đặt cờ tin-ve-som)
> (nếu có ev-tin-may → sang "Tuyến hiện trường: bảng đăng ký dùng xưởng")

*— Nếu (có ev-tin-may và có ev-tin-xuong) —*

###### 📍 Phòng CLB — Về phòng CLB báo lại, đủ hai hướng

- **Minh Anh** (neutral): Thế nào rồi?
- **Bạn (người chơi)**: Tin gốc gửi lúc 22:40 tối thứ Hai, từ tài khoản kênh của CLB Robotics ạ. Tài khoản ấy đăng nhập lúc 22:31 từ máy văn phòng xưởng. Tối đó xưởng đăng ký mở tới 23 giờ.
- **Hà Vy** (smile): Nam nói ra hai chỗ kiểm được, bọn em xem cả hai. Giờ và chỗ khớp nhau, còn tên người thì không nguồn nào có.
- **Minh Anh** (neutral): Hai nguồn riêng cùng khớp. Đến đây dữ liệu dừng, không phải mình non. Muốn biết ai ngồi máy thì phải hỏi người, không hỏi bảng. Cái nguyên tắc "kiểm hai lần" ấy chị học từ sổ chị Linh để lại.
- **Duy** (neutral): Nhắc mới nhớ. Trang "Kiểm hai lần" trong sổ… khoan đã.
> (nếu có tin-ve-som → sang "Nói chắc được điều gì; cả nhóm bắt đầu chia ý về Nam")
> 🗂️ Giấy nhớ mới: **[Lời nhắn chị Linh, mẩu thứ hai]** — nguồn: Sổ tự học của chị Linh, phòng CLB
> Chữ chị Linh: "Sổ này chị chép lại từ một cuốn cũ hơn. Cuốn cũ không phải của chị."
- **Duy** (neutral): Kẹp ở trang "Kiểm hai lần". Một mẩu giấy, chữ chị Linh.
- **Bạn (người chơi)**: "Sổ này chị chép lại từ một cuốn cũ hơn. Cuốn cũ không phải của chị."
- **Tùng** (surprised): Thế cuốn cũ là của ai?
- **Hà Vy** (thinking): Chưa biết. Cất vào hồ sơ đã.

*— Nếu có tin-ve-som —*

###### 📍 Phòng CLB — Nói chắc được điều gì; cả nhóm bắt đầu chia ý về Nam

> ❓ Minh Anh hỏi: "Vậy tới giờ, mình nói chắc được điều gì?" (chọn sai thì nghe phản hồi rồi chọn lại)
>   - Tin gốc gửi từ tài khoản kênh của CLB Robotics, 22:40 tối 07/10. Ai ngồi gửi thì chưa biết. ✅ → **Minh Anh** (neutral): Đúng chừng ấy. Chị báo cô Lan cũng đúng chừng ấy.
>   - Nam là người gửi, vì Nam trực kênh. → **Hà Vy** (thinking): Trực kênh là việc được giao. Trên phiếu có dòng nào ghi ai ngồi gửi không?
>   - CLB Robotics cố tình tung tin để hại CLB mình. → **Hà Vy** (day-kinh): Phiếu ghi một tài khoản với một giờ gửi. "Cố tình" với "cả CLB" thì cột nào nói?
- **Tùng** (chi-tay): Nhưng mà Nam trực kênh. Tớ vẫn cá là Nam.
- **Minh Anh** (serious): Chị không nói là Nam. Nhưng Nam là đầu mối duy nhất mình đang có. Phải hỏi cho ra.
- **Duy** (neutral): Còn một chuyện mới: phòng văn phòng xưởng thường khóa, chìa ban chủ nhiệm giữ. Người ngồi máy đó tối thứ Hai có chìa, hoặc được mở cửa cho.
- **Hà Vy** (thinking): Khoan. Mật khẩu thì cả ban chủ nhiệm đều biết mà.
- **Duy** (neutral): Tớ thì chờ thêm một nguồn nữa rồi mới nói.
*[Thẻ chữ]* Một tài khoản chưa phải là một con người. Bản ghi cho biết tài khoản nào gửi, chưa cho biết ai ngồi gửi.
> 🏁 KẾT THÚC vụ → màn kết.

*(tiếp theo như chuỗi "Nói chắc được điều gì; cả nhóm bắt đầu chia ý về Nam" đã in ở trên)*

*— Nếu có ev-tin-may —*

###### 📍 Xưởng CLB Robotics — Tuyến hiện trường: bảng đăng ký dùng xưởng

- **Người kể**: Cạnh cửa xưởng có tấm bảng đăng ký dùng xưởng, kín chữ viết tay. Góc bảng ghi "bản sao từ lịch đặt xưởng trên máy".
- **Duy** (neutral): Khoan, góc bảng ghi "bản sao từ lịch đặt xưởng trên máy". Cổng tra cứu lịch của nhà văn hóa mở cho sinh viên, để tớ tải bản gốc về laptop tra cho chắc. Chữ tay dễ chép nhầm.
> 🎯 NHIỆM VỤ: Tối 07/10, xưởng được đăng ký từ mấy giờ tới mấy giờ, cho hoạt động nào?
> 💭 Hà Vy nhắc: Ngày là mùng 7. Lịch đặt xưởng ghi theo ngày.
> 🗂️ Tài liệu mới: **Bảng đăng ký dùng xưởng** — nguồn: Dán cạnh cửa xưởng CLB Robotics
> Bảng viết tay dán cạnh cửa xưởng, góc ghi "bản sao từ lịch đặt xưởng trên máy". Tuần 07/10 kín chữ: đội thi đấu tập ba tối, sinh hoạt thành viên chiều thứ Ba, dọn xưởng sáng thứ Bảy.
### 💻 Màn tra: Lịch đặt xưởng, tuần 07/10 (thẻ `c-tin-xuong`)
Đề bài trên màn hình: *Lịch đặt xưởng của nhà văn hóa. Tối 07/10 xưởng được đăng ký từ mấy giờ tới mấy giờ, cho hoạt động nào?*
Cách chơi: kéo giấy nhớ vào ô giá trị, bấm cột / phép ("bằng", "bắt đầu bằng") / VÀ–HOẶC rồi CHẠY. Chạy sai không bị phạt.
Bảng `dat_xuong` (6 dòng):
| ngay | thu | tu_gio | den_gio | muc_dich |
|---|---|---|---|---|
| 2024-10-07 | THU_HAI | 19:00 | 23:00 | Đội thi đấu tập |
| 2024-10-08 | THU_BA | 14:00 | 17:00 | Sinh hoạt thành viên |
| 2024-10-09 | THU_TU | 19:00 | 21:00 | Đội thi đấu tập |
| 2024-10-10 | THU_NAM | 14:00 | 16:00 | Hướng dẫn thành viên mới |
| 2024-10-11 | THU_SAU | 19:00 | 21:30 | Đội thi đấu tập |
| 2024-10-12 | THU_BAY | 08:00 | 11:00 | Dọn xưởng |
Giấy nhớ đang có quanh màn hình: [CLB Thám Tử soi dữ liệu] [GOC] [clb_robotics] [2024-10-07]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả):
```sql
SELECT ngay, tu_gio, den_gio, muc_dich FROM dat_xuong WHERE ngay = '2024-10-07';
```
Kết quả: 1 dòng
| ngay | tu_gio | den_gio | muc_dich |
|---|---|---|---|
| 2024-10-07 | 19:00 | 23:00 | Đội thi đấu tập |
Lời nhân vật sau mỗi lần chạy:
- Khi ra 0 dòng: **Hà Vy** (thinking): Không dòng nào. Lịch ghi ngày theo dạng năm-tháng-ngày, giấy nhớ cũng vậy. Giá trị có nằm đúng cột không?
- Khi ra 6 dòng: **Tùng** (gai-dau): Cả tuần. Mình chỉ cần tối mùng 7.
- Khi đúng: **Duy** (neutral): Một dòng: tối mùng 7, 19 giờ tới 23 giờ, đội thi đấu tập.
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Tối 07/10 xưởng mở tới 23 giờ** — Kết quả truy vấn: thứ Hai 07/10, xưởng đăng ký từ 19:00 tới 23:00 cho đội thi đấu tập. Đây là lịch đăng ký, chưa cho biết ai thật sự có mặt.

> 🗂️ Giấy nhớ mới: **[Xưởng mở tới 23 giờ]** — nguồn: Bảng đăng ký dùng xưởng
> Tối thứ Hai 07/10 xưởng đăng ký mở từ 19 giờ tới 23 giờ cho đội thi đấu tập. Tin gốc gửi lúc 22:40. Đây là lịch đăng ký, chưa cho biết ai thật sự có mặt, càng chưa cho biết ai ngồi máy.
- **Bạn (người chơi)**: Thứ Hai mùng 7, từ 19 giờ tới 23 giờ: xưởng đăng ký cho đội thi đấu tập.
- **Nam** (neutral): Tối đó đội ở lại tập. Tớ cũng trong đội, nhưng tớ về sớm.
- **Tùng** (gai-dau): Về sớm thì ai làm chứng cho cậu?
- **Nam** (neutral): Bọn nó cắm mặt hàn mạch, có ai ngẩng lên xem tớ về lúc nào. Với lại máy văn phòng đặt trong phòng riêng, thường khóa. Chìa do ban chủ nhiệm giữ, thành viên như tớ không có quyền đụng vào. Tớ về rồi thì ai vào đó ngồi, tớ chịu.
- **Hà Vy** (thinking): Tối đó xưởng có người tới 23 giờ, tin gửi 22:40. Nhưng đây là lịch đăng ký. Đăng ký chưa chắc là có mặt, có mặt cũng chưa chắc là ngồi máy, và ngồi máy trong phòng khóa thì phải có chìa.
> (nếu có ev-tin-may → sang "Đã xem nhật ký rồi mới xem bảng xưởng: Tùng đối chiếu hai nguồn")
> 🔀 Hà Vy: "Còn chỗ thứ nhất Nam chỉ: nhật ký đăng nhập của kênh. Xem nốt, hay về báo chị Minh Anh?"
>   - Xem nốt nhật ký đăng nhập.
>   - Về báo chị Minh Anh.

*— Nếu có ev-tin-may —*

###### 📍 Xưởng CLB Robotics — Đã xem nhật ký rồi mới xem bảng xưởng: Tùng đối chiếu hai nguồn

- **Tùng** (chi-tay): Khoan! Nhật ký kênh ghi 22 giờ 31 tài khoản đăng nhập từ máy văn phòng xưởng. Giờ bảng này ghi tối đó xưởng mở tới 23 giờ cho đội tập. Cậu bảo cậu về sớm?
- **Nam** (neutral): Về trước 22 giờ. Còn phòng văn phòng thì thường khóa, chìa ban chủ nhiệm giữ, tớ không có.
- **Hà Vy** (thinking): Hai nguồn khớp nhau ở một chỗ: 22 giờ 31, máy văn phòng xưởng, lúc xưởng đang mở. Chúng không nói ai ngồi đó. Tùng, cậu đang ghép hai bảng với một người, mà bảng nào cũng không có tên người.
- **Tùng** (gai-dau): …Ừ thì chưa có tên.

*(tiếp theo như chuỗi "Về phòng CLB báo lại" đã in ở trên)*

*— Nếu chọn "Xem nốt nhật ký đăng nhập." —*

*(tiếp theo như chuỗi "Tuyến dữ liệu: nhật ký đăng nhập của kênh" đã in ở trên)*

*— Nếu chọn "Về báo chị Minh Anh." —*

*(tiếp theo như chuỗi "Về phòng CLB báo lại" đã in ở trên)*

*(tiếp theo như chuỗi "Tuyến dữ liệu: nhật ký đăng nhập của kênh" đã in ở trên)*

*— Nếu chọn "Ra cửa xem nốt bảng đăng ký." —*

*(tiếp theo như chuỗi "Tuyến hiện trường: bảng đăng ký dùng xưởng" đã in ở trên)*

*— Nếu chọn "Về báo chị Minh Anh." —*

*(tiếp theo như chuỗi "Về phòng CLB báo lại" đã in ở trên)*

*— Nếu chọn "Bảng đăng ký dùng xưởng ngoài cửa." —*

*(tiếp theo như chuỗi "Tuyến hiện trường: bảng đăng ký dùng xưởng" đã in ở trên)*

## 🏁 Màn kết
**Một tài khoản, chưa phải một người** — Tin gốc đi từ tài khoản kênh của CLB Robotics, lúc 22:40 tối thứ Hai. Bản ghi cho biết tài khoản nào gửi, chưa cho biết ai ngồi gửi.