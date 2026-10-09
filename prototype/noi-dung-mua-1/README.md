# Kịch bản Mùa 1 — `prototype/noi-dung-mua-1/`

Đây là nguồn kịch bản của **toàn bộ Mùa 1** ("CLB Thám Tử Dữ Liệu", gồm 5 vụ án chính và 6 việc phụ). Cú pháp đầy đủ: [`docs/dac-ta-dinh-dang-noi-dung.md`](../../docs/dac-ta-dinh-dang-noi-dung.md) mục 18 và mục 19.

Thư mục này hoạt động độc lập với `prototype/noi-dung-mvp/`. Mã nguồn TypeScript được sinh ra `src/content/generated/mua-1/kich-ban.gen.ts`. Game có nút chuyển đổi bộ nội dung trên màn hình tiêu đề.

## Các lệnh kiểm tra và sinh dữ liệu

Trong thư mục `prototype/`:

- **Kiểm tra nội dung Mùa 1**:
  ```bash
  npm run kiem-noi-dung:mua1
  ```
  Quét toàn bộ cú pháp, liên kết đồ thị chuỗi, ràng buộc máy lịch B1, logic người quen B2, và nạp chạy thử toàn bộ câu SQL trên `du-lieu.md`.

- **Sinh mã kịch bản Mùa 1**:
  ```bash
  npm run noi-dung:sinh:mua1
  ```
  Sinh tệp `src/content/generated/mua-1/kich-ban.gen.ts`.

- **Kiểm tra giọng điệu và văn phong**:
  ```bash
  npm run kiem-giong:mua1 -- --chi-loi
  ```

- **Kiểm tra lũy tiến kỹ năng SQL (Bảng A4)**:
  ```bash
  npm run kiem-ky-nang:mua1
  ```

- **Xuất sách truyện chữ CYOA**:
  ```bash
  npx tsx tools/truyen-chu.ts
  ```
  Xuất 11 tệp sách truyện chữ phân đoạn tương tác vào thư mục `docs/mua-1/truyen-chu/`.

## Cú pháp gói B21 (lõi note + bảng manh mối + bảng chân lý)

Thử từng lệnh ở bộ thử `noi-dung-thu-b21/` (`?bo=thu-b21` ở máy dev). Mục ngày cũ (`{ngày: n · theo truyện}`) vẫn chạy.

- **Chặng** (`lich.md`): `## Chặng 1 · Hoài nào? {chặng: 1 · bắt đầu ở: phong-clb · ngày truyện: 2024-09-23 · giờ: 16:30}` + `- Chuỗi:`,
  `- Chốt khi: có <mã>, <mã>` (VÀ; mã là thẻ hồ sơ, cờ hay mã câu nối), `- Khi chốt: <chuỗi>`, `- Có mặt: <nhân vật> ở <ghim>, …`.
  Không có nút "Hết ngày". Lệnh `- [HẾT CHẶNG]` sang chặng kế (chặng cuối: sang buổi họp). Chặng phải có lối ra (Chốt khi hoặc [HẾT CHẶNG]).
- **Note** (`ho-so/`): `- Loại: manh mối|sự thật`, `- Nguồn: tài liệu|quan sát|suy luận|lời kể|tra`, `- Keyword: người:Hoài · thời gian:6:44 · địa điểm:… · hành động:…`
  (keyword nên có trong `Trên bảng`). Thiếu thì suy: `clue-` manh mối / lời kể, `doc-` sự thật / tài liệu, vật chứng của màn tra sự thật / tra.
  `Nguồn` chỉ tính là nguồn note khi đúng một trong năm giá trị; còn lại vẫn là chữ nguồn tự do như cũ. `- [ĐỔI LOẠI <thẻ> → sự thật]` đổi manh mối thành
  sự thật. Bộ có khai `Loại` / [ĐỔI LOẠI] thì chồng "Sự thật chờ đặt" chỉ nhận sự thật.
- **Nối note**: khối `- [CÁC CÂU NỐI]` … `- [HẾT CÁC CÂU NỐI]`, mỗi dòng `[NỐI <a> + <b> → câu hỏi: "<chữ>"[ · mã: <mã>] · → tra <thẻ thử thách>]` hay
  `· → hiện trường ghim:<mã ghim>` / `· → hiện trường <chuỗi>`. Mã mặc định `cau-<a>-<b>`. Nối sai cặp: sợi chỉ rơi, không phạt.
- **Lời đổi theo thẻ**: `- [NẾU có <mã thẻ hồ sơ hay mã câu nối>] → đi tới <chuỗi>`.
- **Buổi họp chỉ ô**: `- [ĐỐI CHẤT <mã> · chỉ ô · tính vạch[ · câu n/m]] <ai>: "…"` với dòng con `  - {<dtg>:<ô>} [ĐÚNG|SAI] → phản hồi: …`
  (nhiều ô nối bằng ` + `; ô trống bắt buộc `{<dtg>:?}`), `[KHÁC]`, `[SAI LẦN ĐẦU CẢ BUỔI]`. Lượt mẫu: `· chỉ ô · mẫu` (chạy lời, không tính vạch).
