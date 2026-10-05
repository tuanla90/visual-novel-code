/**
 * CÔNG CỤ TRUYỆN CHỮ MÙA 1 (đặc tả E2 mục 3) — xuất mỗi vụ, mỗi việc phụ thành một tệp
 * `docs/mua-1/truyen-chu/<mã>.md`, kèm mục lục `docs/mua-1/truyen-chu/README.md`.
 *
 * Kiểu sách "tự chọn hướng đi" (CYOA): truyện chia thành các đoạn đánh số có neo `<a id="doan-N"></a>`;
 * mỗi lựa chọn là một liên kết tới đoạn tiếp theo ([Chọn: ...](#doan-X)).
 * Chạy SQL thật bằng sql.js để in bảng kết quả (tối đa 10 dòng) và tóm bẫy phản ứng.
 */
import { existsSync, mkdirSync, readdirSync, unlinkSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { docThuMucMvp } from './noi-dung/thu-muc-mvp.ts';
import { chuyenMvp, type DuLieuMvp } from './noi-dung/chuyen-mvp.ts';
import { kiemLuatMvp } from './noi-dung/luat-mvp.ts';
import { themNhieuMvp } from './noi-dung/nhieu-mvp.ts';
import { moCsdlMvp } from './noi-dung/sql-mvp.ts';
import type { BoDuLieuMvp } from './noi-dung/du-lieu-mvp.ts';
import type { KhiChay } from './noi-dung/phan-ung-mvp.ts';
import type { KichBanMvp, LoiMvp, NhanVatMvp, TheThuThachMvp } from '../src/content/mvp/types.ts';

const THU_MUC_GOC = fileURLToPath(new URL('../../', import.meta.url));
export const THU_MUC_NOI_DUNG_MUA_1 = join(THU_MUC_GOC, 'prototype/noi-dung-mua-1');
export const THU_MUC_XUAT_TRUYEN = join(THU_MUC_GOC, 'docs/mua-1/truyen-chu');

interface DoanTruyen {
  so: number;
  tieuDe: string;
  dong: string[];
  luaChon: { nhan: string; toiSo: number; dieuKien?: string }[];
}

interface ThongTinNgayCYOA {
  dongNgay: string;
  viecNgayLe?: { ten: string; chuoi: string; khiLo: string }[];
}

export const BANG_DICH_BIEU_CAM: Record<string, string> = {
  happy: 'vui vẻ',
  worried: 'lo lắng',
  smug: 'tự đắc',
  stunned: 'sững sờ',
  thinking: 'suy nghĩ',
  surprised: 'ngạc nhiên',
  sad: 'buồn bã',
  angry: 'tức giận',
  serious: 'nghiêm túc',
  relieved: 'nhẹ nhõm',
  confused: 'bối rối',
  'gai-dau': 'gãi đầu',
  'chi-tay': 'chỉ tay',
  'lung-tung': 'lúng túng',
};

export function dinhDangNgayThu(ngayIso: string): string {
  const parts = ngayIso.split('-').map(Number);
  const y = parts[0] ?? 2024;
  const m = parts[1] ?? 1;
  const d = parts[2] ?? 1;
  const date = new Date(Date.UTC(y, m - 1, d));
  const thuMap = ['Chủ nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'];
  const thu = thuMap[date.getUTCDay()];
  const dd = String(d).padStart(2, '0');
  const mm = String(m).padStart(2, '0');
  return `${thu}, ${dd}/${mm}/${y}`;
}

function congNgayIso(iso: string, soNgay: number): string {
  const parts = iso.split('-').map(Number);
  const d = new Date(Date.UTC(parts[0] ?? 2024, (parts[1] ?? 1) - 1, parts[2] ?? 1));
  d.setUTCDate(d.getUTCDate() + soNgay);
  const y = d.getUTCFullYear();
  const m = String(d.getUTCMonth() + 1).padStart(2, '0');
  const day = String(d.getUTCDate()).padStart(2, '0');
  return `${y}-${m}-${day}`;
}

function thuCuaIso(iso: string): number {
  const parts = iso.split('-').map(Number);
  return new Date(Date.UTC(parts[0] ?? 2024, (parts[1] ?? 1) - 1, parts[2] ?? 1)).getUTCDay();
}

function thuKeTiep(iso: string, thu: number): string {
  const lech = (thu - thuCuaIso(iso) + 7) % 7;
  return congNgayIso(iso, lech === 0 ? 7 : lech);
}

function ngayDieuTraIso(soNgay: number, ngayMoDau: string | null): string {
  const nhanPhong = ngayMoDau || '2024-09-08';
  const ngayHoi = thuKeTiep(nhanPhong, 6);
  const trungThu = thuKeTiep(ngayHoi, 2);
  const phongClb = thuKeTiep(trungThu, 1);
  return congNgayIso(phongClb, soNgay);
}

export function tinhSoNgay(tuNgay: string, denNgay: string): number {
  const parts1 = tuNgay.split('-').map(Number);
  const parts2 = denNgay.split('-').map(Number);
  const y1 = parts1[0] ?? 2024;
  const m1 = parts1[1] ?? 1;
  const d1 = parts1[2] ?? 1;
  const y2 = parts2[0] ?? 2024;
  const m2 = parts2[1] ?? 1;
  const d2 = parts2[2] ?? 1;
  const t1 = Date.UTC(y1, m1 - 1, d1);
  const t2 = Date.UTC(y2, m2 - 1, d2);
  return Math.round((t2 - t1) / (24 * 60 * 60 * 1000));
}

export function hoanVi<T>(arr: T[]): T[][] {
  if (arr.length <= 1) return [arr];
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i++) {
    const cur = arr[i]!;
    const rem = [...arr.slice(0, i), ...arr.slice(i + 1)];
    for (const p of hoanVi(rem)) {
      res.push([cur, ...p]);
    }
  }
  return res;
}

export function nhanDieuKien(dk: string): string {
  const clean = dk.replace(/^\(+|\)+$/g, '').trim();
  const m = /\b([a-zA-Z_][a-zA-Z0-9_]*)\b/.exec(clean);
  const col = m?.[1]?.toLowerCase() ?? clean;
  const map: Record<string, string> = {
    ma_lop: 'Lớp',
    lop: 'Lớp',
    ten: 'Tên',
    ho_dem: 'Họ đệm',
    ma_sv: 'Mã SV',
    nam_hoc: 'Năm học',
    ngay: 'Ngày',
    thoi_gian: 'Thời gian',
    tai_khoan: 'Tài khoản',
    phong: 'Phòng',
    so_phong: 'Số phòng',
    gia: 'Giá',
    so_tien: 'Số tiền',
  };
  return map[col] ?? (col.charAt(0).toUpperCase() + col.slice(1));
}

export function tachDieuKienCapNgoai(whereStr: string): { kieu: 'AND' | 'OR'; dks: string[] } | null {
  let depth = 0;
  let inSingleQuote = false;
  let lastIdx = 0;
  const tokens: { type: 'op' | 'text'; val: string; idx: number }[] = [];

  for (let i = 0; i < whereStr.length; i++) {
    const ch = whereStr[i];
    if (ch === "'" && (i === 0 || whereStr[i - 1] !== '\\')) {
      inSingleQuote = !inSingleQuote;
      continue;
    }
    if (inSingleQuote) continue;
    if (ch === '(') {
      depth++;
      continue;
    }
    if (ch === ')') {
      depth--;
      continue;
    }
    if (depth === 0) {
      const rest = whereStr.slice(i);
      const mAnd = /^AND\b/i.exec(rest);
      const mOr = /^OR\b/i.exec(rest);
      if (mAnd) {
        tokens.push({ type: 'text', val: whereStr.slice(lastIdx, i).trim(), idx: lastIdx });
        tokens.push({ type: 'op', val: 'AND', idx: i });
        i += mAnd[0].length - 1;
        lastIdx = i + 1;
      } else if (mOr) {
        tokens.push({ type: 'text', val: whereStr.slice(lastIdx, i).trim(), idx: lastIdx });
        tokens.push({ type: 'op', val: 'OR', idx: i });
        i += mOr[0].length - 1;
        lastIdx = i + 1;
      }
    }
  }
  tokens.push({ type: 'text', val: whereStr.slice(lastIdx).trim(), idx: lastIdx });

  const ops = tokens.filter((t) => t.type === 'op').map((t) => t.val.toUpperCase());
  if (ops.length === 0) return null;
  if (ops.every((op) => op === 'AND')) {
    const dks = tokens.filter((t) => t.type === 'text').map((t) => t.val).filter(Boolean);
    return dks.length >= 2 ? { kieu: 'AND', dks } : null;
  }
  if (ops.every((op) => op === 'OR')) {
    const dks = tokens.filter((t) => t.type === 'text').map((t) => t.val).filter(Boolean);
    return dks.length >= 2 ? { kieu: 'OR', dks } : null;
  }
  const orSplit = tokens.filter((t) => t.type === 'op' && t.val.toUpperCase() === 'OR');
  if (orSplit.length > 0) {
    const dks: string[] = [];
    let cur: string[] = [];
    for (const t of tokens) {
      if (t.type === 'op' && t.val.toUpperCase() === 'OR') {
        dks.push(cur.join(' ').trim());
        cur = [];
      } else {
        cur.push(t.val);
      }
    }
    dks.push(cur.join(' ').trim());
    return { kieu: 'OR', dks: dks.filter(Boolean) };
  }
  return null;
}

