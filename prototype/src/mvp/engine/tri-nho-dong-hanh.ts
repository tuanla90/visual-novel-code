import type { KichBanMvp, LoiMvp } from '../../content/mvp/types';
import { khungNhin } from './may';
import type { TrangThaiMvp } from './trang-thai';
import { checkSingleSelect } from '../../sql-challenge/engine/sql-text';

export const BAN_DONG_HANH = ['tung', 'ha-vy'] as const;
export type BanDongHanhMvp = (typeof BAN_DONG_HANH)[number];
export type TinNhanDongHanhMvp = { role: 'user' | 'assistant'; content: string };
export type TruyVanDaXemMvp = { id: string; nhan: string; sql: string };
export type QuanSatTruyVanMvp = (query: TruyVanDaXemMvp, loi: readonly LoiMvp[]) => void;
export interface TriNhoNhanVatMvp {
  loiDaNghe: { id: string; speaker: string; text: string }[];
  hoSoDaThay: string[];
  truyVanDaXem: TruyVanDaXemMvp[];
  hoiThoai: TinNhanDongHanhMvp[];
}
export interface TriNhoDongHanhMvp {
  canh: string;
  moc: string;
  conTro?: { chuoi: string; nut: number };
  diemVe?: { chuoi: string; nut: number }[];
  coMat: BanDongHanhMvp[];
  nhanVat: Record<BanDongHanhMvp, TriNhoNhanVatMvp>;
}

const laBan = (id: string): id is BanDongHanhMvp => (BAN_DONG_HANH as readonly string[]).includes(id);
const rong = (): TriNhoNhanVatMvp => ({ loiDaNghe: [], hoSoDaThay: [], truyVanDaXem: [], hoiThoai: [] });
const mocCanh = (s: TrangThaiMvp): string => JSON.stringify([s.ngay, s.ngayThang, s.giaiDoan, s.vu, s.phu?.id]);
const maHoSo = (s: TrangThaiMvp): string[] => [...s.hoSo.manhMoi, ...s.hoSo.taiLieu, ...s.hoSo.bangChung];

/** Chỉ quét phần đã đi qua. Không dùng người nói ở các nút tương lai để cho họ biết chuyện sớm. */
export function banDangCoMat(kb: KichBanMvp, s: TrangThaiMvp): BanDongHanhMvp[] {
  const cu = s.triNhoDongHanh;
  const co = new Set<BanDongHanhMvp>(cu?.canh === s.canh && cu.moc === mocCanh(s) ? cu.coMat : []);
  const cungCanh = cu?.canh === s.canh && cu.moc === mocCanh(s);
  const scan = (chuoi: string, nut: number, tu = 0): void => {
    const c = kb.chuoi.find((x) => x.id === chuoi);
    if (c?.canh !== s.canh) return;
    for (const n of c.nodes.slice(tu, nut + 1)) {
      if (n.type === 'stage' && laBan(n.nhanVat)) {
        if (n.action === 'ra') co.delete(n.nhanVat);
        else co.add(n.nhanVat);
      } else {
        const speaker = n.type === 'line' || n.type === 'reminder' ? n.speaker
          : n.type === 'question' || n.type === 'branch' || n.type === 'doi-chat' || n.type === 'create-character' ? n.asker.speaker : '';
        if (laBan(speaker)) co.add(speaker);
      }
    }
  };
  const parents: { chuoi: string; nut: number }[] = [];
  for (let p = s.khamPha; p; p = p.cha) parents.unshift(p.veLai);
  if (!cungCanh) for (const p of parents) scan(p.chuoi, p.nut);
  const daQuet = cu?.conTro?.chuoi === s.conTro?.chuoi ? cu?.conTro : cu?.diemVe?.find((p) => p.chuoi === s.conTro?.chuoi);
  if (s.conTro) scan(s.conTro.chuoi, s.conTro.nut, cungCanh && daQuet ? daQuet.nut + 1 : 0);
  const kn = khungNhin(kb, s);
  if ((kn.kind === 'line' || kn.kind === 'feedback') && laBan(kn.loi.speaker)) co.add(kn.loi.speaker);
  return BAN_DONG_HANH.filter((id) => co.has(id));
}

function taoTriNho(kb: KichBanMvp, s: TrangThaiMvp): TriNhoDongHanhMvp {
  const diemVe: { chuoi: string; nut: number }[] = [];
  for (let p = s.khamPha; p; p = p.cha) diemVe.push({ chuoi: p.veLai.chuoi, nut: p.veLai.nut });
  return {
    canh: s.canh,
    moc: mocCanh(s),
    conTro: s.conTro ? { chuoi: s.conTro.chuoi, nut: s.conTro.nut } : undefined,
    diemVe,
    coMat: banDangCoMat(kb, s),
    nhanVat: s.triNhoDongHanh?.nhanVat ?? { tung: rong(), 'ha-vy': rong() },
  };
}

function themLoi(triNho: TriNhoDongHanhMvp, coMat: readonly BanDongHanhMvp[], id: string, loi: LoiMvp): void {
  // Lời dẫn có thể là độc thoại nội tâm của người chơi: không chuyển cho nhân vật.
  if (loi.speaker === 'narrator') return;
  for (const ban of coMat) {
    const cu = triNho.nhanVat[ban];
    if (cu.loiDaNghe.some((x) => x.id === id)) continue;
    triNho.nhanVat = { ...triNho.nhanVat, [ban]: { ...cu, loiDaNghe: [...cu.loiDaNghe, { id, speaker: loi.speaker, text: loi.text }].slice(-160) } };
  }
}

