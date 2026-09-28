# Vụ 1 — Buổi giải trình (kịch bản lời thoại)

> Viết theo tài liệu thiết kế v0.3 · Buổi 4 của vụ "Bức thư nặc danh"
> Thời lượng dự kiến: 15–25 phút chơi
>
> **Lưu ý 28/09/2026 — bản này chưa viết lại theo các quyết định mới.** Khi mâu thuẫn, `docs/lich-su-quyet-dinh.md` thắng:
> - **Dữ liệu và kiến thức (QĐ-073, QĐ-077):** MVP dùng dữ liệu cố định, không có biến theo mã đề; vòng chính chỉ WHERE, `=`, `LIKE`, AND/OR; "Báo chí" là **ngành** (cột `nganh`), không phải câu lạc bộ; cột `clb` bị ẩn; lớp BC24A; câu OR của Quân ra 14 dòng. Lời khai 2 (câu lạc bộ) và lời khai 3 (ngày nhập học) cần viết lại theo dữ liệu này.
> - **Cách kết (QĐ-024):** không kết bằng truy vấn ra "đúng một người"; kết bằng "kết quả chưa đủ kết luận, cần nguồn xác minh độc lập".
> - **Phản biện Quân theo 5 nhịp (QĐ-082, QĐ-083):** Quân nói lập luận sai bằng lời → chỉ dòng sai → sửa và chạy lại ("Số liệu đây!") → Hà Vy gọi tên lỗi bằng toán → câu đọc kết quả → thầy Quang hỏi kết luận. Trừ uy tín ở nhịp 1, 4, 5; mỗi lần mất vạch Minh Anh giải cứu.
> - **Nhân vật (QĐ-074, QĐ-081):** bộ ba Tùng – người chơi – Hà Vy cùng năm 1, xưng "tớ – cậu"; Tùng là thành viên CLB (chỗ ngồi ở phòng giải trình chưa chốt); Hà Vy không giải thích cú pháp SQL; bác Tư → bác Thịnh (bảo vệ giảng đường B). Câu hô là **"Số liệu đây!"** (QĐ-082).
> - **Xếp hạng (QĐ-080):** không tính số lần dùng gợi ý.
> - Sẽ viết lại ở gói kịch bản MVP (QĐ-077). Bản này chỉ sửa máy móc: câu hô, tên bác Thịnh, xưng hô của Tùng, câu của Hà Vy ở cuối, bảng xếp hạng.

---

## Quy ước

**Biến theo mã đề**

| Biến | Ý nghĩa | Ví dụ |
|---|---|---|
| `{TEN_NV}` | Tên nhân vật chính | Khoa |
| `{NGANH_NV}` | Ngành nhân vật chính | Kế toán – Kiểm toán |
| `{NC_HOTEN}` / `{NC_TEN}` | Họ tên / tên gọi của nhân chứng (người bỏ thư) | Lê Thị Hoài / Hoài |
| `{NC_MASV}` | Mã sinh viên nhân chứng | SV240317 |
| `{NC_LOP}` | Lớp sinh hoạt của nhân chứng | QT24B |
| `{NC_CLB}` | Câu lạc bộ của nhân chứng (một trong `CLB_NGHI`) | Báo chí |
| `{CHU_CAI}` | Chữ cái chữ ký | H |
| `{TOA}` | Giảng đường có hộp góp ý | B |
| `{CLB_1}`, `{CLB_2}` | Hai câu lạc bộ khả nghi | Báo chí, Văn học |
| `{NAM_NHAP}` | Năm nhập học của nhân chứng | 2024 |
| `{SO_QUAN}` | Số dòng truy vấn lỗi của Quân trả về | 57 |

**Ký hiệu**
- `[biểu cảm]` — biểu cảm nhân vật hiển thị.
- `▶` — lựa chọn / hành động của người chơi.
- `✔` — nhánh đúng. `✘` — nhánh sai.
- `⚠ −1 uy tín` — mất một vạch uy tín (tối đa 5 vạch).
- `[HIỆU ỨNG]` — ghi chú âm thanh, hình ảnh.
- **"Số liệu đây!"** — câu hô khi đưa vật chứng hoặc kết quả truy vấn phản bác. Hiện chữ lớn, rung màn hình.

