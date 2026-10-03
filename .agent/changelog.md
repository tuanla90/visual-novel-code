# Nhật Ký Thay Đổi (.agent/changelog.md)

## [2026-10-04] Mở Rộng Dữ Liệu Thực Tế: Sổ Chi 19 CLB (`khoan_chi` 200 dòng) & Lịch Sử Thư Viện Của Nam (`quet_the_thu_vien` 37 dòng)

### 1. Mở Rộng Bảng `khoan_chi` Lên 200 Dòng (Sổ Chi 19 CLB Toàn Trường):
- **Thuật toán sinh dữ liệu nền (`themQuyVaChi` trong `nhieu-mvp.ts`)**:
  - Sinh thêm 189 khoản chi nền ngẫu nhiên có hạt giống cố định (`seed: 2116`) cho 18 CLB còn lại (Văn nghệ, Guitar, Nhiếp ảnh, Tiếng Anh, Cờ vua, Bóng đá, v.v.).
  - Nâng tổng số dòng của `khoan_chi` từ 11 dòng lên đúng **200 dòng** quy mô trường đại học thực thụ.
- **Bảo toàn 100% logic cốt truyện & bài học SQL sư phạm**:
  - Tuyệt đối không sinh thêm dòng nào cho quỹ `Q-TT` (chỉ đúng 6 dòng cốt truyện của CLB Thám Tử).
  - Truy vấn `c-chi-tham-tu` (`WHERE clb = 'THAM_TU'`): vẫn trả về chính xác **6 dòng**.
  - Các bài tổng hợp `SUM`, `AVG`, `HAVING` (`c-chi-theo-nguoi-duyet` và `c-chi-vuot-muc`) của Minh Anh và Khánh được bảo toàn trọn vẹn 100%.
  - Cập nhật phản xạ của Tùng trong `tt-so-quy.md`: *"Cả sổ chi các CLB, hai trăm khoản. Mình chỉ cần quỹ CLB mình."*

### 2. Mở Rộng Bảng `quet_the_thu_vien` Lên 37 Dòng (Lịch Sử Nam Từ Khi Vào Trường):
- **Thuật toán sinh dữ liệu nền (`themQuetTheThuVien` trong `nhieu-mvp.ts`)**:
  - Bổ sung 27 lượt quẹt thẻ của Nam trong năm học 2023–2024 (23 tối thứ Hai, 4 tối thứ Năm) từ khi Nam nhập học khóa K23.
  - Cùng 5 lượt của Nam trong năm học 2024–2025 -> Tổng cộng Nam có **32 lượt** vào thư viện từ năm ngoái đến nay (27 tối thứ Hai, 5 tối thứ Năm).
  - Giữ nguyên vẹn 5 lượt của Hà Vy (tân sinh viên K24 nhập học tháng 9). Tổng bảng đạt **37 dòng**.
- **Bảo toàn 100% chứng cứ ngoại phạm & bài học sư phạm**:
  - Thử thách `c-nam-thu-vien`: lọc theo Nam ra đúng **32 dòng**.
  - Thử thách `c-nam-thu`: gom theo thứ vẫn giữ nguyên đúng **2 nhóm** (THU_HAI: 27 lần, THU_NAM: 5 lần).
  - Thử thách `c-toi-07` (`WHERE ngay = '2024-10-07'`): tối mùng 7 chỉ có Nam và Hà Vy quẹt thẻ, kết quả ra đúng **2 dòng** chuẩn xác.
  - Thử thách `c-vy-thu-vien`: vẫn trả về đúng **5 dòng**.
  - Đồng bộ lời thoại nhân vật trong `11-vu-3-tranh-cai.md` và `tt-tranh-cai.md` phản ánh rõ thói quen 27 tối thứ Hai của Nam từ năm ngoái đến nay.

### 3. Rà Soát & Kiểm Thử Toàn Diện:
- Chạy `npm run noi-dung:sinh:mvp`: Tái sinh kịch bản `kich-ban.gen.ts`.
- Chạy `npm run kiem-noi-dung:mvp`: 58/58 tệp đạt chuẩn, 39/39 câu SQL kiểm tra số dòng khớp 100%.
- Chạy `npm run typecheck`: 0 lỗi TypeScript strict mode.
- Chạy toàn bộ test suite Vitest: **128/128 test files passed**, **1052/1052 tests passed** (100% pass rate).



## [2026-10-03] Phân Bổ Lại Meme & Chibi: Xóa Bỏ Dồn Cục, Tăng Tính Căng Thẳng Cho Vụ 5 & Cân Bằng Toàn Game

### 1. Giữ Nguyên Vẹn Bộ Ba Meme Đỉnh Cao Ở Vụ 1:
- `cg-minh-anh-dan-tay` (Gendo đan tay - Evangelion): Cảnh nhận lá thư nặc danh ở Mở đầu.
- `cg-hop-doi-dau` (DIO vs Jotaro - JoJo): Cảnh đối đầu trước khi sửa câu truy vấn ở Buổi họp.
- `cg-quan-bi-bac` (Kaiba bị đánh bật - Yu-Gi-Oh): Cảnh Quân bị bác bỏ kết luận.

### 2. Dồn Hai Visual Phoenix Wright Sang Vụ 5 (Climax Mùa 1):
- `chibi-so-lieu-day` (Phoenix Wright số liệu): Chuyển từ Buổi họp Vụ 1 sang Vụ 5 sau khi chạy xong câu lệnh tổng hợp `c-chi-vuot-muc` (số liệu đã ra!).
- `cg-bang-chung-day` ("BẰNG CHỨNG ĐÂY!" - Phoenix Wright chỉ tay): Chuyển sang Vụ 5 tại nhịp đối chất quyết định `dc-khanh-so-do`, lúc lật ngược lời Khánh ("Sơ đồ tôi in thì các bạn đâu có tra!").

