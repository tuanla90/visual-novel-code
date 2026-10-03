# Brief viết lại thoại (v2) — dùng chung cho mọi vụ

Game: "CLB Thám Tử Dữ Liệu" — visual novel trinh thám học SQL, bối cảnh một trường đại học ở Việt Nam, năm học 2024–2025.
Người chơi là tân sinh viên năm nhất (tên và ngành do người chơi chọn: `{{nv.nguoi-choi}}`, `{{nv.nguoi-choi.nganh}}`),
ở phòng 408 ký túc xá, vào CLB Thám Tử. Không khí: hoài niệm thời sinh viên — ký túc xá, mì tôm, trà đá, nhóm chat,
trò đùa chạy dài giữa bạn bè. Truyện nhẹ nhàng nhưng nghiêm túc với sự thật.

Chủ đề cả mùa: **"Dữ liệu chỉ ra ai cần hỏi. Người trả lời mới là người nói 'vì sao'."** Không kết tội ai chỉ vì một
dòng dữ liệu khớp. Thầy Quang (người lập CLB) hay hỏi "Căn cứ vào đâu?".

## Nhân vật và giọng nói

| Mã | Tên | Tuổi / vai | Tính cách | Cách nói | Xưng hô |
|---|---|---|---|---|---|
| `player` | Người chơi | Năm nhất | Tò mò, ít nói, hay tự nghĩ trong đầu | Câu trong ngoặc `( … )` là suy nghĩ | tớ/cậu với bạn; em với khóa trên, thầy cô |
| `tung` | Tùng | Năm nhất Du lịch, bạn cùng phòng | Hay đùa, hay cá cược ("Tớ cá là…"), nhiệt tình, nhanh nhảu kết luận, thuộc đường | Câu ngắn, cảm thán, hay nói quá | tớ/cậu; em/chị với Minh Anh |
| `ha-vy` | Hà Vy | Năm nhất Toán ứng dụng | Logic, mê Sherlock Holmes, ít lời, nhìn ra chi tiết | Ngắn, khô, hay chặn người khác: "Khoan, tính lại đã.", "Đừng cá. Tính." Không giảng bài | tớ/cậu; em/chị |
| `minh-anh` | Minh Anh | Năm ba Luật kinh tế, chủ nhiệm | Nghiêm túc, có trách nhiệm, không đùa lúc bận, che chở người mới | "Nói có sách, mách có chứng." Ra quyết định gọn | chị/em với năm nhất, năm hai |
| `duy` | Duy | Năm hai Hành chính học | Giữ chìa khóa, tủ hồ sơ, sổ tài sản; đúng quy trình, điềm | Bình thản, nói về giấy tờ, ngăn nào có gì | tớ/cậu với năm nhất; em/chị với Minh Anh |
| `quan` | Quân | Ban Pháp chế Hội sinh viên | Bám quy chế, soi từng chữ, hơi tự đắc | Ngắn, lạnh: "Biết ai nộp chưa có nghĩa là biết ai viết." | tôi/các bạn |
| `hieu` | Hiếu | Năm nhất BC24A | Nói thẳng, hơi gắt, bực vì nhóm xin phòng không được | "Tôi nói thẳng vậy thôi." | tôi/các bạn |
| `hoai` | Hoài | Năm nhất BC24A, người nộp thư hộ | Rụt rè, nói nhỏ, ngập ngừng | "Dạ… vâng ạ." | em với khóa trên; tớ với bạn |
| `chu-cuong` | Chú Cường | Bảo vệ KTX, chú của Tùng | Xởi lởi, nhớ chuyện cũ | Kể chuyện, hay nhắc "hồi đó" | chú/cháu |
| `bac-tu` | Bác Thịnh | Bảo vệ tòa B | Ít lời, đúng giờ, không thấy tận mắt thì không nói | Rất ngắn | bác/cháu |
| `co-hanh` | Cô Hạnh | Phòng Đào tạo, sắp nghỉ hưu | Hiền nhưng cấp quyền rất chặt | "Xin gì cho nấy, dùng xong là khóa." | cô/các em |
| `co-lan` | Cô Lan | Phòng Công tác sinh viên, trẻ | Nhanh nhẹn, đúng quy chế | Gọn, rõ | cô/các em |
| `thay-quang` | Thầy Quang | Phó hiệu trưởng, người lập CLB thời sinh viên | Điềm, chỉ quyết theo căn cứ | "Các em còn gì trình thêm không?", "Căn cứ vào đâu?" | thầy/các em |
| `ba-lua` | Bà bán trà đá | Bán ở cổng trường hai chục năm | Nhớ cốc chứ không nhớ tên, hay kể | Giọng bà cụ, mộc | bà/các cháu |

