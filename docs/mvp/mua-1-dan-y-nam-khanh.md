# Mùa 1 — dàn ý mới: tuyến Nam và Khánh

> Bản nháp ngày 01/10/2026, theo trao đổi với user. Thay cho phần Vụ 2 đến Vụ 5 của `mua-1-kich-ban-ready-dev.md`. Chưa dựng vào game.
> Mọi câu SQL dưới đây đã chạy thật bằng `python tools/kiem-mua1-dan-y.py` (15 câu, đều khớp). Dữ liệu trong tool là bản nháp.

## 1. Khung mùa

- **Bí ẩn chính (ai cũng đi qua):** ai đứng sau lá thư, và vì sao. Đáp án: Khánh, trưởng CLB Robotics. Mỗi vụ chính hé một phần.
- **Lớp bí mật (phần thưởng kết thật):** bí mật của chính CLB Thám Tử và chị Linh. Không dính tới Robotics. Để mở cho mùa sau.
- **Nhiệm vụ phụ:** NPC giao việc, không dính truyện, để rèn kỹ năng.
- **Nam:** thành viên CLB Robotics, năm 2, lo sổ sách của xưởng. Sau mùa này thay Khánh làm trưởng CLB.

| Vụ | Sự việc | Kỹ năng mới | Mảnh ghép | Câu hỏi để lại |
|---|---|---|---|---|
| 1 | Lá thư có chữ ký H | Lọc, VÀ và HOẶC | Bóng một nam sinh đeo huy hiệu Robotics | Robotics dính gì tới lá thư? |
| 2 | Tin đồn về CLB lan trên kênh sinh viên | Phiếu làm nguồn (CTE), song tuyến | Tin gốc gửi từ tài khoản chung của Robotics, ban đêm, từ máy văn phòng xưởng | Nam có phải người gửi? |
| 3 | Cả nhóm tranh cãi về Nam | Nhóm và đếm | Nam ở thư viện lúc tin được gửi. Tin gửi từ máy văn phòng xưởng, không phải điện thoại Nam giữ. | Không phải Nam thì là ai? |
| 4 | Giúp Nam: đơn đặt hàng đứng tên Nam | Nối bảng, rồi nhóm lại | Có người mượn tên Nam, cũng từ máy văn phòng xưởng, cũng ban đêm | Ai mượn danh, để làm gì? |
| 5 | Nam đếm kho thấy thiếu | Tổng, trung bình, lọc nhóm | Ba đơn không có hàng, tiền lấy từ quỹ CLB Thám Tử, Khánh duyệt | Bí mật của CLB (mùa sau) |

## 2. Vụ 1 — phải sửa gì

Hiện kết thật cho biết tài khoản in thư là SV210745 và Hà Vy đọc ra "năm tư"; chú Cường tả "dáng sinh viên khóa trên". Giữ vậy thì Vụ 3 mất cú lật, và manh mối Robotics chỉ người chơi kết thật mới có.

- **Manh mối Robotics lên đường chính.** Lời chú Cường (cậu sinh viên đeo huy hiệu bánh răng đưa phong bì) thành cảnh bắt buộc của ngày 5, bỏ chữ "khóa trên". Không nói năm.
- **Nhật ký in vẫn là điều kiện kết thật**, vẫn chứng minh Hoài không in thư. Đổi tài khoản in thành một mã không lộ khóa học (đề xuất: tài khoản dùng chung `clb_robotics`).
- **Phần thưởng kết thật đổi thành mảnh đầu của lớp bí mật:** lời nhắn chị Linh trong cuốn sổ, kiểu "Căn phòng này giữ nhiều hơn em nghĩ" (có sẵn trong bản thiết kế gốc).
- Bỏ câu "người soạn thư, thầy sẽ gặp riêng" và cảnh anh khóa trên ở cổng trường. Sửa câu mở Vụ 2 tôi đã viết.

## 3. Vụ 2 — Tin đồn

**Sự việc.** Một tin "CLB Thám Tử soi dữ liệu sinh viên" lan trên kênh sinh viên. Minh Anh cần biết nó bắt đầu từ đâu.

