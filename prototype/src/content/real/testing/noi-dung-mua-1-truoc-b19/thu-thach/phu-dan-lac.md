<!-- Thẻ thử thách của nhiệm vụ phụ "Một lần dẫn lạc" (kich-ban/23-phu-dan-lac.md): ôn lọc → gom và đếm → lọc tiếp trên một bảng mới. c-don-tung (lọc theo mã tình nguyện viên → phiếu 9 lượt); c-don-noi-den (tổng hợp: gom theo điểm đến → KTX 8, NHA_XE 1); c-don-lac (lọc tiếp trên phiếu 9 lượt: điểm đến = NHA_XE → 1 dòng, bấm ô ma_sv ra giấy nhớ SV240317 = Hoài). Sai có ích: không lọc → cả sổ; lọc tiếp chưa đổi gì → vẫn 9 lượt. Lời "Khi …": loi/tt-phu-dan-lac.md. -->

### c-don-tung — Tùng đã dẫn những lượt đón nào? {challenge: c-don-tung}

- Tiêu đề: Sổ đón của đội tình nguyện
- Đề bài hiển thị: Sổ đón ghi tình nguyện viên bằng mã sinh viên. Tùng đã dẫn những lượt nào?
- Manh mối liên quan: clue-ma-tung
- Mục tiêu học: Ôn lọc theo mã để ghim thành phiếu riêng của một người.
- Số dòng kỳ vọng: 9
- SQL chuẩn:

```sql
SELECT ma_luot, ngay, ma_sv, diem_den FROM luot_don WHERE tinh_nguyen_vien = 'SV240251';
```

- [LỜI c-don-tung.1]
- Vật chứng lưu vào hồ sơ: ev-don-tung
  - Tiêu đề: Chín lượt đón do Tùng dẫn
  - Mô tả: Kết quả truy vấn: chín lượt Tùng dẫn trong hai ngày 07 và 08/09/2024, có mã tân sinh viên và điểm đến.

### c-don-noi-den — Chín lượt đó tới những đâu, mỗi nơi mấy lượt? {challenge: c-don-noi-den}

- Kiểu: tổng hợp
- Nguồn: ev-don-tung
- Nhóm theo: diem_den
- Tiêu đề: Lượt đón của Tùng, gom theo điểm đến
- Đề bài hiển thị: Lấy phiếu chín lượt làm nguồn. Gom theo điểm đến, đếm mỗi nơi mấy lượt.
- Mục tiêu học: Ôn gom và đếm: cái lạ hiện ra thành nhóm chỉ có một dòng.
- Số dòng kỳ vọng: 2
- SQL chuẩn:

```sql
SELECT diem_den, COUNT(*) AS so_dong FROM @ev-don-tung GROUP BY diem_den;
```

- Vật chứng lưu vào hồ sơ: ev-don-noi-den
  - Tiêu đề: Ký túc xá 8 lượt, nhà xe 1 lượt
  - Mô tả: Kết quả gom theo điểm đến: tám lượt tới ký túc xá, một lượt tới nhà xe. Phiếu đếm được số lượt, chưa nói lượt nhà xe là của ai.

### c-don-lac — Lượt nào Tùng đưa tới nhà xe, và đón ai? {challenge: c-don-lac}

- Kiểu: lọc tiếp
- Nguồn: ev-don-tung
- Tiêu đề: Lượt tới nhà xe
- Đề bài hiển thị: Trong chín lượt trên phiếu, lượt nào ghi điểm đến là nhà xe? Chép mã tân sinh viên ra giấy nhớ.
- Manh mối liên quan: clue-nha-xe
- Mục tiêu học: Ôn lọc tiếp trên phiếu đã ghim; bấm ô mã để mang sang lần đối chiếu sau.
- Bấm ô lấy giấy nhớ: ma_sv
- Số dòng kỳ vọng: 1
- SQL chuẩn:

```sql
SELECT ma_luot, ngay, ma_sv FROM @ev-don-tung WHERE diem_den = 'NHA_XE';
```

- [LỜI c-don-lac.1]
- Vật chứng lưu vào hồ sơ: ev-don-lac
  - Tiêu đề: LD-0247: Tùng đưa SV240317 tới nhà xe
  - Mô tả: Kết quả lọc tiếp trên phiếu chín lượt: lượt LD-0247 ngày 08/09/2024, tân sinh viên SV240317, điểm đến nhà xe. Sổ ghi nơi tới, không ghi vì sao.
  - Giá trị cho trình dựng: SV240317
