/**
 * Nhịp của hiệu ứng "Có số liệu đây!" (QĐ-025, QĐ-061 Đ2) — tách riêng để test và component dùng chung.
 */

/** Thời gian hiệu ứng tự chạy trước khi đi tiếp (~1,2 giây). */
export const EFFECT_DURATION_MS = 1200;

/**
 * Trong khoảng này, bấm/phím không bỏ qua được: cú bấm đúp hay phím còn giữ từ màn chọn dòng
 * (hiệu ứng hiện ngay sau cú chọn) không được làm người chơi lỡ khoảnh khắc.
 */
export const EFFECT_SKIP_GUARD_MS = 400;