export class BoXuatTruyenChu {
  private duLieu: KichBanMvp;
  private rawCanh: Map<string, { ten: string; moTa?: string | null }>;
  private db: Awaited<ReturnType<typeof moCsdlMvp>> | null = null;
  private theDaCo: Set<string> = new Set();
  public thongKeCuoi = { soChuoi: 0, soManTra: 0 };

  constructor(duLieu: DuLieuMvp, rawCanh: Map<string, { ten: string; moTa?: string | null }>) {
    this.rawCanh = rawCanh;
    this.duLieu = {
      ...duLieu,
      duLieu: duLieu.duLieu ? themNhieuMvp(duLieu.duLieu) : duLieu.duLieu,
    } as unknown as KichBanMvp;
  }

  async khoiTaoDb(): Promise<void> {
    if (this.duLieu.duLieu) {
      const toolDuLieu = {
        bang: this.duLieu.duLieu.bang.map((b) => ({ ...b, viTri: { tep: 'du-lieu.md', dong: 1 } })),
        bangAo: this.duLieu.duLieu.bangAo.map((v) => ({ ...v, viTri: { tep: 'du-lieu.md', dong: 1 } })),
        viTri: { tep: 'du-lieu.md', dong: 1 },
      } as BoDuLieuMvp;
      this.db = await moCsdlMvp(toolDuLieu);
    }
  }

  dongDb(): void {
    if (this.db) {
      this.db.close();
      this.db = null;
    }
  }

  private ten(id: string): string {
    if (id === 'player' || id === 'nguoi-choi') return 'Bạn';
    if (id === 'narrator') return 'Người kể';
    const nv = this.duLieu.nhanVat.find((n) => n.id === id);
    if (nv) return nv.ten;
    const nq = this.duLieu.lich.nguoiQuen?.find((n) => n.id === id);
    if (nq) return nq.ten;
    return id;
  }

  private tenTheHoSo(id: string): string {
    const h = this.duLieu.hoSo[id];
    if (h?.heading || h?.fields?.['Tiêu đề']) {
      return h.heading ?? h.fields['Tiêu đề'];
    }
    for (const t of Object.values(this.duLieu.thuThach)) {
      if (t.vatChung?.id === id) {
        return t.vatChung.title;
      }
    }
    return id;
  }

  private vaiTroNgan(nv: NhanVatMvp): string {
    const gt = nv.gioiThieu;
    if (gt?.nam && gt?.nganh) {
      const namSo = gt.nam
        .replace('Năm nhất', 'năm 1')
        .replace('Năm hai', 'năm 2')
        .replace('Năm ba', 'năm 3')
        .replace('Năm bốn', 'năm 4');
      const dx = gt.danhXung ? `, ${gt.danhXung.toLowerCase()}` : '';
      return `${namSo} ${gt.nganh}${dx}`;
    }
    if (gt?.danhXung) return gt.danhXung;
    return nv.vai.split('(')[0]?.split('.')[0]?.trim().replace(/,\s*$/, '') ?? nv.vai;
  }

  laySoVu(ma: string): number {
    const m = /^vu-?(\d+)$/.exec(ma);
    if (m) return Number(m[1]);
    const idx = (this.duLieu.lich.vuSau ?? []).findIndex((v) => v.id === ma);
    if (idx >= 0) return idx + 2;
    return 1;
  }

  private dienTen(t: string): string {
    return t
      .replace(/\{\{nv\.nguoi-choi\.nganh\}\}/g, 'Kế toán')
      .replace(/\{\{nv\.nguoi-choi\}\}/g, 'bạn')
      .replace(/\{\{nv\.([a-z0-9-]+)\.trong-cau\}\}/g, (_m, id: string) => {
        const nv = this.duLieu.nhanVat.find((n) => n.id === id);
        return nv?.trongCau ?? nv?.ten ?? id;
      })
      .replace(/\{\{nv\.([a-z0-9-]+)\}\}/g, (_m, id: string) => {
        const nv = this.duLieu.nhanVat.find((n) => n.id === id);
        return nv?.trongCau ?? nv?.ten ?? id;
      });
  }

  private tenCanh(id: string): string {
    return this.rawCanh.get(id)?.ten ?? this.duLieu.canh.find((c) => c.id === id)?.ten ?? id;
  }

  private moTaCanh(id: string): string | null {
    return this.rawCanh.get(id)?.moTa ?? null;
  }

  private dkChu(d: unknown): string {
    if (!d) return '';
    if (typeof d === 'string') return d;
    const obj = d as { kind?: string; id?: string; cac?: unknown[]; muc?: number };
    if (obj.kind === 'co') {
      const ten = obj.id ? this.tenTheHoSo(obj.id) : '';
      return `đã có "${ten}"`;
    }
    if (obj.kind === 'khong-co') {
      const ten = obj.id ? this.tenTheHoSo(obj.id) : '';
      return `chưa có "${ten}"`;
    }
    if (obj.kind === 'bi-mat') return `bí mật mức ${obj.muc ?? 0}`;
    if (Array.isArray(obj.cac)) {
      return `(${obj.cac.map((c) => this.dkChu(c)).join(obj.kind === 'va' ? ' và ' : ' hoặc ')})`;
    }
    return JSON.stringify(d);
  }

  private dinhDangLoi(l: LoiMvp): string {
    const text = this.dienTen(l.text);
    if (l.speaker === 'player' || l.speaker === 'nguoi-choi') {
      let cleanText = text.trim();
      while (cleanText.startsWith('(') && cleanText.endsWith(')')) {
        cleanText = cleanText.slice(1, -1).trim();
      }
      return `*Suy nghĩ của bạn:* *(${cleanText})*`;
    }
    if (l.speaker === 'narrator') {
      return `*${text}*`;
    }
    const exp = l.expression && BANG_DICH_BIEU_CAM[l.expression] ? ` (${BANG_DICH_BIEU_CAM[l.expression]})` : '';
    return `**${this.ten(l.speaker)}**${exp}: ${text}`;
  }

  private dinhDangAnh(
    id: string,
    chuThich?: string | null,
    moTa?: string | null,
  ): string {
    let loai = 'ẢNH';
    if (id.startsWith('cg-')) loai = 'CG';
    else if (id.startsWith('chibi-')) loai = 'CHIBI';
    else if (id.startsWith('meme-')) loai = 'MEME';

    const sticker = loai === 'CHIBI' ? ' (sticker)' : '';
    const desc = moTa || (chuThich ? `chú thích: ${chuThich}` : null);
    const moTaIn = desc ? ` ${desc}` : ' (chưa có mô tả)';
    return `> [${loai} ${id}${sticker}]${moTaIn}`;
  }

  private chaySql(sqlChuan: string): { cot: string[]; dong: unknown[][]; loi: string | null } {
    if (!this.db) return { cot: [], dong: [], loi: 'Chưa khởi tạo DB' };
    try {
      const sql = sqlChuan.trim().replace(/;\s*$/, '');
      const st = this.db.prepare(sql);
      const cot = st.getColumnNames();
      const dong: unknown[][] = [];
      while (st.step()) dong.push(st.get() as unknown[]);
      st.free();
      return { cot, dong, loi: null };
    } catch (e) {
      return { cot: [], dong: [], loi: (e as Error).message };
    }
  }

