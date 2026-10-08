# Bộ thử B19 — `prototype/noi-dung-thu-b19/`

Bộ nội dung NHỎ, chỉ để test và thử tay các lệnh mới của gói B19 (docs/mua-1/brief/b19-vu-1-ban-6.md mục 4–5). Không phải
nội dung game: chữ là chữ thử, ngắn, không theo bản thoại 6.

Dùng đủ mọi lệnh mới:

- `dong-thoi-gian.md`: một dòng tập dượt 3 ô (thẻ tạm) và một dòng chính 5 ô (ô khóa sẵn, ô có phần "không điền được").
- `[DÒNG THỜI GIAN]` (mở đầu và ngày 1), `[HIỆN DÒNG THỜI GIAN]` (buổi họp).
- `[ĐIỂM LƯU VỤ vu1]` đầu ngày 1; `[GHÉP MẪU]` sau khi nhận hai thẻ.
- Buổi họp: `[SỬA TRUY VẤN … · tính vạch · câu 1/4]` (thẻ có "Khi trình sai"), `[ĐỐI CHẤT … · tính vạch]` hai lần (một thẻ đúng /
  hai thẻ đúng), `[HỎI … · tính vạch]`, `[SAI LẦN ĐẦU CẢ BUỔI]`, `[CHẤM VỤ vu1] cần: …`, `[RẼ KẾT]` theo rank.
- Sau họp: kết thật (đi qua cảnh `cong-ktx-bong-mo`) hoặc kết tạm, `[RẼ NHÁNH]` hai lựa chọn chỉ đặt cờ, `[SỔ TỔNG KẾT vu1]`,
  `[NẾU có vu1-rank-a] → đi tới canh-12`.

Lệnh (trong `prototype/`):

- `npm run kiem-noi-dung:thu-b19` — kiểm bộ này.
- `npm run noi-dung:sinh:thu-b19` — sinh `src/content/generated/thu-b19/kich-ban.gen.ts`.
- Chơi thử trên máy dev: `npm run dev` rồi mở `http://localhost:5173/?bo=thu-b19` (chỉ ở chế độ dev).
