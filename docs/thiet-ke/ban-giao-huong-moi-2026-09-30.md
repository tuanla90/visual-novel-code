# Bàn giao: hướng thiết kế mới (30/09/2026)

Gửi phiên cốt truyện và phiên giao diện. Viết bởi phiên logic và gameplay.

## ĐÃ CHỐT — đọc mục này trước khi làm bất cứ việc gì

Đây là **nơi duy nhất** ghi quyết định thiết kế. Chỉ ghi những gì user đã duyệt. Phiên nào thấy cần đổi thì ghi vào `docs/thiet-ke/de-xuat.md` để user duyệt; **không tự áp dụng**. Khi mục này mâu thuẫn với phần bên dưới hoặc với tài liệu khác, **theo mục này**.

### A. Cách hai phiên làm việc (user chốt 30/09)

| | Phiên logic / gameplay | Phiên kịch bản / hình ảnh |
|---|---|---|
| Sở hữu | **Khung sự kiện** (`noi-dung-mvp/kich-ban/`: chuỗi, điều kiện, `[ĐI TỚI]`, thử thách, khám phá, rẽ nhánh, kết); `lich.md`, `dia-diem.md`, `du-lieu.md`, `thu-thach/*` (phần SQL, số dòng, mã); bộ kiểm; engine; hành vi giao diện | **Lời** (`noi-dung-mvp/loi/`: thoại, câu hỏi nhiệm vụ, thang gợi ý, dàn dựng, dòng "Khi…" của thẻ thử thách); `nhan-vat.md`; `art/` |
| Không đụng | Lời thật (chỉ viết lời tạm) | Khung, SQL, số dòng, mã thẻ, luật ngày |

- Khung chỗ nào cần lời thì đặt một dòng `- [LỜI <mã>]`. Lời nằm trong `loi/` dưới tiêu đề `## <mã>`. Bộ đọc ghép hai phần theo mã; bộ kiểm báo lỗi khi khung cần lời mà thiếu, khi lời gắn vào mã không có, và đếm các dòng còn đánh dấu `(tạm)`.
- Cả hai phiên làm trên **main**, đồng bộ mỗi ngày.
- Thứ tự mỗi vụ: phiên logic dựng khung, dữ liệu, bảng xem lại, kiểm bằng máy → **user duyệt bảng** → phiên truyện viết lời, làm ảnh → phiên logic chạy lại bộ kiểm.

### B. Hướng game (user chốt 30/09)

1. Game mô phỏng thám tử dữ liệu: hiện trường → bảng điều tra (cơ chế chính) → laptop ở phòng CLB. Ở hiện trường không tra dữ liệu được.
2. Bảng ghim tự do, loại thẻ phân biệt bằng hình dạng; mọi thẻ trên bảng kéo được vào truy vấn; truy vấn ra kết quả thì tự vẽ sợi chỉ; sang vụ sau tháo ghim dữ kiện vụ trước mang theo.
3. Người ngoài đời không nói tên người cần tìm; tên chỉ đến từ dữ liệu.
4. Mỗi vụ có đáp án duy nhất, máy kiểm.
5. Không may rủi: mọi sự kiện đều có luật.
6. Đối chất ngắn với Quân cuối vụ, 3 nhịp, không thanh uy tín, sai thì chọn lại.
7. **Bản đầu chỉ có SQL** (không pandas, không Excel, kể cả bản dịch để xem).
8. Chương 1 **giữ cốt truyện lá thư**.
9. Hạn ngày, ấn tượng NPC rút hạn, việc nhờ để gia hạn, kết xấu, lưu nhiều ô, chấm sao: **dùng từ Vụ 2**, không dùng ở chương 1. `docs/mvp/kiem-bang-vu1.py` (phần duyệt lịch) giữ làm mẫu cho Vụ 2.

### C. Chương 1 (Vụ 1 "Chữ ký H") — user chốt 30/09

