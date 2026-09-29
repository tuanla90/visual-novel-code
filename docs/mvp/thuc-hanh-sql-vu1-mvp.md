# Thực hành SQL theo mốc — MVP Vụ 1 "Chữ ký H" (v0.2, 29/09/2026)

> **Trạng thái:** ĐỀ XUẤT theo QĐ-092, chờ user chốt các mục **[cần chốt]**. Mọi số dòng trong tài liệu đã chạy thật trên sql.js
> (dữ liệu hiện có + phần dữ liệu đề xuất ở mục 7), trừ chỗ ghi "chưa chạy".
>
> **Hai phiên làm việc dùng tài liệu này:**
> - **Phiên logic / lối chơi**: engine, màn phòng máy (ghép mockup v7), dữ liệu, bộ kiểm. Giữ và sửa các cột **SQL, số dòng, manh mối vào,
>   thu vào hồ sơ, dòng sổ** dưới đây.
> - **Phiên giao diện + cốt truyện**: CSS, ảnh, và **lời dẫn / thoại** giữa các bài. Được viết lại thoại tự do, nhưng **không đổi** câu SQL,
>   giá trị dữ liệu, số dòng, mã manh mối / bằng chứng. Muốn đổi thì ghi vào mục 10 để phiên logic sửa dữ liệu và bộ kiểm cùng lúc.

## 0. Các mốc của Vụ 1 (để lên kế hoạch nội dung)

**Cách gọi:** đơn vị lớn là **Vụ** (tương đương "chapter"): Vụ 1 "Chữ ký H" chạy từ mở đầu tới **buổi bảo vệ** (buổi họp rà soát).
Mốc ghi `Vụ 1 · Ngày n`. Lịch trong truyện: mở đầu là **tuần 1** (tuần sinh hoạt công dân), ngày 1–5 là thứ Ba → thứ Bảy **tuần 2**,
buổi bảo vệ là thứ Hai **tuần 3** — nên không gọi "Tuần 1 · Ngày 2" để khỏi lệch với chữ "tuần" trong thoại.

Cột **Dữ kiện cần lấy** ghi dữ kiện người chơi phải có trước mốc đó và **chỗ đang cài hiện nay** (để bạn quyết cài lại chỗ khác).
**Hồ sơ thu được** ghi thứ vào hồ sơ và **dùng tiếp ở đâu**. Chi tiết từng bài SQL (câu chuẩn, số dòng, bẫy) ở mục 4–5, dành cho phiên logic.

---

**Mốc: Vụ 1 · Mở đầu** (tuần 1: nhận phòng KTX → Ngày hội CLB → phòng CLB)
- **Kiến thức:** xem một câu lọc viết sẵn (`WHERE ten = 'Tùng'`) và chọn đúng dòng — thấy "lọc thay vì dò bằng mắt"; chưa tự viết.
- **Dữ kiện cần lấy:** tên và ngành của bạn cùng phòng (Tùng, Du lịch) — có sẵn trong truyện.
- **Hồ sơ thu được:** giấy nhớ **[H]** (chữ ký trên lá thư) → dùng ở Ngày 4 và buổi bảo vệ; tài liệu: thẻ lịch của mình (để so với thẻ
  lịch rách ở Ngày 1), sổ chị Linh, báo cáo năm ngoái, bản chụp lá thư.

**Mốc: Vụ 1 · Ngày 1** (thứ Ba tuần 2) — thực địa
- **Kiến thức:** — (không có SQL; dạy cách xem xét hiện trường, đối chiếu thẻ lịch với thẻ của mình).
- **Dữ kiện cần lấy:** biết hộp kiến nghị ở sảnh tòa B (hiện: người chơi thấy cái hộp khi Tùng dẫn đi dạo trường ở mở đầu; sáng Ngày 1 Tùng nhắc "cái hộp ở ngay đó, ra hỏi bác bảo vệ trước").
- **Hồ sơ thu được:** giấy nhớ **[Tòa B]** và **[Báo chí K24]**, bằng chứng **thẻ lịch rách** (hiện cả ba từ lời bác Thịnh + thẻ lịch mắc ở
  khe hộp) → dùng ở Ngày 2; thẻ lịch còn là căn cứ ở buổi bảo vệ.

