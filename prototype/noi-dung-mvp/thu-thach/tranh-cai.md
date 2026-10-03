<!-- Thẻ thử thách Vụ 3 "Tranh cãi trong nhóm" (kich-ban/11-vu-3-tranh-cai.md). Điều mới: NHÓM VÀ ĐẾM trên phiếu đã ghim (thẻ "Kiểu: tổng hợp", màn tổng hợp): c-bai-dang (lọc kênh Robotics → phiếu 9 bài) → c-bai-thiet-bi (nhóm theo thiết bị: 8 điện thoại trực, 1 máy văn phòng); c-nam-thu-vien (lọc tên Nam → phiếu 5 lần) → c-nam-thu (nhóm theo thứ: thứ Hai 4, thứ Năm 1); c-toi-07 (tối 07/10: Hà Vy và Nam đều ở thư viện — thẻ ĐỦ CĂN CỨ); c-vy-thu-vien (tùy chọn: thẻ của Hà Vy → lời nhắn chị Linh). Lời "Khi …": loi/tt-tranh-cai.md. -->

### c-bai-dang — Kênh Robotics đăng những bài nào trong tháng 10? {challenge: c-bai-dang}

- Tiêu đề: Bài đăng của các kênh CLB
- Đề bài hiển thị: Bản xuất bài đăng của mọi kênh trong trường, chín ngày đầu tháng 10. Kênh Robotics đăng những bài nào?
- Manh mối liên quan: clue-kenh-robotics
- Mục tiêu học: Lọc ra một tập để ghim thành phiếu, chuẩn bị nhóm và đếm.
- Chọn cột: không
- Số dòng kỳ vọng: 9
- SQL chuẩn:

```sql
SELECT ma_bai, ngay, buoi, thiet_bi FROM bai_dang_kenh WHERE kenh = 'clb_robotics';
```

- [LỜI c-bai-dang.1]
- Vật chứng lưu vào hồ sơ: ev-bai-dang
  - Tiêu đề: Chín bài của kênh Robotics
  - Mô tả: Kết quả truy vấn: chín bài kênh Robotics đăng trong tháng 10, mỗi bài ghi ngày, buổi và thiết bị gửi.

### c-bai-thiet-bi — Chín bài đó đăng từ thiết bị nào, mỗi thiết bị mấy bài? {challenge: c-bai-thiet-bi}

- Kiểu: tổng hợp
- Nguồn: ev-bai-dang
- Nhóm theo: thiet_bi
- Tiêu đề: Bài đăng nhóm theo thiết bị
- Đề bài hiển thị: Lấy phiếu chín bài làm nguồn. Gom theo thiết bị gửi, đếm mỗi nhóm bao nhiêu bài: kênh này hay đăng từ đâu?
- Mục tiêu học: Nhóm và đếm (GROUP BY, COUNT): cách nhóm quyết định mình thấy gì.
- Số dòng kỳ vọng: 2
- SQL chuẩn:

```sql
SELECT thiet_bi, COUNT(*) AS so_dong FROM @ev-bai-dang GROUP BY thiet_bi;
```

- Vật chứng lưu vào hồ sơ: ev-bai-thiet-bi
  - Tiêu đề: 8 bài từ điện thoại trực, 1 bài từ máy văn phòng
  - Mô tả: Kết quả nhóm theo thiết bị: 8 bài gửi từ điện thoại trực kênh (Nam giữ), 1 bài gửi từ máy văn phòng xưởng. Bài tin đồn là bài duy nhất khác thói quen đăng của kênh.

### c-nam-thu-vien — Nam vào thư viện những ngày nào? {challenge: c-nam-thu-vien}

- Tiêu đề: Bản ghi quẹt thẻ thư viện
- Đề bài hiển thị: Bản ghi cửa từ thư viện do chính Nam và Hà Vy tải về từ cổng sinh viên, gộp chung một tệp. Nam vào thư viện những ngày nào?
- Manh mối liên quan: clue-ten-nam
- Mục tiêu học: Lọc theo tên để ghim thành phiếu riêng của một người.
- Số dòng kỳ vọng: 32
- SQL chuẩn:

```sql
SELECT ngay, thu, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ten = 'Nam';
```

- [LỜI c-nam-thu-vien.1]
- Vật chứng lưu vào hồ sơ: ev-nam-thu-vien
  - Tiêu đề: Ba mươi hai lần Nam quẹt thẻ thư viện
  - Mô tả: Kết quả truy vấn: ba mươi hai lần Nam vào thư viện từ năm ngoái đến nay, có ngày, thứ, giờ vào, giờ ra.

### c-nam-thu — Nam quẹt thẻ thư viện vào thứ mấy nhiều nhất, mấy lần? {challenge: c-nam-thu}

- Kiểu: tổng hợp
- Nguồn: ev-nam-thu-vien
- Nhóm theo: thu
- Tiêu đề: Thói quen của Nam, nhóm theo thứ
- Đề bài hiển thị: Lấy phiếu năm lần làm nguồn. Gom theo thứ trong tuần, đếm mỗi thứ mấy lần: Nam hay đi thư viện vào thứ mấy?
- Mục tiêu học: Nhóm theo thứ trong tuần: thói quen là thứ đếm được.
- Số dòng kỳ vọng: 2
- SQL chuẩn:

```sql
SELECT thu, COUNT(*) AS so_dong FROM @ev-nam-thu-vien GROUP BY thu;
```

- Vật chứng lưu vào hồ sơ: ev-nam-thu
  - Tiêu đề: Nam: tối thứ Hai 27 lần, thứ Năm 5 lần
  - Mô tả: Kết quả nhóm theo thứ: hai mươi bảy tối thứ Hai Nam đều ở thư viện từ lúc vào trường. Một thói quen bền bỉ đếm được; chưa phải bằng chứng cho riêng tối 07/10.

### c-toi-07 — Tối 07/10 ai quẹt thẻ, vào và ra lúc mấy giờ? {challenge: c-toi-07}

- Tiêu đề: Thư viện tối 07/10
- Đề bài hiển thị: Trên bản ghi quẹt thẻ, tối 07/10 có ai, vào và ra lúc mấy giờ?
- Manh mối liên quan: clue-toi-07
- Mục tiêu học: Từ thói quen quay về một tối cụ thể: lọc đúng ngày.
- Số dòng kỳ vọng: 2
- SQL chuẩn:

```sql
SELECT ten, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ngay = '2024-10-07';
```

- [LỜI c-toi-07.1]
- Vật chứng lưu vào hồ sơ: ev-toi-07
  - Tiêu đề: Tối 07/10: Hà Vy 20:00–23:00, Nam 21:50–23:05
  - Mô tả: Kết quả truy vấn: tối 07/10 Hà Vy quẹt thẻ vào 20:00, ra 23:00; Nam vào 21:50, ra 23:05. Tin gốc gửi lúc 22:40. Nguồn độc lập của thư viện, có giờ vào giờ ra.

### c-vy-thu-vien — Hà Vy vào thư viện những ngày nào? {challenge: c-vy-thu-vien}

- Tiêu đề: Bản ghi quẹt thẻ của Hà Vy
- Đề bài hiển thị: Hà Vy vào thư viện những ngày nào?
- Manh mối liên quan: clue-ten-vy
- Mục tiêu học: Ôn lọc theo tên; thói quen của người làm chứng cũng phải đếm được (thẻ hỗ trợ ở đối chất).
- Số dòng kỳ vọng: 5
- SQL chuẩn:

```sql
SELECT ngay, thu, gio_vao, gio_ra FROM quet_the_thu_vien WHERE ten = 'Hà Vy';
```

- [LỜI c-vy-thu-vien.1]
- Vật chứng lưu vào hồ sơ: ev-vy-thu-vien
  - Tiêu đề: Năm lần Hà Vy quẹt thẻ thư viện
  - Mô tả: Kết quả truy vấn: bốn tối thứ Hai và một tối thứ Tư. Thói quen của Hà Vy trùng với thói quen của Nam.
