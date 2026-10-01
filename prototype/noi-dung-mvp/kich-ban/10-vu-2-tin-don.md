## Vụ 2 — Tin đồn (thứ Tư 09/10/2024)

<!-- Khung Vụ 2 theo dàn ý mùa 1 (docs/mvp/mua-1-dan-y-nam-khanh.md mục 3). Vụ sau của lich.md: chạy từ tin-mo sau màn kết Vụ 1, kết bằng [KẾT THÚC]. Điều mới: lấy PHIẾU ĐÃ GHIM làm nguồn để lọc tiếp (thẻ "Kiểu: lọc tiếp", câu hiện thành WITH … AS) và SONG TUYẾN: Nam chỉ hai hướng (nhật ký đăng nhập / bảng đăng ký xưởng), đi hướng nào trước cũng được, đi một hướng rồi về cũng được. Đi đủ hai hướng thì nhận lời nhắn thứ hai của chị Linh. Mảnh ghép: tin gốc gửi từ tài khoản kênh của CLB Robotics, 22:40 tối 07/10, từ máy văn phòng xưởng. Câu hỏi để lại: Nam có phải người gửi? Hết vụ Nam vẫn CHƯA được gỡ nghi (việc của Vụ 3). Lời ở loi/10-vu-2-tin-don.md. -->

### tin-mo — Tin đồn về CLB; lọc các tin mang câu đó {cảnh: phong-clb}

- [LỜI tin-mo.1]
- [HIỆN TÀI LIỆU doc-tin-don]
- [HẬU QUẢ] mở manh mối clue-noi-dung-tin
- [LỜI tin-mo.2]
- [THỬ THÁCH c-tin-don]
- [LỜI tin-mo.3]
- [ĐI TỚI tin-gap-nam]

### tin-gap-nam — Xưởng Robotics: gặp Nam; lấy phiếu làm nguồn, tìm tin gốc {cảnh: xuong-robot}

- [LỜI tin-gap-nam.1]
- [HẬU QUẢ] mở manh mối clue-tin-goc
- [THỬ THÁCH c-tin-goc]
- [LỜI tin-gap-nam.2]
- [HẬU QUẢ] mở manh mối clue-ngay-gui
- [RẼ NHÁNH r-tin-tuyen] nam: "Hai chỗ đấy. Xem chỗ nào trước thì tùy các cậu."
  - {id: may} Xem nhật ký đăng nhập của kênh. → hậu quả: đi tới tin-tuyen-may
  - {id: xuong} Ra cửa xem bảng đăng ký dùng xưởng. → hậu quả: đi tới tin-tuyen-xuong

### tin-tuyen-may — Tuyến dữ liệu: nhật ký đăng nhập của kênh {cảnh: xuong-robot}

- [LỜI tin-tuyen-may.1]
- [THỬ THÁCH c-tin-may]
- [LỜI tin-tuyen-may.2]
- [NẾU có clue-xuong-toi] → đi tới tin-ket
- [RẼ NHÁNH r-tin-sau-may] ha-vy: "Còn chỗ thứ hai Nam chỉ: bảng đăng ký dùng xưởng. Xem nốt, hay về báo chị Minh Anh?"
  - {id: di-not} Ra cửa xem nốt bảng đăng ký. → hậu quả: đi tới tin-tuyen-xuong
  - {id: ve} Về báo chị Minh Anh. → hậu quả: đi tới tin-ket

### tin-tuyen-xuong — Tuyến hiện trường: bảng đăng ký dùng xưởng {cảnh: xuong-robot}

- [LỜI tin-tuyen-xuong.1]
- [HIỆN TÀI LIỆU doc-lich-xuong]
- [HẬU QUẢ] mở manh mối clue-xuong-toi
- [LỜI tin-tuyen-xuong.2]
- [NẾU có ev-tin-may] → đi tới tin-ket
- [RẼ NHÁNH r-tin-sau-xuong] ha-vy: "Còn chỗ thứ nhất Nam chỉ: nhật ký đăng nhập của kênh. Xem nốt, hay về báo chị Minh Anh?"
  - {id: di-not} Xem nốt nhật ký đăng nhập. → hậu quả: đi tới tin-tuyen-may
  - {id: ve} Về báo chị Minh Anh. → hậu quả: đi tới tin-ket

### tin-ket — Về phòng CLB báo lại (mới đi một hướng) {cảnh: phong-clb}

- [NẾU có ev-tin-may và có clue-xuong-toi] → đi tới tin-ket-ky
- [LỜI tin-ket.1]
- [ĐI TỚI tin-ket-luan]

### tin-ket-ky — Về phòng CLB báo lại (đủ hai hướng): lời nhắn thứ hai của chị Linh {cảnh: phong-clb}

- [LỜI tin-ket-ky.1]
- [HẬU QUẢ] mở manh mối clue-loi-nhan-linh-2
- [LỜI tin-ket-ky.2]
- [ĐI TỚI tin-ket-luan]

### tin-ket-luan — Nói chắc được điều gì; cả nhóm bắt đầu chia ý về Nam {cảnh: phong-clb}

- [HỎI q-tin-ket-luan] minh-anh: "Vậy tới giờ, mình nói chắc được điều gì?"
  - (A) {id: tai-khoan} Tin gốc gửi từ tài khoản kênh của CLB Robotics, 22:40 tối 07/10. Ai ngồi gửi thì chưa biết. [ĐÚNG] → phản hồi: **minh-anh** (neutral): Đúng chừng ấy. Chị báo cô Lan cũng đúng chừng ấy.
  - (B) {id: nam-gui} Nam là người gửi, vì Nam trực kênh. → phản hồi: **ha-vy** (thinking): Trực kênh là việc được giao. Trên phiếu có dòng nào ghi ai ngồi gửi không?
  - (C) {id: robotics-hai} CLB Robotics cố tình tung tin để hại CLB mình. → phản hồi: **ha-vy** (day-kinh): Phiếu ghi một tài khoản với một giờ gửi. "Cố tình" với "cả CLB" thì cột nào nói?
- [LỜI tin-ket-luan.1]
- [KẾT THÚC]
