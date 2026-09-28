# Kế hoạch gói chuẩn hóa nội dung (bước 1 của QĐ-075)

28/09 · Trạng thái: **kế hoạch, chưa giao** · Đặc tả: `docs/dac-ta-dinh-dang-noi-dung.md`

## Mục tiêu và tiêu chí xong

Chuyển nội dung **hiện tại** sang một nguồn duy nhất (`prototype/noi-dung/`), sinh dữ liệu cho game bằng bộ đọc, xóa phần chép tay.

**Xong khi:**
- Không còn file nội dung chép tay trong `src/content/real/story/*.ts`, `challenges.ts`, `evidence.ts`, `src/sql-challenge/data/*` (phần dữ liệu).
- Sửa một câu thoại chỉ cần sửa **một** file trong `noi-dung/`.
- Toàn bộ test còn lại xanh; chơi hết game (có `?facilitator=1` nhảy phần) không thấy khác biệt.
- **Không đổi chữ nào** của nội dung. Viết lại nội dung theo QĐ-071 → QĐ-074 là việc của đợt sau.

## Hiện trạng (khảo sát 28/09)

| Thứ | Ở đâu | Ghi chú |
|---|---|---|
| Kịch bản | `docs/prototype/kich-ban-prototype.md` (713 dòng) | Nguồn chữ |
| Bản chép tay | `src/content/real/story/*.ts` (~950 dòng), `challenges.ts` (552), `evidence.ts` (97) | Phải xóa |
| Bộ đọc | `src/content/real/testing/read-script.ts` (415 dòng) | Chặt, đã đọc được toàn bộ file; hiện **chỉ dùng trong test** |
| Test so khớp | `faithfulness.test.ts` (555 dòng) | Hết cần khi bỏ bản chép tay |
| Dữ liệu SQL | `src/sql-challenge/data/*.ts` | Dataset chính 40 + 8 dòng, dataset ẩn viết tay |
| Nội dung nằm lẫn trong engine | `sql-challenge/data/challenges.ts` | SQL chuẩn, câu OR của Quân, thứ tự mã chẩn đoán |
| Định danh | `src/shared/ids.ts` | **Tệp đóng băng**; nhân vật, cảnh, manh mối khai báo bằng mảng hằng để TypeScript kiểm tra kiểu |

**Ba phát hiện ảnh hưởng tới kế hoạch:**

1. **Một số node chỉ có trong bản chép tay.** Màn chiếu chạy SQL (deb-01, deb-03), đặt cờ hết quyền truy cập, chú thích thẻ hồ sơ (end-03), thẻ chữ lớn (end-04) hiện được mô tả bằng lời trong `[DÀN DỰNG]`. Người dựng đọc lời đó rồi viết tay thành node. Muốn bỏ bản chép tay thì phải thêm **cú pháp máy đọc được** cho các node này.
2. **Runtime hiện chưa có kích hoạt, cờ tùy ý, bộ đếm.** Mục 15 của đặc tả đổi `[ĐIỂM XEM XÉT]` và `[ĐIỀU KIỆN QUA]` sang `[KÍCH HOẠT]`. Làm vậy trong bước 1 là phải sửa runtime, trái với mục tiêu "game chạy y hệt". **Điều chỉnh:** ở bước 1, bộ đọc **vẫn nhận cú pháp cũ** của hai chỉ dẫn này; việc chuyển sang `[KÍCH HOẠT]` dời sang đợt 13 (cùng lúc sửa runtime). Tương tự, `[KHI ĐÚNG]` và `[KHI: <mã>]` giữ nguyên ở bước 1.
3. **Worktree này chưa có `node_modules`** (`vitest` báo `ERR_MODULE_NOT_FOUND`). Gói đầu tiên phải cài phụ thuộc hoặc nối sang `node_modules` của repo chính trước khi chạy test làm mốc.

## Chọn cách sinh dữ liệu

| Cách | Ưu | Nhược |
|---|---|---|
| **A. Sinh file `.ts` và commit** (`src/content/generated/*.gen.ts`, đầu file ghi "ĐỪNG SỬA TAY") | `tsc`, `vitest`, editor chạy ngay, không cần bước phụ; TypeScript vẫn kiểm được kiểu hẹp (id, biểu cảm) nhờ `satisfies GameContent` | Diff của PR có cả file sinh |
| B. Plugin Vite sinh module ảo lúc chạy | Không có file sinh trong repo | `tsc` và test phải qua plugin; editor không thấy kiểu |
| C. Sinh JSON, kiểm tra lúc chạy | Đơn giản | Mất kiểm tra kiểu lúc biên dịch |

