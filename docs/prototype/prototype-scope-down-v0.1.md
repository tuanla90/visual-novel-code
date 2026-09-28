# CLB Thám Tử Dữ Liệu — Phạm vi prototype tinh gọn (v0.1)

> Tài liệu này định nghĩa prototype đầu tiên dùng để kiểm chứng lối chơi cốt lõi của **CLB Thám Tử Dữ Liệu**.
>
> Prototype không phải bản demo thương mại và không phải Vụ 1 hoàn chỉnh. Mục tiêu của nó là trả lời nhanh, với chi phí thấp, liệu trải nghiệm **tìm manh mối → viết truy vấn → diễn giải kết quả → dùng bằng chứng để phản bác** có dễ hiểu, có giá trị học tập và có đủ hấp dẫn để tiếp tục đầu tư hay không.
>
> **Trạng thái 28/09/2026:** tài liệu này là phạm vi của **prototype vòng thử nghiệm 1** và vẫn đúng cho prototype đang chạy. Với bản MVP, nhiều mục đã bị các quyết định sau thay: §2.2 và §8 (bản đồ, tạo nhân vật, uy tín, xếp hạng — QĐ-076, QĐ-077); §2.3 (Tùng, bộ ba — QĐ-074, QĐ-081); §4.2–§4.4 và §5.1 (thứ tự thử thách, dữ liệu BC24A, câu OR 14 dòng, bàn làm việc với giấy nhớ — QĐ-071 → QĐ-073); §4.4 (phản biện 5 nhịp, câu hô "Số liệu đây!" — QĐ-082, QĐ-083); trường nay là Đại học Chấn Hưng (QĐ-080). Khi làm MVP, theo `docs/lich-su-quyet-dinh.md`.
>
> Tài liệu liên quan:
> - [`clb-tham-tu-du-lieu-GDD-v0.5.md`](../thiet-ke/clb-tham-tu-du-lieu-GDD-v0.5.md)
> - [`vu1-buoi-giai-trinh-kich-ban.md`](../thiet-ke/vu1-buoi-giai-trinh-kich-ban.md)
> - [`vu-tru-chan-hung-tong-quan.md`](../thiet-ke/vu-tru-chan-hung-tong-quan.md)

---

## 1. Quyết định sản phẩm

### 1.1. Người chơi mục tiêu đầu tiên

Prototype chỉ tối ưu cho nhóm:

> **Sinh viên năm nhất khối kinh tế, đã quen bảng tính nhưng chưa học hoặc mới bắt đầu học SQL, chơi trên laptop.**

Không dùng prototype này để đồng thời kiểm chứng học sinh cuối cấp, người đã biết SQL, người đi làm và người chơi thuần visual novel.

**Lý do:** các nhóm trên có động lực, vốn từ và kỳ vọng khác nhau. Chọn một nhóm hẹp giúp đánh giá chính xác người chơi không hiểu do thiết kế chưa tốt hay do sản phẩm không phù hợp đối tượng.

### 1.2. Giả thuyết giá trị

Sau một trải nghiệm 20–30 phút, người chưa biết SQL có thể:

1. Hiểu bảng dữ liệu là nơi đặt câu hỏi có cấu trúc.
2. Tạo một truy vấn có `SELECT`, `FROM`, `WHERE` và nhiều điều kiện.
3. Phân biệt `AND` với `OR` trong một tình huống có ý nghĩa.
4. Hiểu rằng kết quả truy vấn cần được **diễn giải**, không tự động trở thành kết luận điều tra.
5. Cảm thấy việc dùng dữ liệu để phản bác trong câu chuyện đủ thú vị để muốn chơi tiếp.

### 1.3. Câu hỏi prototype phải trả lời

| Câu hỏi | Dấu hiệu tích cực |
|---|---|
| Người mới có hiểu phải làm gì mà không cần người hướng dẫn ngồi cạnh không? | Phần lớn người thử hoàn thành được |
| Trình dựng truy vấn có giúp học SQL hay chỉ giúp đoán đáp án? | Người chơi giải thích được SQL vừa tạo |
| Kết quả truy vấn có gắn tự nhiên với câu chuyện không? | Người chơi nói được kết quả chứng minh gì và chưa chứng minh gì |
| Màn phản bác có tạo cảm giác thỏa mãn không? | Đây là một trong các khoảnh khắc được nhớ và nhắc lại |
| Người chơi có muốn làm truy vấn tiếp theo không? | Có ý định chơi tiếp sau khi prototype kết thúc |

