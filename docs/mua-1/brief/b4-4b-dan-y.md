# Dàn ý Vụ 2 "Tin đồn" (B4.4b-KHUNG, bản dựng xong 05/10/2026)

> Viết bởi Claude (gói B4.4b-KHUNG). Cấu trúc theo ngày ĐÃ DỰNG trong `prototype/noi-dung-mua-1/lich.md`, `kich-ban/10-vu-2-tin-don.md`; 30 khối lời mới đã có khối giữ chỗ trong `loi/10-vu-2-tin-don.md`, mỗi khối có chú thích HTML chép dàn ý nhịp (mục 6). Người viết lời chỉ sửa trong các khối `## <mã>` ấy.
> Đọc kèm: `docs/mua-1/ke-hoach-10-vu.md` mục 2, 3, 4 "Vụ 2"; `docs/mua-1/giao-viec.md` A3; `prototype/noi-dung-mua-1/giong/luat-giong.md`.

## 0. Luật viết áp cho mọi khối mới

- Mỗi dòng lời mới kết bằng ` (tạm)`. Số dòng nhắm tới là số dòng `- **ai** …` của khối (dòng `[THẺ CHỮ]`, `[DÀN DỰNG]`, `> NHIỆM VỤ` không tính). Dòng giữ chỗ đang có tính vào số ấy; viết lại hay giữ đều được.
- Xưng hô: Tùng, Hà Vy, người chơi, Nam: tớ/cậu với nhau; năm nhất gọi "anh Nam", "anh Duy"; Duy anh/em với năm nhất, em/chị với Minh Anh; Hiếu từ Vụ 2 "tớ/các cậu"; Quân luôn "tôi/các bạn"; sinh viên xưng "em" với cô Lan; với bác Thịnh, bà bán trà đá xưng "cháu".
- Hà Vy, Minh Anh, Tùng không nói thuật ngữ SQL (không "%", "LIKE", "TRIM", "LOWER", "lọc", "câu lệnh", "cột", "hàm"). Không nói "cột" với người ngoài CLB.
- Không gạch dài "—" trong chữ hiển thị. Biểu cảm chỉ dùng loại có trong `nhan-vat.md`: Hiếu neutral, annoyed, surprised; Quân neutral, smug, stunned, chi-man; Nam, Khánh chỉ neutral; cô Lan, bác Thịnh neutral, smile.
- Lời chỉ nhắc vật, người có trên ảnh nền của cảnh. Show don't tell; gợi ý không liệt kê; không nhân vật nào đọc ra đáp án màn tra; không ai tự khai vai trò, sở trường.
- Ngày lễ 15/10 là **Ngày truyền thống Hội Liên hiệp Thanh niên Việt Nam** (15/10/1956; nếu cần số: 68 năm). Hội Sinh viên trường đứng ra tổ chức lễ kỷ niệm, nên Quân bận buổi sáng và buổi giải trình diễn ra sau lễ. Không viết "ngày thành lập Hội Sinh viên".
- Trò đùa chạy dài, số theo ngày: hộp bánh quy BQ-04 (08/10, đã có), BQ-05 (14/10); Hà Vy đếm Tùng cá trật: **bốn lần tính từ đầu năm, nói ở 14/10** (theo ghi nhớ của user; lời Vụ 6 cũ ngày 04/11 cũng ghi "bốn lần", để gói làm lại Vụ 6 nâng số); sổ nợ của Tùng dưới dòng 12 (việc phụ ngày 01/11 đã là dòng 12), ở đây dòng chín.
- Cấm lộ trong cả vụ: Nam tối thứ Hai ở thư viện (Vụ 4); Khánh liên quan tới tin (Vụ 8); ai ngồi máy văn phòng xưởng; tin nhóm lớp Hiếu nhận lúc 22:41 (để dành nhịp người quen của Hiếu ở Vụ 8).

## 1. Bảng ngày (đã dựng)

Hạn chót 15/10 (thứ Ba). `Việc chốt: Buổi giải trình chiều 15/10`. Năm ngày có việc, ba ngày trống. Màn tra 3 / 3 / 2.

| Ngày | Bắt đầu ở | Việc chính (≤ 2) | Màn tra | Nơi tùy chọn + chi tiết ẩn | `[XONG VIỆC CHÍNH]` ở | Điểm "!" trên tuyến chính |
|---|---|---|---|---|---|---|
| T3 08/10 | `phong-clb` | Tin đồn tới phòng CLB; tìm các tin mang câu ấy | c-tin-bang (0), c-tin-bat-dau (5), c-tin-chua (8) | không | `tin-n1-toi` (buổi tối không khí, phòng 408) | 1 (Duy) |
| T4 09/10 | `phong-clb` | Gom đủ các tin (chứa cụm dài, IN); sang xưởng gặp Nam (Hà Vy soi Nam), tìm tin gốc | c-tin-sach (chứa cụm dài, 7), c-tin-in (2), c-tin-goc (1) | căng tin (bảng đen), quán trà đá (xe đạp cũ) | `tin-n2-het` | 2 (Duy, ghim xưởng) |
| T5 10/10 | `phong-ktx` | Đối chất Hiếu ở căng tin; quay lại xưởng xem hai chỗ kiểm (nhật ký đăng nhập, sổ đặt phòng gõ tay) | c-tin-may (2), c-tin-xuong (làm sạch mã phòng, 2) | căng tin có chi tiết ẩn (bảng đen) | `tin-n3-phong` (giấy mời) | 1 (Hiếu) |
| T6 11/10 → CN 13/10 | | Trống. Câu chuyển ở đầu `tin-n5-mo.1`. | | | | |
| T2 14/10 | `phong-ktx` | Tập trước buổi giải trình ở phòng CLB | không | sảnh tòa B (bảng tin) | `tin-n5-phong` | 1 (ghim phòng CLB) |
| T3 15/10 | `hoi-truong` | Lễ kỷ niệm sáng (việc ngày lễ của Quân, tạm); buổi giải trình chiều, Quân hai nhịp; về phòng CLB, kết | không | không | `tin-ket-luan` (trước `[KẾT THÚC]`) | 0 |

Vì sao hai hướng kiểm ở xưởng dời sang 10/10: để ba ngày đầu có màn tra đều (3 / 3 / 2). Đối chất Hiếu chỉ cần `ev-tin-goc` (có từ 09/10); Quân nhịp 1 cần `ev-tin-may` (10/10, trước 15/10). Phải đổi đúng một câu cũ của Nam (hẹn mai) và câu hỏi của `[RẼ NHÁNH r-tin-tuyen]` ("Hai chỗ anh Nam chỉ hôm qua."); thêm khối nối `tin-gap-nam-het`, `tin-n3-xuong.1`.

## 2. Lịch (đã có trong `lich.md`)