**Mốc: Vụ 1 · Ngày 2** (thứ Tư tuần 2) — phòng máy
- **Kiến thức:** `WHERE`, so sánh bằng với **số** (viết như dữ liệu lưu), so sánh bằng với **chữ** (nháy đơn `'…'`), `AND` / `OR`.
- **Dữ kiện cần lấy:** **K24** (khóa 2024), **tòa nhà B**, **ngành Báo chí** (hiện: K24 và Báo chí nằm chung giấy nhớ [Báo chí K24], tòa B là
  giấy nhớ riêng — đều từ Ngày 1; tách thành 3 giấy nhớ cũng được); **quyền dữ liệu** (cô Hạnh cấp ở Phòng Đào tạo, cùng ngày).
- **Hồ sơ thu được:** bằng chứng **Lớp BC24A** (tòa B, Báo chí, khóa 2024) → dữ kiện cho bài thực hành Ngày 4 và căn cứ ở buổi bảo vệ.
  Sổ cá nhân tự ghi 3 dòng: WHERE + số; chữ + nháy đơn; AND/OR.

**Mốc: Vụ 1 · Ngày 3** (thứ Năm tuần 2) — thực địa
- **Kiến thức:** — (dữ liệu có giới hạn: phải có mã sinh viên và căn cứ mới được tra sổ niêm phong).
- **Dữ kiện cần lấy:** Lớp BC24A (Ngày 2) để CLB có cái mang lên Phòng CTSV.
- **Hồ sơ thu được:** giấy nhớ **[Cần mã và căn cứ]** → lý do Ngày 4 phải lọc ra **mã sinh viên**; (phụ) giấy nhớ **[Lời chú Cường]** → cần
  cho kết thật.

**Mốc: Vụ 1 · Ngày 4** (thứ Sáu tuần 2) — phòng máy
- **Kiến thức:** ôn chữ + nháy trên bảng mới; `=` so khớp **nguyên chữ** (ra 0 dòng thì xem lại dữ liệu); "bắt đầu bằng" `LIKE 'H%'`.
  (Phụ) ôn số + `AND` trên nhật ký in.
- **Dữ kiện cần lấy:** **Lớp BC24A** (Ngày 2), **[H]** (mở đầu), **[Cần mã và căn cứ]** (Ngày 3). (Phụ) **lá thư dài 1 trang** — hiện **chưa cài**
  (bản chụp thư chưa nói số trang), cần thêm nếu giữ bài nhật ký in.
- **Hồ sơ thu được:** bằng chứng **Hai mã** (Hiếu SV240228, Hoài SV240317) → nộp ở Ngày 5, căn cứ ở buổi bảo vệ. (Phụ) bằng chứng **Dòng nhật ký
  in** (Chủ nhật 23:10, tài khoản năm 4) → cần cho kết thật. Sổ cá nhân tự ghi: `=` so nguyên chữ; LIKE bắt đầu bằng.

**Mốc: Vụ 1 · Ngày 5** (thứ Bảy tuần 2) — thực địa
- **Kiến thức:** — (kết quả lọc là ứng viên, sổ niêm phong mới xác nhận).
- **Dữ kiện cần lấy:** **Hai mã** (Ngày 4) + căn cứ bằng văn bản.
- **Hồ sơ thu được:** giấy nhớ **[Hoài là người nộp]** (cô phụ trách tra sổ: SV240317 có, SV240228 không) → buổi bảo vệ; (phụ) **[Lời Đạt]**
  → cần cho kết thật (thay được lời chú Cường).

**Mốc: Vụ 1 · Buổi bảo vệ** (thứ Hai tuần 3)
- **Kiến thức:** **đọc và sửa** SQL (câu OR của Quân 14 dòng → sửa AND → 2 dòng); đọc kết quả đúng mức (ứng viên, không phải thủ phạm).
  Sai mất vạch uy tín.
