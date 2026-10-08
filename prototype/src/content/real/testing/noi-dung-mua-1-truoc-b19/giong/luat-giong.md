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
- nam · không nói: cậu, các cậu · vì: năm hai, anh/em với năm nhất, tớ/cậu với Duy (Duy gần như không nói chuyện riêng với Nam), em với Minh Anh, Khánh, Bách, Thảo (user chốt 04/10)
- quan · không nói: tớ, cậu, các cậu · vì: tôi/các bạn, lạnh, công vụ
- hieu · không nói: tớ, các cậu · trước: 10-vu-2-tin-don · vì: Vụ 1 còn gắt, tôi/các bạn
- hieu · không nói: tôi · từ: 10-vu-2-tin-don · vì: từ Vụ 2 đã gỡ tin, tớ/các cậu với nhóm (vẫn "em" với cô Lan)
- thay-quang · không nói: tôi, tớ, cháu · vì: thầy/các em
- co-hanh · không nói: tôi, tớ, cháu · vì: cô/các em, kể cả cô sắp nghỉ hưu (user chốt 03/10)
- co-lan · không nói: tôi, tớ, cháu · vì: cô/các em
- bac-tu · không nói: tôi, tớ · vì: bác/cháu
- chu-cuong · không nói: tôi, tớ · vì: chú/cháu
- ba-lua · không nói: tôi, tớ · vì: bà/các cháu

## Thuật ngữ theo vai

<!-- Cùng cú pháp với "## Xưng hô": từ / cụm mà nhân vật ấy không nói, vì không hợp vai (rà soát 04/10/2026).
Chỉ người chơi gõ lệnh và nói chuyện câu lệnh. Hà Vy (năm nhất Toán) nghĩ bằng tập hợp: gộp, phần trùng nhau, vừa… vừa…, trừ ra.
Minh Anh (Luật) nói căn cứ, quy chế, thẩm quyền. Tùng sợ toán, ngợp số, không "cày SQL". Từ "bảng, dòng, lọc, nối, gom, đếm"
là từ chung cô Hạnh dạy ở ngày 2, ai cũng nói được. -->

- ha-vy · không nói: SQL, WHERE, SELECT, JOIN, OR, AND, câu lệnh, cú pháp, mệnh đề, truy vấn · vì: Vy chưa biết SQL, nghĩ bằng tập hợp ("Họ lấy cả hai thay vì chỉ lấy phần trùng nhau"); không giảng bài
- minh-anh · không nói: SQL, WHERE, SELECT, JOIN, OR, AND, câu lệnh, cú pháp, mệnh đề, truy vấn · vì: Minh Anh giữ căn cứ, quy chế; không can thiệp kỹ thuật
- tung · không nói: SQL, WHERE, SELECT, JOIN, OR, AND, câu lệnh, cú pháp, mệnh đề, truy vấn · vì: Tùng sợ toán, ngợp số; người chơi mới là người gõ lệnh

## Xưng theo người có mặt

