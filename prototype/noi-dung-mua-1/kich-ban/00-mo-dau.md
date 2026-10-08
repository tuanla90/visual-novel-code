## Mở đầu: nhập học → tuần sinh hoạt công dân → Ngày hội CLB → Trung thu → chiều thứ Hai 23/09

<!-- Gói B19 (08/10/2026): viết lại theo bản thoại 6 (docs/mua-1/brief/b19-ban-6-thoai.md), Cảnh 0 tới Cảnh 4. Lời ở loi/00-mo-dau.md. -->
<!-- Mã chuỗi giữ tiền tố md-08 (tuần công dân), md-09 (Ngày hội), md-10 (Trung thu), md-11 (phòng CLB 23/09): lịch trong game suy ngày của mở đầu từ tiền tố này (src/mvp/engine/lich-ngay.ts). Chuỗi có câu Minh Anh tự xưng KHÔNG đặt tên md-09-ngay-hoi (máy chặn thẻ Minh Anh ở chuỗi ấy, may.ts canGioiThieu). -->
<!-- Lệnh mới của đề bài B19 mục 5 (agent MÁY dựng) nằm trong chú thích "MỚI:"; người điều phối gỡ chú thích khi gộp. -->

### md-00-tren-xe — Cảnh 0: trên xe buýt lên Hà Nội {cảnh: xe-buyt}

- [LỜI md-00-tren-xe.1]
- [TẠO NHÂN VẬT ten] player: "(Dòng đầu tờ giấy báo là họ tên mình.)"
  - xúc xắc: (Thôi, để xúc xắc chọn hộ một cái tên.)
- [LỜI md-00-tren-xe.2]
- [ĐI CÙNG md-00-cong-truong] Xuống xe

### md-00-cong-truong — Cảnh 0: xuống xe trước cổng trường {cảnh: cong-truong}

- [LỜI md-00-cong-truong.1]
- [ĐI CÙNG md-00-sanh-ktx] Theo biển chỉ đường vào ký túc xá

### md-00-sanh-ktx — Cảnh 1: sảnh ký túc xá, người chơi đứng nhìn cậu áo xanh chỉ đường cho bạn nữ kéo vali {cảnh: sanh-ktx}

<!-- Người chơi chỉ ĐỨNG NHÌN (đề bài B19 mục 3): hình người chơi không lên dàn, bạn nữ rời hình trước khi người chơi nói với cậu áo xanh. -->
- [LỜI md-00-sanh-ktx.1]
- [RA player]
- [LỜI md-00-sanh-ktx.2]
- [RA hoai]
- [LỜI md-00-sanh-ktx.3]
- [KHÁM PHÁ kp-sanh-ktx]
  - vung:lung-ao-xanh · x 87.5% · y 44% · rộng 9% → md-00-hoi-duong · dấu: ! · nhãn: Cậu áo xanh
  - obj-thong-bao-thang-may · x 10.5% · y 38.5% · rộng 3.6% → md-00-thang-may · nhãn: Tờ giấy trên cửa thang máy

### md-00-thang-may — Chi tiết ẩn: tờ giấy trên cửa thang máy {cảnh: sanh-ktx}

- [LỜI md-00-thang-may.1]

### md-00-hoi-duong — Cảnh 1: hỏi đường cậu áo xanh, hóa ra cùng phòng 408 {cảnh: sanh-ktx}

- [LỜI md-00-hoi-duong.1]
- [ĐI CÙNG md-01-phong-408] Lên phòng 408

### md-01-phong-408 — Cảnh 1: phòng 408 {cảnh: phong-ktx}

- [ẢNH cg-phong-408]
- [LỜI md-01-phong-408.1]
- [BIẾT tung câu nói, lịch]
- [LỜI md-01-phong-408.2]
- [ĐI CÙNG md-01-cong-ktx] Đi một vòng trường với Tùng

### md-01-cong-ktx — Cảnh 1: cổng ký túc xá, chú Cường {cảnh: cong-ktx}

- [LỜI md-01-cong-ktx.1]
- [BIẾT chu-cuong câu nói]
- [ĐI CÙNG md-08-tuan-cong-dan] Sang tuần sinh hoạt công dân

### md-08-tuan-cong-dan — Thứ Hai 09/09 tới thứ Sáu 13/09: tuần sinh hoạt công dân, thẻ lịch in theo khoa {cảnh: hoi-truong}

