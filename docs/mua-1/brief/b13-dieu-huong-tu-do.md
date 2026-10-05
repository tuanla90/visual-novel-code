# Gói B13: điều hướng tự do (bộ nội dung mùa 1)

User chơi thử Vụ 1 tối 05/10/2026 và trả lại phần điều hướng. Nguyên văn ý:

1. "Với những phần như button xuống xe, đi vào tòa nhà thì tôi nghĩ nên tự động."
2. "User ở world map, bấm vào 1 point để chat với cô giáo, chat xong nên ở đó để user tự xem có điểm nào chưa khai thác không thì bạn lại tự động đẩy về world map?"
3. "Ở phần query có thể back về bảng thông tin, từ bảng thông tin cũng phải back lại về được phòng CLB."
4. "Nói chung là phải cho user freely khám phá đi đâu thì đi chứ?"

## Nguyên tắc

- Người chơi tự quyết đi đâu, ở lại hay rời đi. Máy KHÔNG tự đẩy người chơi sang nơi khác khi nơi đang đứng còn thứ để xem.
- Chỗ chỉ có một đường đi thì máy tự đi, không bắt bấm một nút duy nhất.
- Màn nào cũng có đường lùi ra: màn tra về bảng thông tin, bảng thông tin về cảnh đang đứng (phòng CLB), cảnh về bản đồ.
- Không ngõ cụt: rời đi khi việc chính chưa xong thì việc đó vẫn còn đó (ghim bản đồ, điểm bấm, nhiệm vụ vẫn báo), quay lại làm tiếp được, tiến độ dở dang giữ nguyên.
- Phần cốt truyện (chuỗi lời kể, thẻ chữ, buổi họp, kết) vẫn đọc tuần tự như cũ.

## Việc phải làm

A. **Chuyển cảnh một đường thì tự động.** Dòng `- [ĐI CÙNG <chuỗi>] <nhãn>` (ví dụ "Xuống xe", "Tới cổng ký túc xá", "Vào sảnh", "Lên phòng 408", "Đi cùng Tùng ra tòa B") hiện ra một nút duy nhất kèm chữ "Chọn là chốt, không quay lại được". Sửa: hết lời của chuỗi thì máy tự sang chuỗi đích, không hiện nút. Nhãn có thể hiện thoáng như một dòng chuyển cảnh nếu giao diện sẵn có cho phép, không thì bỏ. Rẽ nhánh thật (`[RẼ NHÁNH]`, từ hai lựa chọn trở lên) giữ nguyên.

B. **Tới một nơi từ bản đồ thì ở lại nơi đó.** Khi người chơi bấm một ghim trên bản đồ, vào cảnh khám phá của nơi đó, làm xong một điểm (nói chuyện, hỏi đáp, xem vật) thì máy đưa về ĐÚNG cảnh khám phá của nơi đó, các điểm chưa xem vẫn bấm được, kể cả chi tiết ẩn. Chỉ về bản đồ khi người chơi tự bấm nút rời đi (thêm nút rõ ràng ở cảnh khám phá, ví dụ "Về bản đồ"). Việc chính của nơi đó xong rồi thì ghim trên bản đồ đổi trạng thái như hiện nay, nhưng KHÔNG tự đẩy đi. Rà cả các nơi không vào từ bản đồ (sảnh tòa B ngày 1, phòng CLB): làm xong một điểm cũng phải về lại cảnh, không tự nhảy tiếp khi còn điểm chưa xem; khi mọi điểm chính đã xong thì hiện đường đi tiếp để người chơi tự bấm.

C. **Màn tra có đường lùi.** Từ màn gõ / ghép câu tra lùi được về bảng thông tin (màn liệt kê bảng, phiếu, đề bài của màn tra; xem `src/mvp/ui/v7/PhongTraMvp.tsx` và các tệp trong `v7/`), từ bảng thông tin lùi được về cảnh đã mở nó (phòng CLB, phòng máy). Rời màn tra khi chưa giải xong thì điểm mở màn tra ở cảnh vẫn còn dấu việc chính; quay lại thì câu đang soạn và các phiếu đã có còn nguyên. Áp cho mọi màn tra của Vụ 1 trừ các màn tra nằm trong buổi họp (ở đó người chơi đang bị chất vấn, không rời đi được).

