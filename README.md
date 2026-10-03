# CLB Thám Tử Dữ Liệu

Game học SQL kể chuyện (lối chơi điều tra – giải trình kiểu Ace Attorney) cho sinh viên năm nhất khối kinh tế.
Là dòng game đầu tiên của **Vũ trụ Chấn Hưng**. Hiện đang ở giai đoạn prototype (vòng thử nghiệm 1) và chuẩn
bị bản MVP (QĐ-077).

## Bản đồ repo

```
.
├── README.md                     ← tệp này: bản đồ repo, thứ tự đọc
├── docs/                         tài liệu sản phẩm (không có code)
│   ├── lich-su-quyet-dinh.md     sổ quyết định QĐ-xxx — "luật" ràng buộc mọi agent
│   ├── dac-ta-dinh-dang-noi-dung.md   đặc tả định dạng nội dung (QĐ-075): kịch bản MD + YAML, biến SQL
│   ├── ke-hoach-goi-chuan-hoa.md      kế hoạch bước 1 của QĐ-075 (chuẩn hóa nội dung, chưa giao)
│   ├── thiet-ke/                 thiết kế dài hạn của cả game
│   │   ├── vu-tru-chan-hung-tong-quan.md   vũ trụ chung: tầm nhìn, nhân vật, dòng thời gian
│   │   ├── clb-tham-tu-du-lieu-GDD-v0.5.md  tài liệu thiết kế game (GDD)
│   │   ├── vu1-buoi-giai-trinh-kich-ban.md  kịch bản buổi giải trình Vụ 1 (bản đầy đủ)
│   │   └── tham-khao-game-trinh-tham-v0.1.md  tư liệu: bài học từ Danganronpa, Adventure Escape… cho dữ kiện và nhịp
│   ├── session-trao-doi-2026-09-28.md  bản ghi buổi brainstorm hướng MVP (tư liệu)
│   ├── mvp/                      tầm nhìn MVP
│   │   ├── kich-ban-vu1-mvp-khung.md       kịch bản khung: mở đầu tuần 1 + Vụ 1 (QĐ-087)
│   │   └── kiem-du-lieu-vu1.py             dữ liệu minh họa Vụ 1 + lệnh kiểm số dòng
│   ├── prototype/                prototype tinh gọn (vòng thử nghiệm 1)
│   │   ├── prototype-scope-down-v0.1.md     phạm vi prototype + kế hoạch thử nghiệm (§9)
│   │   ├── kich-ban-prototype.md            trang trỏ sang prototype/noi-dung/ (nguồn kịch bản đã tách, gói 12a-1)
│   │   └── kich-ban-de-xuat-full.md         đề xuất viết lại lời thoại (chưa duyệt)
│   └── mockups/                  bản dựng HTML tĩnh để duyệt giao diện trước khi code
│       ├── ban-lam-viec-thu-thach.html (+ .js, ảnh bán thân)   màn thử thách mới (QĐ-071 → QĐ-074)
│       └── sql-table-draft.html            nháp bảng dữ liệu SQL
├── art/                          nguồn ảnh (không được game nạp trực tiếp)
│   ├── README.md                 trạng thái từng bộ prompt, quy trình ảnh
│   ├── prompts/                  các bộ prompt sinh ảnh (Google Flow, Topview)
│   └── nguon/                    ảnh gốc chưa xử lý, để dành cho lớp vật bấm được
├── tools/doc-viewer/             dựng tài liệu thành trang HTML để đọc và rà soát (xem README trong đó)
├── prototype/                    code game (Vite + React + TypeScript + sql.js)
│   ├── README.md                 cách chạy, hướng dẫn người quan sát, quyền riêng tư
│   ├── noi-dung/                 NGUỒN kịch bản (Markdown, QĐ-075): kich-ban/, thu-thach/, ho-so/, chung/ (có test so khớp)
│   ├── tools/noi-dung/           bộ đọc kịch bản + lệnh `npm run kiem-noi-dung`
│   ├── docs/ARCHITECTURE.md      kiến trúc code
│   ├── docs/nhat-ky-thay-doi-2026-09-27.md  nhật ký gói Visual Novel (commit fa5ffd3)
│   └── src/                      mã nguồn; ảnh game nằm trong src/assets/
└── .agents/                      cấu hình và skill cho agent Antigravity (google-flow-image)
```

## Đọc theo thứ tự nào

1. `docs/thiet-ke/vu-tru-chan-hung-tong-quan.md` → `docs/thiet-ke/clb-tham-tu-du-lieu-GDD-v0.5.md`: game muốn trở thành gì.
2. `docs/mvp/kich-ban-vu1-mvp-khung.md`: bản MVP sẽ chơi ra sao (mở đầu + Vụ 1).
3. `docs/prototype/prototype-scope-down-v0.1.md`: prototype cắt gọn ra sao, đo cái gì.
4. `docs/lich-su-quyet-dinh.md`: các quyết định đã chốt; mục mới nhất ở cuối tệp.
5. `prototype/noi-dung/` (đọc `README.md` trong đó trước): nội dung đang chạy trong game, viết bằng Markdown; `npm run kiem-noi-dung` để kiểm.
6. `prototype/README.md` và `prototype/docs/ARCHITECTURE.md`: chạy và sửa code.

**Thứ tự ưu tiên tài liệu** (QĐ-084): tổng quan vũ trụ → GDD → tầm nhìn MVP → tầm nhìn prototype. Khi các tài liệu mâu thuẫn, đưa người quyết định (user) chốt, không tự phân xử.

## Quy ước

- Tên tệp và thư mục viết tiếng Việt không dấu, nối bằng gạch ngang; tài liệu có phiên bản thì ghi `-vX.Y` ở cuối.
- Tài liệu sản phẩm ở `docs/`, nguồn ảnh ở `art/`, code và tài liệu kỹ thuật của code ở `prototype/`.
  Ảnh game dùng thật đặt trong `prototype/src/assets/` (xem `prototype/src/assets/art/README.md`).
- Tham chiếu giữa các tài liệu dùng đường dẫn tương đối, không dùng đường dẫn tuyệt đối trên máy.
