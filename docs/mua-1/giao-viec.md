# Mùa 1 mười vụ: mô tả việc và tiêu chí nghiệm thu (04/10/2026)

> **Đây là bản đầy đủ, tách riêng khỏi MVP** (user chốt 04/10): MVP (`prototype/noi-dung-mvp/`, `docs/mvp/`) giữ nguyên như bản đã xong; mùa 1 mười vụ có thư mục nội dung riêng `prototype/noi-dung-mua-1/` và thư mục tài liệu riêng `docs/mua-1/`.

> Giao cho model làm bản đầu (Gemini qua `agy`), Claude duyệt lại. Nguồn sự thật: `docs/mua-1/ke-hoach-10-vu.md` (bản 5).
> Chỗ nào tệp này và kế hoạch lệch nhau thì **theo kế hoạch** và ghi lại chỗ lệch trong báo cáo.
> Tệp chia làm: A. luật chung cho mọi gói, B. mười gói việc, C. nghiệm thu chung, D. mẫu báo cáo, E. làm truyện chữ trước.
>
> **Thứ tự làm (user chốt 04/10): chốt kịch bản bằng truyện chữ trước, làm ảnh và màn chơi sau.** Xem mục E. Tóm tắt:
> 1. Gói **T0** (mục E): bộ đọc + bộ kiểm nhận cú pháp mới, và công cụ xuất truyện chữ. Chưa làm màn chơi.
> 2. Gói nội dung **B4 → B10**: viết thẳng bằng định dạng nội dung của game; user đọc và duyệt bằng truyện chữ.
> 3. Kịch bản chốt rồi mới: phần màn chơi của **B1, B2, B3**, vẽ ảnh, ghép lời vào game.

---

## A. Luật chung cho mọi gói

### A1. Làm ở đâu

- Làm trên **nhánh riêng tách từ `main` mới nhất**, trong một worktree: `git worktree add .claude/worktrees/mua1-10vu-<gói> -b claude/mua1-10vu-<gói> main`.
- **Nội dung mùa 1 nằm ở thư mục riêng `prototype/noi-dung-mua-1/`**, chép từ `prototype/noi-dung-mvp/` lúc bắt đầu (gói T0) rồi sửa trên bản chép. **Không sửa `prototype/noi-dung-mvp/`**: MVP giữ nguyên, vẫn chơi được. Mã máy dùng chung (`prototype/src/mvp/`, `prototype/tools/`) được sửa, nhưng phải giữ MVP chạy như cũ.
- **Tài liệu, báo cáo, truyện chữ của mùa 1 nằm ở `docs/mua-1/`**, không ghi vào `docs/mvp/`.
- Riêng **lời của cảnh đã có** (`loi/*.md` đang tồn tại) mà cần viết lại nhiều: ghi bản mới vào `docs/mua-1/v3-thoai/<tệp>.md`, không đè tệp gốc, để Claude so bằng `npm run kiem-giong:mua1 -- --so docs/mua-1/v3-thoai`. Lời của cảnh **mới** thì viết thẳng vào `noi-dung-mua-1/loi/`.
- **Không commit, không push, không merge.** Chỉ để thay đổi trong worktree và viết báo cáo (mục D).

### A2. Đọc trước khi làm (bắt buộc)

1. `docs/mua-1/ke-hoach-10-vu.md`: kế hoạch, toàn bộ quyết định.
2. `docs/mvp/v2-thoai/brief-chung.md`: nhân vật, giọng, xưng hô, luật viết.
3. `prototype/noi-dung-mvp/README.md` và `docs/dac-ta-dinh-dang-noi-dung.md` mục 18: cú pháp nội dung (bộ mùa 1 dùng cùng cú pháp, cộng phần mới ở A5).
4. `prototype/noi-dung-mvp/giong/README.md` và `giong/luat-giong.md`: luật giọng máy kiểm.
5. `docs/mvp/mua-1-dan-y-nam-khanh.md`: cốt truyện tuyến Khánh và bí mật CLB.
6. Bộ nội dung MVP (điểm xuất phát của bản chép): `lich.md`, `nhan-vat.md`, `du-lieu.md`, `kich-ban/`, `loi/`, `thu-thach/`, `ho-so/`.

### A3. Quyết định đã chốt, không được đổi

1. Mười vụ, đúng thứ tự, tên tuyến, ngày bắt đầu, hạn chót, ngày lễ, kỹ năng như bảng mục 1 của kế hoạch.
2. **Kỹ năng chỉ xuất hiện từ vụ dạy nó trở đi** (bảng A4). Vụ chính không đòi kỹ năng chỉ có ở việc phụ.
3. Vụ 1 chỉ dạy chọn cột, lọc bằng, VÀ, HOẶC. **Không `LIKE`, không `IN`, không làm sạch** ở Vụ 1.
4. Hoài xuất hiện từ mở đầu: Tùng dẫn nhầm Hoài ra nhà xe hôm nhập học; Trung thu Hoài hỏi Tùng đường ra phòng máy in; ở Vụ 1 Tùng dựa vào đó nghi Hoài rồi thấy có lỗi.
5. Vụ chính có hạn chót; **hành động không làm trôi thời gian**; ngày chỉ qua khi người chơi bấm "Hết ngày" sau khi xong việc chính của ngày.
6. Việc ngày lễ: **đúng ngày lễ, chỉ chơi trong ngày ấy, lỡ là mất, không chơi lại** kể cả sau khi xong mùa.
7. Chín người quen, mỗi người 3 việc; đủ 3 bậc hảo cảm thì có ảnh CG. Ở nhịp người ấy giúp: **chưa đủ hảo cảm thì người chơi tự chọn bằng chứng; đủ thì người quen tự nói thay**. Bằng chứng tự chọn luôn kiếm được trong vụ chính.
8. Ảnh CG vào **album kiểu ảnh chụp hồi sinh viên**; cảnh chibi thành **sticker** để dán, nhớ chuyện vui.
9. Không kết xấu. Thiếu căn cứ ở hạn chót là "kết chưa trọn".
10. Valentine 14/02: Tùng tỏ tình Hoài. Halloween 31/10: giao lưu các CLB ở sân KTX. Bỏ Giáng sinh.
11. Luật viết của user (brief chung + giong/README): show don't tell; gợi ý không liệt kê; câu ngắn giọng sinh viên; giới thiệu nhân vật đúng trình tự (tên tạm trước); không gạch dài "—" trong chữ hiển thị; không "nói thẳng" (nhân vật tự khai sở trường, vai trò); Vy, Minh Anh, Tùng không nói thuật ngữ SQL; xưng hô theo `luat-giong.md`; năm nhất gọi "anh Nam", "anh Duy"; sinh viên xưng "em" với thầy cô; không giọng miền Nam.
12. Dấu điểm bấm: "!" là đầu mối chính, "?" là việc phụ, chi tiết ẩn không dấu. Tô màu chữ chỉ cho thứ vào hồ sơ (`highlight.json`).
13. Lời chỉ nhắc vật, người có trên ảnh nền của cảnh.
14. **Người chơi tự chọn đi đâu; hết cảnh vẫn đứng nguyên chỗ.** Đổi nơi chỉ khi người chơi tự mở bản đồ bấm, hoặc tự bấm lựa chọn đi cùng ai đó. Hết thoại, hết cảnh cắt thì về cảnh khám phá của nơi đang đứng; không tự chuyển nơi, không tự về bản đồ, không tự hết ngày. Nhân vật rủ đi đâu thì đặt "!" ở nơi ấy trên bản đồ. Đầu ngày mới bắt đầu ở một nơi cố định (thường là phòng 408). (Kế hoạch mục 2, luật 7.)
15. **Màn tra: chạy thoải mái, nộp mới chấm, nộp có bước xác nhận, xem được từng bước lọc.** Ra đúng rồi vẫn sửa câu, chạy lại được; không khóa, không tự đi tiếp. Chỉ khi bấm "Nộp" mới chấm, và trước khi nộp có bước xác nhận (chọn cột trả lời câu hỏi, đọc lại câu bằng lời). Câu có từ hai điều kiện trở lên xem được hoạt cảnh lọc từng bước, đổi được thứ tự điều kiện để thấy số dòng rơi khác nhau. (B3.)

