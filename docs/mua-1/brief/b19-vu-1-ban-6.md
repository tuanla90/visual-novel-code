# B19 — Vụ 1 bản 6 vào game, kèm cách chơi mới

> 08/10/2026. Đề bài chung cho cả gói. Nhánh gộp: `claude/vu1-ban6`. Người điều phối: phiên Claude chính.
> Nguồn: bản thoại 6 do user duyệt ở Story Pilot (bản sao `b19-ban-6-thoai.md`), dàn ý `b19-dan-y.md`,
> cách chơi dòng thời gian `b19-cach-choi-dong-thoi-gian.md`, bảng kiểm viết thoại `b19-bang-kiem-viet-thoai.md`.
> Nếu dàn ý (07/10) và bản thoại 6 (08/10) lệch nhau thì **bản thoại 6 thắng** (vd dòng thời gian 5 ô của bản 6 không có ô 23:30).

## 1. Ba dòng (user chốt 08/10)

**Must keep**
- Thoại đúng bản 6 từng câu (câu ✓ là user chọn; chỉ được gọt chữ, không thêm câu, không thêm dữ kiện). Câu dẫn, câu nối, chi tiết ẩn, lời nhắc khi kéo sai phải thêm thì theo bảng kiểm viết thoại và đánh dấu `(tạm)`.
- Luật chấm 08/10 (mục 4). Hoài kể + cảnh bóng mờ chỉ ở kết thật; Cảnh 12 chỉ ở rank A.
- Thứ đang chạy được: chơi trên điện thoại (PWA, cầm ngang, chế độ gõ khi bàn phím ảo mở, mức SQL hạ trên điện thoại), lưu/nạp, hai câu hỏi đầu ván (B17), **bộ MVP không đổi** (`git diff --stat -- prototype/noi-dung-mvp prototype/src/content/generated/mvp` rỗng), cả bộ test + build xanh, lint không thêm lỗi (mốc main: 8 lỗi + 1 cảnh báo).

**Must improve**
1. Dòng thời gian kéo bằng chứng vào ô: tập dượt 3 ô ở Trung thu, 5 ô tối 28/09 (ô "ai đưa phong bì" để trống, máy không bắt điền), đọc lại ở buổi họp; kéo sai thì thẻ bật về kèm một câu nhắc nhẹ, không phạt; điện thoại chạm ô → chọn thẻ.
2. Buổi họp 4 câu trắc nghiệm (sửa câu tra HOẶC → VÀ trên màn chiếu; 2 câu chọn căn cứ trong hồ sơ; 1 câu chọn người có "Chưa đủ căn cứ"); mỗi lần Trình sai Minh Anh gạch một vạch ở lề sổ; Hà Vy nhắc ở lần sai đầu tiên của buổi; chấm A/B/C, đóng dấu ở sổ CLB.
3. Điểm lưu đầu Vụ 1 + "Chơi lại Vụ 1" (rank mới thay rank cũ); dữ liệu cỡ trường thật mà khớp số trong bản 6 (bốn Hoài ở bốn ngành; sổ ra vào ra 6:44).

**Done when**
- Người điều phối chơi tay hết Vụ 1 ba lần trên trình duyệt (1280×800 và điện thoại ngang 812×375): 0 vạch → A có Cảnh 12; 1 vạch → B không Cảnh 12; 3 vạch → C, kết tạm, không có Hoài kể. Ảnh chụp từng màn mới gửi user.
- Máy so thoại trong game với bản 6 từng câu: lệch 0, trừ chỗ user duyệt.
- `kiem-noi-dung:mua1` không lỗi, `kiem-giong:mua1` 0 lỗi, `npm test` + `npm run build` xanh. Gộp `main` chỉ khi user bảo.

## 2. Quyết định user 08/10 (không tự đổi)