- **Nhãn khối** (`du-lieu.md`): `## sinh_vien {bảng · nhãn: Sinh viên}` + `- Nhãn: ma_sv=Mã sinh viên, ten=Tên, …`. Câu SQL giữ tên ASCII.

## Cú pháp mới của Mùa 1 (Gói A5)

1. **Hạn chót và việc chốt** trong `lich.md`:
   - `- Hạn chót: YYYY-MM-DD` (bắt buộc ở mọi vụ có ngày).
   - `- Việc chốt: <Tên>`
2. **Việc ngày lễ** trong `lich.md`:
   - `## <Tên> {việc ngày lễ: <mã>}` với các dòng `- Ngày:`, `- Thuộc vụ:`, `- Chuỗi:`, `- Người giao:`, `- Khi lỡ:`.
3. **Người quen & hảo cảm** trong `lich.md`:
   - `## <Tên> {người quen: <mã>}` với `- Mở sau:`, `- Việc 1:`, `- Việc 2:`, `- Việc 3:`, `- Ảnh CG:`, `- Giúp ở: <mã đối chất>`.
4. **Hết việc chính** trong `kich-ban/*.md`:
   - `- [XONG VIỆC CHÍNH]`
5. **Nói thay trong đối chất** trong `kich-ban/*.md`:
   - `  - [NGƯỜI QUEN <mã>] → nói thay: <chuỗi>`
6. **Mô tả cảnh & ảnh CG**:
   - `canh.md`: `### <mã> — <Tên> · mô tả: <mô tả>` hoặc `- Mô tả: <mô tả>`.
   - `[ẢNH <mã> · chú thích: <chú thích> · mô tả: <mô tả>]`.

### Cú pháp đã chạy được sau A5 (bộ đọc `tools/noi-dung/doc-mvp.ts`, ghi 05/10/2026)

Chỉ tả thứ bộ đọc nhận thật; ví dụ lấy từ nội dung đang chạy hoặc từ test `src/content/real/testing/mua1-t0.test.ts`.

7. **Đi cùng** (trong `kich-ban/*.md`): `- [ĐI CÙNG <chuỗi>] <nhãn nút>`. Một nút người chơi tự bấm để đổi nơi (A3 mục 14). Nhãn bắt buộc; dòng này phải là dòng cuối của chuỗi. Máy kiểm "đứng nguyên chỗ" coi đây là đổi nơi hợp lệ; bộ sinh chuyển thành một `[RẼ NHÁNH]` một lựa chọn. Ví dụ (`kich-ban/01-ngay-1.md`): `- [ĐI CÙNG n1-toa-b] Đi cùng Tùng ra tòa B`.
8. **Cảnh cắt** (tiêu đề chuỗi): `### <mã> — <mô tả> {cảnh: <mã cảnh> · cảnh cắt}`. Chỉ chuỗi khai `· cảnh cắt` mới được `[ĐI TỚI]` tới từ một nơi khác; cảnh cắt không được `[ĐI TỚI]` tiếp sang nơi thứ ba. Ví dụ (test mùa 1): `### s-cat — Cảnh cắt {cảnh: c2 · cảnh cắt}`.
9. **Cột nộp** (trong thẻ `thu-thach/*.md`): `- Cột nộp: <cột>[, <cột>]`, cột phải có trong SELECT của `SQL chuẩn`. Tệp lời thẻ (`loi/tt-*.md`) thêm được `- Khi chọn sai cột nộp: **ai** (biểu cảm): …` và `- Khi xem từng bước: …`. Ví dụ (`thu-thach/tin-don.md`, thẻ `c-tin-bang`): `- Cột nộp: ma_tin`.
10. **Nơi bắt đầu của ngày** (trong `lich.md`):
    - ngày của Vụ 1: thêm vào tiêu đề, `## <Tên> {ngày: <n> · theo truyện · bắt đầu ở: <cảnh>}`. Ví dụ: `## Sảnh tòa B {ngày: 1 · theo truyện · bắt đầu ở: phong-clb}`.
    - vụ sau có một ngày: `- Ngày: YYYY-MM-DD · bắt đầu ở: <cảnh>`. Ví dụ (`lich.md`, Vụ 3 cũ): `- Ngày: 2024-10-22 · bắt đầu ở: phong-clb`.