**Mục tiêu:** một bạn lớp 5 tự chơi được, **không cần ai hướng dẫn, không đọc một dòng hướng dẫn nào, không bị ép bấm** kiểu cầm tay chỉ việc (tham khảo cách Phoenix Wright vụ 1 dạy luật mà không nói luật).

Nguyên tắc thiết kế chương 1:
- **Không** có màn hướng dẫn, bảng luật, mũi tên "bấm vào đây", hay khóa màn hình chờ bấm đúng chỗ.
- **Ít thứ bấm được:** mỗi cảnh chỉ vài điểm; thứ mới chỉ xuất hiện đúng lúc cần. Không có chi tiết ẩn, không di chuyển tự do: ngày nào đi đâu do truyện dẫn.
- **Học bằng thử:** mọi thao tác thử lại được, sai không bị phạt, phản hồi ngay bằng hình và con số (đống phiếu, số người).
- **Mỗi màn chỉ một điều mới.**
- **Động lực là câu hỏi của nhân vật** (Tùng hỏi, Hà Vy nhắc); gợi ý chỉ tăng dần khi người chơi đứng yên lâu, không bật lên ép.
- **Lời ngắn**, trẻ con đọc được; SQL luôn hiện nhưng không bắt phải đọc.
- **Đi theo truyện:** không hạn, không kết xấu, không chấm sao. Hai kết: thường và thật.

Nhịp và năm lần tra (mỗi lần dạy đúng một điều):

| Lúc | Việc | Điều mới |
|---|---|---|
| Mở đầu, Ngày hội CLB | Kéo thẻ [Tùng] vào cột tên → 3 người → nhìn cột ngành chọn Tùng Du lịch. Chưa hiện SQL. | Kéo thẻ vào ô; đọc kết quả |
| Phòng CLB, lá thư | Chữ ký chỉ đọc được chữ H → thẻ [H] | — |
| Ngày 1 · sảnh tòa B | Ba điểm bấm: hộp (thẻ lịch "Báo chí · K24"), bác Thịnh (mở hộp ở tòa B), thông báo lịch họp (tin phụ, nhìn thấy được) | Bấm đồ vật, thẻ tự ghim lên bảng |
| Ngày 2 · phòng Đào tạo → CLB | Cô Hạnh tạo tài khoản CLB (bảng lớp). Laptop: tòa [B] VÀ ngành [Báo chí] → **2 lớp** (BC24A, BC23A). Tùng cá "cứ OR vào" → 5 lớp để thấy khác biệt. SQL bắt đầu hiện từ đây. | Hai điều kiện; VÀ khác HOẶC |
| Ngày 3 · CTSV → căng tin → CLB | Phiếu yêu cầu tra cứu (cô Lan ký, Quân giám sát) mở bảng sinh viên. Căng tin: Hiếu nói xấu CLB, Tùng cá là Hiếu (giả thuyết sai trên bảng). Laptop: kéo **phiếu 2 lớp** vào cột lớp, thẻ [H] vào cột tên: "bằng" → 0 → "bắt đầu bằng" → **Hiếu, Hoài**. | Kéo phiếu kết quả làm điều kiện; "bắt đầu bằng"; 0 dòng thì thử cách khác |
| Ngày 4 · CTSV | Nộp 2 mã; sổ niêm phong: Hoài có, Hiếu không → gạch Hiếu, bác giả thuyết của Tùng. Tùng hỏi "thư đánh máy thì in ở đâu nhỉ?" → **lựa chọn nhìn thấy được**: ghé phòng máy hay về. Phòng máy: nhật ký in theo 2 mã + tệp kiến nghị → 0 ("không phải họ in") → tệp kiến nghị → SV210745 (năm 4). | (tùy chọn) 0 dòng cũng là một câu trả lời |
| Ngày 5 · sáng cổng KTX | **Lựa chọn nhìn thấy được**: hỏi chú Cường không (6:45 sáng thứ Hai, anh năm cuối đưa phong bì cho một bạn nữ). Tối: Hà Vy tóm tắt. | — |
| Thứ Hai · buổi họp | Đối chất 3 nhịp: Quân chiếu "tên H **HOẶC** lớp BC24A" → 14 → người chơi bấm vào chữ HOẶC, đổi thành VÀ → 2, "SỐ LIỆU ĐÂY!" → "Hai bạn này là người viết thư?" → chưa, sổ chỉ cho biết người nộp. Rồi chọn mời Hoài vào tự kể hay dừng. | Nhận ra lỗi HOẶC của người khác |
| Kết | **Kết thật** khi có nhật ký in **và** lời chú Cường; thiếu một trong hai → **kết thường**. | — |