Nếu prototype chưa trả lời tốt các câu hỏi trên, chưa mở rộng asset, hệ thống sinh đề hoặc các vụ tiếp theo.

---

## 2. Phạm vi trải nghiệm

### 2.1. Thời lượng và cấu trúc

**Thời lượng mục tiêu:** 20–30 phút.

| Phần | Thời lượng | Nội dung |
|---|---:|---|
| Mở đầu | 3–4 phút | Giới thiệu CLB, lá thư và nhiệm vụ xác minh người đã bỏ thư |
| Điều tra | 5–7 phút | Xem lá thư, hỏi bác Tư, xem bookmark; nhận ba manh mối |
| Phân tích dữ liệu | 8–10 phút | Thực hiện ba thử thách SQL tăng dần |
| Giải trình | 5–7 phút | Bắt lỗi truy vấn dùng `OR`; phân biệt nghi vấn với bằng chứng |
| Kết | 1–2 phút | Xác minh độc lập, hé lộ người nhờ bỏ thư và lời mời chơi tiếp |

### 2.2. Địa điểm

Prototype chỉ có ba màn hình kể chuyện:

1. **Phòng CLB** — nhận vụ và xem lá thư.
2. **Hành lang giảng đường** — hỏi bác Tư, xem hộp góp ý và bookmark.
3. **Phòng giải trình** — đối thoại với Quân và nhân chứng.

Không có bản đồ tự do. Chuyển cảnh bằng nút nhiệm vụ tiếp theo.

**Lý do:** bản đồ không phải giả thuyết cốt lõi ở giai đoạn này. Loại bỏ bản đồ giúp tập trung kiểm chứng quan hệ giữa manh mối, SQL và giải trình.

### 2.3. Nhân vật

Chỉ sử dụng năm nhân vật:

- Người chơi.
- Minh Anh — giao nhiệm vụ và giữ nhịp câu chuyện.
- Hà Vy — gợi ý cách đọc dữ liệu.
- Quân — đưa ra diễn giải và truy vấn sai.
- Nhân chứng — người đã bỏ hộ lá thư.

Bác Tư xuất hiện dưới dạng chân dung nhỏ hoặc lời kể, không cần bộ biểu cảm riêng. Tùng, thầy Quang, thầy Khải và các nhân vật khác chưa xuất hiện trong prototype.

**Lý do:** mỗi nhân vật chỉ được giữ lại nếu có chức năng riêng trong vòng chơi. Việc giới thiệu quá nhiều nhân vật trong 20–30 phút làm tăng lời thoại và asset nhưng không giúp kiểm chứng cơ chế học.

### 2.4. Dữ liệu

Prototype dùng một bộ dữ liệu cố định, được tác giả kiểm soát:

- 30–50 sinh viên.
- 6–8 lớp sinh hoạt.
- 4 câu lạc bộ.
- Hai bảng: `sinh_vien`, `lop_sinh_hoat`.
- Tên và dữ liệu hoàn toàn hư cấu.

Chưa có mã đề và chưa sinh dữ liệu ngẫu nhiên.

**Lý do:** dữ liệu cố định giúp viết tình tiết chặt, quan sát cùng một hành vi ở mọi người thử và sửa lỗi nhanh. Khả năng chống chép chưa phải rủi ro cần giải quyết trước khi biết game có vui và có dạy được hay không.

---

## 3. Vòng chơi cốt lõi

```text
Quan sát manh mối
        ↓
Chuyển manh mối thành điều kiện dữ liệu
        ↓
Tạo và chạy truy vấn
        ↓
Đọc, giải thích và lưu kết quả
        ↓
Dùng kết quả để bác một phát biểu sai
        ↓
Xác minh bằng nguồn độc lập trước khi kết luận
```

Mỗi manh mối được giữ trong prototype phải thay đổi ít nhất một trong ba yếu tố:

- Câu hỏi người chơi đang muốn trả lời.
- Cấu trúc hoặc điều kiện của truy vấn.
- Cách diễn giải kết quả.

Không thêm thao tác point-and-click chỉ để kéo dài thời gian hoặc nhặt một giá trị không ảnh hưởng đến suy luận.

---

## 4. Kịch bản prototype

### 4.1. Tiền đề