  private dinhDangKhi(khi: KhiChay): string {
    switch (khi.kind) {
      case 'thieu-cot':
        return 'Nếu thiếu cột';
      case 'thua-cot':
        return 'Nếu thừa cột';
      case 'loi-cot':
        return 'Nếu lỗi không có cột';
      case 'loi':
        return 'Nếu gặp lỗi';
      case 'dung':
        return 'Nếu tra đúng';
      case 'sai-thu-tu':
        return 'Nếu đủ dòng nhưng sai thứ tự';
      case 'sai-cot-nop':
        return 'Nếu chọn sai cột nộp';
      case 'xem-tung-buoc':
        return 'Nếu xem từng bước';
      case 'so-dong':
        return `Nếu lọc ra ${khi.n} dòng${khi.cot && khi.cot.length > 0 ? ` với ${khi.cot.join(', ')}` : ''}`;
      default:
        return 'Nếu chạy';
    }
  }

  demDongSql(sql: string): number | null {
    const kq = this.chaySql(sql);
    if (kq.loi || kq.dong.length === 0) return null;
    return Number(kq.dong[0]?.[0]);
  }

  tinhLocTungBuoc(sqlChuan: string): string | null {
    if (!this.db) return null;
    const cleanSql = sqlChuan.trim().replace(/;\s*$/, '');
    const whereMatch = /\bWHERE\b([\s\S]+?)(?:\bORDER\s+BY\b|\bGROUP\s+BY\b|\bLIMIT\b|$)/i.exec(cleanSql);
    if (!whereMatch) return null;
    const whereClause = whereMatch[1]!.trim();
    const beforeWhere = cleanSql.slice(0, whereMatch.index).trim();

    let countBaseSql: string;
    const withMatch = /^\s*(WITH\s+[\s\S]+?\s+AS\s+\([\s\S]+?\))\s+SELECT\b([\s\S]+?)\bFROM\b([\s\S]+)$/i.exec(beforeWhere);
    if (withMatch) {
      countBaseSql = `${withMatch[1]} SELECT COUNT(*) FROM ${withMatch[3]}`;
    } else {
      const fromMatch = /^\s*SELECT\b([\s\S]+?)\bFROM\b([\s\S]+)$/i.exec(beforeWhere);
      if (fromMatch) {
        countBaseSql = `SELECT COUNT(*) FROM ${fromMatch[2]}`;
      } else {
        countBaseSql = `SELECT COUNT(*) FROM (${beforeWhere}) AS __sub`;
      }
    }

    const tach = tachDieuKienCapNgoai(whereClause);
    if (!tach || tach.dks.length < 2 || tach.dks.length > 3) return null;

    const dks = tach.dks;
    const kieu = tach.kieu;
    const hoanViDs = hoanVi(dks);
    const chuoiThuTu: string[] = [];

    const formatSo = (n: number) => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

    if (kieu === 'AND') {
      const baseCount = this.demDongSql(countBaseSql);
      if (baseCount === null) return null;

      for (const p of hoanViDs) {
        const buocCounts: number[] = [baseCount];
        let curWhere = '';
        let ok = true;
        for (let i = 0; i < p.length; i++) {
          curWhere = curWhere ? `${curWhere} AND (${p[i]})` : `(${p[i]})`;
          const c = this.demDongSql(`${countBaseSql} WHERE ${curWhere}`);
          if (c === null) {
            ok = false;
            break;
          }
          buocCounts.push(c);
        }
        if (!ok) continue;
        const nhan = `${nhanDieuKien(p[0]!)} trước: ${buocCounts.map(formatSo).join(' → ')}`;
        if (!chuoiThuTu.includes(nhan)) chuoiThuTu.push(nhan);
      }
    } else {
      // OR: mỗi vế là một bước gộp, số tăng
      for (const p of hoanViDs) {
        const buocCounts: number[] = [];
        let curWhere = '';
        let ok = true;
        for (let i = 0; i < p.length; i++) {
          curWhere = curWhere ? `${curWhere} OR (${p[i]})` : `(${p[i]})`;
          const c = this.demDongSql(`${countBaseSql} WHERE ${curWhere}`);
          if (c === null) {
            ok = false;
            break;
          }
          buocCounts.push(c);
        }
        if (!ok) continue;
        const nhan = `${nhanDieuKien(p[0]!)} trước: ${buocCounts.map(formatSo).join(' → ')}`;
        if (!chuoiThuTu.includes(nhan)) chuoiThuTu.push(nhan);
      }
    }

    if (chuoiThuTu.length === 0) return null;
    return chuoiThuTu.sort().join(' · ');
  }

  private inThuThach(t: TheThuThachMvp, dongOut: string[]): void {
    dongOut.push(`#### 💻 Màn tra dữ liệu: ${this.dienTen(t.tieuDe)} (thẻ \`${t.id}\`)`);
    dongOut.push(`*Đề bài:* ${this.dienTen(t.deBai)}`);
    dongOut.push('');
    dongOut.push('```sql');
    dongOut.push(t.sqlChuan.trim());
    dongOut.push('```');
    dongOut.push('');

    const kq = this.chaySql(t.sqlChuan);
    if (kq.loi) {
      dongOut.push(`*(Chạy SQL: ${kq.loi})*`);
    } else {
      const tongSo = kq.dong.length;
      const hienThi = kq.dong.slice(0, 10);
      dongOut.push(`*Kết quả chạy thật: ${tongSo} dòng*`);
      dongOut.push('');
      dongOut.push(`| ${kq.cot.join(' | ')} |`);
      dongOut.push(`| ${kq.cot.map(() => '---').join(' | ')} |`);
      for (const d of hienThi) {
        dongOut.push(`| ${d.map((v) => (v === null ? 'NULL' : String(v))).join(' | ')} |`);
      }
      if (tongSo > 10) {
        dongOut.push(`*... còn ${tongSo - 10} dòng nữa*`);
      }
    }
    dongOut.push('');

    if (t.cotNop && t.cotNop.length > 0) {
      dongOut.push(`- **Nộp cột**: ${t.cotNop.join(', ')}`);
    }
    const locTungBuoc = this.tinhLocTungBuoc(t.sqlChuan);
    if (locTungBuoc) {
      dongOut.push(`- **Lọc từng bước**: ${locTungBuoc}`);
    }
    if ((t.cotNop && t.cotNop.length > 0) || locTungBuoc) {
      dongOut.push('');
    }

    if (t.phanUng && t.phanUng.length > 0) {
      dongOut.push('*Các bẫy và phản hồi từ nhân vật:*');
      for (const p of t.phanUng) {
        const khiStr = this.dinhDangKhi(p.khi);
        const loiThoai = p.loi.map((l) => this.dinhDangLoi(l)).join(' / ');
        dongOut.push(`- ${khiStr} → ${loiThoai}`);
      }
      dongOut.push('');
    }

    if (t.vatChung) {
      this.theDaCo.add(t.vatChung.id);
      dongOut.push(`> 🗂️ **Bằng chứng thu thập**: **${t.vatChung.title}** — ${t.vatChung.description}`);
    }
    dongOut.push('*Bạn tra cứu thành công và có đủ thông tin để tiếp tục.*');
    dongOut.push('');
  }