Các thay đổi so với kịch bản khung cũ: bỏ luật 3 khung giờ và "Cuối ngày"; bỏ bước "khóa 2024" (K24 vẫn là chữ trên thẻ lịch, không cần tra); bỏ **Đạt**; bỏ thanh uy tín; Quân gặp CLB ở ngày 3; thêm bảng `nhat_ky_in` (9 dòng); câu OR của Tùng ra 5 lớp.

Quyền dữ liệu: tài khoản `clb_tham_tu` (cô Hạnh, ngày 2, chỉ bảng lớp) + phiếu yêu cầu tra cứu (CTSV ký, Quân giám sát, ngày 3) mở bảng sinh viên 4 cột; phòng máy dùng phiếu thứ hai cho nhật ký in. Tài khoản giữ lại cho các vụ sau.


---

*Phần dưới là ghi chú bàn giao ban đầu (30/09). Chỗ nào lệch với mục ĐÃ CHỐT ở trên thì theo mục ĐÃ CHỐT.*

## 1. Chuyện gì đã đổi

Ngày 30/09 user đổi hướng game. CLB Thám Tử Dữ Liệu trở thành **game mô phỏng thám tử dữ liệu**. Vòng chơi gồm ba nơi:

- **Hiện trường:** người chơi thu mẩu tin.
- **Bảng điều tra:** đây là cơ chế chính.
- **Laptop ở phòng CLB:** nơi dựng truy vấn.

Chỉ giữ **thế giới chung** (Đại học Chấn Hưng) và **nhân vật cốt lõi**. Nơi nào các quyết định cũ (QĐ-071 → QĐ-092), prototype hay MVP mâu thuẫn với hướng mới, thì theo hướng mới.

Tài liệu và bản chơi thử:

- **Trang thiết kế** (bản đầy đủ, luôn là bản mới nhất): https://claude.ai/artifact/PBuZ4zT1QjDD6shvc8JyzY
- **Bản chơi thử bảng điều tra** (vụ laptop, có hạn 7 ngày, lời giải tự chạy, đối chất, lưu/nạp): https://claude.ai/artifact/J2tjwDEY8waRmyXzwiHY8g
- **Bảng xem lại SQL Murder Mystery** (hình mẫu của bảng): https://claude.ai/artifact/Jqt1x9qvMDTgVPvdAccn1r
- **Ba phiên hội đồng ngày 30/09** nằm trong `~/.claude/hoi-dong/sessions/`: `20260930-1144-doi-huong-tu-duy-du-lieu`, `20260930-1214-bang-dieu-tra-bo-giai-trinh`, `20260930-1234-cham-diem-y-tuong-moi-vs-cu`.

## 2. Những điều user đã chốt

1. **Bảng ghim tự do, không chia cột.** Loại thẻ phân biệt bằng hình dạng:
   - giấy nhớ vàng: mẩu tin;
   - phiếu trắng có con dấu: kết quả tra;
   - thẻ tròn "?": câu hỏi mở;
   - hồ sơ kẹp: kết luận;
   - thẻ kẹp màu cũ: mang từ vụ trước;
   - thẻ xanh đậm: giả thuyết của Quân.

   Thẻ mọc theo dòng suy nghĩ; người chơi kéo để sắp lại.
