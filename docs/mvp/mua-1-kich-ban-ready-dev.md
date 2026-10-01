# Mùa 1 — Hồ sơ hoạt động CLB (gói nội dung ready-for-dev)

> Đây là đặc tả nội dung để tích hợp, chưa phải canon đã duyệt hay nội dung đã nạp vào game. Runtime đang chạy dùng `prototype/noi-dung/` và pipeline `prototype/src/content/generated/`; thư mục `prototype/noi-dung-mvp/` là MVP độc lập, không phải nguồn runtime hiện tại. Hợp đồng tích hợp và dataset đính kèm nêu rõ các thay đổi cần thiết.
> 

## 1. Mục tiêu và bất biến

- Mùa có 5 vụ chính. Vụ 1 là “Chữ ký H”; vụ 2–5 tạo thành hồ sơ hoạt động cuối học kỳ.
- Sáu nhiệm vụ phụ chỉ ôn thao tác đã được vụ chính giới thiệu. Bỏ mọi nhiệm vụ phụ không đổi diễn biến, manh mối, quyền dữ liệu, nhánh hay kết thúc của tuyến chính.
- Không có phản diện bí mật xuyên mùa. Không nhắc lại Hoài/Hiếu như nghi phạm sau khi Vụ 1 kết thúc.
- Kết quả SQL là đầu mối cần kiểm tra. Chỉ kết luận việc mà bản ghi và nguồn xác nhận độc lập chứng minh được.
- Người chơi không bị phạt vì thử query sai. Câu gợi ý tiến dần từ câu hỏi sang nhắc phạm vi, không nói thẳng đáp án.
- Quân giữ vai trò kiểm tra quy trình và giới hạn suy luận; anh không cố tình đưa query sai để làm người chơi thắng. Các lần “phản biện” là kiểm tra một kết luận hoặc bản query có thật trong hồ sơ.
- Hà Vy kiểm tra logic và cách diễn giải, không giải hộ. Tùng nêu phỏng đoán và sẵn lòng sửa. Minh Anh đứng tên hồ sơ và bảo vệ CLB. Duy nắm sổ, tài sản, nhật ký. Thầy Quang quyết định theo hồ sơ.
- SQL mùa: SELECT/chọn cột và WHERE/filter, so khớp = và LIKE, AND/OR; ORDER BY; TRIM và LOWER; JOIN; GROUP BY, HAVING, COUNT và SUM; CTE bằng WITH. Không dạy window, subquery, UNION, CASE, NULL, DISTINCT, hàm nâng cao hay bảng tính/Python.

## 2. Sợi dây xuyên suốt

Trục thời gian theo canon SQL mùa 1: năm học 2026–2027, học kỳ I; Tùng, Minh Anh và Hà Vy là sinh viên năm nhất khóa 2026. Các vụ diễn ra từ đầu học kỳ đến cuối học kỳ I. Dataset dưới đây là fixture đã dịch ngày sang năm 2026; mọi nhật ký/biên nhận mới dùng cùng mốc thời gian. Không nhập timeline MVP cũ 2024 vào season canon. Sau buổi rà soát Vụ 1, CLB được tiếp tục sử dụng phòng đến hết học kỳ. Kết thường có điều kiện báo cáo hoạt động hằng tháng; kết thật miễn điều kiện đó. Dù ở kết nào, Minh Anh vẫn muốn nộp một bộ hồ sơ gọn, có nguồn để cuối kỳ xin duy trì phòng và chứng minh CLB hoạt động có ích.

Hồ sơ gồm ba phần có nguồn xác nhận riêng:

1. Nhật ký sử dụng phòng có bốn dòng ký xác nhận và được đối chiếu với sổ giấy (Vụ 2).
2. Phiếu luân chuyển micro được đối chiếu với hiện vật (Vụ 3).
3. Khoản hoàn tiền được đối chiếu với biên nhận ngân hàng (Vụ 4).

Vụ 5 ghép ba phiếu kết quả đã xác minh vào một bảng chứng cứ và lập báo cáo bằng CTE. Đây là quan hệ nhân quả duy nhất giữa các vụ sau Vụ 1: CLB cần một hồ sơ đáng tin để tiếp tục giữ phòng. Dữ liệu ba vụ không phải manh mối về người viết thư.

Kết Vụ 5: hồ sơ được nộp; quyết định cuối kỳ vẫn thuộc nhà trường. Người chơi nhận huy hiệu CLB vì hoàn tất hồ sơ có thể kiểm chứng, không phải vì “vạch mặt” ai.

## 3. Bản đồ kiến thức

