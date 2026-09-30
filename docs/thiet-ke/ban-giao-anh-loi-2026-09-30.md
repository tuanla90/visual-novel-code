# Bàn giao ảnh và lời chương 1 (30/09/2026, tối)

Gửi phiên logic / giao diện. Viết bởi phiên ảnh và lời (nhánh `claude/topview-images-dialogue-4dee2c`).
Không đổi khung, SQL, mã thẻ, luật ngày. Bộ kiểm `npm run kiem-noi-dung:mvp` sạch, **0 dòng `(tạm)`**.

## 1. Lời

- **User chốt 30/09 tối: lời chương 1 lấy bản trên main** (phiên "Sửa kịch bản chương 1", 9b3d57a). Bản lời phiên này viết song song (từ lời tạm cũ) bỏ, không gộp.
- Phiên này chỉ thêm lên bản đó: biểu cảm có ảnh mới trong `nhan-vat.md` (Tùng surprised/thinking, Minh Anh serious, Duy smile/serious, Hiếu annoyed/surprised, chú Cường / bác Thịnh / cô Hạnh / cô Lan smile, thầy Quang stern/smile) và gắn vào vài dòng (Hiếu gắt ở căng tin, thầy Quang ở buổi họp, Tùng "Ơ…"); Tùng tả là **áo sơ mi cam, đeo thẻ** (ảnh không đội mũ) ở lời sảnh KTX, tiêu đề chuỗi và nhãn chỗ bấm.
- Khung `kich-ban/00-mo-dau.md`: tọa độ 2 chỗ bấm theo nền sảnh KTX mới (tờ giấy trên cửa thang máy x 12%, sơ đồ trên bảng tin x 44%), nhãn "Hỏi đường cậu bạn áo cam"; test `kham-pha-gioi-thieu.test.tsx` sửa theo nhãn.

## 2. Ảnh mới (Topview GPT Image 2.5, 1K, Unlimited; nguồn `art/nguon/topview-2026-09-30/`)

Tên tệp theo quy ước `anh-mvp.ts`, game tự tìm theo tên — **không cần sửa code** cho các ô ghi "tự nhận".

| Loại | Tệp | Dùng ở đâu |
|---|---|---|
| Ảnh giới thiệu 16:9 (nhân vật bên trái) | `src/assets/art/intro-{duy,chu-cuong,bac-tu,co-hanh,co-lan,thay-quang,thay-khai,hieu,dat,nguoi-choi-nam,nguoi-choi-nu}.webp` | Màn "Nhân vật mới" — **tự nhận** (`intro-<mã>`). `nguoi-choi-*` chưa có chỗ dùng. |
| Biểu cảm (768×1360, nền trong) | `src/assets/mvp/nhan-vat/char-<mã>-<biểu cảm>.png`: tung happy/worried/surprised/thinking, hoai nervous, duy smile/serious, hieu annoyed/surprised, chu-cuong smile, co-lan smile, co-hanh smile, bac-tu smile, thay-quang stern/smile, minh-anh serious | Hội thoại + tab Nhân vật — **tự nhận**. Nhãn tiếng Việt cho biểu cảm mới đã thêm ở `NhanVatMvp.tsx`. |
| Chibi từng nhân vật (nền trong, cắt sát) | `src/assets/mvp/chibi/chibi-<mã>.webp` (13 NPC + `nguoi-choi-nam`, `nguoi-choi-nu`) | **Cần nối:** tab Nhân vật (góc thẻ Polaroid) và ảnh nhỏ cạnh lời phản ứng ở màn thử thách (`ManThuThachMvp.tsx`, khối `mvp-chal__phanung`: `anhTheoTen('chibi-' + l.speaker)`). |
| Chibi cảnh gợi ý | `chibi-goi-y-{ha-vy-kinh-lup,ha-vy-tinh,tung-ca,tung-bi,minh-anh-chi,duy-chia-khoa}`, `chibi-0-dong`, `chibi-ra-ket-qua`, `chibi-bang-ghim`, `chibi-so-lieu-day` | **Cần nối:** hộp nhận xét ở màn thử thách — 0 dòng → `chibi-0-dong`; đúng → `chibi-ra-ket-qua`; chạy sai nhiều lần → `chibi-goi-y-tung-bi`. `chibi-so-lieu-day` cho hiệu ứng `co-so-lieu-day` ở buổi họp. |
| Chibi nhóm | `chibi-clb-nhom` (người chơi nam), `chibi-clb-nhom-nu`, `chibi-408-vali`, `chibi-la-thu` | Đầu trang Hồ sơ / màn kết / màn lưu. Chọn bản nam/nữ theo người chơi. |
| Nền | `src/assets/mvp/nen/bg-mvp-sanh-ktx.webp` (cảnh `sanh-ktx` — **tự nhận**), `bg-mvp-phong-clb-dem.webp`, `bg-mvp-hoi-truong.webp` | `phong-clb-dem`: engine chỉ lấy ảnh `-dem` cho "Cuối ngày" → cảnh tối ngày 5 (`n5-toi`) cần cảnh riêng (DX-02). `hoi-truong`: cho `md-08-tuan-cong-dan` nếu muốn thay nền nhà văn hóa. |
| Vật | `src/assets/mvp/vat/obj-hop-kien-nghi-trong.webp` (hộp chưa có thẻ lịch, cho Chủ nhật tuần 1 — DX-03), `obj-gian-robotics.webp`, `obj-ban-tham-tu.webp` | Cần dòng `- Ảnh:` / `[KHÁM PHÁ]` trong khung (`md-03-toa-b`, `md-09-ngay-hoi`). |
| Giấy tài liệu (chữ ký H: sinh 3 bản, chọn bản 1) | `art/mvp-vu1/giay/doc-{the-lich-cua-toi,so-chi-linh,bao-cao-yeu,thong-bao-hop,van-ban-thay-quang}.webp`, `doc-chu-ky-h.png` (nét mực, nền trong) | Màn xem tài liệu (chưa chép vào game; cùng chỗ với 4 giấy cũ). `doc-chu-ky-h` đặt lên giấy thư, phóng to khi xem xét. |
| CG | `src/assets/mvp/cg/cg-{bia,ket-that,ket-thuong,bong-huy-hieu}.webp` | Màn tiêu đề (`cg-bia`, chừa 25% trên cho tên game), màn kết (`KetMvp.tsx`), móc sang mùa sau (`cg-bong-huy-hieu`). |

Xử lý lại từ ảnh gốc: `python art/nguon/xu-ly-anh-2026-09-30.py [id…]` (tách nền hồng tím, đổi WebP, đặt đúng tên). Câu lệnh sinh: `art/prompts/sinh-hang-doi-2026-09-30.py` → `mvp-vu1-hang-doi-2026-09-30.json`.

## 3. Chưa làm / cần user quyết

- DX-01 (cắt chuyến dạo trường ở mở đầu), DX-02, DX-03 vẫn **chờ user duyệt** (`docs/thiet-ke/de-xuat.md` ở worktree phiên "Sửa kịch bản chương 1"). Lời mở đầu đã viết để đúng cả khi giữ lẫn khi cắt các chuỗi `md-02`…`md-06`.
- Thẻ `dat` trong `nhan-vat.md` giữ nguyên (chương 1 không dùng; có ảnh giới thiệu sẵn cho vụ sau).
