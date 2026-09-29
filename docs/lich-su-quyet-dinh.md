# CLB Thám Tử Dữ Liệu — Lịch sử quyết định (prototype v0.1)

> File này ghi lại **mọi quyết định** trong quá trình dựng prototype theo [`prototype-scope-down-v0.1.md`](prototype/prototype-scope-down-v0.1.md).
>
> **Cơ chế vòng phản hồi (feedback loop):**
> 1. Điều phối viên (Claude Opus 5.5) giao việc cho các subagent kèm file này làm "luật".
> 2. Khi gặp điểm chưa được tài liệu hoặc file này quyết định, agent **dừng lại và hỏi** (nếu câu hỏi chặn việc) hoặc **tự chọn phương án khuyến nghị và báo lại** (nếu không chặn).
> 3. Điều phối viên trả lời theo hướng **có lợi nhất cho mục tiêu prototype** (kiểm chứng vòng chơi tìm manh mối → truy vấn → diễn giải → phản bác, với người mới học SQL), ghi vào file này, rồi gửi câu trả lời lại cho agent.
> 4. Chỉ điều phối viên được sửa file này. Agent đọc file này trước khi làm việc; quyết định ở đây có hiệu lực ràng buộc.
>
> **Thứ tự ưu tiên tài liệu (QĐ-084):** tổng quan vũ trụ → tầm nhìn sản phẩm chính (GDD) → tầm nhìn MVP → tầm nhìn prototype. Quyết định trong sổ này phải được đưa vào tài liệu đúng tầng. **Khi các tài liệu mâu thuẫn, điều phối viên đưa user quyết**, không tự phân xử. *(Thứ tự cũ, trước QĐ-084: `prototype/prototype-scope-down-v0.1.md` > file này > `thiet-ke/vu1-buoi-giai-trinh-kich-ban.md` > `thiet-ke/clb-tham-tu-du-lieu-GDD-v0.5.md` > `thiet-ke/vu-tru-chan-hung-tong-quan.md` (đường dẫn tính từ `docs/`).)*
>
> **Mẫu một mục:** `QĐ-xxx — Tiêu đề` · Nguồn (ai hỏi / giai đoạn) · Câu hỏi hoặc bối cảnh · Phương án · **Chọn** · Lý do.

---

## 1. Sơ đồ điều phối và chọn model

Quy trình theo skill `/giao-viec` của user: **mỗi lúc chỉ một agent** (máy từng hết RAM khi chạy song song); chấm độ phức tạp 5 tiêu chí × 0–2 điểm (quy mô · choke point · giá của sai sót · độ mơ hồ · suy luận); **0–6 → Opus, 7–10 hoặc thiết kế kiến trúc → Fable**; không dùng Sonnet/Haiku (trừ việc cơ học thuần và phải được user đồng ý). Mỗi gói Ship chạy trên nhánh `claude/<slug>` trong worktree riêng, commit từng bước; điều phối viên tự kiểm lại (typecheck, test, lint) trên `main` trước khi gộp.

| # | Gói | Loại | Điểm (quy mô·choke·giá sai·mơ hồ·suy luận) | Model |
|---|---|---|---|---|
| 1 | `kich-ban` — kịch bản đầy đủ dạng Markdown | Ship | 0·0·1·2·1 = 4 | Opus |
| 2 | `nen-mong` — khung dự án, hợp đồng kiểu, store, runtime kể chuyện | Ship | 2·2·1·2·2 = 9 (+ thiết kế kiến trúc) | Fable |
| 3 | `sql-engine` — dataset chính/ẩn, chạy, chấm, chẩn đoán, sinh/đọc SQL | Ship | 2·1·1·1·2 = 7 | Fable |
| 4 | `trinh-dung-ui` — trình dựng truy vấn, màn thử thách | Ship | 2·1·1·1·1 = 6 | Opus |
| 5 | `noi-dung` — chuyển kịch bản thành dữ liệu TypeScript | Ship | 1·1·1·1·1 = 5 | Opus |
| 6 | `giai-trinh-ui` — tương tác màn giải trình, kết | Ship | 1·1·1·1·1 = 5 | Opus |
| 7 | `hinh-giao-dien` — hình tạm SVG, cảnh, hiệu ứng, hồ sơ | Ship | 2·1·1·2·0 = 6 | Opus |
| 8 | `telemetry` — ghi sự kiện, bảng người quan sát, khảo sát | Ship | 1·1·1·0·0 = 3 | Opus |
| 9 | `tich-hop` — ghép toàn luồng, sửa lệch hợp đồng | Ship | 2·2·1·1·2 = 8 | Fable |
| 10 | `ra-soat-code` / `ra-soat-su-pham` | Scout | 8 / 4 | Fable / Opus |
| 11 | `sua-loi` — sửa theo danh sách đã xác minh | Ship | tùy | Opus (nâng bậc nếu gói đã fail) |

(Bảng được cập nhật nếu điều phối viên đổi kế hoạch.)

---

## 2. Quyết định nền tảng do điều phối viên chốt trước

### A. Kỹ thuật

**QĐ-001 — Công nghệ.** **Chọn:** Vite + React + TypeScript (strict) + sql.js (SQLite WASM) + Vitest; không backend. Thư mục ứng dụng: `prototype/`.
Lý do: tài liệu yêu cầu web chạy trên laptop, SQLite trong trình duyệt (§6.1); React giảm lỗi khi UI có nhiều phần tương tác (hội thoại, trình dựng truy vấn, bảng kết quả, giải trình); Vitest chạy được sql.js trong Node để kiểm chứng dataset và cách chấm. Loại: vanilla JS (dễ lỗi đồng bộ DOM), engine VN có sẵn (khó nhúng trình dựng SQL).

**QĐ-002 — Chạy lệnh.** **Chọn:** chạy `npm`/`npx`/`node` qua **Git Bash**, không qua PowerShell.
Lý do: PowerShell trên máy đang ở Constrained Language Mode, `npm.ps1` lỗi.

**QĐ-003 — Kiến trúc 4 phần (§6.3).** **Chọn:** `src/story` (cảnh, lời thoại, trạng thái), `src/evidence` (manh mối, vật chứng, hồ sơ), `src/sql-challenge` (schema, dữ liệu, chạy, chấm, trình dựng), `src/debrief` (câu hỏi diễn giải, phản bác), cộng `src/shared` (store, telemetry, UI dùng chung). Không làm API chung cho HTML/CSS/Python.

**QĐ-004 — Trạng thái.** **Chọn:** một store `zustand` chia slice; lưu tiến độ bằng `sessionStorage` (middleware `persist`). Có nút "Chơi lại từ đầu".
Lý do: §6.1 "lưu trạng thái trong phiên hiện tại"; F5 nhầm không mất tiến độ; không cần tài khoản/cloud save.

**QĐ-005 — Nội dung dạng dữ liệu.** **Chọn:** kịch bản viết thành dữ liệu TypeScript có kiểu (mảng node tuần tự, nhảy tường minh), kèm test kiểm tra toàn vẹn (id tồn tại, nhân vật/biểu cảm hợp lệ, đi được đến kết).
Lý do: "hội thoại dạng dữ liệu đơn giản" nhưng có kiểm tra kiểu để sửa nhanh sau mỗi vòng test.

**QĐ-006 — Chỉ cho phép đọc dữ liệu.** **Chọn:** chế độ gõ SQL chỉ chạy **một câu `SELECT`** (cho phép `WITH … SELECT`); câu khác bị từ chối bằng lời thoại: "Trong buổi làm việc này CLB chỉ có quyền **xem** dữ liệu."
Lý do: tránh `DROP`/`UPDATE` phá dữ liệu giữa chừng; đồng thời củng cố nguyên tắc đạo đức dữ liệu của CLB.

**QĐ-007 — Kiểm thử.** **Chọn:** Vitest cho bất biến dataset, bộ chấm, chuyển đổi trình dựng ↔ SQL, toàn vẹn kịch bản; `tsc --noEmit` strict và `vite build` phải qua; điều phối viên tự chơi thử toàn bộ trên trình duyệt.

**QĐ-008 — Ngôn ngữ.** **Chọn:** giao diện và nội dung tiếng Việt; tên biến/hàm tiếng Anh (tên bảng/cột SQL giữ tiếng Việt không dấu như tài liệu).

**QĐ-034 — Quản lý mã nguồn.** **Chọn:** khởi tạo git cục bộ (nhánh `main`, không có remote), `core.autocrlf=false` + `.gitattributes` `eol=lf`; mỗi gói làm trên nhánh `claude/<slug>`, điều phối viên kiểm rồi gộp vào `main`.
Lý do: skill `/giao-viec` cần commit làm bản ghi tiến độ và để thu hồi khi agent bị dừng; thư mục ban đầu chưa có git.

**QĐ-009 — Phông chữ.** **Chọn:** đóng gói cục bộ qua `@fontsource` (Be Vietnam Pro cho giao diện, JetBrains Mono cho SQL; nếu thiếu glyph tiếng Việt thì dùng phông mono khác có tiếng Việt), không phụ thuộc Google Fonts lúc chạy.
Lý do: buổi test có thể không có mạng ổn định.

### B. Dữ liệu (§2.4, §13.1)

**QĐ-010 — Schema view tối thiểu.**
- `sinh_vien(ma_sv TEXT PRIMARY KEY, ho_dem TEXT, ten TEXT, ma_lop TEXT, clb TEXT)` — **40 dòng**, không có NULL.
- `lop_sinh_hoat(ma_lop TEXT PRIMARY KEY, nganh TEXT, khoa_hoc INTEGER, toa_nha TEXT)` — **8 dòng**, tòa A/B/C.
- Không có ngày sinh, quê quán, số điện thoại, KTX (§4.1).

**QĐ-011 — Giá trị cố định.**
- 4 CLB: `Báo chí`, `Văn học`, `Robotics`, `Guitar`. Mỗi sinh viên thuộc đúng một CLB.
- Lớp ở giảng đường B: **đúng** `KT24A` và `QT24B`.
- Nhân chứng (người bỏ hộ thư): **Lê Thị Hoài — SV240317 — QT24B — Báo chí**.
- Người còn lại trong danh sách cần xác minh: **Phạm Minh Hiếu — SV240228 — KT24A — Báo chí** (hoàn toàn vô can).

**QĐ-012 — Bất biến số dòng (có test bảo vệ).**
| Truy vấn | Số dòng |
|---|---:|
| Thử thách 1: `ten LIKE 'H%'` | 10 |
| Thử thách 2: lớp ở tòa B | 2 |
| Thử thách 3: H + lớp tòa B + Báo chí (`AND`) | 2 |
| Truy vấn `OR` của Quân (§4.4) | 24 |
| Bỏ bất kỳ một trong ba điều kiện của thử thách 3 | ≥ 4 |

**QĐ-013 — Bẫy sư phạm trong dữ liệu.** Có ít nhất: 2 người có `ho_dem` bắt đầu bằng H nhưng `ten` thì không; 2 người có `ten` kết thúc bằng "h" (Linh, Thanh…); 1 người có "h" ở giữa tên (Khánh, Thảo…); lớp có mã gần giống (ví dụ `KT24B` ở tòa khác); vài thành viên `Văn học` gần khớp.
Lý do: sai `ho_dem`/`'%H'`/`'%H%'`/lọc theo tiền tố mã lớp đều cho kết quả khác → có cơ hội gợi ý theo ý nghĩa.

**QĐ-014 — Không đưa nhân vật cốt truyện vào dữ liệu.** **Chọn:** không có Khánh, Minh Anh, Hà Vy, Quân… trong `sinh_vien`; thành viên Robotics là sinh viên hư cấu chung chung.
Lý do: một "trứng phục sinh" thưởng cho việc tra cứu ngoài mục đích sẽ đi ngược nguyên tắc "chỉ dùng dữ liệu cho đúng việc".

**QĐ-015 — Dataset kiểm tra ẩn.** **Chọn:** cùng bảng `lop_sinh_hoat`; `sinh_vien` khác hẳn (12–16 dòng) với đáp án riêng; thiết kế để làm trượt: gõ cứng `ma_sv`, dùng `LIMIT`, bỏ một điều kiện, dùng `OR`, `LIKE '%H%'`, lọc theo `ho_dem`. Áp dụng cho **thử thách 1, thử thách 3 và màn sửa truy vấn của Quân** (thử thách 2 chỉ chạy dataset chính vì bảng lớp giống nhau).
Lý do: §6.2 yêu cầu cho thử thách 3; mở rộng sang thử thách 1 và màn sửa không tốn thêm công, chặn đoán mò.

### C. Trình dựng truy vấn và cách chấm (§5, §6.2)

**QĐ-016 — Trình dựng.**
- Ba hàng `SELECT` / `FROM` / `WHERE` luôn hiện. `FROM` **để trống** khi bắt đầu mỗi thử thách (chọn bảng là một hành động học).
- `SELECT`: ô chọn cột của bảng + tùy chọn `*`.
- `WHERE`: danh sách điều kiện (cột · phép so sánh · giá trị). Phép: `=` "bằng", "bắt đầu bằng" (`LIKE 'x%'`), "kết thúc bằng" (`LIKE '%x'`), "chứa" (`LIKE '%x%'`), "thuộc danh sách" (`IN`).
- **Một phép nối chung** `AND`/`OR` cho mọi điều kiện, hiển thị giữa từng cặp; bấm vào một chỗ là đổi cả loạt.
- SQL cập nhật tức thì bên cạnh, tô màu từ khóa, có chú thích khi rê chuột lên `%`, `AND`, `OR`, `IN`.
- Chế độ **"Sửa SQL trực tiếp"** (textarea). Quay về trình dựng: thử phân tích ngược; không phân tích được thì hỏi xác nhận quay về trạng thái trình dựng gần nhất.
Lý do: một phép nối chung giữ đúng lựa chọn cần học (AND hay OR) mà không kéo theo chuyện ưu tiên toán tử/ngoặc — thứ không nằm trong mục tiêu prototype.

**QĐ-017 — Manh mối thành giá trị.** **Chọn:** ô chọn giá trị có mục "Từ manh mối" (ví dụ `H` — chữ ký lá thư; `Báo chí` — bookmark; danh sách lớp tòa B — kết quả thử thách 2) bên cạnh các giá trị có trong dữ liệu. Không làm kéo-thả.
Lý do: giữ ý tưởng "giá trị trong truy vấn phải đến từ bằng chứng" (GDD §10.2) với chi phí thấp.

**QĐ-018 — Chạy là chấm.** **Chọn:** mỗi lần bấm "Chạy" đều hiện bảng kết quả + số dòng và tự đánh giá: đúng → khung thành công + nút "Lưu vào hồ sơ"; chưa đúng → một nhận xét theo **ý nghĩa** (không phạt, thử lại không giới hạn). Nút "Hỏi Hà Vy" cho gợi ý tăng dần (đếm số lần dùng).
Lý do: §5.2 khuyến khích chạy và sửa; không thanh uy tín, không hạng.

**QĐ-019 — Quy tắc chấm (§6.2).** So tập kết quả với truy vấn chuẩn trên cùng dữ liệu: đúng số dòng; có đủ **cột bắt buộc** (so theo giá trị — tên cột/alias/thứ tự cột không quan trọng); bỏ qua thứ tự dòng; cho phép cột thừa (kèm mẹo nhẹ "chỉ cần cột…"); truy vấn trả cả bảng tự trượt do sai số dòng; chạy thêm dataset ẩn theo QĐ-015.
- Cột bắt buộc: thử thách 1 = `ma_sv, ho_dem, ten`; thử thách 2 = `ma_lop`; thử thách 3 và màn sửa của Quân = `ma_sv, ho_dem, ten` (khuyến khích thêm `ma_lop, clb`). Đề bài phải nói rõ cần những thông tin nào.

**QĐ-020 — Gợi ý bắt buộc có.** Ba câu gợi ý theo ý nghĩa của §5.2 phải xuất hiện đúng ngữ cảnh: "bất kỳ hay đồng thời", "đúng cột cần dùng", "ai cần hỏi tiếp hay đã đủ kết luận". Hà Vy được dùng phép so sánh với Excel (bộ lọc Filter) vì người chơi mục tiêu quen bảng tính.

**QĐ-021 — Làm quen ở thử thách 1.** **Chọn:** Hà Vy hướng dẫn từng bước (chọn bảng → chọn cột → thêm điều kiện → chạy), làm nổi bật phần cần thao tác tiếp theo; không khóa thao tác. Có bảng schema với mô tả cột tiếng Việt và nút "Xem 5 dòng đầu".
Lý do: câu hỏi đầu tiên của §1.3 là "người mới có hiểu phải làm gì mà không cần người ngồi cạnh".

### D. Vòng chơi và kịch bản (§2, §3, §4)

**QĐ-022 — Người chơi.** Không tên, không chân dung, không giới tính; lời thoại của người chơi hiển thị nhãn **"Bạn"**. Minh Anh và Quân (năm 3) gọi người chơi là "em"; Hà Vy (năm 2) xưng "mình", gọi "cậu"; nhân chứng xưng "em" với anh/chị năm trên, gọi người chơi là "bạn". Quân xưng "tôi".
Lý do: §8 hoãn tạo nhân vật; nhãn trung tính tránh gán giới tính.

**QĐ-023 — Diễn giải sau mỗi thử thách.** Mỗi thử thách kết thúc bằng một câu hỏi "đọc kết quả" 3 lựa chọn, có giải thích cho từng lựa chọn, thử lại được, không phạt. Câu hỏi của thử thách 3 **chỉ** hỏi ý nghĩa của `AND` ("vì sao chỉ còn 2 dòng"); câu hỏi "hai dòng này là nghi vấn hay bằng chứng" **để dành cho màn giải trình**.
Lý do: bước "đọc, giải thích" nằm trong vòng lõi (§3); nhưng nếu dạy trước ranh giới nghi vấn/bằng chứng thì chỉ số "≥ 60% trả lời đúng rằng kết quả chưa chứng minh hành vi" (§10) bị thổi phồng.

**QĐ-024 — Màn giải trình (§4.4–4.5).** Trình tự tương tác:
1. Quân chiếu truy vấn `OR` (số dòng thật: 24) và kết luận "manh mối vô dụng".
2. Người chơi **chạm vào dòng lỗi** (dòng có `OR` là đúng; chạm dòng khác → Quân bác nhẹ + Hà Vy gợi ý, không phạt).
3. **"Có số liệu đây!"**
4. Người chơi **sửa truy vấn** trong trình dựng đã nạp sẵn truy vấn của Quân (đổi `OR` → `AND`), chạy ra 2 dòng.
5. Câu hỏi: hai dòng này nghĩa là gì → đúng: "hai người cần xác minh, chưa phải thủ phạm".
6. Cú lật — Quân hỏi: "Nếu dữ liệu chưa kết luận được, CLB dựa vào đâu?" → đúng: **yêu cầu nguồn xác minh độc lập**; sai tiêu biểu: thêm điều kiện đến khi còn một dòng; bắt hai bạn nhận; chọn người "đáng ngờ" hơn. Ghi lại **lựa chọn đầu tiên** cho telemetry, cho thử lại.
7. Sổ bàn giao niêm phong (cán bộ phụ trách hộp góp ý chỉ xuất hiện qua lời kể/văn bản) → mã SV khớp Lê Thị Hoài → nhân chứng thừa nhận bỏ hộ cho một anh năm cuối đeo huy hiệu Robotics.
8. Hiếu được xác nhận vô can; danh sách được hủy khi quyền truy cập kết thúc. Thông điệp kết của §4.5.
Nhân chứng không bị gọi là thủ phạm, không bị làm bẽ mặt.

**QĐ-025 — Hiệu ứng "Có số liệu đây!".** Toàn màn hình kiểu truyện tranh (đường tốc độ, chữ lớn nghiêng, rung), ~1,2 giây, bấm để bỏ qua, tắt rung khi `prefers-reduced-motion`. Dùng **tối đa 2–3 lần**: chỉ ra lỗi `OR`, đưa kết quả đã sửa, (tùy) đưa sổ bàn giao.

