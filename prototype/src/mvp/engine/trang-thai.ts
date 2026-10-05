/**
 * TRẠNG THÁI RUNTIME MVP (gói kien-truc-mvp, QĐ-077/086/089/090).
 *
 * Toàn bộ tiến độ một ván MVP nằm trong MỘT đối tượng thuần JSON — đủ để Lưu/Nạp bằng `structuredClone`
 * hay JSON.stringify. Không tham chiếu tới dữ liệu kịch bản (chỉ giữ mã); mọi phép suy ra (khung nhìn,
 * địa điểm mở được…) làm trong `may.ts` từ `KichBanMvp` + trạng thái.
 *
 * Tách hẳn với `src/story/engine/state.ts` của prototype: hai bản không dùng chung kiểu, store hay khóa lưu.
 */
import type { TriNhoDongHanhMvp } from './tri-nho-dong-hanh';
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
  /**
   * Cảnh khám phá bên ngoài (03/10/2026): bấm ghim bản đồ → tới nơi lại có cảnh khám phá của nơi đó. Xong cảnh trong thì về
   * lại cảnh ngoài (bản đồ) thay vì mất luôn. `[ĐI TỚI]` vẫn bỏ cả chồng.
   */
  cha?: KhamPhaMvp | null;
  /**
   * Gói B13 (điều hướng tự do, bộ mùa 1): chuỗi của chỗ bấm đang chạy (chỗ người chơi bấm gần nhất). Buổi hỏi rời sớm có thể
   * gỡ chỗ đó khỏi `daXem`; trường này vẫn giữ để màn tra mở sau đó biết lùi về đúng chỗ nào.
   */
  dangXem?: string;
}

/**
 * Gói B13: việc dở gắn với một chỗ bấm (khóa = chuỗi của chỗ bấm) — bấm lại chỗ đó thì chạy tiếp từ đây thay vì từ đầu chuỗi.
 *   - `trong`: rời một nơi trên bản đồ khi việc chính chưa xong → cảnh khám phá của nơi đó (không kèm `cha`) với các chỗ đã xem;
 *   - `quaNhay`: rời màn tra mở qua `[ĐI TỚI]` từ chuỗi của chỗ bấm (cảnh khám phá đã đóng lúc nhảy).
 */
export interface DangDoMvp {
  conTro: ConTroMvp;
  trong?: KhamPhaMvp | null;
  quaNhay?: boolean;
}

export type GiaiDoanMvp = 'mo-dau' | 'ngay' | 'hop' | 'het' | 'vu-sau' | 'phu';

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

/** Năm màu đầu ghim: đỏ (trọng tâm), cam (chưa xác định), xanh (tham chiếu), lục (xác thực), tím (nghi vấn). */
export type MauGhimMvp = 'do' | 'cam' | 'xanh' | 'luc' | 'tim';
export const MAU_GHIM: readonly MauGhimMvp[] = ['do', 'cam', 'xanh', 'luc', 'tim'];

export interface NhacViecMvp {
  nhanVat: string;
  bieuCam?: string;
  text: string;
}

// ---------- Hỏi nhân chứng (gói B12, src/mvp/engine/hoi-dap.ts) ----------

/** Ba cách chơi cảnh hỏi nhân chứng: xem cả đoạn viết sẵn / bấm câu hỏi mẫu / gõ câu hỏi. Thiết lập của người chơi. */
export type CachChoiMvp = 'tu-dong' | 'bam' | 'go';

/** Tiến độ hỏi một tờ dữ kiện, giữ qua các lần gặp (lưu cùng ván). */
export interface TienDoHoiDapMvp {
  /** Mã dữ kiện đã hỏi ra, theo thứ tự. */
  biet: string[];
  /** Bậc gợi ý đã hiện cho từng dữ kiện (1, 2). */
  bacGoiY: Record<string, number>;
  /** Vị trí xoay vòng lời theo lớp (ý định chung, chủ đề không biết, lời từ chối). */
  xoay: Record<string, number>;
  /** Số câu đã tính lượt kể từ lần nạp lại gần nhất (giới hạn số câu); làm việc khác trong cảnh thì về 0. */
  luot: number;
}

