/**
 * BẢNG ĐIỀU TRA (ĐÃ CHỐT B.1–B.2, 30/09/2026) — phần thuần, không React. Từ kịch bản + trạng thái dựng ra các thẻ đang
 * ghim và các sợi chỉ nối chúng.
 *
 * Loại thẻ phân biệt bằng HÌNH DẠNG (giao diện vẽ):
 *   - `tin`: giấy nhớ vàng — mẩu tin hiện trường (`clue-…`); `khongDuLieu` = mẩu tin không kéo vào truy vấn được.
 *   - `phieu`: phiếu trắng có con dấu — kết quả một lần tra (vật chứng của thẻ thử thách).
 *   - `vat`: ảnh chụp vật chứng nhặt ở hiện trường (`ev-…` trong ho-so/).
 *   - `tai-lieu`: giấy tờ (`doc-…`), xếp thành cột bên mép bảng.
 *   - `hoi`: thẻ tròn "?" — câu hỏi đang mở (nhiệm vụ hiện tại).
 *
 * Sợi chỉ: `truy-van` (đỏ) từ các thẻ đã kéo vào câu sang phiếu kết quả — lấy từ `s.bang.day` (ghi lúc tra xong), không có
 * thì theo "Manh mối liên quan" của thẻ thử thách; `loai-tru` (cam, chấm) từ mẩu tin có dòng "Loại trừ: <mã phiếu>".
 * Dòng "Gạch: <giá trị>" của mẩu tin gạch giá trị đó trên phiếu bị loại trừ. Dòng "Ảnh: <tên tệp>" là ảnh của thẻ.
 */
import type { KichBanMvp, TheHoSoMvp } from '../../content/mvp/types';
import type { TrangThaiMvp } from './trang-thai';

export type LoaiTheBang = 'tin' | 'phieu' | 'vat' | 'tai-lieu' | 'hoi';

export interface TheBang {
  id: string;
  loai: LoaiTheBang;
  /** Chữ lớn trên thẻ (vd "[Tòa B]", "Hai lớp: BC24A, BC23A"). */
  nhan: string;
  /** Dòng nhỏ: nguồn mẩu tin / số dòng của phiếu. */
  phu: string | null;
  /** Giá trị kéo được vào truy vấn. */
  giaTri: string[];
  /** Giá trị bị một mẩu tin khác gạch đi (loại trừ). */
  gach: string[];
  /** Tên tệp ảnh (không đuôi) trong src/assets. */
  anh: string | null;
  khongDuLieu: boolean;
  /** Thẻ hồ sơ gốc (để mở xem chi tiết); `null` với thẻ câu hỏi. */
  the: TheHoSoMvp | null;
}

export interface DayBang {
  tu: string;
  den: string;
  kieu: 'truy-van' | 'loai-tru';
  /** Nhãn trên sợi chỉ (số dòng của phiếu). */
  nhan: string | null;
}

export interface BangDieuTra {
  the: TheBang[];
  day: DayBang[];
}

export const MA_THE_HOI = 'hoi-dang-mo';

const tach = (chu: string | undefined): string[] =>
  (chu ?? '')
    .split(/[·,]/)
    .map((x) => x.trim())
    .filter((x) => x !== '');

/**
 * Bảng của ván đang chơi. `them`: mã một phiếu kết quả SẮP vào hồ sơ (màn "ghim lên bảng" ngay sau khi tra đúng, trước khi
 * máy ghi nhận) kèm các thẻ đã dùng.
 */
export function dungBang(kb: KichBanMvp, s: TrangThaiMvp, them?: { id: string; dung: string[] }): BangDieuTra {
  const the: TheBang[] = [];
  const day: DayBang[] = [];
  const coRoi = new Set<string>();
  const thuThachCua = (id: string) => Object.values(kb.thuThach).find((t) => t.vatChung?.id === id);

  const themThe = (id: string): void => {
    if (coRoi.has(id)) return;
    const hs = kb.hoSo[id];
    const tt = thuThachCua(id);
    if (tt?.vatChung) {
      coRoi.add(id);
      const n = tt.soDongKyVong;
      the.push({
        id,
        loai: 'phieu',
        nhan: tt.vatChung.title,
        phu: n === null ? null : `${n} dòng`,
        giaTri: tt.vatChung.giaTri,
        gach: [],
        anh: hs?.fields['Ảnh'] ?? null,
        khongDuLieu: tt.vatChung.giaTri.length === 0,
        the: hs ?? { id, loai: 'ev', heading: tt.vatChung.title, fields: { 'Nội dung': tt.vatChung.description }, quotes: {} },
      });
      return;
    }
    if (!hs) return;
    coRoi.add(id);
    const giaTri = tach(hs.fields['Giá trị cho trình dựng']);
    const loai: LoaiTheBang = hs.loai === 'doc' ? 'tai-lieu' : hs.loai === 'ev' ? 'vat' : 'tin';
    the.push({
      id,
      loai,
      nhan: hs.heading,
      phu: hs.fields['Nguồn'] ?? null,
      giaTri,
      gach: [],
      anh: hs.fields['Ảnh'] ?? null,
      khongDuLieu: loai === 'tin' && giaTri.length === 0,
      the: hs,
    });
  };

  for (const id of s.hoSo.taiLieu) themThe(id);
  for (const id of s.hoSo.manhMoi) themThe(id);
  for (const id of s.hoSo.bangChung) themThe(id);
  if (them) themThe(them.id);

  // Sợi chỉ đỏ: thẻ đã kéo vào câu → phiếu kết quả.
  for (const t of the) {
    if (t.loai !== 'phieu') continue;
    const tt = thuThachCua(t.id);
    const ghi = them && them.id === t.id ? them.dung : s.bang?.day[t.id];
    const nguon = ghi && ghi.length > 0 ? ghi : (tt?.manhMoiLienQuan ?? []);
    for (const tu of nguon) if (coRoi.has(tu) && tu !== t.id) day.push({ tu, den: t.id, kieu: 'truy-van', nhan: t.phu });
  }
  // Sợi chỉ cam: mẩu tin loại trừ một phần của phiếu.
  for (const t of the) {
    const dich = t.the?.fields['Loại trừ'];
    if (!dich || !coRoi.has(dich)) continue;
    day.push({ tu: t.id, den: dich, kieu: 'loai-tru', nhan: null });
    const phieu = the.find((x) => x.id === dich);
    if (phieu) phieu.gach = [...phieu.gach, ...tach(t.the?.fields['Gạch'])];
  }

  if (s.nhiemVu && s.giaiDoan !== 'het') {
    the.push({ id: MA_THE_HOI, loai: 'hoi', nhan: s.nhiemVu, phu: null, giaTri: [], gach: [], anh: null, khongDuLieu: true, the: null });
  }
  return { the, day };
}

