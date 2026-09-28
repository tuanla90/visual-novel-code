# CLB Thám Tử Dữ Liệu — Kịch bản prototype v0.1 (đã chuyển)

> **Nội dung đã chuyển sang `prototype/noi-dung/`** (gói 12a-1; QĐ-075, QĐ-079, QĐ-088). Tệp này không còn là nguồn: sửa lời thoại, thẻ thử thách, thẻ hồ sơ ở thư mục mới rồi chạy `npm run kiem-noi-dung` (trong `prototype/`). Cách dùng: [`prototype/noi-dung/README.md`](../../prototype/noi-dung/README.md). Định dạng: [`docs/dac-ta-dinh-dang-noi-dung.md`](../dac-ta-dinh-dang-noi-dung.md).
>
> Bản gộp cuối cùng (713 dòng) xem ở commit `c736cfd`: `git show c736cfd:docs/prototype/kich-ban-prototype.md`.

## Tệp nào chứa phần nào

| Phần của tệp gộp cũ | Ở đâu bây giờ |
|---|---|
| Tiêu đề, lời dẫn, "Quy ước đọc file", "Quy ước thẻ thử thách" | `prototype/noi-dung/quy-uoc.md` |
| Phần 1 → Phần 5 | `prototype/noi-dung/kich-ban/chinh/01-mo-dau.md` … `05-ket.md` |
| "Ba câu gợi ý chuẩn", "Nhận xét chung cho mọi thử thách" | `prototype/noi-dung/chung/loi-chung.md` |
| Thẻ thử thách c1, c2, c3, debrief-fix | `prototype/noi-dung/thu-thach/c1.md`, `c2.md`, `c3.md`, `debrief-fix.md` |
| "Hồ sơ vật chứng" | `prototype/noi-dung/ho-so/00-chung.md` (chỉ dẫn chung), `01-manh-moi.md`, `02-tai-lieu.md`, `03-chu-thich-ket-qua.md` |
| "Tự kiểm" | giữ nguyên văn ngay dưới (lịch sử) |

Chữ nội dung chép nguyên văn, không đổi chữ nào. Dòng mới thêm chỉ là cú pháp máy đọc được (`[MÀN CHIẾU]`, `[ĐẶT CỜ]`, `[CHÚ THÍCH HỒ SƠ]`, `[THẺ CHỮ]`, `Truy vấn nạp sẵn`, `Nguồn điều kiện nạp sẵn`), xem mục 6.3 và 9.1 của đặc tả.

---

> **Lịch sử.** Mục "Tự kiểm" dưới đây là kết quả tự kiểm của **tệp gộp cũ**, giữ nguyên văn để không mất. Các lệnh trong đó chạy trên đường dẫn cũ; muốn chạy lại thì dùng bản ở commit `c736cfd`. Từ gói 12a-1, việc kiểm do `npm run kiem-noi-dung` và test `src/content/real/faithfulness.test.ts` đảm nhận.

## Tự kiểm

