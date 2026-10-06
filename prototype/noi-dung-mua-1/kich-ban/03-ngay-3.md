## Ngày 3 — Phiếu tra cứu (thứ Năm tuần 2)

<!-- Khung chương 1 (ĐÃ CHỐT C): CTSV (phiếu tra cứu, Quân giám sát) → căng tin (Hiếu; Tùng cá sai là Hiếu) → laptop. Điều mới: kéo kết quả lần trước (phiếu hai lớp) làm điều kiện; "bằng" ra 0 dòng → "bắt đầu bằng". Lời ở loi/03-ngay-3.md. -->

<!-- Gói B15 (06/10/2026): ba nơi không còn nối liền bằng [ĐI CÙNG]. Sau mỗi nơi người chơi về lại bản đồ; ghim Căng tin hiện sau khi xong việc ở CTSV, ghim Phòng CLB hiện sau căng tin (`sau:`), như ngày 2. CTSV và căng tin có cảnh khám phá riêng (n3-noi-ctsv, n3-noi-cang-tin) để buổi hỏi quay lại được. Chuỗi n3-ctsv và n3-cang-tin giữ nguyên mã vì tờ hỏi đáp gắn theo mã chuỗi. Ba ghim việc chính đứng trước hai ghim tùy chọn. Hết ngày do người chơi bấm ([HẾT NGÀY] cuối n3-laptop, không có chuỗi buổi tối). -->

### n3-mo — Sáng ngày 3: sang Phòng CTSV {cảnh: phong-clb}

- [LỜI n3-mo.1]
- [KHÁM PHÁ kp-bd-n3 · bản đồ · giờ 09:30]
  - ghim:toa-hanh-chinh · x 21% · y 54% · rộng 5% → n3-noi-ctsv · dấu: ! · có: co-lan, co-hanh · nhãn: Phòng Công tác sinh viên
  - ghim:cang-tin · x 88% · y 41% · rộng 5% → n3-noi-cang-tin · sau: n3-noi-ctsv · dấu: ! · nhãn: Căng tin
  - ghim:nha-clb · x 45% · y 17% · rộng 5% → n3-phong · sau: n3-noi-cang-tin · dấu: ! · nhãn: Phòng CLB
  - ghim:phong-may · x 73% · y 45% · rộng 5% → n3-bd-phong-may · dấu: ? · nhãn: Phòng máy
  - ghim:toa-b · x 48% · y 29% · rộng 5% → n3-bd-toa-b · dấu: ? · có: bac-tu · nhãn: Sảnh tòa B

### n3-noi-ctsv — Tới Phòng Công tác sinh viên: cô Lan ở quầy {cảnh: phong-ctsv}

- [KHÁM PHÁ kp-toi-n3-ctsv]
  - nv:co-lan · x 35% · y 100% · rộng 15% → n3-ctsv · dấu: ! · nhãn: Cô Lan
  - nv:quan · x 72% · y 100% · rộng 15% → n3-ctsv-quan · sau: n3-ctsv · dấu: ? · nhãn: Anh Quân

### n3-ctsv — CTSV: sổ niêm phong, phiếu yêu cầu tra cứu; Quân giám sát {cảnh: phong-ctsv}

- [HỎI ĐÁP n3-ctsv]
- [LỜI n3-ctsv.1]
- [VÀO quan]
- [KHÁM PHÁ kp-soi-quan · quan sát quan · Hà Vy soi]
  - vung:kinh · x 55% · y 19% · rộng 26% → n3-soi-kinh · nhãn: Cặp kính
  - vung:gi-le · x 50% · y 46% · rộng 24% → n3-soi-gi-le · nhãn: Áo gi lê len
  - vung:tay · x 14% · y 80% · rộng 20% → n3-soi-tay · nhãn: Hai tay chắp sau lưng
- [LỜI n3-ctsv.1b]
- [HẬU QUẢ] mở manh mối clue-can-ma-va-can-cu, mở manh mối clue-phieu-tra-cuu
- [LỜI n3-ctsv.2]

### n3-ctsv-quan — Hỏi thêm anh Quân (tùy chọn, sau khi đã có phiếu) {cảnh: phong-ctsv}

- [LỜI n3-ctsv-quan.1]

### n3-bd-phong-may — Bản đồ ngày 3 (tùy chọn): phòng máy khóa cửa, tờ giấy giờ mở cửa {cảnh: ngoai-phong-may}

