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
 *
 * 01/10/2026 (đề xuất gameplay câu 5): mỗi thẻ có MÀU ĐẦU GHIM do người chơi chọn (`s.bang.mau`, mặc định đỏ) — hình dạng
 * vẫn là dấu hiệu loại, màu là cách người chơi tự nhóm; sợi chỉ mang màu ghim của thẻ nguồn. Thẻ gỡ khỏi bảng (`s.bang.boGhim`)
 * không vẽ, không có sợi, nằm ở `boGhim` để ghim lại; thẻ "?" và phiếu sắp ghim (`them`) không gỡ được.
 */
import type { KichBanMvp, TheHoSoMvp } from '../../content/mvp/types';
import { giayNhoHoiDap } from './hoi-dap';
import { cauHoiDaNoi, loaiNote, nguonKhaiCua, thongTinNote, type KeywordNote, type LoaiNote, type NguonNote } from './note';
import type { MauGhimMvp, TrangThaiMvp, GhiChuTruyVanMvp, GhepMauLuuMvp, PhieuTruyVanMvp } from './trang-thai';

/** `cau` (gói B21): thẻ câu hỏi người chơi nối ra từ hai note (`[NỐI]`). */
export type LoaiTheBang = 'tin' | 'phieu' | 'note' | 'vat' | 'tai-lieu' | 'hoi' | 'cau';

export interface TheBang {
  id: string;
  loai: LoaiTheBang;
  /** Chữ lớn trên thẻ (vd "[Tòa B]", "Hai lớp: BC24A, BC23A"). */
  nhan: string;
  /** Tiêu đề đầy đủ có ngữ cảnh (vd "Hộp tòa B, mở 9h sáng thứ Hai"). */
  tieuDe?: string | null;
  /** Dòng nhỏ: nguồn mẩu tin / số dòng của phiếu. */
  phu: string | null;
  /** Gói B21: chữ ngắn riêng cho note trên bảng (`- Trên bảng:` của thẻ hồ sơ); có thì thẻ chỉ hiện chữ này. */
  trenBang?: string | null;
  /** Giá trị kéo được vào truy vấn. */
  giaTri: string[];
  /** Giá trị bị một mẩu tin khác gạch đi (loại trừ). */
  gach: string[];
  /** Tên tệp ảnh (không đuôi) trong src/assets. */
  anh: string | null;
  khongDuLieu: boolean;
  /** Thẻ hồ sơ gốc (để mở xem chi tiết); `null` với thẻ câu hỏi. */
  the: TheHoSoMvp | null;
  /** Màu đầu ghim người chơi chọn (mặc định đỏ). */
  mau: MauGhimMvp;
  /** Câu lệnh SQL chuẩn / đã chạy (với thẻ phiếu truy vấn). */
  sql?: string | null;
  /** Gói B21: nguồn của note (màu giấy), loại (manh mối = giấy nhớ góc gấp, sự thật = thẻ cứng ghim tròn) và keyword (tô màu chữ). */
  nguon?: NguonNote;
  loaiNote?: LoaiNote;
  keyword?: KeywordNote[];
  /** Gói B21: sự thật đã đặt lên bảng chân lý — để lại thẻ mờ có dấu tích. */
  daLenBang?: boolean;
  /** Gói B21 (`loai: 'cau'`): đích của câu hỏi nối. */
  cau?: { id: string; dich: 'tra' | 'hien-truong'; thuThach?: string; daTra?: boolean; nguon: [string, string] };
  /** Cột kết quả truy vấn (nếu có). */
  cot?: { ten: string; kieu: 'TEXT' | 'INTEGER' }[];
}

export interface DayBang {
  tu: string;
  den: string;
  /** `ghep` (gói B19): chỉ đỏ của `[GHÉP MẪU]`. */
  kieu: 'truy-van' | 'loai-tru' | 'nguon' | 'ghep' | 'noi';
  /** Nhãn trên sợi chỉ (số dòng của phiếu). */
  nhan: string | null;
  /** Màu sợi = màu ghim của thẻ nguồn `tu`. */
  mau: MauGhimMvp;
}

export interface BangDieuTra {
  /** Thẻ đang ghim trên bảng. */
  the: TheBang[];
  day: DayBang[];
  /** Thẻ trong hồ sơ nhưng người chơi đã gỡ khỏi bảng (ghim lại được). */
  boGhim: TheBang[];
  /** Gói B19: giấy nhớ của các lần ghép mẫu (hai thẻ đều đang trên bảng); `moi` = lần ghép đang diễn. */
  giayGhep?: { id: string; tu: string; den: string; chu: string; nguoi: string; moi: boolean }[];
}

