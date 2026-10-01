# Mùa 1 — dữ liệu, query chuẩn và giao kèo engine

> Companion của `mua-1-kich-ban-ready-dev.md`. Các bảng Vụ 2–4 và bảng luyện là dataset mới; Vụ 1 giữ nguyên fixture canon đã duyệt; bài SELECT dùng fixture giáo khoa riêng, không sửa bảng chứng cứ Vụ 1. Giá trị tiếng Việt hiển thị ở giao diện; khóa SQL dùng ASCII để LOWER/TRIM có hành vi SQLite ổn định.

## 1. Fixture bài học SELECT riêng cho Vụ 1

Dùng fixture bài học riêng cho bảng `lop_sinh_hoat`; query chọn cột và lọc tòa trả 4 hàng: KT26A/Kế toán, QT26B/Quản trị kinh doanh, BC26A/Báo chí, BC25A/Báo chí. Query sau thêm điều kiện `nganh = 'Báo chí'` và `khoa_hoc = 2026` trả đúng 1 hàng BC26A cho prompt luyện “Báo chí K26”. Cả hai đều phải yêu cầu người chơi chọn `ma_lop`, `nganh` trong phần SELECT; không chạy ngầm SELECT *.

~~~sql
SELECT ma_lop, nganh FROM lop_sinh_hoat WHERE toa_nha = 'B';
~~~

~~~sql
SELECT ma_lop, nganh FROM lop_sinh_hoat
WHERE toa_nha = 'B' AND nganh = 'Báo chí' AND khoa_hoc = 2026;
~~~

## 2. Dataset Vụ 2 — nhật ký sử dụng phòng

Bảng `nhat_ky_su_dung(ma_buoi TEXT, ma_phong TEXT, ngay TEXT, hoat_dong TEXT, trang_thai TEXT)`.

| ma_buoi | ma_phong | ngay | hoat_dong | trang_thai |
|---|---|---|---|---|
| BUOI-08 | clb-tham-tu | 2026-10-23 | Hướng dẫn tân thành viên | DA_XAC_NHAN |
| BUOI-01 | P-KHO-CHUNG | 2026-10-01 | Nhận vật tư | DA_XAC_NHAN |
| BUOI-06 | CLB-THAM-TU  | 2026-10-16 | Kiểm kê hồ sơ | DA_XAC_NHAN |
| BUOI-05 | clb-tham-tu | 2026-10-30 | Ôn SQL dự kiến | DU_KIEN |
| BUOI-02 | CLB-THAM-TU | 2026-10-02 | Họp thành viên | DA_XAC_NHAN |
| BUOI-04 | clb-tham-tu  | 2026-10-09 | Ôn SQL | DA_XAC_NHAN |
| BUOI-03 | P-KHO-CHUNG | 2026-10-06 | Nhận vật tư | DA_XAC_NHAN |

Khóa `ma_buoi` duy nhất. `ma_phong` cố tình có khác biệt viết hoa/thường và khoảng trắng cuối; sau chuẩn hóa chỉ bốn dòng trạng thái đã xác nhận thuộc phòng CLB. Dòng dự kiến phải bị loại.

Query chuẩn `v2-loc-buoi`:

~~~sql
SELECT ma_buoi, ngay, hoat_dong
FROM nhat_ky_su_dung
WHERE LOWER(TRIM(ma_phong)) = 'clb-tham-tu'
  AND trang_thai = 'DA_XAC_NHAN'
ORDER BY ngay;
~~~

Kết quả theo đúng thứ tự bắt buộc:

| ma_buoi | ngay | hoat_dong |
|---|---|---|
| BUOI-02 | 2026-10-02 | Họp thành viên |
| BUOI-04 | 2026-10-09 | Ôn SQL |
| BUOI-06 | 2026-10-16 | Kiểm kê hồ sơ |
| BUOI-08 | 2026-10-23 | Hướng dẫn tân thành viên |

## 3. Dataset Vụ 3 — sổ tài sản và luân chuyển

Bảng `tai_san(ma_tai_san TEXT, ten_tai_san TEXT, vi_tri_so TEXT)`; `vi_tri_so` là vị trí hiện tại trong sổ tại thời điểm Vụ 3, sau khi phiếu PX-17 đã nhận:

| ma_tai_san | ten_tai_san | vi_tri_so |
|---|---|---|
| MIC-02 | Micro không dây | TU_THIET_BI_CHUNG |
| CAM-01 | Máy ảnh CLB | TU_CLB |
| MIC-01 | Micro có dây | TU_THIET_BI_CHUNG |

Bảng `luan_chuyen(ma_phieu TEXT, ma_tai_san TEXT, den_vi_tri TEXT, nguoi_nhan TEXT, ngay TEXT, trang_thai TEXT)`:

| ma_phieu | ma_tai_san | den_vi_tri | nguoi_nhan | ngay | trang_thai |
|---|---|---|---|---|---|
| PX-19 | MIC-02 | PHONG_AM_THANH | Minh Anh | 2026-11-03 | DE_XUAT |
| PX-11 | MIC-01 | TU_THIET_BI_CHUNG | Duy | 2026-11-01 | DA_NHAN |
| PX-17 | MIC-02 | TU_THIET_BI_CHUNG | Duy | 2026-10-31 | DA_NHAN |
| PX-20 | CAM-01 | PHONG_CLB | Minh Anh | 2026-11-03 | DA_NHAN |

`tai_san.ma_tai_san` là khóa; `luan_chuyen.ma_tai_san` tham chiếu khóa đó. Một vật có thể có nhiều phiếu; chỉ PX-17 có trạng thái `DA_NHAN` cho MIC-02. Có thể kiểm tra không có orphan key.

Query chuẩn `v3-noi-phieu`:

~~~sql
SELECT t.ma_tai_san, t.ten_tai_san, l.ma_phieu, l.den_vi_tri, l.trang_thai
FROM tai_san t
JOIN luan_chuyen l ON t.ma_tai_san = l.ma_tai_san
WHERE t.ma_tai_san = 'MIC-02'
  AND l.trang_thai = 'DA_NHAN';
~~~

Kết quả: `MIC-02 / Micro không dây / PX-17 / TU_THIET_BI_CHUNG / DA_NHAN` (1 hàng). Kiểm tiếp mã dán trên hiện vật, vì JOIN chỉ xác nhận quan hệ trong hai bảng.

## 4. Dataset Vụ 4 — khoản chi/hoàn tiền

Bảng `giao_dich(ma_gd TEXT, ma_phieu TEXT, loai TEXT, so_tien INTEGER, ma_tham_chieu TEXT)`:

| ma_gd | ma_phieu | loai | so_tien | ma_tham_chieu |
|---|---|---|---:|---|
| GD-01 | PH-01 | CHI | 250000 | CT-101 |
| GD-02 | PH-01 | HOAN | -20000 | NH-770 |
| GD-03 | PH-02 | CHI | 180000 | CT-102 |
| GD-04 | PH-03 | CHI | 90000 | CT-103 |
| GD-05 | PH-04 | CHI | 350000 | CT-104 |
| GD-06 | PH-04 | HOAN | -60000 | NH-771 |
| GD-07 | PH-04 | HOAN | -60000 | NH-771 |
| GD-08 | PH-06 | HOAN | -15000 | NH-776 |

Biên nhận `doc-bien-nhan-ph04`: mã phiếu PH-04; một giao dịch hoàn `-60000`; mã ngân hàng NH-771. `ma_gd` là khóa duy nhất. GD-06 và GD-07 là hai hàng nguồn trùng cùng giao dịch ngoài hệ thống; dữ liệu không ghi ai đã nạp từng dòng.

Query chuẩn `v4-nhom-hoan`:

~~~sql
SELECT ma_phieu, COUNT(*) AS so_dong, SUM(so_tien) AS tong_ghi_nhan
FROM giao_dich
WHERE loai = 'HOAN'
GROUP BY ma_phieu
HAVING COUNT(*) > 1;
~~~

Kết quả một hàng: `PH-04 / 2 / -120000`. Câu đọc chi tiết sau đó, dùng kỹ năng đã học ở Vụ 2:

~~~sql
SELECT ma_gd, ma_phieu, so_tien, ma_tham_chieu
FROM giao_dich
WHERE ma_phieu = 'PH-04' AND loai = 'HOAN'
ORDER BY ma_gd;
~~~

Kết quả hai hàng `GD-06` và `GD-07`, cùng `NH-771`, mỗi hàng `-60000`. Đối chiếu biên nhận xác nhận một lần hoàn. Không gán hành động cho cá nhân.

