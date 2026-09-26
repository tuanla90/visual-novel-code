/**
 * Hình học dùng chung của nền cảnh vẽ tạm (tách khỏi component để Fast Refresh chạy đúng).
 * Hệ tọa độ 1600×900 = ảnh thật 2560×1440 thu nhỏ; cùng tỉ lệ 16:9 và cùng cách phủ `cover`.
 */
export const SCENE_VIEWBOX = { width: 1600, height: 900 } as const;

/**
 * Khung màn chiếu trống trong nền phòng giải trình tạm, theo PHẦN của ảnh (0–1): x0/x1 theo chiều
 * ngang, y0/y1 theo chiều dọc.
 */
export const HEARING_ROOM_SCREEN = { x0: 0.19, y0: 0.07, x1: 0.81, y1: 0.5 } as const;
