# Nhật Ký Thay Đổi (Changelog) - Tối Ưu UI/UX & Sư Phạm SQL Prototype

> **Thời gian:** 27/09/2026  
> **Chủ trì nghiệm thu:** Senior Systems Architect & UX Director  
> **Mục tiêu:** Khắc phục triệt để các Red Flags & Amber Alerts từ bản đánh giá chuyên gia Google (Chống bấm đúp, giàn giáo nhận thức Thử thách 3, Responsive layout <= 1100px).

---

## 1. Tương tác & Chống Bấm Đúp (IxD & Accessibility)
- **Tạo hook `usePressGuard`** (`src/shared/ui/use-press-guard.ts`):
  - Chống rapid click (mouse detail > 1), key repeat (Space/Enter giữ liên tục), và spam phím/chuột trong 400ms sau cú bấm đầu.
  - Tương thích tốt với React 19 StrictMode và Vitest testing environment.
- **Áp dụng bảo vệ toàn diện**:
  - `DialogBox.tsx`: Chống nhảy cóc thoại khi bấm chuột hoặc phím Space/Enter.
  - `MultipleChoice.tsx`: Chống bấm đúp trôi phản hồi giải thích của nhân vật.
  - `DocumentReveal.tsx`: Chống đóng tài liệu vô ý khi vừa mở.
  - `HaVyPanel.tsx`: Chống bấm đúp "Hỏi Hà Vy" gây đếm đôi số lần gợi ý trong telemetry.
  - `SuccessPanel.tsx`: Chống bấm đúp "Lưu vào hồ sơ".
- **React 19 StrictMode Question Order** (`src/shared/ui/choice-order.ts`):
  - Khắc phục lỗi double-render của StrictMode làm đảo lộn thứ tự đáp án trong dev mode.
- **Hỗ trợ `prefers-reduced-motion`** (`src/story/ui/ObjectionEffect.tsx`):
  - Tự động bỏ qua hiệu ứng rung chuyển nếu người dùng bật chế độ giảm chuyển động trong hệ điều hành.

## 2. Nâng Cấp Engine & Sư Phạm SQL (Challenge 3 Scaffolding)
- **Chuẩn hóa truy vấn** (`src/sql-challenge/engine/run.ts`):
  - Tự động chuyển Unicode về dạng NFC và trim khoảng trắng thừa trước khi thực thi SQLite.
  - Thêm giới hạn an toàn 2.000 dòng (`too-many-rows`) tránh lag/treo trình duyệt.
- **Chẩn đoán sư phạm cho Thử thách 3** (`src/sql-challenge/engine/diagnose.ts`, `ids.ts`, `challenges.ts`):
  - Bổ sung mã `same-column-and`: Bắt lỗi khi người học dùng `ma_lop = 'B101' AND ma_lop = 'B202'` trên cùng một cột dẫn đến tập rỗng.
  - Bổ sung mã `class-subset`: Bắt lỗi khi lọc thiếu 1 trong 2 lớp cần thiết.
- **Đồng bộ kịch bản hai chiều** (`docs/kich-ban-prototype.md`, `src/content/real/`):
  - Bổ sung lời thoại Hà Vy trước Thử thách 3 dùng ẩn dụ bộ lọc danh sách trong Excel (tick chọn nhiều ô trong Filter).
  - Bổ sung lời thoại chẩn đoán chi tiết cho các mã mới.

## 3. Công Thái Học Hiển Thị & Responsive (<= 1100px & Scaling 125%-150%)
- **Cấu trúc TopBar 1 hàng cố định** (`src/shared/ui/TopBar.tsx`, `src/styles/app.css`):
  - Chuyển sang Grid 3 cột, co gọn các bước không active thành dạng số tròn `[1]`, `[2]` khi $\le 1100px$, không còn bị vỡ thành 3 hàng.
- **Màn chiếu phòng Giải trình** (`src/debrief/ui/debrief.css`, `Projector.tsx`):
  - Giới hạn max-height kết hợp scrollbar độc lập và sticky header cho bảng 24 dòng, không bao giờ tràn viền màn chiếu.
- **Độc lập cuộn ResultTable** (`src/sql-challenge/ui/challenge.css`, `ResultTable.tsx`):
  - Tách vùng cuộn dữ liệu riêng biệt, cố định thanh công cụ "Lưu vào hồ sơ" luôn nằm trong tầm mắt.