D. **Rà toàn bộ Vụ 1** (`prototype/noi-dung-mua-1/kich-ban/00-mo-dau.md` tới `06-hop-va-ket.md`) tìm mọi chỗ máy ép di chuyển hoặc không có đường lùi, sửa theo nguyên tắc, và liệt kê trong báo cáo: chỗ nào đã đổi, chỗ nào cố ý giữ (kèm lý do).

## Ràng buộc

- Chỉ áp cho bộ nội dung mùa 1 (`?bo=mua-1`). Bộ MVP (`?bo=mvp`, `noi-dung-mvp/`) phải chạy y như cũ: dùng một cờ của kịch bản do `sinh-mua1.ts` đặt, đừng đổi hành vi mặc định.
- Máy tự chơi (`src/mvp/engine/tu-choi.ts`) phải chơi được hết Vụ 1 mùa 1 với luật mới: sửa nó cho biết tự rời nơi, tự mở lại màn tra. Test `src/mvp/engine/hoi-dap-vu-1.test.ts` (ba cách chơi, tới kết thật) phải qua, không được nới điều kiện.
- Điểm nhảy của người quan sát (`nhayToi`, `dauChuongMvp`) vẫn dùng được với bộ mùa 1.
- Lưu và nạp ván giữa chừng (đang ở một nơi, đang dở màn tra) không hỏng.
- Không `npm install`; không commit, không push, không đổi nhánh; không chạy cả bộ `npm test`; vitest luôn `--maxWorkers=2`, chỉ tệp liên quan; không mở dev server, không dùng trình duyệt. Gộp `import { X, type A }` khi lấy cả giá trị lẫn kiểu từ một mô-đun. Chữ hiện cho người chơi là tiếng Việt có dấu, không gạch dài. Sửa CSS màn hẹp thì sửa cả `.game--portrait` lẫn `@media`.

## Test phải có

- Chuỗi kết bằng một `[ĐI CÙNG]`: hết lời là sang chuỗi đích, không có khung nhìn chọn nhánh một nút.
- Vào một nơi từ bản đồ, làm xong điểm chính: khung nhìn vẫn là cảnh khám phá của nơi đó, chi tiết ẩn còn bấm được; bấm rời đi mới về bản đồ.
- Rời một nơi khi điểm chính chưa xong: ghim còn, quay lại làm tiếp được, không mất tiến độ buổi hỏi đáp.
- Màn tra: lùi về bảng thông tin, lùi tiếp về cảnh; mở lại thì câu đang soạn và phiếu còn; điểm mở màn tra còn dấu việc chính cho tới khi giải xong.
- Bộ MVP: các test sẵn có của máy và giao diện không đổi kết quả.

## Kiểm trước khi báo (ở `prototype/`, lần lượt)

`npm run noi-dung:sinh:mua1`; `npm run kiem-noi-dung:mua1`; `npm run kiem-noi-dung:mvp`; `npm run kiem-giong:mua1 -- --chi-loi`; vitest trên các tệp bạn thêm hoặc đụng cùng `src/mvp/engine/may.test.ts`, `kham-pha.test.ts`, `chuong-1.test.ts`, `tu-choi.test.ts`, `hoi-dap.test.ts`, `hoi-dap-vu-1.test.ts`, `lich-mua-1.test.ts`, `vu-2.test.ts`, `src/mvp/store/kho-mvp.test.ts`, `src/content/real/testing/mua1-t0.test.ts` và các `src/mvp/ui/*.test.tsx` liên quan; `npm run typecheck`; `git checkout -- .vite-canary`.

Báo cáo ngắn bằng tiếng Việt: tệp thêm và sửa; bảng rà ở mục D; dòng cuối thật của từng lệnh kiểm; điều không kiểm được vì không có trình duyệt; việc chưa làm hoặc còn ngờ. Có lệnh chưa qua thì nói rõ.
