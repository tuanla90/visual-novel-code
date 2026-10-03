/**
 * Màu nhấn của nhân vật MVP — màn "Nhân vật mới" (`GioiThieuMvp`) và chấm màu ở tab Nhân vật (`NhanVatMvp`).
 * Màu theo trang phục của từng người trong bộ ảnh hiện tại.
 */
const MAU_NHAN_VAT: Record<string, string> = {
  // Dàn màu sáng, tương phản cao trên nền tối (WCAG AA/AAA) cho màn giới thiệu nhân vật và thẻ hồ sơ
  tung: '#38bdf8',
  'minh-anh': '#f87171',
  'ha-vy': '#34d399',
  duy: '#38bdf8',
  quan: '#60a5fa',
  hoai: '#c084fc',
  'bac-tu': '#fbbf24',
  'chu-cuong': '#4ade80',
  'co-hanh': '#38bdf8',
  'co-lan': '#e879f9',
  'thay-quang': '#f87171',
  hieu: '#facc15',
  dat: '#2dd4bf',
  nam: '#22d3ee',
  khanh: '#cbd5e1',
  thao: '#a3e635',
  bach: '#e2e8f0',
  'ba-lua': '#fbbf24',
};
const MAU_MAC_DINH = '#fbbf24';

export function mauNhanVat(id: string): string {
  return MAU_NHAN_VAT[id] ?? MAU_MAC_DINH;
}
