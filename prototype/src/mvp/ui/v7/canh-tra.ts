/** Cảnh của màn tra / màn tổng hợp v7: ảnh nền và tọa độ mặt kính. */
export type CanhTra = 'phong-clb' | 'phong-may' | 'man-chieu';

/** Ảnh cảnh và tọa độ mặt kính trên khung 1600×900: màn hình được zoom to tối đa để hiển thị 3 cột và bảng rộng rãi. */
export const CANH_TRA: Record<CanhTra, { anh: string | null; kinh: { x: number; y: number; w: number; h: number }; may: string }> = {
  'phong-clb': { anh: 'canh-tra-phong-clb', kinh: { x: 90, y: 36, w: 1420, h: 740 }, may: 'laptop CLB · tài khoản clb_tham_tu' },
  'phong-may': { anh: 'canh-tra-phong-may', kinh: { x: 90, y: 38, w: 1420, h: 740 }, may: 'máy phòng máy · xem theo phiếu tra cứu' },
  'man-chieu': { anh: null, kinh: { x: 80, y: 36, w: 1440, h: 750 }, may: 'màn chiếu phòng họp' },
};
