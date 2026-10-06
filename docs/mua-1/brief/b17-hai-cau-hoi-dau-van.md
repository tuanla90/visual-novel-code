# Gói B17: hai câu hỏi đầu ván (mức nhập vai, mức SQL)

User (06/10/2026 sáng): "Tôi muốn vào game user được hỏi 2 câu: (1) bạn muốn trải nghiệm nhập vai thám tử đến đâu, chia 3 nấc: Dễ: với ngoại cảnh thì có dấu chấm than, chấm hỏi, vào trong cũng có trên từng vật thể, vào nói chuyện với người thì tự chạy. Bình thường: vào trong thì không có hướng dẫn trên từng vật, nói chuyện thì chọn nút. Thực tế: không có gì hết, nói chuyện phải chat. (2) bạn muốn trải nghiệm SQL đến đâu, cũng 3 nấc: Dễ: như hiện tại. Trung bình: thay các từ hiện tại thành SQL keyword kiểu select, where, like. Khó: cho user tự viết hoàn toàn. Các từ tôi vừa nói là định hướng, không phải quyết định. Bạn chau chuốt từ ngữ và thiết lập các điều kiện khác nếu có mà tôi chưa nhắc đến."

Chỉ áp cho bộ mùa 1 (`?bo=mua-1`). Bộ MVP không có màn hỏi, chạy y như cũ.

## Màn hỏi

Hiện ngay sau khi bấm "Chơi mới" (trước màn tạo nhân vật), hai câu trên một màn hoặc hai bước, nền tối cùng tông thẻ chữ của game. Mỗi câu ba lựa chọn dạng thẻ, có mô tả hai dòng; chọn sẵn nấc giữa của câu 1 và nấc đầu của câu 2; dòng nhỏ dưới cùng: "Đổi lúc nào cũng được, trong Cài đặt." Nút "Bắt đầu". Bàn phím đi được (mũi tên, Enter). Màn hẹp xếp dọc.

Chữ trên màn (dùng đúng chữ này, không gạch dài, không mũi tên):

**Câu 1: "Cậu muốn nhập vai thám tử tới mức nào?"**
- **Có người dẫn** · "Chỗ cần xem có dấu, kể cả chi tiết nhỏ. Hỏi chuyện thì nhân chứng tự kể, cậu ngồi nghe."
- **Tự dò** (chọn sẵn) · "Trên bản đồ có dấu, vào trong thì không. Hỏi chuyện bằng cách chọn câu hỏi."
- **Như thật** · "Không dấu nào cả. Muốn biết gì phải tự hỏi bằng lời của mình."

**Câu 2: "Cậu muốn tra dữ liệu tới mức nào?"**
- **Ghép khối** (chọn sẵn) · "Ghép câu tra bằng các ô chữ tiếng Việt. Chưa cần biết gì về SQL."
- **Ghép khối, chữ SQL** · "Vẫn ghép ô, nhưng các ô mang đúng từ của SQL: SELECT, WHERE, LIKE…"
- **Tự viết** · "Gõ thẳng câu SQL. Có bảng để xem cột, có bạn đi cùng để hỏi."

## Luật từng nấc

### Mức nhập vai (`mucNhapVai`: `dan` | `tu-do` | `that`)