- **Dữ kiện cần mang:** Hai mã, [H], Lớp BC24A, thẻ lịch rách, [Hoài là người nộp]; để có **kết thật**: dòng nhật ký in **và** (lời chú Cường
  **hoặc** lời Đạt).
- **Hồ sơ thu được:** bằng chứng "Hai dòng sau khi sửa"; kết thường hoặc kết thật.

---

## 1. Nguyên tắc (tóm QĐ-092)

- **Hồ sơ = thông tin vụ án** (giấy nhớ, tài liệu, bằng chứng). **Sổ tay = kiến thức SQL** (sổ chị Linh để tra; sổ cá nhân = dòng đã học).
  Căn cứ ở buổi họp lấy từ **hồ sơ**.
- **Mỗi lần vào phòng máy là một chuỗi bài nhỏ** (mỗi bài một ý), trong cùng một lần vào nên **không tốn thêm khung giờ**.
- **Xong một mảng kiến thức → dòng sổ tự vào sổ cá nhân** (không hỏi, không chọn đoạn code).
- **Số trước, chữ sau:** số viết như dữ liệu đang lưu ("nhìn sao viết vậy"); chữ đặt trong **nháy đơn `'…'`**. Không dạy nháy kép.
- Mạch chính chỉ: `WHERE`, `=`, "bắt đầu bằng" `LIKE 'x%'`, `AND`/`OR`, so sánh bằng với số. "Chứa", "kết thúc bằng", hoa thường,
  `IN`, `>`/`<` → nhiệm vụ phụ.
- Phòng máy **không báo đúng/sai** (QĐ-071): Hà Vy chỉ **mô tả** kết quả. Máy chấm ngầm; bài xong khi kết quả khớp.
- Bỏ "đoán trước khi chạy" ở MVP.

## 2. Khuôn một buổi thực hành (format chuẩn)

Mỗi buổi phòng máy viết thành **một bảng bài** + phần việc cho phiên truyện. Mỗi hàng là một bài:

| Cột | Ý nghĩa | Ai giữ |
|---|---|---|
| **Bài** | Mã bài (vd `2.1`), nối tiếp nhau trong một buổi | logic |
| **Học gì** | Đúng **một** ý mới (hoặc "ghép" các ý đã có) | logic |
| **Vào từ hồ sơ** | Manh mối / bằng chứng người chơi đã có, dùng làm giá trị (vd giấy nhớ `[Tòa B]`) | logic |
| **Cách nhập** | `kéo` giấy nhớ vào ô · `✎` gõ lại dòng WHERE (thang tự viết bậc 1, kế hoạch màn core v0.3) · `sẵn` câu nạp sẵn | logic |
| **SQL chuẩn** | Câu máy dùng để chấm (so tập kết quả) | logic |
| **Kết quả** | Số dòng + các dòng chính | logic (bộ kiểm chạy thật) |
| **Lần chạy "sai có ích"** | Bẫy dự kiến và kết quả của nó — để phiên truyện viết lời Hà Vy **mô tả** (không phán) | logic đặt bẫy, truyện viết lời |
| **Dòng sổ tự ghi** | Câu vào sổ cá nhân khi xong bài (nếu bài mở một mảng kiến thức) | logic (câu chữ truyện được sửa nhẹ) |
| **Thu vào hồ sơ** | Bằng chứng / giấy nhớ mới — **chỉ bài cuối** của chuỗi (hoặc bài cho dữ kiện có nghĩa trong truyện) | logic |

**Việc của phiên truyện cho mỗi buổi:** lời mở buổi (vì sao hôm nay tra cái này), một câu **nhiệm vụ** cho mỗi bài (ai giao, vì sao — không
lộ SQL), lời Hà Vy mô tả kết quả sau mỗi lần chạy dự kiến (cả lần "sai có ích"), lời Tùng ở chỗ ghi "Tùng", câu chốt khi thu được bằng chứng.

## 3. Bản đồ 6 ngày (bảng gọn của mục 0)

