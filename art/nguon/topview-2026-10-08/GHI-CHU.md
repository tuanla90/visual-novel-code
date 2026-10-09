# Ảnh gói B19 (Vụ 1 bản 6), 08/10/2026

Topview, GPT Image 2.5 Flare, Credit Mode 2K (0,32 credit/ảnh), bảng "My First Board". Mã task trong prompt mở đầu `[id: b19-…]`.
Xử lý sang game: `python art/nguon/xu-ly-anh-b19-2026-10-08.py` (bảng nguồn → đích ở đầu tệp).

| Nguồn | Ảnh trong game | Cách làm |
|---|---|---|
| trung-thu-4banh-ghep | nen/bg-mvp-san-ktx-trung-thu | sửa nền cũ: bỏ quầy Robotics + balo bánh răng, thêm đèn ông sao dọc hàng rào; model ra 3 bánh nên ghép tay chiếc thứ tư |
| trung-thu-4banh-b | nen/bg-mvp-san-ktx-trung-thu-ba-banh | cùng cảnh, 3 bánh (lúc 19:15) |
| khanh-ban-to-chuc | nhan-vat/char-khanh-ban-to-chuc | sửa chân dung Khánh: bỏ balo + huy hiệu bánh răng (để không lộ người đưa phong bì ở Ngày hội) |
| phong-408 | cg/cg-phong-408 | sửa nền phòng KTX: balo + áo tình nguyện xanh ở giường trên, giường dưới trống |
| ban-clb-vang-2 | cg/cg-ban-clb-vang | Minh Anh ngồi một mình ở bàn trắng, Khánh (không balo) ghé bàn |
| phieu-trang-2 | cg/cg-phieu-trang | cận tay lật xấp phiếu đăng ký trắng |
| char-tung-om-to-roi-2 | nhan-vat/char-tung-om-to-roi | sửa thẳng từ char-tung-anchor: chỉ đổi tay (ôm tờ rơi không chữ, quạt Guitar, ngậm bánh rán) |
| nam-ghe-2 | cg/cg-nam-ghe | bàn Trung thu, 4 bánh, năm ghế nhựa, một ghế trống |
| char-duy-dan-chia-khoa-2 | nhan-vat/char-duy-dan-chia-khoa | sửa thẳng từ char-duy: bỏ xấp bìa, cầm chìa khóa dán nhãn (không kính) |
| char-be-na-2 | nhan-vat/char-be-na | vẽ bằng chữ theo bé Na ở cg-be-na-den-ca-chep: cả người, giấu tay sau lưng; thu còn cao 800 px trên khung để đứng cạnh người lớn |
| so-ha-vy-gio | cg/cg-so-ha-vy-gio | cận hai tay áo len ca rô xanh ghi sổ 19:00, 19:05, 19:10 (không vẽ mặt) |
| phong-clb-dem-banh-mi-3 | nen/bg-mvp-phong-clb-dem-banh-mi | sửa nền phòng CLB tối: túi bánh mì que, quạt cây, bảng ghim thẻ chỉ đỏ; cả đội hiện bằng chân dung |
| bang-the-trang-2 | cg/cg-bang-the-trang | bảng ghim, ảnh phong bì nâu, thẻ trắng với sợi chỉ thả lơ lửng |
| so-tong-ket-2 | cg/cg-so-tong-ket | sổ CLB mở, góc dưới phải trang phải để trống cho dấu |
| cong-bong-mo-4 | nen/bg-mvp-cong-ktx-bong-mo | vẽ bằng chữ: cổng KTX lúc rạng sáng, hai bóng mờ trao phong bì nâu; sửa dáng cô gái quay về phía chàng trai |
| thu-kien-nghi | giay/doc-thu-kien-nghi | sửa thư cũ: bỏ vạch đen và chữ ký |
| phieu-gui-hoai-2 | giay/doc-phieu-gui-hoai | vẽ bằng chữ: phiếu gửi, chữ ký tay "Hoài" |
| so-thu-hop-2 | giay/doc-so-thu-hop | vẽ bằng chữ: sổ thu hộp, ba dòng có ngoặc |
| the-lich-rach-2 | giay/doc-the-lich-rach | sửa thẻ lịch cũ: rách mép dưới thay vì góc trên |
| dau-a/b/c | giao-dien/dau-rank-a/b/c | dấu đỏ trên giấy trắng → tách mực đỏ trong suốt |

User 08/10 trả lại các ảnh nhân vật vẽ bằng chữ (sai mẫu, bé Na như hai đầu, cảnh Trung thu thiếu nhân vật chính) và chốt: cảnh đông người dùng CHÂN DUNG đã duyệt đứng trên dàn (bấm từng người), không vẽ ảnh nhóm; ảnh riêng của nhân vật thì sửa thẳng từ chân dung gốc, chỉ đổi tay/đồ cầm.

Bài học (đã ghi memory): Image Edit từ ảnh gốc hợp khi đổi ÍT và lời nhắc ngắn, mệnh lệnh ("Edit Image1: take the folder out of his hand…"); câu "Pixel-identical copy … EXCEPT" kèm thay đổi lớn hay bị trả lại nguyên ảnh. Không vẽ nhân vật bằng chữ rồi sửa mặt: nét vẽ và trang phục lệch mẫu. Đưa ảnh nền + chân dung cùng lúc thì model xếp người đứng tạo dáng trước nền. Đếm vật (số bánh) model hay sai: kiểm bằng mắt, sửa tay.

## Tối 08/10: nền ba bánh có vệt vụn và đôi dép (màn người chơi tự soi ở Trung thu)

| nguồn | đích | ghi chú |
|---|---|---|
| bg-mvp-san-ktx-trung-thu-ba-banh-vun | nen/bg-mvp-san-ktx-trung-thu-ba-banh (2048×1152) | Image Edit GPT Image 2, 2K, từ nền ba bánh cũ: thêm vệt vụn từ chân bàn ra đèn cá chép và đôi dép nhựa vàng của trẻ con cạnh đèn (khớp cg-be-na-den-ca-chep). Ba bánh giữ đúng. Tốn 0,8 credit. |