**QĐ-026 — Nhân vật và hình tạm.** Hình vẽ bằng SVG/CSS trong code, không dùng dịch vụ tạo ảnh trả phí. Minh Anh (đỏ phượng), Hà Vy (xanh ngọc, kính), Quân (xanh than/xám): mỗi người 3 biểu cảm; nhân chứng: 1 mẫu, 3 biểu cảm; bác Tư: chân dung nhỏ 1 biểu cảm. Ba cảnh: phòng CLB (ấm), hành lang giảng đường B có hộp góp ý, phòng giải trình (lạnh). Ba vật chứng: lá thư ký "H.", nửa bookmark CLB Báo chí, sổ bàn giao niêm phong. Hồ sơ/vật chứng tông giấy (kem, ghim); trình dựng SQL tông màn hình hiện đại (GDD §15.4).

**QĐ-027 — Điều hướng.** Không bản đồ; chuyển cảnh bằng nút "Nhiệm vụ tiếp theo →". Thanh trên cùng luôn hiện: tiến trình 5 phần (Mở đầu · Điều tra · Phân tích · Giải trình · Kết), dòng "Nhiệm vụ hiện tại", nút "Hồ sơ". Điểm xem xét có nhãn và viền rõ ràng, đánh dấu khi đã xem (§6.1 "không săn pixel").

**QĐ-028 — Thiết bị.** Tối ưu laptop 1366×768 và 1920×1080; co giãn cơ bản đến 1024 px; không tối ưu điện thoại. Phím Space/Enter để qua lời thoại; có trạng thái focus rõ.

### E. Thử nghiệm (§9)

**QĐ-029 — Telemetry.** Chỉ lưu cục bộ (`localStorage`), mã phiên ngẫu nhiên ẩn danh, không gửi mạng, không thu tên thật. Sự kiện theo §9.3: bắt đầu/hoàn thành từng phần, mỗi lần chạy truy vấn (kèm loại lỗi cú pháp/logic, có đúng không), số lần gợi ý, thời gian đến lần chạy đầu, thời gian hoàn thành từng thử thách, lựa chọn ở câu "dữ liệu đã đủ kết luận chưa", hoàn thành game, muốn chơi tiếp.

**QĐ-030 — Bảng người quan sát.** Mở bằng `?facilitator=1`: xem phần/cảnh hiện tại, nhảy tới từng phần, xuất/xóa telemetry (JSON), đặt lại phiên. Người chơi không thấy.

**QĐ-031 — Khảo sát trong game (có thể bỏ qua, không thu thông tin cá nhân).** Đầu game: mức quen Excel, đã học SQL chưa. Cuối game: chọn tối đa 2 phần đáng nhớ nhất (tìm manh mối / tự tạo truy vấn / màn phản bác Quân / cú lật xác minh độc lập / câu chuyện-nhân vật), đoạn gây khó chịu (tùy chọn), có muốn chơi vụ tiếp theo (Có / Có thể / Không).
Lý do: đo trực tiếp hai chỉ số §10 ("màn phản bác là một trong hai phần đáng nhớ nhất", "muốn chơi tiếp") và tách riêng người đã học SQL (§9.1).

**QĐ-032 — Ngoài phạm vi (nhắc lại §8).** Không làm: mã đề/dữ liệu ngẫu nhiên, tạo nhân vật, bản đồ, Blockly, mode Hardcore riêng, thanh uy tín, hạng S/A/B/C, trang phục, mini game, tài khoản, JOIN/bảng phân tích, mobile-first, kiến trúc chung đa dòng game.

### F. Định danh dùng chung (mọi agent phải dùng đúng)

**QĐ-033 — Bảng định danh.**
| Loại | Định danh |
|---|---|
| Phần (part) | `intro` · `investigation` · `analysis` · `debrief` · `ending` |
| Cảnh | `clb-room` · `corridor-b` · `debrief-room` |
| Nhân vật · biểu cảm | `minh-anh`: `neutral` `worried` `happy` · `ha-vy`: `neutral` `thinking` `smile` · `quan`: `neutral` `smug` `stunned` · `hoai` (nhân chứng): `nervous` `downcast` `relieved` · `bac-tu`: `neutral` |
| Người nói đặc biệt | `player` (nhãn "Bạn") · `narrator` (không nhãn) |
| Manh mối | `clue-signature-h` (chữ ký bắt đầu bằng H) · `clue-box-building-b` (hộp góp ý giảng đường B) · `clue-bookmark-baochi` (nửa bookmark CLB Báo chí) |
| Vật chứng tài liệu | `doc-letter` · `doc-bookmark` · `doc-handover-log` |
| Vật chứng từ truy vấn | `ev-c1-names-h` · `ev-c2-classes-b` · `ev-c3-shortlist` · `ev-quan-fixed` |
| Thử thách | `c1` · `c2` · `c3` · `debrief-fix` |
| Hiệu ứng | `co-so-lieu-day` |

---

## 3. Quyết định từ vòng phản hồi với agent

*(Điều phối viên ghi tiếp bên dưới khi trả lời câu hỏi của agent.)*

**QĐ-035 — Cân bằng lựa chọn ở câu hỏi đo lường, xáo thứ tự mọi câu hỏi.** · Nguồn: điều phối viên rà commit `d64f707` của gói `kich-ban` (Phần 4) · 26/09 15:12
- Vấn đề: ở `q-two-rows` và `q-verify`, lựa chọn đúng dài nhất và dùng giọng thận trọng nhất ("cần xác minh thêm, chưa phải…", "nguồn độc lập đối chiếu, như cô phụ trách…"). Người quen làm trắc nghiệm sẽ chọn đúng nhờ mẹo "chọn câu dài, câu cẩn thận", làm thổi phồng hai chỉ số của §10 ("≥ 60% trả lời đúng rằng kết quả chưa chứng minh hành vi") và §9.3 (lựa chọn ở câu "dữ liệu đã đủ kết luận chưa").
- Phương án: A — để nguyên; B — cân độ dài/giọng các lựa chọn của hai câu đo lường; C — B + xáo thứ tự lựa chọn của mọi câu `[HỎI]` và ghi telemetry theo id lựa chọn.
- **Chọn C.** Mỗi lựa chọn của `q-two-rows`, `q-verify` dài xấp xỉ nhau (chênh ≤ 30%), đều nghe hợp lý với người mới; lựa chọn sai phải hấp dẫn thật (ví dụ tiếp nối câu "Tìm ra rồi!" của Minh Anh). Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; telemetry ghi id lựa chọn, không ghi chữ cái.
- Lý do: hai câu này là thước đo chính của prototype; đo sai thì quyết định sau thử nghiệm (§10.1) sai theo.

**QĐ-036 — Ranh giới Phần 4 (Giải trình) / Phần 5 (Kết).** · Nguồn: agent `kich-ban` phản biện brief · 26/09 15:30
- Câu hỏi: brief đặt đủ 8 bước của QĐ-024 trong Phần Giải trình; §2.1 của tài liệu user ghi phần Kết gồm "xác minh độc lập, hé lộ người nhờ bỏ thư".
- Phương án: A — theo §2.1 (Kết bắt đầu từ sổ bàn giao, `end-01`); B — theo brief.
- **Chọn A.** Brief của điều phối viên sai ở điểm này; agent đúng. QĐ-024 giữ nguyên trình tự, chỉ đổi chỗ chia phần: bước 1–6 thuộc `debrief`, bước 7–8 thuộc `ending`.
- Lý do: tài liệu của user có ưu tiên cao hơn; mốc "xong Giải trình" trùng với câu hỏi đo lường chính nên số liệu thời lượng từng phần có nghĩa hơn.

**QĐ-037 — Thẻ hồ sơ: "Câu hỏi còn mở" trước, "Lưu ý" sau.** · Nguồn: đề xuất (2) của agent `kich-ban` · 26/09 15:30
- Vấn đề: dòng "Lưu ý" của các thẻ hồ sơ có dạng "X cho biết A, không cho biết B" — đúng khuôn của câu đo lường `q-two-rows`; thẻ lá thư còn lộ trước cú lật ("chữ ký… chưa chắc là của người viết").
- Phương án: A — để nguyên; B — ẩn "Lưu ý" đến cuối giải trình (agent nghiêng về B); C — để nguyên + ghi sự kiện mở thẻ; **D — trước Phần 5, mỗi thẻ manh mối/tài liệu hiện dòng "Câu hỏi còn mở" (câu hỏi mà manh mối đó đặt ra, đẩy điều tra đi tiếp); "Lưu ý" (giới hạn của bằng chứng) chỉ hiện từ Phần 5 `ending` trở đi, như phần tổng kết bài học.**
- **Chọn D.** "Câu hỏi còn mở" không được nói ra nguyên tắc "khớp manh mối ≠ kết luận"; chỉ nêu điều người chơi cần tìm tiếp (ví dụ "H là chữ đầu tên của ai?").
- Lý do: giữ được chỗ dạy "đọc giới hạn bằng chứng" (B làm mất), bảo vệ thước đo chính (A, C không bảo vệ), và củng cố nguyên tắc §3 "mỗi manh mối phải đổi câu hỏi người chơi đang muốn trả lời".

**QĐ-038 — Người chơi tự nêu nguồn độc lập?** · Nguồn: đề xuất (3) của agent `kich-ban` · 26/09 15:30
- Phương án: A — giữ lời thoại "Bạn" tự nói "cô phụ trách hộp góp ý"; B — thêm câu hỏi `q-source`.
- **Chọn A** cho vòng test 1. Sau buổi thử, hỏi người chơi "cú lật có công bằng không"; nếu nhiều người thấy "bị dắt tay", vòng 2 cân nhắc B.
- Lý do: `q-verify` đã đo được điều cốt lõi (chọn nguồn độc lập thay vì thêm điều kiện); B vượt ngân sách chữ, thêm một chỗ có thể vấp.

**QĐ-039 — Phép nối AND/OR không có mặc định.** · Nguồn: rủi ro agent `kich-ban` nêu (mục 5) · 26/09 15:30
- Vấn đề: nếu trình dựng mặc định `AND`, người chơi qua c3 mà chưa từng phải nghĩ "bất kỳ hay đồng thời"; gợi ý `hint-any-or-all` gần như không bao giờ hiện ở c3, và mục tiêu học §1.2-3 ("phân biệt AND với OR trong tình huống có ý nghĩa") chỉ được chạm tới ở màn giải trình.
- Phương án: A — mặc định AND; B — mặc định OR (bẫy cố ý, thiếu tự nhiên); **C — khi có từ 2 điều kiện, phép nối ở trạng thái "chưa chọn"; người chơi phải tự chọn "AND — thỏa đồng thời" hoặc "OR — thỏa bất kỳ" (nhãn giải thích ngay trên nút chọn); chưa chọn thì nút Chạy bị vô hiệu kèm lời nhắc lý do.**
- **Chọn C.** Kiểu `QueryModel.connector` là `'AND' | 'OR' | null`. Riêng `debrief-fix` nạp sẵn `OR` (truy vấn của Quân).
- Lý do: biến AND/OR thành một quyết định có chủ ý ngay ở c3 — đúng mục tiêu học — mà không dùng bẫy.

**QĐ-040 — Mã chẩn đoán.** · Nguồn: thẻ thử thách của agent `kich-ban` · 26/09 15:30
- **Chọn:** dùng bộ mã trong `docs/prototype/kich-ban-prototype.md` làm hợp đồng giữa nội dung và engine: `not-select`, `syntax-error`, `no-table`, `wrong-table`, `no-filter`, `missing-columns`, `extra-columns`, `wrong-column-ho-dem`, `like-ends-with`, `like-contains`, `class-prefix`, `wrong-value`, `hardcoded-ids`, `limit-used`, `or-connector`, `missing-condition`, `connector-unset` (bổ sung 15:36 theo QĐ-039: lời nhắc khi bấm Chạy lúc chưa chọn phép nối, xếp vào nhóm "không chạy được"), `other`; thứ tự ưu tiên như mục "Quy ước thẻ thử thách". Gói `sql-engine` được thêm mã mới nếu cần nhưng phải báo lại; mã không phát hiện được thì rơi về `other`.

**QĐ-041 — Xáo lựa chọn một lần mỗi lần câu hỏi xuất hiện.** · Nguồn: câu hỏi 1 của agent `nen-mong` · 26/09 16:30
- Phương án: A — xáo lại sau mỗi lần chọn sai (đúng chữ QĐ-035, nhưng nút vừa bấm "chạy chỗ khác"); B — xáo một lần khi câu hỏi xuất hiện, giữ nguyên thứ tự khi chọn lại.
- **Chọn B.** Làm rõ QĐ-035: "mỗi lần hiện câu hỏi" = mỗi lần câu hỏi được mở (mount), không phải mỗi lần thử lại.
- Lý do: lần đầu đã xáo là đủ chống mẹo "chọn câu dài"; người mới không bị mất dấu sau khi đọc phản hồi.

**QĐ-042 — Khảo sát chỉ có lựa chọn đóng.** · Nguồn: câu hỏi 2 của agent `nen-mong` · 26/09 16:30
- Phương án: A — "đoạn gây khó chịu" là lựa chọn đóng (như "phần đáng nhớ"); B — thêm ô chữ tự do.
- **Chọn A** cho vòng 1. Câu hỏi mở đã có trong phỏng vấn miệng (§9.2 bước 5).
- Lý do: ô chữ tự do có thể chứa tên thật của bạn bè/giảng viên — trái §9.3 "không thu tên thật".

**QĐ-043 — Câu đọc kết quả do màn thử thách điều khiển.** · Nguồn: câu hỏi 3 của agent `nen-mong` · 26/09 16:30
- Phương án: A — `readQuestion` nằm trong màn thử thách, hiện ngay dưới bảng kết quả, trước nút "Lưu vào hồ sơ"; B — tách thành `QuestionNode` sau `ChallengeNode`.
- **Chọn A.** Ràng buộc cho gói `trinh-dung-ui`: tự gọi `track({ type: 'question_answered', … })` với id lựa chọn, số lần thử, cờ lựa chọn đầu — giống hệt câu hỏi trong chuỗi truyện.
- Lý do: người chơi cần nhìn bảng kết quả khi trả lời "kết quả này nghĩa là gì".

**QĐ-044 — Sự kiện `notebook_opened`.** · Nguồn: agent `nen-mong` báo thiếu · 26/09 16:30
- **Chọn:** phát khi người chơi mở Hồ sơ (kèm phần hiện tại); gói `telemetry` gắn lời gọi vào nút "Hồ sơ".
- Lý do: rẻ, và giúp đọc lại QĐ-037 (người chơi có đọc "Câu hỏi còn mở" không) khi phân tích buổi test.

**Nghiệm thu gói `nen-mong` lần 1 — KHÔNG ĐẠT (trả lại).** · 26/09 16:33
- Tại `main`: typecheck 0 lỗi (canary TS2322 bắt được), 48/48 test, lint sạch, build + wasm đạt.
- Lỗi chặn: `npm run dev` trắng trang — `sql-wasm-browser.js does not provide an export named 'default'`. Cơ chế: `optimizeDeps.exclude: ['sql.js']` khiến Vite dev phục vụ nguyên tệp CommonJS như ES module; bản build dùng bộ gói khác nên không lộ. Agent đã nêu đúng rủi ro này (chưa kiểm dev) nhưng chưa kiểm. Trả lại agent sửa + thêm bước kiểm dev.

**Nghiệm thu gói `nen-mong` lần 2 — ĐẠT.** · 26/09 16:45
- Sửa: `optimizeDeps.include: ['sql.js']`. Canary mới `sqljs.dev.test.ts` khởi động Vite dev thật và nạp module như trình duyệt. Điều phối viên tự bẻ phanh tại `main`: đổi lại `exclude` → canary đỏ đúng thông điệp "không có default export"; khôi phục → xanh.
- Tại `main`: typecheck 0 lỗi, 51/51 test, lint sạch, build đạt; chế độ dev trên trình duyệt 1366×768: 0 lỗi console, màn tiêu đề hiển thị đủ.
- Đặc tả thử thách (`ChallengeSpec`) thuộc gói `sql-engine`, đặt một nơi duy nhất; gói `noi-dung` ghép với `ChallengeContent` thành `ChallengeDefinition`.

**QĐ-045 — Đổi thứ tự gói: nội dung thật trước giao diện.** · Nguồn: điều phối viên, khi soạn brief gói 4 · 26/09 16:40
- Vấn đề: theo kế hoạch cũ, gói 4 (trình dựng UI) và gói 6 (giải trình UI) dựng và tự kiểm trên nội dung MẪU; lỗi lệch giữa kịch bản thật và giao diện (độ dài chữ, số bước hướng dẫn, mã chẩn đoán thiếu lời…) chỉ lộ ở gói tích hợp.
- Phương án: A — giữ thứ tự 3 → 4 → 5; **B — 3 → 5 → 4 → 6 → 7 → 8 → 9** (gói 5 chỉ cần kiểu của gói 2 và specs của gói 3).
- **Chọn B.**
- Lý do: mọi lần kiểm trên trình duyệt từ gói 4 trở đi dùng lời thoại thật, nên phát hiện sớm chữ tràn, gợi ý thiếu, chẩn đoán không có lời; chi phí đổi thứ tự bằng 0 vì các gói chạy tuần tự.

**QĐ-046 — Ba ca chấm biên của engine.** · Nguồn: câu hỏi 1–3 của agent `sql-engine` · 26/09 18:45
- (1) Sai bảng làm câu không chạy được (`SELECT ma_lop FROM sinh_vien WHERE toa_nha = 'B'` → "no such column"): **chọn A** — `status: 'error'` + chẩn đoán `wrong-table`; giao diện rẽ nhánh theo `run.ok` để hiện bảng, theo mã đã chọn để hiện lời. Loại C vì mất lời "sai bảng" đúng ngữ cảnh.
- (2) `LIMIT` không cắt mất dòng nào trên cả hai dataset: **chọn A** — vẫn `correct` (QĐ-019 chấm theo tập kết quả); mọi `LIMIT` "cắt cho gọn" đều trượt dataset ẩn.
- (3) Đạt dataset chính mà trượt dataset ẩn, không phát hiện được mã cấu trúc nào: **chọn A** — `hardcoded-ids` ("đi từ đáp án"), vì dataset ẩn được dựng đúng để bắt kiểu truy vấn đó.

**QĐ-047 — Lời cho mã chẩn đoán mới và `wrong-value` chung.** · Nguồn: đề xuất Đ1 + rủi ro của agent `sql-engine` · 26/09 18:45
- Engine thêm 2 mã blocking: `no-columns` (chưa chọn cột), `no-value` (điều kiện chưa có giá trị). **Chọn A:** gói `noi-dung` viết lời Hà Vy cho hai mã này ở "Nhận xét chung" của kịch bản; giao diện KHÔNG được in mã thô khi `response` rỗng.
- Thêm một lời `wrong-value` CHUNG (giá trị không có trong dữ liệu — soát chính tả và dấu tiếng Việt) để người gõ SQL tay kiểu `clb = 'Bao chi'` ở c3/màn sửa nhận lời có ích thay vì lời `other`; thẻ c2 vẫn giữ lời `wrong-value` riêng. Gói `noi-dung` được phép thêm `wrong-value` vào `COMMON_DIAGNOSTIC_ORDER` (sau `limit-used`, trước `extra-columns`) — đúng một dòng ngoài phạm vi.
- Chặn lệch hai nguồn thứ tự: `pickDiagnostic` dùng thứ tự khóa của nội dung, engine dùng `CHALLENGE_DIAGNOSTIC_ORDER`/`COMMON_DIAGNOSTIC_ORDER` → gói `noi-dung` phải có test khẳng định hai thứ tự trùng nhau.

**QĐ-048 — Giữ thứ tự dòng dataset chính.** · Nguồn: đề xuất Đ2 của agent `sql-engine` · 26/09 18:45
- **Chọn A (giữ):** Hiếu, Hoài đứng trước các thành viên khác của các tập giao, nên "thiếu điều kiện + `LIMIT 2`" ra bảng trông đúng trên dataset chính nhưng vẫn nhận lời `missing-condition` và trượt dataset ẩn — đúng tinh thần QĐ-015.

