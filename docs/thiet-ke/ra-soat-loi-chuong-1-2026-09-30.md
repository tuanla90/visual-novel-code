# Rà soát lời chương 1 (30/09/2026) — ĐÃ ÁP DỤNG 01/10/2026

> **Đã áp dụng** (user duyệt toàn bộ; nhánh `claude/loi-chuong-1-ra-soat`): A, B, C, D và DX-01 vào `prototype/noi-dung-mvp/`.
> Không làm: B6 (bỏ điểm bấm bảng tin ở sảnh KTX — đổi khung đã được user yêu cầu 29/09 và làm đỏ hai test giao diện; đã sửa lời
> theo A13 thay vào), A11 phần ảnh, DX-03 (`[KHÁM PHÁ]` không có vật tĩnh). C14: chỉ xóa thẻ Đạt, dữ liệu `du-lieu.md` chờ user.
> Ảnh cần vẽ lại (A4 huy hiệu ở CG, A5/A4 cờ bánh răng gian Robotics, A11 chibi lá thư) chưa làm. Mở đầu: 63 → 50 bong bóng.

Rà theo hai ví dụ user nêu: lời lệch với ảnh (Hà Vy đoán Tùng "áo đội tình nguyện" trong khi ảnh là sơ mi cam), và chi tiết không
phục vụ cốt truyện (nồi cơm, nhắn mẹ). Chưa sửa tệp lời nào. "loi/…" = `prototype/noi-dung-mvp/loi/…`; ảnh ở `prototype/src/assets/…`.

## A. Lời lệch với ảnh (nặng trước)