```
## Tin đồn {vụ sau: vu-tin-don}
- Chuỗi: tin-mo
- Ngày: 2024-10-08
- Hạn chót: 2024-10-15
- Việc chốt: Buổi giải trình chiều 15/10
- Ngày 2024-10-08: tin-mo · bắt đầu ở: phong-clb
- Ngày 2024-10-09: tin-n2-mo · bắt đầu ở: phong-clb
- Ngày 2024-10-10: tin-n3-mo · bắt đầu ở: phong-ktx
- Ngày 2024-10-14: tin-n5-mo · bắt đầu ở: phong-ktx
- Ngày 2024-10-15: tin-n6-mo · bắt đầu ở: hoi-truong

## Ngày truyền thống Hội Liên hiệp Thanh niên Việt Nam {việc ngày lễ: le-hoi-sv}
- Ngày: 2024-10-15 · Thuộc vụ: vu-tin-don · Chuỗi: le-hsv-mo · Người giao: quan · Khi lỡ: le-hsv-lo
```

Mã việc ngày lễ giữ `le-hoi-sv` và chuỗi `le-hsv-*` (lễ do Hội Sinh viên trường tổ chức); đổi mã được nếu user muốn.

## 3. Các màn tra (đã dựng; đã chạy thật trên dữ liệu kèm nhiễu)

| Ngày | Thẻ | SQL chuẩn (phần WHERE) | Dòng | Bẫy có lời "Khi chạy ra n dòng" |
|---|---|---|---|---|
| 08/10 | c-tin-bang | `noi_dung = 'CLB Thám Tử soi dữ liệu sinh viên'` | 0 | (lời "338 dòng" có sẵn không bao giờ hiện: bảng có 340 dòng, xem mục 10) |
| 08/10 | c-tin-bat-dau | `noi_dung LIKE 'CLB Thám Tử soi dữ liệu sinh viên%'` | 5 | 0 |
| 08/10 | c-tin-chua | `noi_dung LIKE '%CLB Thám Tử soi%'` | 8 | 0, 5 (kéo cả T-08 chuyện "soi điểm") |
| 09/10 | c-tin-sach (mã cũ; nay "chứa cả đoạn dài") | `noi_dung LIKE '%soi dữ liệu sinh viên%'` | 7 | 0, 8 (cụm ngắn kéo T-08), 5 (quên tin gõ trả lời) |
| 09/10 | c-tin-in | `tai_khoan IN ('SV240201', 'SV240207')` | 2 | 0, 7 |
| 09/10 | c-tin-goc | `noi_dung LIKE '%soi dữ liệu sinh viên%' AND loai = 'GOC'` | 1 | 0, 7 (quên VÀ), 2 (cụm ngắn VÀ GOC: kéo T-08) |
| 10/10 | c-tin-may | `tai_khoan = 'clb_robotics' AND ngay = '2024-10-07'` | 2 | 0, 21, 42, 1007 |
| 10/10 | c-tin-xuong | `ngay = '2024-10-07' AND LOWER(TRIM(ma_phong)) = 'xr-01'` trên bảng mới `dat_phong` | 2 | 0, 1 (so bằng thẳng "XR-01": chỉ còn buổi chiều, "tối thứ Hai không ai đặt xưởng"), 4 (chỉ lọc ngày), 11 (quên ngày), 20 (cả sổ) |

Kiểm phụ c-tin-xuong: `ma_phong = 'XR-01'` → 1; `LOWER(ma_phong) = 'xr-01'` → 1; `TRIM(ma_phong) = 'XR-01'` → 1; `TRIM(ma_phong) = 'xr-01'` → 0. Bỏ LOWER hay bỏ TRIM đều thiếu dòng tối (`Xr-01` + dấu cách cuối).

## 4. Danh sách chuỗi (53)

Ngày 08/10: tin-mo, tin-phong-duy, tin-phong-vy, tin-phong-tung, tin-phong-minh-anh, tin-tra-bat-dau, tin-tra-chua, **tin-n1-chot** (`[ĐI CÙNG tin-n1-toi] Về phòng KTX ăn tối`), **tin-n1-toi** (XONG).
Ngày 09/10: **tin-n2-mo** (khám phá: Duy "!", Tùng "?"), **tin-n2-duy**, **tin-n2-tung**, tin-tra-sach, tin-tra-in (bản đồ: xưởng "!", căng tin "?", trà đá "?"), tin-bd-cang-tin (+ -vao, -an), tin-bd-tra-da (+ -vao, -an), tin-gap-nam (Hà Vy soi Nam; kết bằng `[ĐI CÙNG tin-n2-het]`), tin-soi-hop, tin-soi-but, tin-soi-tay-ao, **tin-n2-het** (XONG).
Ngày 10/10: **tin-n3-mo** (`[ĐI CÙNG tin-n3-cang-tin]`), **tin-n3-cang-tin** (khám phá: Hiếu "!", bảng đen ẩn), **tin-n3-hieu** (`[ĐỐI CHẤT dc-tin-hieu]`), **tin-n3-hieu-du**, **tin-n3-hieu-chua** (cả hai `[ĐI CÙNG tin-n3-xuong]`), **tin-n3-cang-tin-an**, **tin-n3-xuong** (`[RẼ NHÁNH r-tin-tuyen]` hai đích thật), tin-tuyen-may, tin-may-doi-chieu, tin-tuyen-xuong, tin-xuong-doi-chieu (cả hai `[ĐI CÙNG tin-ket]`), tin-ket, tin-ket-quay-may, tin-ket-quay-xuong, tin-ket-du, **tin-n3-phong** (XONG).
Ngày 14/10: **tin-n5-mo** (bản đồ: phòng CLB "!", sảnh tòa B "?"), **tin-n5-toa-b** (+ **-vao**, **-an**), **tin-n5-phong** (XONG).
Ngày 15/10: **tin-n6-mo** (`[ĐI CÙNG tin-gt-mo]`), **le-hsv-mo**, **le-hsv-lo** (việc ngày lễ, kết `[KẾT THÚC]`, truyện chữ in "Hết việc ngày lễ."), **tin-gt-mo** (hai `[ĐỐI CHẤT]`), **tin-gt-ket-du**, **tin-gt-ket-chua** (cả hai `[ĐI CÙNG tin-ket-luan]`), tin-ket-luan (XONG rồi `[KẾT THÚC]`).

Chữ đậm là chuỗi mới (25). Cũ 28 (26 ban đầu + tin-ket-quay-may, tin-ket-quay-xuong).

## 5. Ba đối chất (đã dán vào `kich-ban/`)

Thẻ và nơi lấy (mọi đường đi đều qua): `ev-tin-goc` (c-tin-goc, `tin-gap-nam`, 09/10); `ev-tin-don` (c-tin-sach, `tin-tra-sach`, 09/10); `ev-tin-may` (c-tin-may, `tin-tuyen-may`, 10/10; `tin-ket` bắt quay lại xưởng nếu mới xem một hướng); `ev-tin-xuong` (c-tin-xuong, `tin-tuyen-xuong`, 10/10); `clue-tin-goc`, `clue-ngay-gui` (`tin-gap-nam`); `doc-tin-don` (`tin-mo`).