CLB Thám Tử nhận được thư đề nghị thu hồi phòng. Phòng Công tác sinh viên không yêu cầu CLB “tìm thủ phạm”; họ chỉ nhờ CLB xác minh ai đã trực tiếp bỏ lá thư để hỏi nguồn gốc và làm rõ quy trình tiếp nhận.

CLB được cung cấp một **view dữ liệu tối thiểu** cho mục đích này. View chỉ chứa mã sinh viên, tên, lớp và câu lạc bộ; không chứa ngày sinh, quê quán, số điện thoại hoặc thông tin KTX. Quyền truy cập chỉ tồn tại trong buổi làm việc.

### 4.2. Ba manh mối

1. Chữ ký ngoài phong bì bắt đầu bằng chữ `H`.
2. Hộp góp ý được mở sáng hôm đó nằm ở giảng đường B.
3. Một nửa bookmark của CLB Báo chí được tìm thấy sát khe hộp.

Các manh mối này chỉ đủ để tạo **danh sách cần xác minh**, không đủ để kết luận ai đã bỏ thư.

### 4.3. Ba thử thách SQL

#### Thử thách 1 — Lọc theo một điều kiện

**Câu hỏi:** Trong dữ liệu có những sinh viên nào có tên bắt đầu bằng `H`?

```sql
SELECT ma_sv, ho_dem, ten
FROM sinh_vien
WHERE ten LIKE 'H%';
```

**Mục tiêu học:** `SELECT`, `FROM`, `WHERE`, `LIKE` và ký hiệu `%`.

#### Thử thách 2 — Lấy danh sách lớp tại một tòa

**Câu hỏi:** Những lớp sinh hoạt nào thuộc giảng đường B?

```sql
SELECT ma_lop
FROM lop_sinh_hoat
WHERE toa_nha = 'B';
```

**Mục tiêu học:** chọn đúng bảng, chọn đúng cột và hiểu kết quả của một truy vấn có thể trở thành đầu vào cho câu hỏi tiếp theo.

#### Thử thách 3 — Kết hợp các manh mối

**Câu hỏi:** Ai đồng thời khớp cả ba manh mối?

```sql
SELECT ma_sv, ho_dem, ten, ma_lop, clb
FROM sinh_vien
WHERE ten LIKE 'H%'
  AND ma_lop IN ('KT24A', 'QT24B')
  AND clb = 'Báo chí';
```

Kết quả trả về hai người, không phải một người.

**Mục tiêu học:** `AND`, `IN` và ý nghĩa của việc thỏa đồng thời nhiều điều kiện.

### 4.4. Màn giải trình

Quân đưa ra truy vấn:

```sql
SELECT ma_sv, ho_dem, ten, ma_lop, clb
FROM sinh_vien
WHERE ten LIKE 'H%'
   OR ma_lop IN ('KT24A', 'QT24B')
   OR clb = 'Báo chí';
```

Quân kết luận có quá nhiều người nên các manh mối vô dụng. Người chơi phải:

1. Chỉ ra `OR` làm truy vấn lấy người thỏa **bất kỳ** điều kiện nào.
2. Đổi thành `AND` để tìm người thỏa **đồng thời** các điều kiện.
3. Giải thích rằng hai dòng kết quả chỉ là hai người cần xác minh, chưa phải hai “thủ phạm”.

Quân hỏi: “Nếu dữ liệu chưa kết luận được, CLB dựa vào đâu để biết ai đã bỏ thư?”

Đây là cú lật chính của prototype. Lựa chọn đúng là yêu cầu một nguồn xác minh độc lập, không tiếp tục thêm điều kiện tùy tiện cho đến khi database chỉ còn một dòng.

### 4.5. Bằng chứng xác minh độc lập

Cán bộ phụ trách hộp góp ý cung cấp sổ bàn giao niêm phong. Sổ chỉ ghi mã sinh viên của người đã ký khi gửi phong bì có yêu cầu phản hồi chính thức. Mã khớp với một trong hai người trong danh sách.

Nhân chứng thừa nhận đã bỏ hộ lá thư cho một sinh viên năm cuối đeo huy hiệu Robotics. Nhân chứng không bị gọi là thủ phạm và không bị làm bẽ mặt.

**Thông điệp kết:**

> SQL giúp thu hẹp điều cần kiểm tra. Bằng chứng và cách diễn giải mới quyết định ta có thể kết luận đến đâu.

Chi tiết về Robotics có thể được giữ làm móc câu cho bản đầy đủ, nhưng prototype kết thúc tại đây.

---

## 5. Trình dựng truy vấn