| Vụ | Thao tác mới | SQL chuẩn và đầu ra đích |
|---|---|---|
| 1 | Chọn cột; lọc hàng; so sánh chính xác/mẫu; AND/OR | Theo kịch bản đang chốt. Kết luận tối đa: Hoài nộp thư, chưa biết người viết. |
| 2 | ORDER BY; xử lý mã không đồng nhất bằng TRIM, LOWER | 4 mục có trong sổ và chữ ký xác nhận, theo thứ tự ngày. |
| 3 | JOIN theo khóa ma_tai_san | 1 phiếu cho biết MIC-02 được chuyển đến tủ chung và đã nhận. |
| 4 | GROUP BY, HAVING; COUNT, SUM | 1 phiếu PH-04 có 2 dòng hoàn tiền cùng mã ngân hàng; nguồn độc lập xác nhận chỉ có một giao dịch 60.000 đồng. |
| 5 | WITH … AS (…) để đặt tên một bước trung gian; tái dùng SELECT, WHERE, ORDER BY | Lọc một dòng nháp khỏi bốn hàng relation, còn ba hồ sơ đã xác minh. |

Ở Vụ 1 phải hiển thị đúng các cột cần trả lời, không để SELECT * chạy ngầm rồi tuyên bố người chơi đã học chọn cột. Vụ 2–5 dùng SQL editor mở rộng theo dataset của vụ; trình dựng chip WHERE một bảng hiện tại không đủ để dạy mọi mục trong lộ trình.

## 4. Vụ 1 — Chữ ký H (giữ bản đang chốt)

**Nguồn chuẩn:** `docs/thiet-ke/ban-giao-huong-moi-2026-09-30.md`, mục C; dữ liệu hiện tại ở `prototype/noi-dung-mvp/du-lieu.md`; lời và sự kiện hiện tại ở `prototype/noi-dung-mvp/kich-ban/` và `loi/`.

Không viết lại hoặc đổi kết luận của Vụ 1 trong gói này. Người chơi lần từ thẻ lịch “Báo chí K24” và lời Bác Thịnh, lọc ra hai lớp phù hợp, dùng phiếu hai lớp cùng chữ ký H để còn Hiếu và Hoài, rồi xác minh bằng sổ niêm phong. Hoài là người nộp thư; dữ liệu không chứng minh cô viết thư. Node `ket-that` cần cả nhật ký in lẫn lời chú Cường; không nêu danh tính người nhờ. Hai kết đều cho CLB dùng phòng đến hết học kỳ.

**Bổ sung bắt buộc cho mục tiêu SELECT:** trong cảnh SELECT đầu tiên của Vụ 1 có hai nhịp nhỏ trên cùng truy vấn. Nhịp A người chơi chọn hai cột `ma_lop`, `nganh` và điều kiện `toa_nha = 'B'`, nhận bốn hàng (KT26A, QT26B, BC26A, BC25A). Nhịp B thêm điều kiện ngành Báo chí và `khoa_hoc = 2026`, nhận BC26A. Nhịp này không thay dữ kiện canon Vụ 1. Query chuẩn nhịp A:

~~~sql
SELECT ma_lop, nganh FROM lop_sinh_hoat WHERE toa_nha = 'B';
~~~

Nhịp B là query `v1-loc-and` trong tệp companion. Grader yêu cầu đúng cột và tập hàng; `SELECT *` không hoàn thành bài chọn cột. Kết quả bài luyện riêng là một hàng BC26A. Cảnh này luyện cú pháp, không tạo clue hoặc chứng cứ cốt truyện.

**Cổng sang Vụ 2:** `vu1-hoan-tat = true`. Cờ season ánh xạ từ hai node ending hiện hữu `ket-that` / `ket-thuong` để câu mở đầu Vụ 2 nói đúng điều kiện hồ sơ; không thay đổi dữ kiện các vụ sau.

**Không mang sang:** giả thuyết về người viết, tên/mã người khóa trên, hay kết luận rằng CLB Robotics đứng sau lá thư. Huy hiệu bánh răng chỉ là mô tả nhân chứng, không phải nhận diện.

## 5. Vụ 2 — Bốn mục trong sổ đã ký

**Mục tiêu truyện:** hoàn thiện mục hoạt động phòng trong hồ sơ cuối kỳ. Một bản xuất sổ có mã phòng ghi khác kiểu chữ và dính khoảng trắng. Đây là lỗi định dạng, không phải người sửa hay che giấu dữ liệu.

**Nhân vật/cảnh:** Phòng CLB; Minh Anh giao việc, Duy đưa sổ gốc và bản xuất; Tùng đoán có buổi bị giấu; Hà Vy hỏi bản ghi có cùng mã phòng không. Không thêm NPC mới.

**Dữ kiện chính duy nhất:** bảng `nhat_ky_su_dung` có bốn dòng thuộc mã phòng CLB, trạng thái đã ký xác nhận, và một dòng dự kiến chưa xác nhận. Duy đối chiếu bốn dòng với sổ giấy. Hồ sơ chỉ cho phép ghi “bốn mục trong sổ có chữ ký xác nhận”; không chứng minh đủ người tham dự hay sự kiện thực tế độc lập.

**Chuỗi và điều kiện:**