2. **Mọi thẻ trên bảng đều kéo được vào truy vấn.** Truy vấn ra kết quả thì chính nó **vẽ sợi chỉ** từ các thẻ đã dùng sang phiếu mới. Ra 0 dòng thì không ghim gì.
3. **Sang vụ sau, tháo ghim dữ kiện vụ trước** ở "Tủ hồ sơ vụ cũ" rồi mang sang.
4. **Ở hiện trường không tra dữ liệu được.** Chỉ tra trên laptop ở phòng CLB.
5. **Hai loại nhiệm vụ:**
   - **Theo truyện:** x nhịp, cách mấy ngày do truyện quyết, nhảy giờ theo kịch bản.
   - **Có hạn:** hạn D ngày. Mỗi ngày chọn một nơi, là phòng CLB hoặc một điểm hiện trường; mỗi nơi tốn 1 ngày. D ≈ 1,4–1,5 × đường giải ngắn nhất, tính cả các ngày về CLB.
6. **Không có may rủi. Mọi sự kiện đều có luật.**
   - Trả lời sai làm ấn tượng NPC xấu đi, và điều đó có hậu quả tất định. Ví dụ: cô Mai rút hạn giữ máy từ 7 còn 5 ngày.
   - Quá hạn lần đầu thì NPC **nhờ một việc** (minigame dữ liệu). Làm xong được gia hạn và một gợi ý nhỏ.
   - Hết cả hạn đã gia thì ra **kết xấu**.
7. **Cần có kết xấu và lựa chọn sai** để việc lưu/nạp nhiều ô có ý nghĩa: 3 ô lưu tay và 1 ô tự lưu đầu mỗi ngày. Chấm sao theo số ngày.
8. **Đối chất ngắn với Quân cuối vụ, 3 nhịp, không thanh uy tín:**
   - chỉ ra điều kiện không có căn cứ;
   - bấm thẻ bằng chứng trên bảng, kèm câu "SỐ LIỆU ĐÂY!";
   - trả lời "chắc chắn chưa?" bằng "cần nguồn xác minh độc lập".
9. **Nhiệm vụ viết bằng câu hỏi của NPC.** Ví dụ Tùng hỏi: "Laptop ai bỏ quên ở thư viện… giờ hỏi ai được nhỉ?", không ghi "gặp cô Mai". Khi người chơi bí, câu hỏi cụ thể dần.
10. **Tin chính sáng sẵn; tin phụ và tin ẩn phải soi mới thấy.** Trên máy tính thì rê chuột; trên điện thoại có nút "soi kỹ".
11. **Mỗi vụ có đáp án duy nhất, được máy kiểm.** Mỗi vụ có ít nhất một tin sai và một tin đúng nhưng không phân biệt được ai. Chương 1 chỉ cần một tin sai nhẹ.
12. **Khối tư duy kiểu v7**, câu SQL hiện bên dưới. Bản đầu chỉ có SQL (xem mục 6).

## 3. Tác động lên đề xuất nhịp chương 1 của phiên cốt truyện và giao diện

| Đề xuất của phiên truyện/UI | Theo hướng mới |
|---|---|
| Rút phần mở đầu, câu SQL đầu tiên trong khoảng 5 phút | **Giữ.** |
| Giữ 5 ngày, giảm từ 21 xuống khoảng 14 dữ kiện | Giảm dữ kiện: **giữ**. "5 ngày cố định" được **thay** bằng hai loại nhiệm vụ ở mục 2.5. |
| Người chơi thấy 3 ngăn: giấy nhớ, bằng chứng, thẻ nhân vật | **Thay** bằng **một bảng**, phân biệt bằng hình dạng. Mọi thẻ kéo được vào truy vấn, không riêng giấy nhớ. |
| Chương 1 chưa có bẫy | **Chỉnh:** chương 1 có đúng **một tin sai nhẹ**, lộ ra bằng con số (0 dòng hoặc phiếu mâu thuẫn), không đánh đố. |
| Mỗi ngày 1 việc chính + 1 lượt rảnh, tối Hà Vy tổng kết | **Thay** bằng mục 2.5. Giữ ý **Hà Vy tóm tắt ở CLB**; có thể làm thành bảng tự phát lại các sợi chỉ mới trong ngày. |
| Checklist góc trái ghi việc chính và lượt rảnh | **Chỉnh:** chỉ ghi "Ngày n/D", số lượt còn lại và **các câu hỏi mở**, lấy chung nguồn với thẻ tròn trên bảng. Bấm vào thì nhảy tới thẻ đó. Việc cần làm vẫn nằm trên bảng. |
| Đổi luật nhịp trong `may.ts`, `lich.md`, `dia-diem.md` | **Chưa đụng**, chờ chốt cốt truyện chương 1 (mục 6). Phiên logic sẽ sửa một lần cho cả nhịp mới lẫn bảng. |

