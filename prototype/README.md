# CLB Thám Tử Dữ Liệu — prototype (vòng thử nghiệm 1)

Game học SQL kể chuyện, 20–30 phút, cho sinh viên năm nhất khối kinh tế chưa học SQL. Tài liệu này dành cho
**nhóm làm thử nghiệm**: cách chạy, cách quan sát một buổi, ảnh, quyền riêng tư, giới hạn đã biết.
Tài liệu sản phẩm: `../docs/prototype/prototype-scope-down-v0.1.md` (mục 9 là kế hoạch thử nghiệm). Mọi quyết định thiết kế:
`../docs/lich-su-quyet-dinh.md` (QĐ-xxx). Kịch bản (lời thoại, thẻ thử thách): `noi-dung/` (hướng dẫn trong `noi-dung/README.md`; kiểm bằng `npm run kiem-noi-dung`).
Kiến trúc code: `docs/ARCHITECTURE.md`. Bản đồ toàn repo: `../README.md`.

## 1. Chạy nhanh (máy phát triển)

Cần Node.js 20 trở lên (đã kiểm với Node 24). Trên Windows dùng **Git Bash** (PowerShell ở chế độ hạn chế
không chạy được `npm`).

```bash
cd prototype
npm ci          # cài đúng phiên bản trong package-lock.json
npm run dev     # mở http://localhost:5173
```

Trang tự nạp lại khi sửa code hay thêm ảnh. Không cần máy chủ nào khác: cơ sở dữ liệu SQLite chạy ngay trong
trình duyệt (sql.js, tệp `.wasm` ~650 KB được nạp sớm ở màn tiêu đề).

## 2. Bản chạy tĩnh cho buổi thử nghiệm

```bash
npm run build                 # kiểm kiểu rồi đóng gói vào dist/
npx vite preview --port 4173  # phục vụ dist/ tại http://localhost:4173
```

**Không mở `dist/index.html` trực tiếp bằng đúp chuột (`file://`)**: trình duyệt chặn nạp module ES và tệp
`.wasm` từ `file://`, trang sẽ trắng. Phải phục vụ qua HTTP — `vite preview` như trên, hoặc chép `dist/` lên
bất kỳ máy chủ tĩnh nào (tệp `.wasm` cần trả `Content-Type: application/wasm`; `vite preview` đã làm đúng).
Máy thử nghiệm không có Node thì chép thư mục `dist/` sang và dùng một máy chủ tĩnh bất kỳ.

Nội dung game chạy trên máy người chơi; tính năng chat AI cần kết nối mạng.

### Chat AI với Tùng và Hà Vy

Khung **Đi cùng** gửi câu hỏi tới OpenAI Responses API qua endpoint cùng máy chủ; khóa API không được đưa vào trình duyệt. Để chạy local bằng PowerShell:

```powershell
$env:OPENAI_API_KEY = "<API key của bạn>"
npm run dev
```

Khi deploy, đặt `OPENAI_API_KEY` trong biến môi trường của máy chủ Railway. `OPENAI_MODEL` là tùy chọn; mặc định là `gpt-6-astra`. Không đặt khóa API vào mã nguồn, tệp giao diện hay biến `VITE_*`.

Chat gửi tin nhắn, các câu thoại gần đây đã hiện, tên cảnh, việc đang làm và hồ sơ đã mở tới máy chủ AI để tạo phản hồi. Nội dung chat không lưu vào game save; API được gọi với `store: false`. Nếu chưa cấu hình khóa, khung chat báo rõ máy chủ chưa bật AI.

## 3. Trình duyệt hỗ trợ

- Chrome hoặc Edge bản mới (đã kiểm trên bản hiện hành).
- Firefox **121 trở lên** (giao diện dùng bộ chọn CSS `:has()`; bản cũ hơn xếp sai vị trí tài liệu và thẻ chữ).
- Màn hình mục tiêu: **1366×768** (laptop phổ thông). 1024×768 vẫn chơi được nhưng màn chiếu ở phần Giải trình
  xếp SQL trên, bảng dưới. Không hỗ trợ điện thoại.