## 5. Relation của điểm chứng cứ Vụ 5

Tên relation: `ho_so_da_xac_minh`.

| Cột | SQLite type | Ý nghĩa |
|---|---|---|
| ma_vu | TEXT | V2, V3, V4 hoặc dòng nháp V5 |
| chu_de | TEXT | HOAT_DONG, TAI_SAN, TAI_CHINH hoặc TONG_HOP cho dòng nháp |
| ma_ho_so | TEXT | 4_BUOI, PX-17, PH-04 hoặc BAN_NHAP |
| so_ban_ghi | INTEGER | số bản ghi đã đối chiếu trong mục đó: 4, 1, 1 |
| trang_thai | TEXT | DA_XAC_NHAN hoặc CHO_XAC_MINH |

Relation chính xác sau khi ba phiếu hợp lệ được thả vào điểm tổng hợp (cộng một dòng nháp do game chuẩn bị sẵn để người chơi luyện lọc trạng thái):

| ma_vu | chu_de | ma_ho_so | so_ban_ghi | trang_thai |
|---|---|---|---:|---|
| V2 | HOAT_DONG | 4_BUOI | 4 | DA_XAC_NHAN |
| V3 | TAI_SAN | PX-17 | 1 | DA_XAC_NHAN |
| V4 | TAI_CHINH | PH-04 | 1 | DA_XAC_NHAN |
| V5 | TONG_HOP | BAN_NHAP | 1 | CHO_XAC_MINH |

Query chuẩn `v5-cte-bao-cao`:

~~~sql
WITH muc_da_xac_minh AS (
  SELECT ma_vu, chu_de, ma_ho_so, so_ban_ghi
  FROM ho_so_da_xac_minh
  WHERE trang_thai = 'DA_XAC_NHAN'
)
SELECT ma_vu, chu_de, ma_ho_so, so_ban_ghi
FROM muc_da_xac_minh
ORDER BY ma_vu, ma_ho_so;
~~~

Kết quả đúng 3 hàng, theo thứ tự V2/V3/V4; dòng `BAN_NHAP` bị loại bởi WHERE. Không tính dòng nháp là evidence hoặc card nguồn. Đầu ra là mục báo cáo, không phải kết luận chất lượng CLB hay so sánh với CLB khác.

## 6. Dataset và query sáu nhiệm vụ phụ

Mỗi nhóm bảng dưới đây được nạp trong namespace riêng `luyen_*`; không thể JOIN với bảng chính của vụ. Thẻ kết quả nhiệm vụ phụ có `caseEvidence=false`, không được thêm vào `ho_so_da_xac_minh`.

### Side 1 — SELECT/WHERE

`luyen_dang_ky(ma_dang_ky TEXT, ten TEXT, trang_thai TEXT)`:

| ma_dang_ky | ten | trang_thai |
|---|---|---|
| DK-01 | An | DANG_KY |
| DK-02 | Binh | DA_HUY |
| DK-03 | Chi | DANG_KY |
| DK-04 | Dung | DANG_KY |

Prompt: “Cho biết mã đăng ký và tên của các bạn còn đăng ký trực bàn.”

~~~sql
SELECT ma_dang_ky, ten FROM luyen_dang_ky WHERE trang_thai = 'DANG_KY';
~~~

3 hàng: DK-01/An, DK-03/Chi, DK-04/Dung.

### Side 2 — LIKE

`luyen_nhan(ma_nhan TEXT, ten_nhan TEXT)`:

| ma_nhan | ten_nhan |
|---|---|
| N-01 | but-chi |
| N-02 | but-long |
| N-03 | thuoc-ke |
| N-04 | but-da |

Prompt: “Tìm nhãn các hộp có mã bắt đầu bằng but.”

~~~sql
SELECT ma_nhan, ten_nhan FROM luyen_nhan WHERE ten_nhan LIKE 'but%';
~~~

3 hàng: N-01/but-chi, N-02/but-long, N-04/but-da.

### Side 3 — TRIM/LOWER/ORDER BY

`luyen_lich_truc(ma_ca TEXT, ma_ban TEXT, ngay TEXT)`:

| ma_ca | ma_ban | ngay |
|---|---|---|
| CA-04 | ban-doc | 2026-11-04 |
| CA-02 | BAN-DOC | 2026-11-02 |
| CA-01 | ban-doc  | 2026-11-01 |
| CA-03 |  BAN-DOC | 2026-11-03 |

Prompt: “Sắp các ca bàn đọc theo ngày.”

~~~sql
SELECT ma_ca, ngay FROM luyen_lich_truc
WHERE LOWER(TRIM(ma_ban)) = 'ban-doc'
ORDER BY ngay;
~~~

4 hàng theo CA-01, CA-02, CA-03, CA-04.

### Side 4 — JOIN

`luyen_mon(ma_mon TEXT, ten_mon TEXT)`:

| ma_mon | ten_mon |
|---|---|
| M-01 | Bánh mì |
| M-02 | Sữa đậu |
| M-03 | Xôi |

`luyen_don(ma_don TEXT, ma_mon TEXT, so_luong INTEGER, trang_thai TEXT)`:

| ma_don | ma_mon | so_luong | trang_thai |
|---|---|---:|---|
| D-01 | M-01 | 2 | DA_NHAN |
| D-02 | M-02 | 1 | DA_NHAN |
| D-03 | M-03 | 1 | DA_HUY |

Prompt: “Tên món trong hai đơn đã nhận.”

~~~sql
SELECT d.ma_don, m.ten_mon, d.so_luong
FROM luyen_don d JOIN luyen_mon m ON d.ma_mon = m.ma_mon
WHERE d.trang_thai = 'DA_NHAN';
~~~

2 hàng D-01/Bánh mì/2 và D-02/Sữa đậu/1.

### Side 5 — GROUP BY/HAVING

`luyen_kho(ma_hang TEXT, loai_vat_tu TEXT, so_luong INTEGER)`:

| ma_hang | loai_vat_tu | so_luong |
|---|---|---:|
| K-01 | GIAY | 2 |
| K-02 | GIAY | 3 |
| K-03 | MUC | 1 |
| K-04 | MUC | 1 |
| K-05 | BIA | 4 |
| K-06 | BIA | 4 |

Prompt: “Loại vật tư nào còn dưới 5 món theo tổng số trong kho?”

~~~sql
SELECT loai_vat_tu, SUM(so_luong) AS tong_so
FROM luyen_kho
GROUP BY loai_vat_tu
HAVING SUM(so_luong) < 5;
~~~

1 hàng MUC/2.

### Side 6 — WITH/CTE

`luyen_sach(ma_phieu TEXT, loai_sach TEXT, so_luong INTEGER, trang_thai TEXT)`:

| ma_phieu | loai_sach | so_luong | trang_thai |
|---|---|---:|---|
| S-01 | THAM_KHAO | 2 | DA_TRA |
| S-02 | THAM_KHAO | 1 | DA_TRA |
| S-03 | VAN_HOC | 4 | DA_TRA |
| S-04 | VAN_HOC | 2 | DANG_MUON |
| S-05 | TRUYEN_NGAN | 3 | DA_TRA |

Prompt: “Tổng số sách đã trả theo loại.”

~~~sql
WITH sach_da_tra AS (
  SELECT loai_sach, so_luong FROM luyen_sach WHERE trang_thai = 'DA_TRA'
)
SELECT loai_sach, SUM(so_luong) AS tong_so
FROM sach_da_tra
GROUP BY loai_sach
ORDER BY loai_sach;
~~~

3 hàng: THAM_KHAO/3, TRUYEN_NGAN/3, VAN_HOC/4.

## 7. Đặc tả mechanic “kéo phiếu thành điểm chứng cứ/CTE”

### Trải nghiệm người chơi

1. Bảng điều tra vẫn giữ các phiếu kết quả V2, V3, V4 như hiện tại.
2. Khi tới Vụ 5, hiện một vùng trống có nhãn “Hồ sơ hoạt động”. Người chơi kéo đúng ba phiếu vào vùng đó; mỗi phiếu tạo một thẻ con ở điểm này. Có thể kéo ra để hoàn tác.
3. Khi đủ nguồn, điểm chứng cứ hiện sơ đồ cột của relation tạm `ho_so_da_xac_minh` và một đường nối từ từng phiếu nguồn.
4. Ở trình SQL, chọn `ho_so_da_xac_minh` làm nguồn, rồi viết hoặc dựng CTE. CTE là một tên tạm cho tập con truy vấn, không phải bảng dữ liệu mới trên đĩa.
5. Chạy sai không phạt; xem kết quả và gợi ý. Chạy đúng lưu phiếu `ev-v5-report` với các sợi nối đến ba nguồn. Lưu/nạp game phải khôi phục chính xác các phiếu đã đặt.

