# Đặc tả định dạng nội dung — CLB Thám Tử Dữ Liệu

Phiên bản 0.2 · 28/09 · theo QĐ-075 (kèm QĐ-071 → QĐ-074), cập nhật theo QĐ-080 → QĐ-083

> **Thay đổi ở 0.2:** nhân vật theo QĐ-080/081 (bộ ba cùng năm 1, Hà Vy không giải thích cú pháp SQL, bác Tư → bác Thịnh) (§4); **sổ tay**: trang sổ chị Linh hiện qua hoạt cảnh, người chơi chép vào sổ cá nhân qua câu kiểm tra toán của Hà Vy — cú pháp mới `[TRA SỔ]`, `[CHÉP SỔ]` và thư mục `so-tay/` (§2, §9.2, §12.5); **bỏ gợi ý 3 cấp** và lời nhận xét theo mã chẩn đoán (§9.2, §9.5); **buổi phản biện** trừ uy tín, Minh Anh giải cứu (§7); luật kiểm tra mới cho buổi phản biện và dữ liệu hoa thường (§14); ví dụ thử thách 1 viết lại (§16.1). Cú pháp sổ tay là đề xuất, hoàn thiện khi làm gói 12a-1 / đợt 15.

> **Thêm ở gói 12a-1 (28/09):** thư mục đang có ở bước 1 (§2); chỉ dẫn `[MÀN CHIẾU]`, `[ĐẶT CỜ]`, `[CHÚ THÍCH HỒ SƠ]`, `[THẺ CHỮ]`, `[KẾT THÚC]` (§6.3); `Truy vấn nạp sẵn`, `Nguồn điều kiện nạp sẵn` trong thẻ thử thách (§9.1); biến tên `{{nv.…}}`, `{{truong.…}}` (§10.4); lệnh `npm run kiem-noi-dung` (§14).

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
├── so-tay/                    # trang sổ chị Linh + mục vào sổ cá nhân, mỗi trang một file (§12.5)
│   ├── where.md
│   └── and-or.md
│   ├── manh-moi.md
│   └── tai-lieu.md
└── chung/
    └── loi-chung.md           # lời dùng chung: Tùng khi người chơi bí, Hà Vy khi con số bất thường, soát hồ sơ, Minh Anh giải cứu
```

Bộ đọc gom tất cả file lại thành một khối dữ liệu. Định danh phải duy nhất trên **toàn bộ** thư mục, không chỉ trong một file.

**Đang có ở bước 1 (gói 12a-1).** Cây trên là đích. Nội dung prototype hiện nằm ở:

```
prototype/noi-dung/
├── README.md                  # cách dùng lệnh kiểm (bộ đọc bỏ qua mọi README.md)
├── quy-uoc.md                 # "# <tên game> — …" + quy ước đọc file + quy ước thẻ thử thách
├── kich-ban/chinh/01-mo-dau.md … 05-ket.md   # mỗi tệp mở đầu bằng "## Phần N — <Tên> {part: <mã>}"
├── thu-thach/c1.md, c2.md, c3.md, debrief-fix.md
├── chung/loi-chung.md         # "Ba câu gợi ý chuẩn" + "Nhận xét chung cho mọi thử thách"
└── ho-so/00-chung.md, 01-manh-moi.md, 02-tai-lieu.md, 03-chu-thich-ket-qua.md
```

Thứ tự đọc: `quy-uoc.md` → `kich-ban/chinh/` → `thu-thach/` → `chung/` → `ho-so/`; trong mỗi thư mục theo tên tệp (nên có tiền tố `01-`, `02-` khi thứ tự có nghĩa). Tệp `.md` nằm ngoài các chỗ trên là lỗi. Bộ đọc: `prototype/tools/noi-dung/`; lệnh kiểm: §14.

---

## 3. Khái niệm dùng chung

| Khái niệm | Viết thế nào | Ví dụ | Ghi chú |
|---|---|---|---|
| **Chuỗi** (sequence) | tiêu đề `###` có định danh | `### bac-tu-3 — Soát sổ mượn phòng {cảnh: hanh-lang-b}` | Đơn vị nhỏ nhất chạy được. Chạy từ trên xuống. |
| **Lời thoại** | `- **<người nói>** (<biểu cảm>): <lời>` | `- **ha-vy** (thinking): Khoan, tính lại đã.` | `player` và `narrator` không ghi biểu cảm. |
| **Chỉ dẫn** | `- [TỪ KHÓA …]` | `- [VÀO tung]` | Không hiển thị. |
| **Cờ** (flag) | `co.<tên>` | `co.da-gap-bac-tu` | Đúng/sai. Mặc định sai. |
| **Bộ đếm** | `dem.<tên>` | `dem.than-thiet.bac-tu` | Số nguyên ≥ 0. Mặc định 0. |
| **Biến** | `{{<tên>}}` trong lời | `{{so-lop-toa-b}} lớp` | Xem §10. |
| **Nhiệm vụ hiện tại** | `> NHIỆM VỤ: <chữ>` | `> NHIỆM VỤ: Giúp Bác Thịnh soát sổ` | Đổi chữ trên thanh trên cùng. |

**Mức độ thân thiết với NPC** (QĐ về nhiệm vụ phụ) là bộ đếm `dem.than-thiet.<npc>`. Không hiển thị thành thanh. Giao diện chỉ được thể hiện qua thái độ nhân vật và, nếu cần, dãy chấm trong Sổ vụ việc.

---

## 4. Nhân vật — `nhan-vat.yaml`

Nguồn chuẩn duy nhất về nhân vật, dùng cho **cả game lẫn người viết và agent viết nội dung**. Mọi mô tả persona ở nơi khác phải khớp file này; khi lệch, file này thắng (bài học ở QĐ-074).

