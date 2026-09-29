/**
 * DỮ LIỆU BẢN ĐỒ TRƯỜNG CỦA BẢN MVP — MỌI THỨ PHỤ THUỘC ẢNH BẢN ĐỒ NẰM Ở ĐÂY (component `BanDoMvp.tsx` không biết ảnh).
 *
 * Thay ảnh bản đồ: (1) đổi dòng `import anhBanDo …` sang ảnh mới (vd. `../../assets/mvp/ban-do/ban-do-truong.webp`);
 * (2) sửa `rong`/`cao` = kích thước gốc của ảnh (điểm ảnh; chỉ dùng để giữ tỉ lệ khung); (3) sửa `x`/`y` từng ghim.
 * (x, y) là ĐẦU NHỌN ghim, tính theo % bề rộng / bề cao ảnh (0–100) — không phụ thuộc kích thước gốc.
 * `diaDiem` là mã trong `noi-dung-mvp/dia-diem.md`; một ghim nhiều mã = tòa nhiều phòng (bấm ghim → chọn phòng).
 * Nơi không nằm trong ghim nào vẫn đến được (hiện dạng chữ dưới bản đồ) — test `ban-do-mvp.test.ts` bắt thiếu.
 *
 * Hiện DÙNG TẠM ảnh bản đồ của prototype (`src/story/ui/map/art/campus-map.webp`, 1360×768; import, không chép) —
 * ảnh bản đồ MVP mới đang được sinh.
 */
import anhBanDo from '../../story/ui/map/art/campus-map.webp';
import type { GhimBanDoMvp } from '../engine/diem-tuong-tac';

export interface BanDoMvp {
  anh: string;
  /** Kích thước gốc của ảnh (điểm ảnh) — chỉ để giữ tỉ lệ. */
  rong: number;
  cao: number;
  ghim: GhimBanDoMvp[];
}

export const BAN_DO_MVP: BanDoMvp = {
  anh: anhBanDo,
  rong: 1360,
  cao: 768,
  ghim: [
    { id: 'toa-b', ten: 'Tòa B', x: 28, y: 16, diaDiem: ['toa-b'] },
    { id: 'toa-hanh-chinh', ten: 'Tòa hành chính', x: 17, y: 38, diaDiem: ['phong-dao-tao', 'phong-ctsv'] },
    { id: 'phong-may', ten: 'Phòng máy', x: 62, y: 30, diaDiem: ['phong-may'] },
    { id: 'phong-clb', ten: 'Phòng CLB', x: 92, y: 40, diaDiem: ['phong-clb'] },
    { id: 'cang-tin', ten: 'Căng tin', x: 54, y: 9, diaDiem: ['cang-tin'] },
    { id: 'ktx', ten: 'Cổng KTX', x: 80, y: 62, diaDiem: ['cong-ktx'] },
  ],
};

/**
 * Tỉ lệ ảnh nền địa điểm (bg-mvp-*.webp đều sinh 1360×768). Điểm tương tác đặt theo % của khung giữ đúng tỉ lệ này,
 * nên đổi cỡ màn không làm điểm trôi. Nền mới khác tỉ lệ → sửa ở đây (hoặc chuyển sang đọc kích thước ảnh).
 */
export const TI_LE_NEN = { rong: 1360, cao: 768 };
