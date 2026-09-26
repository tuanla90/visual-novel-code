/**
 * Tự tách nền phẳng của CHÂN DUNG (QĐ-063) — thuật toán thuần trên dữ liệu điểm ảnh kiểu `ImageData`
 * (`{ data, width, height }`, RGBA 8 bit), chạy được trong jsdom để test. Phần canvas (đọc/ghi ảnh)
 * nằm ở `portrait-cutout.ts`.
 *
 * Ảnh user sinh bằng Google Flow có nền xám phẳng một màu (khoảng #D9DDE3–#E8ECEF), không trong suốt.
 * Cách tách:
 * 1. Ảnh đã có điểm trong suốt ở mép → coi như đã tách sẵn, để nguyên.
 * 2. Màu nền = trung bình bốn khối góc; một góc lệch quá `cornerTolerance` → nền không phẳng, để nguyên.
 * 3. LOANG từ mọi điểm ở mép ảnh gần màu nền, qua các điểm kề (4 hướng) gần màu nền
 *    (≤ `fillTolerance`) → trong suốt. Cổ áo trắng, lòng trắng mắt, điểm sáng bên trong người được
 *    viền bao nên không bị loang tới; thân người chạm mép dưới có màu khác nền nên không bị ăn.
 * 4. Đảo nhỏ còn sót giữa vùng nền đã xóa (dấu logo nhỏ của công cụ sinh ảnh, vụn nhiễu), diện tích
 *    ≤ `maxIslandRatio` × diện tích ảnh → xóa. Phần người là một mảng lớn nên không bị đụng.
 * 5. Khoảng nền KẸT bên trong (giữa tay và thân, giữa đuôi tóc và cổ) — không nối với mép nên bước 3
 *    không tới — chỉ bị xóa khi đủ cả ba điều kiện rất chặt: mọi điểm lệch màu nền ≤ `holeTolerance`,
 *    lệch trung bình ≤ `holeMeanTolerance` (phẳng như nền thật), diện tích ≥ `minHoleRatio` × ảnh
 *    (lớn hơn một con mắt). Cổ áo trắng / điểm sáng lệch nền xa hơn nhiều nên vẫn giữ.
 * 6. Làm mềm 1 px ở biên: điểm của người kề nền mà màu còn gần nền (< `edgeTolerance`) → trong một
 *    phần, màu được "gỡ" phần nền pha vào để không còn viền xám.
 */

export interface PixelData {
  data: Uint8ClampedArray | Uint8Array;
  width: number;
  height: number;
}

export interface CutoutOptions {
  /** Khoảng cách màu RGB (Euclid) tối đa để một điểm được coi là nền khi loang từ mép. */
  fillTolerance: number;
  /** Mỗi khối góc lệch màu nền trung bình tối đa ngần này, nếu không coi là nền không phẳng. */
  cornerTolerance: number;
  /** Điểm biên có khoảng cách tới màu nền dưới ngưỡng này → trong một phần (làm mềm 1 px). */
  edgeTolerance: number;
  /** Đảo không nối với phần người, diện tích ≤ tỉ lệ này của ảnh → xóa. */
  maxIslandRatio: number;
  /** Khoảng nền kẹt bên trong: mọi điểm lệch màu nền ≤ ngưỡng này… */
  holeTolerance: number;
  /** …lệch trung bình ≤ ngưỡng này… */
  holeMeanTolerance: number;
  /** …và diện tích ≥ tỉ lệ này của ảnh → xóa. */
  minHoleRatio: number;
}

export const DEFAULT_CUTOUT_OPTIONS: CutoutOptions = {
  fillTolerance: 18,
  cornerTolerance: 16,
  edgeTolerance: 60,
  maxIslandRatio: 0.004,
  holeTolerance: 10,
  holeMeanTolerance: 5,
  minHoleRatio: 0.0003,
};

export type CutoutResult =
  | { status: 'cut'; background: [number, number, number]; removed: number; islands: number; holes: number }
  | { status: 'skipped'; reason: 'transparent' | 'uneven-corners' | 'too-small' | 'no-background' };

/** Lớp của từng điểm theo khoảng cách tới màu nền. */
const FAR = 0;
const FILL = 1; // ≤ fillTolerance
const HOLE = 2; // ≤ holeTolerance (và vì vậy cũng ≤ fillTolerance)
/** Trạng thái đã xóa (nền). */
const BG = 1;

