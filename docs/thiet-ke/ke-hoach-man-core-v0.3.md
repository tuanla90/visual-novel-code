# Kế hoạch màn core: phòng máy, thang tự viết, bản đồ học tập theo vụ (v0.3, 29/09/2026)

> **Trạng thái: ĐỀ XUẤT, chưa chốt.** Qua hai vòng hội đồng: `~/.claude/hoi-dong/sessions/20260929-0859-core-game-man-hinh-v1`
> (góp ý v1), `…-0911-core-game-man-hinh-v2-cham` (chấm v2: TB ≈ 83%), `…-0920-core-game-man-hinh-v3-cham` (chấm v3: Flash 92%,
> Pro 92%, GPT 86%, Claude 87%; TB ≈ 89%), `…-0925-core-game-man-hinh-v4-cham` (chấm v4: Flash 94%, Pro 91%, Claude 90%,
> GPT 88%; **TB ≈ 91%** — dừng vòng lặp, phần còn lại kiểm bằng thử trên giấy). Mockup: `docs/mockups/core-game-v4.html` (Vụ 1, soát hồ sơ, Vụ 2, thang, kết mùa); Vụ 3 JOIN và bảng hình ảnh Vụ 4–6 ở
> `core-game-v2.html`. Ảnh chụp: `docs/mockups/shots/`. Mục **[cần user chốt]** đụng GDD hoặc quyết định đã có; chưa sửa GDD.

## 1. Mục tiêu

Hưởng ứng chuyển đổi số, tinh thần "kỷ nguyên vươn mình": cho học sinh, sinh viên không học IT một cách học mới dễ hiểu hơn và
để họ **tự thấy** code làm được gì. Không nhân vật nào nói khẩu hiệu. Giá trị của code hiện ra qua **hậu quả trong truyện**:

1. **Dữ liệu đổi thì chạy lại là xong** (không phải "nhanh hơn Excel" — AutoFilter cũng lọc được).
2. **Câu lệnh là cách đếm ai cũng kiểm lại được** → được đưa vào biên bản, thành báo cáo chạy định kỳ cho người khác trong trường.
3. **Dữ liệu có giới hạn**: kết quả là ứng viên, không phải thủ phạm; "chưa có dữ liệu" không có nghĩa là "không xảy ra".

## 2. Màn phòng máy: 3 vùng

| Vùng | Có gì | Ghi chú |
|---|---|---|
| ① Dựng câu | Khối + giấy nhớ; SQL song song, gạch chân cùng màu; ✎ "tự viết dòng này" | Vụ 1: ✎ chỉ ở dòng WHERE |
| ② Kết quả | Số dòng lớn + dấu trung tính "N DÒNG"; bảng; nút **🔍 Xem từng điều kiện** (✓/✗ theo từng điều kiện, mẫu dòng bị loại) | Nút sáng lên khi số dòng đổi mạnh; **người chơi tự bấm**. Chỉ lần chạy đầu tiên của cả game tự mở, làm bước hướng dẫn |
| ③ Hồ sơ | "📌 Cất vào hồ sơ" một chạm; dải bằng chứng đã cất | Không hỏi gì lúc cất |

- **Bố cục (user chốt hướng 29/09, mockup `docs/mockups/core-game-v6-phong-may.html`):** nền là **phòng máy**; **màn hình máy tính giả lập**
  ở giữa (phần mềm tra cứu chạy trong đó); **giấy nhớ dán quanh viền màn hình**; **sổ chị Linh** và **hồ sơ vụ** nằm trên bàn, bấm được;
  **không có nhân vật đứng cạnh** — Tùng, Hà Vy chỉ lên tiếng bằng hộp thoại kiểu visual novel khi có chuyện rồi ẩn (khớp QĐ-071 và quyết
  định "Tùng, Hà Vy không ngồi cạnh màn thử thách"). Bản v5 có hai nhân vật đứng cạnh — bỏ.
- **Nhịp giới thiệu:** lần vào phòng máy đầu (Vụ 1 ngày 2) chỉ có kéo giấy nhớ + Chạy; ✎ ra mắt khi gặp chỗ bàn làm việc không làm được.
- **Chữ ký và giấy nhớ [H] (đã chốt, QĐ-091):** chữ ký trên lá thư là chữ ký tay lượn, chỉ đọc được chữ **H** đầu; giấy nhớ là `[H]`
  (không còn `[H.]`). Kéo `[H]` với "bằng" → `ten = 'H'` → 0 dòng (không ai tên đúng một chữ); Hà Vy: "Chữ ký chỉ cho mình chữ đầu thôi"
  → đổi "bắt đầu bằng" → 2 người. Không cần ✎ ở bước này; ✎ ra mắt ở chỗ khác (chưa chọn). Bẫy phụ tự nhiên: H là đầu của tên hay họ (`ho_dem`).
