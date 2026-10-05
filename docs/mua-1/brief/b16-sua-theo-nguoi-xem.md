# Gói B16: sửa LỜI và DÀN DỰNG của Vụ 1 theo nhận xét của người xem ngoài (vòng 1)

User chơi thử tối 05/10/2026 và nói: "Hình ảnh và script vẫn không ổn. Behaviour về thao tác có vẻ đúng rồi. Bạn đưa thử cho các model khác chơi rồi nhận xét xem", rồi: "tự loop feedback và sửa vài vòng đi". Người điều phối đã quay một ván Vụ 1 thật (ảnh chụp màn hình + câu chữ từng bước) và đưa cho hai model ngoài (GPT, Gemini) xem. Gói này xử lý các nhận xét đó.

## Tư liệu (đều ở ngoài repo, đường dẫn tuyệt đối do người điều phối đưa trong lời giao)

- `quay-1/xem/phan-<1..5>/phan-canh.md`: bảng phân cảnh, từng bước của ván chơi (nơi chốn, ai đứng trên hình, thẻ tên, câu chữ).
- `quay-1/xem/phan-<n>/tam-*.jpg`: ảnh ghép 6 khung, có số KHUNG. Ảnh gốc cỡ đầy đủ: `quay-1/anh/f-XXXX.jpg` (số của tệp KHÔNG phải số khung; tra trong `quay-1/buoc.json`: mỗi bước có `so` và `anh`).
- `quay-1/nhan-xet/phan-<n>-gpt.md`, `phan-<n>-gemini.md`: nhận xét của hai model, mỗi phát hiện ghi bước/KHUNG.

## Việc phải làm

1. **Đọc hết mười bản nhận xét.** Gộp phát hiện trùng nhau.
2. **Kiểm từng phát hiện trước khi tin.** Hai model nhìn ảnh nhỏ nên có lúc nhìn nhầm (ví dụ một bên bảo Tùng "giơ ngón cái", bên kia bảo "chỉ tay"). Mở ảnh gốc cỡ đầy đủ của khung đó mà xem, đối chiếu với lời trong `noi-dung-mua-1/loi/` và ghi chú `[DÀN DỰNG]` (ghi chú này tả ảnh nền có gì, không có gì).
3. **Xếp loại** mỗi phát hiện vào đúng một ô:
   - **SỬA LỜI**: lời nói điều ảnh không có, hoặc cãi ảnh; lời gượng, sách vở, kể lể; nhân vật biết điều chưa có lý do biết; lời dẫn kể lại đúng thứ ảnh đã cho thấy. → Sửa luôn.
   - **SỬA DÀN DỰNG**: người đứng trên hình mà không dự cuộc nói chuyện, người đã đi mà còn đứng, hình nhân vật cãi lại lời dẫn (lời kể "Tùng ngủ gục" mà hình Tùng đứng cười), ảnh chèn đặt sai chỗ. → Sửa bằng lệnh trong khung: `- [RA <mã>]`, `- [VÀO <mã>]`, `- [RA player]` (xem `noi-dung-mua-1/README.md` mục 12, 13), đổi biểu cảm trong ngoặc của câu thoại sang một biểu cảm CÓ SẴN của nhân vật (xem `nhan-vat.md`), dời dòng `[ẢNH …]`, tách đoạn lời (`….1`, `….2`) để chèn lệnh vào giữa.
   - **CẦN ẢNH MỚI**: chỉ sửa được bằng vẽ thêm / vẽ lại (nền thiếu người, thiếu đồ vật, thẻ giới thiệu sai áo sai nơi, cần ảnh cận). → KHÔNG tự xoay; ghi vào danh sách "ảnh cần làm" kèm mô tả ảnh cần có. Nhưng nếu SỬA LỜI cho khớp ảnh đang có mà không mất ý truyện thì ưu tiên sửa lời, và vẫn ghi ảnh vào danh sách như việc tùy chọn.
   - **KHÔNG SỬA**: nhìn nhầm, hoặc đụng điều user đã chốt (xem dưới), hoặc là quy ước của thể loại (lời dẫn tả một việc tay chân mà hình nhân vật đứng yên: chỉ sửa khi hình CÃI lời, không sửa khi hình chỉ không minh họa). Ghi lý do một dòng.
   - **CẤU TRÚC, ĐỂ USER QUYẾT**: phát hiện đòi đổi cốt truyện, đổi thứ tự cảnh, cắt cảnh, thêm cảnh (ví dụ "135 bước rồi mà chưa thấy vụ án"). Không sửa; ghi lại nguyên ý cho user.