### A4. Bảng kỹ năng theo vụ (máy kiểm theo bảng này)

| Kỹ năng (mẫu trong SQL chuẩn) | Được dùng từ |
|---|---|
| `SELECT` cột, `WHERE =`, `AND`, `OR` | Vụ 1 |
| `LIKE`, `IN`, `LOWER`, `TRIM` | Vụ 2 |
| `>`, `<`, `>=`, `<=`, `BETWEEN` (số), `ORDER BY`, `LIMIT`, `FROM @phiếu` (lọc tiếp) | Vụ 3 |
| so sánh / `BETWEEN` trên cột thời điểm, `strftime(…)` | Vụ 4 |
| `+ - * /` trong `SELECT` hay `WHERE`, `ROUND` | Vụ 5 |
| `JOIN … ON` | Vụ 6 |
| `GROUP BY`, `COUNT(*)`, `COUNT(DISTINCT …)`, `IS NULL`, `IS NOT NULL`, `COALESCE` | Vụ 7 |
| `SUM`, `AVG`, `MAX`, `MIN`, `HAVING`, `LEFT JOIN` | Vụ 8 |
| `CASE WHEN` | Vụ 9 |

Việc phụ được dùng kỹ năng của mọi vụ đã xong trước khi nó mở. Việc ngày lễ dùng kỹ năng học trước ngày ấy.

### A5. Cú pháp mới (đề xuất; được chỉnh nếu cần, nhưng phải ghi vào README và đặc tả mục 18)

**Vụ có hạn chót và ngày** (trong `lich.md`):

```
## Tin đồn {vụ sau: vu-tin-don}
- Chuỗi: tin-mo
- Ngày: 2024-10-08
- Hạn chót: 2024-10-15
- Việc chốt: Giải trình với Hội sinh viên
- Ngày 2024-10-08: tin-n1-mo
- Ngày 2024-10-09: tin-n2-mo
- …
```

Trong `kich-ban/`: `- [XONG VIỆC CHÍNH]` đặt ở cuối việc chính của ngày (hiện nút "Hết ngày"); chuỗi chỉ tới được từ một ngày thì chỉ chơi được trong ngày ấy.

**Việc ngày lễ**:

```
## Ngày truyền thống Hội Liên hiệp Thanh niên {việc ngày lễ: le-hoi-sv}
- Ngày: 2024-10-15
- Thuộc vụ: vu-tin-don
- Chuỗi: le-hsv-mo
- Người giao: quan
- Khi lỡ: le-hsv-lo
- Tiêu đề kết: …
- Lời kết: …
```

**Người quen**:

```
## Bác Thịnh {người quen: bac-tu}
- Mở sau: vu1
- Việc 1: nq-thinh-1 · mở sau vu1
- Việc 2: nq-thinh-2 · mở sau vu-tin-don
- Việc 3: nq-thinh-3 · mở sau vu-goi-hang
- Ảnh CG: cg-nq-bac-thinh · chú thích: Chốt bảo vệ tòa B, ấm trà buổi tối
- Giúp ở: dc-…
```

Hảo cảm = số việc đã xong (0–3); máy đặt cờ `nq-<mã>-du` khi đủ 3.

**Đối chất có người quen** (thêm một dòng con trong khối `[ĐỐI CHẤT]`):

```
  - [NGƯỜI QUEN bac-tu] → nói thay: <chuỗi>
```

Có cờ `nq-bac-tu-du` thì màn đối chất không hỏi người chơi, chạy chuỗi nói thay rồi tính ĐỦ CĂN CỨ. Không có cờ thì đối chất như cũ (người chơi tự chọn thẻ). Khối phải vẫn có ít nhất một thẻ `[ĐỦ CĂN CỨ]` kiếm được trong vụ chính.

**Thẻ thử thách (màn tra mới, B3):** thêm dòng `- Cột nộp: <cột>[, <cột>]` (cột người chơi phải chọn ở bước xác nhận khi nộp); tệp lời thẻ thêm được `- Khi chọn sai cột nộp: …` và `- Khi xem từng bước: …`. Cảnh cắt: `{cảnh: <cảnh> · cảnh cắt}`; dòng ngày thêm `· bắt đầu ở: <cảnh>` (A3 mục 14).

**Album và sticker:** mọi `[ẢNH cg-…]` người chơi đã xem vào album; mọi `[ẢNH chibi-…]` đã xem thành sticker. Thêm tùy chọn `- [ẢNH cg-x · chú thích: …]` cho dòng chú thích viết tay.

**Mã vụ:** giữ `vu1` (máy gắn cờ `vu1-ket-that`, `vu1-ket-thuong`). Các vụ khác đặt mã theo nội dung, không theo số, để sau này đổi thứ tự không phải đổi mã: `vu-tin-don`, `vu-goi-hang`, `vu-nam-22h40`, `vu-tien-dien`, `vu-giup-nam`, `vu-quy-qua`, `vu-so-quy`, `vu-xep-loai`, `vu-dau-tien`. Bảng đổi mã cũ → mới ghi trong báo cáo; không còn cờ mã cũ (`vu2-…`, `vu3-…`, `vu4-…`, `vu5-…`) nào trong nội dung và mã.

### A6. Lệnh kiểm (chạy trong `prototype/`)

```
npm run noi-dung:sinh:mua1
npm run kiem-noi-dung:mua1
npm run kiem-giong:mua1 -- --chi-loi
npm run kiem-to-mau
npm run kiem-noi-dung:mvp
npm run typecheck
npm run lint
npm test
```

Lệnh `:mua1` do gói T0 thêm (cùng công cụ, trỏ vào `noi-dung-mua-1/`, sinh ra `src/content/generated/mua-1/`). `kiem-noi-dung:mvp` phải vẫn xanh: bằng chứng MVP không bị đụng.

Bản chơi thử dạng chữ cho từng vụ, việc phụ:

```
node --import ./tools/noi-dung/nap-ts.mjs tools/truyen-chu.ts <mã vụ | mã việc>   # ra docs/mua-1/truyen-chu/<mã>.md (gói T0 làm)
```

RAM máy 16 GB: chạy `npm test` một mình, không chạy song song với gói khác.

---

## B. Mười gói việc

Thứ tự (theo mục E): T0 trước, rồi B4 → B10 (nội dung, duyệt bằng truyện chữ), kịch bản chốt rồi mới làm phần màn chơi của B1 → B2 → B3. Mỗi gói một lần chạy, một báo cáo.

### B1. Máy lịch: hạn chót, "Hết ngày", việc ngày lễ