| Câu | User chọn | Nghĩa là |
|---|---|---|
| Vụ 2–5 cũ | **Dừng sau Vụ 1** | Bộ `mua-1` chỉ còn Vụ 1. Gỡ khỏi cây: kịch bản/lời Vụ 2–5 (`10…13`), sáu việc phụ (`20…25`), các tờ hỏi đáp, thẻ thử thách và thẻ hồ sơ không còn dùng. Git còn giữ. Hết Vụ 1: màn kết có "Vụ 2 đang làm". |
| Đi giữa các cảnh | **Giữ bản đồ** | Ngày 24–27/09 mở bằng bản đồ: ghim nơi cần tới mang `!`, nơi đã ghé vào lại được; tới nơi là cảnh khám phá (người cần gặp `!` + ít nhất một chi tiết ẩn `vung:`); hết ngày do người chơi bấm. Luật cũ vẫn áp: một đường thì máy tự đi; xong việc ở một nơi thì ở lại nơi đó; màn nào cũng lùi được. |
| Hỏi nhân chứng gõ chữ (B12) | **Không dùng ở Vụ 1** | Bác Thịnh, cô Lan, chú Cường nói đúng lời bản 6. Mã hỏi đáp giữ nguyên cho vụ sau; bạn đi cùng (chat) vẫn chạy. |
| Ảnh còn thiếu | **Vẽ luôn trong gói** | Người điều phối vẽ bằng Topview (mục 6). Agent dùng ảnh có sẵn gần nhất và ghi tên ảnh mới trong chú thích `<!-- ẢNH MỚI: <tên> -->` ngay cạnh. |

Điều người điều phối tự quyết (user sửa được): điểm lưu đầu Vụ 1 đặt ở đầu Cảnh 4 (23/09, cô Lan báo thư), chơi lại không phải đi lại phần nhập học; Khánh ở Ngày hội **không đeo balo** (ảnh riêng), vì balo đen + huy hiệu trên ảnh chân dung hiện tại sẽ lộ người đưa phong bì (user 07/10: "ko nói huy hiệu… lộ quá").

## 3. Bảng cảnh (bản 6) → khung game

| Cảnh bản 6 | Ngày, nơi | Cách chơi | Ghi chú |
|---|---|---|---|
| 0 | CN 08/09, xe buýt | lời dẫn | `bg-mvp-xe-buyt` |
| 1 | sảnh KTX → phòng 408 → cổng KTX | khám phá nhẹ ở sảnh: bấm "Cậu áo xanh" (`!`) để hỏi đường; ảnh phòng 408; chú Cường ở chốt | Người chơi chỉ ĐỨNG NHÌN Tùng nói với Hoài: không bật thẻ giới thiệu ai, hình người chơi không lên dàn; Hoài rời hình trước khi người chơi nói với Tùng |
| tuần SHCD | 09–13/09, hội trường | thẻ chữ + thẻ lịch | |
| 2 | T7 14/09, Ngày hội | lời; ba ảnh | Khánh = "Anh sơ mi trắng" (chưa lộ tên) |
| 3 | T3 17/09, sân KTX Trung thu | **quan sát** bấm từng người (tay của mỗi người), bé Na giấu tay còn vụn; **dòng thời gian tập dượt 3 ô** | Thẻ của dòng tập dượt là lời kể (thẻ tạm, không vào hồ sơ) |
| 4 | T2 23/09, phòng CLB | **[ĐIỂM LƯU VỤ]**; cô Lan; **quan sát thư và phiếu gửi** | Phiếu gửi ký "Hoài" (cả chữ). Thư không có tên người viết |
| 5 | T3 24/09, bản đồ → sảnh tòa B; 17:00 phòng CLB | khám phá tòa B (bác Thịnh `!`), **quan sát khe hộp** (gỡ thẻ lịch); **Minh Anh ghép mẫu** trên bảng điều tra | |
| 6 | T4 25/09, bản đồ → Phòng Đào tạo | cô Hạnh; **màn tra 1** (bảng sinh viên) hai bước: `tên = 'Hoài'` → 4 dòng; lọc tiếp VÀ ngành VÀ khóa → 1 dòng | Duy chỉ nói khi được hỏi (gợi ý của màn tra do Duy nói) |
| 7 | T5 26/09, bản đồ → Phòng CTSV | Quân, cô Lan, sổ thu hộp; Tùng buột miệng, Quân ghi | |
| 8 | T6 27/09, bản đồ → cổng KTX | chú Cường; **màn tra 2** (sổ ra vào): mã VÀ ngày → 6:44 | |
| 9 | T7 28/09 tối, phòng CLB | **dòng thời gian 5 ô** rồi thoại | |
| 10 | T2 30/09 16:00, phòng họp | màn chiếu câu HOẶC của Quân; **4 câu trắc nghiệm tính vạch**; người chơi đọc lại dòng thời gian; **chấm** | |
| Kết thật / Kết tạm | phòng họp; hành lang | kết thật: Hoài kể + **cảnh bóng mờ tự chạy**; kết tạm: thầy giữ thư | |
| 11 | hành lang; phòng CLB | **lựa chọn** xin lỗi Hoài (hai câu, cùng đi tiếp; ghi cờ cho Vụ 4); **sổ tổng kết đóng dấu A/B/C**; ảnh bảng có thẻ trắng | Câu Tùng đổi theo kết (bản 6 có cả hai) |
| 12 | quán trà đá | chỉ khi **rank A** | lời kể "cậu trà nóng" vào sổ của Hà Vy, không phải bằng chứng |

