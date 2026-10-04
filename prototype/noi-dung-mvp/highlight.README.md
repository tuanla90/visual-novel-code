# Quy tắc highlight trong game

`highlight.json` khai báo các cụm manh mối và quan hệ chứng cứ của từng vụ chính. Đây là chính sách biên tập, không phải danh sách toàn bộ tên hoặc ngày tháng trong game.

- `clues`: vật chứng, thuộc tính cần quan sát hoặc nguồn dữ liệu quan trọng. Cụm này được tô khi thực sự xuất hiện trong câu.
- `relations`: hành động/quan hệ điều tra như nộp thư, đăng nhập, đối chiếu. Tên người và địa điểm chỉ tô khi câu có cả manh mối lẫn quan hệ này.
- Thời gian chỉ tô trong câu chứa manh mối của vụ hiện tại và có ngữ cảnh thời gian/đối chiếu. Thẻ chuyển ngày, sinh nhật, lịch học và chuyện đi chơi không tự được tô chỉ vì khớp dạng ngày/giờ.
- Các mã chứng cứ chỉ tô khi đi cùng manh mối và quan hệ điều tra; mã trong SQL giữ nguyên định dạng code.
- Nhiệm vụ phụ dùng quy tắc riêng theo mã nhiệm vụ. Khi quay lại tuyến chính, engine khôi phục quy tắc của vụ đó. Quy tắc `hidden` bổ sung manh mối ẩn cho cả hai tuyến, chỉ khi cụm đó đã xuất hiện trong câu người chơi nhìn thấy.
- Cài đặt “Tô màu manh mối” bật/tắt ngay lập tức và lưu vào tùy chọn cá nhân; đổi tốc độ chữ hoặc tùy chọn Skip không làm mất lựa chọn này.

Tên, địa điểm, tên hồ sơ và mã dữ liệu vẫn lấy từ kịch bản chuẩn. Khi biên tập vụ mới, thêm cụm manh mối và quan hệ vào `highlight.json`; tránh các từ quá rộng như “ngày”, “Nam”, “gửi”, “phòng”. Highlight chỉ nhấn những gì câu đã nói, không hiển thị lời giải hay thông tin ẩn.
