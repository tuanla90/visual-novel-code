/** Cấu hình các hoạt cảnh kiểu truyện tranh động (xem HoatCanhMvp.tsx): cảnh nào có, lớp nào đặt ở đâu, trượt tới đâu. */
import { anhNen } from './anh-mvp';

export interface LopHoatCanh {
  /** Tên tệp ảnh cắt nền (không đuôi). */
  anh: string;
  /** Khung của lớp trên ảnh nền, theo %. */
  trai: number;
  tren: number;
  rong: number;
  /** Trượt tới đâu khi hết hoạt cảnh: dời ngang / dọc theo % bề rộng / bề cao ảnh nền, và co lại còn bao nhiêu. */
  dx: number;
  dy: number;
  co: number;
  /** Trễ so với lớp đầu (giây) để hai người không trượt y hệt nhau. */
  tre?: number;
}

export interface HoatCanh {
  /** Tỉ lệ ảnh nền (rộng / cao). */
  tiLe: number;
  /** Tâm phóng của nền (% ảnh nền): nơi nhân vật đang chạy tới. */
  tam: [number, number];
  /** Nền phóng to tới bao nhiêu. */
  phong: number;
  /** Cả hoạt cảnh kéo dài mấy giây (sau đó giữ nguyên khung cuối; nhân vật KHÔNG nhún nhảy — user chốt 02/10/2026). */
  giay: number;
  lop: LopHoatCanh[];
  /** Vệt tốc độ tỏa từ tâm. */
  vetTocDo?: boolean;
  /** Chỗ có ánh đèn chớp (% ảnh nền). */
  den?: [number, number];
  /** Tiếng bước chân: mỗi bước cách nhau mấy mili giây. */
  buocChan?: number;
}

export const HOAT_CANH: Readonly<Record<string, HoatCanh>> = {
  // Nhiệm vụ phụ "Một lần dẫn lạc": Tùng và người chơi chạy về cổng ký túc xá, chú Cường soi đèn pin ở chốt.
  'san-dem': {
    tiLe: 1360 / 768,
    tam: [82, 52],
    phong: 1.16,
    giay: 11,
    lop: [
      { anh: 'hc-san-dem-tung', trai: 11.18, tren: 6.25, rong: 30.88, dx: 33, dy: -25, co: 0.4 },
      { anh: 'hc-san-dem-ban', trai: 45.0, tren: 19.79, rong: 19.19, dx: 17, dy: -17, co: 0.42, tre: 0.35 },
    ],
    vetTocDo: true,
    den: [84, 54],
    buocChan: 270,
  },
};

export function coHoatCanh(canh: string): boolean {
  return canh in HOAT_CANH && anhNen(canh) !== undefined;
}
