/** Cảnh của màn tra / màn tổng hợp v7: ảnh nền và tọa độ mặt kính. */
export type CanhTra = 'phong-clb' | 'phong-may' | 'man-chieu';

/** Ảnh cảnh và tọa độ mặt kính trên khung 1600×900 (đo từ ảnh: art/nguon/phong-*-core). */
export const CANH_TRA: Record<CanhTra, { anh: string | null; kinh: { x: number; y: number; w: number; h: number }; may: string }> = {
  'phong-clb': { anh: 'canh-tra-phong-clb', kinh: { x: 253, y: 60, w: 1094, h: 588 }, may: 'laptop CLB · tài khoản clb_tham_tu' },
  'phong-may': { anh: 'canh-tra-phong-may', kinh: { x: 196, y: 84, w: 1232, h: 628 }, may: 'máy phòng máy · xem theo phiếu tra cứu' },
  'man-chieu': { anh: null, kinh: { x: 190, y: 60, w: 1220, h: 640 }, may: 'màn chiếu phòng họp' },
};
