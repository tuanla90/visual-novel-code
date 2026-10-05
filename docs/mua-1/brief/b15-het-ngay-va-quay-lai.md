# Gói B15: người chơi tự bấm hết ngày, nơi đã ghé vào lại được (bộ nội dung mùa 1)

Nối tiếp gói B13 (`b13-dieu-huong-tu-do.md`, đã commit 491cbff). Chạy SAU gói B14.

## Góp ý của user (tối 05/10/2026, sau khi chơi thử)

> "Cơ chế sang ngày mới đang như thế nào thế? Trừ các đoạn tự động chuyển theo cốt truyện thì để user chủ động bấm sang ngày chứ?"

Hiện trạng (đã tra trong `src/mvp/engine/may.ts`): ngày kiểu `theo-truyen` chạy một chuỗi; hết chuỗi là `ketThucNgay` rồi `batDauNgay` ngày kế, người chơi không được hỏi. Ví dụ ngày 2: giải xong màn tra `c-lop` là `[ĐI CÙNG n2-toi]` (gói B13 đã cho máy tự đi) sang cảnh tối rồi sang ngày 3. Các ghim "?" chưa ghé và chi tiết ẩn chưa xem mất luôn.

Khi tôi (người điều phối) chơi tay sau gói B13 còn thấy thêm:

1. **Ghim đã ghé bị khóa.** Rời Phòng Đào tạo về bản đồ rồi thì ghim "Phòng Đào tạo, đã ghé" là nút `disabled` (`KhamPhaMvp.tsx`, `disabled={d.daXem}`), không vào lại xem tờ lịch treo tường được nữa.
2. **Ô nhắc việc không đổi.** Xong việc với cô Hạnh, ô "Việc đang làm" vẫn ghi "Minh Anh nhắc: Được xem đúng quyền thôi. Tới đó hỏi cô là rõ." cho tới khi vào phòng CLB.
3. **Ngày 3** (báo cáo của agent B13): ghim CTSV kéo liền CTSV → căng tin → phòng CLB bằng `[ĐI CÙNG]`, bản đồ mất hẳn sau cú bấm đầu.

## Nguyên tắc (giữ của B13, thêm ba điều)

- Ngày có bản đồ (ngày 2, 3, 4 của Vụ 1): **hết ngày là do người chơi bấm**. Việc chính của ngày xong thì người chơi vẫn ở lại, đi đâu tùy ý; có một nút rõ ràng để hết ngày.
- Đoạn chuyển theo cốt truyện giữ tự động: mở đầu, ngày 1, ngày 5, buổi họp, kết; và cảnh tối sau khi người chơi đã bấm hết ngày chạy liền sang sáng hôm sau như cũ.
- Nơi đã ghé **vào lại được** chừng nào ngày chưa hết.
- Không ngõ cụt: việc chính chưa xong thì chưa có nút hết ngày (hoặc nút mờ kèm lý do), để người chơi không tự khóa mình.

## Việc phải làm

A. **Hết ngày do người chơi bấm.**
   - Cú pháp kịch bản mới, ví dụ `- [HẾT NGÀY n2-toi] Về phòng KTX ăn tối` thay cho `[ĐI CÙNG n2-toi] …` ở chỗ kết việc chính của ngày (bộ đọc, máy kiểm, `sinh-mua1.ts`, truyện chữ `tools/truyen-chu.ts` đều phải hiểu; bộ MVP không dùng cú pháp này).
   - Máy gặp nút này thì KHÔNG chạy chuỗi tối. Nó ghi nhận "hôm nay hết ngày được" (kèm chuỗi tối và nhãn), rồi đưa người chơi về cảnh đang đứng (cảnh đã mở việc chính, như đường lùi của màn tra ở B13).
   - Từ lúc đó, bản đồ và mọi cảnh khám phá trong ngày có nút hết ngày mang nhãn của dòng kịch bản. Bấm thì chạy chuỗi tối rồi sang ngày kế như hiện nay. Nút này khác hẳn nút "Về bản đồ" (vị trí, màu), để không bấm nhầm; có một bước xác nhận ngắn nếu còn ghim "!" hoặc "?" chưa ghé ("Còn 2 nơi chưa ghé. Vẫn về?").
   - Áp cho ngày 2, 3, 4 của Vụ 1. Ngày 4 có hai nhánh cùng dẫn tới `n4-toi`: xử lý cả hai. Rà Vụ 2 tới Vụ 5 và các việc phụ: chỗ nào cùng dạng (ngày có bản đồ, kết bằng `[ĐI CÙNG <chuỗi tối>]`) thì liệt kê trong báo cáo, CHƯA sửa nội dung các vụ đó.
   - Ô nhắc việc và bạn đi cùng (lời viết sẵn) sau khi việc chính xong phải nói được "việc hôm nay xong rồi, muốn về thì bấm …" bằng giọng nhân vật, không nói tên nút kiểu máy móc. Lời theo `noi-dung-mua-1/giong/` và `nen-loi/`.