### 3. Phân Bổ Lại Các Meme Sang Vụ 2, 3 và Việc Phụ:
- **Take my money** (`chibi-khao-tra-da`): Chuyển từ quán trà đá Vụ 1 sang Vụ 3 (`v3-qua-2010`), lúc Tùng cuống cuồng chìa tiền mua quà 20/10 tặng bạn gái.
- **Yamcha nằm hố** (`chibi-408-nam-bep`): Rút khỏi chỗ đè ảnh ở Mở đầu, chuyển sang Việc phụ Dẫn lạc (`23-phu-dan-lac.md`), lúc hai bạn chạy trốn bác Thịnh soi đèn pin về tới KTX lúc 23h, kiệt sức nằm bẹp xuống phòng 408.
- **Think-Mark-Think** (`cg-nghi-di-tung-ha-vy`): Rút khỏi Mở đầu, chuyển sang Ngày 2 (`02-ngay-2.md`), lúc Tùng đoán mò "Tòa B hoặc Báo chí lấy hết kiểu gì chả trúng" bị Hà Vy mắng "Đừng cá... Tính đã!".
- **Math Lady tính nhẩm** (`chibi-tung-tinh-nham`): Rút khỏi tối Ngày 4, chuyển sang đầu Vụ 2 (`tin-phong-tung`), lúc Tùng suy luận số người chuyển tiếp tin đồn ở căng tin.
- **Saitama OK** (`chibi-duy-ok`): Rút khỏi tối Ngày 4, chuyển sang đầu Vụ 2 (`tin-phong-duy`), lúc Duy mở laptop tuân thủ quy trình.

### 4. Giải Quyết Triệt Để Hiện Tượng Ảnh Đè Ảnh & Dồn Cục:
- **Tối Ngày 4 (`04-ngay-4.md`)**: Rút 3/4 meme, chỉ giữ lại `chibi-duy-hop-banh` (Zelda Link giơ hộp bánh) làm điểm nhấn vui tươi, không còn tình trạng mỗi câu thoại nhảy một popup ảnh.
- **Mở đầu (`00-mo-dau.md`)**: Tách `chibi-408-nam-bep` và `cg-nghi-di-tung-ha-vy`, xóa bỏ hoàn toàn hiện tượng 2 ảnh bật liền nhau không có thoại.
- **Quán trà đá cuối Vụ 1 (`06-hop-va-ket.md`)**: Chỉ giữ lại `chibi-ghi-la-ghi` (Hà Vy nâng ly trà đá "True Story"), tạo nhịp kết thúc nhẹ nhàng, duyên dáng.

## [2026-10-03] Tái Thiết Kế Trình Dựng Câu Lệnh: Bố Cục 3 Cột (Query Pipeline), Zoom To Màn Hình Laptop & Nút Xóa Lọc

### 1. Phóng To Màn Hình Laptop (Maximized Laptop Viewport):
- **Tăng diện tích mặt kính lên +64%**: Nâng kích thước mặt kính từ `1094×588` lên `1420×740` trong `canh-tra.ts`.
- **Cắt giảm bàn phím thừa & xóa khoảng đen 2 bên**: Áp dụng `transform: scale(1.33)` cho ảnh nền phòng CLB, đẩy phần bàn phím thừa xuống đáy và mở rộng màn hình tràn sang hai bên.
- **Dán giấy nhớ bám viền tự nhiên**: Căn chỉnh tọa độ `viTriGiay` bám sát mép viền ngoài của laptop.

### 2. Bố Cục 3 Cột Logic (3-Column Query Pipeline):
- **Cột 1: Nguồn Dữ Liệu (`FROM` / `JOIN`)**: Chọn bảng / phiếu nguồn, khối nối bảng (`JOIN ON`) và chọn cột (`SELECT`).
- **Cột 2: Lọc Dòng, Gom Nhóm & Tính Toán (`WHERE` / `GROUP BY` / `AGG`)**: 
  - Điều kiện lọc dòng (`WHERE`) có thể thêm/bớt linh hoạt.
  - Gom nhóm (`GROUP BY`) chọn cột gom.
  - Tính toán hàm tổng hợp (`COUNT`, `SUM`, `AVG`).
- **Cột 3: Hậu Xử Lý & Sắp Xếp (`HAVING` / `ORDER BY` / `RUN`)**:
  - Lọc nhóm (`HAVING`) với ngưỡng giá trị.
  - Sắp xếp thứ tự (`ORDER BY` tăng/giảm).

### 3. Cải Tiến UX Khối Lọc & Nút Làm Sạch (TRIM/LOWER):
- **Bổ sung nút `×` (Bỏ lọc / Bỏ điều kiện)**:
  - Cho phép người chơi bấm `×` để gỡ bỏ bộ lọc ngay lập tức ở cả màn tra (`ManTraV7`) và màn tổng hợp (`ManTongHopMvp`), không bị kẹt khi chỉ còn 1 điều kiện.
  - Bổ sung nút `×` bỏ điều kiện giữ nhóm `HAVING`.
- **Đổi "y nguyên" thành "để nguyên"**:
  - Chuyển `khong: 'y nguyên'` thành `khong: 'để nguyên'` trong `TEN_CHUAN_HOA`.
  - Thiết kế lại style `.v7-o--got`: loại bỏ khối xám xịt dày cộp khi chưa bật, chuyển thành nút tiện ích tinh tế có icon `✨` và viền mảnh nhẹ nhàng, chỉ sáng rực rỡ khi kích hoạt chuẩn hóa.

