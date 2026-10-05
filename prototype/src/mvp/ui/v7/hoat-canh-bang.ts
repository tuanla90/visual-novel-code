/**
 * HOẠT CẢNH ĐI TIẾP TỪ BẢNG ĐANG CÓ (gói B14 mục E; dùng chung cho màn tra `ManTraV7` và màn lọc thử `LocThuV7`): khi màn còn
 * bảng kết quả của lần chạy trước và lần chạy mới làm bảng HẸP LẠI, các dòng không còn khớp rụng khỏi chính bảng ấy, dòng còn
 * lại dồn lên, con số đếm xuống cùng nhịp. Lần chạy ra bảng rộng hơn hoặc khác hẳn thì diễn như lần đầu (đống phiếu rơi).
 *
 * Cách dùng trong một màn:
 *   const rb = useRungBang();
 *   <div className={`v7-kq${rb.vuaDon ? ' v7-kq--don' : ''}`}> … <tbody ref={rb.than}> <tr {...thuocTinhDongRung(rb.rung, r)}> …
 *   // lúc có kết quả mới:
 *   const giu = hepLai(bangDangHien, bangMoi);
 *   if (giu) { await Promise.all([rb.rungDi(giu), demSo(…, RUNG_MS)]); rb.xong(); datBangMoi(); } else { rb.datLai(); … }
 * Lớp CSS ở v7.css: `.v7-kq tbody tr.is-roi` (dòng rụng), `.v7-kq--don` (bảng vừa dồn: không phát lại hiệu ứng hiện dần).
 * Máy bật "giảm chuyển động" thì không diễn: `rungDi` trả ngay, bảng mới hiện thẳng.
 */
import { useCallback, useLayoutEffect, useRef, useState, type RefObject } from 'react';
import type { GiaTriSql } from '../../engine/sql-mvp';
import { NHIP, giamChuyenDong, ngu } from './nhip';

export interface BangKetQua {
  cot: string[];
  dong: GiaTriSql[][];
}

/** Thời gian các dòng rụng khỏi bảng (con số đếm xuống cùng lúc): đủ chậm để nhìn thấy. */
export const RUNG_MS = 1100;
/** Thời gian các dòng còn lại trượt lên chỗ mới. */
const DON_MS = 340;

/**
 * Bảng mới có phải là bảng cũ bớt dòng không: cùng các cột (đúng thứ tự), ít dòng hơn, và mọi dòng mới đều có trong bảng cũ
 * (so theo nội dung, tính cả dòng trùng). Phải thì trả mảng cùng cỡ với `cu.dong`: `true` = dòng ấy còn lại; không thì `null`.
 */
export function hepLai(cu: BangKetQua, moi: BangKetQua): boolean[] | null {
  if (cu.dong.length === 0 || moi.dong.length >= cu.dong.length) return null;
  if (cu.cot.length !== moi.cot.length || cu.cot.some((c, i) => c.toLowerCase() !== (moi.cot[i] ?? '').toLowerCase())) return null;
  const con = new Map<string, number>();
  for (const d of moi.dong) {
    const k = JSON.stringify(d);
    con.set(k, (con.get(k) ?? 0) + 1);
  }
  const giu = cu.dong.map((d) => {
    const k = JSON.stringify(d);
    const n = con.get(k) ?? 0;
    if (n <= 0) return false;
    con.set(k, n - 1);
    return true;
  });
  // Còn dòng mới chưa tìm thấy trong bảng cũ → không phải "hẹp lại".
  for (const n of con.values()) if (n > 0) return null;
  return giu;
}

/**
 * Con số đếm từ `tu` tới `toi` trong `ms` (chậm dần về cuối). Đếm bằng setTimeout, không bằng requestAnimationFrame: tab bị ẩn
 * thì rAF đứng, lần chạy sẽ treo. Test (jsdom) và máy bật giảm chuyển động thì đặt thẳng số cuối.
 */