- Khi playtest, ghi riêng "nút Xem từng điều kiện có sáng" và "người chơi có bấm" (nút sáng vẫn là máy đánh giá nhẹ).
- **Đoán / cược trước khi chạy: TẠM BỎ (user 29/09)** cho đến khi có một cơ chế hoàn chỉnh, **có thưởng phạt rõ ràng**. Lý do: bản đoán
  không chấm và kèo trà đá với Tùng đều chưa có hậu quả thật nên dễ thành bước bấm cho qua. Ý gốc (hội đồng vòng 1, khung PRIMM) để dành
  khi thiết kế lại: buộc người chơi hình dung kết quả trước khi chạy, tạo khoảnh khắc bất ngờ ở bài VÀ/HOẶC.
- Máy không gán nghĩa cho kết quả: không có dấu "ứng viên"; Hà Vy nói điều đó bằng lời. Truy vấn ra 0 dòng hay 1.240 dòng đều
  được Hà Vy mô tả trung tính ("0 dòng là một thông tin, không phải lỗi").
- Đếm lùi theo từng điều kiện (≤ 0,6 giây), mỗi nấc là một điều kiện — diễn giải, không giả vờ máy chạy lâu. Âm thanh: giấy nhớ
  hít vào ô, tiếng máy in ngắn, tiếng dấu.
- Kỹ thuật MVP: Soi từng dòng chỉ hỗ trợ WHERE dạng VÀ/HOẶC phẳng (thêm cột `(điều kiện) AS c1…` rồi chạy lại).

## 3. "Chứng minh được gì" dời vào bước soát hồ sơ

Bước Hà Vy soát hồ sơ trước giải trình đã có (QĐ-071). Với mỗi bằng chứng mang vào họp, người chơi chọn **một trong 4 câu cùng khuôn
"X khớp Y, nên Z"** — cùng mở đầu, cùng độ dài, không câu nào có "chắc chắn"; chỉ khác phần kết luận Z. Mỗi câu sai vượt dữ liệu một kiểu,
và Quân bắt bẻ đúng chỗ đó (mất 1 vạch, Minh Anh đỡ lời). Ví dụ bằng chứng số 3 (Vụ 1):

| Câu | Kết luận | Vượt dữ liệu kiểu gì | Quân bắt bẻ |
|---|---|---|---|
| A | "…nên người gửi thư là một trong hai bạn này." | Từ ứng viên nhảy sang người gửi | "Thẻ nằm ở khe hộp không chứng minh chủ thẻ là người bỏ thư. Chữ H cũng chưa chắc là tên." |
| **B** | "…nên đây là hai mã mình nhờ cô phụ trách tra sổ." | Đúng mức | — |
| C | "Hiếu khớp… và còn công khai ủng hộ lá thư, nên chỉ cần tra mã của Hiếu." | Dựa vào ý kiến để bỏ một ứng viên | "Ủng hộ là ý kiến, không phải hành động. Các bạn bỏ qua Hoài dựa vào đâu?" |
| D | "Chữ H và thẻ lịch Báo chí K24 chỉ khớp với Hiếu và Hoài, nên cả khóa không còn ai khác." | Mở rộng quá phạm vi lọc (chỉ lọc BC24A) | "Bảng chỉ lọc BC24A. K24 còn BC24B — bạn Hồng tên H các bạn chưa xét." |

**Thử trên giấy trước khi code** (hội đồng vòng 4): (1) đưa 4 câu của 3 bằng chứng cho 5 người **không kèm truyện, không kèm bảng** — chọn
đúng nhiều hơn 25% nghĩa là câu chữ đang lộ đáp án; (2) có ít nhất **một bằng chứng đảo cực**, trong đó câu đúng là câu mạnh nhất dữ liệu
cho phép, còn câu dè dặt thì sai vì bỏ phí dữ liệu (vd dữ liệu đã loại được BC24B mà câu dè dặt vẫn nói "chưa loại được ai"); (3) xáo
vị trí; (4) không phải lúc nào cũng có đúng một câu kết thúc bằng "nhờ cô tra sổ". Trước khi vào họp, người chơi xem lại được câu mình đã chọn.
Mất vạch ở buổi họp là luật giải trình đã chốt (QĐ-082/083); "không phạt thử-sai" áp cho phòng máy.