- `v2-mo`: chỉ mở khi `vu1-hoan-tat`; đọc đúng nhánh kết Vụ 1. Minh Anh giải thích mục tiêu hồ sơ, Duy đưa bảng xuất.
- `v2-mo` hiện tài liệu `doc-v2-raw-logs` rồi đặt cờ `v2-log-mo`; `v1-select-practice` chỉ mở sau cờ này. Hai bước SELECT chạy tại node `v1-select-practice` trên dataset `vu1-select` và không tạo clue/chứng cứ. Challenge `v2-loc-buoi` chạy trên dataset vụ 2, chuẩn hóa mã phòng rồi lưu `ev-v2-activities`.
- Câu đầu `v2-mo` có hai biến thể: sau kết thật, Minh Anh nói trường không bắt báo cáo tháng nhưng CLB vẫn muốn có hồ sơ cuối kỳ; sau kết thường, cô nhắc báo cáo tháng là điều kiện giữ phòng. Cả hai cùng dẫn đến nhiệm vụ và data giống nhau.
- `v2-xac-nhan`: chỉ mở sau `ev-v2-activities`; Duy đối chiếu sổ giấy, Minh Anh ký mục hồ sơ, gắn cờ `vu2-hoan-tat`.
- Nhánh thoại: Tùng có thể đoán “có người xóa buổi”; người chơi chọn kiểm tra mã phòng hay tin phỏng đoán. Cả hai lựa chọn trở về cùng query; không có hậu quả và không thêm cờ truyện.

**Lời thoại chính:**

- Minh Anh: “Mình cần ghi số mục có trong sổ và có chữ ký xác nhận. Không cần con số đẹp; cần con số truy ngược được.”
- Duy: “Bản xuất ghi mã phòng. Sổ giấy ghi cùng phòng, nhưng có dòng dính khoảng trắng và có dòng viết thường. Tớ chưa lọc hay bỏ dòng nào.”
- Tùng: “Có người sửa log để buổi sinh hoạt biến mất à?”
- Hà Vy: “Khoan. Khác cách viết chưa chứng minh có người sửa. Mình xem cột mã phòng rồi đối chiếu sổ.”
- Duy sau query: “Bốn mã buổi này có đủ chữ ký trong sổ. Dòng còn lại là lịch dự kiến, chưa có xác nhận.”
- Minh Anh: “Vậy ta ghi bốn mục có trong sổ và ký xác nhận. Log không cho biết ai tham dự hay buổi nào có ích.”

**Thử thách `v2-loc-buoi`:**

```sql
SELECT ma_buoi, ngay, hoat_dong
FROM nhat_ky_su_dung
WHERE LOWER(TRIM(ma_phong)) = 'clb-tham-tu'
  AND trang_thai = 'DA_XAC_NHAN'
ORDER BY ngay;
```

Đầu ra duy nhất: `BUOI-02 / 2026-10-02 / Họp thành viên`; `BUOI-04 / 2026-10-09 / Ôn SQL`; `BUOI-06 / 2026-10-16 / Kiểm kê hồ sơ`; `BUOI-08 / 2026-10-23 / Hướng dẫn tân thành viên`. 4 hàng. Kiểm toàn bộ tập kết quả và cột `ma_buoi`, `ngay`, `hoat_dong`, không chỉ đếm hàng.

**Phản biện cuối vụ:** Quân: “Bản ghi khớp bốn mục trong sổ có chữ ký. Nó chưa chứng minh mức độ tham gia của từng thành viên.” Người chơi chọn “bốn mục trong sổ có chữ ký xác nhận” để kết luận được chấp nhận. Hai lựa chọn sai: “mọi thành viên đều có mặt” và “CLB chắc chắn hoạt động hiệu quả”; Hà Vy nhắc xem phạm vi cột, không nói hộ đáp án.

### Thẻ tài liệu đầu vào Vụ 2

`doc-v2-raw-logs`: Bản xuất từ sổ sử dụng phòng tháng 10/2026, do Duy giữ; gồm bảy hàng như dataset Vụ 2. Mô tả hiển thị nói mã phòng được nhập thủ công và cột trạng thái chỉ DA_XAC_NHAN mới có chữ ký trong sổ. Không chứa danh tính người bị nghi.

## 6. Vụ 3 — Chiếc micro ở tủ chung

**Mục tiêu truyện:** kiểm kê thiết bị trước buổi hướng dẫn cuối kỳ. Duy không thấy micro MIC-02 ở vị trí quen thuộc. Không có cáo buộc mất cắp; cần xác định vị trí theo sổ tài sản và phiếu luân chuyển.

**Dữ kiện chính duy nhất:** nối `tai_san` với `luan_chuyen` bằng mã thiết bị cho thấy phiếu PX-17 đã chuyển MIC-02 tới tủ thiết bị dùng chung và có xác nhận nhận. Duy cùng Minh Anh mở tủ, tìm thấy đúng mã dán trên micro. Vật được ghi nhận đã chuyển hợp lệ.

**Chuỗi/điều kiện:**

