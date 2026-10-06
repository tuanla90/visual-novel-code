# Bàn giao việc mùa 1 cho phiên khác

> Cập nhật 05/10/2026, khoảng 16h30 (bản 9h30 đã cũ: Vụ 2 đã dựng lại xong, cách chia việc đã đổi).
>
> Phiên mới chỉ cần đọc tệp này rồi làm tiếp. Các quyết định user đã chốt nằm ở `docs/mua-1/giao-viec.md` mục A3, không được tự đổi.

## 1. Đọc trước

1. Memory: `lo-trinh-ky-nang-mua-1.md`, `giao-viec-codex-agy.md` (và các luật viết lời trong `MEMORY.md`).
2. `docs/mua-1/ke-hoach-10-vu.md`:
   - kế hoạch 10 vụ;
   - luật thời gian;
   - luật 7 "đứng nguyên chỗ";
   - người quen, ngày lễ.
3. `docs/mua-1/giao-viec.md`:
   - A3: quyết định đã chốt;
   - A4: kỹ năng theo vụ;
   - A5: cú pháp;
   - B4: gói đang làm;
   - C2: bảng đo độ dài;
   - E: truyện chữ.
4. `prototype/noi-dung-mua-1/README.md`: cú pháp nội dung; mục "Cú pháp đã chạy được sau A5" tả `[ĐI CÙNG]`, `Cột nộp`, `· cảnh cắt`, `· bắt đầu ở`, vụ sau nhiều ngày.
5. `docs/mua-1/brief/b4-4b-dan-y.md`: dàn ý Vụ 2 theo ngày. Dùng làm MẪU khi dựng dàn ý Vụ 4, 6, 8.

## 2. Trạng thái

- **Nhánh:** `claude/mua1-t0` (worktree `.claude/worktrees/mua1-t0`) và `claude/mua1-b44b` đang bằng nhau. Phiên trong app không Write/Edit được tệp ở worktree khác (lỗi EBADF), nên phiên 05/10 mở nhánh `claude/mua1-b44b` ngay trong worktree của phiên; đạt gói nào thì `git -C ../mua1-t0 merge --ff-only claude/mua1-b44b`.
- **`main`** = `e08c0a4` (đã push). Mọi thứ từ T1 trở đi **chưa gộp main, chưa push**. Gộp và push chỉ khi user bảo.
- **App chính vẫn là MVP.** Game chưa chơi được vụ nhiều ngày (`src/mvp/` chưa đọc các dòng `Ngày YYYY-MM-DD`). **Bản để user đọc** là truyện chữ `docs/mua-1/truyen-chu/`, xuất bằng `npm run truyen-chu:mua1`.

### Gói đã xong

| Gói | Nội dung |
|---|---|
| T0 | Tách bộ `noi-dung-mua-1`, lệnh `:mua1`, máy kiểm kỹ năng, công cụ truyện chữ |
| T1 | Cú pháp `[ĐI CÙNG]`; chặn `[RẼ NHÁNH]` giả; ngày thật cho ngày theo truyện |
| B4.1 → B4.3 | Vụ 1: bỏ `LIKE`/`IN`, Hoài xuất hiện sớm, hạn chót 30/09, hết lỗi đứng nguyên chỗ |
| B4.4a | Vụ 2: sáu màn tra chữ (bản đầu; đã đổi ở B4.4b) |
| T2 | Công cụ đỡ **vụ sau nhiều ngày**: kết vụ ở ngày cuối, hết cảnh đứng nguyên chỗ, chỉ đếm "!" trên tuyến chính, "Hết ngày" sang ngày thật kế tiếp |
| T3, T4 | Truyện chữ in `[ĐI CÙNG]`, `[RẼ NHÁNH]`, `[RẼ KẾT]` ở đúng chuỗi; "Quay lại" đúng ngày; mỗi đối chất một đoạn |
| **B4.4b** | **Vụ 2 dựng lại xong:** 5 ngày 08/10 → 15/10, 53 chuỗi, 8 màn tra, 3 đối chất, 346 dòng thoại (chuẩn C2 ≥ 300). Chờ user đọc `docs/mua-1/truyen-chu/vu-tin-don.md` |

### Quyết định user thêm ngày 05/10

- 15/10 là **Ngày truyền thống Hội Liên hiệp Thanh niên Việt Nam**, không phải ngày thành lập Hội Sinh viên (đã sửa kế hoạch). Hội Sinh viên trường tổ chức lễ.
- Hai tin trả lời trong Vụ 2 mang loại `TRA_LOI`, viết như người gõ trả lời (có chữ đằng trước), bắt bằng **chứa**.
- **Bài làm sạch (`LOWER`, `TRIM`) nằm ở sổ đặt phòng gõ tay** (bảng `dat_phong`), mã bẩn kiểu điện thoại viết hoa chữ đầu: "Xr-01" kèm dấu cách cuối. Dữ liệu bẩn phải trả lời được "ai gõ, bằng gì".
- **Gói B11 Người đi cùng** (ghi ở `giao-viec.md`): avatar góc phải, gợi ý viết sẵn hiện bằng bóng thoại, có mặt ở bản đồ, nhắc việc trước "Hết ngày", về sau có đoạn đi một mình. Chưa làm; còn ba điểm chưa chốt.

### Việc còn mở cần user biết

