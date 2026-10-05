/**
 * CỔNG CHO CÔNG CỤ QUAY VÁN (`tools/quay-van/quay.mjs`) — chỉ nạp ở chế độ dev (xem `main.tsx`), không vào bản build.
 * Công cụ chạy ngoài trang (Chrome không cửa sổ) cần đúng kho trạng thái và máy mà giao diện đang dùng. Tự `import()` từ
 * trong trang không được: sau mỗi lần Vite cập nhật nóng, mô-đun mang địa chỉ khác và trình duyệt tạo một bản sao kho riêng.
 */
import { useVnStore } from '../../shared/vn/vn-store';
import { dienTen, khungNhin, tenNguoiNoi } from '../engine/may';
import { choiTuDong, RE_NHANH_KET_THAT, reNhanhTheo } from '../engine/tu-choi';
import { KICH_BAN, useKhoMvp } from '../store/kho-mvp';

(globalThis as Record<string, unknown>).__clbQuay = { kho: useKhoMvp, vn: useVnStore, KB: KICH_BAN, khungNhin, tenNguoiNoi, dienTen, choiTuDong, reNhanhTheo, RE_NHANH_KET_THAT };