| | Có người dẫn | Tự dò | Như thật |
|---|---|---|---|
| Ghim trên bản đồ | dấu "!" / "?" như hiện nay | như hiện nay | không dấu; ghim vẫn bấm được; ghim đã ghé vẫn đổi trạng thái |
| Người trong cảnh | dấu "!" / "?" | dấu "!" / "?" | không dấu |
| Vật trong cảnh (điểm thường và chi tiết ẩn) | mọi vật bấm được có một chấm nhỏ (không nháy, không phát sáng; dấu "!" / "?" giữ nguyên nếu có) | không dấu | không dấu |
| Cách hỏi nhân chứng mặc định | "Xem cả đoạn" (khung hỏi vẫn mở, bấm "Nghe … kể") | "Bấm câu hỏi" | "Gõ câu hỏi" |
| Ba nút đổi cách trong khung hỏi | vẫn có; đổi tại chỗ chỉ áp cho buổi hỏi đó, không đổi mức | như vậy | như vậy |
| Bạn đi cùng ở cảnh và màn tra | tự lên tiếng gợi ý bậc 1 sau 2 lần trượt, hoặc 40 giây không bấm gì ở cảnh có việc chính | chỉ khi bấm ảnh mặt, hoặc sau 2 lần trượt ở màn tra (như B14) | chỉ khi bấm ảnh mặt; bậc 2 chỉ hiện sau bậc 1 |
| Ô "Việc đang làm" | như hiện nay | như hiện nay | như hiện nay (đây là việc, không phải gợi ý) |

Ghi chú: chấm nhỏ của nấc "Có người dẫn" là ngoại lệ của quyết định 05/10 (chi tiết ẩn không nháy, không phát sáng) và CHỈ có ở nấc này.

### Mức SQL (`mucSql`: `ghep` | `ghep-sql` | `tu-viet`)

| | Ghép khối | Ghép khối, chữ SQL | Tự viết |
|---|---|---|---|
| Màn tra | như hiện nay | cùng giao diện ghép; nhãn đổi: "1. NGUỒN BẢNG" thành "FROM", "2. ĐIỀU KIỆN LỌC" thành "WHERE", "3. CỘT & SẮP XẾP" thành "SELECT · ORDER BY", "LẤY CỘT" thành "SELECT", "bằng" thành "=", "bắt đầu bằng" thành "LIKE 'x%'", "một trong" (nếu có) thành "IN", "VÀ" / "HOẶC" thành "AND" / "OR", "CHẠY" thành "RUN"; dòng SQL dưới màn giữ nguyên | ô gõ SQL nhiều dòng thay cho ba cột ghép, nút "CHẠY"; bên dưới vẫn là bảng kết quả, con số, đống phiếu, hoạt cảnh rụng dòng, "bấm ô lấy giấy nhớ", "Ghim lên bảng" như cũ; nút "Khảo sát bảng" vẫn có; bấm một tờ giấy nhớ thì chèn giá trị của nó (trong nháy đơn) vào chỗ con trỏ |
| Gợi ý bậc 2 của bạn đi cùng | như B14 | cùng câu, nhưng các chữ trên màn trong câu đổi theo nhãn mới (làm bằng một bảng thay chữ áp lúc hiện, KHÔNG sửa tệp lời) | cùng câu gốc, thay cụm thao tác ghép bằng câu "Gõ … rồi CHẠY" theo bảng thay chữ; nếu không thay được sạch thì chỉ hiện bậc 1 kèm câu SQL chuẩn bị che giá trị (giữ cấu trúc câu) |
| Chấm | như hiện nay | như hiện nay | so tập kết quả với SQL chuẩn như máy đang làm cho câu ghép (kể cả luật "câu hẹp mà đủ" của B15 nếu đã có); không bắt khớp chữ; khác thứ tự dòng vẫn đúng trừ thẻ có ORDER BY; thiếu cột nộp thì lời "Khi thiếu cột" như cũ |
| Lỗi cú pháp | không có | không có | hiện câu lỗi của SQLite dịch gọn sang tiếng Việt dưới ô gõ (ví dụ "Không có bảng tên …", "Thiếu dấu nháy", "Không có cột …"), không chạy hoạt cảnh |
| Màn lọc thử ở Ngày hội và màn sửa câu ở buổi họp | như hiện nay ở mọi nấc (hai màn đó là cốt truyện, không phải bài tự làm) | | |