11. **Nhiều ngày trong một vụ sau** (trong mục `{vụ sau: …}` của `lich.md`): mỗi ngày một dòng `- Ngày YYYY-MM-DD: <chuỗi đầu ngày> · bắt đầu ở: <cảnh>`, cùng `- Hạn chót:` và `- Việc chốt:`. Ví dụ: `- Chuỗi: s-tin`, `- Ngày: 2024-10-08`, `- Ngày 2024-10-08: s-tin · bắt đầu ở: c1`, `- Ngày 2024-10-09: s-ngay-2 · bắt đầu ở: c1`. `Chuỗi:` phải trùng chuỗi ngày đầu; ngày tăng dần và dùng chuỗi đầu riêng, ngày đầu trùng `Ngày:`, ngày cuối không sau `Hạn chót`. Mỗi ngày phải tới được `[XONG VIỆC CHÍNH]`; chỉ ngày cuối được tới `[KẾT THÚC]`. Chuỗi được hết cảnh và đứng nguyên chỗ. Máy kiểm đếm tối đa 2 **đích khác nhau** mang `· dấu: !` trên tuyến chính mỗi ngày; không đi qua điểm `[KHÁM PHÁ]` mang `?` hoặc không dấu để đếm. Truyện chữ in ngày thật, số ngày tới việc chốt; nút "Hết ngày" chỉ hiện sau `[XONG VIỆC CHÍNH]` và sang ngày thật kế tiếp; việc ngày lễ kết bằng "Hết việc ngày lễ.".
12. **Rời hình, vào hình** (trong `kich-ban/*.md`, 05/10/2026): `- [RA <mã nhân vật>]` cho nhân vật xuống khỏi dàn chân dung của cảnh đang đứng; `- [VÀO <mã>]` cho lên lại. `- [RA player]` là người chơi đứng ngoài quan sát: hình người chơi không đứng cạnh những người đang nói với nhau. Ai đã rời mà nói lại thì tự lên hình; đổi cảnh thì xóa hết. Dùng khi người chơi chỉ NHÌN hai người khác nói chuyện, hoặc khi một người đi khỏi giữa cảnh. Muốn đặt lệnh giữa một đoạn lời thì tách đoạn lời làm hai (`….1`, `….2`). Ví dụ (`00-mo-dau.md`, chuỗi `md-00-tung-chi-duong`): `[RA player]`, đoạn Hoài hỏi đường Tùng, `[RA hoai]`, rồi đoạn người chơi nghĩ thầm.
13. **Thẻ "Nhân vật mới" bật lúc nào** (máy tự tính, `canGioiThieu` trong `src/mvp/engine/may.ts`): ở câu nhân vật tự xưng ("Tớ là …"). Câu tự xưng nằm ở chuỗi nối liền phía sau (`[ĐI TỚI]`, `[ĐI CÙNG]`) thì máy chờ tới đó. Chuỗi mà người chơi không nói thành tiếng câu nào (chỉ nghĩ thầm trong ngoặc đơn) là chuỗi đứng ngoài quan sát: nhân vật nào về sau mới tự xưng thì chưa bật thẻ ở đây. Ô "Đi cùng" cũng chỉ hiện người đã giới thiệu xong.
14. **Hết ngày do người chơi bấm** (trong `kich-ban/*.md`, gói B15, 06/10/2026): `- [HẾT NGÀY <chuỗi tối>] <nhãn nút>` đặt ở chỗ việc chính của một ngày có bản đồ vừa xong, thay cho `[ĐI CÙNG <chuỗi tối>]`. Máy KHÔNG chạy chuỗi tối ngay: nó đưa người chơi về cảnh đang đứng (cảnh đang mở, cảnh vừa đóng nếu cùng nơi, không thì bản đồ của ngày) và từ đó bản đồ cùng mọi cảnh khám phá trong ngày có nút hết ngày mang nhãn này. Người chơi bấm thì chuỗi tối mới chạy, hết chuỗi là sang ngày kế. `- [HẾT NGÀY] <nhãn>` (không có chuỗi) thì bấm là sang ngày kế luôn. Dòng này phải là dòng cuối của chuỗi; nhãn viết thành một cụm động từ ("Về phòng KTX ăn tối") vì lời nhắc việc của bạn đi cùng chèn nó vào giữa câu (`hetNgay` trong `hoi-dap/dong-hanh.json`, chỗ điền `{nhan}`). Ví dụ (`kich-ban/02-ngay-2.md`): `- [HẾT NGÀY n2-toi] Về phòng KTX ăn tối`; (`kich-ban/03-ngay-3.md`): `- [HẾT NGÀY] Về ký túc xá nghỉ`. Bộ MVP không dùng cú pháp này (không có cờ điều hướng tự do thì dòng này chạy như `[ĐI CÙNG]`).
15. **Nơi đã ghé vào lại được** (máy tự lo, gói B15): ghim bản đồ đã ghé mà chuỗi của nó có một `[KHÁM PHÁ]` thường thì bấm lại là vào thẳng cảnh ấy, không đọc lại lời lúc tới. Chỗ bấm có `[HỎI ĐÁP]` (nhân chứng) đã gặp thì bấm lại là mở lại buổi hỏi với tiến độ cũ, đóng buổi hỏi là về cảnh, phần sau của chuỗi không chạy lại. Vì vậy mỗi nơi trên bản đồ nên có cảnh khám phá riêng và nhân chứng là một điểm bấm của cảnh (xem ngày 3: `n3-noi-ctsv`, `n3-noi-cang-tin`).
16. **Câu hẹp hơn mà đủ ở màn tra** (trong `loi/tt-*.md`, gói B15): thẻ có `- Bấm ô lấy giấy nhớ:` mà vật chứng chỉ giữ một phần giá trị của cột ấy thì màn tra nhận cả câu ít dòng hơn `SQL chuẩn`, miễn kết quả có cột lấy giấy nhớ (và cột nộp), mọi dòng nằm trong kết quả của câu chuẩn và còn đủ mọi giá trị của vật chứng. Lời cho trường hợp này: `- Khi đúng mà hẹp hơn: **ai** (biểu cảm): …` và `- Gợi ý khi đúng mà hẹp hơn: <bậc 1> <br> <bậc 2>`; thiếu thì dùng lời "Khi đúng". Ví dụ: `loi/tt-c-ten-h.md`.
17. **Thẻ nhân vật chỉ ghi điều đã biết** (gói B18, 06/10/2026; user chốt: "thẻ nhân vật mới chỉ ghi thông tin đã biết, chưa biết thì ?"). Trong `nhan-vat.md`, thẻ giới thiệu thêm dòng tùy chọn `- Biết lúc gặp: <danh sách>` với các ô `họ tên`, `danh xưng`, `năm`, `ngành`, `lịch`, `câu nói` (hoặc `không` = chưa biết ô nào): ô liệt kê là ô người chơi đã biết khi thẻ "Nhân vật mới" mở lần đầu (khai đúng điều câu tự xưng, hoặc câu đầu họ nói, làm lộ); chỉ liệt kê ô thẻ có dữ liệu. Ô chưa biết hiện "?" trên thẻ và tab Nhân vật (họ tên chưa biết → tiêu đề là tên gọi, thêm dòng "Họ tên: ?"; lịch, câu nói chưa biết thì ẩn hẳn). Trong `kich-ban/*.md`, đặt `- [BIẾT <mã> <ô>, <ô>]` ngay sau dòng `[LỜI …]` (hay màn tra) làm lộ điều đó; máy chạy qua không dừng, ghi vào `bietVe` của ván và báo một dòng "Hồ sơ Tùng: biết thêm họ tên" nếu thẻ đã mở. Máy kiểm: mã phải là nhân vật có thẻ giới thiệu; ô phải hợp lệ và có dữ liệu; ô đã có trong "Biết lúc gặp" (hoặc thẻ không khai dòng này, tức biết hết) mà còn `[BIẾT]` là lỗi (thừa); ô chưa biết mà cả bộ không có `[BIẾT]` nào mở là **cảnh báo**. Không có dòng "Biết lúc gặp" → biết hết (bộ MVP giữ nguyên). Ví dụ: `nhan-vat.md` Tùng `- Biết lúc gặp: danh xưng, năm, ngành`; `kich-ban/00-mo-dau.md` `- [BIẾT tung họ tên]` sau lần lọc thử ở Ngày hội (kết quả có cột họ đệm); `kich-ban/03-ngay-3.md` `- [BIẾT hoai họ tên]` sau `[THỬ THÁCH c-ten-h]`.
18. **Dàn chân dung hai hàng** (máy tự lo, gói B18): hàng trước tối đa ba người đang trong cuộc nói chuyện (có lời trong chuỗi đang chạy, kể cả lời trong phản hồi `[HỎI]` / `[RẼ NHÁNH]` / `[ĐỐI CHẤT]`, cộng `[VÀO]`, trừ `[RA]`); người thứ tư nói thì người nói lâu nhất lùi xuống hàng sau (nhỏ, tối hơn, không nhép môi) chứ không biến mất; người hàng sau nói lại thì lên hàng trước; hàng sau tối đa ba, dư thì người cũ nhất rời hẳn; `[RA x]` rời hẳn; đổi cảnh xóa cả hai hàng; màn dọc điện thoại ẩn hàng sau. Không cần khai gì trong nội dung.