**Làm:**
- Bộ đọc, bộ kiểm, bộ sinh nhận cú pháp vụ có `Hạn chót`, `Việc chốt`, danh sách `Ngày …`, dòng `[XONG VIỆC CHÍNH]`, khối `{việc ngày lễ: …}` (A5).
- Màn chơi: nút "Hết ngày" chỉ hiện sau `[XONG VIỆC CHÍNH]`; trước khi qua ngày, nếu còn "?" hay nơi tùy chọn chưa ghé thì Hà Vy nhắc một câu, người chơi vẫn qua được.
- Màn lịch hiện ngày thật và "Còn N ngày tới <Việc chốt>".
- Hành động (tra, hỏi, khám phá, đi bản đồ) không tiêu thời gian; bỏ việc tiêu khung giờ ở bản đồ (giờ chỉ để trang trí).
- Qua ngày thì các chuỗi chỉ thuộc ngày cũ không vào được nữa.
- Việc ngày lễ: hiện đúng ngày ấy với dấu "?" ở người giao; hết ngày thì đóng hẳn, chạy chuỗi `Khi lỡ` ở ngày kế; không có đường nào mở lại (kể cả sau màn kết mùa, kể cả nạp lại lưu cũ).
- Vụ 10 kéo qua Tết: hỗ trợ "nhảy lịch" trong vụ (một chuỗi chuyển cảnh rồi sang ngày sau Tết).
- **Đứng nguyên chỗ (A3 mục 14):** chuỗi hết nút thì về cảnh khám phá của nơi đang đứng, không về bản đồ, không hết ngày. `[ĐI TỚI]` chỉ được dẫn tới chuỗi cùng nơi. Cảnh cắt khác nơi (hồi tưởng, CG ở chỗ khác) khai thêm `· cảnh cắt` trong tiêu đề chuỗi: `{cảnh: <cảnh> · cảnh cắt}`; chạy xong thì về lại nơi cũ. Đổi nơi chỉ qua bản đồ hoặc lựa chọn `[RẼ NHÁNH]` mà người chơi bấm (lựa chọn ấy đưa người chơi tới nơi mới và đứng ở đó). Mỗi ngày khai nơi bắt đầu: `- Ngày YYYY-MM-DD: <chuỗi> · bắt đầu ở: <cảnh>`.

**Nghiệm thu B1:**
- [ ] Bộ kiểm báo lỗi: vụ thiếu `Hạn chót`; `Hạn chót` trước `Ngày`; một ngày không có `[XONG VIỆC CHÍNH]`; một ngày có hơn 2 việc chính; việc ngày lễ có `Ngày` nằm ngoài khoảng ngày của `Thuộc vụ`; hai việc ngày lễ cùng ngày; manh mối bắt buộc (dùng ở `[ĐIỀU KIỆN]` của kết đủ hoặc ở thẻ ĐỦ CĂN CỨ) chỉ kiếm được ở chuỗi tùy chọn.
- [ ] Mỗi lỗi trên có một ví dụ trong test của bộ kiểm.
- [ ] Test máy: làm việc phụ, tra, đi bản đồ 50 lần liền thì ngày không đổi; bấm "Hết ngày" trước `[XONG VIỆC CHÍNH]` thì không được; sau thì được.
- [ ] Test: việc ngày lễ có mặt đúng ngày, mất sau "Hết ngày", không mở lại sau khi nạp lưu; chuỗi `Khi lỡ` chạy đúng một lần.
- [ ] Test: tới ngày hạn chót thì chỉ còn chuỗi chốt; kết đủ hay chưa trọn theo `[ĐIỀU KIỆN]`.
- [ ] Bộ kiểm (bộ mùa 1) báo lỗi: `[ĐI TỚI]` sang chuỗi khác nơi mà chuỗi đích không khai `· cảnh cắt`; chuỗi `· cảnh cắt` chứa `[ĐI TỚI]` sang nơi thứ ba; ngày thiếu `bắt đầu ở`.
- [ ] Test máy: hết một chuỗi thoại thì người chơi vẫn ở cảnh khám phá của nơi ấy (không về bản đồ, ngày không đổi); hết cảnh cắt thì về đúng nơi trước cảnh cắt; chỉ bấm bản đồ hoặc lựa chọn đi cùng mới đổi nơi.
- [ ] Lưu game cũ (5 vụ) nạp lên không sập: hoặc chuyển đổi được, hoặc báo rõ "bản lưu của phiên bản cũ" và bắt đầu lại.
- [ ] README nội dung và đặc tả mục 18 có cú pháp mới, kèm ví dụ.

### B2. Máy người quen, hảo cảm, album, sticker

**Làm:**
- Đọc khối `{người quen: …}`; việc 1, 2, 3 mở theo `mở sau`; hảo cảm = số việc xong; cờ `nq-<mã>-du` khi đủ 3.
- Thẻ nhân vật hiện hảo cảm (3 bậc) và các việc đang mở.
- Đối chất: dòng `[NGƯỜI QUEN <mã>] → nói thay: <chuỗi>` (A5).
- Album: màn xem kiểu album ảnh cũ, mỗi ảnh một trang, ngày chụp lấy theo ngày trong truyện lúc xem ảnh, dòng chú thích viết tay; ảnh chưa có là khung trống có ngày (ảnh việc ngày lễ đã lỡ là khung trống mãi). Trang sticker: các `chibi-…` đã xem, xếp như dán lên bìa sổ.
- Mở album, sticker từ menu ≡.

**Nghiệm thu B2:**
- [ ] Bộ kiểm báo lỗi: người quen có ít hơn hoặc hơn 3 việc; `mở sau` của việc 3 muộn hơn vụ của nhịp người ấy giúp; `Giúp ở` trỏ tới đối chất không có dòng `[NGƯỜI QUEN …]` tương ứng; đối chất có `[NGƯỜI QUEN]` mà không có thẻ ĐỦ CĂN CỨ kiếm được trong vụ chính; việc người quen dùng kỹ năng chưa học tại `mở sau` của nó.
- [ ] Test: hảo cảm 2 thì đối chất hỏi người chơi; hảo cảm 3 thì chạy chuỗi nói thay, đặt cờ `<mã đối chất>-du`, không hiện màn chọn thẻ.
- [ ] Test: đủ 3 việc thì ảnh CG vào album đúng một lần.
- [ ] Album hiện đúng số khung bằng tổng `[ẢNH cg-…]` có trong mùa; sticker bằng tổng `[ẢNH chibi-…]`.
- [ ] Chơi được trên điện thoại cầm dọc (luật màn hẹp hiện có).

### B3. Khối màn tra mới và máy kiểm kỹ năng

**Làm:** khối mới ở màn tra và màn tổng hợp, hiện tự động theo SQL chuẩn của thẻ (như `LOWER/TRIM`, `ORDER BY` hiện nay):

| Khối | Câu sinh ra | Vụ |
|---|---|---|
| Kết quả xếp theo vần + bấm chọn dòng (không SQL) | | 1 |
| So chữ "bằng / bắt đầu bằng / chứa" | `=`, `LIKE 'x%'`, `LIKE '%x%'` | 2 |
| Một trong mấy giá trị (kéo nhiều giấy nhớ) | `IN (…)` | 2 |
| So "lớn hơn / nhỏ hơn / từ … đến …"; "lấy n dòng đầu" | `>`, `<`, `>=`, `<=`, `BETWEEN`, `LIMIT` | 3 |
| "LẤY [giờ / thứ / tuần / ngày / tháng] TỪ [cột]" | `strftime('%H' / '%w' / '%W' / '%Y-%m-%d' / '%Y-%m', …)`; thứ hiện bằng chữ "Thứ Hai"… | 4 |
| Cột tính "[cột] [+ − × ÷] [cột / số]", "làm tròn tới [đơn vị / nghìn]" | phép tính, `ROUND(x)`, `ROUND(x / 1000.0) * 1000` (SQLite không nhận `ROUND(x, -3)`) | 5 |
| "Đếm dòng / đếm người khác nhau theo [cột]"; "ô trống / có giá trị / ô trống coi là [giấy nhớ]" | `COUNT(*)`, `COUNT(DISTINCT …)`, `IS NULL`, `IS NOT NULL`, `COALESCE` | 7 |
| "Lớn nhất / nhỏ nhất"; "nối giữ cả dòng không khớp" | `MAX`, `MIN`, `LEFT JOIN` | 8 |
| "Xếp loại: NẾU … THÌ … NẾU KHÔNG NẾU … CÒN LẠI …" (tối đa 5 bậc, mỗi bậc một điều kiện, được có VÀ) | `CASE WHEN … END AS …` | 9 |