| # | Chỗ | Lời hiện tại | Ảnh cho thấy | Đề xuất |
|---|---|---|---|---|
| A1 | `00-mo-dau` · `md-10-phong-clb.2` | "Áo đội tình nguyện, balo cài huy hiệu khoa thế kia." | Tùng: sơ mi cam ngoài áo trắng, dây đeo thẻ, cầm bản đồ; không balo, không huy hiệu | "Khỏi đoán. Cổ đeo thẻ, tay lúc nào cũng cầm bản đồ trường. Du lịch chứ gì." Cùng đoạn: "phòng mình có chỗ mượn vở" → "tớ có chỗ mượn vở" (Hà Vy không ở 408) |
| A2 | `md-10-phong-clb.2`, `n2-mo.1`, `n2-laptop.1` | "một cái laptop cũ ở góc" | Nền phòng CLB vẽ máy bàn ở góc; màn tra là laptop | Lời dẫn: "một bộ máy bàn phủ bụi ở góc"; Duy: "…với cái laptop cũ cất trong tủ đều tớ giữ." |
| A3 | `md-09-ngay-hoi.2` | "Bọn em chưa có thẻ sinh viên chị ạ." | Tùng và người chơi đeo thẻ từ cảnh đầu | "Thẻ bọn em đang đeo là thẻ tạm của ký túc xá, chưa in mã chị ạ." |
| A4 | `06-hop-va-ket` · `ket-that.1` | "anh sinh viên năm cuối… quai balo đeo huy hiệu bánh răng" | CG: người nhìn từ sau lưng, không thấy huy hiệu | "Lúc cả nhóm ra tới cổng trường, có một anh khóa trên đi lướt qua. Trên balo cài một cái huy hiệu hình bánh răng." + vẽ thêm huy hiệu vào CG. Gieo trước ở Ngày hội: "Bàn Robotics đông nhất, mấy anh trực bàn ai cũng cài huy hiệu bánh răng…" |
| A5 | `md-09-ngay-hoi.2` | "Sân nhà văn hóa chật người… chỉ có một chị ngồi" | Nền: bàn trống, không người | Hiện `obj-gian-robotics`, `obj-ban-tham-tu` lên nền (ảnh đã có), hoặc sửa lời: "Sân nhà văn hóa giăng cờ, bàn CLB kê kín lối đi…" |
| A6 | `md-06-bang-tin.1`, `md-08-tuan-cong-dan.1` | cảnh `nha-van-hoa` | Nền là sân Ngày hội; `md-08` kể "ngồi hội trường", ảnh `bg-mvp-hoi-truong` chưa dùng | Thêm cảnh `hoi-truong`; `md-06` gộp vào `md-07` (DX-01) |
| A7 | `md-03-toa-b.1`, `n1-mo.1`, `n1-toa-b.1` | "hộp tôn cạnh cầu thang", "bác bảo vệ ngồi", "sảnh đông" | Hộp đặt ở mảng tường trái gần cửa; bác đứng; sảnh trống | "Trên mảng tường gần cửa ra vào treo một cái hộp tôn xanh…"; "Bác bảo vệ đứng ở chân cầu thang." |
| A8 | `md-04-cang-tin.1` | "Bún cá dọn mất rồi" | Quầy đầy khay thức ăn | Cắt cả chuỗi (B3) |
| A9 | `05-ngay-5` · `n5-mo.1` | "chú Cường đang quét sân" | Chú cầm đèn pin | "…vừa đi một vòng kiểm tra về, đèn pin còn cầm trên tay." Cảnh tối (`md-07`, `n5-toi`) đang hiện nền ngày, ảnh `-dem` đã có |
| A10 | `03-ngay-3` · `n3-ctsv.1` | "anh sinh viên áo sơ mi, kẹp tập hồ sơ" | Quân: vest xanh đen, bìa da nâu | "…khoác vest xanh đen, kẹp cái bìa da…" |
| A11 | `md-11-la-thu.2` | "đọc được mỗi chữ H" | `chibi-la-thu`: chữ ký không ra chữ H, mặt cười | Bỏ dòng `[ẢNH chibi-la-thu]` (tài liệu hiện ngay sau đã đủ) hoặc vẽ lại |
| A12 | `n5-toi.1` | "Hà Vy trải hết giấy tờ ra bàn" | `chibi-bang-ghim`: ghim lên bảng, căng chỉ đỏ | "Hà Vy ghim hết giấy tờ lên bảng, Tùng căng chỉ nối từng tờ." |
| A13 | `md-00-so-do.1` | "Sơ đồ vẽ mỗi thang máy" | Sơ đồ mặt bằng khu, không vẽ thang | "(Sơ đồ chỉ vẽ ba dãy nhà nhìn từ trên xuống. Thang bộ ở đâu thì chịu.)" |
| A14 | `md-00-cong-ktx.1`, `md-00-xe-buyt.2` | "nhà năm tầng"; "thanh chắn nâng lên cho xe máy" | Nhà bốn tầng; thanh chắn hạ, không xe | "bốn tầng"; "Mấy bạn kéo vali đi vòng qua thanh chắn…" |
| A15 | `hop-02.1` | "đứng nép cạnh cửa" rồi "em cứ ngồi đó" | — | "Được, em ngồi xuống ghế đi." |
| A16 | `n1-mo`…`n4-mo` | buổi sáng | Nền phòng CLB nắng chiều | "Lát nữa sang Phòng Đào tạo…" |

## B. Chi tiết không phục vụ cốt truyện (đã tìm trong `loi/`, `kich-ban/`, `ho-so/`, không được dùng lại)