/** Một dòng trong khung hỏi đáp. `ai`: `player`, `narrator`, mã nhân chứng. */
export interface DongHoiDapMvp {
  ai: string;
  chu: string;
  /** Câu người chơi: lớp máy xếp vào, điểm, nguồn (gõ / bấm). */
  lop?: string;
  diem?: number;
  nguon?: 'go' | 'bam' | 'ke';
  /** Lời nhân chứng: biến thể đã chọn, dữ kiện vừa hỏi ra. */
  bienThe?: string;
  moi?: string;
}

/** Bóng thoại của bạn đi cùng ở góc phải. */
export interface BongDiCungMvp {
  kieu: 'goi-y-1' | 'goi-y-2' | 'du' | 'giu-lai' | 'roi-di-du' | 'roi-di-thieu';
  ai: string;
  /** Lời bạn đi cùng; gợi ý bậc 2 không có lời dẫn riêng (giao diện tự đặt), chỉ có `cauHoi`. */
  loi: string | null;
  /** Gợi ý bậc 2: câu hỏi bấm được (gửi `hoi-dap-hoi` với `lop` = dữ kiện). */
  cauHoi?: string;
  duKien?: string;
  /** Giữ lại: dòng còn thiếu trong sổ. */
  dongThieu?: string;
}

/** Buổi hỏi đang mở (con trỏ đứng ở nút `[HỎI ĐÁP ma]`). */
export interface BuoiHoiMvp {
  ma: string;
  nhatKy: DongHoiDapMvp[];
  /** Số câu liền nhau không ra dữ kiện mới (cách gõ: hai câu là bạn đi cùng gợi ý). */
  truot: number;
  /** Bạn đi cùng đã giữ lại một lần trong buổi này. */
  daGiu: boolean;
  /** Hết lượt hỏi: chỉ còn rời đi hoặc "xem cả đoạn". */
  dong: boolean;
  /** Đã chào đi: khung còn hiện lời cuối, `tiep` thì đóng hẳn. */
  daRoi: boolean;
  bong: BongDiCungMvp | null;
}

/**
 * Các trường riêng của một tuyến truyện, dùng để cất rồi khôi phục đúng cảnh đang chơi. Có cả bảng điều tra của tuyến
 * (`bang`, vì vào tuyến khác là gỡ hết thẻ) và mã các thẻ trong hồ sơ lúc cất (`hoSoCo`): thẻ nhận thêm ở tuyến kia khi về
 * nằm trong ngăn gỡ ghim, không chen lên bảng.
 */
export type TiepTucTuyenMvp = Pick<TrangThaiMvp, 'conTro' | 'canh' | 'nhiemVu' | 'nhacViec' | 'thuThachDangLam' | 'duKienDangLam' | 'hoiDap' | 'buoiHoi' | 'daThayLoi' | 'khamPha' | 'canhLui' | 'doiChat' | 'choHienTaiLieu' | 'sauKhiHien' | 'bang' | 'ngayThang'> & {
  hoSoCo?: string[];
};
export interface TuyenPhuMvp {
  id: string;
  veLai: ConTroMvp | null;
  giaiDoan: GiaiDoanMvp;
  tuyenVeLai?: TiepTucTuyenMvp | null;
  tamDung?: TiepTucTuyenMvp | null;
}

export interface TrangThaiMvp {
  phienBan: 1;
  /** Mốc bắt đầu ván (ms) — khóa phiên, dùng làm khóa xáo lựa chọn. */
  batDauLuc: number;
  triNhoDongHanh?: TriNhoDongHanhMvp;
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
  /**
   * Nhiệm vụ phụ đang làm hoặc đã cất: mã, điểm quay về tuyến đang chơi và trạng thái có thể tiếp tục từ đúng cảnh. Không
   * có / `null` = chưa nhận việc phụ.
   */
  phu?: TuyenPhuMvp | null;
  /** Các tuyến phụ khác đã nhận và cất lại để có thể luân phiên nhiều tuyến. */
  phuCho?: TuyenPhuMvp[];
  /** Ngày điều tra hiện tại (1–5); 0 khi chưa vào ngày. */
  ngay: number;
  /** Ngày tháng hiện tại trong truyện (YYYY-MM-DD) đặt bằng [NGÀY ...]; null = dùng ngày tính từ mở đầu. */
  ngayThang?: string | null;
  /** Chỉ số khung giờ đang đứng (0 = Sáng … 2 = Chiều); bằng số khung của lịch (3) = đã hết khung → buổi tối. */
  khung: number;
  /** Dữ kiện chính của ngày đã đạt. */
  chinhXong: boolean;
  /** Địa điểm đã trả phí "vào" trong ngày (phòng máy: vào 1, bên trong 0). */
  daVaoHomNay: string[];
  /** Cảnh đang hiển thị (giữ khi đứng ở danh sách địa điểm để nền không nhảy). */
  canh: string;
  /**
   * Nhân vật đã rời dàn chân dung của cảnh đang đứng (`[RA <mã>]` trong khung; `player` = người chơi đứng ngoài quan sát).
   * Người đó nói lại, `[VÀO <mã>]`, hoặc đổi cảnh thì hết hiệu lực.
   */
  raDan?: string[];