## 4. Thang tự viết 3 bậc (thay công tắc "Bàn làm việc / Hardcore") [cần user chốt]

| Bậc | Mở khi | Người chơi làm |
|---|---|---|
| 0 · Kéo thả **(MVP)** | Từ đầu | Khối + giấy nhớ. Sau Vụ 1 được tự chọn bảng và cột |
| 1 · Tự viết một dòng **(MVP)** | Vụ 1 | ✎ ở một dòng SQL, gõ lại dòng đó; khối đổi theo |
| 2 · Gõ cả câu | Bài kiểm tra của thầy Khải | Trình soạn trống, gợi ý tên cột, giấy nhớ chỉ chèn giá trị, nút "Đọc thành lời" |

- Lên bậc chỉ **mở khả năng** (`LIKE '%…%'`, biểu thức, `AS`, câu gọn để chiếu ở buổi họp) và huy hiệu trong sổ cá nhân.
- **Xếp hạng vụ không tính theo bậc**: chỉ tính uy tín, bằng chứng nói đúng mức, true end. Đụng QĐ-077 ("thưởng khi chơi Hardcore") **[cần user chốt]**.
- Truy vấn tại chỗ ở giải trình: dùng bậc cao nhất đã mở, lùi về bậc 0 được.

## 5. Bản đồ học tập theo vụ

Cả bốn thành viên hội đồng đồng ý thứ tự "Đề xuất" dưới đây **[cần user chốt — đụng GDD §6, §10.4; không chặn MVP Vụ 1]**.

| Vụ | Tên | Kiến thức (đề xuất) | Kỹ năng tư duy dữ liệu | Ngoài đời / đi làm | Hình ảnh | Báo cáo để lại ở kết mùa |
|---|---|---|---|---|---|---|
| 1 | Chữ ký H | WHERE, =, LIKE, AND/OR | Biến mô tả mơ hồ thành tiêu chí kiểm được; kết quả là ứng viên | Lọc hồ sơ, danh sách khách hàng | Phiếu qua từng cửa ✓/✗; hai vòng tròn cho VÀ/HOẶC | Câu lệnh vào biên bản; cô phụ trách hộp kiến nghị xin dùng lại |
| 2 | Lớp học phần biến mất | GROUP BY, COUNT, **COUNT DISTINCT / SELECT DISTINCT**, ORDER BY (bỏ HAVING) | Mỗi dòng đại diện cho cái gì; đếm lần bấm hay đếm người | Báo cáo theo nhóm, khử trùng (Remove duplicates) | Phiếu vào hộp; mở hộp xem phiếu nào được đếm | Lớp dưới sĩ số — Phòng Đào tạo, mỗi đợt đăng ký |
| 3 | Cuốn sổ biến mất | INNER JOIN | Nối hai nguồn theo mã; dòng bị nhân | Ghép đơn hàng với khách | Thẻ ghim + dây đỏ; số dòng trên dây | Sách quá hạn — thư viện, hằng tuần |
| 4 | Ai ở nhà văn hóa lúc 10 giờ tối? | Ngày giờ, BETWEEN, LEFT JOIN, NULL | "Chưa có dữ liệu" ≠ "không xảy ra" | Khách chưa mua, ca chưa chấm công | Thước thời gian hai kẹp; ô sọc "chưa có dữ liệu" | Thẻ vào chưa có lượt ra — KTX, mỗi tối |
| 5 | Quỹ hội trại bị lệch | HAVING, subquery | Đối soát: thu − chi phải khớp số dư | Kế toán, kiểm toán | Chip kết quả dán vào câu sau → "gộp thành một câu" | Thu − chi lệch — Hội sinh viên (Quân), cuối tháng |
| 6 | Ai đã sửa dữ liệu? | tùy chọn / mùa 2: CTE, ROW_NUMBER, LAG | Kể lại lịch sử thay đổi | Kiểm toán nhật ký | Thẻ bảng tạm; nhãn "dòng trước" | — |