**Lần tra 1, lưu thành phiếu:** các tin mang nội dung đó. 5 dòng.

```sql
SELECT ma_tin, thoi_diem, tai_khoan, loai FROM tin_nhan WHERE noi_dung LIKE 'CLB Thám Tử soi dữ liệu%';
```

**Gặp Nam.** Nam trực kênh của CLB Robotics, nên trông đáng ngờ. Nam nói hai điều, mỗi điều mở một tuyến:

- "Tin chuyển tiếp thì ai cũng bấm được. Tìm tin gốc ấy." Người chơi lấy phiếu làm nguồn, lọc tiếp. 1 dòng: T-01, 22:40 tối 07/10, tài khoản `clb_robotics`.

```sql
WITH tin_don AS (SELECT ma_tin, thoi_diem, tai_khoan, loai FROM tin_nhan WHERE noi_dung LIKE 'CLB Thám Tử soi dữ liệu%')
SELECT ma_tin, thoi_diem, tai_khoan FROM tin_don WHERE loai = 'GOC';
```

- "Tài khoản đó cả ban chủ nhiệm biết mật khẩu." Tuyến A: tra nhật ký đăng nhập, ra máy văn phòng xưởng lúc 22:31. Tuyến B: hỏi bác bảo vệ nhà xưởng, tối đó xưởng sáng đèn tới khuya.

```sql
SELECT may, gio FROM dang_nhap_kenh WHERE tai_khoan = 'clb_robotics' AND ngay = '2024-10-07' AND gio LIKE '22%';
```

Hai tuyến hội tụ: tin gửi từ xưởng, ban đêm. Đi tuyến nào trước cũng được.

**Ghi chú thật thà:** hai bước lọc này gộp được thành một câu có VÀ. Lý do dùng phiếu làm nguồn là nhịp chơi: manh mối thứ hai đến sau, người chơi lọc tiếp trên đống đã có.

## 4. Vụ 3 — Tranh cãi trong nhóm

**Sự việc.** Không có buổi họp với trường. Cả nhóm ngồi trong phòng CLB, mỗi người đọc cùng một dữ kiện theo một cách:

- **Tùng** kết luận vội: tin gửi từ tài khoản Robotics, Nam trực kênh, vậy là Nam.
- **Minh Anh** không kết tội. Chị muốn tìm ra người gửi nên đẩy việc điều tra: Nam là đầu mối duy nhất, phải hỏi cho ra, và chị cần biết đã đủ để mời Nam lên chưa.
- **Hà Vy** đòi xem lại cách đếm trước đã.
- **Duy** chờ một nguồn thứ hai ngoài dữ liệu.

Người chơi đi hỏi bên ngoài rồi trình bằng chứng. Dùng màn đối chất đã có, giả thuyết là câu của Tùng.

**Hướng chính tôi đề xuất: cùng một bảng, nhóm hai cách.** Ý này lấy từ kho tham khảo ("hai người đọc cùng dữ liệu nhưng nhóm khác nhau" và "một thói quen tưởng không đáng kể"). Nam cho xem các bài đăng của kênh Robotics trong tháng. Người chơi nhóm theo thiết bị gửi, rồi nhóm theo buổi:

```sql
SELECT thiet_bi, COUNT(*) AS so_bai FROM bai_dang_robotics GROUP BY thiet_bi;
SELECT buoi, COUNT(*) AS so_bai FROM bai_dang_robotics GROUP BY buoi;
```

Cả hai cách đều tách riêng đúng một bài: 8 bài gửi buổi chiều từ điện thoại trực kênh (thói quen của Nam), 1 bài gửi buổi tối từ máy văn phòng xưởng. Đây là chỗ dạy nhóm và đếm: cách nhóm quyết định mình nhìn thấy gì.

**Nguồn độc lập: dấu vết đời thường.** Sổ quẹt thẻ thư viện ghi Nam vào lúc 21:50, ra lúc 23:05 tối 07/10. Tin gửi lúc 22:40.

```sql
SELECT ten, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ten = 'Nam' AND ngay = '2024-10-07';
```