- Ô trống hiện chữ mờ "(trống)" ở màn kết quả; khác với chữ rỗng.
- Câu xem trước luôn hiện SQL thật.
- Sổ CLB thêm trang cho từng kỹ năng (`so-tay/`), mỗi trang ghi cách viết ở hệ khác khi khác SQLite (`EXTRACT`, `DATE_TRUNC`, `ROUND(x, -3)`).
- **Chạy và Nộp tách riêng (A3 mục 15):**
  - Nút "Chạy" chỉ chạy thử: hiện bảng kết quả và lời phản ứng bẫy (`Khi chạy ra n dòng`) như hiện nay, nhưng **không chấm, không khóa câu, không hiện nút đi tiếp**. Câu đã ra đúng vẫn sửa, chạy lại được bao nhiêu lần cũng được.
  - Nút "Nộp" luôn có (khi đã chạy ít nhất một lần). Bấm Nộp thì mở **bước xác nhận**:
    - đọc lại câu bằng lời thường ("Lấy mã, tên của sinh viên lớp BC24A và tên bắt đầu bằng H") cùng số dòng;
    - người chơi **chọn cột trả lời câu hỏi** trong các cột của kết quả (thẻ khai `- Cột nộp: <cột>[, <cột>]`; thẻ có `Bấm ô lấy giấy nhớ` thì mặc định là cột ấy);
    - hai nút "Nộp" và "Sửa tiếp".
  - Chấm khi xác nhận: kết quả đúng và cột chọn đúng thì ghim, đi tiếp. Chọn sai cột thì Hà Vy nhắc một câu (lời thẻ `Khi chọn sai cột nộp`), quay lại màn tra. Kết quả sai thì nhân vật phản ứng theo bẫy, quay lại màn tra. Nộp sai không khóa, không có kết xấu.
  - Nhật ký đồng hành ghi cả lần chạy thử lẫn lần nộp.
- **Hoạt cảnh lọc từng bước (A3 mục 15):** câu có từ hai điều kiện `WHERE` trở lên thì có nút "Xem từng bước".
  - Máy tách `WHERE` thành các điều kiện ở cấp ngoài cùng, chạy thật từng bước cộng dồn để lấy số dòng thật sau mỗi điều kiện.
  - Hoạt cảnh: bắt đầu từ cả bảng ("3.912 dòng"); mỗi bước sáng một điều kiện, các dòng bị loại mờ đi và rơi xuống, bộ đếm chạy xuống số mới. Bảng to (trên khoảng 200 dòng) thì vẽ cột khối thay cho từng dòng, bộ đếm vẫn là số thật.
  - Người chơi kéo đổi thứ tự các điều kiện rồi xem lại; hai lần xem gần nhất đặt cạnh nhau ("Lớp trước: 3.912 → 31 → 2", "Tên trước: 3.912 → 565 → 2") để thấy với VÀ kết quả cuối như nhau, chỉ số giữa đường khác.
  - Với HOẶC: hoạt cảnh là gộp, dòng được thêm vào (số tăng), dòng trùng chỉ tính một lần. Câu trộn VÀ với HOẶC thì đi theo ngoặc, mỗi ngoặc là một bước.
  - Xem từng bước không tính vào chấm, không tốn gì. Thẻ có thể khai lời `Khi xem từng bước` để nhân vật bình một câu.
- **Máy kiểm kỹ năng:** bộ kiểm đọc SQL chuẩn của mọi thẻ thử thách, màn chiếu, lọc thử; báo lỗi khi dùng mẫu chưa tới vụ theo bảng A4 (việc phụ tính theo `mở sau`).

**Nghiệm thu B3:**
- [ ] Mỗi khối có test: SQL chuẩn có mẫu ấy thì khối hiện; lắp đúng thì câu sinh ra chạy thật bằng số dòng kỳ vọng; lắp sai thì ra đúng số dòng của bẫy.
- [ ] Máy kiểm kỹ năng có test cho mỗi dòng bảng A4 (dùng sớm một vụ là lỗi, đúng vụ là qua).
- [ ] Thẻ có `ORDER BY` vẫn chấm thứ tự dòng; thẻ có `CASE` chấm cả cột nhãn.
- [ ] Màn tra dùng được trên điện thoại cầm dọc.
- [ ] Test: chạy ra đúng rồi vẫn đổi được giấy nhớ, phép so, cột và chạy lại; không có gì tự đi tiếp khi chỉ bấm Chạy.
- [ ] Test bước xác nhận: chọn đúng cột với kết quả đúng thì ghim; chọn sai cột thì quay lại kèm lời nhắc; kết quả sai thì phản ứng bẫy; "Sửa tiếp" giữ nguyên câu đang lắp.
- [ ] Bộ kiểm báo lỗi: `Cột nộp` không có trong các cột của SQL chuẩn.
- [ ] Test lọc từng bước: với câu VÀ hai điều kiện, số dòng mỗi bước khớp chạy thật ở cả hai thứ tự, số cuối bằng nhau; với HOẶC số tăng; dòng trùng không đếm hai lần.
- [ ] Hoạt cảnh chạy mượt trên điện thoại cầm dọc; có nút bỏ qua; người bật giảm chuyển động thì chỉ hiện số từng bước.

### B4. Tuyến Khánh: Vụ 1, 2, 4, 6, 8 (sắp lại từ năm vụ cũ)

**Làm** theo kế hoạch mục 4:
- **Vụ 1:** bỏ `LIKE`, `IN` (thẻ `c-ten-h` thành tra từng lớp + bấm chọn tên chữ H); câu OR của Quân thành `ten = 'Hoài' OR ma_lop = 'BC24A'`; hai nhịp Hoài ở mở đầu (nhập học, Trung thu hỏi đường phòng máy in); câu Tùng nghi Hoài có căn cứ của riêng Tùng; `hoai` xuất hiện từ mở đầu, có tên tạm.
- **Vụ 2 Tin đồn** (08/10 → 15/10): bằng → bắt đầu bằng → chứa → làm sạch → `IN`; tìm tin gốc bằng một câu có VÀ (bỏ lọc tiếp); đối chất Hiếu giữa vụ, Quân 2 nhịp ở hạn chót.
- **Vụ 4 Nam ở đâu lúc 22:40** (từ Vụ 3 cũ, 22/10 → 25/10): bỏ cột `thu`, `buoi` dựng sẵn; bẫy `BETWEEN` cùng ngày; tách giờ, thứ, tuần; **không** `GROUP BY` (thói quen hiện bằng lọc thứ và số dòng).
- **Vụ 6 Giúp Nam** (từ Vụ 4 cũ, 04/11 → 08/11): nối đơn với phiên đăng nhập; nối phiên với bảng tài khoản phần mềm; **không** `GROUP BY` (bỏ màn đếm theo người, đếm theo máy; thay bằng lọc trên bảng nối).
- **Vụ 8 Sổ quỹ** (từ Vụ 5 cũ, 21/11 → 29/11): dời mốc kiểm kê 12/11 sang 21/11; thêm `LEFT JOIN … IS NULL`, `MAX`, `MIN`; đối chất Quân giữa vụ; giữ năm nhịp với Khánh, **mỗi nhịp thêm dòng `[NGƯỜI QUEN …]`** theo bảng mục 5.2 (Hiếu, Hoài, Nam, chú Cường, Quân).
- Dữ liệu `noi-dung-mua-1/du-lieu.md` sửa theo; mọi số dòng khai phải khớp chạy thật.
- Thứ cũ không còn dùng (thẻ, lời, ảnh tham chiếu) thì gỡ, không để "chuỗi lẻ".

**Nghiệm thu B4** (cộng nghiệm thu chung mục C):
- [ ] Bảng đo mục C2 đạt cho cả năm vụ.
- [ ] Vụ 1 không còn `LIKE`, `IN`, `TRIM`, `LOWER` ở bất kỳ SQL nào (máy kiểm kỹ năng xanh).
- [ ] Bản chơi thử Vụ 1 có cảnh nhập học có Hoài, cảnh Trung thu Hoài hỏi đường phòng máy in, và câu Tùng nghi Hoài nhắc lại câu hỏi ấy.
- [ ] Ngày 21/11 là ngày Nam kiểm kê trong mọi lời và giấy tờ; không còn "12/11" gắn với kiểm kê.
- [ ] Năm nhịp đối chất với Khánh, mỗi nhịp có một `[NGƯỜI QUEN]` và vẫn có thẻ ĐỦ CĂN CỨ kiếm được trong vụ.