Đã bỏ khỏi Vụ 1 (bản 6): nhật ký in, Hiếu, dò chữ H, thẻ số nhòe, báo cáo nội bộ, gợi ý Robotics/quỹ/thầy Quang, chị Linh, cá cược, hỏi đáp gõ chữ, lọc thử Ngày hội, màn tra 0.

## 4. Luật chấm (canon Story Pilot `mua-1.yaml` → `ket-mua`, user chốt 08/10)

- **Trình sai** = mỗi lần chọn sai / bấm Trình sai ở trắc nghiệm, đối chất trước mặt người khác. **Không tính:** chạy thử câu tra, nộp sai ở màn tra lúc điều tra, quan sát, ghép thẻ, kéo sai ở dòng thời gian.
- **Đủ căn cứ** = tới buổi chốt, hồ sơ có đủ mọi bằng chứng bắt buộc VÀ trả lời đúng mọi câu then chốt ("Chưa đủ căn cứ" là đúng khi sự thật là chưa đủ). Vì Vụ 1 đi theo mạch, người chơi luôn nhặt đủ; kết tạm thực tế đến từ ≥ 3 vạch.
- **A:** đủ căn cứ, 0 vạch → kết thật + Cảnh 12. **B:** đủ căn cứ, 1–2 vạch → kết thật. **C:** thiếu căn cứ hoặc ≥ 3 vạch → kết tạm.
- Mỗi lần trình sai Minh Anh gạch một vạch nhỏ ở lề sổ (cho thấy, không đọc số). Màn kết: trang tổng kết Vụ 1 trong sổ CLB, con dấu đỏ A/B/C, các vạch ở lề.
- Điểm lưu đầu vụ; chơi lại thì rank mới thay rank cũ (ghi khi chơi lại xong buổi chấm, không phải lúc bấm chơi lại).
- Chỉ áp cho bộ `mua-1`. Bộ MVP giữ rank S/A/B/C cũ ở `engine/tong-ket.ts`.

## 5. Cú pháp mới (agent MÁY dựng; agent NỘI DUNG viết theo đúng mẫu)

Trong lúc agent MÁY chưa xong, agent NỘI DUNG viết các dòng mới này **trong chú thích** `<!-- MỚI: … -->` đúng chỗ, để bộ đọc hiện tại vẫn sinh được; người điều phối gỡ chú thích khi gộp. Tên thẻ, mã chuỗi là ví dụ.

### 5.1 Dòng thời gian

Trong kịch bản: `- [DÒNG THỜI GIAN dtg-vu1]` (màn kéo thả, xong mới đi tiếp) và `- [HIỆN DÒNG THỜI GIAN dtg-vu1]` (hiện bản đã dựng, chỉ xem, dùng ở buổi họp khi người chơi đọc từng ô).

Định nghĩa: tệp `prototype/noi-dung-mua-1/dong-thoi-gian.md` (agent NỘI DUNG viết nháp ở `docs/mua-1/brief/b19-dong-thoi-gian-vu1.md`, người điều phối chuyển vào khi gộp):

