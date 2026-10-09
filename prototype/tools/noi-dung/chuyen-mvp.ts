/**
 * BỘ CHUYỂN bộ MVP: `RawMvp` (đã đọc, đã kiểm chéo, KHÔNG lỗi) → dữ liệu có hình dạng `KichBanMvp`
 * (src/content/mvp/types.ts). Bỏ vị trí `<tệp>:<dòng>`, đổi mốc chữ sang `Moc`, gom `soDongKhai`, chép bộ dữ liệu `duLieu`.
 * Không import gì từ `src/` (kiểu được ép bằng `satisfies` ở tệp sinh).
 */
import type { Moc } from './dieu-kien.ts';
import type { MucMvp, RawChuoiMvp, RawDongThoiGian, RawMvp, RawTinhVach } from './doc-mvp.ts';
import type { RawChallengeCard, RawLine } from './doc.ts';
import type { KetQuaLuat } from './luat-mvp.ts';
import { docGoiY, docKhiTrinhSai, docPhanUng } from './phan-ung-mvp.ts';

type Obj = Record<string, unknown>;

export interface DuLieuMvp {
  tenGame: string;
  tenTruong: string;
  tenCam: string[];
  nhanVat: Obj[];
  canh: Obj[];
  diaDiem: Obj[];
  lich: Obj;
  chuoi: Obj[];
  thuThach: Record<string, Obj>;
  hoSo: Record<string, Obj>;
  soTay: Record<string, Obj>;
  loiChung: Obj;
  soDongKhai: { sql: string; soDong: number; noi: string; resultId?: string; sourceResultId?: string; sourceGroupColumn?: string }[];
  duLieu: { bang: { ten: string; cot: { ten: string; kieu: string }[]; dong: (string | number | null)[][] }[]; bangAo: { ten: string; sql: string }[] } | null;
  /** Gói B19: dòng thời gian; chỉ có khi bộ có dong-thoi-gian.md (bộ khác sinh ra y như trước). */
  dongThoiGian?: Record<string, Obj>;
}

const loi = (l: RawLine): Obj => (l.expression === null ? { speaker: l.speaker, text: l.text } : { speaker: l.speaker, expression: l.expression, text: l.text });
const luaChon = (c: { id: string; text: string; correct: boolean; feedback: RawLine[] }): Obj => ({ id: c.id, text: c.text, correct: c.correct, feedback: c.feedback.map(loi) });
/** Gói B19: `· tính vạch` → `{ tinhVach: { cau?, saiLanDau? } }`; không có → không ghi gì (bộ cũ sinh ra như trước). */
const tinhVach = (tv: RawTinhVach | null): Obj =>
  tv ? { tinhVach: { ...(tv.cau ? { cau: tv.cau } : {}), ...(tv.saiLanDau ? { saiLanDau: tv.saiLanDau.map(loi) } : {}) } } : {};

/** Gói B19: dòng thời gian → hình dạng `DongThoiGianMvp`. */
function dongThoiGian(d: RawDongThoiGian): Obj {
  return {
    id: d.id,
    ten: d.ten,
    kieu: d.kieu,
    nguoiNhac: d.nguoiNhac,
    keoSai: d.keoSai ? d.keoSai.map(loi) : null,
    theTam: d.theTam.map((t) => ({ id: t.id, chu: t.chu })),
    o: d.o.map((o) => ({
      id: o.id,
      gio: o.gio,
      noi: o.noi,
      viec: o.viec,
      nhan: o.nhan,
      khoaSan: o.khoaSan,
      khongDien: o.khongDien,
      keoSai: o.keoSai ? o.keoSai.map(loi) : null,
      keoVaoTrong: o.keoVaoTrong ? o.keoVaoTrong.map(loi) : null,
    })),
  };
}