export const MA_THE_HOI = 'hoi-dang-mo';

/** Tiền tố mã thẻ câu hỏi nối (gói B21): `cau:<mã câu hỏi>`. */
export const TIEN_TO_THE_CAU = 'cau:';

/** Tiền tố mã thẻ giấy nhớ hỏi ra từ nhân chứng (gói B12): `hoi-dap:<mã nhân chứng>`. */
export const TIEN_TO_THE_HOI_DAP = 'hoi-dap:';

/**
 * Giấy nhớ hỏi ra ở các buổi hỏi nhân chứng (gói B12, `giayNhoHoiDap`), gộp theo nhân chứng: mỗi người một tờ giấy nhớ trong
 * hồ sơ, các dòng là điều đã hỏi ra (dòng tự hỏi ra ngoài sổ có ghi chú). Bộ không có tờ dữ kiện (MVP) → rỗng.
 */
export function theHoiDap(kb: KichBanMvp, s: TrangThaiMvp): TheHoSoMvp[] {
  const theo = new Map<string, string[]>();
  for (const g of giayNhoHoiDap(kb, s)) {
    const nc = kb.hoiDap?.to[g.to]?.nhanChung;
    if (!nc) continue;
    const ds = theo.get(nc) ?? [];
    const dong = g.an ? `${g.chu} (tự hỏi ra)` : g.chu;
    if (!ds.includes(dong)) ds.push(dong);
    theo.set(nc, ds);
  }
  return [...theo].map(([nc, ds]): TheHoSoMvp => {
    const nv = kb.nhanVat.find((n) => n.id === nc);
    const ten = nv?.trongCau || nv?.ten || nc;
    return { id: TIEN_TO_THE_HOI_DAP + nc, loai: 'clue', heading: `Lời ${ten}`, fields: { 'Nguồn': `Hỏi chuyện ${ten}` }, quotes: { 'Nội dung hiển thị': ds } };
  });
}

/** Mã là một thẻ giấy nhớ hỏi ra đang có (đổi màu ghim, gỡ / ghim lại được như thẻ trong hồ sơ). */
export function laTheHoiDap(kb: KichBanMvp, s: TrangThaiMvp, id: string): boolean {
  return id.startsWith(TIEN_TO_THE_HOI_DAP) && theHoiDap(kb, s).some((t) => t.id === id);
}

const tach = (chu: string | undefined): string[] =>
  (chu ?? '')
    .split(/[·,]/)
    .map((x) => x.trim())
    .filter((x) => x !== '');

/**
 * Bảng của ván đang chơi. `them`: mã một phiếu kết quả SẮP vào hồ sơ (màn "ghim lên bảng" ngay sau khi tra đúng, trước khi
 * máy ghi nhận) kèm các thẻ đã dùng.
 */
