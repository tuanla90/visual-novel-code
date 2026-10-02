# Quy trình giữ ảnh đồng nhất và duyệt ảnh (Topview)

01/10/2026 · Áp dụng cho mọi đợt sinh ảnh mới: nhân vật, biểu cảm, chibi, nền, vật, giấy tờ.

Phương pháp chép từ hai skill `scenario-consistency` và `scenario-refine-loop` của
[scenario-labs/skills](https://github.com/scenario-labs/skills) (giấy phép MIT, © 2026 Scenario), viết lại cho
Topview (GPT Image 2.5 Flare, 1K, medium, chế độ Unlimited). Phần chỉ có ở Scenario (control map, style id, huấn
luyện model, công cụ chấm tự động) đã bỏ.

## 1. Vì sao cần

Hai lỗi lặp lại khi sinh ảnh bằng agent:

- **Nhận luôn lượt đầu**, tới lúc ghép vào game mới thấy lệch (30/09: chibi Tùng ra tóc nâu).
- **Viết lại cả câu lệnh rồi sinh lại** tới khi "trông ổn", không biết lần sửa nào có tác dụng.

Cả hai đều thiếu cùng hai thứ: **bảng tiêu chí viết trước** và **chẩn đoán lỗi trước khi sửa**.

## 2. Giữ đồng nhất: khối gốc + một mệnh đề đổi

Đồng nhất đến từ thứ đưa vào model, xếp theo độ bền tăng dần:

| Cách | Giữ được | Dùng khi |
|---|---|---|
| Khối gốc + mệnh đề đổi | danh tính, khung hình, bảng màu | luôn luôn, đây là mức sàn |
| Ảnh tham chiếu chủ thể (ảnh neo) | danh tính nhân vật, thế giới | một bộ biểu cảm, nhiều cảnh của cùng nhân vật |
| Ảnh tham chiếu phong cách | nét vẽ, tô bóng (không giữ nhân vật) | bộ vật, bộ biểu tượng, ảnh giới thiệu |
| Sửa ảnh (image edit) từ ảnh đã duyệt | bố cục | bố cục không được xê dịch: nền tối từ nền ngày, biểu cảm "chỉ đổi mặt" |

### 2.1 Khối gốc (baseline)

Viết ra **mọi thứ không được đổi**, rồi đặt **đúng một thay đổi** ở mệnh đề cuối. Giữa các lượt, khối gốc giữ
nguyên từng ký tự, chỉ sửa mệnh đề cuối.

Khối gốc phải liệt kê cụ thể, không dùng từ chung chung:

- hình dáng chủ thể: tuổi, vóc người, kiểu tóc và **màu tóc**, kính, phụ kiện;
- trang phục: từng món, màu gọi tên hoặc mã hex;
- máy quay: độ cao, góc, chủ thể chiếm bao nhiêu khung và nằm ở đâu;
- hướng sáng;
- nền (ví dụ nền hồng tím phẳng `#FF00FF` cho ảnh sẽ tách nền);
- các điều cấm: không chữ đọc được, không logo, không bóng đổ…

**Nhìn ảnh neo trước khi viết.** Không thể liệt kê một màu chưa từng nhìn; mỏ neo mơ hồ thì ảnh trôi.

Thay đổi mà **cả bộ** phải mang (đổi áo, đổi kiểu tóc) là khối gốc, không phải mệnh đề đổi: sinh một lần thành
ảnh neo mới, duyệt, rồi neo cả bộ vào ảnh đó, để ảnh tham chiếu và phần liệt kê tả cùng một dáng vẻ.

### 2.2 Ảnh tham chiếu

- Luôn kèm **ảnh neo đã duyệt** bên cạnh khối gốc.
- **Nêu vai của từng ảnh trong câu lệnh**: "Image1: nhân vật, giữ nguyên mặt, tóc, trang phục. Image2: chỉ lấy
  phong cách vẽ. Image3: nền của nơi này."
- Ô tham chiếu nhận **từng ảnh riêng đã duyệt**, không nhận tấm ghép nhiều góc hay nhiều biểu cảm.
- Các ô còn trống thì lấp bằng ảnh đúng mẫu đã duyệt của chính nhân vật đó.

### 2.3 Quy tắc

- **Mỗi ảnh một lượt sinh.** Một câu lệnh sinh nhiều ảnh không mang được mệnh đề đổi riêng cho từng ảnh.
- **Không viết "giống lần trước".** Giữa các lượt không có trí nhớ; lượt nào cũng chép lại đủ khối gốc.
- **Không nối đuôi** (lấy ảnh ra của lượt trước làm tham chiếu cho lượt sau): độ lệch cộng dồn. Mọi ảnh trong bộ
  đều neo vào cùng một ảnh neo.
- **Ảnh lệch thì siết phần liệt kê**, không sinh lại nguyên câu cũ để cầu may.
- **Cảnh nhiều nhân vật thì ghép**, không sinh chung: các ô tham chiếu chia nhau sự chú ý. Sinh từng nhân vật
  riêng theo khối gốc của mình rồi ghép.

### 2.4 Ví dụ: bốn biểu cảm của một nhân vật

1. Mở ảnh neo `char-<mã>-anchor`, viết khối gốc theo mục 2.1.
2. Bốn lượt sinh, mỗi lượt: khối gốc y nguyên + ảnh neo ở ô tham chiếu + **chỉ biểu cảm** ở mệnh đề cuối.
3. So từng ảnh với ảnh neo theo bảng tiêu chí (mục 3). Ảnh nào lệch thì siết khối gốc đúng chỗ lệch rồi sinh lại
   **ảnh đó**, vẫn từ ảnh neo.

## 3. Duyệt ảnh: vòng sinh – chấm – sửa

| Bước | Làm gì |
|---|---|
| 1. Tiêu chí | **Trước khi sinh**, đổi yêu cầu thành các dòng đạt / không đạt mà người xem kiểm được |
| 2. Sinh | Lô nhỏ nhất đủ thử công thức (2–4 ảnh), rồi mới chạy cả lô |
| 3. Chấm | Mở từng ảnh, ghi kết quả theo từng dòng tiêu chí |
| 4. Sửa | Mỗi dòng không đạt đi theo cách sửa rẻ nhất chữa được nó (bảng 3.2) |
| 5. Dừng | Một vòng sạch thì xong. Ba vòng chưa sạch, hoặc một dòng trượt hai lần dưới hai cách sửa khác nhau: **báo user**, không sinh tiếp |

Ở chế độ Unlimited ảnh không tốn credit, nhưng tốn hàng đợi (1–10 phút mỗi ảnh, giới hạn khoảng 10 task cùng
lúc), nên vẫn giữ lô nhỏ và trần ba vòng.

### 3.1 Bảng tiêu chí

Mỗi dòng là một điều nhìn là kiểm được, không dùng từ cảm tính ("đẹp hơn", "tự nhiên hơn"). Ví dụ cho một chân
dung biểu cảm:

1. Tóc đen, cùng kiểu với ảnh neo.
2. Trang phục đúng từng món và đúng màu với ảnh neo.
3. Khung 9:16, nhân vật cùng cỡ và cùng vị trí với ảnh neo.
4. Nền hồng tím phẳng, không bóng đổ, không viền sáng.
5. Biểu cảm đọc ra đúng tên biểu cảm khi thu nhỏ còn 200 px.
6. Không chữ, không logo.

Tiêu chí viết **trước** khi thấy ảnh. Viết sau thì lỗi của lô ảnh thành luôn chuẩn.

### 3.2 Chọn cách sửa, rẻ nhất trước

| Kết quả chấm | Cách sửa |
|---|---|
| Một lỗi cục bộ trên ảnh dùng được | Sửa ảnh (image edit) chính ảnh đó, câu lệnh chỉ nêu đúng một thay đổi |
| Lệch đều cả ảnh (tông màu, cắt khung, viền nền) | Xử lý bằng script (`nguon/xu-ly-anh-*.py`), không sinh lại |
| Sai nội dung, bố cục, bảng màu | Sửa mệnh đề đổi, sinh lại từ ảnh neo |
| Trôi danh tính hoặc phong cách | Siết phần liệt kê, thêm hoặc gán lại vai ảnh tham chiếu (mục 2) |
| Dòng nào cũng trượt | Giữ câu lệnh, đổi model hoặc đổi cách làm; hỏi user trước |

**Mỗi vòng chỉ đổi một biến.** Đổi cùng lúc câu lệnh, ảnh tham chiếu và model thì không biết cái nào có tác dụng,
lần hỏng sau lại bắt đầu từ số không.

### 3.3 Hai quy tắc giữ vòng lặp trung thực

- **Kết quả chấm trích dòng tiêu chí, không trích cảm nhận.** Ghi theo dạng `<id ảnh>: đạt` hoặc
  `<id ảnh>: không đạt, dòng <số>: <thấy gì>`. "Có thể đẹp hơn" không phải kết quả chấm; đuổi theo "đẹp hơn" thay
  vì đề bài sẽ mài mất nét riêng và ra ảnh chung chung.
- **Sinh lại từ ảnh neo, không từ lần thử gần nhất.** Riêng lỗi cục bộ trên ảnh đã đạt các dòng còn lại thì sửa
  thẳng ảnh đó (dòng đầu bảng 3.2).

### 3.4 Ghi lại ở đâu

Bảng tiêu chí và kết quả chấm của mỗi đợt ghi vào README của đợt đó (như `mvp-vu1/README.md`), cạnh dòng dẫn tới
tệp hàng đợi. Chỉ sinh lại ảnh trượt; ảnh đạt giữ nguyên, không chạy lại cả lô vì một ảnh hỏng.

## 4. Lỗi hay gặp

- Chấm bằng cách liếc ảnh trong khung chat rồi đi tiếp: ấn tượng không ghi lại thì không cộng dồn được.
- Sinh lại cả lô vì một ảnh trượt.
- Thử lần thứ ba cùng một dòng tiêu chí trên cùng một model: trượt hai lần dưới hai cách sửa là bằng chứng về
  model, không phải xui.
- Đưa tấm ghép nhiều biểu cảm vào ô tham chiếu.
- Mô tả lại nhân vật khác với ảnh neo trong câu lệnh: chữ và ảnh đánh nhau, model chọn bừa một bên.
