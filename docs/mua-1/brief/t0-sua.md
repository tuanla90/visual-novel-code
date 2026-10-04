# Brief sửa gói T0 (lần 1)

Claude đã nghiệm thu gói T0 trong worktree `mua1-t0`. **Chưa đạt.** Bạn sửa tiếp **ngay trên các thay đổi đang có** trong worktree (không làm lại từ đầu, không xóa phần đã đạt). Luật chung giữ nguyên như `docs/mua-1/brief/t0.md`: không `npm install`, không commit/push/merge, không đụng `prototype/noi-dung-mvp/` và `prototype/src/content/generated/mvp/`, không sửa nội dung truyện trong `noi-dung-mua-1/`.

## Phần đã đạt (giữ nguyên)

- Chép bộ mùa 1, các lệnh `:mua1`, bộ sinh ra `generated/mua-1/`. MVP không đổi byte nào.
- `kiem-noi-dung:mua1`, `kiem-noi-dung:mvp`, `kiem-giong:mua1`, `typecheck` xanh; lint đúng mốc 6 lỗi + 1 cảnh báo.
- Bộ đọc nhận cú pháp A5; bộ kiểm B1, B2 có test.
- Màn tra trong truyện chữ in SQL chuẩn, bảng kết quả chạy thật, các dòng bẫy. Đối chất in đủ thẻ.

## Phải sửa

### S1. Sáu tệp việc phụ trống (lỗi nặng)

Các tệp `tui-do`, `so-phong`, `micro`, `hoan-tien`, `dan-lac`, `hoc-tro-cu` chỉ có một đoạn "*(Không tìm thấy nội dung chuỗi …)*". Chuỗi mở đầu của việc phụ nằm ở dòng `- Chuỗi:` trong `noi-dung-mua-1/lich.md` (ví dụ `tui-do` → `p-tui-mo`). Xuất đủ từ chuỗi đó tới kết, kể cả màn tra, rẽ nhánh và lời kết (`Tiêu đề kết`, `Lời kết`).

Nghiệm thu: mỗi tệp việc phụ có ít nhất một màn tra với bảng kết quả, và không còn chữ "Không tìm thấy nội dung". Test phải bắt được lỗi này: tệp truyện chữ nào có đoạn "Không tìm thấy nội dung chuỗi" thì test đỏ.

### S2. Bỏ mọi danh sách viết tay; đọc hết từ nội dung

`tools/truyen-chu.ts` đang viết tay danh sách vụ, việc phụ, tiêu đề và lịch (khoảng dòng 650–705). Từ gói B4, các vụ mới sẽ thêm vào `lich.md`. Vì vậy công cụ phải:

- đọc danh sách vụ (`{vụ sau: …}` cộng vụ mở đầu), việc phụ, việc ngày lễ và người quen từ dữ liệu đã đọc của `lich.md`;
- lấy tiêu đề và ngày từ đó.

Mục lục `README.md` cũng sinh từ dữ liệu. Không có dòng lịch nào gõ tay (bản hiện tại ghi "Vụ 4 — Nam ở đâu lúc 22:40", sai so với nội dung đang có).

### S3. Một tệp một vụ, tên tệp đúng mã

Bỏ các tệp trùng (`vu-1.md` trùng `vu1.md`, `phu-tui-do.md` trùng `tui-do.md`…). Mỗi vụ, mỗi việc chỉ còn **một** tệp `docs/mua-1/truyen-chu/<mã>.md`, với `<mã>` lấy đúng mã trong `lich.md`. Mọi liên kết trong `README.md` trỏ đúng các tệp này. Xóa các tệp thừa đã xuất.

### S4. Lịch trong truyện chữ (E2 mục 3, đang thiếu)