### Giao kèo dữ liệu

- ID nguồn whitelist: `ev-v2-activities`, `ev-v3-mic`, `ev-v4-refund`. Không nhận card tự tạo, clue thường hay side quest.
- Một nguồn mỗi ID; đặt lại cùng card không nhân hàng. Thiếu card: không cho hoàn tất bước “nộp báo cáo”; nêu card còn thiếu.
- Relation chỉ được materialize từ các saved evidence result đúng challenge và dữ liệu cứng đã xác nhận; không chấp nhận sửa `rows` qua client state. V2 được tóm tắt thành một hàng `4_BUOI` chỉ nếu card có đúng bốn mã BUOI-02/04/06/08 theo đúng ngày/hoạt động; `so_ban_ghi=4` được tính từ bốn dòng hợp lệ. V3 ánh xạ hàng PX-17 đã nhận thành một finding; V4 ánh xạ kết quả nhóm PH-04 đã được so với biên nhận thành một finding. Mỗi mapping phải định nghĩa trong content, không suy từ nhãn card tự do. V2 được tóm tắt thành một hàng `4_BUOI` chỉ nếu card có đúng bốn mã BUOI-02/04/06/08 theo đúng ngày/hoạt động; `so_ban_ghi=4` được tính từ bốn dòng hợp lệ. V3 ánh xạ hàng PX-17 đã nhận thành một finding; V4 ánh xạ kết quả nhóm PH-04 đã được so với biên nhận thành một finding. Mỗi mapping phải định nghĩa trong content, không suy từ nhãn card tự do.
- Tên relation/cột cố định như mục 4; values bind như dữ liệu, identifiers lấy từ hằng whitelist.
- Relation tạm chỉ tồn tại trong CSDL truy vấn của Vụ 5; khi đủ nguồn có ba hàng whitelist cộng fixture hệ thống `BAN_NHAP`, tổng bốn hàng. `BAN_NHAP` không phải evidence, không hiển thị như card và không nối sợi nguồn; CSDL chạy read-only với query người chơi. Dựng relation trước khi bật query-only hoặc tạo DB sandbox riêng cho challenge.
- SQL chuẩn được chạy trên relation đầy đủ 4 dòng: ba evidence đã xác minh và một fixture hệ thống `BAN_NHAP`. Thiếu source card thì dòng evidence tương ứng không được materialize; query vẫn chạy trên phần relation hiện có nhưng không được lưu evidence pass. Khi đủ ba card, query chuẩn trả ba dòng sau WHERE.
- Thẻ result card side quest không có quyền thành nguồn.

### Giao kèo chấm

Challenge `v5-cte-bao-cao` chạy trên relation bốn dòng và yêu cầu đúng tập kết quả 3 dòng sau WHERE, các cột bắt buộc `ma_vu`, `chu_de`, `ma_ho_so`, `so_ban_ghi`. Cần thêm ChallengeSpec V2 để khai báo relation source và `orderMatters`; comparator hiện tại chỉ so multiset nên cần mở rộng để có chế độ so tuple theo thứ tự. Đề bài Vụ 5 yêu cầu sắp theo mã vụ/mã hồ sơ, vì thế chấm thứ tự dòng ở thử thách này và `v2-loc-buoi`/side 3. Thứ tự cột có thể không bắt buộc.

Lỗi cú pháp/column/table dùng phản hồi SQL hiện có. Chạy CTE hợp lệ trên relation chưa đủ nguồn thì trạng thái challenge không đạt, không trả lời như thể truy vấn sai.

## 8. Hợp đồng kỹ thuật cụ thể

### Nguồn tích hợp

Tích hợp vào runtime đang chạy: nguồn nội dung `prototype/noi-dung/`, pipeline `prototype/src/content/generated/`. Không nạp tài liệu này vào parser MVP của `prototype/noi-dung-mvp/`, vì thư mục MVP không được runtime hiện tại dùng. Hai tài liệu trong `docs/mvp/` là đặc tả nguồn để chuyển sang format đang hoạt động. Dùng case ID `vu1-select`, `vu1-case`, `vu2`-`vu4`, `vu5:<attemptId>` và challenge ID dưới đây trong một registry.

