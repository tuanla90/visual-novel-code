/**
 * TRẠNG THÁI RUNTIME MVP (gói kien-truc-mvp, QĐ-077/086/089/090).
 *
 * Toàn bộ tiến độ một ván MVP nằm trong MỘT đối tượng thuần JSON — đủ để Lưu/Nạp bằng `structuredClone`
 * hay JSON.stringify. Không tham chiếu tới dữ liệu kịch bản (chỉ giữ mã); mọi phép suy ra (khung nhìn,
 * địa điểm mở được…) làm trong `may.ts` từ `KichBanMvp` + trạng thái.
 *
 * Tách hẳn với `src/story/engine/state.ts` của prototype: hai bản không dùng chung kiểu, store hay khóa lưu.
 */
import type { LoiMvp } from '../../content/mvp/types';

/** Vì sao chuỗi đang chạy được mở — quyết định việc gì xảy ra khi chuỗi hết nút mà không `[ĐI TỚI]`. */
export type BoiCanhChuoi =
  /** Chuỗi mở đầu (tuần 1): hết → sang ngày 1. */
  | 'mo-dau'
  /** Chuỗi "Mở ngày": hết → chọn địa điểm. */
  | 'mo-ngay'
  /** Chuỗi của một dữ kiện người chơi chọn: hết → ghi nhận dữ kiện, rồi kiểm hết khung. */
  | 'du-kien'
  /** Chuỗi "Cuối ngày" (buổi tối): hết → ghi nhận dữ kiện chính, hết ngày. */
  | 'toi'
  /** Chuỗi của một ngày theo truyện (chương 1): hết → hết ngày. */
  | 'truyen'
  /** Chuỗi ngày họp: phải tự `[ĐI TỚI]`/`[RẼ KẾT]`; hết nút mà không rẽ là lỗi nội dung. */
  | 'hop'
  /** Chuỗi kết: kết thúc bằng `[KẾT THÚC]`. */
  | 'ket'
  /** Chuỗi của một vụ sau (`lich.vuSau`): phải tự `[ĐI TỚI]` / `[KẾT THÚC]`; hết nút mà không kết là lỗi nội dung. */
  | 'vu';

export interface ConTroMvp {
  chuoi: string;
  nut: number;
  boiCanh: BoiCanhChuoi;
}

export interface KhamPhaMvp {
  /** Vị trí nút `[KHÁM PHÁ]` (chuỗi, chỉ số nút, bối cảnh của chuỗi chứa nó). */
  veLai: ConTroMvp;
  /** Chuỗi của các chỗ đã bấm, theo thứ tự. */
  daXem: string[];
}

export type GiaiDoanMvp = 'mo-dau' | 'ngay' | 'hop' | 'het' | 'vu-sau';

/** Câu hỏi / chọn dòng / chép sổ đang trong pha phản hồi. */
export interface HoiDapMvp {
  /** Nút đang trả lời (id câu hỏi / chọn dòng / trang sổ). */
  id: string;
  nguon: 'question' | 'line-pick' | 'doi-chat';
  /** Các lời phản hồi đang hiện lần lượt (kể cả lời Minh Anh khi mất vạch). */
  phanHoi: LoiMvp[];
  viTri: number;
  dungRoi: boolean;
  /** Hết vạch uy tín ở lần này → sau phản hồi, hoãn buổi họp (quay lại đầu chuỗi ngày họp). */
  hetVach: boolean;
}

export interface HoSoMvp {
  /** Giấy nhớ (`clue-…`), theo thứ tự nhận. */
  manhMoi: string[];
  /** Tài liệu (`doc-…`). */
  taiLieu: string[];
  /** Bằng chứng / key item (`ev-…`), từ thực địa hay phòng máy. */
  bangChung: string[];
}

/**
 * Bảng điều tra (ĐÃ CHỐT B.2, 30/09/2026): sợi chỉ do truy vấn vẽ và chỗ người chơi đã kéo thẻ tới.
 * `day[<mã phiếu kết quả>]` = các thẻ đã kéo vào câu ra phiếu đó; `viTri` theo khung bảng 1600×900.
 */
export interface BangGhimLuuMvp {
  day: Record<string, string[]>;
  viTri: Record<string, { x: number; y: number }>;
  /**
   * Màu đầu ghim người chơi chọn cho từng thẻ (đề xuất gameplay câu 5, 01/10/2026): hình dạng thẻ do hệ thống (loại),
   * màu do người chơi — ý nghĩa tùy họ. Sợi chỉ nối theo màu ghim của thẻ nguồn. Không có = đỏ.
   */
  mau?: Record<string, MauGhimMvp>;
  /** Thẻ người chơi đã gỡ khỏi bảng (vẫn trong hồ sơ, ghim lại được). Mặc định mọi thẻ đều ghim. */
  boGhim?: string[];
  /** Query result cards do người chơi tạo: chỉ lưu SQL + schema, không lưu bản sao các dòng SQLite. */
  phieuTruyVan?: Record<string, PhieuTruyVanMvp>;
  /** Notes người chơi trích từ kết quả nhỏ; giữ ngoài hồ sơ/bằng chứng đối chất. */
  ghiChuTruyVan?: GhiChuTruyVanMvp[];
}

export interface PhieuTruyVanMvp {
  id: string;
  nhan: string;
  sql: string;
  cot: { ten: string; kieu: 'TEXT' | 'INTEGER' }[];
  nguonId: string;
  tongHop: boolean;
  soDong: number;
}

