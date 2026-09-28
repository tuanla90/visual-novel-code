### Ba câu gợi ý chuẩn (§5.2) — giọng {{nv.ha-vy}}

- [GỢI Ý CHUẨN hint-any-or-all] **ha-vy** (thinking): Truy vấn này đang lấy cả người chỉ khớp một manh mối. Cậu muốn khớp bất kỳ, hay khớp đồng thời?
  - Dùng khi: c3 hoặc debrief-fix chạy với phép nối `OR` (mã `or-connector`). Không có ở c1, c2 vì chỉ có một điều kiện.
- [GỢI Ý CHUẨN hint-right-columns] **ha-vy** (thinking): Kết quả đã có đúng cột cần để trả lời câu hỏi chưa? Đọc lại đề xem cần những cột nào.
  - Dùng khi: ở bất kỳ thử thách nào, kết quả ra đúng các dòng nhưng thiếu cột bắt buộc (mã `missing-columns`, QĐ-019).
- [GỢI Ý CHUẨN hint-ask-or-conclude] **ha-vy** (thinking): Hai dòng này cho biết ai cần hỏi tiếp, hay đã đủ để kết luận ai làm?
  - Dùng khi: CHỈ ở màn giải trình, là phản hồi khi chọn lựa chọn `tim-ra-roi` ở q-two-rows (deb-03). Không dùng ở c3, không dùng ở bất kỳ đâu trước màn giải trình (QĐ-023).

### Nhận xét chung cho mọi thử thách

- [KHI: not-select] **ha-vy** (neutral): Trong buổi làm việc này CLB chỉ có quyền xem dữ liệu.
- [KHI: syntax-error] **ha-vy** (thinking): Máy chưa đọc được câu này. Soát dấu nháy, dấu phẩy, hoặc quay về trình dựng.
- [KHI: no-table] **ha-vy** (neutral): Hàng FROM còn trống. Mình lấy dữ liệu từ bảng nào?
- [KHI: no-columns] **ha-vy** (neutral): Hàng SELECT chưa chọn cột nào. Cậu cần kết quả hiện những cột gì?
- [KHI: no-value] **ha-vy** (neutral): Có một điều kiện chưa có giá trị. Cậu lọc theo gì? Chọn trong mục "Từ manh mối" nhé.
- [KHI: connector-unset] **ha-vy** (neutral): Chưa chọn cách nối các điều kiện. Cậu cần người thỏa bất kỳ, hay thỏa đồng thời?
  - QĐ-039: khi có từ 2 điều kiện mà phép nối chưa chọn, nút Chạy bị vô hiệu; lời này hiện khi người chơi bấm Chạy (hoặc rê chuột lên nút). Gặp được ở mọi thử thách người chơi tự thêm điều kiện thứ hai; không gặp ở debrief-fix vì phép nối nạp sẵn `OR`.
- [KHI: too-many-rows] **ha-vy** (thinking): Kết quả vượt quá 2000 dòng. Cậu hãy thêm điều kiện lọc để thu hẹp kết quả nhé.
- [KHI: wrong-table] **ha-vy** (thinking): Thông tin cậu cần nằm ở bảng khác. Mở bảng mô tả cột xem nó ở đâu nhé.
- [KHI: or-connector] dùng hint-any-or-all
- [KHI: wrong-column-ho-dem] **ha-vy** (thinking): Cậu đang lọc theo cột ho_dem. Chữ ký thường là tên gọi, tức cột ten.
- [KHI: like-ends-with] **ha-vy** (thinking): "Kết thúc bằng H" bắt cả tên như Linh, Thanh. Trên chữ ký, H đứng đầu.
- [KHI: like-contains] **ha-vy** (thinking): "Chứa H" bắt cả tên có h ở giữa. Mình cần H đứng đầu tên.
- [KHI: class-prefix] **ha-vy** (thinking): Mã lớp giống nhau vài chữ chưa chắc cùng tòa. Cậu lọc bằng đúng danh sách lớp trong hồ sơ.
- [KHI: hardcoded-ids] **ha-vy** (thinking): Truy vấn này gọi thẳng mã sinh viên, tức đi từ đáp án. Hãy lọc bằng manh mối.
- [KHI: limit-used] **ha-vy** (thinking): LIMIT chỉ cắt bớt số dòng, không lọc theo manh mối.
  - Các mã `wrong-column-ho-dem`, `like-ends-with`, `like-contains`, `hardcoded-ids`, `limit-used` chỉ gặp ở c1, c3, debrief-fix (những thử thách lọc cột `ten` trên bảng `sinh_vien`).
- [KHI: wrong-value] **ha-vy** (neutral): Giá trị lọc chưa khớp manh mối trong hồ sơ. Cậu soát lại từng chữ, cả dấu tiếng Việt.
- [KHI: extra-columns] **ha-vy** (smile): Đúng rồi! Mẹo nhỏ: chỉ cần các cột đề bài hỏi là đủ.
  - Vẫn tính là chạy đúng; lời này thay cho lời `[KHI ĐÚNG]` của thử thách (QĐ-019).
- [KHI: other] **ha-vy** (thinking): Chưa khớp câu hỏi. So từng điều kiện với manh mối trong hồ sơ xem.