**Vật chứng người chơi mang vào** (đã lưu ở buổi điều tra)

| # | Tên vật chứng | Loại | Nội dung |
|---|---|---|---|
| 1 | Bản chụp lá thư | Vật thể | Thư đề nghị thu hồi phòng CLB, ký "{CHU_CAI}." |
| 2 | Lời bác Thịnh (bảo vệ giảng đường B) | Lời khai | Hộp góp ý được mở sáng thứ Hai là hộp ở giảng đường {TOA} |
| 3 | Mẩu bookmark bị xé | Vật thể | Nửa logo, khớp với {CLB_1} và {CLB_2} |
| 4 | Lớp sinh hoạt tại giảng đường {TOA} | Kết quả truy vấn | Danh sách mã lớp có `toa_nha = '{TOA}'` |
| 5 | Danh sách thu hẹp | Kết quả truy vấn | Sinh viên tên bắt đầu bằng {CHU_CAI}, thuộc các lớp ở giảng đường {TOA}, thuộc {CLB_1} hoặc {CLB_2} (2–3 người) |

---

## Mở màn

`[HIỆU ỨNG]` Phòng họp phòng Công tác sinh viên. Bàn dài. Thầy Quang ngồi giữa. Bên trái: Minh Anh, {TEN_NV}, Hà Vy. Bên phải: Quân, tập hồ sơ xếp ngay ngắn. Tùng ngồi hàng ghế dự thính, giơ ngón cái.

**Thầy Quang** [nghiêm]: Buổi giải trình về lá thư đề nghị thu hồi phòng của CLB Thám Tử bắt đầu. Tôi nhắc lại: ở đây không ai bị xử phạt. Chúng ta chỉ làm rõ sự việc.

**Thầy Quang** [nghiêm]: Ban Pháp chế Hội sinh viên, mời em trình bày.

**Quân** [khoanh tay]: Cảm ơn thầy. Tôi là Đặng Hoàng Quân, trưởng ban Pháp chế – Kiểm tra.

**Quân** [bình thản]: Ban Pháp chế không có ý kiến về nội dung lá thư. Nhưng CLB Thám Tử khẳng định đã tìm ra người bỏ thư. Chúng tôi cần kiểm tra khẳng định đó dựa trên cái gì.

**Quân** [liếc sang]: Nói thẳng, một CLB đã nhiều năm không giải được vụ nào, nay bỗng "tìm ra thủ phạm" sau hai buổi. Tôi nghi ngờ.

**Minh Anh** [cắn môi, thì thầm]: {TEN_NV}… chị lo phần hỏi chuyện. Phần dữ liệu trông vào em.

**Hà Vy** [đẩy kính, thì thầm]: Bình tĩnh. Nhân chứng sẽ nói sai ở đâu đó. Chỗ nào không khớp với vật chứng, mình đập ngay.

**Thầy Quang**: Mời nhân chứng.

`[HIỆU ỨNG]` {NC_TEN} bước vào, ôm balo trước ngực.

**{NC_TEN}** [lo lắng]: Em… em là {NC_HOTEN}, lớp {NC_LOP}. Em không biết sao em lại bị gọi lên đây.

**Quân**: Bạn cứ trình bày những gì bạn biết. Nếu CLB Thám Tử không chứng minh được, bạn không có liên quan gì hết.

---

## Lời khai 1 — "Em chẳng liên quan gì"

`[HIỆU ỨNG]` Tiêu đề lời khai hiện lên. Nhạc thẩm vấn bắt đầu.

**{NC_TEN}** [lo lắng]:
1. Em chưa bao giờ viết hay bỏ thư góp ý gì cả.
2. Mà em cũng đâu có học ở giảng đường {TOA}.
3. Sáng thứ Hai em ngồi ở thư viện suốt.

