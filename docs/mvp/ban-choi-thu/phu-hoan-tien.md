# Nhiệm vụ phụ: Một lần hoàn tiền, hai dòng ghi (Minh Anh giao)

Quy ước: dòng "- **Tên** (biểu cảm): …" là lời thoại hiện từng câu; "🗂️" là thẻ vào hồ sơ (cũng ghim lên bảng điều tra); "💻" là màn tra dữ liệu trên laptop; "❓" là câu hỏi nhiều lựa chọn; "🔀" là rẽ nhánh do người chơi chọn; "⤵" là rẽ tự động theo cờ (hai đường loại trừ nhau — bản này in CẢ HAI để bạn đọc, người chơi chỉ đi một). Mỗi chuỗi chỉ in một lần; gặp "*(tiếp theo như chuỗi … đã in ở trên)*" thì quay lên đọc.

## 📍 Phòng CLB — Tổng hoàn tiền trong bảng cao hơn biên nhận

*[Thẻ chữ]* Việc ở CLB — Thứ Sáu, 8 tháng 11
- **Người kể**: Phòng CLB, sau buổi hướng dẫn SQL cho tân thành viên. Minh Anh ngồi với bản xuất thu chi và một xấp biên nhận.
- **Minh Anh** (khoanh-tay): Bảng cộng tiền hoàn ra một trăm năm mươi lăm nghìn. Biên nhận chị cầm cộng lại chỉ có chín mươi lăm. Lệch sáu mươi.
- **Minh Anh** (neutral): Mình cần biết phiếu nào phải mở ra xem lại. Chưa phải tìm người chịu lỗi.
- **Quân** (neutral): Tôi ngồi nghe được chứ? Mục thu chi là mục cuối tôi phải xem.
> 🗂️ Tài liệu mới: **Bản xuất thu chi buổi hướng dẫn SQL** — nguồn: Minh Anh xuất từ sổ thu chi CLB
> Tám dòng, năm cột: mã giao dịch, mã phiếu, loại, số tiền, mã tham chiếu.
> Loại CHI là khoản đã chi; loại HOAN là khoản được hoàn lại, số tiền ghi âm.
> Đây là nguồn cần kiểm, chưa phải bằng chứng ai làm sai.
> 🗂️ Giấy nhớ mới: **[Hoàn tiền]** — nguồn: Bản xuất thu chi
> Cột loai ghi CHI cho khoản chi, HOAN cho khoản hoàn lại.
> (giấy nhớ kéo được vào màn tra: HOAN)
> 🗂️ Giấy nhớ mới: **[Một dòng]** — nguồn: Cách ghi sổ thu chi, Duy nhắc
> Một lần hoàn tiền chỉ ghi một dòng. Phiếu có số dòng hoàn lớn hơn 1 thì cần mở chứng từ gốc ra xem.
> (giấy nhớ kéo được vào màn tra: 1)
- **Tùng** (chi-tay): Lệch thì chắc có khoản hoàn hai lần?
- **Hà Vy** (thinking): Chưa biết. Bảng lẫn cả dòng chi lẫn dòng hoàn. Lấy riêng dòng hoàn ra đã, ghim lại.
> 🎯 NHIỆM VỤ: Bản xuất có những dòng hoàn tiền nào?
> 💭 Hà Vy nhắc: Loại giao dịch ghi ở cột loai. Chỉ lấy dòng hoàn.
### 💻 Màn tra: Bản xuất thu chi buổi hướng dẫn (thẻ `c-hoan-loc`)
Đề bài trên màn hình: *Bản xuất lẫn cả khoản chi lẫn khoản hoàn. Những dòng nào là hoàn tiền?*
Cách chơi: kéo giấy nhớ vào ô giá trị, bấm cột / phép ("bằng", "bắt đầu bằng") / VÀ–HOẶC rồi CHẠY. Chạy sai không bị phạt.
Bảng `giao_dich` (8 dòng):
| ma_gd | ma_phieu | loai | so_tien | ma_tham_chieu |
|---|---|---|---|---|
| GD-01 | PH-01 | CHI | 250000 | CT-101 |
| GD-02 | PH-01 | HOAN | -20000 | NH-770 |
| GD-03 | PH-02 | CHI | 180000 | CT-102 |
| GD-04 | PH-03 | CHI | 90000 | CT-103 |
| GD-05 | PH-04 | CHI | 350000 | CT-104 |
| GD-06 | PH-04 | HOAN | -60000 | NH-771 |
| GD-07 | PH-04 | HOAN | -60000 | NH-771 |
| GD-08 | PH-06 | HOAN | -15000 | NH-776 |
Giấy nhớ đang có quanh màn hình: [HOAN] [1]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
SELECT ma_gd, ma_phieu, so_tien, ma_tham_chieu FROM giao_dich WHERE loai = 'HOAN';
```
Kết quả: 4 dòng
| ma_gd | ma_phieu | so_tien | ma_tham_chieu |
|---|---|---|---|
| GD-02 | PH-01 | -20000 | NH-770 |
| GD-06 | PH-04 | -60000 | NH-771 |
| GD-07 | PH-04 | -60000 | NH-771 |
| GD-08 | PH-06 | -15000 | NH-776 |
Lời nhân vật sau mỗi lần chạy:
- Khi ra 0 dòng: **Hà Vy** (thinking): Không dòng nào. Loại giao dịch viết hoa, đúng như giấy nhớ.
- Khi ra 8 dòng: **Tùng** (gai-dau): Cả bản xuất, lẫn cả khoản chi.
- Khi đúng: **Hà Vy** (neutral): Bốn dòng hoàn. Ghim lại, rồi gom theo phiếu.
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **Bốn dòng hoàn tiền** — Kết quả truy vấn: bốn dòng loại HOAN, thuộc ba phiếu PH-01, PH-04, PH-06. Cộng lại âm 155.000 đồng.

- **Bạn (người chơi)**: Bốn dòng hoàn tiền.
- **Duy** (neutral): Mỗi lần hoàn chỉ được có một dòng. Phiếu nào có hơn một dòng hoàn thì cần mở ra xem.
- **Hà Vy** (thinking): Gom theo mã phiếu, đếm dòng, cộng tiền. Rồi chỉ giữ nhóm có hơn một dòng. Lần này lọc nhóm theo số dòng, không theo tổng.
> 🎯 NHIỆM VỤ: Phiếu nào có hơn một dòng hoàn tiền, tổng ghi hoàn bao nhiêu?
> 💭 Hà Vy nhắc: Phiếu bốn dòng hoàn làm nguồn. Gom theo mã phiếu, tính tổng, chỉ giữ nhóm có số dòng lớn hơn một.
### 💻 Màn tra: Dòng hoàn gom theo mã phiếu (thẻ `c-hoan-nhom`)
Đề bài trên màn hình: *Lấy phiếu bốn dòng hoàn làm nguồn. Gom theo mã phiếu, tính tổng số tiền, chỉ giữ nhóm có hơn một dòng.*
Cách chơi: màn TỔNG HỢP — chọn nguồn (phiếu đã ghim `ev-hoan-loc`), lọc tùy chọn bằng giấy nhớ, chọn cột để NHÓM; máy đếm số dòng mỗi nhóm (COUNT), có thể tính tổng / trung bình và chỉ giữ nhóm vượt ngưỡng nếu bài cần.
Giấy nhớ đang có quanh màn hình: [HOAN] [1]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
WITH hoan_loc AS (phiếu "Bốn dòng hoàn tiền")
SELECT ma_phieu, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien FROM hoan_loc GROUP BY ma_phieu HAVING COUNT(*) > 1;
```
Kết quả: 1 dòng
| ma_phieu | so_dong | tong_so_tien |
|---|---|---|
| PH-04 | 2 | -120000 |
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **PH-04: hai dòng hoàn, tổng âm 120.000** — Kết quả gom theo mã phiếu: chỉ PH-04 có hơn một dòng hoàn (hai dòng, tổng ghi âm 120.000 đồng). Đây là phiếu cần mở chứng từ gốc, chưa phải kết luận.