```yaml
tung:
  ten-hien-thi: Tùng
  ho-ten: Trần Tùng
  vai: >
    Năm 1 Du lịch, thành viên CLB, bạn cùng phòng KTX của người chơi, người kéo người chơi vào CLB. Một trong bộ ba.
    Giỏi tìm kiếm trên bản đồ: chỉ đường, nhắc lịch và nhiệm vụ; gợi ý "tra sổ chị Linh" khi cần (QĐ-081, QĐ-083).
  xung-ho: { voi-nguoi-choi: "tớ / cậu", voi-ha-vy: "tớ / cậu", voi-minh-anh: "em / chị", voi-quan: "em / anh" }
  cau-cua-mieng: ["Tớ cá là…"]
  tinh-cach: Lạc quan, xởi lởi, hay đoán bừa, trung thành, biết nhận sai.
  khong-bao-gio: ["Giải thích SQL", "Tra sổ hộ người chơi", "Nói giọng khinh người"]
  bieu-cam: [neutral]                     # chỉ khai báo biểu cảm ĐÃ CÓ ẢNH
  mau: "#c2410c"
  anh: { ban-than: char-tung, chan-dung: char-tung }

ha-vy:
  ten-hien-thi: Hà Vy
  ho-ten: Trần Hà Vy
  vai: >
    Năm 1 Toán ứng dụng, thành viên CLB. Một trong bộ ba. Giỏi logic toán: diễn giải bằng ẩn dụ toán,
    câu kiểm tra của cô là bước chép sổ (§12.5); soát hồ sơ; gọi tên lỗi ở buổi phản biện (QĐ-080 → QĐ-083).
  xung-ho: { voi-nguoi-choi: "tớ / cậu", voi-tung: "tớ / cậu", voi-minh-anh: "em / chị" }
  cau-cua-mieng: ["Khoan, tính lại đã.", "Đừng cá. Tính."]   # câu sau là câu đáp Tùng (QĐ-084)
  tinh-cach: Điềm tĩnh, kỹ tính, ghét võ đoán, tốt bụng.
  khong-bao-gio: ["Giải thích cú pháp SQL", "Cố ý dẫn sai", "Nói 'đúng rồi' / 'sai rồi' về kết quả truy vấn trong màn thử thách"]
  bieu-cam: [neutral, thinking, smile]
  mau: "#0f5c55"

minh-anh:
  ten-hien-thi: Minh Anh
  vai: >
    Năm 3 Luật kinh tế, chủ nhiệm CLB. Giao vụ; dẫn người chơi đi gặp thầy cô, người quản lý dữ liệu → mở địa điểm mới.
    Ở buổi giải trình: cảm xúc theo thanh uy tín; mỗi lần người chơi mất vạch thì giải cứu (xin làm lại, nói đỡ) (QĐ-083).
  xung-ho: { voi-bo-ba: "chị / em" }
  ho-ten: Lê Minh Anh
  cau-cua-mieng: ["Nói có sách, mách có chứng."]   # đúng thành ngữ, không biến tấu (QĐ-084)
  khong-bao-gio: ["Nói thay đáp án cho người chơi", "Hoàn lại vạch uy tín"]
  bieu-cam: [neutral, worried, happy]

quan:
  ten-hien-thi: Quân
  vai: Người của Ban Pháp chế – Kiểm tra Hội sinh viên. KHÔNG phải thành viên CLB. Gặp CLB lần đầu ở CTSV ngày 3 Vụ 1 (giám sát việc lập căn cứ), chất vấn ở buổi họp rà soát (QĐ-087).
  xung-ho: { voi-clb: "tôi / các bạn", voi-nguoi-choi: "tôi / em" }
  tinh-cach: Lạnh, chính xác, hơi kẻ cả; biết công nhận khi sai.
  xuat-hien-tu: vu1-ngay-3               # bộ đọc báo lỗi nếu Quân nói trước phần này (QĐ-087; trước là debrief)
  bieu-cam: [neutral, smug, stunned]

duy:                                     # QĐ-087
  ten-hien-thi: Duy
  ho-ten: Nguyễn Đức Duy
  vai: Năm 2 Hành chính học, thành viên CLB từ năm nhất. Giữ tài sản CLB (chìa khóa, tủ hồ sơ, sổ tài sản, máy tính cũ); nắm quy trình rà soát. Không phá án.
  xung-ho: { voi-bo-ba: "tớ / cậu", voi-minh-anh: "em / chị" }
  bieu-cam: [neutral]

bac-tu:                                  # mã giữ nguyên khi đổi tên (QĐ-079 câu 4)
  ten-hien-thi: Bác Thịnh                # trước là "Bác Thịnh" (QĐ-081)
  vai: Bảo vệ giảng đường B, khoảng 55 tuổi; nhân chứng Vụ 1.
  xung-ho: { voi-sinh-vien: "bác / cháu" }
  bieu-cam: [neutral]
```

Trường bắt buộc: `ten-hien-thi`, `vai`, `bieu-cam`. Các trường khác là hướng dẫn cho người viết; bộ đọc chỉ kiểm tra `bieu-cam` và `xuat-hien-tu`.

Hai người nói đặc biệt không khai báo trong file: `player` (nam, QĐ-087; hiển thị tên người chơi đặt; câu hô "Số liệu đây!", QĐ-082) và `narrator` (không nhãn). Tên nhân vật trong câu thoại viết bằng biến `{{nv.<mã>}}` (QĐ-079 câu 4), tên trường bằng `{{truong.ten-day-du}}` / `{{truong.ten-ngan}}` (QĐ-080).

---

## 5. Cảnh — `canh.yaml`

```yaml
hanh-lang-b:
  ten: Hành lang giảng đường B
  anh-nen: bg-corridor-b
  diem-xem-xet:
    bac-tu:   { nhan: "Bác Thịnh",    loai: npc, vi-tri: [62, 55] }   # % theo chiều ngang, dọc
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
### bac-tu-chao — Bác Thịnh, lần gặp đầu {cảnh: hanh-lang-b}
- [KÍCH HOẠT] bấm: bac-tu
- [LẶP] mỗi lần
- **bac-tu** (neutral): Cậu sinh viên tìm ai?

### bac-tu-tin — Bác Thịnh, khi đã thân {cảnh: hanh-lang-b}
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
| `[MÀN CHIẾU <mã> · chạy · <n> dòng]` + khối ` ```sql ` ngay dưới | Màn chiếu (buổi giải trình) hiện câu SQL trong khối; `chạy` = chạy thật trên dataset chính; `<n> dòng` = số dòng kỳ vọng (không bắt buộc). Giữa dòng chỉ dẫn và khối chỉ được có dòng trống. |
| `[MÀN CHIẾU <mã> · vật chứng <ev-…> · chạy · <n> dòng]` | Như trên nhưng câu SQL lấy từ vật chứng người chơi đã lưu (vd truy vấn vừa sửa). `không chạy` = chỉ hiện câu SQL. |
| `[MÀN CHIẾU <mã> · truy vấn nạp sẵn <mã thẻ> · chạy · <n> dòng]` | Như trên nhưng câu SQL lấy từ dòng `Truy vấn nạp sẵn:` của thẻ thử thách đó (§9.1) — câu SQL chỉ viết một chỗ (gói 12a-2; deb-01 dùng cách này cho truy vấn OR của Quân). Không có khối sql ngay dưới. Thẻ không có "Truy vấn nạp sẵn" là lỗi. |
| `[ĐẶT CỜ <cờ>]` | Bật một cờ của game ngay tại đó (bước 1 chỉ có cờ `access-revoked`: hết quyền xem dữ liệu, khóa nút mở trình dựng). |
| `[CHÚ THÍCH HỒ SƠ <ev-…>]` / `[CHÚ THÍCH HỒ SƠ <ev-…> · làm mờ]` | Gắn chú thích vào thẻ kết quả truy vấn trong Hồ sơ; chữ lấy nguyên văn dòng `- Chú thích:` của thẻ hồ sơ cùng mã (§12). `làm mờ` = tên và mã trong bảng của thẻ bị làm mờ (QĐ-062). |
| `[THẺ CHỮ] **<người nói>** …: <lời>` | Tiền tố trước một lời thoại: lời đó hiện dạng thẻ chữ lớn giữa màn hình (thông điệp kết). |
| `[KẾT THÚC]` | Hết game; sau đó là khảo sát cuối game (không viết trong nội dung). |

Bốn chỉ dẫn `[MÀN CHIẾU]`, `[ĐẶT CỜ]`, `[CHÚ THÍCH HỒ SƠ]`, `[THẺ CHỮ]` có từ gói 12a-1: trước đó các việc này chỉ tả bằng lời trong `[DÀN DỰNG]` và người dựng chép tay thành node. Dòng `[DÀN DỰNG]` cũ vẫn giữ để người đọc hiểu cảnh; máy chỉ đọc chỉ dẫn. Khi runtime có `[HẬU QUẢ]` và cờ tùy ý (đợt 13), `[ĐẶT CỜ x]` tương đương `[HẬU QUẢ] co.x`.

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
- Được dùng ở chuỗi thường (loại 1) và trong trang sổ (§12.5, bước chọn đoạn code). **Không** dùng trong màn thử thách (loại 3), vì màn thử thách không phán đúng/sai (QĐ-071).
- **Ở buổi phản biện** (QĐ-082, QĐ-083) viết `[HỎI <mã> · trừ uy tín]` và `[CHỌN DÒNG <mã> · trừ uy tín]`: mỗi lần chọn sai mất 1 vạch, chạy khối `[KHI MẤT UY TÍN]` trong `chung/loi-chung.md` (Minh Anh đổi sắc mặt, xin làm lại hoặc nói đỡ, không nói đáp án), rồi cho chọn lại. Telemetry vẫn ghi lần chọn đầu tiên.
- Phản hồi có thể nhiều câu, nối bằng ` <br> ` như hiện tại.

---

## 8. Loại 2b — Lựa chọn rẽ nhánh

```markdown
- [RẼ NHÁNH r-giup-bac-tu] player: "Bác Thịnh đang loay hoay với cuốn sổ mượn phòng…"
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
- Nhân vật: ha-vy, tung                     ← xuất hiện theo kịch bản, không ngồi cạnh màn hình (QĐ-081)
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

**Thẻ thử thách ở bước 1 (gói 12a-1, định dạng cũ `### <mã> — … {challenge: <mã>}`).** Khối ` ```sql ` thuộc dòng `- <Nhãn>:` bỏ trống **ngay trên nó** (chỉ cách bằng dòng trống). Ba dòng máy đọc:

| Dòng | Nghĩa |
|---|---|
| `- SQL chuẩn:` + khối sql | Câu SQL chuẩn của thử thách (engine dùng để chấm và đếm số dòng kỳ vọng). |
| `- Truy vấn nạp sẵn:` + khối sql | Truy vấn đã nằm sẵn trong trình dựng khi mở màn (vd truy vấn `OR` của Quân ở `debrief-fix`). Chỉ nhận dạng trình dựng dựng được: `SELECT <cột>, … FROM <bảng> WHERE <đk> {AND hoặc OR <đk>};` với **một** phép nối chung; điều kiện `cột = '…'`, `cột LIKE '…%'` (bắt đầu bằng) / `'%…'` / `'%…%'`, `cột IN ('…', …)`. |
| `- Nguồn điều kiện nạp sẵn: <id> ← <nguồn> · <id> ← <nguồn> · …` | Đúng thứ tự điều kiện trong `WHERE`: mã cục bộ của điều kiện và nguồn giá trị — `clue-…` (manh mối), `ev-…` (vật chứng) hoặc `tu-nhap` (QĐ-017). |

Dòng tả bằng lời `- Nạp sẵn vào trình dựng: …` vẫn giữ cho người đọc; máy đọc các dòng trên.

### 9.2 Phần kịch bản: khối sự kiện

Kịch bản trong màn thử thách là **danh sách khối**. Mỗi khối bắt đầu bằng `[KHI …]` và chứa lời thoại, chỉ dẫn:

```markdown
## Kịch bản

[KHI VÀO]
- **tung** (neutral): Hộp góp ý với bookmark đều chỉ về một lớp. Tớ cá là tìm ra ngay!

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
| `[THU GỌN <nhân vật>]` | Nhân vật rời khung hình, vẫn có mặt trong cảnh. |
| `[TRA SỔ <trang> · <phần>]` | Hoạt cảnh: một trang sổ chị Linh phóng to rồi đóng (`phần`: cú pháp, tâm đắc, lỗi thường gặp) (§12.5). |
| `[CHÉP SỔ <trang>]` | Chạy trọn trang sổ: trang chị Linh → lời Hà Vy → chọn đoạn code → vào sổ cá nhân; xong quay lại màn (§12.5). |
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

`chung/loi-chung.md` chứa các khối dùng cho mọi thử thách: lời Tùng khi người chơi bí (`KHI NGỒI YÊN`, hoặc `mã chẩn đoán = …` · `lặp n lần`) kèm `[TRA SỔ … · lỗi thường gặp]`; lời Hà Vy khi con số bất thường (vd `số dòng = 0`, nói bằng ngôn ngữ toán); lời khi kéo note lần đầu. **Không còn lời nhận xét hiện theo từng mã chẩn đoán và gợi ý 3 cấp** (QĐ-080, QĐ-081); mã chẩn đoán chỉ dùng để chọn khối và ghi telemetry. Engine ghép **khối của thẻ trước, khối chung sau**, nên thẻ luôn ghi đè được lời chung.

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

### 10.4 Biến tên nhân vật và tên trường (QĐ-079 câu 4, QĐ-080, QĐ-088)

Tên riêng không viết cứng trong lời: đổi tên một nhân vật hay tên trường chỉ sửa **một** chỗ.

| Viết | Ra | Ghi chú |
|---|---|---|
| `{{nv.<mã>}}` | tên hiển thị của nhân vật | = `{{nv.<mã>.ten}}` |
| `{{nv.<mã>.<dạng>}}` | một dạng tên khác | Dạng dự kiến: `ten` (tên hiển thị), `ho-ten` (họ tên đầy đủ), `trong-cau` (tên gọi giữa câu, danh xưng viết thường: "bác Tư", "thầy Khải"). |
| `{{truong.ten-day-du}}` | tên đầy đủ của trường | QĐ-080: "Trường Đại học Chấn Hưng". |
| `{{truong.ten-ngan}}` | tên ngắn | QĐ-080: "Chấn Hưng". |
| `{{truong.ten-khong-tien-to}}` | tên đầy đủ bỏ chữ "Trường" đầu | "Đại học Chấn Hưng" — dùng khi câu đã có chữ "trường" viết thường ("cổng trường {{truong.ten-khong-tien-to}}"). Thêm ở gói 12a-2. |

Luật:
- **Mã là khóa, không đổi khi đổi tên** (vd `bac-tu` giữ nguyên dù tên hiển thị thành "Bác Thịnh"). Không dùng mã vai trò cho nhân vật xuyên suốt; vai trong vụ án (nhân chứng, người vô can…) là biến của vụ, làm ở đợt 14.
- Bộ đọc thay biến **trước khi** đọc dòng, ở mọi tệp nội dung (kể cả khối sql). Mã hoặc dạng không tồn tại, biến lạ, dấu `{{` / `}}` lẻ là **lỗi** `<tệp>:<dòng>`.
- `{{nv.nguoi-choi}}` (tên người chơi tự đặt, QĐ-077) **giữ chỗ**: chỉ biết lúc chạy game nên bộ đọc chưa thay; viết vào bây giờ là lỗi.
- Biến tên khác biến SQL (§10.1): biến tên có tiền tố `nv.` / `truong.`, không tính bằng SQL, không có bộ định dạng.

**Nguồn tên theo bước:**
- Bước 1 (gói 12a-1): nguồn tạm là `CHARACTER_NAMES` của game (`src/shared/display-names.ts`, qua `src/content/real/testing/nguon-ten.ts`), mới có dạng `ten`; tên trường **vẫn là tên cũ** "Trường Đại học Hoa Phượng" / "Hoa Phượng" để không đổi chữ. Nội dung chưa dùng biến (gói 12a-2 thay tên bằng biến bằng script).
- Gói 12a-2: nội dung đã thay tên bằng biến (script, chữ hiển thị giữ nguyên — dữ liệu sinh bằng đúng dữ liệu cũ); test chặn tên nhân vật có mã và tên trường viết trần trong `noi-dung/` (trừ `quy-uoc.md`; ngoại lệ: tên sinh viên trong dòng kết quả truy vấn, là dữ liệu SQL — đợt 14). Nguồn tạm có thêm dạng `ho-ten` (họ tên trong hồ sơ nhân vật của game) và `trong-cau` (danh xưng đầu tên viết thường); tên trường có thêm `ten-khong-tien-to`, vẫn là tên cũ.
- Gói 12b: nguồn chuyển sang `nhan-vat.yaml` (§4: `ten-hien-thi`, `ho-ten`, dạng trong câu); tên trường vào tệp cấu hình chung.

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

## 12. Hồ sơ vật chứng, giấy note và sổ tay

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
- **ha-vy** (thinking): Khoan, tính lại đã. Tờ "{{note.tieu-de}}": {{soat.so-dong-lech}} dòng không khớp với dữ kiện {{soat.ten-du-kien}}: {{soat.ds-lech | noi}}.
[KHI SOÁT · thiếu dòng]
- **ha-vy** (thinking): Còn {{soat.so-dong-thieu}} {{soat.don-vi}} khớp đủ dữ kiện nhưng chưa có trên tờ note.
[KHI SOÁT · khớp]
- **ha-vy** (smile): Tờ "{{note.tieu-de}}" khớp dữ kiện.
```

Tờ nào lệch thì có nút mở lại đúng thử thách đó. Đây là chỗ duy nhất người chơi biết mình ghi sai (QĐ-071).

### 12.5 Sổ tay (QĐ-083)

Hai cuốn: **sổ chị Linh** (đủ nội dung từ đầu, để ở phòng CLB, chỉ hiện qua hoạt cảnh) và **sổ cá nhân** của người chơi (cuốn duy nhất có giao diện, lớn dần). Mỗi trang là một file `so-tay/<trang>.md`:

```markdown
# and-or — Nối điều kiện: AND và OR {trang sổ: and-or}

- Loại: cú pháp                                ← cú pháp | tâm đắc | lỗi thường gặp
- Mã chẩn đoán liên quan: or-connector, same-column-and   ← dùng cho luật kiểm §14

## Trang chị Linh
(chữ viết tay hiện trong hoạt cảnh; ngắn, có ví dụ)

## Hà Vy
- **ha-vy** (thinking): Hai vòng tròn: một vòng là các lớp ở tòa {{toa-hop-gop-y}}, một vòng là các lớp ngành {{nganh-bookmark}}. Lớp mình cần nằm ở phần chung của hai vòng.

## Chọn đoạn code
- (A) {id: giao} `WHERE toa_nha = '{{toa-hop-gop-y}}' AND nganh = '{{nganh-bookmark}}'` [ĐÚNG] → phản hồi: **ha-vy** (smile): Phần giao. Chép vào sổ đi.
- (B) {id: hop} `WHERE toa_nha = '{{toa-hop-gop-y}}' OR nganh = '{{nganh-bookmark}}'` → phản hồi: **ha-vy** (neutral): Cái đó là phần hợp, lấy cả hai vòng rồi.

## Vào sổ cá nhân
- Chú thích: "Phần giao là AND, phần hợp là OR."
```

Luật:
- `[CHÉP SỔ <trang>]` chạy trọn trang: hoạt cảnh trang chị Linh → lời Hà Vy → chọn đoạn code (loại 2a: đúng một `[ĐÚNG]`, chọn sai thì Hà Vy đáp bằng toán và chọn lại, **không phạt, không đếm**) → đoạn đúng cùng chú thích vào sổ cá nhân.
- `[TRA SỔ <trang> · <phần>]` chỉ hiện trang chị Linh (vd Tùng gợi ý khi người chơi bí → phần `lỗi thường gặp`), không thêm gì vào sổ cá nhân.
- Trang **tâm đắc / lỗi thường gặp** không có mục "Chọn đoạn code".
- Cuối vụ, giấy nhớ của các nhiệm vụ được đính vào sổ cá nhân. Sổ cá nhân xuất ra được để in ôn tập (không in dữ liệu hay lời giải vụ án).
- Ở buổi giải trình, sổ cá nhân chỉ để tự mở xem, không có bước bắt chọn trang (QĐ-082).

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
chép sổ <trang>           trừ uy tín
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
- **Buổi phản biện (QĐ-082):** mỗi buổi giải trình có **đúng một lỗi chính** của đối thủ (một `[CHỌN DÒNG]` gắn mã chẩn đoán); mã đó phải nằm trong `Mã chẩn đoán liên quan` của một trang sổ đã được `[CHÉP SỔ]` trên **mọi** đường đi tới buổi đó; truy vấn của đối thủ chạy được và số dòng trước/sau khi sửa khác nhau.
- Trang sổ: mục "Chọn đoạn code" có đúng một `[ĐÚNG]`; mọi đoạn code chạy được trên dữ liệu.
- **Chạy 1.000 seed:** mỗi seed phải thỏa mọi ràng buộc; mọi biến có giá trị; SQL chuẩn của mọi thử thách chạy được và ra ≥ 1 dòng; mọi dòng cố định có mặt.

**Cảnh báo:**
- Số viết cứng trong lời thoại (§10.3).
- Lời thoại dài quá 2 dòng hộp thoại (~35 từ; ngưỡng đặt trong cấu hình).
- Nhiệm vụ phụ không có hậu quả nào (người chơi làm mà không được gì).
- **Dữ liệu mạch chính có hai giá trị chỉ khác nhau hoa thường** trong cùng một cột (QĐ-082: sắc thái hoa thường chỉ dạy ở nhiệm vụ phụ; dữ liệu mạch chính phải nhất quán, trừ vụ cố ý dạy bài học này).
- Câu hỏi ở buổi phản biện nên nói rõ đọc cái gì (điều kiện, số dòng hay ý nghĩa các dòng); phương án sai phản ánh hiểu lầm có thật (người viết tự kiểm, máy không kiểm được).

Lệnh: `npm run kiem-noi-dung` (trong `prototype/`, có từ gói 12a-1) đọc cả `noi-dung/`, in mỗi lỗi một dòng `<tệp>:<dòng>: <lỗi>`, không ghi tệp nào; mã thoát 1 khi có lỗi. Bước 1 mới kiểm: dòng không khớp quy ước, tham chiếu tới chuỗi / thẻ thử thách / thẻ hồ sơ / vật chứng không tồn tại, định danh trùng, màn chiếu thiếu khối sql, truy vấn nạp sẵn không dựng được, biến tên sai. Nối vào `build` và `test` ở gói 12a-2 (hiện test `faithfulness` đã đọc cả thư mục nên lỗi đọc cũng làm test đỏ).

---

## 15. Chuyển từ định dạng cũ

Bước 1 của QĐ-075: chuyển **nguyên văn** nội dung hiện tại sang cấu trúc mới, game chạy y hệt.

> **Điều chỉnh đã chốt (QĐ-079, user chốt ở QĐ-088):** runtime chưa có kích hoạt, cờ, bộ đếm, nên ở bước 1 bộ đọc **vẫn nhận cú pháp cũ** `[ĐIỂM XEM XÉT]`, `[ĐIỀU KIỆN QUA]`, `[KHI ĐÚNG]`, `[KHI: <mã>]` (và `[GỢI Ý n]`, tiêu đề `{scene: …}`, `{part: …}`); các dòng tương ứng trong bảng dưới chỉ áp dụng từ đợt 13. Bước 1 thêm cú pháp cho màn chiếu, đặt cờ, chú thích hồ sơ, thẻ chữ (§6.3), truy vấn nạp sẵn (§9.1) và biến tên (§10.4). Chi tiết: `docs/ke-hoach-goi-chuan-hoa.md`.
>
> **Đã làm ở gói 12a-1:** tách tệp (§2 "Đang có ở bước 1"), bộ đọc thành công cụ `prototype/tools/noi-dung/`, lệnh `npm run kiem-noi-dung`. Tiêu đề phần vẫn là `## Phần N — … {part: …}` ở đầu mỗi tệp `kich-ban/chinh/` (chưa đổi sang khai báo `phần:`). Bản chép tay và `faithfulness.test.ts` còn giữ tới gói 12a-2.

| Cũ (`docs/prototype/kich-ban-prototype.md`) | Mới |
|---|---|
| `## Phần N — … {part: …}` | tên file trong `kich-ban/chinh/` + khai báo `phần:` ở đầu file |
| `### <id> — … {scene: …}` | `### <id> — … {cảnh: …}` (chấp nhận cả `scene` trong giai đoạn chuyển) |
| `[ĐIỂM XEM XÉT hs-x] nhãn: … · mở manh mối: … · chạy chuỗi: y` | nhãn → `canh.yaml`; chuỗi `y` có `[KÍCH HOẠT] bấm: hs-x` và `[HẬU QUẢ] mở manh mối …` |
| `[ĐIỀU KIỆN QUA] cần: … → … sang <id>` | chuỗi đích có `[KÍCH HOẠT] nút tiếp` + `[ĐIỀU KIỆN] có … và có …` |
| `[ĐI TỚI <id>]` | giữ nguyên |
| `[HỎI]`, `[CHỌN DÒNG]` | giữ nguyên (loại 2a) |
| Thẻ thử thách: `[BƯỚC n · nổi bật: …]` | danh sách `## Bước` + khối `[KHI SỬA · bước = …]` |
| `[KHI: <mã>]` | `[KHI CHẠY · mã chẩn đoán = <mã>]` |
| `[GỢI Ý n]` | **bỏ** (QĐ-080: không còn gợi ý 3 cấp); dùng `[TRA SỔ]` qua lời Tùng |
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
- Nhân vật: tung, ha-vy                     ← xuất hiện theo kịch bản (QĐ-081)
- SQL chuẩn:
  ```sql
  SELECT ma_lop, nganh, toa_nha FROM lop_sinh_hoat WHERE toa_nha = 'B' AND nganh = 'Báo chí';
  ```
- Kiểu lưu: cả kết quả
- Note: tiêu đề "Lớp khớp cả hai" · giá trị "{{kq.ds.ma_lop | noi}}" · kéo vào ô được: có
- Soát: mỗi dòng phải khớp "toa_nha = 'B'" (hộp góp ý giảng đường B), "nganh = 'Báo chí'" (bookmark ngành Báo chí)