### Hỏi thêm

**▶ Hỏi thêm câu 1**
> **{TEN_NV}**: Chưa bao giờ, kể cả năm trước?
> **{NC_TEN}** [cứng giọng]: Chưa bao giờ. Em không thích mấy chuyện góp ý.
> **Hà Vy** [thì thầm]: Câu này mình chưa có gì để bác. Tìm câu khác.

**▶ Hỏi thêm câu 2**
> **{TEN_NV}**: Không học ở đó nghĩa là lớp bạn không bao giờ lên giảng đường {TOA}?
> **{NC_TEN}** [gật mạnh]: Đúng. Lớp em không có gì ở giảng đường {TOA} hết.
> **Hà Vy** [nheo mắt]: "Không có gì" à… Mình có danh sách lớp nào sinh hoạt ở đó mà nhỉ?

**▶ Hỏi thêm câu 3**
> **{TEN_NV}**: Thư viện có ai thấy bạn không?
> **{NC_TEN}** [ngập ngừng]: Chắc… có. Em ngồi một mình.
> **Tùng** [từ hàng ghế dự thính, thì thầm to]: Thẻ ra vào thư viện có lưu đó! …À mà mình chưa được xem bảng đó.
> **Thầy Quang** [liếc]: Người dự thính giữ trật tự.
> **Tùng** [co người]: Dạ.

### Đưa vật chứng

**✔ Câu 2 + Vật chứng #4 "Lớp sinh hoạt tại giảng đường {TOA}"**

> `[HIỆU ỨNG]` **"Số liệu đây!"** — màn hình rung.
> **{TEN_NV}**: Đây là danh sách các lớp sinh hoạt ở giảng đường {TOA}, lấy từ dữ liệu phòng Đào tạo. Lớp {NC_LOP} — lớp của bạn — nằm ngay trong danh sách.
> **{NC_TEN}** [giật mình]: Đó… đó là lớp sinh hoạt thôi mà!
> **Quân** [nhướng mày]: Lớp sinh hoạt ở đó không có nghĩa bạn ấy có mặt hôm đó.
> **Minh Anh** [đứng lên]: Nhưng bạn ấy vừa khai là "lớp em không có gì ở giảng đường {TOA} hết". Câu đó sai.
> **Thầy Quang**: Nhân chứng, em khai lại cho chính xác.
> **{NC_TEN}** [cúi đầu]: …Dạ.

→ Sang **Lời khai 2**.

**✘ Đưa sai vật chứng hoặc đưa ở câu khác**

> **Thầy Quang** [nhíu mày]: Vật chứng này không mâu thuẫn với lời khai đó.
> **Quân** [khẽ cười]: CLB Thám Tử đang đoán mò à?
> ⚠ **−1 uy tín**

**Gợi ý của Hà Vy** (khi người chơi bấm "Hỏi Hà Vy")
> **Hà Vy**: Bạn ấy nói "không có gì" ở giảng đường {TOA}. Mình từng truy vấn các lớp sinh hoạt ở đó, đúng không? Mở hồ sơ ra xem lớp của bạn ấy.

---

## Lời khai 2 — "Về câu lạc bộ"

**{NC_TEN}** [khó chịu]:
1. Được rồi, lớp em sinh hoạt ở đó. Nhưng cả trăm người cũng vậy.
2. Còn mẩu bookmark gì đó, ai làm rơi chẳng được.
3. Em thậm chí không tham gia câu lạc bộ nào.

### Hỏi thêm

**▶ Hỏi thêm câu 1**
> **{NC_TEN}**: Anh chị định buộc tội cả trăm người à?
> **Minh Anh** [bình tĩnh]: Không ai buộc tội ai. Nhưng trong trăm người đó, người có tên bắt đầu bằng chữ {CHU_CAI} thì ít hơn nhiều.
> **Quân** [ghi chép]: Vẫn là nhiều người.