  xuatVuHoacViec(ma: string): string {
    this.theDaCo.clear();
    const lich = this.duLieu.lich;
    const laVu1 = ma === 'vu1' || ma === 'vu-1';
    const vu = (lich.vuSau ?? []).find(
      (v) => v.id === ma || (ma === 'vu-2' && v.id === 'vu2') || (ma === 'vu-3' && v.id === 'vu3') || (ma === 'vu-4' && v.id === 'vu4') || (ma === 'vu-5' && v.id === 'vu5'),
    );
    const phu = (lich.nhiemVuPhu ?? []).find((p) => p.id === ma);

    let tieuDeChinh: string;
    if (laVu1) {
      const ten = lich.vu.ten.replace(/^Vụ \d+\s*[—–-]\s*/, '');
      tieuDeChinh = `Vụ 1 — ${ten}`;
    } else if (vu) {
      const soVu = this.laySoVu(vu.id);
      const ten = vu.ten.replace(/^Vụ \d+\s*[—–-]\s*/, '');
      tieuDeChinh = `Vụ ${soVu} — ${ten}`;
    } else if (phu) {
      tieuDeChinh = phu.ten.startsWith('Nhiệm vụ phụ') || phu.ten.startsWith('Việc phụ')
        ? phu.ten
        : `Nhiệm vụ phụ — ${phu.ten}`;
    } else {
      tieuDeChinh = `Kịch bản — ${ma}`;
    }

    // Thiết lập thông tin lịch (S4)
    const thongTinNgayCuaChuoi = new Map<string, ThongTinNgayCYOA>();

    if (laVu1) {
      const hanChot = lich.hanChot ?? null;
      const viecChot = lich.viecChot ?? null;
      for (const n of lich.ngay) {
        if (!n.chuoi) continue;
        let dongNgay = `Ngày ${n.so}`;
        const kieuProp = (n as { kieu?: string }).kieu;
        let ngayThuc = (n as { ngay?: string }).ngay;
        if (kieuProp === 'theo-truyen') {
          ngayThuc = ngayDieuTraIso(n.so, lich.ngayMoDau ?? null);
        }
        if (ngayThuc) {
          let thuNgay = dinhDangNgayThu(ngayThuc);
          if (hanChot && viecChot) {
            const con = tinhSoNgay(ngayThuc, hanChot);
            if (con >= 0) thuNgay += ` · Còn ${con} ngày tới ${viecChot}`;
          }
          dongNgay = thuNgay;
        }
        thongTinNgayCuaChuoi.set(n.chuoi, { dongNgay });
      }
      if (lich.ngayHop?.chuoi) {
        thongTinNgayCuaChuoi.set(lich.ngayHop.chuoi, { dongNgay: 'Buổi họp rà soát' });
      }
    } else if (vu) {
      const hanChot = vu.hanChot ?? null;
      const viecChot = vu.viecChot ?? null;
      if (vu.cacNgay && vu.cacNgay.length > 0) {
        for (const cn of vu.cacNgay) {
          let dongNgay = dinhDangNgayThu(cn.ngay);
          if (hanChot && viecChot) {
            const con = tinhSoNgay(cn.ngay, hanChot);
            if (con >= 0) dongNgay += ` · Còn ${con} ngày tới ${viecChot}`;
          }
          thongTinNgayCuaChuoi.set(cn.chuoi, { dongNgay });
        }
      } else if (vu.ngay && vu.chuoi) {
        let dongNgay = dinhDangNgayThu(vu.ngay);
        if (hanChot && viecChot) {
          const con = tinhSoNgay(vu.ngay, hanChot);
          if (con >= 0) dongNgay += ` · Còn ${con} ngày tới ${viecChot}`;
        }
        thongTinNgayCuaChuoi.set(vu.chuoi, { dongNgay });
      }
    } else if (phu && phu.ngay && phu.chuoi) {
      thongTinNgayCuaChuoi.set(phu.chuoi, { dongNgay: dinhDangNgayThu(phu.ngay) });
    }

    // Tìm các chuỗi thuộc vụ
    const chuoiDau = laVu1
      ? lich.chuoiDau
      : vu?.chuoi ?? phu?.chuoi ?? ma;

    const dsChuoiKhamPha: string[] = [];
      const daKhamPha = new Map<string, number>();

      const startChainsForDay: string[] = [];
      if (laVu1) {
        if (lich.chuoiDau) startChainsForDay.push(lich.chuoiDau);
        for (const n of lich.ngay) if (n.chuoi) startChainsForDay.push(n.chuoi);
        if (lich.ngayHop?.chuoi) startChainsForDay.push(lich.ngayHop.chuoi);
      } else if (vu?.cacNgay) {
        if (vu.chuoi) startChainsForDay.push(vu.chuoi);
        for (const d of vu.cacNgay) startChainsForDay.push(d.chuoi);
      } else {
        if (chuoiDau) startChainsForDay.push(chuoiDau);
      }

      const hangDoi: { id: string; dayIndex: number }[] = [];
      for (let i = 0; i < startChainsForDay.length; i++) {
        hangDoi.push({ id: startChainsForDay[i]!, dayIndex: i });
      }
      if (laVu1) {
        if (lich.ket?.that) hangDoi.push({ id: lich.ket.that, dayIndex: -1 });
        if (lich.ket?.thuong) hangDoi.push({ id: lich.ket.thuong, dayIndex: -1 });
      }

    // Việc ngày lễ (S4)
    const dsViecNgayLe = (lich.viecNgayLe ?? []).filter(
      (l) => l.thuocVu === ma || (laVu1 && (l.thuocVu === 'vu1' || l.thuocVu === 'vu-1')),
    );
    for (const vnl of dsViecNgayLe) {
      hangDoi.push({ id: vnl.chuoi, dayIndex: -1 });
        hangDoi.push({ id: vnl.khiLo, dayIndex: -1 });
      let ganXong = false;
      const ngayFormat = dinhDangNgayThu(vnl.ngay);
      for (const [, tt] of thongTinNgayCuaChuoi) {
        if (tt.dongNgay.includes(ngayFormat)) {
          if (!tt.viecNgayLe) tt.viecNgayLe = [];
          tt.viecNgayLe.push(vnl);
          ganXong = true;
          break;
        }
      }
      if (!ganXong) {
        const ttDau = thongTinNgayCuaChuoi.get(chuoiDau) ?? thongTinNgayCuaChuoi.values().next().value;
        if (ttDau) {
          if (!ttDau.viecNgayLe) ttDau.viecNgayLe = [];
          ttDau.viecNgayLe.push(vnl);
        } else {
          thongTinNgayCuaChuoi.set(chuoiDau, {
            dongNgay: ngayFormat,
            viecNgayLe: [vnl],
          });
        }
      }
    }

    while (hangDoi.length > 0) {
      const hd = hangDoi.shift()!;
      const id = hd.id;
      const dayIndex = hd.dayIndex;
      if (daKhamPha.has(id)) continue;
      daKhamPha.set(id, dayIndex);
      dsChuoiKhamPha.push(id);
      const c = this.duLieu.chuoi.find((x) => x.id === id);
      if (!c) continue;
      for (const n of c.nodes) {
        if (n.type === 'goto') hangDoi.push({ id: n.to, dayIndex });
        else if (n.type === 'jump-if') hangDoi.push({ id: n.to, dayIndex });
        else if (n.type === 'branch') {
          for (const ch of n.choices) {
            for (const h of ch.hauQua) if (h.kind === 'di-toi') hangDoi.push({ id: h.chuoi, dayIndex });
          }
        } else if (n.type === 'explore') {
          for (const d of n.diem) hangDoi.push({ id: d.chuoi, dayIndex });
        } else if (n.type === 'consequence') {
          for (const h of n.hauQua) if (h.kind === 'di-toi') hangDoi.push({ id: h.chuoi, dayIndex });
        } else if (n.type === 'doi-chat' && n.nguoiQuen) {
          hangDoi.push({ id: n.nguoiQuen.noiThay, dayIndex });
        }
      }
    }

    // Xây dựng danh sách các đoạn truyện
    const doan: DoanTruyen[] = [];
    const chuoiToSo = new Map<string, number>();

    // Phân bổ số đoạn cho mỗi chuỗi chính
    let demDoan = 1;
    // doanTruocDo removed
    for (const cId of dsChuoiKhamPha) {
      chuoiToSo.set(cId, demDoan++);
    }

    // Hàm tạo đoạn bổ sung cho các lựa chọn rẽ nhánh / phản hồi đối chất
    const taoDoanBoSung = (_tieuDe: string): number => {
      const so = demDoan++;
      return so;
    };

    const dayToMapData = new Map<number, { so: number, luaChon: DoanTruyen['luaChon'] }>();
    for (const cId of dsChuoiKhamPha) {
      const c = this.duLieu.chuoi.find((x) => x.id === cId);
      if (!c) continue;
      const dayIndex = daKhamPha.get(cId)!;

      if (!dayToMapData.has(dayIndex)) {
          dayToMapData.set(dayIndex, { so: taoDoanBoSung('Bản đồ'), luaChon: [] });
      }
      
      const mapData = dayToMapData.get(dayIndex)!;

      for (const n of c.nodes) {
          if (n.type === 'explore' && n.kieu === 'ban-do') {
              for (const d of n.diem) {
                  const targetSo = chuoiToSo.get(d.chuoi);
                  if (targetSo) {
                      const nhanDiem = d.nhan || this.tenCanh(d.chuoi) || d.chuoi;
                      const dauText = d.dau === 'chinh' ? ' !' : d.dau === 'phu' ? ' (tùy chọn)' : '';
                      mapData.luaChon.push({
                          nhan: `Đi tới: ${nhanDiem}${dauText}`,
                          toiSo: targetSo
                      });
                  }
              }
          } else if (n.type === 'branch') {
              const isOtherPlace = n.choices.some(ch => ch.hauQua.some(h => {
                  if (h.kind === 'di-toi') {
                      const targetChain = this.duLieu.chuoi.find(x => x.id === h.chuoi);
                      return targetChain && targetChain.canh !== c.canh;
                  }
                  return false;
              }));
              if (isOtherPlace) {
                  for (const ch of n.choices) {
                      let targetSo = 0;
                      for (const h of ch.hauQua) {
                          if (h.kind === 'di-toi' && chuoiToSo.has(h.chuoi)) {
                              targetSo = chuoiToSo.get(h.chuoi)!;
                              break;
                          }
                      }
                      if (targetSo > 0) {
                          const dkText = ch.khi ? this.dkChu(ch.khi) : undefined;
                          mapData.luaChon.push({
                              nhan: `Đi tới: ${this.dienTen(ch.text)}`,
                              toiSo: targetSo,
                              dieuKien: dkText
                          });
                      }
                  }
              }
          } else if (n.type === 'explore' && n.kieu !== 'ban-do' && n.kieu !== 'quan-sat') {
              for (const d of n.diem) {
                  const targetChain = this.duLieu.chuoi.find(x => x.id === d.chuoi);
                  if (targetChain && targetChain.canh !== c.canh) {
                      const targetSo = chuoiToSo.get(d.chuoi);
                      if (targetSo) {
                          const nhanDiem = d.nhan || this.tenCanh(d.chuoi) || d.chuoi;
                          const dauText = d.dau === 'chinh' ? ' !' : d.dau === 'phu' ? ' (tùy chọn)' : '';
                          mapData.luaChon.push({
                              nhan: `Đi tới: ${nhanDiem}${dauText}`,
                              toiSo: targetSo
                          });
                      }
                  }
              }
          }
      }
    }
    
    for (const [day, data] of dayToMapData.entries()) {
        if (data.luaChon.length === 0) {
            dayToMapData.delete(day);
        }
    }


    // Tạo nội dung từng đoạn
    for (const cId of dsChuoiKhamPha) {
      const c = this.duLieu.chuoi.find((x) => x.id === cId);
      let so = chuoiToSo.get(cId)!;
      if (!c) {
        const doanLoi = { so, tieuDe: `Chuỗi ${cId}`, dong: [`*(Không tìm thấy nội dung chuỗi ${cId})*`], luaChon: [] }; doan.push(doanLoi);  continue;
      }

      let tieuDe = c.title;
      const tieuDeCanh = this.tenCanh(c.canh);
      const moTa = this.moTaCanh(c.canh);
      const dong: string[] = [];
      const luaChon: DoanTruyen['luaChon'] = [];

      // Dòng ngày (S4)
      const thongTinNgay = thongTinNgayCuaChuoi.get(cId);
      if (thongTinNgay) {
        dong.push(thongTinNgay.dongNgay);
        dong.push('');
      }

      dong.push(`📍 **${tieuDeCanh}** — *${c.title}*`);
      if (c.canhCat) dong.push('> 🎬 *[Cảnh cắt]*');
      if (moTa) dong.push(`> *Không gian:* ${moTa}`);
      dong.push('');

      for (let i = 0; i < c.nodes.length; i++) {
        const n = c.nodes[i]!;
        switch (n.type) {
          case 'line':
            if (n.display === 'card') {
              dong.push(`> 📜 **[THẺ CHỮ]** ${this.dienTen(n.text)}`);
            } else {
              dong.push(`- ${this.dinhDangLoi(n)}`);
            }
            break;
          case 'task':
            dong.push(`> 🎯 **NHIỆM VỤ**: ${this.dienTen(n.text)}`);
            break;
          case 'reminder':
            dong.push(`> 💭 **Nhắc nhở** (${this.ten(n.speaker)}): ${this.dienTen(n.text)}`);
            break;
          case 'xong-viec-chinh':
            break;
          case 'show-document': {
            const h = this.duLieu.hoSo[n.documentId];
            if (h) {
              dong.push(`> 🗂️ **Tài liệu mới**: **${this.dienTen(h.heading)}** — ${h.fields['Nội dung'] || h.fields['Mô tả'] || ''}`);
            }
            break;
          }
          case 'save-evidence': {
            const h = this.duLieu.hoSo[n.evidenceId];
            if (h) {
              dong.push(`> 🗂️ **Bằng chứng mới**: **${this.dienTen(h.heading)}** — ${h.fields['Nội dung'] || h.fields['Mô tả'] || ''}`);
            }
            break;
          }
          case 'notebook-note': {
            const s = this.duLieu.soTay[n.trang];
            dong.push(`> 📓 **Sổ cá nhân**: ${s?.chuThich ?? n.trang}`);
            break;
          }
          case 'image':
            dong.push(this.dinhDangAnh(n.imageId, n.chuThich, n.moTa));
            break;
          case 'challenge':
          case 'fix-query': {
            const t = this.duLieu.thuThach[n.challengeId];
            if (t) this.inThuThach(t, dong);
            break;
          }
          case 'question': {
            dong.push(`❓ **${this.ten(n.asker.speaker)} hỏi**: "${this.dienTen(n.asker.text)}"`);
            dong.push('*Các lựa chọn trả lời:*');
            for (const ch of n.choices) {
              const fb = ch.feedback.map((l: LoiMvp) => this.dinhDangLoi(l)).join(' / ');
              dong.push(`  - "${this.dienTen(ch.text)}" ${ch.correct ? '✅' : '❌'} → ${fb}`);
            }
            dong.push('');
            break;
          }
                    case 'branch': {
            const isOtherPlace = n.choices.some(ch => ch.hauQua.some(h => {
                if (h.kind === 'di-toi') {
                    const targetChain = this.duLieu.chuoi.find(x => x.id === h.chuoi);
                    return targetChain && targetChain.canh !== c.canh;
                }
                return false;
            }));
            if (isOtherPlace) {
                const mapData = dayToMapData.get(daKhamPha.get(cId)!);
                if (mapData) {
                    luaChon.push({ nhan: 'Mở bản đồ', toiSo: mapData.so });
                }
                break;
            }

            dong.push(`🔀 **Lựa chọn của bạn** (${this.ten(n.asker.speaker)}: "${this.dienTen(n.asker.text)}"):`);
            for (const ch of n.choices) {
              let targetSo = 0;
              for (const h of ch.hauQua) {
                if (h.kind === 'di-toi' && chuoiToSo.has(h.chuoi)) {
                  targetSo = chuoiToSo.get(h.chuoi)!;
                  break;
                }
              }
              const dkText = ch.khi ? this.dkChu(ch.khi) : undefined;
              if (targetSo > 0) {
                luaChon.push({
                  nhan: `Chọn: "${this.dienTen(ch.text)}"`,
                  toiSo: targetSo,
                  dieuKien: dkText,
                });
              } else {
                dong.push(`  - Lựa chọn: "${this.dienTen(ch.text)}"${dkText ? ` (chỉ hiện khi ${dkText})` : ''}`);
              }
            }
            break;
          }
                    case 'explore': {
            if (n.kieu === 'ban-do') {
                const mapData = dayToMapData.get(daKhamPha.get(cId)!);
                if (mapData) {
                    luaChon.push({ nhan: 'Mở bản đồ', toiSo: mapData.so });
                }
            } else {
                const tenNoi = this.tenCanh(c.canh) || c.canh;
                dong.push(`📍 **Đang ở ${tenNoi}:**`);
                dong.push('*Những chỗ có thể khám phá ở đây:*');
                for (const d of n.diem) {
                    const targetChain = this.duLieu.chuoi.find(x => x.id === d.chuoi);
                    if (targetChain && targetChain.canh !== c.canh) {
                        continue;
                    }
                    const targetSo = chuoiToSo.get(d.chuoi);
                    const nhanDiem = d.nhan || this.tenCanh(d.chuoi) || d.chuoi;
                    const dauText = d.dau === 'phu' ? ' (chi tiết ẩn / tùy chọn)' : '';
                    if (targetSo) {
                        luaChon.push({
                            nhan: `Khám phá: ${nhanDiem}${dauText}`,
                            toiSo: targetSo,
                        });
                    }
                }
                
                const mapData = dayToMapData.get(daKhamPha.get(cId)!);
                if (mapData && !luaChon.some(x => x.nhan === 'Mở bản đồ')) {
                    luaChon.push({ nhan: 'Mở bản đồ', toiSo: mapData.so });
                }
            }
            const mapData = dayToMapData.get(daKhamPha.get(cId)!);
            if (i < c.nodes.length - 1) {
              const tenNoi = this.tenCanh(c.canh) || c.canh;
              const nhanSau = `Sau khi xem hết các chỗ ở ${tenNoi}`;
              const soSau = taoDoanBoSung(nhanSau);
              luaChon.push({
                nhan: 'Sau khi xem hết các chỗ',
                toiSo: soSau,
              });
              
              doan.push({
                so,
                tieuDe,
                dong: [...dong],
                luaChon: [...luaChon],
              });

              so = soSau;
              tieuDe = nhanSau;
              dong.length = 0;
              luaChon.length = 0;
              
              if (mapData) {
                  luaChon.push({ nhan: 'Mở bản đồ', toiSo: mapData.so });
              }
            }
            break;
          }
          case 'doi-chat': {
            dong.push(`⚖️ **ĐỐI CHẤT**: ${this.ten(n.asker.speaker)} nêu giả thuyết: "${this.dienTen(n.asker.text)}"`);
            if (n.cauHoi) dong.push(`*Câu hỏi:* ${this.dienTen(n.cauHoi)}`);
            dong.push('');

            let doanSauDoiChat = 0;
            if (i < c.nodes.length - 1) {
              doanSauDoiChat = taoDoanBoSung(`Tiếp tục sau đối chất ${n.id}`);
            }

            // Nhánh người quen
            if (n.nguoiQuen) {
              const nqSo = chuoiToSo.get(n.nguoiQuen.noiThay);
              if (nqSo) {
                luaChon.push({
                  nhan: `Nếu đủ 3 hảo cảm: Nhờ ${this.ten(n.nguoiQuen.ma)} nói thay`,
                  toiSo: nqSo,
                });
              }
            }

            // Các lựa chọn thẻ (S5: in tiêu đề thẻ, không in mã thẻ)
            for (const b of n.bangChung) {
              const tieuDeThe = this.tenTheHoSo(b.id);
              const soPhanHoi = taoDoanBoSung(`Phản hồi khi trình thẻ: ${tieuDeThe}`);
              const mucText = b.muc === 'du' ? 'ĐỦ CĂN CỨ' : b.muc === 'ho-tro' ? 'HỖ TRỢ' : 'GỢI Ý';
              luaChon.push({
                nhan: `Trình thẻ: ${tieuDeThe} (${mucText})`,
                toiSo: soPhanHoi,
              });

              // Tạo đoạn phản hồi
              const fbLines = b.feedback.map((l: LoiMvp) => `- ${this.dinhDangLoi(l)}`);
              const luaChonPhanHoi: DoanTruyen['luaChon'] = [];
              if (b.muc === 'du') {
                fbLines.push('');
                fbLines.push('✅ **Lập luận vững chắc! Đối thủ đã bị thuyết phục.**');
                if (doanSauDoiChat > 0) {
                  luaChonPhanHoi.push({ nhan: 'Tiếp tục câu chuyện', toiSo: doanSauDoiChat });
                }
              } else {
                fbLines.push('');
                fbLines.push('⚠️ *Căn cứ này chưa đủ để kết luận.*');
                luaChonPhanHoi.push({ nhan: 'Quay lại đối chất để chọn thẻ khác', toiSo: so });
              }
              doan.push({
                so: soPhanHoi,
                tieuDe: `Đối chất: Trình ${tieuDeThe}`,
                dong: [`⚖️ **Phản hồi đối chất:**`, ...fbLines],
                luaChon: luaChonPhanHoi,
              });
            }

            // Chưa đủ căn cứ
            if (n.chuaDu) {
              const soChuaDu = taoDoanBoSung(`Nói chưa đủ căn cứ`);
              luaChon.push({ nhan: 'Nói: "Chưa đủ căn cứ"', toiSo: soChuaDu });
              doan.push({
                so: soChuaDu,
                tieuDe: 'Đối chất: Chưa đủ căn cứ',
                dong: [
                  '⚖️ **Phản hồi khi thừa nhận chưa đủ căn cứ:**',
                  ...n.chuaDu.map((l: LoiMvp) => `- ${this.dinhDangLoi(l)}`),
                ],
                luaChon: [{ nhan: 'Quay lại đối chất', toiSo: so }],
              });
            }

            // Thẻ khác
            if (n.khac) {
              const soKhac = taoDoanBoSung(`Trình thẻ khác không khớp`);
              luaChon.push({ nhan: 'Trình thẻ khác', toiSo: soKhac });
              doan.push({
                so: soKhac,
                tieuDe: 'Đối chất: Thẻ không khớp',
                dong: [
                  '⚖️ **Phản hồi khi trình thẻ không liên quan:**',
                  ...n.khac.map((l: LoiMvp) => `- ${this.dinhDangLoi(l)}`),
                ],
                luaChon: [{ nhan: 'Quay lại đối chất', toiSo: so }],
              });
            }

            if (doanSauDoiChat > 0) {
              const cacNodeConLai = c.nodes.slice(i + 1);
              const dongConLai: string[] = [];
              for (const kn of cacNodeConLai) {
                if (kn.type === 'line') dongConLai.push(`- ${this.dinhDangLoi(kn)}`);
              }
              doan.push({
                so: doanSauDoiChat,
                tieuDe: `Tiếp tục: ${c.title}`,
                dong: dongConLai,
                luaChon: [],
              });
            }
            break;
          }
          case 'jump-if': {
            const targetSo = chuoiToSo.get(n.to);
            if (targetSo) {
              luaChon.push({
                nhan: `Nếu ${this.dkChu(n.dieuKien)}: Rẽ sang hướng khác`,
                toiSo: targetSo,
              });
            }
            break;
          }
          case 'goto': {
            const targetSo = chuoiToSo.get(n.to);
            const targetChuoi = this.duLieu.chuoi.find((x) => x.id === n.to);
            if (targetChuoi && c.canh !== targetChuoi.canh && !targetChuoi.canhCat) {
              dong.push('');
              dong.push('⚠ (bản cũ: tự chuyển nơi)');
            }
            if (targetSo) {
              luaChon.push({
                nhan: 'Đi tiếp',
                toiSo: targetSo,
              });
            }
            break;
          }
          case 'end': {
            dong.push('');
            dong.push('🏁 **KẾT THÚC** — Hoàn tất nhiệm vụ.');
            const tieuDeKet = vu?.tieuDeKet ?? phu?.tieuDeKet;
            const loiKet = vu?.loiKet ?? phu?.loiKet;
            if (tieuDeKet && loiKet) {
              dong.push(`> **${tieuDeKet}** — ${loiKet}`);
            }
            break;
          }
          default:
            break;
        }
      }

      // Lựa chọn việc ngày lễ (S4)
      if (thongTinNgay?.viecNgayLe) {
        for (const vnl of thongTinNgay.viecNgayLe) {
          const toiLe = chuoiToSo.get(vnl.chuoi);
          const toiLo = chuoiToSo.get(vnl.khiLo);
          if (toiLe) {
            luaChon.push({
              nhan: `Làm việc ngày lễ: ${vnl.ten}`,
              toiSo: toiLe,
            });
          }
          if (toiLo) {
            luaChon.push({
              nhan: 'Bỏ qua',
              toiSo: toiLo,
            });
          }
        }
      }

      // Quay lại cảnh khám phá nếu hết thoại mà không có lựa chọn nào khác (S11)
      if (luaChon.length === 0 && !c.nodes.some((node) => node.type === 'end' || node.type === 'explore')) {
        const hubCungNoi = this.duLieu.chuoi.find(
          (x) => x.canh === c.canh && x.nodes.some((node) => node.type === 'explore') && chuoiToSo.has(x.id),
        );
        if (hubCungNoi) {
          luaChon.push({
            nhan: `Quay lại: Đang ở ${this.tenCanh(c.canh)}`,
            toiSo: chuoiToSo.get(hubCungNoi.id)!,
          });
        }
      }

      const doanChinh: DoanTruyen = {
        so,
        tieuDe,
        dong,
        luaChon,
      };
      
      // Hết ngày (R1) AFTER all choices (including hubCungNoi) are added
      let inHetNgay = false;
      const coXongViec = c.nodes.some(n => n.type === 'xong-viec-chinh');
      if (coXongViec) {
        inHetNgay = true;
      } else if (laVu1) {
        if (luaChon.length === 0 && !c.nodes.some(n => n.type === 'xong-viec-chinh')) {
            inHetNgay = true;
        }
      } else if (vu) {
        // Linear story (Mùa 1 Vụ 2-5)
        if (c.nodes.some(n => n.type === 'end')) {
            inHetNgay = true;
        } else if (luaChon.length === 0 && !c.nodes.some(n => n.type === 'xong-viec-chinh')) {
            inHetNgay = true;
        }
      }

      if (inHetNgay) {
        dong.push('');
        dong.push('**Hết ngày.**');
        dong.push('');
        
        const dayIndex = daKhamPha.get(cId) ?? -1;
        if (dayIndex >= 0 && dayIndex < startChainsForDay.length - 1) {
           const nextDayStart = startChainsForDay[dayIndex + 1];
           if (nextDayStart && chuoiToSo.has(nextDayStart)) {
              let nhanSangNgay = `Sang ngày ${dayIndex + 1}`;
              if (laVu1 && dayIndex === 0) nhanSangNgay = 'Sang ngày 1';
              else if (laVu1 && dayIndex > 0) nhanSangNgay = `Sang ngày ${dayIndex + 1}`;
              
              luaChon.push({
                 nhan: nhanSangNgay,
                 toiSo: chuoiToSo.get(nextDayStart)!
              });
           }
        }
      }

      doan.push(doanChinh);
      
    }

    // Tạo các đoạn bản đồ
    for (const [dayIndex, mapData] of dayToMapData.entries()) {
        const firstChainId = dsChuoiKhamPha.find(id => daKhamPha.get(id) === dayIndex);
        let tieuDeNgay = `Ngày ${dayIndex + 1}`;
        if (firstChainId) {
            const tt = thongTinNgayCuaChuoi.get(firstChainId);
            if (tt) tieuDeNgay = tt.dongNgay.split(' · ')[0]!;
        }
        
        const uniqueLuaChon = [];
        const seen = new Set();
        for (const lc of mapData.luaChon) {
            if (!seen.has(lc.toiSo)) {
                seen.add(lc.toiSo);
                uniqueLuaChon.push(lc);
            }
        }
        
        doan.push({
            so: mapData.so,
            tieuDe: `Bản đồ ${tieuDeNgay}`,
            dong: [
                `🗺️ **Bản đồ** — *${tieuDeNgay}*`,
                '',
                '*Những nơi có thể đi tới:*'
            ],
            luaChon: uniqueLuaChon
        });
    }

    // Đảm bảo các đoạn được sắp xếp theo số thứ tự
    doan.sort((a, b) => a.so - b.so);

    // Dựng tài liệu hoàn chỉnh
    const ketQua: string[] = [];
    ketQua.push(`# ${tieuDeChinh}`);
    ketQua.push('');
    ketQua.push('Sách truyện chữ tương tác tự chọn hướng đi (Choose-Your-Own-Adventure). Bấm vào các liên kết để chuyển đoạn.');
    ketQua.push('');

    // Bảng mục lục ngày / phân đoạn
    ketQua.push('## 📅 Mục lục phân đoạn');
    ketQua.push('');
    for (const d of doan.slice(0, 15)) {
      ketQua.push(`- [Đoạn ${d.so}: ${d.tieuDe}](#doan-${d.so})`);
    }
    if (doan.length > 15) {
      ketQua.push(`- *... và ${doan.length - 15} đoạn tiếp theo*`);
    }
    ketQua.push('');

    // Danh sách nhân vật xuất hiện (S6: in gọn tên và một dòng vai trò ngắn)
    const nvXuatHien = new Set<string>();
    for (const cId of dsChuoiKhamPha) {
      const c = this.duLieu.chuoi.find((x) => x.id === cId);
      if (c) {
        for (const n of c.nodes) {
          if (n.type === 'line' && n.speaker !== 'player' && n.speaker !== 'narrator') {
            nvXuatHien.add(n.speaker);
          }
        }
      }
    }

    ketQua.push('## 👥 Nhân vật xuất hiện');
    ketQua.push('');
    for (const nvId of nvXuatHien) {
      const nv = this.duLieu.nhanVat.find((x) => x.id === nvId);
      if (nv) {
        ketQua.push(`- **${nv.ten}**: ${this.vaiTroNgan(nv)}`);
      }
    }
    ketQua.push('');

    // Bảng đo C2
    let demLoiThoai = 0;
    let demManTra = 0;
    let demDoiChat = 0;
    for (const cId of dsChuoiKhamPha) {
      const c = this.duLieu.chuoi.find((x) => x.id === cId);
      if (c) {
        for (const n of c.nodes) {
          if (n.type === 'line') demLoiThoai++;
          else if (n.type === 'challenge') demManTra++;
          else if (n.type === 'doi-chat') demDoiChat++;
        }
      }
    }

    ketQua.push('## 📊 Bảng đo chỉ số C2');
    ketQua.push('');
    ketQua.push('| Tiêu chí | Ngưỡng thiết kế | Thực tế | Đánh giá |');
    ketQua.push('|---|---|---|---|');
    ketQua.push(`| Số dòng thoại | ≥ 300 | ${demLoiThoai} | ${demLoiThoai >= 300 ? '✅ Đạt' : '⚠️ Bản mẫu'} |`);
    ketQua.push(`| Số chuỗi phân cảnh | ≥ 40 | ${dsChuoiKhamPha.length} | ${dsChuoiKhamPha.length >= 40 ? '✅ Đạt' : '⚠️ Bản mẫu'} |`);
    ketQua.push(`| Màn tra cứu SQL | ≥ 5 | ${demManTra} | ${demManTra >= 5 ? '✅ Đạt' : '⚠️ Bản mẫu'} |`);
    ketQua.push(`| Nhịp đối chất | ≥ 3 | ${demDoiChat} | ${demDoiChat >= 3 ? '✅ Đạt' : '⚠️ Bản mẫu'} |`);
    ketQua.push('');
    ketQua.push('---');
    ketQua.push('');

    // In từng đoạn truyện với anchor
    for (const d of doan) {
      ketQua.push(`<a id="doan-${d.so}"></a>`);
      ketQua.push(`### Đoạn ${d.so}: ${d.tieuDe}`);
      ketQua.push('');
      for (const line of d.dong) {
        ketQua.push(line);
      }
      ketQua.push('');

      if (d.luaChon.length > 0) {
        ketQua.push('**Lựa chọn tiếp theo:**');
        for (const ch of d.luaChon) {
          const dk = ch.dieuKien ? ` *(Điều kiện: ${ch.dieuKien})*` : '';
          ketQua.push(`- [${ch.nhan}](#doan-${ch.toiSo})${dk}`);
        }
      } else {
        const tiepTheo = doan.find((x) => x.so === d.so + 1);
        if (tiepTheo && !d.dong.some((l) => l.includes('KẾT THÚC'))) {
          ketQua.push(`- [Đọc tiếp sang Đoạn ${tiepTheo.so}: ${tiepTheo.tieuDe}](#doan-${tiepTheo.so})`);
        }
      }
      ketQua.push('');
      ketQua.push('---');
      ketQua.push('');
    }

    this.thongKeCuoi = { soChuoi: dsChuoiKhamPha.length, soManTra: demManTra };
    return ketQua.join('\n');
  }

