<!-- Thẻ thử thách của nhiệm vụ phụ "chiếc micro" (kich-ban/21-phu-micro.md): rèn nối bảng. Bảng gốc luan_chuyen (7 phiếu), nối với tai_san theo ma_tai_san, lọc tên ở sổ tài sản và trạng thái ở phiếu → 1 dòng (PX-17). Sai có ích: chưa nối → không có cột ten_tai_san; nối theo vi_tri (trùng tên, khác nghĩa) → 3 dòng toàn phiếu chuyển tới tủ CLB; quên trạng thái → 2 dòng (thêm phiếu đề xuất PX-19); quên tên → 5 dòng; không lọc → 7 dòng. Lời "Khi …": loi/tt-phu-micro.md. -->

### c-mic-phieu — Phiếu nào đã nhận, chuyển chiếc micro không dây đi đâu? {challenge: c-mic-phieu}

- Tiêu đề: Phiếu luân chuyển nối với sổ tài sản
- Đề bài hiển thị: Phiếu luân chuyển chỉ ghi mã tài sản; sổ tài sản mới ghi tên. Phiếu nào đã nhận, chuyển chiếc micro không dây đi đâu?
- Manh mối liên quan: clue-mic-ten, clue-mic-da-nhan
- Nối được với: tai_san
- Mục tiêu học: Rèn nối hai bảng theo mã; cột trùng tên (vi_tri) chưa chắc cùng nghĩa; lọc trên cột của cả hai bảng.
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT ma_phieu, ten_tai_san, luan_chuyen.vi_tri, nguoi_nhan FROM luan_chuyen JOIN tai_san ON luan_chuyen.ma_tai_san = tai_san.ma_tai_san WHERE ten_tai_san = 'Micro không dây' AND trang_thai = 'DA_NHAN';
```

- [LỜI c-mic-phieu.1]
- Vật chứng lưu vào hồ sơ: ev-mic-phieu
  - Tiêu đề: PX-17: micro không dây sang tủ thiết bị dùng chung
  - Mô tả: Kết quả nối phiếu luân chuyển với sổ tài sản: phiếu PX-17 đã nhận, chuyển micro không dây (MIC-02) tới tủ thiết bị dùng chung, tổ thiết bị nhận.
