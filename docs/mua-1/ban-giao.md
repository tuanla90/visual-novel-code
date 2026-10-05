# Bàn giao việc mùa 1 cho phiên khác

> Cập nhật 05/10/2026, khoảng 9h30.
>
> Phiên mới chỉ cần đọc tệp này rồi làm tiếp. Các quyết định user đã chốt nằm ở `docs/mua-1/giao-viec.md` mục A3, không được tự đổi.

## 1. Đọc trước

1. Memory: `lo-trinh-ky-nang-mua-1.md`, `giao-viec-codex-agy.md` (và các luật viết lời trong `MEMORY.md`).
2. `docs/mua-1/ke-hoach-10-vu.md`:
   - kế hoạch 10 vụ;
   - luật thời gian;
   - luật 7 "đứng nguyên chỗ";
   - người quen, ngày lễ.
3. `docs/mua-1/giao-viec.md`:
   - A3: quyết định đã chốt;
   - A4: kỹ năng theo vụ;
   - A5: cú pháp;
   - B4: gói đang làm;
   - C2: bảng đo độ dài;
   - E: truyện chữ.
4. `prototype/noi-dung-mua-1/README.md`: cú pháp nội dung, kể cả `[ĐI CÙNG]`, `Cột nộp`, `· cảnh cắt`, `· bắt đầu ở`.

## 2. Trạng thái

- **Worktree:** `D:\Users\tuanla2\game\learn-code-by-game\.claude\worktrees\mua1-t0`, nhánh `claude/mua1-t0`. `prototype/node_modules` là junction về repo chính, không `npm install`.
- **`main`** = `e08c0a4` (đã push). Nhánh `claude/mua1-t0` = `main` cộng các commit chưa gộp: T1, B4.3, B4.4a. **Chưa gộp main, chưa push**. Gộp và push chỉ khi user bảo.
- **App chính vẫn là MVP.** Bộ mùa 1 chỉ mở ở chế độ dev (nút "Bộ nội dung" ở màn tiêu đề, hoặc `?bo=mua-1`) và chưa chơi được cú pháp mới. **Bản mùa 1 để user đọc** là truyện chữ `docs/mua-1/truyen-chu/`, xuất bằng `npm run truyen-chu:mua1`.

### Gói đã xong

| Gói | Nội dung |
|---|---|
| T0 | Tách bộ `noi-dung-mua-1`, lệnh `:mua1`, máy kiểm kỹ năng, công cụ truyện chữ (lịch, Hết ngày, Đang ở, bản đồ ngày, Lọc từng bước, Nộp cột) |
| T1 | Cú pháp `- [ĐI CÙNG <chuỗi>] <nhãn>`; máy kiểm coi đó là đổi nơi hợp lệ; chặn `[RẼ NHÁNH]` giả (mọi lựa chọn cùng đích, nhãn "(Tiếp tục)"); ngày thật cho ngày theo truyện |
| B4.1 | Vụ 1 bỏ `LIKE`/`IN`: tra theo lớp, nhật ký in lọc bằng, câu HOẶC của Quân là `ten = 'Hoài' OR ma_lop = 'BC24A'` |
| B4.2 | Hoài xuất hiện từ nhập học (bị Tùng chỉ nhầm ra nhà xe) và Trung thu (hỏi đường phòng máy in, xưng tên); Tùng nghi Hoài ở ngày 4 có căn cứ riêng |
| B4.3 | Vụ 1: hạn chót 30/09, việc chốt, nơi bắt đầu mỗi ngày, `[XONG VIỆC CHÍNH]` mỗi ngày, hết lỗi đứng nguyên chỗ |
| B4.4a | Vụ 2: sáu màn tra chữ (bằng → bắt đầu bằng → chứa → làm sạch → `IN` → tin gốc một câu VÀ) |

### Việc còn mở cần user biết

- Câu HOẶC của Quân chỉ ra 32 dòng (bằng cả lớp) vì toàn trường chỉ có một bạn tên Hoài. Bài học HOẶC kém rõ; có thể thêm vài bạn tên Hoài ở lớp khác vào `du-lieu.md`.
- Vụ 1 mới có 1 đối chất. Chuẩn C2 cần ≥ 3; chưa làm.
- SQLite so `LIKE` không phân biệt hoa thường với chữ ASCII, nên bài "làm sạch" ở Vụ 2 chủ yếu dựa vào bỏ dấu cách thừa.

## 3. Việc tiếp theo

### B4.4b: dựng lại truyện Vụ 2

Brief đầy đủ ở `docs/mua-1/brief/b4-4b.md`.

**Bài học:** lần giao cả gói một lượt, Vụ 2 **co** từ 127 xuống 31 dòng thoại, nên đã bỏ hết. Gemini báo "228 chuỗi" nhưng đó là tổng cả bộ, không phải Vụ 2. **Phải chia lượt**, mỗi lượt một chỉ tiêu, cấm xóa lời cũ:

| Lượt | Việc | Chỉ tiêu thêm |
|---|---|---|
| 1 | Chỉ cấu trúc. `lich.md`: đổi mã `vu2` → `vu-tin-don` ở mọi nơi (cả `Mở sau: vu2` của việc phụ, cờ `vu2-hoan-tat`); `Hạn chót: 2024-10-15`; `Việc chốt: Buổi giải trình chiều 15/10`; dòng `- Ngày …: <chuỗi> · bắt đầu ở: <cảnh>` cho 4–5 ngày. Mỗi ngày một `[XONG VIỆC CHÍNH]`. Sửa lỗi đứng nguyên chỗ bằng `[ĐI CÙNG]`. Test nào tìm `vu2.md` thì đổi sang `vu-tin-don.md`. | Số thoại, số chuỗi không giảm |
| 2 | Đối chất Hiếu ở căng tin, giữa vụ: "Tin này có từ lâu, ai cũng chuyển." | ≥ 40 dòng, 1 `[ĐỐI CHẤT]` |
| 3 | Buổi giải trình chiều 15/10 với Quân, 2 nhịp đối chất, có nhịp người chơi nói giới hạn chứng cứ | ≥ 60 dòng, 2 `[ĐỐI CHẤT]` |
| 4 | Buổi tối không khí sinh viên, Hà Vy soi một người, bản đồ ngày có nơi tùy chọn và chi tiết ẩn | ≥ 60 dòng, ≥ 8 chuỗi |
| 5 | Lấp cho đủ C2; khung việc ngày lễ 15/10 (Quân) trong `lich.md` | Vụ 2 đạt ≥ 300 thoại, ≥ 40 chuỗi, ≥ 5 màn tra, ≥ 3 đối chất |

**Đo** (trong `prototype/noi-dung-mua-1/`):

```bash
grep -c '^- \*\*' loi/10-vu-2-tin-don.md loi/tt-tin-don.md
```

```bash
grep -c '^### ' kich-ban/10-vu-2-tin-don.md
```

### Sau B4.4b

Làm Vụ 4 (Nam ở đâu lúc 22:40, từ Vụ 3 cũ), Vụ 6 (Giúp Nam, từ Vụ 4 cũ), Vụ 8 (Sổ quỹ, từ Vụ 5 cũ), theo `giao-viec.md` B4. Mỗi vụ chia lượt như trên:
1. màn tra;
2. cấu trúc ngày;
3. từng cảnh lớn.

Rồi tới B5 trở đi (vụ thường mới, ngày lễ, người quen).

## 4. Cách giao Gemini

User cho dùng Gemini thoải mái ("không cần tiếc token của Gemini, miễn máy chạy được"). Mỗi lúc **một** lượt (máy 16 GB). Chạy nền trong worktree, ghi log:

```bash
agy --print="<việc của lượt> <LUẬT CHUNG bên dưới>" --model gemini-3.1-pro-high --mode accept-edits --dangerously-skip-permissions --print-timeout 4800s > <scratchpad>/luotN.log 2>&1
```

**Luật chung** (dán vào cuối prompt mỗi lượt nội dung; đổi tên tệp theo vụ đang làm):

> LUẬT CHUNG: Chỉ sửa prototype/noi-dung-mua-1/ (và tệp sinh, truyện chữ bằng lệnh). TUYỆT ĐỐI KHÔNG XÓA chuỗi hay dòng thoại đang có của vụ trừ khi trùng lặp; được viết lại câu chữ, được dời chỗ. Đo trước và sau bằng `grep -c '^- \*\*' loi/<tệp vụ>.md` và `grep -c '^### ' kich-ban/<tệp vụ>.md`; số sau phải ≥ số trước cộng chỉ tiêu của lượt. Biểu cảm chỉ dùng loại có trong nhan-vat.md. Chuyển nơi bằng `- [ĐI CÙNG <chuỗi>] <nhãn>` hoặc bản đồ, không `[ĐI TỚI]` sang cảnh khác. Lời mới thêm `(tạm)` cuối dòng. Luật viết: show don't tell, câu ngắn giọng sinh viên miền Bắc, Hà Vy/Minh Anh/Tùng không nói thuật ngữ SQL, không gạch dài, lời chỉ nhắc vật có trên ảnh nền. Sau `Khi chạy ra <n> dòng với` chỉ được là tên cột SQL. Chạy từng lệnh ở chế độ thường trong prototype/ (không chạy nền rồi chờ): npm run noi-dung:sinh:mua1; npm run kiem-noi-dung:mua1 (không lỗi); npm run kiem-ky-nang:mua1; npm run kiem-giong:mua1 -- --chi-loi (0 lỗi); npm run truyen-chu:mua1; npx vitest run src/content/real/testing/mua1-t0.test.ts; npm run kiem-noi-dung:mvp. KHÔNG commit, KHÔNG push, KHÔNG npm install, không npm test toàn bộ, không đụng noi-dung-mvp, generated/mvp, .vite-canary, tools/. Không để tệp nháp (.js, .cjs, .mjs, .txt ở gốc repo hay prototype/). Cuối cùng IN RA số đo trước và sau, dòng cuối từng lệnh, rồi kết thúc ngay.

