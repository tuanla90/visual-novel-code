# CLB Thám Tử Dữ Liệu

Game học SQL kể chuyện (lối chơi điều tra – giải trình kiểu Ace Attorney) cho sinh viên năm nhất khối kinh tế.
Là dòng game đầu tiên của **Vũ trụ Hoa Phượng**. Hiện đang ở giai đoạn prototype (vòng thử nghiệm 1) và chuẩn
bị bản MVP (QĐ-077).

## Bản đồ repo

```
.
├── README.md                     ← tệp này: bản đồ repo, thứ tự đọc
├── docs/                         tài liệu sản phẩm (không có code)
│   ├── lich-su-quyet-dinh.md     sổ quyết định QĐ-xxx — "luật" ràng buộc mọi agent
│   ├── dac-ta-dinh-dang-noi-dung.md   đặc tả định dạng nội dung (QĐ-075): kịch bản MD + YAML, biến SQL
│   ├── thiet-ke/                 thiết kế dài hạn của cả game
│   │   ├── vu-tru-hoa-phuong-tong-quan.md   vũ trụ chung: tầm nhìn, nhân vật, dòng thời gian
│   │   ├── clb-tham-tu-du-lieu-GDD-v0.5.md  tài liệu thiết kế game (GDD)
│   │   └── vu1-buoi-giai-trinh-kich-ban.md  kịch bản buổi giải trình Vụ 1 (bản đầy đủ)
│   ├── prototype/                prototype tinh gọn (vòng thử nghiệm 1)
│   │   ├── prototype-scope-down-v0.1.md     phạm vi prototype + kế hoạch thử nghiệm (§9)
│   │   ├── kich-ban-prototype.md            kịch bản chơi được — NGUỒN của src/content/real (có test so khớp)
│   │   └── kich-ban-de-xuat-full.md         đề xuất viết lại lời thoại (chưa duyệt)
│   └── mockups/                  bản dựng HTML tĩnh để duyệt giao diện trước khi code
│       ├── ban-lam-viec-thu-thach.html (+ .js, ảnh bán thân)   màn thử thách mới (QĐ-071 → QĐ-074)
│       └── sql-table-draft.html            nháp bảng dữ liệu SQL
├── art/                          nguồn ảnh (không được game nạp trực tiếp)
│   ├── README.md                 trạng thái từng bộ prompt, quy trình ảnh
│   ├── prompts/                  các bộ prompt sinh ảnh (Google Flow, Topview)
│   └── nguon/                    ảnh gốc chưa xử lý, để dành cho lớp vật bấm được
├── prototype/                    code game (Vite + React + TypeScript + sql.js)
│   ├── README.md                 cách chạy, hướng dẫn người quan sát, quyền riêng tư
│   ├── docs/ARCHITECTURE.md      kiến trúc code
│   ├── docs/nhat-ky-thay-doi-2026-09-27.md  nhật ký gói Visual Novel (commit fa5ffd3)
│   └── src/                      mã nguồn; ảnh game nằm trong src/assets/
└── .agents/                      cấu hình và skill cho agent Antigravity (google-flow-image)
```

## Đọc theo thứ tự nào

1. `docs/thiet-ke/vu-tru-hoa-phuong-tong-quan.md` → `docs/thiet-ke/clb-tham-tu-du-lieu-GDD-v0.5.md`: game muốn trở thành gì.
2. `docs/prototype/prototype-scope-down-v0.1.md`: prototype cắt gọn ra sao, đo cái gì.
3. `docs/lich-su-quyet-dinh.md`: các quyết định đã chốt; mục mới nhất ở cuối tệp.
4. `docs/prototype/kich-ban-prototype.md`: nội dung đang chạy trong game.
5. `prototype/README.md` và `prototype/docs/ARCHITECTURE.md`: chạy và sửa code.

**Khi tài liệu mâu thuẫn** (theo `docs/lich-su-quyet-dinh.md`): phạm vi prototype > sổ quyết định > kịch bản
Vụ 1 > GDD > tổng quan vũ trụ.

## Quy ước

- Tên tệp và thư mục viết tiếng Việt không dấu, nối bằng gạch ngang; tài liệu có phiên bản thì ghi `-vX.Y` ở cuối.
- Tài liệu sản phẩm ở `docs/`, nguồn ảnh ở `art/`, code và tài liệu kỹ thuật của code ở `prototype/`.
  Ảnh game dùng thật đặt trong `prototype/src/assets/` (xem `prototype/src/assets/art/README.md`).
- Tham chiếu giữa các tài liệu dùng đường dẫn tương đối, không dùng đường dẫn tuyệt đối trên máy.
