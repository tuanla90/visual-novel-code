# Kịch bản MVP — `prototype/noi-dung-mvp/`

Đây là nguồn chữ của **bản MVP** (mở đầu tuần 1 + Vụ 1 "Chữ ký H", theo `docs/mvp/kich-ban-vu1-mvp-khung.md`). Cú pháp đầy đủ: [`docs/dac-ta-dinh-dang-noi-dung.md`](../../docs/dac-ta-dinh-dang-noi-dung.md) mục 18. Bộ nội dung prototype (`../noi-dung/`) là bộ khác, game hiện tại vẫn chạy từ bộ đó; bộ này **chưa có runtime** chơi được (gói kiến trúc MVP sau).

## Sửa xong thì kiểm

Trong thư mục `prototype/`:

```
npm run kiem-noi-dung:mvp
```

- Không lỗi: một dòng `noi-dung-mvp: 20 tệp, không lỗi — 15 nhân vật, … 2 bảng dữ liệu; 5 câu SQL khai số dòng, chạy thật khớp 5.`
- Có lỗi: mỗi lỗi một dòng `<tệp>:<dòng>: <lỗi>` (trong VS Code bấm Ctrl + chuột vào đường dẫn để mở đúng dòng).
- Lệnh chỉ đọc, không ghi gì. Sạch rồi thì `npm run noi-dung:sinh:mvp` ghi `src/content/generated/mvp/kich-ban.gen.ts`; commit **cả** `.md` lẫn `.gen.ts` (quên là test `mvp.gen.test.ts` đỏ). `npm run kiem-noi-dung` và `npm run noi-dung:sinh` (không đuôi `:mvp`) chạy cả hai bộ.

Ví dụ lỗi thật bộ kiểm bắt được:

```
noi-dung-mvp/lich.md:21: ngày 2: dữ kiện chính "dk-loc-lop" tốn 3 khung (qua dk-loc-lop → dk-co-hanh-cap-quyen) — luật "Dữ kiện chính tối đa: 2 khung"
noi-dung-mvp/kich-ban/01-ngay-1.md:13: nhân vật quan nói ở chuỗi tới được từ ngày 1 sáng nhưng "Xuất hiện từ: ngày 3"
noi-dung-mvp/kich-ban/06-hop-va-ket.md:29: [ĐIỀU KIỆN]: không có mã "ev-khong-ton-tai" (chưa khai ở ho-so/ hay thẻ thử thách)
noi-dung-mvp/kich-ban/06-hop-va-ket.md:8: [MÀN CHIẾU hop-chieu-or]: khai 13 dòng nhưng chạy thật trên noi-dung-mvp/du-lieu.md ra 14 dòng — SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop = 'BC24A';
```

## Tệp nào chứa gì (đọc theo thứ tự này)

| Tệp | Chứa gì | Viết thế nào |
|---|---|---|
| `quy-uoc.md` | Tên game (`# …`), `- Tên trường:`, `- Tên cấm:` | Tên cấm lọt vào chữ hiển thị là lỗi |
| `nhan-vat.md` | Thẻ nhân vật `### <mã> — <Tên>` với `Vai`, `Biểu cảm`, `Họ tên`, `Xuất hiện từ`, `Chỉ qua lời kể` | Đây là nguồn cho `{{nv.<mã>}}`. Mã không đổi khi đổi tên (bảo vệ tòa B là `bac-tu` dù tên là Bác Thịnh) |
| `canh.md` | Cảnh nền `### <mã> — <Tên>` (+ `- Ảnh nền:` nếu có ảnh) | Mọi `{cảnh: …}` phải có ở đây |
| `dia-diem.md` | `## <mã> — <Tên> {địa điểm: <mã>}` rồi các dữ kiện `### <mã> — <mô tả> {dữ kiện: chính\|phụ\|nhiễu}` | Mỗi dữ kiện có `Chuỗi:` (hội thoại) **hoặc** `Thử thách:` (màn phòng máy); `Mở từ:`, `Cần:`, `Mở manh mối:`, `Hiện tài liệu:`, `Lưu bằng chứng:`; `Ảnh:` đặt vật bấm được lên nền (xem dưới) |
| `lich.md` | `## Luật` (khung giờ, số khung tối đa cho dữ kiện chính, số dữ kiện **phụ/nhiễu** mỗi địa điểm — dữ kiện chính không tính, uy tín), `## Mở đầu` (`- Chuỗi đầu:` và `- Ngày mở đầu: YYYY-MM-DD` — ngày thật của mở đầu; màn lịch trong game tính mọi mốc từ đây. Truyện chương 1 năm **2024**: CN 08/09 nhận phòng, T7 14/09 Ngày hội, T2 16/09 phòng CLB, ngày 1–5 = 17–21/09, họp rà soát T2 23/09/2024; ngày trong `du-lieu.md` phải khớp), `## Ngày N … {ngày: N}` (một `Dữ kiện chính`, một `Buổi tối`) **hoặc** `## <Tên> {ngày: N · theo truyện}` (một `Chuỗi`), `## … {ngày họp}`, `## Kết` | Chương 1 (từ 30/09/2026) toàn ngày **theo truyện**: mỗi ngày một chuỗi, không bản đồ, không khung giờ, không uy tín; `dia-diem.md` để trống. Ngày địa điểm (máy kiểm "mỗi ngày một dữ kiện chính, ≤ 2 khung") dùng lại từ Vụ 2 |
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
- `[TẠO NHÂN VẬT ten]` rồi `[TẠO NHÂN VẬT nganh]`, mỗi cái đúng một lần, ở mở đầu. `{{nv.nguoi-choi}}` dùng được (runtime thay bằng tên người chơi).
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

- **Vụ sau** — cuối `lich.md`: `## <Tên vụ> {vụ sau: <mã>}` với `- Chuỗi:` (chuỗi đầu của vụ), `- Ngày: YYYY-MM-DD` (ngày thật trên màn lịch, tùy chọn), `- Tiêu đề kết:`, `- Lời kết:` (chữ màn kết của vụ). Vụ sau chơi tiếp từ màn kết của vụ trước (nút "Sang Vụ n"); mọi chuỗi của nó phải kết bằng `[ĐI TỚI …]`, `[RẼ NHÁNH]` có "đi tới" ở mọi lựa chọn, hoặc `[KẾT THÚC]`. Sang vụ mới, thẻ vụ trước được gỡ khỏi bảng điều tra (vẫn trong hồ sơ, ghim lại được); chỉ thẻ đang ghim mới thành giấy nhớ ở màn tra.
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
- `· dấu: !` = việc chính, `· dấu: ?` = tùy chọn. Có điểm `!` thì xem hết các điểm `!` là cảnh đi tiếp (điểm `?` không bắt buộc); không có dấu nào thì phải xem hết mọi điểm. `ghim:` và `vung:` bắt buộc có `nhãn:`.
- Chuỗi của vụ sau vẫn phải kết bằng `[ĐI TỚI …]`: đặt một dòng `[ĐI TỚI <chuỗi của điểm !>]` ngay sau `[KHÁM PHÁ … · bản đồ]`.
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