| Ngày | Loại | Dữ kiện chính | Thực hành SQL | Vào từ hồ sơ | Thu vào hồ sơ |
|---|---|---|---|---|---|
| Mở đầu | Truyện | — (Ngày hội CLB) | **Lọc thử** câu viết sẵn `ten = 'Tùng'`, chọn đúng dòng (3 dòng) — xem ví dụ, chưa tự viết | — | tài liệu thẻ lịch, sổ chị Linh, báo cáo yếu, thư che; giấy nhớ `[H]` |
| 1 | Thực địa | Bác Thịnh + thẻ lịch rách ở khe hộp | — | `[H]` | giấy nhớ `[Tòa B]`, `[Báo chí K24]`; bằng chứng **thẻ lịch rách** |
| 2 | **Phòng máy** | Lọc lớp | **Chuỗi 2.1–2.4** (mục 4): số → chữ + nháy → AND/OR → ghép 3 điều kiện | `[Tòa B]`, `[Báo chí K24]`, `[Quyền dữ liệu tạm]` | bằng chứng **lớp BC24A**; sổ: WHERE + số, chữ + nháy, AND/OR |
| 3 | Thực địa | Quy chế phiếu gửi, sổ niêm phong (CTSV) | — | lớp BC24A | giấy nhớ `[Cần mã và căn cứ]`; (phụ) `[Lời chú Cường]` |
| 4 | **Phòng máy** | Tên H trong BC24A | **Chuỗi 4.1–4.2** (mục 5): lọc lớp → tên bắt đầu bằng H (`= 'H'` ra 0 là lần chạy sai có ích); (phụ) **nhật ký in 4.4–4.5** | lớp BC24A, `[H]`, `[Cần mã và căn cứ]` | bằng chứng **hai mã** (Hiếu, Hoài); (phụ) **dòng nhật ký in**; sổ: LIKE bắt đầu bằng |
| 5 | Thực địa | Nộp 2 mã, cô phụ trách tra sổ niêm phong | — | hai mã | giấy nhớ `[Hoài là người nộp]`; (phụ) `[Lời Đạt]` |
| 6 | Buổi họp | — | **Sửa câu OR của Quân** (nạp sẵn, 14 dòng → sửa AND → 2 dòng); 2 câu hỏi đọc kết quả (trừ uy tín) | hai mã, thẻ lịch, (phụ) nhật ký in + lời chú Cường / lời Đạt | bằng chứng hai dòng sau khi sửa; true end nếu đủ bằng chứng phụ |

Tổng: từ 4 điểm chạm → **khoảng 11 lần chạy có chủ đích** (4 ở ngày 2, 3 + 2 phụ ở ngày 4, sửa ở ngày 6, lọc thử ở mở đầu); mỗi khái niệm
mạch chính gặp ít nhất 2 lần.

**[cần chốt]** Ngày thực địa (1, 3, 5) giữ không có SQL, hay thêm một bài ngắn (vd ngày 5 lọc lại hai mã trước khi nộp)? Tài liệu này giữ
**không có** để nhịp "thực địa ↔ phòng máy" xen kẽ như QĐ-086.

## 4. Ngày 2 — buổi phòng máy đầu tiên (bản mẫu đầy đủ của khuôn)

Bối cảnh: sau khi cô Hạnh cấp quyền tạm (dữ kiện chính của Phòng Đào tạo, cùng ngày), CLB vào phòng máy tra **lớp sinh hoạt** khớp hai
manh mối ngày 1: hộp ở **tòa B**, thẻ lịch **Báo chí K24**. Bảng: `lop_sinh_hoat(ma_lop, nganh, khoa_hoc, toa_nha)`. FROM, SELECT khóa sẵn
(`SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat`); người chơi chỉ làm WHERE.