| Thẻ | Nguồn | Mức |
|---|---|---|
| Sổ thư viện: Nam ở thư viện từ 21:50 tới 23:05 | Cô thủ thư, tra sổ quẹt thẻ | Đủ căn cứ |
| Phiếu nhóm theo thiết bị: bài đó không gửi từ điện thoại Nam giữ | Tra bài đăng | Hỗ trợ |
| Phiếu nhóm theo buổi: Nam chưa đăng bài nào buổi tối | Tra bài đăng | Hỗ trợ |
| Tin gốc gửi từ tài khoản Robotics | Phiếu Vụ 2 | Gợi ý (chính là căn cứ của Tùng) |

Kết luận được phép: Nam không gửi tin đó. Người gửi dùng máy văn phòng xưởng buổi tối. Chưa biết là ai.

**Các hướng khác đã cân nhắc** (dùng thay hoặc thêm làm thẻ hỗ trợ):

| Hướng | Ý | Vì sao chưa chọn làm chính |
|---|---|---|
| Chìa khóa xưởng (ý của user) | Thành viên thường không được nhận chìa buổi tối | Dễ chỉ thẳng vào trưởng CLB quá sớm. Dùng được nếu để ba người ban chủ nhiệm cùng có chìa. Câu tra đã có sẵn trong tool. |
| Lịch trực kênh | Tối 07/10 không phải ca của Nam | Lịch là dự định, không phải việc đã xảy ra. Chỉ ở mức gợi ý. |
| Cách viết | Bài của Nam luôn có chữ ký trực kênh, tin đồn thì không | Không tra được bằng dữ liệu, chỉ là quan sát bằng mắt. Hợp làm chi tiết để soi ở hiện trường. |
| Hai cách giải thích cùng khớp | "Nam gửi" và "ai đó dùng tài khoản chung" đều khớp phiếu Vụ 2 | Đây là khung của cả vụ, không phải một bằng chứng. |

## 5. Vụ 4 — Giúp Nam

**Sự việc.** Người chơi mang kết quả Vụ 3 tới Nam. Nam không biết gì, và quyết tìm cho ra. Nam mở sổ đặt linh kiện của xưởng.

**Thống kê trước:** Nam đứng tên 5 đơn, nhiều nhất. Nam nói mình chỉ đặt 2.

```sql
SELECT nguoi_dat, COUNT(*) AS so_don FROM don_linh_kien GROUP BY nguoi_dat;
```

**Manh mối mới:** mỗi đơn có mã phiên đăng nhập. Mã đó dẫn sang bảng phiên đăng nhập, phải nối theo mã phiên rồi đếm lại theo máy.

```sql
SELECT p.may, COUNT(*) AS so_don FROM don_linh_kien d JOIN phien_dang_nhap p ON d.ma_phien = p.ma_phien
WHERE d.nguoi_dat = 'Nam' GROUP BY p.may;
```

Ra 2 dòng: 2 đơn từ máy xưởng (của Nam thật), 3 đơn từ máy văn phòng xưởng. Cùng cái máy đã gửi tin đồn. Nam có lý do riêng để điều tra cùng: tên mình bị mượn.

## 6. Vụ 5 — Linh kiện không có trong kho

**Sự việc.** Nam kiểm kê xưởng, đếm tay từng loại linh kiện, rồi so với sổ đặt mua. Số không khớp.

**Lần tra 1: đặt mua mà trong xưởng không có.** Nối sổ đặt mua với bảng kiểm kê của Nam. Ra 3 đơn: động cơ servo, mạch điều khiển, bộ khung nhôm. Cả ba đứng tên Nam, đúng ba đơn tạo từ máy văn phòng xưởng ở Vụ 4.

```sql
SELECT d.ma_don, d.linh_kien, d.so_luong, k.so_luong_co FROM don_linh_kien d JOIN kiem_ke k ON d.linh_kien = k.linh_kien
WHERE k.so_luong_co = 0 ORDER BY d.ma_don;
```

Linh kiện chỉ là cái cớ ghi vào sổ. Hàng chưa từng về.

**Lần tra 2: tiền từ đâu, ai duyệt.**

