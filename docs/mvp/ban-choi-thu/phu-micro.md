# Nhiệm vụ phụ: Chiếc micro ở tủ chung (Duy giao)

Quy ước: dòng "- **Tên** (biểu cảm): …" là lời thoại hiện từng câu; "🗂️" là thẻ vào hồ sơ (cũng ghim lên bảng điều tra); "💻" là màn tra dữ liệu trên laptop; "❓" là câu hỏi nhiều lựa chọn; "🔀" là rẽ nhánh do người chơi chọn; "⤵" là rẽ tự động theo cờ (hai đường loại trừ nhau — bản này in CẢ HAI để bạn đọc, người chơi chỉ đi một). Mỗi chuỗi chỉ in một lần; gặp "*(tiếp theo như chuỗi … đã in ở trên)*" thì quay lên đọc.

## 📍 Phòng CLB — Duy kiểm kê thiết bị, thiếu chiếc micro không dây

*[Thẻ chữ]* Việc ở CLB — Thứ Sáu, 1 tháng 11
- **Người kể**: Chiều thứ Sáu. Duy bày thiết bị ra bàn để kiểm kê cho buổi hướng dẫn cuối kỳ, đếm đi đếm lại.
- **Duy** (neutral): Micro không dây không ở ngăn dưới. Sổ tài sản vẫn ghi nó thuộc CLB mình, để ở tủ CLB.
- **Tùng** (chi-tay): Tớ cá là ai đó cầm đi rồi quên trả.
- **Minh Anh** (neutral): Mình chưa có căn cứ để gọi là quên hay lấy. Tòa nhà có phiếu luân chuyển thiết bị, tìm trên phiếu trước.
> 🗂️ Tài liệu mới: **Sổ tài sản và phiếu luân chuyển** — nguồn: Duy giữ sổ tài sản; phiếu luân chuyển do tổ thiết bị tòa nhà lập
> Sổ tài sản: mã tài sản, tên, chỗ để ghi lúc kiểm kê đầu kỳ. Năm thiết bị, trong đó có hai chiếc micro.
> Phiếu luân chuyển: mã phiếu, mã tài sản, nơi chuyển tới, người nhận, ngày, trạng thái. Phiếu không ghi tên thiết bị.
> Cả hai bảng đều có cột vi_tri, nhưng ở sổ là chỗ để đầu kỳ, ở phiếu là nơi chuyển tới.
> 🗂️ Giấy nhớ mới: **[Micro không dây]** — nguồn: Sổ tài sản CLB
> Sổ tài sản ghi tên thiết bị ở cột ten_tai_san. Chiếc cần kiểm kê là "Micro không dây"; sổ còn một chiếc "Micro có dây".
> (giấy nhớ kéo được vào màn tra: Micro không dây)
> 🗂️ Giấy nhớ mới: **[Đã nhận]** — nguồn: Phiếu luân chuyển
> Phiếu DA_NHAN là phiếu đã có chữ ký người nhận, thiết bị đã thật sự chuyển. DE_XUAT là phiếu mới đề xuất, chưa ai nhận.
> (giấy nhớ kéo được vào màn tra: DA_NHAN)
- **Duy** (neutral): Phiếu luân chuyển đây. Nhưng phiếu chỉ ghi mã tài sản với nơi chuyển tới, không ghi tên. Tên thì nằm ở sổ tài sản.
- **Hà Vy** (thinking): Vậy phải ghép phiếu với sổ. Hai bảng có hai cột trùng tên, xem cột nào mới là của chính từng thiết bị.
- **Duy** (neutral): Mà phiếu có cái đã nhận, có cái mới đề xuất. Tớ cần phiếu đã có người nhận.
> 🎯 NHIỆM VỤ: Phiếu nào đã có người nhận ghi chuyển chiếc micro không dây, và chuyển tới đâu?
> 💭 Hà Vy nhắc: Phiếu chỉ ghi mã, tên nằm ở sổ tài sản. Cần đúng chiếc micro không dây và phiếu đã có người nhận.
### 💻 Màn tra: Phiếu luân chuyển nối với sổ tài sản (thẻ `c-mic-phieu`)
Đề bài trên màn hình: *Phiếu luân chuyển chỉ ghi mã tài sản; sổ tài sản mới ghi tên. Phiếu nào đã có người nhận ghi chuyển chiếc micro không dây, và chuyển tới đâu?*
Cách chơi: kéo giấy nhớ vào ô giá trị, bấm cột / phép ("bằng", "bắt đầu bằng") / VÀ–HOẶC, hàng "nối với bảng … theo cột …" rồi CHẠY. Chạy sai không bị phạt.
Bảng `luan_chuyen` (7 dòng):
| ma_phieu | ma_tai_san | vi_tri | nguoi_nhan | ngay | trang_thai |
|---|---|---|---|---|---|
| PX-11 | MIC-01 | TU_THIET_BI_CHUNG | Tổ thiết bị | 2024-10-22 | DA_NHAN |
| PX-14 | LOA-01 | TU_CLB | Tùng | 2024-10-23 | DA_NHAN |
| PX-17 | MIC-02 | TU_THIET_BI_CHUNG | Tổ thiết bị | 2024-10-24 | DA_NHAN |
| PX-19 | MIC-02 | PHONG_AM_THANH | Minh Anh | 2024-10-31 | DE_XUAT |
| PX-20 | CAM-01 | TU_CLB | Minh Anh | 2024-10-28 | DA_NHAN |
| PX-21 | MIC-01 | PHONG_AM_THANH | Tùng | 2024-10-31 | DE_XUAT |
| PX-22 | CHAN-01 | TU_CLB | Duy | 2024-10-28 | DA_NHAN |
Bảng `tai_san` (5 dòng):
| ma_tai_san | ten_tai_san | vi_tri |
|---|---|---|
| MIC-01 | Micro có dây | TU_CLB |
| MIC-02 | Micro không dây | TU_CLB |
| CAM-01 | Máy ảnh CLB | TU_CLB |
| LOA-01 | Loa kéo | KHO_CHUNG |
| CHAN-01 | Chân máy ảnh | TU_CLB |
Giấy nhớ đang có quanh màn hình: [Micro không dây] [DA_NHAN]
Câu đúng (một trong các câu đúng; máy chấm theo tập kết quả; trên màn hình, phiếu làm nguồn hiện thành WITH <tên> AS (phiếu …)):
```sql
SELECT ma_phieu, ten_tai_san, luan_chuyen.vi_tri, nguoi_nhan FROM luan_chuyen JOIN tai_san ON luan_chuyen.ma_tai_san = tai_san.ma_tai_san WHERE ten_tai_san = 'Micro không dây' AND trang_thai = 'DA_NHAN';
```
Kết quả: 1 dòng
| ma_phieu | ten_tai_san | vi_tri | nguoi_nhan |
|---|---|---|---|
| PX-17 | Micro không dây | TU_THIET_BI_CHUNG | Tổ thiết bị |
Lời nhân vật sau mỗi lần chạy:
- Khi lỗi không có cột: **Duy** (neutral): Máy báo không có cột đó. Phiếu luân chuyển không ghi tên thiết bị; tên nằm ở sổ tài sản. Phải nối hai bảng trước đã.
- Khi ra 0 dòng: **Hà Vy** (thinking): Không dòng nào. Tên thiết bị và trạng thái viết đúng như trên giấy nhớ.
- Khi ra 2 dòng: **Hà Vy** (thinking): Hai phiếu của micro không dây. Một cái mới là đề xuất, chưa ai nhận.
- Khi ra 3 dòng: **Tùng** (gai-dau): Ba dòng, mà là phiếu của loa, của máy ảnh, của chân máy, lại mang tên micro. / **Hà Vy** (thinking): Cột vi_tri ở phiếu là nơi chuyển tới, ở sổ là chỗ để đầu kỳ. Nối theo nó thì phiếu nào chuyển tới tủ CLB cũng ghép với chiếc micro từng để ở tủ CLB. Trùng tên cột, khác nghĩa.
- Khi ra 12 dòng: **Hà Vy** (thinking): Mười hai dòng cho bảy phiếu. Một phiếu kéo theo mấy thiết bị liền: cột nối này không phải mã của thiết bị.
- Khi ra 5 dòng: **Tùng** (gai-dau): Năm phiếu đã nhận, của đủ mọi thiết bị. Mình chỉ tìm micro không dây.
- Khi ra 7 dòng: **Tùng** (gai-dau): Cả tập phiếu. Mình chỉ tìm một chiếc micro.
- Khi đúng: **Duy** (neutral): Một phiếu. PX-17, sang tủ thiết bị dùng chung.
> 🗂️ Tra đúng → ghim phiếu lên bảng điều tra: **PX-17: micro không dây sang tủ thiết bị dùng chung** — Kết quả nối phiếu luân chuyển với sổ tài sản: phiếu PX-17 đã nhận, chuyển micro không dây (MIC-02) tới tủ thiết bị dùng chung, tổ thiết bị nhận.

