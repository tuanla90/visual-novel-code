/**
 * Màu nhấn của nhân vật MVP — màn "Nhân vật mới" (`GioiThieuMvp`) và chấm màu ở tab Nhân vật (`NhanVatMvp`).
 * Màu theo trang phục của từng người trong bộ ảnh hiện tại.
 */
const MAU_NHAN_VAT: Record<string, string> = {
  // Dàn năm màu (02/10/2026): Minh Anh đỏ, Tùng lam, Hà Vy lục, nhân vật chính vàng, Duy xám than.
  tung: '#1d4ed8',
  'minh-anh': '#c8102e',
  'ha-vy': '#15803d',
  duy: '#374151',
  quan: '#334155',
  hoai: '#9a6b3f',
  'bac-tu': '#78350f',
  'chu-cuong': '#4d7c0f',
  'co-hanh': '#0284c7',
  'co-lan': '#7c5cc4',
  'thay-khai': '#475569',
  'thay-quang': '#7f1d1d',
  hieu: '#a16207',
  dat: '#0f766e',
  nam: '#3f6b6b',
  khanh: '#1f2937',
  thao: '#5b6b2f',
  bach: '#57534e',
};
const MAU_MAC_DINH = '#1d4ed8';

export function mauNhanVat(id: string): string {
  return MAU_NHAN_VAT[id] ?? MAU_MAC_DINH;
}