- `v3-mo`: mở sau `vu2-hoan-tat`; Duy phát hiện thiếu micro khi chuẩn bị thiết bị.
- `v3-mo` hiện `doc-v3-inventory` và đặt cờ `v3-inventory-mo`; `v3-doi-chieu` mở sau cờ này, cho người chơi xem hai bảng và khóa `ma_tai_san`.
- `v3-xac-nhan`: mở sau `ev-v3-mic`; kiểm tra tủ chung bằng mã dán, đặt `vu3-hien-vat-da-doi-chieu`; sau đó người chơi chốt xác nhận để đặt `vu3-hoan-tat`. Card nguồn chỉ được materialize sau cả hai điều kiện.
- Tùng có thể chọn giả thuyết “để quên” hoặc “chuyển tủ”; đây chỉ là câu thoại. Query và việc kiểm kê không đổi.

**Lời thoại chính:**

- Duy: “MIC-02 không ở ngăn dưới. Sổ tài sản nói nó vẫn thuộc CLB; phiếu luân chuyển có thể cho biết nó đang ở đâu.”
- Tùng: “Tớ cá là ai đó cầm đi rồi quên trả.”
- Minh Anh: “Mình chưa có căn cứ để gọi là quên hay lấy. Tìm mã thiết bị trên phiếu trước.”
- Hà Vy: “Hai bảng có cùng mã tài sản. Nối theo mã đó thì mỗi phiếu giữ nguyên thiết bị nào.”
- Duy sau kiểm tra: “PX-17 có chữ ký nhận. Mã trên micro cũng là MIC-02. Tài sản không mất; vị trí lưu đã đổi.”
- Tùng: “Tớ đoán sai rồi. May mà có mã, khỏi phải đoán người.”

**Thử thách `v3-noi-phieu`:**

```sql
SELECT t.ma_tai_san, t.ten_tai_san, l.ma_phieu, l.den_vi_tri, l.trang_thai
FROM tai_san t
JOIN luan_chuyen l ON t.ma_tai_san = l.ma_tai_san
WHERE t.ma_tai_san = 'MIC-02'
  AND l.trang_thai = 'DA_NHAN';
```

Đầu ra: `MIC-02 / Micro không dây / PX-17 / TU_THIET_BI_CHUNG / DA_NHAN`. 1 hàng. Chấm tập hàng và cột cần thiết; không chấm bí danh cột hay khoảng trắng SQL.

**Phản biện cuối vụ:** Quân hỏi: “Nếu chỉ ghép theo tên ‘micro’, có đảm bảo phiếu nói về đúng chiếc này không?” Đúng: “Không; mã tài sản là khóa nối và mã trên hiện vật xác nhận vị trí.” Sai: “Có, vì tên giống nhau”; “Duy biết nên chắc chắn đúng.” Đây là kiểm tra lập luận dựa trên cùng query và xác nhận vật lý, không kết tội nhân vật.

### Thẻ tài liệu đầu vào Vụ 3

`doc-v3-asset-register`: trích sổ tài sản có MIC-02, đang thuộc CLB. `doc-v3-transfer-ledger`: các phiếu PX-11, PX-17, PX-19, PX-20, cùng các cột trong dataset. Chỉ PX-17 có xác nhận nhận cho MIC-02. Hai tài liệu được hiện ở đầu vụ; hiện vật chỉ được xác nhận sau khi query đúng.

## 7. Vụ 4 — Một lần hoàn tiền, hai dòng ghi

**Mục tiêu truyện:** rà sổ chi buổi hướng dẫn SQL. Tổng khoản hoàn tiền trong bảng cao hơn biên nhận của ban tổ chức. Quân đề nghị xác định nhóm chứng từ cần kiểm tra; anh không kết luận có gian lận.

**Dữ kiện chính duy nhất:** nhóm theo mã phiếu và lọc nhóm có hơn một dòng hoàn tiền đưa ra PH-04. Hai dòng cùng mã tham chiếu ngân hàng và cùng số tiền; biên nhận độc lập có một giao dịch hoàn 60.000 đồng. Kết luận: một giao dịch bị nhập hai lần trong bản xuất; sửa báo cáo, lưu lịch sử chỉnh sửa. Không truy tìm “ai gian lận”.

**Chuỗi/điều kiện:**

- `v4-mo`: mở sau `vu3-hoan-tat`; Minh Anh nhận thấy số hoàn tiền trong bản tổng hợp không khớp biên nhận.
- `v4-mo` hiện `doc-v4-ledger` và đặt cờ `v4-ledger-mo`; `v4-nhom` mở sau cờ này, hướng dẫn xem bản ghi từng dòng trước khi kết luận.
- `v4-chung-tu`: sau kết quả nhóm, mở biên nhận PH-04, đặt cờ `v4-chung-tu-da-doi-chieu`, rồi lưu `ev-v4-refund`. Chỉ sau phản biện và lựa chọn kết luận có căn cứ mới đặt `vu4-hoan-tat`.
- Nhánh lựa chọn “báo có gian lận” / “chờ đối chiếu nguồn” chỉ ảnh hưởng một câu đáp. Chỉ lựa chọn chờ đối chiếu tiến vào xác nhận; chọn sai không phạt, Quân nhắc xem chứng từ và cho thử lại.

