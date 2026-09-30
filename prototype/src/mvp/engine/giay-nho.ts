/**
 * Giá trị dùng được ở phòng máy (QĐ-092): mỗi giấy nhớ / bằng chứng trong hồ sơ có dòng "Giá trị cho trình dựng"
 * (thẻ hồ sơ) hoặc dòng con cùng tên của vật chứng thẻ thử thách. "Báo chí · K24" → hai giá trị.
 */
import type { KichBanMvp } from '../../content/mvp/types';
import type { HoSoMvp } from './trang-thai';

export interface GiaTriHoSo {
  khoa: string;
  giaTri: string;
  /** Tên thẻ (tiêu đề giấy nhớ / bằng chứng) để hiện kèm. */
  nguon: string;
}

export function giaTriTuHoSo(kb: KichBanMvp, hoSo: HoSoMvp): GiaTriHoSo[] {
  const ra: GiaTriHoSo[] = [];
  for (const id of [...hoSo.manhMoi, ...hoSo.bangChung]) {
    const the = kb.hoSo[id];
    const tuThe = (the?.fields['Giá trị cho trình dựng'] ?? '')
      .split('·')
      .map((x) => x.trim())
      .filter((x) => x !== '');
    const vat = Object.values(kb.thuThach).find((t) => t.vatChung?.id === id)?.vatChung;
    const ds = tuThe.length > 0 ? tuThe : (vat?.giaTri ?? []);
    const nguon = the?.heading ?? vat?.title ?? id;
    ds.forEach((g, i) => ra.push({ khoa: `${id}#${i}`, giaTri: g, nguon }));
  }
  return ra;
}