**Vụ 2 (mockup v4):** bảng là `phieu_dang_ky` — mỗi dòng là **một lần bấm "Đăng ký" thành công**; đêm mở cổng bị nghẽn, Lan và Tú
bấm hai lần nên có hai phiếu (không dùng dòng "hủy": nếu có, `COUNT(DISTINCT)` vẫn đếm người đã hủy — lỗ hổng Claude chỉ ra ở vòng 3).
MK210 có 21 phiếu nhưng 19 sinh viên. Quân không cẩu thả: anh dẫn **bảng tổng hợp chính thức**, là một pivot, và pivot "Count" đếm dòng.
**Câu trả lời cho "sao không làm pivot?" (sửa sau vòng 4):** Hà Vy nhận thẳng "pivot cũng làm được — bật Distinct Count là ra 19". Giá trị
của câu lệnh không phải "làm được việc pivot không làm được", mà là **quy tắc đếm ở dạng chữ**: dán vào biên bản được, đặt cạnh cách đếm
của Quân để so được, và chạy lại được trên tệp xuất mới. Cần một câu thoại cho vì sao có phiếu trùng: cổng đăng ký không chặn bấm lặp,
chỉ ghi nhận mỗi lần bấm thành công. Lớp bị hủy đúng quy chế, **nhưng 19 bạn chưa ai được báo** → bằng chứng mang vào
họp là danh sách 19 người cần xếp lớp (SELECT DISTINCT — thêm vào Vụ 2). Dữ liệu mới về **theo lịch có trong truyện** (đợt bổ sung đóng
17:00 thứ Năm — một giấy nhớ); bảng tổng hợp chính thức phải dán lại từ tệp xuất và ký duyệt nên sáng thứ Hai mới có; người chơi chạy
lại câu cũ (thêm lớp KT201 dưới sĩ số).

**Kết mùa (thu gọn):** hai báo cáo chạy định kỳ (lớp dưới sĩ số — Phòng Đào tạo; thu − chi lệch — Hội sinh viên) và **một yêu cầu bị từ
chối** ("Ai hay đi học muộn?" — trường không ghi giờ vào lớp; Hà Vy: "Không có dữ liệu thì không có câu trả lời. Không có dữ liệu cũng
không có nghĩa là không ai muộn."). Báo cáo "hoạt động yếu" năm ngoái được thay bằng biên bản có những câu lệnh này.

## 6. Bộ hình ảnh chung

Bốn vật dụng xuyên suốt: **phiếu** (dòng) · **hộp** (nhóm) · **thẻ ghim** (bảng) · **dây đỏ** (nối). Mọi bảng kết quả in
"mỗi dòng = một …". Hai vòng tròn chỉ cho VÀ/HOẶC, không cho JOIN. Phễu chỉ cho VÀ. Không dùng "khóa kéo" cho JOIN.

## 7. Lưu ý kỹ thuật SQLite (đã chạy thử trên sql.js của prototype, 29/09)

- `LIKE` phân biệt chữ có dấu: `'Ánh' LIKE 'ánh'` → 0. MVP: giá trị chữ chỉ đến từ giấy nhớ (đúng dấu) nên mạch chính không gặp;
  nhiệm vụ phụ dùng "hoài" ra 0 dòng làm bài học có chủ ý.
- `ORDER BY` theo mã nhị phân (`Hoài, Zed, an, hoài, Ánh, Đức`): tránh bài sắp xếp theo tên, hoặc thêm collation riêng.
- Không có kiểu ngày: dữ liệu Vụ 4 dùng một định dạng `YYYY-MM-DD HH:MM:SS`.

## 8. MVP (Vụ 1): làm gì trước

1. Màn phòng máy theo bố cục v6 (màn hình giữa, giấy nhớ quanh viền, sổ + hồ sơ trên bàn, hộp thoại) + đếm lùi, đóng dấu.
2. Nút "Xem từng điều kiện" (WHERE phẳng), tự mở đúng một lần làm hướng dẫn.
3. Chọn câu kết luận (4 câu cùng khuôn) ở bước soát hồ sơ + 3 câu bắt bẻ của Quân; thử trên giấy trước.
4. Bậc 1 (✎ dòng WHERE).
5. (Đề xuất) Một nhịp rất ngắn "dữ liệu bổ sung → chạy lại" trong Vụ 1, để MVP kiểm được thông điệp 1 (hiện cảnh đó ở Vụ 2).
6. Cảnh ngắn "cách cũ" ở Ngày hội CLB (Minh Anh dò tay danh sách K24 — đã có trong kịch bản khung) và kết Vụ 1 "câu lệnh vào biên bản".

**Playtest (5 sinh viên không học IT) — hành vi quan trọng nhất cần quan sát:** người chơi có giữ kết luận ở mức "ứng viên" không
(chọn câu kết luận đúng mức ở bước soát). Chỉ số phụ: thời gian mỗi lượt, có tự phát hiện câu OR của Tùng sai
trước Hà Vy không, sau khi chơi có nói được "câu lệnh hơn Excel ở chỗ nào" không.
