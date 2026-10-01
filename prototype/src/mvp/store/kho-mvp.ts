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
import type { KichBanMvp } from '../../content/mvp/types';
import { taoTrangThai, tenKhungHienTai, xuLy, type HanhDongMvp } from '../engine/may';
import type { TrangThaiMvp } from '../engine/trang-thai';

export const KICH_BAN: KichBanMvp = KICH_BAN_MVP as unknown as KichBanMvp;

export const KHOA_KHO_MVP = 'clb_mvp_tien_do_v1';
export const SO_O_LUU_MVP = 6;
/** Phiên bản dữ liệu lưu; tăng khi nội dung đổi làm ván cũ không chơi tiếp được (xem `migrate`). */
export const PHIEN_BAN_KHO_MVP = 2;

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

  batDau: () => void;
  hanhDong: (hd: HanhDongMvp) => void;
  /** Đổi thẳng trạng thái (Nạp ô lưu). */
  datTrangThai: (s: TrangThaiMvp) => void;
  xoa: () => void;
  luuVaoO: (o: number, nhan: string) => void;
  napTuO: (o: number) => TrangThaiMvp | null;
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

    batDau: () => set({ trangThai: taoTrangThai(KICH_BAN) }),
    hanhDong: (hd) => {
      const s = get().trangThai;
      if (!s) return;
      const sau = xuLy(KICH_BAN, s, hd);
      if (sau !== s) set({ trangThai: sau });
    },
    datTrangThai: (s) => set({ trangThai: s }),
    xoa: () => set({ trangThai: null }),
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
      const s = structuredClone(daLuu.trangThai);
      set({ trangThai: s });
      return s;
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
