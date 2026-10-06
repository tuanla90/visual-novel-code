/**
 * BẢN NHÁP CỦA MÀN TRA (gói B13): câu người chơi đang soạn ở màn tra v7, giữ khi người chơi lùi về bảng điều tra hay rời hẳn về
 * cảnh (phòng CLB) rồi quay lại. Chỉ sống trong bộ nhớ của trang (không vào ô lưu): nạp ván hay tải lại trang thì màn tra mở
 * như mới, phiếu đã ghim vẫn nằm trong trạng thái ván như trước.
 *
 * Khóa do `PhongTraMvp` đặt: `<batDauLuc của ván>:<mã thẻ thử thách>` — ván mới không thấy nháp của ván cũ.
 */
import type { CauDung } from '../../engine/trinh-dung';

export interface NhapManTra {
  cau: CauDung;
  cotLay: string[];
  bangGocChon: string | null;
  daChonBang: boolean;
  /** Gói B17, nấc "Tự viết": câu SQL người chơi đang gõ. */
  goSql?: string;
}

const NHAP = new Map<string, NhapManTra>();

export function layNhapManTra(khoa: string | undefined): NhapManTra | undefined {
  return khoa ? NHAP.get(khoa) : undefined;
}

export function ghiNhapManTra(khoa: string | undefined, nhap: NhapManTra): void {
  if (khoa) NHAP.set(khoa, nhap);
}

export function boNhapManTra(khoa: string | undefined): void {
  if (khoa) NHAP.delete(khoa);
}