**Nghiệm thu gói `sql-engine` — ĐẠT.** · 26/09 18:45
- Tại `main`: typecheck 0 lỗi, 244/244 test, lint sạch, build đạt. Bài kiểm độc lập của điều phối viên (tệp tạm, không commit) 4/4: 40 sinh viên / 8 lớp / c1 = 10 / OR của Quân = 24 / c3 đúng Hiếu + Hoài; một câu c3 viết khác hẳn (chữ thường, alias, truy vấn con, đảo điều kiện, `ten >= 'H' AND ten < 'I'`) được chấm đúng; gõ cứng mã bị dataset ẩn bắt; `UPDATE` bị chặn, dữ liệu nguyên vẹn.
- Sự cố canh: 76 phút không commit và không tệp nào đổi sau commit đầu → đánh thức; agent hoạt động lại ngay, không phải dừng.

**QĐ-049 — Gỡ ghi chú của người viết khỏi chữ hiển thị.** · Nguồn: Q1/Đ1 của agent `noi-dung` · 26/09 19:50
- Vấn đề: vài câu chỉ dẫn cho người dựng nằm trong trường hiển thị: `(end-01)` ở dòng Nguồn của sổ bàn giao; "Thẻ kèm câu SQL đã chạy và bảng kết quả." (ev-c1); "Thẻ kèm hai câu SQL (trước và sau khi sửa)…" (ev-quan-fixed); "Chú thích gắn sau màn giải trình: xem mục Hồ sơ vật chứng." (ev-c3-shortlist — người chơi đọc được ở Phần 3, trước màn giải trình, trái QĐ-023).
- Phương án: A — để nguyên; **B — sửa kịch bản bỏ các câu đó, chép lại dữ liệu**; C — thêm trường "ghi chú dựng" (đụng kiểu đóng băng).
- **Chọn B**, kèm một test canh giữ quét mọi chuỗi hiển thị của nội dung: không được chứa định danh thô (`intro-/inv-/ana-/deb-/end-NN`, `hs-`, `q-`, `clue-`, `doc-`, `ev-`, mã chẩn đoán) hay cụm chỉ dẫn ("xem mục", "Thẻ kèm"); canary phải tự chứng minh bắt được lỗi.

**QĐ-050 — "Hủy danh sách" nghĩa là không hiển thị tên/mã nữa.** · Nguồn: Q2/Đ2 của agent `noi-dung` · 26/09 19:50
- Vấn đề: sau end-03 Hồ sơ chỉ làm mờ bảng kết quả, mô tả thẻ `ev-c3-shortlist` vẫn ghi rõ họ tên + mã — trái lời "Danh sách hai người được hủy".
- Phương án: A — làm mờ cả mô tả; B — bỏ tên khỏi mô tả trong kịch bản; C — để nguyên.
- **Chọn A, bản chặt:** khi thẻ bị `redact`, giao diện KHÔNG render tên/mã (cả bảng lẫn mô tả) — thay bằng vạch che + dòng "đã hủy khi quyền truy cập kết thúc"; không dùng chỉ `filter: blur` vì chữ vẫn nằm trong DOM, trình đọc màn hình vẫn đọc được. Gói `hinh-giao-dien` làm.
- Lý do: thông điệp đạo đức dữ liệu của prototype phải nhất quán giữa lời thoại và giao diện.