1. `md-00-cong-ktx.1` nồi cơm điện → cắt (chibi vali vẫn có nồi cơm làm trò vui bằng hình).
2. `md-01-ktx.2` nhắn mẹ, "giường trong sát cửa sổ" → cắt; còn: "Tới nơi rồi. Cất đồ xong tớ dẫn đi một vòng trường, tuần sau vào học đỡ lạc."
3. `md-04-cang-tin.1` (bún cá), `md-05-phong-may.1` → cắt cả hai chuỗi (trùng DX-01).
4. `md-02-ban-do.2` → cắt chuỗi; chuyển câu cửa miệng sang `md-00-gap-tung.3`: "…Đưa tớ một đầu vali. Tớ cá là ba phút là tới tầng bốn."
5. `md-00-xe-buyt.2` "(Tòa mái ngói đỏ y như trên ảnh tuyển sinh…)" → cắt (kể lại thứ nền đã cho thấy).
6. `md-00-so-do.1` → bỏ điểm bấm sơ đồ; giữ tờ giấy thang máy.
7. `md-00-gap-tung.1` "cạnh phòng giặt" → "Khuất sau hành lang kia. Lần đầu ai cũng tìm không ra. Cậu lên tầng mấy?"
8. `md-07-cong-ktx-toi.1` gộp hai câu chú Cường thành một (giữ quá khứ CLB).
9. `md-10-phong-clb.2` "mê Sherlock Holmes…" → "Tớ đăng ký qua form. Hà Vy, Toán ứng dụng."
10. `n2-mo.1`, `n2-co-hanh.1` "sổ mượn máy" (sót từ thiết kế cũ) → cắt; còn "Laptop của CLB tớ mang theo."
11. `md-09-ngay-hoi.3` "cần người làm sổ hoạt động" → "…Nhanh thật. Bốn giờ chiều thứ Hai tuần sau CLB họp đầu năm, hai em ghi tên đi."

Đã kiểm, có dùng lại, nên giữ: mép hộp sắc; "viết tên vào luôn"; bảng "xin mở rộng xưởng thực hành"; "lọc file xếp phòng"; mượn vở Toán; báo cáo "hoạt động yếu"; khao trà đá.

## C. Mâu thuẫn, nhân vật biết điều chưa thể biết

1. **`n3-cang-tin.1` (nặng):** Hiếu nói "CLB các cậu" dù không biết nhóm là CLB; nói "thư ai viết thì tôi không biết" khi chưa ai ngoài CLB biết có thư; tân sinh viên tuần đầu mà "xin phòng mấy lần". Viết lại: "Đọc thông báo rà soát chưa? Cái CLB Thám Tử ấy giữ nguyên một phòng chả để làm gì." / "Nhóm tôi vừa xin phòng làm bài nhóm, người ta bảo hết phòng. Phải ngồi ké thư viện." / Tùng: "Nghe gắt thế… hay thư là cậu này gửi?" / Hà Vy giữ / "Nhìn gì? Tôi nói thẳng vậy thôi, có gì tôi nói trước mặt."
2. **`n4-phong-may.1`:** người chơi đọc "chân trang ghi kien-nghi-phong-clb.docx" nhưng chưa từng được thấy dòng đó. Thêm vào `md-11-la-thu.2`: "Cuối trang còn sót một dòng bé tí, trông như tên tệp." và thêm dòng chân trang vào `doc-thu-che`.
3. **`n5-chu-cuong.1`:** "đang tìm người bỏ thư" (đã biết từ ngày 4) → "Bọn cháu đang lần xem lá thư ở hộp tòa B từ đâu mà ra."; "anh năm cuối" nhưng "không nhìn rõ mặt" → "một cậu lớn, dáng sinh viên khóa trên, balo đeo huy hiệu bánh răng". Đồng bộ thẻ `clue-loi-chu-cuong`.
4. **`n1-bac-thinh.1`:** thiếu mắt xích cho "chỉ có thể bỏ 7–9 giờ sáng thứ Hai". Thêm: "Tối Chủ nhật bác đi khóa cửa, ngó qua khe thì hộp còn trống."
5. `md-09-ngay-hoi.2`: "Em học Du lịch cơ mà?" (Tùng chưa nói ngành) → "Phiếu em lại ghi ngành Du lịch?"
6. `n1-mo.1`: "Thư chắc bỏ vào đấy" (Minh Anh đã nói rõ hôm trước) → "Hộp kiến nghị tòa B… hôm Chủ nhật tớ với {{nv.nguoi-choi}} đi qua rồi…"
7. `n4-ve.1`: Minh Anh không đi CTSV mà nói trước kết quả → đảo: Hà Vy báo, rồi Minh Anh kết.
8. `ket-that.1`: Quân "quy kết vội" nhưng ở nhánh kết thật chưa quy kết ai → "Bên em lọc rộng rồi vội nghi cả một lớp ạ."
9. `hop-00.2`: "Sáng nay thầy duyệt phương án" nghe như đã quyết → "Hôm nay thầy phải chốt phương án…"; câu Quân → "Bên tôi lọc lại cho chắc: tên bắt đầu bằng H hoặc học lớp BC24A, ra mười bốn dòng. Hồ sơ các bạn nộp chỉ có hai người."
10. `md-11-la-thu.1`: "Hai mươi phút sau" → "Mười phút sau" (khung ghi 16h40). `md-07`: tách bong bóng nói với hai người.
11. Khung `06` lựa chọn `dung`: câu lặp nghĩa → "Mã trong sổ mới cho biết bạn ấy có nộp, chưa đủ để gọi bạn ấy vào. Xin dừng ở đây." Thống nhất cách gọi "mã trong sổ".
12. Khung `00` xúc xắc: "Ngại nghĩ thì bấm xúc xắc" → "…để tớ gieo xúc xắc đặt hộ cho."
13. `doc-thong-bao-hop` ghi "thứ Hai tuần 3" (cách gọi nội bộ) → cho khớp "bốn giờ chiều thứ Hai tuần sau".
14. Dữ liệu (`du-lieu.md`): lớp `KT25A` khóa 2025 trong khi K24 là khóa mới; `nhat_ky_in` ghi năm 2026 trong khi "SV21… năm tư" chỉ đúng nếu truyện ở năm 2024. `nhan-vat.md` còn thẻ Đạt.