Biểu cảm hợp lệ (dùng SAI là lỗi máy): xem dòng `- Biểu cảm:` của từng nhân vật trong
`prototype/noi-dung-mvp/nhan-vat.md`. Ví dụ Minh Anh KHÔNG có `smile`/`thinking` (chỉ neutral, worried, happy, serious,
khoanh-tay); Duy chỉ neutral, smile, serious.

## Luật viết (user chốt)
1. **Show, don't tell.** Điều không hay (lỗi, gian lận, trốn học…) phải có cảnh cho thấy hậu quả, không ai đứng giảng.
2. **Gợi ý không liệt kê.** Nhân vật không đọc ra danh sách chỗ cần tìm / đáp án. Gợi bằng một câu, để người chơi tự nghĩ.
3. Thoại **giọng sinh viên tự nhiên, câu ngắn** (thường dưới 25 chữ). Không văn mẫu, không sến, không giải thích lại điều
   người chơi vừa thấy. Lớp 5 là mức của THAO TÁC trong game, không phải của lời thoại.
4. **Giới thiệu nhân vật đúng trình tự:** lần đầu gặp thì dùng tên tạm ("Cậu bạn áo xanh"), có câu dẫn + câu tự xưng rồi
   mới biết tên.
5. **Trò đùa chạy dài** (số cốc trà đá Tùng nợ, "tớ cá là…") giữ nguyên tinh thần, số tự nhảy ngoài màn hình.
6. Không đổi **dữ kiện**: ngày giờ, mã sinh viên, mã lớp, số dòng, tên tệp, nội dung dữ liệu, ai biết gì lúc nào.
   Không để nhân vật biết trước điều chỉ lộ ra ở vụ sau.

## Định dạng (bắt buộc giữ để máy đọc được)
- Giữ NGUYÊN mọi tiêu đề `## <mã>` và thứ tự của chúng (máy gắn lời vào khung bằng mã). Không thêm/bớt mã.
- Trong mỗi khối, được sửa / thêm / bớt dòng. Các loại dòng: `- **<mã nhân vật>** (<biểu cảm>): <lời>`, `- **player**: <lời>`,
  `- **narrator**: <lời>`, `- [THẺ CHỮ] **narrator**: …`, `- [DÀN DỰNG] …` (chỉ dẫn, không hiện), `> NHIỆM VỤ: …`,
  `> NHẮC VIỆC <mã> (<biểu cảm>): …`, `- Khi chạy ra <n> dòng…: …` (phản hồi màn SQL — giữ nguyên điều kiện, chỉ sửa lời).
- Giữ các biến `{{nv.<mã>}}`, `{{nv.nguoi-choi}}`, `{{nv.nguoi-choi.nganh}}`.
- Dòng `<!-- … -->` là ghi chú tác giả: giữ nguyên.

## Đầu ra
Viết bản v2 vào thư mục được chỉ định (KHÔNG sửa tệp gốc). Mỗi tệp gốc → một tệp cùng tên. Đầu mỗi tệp v2 thêm khối
`<!-- V2: … -->` liệt kê: khối nào đổi, đổi gì, vì sao (một dòng mỗi khối). Khối không cần đổi thì chép y nguyên.
