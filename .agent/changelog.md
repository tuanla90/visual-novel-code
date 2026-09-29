# Nhật Ký Thay Đổi (.agent/changelog.md)

## [2026-09-29] Triển Khai Chế Độ Màn Hình Dọc (Mobile Portrait Mode 9:16) & Smartphone Simulator

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