### B5. Vụ thường: Vụ 3 Gói hàng, Vụ 5 Tiền điện

**Làm** theo kế hoạch mục 4: bảng dữ liệu mới (`don_giao_hang`; `chi_so_dien`, `o_phong`, đơn giá), thẻ thử thách có bẫy đúng như kế hoạch (phòng 400 / 499, `>= 1`, chia số nguyên `15 / 31`, làm tròn từng người lệch hóa đơn), cảnh, lời, hồ sơ, việc ngày lễ của vụ (20/10, 31/10 viết ở gói B8 nhưng chừa chỗ trong lịch).

**Nghiệm thu B5:**
- [ ] Bảng đo C2 đạt.
- [ ] Mỗi bẫy kế hoạch nêu có một lời `Khi chạy ra n dòng` riêng, `n` là số chạy thật của câu sai ấy.
- [ ] Dữ liệu cỡ thật: `don_giao_hang` ít nhất 200 dòng, chỉ đúng một gói khớp đủ điều kiện.
- [ ] Không manh mối tuyến Khánh trong hai vụ này (vụ thường).

### B6. Vụ thường: Vụ 7 Quỹ quà 20/11, Vụ 9 Xếp loại

**Làm** theo kế hoạch mục 4. Vụ 7 kết bằng lễ tặng hoa sáng 20/11; Vụ 9 `CASE` năm bậc, bẫy thứ tự điều kiện, điều kiện kép (môn điểm D hạ bậc), bẫy làm tròn 3,18 → 3,2.

**Nghiệm thu B6:**
- [ ] Bảng đo C2 đạt.
- [ ] Vụ 7: sao kê nhiều dòng hơn số người (đếm người khác nhau ra số khác đếm dòng); có ô trống thật (NULL) và bẫy `<> 'Nộp hộ'` ra đúng số dòng thiếu.
- [ ] Vụ 9: có thẻ với `CASE` ít nhất 5 nhánh; viết sai thứ tự ra số dòng "Khá" đúng như lời phản hồi; không dùng số kiểu 3,195.
- [ ] Hoài lên tiếng đỡ Hiếu ở Vụ 7 (nhịp tuyến Tùng–Hoài).

### B7. Vụ 10: Vụ đầu tiên của CLB

**Làm:** dàn ý trước (gửi Claude duyệt, chưa viết lời), sau khi duyệt mới viết. 20/01 → 14/02/2025, qua Tết; ngăn tủ mở khi đủ lời nhắn chị Linh; bác Thịnh bị oan năm xưa; thầy Quang tự nhận phần sai; bốn `[NGƯỜI QUEN]` (bác Thịnh, bà Lụa, thầy Quang, cô Hạnh); kết mùa cùng ngày Valentine.

**Nghiệm thu B7:**
- [ ] Dàn ý có: mỗi ngày một nhóm kỹ năng cũ; ít nhất 4 đối chất; không cú pháp mới (bảng A4 dừng ở Vụ 9).
- [ ] Bảng đo C2 đạt.
- [ ] Không có nhánh nào để thiếu lời nhắn chị Linh làm hỏng vụ (vẫn kết đủ được, chỉ thiếu cảnh ngăn tủ và kết thật).

### B8. Bảy việc ngày lễ

15/10 Hội SV (Quân), 20/10 Phụ nữ VN (Tùng chọn quà xin lỗi Hoài), 31/10 Halloween (giao lưu CLB ở sân KTX), 20/11 Nhà giáo (học trò cũ của cô Hạnh, sửa từ việc đã có), 09/01 HSSV (Sinh viên 5 tốt, `CASE`), 22/01 ông Công ông Táo (gom xe về quê), 14/02 Valentine (Tùng tỏ tình; Hoài trả lời bằng câu đố sổ mượn sách).

**Nghiệm thu B8:**
- [ ] Mỗi việc: 60–120 dòng thoại, 2–3 màn tra, có chuỗi `Khi lỡ` cho thấy hậu quả (không kể).
- [ ] Kỹ năng đúng bảng A4 tại ngày ấy (09/01 nằm sau khi Vụ 9 dạy `CASE`: ngày 09/01 phải sau ngày dạy `CASE` trong Vụ 9).
- [ ] Mỗi việc có ít nhất một ảnh CG hoặc chibi khai sẵn tên tệp (ảnh vẽ sau).
- [ ] Câu đố Valentine chạy thật ra đúng câu trả lời.

### B9. Chín người quen, 27 việc

Theo bảng mục 5.2 của kế hoạch: Hiếu, Hoài, Nam, chú Cường, Quân (giúp Vụ 8); bác Thịnh, bà Lụa, thầy Quang, cô Hạnh (giúp Vụ 10). "Sổ nợ trà đá" thành việc 1 của bà Lụa.

**Nghiệm thu B9:**
- [ ] Mỗi việc: 1–2 màn tra, 20–40 dòng thoại; ba việc của một người tăng dần, việc sau ghép thêm kỹ năng mới hơn việc trước.
- [ ] Mỗi người có chuỗi "nói thay" ở đúng nhịp (B2), người ấy nói bằng chứng của mình, giọng đúng thẻ nhân vật.
- [ ] Cả ba việc của người giúp Vụ 8 mở xong trước Vụ 8; của người giúp Vụ 10 mở xong trước Vụ 10.
- [ ] Mỗi người một ảnh CG khai tên tệp và chú thích.
- [ ] Không người quen nào là thành viên CLB.

### B10. Năm việc CLB

Túi đồ (Tùng, bỏ phần nối, bỏ ngày 30/10), Sổ sử dụng phòng (Duy), Một lần dẫn lạc (Tùng, bỏ nhóm và đếm, khớp chuyện Hoài ở mở đầu), Chiếc micro (Duy, mở sau Vụ 6), Một lần hoàn tiền (Minh Anh, mở sau Vụ 8). Việc "Học trò cũ" chuyển sang B8.

**Nghiệm thu B10:**
- [ ] Mở theo điều kiện kế hoạch mục 5.3; không hiện ngày cụ thể; không hết hạn.
- [ ] Máy kiểm kỹ năng xanh theo `mở sau` mới.
- [ ] "Một lần dẫn lạc" khớp từng chi tiết với cảnh nhập học có Hoài ở Vụ 1 (ngày, nơi tới, nhà xe).

### B11. Người đi cùng (user nêu 05/10/2026; chưa xếp lịch làm)

**User đã chốt:**
- Avatar của người đang đi cùng **luôn hiện ở góc phải** màn hình. Phải cho cảm giác đang đi với một người bạn thật.
- **Gợi ý là lời viết sẵn**, không để AI tự sinh. AI chỉ dùng cho trò chuyện tự do (đã có `DongHanhMvp` cho Tùng, Hà Vy).
- Khi người chơi bí: **bóng thoại hiện ra từ avatar** với vài câu gợi ý. Không nháy vùng cần bấm, avatar cũng không nhúc nhích.
- Người đi cùng **có mặt cả ở bản đồ**: nhắc nên đi đâu, hoặc bàn xem đi đâu trước. Đây là chỗ mỗi người lộ tính cách (ví dụ Hà Vy cân nhắc, Tùng đòi đi ngay).
- Người đi cùng **nhắc việc còn dở trước khi người chơi bấm "Hết ngày"**.
- Về sau có thể có **đoạn đi một mình**: thử thách tự lực, không có gợi ý.
- **Mọi hướng dẫn thao tác (tutorial) dồn về bạn đi cùng / chat bot** (user 05/10 chiều): lời thoại và lời phản hồi màn tra không chỉ cách bấm ("Lên hàng LẤY CỘT bấm thêm ma_sv"); chúng chỉ tả kết quả. Người chơi cần biết bấm gì thì hỏi bạn đi cùng.