- Câu HOẶC của Quân ở Vụ 1 chỉ ra 32 dòng (bằng cả lớp) vì toàn trường chỉ có một bạn tên Hoài.
- Vụ 1 mới có 1 đối chất. Chuẩn C2 cần ≥ 3; chưa làm.
- Vụ 2, buổi giải trình: lời giữa hai nhịp (`tin-gt-giua`) giả định nhịp 1 đã trình đúng thẻ (cô Lan hỏi "cái máy văn phòng ấy"). Nếu người chơi hết lượt ở nhịp 1 thì đoạn này lệch. Cách sửa: tách chuỗi theo cờ `dc-tin-quan-may-du`.
- Lời Vụ 6 cũ (04/11) ghi Tùng "cá trật bốn lần", bằng số ở 14/10 của Vụ 2; gói làm lại Vụ 6 phải nâng số.
- Toàn bộ lời mới của Vụ 2 còn đánh dấu `(tạm)`, chờ user đọc.

### Trang đọc truyện (để user duyệt và góp ý)

- Trang: https://claude.ai/artifact/LNorSmaKFVyxPSXMFaY533 (riêng tư của user). Mỗi lần hiện một đoạn, nút rẽ ở cuối, cột "Đường đã đi" để quay lại, bấm "Góp ý" cạnh từng câu để ghi.
- Nguồn: `tools/doc-truyen/doc-truyen.html` (trang) và `tools/doc-truyen/sinh-du-lieu.py` (tách `docs/mua-1/truyen-chu/*.md` thành các tệp JSON dưới 40 KB; trạng thái "sẵn sàng / bản cũ" của từng vụ khai trong `DANH_SACH` của tệp này).
- **Sau mỗi lần đổi nội dung:** `npm run truyen-chu:mua1`, rồi `PYTHONIOENCODING=utf-8 python tools/doc-truyen/sinh-du-lieu.py <scratchpad>/doc-truyen`, rồi đăng lại bằng công cụ Artifact với `url` ở trên, `file_path` là tệp trang, `root` là `<scratchpad>/doc-truyen`, `files` là NGUYÊN danh sách máy ghi ra `<scratchpad>/doc-truyen/files.json` (dữ liệu trong `du-lieu/` và ảnh trong `anh/`; đừng gõ tay: 05/10 gõ thiếu một tệp làm Vụ 1 không mở được). Trang có nút "Xem ảnh nền của cảnh" và "Xem ảnh <mã>" cho ảnh CG, chibi, vật; ảnh chỉ tải khi bấm, chú thích ghi cả cỡ ảnh thật.
- **Số đoạn trên trang khác số trong tệp `.md`:** tệp `.md` đánh số theo lớp nên đọc bị nhảy cóc (1 → 10 → 24 → 54); `sinh-du-lieu.py` đánh lại theo thứ tự đọc (1, 2, 3, 4), số cũ giữ ở `soGoc`. Góp ý bám theo TÊN đoạn (`tieuDe`), số chỉ để hiện.
- **Vòng đời một góp ý** (`trangThai`): `moi` (user vừa ghi, hoặc bấm "Chưa ưng" rồi ghi thêm) → `da-sua` (Claude sửa xong, kèm `traLoi`) → `da-duyet` (user bấm "Ưng rồi"; trang ẩn đi nhưng KHÔNG xóa, để tra lại bài học). Chỉ xử lý mục `moi`.
- **Trả lời góp ý:** sửa xong mục nào thì `update` mục đó với `trangThai: "da-sua"` và `traLoi` (một, hai câu nói đã sửa thành gì); trang hiện nhãn "Đã sửa" kèm lời đáp.
- **Đọc góp ý của user:** công cụ ArtifactData, `action: "list"`, `collection: "gop-y"` với `url` trên. Mỗi mục có `vu`, `doan`, `tieuDe`, `trich` (câu được chọn), `ghiChu`. Xử lý xong mục nào thì hỏi user trước khi xóa.

## 3. Việc tiếp theo