function cornerBlockMean(img: PixelData, x0: number, y0: number, size: number): [number, number, number] {
  const { data, width } = img;
  let r = 0;
  let g = 0;
  let b = 0;
  for (let y = y0; y < y0 + size; y++) {
    for (let x = x0; x < x0 + size; x++) {
      const i = (y * width + x) * 4;
      r += data[i] ?? 0;
      g += data[i + 1] ?? 0;
      b += data[i + 2] ?? 0;
    }
  }
  const n = size * size;
  return [r / n, g / n, b / n];
}

function hasTransparentEdge(img: PixelData): boolean {
  const { data, width: w, height: h } = img;
  for (let x = 0; x < w; x++) {
    if ((data[x * 4 + 3] ?? 255) < 250 || (data[((h - 1) * w + x) * 4 + 3] ?? 255) < 250) return true;
  }
  for (let y = 0; y < h; y++) {
    if ((data[y * w * 4 + 3] ?? 255) < 250 || (data[(y * w + w - 1) * 4 + 3] ?? 255) < 250) return true;
  }
  return false;
}

/**
 * Tách nền phẳng tại chỗ (sửa `img.data`: điểm nền → alpha 0, biên → alpha một phần).
 * Trả về kết quả để lớp gọi biết có cần ghi ảnh mới hay dùng ảnh gốc.
 */