## [2026-10-03] Mở Rộng Dữ Liệu Thực Tế: Seeding Bảng `danh_sach_lop_cu` Lên 400 Dòng & Rà Soát Hệ Thống

### 1. Seeding Thực Tế Bảng `danh_sach_lop_cu` (Từ 39 lên 400 dòng):
- **Bổ sung thuật toán sinh dữ liệu nền (`themDanhSachLopCu` trong `nhieu-mvp.ts`)**:
  - Sinh thêm 361 dòng dữ liệu ngẫu nhiên có hạt giống cố định (`seed: 2115`), trải đều qua 10 niên khóa (1995–1996 đến 2004–2005) và các lớp `TH`, `KT`.
  - Tăng tổng số dòng từ 39 dòng lên đúng **400 dòng** quy mô trường đại học thực tế.
- **Bảo toàn 100% bất biến cốt truyện & logic SQL sư phạm**:
  - Giữ nguyên vẹn 30 dòng sinh viên ra trường của cốt truyện.
  - Các dòng nền bổ sung TUYỆT ĐỐI không chứa `ghi_chu` là `ra trường` dưới bất kỳ biến thể nào (chỉ chọn từ `[null, thôi học, chuyển trường, bảo lưu, chuyển lớp, khen thưởng]`).
  - Đảm bảo các kết quả truy vấn sư phạm hoàn toàn chuẩn xác:
    - Cả bảng: đúng 400 dòng.
    - Không lọc chuẩn hóa: đúng 18 dòng.
    - Chỉ dùng `TRIM`: đúng 23 dòng.
    - Chỉ dùng `LOWER`: đúng 23 dòng.
    - Dùng cả `LOWER(TRIM(...))`: đúng 30 dòng.
    - Gom nhóm (`GROUP BY ho_ten HAVING COUNT(*) > 1`): đúng 26 tên độc nhất, 4 tên có 2 dòng (Châu, Sơn, Long, Hùng).
  - Dòng easter egg của `Đỗ Văn Thịnh` (1995–1996, thôi học) luôn được giữ cố định ở dòng đầu tiên của bảng.

### 2. Đồng Bộ Nội Dung Kịch Bản & Lời Thoại:
- Cập nhật lời thoại nhân vật Tùng trong `loi/tt-phu-hoc-tro-cu.md`: *"Cả bảng, bốn trăm dòng, kể cả người thôi học, người chuyển trường."* khi người chơi chạy truy vấn chưa lọc.
- Cập nhật lời dẫn kết nhiệm vụ trong `lich.md`: *"Từ bốn trăm dòng lớp cũ, 30 dòng ghi ra trường..."*.
- Cập nhật ghi chú giải thích trong `du-lieu.md`.
- Sinh lại kịch bản TypeScript tự động (`kich-ban.gen.ts`).

### 3. Rà Soát & Kiểm Thử Toàn Diện:
- Chạy `npm run kiem-noi-dung:mvp`: 58/58 tệp nội dung đạt chuẩn, 39 câu truy vấn kiểm tra đều khớp 100%.
- Chạy `npm run typecheck`: 0 lỗi TypeScript strict mode.
- Chạy toàn bộ test suite Vitest: **127/127 test files passed**, **1050/1050 tests passed** (100% pass rate).


## [2026-10-03] Tái Thiết Kế Màn Kết Vụ: Hiển Thị Trọn Vẹn Ảnh 16:9 & Không Cuộn (Zero-Scroll)

### 1. Khắc Phục Lỗi Cắt Xén Ảnh CG (16:9 Showcase):
- Bỏ cơ chế ép ảnh theo chiều cao dọc của modal khiến ảnh 16:9 bị crop hơn 40% bề ngang (mất nhân vật ở hai bên mép).
- Giữ nguyên tỉ lệ vàng 16:9 (`aspect-ratio: 16 / 9; width: 100%`) giúp hiển thị đầy đủ 100% toàn bộ 4 nhân vật (Hà Vy, Minh Anh, Duy, Tùng).
- Thêm tính năng **Lightbox Modal**: nhấp vào ảnh hoặc biểu tượng "🔍 Phóng to ảnh" để mở xem ảnh kích thước lớn toàn màn hình với nền mờ và nút đóng tiện lợi (ESC).

### 2. Phân Bổ Bố Cục 2 Cột Cân Bằng (Balanced Two-Column Zero-Scroll):
- **Cột Trái (Story & Visuals)**: Khung ảnh CG 16:9 + Kicker & Tiêu đề vụ án + Lời dẫn cốt truyện + Cụm nút hành động (Tiếp tục vụ chính, Chơi lại từ đầu, Về màn tiêu đề).
- **Cột Phải (Case Assessment)**: Dành riêng cho Tờ biên bản kẹp giấy chị Minh Anh (`.mvp-chot`), căn giữa chiều dọc, tinh chỉnh padding/margin để toàn bộ điểm số, chỉ số và con dấu mộc nằm trọn vẹn trong màn hình.
- **Loại bỏ hoàn toàn thanh cuộn dọc (Zero-Scroll)**: Không còn tình trạng thanh cuộn cắt ngang bảng điểm hoặc giấu mất các nút bấm hành động ở dưới đáy.
- **Tối ưu Mobile / Portrait**: Tự động xếp chồng dọc mượt mà với thanh cuộn tự nhiên khi màn hình quá ngắn.

## [2026-10-03] Chuyển Đổi Sang 2 Bóng Chat Đối Đầu (Quân - NVC) Trong Cảnh JoJo