### Shape dữ liệu tối thiểu

~~~ts
interface CaseDataset {
  id: 'vu1-select' | 'vu1-case' | 'vu2' | 'vu3' | 'vu4' | `vu5:${string}` | `practice:${string}`;
  tables: Record<string, { columns: { name: string; type: 'TEXT' | 'INTEGER' }[]; rows: (string | number | null)[][] }>;
}
interface ChallengeSpecV2 {
  id: string;
  datasetId: CaseDataset['id'];
  referenceSql: string;
  requiredColumns: string[];
  allowExtraColumns: boolean;
  expectedRows: (string | number | null)[][];
  orderMatters: boolean;
  mode: 'builder' | 'sql'; // mode khởi chạy; V2+ và side là sql-only
  allowedTables: string[]; // FROM/JOIN whitelist của chính challenge này
  sourceRelationIds?: Array<'ho-so-hoat-dong'>;
}
~~~

`datasetId` chọn sandbox SQLite chỉ đọc riêng từng challenge. Registry ánh xạ dataset ID sang schema/data; runner nhận ID tường minh và đóng connection khi rời challenge. Trước khi chạy, tạo connection từ đúng `allowedTables` của spec (filtered sandbox); kiểm tra bảng ở FROM/JOIN bằng SQLite authorizer và từ chối truy cập bảng khác. Cấm PRAGMA, ATTACH, nhiều statement, và mọi lệnh ngoài SELECT/WITH SELECT. V1 SELECT lấy bảng từ fixture giáo khoa `vu1-select`; dữ liệu điều tra Vụ 1 ở `vu1-case`; V2-V4 dùng fixture đã khai báo tại tài liệu này; V5 tạo DB attempt mới từ relation nguồn hợp lệ; practice dùng ID `practice:side-01` đến `practice:side-06`, mỗi ID chỉ nạp đúng bảng của bài đó. Không challenge nào được nhìn thấy bảng ngoài `allowedTables`. Cache theo `datasetId + contentVersion + attemptId` (V5), không chỉ theo object identity.

Challenge IDs chính: `v1-select-columns`, `v1-loc-and`, `v2-loc-buoi`, `v3-noi-phieu`, `v4-nhom-hoan`, `v4-chi-tiet`, `v5-cte-bao-cao`; side IDs `side-01-danh-sach`, `side-02-ten`, `side-03-thu-tu`, `side-04-noi-bang`, `side-05-nhom`, `side-06-cte`. `v4-chi-tiet` là màn xem tiếp trong cùng hồ sơ, không thêm kỹ năng mới.

### Chấm và phản hồi chế độ SQL

- Chạy đúng một câu SELECT hoặc WITH…SELECT bằng SQLite read-only. Challenge chuẩn đối chiếu đúng cột bắt buộc và đúng các tuple đầu ra; tùy chọn cột thừa được cấu hình từng bài. Không dùng cấu trúc QueryModel cũ để chẩn đoán SQL có JOIN/GROUP/HAVING/ORDER/FUNCTION/CTE.
- Với `mode='sql'`, nếu SQLite chạy được nhưng kết quả chưa khớp: chỉ hiện số hàng và bảng kết quả, cộng một trong ba gợi ý viết riêng ở mục 11 của tài liệu kịch bản. Nếu parser cấu trúc không hiểu query, `diagnosticCode=null`; không được trả “sai bảng/thiếu WHERE” dựa trên phỏng đoán parser.
- `requiredColumns` cho bài SELECT là tên cột yêu cầu; chấm exact names + values ở `v1-select-columns` và `v1-loc-and` để SELECT * không qua. Các bài khác có thể giữ luật chiếu kết quả hiện tại nếu đề không yêu cầu tên cột.
- `orderMatters=true` cho `v2-loc-buoi`, `v5-cte-bao-cao`, `side-03-thu-tu`, `side-06-cte`; so sánh tuple theo đúng thứ tự dòng, không áp collation tự do. Thứ tự các bài này là toàn phần: ngày/mã cuối đều duy nhất, không có tie. Các bài còn lại so multiset không xét thứ tự.
- `expectedRows` là tuple đáp án khai báo tường minh trong nội dung/fixture và kiểm độc lập với `referenceSql`; validator chạy query chuẩn trên fixture rồi so kết quả với tuple literal. Chấm tên cột bằng `requiredColumns` (không chấp nhận alias thay tên cột bắt buộc); map tuple chuẩn theo tên cột nên cho phép đổi thứ tự cột. Cột ngoài required được phép nếu spec bật `allowExtraColumns`; bỏ qua chúng khi so dữ liệu. Không cho phép cột thiếu hoặc trùng tên. `orderMatters` chỉ áp thứ tự hàng. Không tự sinh đáp án chuẩn từ chính referenceSql. Dataset `vu1-select` là fixture giáo khoa riêng cho thao tác SELECT; không dùng làm nguồn clue hoặc chứng cứ điều tra canon.