| Bài | Học gì | Vào từ hồ sơ | Cách nhập | SQL chuẩn (phần WHERE) | Kết quả | Lần chạy "sai có ích" | Dòng sổ tự ghi | Thu vào hồ sơ |
|---|---|---|---|---|---|---|---|---|
| 2.1 | WHERE + **số** viết như dữ liệu lưu | `[Báo chí K24]` | kéo `[K24]` vào ô giá trị của cột `khoa_hoc` → rồi ✎ sửa | `khoa_hoc = 2024` | 11 lớp | Kéo `[K24]` → `khoa_hoc = 'K24'` → **0 dòng**. Hà Vy: cột khóa lưu con số 2024, không có chữ K. Người chơi ✎ gõ `2024` (lần đầu dùng ✎, đúng chỗ bàn làm việc "không làm được") | "Lọc dòng: `WHERE cột = giá trị`. Số thì viết đúng như dữ liệu đang lưu." | — |
| 2.2 | **Chữ** phải trong nháy đơn | `[Tòa B]` | ✎ gõ (tiếp đà bài 2.1) | `toa_nha = 'B'` | 4 lớp (KT24A, QT24B, BC24A, BC23A) | Gõ như số: `toa_nha = B` → **lỗi "no such column: B"**. Hà Vy: máy đang đi tìm một **cột** tên B. Thêm nháy → chạy | "Chữ đặt trong nháy đơn: `toa_nha = 'B'`. Thiếu nháy, máy tưởng là tên cột." | — |
| 2.3 | AND (giao) vs OR (hợp) | `[Tòa B]`, `[Báo chí K24]` | kéo `[Báo chí]` + chọn nối AND / OR | `toa_nha = 'B' AND nganh = 'Báo chí'` | 2 lớp (BC24A, BC23A) | **Tùng** nối bằng OR → **5 lớp**. Hà Vy mô tả: lấy lớp nào thỏa một trong hai. Đổi AND → 2 | "AND: phải thỏa cả hai. OR: thỏa một là đủ." | — |
| 2.4 | Ghép 3 điều kiện | cả hai giấy nhớ + khóa ở 2.1 | kéo / ✎ thêm `AND khoa_hoc = 2024` | `toa_nha = 'B' AND nganh = 'Báo chí' AND khoa_hoc = 2024` | **1 lớp: BC24A** | Dừng ở 2 lớp: Hà Vy — có một lớp khóa khác cũng ở tòa B | — | **Bằng chứng `ev-lop-bc24a`** "Lớp BC24A: tòa B, Báo chí, khóa 2024" (ghi kèm điều kiện đã dùng + số dòng) |

- Cần dữ liệu mới: lớp **BC23A** (Báo chí, 2023, tòa B) để bài 2.4 có nghĩa; thêm vài lớp khóa 2023/2025 để bài 2.1 lọc ra ít hơn cả bảng
  (mục 7).
- Thời lượng dự kiến: 5–8 phút cho cả chuỗi.
- **[cần chốt]** Tùng làm OR ở 2.3 (5 lớp), không còn "OR 4 lớp" như bản cũ.

## 5. Ngày 4 — buổi phòng máy thứ hai

Bảng `sinh_vien(ma_sv, ho_dem, ten, ma_lop)`. Người chơi đã có bằng chứng lớp BC24A (ngày 2), giấy nhớ `[H]` (mở đầu), `[Cần mã và căn cứ]`
(ngày 3 — lý do phải ra **mã sinh viên**). SELECT khóa `ma_sv, ho_dem, ten, ma_lop`.

| Bài | Học gì | Vào từ hồ sơ | Cách nhập | SQL chuẩn (WHERE) | Kết quả | Lần chạy "sai có ích" | Dòng sổ tự ghi | Thu vào hồ sơ |
|---|---|---|---|---|---|---|---|---|
| 4.1 | Ôn: chữ + nháy trên bảng mới | bằng chứng lớp BC24A | kéo | `ma_lop = 'BC24A'` | 6 người | — | — | — |
| 4.2 | `=` so khớp **nguyên chữ**; "bắt đầu bằng" `LIKE 'H%'` | `[H]` | kéo `[H]` + AND; đổi phép "bằng" → "bắt đầu bằng" | `ma_lop = 'BC24A' AND ten LIKE 'H%'` | **2 người: Hiếu (SV240228), Hoài (SV240317)** | Kéo `[H]` với "bằng" → **0 dòng** (không ai tên đúng một chữ H) — Tùng: tra sổ chị Linh; lọc nhầm cột họ `ho_dem LIKE 'H%'` → 1 người (Hồ Ngọc Mai) | "`=` phải khớp nguyên chữ. Chỉ biết chữ đầu: `ten LIKE 'H%'`." | **Bằng chứng `ev-hai-ma`** |
| 4.4 *(phụ)* | Ôn LIKE trên bảng mới | bằng chứng hai mã (thầy Khải cho xem nhật ký) | kéo / ✎ | `ten_tep LIKE 'kien-nghi%'` | 2 dòng (chưa chạy — dữ liệu mới) | — | — | — |
| 4.5 *(phụ)* | Ôn số + AND | tài liệu bản chụp thư (1 trang) | ✎ thêm `AND so_trang = 1` | `ten_tep LIKE 'kien-nghi%' AND so_trang = 1` | 1 dòng: 23:10 Chủ nhật, tài khoản năm 4 (chưa chạy) | — | — | **Bằng chứng `ev-nhat-ky-in`** (key item true end) |

