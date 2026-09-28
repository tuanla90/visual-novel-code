# CLB Thám Tử Dữ Liệu — Kịch bản prototype v0.1

> Kịch bản chơi được từ đầu đến cuối, mục tiêu 20–30 phút, cho người chơi là sinh viên năm nhất khối kinh tế, quen Excel, chưa học SQL, chơi một mình trên laptop.
>
> Cấu trúc theo [`prototype-scope-down-v0.1.md`](prototype-scope-down-v0.1.md) §2–§5. Ràng buộc theo [`lich-su-quyet-dinh.md`](../lich-su-quyet-dinh.md) (QĐ-011, QĐ-012, QĐ-016…QĐ-027, QĐ-033). Giọng nhân vật và vài câu thoại lấy từ [`vu1-buoi-giai-trinh-kich-ban.md`](../thiet-ke/vu1-buoi-giai-trinh-kich-ban.md).
>
> File này được viết để gói sau chuyển thành dữ liệu TypeScript một cách cơ học: mỗi dòng có một tiền tố cố định, xem mục "Quy ước đọc file".

## Quy ước đọc file

- Thứ tự phần: `intro` → `investigation` → `analysis` → `debrief` → `ending`. Chuỗi mở đầu của game: `intro-00`.
- Tiêu đề phần: `## Phần N — <Tên> {part: <part-id>}`. Tiêu đề chuỗi: `### <seq-id> — <mô tả> {scene: <scene-id>}`.
- Dòng bắt đầu bằng `- **<người nói>**` là lời thoại hiển thị. Mọi dòng khác là chỉ dẫn, không hiển thị nguyên văn.
- Dòng `> NHIỆM VỤ: …` đổi chữ trên thanh "Nhiệm vụ hiện tại" tại đúng vị trí của nó trong chuỗi.
- Một chuỗi chạy từ trên xuống. Chuỗi được mở từ một điểm xem xét, khi chạy xong, quay về cảnh đang đứng (không cần `[ĐI TỚI]`).
- `[ĐIỂM XEM XÉT]`: manh mối ghi ở "mở manh mối" được thêm vào Hồ sơ khi chuỗi của điểm đó chạy xong. Điểm đã xem được đánh dấu.
- `[HIỆN TÀI LIỆU <mã tài liệu>]`: hiện tài liệu đó (hình và chữ, xem mục Hồ sơ vật chứng) và thêm vào Hồ sơ.
- `[HỎI]` và `[CHỌN DÒNG]`: chọn sai → hiện phản hồi của lựa chọn đó, cho chọn lại, không phạt. Chọn đúng → hiện phản hồi rồi đi tiếp dòng kế.
- Lựa chọn của `[HỎI]`: `(A) {id: <id lựa chọn>} <lời lựa chọn> [ĐÚNG] → phản hồi: …`. Chữ (A), (B)… chỉ là nhãn khi viết, không hiển thị. Giao diện xáo thứ tự lựa chọn mỗi lần hiện câu hỏi; telemetry ghi `<mã câu hỏi>:<id lựa chọn>` (QĐ-035).
- `[THỬ THÁCH <mã>]` và `[SỬA TRUY VẤN <mã>]`: mở màn truy vấn theo thẻ cùng mã ở mục "Nội dung thử thách". Người chơi lưu vật chứng xong thì đi tiếp dòng kế.
- `[ĐIỀU KIỆN QUA] cần: …`: khi Hồ sơ có đủ các mục đã liệt kê thì hiện nút "Nhiệm vụ tiếp theo →". Bấm nút thì chuyển cảnh, sang chuỗi đích.
- Khối mã `sql` nằm ngay dưới một dòng `[DÀN DỰNG]` là nội dung hiển thị nguyên văn.
- Dấu `<br>` trong ô bảng tách các lời thoại chạy nối tiếp nhau.

## Nội dung thử thách

### Quy ước thẻ thử thách

- Trình tự một thử thách: (chỉ c1) các bước hướng dẫn → người chơi chạy truy vấn, không giới hạn số lần → khi chạy đúng: khung thành công và lời `[KHI ĐÚNG]` → câu hỏi đọc kết quả `[HỎI]` → nút "Lưu vào hồ sơ" → vật chứng vào Hồ sơ → quay về chuỗi kể chuyện. `debrief-fix` không có câu hỏi đọc kết quả (QĐ-024 đã có).
- `[BƯỚC n · nổi bật: <vùng>]`: bước hướng dẫn của Hà Vy; vùng là `from`, `select`, `where`, `run`, `preview` (nút "Xem 5 dòng đầu"). Bước tự chuyển khi người chơi làm xong thao tác đang nổi bật; không khóa thao tác (QĐ-021).
- `[GỢI Ý n]`: lời cho lần bấm "Hỏi Hà Vy" thứ n (n = 1, 2, 3; bấm thêm thì lặp mức 3). Đếm số lần bấm cho telemetry.
- `[KHI: <mã chẩn đoán>]`: nhận xét tự động khi một lần chạy chưa đúng rơi vào trường hợp đó; mỗi lần chạy chỉ hiện một nhận xét. Mã chẩn đoán là đề xuất cho gói sql-engine, đổi tên được. Thứ tự ưu tiên khi nhiều mã cùng khớp: lỗi không chạy được (`not-select`, `syntax-error`, `no-table`, `no-columns`, `no-value`, `connector-unset`) → mã trong thẻ thử thách, theo thứ tự liệt kê → mã ở "Nhận xét chung", theo thứ tự liệt kê → `other`.
- `dùng <mã gợi ý chuẩn>`: hiện đúng lời của câu gợi ý chuẩn đó (mục ngay dưới).
- Không có lời phạt, không trừ điểm; chạy sai chỉ nhận một nhận xét theo ý nghĩa (QĐ-018).
