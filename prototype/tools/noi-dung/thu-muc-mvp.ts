/**
 * Gom tệp của `prototype/noi-dung-mvp/` (đặc tả §18.1), ĐÚNG THỨ TỰ đọc:
 * quy-uoc.md → nhan-vat.md → canh.md → dia-diem.md → lich.md → du-lieu.md → dong-thoi-gian.md (gói B19, tùy chọn) → kich-ban/ →
 * thu-thach/ → so-tay/ → chung/ → ho-so/.
 * `loi/` (lời, phiên truyện sở hữu) KHÔNG đưa thẳng vào bộ đọc: được ghép vào các dòng `- [LỜI mã]` của kich-ban/ và
 * thu-thach/ trước khi đọc (ghep-loi.ts). README.md và giong/ bỏ qua; tệp .md chỗ khác là lỗi. Không import gì từ `src/`.
 */
import { existsSync, readdirSync, readFileSync, statSync } from 'node:fs';
import { basename, join, relative, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { docNoiDungMvp, type KetQuaDocMvp, type LoaiTepMvp, type LoiNoiDung, type TepMvp } from './doc-mvp.ts';
import { docTepLoi, ghepLoi, traViTri, type DoanLoi, type NguonDong } from './ghep-loi.ts';
export { traViTri } from './ghep-loi.ts';

/** `tuyChon`: tệp đơn không bắt buộc (thiếu không báo lỗi). */
const CHO_DOC: readonly { duongDan: string; loai: LoaiTepMvp; thuMuc: boolean; tuyChon?: boolean }[] = [
  { duongDan: 'quy-uoc.md', loai: 'quy-uoc', thuMuc: false },
  { duongDan: 'nhan-vat.md', loai: 'nhan-vat', thuMuc: false },
  { duongDan: 'canh.md', loai: 'canh', thuMuc: false },
  { duongDan: 'dia-diem.md', loai: 'dia-diem', thuMuc: false },
  { duongDan: 'lich.md', loai: 'lich', thuMuc: false },
  { duongDan: 'du-lieu.md', loai: 'du-lieu', thuMuc: false },
  { duongDan: 'dong-thoi-gian.md', loai: 'dong-thoi-gian', thuMuc: false, tuyChon: true },
  { duongDan: 'kich-ban', loai: 'kich-ban', thuMuc: true },
  { duongDan: 'thu-thach', loai: 'thu-thach', thuMuc: true },
  { duongDan: 'so-tay', loai: 'so-tay', thuMuc: true },
  { duongDan: 'chung', loai: 'loi-chung', thuMuc: true },
  { duongDan: 'ho-so', loai: 'ho-so', thuMuc: true },
];

function tatCaMd(goc: string): string[] {
  const out: string[] = [];
  const di = (d: string): void => {
    for (const ten of readdirSync(d).sort()) {
      const p = join(d, ten);
      if (statSync(p).isDirectory()) di(p);
      else if (ten.endsWith('.md')) out.push(relative(goc, p).split(sep).join('/'));
    }
  };
  di(goc);
  return out;
}

/** Tên hiện trong lỗi: tên thư mục `noi-dung-…` (bộ thử B19: `noi-dung-thu-b19`); thư mục khác (test) theo luật cũ. */
function hienThiMacDinh(goc: string): string {
  const ten = basename(goc);
  if (/^noi-dung-[a-z0-9-]+$/.test(ten)) return ten;
  return goc.includes('noi-dung-mua-1') ? 'noi-dung-mua-1' : 'noi-dung-mvp';
}

export function gomTepMvp(goc: string, hienThi?: string): { tep: TepMvp[]; loi: LoiNoiDung[]; doanLoi: DoanLoi[] } {
  const ht = hienThi ?? hienThiMacDinh(goc);
  const tep: TepMvp[] = [];
  const loi: LoiNoiDung[] = [];
  const doanLoi: DoanLoi[] = [];
  // giong/ là luật giọng cho máy kiểm giọng (kiem-giong.ts) và người viết, không phải nội dung game.
  // nen-loi/ là bộ nền cho máy viết và soát lời (văn hóa, persona, thẻ cảnh), cũng không phải nội dung game.
  const conLai = new Set(tatCaMd(goc).filter((p) => !/(^|\/)(.*\.?)README\.md$/i.test(p) && !p.startsWith('giong/') && !p.startsWith('nen-loi/')));
  for (const p of [...conLai].filter((x) => x.startsWith('loi/')).sort()) {
    conLai.delete(p);
    const d = docTepLoi(`${ht}/${p}`, readFileSync(join(goc, p), 'utf8'));
    doanLoi.push(...d.doan);
    loi.push(...d.loi);
  }
  for (const c of CHO_DOC) {
    const thuoc = [...conLai].filter((p) => (c.thuMuc ? p.startsWith(`${c.duongDan}/`) && !p.slice(c.duongDan.length + 1).includes('/') : p === c.duongDan)).sort();
    if (thuoc.length === 0 && !c.thuMuc && !c.tuyChon) loi.push({ tep: `${ht}/${c.duongDan}`, dong: 1, thongBao: `thiếu tệp ${c.duongDan}` });
    for (const p of thuoc) {
      conLai.delete(p);
      tep.push({ duongDan: `${ht}/${p}`, loai: c.loai, noiDung: readFileSync(join(goc, p), 'utf8') });
    }
  }
  for (const p of conLai) loi.push({ tep: `${ht}/${p}`, dong: 1, thongBao: `tệp nằm ngoài các chỗ bộ đọc MVP biết (${[...CHO_DOC.map((c) => c.duongDan), 'loi'].join(', ')})` });
  return { tep, loi, doanLoi };
}

/** Đọc cả thư mục: ghép lời vào khung, đọc, rồi trả lỗi về đúng tệp/dòng gốc. `soLoiTam`: số dòng lời còn "(tạm)". */
export function docThuMucMvp(goc: string, hienThi?: string): KetQuaDocMvp & { tep: TepMvp[]; soLoiTam: number; banDo: Map<string, NguonDong[]>; doanLoi: DoanLoi[] } {
  const ht = hienThi ?? hienThiMacDinh(goc);
  const g = gomTepMvp(goc, ht);
  const khung = g.tep.filter((t) => t.loai === 'kich-ban' || t.loai === 'thu-thach');
  const ghep = ghepLoi(khung, g.doanLoi);
  const tep = g.tep.map((t) => (ghep.noiDung.has(t.duongDan) ? { ...t, noiDung: ghep.noiDung.get(t.duongDan) ?? t.noiDung } : t));
  const kq = docNoiDungMvp(tep);
  return { mvp: kq.mvp, loi: [...g.loi, ...ghep.loi, ...kq.loi.map((l) => traViTri(l, ghep.banDo))], tep, soLoiTam: ghep.soTam, banDo: ghep.banDo, doanLoi: g.doanLoi };
}

/** Thư mục gốc mọi ảnh của game (`[ẢNH …]` tra theo tên tệp ở bất kỳ thư mục con nào, như `anh-mvp.ts`). */
export const THU_MUC_ANH = fileURLToPath(new URL('../../src/assets/', import.meta.url));

/** Tên mọi ảnh (không đuôi, viết thường) trong `src/assets/**`. */
export function docTenAnh(thuMuc: string = THU_MUC_ANH): Set<string> {
  const ra = new Set<string>();
  if (!existsSync(thuMuc)) return ra;
  for (const ten of readdirSync(thuMuc, { recursive: true }) as string[]) {
    const m = /([^\\/]+)\.(webp|png|jpe?g)$/i.exec(ten);
    if (m) ra.add((m[1] ?? '').toLowerCase());
  }
  return ra;
}

/** Thư mục ảnh vật tương tác (sprite `obj-…` của dòng "- Ảnh:" trong dia-diem.md). Chỉ đọc tên tệp. */
export const THU_MUC_VAT_MVP = fileURLToPath(new URL('../../src/assets/mvp/vat/', import.meta.url));

/** Tên ảnh vật (không đuôi, viết thường) có trên đĩa: webp/png/jpg/jpeg. Thư mục không có → tập rỗng. */
export function docSpriteVat(thuMuc: string = THU_MUC_VAT_MVP): Set<string> {
  if (!existsSync(thuMuc)) return new Set();
  const ra = new Set<string>();
  for (const ten of readdirSync(thuMuc)) {
    const m = /^(.+)\.(webp|png|jpe?g)$/i.exec(ten);
    if (m) ra.add((m[1] ?? '').toLowerCase());
  }
  return ra;
}