  conTro: ConTroMvp | null;
  /**
   * Cảnh `[KHÁM PHÁ]` đang mở: con trỏ của nút khám phá (để quay về khi chuỗi của một chỗ bấm hết nút) và các chuỗi đã
   * xem. `[ĐI TỚI]` / "đi tới" rời cảnh (xóa trường này). Không có trường (ô lưu cũ) = `null`.
   */
  khamPha?: KhamPhaMvp | null;
  /**
   * Gói B13 (bộ mùa 1): cảnh khám phá vừa đóng vì `[ĐI TỚI]` / "đi tới" từ chuỗi của một chỗ bấm. Màn tra mở sau cú nhảy đó lùi
   * về cảnh này được ("Về phòng CLB"). Cú nhảy khác (không từ chỗ bấm), sang ngày, mở cảnh mới thì xóa. Thiếu = không có.
   */
  canhLui?: KhamPhaMvp | null;
  /** Gói B13: việc dở theo chuỗi chỗ bấm (xem `DangDoMvp`). Thiếu = không có. */
  dangDo?: Record<string, DangDoMvp>;
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
  /** Nhân vật đã nói chuyện với người chơi ít nhất một câu (thứ tự gặp) — bản đồ dùng để hiện ảnh mặt người đã biết lịch. Ô lưu cũ: không có = []. */
  daNoi?: string[];
  /** Chuỗi của mọi chỗ đã bấm ở `[KHÁM PHÁ]` trong cả ván (khác `khamPha.daXem` chỉ sống trong một cảnh) — tổng kết đếm chuyện ẩn. Ô lưu cũ: không có = []. */
  daXemDiem?: string[];
  co: string[];
  /** Trang sổ đã vào sổ cá nhân (`[GHI SỔ]`, tự ghi — QĐ-092), theo thứ tự học. */
  soTay: string[];
  thuThachXong: string[];

  /** Vạch uy tín còn lại ở buổi họp (`lich.luat.uyTin`; 0 khi lịch không có). */
  uyTin: number;
  soLanMatVach: number;
  hoiDap: HoiDapMvp | null;
  /** Thiết lập cách chơi cảnh hỏi nhân chứng (gói B12). Thiếu = 'go' (gõ câu hỏi). Lưu cùng tiến trình. */
  cachChoi?: CachChoiMvp;
  /** Buổi hỏi nhân chứng đang mở; ô lưu cũ không có = không có. */
  buoiHoi?: BuoiHoiMvp | null;
  /** Tiến độ hỏi theo mã tờ dữ kiện (điều đã hỏi ra giữ qua các lần gặp và khi đổi cách chơi). */
  tienDoHoiDap?: Record<string, TienDoHoiDapMvp>;
  /**
   * Chuỗi vừa có buổi hỏi (cách bấm / gõ) thay lời viết sẵn, tờ khai `loiDaThay`: chạy tiếp chuỗi này thì máy bỏ qua các
   * dòng lời ấy và hậu quả mở manh mối mà danh sách đã lo. Gặp lại một `[HỎI ĐÁP]` thì xóa. Thiếu / `null` = không có.
   */
  daThayLoi?: string | null;
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
  doiChat?: { id: string; daTrinh: string[]; muc: 'khong' | 'goi-y' | 'ho-tro' | 'du'; /** Số lần trình thẻ không liên quan. */ sai?: number } | null;
  ketQua: 'that' | 'thuong' | null;
  /** Nội dung không nhất quán lúc chạy (chuỗi không tồn tại…); khung nhìn `error`. */
  loi: string | null;
}
