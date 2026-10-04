/**
 * KHO TRẠNG THÁI BẢN MVP — zustand + persist, TÁCH HẲN kho của prototype (`shared/store`): khóa lưu riêng
 * (`clb_mvp_*`), không đụng `progress`/`evidence`/`challenges` của bản cũ.
 *
 * Lưu ở sessionStorage như prototype (QĐ-004: máy thử nghiệm dùng chung, localStorage sẽ lộ tiến độ người trước);
 * brief gói ghi "khóa localStorage riêng" — đọc là "khóa lưu riêng", giữ loại bộ nhớ theo QĐ-004 (xem báo cáo).
 * Ô lưu (6 ô) cũng nằm trong kho này.
 */
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';
import { KICH_BAN_MVP } from '../../content/generated/mvp/kich-ban.gen';
import type { KichBanMvp, LoiMvp } from '../../content/mvp/types';
import { taoTrangThai, tenKhungHienTai, xuLy, type HanhDongMvp } from '../engine/may';
import type { TrangThaiMvp } from '../engine/trang-thai';
import { ghiNhanTrangThaiDongHanh, ghiNhanTruyVanDongHanh, khoaNguCanhDongHanh, type BanDongHanhMvp, type TinNhanDongHanhMvp, type TruyVanDaXemMvp } from '../engine/tri-nho-dong-hanh';

export const KICH_BAN: KichBanMvp = KICH_BAN_MVP as unknown as KichBanMvp;

export const KHOA_KHO_MVP = 'clb_mvp_tien_do_v1';
export const SO_O_LUU_MVP = 6;
/** Phiên bản dữ liệu lưu; tăng khi nội dung đổi làm ván cũ không chơi tiếp được (xem `migrate`). */
export const PHIEN_BAN_KHO_MVP = 5;
/** Số bước lùi lại được (mỗi hành động của người chơi là một bước). */
export const SO_BUOC_LUI_MVP = 200;

export interface OLuuMvp {
  trangThai: TrangThaiMvp;
  /** ISO thời điểm lưu. */
  luuLuc: string;
  /** Nhãn ngắn hiện trên ô: "Ngày 3 · Trưa", "Buổi họp"… */
  nhan: string;
  nhiemVu: string | null;
}

export interface KhoMvp {
  trangThai: TrangThaiMvp | null;
  oLuu: (OLuuMvp | null)[];
  /** Các trạng thái trước đó của ván đang chơi (mới nhất ở cuối) để lùi lại từng bước; chỉ giữ trong bộ nhớ, không lưu. */
  lichSuLui: TrangThaiMvp[];
  /** Changes on load/restart/undo, even when the restored cursor matches the old one. Not persisted. */
  lanDoiVan: number;

  batDau: () => void;
  hanhDong: (hd: HanhDongMvp) => void;
  /** Lùi một bước (về trạng thái trước hành động gần nhất). Có thể bỏ qua các trạng thái trung gian (như ảnh chèn). Trả `false` khi không còn gì để lùi. */
  lui: (boQua?: (s: TrangThaiMvp) => boolean) => boolean;
  /** Đổi thẳng trạng thái (Nạp ô lưu). */
  datTrangThai: (s: TrangThaiMvp) => void;
  xoa: () => void;
  luuVaoO: (o: number, nhan: string) => void;
  napTuO: (o: number) => TrangThaiMvp | null;
  ghiNhanTruyVan: (query: TruyVanDaXemMvp, loi: readonly LoiMvp[], tai: TrangThaiMvp, lan: number) => void;
  ghiNhanChat: (ban: BanDongHanhMvp, messages: TinNhanDongHanhMvp[], key: string, lan: number) => boolean;
}

function boNhoPhien(): Storage {
  try {
    if (typeof sessionStorage !== 'undefined') return sessionStorage;
  } catch {
    // môi trường không có sessionStorage
  }
  const mem = new Map<string, string>();
  return {
    getItem: (k) => mem.get(k) ?? null,
    setItem: (k, v) => void mem.set(k, v),
    removeItem: (k) => void mem.delete(k),
    clear: () => mem.clear(),
    key: (i) => [...mem.keys()][i] ?? null,
    get length() {
      return mem.size;
    },
  } as Storage;
}

const oLuuRong = (): (OLuuMvp | null)[] => Array.from({ length: SO_O_LUU_MVP }, () => null);