```md
## dtg-banh — Đĩa bánh Trung thu {kiểu: tập dượt}

- Người nhắc khi kéo sai: ha-vy
- Thẻ tạm: lk-dem-bon = Minh Anh: "Lúc bảy giờ chị đếm còn bốn." · lk-tay-na = Tay bé Na còn vụn bánh · lk-chia-ba = Minh Anh: "Ba cái."

### o1 · 19:00 · đĩa đủ bốn chiếc
- Nhận: lk-dem-bon
### o2 · ? · bé Na cầm một chiếc
- Nhận: lk-tay-na
### o3 · 19:15 · chia còn ba
- Nhận: lk-chia-ba
- Kéo sai: **ha-vy** (thinking): Lúc chia thì đã thiếu rồi. Chỗ này cần cái gì xảy ra lúc chia cơ. (tạm)

## dtg-vu1 — Sáng thứ Hai 16/09 {kiểu: chính}

- Người nhắc khi kéo sai: ha-vy

### o1 · 6:44 · cổng ký túc xá · Hoài ra cổng
- Nhận: ev-ra-cong-644
### o2 · ? · cổng ký túc xá · [?] đưa phong bì nâu cho Hoài
- Nhận: clue-loi-chu-cuong
- Không điền được: ai
### o3 · 7:00 · sảnh tòa B · bác Thịnh mở sảnh
- Khóa sẵn
…
```

- Mỗi ô: tiêu đề `### <mã> · <giờ> · <nơi> · <việc>` (thiếu phần nào thì bỏ phần ấy). `Nhận:` một hay nhiều thẻ hồ sơ (`ev-…`, `clue-…`) hoặc thẻ tạm; thả một thẻ đúng là ô xong. `Khóa sẵn` = ô đã điền sẵn, không cần kéo (dùng cho ô chỉ có một thẻ hiển nhiên — user đã chê "làm cho có"). `Không điền được: ai` = phần ấy hiện "?" mãi, thả gì vào phần ấy cũng bật lại kèm câu `Kéo vào chỗ trống:` (nếu có). `Kéo sai:` riêng từng ô, thiếu thì dùng câu chung của người nhắc.
- Không có thẻ nhiễu: mọi thẻ trong hồ sơ đều thật; cái khó chỉ là đặt đúng chỗ.
- Xong khi mọi ô (trừ phần "không điền được") đã điền. Kéo sai không tính vạch.
- Máy kiểm: mọi `Nhận:` trỏ tới thẻ có thật và được mở trước chỗ `[DÒNG THỜI GIAN]`; ô nào (trừ khóa sẵn) cũng có ≥ 1 thẻ nhận; mỗi bộ có ≥ 1 ô cần kéo.
- Màn hình: máy tính trục ngang, thẻ hồ sơ ở cột phải, kéo thả; điện thoại chạm ô → danh sách thẻ → chạm chọn. Bản đã dựng xem lại được ở hồ sơ / bảng điều tra.

### 5.2 Tính vạch ở buổi họp

Thêm đuôi `· tính vạch` (và tùy chọn `· câu 1/4`) vào ba lệnh đã có:

- `[SỬA TRUY VẤN c-sua-or-quan · tính vạch · câu 1/4]` — màn sửa có hai nút **Chạy thử** (bao nhiêu lần cũng được, không tính) và **Trình** (sai thì +1 vạch và hiện lời `Khi trình sai:` của thẻ thử thách, trình lại được).
- `[ĐỐI CHẤT dc-phieu-gui · tính vạch · câu 2/4] quan: "…"` — chọn thẻ trong hồ sơ; `{thẻ} [ĐÚNG]` (một hay nhiều thẻ đúng) → đi tiếp; `{thẻ} [SAI] → phản hồi: …` và `[KHÁC] → phản hồi: …` → +1 vạch, chọn lại. Không có hết lượt.
- `[HỎI q-ai-dung-sau · tính vạch · câu 4/4] thay-quang: "…"` — như `[HỎI]` cũ, sai thì +1 vạch và chọn lại.
- Dòng con `- [SAI LẦN ĐẦU CẢ BUỔI] → phản hồi: **ha-vy** (thinking): …` trong một lệnh tính vạch: chỉ hiện khi lần sai ấy là vạch đầu tiên của buổi.
- Trên màn có lề sổ Minh Anh với các vạch (mỗi vạch gạch hiện ra kèm hiệu ứng nhỏ); không hiện con số.

