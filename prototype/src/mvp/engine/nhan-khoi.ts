/**
 * NHÃN KHỐI TIẾNG VIỆT Ở MÀN TRA (gói B21, user 09/10/2026): câu SQL GIỮ tên ASCII (`SELECT ten, ma_lop FROM sinh_vien`), chỉ CHỮ HIỆN
 * TRÊN KHỐI đổi sang tiếng Việt có dấu — khối cột `ma_sv` hiện "Mã sinh viên", khối bảng `sinh_vien` hiện "Sinh viên". Nhãn khai ở
 * `du-lieu.md` (`{bảng · nhãn: Sinh viên}`, `- Nhãn: ma_sv=Mã sinh viên, …`). Câu SQL hiện bên dưới, ô gõ tay, bảng xem trước vẫn là
 * tên thật. Nấc "Ghép khối, chữ SQL" và "Tự viết" học đúng chữ SQL nên không đổi nhãn. Thiếu nhãn thì giữ tên thật.
 */
import type { BoDuLieuMvp } from '../../content/mvp/types';
import type { MucSqlMvp } from './trang-thai';

export interface NhanKhoiMvp {
  /** Chữ trên khối bảng. */
  bang: (ten: string) => string;
  /** Chữ trên khối cột; có `bang` thì tìm nhãn ở bảng ấy trước, không thì ở bảng nào có cột ấy. */
  cot: (ten: string, bang?: string) => string;
}

const GIU_TEN: NhanKhoiMvp = { bang: (t) => t, cot: (t) => t };

export function nhanKhoi(duLieu: BoDuLieuMvp | null | undefined, muc: MucSqlMvp | undefined): NhanKhoiMvp {
  if (!duLieu || (muc !== undefined && muc !== 'ghep')) return GIU_TEN;
  if (!duLieu.bang.some((b) => b.nhan || b.nhanCot)) return GIU_TEN;
  return {
    bang: (ten) => duLieu.bang.find((b) => b.ten === ten)?.nhan ?? ten,
    cot: (ten, bang) => {
      const rieng = bang ? duLieu.bang.find((b) => b.ten === bang)?.nhanCot?.[ten] : undefined;
      return rieng ?? duLieu.bang.find((b) => b.nhanCot?.[ten] !== undefined)?.nhanCot?.[ten] ?? ten;
    },
  };
}