### 1. Cải Tiến Cảnh Đối Đầu (`cg-hop-doi-dau`):
- **Bỏ hoàn toàn chữ tiếng Nhật & khung che đen**: Xóa `ゴゴゴ MENACING…` và thanh tiêu đề che mặt nhân vật.
- **Bóng chat của Quân (Xanh neon)**: *"Ồ? Thay vì nhận thua, cậu lại dám bước lên đối chất sao?"* kèm thẻ tên `Quân` và đuôi bóng thoại trỏ về phía Quân, đặt tại góc trên bên trái không che khuôn mặt.
- **Bóng chat của Nhân vật chính (Vàng hổ phách)**: *"Không bước lên, sao bẻ được câu truy vấn của anh!"* kèm thẻ tên `Bạn` và đuôi bóng thoại trỏ về phía NVC áo hoodie vàng ở góc dưới bên phải.
- **Tối ưu hiển thị Responsive & Mobile**: Đảm bảo bóng thoại co giãn linh hoạt và chữ rõ nét trên cả màn hình PC lẫn điện thoại.

### 2. Cải Tiến Cảnh Quân Bị Bác Bỏ (`cg-quan-bi-bac`):
- **Bỏ tiếng Anh & hộp đen che đỉnh**: Xóa bỏ `IT SHOULD HAVE BEEN ME!` và khung đen che mặt/tóc/tay Quân.
- **Giữ lại đúng 2 câu sắc nét**:
  1. Bóng chat tiếng thốt của Quân ở góc trên bên phải: *"Không thể nào! Kết luận của tôi… bay màu rồi?!"* (cách xa mặt Quân, đuôi trỏ sang trái).
  2. Con dấu đỏ lớn: *"BÁC BỎ HOÀN TOÀN!"* hạ thấp xuống vùng áo ghi-lê (`top: 57%`), hoàn toàn không chạm cằm hay che mặt Quân.
- **Giải phóng 100% gương mặt Quân**: Biểu cảm gào thét và bàn tay giơ lên của Quân hiển thị trọn vẹn, không bị bất kỳ thành phần nào che lấp.

## [2026-10-03] Chuẩn Hóa Hệ Thống 3 Phông Chữ Offline & Tinh Chỉnh Bảng Ghim / Cuộn Toàn Game

### 1. Chuẩn Hóa Hệ Thống 3 Phông Chữ (Self-hosted offline):
- **Noto Sans** (`@fontsource/noto-sans`): Phông chính toàn diện cho UI, hội thoại câu chuyện, nút bấm, HUD và nội dung đọc.
- **Roboto Mono** (`@fontsource/roboto-mono`): Phông đơn cách (monospace) chuyên biệt cho code SQL, bảng kết quả, terminal, schema và số liệu.
- **Playwrite India** (`@fontsource/playwrite-in`): Phông viết tay nghệ thuật cho chữ ký nhân vật, giấy nhớ dán (sticky notes), manh mối ghi chép.
- **Offline 100%**: Loại bỏ phụ thuộc mạng bên ngoài, gỡ các gói font cũ và thẻ link Google Fonts trong `index.html` và `app.css`.

### 2. Tinh Chỉnh Bảng Ghim, Manh Mối & Đồng Bộ Thanh Cuộn:
- Đồng bộ thanh cuộn mỏng, thanh thoát trên toàn game; khắc phục triệt để lỗi 2 thanh cuộn lồng nhau.
- Cải tiến bảng ghim điều tra: tương tác đổi màu ghim trực tiếp, gỡ ghim nhanh, đóng bảng khi nhấp ra ngoài.
- Tinh chỉnh hiển thị văn bản trực tiếp trên tài liệu chứng cứ thay vì các khối che giả.

## [2026-10-03] Chèn Meme JoJo (NVC Tiến Lên), Buff Tự Tin Cho NVC & Thêm Chữ Đè Lên Cảnh Kaiba

### 1. Kịch Bản & Cảnh Meme JoJo (`cg-hop-doi-dau`):
- **Chèn CG JoJo vào kịch bản**: Bổ sung `- [ẢNH cg-hop-doi-dau]` ngay trước thử thách sửa SQL câu `OR` của Quân (`c-sua-or-quan`) trong `06-hop-va-ket.md`.
- **Buff tự tin cho Nhân vật chính**: Mở rộng phân đoạn thoại `hop-00.3` trong `loi/06-hop-va-ket.md` với sự cổ vũ nhiệt tình của Tùng, Minh Anh, Hà Vy, và câu thoại khẳng khái, tự tin của người chơi trước khi bước lên bục máy chiếu.
- **Tiêu đề meme & Manga stamps**:
  - Tiêu đề: *"Ồ? Thay vì nhận thua, cậu lại dám tiến lại gần tôi sao?"*
  - Chữ đè lên ảnh: *"ゴゴゴ MENACING…"* và *"Không bước lại gần sao bẻ được câu lệnh của anh!"*.

### 2. Cảnh Quân Thua Giống Kaiba (`cg-quan-bi-bac`):
- **Bổ sung chữ đè lên ảnh (Meme Stamps)**: Tạo các lớp nhãn hiệu ứng phong cách manga/comic Kaiba defeat:
  - Tiêu đề: *"KHÔNG THỂ NÀO! KẾT LUẬN CỦA TÔI… BAY MÀU RỒI?!"*
  - Con dấu chéo đỏ lớn: *"BÁC BỎ HOÀN TOÀN!"*
  - Góc trái: *"IT SHOULD HAVE BEEN ME!"*
  - Góc phải: *"595 DÒNG → 2 DÒNG!"*.