B. **Nơi đã ghé vào lại được.**
   - Ghim "đã ghé" trên bản đồ bấm được: vào thẳng cảnh khám phá của nơi đó, không đọc lại đoạn lời lúc tới; chỗ đã xem vẫn hiện là đã xem, chỗ chưa xem (chi tiết ẩn, điểm "?") bấm được.
   - Nhân chứng ở nơi đó: bấm lại thì mở lại buổi hỏi với tiến độ cũ (dòng "Cần làm rõ" còn thiếu vẫn hỏi tiếp được; đã đủ thì nhân chứng nói một câu ngắn viết sẵn kiểu "còn gì nữa không cháu", lấy từ lớp lời có sẵn của tờ hỏi đáp nếu có).
   - Ghim đã ghé và đã xem hết mọi chỗ: vẫn vào được, chỉ khác dấu trên ghim.

C. **Ngày 3 không còn kéo liền ba nơi.** Dựng lại `kich-ban/03-ngay-3.md` để sau CTSV người chơi về lại bản đồ; căng tin và phòng CLB thành ghim việc chính lần lượt hiện ra (`sau:`), giống cách ngày 2 làm với Phòng Đào tạo → Phòng CLB. CTSV có cảnh khám phá của nó (cô Lan, Quân là điểm bấm; chi tiết ẩn nếu ảnh có) để buổi hỏi `n3-ctsv` quay lại được. Lời chuyển cảnh nào vì thế mà hụt ("Tạt qua căng tin", "Về phòng CLB") thì sửa tối thiểu ở `loi/03-ngay-3.md`, đúng `nen-loi/` và `giong/`; chép nguyên các câu đã sửa vào báo cáo. Ngày 4: rà theo cùng tinh thần, sửa nếu sửa được mà không đổi cốt truyện; chỗ nào phải đổi cốt truyện thì KHÔNG sửa, ghi vào báo cáo.

D. **Ô nhắc việc theo kịp.** Xong việc chính ở một nơi thì ô "Việc đang làm" chuyển sang việc kế (hoặc ẩn), không giữ câu nhắc cũ.

## Ràng buộc

Như gói B13: chỉ bộ mùa 1 (cờ `dieuHuongTuDo` hoặc cú pháp mới), bộ MVP chạy y như cũ; máy tự chơi (`tu-choi.ts`) chơi hết Vụ 1 với luật mới và `hoi-dap-vu-1.test.ts`, `dieu-huong-tu-do.test.ts` vẫn qua mà không nới điều kiện; điểm nhảy của người quan sát còn dùng được; lưu và nạp giữa chừng (đang chờ hết ngày, đang ở nơi vào lại) không hỏng; ô lưu tạo trước gói này nạp vẫn chơi tiếp được. Không `npm install`, không commit, không push, không đổi nhánh, không chạy cả bộ `npm test`, vitest `--maxWorkers=2` trên tệp liên quan, không dev server, không trình duyệt. Gộp `import { X, type A }`. CSS màn hẹp sửa cả `.game--portrait` lẫn `@media`. Nút mới không được nằm dưới khung "Đi cùng" (góc phải trên, z-index 41) hay đè nút "Về bản đồ" (góc phải dưới). Chữ hiện cho người chơi: tiếng Việt có dấu, không gạch dài. Không sửa `docs/mua-1/giao-viec.md`.

## Test phải có

- Ngày 2: giải xong `c-lop` thì vẫn ở phòng CLB (cảnh khám phá), ngày chưa đổi; có nút hết ngày; bấm thì đọc cảnh tối rồi sang ngày 3.
- Trước khi việc chính xong: không hết ngày được.
- Sau khi việc chính xong: về bản đồ, vào ghim "?" chưa ghé, xem xong, rồi mới hết ngày; hồ sơ có thêm thứ nơi đó cho.
- Ghim đã ghé: vào lại, chi tiết ẩn chưa xem bấm được; nhân chứng hỏi dở hỏi tiếp được, tiến độ giữ.
- Ngày 3: sau CTSV về bản đồ, ghim căng tin hiện; sau căng tin ghim phòng CLB hiện; đủ manh mối như trước (`clue-can-ma-va-can-cu`, `clue-phieu-tra-cuu`, và các manh mối của căng tin).
- Lưu và nạp ở trạng thái "chờ hết ngày".
- Bộ MVP: test sẵn có không đổi kết quả.

## Kiểm trước khi báo (ở `prototype/`, lần lượt)