- Đầu mỗi ngày in một dòng: thứ, ngày tháng năm. Nếu vụ có `Hạn chót` thì thêm "· Còn N ngày tới <việc chốt>". Nếu vụ chưa có ngày thật (bản chép MVP chỉ có "Ngày 1…5") thì in "Ngày 1"…
- Cuối ngày (chỗ `[XONG VIỆC CHÍNH]` hoặc chỗ chuyển ngày) in dòng "**Hết ngày.**". Bỏ chữ `[XONG VIỆC CHÍNH — Hiện nút "Hết ngày"]`, vì đó là mã nội bộ.
- Việc ngày lễ: trong ngày `Ngày:` của nó, in thành một lựa chọn "Làm việc ngày lễ: <tên>", dẫn vào chuỗi của việc. Kèm lựa chọn "Bỏ qua" dẫn tới chuỗi `Khi lỡ`.
- Test vụ mẫu (`xuất đúng một vụ mẫu nhỏ dùng hết cú pháp A5`) phải kiểm thêm cả ba thứ này: dòng "Còn N ngày", dòng "Hết ngày", lựa chọn việc ngày lễ kèm nhánh bỏ qua.

### S5. Không in mã nội bộ ra truyện

- Đối chất in tiêu đề thẻ, không in mã thẻ. Hiện đang in "Đối chất: Trình ev-nhat-ky-in" và "Trình thẻ [ev-y]"; phải là "Trình thẻ: Nhật ký in".
- Mã biểu cảm tiếng Anh hoặc mã ảnh (`(neutral)`, `(happy)`, `(worried)`, `(gai-dau)`, `(chi-tay)`…) không in. Hoặc có bảng dịch sang lời Việt ngắn ("lúng túng", "chỉ tay"), mã nào không có trong bảng thì bỏ ngoặc.
- Dòng bẫy "Khi thiếu cột" đang in thành "Nếu chạy → …". Phải in "Nếu thiếu cột → …". Rà hết các loại dòng bẫy trong `loi/` (`Khi chạy ra n dòng`, `… với <cột>`, `Khi thiếu cột`, `Khi thừa cột`, nếu có loại khác thì xử lý tương tự). Mỗi loại cần một test.
- Test: quét mọi tệp truyện chữ đã xuất. Không được còn `[LỜI`, `[HẬU QUẢ`, `[XONG VIỆC`, `[DÀN DỰNG`, `ev-`, `clue-`, `{`, hoặc ngoặc chứa mã biểu cảm. Mã ảnh trong khung `> [CG cg-…]` thì được giữ.

### S6. Mục nhân vật gọn lại

"Nhân vật xuất hiện" đang dán nguyên mô tả thiết kế: trang phục, tên tệp ảnh `ao-xanh…`, ghi chú cho người viết. Chỉ in tên và một dòng vai trò ngắn (ví dụ: "Tùng: năm 1 Du lịch, bạn cùng phòng 408"). Tiêu đề tệp đang lặp ("Vụ 1 — Vụ 1 — Chữ ký H"); chỉ in một lần.

### S7. Máy kiểm kỹ năng báo nhầm

- Tên phiếu `@ev-tin-don`, `@ev-don-tung`: dấu gạch nối đang bị tính là phép trừ (thẻ `c-tin-goc`, `c-don-lac` bị báo "phép tính"). Bỏ tên phiếu `@…` khỏi SQL trước khi dò toán tử.
- Thêm test, mỗi trường hợp sau phải **không** bị tính là phép tính: `SELECT *`, `COUNT(*)`, `FROM @ev-a-b`, số âm trong chuỗi ngày `'2024-10-07'`.
- Chạy lại `kiem-ky-nang:mua1`, cập nhật danh sách lỗi trong báo cáo.

### S8. Nút đổi bộ ở màn tiêu đề

- Nút "Bộ nội dung: …" chỉ hiện khi `import.meta.env.DEV`. Người chơi bản build không thấy.
- Tham số URL `?bo=` ưu tiên hơn `sessionStorage`.
- Khóa lưu ván tách theo bộ: bộ mùa 1 dùng khóa riêng, ví dụ `clb_mua1_tien_do_v1`. Bộ MVP giữ nguyên `clb_mvp_tien_do_v1`. Như vậy ván MVP không bị nạp vào bộ mùa 1 và ngược lại.
- Thêm test: mặc định là MVP; khóa lưu của MVP không đổi.

