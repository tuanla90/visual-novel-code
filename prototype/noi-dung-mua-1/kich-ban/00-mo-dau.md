## Mở đầu: nhập học → tuần sinh hoạt công dân → Ngày hội CLB → Trung thu → chiều thứ Hai 23/09

<!-- Gói B19 (08/10/2026): viết lại theo bản thoại 6 (docs/mua-1/brief/b19-ban-6-thoai.md), Cảnh 0 tới Cảnh 4. Lời ở loi/00-mo-dau.md. -->
<!-- Mã chuỗi giữ tiền tố md-08 (tuần công dân), md-09 (Ngày hội), md-10 (Trung thu), md-11 (phòng CLB 23/09): lịch trong game suy ngày của mở đầu từ tiền tố này (src/mvp/engine/lich-ngay.ts). Chuỗi có câu Minh Anh tự xưng KHÔNG đặt tên md-09-ngay-hoi (máy chặn thẻ Minh Anh ở chuỗi ấy, may.ts canGioiThieu). -->

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
- [VÀO player]
- [VÀO tung]
- [LỜI md-10-trung-thu.1]
- [ẢNH cg-nam-ghe]
- [LỜI md-10-trung-thu.2]
- [BIẾT minh-anh lịch]
- [LỜI md-10-trung-thu.3]
- [KHÁM PHÁ kp-lam-quen]
  - nv:duy · x 30% · y 100% · rộng 15% → md-10-gap-duy · dấu: ! · nhãn: Anh áo khoác đen
  - nv:ha-vy · x 80% · y 100% · rộng 14% → md-10-gap-ha-vy · dấu: ! · nhãn: Bạn đeo kính
- [ĐI TỚI md-10-vy-soi]

### md-10-gap-duy — Trung thu: chào anh áo khoác đen dán băng dính lên chìa khóa {cảnh: san-ktx-trung-thu}

- [LỜI md-10-gap-duy.1]

### md-10-gap-ha-vy — Trung thu: chào bạn đeo kính ghi sổ nhỏ {cảnh: san-ktx-trung-thu}

- [ẢNH cg-so-ha-vy-gio]
- [LỜI md-10-gap-ha-vy.1]

### md-10-vy-soi — Trung thu: Tùng đố, Hà Vy soi Tùng làm mẫu {cảnh: san-ktx-trung-thu}

<!-- User 08/10 tối: Trung thu là màn dạy soi kính lúp. Lần 1 Hà Vy tự soi Tùng cho người chơi xem: kính tự tới từng điểm theo thứ tự viết, từ chi tiết kém quan trọng tới quan trọng (áo → băng mũi → bản đồ). Lần 2 người chơi tự soi quanh bàn bánh (md-10-chia-banh) và tự tìm ra bé Na, từ đó đủ tự tin ký phiếu. -->
- [VÀO tung]
- [LỜI md-10-vy-soi.1]
- [KHÁM PHÁ kp-soi-tung · quan sát tung/happy · Hà Vy soi · tự động]
  - vung:ao · x 50% · y 44% · rộng 22% → md-10-soi-ao · nhãn: Cái áo
  - vung:mui · x 57% · y 21% · rộng 14% → md-10-soi-mui · nhãn: Miếng băng trên mũi
  - vung:ban-do · x 82% · y 56% · rộng 24% → md-10-soi-ban-do · nhãn: Tờ bản đồ trên tay
- [LỜI md-10-vy-soi.2]
- [LỜI md-10-trung-thu.4]
- [ĐI TỚI md-10-chia-banh]

### md-10-soi-ao — Hà Vy soi Tùng: cái áo {cảnh: san-ktx-trung-thu}

- [LỜI md-10-soi-ao.1]

### md-10-soi-mui — Hà Vy soi Tùng: miếng băng trên mũi {cảnh: san-ktx-trung-thu}

- [LỜI md-10-soi-mui.1]

### md-10-soi-ban-do — Hà Vy soi Tùng: tờ bản đồ trên tay {cảnh: san-ktx-trung-thu}

- [LỜI md-10-soi-ban-do.1]

### md-10-chia-banh — Trung thu 19:15: chia bánh còn ba cái; người chơi tự soi quanh bàn {cảnh: san-ktx-trung-thu-ba-banh · cảnh cắt}