  xuatMucLucMua(dsTep: { ma: string; tenTep: string; tieuDe: string; laPhu: boolean; soChuoi: number; soManTra: number; soVu?: number }[]): string {
    const lich = this.duLieu.lich;
    const dong: string[] = [];
    dong.push('# CLB Thám Tử Dữ Liệu — Mùa 1: Mục lục truyện chữ');
    dong.push('');
    dong.push('> **Đây là bản chép 5 vụ cũ của MVP, chưa sửa.** Mùa 1 theo kế hoạch có 10 vụ (`docs/mua-1/ke-hoach-10-vu.md`). Các gói B4 → B10 sẽ sắp lại 5 vụ này thành Vụ 1, 2, 4, 6, 8 và viết thêm Vụ 3, 5, 7, 9, 10. Mục lục này tự cập nhật theo nội dung.');
    dong.push('');
    dong.push('Bản chuyển đổi toàn bộ các vụ án và nhiệm vụ phụ sang định dạng truyện chữ tương tác (Gamebook / CYOA).');
    dong.push('Người chơi có thể đọc, đưa ra lựa chọn và xem kết quả SQL chạy thật trực tiếp trên tài liệu Markdown.');
    dong.push('');
    dong.push('## 📚 Danh sách các Vụ án chính');
    dong.push('');
    dong.push('| Vụ | Mã | Tên vụ án | Số chuỗi | Số màn tra | Tệp truyện chữ |');
    dong.push('|---|---|---|---|---|---|');

    for (const t of dsTep.filter((x) => !x.laPhu)) {
      dong.push(`| ${t.soVu || ''} | \`${t.ma}\` | **${t.tieuDe}** | ${t.soChuoi} | ${t.soManTra} | [Đọc truyện](${t.tenTep}) |`);
    }

    dong.push('');
    dong.push('## 🧩 Nhiệm vụ phụ (Rèn luyện kỹ năng)');
    dong.push('');
    dong.push('| Nhiệm vụ | Mã | Tên nhiệm vụ | Tệp truyện chữ |');
    dong.push('|---|---|---|---|');

    for (const t of dsTep.filter((x) => x.laPhu)) {
      dong.push(`| ${t.ma} | \`${t.ma}\` | **${t.tieuDe}** | [Đọc truyện](${t.tenTep}) |`);
    }

    dong.push('');
    dong.push('## 🗓️ Lịch trình Mùa 1');
    dong.push('');

    const suKienLich: { ngay: string; moTa: string }[] = [];
    if (lich.ngayMoDau) {
      suKienLich.push({ ngay: lich.ngayMoDau, moTa: 'Nhập học, nhận phòng KTX.' });
    }
    const tenVu1 = lich.vu.ten.replace(/^Vụ \d+\s*[—–-]\s*/, '');
    suKienLich.push({ ngay: '2024-09-24', moTa: `Vụ 1 — ${tenVu1}.` });

    for (const v of lich.vuSau ?? []) {
      if (v.ngay) {
        const soVu = this.laySoVu(v.id);
        const tenVu = v.ten.replace(/^Vụ \d+\s*[—–-]\s*/, '');
        suKienLich.push({ ngay: v.ngay, moTa: `Vụ ${soVu} — ${tenVu}.` });
      }
    }

    for (const p of lich.nhiemVuPhu ?? []) {
      if (p.ngay) {
        const soVu = p.moSau ? p.moSau.replace('vu', '') : '';
        suKienLich.push({ ngay: p.ngay, moTa: `Nhiệm vụ phụ — ${p.ten}${soVu ? ` (mở sau Vụ ${soVu})` : ''}.` });
      }
    }

    for (const l of lich.viecNgayLe ?? []) {
      if (l.ngay) {
        suKienLich.push({ ngay: l.ngay, moTa: `Việc ngày lễ — ${l.ten}.` });
      }
    }

    suKienLich.sort((a, b) => a.ngay.localeCompare(b.ngay));

    for (const sk of suKienLich) {
      const [y, m, d] = sk.ngay.split('-');
      dong.push(`- **${d}/${m}/${y}**: ${sk.moTa}`);
    }

    if (lich.nguoiQuen && lich.nguoiQuen.length > 0) {
      dong.push('');
      dong.push('## 🤝 Người quen và hảo cảm');
      dong.push('');
      for (const nq of lich.nguoiQuen) {
        const moSauText = nq.moSau ? `Mở sau ${nq.moSau}. ` : '';
        dong.push(`- **${nq.ten}**: ${moSauText}Hoàn thành ${nq.viec.length} việc giúp để nhận CG và hỗ trợ trong các vụ đối chất.`);
      }
    }

    dong.push('');
    return dong.join('\n');
  }
}

