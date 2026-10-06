# B18. Thẻ nhân vật chỉ ghi điều đã biết; dàn chân dung lùi hàng sau

Ngày giao: 06/10/2026. Hai quyết định của user (nguyên văn, là định hướng, không phải câu chữ cuối):

> Thẻ nhân vật mới chỉ ghi thông tin đã biết, những cái chưa biết thì ? sau này hỏi thêm thì biết.
> Tối đa 3 chân dung: Ai đang trong chuỗi nói chuyện thì hiện, không thì lùi lại.

Đọc trước: `docs/mua-1/giao-viec.md` (A3 là quyết định user, không đổi), `docs/mua-1/ban-giao.md` mục 2 và 6, memory `gioi-thieu-nhan-vat-dung-trinh-tu.md` (ghi trong `docs/mua-1/ban-giao.md` nếu không có quyền đọc memory). Bộ MVP (`noi-dung-mvp/`, mặc định `?bo=mvp`) phải chạy y hệt trước: không khai gì mới thì mọi thứ như cũ.

## Phần 1. Thẻ "Nhân vật mới" và tab Nhân vật: ô chưa biết hiện "?"

Hiện trạng: `GioiThieuMvp.tsx` và `NhanVatMvp.tsx` in thẳng `hoTen`, `gioiThieu.danhXung`, `nam`, `nganh`, `lich`, `cauNoi` từ `nhan-vat.md`. Người xem ngoài (B16) chê: lúc Tùng mới xưng "Tớ là Tùng, học Du lịch" thẻ đã ghi "Trần Tùng", "Bạn cùng phòng 408".

Làm:

1. **nhan-vat.md** thêm dòng tùy chọn `- Biết lúc gặp: <danh sách>` với các trường: `họ tên`, `danh xưng`, `năm`, `ngành`, `lịch`, `câu nói`. Trường không liệt kê là **chưa biết** khi thẻ mở lần đầu. Không có dòng này → biết hết (bộ MVP và các nhân vật chưa khai giữ nguyên hành vi).
2. **kich-ban** thêm nút `- [BIẾT <mã> <trường>, <trường>]` (ví dụ `- [BIẾT tung họ tên]`), đặt ngay sau câu lời làm lộ điều đó. Máy đọc (`tools/noi-dung/doc-mvp.ts`), chuyển (`chuyen-mvp.ts`), kiểm (`luat-mvp.ts`): mã phải là nhân vật có thẻ giới thiệu, trường phải hợp lệ, trường đã có trong "Biết lúc gặp" thì báo lỗi (thừa), trường chưa biết mà cả bộ không có `[BIẾT]` nào mở thì **cảnh báo** (không lỗi).
3. **Engine** (`trang-thai.ts`, `may.ts`): trạng thái `bietVe?: Record<string, string[]>`; nút `biet` cộng trường vào; `khungNhin` không dừng ở nút này (chạy qua như `consequence`). Lưu và nạp ván giữ được. Hàm thuần `truongDaBiet(kb, s, nhanVat): Set<string>` để UI dùng (không có "Biết lúc gặp" → tất cả).
4. **UI**: `GioiThieuMvp.tsx` và `NhanVatMvp.tsx` nhận `bietVe`; ô chưa biết in dấu `?` (chip "Năm: ?", "Ngành: ?"); họ tên chưa biết → tiêu đề là `ten` ("Tùng") và một dòng "Họ tên: ?"; danh xưng chưa biết → "?"; lịch, câu nói chưa biết → ẩn hẳn (hai thứ này không có chỗ để "?"). Khi một trường vừa được biết lúc đang chơi: dùng kênh thông báo sẵn có của màn chơi (kiểu "Manh mối mới") để báo một dòng "Hồ sơ Tùng: biết thêm họ tên". Tìm kênh đó trong `ManChoiMvp.tsx`/`KhoMvp`; nếu không có kênh nào thì làm một dòng toast nhỏ góc trên, tự tắt sau 3 giây, không chặn thao tác.
5. **Nội dung Vụ 1** (chỉ `noi-dung-mua-1/`): khai "Biết lúc gặp" cho mọi nhân vật có thẻ, đúng với điều câu tự xưng (hoặc câu đầu họ nói) làm lộ; đặt `[BIẾT]` ở nơi lộ về sau. Gợi ý đã tra: Tùng xưng "Tớ là Tùng, học Du lịch" và "Tớ năm nhất thôi" ở sảnh KTX (00-mo-dau.md dòng ~71) nên biết tên, năm, ngành; "Bạn cùng phòng 408" biết khi về tới phòng; họ tên "Trần Tùng" lộ ở dòng kết quả lọc Ngày hội (SV240251) nếu dữ liệu có cột họ đệm, tự kiểm. Hà Vy "Tớ là Hà Vy, Toán ứng dụng" (dòng ~197). Duy "Anh là Duy, năm hai Hành chính học, ở CLB từ năm nhất" (dòng ~190). Hoài "Tớ là Hoài, lớp BC24A" (dòng ~221); họ tên "Lê Thu Hoài" lộ khi tra hai mã ngày 3 (`c-ten-h`, cột họ đệm + tên) → `[BIẾT hoai họ tên]` sau thử thách ấy. Minh Anh: thẻ mở ở Trung thu khi chị tự xưng; đọc lời để biết chị nói gì. Thầy Quang, cô Lan, cô Hạnh, bác Thịnh, chú Cường, bà trà đá, Quân: đọc câu đầu họ nói. Không sửa `loi/06-hop-va-ket.md` (người điều phối đang sửa tệp này).
6. Cập nhật `noi-dung-mua-1/README.md` (cú pháp mới) và chú thích đầu `nhan-vat.md`.