export async function demSo(tu: number, toi: number, ms: number, dat: (n: number) => void, conSong: () => boolean = () => true): Promise<void> {
  if (NHIP === 0 || giamChuyenDong() || ms <= 0) {
    dat(toi);
    return;
  }
  await new Promise<void>((xong) => {
    const t0 = Date.now();
    const buoc = (): void => {
      if (!conSong()) return xong();
      const k = Math.min(1, (Date.now() - t0) / ms);
      dat(Math.round(tu + (toi - tu) * (1 - Math.pow(1 - k, 3))));
      if (k < 1) setTimeout(buoc, 16);
      else xong();
    };
    buoc();
  });
}

export interface RungBang {
  /** Gắn vào `<tbody>` của bảng kết quả. */
  than: RefObject<HTMLTableSectionElement | null>;
  /** Bảng vừa dồn dòng xong: thêm lớp `v7-kq--don` vào khung bảng. */
  vuaDon: boolean;
  /** Đang rụng dòng: `rung[r]` = dòng thứ `r` của bảng đang hiện có còn lại không; `null` = không rụng. */
  rung: readonly boolean[] | null;
  /** Bước 1: các dòng không còn khớp rụng khỏi bảng đang hiện; xong thì nhớ chỗ các dòng còn lại. */
  rungDi: (giu: readonly boolean[]) => Promise<void>;
  /** Bước 2: gọi ngay trước khi đặt bảng mới; dòng còn lại trượt từ chỗ cũ lên chỗ mới, dòng chưa từng hiện thì hiện dần. */
  xong: () => void;
  /** Lần chạy không đi từ bảng cũ (hoặc người chơi sửa câu): bỏ mọi dấu của hoạt cảnh. */
  datLai: () => void;
}

export function useRungBang(): RungBang {
  const than = useRef<HTMLTableSectionElement | null>(null);
  const [rung, setRung] = useState<readonly boolean[] | null>(null);
  const [vuaDon, setVuaDon] = useState(false);
  /** Chỗ (top, px màn hình) của các dòng còn lại trước khi bảng mới thay vào; `null` = không có gì để dồn. */
  const cho = useRef<number[] | null>(null);

  const rungDi = useCallback(async (giu: readonly boolean[]): Promise<void> => {
    if (giamChuyenDong()) return;
    setRung(giu);
    await ngu(RUNG_MS);
    cho.current = [...(than.current?.querySelectorAll<HTMLElement>('tr[data-giu="1"]') ?? [])].map((el) => el.getBoundingClientRect().top);
  }, []);
  const xong = useCallback((): void => {
    setRung(null);
    setVuaDon(true);
  }, []);
  const datLai = useCallback((): void => {
    cho.current = null;
    setRung(null);
    setVuaDon(false);
  }, []);

  // Sau khi bảng mới đã vẽ: mỗi dòng trượt từ chỗ cũ của nó (FLIP); dòng trước đó nằm ngoài phần bảng được vẽ thì hiện dần.
  useLayoutEffect(() => {
    const cu = cho.current;
    if (!cu || rung !== null || !vuaDon) return;
    cho.current = null;
    const dong = [...(than.current?.querySelectorAll<HTMLElement>('tr') ?? [])];
    dong.forEach((el, j) => {
      if (typeof el.animate !== 'function') return;
      const truoc = cu[j];
      if (truoc === undefined) {
        el.animate([{ opacity: 0 }, { opacity: 1 }], { duration: DON_MS, easing: 'ease-out' });
        return;
      }
      const lech = truoc - el.getBoundingClientRect().top;
      if (Math.abs(lech) >= 1) el.animate([{ transform: `translateY(${lech}px)` }, { transform: 'none' }], { duration: DON_MS, easing: 'cubic-bezier(0.2, 0.8, 0.3, 1)' });
    });
  });

  return { than, vuaDon, rung, rungDi, xong, datLai };
}

/** Thuộc tính của dòng thứ `r` của bảng ĐANG HIỆN: lớp `is-roi` cho dòng rụng, dấu `data-giu` cho dòng còn lại. */
export function thuocTinhDongRung(rung: readonly boolean[] | null, r: number): { className?: string; 'data-giu'?: string } {
  return rung === null ? {} : rung[r] === false ? { className: 'is-roi' } : { 'data-giu': '1' };
}
