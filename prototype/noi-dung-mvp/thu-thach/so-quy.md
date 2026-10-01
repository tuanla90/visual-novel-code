<!-- Thẻ thử thách Vụ 5 "Sổ quỹ" (kich-ban/13-vu-5-so-quy.md). c-dat-ma-khong-co (nối sổ đặt hàng với bảng kiểm kê theo tên linh kiện, lọc kho = 0 → 3 đơn, đúng ba đơn mượn tên Nam); c-chi-tham-tu (nối sổ chi với bảng quỹ theo mã quỹ, lọc quỹ CLB Thám Tử → phiếu 6 khoản); c-chi-theo-nguoi-duyet (tổng hợp: gom theo người duyệt, đếm + TỔNG — điều mới); c-chi-vuot-muc (tổng hợp: gom như trên, thêm TRUNG BÌNH, chỉ giữ nhóm có tổng lớn hơn ngưỡng giải trình một triệu — điều mới, HAVING → 1 dòng Khánh). Hội đồng vòng 1: tách ba đại lượng, phiếu đầu không nói tiền đã chi. Lời "Khi …": loi/tt-so-quy.md. -->

### c-dat-ma-khong-co — Đơn nào đặt mua thứ mà trong kho không có một cái? {challenge: c-dat-ma-khong-co}

- Tiêu đề: Sổ đặt hàng so với kiểm kê
- Đề bài hiển thị: Nối sổ đặt hàng với bảng kiểm kê của Nam. Đơn nào đặt mua thứ mà trong kho đang là số không?
- Manh mối liên quan: clue-so-luong-co-0
- Nối được với: kiem_ke
- Mục tiêu học: Ôn nối bảng với một bảng mới, khóa nối là tên linh kiện; lọc trên cột của bảng thứ hai.
- Số dòng kỳ vọng: 3
- SQL chuẩn:

```sql
SELECT ma_don, nguoi_dat, so_tien, so_luong_co FROM don_linh_kien JOIN kiem_ke ON don_linh_kien.linh_kien = kiem_ke.linh_kien WHERE so_luong_co = 0;
```

- [LỜI c-dat-ma-khong-co.1]
- Vật chứng lưu vào hồ sơ: ev-dat-ma-khong-co
  - Tiêu đề: Ba đơn đặt mua thứ không có trong kho
  - Mô tả: Kết quả nối sổ đặt hàng với kiểm kê: động cơ servo, mạch điều khiển, khung nhôm — ba đơn đứng tên Nam từ máy văn phòng xưởng, ghi đã duyệt, mà kho không có một cái. Tiền có thật sự xuất khỏi quỹ nào thì phải xem sổ quỹ.

### c-chi-tham-tu — Khoản chi nào ghi vào quỹ CLB Thám Tử? {challenge: c-chi-tham-tu}

- Tiêu đề: Sổ chi nối với bảng quỹ
- Đề bài hiển thị: Sổ chi ghi mã quỹ; bảng quỹ cho biết mã nào là quỹ của CLB nào. Khoản chi nào ghi vào quỹ CLB Thám Tử?
- Manh mối liên quan: clue-quy-tham-tu
- Nối được với: quy
- Mục tiêu học: Nối theo mã quỹ rồi lọc theo cột của bảng quỹ; ghim thành phiếu để gom.
- Số dòng kỳ vọng: 6
- SQL chuẩn:

```sql
SELECT ma_chi, ma_don, so_tien, nguoi_duyet FROM khoan_chi JOIN quy ON khoan_chi.ma_quy = quy.ma_quy WHERE clb = 'THAM_TU';
```

- [LỜI c-chi-tham-tu.1]
- Vật chứng lưu vào hồ sơ: ev-chi-tham-tu
  - Tiêu đề: Sáu khoản chi ghi vào quỹ CLB Thám Tử
  - Mô tả: Kết quả nối sổ chi với bảng quỹ: sáu khoản ghi vào quỹ CLB Thám Tử. Ba khoản văn phòng phẩm nhỏ do Minh Anh duyệt; ba khoản lớn gắn với ba đơn linh kiện, người duyệt ghi là Khánh.

### c-chi-theo-nguoi-duyet — Mỗi người duyệt bao nhiêu khoản, tổng bao nhiêu tiền? {challenge: c-chi-theo-nguoi-duyet}

- Kiểu: tổng hợp
- Nguồn: ev-chi-tham-tu
- Tiêu đề: Khoản chi gom theo người duyệt
- Đề bài hiển thị: Lấy phiếu sáu khoản làm nguồn. Gom theo người duyệt: đếm số khoản, tính tổng số tiền.
- Mục tiêu học: Tổng trên mỗi nhóm (SUM): đếm dòng chưa nói hết, phải cộng tiền.
- Số dòng kỳ vọng: 2
- SQL chuẩn:

```sql
SELECT nguoi_duyet, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien FROM @ev-chi-tham-tu GROUP BY nguoi_duyet;
```

- Vật chứng lưu vào hồ sơ: ev-chi-theo-nguoi-duyet
  - Tiêu đề: Minh Anh 3 khoản, 450.000; Khánh 3 khoản, 2.400.000
  - Mô tả: Kết quả gom theo người duyệt: Minh Anh ba khoản, tổng 450.000; Khánh ba khoản, tổng 2.400.000. Cùng số khoản, tiền gấp hơn năm lần.

### c-chi-vuot-muc — Người duyệt nào có tổng chi vượt ngưỡng giải trình, mỗi khoản trung bình bao nhiêu? {challenge: c-chi-vuot-muc}

- Kiểu: tổng hợp
- Nguồn: ev-chi-tham-tu
- Tiêu đề: Chỉ giữ nhóm vượt ngưỡng giải trình
- Đề bài hiển thị: Gom theo người duyệt như vừa rồi, tính thêm trung bình mỗi khoản, nhưng chỉ giữ nhóm có tổng lớn hơn một triệu.
- Manh mối liên quan: clue-han-muc
- Mục tiêu học: Trung bình trên nhóm (AVG) và lọc nhóm sau khi gom (HAVING): điều kiện đặt lên con số của cả nhóm, không lên từng dòng.
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT nguoi_duyet, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien, AVG(so_tien) AS tb_so_tien FROM @ev-chi-tham-tu GROUP BY nguoi_duyet HAVING SUM(so_tien) > 1000000;
```

- Vật chứng lưu vào hồ sơ: ev-chi-vuot-muc
  - Tiêu đề: Khánh: 3 khoản, tổng 2.400.000, trung bình 800.000
  - Mô tả: Kết quả lọc nhóm: chỉ Khánh có tổng chi từ quỹ CLB Thám Tử vượt ngưỡng giải trình một triệu (2.400.000 cho ba khoản). Trung bình 800.000 một khoản: khoản nào cũng dưới một triệu, mức chủ tịch Hội duyệt thẳng được. Ba khoản ấy là ba đơn linh kiện không có hàng.