## Bước
- mo-dau → (chuyển trong khối)
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
- **tung** (neutral): Hộp góp ý với bookmark đều chỉ về một lớp. Lọc lớp thì… hình như sổ chị Linh có trang "lọc" đấy. Tra thử đi!
- [CHÉP SỔ where]
- [SANG BƯỚC chon-cot]

[KHI VÀO · bước = chon-cot]
- [NỔI BẬT cot-1]

[KHI SỬA · bước = dien-gia-tri]
- [NỔI BẬT gia-tri-1]

[KHI SỬA · bước = chay-1]
- [NỔI BẬT chay]

[KHI CHẠY · bước = chay-1 · có điều kiện toa_nha bằng 'B' · điều kiện = 1]
- **tung** (neutral): {{kq.so-dong}} lớp ở tòa B. Vẫn nhiều nhỉ… Tớ cá là thêm dòng nganh bằng Báo chí, nối OR vào, kiểu gì chả ra.
- [LÀM] thêm điều kiện nganh bằng (để trống)
- [LÀM] đặt phép nối OR
- [NỔI BẬT gia-tri-2]
- [SANG BƯỚC tung-vao]

[KHI CHẠY · bước = chay-or · phép nối = OR · số dòng > kq.lan-truoc.so-dong]
- **tung** (neutral): Ơ… {{kq.so-dong}} lớp? Thêm manh mối mà lại ra nhiều hơn lúc nãy? Tớ cá là máy lỗi.
- **ha-vy** (thinking): Đừng cá. Tính. Khoan, tính lại đã.
- [CHÉP SỔ and-or]
- [NỔI BẬT phep-noi]
- [SANG BƯỚC sua-and]

[KHI CHẠY · bước = sua-and · phép nối = AND · số dòng = 1]
- **tung** (neutral): Một lớp: {{kq.dong-1.ma_lop}}! Được rồi, lần này tớ cá thua.
- [NỔI BẬT ghi-note]
- [SANG BƯỚC ghi-note]

[KHI CHẠY · bước = chay-or · phép nối = AND · số dòng = 1]
- **tung** (neutral): Ơ, AND luôn à? Ừ nhỉ… phải khớp cả hai.
- [NỔI BẬT ghi-note]
- [SANG BƯỚC ghi-note]

[KHI GHI NOTE · bước = ghi-note]
- [NỔI BẬT tuong]

[KHI DÁN NOTE · bước = ghi-note]
- **tung** (neutral): Dữ kiện đầu tiên của cậu đấy! Vòng sau cậu cứ làm, tớ đi dò đường chỗ khác.
- [THU GỌN tung]
- [SANG BƯỚC tu-do]

[KHI CHẠY · số dòng = 0]
- **ha-vy** (thinking): Khoan, tính lại đã. Tập rỗng — không lớp nào thỏa. Xem lại mấy tờ note trên tường đi.

[KHI NGỒI YÊN 40 giây]
- **tung** (neutral): Bí à? Hay mở sổ chị Linh ra tra đi.
- [TRA SỔ and-or · lỗi thường gặp]

[KHI CHẠY]
- (không lời — chỉ hiện bảng kết quả và số dòng)
```

Lưu ý: khối `[KHI CHẠY]` không bộ lọc đặt **cuối** để làm mặc định, và không có chữ "đúng/sai". Không nhân vật nào giải thích cú pháp: cú pháp đến từ trang sổ chị Linh, Hà Vy chỉ nói bằng ngôn ngữ toán, bước làm được dẫn bằng `[NỔI BẬT]`.

### 16.2 Nhiệm vụ phụ Bác Thịnh, lần 3 (loại 1 + loại 2b + true ending)

```markdown
### bac-tu-3-moi — Bác Thịnh loay hoay với sổ mượn phòng {cảnh: hanh-lang-b}
- [KÍCH HOẠT] bấm: bac-tu
- [ĐIỀU KIỆN] dem.than-thiet.bac-tu = 2 và phần = analysis
- **bac-tu** (neutral): Cháu đấy à. Sổ mượn phòng tuần này bác soát mãi không khớp.
- [RẼ NHÁNH r-bac-tu-3] player: "Bác Thịnh đang loay hoay với cuốn sổ mượn phòng…"
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
6. ~~**Bốn câu hỏi của kế hoạch chuẩn hóa** (QĐ-079)~~ — đã chốt ở QĐ-088; biến tên nhân vật và tên trường ở §10.4.
7. **Cú pháp sổ tay** (`[TRA SỔ]`, `[CHÉP SỔ]`, file `so-tay/`) mới là đề xuất ở bản 0.2; chốt khi làm gói 12a-1 (bộ đọc) và đợt 15 (giao diện sổ cá nhân).

---

## 18. Cú pháp kịch bản MVP (gói 12m, QĐ-086 → QĐ-088)

Cú pháp cho kịch bản khung `docs/mvp/kich-ban-vu1-mvp-khung.md`: mở đầu tuần 1, Vụ 1 theo **ngày × 3 khung giờ**, địa điểm × dữ kiện, phòng máy, bằng chứng, buổi họp rà soát, hai kết. Gói 12m chỉ làm **bộ đọc + kiểu + bộ sinh + kiểm lỗi**; runtime chơi được nhịp này là gói kiến trúc MVP sau (QĐ-077). Nội dung prototype (`noi-dung/`) và game hiện tại không đổi.

Nguyên tắc: **tận dụng cú pháp đã có** (lời thoại, `[HỎI]`, `[CHỌN DÒNG]`, `[RẼ NHÁNH]`, `[ĐIỀU KIỆN]`, `[HẬU QUẢ]`, `[TRA SỔ]`, `[CHÉP SỔ]`, `[MÀN CHIẾU]`, `[THẺ CHỮ]`, `[KẾT THÚC]`, thẻ thử thách, thẻ hồ sơ, biến `{{nv.…}}`); chỉ thêm phần **khai báo** (lịch, địa điểm, dữ kiện, nhân vật) và bốn chỉ dẫn mới (`[TẠO NHÂN VẬT]`, `[LỌC THỬ]`, `[RẼ KẾT]`, `[LƯU BẰNG CHỨNG]`). **Toàn bộ là Markdown** — kể cả nhân vật (đặc tả §4 dự kiến YAML; repo chưa có bộ đọc YAML và người viết chỉ cần một định dạng; gói 12b đổi sang YAML nếu muốn, bộ đọc thay một tệp). Mọi thẻ khai báo dùng dạng `- Nhãn: giá trị` như thẻ hồ sơ, nên lỗi luôn báo được `<tệp>:<dòng>`.

### 18.1 Thư mục `prototype/noi-dung-mvp/`

```
prototype/noi-dung-mvp/
├── README.md              # hướng dẫn viết (bộ đọc bỏ qua mọi README.md)
├── quy-uoc.md             # "# <tên game> — <tên bản>", "- Tên trường: …", "- Tên cấm: …"
├── nhan-vat.md            # thẻ nhân vật (§18.2) — nguồn tên cho {{nv.…}}
├── canh.md                # thẻ cảnh nền (§18.3)
├── dia-diem.md            # địa điểm × dữ kiện (§18.4)
├── lich.md                # vụ, luật, ngày × khung, buổi tối, ngày họp, kết (§18.5)
├── du-lieu.md             # bộ dữ liệu SQL cố định của vụ: bảng + bảng ảo (§18.10)
├── kich-ban/*.md          # chuỗi hội thoại (§18.6): 00-mo-dau.md, 01-ngay-1.md, …, 06-hop.md, 07-ket.md
├── thu-thach/*.md         # thẻ thử thách phòng máy — khuôn hiện có (§9.1 "bước 1"), thêm "Số dòng kỳ vọng"
├── so-tay/*.md            # trang sổ chị Linh (§12.5), một trang một tệp
├── chung/loi-chung.md     # "Khi mất uy tín" (§18.7)
└── ho-so/*.md             # thẻ manh mối clue-… (giấy nhớ), tài liệu doc-…, bằng chứng ev-… (§18.8)
```