Lý lẽ đối chất Hiếu: nếu tin có từ lâu thì trong bản xuất, tin đầu tiên mang câu ấy đã là tin bấm chuyển; đằng này chỉ có đúng một tin tự viết (GOC), gửi 22:40 tối thứ Hai 07/10, mọi tin khác chép lại hay gõ trả lời nó. Lý lẽ Quân nhịp 2: mọi bản ghi dừng ở tài khoản và máy; người chơi tự nói giới hạn ấy.

```
- [ĐỐI CHẤT dc-tin-hieu] hieu: "Lớp tớ ai cũng bảo thế. **Tin này có từ lâu rồi, ai cũng chuyển**, các cậu làm to chuyện làm gì."
  - [CÂU HỎI] Tin này bắt đầu từ lúc nào, từ một chỗ hay từ khắp nơi? Trình thẻ cho thấy điều đó.
  - {ev-tin-goc} [ĐỦ CĂN CỨ] → phản hồi: **player**: Cả bản xuất chỉ có đúng một tin tự viết mang câu ấy, gửi lúc 22 giờ 40 tối thứ Hai. Mấy tin còn lại đều chép lại nó. (tạm)<br>**player**: Tin có từ lâu thì tin đầu tiên đã phải là tin chuyển tiếp rồi. (tạm)<br>**hieu** (surprised): Tối thứ Hai tuần này á? Thế mà lớp tớ cứ tưởng chuyện từ năm ngoái. (tạm)
  - {clue-tin-goc} [HỖ TRỢ] → phản hồi: **player**: Kênh ghi loại của từng tin: tin tự viết, tin bấm chuyển, tin gõ trả lời. (tạm)<br>**hieu** (annoyed): Thì đấy, bấm chuyển nhiều thế còn gì. (tạm)<br>**ha-vy** (thinking): Biết có mấy loại tin là một chuyện. Tin tự viết gửi lúc nào thì phải có phiếu. (tạm)
  - {ev-tin-don} [GỢI Ý] → phản hồi: **hieu** (neutral): Đấy, mấy tài khoản cùng mang một câu. Đúng là ai cũng chuyển. (tạm)<br>**tung** (gai-dau): Ơ, tờ này lại đứng về phía cậu ấy. (tạm)
  - {doc-tin-don} [GỢI Ý] → phản hồi: **hieu** (neutral): Ảnh chụp ghi chuyển tiếp nhiều lần. Đúng ý tớ còn gì. (tạm)<br>**ha-vy** (thinking): Ảnh chỉ nói từ tối thứ Hai. Trước đó có hay không thì ảnh chưa nói. (tạm)
  - [CHƯA ĐỦ] → phản hồi: **tung** (worried): Bọn tớ chưa chỉ ra được nó bắt đầu từ đâu. (tạm)<br>**hieu** (neutral): Thế thì tớ vẫn nghĩ như cũ. (tạm)
  - [KHÁC] → phản hồi: **hieu** (annoyed): Cái này thì dính gì tới tin đồn? (tạm)
  - [HẾT LƯỢT] → phản hồi: **hieu** (annoyed): Thôi, các cậu cứ tra tiếp đi. Tớ ăn cho xong bữa. (tạm)<br>**ha-vy** (neutral): Mình về đọc lại hồ sơ đã. (tạm)
```

```
- [ĐỐI CHẤT dc-tin-quan-may] quan: "Mật khẩu kênh cả ban chủ nhiệm Robotics đều biết. **Tin ấy có thể gửi từ điện thoại của bất kỳ ai, ở bất cứ đâu.** Các bạn khoanh được chỗ nào?"
  - [CÂU HỎI] Ngay trước giờ tin gốc, tài khoản kênh vào từ máy nào? Trình thẻ cho thấy điều đó.
  - {ev-tin-may} [ĐỦ CĂN CỨ] → phản hồi: **player**: Nhật ký đăng nhập của kênh ghi 22 giờ 31 tối mùng 7, tài khoản kênh vào từ máy văn phòng xưởng. Chín phút sau, tin gốc được gửi. (tạm)<br>**quan** (stunned): Một máy để bàn trong xưởng. Không phải điện thoại. (tạm)<br>**co-lan** (neutral): Cô ghi lại: một máy, một giờ. (tạm)
  - {ev-tin-xuong} [HỖ TRỢ] → phản hồi: **minh-anh** (neutral): Thưa cô, tối đó xưởng đăng ký mở tới 23 giờ cho đội tập ạ. (tạm)<br>**quan** (neutral): Xưởng mở thì có người. Có người ở xưởng chưa nói tin gửi từ xưởng. (tạm)
  - {ev-tin-goc} [GỢI Ý] → phản hồi: **quan** (smug): Tờ này cho tôi giờ gửi và tài khoản. Máy nào thì không. (tạm)<br>**ha-vy** (thinking): Giờ thì có rồi. Chỗ thì phải tìm ở tờ khác. (tạm)
  - {clue-ngay-gui} [GỢI Ý] → phản hồi: **quan** (neutral): Ngày gửi thì bên tôi biết rồi. Tôi hỏi chỗ gửi. (tạm)
  - [CHƯA ĐỦ] → phản hồi: **minh-anh** (worried): Thưa cô, bọn em chưa khoanh được tin gửi từ máy nào ạ. (tạm)<br>**quan** (neutral): Vậy bên tôi ghi: gửi từ một tài khoản nhiều người biết mật khẩu, chưa rõ nơi gửi. (tạm)
  - [KHÁC] → phản hồi: **quan** (neutral): Tờ này liên quan gì tới chỗ tin được gửi? (tạm)
  - [HẾT LƯỢT] → phản hồi: **quan** (smug): Ba lần trình, chưa tờ nào chỉ ra máy nào. Bên tôi ghi là chưa rõ. (tạm)<br>**minh-anh** (worried): Dạ, bọn em xin sang ý sau ạ. (tạm)
```

