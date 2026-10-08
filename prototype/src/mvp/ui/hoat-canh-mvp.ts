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
  /** Độ sáng của lớp: [lúc đầu, lúc sau] (1 = như ảnh gốc). Ảnh cắt vẽ sáng đều nên cảnh đêm phải hạ xuống; đổi sáng khi đèn rọi tới. */
  sang?: [number, number];
  /** Đổi sáng sau mấy giây (mặc định 0). */
  sangLuc?: number;
  /** Lớp nằm TRÊN chùm đèn (người cầm đèn ở tiền cảnh). */
  tienCanh?: boolean;
}

/** Chùm đèn pin: gốc (% ảnh nền), quét từ góc `tu` tới góc `den` (độ, 0 = sang phải, tăng theo chiều kim đồng hồ) trong `giay` giây. */
export interface ChumDen {
  x: number;
  y: number;
  tu: number;
  den: number;
  giay: number;
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
  /** Tiếng bước chân: mỗi bước cách nhau mấy mili giây (chỉ kêu trong lúc hoạt cảnh còn chạy). */
  buocChan?: number;
  chum?: ChumDen;
}

export const HOAT_CANH: Readonly<Record<string, HoatCanh>> = {
  // Vụ 1 bản 6, kết thật: dựng cảnh bóng mờ tự chạy ở cổng ký túc xá gần 7:00 sáng 16/09 (bóng balo đen đưa phong bì nâu cho
  // bóng nhỏ hơn). Một ảnh, không lớp người: nền phóng chậm về chỗ trao phong bì; người chơi không kéo gì (B19).
  'cong-ktx-bong-mo': {
    tiLe: 2048 / 1152,
    tam: [53, 42],
    phong: 1.14,
    giay: 6,
    lop: [],
  },
  // Nhiệm vụ phụ "Một lần dẫn lạc": Tùng và người chơi chạy về cổng ký túc xá, chú Cường soi đèn pin ở chốt.
  'san-dem': {
    tiLe: 1360 / 768,
    tam: [82, 52],
    phong: 1.16,
    giay: 11,
    lop: [
      { anh: 'hc-san-dem-tung', trai: 11.18, tren: 6.25, rong: 30.88, dx: 33, dy: -25, co: 0.4, sang: [0.62, 0.62] },
      { anh: 'hc-san-dem-ban', trai: 45.0, tren: 19.79, rong: 19.19, dx: 17, dy: -17, co: 0.42, tre: 0.35, sang: [0.62, 0.62] },
    ],
    vetTocDo: true,
    den: [84, 54],
    buocChan: 270,
  },
  // Cùng nhiệm vụ: sảnh giảng đường B đã tắt đèn, bác Thịnh quét đèn pin, bắt gặp Tùng đang lao xuống cầu thang.
  'sanh-den-pin': {
    tiLe: 1360 / 768,
    tam: [22, 45],
    phong: 1.06,
    giay: 7,
    lop: [
      { anh: 'hc-sanh-den-pin-tung', trai: 13.68, tren: 17.71, rong: 12.65, dx: 3, dy: 9, co: 1.12, sang: [0.34, 1], sangLuc: 1.5 },
      { anh: 'hc-sanh-den-pin-bac', trai: 59.34, tren: 7.81, rong: 40.66, dx: -2.5, dy: 0, co: 1.03, sang: [0.5, 0.5], tienCanh: true },
    ],
    chum: { x: 59.9, y: 60.4, tu: 216, den: 193, giay: 1.9 },
    buocChan: 230,
  },
};

export function coHoatCanh(canh: string): boolean {
  return canh in HOAT_CANH && anhNen(canh) !== undefined;
}