### 3. Tinh Chỉnh CSS & Sửa Lỗi Build:
- Thêm cấu trúc `mvp-anhchen__khung` và các biến thể `mvp-anhchen__de-len--*` trong `mvp.css`.
- Sửa lỗi cú pháp CSS trong `NhacViecMvp.css` (selector trước media query) và `v7.css` (thừa dấu đóng ngoặc sớm).
- Bổ sung unit test cho meme trong `AnhChenMvp.test.tsx`.

## [2026-10-03] Tối Ưu Hộp Thoại, Nút Lùi Cho Sự Kiện Ảnh & Căn Chỉnh Giao Diện Mobile

### 1. Hộp Thoại & Nút Tiếp Tục (DialogBox):
- **Bỏ biểu tượng tam giác cuộn (`▼`)**: Xóa bỏ icon `.dialog__scroll-arrow` bên trong khung thoại để tránh trùng lặp với nút Tiếp tục.
- **Cố định kích thước khung thoại 3 dòng trên mobile**: Thiết lập chiều cao cố định (`height: 114px`, `max-height: 114px`) và giới hạn hiển thị 3 dòng chữ (`height: calc(1.48em * 3)`, `overflow: hidden`) trong `portrait.css`. Khung thoại không còn co giãn hay nhảy kích thước giữa các câu thoại ngắn/dài.
- **Phân trang thoại dài (Tap-to-scroll)**: Khi nội dung dài hơn 3 dòng, bấm vào hộp thoại hoặc nút Tiếp tục sẽ cuộn đọc tiếp trang nội dung còn lại; cú bấm tiếp theo sau khi đã xem hết mới chuyển sang câu thoại mới.
- **Tách biệt tên nhân vật**: Tăng khoảng đệm trên của khung chữ (`padding-top: 24px`) và đẩy badge tên người nói (`.dialog__speaker`) lên cao hơn (`top: -18px`), tạo khoảng cách thoáng đãng, không bị đè sát chữ.

### 2. Sửa Nút Lùi Khi Gặp Sự Kiện Ảnh Chèn (AnhChenMvp):
- Khắc phục lỗi khi bấm lùi từ câu thoại ngay sau ảnh CG/chibi: trước đây bị kẹt hiển thị ảnh và chỉ có thể bấm Next; nay nút Back lùi chuẩn xác về câu thoại trước ảnh.

### 3. Tối Ưu Giao Diện Mobile, HUD & Giới Thiệu Nhân Vật:
- **Tăng diện tích tương tác**: Tăng vùng bấm nút địa điểm trên mobile, bố cục lại khối thông tin nhiệm vụ và các nút chức năng để tránh tình trạng đè chéo hoặc cắt chữ.
- **Dàn trang giới thiệu nhân vật (Debut Splash)**: Cân chỉnh bố cục trên màn hình dọc và điện thoại thật, chống tràn lấp nội dung mô tả nhân vật.

### 4. Tệp chỉnh sửa:
- `prototype/src/shared/ui/DialogBox.tsx`
- `prototype/src/shared/ui/DialogBox.test.tsx`
- `prototype/src/styles/portrait.css`
- `prototype/src/shared/vn/vn-controls.css`
- `prototype/src/mvp/ui/AnhChenMvp.tsx`
- `prototype/src/story/ui/character-debut.css`
- `prototype/src/evidence/ui/chara-profile.css`
- `prototype/src/mvp/ui/HudMvp.tsx`
- `prototype/src/mvp/ui/DoiChatMvp.tsx`
- `prototype/src/mvp/ui/v7/BangGhimMvp.tsx`
- `.agent/changelog.md`



### 1. Kiến Trúc Bộ Khung Màn Hình Dọc & Simulator Máy Tính:
- **Tùy chọn `viewportMode` trong `vn-store.ts`**: Hỗ trợ 3 trạng thái (`auto` | `mobile` | `desktop`), lưu trữ bền vững trong `localStorage`.
- **Nút chuyển đổi nhanh Màn hình Dọc/Ngang**: Bổ sung trực tiếp trên thanh Capsule Group và Popup Menu của `TopBar.tsx`, cho phép chuyển đổi 1-chạm giữa giao diện PC và Mobile Simulator.
- **Khung giả lập điện thoại (`portrait.css`)**: Khi bật chế độ Mobile trên màn hình PC lớn, ứng dụng tự động bọc trong khung viền điện thoại sang trọng (390×844px, viền 3D, Dynamic Island, Home indicator bar) giúp trải nghiệm và kiểm thử trực quan mà không cần bật DevTools.

### 2. Tinh Gọn HUD TopBar Cho Màn Hình Dọc:
- Thu nhỏ tem chương Phần 1/5 (`scale(0.82)`), ẩn tên chương dài để nhường chỗ cho khối Mục tiêu nhiệm vụ.
- Khối mục tiêu nhiệm vụ thu gọn thành dạng dải ticker thông minh kèm icon la bàn vàng `#fbbf24`.
- Khối hành động gom gọn: nút Bản đồ, nút Hồ sơ (kèm huy hiệu đếm số lượng) và nút Menu hamburger trong capsule 36px siêu nhỏ gọn.

### 3. Tối Ưu Sân Khấu & Dàn Nhân Vật (Fixed Scene Types):
- **Căn chỉnh nhân vật**: Chân dung nhân vật đứng chính giữa màn hình dọc, chiếm ~70% chiều cao sân khấu (`width: min(390px, 94vw)`, `height: 72vh`), neo chân ở đáy sau hộp thoại, tạo bố cục bán thân (waist-up) hoàn mỹ như truyện tranh Webtoon/Otome game.
- **Huy hiệu địa điểm**: Luôn neo cố định góc trên bên trái `top: 8px, left: 8px` với kích thước tỉ lệ cân đối.

