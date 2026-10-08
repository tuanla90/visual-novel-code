# Luật tô màu chữ (user chốt 04/10/2026)

Tô màu là để người chơi nhận ra **thứ sẽ vào hồ sơ** của vụ đang chơi. Tô thừa thì câu nào cũng sáng, mất tác dụng; tô thiếu
thì manh mối trôi qua. Bộ máy: `src/mvp/ui/story-highlight.ts`. Dữ liệu: `noi-dung-mvp/highlight.json`. Máy kiểm:
`npm run kiem-to-mau` (cũng chạy trong `npm test`).

## Luật

1. **Tô = thứ sẽ vào hồ sơ.** Cụm tô khai theo **từng thẻ hồ sơ** (manh mối `clue-`, tài liệu `doc-`, bằng chứng `ev-`, kể cả
   bằng chứng lưu từ màn tra) của tuyến mở thẻ đó: `"<tuyến>": { "the": { "<mã thẻ>": ["cụm", …] } }`.
2. **Không sót:** thẻ nào tuyến mở cũng phải có ít nhất một cụm tô. Thẻ không thuộc tuyến thì không được khai.
3. **Cụm phải có thật:** có trong chính thẻ, và xuất hiện ít nhất một lần trong lời của tuyến.
4. **Cụ thể:** từ hai chữ trở lên, hoặc là mã (có chữ số: `MIC-02`, `PH-04`), hoặc có chữ viết hoa (tên riêng). Không dùng
   từ đơn chung chung. Cụm bắt đầu bằng số đếm ("hai dòng") không được khớp vào giữa số lớn hơn ("mười hai dòng").
5. **Người:** không bao giờ tô người chơi và bốn bạn đồng hành (Tùng, Hà Vy, Minh Anh, Duy). Người khác chỉ tô khi tên có trong
   thẻ hồ sơ của tuyến (nghi phạm, nhân chứng) **và** câu đó có cụm tô.
6. **Giờ:** tô khi câu có cụm tô và có ngữ cảnh thời gian (giờ, lúc, tối, vào…). Nhận cả "22:40", "6 giờ 45", "7h30".
   **Nơi:** tô khi câu có cụm tô và có từ ngữ cảnh `relations` của tuyến.
7. **Mật độ:** một câu tối đa 3 chỗ tô — bộ máy tự cắt, giữ theo ưu tiên vật chứng → người → giờ → nơi. Một tuyến: vụ chính
   không quá 30%, việc phụ không quá 40% số câu có tô.
8. **Không lộ:** đừng chọn cụm làm sáng một chi tiết ẩn trước khi người chơi tự tìm ra (vd. "chữ ký" sẽ tô cả chữ ký tắt "T."
   trên bình cứu hỏa — gài cho bác Thịnh — nên thẻ chữ ký H chỉ khai "chữ H").

Mẹo chọn cụm: lấy cụm ngắn mà người nói thật sự nói ra ở cảnh thẻ được mở. Máy kiểm báo cụm không có trong thẻ / trong lời.
Việc phụ dùng luật của việc phụ; quay lại tuyến chính thì dùng luật của vụ đó. Cài đặt "Tô màu manh mối" bật / tắt tức thì,
lưu trong tùy chọn cá nhân.