- (Đã làm, 30/09) 4.2 cũ "= 'H' ra 0 dòng" gộp vào bài LIKE làm lần chạy "sai có ích": một bài mà đáp án là "0 dòng" thì câu sai nào ra 0 dòng cũng qua. Chuỗi `pm4-ten` ở `kich-ban/04-phong-may-ngay-4.md`.
- 4.4–4.5 **thay** cảnh đọc nhật ký in hiện có (`n4-nhat-ky-in`, chỉ có thoại) bằng hai lần chạy thật trên bảng mới `nhat_ky_in`. Vẫn là dữ kiện
  **phụ**, cần `ev-hai-ma`, không tốn khung. **[cần chốt]**
- Dòng nhiễu "bài tập kinh tế vi mô in cùng đêm" giữ làm một dòng trong bảng `nhat_ky_in` (lọc `kien-nghi%` sẽ loại nó).
- Thời lượng: 4–6 phút (mạch chính), +2–3 phút nếu làm phần phụ.

## 6. Mở đầu và ngày 6 (giữ như hiện tại)

- **Mở đầu — Ngày hội CLB:** câu `SELECT ma_sv, ho_dem, ten, nganh FROM tra_cuu_k24 WHERE ten = 'Tùng'` viết sẵn, ra 3 dòng, người chơi chọn
  dòng ngành Du lịch. Mục đích: thấy "lọc thay vì dò bằng mắt", chưa tự viết. Không thu gì vào sổ.
- **Ngày 6 — buổi họp:** màn chiếu câu của Quân `ten LIKE 'H%' OR ma_lop = 'BC24A'` → 14 dòng; người chơi chạm vào OR (sai mất 1 vạch),
  sửa thành AND → 2 dòng; hai câu hỏi đọc kết quả (trừ uy tín); rẽ nhánh mời Hoài. Đây là lần thứ ba gặp AND/OR và lần hai gặp LIKE —
  người chơi **đọc và sửa** SQL, không gõ mới.
- Căn cứ ở buổi họp lấy từ **hồ sơ** (thẻ lịch, hai mã, nhật ký in, lời chú Cường / lời Đạt), không lấy từ sổ.

## 7. Dữ liệu cần đổi (đã chạy thử phần lớp trên sql.js, 29/09)

- `lop_sinh_hoat`: thêm **BC23A** (Báo chí, 2023, B), **KT25A** (Kế toán, 2025, A), **QT23A** (Quản trị kinh doanh, 2023, C). Kết quả đã chạy:
  `khoa_hoc = 2024` → 11; `khoa_hoc = 'K24'` → 0; `toa_nha = B` → lỗi; `toa_nha = 'B'` → 4; `nganh = 'Báo chí'` → 3; B AND Báo chí → 2;
  B OR Báo chí → 5; + `khoa_hoc = 2024` → 1 (BC24A).
- Các lớp mới **không có sinh viên** (hoặc có nhưng **không ai tên bắt đầu bằng H**), để giữ nguyên: bảng ảo `tra_cuu_k24`, câu của Quân
  14 dòng, bẫy `ma_lop LIKE 'BC%'` của ngày 4.
