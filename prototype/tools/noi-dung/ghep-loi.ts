/**
 * TÁCH KHUNG / LỜI (user chốt 30/09/2026, docs/thiet-ke/ban-giao-huong-moi-2026-09-30.md mục ĐÃ CHỐT A).
 *
 * - Khung (phiên logic sở hữu): `kich-ban/*.md`, `thu-thach/*.md`. Chỗ cần lời đặt MỘT dòng `- [LỜI <mã>]` ở đầu dòng.
 * - Lời (phiên truyện sở hữu): `loi/*.md`, mỗi đoạn mở bằng `## <mã>` rồi tới các dòng lời.
 *
 * Trước khi đọc, bộ gom thay mỗi dòng `- [LỜI mã]` bằng các dòng của đoạn cùng mã; lỗi của bộ đọc được trả về đúng tệp và
 * dòng gốc (khung hoặc lời) nhờ bản đồ dòng. Lời chỉ được chứa dòng CHỮ (thoại, thẻ chữ, dàn dựng, nhiệm vụ, "Khi …"),
 * không được chứa dòng cấu trúc (`[ĐI TỚI]`, `[HỎI]`, `[THỬ THÁCH]`…) — cấu trúc là việc của khung.
 * Dòng có `(tạm)` là lời tạm của phiên logic: không lỗi, chỉ đếm để nhắc.
 */
import type { LoiNoiDung } from './doc.ts';

export interface DoanLoi {
  ma: string;
  tep: string;
  /** Dòng tiêu đề `## mã` (1-based). */
  dongTieuDe: number;
  /** Các dòng lời kèm số dòng gốc (1-based). */
  dong: { chu: string; so: number }[];
  daDung: boolean;
}

export interface NguonDong {
  tep: string;
  dong: number;
}

const MA = /^[a-z0-9][a-z0-9.\-_]*$/;
const DONG_DANH_DAU = /^- \[LỜI ([^\]]+)\]\s*$/;
/** Dòng lời hợp lệ: thoại, người chơi, thẻ chữ, dàn dựng, nhiệm vụ, phản ứng "Khi …". */
const DONG_LOI = [/^- \*\*[a-z0-9-]+\*\*/, /^- \[THẺ CHỮ\] /, /^- \[DÀN DỰNG\] /, /^> NHIỆM VỤ: /, /^> NHẮC VIỆC /, /^- Khi [^:]+: /];

export function docTepLoi(tep: string, noiDung: string): { doan: DoanLoi[]; loi: LoiNoiDung[] } {
  const doan: DoanLoi[] = [];
  const loi: LoiNoiDung[] = [];
  let hienTai: DoanLoi | null = null;
  noiDung.split(/\r?\n/).forEach((dong, i) => {
    const so = i + 1;
    const t = dong.trimEnd();
    if (t === '' || /^<!--.*-->$/.test(t.trim())) return;
    const td = /^## (.+)$/.exec(t);
    if (td) {
      const ma = (td[1] ?? '').trim();
      if (!MA.test(ma)) loi.push({ tep, dong: so, thongBao: `mã đoạn lời "${ma}" không hợp lệ (chữ thường, số, "-", ".", "_")` });
      hienTai = { ma, tep, dongTieuDe: so, dong: [], daDung: false };
      doan.push(hienTai);
      return;
    }
    if (/^# /.test(t) && !hienTai) return; // tiêu đề tệp
    if (!hienTai) {
      loi.push({ tep, dong: so, thongBao: 'dòng nằm ngoài đoạn lời nào (thiếu "## <mã>" phía trên)' });
      return;
    }
    const d: DoanLoi = hienTai;
    if (!DONG_LOI.some((r) => r.test(t))) {
      loi.push({ tep, dong: so, thongBao: 'tệp lời chỉ chứa dòng chữ (thoại "- **ai** (cảm xúc): …", "- [THẺ CHỮ]", "- [DÀN DỰNG]", "> NHIỆM VỤ:", "> NHẮC VIỆC <ai>:", "- Khi …: …"); dòng cấu trúc thuộc về khung' });
      return;
    }
    d.dong.push({ chu: t, so });
  });
  return { doan, loi };
}

export interface KetQuaGhep {
  /** Nội dung khung sau khi ghép, theo đường dẫn tệp khung. */
  noiDung: Map<string, string>;
  /** Bản đồ: tệp khung → nguồn của từng dòng sau ghép (index 0 = dòng 1). */
  banDo: Map<string, NguonDong[]>;
  loi: LoiNoiDung[];
  /** Số dòng lời còn đánh dấu "(tạm)". */
  soTam: number;
}

/** Ghép lời vào khung. `khung`: các tệp kich-ban/thu-thach (đường dẫn hiển thị + nội dung). */
export function ghepLoi(khung: readonly { duongDan: string; noiDung: string }[], doan: readonly DoanLoi[]): KetQuaGhep {
  const loi: LoiNoiDung[] = [];
  const theoMa = new Map<string, DoanLoi>();
  for (const d of doan) {
    const cu = theoMa.get(d.ma);
    if (cu) loi.push({ tep: d.tep, dong: d.dongTieuDe, thongBao: `mã đoạn lời "${d.ma}" trùng với ${cu.tep}:${cu.dongTieuDe}` });
    else theoMa.set(d.ma, d);
  }
  const noiDung = new Map<string, string>();
  const banDo = new Map<string, NguonDong[]>();
  let soTam = 0;
  for (const k of khung) {
    const ra: string[] = [];
    const nguon: NguonDong[] = [];
    k.noiDung.split(/\r?\n/).forEach((dong, i) => {
      const m = DONG_DANH_DAU.exec(dong);
      if (!m) {
        ra.push(dong);
        nguon.push({ tep: k.duongDan, dong: i + 1 });
        return;
      }
      const ma = (m[1] ?? '').trim();
      const d = theoMa.get(ma);
      if (!d) {
        loi.push({ tep: k.duongDan, dong: i + 1, thongBao: `khung cần lời "${ma}" nhưng thư mục loi/ không có đoạn "## ${ma}"` });
        return;
      }
      if (d.daDung) loi.push({ tep: k.duongDan, dong: i + 1, thongBao: `đoạn lời "${ma}" đã được dùng ở chỗ khác; mỗi đoạn chỉ gắn vào một chỗ` });
      d.daDung = true;
      for (const l of d.dong) {
        ra.push(l.chu);
        nguon.push({ tep: d.tep, dong: l.so });
        if (l.chu.includes('(tạm)')) soTam++;
      }
    });
    noiDung.set(k.duongDan, ra.join('\n'));
    banDo.set(k.duongDan, nguon);
  }
  for (const d of theoMa.values()) {
    if (!d.daDung) loi.push({ tep: d.tep, dong: d.dongTieuDe, thongBao: `đoạn lời "${d.ma}" không được khung nào dùng (khung thiếu dòng "- [LỜI ${d.ma}]")` });
  }
  return { noiDung, banDo, loi, soTam };
}

/** Đổi vị trí lỗi của tệp khung đã ghép về tệp/dòng gốc. */
export function traViTri(l: LoiNoiDung, banDo: Map<string, NguonDong[]>): LoiNoiDung {
  const bd = banDo.get(l.tep);
  const n = bd?.[l.dong - 1];
  return n ? { ...l, tep: n.tep, dong: n.dong } : l;
}