## 4. Việc cho phiên cốt truyện

- **Nhiệm vụ dạng câu hỏi của NPC**, mỗi câu kèm **thang gợi ý 3 bậc**, từ mơ hồ tới cụ thể, không bao giờ nói thẳng đáp án.
- **Điểm tương tác ở hiện trường:** gắn nhãn **chính / phụ / ẩn**. Mẩu tin viết **nguyên lời** người nói, không chuẩn hóa sẵn thành cột. Ví dụ viết "khóa hai tư bên Báo chí", không viết "[Báo chí K24]".
- **Người giữ sổ** (cô Mai, cô Hạnh, chú Cường…):
  - lựa chọn thoại tốt và xấu, kèm hậu quả tất định;
  - một **việc nhờ** để gia hạn (minigame dữ liệu), kèm gợi ý thưởng;
  - lời khi rút hạn và khi gia hạn.
- **Mỗi vụ một kết xấu** và lời của nó.
- **Màn đối chất 3 nhịp với Quân:** giả thuyết của Quân phải dựa trên một **tin sai có thật trên bảng**. Có lời đáp cho từng lựa chọn sai.
- **Tin sai và tin không phân biệt được ai** cho mỗi vụ, cùng nơi người chơi nghe được chúng.

## 5. Việc cho phiên giao diện

Làm theo bản chơi thử:

- **Bảng ghim:** các hình dạng thẻ ở mục 2.1; ghim có hiệu ứng rơi; phiếu kết quả có ảnh polaroid, người bị loại gạch chéo.
- **Sợi chỉ:** đỏ khi truy vấn vẽ; cam chấm khi loại trừ hoặc bác bỏ; nhãn số dòng không được đè lên thẻ (bản thử còn lỗi này).
- **Lịch ngày trên đầu trang:** ô đã qua, hôm nay, ô gia hạn, ô quá hạn. Màn chọn nơi đến trong ngày.
- **Trung tâm dữ liệu:** khóa khi không ở CLB; nút "Hết ngày".
- **Nút "soi kỹ"** cho điện thoại; tin phụ sáng mờ sau khi đã tìm xong tin chính.
- **Màn lưu/nạp** (3 ô + tự lưu), **màn kết xấu**, chữ lớn **"SỐ LIỆU ĐÂY!"**.

## 6. Đã chốt thêm (30/09, sau khi viết ghi chú)

1. **Chương 1 giữ cốt truyện lá thư 5 ngày**, lắp lõi mới ở mục 2. Vụ laptop trong bản chơi thử chỉ là vụ mẫu để thử cơ chế; có thể dùng lại làm vụ sau hoặc màn hướng dẫn.
2. **Bản đầu chỉ có SQL.** Không làm bản dịch pandas hay Excel ở bản đầu, kể cả để xem.

## 7. Bảng Vụ 1 theo lõi mới (30/09)

- Trang: https://claude.ai/artifact/ANwr56VHVhTP69UvgDUAv8 — thẻ và sợi chỉ của cả vụ lá thư, lịch ngày (ngày 1–2 theo truyện, ngày 3–6 có hạn 4 ngày), luật từng nơi đến, ấn tượng cô Lan, việc nhờ, ba kết, câu hỏi của Tùng và thang gợi ý.
- Bộ kiểm bằng máy: `docs/mvp/kiem-bang-vu1.py` (số dòng từng truy vấn, đáp án duy nhất, duyệt 625 lịch). Thêm bảng mới `nhat_ky_in` (9 dòng) cho phòng máy.