- **Bạn (người chơi)**: Một phiếu. PX-17, ngày 24 tháng 10, chuyển micro không dây sang tủ thiết bị dùng chung. Tổ thiết bị đã nhận.
- **Duy** (neutral): Tủ dùng chung ở cuối hành lang. Đi xem.
> 🗂️ Giấy nhớ mới: **[Mã dán trên micro: MIC-02]** — nguồn: Duy và Minh Anh mở tủ xem
> Chiếc micro không dây trong tủ thiết bị dùng chung mang nhãn MIC-02, đúng mã trên phiếu PX-17. Phiếu và vật khớp nhau; không ai ghi vì sao sổ CLB chưa được sửa.
- **Duy** (neutral): Mã trên micro là MIC-02, đúng mã trên phiếu. Tài sản không mất, chỗ để đã đổi. Tớ sửa lại sổ.
- **Tùng** (gai-dau): Tớ đoán sai rồi. May mà có mã, khỏi phải đoán người.
- **Minh Anh** (neutral): Phiếu còn lại của nó là chị đề xuất mượn sang phòng âm thanh cho buổi hướng dẫn. Chưa ai nhận nên micro vẫn nằm đây.
- **Quân** (neutral): Tôi qua xem mục tài sản như đã hẹn. Tìm thấy rồi thì tốt. Tôi hỏi một câu thôi.
> ❓ Quân hỏi: "Sổ có hai chiếc đều tên là micro. Sao các bạn biết phiếu PX-17 nói về đúng chiếc này?" (chọn sai thì nghe phản hồi rồi chọn lại)
>   - Phiếu ghi mã tài sản, bọn mình nối theo mã ấy; mã dán trên micro trong tủ cũng là MIC-02. ✅ → **Quân** (neutral): Mã trên phiếu, mã trong sổ, mã trên vật. Ba chỗ khớp nhau thì tôi không hỏi nữa.
>   - Vì tên giống nhau: phiếu nào có micro thì là của chiếc này. → **Hà Vy** (thinking): Phiếu không ghi tên, chỉ ghi mã. Mà MIC-01 cũng là micro, cũng có phiếu sang tủ chung.
>   - Vì Duy giữ thiết bị, Duy nói thế thì đúng. → **Duy** (neutral): Tớ là người vừa không tìm thấy nó đấy. Đừng lấy tớ làm căn cứ.
- **Minh Anh** (neutral): Mục tài sản chị ghi: micro không dây đang ở tủ thiết bị dùng chung theo phiếu PX-17, đã đối chiếu mã trên vật. Kèm phiếu tra.
- **Quân** (neutral): Ghi thế thì ai mở tủ ra cũng tự kiểm được.
- **Tùng** (gai-dau): Từ giờ tớ hỏi mã trước, cá sau.
- **Hà Vy** (smile): Hỏi mã xong thì khỏi cá.
*[Thẻ chữ]* Tên có thể trùng, mã thì không. Nối hai bảng theo mã, rồi đi nhìn tận mắt cái mã trên vật.
> 🏁 KẾT THÚC vụ → màn kết.

## 🏁 Màn kết
**Micro không mất, chỉ đổi chỗ** — Phiếu PX-17 đã có người nhận, chuyển micro không dây sang tủ thiết bị dùng chung; mã dán trên micro trong tủ khớp với mã trên phiếu. Bảng không nói ai quên báo, và hồ sơ cũng không nói thay.