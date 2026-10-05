<!-- Thẻ thử thách chương 1 — ngày 4, Phòng Đào tạo. Chỉ gặp khi người chơi chọn ghé hỏi cô Hạnh (kich-ban/04-ngay-4.md, n4-phong-may). Lần chạy "sai có ích": mã của Hoài/Hiếu + tên tệp → 0 dòng ("không phải họ in"); bỏ điều kiện mã → 1 dòng clb_robotics (tài khoản dùng chung của CLB Robotics; không lộ ai, không lộ năm). Lời "Khi …": loi/tt-c-in.md. -->

### c-in — Ai đã in lá thư? {challenge: c-in}

- Tiêu đề: Nhật ký máy in đêm Chủ nhật
- Đề bài hiển thị: Lá thư được đánh máy rồi in ra. Máy in nhớ ai đã in tệp nào.
- Manh mối liên quan: clue-ten-tep, ev-hai-ma
- Mục tiêu học: 0 dòng cũng là một câu trả lời; bỏ bớt điều kiện để thấy ai thật sự in.
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT thoi_diem, tai_khoan, ten_tep, so_trang FROM nhat_ky_in WHERE ten_tep = 'kien-nghi-phong-clb.docx';
```

- [LỜI c-in.1]
- Vật chứng lưu vào hồ sơ: ev-nhat-ky-in
  - Tiêu đề: Nhật ký in 23:10 Chủ nhật
  - Mô tả: 1 trang, tệp kien-nghi-phong-clb.docx, tài khoản clb_robotics: tài khoản dùng chung của CLB Robotics, không phải mã của một sinh viên. Tài khoản in thư không phải của người nộp.
  - Giá trị cho trình dựng: clb_robotics
  - Chữ trên giấy: Tài khoản đã in lá thư: **clb_robotics**
