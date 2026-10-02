/**
 * ẢNH CHO BẢN MVP: nền cảnh và chân dung tra theo TÊN TỆP trong `src/assets/**` (không qua hệ ô ảnh của
 * prototype — `visuals/art-slots.ts` chỉ biết nhân vật/cảnh trong `shared/ids.ts`, tệp "đóng băng").
 *
 * Quy ước tên (art/mvp-vu1, đã chép vào src/assets/mvp/):
 *   - nền: `bg-mvp-<mã cảnh>.webp`, bản tối `bg-mvp-<mã cảnh>-dem.webp` (cảnh cuối ngày ở nơi có ảnh tối);
 *   - chân dung: `char-<mã nhân vật>-<biểu cảm>` → `char-<mã>-anchor` (prototype) → `char-<mã>` (art/mvp-vu1).
 * Không có tệp → `undefined`, nơi dùng tự vẽ tạm. Đuôi ưu tiên: webp > png > jpg > jpeg.
 */
const TEP = import.meta.glob('/src/assets/**/*.{webp,png,jpg,jpeg,WEBP,PNG,JPG,JPEG}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const DUOI = ['webp', 'png', 'jpg', 'jpeg'];

/** Tên tệp (không đuôi, viết thường) → URL; trùng tên thì đuôi ưu tiên trước. */
export function lapChiMuc(tep: Record<string, string>): Map<string, string> {
  const hang = new Map<string, number>();
  const chiMuc = new Map<string, string>();
  for (const [duongDan, url] of Object.entries(tep)) {
    const ten = (duongDan.split(/[\\/]/).pop() ?? '').toLowerCase();
    const m = /^(.+)\.([a-z0-9]+)$/.exec(ten);
    if (!m) continue;
    const goc = m[1] ?? '';
    const h = DUOI.indexOf(m[2] ?? '');
    if (h < 0) continue;
    const cu = hang.get(goc);
    if (cu === undefined || h < cu) {
      hang.set(goc, h);
      chiMuc.set(goc, url);
    }
  }
  return chiMuc;
}

const CHI_MUC = lapChiMuc(TEP);

export function anhTheoTen(ten: string, chiMuc: ReadonlyMap<string, string> = CHI_MUC): string | undefined {
  return chiMuc.get(ten.toLowerCase());
}

/** URL nền của một cảnh; `dem` = ưu tiên bản tối nếu có. */
export function anhNen(canh: string, dem = false, chiMuc: ReadonlyMap<string, string> = CHI_MUC): string | undefined {
  if (dem) {
    const toi = anhTheoTen(`bg-mvp-${canh}-dem`, chiMuc);
    if (toi) return toi;
  }
  return anhTheoTen(`bg-mvp-${canh}`, chiMuc);
}

/** Nơi có ảnh tối riêng (`bg-mvp-<cảnh>-dem`)? Không có → dùng ảnh ngày + lớp tối. */
export function coNenDem(canh: string, chiMuc: ReadonlyMap<string, string> = CHI_MUC): boolean {
  return anhTheoTen(`bg-mvp-${canh}-dem`, chiMuc) !== undefined;
}

/**
 * URL ảnh của vật tương tác (dòng `- Ảnh:` trong dia-diem.md): `obj-…` → `src/assets/mvp/vat/obj-….webp`;
 * `nv:<mã>` hoặc `nv:<mã>/<biểu cảm>` → chân dung nhân vật (xem `anhChanDung`). Không có tệp → `undefined` (điểm vẽ tạm).
 */
export function anhSprite(sprite: string, chiMuc: ReadonlyMap<string, string> = CHI_MUC): string | undefined {
  if (sprite.startsWith('nv:')) {
    const [ma = '', bieuCam] = sprite.slice(3).split('/');
    return anhChanDung(ma, bieuCam, chiMuc);
  }
  return anhTheoTen(sprite, chiMuc);
}

/** URL chân dung; thiếu biểu cảm thì mượn ảnh neo / ảnh duy nhất của nhân vật. */
export function anhChanDung(nhanVat: string, bieuCam: string | undefined, chiMuc: ReadonlyMap<string, string> = CHI_MUC): string | undefined {
  const ung = [
    ...(bieuCam ? [`char-${nhanVat}-${bieuCam}`, `${nhanVat}-${bieuCam}`] : []),
    `char-${nhanVat}-anchor`,
    `char-${nhanVat}`,
    `char-${nhanVat}-neutral`,
  ];
  for (const t of ung) {
    const url = anhTheoTen(t, chiMuc);
    if (url) return url;
  }
  return undefined;
}
