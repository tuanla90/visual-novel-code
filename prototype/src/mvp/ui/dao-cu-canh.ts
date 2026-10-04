/**
 * Đạo cụ cố định trên nền cảnh (user yêu cầu 03/10/2026):
 * Tờ thông báo trên cửa thang máy và sơ đồ trên bảng tin luôn hiển thị trên nền sảnh KTX,
 * kể cả lúc đang đọc thoại mở đầu lẫn lúc khám phá sảnh.
 */
export interface DaoCuCanh {
  sprite: string;
  x: number;
  y: number;
  rong: number;
}

export const DAO_CU_CANH: Record<string, DaoCuCanh[]> = {
  'sanh-ktx': [
    { sprite: 'obj-thong-bao-thang-may', x: 10.5, y: 38.5, rong: 3.6 },
    { sprite: 'obj-so-do-ktx', x: 44, y: 35.5, rong: 10 },
  ],
  'sanh-toa-b': [
    { sprite: 'obj-hop-kien-nghi', x: 35.2, y: 45.5, rong: 3.4 },
    { sprite: 'obj-thong-bao-hop', x: 40.5, y: 43.5, rong: 2.6 },
  ],
};