**ĐANG CHẠY (05/10 tối): gói B12 cho Vụ 1, user giao "làm full chỉ Vụ 1".** Đề bài: `docs/mua-1/brief/b12-vu-1.md` (yêu cầu user, định dạng tờ dữ kiện JSON, luật chơi, luật máy kiểm, bảng cảnh). Màn thử làm đặc tả hành vi: `tools/thu-hoi-dap/` (trang đăng https://claude.ai/artifact/ToGtzTxe1qodiPn2NLzP1z). Dây chuyền:
1. Agent MÁY (đang chạy nền): bộ đọc `hoi-dap/*.json`, máy kiểm, máy chơi thuần trong `src/mvp/engine/`, tờ `n1-bac-thinh.json` + `chung.json`, test đo trên 70 câu thử. Không làm giao diện.
2. Agent NỘI DUNG (đang chạy nền, chỉ ghi vào `docs/mua-1/hoi-dap-nhap/` và cuối `nen-loi/persona.md`): persona 7 nhân chứng, tờ dữ kiện cho 10 cảnh còn lại của Vụ 1.
3. Sau khi agent MÁY xong: agent GIAO DIỆN (màn hỏi đáp trong `ManChoiMvp`, ba cách chơi, sổ "Cần làm rõ", bóng gợi ý, bỏ nháy chi tiết ẩn, bạn đi cùng trả lời "việc chính", "gợi ý" bằng lời viết sẵn).
4. Người điều phối: soát tờ dữ kiện nháp theo canon rồi chuyển vào `noi-dung-mua-1/hoi-dap/`, chạy đủ lệnh kiểm, chơi Vụ 1 từ đầu tới kết trên trình duyệt với `?bo=mua-1` như người chơi, rồi mới báo user.
Lưu ý: trong lúc agent đang sửa cây làm việc, commit từng tệp cụ thể, đừng `git add -A`.

**User đã chơi thử và TRẢ LẠI phần điều hướng (05/10 đêm) → gói B13 đang chạy nền.** Đề bài: `docs/mua-1/brief/b13-dieu-huong-tu-do.md`. Ý user: nút một đường ("Xuống xe") thì tự động; nói chuyện xong ở một nơi thì ở lại nơi đó, không tự về bản đồ; màn tra lùi được về bảng thông tin rồi về phòng CLB; người chơi tự do đi đâu thì đi. Khi agent xong: tự chạy lại lệnh kiểm, rồi CHƠI TAY trên trình duyệt đúng ba luồng user nêu (mở đầu tới sảnh; ngày 2 bản đồ tới cô Hạnh rồi xem chi tiết ẩn; ngày 2 laptop vào màn tra rồi lùi ra) trước khi báo.

**06/10 ~13h (user chơi thử trên Railway):** biến Railway `VITE_BO_NOI_DUNG` phải là chuỗi `mua-1` (user đặt `1` nên vẫn ra bộ MVP, không có hai câu hỏi); đổi xong phải redeploy vì biến `VITE_…` nhúng lúc build. User muốn nút "Tiếp tục" không chiếm một góc màn hình và bỏ nút "Hồ sơ" dưới khung (HUD đã có): `DialogBox` có prop `nutTiepTrongKhung` (MVP bật), nút thành tam giác nhỏ + chữ "Tiếp tục" ở góc phải dưới TRONG khung (`.dialog__tiep`, nhấp nháy khi chữ hiện hết), dùng chung điện thoại và máy tính; prototype cũ không đổi. Đã xem ở 1280×800 và 812×375. Vẽ nốt hai ảnh: `bg-mvp-phong-hop` có người ngồi hai bên (nhìn từ sau/nghiêng, không trùng dàn chân dung) và `cg-huy-hieu-sang-som` (cận huy hiệu sứt trên quai balo, nhìn từ chốt bảo vệ 6h45, chèn sau `cg-bong-huy-hieu` ở n5-chu-cuong).

**06/10 ~12h: SÁU QUYẾT ĐỊNH CỦA USER ĐÃ LÀM (gói B18 + ảnh), commit trên `claude/mua1-b44b`, gộp `main` và push ngay sau khi cả bộ `npm test` + `npm run build` qua.** User quyết (06/10 trưa): (1) thẻ "Nhân vật mới" chỉ ghi điều đã biết, ô chưa biết hiện "?", biết thêm thì điền; (2) ảnh tông hài ở cảnh nghiêm: gỡ bớt, tìm chỗ chèn sau (đã gỡ `cg-nghi-di-tung-ha-vy`, `cg-reo-ho-manh-moi`, `cg-quan-bi-bac` khỏi kịch bản, tệp ảnh và chú thích trong `AnhChenMvp.tsx` vẫn giữ); (3) buổi họp: thầy báo trước phần giữ phòng, chi tiết khác kiểm tra rồi gửi văn bản sau, gợi ý kín thầy cũng không muốn CLB đóng cửa (lời `ket-that.1a` và `ket-thuong.1`; câu khóa "Chưa thu phòng ngay." phải còn vì máy kiểm giọng bắt); (4) phòng CLB vẽ lại dùng laptop (năm nền `bg-mvp-phong-clb*`, nhãn "Duy: laptop"); (5) dàn tối đa ba chân dung: ai trong chuỗi nói chuyện thì hàng trước, không thì lùi hàng sau (mờ, nhỏ, không mất); (6) cho phép vẽ ảnh.
- Gói B18 (`docs/mua-1/brief/b18-the-nhan-vat-dan-lui.md`): cú pháp `- Biết lúc gặp:` trong `nhan-vat.md` và `- [BIẾT <mã> <trường>…]` trong kịch bản (README mục 17, 18); trạng thái `bietVe`; toast "Hồ sơ X: biết thêm …". Máy kiểm còn 7 cảnh báo ô chưa có chỗ lộ trong Vụ 1 (Hà Vy họ tên + lịch; Minh Anh họ tên, năm, ngành; Duy họ tên; Hoài lịch; Nam lịch + câu nói; Khánh câu nói; bà trà đá lịch): hoặc viết câu lộ ở vụ sau rồi đặt [BIẾT], hoặc chấp nhận "?" mãi. Agent tự quyết, user nên duyệt: Tùng biết "Bạn cùng phòng 408" ngay lúc gặp; Hà Vy và Hoài biết "năm" ngay lúc gặp; Hiếu biết họ tên + lớp từ kết quả `c-ten-h`. [BIẾT] trong khối lời bị buổi hỏi thay vẫn ghi dù người chơi rời sớm.
- Ảnh (Topview, Credit Mode, 14 ảnh; bảng ghi credit trừ 0, đối chiếu số dư: 337,34 trước lô): năm nền phòng CLB có laptop (viền bấm `vien-ngoi-*` vẫn khớp, đã chồng kiểm), bàn Thám Tử ở Ngày hội có laptop, sân Trung thu có người ở xa, `intro-tung`/`intro-hoai` nền trung tính (hết hộp thư xanh sau lưng Hoài), lá thư có vạch đen che tên + chữ ký "H" + dòng chữ bị xén, bốn CG mới: `cg-khe-hop-the-lich` (n1-hop), `cg-be-na-den-ca-chep` (md-10-doan-dung, lời tách .1a/.1b), `cg-so-clb-giay-gap-tu` (ket-that-clb), `cg-tu-ho-so-ngan-duoi` (md-11-tu). Gốc PNG: `art/nguon/topview-2026-10-06/`, lời nhắc: `art/prompts/mua-1-hang-doi-2026-10-06.json`. Chưa vẽ: phòng họp có người (đụng dàn chân dung), cận huy hiệu bánh răng sứt.
- Đã chơi tay trên bản xem thử: thẻ Tùng ở sảnh KTX ("Tùng", "Họ tên: ?", nền mới), phòng CLB ngày 23/09 nền laptop, buổi họp: Quân lùi hàng sau khi Hà Vy nói, Hoài giữ hàng trước. Chưa xem màn dọc (hàng sau ẩn theo CSS, có test).
- Còn nợ máy (không đổi): khung hỏi che chân dung nhân chứng, biểu cảm nhân chứng neutral, chữ "Hà Vy quan sát" khó đọc, cô Hạnh bị cắt đỉnh đầu khi ba người, Tùng xin lỗi Hoài mất ở cách bấm. Còn chờ user: mở đầu 135 bước, ba ảnh hài tìm chỗ chèn khác.

**06/10 ~10h40: `main` = 3114983 (đã push)**, thêm sau d735da7: [VÀO x] đưa người chưa nói lên hình, người được soi lên hình, thẻ nhân chứng không xưng tên bật khi mở khung hỏi, gỡ nhắc việc khi hết ngày, và vòng 2 "quay ván + người xem ngoài" (khoảng hai mươi câu lời, dàn dựng, tách khối để lời còn ở cách bấm / gõ). Vòng 3 chưa chạy: nhận xét còn lại chủ yếu là ẢNH CẦN VẼ và CẤU TRÚC để user quyết (danh sách gộp hai vòng nằm trong báo cáo agent B16 vòng 2; tóm tắt bên dưới). Việc máy còn nợ sau vòng 2: khung hỏi che gần hết chân dung nhân chứng, biểu cảm nhân chứng luôn neutral; chữ "Hà Vy quan sát" trắng trên tóc sáng; cô Hạnh bị cắt đỉnh đầu khi dàn ba người; lời Tùng xin lỗi chuyện Hoài ở ket-tra-da.1c mất ở cách bấm.

**06/10 ~09h30: ĐÃ GỘP `main` VÀ PUSH (d735da7)** gồm B12–B17 (B17 = hai câu hỏi đầu ván: mức nhập vai, mức SQL). Cả bộ `npm test` (156 tệp, 1403 ca) và `npm run build` qua trước khi gộp. Railway dựng từ `main`; chơi Vụ 1 ở `<url>/?bo=mua-1`. Việc còn lại sau push: vòng 2 "quay ván + người xem ngoài", việc máy còn nợ (dưới), ảnh cần làm, điều để user quyết.

**TÌNH TRẠNG SÁNG 06/10 (commit e7d51f8):** B14 (màn tra), B15 (hết ngày do người chơi bấm, ghim vào lại, ngày 3 tách ba ghim, màn tra nhận câu hẹp mà đủ, đóng thẻ giới thiệu đi tiếp), B16 (lời và dàn dựng sửa theo nhận xét của GPT và Gemini sau khi xem ván quay) đều đã commit trên `claude/mua1-b44b` (ff sang `claude/mua1-t0`). CHƯA gộp `main`, CHƯA push. User (06/10 sáng) muốn: hai câu hỏi đầu ván về mức nhập vai và mức SQL (gói B17, `docs/mua-1/brief/b17-hai-cau-hoi-dau-van.md`, đang chạy), rồi commit, gộp `main`, push để chơi Vụ 1 trên Railway (`<url>/?bo=mua-1`). Trước khi gộp main: chạy cả bộ `npm test` và `npm run build`.
- Đã chơi tay sau B15: ngày 2 giải c-lop xong ở lại phòng CLB, nút "Về phòng KTX ăn tối" góc trái dưới, "Về bản đồ" góc phải; bản đồ ghim "đã ghé, vào lại được"; bấm hết ngày thì vào cảnh tối. Lỗi nhỏ thấy: ô nhắc việc còn giữ câu "Việc chính hôm nay xong rồi…" của Hà Vy suốt cảnh tối (nên gỡ khi chuỗi tối bắt đầu).
- Công cụ xem ván và nhận xét: `tools/quay-van/` (xem memory `quay-van-nguoi-xem-ngoai.md`). Vòng 1 đã chạy; kết quả và danh sách "ảnh cần làm", "cấu trúc để user quyết" nằm trong báo cáo B16 (tóm tắt ở mục dưới). Vòng 2 chưa chạy.
- Việc máy còn nợ từ báo cáo B16: lệnh đưa người CHƯA nói lên dàn (`[VÀO x]` hiện chỉ gỡ `[RA x]`): Hà Vy lúc được chào, Quân lúc bị soi, Hoài lúc "được gọi vào"; thẻ "Nhân vật mới" của người "Không xưng tên" (cô Hạnh, cô Lan, bà trà đá) nên bật khi mở khung hỏi lần đầu; khung hỏi che gần hết chân dung nhân chứng, biểu cảm nhân chứng luôn neutral; "Chọn là chốt — không quay lại được." còn gạch dài ở `ManChoiMvp.tsx`; dàn tối đa ba người làm Hoài bị Minh Anh thay chỗ ở buổi họp.
- Ảnh cần làm (mức cao, từ B16): bé Na cạnh đèn cá chép; lá thư có chữ ký tay và chân trang bị xén; cận mẩu thẻ lịch ở khe hộp; mẩu giấy gấp tư ở sổ CLB; sân Trung thu có người; laptop trên bàn phòng CLB; thẻ "Nhân vật mới" nền trung tính; phượng nở cuối tháng Chín ở nền phòng CLB và sảnh tòa B.
- Cấu trúc để user quyết (từ B16): mở đầu 135 bước chưa có lá thư; thẻ "Nhân vật mới" lộ họ tên, ngành, vai; tông ảnh chèn ở cảnh nghiêm (chữ thoại chế); nhịp cảnh tối thứ Sáu và lời cô Hạnh dài; thẻ chữ đúc kết giọng bài học; căn cứ Hà Vy đoán ngành (phiếu đăng ký trong túi áo); laptop hay máy bàn; dàn tối đa ba chân dung.

**B13 XONG (05/10, 23h), commit 491cbff.** Điều hướng tự do cho bộ mùa 1 (cờ `dieuHuongTuDo`): `[ĐI CÙNG]` tự đi; xong việc ở một nơi thì ở lại, có nút "Về bản đồ" / "Đi tiếp" (góc phải dưới); màn tra lùi về bảng điều tra rồi về cảnh, câu đang soạn giữ nguyên. Người điều phối đã chơi tay: mở đầu (xe buýt tới sảnh KTX), ngày 2 bản đồ → Phòng Đào tạo → cô Hạnh → về bản đồ → sảnh tòa B → bác Thịnh → ở lại cảnh → về bản đồ → phòng CLB → Duy → màn tra `c-bang-lop` → bảng điều tra → phòng CLB → vào lại, bảng đã chọn còn. Cùng commit: khung hỏi nhân chứng mở ở MỌI cách chơi, đổi cách chỉ đổi thiết lập, "xem cả đoạn" chạy khi bấm "Nghe … kể" (user bấm nhầm "Xem cả đoạn" rồi không còn chỗ đổi lại).
- Chưa chơi tay: ngày 3, 4, 5, buổi họp, lưu và nạp giữa chừng, nút Lùi của HUD sau khi rời cảnh, màn điện thoại dọc.
- Thấy khi chơi tay, đưa vào gói B15: ghim "đã ghé" bị khóa không vào lại được; ô nhắc việc giữ câu cũ sau khi xong việc ở một nơi; máy tự sang ngày khi việc chính xong.
- Lạ, chưa tra: lần đầu vào phòng CLB ngày 2 ảnh phòng không có người ngồi (chỉ có nhãn tên), lùi từ bảng điều tra về thì đủ người; ở sảnh tòa B (cảnh khám phá) không thấy khung "Đi cùng".

**ĐANG CHẠY (05/10, 23h): gói B14 màn tra** (`docs/mua-1/brief/b14-man-tra.md`, sáu góp ý của user ở `c-ten-h`). **XẾP HÀNG: gói B15** (`docs/mua-1/brief/b15-het-ngay-va-quay-lai.md`): người chơi tự bấm hết ngày, nơi đã ghé vào lại được, ngày 3 không kéo liền ba nơi.

**B12 CHƠI ĐƯỢC (05/10 đêm), chờ user chơi thử.** Chạy: `npm run dev` ở `prototype/` của worktree này rồi mở `http://localhost:5173/?bo=mua-1` (thêm `&facilitator=1` để có bảng nhảy tới từng ngày; đã thử, dùng được với bộ mùa 1). Cấu hình xem trước của Claude: `b12-dev` (cổng 5174) trong `.claude/launch.json`.
- Đã nghiệm thu: giao diện màn hỏi đáp (agent), test máy tự chơi hết Vụ 1 mùa 1 ở cả ba cách chơi tới kết thật (`src/mvp/engine/hoi-dap-vu-1.test.ts`), kiểm nội dung không lỗi, giọng 0 lỗi, tsc sạch.
- Người điều phối đã chơi tay trên trình duyệt CHỈ cảnh bác Thịnh ngày 1 (gõ, bấm, xem cả đoạn, gợi ý, hỏi mở, rời sớm bị giữ, quay lại hỏi tiếp, thẻ Tòa B mở) và chat bạn đi cùng ở cảnh khám phá ("làm gì tiếp", "gợi ý đi"). CHƯA chơi tay: mười cảnh hỏi đáp còn lại, giới hạn lượt và từ chối, màn điện thoại dọc, tờ "Lời …" trên bảng hồ sơ.
- Lỗi nhỏ đã thấy, chưa sửa: gõ lời chào để đi rồi "Vẫn đi" thì có thêm câu "Bọn cháu cảm ơn bác ạ." (hai câu chào liền); khung nhật ký hỏi đáp thấp, chỉ thấy hai ba câu; ở cách bấm/gõ một số chuỗi mất vài câu cốt truyện nằm chung đoạn lời với dữ kiện (n3-ctsv: Tùng cá giờ đi đường và câu tự xưng của Quân; ket-tra-da: Tùng xin lỗi chuyện nghi oan Hoài; n4-ctsv-vao: câu Tùng cá trượt; n3-cang-tin: câu lộ tên Hiếu) — muốn giữ phải tách đoạn trong `loi/`.
- Chưa làm: đưa lời các tờ dữ kiện lên trang đọc cho user duyệt; truyện chữ chưa in cảnh hỏi đáp; đo máy xếp câu hỏi cho từng nhân chứng (mới đo bác Thịnh).

**Tiến độ B12 (05/10 đêm):** agent MÁY xong, đã nghiệm thu và commit (11 tờ hỏi đáp trong `noi-dung-mua-1/hoi-dap/`, đánh dấu `- [HỎI ĐÁP <mã>]` trong khung; kiểm nội dung không lỗi, giọng 0 lỗi, test liên quan qua, tsc sạch; đo 70 câu thử: 62/70, hỏi trúng 30/31, trả nhầm dữ kiện 6). Agent GIAO DIỆN đang chạy nền (màn hỏi đáp, `loiDaThay` cho ba chuỗi có lời ngắt quãng, bỏ nháy chi tiết ẩn, bạn đi cùng trả lời "việc chính", "gợi ý"). CHƯA chơi thử trên trình duyệt; mặc định cách gõ nên `?bo=mua-1` chưa chơi qua được các cảnh hỏi đáp cho tới khi giao diện xong. Việc còn lại của người điều phối: nghiệm thu giao diện, chơi Vụ 1 từ đầu tới kết như người chơi, soát lời các tờ theo canon, cho truyện chữ in được cảnh hỏi đáp.

**Agent nội dung đã xong (05/10 tối):** 10 tờ nháp ở `docs/mua-1/hoi-dap-nhap/` (tự kiểm 0 lỗi bằng `tu-kiem.py`), persona 7 nhân chứng ở cuối `nen-loi/persona.md`. Chưa chuyển vào `noi-dung-mua-1/hoi-dap/`, chưa thêm dòng đánh dấu vào `kich-ban/`. Nó báo các chỗ truyện mâu thuẫn, CHỜ USER QUYẾT, chưa sửa:
1. Bác Thịnh có mặt ở sảnh tòa B chiều Chủ nhật 08/09 (md-03-toa-b.2), trong khi thẻ nhân vật và n2-bd-toa-b.1 nói Chủ nhật bác chỉ ghé buổi tối.
2. n2-bd-toa-b.1 nói Chủ nhật bác "chỉ ghé để khóa cửa", bỏ mất việc giữ sổ ký phòng máy (có ở thẻ, n3-bd-phong-may.1, n4-phong-may.2).
3. n3-bd-phong-may.1 không nói tối Chủ nhật phòng máy mở tới mấy giờ; thư in lúc 23:10 dễ bị đọc là ngoài giờ.
4. n3-bd-toa-b-an.1: người chơi nghĩ "Bác Thịnh…" khi chưa ai gọi tên bác (lần đầu là cô Hạnh ở n4-phong-may.2).
5. Chú Cường: thẻ ghi lịch ca tối nhưng sáng 28/09 chú ở cổng; thẻ nói chú biết mặt gần hết sinh viên trong khu mà không nhận ra Hoài.
6. Bà bán trà đá ở Vụ 2 (loi/10-vu-2-tin-don.md khoảng dòng 193) kể "cậu trà nóng" như lần đầu, trùng kết thật Vụ 1.
7. Bà bán hàng "hai chục năm" so với tuổi thầy Quang (cậu trà nóng thời sinh viên, nay là phó hiệu trưởng tóc muối tiêu).
8. n2-bd-toa-b.1 nói thư viện đóng 23 giờ, thẻ Nam ghi Nam ở thư viện tới 23:15.
Còn hai điểm thiết kế: (a) một manh mối phủ nhiều dòng danh sách nhưng chỉ gắn vào một dòng (clue-quyen-du-lieu, clue-loi-chu-cuong); (b) hai `canCo` ở n3-ctsv và n4-ctsv-vao gần như không bao giờ bật vì người chơi luôn có đủ giấy từ hôm trước.

**Đang làm (05/10 tối): bộ nền lời.** User muốn chốt văn hóa, persona, bối cảnh, cảm xúc, mục tiêu trước khi máy viết lời (xem `prototype/noi-dung-mua-1/nen-loi/README.md`). Bản đầu đã ở trang đọc, nhóm "Nền lời"; user duyệt theo thứ tự văn hóa, persona, thẻ cảnh. Chưa duyệt xong thì chưa viết lại lời theo thẻ, và chưa bắt đầu Vụ 4. Việc kế sau khi user duyệt: dựng công cụ ghép đề bài và bước model soát trích mã mục, chạy thử trên đoạn Vụ 1 từ Trung thu tới 24/09, đếm số góp ý trên 100 câu. Cùng ngày: đã bỏ mọi màn người chơi tự soi trước bài dạy của Hà Vy ở Trung thu.

1. **Chờ user đọc truyện chữ Vụ 2** và góp ý. Sửa theo góp ý trước khi sang vụ khác.
2. **Vụ 4** (Nam ở đâu lúc 22:40, từ Vụ 3 cũ), **Vụ 6** (Giúp Nam, từ Vụ 4 cũ), **Vụ 8** (Sổ quỹ, từ Vụ 5 cũ), theo `giao-viec.md` B4. Mỗi vụ đi đúng dây chuyền đã chạy được ở Vụ 2 (mục 4).
3. Lời gợi ý, lời bàn ở bản đồ, lời nhắc cuối ngày của người đi cùng (gói B11) cho Vụ 2, nếu user chốt làm.
4. Rồi tới B5 trở đi (vụ thường mới, ngày lễ, người quen).

**Đo** một vụ (trong `prototype/noi-dung-mua-1/`), ví dụ Vụ 2:

```bash
grep -cE '^- (\*\*|Khi )' loi/10-vu-2-tin-don.md loi/tt-tin-don.md
```

Cộng hai số lại. Lời của thẻ trong `tt-*.md` có dạng `- Khi …: **ai**` và C2 tính cả các dòng này (05/10: Vụ 2 = 309 + 37 = 346).

```bash
grep -c '^### ' kich-ban/10-vu-2-tin-don.md
```

## 4. Dây chuyền một vụ (đã chạy được ở Vụ 2, 05/10)

Mỗi lúc **một** agent (máy 16 GB). Người điều phối (Claude) viết brief, tự nghiệm thu, tự commit.

| Bước | Ai | Việc | Ghi chú |
|---|---|---|---|
| 1. Khung | Agent Claude Opus | Dàn ý theo ngày (`docs/mua-1/brief/<vụ>-dan-y.md`), `lich.md`, `kich-ban/`, màn tra + dữ liệu, ba `[ĐỐI CHẤT]` viết đủ, khối lời giữ chỗ có chú thích `<!-- DÀN Ý … -->` | Gemini hỏng hai lần ở việc này (lựa chọn giả, co vụ). Công cụ chặn thì DỪNG, báo file:dòng |
| 2. Công cụ | Codex `gpt-6-sol` | Sửa `tools/`, thêm test | Sandbox của Codex không chạy được vitest (`spawn EPERM`): người giao tự chạy |
| 3. Lời | Gemini qua `agy`, mỗi lượt 40–50 dòng | Chỉ viết vào các khối `## <mã>` của `loi/<vụ>.md` theo dàn ý trong chú thích | Không được đụng `kich-ban/`, dữ liệu, công cụ |
| 4. Gọt | Claude điều phối | Đọc từng dòng mới, viết lại câu hỏng, chạy máy kiểm, commit | Lượt 1–2 gọt khoảng hai phần ba số câu; lượt 3–4 viết lại gần hết |

Lệnh Codex (chạy nền ở gốc worktree):

```bash
codex exec -m gpt-6-sol -c model_reasoning_effort="high" -s workspace-write -C . --skip-git-repo-check -o <scratchpad>/bao-cao.md - < <scratchpad>/brief.md > <scratchpad>/log 2>&1
```

Lệnh Gemini (chạy nền ở gốc worktree; brief là một tệp trong scratchpad):

```bash
agy --print="Đọc tệp <scratchpad>/luot-loi-N.md và làm đúng theo đó. Chỉ sửa tệp lời được nêu trong tệp ấy. Không commit." --model gemini-3.1-pro-high --mode accept-edits --dangerously-skip-permissions --add-dir <scratchpad> --print-timeout 3600s > <scratchpad>/luotN.log 2>&1
```

**Brief lượt lời phải có** (ý chính):

> Chỉ sửa các khối được liệt kê (bảng mã khối + số dòng nhắm tới); giữ nguyên dòng `## <mã>`, chú thích `<!-- DÀN Ý … -->`, dòng `[THẺ CHỮ]`, chú thích `<!-- Ngày … -->`, kiểu xuống dòng LF. Mỗi dòng mới kết bằng `(tạm)`. Không thêm dữ kiện, tên, số, ngày giờ ngoài dàn ý; điều "Cấm lộ" không xuất hiện. Show don't tell. Câu ngắn giọng sinh viên miền Bắc; câu quá 25 chữ thì tách. Xưng hô theo `luat-giong.md`. Hà Vy, Minh Anh, Tùng không nói thuật ngữ SQL hay thao tác máy; không ai đọc ra đáp án màn tra. Biểu cảm chỉ loại có trong `nhan-vat.md`. Lời chỉ nhắc thứ có trên ảnh nền. Người kể chỉ tả điều nhìn thấy, không kể hộ lời nhân vật, không xưng "tôi", không gọi nhân vật là "cậu ấy". Không câu đệm, không thành ngữ sách vở, không ai tự tả cách nói của mình. Lời tự nghĩ và lời nhắc việc của người chơi là câu tự hỏi như người thật ("Không biết ký túc xá ở chỗ nào nhỉ?"), không thuật lại giấy tờ ghi gì, thiếu gì; lời dẫn không nói điều hiển nhiên, không sai với đời thật; điều đã nói (số phòng, tên, giờ) không nhắc lại (user 05/10, `giong/README.md` mục "Tự vấn và lời dẫn"). Trò đùa chạy dài dùng đúng số dàn ý ghi. Chạy từng lệnh ở chế độ thường trong `prototype/`: `npm run noi-dung:sinh:mua1`; `npm run kiem-noi-dung:mua1` (không lỗi); `npm run kiem-giong:mua1 -- --chi-loi` (0 lỗi); `npm run truyen-chu:mua1`. KHÔNG commit, push, `npm install`, `npm test`; không để tệp nháp. Cuối cùng in số đo trước/sau, số dòng từng khối, dòng cuối từng lệnh.

## 5. Nghiệm thu (tự kiểm, không tin báo cáo Gemini)

1. `git status --short`: xóa tệp nháp Gemini để lại.
2. Chạy lại mọi lệnh ở luật chung tại worktree.
3. **Đo số dòng tự tay.** Đừng tin con số trong báo cáo.
4. Đọc diff lời thoại, TỪNG dòng mới (`git diff -U0 -- loi/<tệp>`; dòng bị xóa chỉ được là dòng giữ chỗ). Soi:
   - lựa chọn giả;
   - biểu cảm lạ;
   - số dòng nói trong lời không khớp kết quả chạy;
   - câu cũ còn nhắc số cũ.
5. `npm run typecheck`. Đọc output, không tin exit code.
6. Lint: `main` có mốc **8 lỗi + 1 cảnh báo**, không được thêm.
7. `git diff --stat -- prototype/noi-dung-mvp prototype/src/content/generated/mvp` phải rỗng.
8. Chỉ commit khi `kiem-noi-dung` "không lỗi", `kiem-giong` "0 lỗi" và vitest xanh SAU lần sửa cuối của chính mình (05/10 đã commit nhầm một lỗi giọng do tự gọt rồi không chạy lại). Đạt thì `git checkout -- prototype/.vite-canary`, rồi commit trên `claude/mua1-t0`. Commit kết thúc bằng dòng `Co-Authored-By` theo quy ước phiên.
9. Trước khi gộp `main`: chạy `npm test` toàn bộ (khoảng 5 phút, chạy một mình). Gộp bằng cách merge `main` vào nhánh rồi fast-forward `main`.

## 6. Bẫy đã gặp

- **Gemini hay:**
  - lách máy kiểm (đổi `[ĐI TỚI]` thành `[RẼ NHÁNH]` hai lựa chọn cùng đích);
  - cắt bớt nội dung khi giao việc lớn;
  - báo sai số liệu;
  - để tệp nháp;
  - để lỗi lint `any`, lỗi typecheck;
  - chạy lệnh nền rồi thoát giữa chừng;
  - đôi khi tự `commit`.
- **Gemini ở lượt lời (05/10):** đổi cả tệp sang CRLF; xóa chú thích `<!-- Ngày … -->`; để lại `replace.py` ở gốc repo; người kể xưng "tôi"; chữ miền Nam ("tùm lum"); cho nhân vật bịa dữ kiện ("anh ấy ở xưởng giờ đó"); thành ngữ sách vở.
- **Mã dòng trong lời:** máy trộn thêm dòng nền rồi **đánh lại mã** (ví dụ `tin_nhan` thêm 330 tin, mã `T-…` đánh lại theo giờ). Lời không được gọi tên mã dòng của dữ liệu viết tay; tả bằng nội dung.
- **SQLite (thêm):** `LIKE` không phân biệt hoa thường với chữ ASCII và `LOWER` chỉ đổi chữ ASCII. Bài làm sạch chỉ "cần thật" khi so bằng, và mã bẩn chỉ dùng chữ không dấu.
- **agy xong việc mà không thoát.** Kiểm `Get-Process agy`; tiến trình bắt đầu hôm nay thì `Stop-Process -Force`. PID 31712 (từ 03/10) không phải của phiên này, để nguyên. Có một mục PID 43072 là bóng ma, `taskkill` báo không tồn tại, bỏ qua.
- **Đứt mạng giữa chừng:** giao lại lượt với câu "làm nốt, giữ phần đã viết", kèm danh sách lỗi đã đo.
- **Ghi tệp trong worktree khác:** Write/Edit bị chặn. Dùng Python hoặc sed qua Bash. Python trên Windows: `PYTHONIOENCODING=utf-8`, mở tệp với `newline=''` để không đổi CRLF.
- **SQLite:** `LIKE` không phân biệt hoa thường với chữ ASCII; không có `ROUND(x, -3)` (dùng `ROUND(x / 1000.0) * 1000`); chia số nguyên ra số nguyên.

## 7. Sổ canh đêm 05/10 (tóm tắt)

| Lượt | Việc | Kết quả | Commit |
|---|---|---|---|
| 1 | T0 R3+R5 | đạt (Claude sửa 5 lỗi lint) | 02d91c2 |
| 2, 2b | T0 R1 (Hết ngày) | lần 1 trả lại; lần 2 đạt, Claude sửa lỗi tsc | a36bf65 |
| 3 | T0 R4 (Đang ở, bản đồ ngày) | đạt | d8e6a16 |
| 4, 4b | T0 S12 (Cột nộp) | đạt; test đủ 133 tệp / 1117 test | a118830 |
| 5 | B4.1 | đạt, Claude sửa 4 câu sót số cũ | c159bfe |
| 6, 6b | B4.2 | đạt (một lần đứt mạng, một lần agy treo) | b05764c |
| 7 | B4.3 | trả lại phần kịch bản (lựa chọn giả), giữ lịch | 6756c79 |
| 9 | T1 | đạt 54/54 | 34ea8f5 |
| 10 | B4.3 làm lại | đạt sau khi Claude sửa máy kiểm và 2 nút cảnh kết | dc992d1 |
| 11 | B4.4a | đạt | 0f2d60b |
| 12 | B4.4b một lượt | trả lại, bỏ hết (Vụ 2 co còn 31 dòng) | – |
| 13 | B4.4b lượt 1 | user tạm dừng trước khi sửa gì | – |

### Sổ canh ngày 05/10 (tóm tắt)

| Lượt | Ai | Việc | Kết quả | Commit |
|---|---|---|---|---|
| 1 | Claude Opus | Khung Vụ 2 lần 1: dàn ý, đổi mã vụ, sửa 5 lỗi đứng nguyên chỗ | đạt; dừng đúng luật vì công cụ chưa đỡ vụ nhiều ngày | 554b02a … 4890857 |
| 2 | Codex | T2 công cụ vụ nhiều ngày | đạt, 15 test mới | cab48bb |
| 3 | Claude Opus | Khung lần 2: dựng 5 ngày, 3 đối chất, 30 khối giữ chỗ, đổi màn tra theo user | đạt | d711435 … f2908db |
| 4 | Gemini | Lời lượt 1 (9 khối, 50 dòng) | đạt sau gọt 34 câu | 7e78f74 |
| 5 | Codex | T3 truyện chữ in `[ĐI CÙNG]` đúng chuỗi | đạt | b8b0a03 |
| 6 | Gemini | Lời lượt 2 (10 khối, 49 dòng) | đạt sau gọt 45 câu, trả lại LF | b9e7d0c, 5198e39 |
| 7 | Gemini | Lời lượt 3 (7 khối, 42 dòng) | đạt sau khi viết lại 6 khối | adff8ec |
| 8 | Gemini | Lời lượt 4 (4 khối, 40 dòng) | đạt sau khi viết lại cả 4 khối; kèm gọt lời thẻ | 01f21b9 |
| 9 | Codex, rồi Claude Opus | T4 liên kết truyện chữ (Codex hết hạn mức giữa chừng, Opus làm nốt) | đạt, vitest 79/79 | b2ec456 |

## 8. Báo cáo cho user

Viết tiếng Việt, ngắn, không thuật ngữ thừa. Nói rõ:
- đã kiểm gì và kết quả;
- trả lại gì, vì sao;
- việc gì cần user quyết.
