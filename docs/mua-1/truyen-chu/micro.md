# Nhiệm vụ phụ — Chiếc micro ở tủ chung

Sách truyện chữ tương tác tự chọn hướng đi (Choose-Your-Own-Adventure). Bấm vào các liên kết để chuyển đoạn.

## 📅 Mục lục phân đoạn

- [Đoạn 1: Duy kiểm kê thiết bị, thiếu chiếc micro không dây](#doan-1)

## 👥 Nhân vật xuất hiện

- **Tùng**: năm 1 Du lịch, bạn cùng phòng 408
- **Duy**: năm 2 Hành chính học, thành viên clb, giữ tài sản
- **Minh Anh**: năm 3 Luật kinh tế, chủ nhiệm clb thám tử
- **Hà Vy**: năm 1 Toán ứng dụng, thành viên mới của clb thám tử
- **Quân**: Ban Pháp chế – Kiểm tra, Hội sinh viên

## 📊 Bảng đo chỉ số C2

| Tiêu chí | Ngưỡng thiết kế | Thực tế | Đánh giá |
|---|---|---|---|
| Số dòng thoại | ≥ 300 | 22 | ⚠️ Bản mẫu |
| Số chuỗi phân cảnh | ≥ 40 | 1 | ⚠️ Bản mẫu |
| Màn tra cứu SQL | ≥ 5 | 1 | ⚠️ Bản mẫu |
| Nhịp đối chất | ≥ 3 | 0 | ⚠️ Bản mẫu |

---

<a id="doan-1"></a>
### Đoạn 1: Duy kiểm kê thiết bị, thiếu chiếc micro không dây

Thứ Sáu, 15/11/2024

📍 **Phòng CLB** — *Duy kiểm kê thiết bị, thiếu chiếc micro không dây*

> [ẢNH obj-hop-banh-quy] (chưa có mô tả)
> 📜 **[THẺ CHỮ]** Thứ Sáu, 15/11/2024 · Việc ở CLB
- *Chiều thứ Sáu. Duy bày thiết bị ra bàn để kiểm kê cho buổi hướng dẫn cuối kỳ, đếm đi đếm lại.*
- *Cuối bàn là một hộp bánh quy đã vơi nửa, nhãn ghi "BQ-09".*
- **Tùng** (ngạc nhiên): BQ-09 rồi á?
- **Duy**: Luật là ai ăn cái cuối thì mua hộp mới. Anh kiểm kê sau cùng nên lần nào cũng là anh.
- **Duy**: Micro không dây không ở ngăn dưới. Sổ tài sản vẫn ghi nó thuộc CLB mình, để ở tủ CLB.
- **Tùng** (chỉ tay): Tớ cá là ai đó cầm đi rồi quên trả.
- **Minh Anh**: Mình chưa có căn cứ để gọi là quên hay lấy. Tòa nhà có phiếu luân chuyển thiết bị, tìm trên phiếu trước.
> 🗂️ **Tài liệu mới**: **Sổ tài sản và phiếu luân chuyển** — 
- **Duy**: Phiếu luân chuyển đây. Nhưng phiếu chỉ ghi mã tài sản với nơi chuyển tới, không ghi tên. Tên thì nằm ở sổ tài sản.
- **Hà Vy** (suy nghĩ): Vậy phải ghép phiếu với sổ. Hai bảng có hai cột trùng tên, xem cột nào mới là của chính từng thiết bị.
- **Duy**: Mà phiếu có cái đã nhận, có cái mới đề xuất. Anh cần phiếu đã có người nhận.
> 🎯 **NHIỆM VỤ**: Phiếu nào đã có người nhận ghi chuyển chiếc micro không dây, và chuyển tới đâu?
> 💭 **Nhắc nhở** (Hà Vy): Phiếu chỉ ghi mã, tên nằm ở sổ tài sản. Cần đúng chiếc micro không dây và phiếu đã có người nhận.
#### 💻 Màn tra dữ liệu: Phiếu luân chuyển nối với sổ tài sản (thẻ `c-mic-phieu`)
*Đề bài:* Phiếu luân chuyển chỉ ghi mã tài sản; sổ tài sản mới ghi tên. Phiếu nào đã có người nhận ghi chuyển chiếc micro không dây, và chuyển tới đâu?

```sql
SELECT ma_phieu, ten_tai_san, luan_chuyen.vi_tri, nguoi_nhan FROM luan_chuyen JOIN tai_san ON luan_chuyen.ma_tai_san = tai_san.ma_tai_san WHERE ten_tai_san = 'Micro không dây' AND trang_thai = 'DA_NHAN';
```

*Kết quả chạy thật: 1 dòng*

| ma_phieu | ten_tai_san | vi_tri | nguoi_nhan |
| --- | --- | --- | --- |
| PX-17 | Micro không dây | TU_THIET_BI_CHUNG | Tổ thiết bị |

- **Lọc từng bước**: Ten_tai_san trước: 7 → 2 → 1 · Trang_thai trước: 7 → 5 → 1

*Các bẫy và phản hồi từ nhân vật:*
- Nếu lỗi không có cột → **Duy**: Máy báo không có cột đó. Phiếu luân chuyển không ghi tên thiết bị; tên nằm ở sổ tài sản. Phải nối hai bảng trước đã.
- Nếu lọc ra 0 dòng → **Hà Vy** (suy nghĩ): Không dòng nào. Tên thiết bị và trạng thái viết đúng như trên giấy nhớ.
- Nếu lọc ra 2 dòng → **Hà Vy** (suy nghĩ): Hai phiếu của micro không dây. Một cái mới là đề xuất, chưa ai nhận.
- Nếu lọc ra 3 dòng → **Tùng** (gãi đầu): Ba dòng, mà là phiếu của loa, của máy ảnh, của chân máy, lại mang tên micro. / **Hà Vy** (suy nghĩ): Cột vi_tri ở phiếu là nơi chuyển tới, ở sổ là chỗ để đầu kỳ. Nối theo nó thì phiếu nào chuyển tới tủ CLB cũng ghép với chiếc micro từng để ở tủ CLB. Trùng tên cột, khác nghĩa.
- Nếu lọc ra 45 dòng → **Hà Vy** (suy nghĩ): Bốn mươi lăm dòng. Phiếu của CLB khác cũng dính vào đồ của mình, chỉ vì chuyển tới cùng một chỗ.
- Nếu lọc ra 51 dòng → **Hà Vy** (suy nghĩ): Năm mươi mốt dòng, trong khi đồ của CLB mình chỉ có bảy phiếu. Một phiếu kéo theo mấy thiết bị liền: cột nối này không phải mã của thiết bị.
- Nếu lọc ra 5 dòng → **Tùng** (gãi đầu): Năm phiếu đã nhận, của đủ mọi thiết bị. Mình chỉ tìm micro không dây.
- Nếu lọc ra 7 dòng → **Tùng** (gãi đầu): Bảy phiếu có đồ của CLB mình. Mình chỉ tìm một chiếc micro.
- Nếu tra đúng → **Duy**: Một phiếu. PX-17, sang tủ thiết bị dùng chung.

> 🗂️ **Bằng chứng thu thập**: **PX-17: micro không dây sang tủ thiết bị dùng chung** — Kết quả nối phiếu luân chuyển với sổ tài sản: phiếu PX-17 đã nhận, chuyển micro không dây (MIC-02) tới tủ thiết bị dùng chung, tổ thiết bị nhận.
*Bạn tra cứu thành công và có đủ thông tin để tiếp tục.*

- *Suy nghĩ của bạn:* *(Một phiếu. PX-17, ngày 24 tháng 10, chuyển micro không dây sang tủ thiết bị dùng chung. Tổ thiết bị đã nhận.)*
- **Duy**: Tủ dùng chung ở cuối hành lang. Đi xem.
> [CHIBI chibi-phu-tu-micro (sticker)] (chưa có mô tả)
- **Duy**: Mã trên micro là MIC-02, đúng mã trên phiếu. Tài sản không mất, chỗ để đã đổi. Về sửa lại sổ thôi.
- **Tùng** (gãi đầu): Tớ đoán sai rồi. May mà có mã, khỏi phải đoán người.
- **Minh Anh**: Phiếu còn lại của nó là chị đề xuất mượn sang phòng âm thanh cho buổi hướng dẫn. Chưa ai nhận nên micro vẫn nằm đây.
- **Quân**: Tôi qua xem mục tài sản như đã hẹn. Tìm thấy rồi thì tốt. Tôi hỏi một câu thôi.
❓ **Quân hỏi**: "Sổ có hai chiếc đều tên là micro. Sao các bạn biết phiếu PX-17 nói về đúng chiếc này?"
*Các lựa chọn trả lời:*
  - "Phiếu ghi mã tài sản, bọn mình nối theo mã ấy; mã dán trên micro trong tủ cũng là MIC-02." ✅ → **Quân**: Mã trên phiếu, mã trong sổ, mã trên vật. Ba chỗ khớp nhau thì tôi không hỏi nữa.
  - "Vì tên giống nhau: phiếu nào có micro thì là của chiếc này." ❌ → **Hà Vy** (suy nghĩ): Phiếu không ghi tên, chỉ ghi mã. Mà MIC-01 cũng là micro, cũng có phiếu sang tủ chung.
  - "Vì Duy giữ thiết bị, Duy nói thế thì đúng." ❌ → **Duy**: Tớ là người vừa không tìm thấy nó đấy. Đừng lấy tớ làm căn cứ.

- **Minh Anh**: Mục tài sản chị ghi: micro không dây đang ở tủ thiết bị dùng chung theo phiếu PX-17, đã đối chiếu mã trên vật. Kèm phiếu tra.
- **Quân**: Ghi thế thì ai mở tủ ra cũng tự kiểm được.
- **Tùng** (gãi đầu): Từ giờ tớ hỏi mã trước, cá sau.
- **Hà Vy**: Hỏi mã xong thì khỏi cá.
> 📜 **[THẺ CHỮ]** Tên có thể trùng, mã thì không. Nối hai bảng theo mã, rồi đi nhìn tận mắt cái mã trên vật.

🏁 **KẾT THÚC** — Hoàn tất nhiệm vụ.
> **Micro không mất, chỉ đổi chỗ** — Phiếu PX-17 đã có người nhận, chuyển micro không dây sang tủ thiết bị dùng chung; mã dán trên micro trong tủ khớp với mã trên phiếu. Bảng không nói ai quên báo, và hồ sơ cũng không nói thay.


---