export async function chayXuatTruyen(
  ma?: string,
  thuMucNoiDung: string = THU_MUC_NOI_DUNG_MUA_1,
  thuMucXuat: string = THU_MUC_XUAT_TRUYEN,
): Promise<string[]> {
  const kq = docThuMucMvp(thuMucNoiDung);
  const luat = kiemLuatMvp(kq.mvp);
  const duLieu = chuyenMvp(kq.mvp, luat);

  const rawCanh = new Map<string, { ten: string; moTa?: string | null }>();
  for (const c of kq.mvp.canh) {
    rawCanh.set(c.id, { ten: c.ten, moTa: c.moTa });
  }

  const boXuat = new BoXuatTruyenChu(duLieu, rawCanh);
  await boXuat.khoiTaoDb();

  // Đảm bảo thư mục xuất sạch sẽ: xóa các tệp .md cũ để không sót tệp thừa (S3, S9)
  if (existsSync(thuMucXuat)) {
    for (const f of readdirSync(thuMucXuat)) {
      if (f.endsWith('.md')) {
        unlinkSync(join(thuMucXuat, f));
      }
    }
  } else {
    mkdirSync(thuMucXuat, { recursive: true });
  }

  const danhSachDaXuat: string[] = [];
  const kb = duLieu as unknown as KichBanMvp;

  // Đọc danh sách vụ án chính từ lich (S2)
  const tenVu1 = kb.lich.vu.ten.replace(/^Vụ \d+\s*[—–-]\s*/, '');
  const dsVuChinh = [
    { ma: 'vu1', tenTep: 'vu1.md', tieuDe: `Vụ 1 — ${tenVu1}`, laPhu: false, soVu: 1, soChuoi: 0, soManTra: 0 },
    ...(kb.lich.vuSau ?? []).map((v) => {
      const soVu = boXuat.laySoVu(v.id);
      const ten = v.ten.replace(/^Vụ \d+\s*[—–-]\s*/, '');
      return {
        ma: v.id,
        tenTep: `${v.id}.md`,
        tieuDe: `Vụ ${soVu} — ${ten}`,
        laPhu: false,
        soVu,
        soChuoi: 0,
        soManTra: 0
      };
    }),
  ];

  // Đọc danh sách việc phụ từ lich (S2)
  const dsViecPhu = (kb.lich.nhiemVuPhu ?? []).map((p) => ({
    ma: p.id,
    tenTep: `${p.id}.md`,
    tieuDe: p.ten,
    laPhu: true,
    soChuoi: 0,
    soManTra: 0
  }));

  const tatCa = [...dsVuChinh, ...dsViecPhu];

  const mucTieu = ma && ma !== '--tat-ca'
    ? tatCa.filter((x) => x.ma === ma || x.tenTep === `${ma}.md`)
    : tatCa;

  for (const muc of mucTieu) {
    const noiDung = boXuat.xuatVuHoacViec(muc.ma);
    muc.soChuoi = boXuat.thongKeCuoi.soChuoi;
    muc.soManTra = boXuat.thongKeCuoi.soManTra;
    const duongDanChinh = join(thuMucXuat, muc.tenTep);
    writeFileSync(duongDanChinh, noiDung, 'utf8');
    danhSachDaXuat.push(duongDanChinh);
  }

  for (const muc of tatCa) {
    if (muc.soChuoi === 0 && muc.soManTra === 0) {
      boXuat.xuatVuHoacViec(muc.ma);
      muc.soChuoi = boXuat.thongKeCuoi.soChuoi;
      muc.soManTra = boXuat.thongKeCuoi.soManTra;
    }
  }

  // Luôn cập nhật README mục lục mùa
  const noiDungReadme = boXuat.xuatMucLucMua(tatCa);
  const duongDanReadme = join(thuMucXuat, 'README.md');
  writeFileSync(duongDanReadme, noiDungReadme, 'utf8');
  danhSachDaXuat.push(duongDanReadme);

  boXuat.dongDb();
  return danhSachDaXuat;
}

if (process.argv[1] && fileURLToPath(import.meta.url) === process.argv[1]) {
  const arg = process.argv[2];
  const idxNd = process.argv.indexOf('--noi-dung');
  const thuMucNd = idxNd >= 0 ? process.argv[idxNd + 1] : THU_MUC_NOI_DUNG_MUA_1;

  console.log('Đang xuất truyện chữ sang docs/mua-1/truyen-chu/ ...');
  const ketQua = await chayXuatTruyen(arg, thuMucNd);
  console.log(`Đã xuất ${ketQua.length} tệp truyện chữ:`);
  for (const k of ketQua) console.log(`  - ${k}`);
}
