/**
 * Gom tệp của `prototype/noi-dung/` theo cấu trúc mục 2 của đặc tả, ĐÚNG THỨ TỰ đọc:
 * quy-uoc.md → kich-ban/chinh/*.md → thu-thach/*.md → chung/*.md → ho-so/*.md
 * (trong mỗi thư mục: theo tên tệp, nên đặt tiền tố 01-, 02-… khi thứ tự có nghĩa).
 *
 * `README.md` ở bất kỳ đâu là hướng dẫn cho người viết, không đọc. Tệp `.md` nằm ngoài các chỗ
 * trên là lỗi (để không có nội dung bị bỏ quên). Không import gì từ `src/`.
 */
import { readdirSync, readFileSync, statSync } from 'node:fs';
import { join, relative, sep } from 'node:path';
import { docNoiDung, type KetQuaDoc, type LoaiTep, type LoiNoiDung, type TepNoiDung, type TuyChonDoc } from './doc.ts';

/** Thư mục con (đường dẫn dùng `/`) → loại tệp. Thứ tự mảng = thứ tự đọc. */
const CHO_DOC: readonly { thuMuc: string; loai: LoaiTep }[] = [
  { thuMuc: '', loai: 'quy-uoc' }, // chỉ quy-uoc.md ở gốc
  { thuMuc: 'kich-ban/chinh', loai: 'kich-ban' },
  { thuMuc: 'thu-thach', loai: 'thu-thach' },
  { thuMuc: 'chung', loai: 'loi-chung' },
  { thuMuc: 'ho-so', loai: 'ho-so' },
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

/**
 * @param goc     thư mục `noi-dung/`
 * @param hienThi tiền tố đường dẫn trong lỗi (mặc định `noi-dung`)
 */
export function gomTep(goc: string, hienThi = 'noi-dung'): { tep: TepNoiDung[]; loi: LoiNoiDung[] } {
  const tep: TepNoiDung[] = [];
  const loi: LoiNoiDung[] = [];
  const conLai = new Set(tatCaMd(goc).filter((p) => !/(^|\/)README\.md$/.test(p)));
  for (const { thuMuc, loai } of CHO_DOC) {
    const thuoc = [...conLai].filter((p) =>
      thuMuc === '' ? p === 'quy-uoc.md' : p.startsWith(`${thuMuc}/`) && !p.slice(thuMuc.length + 1).includes('/'),
    );
    for (const p of thuoc.sort()) {
      conLai.delete(p);
      tep.push({ duongDan: `${hienThi}/${p}`, loai, noiDung: readFileSync(join(goc, p), 'utf8') });
    }
  }
  for (const p of conLai) {
    loi.push({ tep: `${hienThi}/${p}`, dong: 1, thongBao: `tệp nằm ngoài các thư mục bộ đọc biết (${CHO_DOC.map((c) => c.thuMuc || 'quy-uoc.md').join(', ')})` });
  }
  return { tep, loi };
}

/** Đọc cả thư mục. Lỗi gom trong `loi` (cả lỗi xếp tệp lẫn lỗi từng dòng). */
export function docThuMuc(goc: string, tuyChon: TuyChonDoc = {}, hienThi = 'noi-dung'): KetQuaDoc & { tep: TepNoiDung[] } {
  const g = gomTep(goc, hienThi);
  const kq = docNoiDung(g.tep, tuyChon);
  return { script: kq.script, loi: [...g.loi, ...kq.loi], tep: g.tep };
}
