### c-ra-vao — Sáng thứ Hai 16/09, Hoài quẹt thẻ ra cổng lúc mấy giờ? {challenge: c-ra-vao}

- Tiêu đề: Sổ ra vào ký túc xá
- Đề bài hiển thị: Sáng thứ Hai 16/09, bạn Hoài mã SV240317 quẹt thẻ ra cổng lúc mấy giờ?
- Manh mối liên quan: clue-loi-cuong, ev-hoai-bc24
- Mục tiêu học: Hai điều kiện nối bằng VÀ: đúng mã, đúng ngày.
- Số dòng kỳ vọng: 2
- SQL chuẩn:

```sql
SELECT ma_sv, ngay, gio, chieu FROM ra_vao_ktx WHERE ma_sv = 'SV240317' AND ngay = '2024-09-16';
```

- Khi đúng: **ha-vy** (thinking): Hai dòng: ra lúc 06:44, vào lúc 17:52.
- Vật chứng lưu vào hồ sơ: ev-ra-cong
  - Tiêu đề: 6:44 sáng 16/09, Hoài quẹt thẻ ra cổng ký túc xá
  - Mô tả: Sổ quẹt thẻ cổng ký túc xá, mã SV240317 VÀ ngày 16/09/2024: hai dòng. Sáng quẹt thẻ ra cổng lúc 06:44; tối 17:52 mới quẹt thẻ vào.
  - Giá trị cho trình dựng: 06:44
  - Chữ trên giấy: Sáng 16/09 Hoài quẹt thẻ ra cổng lúc **06:44**