### 5.1. Một giao diện, hai cách thao tác

Prototype không xây Blockly đầy đủ và không chia thành “Khối lệnh” với “Hardcore”. Dùng một trình dựng truy vấn có cấu trúc:

- Các hàng `SELECT`, `FROM`, `WHERE` luôn nhìn thấy.
- Người chơi chọn bảng, cột, phép so sánh và giá trị từ danh sách.
- SQL tương ứng cập nhật ngay bên cạnh.
- Người chơi có thể chuyển sang sửa SQL trực tiếp nếu muốn.
- Khi chạy, kết quả hiện trong bảng cùng số dòng trả về.

### 5.2. Gợi ý lỗi

Gợi ý tập trung vào ý nghĩa thay vì chỉ báo cú pháp:

- “Truy vấn đang trả về người chỉ cần thỏa một điều kiện. Em muốn **bất kỳ** hay **đồng thời**?”
- “Kết quả có đúng cột cần dùng để trả lời câu hỏi không?”
- “Hai dòng này cho biết ai cần hỏi tiếp, hay đã đủ để kết luận hành vi?”

Không trừ thanh uy tín khi người chơi chạy sai SQL trong prototype. Cho phép thử lại không giới hạn.

**Lý do:** prototype cần quan sát quá trình học và thử nghiệm. Hình phạt có thể khiến người mới ngại chạy truy vấn, trong khi chạy và sửa chính là hành vi cần khuyến khích.

---

## 6. Phạm vi kỹ thuật

### 6.1. Có trong prototype

- Ứng dụng web chạy trên laptop.
- Một luồng tuyến tính, lưu trạng thái trong phiên hiện tại.
- Hội thoại dạng dữ liệu đơn giản.
- Ba điểm xem xét được chỉ rõ, không săn pixel.
- SQLite chạy trong trình duyệt.
- Trình dựng truy vấn có SQL song song.
- Chạy SQL và hiển thị kết quả.
- Chấm theo yêu cầu ngữ nghĩa của từng thử thách.
- Một màn bắt lỗi truy vấn của Quân.
- Theo dõi sự kiện thử nghiệm cơ bản nếu có môi trường phù hợp.

### 6.2. Cách chấm tối thiểu

Không chỉ so chuỗi SQL. Với mỗi thử thách, kiểm tra:

- Kết quả có đúng số dòng và giá trị cần thiết.
- Có các cột bắt buộc để trả lời câu hỏi.
- Không chấp nhận truy vấn trả về toàn bảng rồi dựa vào người chơi tự tìm bằng mắt.
- Thứ tự dòng chỉ được xét khi bài yêu cầu sắp xếp.
- Tên alias không ảnh hưởng nếu dữ liệu tương đương.

Ngoài việc chạy trên dataset chính, thử thách 3 được chạy trên một dataset kiểm tra ẩn nhỏ để tránh truy vấn tình cờ cho đúng kết quả.

### 6.3. Kiến trúc vừa đủ

Tách bốn thành phần:

1. `story`: cảnh, lời thoại và trạng thái hiện tại.
2. `evidence`: manh mối đã mở và nguồn của chúng.
3. `sql-challenge`: schema, yêu cầu, chạy và chấm truy vấn.
4. `debrief`: câu hỏi diễn giải kết quả và phản bác.

Không thiết kế API chung cho HTML/CSS, Python robot hoặc Python game ở prototype.

**Lý do:** chỉ tổng quát hóa những gì đã có ít nhất hai nhu cầu thực tế. Kiến trúc dùng chung quá sớm có thể làm chậm việc thay đổi vòng chơi SQL sau mỗi buổi thử nghiệm.

---

## 7. Asset tối thiểu

Prototype có thể dùng hình phác hoặc hình tạm. Mức tối đa trước vòng test đầu tiên:

| Nhóm | Phạm vi |
|---|---|
| Nhân vật | 4 bộ chân dung chính, mỗi người 2–3 biểu cảm; nhân chứng dùng một mẫu |
| Cảnh | Phòng CLB, hành lang giảng đường, phòng giải trình |
| Vật chứng | Lá thư, bookmark, sổ bàn giao |
| Hiệu ứng | Một màn chữ “Có số liệu đây!” |
| Âm thanh | Tùy chọn; không chặn việc test |

Chưa vẽ nhân vật chính theo lớp, trang phục, cảnh ngày/đêm, bản đồ, CG mở đầu hoặc hoạt ảnh khuôn mặt.