```sql
SELECT c.nguoi_duyet, COUNT(*) AS so_khoan, SUM(c.so_tien) AS tong, AVG(c.so_tien) AS trung_binh
FROM khoan_chi c JOIN quy q ON c.ma_quy = q.ma_quy
WHERE q.clb = 'THAM_TU' GROUP BY c.nguoi_duyet HAVING SUM(c.so_tien) > 1000000;
```

Trước khi lọc nhóm: Minh Anh duyệt 3 khoản, tổng 450.000, trung bình 150.000; Khánh duyệt 3 khoản, tổng 2.400.000, trung bình 800.000. Sau khi lọc nhóm vượt một triệu: còn Khánh. Ba khoản đó chính là ba đơn không có hàng.

**Lời giải của cả mùa.** Khánh lấy tiền quỹ CLB Thám Tử cho việc riêng, ghi vào sổ là mua linh kiện và đứng tên Nam. Nếu CLB Thám Tử mất phòng và giải thể thì không ai mở lại sổ quỹ ấy. Vì thế mới có lá thư và tin đồn. Việc này cũng giải thích tờ báo cáo "hoạt động yếu" ở Vụ 1: quỹ có chi mà không có hoạt động.

**Kết.** Dữ liệu chỉ ra ai cần hỏi; Khánh tự nhận, không nêu việc riêng là gì trước cả nhóm. Hai CLB dùng chung phòng. CLB Robotics về tay Nam.

**Chỗ còn hở:** vì sao trưởng CLB Robotics duyệt được khoản chi của quỹ CLB Thám Tử. Cần một lý do trong thế giới truyện, ví dụ Khánh giữ vai thủ quỹ chung của khối CLB.

Trung bình trong SQLite ra số thập phân (800000.0). Dữ liệu đã chọn để chia hết; màn kết quả cần hiện gọn.

## 7. Nhiệm vụ phụ

| Nhiệm vụ | NPC giao | Rèn | Trạng thái |
|---|---|---|---|
| Sổ sử dụng phòng | Duy | Gọt chữ, xếp theo | Đã dựng (đang là "Vụ 2"), cần chuyển thành nhiệm vụ phụ |
| Chiếc micro | Duy | Nối bảng | Có đặc tả ở gói cũ |
| Khoản hoàn tiền | Minh Anh hoặc Quân | Nhóm, đếm, tổng | Có đặc tả ở gói cũ |
| Sáu bài luyện nhỏ | Tùng, Hà Vy, Duy | Mỗi bài một phép | Có đặc tả ở gói cũ |

Luật: vụ chính không được đòi kỹ năng chỉ dạy ở nhiệm vụ phụ.

## 8. Việc phải làm ở máy

- Gộp nhánh này với nhánh chính (phiên kia đã có phiếu làm nguồn và màn nhóm, đếm).
- Chỗ nhận nhiệm vụ phụ giữa các vụ chính.
- Khối nối bảng; khối tổng, trung bình, lọc nhóm.
- Song tuyến ở Vụ 2: hai chuỗi hội tụ, máy hiện đã làm được bằng rẽ nhánh.

## 9. Bổ sung sau trao đổi (01/10, tối)

### 9.1. Vụ 3 nhóm theo thứ: thói quen của người này là ngoại phạm của người kia

Thay cho câu lọc đơn ở sổ thư viện. Sổ quẹt thẻ có sẵn cột `thu` (không dùng hàm tách ngày, vì hàm ngày giờ nằm ngoài phạm vi mùa 1).

```sql
SELECT ten, thu, COUNT(*) AS so_lan FROM quet_the_thu_vien GROUP BY ten, thu;
SELECT ten, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ngay = '2024-10-07' ORDER BY ten;
```

Câu đầu cho thấy hai thói quen: tối thứ Hai nào Nam cũng ở thư viện (4 lần), và Hà Vy cũng vậy (4 lần). Câu sau: tối 07/10 là thứ Hai, Hà Vy ở thư viện từ 20:00 tới 23:00, Nam từ 21:50 tới 23:05. Tin gửi lúc 22:40.

