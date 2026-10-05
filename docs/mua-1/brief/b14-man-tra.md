# Gói B14: màn tra dễ dùng hơn (bộ nội dung mùa 1)

User chơi thử màn tra "Tên bắt đầu bằng H trong hai lớp" (`c-ten-h`, ngày 3) tối 05/10/2026 và góp sáu ý. Chạy SAU gói B13 (B13 đang sửa đường lùi của màn tra trong `src/mvp/ui/v7/`).

## Góp ý nguyên văn của user

1. "Tính năng hover, di chuột lên để chọn màu hơi khó dùng." (dải năm chấm màu hiện ra khi rê chuột lên ghim của thẻ)
2. "Màn này tại sao tôi không pass được." Ảnh chụp: câu `SELECT ho_dem, ten, ma_lop FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop IN ('BC24A', 'BC23A')` ra đúng 2 dòng Hiếu, Hoài nhưng game không cho qua.
3. "Các ảnh giấy nhớ bị dán sát quá."
4. "Có thêm được animation nếu lần đầu query đã trả về bảng thì tiếp tục rụng dòng không?"
5. "Animation chỉ có lần đầu chạy, lần sau không chạy à."
6. "Các thẻ chữ bị hiển thị tối giản quá dẫn đến khó hiểu. H xuống dòng H? Trong khi nên là chữ ký lá thư có ký tự đầu là H có phải dễ hiểu hơn không?"

## Chẩn đoán ý 2 (đã tra)

`thu-thach/c-ten-h.md` đòi cột `ma_sv` ("Bẫy: quên chọn ma_sv", "Bấm ô lấy giấy nhớ: ma_sv"). User chưa tích `ma_sv` ở "LẤY CỘT". Lời phản hồi "Khi thiếu cột" của Duy đã bị sửa cho bớt chỉ cách bấm (theo quyết định 05/10: hướng dẫn thao tác dồn về bạn đi cùng) thành "Chỉ có tên thì phiếu này chưa chỉ đúng người.", và ở màn tra người chơi không hỏi được bạn đi cùng. Kết quả: người chơi kẹt mà không biết thiếu gì.

## Việc phải làm

A. **Không để kẹt ở màn tra.**
   - Khi kết quả đúng tập dòng nhưng thiếu cột bắt buộc (hoặc sai điều kiện "sai có ích" nào đó), lời phản hồi phải HIỆN RÕ và ở lại trên màn cho tới lần chạy sau (kiểm lại vì sao ở ảnh chụp không thấy lời Duy).
   - Bạn đi cùng có mặt ở màn tra (avatar góc phải như các màn khác). Bấm vào hoặc chạy trượt hai lần liền thì bóng thoại gợi ý hai bậc, lời viết sẵn theo từng màn tra: bậc 1 nói điều còn thiếu về mặt điều tra ("Có tên rồi, nhưng cô Lan tra sổ bằng gì?"), bậc 2 nói thẳng thao tác ("Lấy thêm cột mã sinh viên rồi chạy lại."). Đây là chỗ DUY NHẤT được nói thao tác. Người gõ lệnh là người chơi; Hà Vy, Tùng, Duy không nói từ của câu lệnh (xem `giong/luat-giong.md` mục "Thuật ngữ theo vai"): bậc 2 nói bằng chữ trên màn hình ("LẤY CỘT", tên cột), không nói SELECT, WHERE.
   - Cú pháp gợi ý trong thẻ thử thách và máy kiểm (gợi ý bậc 1 không lộ đáp án, có đủ hai bậc cho mọi màn tra trên tuyến chính của Vụ 1). Viết gợi ý cho các màn tra của Vụ 1: `c-bang-lop`, `c-cot-lop`, `c-lop`, `c-ten-h`, `c-in`, và các màn ở buổi họp nếu ở đó có bạn đi cùng.

B. **Chọn màu ghim bằng bấm, không bằng rê chuột.** Bấm vào ghim thì dải màu mở ra và Ở LẠI cho tới khi chọn màu hoặc bấm ra ngoài; chấm màu đủ to để bấm bằng ngón tay; dùng được bằng bàn phím. Bỏ kiểu chỉ hiện khi rê chuột.

C. **Giấy nhớ không dán sát nhau.** Hai cột giấy nhớ hai bên màn tra: giãn khoảng cách giữa các tờ và với mép laptop, không tờ nào che chữ của tờ khác hay che khung tra; màn hẹp thì xếp lại cho gọn.

D. **Chữ trên giấy nhớ phải đọc là hiểu.** Hiện tờ giấy chỉ in giá trị ("H") và nhãn nhỏ ("H"). Sửa: mỗi tờ in một câu ngắn nói đó là gì, giá trị dùng để kéo vào ô lọc được làm nổi trong câu. Thêm trường nội dung cho giấy nhớ (ví dụ `- Chữ trên giấy:` ở `ho-so/`), đọc qua bộ đọc, có máy kiểm (bắt buộc có cho giấy nhớ dùng ở màn tra, tối đa khoảng 60 ký tự, chứa đúng giá trị). Viết cho các giấy nhớ và phiếu của Vụ 1, ví dụ: "Chữ ký trên thư bắt đầu bằng chữ **H**", "Thư được bỏ vào hộp ở tòa **B**", "Thẻ lịch của khoa **Báo chí**", "Thẻ lịch của khóa **K24**", "Hai lớp còn lại: **BC24A, BC23A**". Lời theo `nen-loi/van-hoa.md` và `giong/`.

E. **Hoạt cảnh rụng dòng chạy ở mọi lần chạy.** Lần chạy nào cũng có hoạt cảnh, không chỉ lần đầu. Khi màn đã có bảng kết quả của lần chạy trước và lần chạy mới làm bảng hẹp lại, hoạt cảnh đi TỪ bảng đang có: các dòng không còn khớp rụng đi, dòng còn lại dồn lên. Khi lần chạy mới ra bảng rộng hơn hoặc khác hẳn thì dùng hoạt cảnh như lần đầu. Tôn trọng thiết lập giảm chuyển động của máy.

## Ràng buộc

Như gói B13: chỉ bộ mùa 1 đổi nội dung, giao diện màn tra dùng chung thì bộ MVP không được hỏng (các test sẵn có của `v7/` phải qua); không `npm install`, không commit, không push, không đổi nhánh, không chạy cả bộ `npm test`, vitest `--maxWorkers=2` trên tệp liên quan, không dev server, không trình duyệt; gộp `import { X, type A }`; sửa CSS màn hẹp ở cả `.game--portrait` lẫn `@media`; chữ hiện cho người chơi là tiếng Việt có dấu, không gạch dài.

## Kiểm trước khi báo

`npm run noi-dung:sinh:mua1`; `npm run kiem-noi-dung:mua1`; `npm run kiem-noi-dung:mvp`; `npm run kiem-giong:mua1 -- --chi-loi`; `npm run kiem-ky-nang:mua1` (so với trước khi sửa, không tăng lỗi); vitest trên tệp thêm, tệp đụng và các test của `src/mvp/ui/v7/`, `src/mvp/engine/sql-mvp.test.ts`, `bang-dieu-tra.test.ts`, `giay-nho.test.ts`, `hoi-dap-vu-1.test.ts`, `src/content/real/testing/mua1-t0.test.ts`; `npm run typecheck`; `git checkout -- .vite-canary`. Báo cáo: tệp thêm và sửa, lời gợi ý và chữ trên giấy đã viết (chép nguyên để người duyệt đọc), dòng cuối thật của từng lệnh, điều không kiểm được vì không có trình duyệt, việc chưa làm.
