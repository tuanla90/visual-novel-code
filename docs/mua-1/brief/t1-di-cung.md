# Brief T1: nút "đi cùng" và ngày thật cho ngày theo truyện (công cụ)

**Nhịp:** ba việc nhỏ, làm xong việc nào chạy test việc ấy. Hết sức thì dừng, ghi còn việc nào.

**Phản biện:** brief viết từ bên ngoài. Đọc `prototype/tools/noi-dung/doc-mvp.ts`, `luat-mvp.ts`, `chuyen-mvp.ts`, `prototype/tools/noi-dung/kiem-ky-nang.ts` (phần "đứng nguyên chỗ"), `prototype/tools/truyen-chu.ts`, `prototype/src/mvp/engine/lich-ngay.ts` trước khi sửa. Thấy có cách đơn giản hơn thì làm theo và ghi lý do.

## Vì sao

Luật user (A3 mục 14 trong `docs/mua-1/giao-viec.md`): người chơi chỉ đổi nơi khi **tự bấm**: mở bản đồ, hoặc bấm một lựa chọn kiểu "Đi cùng Tùng ra tòa B".

Hiện chỉ có `[RẼ NHÁNH]`, và nó cần nhiều lựa chọn. Lượt B4.3 vừa rồi đã lách bằng cách tạo `[RẼ NHÁNH]` hai lựa chọn giả cùng dẫn về một chuỗi ("Xuống xe" / "(Tiếp tục)"). Lượt ấy bị trả lại. Cần một cú pháp đúng nghĩa: **một nút người chơi bấm để đi**.

## Việc

1. **Cú pháp mới `- [ĐI CÙNG <chuỗi>] <nhãn nút>`** (trong `kich-ban/`). Ví dụ: `- [ĐI CÙNG n1-toa-b] Đi cùng Tùng ra tòa B`.
   - **Bộ đọc:** nhận dòng này. Nhãn bắt buộc, không rỗng.
   - **Bộ kiểm:**
     - chuỗi đích phải có;
     - dòng này là dòng cuối của chuỗi (sau nó không còn nút nào);
     - với luật "đứng nguyên chỗ" trong `kiem-ky-nang.ts`, `[ĐI CÙNG]` là đổi nơi **hợp lệ**;
     - tính đường tới được (vật phẩm bắt buộc, chuỗi lẻ) như `[ĐI TỚI]`.
   - **Bộ sinh:** chuyển thành nút mà máy chơi hiện có chạy được. Nếu chưa muốn đụng máy chơi thì sinh như một `[RẼ NHÁNH]` một lựa chọn, hoặc như `[ĐI TỚI]` kèm nhãn. Game ở bộ MVP không được đổi gì.
   - **Truyện chữ:** in đúng một lựa chọn mang nhãn ấy.
   - **Ghi cú pháp** vào `prototype/noi-dung-mua-1/README.md` và `docs/dac-ta-dinh-dang-noi-dung.md` mục 19.
2. **Chặn lựa chọn giả.** Bộ kiểm báo lỗi khi một `[RẼ NHÁNH]` có mọi lựa chọn cùng dẫn về một chuỗi, hoặc có lựa chọn với chữ "(Tiếp tục)" hay "(tạm)" làm nhãn. Chỉ áp cho bộ mùa 1 nếu áp cho MVP làm MVP đỏ; ghi rõ đã áp ở đâu.
3. **Ngày thật cho ngày theo truyện.**
   - Vụ 1 dùng `{ngày: n · theo truyện}`, ngày thật tính từ `Ngày mở đầu` theo `src/mvp/engine/lich-ngay.ts`: ngày 1–5 = 24–28/09/2024.
   - Truyện chữ in dòng đầu ngày bằng ngày thật, ví dụ "Thứ Ba, 24/09/2024".
   - Vụ có `Hạn chót` (Vụ 1 đã có `Hạn chót: 2024-09-30`, `Việc chốt: Buổi họp rà soát`) thì thêm "· Còn N ngày tới Buổi họp rà soát".
   - Nếu `lich-ngay.ts` ở `src/` mà công cụ không nên import, thì chép phép tính hoặc tách hàm dùng chung. Không đổi kết quả cho MVP.

## Test (`src/content/real/testing/mua1-t0.test.ts` hoặc tệp test mới cạnh công cụ)

- `[ĐI CÙNG]`:
  - đọc đúng;
  - thiếu nhãn thì lỗi;
  - chuỗi đích không có thì lỗi;
  - có nút sau nó thì lỗi;
  - không bị tính là lỗi "đứng nguyên chỗ";
  - truyện chữ in một lựa chọn.
- `[RẼ NHÁNH]` mọi lựa chọn cùng đích thì lỗi.
- Truyện chữ `vu1.md` xuất thật có "Thứ Ba, 24/09/2024" và "Còn 6 ngày tới Buổi họp rà soát" ở ngày 1 (tự tính lại số ngày cho đúng).

## Kiểm

Chạy trong `prototype/`, từng lệnh ở chế độ thường, đọc kết quả thật:

```
npm run typecheck
npx eslint <các tệp .ts đã sửa>
npx vitest run src/content/real/testing/mua1-t0.test.ts
npm run noi-dung:sinh:mua1
npm run noi-dung:sinh:mvp
npm run kiem-noi-dung:mua1
npm run kiem-noi-dung:mvp
npm run kiem-ky-nang:mua1
npm run truyen-chu:mua1
```

## Luật chung

- Không commit, không push, không `npm install`, không chạy `npm test` toàn bộ.
- Không sửa `prototype/noi-dung-mvp/`, `src/content/generated/mvp/`, `prototype/.vite-canary/`, `prototype/noi-dung-mua-1/kich-ban/`.
- Không để tệp nháp.
- Báo cáo ở `docs/mua-1/bao-cao/t1.md`: tệp đổi, dòng cuối từng lệnh, cách bộ sinh chuyển `[ĐI CÙNG]`.

Xong thì dừng.
