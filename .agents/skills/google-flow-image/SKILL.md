---
name: google-flow-image
description: Generate image assets through Google Flow using a dedicated Chrome CDP session. Supports prompt parsing, sequential or batch generation, bounded retries, downloads, and output review. When the user explicitly requests Antigravity, Codex coordinates and reviews while Antigravity performs the CDP run.
---

# Google Flow CDP Image Generation Skill

## Coordinator and executor contract

- **Codex/coordinator:** creates or refines the prompt file, defines the ordered asset manifest and output directory, delegates a bounded run, visually inspects every downloaded image, and makes the final pass/fail decision.
- **Antigravity/executor:** when explicitly requested by the user, connects to the dedicated CDP session, generates assets sequentially, retries recoverable failures, downloads results to the authorized directory, and returns execution evidence.
- **User:** completes Google login, CAPTCHA, consent, account recovery, or quota/payment decisions when Google requires them.

Use Antigravity only when the user explicitly requests it. Before delegation, read and follow [references/antigravity-runbook.md](./references/antigravity-runbook.md).

### Existing Antigravity browser profile

When the user names an existing Antigravity browser profile, especially profile `19`, reuse that profile through Antigravity's native browser/CDP capability. Do not run `chrome.exe`, `cmd.exe /c chrome.exe`, the local Chrome launcher scripts, or any command that creates a new `--user-data-dir` or remote-debugging port. Do not probe why Chrome exited by relaunching it with logging flags.

If the named profile is closed or unavailable, return `BLOCKED_USER_ACTION` and ask the user to open that profile. One image-generation batch must reuse the same profile and Flow tab for every asset; starting each asset is not a new browser-launch task.

### Permission boundary

For an explicitly requested Google Flow run, Antigravity may operate the Google Flow tab in the named existing Antigravity browser profile, read the named prompt/reference files, run non-launching helper scripts under this skill when needed, create the named output/debug directories, and write generated images or screenshots there. It may overwrite only the current target asset during a retry.

Antigravity may not inspect unrelated tabs, read browser/account data, change account settings, solve authentication challenges, install software, delete unrelated files, modify application source, or write outside the declared output/debug paths. These permissions do not override Codex sandbox or approval requirements.

### Reference and retry rules

Local reference images are prompt-design inputs by default. Codex or Antigravity should extract their useful visual facts into text and must not upload them to Flow unless the user explicitly asks for image attachment. Prefer prompt-only batches without `[ref]` tags. If the user explicitly requests an uploaded reference, `[ref: anchor-id]` becomes a real dependency and the executor must visibly confirm the attachment before generation.

Run sequentially in manifest order. Allow the initial attempt plus at most two retries per asset. Continue with independent assets after an exhausted failure and skip assets whose required anchor failed. Stop for login/CAPTCHA, consent, account recovery, quota/payment, account warnings, repeated DOM incompatibility, or navigation outside the authorized Flow tab.

Recommended batch command:

```powershell
node .agents/skills/google-flow-image/scripts/cdp-flow.mjs batch --file <prompts.md> --outDir <authorized-output-dir> --retries 2 --timeout 180000
```

Antigravity reports execution success; Codex performs final creative acceptance. A run passes only when every requested ID has a decodable image with valid dimensions, required references were actually attached, outputs stayed inside authorized paths, and visual review passes the prompt constraints.

Skill này cung cấp quy trình và công cụ tự động hóa việc tạo ảnh đồ họa/cảnh nền game thông qua điều khiển trình duyệt **Google Chrome** kết nối với **Google Flow** (`https://labs.google/fx/tools/flow`) qua **Chrome DevTools Protocol (CDP)** trên cổng `9222`.

---

## 1. Khi nào sử dụng Skill này?

Kích hoạt skill này khi:
* Người dùng yêu cầu tạo ảnh/cảnh nền bằng Google Flow hoặc Google Labs.
* Người dùng gõ lệnh slash command: `/google-flow-image` (hoặc `/flow-generate`).
* Cần chạy tự động danh sách prompt trong tệp markdown (ví dụ: `prompts-background-prototype-v0.1.md`) có các khối thẻ `[id: ...]`, `[type: image]`, `[ref: ...]`.
* Cần kiểm tra trạng thái trình duyệt CDP hoặc chụp ảnh màn hình kiểm thử Google Flow.

