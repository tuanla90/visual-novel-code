## Nhiệm vụ phụ — Bốn mục trong sổ đã ký (thứ Sáu 25/10/2024, phòng CLB; Duy giao)

<!-- timeline-ref {"tables":["nhat_ky_su_dung"],"evidence":[{"id":"bon-buoi-xac-nhan","title":"Buổi sử dụng phòng CLB đã có xác nhận","table":"nhat_ky_su_dung","where":{"ma_buoi":["BUOI-02","BUOI-04","BUOI-06","BUOI-08"]},"splitBy":"ma_buoi","usedAt":"v2-tra","note":"Muốn kết luận có bốn buổi đã ký thì cảnh đọc sổ phải nằm sau buổi cuối cùng. Dòng dự kiến không phải buổi đã xảy ra."}]} -->

<!-- Nhiệm vụ phụ của lich.md (`{nhiệm vụ phụ: so-phong}`, mở sau Vụ 2 "Tin đồn"): nhận ở màn kết, chạy từ v2-mo, kết bằng [KẾT THÚC] rồi quay lại màn kết. Trước 01/10 tối đây là "Vụ 2" của gói ready-for-dev (docs/mvp/mua-1-kich-ban-ready-dev.md mục 5), nên mã chuỗi / thẻ vẫn mang tiền tố v2-. Một cảnh (phòng CLB), không bản đồ, không hạn, không uy tín, không kết xấu. Điều mới: gọt cột trước khi so (TRIM, LOWER) và xếp theo (ORDER BY). Câu mở rẽ theo kết Vụ 1 bằng cờ máy đặt (vu1-ket-that). Lời ở loi/20-phu-so-phong.md. -->

### v2-mo — Mở Vụ 2: hồ sơ cuối kỳ {cảnh: phong-clb}

- [NẾU có vu1-ket-that] → đi tới v2-mo-that
- [LỜI v2-mo.1]
- [ĐI TỚI v2-giao-viec]

### v2-mo-that — Mở Vụ 2 sau kết thật: không ai bắt nộp, vẫn làm {cảnh: phong-clb}

- [LỜI v2-mo-that.1]
- [ĐI TỚI v2-giao-viec]

### v2-giao-viec — Minh Anh giao việc, Duy đưa bản xuất sổ phòng {cảnh: phong-clb}

- [LỜI v2-giao-viec.1]
- [HIỆN TÀI LIỆU doc-v2-raw-logs]
- [HẬU QUẢ] mở manh mối clue-ma-phong-clb, mở manh mối clue-da-xac-nhan, đặt co.v2-log-mo
- [LỜI v2-giao-viec.2]
- [RẼ NHÁNH r-v2-huong] tung: "Tớ cá là có người sửa bản xuất để buổi sinh hoạt của mình biến mất. Đi hỏi xem ai đụng vào máy chứ?"
  - {id: kiem-ma} Xem cột mã phòng trước đã. → hậu quả: đi tới v2-tra
  - {id: tin-tung} Ừ, nghe cũng có lý. Ai là người xuất bản này? → hậu quả: đi tới v2-tin-tung

### v2-tin-tung — Theo phỏng đoán của Tùng: Duy tự xuất, chưa đụng dòng nào {cảnh: phong-clb}

- [LỜI v2-tin-tung.1]
- [ĐI TỚI v2-tra]

### v2-tra — Laptop CLB: lọc các buổi đã ký của phòng CLB {cảnh: phong-clb}

- [LỜI v2-tra.1]
- [THỬ THÁCH v2-loc-buoi]
- [GHI SỔ chuan-hoa]
- [GHI SỔ sap-xep]
- [LỜI v2-tra.2]
- [ẢNH chibi-phu-got-ma-phong]
- [ĐI TỚI v2-xac-nhan]

### v2-xac-nhan — Duy dò sổ giấy; Quân hỏi hồ sơ ghi câu nào {cảnh: phong-clb}

- [LỜI v2-xac-nhan.1]
- [HẬU QUẢ] mở manh mối clue-v2-so-giay
- [LỜI v2-xac-nhan.2]
- [VÀO quan]
- [LỜI v2-xac-nhan.3]
- [HỎI q-v2-ket-luan] quan: "Vậy mục hoạt động trong hồ sơ, các bạn định ghi câu nào?"
  - (A) {id: bon-muc} Tháng 10 có bốn mục sử dụng phòng CLB trong sổ, cả bốn có chữ ký xác nhận. [ĐÚNG] → phản hồi: **quan** (neutral): Câu ấy thì bản ghi và sổ giấy cùng đỡ được. Tôi không có ý kiến.
  - (B) {id: moi-nguoi} Cả bốn buổi, mọi thành viên CLB đều có mặt. → phản hồi: **ha-vy** (thinking): Khoan. Bảng có những cột nào? Có cột nào ghi ai tới dự không?
  - (C) {id: hieu-qua} Bốn buổi cho thấy CLB chắc chắn hoạt động hiệu quả. → phản hồi: **ha-vy** (day-kinh): Bốn dòng nói được là có bốn buổi đã ký. Hiệu quả hay không thì cột nào đo?
- [HẬU QUẢ] đặt co.v2-ket-luan-dung
- [LỜI v2-ket.1]
- [KẾT THÚC]