**Đã có sẵn trong MVP (dùng lại):** `src/mvp/ui/DongHanhMvp.tsx` (dải "Đi cùng", chat AI có trí nhớ riêng), `NhacViecMvp` (`> NHẮC VIỆC <ai>: …` hiện mặt ở góc sân khấu), nháy chi tiết ẩn khi để lâu ở `KhamPhaMvp.tsx` (sẽ thay bằng bóng thoại).

**Phải làm:**
- Cú pháp khai ai đi cùng ở `[ĐI CÙNG]` và ở chuỗi đầu ngày (ví dụ `· cùng: tung`); đi một mình thì khai rõ `· cùng: không`.
- Cú pháp lời gợi ý theo bậc cho mỗi nhiệm vụ (bậc 1 dùng lại dòng `> NHẮC VIỆC`), lời bàn ở bản đồ, lời nhắc trước "Hết ngày"; mỗi người đi cùng một giọng.
- Máy kiểm: gợi ý không chứa đáp án màn tra, không thuật ngữ SQL ở miệng Hà Vy, Minh Anh, Tùng; nhiệm vụ nào trên tuyến có người đi cùng cũng có ít nhất một gợi ý; đoạn `cùng: không` thì không có gợi ý.
- Màn chơi: gộp ô nhắc việc với dải đi cùng thành một ô avatar góc phải có bóng thoại (cả màn dọc); bỏ nháy vùng bấm.
- Truyện chữ in "Đi cùng: <ai>" ở đầu đoạn và in lời gợi ý, lời bàn ở bản đồ thành khung riêng.

**Chưa chốt:** làm lúc nào (đề xuất: sau khi truyện chữ Vụ 2 được duyệt; riêng lời gợi ý của Vụ 2 thêm ngay sau các lượt lời); điều kiện coi là "bí" (để lâu, nộp sai mấy lần, hay người chơi tự bấm avatar); người chưa có chat AI (Minh Anh, Duy, Nam) có mở chat không.


### B12. Hỏi nhân chứng bằng gõ chữ (user nêu 05/10/2026 tối; chưa xếp lịch làm)

**User đã chốt:**
- Hướng đi: người chơi **gõ câu hỏi**, máy **xếp câu hỏi vào một dữ kiện** của nhân chứng, rồi trả lời bằng **một trong các biến thể lời đã viết sẵn** cho dữ kiện đó. Biến thể do model viết lúc dựng game, qua soát và duyệt mẫu như lời thường. Không sinh lời lúc chơi cho nhân chứng.
- Phải **gợi ý cho người chơi biết còn hỏi được gì**: một **danh sách cần điều tra**, hoặc **bạn đi cùng gợi ý câu hỏi** (hai cách dùng được cùng lúc).
- **Ba cách chơi, người chơi đổi được lúc nào cũng được** (user 05/10 tối): (1) tự động hoàn toàn, bấm rồi đọc cả đoạn như hiện nay; (2) bấm từng câu hỏi mẫu; (3) gõ câu hỏi. Điều đã hỏi ra giữ nguyên khi đổi cách.
- Đối chất chưa đụng tới, vẫn đưa bằng chứng như cũ. Cảnh thử là bác Thịnh ở sảnh tòa B.

**Đề xuất của Claude (chờ user duyệt):**
- Mỗi nhân chứng có một **tờ dữ kiện**. Mỗi dữ kiện khai: câu cần làm rõ (dòng hiện ở danh sách), nội dung, chữ bắt buộc (mốc giờ, tên, con số phải có nguyên văn trong mọi biến thể), bốn tới năm biến thể lời, vài câu hỏi mẫu để máy xếp, điều kiện mới chịu nói, và hai bậc gợi ý của bạn đi cùng. Thêm lời "không biết" và lời gạt chuyện ngoài lề.
- **Danh sách cần điều tra** nằm trong cuốn sổ CLB người chơi đang giữ. Mỗi dòng là một câu hỏi còn mở, không phải đáp án. Hỏi ra thì dòng được gạch và thành giấy nhớ như hiện nay. Dữ kiện chính có trong danh sách; dữ kiện phụ thì không, ai tò mò hỏi thêm mới ra (theo luật dấu "!" và chi tiết ẩn).
- **Bạn đi cùng gợi ý theo bậc** (dùng khung B11): hỏi trượt hai câu liền thì bóng thoại bậc 1 nói điều nhóm chưa biết; trượt tiếp thì bậc 2 đưa hẳn một câu hỏi, bấm vào là hỏi luôn (đỡ gõ trên điện thoại). Hà Vy gợi ý về căn cứ và mốc giờ, Tùng gợi ý theo kiểu đoán.
- Một nguồn cho ba thứ: mục "Biết thêm" của thẻ cảnh (nen-loi) sinh ra dòng danh sách, dữ kiện và lời gợi ý.
- Xếp câu hỏi: thử model so nghĩa chạy trong máy người chơi (khoảng 100 MB, không cần mạng) so với model trên máy chủ của đường chat sẵn có.
- Máy kiểm: mọi biến thể chứa đủ chữ bắt buộc và không có mốc giờ, con số, tên người nào khác.

**Căn cứ:** Vaudeville (AI tự do, người chơi ép được nhân vật nói trái dữ kiện), bản thử Portopia (chỉ xếp vào lệnh có sẵn, bị chê cứng), bài nghiên cứu "structured knowledge tree" (arXiv 2609.23043: chi tiết bịa giảm từ 17,8% xuống 6,27%, vẫn chưa đủ cho mốc giờ), Dead Meat (lời AI chỉ tốt bằng phần người viết).