Thói quen học tối thứ Hai của Hà Vy thành lời chứng cho Nam: Hà Vy nhớ ra cậu bạn ngồi bàn bên cửa sổ tuần nào cũng tới muộn. Nó cũng giải thích vì sao Hà Vy là người dè dặt từ đầu vụ. Dữ liệu là nguồn chính; trí nhớ của Hà Vy là nguồn thứ hai.

Bài đăng của kênh vẫn nhóm theo buổi như mục 4 (8 bài buổi chiều, 1 bài buổi tối). Vậy cả vụ dạy nhóm trên ba cột khác nhau: thiết bị, buổi, thứ.

### 9.2. Khánh là chủ tịch Hội sinh viên

Đề xuất: Khánh là chủ tịch Hội sinh viên, **kiêm** trưởng CLB Robotics (xuất thân từ đội robot, năm 4 vẫn giữ ghế).

- Vá được chỗ hở ở mục 6: quỹ các CLB do Hội sinh viên giữ, nên Khánh duyệt được khoản chi của quỹ CLB Thám Tử.
- Khớp ngược với Vụ 1: chính Hội sinh viên cử Quân xuống giám sát CLB sau lá thư. Lá thư cho Hội sinh viên cái cớ để vào cuộc.
- Quân có tuyến riêng: người giữ quy trình phát hiện cấp trên của mình là người sai, và chọn đứng về phía bằng chứng.
- Vẫn giữ được việc Nam thay Khánh làm trưởng CLB Robotics.
- Cái giá: việc sai nặng hơn (người đứng đầu Hội sinh viên dùng quỹ cho việc riêng). Kết mùa cần thầy Quang xử lý đúng mực; Khánh tự nhận, không bị bêu.

### 9.3. Bí mật của CLB và vai chị Linh

Đề xuất chính: **vụ án đầu tiên của CLB là một kết luận sai.**

- CLB Thám Tử do thầy Quang lập thời sinh viên. Vụ đầu tiên, CLB kết luận vội từ một bản ghi khớp và làm oan một người. Câu "Căn cứ vào đâu?" của thầy và nguyên tắc "dữ liệu chỉ ra ai cần hỏi" sinh ra từ lỗi đó.
- Hồ sơ vụ ấy nằm trong ngăn tủ khóa ở phòng CLB. Đây là nghĩa của lời nhắn "Căn phòng này giữ nhiều hơn em nghĩ".
- Chị Linh là chủ nhiệm trước Minh Anh, người viết cuốn sổ tự học. Năm ngoái chị tìm ra hồ sơ và lặng lẽ lần lại vụ cũ. CLB "hoạt động yếu" một phần vì chị dồn sức vào đó. Mùa 1 chị vắng mặt, chỉ hiện qua sổ và lời nhắn.
- Mùa của chị Linh: mở lại vụ cũ, sửa một kết luận sai. Hợp với kỹ năng nâng cao hơn (lịch sử bản ghi, phiên bản, mã phòng đã đổi tên), đều có trong kho tham khảo.

Cách phát thưởng: mỗi vụ chính có một điều kiện "làm kỹ hơn mức đủ" (như nhật ký in ở Vụ 1). Đạt thì nhận một lời nhắn của chị Linh. Đủ năm lời nhắn thì mở được ngăn tủ: hồ sơ viết tay của thầy Quang, và dòng chị Linh viết thêm "Manh mối cũ, câu hỏi mới".

Lớp này không dính tới Robotics, và soi lại đúng bài học của Vụ 3: suýt nữa cả nhóm lặp lại lỗi của vụ đầu tiên với Nam.

Phương án đã loại: chị Linh rời CLB vì bị Khánh ép. Nó buộc lớp bí mật vào Robotics, trái ý user.

## 10. Đã chốt và còn chờ

Đã chốt 01/10: cách sửa Vụ 1; động cơ của Khánh (lấy tiền quỹ cho việc riêng, linh kiện là cớ); Minh Anh đẩy việc điều tra chứ không kết tội.

Còn chờ:

1. Vụ 3 theo mục 4 cộng mục 9.1.
2. Khánh là chủ tịch Hội sinh viên kiêm trưởng CLB Robotics (mục 9.2).
3. Bí mật của CLB và vai chị Linh (mục 9.3).
