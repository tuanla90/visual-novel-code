# Hướng dẫn Thiết lập và Điều khiển Chrome qua CDP (Port 9222)

Chrome DevTools Protocol (CDP) cho phép điều khiển trình duyệt Google Chrome từ xa thông qua WebSocket và HTTP API.

---

## 1. Khởi động Chrome hỗ trợ CDP

Để AI Agent hoặc script Node.js kết nối được vào Chrome, trình duyệt phải được khởi động với cờ `--remote-debugging-port=9222`.

### Cách 1: Sử dụng PowerShell script (Khuyến nghị)
```powershell
& .agents/skills/google-flow-image/scripts/launch-chrome-cdp.ps1
```

### Cách 2: Sử dụng Batch script (CMD)
```cmd
.agents\skills\google-flow-image\scripts\launch-chrome-cdp.bat
```

### Cách 3: Chạy lệnh trực tiếp từ Terminal
```cmd
"C:\Program Files\Google\Chrome\Application\chrome.exe" --remote-debugging-port=9222 --user-data-dir="%USERPROFILE%\.chrome-cdp-profile" "https://labs.google/fx/tools/flow"
```

> **Lưu ý quan trọng về User Data Profile:**
> Sử dụng thư mục profile riêng biệt (`--user-data-dir="%USERPROFILE%\.chrome-cdp-profile"`) giúp bạn:
> - Có thể mở song song Chrome CDP cùng lúc với các cửa sổ Chrome làm việc bình thường mà không bị xung đột tiến trình.
> - Lưu lại phiên đăng nhập tài khoản Google (chỉ cần đăng nhập 1 lần đầu tiên trên trình duyệt này).

---

## 2. Kiểm tra Kết nối CDP

Sau khi Chrome đã bật, kiểm tra trạng thái kết nối bằng:

```bash
node .agents/skills/google-flow-image/scripts/cdp-flow.mjs status
```

Nếu thành công, kết quả sẽ hiển thị:
```text
✓ Chrome is online!
  Browser: Chrome/13x...
  Protocol: 1.3
✓ Found Google Flow tab:
  Title: Flow - Google Labs
  URL:   https://labs.google/fx/tools/flow
```

---

## 3. Các sự cố thường gặp (Troubleshooting)

| Vấn đề | Nguyên nhân | Cách khắc phục |
|---|---|---|
| `Cannot connect to Chrome on http://127.0.0.1:9222` | Chrome chưa bật cờ `--remote-debugging-port=9222` hoặc chưa khởi động. | Chạy script `launch-chrome-cdp.ps1` hoặc tắt hết các tiến trình Chrome cũ trước khi mở lại. |
| `Generation timed out` | Mô hình đang tạo ảnh quá lâu, hoặc tài khoản gặp CAPTCHA/yêu cầu xác thực. | Mở cửa sổ Chrome lên kiểm tra xem có thông báo Captcha hoặc hết lượt sử dụng (quota) không. Tăng cờ `--timeout 180000` nếu mạng chậm. |
| Không tìm thấy ô nhập prompt | Giao diện Google Flow vừa cập nhật DOM selector hoặc đang ở trang chờ. | Chạy `node cdp-flow.mjs screenshot --out debug.png` để chụp ảnh màn hình hiện tại của tab Flow và xác định trạng thái UI. |