## 4. Nâng Cấp Chuẩn Visual Novel (VN) & Tối Ưu Bố Cục Thử Thách
- **Thẻ Hồ Sơ Nhân Vật Chuyên Sâu (Chara Profile Card - Theo Mẫu Naomi Satō)**:
  - Tạo `src/evidence/character-profiles.ts`: Dữ liệu hồ sơ 5 nhân vật (Tuổi, Khóa, Chuyên ngành, Vai trò vụ án, Châm ngôn, Tiểu sử, Ghi chú điều tra).
  - Tạo `src/evidence/ui/CharaProfileView.tsx` & `chara-profile.css`: Thẻ hồ sơ full-body/full-art, dải nút chọn biểu cảm (Expressions selector), badge chức danh, quote trích dẫn.
  - Tích hợp vào `EvidenceNotebook.tsx` qua hệ thống 2 Tab trực quan: `🎒 Vật chứng & Manh mối` và `👥 Hồ sơ nhân vật (5)` kèm kích thước mở rộng `.notebook--expanded`.
- **Spotlight Giới Thiệu Nhân Vật Lần Đầu Xuất Hiện (Character Debut Splash)**:
  - Tạo `src/story/ui/CharacterDebutSplash.tsx` & `character-debut.css`: Cinematic card toàn màn hình với spotlight, ảnh toàn thân, tên Katakana/Việt, vai trò và châm ngôn khi nhân vật lần đầu lên sân khấu.
  - Tích hợp vào `src/app/GameScreen.tsx` dưới dạng derived state thuần React 19 (không effect, không cascading render).
- **Nâng Cấp Giao Diện Hòm Đồ RPG / Visual Novel Theo Mẫu Ảnh (3-Column Inventory Grid)**:
  - Tạo `src/evidence/ui/inventory-grid.css` và cập nhật `EvidenceNotebook.tsx` thành modal toàn màn hình phong cách cyberpunk/detective:
    - **Cột 1 (Character & Detective Stats):** Chân dung thám tử (Lê Minh Anh), 3 slot trang bị (Áo khoác CLB, Huy hiệu Thám tử, Khóa CSDL) và bảng chỉ số RPG (LOGIC, DATA, SQL, CLUES).
    - **Cột 2 (ITEMS Grid):** Lưới 20 ô vuông (5 cột x 4 hàng) viền neon đỏ, có slot rỗng chìm mờ, badge `SELECTED` phát sáng khi bấm chọn, bộ lọc danh mục (Tất cả / Manh mối / Tài liệu / SQL) và 2 nút hành động `[🔍 Kiểm tra chi tiết]`, `[⚡ Dùng trong SQL]`.
- **Khắc Phục Lỗi Giao Diện Hòm Đồ Bị Che, Tràn Thanh Cuộn & Không Tắt Được**:
  - **Sửa xung đột CSS `.notebook`**: Trong `app.css`, thuộc tính cũ `width: min(480px, 100%)` và thiếu dấu đóng ngoặc nhọn đã khiến Modal bị kẹt trong khung hẹp 480px ở mép màn hình, làm nút đóng và nửa bên phải bị trôi ra ngoài.
  - **Phủ toàn màn hình chuẩn xác**: Cưỡng chế `aside.notebook.inventory-modal` là `position: fixed !important; inset: 0 !important; width: 100vw !important; height: 100vh !important; display: flex !important; align-items: center !important; justify-content: center !important;`.
  - **Loại bỏ thanh cuộn mặc định xấu xí**: Thêm custom neon slim scrollbar (5px, bo tròn, phát sáng khi hover) cho các vùng danh sách, loại bỏ hoàn toàn thanh cuộn ngang xám to thô của trình duyệt.
  - **Đa phương thức tắt hòm đồ tiện lợi**:
    1. Bấm nút `✕ ĐÓNG` (nền đỏ neon nổi bật ở góc trên bên phải thanh navigation).
    2. Bấm vào bất kỳ đâu ngoài khung hòm đồ (Click outside backdrop to close).
    3. Nhấn phím `Escape`.

---

## 5. Kết Quả Nghiệm Thu Độc Lập
- **TypeScript (`npm run typecheck`):** 0 errors.
- **Unit & Integration Tests (`npm test`):** 73/73 test files passed, **632/632 tests passed (100% green)**.
- **Linter (`npm run lint`):** 0 errors, 0 warnings.
- **Vite Build (`npm run build`):** Thành công trong 602ms, toàn bộ assets và wasm đóng gói chuẩn xác.
- **Vite Preview Server:** Đang hoạt động mượt mà tại `http://localhost:4173/`.