**▶ Hỏi thêm câu 2**
> **{TEN_NV}**: Bạn có biết logo trên bookmark là của câu lạc bộ nào không?
> **{NC_TEN}** [liếc đi chỗ khác]: Sao em biết được. Em có tham gia đâu.
> **Hà Vy** [thì thầm]: Bạn ấy nói chắc nịch lắm. Mình kiểm tra thẳng trong dữ liệu được không?

**▶ Hỏi thêm câu 3**
> **{TEN_NV}**: Không tham gia câu lạc bộ nào, kể cả năm trước?
> **{NC_TEN}** [nhanh]: Không. Em đi làm thêm, không có thời gian.

### Truy vấn tại chỗ

**✔ Chọn "Truy vấn tại chỗ" ở câu 3**

> **{TEN_NV}**: Thưa thầy, em xin kiểm tra trực tiếp trên dữ liệu phòng Đào tạo.
> **Thầy Quang**: Được. Chiếu lên màn hình.
>
> `[HIỆU ỨNG]` Màn hình trình soạn SQL mở ra (Khối lệnh hoặc Hardcore theo mode đang chọn).
>
> **Yêu cầu:** lấy câu lạc bộ của sinh viên có mã `{NC_MASV}`.
> ```sql
> SELECT ho_dem, ten, clb
> FROM sinh_vien
> WHERE ma_sv = 'SV240317';
> ```
> *(Chấp nhận mọi truy vấn trả về đúng dòng của nhân chứng và có cột `clb`.)*

**✔ Truy vấn đúng**

> `[HIỆU ỨNG]` Kết quả hiện: **{NC_HOTEN} — {NC_CLB}**. **"Số liệu đây!"**
> **{TEN_NV}**: Theo dữ liệu, bạn là thành viên CLB {NC_CLB}. Và logo trên mẩu bookmark khớp với CLB {NC_CLB}.
> **{NC_TEN}** [tái mặt]: …
> **Quân** [đặt bút xuống]: Đăng ký một câu lạc bộ rồi không sinh hoạt cũng là chuyện thường.
> **Minh Anh**: Có thể. Nhưng bạn ấy vừa khai là "không tham gia câu lạc bộ nào". Lại một câu sai.
> **Thầy Quang** [gõ nhẹ bàn]: Nhân chứng, lần thứ hai rồi. Em cần khai đúng sự thật.

→ Sang **Lời khai 3**. Truy vấn được tự động lưu thành **Vật chứng #6 "Câu lạc bộ của {NC_TEN}"**.

**✘ Truy vấn sai** (trả về nhiều dòng, sai người, hoặc thiếu cột `clb`)

> **Quân** [lắc đầu]: Kết quả này không chứng minh được gì về nhân chứng.
> ⚠ **−1 uy tín**
> **Hà Vy** [thì thầm]: Mình chỉ cần đúng một người. Lọc theo mã sinh viên ấy.

**✘ Đưa vật chứng #3 (bookmark) ở câu 3**

> **Quân** [khoanh tay]: Một mẩu giấy nhặt dưới đất không chứng minh bạn ấy thuộc câu lạc bộ nào.
> **Hà Vy** [thì thầm]: Anh ta nói đúng. Bookmark chỉ cho biết câu lạc bộ nào. Cần dữ liệu cho biết bạn ấy thuộc câu lạc bộ nào.
> ⚠ **−1 uy tín**

---

## Lời khai 3 — "Về CLB Thám Tử"

**{NC_TEN}** [giọng nhỏ dần]:
1. Em có đăng ký CLB {NC_CLB}, nhưng chỉ để lấy tài liệu.
2. Em là tân sinh viên, mới vào trường tháng trước thôi.
3. Nên em đâu biết CLB Thám Tử là gì mà viết thư.

### Hỏi thêm

**▶ Hỏi thêm câu 1**
> **{NC_TEN}**: Tài liệu ôn thi. Anh chị năm trên hay chia sẻ.