4. **Sửa** các mục SỬA LỜI và SỬA DÀN DỰNG trong phạm vi tệp được phép.
5. **Kiểm** rồi **báo cáo**.

## Người điều phối ĐÃ sửa (đừng làm lại, đừng hoàn tác; nhận xét trỏ vào các chỗ này thì ghi "đã sửa")

- Cảnh sảnh ký túc xá: người chơi đứng ngoài khi Hoài hỏi đường Tùng (`[RA player]`, `[RA hoai]`); thẻ "Nhân vật mới" của Tùng bật ở câu tự xưng; ô "Đi cùng" chỉ hiện người đã giới thiệu.
- Máy: câu người chơi NGHĨ THẦM (trong ngoặc đơn) không còn đưa hình người chơi lên sân khấu (hết cảnh hình người chơi chắn tờ giấy đang xem, đứng cạnh người chưa bắt chuyện); mỗi lần về cảnh bấm (khám phá, bản đồ) thì dàn chân dung xóa trắng, cuộc nói chuyện kế bắt đầu với dàn trống (hết cảnh Duy còn đứng giữa hình khi sang chào Hà Vy).
- `loi/00-mo-dau.md`: cổng KTX ("Cổng treo dây cờ đón tân sinh viên…", "Giấy báo ghi phòng 408…"), sảnh ("Thang máy ngay kia rồi."), lý do hỏi bạn áo xanh, câu tự xưng của Tùng dời ra sau "Tớ năm nhất thôi", "Du lịch mà cũng phải học Toán á?", lời cá "ba phút lên tầng bốn" nói ở sảnh còn kết quả kể trong phòng 408.
- Gói B15 (agent khác, đang chạy): đóng thẻ "Nhân vật mới" thì đi tiếp luôn (hết cảnh câu tự xưng hiện hai lần); ngày 3 tách CTSV / căng tin / phòng CLB thành ghim; hết ngày do người chơi bấm.

## Điều user ĐÃ CHỐT (không đổi; nhận xét đề nghị đổi thì xếp KHÔNG SỬA)

Đọc trước khi sửa: `noi-dung-mua-1/nen-loi/van-hoa.md`, `nen-loi/persona.md`, `nen-loi/the-canh-vu1.md`, `noi-dung-mua-1/giong/luat-giong.md`, và `docs/mua-1/giao-viec.md` mục A3. Mấy điều hay bị đụng:

- Bạn cùng lứa xưng tớ/cậu (giọng Bắc); với anh chị khóa trên xưng em; Duy xưng anh, gọi người chơi là em. Người chơi là nam.
- Người chơi là tân sinh viên bình thường, không tự phát hiện chi tiết tinh vi; người tinh ý là Hà Vy, cô ấy chỉ cho người chơi.
- Tùng là tân sinh viên cùng phòng, hay cá cược và hay cá sai: trò đùa chạy dài có chủ ý, không cắt, không đổi số đếm.
- Suy nghĩ của người chơi là câu tự hỏi ngắn của một người thật, không kể lể, không giải thích hộ tác giả; lời dẫn không nói điều hiển nhiên, không nhắc lại điều ảnh đã cho thấy.
- Điều không hay xảy ra thì cho thấy hậu quả, không kể suông. Gợi ý không liệt kê.
- Ngoài đời ít ai tự xưng tên khi không được hỏi: tên lộ qua người khác gọi, hoặc khi hoàn cảnh buộc xưng (làm quen cùng phòng, trình bày với thầy cô).
- Lời thoại cốt truyện không hướng dẫn thao tác (bấm gì, kéo gì); việc đó của bạn đi cùng.
- Không gạch dài (—), không mũi tên trong chữ hiện cho người chơi.
- "AI gọt lời, không viết cảnh mới": sửa tối thiểu cho khớp và cho tự nhiên; không thêm cảnh, không thêm tình tiết, không đổi manh mối, không đổi thứ tự cảnh. Câu nào mang dữ kiện vụ án (giờ, nơi, tên, số) thì giữ nguyên dữ kiện.

