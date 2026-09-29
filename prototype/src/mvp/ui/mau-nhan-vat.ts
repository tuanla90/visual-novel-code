/**
 * Màu nhấn của nhân vật MVP — màn "Nhân vật mới" (`GioiThieuMvp`) và chấm màu ở tab Nhân vật (`NhanVatMvp`).
 * Nhân vật có ở prototype giữ đúng màu cũ.
 */
const MAU_NHAN_VAT: Record<string, string> = {
  tung: '#c2410c',
  'minh-anh': '#c8102e',
  'ha-vy': '#0f766e',
  duy: '#1e40af',
  quan: '#334155',
  hoai: '#7c3aed',
  'bac-tu': '#78350f',
  'chu-cuong': '#4d7c0f',
  'co-hanh': '#be185d',
  'co-lan': '#0e7490',
  'thay-khai': '#475569',
  'thay-quang': '#7f1d1d',
  hieu: '#a16207',
  dat: '#15803d',
};
const MAU_MAC_DINH = '#1d4ed8';

export function mauNhanVat(id: string): string {
  return MAU_NHAN_VAT[id] ?? MAU_MAC_DINH;
}
