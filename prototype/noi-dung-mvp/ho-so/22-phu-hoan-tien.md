## Thẻ hồ sơ nhiệm vụ phụ — Một lần hoàn tiền, hai dòng ghi

<!-- Bản đầu theo gói cũ mục 7. Phiếu kết quả ev-hoan-loc, ev-hoan-nhom khai ở thu-thach/phu-hoan-tien.md. -->

### doc-hoan-ban-xuat — Bản xuất thu chi buổi hướng dẫn SQL
- Tiêu đề: Bản xuất giao dịch, buổi hướng dẫn SQL cho tân thành viên
- Nguồn: {{nv.minh-anh}} xuất từ sổ thu chi CLB
- Nội dung hiển thị:
> Tám dòng, năm cột: mã giao dịch, mã phiếu, loại, số tiền, mã tham chiếu.
> Loại CHI là khoản đã chi; loại HOAN là khoản được hoàn lại, số tiền ghi âm.
> Đây là nguồn cần kiểm, chưa phải bằng chứng ai làm sai.

### clue-hoan-loai — [Hoàn tiền]
- Tiêu đề: Loại giao dịch hoàn tiền
- Giá trị cho trình dựng: HOAN
- Nguồn: Bản xuất thu chi
- Nội dung: Cột loai ghi CHI cho khoản chi, HOAN cho khoản hoàn lại.

### clue-hoan-mot-dong — [Một dòng]
- Tiêu đề: Mỗi lần hoàn chỉ có một dòng
- Giá trị cho trình dựng: 1
- Nguồn: Cách ghi sổ thu chi, {{nv.duy}} nhắc
- Nội dung: Một lần hoàn tiền chỉ ghi một dòng. Phiếu có số dòng hoàn lớn hơn 1 thì cần mở chứng từ gốc ra xem.

### doc-hoan-bien-nhan — Biên nhận ngân hàng của phiếu PH-04
- Tiêu đề: Biên nhận hoàn tiền, phiếu PH-04
- Nguồn: Ngân hàng gửi, {{nv.minh-anh}} giữ
- Nội dung hiển thị:
> Phiếu PH-04. Một giao dịch hoàn: 60.000 đồng. Mã tham chiếu NH-771.
> Biên nhận không ghi ai nhập dòng nào vào sổ.