export function dungBang(
  kb: KichBanMvp,
  s: TrangThaiMvp,
  them?: { id: string; dung: string[]; phieu?: PhieuTruyVanMvp; ghiChu?: GhiChuTruyVanMvp[] },
  /**
   * `hoiDap`: thêm giấy nhớ hỏi ra từ nhân chứng (khung Hồ sơ; màn tra và đối chất không dùng). `ghep` (gói B19): lần ghép mẫu đang
   * diễn (màn `[GHÉP MẪU]`) — hai thẻ luôn lên bảng, có chỉ đỏ và giấy nhớ.
   */
  tuyChon: { hoiDap?: boolean; ghep?: GhepMauLuuMvp } = {},
): BangDieuTra {
  const the: TheBang[] = [];
  const boGhim: TheBang[] = [];
  const day: DayBang[] = [];
  const giayGhep: NonNullable<BangDieuTra['giayGhep']> = [];
  const coRoi = new Set<string>();
  const daGo = new Set((s.bang?.boGhim ?? []).filter((id) => !tuyChon.ghep?.the.includes(id)));
  const mauCua = (id: string): MauGhimMvp => s.bang?.mau?.[id] ?? 'do';
  const phieuCua = (id: string) => (them?.id === id ? them.phieu : undefined) ?? s.bang?.phieuTruyVan?.[id];
  const thuThachCua = (id: string) => Object.values(kb.thuThach).find((t) => t.vatChung?.id === id);
  // Thẻ đã gỡ thì vào danh sách chờ ghim lại; phiếu sắp ghim (`them`) luôn lên bảng.
  // Gói B21: note có loại / nguồn / keyword; sự thật đã đặt lên bảng chân lý để lại thẻ mờ.
  const daLen = new Set(Object.values(s.dongThoiGian ?? {}).flatMap((d) => Object.values(d.o)));
  const dat = (t: TheBang): void => {
    if (t.loai !== 'hoi' && t.loai !== 'cau' && !t.nguon) {
      const tt = thongTinNote(kb, t.id);
      const tra = t.loai === 'phieu' || t.loai === 'note';
      t = { ...t, nguon: tra ? 'tra' : t.id.startsWith(TIEN_TO_THE_HOI_DAP) ? 'loi-ke' : tt.nguon, loaiNote: tra ? 'su-that' : loaiNote(kb, s, t.id), keyword: tt.keyword, ...(daLen.has(t.id) ? { daLenBang: true } : {}) };
    }
    if (daGo.has(t.id) && them?.id !== t.id) boGhim.push(t);
    else {
      coRoi.add(t.id);
      the.push(t);
    }
  };

  const themThe = (id: string): void => {
    if (coRoi.has(id) || boGhim.some((t) => t.id === id)) return;
    const hs = kb.hoSo[id];
    const tt = thuThachCua(id);
    const truyVan = phieuCua(id);
    if (truyVan) {
      dat({
        id,
        loai: 'phieu',
        nhan: truyVan.nhan,
        tieuDe: truyVan.nhan,
        phu: truyVan.tongHop ? 'TỔNG HỢP' : `${truyVan.soDong} dòng`,
        giaTri: [],
        gach: [],
        anh: null,
        khongDuLieu: false,
        the: hs ?? null,
        mau: mauCua(id),
        sql: truyVan.sql,
        cot: truyVan.cot,
      });
      return;
    }
    if (tt?.vatChung) {
      const n = tt.soDongKyVong;
      dat({
        id,
        loai: 'phieu',
        nhan: tt.vatChung.title,
        tieuDe: tt.vatChung.title,
        phu: n === null ? null : `${n} dòng`,
        giaTri: tt.vatChung.giaTri,
        gach: [],
        anh: hs?.fields['Ảnh'] ?? null,
        khongDuLieu: tt.vatChung.giaTri.length === 0,
        the: hs ?? { id, loai: 'ev', heading: tt.vatChung.title, fields: { 'Nội dung': tt.vatChung.description }, quotes: {} },
        mau: mauCua(id),
        sql: tt.sqlChuan,
      });
      return;
    }
    if (!hs) return;
    const giaTri = tach(hs.fields['Giá trị cho trình dựng']);
    const loai: LoaiTheBang = hs.loai === 'doc' ? 'tai-lieu' : hs.loai === 'ev' ? 'vat' : 'tin';
    const tieuDe = hs.fields['Tiêu đề'] ?? hs.heading;
    dat({
      id,
      loai,
      nhan: hs.heading,
      tieuDe,
      // Gói B21: `Trên bảng` / `Nguồn trên bảng` là chữ ngắn riêng cho note trên bảng; `Nguồn` là một trong năm nguồn của note thì không phải chữ hiện.
      trenBang: hs.fields['Trên bảng'] ?? null,
      phu: hs.fields['Nguồn trên bảng'] ?? (nguonKhaiCua(hs.fields) ? null : (hs.fields['Nguồn'] ?? null)),
      giaTri,
      gach: [],
      anh: hs.fields['Ảnh'] ?? null,
      khongDuLieu: loai === 'tin' && giaTri.length === 0,
      the: hs,
      mau: mauCua(id),
    });
  };

  for (const id of s.hoSo.taiLieu) themThe(id);
  for (const id of s.hoSo.manhMoi) themThe(id);
  // Giấy nhớ hỏi ra từ nhân chứng: nằm cạnh các giấy nhớ khác, không kéo vào truy vấn được.
  if (tuyChon.hoiDap) {
    for (const hs of theHoiDap(kb, s)) {
      dat({ id: hs.id, loai: 'tin', nhan: hs.heading, tieuDe: hs.heading, phu: hs.fields['Nguồn'] ?? null, giaTri: [], gach: [], anh: null, khongDuLieu: true, the: hs, mau: mauCua(hs.id) });
    }
  }
  for (const id of s.hoSo.bangChung) themThe(id);
  // Phiếu tổng hợp là thẻ gợi ý động, không nhập vào hồ sơ bằng chứng.
  for (const id of Object.keys(s.bang?.phieuTruyVan ?? {})) themThe(id);
  if (them) themThe(them.id);

  // Phiếu truy vấn đã ghim sinh note kéo được; note không nhập vào hồ sơ/bằng chứng.
  for (const note of [...(s.bang?.ghiChuTruyVan ?? []), ...(them?.ghiChu ?? [])]) {
    if (!coRoi.has(note.nguonId)) continue;
    const id = note.id;
    if (coRoi.has(id)) continue;
    dat({
      id,
      loai: 'note',
      nhan: note.nhan,
      tieuDe: note.nhan,
      phu: `Trích cột ${note.cot}`,
      giaTri: note.giaTri,
      gach: [],
      anh: null,
      khongDuLieu: false,
      the: null,
      mau: mauCua(id),
    });
  }

  // Sợi chỉ đỏ: thẻ đã kéo vào câu → phiếu kết quả.
  for (const t of the) {
    if (t.loai === 'phieu') {
      const truyVan = phieuCua(t.id);
      if (truyVan?.nguonId && coRoi.has(truyVan.nguonId)) day.push({ tu: truyVan.nguonId, den: t.id, kieu: 'nguon', nhan: null, mau: mauCua(truyVan.nguonId) });
    }
  }
  for (const t of the) {
    if (t.loai === 'note') {
      const note = [...(s.bang?.ghiChuTruyVan ?? []), ...(them?.ghiChu ?? [])].find((x) => x.id === t.id);
      if (note && coRoi.has(note.nguonId)) day.push({ tu: note.nguonId, den: t.id, kieu: 'nguon', nhan: null, mau: mauCua(note.nguonId) });
    }
  }
  // Sợi truy vấn chuẩn: thẻ đã kéo vào câu → phiếu kết quả.
  for (const t of the) {
    if (t.loai !== 'phieu') continue;
    const tt = thuThachCua(t.id);
    const ghi = them && them.id === t.id ? them.dung : s.bang?.day[t.id];
    const nguon = ghi && ghi.length > 0 ? ghi : (tt?.manhMoiLienQuan ?? []);
    for (const tu of nguon) if (coRoi.has(tu) && tu !== t.id) day.push({ tu, den: t.id, kieu: 'truy-van', nhan: t.phu, mau: mauCua(tu) });
  }
  // Sợi chỉ chấm: mẩu tin loại trừ một phần của phiếu (màu theo ghim của mẩu tin).
  for (const t of the) {
    const dich = t.the?.fields['Loại trừ'];
    if (!dich || !coRoi.has(dich)) continue;
    day.push({ tu: t.id, den: dich, kieu: 'loai-tru', nhan: null, mau: t.mau });
    const phieu = the.find((x) => x.id === dich);
    if (phieu) phieu.gach = [...phieu.gach, ...tach(t.the?.fields['Gạch'])];
  }

  // Gói B19: chỉ đỏ + giấy nhớ của các lần ghép mẫu (đã lưu, và lần đang diễn).
  const cacGhep = [...(s.bang?.ghepMau ?? []).filter((g) => g.id !== tuyChon.ghep?.id), ...(tuyChon.ghep ? [tuyChon.ghep] : [])];
  for (const g of cacGhep) {
    const [tu, den] = g.the;
    if (!tu || !den || !coRoi.has(tu) || !coRoi.has(den)) continue;
    day.push({ tu, den, kieu: 'ghep', nhan: null, mau: 'do' });
    giayGhep.push({ id: g.id, tu, den, chu: g.chu, nguoi: g.nguoi, moi: g === tuyChon.ghep });
  }

  // Gói B21: thẻ câu hỏi người chơi đã nối ra (`[NỐI]`): hình riêng, hai sợi chỉ từ hai note nguồn tới thẻ; nhãn ghi đích (tra / ra hiện trường).
  for (const c of cauHoiDaNoi(kb, s)) {
    const id = TIEN_TO_THE_CAU + c.id;
    const tra = c.dich.kind === 'tra' ? c.dich.thuThach : undefined;
    const daTra = !!tra && s.thuThachXong.includes(tra);
    the.push({ id, loai: 'cau', nhan: c.cau, tieuDe: c.cau, phu: c.dich.kind === 'tra' ? (daTra ? 'Đã tra xong' : '→ Tra dữ liệu') : '→ Ra hiện trường', giaTri: [], gach: [], anh: null, khongDuLieu: true, the: null, mau: mauCua(id), cau: { id: c.id, dich: c.dich.kind, ...(tra ? { thuThach: tra, daTra } : {}), nguon: [c.the[0], c.the[1]] } });
    for (const nguon of c.the) if (coRoi.has(nguon)) day.push({ tu: nguon, den: id, kieu: 'noi', nhan: null, mau: mauCua(nguon) });
  }

  if (s.nhiemVu && s.giaiDoan !== 'het') {
    the.push({ id: MA_THE_HOI, loai: 'hoi', nhan: s.nhiemVu, tieuDe: s.nhiemVu, phu: null, giaTri: [], gach: [], anh: null, khongDuLieu: true, the: null, mau: 'do' });
  }
  return { the, day, boGhim, giayGhep };
}