```
- [ĐỐI CHẤT dc-tin-quan-nguoi] quan: "Tài khoản của Robotics, máy trong xưởng Robotics, người trực kênh là Nam. Bên tôi kết luận: **Nam là người gửi tin.**"
  - [CÂU HỎI] Trong các bản ghi đang có, chỗ nào cho biết ai ngồi máy lúc 22 giờ 40? Trình thẻ để chỉ ra bản ghi dừng ở đâu.
  - {ev-tin-may} [ĐỦ CĂN CỨ] → phản hồi: **player**: Nhật ký đăng nhập ghi tài khoản, máy, ngày, giờ. Không chỗ nào ghi tên người ngồi máy. (tạm)<br>**player**: Bản ghi cho biết tài khoản nào gửi, chưa cho biết ai ngồi gửi. (tạm)<br>**quan** (stunned): Các bạn tự chỉ ra chỗ hồ sơ của mình dừng lại. (tạm)<br>**co-lan** (neutral): Cô ghi: một tài khoản, chưa phải một người. (tạm)
  - {ev-tin-goc} [ĐỦ CĂN CỨ] → phản hồi: **player**: Tin gốc chỉ có tài khoản clb_robotics và giờ gửi. Tên người gửi không có trên phiếu. (tạm)<br>**player**: Bản ghi cho biết tài khoản nào gửi, chưa cho biết ai ngồi gửi. (tạm)<br>**quan** (stunned): Vậy là chưa phải Nam. Chưa phải ai cả. (tạm)
  - {ev-tin-xuong} [HỖ TRỢ] → phản hồi: **ha-vy** (neutral): Bảng xưởng là lịch đăng ký, không phải điểm danh ạ. Tối đó ai có mặt, bảng không ghi. (tạm)<br>**quan** (neutral): Đúng. Nhưng vẫn chưa nói ai ngồi máy. (tạm)
  - {clue-tin-goc} [GỢI Ý] → phản hồi: **quan** (smug): Tờ này nói tin gốc là tin tự viết. Tự viết thì càng phải có người viết. (tạm)<br>**tung** (worried): Ờ, tờ này không đỡ được mình. (tạm)
  - [CHƯA ĐỦ] → phản hồi: **minh-anh** (worried): Thưa cô, bọn em chưa có gì để nói ngược lại ý đó ạ. (tạm)<br>**quan** (neutral): Vậy biên bản ghi tên Nam ở mục người cần làm rõ. (tạm)
  - [KHÁC] → phản hồi: **quan** (neutral): Tôi hỏi ai ngồi máy. Tờ này trả lời câu khác. (tạm)
  - [HẾT LƯỢT] → phản hồi: **quan** (smug): Không tờ nào nói ngược lại. Bên tôi giữ tên Nam trong biên bản. (tạm)<br>**co-lan** (neutral): Cô ghi nhận tới đây. (tạm)
```

Lời phản hồi đã qua `kiem-giong` (dán tạm vào bản chép tệp lời): 0 lỗi, 1 nhắc lặp câu "Bản ghi cho biết tài khoản nào gửi…" (cố ý).

## 6. Từng khối lời mới (bản này cũng nằm trong chú thích dưới mỗi khối ở `loi/10-vu-2-tin-don.md`)

### Ngày 08/10 (32 dòng)

**`tin-mo-hieu`** · phòng CLB (`phong-clb`), Hiếu còn đứng ở cửa, ngay sau `tin-mo.1` · có mặt: Hiếu, Minh Anh, Duy, Tùng, Hà Vy, người chơi · mục đích: Hiếu tự nói ra kết luận sai của vụ, trước mọi màn tra · **5 dòng**.
1. Tùng hỏi Hiếu tối thứ Hai bấm chuyển tiếp làm gì.
2. Hiếu nói thẳng: tin này có từ lâu rồi, lớp nào cũng có, ai cũng chuyển, Hiếu chỉ bấm theo.
3. Hà Vy hỏi lại một câu ngắn: "có từ lâu" là từ bao giờ.
4. Hiếu không nói được ngày nào, chỉ bảo "nghe bảo thế", rồi chào đi.
- Phải lộ: ý "tin có từ lâu, ai cũng chuyển" do chính Hiếu nói (tự nhiên, không đọc như khẩu hiệu). Cấm lộ: giờ 22:40, tin gốc, tài khoản Robotics. Trò đùa: không.

**`tin-mo-han`** · phòng CLB, sau `tin-mo.2` · có mặt: Minh Anh, Duy, Tùng, Hà Vy, người chơi · mục đích: đặt hạn chót của vụ · **4 dòng**.
1. Minh Anh: cô Lan báo Hội Sinh viên trường sẽ mời CLB lên giải trình chiều thứ Ba tuần sau, sau lễ kỷ niệm Ngày truyền thống Hội Liên hiệp Thanh niên Việt Nam do Hội Sinh viên tổ chức.
2. Tùng hỏi giải trình là phải nói gì; Minh Anh: nói tin này từ đâu ra, bằng thứ mình tra được.
3. Duy (cho thấy, không kể) viết "15/10" lên tờ lịch dán cạnh laptop.
- Phải lộ: ngày 15/10, buổi chiều, sau lễ kỷ niệm. Cấm lộ: Quân sẽ hỏi gì (Quân quen mặt từ Vụ 1, nhắc tên được nhưng không nói nội dung). Trò đùa: không.

**`tin-n1-xuong-mai`** · phòng CLB, sau `tin-mo.3` (Minh Anh vừa bảo sang xưởng hỏi) · có mặt: Minh Anh, Duy, Tùng, Hà Vy, người chơi · mục đích: lý do chưa sang xưởng ngay hôm nay · **3 dòng**.
1. Duy nhìn tờ lịch đặt phòng nhà văn hóa ghim trên bảng: chiều nay xưởng Robotics sinh hoạt thành viên tới 5 giờ (khớp sổ `dat_phong`: XR-01 ngày 08/10, 14:00–17:00).
2. Minh Anh: mai hẵng sang, hôm nay làm cho gọn danh sách tin đã.
- Phải lộ: mai mới sang xưởng. Cấm lộ: lịch tối 07/10 của xưởng (để dành màn `c-tin-xuong`). Trò đùa: không.

**`tin-n1-chot.1`** · phòng CLB, cuối chiều (chuỗi `tin-n1-chot`, sau màn `c-tin-chua`) · có mặt: Minh Anh, Duy, Tùng, Hà Vy, người chơi · mục đích: khép việc chính ngày 08/10 · **6 dòng**.
1. Người chơi tóm một câu: có một tin tự viết lại (T-08), phải bỏ ra; còn hai tin người ta gõ thêm chữ thì mai tính.
2. Minh Anh dặn mai đủ người, ba giờ chiều.
3. Duy đậy nắp hộp BQ-04, gạch thêm một vạch lên nhãn.
4. Tùng rủ người chơi về ăn tối (dẫn vào nút "Về phòng KTX ăn tối").
- Phải lộ: kế hoạch mai. Cấm lộ: số 7 tin của màn chứa cụm dài. Trò đùa: hộp bánh quy BQ-04 (Duy đếm bánh bằng vạch).

