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

| Agent | Giai đoạn | Model | Lý do chọn model |
|---|---|---|---|
| `architect` | 1 — Nền móng | Opus | Hợp đồng dữ liệu, store, runtime kể chuyện; sai ở đây lan ra mọi module |
| `story-writer` | 1 → 2 | Opus | Lời thoại tiếng Việt + ràng buộc sư phạm tinh tế; quyết định giả thuyết "câu chuyện có hấp dẫn không" |
| `sql-engine` | 2 | Opus | Đúng/sai quyết định giá trị học: dataset có bất biến, chấm theo ngữ nghĩa, dataset ẩn, parser |
| `builder-ui` | 2 | Sonnet | Giao diện React có đặc tả rõ |
| `art-ui` | 2 | Sonnet | Hình tạm SVG/CSS, bố cục, hiệu ứng; độ khó trung bình |
| `debrief-ui` | 2 | Sonnet | Các thành phần tương tác của màn giải trình, đặc tả rõ |
| `telemetry` | 2 | Haiku | Ghi sự kiện, xuất JSON, bảng điều khiển người quan sát — đơn giản, đặc tả chặt |
| `integrator` | 3 | Opus | Ghép module, xử lý lệch hợp đồng, cần phán đoán xuyên module |
| `reviewer-code`, `reviewer-pedagogy` | 4 | Opus | Tìm lỗi logic và lỗi sư phạm cần suy luận sâu |
| `fixer` | 4 | Sonnet | Sửa theo danh sách lỗi đã xác minh |

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