**Lời thoại chính:**

- Minh Anh: “Bảng hoàn tiền cộng cao hơn biên nhận. Mình cần biết phiếu nào cần mở, chưa phải tìm người chịu lỗi.”
- Quân: “Tôi đánh dấu PH-04 vì bảng có hai dòng hoàn tiền cùng mã phiếu. Điều đó là tín hiệu cần kiểm tra, không phải kết luận.”
- Tùng: “Hai dòng thì chắc là hoàn hai lần?”
- Hà Vy: “Chưa. Đếm dòng là đếm bản ghi. Ta phải xem nhóm và so với chứng từ ngân hàng.”
- Sau query: Quân: “PH-04 có hai bản ghi, tổng ghi hoàn là âm 120.000 đồng. Mở chứng từ gốc.”
- Minh Anh: “Biên nhận ghi một giao dịch 60.000 đồng, mã tham chiếu trùng trên cả hai dòng. Bản xuất đã lặp một dòng.”
- Quân: “Vậy sửa báo cáo, giữ lại cả bản trước và lịch sử chỉnh sửa. Chưa có căn cứ nói ai cố ý làm sai.”

**Thử thách `v4-nhom-hoan`:**

```sql
SELECT ma_phieu, COUNT(*) AS so_dong, SUM(so_tien) AS tong_ghi_nhan
FROM giao_dich
WHERE loai = 'HOAN'
GROUP BY ma_phieu
HAVING COUNT(*) > 1;
```

Đầu ra: `PH-04 / 2 / -120000`. 1 hàng. Tiếp theo màn xem chứng từ (không phải SQL mới) đưa `doc-bien-nhan-ph04`: một lần hoàn `-60000`, tham chiếu `NH-771`. Hai dòng trong `giao_dich` đều mang `NH-771`. Phải diễn đạt “bản xuất có hai dòng cùng tham chiếu; chứng từ xác nhận một lần hoàn”, không “cơ sở dữ liệu chứng minh ai nhập trùng”.

**Phản biện cuối vụ:** Người chơi chọn một trong ba nhận định. Đúng: “PH-04 cần sửa báo cáo; nguồn ngân hàng xác nhận một khoản hoàn.” Sai: “đã chứng minh biển thủ”; “hai dòng chắc chắn là hai giao dịch”. Quân yêu cầu trỏ vào phiếu và biên nhận; phản hồi không làm đổi dữ liệu.

### Thẻ tài liệu đầu vào Vụ 4

`doc-v4-ledger`: bản xuất giao dịch buổi hướng dẫn SQL, gồm các hàng trong bảng `giao_dich`; đây là nguồn cần kiểm tra, chưa phải bằng chứng lỗi cố ý. `doc-bien-nhan-ph04` chỉ mở sau khi query xác định PH-04; nội dung ghi một khoản hoàn `-60000`, mã tham chiếu `NH-771`, ngày theo timeline học kỳ I năm 2026.

## 8. Vụ 5 — Hồ sơ tổng kết

**Mục tiêu truyện:** Minh Anh nộp báo cáo hoạt động cuối kỳ. Người chơi đặt các phiếu đã xác minh của Vụ 2, 3, 4 vào điểm “Hồ sơ hoạt động” trên bảng chứng cứ; hệ thống tạo một bảng quan hệ tạm có tên `ho_so_da_xac_minh`. Viết CTE để chọn những mục được xác nhận rồi xem báo cáo theo mã vụ.

**Điểm chứng cứ tạm do engine tạo:** schema cố định `ma_vu TEXT, chu_de TEXT, ma_ho_so TEXT, so_ban_ghi INTEGER, trang_thai TEXT`. Dòng được tạo từ những result card đã kéo vào điểm tổng hợp; không tự điền hoặc bịa thêm hàng. Ba card bắt buộc và dữ liệu; fixture V5 có thêm một dòng hệ thống `V5, TONG_HOP, BAN_NHAP, 1, CHO_XAC_MINH` để truy vấn có thể lọc trạng thái. Dòng này không phải chứng cứ, không có result card và không được tính là nguồn:

- Từ `ev-v2-activities`: query có bốn hàng; materializer chỉ tạo một hàng tóm tắt `V2, HOAT_DONG, 4_BUOI, 4, DA_XAC_NHAN` sau khi cả bốn mã buổi khớp danh sách chuẩn.
- Từ `ev-v3-mic`: `V3, TAI_SAN, PX-17, 1, DA_XAC_NHAN`.
- Từ `ev-v4-refund`: `V4, TAI_CHINH, PH-04, 1, DA_XAC_NHAN`.