**`tin-n1-toi.1`** · phòng 408 buổi tối (`phong-ktx-dem`) · có mặt: Tùng, người chơi · mục đích: buổi tối không khí sinh viên, KHÔNG có manh mối · **14 dòng**.
1. Mất nước nóng cả tầng; Tùng xách xô ra vòi tầng dưới, về kể hàng xô xếp dài tới cầu thang.
2. Điện thoại Tùng rung liên tục: nhóm lớp, nhóm quê, ai cũng gửi cái tin kia kèm mặt cười. Tùng tắt tiếng, úp điện thoại xuống gối (hậu quả của tin đồn hiện ở chuyện nhỏ, không bàn vụ).
3. Người chơi hỏi Tùng có trả lời ai không; Tùng: định cãi, rồi thôi, "cãi bằng gì".
4. Tùng mở sổ nợ (dòng chín: nửa gói mì, chủ nợ là người chơi), xin khất tới thứ Sáu.
5. Tùng cá một câu ("Tớ cá mai có nước nóng"), để Hà Vy đếm sau.
6. Đèn tầng tắt lúc mười một giờ; Tùng nói một câu nhớ nhà, hai đứa cười.
- Phải lộ: không (cảnh không khí). Cấm lộ: mọi dữ kiện vụ. Trò đùa: sổ nợ của Tùng (dòng chín); Tùng cá.

### Ngày 09/10 (28 dòng)

**`tin-n2-mo.1`** · phòng CLB đầu giờ chiều (chuỗi đầu ngày `tin-n2-mo`) · có mặt: Minh Anh, Duy, Tùng, Hà Vy, người chơi · mục đích: mở ngày 09/10, cho thấy tin vẫn lan · **6 dòng**.
1. Minh Anh vừa ở chỗ cô Lan về, cô hỏi CLB đã tới đâu.
2. Hà Vy chỉ lên bảng: còn mấy tin người ta gõ thêm chữ chưa gom được.
3. Tùng kể sáng nay có bạn cùng lớp hỏi đùa "có tra điểm tớ không" (hậu quả).
- Phải lộ: việc hôm nay: gom nốt các tin gõ thêm chữ. Cấm lộ: số tin của màn chứa cụm dài. Trò đùa: không.

**`tin-n2-duy.1`** · phòng CLB, điểm bấm Duy "!" · có mặt: Duy, người chơi (cả nhóm ở trong phòng) · mục đích: dẫn vào màn chứa cụm dài (thẻ `c-tin-sach`, mã cũ giữ nguyên) · **3 dòng**.
1. Duy mở lại bản xuất, chỉ hai tin mang câu tin đồn mà chữ khác hẳn các tin kia, như có người gõ lại bằng tay.
2. Duy không giải thích; để người chơi tự nhìn (loại tin sẽ lộ ở `tin-n2-in`).
- Phải lộ: có hai tin gõ tay. Cấm lộ: cách làm cho các tin khớp nhau (không biến lời thành hướng dẫn); đừng gắn chặt vào kiểu lệch cụ thể (dấu cách, chữ thường), vì dữ liệu hai tin này có thể đổi ở gói sau. Trò đùa: không.

**`tin-n2-tung.1`** · phòng CLB, điểm bấm Tùng "?" · có mặt: Tùng, Hà Vy, người chơi · mục đích: hậu quả của tin đồn, cho thấy không giảng · **4 dòng**.
1. Tùng đọc tin nhắn nhóm lớp: có đứa định đăng ký CLB Thám Tử giờ nhắn "thôi để sau".
2. Hà Vy không nói gì, ghi một dòng vào vở.
- Phải lộ: CLB mất người định vào. Cấm lộ: không. Trò đùa: không.

**`tin-n2-in`** · phòng CLB, sau màn `c-tin-in` (2 dòng: SV240201, SV240207) · có mặt: Minh Anh, Duy, Tùng, Hà Vy, người chơi · mục đích: cho người chơi THẤY hai tin lệch chữ là tin gõ tay trả lời, rồi chốt việc sang xưởng · **5 dòng**.
1. Người chơi đọc cột loại: hai tin này không phải chuyển tiếp mà là trả lời, tức gõ tay dưới tin người khác; cho thấy bằng việc đọc, không giảng.
2. Tùng định cá là hai bạn ấy bịa ra; Hà Vy cắt: hai bạn ấy cũng chỉ gõ lại câu cũ.
3. Minh Anh: việc của hôm nay là tìm chỗ tin bắt đầu, sang xưởng hỏi người trực kênh.
- Phải lộ: loại tin thứ ba (trả lời); hai mã là K24 khoa Kế toán, cùng khoa người chơi. Cấm lộ: tên hai bạn ấy. Trò đùa: Tùng định cá (chưa kịp cá thì bị cắt, không tính).

**`tin-gap-nam-het`** · xưởng Robotics, cuối chuỗi `tin-gap-nam` (sau cảnh Khánh) · có mặt: Nam, Tùng, Hà Vy, Duy, người chơi · mục đích: hẹn mai quay lại xem hai chỗ kiểm (nhật ký đăng nhập, bảng đăng ký) · **3 dòng**.
1. Nam phải dọn xưởng cho đội tập tối nay (khớp sổ `dat_phong`: XR-01 ngày 09/10, 19:00–21:00), hẹn mai chiều.
2. Hà Vy nhìn lướt tờ bảng đăng ký ngoài cửa, không đọc gì ra miệng.
- Phải lộ: mai quay lại. Cấm lộ: nội dung nhật ký, nội dung bảng đăng ký. Trò đùa: không.

**`tin-n2-het.1`** · phòng CLB cuối chiều (chuỗi `tin-n2-het`) · có mặt: Minh Anh, Duy, Tùng, Hà Vy, người chơi · mục đích: khép việc chính ngày 09/10 · **7 dòng**.
1. Minh Anh: mai chị báo cô Lan được một điều chắc là giờ gửi; máy gửi thì chưa.
2. Tùng: thế còn anh Nam; Minh Anh: chưa nói tên ai.
3. Duy viết "22:40" lên góc bảng, chừa một khoảng trống bên cạnh.
- Phải lộ: giờ gửi đã chắc; nơi gửi còn bỏ ngỏ. Cấm lộ: chìa phòng văn phòng xưởng thuộc ai (đã có ở lời Nam, không nhắc thêm). Trò đùa: không.

### Ngày 10/10 (39 dòng)

**`tin-n3-mo.1`** · phòng 408 buổi sáng (`phong-ktx`) · có mặt: Tùng, người chơi · mục đích: mở ngày 10/10, hẹn gặp Hiếu · **6 dòng**.
1. Tùng đọc tin Hiếu nhắn: trưa ra căng tin, có chuyện.
2. Tùng đoán Hiếu muốn cãi; người chơi trêu Tùng lại cá.
3. Tùng cá luôn ("tớ cá Hiếu xin lỗi").
- Phải lộ: hẹn ở căng tin. Cấm lộ: Hiếu muốn nói gì. Trò đùa: Tùng cá (lần thứ hai trong vụ).

**`tin-n3-cang-tin.1`** · căng tin giờ trưa · có mặt: Tùng, Hà Vy, người chơi; Hiếu ngồi bàn trong · mục đích: tới nơi, mở cảnh khám phá · **3 dòng**.
1. Căng tin đông, bàn nào cũng cúi vào điện thoại.
2. Hiếu ngồi một mình ở bàn trong, khay cơm còn nguyên.
- Phải lộ: không. Cấm lộ: không. Trò đùa: không.

