# Mùa 1 — rà soát gói "ready-for-dev" và ghi chú dựng Vụ 2

> Ngày 01/10/2026. Rà ba tệp: `docs/mvp/mua-1-kich-ban-ready-dev.md` (kịch bản), `docs/mvp/mua-1-du-lieu-va-kiem-chung.md` (dữ liệu, hợp đồng engine), `tools/kiem-mua1.py` (tool kiểm). Ba tệp này lúc rà còn nằm chưa commit ở thư mục chính, không có trên nhánh này.
> Vụ 2 đã dựng trên nhánh `claude/season-1-setup-review-edf633`, chưa commit. Những chỗ dựng khác đặc tả đều ghi ở mục 3 và **chờ bạn quyết**.

## 1. Kết luận ngắn

- **SQL và dữ liệu đúng.** `python tools/kiem-mua1.py` chạy xanh cả 13 bộ. Nội dung Vụ 2 đến Vụ 5 nhất quán với nhau, giới hạn suy luận viết rõ.
- **Phần "tích hợp vào đâu" sai tiền đề.** Tài liệu coi `prototype/noi-dung/` là runtime và `noi-dung-mvp/` là bộ chưa chạy. Thực tế ngược lại: game đang chơi được (chương 1, bảng điều tra, đối chất, màn tra v7) chạy bằng `noi-dung-mvp/` + `src/mvp/`. Mọi chỉ dẫn ở mục 8, 9, 13 của hai tài liệu trỏ nhầm chỗ.
- **Có bốn chỗ mâu thuẫn với quyết định bạn đã chốt** (mục 2). Tôi không tự phân xử; tôi dựng theo quyết định cũ của bạn và ghi lại.

## 2. Chỗ cần bạn quyết

| # | Gói mới viết | Quyết định / thực tế đang có | Tôi đã dựng theo |
|---|---|---|---|
| 1 | Truyện năm 2026, "không nhập timeline 2024"; dữ liệu lớp đổi thành KT26A… | 01/10 bạn chốt truyện năm **2024**; lịch trong game, mã SV24…, bảng lớp KT24A đều theo 2024 | 2024. Nhật ký phòng Vụ 2 là tháng 10/2024, vụ diễn ra thứ Sáu 25/10/2024 |
| 2 | Vụ 2 trở đi dùng **ô gõ SQL** | 30/09 bạn chốt màn tra chỉ có **một cách nhập: kéo giấy nhớ**. Chính gói mới cũng cho phép "khối tương ứng" | Khối: nút gọt cột và hàng "xếp theo" trong màn tra v7 |
| 3 | Vụ 2 là một cảnh trong phòng CLB, không bản đồ, không hạn | 01/10 bạn ghi "chờ Vụ 2": ngày kiểu địa điểm, avatar bản đồ theo lịch tuần qua bảng SQL, FROM/SELECT/GROUP BY | Theo gói mới (một cảnh). Ba việc kia chưa có chỗ trong mùa 1 mới: cần bạn xếp lại |
| 4 | Không kết xấu, không hạn, sai không hậu quả ở cả mùa | 30/09 bạn muốn nhiệm vụ có hạn, lựa chọn sai, kết xấu để lưu/nạp có nghĩa | Theo gói mới cho Vụ 2 |

## 3. Lỗi và chỗ lệch trong ba tệp

1. **Bài "chọn cột" (`v1-select-columns`, `v1-loc-and`) tự mâu thuẫn.** Mục 4 kịch bản nói nó nằm trong cảnh SELECT đầu của Vụ 1; mục 5 lại nói nút `v1-select-practice` chỉ mở sau cờ `v2-log-mo` của Vụ 2. Nút này không có trong bảng cờ mục 10. Trong game, khung `SELECT … FROM` đang khóa sẵn, nên yêu cầu "`SELECT *` không qua" chưa áp được. **Tôi chưa dựng bài này**, Vụ 1 giữ nguyên.
2. **Bảng Markdown không giữ được dấu cách ở đuôi.** Bài học Vụ 2 (và nhiệm vụ phụ 3) sống nhờ `'CLB-THAM-TU  '` có hai dấu cách cuối. Trong tệp `.md` hai dấu cách đó không nhìn thấy và bị cắt khi đọc; chỉ tool Python còn giữ. Ai dựng theo tài liệu sẽ ra dữ liệu sạch và mất bài học. Trong game tôi viết lộ bằng ký hiệu `␣`.
3. **Thứ tự cờ Vụ 2 lệch nhau.** Mục 5 lưu `ev-v2-activities` ngay khi tra đúng, rồi mới mở `v2-xac-nhan`. Mục 10 lại ghi phiếu được đặt khi "tra đúng **và** Duy đối chiếu sổ giấy". Bảng manifest ở tài liệu dữ liệu gọi `v2-xac-nhan` như một cờ trong khi nó là tên nút. Tôi dựng: phiếu vào hồ sơ khi tra đúng; Duy dò sổ sinh một thẻ riêng; kết luận đúng mới hết vụ.
4. **Nhánh của Tùng "không có hậu quả"** đi ngược bất biến ở mục 1 ("bỏ mọi nhánh không đổi diễn biến"), và màn rẽ nhánh trong game ghi "Chọn là chốt". Tôi vẫn dựng (thêm ba câu thoại), bạn bỏ được bằng cách xóa một khối.
5. **Tham chiếu chéo sai:** kịch bản mục 9 trỏ "tài liệu dữ liệu mục 5" (đúng là mục 6); dữ liệu mục 7 ghi "như mục 4" (đúng là mục 5); kịch bản mục 13 nhắc mục "Giao kèo engine CTE" không tồn tại. Dữ liệu mục 7 có một đoạn ba câu bị lặp hai lần.
6. **Tool kiểm chỉ kiểm chính nó.** Dữ liệu và đáp án được chép tay vào tệp Python, không đọc từ tài liệu. Tài liệu đổi mà tool không đổi thì tool vẫn xanh. Trong game, bộ kiểm nội dung chạy thật câu SQL trên đúng dữ liệu game dùng, nên Vụ 2 không phụ thuộc tool này.
7. **Hợp đồng engine cho Vụ 5 nặng hơn cần thiết với màn tra kéo thả:** sandbox theo từng thử thách, SQLite authorizer, `attemptId`. Những thứ đó chỉ cần khi cho gõ SQL tự do. Nên viết lại sau khi chốt dòng 2 ở bảng trên.