- [DÀN DỰNG] Mục này không hiển thị trong game. Các lệnh KIỂM TRA của brief chạy bằng Git Bash ở gốc worktree sau mỗi Phần; output dưới đây là của nội dung cuối cùng (commit chứa mục này). Tệp tạm ghi vào thư mục scratchpad của phiên thay cho `/tmp`. Ở lệnh 2 đã bỏ hai dấu sao quanh tên người nói để chính mục này không bị lệnh grep đếm lại; ở lệnh 1 không chép lại mẫu tìm kiếm vì mẫu chứa chính các từ cấm.
- [DÀN DỰNG] Cập nhật bởi gói 5 `noi-dung` theo QĐ-052. Thay đổi của gói 5 trong tệp này: thêm ba lời `no-columns`, `no-value`, `wrong-value` ở "Nhận xét chung" (QĐ-047); xếp các mã blocking theo thứ tự engine; dòng quy ước ưu tiên liệt kê đủ 6 mã blocking; thêm cột khuyến khích vào dòng "Cột bắt buộc" của debrief-fix; gỡ bốn ghi chú của người viết khỏi chữ hiển thị (QĐ-049). Lệnh 2, 3 và phép đếm đủ ở lệnh 4 được chạy lại bằng một script tái lập; script cho ra đúng từng số cũ khi chạy trên bản trước gói 5, rồi mới chạy trên bản này. Năm Phần không đổi chữ nào.
- [DÀN DỰNG] Cập nhật bởi gói 6 `giai-trinh-ui` theo QĐ-054: thêm ba dòng `wrong-table`, `or-connector`, `class-prefix` ở "Nhận xét chung", theo thứ tự của `COMMON_DIAGNOSTIC_ORDER`. Số đổi theo: lệnh 2 (ha-vy thinking 39 → 41), lệnh 4 (nội dung thử thách và toàn file thêm 38 chữ; 162 lời). Chênh lệch đo bằng cùng một phép đếm chạy trên bản trước và bản sau gói 6. Năm Phần không đổi chữ nào.
- [DÀN DỰNG] Kiểm lại bởi gói 9b `tich-hop-b` (QĐ-064) trên bản hiện tại của tệp (sau QĐ-061 Q1 sửa một dòng chú thích không hiển thị và QĐ-062 thêm hai mục chú thích `ev-c1-names-h`, `ev-quan-fixed` ở "Hồ sơ vật chứng"): lệnh 2, lệnh 3 và cột "awk của brief" của lệnh 4 chạy lại cho ra ĐÚNG TỪNG SỐ đang ghi bên dưới. Lệnh dùng (Git Bash, tại gốc repo): lệnh 2 = `grep -o -E '\*\*[a-z-]+\*\*( \([a-z]+\))?' docs/prototype/kich-ban-prototype.md | sed 's/\*//g' | sort | uniq -c`; lệnh 3 = `grep -o -E '(^|[^a-z0-9-])(clue|doc|ev)-[a-z0-9-]+' docs/prototype/kich-ban-prototype.md | sed -E 's/^[^a-z]//' | sort -u`; awk của lệnh 4 = `awk '/^## Phần/{part=$0; next} /^- \*\*/{n=split($0,w," "); c[part]+=n-2} END{for(p in c) print c[p]"\t"p}' docs/prototype/kich-ban-prototype.md` (bỏ hai mẩu đầu dòng `-` và `**người nói**:`, tính thẻ biểu cảm như một chữ). Cột "Đếm đủ" và bảng độ dài lựa chọn là số của lần tính gần nhất (gói 6, commit `2040638`); hai thay đổi kể trên không đụng lời thoại, lựa chọn hay câu hỏi nên các số đó vẫn đúng với bản này (kiểm bằng `git diff 2040638..HEAD -- docs/prototype/kich-ban-prototype.md`).

### Lệnh 1 — từ cấm (phải 0 dòng)

Tự kiểm công cụ trước khi tin số 0: thêm tạm vào cuối file một dòng chứa một tên cấm → lệnh ra đúng 1 dòng → đã xóa dòng đó, file trở lại như cũ.

```text
0
```

Gói 5 không chạy lại lệnh này: mẫu tìm kiếm không được ghi trong repo. Chữ gói 5 thêm vào chỉ gồm ba lời Hà Vy ở "Nhận xét chung", cụm "(khuyến khích thêm `ma_lop`, `clb`)" và hai mã chẩn đoán ở dòng quy ước ưu tiên; không có tên người.

### Lệnh 2 — tổ hợp người nói / biểu cảm

```text
      3 bac-tu (neutral)
     25 ha-vy (neutral)
     20 ha-vy (smile)
     41 ha-vy (thinking)
      2 hoai (downcast)
      2 hoai (nervous)
      1 hoai (relieved)
      4 minh-anh (happy)
     16 minh-anh (neutral)
     10 minh-anh (worried)
      9 narrator
      6 player
     19 quan (neutral)
      2 quan (smug)
      2 quan (stunned)
```

Mọi tổ hợp đều thuộc QĐ-033; `narrator`, `player` không có biểu cảm; `bac-tu` chỉ dùng `neutral`.

### Lệnh 3 — định danh clue / doc / ev

```text
clue-bookmark-baochi
clue-box-building-b
clue-signature-h
doc-bookmark
doc-handover-log
doc-letter
ev-c1-names-h
ev-c2-classes-b
ev-c3-shortlist
ev-quan-fixed
```

Đủ 10 định danh của QĐ-033, không có định danh lạ. Lệnh chạy ba cách cho ra cùng một danh sách: lệnh gốc của brief; có ranh giới từ (`grep -o -w`); và ranh giới tính cả dấu gạch nối, tức ký tự đứng trước phải là đầu dòng hoặc không thuộc `[a-z0-9-]`. Cách thứ ba mới chặn được trường hợp định danh nằm lọt trong một id khác có gạch nối, vì `-w` và `\b` vẫn coi dấu gạch nối là ranh giới.

