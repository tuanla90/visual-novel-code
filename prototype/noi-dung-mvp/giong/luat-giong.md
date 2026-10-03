# Luật giọng — máy kiểm đọc tệp này

<!-- Bộ đọc nội dung game BỎ QUA thư mục giong/. Tệp này chỉ dành cho `npm run kiem-giong` (tools/noi-dung/kiem-giong.ts)
và cho người / AI viết lời. Sửa luật ở đây, không sửa trong code. Mỗi mục một dòng, cú pháp ghi ở đầu từng phần.
Phần chữ cho người đọc (tính cách, giọng, ví dụ) nằm ở docs/mvp/v2-thoai/brief-chung.md; tệp này là phần MÁY KIỂM ĐƯỢC của brief ấy. -->

## Thứ tự truyện

<!-- Tên tệp lời (không đuôi .md) theo thứ tự ngày trong truyện. Luật có "từ:" / "trước:" tính theo thứ tự này.
Tệp lời mới phải thêm vào đây, thiếu là lỗi. -->

- 00-mo-dau · 08/09–23/09/2024
- 01-ngay-1 · 24/09
- 02-ngay-2 · 25/09
- tt-c-lop
- 03-ngay-3 · 26/09
- tt-c-ten-h
- 04-ngay-4 · 27/09
- tt-c-in
- 05-ngay-5 · 28/09
- 06-hop-va-ket · 30/09
- 10-vu-2-tin-don · 09/10
- tt-tin-don
- 11-vu-3-tranh-cai · 20–22/10
- tt-tranh-cai
- 23-phu-dan-lac · 25/10
- tt-phu-dan-lac
- 25-phu-tui-do · 30/10
- tt-phu-tui-do
- 20-phu-so-phong · 01/11
- tt-v2-loc-buoi
- 12-vu-4-giup-nam · 04/11
- tt-giup-nam
- 21-phu-micro · 15/11
- tt-phu-micro
- 13-vu-5-so-quy · 16–27/11
- tt-so-quy
- 24-phu-hoc-tro-cu · 20/11
- tt-phu-hoc-tro-cu
- 22-phu-hoan-tien · 29/11
- tt-phu-hoan-tien

## Xưng hô

<!-- `- <mã người nói> · không nói: <từ>, <từ> [· từ: <tệp>] [· trước: <tệp>] [· vì: <lý do>]`
Từ so nguyên từ, không phân biệt hoa thường. "từ:" = áp dụng từ tệp ấy trở đi; "trước:" = chỉ áp dụng trước tệp ấy.
Chốt 03/10/2026: Duy anh/em với năm nhất; người chơi xưng theo người được nói tới; Hiếu đổi xưng hô theo cung. -->

- tung · không nói: tôi · vì: năm nhất, tớ/cậu với bạn, em với khóa trên
- ha-vy · không nói: tôi · vì: năm nhất, tớ/mình/cậu
- player · không nói: tôi · vì: tớ/cậu với bạn, em với khóa trên và thầy cô
- minh-anh · không nói: tớ, cậu, các cậu · vì: năm ba, chị/em với năm nhất và năm hai
- duy · không nói: tớ, cậu, các cậu · vì: năm hai, anh/em với năm nhất, em/chị với Minh Anh (chốt 03/10)
- quan · không nói: tớ, cậu, các cậu · vì: tôi/các bạn, lạnh, công vụ
- hieu · không nói: tớ, các cậu · trước: 10-vu-2-tin-don · vì: Vụ 1 còn gắt, tôi/các bạn
- hieu · không nói: tôi · từ: 10-vu-2-tin-don · vì: từ Vụ 2 đã gỡ tin, tớ/các cậu với nhóm (vẫn "em" với cô Lan)
- thay-quang · không nói: tôi, tớ · vì: thầy/các em
- co-hanh · không nói: tôi, tớ · vì: cô/các em
- co-lan · không nói: tôi, tớ · vì: cô/các em
- bac-tu · không nói: tôi, tớ · vì: bác/cháu
- chu-cuong · không nói: tôi, tớ · vì: chú/cháu
- ba-lua · không nói: tôi, tớ · vì: bà/các cháu