## D. Giải thích thừa, lặp

1. **`md-11-la-thu.3` (nặng):** ba bong bóng dồn luật 5 người, đơn Robotics, sổ niêm phong, quyền dữ liệu; cô Lan và Quân giảng lại ở ngày 3. Rút còn: Duy "Đủ năm người thì CLB chưa bị giải thể. Nhưng phòng vẫn bị xét…" / Minh Anh "Thầy phó hiệu trưởng cho CLB một tuần tự tìm căn cứ, mang ra buổi họp."
2. "Tra gì máy cũng ghi lại" nói hai lần → giữ câu cô Hạnh.
3. `n2-co-hanh.1` mở đầu lặp `n2-mo.1` → "Cô tạo cho CLB một tài khoản, tên là clb_tham_tu."
4. `n3-mo.1` cặp hỏi đáp cùng khuôn `n2-mo.1` → cắt.
5. "Thẻ mắc ở khe chưa chắc của người bỏ thư" lặp ở `n2-laptop.2` → "Ừ, thẻ lịch nghiêng về BC24A. Nhưng cứ giữ cả hai lớp, loại sau cũng chưa muộn."
6. "Biết ai nộp chưa phải biết ai viết" nói bốn lần trước câu hỏi buổi họp (gần như đọc trước đáp án) → bỏ bớt ở `n5-toi.1`.
7. `md-03-toa-b.1` "mép sắc" hai lần → bỏ câu người chơi.
8. `n2-laptop.1` Tùng "cứ nối HOẶC vào" nghe như đã biết thao tác → "Tòa B hoặc Báo chí, cứ dính một cái là lấy hết cho chắc. Tớ cá kiểu gì chẳng trúng!"
9. `md-10-phong-clb.2` câu hỏi mồi "ai giữ chìa khóa" → để Duy tự giới thiệu.
10. `md-09-ngay-hoi.2` đoạn đùa Wi-Fi 4 bong bóng → 2.

## Nhịp mở đầu

Từ xuống xe tới lần lọc đầu tiên: khoảng 65 bong bóng, 3 điểm bấm, 2 lần nhập, ước 6–7 phút (mốc đã chốt: 5 phút). Áp DX-01 và các
mục B, D ở trên còn khoảng 38–40 bong bóng, ước 3,5–4 phút; những thứ phải gieo vẫn đủ (hộp tôn mép sắc, chú Cường, thẻ lịch ghi tên,
Robotics và bánh răng).