**`tin-n3-hieu.1`** · căng tin, trước `[ĐỐI CHẤT dc-tin-hieu]` · có mặt: Hiếu, Tùng, Hà Vy, người chơi · mục đích: dẫn vào đối chất · **6 dòng**.
1. Hiếu: lớp Hiếu bàn chuyện tin ấy suốt giờ giải lao sáng nay.
2. Hiếu nói thẳng: các cậu làm to chuyện; Hiếu vẫn tin là chuyện cũ.
3. Hà Vy đặt điện thoại xuống, bảo người chơi đưa thứ mình có.
- Phải lộ: Hiếu giữ ý cũ. Cấm lộ: đáp án (không ai nhắc "tin gốc" trước khi người chơi trình thẻ). Trò đùa: không.

**`tin-n3-hieu-du.1`** · căng tin, sau đối chất đủ căn cứ · có mặt: Hiếu, Tùng, Hà Vy, người chơi; bàn bên · mục đích: hậu quả tốt, cho thấy · **5 dòng**.
1. Hiếu mở nhóm lớp, gõ một tin đính chính ngắn, xóa đi, gõ lại, rồi gửi.
2. Bàn bên có đứa đọc to tin đính chính.
3. Hiếu nói thẳng một câu nhận mình bấm chuyển mà chưa kiểm.
- Phải lộ: Hiếu đổi ý trước mặt CLB (mầm người quen sau vụ). Cấm lộ: giờ nhóm lớp Hiếu nhận tin (22:41, để dành Vụ 8). Trò đùa: không.

**`tin-n3-hieu-chua.1`** · căng tin, sau đối chất chưa đủ / hết lượt · có mặt: Hiếu, Tùng, Hà Vy, người chơi; bàn bên · mục đích: hậu quả của việc chưa bác được, cho thấy · **5 dòng**.
1. Hiếu đứng dậy trả khay.
2. Bàn bên vẫn đọc to cái tin rồi cười.
3. Tùng định nói, Hà Vy giữ tay áo Tùng lại.
- Phải lộ: tin vẫn lan. Cấm lộ: không giảng, không ai nói "giá mà". Trò đùa: không.

**`tin-n3-cang-tin-an.1`** · căng tin, chi tiết ẩn bảng đen · có mặt: người chơi (Tùng nếu cần) · mục đích: chi tiết ẩn, nối chi tiết bảng đen hôm 09/10 · **2 dòng**.
1. Dòng phấn "Nợ quá ba cốc thì ghi tên vào đây" nay có thêm hai chữ "CLB soi", bị ai lấy tay xóa nhòe.
- Phải lộ: không. Cấm lộ: không. Trò đùa: bảng nợ căng tin.

**`tin-n3-xuong.1`** · xưởng Robotics chiều (chuỗi `tin-n3-xuong`, trước `[RẼ NHÁNH r-tin-tuyen]`) · có mặt: Nam, Tùng, Hà Vy, Duy, người chơi · mục đích: quay lại xưởng như đã hẹn; dẫn vào hai hướng kiểm · **4 dòng**.
1. Nam đã mở sẵn nhật ký đăng nhập trên máy xưởng số 2.
2. Tùng đọc to biển mã phòng trên cửa xưởng: XR-01.
3. Tùng liếc tờ bảng đăng ký ngoài cửa.
4. Duy: hai chỗ, xem chỗ nào trước cũng được.
- Phải lộ: hai chỗ kiểm đã sẵn; xưởng là phòng XR-01. Cấm lộ: nội dung hai chỗ; cách người đặt gõ mã phòng trong sổ (để màn `c-tin-xuong` tự lộ). Trò đùa: không.

**`tin-n3-phong.1`** · phòng CLB cuối chiều (chuỗi `tin-n3-phong`, sau `tin-ket-du`) · có mặt: Minh Anh, Duy, Tùng, Hà Vy, người chơi · mục đích: khép việc chính ngày 10/10; giấy mời giải trình · **8 dòng**.
1. Minh Anh đặt lên bàn giấy mời: 14 giờ thứ Ba 15/10, phòng Công tác sinh viên, Ban Pháp chế Hội Sinh viên chủ trì, cô Lan dự.
2. Duy: tuần này đơn đăng ký thành viên mới rút hai (hậu quả).
3. Tùng nhắc chuyện căng tin bằng một câu dùng được cho cả hai nhánh ("Chuyện căng tin thì cậu biết rồi đấy").
4. Minh Anh dặn cuối tuần nghỉ, thứ Hai tập trước.
- Phải lộ: giờ, nơi, người chủ trì buổi giải trình. Cấm lộ: Quân sẽ hỏi gì. Trò đùa: không.

### Ngày 14/10 (27 dòng)

**`tin-n5-mo.1`** · phòng 408 buổi trưa (`phong-ktx`) · có mặt: Tùng, người chơi · mục đích: câu chuyển qua ba ngày trống; mở ngày 14/10 · **5 dòng**.
1. Người kể: ba ngày cuối tuần CLB nghỉ; kênh sinh viên vẫn có người chuyển cái tin ấy, thưa dần.
2. Tùng về quê hai ngày, mang lên túi bánh mẹ gói.
3. Tùng: chiều tập ở phòng CLB.
- Phải lộ: chiều tập trước. Cấm lộ: thư viện tối thứ Hai (Vụ 4). Trò đùa: không.

**`tin-n5-toa-b.1`** · sảnh tòa B (nơi tùy chọn), bác Thịnh · có mặt: bác Thịnh, Tùng, Hà Vy, người chơi · mục đích: nơi tùy chọn: tin đồn lan tới người ngoài trường · **6 dòng**.
1. Bác Thịnh đang treo băng rôn lễ kỷ niệm ngày mai.
2. Bác hỏi các cháu có "soi điểm" thật không, cháu bác ở quê cũng gửi cho bác cái tin ấy.
3. Tùng chối hơi to; người chơi nói một câu; bác cười, bảo bác hỏi cho biết.
- Phải lộ: tin lan ra ngoài trường. Cấm lộ: chuyện năm xưa của bác (để Vụ 10); bác chỉ neutral, smile. Trò đùa: không.

**`tin-n5-toa-b-an.1`** · sảnh tòa B, chi tiết ẩn bảng tin · có mặt: người chơi · mục đích: chi tiết ẩn, nối chi tiết bảng tin Vụ 1 ngày 2 · **2 dòng**.
1. Tờ thông báo lễ kỷ niệm Ngày truyền thống Hội Liên hiệp Thanh niên Việt Nam (nếu cần số: 68 năm, 1956–2024) dán đè lên góc tờ danh sách CLB năm ngoái có hình kính lúp vẽ thêm.
- Phải lộ: không. Cấm lộ: không. Trò đùa: không.