## Phần 2. Dàn chân dung: tối đa ba người hàng trước, người khác lùi hàng sau

Hiện trạng (`SanKhauMvp.tsx`, `danKe`): dàn tối đa 3 (`TOI_DA_TREN_DAN`), người thứ tư nói thì người nói lâu nhất **biến mất**. Ở buổi họp Hoài đang bị hỏi thì bị Minh Anh thay chỗ.

Làm:

1. `ManChoiMvp.tsx` tính `thamGia`: tập người **có lời trong chuỗi hiện tại** (`s.conTro.chuoi`, đọc `kb`, gồm cả lời trong phản hồi của `[HỎI]`/`[RẼ NHÁNH]`/`[ĐỐI CHẤT]` nếu lấy được dễ) cộng `vaoDan`, trừ `raDan`; truyền xuống `SanKhauMvp`.
2. `danKe` giữ hai hàng: **hàng trước** tối đa 3 = những người trong `thamGia` nói gần đây nhất (giữ nguyên quy tắc không xê dịch chỗ của người khác); **hàng sau** = người đang trên dàn mà (a) không thuộc `thamGia`, hoặc (b) thuộc `thamGia` nhưng bị đẩy khỏi hàng trước. Hàng sau tối đa 3, dư thì người cũ nhất rời hẳn. Người hàng sau mà nói lại thì lên hàng trước (đẩy người nói lâu nhất của hàng trước xuống). `[RA x]` rời hẳn như cũ; đổi cảnh xóa cả hai hàng.
3. Vẽ: hàng sau đứng lùi (scale khoảng 0,78, tối hơn khoảng 30%, z-index thấp hơn, dịch lên khoảng 4% để thấy "đứng sau"), đặt ở khe giữa hoặc hai mép theo số người, không che mặt hàng trước; có chuyển động mượt (transition transform/filter 300 ms). Màn dọc điện thoại (`.game--portrait` và `@media` màn hẹp, xem memory `dien-thoai-cam-doc`): hàng sau **ẩn** cho đỡ chật. `data-hang="truoc|sau"` trên `.cast-member` để test và CSS bám.
4. Chân dung hàng sau không nhép môi, biểu cảm giữ biểu cảm cuối.

## Nghiệm thu (tự chạy, ghi kết quả thật vào báo cáo)

- `npm run noi-dung:sinh:mua1`, `npm run kiem-noi-dung:mua1`, `npm run kiem-noi-dung:mvp` (0 lỗi), `npm run kiem-giong:mua1 -- --chi-loi` (0 lỗi).
- `npx tsc -p tsconfig.json --noEmit` sạch.
- Test mới: parser (`tools/noi-dung/*.test.ts` nếu có mẫu), engine (`src/mvp/engine/biet-ve.test.ts`: biết lúc gặp, `[BIẾT]`, lưu/nạp), UI (`GioiThieuMvp` in "?" và tên ngắn; `NhanVatMvp`; `SanKhauMvp` hai hàng: người thứ tư nói → người cũ xuống hàng sau chứ không mất; người hàng sau nói lại thì lên; đổi cảnh xóa). Chạy `npx vitest run --maxWorkers=1 src/mvp/engine src/mvp/ui src/mvp/store tools/noi-dung` và dán số tệp/số ca. Máy 16 GB RAM, người điều phối đang chạy trình duyệt nặng song song: **chỉ `--maxWorkers=1`**, không chạy cả `npm test`, không `npm install`.
- Chơi thử bằng máy: `src/mvp/engine/hoi-dap-vu-1.test.ts` vẫn qua ở cả ba cách chơi.

## Ràng buộc

- Chữ người chơi thấy: tiếng Việt có dấu, không gạch dài (—), không mũi tên.
- Không commit, không đổi nhánh, không `git stash`; người điều phối gộp và commit.
- Không sửa: `noi-dung-mua-1/loi/06-hop-va-ket.md`, `src/assets/**`, `docs/mua-1/ban-giao.md`.
- Báo cáo cuối: danh sách tệp đã sửa, số test, điều chưa làm được và vì sao, điều cần user quyết (nếu có).