- Cần bật JavaScript và cho phép lưu dữ liệu trang (sessionStorage/localStorage). Chế độ riêng tư nghiêm ngặt
  vẫn chơi được nhưng tiến độ và dữ liệu thử nghiệm mất khi đóng tab.

## 4. Hướng dẫn người quan sát (theo §9.2)

**Trước buổi**

1. Mở game với tham số **`?facilitator=1`** (ví dụ `http://localhost:4173/?facilitator=1`). Ở đáy màn hình có
   dải "Bảng người quan sát" — người chơi không thấy dải này khi mở địa chỉ không có tham số; hãy giữ dải thu
   gọn trong lúc người chơi chơi.
2. Bấm **Đặt lại phiên** trong bảng (hoặc "Chơi lại từ đầu" trên thanh trên) để người kế tiếp bắt đầu bằng một
   phiên trống: tiến độ về đầu, mã phiên ẩn danh mới; dữ liệu của phiên trước vẫn còn trong trình duyệt.
3. Hỏi ngắn về kinh nghiệm Excel, SQL, game kể chuyện — hai câu đầu đã có trong **khảo sát đầu game** ở màn tiêu
   đề (không bắt buộc, chỉ lựa chọn đóng). Câu về game kể chuyện hỏi miệng.

**Trong buổi**

4. Để người chơi tự chơi; khuyến khích nói thành tiếng điều đang nghĩ. **Không hướng dẫn** trừ khi game bị kẹt
   hoàn toàn. Ghi chú tay: chỗ dừng lâu, chỗ hỏi, chỗ bực.
5. Nếu kẹt thật (không thể đi tiếp), mở bảng → **Nhảy tới đầu phần** → chọn phần kế → xác nhận. Game tự chơi
   qua các bước còn lại và tự điền vật chứng bằng câu SQL chuẩn. Phiên đó bị **đánh dấu "có nhảy phần"**: các
   sự kiện tự động không tính vào số liệu, và phiên không được so với mốc "hoàn thành trong 35 phút".
6. Cuối game có **khảo sát cuối** (hai phần đáng nhớ nhất, đoạn gây khó chịu, có muốn chơi tiếp) — cũng chỉ lựa
   chọn đóng. Sau đó hỏi miệng theo §9.2 bước 4–5: giải thích lại `AND`, `OR`, ý nghĩa hai dòng kết quả; khoảnh
   khắc đáng nhớ; đoạn khó chịu; có muốn chơi tiếp.

**Sau buổi**

7. Mở rộng bảng người quan sát, đọc **Tóm tắt phiên**: thời gian từng phần, mỗi thử thách (số lần chạy, gợi ý,
   lỗi cú pháp/logic, thời gian tới lần chạy đầu, thời gian hoàn thành), **lựa chọn đầu tiên** ở hai câu đo
   lường "Hai dòng này nghĩa là gì?" và "CLB dựa vào đâu…", có hoàn thành không, khảo sát. Đối chiếu với ghi
   chú tay.
8. **Xuất dữ liệu thử nghiệm (JSON)**: một tệp chứa mọi phiên trong trình duyệt này kèm tóm tắt. Xuất sau mỗi
   buổi; xuất xong có thể **Xóa dữ liệu thử nghiệm** để trình duyệt không đầy (bảng có dòng trạng thái lưu và
   nhắc khi gần đầy).
9. **Đặt lại phiên** trước khi người kế tiếp ngồi vào.

Lưu ý: F5 (tải lại trang) giữ nguyên tiến độ và phiên; đóng tab thì mất tiến độ (dữ liệu thử nghiệm vẫn còn).
Nút "Chơi lại từ đầu" trên thanh trên có hộp xác nhận; người chơi bấm nhầm không mất gì ngoài tiến độ.

## 5. Ảnh

Mọi hình đang là **hình vẽ tạm bằng code**; ảnh thật thả vào là game tự dùng, không sửa code. Hướng dẫn đầy đủ
(tên tệp, kích thước, vùng an toàn, cách kiểm ảnh đã được nhận): `src/assets/art/README.md`. Tóm tắt quy ước
ảnh của người sinh ảnh:

- Thả tệp `.webp`/`.png`/`.jpg` vào **bất kỳ thư mục con nào** của `src/assets/` (ví dụ `src/assets/characters/`).
- Chân dung đặt tên theo bộ prompt `../art/prompts/prompts-characters-prototype-flow-v0.1.md`: `char-<nhân vật>-<biểu cảm>`;
  `char-<nhân vật>-anchor` là ảnh neo = biểu cảm gốc (Minh Anh, Hà Vy, Quân, Bác Tư: bình thường; Hoài: rụt rè).
  Thiếu biểu cảm thì game mượn ảnh neo. Ảnh nền xám phẳng (chưa trong suốt) được **tự tách nền** khi hiển thị,
  tệp gốc không bị sửa.
- Cảnh nền đặt tên theo `../art/prompts/prompts-background-prototype-v0.1.md`: `bg-prototype-club-room`, `bg-prototype-hallway`,
  `bg-prototype-hearing-room`. Tài liệu (`doc-letter`, `doc-bookmark`, `doc-handover-log`) chỉ là nền giấy, chữ do
  giao diện chồng lên.
- Kiểm nhanh: `npx vitest run src/shared/ui/visuals/art-slots.test.ts --reporter=verbose` in bảng ô ↔ tệp và
  báo tên tệp nghi gõ sai.

## 6. Quyền riêng tư

- Mọi dữ liệu **chỉ nằm trong trình duyệt** của máy chơi: tiến độ ở `sessionStorage` (khóa
  `clb-tham-tu-du-lieu`), dữ liệu thử nghiệm ở `localStorage` (các khóa bắt đầu bằng
  `clb-tham-tu-du-lieu:telemetry:v1`). Không gửi đi đâu, không máy chủ.
- Không thu tên thật, ngày sinh, quê quán; mã phiên là chuỗi ngẫu nhiên; khảo sát không có ô chữ tự do.
  Dữ liệu ghi gồm: mốc thời gian các bước, câu SQL người chơi chạy trong thử thách, lựa chọn (theo mã),
  câu trả lời khảo sát đóng.
- Xóa: nút **Xóa dữ liệu thử nghiệm** trong bảng người quan sát (xóa cả ghi chú phiên), hoặc xóa dữ liệu trang
  của trình duyệt. Tệp JSON đã xuất là bản sao — quản lý như tài liệu nghiên cứu.

## 7. Chạy kiểm tra

```bash
npm run typecheck   # TypeScript
npm test            # vitest, giới hạn 2 tiến trình (máy ít bộ nhớ)
npm run lint        # eslint
npm run build       # kiểm kiểu + đóng gói
```

Bộ test gồm: chơi trọn luồng bằng engine thật (`src/app/full-playthrough.test.ts`), kịch bản ↔ dữ liệu
(`src/content/real/faithfulness.test.ts`), số liệu bất biến 10/2/2/24 dòng, thứ tự lời chẩn đoán, tương phản
màu, ô ảnh, nhảy phần, bảng người quan sát. Chi tiết trong `docs/ARCHITECTURE.md` §4 và §8.

## 8. Giới hạn đã biết (vòng 1)

- Hình vẽ tạm cho mọi cảnh/nhân vật/tài liệu chưa có ảnh thật; ảnh thật thả vào đến đâu dùng đến đó.
- Tách nền chân dung chạy trên luồng chính: ảnh lớn có thể khựng 0,1–0,3 giây lần đầu mỗi ảnh (QĐ-064).
- Ở màn ≤ 1100 px, khung màn chiếu phần Giải trình có thể vượt mép màn chiếu vẽ trong ảnh nền (QĐ-062, để nguyên).
- Dấu "đã thử" ở màn chọn dòng lỗi mất khi tải lại trang; số lần thử vẫn đúng (QĐ-061 Đ3).
- Khảo sát chỉ lựa chọn đóng; câu hỏi mở làm bằng phỏng vấn miệng (QĐ-042).
- Không có tài khoản, không đồng bộ giữa máy: mỗi máy thử nghiệm xuất JSON riêng.
- Lời thoại viết cứng số liệu của bộ dữ liệu hiện tại (40 sinh viên, 8 lớp, 10 tên H, 24 dòng, 2 dòng): đổi
  dữ liệu phải đổi kịch bản (có test giữ).