**`tin-n5-phong.1`** · phòng CLB chiều (chuỗi `tin-n5-phong`) · có mặt: Minh Anh, Duy, Tùng, Hà Vy, người chơi · mục đích: tập trước buổi giải trình; khép việc chính ngày 14/10 · **14 dòng**.
1. Duy mở hộp BQ-05 mới.
2. Minh Anh đóng vai người hỏi: tin bắt đầu từ đâu, gửi từ đâu.
3. Người chơi trả lời bằng việc đã làm (không đọc tên thẻ, không liệt kê).
4. Minh Anh hỏi câu khó: thế ai gửi. Tùng buột "anh Nam".
5. Hà Vy: "Lần thứ tư cậu cá trật từ đầu năm. Tớ có đếm." (số bốn ở 14/10 theo ghi nhớ của user).
6. Minh Anh không chữa hộ, bảo mai mỗi người chỉ nói điều có tờ giấy đỡ.
7. Duy xếp các tờ kết quả theo thứ tự ngày, kẹp ghim.
- Phải lộ: câu "ai gửi" sẽ được hỏi. Cấm lộ: câu trả lời đúng ("bản ghi cho biết tài khoản nào gửi…") không được nói ở đây; để người chơi tự nói ở đối chất. Trò đùa: hộp BQ-05; Hà Vy đếm cá trật: bốn.

### Ngày 15/10 (55 dòng)

**`tin-n6-mo.1`** · hội trường buổi sáng · có mặt: Minh Anh, Tùng, Hà Vy, Duy, người chơi; Quân bận trên sân khấu · mục đích: lễ kỷ niệm; dẫn sang buổi giải trình · **6 dòng**.
1. Hội trường kín ghế; Hội Sinh viên trường tổ chức lễ kỷ niệm Ngày truyền thống Hội Liên hiệp Thanh niên Việt Nam.
2. Người kể nhắc chủ tịch Hội phát biểu (Khánh không nói, không gọi họ tên).
3. Quân chạy qua chạy lại với tập giấy.
4. Minh Anh: hai giờ chiều, phòng Công tác sinh viên.
- Phải lộ: buổi chiều. Cấm lộ: mọi điều về Khánh ngoài việc đứng phát biểu. Trò đùa: không.

**`le-hsv-mo.1`** · hội trường sau lễ (việc ngày lễ, tạm) · có mặt: Quân, Tùng, người chơi · mục đích: nhận việc ngày lễ; màn tra để gói B8 · **8 dòng**.
1. Quân nhờ xem danh sách bốc thăm quà của buổi lễ, tên gõ lộn xộn (hoa thường lẫn lộn, dính dấu cách), cần biết ai trúng.
2. Quân nói chiều mới rảnh.
3. Tùng nhận lời trước khi người chơi kịp nói.
- Phải lộ: việc của Quân. Cấm lộ: SQL; tên người trúng. Trò đùa: không.

**`le-hsv-lo.1`** · hội trường (khi lỡ việc ngày lễ) · có mặt: người kể · mục đích: hậu quả nhỏ, cho thấy · **1 dòng**.
1. Tờ danh sách bốc thăm vẫn kẹp dưới tập giấy của Quân, mép đã quăn.
- Phải lộ: không. Cấm lộ: không. Trò đùa: không.

**`tin-gt-mo.1`** · phòng Công tác sinh viên, trước nhịp 1 · có mặt: cô Lan, Quân, Minh Anh, Duy, Tùng, Hà Vy, người chơi · mục đích: mở buổi giải trình · **14 dòng**.
1. Cô Lan mở buổi: có đơn của sinh viên gửi Phòng về tin trên kênh.
2. Quân đọc lại câu tin đồn, hỏi CLB đã làm gì.
3. Minh Anh trình bày ngắn: bản xuất do Phòng cấp, toàn tin công khai.
4. Quân không bàn chuyện Hiếu; Quân hỏi thẳng nơi gửi (dẫn vào `[ĐỐI CHẤT dc-tin-quan-may]`).
- Phải lộ: buổi giải trình có biên bản. Cấm lộ: nhịp 2 trước khi nhịp 1 xong. Trò đùa: không.

**`tin-gt-giua`** · phòng Công tác sinh viên, giữa hai nhịp · có mặt: cô Lan, Quân, Minh Anh, người chơi · mục đích: chuyển từ "máy nào" sang "ai" · **6 dòng**.
1. Quân lật biên bản, ghi.
2. Cô Lan hỏi máy văn phòng xưởng đặt ở đâu; Minh Anh đáp phòng riêng trong xưởng.
3. Quân nói giọng chắc: thế thì đã rõ ai (dẫn vào `[ĐỐI CHẤT dc-tin-quan-nguoi]`).
- Phải lộ: không. Cấm lộ: câu trả lời nhịp 2. Trò đùa: không.

**`tin-gt-ket-du.1`** · phòng Công tác sinh viên, nhịp 2 đủ căn cứ · có mặt: cô Lan, Quân, Minh Anh, Duy, Tùng, Hà Vy, người chơi · mục đích: kết đủ của buổi giải trình · **10 dòng**.
1. Quân gạch một dòng trong biên bản, viết lại bên dưới.
2. Cô Lan: Phòng sẽ đăng đính chính lên kênh chiều nay (hậu quả tốt, nhìn thấy).
3. Quân nói với Minh Anh một câu về quy trình, không khen.
4. Ra cửa, Tùng thở ra; Hà Vy: "Cậu chưa cá câu nào suốt buổi."
- Phải lộ: đính chính. Cấm lộ: ai ngồi máy. Trò đùa: Hà Vy đếm cá.

**`tin-gt-ket-chua.1`** · phòng Công tác sinh viên, nhịp 2 chưa đủ / hết lượt · có mặt: cô Lan, Quân, Minh Anh, Duy, Tùng, Hà Vy, người chơi · mục đích: kết chưa trọn của buổi giải trình, cho thấy hậu quả · **10 dòng**.
1. Quân viết tên Nam vào mục người cần làm rõ; người chơi nhìn thấy dòng chữ ấy.
2. Cô Lan: đính chính chỉ đăng phần CLB không soi dữ liệu; phần người gửi để ngỏ.
3. Minh Anh im suốt lúc ra cửa; Tùng hỏi có phải vì mình không; Minh Anh: vì mình chưa nói được chỗ giấy tờ dừng.
- Phải lộ: tên Nam trên biên bản. Cấm lộ: ai ngồi máy. Trò đùa: không.

## 7. Chỗ nối phải giữ

