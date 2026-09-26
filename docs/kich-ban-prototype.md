# CLB Thám Tử Dữ Liệu — Kịch bản prototype v0.1

> Kịch bản chơi được từ đầu đến cuối, mục tiêu 20–30 phút, cho người chơi là sinh viên năm nhất khối kinh tế, quen Excel, chưa học SQL, chơi một mình trên laptop.
>
> Cấu trúc theo `prototype-scope-down-v0.1.md` §2–§5. Ràng buộc theo `lich-su-quyet-dinh.md` (QĐ-011, QĐ-012, QĐ-016…QĐ-027, QĐ-033). Giọng nhân vật và vài câu thoại lấy từ `vu1-buoi-giai-trinh-kich-ban.md`.
>
> File này được viết để gói sau chuyển thành dữ liệu TypeScript một cách cơ học: mỗi dòng có một tiền tố cố định, xem mục "Quy ước đọc file".

## Quy ước đọc file

- Thứ tự phần: `intro` → `investigation` → `analysis` → `debrief` → `ending`. Chuỗi mở đầu của game: `intro-01`.
- Tiêu đề phần: `## Phần N — <Tên> {part: <part-id>}`. Tiêu đề chuỗi: `### <seq-id> — <mô tả> {scene: <scene-id>}`.
- Dòng bắt đầu bằng `- **<người nói>**` là lời thoại hiển thị. Mọi dòng khác là chỉ dẫn, không hiển thị nguyên văn.
- Dòng `> NHIỆM VỤ: …` đổi chữ trên thanh "Nhiệm vụ hiện tại" tại đúng vị trí của nó trong chuỗi.
- Một chuỗi chạy từ trên xuống. Chuỗi được mở từ một điểm xem xét, khi chạy xong, quay về cảnh đang đứng (không cần `[ĐI TỚI]`).
- `[ĐIỂM XEM XÉT]`: manh mối ghi ở "mở manh mối" được thêm vào Hồ sơ khi chuỗi của điểm đó chạy xong. Điểm đã xem được đánh dấu.
- `[HIỆN TÀI LIỆU x]`: hiện tài liệu x (hình và chữ, xem mục Hồ sơ vật chứng) và thêm vào Hồ sơ.
- `[HỎI]` và `[CHỌN DÒNG]`: chọn sai → hiện phản hồi của lựa chọn đó, cho chọn lại, không phạt. Chọn đúng → hiện phản hồi rồi đi tiếp dòng kế.
- `[THỬ THÁCH x]` và `[SỬA TRUY VẤN x]`: mở màn truy vấn theo thẻ x ở mục "Nội dung thử thách". Người chơi lưu vật chứng xong thì đi tiếp dòng kế.
- `[ĐIỀU KIỆN QUA] cần: …`: khi Hồ sơ có đủ các mục đã liệt kê thì hiện nút "Nhiệm vụ tiếp theo →". Bấm nút thì chuyển cảnh, sang chuỗi đích.
- Khối mã `sql` nằm ngay dưới một dòng `[DÀN DỰNG]` là nội dung hiển thị nguyên văn.
- Dấu `<br>` trong ô bảng tách các lời thoại chạy nối tiếp nhau.

---

## Phần 1 — Mở đầu {part: intro}

### intro-01 — Phòng CLB, lá thư và việc được nhờ {scene: clb-room}

> NHIỆM VỤ: Nghe Minh Anh kể về vụ việc

- [DÀN DỰNG] Cảnh phòng CLB (tông ấm): tủ hồ sơ cũ, bảng trắng, ba cái ghế. Chưa có điểm xem xét. Space/Enter để qua lời.
- **narrator**: Tuần thứ hai năm nhất. Bạn vừa ghi danh vào CLB Thám Tử được ba ngày.
- **minh-anh** (worried): Rồi, việc hôm nay là… giữ lại cái phòng này.
- **minh-anh** (neutral): Ngày xưa CLB phá vụ bằng mắt và chân: quan sát hiện trường, hỏi nhân chứng, đọc dấu vết.
- **minh-anh** (worried): Rồi trường chuyển hết lên hệ thống số. Manh mối nằm trong dữ liệu, mà cả CLB không ai đọc nổi.
- **ha-vy** (neutral): Thế là vụ giải được ít dần, người bỏ đi dần. Giờ còn ba người, tính cả cậu.
- **minh-anh** (worried): Sáng nay, Phòng Công tác sinh viên chuyển cho CLB bản chụp một lá thư lấy từ hộp góp ý.
- **minh-anh** (neutral): Thư đề nghị thu hồi phòng của CLB, vì "CLB không còn giải quyết được việc gì".
- **ha-vy** (thinking): Câu này… hơi đau.
- **minh-anh** (neutral): Nhưng Phòng CTSV không nhờ mình tìm thủ phạm.
- **minh-anh** (neutral): Họ nhờ xác minh ai đã trực tiếp bỏ lá thư, để hỏi nguồn gốc thư và làm rõ quy trình tiếp nhận.
- **ha-vy** (smile): Một CLB "không giải quyết được việc gì" mà làm xong việc này thì…
- **minh-anh** (happy): …thì lá thư tự bác chính nó.
- [ĐI TỚI intro-02]

### intro-02 — Quyền xem dữ liệu trong một buổi {scene: clb-room}

- **player**: Vậy mình sẽ được xem dữ liệu sinh viên ạ?
- **minh-anh** (neutral): Một view tối thiểu thôi em: mã sinh viên, họ đệm, tên, lớp, câu lạc bộ.
- **ha-vy** (neutral): Không có ngày sinh, quê quán, số điện thoại hay chỗ ở KTX. Việc cần gì thì cấp nấy.
- **minh-anh** (worried): Quyền chỉ có trong buổi làm việc hôm nay. Hết buổi là hết.
- **minh-anh** (neutral): Em quen Excel đúng không? Hà Vy chỉ cách đọc dữ liệu, em cầm máy.
- **ha-vy** (smile): Yên tâm. Bảng dữ liệu cũng chỉ là một cái sheet to thôi.
- **minh-anh** (neutral): Nhưng trước khi đụng vào dữ liệu, xem kỹ lá thư đã.
- [ĐI TỚI inv-01]

---

## Phần 2 — Điều tra {part: investigation}

(đang viết)

---

## Phần 3 — Phân tích dữ liệu {part: analysis}

(đang viết)

---

## Phần 4 — Giải trình {part: debrief}

(đang viết)

---

## Phần 5 — Kết {part: ending}

(đang viết)

---

## Nội dung thử thách

(đang viết)

---

## Hồ sơ vật chứng

(đang viết)

---

## Tự kiểm

(đang viết)
