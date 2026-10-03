# Giọng nhân vật — luật viết lời và máy kiểm

Học từ cách OOC xếp tầng prompt: **luật văn phong → thẻ nhân vật → sổ từ khóa**. Ở đây tầng chữ cho người / AI đọc là
`docs/mvp/v2-thoai/brief-chung.md` (tính cách, giọng, xưng hô, luật viết). Thư mục này giữ phần **máy kiểm được** của brief ấy,
để mỗi lần sửa lời không phải nhắc lại cùng một luật.

| Tệp | Chứa gì |
|---|---|
| `luat-giong.md` | Thứ tự truyện, xưng hô theo nhân vật (có mốc "từ / trước" tệp nào), cách gọi khóa trên, cụm dành riêng, câu khóa (câu gài không được mất), tên đã bỏ, mẫu cấm trong lời nhắc, độ dài bong bóng |

Bộ đọc nội dung game bỏ qua thư mục này.

## Chạy

Trong `prototype/`:

```
npm run kiem-giong                       # kiểm loi/
npm run kiem-giong -- --chi-loi          # chỉ hiện lỗi
npm run kiem-giong -- --so <thư mục v2>  # kiểm bản v2 do AI viết và so với loi/
```

- **LỖI** (mã thoát 1): sai xưng hô, gọi trống tên khóa trên, mất câu khóa, tên đã bỏ, lời nhắc lộ đáp án; ở chế độ `--so`: mã đoạn
  đổi, điều kiện `- Khi …` đổi.
- **nhắc**: cụm dành riêng bị người khác dùng, bong bóng quá dài, câu lặp nguyên văn ở hai đoạn; ở chế độ `--so`: **mất dữ kiện**
  (số, giờ, ngày, mã, nguyên văn trong ngoặc kép, biến `{{…}}` có ở bản gốc mà bản v2 không còn), **người nói mới** chen vào đoạn.
- Lời trong ngoặc kép (nhại lời người khác) và ngôi thứ ba ("cậu ấy", "anh ấy") không tính là xưng hô.
- Biểu cảm sai, người nói chưa tới lượt xuất hiện: đã có ở `npm run kiem-noi-dung:mvp`.

## Quy trình cho AI viết lời (rút ra khi duyệt v2 Vụ 1, 03/10/2026)

1. Gửi AI `brief-chung.md` + brief của vụ + các tệp `loi/` cần viết. Bắt AI ghi ra **thư mục v2 riêng**, không sửa tệp gốc.
2. `npm run kiem-giong -- --so <thư mục v2>`. Mọi LỖI và mọi dòng "mất dữ kiện" là chỗ phải giữ bản cũ hoặc vá.
3. Người duyệt nhặt từng đoạn cũ ↔ mới (máy không chấm được gu: lời có hay không, có lệch ảnh không, có thừa không).
4. Mỗi lần phải sửa tay cùng một kiểu lỗi lần thứ hai, thêm một dòng luật vào `luat-giong.md`. Luật mới thì thêm cả ví dụ
   vào `src/content/real/kiem-giong.test.ts` nếu là kiểu luật mới.

AI hợp **gọt câu** hơn **viết cảnh mới** (cảnh mới do Gemini viết lệch tính cách nặng). Cảnh mới: người viết dựng khung nhịp
và câu mang manh mối trước, AI chỉ gọt.

## Quyết định 03/10/2026

- Hoài: rụt rè, nói nhỏ; với bạn cùng tuổi bạo dần (dám góp một câu ngắn, đúng việc). Không "nói thẳng": đó là nét của Hiếu.
- Duy (năm hai) xưng **anh/em** với năm nhất, **em/chị** với Minh Anh. Năm nhất gọi "anh Duy".
- Người chơi xưng theo **người được nói tới**: với Minh Anh "em/chị"; với Tùng, Hà Vy "tớ/cậu" dù Minh Anh đứng đó; nói với cả
  nhóm thì tránh đại từ.
- Quân luôn **tôi/các bạn**. Hiếu **tôi** ở Vụ 1 (còn gắt); từ Vụ 2 (đã gỡ tin) **tớ/các cậu** với nhóm, "em" với cô Lan.
