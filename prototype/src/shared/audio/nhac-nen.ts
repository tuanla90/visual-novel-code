/**
 * Danh sách bài nhạc nền theo cảnh. Mỗi tên ứng với một tệp `src/assets/audio/bgm/<tên>.mp3`
 * (nguồn và lời mô tả đã dùng để tạo: `src/assets/audio/NGUON.md`).
 * Tệp thuần, không phụ thuộc trình duyệt, để engine MVP chọn nhạc mà không kéo theo bộ phát.
 */
export const NHAC_NEN = ['chu-de', 'thuong-ngay', 'dieu-tra', 'phan-tich', 'doi-chat', 'cao-trao', 'ket'] as const;

/**
 * - `chu-de`: nhạc chủ đề — màn mở đầu, tạo nhân vật.
 * - `thuong-ngay`: trò chuyện ở phòng CLB, đầu ngày, buổi tối.
 * - `dieu-tra`: bản đồ trường, đi tới một địa điểm, khám phá.
 * - `phan-tich`: màn tra SQL, sửa truy vấn, lọc thư.
 * - `doi-chat`: buổi họp rà soát.
 * - `cao-trao`: lúc đối chất / trình chứng cứ, khoảnh khắc phản bác.
 * - `ket`: kết vụ.
 */
export type NhacNen = (typeof NHAC_NEN)[number];