Tách khỏi `noi-dung/` để bộ đọc prototype không thấy tệp lạ và dữ liệu sinh của prototype không đổi. Thứ tự đọc: `quy-uoc.md` → `nhan-vat.md` → `canh.md` → `dia-diem.md` → `lich.md` → `du-lieu.md` → `kich-ban/` → `thu-thach/` → `so-tay/` → `chung/` → `ho-so/`. Tệp `.md` chỗ khác là lỗi. Định danh duy nhất trên toàn thư mục.

Lệnh (trong `prototype/`): `npm run kiem-noi-dung:mvp` (chỉ kiểm), `npm run noi-dung:sinh:mvp` (ghi `src/content/generated/mvp/kich-ban.gen.ts`, `satisfies KichBanMvp` ở `src/content/mvp/types.ts`). `npm run kiem-noi-dung` / `noi-dung:sinh` chạy **cả hai** bộ. Test "file sinh khớp nội dung" cho MVP: `src/content/generated/mvp/mvp.gen.test.ts`. Tệp sinh MVP nằm thư mục con vì test hiện có của prototype đòi `generated/` không có `.gen.ts` thừa.

### 18.2 Nhân vật — `nhan-vat.md`

```markdown
### tung — Tùng
- Họ tên: Trần Tùng
- Vai: Năm 1 Du lịch, bạn cùng phòng KTX, cháu chú Cường. Dẫn đường, nhắc lịch.
- Biểu cảm: neutral, happy

### quan — Quân
- Vai: Trưởng ban Pháp chế – Kiểm tra Hội sinh viên.
- Biểu cảm: neutral, smug, stunned
- Xuất hiện từ: ngày 3

### co-phu-trach — Cô phụ trách hộp kiến nghị
- Vai: Chỉ xuất hiện qua lời kể và tài liệu.
- Chỉ qua lời kể: có
```

- Tiêu đề `### <mã> — <tên hiển thị>`. Bắt buộc: `Vai`, `Biểu cảm` (trừ khi `Chỉ qua lời kể: có`). `Họ tên` không bắt buộc; `Trong câu` (tên gọi giữa câu, vd "chú Cường") mặc định = tên hiển thị với danh xưng đầu viết thường.
- `Xuất hiện từ`: `mở đầu` (mặc định), `ngày <n>`, `ngày <n> <khung>`, `ngày họp`. Nhân vật **nói** (hay được `[VÀO]`) ở chuỗi chạy trước mốc đó là lỗi tại dòng lời đó. `Chỉ qua lời kể: có` → nhân vật không được nói ở đâu cả.
- Biến: `{{nv.<mã>}}` = tên hiển thị, `{{nv.<mã>.ho-ten}}`, `{{nv.<mã>.trong-cau}}` (§10.4); tên trường `{{truong.…}}` lấy từ dòng `- Tên trường:` của `quy-uoc.md` (tự suy `ten-ngan` = bỏ "Trường Đại học", `ten-khong-tien-to` = bỏ "Trường").
- **`{{nv.nguoi-choi}}` dùng được** trong bộ MVP: bộ đọc giữ nguyên chuỗi `{{nv.nguoi-choi}}` trong dữ liệu sinh, runtime thay bằng tên người chơi đặt ở `[TẠO NHÂN VẬT]` (QĐ-077). Bộ prototype vẫn coi là lỗi (không đổi).
- `player` (nam, QĐ-087) và `narrator` không khai báo.

### 18.3 Cảnh — `canh.md`

```markdown
### phong-ktx — Phòng KTX 408
- Ảnh nền: bg-ktx-408          ← không bắt buộc; chưa có ảnh thì bỏ
```

Mọi `{cảnh: …}` ở chuỗi và `Cảnh:` ở địa điểm phải có ở đây.

### 18.4 Địa điểm × dữ kiện — `dia-diem.md`

```markdown
## toa-b — Sảnh tòa B và hộp kiến nghị {địa điểm: toa-b}
- Cảnh: sanh-toa-b
- Mở từ: ngày 1                       ← mặc định "ngày 1 sáng"; "ngày 3 trưa" = từ khung trưa ngày 3
- Tốn khung: mỗi dữ kiện 1            ← mặc định. Phòng máy: "vào 1, bên trong 0"
- Phân biệt: Tờ rơi ở chân cầu thang, không kẹt trong khe; chỉ thẻ lịch mắc vào mép tôn   ← cho người viết

### dk-bac-thinh-the-lich — Bác Thịnh kể lúc mở hộp; thẻ lịch rách ở khe {dữ kiện: chính}
- Chuỗi: n1-bac-thinh
- Mở manh mối: clue-toa-b, clue-bao-chi-k24
- Lưu bằng chứng: ev-the-lich
- Ảnh: obj-hop-kien-nghi · x 28% · y 50% · rộng 8%      ← vật bấm được trên nền (§18.4a)

### dk-to-roi-guitar — Tờ rơi CLB Guitar dưới chân cầu thang {dữ kiện: nhiễu}
- Chuỗi: n1-to-roi
- Ảnh: obj-to-roi-guitar · x 72% · y 80% · rộng 6%

### dk-nhat-ky-in — Một dòng nhật ký in 23:10 Chủ nhật {dữ kiện: phụ}
- Mở từ: ngày 4
- Cần: có ev-hai-ma
- Chuỗi: n4-nhat-ky-in
- Lưu bằng chứng: ev-nhat-ky-in
```

- Địa điểm là tiêu đề `##`, dữ kiện là các `###` ngay dưới. Nhãn `chính` / `phụ` / `nhiễu` **chỉ người viết thấy** (không vào giao diện); dòng `Phân biệt:` ghi người chơi dựa vào gì để phân biệt.
- Dữ kiện: bắt buộc `Chuỗi` (chuỗi chạy khi người chơi chọn dữ kiện) **hoặc** `Thử thách` (dữ kiện là một màn phòng máy: `- Thử thách: c-loc-lop`; bằng chứng lấy từ "Vật chứng lưu vào hồ sơ" của thẻ). Không bắt buộc: `Mở từ` (mặc định = của địa điểm), `Cần` (điều kiện §13.1, chỉ dạng `có <mã>` / `không có <mã>`, `và`, `hoặc`, ngoặc), `Mở manh mối`, `Hiện tài liệu`, `Lưu bằng chứng`, `Lặp: mỗi lần` (mặc định một lần), `Ảnh` (§18.4a).
- Mỗi địa điểm có **min–max dữ kiện phụ/nhiễu**; **dữ kiện chính không tính** vào con số này (QĐ-089). Dòng luật viết `- Mỗi địa điểm: 1–3 dữ kiện phụ/nhiễu` trong `## Luật` của lich.md (viết thiếu "phụ/nhiễu" là lỗi, để không ai đọc nhầm thành đếm cả chính). Phòng máy và CTSV mỗi nơi gánh hai ngày (2 chính + 2 phụ/nhiễu) vẫn hợp lệ. Hai [chính] cùng chỗ cùng ngày trong kịch bản khung (lời bác Thịnh + thẻ lịch) viết thành **một** dữ kiện chính có nhiều hậu quả — vì QĐ-086 "mỗi ngày giải được 1 dữ kiện chính". Dữ kiện gắn nhãn `chính` nhưng chỉ là bước đệm (cô Hạnh cấp quyền trước khi vào phòng máy) không ghi ở lịch mà được dữ kiện chính của ngày `Cần` (qua vật phẩm nó tạo ra); bộ kiểm gộp nó vào chi phí khung của ngày đó.

### 18.4a Vật tương tác trên nền — dòng `- Ảnh:` (gói ban-do-di-lai, QĐ-089)

```markdown
- Ảnh: <sprite> · x <n>% · y <n>% · rộng <n>%
- Ảnh: obj-ban-may · x 60% · y 78% · rộng 20%          ← vật: ảnh src/assets/mvp/vat/obj-ban-may.webp
- Ảnh: nv:co-hanh · x 58% · y 100% · rộng 17%          ← người: chân dung nhân vật co-hanh (nhan-vat.md)
```