<!-- `- <mã người nói>, … · khi có: <mã>, … [· trừ khi có: <mã>, …] [· chỉ khi câu có: <từ>, …] · không nói: <từ>, … · mức: lỗi|nhắc · vì: …`
"Có mặt" = có nói trong cùng đoạn lời (## mã). Người "khi có" đã tự nói từ ấy trước trong đoạn thì được nói lại (cô Hạnh dạy "bảng, cột, dòng" ở ngày 2). Dùng khi cách nói phụ thuộc người nghe mà máy không biết câu nói với ai. -->

- tung, ha-vy, player, minh-anh, duy, hoai, hieu, nam, khanh, thao, bach, quan · khi có: co-hanh, co-lan, thay-quang · trừ khi có: bac-tu, chu-cuong, ba-lua · không nói: cháu · mức: lỗi · vì: ở trường, sinh viên xưng "em" với thầy cô dù thầy cô bao nhiêu tuổi; "cháu" chỉ với bác bảo vệ, chú Cường, bà bán trà đá (user chốt 03/10)
- tung, ha-vy, player, minh-anh, duy · khi có: co-hanh, co-lan, thay-quang, bac-tu, chu-cuong, ba-lua, hoai, hieu, quan, khanh · chỉ khi câu có: ạ, cô, thầy, bác, chú, bà, anh, cậu · không nói: cột, truy vấn, SQL, câu lệnh, chạy lệnh · mức: lỗi · vì: nói chuyện dữ liệu với người ngoài CLB thì nói "tên, lớp, ghi chú", không nói "cột"; "Bọn em chỉ cần tên, lớp, năm học và ghi chú thôi ạ" (user chốt 03/10)

## Cách gọi

<!-- `- <tên> → <cách gọi đúng> · người nói: <mã>, <mã>`
Trong lời của những người nói ấy, <tên> phải đứng sau <cách gọi đúng> (vd. "anh Duy"). Lời dẫn (narrator) gọi trống. -->

- Duy → anh Duy · người nói: tung, ha-vy, player, hoai, hieu
- Minh Anh → chị Minh Anh · người nói: tung, ha-vy, player, hoai, hieu, duy, nam
- Nam → anh Nam · người nói: tung, ha-vy, player, hoai, hieu · vì: Nam năm hai (K23), cùng khóa Duy (user chốt 04/10)
- Khánh → anh Khánh · người nói: tung, ha-vy, hoai, hieu, nam

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

## Chống giọng AI

<!-- Đảo ngược danh mục "Signs of AI writing" của Wikipedia (WP:AISIGNS, bài "AI slop" / "Rác AI") sang lời thoại tiếng Việt.
`- <mẫu> · mức: lỗi|nhắc · áp: thoại|dẫn|tất cả · vì: …` — mẫu là biểu thức chính quy (cờ iu: không phân biệt hoa thường).
"thoại" = lời nhân vật (kể cả người chơi), "dẫn" = narrator; [THẺ CHỮ] (thẻ ngày tháng) chỉ bị kiểm khi luật ghi "thẻ chữ: có".
Đo trên lời hiện tại 03/10: gần như không mẫu nào khớp, nên khớp là dấu hiệu thật. Cách viết thay thế: giong/README.md. -->

- oaicite|contentReference|turn0search|\[cite[:_ ]|\[span_\d|:::|grok_card|attached_file · mức: lỗi · vì: dấu vết công cụ AI dán sót
- [“”‘’] · mức: lỗi · vì: ngoặc cong; game dùng ngoặc thẳng "…"
- \*\*[^*]+\*\* · mức: lỗi · vì: chữ đậm trong lời (định dạng kiểu AI)
- [\u{1F300}-\u{1FAFF}\u{2600}-\u{27BF}] · mức: lỗi · vì: emoji trong lời
- dưới đây là|hy vọng (điều này|cậu|em|bạn) |nếu (cậu|em|bạn) cần thêm|mình có thể giúp|rất vui được (giúp|hỗ trợ)|tất nhiên rồi!|chắc chắn rồi!|câu hỏi (rất )?hay · mức: lỗi · vì: giọng trợ lý ảo, không phải sinh viên
- (đóng|giữ) vai trò (quan trọng|then chốt|cốt lõi|chủ chốt)|minh chứng (cho|rằng|sống)|là một (lời )?nhắc nhở|đánh dấu (một )?bước ngoặt|dấu ấn (khó phai|sâu đậm)|in đậm dấu ấn · mức: lỗi · vì: thổi phồng ý nghĩa (WP: "testament", "pivotal role", "indelible mark")
- hành trình|bức tranh (toàn cảnh|tổng thể)|tấm thảm|bối cảnh (rộng lớn|đang thay đổi) · mức: nhắc · áp: thoại · vì: ẩn dụ sáo của AI (WP: "tapestry", "landscape", "journey")
- sôi động|rực rỡ|nhộn nhịp|đầy màu sắc|nép mình|tọa lạc|nổi tiếng với|tuyệt vời|đáng kinh ngạc|vô cùng|tuyệt đẹp · mức: nhắc · vì: giọng quảng cáo (WP: "vibrant", "nestled", "renowned")
- khám phá (những|ra những|thế giới)|trải nghiệm (đáng nhớ|tuyệt vời|quý giá)|kết nối (với nhau|mọi người)|đồng hành cùng|thấu hiểu|trân trọng|lan tỏa|giá trị (cốt lõi|to lớn)|sâu sắc · mức: nhắc · vì: từ vựng AI tiếng Việt (tương đương "delve", "foster", "valuable insights")
- , (qua đó|từ đó cho thấy|góp phần|nhấn mạnh|thể hiện|phản ánh|cho thấy rõ) · mức: nhắc · vì: đuôi phân tích hời hợt (WP: "-ing" highlighting/underscoring/reflecting)
- không (chỉ|những) [^.!?]{1,60}mà còn · mức: nhắc · vì: song song phủ định "không chỉ… mà còn" (WP: negative parallelism)
- không phải (là )?[^.!?]{1,40}[,.] ?(mà|Mà) (là|chính là) · mức: nhắc · vì: "không phải X, mà là Y" (WP: negative parallelism)
- \? ?(Vì sao ư|Tại sao ư|Câu trả lời|Đơn giản thôi|Lý do rất đơn giản) · mức: nhắc · vì: tự hỏi tự đáp kiểu bài viết
- nhiều người cho rằng|người ta (vẫn )?nói rằng|các chuyên gia|theo một số (nguồn|người) · mức: nhắc · vì: quy kết mơ hồ (WP: vague attribution) — nhân vật phải nói ai nói
- tóm lại|nhìn chung|suy cho cùng|nói cách khác|điều quan trọng (nhất )?là|có lẽ[^.!?]{0,60}mới (là|chính là)|bài học (ở đây|rút ra) · mức: nhắc · vì: kết luận, giảng đạo lý (WP: outline-like conclusion) — trái luật show, don't tell
- (tớ|em|mình|anh|chị|cháu) (cảm thấy|thấy) (rất |thật |vô cùng )?(vui|buồn|lo lắng|hạnh phúc|xúc động|tự hào|biết ơn|hồi hộp|bất an) · mức: nhắc · áp: thoại · vì: gọi tên cảm xúc thay vì cho thấy
- hít một hơi( thật)? sâu|khẽ mỉm cười|nở một nụ cười|mỉm cười (nhẹ|dịu dàng)|ánh mắt (kiên định|lấp lánh|ánh lên)|trái tim|tâm hồn|ngưng đọng|ngừng trôi|dâng trào|siết chặt tay · mức: nhắc · vì: cử chỉ, cảm giác sáo của truyện AI
- (cậu|em|bạn|các cậu) nói (rất )?đúng|hoàn toàn (đúng|chính xác)|ý (kiến|tưởng) (rất )?hay · mức: nhắc · áp: thoại · vì: xu nịnh (sycophancy); nhân vật đồng ý thì nói việc tiếp theo
- (?<!\p{L})(ủa|nè|hông|nhen|nghen|tui|dzậy|dữ thần)(?!\p{L}) · mức: lỗi · áp: thoại · vì: giọng miền Nam; cả game giọng sinh viên miền Bắc ("Ủa" → "Ơ")
- (?<!\p{L})người lớn(?!\p{L}) · mức: lỗi · áp: thoại · vì: cả nhóm 18–21 tuổi, gọi người khác là "người lớn" nghe như trẻ con cấp 1 phá án (user 04/10); nói "đám đông", "ai cũng…"
- (?:^|[.!?…]\s+)Giỏi[.!] · mức: lỗi · áp: thoại · vì: khen cộc như cô giáo phát phiếu bé ngoan (user 04/10); nói việc vừa làm được ("Lần theo vệt vụn bánh là ra")
- như sắp lăn|mọc chân|(?<!\p{L})tớ hiểu nó(?!\p{L}) · mức: nhắc · áp: thoại · vì: nhân hóa, ẩn dụ kiểu hoạt hình mẫu giáo ("trăng như sắp lăn khỏi bảng", "bánh tự mọc chân", đầu lân "tớ hiểu nó") (user 04/10)
- — · mức: lỗi · thẻ chữ: có · vì: gạch dài là dấu câu của AI, kể cả trong thẻ chữ tiêu đề (user chốt 03/10); dùng dấu phẩy, chấm hoặc "…" ("Việc của cô Hạnh, thứ Tư 20 tháng 11")

## Tiểu từ

<!-- Lời nói tiếng Việt có tiểu từ (à, ừ, nhỉ, chứ, đấy, thế, mà, ạ…); AI viết mới từ đầu hay ra câu đủ chủ vị, cứng như văn viết.
`- mẫu: <regex> · tối thiểu: <tỉ lệ> · cỡ: <số câu> · bỏ qua: <tiền tố tên tệp>` — mỗi tệp có ít nhất <cỡ> câu thoại (≥ 3 chữ, trừ narrator) thì tỉ lệ câu có
tiểu từ phải ≥ <tối thiểu>; dưới là nhắc. Đo 03/10: lời Vụ 1 đã chuốt 0,30–0,47; việc phụ viết sau cùng thấp nhất (túi đồ 0,14, hoàn tiền 0,18); tt-* là phản hồi màn tra, khô tự nhiên nên bỏ qua. -->

- mẫu: (?<!\p{L})(à|ừ|ờ|ơ|nhỉ|nhé|nhá|chứ|đấy|đây|đâu|thế|mà|đi|ạ|hả|cơ|kìa|á|ấy|vậy|ôi|ơi|hở|thôi|chắc)(?!\p{L})|(không|chưa)\?$ · tối thiểu: 0.2 · cỡ: 30 · bỏ qua: tt-


## Nói thẳng

<!-- "Nói thẳng" / "nhét chữ vào mồm" (user 03–04/10): nhân vật tự khai tính cách, sở trường, vai trò của mình, hay đọc lại luật
và thói quen của mình cho người chơi nghe. Ngoài đời không ai nói thế; cho thấy bằng việc làm. Cú pháp như "## Chống giọng AI".
Đo 04/10: bốn mẫu dưới khớp đúng bốn câu lỗi ở cảnh gặp Tùng và Ngày hội, không báo nhầm câu nào. Phần diễn đạt khác chữ
(cô Hạnh "Bảng nào khác cô không mở, xong việc là cô khóa lại") máy không bắt được: soát tay theo README. -->

- (?<!\p{L})(tớ|em|mình|cháu)( thì| cũng| vốn)?( [^.,!?]{0,15})? (giỏi|kém|dở|thạo|chuyên|lo được|không giỏi|không rành)(?!\p{L}) · mức: lỗi · áp: thoại · vì: tự khai sở trường ("Excel thì tớ lo được", "em thì lọc kém"); cho thấy bằng việc làm
- chứ [^.,!?]{1,40} thì (tớ|em|mình|cháu) (lo|làm|giỏi|rành) · mức: lỗi · áp: thoại · vì: "X thì chịu, chứ Y thì tớ lo": tự giới thiệu kỹ năng
- là việc của (tớ|em|mình|cháu)(?!\p{L}) · mức: lỗi · áp: thoại · vì: tự nhận vai trò ("tìm đường là việc của em")
- (cậu|em|các cậu) lo [^.!?]{1,30}, (tớ|anh|chị|mình) lo · mức: lỗi · áp: thoại · vì: chia vai bằng lời ("Cậu lo lọc, tớ lo đường")
- (?<!\p{L})(tính (tớ|em|mình|cháu)|(tớ|em|mình) vốn (là|hay|thích|không))(?!\p{L}) · mức: nhắc · áp: thoại · vì: tự tả tính cách
- (?<!\p{L})(tôi|tớ|em|mình|bác|cô|chú|anh|chị|cháu)( thì| vốn| cứ)? (nói|sống|tính) (thẳng|thật thà|thẳng tính) · mức: lỗi · áp: thoại · vì: tự tả cách nói của mình (Hiếu "Tôi nói thẳng vậy thôi"); cho thấy bằng việc: "Có gì hỏi thẳng đây, đừng xì xào sau lưng"
- (?:^|[.!?…]\s+)(Tớ|Tôi|Mình) (trông|trực|giữ|quản|phụ trách) [^.!?]{0,40} · mức: nhắc · áp: thoại · vì: tự khai vai trò ("Bác trông tòa này" — bộ đồng phục đã cho thấy); chỉ xét đại từ chắc là tự xưng, "Bác/Chú/Em" thường là gọi người nghe

<!-- Tự vấn kể lể: vẫn thuộc mục "Nói thẳng" (máy chỉ đọc mẫu ở hai mục "Chống giọng AI" và "Nói thẳng"). -->

<!-- User 05/10/2026, đọc cảnh mở đầu Vụ 1: lời người chơi tự nghĩ mà lại thuật cho người đọc nghe một tờ giấy ghi gì, thiếu gì
("Thông báo chỉ ghi: phòng 408", "Ký túc xá ở đâu thì thông báo không ghi", "Sơ đồ chỉ vẽ ba dãy nhà") là "nói trực tiếp".
Người thật tự vấn bằng câu hỏi ("Không biết ký túc xá ở chỗ nào nhỉ?"). Cú pháp như "## Chống giọng AI".
Chỉ bắt lời nghĩ trong ngoặc đơn và lời nhắc việc; lời nói ra miệng về giới hạn của chứng cứ ("Phiếu chưa nói tin nào có trước")
là chủ ý của truyện, không bắt. Phần diễn đạt khác chữ (lời dẫn nói điều hiển nhiên, sai thực tế, nhắc lại số phòng) soát tay theo README. -->

- ^\(?[^)]*(thông báo|giấy báo|sơ đồ|tờ giấy|bảng tin|tấm biển|biển)( trên tường| kia| này)?( thì)? (chỉ|không|chưa|chẳng) (ghi|vẽ|nói|cho biết|đề)(?!\p{L}) · mức: lỗi · áp: thoại · vì: tự vấn mà thuật lại tờ giấy ghi gì, thiếu gì; đổi thành câu hỏi tự hỏi ("Thế thang bộ nằm chỗ nào?")
- ^\(?[^)]*\S+ ở đâu thì [^.!?)]{1,30} (không|chưa|chẳng) (ghi|vẽ|nói|cho biết)(?!\p{L}) · mức: lỗi · áp: thoại · vì: "X ở đâu thì Y không ghi": kể lể; người thật tự hỏi "X ở chỗ nào nhỉ?"
- ^\([^)]*(thông báo|giấy báo|sơ đồ|tờ giấy|bảng tin) [^.!?)]{0,20}(ghi|vẽ)( rõ)?:? · mức: nhắc · áp: thoại · vì: người chơi tự đọc lại giấy tờ cho người đọc nghe; nếu cần nội dung tờ giấy thì để lời dẫn đọc một lần
