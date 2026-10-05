/**
 * `npm run kiem-ky-nang:mua1` — máy kiểm kỹ năng theo Bảng A4 (docs/mua-1/giao-viec.md mục A4).
 * Đọc SQL chuẩn của thẻ thử thách, màn chiếu, lọc thử; báo lỗi khi dùng mẫu chưa tới vụ.
 * Không import gì từ `src/`.
 */
import { fileURLToPath } from 'node:url';
import { docThuMucMvp } from './thu-muc-mvp.ts';
import { dinhDangLoi, type RawMvp, type RawChuoiMvp } from './doc-mvp.ts';
import type { LoiNoiDung } from './doc.ts';

export const THU_MUC_NOI_DUNG_MUA_1 = fileURLToPath(new URL('../../noi-dung-mua-1/', import.meta.url));

export interface ChiTietKyNang {
  vuToiThieu: number;
  lyDo: string[];
}

/**
 * Xóa chuỗi literal và comment trong SQL để tránh so nhầm từ khóa bên trong chuỗi hoặc chú thích.
 * Lưu lại thông tin so sánh thời gian trước khi xóa chuỗi.
 */
function tienXuLySql(sqlGoc: string): { sqlSach: string; coThoiGian: boolean } {
  // Bỏ comment
  const khongComment = sqlGoc
    .replace(/--[^\r\n]*/g, ' ')
    .replace(/\/\*[\s\S]*?\*\//g, ' ');

  // Kiểm tra so sánh thời điểm / ngày giờ trên chuỗi gốc
  const coThoiGian =
    /\bstrftime\s*\(/i.test(khongComment) ||
    /\b(?:ngay|thoi_diem|gio|thoi_gian)\s*(?:>=|<=|>|<|=|BETWEEN)\b/i.test(khongComment) ||
    /\b(?:>=|<=|>|<|BETWEEN)\s*['"](?:\d{4}-\d{2}-\d{2}|\d{2}:\d{2})/i.test(khongComment) ||
    /['"](?:\d{4}-\d{2}-\d{2}|\d{2}:\d{2})['"]\s*(?:AND|OR|,|\)|;|$)/i.test(khongComment);

  // Thay chuỗi '...' hoặc "..." thành khoảng trắng để giữ nguyên cấu trúc
  const sqlSach = khongComment.replace(/'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/g, ' ');
  return { sqlSach, coThoiGian };
}

/**
 * Xác định vụ tối thiểu được phép dùng câu SQL theo Bảng A4:
 * 1: SELECT, WHERE =, AND, OR
 * 2: LIKE, IN, LOWER, TRIM
 * 3: >, <, >=, <=, BETWEEN (số), ORDER BY, LIMIT, FROM @phiếu
 * 4: so sánh / BETWEEN trên cột thời điểm, strftime(…)
 * 5: + - * / trong SELECT hay WHERE, ROUND
 * 6: JOIN … ON (inner join)
 * 7: GROUP BY, COUNT(*), COUNT(DISTINCT …), IS NULL, IS NOT NULL, COALESCE
 * 8: SUM, AVG, MAX, MIN, HAVING, LEFT JOIN
 * 9: CASE WHEN
 */
export function xacDinhVuToiThieu(sql: string): ChiTietKyNang {
  const { sqlSach, coThoiGian } = tienXuLySql(sql);
  const lyDo: { vu: number; moTa: string }[] = [];

  // Vụ 9: CASE WHEN
  if (/\bCASE\b[\s\S]*?\bWHEN\b/i.test(sqlSach) || /\bCASE\b/i.test(sqlSach)) {
    lyDo.push({ vu: 9, moTa: 'CASE WHEN' });
  }

  // Vụ 8: SUM, AVG, MAX, MIN, HAVING, LEFT JOIN
  if (/\bLEFT\s+(?:OUTER\s+)?JOIN\b/i.test(sqlSach)) lyDo.push({ vu: 8, moTa: 'LEFT JOIN' });
  if (/\bHAVING\b/i.test(sqlSach)) lyDo.push({ vu: 8, moTa: 'HAVING' });
  if (/\bSUM\s*\(/i.test(sqlSach)) lyDo.push({ vu: 8, moTa: 'SUM' });
  if (/\bAVG\s*\(/i.test(sqlSach)) lyDo.push({ vu: 8, moTa: 'AVG' });
  if (/\bMAX\s*\(/i.test(sqlSach)) lyDo.push({ vu: 8, moTa: 'MAX' });
  if (/\bMIN\s*\(/i.test(sqlSach)) lyDo.push({ vu: 8, moTa: 'MIN' });

  // Vụ 7: GROUP BY, COUNT, IS NULL, IS NOT NULL, COALESCE
  if (/\bGROUP\s+BY\b/i.test(sqlSach)) lyDo.push({ vu: 7, moTa: 'GROUP BY' });
  if (/\bCOUNT\s*\(/i.test(sqlSach)) lyDo.push({ vu: 7, moTa: 'COUNT' });
  if (/\bIS\s+NULL\b/i.test(sqlSach)) lyDo.push({ vu: 7, moTa: 'IS NULL' });
  if (/\bIS\s+NOT\s+NULL\b/i.test(sqlSach)) lyDo.push({ vu: 7, moTa: 'IS NOT NULL' });
  if (/\bCOALESCE\s*\(/i.test(sqlSach)) lyDo.push({ vu: 7, moTa: 'COALESCE' });

  // Vụ 6: JOIN … ON (chuẩn / INNER JOIN, không phải LEFT JOIN)
  if (/\b(?:INNER\s+)?JOIN\b[\s\S]*?\bON\b/i.test(sqlSach) && !/\bLEFT\s+(?:OUTER\s+)?JOIN\b/i.test(sqlSach)) {
    lyDo.push({ vu: 6, moTa: 'JOIN … ON' });
  }

  // Vụ 5: + - * / trong SELECT hoặc WHERE, ROUND
  if (/\bROUND\s*\(/i.test(sqlSach)) lyDo.push({ vu: 5, moTa: 'ROUND' });

  // Chuẩn bị SQL để kiểm tra toán tử số học:
  // - Bỏ tên phiếu @... (ví dụ @ev-tin-don, @ev-don-tung) để tránh dấu gạch nối bị tính là phép trừ
  // - Bỏ SELECT *, COUNT(*), table.* để tránh dấu sao chiếu bị tính là phép nhân
  const sqlKhongPhieu = sqlSach
    .replace(/@[\w-]+/g, ' ')
    .replace(/\bSELECT\s+(?:DISTINCT\s+)?\*/gi, 'SELECT ')
    .replace(/\bCOUNT\s*\(\s*\*\s*\)/gi, 'COUNT()')
    .replace(/\b[a-zA-Z0-9_]+\s*\.\s*\*/g, ' ');

  // Phép tính số học: hai toán hạng số hoặc định danh với +, -, *, /
  if (/[a-zA-Z0-9_)]\s*[*+/]\s*[a-zA-Z0-9_(]/i.test(sqlKhongPhieu) || /[a-zA-Z0-9_)]\s*-\s*[a-zA-Z0-9_(]/i.test(sqlKhongPhieu)) {
    // Tránh nhầm toán tử âm đơn lẻ hoặc liên kết
    lyDo.push({ vu: 5, moTa: 'phép tính (+ - * /)' });
  }

  // Vụ 4: so sánh / BETWEEN trên cột thời điểm, strftime(…)
  if (/\bstrftime\s*\(/i.test(sqlSach)) lyDo.push({ vu: 4, moTa: 'strftime' });
  if (coThoiGian && (/\bBETWEEN\b/i.test(sqlSach) || /[><]=?/.test(sqlSach))) {
    lyDo.push({ vu: 4, moTa: 'so sánh/BETWEEN trên cột thời điểm' });
  }

  // Vụ 3: >, <, >=, <=, BETWEEN (số), ORDER BY, LIMIT, FROM @phiếu
  if (/\bORDER\s+BY\b/i.test(sqlSach)) lyDo.push({ vu: 3, moTa: 'ORDER BY' });
  if (/\bLIMIT\b/i.test(sqlSach)) lyDo.push({ vu: 3, moTa: 'LIMIT' });
  if (/\bFROM\s+@/i.test(sqlSach)) lyDo.push({ vu: 3, moTa: 'FROM @phiếu' });
  // So sánh số (nếu chưa gán vào Vụ 4 do thời điểm)
  if (!coThoiGian && (/\bBETWEEN\b/i.test(sqlSach) || /[><]=?/.test(sqlSach))) {
    lyDo.push({ vu: 3, moTa: 'so sánh số / BETWEEN' });
  }

  // Vụ 2: LIKE, IN, LOWER, TRIM
  if (/\bLIKE\b/i.test(sqlSach)) lyDo.push({ vu: 2, moTa: 'LIKE' });
  if (/\bIN\s*\(/i.test(sqlSach)) lyDo.push({ vu: 2, moTa: 'IN' });
  if (/\bLOWER\s*\(/i.test(sqlSach)) lyDo.push({ vu: 2, moTa: 'LOWER' });
  if (/\bTRIM\s*\(/i.test(sqlSach)) lyDo.push({ vu: 2, moTa: 'TRIM' });

  // Vụ 1: mặc định
  if (lyDo.length === 0) {
    return { vuToiThieu: 1, lyDo: ['SELECT / WHERE / AND / OR'] };
  }

  const vuToiThieu = Math.max(...lyDo.map((d) => d.vu));
  const cacMoTa = lyDo.filter((d) => d.vu === vuToiThieu).map((d) => d.moTa);
  return { vuToiThieu, lyDo: cacMoTa };
}

export function soVuCuaMa(ma: string, mvp: RawMvp): number {
  if (ma === 'vu1') return 1;
  if (ma === 'vu2' || ma === 'vu-tin-don') return 2;
  if (ma === 'vu3' || ma === 'vu-goi-hang' || ma === 'vu-tranh-cai') return 3;
  if (ma === 'vu4' || ma === 'vu-nam-22h40' || ma === 'vu-giup-nam') return 4;
  if (ma === 'vu5' || ma === 'vu-tien-dien' || ma === 'vu-so-quy') return 5;
  if (ma === 'vu-giup-nam' || ma === 'vu6') return 6;
  if (ma === 'vu-quy-qua' || ma === 'vu7') return 7;
  if (ma === 'vu-so-quy' || ma === 'vu8') return 8;
  if (ma === 'vu-xep-loai' || ma === 'vu9') return 9;
  if (ma === 'vu-dau-tien' || ma === 'vu10') return 10;

  // Tìm trong vuSau
  const dsVuChinh = (mvp.lich?.vuSau ?? []).filter((v) => !v.phu);
  const idx = dsVuChinh.findIndex((v) => v.id === ma);
  if (idx >= 0) return idx + 2;

  // Thử trích xuất số nếu có dạng vuX
  const m = /^vu-?(\d+)$/.exec(ma);
  if (m) return Number(m[1]);

  return 1;
}

export interface KetQuaKiemKyNang {
  loi: LoiNoiDung[];
  tomTat: string;
}

export function kiemKyNangMvp(thuMuc: string | RawMvp = THU_MUC_NOI_DUNG_MUA_1): KetQuaKiemKyNang {
  const mvp = typeof thuMuc === 'string' ? docThuMucMvp(thuMuc).mvp : thuMuc;
  const loi: LoiNoiDung[] = [];
  const lich = mvp.lich;
  if (!lich) return { loi, tomTat: 'Không có lich.md' };

  // 1. Lập bản đồ chuỗi → vụ được phép
  const chuoiThuocVu = new Map<string, { vu: number; nguon: string }>();

  // Tuyến Vụ 1
  const gocVu1 = [
    lich.chuoiDau,
    ...lich.ngay.map((n) => n.chuoi).filter(Boolean) as string[],
    lich.ngayHop?.chuoi,
    lich.ket?.that,
    lich.ket?.thuong,
  ].filter(Boolean) as string[];

  // Xây dựng đồ thị chuỗi liên kết
  const lienKetChuoi = new Map<string, Set<string>>();
  for (const c of mvp.chuoi) {
    if (!lienKetChuoi.has(c.id)) lienKetChuoi.set(c.id, new Set());
    for (const it of c.items) {
      if (it.kind === 'goto' || it.kind === 'go-with') lienKetChuoi.get(c.id)!.add(it.to);
      else if (it.kind === 'jump-if') lienKetChuoi.get(c.id)!.add(it.chuoi);
      else if (it.kind === 'branch') {
        for (const ch of it.branch.choices) {
          for (const h of ch.hauQua) if (h.kind === 'di-toi') lienKetChuoi.get(c.id)!.add(h.chuoi);
        }
      } else if (it.kind === 'explore') {
        for (const d of it.diem) lienKetChuoi.get(c.id)!.add(d.chuoi);
      } else if (it.kind === 'doi-chat' && it.nguoiQuen) {
        lienKetChuoi.get(c.id)!.add(it.nguoiQuen.noiThay);
      }
    }
  }

  function loangVu(cacChuoiDau: string[], vu: number, nguon: string) {
    const hangDoi = [...cacChuoiDau];
    for (const id of hangDoi) chuoiThuocVu.set(id, { vu, nguon });
    while (hangDoi.length > 0) {
      const hienTai = hangDoi.shift()!;
      for (const tiep of lienKetChuoi.get(hienTai) ?? []) {
        if (!chuoiThuocVu.has(tiep)) {
          chuoiThuocVu.set(tiep, { vu, nguon });
          hangDoi.push(tiep);
        }
      }
    }
  }

  // Loang vụ chính theo thứ tự
  loangVu(gocVu1, 1, 'Vụ 1');

  for (const v of lich.vuSau) {
    if (!v.phu) {
      const soVu = soVuCuaMa(v.id, mvp);
      const dsDau = [v.chuoi, ...v.cacNgay.map((d) => d.chuoi)].filter(Boolean);
      loangVu(dsDau, soVu, `Vụ ${soVu} (${v.id})`);
    } else {
      // Việc phụ: dùng kỹ năng của vụ moSau
      const vuMoSau = v.moSau ? soVuCuaMa(v.moSau, mvp) : 1;
      loangVu([v.chuoi], vuMoSau, `Việc phụ ${v.id} (mở sau Vụ ${vuMoSau})`);
    }
  }

  for (const l of lich.viecNgayLe ?? []) {
    const vuThuoc = l.thuocVu ? soVuCuaMa(l.thuocVu, mvp) : 1;
    loangVu([l.chuoi, l.khiLo].filter(Boolean), vuThuoc, `Việc ngày lễ ${l.id} (thuộc Vụ ${vuThuoc})`);
  }

  for (const n of lich.nguoiQuen ?? []) {
    for (const v of n.viec) {
      const vuMoSau = v.moSau ? soVuCuaMa(v.moSau, mvp) : 1;
      loangVu([v.id], vuMoSau, `Việc người quen ${v.id} (mở sau Vụ ${vuMoSau})`);
    }
  }

  // 2. Kiểm tra SQL của thẻ thử thách
  const theDaKiem = new Set<string>();

  for (const c of mvp.chuoi) {
    const thongTinVu = chuoiThuocVu.get(c.id) ?? { vu: 1, nguon: 'mặc định' };
    for (const it of c.items) {
      if (it.kind === 'challenge' || it.kind === 'fix-query') {
        const the = mvp.challenges.find((t) => t.id === it.id);
        if (!the || theDaKiem.has(the.id)) continue;
        theDaKiem.add(the.id);
        const sqlChuan = the.sql['SQL chuẩn'] ?? '';
        if (sqlChuan) {
          const { vuToiThieu, lyDo } = xacDinhVuToiThieu(sqlChuan);
          if (vuToiThieu > thongTinVu.vu) {
            loi.push({
              tep: the.viTri.tep,
              dong: the.viTri.dong,
              thongBao: `[kỹ năng dùng sớm] thẻ "${the.id}" dùng kỹ năng của Vụ ${vuToiThieu} (${lyDo.join(', ')}) nhưng xuất hiện ở ${thongTinVu.nguon} (chỉ được dùng tới Vụ ${thongTinVu.vu})`,
            });
          }
        }
      } else if (it.kind === 'trial-filter') {
        const { vuToiThieu, lyDo } = xacDinhVuToiThieu(it.sql);
        if (vuToiThieu > thongTinVu.vu) {
          loi.push({
            tep: c.viTri.tep,
            dong: c.viTri.dong,
            thongBao: `[kỹ năng dùng sớm] lọc thử "${it.id}" dùng kỹ năng của Vụ ${vuToiThieu} (${lyDo.join(', ')}) nhưng xuất hiện ở ${thongTinVu.nguon} (chỉ được dùng tới Vụ ${thongTinVu.vu})`,
          });
        }
      } else if (it.kind === 'projector') {
        let sql = '';
        const src = it.source;
        if (src.kind === 'sql') {
          sql = src.sql;
        } else if (src.kind === 'preload') {
          const the = mvp.challenges.find((t) => t.id === src.challengeId);
          sql = the?.sql['Truy vấn nạp sẵn'] ?? the?.sql['SQL chuẩn'] ?? '';
        }
        if (sql) {
          const { vuToiThieu, lyDo } = xacDinhVuToiThieu(sql);
          if (vuToiThieu > thongTinVu.vu) {
            loi.push({
              tep: c.viTri.tep,
              dong: c.viTri.dong,
              thongBao: `[kỹ năng dùng sớm] màn chiếu "${it.id}" dùng kỹ năng của Vụ ${vuToiThieu} (${lyDo.join(', ')}) nhưng xuất hiện ở ${thongTinVu.nguon} (chỉ được dùng tới Vụ ${thongTinVu.vu})`,
            });
          }
        }
      }
    }
  }

  // 3. Kiểm tra quy tắc "đứng nguyên chỗ" (B1, S11)
  const mapChuoi = new Map<string, RawChuoiMvp>();
  for (const c of mvp.chuoi) mapChuoi.set(c.id, c);

  for (const c of mvp.chuoi) {
    for (let idx = 0; idx < c.items.length; idx++) {
      const it = c.items[idx];
      if (!it) continue;
      const dong = c.itemDong[idx] ?? c.viTri.dong;
      let dichId: string | null = null;
      if (it.kind === 'goto' || it.kind === 'go-with') dichId = it.to;
      else if (it.kind === 'jump-if') dichId = it.chuoi;

      if (dichId) {
        const dich = mapChuoi.get(dichId);
        if (dich) {
          if (c.canhCat) {
            // Lỗi 2: cảnh cắt lại [ĐI TỚI] sang nơi thứ ba
            if (dich.canh !== c.canh) {
              loi.push({
                tep: c.viTri.tep,
                dong,
                thongBao: `[đứng nguyên chỗ] cảnh cắt "${c.id}" lại [ĐI TỚI] sang nơi thứ ba "${dich.id}" (cảnh ${dich.canh})`,
              });
            }
          } else {
            // Lỗi 1: [ĐI TỚI] sang nơi khác mà chuỗi đích không khai · cảnh cắt
            if (dich.canh !== c.canh && !dich.canhCat) {
              loi.push({
                tep: c.viTri.tep,
                dong,
                thongBao: `[đứng nguyên chỗ] chuỗi "${c.id}" (cảnh ${c.canh}) [ĐI TỚI] sang chuỗi "${dich.id}" khác nơi (cảnh ${dich.canh}) nhưng chuỗi đích không khai "· cảnh cắt"`,
              });
            }
          }
        }
      }
    }
  }

  // Lỗi 3: ngày thiếu bắt đầu ở
  if (lich) {
    for (const n of lich.ngay) {
      if (!n.batDauO) {
        loi.push({
          tep: n.viTri.tep,
          dong: n.dongChinh || n.viTri.dong,
          thongBao: `[đứng nguyên chỗ] ngày "${n.ten}" (ngày ${n.so}) thiếu khai báo "bắt đầu ở: <cảnh>"`,
        });
      }
    }
    for (const v of lich.vuSau) {
      if (!v.phu) {
        if (v.cacNgay && v.cacNgay.length > 0) {
          for (const d of v.cacNgay) {
            if (!d.batDauO) {
              loi.push({
                tep: v.viTri.tep,
                dong: v.viTri.dong,
                thongBao: `[đứng nguyên chỗ] ngày "${d.ngay}" của vụ "${v.id}" thiếu khai báo "bắt đầu ở: <cảnh>"`,
              });
            }
          }
        } else if (v.ngay && !v.batDauO) {
          loi.push({
            tep: v.viTri.tep,
            dong: v.viTri.dong,
            thongBao: `[đứng nguyên chỗ] ngày "${v.ngay}" của vụ "${v.id}" thiếu khai báo "bắt đầu ở: <cảnh>"`,
          });
        }
      }
    }
  }

  const soLoiKyNang = loi.filter((l) => l.thongBao.startsWith('[kỹ năng')).length;
  const soLoiDungCho = loi.length - soLoiKyNang;
  const tomTat = `kiem-ky-nang:mua1: ${loi.length} lỗi (${soLoiKyNang} lỗi kỹ năng theo Bảng A4, ${soLoiDungCho} lỗi đứng nguyên chỗ).`;
  return { loi, tomTat };
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const { loi, tomTat } = kiemKyNangMvp(process.argv[2] ?? THU_MUC_NOI_DUNG_MUA_1);
  for (const l of loi) console.error(dinhDangLoi(l));
  console.log(tomTat);
  process.exitCode = loi.length === 0 ? 0 : 1;
}
