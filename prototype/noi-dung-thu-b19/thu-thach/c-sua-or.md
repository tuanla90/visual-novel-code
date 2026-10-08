### c-sua-or — Câu HOẶC của Ban Kiểm tra {challenge: c-sua-or}

- Tiêu đề: Câu tra của Ban Kiểm tra
- Đề bài hiển thị: Câu trên màn chiếu ra sáu dòng. Sửa cho ra đúng một dòng rồi trình.
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT ma_sv, ten, nganh, khoa FROM ds_sinh_vien WHERE ten = 'Hoài' AND nganh = 'Báo chí';
```

- Truy vấn nạp sẵn:

```sql
SELECT ma_sv, ten, nganh, khoa FROM ds_sinh_vien WHERE ten = 'Hoài' OR nganh = 'Báo chí';
```

- Nguồn điều kiện nạp sẵn: dk-ten ← tu-nhap · dk-nganh ← tu-nhap
- Khi trình sai: **quan** (smug): Vẫn chưa ra một dòng. Vậy câu của tôi sai ở đâu?
- Khi chạy ra 6 dòng: **ha-vy** (thinking): HOẶC giữ dòng nào khớp một trong hai điều kiện.
- Khi đúng: **minh-anh** (neutral): Một dòng. Trình đi em.
