# Brief B4.3 (làm lại): Vụ 1 đứng nguyên chỗ, dùng `[ĐI CÙNG]`

Lần trước (B4.3) bị trả lại. Lý do: đổi `[ĐI TỚI]` thành `[RẼ NHÁNH]` hai lựa chọn giả cùng một đích ("Xuống xe" / "(Tiếp tục)") để lách máy kiểm. Phần lịch đã đạt và đã vào `main`: `Hạn chót`, `Việc chốt`, `bắt đầu ở`. Giờ đã có cú pháp `- [ĐI CÙNG <chuỗi>] <nhãn>`: một nút người chơi tự bấm để đi. Xem `prototype/noi-dung-mua-1/README.md` và `docs/dac-ta-dinh-dang-noi-dung.md` mục 19.

**Nhịp:** làm theo từng tệp `kich-ban/00` → `06`. Xong tệp nào chạy `kiem-ky-nang:mua1` xem lỗi của tệp ấy hết chưa. Hết sức thì dừng, ghi còn tệp nào.

**Phản biện:** brief viết từ bên ngoài. Kiểm từng khẳng định bằng nội dung thật. Không đi ngược A3 mục 14 trong `docs/mua-1/giao-viec.md`.

## Luật chọn cách thay một `[ĐI TỚI]` đổi nơi

1. **Người chơi đi cùng ai hoặc tự đi sang nơi khác** (ví dụ "Tùng rủ ra tòa B", "về phòng CLB", "xuống xe"):
   - dùng `- [ĐI CÙNG <chuỗi>] <nhãn>`;
   - nhãn là việc người chơi làm, ngắn, có nghĩa: "Đi cùng Tùng ra tòa B", "Xuống xe", "Lên phòng 408";
   - **cấm** nhãn "(Tiếp tục)", "(tạm)", "Đi tiếp".
2. **Chuyển cảnh kể chuyện** (hồi tưởng, ảnh CG ở chỗ khác, "một tuần sau…"): đánh dấu chuỗi đích `· cảnh cắt`. Khi chuỗi cảnh cắt hết, người chơi về lại nơi cũ. Nếu truyện cần người chơi ở nơi mới sau cảnh cắt thì cảnh cắt không hợp; dùng cách 1 hoặc 3.
3. **Sang ngày mới:** không cần `[ĐI TỚI]`. Ngày mới bắt đầu ở nơi khai `bắt đầu ở` trong `lich.md`. Chuỗi cuối ngày kết thúc (hết nút) sau `[XONG VIỆC CHÍNH]`.
4. **`[RẼ NHÁNH]` thật** (hai lựa chọn khác nhau, dẫn hai nơi khác nhau) thì giữ nguyên.

## Việc

- Sửa hết lỗi "đứng nguyên chỗ" ở `kich-ban/00`…`06` (đếm lại bằng `npm run kiem-ky-nang:mua1`).
- Mỗi ngày 1–5 có đúng một `[XONG VIỆC CHÍNH]`, đặt sau việc chính của ngày: thường là sau màn tra hoặc sau khi có manh mối chính.
- **Không đổi câu đố.** Không đổi lời thoại, trừ nhãn nút và câu nối thật cần. Lời mới đánh dấu `(tạm)`.
- Biểu cảm chỉ dùng loại có trong `nhan-vat.md`.

## Kiểm

Chạy trong `prototype/`, từng lệnh ở chế độ thường:

```
npm run noi-dung:sinh:mua1
npm run kiem-noi-dung:mua1
npm run kiem-ky-nang:mua1
npm run kiem-giong:mua1 -- --chi-loi
npm run truyen-chu:mua1
npx vitest run src/content/real/testing/mua1-t0.test.ts
npm run kiem-noi-dung:mvp
```

## Nghiệm thu

- [ ] `kiem-noi-dung:mua1` không lỗi. Không còn `[RẼ NHÁNH]` nào có mọi lựa chọn cùng đích, và không nhãn nào là "(Tiếp tục)" hay "(tạm)" (bộ kiểm T1 bắt).
- [ ] `kiem-ky-nang:mua1`: không còn lỗi "đứng nguyên chỗ" nào ở `kich-ban/00`…`06`. Lỗi kỹ năng Vụ 1 vẫn 0.
- [ ] `docs/mua-1/truyen-chu/vu1.md`:
  - không còn "⚠ (bản cũ: tự chuyển nơi)";
  - năm ngày đều có dòng đầu ngày kèm "Còn N ngày" và "Hết ngày.";
  - các nút đi in đúng nhãn.
- [ ] `kiem-giong:mua1` 0 lỗi. `git diff --stat -- prototype/noi-dung-mvp prototype/src/content/generated/mvp` rỗng.

## Báo cáo

Ghi `docs/mua-1/bao-cao/b4-3.md` (ghi đè), gồm:
- bảng mỗi chỗ `[ĐI TỚI]` cũ: chuỗi, đổi thành gì (đi cùng, cảnh cắt hay sang ngày), nhãn nút;
- vị trí `[XONG VIỆC CHÍNH]` từng ngày;
- dòng cuối của từng lệnh kiểm;
- chỗ nào thấy brief sai.

Không commit, không push, không `npm install`, không chạy `npm test` toàn bộ, không sửa `tools/`, `src/`. Không để tệp nháp. Xong thì dừng.