export interface GhiChuTruyVanMvp {
  id: string;
  nhan: string;
  cot: string;
  giaTri: string[];
  nguonId: string;
}

/** Bốn màu đầu ghim: đỏ (mặc định), xanh dương, lục, tím. */
export type MauGhimMvp = 'do' | 'xanh' | 'luc' | 'tim';
export const MAU_GHIM: readonly MauGhimMvp[] = ['do', 'xanh', 'luc', 'tim'];

export interface NhacViecMvp {
  nhanVat: string;
  bieuCam?: string;
  text: string;
}

export interface TrangThaiMvp {
  phienBan: 1;
  /** Mốc bắt đầu ván (ms) — khóa phiên, dùng làm khóa xáo lựa chọn. */
  batDauLuc: number;
  /**
   * Tên người chơi tự gõ / xúc xắc ở `[TẠO NHÂN VẬT ten]` (rỗng tới lúc đó; ô lưu cũ có sẵn 'Khôi').
   * Chỉ nằm trong trạng thái (Lưu/Nạp) — KHÔNG ghi vào telemetry (QĐ-077).
   */
  tenNguoiChoi: string;
  /** Ngành chọn ở `[TẠO NHÂN VẬT nganh]` (chữ đúng như danh sách `lựa chọn:`); rỗng tới lúc đó. */
  nganh: string;

  giaiDoan: GiaiDoanMvp;
  /** Vụ sau đang chơi (`lich.vuSau[].id`, giai đoạn `vu-sau`). Không có / `null` = vụ gốc. Ô lưu cũ: không có trường. */
  vu?: string | null;
  /** Ngày điều tra hiện tại (1–5); 0 khi chưa vào ngày. */
  ngay: number;
  /** Chỉ số khung giờ đang đứng (0 = Sáng … 2 = Chiều); bằng số khung của lịch (3) = đã hết khung → buổi tối. */
  khung: number;
  /** Dữ kiện chính của ngày đã đạt. */
  chinhXong: boolean;
  /** Địa điểm đã trả phí "vào" trong ngày (phòng máy: vào 1, bên trong 0). */
  daVaoHomNay: string[];
  /** Cảnh đang hiển thị (giữ khi đứng ở danh sách địa điểm để nền không nhảy). */
  canh: string;

  conTro: ConTroMvp | null;
  /**
   * Cảnh `[KHÁM PHÁ]` đang mở: con trỏ của nút khám phá (để quay về khi chuỗi của một chỗ bấm hết nút) và các chuỗi đã
   * xem. `[ĐI TỚI]` / "đi tới" rời cảnh (xóa trường này). Không có trường (ô lưu cũ) = `null`.
   */
  khamPha?: KhamPhaMvp | null;
  /** Dữ kiện đang làm (chuỗi hoặc thử thách); ghi nhận khi xong. */
  duKienDangLam: string | null;
  /** Thử thách đang mở từ dữ kiện kiểu `Thử thách:` (không nằm trong chuỗi). */
  thuThachDangLam: string | null;
  duKienDaLam: string[];

  hoSo: HoSoMvp;
  /** Bảng điều tra; ô lưu cũ không có trường này = bảng chưa ai kéo, chưa có sợi chỉ ghi lại. */
  bang?: BangGhimLuuMvp;
  /** Nhân vật đã hiện màn "Nhân vật mới" (theo thứ tự gặp) — cũng là danh sách tab Nhân vật. Ô lưu cũ: không có = []. */
  daGioiThieu?: string[];
  co: string[];
  /** Trang sổ đã vào sổ cá nhân (`[GHI SỔ]`, tự ghi — QĐ-092), theo thứ tự học. */
  soTay: string[];
  thuThachXong: string[];

  /** Vạch uy tín còn lại ở buổi họp (`lich.luat.uyTin`; 0 khi lịch không có). */
  uyTin: number;
  soLanMatVach: number;
  hoiDap: HoiDapMvp | null;
  /** Số lần đã thử mỗi câu hỏi / chọn dòng / lọc thử / chép sổ (id → lần). */
  lanThu: Record<string, number>;

  /** Tài liệu chờ hiện (do dữ kiện `Hiện tài liệu:`), hiện xong mới chạy `sauKhiHien`. */
  choHienTaiLieu: string[];
  sauKhiHien: 'sau-du-kien' | 'sau-toi' | null;

  nhiemVu: string | null;
  /**
   * Việc đang làm do một nhân vật nhắc (`> NHẮC VIỆC <ai>: …`), hiện kèm ảnh mặt ở góc sân khấu. `[NHIỆM VỤ]` mới → xóa.
   * Ô lưu cũ không có trường này = không có.
   */
  nhacViec?: NhacViecMvp | null;
  /**
   * `[ĐỐI CHẤT]` đang mở: các thẻ đã trình (mờ đi, không trình lại) và mức cao nhất đã đạt. Mức đạt cũng được ghi thành
   * cờ `<mã>-du` / `<mã>-ho-tro` trong `co` để `[ĐIỀU KIỆN]` dùng. Rời nút → `null`. Ô lưu cũ: không có.
   */
  doiChat?: { id: string; daTrinh: string[]; muc: 'khong' | 'goi-y' | 'ho-tro' | 'du' } | null;
  ketQua: 'that' | 'thuong' | null;
  /** Nội dung không nhất quán lúc chạy (chuỗi không tồn tại…); khung nhìn `error`. */
  loi: string | null;
}