**Chọn A**, kèm test "file sinh khớp với nội dung": chạy bộ đọc lại, so với file đã commit. Quên sinh lại là test đỏ.

## Chia gói (chạy tuần tự, QĐ-057)

### 12a-1 `bo-doc` — Bộ đọc thành công cụ, tách file nội dung

- Cài phụ thuộc cho worktree; chạy toàn bộ test hiện có để lấy **mốc** (ghi số test xanh).
- Chuyển `read-script.ts` từ `src/content/real/testing/` sang `prototype/tools/noi-dung/` (không import từ `src/`). Báo lỗi dạng `<file>:<dòng>: <lỗi>`.
- **Tách** `docs/prototype/kich-ban-prototype.md` thành cấu trúc `prototype/noi-dung/` theo mục 2 của đặc tả: `kich-ban/chinh/01…05-*.md`, `thu-thach/c1…c3, debrief-fix.md`, `ho-so/*.md`, `chung/loi-chung.md`. Chép nguyên văn, không sửa chữ. `docs/prototype/kich-ban-prototype.md` thay bằng một trang ngắn trỏ sang thư mục mới.
- Thêm cú pháp máy đọc được cho các node ở phát hiện 1: `[MÀN CHIẾU …]`, `[ĐẶT CỜ …]`, `[CHÚ THÍCH HỒ SƠ …]`, `[THẺ CHỮ]`, `[KẾT THÚC]`. Cập nhật mục 6.3 của đặc tả cho khớp.
- Chuyển SQL chuẩn, câu OR của Quân, model nạp sẵn từ `sql-challenge/data/challenges.ts` vào thẻ thử thách tương ứng (trường `SQL chuẩn:`, `Truy vấn nạp sẵn:`).
- `faithfulness.test.ts` đọc từ thư mục mới. Bản chép tay **vẫn giữ** ở gói này, nên test so khớp vẫn là lưới an toàn.
- **Nghiệm thu:** bộ đọc đọc hết `noi-dung/` không lỗi; toàn bộ test xanh bằng mốc; `faithfulness` so với thư mục mới vẫn xanh.
- Đề xuất model: **Opus**. Điểm rủi ro: tách file mà sót dòng; test so khớp bắt được.

### 12a-2 `sinh-noi-dung` — Sinh `GameContent`, xóa bản chép tay

- Viết bộ chuyển "kết quả đọc → `GameContent`", thay cho logic đang nằm rải trong các file `.ts` chép tay (ví dụ luật "biểu cảm người hỏi lấy theo lời Hà Vy ngay trước").
- Lệnh `npm run noi-dung:sinh` ghi `src/content/generated/*.gen.ts`; lệnh `npm run kiem-noi-dung` chỉ kiểm, không ghi. Nối vào `predev`, `prebuild`, và test "file sinh khớp nội dung".
- `activeContent` dùng dữ liệu sinh. `CHALLENGE_SPECS` lấy SQL chuẩn từ dữ liệu sinh.
- **Xóa** `src/content/real/story/*.ts`, `challenges.ts`, `evidence.ts`, `faithfulness.test.ts`, `testing/read-script.ts`. Giữ và trỏ sang dữ liệu sinh: `integrity`, `numbers`, `diagnostics`, `display-hygiene`, `redaction`.
- Cập nhật `prototype/docs/ARCHITECTURE.md`.
- **Nghiệm thu:** file sinh qua `tsc` với `satisfies GameContent`; `JSON.stringify(dữ liệu sinh)` **bằng đúng** `JSON.stringify(realContent cũ)` (kiểm một lần trước khi xóa, ghi kết quả vào báo cáo); test xanh; chơi hết game qua trình duyệt.
- Đề xuất model: **Opus**. Gói lớn nhất; nhịp commit 25 phút.

### 12b `nhan-vat-canh` — Nhân vật, cảnh, định danh sinh từ YAML