// ---------- Chỗ ghim ----------

export const KHUNG_BANG = { rong: 1600, cao: 900 } as const;

/** Cỡ thẻ (khung bảng 1600×900) — để tính tâm cho sợi chỉ và xếp chỗ mặc định. */
export const CO_THE: Record<LoaiTheBang, { rong: number; cao: number }> = {
  tin: { rong: 176, cao: 150 },
  phieu: { rong: 236, cao: 170 },
  note: { rong: 176, cao: 100 },
  vat: { rong: 150, cao: 176 },
  'tai-lieu': { rong: 104, cao: 132 },
  hoi: { rong: 178, cao: 178 },
  cau: { rong: 196, cao: 124 },
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
  'ev-hai-lop': { x: 460, y: 460 },
  'clue-can-ma-va-can-cu': { x: 440, y: 46 },
  'clue-phieu-tra-cuu': { x: 711, y: 58 },
  'ev-hai-ma': { x: 960, y: 236 },
  'clue-hoai-nguoi-nop': { x: 1200, y: 96 },
  'clue-ten-tep': { x: 960, y: 590 },
  'ev-nhat-ky-in': { x: 1200, y: 480 },
  'clue-loi-chu-cuong': { x: 1400, y: 310 },
  'ev-hai-dong-sua': { x: 1340, y: 680 },
  [MA_THE_HOI]: { x: 711, y: 361 },
};