Mã có sẵn dùng lại cho "Tự viết": `src/sql-challenge/ui/SqlPane.tsx` (ô gõ kiểu terminal), `src/sql-challenge/engine/` (`run.ts`, `compare.ts`, `diagnose.ts`, `grade.ts`), và cách chạy câu của bộ MVP ở `src/mvp/engine/sql-mvp.ts`. Chọn một đường, đừng dựng hai bộ chấm.

## Nơi lưu và đổi

- Hai mức lưu trong trạng thái ván (`TrangThaiMvp`), cùng ô lưu; thêm vào `sessionStorage` để lần "Chơi mới" sau chọn sẵn nấc cũ.
- Đổi trong game: menu Cài đặt (nút ba gạch) thêm mục "Cách chơi" mở lại đúng màn hai câu hỏi với nấc đang chọn; đổi xong áp ngay (ván không reset). Khung hỏi nhân chứng vẫn có ba nút đổi cách như B12; chọn ở đó không đổi `mucNhapVai`.
- Ván lưu trước gói này không có hai trường: nạp lên coi như "Tự dò" + "Ghép khối".
- Máy tự chơi, điểm nhảy của người quan sát, công cụ quay ván (`tools/quay-van`): mặc định "Tự dò" + "Ghép khối"; màn hỏi không chặn máy tự chơi (máy đặt thẳng hai mức).

## Ràng buộc

Như các gói trước: chỉ bộ mùa 1 đổi hành vi, bộ MVP y nguyên (không màn hỏi, không đổi nhãn); không `npm install`, không commit, không push, không đổi nhánh, không chạy cả bộ `npm test`, vitest `--maxWorkers=2` tệp liên quan, không dev server, không trình duyệt; gộp `import { X, type A }`; CSS màn hẹp sửa cả `.game--portrait` lẫn `@media`; chữ hiện cho người chơi là tiếng Việt có dấu, không gạch dài, không mũi tên; không sửa `docs/mua-1/giao-viec.md`. Lời mới (nếu có) theo `noi-dung-mua-1/giong/` và `nen-loi/`.

## Test phải có

- Màn hỏi hiện sau "Chơi mới" ở bộ mùa 1, không hiện ở bộ MVP; chọn rồi "Bắt đầu" thì vào truyện với hai mức đã lưu.
- Ba nấc nhập vai: dấu trên ghim và điểm bấm đúng bảng; cách hỏi mặc định đúng; đổi cách trong khung hỏi không đổi mức.
- Ba nấc SQL: nhãn đổi đúng ở "Ghép khối, chữ SQL"; "Tự viết" chấm đúng câu tương đương, báo lỗi cú pháp, lấy giấy nhớ và ghim được; hai màn cốt truyện không đổi.
- Lưu, nạp giữ hai mức; ô lưu cũ nạp thành mặc định.
- Máy tự chơi hết Vụ 1 ở cả chín tổ hợp (3 × 3) tới kết thật; `hoi-dap-vu-1.test.ts` và `dieu-huong-tu-do.test.ts` vẫn qua, không nới.

## Kiểm trước khi báo (ở `prototype/`, lần lượt)

`npm run noi-dung:sinh:mua1`; `npm run kiem-noi-dung:mua1`; `npm run kiem-noi-dung:mvp`; `npm run kiem-giong:mua1 -- --chi-loi`; vitest các tệp thêm và đụng cùng `src/mvp/engine/` (một đợt), `src/mvp/ui/` (một đợt), `src/mvp/store/kho-mvp.test.ts`, `src/content/real/testing/mua1-t0.test.ts`; `npm run typecheck`; `git checkout -- .vite-canary`.

Báo cáo: tệp thêm và sửa; nguyên văn chữ hiện trên màn hỏi và mọi chữ giao diện mới; dòng cuối thật của từng lệnh; chỗ cần thử tay (theo từng bước bấm, cho cả chín tổ hợp ít nhất một màn mỗi nấc); việc chưa làm hoặc còn ngờ.