export function removeFlatBackground(img: PixelData, options: Partial<CutoutOptions> = {}): CutoutResult {
  const opt = { ...DEFAULT_CUTOUT_OPTIONS, ...options };
  const { data, width: w, height: h } = img;
  if (w < 4 || h < 4 || data.length < w * h * 4) return { status: 'skipped', reason: 'too-small' };
  const n = w * h;

  // 1. Mép đã có điểm trong suốt → ảnh đã tách sẵn.
  if (hasTransparentEdge(img)) return { status: 'skipped', reason: 'transparent' };

  // 2. Màu nền từ bốn khối góc.
  const k = Math.max(1, Math.min(8, Math.floor(Math.min(w, h) / 50)));
  const corners = [cornerBlockMean(img, 0, 0, k), cornerBlockMean(img, w - k, 0, k), cornerBlockMean(img, 0, h - k, k), cornerBlockMean(img, w - k, h - k, k)];
  const bgR = corners.reduce((s, c) => s + c[0], 0) / 4;
  const bgG = corners.reduce((s, c) => s + c[1], 0) / 4;
  const bgB = corners.reduce((s, c) => s + c[2], 0) / 4;
  const cornerTol2 = opt.cornerTolerance * opt.cornerTolerance;
  for (const [r, g, b] of corners) {
    if ((r - bgR) ** 2 + (g - bgG) ** 2 + (b - bgB) ** 2 > cornerTol2) return { status: 'skipped', reason: 'uneven-corners' };
  }

  const dist = (p: number): number => {
    const i = p * 4;
    const dr = (data[i] ?? 0) - bgR;
    const dg = (data[i + 1] ?? 0) - bgG;
    const db = (data[i + 2] ?? 0) - bgB;
    return Math.sqrt(dr * dr + dg * dg + db * db);
  };

  // Phân lớp mọi điểm một lần.
  const fillTol2 = opt.fillTolerance * opt.fillTolerance;
  const holeTol2 = Math.min(opt.holeTolerance, opt.fillTolerance) ** 2;
  const cls = new Uint8Array(n);
  for (let p = 0, i = 0; p < n; p++, i += 4) {
    const dr = (data[i] ?? 0) - bgR;
    const dg = (data[i + 1] ?? 0) - bgG;
    const db = (data[i + 2] ?? 0) - bgB;
    const d2 = dr * dr + dg * dg + db * db;
    cls[p] = d2 <= holeTol2 ? HOLE : d2 <= fillTol2 ? FILL : FAR;
  }

  // Mọi vòng loang dưới đây dùng mảng byte `open` (1 = còn được đi tới, đặt 0 khi đã ghé) thay
  // cho hàm kiểm tra, để ảnh 1536×2048 (3,1 triệu điểm) chạy nhanh.
  const mask = new Uint8Array(n);
  const stack = new Int32Array(n);
  const members = new Int32Array(n);
  const open = new Uint8Array(n);

  /** Loang 4 hướng từ `start` qua các điểm `open`; ghi danh sách điểm vào `members`, trả số điểm. */
  const flood = (start: number): number => {
    let count = 0;
    let top = 0;
    open[start] = 0;
    stack[top++] = start;
    while (top > 0) {
      const p = stack[--top] ?? 0;
      members[count++] = p;
      const x = p % w;
      if (x > 0 && open[p - 1] === 1) {
        open[p - 1] = 0;
        stack[top++] = p - 1;
      }
      if (x < w - 1 && open[p + 1] === 1) {
        open[p + 1] = 0;
        stack[top++] = p + 1;
      }
      if (p >= w && open[p - w] === 1) {
        open[p - w] = 0;
        stack[top++] = p - w;
      }
      if (p < n - w && open[p + w] === 1) {
        open[p + w] = 0;
        stack[top++] = p + w;
      }
    }
    return count;
  };

  // 3. Loang từ mép qua các điểm gần màu nền.
  for (let p = 0; p < n; p++) open[p] = cls[p] === FAR ? 0 : 1;
  let removed = 0;
  const border: number[] = [];
  for (let x = 0; x < w; x++) border.push(x, (h - 1) * w + x);
  for (let y = 1; y < h - 1; y++) border.push(y * w, y * w + w - 1);
  for (const start of border) {
    if (open[start] !== 1) continue;
    const count = flood(start);
    for (let i = 0; i < count; i++) mask[members[i] ?? 0] = BG;
    removed += count;
  }
  if (removed === 0) return { status: 'skipped', reason: 'no-background' };

  /** Gom các mảng liên thông của điểm `open`; `decide(count)` true → cả mảng thành nền. */
  const sweep = (decide: (count: number) => boolean): number => {
    let hits = 0;
    for (let start = 0; start < n; start++) {
      if (open[start] !== 1) continue;
      const count = flood(start);
      if (decide(count)) {
        hits++;
        for (let i = 0; i < count; i++) mask[members[i] ?? 0] = BG;
        removed += count;
      }
    }
    return hits;
  };

  // 4. Đảo nhỏ không nối với phần người → nền.
  const maxIsland = Math.floor(opt.maxIslandRatio * n);
  for (let p = 0; p < n; p++) open[p] = mask[p] === BG ? 0 : 1;
  const islands = sweep((count) => count <= maxIsland);

  // 5. Khoảng nền kẹt bên trong: phẳng như nền thật và đủ lớn → nền.
  const minHole = Math.max(1, Math.ceil(opt.minHoleRatio * n));
  for (let p = 0; p < n; p++) open[p] = mask[p] !== BG && cls[p] === HOLE ? 1 : 0;
  const holes = sweep((count) => {
    if (count < minHole) return false;
    let sum = 0;
    for (let i = 0; i < count; i++) sum += dist(members[i] ?? 0);
    return sum / count <= opt.holeMeanTolerance;
  });

  // 6. Xóa nền + làm mềm 1 px ở biên (gỡ phần màu nền pha vào điểm biên).
  const edgeTol = Math.max(opt.edgeTolerance, opt.fillTolerance + 1);
  for (let p = 0; p < n; p++) {
    const i = p * 4;
    if (mask[p] === BG) {
      data[i + 3] = 0;
      continue;
    }
    const x = p % w;
    const touchesBg = (x > 0 && mask[p - 1] === BG) || (x < w - 1 && mask[p + 1] === BG) || (p >= w && mask[p - w] === BG) || (p < n - w && mask[p + w] === BG);
    if (!touchesBg) continue;
    const d = dist(p);
    if (d >= edgeTol) continue;
    const a = Math.min(1, Math.max(0.05, (d - opt.fillTolerance) / (edgeTol - opt.fillTolerance)));
    // Gỡ nền pha vào: màu = nền + (màu − nền) / a; giới hạn hệ số khuếch đại ở 2 để nhiễu nén JPEG
    // sát biên không thành chấm sáng.
    const unmix = Math.max(a, 0.5);
    data[i] = Math.round(Math.min(255, Math.max(0, bgR + ((data[i] ?? 0) - bgR) / unmix)));
    data[i + 1] = Math.round(Math.min(255, Math.max(0, bgG + ((data[i + 1] ?? 0) - bgG) / unmix)));
    data[i + 2] = Math.round(Math.min(255, Math.max(0, bgB + ((data[i + 2] ?? 0) - bgB) / unmix)));
    data[i + 3] = Math.round(255 * a);
  }

  return { status: 'cut', background: [Math.round(bgR), Math.round(bgG), Math.round(bgB)], removed, islands, holes };
}
