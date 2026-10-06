/**
 * HAI CÂU HỎI ĐẦU VÁN (gói B17, docs/mua-1/brief/b17-hai-cau-hoi-dau-van.md) — luật thuần, không React.
 *
 * Người chơi bộ mùa 1 chọn hai mức sau khi bấm "Chơi mới" (đổi được trong Cài đặt), lưu cùng ván (`TrangThaiMvp.mucNhapVai`,
 * `mucSql`). Bộ MVP không có hai trường, chạy như cũ.
 *
 *   - Mức nhập vai (`MucNhapVaiMvp`): "Có người dẫn" (`dan`) / "Tự dò" (`tu-do`) / "Như thật" (`that`) quyết định dấu trên ghim và
 *     điểm bấm (`dauTheoMuc`), cách hỏi nhân chứng MẶC ĐỊNH (`CACH_HOI_THEO_MUC`; ba nút trong khung hỏi vẫn đổi tại chỗ) và bạn
 *     đi cùng có tự lên tiếng không (`tuGoiY`, `giayNhacDan`).
 *   - Mức SQL (`MucSqlMvp`): "Ghép khối" (`ghep`) / "Ghép khối, chữ SQL" (`ghep-sql`) / "Tự viết" (`tu-viet`) quyết định màn tra
 *     (giao diện ghép, cùng giao diện nhưng nhãn là từ khóa SQL, hay ô gõ SQL tự do; xem `nhan-man-tra.ts`).
 *
 * Ô lưu cũ không có hai trường: coi như "Tự dò" + "Ghép khối". Máy tự chơi, điểm nhảy, công cụ quay ván dùng `taoTrangThai` nên
 * cũng là mặc định ấy (màn hỏi chỉ là giao diện, không chặn máy).
 */
import type { CachChoiMvp, MucNhapVaiMvp, MucSqlMvp, TrangThaiMvp } from './trang-thai';

export const MUC_NHAP_VAI: readonly MucNhapVaiMvp[] = ['dan', 'tu-do', 'that'];
export const MUC_SQL: readonly MucSqlMvp[] = ['ghep', 'ghep-sql', 'tu-viet'];
export const MUC_NHAP_VAI_MAC_DINH: MucNhapVaiMvp = 'tu-do';
export const MUC_SQL_MAC_DINH: MucSqlMvp = 'ghep';

export function laMucNhapVai(x: unknown): x is MucNhapVaiMvp {
  return typeof x === 'string' && (MUC_NHAP_VAI as readonly string[]).includes(x);
}
export function laMucSql(x: unknown): x is MucSqlMvp {
  return typeof x === 'string' && (MUC_SQL as readonly string[]).includes(x);
}

/** Mức nhập vai của ván (thiếu = "Tự dò"). */
export function mucNhapVaiCua(s: Pick<TrangThaiMvp, 'mucNhapVai'>): MucNhapVaiMvp {
  return s.mucNhapVai ?? MUC_NHAP_VAI_MAC_DINH;
}
/** Mức SQL của ván (thiếu = "Ghép khối"). */
export function mucSqlCua(s: Pick<TrangThaiMvp, 'mucSql'>): MucSqlMvp {
  return s.mucSql ?? MUC_SQL_MAC_DINH;
}

/** Cách hỏi nhân chứng mặc định của từng mức: "Xem cả đoạn" / "Bấm câu hỏi" / "Gõ câu hỏi". */
export const CACH_HOI_THEO_MUC: Readonly<Record<MucNhapVaiMvp, CachChoiMvp>> = { dan: 'tu-dong', 'tu-do': 'bam', that: 'go' };

/** Dấu nào hiện ở cảnh khám phá theo mức (bảng "Luật từng nấc" của đề bài). */
export interface DauTheoMuc {
  /** Dấu "!" / "?" trên ghim bản đồ. */
  ghim: boolean;
  /** Dấu "!" / "?" trên người trong cảnh. */
  nguoi: boolean;
  /** Dấu "!" / "?" và viền sáng trên vật trong cảnh (điểm thường, chi tiết ẩn có dấu). */
  vat: boolean;
  /** Một chấm nhỏ tĩnh trên MỌI vật bấm được, kể cả chi tiết ẩn (ngoại lệ duy nhất của quyết định 05/10: chỉ nấc "Có người dẫn"). */
  cham: boolean;
}
const DAU: Readonly<Record<MucNhapVaiMvp, DauTheoMuc>> = {
  dan: { ghim: true, nguoi: true, vat: true, cham: true },
  'tu-do': { ghim: true, nguoi: true, vat: false, cham: false },
  that: { ghim: false, nguoi: false, vat: false, cham: false },
};
export function dauTheoMuc(muc: MucNhapVaiMvp): DauTheoMuc {
  return DAU[muc];
}

/**
 * Bạn đi cùng có TỰ lên tiếng không (sau hai lần trượt ở buổi hỏi / màn tra, chạy sai mà không ai nói gì, bấm nhầm ô hai lần).
 * "Như thật": chỉ khi người chơi bấm ảnh mặt; bậc 2 vẫn chỉ hiện sau bậc 1 (bộ đếm bậc không đổi).
 */
export function tuGoiY(muc: MucNhapVaiMvp): boolean {
  return muc !== 'that';
}

/** "Có người dẫn": ở cảnh có việc chính mà ngần này mili giây không bấm gì thì bạn đi cùng nhắc việc (bậc 1). Mức khác: `null`. */
export function giayNhacDan(muc: MucNhapVaiMvp): number | null {
  return muc === 'dan' ? 40_000 : null;
}

/**
 * Đặt hai mức (câu hỏi đầu ván, menu Cài đặt). Đổi mức nhập vai thì cách hỏi mặc định mới áp ngay: quên cách đã đổi tại chỗ
 * (`cachChoi`). Không đổi gì thì trả đúng trạng thái cũ.
 */
export function datMuc(s: TrangThaiMvp, muc: { nhapVai?: MucNhapVaiMvp; sql?: MucSqlMvp }): TrangThaiMvp {
  let moi = s;
  if (muc.nhapVai !== undefined && laMucNhapVai(muc.nhapVai) && s.mucNhapVai !== muc.nhapVai) {
    moi = { ...moi, mucNhapVai: muc.nhapVai };
    if (moi.cachChoi !== undefined) {
      const { cachChoi: _bo, ...conLai } = moi;
      void _bo;
      moi = conLai;
    }
  }
  if (muc.sql !== undefined && laMucSql(muc.sql) && s.mucSql !== muc.sql) moi = { ...moi, mucSql: muc.sql };
  return moi;
}

/**
 * Đóng một buổi hỏi ở ván có mức nhập vai: cách đổi tại chỗ trong khung hỏi chỉ áp cho buổi ấy, buổi sau lại theo mức. Ván không
 * có mức (bộ MVP, ô lưu cũ, test đặt cách một lần rồi chơi cả vụ) thì giữ như B12 (lưu cùng ván).
 */
export function quenCachTamThoi(s: TrangThaiMvp): TrangThaiMvp {
  if (s.mucNhapVai === undefined || s.cachChoi === undefined) return s;
  const { cachChoi: _bo, ...conLai } = s;
  void _bo;
  return conLai;
}