function nut(it: MucMvp, noi: string, soDongKhai: DuLieuMvp['soDongKhai']): Obj {
  switch (it.kind) {
    case 'line': {
      const n: Obj = { type: 'line', speaker: it.line.speaker };
      if (it.line.expression !== null) n.expression = it.line.expression;
      if (it.card) n.display = 'card';
      n.text = it.line.text;
      return n;
    }
    case 'task':
    case 'note':
      return { type: it.kind, text: it.text };
    case 'reminder': {
      const n: Obj = { type: 'reminder', speaker: it.speaker };
      if (it.expression !== null) n.expression = it.expression;
      n.text = it.text;
      return n;
    }
    case 'goto':
      return { type: 'goto', to: it.to };
    case 'show-document':
      return { type: 'show-document', documentId: it.id };
    case 'image': {
      const img: Obj = { type: 'image', imageId: it.id };
      if (it.chuThich) img.chuThich = it.chuThich;
      if (it.moTa) img.moTa = it.moTa;
      return img;
    }
    case 'question':
      return { type: 'question', id: it.id, asker: it.asker, choices: it.choices.map(luaChon), truUyTin: it.truUyTin, ...tinhVach(it.tinhVach) };
    case 'doi-chat':
      return {
        type: 'doi-chat',
        id: it.id,
        asker: it.asker,
        cauHoi: it.cauHoi ?? '',
        bangChung: it.bangChung.map((b) => ({ id: b.id, muc: b.muc, feedback: b.feedback.map(loi) })),
        chuaDu: (it.chuaDu ?? []).map(loi),
        khac: (it.khac ?? []).map(loi),
        hetLuot: (it.hetLuot ?? []).map(loi),
        truUyTin: it.truUyTin,
        ...(it.nguoiQuen ? { nguoiQuen: it.nguoiQuen } : {}),
        ...tinhVach(it.tinhVach),
      };
    case 'challenge':
      return { type: it.kind, challengeId: it.id };
    case 'fix-query':
      return { type: it.kind, challengeId: it.id, ...tinhVach(it.tinhVach) };
    case 'dong-thoi-gian':
      return { type: it.chiXem ? 'hien-dong-thoi-gian' : 'dong-thoi-gian', id: it.id };
    case 'cham-vu':
      return { type: 'cham-vu', vu: it.vu, can: it.can };
    case 'so-tong-ket':
      return { type: 'so-tong-ket', vu: it.vu };
    case 'diem-luu-vu':
      return { type: 'diem-luu-vu', vu: it.vu };
    case 'ghep-mau':
      return {
        type: 'ghep-mau',
        nguoi: it.nguoi,
        the: it.the,
        giayNho: it.giayNho,
        ...(it.dong ? { lamMau: it.loi.map((l) => ({ speaker: l.speaker, ...(l.expression !== null ? { expression: l.expression } : {}), text: l.text })) } : {}),
      };
    case 'effect':
      return { type: 'effect', effectId: it.id };
    case 'line-pick':
      return { type: 'line-pick', id: it.id, lines: it.rows.map((r) => ({ index: r.index, sql: r.sql, correct: r.correct, feedback: r.feedback.map(loi) })), truUyTin: it.truUyTin };
    case 'projector': {
      if (it.source.kind === 'preload') throw new Error(`${noi}: [MÀN CHIẾU ${it.id}] chưa gắn câu SQL nạp sẵn (chưa qua kiểm chéo?)`);
      if (it.source.kind === 'sql' && it.rows !== null) soDongKhai.push({ sql: it.source.sql, soDong: it.rows, noi: `${noi} [MÀN CHIẾU ${it.id}]` });
      return { type: 'projector', id: it.id, source: it.source, run: it.run, ...(it.rows !== null ? { expectedRowCount: it.rows } : {}) };
    }
    case 'end':
      return { type: 'end' };
    case 'stage':
      return { type: 'stage', action: it.action, nhanVat: it.nhanVat };
    case 'biet':
      return { type: 'biet', nhanVat: it.nhanVat, truong: it.truong };
    case 'wait':
      return { type: 'wait', giay: it.giay };
    case 'set-date':
      return { type: 'set-date', date: it.date };
    case 'condition':
      return { type: 'condition', dieuKien: it.dieuKien };
    case 'jump-if':
      return { type: 'jump-if', dieuKien: it.dieuKien, to: it.chuoi };
    case 'consequence':
      return { type: 'consequence', hauQua: it.hauQua };
    case 'branch':
      return { type: 'branch', id: it.branch.id, asker: it.branch.asker, choices: it.branch.choices };
    case 'go-with':
      return {
        type: 'branch',
        id: `go-with-${it.to}`,
        asker: { speaker: 'player', text: it.label },
        choices: [
          {
            id: `go-${it.to}`,
            text: it.label,
            khi: null,
            hauQua: [{ kind: 'di-toi', chuoi: it.to }]
          }
        ]
      };
    case 'het-ngay':
      // Gói B15: dựng như `[ĐI CÙNG]` (rẽ nhánh một lựa chọn) với mã `het-ngay-…`; máy nhận ra qua mã (may.ts `laHetNgay`).
      return {
        type: 'branch',
        id: `het-ngay-${it.to ?? 'ngay-ke'}`,
        asker: { speaker: 'player', text: it.label },
        choices: [
          {
            id: 'het-ngay',
            text: it.label,
            khi: null,
            hauQua: it.to ? [{ kind: 'di-toi', chuoi: it.to }] : []
          }
        ]
      };
    case 'notebook-lookup':
      return { type: 'notebook-lookup', trang: it.trang, phan: it.phan };
    case 'notebook-note':
      return { type: 'notebook-note', trang: it.trang };
    case 'create-character':
      return { type: 'create-character', truong: it.tao.truong, asker: loi(it.tao.asker), xucXac: it.tao.xucXac, luaChon: it.tao.luaChon };
    case 'trial-filter':
      soDongKhai.push({ sql: it.sql, soDong: it.soDong, noi: `${noi} [LỌC THỬ ${it.id}]` });
      return { type: 'trial-filter', id: it.id, sql: it.sql, soDong: it.soDong, chon: it.chon };
    case 'save-evidence':
      return { type: 'save-evidence', evidenceId: it.id };
    case 'ending-branch':
      return { type: 'ending-branch' };
    case 'xong-viec-chinh':
      return { type: 'xong-viec-chinh' };
    case 'hoi-dap':
      return { type: 'hoi-dap', ma: it.ma };
    case 'explore':
      return {
        type: 'explore',
        id: it.id,
        ...(it.kieu !== 'canh' ? { kieu: it.kieu } : {}),
        ...(it.nhanVat ? { nhanVat: it.nhanVat } : {}),
        ...(it.gio ? { gio: it.gio } : {}),
        ...(it.dang ? { dang: it.dang } : {}),
        ...(it.haVySoi ? { haVySoi: true } : {}),
        ...(it.tuDong ? { tuDong: true } : {}),
        diem: it.diem.map((d) => ({ sprite: d.sprite, x: d.x, y: d.y, rong: d.rong, chuoi: d.chuoi, sau: d.sau, nhan: d.nhan, ...(d.dau ? { dau: d.dau } : {}), ...(d.co.length > 0 ? { co: d.co } : {}) })),
      };
  }
}

