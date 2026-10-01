<!-- Vụ 2 prototype: kiểm chứng luồng nguồn phiếu → lọc → GROUP BY/COUNT bằng máy kiểm nội dung. -->

### c-v2-nguon-lop - Danh sách lớp {challenge: c-v2-nguon-lop}

- Tiêu đề: Danh sách lớp sinh hoạt
- Đề bài hiển thị: Lọc tiếp trên danh sách lớp để xem ngành nào có lớp ở tòa B.
- Số dòng kỳ vọng: 14
- SQL chuẩn:

```sql
SELECT ma_lop, nganh, khoa_hoc, toa_nha FROM lop_sinh_hoat;
```

- Vật chứng lưu vào hồ sơ: ev-v2-danh-sach-lop
  - Tiêu đề: Phiếu danh sách lớp
  - Mô tả: Kết quả truy vấn danh sách lớp, gồm mã lớp, ngành, khóa học và tòa nhà.

### c-v2-nhom-lop - Đếm lớp theo ngành {challenge: c-v2-nhom-lop}

- Kiểu: tổng hợp
- Nguồn: ev-v2-danh-sach-lop
- Nhóm theo: nganh
- Tiêu đề: Số lớp tại tòa B theo ngành
- Đề bài hiển thị: Dùng phiếu danh sách lớp làm nguồn, lọc các lớp ở tòa B rồi đếm theo ngành.
- Số dòng kỳ vọng: 3
- SQL chuẩn:

```sql
SELECT nganh, COUNT(*) AS so_lop FROM @ev-v2-danh-sach-lop WHERE toa_nha = 'B' GROUP BY nganh;
```