### 4. Bố Cục Hộp Thoại & Thanh Thao Tác Đáy Màn Hình (Mobile Bottom Bar):
- **Tách luồng Quick Action Bar (`VnQuickButtons`)**:
  - Trên PC: Nằm phía trên hộp thoại (`vn-quick-bar--desktop`).
  - Trên Mobile: Tự động chuyển xuống nằm sát đáy màn hình bên trái (`vn-quick-bar--mobile` gồm: `[AUTO]` `[SKIP]` `[LOG]` `[LƯU]` `[NẠP]` `[ẨN UI]`), thuận tiện thao tác 1 tay bằng ngón cái.
- **Nút "Tiếp tục" mẩu giấy nghệ thuật (`.dialog__next`)**: Nằm cố định ở góc dưới bên phải chân trang, font chữ thủ bút mềm mại và mũi tên dẫn hướng phát sáng ấm áp.
- **Chỉ báo cuộn thoại (`.dialog__scroll-arrow`)**: Thêm ký hiệu tam giác vàng `▼` nhịp nhẹ ở góc dưới bên phải bên trong hộp thoại chuẩn Visual Novel.

### 5. Tệp chỉnh sửa & tạo mới:
- `prototype/src/shared/vn/vn-store.ts`
- `prototype/src/shared/ui/TopBar.tsx`
- `prototype/src/shared/ui/DialogBox.tsx`
- `prototype/src/app/GameScreen.tsx`
- `prototype/src/main.tsx`
- `prototype/src/styles/portrait.css` (Tạo mới)
- `plan-mobile-portrait-mode.md` (Artifact kế hoạch)
- `.agent/changelog.md`

## [2026-09-29] Chuẩn Hóa Giao Diện Khám Phá, Câu Hỏi Trắc Nghiệm & Hệ Thống Kính Mờ Thống Nhất

### 1. Đồng bộ Style Màn Xem Xét Điểm (Explore Screen - Ảnh 1):
- Loại bỏ hoàn toàn khối trắng đục (`--c-dialog-bg`), chuyển sang phong cách kính mờ xanh thẫm và viền vàng kim (`linear-gradient(180deg, rgba(15, 23, 42, 0.36), rgba(10, 16, 30, 0.44))`, `backdrop-filter: blur(6px)`, viền `rgba(253, 230, 138, 0.85)`).
- Chuyển các thẻ điểm xem xét (`.hotspot`) sang dạng thẻ kính mờ trong suốt viền vàng hổ phách, chữ trắng thanh tú với trạng thái hover phát sáng vàng kim.
- Chuẩn hóa dòng thông báo số lượng manh mối còn lại (`.explore__missing`) sang tông vàng ấm dịu mắt.

### 2. Khử Hoàn Toàn Nút Màu Xanh Dương Lạc Lõng (Ảnh 2):
- Lớp nút chính `.explore__next`, `.stage .btn--primary` và `.gate .btn--primary` được ghi đè từ màu xanh dương công nghệ (`#2563eb`) sang nút vàng kim hoàng gia chuyển sắc (`#fbbf24 ↔ #f59e0b ↔ #d97706`), chữ màu mật ong đậm (`#241402`), viền vàng kim `1px solid #fde68a` cùng hiệu ứng đổ bóng ấm áp, hòa hợp 100% với phong cách "vàng trắng thanh xuân vườn trường".

### 3. Ghim Cố Định Huy Hiệu Địa Chỉ & Tối Ưu Độ Tương Phản Lời Nhắc (Ảnh 3):
- **Ghim huy hiệu địa chỉ (`.stage__scene-label`)**: Đặt `position: absolute; top: 14px; left: 16px; z-index: 35;` tách khỏi dòng chảy grid. Khi màn hình câu hỏi (`.mc`) mở ra, huy hiệu địa điểm không còn bị ép nhảy xuống đáy màn hình mà luôn neo vững vàng ở góc trên bên trái.
- **Lời nhắc câu hỏi (`.mc__hint-box`, `.mc__note`)**: Thay thế mã màu nâu sẫm khó nhìn (`#92400e`) bằng tông vàng sáng ánh kim (`#fde68a`, `#fbbf24`) với viền viên thuốc thanh mảnh và biểu tượng phát sáng dịu mắt, đảm bảo độ tương phản hoàn hảo trên nền kính mờ.

### 4. Hạ Vị Trí & Tăng Độ Trong Suốt Cho Các Khung Phương Án Lựa Chọn:
- **Hạ độ cao (`.mc__overlay`)**: Chuyển vị trí từ giữa màn hình (nơi che khuất khuôn mặt nhân vật) xuống sát mép trên của hộp thoại hội thoại (`bottom: clamp(175px, 25vh, 235px)`), giúp toàn bộ biểu cảm và khuôn mặt nhân vật hiển thị rõ ràng, không bị cản trở.
- **Hiệu ứng kính mờ trong suốt (`.mc__choice`)**: Áp dụng chuẩn kính mờ giống hệt khung chat phía dưới (`rgba(15, 23, 42, 0.36) ↔ rgba(10, 16, 30, 0.46)`, `backdrop-filter: blur(6px)`, viền `1.5px solid rgba(253, 230, 138, 0.85)`), nhìn xuyên thấu tinh tế qua bối cảnh và trang phục nhân vật.

### 5. Tệp chỉnh sửa:
- `prototype/src/styles/app.css`
- `prototype/src/story/ui/ExploreScreen.tsx`
- `prototype/src/shared/ui/MultipleChoice.tsx`
- `prototype/src/shared/ui/Stage.tsx`
- `.agent/changelog.md`