### S9. Lệnh xuất truyện chữ

Thêm script `truyen-chu:mua1` vào `prototype/package.json`. Lệnh này xuất lại toàn bộ `docs/mua-1/truyen-chu/` (xóa tệp cũ trong thư mục trước khi ghi, để không sót tệp thừa).

### S11. Đứng nguyên chỗ (luật mới user chốt 04/10, `giao-viec.md` A3 mục 14, B1, E2)

- **Truyện chữ:** hết một đoạn thoại thì quay về đoạn "Đang ở <nơi>" của nơi đó. Đoạn này liệt kê:
  - những chỗ còn bấm được ở nơi ấy;
  - lựa chọn "Mở bản đồ" dẫn tới đoạn bản đồ của ngày;
  - "Hết ngày", chỉ khi đã xong việc chính.
- **Không còn lựa chọn "Đi tiếp" tự chuyển sang nơi khác.**
- Bản chép MVP còn `[ĐI TỚI]` đổi nơi. Ở những chỗ ấy, truyện chữ in một dòng `⚠ (bản cũ: tự chuyển nơi)` rồi đi tiếp, để gói B4 sửa.
- **Bộ đọc nhận** `{cảnh: <cảnh> · cảnh cắt}` và `· bắt đầu ở: <cảnh>` ở dòng ngày.
- **Lỗi "đứng nguyên chỗ"** theo B1 báo trong lệnh riêng `kiem-ky-nang:mua1`, cùng chỗ với lỗi kỹ năng. Lệnh này được phép đỏ trên bản chép; danh sách lỗi ghi vào báo cáo. Ba lỗi:
  - `[ĐI TỚI]` sang nơi khác mà chuỗi đích không khai `· cảnh cắt`;
  - cảnh cắt lại `[ĐI TỚI]` sang nơi thứ ba;
  - ngày thiếu `bắt đầu ở`.
- **Test:**
  - mỗi lỗi trên có một ví dụ;
  - vụ mẫu có một cảnh cắt và một đoạn "Đang ở <nơi>" có lựa chọn "Mở bản đồ".

### S10. Báo cáo cho đúng

- Bảng C2 trong báo cáo cũ ghi sai tên vụ ("Học bổng biến mất", "Điểm số ảo", "Máy chủ rò rỉ", "Bóng ma đồ án"). Các tên này không có trong nội dung. Mọi tên vụ trong báo cáo phải lấy đúng từ `lich.md`. Ghi rõ cách đếm từng cột C2: đếm dòng thoại nào, có tính phần mở đầu không.
- Đoạn trích Vụ 1 phải chép thật từ tệp đã xuất, không viết lại.
- Mọi con số trong báo cáo phải là đầu ra thật của lệnh, dán nguyên dòng cuối.

## Không làm

- Không sửa nội dung truyện để test xanh.
- Không làm màn chơi mới.
- Không động vào `prototype/.vite-canary/`. Chạy test xong mà thư mục này đổi thì khôi phục bằng `git checkout -- prototype/.vite-canary`.

## Nghiệm thu lần này

- [ ] S1–S9 và S11 đạt, mỗi mục có test hoặc kiểm được bằng lệnh.
- [ ] `npm run truyen-chu:mua1` chạy xong; thư mục `docs/mua-1/truyen-chu/` có đúng `README.md` cộng 5 vụ cộng 6 việc phụ, mỗi cái một tệp.
- [ ] Tám lệnh A6 cùng `kiem-ky-nang:mua1` như mốc: xanh, trừ lint (6 lỗi + 1 cảnh báo cũ) và `kiem-ky-nang:mua1` (được phép báo lỗi trên bản chép).
- [ ] `git diff --stat -- prototype/noi-dung-mvp prototype/src/content/generated/mvp` rỗng.
- [ ] Báo cáo: ghi đè `docs/mua-1/bao-cao/t0.md`, thêm mục "Lần sửa 1", liệt kê S1–S10 và việc đã làm cho từng mục.

Làm xong thì dừng.