### Manifest materialize evidence → relation

Manifest cố định của `ho_so_da_xac_minh`. API materializer nhận state kéo thả + saved query/evidence do host lưu; dựng fixture `vu5:<attemptId>` với bảng này. Challenge V5 khai `datasetId` của attempt hiện hành, `allowedTables: ["ho_so_da_xac_minh"]` và `sourceRelationIds: ["ho-so-hoat-dong"]`. Không nhận tên bảng hay rows từ client; API mới `gradeChallenge(spec, sql, model, { datasetId, attemptId })` chọn sandbox đã dựng, yêu cầu `datasetId === 'vu5:' + attemptId` khi `sourceRelationIds` có giá trị và từ chối mọi mismatch; non-V5 không nhận attemptId. Mỗi lần đổi nguồn evidence, tạo lại sandbox/attempt version, chạy lại query chuẩn rồi so với `expectedRows` literal và xóa kết quả đạt cũ; invariant `datasetId === 'vu5:' + attemptId` được kiểm cả lúc tạo relation lẫn lúc grade. Side evidence mang `kind="practice"`, được chuẩn hóa tương đương `caseEvidence=false`; saved SQL result luôn lưu `challengeId`, `datasetId`, `kind` để gate/manifest phân biệt.

| Source card | Challenge nguồn | Điều kiện xác minh server-side | Hàng tạo |
|---|---|---|---|
| `ev-v2-activities` | `v2-loc-buoi` | chạy lại query chuẩn; tập kết quả đúng bốn tuple BUOI-02/04/06/08, ngày/hoạt động khớp; actor xác nhận `v2-xac-nhan` | `V2, HOAT_DONG, 4_BUOI, 4, DA_XAC_NHAN` |
| `ev-v3-mic` | `v3-noi-phieu` | query chuẩn trả duy nhất MIC-02/PX-17/TU_THIET_BI_CHUNG/DA_NHAN; flags `vu3-hien-vat-da-doi-chieu` và `vu3-hoan-tat` | `V3, TAI_SAN, PX-17, 1, DA_XAC_NHAN` |
| `ev-v4-refund` | `v4-nhom-hoan` | query chuẩn trả PH-04/2/-120000; biên nhận đã mở; actor xác nhận `vu4-hoan-tat` sau lựa chọn phản biện hợp lệ | `V4, TAI_CHINH, PH-04, 1, DA_XAC_NHAN` |

Mapping không đọc nhãn hoặc giá trị card do client gửi. Nó đọc source card ID, challenge ID, answer state; chạy lại referenceSql trên database authoritative; so exact expected rows; sau đó tạo hàng bằng manifest whitelist. Mapping V2 gom bốn dòng thành một finding chỉ khi cả bốn tuple khớp. Mapping V3/V4 tạo finding tóm tắt theo hàng manifest ở trên.

### State kéo thả và save/load

Lưu trong state version mới. `kind` là discriminator thống nhất cho evidence; main card dùng `kind="case"`, side result dùng `kind="practice"`. `caseEvidence=false` được suy ra/chuẩn hóa thành `kind="practice"`; chỉ `kind="case"` được tham chiếu trong manifest main. Main result evidence còn mang challengeId/datasetId để grader có thể xác minh lại.

~~~ts
interface EvidenceRelationState {
  relationId: 'ho-so-hoat-dong';
  sourceEvidenceIds: ('ev-v2-activities' | 'ev-v3-mic' | 'ev-v4-refund')[];
}
~~~