### Lệnh 4 — số chữ lời thoại theo phần (awk của brief)

```text
274	## Phần 4 — Giải trình {part: debrief}
278	## Phần 2 — Điều tra {part: investigation}
290	## Phần 5 — Kết {part: ending}
206	## Phần 3 — Phân tích dữ liệu {part: analysis}
293	## Phần 1 — Mở đầu {part: intro}
```

Lệnh awk của brief chỉ đếm dòng bắt đầu bằng `- **`, tính cả thẻ biểu cảm như một chữ, và bỏ sót phản hồi trong lựa chọn `[HỎI]` và trong bảng `[CHỌN DÒNG]`. Vì vậy có thêm một lần đếm đủ: đếm chữ sau mỗi thẻ người nói ở mọi nơi (kể cả phản hồi lựa chọn, ô bảng), cộng chữ của lời lựa chọn và câu hỏi; không tính thẻ.

| Phần | awk của brief | Đếm đủ: thoại + lựa chọn + câu hỏi | Ngân sách |
|---|---:|---:|---:|
| Mở đầu | 293 | 276 | ≤ 400 |
| Điều tra | 278 | 310 + 29 + 12 = 351 | ≤ 550 |
| Phân tích dữ liệu | 206 | 194 | ≤ 450 |
| Giải trình | 274 | 448 + 86 + 23 = 557 | ≤ 900 |
| Kết | 290 | 274 | ≤ 300 |
| Cộng năm phần | 1.341 | 1.652 | ≤ 2.600 |
| Nội dung thử thách (không tính vào Phân tích) | — | 928 + 85 + 21 = 1.034 | — |
| Toàn file | — | 2.686 | ≤ 2.600 |

Toàn file 2.686 chữ, vượt ngân sách 86 chữ (khoảng 3%), phần vượt là ba lời mới của QĐ-047 (14 + 19 + 19 = 52 chữ) và hai lời mới của QĐ-054 (18 + 20 = 38 chữ; lời `or-connector` dùng câu gợi ý chuẩn, không thêm chữ). Phần của QĐ-047 đã được chấp nhận theo QĐ-052: ngân sách 2.600 do điều phối viên đặt ở gói 1, tài liệu của user không có; thời lượng thật sẽ đo bằng telemetry. Năm Phần vẫn 1.652 chữ, trong ngân sách.

Độ dài từng lời: dài nhất 24 chữ trong năm phần, 26 chữ trong thẻ thử thách; 0 lời quá 30 chữ; 15/162 lời quá 20 chữ. Dòng "Câu hỏi còn mở" trên thẻ hồ sơ là chữ trên thẻ, không phải lời thoại, nên không tính vào bảng trên; độ dài 11, 9, 7, 11, 7 chữ (giới hạn ≤ 12).

### Đối chiếu con trỏ

```text
So chuoi: 19 · so con tro: 18
Con tro tro toi chuoi KHONG ton tai: (khong co)
Chuoi mo coi (khong ai tro toi): intro-01   <- chuoi mo dau, hop le
seq-id trung lap: (khong co)
```

Mọi con trỏ (lệnh đi tới, "chạy chuỗi" của điểm xem xét, nút "Nhiệm vụ tiếp theo →") đều trỏ tới một tiêu đề chuỗi có thật. Mọi mục trong danh sách "cần" của điều kiện qua cảnh là định danh có trong Hồ sơ.

### Độ dài lựa chọn của các câu hỏi (QĐ-035)

```text
q-sig-h      min=9  max=11 chenh=22% |  ho=9  *ten=9  ma-lop=11
q-two-rows   min=11 max=13 chenh=18% |  tim-ra-roi=12  *can-xac-minh=11  vo-dung=13
q-verify     min=12 max=13 chenh=8%  |  them-dieu-kien=13  chon-dang-ngo=12  goi-ca-hai=12  *nguon-khac=13
q-c1-read    min=9  max=9  chenh=0%  |  chua-h=9  *ten-h=9  ho-h=9
q-c2-read    min=8  max=9  chenh=13% |  *loc-sinh-vien=8  dem-toa-b=9  bo-qua=9
q-c3-read    min=10 max=11 chenh=10% |  chi-hai-ten-h=10  in-ca-hai-lop=11  *and-dong-thoi=11
```

Dấu `*` là lựa chọn đúng. Mọi câu hỏi chênh ≤ 30%; lựa chọn đúng không phải là lựa chọn dài nhất riêng một mình ở câu nào.