function themHoSo(triNho: TriNhoDongHanhMvp, coMat: readonly BanDongHanhMvp[], ids: readonly string[]): void {
  for (const ban of coMat) {
    const cu = triNho.nhanVat[ban];
    const them = ids.filter((id) => !cu.hoSoDaThay.includes(id));
    if (them.length) triNho.nhanVat = { ...triNho.nhanVat, [ban]: { ...cu, hoSoDaThay: [...cu.hoSoDaThay, ...them] } };
  }
}

function themTruyVan(triNho: TriNhoDongHanhMvp, coMat: readonly BanDongHanhMvp[], query: TruyVanDaXemMvp): void {
  if (!checkSingleSelect(query.sql).ok) return;
  for (const ban of coMat) {
    const cu = triNho.nhanVat[ban];
    if (cu.truyVanDaXem.some((x) => x.id === query.id && x.sql === query.sql)) continue;
    triNho.nhanVat = { ...triNho.nhanVat, [ban]: {
      ...cu,
      truyVanDaXem: [...cu.truyVanDaXem.filter((x) => x.id !== query.id && x.sql !== query.sql), query].slice(-24),
    } };
  }
}

/** Quan sát đúng khung đang hiện, không dựng lại những nhánh người chơi chưa đi. Save cũ không được backfill toàn bộ hồ sơ. */
export function ghiNhanTrangThaiDongHanh(kb: KichBanMvp, s: TrangThaiMvp, truoc?: TrangThaiMvp): TrangThaiMvp {
  const triNho = taoTriNho(kb, s);
  const kn = khungNhin(kb, s);
  const id = `${s.conTro?.chuoi}:${s.conTro?.nut}:${s.hoiDap?.id ?? ''}:${s.hoiDap?.viTri ?? ''}`;
  if (kn.kind === 'line' || kn.kind === 'feedback') themLoi(triNho, triNho.coMat, `${id}:${kn.loi.text}`, kn.loi);
  else if (kn.kind === 'question' || kn.kind === 'branch' || kn.kind === 'doi-chat' || kn.kind === 'create-character') {
    themLoi(triNho, triNho.coMat, id, kn.nut.asker);
  } else if (kn.kind === 'show-document' && maHoSo(s).includes(kn.documentId)) {
    themHoSo(triNho, triNho.coMat, [kn.documentId]);
  }
  if (truoc && truoc.batDauLuc === s.batDauLuc) {
    // Người có mặt khi vật chứng được nhận mới biết nó; không truyền cho người ở cảnh kế tiếp.
    const chungKien = truoc.canh === s.canh && mocCanh(truoc) === mocCanh(s)
      ? banDangCoMat(kb, truoc).filter((ban) => triNho.coMat.includes(ban)) : [];
    const daCo = new Set(maHoSo(truoc));
    themHoSo(triNho, chungKien, maHoSo(s).filter((ma) => !daCo.has(ma)));
    for (const phieu of Object.values(s.bang?.phieuTruyVan ?? {})) {
      if (truoc.bang?.phieuTruyVan?.[phieu.id]?.sql !== phieu.sql) {
        themTruyVan(triNho, chungKien, { id: phieu.id, nhan: phieu.nhan, sql: phieu.sql });
      }
    }
    if (s.doiChat?.id === truoc.doiChat?.id || !truoc.doiChat) {
      themHoSo(triNho, chungKien, (s.doiChat?.daTrinh ?? []).filter((ma) => !(truoc.doiChat?.daTrinh ?? []).includes(ma) && maHoSo(s).includes(ma)));
    }
  }
  if (JSON.stringify(triNho) === JSON.stringify(s.triNhoDongHanh)) return s;
  return { ...s, triNhoDongHanh: triNho };
}

/** Được gọi khi kết quả SQL thật đã hiện trên laptop, kể cả lần thử chưa đúng. */
export function ghiNhanTruyVanDongHanh(kb: KichBanMvp, s: TrangThaiMvp, query: TruyVanDaXemMvp, loiHien: readonly LoiMvp[] = []): TrangThaiMvp {
  const daQuanSat = ghiNhanTrangThaiDongHanh(kb, s);
  const triNho = taoTriNho(kb, daQuanSat);
  for (const loi of loiHien.slice(0, 1)) {
    if (laBan(loi.speaker) && !triNho.coMat.includes(loi.speaker)) triNho.coMat = [...triNho.coMat, loi.speaker];
    themLoi(triNho, triNho.coMat, `tra:${query.id}:${loi.text}`, loi);
  }
  themTruyVan(triNho, triNho.coMat, query);
  return { ...daQuanSat, triNhoDongHanh: triNho };
}

/** Chat không phải dữ kiện đã xác minh. Khóa này ngăn phản hồi muộn lọt vào ván/save khác. */
export function khoaNguCanhDongHanh(s: TrangThaiMvp, ban: BanDongHanhMvp): string {
  const mem = s.triNhoDongHanh?.nhanVat[ban];
  return JSON.stringify([s.batDauLuc, s.conTro, s.hoiDap?.viTri, s.canh, mocCanh(s), s.tenNguoiChoi, s.nganh, s.nhiemVu, s.nhacViec, mem?.loiDaNghe, mem?.hoSoDaThay, mem?.truyVanDaXem]);
}