## Cách gọi

<!-- `- <tên> → <cách gọi đúng> · người nói: <mã>, <mã>`
Trong lời của những người nói ấy, <tên> phải đứng sau <cách gọi đúng> (vd. "anh Duy"). Lời dẫn (narrator) gọi trống. -->

- Duy → anh Duy · người nói: tung, ha-vy, player, hoai, hieu
- Minh Anh → chị Minh Anh · người nói: tung, ha-vy, player, hoai, hieu, duy

## Cụm dành riêng

<!-- `- "<cụm>" · chỉ: <mã>, <mã> · vì: …` — cụm là nét riêng của một nhân vật; người khác nói (hay dùng để tả người khác) là cảnh báo. -->

- "nói thẳng" · chỉ: hieu · vì: nét của Hiếu; Hoài rụt rè, bạo dần, không "nói thẳng" (chốt 03/10)
- "Tớ cá là" · chỉ: tung · vì: câu cửa miệng của Tùng
- "Đừng cá" · chỉ: ha-vy · vì: câu chặn của Hà Vy

## Câu khóa

<!-- `- "<câu nguyên văn>" · ở: <tệp> · vì: …` — câu gài / câu chủ đề, phải còn NGUYÊN VĂN trong tệp ấy. Mất là LỖI.
AI gọt lời hay xóa mất những câu này (duyệt v2 Vụ 1, 03/10). -->

- "Căn cứ vào đâu?" · ở: 00-mo-dau · vì: câu cửa miệng thầy Quang, Hà Vy nhại lại; trả ở Vụ 5 qua bà bán trà đá
- "Căn cứ vào đâu?" · ở: 13-vu-5-so-quy · vì: bà bán trà đá nối "cậu trà nóng" với thầy Quang
- "Sổ ghi tên người. Không có chữ ký người có thẩm quyền thì bác không mở." · ở: 04-ngay-4 · vì: gài cho Vụ 6
- "Căn phòng này giữ nhiều hơn em nghĩ." · ở: 06-hop-va-ket · vì: nguyên văn mẩu giấy trong tủ, bí mật của mùa
- "Chưa thu phòng ngay." · ở: 06-hop-va-ket · vì: quyết định của buổi họp, nối sang Vụ 2
- "Đang xin mở rộng xưởng thực hành" · ở: 00-mo-dau · vì: gài động cơ của Robotics từ Ngày hội

## Tên đã bỏ

<!-- `- <cụm> · vì: …` — nhân vật đã cắt; xuất hiện trong lời hiện cho người chơi là LỖI. -->

- thầy Khải · vì: bỏ 03/10, việc của thầy chuyển cho cô Hạnh và bác Thịnh
- chị Linh · vì: bỏ 02/10, cuốn sổ là sổ của CLB
- Đạt · vì: bỏ 30/09

## Lời nhắc không lộ đáp án

<!-- Áp cho dòng `> NHIỆM VỤ:` và `> NHẮC VIỆC`. `- <mẫu> · vì: …`; mẫu là biểu thức chính quy (cờ u), so phân biệt hoa thường; ranh giới chữ viết (?<!\p{L}) … (?!\p{L}) vì \b không coi chữ có dấu là chữ. -->

- (?<!\p{L})(VÀ|HOẶC|AND|OR|LIKE|SELECT|WHERE|JOIN)(?!\p{L}) · vì: từ khóa SQL viết hoa trong lời nhắc là đọc đáp án ("Tòa B VÀ Báo chí")
- = · vì: lời nhắc không viết điều kiện
- còn (thiếu )?(\d+|hai|ba|bốn|năm) (chỗ|thứ|nơi|manh mối|điểm) · vì: gợi ý không liệt kê

## Độ dài

<!-- Số chữ (tách theo dấu cách) tối đa của một bong bóng; vượt là cảnh báo. -->

- mặc định · 40
- narrator · 55