### 5.3 Chấm vụ, kết tạm, cảnh rank A

- `- [CHẤM VỤ vu1] cần: ev-…, clue-…, dtg-vu1` — đọc số vạch + kiểm đủ thẻ / đã dựng xong dòng thời gian, đặt cờ `vu1-rank-a|b|c` và ghi bảng rank của ván (rank mới thay rank cũ).
- `[RẼ KẾT]` của bộ có `[CHẤM VỤ]`: rank A/B → `ket-that`, C → `ket-tam`. Cờ kết cũ (`vu1-ket-that`, `vu1-hoan-tat`) giữ; thêm `vu1-ket-tam`.
- `- [NẾU có vu1-rank-a] → đi tới canh-12` cho Cảnh 12; câu đổi theo kết dùng `[NẾU]` hoặc tách chuỗi như đã làm.
- `- [SỔ TỔNG KẾT vu1]` — hiện trang tổng kết Vụ 1 trong sổ CLB, con dấu đỏ đúng rank đóng xuống, vạch ở lề (hoặc không vạch). Dùng ở Cảnh 11 và ở màn kết.
- Màn kết của bộ `mua-1`: tiêu đề "Kết thật" / "Kết tạm", trang sổ có dấu, nút **Chơi lại Vụ 1** và dòng "Vụ 2 đang làm", nút về màn tiêu đề. Không hiện tỉ lệ % / S của MVP.

### 5.4 Điểm lưu đầu vụ

- `- [ĐIỂM LƯU VỤ vu1]` ở đầu chuỗi mở vụ: máy chụp trạng thái (bền qua tải lại trang như tiến độ hiện nay). "Chơi lại Vụ 1" ở màn kết và trong menu ≡ đưa ván về điểm ấy; bảng rank không bị chụp đè (rank cũ còn tới khi chơi lại xong buổi chấm).

### 5.5 Minh Anh ghép mẫu trên bảng

- `- [GHÉP MẪU] minh-anh: ev-phieu-gui-hoai + ev-the-lich-bc24 · giấy nhớ: "Hoài nào học Báo chí, khóa 2024?"` — mở bảng điều tra, ghim hai thẻ, kéo chỉ đỏ, dán giấy nhớ (người chơi xem, bấm tiếp); giấy nhớ còn trên bảng.

### 5.6 Cảnh bóng mờ tự chạy, lựa chọn Cảnh 11

- Dùng cơ chế cảnh hoạt cảnh có sẵn (README mục "Cảnh sau kết và nền là ảnh hoạt cảnh", `src/mvp/ui/hoat-canh-mvp.ts`): khai cảnh `cong-ktx-bong-mo` trong `canh.md`; người điều phối làm ảnh lớp + cấu hình chuyển động.
- Cảnh 11: `[RẼ NHÁNH r-xin-loi-hoai]` hai lựa chọn của bản 6, cùng đi tiếp, ghi cờ (`hậu quả: đặt cờ … ; đi tới …` hoặc tương đương đã có).

## 6. Ảnh (người điều phối vẽ; agent chỉ ghi tên)