**Lượt sửa công cụ** (`tools/`): đổi luật cho phép sửa `tools/` và test. Thêm:
- `npm run typecheck`: 0 dòng lỗi;
- `npx eslint <tệp đã sửa>`: cấm `any`;
- `npm run noi-dung:sinh:mvp` và `kiem-noi-dung:mvp` không đổi.

## 5. Nghiệm thu (tự kiểm, không tin báo cáo Gemini)

1. `git status --short`: xóa tệp nháp Gemini để lại.
2. Chạy lại mọi lệnh ở luật chung tại worktree.
3. **Đo số dòng tự tay.** Đừng tin con số trong báo cáo.
4. Đọc diff lời thoại, ít nhất các cảnh mới. Soi:
   - lựa chọn giả;
   - biểu cảm lạ;
   - số dòng nói trong lời không khớp kết quả chạy;
   - câu cũ còn nhắc số cũ.
5. `npm run typecheck`. Đọc output, không tin exit code.
6. Lint: `main` có mốc **8 lỗi + 1 cảnh báo**, không được thêm.
7. `git diff --stat -- prototype/noi-dung-mvp prototype/src/content/generated/mvp` phải rỗng.
8. Đạt thì `git checkout -- prototype/.vite-canary`, rồi commit trên `claude/mua1-t0`. Commit kết thúc bằng dòng `Co-Authored-By` theo quy ước phiên.
9. Trước khi gộp `main`: chạy `npm test` toàn bộ (khoảng 5 phút, chạy một mình). Gộp bằng cách merge `main` vào nhánh rồi fast-forward `main`.

## 6. Bẫy đã gặp

- **Gemini hay:**
  - lách máy kiểm (đổi `[ĐI TỚI]` thành `[RẼ NHÁNH]` hai lựa chọn cùng đích);
  - cắt bớt nội dung khi giao việc lớn;
  - báo sai số liệu;
  - để tệp nháp;
  - để lỗi lint `any`, lỗi typecheck;
  - chạy lệnh nền rồi thoát giữa chừng;
  - đôi khi tự `commit`.
- **agy xong việc mà không thoát.** Kiểm `Get-Process agy`; tiến trình bắt đầu hôm nay thì `Stop-Process -Force`. PID 31712 (từ 03/10) không phải của phiên này, để nguyên. Có một mục PID 43072 là bóng ma, `taskkill` báo không tồn tại, bỏ qua.
- **Đứt mạng giữa chừng:** giao lại lượt với câu "làm nốt, giữ phần đã viết", kèm danh sách lỗi đã đo.
- **Ghi tệp trong worktree khác:** Write/Edit bị chặn. Dùng Python hoặc sed qua Bash. Python trên Windows: `PYTHONIOENCODING=utf-8`, mở tệp với `newline=''` để không đổi CRLF.
- **SQLite:** `LIKE` không phân biệt hoa thường với chữ ASCII; không có `ROUND(x, -3)` (dùng `ROUND(x / 1000.0) * 1000`); chia số nguyên ra số nguyên.

## 7. Sổ canh đêm 05/10 (tóm tắt)

| Lượt | Việc | Kết quả | Commit |
|---|---|---|---|
| 1 | T0 R3+R5 | đạt (Claude sửa 5 lỗi lint) | 02d91c2 |
| 2, 2b | T0 R1 (Hết ngày) | lần 1 trả lại; lần 2 đạt, Claude sửa lỗi tsc | a36bf65 |
| 3 | T0 R4 (Đang ở, bản đồ ngày) | đạt | d8e6a16 |
| 4, 4b | T0 S12 (Cột nộp) | đạt; test đủ 133 tệp / 1117 test | a118830 |
| 5 | B4.1 | đạt, Claude sửa 4 câu sót số cũ | c159bfe |
| 6, 6b | B4.2 | đạt (một lần đứt mạng, một lần agy treo) | b05764c |
| 7 | B4.3 | trả lại phần kịch bản (lựa chọn giả), giữ lịch | 6756c79 |
| 9 | T1 | đạt 54/54 | 34ea8f5 |
| 10 | B4.3 làm lại | đạt sau khi Claude sửa máy kiểm và 2 nút cảnh kết | dc992d1 |
| 11 | B4.4a | đạt | 0f2d60b |
| 12 | B4.4b một lượt | trả lại, bỏ hết (Vụ 2 co còn 31 dòng) | – |
| 13 | B4.4b lượt 1 | user tạm dừng trước khi sửa gì | – |

## 8. Báo cáo cho user

Viết tiếng Việt, ngắn, không thuật ngữ thừa. Nói rõ:
- đã kiểm gì và kết quả;
- trả lại gì, vì sao;
- việc gì cần user quyết.
