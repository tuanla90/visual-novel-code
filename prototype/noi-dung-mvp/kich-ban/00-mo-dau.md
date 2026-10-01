## Mở đầu — tuần 1 → chiều thứ Hai tuần 2

<!-- Theo kịch bản khung mục 3, đã áp DX-01 (01/10/2026): bỏ md-02 bản đồ, md-04 căng tin, md-05 phòng máy; md-06 bảng tin gộp vào md-07. Nối: md-01 → md-03 → md-07 → md-08 → md-09. Thoại bản hội đồng v1 (29/09): giọng sinh viên miền Bắc, tớ/cậu. -->

### md-00-xe-buyt — Chủ nhật tuần 1: xuống xe buýt trước cổng trường {cảnh: cong-truong}

- [LỜI md-00-xe-buyt.1]

- [LỜI md-00-xe-buyt.2]
- [ĐI TỚI md-00-cong-ktx]

### md-00-cong-ktx — Kéo vali qua sân trường tới cổng ký túc xá {cảnh: cong-ktx}

- [LỜI md-00-cong-ktx.1]
- [ĐI TỚI md-00-sanh-ktx]

### md-00-sanh-ktx — Sảnh tầng một dãy nhà giữa: dạy bấm vật {cảnh: sanh-ktx}

- [LỜI md-00-sanh-ktx.1]

- [LỜI md-00-sanh-ktx.2]
- [KHÁM PHÁ kp-sanh-ktx]
  - obj-thong-bao-thang-may · x 12% · y 44% · rộng 4% → md-00-thang-may · nhãn: Xem tờ giấy trên cửa thang máy
  - obj-so-do-ktx · x 44% · y 40% · rộng 11% → md-00-so-do · nhãn: Xem bảng tin
  - nv:tung · x 80% · y 100% · rộng 17% → md-00-gap-tung · sau: md-00-thang-may, md-00-so-do · nhãn: Hỏi đường cậu bạn áo cam

### md-00-thang-may — Tờ giấy dán trên cửa thang máy {cảnh: sanh-ktx}

- [LỜI md-00-thang-may.1]

### md-00-so-do — Sơ đồ khu nhà trên bảng tin {cảnh: sanh-ktx}

- [LỜI md-00-so-do.1]

### md-00-gap-tung — Hỏi đường cậu bạn áo cam: tạo nhân vật {cảnh: sanh-ktx}

- [LỜI md-00-gap-tung.1]
- [TẠO NHÂN VẬT ten] tung (neutral): "Thế cậu tên gì?"
  - xúc xắc: Ngại nghĩ thì để tớ gieo xúc xắc đặt hộ cho. Đảm bảo không xui.
- [LỜI md-00-gap-tung.2]
- [TẠO NHÂN VẬT nganh] tung (neutral): "Cậu học ngành gì?"
  - lựa chọn: Kế toán · Quản trị kinh doanh · Tài chính – Ngân hàng · Marketing · Thương mại điện tử
- [LỜI md-00-gap-tung.3]
- [ĐI TỚI md-01-ktx]

### md-01-ktx — Phòng KTX 408, Chủ nhật chiều {cảnh: phong-ktx}

- [LỜI md-01-ktx.1]

- [ẢNH chibi-408-vali]
- [LỜI md-01-ktx.2]
- [ĐI TỚI md-03-toa-b]

### md-03-toa-b — Sảnh tòa B: cái hộp tôn cũ {cảnh: sanh-toa-b}

- [LỜI md-03-toa-b.1]
- [ĐI TỚI md-07-cong-ktx-toi]

### md-07-cong-ktx-toi — Cổng KTX, tối: chú Cường {cảnh: cong-ktx-dem}

- [LỜI md-07-cong-ktx-toi.1]
- [ĐI TỚI md-08-tuan-cong-dan]

### md-08-tuan-cong-dan — Chuyển cảnh: tuần sinh hoạt công dân {cảnh: hoi-truong}

- [LỜI md-08-tuan-cong-dan.1]
- [HIỆN TÀI LIỆU doc-the-lich-cua-toi]
- [ĐI TỚI md-09-ngay-hoi]

### md-09-ngay-hoi — Ngày hội CLB, thứ Bảy: lọc thử một lần {cảnh: nha-van-hoa}

- [LỜI md-09-ngay-hoi.1]

- [LỜI md-09-ngay-hoi.2]
- [LỌC THỬ lt-ngay-hoi · 3 dòng · chọn nganh = Du lịch]

```sql
SELECT ma_sv, ho_dem, ten, nganh FROM tra_cuu_k24 WHERE ten = 'Tùng';
```

- [LỜI md-09-ngay-hoi.3]
- [ĐI TỚI md-10-phong-clb]

### md-10-phong-clb — Phòng CLB, thứ Hai 16h: làm quen và dọn phòng {cảnh: phong-clb}

- [LỜI md-10-phong-clb.1]

- [LỜI md-10-phong-clb.2]
- [ẢNH chibi-clb-nhom]
- [HIỆN TÀI LIỆU doc-so-chi-linh]
- [TRA SỔ kiem-hai-lan · tâm đắc]
- [LỜI md-10-phong-clb.3]
- [HIỆN TÀI LIỆU doc-bao-cao-yeu]
- [LỜI md-10-phong-clb.4]
- [ĐI TỚI md-11-la-thu]

### md-11-la-thu — Phòng CLB, 16h40: lá thư {cảnh: phong-clb}

- [LỜI md-11-la-thu.1]
- [ẢNH chibi-la-thu]
- [HIỆN TÀI LIỆU doc-thu-che]
- [LỜI md-11-la-thu.2]
- [HẬU QUẢ] mở manh mối clue-chu-ky-h
- [LỜI md-11-la-thu.3]
