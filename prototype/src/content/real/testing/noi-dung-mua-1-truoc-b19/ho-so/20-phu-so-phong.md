## Thẻ hồ sơ nhiệm vụ phụ — Bốn mục trong sổ đã ký

<!-- Bản đầu theo docs/mvp/mua-1-kich-ban-ready-dev.md mục 5. Phiếu kết quả ev-v2-activities khai ở thu-thach/v2-loc-buoi.md. Hai giấy nhớ có "Giá trị cho trình dựng" là giá trị kéo vào màn tra. Sang Vụ 2, thẻ Vụ 1 được gỡ khỏi bảng (vẫn trong hồ sơ) nên bảng chỉ còn thẻ của vụ này. -->

### doc-v2-raw-logs — Bản xuất sổ sử dụng phòng
- Tiêu đề: Bản xuất sổ sử dụng phòng, tháng 10
- Ảnh: doc-v2-raw-logs
- Nguồn: {{nv.duy}} xuất từ máy quản lý phòng của tòa nhà
- Nội dung hiển thị:
> Hai trăm sáu mươi bảy dòng của mọi phòng trong tòa nhà, năm cột: mã buổi, mã phòng, ngày, hoạt động, trạng thái.
> Mã phòng do người trực gõ tay: có dòng viết hoa, có dòng viết thường, có dòng dính dấu cách ở đuôi.
> Trạng thái DA_XAC_NHAN: buổi đã có chữ ký trong sổ giấy. DU_KIEN: lịch đặt trước, chưa ký.

### clue-ma-phong-clb — [Mã phòng CLB]
- Tiêu đề: Mã phòng của CLB trong sổ
- Giá trị cho trình dựng: clb-tham-tu
- Nguồn: Sổ sử dụng phòng, {{nv.duy}} giữ
- Nội dung: Sổ giấy ghi phòng CLB bằng mã clb-tham-tu. Trong bản xuất, mã này do người trực gõ tay nên mỗi dòng một kiểu.

### clue-da-xac-nhan — [Đã ký xác nhận]
- Tiêu đề: Trạng thái "đã ký xác nhận"
- Giá trị cho trình dựng: DA_XAC_NHAN
- Nguồn: Bản xuất sổ sử dụng phòng
- Nội dung: Chỉ dòng có trạng thái DA_XAC_NHAN mới có chữ ký trong sổ giấy. DU_KIEN là lịch đặt trước, chưa diễn ra.

### clue-v2-so-giay — [Sổ giấy khớp bốn buổi]
- Tiêu đề: Sổ giấy: bốn buổi đủ chữ ký
- Nguồn: {{nv.duy}} dò sổ giấy với phiếu tra
- Nội dung: Bốn mã buổi trên phiếu đều có chữ ký trong sổ giấy; dòng 30/10 còn để trống ô ký. Sổ giấy là nguồn riêng, khớp với bản xuất. Cả hai không ghi ai tới dự.