| Tên tệp | Ở đâu | Có sẵn để dùng tạm |
|---|---|---|
| `cg-tung-om-to-roi` | Ngày hội: Tùng ôm xấp tờ rơi, quạt giấy CLB Guitar, nửa cái bánh rán | `chibi-ngay-hoi` |
| `cg-ban-clb-vang` | bàn CLB Thám Tử vắng, Minh Anh ngồi một mình, anh sơ mi trắng đeo thẻ ban tổ chức dừng trước bàn (không balo) | `obj-ban-tham-tu` |
| `cg-phieu-trang` | Minh Anh lật xấp phiếu đăng ký trắng | `chibi-minh-anh-khong-ai` |
| `char-khanh-ban-to-chuc` | chân dung Khánh không balo, đeo thẻ ban tổ chức | `char-khanh` |
| `cg-nam-ghe` | bàn nhựa Trung thu, năm ghế, một ghế trống | `bg-mvp-san-ktx-trung-thu` |
| `cg-duy-dan-chia-khoa` | Duy dán băng dính có chữ lên chìa khóa | `chibi-duy` |
| `cg-ha-vy-ghi-so` | Hà Vy ghi sổ nhỏ, đầu dòng là giờ | `chibi-ha-vy` |
| `bg-mvp-san-ktx-trung-thu-nguoi` | sân Trung thu có Minh Anh, Duy, Hà Vy, Tùng quanh bàn và bé Na giấu tay sau lưng (nền cho quan sát bấm từng người) | `bg-mvp-san-ktx-trung-thu` |
| `doc-phieu-gui-hoai` | phiếu gửi, dòng người nộp ký "Hoài" | `doc-chu-ky-h` |
| `doc-thu-kien-nghi` | thư kiến nghị không tên người viết | `doc-la-thu-nac-danh` |
| `doc-so-thu-hop` | sổ thu hộp, sáng 16/09 ba phong bì | `doc-so-niem-phong-trang` |
| `cg-ca-doi-quanh-bang` | phòng CLB tối: bánh mì que, ấm trà, quạt cây, cả đội quanh bảng | `bg-mvp-phong-clb-dem` |
| `bg-mvp-cong-ktx-bong-mo` (+ lớp) | cổng KTX gần 7:00, bóng balo đen, bóng nhỏ cầm phong bì đi về phía tòa B | `bg-mvp-cong-ktx` |
| `cg-so-tong-ket` (+ dấu A/B/C) | trang tổng kết Vụ 1 trong sổ CLB | — |
| `cg-bang-the-trang` | bảng điều tra, thẻ trắng chưa viết cạnh "phong bì nâu", chỉ đỏ lơ lửng | `cg-reo-ho-manh-moi` |
| `cg-phong-408` | phòng 408: giường trên có balo + áo xanh vắt ngang, giường dưới trống (nếu `bg-mvp-phong-ktx` chưa đúng) | `bg-mvp-phong-ktx` |

## 7. Phân việc

| Gói | Ai | Làm gì | Không đụng |
|---|---|---|---|
| **B19-MÁY** | agent Claude Opus, worktree riêng | mục 4–5: bộ đọc (`tools/noi-dung/doc-mvp.ts` + kiểu), máy kiểm, máy chơi (`src/mvp/engine`), giao diện (`src/mvp/ui`), công cụ truyện chữ in được lệnh mới, test với **bộ thử nhỏ** riêng | nội dung `noi-dung-mua-1/`, `noi-dung-mvp/` |
| **B19-NỘI DUNG** | agent Claude Opus, worktree riêng | mục 2–3: viết lại Vụ 1 trong `noi-dung-mua-1/` theo bản 6 (kịch bản, lời, thẻ thử thách, thẻ hồ sơ, dữ liệu, lịch, nhân vật, cảnh, highlight, bạn đi cùng), gỡ Vụ 2–5 + việc phụ + hỏi đáp; lệnh mới để trong chú thích | `src/`, `tools/` |
| **B19-ẢNH** | người điều phối | mục 6, Topview chế độ miễn phí | |
| **Gộp + nghiệm thu** | người điều phối | gỡ chú thích, chuyển tệp nháp, chạy đủ lệnh, chơi tay ba đường, so thoại | |

Luật chung cho agent: làm trong worktree của mình; bước đầu `git merge --ff-only claude/vu1-ban6`; nối `prototype/node_modules` về repo gốc bằng junction; KHÔNG dùng trình duyệt (người điều phối đang dùng); chạy vitest từng tệp hoặc `npx vitest run --maxWorkers=2 <thư mục>` (máy 16 GB); commit trên nhánh của mình, không push, không gộp `main`; báo cáo cuối có danh sách tệp, lệnh đã chạy + dòng cuối của từng lệnh, chỗ còn lệch với bản 6, câu `(tạm)` đã thêm.