### 1. Hệ thống Âm thanh (Sound & Music):
- **Web Audio Lo-Fi Piano Synthesizer (`sound-engine.ts`)**:
  - Nâng cấp vòng hợp âm Lo-Fi học đường (Cmaj7 - Am7 - Dm7 - G7) đa tầng: Nốt Bass trầm ấm + dải đệm Ambient Pad mờ ảo + arpeggio phím Piano Lo-Fi rải rác từng nốt êm dịu, không đơn điệu.
  - Hỗ trợ hàm `playCustomBgm(audioSrc)` nạp file MP3/OGG thật, tự động fallback về Synth nếu chưa có tệp.
  - Tạo cấu trúc thư mục `prototype/src/assets/audio/bgm/`, `prototype/src/assets/audio/sfx/` kèm `README.md`.
- **Bộ SFX mở rộng (`SfxType`)**:
  - Thêm `'tab'`: Tiếng gõ thẻ hồ sơ / danh mục thanh thoát.
  - Thêm `'clue_unlock'`: Chuông thám tử 5 nốt vàng ngân vang khi phát hiện bước ngoặt / manh mối mới.
  - Thêm `'shake'`: Âm rung chấn động khi có tình tiết bất ngờ.
- **Tích hợp SFX tương tác**:
  - Gắn SFX `'page'` khi nhấp nút **Tiếp tục** (`DialogBox.tsx`).
  - Gắn SFX `'tab'` khi đổi nhân vật và subtab trong Hồ sơ (`CharaProfileView.tsx`).
  - Gắn SFX `'tab'`, `'page'`, `'cancel'` trong Hòm đồ & Vật chứng (`EvidenceNotebook.tsx`).

### 2. Bộ 4 Hiệu Ứng Thị Giác (Visual Effects):
- **Hạt bụi sáng lơ lửng (`AmbientDustOverlay.tsx`, `ambient-dust.css`)**:
  - Đặt trong `Stage.tsx`, tạo 18 hạt bụi sáng li ti bay nhẹ nhàng theo luồng gió tự nhiên, tăng chiều sâu điện ảnh cho phòng CLB và giảng đường.
  - Hỗ trợ tắt tự động khi bật `prefers-reduced-motion`.
- **Rung màn hình (`Screen Shake`)**:
  - Tích hợp lớp `.stage.is-shaking` trong `app.css`.
  - Kích hoạt khi có hiệu ứng phản biện (`Objection`) hoặc nhân vật biểu cảm kinh ngạc (`stunned`) trong `GameScreen.tsx`.
- **Mở khóa manh mối mới (`ClueUnlockEffect`)**:
  - Theo dõi danh sách vật chứng trong `GameScreen.tsx`, tự động hiển thị Toast vàng kim cùng chuông `clue_unlock` khi có manh mối mới.
- **Hiệu ứng 3D Tilt tương tác**:
  - Thêm `perspective: 900px` và phản hồi nghiêng 3D (`rotateY`, `translateY`) khi hover lên ảnh Polaroid Minh Anh (`chara-profile.css`) và các ô thẻ vật phẩm (`inventory-grid.css`).

### 3. Tối ưu Hiệu Ứng Đổi Người Nói (Speaker Transition):
- Bỏ hoàn toàn zoom in/out (`scale(1.02) ↔ scale(0.97)`), giữ 100% kích thước nguyên bản chuẩn Ren'Py/DDLC.
- Người nói đứng lớp trước (`z-index: 2`, độ sáng 100%), người nghe lùi lớp sau (`z-index: 1`) với độ tối nhẹ tinh tế (`brightness: 0.82`), triệt tiêu cảm giác mỏi mắt khi đối đáp.

### 4. Tệp chỉnh sửa:
- `prototype/src/shared/audio/sound-engine.ts`
- `prototype/src/assets/audio/README.md`
- `prototype/src/shared/ui/visuals/AmbientDustOverlay.tsx`
- `prototype/src/shared/ui/visuals/ambient-dust.css`
- `prototype/src/shared/ui/Stage.tsx`
- `prototype/src/shared/ui/DialogBox.tsx`
- `prototype/src/evidence/ui/CharaProfileView.tsx`
- `prototype/src/evidence/ui/EvidenceNotebook.tsx`
- `prototype/src/evidence/ui/chara-profile.css`
- `prototype/src/evidence/ui/inventory-grid.css`

## [2026-09-28] Chuẩn Hóa Màn Hình Thu Nhận Vật Phẩm (Item Acquisition Screen - DocumentReveal)

### 1. Chuẩn hóa Khung Hiển Thị Vật Phẩm Thống Nhất & Đồng Bộ Hệ Thống Popup:
- Thay vì mỗi vật phẩm vẽ một layout riêng rẽ, chuyển đổi toàn bộ sang bố cục Visual Novel 2 cột đồng nhất:
  - **Cột Trái - Bệ Trưng Bày Hiện Vật (`.docview__pedestal`)**: Nền nhung xanh thẫm phối viền vàng kim, hiệu ứng ánh sáng hội tụ (spotlight glow), trưng bày mẫu vật 3D với góc nghiêng tự nhiên (Lá thư kẹp phong bì sáp niêm phong, Thẻ kẹp sách báo chí rách mép, Sổ bàn giao kèm dấu mộc đỏ). Dưới chân có biển đồng khắc nổi *"HIỆN VẬT THỰC ĐỊA"*.
  - **Cột Phải - Hồ Sơ Giám Định Thám Tử (`.docview__dossier`)**: Giấy cổ màu kem với tiêu đề phân loại hiện vật, trích xuất nguyên văn văn bản chữ in / viết tay, kèm khung ghi chú giám định & suy luận điều tra.