**Lý do:** chất lượng hình ảnh có thể ảnh hưởng cảm nhận, nhưng hiện chưa phải biến số cần tối ưu. Vòng test đầu tiên cần phát hiện vấn đề về hiểu nhiệm vụ, truy vấn và suy luận.

---

## 8. Những nội dung chủ động không làm

| Không làm trong prototype | Lý do |
|---|---|
| Mã đề và sinh dữ liệu ngẫu nhiên | Tăng mạnh chi phí kiểm thử, làm kịch bản khó kiểm soát; chưa chứng minh nhu cầu chống chép |
| Tạo nhân vật, quê quán, ngày sinh | Không ảnh hưởng giả thuyết vòng chơi cốt lõi |
| Bản đồ trường tự do | Tăng UI và asset nhưng chưa giúp kiểm chứng SQL như bằng chứng |
| Blockly đầy đủ | Tốn công xây và có thể che khuất cấu trúc SQL; thử query builder nhẹ trước |
| Mode Hardcore riêng | Cho phép sửa SQL trực tiếp là đủ để thử cả người muốn gõ code |
| Thanh uy tín, hạng S/A/B/C | Hình phạt làm nhiễu quan sát hành vi học trong vòng thử đầu |
| Trang phục và phần thưởng sưu tầm | Thuộc retention dài hạn, không thuộc giá trị cốt lõi ban đầu |
| Mini game NPC | Chưa cần kiểm chứng replayability |
| Tài khoản, cloud save, lớp học | Chỉ xây sau khi có tín hiệu người học và giáo viên muốn sử dụng |
| Sáu vụ và bí ẩn cả mùa | Prototype chỉ cần chứng minh một vòng chơi ngắn |
| Bảng phân tích, sơ đồ JOIN | Thuộc vertical slice sau prototype |
| Mobile-first | Trình dựng SQL cần được kiểm chứng trên laptop trước; responsive cơ bản là đủ |
| Kiến trúc chung cho các dòng game | Chưa có dòng thứ hai để biết abstraction nào thật sự dùng chung |
| Production art khoảng 125 lớp hình | Không đầu tư lớn trước khi vòng chơi được xác nhận |

Các mục này không bị loại khỏi sản phẩm cuối. Chúng được hoãn cho đến khi có dữ liệu chứng minh nên đầu tư.

---

## 9. Kế hoạch thử nghiệm

### 9.1. Số người và cách tuyển

- Vòng 1: 5 người để tìm lỗi hiểu nhiệm vụ và lỗi giao diện lớn.
- Sửa prototype.
- Vòng 2: 10–15 người thuộc đúng nhóm mục tiêu.
- Ưu tiên người biết Excel nhưng chưa học SQL; ghi lại riêng người đã từng học SQL.

### 9.2. Quy trình một buổi test

1. Hỏi ngắn về kinh nghiệm Excel, SQL và game kể chuyện.
2. Yêu cầu người chơi tự chơi; người quan sát không hướng dẫn trừ khi game bị kẹt hoàn toàn.
3. Khuyến khích người chơi nói thành tiếng điều họ đang nghĩ.
4. Sau khi kết thúc, yêu cầu giải thích lại `AND`, `OR` và ý nghĩa của hai dòng kết quả.
5. Hỏi khoảnh khắc đáng nhớ, đoạn khó chịu và họ có muốn chơi tiếp không.

### 9.3. Sự kiện cần ghi nhận

- Bắt đầu và hoàn thành từng phần.
- Mỗi lần chạy truy vấn.
- Loại lỗi cú pháp hoặc logic.
- Số lần dùng gợi ý.
- Thời gian trước lần chạy đầu tiên.
- Thời gian hoàn thành từng thử thách.
- Lựa chọn tại câu hỏi “dữ liệu đã đủ kết luận chưa?”.
- Có hoàn thành prototype và chọn muốn chơi tiếp hay không.

Không thu tên thật, ngày sinh, quê quán hoặc nội dung truy vấn ngoài phạm vi prototype.

---

## 10. Tiêu chí thành công

Prototype được xem là có tín hiệu tốt khi vòng 2 đạt phần lớn các điều kiện:

| Chỉ số | Ngưỡng định hướng |
|---|---:|
| Hoàn thành mà không cần người thử nghiệm hướng dẫn trực tiếp | ≥ 70% |
| Chọn đúng và giải thích được `AND` thay cho `OR` | ≥ 70% |
| Trả lời đúng rằng kết quả truy vấn chưa tự chứng minh hành vi | ≥ 60% |
| Hoàn thành trong 35 phút | ≥ 80% |
| Đánh giá màn phản bác là một trong hai phần đáng nhớ nhất | ≥ 60% |
| Nói rằng muốn chơi một vụ tiếp theo | ≥ 50% |

Các ngưỡng này dùng để ra quyết định, không phải cam kết kinh doanh. Cần đọc cùng ghi chú quan sát và phỏng vấn, không chỉ nhìn tỷ lệ.

### 10.1. Quyết định sau thử nghiệm

- **Hiểu SQL và thích câu chuyện:** phát triển vertical slice Vụ 1 dài 60–90 phút.
- **Hiểu SQL nhưng câu chuyện không hấp dẫn:** sửa nhịp, nhân vật và màn giải trình trước khi thêm nội dung.
- **Thích câu chuyện nhưng không giải thích được SQL:** đơn giản hóa trình dựng truy vấn và tăng bước dự đoán kết quả trước khi chạy.
- **Không hiểu cả nhiệm vụ lẫn SQL:** viết lại onboarding; không mở rộng scope.
- **Chỉ người đã biết SQL hoàn thành:** prototype chưa đạt mục tiêu người mới, dù phản hồi cảm xúc có tốt.

---

## 11. Điều kiện để nâng lên vertical slice

Chỉ chuyển sang Vụ 1 hoàn chỉnh khi:

1. Vòng chơi cốt lõi đạt tín hiệu theo mục 10.
2. Kịch bản đã sửa rõ ranh giới giữa nghi vấn, bằng chứng và kết luận.
3. Người chơi hiểu SQL sinh ra từ query builder, không chỉ kéo đúng lựa chọn.
4. Đã xác định hai hoặc ba lỗi phổ biến nhất để thiết kế hệ thống gợi ý.
5. Có ước tính lại thời gian dựa trên tốc độ làm prototype thực tế.

Vertical slice sau đó mới cân nhắc thêm:

- Vụ dài 60–90 phút.
- Hai buổi điều tra và một buổi giải trình rút gọn.
- Bộ dữ liệu luyện tập sinh theo seed; dữ liệu cốt truyện vẫn cố định.
- Bảng phân tích hoặc sơ đồ quan hệ ở một thử thách riêng.
- Pre-test/post-test ngắn.
- Dashboard giáo viên tối thiểu nếu đang thử với trường hoặc lớp học.
- Production art giới hạn cho các cảnh đã chứng minh cần thiết.

---

## 12. Lý do tổng hợp cho quyết định scope down

Scope ban đầu có nhiều ý tưởng có giá trị, nhưng đồng thời thay đổi quá nhiều biến: chất lượng hình ảnh, sức hút visual novel, khám phá bản đồ, hệ thống phần thưởng, hai mode nhập code, dữ liệu ngẫu nhiên, khả năng học SQL và logic điều tra. Nếu người chơi không hoàn thành hoặc không muốn chơi tiếp, nhóm sẽ khó biết nguyên nhân nằm ở đâu.

Prototype tinh gọn cố ý giữ lại duy nhất chuỗi giá trị khác biệt nhất của dự án:

> **Một manh mối tạo ra câu hỏi dữ liệu; người chơi tự tạo truy vấn; kết quả trở thành bằng chứng trong đối thoại; và người chơi phải hiểu giới hạn của chính bằng chứng đó.**

Mọi hệ thống khác được hoãn, không phải vì không có giá trị, mà vì chỉ nên đầu tư sau khi chuỗi trên đã được chứng minh với người học thật.

---

## 13. Việc tiếp theo

1. Chốt bộ dữ liệu cố định 30–50 sinh viên và bảo đảm thử thách 3 trả về đúng hai người.
2. Viết lại lời thoại prototype theo cấu trúc ở mục 4, tái sử dụng các câu thoại tốt từ `vu1-buoi-giai-trinh-kich-ban.md`.
3. Làm wireframe cho phòng CLB, hành lang, trình dựng truy vấn và giải trình.
4. Dựng bản không cần production art.
5. Test nội bộ để loại lỗi kỹ thuật.
6. Thực hiện vòng thử nghiệm đầu với 5 người thuộc nhóm mục tiêu.
7. Cập nhật GDD dựa trên bằng chứng từ test trước khi mở rộng Vụ 1.