## Phạm vi tệp

**Được sửa:** `noi-dung-mua-1/loi/00-mo-dau.md`, `01-ngay-1.md`, `02-ngay-2.md`, `04-ngay-4.md`, `05-ngay-5.md`, `06-hop-va-ket.md`; `noi-dung-mua-1/kich-ban/00-mo-dau.md`, `01-ngay-1.md`, `05-ngay-5.md`, `06-hop-va-ket.md`; các tờ `noi-dung-mua-1/hoi-dap/*.json` TRỪ `dong-hanh.json` và `chung.json` (chỉ sửa chữ của lời; giữ nguyên mã, cấu trúc, và mọi chữ trong `chuBatBuoc` phải còn trong lời biến thể); `noi-dung-mua-1/nhan-vat.md` (chỉ dòng `- Khi chưa quen:` và các dòng của thẻ giới thiệu khi thẻ lộ điều người chơi chưa có lý do biết).

**KHÔNG sửa** (agent B15 đang làm): `kich-ban/02-ngay-2.md`, `03-ngay-3.md`, `04-ngay-4.md`, `loi/03-ngay-3.md`, `loi/tt-*.md`, `hoi-dap/dong-hanh.json`, mọi thứ trong `src/`, `tools/`. Phát hiện rơi vào các tệp này: viết sẵn đề nghị sửa (nguyên văn trước / sau, hoặc lệnh `[RA x]` đặt trước dòng nào) vào báo cáo để người điều phối áp sau.

Thấy tệp nào đổi mà không phải do bạn thì đó là agent B15 hoặc người điều phối: để yên.

## Ràng buộc

Không `npm install`; không commit, không push, không đổi nhánh, không stash, không `git checkout`/`restore` tệp nào ngoài `prototype/.vite-canary`; không chạy cả bộ `npm test`; vitest `--maxWorkers=2` chỉ tệp nêu dưới; không dev server, không trình duyệt. Sửa lời chỉ trong khối `## <mã>` sẵn có hoặc khối mới do bạn tách ra; mỗi khối phải được một dòng `- [LỜI <mã>]` trong khung trỏ tới.

## Kiểm trước khi báo (trong `prototype/`, lần lượt)

`npm run noi-dung:sinh:mua1`; `npm run kiem-noi-dung:mua1` (không lỗi); `npm run kiem-noi-dung:mvp` (không đổi); `npm run kiem-giong:mua1 -- --chi-loi` (0 lỗi); `npx vitest run --maxWorkers=2 src/content/real/testing/mua1-t0.test.ts src/content/real/testing/hoi-dap-mua1.test.ts src/mvp/engine/quan-sat-sanh-ktx.test.ts src/mvp/engine/hoi-dap.test.ts src/mvp/engine/hoi-dap-vu-1.test.ts src/mvp/engine/gioi-thieu.test.ts`; `git checkout -- .vite-canary`. Nếu một lệnh đỏ vì tệp của agent B15 đang dở (không phải tệp của bạn) thì chạy lại sau vài phút; vẫn đỏ thì ghi rõ lỗi là của tệp nào.

## Báo cáo (tiếng Việt, không lời mở)

1. Bảng mọi phát hiện đã gộp: `phần · bước/KHUNG · ai nêu (GPT, Gemini, cả hai) · tóm tắt · xếp loại · đã làm gì`.
2. Nguyên văn TRƯỚC và SAU của mọi câu đã sửa, theo tệp và mã đoạn. Lệnh dàn dựng đã thêm, đặt trước dòng nào.
3. Đề nghị cho các tệp không được sửa (nguyên văn, đủ để áp ngay).
4. Danh sách "ảnh cần làm", xếp theo mức ảnh hưởng: khung nào, hiện có gì, cần gì.
5. Mục "cấu trúc, để user quyết".
6. Dòng cuối thật của từng lệnh kiểm.