- Tạo `noi-dung/nhan-vat.yaml` (mục 4 của đặc tả, điền đúng theo kịch bản hiện tại: Quân là Ban Pháp chế, `xuat-hien-tu: debrief`) và `noi-dung/canh.yaml`.
- Bộ sinh ghi `src/shared/ids.gen.ts` (mảng hằng nhân vật + biểu cảm, cảnh, manh mối, tài liệu, vật chứng, thử thách). `ids.ts` giữ các hàm và **re-export** từ file sinh. Đây là ngoại lệ có kiểm soát của luật tệp đóng băng (như QĐ-069); ghi QĐ khi giao.
- Bộ đọc kiểm tra: người nói có trong `nhan-vat.yaml`, biểu cảm có trong `bieu-cam`, nhân vật không nói trước `xuat-hien-tu`.
- **Nghiệm thu:** `ids.gen.ts` sinh ra có nội dung **bằng đúng** các mảng hằng hiện tại; `tsc` và test xanh; thử cố ý viết sai biểu cảm trong một file `.md` → build báo lỗi đúng dòng.
- Đề xuất model: **Opus** (đụng tệp đóng băng và kiểu dùng khắp nơi).

### 12c `du-lieu-yaml` — Dữ liệu SQL sang YAML

- `noi-dung/du-lieu/bang.yaml` (lược đồ + mô tả cột đang hiện ở "Mô tả các bảng"), `co-dinh.yaml` chứa **toàn bộ** 40 + 8 dòng hiện tại, `an.yaml` chứa dataset ẩn hiện tại.
- Chưa làm bộ sinh theo seed, chưa có ràng buộc (đợt 14). Giữ đúng thứ tự dòng (QĐ-048).
- Bộ sinh ghi dữ liệu vào `src/sql-challenge/data/*.gen.ts`; các test bất biến số dòng (QĐ-012, QĐ-013, QĐ-015) giữ nguyên và phải xanh.
- **Nghiệm thu:** dữ liệu sinh **bằng đúng** dữ liệu cũ, dòng theo dòng; test xanh.
- Đề xuất model: **Sonnet** (việc cơ học, có test bất biến sẵn làm lưới).

## Luật chung cho mọi gói

- Chạy **tuần tự**, một agent một lúc (QĐ-057). Mỗi gói làm trong worktree riêng, nhánh riêng.
- Commit đầu trong 10 phút, sau đó ít nhất 25 phút một lần; bọc lệnh dài bằng `timeout` (bài học gói 11a).
- Chạy dev server bằng `vite` ở cổng riêng, không dùng `preview_start` theo tên (bài học gói 4).
- **Không sửa chữ nội dung.** Thấy lỗi nội dung thì ghi vào báo cáo, không tự sửa.
- Mỗi gói kết thúc bằng: số test trước/sau, danh sách file xóa/thêm, ảnh chụp hoặc ghi chép chơi thử.

## Sau bước chuẩn hóa (ngoài phạm vi kế hoạch này)

| Đợt | Việc | Phụ thuộc |
|---|---|---|
| 13 | Runtime: `[KÍCH HOẠT]`, `[ĐIỀU KIỆN]`, `[HẬU QUẢ]`, cờ, bộ đếm, `[RẼ NHÁNH]` (2b); chuyển `[ĐIỂM XEM XÉT]`/`[ĐIỀU KIỆN QUA]` sang cú pháp mới | 12a-2 |
| 14 | Biến SQL (`bien.yaml`), bộ định dạng, bộ sinh theo seed, ràng buộc, kiểm 1.000 seed, dataset ẩn sinh từ seed | 12c |
| 15 | Màn thử thách mới (QĐ-071 → QĐ-074) và kịch bản loại 3 (khối sự kiện, bước, hành động nhân vật, note, soát hồ sơ) | 13, 14 |
| 16 | Viết lại nội dung: Tùng vào CLB, c1/c2 mới, "Báo chí" thành ngành, chuỗi Bác Tư, true ending | 15 |

## Cần chốt trước khi giao

1. Sinh dữ liệu theo **cách A** (file `.ts` sinh ra và commit)?
2. Đồng ý **điều chỉnh mục 15 của đặc tả**: bước 1 vẫn nhận `[ĐIỂM XEM XÉT]`, `[ĐIỀU KIỆN QUA]`, `[KHI ĐÚNG]`, `[KHI: mã]`; chuyển sang cú pháp mới ở đợt 13?
3. Model đề xuất: 12a-1 Opus, 12a-2 Opus, 12b Opus, 12c Sonnet?