**QĐ-051 — Chữ mã trong nội dung.** · Nguồn: Q3/Đ3 của agent `noi-dung` · 26/09 19:50
- **Chọn A:** dữ liệu giữ nguyên dấu `` ` `` (nguyên văn kịch bản); giao diện hiển thị đoạn trong dấu thành chữ mã (phông mono, nền nhạt). Gói `trinh-dung-ui` tạo helper dùng chung trong `src/shared/ui/` (tệp mới) và áp cho màn thử thách + hộp thoại; gói `hinh-giao-dien` áp cho Hồ sơ.

**QĐ-052 — Chỉnh cho kịch bản khớp engine; chấp nhận vượt ngân sách chữ 2%.** · Nguồn: Q4 của agent `noi-dung` · 26/09 19:50
- Agent `noi-dung` được sửa kịch bản: dòng quy ước ưu tiên liệt kê đủ 6 mã blocking; thứ tự các mã blocking ở "Nhận xét chung" theo engine (`no-table` → `no-columns` → `no-value` → `connector-unset`); dòng "Cột bắt buộc" của debrief-fix thêm "(khuyến khích thêm `ma_lop`, `clb`)"; cập nhật mục "Tự kiểm".
- Tổng chữ 2.648 so với ngân sách 2.600 (ngân sách do điều phối viên đặt ở gói 1, tài liệu user không có): chấp nhận; thời lượng thật sẽ đo bằng telemetry.

**QĐ-053 — Màn xem xét không được nêu tên manh mối còn thiếu.** · Nguồn: rủi ro agent `noi-dung` nêu · 26/09 19:50
- Vấn đề: dòng nhắc ở hành lang ghi "còn thiếu: Nửa bookmark CLB Báo chí" trước khi người chơi xem hộp góp ý — lộ trước manh mối.
- **Chọn:** chỉ nêu số điểm còn lại ("Còn 1 điểm chưa xem xét"). Gói `hinh-giao-dien` sửa `ExploreScreen` (được phép, ngoài bản đồ sở hữu cũ); kèm đưa thẻ chữ lớn (end-04) vào giữa màn hình.

**Nghiệm thu gói `noi-dung` — ĐẠT.** · 26/09 20:05
- Tại `main`: typecheck 0 lỗi, 384/384 test, lint sạch, build đạt. Điều phối viên tự bẻ phanh canary định danh thô bằng cách khác agent đã thử (cắm `q-sig-h` vào nhãn điểm xem xét "Hộp góp ý") → đỏ, bắt ở cả hai mẫu; khôi phục → xanh. Nội dung thật hiển thị trên trình duyệt 1366×768, 0 lỗi console.
- Chuyển cho gói sau: yêu cầu "thẻ vật chứng truy vấn kèm câu SQL, bảng kết quả, câu trước/sau khi sửa" không còn trong kịch bản (QĐ-049 đã gỡ) → ghi vào brief gói `hinh-giao-dien`. Chú thích của `COMMON_DIAGNOSTIC_ORDER` chưa liệt kê `no-columns`, `no-value` (không ảnh hưởng hành vi) → gói `tich-hop` dọn.

**QĐ-054 — Lời chung cho mã mà thẻ thử thách không có.** · Nguồn: Đ1 của agent `trinh-dung-ui` · 26/09 21:45
- Vấn đề: dùng OR ở c1/c2, sai bảng ở c1, lọc theo tiền tố mã lớp ở c1/màn sửa → engine phát hiện đúng nhưng `pickDiagnostic` rơi về lời `other` chung chung.
- Phương án: A — để nguyên; **B — thêm lời chung cho `or-connector` (dùng câu gợi ý chuẩn `hint-any-or-all`), `wrong-table`, `class-prefix` vào "Nhận xét chung" + `COMMON_DIAGNOSTIC_ORDER`**; C — giao diện hiện lời theo mã của engine (phá QĐ-047).
- **Chọn B.** Giao cho gói `giai-trinh-ui` làm thành một nhóm việc nội dung riêng (kịch bản + `src/content/real` + thứ tự; test trung thành/thứ tự của gói 5 tự khẳng định lại).

**QĐ-055 — Thanh trên chiếm 3 hàng ở màn ≤ 1100 px.** · Nguồn: Đ2 của agent `trinh-dung-ui` · 26/09 21:45
- **Chọn B:** gói `hinh-giao-dien` sửa `app.css` để cụm nút giữ hàng đầu (khoảng một quy tắc CSS), đo lại ở 1024×768.

**QĐ-056 — Điều kiện mới không chọn sẵn cột; cột nhiều giá trị dùng ô chữ.** · Nguồn: điều phối viên chơi thử c1 khi nghiệm thu · 26/09 21:45
- Vấn đề: bấm "Thêm điều kiện" → mặc định `ma_sv` · "bằng" · danh sách đủ 40 mã sinh viên. Người mới được gợi ý ngầm cách "chọn thẳng mã" — đúng lối tắt mà game dạy tránh (`hardcoded-ids`), và lệch triết lý "FROM để trống, chọn là một hành động học" (QĐ-016).
- Phương án: A — để nguyên; **B — cột của điều kiện mới ở trạng thái "Chọn cột…"; danh sách giá trị có trong dữ liệu chỉ hiện cho cột ít giá trị (≤ 12 giá trị khác nhau: `ma_lop`, `clb`, `toa_nha`, `nganh`, `khoa_hoc`); cột nhiều giá trị (`ma_sv`, `ho_dem`, `ten`) dùng ô chữ + "Từ manh mối"** (với `IN`: nhập nhiều giá trị cách nhau bằng dấu phẩy).
- **Chọn B.** Gọi lại agent `trinh-dung-ui` làm (giữ ngữ cảnh), kèm test.
- Lý do: giống ô tìm trong bộ lọc Excel với cột tên; danh sách dài 40 mã vừa vô ích vừa dẫn sai.

**Nghiệm thu gói `trinh-dung-ui` — ĐẠT (kèm một việc bổ sung QĐ-056).** · 26/09 21:45
- Tại `main`: typecheck 0 lỗi, 419/419 test (`--maxWorkers=2`; chạy song song mặc định bị hết bộ nhớ trên máy này), lint sạch, build đạt. Điều phối viên tự chơi từ đầu tới hết c1 ở 1366×768: SQL sinh đúng, 10 dòng, lời Hà Vy, câu đọc kết quả đã xáo, 0 lỗi console. Nghi vấn "ô chọn cột có tên truy cập 'on'" đã kiểm bằng DOM: ô nằm trong `<label>` có tên cột → báo động giả của công cụ chụp cây truy cập, không phải lỗi.
- Agent phản biện đúng: store đã ghi phần lớn sự kiện telemetry của thử thách; nếu màn thử thách ghi thêm theo brief sẽ đếm đôi.

**QĐ-057 — Giữ chạy tuần tự một agent (QUYẾT ĐỊNH CỦA USER).** · Nguồn: điều phối viên hỏi user sau khi phiên bị ngắt · 26/09 21:58
- Câu hỏi: gói 6 (giải trình), 7 (hình), 8 (telemetry) có vùng tệp tách biệt — chạy song song 2 agent để nhanh hơn ~1,5 giờ (rủi ro hết RAM, tranh chấp khung trình duyệt) hay giữ tuần tự?
- **User chọn: tuần tự 1 agent** (đúng luật skill `/giao-viec`).
- Sự cố liên quan: phiên của điều phối viên bị ngắt lúc 21:45 ngay sau khi giao việc bổ sung QĐ-056; agent chưa kịp làm gì (worktree không đổi) → giao lại lúc 21:55, không mất việc.

**QĐ-058 — Cách mã hóa "điều kiện chưa chọn cột".** · Nguồn: câu hỏi của agent `trinh-dung-ui` khi làm QĐ-056 · 26/09 22:15
- Bối cảnh: `QueryCondition.column` (tệp đóng băng) không cho rỗng; agent đánh dấu điều kiện chưa chọn cột bằng tiền tố id `new-N` (cột giữ chỗ không hiện, không vào SQL, nút Chạy khóa với lời `no-value`).
- Phương án: A — chấp nhận cho prototype; B — mở kiểu `column: ColumnName | null` (sửa tệp đóng băng, lan sang engine và nội dung).
- **Chọn A.** Ghi vào danh sách dọn của gói `tich-hop`: nếu người rà soát code đánh giá cách này dễ gãy thì chuyển sang B.
- Không thêm lời riêng cho "chưa chọn cột": dòng nhắc ngay trong hàng điều kiện ("Chọn cột muốn lọc trước, rồi đến phép so sánh và giá trị.") đã đủ, lời `no-value` vẫn đúng.
- Nghiệm thu QĐ-056 tại `main` (cherry-pick `cc68d94`): typecheck 0 lỗi, 427/427 test, lint sạch, build đạt.

**QĐ-059 — QĐ-054 làm đỏ 2 test cũ: sửa kỳ vọng nhưng giữ sức phân biệt của phanh.** · Nguồn: agent `giai-trinh-ui` báo giữa chừng · 26/09 22:35
- Vấn đề: `diagnose.test.ts` (c1 + wrong-table → other) và `ChallengeTelemetry.test.tsx` (c1 + OR → lời other, primaryCode other) khẳng định hành vi cũ mà QĐ-054 cố ý đổi. Test thứ hai là phanh của gói 4, chứng minh telemetry ghi "mã đã hiện" chứ không phải mã đầu của engine; sau QĐ-054, với nội dung thật hai mã trùng nhau nên nếu chỉ đổi kỳ vọng thì phanh mất tác dụng.
- **Chọn:** cho agent `giai-trinh-ui` sửa đúng 2 tệp test đó; giữ một ca "rơi về other" bằng mã thật sự không có lời; viết lại test telemetry bằng nội dung giả trong test (xóa lời của mã engine trả về) để mã hiện ≠ mã engine; bẻ phanh lại để chứng minh.

**QĐ-060 — Hình tạm vẽ bằng code + ô thay ảnh thật (QUYẾT ĐỊNH CỦA USER).** · Nguồn: user hỏi "vẽ hay sinh ảnh?", điều phối viên trình bày, user chốt · 26/09 22:50
- **User chọn:** điều phối viên cho vẽ tạm (SVG/CSS, không sinh ảnh, không dịch vụ trả phí) và chừa sẵn chỗ thay ảnh; user sẽ tự sinh ảnh thật sau và thả vào.
- Ràng buộc cho gói `hinh-giao-dien`: ô ảnh cho **cảnh nền** (id theo tệp `prompts-background-prototype-v0.1.md` của user: `bg-prototype-club-room`, `bg-prototype-hallway`, `bg-prototype-hearing-room`), **chân dung** (`<nhân vật>-<biểu cảm>`, PNG nền trong, cùng khung như GDD §16.7) và **tài liệu** (lá thư, bookmark, sổ bàn giao — ảnh chỉ là nền, chữ vẫn chồng bằng giao diện); có ảnh thì dùng ảnh, không có thì dùng hình vẽ tạm; kèm README ghi rõ tên tệp, kích thước, vùng an toàn, và cách kiểm tra ảnh đã được nhận.

**QĐ-061 — Các câu của gói `giai-trinh-ui`.** · 26/09 23:55
- Q1 (câu chú thích "Năm mã trên…" trong kịch bản lệch nghĩa sau QĐ-054): **chọn B** — liệt kê đích danh 5 mã; điều phối viên tự sửa (1 dòng không hiển thị), test trung thành vẫn xanh.
- Đ1 (câu SQL biến mất khi hiện phản hồi chọn sai, trong khi Hà Vy đang bảo "xem anh ấy nối… bằng từ gì"): **chọn B** — giữ câu SQL chỉ đọc phía trên hộp thoại khi phản hồi đến từ màn chọn dòng; giao gói `tich-hop` (đụng `GameScreen.tsx`).
- Đ2 (hiệu ứng "Có số liệu đây!" có thể bị bỏ qua do bấm đúp/giữ phím): **chọn B** — bỏ qua cú bấm lặp và phím trong ~400 ms đầu; giao gói `hinh-giao-dien`.
- Đ3 (dấu "đã thử" mất khi tải lại trang): **chọn A** — để nguyên; số lần thử vẫn do runtime giữ.
- Tổng chữ kịch bản 2.686 (vượt ngân sách 2.600 của điều phối viên 86 chữ, do các lời chẩn đoán bổ sung QĐ-047/QĐ-054; năm Phần truyện vẫn 1.652): chấp nhận, mở rộng QĐ-052.

**Nghiệm thu gói `giai-trinh-ui` — ĐẠT.** · 26/09 23:55
- Tại `main` (cherry-pick 8 commit + sửa chú thích): typecheck 0 lỗi, 460/460 test (`--maxWorkers=2`), lint sạch, build đạt. Bẻ phanh của agent: tô riêng `OR` → đỏ; bỏ chạy thật → đỏ; đảo thứ tự mã chung → đỏ; phanh telemetry QĐ-059 → đỏ; tất cả khôi phục xanh.
- Điểm đáng ghi: agent tránh dùng lại `SqlCode` của gói 4 vì bộ đó gắn chú thích riêng cho `OR` — dùng lại sẽ vô tình lộ đáp án bước chọn dòng lỗi.

**QĐ-062 — Phạm vi "hủy dữ liệu" khi quyền truy cập kết thúc.** · Nguồn: Q1/Q2 của agent `hinh-giao-dien` · 27/09 01:20
- Vấn đề: kịch bản chỉ gắn `redact` cho `ev-c3-shortlist`; thẻ `ev-quan-fixed` (đúng hai người đó) và `ev-c1-names-h` (10 người, có cả hai) vẫn hiện tên + mã sau câu "Danh sách hai người được hủy". Dòng chú thích trên thẻ đã hủy còn nêu mã SV240317, SV240228.
- Phương án: A — sửa nội dung, gắn `redact` cho thêm các thẻ có dữ liệu cá nhân; B — giao diện tự che mọi bảng truy vấn khi có chú thích hủy (luật ngầm); C — để nguyên.
- **Chọn A, mở rộng:** ở end-03, che MỌI thẻ kết quả truy vấn có dữ liệu cá nhân (`ev-c1-names-h`, `ev-c3-shortlist`, `ev-quan-fixed`); giữ `ev-c2-classes-b` (chỉ có mã lớp). Bỏ mã sinh viên khỏi dòng chú thích của thẻ đã hủy (viết trung tính, ví dụ "một người trong danh sách đã ký gửi hộ; người còn lại vô can"); sổ bàn giao vẫn giữ mã vì đó là tài liệu của cán bộ, không phải dữ liệu CLB trích xuất. Giao gói `tich-hop` (sửa kịch bản + nội dung + test trung thành).
- Q3 (khung màn chiếu vượt mép màn chiếu vẽ ở ≤ 1100 px do bố cục xếp dọc của gói 6): **để nguyên** cho vòng test 1 (máy mục tiêu 1366×768; ở 1024 vẫn đọc được, 0 lỗi đo).
- Đề xuất đặt điểm xem xét lên hình nền: **để nguyên** (danh sách nút có nhãn) cho vòng test 1; cân nhắc khi có ảnh thật.

**Nghiệm thu gói `hinh-giao-dien` — ĐẠT.** · 27/09 01:20
- Tại `main` (ff `002849b`): typecheck 0 lỗi, 509/509 test, lint sạch, build đạt. Điều phối viên xem tận mắt màn tiêu đề và phòng CLB ở 1366×768: nền SVG đúng bố cục tệp prompt của user, chân dung đúng màu chủ đạo, người đang nói nổi bật.
- Bẻ phanh của agent: thả ảnh thử `bg-prototype-hallway.png` → game dùng ảnh, đặt sai tên → test đỏ; thẻ hủy chỉ `blur` → đỏ; dòng nhắc nêu tên manh mối → đỏ; bỏ chặn bấm lặp của hiệu ứng → đỏ.
- Hướng dẫn thả ảnh cho user: `prototype/src/assets/art/README.md`.
- Ghi chú: agent thấy 3 cú bấm chuột thật không phải của nó trong lúc chơi thử (có thể user đang xem khung trình duyệt) — luồng vẫn đi hết.

**Nghiệm thu gói `telemetry` — ĐẠT (điều phối viên tự nghiệm thu; agent bị dừng).** · 27/09 03:05
- Sự cố canh: commit cuối 01:50 (nhóm 6/7); 40 phút không commit → nhắc 02:31; 16 phút sau vẫn không tệp nào đổi, không tiến trình nào của worktree chạy → dừng agent 02:48 theo skill. Thu hồi: cả 6 nhóm code đã commit; phần "sửa dở" `main.tsx` chỉ là đổi dấu xuống dòng (bản vá rỗng) → bỏ. Mất: bước đi thử trên trình duyệt và báo cáo cuối của agent.
- Điều phối viên tự kiểm tại `main` (ff `7e42874`): typecheck 0 lỗi, 569/569 test, lint sạch, build đạt. Bẻ phanh (b): tóm tắt lấy lựa chọn CUỐI thay vì ĐẦU → test "lấy bản SỚM NHẤT" đỏ; khôi phục → xanh. Trên trình duyệt 1366×768: khảo sát đầu game đúng QĐ-031/QĐ-042; bảng người quan sát có vị trí, phiên, dung lượng lưu, xuất/xóa/đặt lại; nhảy tới "Giải trình" có hộp xác nhận, tự điền 8 mục hồ sơ bằng SQL chuẩn, đánh dấu phiên "có nhảy phần"; màn chiếu deb-01 chạy thật 24 dòng; 0 lỗi console. Không bấm "Xuất JSON" (thao tác tải tệp) — cấu trúc tệp đã có test.
- **Lỗi tìm thấy:** bảng người quan sát khi mở rộng (x 12–472, y 190–756 ở 1366×768) che nút "Bắt đầu" của màn tiêu đề — trong khi muốn nhảy phần phải bấm "Bắt đầu" trước. Giao gói sau sửa.

**QĐ-063 — Ô ảnh khớp theo quy ước ảnh thật của user.** · Nguồn: điều phối viên thấy user đã bắt đầu sinh ảnh · 27/09 03:05
- Bối cảnh: user đã đặt `char-minh-anh-anchor.png`, `char-minh-anh-worried.png` vào `prototype/src/assets/characters/` (chưa đưa vào git) theo tệp `prompts-characters-prototype-flow-v0.1.md`: tên `char-<nhân vật>-<biểu cảm>`, `-anchor` = biểu cảm gốc (trung tính; riêng Hoài = rụt rè), ảnh 1536×2048 NỀN XÁM PHẲNG (không trong suốt). Hệ ô ảnh của gói 7 chỉ quét `src/assets/art/` với tên `minh-anh-worried` → ảnh của user không được nhận.
- Phương án: A — bảo user đổi tên, dời thư mục, tự tách nền; **B — cho game khớp theo quy ước của user: quét mọi thư mục con của `src/assets/`, nhận tiền tố `char-`, hiểu `-anchor` là biểu cảm đầu của nhân vật, và tự tách nền phẳng (loang từ mép ảnh, có ngưỡng) khi ảnh chưa trong suốt; giữ quy ước cũ song song.**
- **Chọn B.** Theo đúng tinh thần QĐ-060 (user sinh ảnh, game tự nhận); user không phải làm thêm bước nào. Không đụng/xóa/đổi tên tệp của user.

**Nghiệm thu gói `tich-hop-a` (9a) — ĐẠT.** · 27/09 04:05
- Tại `main` (ff `9c811b2`): typecheck 0 lỗi, 592/592 test, lint sạch, build đạt. Điều phối viên kiểm trên trình duyệt: chân dung "Minh Anh, lo lắng" dùng ảnh thật của user (`data-art-source="image"`, `data-art-cutout="cut"`), nhãn truy cập tiếng Việt, không lộ tên tệp. Agent đo: 4 góc trong suốt, 0 điểm xám ở viền người; tách nền 1536×2048 ≈ 180–224 ms cả chuỗi; bảng người quan sát không che nút nào (đo `elementFromPoint`); sau end-03 cả 3 thẻ có dữ liệu cá nhân bị che, chú thích không còn mã sinh viên.
- Phát hiện của agent: hai tệp `.png` của user thực chất là JPEG 896×1200 (không phải PNG 1536×2048 như tệp prompt) — game vẫn nhận, ngưỡng tách đã chỉnh theo nhiễu nén.

**QĐ-064 — Các đề xuất của gói 9a.** · 27/09 04:05
- Tách nền chạy trên luồng chính (50–300 ms lần đầu mỗi ảnh): **để nguyên** cho vòng test 1; nếu máy test chậm → tách sẵn lúc màn tiêu đề rảnh, rồi mới tới Web Worker.
- Hai câu cùng ý trên thẻ đã hủy ("Tên và mã đã hủy…" + chú thích): **để nguyên** (chuyện chữ nghĩa, không phải lỗi).
- Tài liệu cũ (ARCHITECTURE.md §3 chỉ nhắc một thẻ bị hủy; chú thích trong `src/story/types.ts`, `src/evidence/types.ts`; số "Tự kiểm" của kịch bản): giao gói `tich-hop-b` dọn.
- Ghi chú công cụ (agent nêu): `TaskStop` trên Windows không tắt tiến trình node con, phải `taskkill` theo PID — đề xuất user cân nhắc thêm vào skill `/giao-viec` (điều phối viên không tự sửa skill của user).

**Nghiệm thu gói `tich-hop-b` (9b) — ĐẠT PHẦN LỚN; điều phối viên thu hồi và tự khép.** · 27/09 05:35
- Agent commit 4 nhóm (test chơi trọn luồng intro-01 → [KẾT THÚC] bằng store/runtime/engine thật; câu SQL của Quân vẫn hiện khi đọc phản hồi chọn sai — QĐ-061-Đ1; dọn ARCHITECTURE.md/chú thích/script test; README tiếng Việt), rồi trong lúc chơi thật tìm ra 2 lỗi và sửa dở. Sự cố canh: 40 phút không commit → nhắc 05:01; 20 phút sau không tệp nào đổi, agent không nhận lời nhắc (kẹt trong một lệnh dài) → dừng 05:21, `taskkill` server vite còn sót (TaskStop không tắt tiến trình con trên Windows).
- Thu hồi: gộp 4 commit (ff `aba1b38`); lưu phần sửa dở thành bản vá + 2 tệp mới, áp lên `main`, tự kiểm và commit `Sửa 2 lỗi tìm thấy khi chơi thật`: (1) câu hỏi trong truyện bị xáo lại sau khi chọn sai (GameScreen gỡ rồi dựng lại `MultipleChoice`) — trái QĐ-041, sửa bằng nhớ thứ tự ngoài component; (2) chữ ẩn cho trình đọc màn hình lọt khỏi khung cuộn làm màn thử thách cuộn lên, cắt tiêu đề.
- Tại `main`: typecheck 0 lỗi, 600/600 test, lint sạch, build đạt. Bẻ phanh của điều phối viên: trả `MultipleChoice` về cách xáo trong component → test "thứ tự y hệt" đỏ; khôi phục → xanh.
- Mất: báo cáo cuối của agent (ước tính thời lượng, kết quả kiểm bản build, số đo từng màn) → chuyển sang gói rà soát (lượt chơi thật + đo) và điều phối viên tự kiểm bản build.

**Kết quả gói `ra-soat-code` (10a, Scout Fable).** · 27/09 06:05
- 10 phát hiện, tất cả tự tái hiện: 1 CAO (bấm đúp lên lựa chọn câu hỏi → cú bấm thứ hai rơi vào hộp phản hồi, bỏ qua lời giải thích — kể cả ở `q-two-rows`/`q-verify`), 7 TRUNG (StrictMode ở `npm run dev` xáo lại thứ tự lựa chọn — bản sửa gói 9b chỉ đúng trên bản build; "Bắt đầu lại" sau F5 không xác nhận + ghi `survey_skipped` giả; bấm đúp "Hỏi Hà Vy" đếm đôi, mất gợi ý 1; khoảng trắng thừa/NFD trong giá trị gõ tay → 0 dòng khó hiểu; `runQuery` không giới hạn số dòng; tài liệu nói telemetry ghi câu SQL nhưng code không ghi; phiên chơi lại không được đánh dấu), 2 THẤP.
- Không lỗi: 37 cách vượt rào chỉ-đọc đều bị chặn; chấm 30 ca biên hợp lý; lựa chọn đầu ở hai câu đo lường đúng qua F5/bấm đúp/nhảy phần; không đếm đôi `challenge_start`/`first_run`/`challenge_complete`; DOM Hồ sơ sau end-03 không tên/mã; blob URL không rò.

**QĐ-065 — Hai câu hỏi của gói 10a.** · 27/09 06:05
- Có ghi câu SQL người chơi gõ vào telemetry không? **Không, ở vòng 1** — câu SQL gõ tay là chữ tự do (người chơi có thể gõ bất cứ gì, kể cả tên thật), trái tinh thần QĐ-042; mã chẩn đoán + chế độ + phép nối đã đủ để tìm 2–3 lỗi phổ biến (§11.4). Sửa README/ARCHITECTURE cho khớp code. Cân nhắc vòng 2: ghi "dạng câu" đã bỏ giá trị hằng.
- Buổi thử chạy bản nào? **Bản build** (`npm run build` + `npx vite preview`), README ghi rõ; đồng thời vẫn sửa lỗi StrictMode để chế độ dev cũng đúng QĐ-041.

**QĐ-066 — Kế hoạch sửa lỗi.** · 27/09 06:05
- Gom MỌI phát hiện đã xác nhận của 10a và của rà soát sư phạm (10b, chạy tiếp theo) vào MỘT gói `sua-loi` (Opus), tránh sửa chồng lên cùng tệp hai lần.
- Từ 10a, sửa: chống bấm đúp/giữ phím cho `DialogBox`, `MultipleChoice`, câu đọc kết quả và "Hỏi Hà Vy" (theo mẫu có sẵn của `ObjectionEffect`); thứ tự lựa chọn nhớ theo khóa phiên chơi + id câu hỏi, không ghi đè (chịu được StrictMode); "Bắt đầu lại" có hộp xác nhận và mang khảo sát đầu sang phiên mới; chuẩn hóa giá trị (bỏ khoảng trắng thừa ở trình dựng, NFC cả câu SQL trước khi chạy); giới hạn 2.000 dòng kèm một mã chẩn đoán mới `too-many-rows` và lời Hà Vy riêng (không dùng lời `other` chung chung); đánh dấu phiên chơi lại (`resetFrom`) trong tóm tắt và bảng người quan sát; chân dung ảnh hỏng quay về hình vẽ tạm; sửa tài liệu theo QĐ-065.
- Để vòng 2: F5 khi đã đúng nhưng chưa lưu (+1 `query_run`); bản ghi `isFirstChoice` trùng của câu đọc kết quả sau F5 (tóm tắt lấy bản sớm nhất nên chỉ số không đổi).

**Kết quả gói `ra-soat-su-pham` (10b, Scout Opus).** · 27/09 07:05
- Chơi bản build như người mới (cố tình mắc lỗi, dùng đủ gợi ý), rồi kiểm lại bằng phiên thứ hai. Kết luận: gần sẵn sàng cho vòng 1; vòng lõi thành hình, lời nhận xét khi chạy sai tốt, xưng hô và ngôn ngữ không phạt đạt. 15 phát hiện: 1 CAO, 9 TRUNG, 5 THẤP.
- Thời lượng ước tính một lượt người mới: ~27 phút (dải 21–35) với giả định 180 chữ/phút — trong khung 20–30 nhưng sát trần; Phần 3 ~12,5 phút (khung 8–10), chủ yếu do c3.

**QĐ-067 — Quyết định cho 15 phát hiện sư phạm.** · 27/09 07:05
- F1 (CAO, c3 bắt tự khám phá `IN` chưa được dạy; lọc một lớp → 1 dòng, hai lớp nối AND → 0 dòng đều chỉ nhận lời `other`): **B** — lời Hà Vy trước c3 giới thiệu "thuộc danh sách" bằng phép so Excel (tick hai ô trong Filter); thêm 2 mã chẩn đoán `class-subset` (lọc thiếu lớp) và `same-column-and` (hai điều kiện cùng cột nối AND) kèm lời Hà Vy; chưa làm "tự đổi phép" (biến IN thành thụ động).
- F2 (`q-two-rows`: lựa chọn đúng "…chưa phải người bỏ thư" mâu thuẫn với kết): **B** — đúng: "Hai người cần xác minh thêm, chưa đủ để nói ai bỏ thư."; sai: "Tìm ra rồi: dữ liệu đã chứng minh một trong hai bạn bỏ thư." (giữ cân độ dài QĐ-035).
- F3 (`q-verify` đoán được bằng khớp chữ "dữ liệu"): **B** — chỉ đổi các lựa chọn (câu hỏi của Quân là nguyên văn §4.4 của USER, giữ nguyên); đúng: "Nhờ người giữ giấy tờ gốc đối chiếu riêng hai mã này."; sai tương ứng: "Lọc thêm trong dữ liệu cho đến khi chỉ còn một dòng."; hai lựa chọn còn lại chỉnh cân độ dài.
- F4 (lời "Bạn" tự động nói luôn "Phải nối bằng AND." trước bước sửa): **B** — lời thứ ba thành "Người bỏ thư phải khớp cả ba cùng lúc, không phải chỉ một."
- F5 (tài liệu, kể cả sổ bàn giao, bị đóng mất bởi một cú Space/bấm đúp): **B** — bỏ `autoFocus`, khóa ~400 ms, bỏ qua phím giữ; gộp vào nhóm chống bấm đúp của QĐ-066.
- F6 ("Từ manh mối" chỉ hiện ở cột đúng → lộ cột; lời `no-value` chỉ tới mục không có): **C** — gợi ý manh mối chữ hiện cho mọi cột chữ cùng bảng (H cho cả `ten` lẫn `ho_dem`…); lời `no-value` thành "…Gõ vào ô, hoặc chọn 'Từ manh mối'.".
- F7 (câu đọc kết quả c1 không đo hiểu `%`): **B** — câu mới về ý nghĩa `%` trong `'H%'` (3 lựa chọn cân độ dài, có phản hồi).
- F8 ("Hỏi Hà Vy" xóa lời nhận xét cụ thể): **B** — khung Hà Vy giữ cả nhận xét của lần chạy gần nhất lẫn gợi ý.
- F9 (Quân đọc to tên + mã người vô can khi Hoài còn trên màn): **C** — lời dẫn "Hoài cúi chào rồi ra về." (rút chân dung Hoài khỏi cảnh) rồi mới tới lời Quân, và lời Quân không nêu tên/mã: "Mã còn lại không có trong sổ. Bạn ấy vô can, CTSV sẽ không liên hệ."
- F10 (mạch "giữ phòng CLB" không được khép): **B** — lời cuối của Minh Anh: "Lá thư tự bác chính nó rồi. Anh năm cuối đeo huy hiệu Robotics… để vụ sau. Em đi tiếp chứ?"
- F11–F15 (THẤP): giải thích "view" một lần bằng lời thường; bỏ chữ "B" khỏi nhãn cảnh hành lang; gợi ý mức 3 ghi đúng là đáp án ("Đáp án đây:"); viết lại mô tả bookmark thành câu hoàn chỉnh; tóm tắt phiên ở bảng người quan sát liệt kê số lần gặp từng mã lỗi (phục vụ §11.4).
- Hai điểm là lời của USER, giữ nguyên: đề c3 có chữ "đồng thời" (§4.3) nên chọn AND ở c3 không được coi là bằng chứng hiểu — đo AND/OR bằng phỏng vấn §9.2 bước 4; câu hỏi của Quân ở `q-verify` (§4.4).
- Để vòng 2: câu `q-source` (người chơi tự nêu nguồn, QĐ-038) nếu phỏng vấn cho thấy cú lật "dắt tay".

**QĐ-068 — Chia gói sửa lỗi.** · 27/09 07:05
- **11a `sua-loi-giao-dien` (Opus, 6 điểm):** mọi sửa code/giao diện của QĐ-066 + F5, F6 (phần hiển thị gợi ý), F8, F12 (nhãn cảnh), F15; engine phát hiện 2 mã mới của F1 và mã `too-many-rows` (thêm vào `DIAGNOSTIC_CODES`, tạm rơi về lời `other` cho tới 11b).
- **11b `sua-loi-noi-dung` (Opus, 5 điểm):** kịch bản + nội dung + test trung thành: lời cho `class-subset`, `same-column-and`, `too-many-rows`, lời dẫn IN trước c3, F2, F3, F4, F6 (lời `no-value`), F7, F9, F10, F11, F13, F14.
- Chạy tuần tự 11a → 11b (QĐ-057).

**QĐ-069 — Cho phép một loại node mới `exit` (nhân vật rời cảnh).** · Nguồn: điều phối viên khi soạn gói 11b (F9 của QĐ-067) · 27/09 07:10
- Vấn đề: F9 cần Hoài "cúi chào rồi ra về" trước khi Quân nói về người còn lại; sân khấu (gói 7) giữ mọi nhân vật đã nói trong cùng cảnh, và kiểu nội dung không có cách cho nhân vật rời cảnh → chân dung Hoài vẫn đứng đó.
- Phương án: A — chỉ thêm lời dẫn, để chân dung ở lại (hình và lời lệch nhau); B — sân khấu chỉ giữ nhân vật đã nói trong CHUỖI hiện tại (đổi hành vi mọi cảnh); **C — thêm node tự động `{ type: 'exit', character }` (sửa tệp đóng băng `src/story/types.ts` có kiểm soát: runtime xử lý như node tự động, bộ kiểm toàn vẹn nhận biết, sân khấu bỏ nhân vật khỏi dàn).**
- **Chọn C**, giao gói 11b; kèm test runtime + sân khấu + toàn vẹn nội dung. Đây là ngoại lệ có chủ đích của luật "tệp đóng băng", ghi tại đây.

**Sự cố gói `sua-loi-giao-dien` (11a) — THẤT BẠI, giao lại thu hẹp.** · 27/09 08:00
- Agent (Opus) làm nhóm 1 (chống bấm đúp) ~55 phút KHÔNG commit (vi phạm nhịp 40 phút), rồi luồng đứng 600 giây, cơ chế giám sát báo thất bại. Thu hồi: bản vá dở 442 dòng (hook `use-press-guard.ts`, sửa DialogBox/MultipleChoice/DocumentReveal/"Hỏi Hà Vy", một phần test) lưu ở scratchpad; worktree và nhánh bỏ.
- Theo skill `/giao-viec` ("gói đã fail → giao lại ở model cao hơn một bậc", "cắt nhỏ"): tách 11a thành **11a-1 `sua-loi-tuong-tac` (Fable)** — áp bản vá dở + chống bấm đúp + thứ tự lựa chọn chịu StrictMode + "Bắt đầu lại" có xác nhận; và **11a-2** (engine: trim/NFC, giới hạn dòng, mã mới; trình dựng F6/F8/F12; đánh dấu chơi lại; tóm tắt mã lỗi; ảnh hỏng; tài liệu) giao sau.
- Biện pháp chống treo mới cho mọi brief: bọc lệnh dài bằng `timeout`, nhịp commit 25 phút cho gói giao lại, commit đầu trong 10 phút.

**QĐ-070 — "Có số liệu đây!" thành câu của người chơi; Hà Vy nhận câu "Khoan, đếm lại đã."** · Nguồn: USER · 27/09 18:05
- Vấn đề: GDD §3.1 ghi "Có số liệu đây!" là câu cửa miệng của Hà Vy, nhưng trong kịch bản prototype Hà Vy chưa nói câu này lần nào; ở deb-02 và deb-03, ngay sau hiệu ứng là **người chơi** giải thích lỗi. Để Hà Vy hô thì cướp khoảnh khắc người chơi tự chạm đúng dòng lỗi (QĐ-024 bước 2–3), và Hà Vy lại là người đưa gợi ý nên dễ thành "Hà Vy giải, người chơi bấm theo".
- Phương án: A — giữ cho Hà Vy; B — người chơi hô, Hà Vy "trao" câu cho người chơi; **C — người chơi tự nghĩ ra câu này, Hà Vy có câu riêng**.
- **Chọn C.**
  - **Người chơi — "Có số liệu đây!"**: lần đầu buột miệng ở phần Phân tích, khi truy vấn đầu tiên ra kết quả, dạng lời thoại thường, không bật hiệu ứng; Minh Anh (hoặc Tùng) nhận xét câu đó. Từ deb-02 trở đi là câu hô kèm hiệu ứng QĐ-025, vẫn tối đa 2–3 lần.
  - **Hà Vy — "Khoan, đếm lại đã."**: nói khi thấy con số có vấn đề, ngay trước lúc người chơi tìm ra lỗi, tạo nhịp *Hà Vy "Khoan, đếm lại đã." → người chơi tìm ra → "Có số liệu đây!"*. Hợp tính kỹ tính, hoài nghi, tốt bụng; dạy thói quen kiểm số dòng. Châm ngôn phụ (thẻ nhân vật, lời dặn): "Kiểm hai lần, kết luận một lần."
  - Cặp đối đáp phần hài với Tùng (tuỳ chọn): Tùng "Tui cá là…" / Hà Vy "Đừng cá. Đếm."
- Loại bỏ (từ bộ gợi ý của Gemini): câu có chữ "thủ phạm" (ngược QĐ-023/024); "CSDL của tớ" (Hà Vy không biết SQL); "ấn Next" (game không có nút này); châm ngôn "dữ liệu không biết nói dối…" (trùng câu của Quân); hỏi vặn người chơi khi bấm "Hỏi Hà Vy" (gợi ý thứ hai trở đi trừ điểm, và QĐ-020 yêu cầu gợi ý nói đúng ý).
- Đã sửa theo quyết định này: GDD §3.1 (người chơi, Hà Vy), GDD §16.1 (tư thế Hà Vy), prompt `char-ha-vy-smile` trong `prompts-characters-prototype-flow-v0.1.md`.
- **Còn phải làm** (gói nội dung kế tiếp): thêm cảnh người chơi buột miệng ở phần Phân tích và chèn "Khoan, đếm lại đã." của Hà Vy (vd. trước khi người chơi chạm dòng lỗi ở deb-01) vào `docs/prototype/kich-ban-prototype.md` và `src/content/real/story/`, cập nhật test trung thành; nếu hiệu ứng hiện chân dung thì dùng ảnh người chơi nam/nữ theo lựa chọn.

**Bài học quy trình:** `preview_start` theo tên đọc `.claude/launch.json` của `main` → agent chạy nhầm server của main một phút. Từ gói 4: agent tự chạy `vite` bằng Bash ở cổng riêng rồi `navigate`, không gọi `preview_start` theo tên. Điều phối viên đếm sai "6 `[HỎI]` trong chuỗi truyện" (thật: 3 + 3 câu đọc kết quả) — agent đã đính chính.

**Ghi chú không đổi quyết định:**
- Tệp `prompts-background-prototype-v0.1.md` (bộ prompt tạo 3 ảnh cảnh nền + 1 ảnh neo phong cách) xuất hiện ở gốc repo lúc 18:33, không do agent nào tạo — coi là tài liệu của user. Gói hình/giao diện sẽ nhận ảnh nền thật theo đúng id trong tệp đó, dùng hình SVG tạm khi chưa có ảnh.
- GDD v0.5 ghi Hà Vy "không biết SQL"; prototype để Hà Vy hướng dẫn từng bước và đưa gợi ý mức 3 gần như đáp án (QĐ-021, tài liệu prototype ghi Hà Vy "gợi ý cách đọc dữ liệu"). Cần cập nhật GDD sau vòng test.
- Lời thoại viết cứng số liệu (10 người, 24 người, 40 sinh viên, 8 lớp): QĐ-010/QĐ-012 là nguồn; test dataset (gói 3) và test nội dung (gói 5) phải khẳng định các số này.

**QĐ-071 — Màn thử thách thành "bàn làm việc thám tử"; bỏ chấm đúng/sai khi chạy (QUYẾT ĐỊNH CỦA USER).** · Nguồn: USER, kèm ảnh mẫu "Phòng dữ liệu" · 27/09
- **Bố cục:** mọi thứ nằm trong một màn, không cuộn. Phần ngoài (bàn, tường, viền màn hình máy tính) là **ảnh**. Lòng màn hình dựng bằng HTML/CSS: bên trái là trình dựng truy vấn và câu SQL, bên phải là bảng kết quả, dưới cùng là khay lưu. Khi màn hình ≤ 1100 px thì bỏ ảnh, dùng giao diện phẳng (QĐ-055).
- **Manh mối là giấy note** dán quanh màn hình, dựng bằng HTML vì phải đổi theo tiến trình. Người chơi **kéo note thả vào ô giá trị** của điều kiện WHERE. Cách thay thế: bấm note rồi bấm ô cần điền, dùng cho bàn phím và những ai không kéo được. Kết quả lưu từ thử thách trước cũng thành note (ví dụ danh sách lớp tòa B ở c2 → dùng cho `IN` ở c3). Điều này bổ sung cho QĐ-017.
- **Không báo đúng/sai khi chạy** (sửa QĐ-018): chỉ hiện bảng kết quả và số dòng. Lời của Hà Vy chỉ **mô tả** kết quả đang thấy (ví dụ "Đây là cả bảng, chưa lọc gì"), không phán xét. Máy vẫn chấm ngầm (có dataset ẩn, QĐ-015/019) để ghi telemetry và dùng ở chốt soát.
- **Lưu kết quả:** nếu kết quả là một giá trị (bước trung gian tìm dữ kiện) thì người chơi **chọn đúng 1 dòng**. Nếu kết quả ra nhiều dòng thì chỉ có **"Lưu cả kết quả"**. Với nội dung hiện tại, c1, c2, c3 đều là "lưu cả".
- **Chốt soát hồ sơ trước phần Giải trình:** Hà Vy soát hồ sơ theo kiểu đối soát nghiệp vụ, so từng mục với dữ kiện ("Mục này không khớp với dữ kiện chữ ký 'H.'"), không dùng chữ đúng/sai. Nếu có mục lệch thì mở lại đúng thử thách đó. Đây là chỗ duy nhất người chơi biết mình ghi sai.
- **Hà Vy thành khung chat ở góc dưới bên phải:** bình thường thu gọn thành avatar có chấm báo tin mới. Cô ấy tự lên tiếng khi có lý do: hướng dẫn từng bước ở c1 (QĐ-021), lần đầu kéo note, người chơi ngồi yên khoảng 40 giây, hoặc chạy ra cùng một mã chẩn đoán 2–3 lần. Nút "Hỏi Hà Vy" giữ gợi ý 3 cấp (QĐ-020). Bố cục chừa sẵn chỗ để khung chat không che bảng kết quả.
- **Câu hỏi đọc kết quả (QĐ-023):** chưa đổi, xem lại khi làm gói này.
- **Hoãn:** thêm bước trung gian mới (khoa nào, khung giờ nào…) cần bảng dữ liệu mới, chỉ làm khi có nhu cầu.
- Mockup: `docs/mockups/ban-lam-viec-thu-thach.html`.

**QĐ-072 — Đổi thứ tự thử thách để người chơi thắng nhanh ngay đầu; người chơi tự ghi và dán note; Hà Vy ngồi cạnh (QUYẾT ĐỊNH CỦA USER).** · Nguồn: USER, góp ý mockup QĐ-071 · 28/09
- **Nhịp độ:** đầu game làm đơn giản để người chơi thắng nhanh, chỉ dùng `=` và `LIKE`. `IN` dời sang **vài màn ở giữa**, thiết kế sau; các màn này cũng giúp tăng thời lượng chơi.
- **Thứ tự mới:**
  - **Thử thách 1 — Lớp nào ở giảng đường B?** Hà Vy dẫn từng bước. FROM (`lop_sinh_hoat`) và SELECT (`ma_lop`) được **chọn sẵn và khóa**, người chơi chỉ làm WHERE: chọn cột `toa_nha`, phép "bằng", kéo note "B" vào → chạy → ghi thành note → dán lên tường. Ở màn này phép so sánh chỉ có "bằng".
  - **Thử thách 2 — Ai có tên bắt đầu bằng H?** Người chơi **tự làm**, dựng cả FROM, SELECT và WHERE. Hà Vy chỉ nói một câu mở đầu, còn lại chờ người chơi hỏi mới gợi ý.
  - Tiếp theo là các màn `IN` (sẽ thiết kế), rồi đến màn ghép ba manh mối.
  - Thay QĐ-021 (Hà Vy dẫn ở c1 nay áp dụng cho câu hỏi lớp tòa B) và thứ tự c1/c2 trong `docs/prototype/kich-ban-prototype.md`. Khi làm code phải sửa theo: ana-01, ana-c2-intro, câu hỏi đọc kết quả của hai thử thách, và câu "Thử thách 1 ra mười người tên H" trong phản hồi q-c3-read.
- **Ghi dữ kiện:** bấm "Ghi thành dữ kiện" → **nhân vật chính viết tay** lên một tờ note trắng, chữ hiện dần, nội dung lấy từ kết quả người chơi đã chạy (kể cả khi kết quả sai) → người chơi **kéo note dán lên tường** (hoặc bấm "Dán lên tường"). Note đã dán dùng được ở thử thách sau như các manh mối khác. Hà Vy chỉ hướng dẫn thao tác này ở lần đầu.
- **Hà Vy ngồi cạnh, không nhắn tin** (sửa ý "khung chat" của QĐ-071): lý do là cảnh Phân tích diễn ra ở `clb-room`, Hà Vy có mặt, và cả game là visual novel. Hiển thị ảnh bán thân ở góc dưới bên phải, bên ngoài màn hình máy tính, lời thoại trong bong bóng kiểu hộp thoại VN. Khi im lặng cô ấy thu xuống, chỉ còn đầu và vai; bấm vào thì mở gợi ý 1 → 2 → 3. Có một "sổ" nhỏ để xem lại các câu đã nói. Biểu cảm đổi theo tình huống (neutral / thinking / smile). Kiểu nhắn tin để dành cho cảnh có nhân vật vắng mặt.

**QĐ-073 — Vòng thử thách chính chỉ dạy WHERE + AND/OR; "Báo chí" thành ngành; Tùng đoán bừa OR ở thử thách 1 (sửa theo QĐ-074) (QUYẾT ĐỊNH CỦA USER).** · Nguồn: USER, góp ý mockup QĐ-072 · 28/09
- **Phạm vi học của vòng chính:** chỉ WHERE, `=`/`LIKE` và AND/OR. FROM và SELECT **khóa sẵn ở cả hai thử thách**. `IN` và màn ghép ba manh mối rời khỏi mạch chính, để dành cho màn phụ sau này.
- **Dữ liệu (user cho sửa thoải mái):**
  - Bookmark là của **ngành** Báo chí – Truyền thông (cột `nganh`), không còn là CLB Báo chí.
  - Bảng `lop_sinh_hoat` có thêm `BC24A` (Báo chí, tòa B) và `BC24B` (Báo chí, tòa C).
  - **Hiếu và Hoài cùng học lớp BC24A.**
  - Ở tòa B có 3 lớp (KT24A, QT24B, BC24A). Lọc `toa_nha='B' OR nganh='Báo chí'` ra 4 lớp; lọc bằng AND ra 1 lớp (BC24A).
  - Có đúng 10 người tên bắt đầu bằng H, trong đó 2 người ở BC24A.
  - Bẫy dữ liệu: Hồng (tên H) học BC24B, nên lọc `ma_lop LIKE 'BC%'` sẽ lẫn Hồng; Hồ Ngọc Mai có họ đệm bắt đầu bằng H và học BC24A.
  - Câu OR của Quân ở phần Giải trình (`ten LIKE 'H%' OR ma_lop='BC24A'`) ra 14 người.
  - Cột `clb` bỏ khỏi phần người chơi thấy.
  - Thay QĐ-010 → QĐ-013 ở những điểm trên; khi làm code phải tính lại test bất biến và dataset ẩn.
- **Thử thách 1 — Lớp nào khớp cả hộp góp ý lẫn bookmark?** Hà Vy dẫn, **Tùng có mặt** (ban đầu ghi là Quân, đã sửa theo QĐ-074):
  1. `toa_nha = 'B'` → 3 lớp. Hà Vy: "bookmark còn nói gì nữa?"
  2. Tùng chen vào, tự thêm dòng `nganh` và chọn **OR** ("Tớ cá là cứ OR vào, tòa B hoặc Báo chí"). Người chơi kéo note "Báo chí" vào rồi chạy → 4 lớp, nhiều hơn lần đầu.
  3. Tùng: "Ơ… thêm manh mối mà ra nhiều hơn? Tớ cá là máy lỗi." → Hà Vy: "Đừng cá. Đếm." và giải thích OR là thỏa bất kỳ, AND là thỏa đồng thời.
  4. Người chơi đổi sang AND → 1 lớp **BC24A**. Tùng nhận là mình đoán sai.
  5. Người chơi ghi note BC24A và dán lên tường. Tùng ngồi lại, thu gọn ở góc.
  - Hà Vy không bao giờ cố ý dẫn sai; người đoán sai là Tùng, đúng tính "hay đoán bừa".
- **Thử thách 2 — Ai tên bắt đầu bằng H trong lớp BC24A?** Người chơi **tự làm**: kéo note "H" và note "BC24A", tự chọn phép nối → 2 người (Hiếu, Hoài). Không báo đúng/sai (QĐ-071).
- **Phần Giải trình:** giữ lỗi OR của Quân (QĐ-024). Người chơi đã học AND/OR ở thử thách 1 nên tự bắt được lỗi, theo tinh thần "học rồi thì tự áp dụng".
- **Hiển thị Tùng:** ảnh bán thân ở góc dưới bên trái, trượt vào khi có thoại, có bong bóng riêng; khi im lặng thu xuống giống Hà Vy.
- Phải sửa theo quyết định này: `docs/prototype/kich-ban-prototype.md` (inv-box, clue bookmark, ana-*, c1/c2, debrief-fix, deb-01…03), `src/sql-challenge/data/*`, các mã chẩn đoán và test.

**QĐ-074 — Bộ ba Tùng, người chơi, Hà Vy; Tùng vào CLB và là người kéo người chơi vào (QUYẾT ĐỊNH CỦA USER).** · Nguồn: USER, khi chỉ ra mockup QĐ-073 đặt Quân sai vai · 28/09
- **Sự cố:** mockup QĐ-073 cho Quân ngồi trong phòng CLB, xưng "tớ" và đoán bừa OR. Sai kịch bản: Quân là người của **Ban Pháp chế – Kiểm tra Hội sinh viên**, xưng "tôi", chỉ gặp CLB lần đầu ở phần Giải trình (deb-01). Nguyên nhân: điều phối viên lấy bảng persona dán trong phiên ("Quân phụ trách trích xuất dữ liệu, hấp tấp") mà không đối chiếu kịch bản. **Bảng persona đó lệch với kịch bản ở vai Quân; kịch bản là chuẩn.**
- **Chọn:** người đoán sai OR ở thử thách 1 là **Tùng**. Quân giữ nguyên vai ở phần Giải trình; lỗi OR của Quân vẫn là khoảnh khắc chính ở đó, lúc này người chơi đã học AND/OR nên tự bắt được.
- **Bộ ba chính** (kiểu Harry Potter): **Tùng** (hay đoán bừa, vui tính, trung thành) · **người chơi** (ở giữa, tự làm và tự ghi dữ kiện) · **Hà Vy** (kỹ tính, "Khoan, đếm lại đã.", "Đừng cá. Đếm."). Minh Anh là chủ nhiệm, đứng ngoài bộ ba.
- **Tùng vào CLB và là người kéo người chơi vào.** Phải viết lại intro-00 (Tùng không còn chỉ đường rồi đi uống trà mà rủ, thậm chí lôi người chơi vào CLB) và intro-01 (số người của CLB: câu "Giờ còn ba người, tính cả cậu" phải đổi). Thay phần cameo của Tùng trong `vu-tru-chan-hung-tong-quan.md` cho dòng SQL.
- **Xưng hô của Tùng:** giữ "tớ/cậu" như intro-00. Câu cửa miệng đổi thành **"Tớ cá là…"** (QĐ-070 ghi "Tui cá là…"; chữ "tui" lệch với "tớ"). Cặp thoại với Hà Vy: Tùng "Tớ cá là…" / Hà Vy "Đừng cá. Đếm."
- Ở các màn thử thách, Tùng ngồi góc dưới bên trái, Hà Vy góc dưới bên phải; người chơi là người ngồi trước máy.

**QĐ-075 — Chuẩn hóa nội dung: một nguồn, bốn loại hội thoại, biến SQL (QUYẾT ĐỊNH CỦA USER).** · Nguồn: USER · 28/09
- **Một nguồn cho mỗi loại nội dung.** Kịch bản viết bằng Markdown theo quy ước; nhân vật, cảnh, biến, dữ liệu viết bằng YAML. Bộ đọc chạy khi build và sinh dữ liệu cho game. Bỏ các file `.ts` chép tay và test so khớp hai chiều.
- **Làm chuẩn hóa trước**, dùng nguyên nội dung hiện tại (game chạy y hệt, test xanh), rồi mới viết lại nội dung theo QĐ-071 → QĐ-074.
- **Bốn loại hội thoại:** (1) thường, có điều kiện kích hoạt (bấm vào đâu, ở cảnh nào…); (2a) lựa chọn kiểm tra hiểu, có đúng/sai, cho chọn lại; (2b) lựa chọn rẽ nhánh, không có đúng/sai, chọn là chốt, dùng để kích hoạt hoặc chia route; (3) hội thoại trong màn thử thách, gắn với sự kiện của màn truy vấn.
- **Biến SQL:** mọi con số, mã, danh sách nhắc đến trong lời thoại (cả ba loại) đều là biến, định nghĩa bằng câu SQL trên dữ liệu của lượt chơi. Dữ liệu sinh theo seed, gồm phần cố định (nhân vật truyện, các nhịp truyện) và phần đệm ngẫu nhiên (tên, mã lớp, dữ liệu gây nhiễu). Mọi ràng buộc được viết bằng SQL; khi build, máy chạy thử nhiều seed và kiểm tra hết.
- **Tạm dùng một seed cố định** (QĐ-032 vẫn gác phần ngẫu nhiên cho người chơi); bật ngẫu nhiên sau.
- Đặc tả: `docs/dac-ta-dinh-dang-noi-dung.md`.

*Ghi chú đánh số (28/09, khi gộp nhánh `claude/visual-novel-github-projects-053457` vào main): hai quyết định dưới đây được viết song song với QĐ-070 → QĐ-075 và mang số cũ QĐ-070 (sửa bộ VN) và QĐ-071 (phạm vi MVP), trùng số đã có; đổi thành QĐ-076 và QĐ-077, nội dung giữ nguyên.*

**QĐ-076 — Rà và sửa bộ tính năng Visual Novel của commit `fa5ffd3`.** · Nguồn: user yêu cầu rà lỗi sau commit "feat(vn)…" · 27/09 16:45
- Bối cảnh: commit thêm Auto/Skip/Lịch sử thoại/Ẩn giao diện/Lưu–Nạp nhiều ô/âm thanh tổng hợp/màn giới thiệu nhân vật/bản đồ trường. Test xanh nhưng khi chạy có 7 lỗi hành vi (chữ hiện dần bị kéo lùi; Skip đứng sau một câu vì đi qua bộ chống bấm đúp; Auto/Skip chạy ngầm sau lớp phủ; phím H không hiện lại giao diện; ô lưu thiếu slice `challenges`; ô lưu ở localStorage trộn phiên người thử; nhạc nền không bao giờ phát).
- **Chọn:**
  - Ô lưu, danh sách thoại đã đọc và nhân vật đã giới thiệu nằm trong **sessionStorage**, cùng chỗ với tiến độ (giữ QĐ-004); "Chơi lại từ đầu" xóa hết (cùng lúc với phiên telemetry mới). Ô lưu chụp đủ `progress + evidence + challenges`, có `version` = `STORE_VERSION`.
  - **Skip chỉ tua thoại đã đọc** và tự tắt ở câu hỏi/thử thách/xem xét (chuẩn VN; không để người mới lỡ manh mối). Auto/Skip tạm dừng khi có lớp phủ.
  - Tốc độ chữ (Chậm/Vừa/Nhanh/Hiện ngay) nằm trong hộp **Cài đặt** cùng âm thanh; là tùy chọn cá nhân nên lưu localStorage như cài đặt âm thanh.
  - Màn giới thiệu nhân vật dùng cùng ô ảnh + tách nền của chân dung (bỏ `fullArtPath` trỏ tới tệp không tồn tại, đường dẫn `/src/…` hỏng khi build); chờ ảnh sẵn sàng rồi mới mờ vào, không phóng 1,35 lần (cắt mất đầu).
  - Telemetry thêm 5 sự kiện (`vn_mode_toggled`, `backlog_opened`, `text_speed_changed`, `progress_saved`, `progress_loaded`); tóm tắt phiên có mục `vn` và cờ `loadedSave` (có nạp ô lưu → thời lượng không so trực tiếp). Nút "Hồ sơ" trong hộp thoại giờ cũng ghi `notebook_opened` (trước đó đếm thiếu chỉ số §10).
- **User quyết (27/09 17:10): GIỮ bản đồ trường và Lưu/Nạp nhiều ô** (ngoại lệ có chủ đích của QĐ-032; hướng tới bản MVP). Trước đó: commit đưa vào **bản đồ trường** và **Lưu/Nạp nhiều ô** — cả hai nằm trong danh sách "không làm" (QĐ-032, §8 tài liệu phạm vi). Đã giữ nguyên (chỉ sửa lỗi), cần user xác nhận giữ hay tắt trước vòng thử nghiệm 1. Chuỗi mở đầu mới `intro-00` (Tùng dẫn đi) nhắc "khu B" hai lần trước khi manh mối "tòa B" xuất hiện — có thể làm người chơi lẫn; cần user xem lại lời thoại.

**QĐ-077 — Phạm vi bản MVP.** · Nguồn: user · 27/09 17:20
- **Nội dung:** tuần 1 (đêm đầu KTX, Tùng dẫn đi khắp trường, ngày hội CLB) + Vụ 1 đủ 4 buổi (Nhận vụ, Điều tra I, Điều tra II, Giải trình theo `vu1-buoi-giai-trinh-kich-ban.md`). Kịch bản mới do agent viết theo GDD §4, §5, §14; **user không duyệt trước** — xem lại khi chơi thử.
- **Tính năng:** bản đồ đi lại được; tạo nhân vật (tên, ngành, nam/nữ; nút "Ngẫu nhiên"; không thu thông tin thật, không ghi tên vào telemetry); thanh uy tín 5 vạch khi giải trình (hết vạch → hoãn, quay lại điều tra, không mất tiến độ); mode SQL thuần + xếp hạng S/A/B/C. Giữ Lưu/Nạp và bản đồ (QĐ-076).
- **Dữ liệu cố định**, không mã đề: Hoài/SV240317/QT24B, chữ H, tòa B, Báo chí–Văn học (như prototype). Kiến trúc để chỗ cho biến mã đề sau MVP.
- **Hardcore mở SAU Vụ 1** như GDD (thầy Khải kiểm tra). Đề xuất của điều phối viên (chưa được user xác nhận): màn kết cho "Chơi lại Vụ 1 ở mode Hardcore" để người chơi dùng được mode này.
- **Mục đích:** vẫn là thử nghiệm người chơi trên laptop — giữ khảo sát, telemetry, bảng người quan sát; QĐ-028 giữ nguyên.
- Thay đổi so với §8 tài liệu phạm vi / QĐ-032: bản đồ, tạo nhân vật, Hardcore, thanh uy tín, xếp hạng chuyển từ "không làm" thành "làm" cho MVP. Mã đề, Blockly, trang phục, mini game, mobile-first vẫn "không làm".
- Chia gói (theo `/giao-viec`, mỗi lúc một agent): 1 `kien-truc-mvp` (Fable) → 2 `kich-ban-mvp` (Opus) → 3 `noi-dung-mvp` (Opus) → 4 `giai-trinh-uy-tin` (Fable) → 5 `tao-nhan-vat` (Opus) → 6 `ban-do-di-lai` (Opus) → 7 `hardcore-xep-hang` (Opus) → 8 `hinh-mvp` (Opus).

**QĐ-078 — Sắp xếp lại thư mục repo.** · Nguồn: user yêu cầu hệ thống lại cấu trúc thư mục · 28/09
- **Chọn:** gốc repo chỉ còn `README.md` (bản đồ repo) và ba thư mục: `docs/` (tài liệu sản phẩm), `art/` (nguồn ảnh), `prototype/` (code). Chỉ di chuyển, **không đổi tên** tài liệu, nên các chỗ nhắc tên tệp trong sổ này vẫn tìm được.
  - `docs/thiet-ke/`: `vu-tru-chan-hung-tong-quan.md`, `clb-tham-tu-du-lieu-GDD-v0.5.md`, `vu1-buoi-giai-trinh-kich-ban.md`.
  - `docs/prototype/`: `prototype-scope-down-v0.1.md`, `kich-ban-prototype.md`, `kich-ban-de-xuat-full.md`.
  - `docs/` giữ tệp dùng chung: sổ này, `dac-ta-dinh-dang-noi-dung.md`, `mockups/` (thêm `sql-table-draft.html`, chuyển từ `prototype/public/` vì tệp nháp này bị đóng gói vào bản build).
  - `art/prompts/`: sáu bộ `prompts-*.md`; `art/nguon/`: ảnh gốc Topview (trước ở `prototype/art-src/`). `art/README.md` ghi trạng thái từng bộ prompt.
  - Nhật ký của Antigravity: `.agent/changelog.md` (bản đủ) chuyển thành `prototype/docs/nhat-ky-thay-doi-2026-09-27.md`; `.agents/changelog.md` là bản cũ hơn, thiếu mục 5–6, nên đã xóa.
- Đã sửa theo: đường dẫn `docs/kich-ban-prototype.md` → `docs/prototype/kich-ban-prototype.md` trong code, test (`faithfulness.test.ts`) và tài liệu; phần đầu các tài liệu dẫn sang nhau; `prototype/README.md`, `ARCHITECTURE.md`, `src/assets/art/README.md`; skill `google-flow-image` (`--file art/prompts/…`). Link `file:///` tuyệt đối trong bộ prompt nhân vật đổi thành link tương đối.
- Không đụng `prototype/src/` ngoài chú thích đường dẫn: cấu trúc code đã theo tính năng, và sắp có các gói MVP (QĐ-077) sửa vào đó.

**QĐ-079 — Kế hoạch gói chuẩn hóa nội dung, bước 1 của QĐ-075 (USER CHỐT 28/09, xem QĐ-088).** · Nguồn: điều phối viên, khảo sát code 28/09 · 28/09
- Kế hoạch đầy đủ: `docs/ke-hoach-goi-chuan-hoa.md`. Mục tiêu: chuyển nội dung hiện tại sang `prototype/noi-dung/` làm nguồn duy nhất, bộ đọc sinh dữ liệu cho game, xóa khoảng 1.600 dòng chép tay. Không đổi chữ nội dung nào; game chạy y hệt, test xanh.
- **Ba phát hiện làm đổi kế hoạch:**
  1. Màn chiếu chạy SQL (deb-01, deb-03), đặt cờ hết quyền truy cập, chú thích thẻ hồ sơ (end-03), thẻ chữ lớn (end-04) chỉ có trong bản chép tay; kịch bản chỉ tả bằng lời trong `[DÀN DỰNG]`. Phải thêm cú pháp máy đọc được.
  2. Runtime chưa có kích hoạt, cờ tùy ý, bộ đếm. Đổi sang `[KÍCH HOẠT]` ngay ở bước 1 là phải sửa runtime, trái mục tiêu "chạy y hệt".
  3. Worktree mới không có `node_modules`: gói đầu phải cài phụ thuộc và chạy test lấy mốc trước khi sửa.
- **Chia 4 gói, tuần tự (QĐ-057):** 12a-1 `bo-doc` (Opus) → 12a-2 `sinh-noi-dung` (Opus) → 12b `nhan-vat-canh` (Opus, đụng tệp đóng băng `ids.ts`, cần QĐ riêng khi giao) → 12c `du-lieu-yaml` (Sonnet). Đợt sau: 13 runtime `[KÍCH HOẠT]`/cờ/`[RẼ NHÁNH]` · 14 biến SQL, seed, ràng buộc · 15 màn thử thách mới · 16 viết lại nội dung.
- **Chờ user chốt** (khuyến nghị của điều phối viên in đậm):
  1. Cách sinh dữ liệu: **A. sinh file `.gen.ts` và commit** (tsc, test, editor chạy ngay, giữ kiểm kiểu) · B. plugin Vite sinh module ảo · C. sinh JSON, kiểm lúc chạy.
  2. Điều chỉnh mục 15 của đặc tả: **bước 1 vẫn nhận `[ĐIỂM XEM XÉT]`, `[ĐIỀU KIỆN QUA]`, `[KHI ĐÚNG]`, `[KHI: mã]`; chuyển sang cú pháp mới ở đợt 13.**
  3. Model từng gói như trên.
  4. **Tên nhân vật thành biến, tham chiếu bằng mã** (thêm 28/09 theo trao đổi với user về việc đổi tên nhân vật):
     - **Lời thoại và giao diện không viết tên cứng**: dùng `{{nv.<mã>}}` (có dạng, vd `{{nv.ha-vy.ho-ten}}`), tên lấy từ một nguồn. Lý do: màn tạo nhân vật (QĐ-077) đằng nào cũng cần biến tên người chơi; đúng tinh thần QĐ-075; đổi tên sau này chỉ sửa một chỗ (hiện đổi tên Hà Vy phải sửa 33 tệp code).
     - **Giữ mã hiện tại** (`ha-vy`, `quan`, `tung`…) làm khóa, **không đổi mã khi đổi tên**. Không thay bằng mã vai trò (`tro-thu`, `rival`…) vì vai hay đổi (QĐ-074 vừa đổi vai Tùng, Hà Vy) và khác nhau giữa các dòng game. Vai là trường thông tin `vai:`, không phải khóa.
     - **Vai trong vụ án thì đặt theo vai**: nhân chứng, người vô can, người viết thư là dòng dữ liệu, tên có thể đổi theo seed ở đợt 14, nên lời thoại gọi `{{vu1.nhan-chung.ten}}` (code đã có hằng `WITNESS`, `INNOCENT`).
     - Tài liệu thiết kế, sổ QĐ, mockup, prompt ảnh vẫn viết tên người; `nhan-vat.yaml` là nguồn chuẩn về tên. Khi làm phải chốt họ tên đầy đủ đang lệch: Minh Anh "Nguyễn" (GDD, prompt) / "Lê" (hồ sơ trong game); Hà Vy "Lê" (GDD, prompt) / "Trần" (đặc tả, hồ sơ trong game).
     - Chia việc: 12a-1 thêm cú pháp và bộ đọc tự thay biến (test so khớp vẫn xanh) → 12a-2 thay tên bằng biến trong `noi-dung/` và chữ viết cứng ở giao diện ("Hỏi Hà Vy") → 12b chuyển nguồn tên sang `nhan-vat.yaml` → đợt 14 biến vai vụ án. Không làm trên bản chép tay `.ts` vì 12a-2 xóa chúng.
- **Khi chốt phải sửa:** mục 15 và 17 của `docs/dac-ta-dinh-dang-noi-dung.md` (câu 4: thêm mục về biến tên nhân vật và vai vụ án vào mục 10, do gói 12a-1 viết), dòng trạng thái của `docs/ke-hoach-goi-chuan-hoa.md`, và mục này (bỏ chữ "CHỜ USER CHỐT", ghi phương án được chọn).

**QĐ-080 — Đổi tên trường thành Đại học Chấn Hưng; sổ tay chị Linh là trang tra cứu; Hà Vy chỉ dạy bằng ẩn dụ toán; Tùng lo bản đồ và lịch; Minh Anh giao vụ và mở địa điểm (QUYẾT ĐỊNH CỦA USER).** · Nguồn: USER, sau hai phiên hội đồng (`~/.claude/hoi-dong/sessions/20260928-1204-ten-truong-vai-nhan-vat`, `…-1222-doi-ten-truong-linh-remotion-bo-ba`) · 28/09
- **Tên trường: Trường Đại học Chấn Hưng** (hợp tinh thần "vươn mình"; tra web không thấy trường trùng). Tên trường là **biến** trong nội dung, ít nhất hai dạng: `ten-day-du` ("Trường Đại học Chấn Hưng") và `ten-ngan` ("Chấn Hưng"). Đã loại: Hoa Phượng (gợi cấp 3, trùng tên nhiều trường mầm non); Bắc Hà, Đại Việt, Phương Đông, Đại Nam, Thăng Long, Quang Trung (trùng trường thật); Lam Sơn (trường THPT chuyên nổi tiếng); "Đa khoa" (nghe như bệnh viện); Khai Nguyên (dễ nghe nhầm "Thái Nguyên"). Hàng phượng ở cổng trường vẫn giữ được như một chi tiết khuôn viên.
- **Sổ tay chị Linh:**
  - Người chơi **tìm thấy khi dọn phòng CLB ở đầu Vụ 1** (trên mạch chính); Minh Anh cho giữ ("sổ của chị Linh, em cứ giữ"). **Mỗi vụ mở thêm trang qua lời nhắn của chị Linh**, nối với bí ẩn của mùa. Trang rải rác quanh trường chỉ là mẹo phụ, **không chứa cú pháp bắt buộc**.
  - Sổ là **trang tra cứu kiểu cheatsheet**, chia theo từ khóa bằng nhãn giấy nhớ; người chơi lật thoải mái các trang đã có. Nhân vật chính là người **tự học**.
  - **Không đếm số lần mở sổ làm cơ chế**: bỏ gợi ý 3 cấp "Hỏi Hà Vy" (thay QĐ-020 và phần gợi ý của QĐ-021/072); xếp hạng S/A/B/C bỏ tiêu chí "số gợi ý đã dùng" (GDD §5.2, kịch bản Vụ 1), chỉ còn uy tín và chế độ chơi.
  - **Khi chạy sai**, nhãn giấy nhớ ở trang liên quan của sổ sáng lên; không nhân vật nào phán. Mã chẩn đoán (QĐ-040) giữ nguyên để chọn trang và ghi telemetry; lời nhận xét chuyển từ giọng Hà Vy thành chữ trong sổ. Hà Vy chỉ lên tiếng khi con số bất thường (nói bằng ngôn ngữ đếm, không nói cú pháp).
- **Hà Vy — chuyên toán, không giải thích cú pháp SQL.** Cô diễn giải bằng **ẩn dụ toán học qua một đoạn tương tác trong game** (vd hai vòng tròn giao – hợp cho AND/OR), rồi **hỏi một câu kiểm tra hiểu ngay sau phần giải thích** (vd "khối nào là AND?"; loại 2a, cho chọn lại) — đặt trong cảnh hội thoại sau lời giải thích, không phải lời phán kết quả truy vấn. Vẫn giữ soát hồ sơ trước giải trình (so dữ kiện, không phải cú pháp) và câu "Khoan, đếm lại đã." / "Đừng cá. Đếm.".
- **Tùng — bám sát người chơi**: ở chung CLB, đi ăn đi học cùng; **cơ chế chính: chỉ dẫn trên bản đồ, nhắc lịch và nhiệm vụ**. Giữ tính hay đoán bừa ("Tớ cá là…"), vẫn là người chọn OR sai ở thử thách 1 để mở tình huống (QĐ-073/074). **Không tra sổ hộ người chơi.**
- **Tùng và Hà Vy không ngồi cạnh màn thử thách nữa** (thay phần bố cục của QĐ-072/073): hai người xuất hiện theo kịch bản (cảnh hội thoại, sự kiện trong màn thử thách), màn hình dành cho bàn làm việc và sổ tay.
- **Minh Anh — giao vụ; dẫn người chơi đi gặp thầy cô / người quản lý dữ liệu mới, qua đó mở địa điểm mới trên bản đồ** (Minh Anh mở, Tùng dẫn đường trong chỗ đã mở). Ở giải trình: **thể hiện cảm xúc theo thanh uy tín và bảo vệ người chơi** (trấn an, kéo tranh luận về đúng câu hỏi), chỉ nói trước/sau lượt người chơi, không nói thay kết luận, không cứu điểm uy tín.
- **Chưa chốt** (để lượt sau): tên chuỗi "Vũ trụ Hoa Phượng" giữ hay đổi; Remotion chỉ dùng xuất MP4 ra ngoài hay bỏ (trong game dùng đoạn tương tác của Hà Vy, không nhúng trình phát video); chị Linh có giọng kể không; xưng hô của Hà Vy ("mình" theo QĐ-022 hay "tớ" theo đặc tả) và của người chơi; có ghi lặng lẽ số lần mở sổ vào telemetry để nghiên cứu không.
- **Phạm vi áp dụng:** nội dung và giao diện mới làm ở đợt 15–16 và các gói MVP (QĐ-077). Prototype vòng 1 đang chạy giữ nguyên cho tới khi có gói sửa; chuẩn hóa 12a vẫn "không đổi chữ" (QĐ-079).
- **Phải sửa theo:** GDD §3.1 (Tùng, Hà Vy, sổ tay chị Linh), §5.1 (Tùng nhắc khi loay hoay → giữ), §5.2 (xếp hạng bỏ gợi ý); tài liệu vũ trụ (tên trường, bảng nhân vật §5, câu cửa miệng §7); kịch bản Vụ 1 (hạng S "không dùng gợi ý"); đặc tả §4 (`nhan-vat.yaml`: vai, `khong-bao-gio` của Hà Vy, Tùng, Minh Anh), §7 (câu kiểm tra hiểu của Hà Vy), §9 (bỏ gợi ý 3 cấp, sự kiện bật trang sổ), §16.1 (ví dụ c1); thêm biến `{{truong.*}}` vào kế hoạch 12a-1; mockup màn thử thách; khi làm code: `HaVyPanel`, sự kiện telemetry đếm gợi ý, lời chẩn đoán trong `challenges.ts`, 4 chỗ tên trường trong code, id ảnh `hoa-phuong-environment-style-anchor`.

**QĐ-081 — Bộ ba cùng năm 1, mỗi người giỏi một thứ; tên nhân vật phụ kiểu miền Bắc; phản biện ở giải trình dẫn trang sổ tay (kiểu *King of the Bridge*); bỏ nhãn sổ sáng khi chạy sai (QUYẾT ĐỊNH CỦA USER).** · Nguồn: USER, sau phiên hội đồng `~/.claude/hoi-dong/sessions/20260928-1257-so-tay-mo-khoa-xung-ho-cau-cua-mieng` (lần đầu có Gemini Pro) · 28/09
- **Hà Vy lên năm 1** (ngành Toán ứng dụng). Lý do của user: sinh viên toán học một năm mà không biết tí code nào thì khó tin; năm 1 thì "chưa học SQL" là tự nhiên. Bộ ba Tùng – người chơi – Hà Vy **cùng năm 1, xưng "tớ – cậu"** (thay phần Hà Vy của QĐ-022). Minh Anh, Quân (năm 3) vẫn là "chị", "anh" với cả ba.
- **Mỗi người trong bộ ba giỏi một thứ**, khớp ba mảng lối chơi của GDD §9:
  - **Tùng — tìm kiếm trên bản đồ**: chỉ đường, nhắc lịch và nhiệm vụ (QĐ-080), và là người giúp khi người chơi loay hoay tìm điểm xem xét (nút "hiện điểm có thể xem xét" của GDD §9 gắn với Tùng).
  - **Người chơi — tin học**: giỏi Excel, máy tính; vẫn học ngành kinh tế, không học IT (giữ nguyên tắc chung của chuỗi game).
  - **Hà Vy — logic toán học**: ẩn dụ toán, câu kiểm tra hiểu, soát hồ sơ (QĐ-080).
- **Câu cửa miệng của Hà Vy: "Khoan, tính lại đã."** (thay "Khoan, đếm lại đã." của QĐ-070).
- **Người chơi không ghi vào sổ tay.** Người chơi ghi **giấy nhớ theo từng nhiệm vụ** (cơ chế "ghi thành dữ kiện, dán lên tường" của QĐ-071/072). Bỏ ý "tem đúc kết dán lề sổ".
- **Bỏ nhãn sổ sáng lên khi chạy sai** (thay điểm này của QĐ-080). Lý do: sáng lên là ngầm báo "sai", trái nguyên tắc không báo đúng/sai; *King of the Bridge* cho thấy tự tìm đúng điều luật mới là phần thỏa mãn. Sổ có **mục lục nhãn theo từ khóa**, người chơi **tự tra**. Mã chẩn đoán (QĐ-040) vẫn chạy để ghi telemetry và để Hà Vy lên tiếng khi con số bất thường; lời nhận xét viết sẵn theo từng mã không còn hiện cho người chơi.
- **Phản biện ở buổi giải trình theo kiểu *King of the Bridge*:** người chơi chỉ **dòng sai** trong truy vấn của Quân **và lật đúng trang sổ tay chứa quy tắc bị vi phạm** (vd trang AND/OR) rồi hô "Có số liệu đây!". Sai một trong hai thì mất 1 vạch uy tín như hiện nay. Sổ tay thành "bộ luật" để dẫn chứng; người chơi phải tra sổ trước khi cáo buộc.
- **Tên nhân vật phụ theo kiểu miền Bắc** (gọi kèm tên, không gọi theo thứ trong nhà):
  - **Bác Tư → bác Thịnh**, **bảo vệ giảng đường B** (khớp ảnh `char-bac-tu-neutral` đã vẽ: nam 55 tuổi, bảo vệ; kịch bản cũ ghi "lao công" sẽ sửa khi viết lại).
  - **Chú Bảy → chú Cường**, bảo vệ KTX, chú ruột của Tùng.
  - Mã nhân vật `bac-tu` giữ nguyên, chỉ đổi tên hiển thị (QĐ-079 câu 4). "Thịnh", "Cường" không trùng tên nào trong 40 + 8 dòng dữ liệu và không bắt đầu bằng H; khi làm code phải thêm hai tên này vào danh sách cấm của test QĐ-014.
- **Chưa chốt** (để lượt sau): cách mở khóa trang sổ (hội đồng đề xuất: sổ đủ trang từ đầu, chương chưa học bị chị Linh kẹp lại kèm lời dặn, người chơi tự tháo khi vụ cần; lời nhắn của chị Linh chỉ lo bí ẩn mùa); câu đáp Tùng "Đừng cá. Đếm." giữ hay đổi thành "Đừng cá. Tính."; câu cửa miệng của Minh Anh, thầy Quang, thầy Khải, chị Linh (đề xuất trong phiên hội đồng); sổ in ra để ôn (mục đích, có phụ lục giấy nhớ cá nhân không); các điểm còn treo của QĐ-080.
- **Phải sửa theo:** GDD §3.1 (Hà Vy năm 1, kỹ năng bộ ba), §3.3 và §16.1 (bác Tư → bác Thịnh bảo vệ, chú Bảy → chú Cường), §5.2 (phản biện dẫn trang sổ), §9 (nút hiện điểm xem xét gắn Tùng); tài liệu vũ trụ §5 (bảng nhân vật: Hà Vy, chú Cường) và §7 (giọng Hà Vy); kịch bản Vụ 1 (buổi giải trình); đặc tả §4 (`nhan-vat.yaml`: Hà Vy năm 1, xưng hô, câu cửa miệng; thêm bác Thịnh, chú Cường), §9 (bỏ sự kiện bật trang sổ, bỏ lời chẩn đoán hiện cho người chơi); prompt ảnh (Hà Vy "năm 2", tên Bác Tư); khi làm code: `display-names.ts`, `character-profiles.ts`, lời chẩn đoán trong `challenges.ts`, test QĐ-014, màn chọn dòng lỗi ở giải trình (thêm bước chọn trang sổ).

**QĐ-082 — Chia nội dung theo hậu quả; bài học hoa thường là tư duy dữ liệu; buổi phản biện 5 nhịp; câu hô "Số liệu đây!" (QUYẾT ĐỊNH CỦA USER).** · Nguồn: USER, sau phiên hội đồng `~/.claude/hoi-dong/sessions/20260928-1346-phan-bien-giai-trinh-mach-chinh-side-que` · 28/09
- **Tiêu chí chia nội dung** (thay cách chia "mạch chính = cú pháp mới, nhiệm vụ phụ = bẫy áp dụng"):
  - **Mạch chính:** kiến thức cần để phá án vụ này, hoặc sẽ được coi là người chơi đã biết ở các vụ sau.
  - **Nhiệm vụ phụ / minigame:** biến thể, tinh chỉnh, mẹo nâng cao; bỏ qua không ảnh hưởng tới việc hiểu vụ này và các vụ sau.
- **Hoa thường.** Kiểm trên SQLite (sql.js) của game ngày 28/09: `=` phân biệt hoa thường; `LIKE` bỏ qua hoa thường **chỉ với chữ không dấu** (`LIKE 'hoài'` khớp "Hoài", "hoài", không khớp "HOÀI"; `LIKE 'đ%'` không khớp "Đức"); `lower('HOÀI')` ra "hoÀi"; `COLLATE NOCASE` cũng không khớp chữ hoa có dấu; `LIKE '%oài'` khớp cả "Toài". Vì dễ dạy sai:
  - **Mạch chính chỉ dạy tư duy dữ liệu:** "`=` so khớp chính xác từng ký tự; dữ liệu nhập tay có thể viết khác; ra 0 dòng thì kiểm lại dữ liệu trước khi kết luận". Không dạy "SQL phân biệt hoa thường" như luật chung.
  - **Sắc thái `LIKE` và chữ có dấu** để nhiệm vụ phụ nâng cao, luôn ghi rõ "trong SQLite"; các hệ quản trị khác mỗi nơi một kiểu.
  - Dữ liệu của mạch chính viết hoa thường **nhất quán**, trừ vụ cố ý dạy bài học trên.
- **Buổi phản biện 5 nhịp** (thay bước "lật trang sổ tay" của QĐ-081; phần "phản biện 2 bước" chính là nhịp 1–2):
  0. **Quân nói lập luận sai bằng lời** (vd "tôi lấy những ai thỏa một trong hai điều kiện…"), rồi chiếu truy vấn.
  1. Người chơi **chỉ dòng sai** — đây là cáo buộc; chạm sai mất 1 vạch uy tín (MVP).
  2. Người chơi **sửa và chạy lại** trên màn chiếu → "Số liệu đây!". Chạy thử không phạt.
  3. **Hà Vy gọi tên lỗi bằng ngôn ngữ toán**, không hỏi, không chấm (vd "cậu vừa đổi phần hợp thành phần giao") — giữ từ vựng để nhận ra lỗi cùng loại ở vụ sau.
  4. Câu đọc kết quả, viết lại cho rõ: **"Theo điều kiện trên màn hình, hai dòng này là ai?"** (thay "Hai dòng này nghĩa là gì?").
  5. Thầy Quang: **"Vậy hai bạn này là thủ phạm?"** → đáp đúng: yêu cầu nguồn xác minh độc lập (giữ nội dung câu `q-verify` của QĐ-024).
  - Nhịp 4–5 là hai câu đo của vòng thử nghiệm: ghi **lựa chọn đầu tiên**, cho chọn lại. **Chưa chốt:** chọn sai ở nhịp 4–5 có trừ uy tín không.
- **Luật viết nội dung cho buổi phản biện** (thêm vào đặc tả §14, bộ đọc kiểm được):
  - Mỗi buổi giải trình **một lỗi chính** của đối thủ.
  - Lỗi đó người chơi **đã gặp và tự sửa trước** (trong Điều tra I/II của vụ, hoặc vụ trước); không dùng kiến thức chưa dạy hay mặc định của hệ quản trị khác.
  - Truy vấn của đối thủ **chạy được**, chỉ sai logic; kết quả trước và sau khi sửa **lệch rõ**.
  - Đáp án mỗi câu hỏi **kiểm bằng cách chạy trên dữ liệu vụ**, có đúng một phương án đúng; câu hỏi nói rõ đọc cái gì (điều kiện, số dòng, hay ý nghĩa các dòng); phương án sai phản ánh hiểu lầm có thật, không đánh đố.
- **Câu hô của người chơi: "Số liệu đây!"** (thay "Có số liệu đây!" của QĐ-070/QĐ-025) — ngắn, ba âm như "Objection!". Mã hiệu ứng `co-so-lieu-day` giữ nguyên, chỉ đổi chữ hiển thị.
- **Phải sửa theo:** GDD §3.1 (câu hô), §5.2 (buổi giải trình); tài liệu vũ trụ §3 (câu hô dòng SQL); kịch bản Vụ 1 (buổi giải trình, câu hô); kịch bản prototype deb-02, deb-03 (câu hô, câu hỏi đọc kết quả — kèm bản chép tay và test so khớp, làm ở đợt viết lại); đặc tả §9/§14; khi làm code: `EFFECT_NAMES` trong `display-names.ts`, `ObjectionEffect`, `effect-timing.ts`, `app.css`, các test nhắc chữ cũ, `ending.ts`, `debrief.ts`.

**QĐ-083 — Trừ uy tín ở buổi phản biện, Minh Anh giải cứu; sổ cá nhân chép dần từ sổ chị Linh (QUYẾT ĐỊNH CỦA USER).** · Nguồn: USER, sau các trao đổi về sổ tay và QĐ-082 · 28/09
- **Uy tín ở buổi phản biện 5 nhịp (QĐ-082):** trừ 1 vạch khi **chạm sai dòng (nhịp 1)**, khi **chọn sai câu đọc kết quả (nhịp 4)** và khi **chọn sai câu "Vậy hai bạn này là thủ phạm?" (nhịp 5, kết luận vội)**. Chạy thử (nhịp 2) không phạt. Hết vạch thì hoãn buổi, quay lại điều tra, không mất tiến độ (QĐ-077). Telemetry vẫn ghi **lựa chọn đầu tiên** của nhịp 4–5.
- **Mỗi lần mất vạch, Minh Anh đổi sắc mặt và giải cứu:** xin hội đồng cho người chơi làm lại (chạm lại, chọn lại) hoặc nói đỡ cho câu trả lời sai. Đây là cơ chế của Minh Anh ở buổi giải trình (QĐ-080/081: thể hiện cảm xúc, bảo vệ người chơi). Minh Anh **không hoàn lại vạch** và **không nói thay đáp án**.
- **Sổ tay: hai cuốn.**
  - **Sổ chị Linh**: có đủ nội dung từ đầu, là tài sản CLB, để ở phòng CLB. Minh Anh trao cho người chơi xem ở cảnh dọn phòng CLB đầu Vụ 1 (QĐ-080). Sổ **chỉ hiện qua hoạt cảnh**: mỗi lần tra, một trang sổ viết tay phóng to lên màn hình rồi đóng lại (dùng lại thành phần `DocumentReveal`), **không có giao diện lật sổ riêng**.
  - **Sổ cá nhân** của người chơi: cuốn duy nhất có giao diện; lớn dần theo những gì người chơi đã học. Không có chuyện "trang tự mở": sổ chị Linh đủ nội dung, sổ cá nhân chỉ có những gì đã chép. (Giải câu hỏi "mở khóa trang" còn treo ở QĐ-081.)
- **Chép sổ = câu kiểm tra hiểu của Hà Vy.** Khi vụ án phát sinh nhu cầu dùng cú pháp mới: Tùng gợi ý tra sổ chị Linh → hiện trang sổ → Hà Vy diễn giải bằng ngôn ngữ toán (vd "phần giao của hai vòng tròn") → người chơi **chọn đoạn code khớp** trong 2–3 đoạn viết bằng dữ liệu của vụ → đoạn đúng vào sổ cá nhân, kèm câu ẩn dụ của Hà Vy làm chú thích. Chọn sai: Hà Vy đáp bằng toán, chọn lại; không phạt, không đếm. (Thay cách viết "hỏi một câu kiểm tra hiểu sau phần giải thích" của QĐ-080.)
- **Khi người chơi bí**, Tùng gợi ý "hay mở sổ chị Linh ra tra đi" — hoạt cảnh hiện trang **"điểm tâm đắc / lỗi thường gặp"** của chị Linh, không phải trang cú pháp. Tùng chỉ gợi ý, không tra hộ (QĐ-080). Máy biết người chơi bí nhờ thời gian đứng yên hoặc mã chẩn đoán lặp lại; không hiện gì, không đếm.
- **Người chơi không viết vào sổ chị Linh** (làm rõ QĐ-081). Giấy nhớ theo từng nhiệm vụ cuối vụ được **đính vào sổ cá nhân**.
- **Sổ in ra để ôn chính là sổ cá nhân** (xuất từ trình duyệt; gồm các trang đã chép, giấy nhớ, lỗi mình từng gặp; không in dữ liệu hay lời giải vụ án). Bản sổ chung để bán hoặc tặng trường làm sau.
- **Lời nhắn chị Linh mỗi vụ chỉ dẫn bí ẩn của mùa**, không còn dùng để mở trang sổ (thay câu "mỗi vụ mở thêm trang qua lời nhắn" của QĐ-080).
- **Ở buổi giải trình**, sổ cá nhân chỉ là chỗ người chơi tự mở ra xem lại, không bắt chọn trang (QĐ-082).
- **Còn treo:** tên "Vũ trụ Hoa Phượng"; Remotion chỉ dùng xuất MP4 hay bỏ; chị Linh có giọng kể không; có ghi lặng lẽ số lần mở sổ vào telemetry không; câu đáp Tùng "Đừng cá. Đếm." hay "Đừng cá. Tính."; câu cửa miệng của Minh Anh, thầy Quang, thầy Khải, chị Linh; thứ tự ưu tiên khi tài liệu mâu thuẫn (dòng 11 của sổ này).

**QĐ-084 — Họ tên, câu cửa miệng, thứ tự ưu tiên tài liệu, câu hỏi tạo nhân vật, Remotion, tên vũ trụ (QUYẾT ĐỊNH CỦA USER).** · Nguồn: USER, trả lời các điểm còn treo của QĐ-080 → QĐ-083 · 28/09
- **Họ tên:** **Lê Minh Anh**, **Trần Hà Vy** (khớp hồ sơ nhân vật đang có trong game; GDD và prompt ảnh cũ ghi "Nguyễn Minh Anh", "Lê Hà Vy" — prompt là bản ghi, không sửa).
- **Câu cửa miệng** (chốt bảng đề xuất ở phiên hội đồng `…-1257-so-tay-mo-khoa-xung-ho-cau-cua-mieng`):
  - Người chơi: "Số liệu đây!" (QĐ-082) · Tùng: "Tớ cá là…" · Hà Vy: "Khoan, tính lại đã." (QĐ-081), đáp Tùng: **"Đừng cá. Tính."** (thay "Đừng cá. Đếm.").
  - Minh Anh: **"Nói có sách, mách có chứng."** — dùng đúng thành ngữ, không sáng tạo thêm (thay "Rồi, việc hôm nay là…").
  - Quân: "Dữ liệu không nói dối. Nhưng người đọc dữ liệu thì có." (dùng thưa) · Thầy Quang: **"Căn cứ vào đâu?"** · Thầy Khải: **"Máy chạy đúng cái em viết, chứ không chạy cái em nghĩ."** · Chị Linh: châm ngôn ở trang đầu sổ **"Kiểm hai lần, kết luận một lần."**, cuối lời nhắn có thể thêm "Đừng vội tin một con số." · Nhân vật phụ (bác Thịnh, chú Cường, Hoài…): không có câu cố định.
- **Thứ tự ưu tiên tài liệu** (thay dòng "Thứ tự ưu tiên khi mâu thuẫn" ở đầu sổ này): **tổng quan vũ trụ → tầm nhìn sản phẩm chính (GDD) → tầm nhìn MVP → tầm nhìn prototype**. Sổ quyết định ghi lại quyết định; mỗi quyết định phải được đưa vào tài liệu đúng tầng. **Khi phát hiện mâu thuẫn giữa các tài liệu, điều phối viên không tự phân xử mà đưa user quyết**, kèm vị trí hai bên. Hiện tầm nhìn MVP chỉ nằm trong QĐ-077 → QĐ-083, chưa có tài liệu riêng.
- **Lớp của Hoài** (QĐ-073 ghi BC24A, QĐ-077 ghi QT24B): chọn theo câu đố, **chốt cùng lúc rà soát và viết nội dung** (gói kịch bản MVP).
- **Câu hỏi tạo nhân vật:** tối đa **3–4 câu**. MVP: tên, ngành, nam/nữ (QĐ-077); sau MVP nếu cần cho mã đề hoặc nội dung thì thêm tối đa 1 câu (thay 6 câu ở GDD §4).
- **Remotion:** không dùng trong game; chỉ dùng sau này khi làm video (xuất MP4 ra ngoài).
- **Tên "Vũ trụ Hoa Phượng" chắc chắn phải đổi**; tên mới chờ user chọn. Kéo theo: tên tệp `docs/thiet-ke/vu-tru-chan-hung-tong-quan.md`, tên dòng game "Đội Robot Hoa Phượng", các chỗ nhắc trong README và tài liệu. Id ảnh `hoa-phuong-environment-style-anchor` giữ nguyên (id không đổi theo tên).
- **Còn treo:** tên vũ trụ mới; thứ tự làm giữa các gói MVP và gói chuẩn hóa 12a → 16; câu về telemetry ở `prototype/README.md:106` trái QĐ-065; chị Linh có giọng kể không; có ghi lặng lẽ số lần mở sổ không.

**QĐ-085 — Vũ trụ Chấn Hưng; bàn làm việc là hướng sản phẩm; laptop trước, điện thoại sau (QUYẾT ĐỊNH CỦA USER).** · Nguồn: USER, quyết các mâu thuẫn giữa tầng GDD/vũ trụ và tầng MVP theo QĐ-084 · 28/09
- **Tên chuỗi: Vũ trụ Chấn Hưng** (trùng tên trường, QĐ-080). Dòng Robotics: "Đội Robot Chấn Hưng". Tệp tổng quan đổi tên thành `docs/thiet-ke/vu-tru-chan-hung-tong-quan.md`. Id ảnh `hoa-phuong-environment-style-anchor` giữ nguyên. Kịch bản prototype (còn ghi "Đại học Hoa Phượng", có test so khớp) và code sửa ở đợt viết lại.
- **Trình dựng: bàn làm việc với giấy nhớ (QĐ-071) là hướng của sản phẩm**, không chỉ của MVP. GDD §10 và tài liệu vũ trụ §8.2 ("Khối lệnh + chip") sửa theo; Bảng phân tích kiểu Power BI ở các vụ sau xây trên bàn làm việc.
- **Thiết bị: laptop là nền chính**; điện thoại là mục tiêu sau. Các chi tiết cho điện thoại trong GDD (bản đồ dọc, vùng chạm 44 pt, cắt ảnh dọc) để dành cho lúc làm bản điện thoại.
- **Bàn sau:** GDD §14 và kịch bản giải trình Vụ 1 (dạy IN và so sánh ngày, cột `clb`, kết bằng truy vấn ra đúng một người) mâu thuẫn QĐ-073/QĐ-082 (chỉ WHERE, `=`, `LIKE`, AND/OR; ngành Báo chí; kết "chưa đủ kết luận"). GDD là tầng cao hơn nên cần user quyết bên nào là hướng sản phẩm; user để bàn sau.

**QĐ-086 — MVP thu nhỏ: truyện tuyến tính theo ngày × 3 khung giờ; query thoải mái; 2 kết (QUYẾT ĐỊNH CỦA USER).** · Nguồn: USER, sau buổi brainstorm `docs/session-trao-doi-2026-09-28.md` và hai phiên hội đồng (`mvp-mo-phong-va-stress`, `het-khung-gio-chua-giai-du-kien`) · 28/09
- **Bối cảnh:** người thử prototype chê "yếu truyện, quá tuyến tính". Brainstorm đề xuất mô phỏng có hạn chót, giới hạn action và query, hảo cảm NPC, 3 kết, cùng một "thuật toán stress" (công cụ thiết kế đo độ khó, không phải tính năng). Hội đồng (cả 4 thành viên) khuyên không giới hạn số lần chạy query (trái QĐ-071, phạt thử-sai của người mới) và cảnh báo hệ thống to không tự làm truyện hay hơn. User thu nhỏ như dưới.
- **Truyện vẫn tuyến tính, thêm 3 khung giờ mỗi ngày** (sáng, trưa, chiều); mỗi hành động (đi tới một địa điểm, nói chuyện, xem xét, vào phòng máy) tốn 1 khung. **Mỗi ngày giải được 1 dữ kiện chính.**
- **5 ngày điều tra ứng với 5 dữ kiện chính; ngày 6 là buổi giải trình.** Người chơi đi lại tự do để tìm **dữ kiện phụ**.
- **Hết 3 khung mà chưa có dữ kiện chính → "Buổi tối":** các nơi khác đóng cửa, Tùng hoặc Hà Vy dẫn thẳng tới chỗ có dữ kiện chính (hoặc phòng máy), người chơi tự làm bước cuối, rồi hết ngày. Không nợ khung sang hôm sau, dữ kiện chính không bao giờ mất; cái giá chỉ là mất cơ hội tìm dữ kiện phụ của ngày đó. Luật cân bằng: người chơi tập trung giải xong dữ kiện chính trong **tối đa 2 khung**.
- **Phòng máy:** vào tốn 1 khung; ở trong **query thoải mái**, dán nhãn trên màn hình thoải mái, thời gian đứng yên (giữ QĐ-071). Khi tắt máy có bước **lưu thành bằng chứng**; bằng chứng là **key item** mang theo suốt game.
- **Gợi ý khi bí ở phòng máy: giữ QĐ-083** (Tùng gợi ý tra phần "điểm tâm đắc / lỗi thường gặp" của sổ chị Linh; Hà Vy chỉ nói về toán). Không thêm thang gợi ý tăng dần mà hội đồng đề xuất.
- **Không có hảo cảm NPC** ở MVP.
- **Uy tín là "máu" ở buổi giải trình** (giữ QĐ-083). **Số vụ đã giải** là tài nguyên mở khóa (địa điểm, vụ mới).
- **2 kết:** kết thường, và **true end** khi các dữ kiện phụ ghép thành **nguồn xác minh độc lập** mang vào buổi giải trình (nối tiếp kết "dữ liệu chưa đủ kết luận, cần nguồn xác minh độc lập" của QĐ-024).
- **Lịch ngày × khung giờ chỉ áp cho MVP**, thử trước; GDD giữ nhịp 4 buổi/vụ (§5, §6) cho tới khi playtest xong mới quyết cho cả sản phẩm.
- **Nguyên tắc cốt lõi:** game phải **thú vị**; chấp nhận hi sinh một chút cảm giác code thật, nhưng phải truyền tải được **giá trị của việc có SQL**.
- **Sắp xếp 5 dữ kiện Vụ 1:** hiện có chữ ký H, hộp tòa B, bookmark ngành Báo chí, lớp BC24A, Hiếu/Hoài — hai dữ kiện cuối đều làm ở phòng máy vào hai ngày liền. Gói kịch bản MVP sắp lại (xen kẽ thực địa và phòng máy) và đưa user duyệt.
- **Điều phối viên đề xuất, user đồng ý (28/09):** phạm vi SQL chương 1 giữ QĐ-073/QĐ-082 (WHERE, `=`, `LIKE`, AND/OR; NULL, hoa thường, `IN` ở nhiệm vụ phụ); "thuật toán stress" hoãn — truyện tuyến tính chỉ cần một bộ kiểm tra nhỏ lúc build (dữ kiện chính mỗi ngày giải được trong 2 khung, true end đạt được); Hardcore và xếp hạng S/A/B/C của QĐ-077 hạ ưu tiên theo nguyên tắc "vui trước". Bản ghi buổi brainstorm được đưa vào repo: `docs/session-trao-doi-2026-09-28.md`.
- **Kéo theo:** QĐ-077 (Vụ 1 từ 4 buổi thành 5 ngày × 3 khung + ngày giải trình; chia lại gói 1–4); đặc tả nội dung cần cú pháp cho ngày, khung giờ, dữ kiện chính/phụ, key item, "Buổi tối"; GDD §5.1 (khóa tiến trình) và §14 (vẫn "bàn sau", QĐ-085).

**QĐ-087 — Kịch bản khung MVP: mở đầu tuần 1 và Vụ 1 "Chữ ký H." (QUYẾT ĐỊNH CỦA USER).** · Nguồn: USER, sau ba vòng hội đồng viết và review chéo (`~/.claude/hoi-dong/sessions/20260928-1636-kich-ban-vu1-mvp`, `…-1710-kich-ban-vu1-loop2`, `…-1742-opening-mvp-loop3`) và góp ý của user sau mỗi vòng · 28/09
- **Tài liệu:** `docs/mvp/kich-ban-vu1-mvp-khung.md` là **tầm nhìn MVP** (tầng thứ ba theo QĐ-084); dữ liệu minh họa và lệnh kiểm số dòng ở `docs/mvp/kiem-du-lieu-vu1.py`. Với MVP, tệp này thay GDD §14; ở tầng sản phẩm, §14 vẫn là mục "bàn sau" (QĐ-085).
- **Mở đầu (user yêu cầu "gần bản thật", ≥ 80%):** Chủ nhật tuần 1 đến KTX gặp Tùng (tạo nhân vật) → Tùng dẫn đi trường (dạy bản đồ, xem xét, khung giờ; gieo hộp tòa B, bác Thịnh, poster đăng ký online) → tối qua cổng KTX gặp chú Cường kể chuyện CLB → tuần sinh hoạt công dân (người chơi nhận thẻ lịch của khoa mình) → Ngày hội CLB gặp Minh Anh (không gặp Hà Vy) → buổi sinh hoạt đầu năm chiều thứ Hai tuần 2: làm quen, dọn phòng tìm sổ chị Linh, **sau đó** lá thư mới đến.
- **Nhân vật chính là nam**, ở cùng phòng với Tùng; bộ ba kiểu Harry Potter (người chơi – Tùng – Hà Vy). Tạo nhân vật còn **2 câu: tên, ngành**; không hỏi giới tính (thay "nam/nữ" của QĐ-077). Lý do của user: vai dẫn đường của Tùng khó đổi sang Hà Vy; ở cùng phòng mới thân và dẫn đi được.
- **Ngày hội CLB:** phiếu đăng ký cần mã sinh viên; Tùng ghi sai mã; người chơi lọc danh sách tra cứu tân sinh viên K24 với **một điều kiện** `ten = 'Tùng'` → 3 dòng, đọc cột ngành để chọn đúng → Minh Anh kéo người chơi vào CLB. AND/OR để dành cho ngày 2.
- **Hà Vy** đăng ký CLB qua **form online** nên không có mặt ở Ngày hội; thích logic, thần tượng Sherlock Holmes. Cặp câu "Tớ cá là…" / "Đừng cá. Tính." lần đầu ở ngày 2 (Tùng chọn OR).
- **Thành viên thứ năm: Nguyễn Đức Duy**, năm 2 Hành chính học, thành viên từ năm nhất, **giữ tài sản CLB** (chìa khóa, tủ hồ sơ, sổ tài sản, máy tính cũ của CLB); lập biên bản kiểm kê hè; giải thích quy trình rà soát. Quy chế: tối thiểu 5 thành viên sinh hoạt thật, tính cả chủ nhiệm — chỉ là điều kiện giữ tư cách CLB, không đủ để giữ phòng.
- **Chuỗi quyền lực của Vụ 1:** thư không được thụ lý như tố cáo; được xếp vào hồ sơ đợt rà soát phòng đầu năm cùng báo cáo "hoạt động yếu" và đơn xin phòng của Robotics; buổi họp rà soát thứ Hai tuần 3 do thầy Quang chủ trì. **Hộp tiếp nhận kiến nghị** (đổi tên từ "hộp góp ý"): thư muốn được phản hồi phải ghi mã người gửi vào **sổ niêm phong**; không ai được mở sổ; cô phụ trách chỉ trả lời có/không cho mã có căn cứ. CLB chỉ lập danh sách mã ứng viên; Quân giám sát.
- **Vật chứng ở khe hộp:** thẻ lịch Tuần sinh hoạt công dân (phần in khoa Báo chí K24 còn, dòng viết tay tên/lớp bị mép tôn xé) — thay mẩu bookmark "…ÁO CHÍ".
- **Lịch:** ngày 1–5 là thứ Ba → thứ Bảy tuần 2; ngày 6 (buổi họp rà soát) là thứ Hai tuần 3.
- **Quân gặp CLB lần đầu ở CTSV ngày 3** (giám sát việc lập căn cứ) — thay "Quân chỉ xuất hiện từ phần Giải trình" của QĐ-074.
- **True end:** nhật ký in + **ít nhất một** trong hai lời kể (chú Cường hoặc Đạt). Kết thường: Hoài không bị phạt; CLB được đến hết học kỳ kèm báo cáo hằng tháng. True end: thư bị loại khỏi hồ sơ; CLB được đến hết học kỳ không kèm điều kiện. Cả hai kết khớp mốc "đến hết học kỳ" của GDD §2.2.
- **Nhân vật mới:** Duy; Đạt (lớp trưởng BC24A); Hiếu lên hình 2–3 cảnh; cô phụ trách hộp chỉ qua lời kể. Chú Cường đổi ca (tuần 1 tối, tuần 2 sáng) do Tùng nhắc, chú không tự nói.
- **Seed:** MVP vẫn dùng dữ liệu cố định (QĐ-077); chỉ lưu hồ sơ (tên, ngành) và một hằng số seed để sau này thay.
- **Dữ liệu:** chốt bộ dữ liệu trước rồi mới viết thoại đọc số (bài học từ vòng 2: hai thành viên hội đồng tính sai câu OR thành 18 dòng). Đã chạy SQLite: OR của Quân 14 dòng, AND 2 dòng; tra "Tùng" 3 dòng. Test QĐ-014 cần ngoại lệ cho tên "Tùng".
- **Tài sản:** 7 cảnh nền cho mở đầu; ảnh bán thân mới cho Duy, Hiếu.
- **Phải sửa theo:** GDD §3.1 (người chơi nam, Duy), §4 (2 câu), §14 (trỏ sang tệp MVP); đặc tả §4 (`nhan-vat.yaml`: Quân, Duy, người chơi); `vu1-buoi-giai-trinh-kich-ban.md` (bị thay cho MVP); kịch bản prototype `intro-00`, `intro-01` (viết lại khi làm gói nội dung MVP); gói MVP của QĐ-077 cần chia lại (kiến trúc thêm ngày × khung giờ, key item, "Buổi tối").

**QĐ-088 — Chốt QĐ-079 và giao việc xây engine kịch bản Markdown (QUYẾT ĐỊNH CỦA USER).** · Nguồn: USER · 28/09
- **Chốt bốn câu của QĐ-079:** (1) sinh dữ liệu theo **cách A** — file `src/content/generated/*.gen.ts` được commit, có test "file sinh khớp nội dung"; (2) bước chuẩn hóa **vẫn nhận cú pháp cũ** (`[ĐIỂM XEM XÉT]`, `[ĐIỀU KIỆN QUA]`, `[KHI ĐÚNG]`, `[KHI: mã]`); (3) 12a-1, 12a-2 dùng **Opus**; (4) tên nhân vật thành biến `{{nv.<mã>}}`, giữ mã làm khóa (đã đồng ý trước đó).
- **Mở rộng phạm vi (user chọn "làm luôn cú pháp MVP"):** sau 12a-1 → 12a-2, làm tiếp gói **12m `cu-phap-mvp`**: thiết kế và cài cú pháp cho kịch bản MVP (QĐ-086/087) — ngày × 3 khung giờ, địa điểm × dữ kiện chính/phụ/nhiễu, key item, "Buổi tối", điều kiện true end, rẽ nhánh 2 kết, cảnh mở đầu (tạo nhân vật 2 câu, lọc thử ở Ngày hội) — vào bộ đọc, kiểu dữ liệu sinh ra và phần kiểm lỗi; cập nhật đặc tả. Gói này **chưa làm runtime** chơi được nhịp mới (đó là gói kiến trúc MVP của QĐ-077). Model đề xuất cho 12m: **Fable** (phải tự thiết kế cú pháp, chấm 8/10 theo /giao-viec). 12b, 12c làm sau 12m hoặc gộp khi cần.
- **Thứ tự:** tuần tự, một agent một lúc (QĐ-057): 12a-1 → 12a-2 → 12m.

**QĐ-089 — Nghiệm thu gói 12m; luật khung giờ, địa điểm, ảnh theo ngày/đêm, SQL chạy thật (QUYẾT ĐỊNH CỦA USER).** · Nguồn: USER, sau báo cáo gói 12m (`prototype/noi-dung-mvp/`, commit e27ef04…4533195) · 28/09
- **Đi lại giữa các địa điểm không tốn khung giờ.** Chỉ hành động tại địa điểm tốn khung (QĐ-086); cách bộ kiểm 12m đang tính giữ nguyên.
- **Mỗi địa điểm 1–3 dữ kiện phụ/nhiễu; dữ kiện chính không tính vào con số này.** Phòng máy và CTSV gánh hai ngày (2 dữ kiện chính + 2 phụ/nhiễu) vẫn hợp lệ. Luật trong `noi-dung-mvp/lich.md` (hiện ghi "1–4 dữ kiện", đếm cả chính) phải đổi theo.
- **Phòng CLB và phòng máy là hai phòng khác nhau.** Nền phòng CLB có máy bàn của CLB (Duy giữ), không biến thành phòng máy.
- **Vật tương tác có ảnh riêng, viền trắng khi rê chuột**; nền để trống chỗ đặt vật. Kế hoạch: `art/prompts/prompts-mvp-vu1-v0.1.md`.
- **Ảnh nền chỉ theo ngày và đêm:** sáng/trưa/chiều dùng chung một ảnh ngày (game phủ lớp màu + đồng hồ); ảnh tối riêng cho nơi có cảnh buổi tối, sửa từ ảnh ngày giữ bố cục.
- **"Xuất hiện từ" của nhân vật sửa trong `noi-dung-mvp/nhan-vat.md`**; mốc agent tạm đặt (Hiếu ngày 3, Đạt ngày 5, thầy Quang/Hoài ngày họp) giữ đến khi user sửa.
- **SQL chạy thật trên bộ dữ liệu cố định; chưa làm dữ liệu ngẫu nhiên** (nhất quán QĐ-087). Làm ngay phần kiểm "số dòng nêu trong thoại khớp kết quả chạy thật" (đề xuất 3a của 12m, phương án B).
- **Còn mở, chưa quyết:** bốn chỗ lệch trong `docs/mvp/kich-ban-vu1-mvp-khung.md` do 12m báo — (a) sảnh tòa B gắn hai dữ kiện chính (12m tạm gộp); (b) bảng địa điểm thiếu hàng dữ kiện chính ngày 5; (c) phòng máy một "bàn làm việc" cho cả ngày 2 và ngày 4 dù hai bài khác nhau; (d) sổ chị Linh và báo cáo "hoạt động yếu" vừa ở mở đầu vừa là dữ kiện phòng CLB (12m tạm để phụ).

**QĐ-090 — Chốt 8 điểm cốt truyện/logic của thoại MVP Vụ 1 (QUYẾT ĐỊNH CỦA USER, qua hội đồng).** · Nguồn: USER + hội đồng (Gemini Flash, Gemini Pro, GPT, Claude; ý user tính như một thành viên), phiên `~/.claude/hoi-dong/sessions/20260929-0918-cot-truyen-8-diem` · 29/09
- **Nhãn "Buổi tối" đổi thành "Cuối ngày"** (một chỗ trong `lich.md`; cú pháp `- Buổi tối:` giữ nguyên). Lý do: QĐ-086 định nghĩa Buổi tối là lúc "các nơi khác đóng cửa" mà dữ kiện chính ngày 3 và 5 ở CTSV. Cảnh cuối ngày 3 và 5 ghi 16:45, CTSV sắp đóng cửa.
- **Động cơ người soạn thư để ngầm** (khung MVP: không nêu tên Vương Khánh). Kết thật có một câu khép: thầy Quang sẽ gặp riêng người soạn thư.
- **Hiếu có một câu lý do đời thường** (nhóm xin phòng làm bài nhóm mãi không được). Không vụ sau nào dùng Hiếu nên không chờ "chương sau".
- **Giữ thầy Quang là Phó hiệu trưởng** (vai toàn mùa: người sáng lập CLB, chủ trì các buổi duyệt; văn bản của thầy mới mở được dữ liệu Phòng Đào tạo). Hạ độ "to" bằng câu mở đầu: thầy duyệt xếp phòng cho các CLB, CLB Thám Tử là một mục.
- **Quyền dữ liệu:** đơn do Minh Anh đứng tên, thầy Quang duyệt, cô Hạnh cấp; Duy ngồi cùng ở phòng máy, ký sổ mượn máy.
- **Chú Cường không còn thấy dây thẻ khoa**; bạn nữ cầm phong bì rồi đi thẳng về phía tòa B. Lời chú chỉ cần chứng minh có người khác đưa phong bì.
- **Hoài vào phòng họp do người chơi chọn** (`[RẼ NHÁNH r-moi-hoai]` sau `q-thu-pham`): mời vào tự kể → `[RẼ KẾT]` theo bằng chứng; đối chất → mất 1 vạch, kết thường; dừng ở hai dòng → kết thường, không mất vạch. Hoài ngồi chờ ngoài theo quy chế (cô Lan báo ở ngày 5).
- **Hoài ghi mã của chính mình theo lời dặn**; ở kết thật Hà Vy nói ra: người nhờ không để lại gì trong sổ.
- **"Số liệu đây!" lần đầu có bạn bè hưởng ứng** (Tùng, Duy); lần 2 ở buổi họp giữ Hà Vy.
- **Thoại mới qua hội đồng chấm vòng 2–7** (phiên `…-cot-truyen-vong2-cham` … `…-vong7-cham`): TB 86 → 93%; vòng 7 Flash 97, Claude 96, Gemini Pro 95, GPT 84 (GPT giữ hai phản đối trái kết thật đã chốt). Kết quả: đường "dừng" vào thẳng kết thường; kết thật do CLB trình nhật ký in. **Vòng 8** (user yêu cầu đưa kết của GPT ra phản biện: thầy chỉ "nghi", chưa kết luận về thư): cả 4 thành viên, kể cả GPT, bác bản đó và chọn phương án lai — thầy kết luận đúng tầm "em không phải người soạn thư" (nhật ký in + lời kể sáng thứ Hai là hai nguồn riêng cùng khớp lời Hoài), không nhận thư vào hồ sơ vì người viết giấu tên, mượn chữ "H." và mã của một bạn năm nhất (không viện điều khoản quy chế không có trong game), và nói rõ Hoài không bị xử lý. **Vòng 9:** Flash 98, Claude 96, Pro 95, GPT 82.

**QĐ-091 — Chữ ký trên lá thư Vụ 1: chữ ký tay chỉ đọc được chữ H; giấy nhớ [H] (QUYẾT ĐỊNH CỦA USER).** · Nguồn: USER, khi chơi thử mockup `docs/mockups/core-game-v5-choi-thu.html` (kéo [H.] không ra kết quả), kèm hai ảnh mẫu chữ ký · 29/09 (lúc ghi là QĐ-090 trên nhánh khác; đổi số khi gộp vào main vì main đã có QĐ-090)
- **Bỏ "H." có dấu chấm.** Người thật ký tay kiểu chữ cái đầu và nét lượn, không ai thêm dấu chấm. Chữ ký trên phiếu gửi là **chữ H viết hoa rõ, phần sau là nét lượn không đọc được** (theo ảnh mẫu 1 của user: H có gạch ngang dài, sau đó các nét gợn, một nét vòng dài xuống dưới, kết bằng đuôi ngang). Tên vụ: **"Chữ ký H"**.
- **Giấy nhớ là [H].** Kéo [H] với phép "bằng" → `ten = 'H'` → 0 dòng (không ai tên đúng một chữ) → "bắt đầu bằng" → 2 dòng. Bài học LIKE đến từ chính vật chứng ("chỉ đọc được chữ đầu"), không cần máy hay dấu chấm gượng; nhịp ngày 4 của kịch bản giữ nguyên. Bẫy "lọc nhầm cột `ho_dem`" có thêm lý do trong truyện (H là đầu của tên hay của họ?).
- **Hoài ký chữ ký của chính mình**: thoại Hoài ở buổi họp đổi "dặn cứ ký 'H.'" thành "dặn cứ ký như bình thường".
- **Đã sửa theo:** nội dung MVP (`noi-dung-mvp/`: giấy nhớ, bản chụp thư, thử thách `c-ten-h`, mở đầu, buổi họp, tên vụ), nội dung prototype vòng 1 (`noi-dung/`: thẻ `clue-signature-h`, phong bì, lời dẫn), tệp sinh `src/content/generated/`, mẫu và test hiện tiêu đề thẻ, hình phong bì `DocumentArt.tsx` (vẽ lại theo kiểu ảnh 1), kịch bản khung MVP, đặc tả nội dung, `kiem-du-lieu-vu1.py`. Tiêu đề thẻ: "Chữ ký tay (chỉ đọc được chữ H)". Không sửa các QĐ cũ và mockup cũ (giữ làm lịch sử).
- **Ảnh:** thêm ảnh chữ ký `doc-chu-ky-h` vào kế hoạch ảnh (`art/prompts/prompts-mvp-vu1-v0.1.md`, đợt 6b, có câu lệnh); tiêu chí nhận: đọc ra H ngay, không nhầm J/K/N, không đọc ra chữ nào khác.
- Kiểm: `npm run kiem-noi-dung` không lỗi (MVP: 5 câu SQL khai số dòng, chạy thật khớp 5); typecheck sạch; 79/79 tệp test, 679 test đạt.
