<!-- Thẻ thử thách Vụ 1 bản 6 (gói B19, 08/10/2026), Cảnh 8, cổng ký túc xá: màn tra 2 trên sổ quẹt thẻ ra vào, xem ở máy trong chốt bảo vệ nhờ Tùng xin chú Cường (user 08/10). Mã SV240317 VÀ ngày 2024-09-16 ra hai dòng: ra 06:44, vào 17:52 (người ở ký túc xá chiều tối mới về); bấm ô giờ 06:44 lấy giấy nhớ. Câu hẹp hơn mà đủ (thêm chiều = 'ra') ra một dòng 06:44: máy nhận (gói B15). Câu hay gặp (đếm thật trên dữ liệu đã thêm nền): chỉ lọc mã ra 38 dòng (Hoài ba tuần, sáng nào cũng ra cổng sớm); chỉ lọc ngày ra 756; mã HOẶC ngày ra 792; cả sổ 12544. Lời "Khi …" và gợi ý: loi/tt-c-ra-vao.md. -->

### c-ra-vao — Sáng thứ Hai 16/09, Hoài quẹt thẻ ra cổng lúc mấy giờ? {challenge: c-ra-vao}

- Tiêu đề: Sổ ra vào ký túc xá
- Đề bài hiển thị: Sáng thứ Hai 16/09, bạn Hoài mã SV240317 quẹt thẻ ra cổng lúc mấy giờ?
- Manh mối liên quan: clue-loi-chu-cuong, ev-mot-hoai
- Mục tiêu học: Hai điều kiện nối bằng VÀ: đúng mã, đúng ngày. Rồi đọc dòng cần trong kết quả.
- Bấm ô lấy giấy nhớ: gio
- Số dòng kỳ vọng: 2
- SQL chuẩn:

```sql
SELECT ma_sv, ngay, gio, chieu FROM ra_vao_ktx WHERE ma_sv = 'SV240317' AND ngay = '2024-09-16';
```

- [LỜI c-ra-vao.1]
- Vật chứng lưu vào hồ sơ: ev-ra-cong-644
  - Tiêu đề: Sổ ra vào: SV240317 ra cổng 06:44 sáng 16/09
  - Mô tả: Sổ quẹt thẻ cổng ký túc xá, mã SV240317 VÀ ngày 16/09/2024: hai dòng. Sáng quẹt thẻ ra cổng lúc 06:44; tối 17:52 mới quẹt thẻ vào.
  - Giá trị cho trình dựng: 06:44
  - Chữ trên giấy: Sáng 16/09 Hoài quẹt thẻ ra cổng lúc **06:44**