// ---------- Chỗ ghim ----------

export const KHUNG_BANG = { rong: 1600, cao: 900 } as const;

/** Cỡ thẻ (khung bảng 1600×900) — để tính tâm cho sợi chỉ và xếp chỗ mặc định. */
export const CO_THE: Record<LoaiTheBang, { rong: number; cao: number }> = {
  tin: { rong: 176, cao: 150 },
  phieu: { rong: 236, cao: 170 },
  vat: { rong: 150, cao: 176 },
  'tai-lieu': { rong: 104, cao: 132 },
  hoi: { rong: 178, cao: 178 },
};

/**
 * Chỗ ghim dựng sẵn của chương 1 — thẻ mọc từ trái sang phải theo dòng suy nghĩ của vụ lá thư (mẩu tin → phiếu hai lớp →
 * phiếu hai mã → sổ niêm phong / nhật ký in). Thẻ không có ở đây thì máy tự xếp vào chỗ trống.
 */
const CHO_SAN: Record<string, { x: number; y: number }> = {
  'clue-chu-ky-h': { x: 196, y: 64 },
  'clue-toa-b': { x: 190, y: 300 },
  'clue-bao-chi-k24': { x: 204, y: 530 },
  'ev-the-lich': { x: 410, y: 640 },
  'clue-quyen-du-lieu': { x: 424, y: 232 },
  'ev-hai-lop': { x: 636, y: 430 },
  'clue-can-ma-va-can-cu': { x: 440, y: 46 },
  'clue-phieu-tra-cuu': { x: 664, y: 58 },
  'ev-hai-ma': { x: 910, y: 236 },
  'clue-hoai-nguoi-nop': { x: 1176, y: 96 },
  'clue-ten-tep': { x: 916, y: 590 },
  'ev-nhat-ky-in': { x: 1150, y: 500 },
  'clue-loi-chu-cuong': { x: 1400, y: 330 },
  'ev-hai-dong-sua': { x: 1340, y: 716 },
  [MA_THE_HOI]: { x: 1396, y: 40 },
};

/** Góc nghiêng cố định theo mã (bảng trông như ghim tay mà không nhảy mỗi lần vẽ lại). */
export function gocNghieng(id: string): number {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 997;
  return ((h % 9) - 4) * 0.7;
}

/** Vị trí từng thẻ: chỗ người chơi đã kéo tới → chỗ dựng sẵn → tự xếp. Tài liệu xếp thành cột ở mép trái. */
export function viTriThe(bang: BangDieuTra, daKeo: Record<string, { x: number; y: number }> = {}): Record<string, { x: number; y: number }> {
  const ra: Record<string, { x: number; y: number }> = {};
  let soTaiLieu = 0;
  let tuXep = 0;
  for (const t of bang.the) {
    const keo = daKeo[t.id];
    if (keo) {
      ra[t.id] = keo;
      continue;
    }
    if (t.loai === 'tai-lieu') {
      ra[t.id] = { x: 26 + (soTaiLieu % 2) * 14, y: 34 + soTaiLieu * 140 };
      soTaiLieu++;
      continue;
    }
    const san = CHO_SAN[t.id];
    if (san) {
      ra[t.id] = san;
      continue;
    }
    // Tự xếp: lưới 6 cột bắt đầu từ góc trên, tránh cột tài liệu.
    ra[t.id] = { x: 190 + (tuXep % 6) * 232, y: 60 + Math.floor(tuXep / 6) * 210 };
    tuXep++;
  }
  return ra;
}