- [LỜI md-08-tuan-cong-dan.1]
- [ẢNH chibi-ngu-gat]
- [LỜI md-08-tuan-cong-dan.2]
- [ẢNH doc-the-lich-cua-toi]
- [LỜI md-08-tuan-cong-dan.3]
- [ĐI CÙNG md-09-ngay-hoi] Đi xem Ngày hội CLB với Tùng

### md-09-ngay-hoi — Cảnh 2: Ngày hội CLB, bàn CLB Thám Tử vắng tanh, anh sơ mi trắng dừng trước bàn {cảnh: nha-van-hoa}

- [LỜI md-09-ngay-hoi.1]
- [RA tung]
- [LỜI md-09-ngay-hoi.2]
- [ẢNH cg-ban-clb-vang]
- [LỜI md-09-ngay-hoi.3]
- [RA khanh]
- [ẢNH cg-phieu-trang]
- [ĐI TỚI md-09-ban-tham-tu]

### md-09-ban-tham-tu — Cảnh 2: Tùng đăng ký; chị giữ bàn là Minh Anh, mời tới Trung thu {cảnh: nha-van-hoa}

- [LỜI md-09-ban-tham-tu.1]
- [BIẾT minh-anh câu nói]
- [LỜI md-09-ban-tham-tu.2]
- [ĐI CÙNG md-10-trung-thu] Tối thứ Ba, xuống sân ký túc xá

### md-10-trung-thu — Cảnh 3: Trung thu ở sân ký túc xá, 19:00, đĩa bốn bánh {cảnh: san-ktx-trung-thu}

<!-- User 08/10: ở Cảnh 3 người chơi đang tham gia nên đứng trên dàn cùng mọi người (không áp luật đứng nhìn). Luật hiện chỉ cho [RA player]; [VÀO player] là lệnh mới cho B19-MÁY (luat-mvp.ts, case 'stage'). -->
<!-- MỚI: - [VÀO player] -->
- [VÀO tung]
- [LỜI md-10-trung-thu.1]
- [ẢNH cg-nam-ghe]
- [LỜI md-10-trung-thu.2]
- [BIẾT minh-anh lịch]
- [LỜI md-10-trung-thu.3]
- [KHÁM PHÁ kp-lam-quen]
  - nv:duy · x 30% · y 100% · rộng 15% → md-10-gap-duy · dấu: ! · nhãn: Anh áo khoác đen
  - nv:ha-vy · x 80% · y 100% · rộng 14% → md-10-gap-ha-vy · dấu: ! · nhãn: Bạn đeo kính
- [LỜI md-10-trung-thu.4]
- [ĐI TỚI md-10-chia-banh]

### md-10-gap-duy — Trung thu: chào anh áo khoác đen dán băng dính lên chìa khóa {cảnh: san-ktx-trung-thu}

- [LỜI md-10-gap-duy.1]

### md-10-gap-ha-vy — Trung thu: chào bạn đeo kính ghi sổ nhỏ {cảnh: san-ktx-trung-thu}

- [ẢNH cg-so-ha-vy-gio]
- [LỜI md-10-gap-ha-vy.1]

### md-10-chia-banh — Trung thu 19:15: chia bánh còn ba cái; quan sát tay từng người; dòng thời gian tập dượt {cảnh: san-ktx-trung-thu-ba-banh · cảnh cắt}

