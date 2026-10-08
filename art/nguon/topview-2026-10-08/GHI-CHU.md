# Ảnh gói B19 (Vụ 1 bản 6), 08/10/2026

Topview, GPT Image 2.5 Flare, Credit Mode 2K (0,32 credit/ảnh), bảng "My First Board". Mã task trong prompt mở đầu `[id: b19-…]`.
Xử lý sang game: `python art/nguon/xu-ly-anh-b19-2026-10-08.py` (bảng nguồn → đích ở đầu tệp).

| Nguồn | Ảnh trong game | Cách làm |
|---|---|---|
| trung-thu-4banh-ghep | nen/bg-mvp-san-ktx-trung-thu | sửa nền cũ: bỏ quầy Robotics + balo bánh răng, thêm đèn ông sao dọc hàng rào; model ra 3 bánh nên ghép tay chiếc thứ tư |
| trung-thu-4banh-b | nen/bg-mvp-san-ktx-trung-thu-ba-banh | cùng cảnh, 3 bánh (lúc 19:15) |
| trung-thu-nguoi-ghep | nen/bg-mvp-san-ktx-trung-thu-nguoi | vẽ bằng chữ (không ảnh mẫu): năm người đứng tách nhau để bấm, bé Na giấu tay sau lưng; xóa tay chiếc bánh thứ tư (OpenCV) |
| khanh-ban-to-chuc | nhan-vat/char-khanh-ban-to-chuc | sửa chân dung Khánh: bỏ balo + huy hiệu bánh răng (để không lộ người đưa phong bì ở Ngày hội) |
| phong-408 | cg/cg-phong-408 | sửa nền phòng KTX: balo + áo tình nguyện xanh ở giường trên, giường dưới trống |
| ban-clb-vang-2 | cg/cg-ban-clb-vang | Minh Anh ngồi một mình ở bàn trắng, Khánh (không balo) ghé bàn |
| phieu-trang-2 | cg/cg-phieu-trang | cận tay lật xấp phiếu đăng ký trắng |
| tung-om-to-roi-5 | cg/cg-tung-om-to-roi | vẽ bằng chữ rồi sửa mặt theo char-tung-anchor |
| nam-ghe-2 | cg/cg-nam-ghe | bàn Trung thu, 4 bánh, năm ghế nhựa, một ghế trống |
| duy-dan-chia-khoa-4 | cg/cg-duy-dan-chia-khoa | vẽ bằng chữ rồi sửa mặt theo char-duy (Duy không đeo kính) |
| ha-vy-ghi-so-4 | cg/cg-ha-vy-ghi-so | vẽ bằng chữ rồi sửa mặt theo char-ha-vy-anchor; sổ ghi 19:00, 19:05, 19:10 |
| ca-doi-quanh-bang-3 | cg/cg-ca-doi-quanh-bang | vẽ bằng chữ: bốn người quay lưng nhìn bảng, bánh mì que, ấm trà, quạt cây |
| bang-the-trang-2 | cg/cg-bang-the-trang | bảng ghim, ảnh phong bì nâu, thẻ trắng với sợi chỉ thả lơ lửng |
| so-tong-ket-2 | cg/cg-so-tong-ket | sổ CLB mở, góc dưới phải trang phải để trống cho dấu |
| cong-bong-mo-3 | nen/bg-mvp-cong-ktx-bong-mo | vẽ bằng chữ: cổng KTX lúc rạng sáng, hai bóng mờ trao phong bì nâu |
| thu-kien-nghi | giay/doc-thu-kien-nghi | sửa thư cũ: bỏ vạch đen và chữ ký |
| phieu-gui-hoai-2 | giay/doc-phieu-gui-hoai | vẽ bằng chữ: phiếu gửi, chữ ký tay "Hoài" |
| so-thu-hop-2 | giay/doc-so-thu-hop | vẽ bằng chữ: sổ thu hộp, ba dòng có ngoặc |
| the-lich-rach-2 | giay/doc-the-lich-rach | sửa thẻ lịch cũ: rách mép dưới thay vì góc trên |
| dau-a/b/c | giao-dien/dau-rank-a/b/c | dấu đỏ trên giấy trắng → tách mực đỏ trong suốt |

Bài học (đã ghi memory): ảnh sửa từ ảnh mẫu (Image Edit) chỉ hợp khi đổi ÍT; muốn cảnh mới có nhân vật thì vẽ bằng chữ (không ảnh mẫu) rồi sửa mặt bằng một lượt Image Edit với ảnh neo. Đưa ảnh nền + ảnh nhân vật cùng lúc thì model hay xếp nhân vật đứng tạo dáng trước nền, hoặc trả lại nguyên ảnh nền. Đếm vật (số bánh) model hay sai: kiểm bằng mắt, sửa tay.