Thẻ `ev-v1-letter` không được đưa vào bảng tổng kết hoạt động. Engine phải kiểm tra đủ ba nguồn, giữ nguyên khóa nguồn, chặn hàng trùng, và cho phép bỏ/đổi card trước khi chạy query. Nếu thiếu card, query được phép chạy trên phần hiện có nhưng không cho nộp; thông báo nêu đúng tên phiếu thiếu. Kết quả CTE được lưu như phiếu báo cáo mới và nối sợi tới ba nguồn.

**Chuỗi/điều kiện:**

- `v5-mo`: chỉ mở khi `vu4-hoan-tat`; Minh Anh giải thích báo cáo gồm hoạt động, tài sản, tài chính và mỗi mục phải chỉ nguồn.
- `v5-lap-ho-so`: kéo ba card vào điểm chứng cứ tổng hợp. Đây là mechanic mới duy nhất của Vụ 5; hướng dẫn ngắn bằng phản hồi trực quan, không khóa bài bằng đoạn hướng dẫn.
- `v5-cte`: đề bài hiện các cột, cho phép nhập SQL chuẩn hoặc kéo thẻ vào vùng CTE. Query đúng lưu `ev-v5-report`.
- `v5-phan-bien`: Quân kiểm tra một phản biện 3 nhịp; không thanh uy tín. Người chơi sửa/giải thích theo query đã lưu.
- `v5-ket`: Minh Anh nộp báo cáo; thầy Quang xác nhận hồ sơ đủ nguồn để đưa vào kỳ rà soát cuối kỳ. Không tuyên bố chắc chắn phòng đã được giữ vĩnh viễn.

**Lời thoại chính:**

- Minh Anh: “Ba phần đã được đối chiếu riêng. Ghép nguồn vào đây để xem báo cáo có còn truy ngược được từng phiếu không.”
- Duy: “Thẻ nào không có nguồn hoặc chưa xác nhận thì đừng đưa vào hồ sơ.”
- Tùng: “Kéo ba phiếu vào là xong báo cáo à?”
- Hà Vy: “Đó mới là nguồn. CTE giúp đặt tên cho bước lọc, rồi mình đọc kết quả của bước ấy.”
- Quân: “Ba phiếu của các em đều có nguồn. Trong bảng còn một dòng nháp chưa xác minh; lọc đúng trạng thái rồi kiểm tra báo cáo nhé.”
- Người chơi chạy query trên relation bốn dòng; kết quả đúng có 3 dòng, mỗi dòng trỏ về một phiếu nguồn.
- Thầy Quang: “Hồ sơ có nguồn và nêu rõ giới hạn. Tôi nhận để đưa vào đợt rà soát cuối kỳ; quyết định phòng học kỳ sau sẽ theo quy trình chung.”
- Minh Anh: “Mình không cần dữ liệu nói thay mình. Chỉ cần nó chỉ đúng chỗ để mọi người tự kiểm tra.”

**Thử thách `v5-cte-bao-cao`:**

```sql
WITH muc_da_xac_minh AS (
  SELECT ma_vu, chu_de, ma_ho_so, so_ban_ghi
  FROM ho_so_da_xac_minh
  WHERE trang_thai = 'DA_XAC_NHAN'
)
SELECT ma_vu, chu_de, ma_ho_so, so_ban_ghi
FROM muc_da_xac_minh
ORDER BY ma_vu, ma_ho_so;
```

**Số dòng/đáp án duy nhất:** card V2 đóng gói bốn mục trong sổ vào **một** hàng hồ sơ `ma_ho_so='4_BUOI'`, `so_ban_ghi=4`; V3 một hàng `PX-17`, `so_ban_ghi=1`; V4 một hàng `PH-04`, `so_ban_ghi=1`. Do đó đúng là **3 hàng** sau khi loại dòng `BAN_NHAP` chưa xác minh. Bốn mục chi tiết vẫn xem trên thẻ V2 đính kèm. Mapping này phải được kiểm ở engine; không suy ra tóm tắt từ số hàng chưa xác minh.

**Phản biện Quân, ba nhịp:**

1. Quân chiếu query thiếu `WHERE trang_thai = 'DA_XAC_NHAN'`; trên preview thấy thêm `BAN_NHAP`. Người chơi chỉ vào điều kiện bị thiếu hoặc nói “chưa đủ căn cứ”. Chọn đúng: máy chiếu chuyển từ mọi phiếu sang các phiếu đã xác minh. Chọn sai: Quân hỏi trạng thái nào cho phép đưa vào báo cáo; cho thử lại.
2. Quân hỏi: “Ba hàng chứng minh CLB hoạt động hiệu quả hơn mọi CLB khác?” Đúng: “Không. Chúng chứng minh ba mục hồ sơ đã xác minh; không có dữ liệu so sánh CLB.” Sai: khẳng định xếp hạng hoặc phủ nhận cả ba dữ kiện.
3. Quân hỏi: “Có thể truy ngược kết luận tài chính từ đây không?” Đúng: chỉ tới `PH-04`, rồi mở thẻ đối chiếu và biên nhận. Sai: cáo buộc người phụ trách. Kết thúc phản biện bằng cờ `v5-phan-bien-xong`.