**▶ Hỏi thêm câu 2**
> **{TEN_NV}**: Tân sinh viên năm nay, giống mình?
> **{NC_TEN}** [gật]: Ừ… giống bạn.
> **Tùng** [thì thầm to]: Ơ, hồi đón tân sinh viên tớ đâu có thấy bạn này!
> **Thầy Quang** [liếc]: Người dự thính.
> **Tùng**: Dạ dạ.

**▶ Hỏi thêm câu 3**
> **{NC_TEN}**: Em chỉ biết mấy CLB ở ngày hội thôi.
> **Hà Vy** [thì thầm]: Lá thư viết "CLB không còn giải quyết được việc gì". Người mới vào trường sao biết CLB từng giải quyết được việc gì?

### Truy vấn tại chỗ

**✔ Chọn "Truy vấn tại chỗ" ở câu 2**

> **Yêu cầu:** lấy ngày nhập học của nhân chứng.
> ```sql
> SELECT ho_dem, ten, ngay_nhap_hoc
> FROM sinh_vien
> WHERE ma_sv = 'SV240317';
> ```

**✔ Truy vấn đúng**

> `[HIỆU ỨNG]` Kết quả: **ngày nhập học: 09/{NAM_NHAP}**. **"Số liệu đây!"**
> **{TEN_NV}**: Bạn nhập học từ năm {NAM_NHAP}. Bạn không phải tân sinh viên.
> **{NC_TEN}** [ôm chặt balo]: …
> **Minh Anh** [nhẹ giọng]: Bạn ở trường đủ lâu để biết CLB Thám Tử ngày trước thế nào. Đủ lâu để viết được câu "không còn giải quyết được việc gì".

→ Sang **Phản bác của rival**.

**✘ Truy vấn sai**

> **Quân**: Kết quả này không liên quan đến lời khai.
> ⚠ **−1 uy tín**
> **Hà Vy**: Bạn ấy nói "mới vào trường". Cột nào trong bảng cho biết ngày vào trường?

---

## Phản bác của rival

**Quân** [đứng dậy]: Khoan đã, thưa thầy.

`[HIỆU ỨNG]` Nhạc đổi, căng thẳng hơn. Quân mở laptop, chiếu lên màn hình.

**Quân** [tự tin]: CLB Thám Tử đã chỉ ra nhân chứng khai sai vài chi tiết. Nhưng khai sai không có nghĩa là người bỏ thư.

**Quân**: Ban Pháp chế đã tự kiểm tra lại trên cùng dữ liệu, dùng đúng các manh mối CLB đưa ra: chữ ký {CHU_CAI}, câu lạc bộ {CLB_1} hoặc {CLB_2}, giảng đường {TOA}.

```sql
SELECT ma_sv, ho_dem, ten, ma_lop, clb
FROM sinh_vien
WHERE ten LIKE 'H%'
   OR clb = 'Báo chí'
   OR clb = 'Văn học';
```

**Quân** [gõ phím]: Kết quả: **{SO_QUAN} người**. {SO_QUAN} người thỏa các manh mối đó. Làm sao CLB Thám Tử khẳng định đúng là bạn này?

**Minh Anh** [lo lắng, thì thầm]: {SO_QUAN} người?! Sao lại nhiều thế…

**Hà Vy** [nhìn chằm chằm màn hình]: Có gì đó sai. Đọc kỹ từng dòng truy vấn của anh ta.

### Chỉ ra lỗi

**▶ Người chơi chạm vào dòng có lỗi trong truy vấn của Quân.**

**✔ Chạm dòng `OR clb = …`**

> `[HIỆU ỨNG]` **"Số liệu đây!"**
> **{TEN_NV}**: Anh dùng OR. Truy vấn này lấy tất cả những ai tên bắt đầu bằng {CHU_CAI}, **hoặc** thuộc {CLB_1}, **hoặc** thuộc {CLB_2}. Chỉ cần thỏa một điều kiện là đã vào danh sách.
> **{TEN_NV}**: Người bỏ thư phải thỏa **tất cả** manh mối cùng lúc. Phải dùng AND.
> **Quân** [khựng lại]: …
> **Hà Vy** [đẩy kính]: Và anh còn bỏ quên điều kiện giảng đường {TOA}.