export function taoKhoMvp(options: { persist?: boolean; storageKey?: string } = {}) {
  const khoiTao = (
    set: (fn: Partial<KhoMvp> | ((s: KhoMvp) => Partial<KhoMvp>)) => void,
    get: () => KhoMvp,
  ): KhoMvp => ({
    trangThai: null,
    oLuu: oLuuRong(),
    lichSuLui: [],
    lanDoiVan: 0,

    batDau: () => set({ trangThai: ghiNhanTrangThaiDongHanh(KICH_BAN, taoTrangThai(KICH_BAN)), lichSuLui: [], lanDoiVan: get().lanDoiVan + 1 }),
    hanhDong: (hd) => {
      const s = get().trangThai;
      if (!s) return;
      const ketQua = xuLy(KICH_BAN, s, hd);
      const sau = ketQua === s ? s : ghiNhanTrangThaiDongHanh(KICH_BAN, ketQua, s);
      if (sau !== s) set((k) => ({ trangThai: sau, lichSuLui: [...k.lichSuLui, s].slice(-SO_BUOC_LUI_MVP) }));
    },
    lui: (boQua?: (s: TrangThaiMvp) => boolean) => {
      const ds = get().lichSuLui;
      let idx = ds.length - 1;
      while (idx >= 0 && boQua && boQua(ds[idx]!)) {
        idx--;
      }
      if (idx < 0) return false;
      const truoc = ds[idx]!;
      set({ trangThai: truoc, lichSuLui: ds.slice(0, idx), lanDoiVan: get().lanDoiVan + 1 });
      return true;
    },
    datTrangThai: (s) => set({ trangThai: ghiNhanTrangThaiDongHanh(KICH_BAN, s), lichSuLui: [], lanDoiVan: get().lanDoiVan + 1 }),
    xoa: () => set({ trangThai: null, lichSuLui: [], lanDoiVan: get().lanDoiVan + 1 }),
    luuVaoO: (o, nhan) => {
      const s = get().trangThai;
      if (!s || o < 0 || o >= SO_O_LUU_MVP) return;
      set((k) => {
        const oLuu = [...k.oLuu];
        oLuu[o] = { trangThai: structuredClone(s), luuLuc: new Date().toISOString(), nhan, nhiemVu: s.nhiemVu };
        return { oLuu };
      });
    },
    napTuO: (o) => {
      const daLuu = get().oLuu[o];
      if (!daLuu) return null;
      const s = ghiNhanTrangThaiDongHanh(KICH_BAN, structuredClone(daLuu.trangThai));
      set({ trangThai: s, lichSuLui: [], lanDoiVan: get().lanDoiVan + 1 });
      return s;
    },
    ghiNhanTruyVan: (query, loi, tai, lan) => {
      const s = get().trangThai;
      if (!s || get().lanDoiVan !== lan || s.batDauLuc !== tai.batDauLuc || JSON.stringify(s.conTro) !== JSON.stringify(tai.conTro)) return;
      set({ trangThai: ghiNhanTruyVanDongHanh(KICH_BAN, s, query, loi) });
    },
    ghiNhanChat: (ban, messages, key, lan) => {
      const s = get().trangThai;
      if (!s || get().lanDoiVan !== lan || khoaNguCanhDongHanh(s, ban) !== key) return false;
      const daXem = ghiNhanTrangThaiDongHanh(KICH_BAN, s);
      const triNho = daXem.triNhoDongHanh!;
      set({ trangThai: { ...daXem, triNhoDongHanh: { ...triNho, nhanVat: {
        ...triNho.nhanVat, [ban]: { ...triNho.nhanVat[ban], hoiThoai: messages.slice(-12) },
      } } } });
      return true;
    },
  });

  if (options.persist === false) return create<KhoMvp>()(khoiTao);
  return create<KhoMvp>()(
    persist(khoiTao, {
      name: options.storageKey ?? KHOA_KHO_MVP,
      // v2 (30/09/2026): chương 1 chuyển sang ngày theo truyện — ván và ô lưu v1 trỏ tới ngày / chuỗi / dữ kiện không
      // còn, nên bỏ hẳn (ván mới từ đầu) thay vì nạp một trạng thái hỏng.
      version: PHIEN_BAN_KHO_MVP,
      migrate: (_cu, phienBan) => (phienBan < PHIEN_BAN_KHO_MVP ? { trangThai: null, oLuu: Array.from({ length: SO_O_LUU_MVP }, () => null) } : _cu) as KhoMvp,
      storage: createJSONStorage(boNhoPhien),
      partialize: (k) => ({ trangThai: k.trangThai, oLuu: k.oLuu }) as unknown as KhoMvp,
    }),
  );
}

export const useKhoMvp = taoKhoMvp();

/** Nhãn ngắn của trạng thái cho ô lưu / thông báo. */
export function nhanTienDo(s: TrangThaiMvp): string {
  if (s.giaiDoan === 'mo-dau') return 'Mở đầu';
  if (s.giaiDoan === 'ngay') return `Ngày ${s.ngay} · ${tenKhungHienTai(KICH_BAN, s)}`;
  if (s.giaiDoan === 'hop') return 'Buổi họp rà soát';
  if (s.giaiDoan === 'phu') return `Việc phụ · ${tenKhungHienTai(KICH_BAN, s)}`;
  if (s.giaiDoan === 'vu-sau') {
    const i = (KICH_BAN.lich.vuSau ?? []).findIndex((v) => v.id === s.vu);
    return `Vụ ${i + 2} · ${tenKhungHienTai(KICH_BAN, s)}`;
  }
  return 'Kết';
}