- **Sprite:** `obj-<tên>` = tệp ảnh (đã tách nền, có alpha, cắt sát vật) trong `prototype/src/assets/mvp/vat/`;
  `nv:<mã nhân vật>` = chân dung của nhân vật đó (mã trong nhan-vat.md; ảnh tra theo `anh-mvp.ts`).
- **(x, y) là CHÂN ẢNH** — điểm giữa cạnh dưới của ảnh — tính theo % bề rộng / bề cao ảnh nền (0–100). Vật đặt trên mặt
  bàn: y = mép mặt bàn; người đứng: y = 100% (chân dung cắt ngang gối, đáy ảnh trùng đáy khung). `rộng` = % bề rộng nền;
  chiều cao theo tỉ lệ ảnh. Số lẻ viết `12.5` hoặc `12,5`.
- Mỗi dữ kiện **tối đa một** dòng `Ảnh`. Hai dữ kiện dùng chung một vật (bàn máy, máy in, sổ niêm phong) ghi **cùng**
  sprite và **cùng** x, y, rộng: game gộp thành một điểm, bấm mở dữ kiện đang mở; hai dữ kiện cùng mở → người chơi chọn
  nhanh bằng nhãn trung tính.
- Dữ kiện thiếu dòng `Ảnh` vẫn chơi được (chọn qua danh sách chữ trong nơi đó) — bộ kiểm chỉ **cảnh báo**.
- Người chơi không bao giờ thấy mô tả dữ kiện (`### <mã> — <mô tả>`): nút và danh sách dùng nhãn trung tính dựng từ dữ
  liệu (`src/mvp/engine/nhan-cho-xem.ts`).
- Chọn tọa độ: mở ảnh nền `src/assets/mvp/nen/bg-mvp-<cảnh>.webp` (1360×768), đặt vật vào chỗ để trống (kế hoạch ảnh
  `art/prompts/prompts-mvp-vu1-v0.1.md` mục 2). Ảnh tối `-dem` cùng bố cục nên dùng chung tọa độ.

### 18.5 Lịch — `lich.md`

```markdown
# Vụ 1 — Chữ ký H. {vụ: vu1}

## Luật
- Khung giờ: sang "Sáng", trua "Trưa", chieu "Chiều"
- Buổi tối: toi "Buổi tối"
- Dữ kiện chính tối đa: 2 khung
- Mỗi địa điểm: 1–3 dữ kiện phụ/nhiễu
- Uy tín: 5 vạch

## Mở đầu
- Chuỗi đầu: md-01-ktx

## Ngày 1 — Thực địa {ngày: 1}
- Dữ kiện chính: dk-bac-thinh-the-lich
- Mở ngày: n1-mo                      ← không bắt buộc: chuỗi chạy đầu ngày (HUD "Ngày 1 — Sáng")
- Buổi tối: toi-1                     ← bắt buộc: chuỗi khi hết 3 khung mà chưa có dữ kiện chính

## Ngày 6 — Buổi họp rà soát {ngày họp}
- Chuỗi: hop-00

## Kết
- Kết thật: ket-that
- Kết thường: ket-thuong
```

- Mỗi ngày điều tra có **đúng một** `Dữ kiện chính` (phải là dữ kiện gắn nhãn `chính`, mỗi dữ kiện chính thuộc đúng một ngày, `Mở từ` của nó ≤ ngày đó) và một `Buổi tối`. Buổi tối = "đồng đội dẫn tới đúng chỗ, người chơi tự làm bước cuối": chuỗi buổi tối phải `[ĐI TỚI]` (trực tiếp hoặc qua chuỗi khác) chuỗi của dữ kiện chính ngày đó.
- **Kiểm "≤ 2 khung":** chi phí = tổng `Tốn khung` của dữ kiện chính cộng các dữ kiện tạo ra vật phẩm nó `Cần` (đệ quy) mà mở **cùng ngày**, cộng chi phí "vào" của mỗi địa điểm phòng máy phải ghé. Lớn hơn `Dữ kiện chính tối đa` là lỗi tại dòng `Dữ kiện chính`. Ví dụ ngày 2: cô Hạnh (1) + vào phòng máy (1) + bàn làm việc bên trong (0) = 2. Mọi dữ kiện `chính` phải thuộc đúng một ngày theo cách này.
- `{ngày họp}`: không có khung; `Chuỗi` bắt buộc. `[HỎI … · trừ uy tín]`, `[CHỌN DÒNG … · trừ uy tín]` chỉ được dùng ở chuỗi tới được từ ngày họp.
- `## Kết`: `Kết thật` là chuỗi có `[ĐIỀU KIỆN]` ở đầu (§6.1) — đó là **điều kiện true end**; `Kết thường` không có `[ĐIỀU KIỆN]`. Cả hai kết thúc bằng `[KẾT THÚC]`. Kiểm: mọi mã trong điều kiện tồn tại và **có cách đạt được** (do một dữ kiện `Mở manh mối`/`Lưu bằng chứng`, hoặc thẻ thử thách lưu); điều kiện thỏa khi có đủ mọi thứ đạt được; và **không** thỏa khi chỉ có các thứ từ dữ kiện chính (true end phải cần dữ kiện phụ).

### 18.6 Chuỗi — `kich-ban/*.md`

Khuôn như §6.1, tiêu đề `### <mã> — <mô tả> {cảnh: <cảnh>}`; không cần `## Phần`. Chuỗi phải được **nối vào đâu đó**: lịch (`Chuỗi đầu`, `Mở ngày`, `Buổi tối`, ngày họp, kết), dữ kiện (`Chuỗi:`), hay `[ĐI TỚI]` / `→ hậu quả: đi tới` từ chuỗi khác; chuỗi lẻ là lỗi. Mốc thời gian của chuỗi (để kiểm `Xuất hiện từ`) = mốc sớm nhất trong các đường nối tới nó.

Dùng được trong chuỗi (ngoài §6.3: `[VÀO]`, `[RA]`, `[ĐI TỚI]`, `[HIỆN TÀI LIỆU]`, `[THỬ THÁCH]`, `[CHỜ n giây]`, `[HIỆU ỨNG]`, `[DÀN DỰNG]`, `[MÀN CHIẾU]`, `[THẺ CHỮ]`, `[KẾT THÚC]`, `[HẬU QUẢ]`; §7 `[HỎI]`, `[CHỌN DÒNG]` kèm `· trừ uy tín`; §8 `[RẼ NHÁNH]`; §12.5 `[TRA SỔ]`, `[CHÉP SỔ]`; `> NHIỆM VỤ:`):

