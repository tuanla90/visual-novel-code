<!-- Thẻ thử thách chương 1 — ngày 4, phòng máy (ĐÃ CHỐT C, 30/09/2026). Chỉ gặp khi người chơi chọn ghé phòng máy (kich-ban/04-ngay-4.md, n4-phong-may). Lần chạy "sai có ích": mã của Hoài/Hiếu + tên tệp → 0 dòng ("không phải họ in"); bỏ điều kiện mã → 1 dòng SV210745 (khóa 2021 = năm 4). Lời "Khi …": loi/tt-c-in.md. -->

### c-in — Ai đã in lá thư? {challenge: c-in}

- Tiêu đề: Nhật ký máy in đêm Chủ nhật
- Đề bài hiển thị: Lá thư được đánh máy rồi in ra. Máy in nhớ ai đã in tệp nào.
- Manh mối liên quan: clue-ten-tep, ev-hai-ma
- Mục tiêu học: 0 dòng cũng là một câu trả lời; bỏ bớt điều kiện để thấy ai thật sự in.
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT thoi_diem, tai_khoan, ten_tep, so_trang FROM nhat_ky_in WHERE ten_tep LIKE 'kien-nghi%';
```

- [LỜI c-in.1]
- Vật chứng lưu vào hồ sơ: ev-nhat-ky-in
  - Tiêu đề: Nhật ký in 23:10 Chủ nhật
  - Mô tả: 1 trang, tệp kien-nghi-phong-clb.docx, tài khoản SV210745 (khóa 2021, năm 4). Người in thư không phải người nộp.
  - Giá trị cho trình dựng: SV210745