/** Góc nghiêng cố định theo mã (bảng trông như ghim tay mà không nhảy mỗi lần vẽ lại). */
export function gocNghieng(id: string): number {
  let h = 0;
  for (const c of id) h = (h * 31 + c.charCodeAt(0)) % 997;
  return ((h % 9) - 4) * 0.7;
}

/** Vị trí từng thẻ: chỗ người chơi đã kéo tới → chỗ dựng sẵn → tự xếp. Tài liệu xếp thành cột ở mép trái.
 * Khi một thẻ được kéo, các thẻ khác giữ nguyên slot mặc định, không tự động dồn lên hay sắp xếp lại. */
export function viTriThe(bang: BangDieuTra, daKeo: Record<string, { x: number; y: number }> = {}): Record<string, { x: number; y: number }> {
  const ra: Record<string, { x: number; y: number }> = {};
  let soTaiLieu = 0;
  let tuXep = 0;
  for (const t of bang.the) {
    const keo = daKeo[t.id];
    // Gói B21: thẻ câu hỏi nối đặt sau, ở giữa hai note nguồn (xem dưới).
    if (t.loai === 'cau') continue;
    if (t.loai === 'tai-lieu') {
      ra[t.id] = keo ?? { x: 26 + (soTaiLieu % 2) * 14, y: 34 + soTaiLieu * 140 };
      soTaiLieu++;
      continue;
    }
    const san = CHO_SAN[t.id];
    if (san) {
      ra[t.id] = keo ?? san;
      continue;
    }
    // Tự xếp: lưới 6 cột bắt đầu từ góc trên, tránh cột tài liệu.
    ra[t.id] = keo ?? { x: 190 + (tuXep % 6) * 232, y: 60 + Math.floor(tuXep / 6) * 210 };
    tuXep++;
  }
  // Gói B21: thẻ câu hỏi nối nằm giữa hai note nguồn, lệch xuống dưới (nhiều thẻ thì lệch dần để không đè nhau).
  let soCau = 0;
  for (const t of bang.the) {
    if (t.loai !== 'cau') continue;
    const [a, b] = t.cau?.nguon ?? ['', ''];
    const pa = a ? ra[a] : undefined;
    const pb = b ? ra[b] : undefined;
    const co = CO_THE.cau;
    const giua = pa && pb ? { x: (pa.x + pb.x) / 2 - co.rong / 2 + 60, y: Math.max(pa.y, pb.y) + 150 + soCau * 24 } : { x: 190 + soCau * 40, y: 600 };
    ra[t.id] = daKeo[t.id] ?? { x: Math.max(8, Math.min(KHUNG_BANG.rong - co.rong - 8, Math.round(giua.x))), y: Math.max(8, Math.min(KHUNG_BANG.cao - co.cao - 8, Math.round(giua.y))) };
    soCau++;
  }
  return ra;
}