**✘ Chạm dòng khác**

> **Quân** [nhếch mép]: Dòng đó hoàn toàn đúng cú pháp.
> ⚠ **−1 uy tín**
> **Hà Vy** (gợi ý): Anh ta ghép các điều kiện bằng từ gì? Nó có nghĩa là "và" hay "hoặc"?

### Sửa lại truy vấn

**Thầy Quang**: CLB Thám Tử, em chứng minh cách đúng đi.

> **Yêu cầu:** viết truy vấn thỏa **đồng thời** mọi manh mối, trả về đúng một người.
> ```sql
> SELECT ma_sv, ho_dem, ten, ma_lop, clb
> FROM sinh_vien
> WHERE ten LIKE 'H%'
>   AND ma_lop IN ('KT24A', 'QT24B', 'MK23A')
>   AND clb IN ('Báo chí', 'Văn học')
>   AND ngay_nhap_hoc < '2026-01-01';
> ```
> *(Chấp nhận mọi truy vấn trả về đúng một dòng là nhân chứng. Mồi nhử bảo đảm thiếu điều kiện nào cũng ra nhiều hơn một người.)*

**✔ Truy vấn đúng**

> `[HIỆU ỨNG]` Kết quả: **1 dòng — {NC_HOTEN}**. **"Số liệu đây!"** Màn hình rung mạnh.
> **{TEN_NV}**: Chỉ có một người thỏa tất cả manh mối cùng lúc.
> **Quân** [nhìn màn hình rất lâu, rồi gập laptop]: …Lần này là do tôi đọc vội.
> **Minh Anh** [thở phào]: …
> **Tùng** [hàng ghế dự thính, đấm tay vào không khí]: Yes!
> **Thầy Quang** [liếc]: Người dự thính.
> **Tùng**: Dạ… nhưng mà yes.

**✘ Truy vấn ra nhiều hơn một người**

> **Quân** [lấy lại bình tĩnh]: Vẫn còn nhiều người. CLB Thám Tử cũng chưa khẳng định được.
> ⚠ **−1 uy tín**
> **Hà Vy**: Mình thiếu manh mối nào đó. Kiểm lại hồ sơ: chữ ký, giảng đường, câu lạc bộ… và bạn ấy không phải tân sinh viên.

### Biến thể lỗi của rival (theo mã đề)

| Biến thể | Truy vấn của Quân | Lỗi người chơi cần chỉ ra |
|---|---|---|
| A (mặc định) | Nối các điều kiện bằng `OR` | Phải dùng `AND` |
| B | `WHERE ten LIKE 'H%' AND clb = 'Báo chí' OR clb = 'Văn học'` | Thiếu dấu ngoặc: `AND` được xét trước `OR` |
| C | Đủ các điều kiện nhưng thiếu điều kiện giảng đường | Bỏ sót một manh mối |
| D | `WHERE ten LIKE '%H'` | Mẫu sai: `'%H'` là **kết thúc** bằng H |

---

## Lời khai cuối — Sự thật

**Thầy Quang** [giọng dịu hơn]: {NC_TEN}. Không ai ở đây muốn làm khó em. Em nói thật đi.

**{NC_TEN}** [mắt đỏ]: …Em không viết lá thư đó.

**{NC_TEN}**: Em chỉ bỏ hộ. Sáng thứ Hai, có một anh năm cuối nhờ em. Anh ấy nói "bỏ hộ anh cái này vào hộp góp ý giảng đường {TOA}, anh đang vội". Em không đọc bên trong.

**{NC_TEN}**: Đến khi nghe cả trường bàn về lá thư, em sợ quá nên mới chối… Em xin lỗi.

**Minh Anh**: Bạn có nhớ gì về anh ấy không?

