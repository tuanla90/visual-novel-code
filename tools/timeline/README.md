# Timeline Mùa 1

## Highlight chữ

`prototype/src/shared/highlight/engine.js` là engine dùng chung cho timeline và game: tên người (xanh dương), thời gian (vàng nâu), địa điểm (xanh lá) và vật phẩm/chứng cứ (tím). Timeline nhúng engine khi sinh HTML, xử lý text node và bỏ qua SQL, code, nút điều khiển. Game dùng `HighlightText` qua React context, chỉ tô phần chữ thường của `CodeText`, giữ nguyên hiệu ứng gõ chữ. Có thể dùng lại với `tokenize(text)`, `apply(element, categories)` và `clear(element)`.

`highlight-lexicon.mjs` lấy từ điển từ `nhan-vat.md`, `canh.md`, `dia-diem.md`, các hồ sơ và mã chứng cứ trong dữ liệu timeline. Thêm hoặc đổi nội dung chuẩn rồi sinh lại HTML để cập nhật từ điển; không sửa HTML đã sinh. Thời gian được nhận diện theo mẫu ngày/giờ/thứ. Các checkbox trên trang bật/tắt từng nhóm và giữ lựa chọn khi lọc hoặc đổi cách nhóm.

Kiểm tra engine và tích hợp HTML: `node --test --test-isolation=none tools/timeline/highlight.test.mjs`.

Sinh HTML độc lập: `npm run timeline:mua-1` ở gốc repository. Trên PowerShell bị giới hạn language mode có thể dùng `npm.cmd run timeline:mua-1`.

Nguồn canon là `prototype/noi-dung-mvp/lich.md`, `du-lieu.md`, `kich-ban/*.md`. Ngày Vụ 1 được tính trực tiếp bằng `lichNgay`/`mocLich` của engine game. Ý nghĩa mở khóa được đối chiếu với `phuMoDuoc` và hành động `lam-nhiem-vu-phu` trong `may.ts`: ngày bối cảnh không phải điều kiện ngày; hiện chỉ có điều kiện tiến độ, chưa có hạn thời gian.

Trong kịch bản, comment `<!-- timeline-ref {JSON} -->` chọn các bản ghi cần giữ thành mốc quyết định. `where` tham chiếu mã/cột, không sao chép ngày. `dateFrom` lấy ngày của một bản ghi ở bảng khác; `join` nối khóa phiên để lấy giờ; `dependsOn` nối chứng cứ đã có với vụ sau. Ngày/giờ luôn lấy từ bảng chuẩn. Tham chiếu sai mã, cột, cảnh hoặc khóa nối làm generator báo lỗi.

Để tương thích bộ đọc kịch bản, mỗi comment metadata nằm trên một dòng; giữa các dấu đóng `}` liên tiếp có khoảng trắng để không bị nhận nhầm là biến `{{…}}`. Chạy trình kiểm tra nội dung game sau khi thêm metadata.

Các bản ghi còn lại của bảng liên quan được gộp thành “Sự kiện liên đới”. Chứng cứ không có cột ngày được giữ ở nhóm chưa khai ngày và sinh ghi chú cần xử lý, không tự gán ngày điều tra cho nó.

`docs/mvp/timeline-mua-1.plan.json` chỉ chứa lịch và cửa sổ đề xuất. `ref` tham chiếu vụ trong lịch canon; `windowMode: activation` là khoảng nhận nhiệm vụ, `story-span` là khoảng diễn ra của vụ. Các khoảng này chưa được runtime thi hành. Cửa sổ nhiệm vụ phụ hiện tại có đầu theo cờ hoàn tất và đầu cuối mở; mốc vụ trước chỉ là tham chiếu để vẽ, không phải ngày mở chính xác.

`timeline-mua-1.calendar.json` chứa bối cảnh ngày đặc biệt. Nó không tạo event hay điều kiện runtime.

Giao diện nằm trong `template.html`, `timeline.css`, `timeline-ui.js`; không sửa HTML đã sinh. Kiểm tra hồi quy lịch và tương tác: `node --experimental-strip-types --test --test-isolation=none tools/timeline/timeline.test.mjs` (dùng jsdom đã có trong prototype; không cần tạo subprocess).