Không có kết thúc xấu. Chọn sai chỉ phát phản hồi sửa và lặp lại nhịp hiện tại. Không dùng uy tín.

## 9. Sáu nhiệm vụ phụ (độc lập, không phải manh mối)

Quy tắc chung: mỗi nhiệm vụ ở phòng/lớp sinh hoạt không gắn với Vụ 1; dùng bộ dữ liệu luyện riêng `luyen_*`; không đọc `nhat_ky_su_dung`, tài sản, giao dịch, mã sinh viên nghi vấn, phiếu vụ án hay tên người liên quan. Chỉ mở sau khi vụ chính đã dạy thao tác. Không lưu thẻ vào hồ sơ vụ, không đặt sợi nối tới chứng cứ chính, không đổi cờ của tuyến chính. Lời thoại có thể là việc thường nhật của NPC; kết quả chỉ trả lời câu hỏi của nhiệm vụ.

| Mã / mở khi | Việc nhỏ | Kỹ năng đã học; đầu ra | Nhân vật / kết thúc |
|---|---|---|---|
| `side-01-danh-sach` / sau V1 | Chuẩn bị danh sách bạn đăng ký trực bàn đọc sách | SELECT cột tên, WHERE trạng thái = DANG_KY; 3 người | Tùng hỏi; danh sách chỉ hiện trên bảng luyện, không thành hồ sơ vụ án |
| `side-02-ten` / sau V1 | Tìm nhãn hộp bút bị viết thiếu phần sau | WHERE + LIKE; 3 nhãn bắt đầu “but”; không có tên nhân vật | Hà Vy xác nhận mẫu tìm; không mở thẻ chứng cứ |
| `side-03-thu-tu` / sau V2 | Xếp các lịch trực câu lạc bộ theo ngày | TRIM/LOWER + ORDER BY trên dữ liệu luyện riêng; 4 dòng | Duy cảm ơn; bảng trực là kết quả tạm, không liên quan lịch phòng CLB |
| `side-04-noi-bang` / sau V3 | Ghép tên món với phiếu đặt ở căng tin | JOIN theo ma_mon; 2 đơn khớp | Tùng nhận món; không phát hiện ai/điều gì liên quan cốt truyện |
| `side-05-nhom` / sau V4 | Tìm loại vật tư cần đặt thêm cho bàn thủ công | GROUP BY loai_vat_tu, HAVING SUM(so_luong) < 5; 1 nhóm | Duy cập nhật danh sách mua; không đổi tài sản vụ 3 |
| `side-06-cte` / sau V5 | Lập phiếu tổng số sách trả ở bàn đọc | WITH … AS trên bảng luyện nhỏ, lọc DA_TRA rồi tính tổng số cuốn theo loại; 3 dòng | Minh Anh nhận phiếu luyện; không ghi vào báo cáo CLB |

**Đề, SQL chuẩn và kỳ vọng của nhiệm vụ phụ** nằm trong `docs/mvp/mua-1-du-lieu-va-kiem-chung.md`, mục 5. Tất cả nhận “thử thách hoàn tất”, không mở thoại cốt truyện mới.

## 10. Cổng, cờ và nhánh

| Cờ | Điều kiện đặt | Dùng ở đâu |
|---|---|---|
| `vu1-hoan-tat` (cờ season mới) | Một trong hai node kết hiện hữu `ket-that` hoặc `ket-thuong` của Vụ 1; đặt ngay khi đi vào ending | Mở Vụ 2 |
| `vu1-ket-that` / `vu1-ket-thuong` (cờ season mới) | Nhánh kết tương ứng: `ket-that` đặt cờ đầu, `ket-thuong` đặt cờ sau | Chọn đúng một câu mở Vụ 2; không ảnh hưởng query/dữ kiện |
| `ev-v2-activities` | Query Vụ 2 đúng và Duy đối chiếu sổ giấy | Mở bước phản biện Vụ 2; đưa vào điểm chứng cứ V5 khi hoàn tất Vụ 2 |
| `vu2-hoan-tat` | Chọn kết luận “bốn mục trong sổ có chữ ký xác nhận” | Mở Vụ 3 |
| `vu3-hien-vat-da-doi-chieu` | Sau khi `ev-v3-mic` đúng, người chơi đối chiếu mã MIC-02 trên hiện vật | Mở chốt V3 và cho phép materialize `ev-v3-mic` vào relation V5 |
| `ev-v3-mic` | Query JOIN đúng | Mở cảnh kiểm hiện vật; đưa vào điểm V5 sau khi xác minh |
| `vu3-hoan-tat` | Người chơi chốt nhận định đúng sau khi phiếu và hiện vật khớp | Mở Vụ 4 |
| `v4-chung-tu-da-doi-chieu` | Sau query nhóm đúng, mở biên nhận PH-04 và đối chiếu một giao dịch | Cho phép lưu `ev-v4-refund` và mở phản biện |
| `ev-v4-refund` | Query nhóm đúng và biên nhận độc lập xác nhận một giao dịch | Cho phép lựa chọn phản biện; chỉ đưa vào relation V5 khi `vu4-hoan-tat` |
| `vu4-hoan-tat` | Chỉ đặt sau lựa chọn “bản xuất lặp một giao dịch; chưa đủ căn cứ quy lỗi cá nhân” | Mở Vụ 5 và cho phép materialize `ev-v4-refund` |
| `ev-v5-report` | CTE đúng, đủ 3 nguồn | Mở nhịp phản biện |
| `v5-phan-bien-xong` | Trả lời đúng 3 nhịp | Mở kết mùa |

