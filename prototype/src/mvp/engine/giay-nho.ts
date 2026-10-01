/**
 * Giá trị dùng được ở phòng máy (QĐ-092): mỗi giấy nhớ / bằng chứng trong hồ sơ có dòng "Giá trị cho trình dựng"
 * (thẻ hồ sơ) hoặc dòng con cùng tên của vật chứng thẻ thử thách. "Báo chí · K24" → hai giá trị.
 */
import type { KichBanMvp } from '../../content/mvp/types';
import type { GhiChuTruyVanMvp, HoSoMvp } from './trang-thai';

export interface GiaTriHoSo {
  khoa: string;
  giaTri: string;
  /** Tên thẻ (tiêu đề giấy nhớ / bằng chứng) để hiện kèm. */
  nguon: string;
  /** Mã thẻ trên bảng điều tra mà giá trị này thuộc về (để vẽ sợi chỉ). */
  the: string;
  /** Phiếu kết quả mang nhiều giá trị (vd hai lớp): kéo cả phiếu vào ô → "là một trong". */
  nhieu?: string[];
}

/**
 * `boGhim`: thẻ người chơi đã gỡ khỏi bảng điều tra (`s.bang.boGhim`) — không thành giấy nhớ quanh màn hình (chỉ thẻ đang
 * ghim trên bảng mới kéo được vào truy vấn; sang vụ sau, thẻ vụ trước được gỡ sẵn nên màn tra không đầy giấy cũ).
 */
export function giaTriTuHoSo(kb: KichBanMvp, hoSo: HoSoMvp, ghiChu: readonly GhiChuTruyVanMvp[] = [], boGhim: readonly string[] = []): GiaTriHoSo[] {
  const ra: GiaTriHoSo[] = [];
  for (const id of [...hoSo.manhMoi, ...hoSo.bangChung]) {
    if (boGhim.includes(id)) continue;
    const the = kb.hoSo[id];
    const tuThe = (the?.fields['Giá trị cho trình dựng'] ?? '')
      .split('·')
      .map((x) => x.trim())
      .filter((x) => x !== '');
    const vat = Object.values(kb.thuThach).find((t) => t.vatChung?.id === id)?.vatChung;
    const ds = tuThe.length > 0 ? tuThe : (vat?.giaTri ?? []);
    const nguon = the?.heading ?? vat?.title ?? id;
    // Phiếu kết quả của một lần tra (vật chứng thẻ thử thách) là MỘT giấy: các giá trị cùng loại, đi cùng nhau.
    if (tuThe.length === 0 && ds.length > 1) ra.push({ khoa: `${id}#0`, giaTri: ds.join(', '), nguon, the: id, nhieu: ds });
    else ds.forEach((g, i) => ra.push({ khoa: `${id}#${i}`, giaTri: g, nguon, the: id }));
  }
  // Notes tự trích từ kết quả nhỏ dùng lại đúng khay giấy nhớ, nhưng không nhập vào hồ sơ/bằng chứng.
  for (const note of ghiChu) {
    if (note.giaTri.length === 0) continue;
    const value = { khoa: `${note.id}#0`, giaTri: note.giaTri.join(', '), nguon: `${note.nhan} · ${note.cot}`, the: note.id };
    ra.push(note.giaTri.length > 1 ? { ...value, nhieu: note.giaTri } : value);
  }
  return ra;
}