`npm run noi-dung:sinh:mua1`; `npm run kiem-noi-dung:mua1`; `npm run kiem-noi-dung:mvp`; `npm run kiem-giong:mua1 -- --chi-loi` (0 lỗi); `npm run truyen-chu:mua1` (chạy được, đoạn ngày 3 đọc liền mạch); vitest trên tệp thêm, tệp đụng, cùng `src/mvp/engine/` và `src/mvp/ui/` (hai thư mục này chạy riêng từng đợt), `src/mvp/store/kho-mvp.test.ts`, `src/content/real/testing/mua1-t0.test.ts`, `hoi-dap-mua1.test.ts`; `npm run typecheck`; `git checkout -- .vite-canary`.

Báo cáo: tệp thêm và sửa; bảng các chỗ đã đổi và chỗ cố ý giữ (kèm lý do); nguyên văn mọi câu chữ mới hoặc sửa; dòng cuối thật của từng lệnh; điều không kiểm được vì không có trình duyệt và chỗ nên thử tay; việc chưa làm hoặc còn ngờ.

## Bổ sung 06/10 (sau gói B14)

E. **Màn tra nhận cả câu hẹp hơn mà vẫn đủ.** Ở `c-ten-h`, user ghép `ten bắt đầu bằng H VÀ ma_lop = BC24A`, ra đúng hai dòng Hiếu và Hoài, nhưng máy chấm sai vì SQL chuẩn là cả lớp BC24A (32 dòng) rồi dò mắt. Sau B14 Hà Vy bảo "cứ để nguyên danh sách cả lớp đã, kẻo mình lọc sót ai": người chơi làm đúng, làm giỏi hơn mà bị bắt làm lại. Sửa bằng một luật chung cho thẻ có `Bấm ô lấy giấy nhớ` mà vật chứng chỉ giữ một phần giá trị của cột (kiểu `ev-hai-ma`): lần chạy được tính là ĐÚNG khi (1) có đủ các cột nộp / cột lấy giấy nhớ, (2) mọi dòng kết quả đều nằm trong tập dòng của SQL chuẩn (so theo cột lấy giấy nhớ), và (3) kết quả chứa đủ MỌI giá trị của vật chứng. Sau đó người chơi vẫn bấm các ô thuộc phiếu như B14 đã làm (ở đây là cả hai dòng). Lời "Khi chạy ra 2 dòng" của Hà Vy ở `loi/tt-c-ten-h.md` đổi thành lời nhận ("Hai người. Lọc thẳng theo chữ đầu của tên, gọn hơn tớ nghĩ."), viết đúng `giong/` và `nen-loi/persona.md`; gợi ý "khi chạy ra 2 dòng" khi còn thiếu cột thì nhắc lấy mã như nhánh thiếu cột. Câu rộng hơn chuẩn, hoặc hẹp mà thiếu một giá trị của vật chứng (chỉ ra Hiếu), vẫn là chưa đúng. Có test cho ba trường hợp: hẹp mà đủ (đúng), hẹp mà thiếu (sai, có lời), rộng hơn (sai). Thẻ không có `Bấm ô lấy giấy nhớ` giữ cách chấm cũ. Bộ MVP không đổi.

F. **Đóng thẻ "Nhân vật mới" thì đi tiếp luôn.** Hiện bấm "Tiếp tục" ở câu tự xưng thì thẻ bật; đóng thẻ xong màn vẫn đứng ở chính câu ấy (chỉ đổi thẻ tên), người chơi phải bấm thêm lần nữa và đọc lại câu cũ. Sửa ở `ManChoiMvp.tsx` (`dongGioiThieu`): đóng thẻ là ghi nhận rồi sang câu kế. Test giao diện có sẵn cho thẻ giới thiệu phải qua (sửa nếu nó khẳng định hành vi cũ, ghi vào báo cáo).

**Người điều phối đang sửa song song** (đừng hoàn tác, đừng "sửa lại" nếu thấy đổi): các tệp lời `noi-dung-mua-1/loi/00-mo-dau.md`, `01-ngay-1.md`, `02-ngay-2.md`, `04-ngay-4.md`, `05-ngay-5.md`, `06-hop-va-ket.md` (chỉ sửa câu chữ, không đổi cấu trúc), `noi-dung-mua-1/nhan-vat.md`, và `src/mvp/ui/SanKhauMvp.tsx`. Phần của bạn ở lời là `loi/03-ngay-3.md`, `loi/tt-c-ten-h.md` và các câu nhắc việc / lời bạn đi cùng cho việc hết ngày. Nếu cần sửa một câu trong tệp của người điều phối thì ghi vào báo cáo, đừng sửa. `kich-ban.gen.ts` sinh lại lúc nào cũng được.