| Chỉ dẫn | Nghĩa |
|---|---|
| `- [TẠO NHÂN VẬT ten] tung (neutral): "Cậu tên gì?"` + dòng con `  - xúc xắc: <lời Tùng khi bấm xúc xắc>` | Câu 1 tạo nhân vật: ô tên có nút xúc xắc. Dòng `xúc xắc:` vẫn bắt buộc cho bộ đọc nhưng runtime MVP KHÔNG hiện (user chốt 29/09: bấm xúc xắc Tùng không nói gì). |
| `- [TẠO NHÂN VẬT nganh] tung (neutral): "Học ngành gì?"` + dòng con `  - lựa chọn: Kế toán · Quản trị kinh doanh · …` | Câu 2: chọn ngành. Cả game có đúng một `ten` và một `nganh`, đều trong mở đầu, `ten` trước `nganh`. |
| `- [LỌC THỬ <mã> · <n> dòng · chọn <cột> = <giá trị>]` + khối ` ```sql ` ngay dưới | Lọc thử một lần trên giao diện bàn làm việc (Ngày hội): câu SQL trong khối, số dòng kỳ vọng, dòng người chơi phải chọn. |
| `- [LƯU BẰNG CHỨNG <ev-…>]` | Lưu bằng chứng (key item) ngay tại đây — dùng khi bằng chứng nảy ra giữa chuỗi; thường khai báo ở dữ kiện là đủ. |
| `- [RẼ KẾT]` | Runtime chọn `Kết thật` nếu `[ĐIỀU KIỆN]` của nó thỏa, không thì `Kết thường`. Đúng một lần trong game. |
| `- [ĐIỀU KIỆN] có ev-nhat-ky-in và (có clue-loi-chu-cuong hoặc có clue-loi-dat)` | Dòng đầu chuỗi kết thật (và chuỗi có điều kiện khác). |
| `- [HẬU QUẢ] mở manh mối clue-x, lưu bằng chứng ev-y, đặt co.z, đi tới <chuỗi>` | §13.2 thêm `lưu bằng chứng`. |

Số dòng ghi trong `[LỌC THỬ]`, `[MÀN CHIẾU … · <n> dòng]` (khi có khối sql), "Số dòng kỳ vọng" của thẻ (đi với "SQL chuẩn") là **số người viết khai**. Bộ chuyển gom mọi cặp `(sql, soDong, noi)` vào `soDongKhai` của dữ liệu sinh; `kiem-noi-dung:mvp` **chạy thật** từng câu trên bộ dữ liệu cố định `du-lieu.md` (§18.10) và báo lỗi `<tệp>:<dòng>` khi số khai lệch kết quả (QĐ-089). Số dòng chỉ ghi trong `[DÀN DỰNG]` (không kèm câu SQL) chưa được kiểm.

### 18.7 Lời chung — `chung/loi-chung.md`

```markdown
### Khi mất uy tín {lời chung: mat-uy-tin}
- **minh-anh** (worried): Thầy cho em nó làm lại một lần ạ.        ← lần mất vạch thứ 1
- **minh-anh** (worried): Em xin nói đỡ: …                          ← lần 2, lần 3 lặp câu cuối
- [HẾT VẠCH] **minh-anh** (worried): CLB xin phép hoãn buổi hôm nay.  ← hết vạch: hoãn, quay lại điều tra
```

Bắt buộc có khi lịch có `Uy tín`. Không được nói đáp án (người viết tự kiểm).

### 18.8 Hồ sơ — `ho-so/*.md`

Khuôn thẻ hiện có. Tiền tố: `clue-` = **giấy nhớ** người chơi tự tạo ("[H.]", "[Tòa B]"…), `doc-` = tài liệu, `ev-` = **bằng chứng / key item** (từ phòng máy hay thực địa). Thẻ `clue-` ở MVP chỉ cần `Tiêu đề`, `Nguồn`, `Nội dung` (không còn "Giá trị cho trình dựng"); thẻ `ev-` cần `Tiêu đề`, `Nội dung`. Mọi thẻ phải được ít nhất một dữ kiện / thẻ thử thách / `[HẬU QUẢ]` / `[HIỆN TÀI LIỆU]` / `[LƯU BẰNG CHỨNG]` tạo ra (thẻ không ai tạo là lỗi).

### 18.9 Kiểm lỗi của bộ MVP (`npm run kiem-noi-dung:mvp`)

Đã cài ở gói 12m (`tools/noi-dung/luat-mvp.ts`; test `src/content/real/testing/bo-doc-mvp.test.ts`). Lỗi, báo `<tệp>:<dòng>`: dòng không khớp quy ước; định danh trùng; tham chiếu không tồn tại (cảnh, địa điểm, dữ kiện, chuỗi, nhân vật, biểu cảm, thẻ hồ sơ, thẻ thử thách, trang sổ); mỗi ngày đúng một dữ kiện chính và một buổi tối; dữ kiện chính đạt được trong ≤ N khung; buổi tối dẫn tới dữ kiện chính; mỗi địa điểm 1–3 dữ kiện phụ/nhiễu (không tính chính, QĐ-089); điều kiện true end đạt được và cần dữ kiện phụ; nhân vật nói trước `Xuất hiện từ`; `trừ uy tín` ngoài ngày họp; `[TẠO NHÂN VẬT]` thiếu/thừa/sai thứ tự; `[RẼ KẾT]` không đúng một lần; chuỗi lẻ; thẻ hồ sơ không ai tạo; tên cấm (`- Tên cấm: Vương Khánh` trong quy-uoc.md) xuất hiện trong chữ hiển thị.

Gói ban-do-di-lai thêm (dòng `- Ảnh:`, §18.4a): sai cú pháp; sprite `obj-…` không có tệp trong `src/assets/mvp/vat/`;
`nv:<mã>` không có trong nhan-vat.md; x, y, rộng ngoài 0–100 (rộng phải > 0); hai dòng `Ảnh` trong một dữ kiện; hai
dữ kiện cùng nơi cùng sprite mà khác tọa độ. **Cảnh báo** (in `Cảnh báo: …`, không tính lỗi, không chặn sinh): dữ kiện
chưa có dòng `Ảnh`.

Gói 12m2 (QĐ-089) thêm: **số dòng khai lệch kết quả chạy thật** trên `du-lieu.md` (§18.10), báo ở dòng khai (`[LỌC THỬ]`, `[MÀN CHIẾU … · n dòng]`, hoặc tiêu đề thẻ thử thách có "Số dòng kỳ vọng"); câu SQL khai số dòng mà chạy lỗi (bảng/cột không có, không phải một câu SELECT); thiếu `du-lieu.md` khi có câu khai; lỗi cú pháp của chính `du-lieu.md`. Ví dụ:

```
noi-dung-mvp/kich-ban/06-hop-va-ket.md:8: [MÀN CHIẾU hop-chieu-or]: khai 13 dòng nhưng chạy thật trên noi-dung-mvp/du-lieu.md ra 14 dòng — SELECT ma_sv, ten FROM sinh_vien WHERE ten LIKE 'H%' OR ma_lop = 'BC24A';
```

### 18.10 Dữ liệu cố định — `du-lieu.md` (gói 12m2, QĐ-087, QĐ-089)

Bộ dữ liệu SQL **cố định** của vụ (chưa làm dữ liệu ngẫu nhiên). `kiem-noi-dung:mvp` nạp nó vào SQLite bằng sql.js (cùng thư viện game dùng) rồi chạy từng câu trong `soDongKhai`. Dữ liệu sinh MVP chép nguyên bộ này vào `duLieu` (`BoDuLieuMvp` ở `src/content/mvp/types.ts`) để runtime MVP nạp đúng dữ liệu người viết đã kiểm.

````markdown
# Dữ liệu Vụ 1 — bộ cố định {dữ liệu: vu1}

## lop_sinh_hoat {bảng}
- Cột: ma_lop TEXT, nganh TEXT, khoa_hoc INTEGER, toa_nha TEXT

| ma_lop | nganh | khoa_hoc | toa_nha |
|---|---|---|---|
| KT24A | Kế toán | 2024 | B |

## tra_cuu_k24 {bảng ảo}
- Ghi chú: Danh sách tra cứu tân sinh viên K24 phát ở Ngày hội.

```sql
SELECT s.ma_sv, s.ho_dem, s.ten, l.nganh FROM sinh_vien s JOIN lop_sinh_hoat l ON s.ma_lop = l.ma_lop
```
````

- `## <tên_bảng> {bảng}`: tên chữ thường, số, gạch dưới. Dòng `- Cột:` bắt buộc, mỗi cột `<tên> TEXT` hoặc `<tên> INTEGER`; hàng tiêu đề của bảng Markdown phải đúng tên cột theo thứ tự đó, rồi hàng `|---|`. Ô `NULL` là rỗng; ô trống là lỗi; ô INTEGER phải là số nguyên.
- `## <tên> {bảng ảo}`: một khối ` ```sql ` là **một câu SELECT** trên các bảng đã khai; nạp thành `CREATE VIEW`. Dùng khi kịch bản gọi một "bảng" chỉ là cách nhìn khác của cùng dữ liệu (danh sách tra cứu Ngày hội).
- Chú thích `<!-- … -->` (một hay nhiều dòng) bỏ qua. Không thay biến `{{…}}` trong tệp này.
- Câu SQL được kiểm chỉ nhận **một** câu `SELECT`/`WITH` (dấu `;` cuối được phép).
- Bộ đọc nằm riêng ở `tools/noi-dung/du-lieu-mvp.ts` (`docDuLieuMvp`); phần chạy ở `tools/noi-dung/sql-mvp.ts`. Đổi nguồn dữ liệu sang YAML (§11) chỉ cần thay bộ đọc, giữ đầu ra `BoDuLieuMvp`.
