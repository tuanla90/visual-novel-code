# CLB Thám Tử Dữ Liệu — Lịch sử quyết định (prototype v0.1)

> File này ghi lại **mọi quyết định** trong quá trình dựng prototype theo `prototype-scope-down-v0.1.md`.
>
> **Cơ chế vòng phản hồi (feedback loop):**
> 1. Điều phối viên (Claude Opus 5.5) giao việc cho các subagent kèm file này làm "luật".
> 2. Khi gặp điểm chưa được tài liệu hoặc file này quyết định, agent **dừng lại và hỏi** (nếu câu hỏi chặn việc) hoặc **tự chọn phương án khuyến nghị và báo lại** (nếu không chặn).
> 3. Điều phối viên trả lời theo hướng **có lợi nhất cho mục tiêu prototype** (kiểm chứng vòng chơi tìm manh mối → truy vấn → diễn giải → phản bác, với người mới học SQL), ghi vào file này, rồi gửi câu trả lời lại cho agent.
> 4. Chỉ điều phối viên được sửa file này. Agent đọc file này trước khi làm việc; quyết định ở đây có hiệu lực ràng buộc.
>
> **Thứ tự ưu tiên khi mâu thuẫn:** `prototype-scope-down-v0.1.md` > file này > `vu1-buoi-giai-trinh-kich-ban.md` > `clb-tham-tu-du-lieu-GDD-v0.5.md` > `vu-tru-hoa-phuong-tong-quan.md`.
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
- **Chọn:** dùng bộ mã trong `docs/kich-ban-prototype.md` làm hợp đồng giữa nội dung và engine: `not-select`, `syntax-error`, `no-table`, `wrong-table`, `no-filter`, `missing-columns`, `extra-columns`, `wrong-column-ho-dem`, `like-ends-with`, `like-contains`, `class-prefix`, `wrong-value`, `hardcoded-ids`, `limit-used`, `or-connector`, `missing-condition`, `connector-unset` (bổ sung 15:36 theo QĐ-039: lời nhắc khi bấm Chạy lúc chưa chọn phép nối, xếp vào nhóm "không chạy được"), `other`; thứ tự ưu tiên như mục "Quy ước thẻ thử thách". Gói `sql-engine` được thêm mã mới nếu cần nhưng phải báo lại; mã không phát hiện được thì rơi về `other`.

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

**Bài học quy trình:** `preview_start` theo tên đọc `.claude/launch.json` của `main` → agent chạy nhầm server của main một phút. Từ gói 4: agent tự chạy `vite` bằng Bash ở cổng riêng rồi `navigate`, không gọi `preview_start` theo tên. Điều phối viên đếm sai "6 `[HỎI]` trong chuỗi truyện" (thật: 3 + 3 câu đọc kết quả) — agent đã đính chính.

**Ghi chú không đổi quyết định:**
- Tệp `prompts-background-prototype-v0.1.md` (bộ prompt tạo 3 ảnh cảnh nền + 1 ảnh neo phong cách) xuất hiện ở gốc repo lúc 18:33, không do agent nào tạo — coi là tài liệu của user. Gói hình/giao diện sẽ nhận ảnh nền thật theo đúng id trong tệp đó, dùng hình SVG tạm khi chưa có ảnh.
- GDD v0.5 ghi Hà Vy "không biết SQL"; prototype để Hà Vy hướng dẫn từng bước và đưa gợi ý mức 3 gần như đáp án (QĐ-021, tài liệu prototype ghi Hà Vy "gợi ý cách đọc dữ liệu"). Cần cập nhật GDD sau vòng test.
- Lời thoại viết cứng số liệu (10 người, 24 người, 40 sinh viên, 8 lớp): QĐ-010/QĐ-012 là nguồn; test dataset (gói 3) và test nội dung (gói 5) phải khẳng định các số này.
