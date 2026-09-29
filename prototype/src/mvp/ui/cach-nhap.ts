/**
 * Cách nhập câu ở phòng máy (QĐ-092): người chơi tự đổi trong màn; nhớ theo phiên (sessionStorage, như kho MVP — QĐ-004).
 * Người quan sát ép được cách mở đầu bằng `?cach=keo|khoi|go` để so sánh khi cho người chơi thử.
 */
import { CACH_NHAP, type CachNhap } from '../engine/trinh-dung';

const KHOA = 'clb_mvp_cach_nhap';

function la(v: string | null | undefined): v is CachNhap {
  return (CACH_NHAP as readonly string[]).includes(v ?? '');
}

export function docCachNhap(search: string = typeof window !== 'undefined' ? window.location.search : ''): CachNhap {
  const tuUrl = new URLSearchParams(search).get('cach');
  if (la(tuUrl)) return tuUrl;
  try {
    const luu = sessionStorage.getItem(KHOA);
    if (la(luu)) return luu;
  } catch {
    // không có sessionStorage
  }
  return 'keo';
}

export function ghiCachNhap(c: CachNhap): void {
  try {
    sessionStorage.setItem(KHOA, c);
  } catch {
    // bỏ qua
  }
}