- Tin gốc gửi từ tài khoản kênh Robotics lúc 22:40 tối thứ Hai 07/10: `c-tin-goc`, `tin-gap-nam.2`, đối chất Hiếu và Quân nhịp 2.
- Nam ở xưởng Robotics: `tin-gap-nam` (09/10), `tin-n3-xuong` (10/10).
- Lời kết "Một tài khoản, chưa phải một người": `tin-ket-luan.1` (thẻ chữ cuối) và `Tiêu đề kết`; Quân nhịp 2 người chơi tự nói câu ấy.
- Kết luận sai của Hiếu bị gỡ bằng kỹ năng mới: Hiếu nói ở `tin-mo-hieu` (08/10), gỡ bằng `ev-tin-goc` (chứa cụm dài VÀ GOC) ở 10/10.
- Hà Vy soi một người: `kp-soi-nam` (đã có).
- Hiếu thành người quen sau vụ: `tin-n3-hieu-du` là lần đầu Hiếu đổi ý trước mặt CLB.

## 8. Công cụ

Commit `cab48bb` (gói T2) đã đỡ vụ sau nhiều ngày; ba lỗi máy kiểm và lỗi lệch ngày ở truyện chữ mà bản dàn ý trước nêu đã hết. Còn lại:
- Truyện chữ in mọi `[ĐI CÙNG]` sang nơi khác vào đoạn "Bản đồ" của ngày, không in ở cuối chuỗi. Ngày 10/10 vì thế liệt kê cả "Đi cùng Tùng ra căng tin" lẫn "Đi cùng Tùng sang xưởng Robotics" trên cùng một đoạn bản đồ: người đọc truyện chữ nhảy được sang xưởng mà bỏ qua Hiếu. Không có liên kết chết (test 69/69).
- Truyện chữ in "Còn 0 ngày tới Buổi giải trình" ở ngày 15/10.
- Game (`src/mvp/`) chưa đọc các dòng ngày; chỉ truyện chữ đọc được (gói máy lịch B1).

## 9. Đã dựng

Lịch, 25 chuỗi mới, ba `[ĐỐI CHẤT]`, khung việc ngày lễ, 30 khối lời giữ chỗ; dời mở vụ về 08/10 (3 dòng ngày/thứ); hai hướng kiểm ở xưởng sang 10/10; T-09, T-10 thành tin gõ trả lời (TRA_LOI, có chữ đằng trước); màn "làm sạch" trên tin nhắn thay bằng "chứa cụm dài"; làm sạch (LOWER, TRIM) dời sang sổ đặt phòng nhà văn hóa gõ tay (bảng `dat_phong` thay `dat_xuong`, không thẻ vụ khác nào dùng `dat_xuong`); sửa lỗi sót B4.4a (thuật ngữ SQL ở miệng Hà Vy, Minh Anh; "lọc tiếp trên phiếu"; chú thích đầu thẻ; `ev-tin-don` gắn về màn chứa cụm dài).

## 10. Lỗi còn lại (chưa sửa vì ngoài các dòng được phép)

- `loi/tt-tin-don.md` `c-tin-bang.1`: "Khi chạy ra 338 dòng" nhưng bảng `tin_nhan` có 340 dòng (10 dòng truyện + 330 nhiễu), lời ấy không bao giờ hiện. Có từ trước gói này.
- `c-tin-chua.1` "Khi đúng" Minh Anh: "có một tin bị sửa nội dung" (T-08 là tin chuyện khác, không phải tin bị sửa); "Khi chạy ra 5 dòng" Hà Vy: "ký hiệu phần trăm"; "Khi chạy ra 0 dòng" Tùng: "Dùng phần trăm đúng chưa đấy?"; `c-tin-in.1` Tùng: "Dùng IN để lấy hai cái cần tìm thôi." (thuật ngữ SQL ở miệng Tùng, Hà Vy).
- Giấy nhớ chưa có "Giá trị cho trình dựng" cho `soi dữ liệu sinh viên` và `xr-01` (giấy nhớ `clue-noi-dung-tin` giữ "CLB Thám Tử soi dữ liệu"). Máy kiểm không đòi; màn tra trong game có thể cần khi ghép.
- Mã thẻ `c-tin-sach`, chuỗi `tin-tra-sach`, khối lời `tin-tra-sach.1` giữ tên cũ dù màn nay là "chứa cả đoạn dài" (giữ để ít xáo trộn mã).

## 11. Đếm và việc cho lượt lời

Số đo nền sau bước dựng: `grep -cE '^- (\*\*|Khi )'` ra `loi/10-vu-2-tin-don.md:157`, `loi/tt-tin-don.md:37` (tổng 194; trước gói 127 + 32 = 159). `grep -c '^### ' kich-ban/10-vu-2-tin-don.md` ra 53 (trước 26).

Số dòng nhắm tới của khối mới: ngày 08/10: 32; ngày 09/10: 28; ngày 10/10: 39; ngày 14/10: 27; ngày 15/10: 55. Tổng 181. Sau các lượt lời Vụ 2 đạt 164 + 181 = **345** dòng (164 = 127 lời cũ + 37 lời thẻ; ngưỡng 300). Chuỗi 53 (≥ 40), màn tra 8 (≥ 5), đối chất 3, một giữa vụ.

| Lượt | Khối | Dòng nhắm tới |
|---|---|---|
| 1 (ngày 08/10 và đầu chiều 09/10) | `tin-mo-hieu`, `tin-mo-han`, `tin-n1-xuong-mai`, `tin-n1-chot.1`, `tin-n1-toi.1`, `tin-n2-mo.1`, `tin-n2-duy.1`, `tin-n2-tung.1`, `tin-n2-in` | 50 |
| 2 (cuối 09/10 và ngày 10/10) | `tin-gap-nam-het`, `tin-n2-het.1`, `tin-n3-mo.1`, `tin-n3-cang-tin.1`, `tin-n3-hieu.1`, `tin-n3-hieu-du.1`, `tin-n3-hieu-chua.1`, `tin-n3-cang-tin-an.1`, `tin-n3-xuong.1`, `tin-n3-phong.1` | 49 |
| 3 (ngày 14/10 và sáng 15/10) | `tin-n5-mo.1`, `tin-n5-toa-b.1`, `tin-n5-toa-b-an.1`, `tin-n5-phong.1`, `tin-n6-mo.1`, `le-hsv-mo.1`, `le-hsv-lo.1` | 42 |
| 4 (buổi giải trình) | `tin-gt-mo.1`, `tin-gt-giua`, `tin-gt-ket-du.1`, `tin-gt-ket-chua.1` | 40 |

Mỗi lượt: chỉ viết vào khối `## <mã>` của `loi/10-vu-2-tin-don.md`, không đụng `kich-ban/`, không sửa dòng cũ ngoài dòng giữ chỗ "(tạm)" của chính khối ấy, đo trước/sau bằng `grep -cE '^- (\*\*|Khi )' loi/10-vu-2-tin-don.md loi/tt-tin-don.md`, chạy `npm run kiem-giong:mua1 -- --chi-loi` (0 lỗi).