State chỉ lưu IDs (unique, theo thứ tự thả); không lưu rows/schema hoặc status có thể sửa. Mỗi thay đổi drag/drop cập nhật IDs; kéo ra ngoài vùng thì bỏ ID tương ứng. Relation được render từ materializer và `savedQueries`, không persist dưới dạng board card thủ công. Khi load save game, dựng lại relation từ source IDs và challenge completion; nếu thiếu hoặc completion không còn hợp lệ, bỏ relation rỗng, giữ nguyên các card gốc và đưa người chơi về điểm V5 để kéo lại. Migration save cũ đặt `sourceEvidenceIds=[]`. Undo/redo (nếu engine có) thao tác trên danh sách IDs, không sửa database.

Side challenge dùng dataset IDs riêng theo từng bài và evidence `kind='practice'`; compiler từ chối nếu manifest tham chiếu chúng. Tuyến chính không được đọc `side-*-done` làm gate.

## 9. Bản đồ thay đổi engine cụ thể

Để triển khai toàn bộ pack:

1. **Content loader:** mở rộng parser nội dung đang chạy tại `prototype/noi-dung/` và pipeline `prototype/src/content/generated/`; chuyển đặc tả thành các case V1-V5, node hội thoại, gate, clue, challenge và side quest theo ID đã chốt ở mục 8. Không tạo parser/runtime song song cho thư mục MVP.
2. **Challenge/data:** đăng ký schema và dataset V2–V4; chọn challenge source theo vụ. Giữ V1 dataset riêng, không trộn bảng vụ.
3. **SQL mode:** mode trong spec là mode khởi chạy; V1 SELECT dùng builder trên fixture giáo khoa, V1 điều tra dùng builder trên fixture vụ án, V2-V5 và side challenges dùng SQL editor; advanced challenge khóa SQL mode. Lưu draft SQL theo challenge; Run gọi chung runner/grader dựa trên datasetId. Chỉ SELECT/WITH read-only; SQL editor hỗ trợ JOIN/GROUP/HAVING/ORDER/functions.
4. **Evidence relation:** triển khai manifest whitelist và `EvidenceRelationState` tại mục 8; materializer nhận source IDs, xác minh saved run theo fixture và flags, tạo bảng V5 cho attempt hiện tại. Save chỉ giữ IDs; rebuild relation khi load/đổi card.
5. **Quest gate:** đánh dấu sáu side task `kind=practice` (`caseEvidence=false` suy ra); validator chặn side task làm gate tuyến chính hoặc xuất hiện trong manifest nguồn.
6. **Validation:** chạy validator SQL/data, kiểm tra khóa JOIN, đồ thị gate, tính hợp lệ ID, manifest đủ nguồn, kiểm tra lưu/tải relation và thực hiện nhập thử nội dung vào pipeline hoạt động.

## 10. Tự kiểm thủ công đã thực hiện trên thiết kế

- Vụ 2: bốn dòng DA_XAC_NHAN sau LOWER/TRIM, kết luận giới hạn là bốn mục có trong sổ và chữ ký; dòng DU_KIEN và hai dòng P-KHO-CHUNG bị loại; thứ tự 02, 04, 06, 08.
- Vụ 3: join khóa mã thiết bị; MIC-02 có 2 phiếu nhưng chỉ PX-17 DA_NHAN; đầu ra đúng 1 dòng.
- Vụ 4: chỉ PH-04 có hơn một dòng HOAN; COUNT=2, SUM=-120000; tham chiếu NH-771 khớp một biên nhận -60000.
- Vụ 5: đủ ba nguồn tạo ba hàng; CTE lọc trạng thái đã xác minh và sort thành V2, V3, V4.
- Side 1–6: lần lượt 3, 3, 4, 2, 1, 3 hàng như đã khai. Tất cả dùng bảng luyện riêng.

Chạy `python tools/kiem-mua1.py` để xác nhận lại 13 query/sample output; sau khi chuyển nội dung sang định dạng parser runtime hoạt động, chạy `npm.cmd run kiem-noi-dung:mvp` để kiểm nội dung MVP hiện hữu; đây không phải validator của pack này cho đến khi pack được chuyển vào parser runtime hoạt động. Không thể đưa các đoạn ở companion trực tiếp vào parser: dataset và engine contract ở đây là tài liệu triển khai.
