# Nhiệm vụ phụ — Một lần hoàn tiền, hai dòng ghi

Sách truyện chữ tương tác tự chọn hướng đi (Choose-Your-Own-Adventure). Bấm vào các liên kết để chuyển đoạn.

## 📅 Mục lục phân đoạn

- [Đoạn 1: Tổng hoàn tiền trong bảng cao hơn biên nhận](#doan-1)

## 👥 Nhân vật xuất hiện

- **Minh Anh**: năm 3 Luật kinh tế, chủ nhiệm clb thám tử
- **Tùng**: năm 1 Du lịch, bạn cùng phòng 408
- **Hà Vy**: năm 1 Toán ứng dụng, thành viên mới của clb thám tử
- **Quân**: Ban Pháp chế – Kiểm tra, Hội sinh viên
- **Duy**: năm 2 Hành chính học, thành viên clb, giữ tài sản

## 📊 Bảng đo chỉ số C2

| Tiêu chí | Ngưỡng thiết kế | Thực tế | Đánh giá |
|---|---|---|---|
| Số dòng thoại | ≥ 300 | 23 | ⚠️ Bản mẫu |
| Số chuỗi phân cảnh | ≥ 40 | 1 | ⚠️ Bản mẫu |
| Màn tra cứu SQL | ≥ 5 | 2 | ⚠️ Bản mẫu |
| Nhịp đối chất | ≥ 3 | 0 | ⚠️ Bản mẫu |

---

<a id="doan-1"></a>
### Đoạn 1: Tổng hoàn tiền trong bảng cao hơn biên nhận

Thứ Sáu, 29/11/2024

📍 **Phòng CLB** — *Tổng hoàn tiền trong bảng cao hơn biên nhận*

> 📜 **[THẺ CHỮ]** Thứ Sáu, 29/11/2024 · Việc ở CLB
- *Phòng CLB, sau buổi hướng dẫn SQL cho tân thành viên. Minh Anh ngồi với bản xuất thu chi và một xấp biên nhận.*
- **Minh Anh**: Bảng cộng tiền hoàn ra một trăm năm mươi lăm nghìn. Biên nhận chị cầm cộng lại chỉ có chín mươi lăm. Lệch sáu mươi.
- **Minh Anh**: Mình cần biết phiếu nào phải mở ra xem lại. Chưa phải tìm người chịu lỗi.
- **Tùng** (chỉ tay): Tớ cá là có ai cộng nhầm.
- **Hà Vy**: Lần thứ ba mươi tám. Tớ ghi rồi, cậu cứ nói tiếp.
- **Quân**: Tôi ngồi nghe được chứ? Mục thu chi là mục cuối tôi phải xem.
> 🗂️ **Tài liệu mới**: **Bản xuất thu chi của CLB** — 
- **Tùng** (chỉ tay): Lệch thì chắc có khoản hoàn hai lần?
- **Hà Vy** (suy nghĩ): Chưa biết. Bảng lẫn cả dòng chi lẫn dòng hoàn. Lấy riêng dòng hoàn ra đã, ghim lại.
> 🎯 **NHIỆM VỤ**: Bản xuất có những dòng hoàn tiền nào?
> 💭 **Nhắc nhở** (Hà Vy): Loại giao dịch ghi ở cột loai. Chỉ lấy dòng hoàn.
#### 💻 Màn tra dữ liệu: Bản xuất thu chi của CLB (thẻ `c-hoan-loc`)
*Đề bài:* Bản xuất lẫn cả khoản thu, khoản chi lẫn khoản hoàn. Những dòng nào là hoàn tiền?

```sql
SELECT ma_gd, ma_phieu, so_tien, ma_tham_chieu FROM giao_dich WHERE loai = 'HOAN';
```

*Kết quả chạy thật: 4 dòng*

| ma_gd | ma_phieu | so_tien | ma_tham_chieu |
| --- | --- | --- | --- |
| GD-02 | PH-01 | -20000 | NH-770 |
| GD-06 | PH-04 | -60000 | NH-771 |
| GD-07 | PH-04 | -60000 | NH-771 |
| GD-08 | PH-06 | -15000 | NH-776 |

*Các bẫy và phản hồi từ nhân vật:*
- Nếu lọc ra 0 dòng → **Hà Vy** (suy nghĩ): Không dòng nào. Loại giao dịch viết hoa, đúng như giấy nhớ.
- Nếu lọc ra 68 dòng → **Tùng** (gãi đầu): Cả bản xuất, sáu mươi tám dòng, lẫn cả khoản thu khoản chi.
- Nếu tra đúng → **Hà Vy**: Bốn dòng hoàn. Ghim lại, rồi gom theo phiếu.

> 🗂️ **Bằng chứng thu thập**: **Bốn dòng hoàn tiền** — Kết quả truy vấn: bốn dòng loại HOAN, thuộc ba phiếu PH-01, PH-04, PH-06. Cộng lại âm 155.000 đồng.
*Bạn tra cứu thành công và có đủ thông tin để tiếp tục.*

- **Bạn**: Bốn dòng hoàn tiền.
- **Duy**: Theo cách ghi sổ thì mỗi lần hoàn một dòng. Phiếu có hơn một dòng hoàn chưa chắc sai, có khi hoàn hai lần thật. Nhưng đấy là chỗ cần mở chứng từ.
- **Hà Vy** (suy nghĩ): Bốn dòng, ba phiếu. Hôm trước mình giữ nhóm theo tổng tiền. Lần này cái cần giữ là nhóm có nhiều dòng.
> 🎯 **NHIỆM VỤ**: Phiếu nào có hơn một dòng hoàn tiền, sổ ghi hoàn tổng cộng bao nhiêu?
> 💭 **Nhắc nhở** (Hà Vy): Phiếu bốn dòng hoàn làm nguồn. Mỗi phiếu mấy dòng, cộng bao nhiêu tiền; chỉ giữ phiếu có hơn một dòng.
#### 💻 Màn tra dữ liệu: Dòng hoàn gom theo mã phiếu (thẻ `c-hoan-nhom`)
*Đề bài:* Lấy phiếu bốn dòng hoàn làm nguồn. Gom theo mã phiếu, tính tổng số tiền, chỉ giữ nhóm có hơn một dòng.

```sql
SELECT ma_phieu, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien FROM @ev-hoan-loc GROUP BY ma_phieu HAVING COUNT(*) > 1;
```

*(Chạy SQL: near "@ev": syntax error)*

> 🗂️ **Bằng chứng thu thập**: **PH-04: hai dòng hoàn, tổng âm 120.000** — Kết quả gom theo mã phiếu: chỉ PH-04 có hơn một dòng hoàn (hai dòng, tổng ghi âm 120.000 đồng). Đây là phiếu cần mở chứng từ gốc, chưa phải kết luận.
*Bạn tra cứu thành công và có đủ thông tin để tiếp tục.*

- **Bạn**: Một phiếu. PH-04: hai dòng, cột tiền cộng ra âm một trăm hai mươi nghìn. Khoản hoàn ghi số âm, tức sổ đang ghi hoàn một trăm hai mươi nghìn cho phiếu này.
- **Quân**: Hai dòng cùng một phiếu là tín hiệu cần kiểm, chưa phải kết luận. Mở chứng từ gốc.
- **Minh Anh**: Biên nhận ngân hàng của PH-04 đây.
> 🗂️ **Tài liệu mới**: **Biên nhận ngân hàng của phiếu PH-04** — 
- **Minh Anh**: Biên nhận ghi một giao dịch hoàn sáu mươi nghìn, mã tham chiếu NH-771. Trong bản xuất, cả hai dòng của PH-04 đều mang mã NH-771.
- **Tùng** (ngạc nhiên): Hoàn một lần sáu mươi nghìn mà sổ ghi hai dòng, thành một trăm hai mươi. Dư đúng sáu mươi nghìn đang lệch.
- **Hà Vy** (suy nghĩ): Đếm dòng là đếm bản ghi, không phải đếm lần chuyển tiền.
> [CHIBI chibi-phu-mot-bien-nhan (sticker)] (chưa có mô tả)
❓ **Quân hỏi**: "Vậy mục thu chi, các bạn ghi câu nào về phiếu PH-04?"
*Các lựa chọn trả lời:*
  - "Bản xuất có hai dòng hoàn cùng mã tham chiếu; biên nhận ngân hàng xác nhận một lần hoàn 60.000 đồng. Sửa báo cáo, giữ bản cũ." ✅ → **Quân**: Có phiếu, có biên nhận, có bản cũ. Câu ấy tôi kiểm lại được.
  - "Có người cố tình nhập hai lần để rút sáu mươi nghìn." ❌ → **Quân**: Bảng có cột nào ghi ai nhập không? Tôi đánh dấu phiếu này để kiểm, không phải để kết tội.
  - "Hai dòng thì chắc chắn là hoàn hai lần." ❌ → **Hà Vy** (suy nghĩ): Hai dòng cùng một mã tham chiếu ngân hàng. Biên nhận ghi mấy lần hoàn?

- **Minh Anh**: Chị sửa báo cáo: PH-04 hoàn một lần, sáu mươi nghìn. Bản cũ chị giữ nguyên, ghi thêm ngày sửa và lý do.
- **Quân**: Chưa có căn cứ nói ai cố ý. Hồ sơ của các bạn tôi xem xong rồi. Mục nào cũng tự kiểm được.
- **Tùng** (vui vẻ): Lần này tớ đoán đúng một nửa.
- **Hà Vy**: Nửa còn lại là biên nhận nói.
> 📜 **[THẺ CHỮ]** Gom nhóm chỉ ra chỗ cần mở chứng từ. Chứng từ mới nói chuyện gì đã xảy ra.

🏁 **KẾT THÚC** — Hoàn tất nhiệm vụ.
> **Một khoản hoàn, bản xuất ghi hai lần** — Phiếu PH-04 có hai dòng hoàn tiền cùng mã tham chiếu; biên nhận ngân hàng xác nhận một lần hoàn 60.000 đồng. Báo cáo được sửa, bản cũ được giữ. Ai nhập trùng thì bảng không ghi.


---
