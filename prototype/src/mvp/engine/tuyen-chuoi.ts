/**
 * Mỗi chuỗi thuộc TUYẾN nào (vụ chính `vu1`, `vu2`… hay việc phụ `so-phong`, `micro`…), và mỗi tuyến mở những thẻ hồ sơ nào
 * (manh mối, tài liệu, bằng chứng — kể cả bằng chứng lưu từ màn tra). Dùng cho luật tô màu (story-highlight.ts, user 04/10/2026):
 * tô = thứ sẽ vào hồ sơ của tuyến đang chơi.
 *
 * Cách tính: đi từ chuỗi đầu của từng tuyến (Vụ 1 thêm các ngày điều tra, buổi họp, hai kết; vụ sau / việc phụ lấy ở lich.md),
 * theo mọi chỗ trong nút trỏ tới một chuỗi khác, không đi sang chuỗi đầu của tuyến khác. Tuyến nào tới trước thì giữ.
 */
import type { KichBanMvp } from '../../content/mvp/types';

export interface TuyenChuoi {
  /** mã chuỗi → mã tuyến */
  tuyenCua: Map<string, string>;
  /** mã tuyến → (mã thẻ → chữ của thẻ, viết thường, NFC) */
  theCua: Map<string, Map<string, string>>;
  /** Các tuyến là việc phụ. */
  viecPhu: Set<string>;
}

const chuan = (s: string): string => s.normalize('NFC').toLocaleLowerCase('vi');
const boNho = new WeakMap<KichBanMvp, TuyenChuoi>();

export function tuyenChuoi(kb: KichBanMvp): TuyenChuoi {
  const daCo = boNho.get(kb);
  if (daCo) return daCo;
  const ids = new Set(kb.chuoi.map((c) => c.id));
  const theoId = new Map(kb.chuoi.map((c) => [c.id, c]));
  const vu1Them = [...kb.lich.ngay.map((n) => n.chuoi), kb.lich.ngayHop?.chuoi, kb.lich.ket?.that, kb.lich.ket?.thuong].filter((x): x is string => !!x);
  const dau = [
    { tuyen: 'vu1', chuoi: [kb.lich.chuoiDau, ...vu1Them] },
    ...(kb.lich.vuSau ?? []).map((v) => ({ tuyen: v.id, chuoi: [v.chuoi] })),
    ...(kb.lich.nhiemVuPhu ?? []).map((v) => ({ tuyen: v.id, chuoi: [v.chuoi] })),
  ];
  const chuoiDau = new Set(dau.map((d) => d.chuoi[0]));
  const tuyenCua = new Map<string, string>();
  const theCua = new Map<string, Map<string, string>>();
  for (const d of dau) {
    const the = theCua.get(d.tuyen) ?? new Map<string, string>();
    theCua.set(d.tuyen, the);
    const hang = [...d.chuoi];
    while (hang.length) {
      const id = hang.shift() as string;
      if (tuyenCua.has(id)) continue;
      tuyenCua.set(id, d.tuyen);
      const c = theoId.get(id);
      if (!c) continue;
      JSON.stringify(c.nodes, (_k, v: unknown) => {
        if (typeof v !== 'string') return v;
        if (ids.has(v) && v !== id && !(chuoiDau.has(v) && v !== d.chuoi[0])) hang.push(v);
        const hs = kb.hoSo[v];
        if (hs) the.set(v, chuan([hs.heading, ...Object.values(hs.fields), ...Object.values(hs.quotes).flat()].join(' ')));
        const vc = kb.thuThach[v]?.vatChung;
        if (vc) the.set(vc.id, chuan([vc.title, vc.description, ...vc.giaTri].join(' ')));
        return v;
      });
    }
  }
  const kq = { tuyenCua, theCua, viecPhu: new Set((kb.lich.nhiemVuPhu ?? []).map((v) => v.id)) };
  boNho.set(kb, kq);
  return kq;
}
