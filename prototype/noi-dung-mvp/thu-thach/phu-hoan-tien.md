<!-- Thẻ thử thách của nhiệm vụ phụ "hoàn tiền" (kich-ban/22-phu-hoan-tien.md): rèn nhóm, đếm, tổng, lọc nhóm. c-hoan-loc (lọc loai = HOAN → phiếu 4 dòng) → c-hoan-nhom (tổng hợp: gom theo mã phiếu, tổng số tiền, chỉ giữ nhóm có số dòng lớn hơn 1 → PH-04 / 2 / -120000). Lời "Khi …": loi/tt-phu-hoan-tien.md. -->

### c-hoan-loc — Bản xuất có những dòng hoàn tiền nào? {challenge: c-hoan-loc}

- Tiêu đề: Bản xuất thu chi buổi hướng dẫn
- Đề bài hiển thị: Bản xuất lẫn cả khoản chi lẫn khoản hoàn. Những dòng nào là hoàn tiền?
- Manh mối liên quan: clue-hoan-loai
- Mục tiêu học: Lọc trước rồi mới gom: chỉ đưa vào phiếu nguồn những dòng đúng loại.
- Số dòng kỳ vọng: 4
- SQL chuẩn:

```sql
SELECT ma_gd, ma_phieu, so_tien, ma_tham_chieu FROM giao_dich WHERE loai = 'HOAN';
```

- [LỜI c-hoan-loc.1]
- Vật chứng lưu vào hồ sơ: ev-hoan-loc
  - Tiêu đề: Bốn dòng hoàn tiền
  - Mô tả: Kết quả truy vấn: bốn dòng loại HOAN, thuộc ba phiếu PH-01, PH-04, PH-06. Cộng lại âm 155.000 đồng.

### c-hoan-nhom — Phiếu nào có hơn một dòng hoàn tiền? {challenge: c-hoan-nhom}

- Kiểu: tổng hợp
- Nguồn: ev-hoan-loc
- Tiêu đề: Dòng hoàn gom theo mã phiếu
- Đề bài hiển thị: Lấy phiếu bốn dòng hoàn làm nguồn. Gom theo mã phiếu, tính tổng số tiền, chỉ giữ nhóm có hơn một dòng.
- Manh mối liên quan: clue-hoan-mot-dong
- Mục tiêu học: Rèn lọc nhóm (HAVING) theo số dòng của nhóm, kèm tổng trên nhóm.
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT ma_phieu, COUNT(*) AS so_dong, SUM(so_tien) AS tong_so_tien FROM @ev-hoan-loc GROUP BY ma_phieu HAVING COUNT(*) > 1;
```

- Vật chứng lưu vào hồ sơ: ev-hoan-nhom
  - Tiêu đề: PH-04: hai dòng hoàn, tổng âm 120.000
  - Mô tả: Kết quả gom theo mã phiếu: chỉ PH-04 có hơn một dòng hoàn (hai dòng, tổng ghi âm 120.000 đồng). Đây là phiếu cần mở chứng từ gốc, chưa phải kết luận.
