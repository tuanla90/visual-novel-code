/**
 * Gom tệp của `prototype/noi-dung-mvp/` (đặc tả §18.1), ĐÚNG THỨ TỰ đọc:
 * quy-uoc.md → nhan-vat.md → canh.md → dia-diem.md → lich.md → du-lieu.md → kich-ban/ → thu-thach/ → so-tay/ → chung/ → ho-so/.
 * README.md bỏ qua; tệp .md chỗ khác là lỗi. Không import gì từ `src/`.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { docNoiDungMvp, type KetQuaDocMvp, type LoaiTepMvp, type LoiNoiDung, type TepMvp } from './doc-mvp.ts';

const CHO_DOC: readonly { duongDan: string; loai: LoaiTepMvp; thuMuc: boolean }[] = [
  { duongDan: 'quy-uoc.md', loai: 'quy-uoc', thuMuc: false },
  { duongDan: 'nhan-vat.md', loai: 'nhan-vat', thuMuc: false },
  { duongDan: 'canh.md', loai: 'canh', thuMuc: false },
  { duongDan: 'dia-diem.md', loai: 'dia-diem', thuMuc: false },
  { duongDan: 'lich.md', loai: 'lich', thuMuc: false },
  { duongDan: 'du-lieu.md', loai: 'du-lieu', thuMuc: false },
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

export function gomTepMvp(goc: string, hienThi = 'noi-dung-mvp'): { tep: TepMvp[]; loi: LoiNoiDung[] } {
  const tep: TepMvp[] = [];
  const loi: LoiNoiDung[] = [];
  const conLai = new Set(tatCaMd(goc).filter((p) => !/(^|\/)README\.md$/.test(p)));
  for (const c of CHO_DOC) {
    const thuoc = [...conLai].filter((p) => (c.thuMuc ? p.startsWith(`${c.duongDan}/`) && !p.slice(c.duongDan.length + 1).includes('/') : p === c.duongDan)).sort();
    if (thuoc.length === 0 && !c.thuMuc) loi.push({ tep: `${hienThi}/${c.duongDan}`, dong: 1, thongBao: `thiếu tệp ${c.duongDan}` });
    for (const p of thuoc) {
      conLai.delete(p);
      tep.push({ duongDan: `${hienThi}/${p}`, loai: c.loai, noiDung: readFileSync(join(goc, p), 'utf8') });
    }
  }
  for (const p of conLai) loi.push({ tep: `${hienThi}/${p}`, dong: 1, thongBao: `tệp nằm ngoài các chỗ bộ đọc MVP biết (${CHO_DOC.map((c) => c.duongDan).join(', ')})` });
  return { tep, loi };
}

export function docThuMucMvp(goc: string, hienThi = 'noi-dung-mvp'): KetQuaDocMvp & { tep: TepMvp[] } {
  const g = gomTepMvp(goc, hienThi);
  const kq = docNoiDungMvp(g.tep);
  return { mvp: kq.mvp, loi: [...g.loi, ...kq.loi], tep: g.tep };
}