## 4. Vụ 2 đã dựng những gì

**Nội dung** (`prototype/noi-dung-mvp/`): `lich.md` thêm mục vụ sau; `du-lieu.md` thêm bảng `nhat_ky_su_dung`; khung `kich-ban/10-vu-2.md`, lời `loi/10-vu-2.md`; thẻ `thu-thach/v2-loc-buoi.md` và lời `loi/tt-v2-loc-buoi.md`; bốn thẻ hồ sơ `ho-so/04-vu-2.md`; hai trang sổ `so-tay/chuan-hoa.md`, `so-tay/sap-xep.md`. Lời là bản đầu viết theo "lời thoại chính" của đặc tả, chờ phiên truyện rà.

**Máy và giao diện:**

- Vụ sau: màn kết Vụ 1 có nút "Sang Vụ 2"; máy đặt cờ `vu1-hoan-tat`, `vu1-ket-that` / `vu1-ket-thuong`, `vu2-hoan-tat`; câu mở Vụ 2 rẽ theo kết Vụ 1 bằng chỉ dẫn mới `[NẾU <điều kiện>] → đi tới <chuỗi>`.
- Sang vụ mới, thẻ vụ trước được gỡ khỏi bảng điều tra nhưng vẫn trong hồ sơ. Chỉ thẻ đang ghim mới thành giấy nhớ ở màn tra.
- Màn tra: nút gọt cột (y nguyên, bỏ dấu cách thừa, đổi chữ thường, cả hai) và hàng "XẾP THEO". Hai khối chỉ hiện khi SQL chuẩn của thẻ có `LOWER`/`TRIM` hay `ORDER BY`, nên chương 1 không đổi.
- Chấm có thứ tự khi thẻ có `ORDER BY`; thêm dòng lời "Khi sai thứ tự".
- Dấu cách đầu và cuối ô hiện thành chấm trong bảng kết quả và bảng "xem từng điều kiện".
- Lịch, thanh trạng thái, nhãn ô lưu, điểm nhảy của người quan sát đều biết Vụ 2.

**Đường chơi "sai có ích" của thẻ `v2-loc-buoi`:**

| Người chơi dựng | Số dòng | Lời |
|---|---:|---|
| So y nguyên mã phòng + đã ký | 1 | Tùng: cả tháng có một buổi thôi á? |
| Gọt một kiểu + đã ký | 2 | Duy: sổ giấy đếm được nhiều hơn |
| Gọt cả hai, quên trạng thái | 5 | Duy: buổi 30/10 mới là dự kiến |
| Đủ bốn dòng, chưa xếp hoặc xếp ngược | 4 | Duy: thứ tự này dò không kịp |
| Gọt cả hai + đã ký + xếp theo ngày | 4 | Đúng, ghim phiếu |

## 5. Việc còn mở

- Thư mục chính đang có thay đổi chưa commit của một phiên khác (`07-vu2-tong-hop.md`, `ManTongHopMvp.tsx`, thêm "ngày 6" vào Vụ 1). Phiên đó sửa cùng các tệp `may.ts`, `types.ts`, `lich.md`, `ManTraV7.tsx`. Gộp hai bên sẽ xung đột, và hai bên đang hiểu "vụ 2" khác nhau.
- Kết thật Vụ 1 hiện gieo hình ảnh "anh khóa trên, huy hiệu bánh răng" ở cổng trường. Gói mới bỏ tuyến này. Tôi đã thêm một câu của Minh Anh ở đầu Vụ 2 (nhánh kết thật) để khép lại; đoạn ở cổng trường trong kết Vụ 1 vẫn còn nguyên.
- Thẻ tài liệu và ba giấy nhớ Vụ 2 chưa có ảnh riêng.
