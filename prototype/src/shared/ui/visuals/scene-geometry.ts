/**
 * Hình học dùng chung của nền cảnh (tách khỏi component để Fast Refresh chạy đúng).
 * Hệ tọa độ 1600×900 = ảnh thật 2560×1440 thu nhỏ; cùng tỉ lệ 16:9 và cùng cách phủ `cover`, neo giữa.
 */
export const SCENE_VIEWBOX = { width: 1600, height: 900 } as const;

export interface ScreenFrame {
  /** Mép trái / phải theo PHẦN chiều ngang ảnh (0–1). */
  x0: number;
  x1: number;
  /** Mép trên / dưới theo PHẦN chiều dọc ảnh (0–1). */
  y0: number;
  y1: number;
}

/**
 * Khung màn chiếu trống trong nền phòng giải trình (QĐ-060, gói 6): giao diện truy vấn chồng lên
 * đúng khung này. KHI THAY ẢNH THẬT `bg-prototype-hearing-room`: đo khung màn chiếu trên ảnh
 * 2560×1440 rồi đổi 4 số: x0 = mép trái (px) ÷ 2560, x1 = mép phải ÷ 2560, y0 = mép trên ÷ 1440,
 * y1 = mép dưới ÷ 1440 (xem src/assets/art/README.md).
 */
export const HEARING_ROOM_SCREEN: ScreenFrame = { x0: 0.09, y0: 0.1, x1: 0.91, y1: 0.72 };

/**
 * Khung màn chiếu trong ẢNH THẬT `bg-prototype-hearing-room` (đo trên ảnh Topview 1360×768 — phòng họp
 * rà soát MVP, 28/09; màn chiếu lệch phải so với tâm ảnh). Màn chiếu trong ảnh nhỏ (~35% ngang) nên `projectorInsets` nới khung giao diện ra quanh
 * tâm màn chiếu. `HEARING_ROOM_SCREEN` ở trên vẫn là khung của hình vẽ tạm (SVG).
 */
export const HEARING_ROOM_IMAGE_SCREEN: ScreenFrame = { x0: 0.455, y0: 0.162, x1: 0.707, y1: 0.385 };

/**
 * Khung tối thiểu để đọc được SQL + bảng (màn chiếu trong ảnh nhỏ hơn thì nới ra). Màn ≤ 1100 px:
 * màn chiếu của gói 6 xếp SQL trên, bảng dưới (debrief.css) nên cần cao hơn — đo ở 1024×768: 600 px
 * thì bảng 2 dòng + dải so sánh không phải cuộn. `top`: chừa nhãn cảnh ở góc trên trái sân khấu.
 */
export const PROJECTOR_MIN = { width: 900, height: 420, narrowWidth: 1100, narrowHeight: 600, margin: 16, top: 48 } as const;

export interface Insets {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

/**
 * Khoảng cách (px) từ 4 mép sân khấu tới khung màn chiếu trong ảnh nền, khi ảnh phủ sân khấu kiểu
 * `cover` + neo giữa (giống `.stage__backdrop`). Khung nhỏ hơn mức tối thiểu thì nới đều quanh tâm,
 * không vượt khỏi sân khấu (chừa `margin`).
 */
export function projectorInsets(stageWidth: number, stageHeight: number, frame: ScreenFrame = HEARING_ROOM_SCREEN, min: typeof PROJECTOR_MIN = PROJECTOR_MIN): Insets {
  const scale = Math.max(stageWidth / SCENE_VIEWBOX.width, stageHeight / SCENE_VIEWBOX.height);
  const artW = SCENE_VIEWBOX.width * scale;
  const artH = SCENE_VIEWBOX.height * scale;
  const offX = (stageWidth - artW) / 2;
  const offY = (stageHeight - artH) / 2;
  let left = offX + frame.x0 * artW;
  let right = offX + frame.x1 * artW;
  let top = offY + frame.y0 * artH;
  let bottom = offY + frame.y1 * artH;
  const minHeight = stageWidth <= min.narrowWidth ? min.narrowHeight : min.height;
  [left, right] = widen(left, right, Math.min(min.width, stageWidth - 2 * min.margin), min.margin, stageWidth - min.margin);
  [top, bottom] = widen(top, bottom, Math.min(minHeight, stageHeight - min.top - min.margin), min.top, stageHeight - min.margin);
  return { top, right: stageWidth - right, bottom: stageHeight - bottom, left };
}

/** Nới đoạn [a, b] cho đủ `size` quanh tâm, rồi dời vào trong [lo, hi]. */
function widen(a: number, b: number, size: number, lo: number, hi: number): [number, number] {
  let start = Math.max(a, lo);
  let end = Math.min(b, hi);
  if (end - start < size) {
    const mid = (a + b) / 2;
    start = mid - size / 2;
    end = mid + size / 2;
    if (start < lo) {
      end += lo - start;
      start = lo;
    }
    if (end > hi) {
      start -= end - hi;
      end = hi;
    }
    start = Math.max(start, lo);
  }
  return [start, end];
}