<!-- Đổi cảnh thì dàn xóa hết: cả nhóm đứng lại quanh bàn (người chơi cũng có mặt, xem chú thích ở md-10-trung-thu). -->
<!-- MỚI: - [VÀO player] -->
- [VÀO minh-anh]
- [VÀO duy]
- [LỜI md-10-chia-banh.1]
- [BIẾT ha-vy câu nói]
- [LỜI md-10-chia-banh.2]
<!-- Quan sát (đề bài B19 mục 3, Cảnh 3; user 08/10: cảnh đông người dùng chân dung đã duyệt đứng trên dàn, không dùng ảnh nhóm): bấm từng người, mỗi người một câu ngắn về tay họ, khớp ảnh chân dung (Minh Anh dáng neo: chống hông, đeo đồng hồ; Duy: cầm xấp bìa, chùm chìa ở thắt lưng; Hà Vy dáng neo: ôm cuốn sổ; Tùng happy: giơ ngón cái, tay kia cầm bản đồ; bé Na: giấu hai tay sau lưng, đầu ngón tay dính vụn bánh). Nền bg-mvp-san-ktx-trung-thu-ba-banh. -->
<!-- MỚI (thay khối [KHÁM PHÁ kp-trung-thu-tay] TẠM ngay dưới): - [KHÁM PHÁ kp-trung-thu-tay · dàn] -->
<!-- MỚI:   - nv:minh-anh → md-10-tay-minh-anh · nhãn: Chị Minh Anh · dấu: ! -->
<!-- MỚI:   - nv:duy → md-10-tay-duy · nhãn: Anh Duy · dấu: ! -->
<!-- MỚI:   - nv:ha-vy → md-10-tay-ha-vy · nhãn: Hà Vy · dấu: ! -->
<!-- MỚI:   - nv:tung/happy → md-10-tay-tung · nhãn: Tùng · dấu: ! -->
<!-- MỚI:   - nv:be-na → md-10-tay-be-na · nhãn: Bé gái · dấu: ! -->
<!-- TẠM (xóa khối [KHÁM PHÁ] dưới khi gộp B19-MÁY): chân dung đặt trên nền theo x/y -->
- [KHÁM PHÁ kp-trung-thu-tay]
  - nv:minh-anh · x 10% · y 100% · rộng 14% → md-10-tay-minh-anh · dấu: ! · nhãn: Chị Minh Anh
  - nv:duy · x 28% · y 100% · rộng 14% → md-10-tay-duy · dấu: ! · nhãn: Anh Duy
  - nv:ha-vy · x 46% · y 100% · rộng 14% → md-10-tay-ha-vy · dấu: ! · nhãn: Hà Vy
  - nv:tung/happy · x 64% · y 100% · rộng 14% → md-10-tay-tung · dấu: ! · nhãn: Tùng
  - nv:be-na · x 84% · y 100% · rộng 9% → md-10-tay-be-na · dấu: ! · nhãn: Bé gái
- [LỜI md-10-chia-banh.3]
<!-- MỚI: - [DÒNG THỜI GIAN dtg-banh] -->
- [LỜI md-10-chia-banh.4]
- [ĐI CÙNG md-11-phong-clb] Thứ Hai tuần sau, lên phòng CLB

### md-10-tay-minh-anh — Quan sát: tay chị Minh Anh {cảnh: san-ktx-trung-thu-ba-banh}

- [LỜI md-10-tay-minh-anh.1]

### md-10-tay-duy — Quan sát: tay anh Duy {cảnh: san-ktx-trung-thu-ba-banh}

- [LỜI md-10-tay-duy.1]

### md-10-tay-ha-vy — Quan sát: tay Hà Vy {cảnh: san-ktx-trung-thu-ba-banh}

- [LỜI md-10-tay-ha-vy.1]

### md-10-tay-tung — Quan sát: tay Tùng {cảnh: san-ktx-trung-thu-ba-banh}

- [LỜI md-10-tay-tung.1]

### md-10-tay-be-na — Quan sát: bé Na giấu tay sau lưng, ngón tay còn vụn bánh {cảnh: san-ktx-trung-thu-ba-banh}

- [LỜI md-10-tay-be-na.1]

### md-11-phong-clb — Cảnh 4: thứ Hai 23/09, cô Lan mang thư kiến nghị và phiếu gửi tới phòng CLB {cảnh: phong-clb}

<!-- Điểm lưu đầu Vụ 1 (đề bài B19 mục 2, 5.4): chơi lại Vụ 1 bắt đầu từ đây, không đi lại phần nhập học. -->
<!-- MỚI: - [ĐIỂM LƯU VỤ vu1] -->
- [LỜI md-11-phong-clb.1]
- [KHÁM PHÁ kp-thu-phieu]
  - vung:la-thu · x 52% · y 47% · rộng 7% → md-11-la-thu · dấu: ! · nhãn: Lá thư kiến nghị
  - vung:phieu-gui · x 70% · y 50% · rộng 6% → md-11-phieu-gui · dấu: ! · nhãn: Tờ phiếu gửi
  - vung:tu-sat · x 93% · y 55% · rộng 9% → md-11-tu-sat · nhãn: Cái tủ sắt
- [LỜI md-11-phong-clb.2]

### md-11-la-thu — Quan sát: lá thư kiến nghị không tên người viết {cảnh: phong-clb}

- [HIỆN TÀI LIỆU doc-thu-kien-nghi]
- [LỜI md-11-la-thu.1]

### md-11-phieu-gui — Quan sát: phiếu gửi, dòng người nộp ký "Hoài" {cảnh: phong-clb}

- [LƯU BẰNG CHỨNG ev-phieu-gui-hoai]
- [LỜI md-11-phieu-gui.1]

### md-11-tu-sat — Chi tiết ẩn: cái tủ sắt cũ ở góc phòng {cảnh: phong-clb}

- [LỜI md-11-tu-sat.1]
