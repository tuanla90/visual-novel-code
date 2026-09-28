# Đặc tả định dạng nội dung — CLB Thám Tử Dữ Liệu

Phiên bản 0.1 · 28/09 · theo QĐ-075 (kèm QĐ-071 → QĐ-074)

Tài liệu này quy định cách viết **toàn bộ nội dung** của game (lời thoại, lựa chọn, thử thách, hồ sơ, nhân vật, dữ liệu SQL) để:

1. **Mỗi thứ chỉ viết ở một chỗ.** Sửa kịch bản là sửa file nội dung, không đụng code.
2. **Máy kiểm tra thay người.** Khi build, bộ đọc báo lỗi kèm tên file và số dòng. Không còn khâu chép tay rồi so khớp.
3. **Không có con số viết cứng.** Mọi số liệu nhắc đến trong lời thoại đều tính bằng SQL trên dữ liệu thật của lượt chơi, nên dữ liệu đổi thì lời thoại đổi theo.

Người đọc: người viết kịch bản (kể cả khi nhờ AI viết nháp), người dựng engine, agent kiểm thử.

---

## Mục lục

1. [Nguyên tắc](#1-nguyên-tắc)
2. [Cấu trúc thư mục](#2-cấu-trúc-thư-mục)
3. [Khái niệm dùng chung](#3-khái-niệm-dùng-chung)
4. [Nhân vật — `nhan-vat.yaml`](#4-nhân-vật--nhan-vatyaml)
5. [Cảnh — `canh.yaml`](#5-cảnh--canhyaml)
6. [Loại 1 — Hội thoại thường](#6-loại-1--hội-thoại-thường)
7. [Loại 2a — Lựa chọn kiểm tra hiểu](#7-loại-2a--lựa-chọn-kiểm-tra-hiểu)
8. [Loại 2b — Lựa chọn rẽ nhánh](#8-loại-2b--lựa-chọn-rẽ-nhánh)
9. [Loại 3 — Hội thoại trong màn thử thách](#9-loại-3--hội-thoại-trong-màn-thử-thách)
10. [Biến và cách hiển thị](#10-biến-và-cách-hiển-thị)
11. [Dữ liệu SQL, seed và ràng buộc](#11-dữ-liệu-sql-seed-và-ràng-buộc)
12. [Hồ sơ vật chứng và giấy note](#12-hồ-sơ-vật-chứng-và-giấy-note)
13. [Điều kiện và hậu quả](#13-điều-kiện-và-hậu-quả)
14. [Kiểm tra khi build](#14-kiểm-tra-khi-build)
15. [Chuyển từ định dạng cũ](#15-chuyển-từ-định-dạng-cũ)
16. [Ví dụ đầy đủ](#16-ví-dụ-đầy-đủ)
17. [Câu hỏi còn mở](#17-câu-hỏi-còn-mở)

---

## 1. Nguyên tắc

- **Markdown cho chữ, YAML cho cấu hình.** Lời thoại, lựa chọn, thẻ thử thách, thẻ hồ sơ viết bằng Markdown theo quy ước ở tài liệu này; nhân vật, cảnh, biến, bảng dữ liệu, ràng buộc viết bằng YAML.
- **Bộ đọc chặt.** Trong file kịch bản, một dòng không khớp quy ước nào thì báo lỗi, không bỏ qua. Riêng dòng bắt đầu bằng `<!--` là ghi chú của người viết, bộ đọc bỏ qua.
- **Tiếng Việt cho người viết, ASCII cho định danh.** Từ khóa trong ngoặc vuông viết tiếng Việt (`[KÍCH HOẠT]`, `[KHI CHẠY]`). Định danh (id) chỉ gồm chữ thường không dấu, số và dấu gạch ngang: `bac-tu-1`, `clue-signature-h`.
- **Không phán đúng/sai trong màn thử thách** (QĐ-071). Chỉ loại 2a có đúng/sai; loại 3 chỉ mô tả kết quả. Đúng/sai của kết quả truy vấn chỉ lộ ra ở bước soát hồ sơ (§12.4).
- **Chỉ dẫn dàn dựng không hiển thị.** Mọi thứ không phải lời thoại, lựa chọn hay chữ trên giao diện đều là chỉ dẫn cho người dựng hoặc cho engine.

---

## 2. Cấu trúc thư mục

```
prototype/noi-dung/
├── nhan-vat.yaml              # nhân vật: tên, xưng hô, biểu cảm, vai (§4)
├── canh.yaml                  # cảnh, ảnh nền, điểm xem xét (§5)
├── bien.yaml                  # biến dùng chung, định nghĩa bằng SQL (§10)
├── du-lieu/
│   ├── bang.yaml              # lược đồ bảng: cột, kiểu, mô tả cho người chơi (§11.1)
│   ├── co-dinh.yaml           # dòng cố định: nhân vật truyện, dòng gắn nhịp truyện (§11.2)
│   ├── sinh.yaml              # luật sinh phần đệm theo seed (§11.3)
│   └── rang-buoc.yaml         # ràng buộc SQL mọi seed phải thỏa (§11.4)
├── kich-ban/
│   ├── chinh/                 # mạch truyện chính, mỗi phần một file
│   │   ├── 01-mo-dau.md
│   │   ├── 02-dieu-tra.md
│   │   ├── 03-phan-tich.md
│   │   ├── 04-giai-trinh.md
│   │   └── 05-ket.md
│   └── phu/                   # nhiệm vụ phụ, mỗi chuỗi NPC một file
│       └── bac-tu.md
├── thu-thach/                 # thẻ thử thách, mỗi thẻ một file (§9)
│   ├── c1-lop-nao.md
│   └── c2-ten-h.md
├── ho-so/                     # thẻ manh mối, tài liệu, vật chứng (§12)
│   ├── manh-moi.md
│   └── tai-lieu.md
└── chung/
    └── loi-chung.md           # lời dùng chung: nhận xét theo mã chẩn đoán, gợi ý chuẩn
```

Bộ đọc gom tất cả file lại thành một khối dữ liệu. Định danh phải duy nhất trên **toàn bộ** thư mục, không chỉ trong một file.

---

## 3. Khái niệm dùng chung

| Khái niệm | Viết thế nào | Ví dụ | Ghi chú |
|---|---|---|---|
| **Chuỗi** (sequence) | tiêu đề `###` có định danh | `### bac-tu-3 — Soát sổ mượn phòng {cảnh: hanh-lang-b}` | Đơn vị nhỏ nhất chạy được. Chạy từ trên xuống. |
| **Lời thoại** | `- **<người nói>** (<biểu cảm>): <lời>` | `- **ha-vy** (thinking): Khoan, đếm lại đã.` | `player` và `narrator` không ghi biểu cảm. |
| **Chỉ dẫn** | `- [TỪ KHÓA …]` | `- [VÀO tung]` | Không hiển thị. |
| **Cờ** (flag) | `co.<tên>` | `co.da-gap-bac-tu` | Đúng/sai. Mặc định sai. |
| **Bộ đếm** | `dem.<tên>` | `dem.than-thiet.bac-tu` | Số nguyên ≥ 0. Mặc định 0. |
| **Biến** | `{{<tên>}}` trong lời | `{{so-lop-toa-b}} lớp` | Xem §10. |
| **Nhiệm vụ hiện tại** | `> NHIỆM VỤ: <chữ>` | `> NHIỆM VỤ: Giúp Bác Tư soát sổ` | Đổi chữ trên thanh trên cùng. |

**Mức độ thân thiết với NPC** (QĐ về nhiệm vụ phụ) là bộ đếm `dem.than-thiet.<npc>`. Không hiển thị thành thanh. Giao diện chỉ được thể hiện qua thái độ nhân vật và, nếu cần, dãy chấm trong Sổ vụ việc.

---

## 4. Nhân vật — `nhan-vat.yaml`

Nguồn chuẩn duy nhất về nhân vật, dùng cho **cả game lẫn người viết và agent viết nội dung**. Mọi mô tả persona ở nơi khác phải khớp file này; khi lệch, file này thắng (bài học ở QĐ-074).

```yaml
tung:
  ten-hien-thi: Tùng
  ho-ten: Trần Tùng
  vai: Thành viên CLB, bạn cùng phòng KTX của người chơi, người kéo người chơi vào CLB. Một trong bộ ba.
  xung-ho: { voi-nguoi-choi: "tớ / cậu", voi-ha-vy: "tớ / cậu", voi-minh-anh: "em / chị" }
  cau-cua-mieng: ["Tớ cá là…"]
  tinh-cach: Lạc quan, xởi lởi, hay đoán bừa, trung thành, biết nhận sai.
  khong-bao-gio: ["Giải thích SQL đúng thay Hà Vy", "Nói giọng khinh người"]
  bieu-cam: [neutral]                     # chỉ khai báo biểu cảm ĐÃ CÓ ẢNH
  mau: "#c2410c"
  anh: { ban-than: char-tung, chan-dung: char-tung }

ha-vy:
  ten-hien-thi: Hà Vy
  ho-ten: Trần Hà Vy
  vai: Thành viên CLB, người hướng dẫn đọc dữ liệu. Một trong bộ ba.
  xung-ho: { voi-nguoi-choi: "tớ / cậu", voi-tung: "tớ / cậu" }
  cau-cua-mieng: ["Khoan, đếm lại đã.", "Đừng cá. Đếm.", "Kiểm hai lần, kết luận một lần."]
  tinh-cach: Điềm tĩnh, kỹ tính, ghét võ đoán, tốt bụng.
  khong-bao-gio: ["Cố ý dẫn sai", "Nói 'đúng rồi' / 'sai rồi' về kết quả truy vấn trong màn thử thách"]
  bieu-cam: [neutral, thinking, smile]
  mau: "#0f5c55"

quan:
  ten-hien-thi: Quân
  vai: Người của Ban Pháp chế – Kiểm tra Hội sinh viên. Chỉ xuất hiện từ phần Giải trình. KHÔNG phải thành viên CLB.
  xung-ho: { voi-clb: "tôi / các bạn" }
  tinh-cach: Lạnh, chính xác, hơi kẻ cả; biết công nhận khi sai.
  xuat-hien-tu: debrief                  # bộ đọc báo lỗi nếu Quân nói trước phần này
  bieu-cam: [neutral, smug, stunned]
```

Trường bắt buộc: `ten-hien-thi`, `vai`, `bieu-cam`. Các trường khác là hướng dẫn cho người viết; bộ đọc chỉ kiểm tra `bieu-cam` và `xuat-hien-tu`.

Hai người nói đặc biệt không khai báo trong file: `player` (hiển thị nhãn "Bạn") và `narrator` (không nhãn).

---

## 5. Cảnh — `canh.yaml`

```yaml
hanh-lang-b:
  ten: Hành lang giảng đường B
  anh-nen: bg-corridor-b
  diem-xem-xet:
    bac-tu:   { nhan: "Bác Tư",    loai: npc, vi-tri: [62, 55] }   # % theo chiều ngang, dọc
    hop-gop-y: { nhan: "Hộp góp ý", loai: vat, vi-tri: [30, 48] }

phong-clb:
  ten: Phòng CLB
  anh-nen: bg-clb-room
  vat-pham:                           # chỗ treo vật phẩm "phòng CLB sống lại"
    o-bac-tu:   { vi-tri: [12, 30], anh: item-umbrella, hien-khi: co.tang-o-bac-tu }
    am-tra:     { vi-tri: [70, 62], anh: item-teapot,   hien-khi: co.tang-am-tra }
```

- `diem-xem-xet` là những chỗ người chơi bấm được. Chuỗi nào chạy khi bấm là do `[KÍCH HOẠT]` của chuỗi quyết định (§6.2), không ghi ở đây.
- `vat-pham` hiện khi điều kiện `hien-khi` đúng (§13).

---

## 6. Loại 1 — Hội thoại thường

### 6.1 Khuôn

```markdown
### <định danh> — <mô tả cho người viết> {cảnh: <định danh cảnh>}

- [KÍCH HOẠT] <cách kích hoạt>
- [ĐIỀU KIỆN] <điều kiện>                       ← không bắt buộc
- [LẶP] một lần | mỗi lần                         ← mặc định: một lần

> NHIỆM VỤ: …                                     ← không bắt buộc

- **<người nói>** (<biểu cảm>): <lời>
- [chỉ dẫn]
- …

- [HẬU QUẢ] <hậu quả>, <hậu quả>, …              ← không bắt buộc, chạy khi chuỗi xong
```

### 6.2 Cách kích hoạt

| Viết | Nghĩa |
|---|---|
| `bấm: <điểm xem xét>` | Người chơi bấm vào điểm xem xét đó trong cảnh của chuỗi. |
| `vào cảnh` | Ngay khi người chơi vào cảnh của chuỗi. |
| `sau: <chuỗi>` | Ngay khi chuỗi kia chạy xong (thay cho `[ĐI TỚI]` ở cuối chuỗi kia). |
| `sau thử thách: <thử thách>` | Khi người chơi dán note của thử thách đó lên tường. |
| `nút tiếp` | Khi người chơi bấm "Nhiệm vụ tiếp theo →" ở cảnh của chuỗi. |
| `gọi` | Chỉ chạy khi chuỗi khác `[ĐI TỚI]` hoặc lựa chọn 2b dẫn tới. |

**Khi nhiều chuỗi cùng khớp một lần bấm:** chạy chuỗi có **nhiều điều kiện hơn**; nếu bằng nhau thì chuỗi viết trước. Nhờ vậy viết được lời thoại "mặc định" và lời thoại "đặc biệt" cho cùng một NPC:

```markdown
### bac-tu-chao — Bác Tư, lần gặp đầu {cảnh: hanh-lang-b}
- [KÍCH HOẠT] bấm: bac-tu
- [LẶP] mỗi lần
- **bac-tu** (neutral): Cậu sinh viên tìm ai?

### bac-tu-tin — Bác Tư, khi đã thân {cảnh: hanh-lang-b}
- [KÍCH HOẠT] bấm: bac-tu
- [ĐIỀU KIỆN] dem.than-thiet.bac-tu >= 2
- [LẶP] mỗi lần
- **bac-tu** (neutral): Cháu đấy à. Vào đây uống chén trà đã.
```

### 6.3 Chỉ dẫn dùng được trong chuỗi

| Chỉ dẫn | Nghĩa |
|---|---|
| `[VÀO <nhân vật>]` / `[RA <nhân vật>]` | Nhân vật vào hoặc rời sân khấu (QĐ-069). Nhân vật tự vào khi nói câu đầu. |
| `[HIỆN TÀI LIỆU <định danh>]` | Hiện tài liệu và thêm vào Hồ sơ. |
| `[THỬ THÁCH <định danh>]` | Mở màn thử thách. Chuỗi đi tiếp khi người chơi dán note. |
| `[ĐI TỚI <chuỗi>]` | Chuyển sang chuỗi khác ngay. |
| `[CHỜ <số> giây]` | Dừng trước câu kế (dùng cho nhịp hài, hiệu ứng). |
| `[HIỆU ỨNG <tên>]` | Ví dụ `co-so-lieu-day` (QĐ-025, QĐ-070). |
| `[DÀN DỰNG] <chữ>` | Ghi chú cho người dựng. Không hiển thị, không chạy. |
| `[HẬU QUẢ] …` | Đặt ở giữa chuỗi thì chạy ngay tại đó; ở cuối thì chạy khi xong chuỗi. |

---

## 7. Loại 2a — Lựa chọn kiểm tra hiểu

Giữ nguyên cú pháp `[HỎI]` và `[CHỌN DÒNG]` hiện có.

```markdown
- [HỎI q-two-rows] quan: "Hai dòng này nghĩa là gì?"
  - (A) {id: tim-ra-roi} Tìm ra người bỏ thư rồi. → phản hồi: **ha-vy** (thinking): …
  - (B) {id: can-xac-minh} Hai người cần xác minh thêm. [ĐÚNG] → phản hồi: **quan** (neutral): …
  - (C) {id: …} … → phản hồi: …
```

Luật:
- Có **đúng một** lựa chọn `[ĐÚNG]`. Chọn sai: hiện phản hồi, cho chọn lại, không phạt. Chọn đúng: hiện phản hồi rồi đi tiếp.
- Giao diện xáo thứ tự; nhãn (A), (B) không hiển thị; telemetry ghi `<mã câu hỏi>:<id>` và **lần chọn đầu tiên** (QĐ-035).
- Được dùng ở chuỗi thường (loại 1). **Không** dùng trong màn thử thách (loại 3), vì màn thử thách không phán đúng/sai (QĐ-071).
- Phản hồi có thể nhiều câu, nối bằng ` <br> ` như hiện tại.

---

## 8. Loại 2b — Lựa chọn rẽ nhánh

```markdown
- [RẼ NHÁNH r-giup-bac-tu] player: "Bác Tư đang loay hoay với cuốn sổ mượn phòng…"
  - {id: giup-ngay} Qua giúp bác một tay. → hậu quả: đi tới bac-tu-3
  - {id: de-sau} Để sau, giờ phải về phòng CLB. → hậu quả: đặt co.hen-bac-tu, đi tới phan-tich-02
```

Luật:
- **Không có `[ĐÚNG]`.** Bộ đọc báo lỗi nếu có.
- **Chọn là chốt.** Không quay lại được. Giao diện **không xáo thứ tự** (thứ tự là một phần cách viết).
- Mỗi lựa chọn phải có `→ hậu quả:` (xem §13.2). Thường là `đi tới`, `đặt cờ`, `tăng bộ đếm`.
- Có thể thêm điều kiện hiện lựa chọn: `- {id: …} [KHI dem.than-thiet.bac-tu >= 2] Hỏi bác chuyện tối qua. → …`
- Telemetry ghi `<mã rẽ nhánh>:<id>`.
- **Không dùng rẽ nhánh để khóa việc học.** Mọi nhánh của mạch chính phải cùng đi qua các thử thách chính.

---

## 9. Loại 3 — Hội thoại trong màn thử thách

Mỗi thử thách là một file trong `thu-thach/`. File gồm **phần khai báo** (màn này là gì) và **phần kịch bản** (ai nói gì khi nào).

### 9.1 Phần khai báo

```markdown
# c1 — Lớp nào khớp cả hộp góp ý lẫn bookmark? {thử thách: c1}

- Tiêu đề: Thử thách 1 — Lớp nào khớp cả hộp góp ý lẫn bookmark?
- Đề bài: Hộp góp ý được mở ở giảng đường B; mẩu bookmark là của ngành Báo chí. Lớp sinh hoạt nào khớp cả hai?
- Bảng: lop_sinh_hoat 🔒                     ← 🔒 = khóa sẵn; bỏ 🔒 = người chơi tự chọn
- Cột: ma_lop, nganh, toa_nha 🔒
- Bảng được chọn: …                          ← chỉ khi bảng không khóa: danh sách bảng hiện trong ô chọn
- Phép so sánh: bằng                          ← tập con của: bằng, bắt đầu bằng, có chứa, kết thúc bằng, thuộc danh sách
- Số điều kiện: 1 → tối đa 2                  ← lúc mở màn → tối đa
- Nhân vật: ha-vy (phải), tung (trái)
- SQL chuẩn:
  ```sql
  SELECT ma_lop, nganh, toa_nha FROM lop_sinh_hoat
  WHERE toa_nha = 'B' AND nganh = 'Báo chí';
  ```
- Kiểu lưu: cả kết quả                        ← hoặc: một dòng (QĐ-071)
- Note: tiêu đề "Lớp khớp cả hai" · giá trị "{{kq.ds.ma_lop}}" · kéo vào ô được: có
- Soát: mỗi dòng phải khớp "toa_nha = 'B'" (hộp góp ý giảng đường B), "nganh = 'Báo chí'" (bookmark ngành Báo chí)
- Dataset ẩn: không
```

Ghi chú:
- **SQL chuẩn** dùng để chấm ngầm (telemetry) và để bước soát biết đáp án. Game không nói đúng/sai lúc chạy.
- **Note** là tờ note người chơi tự ghi rồi dán (QĐ-072). `giá trị` là một khuôn có biến (§10). `kéo vào ô được: có` nghĩa là tờ note dùng làm giá trị điều kiện ở thử thách sau.
- **Soát** liệt kê dữ kiện dạng SQL kèm tên dữ kiện. Bước soát hồ sơ dùng dòng này để viết câu đối soát (§12.4).

### 9.2 Phần kịch bản: khối sự kiện

Kịch bản trong màn thử thách là **danh sách khối**. Mỗi khối bắt đầu bằng `[KHI …]` và chứa lời thoại, chỉ dẫn:

```markdown
## Kịch bản

[KHI VÀO]
- **ha-vy** (smile): Hộp góp ý với bookmark đều chỉ về một lớp. Cậu chỉ lo hàng WHERE thôi.

[KHI CHẠY · điều kiện = 1 · phép nối = OR]
- …
```

**Sự kiện:**

| Sự kiện | Khi nào |
|---|---|
| `KHI VÀO` | Mở màn. |
| `KHI CHẠY` | Mỗi lần bấm Chạy (kèm bộ lọc, xem dưới). |
| `KHI SỬA` | Người chơi đổi một ô trong trình dựng (kèm bộ lọc). Dùng cho bước dẫn. |
| `KHI KÉO NOTE` | Thả note vào ô giá trị. Thêm `lần đầu` để chỉ chạy một lần trong cả game. |
| `KHI NGỒI YÊN <n> giây` | Không thao tác n giây. |
| `KHI HỎI GỢI Ý <n>` | Lần bấm vào Hà Vy thứ n (1, 2, 3; bấm thêm thì lặp mức 3). |
| `KHI GHI NOTE` / `KHI DÁN NOTE` | Mở tờ note trắng / dán lên tường. |

**Bộ lọc** nối bằng dấu `·` (nghĩa là "và"). Chỉ dùng được các bộ lọc sau:

| Bộ lọc | Ví dụ |
|---|---|
| `số dòng <so sánh> <số hoặc biến>` | `số dòng = 1`, `số dòng > kq.lan-truoc.so-dong` |
| `điều kiện = <n>` | số điều kiện đã điền đủ |
| `phép nối = AND \| OR \| chưa chọn` | |
| `có điều kiện <cột> <phép> <giá trị>` | `có điều kiện toa_nha bằng 'B'` |
| `mã chẩn đoán = <mã>` | `mã chẩn đoán = no-filter` (engine đang có, QĐ-040) |
| `khớp SQL chuẩn` / `không khớp SQL chuẩn` | chỉ dùng trong khối đang ở một **bước** (§9.3); không dùng để khen/chê |
| `lặp <n> lần` | cùng kết quả như n lần chạy liền trước |
| `bước = <tên bước>` | xem §9.3 |

**Chọn khối nào để chạy:** với mỗi sự kiện, engine đi từ trên xuống và chạy **khối đầu tiên** khớp. Muốn khối chung làm "mặc định" thì đặt nó cuối cùng.

**Trong một khối** có thể có nhiều câu của nhiều người, `[CHỜ n giây]`, và các **hành động** sau:

| Hành động | Nghĩa |
|---|---|
| `[LÀM] thêm điều kiện <cột> <phép> <giá trị hoặc để trống>` | Nhân vật tự thêm một dòng WHERE (Tùng chen vào, QĐ-073). |
| `[LÀM] đặt phép nối AND \| OR` | Nhân vật tự chọn phép nối. |
| `[NỔI BẬT <vùng>]` | Viền nhấp nháy: `cot-1`, `gia-tri-1`, `cot-2`, `gia-tri-2`, `phep-noi`, `chay`, `ghi-note`, `tuong`. |
| `[SANG BƯỚC <tên>]` | Chuyển bước (§9.3). |
| `[THU GỌN <nhân vật>]` | Nhân vật thu xuống góc, vẫn có mặt. |
| `[HẬU QUẢ] …` | Như §13.2. |

**Lời nào tự tắt, lời nào giữ:** lời trong khối có `bước` giữ nguyên tới khối kế tiếp; lời trong khối không có `bước` tự thu sau 7 giây (QĐ-072).

### 9.3 Bước dẫn

Màn có hướng dẫn (như c1) khai báo **danh sách bước**. Mỗi bước là một trạng thái; khối `[KHI …· bước = X]` chỉ chạy khi đang ở bước X.

```markdown
## Bước
- chon-cot → sang: dien-gia-tri khi SỬA · có điều kiện toa_nha
- dien-gia-tri → sang: chay-1 khi SỬA · điều kiện = 1
- chay-1 → (chuyển trong khối)
- …
```

- Bước đầu tiên trong danh sách là bước khi mở màn.
- `sang: <bước> khi <sự kiện + bộ lọc>` là chuyển tự động. Chuyển phức tạp hơn thì viết `[SANG BƯỚC]` trong khối.
- Bước cuối nên là `tu-do`: từ đó người chơi tự làm, chỉ còn khối không gắn bước.
- **Không khóa thao tác** (QĐ-021): người chơi làm khác hướng dẫn thì chỉ các khối không gắn bước chạy (lời mô tả chung), bước giữ nguyên.

### 9.4 Biến kết quả (chỉ có trong loại 3)

| Biến | Giá trị |
|---|---|
| `kq.so-dong` | số dòng lần chạy này |
| `kq.ds.<cột>` | danh sách giá trị của cột, theo thứ tự dòng |
| `kq.dong-1.<cột>` | giá trị ở dòng 1 (đến `dong-5`) |
| `kq.lan-truoc.so-dong` | số dòng lần chạy trước |
| `kq.bang` | tên bảng |
| `truy-van.phep-noi`, `truy-van.so-dieu-kien` | như tên |

### 9.5 Lời chung

`chung/loi-chung.md` chứa các khối dùng cho mọi thử thách (nhận xét theo mã chẩn đoán, lời khi ngồi yên, lời khi kéo note lần đầu). Engine ghép **khối của thẻ trước, khối chung sau**, nên thẻ luôn ghi đè được lời chung.

---

## 10. Biến và cách hiển thị

### 10.1 Định nghĩa — `bien.yaml`

```yaml
so-lop-toa-b:     SELECT COUNT(*) FROM lop_sinh_hoat WHERE toa_nha = 'B'
lop-dich:         SELECT ma_lop FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí'
so-ten-h:         SELECT COUNT(*) FROM sinh_vien WHERE ten LIKE 'H%'
nguoi-can-xac-minh: SELECT ho_dem || ' ' || ten FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop = {{lop-dich}}
so-nguoi-or-quan: SELECT COUNT(*) FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop = {{lop-dich}}
```

- Mỗi biến là **một câu SELECT**. Một cột một dòng → giá trị đơn; một cột nhiều dòng → danh sách.
- Biến dùng được biến khác trong câu SQL (`{{lop-dich}}` được thay vào như một chuỗi SQL có nháy). Bộ đọc báo lỗi nếu có vòng lặp.
- Biến được tính **một lần sau khi sinh dữ liệu** của lượt chơi, rồi dùng cho cả ba loại hội thoại, thẻ hồ sơ, đề bài.

### 10.2 Dùng trong lời

```
- **quan** (smug): {{so-nguoi-or-quan | chu}} người, hơn nửa số sinh viên trong view.
- **ha-vy** (neutral): {{kq.so-dong}} lớp ở tòa B: {{kq.ds.ma_lop | noi}}.
```

**Bộ định dạng** (sau dấu `|`):

| Định dạng | Kết quả |
|---|---|
| (không có) | số viết bằng chữ số, danh sách nối bằng ", " |
| `chu` | số bằng chữ, viết hoa đầu câu nếu đứng đầu: 24 → "Hai mươi tư" |
| `noi` | danh sách nối ", " và " và " ở cuối: "KT24A, QT24B và BC24A" |
| `noi-hoac` | như trên nhưng " hoặc " |
| `dem "<danh từ>"` | "2 người", "1 lớp" |

### 10.3 Luật

- **Cấm số viết cứng** chỉ số lượng hay mã trong dữ liệu. Bộ đọc cảnh báo khi một lời thoại có chữ số hoặc số bằng chữ ("hai mươi tư", "mười") mà không nằm trong biến. Muốn giữ (ví dụ "ba tòa nhà", "năm nhất") thì ghi `[SỐ CỐ ĐỊNH]` ở cuối dòng.
- Giá trị **khóa của truyện** (tên Hiếu, Hoài) viết thẳng được, vì chúng nằm trong phần cố định của dữ liệu (§11.2). Bộ đọc kiểm tra chúng có trong dữ liệu mọi seed.

---

## 11. Dữ liệu SQL, seed và ràng buộc

Chạy trên SQLite thật (`sql.js`, đã có trong prototype).

### 11.1 Lược đồ — `du-lieu/bang.yaml`

```yaml
lop_sinh_hoat:
  mo-ta: Lớp sinh hoạt và tòa nhà nơi lớp sinh hoạt.
  cot:
    ma_lop:   { kieu: text, mo-ta: "Mã lớp, ví dụ KT24A" }
    nganh:    { kieu: text, mo-ta: "Ngành học" }
    khoa_hoc: { kieu: int,  mo-ta: "Năm nhập học" }
    toa_nha:  { kieu: text, mo-ta: "Tòa nhà: A, B hoặc C" }
sinh_vien:
  mo-ta: Danh sách sinh viên trong view CLB được cấp.
  cot:
    ma_sv:  { kieu: text }
    ho_dem: { kieu: text }
    ten:    { kieu: text }
    ma_lop: { kieu: text, tham-chieu: lop_sinh_hoat.ma_lop }
```

`mo-ta` hiện ở ô "Mô tả các bảng" trong màn thử thách.

### 11.2 Phần cố định — `du-lieu/co-dinh.yaml`

Những dòng mà cốt truyện cần có mặt ở **mọi** seed:

```yaml
lop_sinh_hoat:
  - { ma_lop: "{{ma.lop-dich}}", nganh: Báo chí, khoa_hoc: 2024, toa_nha: B }
sinh_vien:
  - { ma_sv: SV240228, ho_dem: Phạm Minh, ten: Hiếu, ma_lop: "{{ma.lop-dich}}", vai: vo-can }
  - { ma_sv: SV240317, ho_dem: Lê Thị,    ten: Hoài, ma_lop: "{{ma.lop-dich}}", vai: nhan-chung }
```

- `{{ma.…}}` là **mã sinh theo seed** (§11.3). Nhờ vậy mã lớp đích có thể đổi giữa các lượt chơi mà các dòng cố định vẫn trỏ đúng.
- `vai` không phải cột SQL; bộ đọc dùng nó để kiểm tra và để test tìm đúng người.

### 11.3 Phần đệm — `du-lieu/sinh.yaml`

```yaml
seed: 20240928                          # QĐ-075: tạm cố định
ma:
  lop-dich: { mau: "BC24{A-B}" }        # chọn ngẫu nhiên theo seed
lop_sinh_hoat:
  them: 7
  nganh: [Kế toán, Quản trị kinh doanh, Báo chí, Tài chính – Ngân hàng, Marketing, Kinh doanh quốc tế]
  toa_nha: [A, B, C]
  mau-ma: "{viet-tat-nganh}24{A-B}"
sinh_vien:
  them: 38
  ho_dem: kho/ho-dem.txt                # danh sách tên hư cấu, không trùng tên nhân vật truyện (QĐ-014)
  ten:    kho/ten.txt
  ma_lop: tu lop_sinh_hoat
```

Engine sinh theo thứ tự: mã → phần cố định → phần đệm → kiểm ràng buộc. Không thỏa thì sinh lại với seed kế tiếp (tối đa 50 lần, quá thì báo lỗi).

### 11.4 Ràng buộc — `du-lieu/rang-buoc.yaml`

Mỗi ràng buộc là một câu SQL trả về một số, kèm phép so sánh và **lý do** (để người sau biết vì sao không được xóa).

```yaml
- sql: SELECT COUNT(*) FROM lop_sinh_hoat WHERE toa_nha = 'B'
  phai: "between 3 and 4"
  vi: c1 bước 1 phải ra vài lớp để người chơi thấy cần thêm manh mối.
- sql: SELECT COUNT(*) FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí'
  phai: "= 1"
  vi: c1 kết thúc bằng đúng một lớp.
- sql: >
    SELECT (SELECT COUNT(*) FROM lop_sinh_hoat WHERE toa_nha='B' OR nganh='Báo chí')
         - (SELECT COUNT(*) FROM lop_sinh_hoat WHERE toa_nha='B')
  phai: ">= 1"
  vi: Câu OR của Tùng phải ra NHIỀU hơn lần đầu, không thì mất cớ bối rối.
- sql: SELECT COUNT(*) FROM sinh_vien WHERE ten LIKE 'H%' AND ma_lop = {{lop-dich}}
  phai: "= 2"
  vi: Phần Giải trình cần đúng hai người cần xác minh (QĐ-011, QĐ-024).
- sql: >
    SELECT COUNT(*) FROM sinh_vien s JOIN lop_sinh_hoat l USING (ma_lop)
    WHERE s.ten LIKE 'H%' AND l.nganh = 'Báo chí' AND l.ma_lop <> {{lop-dich}}
  phai: ">= 1"
  vi: Bẫy lọc mã lớp theo tiền tố ngành (QĐ-073).
```

### 11.5 Dataset ẩn

Thẻ có `Dataset ẩn: có` được chấm thêm trên một bộ dữ liệu thứ hai sinh từ `seed + 1` với **cùng ràng buộc** (QĐ-015). Không cần viết tay dataset ẩn nữa.

---

## 12. Hồ sơ vật chứng và giấy note

### 12.1 Thẻ manh mối và tài liệu

Giữ khuôn hiện có (`### clue-… — …` với các trường Tiêu đề, Nguồn, Nội dung, Câu hỏi còn mở, Lưu ý). Thay trường cũ "Giá trị cho trình dựng" bằng:

```markdown
- Note: giá trị "B" · màu xanh · cột gợi ý: toa_nha
```

→ manh mối này hiện thành một tờ note trên tường màn thử thách, kéo vào ô giá trị được (QĐ-071).

### 12.2 Note người chơi tự ghi

Không viết thẻ riêng. Note sinh từ trường `Note:` của thẻ thử thách (§9.1), giá trị lấy từ **kết quả người chơi đã chạy**, kể cả khi sai.

### 12.3 Hiển thị theo phần

Luật QĐ-037 giữ nguyên: "Câu hỏi còn mở" hiện tới hết phần Giải trình; "Lưu ý" hiện từ phần Kết.

### 12.4 Soát hồ sơ

Chạy tại chuỗi có chỉ dẫn `[SOÁT HỒ SƠ]` (đặt trước phần Giải trình). Với mỗi note người chơi đã dán, engine so với dòng `Soát:` của thẻ thử thách và đưa ra câu đối soát theo khuôn trong `chung/loi-chung.md`:

```markdown
[KHI SOÁT · lệch dữ kiện]
- **ha-vy** (thinking): Khoan, đếm lại đã. Tờ "{{note.tieu-de}}": {{soat.so-dong-lech}} dòng không khớp với dữ kiện {{soat.ten-du-kien}}: {{soat.ds-lech | noi}}.
[KHI SOÁT · thiếu dòng]
- **ha-vy** (thinking): Còn {{soat.so-dong-thieu}} {{soat.don-vi}} khớp đủ dữ kiện nhưng chưa có trên tờ note.
[KHI SOÁT · khớp]
- **ha-vy** (smile): Tờ "{{note.tieu-de}}" khớp dữ kiện.
```

Tờ nào lệch thì có nút mở lại đúng thử thách đó. Đây là chỗ duy nhất người chơi biết mình ghi sai (QĐ-071).

---

## 13. Điều kiện và hậu quả

### 13.1 Điều kiện

```
co.<tên>                     cờ đang bật
không co.<tên>               cờ đang tắt
dem.<tên> <so sánh> <số>     so sánh: = != > >= < <=
đã xong <chuỗi>              chuỗi đã chạy hết
đã dán <thử thách>           người chơi đã dán note của thử thách đó
có <manh mối | tài liệu>     đã có trong Hồ sơ
phần = <định danh phần>      intro | investigation | analysis | debrief | ending
```

Nối bằng ` và ` hoặc ` hoặc `; `và` ưu tiên hơn `hoặc`; dùng ngoặc `( )` khi cần. Ví dụ:
`đã xong bac-tu-2 và (dem.than-thiet.bac-tu >= 2 hoặc co.hen-bac-tu)`

### 13.2 Hậu quả

```
đặt co.<tên>              bỏ co.<tên>
tăng dem.<tên>            tăng dem.<tên> <số>
mở manh mối <định danh>   hiện tài liệu <định danh>
đi tới <chuỗi>            mở nhiệm vụ phụ <chuỗi>
```

Nối bằng dấu phẩy, chạy theo thứ tự viết.

### 13.3 Kết thúc

Chuỗi kết khai báo điều kiện bằng `[KÍCH HOẠT] sau: end-03` và `[ĐIỀU KIỆN]`. Ví dụ true ending:

```markdown
### end-true — Người viết thư {cảnh: phong-clb}
- [KÍCH HOẠT] sau: end-03
- [ĐIỀU KIỆN] có clue-robotics-muon-phong
```

Chuỗi không thỏa điều kiện thì bỏ qua, game sang chuỗi kế. **Không có bad ending.**

---

## 14. Kiểm tra khi build

Bộ đọc dừng build khi gặp **lỗi**; in ra **cảnh báo** nhưng vẫn build.

**Lỗi:**
- Dòng không khớp quy ước; định danh trùng; tham chiếu tới định danh không tồn tại (chuỗi, cảnh, điểm xem xét, nhân vật, biến, thử thách, manh mối).
- Người nói không có trong `nhan-vat.yaml`; biểu cảm không có trong `bieu-cam` của nhân vật; nhân vật nói trước `xuat-hien-tu`.
- `[HỎI]` không có đúng một `[ĐÚNG]`; `[RẼ NHÁNH]` có `[ĐÚNG]` hoặc lựa chọn thiếu hậu quả.
- Biến dùng trong lời nhưng không định nghĩa; biến lặp vòng; bộ lọc hoặc hành động không có trong bảng §9.2.
- Chuỗi không thể tới được từ `intro-00` (trừ chuỗi `gọi` có người gọi).
- **Chạy 1.000 seed:** mỗi seed phải thỏa mọi ràng buộc; mọi biến có giá trị; SQL chuẩn của mọi thử thách chạy được và ra ≥ 1 dòng; mọi dòng cố định có mặt.

**Cảnh báo:**
- Số viết cứng trong lời thoại (§10.3).
- Lời thoại dài quá 2 dòng hộp thoại (~35 từ; ngưỡng đặt trong cấu hình).
- Nhiệm vụ phụ không có hậu quả nào (người chơi làm mà không được gì).

Lệnh (gói chuẩn hóa sẽ tạo): `npm run kiem-noi-dung` để chạy riêng; tự chạy trước `build` và trong `test`.

---

## 15. Chuyển từ định dạng cũ

Bước 1 của QĐ-075: chuyển **nguyên văn** nội dung hiện tại sang cấu trúc mới, game chạy y hệt.

| Cũ (`docs/kich-ban-prototype.md`) | Mới |
|---|---|
| `## Phần N — … {part: …}` | tên file trong `kich-ban/chinh/` + khai báo `phần:` ở đầu file |
| `### <id> — … {scene: …}` | `### <id> — … {cảnh: …}` (chấp nhận cả `scene` trong giai đoạn chuyển) |
| `[ĐIỂM XEM XÉT hs-x] nhãn: … · mở manh mối: … · chạy chuỗi: y` | nhãn → `canh.yaml`; chuỗi `y` có `[KÍCH HOẠT] bấm: hs-x` và `[HẬU QUẢ] mở manh mối …` |
| `[ĐIỀU KIỆN QUA] cần: … → … sang <id>` | chuỗi đích có `[KÍCH HOẠT] nút tiếp` + `[ĐIỀU KIỆN] có … và có …` |
| `[ĐI TỚI <id>]` | giữ nguyên |
| `[HỎI]`, `[CHỌN DÒNG]` | giữ nguyên (loại 2a) |
| Thẻ thử thách: `[BƯỚC n · nổi bật: …]` | danh sách `## Bước` + khối `[KHI SỬA · bước = …]` |
| `[KHI: <mã>]` | `[KHI CHẠY · mã chẩn đoán = <mã>]` |
| `[GỢI Ý n]` | `[KHI HỎI GỢI Ý n]` |
| `[KHI ĐÚNG]` | **bỏ** (QĐ-071); tạm chuyển thành `[KHI CHẠY · khớp SQL chuẩn]` ở giai đoạn chuyển để game chạy y hệt |
| "Giá trị cho trình dựng: `H`…" | `Note: giá trị "H" · …` |
| Số viết cứng ("Hai mươi tư", "mười") | giữ và gắn `[SỐ CỐ ĐỊNH]` ở giai đoạn chuyển; thay bằng biến ở bước viết lại |
| `src/content/real/story/*.ts`, `challenges.ts`, `evidence.ts` | **xóa**, thay bằng dữ liệu sinh từ bộ đọc |
| `faithfulness.test.ts` | **xóa**; thay bằng test "bộ đọc đọc hết thư mục không lỗi" và test engine |
| `src/sql-challenge/data/*.ts` | `du-lieu/*.yaml` với seed cố định cho ra **đúng** 40 + 8 dòng hiện tại |

Tiêu chí xong bước 1: toàn bộ test hiện có (trừ các test bị xóa ở bảng trên) vẫn xanh, và chơi hết game không thấy khác biệt.

---

## 16. Ví dụ đầy đủ

### 16.1 Thử thách 1 mới (QĐ-073, QĐ-074)

```markdown
# c1 — Lớp nào khớp cả hộp góp ý lẫn bookmark? {thử thách: c1}

- Tiêu đề: Thử thách 1 — Lớp nào khớp cả hộp góp ý lẫn bookmark?
- Đề bài: Hộp góp ý được mở ở giảng đường B; mẩu bookmark là của ngành Báo chí. Lớp sinh hoạt nào khớp cả hai?
- Bảng: lop_sinh_hoat 🔒
- Cột: ma_lop, nganh, toa_nha 🔒
- Phép so sánh: bằng
- Số điều kiện: 1 → tối đa 2
- Nhân vật: ha-vy (phải), tung (trái, vào sau)
- SQL chuẩn:
  ```sql
  SELECT ma_lop, nganh, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí';
  ```
- Kiểu lưu: cả kết quả
- Note: tiêu đề "Lớp khớp cả hai" · giá trị "{{kq.ds.ma_lop | noi}}" · kéo vào ô được: có
- Soát: mỗi dòng phải khớp "toa_nha = 'B'" (hộp góp ý giảng đường B), "nganh = 'Báo chí'" (bookmark ngành Báo chí)

## Bước
- mo-dau → sang: chon-cot sau 3 giây
- chon-cot → sang: dien-gia-tri khi SỬA · có điều kiện toa_nha
- dien-gia-tri → sang: chay-1 khi SỬA · điều kiện = 1
- chay-1
- tung-vao → sang: chay-or khi SỬA · điều kiện = 2
- chay-or
- sua-and
- ghi-note
- tu-do

## Kịch bản

[KHI VÀO · bước = mo-dau]
- **ha-vy** (smile): Hộp góp ý với bookmark đều chỉ về một lớp. Bảng và cột tớ chọn sẵn rồi, cậu chỉ lo hàng WHERE thôi.

[KHI SỬA · bước = chon-cot]
- [NỔI BẬT cot-1]
- **ha-vy** (neutral): WHERE là bộ lọc, như nút Filter trong Excel. Bắt đầu từ hộp góp ý: ô đầu tiên chọn cột toa_nha.

[KHI SỬA · bước = dien-gia-tri]
- [NỔI BẬT gia-tri-1]
- **ha-vy** (neutral): Phép so sánh để "bằng". Giờ kéo tờ note "B" trên tường, thả vào ô giá trị.

[KHI SỬA · bước = chay-1]
- [NỔI BẬT chay]
- **ha-vy** (smile): Câu SQL bên dưới đọc là: chỉ giữ lớp có toa_nha bằng B. Bấm Chạy xem.

[KHI CHẠY · bước = chay-1 · có điều kiện toa_nha bằng 'B' · điều kiện = 1]
- **ha-vy** (thinking): {{kq.so-dong}} lớp ở tòa B: {{kq.ds.ma_lop | noi}}. Vẫn còn nhiều. Bookmark còn nói gì nữa?
- [CHỜ 2 giây]
- [VÀO tung]
- **tung** (neutral): Trà tắc tới đây! Ơ, {{kq.so-dong}} lớp à? Dễ! Tớ cá là thêm dòng nganh bằng Báo chí, nối OR vào, kiểu gì chả ra.
- [LÀM] thêm điều kiện nganh bằng (để trống)
- [LÀM] đặt phép nối OR
- [CHỜ 2 giây]
- [NỔI BẬT gia-tri-2]
- **ha-vy** (neutral): Được, thử cách của Tùng xem. Cậu kéo tờ note "Báo chí" vào ô giá trị dòng thứ hai.
- [SANG BƯỚC tung-vao]

[KHI CHẠY · bước = chay-or · phép nối = OR · số dòng > kq.lan-truoc.so-dong]
- **tung** (neutral): Ơ… {{kq.so-dong}} lớp? Thêm manh mối mà lại ra nhiều hơn lúc nãy? Tớ cá là máy lỗi.
- [CHỜ 2 giây]
- [NỔI BẬT phep-noi]
- **ha-vy** (thinking): Đừng cá. Đếm. OR là thỏa bất kỳ: lớp nào ở tòa B, hoặc lớp nào ngành Báo chí, đều lọt vào. Mình cần lớp thỏa cả hai cùng lúc. Đổi phép nối sang AND rồi chạy lại.
- [SANG BƯỚC sua-and]

[KHI CHẠY · bước = sua-and · phép nối = AND · số dòng = 1]
- **tung** (neutral): Một lớp: {{kq.dong-1.ma_lop}}! OR là "hoặc", AND là "và"… Được rồi, lần này tớ cá thua.
- [CHỜ 2 giây]
- [NỔI BẬT ghi-note]
- **ha-vy** (smile): Giờ bấm "Ghi thành dữ kiện". Tờ note này cậu tự ghi.
- [SANG BƯỚC ghi-note]

[KHI CHẠY · bước = chay-or · phép nối = AND · số dòng = 1]
- **tung** (neutral): Ơ, AND luôn à? Ừ nhỉ… phải khớp cả hai mới đúng là lớp mình tìm.
- [CHỜ 2 giây]
- [NỔI BẬT ghi-note]
- **ha-vy** (smile): Giờ bấm "Ghi thành dữ kiện". Tờ note này cậu tự ghi.
- [SANG BƯỚC ghi-note]

[KHI GHI NOTE · bước = ghi-note]
- [NỔI BẬT tuong]
- **ha-vy** (neutral): Xong thì kéo tờ note dán lên tường, cạnh mấy manh mối kia.

[KHI DÁN NOTE · bước = ghi-note]
- **ha-vy** (smile): Dữ kiện đầu tiên của cậu đấy. Vòng sau cậu tự làm nhé, tớ ngồi đây, cần thì gọi.
- [CHỜ 2 giây]
- **tung** (neutral): Vòng sau cậu cứ làm, tớ ngồi uống trà cổ vũ. Không cá nữa đâu… chắc thế.
- [THU GỌN tung]
- [SANG BƯỚC tu-do]

[KHI CHẠY]
- **ha-vy** (neutral): {{kq.so-dong | dem "dòng"}}. Đọc lướt một lượt, thấy ổn thì ghi lại thành dữ kiện.

[KHI HỎI GỢI Ý 1]
- **ha-vy** (neutral): Lớp cần tìm phải khớp CẢ hai manh mối: ở tòa B, và thuộc ngành Báo chí.
[KHI HỎI GỢI Ý 2]
- **ha-vy** (thinking): Hai điều kiện: toa_nha bằng B, nganh bằng Báo chí. Phép nối nào nghĩa là "cả hai cùng lúc"?
[KHI HỎI GỢI Ý 3]
- **ha-vy** (thinking): Gần như đáp án: WHERE toa_nha = 'B' AND nganh = 'Báo chí'.
```

Lưu ý: khối `[KHI CHẠY]` không bộ lọc đặt **cuối** để làm mặc định, và không có chữ "đúng/sai".

### 16.2 Nhiệm vụ phụ Bác Tư, lần 3 (loại 1 + loại 2b + true ending)

```markdown
### bac-tu-3-moi — Bác Tư loay hoay với sổ mượn phòng {cảnh: hanh-lang-b}
- [KÍCH HOẠT] bấm: bac-tu
- [ĐIỀU KIỆN] dem.than-thiet.bac-tu = 2 và phần = analysis
- **bac-tu** (neutral): Cháu đấy à. Sổ mượn phòng tuần này bác soát mãi không khớp.
- [RẼ NHÁNH r-bac-tu-3] player: "Bác Tư đang loay hoay với cuốn sổ mượn phòng…"
  - {id: giup-ngay} Để cháu soát giúp bác. → hậu quả: đi tới bac-tu-3-lam
  - {id: de-sau} Cháu phải về phòng CLB, lát cháu quay lại ạ. → hậu quả: đặt co.hen-bac-tu

### bac-tu-3-lam — Soát sổ mượn phòng {cảnh: hanh-lang-b}
- [KÍCH HOẠT] gọi
- [THỬ THÁCH p-bac-tu-3]
- **bac-tu** (neutral): Ừ… đúng là tối hôm kia có một cậu năm cuối mượn chìa phòng B105. Đeo cái huy hiệu hình bánh răng.
- [HẬU QUẢ] tăng dem.than-thiet.bac-tu, mở manh mối clue-robotics-muon-phong, đặt co.tang-am-tra
```

---

## 17. Câu hỏi còn mở

1. **Nhân vật có ảnh biểu cảm mới** (Tùng hiện chỉ có `neutral`): thêm biểu cảm vào `nhan-vat.yaml` khi có ảnh. Trước đó, khuôn trong ví dụ §16.1 dùng `neutral` cho Tùng.
2. **Tùng dùng biến danh sách trong câu nói** có cần định dạng thân mật hơn ("KT24A với QT24B") không? Nếu có, thêm bộ định dạng `noi-voi`.
3. **Kho tên hư cấu** (`kho/ho-dem.txt`, `kho/ten.txt`) cần bao nhiêu tên và ai duyệt để không trùng tên người thật trong trường?
4. **Seed cho người chơi** khi bật ngẫu nhiên: lấy từ câu trả lời với Tùng ở phần mở đầu (GDD) hay ngẫu nhiên thuần? Ảnh hưởng tới khả năng hai người chơi so đáp án với nhau.
5. **Thứ tự dòng dữ liệu** có cần cố định để giữ bẫy `LIMIT` như QĐ-048 không, hay bỏ bẫy này vì vòng chính không còn dạy `LIMIT`?