---

## 2. Cấu trúc Tài nguyên của Skill

* **Script điều khiển CDP cốt lõi:** [scripts/cdp-flow.mjs](./scripts/cdp-flow.mjs) (Node.js ESM không phụ thuộc thư viện ngoài, dùng native WebSocket + fetch).
* **Script khởi động Chrome CDP:**
  * PowerShell: [scripts/launch-chrome-cdp.ps1](./scripts/launch-chrome-cdp.ps1)
  * Batch/CMD: [scripts/launch-chrome-cdp.bat](./scripts/launch-chrome-cdp.bat)
* **Tài liệu tham khảo cú pháp Prompt:** [references/google-flow-schema.md](./references/google-flow-schema.md)
* **Tài liệu thiết lập & khắc phục sự cố:** [references/cdp-guide.md](./references/cdp-guide.md)

---

## 3. Quy trình Thực thi Chuẩn (Step-by-Step Runbook)

Khi người dùng yêu cầu tạo ảnh, Agent thực hiện theo 4 bước sau:

### Bước 1: Kiểm tra kết nối Chrome CDP
Kiểm tra xem Chrome đã được bật ở cổng 9222 và có tab Google Flow hay chưa:
```bash
node .agents/skills/google-flow-image/scripts/cdp-flow.mjs status
```

* **Nếu Chrome chưa bật:** Hướng dẫn người dùng hoặc chạy lệnh mở Chrome:
  ```powershell
  & .agents/skills/google-flow-image/scripts/launch-chrome-cdp.ps1
  ```
  Hoặc chạy shortcut desktop: `D:\Users\tuanla2\Desktop\Mo-Google-Flow-CDP.bat`.

* **Đồng bộ / Clone phiên đăng nhập từ Chrome chính:**
  Khi người dùng vừa đăng nhập hoặc muốn refresh toàn bộ Cookies, Local Storage, Avatar từ Profile chính (`Profile 1: Tuấn - nocodeapp.solution@gmail.com`):
  ```bash
  node .agents/skills/google-flow-image/scripts/cdp-flow.mjs sync
  ```
  *(Lưu ý: Đóng cửa sổ Chrome trước khi chạy lệnh để Windows giải phóng file-lock của SQLite Cookies, giúp sao chép trọn vẹn 100%).*

* **Nếu Chrome đã bật nhưng chưa mở Flow:**
  ```bash
  node .agents/skills/google-flow-image/scripts/cdp-flow.mjs open
  ```

---

### Bước 2: Phân tích tệp Prompt
Đọc và trích xuất danh sách các prompt có trong tệp:
```bash
node .agents/skills/google-flow-image/scripts/cdp-flow.mjs parse --file prompts-background-prototype-v0.1.md
```

---

### Bước 3: Thực hiện Tạo ảnh

#### Lựa chọn A: Tạo đơn lẻ theo ID
Tạo ảnh neo phong cách trước, hoặc một cảnh nền cụ thể:
```bash
node .agents/skills/google-flow-image/scripts/cdp-flow.mjs generate \
  --file prompts-background-prototype-v0.1.md \
  --id hoa-phuong-environment-style-anchor \
  --out ./prototype/src/assets/images/hoa-phuong-environment-style-anchor.png
```

#### Lựa chọn B: Tạo hàng loạt (Batch Generation)
Tạo toàn bộ các cảnh trong file theo thứ tự:
```bash
node .agents/skills/google-flow-image/scripts/cdp-flow.mjs batch \
  --file prompts-background-prototype-v0.1.md \
  --outDir ./prototype/src/assets/images/
```

---

### Bước 4: Kiểm tra Kết quả & Chẩn đoán
* Xác minh file ảnh đã được tải về đĩa đúng kích thước/độ phân giải (ví dụ: 2560×1440).
* Nếu gặp lỗi hoặc nghi ngờ giao diện bị kẹt:
  ```bash
  node .agents/skills/google-flow-image/scripts/cdp-flow.mjs screenshot --out debug-flow.png
  ```
  Sử dụng tool xem ảnh để kiểm tra trạng thái màn hình Google Flow.
