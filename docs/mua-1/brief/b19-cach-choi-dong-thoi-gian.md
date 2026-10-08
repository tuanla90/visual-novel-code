# Cách chơi: dựng lại dòng thời gian — bản đơn giản (07/10/2026, chờ duyệt, chưa đụng code game)

> Ý user 07/10: "chỉ cần dựng lại được theo kiểu cho 1 dòng thời gian thiếu các ô thời gian, địa điểm, ai. Người chơi kéo
> bằng chứng vào là được. Sẽ có ô không điền được là ai đưa, thành câu hỏi lớn sau Vụ 1. Không nên có dữ liệu nhiễu / lừa,
> hoặc phải rất ít và rõ ràng." Mục tiêu: giữ tính vui, đừng thành vụ án nặng nề.

## Một câu

Cuối vụ, người chơi nhận một **dòng thời gian thiếu chỗ** (giờ, nơi, ai) và **kéo bằng chứng trong hồ sơ vào**. Chỗ nào không có bằng chứng thì để trống — chỗ trống ấy thành câu hỏi của vụ sau.

## Luật

1. Mỗi chỗ trống nhận một bằng chứng có thông tin ấy. Ví dụ: chỗ "giờ" nhận lời bác Thịnh "23:30"; chỗ "ai" nhận kết quả tra "SV240317 — Hoài".
2. Kéo sai thì bằng chứng bật lại, kèm một câu của nhân vật (Hà Vy, Duy… — nhẹ nhàng, không phạt nặng).
3. **Không có thẻ nhiễu.** Bằng chứng trong hồ sơ đều thật và đều dùng được; cái khó chỉ là đặt đúng chỗ.
4. **Một chỗ không điền được** (Vụ 1: ai đưa phong bì). Người chơi để trống; máy không bắt điền.
5. Lời người bị nghi không phải bằng chứng (luật thế giới).
6. Ở buổi giải trình: đối thủ nói một câu sai → người chơi chỉ vào ô và bằng chứng tương ứng. Sai từ 3 lần là rank C.

## Nhịp trong một vụ

- Vụ bánh Trung thu (mở đầu): 3 ô, kéo lời kể vào — tập dượt.
- Ngày điều tra: nhặt bằng chứng; bảng điều tra hiện dần các ô.
- Tối cuối: cả đội dựng thử.
- Buổi giải trình: trình bảng, hai lần đối chất, màn kể lại ngắn.

## Vụ 1 — 5 ô

| Ô | Chỗ trống | Bằng chứng |
|---|---|---|
| Ô1 | 23:30 Chủ nhật · tòa B · hộp trống | lời bác Thịnh |
| Ô2 | 6:44 · cổng ký túc xá · Hoài ra cổng | tra sổ ra vào |
| Ô3 | 6:45 · cổng ký túc xá · **[?]** đưa phong bì cho Hoài | lời chú Cường; người đưa **để trống** |
| Ô4 | 7:00–9:00 · tòa B · Hoài bỏ thư, ký phiếu | tra bảng sinh viên (Hoài VÀ Báo chí VÀ 2024), sổ niêm phong |
| Ô5 | 9:00 · cô Lan mở hộp, phong bì nâu | lời cô Lan |

## Màn hình

- Laptop: trục ngang, hồ sơ bên phải, kéo thả.
- Điện thoại dọc: trục dọc; chạm chỗ trống → danh sách bằng chứng hợp loại → chạm chọn.

## Việc ở game (khi duyệt)

1. Kiểu nội dung `dong-thoi-gian` cho mỗi vụ (ô, chỗ trống, bằng chứng hợp lệ) — sinh từ Story Pilot (`timeline_puzzle` trong `story/canon/mystery/CKYH.yaml`).
2. Màn bảng dòng thời gian, dựa trên bảng điều tra đang có.
3. Máy kiểm: chỗ trống nào (trừ chỗ "không điền được") cũng có ≥ 1 bằng chứng hợp lệ.
