# Cắt khít miếng nhép môi / chớp mắt (02/10/2026)

Lý do: miếng cũ (01/10) là hộp to (~200×170) cắt từ ảnh AI vẽ lại cả khuôn mặt lệch vài điểm ảnh, nên khi nhép thì cằm,
cổ áo, viền má, tóc, gọng kính cũng giật theo. Bộ mới chỉ thay đúng môi và mí mắt; ngoài vùng đó là ảnh gốc.

Chạy từ `prototype/` (cần numpy, scipy, Pillow), theo thứ tự:

1. `cat-mieng-moi.py <thư mục ra>` — từ `art/nguon/topview-2026-10-01/g2/g2-<ảnh>--mieng.png`: căn khớp cục bộ (±10px) quanh
   miệng, lấy khối môi/răng, khớp màu da theo vành ngoài, mép mềm → `mieng-moi.pkl`.
2. `cat-mat-moi.py <thư mục ra>` — từ `g2-<ảnh>--mat.png`: tìm hai mắt theo mống mắt → da, lấy hai khối mí → `mat-moi.pkl`.
3. `ghi-nhep.py` — ghi miếng vào game; ba ảnh Hoài (không có nguồn g2) cắt khít lại từ miếng cũ bằng `khit()` của `cat-khit.py`.
4. `loc-net-le.py [--ghi]` — mắt: phép mở hình thái bỏ vệt mảnh (lông mày, tóc, gọng kính, viền má); miệng: giữ viền môi, chỉ bỏ
   cụm rời. Tùng vui / Tùng áo xanh vui mắt đã híp sẵn nên không chớp.
5. `ghi-toa-do.py` — ghi tọa độ mới vào `src/mvp/ui/nhep-moi-mvp.ts` và `src/shared/ui/visuals/talk-rigs.ts`.

**Bộ mới thêm sau này** (đã có hộp tạm trong `nhep-moi-mvp.ts` và ảnh `g2-<ảnh>--mieng/--mat.png`): chạy
`cat-bo-moi.py <tên ảnh…>` (cắt mắt trước, miệng tìm 35–175 px dưới tâm mắt; ảnh Duy phóng nguồn bằng `can_duy` trước khi cắt),
rồi `loc-net-le.py --tep=mvp <tên ảnh…> --ghi` và `ghi-toa-do.py`. `--tep` cần vì ba ảnh Hoài có bộ ở cả MVP lẫn prototype.
28 bộ dàn nhân vật phụ (Duy, Nam, Khánh, Thảo, Bách, cô Hạnh, cô Lan, bác Tư, Hoài, thầy Khải, thầy Quang, chú Cường, Đạt,
Hiếu) đã cắt theo cách này.

`kiem-nhep.py` ghép miếng lên ảnh hiện tại và đo độ lệch để soi lại.