- **Đồng Bộ Hoàn Toàn Với Hệ Thống Popup Chung (Modal Design System)**:
  - **Lớp Phủ Backdrop Toàn Màn Hình (`.docview-modal`)**: Bọc ngoài bằng `position: fixed; inset: 0; z-index: 9999; backdrop-filter: blur(6px); background: rgba(15, 23, 42, 0.55)` mờ nhẹ để vẫn thấy bối cảnh gốc phía sau (không bị đen kịt), click ra ngoài hoặc bấm `Escape` để cất/đóng.
  - **Thanh Cuộn Đồng Bộ**: Tích hợp thanh cuộn xanh ngọc mảnh (`scrollbar-color: rgba(56, 189, 248, 0.5) rgba(224, 242, 254, 0.12)`).
  - **Nút Đóng Nhanh Góc Trên (`.docview__close-btn`)**: Nút `×` góc trên bên phải đồng bộ với các popup `AudioSettingsModal`, `BacklogModal`, `CampusMapModal`.
- **Header Thống Nhất**: Huy hiệu ruy băng vàng kim *"THU THẬP VẬT CHỨNG MỚI"*, có icon chìa khóa/hồ sơ và đường viền trang trí đối xứng.
- **Nút Hành Động Thống Nhất**: Nút ruy băng vàng hoàng gia *"Cất vào hồ sơ"* (đồng bộ phong cách với nút Tiến trình đối thoại), tích hợp cơ chế bảo vệ nhấp đúp (`usePressGuard`).
- **Âm thanh Tương tác**: Kích hoạt chuông thám tử `soundEngine.playSfx('clue_unlock')` khi mở màn hình hiện vật và tiếng lật trang `soundEngine.playSfx('page')` khi cất vào hồ sơ.

### 2. Tệp chỉnh sửa:
- `prototype/src/evidence/ui/DocumentReveal.tsx`: Refactor sang cấu trúc `DocumentStandardBody`, bọc `docview-modal` backdrop, thêm phím `Escape` và nút đóng `×`, bảo tồn trọn vẹn hợp đồng kiểm thử `data-art-slot`, `data-art-source`, `aria-hidden`, `figcaption`.
- `prototype/src/styles/app.css`: Thêm bộ CSS toàn diện cho `.docview-modal`, `.docview`, `.docview__close-btn`, `.docview__pedestal`, `.docview__dossier`, `.docview__banner`, `.docview__btn-collect`.

## [2026-09-28] Tinh Chỉnh Visual Novel GUI & Thanh Lọc Bảng Màu Tech Cyan sang Tông Thanh Xuân Vườn Trường

### 1. Tinh chỉnh Header & Menu Điều Khiển:
- **Nút Menu 3 sọc**: Triệt tiêu hoàn toàn viền vát/chamfer và bóng đổ tròn xung quanh nút menu, giúp nút hòa quyện tự nhiên, tinh tế vào thanh điều khiển capsule.
- **Menu Dropdown Chuẩn Game UI**: Tái thiết kế `.topbar__menu-panel` dạng thẻ kính nổi bo tròn 16px, viền ánh vàng hoàng kim, bổ sung bộ icon trực quan (`IconSave`, `IconFolderOpen`, `IconSliders`, `IconRotateCcw`), hiệu ứng lướt nhẹ khi hover và phong cách cảnh báo đỏ cho "Chơi lại từ đầu".

### 2. Tinh chỉnh Khung Hội Thoại (Dialogue Box) & Nút Tiếp Tục:
- **Tăng độ trong suốt khung chat (`.dialog--glass`)**: Giảm độ đục nền xuống `rgba(15, 23, 42, 0.36) ~ 0.44` và hạ blur xuống `6px`, giúp khung chat trong vắt như kính thủy tinh, tôn lên bối cảnh trường học và hạt bụi lơ lửng phía sau.
- **Bỏ icon xoay xoay (Sparkle)**: Xóa bỏ hoàn toàn ngôi sao quay tròn trên nút "Tiếp tục" để giữ nét thanh lịch, điềm đạm.
- **Triệt tiêu mũi tên kép bất đồng bộ**: Bỏ hẳn mũi tên nhấp nháy `.dialog__indicator` bên trong khung chat, chỉ giữ lại một mũi tên điều hướng duy nhất đồng bộ trên nút "Tiếp tục".

### 3. Chuyển Toàn Bộ Màu Tech Cyan sang Xanh Thẫm + Vàng Trắng Thanh Xuân Vườn Trường:
- **Thẻ thời gian & Chuyển cảnh (`scene-transition.css`)**: Chuyển "14:00 CHIỀU", vạch phân đoạn và hiệu ứng ánh sáng tiêu đề từ màu xanh cyan sang màu vàng hổ phách rực rỡ (`#fbbf24`, `#f59e0b`) trên nền nhung đêm sâu thẳm.
- **Hộp Cài Đặt Âm Thanh (`audio.css`)**: Chuyển tiêu đề, núm vặn slider, % âm lượng, nút chọn tốc độ chữ và nút đóng từ màu xanh sci-fi sang dải màu vàng hổ phách (`#f59e0b`, `#fbbf24`, `#d97706`).
- **Nhật ký thoại & Ô lưu (`vn-controls.css`)**: Chuyển tiêu đề Log, vạch trích dẫn, tên người nói và số thứ tự ô lưu sang màu vàng kim vintage (`#f59e0b`, `#fde68a`).
- **Bản đồ trường học (`CampusMapModal.tsx`)**: Chuyển các điểm nhấn và icon từ cyan sang vàng đồng sang trọng.