**Màn thử (05/10 tối, chưa vào game):** `tools/thu-hoi-dap/` gồm trang chơi thử `thu-hoi-dap.html` (đăng ở https://claude.ai/artifact/ToGtzTxe1qodiPn2NLzP1z, câu người chơi gõ được ghi vào collection `cau-hoi`), tờ dữ kiện `du-lieu/bac-thinh.json` (7 dữ kiện, trong đó 2 dữ kiện ẩn; 23 biến thể lời; 48 câu hỏi mẫu), bộ câu thử `du-lieu/cau-thu.json` (70 câu do một model khác viết, không biết bác Thịnh biết gì) và máy kiểm `kiem-bien-the.py` (đủ chữ bắt buộc, không mốc giờ lạ, gợi ý bậc 1 không lộ đáp án).

**Kết quả đo máy xếp câu hỏi trên 70 câu thử** (ngưỡng đặt tay, chưa chỉnh):

| Máy | Đúng | Câu nhắm dữ kiện có sẵn (31) | Trả nhầm một dữ kiện cho câu không hỏi tới nó |
|---|---|---|---|
| So chữ (không cần model, chạy mọi máy) | 54/70 | 30/31 | 13 |
| Model so nghĩa trong trình duyệt (multilingual-e5-small, 120 MB) | 44/70 | 30/31 | 20 |
| Gộp hai máy trên | 55/70 | 30/31 | 12 |
| Model ngôn ngữ nhỏ (Claude Haiku, xếp cả 70 câu trong một lượt) | 67/70 | 29/31 | 1 |

Con số của model ngôn ngữ là **lạc quan**: đề bài cho nó được viết lại sau khi đã thấy bộ câu thử (ví dụ về thứ bác không biết lấy từ chính bộ câu), và nó xếp cả lô chứ không phải từng câu như lúc chơi. Lượt đầu với đề bài sơ sài, nó trả thiếu một nhãn và dồn 40 trên 70 câu vào "không rõ", không chấm được. Chưa đo với model của đường chat sẵn có (Gemini, DeepSeek) vì máy làm việc không gọi được ra ngoài bằng dòng lệnh.

Bài học: tìm đúng dữ kiện khi người chơi hỏi trúng thì dễ (30/31 với cả ba máy). Chỗ khó là **biết từ chối**: 19 trên 70 câu hỏi về thứ bác không có dữ kiện (camera, ổ khóa hộp, chìa khóa, phong bì, cửa sau…), và máy so độ giống hay ép chúng vào dữ kiện gần nhất. Model so nghĩa chạy trong máy người chơi không giúp gì ở chỗ này. Lời mở bằng "Có", "Không", "Ừ" cũng dễ sai nghĩa khi câu hỏi đảo chiều, nên biến thể phải viết sao cho đứng được với cả hai chiều hỏi.

**Chưa chốt:** dùng máy nào để xếp câu hỏi khi vào game; cảnh nào giữ kiểu bấm rồi đọc như cũ; khi nào đưa vào máy game (`src/mvp/`) và cú pháp tờ dữ kiện trong `noi-dung-mua-1/`.
---

## C. Nghiệm thu chung (mọi gói nội dung)

### C1. Máy

- [ ] Bảy lệnh mục A6 đều xanh (`kiem-giong` không còn LỖI; nhắc thì liệt kê trong báo cáo).
- [ ] `src/content/generated/mua-1/kich-ban.gen.ts` sinh lại, khớp `.md`; `src/content/generated/mvp/` không đổi.
- [ ] `git diff --stat main -- prototype/noi-dung-mvp` rỗng.
- [ ] Mọi SQL có khai số dòng chạy thật khớp.
- [ ] Không chuỗi lẻ, không lời không ai dùng, không thẻ hồ sơ không ai tạo.
- [ ] Máy kiểm kỹ năng (B3) xanh.

### C2. Bảng đo mỗi vụ chính (ghi số thật vào báo cáo)

| Tiêu chí | Ngưỡng | Cách đếm |
|---|---|---|
| Dòng thoại | ≥ 300 | số dòng `- **…**` trong `loi/` của vụ, kể cả lời "Khi …" của thẻ |
| Chuỗi | ≥ 40 | số `### ` trong `kich-ban/` của vụ |
| Màn tra | ≥ 5 | số `[THỬ THÁCH]` khác nhau (mọi thẻ trên tuyến chính, không tính tùy chọn) |
| Đối chất | ≥ 3, trong đó 1 giữa vụ | số `[ĐỐI CHẤT]` (mỗi nhịp tính một) |
| Kỹ năng mới | đúng bảng A4 | mỗi kỹ năng có ít nhất một thẻ dạy và một bẫy có lời `Khi chạy ra n dòng` |
| Ngày | theo kế hoạch | mỗi ngày có `[XONG VIỆC CHÍNH]`, ≤ 2 việc chính, một buổi tối không khí ở ít nhất một ngày |
| Bản đồ | ≥ 1 ngày có 1–2 nơi tùy chọn, mỗi nơi một chi tiết ẩn | |
| Hà Vy soi | ≥ 1 người | `[KHÁM PHÁ … · quan sát …]` |
| Không vụ nào ngắn hơn vụ trước quá 10% | so dòng thoại | |

### C3. Truyện và lời

- [ ] Không nhân vật nào biết trước điều chỉ lộ ở vụ sau (đọc bản chơi thử theo thứ tự).
- [ ] Dữ kiện (ngày giờ, mã, số tiền, số dòng) khớp giữa `du-lieu.md`, `ho-so/`, `loi/`, `lich.md`.
- [ ] Mỗi kỹ năng mới gỡ một kết luận sai của một nhân vật, và nhân vật ấy đã nói kết luận sai đó trước màn tra.
- [ ] Mỗi điều không hay có một đoạn cho thấy hậu quả.
- [ ] Không nhân vật nào đọc ra đáp án màn tra trong lời nhắc; lời "Khi …" gợi một câu, không liệt kê.
- [ ] Nhân vật mới (nếu có) giới thiệu đúng trình tự; cố hạn chế nhân vật mới (ưu tiên dùng người đã có).
- [ ] Lời mới viết do model có đánh dấu `(tạm)` ở cuối dòng để người duyệt lọc.

### C4. Chơi thử

- [ ] Bản chơi thử dạng chữ sinh được cho mọi vụ và việc phụ, chạy từ đầu tới `[KẾT THÚC]`, có cả nhánh kết đủ và kết chưa trọn; vụ có người quen có cả nhánh đủ và chưa đủ hảo cảm.
- [ ] Lưu truyện chữ vào `docs/mua-1/truyen-chu/`.
- (Claude làm sau khi nhận gói: chơi trên trình duyệt bằng thao tác màn hình từ đầu tới kết, cả điện thoại cầm dọc.)

---

## D. Mẫu báo cáo (mỗi gói một tệp `docs/mua-1/bao-cao/<gói>.md`)

1. Tệp đã sửa, tệp mới, tệp xóa.
2. Bảng đo C2 cho từng vụ trong gói (số thật).
3. Kết quả tám lệnh A6 (dán dòng cuối của mỗi lệnh).
4. Danh sách tick nghiệm thu của gói, mục nào chưa đạt thì nói vì sao.
5. Quyết định tự đặt (tên bảng, tên mã, cú pháp chỉnh so với A5) và chỗ lệch kế hoạch.
6. Chỗ còn nghi, cần người duyệt chọn.
7. Trích ba đoạn thoại mỗi vụ (một đoạn mở, một đối chất, một cảnh không khí) để duyệt giọng nhanh.

---

## E. Làm truyện chữ trước (gói T0)

### E1. Vì sao viết bằng định dạng game rồi xuất ra chữ, không viết truyện chữ rời

- Viết rời thì sau phải chép lại sang định dạng game: làm hai lần, và lúc chép mới lộ chỗ vỡ (số dòng SQL không khớp, cờ không đặt, chuỗi lẻ).
- Viết thẳng bằng định dạng game thì máy kiểm bắt lỗi ngay từ bản nháp, SQL chạy thật (SQLite chạy được `strftime`, `CASE`, `LEFT JOIN` mà chưa cần khối màn tra mới), còn user vẫn chỉ đọc chữ.
- Công cụ `tools/ban-choi-thu.ts` đã in được lời, rẽ nhánh, thẻ, đối chất, SQL chạy thật. T0 nâng nó thành truyện chữ để đọc và chọn.

### E2. Gói T0: làm gì

0. **Tách bộ mùa 1:** chép `prototype/noi-dung-mvp/` sang `prototype/noi-dung-mua-1/`; công cụ đọc, kiểm, sinh, kiểm giọng, truyện chữ nhận thư mục nội dung làm tham số; thêm các lệnh `:mua1` (A6); bộ sinh ra `src/content/generated/mua-1/`. Game có cách chọn bộ để chơi (biến môi trường lúc chạy dev hoặc mục chọn ở màn tiêu đề), mặc định vẫn là MVP.
1. **Bộ đọc, bộ kiểm, bộ sinh** nhận cú pháp mới ở A5 (hạn chót, ngày, `[XONG VIỆC CHÍNH]`, việc ngày lễ, người quen, `[NGƯỜI QUEN …] → nói thay`, `· chú thích:`, `· mô tả:`). Đây là phần "đọc và kiểm" của B1, B2; phần màn chơi để sau.
2. **Máy kiểm kỹ năng** (phần kiểm của B3, bảng A4). Phần khối màn tra để sau.
3. **Công cụ truyện chữ** `tools/truyen-chu.ts`, xuất mỗi vụ, mỗi việc phụ thành một tệp `docs/mua-1/truyen-chu/<mã>.md`:
   - Kiểu sách "tự chọn hướng đi": truyện chia thành các đoạn đánh số; mỗi lựa chọn là một liên kết tới đoạn tiếp theo (`[Chọn: Mời Hoài vào](#doan-12)`), bấm được trong VS Code và trình xem Markdown.
   - Lời thoại: `**Tùng** (lúng túng): …`. Suy nghĩ người chơi in nghiêng.
   - **Ảnh, CG, chibi, meme**: một khung chữ thay cho ảnh, ghi mã ảnh và mô tả, ví dụ `> [CG cg-v4-nam-thu-vien] Nam ngồi bàn cạnh cửa sổ, đồng hồ thư viện chỉ 22:40.` Chibi ghi thêm "(sticker)". Ảnh chưa có mô tả thì in mã kèm "(chưa có mô tả)".
   - **Màn tra SQL chỉ hiện kết quả**, không phải chơi: đề bài, câu SQL chuẩn, bảng kết quả chạy thật (tối đa 10 dòng, dài hơn thì ghi "… còn n dòng"), rồi các dòng tóm bẫy: "Nếu lọc `> 400` thay vì `BETWEEN`: ra 7 dòng → Hà Vy: …". Truyện đi tiếp như người chơi đã tra đúng. Câu có từ hai điều kiện `WHERE` trở lên thì in thêm dòng **Lọc từng bước** với mọi thứ tự điều kiện (tối đa 3 điều kiện), số chạy thật: "Lớp trước: 3.912 → 31 → 2 · Tên trước: 3.912 → 565 → 2". Có `Cột nộp` thì in "Nộp cột: ma_sv".
   - **Đối chất**: in giả thuyết, câu hỏi, danh sách thẻ trình được; mỗi thẻ là một lựa chọn dẫn tới phản hồi của nó; thẻ ĐỦ CĂN CỨ dẫn tiếp truyện. Nhịp có người quen in hai nhánh: "Nếu đủ hảo cảm với Nam: …" và "Nếu chưa: tự chọn thẻ".
   - **Lịch**: đầu mỗi ngày một dòng "Thứ Ba, 08/10/2024 · Còn 7 ngày tới buổi giải trình"; cuối ngày "Hết ngày". Việc ngày lễ là một lựa chọn trong ngày ấy, kèm nhánh "bỏ lỡ" dẫn tới chuỗi `Khi lỡ`.
   - **Bản đồ, khám phá**: mỗi nơi, mỗi người bấm được là một lựa chọn; chi tiết ẩn ghi "(chi tiết ẩn)". Hết một đoạn thoại thì quay lại đoạn "Đang ở <nơi>" của nơi ấy: liệt kê những chỗ còn bấm được, cộng lựa chọn "Mở bản đồ" dẫn tới đoạn bản đồ của ngày (các nơi đi được, nơi có "!" ghi rõ), cộng "Hết ngày" khi đã xong việc chính. Không có lựa chọn "Đi tiếp" tự chuyển nơi (A3 mục 14).
   - **Điều kiện, cờ**: lựa chọn nào phụ thuộc cờ thì ghi điều kiện bằng lời ("chỉ hiện nếu đã gặp bác Thịnh ở ngày 2").
   - Đầu tệp: mục lục ngày, nhân vật xuất hiện, bảng đo C2 của vụ.
4. **Mục lục mùa** `docs/mua-1/truyen-chu/README.md`: mười vụ theo lịch, việc ngày lễ đặt đúng ngày, người quen và việc của họ theo thứ tự mở.

### E3. Nghiệm thu T0

- [ ] `noi-dung-mua-1/` là bản chép của MVP; `kiem-noi-dung:mua1` và `kiem-noi-dung:mvp` đều xanh; game mặc định vẫn mở MVP.
- [ ] Xuất được truyện chữ cho năm vụ và sáu việc phụ **hiện có** trong bản chép (chưa sửa nội dung), đọc từ đầu tới kết bằng liên kết, không liên kết chết.
- [ ] Mọi `[ẢNH …]` hiện thành khung chữ; không chỗ nào in mã nội bộ trần (`[LỜI …]`, `[HẬU QUẢ]`…) ra truyện.
- [ ] Mọi màn tra in bảng kết quả chạy thật, khớp `Số dòng kỳ vọng`; mọi lời "Khi chạy ra n dòng" in thành dòng tóm bẫy.
- [ ] Mọi `[ĐỐI CHẤT]` in đủ lựa chọn thẻ và phản hồi; mọi `[RẼ NHÁNH]` dẫn đúng đoạn.
- [ ] Bộ kiểm nhận cú pháp mới: một vụ mẫu nhỏ trong test dùng hết cú pháp A5 thì kiểm xanh và xuất truyện chữ đúng.
- [ ] Tám lệnh A6 xanh; game hiện tại vẫn chơi được như trước (T0 không đổi màn chơi).

### E4. Thay đổi cho các gói nội dung B4 → B10

- Mỗi ảnh mới (`cg-`, `chibi-`, ảnh nền, meme) **bắt buộc có `· mô tả: …`** (ai, ở đâu, làm gì, chi tiết đáng chú ý). Mô tả vừa để đọc truyện chữ, vừa làm đề bài vẽ ảnh sau khi chốt kịch bản.
- Màn tra mới vẫn viết đủ thẻ thử thách (SQL chuẩn, số dòng, lời bẫy) dù màn tra chưa có khối tương ứng; truyện chữ đọc từ đó.
- Nộp gói = nộp truyện chữ của các vụ trong gói. User đọc, chọn, ghi góp ý thẳng vào tệp truyện chữ hoặc nhắn; người làm sửa ở nội dung gốc rồi xuất lại, không sửa tệp truyện chữ.
- Nghiệm thu C4 (chơi thử) đổi thành: truyện chữ xuất được, đọc hết mọi nhánh không liên kết chết. Chơi trên trình duyệt để sau khi ghép vào game.

---

## Tách riêng khỏi MVP

**User chốt 04/10: tách riêng.** MVP đã là một bản xong; mùa 1 mười vụ không còn là MVP, nên có thư mục riêng để khỏi nhầm.

| | MVP (giữ nguyên) | Mùa 1 mười vụ (mới) |
|---|---|---|
| Nội dung | `prototype/noi-dung-mvp/` | `prototype/noi-dung-mua-1/` (chép từ MVP ở gói T0) |
| Tài liệu | `docs/mvp/` | `docs/mua-1/` |
| Tệp sinh | `src/content/generated/mvp/` | `src/content/generated/mua-1/` |
| Lệnh | `kiem-noi-dung:mvp`, `noi-dung:sinh:mvp` | `kiem-noi-dung:mua1`, `noi-dung:sinh:mua1`, `kiem-giong:mua1` |

- Mã máy (`src/mvp/`, `tools/`) dùng chung: một bản máy chạy được cả hai bộ. Mọi gói phải giữ MVP xanh và chơi được như cũ.
- Gắn tag `mvp-ban-chot` trên `main` lúc tách để luôn tìm lại đúng bản MVP.
- Giá phải trả: mã máy phải nhận thư mục nội dung làm tham số (gói T0), và sửa lỗi nội dung ở MVP sau này không tự sang mùa 1. Chấp nhận được vì MVP coi như đã đóng.
- Lời của cảnh đã có mà viết lại nhiều: vẫn ghi ra `docs/mua-1/v3-thoai/` để so bằng `kiem-giong:mua1 --so`, người duyệt nhặt từng đoạn vào `noi-dung-mua-1/loi/`.
- Mỗi gói một nhánh tách từ nhánh gói trước đã duyệt. `main` nhận gói nào cũng được (MVP không bị đụng), nên không phải chờ xong cả mùa.

Lưu ý khi giao Gemini: theo kinh nghiệm 03/10, Gemini gọt câu tốt nhưng **viết cảnh mới hay lệch tính cách, sai xưng hô, lộ đáp án vào lời nhắc**. Với gói nội dung mới (B5–B9), nên để Gemini dựng khung, dữ liệu, thẻ thử thách và lời đánh dấu `(tạm)`; Claude duyệt khung trước rồi mới gọt lời.
