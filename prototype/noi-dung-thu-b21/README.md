# Bộ thử B21 — `prototype/noi-dung-thu-b21/`

Bộ nội dung NHỎ để test và chơi thử tay các lệnh mới của gói B21-MÁY (note có loại / nguồn / keyword, chặng, nối note, bảng chân lý,
buổi họp chỉ ô, nhãn khối tiếng Việt). Chữ là chữ thử, không phải thoại Vụ 1. Hai chặng:

- **Chặng 1 · Hoài nào?** (23/09, 16:30; bản đồ ba ghim + hai chỗ ẩn). Phòng CLB: nhận thẻ lịch (quan sát) và "BC-24 = Báo chí khóa 2024"
  (suy luận), khối `[CÁC CÂU NỐI]` mở cặp **thẻ lịch + BC-24 → tra** (màn tra bảng `sinh_vien`, nhãn "Sinh viên", "Mã lớp"…). Sảnh tòa B:
  bác Thịnh đổi lời khi người chơi đã có thẻ lịch (`[NẾU có clue-the-lich]`); cặp **lời bác Thịnh + lá thư → hiện trường ghim:cong-ktx**
  mở thêm ghim cổng ký túc xá. Chặng chốt khi có `ev-hoai-bc24` (kết quả tra): máy chạy "Khi chốt" rồi sang chặng 2.
- **Chặng 2 · Hoài ra cổng lúc nào?** (27/09, 15:00). Chú Cường kể (manh mối) → tra sổ ra vào (sự thật, nguồn tra) →
  `[ĐỔI LOẠI clue-loi-cuong → sự thật]` → dựng bảng chân lý `dtg-vu1` → `[HẾT CHẶNG]`.
- **Buổi họp**: một lượt mẫu `[ĐỐI CHẤT … · chỉ ô · mẫu]` (thành lời viết sẵn) và hai lượt `· chỉ ô · tính vạch` (đáp án hai ô, ô sai có lời
  riêng, ô trống bắt buộc `{dtg-vu1:?}`), rồi `[CHẤM VỤ]`, `[RẼ KẾT]`.

Lệnh (trong `prototype/`):

- `npm run kiem-noi-dung:thu-b21` — kiểm bộ này.
- `npm run noi-dung:sinh:thu-b21` — sinh `src/content/generated/thu-b21/kich-ban.gen.ts`.
- Chơi thử trên máy dev: `npm run dev` rồi mở `http://localhost:5173/?bo=thu-b21` (chỉ ở chế độ dev).

Test: `src/content/real/testing/b21-doc.test.ts` (bộ đọc, máy kiểm), `src/mvp/engine/b21.test.ts` (máy), `src/mvp/ui/b21-ui.test.tsx`
(giao diện), `src/mvp/engine/b21-du-lieu.test.ts` (dữ liệu bộ mùa 1).