function chuoi(c: RawChuoiMvp, mocSomNhat: number, soDongKhai: DuLieuMvp['soDongKhai']): Obj {
  return {
    id: c.id,
    title: c.title,
    canh: c.canh,
    ...(c.canhCat ? { canhCat: true } : {}),
    mocSomNhat,
    nodes: c.items.map((it, k) => nut(it, `${c.viTri.tep}:${c.itemDong[k] ?? c.viTri.dong}`, soDongKhai)),
  };
}

/** "Báo chí · K24" → ["Báo chí", "K24"] (dòng "Giá trị cho trình dựng", QĐ-092). */
function chiaGiaTri(v: string | undefined): string[] {
  return (v ?? '')
    .split('·')
    .map((x) => x.trim())
    .filter((x) => x !== '');
}

function theThuThach(t: RawChallengeCard, soDongKhai: DuLieuMvp['soDongKhai']): Obj {
  const noi = `${t.viTri.tep}:${t.viTri.dong}`;
  const field = (label: string): string => {
    const v = t.fields[label];
    if (v === undefined) throw new Error(`${noi}: thẻ ${t.id} thiếu dòng "- ${label}: …"`);
    return v;
  };
  const sqlChuan = t.sql['SQL chuẩn'];
  if (sqlChuan === undefined) throw new Error(`${noi}: thẻ ${t.id} thiếu "- SQL chuẩn:" + khối sql`);
  const soDongChu = t.fields['Số dòng kỳ vọng'];
  let soDongKyVong: number | null = null;
  if (soDongChu !== undefined) {
    if (!/^\d+$/.test(soDongChu)) throw new Error(`${noi}: thẻ ${t.id}, "Số dòng kỳ vọng" phải là số nguyên: "${soDongChu}"`);
    soDongKyVong = Number(soDongChu);
    soDongKhai.push({ sql: sqlChuan, soDong: soDongKyVong, noi: `${noi} thẻ ${t.id}, SQL chuẩn`, ...(t.evidence ? { resultId: t.evidence.id } : {}), ...((t.fields['Kiểu'] === 'tổng hợp' || t.fields['Kiểu'] === 'lọc tiếp') && t.fields['Nguồn'] ? { sourceResultId: t.fields['Nguồn'] } : {}), ...(t.fields['Kiểu'] === 'tổng hợp' && t.fields['Nhóm theo'] ? { sourceGroupColumn: t.fields['Nhóm theo'] } : {}) });
  }
  const goiY = docGoiY(t.fields).goiY;
  const khiTrinhSai = docKhiTrinhSai(t.fields).loi;
  return {
    id: t.id,
    tieuDe: field('Tiêu đề'),
    deBai: field('Đề bài hiển thị'),
    manhMoiLienQuan: (t.fields['Manh mối liên quan'] ?? '').match(/clue-[a-z0-9-]+/g) ?? [],
    mucTieuHoc: t.fields['Mục tiêu học'] ?? null,
    ...(t.fields['Cột nộp'] ? { cotNop: t.fields['Cột nộp'].split(',').map((x) => x.trim()).filter(Boolean) } : {}),
    soDongKyVong,
    sqlChuan,
    ...(t.fields['Kiểu'] === 'tổng hợp' ? { kieuTrinhDung: 'tong-hop', nguon: t.fields['Nguồn'] ?? null, nhomTheo: t.fields['Nhóm theo'] || null } : {}),
    // "Kiểu: lọc tiếp": màn tra v7 lấy phiếu đã ghim làm nguồn (câu hiện thành WITH … AS).
    ...(t.fields['Kiểu'] === 'lọc tiếp' ? { kieuTrinhDung: 'loc-tiep', nguon: t.fields['Nguồn'] ?? null } : {}),
    // "Nối được với: a · b": các bảng hiện ở khối "nối với" của màn tra (thẻ có JOIN).
    ...(t.fields['Nối được với'] ? { bangNoi: chiaGiaTri(t.fields['Nối được với']) } : {}),
    // "Bảng chọn: a · b": các bảng hiện ở dropdown chọn bảng nguồn.
    ...(t.fields['Bảng chọn'] ? { bangChon: chiaGiaTri(t.fields['Bảng chọn']) } : {}),
    // "Chọn cột: a, b" (hoặc "không"): bài chọn cột của SELECT; giá trị là các cột bật sẵn.
    ...(t.fields['Chọn cột'] !== undefined ? { chonCot: t.fields['Chọn cột'].trim() === 'không' ? [] : t.fields['Chọn cột'].split(',').map((c) => c.trim()).filter((c) => c !== '') } : {}),
    ...(t.fields['Bấm ô lấy giấy nhớ'] ? { bamO: t.fields['Bấm ô lấy giấy nhớ'].trim() } : {}),
    // "Cột nộp: a, b" (S12)
    ...(t.fields['Cột nộp'] !== undefined ? { cotNop: t.fields['Cột nộp'].split(',').map((c) => c.trim()).filter((c) => c !== '') } : {}),
    truyVanNapSan: t.sql['Truy vấn nạp sẵn'] ?? null,
    phanUng: docPhanUng(t.fields).phanUng.map((p) => ({ khi: p.khi, loi: p.loi.map(loi) })),
    // Gợi ý hai bậc của bạn đi cùng ở màn tra (gói B14); thẻ không có dòng "Gợi ý" thì không ghi gì (bộ MVP sinh ra y như trước).
    ...(goiY.length > 0 ? { goiY: goiY.map((g) => ({ ...(g.khi ? { khi: g.khi } : {}), bac1: loi(g.bac1), bac2: loi(g.bac2) })) } : {}),
    // Gói B19: lời "Khi trình sai" của màn sửa `· tính vạch`; thẻ không có dòng này sinh ra như trước.
    ...(khiTrinhSai ? { khiTrinhSai: khiTrinhSai.map(loi) } : {}),
    vatChung: t.evidence
      ? {
          id: t.evidence.id,
          title: t.evidence.title,
          description: t.evidence.description,
          giaTri: chiaGiaTri(t.evidence.giaTri),
          ...(t.evidence.chuTrenGiay ? { chuTrenGiay: chiaGiaTri(t.evidence.chuTrenGiay) } : {}),
          ...(t.evidence.tachGiay ? { tachGiay: true } : {}),
        }
      : null,
    ghiChu: t.notes,
  };
}