- [KHÁM PHÁ kp-toi-n3-bd-phong-may]
  - nv:ha-vy · x 68% · y 100% · rộng 15% → n3-bd-phong-may-vao · dấu: ! · nhãn: Hà Vy
  - vung:dep · x 15.5% · y 81% · rộng 11% → n3-bd-phong-may-an · nhãn: Hai đôi dép trước cửa

### n3-bd-phong-may-vao — Tới nơi: Bản đồ ngày 3 (tùy chọn): phòng máy khóa cửa, tờ giấy giờ mở cửa {cảnh: ngoai-phong-may}

- [LỜI n3-bd-phong-may.1]

### n3-bd-phong-may-an — Chi tiết ẩn: Hai đôi dép trước cửa {cảnh: ngoai-phong-may}

- [LỜI n3-bd-phong-may-an.1]

### n3-bd-toa-b — Bản đồ ngày 3 (tùy chọn): bác Thịnh ở sảnh tòa B {cảnh: sanh-toa-b}

- [KHÁM PHÁ kp-toi-n3-bd-toa-b]
  - nv:bac-tu · x 78% · y 100% · rộng 16% → n3-bd-toa-b-vao · dấu: ! · nhãn: Bác bảo vệ
  - vung:binh-cuu-hoa · x 38.7% · y 55% · rộng 3% → n3-bd-toa-b-an · nhãn: Bình cứu hỏa

### n3-bd-toa-b-vao — Tới nơi: Bản đồ ngày 3 (tùy chọn): bác Thịnh ở sảnh tòa B {cảnh: sanh-toa-b}

- [HỎI ĐÁP n3-bd-toa-b-vao]
- [LỜI n3-bd-toa-b.1]

### n3-bd-toa-b-an — Chi tiết ẩn: Bình cứu hỏa {cảnh: sanh-toa-b}

- [LỜI n3-bd-toa-b-an.1]

### n3-soi-kinh — Quan sát Quân: cặp kính {cảnh: phong-ctsv}

- [LỜI n3-soi-kinh.1]

### n3-soi-gi-le — Quan sát Quân: áo gi lê len {cảnh: phong-ctsv}

- [LỜI n3-soi-gi-le.1]

### n3-soi-tay — Quan sát Quân: hai tay chắp sau lưng {cảnh: phong-ctsv}

- [LỜI n3-soi-tay.1]

### n3-noi-cang-tin — Tới căng tin: cậu bạn bàn bên đang nói to {cảnh: cang-tin}

- [KHÁM PHÁ kp-toi-n3-cang-tin]
  - nv:hieu · x 30% · y 100% · rộng 15% → n3-cang-tin · dấu: ! · nhãn: Cậu bàn bên

### n3-cang-tin — Căng tin: Hiếu nói xấu CLB {cảnh: cang-tin}

- [HỎI ĐÁP n3-cang-tin]
- [LỜI n3-cang-tin.1]

### n3-phong — Phòng CLB buổi chiều ngày 3: ai có việc nấy {cảnh: phong-clb}

- [LỜI n3-phong.1]
- [KHÁM PHÁ kp-phong-n3]
  - nv:duy · x 20% · y 100% · rộng 15% → n3-phong-duy · dấu: ! · nhãn: Duy: mở laptop
  - nv:ha-vy · x 45% · y 100% · rộng 15% → n3-phong-vy · dấu: ? · nhãn: Hà Vy: câu hỏi trên bảng
  - nv:minh-anh · x 72% · y 100% · rộng 15% → n3-phong-minh-anh · dấu: ? · nhãn: Minh Anh: chuyện anh Quân

### n3-phong-duy — Duy mở laptop (việc chính) {cảnh: phong-clb}

- [LỜI n3-phong-duy.1]
- [ĐI TỚI n3-laptop]

### n3-phong-vy — Hà Vy đọc câu hỏi mới trên bảng {cảnh: phong-clb}

- [LỜI n3-phong-vy.1]

### n3-phong-minh-anh — Minh Anh nói về việc bị giám sát {cảnh: phong-clb}

- [LỜI n3-phong-minh-anh.1]

### n3-laptop — Laptop phòng CLB: ai trong hai lớp có tên bắt đầu bằng H? {cảnh: phong-clb}

- [LỜI n3-laptop.1]
- [THỬ THÁCH c-ten-h]
- [ẢNH chibi-0-dong]
- [LỜI n3-laptop.2]
- [XONG VIỆC CHÍNH]
- [HẾT NGÀY] Về ký túc xá nghỉ