<!-- Đổi cảnh thì dàn xóa hết: cả nhóm đứng lại quanh bàn (người chơi cũng có mặt, xem chú thích ở md-10-trung-thu). -->
- [VÀO player]
- [VÀO minh-anh]
- [VÀO duy]
- [LỜI md-10-chia-banh.1]
- [BIẾT ha-vy câu nói]
- [LỜI md-10-chia-banh.2]
<!-- Lần soi thứ hai (user 08/10 tối: "giống bản cũ"): cảnh khám phá trên nền ba bánh có vệt vụn và đôi dép (ảnh sửa 08/10, art/nguon/topview-2026-10-08). Bốn đầu mối "!", đầu lân là chi tiết ẩn để loại đội múa lân. -->
- [KHÁM PHÁ kp-banh-trung-thu]
  - vung:dia-banh · x 11% · y 69% · rộng 14% → md-10-dia-banh · dấu: ! · nhãn: Đĩa bánh trên bàn
  - vung:vun-banh · x 33% · y 85% · rộng 12% → md-10-vun-banh · dấu: ! · nhãn: Nền sân dưới chân bàn
  - vung:den-ca-chep · x 42% · y 66% · rộng 14% → md-10-den-ca-chep · dấu: ! · nhãn: Đèn cá chép đỏ
  - vung:doi-dep · x 54% · y 76% · rộng 7% → md-10-doi-dep · dấu: ! · nhãn: Đôi dép cạnh đèn
  - vung:dau-lan · x 42% · y 44% · rộng 10% → md-10-dau-lan · nhãn: Đầu lân với cái trống
- [ĐI TỚI md-10-hoi-banh]

### md-10-dia-banh — Soi: đĩa còn ba bánh {cảnh: san-ktx-trung-thu-ba-banh}

- [LỜI md-10-dia-banh.1]

### md-10-vun-banh — Soi: vệt vụn từ chân bàn ra đèn cá chép {cảnh: san-ktx-trung-thu-ba-banh}

- [LỜI md-10-vun-banh.1]

### md-10-den-ca-chep — Soi: đèn cá chép giữa sân {cảnh: san-ktx-trung-thu-ba-banh}

- [LỜI md-10-den-ca-chep.1]

### md-10-doi-dep — Soi: đôi dép trẻ con cạnh đèn {cảnh: san-ktx-trung-thu-ba-banh}

- [LỜI md-10-doi-dep.1]

### md-10-dau-lan — Chi tiết ẩn: đội múa lân ngồi quanh trống {cảnh: san-ktx-trung-thu-ba-banh}

- [LỜI md-10-dau-lan.1]

### md-10-hoi-banh — Đoán ai lấy bánh từ những gì vừa soi {cảnh: san-ktx-trung-thu-ba-banh}

- [RẼ NHÁNH r-ai-lay-banh] ha-vy: "Theo cậu, ai lấy chiếc bánh?"
  - {id: tre-con} Một đứa trẻ. → hậu quả: đi tới md-10-doan-dung
  - {id: tung} Tùng. → hậu quả: đi tới md-10-doan-tung
  - {id: mua-lan} Một người trong đội múa lân. → hậu quả: đi tới md-10-doan-mua-lan

### md-10-doan-tung — Đoán Tùng: chưa có căn cứ {cảnh: san-ktx-trung-thu-ba-banh}

- [LỜI md-10-doan-tung.1]
- [ĐI TỚI md-10-hoi-banh]

### md-10-doan-mua-lan — Đoán đội múa lân: vệt vụn không chạy về phía ấy {cảnh: san-ktx-trung-thu-ba-banh}

- [LỜI md-10-doan-mua-lan.1]
- [ĐI TỚI md-10-hoi-banh]

### md-10-doan-dung — Người chơi tìm ra bé Na cạnh đèn cá chép; dòng thời gian tập dượt; ký phiếu {cảnh: san-ktx-trung-thu-ba-banh}

- [LỜI md-10-doan-dung.1]
- [ẢNH cg-be-na-den-ca-chep]
- [VÀO be-na]
- [LỜI md-10-doan-dung.2]
- [DÒNG THỜI GIAN dtg-banh]
- [LỜI md-10-doan-dung.3]
- [ĐI CÙNG md-11-phong-clb] Thứ Hai tuần sau, lên phòng CLB

### md-11-phong-clb — Cảnh 4: thứ Hai 23/09, cô Lan mang thư kiến nghị và phiếu gửi tới phòng CLB {cảnh: phong-clb}

<!-- Điểm lưu đầu Vụ 1 (đề bài B19 mục 2, 5.4): chơi lại Vụ 1 bắt đầu từ đây, không đi lại phần nhập học. -->
- [ĐIỂM LƯU VỤ vu1]
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