export function chuyenMvp(mvp: RawMvp, luat: KetQuaLuat): DuLieuMvp {
  if (!mvp.lich) throw new Error('bộ MVP không có lịch (lich.md)');
  const soDongKhai: DuLieuMvp['soDongKhai'] = [];
  const moc = (m: Moc | undefined, noi: string): Moc => {
    if (!m) throw new Error(`${noi}: chưa đọc được mốc thời gian (chưa qua kiểm chéo?)`);
    return m;
  };
  const lich = mvp.lich;
  const thuThach: Record<string, Obj> = {};
  for (const t of mvp.challenges) thuThach[t.id] = theThuThach(t, soDongKhai);
  const hoSo: Record<string, Obj> = {};
  for (const d of mvp.dossier) hoSo[d.id] = { id: d.id, loai: d.id.split('-')[0], heading: d.heading, fields: d.fields, quotes: d.quotes };
  const soTay: Record<string, Obj> = {};
  for (const s of mvp.soTay) {
    soTay[s.id] = { id: s.id, ten: s.ten, loai: s.loai, trangChiLinh: s.trangChiLinh, haVy: s.haVy.map(loi), chuThich: s.chuThich };
  }
  const chuoiDs = mvp.chuoi.map((c) => {
    const t = luat.mocChuoi.get(c.id);
    if (t === undefined) throw new Error(`${c.viTri.tep}:${c.viTri.dong}: chuỗi ${c.id} chưa có mốc (chuỗi lẻ?)`);
    return chuoi(c, t, soDongKhai);
  });
  return {
    tenGame: mvp.title.split(' — ')[0] ?? mvp.title,
    tenTruong: mvp.tenTruong,
    tenCam: mvp.tenCam,
    nhanVat: mvp.nhanVat.map((n) => ({
      id: n.id,
      ten: n.ten,
      hoTen: n.hoTen,
      trongCau: n.trongCau,
      vai: n.vai,
      bieuCam: n.bieuCam,
      xuatHienTu: moc(luat.mocNhanVat.get(n.id), `nhân vật ${n.id}`),
      chiQuaLoiKe: n.chiQuaLoiKe,
      gioiThieu: n.gioiThieu,
    })),
    canh: mvp.canh.map((c) => ({ id: c.id, ten: c.ten, anhNen: c.anhNen, ...(c.moTa ? { moTa: c.moTa } : {}) })),
    diaDiem: mvp.diaDiem.map((d) => ({
      id: d.id,
      ten: d.ten,
      canh: d.canh,
      moTu: moc(luat.mocDiaDiem.get(d.id), `địa điểm ${d.id}`),
      tonKhung: d.tonKhung,
      phanBiet: d.phanBiet,
      duKien: d.duKien.map((k) => ({
        id: k.id,
        moTa: k.moTa,
        nhan: k.nhan,
        moTu: moc(luat.mocDuKien.get(k.id), `dữ kiện ${k.id}`),
        can: k.can,
        hanhDong: k.chuoi !== null ? { kind: 'chuoi', chuoi: k.chuoi } : { kind: 'thu-thach', thuThach: k.thuThach ?? '' },
        moManhMoi: k.moManhMoi,
        hienTaiLieu: k.hienTaiLieu,
        luuBangChung: k.luuBangChung,
        lap: k.lap,
        anh: k.anh ? { sprite: k.anh.sprite, x: k.anh.x, y: k.anh.y, rong: k.anh.rong } : null,
      })),
    })),
    lich: {
      vu: lich.vu,
      khung: lich.khung,
      buoiToi: lich.buoiToi,
      luat: lich.luat,
      chuoiDau: lich.chuoiDau,
      ngayMoDau: lich.ngayMoDau,
      ...(lich.hanChot ? { hanChot: lich.hanChot } : {}),
      ...(lich.viecChot ? { viecChot: lich.viecChot } : {}),
      ngay: lich.ngay.map((n) => ({ so: n.so, ten: n.ten, kieu: n.kieu, chuoi: n.chuoi, ...(n.batDauO ? { batDauO: n.batDauO } : {}), duKienChinh: n.duKienChinh, moNgay: n.moNgay, buoiToi: n.buoiToi })),
      ngayHop: lich.ngayHop ? { chuoi: lich.ngayHop.chuoi } : null,
      ket: lich.ket ? { that: lich.ket.that, thuong: lich.ket.thuong, ...(lich.ket.tam ? { tam: lich.ket.tam } : {}) } : null,
      // Chỉ ghi khi có vụ sau: bộ một vụ sinh ra y như trước.
      ...(lich.vuSau.some((v) => !v.phu)
        ? {
            vuSau: lich.vuSau
              .filter((v) => !v.phu)
              .map((v) => ({
                id: v.id,
                ten: v.ten,
                chuoi: v.chuoi,
                ngay: v.ngay,
                ...(v.batDauO ? { batDauO: v.batDauO } : {}),
                ...(v.hanChot ? { hanChot: v.hanChot } : {}),
                ...(v.viecChot ? { viecChot: v.viecChot } : {}),
                ...(v.cacNgay && v.cacNgay.length > 0 ? { cacNgay: v.cacNgay } : {}),
                tieuDeKet: v.tieuDeKet,
                loiKet: v.loiKet,
              })),
          }
        : {}),
      ...(lich.vuSau.some((v) => v.phu)
        ? { nhiemVuPhu: lich.vuSau.filter((v) => v.phu).map((v) => ({ id: v.id, ten: v.ten, chuoi: v.chuoi, nguoiGiao: v.nguoiGiao ?? '', moSau: v.moSau ?? '', ngay: v.ngay, tieuDeKet: v.tieuDeKet, loiKet: v.loiKet })) }
        : {}),
      ...(lich.viecNgayLe && lich.viecNgayLe.length > 0
        ? {
            viecNgayLe: lich.viecNgayLe.map((l) => ({
              id: l.id,
              ten: l.ten,
              ngay: l.ngay,
              thuocVu: l.thuocVu,
              chuoi: l.chuoi,
              nguoiGiao: l.nguoiGiao,
              khiLo: l.khiLo,
              ...(l.tieuDeKet ? { tieuDeKet: l.tieuDeKet } : {}),
              ...(l.loiKet ? { loiKet: l.loiKet } : {}),
            })),
          }
        : {}),
      ...(lich.nguoiQuen && lich.nguoiQuen.length > 0
        ? {
            nguoiQuen: lich.nguoiQuen.map((n) => ({
              id: n.id,
              ten: n.ten,
              moSau: n.moSau,
              viec: n.viec.map((v) => ({ id: v.id, moSau: v.moSau })),
              anhCg: n.anhCg,
              giupO: n.giupO,
            })),
          }
        : {}),
    },
    chuoi: chuoiDs,
    thuThach,
    hoSo,
    soTay,
    loiChung: { matUyTin: mvp.loiChung.matUyTin ? { loi: mvp.loiChung.matUyTin.loi.map(loi), hetVach: loi(mvp.loiChung.matUyTin.hetVach) } : null },
    soDongKhai,
    duLieu: mvp.duLieu
      ? {
          bang: mvp.duLieu.bang.map((b) => ({ ten: b.ten, cot: b.cot, dong: b.dong })),
          bangAo: mvp.duLieu.bangAo.map((v) => ({ ten: v.ten, sql: v.sql })),
        }
      : null,
    // Gói B19: chỉ ghi khi bộ có dòng thời gian (bộ MVP, bộ mùa 1 cũ sinh ra y như trước).
    ...(mvp.dongThoiGian.length > 0 ? { dongThoiGian: Object.fromEntries(mvp.dongThoiGian.map((d) => [d.id, dongThoiGian(d)])) } : {}),
  };
}