- Bảng mới `nhat_ky_in(thoi_gian TEXT, ten_tep TEXT, so_trang INTEGER, tai_khoan TEXT)`: 4–6 dòng trong tuần, gồm dòng thư (Chủ nhật 23:10,
  `kien-nghi-phong-clb…`, 1 trang, tài khoản SV21… năm 4), một tệp `kien-nghi-…` khác nhiều trang, dòng bài tập kinh tế vi mô cùng đêm.
  Tài khoản chỉ lộ **khóa** (năm 4), không lộ tên (QĐ-090: để ngầm).
- Bộ kiểm `kiem-noi-dung:mvp` chạy thật mọi số dòng khai ở trên; đổi dữ liệu mà lệch số là báo lỗi `<tệp>:<dòng>`.

## 8. Sổ tay

- **Sổ chị Linh** (tra được mọi lúc, kiểu ô "SQL CONCEPT"): thêm trang **`where-so-chu`** "Lọc dòng: số và chữ"; giữ `and-or`, `like`,
  `kiem-hai-lan`. Lần đầu gặp một mảng, Tùng/Hà Vy có thể mở sẵn đúng trang một lần; các lần sau người chơi tự tra (QĐ-081).
- **Sổ cá nhân** (tự ghi, theo thứ tự học): sau Vụ 1 có 5 dòng — WHERE + số (2.1), chữ + nháy đơn (2.2), AND/OR (2.3), LIKE bắt đầu bằng (4.3),
  và (tùy) "`=` so khớp nguyên chữ; ra 0 dòng thì xem lại dữ liệu" (4.2).
- Nhiệm vụ phụ để dành (không vào mạch chính): "chứa" `'%H%'` (trong BC24A ra thêm Phúc vì chữ h thường), "kết thúc bằng", hoa thường,
  mã có số 0 đứng đầu là chữ (`ma_phong = 05` không tìm thấy `'05'`).

## 9. Việc của phiên logic (thứ tự đề xuất)

1. **Cú pháp chuỗi bài:** cho thẻ thử thách **không có vật chứng** (bài giữa chuỗi); một buổi phòng máy = một chuỗi hội thoại có nhiều
   `[THỬ THÁCH]` liên tiếp (dữ kiện dùng `Chuỗi:` thay `Thử thách:`). Không cần cú pháp "bước con" mới.
2. **`[GHI SỔ <trang>]`** tự thêm dòng vào sổ cá nhân; bỏ "Chọn đoạn code" của trang sổ và `[CHÉP SỔ]` (đặc tả §12.5, §18.6).
3. **Dữ liệu** mục 7 + trang sổ `where-so-chu` + thẻ thử thách 2.1–2.4, 4.1–4.5 (SQL chuẩn, số dòng kỳ vọng).
4. **Màn phòng máy theo mockup v7** (`docs/mockups/core-game-v7-canh.html`, kế hoạch màn core v0.3): kéo giấy nhớ vào ô giá trị, ✎ gõ lại
   dòng WHERE, chọn nối AND/OR, câu SQL luôn hiện song song. Bài 2.1–2.2 cần ✎ (kéo giấy nhớ thì máy tự thêm nháy, không có lỗi thiếu nháy).
   Trong lúc chưa có màn v7: vẫn chạy được bằng ô gõ SQL hiện tại.
5. Bằng chứng ghi kèm **điều kiện đã dùng + số dòng** (GPT, phiên hội đồng 22:46).

## 10. Câu hỏi còn mở

- **[cần chốt]** Ngày thực địa có thêm bài SQL ngắn không (mục 3).
- **[cần chốt]** Tùng làm OR ra 5 lớp ở 2.3 (mục 4).
- **[cần chốt]** Nhật ký in thành hai lần chạy thật (4.4–4.5) thay cảnh chỉ đọc (mục 5); nếu giữ thì cài thêm "lá thư dài 1 trang".
- Cách gọi "Vụ" / "buổi bảo vệ" (mục 0) — đổi được, chỉ là tên trong tài liệu.
- Khối bấm kiểu SQL Police: bậc giữa của thang tự viết, sau MVP (QĐ-092, chưa chốt).
- (Phiên truyện ghi vào đây nếu cần đổi SQL, số dòng hay manh mối.)