- **Bạn (người chơi)**: Một phiếu. PH-04: hai dòng, tổng ghi hoàn là âm một trăm hai mươi nghìn.
- **Quân** (neutral): Hai dòng cùng một phiếu là tín hiệu cần kiểm, chưa phải kết luận. Mở chứng từ gốc.
- **Minh Anh** (neutral): Biên nhận ngân hàng của PH-04 đây.
> 🗂️ Tài liệu mới: **Biên nhận ngân hàng của phiếu PH-04** — nguồn: Ngân hàng gửi, Minh Anh giữ
> Phiếu PH-04. Một giao dịch hoàn: 60.000 đồng. Mã tham chiếu NH-771.
> Biên nhận không ghi ai nhập dòng nào vào sổ.
- **Minh Anh** (neutral): Biên nhận ghi một giao dịch hoàn sáu mươi nghìn, mã tham chiếu NH-771. Trong bản xuất, cả hai dòng của PH-04 đều mang mã NH-771.
- **Tùng** (surprised): Một lần hoàn mà ghi hai dòng. Đúng sáu mươi nghìn bị lệch.
- **Hà Vy** (thinking): Đếm dòng là đếm bản ghi, không phải đếm lần chuyển tiền.
> ❓ Quân hỏi: "Vậy mục thu chi, các bạn ghi câu nào về phiếu PH-04?" (chọn sai thì nghe phản hồi rồi chọn lại)
>   - Bản xuất có hai dòng hoàn cùng mã tham chiếu; biên nhận ngân hàng xác nhận một lần hoàn 60.000 đồng. Sửa báo cáo, giữ bản cũ. ✅ → **Quân** (neutral): Có phiếu, có biên nhận, có bản cũ. Câu ấy tôi kiểm lại được.
>   - Có người cố tình nhập hai lần để rút sáu mươi nghìn. → **Quân** (neutral): Bảng có cột nào ghi ai nhập không? Tôi đánh dấu phiếu này để kiểm, không phải để kết tội.
>   - Hai dòng thì chắc chắn là hoàn hai lần. → **Hà Vy** (thinking): Hai dòng cùng một mã tham chiếu ngân hàng. Biên nhận ghi mấy lần hoàn?
- **Minh Anh** (neutral): Chị sửa báo cáo: PH-04 hoàn một lần, sáu mươi nghìn. Bản cũ chị giữ nguyên, ghi thêm ngày sửa và lý do.
- **Quân** (neutral): Chưa có căn cứ nói ai cố ý. Hồ sơ của các bạn tôi xem xong rồi. Mục nào cũng tự kiểm được.
- **Tùng** (happy): Lần này tớ đoán đúng một nửa.
- **Hà Vy** (smile): Nửa còn lại là biên nhận nói.
*[Thẻ chữ]* Gom nhóm chỉ ra chỗ cần mở chứng từ. Chứng từ mới nói chuyện gì đã xảy ra.
> 🏁 KẾT THÚC vụ → màn kết.

## 🏁 Màn kết
**Một khoản hoàn, bản xuất ghi hai lần** — Phiếu PH-04 có hai dòng hoàn tiền cùng mã tham chiếu; biên nhận ngân hàng xác nhận một lần hoàn 60.000 đồng. Báo cáo được sửa, bản cũ được giữ. Ai nhập trùng thì bảng không ghi.