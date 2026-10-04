# Brief sửa gói T0 (lần 2)

Claude nghiệm thu lần sửa 1 trong worktree `mua1-t0`. Phần đạt và phần còn thiếu ghi bên dưới. Luật chung giữ nguyên như `docs/mua-1/brief/t0.md`. Làm tiếp trên các thay đổi đang có.

## Đã đạt sau lần sửa 1 (giữ nguyên)

- **S1 việc phụ:** sáu tệp việc phụ có đủ nội dung.
- **S3 tệp:** đúng 12 tệp, không trùng.
- **S5:** không còn mã nội bộ, không còn mã biểu cảm.
- **S6:** mục nhân vật gọn.
- **S7:** máy kiểm kỹ năng không còn báo nhầm phép trừ.
- **S8:** nút đổi bộ chỉ hiện ở chế độ dev; khóa lưu ván tách theo bộ.
- **S9:** đã có lệnh `truyen-chu:mua1`.
- **Lệnh kiểm:**
  - MVP không đổi.
  - `kiem-noi-dung:mua1`/`:mvp`, `kiem-giong:mua1`, `typecheck` xanh.
  - `lint` đúng mốc.
  - `npm test`: 133 tệp, 1111 test qua.

## Còn phải sửa

### R1. "Hết ngày" và dòng đầu ngày (S4 chưa đạt)

Tệp truyện chữ đã xuất không có dòng "Hết ngày" nào, cũng không có dòng đầu ngày nào. Bản chép MVP chưa có `[XONG VIỆC CHÍNH]` và `Hạn chót`, nhưng có ngày ("Ngày 1"…"Ngày 5" trong `lich.md`, chuỗi mở của từng ngày).

- Đầu mỗi ngày in dòng đầu ngày:
  - Có ngày thật thì in "Thứ Ba, 24/09/2024".
  - Không có thì in "Ngày 2".
  - Vụ có `Hạn chót` thì thêm "· Còn N ngày tới <việc chốt>".
- Chỗ chuyển sang ngày sau in "**Hết ngày.**".
- Test: tệp `vu1.md` xuất thật có ít nhất 4 dòng "Hết ngày." và 5 dòng đầu ngày. Vụ mẫu có hạn chót thì có dòng "Còn N ngày".

### R2. S12 chưa làm

Làm đúng mục S12 trong `docs/mua-1/brief/t0-sua.md`:
- truyện chữ in dòng "Lọc từng bước" cho mọi thứ tự điều kiện, số chạy thật;
- bộ đọc nhận `- Cột nộp:`, lời `Khi chọn sai cột nộp`, lời `Khi xem từng bước`;
- bộ kiểm báo lỗi khi `Cột nộp` không có trong các cột của SQL chuẩn;
- có test cho các mục trên.

### R3. Ngoặc kép đôi ở lời nghĩ

Lời nghĩ đang in hai lớp ngoặc, ví dụ `*((Vậy là lên Hà Nội thật rồi.))*`. Phải in một lớp: `*(Vậy là lên Hà Nội thật rồi.)*`.

Test: không tệp nào còn `((`.

### R4. Đoạn "Đang ở" liệt kê nhầm nơi khác

Ví dụ `vu1.md`: "Đang ở Phòng CLB" lại liệt kê "Khám phá: Phòng Đào tạo", "Khám phá: Sảnh tòa B". Đó là các **nơi trên bản đồ của ngày**, không phải chỗ bấm trong Phòng CLB. Sửa lại:

- **"Đang ở <nơi>"** chỉ liệt kê chỗ `[KHÁM PHÁ]` của chính cảnh đó.
- **Đoạn "Bản đồ ngày N"** là một đoạn riêng, liệt kê các nơi đi được trong ngày. Nơi có việc chính ghi "!". Nơi tùy chọn ghi "(tùy chọn)".
- **"Mở bản đồ"** dẫn tới đoạn bản đồ ấy, không dẫn về đoạn đầu ngày.
- **Bản chép MVP**, kiểu "ngày theo truyện" với các nhánh `[RẼ NHÁNH]` sang nơi khác: in các nhánh ấy trong đoạn bản đồ của ngày.
- **Test:** trong một đoạn "Đang ở X", mọi lựa chọn "Khám phá" dẫn tới chuỗi có cùng cảnh X.

### R5. Mục lục: nói rõ đây là 5 vụ cũ, chưa phải 10 vụ

User đọc `README.md` và tưởng mùa 1 chỉ có 5 vụ. Thêm một khối ghi chú cố định ở đầu mục lục, ngay dưới tiêu đề. Đây là chữ cố định, không phải danh sách viết tay:

> **Đây là bản chép 5 vụ cũ của MVP, chưa sửa.** Mùa 1 theo kế hoạch có 10 vụ (`docs/mua-1/ke-hoach-10-vu.md`). Các gói B4 → B10 sẽ sắp lại 5 vụ này thành Vụ 1, 2, 4, 6, 8 và viết thêm Vụ 3, 5, 7, 9, 10. Mục lục này tự cập nhật theo nội dung.

- Bảng vụ thêm cột "Số chuỗi" và "Số màn tra" lấy từ dữ liệu.
- Cột "Vụ" hiện đang lặp mã (`vu1 | vu1`). Đổi thành số thứ tự theo lịch: 1, 2, 3…

## Nghiệm thu lần này

- [ ] R1–R5 đạt, mỗi mục có test hoặc kiểm được bằng lệnh.
- [ ] Các lệnh A6 và `kiem-ky-nang:mua1` như mốc.
- [ ] `git diff --stat -- prototype/noi-dung-mvp prototype/src/content/generated/mvp` rỗng.
- [ ] `prototype/.vite-canary/` không đổi.
- [ ] Báo cáo: thêm mục "Lần sửa 2" vào `docs/mua-1/bao-cao/t0.md`. Mọi con số dán từ đầu ra thật của lệnh.

Làm xong thì dừng.