**{NC_TEN}** [ngẫm nghĩ]: Em không biết tên. Nhưng anh ấy đeo huy hiệu… hình bánh răng. Của CLB Robotics.

`[HIỆU ỨNG]` Tiếng nhạc khựng lại. Minh Anh và Hà Vy nhìn nhau. Quân khẽ nhíu mày.

**Quân** [trầm giọng]: Tìm được người bỏ thư chưa phải là tìm được người viết thư, CLB Thám Tử.

**Hà Vy** [đẩy kính]: Chúng tôi biết.

---

## Kết buổi giải trình

**Thầy Quang** [đứng dậy]: Buổi giải trình kết thúc. Kết luận: lá thư được bỏ hộ; người viết chưa xác định. Đề nghị thu hồi phòng tạm thời chưa có cơ sở.

**Thầy Quang**: {NC_TEN}, lần sau đừng nhận bỏ hộ những thứ em không biết là gì.

**{NC_TEN}** [cúi đầu]: Dạ.

**Thầy Quang** [nhìn về phía CLB, một thoáng rất ngắn]: CLB Thám Tử. Tìm ra sự thật mà không làm ai bẽ mặt. Được.

**Thầy Quang** [quay đi]: Nhưng học kỳ còn dài.

`[HIỆU ỨNG]` Thầy Quang ra khỏi phòng. Quân thu dọn hồ sơ.

**Quân** [dừng ở cửa, không quay lại]: {TEN_NV}, phải không? Ngành {NGANH_NV}?

**{TEN_NV}**: …Vâng?

**Quân**: Lần sau tôi sẽ không đọc vội nữa.

`[HIỆU ỨNG]` Quân rời đi.

**Tùng** [chạy tới]: Trời đất, cậu ngầu quá! Cái đoạn "Số liệu đây!" đó, tớ nổi da gà!

**Hà Vy** [khẽ mỉm cười]: Lần sau hô xong nhớ tính lại đã nhé.

**Minh Anh** [cười lần đầu trong game]: Lần đầu tiên sau ba năm, CLB mình giải được một vụ.

---

## Màn đánh giá

| Thanh uy tín còn lại | Hạng |
|---|---|
| 5 vạch | **S** — mở trang phục "Áo CLB Thám Tử" |
| 4 vạch | **A** |
| 2–3 vạch | **B** |
| 1 vạch | **C** |

Thưởng thêm: +1 hạng hiển thị dạng huy hiệu nếu hoàn thành toàn bộ buổi bằng mode Hardcore.

**Hết uy tín (0 vạch):**
> **Thầy Quang**: CLB chưa chuẩn bị đủ. Buổi giải trình hoãn đến thứ Sáu tuần sau.
> **Minh Anh** [thở dài]: Mình về xem lại hồ sơ.
> → Quay về buổi điều tra với toàn bộ vật chứng đã có. Buổi giải trình chơi lại từ đầu (dữ liệu giữ nguyên).

---

## Phần sau kết vụ (dẫn sang vụ 2)

`[HIỆU ỨNG]` Phòng KTX, tối.

**Thầy Khải** (tin nhắn): *Nghe nói hôm nay có người hô "Số liệu đây!" giữa phòng họp. Mai ghé phòng thực hành, thầy có bài kiểm tra nhỏ. Qua được thì thầy cho em bỏ mấy cái khối lệnh ra.*

→ Mở bài kiểm tra lên **mode Hardcore**.

**Tùng** [lăn trên giường, cầm mẩu giấy của chị Linh]: Ê {TEN_NV}. Mặt sau mẩu giấy này có dãy số nè.

`[HIỆU ỨNG]` Cận cảnh dãy số viết tay. Màn hình tối dần.

**Tùng** (giọng vọng lại): Mà… Robotics là CLB của anh Khánh lớp trưởng khoa Điện phải không ta?

`— Hết vụ 1 —`

→ Mở mini game: **bạn cùng quê {QUE_NV} nhờ tìm người lập nhóm đồng hương.**
