<!-- Thẻ thử thách của nhiệm vụ phụ "sổ sử dụng phòng" — laptop phòng CLB (kich-ban/20-phu-so-phong.md, v2-tra). Bảng nhat_ky_su_dung: mã phòng gõ tay, lệch hoa/thường và dính dấu cách ở đuôi. Các lần chạy "sai có ích": so y nguyên + đã ký → 1 dòng; chỉ gọt dấu cách hoặc chỉ chữ thường → 2 dòng; gọt cả hai mà quên trạng thái → 5 dòng (lẫn buổi dự kiến); đủ 4 dòng mà chưa xếp theo ngày → "sai thứ tự". SQL chuẩn có LOWER/TRIM và ORDER BY nên màn tra hiện khối gọt cột và hàng "xếp theo"; máy chấm cả thứ tự dòng. Lời "Khi …": loi/tt-v2-loc-buoi.md. -->

### v2-loc-buoi — Những buổi nào của phòng CLB đã ký? {challenge: v2-loc-buoi}

- Tiêu đề: Sổ sử dụng phòng tháng 10
- Đề bài hiển thị: Tháng 10, phòng CLB có những buổi nào đã ký xác nhận? Xếp theo ngày để dò với sổ giấy.
- Manh mối liên quan: clue-ma-phong-clb, clue-da-xac-nhan
- Mục tiêu học: Gọt dữ liệu nhập tay về cùng một kiểu trước khi so (TRIM, LOWER); xếp kết quả theo một cột (ORDER BY).
- Số dòng kỳ vọng: 4
- SQL chuẩn:

```sql
SELECT ma_buoi, ngay, hoat_dong FROM nhat_ky_su_dung WHERE LOWER(TRIM(ma_phong)) = 'clb-tham-tu' AND trang_thai = 'DA_XAC_NHAN' ORDER BY ngay;
```

- [LỜI v2-loc-buoi.1]
- Vật chứng lưu vào hồ sơ: ev-v2-activities
  - Tiêu đề: Bốn buổi đã ký của phòng CLB
  - Mô tả: Kết quả truy vấn: BUOI-02 (02/10, họp thành viên), BUOI-04 (09/10, ôn SQL), BUOI-06 (16/10, kiểm kê hồ sơ), BUOI-08 (23/10, hướng dẫn tân thành viên). Bản ghi chỉ nói có bốn mục đã ký; không nói ai tới dự.