Các nhiệm vụ phụ có cờ riêng `side-01-done` … `side-06-done`; không có điều kiện tuyến chính đọc các cờ này.

## 11. Nội dung phản hồi SQL

Mỗi challenge có tối đa ba gợi ý, theo thứ tự: (1) hỏi “đang cần trả lời điều gì?”; (2) nhắc cột/quan hệ cần xem; (3) nhắc phép toán/cách kết nối nhưng không điền giá trị cuối. Lỗi cú pháp dùng phản hồi kỹ thuật trung tính. Kết quả hợp lệ nhưng sai tập hàng chỉ nêu số hàng/giá trị đầu ra quan sát được, không nói nghi phạm hoặc manh mối tiếp theo.

- V2: nếu có 5+ hàng, hỏi dòng nào chưa xác nhận; nếu 0–3, hỏi cách chuẩn hóa mã phòng trước khi so sánh.
- V3: nếu nhiều hàng, nhắc khóa nối là `ma_tai_san`; nếu 0, kiểm tra mã MIC-02 và trạng thái `DA_NHAN`.
- V4: nếu trả cả nhiều nhóm, nhắc yêu cầu là tìm phiếu có hơn một dòng hoàn; nếu nhóm đúng nhưng tổng sai, cho đọc lại cột `so_tien`.
- V5: thiếu nguồn thì báo đúng card cần kéo; query lọc quá hẹp cho thấy cờ xác nhận từng hàng; sai kết luận thì cho đọc lại ba thẻ nguồn.

## 12. Tiêu chuẩn hoàn tất để dev ghép

- Mỗi mã chuỗi/thử thách/thẻ/cờ trong gói có khai báo đúng một lần và không tham chiếu mã chưa tồn tại.
- Vụ 1 giữ nguyên nguồn hiện hành và các kết luận đã chốt.
- Query chuẩn chạy trên dataset cố định; kiểm cả tập hàng, số hàng và cột cần thiết.
- Bản ghi sự kiện có khóa; quan hệ JOIN không nhân dòng ngoài dự kiến.
- Nhiệm vụ phụ dùng schema luyện riêng và không thể đặt `ev-*` vào hồ sơ chính.
- Thử tải save/load tại từng mốc: kết V1, hoàn tất V2–V4, điểm chứng cứ V5 trước/sau khi kéo card, sau kết mùa.
- Tất cả lựa chọn sai đều có phản hồi, có đường thử lại, không gây dead-end.
- Hiển thị đúng giới hạn suy luận trong lời thoại và bài phản biện.
- Tạo trang SQL/sổ tay cho mỗi mục mới; không mở mục mới trong nhiệm vụ phụ.

## 13. Ranh giới tích hợp engine hiện tại

Phần đã có trong mã:

- SQLite read-only thực thi một câu SELECT hoặc WITH … SELECT.
- Hệ thống challenge chấm theo tập kết quả; nội dung MVP có bộ kiểm tra chạy thật từng query.
- Nút lưu kết quả thành bằng chứng và bảng điều tra hiển thị phiếu/sợi chỉ.
- Câu chuyện có điều kiện, hậu quả và đối chất trong kiểu nội dung MVP.

Phần chưa có hoặc không tương thích với runtime chính:

- MVP markdown chưa được runtime hiện tại nạp; prototype hiện chạy nội dung `prototype/noi-dung/`.
- Trình dựng query hiện tại chỉ dựng SELECT một bảng + WHERE điều kiện phẳng; không dựng ORDER BY/hàm/JOIN/GROUP BY/HAVING/CTE. Các bài này cần chế độ SQL văn bản hoặc khối tương ứng, chấm bằng SELECT chuẩn.
- Bảng chứng cứ hiện lưu query result card, không kéo nhiều card để tạo relation tạm. Vụ 5 cần phần mở rộng mô tả ở tài liệu companion, mục “Giao kèo engine CTE”.
- Dataset/schema challenge runtime thật mới có hai bảng sinh viên/lớp. Vụ 2–4 cần đăng ký schema/data mới.

Do đó, nội dung và SQL đã cụ thể hóa; để gọi là “ghép chạy được” cần triển khai đúng các giao kèo engine companion. Không có thay đổi engine nào được ngụy trang thành nội dung markdown.