## Tệp nào chứa gì (đọc theo thứ tự này)

| Tệp | Chứa gì | Viết thế nào |
|---|---|---|
| `quy-uoc.md` | Tên game (`# …`), `- Tên trường:`, `- Tên cấm:` | Tên cấm lọt vào chữ hiển thị là lỗi |
| `nhan-vat.md` | Thẻ nhân vật `### <mã> — <Tên>` với `Vai`, `Biểu cảm`, `Họ tên`, `Xuất hiện từ`, `Chỉ qua lời kể`; thẻ giới thiệu có thêm `Biết lúc gặp` (mục 17) | Đây là nguồn cho `{{nv.<mã>}}`. Mã không đổi khi đổi tên (bảo vệ tòa B là `bac-tu` dù tên là Bác Thịnh) |
| `canh.md` | Cảnh nền `### <mã> — <Tên>` (+ `- Ảnh nền:` nếu có ảnh) | Mọi `{cảnh: …}` phải có ở đây |
| `dia-diem.md` | `## <mã> — <Tên> {địa điểm: <mã>}` rồi các dữ kiện `### <mã> — <mô tả> {dữ kiện: chính\|phụ\|nhiễu}` | Mỗi dữ kiện có `Chuỗi:` (hội thoại) **hoặc** `Thử thách:` (màn phòng máy); `Mở từ:`, `Cần:`, `Mở manh mối:`, `Hiện tài liệu:`, `Lưu bằng chứng:`; `Ảnh:` đặt vật bấm được lên nền (xem dưới) |
| `lich.md` | `## Luật` (khung giờ, số khung tối đa cho dữ kiện chính, số dữ kiện **phụ/nhiễu** mỗi địa điểm — dữ kiện chính không tính, uy tín), `## Mở đầu` (`- Chuỗi đầu:` và `- Ngày mở đầu: YYYY-MM-DD` — ngày thật của mở đầu; màn lịch trong game tính mọi mốc từ đây. Truyện chương 1 năm **2024**: CN 08/09 nhận phòng, T7 14/09 Ngày hội, T3 17/09 Trung thu tại sân KTX là buổi gặp đầu, T2 23/09 phòng CLB nhận bản sao lá thư, ngày 1–5 = 24–28/09, họp rà soát T2 30/09/2024; thư in 15/09 và nộp 16/09 giữ nguyên), `## Ngày N … {ngày: N}` (một `Dữ kiện chính`, một `Buổi tối`) **hoặc** `## <Tên> {ngày: N · theo truyện}` (một `Chuỗi`), `## … {ngày họp}`, `## Kết` | Chương 1 (từ 30/09/2026) toàn ngày **theo truyện**: mỗi ngày một chuỗi, không bản đồ, không khung giờ, không uy tín; `dia-diem.md` để trống. Ngày địa điểm (máy kiểm "mỗi ngày một dữ kiện chính, ≤ 2 khung") dùng lại từ Vụ 2 |
| `du-lieu.md` | Bộ dữ liệu SQL **cố định** của vụ: `## <bảng> {bảng}` + `- Cột: <tên> TEXT\|INTEGER, …` + bảng Markdown; `## <tên> {bảng ảo}` + khối ` ```sql ` một câu SELECT | Máy nạp vào SQLite và **chạy thật** mọi câu SQL có khai số dòng; lệch là lỗi (QĐ-089). Sửa dữ liệu thì chạy lại lệnh kiểm |
| `kich-ban/*.md` | Chuỗi hội thoại `### <mã> — <mô tả> {cảnh: <mã cảnh>}` | Lời thoại và chỉ dẫn như bộ prototype; thêm `[TẠO NHÂN VẬT]`, `[LỌC THỬ]`, `[RẼ KẾT]`, `[LƯU BẰNG CHỨNG]`, `[ĐIỀU KIỆN]`, `[HẬU QUẢ]`, `[RẼ NHÁNH]`, `[TRA SỔ]`, `[CHÉP SỔ]`, `· trừ uy tín`; **`[ĐỐI CHẤT <mã>] <rival>: "<giả thuyết>"`** (01/10; giả thuyết đánh dấu chỗ cần bác bằng một cặp `**…**`) với dòng con bắt buộc `  - [CÂU HỎI] <câu hỏi cụ thể>` (03/10: câu người chơi trả lời bằng thẻ, hiện trên màn đối chất), `  - {<mã thẻ>} [ĐỦ CĂN CỨ\|HỖ TRỢ\|GỢI Ý] → phản hồi: …`, bắt buộc một `  - [CHƯA ĐỦ] → phản hồi: …` và một `  - [KHÁC] → phản hồi: …`; người chơi trình thẻ trong hồ sơ; ĐỦ CĂN CỨ kết thúc đối chất và đặt cờ `<mã>-du` (HỖ TRỢ đặt `<mã>-ho-tro`) dùng được ở `[ĐIỀU KIỆN]` |
| `thu-thach/*.md` | Thẻ thử thách phòng máy (khuôn cũ `### <mã> — … {challenge: <mã>}`) + `- Số dòng kỳ vọng:` | Bằng chứng (key item) của phòng máy khai ở `Vật chứng lưu vào hồ sơ` của thẻ |
| `so-tay/*.md` | Trang sổ CLB `# <mã> — <Tên> {trang sổ: <mã>}` với `- Loại:` và các mục `## Trang sổ CLB`, `## Hà Vy`, `## Chọn đoạn code`, `## Vào sổ cá nhân` | `[CHÉP SỔ]` cần trang có "Chọn đoạn code" |
| `chung/loi-chung.md` | `### Khi mất uy tín {lời chung: mat-uy-tin}`: lời Minh Anh từng lần mất vạch, dòng cuối `[HẾT VẠCH]` | Không nói đáp án |
| `ho-so/*.md` | `clue-…` giấy nhớ, `doc-…` tài liệu, `ev-…` bằng chứng thực địa — mỗi thẻ là một thẻ trên **bảng điều tra** | Thẻ không ai tạo (không dữ kiện / hậu quả nào mở) là lỗi. `- Giá trị cho trình dựng: a · b` = các tờ giấy nhớ kéo được vào màn tra; `- Loại trừ: <mã phiếu>` + `- Gạch: <giá trị>` = sợi chỉ cam tới phiếu đó và gạch giá trị trên phiếu; `- Ảnh:` = ảnh của thẻ |
| `loi/*.md` | **Lời** (phiên truyện sở hữu): đoạn `## <mã>` rồi các dòng thoại `- **ai** (cảm xúc): …`, `- [THẺ CHỮ]`, `- [DÀN DỰNG]`, `> NHIỆM VỤ:`, `- Khi …: …` | Gắn vào dòng `- [LỜI <mã>]` của `kich-ban/` hoặc `thu-thach/` (khung, phiên logic sở hữu). Máy báo lỗi khi khung cần lời mà thiếu, lời không ai dùng, hoặc lời chứa dòng cấu trúc. Dòng có `(tạm)` là lời tạm, được đếm để nhắc. `- Khi chạy ra <n> dòng với <cột>, <cột>:` chỉ nói khi các ô đã điền trên màn tra dùng đúng tập cột đó, và thắng dòng `Khi chạy ra <n> dòng:` không ghi cột |

## Vài luật máy kiểm thay bạn

- Mỗi địa điểm 1–3 dữ kiện **phụ/nhiễu** (dữ kiện chính không tính; QĐ-089).
- Mỗi ngày **đúng một** dữ kiện chính; chi phí khung (kể cả dữ kiện nó `Cần` cùng ngày và tiền "vào" phòng máy) ≤ số ở `## Luật`.
- Buổi tối phải `[ĐI TỚI]` chuỗi của dữ kiện chính (hoặc mở `[THỬ THÁCH]` của nó).
- Nhân vật không được nói trước `Xuất hiện từ` (Quân: ngày 3; thầy Quang, Hoài: ngày họp).
- Kết thật mở đầu bằng `[ĐIỀU KIỆN]`; điều kiện phải đạt được và phải **cần dữ kiện phụ** (chỉ dữ kiện chính mà đủ là lỗi).
- `trừ uy tín` chỉ ở chuỗi của ngày họp; có `Uy tín` thì phải có "Khi mất uy tín".
- `[TẠO NHÂN VẬT ten]` đúng một lần, ở mở đầu. `[TẠO NHÂN VẬT nganh]` tùy chọn (tối đa một lần); từ 04/10/2026 game bỏ bước chọn ngành, người chơi học Kế toán (`NGANH_NGUOI_CHOI` trong `src/mvp/engine/may.ts`), `{{nv.nguoi-choi.nganh}}` thay bằng ngành ấy. `{{nv.nguoi-choi}}` dùng được (runtime thay bằng tên người chơi).
- Chuỗi không được lịch, dữ kiện hay `[ĐI TỚI]` nào nối tới là lỗi ("chuỗi lẻ").
- Số dòng khai ở `[LỌC THỬ … · n dòng]`, `[MÀN CHIẾU … · n dòng]` (có câu SQL) và `- Số dòng kỳ vọng:` của thẻ thử thách phải bằng số dòng câu SQL chạy thật trên `du-lieu.md`. Số dòng chỉ ghi trong `[DÀN DỰNG]` (không kèm câu SQL) máy **chưa** kiểm được.

Nhãn `chính` / `phụ` / `nhiễu` và dòng `Phân biệt:` chỉ để người viết đọc, không hiện trong game.

## Đặt vật bấm được lên nền — dòng `- Ảnh:`

`- Ảnh: obj-hop-kien-nghi · x 28% · y 50% · rộng 8%` (vật, ảnh ở `src/assets/mvp/vat/`) hoặc
`- Ảnh: nv:hieu · x 20% · y 100% · rộng 15%` (người, dùng chân dung). **(x, y) là chân ảnh** (giữa cạnh dưới), % của ảnh
nền; `rộng` là % bề rộng nền. Hai dữ kiện chung một vật ghi y hệt nhau (game gộp thành một điểm). Thiếu dòng này chỉ bị
cảnh báo — dữ kiện vẫn chọn được qua nút "Danh sách" trong nơi đó. Mô tả dữ kiện không bao giờ hiện cho người chơi.
Chi tiết: đặc tả §18.4a.

## Từ Vụ 2: vụ sau, rẽ theo cờ, khối mới ở màn tra

- **Vụ sau** — cuối `lich.md`: `## <Tên vụ> {vụ sau: <mã>}` với `- Chuỗi:` (chuỗi đầu của vụ), `- Ngày: YYYY-MM-DD` (ngày thật trên màn lịch, tùy chọn), `- Tiêu đề kết:`, `- Lời kết:` (chữ màn kết của vụ). Vụ sau chơi tiếp từ màn kết của vụ trước (nút "Sang Vụ n"); luật mọi chuỗi phải tự đi tiếp chỉ áp dụng cho vụ **không có** dòng `- Ngày YYYY-MM-DD:`. Sang vụ mới, thẻ vụ trước được gỡ khỏi bảng điều tra (vẫn trong hồ sơ, ghim lại được); chỉ thẻ đang ghim mới thành giấy nhớ ở màn tra.
- **Cờ máy tự đặt** khi một vụ tới `[KẾT THÚC]`: `<mã vụ>-hoan-tat`; Vụ 1 thêm `vu1-ket-that` hoặc `vu1-ket-thuong`. Dùng được trong `[NẾU]`, `[KHI]`, `[ĐIỀU KIỆN]`.
- **`- [NẾU <điều kiện>] → đi tới <chuỗi>`** (trong `kich-ban/`): điều kiện thỏa thì sang chuỗi đó, không thì chạy tiếp dòng dưới. Ví dụ `- [NẾU có vu1-ket-that] → đi tới v2-mo-that`.
- **Khối mới ở màn tra** hiện theo SQL chuẩn của thẻ, không cần khai gì thêm: có `LOWER(…)` / `TRIM(…)` → nút gọt cột trước phép so (y nguyên → bỏ dấu cách thừa → đổi chữ thường → cả hai); có `ORDER BY <cột>` → hàng "XẾP THEO" (cột, tăng / giảm). Thẻ có `ORDER BY` thì máy chấm cả **thứ tự dòng**; lời riêng cho trường hợp đủ dòng mà sai thứ tự: `- Khi sai thứ tự: **ai** (cảm xúc): …`.
- **Dấu cách thật trong `du-lieu.md`**: bảng Markdown tự cắt dấu cách đầu / cuối ô, nên viết `␣` cho mỗi dấu cách cần giữ (`CLB-THAM-TU␣␣`). Màn tra hiện các dấu cách này thành chấm.
- **Nhiệm vụ phụ** — cuối `lich.md`: `## <Tên việc> {nhiệm vụ phụ: <mã>}` với `- Chuỗi:`, `- Người giao: <mã nhân vật>`, `- Mở sau: <mã vụ chính>`, `- Ngày:` (tùy chọn), `- Tiêu đề kết:`, `- Lời kết:`. Việc do một NPC giao, không dính truyện chính, để rèn kỹ năng. Khi vụ `Mở sau` đã xong, người chơi có thể mở việc từ bảng hoạt động bất kỳ lúc nào trên tuyến chính; tiến độ tuyến được cất đúng cảnh để họ qua lại giữa hai tuyến. Chuỗi kết bằng `[KẾT THÚC]`; hoàn tất đặt cờ `<mã>-hoan-tat`. Vụ chính không được đòi kỹ năng chỉ dạy ở nhiệm vụ phụ.
- **Phiếu làm nguồn (`Kiểu: lọc tiếp`)** — trong thẻ thử thách: `- Kiểu: lọc tiếp` + `- Nguồn: <mã vật chứng của thẻ đứng trước>`, SQL chuẩn viết `FROM @<mã vật chứng>`. Màn tra lấy phiếu người chơi đã ghim làm nguồn thay cho bảng, và hiện câu thành `WITH <tên> AS (phiếu …) SELECT … FROM <tên> WHERE …` (tên tạm suy từ mã: `ev-tin-don` → `tin_don`). `Kiểu: tổng hợp` (nhóm và đếm trên phiếu) vẫn dùng màn tổng hợp riêng.
- **Nối hai bảng (`Nối được với`)** — trong thẻ thử thách thường: `- Nối được với: <bảng> · <bảng>`; SQL chuẩn viết `FROM a JOIN b ON a.k = b.k`. Màn tra hiện hàng "NỐI VỚI [bảng] THEO [cột]", cột nối chọn trong các cột trùng tên của hai bảng. Cột trùng tên dùng ở điều kiện được máy viết thành `<bảng gốc>.<cột>`; trong SELECT của SQL chuẩn thì tự viết rõ (`luan_chuyen.vi_tri`). Muốn có bẫy nối sai thì để hai bảng có thêm một cột trùng tên khác nghĩa (như `ngay`, `vi_tri`) và viết lời "Khi chạy ra N dòng" cho số dòng của lần nối sai.
- **Tổng, trung bình, lọc nhóm ở `Kiểu: tổng hợp`** — SQL chuẩn có `SUM(cot) AS tong_<cot>` / `AVG(cot) AS tb_<cot>` thì màn tổng hợp hiện mục "TÍNH THÊM"; có `HAVING COUNT(*) | SUM(cot) | AVG(cot) > <số>` thì hiện mục "CHỈ GIỮ NHÓM", ngưỡng lấy từ giấy nhớ có giá trị là số. Câu xem trước luôn ở dạng `WITH <tên> AS (…) SELECT … GROUP BY … HAVING …`.

## Khám phá ba kiểu, dấu ! / ?, lịch nhân vật (02/10/2026)

- `[KHÁM PHÁ <mã>]` — cảnh thường: vật / người trên nền cảnh. Dùng cho **phòng CLB có người để bấm**: mỗi người một dòng `nv:<mã> · x … · y 100% · rộng 15% → <chuỗi> · dấu: ! · nhãn: Duy: mở laptop`.
- `[KHÁM PHÁ <mã> · bản đồ]` — nền là bản đồ trường; mỗi nơi đến một dòng `ghim:<mã> · x … · y … · rộng 5% → <chuỗi> · dấu: ! · có: co-lan, co-hanh · nhãn: Phòng Công tác sinh viên`. `có:` là người đang ở đó; ảnh mặt chỉ hiện khi người chơi đã nói chuyện với họ và thẻ nhân vật có dòng `- Lịch:`.
- `[KHÁM PHÁ <mã> · quan sát <nhân vật>]` — soi chi tiết trên chân dung; mỗi chi tiết một dòng `vung:<mã> · x … · y … · rộng … → <chuỗi> · nhãn: Cái balo` (x, y là TÂM vòng soi theo % ảnh chân dung 768×1360; rộng là đường kính). Chi tiết nào cần thành manh mối thì đặt `[HẬU QUẢ] mở manh mối …` trong chuỗi của nó.
- `· dấu: !` = việc chính, `· dấu: ?` = tùy chọn. **Luật dấu (04/10/2026, máy kiểm báo lỗi):** `!` = đầu mối của nhiệm vụ đang làm — mọi chỗ bấm đẩy truyện đi tiếp ([ĐI TỚI], [HẬU QUẢ] đi tới, [NẾU] → đi tới) bắt buộc `!`; chỗ mở manh mối / tài liệu / bằng chứng / màn tra phải có `!` (nhiệm vụ chính) hoặc `?` (việc phụ, tuyến bí mật như quán trà đá); KHÔNG dấu chỉ dành cho chi tiết ẩn thuần túy (không bắt buộc, không mở gì). Cảnh có chỗ bắt buộc mà không có dấu nào là lỗi. Vùng `vung:` có dấu thì vòng và huy hiệu hiện sẵn; màn soi chân dung (quan sát) không dùng dấu. Có điểm `!` thì xem hết các điểm `!` là cảnh đi tiếp (điểm `?` không bắt buộc); không có dấu nào thì phải xem hết mọi điểm. `ghim:` và `vung:` bắt buộc có `nhãn:`.
- Vụ sau không có dòng `- Ngày YYYY-MM-DD:` vẫn giữ luật chuỗi tự đi tiếp; vụ có các dòng ngày để người chơi đứng nguyên chỗ khi hết cảnh.
- `nhan-vat.md`: dòng `- Lịch: …` (thói quen đi lại) hiện ở thẻ nhân vật, mục "Thường gặp ở đâu".
- Thêm / bớt nút trong một chuỗi làm lệch ô lưu cũ; màn chơi tự chạy tiếp tới nút cần người chơi thay vì báo lỗi.

### Cảnh sau kết và nền là ảnh hoạt cảnh (02/10/2026)

- Chuỗi kết thật / kết thường được kết bằng `[ĐI TỚI <chuỗi>]` thay cho `[KẾT THÚC]`, miễn chuỗi đích kết bằng `[KẾT THÚC]` (Vụ 1: `ket-that` → `ket-tra-da`). Máy ghi loại kết ngay lúc rẽ nên màn kết vẫn đúng.
- Muốn một ảnh hoạt cảnh làm nền cho cả đoạn (không hiện nhân vật đứng): khai một cảnh riêng trong `canh.md` và đặt ảnh tên `bg-mvp-<mã cảnh>.webp`; câu `[RẼ NHÁNH]` để `narrator` hỏi thì không có nhãn tên (cảnh `san-dem` của nhiệm vụ phụ "Một lần dẫn lạc").
- Bốn mẩu chuyện ở quán trà đá (`ho-so/04-tra-da.md`) là lời kể tùy chọn, không mẩu nào là điều kiện của kết.

### Lịch nhân vật theo thứ và giờ (02/10/2026)

- `nhan-vat.md`: `- Lịch: …` là chữ người chơi đọc ở thẻ nhân vật. `- Thường ở: T2–T7 07:00–23:00 → toa-b; CN 20:00–23:00 → toa-b` là bản máy đọc của chính lịch ấy. Thứ viết `T2`…`T7`, `CN`, khoảng `T2–T6`, danh sách `T2, T4, T6`, hoặc `mọi ngày`. Nơi là mã ghim của bản đồ (`ghim:<mã>`). Hai dòng phải nói cùng một điều.
- Bản đồ khai giờ trong truyện: `- [KHÁM PHÁ <mã> · bản đồ · giờ 15:00]`. Thứ lấy từ ngày trong truyện. Thiếu giờ là lỗi.
- Ảnh mặt cạnh ghim = người lịch đặt ở đó vào thứ, giờ ấy, cộng người kịch bản đặt bằng `có:`; vẫn chỉ hiện người đã gặp. Bài kiểm `src/mvp/engine/lich-nhan-vat.test.ts` bắt trường hợp `có:` đặt một người ở ghim này trong khi lịch ghi họ đang ở ghim khác. Thêm bản đồ mới thì thêm ngày của nó vào bảng trong bài kiểm đó.

### Chi tiết ẩn, soi theo bộ đồ, cảnh cắt Hà Vy (02/10/2026)

- **Chi tiết ẩn trên cảnh:** trong `[KHÁM PHÁ]` thường, điểm `vung:<mã> · x … · y … · rộng … → <chuỗi> · nhãn: …` là một chỗ bấm KHÔNG có dấu (tấm lưng áo xanh giữa đám đông ở sảnh ký túc xá). Người chơi tự tìm; sau mười giây mới nháy rất nhẹ. Dòng "Còn n chỗ chưa xem" vẫn đếm nó.
- **Soi theo bộ đồ:** `[KHÁM PHÁ <mã> · quan sát tung/ao-xanh]` soi nhân vật ở đúng dáng / bộ đồ ấy (thiếu thì lấy dáng đầu).
- **Cảnh cắt Hà Vy:** thêm `· Hà Vy soi` vào dòng quan sát thì màn soi mở bằng một dải ảnh đôi mắt Hà Vy, kính lóe sáng (`giao-dien/cat-canh-ha-vy-mat.webp`), xong các điểm soi mới hiện. Chỉ dùng khi Hà Vy có mặt; ở sảnh ký túc xá hôm nhập học người chơi tự soi nên không có.
- Muốn bấm vào một người rồi mới soi: cho điểm của người đó trỏ tới một chuỗi kết bằng `[ĐI TỚI <chuỗi soi>]`, chuỗi soi chứa `[KHÁM PHÁ … · quan sát …]` (máy chỉ giữ một màn khám phá một lúc, không lồng).
